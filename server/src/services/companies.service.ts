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
       return prisma.company.findUnique({
    where: { email },
    select: { balance: true },
  });
}
}
