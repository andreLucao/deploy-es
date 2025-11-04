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

router.get("/", async (_req: Request, res: Response) => {
   try {
      //Pega todos os produtos de emissão do banco de dados
      const allProducts = await emissionProductsService.getAllEmissionProducts();

      //Agrupamento por escopo
      const productsByScope = {

         scope1: allProducts
            .filter(p => p.scope === "1")
            .map(p => ({ name: p.name, unit: p.unit })),

         scope2: allProducts
            .filter(p => p.scope === "2")
            .map(p => ({ name: p.name, unit: p.unit })),

         scope3: allProducts
            .filter(p => p.scope === "3")
            .map(p => ({ name: p.name, unit: p.unit })),
      };

      return res.status(200).json(productsByScope);
   } catch(error) {
      console.error("Erro ao buscar produtos de emissão:", error);
      return res.status(500).json({ error: "Erro interno no servidor."});
   }
});

export default router;
