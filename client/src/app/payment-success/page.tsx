"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Home, Package, DollarSign, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { downloadCertificate } from "@/utils/certificateGenerator";
import { useCartStore } from "@/store/cart.store";

interface PaymentData {
    orderNumber: string;
    amount: number;
    currency: string;
    creditsBought: number;
    createdAt: string;
    paymentMethod: string;
    productTitle: string;
    creditType: string;
    certificationType: string;
    productDetails: {
        co2Reduction: number | null;
        location: string | null;
        biome: string | null;
        standard: string | null;
        projectType: string | null;
    };
    companyEmail: string;
}

export default function SuccessPage() {
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [isLoadingCertificate, setIsLoadingCertificate] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const cartItems = useCartStore((state) => state.items);

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
                    console.log("Payment data fetched:", data);
                    if (data.orderNumber) {
                        setOrderNumber(data.orderNumber);
                        setPaymentData(data);
                        return;
                    }
                } else {
                    console.error("Payment API error:", response.status, response.statusText);
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

    const handleDownloadCertificate = async () => {
        setIsLoadingCertificate(true);
        try {
            // Priority 1: Use actual payment data if available (from API)
            if (paymentData) {
                console.log("Generating certificate with payment data:", paymentData);
                const certificateData = {
                    orderNumber: paymentData.orderNumber,
                    companyName: paymentData.companyEmail.split('@')[0],
                    creditsBought: paymentData.creditsBought,
                    productTitle: paymentData.productTitle,
                    creditType: paymentData.creditType,
                    certificationType: paymentData.certificationType,
                    amount: paymentData.amount,
                    purchaseDate: new Date(paymentData.createdAt).toLocaleDateString('pt-BR'),
                    productDetails: paymentData.productDetails,
                };

                downloadCertificate(certificateData);
            }
            // Priority 2: Use cart data (available during checkout)
            else if (cartItems.length > 0) {
                console.log("Generating certificate with cart data:", cartItems);
                const firstItem = cartItems[0];
                const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0);

                try {
                    // Fetch product details from API
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
                    // Remove CREDIT- prefix from creditId to get the actual product ID
                    const productId = firstItem.creditId.replace(/^CREDIT-/, '');
                    const productResponse = await fetch(
                        `${apiUrl}/api/adProducts/${productId}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    let product = null;
                    if (productResponse.ok) {
                        product = await productResponse.json();
                    }

                    const certificateData = {
                        orderNumber: orderNumber,
                        companyName: "EcoChange User", // Aqui tem que trocar pro user do negocio do luca
                        creditsBought: totalQuantity,
                        productTitle: firstItem.productName,
                        creditType: product?.credit_type || "Carbon Credits",
                        certificationType: product?.certification_type || "Standard",
                        amount: Math.round(totalAmount * 100), // Convert to cents
                        purchaseDate: new Date().toLocaleDateString('pt-BR'),
                        productDetails: {
                            co2Reduction: product?.co2_reduction || null,
                            location: product?.local || null,
                            biome: product?.biome || null,
                            standard: product?.standard || null,
                            projectType: product?.project_type || null,
                        },
                    };

                    downloadCertificate(certificateData);
                } catch (error) {
                    console.error("Erro ao buscar detalhes do produto:", error);
                    alert("Erro ao buscar detalhes do produto. Verifique o console para mais detalhes.");
                }
            }
            // Fallback: No data available
            else {
                console.error("No payment or cart data available");
                alert("Nenhum dado de compra disponível para gerar o certificado.");
                return;
            }
            console.log("Certificate downloaded successfully");
        } catch (error) {
            console.error("Erro ao gerar certificado:", error);
            alert("Erro ao gerar o certificado. Verifique o console para mais detalhes.");
        } finally {
            setIsLoadingCertificate(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#efefef]">

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
                            onClick={handleDownloadCertificate}
                            disabled={isLoadingCertificate}
                            className="flex-1 bg-[#00e07f] hover:bg-green-600 disabled:bg-gray-400 text-black font-bold py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            <Download size={20} />
                            {isLoadingCertificate ? "Gerando..." : "Baixar Certificado"}
                        </button>
                        <button
                            onClick={() => router.push("/marketplace")}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors shadow-lg"
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