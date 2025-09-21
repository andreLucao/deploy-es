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
            // Chamar a API de magic link aqui
            // const response = await fetch('/api/auth/magic-link', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email }),
            // });

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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002E34] mb-4"></div>
                        <h2 className="text-[2.9rem] font-medium mb-4">Enviando link...</h2>
                        <p className="font-medium text-center text-lg">Aguarde enquanto enviamos o link de acesso para seu e-mail.</p>
                    </div>
                );
            
            case 'success':
                return (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-[2.9rem] font-medium mb-4">Link enviado!</h2>
                        <p className="font-medium text-center text-lg mb-4">
                            Enviamos um link de acesso para <strong>{email}</strong>
                        </p>
                        <p className="text-center text-base text-gray-600 mb-6">
                            Verifique sua caixa de entrada e clique no link para fazer login.
                        </p>
                        <button 
                            onClick={() => setLoginState('form')}
                            className="w-[250px] bg-[#002E34] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#004443] transition cursor-pointer text-lg"
                        >
                            Tentar outro e-mail
                        </button>
                    </div>
                );
            
            case 'error':
                return (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-[2.9rem] font-medium mb-4">Erro ao enviar</h2>
                        <p className="font-medium text-center text-lg mb-6">
                            Não foi possível enviar o link. Tente novamente.
                        </p>
                        <button 
                            onClick={() => setLoginState('form')}
                            className="w-[200px] bg-[#002E34] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#004443] transition cursor-pointer text-lg"
                        >
                            Tentar novamente
                        </button>
                    </div>
                );
            
            default:
                return (
                    <>
                        <h2 className="text-[2.9rem] font-medium mb-4">Entrar na sua conta</h2>
                        <p className="font-medium text-center text-lg">Insira seu e-mail para receber o link de acesso.</p>
                        <div className="w-full max-w-md">
                            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                                <div className="mb-16 mt-16 w-full">
                                    <label htmlFor="email" className="block text-base font-medium text-[#002E34]">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`mt-2 font-medium block w-full border ${!isValid ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-3`}
                                        required
                                    />
                                    {!isValid && (
                                        <p className="text-red-500 text-sm mt-1">Por favor, insira um email válido.</p>
                                    )}
                                </div>
                                <button type="submit" className="w-[200px] bg-[#002E34] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#004443] transition cursor-pointer text-lg">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </>
                );
        }
    };

    return (           
        <div className="bg-white bg-opacity-20 flex backdrop-blur-lg rounded-4xl shadow-lg p-23 gap-30 max-w-7xl mx-auto relative">
            <div className="absolute top-7 right-8 cursor-pointer">
                <CircleChevronLeft className="w-8 h-8 text-[#002E34] hover:text-[#004443] transition hover:scale-105" onClick={() => window.location.href = '/'}/>
            </div>
            <div className="flex flex-col items-center p-3 w-full">
                {renderContent()}
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <img src="/imgs/card2.png" className="rounded-4xl h-132 max-w-full" alt="Ilustração" />
            </div>
        </div>
    );
}