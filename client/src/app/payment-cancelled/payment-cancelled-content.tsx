"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Home } from "lucide-react";

export default function PaymentCancelledContent() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const sessionId = searchParams.get("session_id");
   const [timeLeft, setTimeLeft] = useState(5);

   // Countdown timer for auto-redirect
   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft((prev) => {
            if (prev <= 1) {
               clearInterval(timer);
               router.push("/checkout");
               return 0;
            }
            return prev - 1;
         });
      }, 1000);

      return () => clearInterval(timer);
   }, [router]);

   const handleGoBack = () => {
      router.push("/checkout");
   };

   const handleGoHome = () => {
      router.push("/");
   };

   return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
         {/* Botão Voltar */}
         <button
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6 cursor-pointer max-w-4xl mx-auto"
         >
            <ArrowLeft size={20} className="mr-2" />
            Voltar ao Checkout
         </button>

         {/* Container Principal */}
         <div className="max-w-4xl mx-auto">
            {/* Card de Cancelamento */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
               {/* Header com Ícone */}
               <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 sm:px-8 py-12 flex flex-col items-center">
                  <div className="bg-red-100 rounded-full p-4 mb-6">
                     <AlertCircle size={48} className="text-red-600" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
                     Pagamento Cancelado
                  </h1>
                  <p className="text-gray-600 text-center mt-2 text-lg">
                     Sua transação foi interrompida
                  </p>
               </div>

               {/* Conteúdo Principal */}
               <div className="px-6 sm:px-8 py-8 sm:py-12">
                  {/* Informações */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8 border-l-4 border-red-500">
                     <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        O que aconteceu?
                     </h2>
                     <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                        <li className="flex items-start">
                           <span className="text-red-500 mr-3 font-bold">•</span>
                           <span>
                              Você cancelou a transação durante o processo de pagamento
                           </span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-red-500 mr-3 font-bold">•</span>
                           <span>
                              Nenhuma cobrança foi realizada em sua conta
                           </span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-red-500 mr-3 font-bold">•</span>
                           <span>
                              Seus itens continuam disponíveis no carrinho
                           </span>
                        </li>
                     </ul>
                  </div>

                  {/* Session ID (se disponível) */}
                  {sessionId && (
                     <div className="bg-gray-100 rounded-lg p-4 mb-8 text-center">
                        <p className="text-xs text-gray-600 mb-2">ID da Sessão</p>
                        <p className="font-mono text-sm text-gray-800 break-all">
                           {sessionId}
                        </p>
                     </div>
                  )}

                  {/* Próximos Passos */}
                  <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
                     <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Próximos Passos
                     </h2>
                     <ol className="space-y-3 text-gray-700 text-sm sm:text-base">
                        <li className="flex items-start">
                           <span className="text-blue-500 font-bold mr-3">1.</span>
                           <span>Revise o carrinho e ajuste as quantidades se necessário</span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-blue-500 font-bold mr-3">2.</span>
                           <span>
                              Verifique seus dados de pagamento e método disponível
                           </span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-blue-500 font-bold mr-3">3.</span>
                           <span>
                              Tente novamente quando estiver pronto
                           </span>
                        </li>
                     </ol>
                  </div>

                  {/* Timer de Auto-redirecionamento */}
                  <div className="bg-yellow-50 rounded-lg p-4 mb-8 border-l-4 border-yellow-500 text-center">
                     <p className="text-gray-700 text-sm">
                        Redirecionando automaticamente para o checkout em{" "}
                        <span className="font-bold text-yellow-600">{timeLeft}s</span>
                     </p>
                  </div>

                  {/* Botões de Ação */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* Botão Voltar ao Checkout */}
                     <button
                        onClick={handleGoBack}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg w-full cursor-pointer flex items-center justify-center"
                     >
                        Voltar ao Carrinho
                     </button>

                     {/* Botão Voltar ao Marketplace */}
                     <button
                        onClick={handleGoHome}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg w-full cursor-pointer flex items-center justify-center"
                     >
                        <Home size={18} className="mr-2" />
                        Voltar para Home
                     </button>
                  </div>
               </div>

               {/* Footer Info */}
               <div className="bg-gray-50 px-6 sm:px-8 py-6 border-t">
                  <p className="text-center text-gray-600 text-sm">
                     Dúvidas sobre sua transação?{" "}
                     <Link
                        href="/marketplace"
                        className="text-blue-600 hover:text-blue-800 font-semibold transition"
                     >
                        Volte ao marketplace
                     </Link>
                     {" "}ou entre em contato com nosso suporte.
                  </p>
               </div>
            </div>

            {/* Card de Informações Adicionais */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8">
               <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Dicas para Completar Seu Pagamento
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Dica 1 */}
                  <div className="border-l-4 border-green-500 pl-4">
                     <h4 className="font-semibold text-gray-800 mb-2">
                        Verifique sua Conexão
                     </h4>
                     <p className="text-gray-600 text-sm">
                        Certifique-se de ter uma conexão estável com a internet
                        ao realizar pagamentos.
                     </p>
                  </div>

                  {/* Dica 2 */}
                  <div className="border-l-4 border-green-500 pl-4">
                     <h4 className="font-semibold text-gray-800 mb-2">
                        Dados Bancários
                     </h4>
                     <p className="text-gray-600 text-sm">
                        Confirme que suas informações bancárias estão atualizadas
                        e que há saldo disponível.
                     </p>
                  </div>

                  {/* Dica 3 */}
                  <div className="border-l-4 border-green-500 pl-4">
                     <h4 className="font-semibold text-gray-800 mb-2">
                        Limites de Transação
                     </h4>
                     <p className="text-gray-600 text-sm">
                        Verifique se o valor não ultrapassa seus limites de
                        transação bancária.
                     </p>
                  </div>

                  {/* Dica 4 */}
                  <div className="border-l-4 border-green-500 pl-4">
                     <h4 className="font-semibold text-gray-800 mb-2">
                        Segurança
                     </h4>
                     <p className="text-gray-600 text-sm">
                        Nunca compartilhe seus dados bancários com terceiros.
                        Sempre transacione através de canais seguros.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
