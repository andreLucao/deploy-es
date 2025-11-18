import { Router, Request, Response } from "express";
import { ReportsService } from "../services/reports.service";

const router = Router();
const reportsService = new ReportsService();

/**
 * GET /api/reports/dashboard-summary
 * Retorna todos os dados agregados para construir o dashboard.
 */
router.get("/dashboard-summary", async (req: Request, res: Response) => {
   try {
      // Assume que o companyId virá da query string ou de um token de autenticação
      const { companyId } = req.query;

      if (!companyId) {
         return res
            .status(400)
            .json({ error: "O parâmetro companyId é obrigatório." });
      }

      const summary = await reportsService.getDashboardSummary(
         companyId as string
      );

      return res.status(200).json(summary);
   } catch (error) {
      console.error("Erro ao buscar resumo do dashboard:", error);
      const errorMessage =
         error instanceof Error
            ? error.message
            : "Erro interno ao buscar dados do dashboard.";

      if (errorMessage.includes("Empresa não encontrada")) {
         return res.status(404).json({ error: errorMessage });
      }

      return res.status(500).json({ error: errorMessage });
   }
});

export default router;
