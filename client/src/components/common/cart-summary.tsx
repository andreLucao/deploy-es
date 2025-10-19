"use client";
// A diretiva 'use client' é necessária porque ele usa hooks (useState, useEffect, e o useCartStore)

import React from "react";
import { useCartStore } from "@/store/cart.store";

export default function CartSummary() {
   // Conectando ao store
   const totalItems = useCartStore((state) => state.items.length);
   const totalPrice = useCartStore((state) => state.getTotalPrice());
   const clearCart = useCartStore((state) => state.clearCart);

   return (
      <div
         style={{
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
         }}
      >
         <div>
            <h3 style={{ margin: "0", fontSize: "1.2em" }}>🛒 Seu Carrinho</h3>
            <p style={{ margin: "0", fontSize: "0.9em" }}>
               Itens: **{totalItems}**
            </p>
         </div>

         <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0", fontWeight: "bold", color: "green" }}>
               Total: R$ {totalPrice.toFixed(2)}
            </p>
            {totalItems > 0 && (
               <button
                  onClick={clearCart}
                  style={{
                     marginTop: "5px",
                     backgroundColor: "red",
                     color: "white",
                     border: "none",
                     borderRadius: "4px",
                     padding: "5px 10px",
                     cursor: "pointer",
                  }}
               >
                  Limpar
               </button>
            )}
         </div>
      </div>
   );
}
