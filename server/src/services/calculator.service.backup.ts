import prisma from "../config/database";
import {
   Emission,
   EmissionFactor,
   Company,
   EmissionInventory,
} from "../../generated/prisma";

// Estava com problema em importar o prisma, então o JsonValue teve que ser criado assim
type JsonValue =
   | { [key: string]: any }
   | any[]
   | string
   | number
   | boolean
   | null;

interface EmissionFormInput {
   type: string;
   fields: any; // O objeto JSON completo do formulário
   quantity: number;
   emissionProductId: string;
   description: string;
   emissionType: string;
   scope: number;
   formData: JsonValue;
}

interface InventoryInput {
   companyId: string;
   year: number;
   month?: number; // Opcional
   scopes: {
      [key: string]: { emissions: EmissionFormInput[] };
      "1": { emissions: EmissionFormInput[] };
      "2": { emissions: EmissionFormInput[] };
      "3": { emissions: EmissionFormInput[] };
   };
}

export class CalculatorService {
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

      //garante a atomicidade da operação
      return await prisma.$transaction(async (tx) => {
         //Cria ou atualiza o inventário anual
         const inventory = await tx.emissionInventory.upsert({
            where: { companyId_year: { companyId, year: currentYear } },
            update: { status: "PUBLISHED", updatedAt: new Date() },
            create: {
               companyId,
               year: currentYear,
               name: `Inventário ${currentYear}`,
               status: "PUBLISHED",
            },
         });

         let totalCo2e = 0;
         const emissionsToUpsert: any[] = [];

         // processa emissões por escopo
         for (const scopeKey in scopes) {
            const scopeNumber = parseInt(scopeKey);
            const emissions = scopes[scopeKey].emissions;

            console.log(`📊 Processando Escopo ${scopeNumber}:`, emissions.length, 'emissões');

            for (const emission of emissions) {
               let productId = emission.emissionProductId;
               const quantity = emission.quantity || 0;
               const emissionType = emission.emissionType || emission.type;

               // Se não tem productId válido, tentar buscar/criar pelo tipo de emissão
               if (!productId || productId === 'default-product') {
                  console.log(`  🔍 Produto não especificado, buscando/criando para tipo: ${emissionType}`);
                  
                  // Buscar produto existente pelo nome (tipo de emissão)
                  let product = await tx.emissionProduct.findFirst({
                     where: { name: emissionType }
                  });

                  // Se não existir, criar um novo produto
                  if (!product) {
                     console.log(`  ➕ Criando novo produto: ${emissionType}`);
                     product = await tx.emissionProduct.create({
                        data: {
                           name: emissionType,
                           unit: 'kg', // Unidade padrão
                           scope: `${scopeNumber}`,
                        }
                     });
                  }

                  productId = product.id;
                  console.log(`  ✅ Produto encontrado/criado: ${product.name} (${productId})`);
               }

               console.log(`  🔍 Buscando fator para produto:`, productId, `| Quantidade:`, quantity);

               const factor = await tx.emissionFactor.findFirst({
                  where: { emissionProductId: productId },
               });

               if (!factor) {
                  console.log(`  ⚠️ Fator não encontrado para produto: ${productId}`);
                  console.log(`  💡 Criando fator padrão temporário...`);
                  
                  // Criar um fator padrão temporário (você deve ajustar isso com valores reais)
                  await tx.emissionFactor.create({
                     data: {
                        emissionProductId: productId,
                        factorValue: 1.0, // Valor padrão - AJUSTAR COM VALORES REAIS
                        year: new Date().getFullYear(),
                        region: 'BR',
                     }
                  });
                  
                  const calculatedCo2e = quantity * 1.0; // Usando fator padrão
                  totalCo2e += calculatedCo2e;
                  console.log(`  ⚠️ Usando fator padrão 1.0 - Emissão calculada: ${calculatedCo2e} kg CO2e`);
                  
                  emissionsToUpsert.push({
                     uniqueConstraint: {
                        inventoryId_emissionProductId: {
                           inventoryId: inventory.id,
                           emissionProductId: productId,
                        },
                     },
                     data: {
                        inventoryId: inventory.id,
                        emissionProductId: productId,
                        scope: scopeNumber,
                        emissionType: emissionType,
                        formData: emission.formData as JsonValue,
                        quantity: quantity,
                        calculatedCo2e: calculatedCo2e,
                        description:
                           emission.description ||
                           `Escopo ${scopeNumber} - ${emissionType}`,
                     },
                  });
                  continue;
               }

               if (factor.factorValue === 0) {
                  console.log(`  ⚠️ Fator com valor zero para produto: ${productId}`);
                  continue;
               }

               const calculatedCo2e = quantity * factor.factorValue;
               totalCo2e += calculatedCo2e;

               console.log(`  ✅ Emissão calculada: ${calculatedCo2e} kg CO2e`);

               // monta o objeto de emissão para upsert
               emissionsToUpsert.push({
                  uniqueConstraint: {
                     inventoryId_emissionProductId: {
                        inventoryId: inventory.id,
                        emissionProductId: productId,
                     },
                  },
                  data: {
                     inventoryId: inventory.id,
                     emissionProductId: productId,
                     scope: scopeNumber,
                     emissionType: emissionType,
                     formData: emission.formData as JsonValue,
                     quantity: quantity,
                     calculatedCo2e: calculatedCo2e,
                     description:
                        emission.description ||
                        `Escopo ${scopeNumber} - ${emissionType}`,
                  },
               });
            }
         }

         console.log(`\n📝 Total de emissões para salvar: ${emissionsToUpsert.length}`);
         console.log(`💰 CO2e total calculado: ${totalCo2e} kg`);


         console.log(`\n📝 Total de emissões para salvar: ${emissionsToUpsert.length}`);
         console.log(`💰 CO2e total calculado: ${totalCo2e} kg`);

         // upsert (salvar/atualizar) todas as emissões
         for (const item of emissionsToUpsert) {
            console.log(`  💾 Salvando emissão:`, {
               inventoryId: item.data.inventoryId,
               productId: item.data.emissionProductId,
               scope: item.data.scope,
               co2e: item.data.calculatedCo2e
            });
            
            await tx.emission.upsert({
               where: item.uniqueConstraint,
               update: item.data,
               create: { ...item.data },
            });
         }

         console.log(`\n✅ Inventário salvo com sucesso!`);
         console.log(`   - ID: ${inventory.id}`);
         console.log(`   - Empresa: ${companyId}`);
         console.log(`   - Ano: ${currentYear}`);
         console.log(`   - Total de emissões: ${emissionsToUpsert.length}`);
         console.log(`   - CO2e total: ${totalCo2e} kg\n`);


         return {
            inventoryId: inventory.id,
            companyId: companyId,
            year: currentYear,
            totalEmissions: totalCo2e,
            emissionsCount: emissionsToUpsert.length,
         };
      });
   }

   //Calcula o total de todas as emissões em um ano
   async calculateTotalEmissions(
      companyId: string,
      year: number
   ): Promise<number> {
      // Busca o inventário do ano e faz a soma nas emissões dele
      const inventory = await prisma.emissionInventory.findUnique({
         where: { companyId_year: { companyId, year } },
         include: {
            emissions: {
               where: { deletedAt: null },
               select: { calculatedCo2e: true },
            },
         },
      });

      if (!inventory) return 0;

      return inventory.emissions.reduce(
         (sum, emission) => sum + emission.calculatedCo2e,
         0
      );
   }

   async getEmissionsByScope(
      companyId: string,
      year: number,
      scope: number
   ): Promise<Emission[]> {
      const emissions = await prisma.emission.findMany({
         where: {
            inventory: { companyId: companyId, year: year },
            scope: scope,
            deletedAt: null,
         },
         include: { emissionProduct: true, inventory: true },
      });
      return emissions;
   }

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
               include: { emissionProduct: true },
            },
         },
         orderBy: [{ year: "desc" }, { createdAt: "desc" }],
      });

      // Formatação simples para compatibilidade com o retorno anterior
      return {
         company: await prisma.company.findUnique({ where: { id: companyId } }),
         inventories: inventories,
      };
   }

   async getEmissionsByType(
      companyId: string,
      emissionType: string,
      year?: number
   ): Promise<Emission[]> {
      const whereClause: any = {
         inventory: { companyId: companyId },
         emissionType: emissionType,
         deletedAt: null,
      };

      if (year) {
         whereClause.inventory.year = year;
      }

      const emissions = await prisma.emission.findMany({
         where: whereClause,
         include: { emissionProduct: true, inventory: true },
         orderBy: { createdAt: "desc" },
      });

      return emissions;
   }

   async deleteEmission(emissionId: string): Promise<void> {
      const emission = await prisma.emission.findUnique({
         where: { id: emissionId },
      });

      if (!emission) {
         throw new Error("Emissão não encontrada.");
      }

      await prisma.emission.update({
         where: { id: emissionId },
         data: { deletedAt: new Date() },
      });
   }

   async getEmissionsSummaryByYear(companyId: string): Promise<any> {
      // Busca todos os inventários da empresa
      const inventories = await prisma.emissionInventory.findMany({
         where: { companyId },
         include: {
            emissions: {
               where: { deletedAt: null },
               select: { calculatedCo2e: true, scope: true },
            },
         },
         orderBy: { year: "desc" },
      });

      const summaryByYear = inventories.map((inventory) => {
         const emissions = inventory.emissions;

         const total = emissions.reduce((sum, e) => sum + e.calculatedCo2e, 0);
         const scope1 = emissions
            .filter((e) => e.scope === 1)
            .reduce((sum, e) => sum + e.calculatedCo2e, 0);
         const scope2 = emissions
            .filter((e) => e.scope === 2)
            .reduce((sum, e) => sum + e.calculatedCo2e, 0);
         const scope3 = emissions
            .filter((e) => e.scope === 3)
            .reduce((sum, e) => sum + e.calculatedCo2e, 0);

         return {
            year: inventory.year,
            inventoryId: inventory.id,
            total: total,
            scope1: scope1,
            scope2: scope2,
            scope3: scope3,
            count: emissions.length,
         };
      });

      return {
         company: await prisma.company.findUnique({ where: { id: companyId } }),
         summaryByYear: summaryByYear,
      };
   }

   // OBS: Os métodos anteriores ficaram desatualizados e foram substituidos principalmente pelo calculateAndSaveInventory
}
