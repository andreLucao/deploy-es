import { Router, Request, Response } from "express";
import { EmissionProductsService } from "../services/emission_products.service";

const router = Router();
const emissionProductsService = new EmissionProductsService();

router.post("/", async (req: Request, res: Response) => {
   try {
      const { name, unit, scope } = req.body;
      const newProduct = await emissionProductsService.createEmissionProduct(
         name,
         unit,
         scope
      );
      return res.status(201).json(newProduct);
   } catch (error) {
      console.error("Erro ao criar produto de emissão:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
   }
});

export default router;
