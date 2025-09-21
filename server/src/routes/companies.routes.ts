import { Router, Request, Response } from "express";
import { CompaniesService } from "../services/companies.service";

const router = Router();
const companiesService = new CompaniesService();

router.post("/", async (req: Request, res: Response) => {
   try {
      const { email } = req.body;
      const newCompany = await companiesService.createCompany(email);
      return res.status(201).json(newCompany);
   } catch (error) {
      console.error("Erro ao criar empresa:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
   }
});

export default router;
