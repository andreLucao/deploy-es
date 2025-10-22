import { Funnel } from 'lucide-react'
import { ChevronDownIcon, Search } from 'lucide-react';
import { Grid } from 'lucide-react';
import { List } from 'lucide-react';
import { useState, useRef, useEffect } from "react";


type FiltroProps = {
  modoVisualizacao: 'grid' | 'list';
  setModoVisualizacao: (modo: 'grid' | 'list') => void;
  produtosPorPagina: number;
  setProdutosPorPagina: (quantidade: number) => void;
  ordenacao: 'relevancia' | 'precoAsc' | 'precoDesc';
  setOrdenacao: (ordem: 'relevancia' | 'precoAsc' | 'precoDesc') => void;
  setFiltro: (filtro: string | null) => void;
   busca: string;
  setBusca: (valor: string) => void;
};

export default function Filtro({ modoVisualizacao, setModoVisualizacao, produtosPorPagina, setProdutosPorPagina, ordenacao, setOrdenacao, setFiltro, busca, setBusca }: FiltroProps) {
    const opcoesProdutos = [8, 12, 16, 20, 24];
    const [open, setOpen] = useState(false);
    const [tipoMercado, setTipoMercado] = useState<string[]>([]);
    const [tipoCertificado, setTipoCertificado] = useState<string[]>([]);

    const [valorMin, setValorMin] = useState(0);
    const [valorMax, setValorMax] = useState(1000);

  const filtroRef = useRef<HTMLDivElement>(null);
  const [valorBusca, setValorBusca] = useState(busca);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (filtroRef.current && !filtroRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }
  if (open) {
    document.addEventListener("mousedown", handleClickOutside);
  }
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);
    

    function toggleSelection(
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  }

    return (
        <div className="flex h-full justify-center items-center gap-230">
  <div className="flex items-center h-full gap-3 p-4">
    <p className="text-sm whitespace-nowrap">Ordenar por:</p>

    

    {/* Ordenação */}
    <div className="relative">
      <select
        value={ordenacao}
        onChange={(e) =>
          setOrdenacao(
            e.target.value as "relevancia" | "precoAsc" | "precoDesc"
          )
        }
        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer 
                   hover:border-[#008f70] focus:outline-none focus:ring-2 focus:ring-[#008f70] 
                   focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <option value="relevancia">Relevância</option>
        <option value="precoAsc">Menor preço</option>
        <option value="precoDesc">Maior preço</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDownIcon size={20} className="text-gray-500" />
      </div>
    </div>


     
  {/* busca */}
  <div className="relative">
  <input
    type="text"
    value={valorBusca}
    onChange={(e) => setValorBusca(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        setBusca(valorBusca.trim());
      }
    }}
    placeholder="Buscar produtos..."
    className="bg-white text-black placeholder-black border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-[#008f70] 
               focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md w-[180px]"
  />

 <div className="absolute right-8 top-1/2 -translate-y-1/2 h-4 border-r border-gray-300" />

  <button
    onClick={() => setBusca(valorBusca.trim())}
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#008f70] transition-colors"
  >
    <Search size={18} strokeWidth={1.8} />
  </button>
</div>

        {/* Filtros */}
        <div className="relative" ref={filtroRef}>
    <button onClick={() => setOpen(!open)}
  className={`cursor-pointer p-2 rounded-lg transition-all 
              ${open ? "bg-gray-200 text-[#008f70]" : "hover:bg-gray-100"}`}
>
  <Funnel size={20}/></button>
  {open && (
  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
    {/* Tipo de Mercado */}
    <div className="mb-4">
      <p className="font-medium text-sm mb-2">Tipo de Mercado</p>
      <div className="flex flex-col gap-2">
       {["Mercado voluntário", "Mercado não voluntário"].map(opcao => (
  <label key={opcao} className="flex items-center gap-2 text-sm cursor-pointer">
    <input 
      type="checkbox"
      value={opcao}
      checked={tipoMercado.includes(opcao)}
      onChange={() => toggleSelection(opcao, tipoMercado, setTipoMercado)}
      className="accent-[#008f70]"
    />
    {opcao}
  </label>
))}
      </div>
    </div>

    {/* Tipo de Certificado */}
    <div className="mb-4">
      <p className="font-medium text-sm mb-2">Tipo de Certificado</p>
      <div className="flex flex-col gap-2">
       {["CBE", "CRVE", "Outros"].map(opcao => (
  <label key={opcao} className="flex items-center gap-2 text-sm cursor-pointer">
    <input 
      type="checkbox"
      value={opcao}
      checked={tipoCertificado.includes(opcao)}
      onChange={() => toggleSelection(opcao, tipoCertificado, setTipoCertificado)}
      className="accent-[#008f70]"
    />
    {opcao}
  </label>
))}

      </div>
    </div>

    {/* Faixa de Valor */}
<div>
  <p className="font-medium text-sm mb-2">Faixa de Valor</p>
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-600">Mínimo:</label>
      <input
        type="number"
        min={0}
        value={valorMin}
        onChange={(e) => setValorMin(Number(e.target.value))}
        className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#008f70] focus:border-transparent"
      />
    </div>
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-600">Máximo:</label>
      <input
        type="number"
        min={0}
        value={valorMax}
        onChange={(e) => setValorMax(Number(e.target.value))}
        className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#008f70] focus:border-transparent"
      />
    </div>
  </div>
</div>



{/* Ações */}
<div className="flex justify-end gap-2 mt-4">
  <button
    onClick={() => {
      setTipoMercado([]);
      setTipoCertificado([]);
      setValorMin(0);
      setValorMax(1000);
      setFiltro(null);
    }}
    className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg 
               hover:bg-gray-300 transition-colors"
  >
    Redefinir
  </button>
  <button
    onClick={() => {
      // monta objeto com os filtros
      const filtrosSelecionados = {
        tipoMercado,
        tipoCertificado,
        valorMin,
        valorMax,
      };
      setFiltro(JSON.stringify(filtrosSelecionados)); 
      setOpen(false); // fecha o popup após aplicar
    }}
    className="px-3 py-1.5 bg-[#008f70] text-white text-sm rounded-lg 
               hover:bg-[#00745b] transition-colors"
  >
    Aplicar
  </button>
</div>

  </div>
)}
</div>

            </div>
            <div className="flex items-center gap-3 h-full p-4">
                <div className="flex items-center gap-2">
                    <p className="text-sm whitespace-nowrap">Nº Produtos / Página:</p>
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