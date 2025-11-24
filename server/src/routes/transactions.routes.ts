import { Router, Request, Response } from "express";
import { TransactionsService } from "../services/transactions.service";

const router = Router();
const transactionsService = new TransactionsService();

router.post("/checkout", async (req: Request, res: Response) => {
   try {
      const { cartItems, totalPrice, userId } = req.body;

      if (!cartItems || cartItems.length === 0 || !userId) {
         return res
            .status(400)
            .json({ error: "Dados de checkout incompletos." });
      }

      const transaction = await transactionsService.checkout({
         cartItems,
         totalPrice,
         userId,
      });

      return res.status(201).json({
         message: "Transação concluída com sucesso.",
         orderId: transaction.id,
      });
   } catch (error) {
      console.error("ERRO NO CHECKOUT:", error);
      if (
         error instanceof Error &&
         error.message.includes("Estoque insuficiente")
      ) {
         return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({
         error: "Falha no processamento da transação. Verifique os logs.",
      });
   }
});

router.get("/history/:companyId", async (req: Request, res: Response) => {
   try {
      const { companyId } = req.params;

      if (!companyId) {
         return res
            .status(400)
            .json({ error: "O parâmetro companyId é obrigatório." });
      }

      const history = await transactionsService.getOrderHistory(companyId);

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
