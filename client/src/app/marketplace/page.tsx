"use client";

<<<<<<< HEAD
import { useRef } from "react";
import Header from "@/components/Header";
import Certificacoes from "@/components/landingpage/Certificacoes";
import Hero from "@/components/landingpage/Hero";
import KnowUs from "@/components/landingpage/KnowUs";
import Solucoes from "@/components/landingpage/Solucoes";
=======
import { useState, useEffect } from "react";
import Header from "@/components/marketplace/Header";
import Destaque from "@/components/marketplace/Destaque";
import Filtro from "@/components/marketplace/Filtro";
import Produtos from "@/components/marketplace/Produtos";
>>>>>>> origin/transaction-history--backend
import Footer from "@/components/Footer";
import CreateAdButton from "@/components/marketplace/CreateAdButton";

<<<<<<< HEAD
export default function LandingPage() {
   const knowUsRef = useRef<HTMLElement>(null);
   const certificacoesRef = useRef<HTMLElement>(null);
   const solucoesRef = useRef<HTMLElement>(null);

   const scrollToSection = (
      ref: React.RefObject<HTMLElement | null>,
      offset = 0
   ) => {
      if (ref.current) {
         const top =
            ref.current.getBoundingClientRect().top + window.scrollY - offset;
         window.scrollTo({ top, behavior: "smooth" });
      }
   };

   return (
      <main className="bg-[#efefef]">
         <Header
            onScrollToKnowUs={() => scrollToSection(knowUsRef, 60)}
            onScrollToCertificacoes={() =>
               scrollToSection(certificacoesRef, 60)
            }
            onScrollToSolucoes={() => scrollToSection(solucoesRef, 60)}
         />

         <section>
            <Hero />
         </section>
         <section ref={knowUsRef}>
            <KnowUs />
         </section>
         <section ref={certificacoesRef}>
            <Certificacoes />
         </section>
         <section ref={solucoesRef}>
            <Solucoes />
         </section>
         <section>
            <footer>
               <Footer />
            </footer>
         </section>
      </main>
   );
=======
type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  tipoMercado?: string;
  tipoCertificado?: string;
};


export default function Marketplace() {
  const [modoVisualizacao, setModoVisualizacao] = useState<"grid" | "list">("grid");
  const [produtosPorPagina, setProdutosPorPagina] = useState(8);
  const [ordenacao, setOrdenacao] = useState<'relevancia' | 'precoAsc' | 'precoDesc'>('relevancia');
  const [filtro, setFiltro] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [busca, setBusca] = useState<string>("");

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          pagina: paginaAtual.toString(),
          limite: produtosPorPagina.toString(),
          ordenacao,
        });

        if (filtro) params.append("filtro", filtro);
        if (busca) params.append("busca", busca);

        // Chama API do server
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Falha ao carregar produtos');
        }

        const json = await response.json();
        setProdutos(json.produtos);
        setTotalPaginas(json.totalPaginas);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Não foi possível carregar os produtos');
      } finally {
        setLoading(false);
      }
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
            <div className="flex justify-center items-center w-full min-h-[400px]">
              <p className="text-lg">Carregando produtos...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center w-full min-h-[400px]">
              <p className="text-lg text-red-500">{error}</p>
            </div>
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
        <CreateAdButton />
      </div>
      <Footer />
    </div>
  );
>>>>>>> origin/transaction-history--backend
}