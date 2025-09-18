'use client';

import { CircleChevronLeft } from "lucide-react";
import { useState } from "react";

export default function RegisterCard() {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValid(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const valid = validateEmail(email);
        setIsValid(valid);
    };

    return (           
        <div className="bg-white bg-opacity-20 flex backdrop-blur-lg rounded-4xl shadow-lg p-23 gap-30 max-w-7xl mx-auto relative">
            <div className="absolute top-7 right-8 cursor-pointer">
                <CircleChevronLeft className="w-8 h-8 text-[#002E34] hover:text-[#004443] transition hover:scale-105" onClick={() => window.location.href = '/'}/>
            </div>
            <div className="flex flex-col items-center p-3 w-full">
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
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <img src="/imgs/card2.png" className="rounded-4xl h-132 max-w-full" alt="Ilustração" />
            </div>
        </div>
    );
}