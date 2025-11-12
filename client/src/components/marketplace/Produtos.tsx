import { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./product-card";

type Produto = {
   id: number;
   titulo: string;
   descricao: string;
   preco: number;
};

type ProdutosProps = {
   produtos: Produto[];
   modoVisualizacao: "grid" | "list";
   paginaAtual: number;
   totalPaginas: number;
   setPaginaAtual: Dispatch<SetStateAction<number>>;
};

export default function Produtos({
   produtos,
   modoVisualizacao,
   paginaAtual,
   totalPaginas,
   setPaginaAtual,
}: ProdutosProps) {
   const produtosPagina = produtos;

   const irParaPagina = (pagina: number) => {
      if (pagina >= 1 && pagina <= totalPaginas) {
         setPaginaAtual(pagina);
      }
   };

   return (
      <div className="flex flex-col justify-items-center items-center w-[3400px] px-4 sm:px-6 lg:px-8">
         {/* Container com Grid/List Responsivo */}
         <div
            className={`
               w-full max-w-[1800px] p-3 transition-all duration-700 ease-out
               mb-8 sm:mb-12
               ${modoVisualizacao === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8' 
                  : 'flex flex-col gap-4 sm:gap-6'}
            `}
         >
            {produtosPagina.map((produto) => (
               <div
                  key={produto.id}
                  className={`rounded-lg overflow-hidden transition-all duration-[450ms] 
                     hover:shadow-xl hover:scale-[1.02] bg-white
                     ${modoVisualizacao === 'grid' 
                        ? 'flex flex-col aspect-square' 
                        : 'flex flex-col sm:flex-row h-auto w-full'}`}
               >
                  <ProductCard
                     id={produto.id}
                     titulo={produto.titulo}
                     descricao={produto.descricao}
                     preco={produto.preco}
                     modoVisualizacao={modoVisualizacao}
                  />
               </div>
            ))}
         </div>

         {/* Paginação Responsiva - com mais espaçamento */}
         <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center py-6 sm:py-8 w-full max-w-4xl bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
            {/* Botões Anterior/Próxima */}
            <div className="flex gap-4 items-center">
               <button
                  onClick={() => irParaPagina(paginaAtual - 1)}
                  disabled={paginaAtual === 1}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400 text-sm sm:text-base"
               >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">Ant</span>
               </button>

               <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Página {paginaAtual} de {totalPaginas}
               </span>

               <button
                  onClick={() => irParaPagina(paginaAtual + 1)}
                  disabled={paginaAtual === totalPaginas}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400 text-sm sm:text-base"
               >
                  <span className="hidden sm:inline">Próxima</span>
                  <span className="sm:hidden">Prox</span>
                  <ChevronRight size={16} className="sm:w-5 sm:h-5" />
               </button>
            </div>

            {/* Números das páginas - Oculto em mobile, visível em tablet+ */}
            <div className="hidden md:flex gap-2 flex-wrap justify-center">
               {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                  (pagina) => (
                     <button
                        key={pagina}
                        onClick={() => irParaPagina(pagina)}
                        className={`px-3 py-1 rounded transition-all duration-200 text-sm ${
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
      </div>
   );
}
