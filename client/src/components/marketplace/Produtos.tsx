import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from "next/link";

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
};

type ProdutosProps = {
  produtos: Produto[];
  modoVisualizacao: 'grid' | 'list';
  paginaAtual: number;
  totalPaginas: number;
  setPaginaAtual: (pagina: number) => void;
};

export default function Produtos({ produtos, modoVisualizacao, paginaAtual, totalPaginas, setPaginaAtual }: ProdutosProps) {
  return (
    <div className="flex flex-col justify-items-center items-center w-full">
      {/* Grid de produtos */}
      <div 
        className="w-[1550px] p-3 transition-all duration-700 ease-out"
        style={{
          display: 'grid',
          gridTemplateColumns: modoVisualizacao === 'grid' ? 'repeat(4, 1fr)' : '1fr',
          gap: modoVisualizacao === 'grid' ? '40px' : '16px',
          justifyItems: modoVisualizacao === 'grid' ? 'center' : 'stretch',
          maxWidth: modoVisualizacao === 'list' ? '1520px' : 'none',
          margin: '0 auto'
        }}
      >
        {produtos.map((produto) => (
          <Link
            key={produto.id}
            href={`/marketplace/${produto.id}`}
            className="bg-gray-300 rounded-lg cursor-pointer overflow-hidden"
            style={{
              display: 'flex',
              flexDirection: modoVisualizacao === 'grid' ? 'column' : 'row',
              height: modoVisualizacao === 'grid' ? '340px' : '120px',
              width: modoVisualizacao === 'grid' ? '340px' : '100%',
              alignItems: modoVisualizacao === 'grid' ? 'center' : 'center',
              justifyContent: modoVisualizacao === 'grid' ? 'center' : 'space-between',
              padding: modoVisualizacao === 'grid' ? '16px' : '16px',
              transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)',
            }}
             onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className={modoVisualizacao === 'grid' ? "text-center" : "flex-1"}
            style={{
                transition: 'all 0.7s ease-out'
              }}
            >
              <h3 className="font-bold">{produto.titulo}</h3>
              <p className="text-sm">{produto.descricao}</p>
            </div>
            <span className="font-semibold text-green-700"
            style={{
                marginTop: modoVisualizacao === 'grid' ? 'auto' : '0',
                transition: 'all 0.7s ease-out'
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
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
          Anterior
        </button>

        <span className="text-sm">
          Página {paginaAtual} de {totalPaginas}
        </span>

        <button
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Próxima
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Números das páginas */}
      <div className="flex gap-2">
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            onClick={() => setPaginaAtual(pagina)}
            className={`px-3 py-1 rounded ${
              pagina === paginaAtual ? 'bg-[#002E34] text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {pagina}
          </button>
        ))}
      </div>
    </div>
  );
}
