"use client";

import React from "react";
import { useCartStore } from "@/store/cart.store";

// Dados fixos para simular um crédito de carbono real
const MOCK_CREDIT = {
   creditId: "credito-eletricidade-2025",
   sellerId: "company-alpha",
   quantity: 1000,
   pricePerUnit: 15.5, // Preço por tonelada de CO2e
};

export default function CreditCard() {
   // Pega a função de adicionar item da sua loja
   const addItem = useCartStore((state) => state.addItem);

   const handleAddToCart = () => {
      // Cria um item com uma quantidade fixa para teste (100 créditos)
      const itemToAdd = {
         ...MOCK_CREDIT,
         quantity: 100, // Adiciona 100 créditos por clique
      };

      addItem(itemToAdd);
      alert(`Adicionado ${itemToAdd.quantity} créditos ao carrinho!`);
   };

   return (
      <div
         style={{
            border: "1px solid #0056b3",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "300px",
            textAlign: "center",
         }}
      >
         <h3 style={{ color: "#0056b3" }}>Crédito de Carbono - Eletricidade</h3>
         <p>Quantidade Disponível: {MOCK_CREDIT.quantity} CO2e</p>
         <p style={{ fontWeight: "bold" }}>
            Preço/Unidade: R$ {MOCK_CREDIT.pricePerUnit.toFixed(2)}
         </p>

         <button
            onClick={handleAddToCart}
            style={{
               marginTop: "15px",
               backgroundColor: "#0056b3",
               color: "white",
               border: "none",
               padding: "10px 20px",
               borderRadius: "5px",
               cursor: "pointer",
            }}
         >
            Adicionar 100 Créditos
         </button>
      </div>
   );
}
