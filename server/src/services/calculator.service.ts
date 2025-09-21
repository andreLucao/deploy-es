import prisma from "../config/database";
import { Emission, EmissionFactor, Company } from "../generated/prisma";

interface EmissionData {
   companyId: string;
   emissionProductId: string;
   year: number;
   quantity: number;
}

export class CalculatorService {
   //Salva uma única emissão no banco de dados, calculando seu valor de CO2e.
   async saveEmission(data: EmissionData): Promise<Emission> {
      //Verificar se o produto de emissão existe
      const product = await prisma.emissionProduct.findUnique({
         where: { id: data.emissionProductId },
      });
      if (!product) {
         throw new Error("Produto de emissão não encontrado.");
      }

      // Buscar o fator de multiplicação
      const factor = await prisma.emissionFactor.findFirst({
         where: { emissionProductId: data.emissionProductId },
      });
      if (!factor) {
         throw new Error("Fator de emissão não encontrado para este produto.");
      }

      // Realizar o cálculo no backend para o item em específico
      const calculatedCo2e = data.quantity * factor.factorValue;

      // Salvar ou atualizar a emissão
      return await prisma.emission.upsert({
         where: {
            companyId_emissionProductId_year: {
               companyId: data.companyId,
               emissionProductId: data.emissionProductId,
               year: data.year,
            },
         },
         update: {
            quantity: data.quantity,
            calculatedCo2e: calculatedCo2e,
         },
         create: {
            companyId: data.companyId,
            emissionProductId: data.emissionProductId,
            year: data.year,
            quantity: data.quantity,
            calculatedCo2e: calculatedCo2e,
         },
      });
   }

   /**
    * Calcula o total de emissões para uma empresa em um dado ano.
    * A lógica é ativada quando o usuário clica em "Salvar Formulário".
    */
   async calculateTotalEmissions(
      companyId: string,
      year: number
   ): Promise<number> {
      //Validar se a empresa existe
      const company = await prisma.company.findUnique({
         where: { id: companyId },
      });
      if (!company) {
         throw new Error("Empresa não encontrada.");
      }

      //Buscar todas as emissões para a empresa e ano
      const allEmissionsForYear = await prisma.emission.findMany({
         where: {
            companyId,
            year,
         },
         select: {
            calculatedCo2e: true,
         },
      });

      // Somar os valores de CO2e
      const total = allEmissionsForYear.reduce(
         (sum, emission) => sum + emission.calculatedCo2e,
         0
      );

      return total;
   }
}
