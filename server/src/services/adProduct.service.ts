import prisma from "../config/database";

export class AdProductService {
   // Buscar todos os anúncios
   async findAll() {
      return await prisma.adProduct.findMany({
         include: {
            company: true,
            comments: true,
         },
      });
   }

   // Buscar anúncio por ID
   async findById(id: string) {
      return await prisma.adProduct.findUnique({
         where: { id },
         include: {
            company: true,
            comments: true,
         },
      });
   }

   // Buscar anúncios destaque
   async findFeatured(queryLimit: string | undefined) {
      let take = 4; // Valor padrão
      if (queryLimit && !isNaN(Number(queryLimit))) {
         take = Number(queryLimit);
      }
      if (take > 10) take = 10; // Teto limite de requisições

      const featuredAds = await prisma.adProduct.findMany({
         orderBy: {
            sold: 'desc', // Ordena pelos mais vendidos
         },
         take: take,
         where: {
            active: true, // Apenas anúncios ativos
            supply: { gte: 1 }, // Apenas anúncios com estoque
         },
         include: {
            company: true,
            comments: true
         }
      });

      return featuredAds;
   }

   // Criar anúncio
   async create(data: any) {
      return await prisma.adProduct.create({
         data,
      });
   }

   // Atualizar anúncio
   async update(id: string, data: any) {
      return await prisma.adProduct.update({
         where: { id },
         data,
      });
   }

   // Excluir anúncio
   async delete(id: string) {
      return await prisma.adProduct.delete({
         where: { id },
      });
   }
}
