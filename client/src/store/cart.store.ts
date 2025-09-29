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
   increaseQuantity: (creditId: string) => void;
   decreaseQuantity: (creditId: string) => void;
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

   increaseQuantity: (creditId: string) => {
      set((state) => ({
         items: state.items.map((item) =>
            item.creditId === creditId
               ? { ...item, quantity: item.quantity + 1 }
               : item
         ),
      }));
   },

   //Diminui a quantidade de um item existente (e remove se chegar a zero)
   decreaseQuantity: (creditId: string) => {
      set((state) => ({
         items: state.items
            .map((item) =>
               item.creditId === creditId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
            )
            .filter((item) => item.quantity > 0),
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
}));
