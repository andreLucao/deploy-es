import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import {
  EmissionsData,
  AnalysisResult,
  InsightSchema,
} from "../schemas/emissions.schema";
import {
  EMISSION_ANALYSIS_PROMPT,
  STRUCTURED_INSIGHTS_PROMPT,
  formatEmissionDataForPrompt,
} from "../prompts/analysis.prompt";

function initializeLLM(): ChatOpenAI {
  return new ChatOpenAI({
    model: "gpt-5-nano",
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/**
 * PASSO 1: Executa análise básica de emissões
 */
async function analyzeEmissionsStep(
  emissionData: EmissionsData,
  userPrompt?: string
): Promise<string> {
  console.log("[Analyze] Processando...");
  const llm = initializeLLM();

  if (!emissionData) {
    throw new Error("emissionData é obrigatório");
  }

  const formattedData = formatEmissionDataForPrompt(emissionData);
  let prompt = EMISSION_ANALYSIS_PROMPT.replace(
    "{emissionData}",
    formattedData
  );

  // Adicionar contexto extra do usuário se fornecido
  if (userPrompt && userPrompt.trim().length > 0) {
    prompt += `\n\nGUIA ADICIONAL DO USUÁRIO:\n${userPrompt}\n\nConsidere esta guia adicional ao gerar seus insights e recomendações.`;
  }

  // Usando .invoke() - execução simples sem stream
  const result = await llm.invoke([new HumanMessage(prompt)]);

  let analysisContent = "";
  if (result.content) {
    analysisContent = typeof result.content === "string"
      ? result.content
      : result.content.map((c: any) => c.text).join("");
  }

  console.log("[Analyze] Análise concluída");
  return analysisContent;
}

/**
 * PASSO 2: Estrutura os insights a partir da análise
 */
async function structureInsightsStep(
  emissionData: EmissionsData,
  rawAnalysis: string
): Promise<string> {
  console.log("[Structure] Processando...");
  const llm = initializeLLM();

  if (!emissionData) {
    throw new Error("emissionData é obrigatório");
  }

  const formattedData = formatEmissionDataForPrompt(emissionData);
  const prompt = STRUCTURED_INSIGHTS_PROMPT.replace(
    "{analysis}",
    rawAnalysis
  ).replace("{emissionData}", formattedData);

  // Usando .invoke() - execução simples sem stream
  const result = await llm.invoke([new HumanMessage(prompt)]);

  let responseContent = "";
  if (result.content) {
    responseContent = typeof result.content === "string"
      ? result.content
      : result.content.map((c: any) => c.text).join("");
  }

  console.log("[Structure] Estruturação concluída");
  return responseContent;
}

/**
 * PASSO 3: Parse e validação dos insights
 */
function parseInsightsStep(
  rawAnalysis: string,
  structuredAnalysis: string
): AnalysisResult {
  console.log("[Parse] Processando...");

  const jsonMatch = structuredAnalysis.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Nenhum JSON encontrado");
  }

  const parsedInsights = JSON.parse(jsonMatch[0]);
  const validatedInsights = (parsedInsights.insights || []).map(
    (insight: any) => {
      try {
        return InsightSchema.parse(insight);
      } catch {
        return {
          category: insight.category || "opportunity",
          title: insight.title || "Insight",
          description: insight.description || "",
          scope: insight.scope || "overall",
          impact: insight.impact || "medium",
          actionable: insight.actionable ?? true,
          recommendation: insight.recommendation,
        };
      }
    }
  );

  const finalResult: AnalysisResult = {
    rawAnalysis,
    insights: validatedInsights,
    keyFindings: parsedInsights.keyFindings || [],
    recommendations: parsedInsights.recommendations || [],
    nextSteps: parsedInsights.nextSteps || [],
  };

  console.log("[Parse] Parse concluído com", validatedInsights.length, "insights");
  return finalResult;
}

/**
 * Função principal para analisar emissões
 * Pipeline sequencial simples:
 * 1. Análise básica
 * 2. Estruturação de insights
 * 3. Parse e validação
 */
export async function analyzeEmissions(
  emissionData: EmissionsData,
  userPrompt?: string
): Promise<AnalysisResult> {
  console.log("[Analyzer] Iniciando...");

  try {
    // Passo 1: Análise
    const rawAnalysis = await analyzeEmissionsStep(emissionData, userPrompt);

    // Passo 2: Estruturação
    const structuredAnalysis = await structureInsightsStep(emissionData, rawAnalysis);

    // Passo 3: Parse
    const finalResult = parseInsightsStep(rawAnalysis, structuredAnalysis);

    console.log("[Analyzer] Análise concluída com sucesso!");
    return finalResult;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[Analyzer] Erro durante análise:", errorMessage);
    throw new Error(`Falha na análise de emissões: ${errorMessage}`);
  }
}

export function generateInsightsSummary(analysisResult: AnalysisResult): string {
  let summary = "Resumo da Análise de Emissões\n";
  summary += "=============================\n\n";

  summary += `Análise Bruta:\n${analysisResult.rawAnalysis}\n\n`;

  if (analysisResult.keyFindings.length > 0) {
    summary += "Achados Principais:\n";
    analysisResult.keyFindings.forEach((finding, i) => {
      summary += `${i + 1}. ${finding}\n`;
    });
    summary += "\n";
  }

  if (analysisResult.recommendations.length > 0) {
    summary += "Recomendações:\n";
    analysisResult.recommendations.forEach((rec, i) => {
      summary += `${i + 1}. ${rec}\n`;
    });
    summary += "\n";
  }

  if (analysisResult.nextSteps.length > 0) {
    summary += "Próximos Passos:\n";
    analysisResult.nextSteps.forEach((step, i) => {
      summary += `${i + 1}. ${step}\n`;
    });
  }

  return summary;
}

export const EmissionAnalyzer = {
  analyze: analyzeEmissions,
};
