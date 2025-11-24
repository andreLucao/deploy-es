import { CartItem } from "@/store/cart.store";

export const upsertItemInCart = (
   items: CartItem[],
   newItem: CartItem
): CartItem[] => {
   const existingItem = items.find(
      (item) => item.creditId === newItem.creditId
   );

   if (existingItem) {
      return items.map((item) =>
         item.creditId === newItem.creditId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
      );
   }
   return [...items, newItem];
};

export const updateItemQuantity = (
   items: CartItem[],
   creditId: string,
   delta: number
): CartItem[] => {
   return items
      .map((item) =>
         item.creditId === creditId
            ? { ...item, quantity: item.quantity + delta }
            : item
      )
      .filter((item) => item.quantity > 0);
};
