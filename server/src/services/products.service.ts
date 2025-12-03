import prisma from "../config/database";
import { AdProduct} from "../../generated/prisma";



interface Filtros {
  tipoMercado?: string[];
  tipoCertificado?: string[];
  valorMin?: number;
  valorMax?: number;
}

export async function listarProdutosService(params: {
  pagina: number;
  limite: number;
  ordenacao: string;
  filtro: string | null;
  busca: string | null;
}) {
  const { pagina, limite, ordenacao, filtro, busca } = params;

  const skip = (pagina - 1) * limite;
  const take = limite;

  const where: any = {};

  // filtros
  if (filtro) {
    const filtros: Filtros = JSON.parse(filtro);

    if (Array.isArray(filtros.tipoMercado) && filtros.tipoMercado.length) {
      where.credit_type = { in: filtros.tipoMercado };
    }

    if (Array.isArray(filtros.tipoCertificado) && filtros.tipoCertificado.length) {
      where.certification_type = { in: filtros.tipoCertificado };
    }

    if (typeof filtros.valorMin === "number" && typeof filtros.valorMax === "number") {
      where.price = {
        gte: filtros.valorMin,
        lte: filtros.valorMax,
      };
    }
  }

  // busca por título
  if (busca && busca.trim() !== "") {
    where.title = { contains: busca.trim(), mode: "insensitive" };
  }

  // ordenação
  let orderBy: any = undefined;
  if (ordenacao === "precoAsc") orderBy = { price: "asc" };
  else if (ordenacao === "precoDesc") orderBy = { price: "desc" };
  else orderBy = { id: "asc" };

  const [produtos, total] = await Promise.all([
    prisma.adProduct.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.adProduct.count({ where }),
  ]);

  const produtosTraduzidos = produtos.map((p) => ({
    id: p.id,
    titulo: p.title,
    descricao: p.description,
    preco: p.price,
    tipoMercado: p.credit_type,
    tipoCertificado: p.certification_type,
  }));

  return {
    produtos: produtosTraduzidos,
    total,
    paginaAtual: pagina,
    totalPaginas: Math.ceil(total / limite),
  };
}