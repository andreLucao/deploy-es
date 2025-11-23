'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { useCommentsContext } from '@/context/CommentsContext';

export default function CreateCommentBox() {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { currentUser, addComment, loadingAction } = useCommentsContext();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handlePublishComment = async () => {
    if (!content.trim()) return;

    if (!currentUser) {
      setErrorMessage('Você precisa estar logado para comentar');
      return;
    }

    try {
      await addComment(content);
      setContent('');
      setSuccessMessage('Comentário publicado com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao publicar comentário';
      setErrorMessage(message);
    }
  };

  const isPublishing = loadingAction !== null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Deixe seu comentário</h3>
            <p className="text-sm text-gray-500">
              Compartilhe sua opinião sobre este produto
            </p>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={handleCommentChange}
            placeholder="Escreva seu comentário aqui..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 placeholder:text-gray-400 text-gray-700"
            disabled={isPublishing}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              {content.length}/500 caracteres
            </span>
            {content.length > 450 && (
              <span className="text-xs text-amber-600">Quase no limite</span>
            )}
          </div>
        </div>

        {/* Botão */}
        <div className="flex justify-end">
          <Button
            onClick={handlePublishComment}
            disabled={isPublishing || !content.trim() || !currentUser}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publicando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Publicar Comentário
              </div>
            )}
          </Button>
        </div>

        {/* Mensagens de status */}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {!currentUser && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-blue-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">
              Faça login para comentar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}