import { Router } from "express";
import { listarProdutosService } from "../services/products.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pagina = parseInt((req.query.pagina as string) || "1");
    const limite = Math.min(50, parseInt((req.query.limite as string) || "8"));
    const ordenacao = (req.query.ordenacao as string) || "relevancia";
    const filtro = req.query.filtro as string | null;
    const busca = req.query.busca as string | null;

    const resposta = await listarProdutosService({
      pagina,
      limite,
      ordenacao,
      filtro,
      busca,
    });

    res.json(resposta);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;