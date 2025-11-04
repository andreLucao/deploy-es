import { Router, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";

const router = Router();
const transactionService = new TransactionService();

router.get("/history/:companyId", async (req: Request, res: Response) => {
   try {
      const { companyId } = req.params;

      if (!companyId) {
         return res
            .status(400)
            .json({ error: "O parâmetro companyId é obrigatório." });
      }

      const history = await transactionService.getOrderHistory(companyId);

      return res.status(200).json({
         message: "Histórico de transações recuperado com sucesso.",
         data: history,
      });
   } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      const errorMessage =
         error instanceof Error
            ? error.message
            : "Erro interno ao buscar histórico.";

      if (errorMessage.includes("Empresa não encontrada")) {
         return res.status(404).json({ error: errorMessage });
      }

      return res.status(500).json({ error: errorMessage });
   }
});

export default router;
