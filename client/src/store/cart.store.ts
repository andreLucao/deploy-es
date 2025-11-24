import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { upsertItemInCart, updateItemQuantity } from "@/lib/cart-helpers";

// o que o carrinho guarda -> MUDAR CONFORME MODELAGEM DO ANUNCIO
export interface CartItem {
   creditId: string;
   sellerId: string;
   quantity: number;
   pricePerUnit: number;
   productName: string;
}

export interface CartState {
   items: CartItem[];

   addItem: (item: CartItem) => void;
   increaseQuantity: (creditId: string) => void;
   decreaseQuantity: (creditId: string) => void;
   removeItem: (creditId: string) => void;
   clearCart: () => void;
   getTotalPrice: () => number;
}

export const useCartStore = create(
   persist<CartState>(
      (set, get) => ({
         items: [],

         addItem: (newItem) => {
            set((state) => ({
               items: upsertItemInCart(state.items, newItem),
            }));
         },

         // REFACTORADO: Usa a função auxiliar para simplificar
         increaseQuantity: (creditId: string) => {
            set((state) => ({
               items: updateItemQuantity(state.items, creditId, 1),
            }));
         },

         // REFACTORADO: Usa a função auxiliar para simplificar
         decreaseQuantity: (creditId: string) => {
            set((state) => ({
               items: updateItemQuantity(state.items, creditId, -1),
            }));
         },

         removeItem: (creditId) => {
            set((state) => ({
               items: state.items.filter((item) => item.creditId !== creditId),
            }));
         },

         clearCart: () => set({ items: [] }),

         getTotalPrice: () =>
            get().items.reduce(
               (total, item) => total + item.quantity * item.pricePerUnit,
               0
            ),
      }),
      {
         name: "carbon-market-cart", // Chave única no Local Storage
         storage: createJSONStorage(() => localStorage), // Tipo de armazenamento
      }
   )
);
