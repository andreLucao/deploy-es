import { Router, Request, Response } from "express";
import { CalculatorService } from "../services/calculator.service";
import prisma from "../config/database";

const router = Router();
const calculatorService = new CalculatorService();

// Rota principal que recebe o formulário completo, calcula e salva todas as emissões.
router.post("/calculate-inventory", async (req: Request, res: Response) => {
   try {
      const data = req.body;

      const requiredFields = ["companyId", "year", "scopes"];
      for (const field of requiredFields) {
         if (!data[field]) {
            return res.status(400).json({
               error: `O campo ${field} é obrigatório no corpo da requisição.`,
            });
         }
      }

      const results = await calculatorService.calculateAndSaveInventory(data);

      return res.status(200).json({
         message: "Inventário calculado e salvo/atualizado com sucesso.",
         data: results,
      });
   } catch (error) {
      console.error("Erro ao processar inventário:", error);
      const errorMessage =
         error instanceof Error
            ? error.message
            : "Erro interno no processamento do inventário.";
      return res.status(500).json({ error: errorMessage });
   }
});

// Rota compleemntar para calcular a soma total
router.get("/calculate-total", async (req: Request, res: Response) => {
   try {
      const { companyId, year } = req.query;

      if (!companyId || !year) {
         return res.status(400).json({
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

// Rota auxiliar para soma por escopo
router.get("/calculate-scope-total", async (req: Request, res: Response) => {
   try {
      const { companyId, year, scope } = req.query;

      if (!companyId || !year || !scope) {
         return res.status(400).json({
            error: "Os parâmetros companyId, year e scope são obrigatórios.",
         });
      }

      const emissions = await calculatorService.getEmissionsByScope(
         companyId as string,
         parseInt(year as string),
         parseInt(scope as string)
      );

      const total = emissions.reduce(
         (sum, emission) => sum + emission.calculatedCo2e,
         0
      );

      return res.status(200).json({
         scope: parseInt(scope as string),
         totalCo2e: total,
         emissionsCount: emissions.length,
         emissions,
      });
   } catch (error) {
      console.error("Erro ao calcular total do escopo:", error);
      return res
         .status(500)
         .json({ error: "Erro ao calcular total do escopo." });
   }
});

router.get("/inventory", async (req: Request, res: Response) => {
   try {
      const { companyId, year } = req.query;

      if (!companyId) {
         return res.status(400).json({
            error: "O parâmetro companyId é obrigatório.",
         });
      }

      const inventory = await calculatorService.getCompanyInventory(
         companyId as string,
         year ? parseInt(year as string) : undefined
      );

      return res.status(200).json(inventory);
   } catch (error) {
      console.error("Erro ao buscar inventário:", error);
      return res.status(500).json({ error: "Erro ao buscar inventário." });
   }
});

router.get("/emissions-by-type", async (req: Request, res: Response) => {
   try {
      const { companyId, year, emissionType } = req.query;

      if (!companyId || !emissionType) {
         return res.status(400).json({
            error: "Os parâmetros companyId e emissionType são obrigatórios.",
         });
      }

      const emissions = await calculatorService.getEmissionsByType(
         companyId as string,
         emissionType as string,
         year ? parseInt(year as string) : undefined
      );

      return res.status(200).json({
         emissionType,
         emissions,
         totalCo2e: emissions.reduce(
            (sum, emission) => sum + emission.calculatedCo2e,
            0
         ),
      });
   } catch (error) {
      console.error("Erro ao buscar emissões por tipo:", error);
      return res
         .status(500)
         .json({ error: "Erro ao buscar emissões por tipo." });
   }
});

router.delete(
   "/delete-emission/:emissionId",
   async (req: Request, res: Response) => {
      try {
         const { emissionId } = req.params;

         await calculatorService.deleteEmission(emissionId);

         return res.status(200).json({
            message: "Emissão deletada (soft-deleted) com sucesso",
            deletedEmissionId: emissionId,
         });
      } catch (error) {
         console.error("Erro ao deletar emissão:", error);
         const errorMessage =
            error instanceof Error ? error.message : "Erro ao deletar emissão.";
         return res.status(500).json({ error: errorMessage });
      }
   }
);

router.get("/emissions-summary", async (req: Request, res: Response) => {
   try {
      const { companyId } = req.query;

      if (!companyId) {
         return res.status(400).json({
            error: "O parâmetro companyId é obrigatório.",
         });
      }

      const summary = await calculatorService.getEmissionsSummaryByYear(
         companyId as string
      );

      return res.status(200).json(summary);
   } catch (error) {
      console.error("Erro ao buscar resumo de emissões:", error);
      return res
         .status(500)
         .json({ error: "Erro ao buscar resumo de emissões." });
   }
});

router.get("/inventory-by-uuid", async (req: Request, res: Response) => {
   // pegar o uuid vinda do parametro e buscar no prisma (tabela emissions)
   try {
      const { uuid } = req.query;

      if (!uuid) {
         return res.status(400).json({
            error: "O parâmetro uuid é obrigatório.",
         });
      }

      const inventoryItem = await prisma.emission.findUnique({
         where: { id: uuid as string },
      });

      if (!inventoryItem) {
         return res.status(404).json({
            error: "Emissão não encontrada.",
         });
      }

      return res.status(200).json(inventoryItem);
   } catch (error) {
      console.error("Erro ao buscar item do inventário:", error);
      return res.status(500).json({ error: "Erro ao buscar item do inventário." });
   }
});


export default router;
