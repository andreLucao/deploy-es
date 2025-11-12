'use client';

import { CircleChevronLeft } from "lucide-react";
import { useState } from "react";

type LoginState = 'form' | 'loading' | 'success' | 'error';

export default function RegisterCard() {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [loginState, setLoginState] = useState<LoginState>('form');

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValid(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const valid = validateEmail(email);
        
        if (!valid) {
            setIsValid(false);
            return;
        }

        setLoginState('loading');
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/magic-link`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ email }),
            });

            // Caso der certo, setar o estado de sucesso; Setei como true para testar
            if (true) {
                setLoginState('success');
            } else {
                setLoginState('error');
            }
        } catch (error) {
            setLoginState('error');
        }
    };

    const renderContent = () => {
        switch (loginState) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 border-b-2 border-[#002E34] mb-4"></div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-3 text-center">Enviando link...</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg px-4">Aguarde enquanto enviamos o link de acesso para seu e-mail.</p>
                    </div>
                );
            
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-3 text-center">Link enviado!</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg mb-3 px-4">
                            Enviamos um link de acesso para <strong className="break-all">{email}</strong>
                        </p>
                        <p className="text-center text-xs sm:text-sm lg:text-base text-gray-700 mb-5 px-4">
                            Verifique sua caixa de entrada e clique no link para fazer login.
                        </p>
                        <button 
                            onClick={() => setLoginState('form')}
                            className="w-full sm:w-auto px-8 bg-[#002E34] text-white font-semibold py-3 rounded-lg hover:bg-[#004443] transition cursor-pointer text-sm sm:text-base"
                        >
                            Tentar outro e-mail
                        </button>
                    </div>
                );
            
            case 'error':
                return (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-3 text-center">Erro ao enviar</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg mb-5 px-4">
                            Não foi possível enviar o link. Tente novamente.
                        </p>
                        <button 
                            onClick={() => setLoginState('form')}
                            className="w-full sm:w-auto px-8 bg-[#002E34] text-white font-semibold py-3 rounded-lg hover:bg-[#004443] transition cursor-pointer text-sm sm:text-base"
                        >
                            Tentar novamente
                        </button>
                    </div>
                );
            
            default:
                return (
                    <>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-3 text-center px-2">Entrar na sua conta</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg px-4 mb-6">Insira seu e-mail para receber o link de acesso.</p>
                        <div className="w-full max-w-md px-2">
                            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                                <div className="mb-6 w-full">
                                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-[#002E34] mb-2">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`font-medium block w-full border ${!isValid ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#002E34] focus:border-transparent`}
                                        required
                                        placeholder="seu.email@exemplo.com"
                                    />
                                    {!isValid && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-2">Por favor, insira um email válido.</p>
                                    )}
                                </div>
                                <button type="submit" className="w-full sm:w-auto px-8 bg-[#002E34] text-white font-semibold py-3 rounded-lg hover:bg-[#004443] transition cursor-pointer text-sm sm:text-base">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </>
                );
        }
    };

    return (           
        <div className="bg-white bg-opacity-20 flex flex-col lg:flex-row backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-12 gap-4 sm:gap-6 lg:gap-12 w-full mx-auto relative overflow-hidden">
            {/* Botão de voltar */}
            <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 cursor-pointer z-10">
                <CircleChevronLeft className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-[#002E34] hover:text-[#004443] transition hover:scale-105" onClick={() => window.location.href = '/'}/>
            </div>
            
            {/* Conteúdo do formulário */}
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 w-full lg:w-1/2 order-2 lg:order-1">
                {renderContent()}
            </div>

            {/* Imagem */}
            <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-auto flex items-center justify-center order-1 lg:order-2">
                <img 
                    src="/imgs/card2.png" 
                    className="rounded-xl lg:rounded-2xl w-full h-full object-cover lg:object-contain max-w-full" 
                    alt="Ilustração" 
                />
            </div>
        </div>
    );
}