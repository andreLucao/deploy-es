"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Home, Package, DollarSign } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
    const [orderNumber, setOrderNumber] = useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchOrderNumber = async () => {
            try {
                // Get session ID from URL params
                const sessionId = searchParams.get("session_id");
                if (!sessionId) {
                    const fallbackOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
                    setOrderNumber(fallbackOrderNumber);
                    return;
                }

                // Fetch payment details from backend using session ID
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
                const response = await fetch(
                    `${apiUrl}/api/payment/payment-status/${sessionId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.orderNumber) {
                        setOrderNumber(data.orderNumber);
                        return;
                    }
                }

                // Fallback if fetch fails
                const fallbackOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
                setOrderNumber(fallbackOrderNumber);
            } catch (error) {
                console.error("Erro ao buscar número do pedido:", error);
                const fallbackOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
                setOrderNumber(fallbackOrderNumber);
            }
        };

        fetchOrderNumber();
    }, [searchParams]);

    return (
        <main className="min-h-screen bg-[#efefef]">
            {/* Header Simplificado */}
            {/* <div className="w-full h-16 sm:h-20 flex items-center px-4 sm:px-8 lg:px-24 py-3 sm:py-5 bg-[#efefef] bg-opacity-50 shadow-lg">
                <Link href="/">
                    <img src="/imgs/Logo.png" alt="Logo" className="h-10 sm:h-12 lg:h-15 cursor-pointer" />
                </Link>
            </div> */}

            {/* Conteúdo Principal */}
            <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-12 sm:py-16 lg:py-24">
                {/* Card de Sucesso */}
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 sm:p-12 space-y-8">
                    {/* Ícone de Sucesso */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#00e07f] rounded-full opacity-20 animate-pulse scale-110"></div>
                            <CheckCircle size={120} className="text-[#00e07f] relative z-10" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Mensagem Principal */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                            Compra Realizada com Sucesso!
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600">
                            Obrigado por sua compra na EcoChange. Você está contribuindo para um futuro mais verde.
                        </p>
                    </div>

                    {/* Informações do Pedido */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 sm:p-8 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Package size={24} className="text-[#00e07f]" />
                            Detalhes do Pedido
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Número do Pedido */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 font-medium">Número do Pedido</p>
                                <p className="text-xl font-bold text-gray-900 break-words">{orderNumber}</p>
                            </div>

                            {/* Data */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 font-medium">Data da Compra</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {new Date().toLocaleDateString('pt-BR')}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 font-medium">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#00e07f] rounded-full animate-pulse"></div>
                                    <p className="text-xl font-bold text-[#00e07f]">Confirmado</p>
                                </div>
                            </div>

                            {/* Método de Pagamento */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 font-medium">Método de Pagamento</p>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={20} className="text-gray-700" />
                                    <p className="text-xl font-bold text-gray-900">Cartão</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Próximos Passos */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg space-y-3">
                        <h3 className="text-lg font-semibold text-blue-900">O que vem a seguir?</h3>
                        <ul className="space-y-2 text-blue-900">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold mt-1">✓</span>
                                <span>Você poderá acompanhar seu pedido na sua conta</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold mt-1">✓</span>
                                <span>Seus créditos de carbono estarão disponíveis em breve</span>
                            </li>
                        </ul>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => router.push("/marketplace")}
                            className="flex-1 bg-[#00e07f] hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors shadow-lg"
                        >
                            Continuar Comprando
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            Ir para Home
                        </button>
                    </div>
                </div>

                {/* Selo de Confiança */}
                {/* <div className="mt-12 text-center space-y-4">
                    <p className="text-gray-700 font-medium">Sua compra é 100% segura</p>
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-lg">🔒</span> Pagamento Seguro
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-lg">✓</span> Garantido
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-lg">🌱</span> Impacto Sustentável
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Footer */}
            <footer className="bg-[#002e34] text-white py-4 sm:py-5 mt-12 sm:mt-16 lg:mt-20">
                <div className="container mx-auto text-center px-4">
                    <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} EcoChange. Todos os direitos reservados.</p>
                </div>
            </footer>
        </main>
    );
}