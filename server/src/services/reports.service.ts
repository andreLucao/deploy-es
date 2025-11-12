import prisma from "../config/database";
import { Order, EmissionInventory, OrderItem } from "../generated/prisma";

export class ReportsService {
   /**
    * Agrega todos os dados de Emissão (dívida) e Transação (compra) para o Dashboard.
    * @param companyId
    */
   async getDashboardSummary(companyId: string): Promise<any> {
      const company = await prisma.company.findUnique({
         where: { id: companyId },
      });
      if (!company) {
         throw new Error("Empresa não encontrada.");
      }

      // Usamos o ano atual como atributo principal
      const currentYear = new Date().getFullYear();

      //Dados de Emissão (Dívida de Carbono)

      const inventoryData = await prisma.emissionInventory.findUnique({
         where: { companyId_year: { companyId: companyId, year: currentYear } },
         include: {
            emissions: {
               where: { deletedAt: null }, // Apenas emissões ativas
               select: {
                  calculatedCo2e: true,
                  scope: true,
                  emissionType: true,
               },
            },
         },
      });

      //Dados de Transações (Compras/Vendas)

      const orderHistory = await prisma.order.findMany({
         where: { companyId: companyId, status: "COMPLETED" },
         include: {
            items: { select: { quantity: true, totalPrice: true } },
         },
         orderBy: { createdAt: "desc" },
      });

      const emissions = inventoryData?.emissions || [];
      const totalEmitted = emissions.reduce(
         (sum, e) => sum + e.calculatedCo2e,
         0
      );

      const summaryByScope = {
         scope1: emissions
            .filter((e) => e.scope === 1)
            .reduce((sum, e) => sum + e.calculatedCo2e, 0),
         scope2: emissions
            .filter((e) => e.scope === 2)
            .reduce((sum, e) => sum + e.calculatedCo2e, 0),
         scope3: emissions
            .filter((e) => e.scope === 3)
            .reduce((sum, e) => sum + e.calculatedCo2e, 0),
      };

      const totalSpent = orderHistory.reduce(
         (sum, order) => sum + order.totalAmount,
         0
      );
      const totalCreditsPurchased = orderHistory.reduce(
         (sum, order) =>
            sum +
            order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
         0
      );

      return {
         companyId: company.id,
         currentYear: currentYear,

         // Gráficos de Emissão
         emissionsData: {
            totalEmittedCo2e: totalEmitted,
            breakdownByScope: summaryByScope,
            topSources: emissions.map((e) => e.emissionType),
         },

         // Histórico Financeiro (Gráficos de Transação)
         transactionData: {
            totalCreditsPurchased: totalCreditsPurchased,
            totalSpentBrutto: totalSpent / 100,
            lastOrders: orderHistory.slice(0, 5),
         },

         // Dados brutos (o frontend pode usar isso para gráficos de tendência)
         rawData: {
            allEmissions: emissions,
            allOrders: orderHistory,
         },
      };
   }
}
