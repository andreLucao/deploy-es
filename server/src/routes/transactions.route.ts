// server/src/routes/transactions.routes.ts
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

export default router;
