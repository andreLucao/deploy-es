import { Router, Request, Response } from "express";
import { EmissionFactorsService } from "../services/emission_factors.service";

const router = Router();
const emissionFactorsService = new EmissionFactorsService();

router.post("/", async (req: Request, res: Response) => {
   try {
      const { emissionProductId, factorValue, region, year } = req.body;
      const newFactor = await emissionFactorsService.createEmissionFactor(
         emissionProductId,
         factorValue,
         region,
         year
      );
      return res.status(201).json(newFactor);
   } catch (error) {
      console.error("Erro ao criar fator de emissão:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
   }
});

export default router;
