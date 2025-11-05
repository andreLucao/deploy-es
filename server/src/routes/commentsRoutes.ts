import prisma from "../config/database";
import { Router, Request, Response } from "express";

const router = Router();

// Rota de POST pra criar um comentario
router.post("/post-comment", async (req: Request, res: Response) => {
  // Tem que ter o content, company_uuid, ad_product_uuid
    try {
        const { content, companyId, adProductId } = req.body;

        if (!content || !companyId || !adProductId) {
            return res.status(400).json({ message: `Missing fields: ${content} ⌊ ${companyId} ⌊ ${adProductId}` });
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
            where: { adProductId: adProductId },
            include: {
                company: {
                    select: {
                        id: true,
                        email: true
                    }
                },
                likes: {
                    include: {
                        company: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ message: "Error getting comments", error });
    }

});

// Rota de likes para um comentario
router.post("/like-comment", async (req: Request, res: Response) => {
    try {
        const { commentId, companyId } = req.body;

        if (!commentId || !companyId) {
            return res.status(400).json({ message: `Missing fields: ${commentId} ⌊ ${companyId}` });
        }

        await prisma.commentLike.create({
            data: { commentId: commentId, companyId: companyId, createdAt: new Date() }
        });

        return res.status(200).json({ message: `Comment liked successfully: ${commentId} ⌊ ${companyId}` });

    } catch (error) {
        return res.status(500).json({ message: "Error liking comment", error });
    }

});

// Rota de get para pegar os likes de um comentario
router.get("/get-comment-likes", async (req: Request, res: Response) => {
    try {
        const commentId = req.query.commentId as string;

        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required" });
        }

        const likes = await prisma.commentLike.findMany({
            where: { commentId: commentId }
        });

        return res.status(200).json({ likes });
    } catch (error) {
        return res.status(500).json({ message: "Error getting comment likes", error });
    }

});

// Rota para remover like de um comentario
router.delete("/unlike-comment", async (req: Request, res: Response) => {
    try {
        const { commentId, companyId } = req.body;

        if (!commentId || !companyId) {
            return res.status(400).json({ message: `Missing fields: ${commentId} ⌊ ${companyId}` });
        }

        await prisma.commentLike.deleteMany({
            where: { 
                commentId: commentId, 
                companyId: companyId 
            }
        });

        return res.status(200).json({ message: `Comment unliked successfully: ${commentId} ⌊ ${companyId}` });

    } catch (error) {
        return res.status(500).json({ message: "Error unliking comment", error });
    }

});


export default router;