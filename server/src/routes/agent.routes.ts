import { Router, Request, Response } from "express";
import { analyzeEmissions } from "../llm/agents/analyzer";
import { generateReport } from "../llm/agents/report-generator";
import { validateUserPrompt } from "../llm/agents/prompt-validator";

const router = Router();

/**
 * POST /api/agents/validate-prompt
 * Validates user prompt to ensure it's related to emissions/carbon
 */
router.post("/validate-prompt", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt é obrigatório e deve ser uma string",
      });
    }

    const validation = await validateUserPrompt(prompt);

    return res.status(200).json({
      validation,
    });
  } catch (error) {
    console.error("Erro ao validar prompt:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao validar prompt";
    return res.status(500).json({ error: errorMessage });
  }
});

/**
 * POST /api/agents/analyze
 * Analyzes emissions data using the analyzer agent
 */
router.post("/analyze", async (req: Request, res: Response) => {
  try {
    const { emissionData, userPrompt } = req.body;

    if (!emissionData) {
      return res.status(400).json({
        error: "emissionData é obrigatório",
      });
    }

    const analysisResult = await analyzeEmissions(emissionData, userPrompt);

    return res.status(200).json({
      success: true,
      data: analysisResult,
    });
  } catch (error) {
    console.error("Erro ao analisar emissões:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao analisar emissões";
    return res.status(500).json({ error: errorMessage });
  }
});

/**
 * POST /api/agents/generate-report
 * Generates a markdown report using streaming with newline-delimited JSON
 *
 * Expected body:
 * {
 *   emissionData: EmissionsData,
 *   userPrompt?: string // Optional custom prompt
 * }
 *
 * Response format: newline-delimited JSON (NDJSON)
 * Each line is a complete JSON object:
 * {"type":"analysis_complete","data":{...}}
 * {"type":"report_chunk","chunk":"..."}
 * {"type":"report_complete"}
 */
router.post("/generate-report", async (req: Request, res: Response) => {
  try {
    const { emissionData, userPrompt } = req.body;

    if (!emissionData) {
      return res.status(400).json({
        error: "emissionData é obrigatório",
      });
    }

    // Set response headers for streaming with NDJSON
    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Step 1: Analyze emissions
    console.log("[Agent Route] Iniciando análise de emissões...");
    const analysisResult = await analyzeEmissions(emissionData, userPrompt);

    // Send analysis complete event
    res.write(
      JSON.stringify({
        type: "analysis_complete",
        data: analysisResult,
      }) + "\n"
    );

    // Step 2: Stream report generation
    console.log("[Agent Route] Iniciando geração de relatório com stream...");
    const reportStream = generateReport(analysisResult);

    for await (const chunk of reportStream) {
      // Send each chunk as a separate line of JSON
      res.write(
        JSON.stringify({
          type: "report_chunk",
          chunk: chunk,
        }) + "\n"
      );
    }

    // Send completion event
    res.write(
      JSON.stringify({
        type: "report_complete",
      }) + "\n"
    );

    res.end();
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao gerar relatório";

    // Send error event
    res.write(
      JSON.stringify({
        type: "error",
        error: errorMessage,
      }) + "\n"
    );

    res.end();
  }
});

export default router;
