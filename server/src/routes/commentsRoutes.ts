import { Router, Request, Response } from "express";
import { CommentsService } from "../services/comments.service";

const router = Router();
const commentsService = new CommentsService();

// POST - Criar comentário
router.post("/post-comment", async (req: Request, res: Response) => {
  try {
    const { content, companyId, adProductId } = req.body;

    const comment = await commentsService.createComment({
      content,
      companyId,
      adProductId,
    });

    return res.status(201).json({ comment });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao criar comentário";
    return res.status(400).json({ message });
  }
});

// GET - Obter comentários de um produto
router.get("/get-ad-comments", async (req: Request, res: Response) => {
  try {
    const adProductId = req.query.adProductId as string;

    const comments = await commentsService.getCommentsByAdProduct(adProductId);

    return res.status(200).json({ comments });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao obter comentários";
    return res.status(400).json({ message });
  }
});

// POST - Curtir comentário
router.post("/like-comment", async (req: Request, res: Response) => {
  try {
    const { commentId, companyId } = req.body;

    await commentsService.likeComment(commentId, companyId);

    return res.status(201).json({ message: "Comentário curtido com sucesso" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao curtir comentário";
    const status =
      error instanceof Error && error.message.includes("já curtiu")
        ? 409
        : 400;
    return res.status(status).json({ message });
  }
});

// DELETE - Remover curtida de comentário
router.delete("/unlike-comment", async (req: Request, res: Response) => {
  try {
    const { commentId, companyId } = req.body;

    const deletedCount = await commentsService.unlikeComment(
      commentId,
      companyId
    );

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Curtida não encontrada" });
    }

    return res
      .status(200)
      .json({ message: "Curtida removida com sucesso" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao remover curtida";
    return res.status(400).json({ message });
  }
});

// GET - Obter likes de um comentário
router.get("/get-comment-likes", async (req: Request, res: Response) => {
  try {
    const commentId = req.query.commentId as string;

    const likes = await commentsService.getCommentLikes(commentId);

    return res.status(200).json({ likes });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao obter curtidas";
    return res.status(400).json({ message });
  }
});

// DELETE - Deletar comentário
router.delete("/delete-comment/:commentId", async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { companyId } = req.body;

    await commentsService.deleteComment(commentId, companyId);

    return res.status(200).json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao deletar comentário";
    const status =
      error instanceof Error && error.message.includes("permissão")
        ? 403
        : 400;
    return res.status(status).json({ message });
  }
});

export default router;