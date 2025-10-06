import { Router } from "express";
import { supabase } from "../lib/supabaseClient";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pagina = parseInt((req.query.pagina as string) || "1");
    const limite = Math.min(50, parseInt((req.query.limite as string) || "8"));
    const ordenacao = (req.query.ordenacao as string) || "relevancia";
    const filtro = req.query.filtro as string | null;

    const inicio = (pagina - 1) * limite;
    const fim = inicio + limite - 1;

    let query = supabase.from("ad_product").select("*", { count: "exact" });

    // aplica filtros
    if (filtro) {
      const filtros = JSON.parse(filtro);
      if (Array.isArray(filtros.tipoMercado) && filtros.tipoMercado.length) {
        query = query.in("credit_type", filtros.tipoMercado);
      }
      if (Array.isArray(filtros.tipoCertificado) && filtros.tipoCertificado.length) {
        query = query.in("certification_type", filtros.tipoCertificado);
      }
      if (typeof filtros.valorMin === "number" && typeof filtros.valorMax === "number") {
        query = query.gte("price", filtros.valorMin).lte("price", filtros.valorMax);
      }
    }

    // ordenação
    if (ordenacao === "precoAsc") {
      query = query.order("price", { ascending: true });
    } else if (ordenacao === "precoDesc") {
      query = query.order("price", { ascending: false });
    }

    // paginação
    query = query.range(inicio, fim);

    const { data, error, count } = await query;

    if (error) throw error;

    // traduz campos para o front
    const produtosTraduzidos = data?.map((p: any) => ({
      id: p.id,
      titulo: p.title,
      descricao: p.description,
      preco: p.price,
      tipoMercado: p.credit_type,
      tipoCertificado: p.certification_type,
    })) || [];

    res.json({
      produtos: produtosTraduzidos,
      total: count,
      paginaAtual: pagina,
      totalPaginas: Math.ceil((count || 0) / limite),
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
