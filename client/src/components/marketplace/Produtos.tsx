import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./product-card";
import Link from "next/link"; //Necessário para os redirecionamentos

type Produto = {
   id: number;
   titulo: string;
   descricao: string;
   preco: number;
};

type ProdutosProps = {
   produtos: Produto[];
   produtosPorPagina?: number;
   modoVisualizacao: "grid" | "list";
};

export default function Produtos({
   produtos,
   produtosPorPagina = 10,
   modoVisualizacao,
}: ProdutosProps) {
   const [paginaAtual, setPaginaAtual] = useState(1);

   const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);
   const indiceInicial = (paginaAtual - 1) * produtosPorPagina;
   const indiceFinal = indiceInicial + produtosPorPagina;
   const produtosPagina = produtos.slice(indiceInicial, indiceFinal);

   const irParaPagina = (pagina: number) => {
      if (pagina >= 1 && pagina <= totalPaginas) {
         setPaginaAtual(pagina);
      }
   };

   return (
      <div className="flex flex-col justify-items-center items-center w-full">
         {/* Container com CSS Grid sempre, mas colunas dinâmicas */}
         <div
            className="w-[1550px] p-3 transition-all duration-700 ease-out"
            style={{
               display: "grid",
               gridTemplateColumns:
                  modoVisualizacao === "grid" ? "repeat(4, 1fr)" : "1fr",
               gap: modoVisualizacao === "grid" ? "40px" : "16px",
               justifyItems: modoVisualizacao === "grid" ? "center" : "stretch",
               maxWidth: modoVisualizacao === "list" ? "1520px" : "none",
               margin: "0 auto",
            }}
         >
            {produtosPagina.map((produto) => (
               <Link
                  key={produto.id}
                  href={`/marketplace/${produto.id}`}
                  className="bg-gray-300 rounded-lg cursor-pointer overflow-hidden"
                  style={{
                     display: "flex",
                     flexDirection:
                        modoVisualizacao === "grid" ? "column" : "row",
                     height: modoVisualizacao === "grid" ? "340px" : "120px",
                     width: modoVisualizacao === "grid" ? "340px" : "100%",
                     alignItems:
                        modoVisualizacao === "grid" ? "center" : "center",
                     justifyContent:
                        modoVisualizacao === "grid"
                           ? "center"
                           : "space-between",
                     padding: modoVisualizacao === "grid" ? "16px" : "16px",
                     transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                     transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = "scale(1.02)";
                     e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = "scale(1)";
                     e.currentTarget.style.boxShadow = "none";
                  }}
               >
                  <div
                     className="w-[1550px] p-3 transition-all duration-700 ease-out"
                     style={{
                        display: "grid",
                        gridTemplateColumns:
                           modoVisualizacao === "grid"
                              ? "repeat(4, 1fr)"
                              : "1fr",
                        gap: modoVisualizacao === "grid" ? "40px" : "16px",
                        justifyItems:
                           modoVisualizacao === "grid" ? "center" : "stretch",
                        maxWidth:
                           modoVisualizacao === "list" ? "1520px" : "none",
                        margin: "0 auto",
                     }}
                  >
                     {produtosPagina.map((produto) => (
                        <Link
                           key={produto.id}
                           href={`/marketplace/${produto.id}`}
                           className="bg-gray-300 rounded-lg cursor-pointer overflow-hidden"
                           style={{
                              display: "flex",
                              flexDirection:
                                 modoVisualizacao === "grid" ? "column" : "row",
                              height:
                                 modoVisualizacao === "grid"
                                    ? "340px"
                                    : "120px",
                              width:
                                 modoVisualizacao === "grid" ? "340px" : "100%",
                              alignItems:
                                 modoVisualizacao === "grid"
                                    ? "center"
                                    : "center",
                              justifyContent: "space-between",
                              padding: "16px",
                              transition:
                                 "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                              transform: "scale(1)",
                           }}
                        >
                           <ProductCard
                              id={produto.id}
                              titulo={produto.titulo}
                              descricao={produto.descricao}
                              preco={produto.preco}
                              modoVisualizacao={modoVisualizacao}
                           />
                        </Link>
                     ))}
                  </div>
                  <span
                     className="font-semibold text-green-700"
                     style={{
                        marginTop: modoVisualizacao === "grid" ? "auto" : "0",
                        transition: "all 0.7s ease-out",
                     }}
                  >
                     R$ {produto.preco}
                  </span>
               </Link>
            ))}
         </div>

         {/* Controles de paginação */}
         <div className="flex items-center gap-4 mt-8 mb-4">
            <button
               onClick={() => irParaPagina(paginaAtual - 1)}
               disabled={paginaAtual === 1}
               className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400"
            >
               <ChevronLeft size={20} />
               Anterior
            </button>

            <span className="text-sm">
               Página {paginaAtual} de {totalPaginas}
            </span>

            <button
               onClick={() => irParaPagina(paginaAtual + 1)}
               disabled={paginaAtual === totalPaginas}
               className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400"
            >
               Próxima
               <ChevronRight size={20} />
            </button>
         </div>

         {/* Números das páginas */}
         <div className="flex gap-2">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
               (pagina) => (
                  <button
                     key={pagina}
                     onClick={() => irParaPagina(pagina)}
                     className={`px-3 py-1 rounded transition-all duration-200 ${
                        pagina === paginaAtual
                           ? "bg-[#002E34] text-white"
                           : "bg-gray-200 hover:bg-gray-300"
                     }`}
                  >
                     {pagina}
                  </button>
               )
            )}
         </div>
      </div>
   );
}
