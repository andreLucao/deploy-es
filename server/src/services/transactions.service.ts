import prisma from "../config/database";
import { Order } from "../generated/prisma/client";

interface CartItemData {
   creditId: string;
   quantity: number;
   pricePerUnit: number;
}

interface CheckoutData {
   cartItems: CartItemData[];
   totalPrice: number;
   userId: string;
}

export class TransactionsService {
   async checkout(data: CheckoutData): Promise<Order> {
      const result = await prisma.$transaction(async (tx) => {
         const order = await tx.order.create({
            data: {
               companyId: data.userId,
               totalAmount: data.totalPrice,
               status: "PROCESSING",
            },
         });
         for (const item of data.cartItems) {
            const updatedProduct = await tx.adProduct.updateMany({
               where: {
                  id: item.creditId,
                  supply: {
                     gte: item.quantity,
                  },
               },
               data: {
                  supply: {
                     decrement: item.quantity,
                  },
               },
            });

            if (updatedProduct.count === 0) {
               throw new Error(
                  `Estoque insuficiente para o crédito: ${item.creditId}`
               );
            }

            await tx.orderItem.create({
               data: {
                  orderId: order.id,
                  adProductId: item.creditId,
                  quantity: item.quantity,
                  unitPrice: item.pricePerUnit,
                  totalPrice: item.pricePerUnit * item.quantity,
               },
            });
         }

         const completedOrder = await tx.order.update({
            where: { id: order.id },
            data: { status: "COMPLETED" },
         });

         return completedOrder;
      });

      return result;
   }
}
