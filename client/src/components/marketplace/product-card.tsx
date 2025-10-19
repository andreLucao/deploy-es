"use client";

import React from "react";
import { useCartStore } from "@/store/cart.store";
import { ShoppingCart } from "lucide-react"; // Ícone para o botão

interface ProductCardProps {
   id: number;
   titulo: string;
   descricao: string;
   preco: number;
   modoVisualizacao: "grid" | "list";
}

export default function ProductCard({
   id,
   titulo,
   descricao,
   preco,
   modoVisualizacao,
}: ProductCardProps) {
   const addItem = useCartStore((state) => state.addItem);

   const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation(); // Impede que o clique no botão ative o hover do container principal

      const itemToAdd = {
         // IDs mockados (necessário usar o id do produto real aqui)
         creditId: `CREDIT-${id}`,
         sellerId: `SELLER-MOCK-ID`,
         quantity: 1,
         pricePerUnit: preco,
      };

      addItem(itemToAdd);
      // Opcional: Adicionar um Toast ou alerta para feedback
   };

   return (
      <div
         className="bg-white rounded-lg cursor-pointer transition-all duration-400 hover:shadow-md"
         style={{
            display: "flex",
            flexDirection: modoVisualizacao === "grid" ? "column" : "row",
            height: modoVisualizacao === "grid" ? "340px" : "120px",
            width: modoVisualizacao === "grid" ? "340px" : "100%",
            alignItems: modoVisualizacao === "grid" ? "center" : "center",
            justifyContent:
               modoVisualizacao === "grid" ? "space-between" : "space-between",
            padding: "16px",
            transform: "scale(1)",
         }}
         onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
         }}
         onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
         }}
      >
         <div
            className={
               modoVisualizacao === "grid" ? "text-center" : "flex-1 mr-4"
            }
            style={{ transition: "all 0.7s ease-out" }}
         >
            <h3 className="font-bold">{titulo}</h3>
            <p className="text-sm">{descricao}</p>
         </div>

         <div
            className="flex flex-col items-center justify-center gap-2"
            style={{
               transition: "all 0.7s ease-out",
               minWidth: modoVisualizacao === "grid" ? "auto" : "120px",
            }}
         >
            <span className="font-semibold text-green-700 text-lg">
               R$ {preco.toFixed(2)}
            </span>

            <button
               onClick={handleAddToCart}
               className="flex items-center justify-center gap-1 bg-[#0056b3] text-white px-3 py-1 rounded-md hover:bg-[#003871] transition-colors w-full"
            >
               <ShoppingCart size={16} />
               {modoVisualizacao === "grid" ? "Comprar" : ""}
            </button>
         </div>
      </div>
   );
}
