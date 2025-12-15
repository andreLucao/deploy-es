import prisma from "../config/database";
import {
   Emission,
   Company,
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
    * Mapeia combustíveis do formData para nomes de produtos no banco
    */
   private getProductNameFromFormData(emissionType: string, formData: any): string {
      // Mapeamento de valores de select para nomes de produtos
      const fuelMapping: Record<string, string> = {
         // Combustíveis comuns
         'gasolina_automotiva': 'Gasolina',
         'gasolina': 'Gasolina',
         'oleo_diesel': 'Diesel',
         'diesel': 'Diesel',
         'etanol_hidratado': 'Etanol',
         'etanol_anidro': 'Etanol',
         'etanol': 'Etanol',
         'glp': 'GLP',
         'gas_natural_seco': 'Gás Natural',
         'gas_natural': 'Gás Natural',
         'biodiesel': 'Biodiesel',
         'oleo_combustivel': 'Óleo Combustível',
         'carvao_mineral': 'Carvão Mineral',
         'carvao_metalurgico_nacional': 'Carvão Mineral',
         'carvao_vapor_6000': 'Carvão Mineral',
         'lenha_comercial': 'Lenha',
         'lenha': 'Lenha',
      };

      // Para combustão, buscar o campo 'fuel' ou 'vehicle'
      const fuelKey = formData.fuel || formData.vehicle || '';
      return fuelMapping[fuelKey] || fuelKey;
   }

   /**
    * Mapeia tipos de emissão para nomes de produtos no banco
    */
   private mapEmissionTypeToProduct(emissionType: string, formData: any): string {
      const mapping: Record<string, string | ((data: any) => string)> = {
         // Escopo 1
         'emissoes_fugitivas': (data: any) => {
            const gasMap: Record<string, string> = {
               'ch4': 'CH4 Fugitivo',
               'n2o': 'N2O Fugitivo',
               'hfc134a': 'HFC-134a',
               'sf6': 'SF6'
            };
            return gasMap[data.gas] || 'CH4 Fugitivo';
         },
         'processos_industriais': (data: any) => {
            const gasMap: Record<string, string> = {
               'ch4': 'CH4 Industrial',
               'n2o': 'N2O Industrial',
               'co2': 'CO2 Industrial'
            };
            return gasMap[data.gas] || 'CO2 Industrial';
         },
         'atividades_agricultura': (data: any) => {
            const gasMap: Record<string, string> = {
               'ch4': 'CH4 Agricultura',
               'n2o': 'N2O Agricultura',
               'co2': 'CO2 Agricultura'
            };
            return gasMap[data.gas] || 'CH4 Agricultura';
         },
         'mudancas_uso_solo': 'Mudança Uso Solo',
         'residuos_solidos': (data: any) => {
            const treatmentMap: Record<string, string> = {
               'aterro': 'Resíduos Aterro',
               'compostagem': 'Resíduos Compostagem',
               'incineracao': 'Resíduos Incineração'
            };
            return treatmentMap[data.treatment] || 'Resíduos Aterro';
         },
         'efluentes': 'Efluentes',
         
         // Escopo 2
         'compra_energia_eletrica': 'Energia Elétrica Brasil',
         'perdas_energia': 'Perdas Energia',
         'compra_energia_termica': 'Energia Térmica Vapor',
         
         // Escopo 3
         'transporte_distribuicao': (data: any) => {
            if (data.transportType === 'aereo') return 'Viagens Aéreo';
            if (data.transportType === 'ferroviario') return 'Viagens Ferroviário';
            return 'Transporte Distribuição';
         },
         'residuos_solidos_gerados': (data: any) => {
            const treatmentMap: Record<string, string> = {
               'aterro': 'Resíduos Gerados Aterro',
               'reciclagem': 'Resíduos Gerados Reciclagem',
               'compostagem': 'Resíduos Gerados Compostagem'
            };
            return treatmentMap[data.treatment] || 'Resíduos Gerados Aterro';
         },
         'efluentes_gerados': 'Efluentes Gerados',
         'viagens_negocios': (data: any) => {
            if (data.transportType === 'aereo') return 'Viagens Aéreo';
            if (data.transportType === 'ferroviario') return 'Viagens Ferroviário';
            return 'Viagens Rodoviário';
         },
      };

      const mapper = mapping[emissionType];
      if (typeof mapper === 'function') {
         return mapper(formData);
      }
      return mapper || emissionType;
   }

   /**
    * Calcula e salva um novo inventário de emissões.
    * Cria UMA ÚNICA LINHA por cálculo com TODOS os escopos e emissões compilados.
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
      const inventoryDescription = `Inventário ${currentYear} - ${timestamp}`;

      console.log(`\n🏭 Criando novo inventário para empresa ${company.email}`);
      console.log(`📅 Ano: ${currentYear}`);
      console.log(`📝 Descrição: ${inventoryDescription}\n`);

      // Garante a atomicidade da operação
      return await prisma.$transaction(async (tx) => {
         return await this.processAndSaveAllScopes(tx, scopes, companyId, currentYear, inventoryDescription);
      });
   }

   private async processAndSaveAllScopes(tx: any, scopes: any, companyId: string, currentYear: number, inventoryDescription: string) {
      const scopeResults: any = {};
      let totalCo2eAllScopes = 0;
      let scope1Total = 0;
      let scope2Total = 0;
      let scope3Total = 0;
      let totalEmissionsCount = 0;

      // Processa TODOS os escopos e acumula os dados
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

         // Processa cada emissão individual do escopo
         for (let i = 0; i < emissions.length; i++) {
            const emission = emissions[i];
            const emissionType = emission.emissionType || emission.type;
            const quantity = emission.quantity || 0;
            const formData = emission.formData || {};

            console.log(`  ${i + 1}. Tipo: ${emissionType} | Quantidade: ${quantity}`);

            // Determinar o nome do produto para buscar no banco
            let productName = emissionType;
            
            // Para combustão, usar o combustível específico
            if (emissionType === 'combustao_estacionaria' || emissionType === 'combustao_movel') {
               productName = this.getProductNameFromFormData(emissionType, formData);
            } else {
               productName = this.mapEmissionTypeToProduct(emissionType, formData);
            }

            console.log(`     🔍 Buscando produto: "${productName}"`);

            // Buscar fator de emissão real do banco de dados
            const emissionProduct = await tx.emissionProduct.findFirst({
               where: { name: productName },
               include: {
                  emissionFactors: {
                     orderBy: { year: 'desc' },
                     take: 1,
                  },
               },
            });

            let factorValue = 2.5; // Valor padrão caso não encontre
            
            if (emissionProduct && emissionProduct.emissionFactors.length > 0) {
               factorValue = emissionProduct.emissionFactors[0].factorValue;
               console.log(`     ✓ Fator encontrado para '${productName}': ${factorValue} kg CO2e`);
            } else {
               console.log(`     ⚠ Fator não encontrado para '${productName}', usando padrão: ${factorValue}`);
            }

            const calculatedCo2e = quantity * factorValue;
            totalCo2eScope += calculatedCo2e;

            console.log(`     ✅ CO2e: ${calculatedCo2e.toFixed(2)} kg`);

            processedEmissions.push({
               type: emissionType,
               quantity: quantity,
               factorValue: factorValue,
               calculatedCo2e: calculatedCo2e,
               formData: emission.formData || emission.fields,
               description: emission.description,
            });

            totalEmissionsCount++;
         }

         totalCo2eAllScopes += totalCo2eScope;
         
         // Atualizar totais por escopo
         if (scopeNumber === 1) scope1Total = totalCo2eScope;
         else if (scopeNumber === 2) scope2Total = totalCo2eScope;
         else if (scopeNumber === 3) scope3Total = totalCo2eScope;

         // Adiciona o escopo processado ao resultado
         scopeResults[`scope${scopeNumber}`] = {
            emissions: processedEmissions,
            totalCo2e: totalCo2eScope,
            emissionsCount: emissions.length,
         };

         console.log(`  💰 Total Escopo ${scopeNumber}: ${totalCo2eScope.toFixed(2)} kg CO2e\n`);
      }

      // Salva UMA ÚNICA LINHA com TODOS os escopos
      const savedEmission = await tx.emission.create({
         data: {
            company_id: companyId,
            year: currentYear,
            calculator_data: {
               description: inventoryDescription,
               timestamp: new Date().toISOString(),
               scopes: scopeResults,
               summary: {
                  totalEmissions: totalCo2eAllScopes,
                  totalEmissionsCount: totalEmissionsCount,
                  scope1Total,
                  scope2Total,
                  scope3Total,
               }
            },
            totalCo2e: totalCo2eAllScopes,
            scope1_total: scope1Total,
            scope2_total: scope2Total,
            scope3_total: scope3Total,
            description: inventoryDescription,
         },
      });

      console.log(`\n✅ Inventário salvo com sucesso!`);
      console.log(`   - ID da Emissão: ${savedEmission.id}`);
      console.log(`   - Empresa (ID): ${companyId}`);
      console.log(`   - Ano: ${currentYear}`);
      console.log(`   - Total de emissões: ${totalEmissionsCount}`);
      console.log(`   - Escopos processados: ${Object.keys(scopeResults).length}`);
      console.log(`   - CO2e TOTAL: ${totalCo2eAllScopes.toFixed(2)} kg\n`);

      return {
         emissionId: savedEmission.id,
         companyId: companyId,
         year: currentYear,
         description: inventoryDescription,
         totalEmissions: totalCo2eAllScopes,
         scope1Total,
         scope2Total,
         scope3Total,
         totalEmissionsCount,
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
      const emissions = await prisma.emission.findMany({
         where: { 
            company_id: companyId, 
            year,
            deletedAt: null 
         },
      });

      let total = 0;
      for (const emission of emissions) {
         total += emission.totalCo2e;
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
      const emissions = await prisma.emission.findMany({
         where: {
            company_id: companyId,
            year,
            deletedAt: null,
         },
      });

      // Filtrar pelo escopo dentro dos dados do calculator_data
      return emissions.filter((emission: any) => {
         const data = emission.calculator_data as any;
         return data?.scope === scope;
      });
   }

   /**
    * Busca inventários de uma empresa (agora busca emissões agrupadas por ano)
    */
   async getCompanyInventory(companyId: string, year?: number): Promise<any> {
      const whereClause: any = { 
         company_id: companyId,
         deletedAt: null 
      };
      if (year) {
         whereClause.year = year;
      }

      const emissions = await prisma.emission.findMany({
         where: whereClause,
         orderBy: [{ createdAt: "desc" }],
      });

      // Agrupar emissões por ano
      const groupedByYear = emissions.reduce((acc: any, emission) => {
         const yearKey = emission.year;
         if (!acc[yearKey]) {
            acc[yearKey] = {
               year: yearKey,
               emissions: [],
               totalCo2e: 0,
            };
         }
         acc[yearKey].emissions.push(emission);
         acc[yearKey].totalCo2e += emission.totalCo2e;
         return acc;
      }, {});

      return {
         company: await prisma.company.findUnique({ where: { id: companyId } }),
         inventories: Object.values(groupedByYear),
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

      const emissions = await prisma.emission.findMany({
         where: { 
            company_id: companyId,
            deletedAt: null 
         },
         orderBy: { year: "desc" },
      });

      const summaryByYear = emissions.reduce((acc: any[], emission) => {
         const existingYear = acc.find(item => item.year === emission.year);
         
         const scope1Total = emission.scope1_total;
         const scope2Total = emission.scope2_total;
         const scope3Total = emission.scope3_total;
         const emissionTotal = emission.totalCo2e;

         if (existingYear) {
            existingYear.total += emissionTotal;
            existingYear.scope1 += scope1Total;
            existingYear.scope2 += scope2Total;
            existingYear.scope3 += scope3Total;
            existingYear.count += 1;
         } else {
            acc.push({
               year: emission.year,
               emissionId: emission.id,
               total: emissionTotal,
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
    * Busca emissões de um tipo específico
    */
   async getEmissionsByType(
      companyId: string,
      emissionType: string,
      year?: number
   ): Promise<Emission[]> {
      const emissions = await prisma.emission.findMany({
         where: {
            company_id: companyId,
            year: year,
            deletedAt: null,
         },
      });

      // Filtrar pelo tipo de emissão dentro dos dados do calculator_data
      return emissions.filter((emission: any) => {
         const data = emission.calculator_data as any;
         const scopes = data?.scopes || {};

         // Verificar se alguma emissão tem este tipo
         for (const scopeKey in scopes) {
            const emissions = scopes[scopeKey].emissions || [];
            if (emissions.some((e: any) => e.type === emissionType)) {
               return true;
            }
         }
         return false;
      });
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
