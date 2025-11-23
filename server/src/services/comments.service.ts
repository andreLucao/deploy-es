import prisma from "../config/database";

export interface CreateCommentData {
  content: string;
  companyId: string;
  adProductId: string;
}

export interface CommentWithLikes {
  id: string;
  content: string;
  companyId: string;
  adProductId: string;
  createdAt: Date;
  company: {
    id: string;
    email: string;
  };
  likes: Array<{
    id: string;
    companyId: string;
    createdAt: Date;
    company: {
      id: string;
      email: string;
    };
  }>;
}

export class CommentsService {
  async createComment(data: CreateCommentData): Promise<any> {
    const { content, companyId, adProductId } = data;

    // Validar campos obrigatórios
    if (!content?.trim()) {
      throw new Error("Conteúdo do comentário é obrigatório");
    }

    if (!companyId) {
      throw new Error("ID da empresa é obrigatório");
    }

    if (!adProductId) {
      throw new Error("ID do produto é obrigatório");
    }

    // Validar comprimento do comentário
    if (content.trim().length > 500) {
      throw new Error("Comentário não pode exceder 500 caracteres");
    }

    // Verificar se produto existe
    const product = await prisma.adProduct.findUnique({
      where: { id: adProductId },
    });

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se company existe
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error("Empresa não encontrada");
    }

    return prisma.comment.create({
      data: {
        content: content.trim(),
        companyId,
        adProductId,
        createdAt: new Date(),
      },
      include: {
        company: {
          select: {
            id: true,
            email: true,
          },
        },
        likes: {
          include: {
            company: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async getCommentsByAdProduct(adProductId: string): Promise<CommentWithLikes[]> {
    if (!adProductId) {
      throw new Error("ID do produto é obrigatório");
    }

    return prisma.comment.findMany({
      where: { adProductId },
      include: {
        company: {
          select: {
            id: true,
            email: true,
          },
        },
        likes: {
          include: {
            company: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async likeComment(commentId: string, companyId: string): Promise<any> {
    if (!commentId || !companyId) {
      throw new Error("ID do comentário e ID da empresa são obrigatórios");
    }

    // Verificar se comentário existe
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error("Comentário não encontrado");
    }

    // Verificar se já foi curtido
    const existingLike = await prisma.commentLike.findFirst({
      where: {
        commentId,
        companyId,
      },
    });

    if (existingLike) {
      throw new Error("Você já curtiu este comentário");
    }

    return prisma.commentLike.create({
      data: {
        commentId,
        companyId,
        createdAt: new Date(),
      },
    });
  }

  async unlikeComment(commentId: string, companyId: string): Promise<number> {
    if (!commentId || !companyId) {
      throw new Error("ID do comentário e ID da empresa são obrigatórios");
    }

    const result = await prisma.commentLike.deleteMany({
      where: {
        commentId,
        companyId,
      },
    });

    return result.count;
  }

  async getCommentLikes(commentId: string): Promise<any[]> {
    if (!commentId) {
      throw new Error("ID do comentário é obrigatório");
    }

    return prisma.commentLike.findMany({
      where: { commentId },
      include: {
        company: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteComment(commentId: string, companyId: string): Promise<void> {
    if (!commentId || !companyId) {
      throw new Error("ID do comentário e ID da empresa são obrigatórios");
    }

    // Verificar se comentário pertence à empresa
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error("Comentário não encontrado");
    }

    if (comment.companyId !== companyId) {
      throw new Error("Você não tem permissão para deletar este comentário");
    }

    // Deletar todos os likes do comentário antes de deletar o comentário
    await prisma.commentLike.deleteMany({
      where: { commentId },
    });

    // Deletar o comentário
    await prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
