import prisma from "../config/database";
import { EmissionProduct } from "../../generated/prisma";

export class EmissionProductsService {
   async createEmissionProduct(
      name: string,
      unit: string,
      scope?: string
   ): Promise<EmissionProduct> {
      return prisma.emissionProduct.create({
         data: { name, unit, scope },
      });
   }

   async getAllEmissionProducts(): Promise<EmissionProduct[]> {
      return prisma.emissionProduct.findMany();
   }
}
