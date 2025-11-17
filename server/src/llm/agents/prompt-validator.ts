import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
  PromptValidation,
  PromptValidationSchema,
} from "../schemas/emissions.schema";
import {
  PROMPT_VALIDATION_SYSTEM,
  PROMPT_VALIDATION_PROMPT,
} from "../prompts/analysis.prompt";

/**
 * Agente para validar prompts do usuário
 * Garante que os prompts sejam relacionados a carbono, emissões e sustentabilidade
 */

function initializeLLM(): ChatOpenAI {
  return new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.3, // Baixa temperatura para respostas consistentes
  });
}

/**
 * Valida um prompt do usuário para garantir que está relacionado a carbono/emissões/GHG
 *
 * @param userPrompt - Prompt do usuário a ser validado
 * @returns PromptValidation com status, razão e score
 */
export async function validateUserPrompt(
  userPrompt: string
): Promise<PromptValidation> {
  console.log("[PromptValidator] Iniciando validação do prompt...");

  if (!userPrompt || userPrompt.trim().length === 0) {
    console.log("[PromptValidator] Prompt vazio detectado");
    return {
      isValid: false,
      status: "invalid",
      reason: "Prompt vazio ou não fornecido",
      score: 0,
    };
  }

  // Limite de tamanho
  if (userPrompt.length > 2000) {
    console.log("[PromptValidator] Prompt muito longo");
    return {
      isValid: false,
      status: "invalid",
      reason: "Prompt muito longo (máximo 2000 caracteres)",
      score: 0,
    };
  }

  const llm = initializeLLM();

  try {
    const prompt = PROMPT_VALIDATION_PROMPT.replace("{userPrompt}", userPrompt);

    // Usar invoke para respostas mais diretas
    const response = await llm.invoke([
      new SystemMessage(PROMPT_VALIDATION_SYSTEM),
      new HumanMessage(prompt),
    ]);

    const responseContent =
      typeof response.content === "string"
        ? response.content
        : response.content.map((c: any) => c.text).join("");

    console.log("[PromptValidator] Resposta recebida:", responseContent);

    // Extrair JSON da resposta
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log("[PromptValidator] Nenhum JSON encontrado na resposta");
      throw new Error("Nenhum JSON encontrado na resposta do validador");
    }

    const parsedValidation = JSON.parse(jsonMatch[0]);

    // Validar contra schema
    const validation = PromptValidationSchema.parse(parsedValidation);

    console.log(
      `[PromptValidator] Validação concluída - Status: ${validation.status}, Score: ${validation.score}`
    );

    return validation;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[PromptValidator] Erro durante validação:", errorMessage);

    // Se der erro, retornar warning ao invés de erro para não bloquear completamente
    return {
      isValid: false,
      status: "warning",
      reason: `Erro ao validar prompt: ${errorMessage}`,
      score: 50,
    };
  }
}

/**
 * Valida um prompt e retorna um objeto com resultado e mensagem formatada
 *
 * @param userPrompt - Prompt do usuário
 * @returns Objeto com validação e mensagem formatada
 */
export async function validateAndFormatPrompt(userPrompt: string): Promise<{
  validation: PromptValidation;
  message: string;
  shouldProceed: boolean;
}> {
  const validation = await validateUserPrompt(userPrompt);

  let message = "";
  let shouldProceed = false;

  if (validation.status === "valid") {
    message = `✓ Prompt validado com sucesso (Relevância: ${validation.score}%)`;
    shouldProceed = true;
  } else if (validation.status === "warning") {
    message = `⚠ Aviso: ${validation.reason} (Relevância: ${validation.score}%)`;
    shouldProceed = validation.score >= 40; // Permitir com score > 40 em warnings
  } else {
    message = `✗ Prompt não validado: ${validation.reason}`;
    shouldProceed = false;
  }

  return {
    validation,
    message,
    shouldProceed,
  };
}

/**
 * Exporta o objeto PromptValidator com métodos públicos
 */
export const PromptValidator = {
  validate: validateUserPrompt,
  validateAndFormat: validateAndFormatPrompt,
};
