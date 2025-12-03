"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  onboarded?: boolean;
  company_name?: string;
  industry?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => Promise<void>;
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
    const checkAuth = async () => {
      try {
        console.log('🔍 [AuthContext] Checking authentication on mount...');
        
        // Try to validate JWT from cookie by calling /api/auth/me
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include authToken cookie
        });

        if (response.ok) {
          const data = await response.json();
          const userData = {
            id: data.user?.id || data.id,
            email: data.user?.email || data.email,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('✅ [AuthContext] User authenticated from cookie:', userData.email);
        } else {
          console.log('⚠️ [AuthContext] No valid JWT in cookie, checking localStorage...');
          // Fallback to localStorage (but clear if no valid JWT)
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            console.log('⚠️ [AuthContext] Found user in localStorage but no valid cookie - clearing');
            localStorage.removeItem('user');
          }
          setUser(null);
        }
      } catch (error) {
        console.error('❌ [AuthContext] Error checking auth:', error);
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      console.log('🔑 [AuthContext] Login called for:', email);
      
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
        // API retorna { user: { id, email, onboarded, company_name, industry } }
        const userData: User = {
          id: data.user?.id || data.id,
          email: data.user?.email || data.email,
          onboarded: data.user?.onboarded ?? false,
          company_name: data.user?.company_name,
          industry: data.user?.industry,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ Login bem-sucedido:', userData.id, 'Onboarded:', userData.onboarded);
      } else {
        const errorData = await response.json();
        console.error('❌ Erro ao buscar usuário autenticado:', errorData);
        setUser(null);
        localStorage.removeItem('user');
        throw new Error('Falha na autenticação - faça login novamente');
      }
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 [AuthContext] Logging out user');
    setUser(null);
    localStorage.removeItem('user');
    // Limpar cookie também se necessário
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const completeOnboarding = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        await response.json();
        const updatedUser = { ...user, onboarded: true } as User;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('✅ Onboarding concluído');
      } else {
        throw new Error('Falha ao completar onboarding');
      }
    } catch (error) {
      console.error('❌ Erro ao completar onboarding:', error);
      throw error;
    }
  };

  const isAuthenticated = !!user;
  const isOnboarded = user?.onboarded ?? false;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isOnboarded, login, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};
