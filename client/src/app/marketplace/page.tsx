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
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Marketplace() {
   const [modoVisualizacao, setModoVisualizacao] = useState<"grid" | "list">(
      "grid"
   );
   const [produtosPorPagina, setProdutosPorPagina] = useState(8);
   const [produtos, setProdutos] = useState<Produto[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      async function fetchAdProducts() {
         try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/adProducts`);

            if (!response.ok) {
               throw new Error('Falha ao carregar anúncios');
            }

            const data = await response.json();

            // Mapeia os dados da API para o formato esperado
            const produtosFormatados = data.map((ad: any) => ({
               id: ad.id,
               titulo: ad.title,
               descricao: ad.description,
               preco: ad.price
            }));

            setProdutos(produtosFormatados);
            setError(null);
         } catch (err) {
            console.error('Erro ao buscar anúncios:', err);
            setError('Não foi possível carregar os anúncios');
         } finally {
            setLoading(false);
         }
      }

      fetchAdProducts();
   }, []);

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
               {loading ? (
                  <div className="flex justify-center items-center w-full min-h-[400px]">
                     <p className="text-lg">Carregando anúncios...</p>
                  </div>
               ) : error ? (
                  <div className="flex justify-center items-center w-full min-h-[400px]">
                     <p className="text-lg text-red-500">{error}</p>
                  </div>
               ) : (
                  <Produtos
                     produtos={produtos}
                     produtosPorPagina={produtosPorPagina}
                     modoVisualizacao={modoVisualizacao}
                  />
               )}
            </div>
            <CreateAdButton />
         </div>
         <Footer />
      </div>
   );
}
