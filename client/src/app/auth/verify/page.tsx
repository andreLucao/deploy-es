'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: string;
  email: string;
}

interface VerifyResponse {
  token?: string;
  user?: User;
  error?: string;
}

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your account...');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link. Please try again.');
      return;
    }

    // Call your backend to verify the magic link
    const verifyMagicLink = async () => {
      try {
        console.log('🔐 [Verify] Calling backend /api/auth/verify...');
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`,
          {
            method: 'GET',
            credentials: 'include', // CRITICAL: This allows HTTP-only cookies to be set
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data: VerifyResponse = await response.json();

        if (response.ok && data.token && data.user) {
          console.log('✅ [Verify] Magic link verified, cookie should be set');
          console.log('✅ [Verify] User data:', data.user);
          
          // Buscar dados completos do usuário autenticado (com UUID correto do JWT)
          try {
            await login(data.user.email);
            console.log('✅ [Verify] Dados do usuário carregados com sucesso');
          } catch (loginError) {
            console.error('❌ [Verify] Erro ao carregar dados do usuário:', loginError);
          }
          
          setStatus('success');
          setMessage('Login successful! Redirecting to your dashboard...');
          
          // Redirect to main application after a short delay
          setTimeout(() => {
            console.log('🔄 [Verify] Redirecting to /marketplace...');
            router.push('/marketplace');
          }, 2000);
        } else {
          throw new Error(data.error || 'Verification failed');
        }
      } catch (error) {
        console.error('❌ [Verify] Verification error:', error);
        setStatus('error');
        setMessage(
          error instanceof Error 
            ? error.message 
            : 'Failed to verify your account. Please try again.'
        );
      }
    };

    verifyMagicLink();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002e34] to-[#00e07f] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 bg-[#00e07f] rounded-full"></div>
          <h1 className="text-2xl font-bold text-[#002e34]">EcoChange</h1>
        </div>

        {/* Status Content */}
        <div className="space-y-4">
          {status === 'loading' && (
            <>
              <div className="w-12 h-12 mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00e07f] border-t-transparent"></div>
              </div>
              <h2 className="text-xl font-semibold text-[#002e34]">Verifying Account</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-12 h-12 mx-auto">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-green-600">Success!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-12 h-12 mx-auto">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-red-600">Verification Failed</h2>
              <p className="text-gray-600">{message}</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-4 bg-[#00e07f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#00c96b] transition-colors"
              >
                Back to Login
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If you didn&apos;t request this verification, please ignore this email.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading verification...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
