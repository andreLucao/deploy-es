'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, User, Calendar, ThumbsUp, Reply } from 'lucide-react';

interface Comment {
    id: string;
    content: string;
    companyId: string;
    adProductId: string;
    createdAt: string;
    company?: {
        id: string;
        email: string;
    };
    likes: {
        id: string;
        companyId: string;
        createdAt: string;
        company: {
            id: string;
            email: string;
        };
    }[];
}

interface CommentsSectionProps {
    adProductId: string;
}

export default function CommentsSection({ adProductId }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [likingComment, setLikingComment] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://API_URL/api/comments/get-ad-comments?adProductId=${adProductId}`);
                
                if (!response.ok) {
                    throw new Error('Erro ao carregar comentários');
                }
                
                const data = await response.json();
                setComments(data.comments || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [adProductId]);

    useEffect(() => {
        // Buscar dados do usuário logado
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://API_URL/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setCurrentUserId(userData.user.id);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleLikeComment = async (commentId: string) => {
        try {
            setLikingComment(commentId);
            
            // Verificar se o usuário está autenticado
            const authCheck = await fetch("http://API_URL/api/auth/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!authCheck.ok) {
                throw new Error("Você precisa estar logado para curtir comentários.");
            }

            const userData = await authCheck.json();
            const companyId = userData.user.id;

            // Verificar se já curtiu
            const existingLike = comments
                .find(c => c.id === commentId)
                ?.likes.find(l => l.companyId === companyId);

            let response;
            
            if (existingLike) {
                // Se já curtiu, remover o like (unlike)
                response = await fetch('http://API_URL/api/comments/unlike-comment', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ 
                        commentId: commentId,
                        companyId: companyId
                    }),
                });
            } else {
                // Se não curtiu, adicionar o like
                response = await fetch('http://API_URL/api/comments/like-comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ 
                        commentId: commentId,
                        companyId: companyId
                    }),
                });
            }

            if (response.ok) {
                // Recarregar comentários para mostrar a mudança
                const fetchComments = async () => {
                    const response = await fetch(`http://API_URL/api/comments/get-ad-comments?adProductId=${adProductId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setComments(data.comments || []);
                    }
                };
                fetchComments();
            } else {
                throw new Error(existingLike ? 'Erro ao remover curtida' : 'Erro ao curtir comentário');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error instanceof Error ? error.message : 'Erro ao interagir com comentário');
        } finally {
            setLikingComment(null);
        }
    };

    const hasUserLiked = (comment: Comment) => {
        if (!currentUserId) return false;
        return comment.likes.some(like => like.companyId === currentUserId);
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
            {/* Header da seção */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Comentários</h2>
                <p className="text-gray-600">
                    {comments.length === 0 
                        ? 'Seja o primeiro a comentar!' 
                        : `${comments.length} comentário${comments.length !== 1 ? 's' : ''}`
                    }
                </p>
            </div>

            {/* Lista de comentários */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum comentário ainda</h3>
                        <p className="text-gray-500">Seja o primeiro a compartilhar sua opinião sobre este produto!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div 
                            key={comment.id} 
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
                        >
                            {/* Header do comentário */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {'Usuário Anônimo'}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(comment.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Botões de ação */}
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleLikeComment(comment.id)}
                                        disabled={likingComment === comment.id}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                            hasUserLiked(comment) 
                                                ? 'text-green-500 bg-green-50 hover:bg-green-100' 
                                                : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                                        }`}
                                        title={hasUserLiked(comment) ? 'Remover curtida' : 'Curtir comentário'}
                                    >
                                        {likingComment === comment.id ? (
                                            <div className="w-4 h-4 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                                        ) : (
                                            <ThumbsUp className={`w-4 h-4 ${hasUserLiked(comment) ? 'fill-current' : ''}`} />
                                        )}
                                    </button>
                                    <span className="text-sm text-gray-500">
                                        {comment.likes.length}
                                    </span>
                                </div>
                            </div>

                            {/* Conteúdo do comentário */}
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