export interface Comment {
  id: string;
  content: string;
  companyId: string;
  adProductId: string;
  createdAt: string;
  company?: {
    id: string;
    email: string;
  };
  likes: Array<{
    id: string;
    companyId: string;
    createdAt: string;
    company: {
      id: string;
      email: string;
    };
  }>;
}

export interface CurrentUser {
  id: string;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class CommentsApiService {
  private static async fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  static async getCurrentUser(): Promise<CurrentUser | null> {
    try {
      const response = await this.fetchWithAuth(
        `${API_URL}/api/auth/me`
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error);
      return null;
    }
  }

  static async getComments(adProductId: string): Promise<Comment[]> {
    try {
      const response = await this.fetchWithAuth(
        `${API_URL}/api/comments/get-ad-comments?adProductId=${adProductId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar comentários");
      }

      const data = await response.json();
      return data.comments || [];
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
      throw error;
    }
  }

  static async createComment(
    content: string,
    companyId: string,
    adProductId: string
  ): Promise<Comment> {
    try {
      const response = await this.fetchWithAuth(
        `${API_URL}/api/comments/post-comment`,
        {
          method: "POST",
          body: JSON.stringify({
            content,
            companyId,
            adProductId,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erro ao publicar comentário"
        );
      }

      const data = await response.json();
      return data.comment;
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      throw error;
    }
  }

  static async likeComment(
    commentId: string,
    companyId: string
  ): Promise<void> {
    try {
      const response = await this.fetchWithAuth(
        `${API_URL}/api/comments/like-comment`,
        {
          method: "POST",
          body: JSON.stringify({
            commentId,
            companyId,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao curtir comentário");
      }
    } catch (error) {
      console.error("Erro ao curtir comentário:", error);
      throw error;
    }
  }

  static async unlikeComment(
    commentId: string,
    companyId: string
  ): Promise<void> {
    try {
      const response = await this.fetchWithAuth(
        `${API_URL}/api/comments/unlike-comment`,
        {
          method: "DELETE",
          body: JSON.stringify({
            commentId,
            companyId,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao remover curtida");
      }
    } catch (error) {
      console.error("Erro ao remover curtida:", error);
      throw error;
    }
  }

  static async deleteComment(
    commentId: string,
    companyId: string
  ): Promise<void> {
    try {
      const response = await this.fetchWithAuth(
        `${API_URL}/api/comments/delete-comment/${commentId}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            companyId,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao deletar comentário");
      }
    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
      throw error;
    }
  }
}
