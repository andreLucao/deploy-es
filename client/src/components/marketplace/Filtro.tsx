import { Funnel } from 'lucide-react'
import { ChevronDownIcon } from 'lucide-react';
import { Grid } from 'lucide-react';
import { List } from 'lucide-react';

type FiltroProps = {
  modoVisualizacao: 'grid' | 'list';
  setModoVisualizacao: (modo: 'grid' | 'list') => void;
  produtosPorPagina: number;
  setProdutosPorPagina: (quantidade: number) => void;
};

export default function Filtro({ modoVisualizacao, setModoVisualizacao, produtosPorPagina, setProdutosPorPagina }: FiltroProps) {
    const opcoesProdutos = [8, 12, 16, 20, 24];

    return (
        <div className="flex h-full justify-center items-center gap-230">
            <div className="flex items-center h-full gap-3 p-4">
                <p className='text-sm'>Ordenar por:</p>
                <button className="flex items-center cursor-pointer">
                    <p className='text-sm'>Relevância</p>
                    <ChevronDownIcon size={25}/>
                </button>
                <button className="cursor-pointer"><Funnel size={20}/></button>
            </div>
            <div className="flex items-center gap-3 h-full p-4">
                <div className="flex items-center gap-2">
                    <p className="text-sm">Nº Produtos / Página:</p>
                    <div className="relative">
                        <select 
                            value={produtosPorPagina} 
                            onChange={(e) => setProdutosPorPagina(Number(e.target.value))}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-6 text-sm cursor-pointer hover:border-[#008f70] focus:outline-none focus:ring-2 focus:ring-[#008f70] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {opcoesProdutos.map(opcao => (
                                <option key={opcao} value={opcao}>{opcao}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDownIcon size={16} className="text-gray-500" />
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setModoVisualizacao('grid')}
                    className={`cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 ${
                        modoVisualizacao === 'grid' ? 'text-[#008f70] bg-green-50' : 'text-gray-600'
                    }`}
                >
                    <Grid size={20} />
                </button>
                <button 
                    onClick={() => setModoVisualizacao('list')}
                    className={`cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 ${
                        modoVisualizacao === 'list' ? 'text-[#008f70] bg-green-50' : 'text-gray-600'
                    }`}
                >
                    <List size={20} />
                </button>
            </div>
        </div>
    );
}