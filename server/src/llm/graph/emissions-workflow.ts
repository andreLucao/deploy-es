/**
 * Workflow completo de análise e geração de relatório
 *
 * Este arquivo integra os agentes de análise e geração de relatório
 * em um pipeline sequencial simples
 *
 * Fluxo:
 * ValidatePrompt → AnalyzeEmissions → GenerateReport
 */

import {
  EmissionsData,
  AnalysisResult,
} from "../schemas/emissions.schema";
import { analyzeEmissions } from "../agents/analyzer";
import { generateReport } from "../agents/report-generator";
import { validateUserPrompt } from "../agents/prompt-validator";

/**
 * Tipo para o retorno final do workflow
 */
export interface WorkflowResult {
  success: boolean;
  analysisResult?: AnalysisResult;
  reportStream?: AsyncIterable<string>;
  error?: string;
  duration: number;
}

/**
 * Função principal para executar o workflow completo
 *
 * Pipeline sequencial:
 * 1. Valida prompt do usuário (se fornecido)
 * 2. Executa análise de emissões
 * 3. Gera relatório baseado nos insights
 */
export async function executeEmissionsWorkflow(
  emissionData: EmissionsData,
  userPrompt?: string
): Promise<WorkflowResult> {
  const startTime = Date.now();

  console.log("[Workflow] Iniciando workflow de emissões...");

  const state: any = {
    emissionData,
    userPrompt: userPrompt || emissionData.userPrompt,
    promptValidation: null,
    analysisResult: null,
    reportResult: null,
    currentStep: "started",
    error: null,
  };

  try {
    // PASSO 1: Validar prompt (se fornecido)
    if (state.userPrompt && state.userPrompt.trim().length > 0) {
      console.log("[Workflow] Iniciando validação de prompt...");

      try {
        const validation = await validateUserPrompt(state.userPrompt);
        state.promptValidation = validation;

        console.log(
          `[Workflow] Validação de prompt concluída - Status: ${validation.status}`
        );

        // Verificar se deve prosseguir
        if (
          validation.status !== "valid" &&
          !(validation.status === "warning" && validation.score >= 40)
        ) {
          const reason = validation.reason;
          const message = `Prompt não validado: ${reason}. O prompt deve estar relacionado a carbono, emissões, GHG Protocol ou sustentabilidade.`;
          console.warn("[Workflow] Workflow encerrado - Prompt inválido:", message);

          const duration = Date.now() - startTime;
          return {
            success: false,
            error: message,
            duration,
          };
        }

        console.log("[Workflow] Prompt validado, prosseguindo com análise");
      } catch (validationError) {
        const errorMessage = validationError instanceof Error ? validationError.message : String(validationError);
        console.error("[Workflow] Erro na validação:", errorMessage);
        state.error = `Erro ao validar prompt: ${errorMessage}`;

        const duration = Date.now() - startTime;
        return {
          success: false,
          error: state.error,
          duration,
        };
      }
    } else {
      console.log("[Workflow] Nenhum prompt fornecido, continuando sem validação");
    }

    // PASSO 2: Executar análise de emissões
    console.log("[Workflow] Iniciando análise de emissões...");

    try {
      const analysisResult = await analyzeEmissions(
        state.emissionData,
        state.userPrompt
      );

      console.log(
        `[Workflow] Análise concluída com ${analysisResult.insights.length} insights`
      );
      state.analysisResult = analysisResult;
    } catch (analysisError) {
      const errorMessage = analysisError instanceof Error ? analysisError.message : String(analysisError);
      console.error("[Workflow] Erro na análise:", errorMessage);
      state.error = errorMessage;

      const duration = Date.now() - startTime;
      return {
        success: false,
        error: state.error,
        duration,
      };
    }

    // PASSO 3: Gerar relatório (retorna AsyncIterable)
    console.log("[Workflow] Iniciando geração de relatório...");

    try {
      if (!state.analysisResult) {
        throw new Error("Análise não foi executada. Impossível gerar relatório.");
      }

      const reportStream = generateReport(state.analysisResult);
      console.log("[Workflow] Stream de relatório iniciado!");
      state.reportStream = reportStream;
    } catch (reportError) {
      const errorMessage = reportError instanceof Error ? reportError.message : String(reportError);
      console.error("[Workflow] Erro na geração do relatório:", errorMessage);
      state.error = errorMessage;

      const duration = Date.now() - startTime;
      return {
        success: false,
        error: state.error,
        duration,
      };
    }

    const duration = Date.now() - startTime;

    console.log(
      `[Workflow] Workflow concluído com sucesso em ${duration}ms`
    );

    return {
      success: true,
      analysisResult: state.analysisResult,
      reportStream: state.reportStream,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error("[Workflow] Erro fatal no workflow:", errorMessage);

    return {
      success: false,
      error: errorMessage,
      duration,
    };
  }
}

/**
 * Função utilitária para registrar o progresso do workflow
 */
export function logWorkflowProgress(state: any): void {
  console.log(`
╔═══════════════════════════════════════╗
║  Workflow Progress Report             ║
╠═══════════════════════════════════════╣
║ Analysis: ${state.analysisResult ? "✓" : "✗"}${" ".repeat(31)} ║
║ Report: ${state.reportResult ? "✓" : "✗"}${" ".repeat(33)} ║
${state.error ? `║ Error: ${state.error}${" ".repeat(Math.max(0, 33 - state.error.length))} ║` : ""}
╚═══════════════════════════════════════╝
  `);
}
