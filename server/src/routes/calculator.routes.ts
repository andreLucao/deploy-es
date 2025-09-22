import { Router, Request, Response } from "express";
import { CalculatorService } from "../services/calculator.service";

const router = Router();
const calculatorService = new CalculatorService();

// Endpoint para salvar ou atualizar um registro de emissão individual
router.post("/save-emission", async (req: Request, res: Response) => {
   try {
      const data = req.body;
      const result = await calculatorService.saveEmission(data);
      return res.status(201).json(result);
   } catch (error) {
      console.error("Erro ao salvar emissão:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
   }
});

// Endpoint para calcular o total de emissões de uma empresa em um ano
router.get("/calculate-total", async (req: Request, res: Response) => {
   try {
      const { companyId, year } = req.query;

      if (!companyId || !year) {
         return res
            .status(400)
            .json({
               error: "Os parâmetros companyId e year são obrigatórios.",
            });
      }

      const totalCo2e = await calculatorService.calculateTotalEmissions(
         companyId as string,
         Number(year)
      );

      return res.status(200).json({ totalCo2e });
   } catch (error) {
      console.error("Erro ao calcular o total:", error);
      return res
         .status(500)
         .json({ error: "Erro ao calcular o total de emissões." });
   }
});

export default router;
