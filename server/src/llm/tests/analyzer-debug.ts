import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { analyzeEmissions } from "../agents/analyzer";
import { generateReport } from "../agents/report-generator";
import { validateAndFormatPrompt } from "../agents/prompt-validator";

const testDatasets = [
  {
    name: "complete",
    data: {
      scopes: {
        scope1: {
          emissions: [
            {
              type: "combustao_estacionaria",
              formData: { fuel: "etanol_anidro", quantity: 1 },
              quantity: 1,
              description: "Combustão de etanol",
              factorValue: 1.52,
              calculatedCo2e: 1.52,
            },
            {
              type: "processos_industriais",
              formData: { gas: "hfc245ca", quantity: 2 },
              quantity: 2,
              description: "Gases industriais",
              factorValue: 1,
              calculatedCo2e: 2,
            },
          ],
          totalCo2e: 3.52,
          emissionsCount: 2,
        },
        scope2: {
          emissions: [
            {
              type: "perdas_energia",
              formData: { annualLoss: 2 },
              quantity: 2,
              description: "Perdas de energia",
              factorValue: 0.0817,
              calculatedCo2e: 0.1634,
            },
          ],
          totalCo2e: 0.1634,
          emissionsCount: 1,
        },
        scope3: {
          emissions: [
            {
              type: "transporte_distribuicao",
              formData: {
                vehicle: "automovel_gasolina",
                transportType: "rodoviario",
                annualConsumption: 21,
              },
              quantity: 21,
              description: "Transporte rodoviário",
              factorValue: 0.12,
              calculatedCo2e: 2.52,
            },
          ],
          totalCo2e: 2.52,
          emissionsCount: 1,
        },
      },
      summary: {
        scope1Total: 3.52,
        scope2Total: 0.1634,
        scope3Total: 2.52,
        totalEmissions: 6.2034,
        totalEmissionsCount: 4,
      },
      timestamp: new Date().toISOString(),
      description: "Inventário Completo",
    },
    userPrompt: "Foque em oportunidades de redução de escopo 2 e 3 com viabilidade técnica.",
  },
];

async function runTest(datasetName: string, emissionData: any, userPrompt?: string) {
  const outputDir = join("server", "src", "llm", "tests", "output", datasetName);
  mkdirSync(outputDir, { recursive: true });

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Testando: ${datasetName}`);
  console.log(`${"=".repeat(60)}`);

  try {
    // PASSO 1: Validar prompt (se fornecido)
    if (userPrompt) {
      console.log("1. Validando prompt do usuário...");
      const { validation, shouldProceed, message } = await validateAndFormatPrompt(userPrompt);

      console.log(`   Status: ${validation.status}`);
      console.log(`   Relevância: ${validation.score}%`);
      console.log(`   Mensagem: ${message}`);

      if (!shouldProceed) {
        console.error(`\n❌ Prompt rejeitado: ${validation.reason}`);
        return false;
      }

      // Salvar resultado da validação
      const validationPath = join(outputDir, "00-prompt-validation.json");
      writeFileSync(
        validationPath,
        JSON.stringify(
          {
            prompt: userPrompt,
            validation,
            message,
          },
          null,
          2
        )
      );
      console.log(`   ✓ Validação salva em: ${validationPath}\n`);
    }

    // PASSO 2: Executar análise
    console.log("2. Executando análise de emissões...");
    const analysisResult = await analyzeEmissions(emissionData, userPrompt);

    if (!analysisResult) {
      console.error(`\n❌ Análise falhou`);
      return false;
    }

    console.log("3. Análise concluída com sucesso!");
    console.log(`   ✓ Insights gerados: ${analysisResult.insights.length}`);
    console.log(`   ✓ Achados principais: ${analysisResult.keyFindings.length}`);
    console.log(`   ✓ Recomendações: ${analysisResult.recommendations.length}`);

    // Salvar resultado da análise
    const analysisPath = join(outputDir, "01-analysis-result.json");
    writeFileSync(analysisPath, JSON.stringify(analysisResult, null, 2));
    console.log(`4. Resultado da análise salvo em: ${analysisPath}`);

    // PASSO 3: Consumir o streaming do relatório
    console.log("\n5. Iniciando streaming do relatório...\n");
    console.log("=".repeat(60));
    let reportContent = "";
    let chunkCount = 0;

    const reportStream = generateReport(analysisResult);

    for await (const chunk of reportStream) {
      reportContent += chunk;
      chunkCount++;
      process.stdout.write(chunk);
    }

    console.log("\n" + "=".repeat(60));
    console.log(`\n   ✓ Relatório recebido em ${chunkCount} chunks`);
    console.log(`   ✓ Tamanho total: ${reportContent.length} caracteres`);

    // Salvar relatório markdown
    const reportPath = join(outputDir, "02-report.md");
    writeFileSync(reportPath, reportContent);
    console.log(`6. Relatório markdown salvo em: ${reportPath}`);

    // Salvar sumário de integração
    const integrationSummary = {
      timestamp: new Date().toISOString(),
      datasetName,
      userPromptProvided: !!userPrompt,
      userPrompt: userPrompt || null,
      emissionDataSummary: {
        totalEmissions: emissionData.summary.totalEmissions,
        scope1Total: emissionData.summary.scope1Total,
        scope2Total: emissionData.summary.scope2Total,
        scope3Total: emissionData.summary.scope3Total,
      },
      analysisResult: {
        insightsCount: analysisResult.insights.length,
        keyFindingsCount: analysisResult.keyFindings.length,
        recommendationsCount: analysisResult.recommendations.length,
        nextStepsCount: analysisResult.nextSteps.length,
      },
      reportResult: {
        chunksReceived: chunkCount,
        contentSize: reportContent.length,
        generatedAt: new Date().toISOString(),
      },
      workflowMetrics: {
        success: true,
      },
    };

    const summaryPath = join(outputDir, "00-integration-summary.json");
    writeFileSync(summaryPath, JSON.stringify(integrationSummary, null, 2));
    console.log(`7. Sumário da integração salvo em: ${summaryPath}`);

    console.log("\n✅ Teste completado com sucesso!");
    return true;
  } catch (error) {
    console.error("\n❌ ERRO DURANTE O TESTE:");
    console.error(error instanceof Error ? error.message : String(error));
    if (error instanceof Error) {
      console.error("\nStack trace:");
      console.error(error.stack);
    }
    return false;
  }
}

async function main() {
  console.log("🧪 Iniciando testes de integração com PromptValidator + Analyzer + ReportGenerator\n");

  let successCount = 0;
  for (const dataset of testDatasets) {
    const success = await runTest(dataset.name, dataset.data, dataset.userPrompt);
    if (success) successCount++;
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`📊 Resumo Final: ${successCount}/${testDatasets.length} testes passaram`);
  console.log(`${"=".repeat(60)}`);

  if (successCount === testDatasets.length) {
    console.log("\n✅ Todos os testes foram bem-sucedidos!");
    process.exit(0);
  } else {
    console.log("\n⚠️  Alguns testes falharam.");
    process.exit(1);
  }
}

main();