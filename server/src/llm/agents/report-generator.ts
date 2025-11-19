/**
 * Nó de Geração de Relatório - Next node após análise
 *
 * Gera relatório em formato markdown puro para streaming
 */

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import type { AnalysisResult } from "../schemas/emissions.schema";

/**
 * Interface para o relatório gerado em markdown puro
 */
export interface GeneratedReport {
  title: string;
  content: string; // Markdown puro
  generated_at: string;
}

/**
 * Nó 1: Formata insights para relatório
 *
 * Recebe os insights do analyzer e formata para ser visualizável
 */
export async function formatInsightsForReport(
  analysisResult: AnalysisResult
): Promise<string> {
  const insights = analysisResult.insights
    .map(
      (insight) => `
- **${insight.title}** (${insight.category})
  - Escopo: ${insight.scope}
  - Impacto: ${insight.impact}
  - ${insight.description}
  ${insight.recommendation ? `- Recomendação: ${insight.recommendation}` : ""}
`
    )
    .join("\n");

  return insights;
}

/**
 * Nó 2: Gera relatório com ChatGPT em markdown (Streaming)
 *
 * Usa os insights para criar um relatório executivo formatado em markdown
 * Retorna um AsyncIterable dos chunks conforme são recebidos do modelo
 */
export async function* generateReportWithAI(
  analysisResult: AnalysisResult
): AsyncIterable<string> {
  const llm = new ChatOpenAI({
    model: "gpt-5-nano",
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Formata os insights
  const formattedInsights = await formatInsightsForReport(analysisResult);

  const prompt = `
Você é um especialista em sustentabilidade e inventários de GEE segundo o GHG Protocol.
Analise os seguintes insights e gere um relatório profissional e detalhado EM MARKDOWN.

INSIGHTS DA ANÁLISE:
${formattedInsights}

ACHADOS PRINCIPAIS:
${analysisResult.keyFindings.map((f) => `- ${f}`).join("\n")}

RECOMENDAÇÕES:
${analysisResult.recommendations.map((r) => `- ${r}`).join("\n")}

PRÓXIMOS PASSOS:
${analysisResult.nextSteps.map((s) => `- ${s}`).join("\n")}

ESTRUTURA DO RELATÓRIO (EM MARKDOWN):

## RESUMO EXECUTIVO
- Sintetize as emissões totais e período
- Destaque os principais achados
- Indique o escopo mais relevante

## METODOLOGIA
- Explique brevemente o GHG Protocol
- Descreva os três escopos

## RESULTADOS POR ESCOPO
Para cada escopo (1, 2 e 3):
- Total de emissões e percentual do total
- Detalhe cada categoria de emissão incluindo:
  - Descrição da atividade
  - Quantidade consumida/processada
  - Emissões geradas (tCO₂e)
  - Fator de emissão utilizado
- Análise interpretativa dos resultados

## ANÁLISE E INTERPRETAÇÃO
- Distribuição percentual entre escopos
- Ranking das principais fontes (do maior para o menor)
- Identifique padrões e concentrações
- Utilize os insights fornecidos para enriquecer a análise

## OPORTUNIDADES DE REDUÇÃO
Com base nos insights e nos dados:
- Priorize ações pela relevância das emissões
- Sugira tecnologias e práticas específicas
- Indique possíveis co-benefícios
- Estime potencial de redução quando possível

## METAS E COMPROMISSOS
- Sugira metas de curto, médio e longo prazo
- Proponha KPIs de monitoramento
- Recomende engajamento de stakeholders

## CONSIDERAÇÕES FINAIS
- Sintetize as principais conclusões
- Reforce as oportunidades prioritárias
- Mencione próximos passos

DIRETRIZES DE FORMATAÇÃO:
- Use markdown para estruturação (use ## para títulos principais e ### para subtítulos)
- Inclua títulos e subtítulos hierárquicos
- Apresente números com 2 casas decimais
- Use listas quando apropriado (- para itens de lista)
- Use **negrito** para destacar conceitos importantes
- Mantenha tom profissional e técnico
- Cite metodologias e referências quando relevante

DIRETRIZES DE CONTEÚDO:
- Integre naturalmente os insights fornecidos
- Não mencione explicitamente "de acordo com os insights" - incorpore organicamente
- Seja específico nas recomendações
- Contextualize os números (percentuais, comparações)
- Priorize informações acionáveis

Por favor, gere um relatório executivo EM MARKDOWN com a seguinte estrutura:
{
  "title": "Título do Relatório",
  "content": "Conteúdo completo do relatório em markdown com ##Títulos, parágrafos, listas e formatação",
  "action_items": [
    {
      "priority": "high|medium|low",
      "action": "Descrição da ação",
      "timeline": "Prazo para implementação",
      "responsible": "Departamento responsável",
      "estimated_impact": "Impacto estimado em redução de CO2e"
    }
  ]
}

Garanta que o JSON é válido e que o campo 'content' contém MARKDOWN puro com títulos, listas e formatação.
`;

  const message = new HumanMessage(prompt);
  const stream = await llm.stream([message]);

  for await (const chunk of stream) {
    if (chunk.content) {
      const content = typeof chunk.content === "string"
        ? chunk.content
        : chunk.content.map((c: any) => c.text).join("");

      if (content) {
        yield content;
      }
    }
  }
}


/**
 * Função principal para gerar relatório (Streaming)
 *
 * Esta função retorna um AsyncIterable dos chunks do relatório
 * conforme são recebidos do modelo de IA
 *
 * @param analysisResult - Resultado da análise (output do analyzer.ts)
 * @returns AsyncIterable<string> - Stream dos chunks do relatório
 */
export function generateReport(
  analysisResult: AnalysisResult
): AsyncIterable<string> {
  console.log("[ReportGenerator] Iniciando geração de relatório...");

  return (async function* () {
    try {
      for await (const chunk of generateReportWithAI(analysisResult)) {
        yield chunk;
      }
      console.log("[ReportGenerator] Relatório gerado com sucesso!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[ReportGenerator] Erro ao gerar relatório:", errorMessage);
      throw new Error(`Falha na geração do relatório: ${errorMessage}`);
    }
  })();
}
