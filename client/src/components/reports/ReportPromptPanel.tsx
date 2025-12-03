import { FileText } from "lucide-react";

interface ReportPromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedCount: number;
  selectedTotals: {
    total: number;
    scope1: number;
    scope2: number;
    scope3: number;
  };
  onGenerateReport: () => void;
  isDisabled: boolean;
}

export default function ReportPromptPanel({
  prompt,
  setPrompt,
  selectedCount,
  selectedTotals,
  onGenerateReport,
  isDisabled
}: ReportPromptPanelProps) {
  const suggestions = [
    "Analise as tendências de emissão ao longo dos anos",
    "Compare emissões por escopo e sugira melhorias",
    "Identifique os principais pontos de redução de carbono",
    "Gere um sumário executivo para stakeholders"
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-[#008F70]" />
        <h2 className="text-xl font-semibold text-gray-800">Descrição do Relatório</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            O que você gostaria de analisar?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Gere um relatório comparativo das emissões por ano..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F70] focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            {prompt.length}/1000 caracteres
          </p>

          <div className="flex justify-end mt-4">
            <button
              onClick={onGenerateReport}
              disabled={isDisabled}
              className="px-8 py-3 bg-[#008F70] text-white rounded-xl font-semibold hover:bg-[#007a5e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Gerar Relatório com IA
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Sugestões rápidas:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(suggestion)}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800 mb-2">
              Emissões Selecionadas: {selectedCount}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold ml-1">{selectedTotals.total.toFixed(2)} tCO2e</span>
              </div>
              <div>
                <span className="text-gray-600">Escopo 1:</span>
                <span className="font-semibold ml-1">{selectedTotals.scope1.toFixed(2)} tCO2e</span>
              </div>
              <div>
                <span className="text-gray-600">Escopo 2:</span>
                <span className="font-semibold ml-1">{selectedTotals.scope2.toFixed(2)} tCO2e</span>
              </div>
              <div>
                <span className="text-gray-600">Escopo 3:</span>
                <span className="font-semibold ml-1">{selectedTotals.scope3.toFixed(2)} tCO2e</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
