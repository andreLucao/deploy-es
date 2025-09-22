type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
};

type ProdutosProps = {
  produtos: Produto[];
};


export default function Produtos({ produtos }: ProdutosProps) {
  return (
    <div className="grid-container grid grid-cols-5 gap-[40px] mx-auto p-5">
      {produtos.map((produto) => (
        <div key={produto.id} className="flex flex-col h-[240px] w-[240px] bg-gray-300 rounded-lg items-center hover:scale-102 transition-all cursor-pointer">
          <h3 className="font-bold">{produto.titulo}</h3>
          <p className="text-sm">{produto.descricao}</p>
          <span className="mt-auto font-semibold text-green-700">R$ {produto.preco}</span>
        </div>
      ))}
    </div>
  );
}