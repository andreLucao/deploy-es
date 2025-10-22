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
            const response = await fetch('http://API_URL/api/auth/magic-link', {
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
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 border-b-2 border-[#002E34] mb-3 sm:mb-4"></div>
                        <h2 className="text-xl sm:text-2xl lg:text-[2.9rem] font-medium mb-2 sm:mb-3 lg:mb-4 text-center">Enviando link...</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg px-4">Aguarde enquanto enviamos o link de acesso para seu e-mail.</p>
                    </div>
                );
            
            case 'success':
                return (
                    <div className="flex flex-col items-center">
                        <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                            <svg className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-[2.9rem] font-medium mb-2 sm:mb-3 lg:mb-4 text-center">Link enviado!</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4 px-4">
                            Enviamos um link de acesso para <strong className="break-all">{email}</strong>
                        </p>
                        <p className="text-center text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-5 lg:mb-6 px-4">
                            Verifique sua caixa de entrada e clique no link para fazer login.
                        </p>
                        <button 
                            onClick={() => setLoginState('form')}
                            className="w-full sm:w-[220px] lg:w-[250px] bg-[#002E34] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-[#004443] transition cursor-pointer text-base sm:text-lg"
                        >
                            Tentar outro e-mail
                        </button>
                    </div>
                );
            
            case 'error':
                return (
                    <div className="flex flex-col items-center">
                        <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                            <svg className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-[2.9rem] font-medium mb-2 sm:mb-3 lg:mb-4 text-center">Erro ao enviar</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg mb-4 sm:mb-5 lg:mb-6 px-4">
                            Não foi possível enviar o link. Tente novamente.
                        </p>
                        <button 
                            onClick={() => setLoginState('form')}
                            className="w-full sm:w-[180px] lg:w-[200px] bg-[#002E34] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-[#004443] transition cursor-pointer text-base sm:text-lg"
                        >
                            Tentar novamente
                        </button>
                    </div>
                );
            
            default:
                return (
                    <>
                        <h2 className="text-xl sm:text-2xl lg:text-[2.9rem] font-medium mb-2 sm:mb-3 lg:mb-4 text-center px-2">Entrar na sua conta</h2>
                        <p className="font-medium text-center text-sm sm:text-base lg:text-lg px-4">Insira seu e-mail para receber o link de acesso.</p>
                        <div className="w-full max-w-md">
                            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                                <div className="mb-8 sm:mb-12 lg:mb-16 mt-8 sm:mt-12 lg:mt-16 w-full px-4 sm:px-0">
                                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-[#002E34]">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`mt-2 font-medium block w-full border ${!isValid ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2.5 sm:p-3 text-sm sm:text-base`}
                                        required
                                        placeholder="seu.email@exemplo.com"
                                    />
                                    {!isValid && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">Por favor, insira um email válido.</p>
                                    )}
                                </div>
                                <button type="submit" className="w-full sm:w-[180px] lg:w-[200px] bg-[#002E34] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-[#004443] transition cursor-pointer text-base sm:text-lg">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </>
                );
        }
    };

    return (           
        <div className="bg-white bg-opacity-20 flex flex-col lg:flex-row backdrop-blur-lg rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-lg p-4 sm:p-8 lg:p-23 gap-4 sm:gap-8 lg:gap-30 max-w-sm sm:max-w-2xl lg:max-w-7xl mx-auto relative">
            {/* Botão de voltar */}
            <div className="absolute top-3 sm:top-5 lg:top-7 right-3 sm:right-5 lg:right-8 cursor-pointer z-10">
                <CircleChevronLeft className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-[#002E34] hover:text-[#004443] transition hover:scale-105" onClick={() => window.location.href = '/'}/>
            </div>
            
            {/* Conteúdo do formulário */}
            <div className="flex flex-col items-center p-2 sm:p-3 w-full lg:w-1/2 order-2 lg:order-1">
                {renderContent()}
            </div>

            {/* Imagem */}
            <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-full flex items-center justify-center order-1 lg:order-2">
                <img 
                    src="/imgs/card2.png" 
                    className="rounded-xl sm:rounded-2xl lg:rounded-4xl w-full h-full sm:h-auto lg:h-132 object-cover lg:object-contain max-w-full" 
                    alt="Ilustração" 
                />
            </div>
        </div>
    );
}