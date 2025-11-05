import { Router, Response, NextFunction, Request } from "express";
import { CompaniesService } from "../services/companies.service";


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


const router = Router();
const companiesService = new CompaniesService();


router.get("/", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const email = req.user?.email;

    if (!email) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const company = await companiesService.getCompanyCreditsByEmail(email);


    if (!company) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }

    return res.json({ credits: company.balance });
  } catch (error) {
    console.error("Erro ao buscar créditos:", error);
    return res.status(500).json({ error: "Erro ao buscar créditos" });
  }
});

export default router;
