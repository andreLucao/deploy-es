'use client';

import { useState } from "react";
import Header from "@/components/marketplace/Header";
import Destaque from "@/components/marketplace/Destaque";
import Filtro from "@/components/marketplace/Filtro";
import Produtos from "@/components/marketplace/Produtos";
import Footer from "@/components/Footer";

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
};

const produtosMock: Produto[] = [];
for (let i = 1; i <= 16; i++) {
  produtosMock.push({
    id: i,
    titulo: `Produto ${i}`,
    descricao: `Descrição ${i}`,
    preco: i * 100,
  });
}

export default function Marketplace() {
  const [modoVisualizacao, setModoVisualizacao] = useState<'grid' | 'list'>('grid');
  const [produtosPorPagina, setProdutosPorPagina] = useState(8);

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
          setProdutosPorPagina={setProdutosPorPagina}
        />
        <div className="flex">
          <Produtos 
            produtos={produtosMock} 
            produtosPorPagina={produtosPorPagina} 
            modoVisualizacao={modoVisualizacao}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}