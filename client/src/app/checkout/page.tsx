// client/src/app/checkout/page.tsx
"use client";

import React from "react";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"; // Ícones para os botões

export default function CheckoutPage() {
   // 1. Conexão com o store e as ações interativas
   const {
      items,
      getTotalPrice,
      clearCart,
      removeItem, // Novo
      increaseQuantity, // Novo
      decreaseQuantity, // Novo
   } = useCartStore();

   const router = useRouter();

   // Função para lidar com a navegação de volta para o Marketplace
   const handleGoBack = () => {
      router.push("/marketplace");
   };

   // Função de Checkout (Mantida para o próximo passo)
   const handleProcessCheckout = async () => {
      if (items.length === 0) {
         alert("O carrinho está vazio. Adicione itens antes de finalizar.");
         router.push("/marketplace");
         return;
      }

      // LÓGICA DE ENVIO PARA O BACKEND (próximo passo)
      // ...
      alert("Pronto para enviar para o Backend!");
      // Aqui você fará a chamada POST para o Express
   };

   return (
      <div className="py-10 px-4">
         {/* Botão de Voltar */}
         <button
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6"
         >
            <ArrowLeft size={20} className="mr-2" />
            Voltar ao Marketplace
         </button>

         <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
               Sua Transação
            </h1>

            {items.length === 0 ? (
               <div className="text-center py-16 border-dashed border-2 rounded-lg">
                  <p className="text-xl text-gray-500">
                     Seu carrinho está vazio. Adicione alguns créditos!
                  </p>
               </div>
            ) : (
               <>
                  {/* Lista de Itens com Controles */}
                  <ul className="space-y-6 mb-8 border-b pb-4">
                     {items.map((item) => (
                        <li
                           key={item.creditId}
                           className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                        >
                           {/* Nome do Item e Preço Unitário */}
                           <div className="flex-1 min-w-0 mr-4">
                              <p className="font-semibold text-lg truncate">
                                 {item.creditId.substring(0, 25)}...
                              </p>
                              <p className="text-sm text-gray-500">
                                 R$ {item.pricePerUnit.toFixed(2)} por unidade
                              </p>
                           </div>

                           {/* Controles de Quantidade */}
                           <div className="flex items-center space-x-3 text-lg">
                              <button
                                 onClick={() => decreaseQuantity(item.creditId)}
                                 className="text-gray-600 hover:text-red-500 p-1 border rounded-full transition"
                              >
                                 <Minus size={18} />
                              </button>
                              <span className="font-bold w-6 text-center">
                                 {item.quantity}
                              </span>
                              <button
                                 onClick={() => increaseQuantity(item.creditId)}
                                 className="text-gray-600 hover:text-green-500 p-1 border rounded-full transition"
                              >
                                 <Plus size={18} />
                              </button>
                           </div>

                           {/* Preço Total e Botão de Remover */}
                           <div className="ml-8 w-32 text-right">
                              <span className="font-extrabold text-xl text-indigo-700">
                                 R${" "}
                                 {(item.quantity * item.pricePerUnit).toFixed(
                                    2
                                 )}
                              </span>
                              <button
                                 onClick={() => removeItem(item.creditId)}
                                 className="ml-4 text-red-500 hover:text-red-700 transition"
                              >
                                 <Trash2 size={20} />
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>

                  {/* Resumo Final */}
                  <div className="text-right mt-10">
                     <span className="text-3xl font-extrabold text-green-700 border-t-2 pt-2">
                        TOTAL: R$ {getTotalPrice().toFixed(2)}
                     </span>
                  </div>

                  {/* Botão de Finalizar */}
                  <button
                     onClick={handleProcessCheckout}
                     className="w-full mt-8 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 transition shadow-lg"
                  >
                     Confirmar e Pagar
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
