import { Loader2 } from "lucide-react";
import Markdown from 'react-markdown';

interface ActionItem {
  priority: "high" | "medium" | "low";
  action: string;
  timeline: string;
  responsible: string;
  estimated_impact: string;
}

interface GeneratedReport {
  title: string;
  content: string;
  action_items: ActionItem[];
}

interface ReportDisplayProps {
  isGenerating: boolean;
  reportError: string;
  generatedReport: GeneratedReport | null;
  selectedCount: number;
  onBackForm: () => void;
}

export default function ReportDisplay({
  isGenerating,
  reportError,
  generatedReport,
  selectedCount,
  onBackForm
}: ReportDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 min-h-[600px] max-h-[90vh] overflow-y-auto">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center h-full py-20">
          <Loader2 className="w-16 h-16 text-[#008F70] animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Gerando seu relatório...</h3>
          <p className="text-gray-600">Nossa IA está analisando {selectedCount} inventários</p>
        </div>
      ) : reportError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao gerar relatório</h3>
          <p className="text-red-700 mb-4">{reportError}</p>
          <button 
            onClick={onBackForm} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      ) : generatedReport ? (
        <div className="space-y-8">
          {/* Título do Relatório */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{generatedReport.title}</h1>
          </div>

          {/* Conteúdo em Markdown */}
          <div className="prose prose-lg max-w-none text-gray-800">
            <Markdown
              components={{
                h2: ({...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900" {...props} />,
                h3: ({...props}) => <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800" {...props} />,
                p: ({...props}) => <p className="mb-3 text-gray-700" {...props} />,
                ul: ({...props}) => <ul className="list-disc list-inside mb-3 space-y-2 text-gray-700" {...props} />,
                li: ({...props}) => <li className="ml-2" {...props} />,
                strong: ({...props}) => <strong className="font-semibold text-gray-900" {...props} />,
              }}
            >
              {generatedReport.content}
            </Markdown>
          </div>

          {/* Action Items */}
          {generatedReport.action_items && generatedReport.action_items.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Plano de Ação</h2>
              <div className="space-y-4">
                {generatedReport.action_items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 p-4 rounded ${
                      item.priority === "high"
                        ? "border-red-500 bg-red-50"
                        : item.priority === "medium"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 flex-1">{item.action}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                          item.priority === "high"
                            ? "bg-red-200 text-red-800"
                            : item.priority === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {item.priority === "high" ? "Alta" : item.priority === "medium" ? "Média" : "Baixa"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                      <div>
                        <span className="text-gray-600 font-medium">Prazo:</span>
                        <p className="text-gray-800">{item.timeline}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Responsável:</span>
                        <p className="text-gray-800">{item.responsible}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Impacto Estimado:</span>
                        <p className="text-gray-800">{item.estimated_impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-300">
            <button className="px-6 py-3 bg-[#008F70] text-white rounded-lg font-semibold hover:bg-[#007a5e] transition-colors">
              Exportar PDF
            </button>
            <button 
              onClick={onBackForm} 
              className="px-4 py-2 bg-white text-[#008F70] border border-[#008F70] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Nova Análise
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
