// src/services/adProduct.service.ts
import prisma from "../config/database";
import { AdProduct, Comment } from "../generated/prisma";

export class AdProductService {
  // Buscar todos os anúncios
  async findAll() {
    return await prisma.adProduct.findMany({
      include: {
        company: true,
        comments: true
      }
    });
  }

  // Buscar anúncio por ID
  async findById(id: string) {
    return await prisma.adProduct.findUnique({
      where: { id },
      include: {
        company: true,
        comments: true
      }
    });
  }

  // Criar anúncio
  async create(data: any) {
    return await prisma.adProduct.create({
      data
    });
  }

  // Atualizar anúncio
  async update(id: string, data: any) {
    return await prisma.adProduct.update({
      where: { id },
      data
    });
  }

  // Excluir anúncio
  async delete(id: string) {
    return await prisma.adProduct.delete({
      where: { id }
    });
  }
}