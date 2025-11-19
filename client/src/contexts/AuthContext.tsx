"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há um usuário salvo no localStorage ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // Buscar informações do usuário da API /api/auth/me (rota que lê JWT do cookie)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies (authToken)
      });

      if (response.ok) {
        const data = await response.json();
        // API retorna { user: { id, email } }
        const userData = {
          id: data.user?.id || data.id,
          email: data.user?.email || data.email,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ Login bem-sucedido com ID correto:', userData.id);
      } else {
        const errorData = await response.json();
        console.error('❌ Erro ao buscar usuário autenticado:', errorData);
        // Remove fallback - se não conseguir autenticar, usuário deve fazer login novamente
        setUser(null);
        localStorage.removeItem('user');
        throw new Error('Falha na autenticação - faça login novamente');
      }
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      // Remove fallback que usava email como ID - força re-autenticação correta
      setUser(null);
      localStorage.removeItem('user');
      throw error; // Propaga erro para o componente tratar
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Limpar cookie também se necessário
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
