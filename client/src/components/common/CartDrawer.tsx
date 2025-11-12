"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart.store";
import { X, Minus, Plus, Trash2, ShoppingCart, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
   // Estado local para gerenciar se o painel está aberto ou fechado
   const [isOpen, setIsOpen] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);
   const [credits, setCredits] = useState<number | null>(null);
   const [loadingCredits, setLoadingCredits] = useState(true);

   // Efeito para garantir que o componente está montado no lado do cliente
   useEffect(() => {
      setIsLoaded(true);
   }, []); // O array vazio garante que isso rode apenas uma vez, após a primeira renderização do cliente.

   // Buscar créditos da carteira do usuário
   useEffect(() => {
      async function fetchCredits() {
         try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/credits`, {
               credentials: "include",
            });

            if (!res.ok) {
               setLoadingCredits(false);
               return;
            }

            const data = await res.json();
            setCredits(data.credits);
         } catch (err) {
            console.error("Erro ao carregar créditos da carteira:", err);
         } finally {
            setLoadingCredits(false);
         }
      }

      if (isLoaded) {
         fetchCredits();
      }
   }, [isLoaded]);

   const {
      items,
      getTotalPrice,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
   } = useCartStore();

   const router = useRouter();

   if (!isLoaded) {
      return null;
   }

   const handleCheckout = () => {
      if (items.length > 0) {
         router.push("/checkout");
      } else {
         alert("Seu carrinho está vazio!");
      }
   };

   // Calcula o total de itens (soma das quantidades)
   const getTotalItems = () => {
      return items.reduce((total, item) => total + item.quantity, 0);
   };

   return (
      <>
         {/* Botão de Carrinho */}
         <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-white rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer group"
         >
            <ShoppingCart size={24} className="transition-transform group-hover:scale-110" />
            {items.length > 0 && (
               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg animate-pulse">
                  {getTotalItems()}
               </span>
            )}
         </button>

         {/* Overlay - Bloqueia o scroll e fecha ao clicar */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-all duration-300"
               onClick={() => setIsOpen(false)}
            />
         )}

         {/* Painel Lateral (Drawer) */}
         <div
            className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-gradient-to-br from-white to-gray-50 shadow-2xl z-[70] transform transition-all duration-300 ease-out ${
               isOpen ? "translate-x-0" : "translate-x-full"
            } flex flex-col`}
         >
            {/* Cabeçalho do Drawer */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#002E34] to-[#004443]">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <ShoppingCart size={24} className="text-white" />
                     </div>
                     <div>
                        <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
                        <p className="text-sm text-white/70">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
                     </div>
                  </div>
                  <button
                     onClick={() => setIsOpen(false)}
                     className="text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                     <X size={24} />
                  </button>
               </div>
            </div>

            {/* Lista de Itens */}
            <div className="flex-1 p-6 overflow-y-auto">
               {/* Carteira Digital - Sempre visível */}
               {!loadingCredits && credits !== null && (
                  <div className="bg-gradient-to-r from-[#002E34] to-[#004443] p-4 rounded-xl mb-6 shadow-lg">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                              <Wallet size={20} className="text-white" />
                           </div>
                           <div>
                              <p className="text-xs text-white/70">Saldo da Carteira</p>
                              <p className="text-lg font-bold text-white">{credits} CC</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-xs text-white/70">Disponível</p>
                           <p className="text-sm font-semibold text-[#00e07f]">
                              R$ {(credits * 1).toFixed(2)}
                           </p>
                        </div>
                     </div>
                  </div>
               )}

               {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                     <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ShoppingCart size={48} className="text-gray-400" />
                     </div>
                     <p className="text-gray-500 text-lg font-medium">Seu carrinho está vazio</p>
                     <p className="text-gray-400 text-sm mt-2">Adicione produtos para começar</p>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {items.map((item, index) => (
                        <div
                           key={item.creditId}
                           className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                        >
                           <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                 <p className="font-semibold text-gray-800 text-base mb-1">
                                    {item.productName}
                                 </p>
                                 <p className="text-xs text-gray-500 font-mono">
                                    ID: {item.creditId.substring(0, 20)}...
                                 </p>
                              </div>
                              <button
                                 onClick={() => removeItem(item.creditId)}
                                 className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 cursor-pointer ml-2"
                                 title="Remover item"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 {/* Controles de Quantidade */}
                                 <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                    <button
                                       onClick={() => decreaseQuantity(item.creditId)}
                                       className="p-1.5 hover:bg-white rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50"
                                       disabled={item.quantity <= 1}
                                    >
                                       <Minus size={16} className="text-gray-600" />
                                    </button>
                                    <span className="font-bold w-8 text-center text-gray-800">
                                       {item.quantity}
                                    </span>
                                    <button
                                       onClick={() => increaseQuantity(item.creditId)}
                                       className="p-1.5 hover:bg-white rounded-md transition-all duration-200 cursor-pointer"
                                    >
                                       <Plus size={16} className="text-gray-600" />
                                    </button>
                                 </div>
                              </div>

                              <div className="text-right">
                                 <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                                 <p className="text-lg font-bold text-[#00e07f]">
                                    R$ {(item.pricePerUnit * item.quantity).toFixed(2)}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* Rodapé e Checkout */}
            <div className="p-6 border-t border-gray-200 bg-white space-y-4">
               {/* Resumo de valores */}
               {items.length > 0 && (
                  <div className="space-y-2 pb-4 border-b border-gray-200">
                     <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                        <span className="font-medium">R$ {getTotalPrice().toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm text-gray-600">
                        <span>Taxa de processamento</span>
                        <span className="font-medium text-green-600">Grátis</span>
                     </div>
                  </div>
               )}

               {/* Total */}
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-sm text-gray-500 mb-1">Total a Pagar</p>
                     <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00e07f] to-[#008f70]">
                        R$ {getTotalPrice().toFixed(2)}
                     </p>
                  </div>
               </div>

               {/* Botão de Checkout */}
               <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-[#00e07f] to-[#008f70] text-white font-bold text-lg rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer flex items-center justify-center gap-2"
               >
                  <ShoppingCart size={20} />
                  Finalizar Compra
               </button>

               {/* Continuar comprando */}
               <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-gray-600 font-medium text-sm hover:text-gray-800 transition-colors cursor-pointer"
               >
                  Continuar Comprando
               </button>
            </div>
         </div>
      </>
   );
}
