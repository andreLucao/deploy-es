"use client";

import React from "react";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
   const {
      items,
      getTotalPrice,
      clearCart,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
   } = useCartStore();

   const router = useRouter();
   const handleGoBack = () => {
      router.push("/marketplace");
   };
   const handleProcessCheckout = async () => {};

   return (
      <div className="py-8 px-4">
         {" "}
         {/* Botão de Voltar */}
         <button
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
         >
            <ArrowLeft size={20} className="mr-2" />
            Voltar ao Marketplace
         </button>
         <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
            {" "}
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
               Sua Transação
            </h1>{" "}
            {items.length === 0 ? (
               <div className="text-center py-10 border-dashed border-2 rounded-lg">
                  <p className="text-lg text-gray-500">
                     Seu carrinho está vazio.
                  </p>{" "}
               </div>
            ) : (
               <>
                  {/* Lista de Itens com Controles */}
                  <ul className="space-y-4 mb-6 border-b pb-4">
                     {" "}
                     {items.map((item) => (
                        <li
                           key={item.creditId}
                           className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                        >
                           <div className="flex-1 min-w-0 mr-4">
                              <p className="font-semibold text-base truncate">
                                 {item.creditId.substring(0, 25)}...
                              </p>{" "}
                              <p className="text-xs text-gray-500">
                                 R$ {item.pricePerUnit.toFixed(2)} por unidade
                              </p>
                           </div>

                           <div className="flex items-center space-x-2 text-base">
                              {" "}
                              {/* Botões de quantidade */}
                              <button
                                 onClick={() => decreaseQuantity(item.creditId)}
                                 className="p-1 border rounded-full hover:bg-gray-200"
                              >
                                 {" "}
                                 <Minus size={14} />{" "}
                              </button>
                              <span className="font-bold w-4 text-center">
                                 {item.quantity}
                              </span>
                              <button
                                 onClick={() => increaseQuantity(item.creditId)}
                                 className="p-1 border rounded-full hover:bg-gray-200"
                              >
                                 {" "}
                                 <Plus size={14} />{" "}
                              </button>
                           </div>

                           <div className="ml-4 w-28 text-right">
                              <span className="font-bold text-lg text-indigo-700">
                                 {" "}
                                 R${" "}
                                 {(item.quantity * item.pricePerUnit).toFixed(
                                    2
                                 )}
                              </span>
                              <button
                                 onClick={() => removeItem(item.creditId)}
                                 className="ml-2 text-red-500 hover:text-red-700 transition"
                              >
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>

                  {/* Resumo Final */}
                  <div className="text-right mt-6">
                     <span className="text-xl font-extrabold text-green-700 border-t-2 pt-2">
                        {" "}
                        TOTAL: R$ {getTotalPrice().toFixed(2)}
                     </span>
                  </div>

                  {/* Botão de Finalizar */}
                  <button
                     onClick={handleProcessCheckout}
                     className="w-full mt-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition shadow-lg" // Reduzido de text-xl para text-lg
                  >
                     Confirmar e Pagar
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
