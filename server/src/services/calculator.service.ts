import prisma from "../config/database";
import {
   Emission,
   Company,
   EmissionInventory,
} from "../../generated/prisma";

type JsonValue =
   | { [key: string]: any }
   | any[]
   | string
   | number
   | boolean
   | null;

interface EmissionFormInput {
   type: string;
   fields: any;
   quantity: number;
   description?: string;
   emissionType?: string;
   formData?: JsonValue;
}

interface InventoryInput {
   companyId: string;
   year: number;
   scopes: {
      [key: string]: { emissions: EmissionFormInput[] };
   };
}

export class CalculatorService {
   /**
    * Calcula e salva um novo inventário de emissões.
    * SEMPRE cria um NOVO inventário (não atualiza existente).
    * Cada escopo é salvo como UMA linha na tabela Emission com todas as emissões compiladas.
    */
   async calculateAndSaveInventory(data: any): Promise<any> {
      const { companyId, year, scopes } = data;

      // Verificar se a empresa existe
      const company = await prisma.company.findUnique({
         where: { id: companyId },
      });
      
      if (!company) {
         throw new Error(`Empresa com ID ${companyId} não encontrada. Por favor, faça login primeiro.`);
      }

      const currentYear = year;
      const timestamp = new Date().toLocaleDateString('pt-BR', { 
         day: '2-digit', 
         month: '2-digit', 
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit'
      });
      const inventoryName = `Inventário ${currentYear} - ${timestamp}`;

      console.log(`\n🏭 Criando novo inventário para empresa ${company.email}`);
      console.log(`📅 Ano: ${currentYear}`);
      console.log(`📝 Nome: ${inventoryName}\n`);

      // Verificar se já existe um inventário para este ano e empresa
      const existingInventory = await prisma.emissionInventory.findFirst({
         where: { companyId, year: currentYear }
      });

      if (existingInventory) {
         console.log(`⚠️ Já existe inventário para o ano ${currentYear}`);
         console.log(`🗑️ Deletando inventário antigo: ${existingInventory.id}\n`);
         
         // Deletar emissões primeiro (foreign key)
         await prisma.emission.deleteMany({
            where: { inventoryId: existingInventory.id }
         });
         
         // Depois deletar o inventário
         await prisma.emissionInventory.delete({
            where: { id: existingInventory.id }
         });
         
         console.log(`✅ Inventário e emissões antigas deletadas\n`);
      }

      // Garante a atomicidade da operação
      return await prisma.$transaction(async (tx) => {
         // Criar novo inventário
         const inventory = await tx.emissionInventory.create({
            data: {
               companyId,
               year: currentYear,
               name: inventoryName,
               status: "PUBLISHED",
            },
         });

         console.log(`✅ Inventário criado: ${inventory.id}\n`);
         
         return await this.processEmissions(tx, inventory, scopes, companyId, currentYear, inventoryName);
      });
   }

   private async processEmissions(tx: any, inventory: any, scopes: any, companyId: string, currentYear: number, inventoryName: string) {
      const scopeResults: any[] = [];
      let totalCo2eAllScopes = 0;

      // Processa cada escopo e cria UMA linha na tabela Emission por escopo
      for (const scopeKey in scopes) {
         const scopeNumber = parseInt(scopeKey);
         const emissions = scopes[scopeKey].emissions;

         if (!emissions || emissions.length === 0) {
            console.log(`📊 Escopo ${scopeNumber}: Sem emissões\n`);
            continue;
         }

         console.log(`📊 Processando Escopo ${scopeNumber}: ${emissions.length} emissões`);

         let totalCo2eScope = 0;
         const processedEmissions: any[] = [];

         // Processa cada emissão individual para calcular CO2e
         for (let i = 0; i < emissions.length; i++) {
            const emission = emissions[i];
            const emissionType = emission.emissionType || emission.type;
            const quantity = emission.quantity || 0;

            console.log(`  ${i + 1}. Tipo: ${emissionType} | Quantidade: ${quantity}`);

            // TODO: Implementar busca de fatores reais por tipo de emissão
            // Por enquanto, usa fator fixo para demonstração
            const factorValue = 2.5; // kg CO2e por unidade (valor exemplo)
            const calculatedCo2e = quantity * factorValue;
            
            totalCo2eScope += calculatedCo2e;

            console.log(`     ✅ CO2e: ${calculatedCo2e.toFixed(2)} kg (fator: ${factorValue})`);

            processedEmissions.push({
               type: emissionType,
               quantity: quantity,
               factorValue: factorValue,
               calculatedCo2e: calculatedCo2e,
               formData: emission.formData || emission.fields,
               description: emission.description,
            });
         }

         totalCo2eAllScopes += totalCo2eScope;

         // Salva UMA linha por escopo com TODAS as emissões compiladas
         const savedEmission = await tx.emission.create({
            data: {
               inventoryId: inventory.id,
               scope: scopeNumber,
               emissionsData: processedEmissions, // JSON com todas as emissões
               totalCo2e: totalCo2eScope,
               emissionsCount: emissions.length,
               description: `Escopo ${scopeNumber} - ${emissions.length} emissões`,
            },
         });

         scopeResults.push({
            scope: scopeNumber,
            totalCo2e: totalCo2eScope,
            emissionsCount: emissions.length,
            emissionId: savedEmission.id,
         });

         console.log(`  💰 Total Escopo ${scopeNumber}: ${totalCo2eScope.toFixed(2)} kg CO2e\n`);
      }

      console.log(`\n✅ Inventário salvo com sucesso!`);
      console.log(`   - ID: ${inventory.id}`);
      console.log(`   - Empresa (ID): ${companyId}`);
      console.log(`   - Ano: ${currentYear}`);
      console.log(`   - Escopos processados: ${scopeResults.length}`);
      console.log(`   - CO2e TOTAL: ${totalCo2eAllScopes.toFixed(2)} kg\n`);

      return {
         inventoryId: inventory.id,
         companyId: companyId,
         year: currentYear,
         name: inventoryName,
         totalEmissions: totalCo2eAllScopes,
         scopeBreakdown: scopeResults,
      };
   }

   /**
    * Calcula o total de todas as emissões de um ano
    */
   async calculateTotalEmissions(
      companyId: string,
      year: number
   ): Promise<number> {
      const inventories = await prisma.emissionInventory.findMany({
         where: { companyId, year },
         include: {
            emissions: {
               where: { deletedAt: null },
            },
         },
      });

      let total = 0;
      for (const inventory of inventories) {
         for (const emission of inventory.emissions) {
            total += emission.totalCo2e;
         }
      }

      return total;
   }

   /**
    * Busca emissões de um escopo específico
    */
   async getEmissionsByScope(
      companyId: string,
      year: number,
      scope: number
   ): Promise<Emission[]> {
      const inventories = await prisma.emissionInventory.findMany({
         where: { companyId, year },
      });

      const inventoryIds = inventories.map(inv => inv.id);

      const emissions = await prisma.emission.findMany({
         where: {
            inventoryId: { in: inventoryIds },
            scope: scope,
            deletedAt: null,
         },
         include: { inventory: true },
      });

      return emissions;
   }

   /**
    * Busca inventários de uma empresa
    */
   async getCompanyInventory(companyId: string, year?: number): Promise<any> {
      const whereClause: any = { companyId };
      if (year) {
         whereClause.year = year;
      }

      const inventories = await prisma.emissionInventory.findMany({
         where: whereClause,
         include: {
            emissions: {
               where: { deletedAt: null },
            },
         },
         orderBy: [{ createdAt: "desc" }],
      });

      return {
         company: await prisma.company.findUnique({ where: { id: companyId } }),
         inventories: inventories.map(inv => ({
            ...inv,
            totalCo2e: inv.emissions.reduce((sum, e) => sum + e.totalCo2e, 0),
         })),
      };
   }

   /**
    * Busca resumo de emissões por ano
    */
   async getEmissionsSummary(companyId: string): Promise<any> {
      const company = await prisma.company.findUnique({
         where: { id: companyId },
      });

      if (!company) {
         throw new Error("Empresa não encontrada");
      }

      const inventories = await prisma.emissionInventory.findMany({
         where: { companyId },
         include: {
            emissions: {
               where: { deletedAt: null },
            },
         },
         orderBy: { year: "desc" },
      });

      const summaryByYear = inventories.reduce((acc: any[], inv) => {
         const existingYear = acc.find(item => item.year === inv.year);
         
         const scope1Total = inv.emissions
            .filter(e => e.scope === 1)
            .reduce((sum, e) => sum + e.totalCo2e, 0);
         
         const scope2Total = inv.emissions
            .filter(e => e.scope === 2)
            .reduce((sum, e) => sum + e.totalCo2e, 0);
         
         const scope3Total = inv.emissions
            .filter(e => e.scope === 3)
            .reduce((sum, e) => sum + e.totalCo2e, 0);

         const inventoryTotal = scope1Total + scope2Total + scope3Total;

         if (existingYear) {
            existingYear.total += inventoryTotal;
            existingYear.scope1 += scope1Total;
            existingYear.scope2 += scope2Total;
            existingYear.scope3 += scope3Total;
            existingYear.count += 1;
         } else {
            acc.push({
               year: inv.year,
               inventoryId: inv.id,
               total: inventoryTotal,
               scope1: scope1Total,
               scope2: scope2Total,
               scope3: scope3Total,
               count: 1,
            });
         }

         return acc;
      }, []);

      return {
         company: { id: company.id, email: company.email },
         summaryByYear,
      };
   }

   /**
    * Soft delete de uma emissão
    */
   async deleteEmission(emissionId: string): Promise<void> {
      await prisma.emission.update({
         where: { id: emissionId },
         data: { deletedAt: new Date() },
      });
   }
}
