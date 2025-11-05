// src/routes/adProduct.routes.ts
import { Router, Request, Response } from "express";
import { AdProductService } from "../services/adProduct.service";

// Import the authentication middleware
const jwt = require("jsonwebtoken");

interface AuthRequest extends Request {
   user?: {
      email: string;
      id: string;
   };
}

const verifyToken = (req: AuthRequest, res: Response, next: any): void => {
   // Try to get token from cookie first, then from Authorization header
   const token =
      req.cookies.authToken || req.headers.authorization?.split(" ")[1];

   if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      res.status(401).json({ error: "Invalid token" });
   }
};

const router: Router = Router();
const adProductService = new AdProductService();

// GET /adProducts - Listar todos os anúncios
router.get("/", async (req: Request, res: Response) => {
   try {
      const start = performance.now();
      const adProducts = await adProductService.findAll();
      
      const end = performance.now();
      console.log(`Tempo de resposta da rota de anuncios: ${end - start} ms`);

      return res.status(200).json(adProducts);
   } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
   }
});

// GET /api/adProducts/featured - Listar anúncios destaque
router.get("/featured", async (req: Request, res: Response) => {
   try {
      const queryLimit = req.query.limit as string;
      const featuredAds = await adProductService.findFeatured(queryLimit);
      return res.status(200).json(featuredAds);
      
   } catch (error) {
      console.error("Erro ao buscar anúncios destaque:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
   }
});

// GET /adProducts/:id - Buscar um anúncio específico
router.get("/:id", async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const adProduct = await adProductService.findById(id);

      if (!adProduct) {
         return res.status(404).json({ error: "Anúncio não encontrado" });
      }

      return res.status(200).json(adProduct);
   } catch (error) {
      console.error("Erro ao buscar anúncio:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
   }
});

// POST /adProducts - Criar um novo anúncio
router.post("/", verifyToken, async (req: AuthRequest, res: Response) => {
   try {
      const data = req.body;

      // Get companyId from authenticated user instead of trusting client
      const companyId = req.user?.id;

      if (!companyId) {
         return res
            .status(401)
            .json({ error: "Company ID not found in token" });
      }

      // Remove companyId from client data and use the authenticated one
      const { companyId: _, ...adData } = data;
      const dataWithAuthCompanyId = {
         ...adData,
         companyId: companyId,
      };

      const newAdProduct = await adProductService.create(dataWithAuthCompanyId);
      return res.status(201).json(newAdProduct);
   } catch (error) {
      console.error("Erro ao criar anúncio:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
   }
});

// PUT /adProducts/:id - Atualizar um anúncio
router.put("/:id", async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const data = req.body;

      const updatedAdProduct = await adProductService.update(id, data);
      return res.status(200).json(updatedAdProduct);
   } catch (error) {
      console.error("Erro ao atualizar anúncio:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
   }
});

// DELETE /adProducts/:id - Excluir um anúncio
router.delete("/:id", async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      await adProductService.delete(id);
      return res.status(204).send();
   } catch (error) {
      console.error("Erro ao excluir anúncio:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
   }
});

export default router;
