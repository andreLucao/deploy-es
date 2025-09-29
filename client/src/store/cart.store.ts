import { create } from "zustand";

// q que o carrinho guarda MUDAR CONFORME MODELAGEM DO ANUNCIO
interface CartItem {
   creditId: string;
   sellerId: string;
   quantity: number;
   pricePerUnit: number;
}

// estado e ações
interface CartState {
   items: CartItem[];

   addItem: (item: CartItem) => void;
   removeItem: (creditId: string) => void;
   clearCart: () => void;
   getTotalPrice: () => number;
}

//  Lógica
export const useCartStore = create<CartState>((set, get) => ({
   items: [],

   addItem: (newItem) => {
      set((state) => {
         const exists = state.items.find(
            (item) => item.creditId === newItem.creditId
         );

         if (exists) {
            // Se o item existe, apenas atualiza a quantidade
            return {
               items: state.items.map((item) =>
                  item.creditId === newItem.creditId
                     ? { ...item, quantity: item.quantity + newItem.quantity }
                     : item
               ),
            };
         } else {
            // Se for novo, adiciona ao carrinho
            return { items: [...state.items, newItem] };
         }
      });
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
}));
