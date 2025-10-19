"use client";

import { useState, useEffect } from "react";
import Header from "@/components/marketplace/Header";
import Destaque from "@/components/marketplace/Destaque";
import Filtro from "@/components/marketplace/Filtro";
import Produtos from "@/components/marketplace/Produtos";
import Footer from "@/components/Footer";
import CreateAdButton from "@/components/marketplace/CreateAdButton";



type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  tipoMercado?: string;
  tipoCertificado?: string;
};

export default function Marketplace() {
   const [modoVisualizacao, setModoVisualizacao] = useState<"grid" | "list">(
      "grid"
   );
   const [produtosPorPagina, setProdutosPorPagina] = useState(8);
  const [ordenacao, setOrdenacao] = useState<'relevancia' | 'precoAsc' | 'precoDesc'>('relevancia');
  const [filtro, setFiltro] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [busca, setBusca] = useState<string>("");

  useEffect(() => {
    async function fetchProdutos() {
      setLoading(true);

      const params = new URLSearchParams({
        pagina: paginaAtual.toString(),
        limite: produtosPorPagina.toString(),
        ordenacao,
      });

      if (filtro) params.append("filtro", filtro);
      if (busca) params.append("busca", busca);

      // chama API do server
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT_URL}/api/products?${params.toString()}`);
      const json = await res.json();
    
      if (res.ok) {
        setProdutos(json.produtos);
        setTotalPaginas(json.totalPaginas);
      } else {
        console.error(json.error);
      }

      setLoading(false);
    }

    fetchProdutos();
  }, [paginaAtual, produtosPorPagina, ordenacao, filtro, busca]);

  return (
    <div className="flex flex-col min-h-screen custom-gradient">
      <Header />
      <div className="flex flex-col">
        <div className="flex p-30 h-170">
          <Destaque />
        </div>

        <Filtro 
          modoVisualizacao={modoVisualizacao}   
          setModoVisualizacao={setModoVisualizacao}
          produtosPorPagina={produtosPorPagina}
          setProdutosPorPagina={(qtd) => {
            setProdutosPorPagina(qtd);
            setPaginaAtual(1); 
          }}
          ordenacao={ordenacao}
          setOrdenacao={setOrdenacao}
          setFiltro={(f) => {
            setFiltro(f);
            setPaginaAtual(1); 
          }}
           busca={busca}
           setBusca={(valor) => {
           setBusca(valor);
           setPaginaAtual(1);
  }}

        />

        <div className="flex">
          {loading ? (
            <p className="p-4">Carregando produtos...</p>
          ) : produtos.length === 0 ? (
            <p className="p-4">Nenhum produto encontrado.</p>
  ) : (
            <Produtos 
              produtos={produtos}
              modoVisualizacao={modoVisualizacao}
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              setPaginaAtual={setPaginaAtual}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
