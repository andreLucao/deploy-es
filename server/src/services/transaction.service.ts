import prisma from "../config/database";
import { Order } from "../generated/prisma";

export class TransactionService {
   async getOrderHistory(companyId: string): Promise<Order[]> {
      const company = await prisma.company.findUnique({
         where: { id: companyId },
      });
      if (!company) {
         throw new Error("Empresa não encontrada.");
      }

      const orders = await prisma.order.findMany({
         where: {
            companyId: companyId,
            status: { in: ["COMPLETED"] },
         },
         include: {
            items: {
               select: {
                  quantity: true,
                  unitPrice: true,
                  totalPrice: true,
                  adProductId: true,
               },
            },
         },
         // ordena do mais novo para o mais antigo
         orderBy: {
            createdAt: "desc",
         },
      });

      return orders;
   }
}
