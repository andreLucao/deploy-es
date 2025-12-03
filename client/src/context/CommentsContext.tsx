'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useComments } from '@/hooks/useComments';
import { Comment, CurrentUser } from '@/services/comments.api';

interface CommentsContextType {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  currentUser: CurrentUser | null;
  loadingAction: string | null;
  addComment: (content: string) => Promise<Comment>;
  likeComment: (commentId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  hasUserLiked: (comment: Comment) => boolean;
  refetchComments: () => Promise<void>;
}

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export function CommentsProvider({
  adProductId,
  children,
}: {
  adProductId: string;
  children: ReactNode;
}) {
  const {
    comments,
    loading,
    error,
    currentUser,
    loadingAction,
    addComment,
    likeComment,
    deleteComment,
    hasUserLiked,
    refetchComments,
  } = useComments(adProductId);

  return (
    <CommentsContext.Provider
      value={{
        comments,
        loading,
        error,
        currentUser,
        loadingAction,
        addComment,
        likeComment,
        deleteComment,
        hasUserLiked,
        refetchComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useCommentsContext() {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error(
      'useCommentsContext deve ser usado dentro de CommentsProvider'
    );
  }
  return context;
}
