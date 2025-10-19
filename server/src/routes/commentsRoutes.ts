import prisma from "../config/database";
import { Router, Request, Response } from "express";

const router = Router();

// Rota de POST pra criar um comentario
router.post("/post-comment", async (req: Request, res: Response) => {
  // Tem que ter o content, company_uuid, ad_product_uuid
    try {
        console.log(`Body recebido: ${req.body}`);
        const { content, companyId, adProductId } = req.body;

        if (!content || !companyId || !adProductId) {
            return res.status(400).json({ message: `Missing fields: ${content} ${companyId} ${adProductId}` });
        }

        await prisma.comment.create({
            data: {
                content,
                companyId: companyId,
                adProductId: adProductId,
                createdAt: new Date()
            }
        });

        return res.status(200).json({ message: `Comment created successfully: ${content}` });
    } catch (error) {
        return res.status(500).json({ message: "Error creating comment", error });
    }
});

// Rota de GET para pegar todos os comentarios de um ad product
router.get("/get-ad-comments", async (req: Request, res: Response) => {
    try {   
        const adProductId = req.query.adProductId as string;

        if (!adProductId) {
            return res.status(400).json({ message: "Ad product ID is required" });
        }

        const comments = await prisma.comment.findMany({
            where: { adProductId: adProductId }
        });

        return res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ message: "Error getting comments", error });
    }
    finally {
        await prisma.$disconnect();
    }
});

// TO-DO: Rota de delete do comentario

export default router;