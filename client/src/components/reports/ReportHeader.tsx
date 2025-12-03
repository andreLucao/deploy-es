export default function ReportHeader() {
  return (
    <div className="bg-gradient-to-b from-[#008F70] to-[#00a888] text-white rounded-xl p-6 shadow-lg">
      <div className="flex flex-col items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold">Gerador de Relatórios com IA</h1>
      </div>
      <p className="flex flex-col items-center text-white/90">
        Selecione as emissões e descreva o que você gostaria de analisar no relatório
      </p>
    </div>
  );
}
