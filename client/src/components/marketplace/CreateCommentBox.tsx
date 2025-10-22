import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle } from "lucide-react";

interface CreateCommentBoxProps {
    adProductId: string;
    onCommentAdded?: () => void; // Nova prop para callback
}

export default function CreateCommentBox({ adProductId, onCommentAdded }: CreateCommentBoxProps) {
    // Use-state pra botao de publicar comentario
    const [isPublishing, setIsPublishing] = useState(false);
    const [comment, setComment] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    // Adicione no início do componente CreateCommentBox
    console.log('CreateCommentBox props:', { adProductId });

    // No CreateCommentBox.tsx, modifique o handlePublishComment:

    const handlePublishComment = async () => {
        if (!comment.trim()) return;
        
        setIsPublishing(true);
        setIsSuccess(false);
        
        try {
            // First check if user is authenticated (igual ao AdFormModal)
            const authCheck = await fetch("http://API_URL/api/auth/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!authCheck.ok) {
                throw new Error(
                    "Você precisa estar logado para comentar. Faça login primeiro."
                );
            }

            // Get user data from auth response
            const userData = await authCheck.json();
            const companyId = userData.user.id;

            // Chamar a API para publicar o comentário
            const response = await fetch('http://API_URL/api/comments/post-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Importante para enviar cookies
                body: JSON.stringify({ 
                    content: comment, 
                    companyId: companyId, // Usar o ID do usuário autenticado
                    adProductId: adProductId 
                }),
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                setIsPublishing(false);
                setComment("");
                setIsSuccess(true);
                
                // Chamar a função para recarregar comentários
                if (onCommentAdded) {
                    onCommentAdded();
                }
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Falha ao publicar comentário');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsPublishing(false);
            // Aqui você pode mostrar uma mensagem de erro para o usuário
            alert(error instanceof Error ? error.message : 'Erro ao publicar comentário');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                {/* Header do comentário */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Deixe seu comentário</h3>
                        <p className="text-sm text-gray-500">Compartilhe sua opinião sobre este produto</p>
                    </div>
                </div>

                {/* Textarea de comentário */}
                <div className="mb-4">
                    <textarea 
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Escreva seu comentário aqui..."
                        className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 placeholder:text-gray-400 text-gray-700"
                        disabled={isPublishing}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                            {comment.length}/500 caracteres
                        </span>
                        {comment.length > 450 && (
                            <span className="text-xs text-amber-600">
                                Quase no limite
                            </span>
                        )}
                    </div>
                </div>

                {/* Botão de publicar */}
                <div className="flex justify-end">
                    <Button 
                        onClick={handlePublishComment}
                        disabled={isPublishing || !comment.trim()}
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

                {/* Mensagem de sucesso */}
                {isPublishing && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            {/* Mensagem de sucesso ou erro */}
                            {isSuccess ? (
                                <span className="text-sm font-medium">Comentário publicado com sucesso!</span>
                            ) : (
                                <span className="text-sm font-medium">Erro ao publicar comentário</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}