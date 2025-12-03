import { useState, useEffect, useCallback } from 'react';
import { CommentsApiService, Comment, CurrentUser } from '@/services/comments.api';

export function useComments(adProductId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Carregar usuário atual
  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await CommentsApiService.getCurrentUser();
      setCurrentUser(user);
    };

    loadCurrentUser();
  }, []);

  // Carregar comentários
  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CommentsApiService.getComments(adProductId);
      setComments(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar comentários";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [adProductId]);

  useEffect(() => {
    loadComments();
  }, [adProductId, loadComments]);

  // Criar comentário com update otimista
  const addComment = useCallback(
    async (content: string) => {
      if (!currentUser) {
        throw new Error("Você precisa estar logado para comentar");
      }

      const tempId = `temp-${Date.now()}`;
      const optimisticComment: Comment = {
        id: tempId,
        content,
        companyId: currentUser.id,
        adProductId,
        createdAt: new Date().toISOString(),
        company: {
          id: currentUser.id,
          email: currentUser.email,
        },
        likes: [],
      };

      // Adicionar otimisticamente
      setComments((prev) => [optimisticComment, ...prev]);

      try {
        setLoadingAction(tempId);
        const newComment = await CommentsApiService.createComment(
          content,
          currentUser.id,
          adProductId
        );

        // Substituir comentário temporário pelo real
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === tempId ? newComment : comment
          )
        );

        return newComment;
      } catch (err) {
        // Remover comentário otimista em caso de erro
        setComments((prev) => prev.filter((c) => c.id !== tempId));
        throw err;
      } finally {
        setLoadingAction(null);
      }
    },
    [currentUser, adProductId]
  );

  // Like comentário com update otimista
  const likeComment = useCallback(
    async (commentId: string) => {
      if (!currentUser) {
        throw new Error("Você precisa estar logado para curtir comentários");
      }

      const originalComments = comments;

      try {
        setLoadingAction(commentId);

        // Update otimista
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === commentId) {
              const alreadyLiked = comment.likes.some(
                (like) => like.companyId === currentUser.id
              );

              if (alreadyLiked) {
                // Unlike
                return {
                  ...comment,
                  likes: comment.likes.filter(
                    (like) => like.companyId !== currentUser.id
                  ),
                };
              } else {
                // Like
                return {
                  ...comment,
                  likes: [
                    ...comment.likes,
                    {
                      id: `temp-like-${Date.now()}`,
                      companyId: currentUser.id,
                      createdAt: new Date().toISOString(),
                      company: {
                        id: currentUser.id,
                        email: currentUser.email,
                      },
                    },
                  ],
                };
              }
            }
            return comment;
          })
        );

        // Verificar se já foi curtido
        const comment = comments.find((c) => c.id === commentId);
        const alreadyLiked = comment?.likes.some(
          (like) => like.companyId === currentUser.id
        );

        if (alreadyLiked) {
          await CommentsApiService.unlikeComment(commentId, currentUser.id);
        } else {
          await CommentsApiService.likeComment(commentId, currentUser.id);
        }
      } catch (err) {
        // Reverter em caso de erro
        setComments(originalComments);
        throw err;
      } finally {
        setLoadingAction(null);
      }
    },
    [comments, currentUser]
  );

  // Deletar comentário com update otimista
  const deleteComment = useCallback(
    async (commentId: string) => {
      if (!currentUser) {
        throw new Error("Você precisa estar logado para deletar comentários");
      }

      const originalComments = comments;

      try {
        setLoadingAction(commentId);

        // Update otimista
        setComments((prev) => prev.filter((c) => c.id !== commentId));

        await CommentsApiService.deleteComment(commentId, currentUser.id);
      } catch (err) {
        // Reverter em caso de erro
        setComments(originalComments);
        throw err;
      } finally {
        setLoadingAction(null);
      }
    },
    [comments, currentUser]
  );

  const hasUserLiked = (comment: Comment) => {
    if (!currentUser) return false;
    return comment.likes.some((like) => like.companyId === currentUser.id);
  };

  return {
    comments,
    loading,
    error,
    currentUser,
    loadingAction,
    addComment,
    likeComment,
    deleteComment,
    hasUserLiked,
    refetchComments: loadComments,
  };
}
