import prisma from "../config/database";
import { Company } from "../../generated/prisma";

export class CompaniesService {
   async findByEmail(email: string): Promise<Company | null> {
      return prisma.company.findUnique({
         where: { email },
      });
   }

   async createCompany(email: string): Promise<Company> {
      return prisma.company.create({
         data: { email },
      });
   }

   async getCompanyCreditsByEmail(email: string) {
       const company = await prisma.company.findUnique({
           where: { email },
           select: { 
               id: true,
               balance: true,
               payments: {
                   select: {
                       creditsBought: true
                   }
               },
               orders: {
                   where: {
                       status: 'COMPLETED'
                   },
                   select: {
                       items: {
                           select: {
                               quantity: true
                           }
                       }
                   }
               }
           },
       });
       
       if (!company) return null;
       
       // Calculate total credits bought from payments
       const creditsBought = company.payments.reduce(
           (total, payment) => total + payment.creditsBought, 
           0
       );
       
       // Calculate total credits spent from completed orders
       const creditsSpent = company.orders.reduce(
           (total, order) => {
               const orderQuantity = order.items.reduce(
                   (sum, item) => sum + item.quantity,
                   0
               );
               return total + orderQuantity;
           },
           0
       );
       
       // Calculate actual balance: credits bought - credits spent
       const actualBalance = creditsBought - creditsSpent;
       
       // Update the balance in database if it's different
       if (company.balance !== actualBalance) {
           await prisma.company.update({
               where: { id: company.id },
               data: { balance: actualBalance }
           });
       }
       
       return { balance: actualBalance };
   }
}
