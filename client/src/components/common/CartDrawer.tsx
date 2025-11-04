"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart.store";
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
   // Estado local para gerenciar se o painel está aberto ou fechado
   const [isOpen, setIsOpen] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);

   // Efeito para garantir que o componente está montado no lado do cliente
   useEffect(() => {
      setIsLoaded(true);
   }, []); // O array vazio garante que isso rode apenas uma vez, após a primeira renderização do cliente.

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

   return (
      <>
         {/* Botão de Carrinho */}
         <button
            onClick={() => setIsOpen(true)}
            className="p-1 text-white rounded-full hover:opacity-80 transition cursor-pointer"
            style={{ position: "relative" }}
         >
            <ShoppingCart size={24} />
            {items.length > 0 && (
               <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {items.length}
               </span>
            )}
         </button>

         {/* Painel Lateral (Drawer) */}
         <div
            className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
               isOpen ? "translate-x-0" : "translate-x-full"
            } flex flex-col`}
         >
            {/* Cabeçalho do Drawer */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
               <h2 className="text-xl font-bold">Seu Carrinho</h2>
               <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
               >
                  <X size={24} />
               </button>
            </div>

            {/* Lista de Itens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
               {items.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">
                     O carrinho está vazio.
                  </p>
               ) : (
                  items.map((item) => (
                     <div
                        key={item.creditId}
                        className="border p-3 rounded-lg flex items-center justify-between"
                     >
                        <div>
                           <p className="font-semibold">
                              {item.creditId.substring(0, 15)}...
                           </p>
                           <p className="text-sm text-gray-600">
                              Preço: R${" "}
                              {(item.pricePerUnit * item.quantity).toFixed(2)}
                           </p>
                        </div>

                        {/* Controles de Quantidade */}
                        <div className="flex items-center space-x-2">
                           <button
                              onClick={() => decreaseQuantity(item.creditId)}
                              className="p-1 border rounded-full hover:bg-gray-200 cursor-pointer"
                           >
                              <Minus size={16} />
                           </button>
                           <span className="font-bold w-4 text-center">
                              {item.quantity}
                           </span>
                           <button
                              onClick={() => increaseQuantity(item.creditId)}
                              className="p-1 border rounded-full hover:bg-gray-200 cursor-pointer"
                           >
                              <Plus size={16} />
                           </button>
                           <button
                              onClick={() => removeItem(item.creditId)}
                              className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                           >
                              <Trash2 size={20} />
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>

            {/* Rodapé e Checkout */}
            <div className="p-4 border-t bg-gray-50">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total a Pagar:</span>
                  <span className="text-2xl font-extrabold text-green-600">
                     R$ {getTotalPrice().toFixed(2)}
                  </span>
               </div>
               <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 cursor-pointer"
               >
                  Finalizar Compra
               </button>
            </div>
         </div>
      </>
   );
}
