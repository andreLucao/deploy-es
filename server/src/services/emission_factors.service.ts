import prisma from "../config/database";
import { EmissionFactor } from "../generated/prisma";

export class EmissionFactorsService {
   async createEmissionFactor(
      emissionProductId: string,
      factorValue: number,
      region?: string,
      year?: number
   ): Promise<EmissionFactor> {
      return prisma.emissionFactor.create({
         data: {
            emissionProductId,
            factorValue,
            region,
            year,
         },
      });
   }
}
