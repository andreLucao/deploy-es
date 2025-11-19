import prisma from '../config/database'; 
import { Company, Order, Emission} from "../../generated/prisma";

export class ReportsService {

  /**
   * Buscar todos os dados agregados para o Dashboard
   * Filtra Emissões (dívida) e Compras (gasto) por CompanyId.
   */
  async getDashboardSummary(companyId: string): Promise<any> {
    
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      throw new Error("Empresa não encontrada.");
    }
    
    const emissionRecords = await prisma.emission.findMany({
      where: { 
        company_id: companyId, 
        deletedAt: null 
      },
      select: { 
        totalCo2e: true, 
        scope1_total: true, // Usa o campo scope1_total do schema
        scope2_total: true, 
        scope3_total: true, 
        description: true,
        year: true
      },
      orderBy: { year: 'desc' }
    });

    const orderHistory = await prisma.order.findMany({
      where: { companyId: companyId, status: 'COMPLETED' },
      include: {
        items: { select: { quantity: true, unitPrice: true } }
      },
      orderBy: { createdAt: 'desc' }
    });


   
    const totalEmittedCo2e = emissionRecords.reduce((sum, e) => sum + e.totalCo2e, 0);
    const summaryByScope = emissionRecords.reduce((acc, record) => ({
      scope1: acc.scope1 + record.scope1_total,
      scope2: acc.scope2 + record.scope2_total,
      scope3: acc.scope3 + record.scope3_total,
    }), { scope1: 0, scope2: 0, scope3: 0 });

    const totalSpentCents = orderHistory.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalCreditsPurchased = orderHistory.reduce((sum, order) => 
        sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);


    return {
        companyId: company.id,
        
        emissionsData: {
            totalEmittedCo2e: totalEmittedCo2e,
            breakdownByScope: summaryByScope,
            emissionRecords: emissionRecords, 
        },
        
        transactionData: {
            totalCreditsPurchased: totalCreditsPurchased,
            totalSpentBrutto: totalSpentCents / 100, // Converte centavos para reais
            lastOrders: orderHistory.slice(0, 5), 
        },
    };
  }
}