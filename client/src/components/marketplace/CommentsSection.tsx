'use client';

import { MessageCircle, User, Calendar, ThumbsUp } from 'lucide-react';
import { useCommentsContext } from '@/context/CommentsContext';

export default function CommentsSection() {
  const {
    comments,
    loading,
    error,
    loadingAction,
    likeComment,
    hasUserLiked,
  } = useCommentsContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await likeComment(commentId);
    } catch (error) {
      console.error('Erro ao curtir comentário:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Carregando comentários...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8">
          <div className="flex items-center justify-center text-red-600">
            <MessageCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Comentários</h2>
        <p className="text-gray-600">
          {comments.length === 0
            ? 'Seja o primeiro a comentar!'
            : `${comments.length} comentário${comments.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Lista de comentários */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum comentário ainda
            </h3>
            <p className="text-gray-500">
              Seja o primeiro a compartilhar sua opinião sobre este produto!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Usuário Anônimo
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Botão de like */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    disabled={loadingAction === comment.id}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      hasUserLiked(comment)
                        ? 'text-green-500 bg-green-50 hover:bg-green-100'
                        : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                    }`}
                    title={
                      hasUserLiked(comment)
                        ? 'Remover curtida'
                        : 'Curtir comentário'
                    }
                  >
                    {loadingAction === comment.id ? (
                      <div className="w-4 h-4 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                    ) : (
                      <ThumbsUp
                        className={`w-4 h-4 ${
                          hasUserLiked(comment) ? 'fill-current' : ''
                        }`}
                      />
                    )}
                  </button>
                  <span className="text-sm text-gray-500">
                    {comment.likes.length}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="pl-15">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}