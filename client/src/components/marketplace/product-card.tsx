"use client";

import React from "react";
import { useCartStore } from "@/store/cart.store";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

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
   const router = useRouter();

   const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation();

      const itemToAdd = {
         creditId: `CREDIT-${id}`,
         sellerId: `SELLER-MOCK-ID`,
         quantity: 1,
         pricePerUnit: preco,
         productName: titulo,
      };

      addItem(itemToAdd);
   };

   const handleCardClick = () => {
      router.push(`/marketplace/${id}`);
   };

   return (
      <div
         onClick={handleCardClick}
         className="bg-white rounded-lg cursor-pointer transition-all duration-400 hover:shadow-md"
         style={{
            display: "flex",
            flexDirection: modoVisualizacao === "grid" ? "column" : "row",
            height: modoVisualizacao === "grid" ? "100%" : "120px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
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
               modoVisualizacao === "grid" ? "text-center flex-1 flex flex-col justify-center" : "flex-1 mr-4"
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
               R$ {(preco/100).toFixed(2)}
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
