'use client';

import { useRef } from "react";
import Header from "@/components/marketplace/Header";
import Destaque from "@/components/marketplace/Destaque";
import Footer from "@/components/Footer";
import Produtos from "@/components/marketplace/Produtos";
import Filtro from "@/components/marketplace/Filtro";

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
};

const produtosMock: Produto[] = [];
for (let i = 1; i <= 25; i++) {
  produtosMock.push({
    id: i,
    titulo: `Produto ${i}`,
    descricao: `Descrição ${i}`,
    preco: i * 100,
  });
}

export default function Marketplace() {
  return (
    <div className="flex flex-col min-h-screen custom-gradient">
      <Header />
      <div className="flex flex-col">
        <div className="flex p-30 h-170 ">
          <Destaque />
        </div>
        <Filtro />
        <div className="flex ">
          <Produtos produtos={produtosMock} />
        </div>
      </div>
      <Footer />
    </div>
  );
}