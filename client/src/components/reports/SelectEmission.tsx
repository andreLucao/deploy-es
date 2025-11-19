"use client"

import { useState, useEffect } from "react";
import { Search, FileText, Calendar, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { calculatorAPI } from '@/lib/calculatorApi';

interface Emission {
  id: string;
  year: number;
  description: string;
  totalCo2e: number;
  scope1_total: number;
  scope2_total: number;
  scope3_total: number;
  data: JSON;
  createdAt: string;
}

export default function SelectEmission() {
  const [prompt, setPrompt] = useState("");
  const { user } = useAuth();
  const [emissions, setEmissions] = useState<Emission[]>([]);
  // selectedEmissions salva os IDs das emissões. Usar ele para pegar os emission.calculator_data para o agente
  const [selectedEmissions, setSelectedEmissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState("");

  // roda assim que iniciar o componente
  useEffect(() => {
    if (user?.id) {
      loadInventories();
    }
  }, [user?.id]);

  const loadInventories = async () => {
    try {
      if (!user?.id) {
        console.error("Company ID não Encontrado");
        return;
      }

      const data = await calculatorAPI.getInventory(user.id);

      const allEmissions: Emission[] = [];

      data.inventories.forEach((inventory) => {
        inventory.emissions.forEach((emission) => {
          allEmissions.push({
            id: emission.id,
            year: emission.year,
            description: emission.description,
            totalCo2e: emission.totalCo2e,
            scope1_total: emission.scope1_total,
            scope2_total: emission.scope2_total,
            scope3_total: emission.scope3_total,
            data: emission.calculator_data,
            createdAt: emission.createdAt
          });
        });
      });

      setEmissions(allEmissions);

    } catch (error) {
      console.error("Erro ao carregar inventários: ", error);
    }
  }

  const toggleEmission = (emissionId: string) => {
    setSelectedEmissions(prev =>
      prev.includes(emissionId)
        ? prev.filter(id => id !== emissionId)
        : [...prev, emissionId]
    );
  };

  const selectAll = () => {
    setSelectedEmissions(emissions.map(e => e.id));
  };

  const clearSelection = () => {
    setSelectedEmissions([]);
  };

  const filteredEmissions = emissions.filter(emission =>
    emission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emission.year.toString().includes(searchTerm)
  );

  const selectedTotals = emissions
    .filter(e => selectedEmissions.includes(e.id))
    .reduce((acc, curr) => ({
      total: acc.total + curr.totalCo2e,
      scope1: acc.scope1 + curr.scope1_total,
      scope2: acc.scope2 + curr.scope2_total,
      scope3: acc.scope3 + curr.scope3_total,
    }), { total: 0, scope1: 0, scope2: 0, scope3: 0 });

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setShowReport(true);
    setGeneratedReport("");

    try {
      // Get selected emissions data
      const selectedEmissionData = emissions.filter(e => selectedEmissions.includes(e.id));

      if (selectedEmissionData.length === 0) {
        setGeneratedReport("Erro: Nenhuma emissão selecionada");
        setIsGenerating(false);
        return;
      }

      // Aggregate emissions data for the agent
      const aggregatedEmissionData = {
        totalCo2e: selectedTotals.total,
        scope1_total: selectedTotals.scope1,
        scope2_total: selectedTotals.scope2,
        scope3_total: selectedTotals.scope3,
        emissions: selectedEmissionData.map(e => ({
          id: e.id,
          year: e.year,
          description: e.description,
          totalCo2e: e.totalCo2e,
          scope1_total: e.scope1_total,
          scope2_total: e.scope2_total,
          scope3_total: e.scope3_total,
          data: e.data,
        })),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents/generate-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emissionData: aggregatedEmissionData,
          userPrompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao gerar relatório: ${response.statusText}`);
      }

      // Handle Server-Sent Events streaming
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Resposta do servidor não suporta streaming");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        // Keep the last incomplete line in the buffer
        buffer = lines[lines.length - 1];

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];

          // Parse SSE format
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6);
            try {
              const event = JSON.parse(dataStr);

              if (event.type === "report_chunk") {
                setGeneratedReport(prev => prev + event.chunk);
              } else if (event.type === "report_complete") {
                setGeneratedReport(event.content);
              } else if (event.type === "error") {
                setGeneratedReport(`Erro ao gerar relatório: ${event.error}`);
              }
            } catch (e) {
              console.error("Erro ao parsear evento SSE:", e);
            }
          }
        }
      }

      // Process any remaining buffer
      if (buffer.startsWith("data: ")) {
        const dataStr = buffer.slice(6);
        try {
          const event = JSON.parse(dataStr);
          if (event.type === "report_complete") {
            setGeneratedReport(event.content);
          }
        } catch (e) {
          console.error("Erro ao parsear último evento SSE:", e);
        }
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      setGeneratedReport(
        `Erro ao gerar relatório: ${error instanceof Error ? error.message : "Erro desconhecido"}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackForm = () => {
    setShowReport(false);
    setGeneratedReport("");
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-20 py-7 space-y-6 relative overflow-hidden">
      {/* FORMULÁRIO COM TRANSIÇÃO */}
      <div className={`transition-all duration-700 ease-in-out ${showReport
          ? 'opacity-0 -translate-x-full absolute pointer-events-none'
          : 'opacity-100 translate-x-0'
        }`}>
        {/* Header */}
        <div className="bg-gradient-to-b from-[#008F70] to-[#00a888] text-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Gerador de Relatórios com IA</h1>
          </div>
          <p className="flex flex-col items-center text-white/90">
            Selecione as emissões e descreva o que você gostaria de analisar no relatório
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Painel de Descrição do Prompt */}
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
                    onClick={handleGenerateReport}
                    disabled={selectedEmissions.length === 0 || !prompt.trim()}
                    className="px-8 py-3 bg-[#008F70] text-white rounded-xl font-semibold hover:bg-[#007a5e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Gerar Relatório com IA
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Sugestões rápidas:</p>
                <div className="space-y-2">
                  {[
                    "Analise as tendências de emissão ao longo dos anos",
                    "Compare emissões por escopo e sugira melhorias",
                    "Identifique os principais pontos de redução de carbono",
                    "Gere um sumário executivo para stakeholders"
                  ].map((suggestion, idx) => (
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

              {selectedEmissions.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">
                    Emissões Selecionadas: {selectedEmissions.length}
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

          {/* Painel de Seleção */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#008F70]" />
                <h2 className="text-xl font-semibold text-gray-800">Selecione as Emissões</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-xs px-3 py-1 bg-[#008F70] text-white rounded-md hover:bg-[#007a5e] transition-colors">
                  Todas
                </button>
                <button onClick={clearSelection} className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Limpar
                </button>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por ano ou descrição..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F70] focus:border-transparent"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {filteredEmissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Nenhuma emissão encontrada</div>
              ) : (
                filteredEmissions.map((emission) => (
                  <button
                    key={emission.id}
                    onClick={() => toggleEmission(emission.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedEmissions.includes(emission.id)
                        ? "border-[#008F70] bg-green-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold text-gray-800">{emission.year}</span>
                          {selectedEmissions.includes(emission.id) && (
                            <CheckCircle2 className="w-4 h-4 text-[#008F70]" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{emission.description}</p>
                        <div className="flex gap-3 text-xs">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">S1: {emission.scope1_total.toFixed(1)}</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">S2: {emission.scope2_total.toFixed(1)}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">S3: {emission.scope3_total.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-gray-800">{emission.totalCo2e.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">tCO2e</div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RELATÓRIO COM TRANSIÇÃO */}
      <div className={`transition-all duration-700 ease-in-out ${showReport
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-full absolute pointer-events-none'
        }`}>

        {/* Conteúdo do Relatório */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 min-h-[600px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <Loader2 className="w-16 h-16 text-[#008F70] animate-spin mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gerando seu relatório...</h3>
              <p className="text-gray-600">Nossa IA está analisando {selectedEmissions.length} inventários</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800">{generatedReport}</div>
              <div className="flex gap-4 mt-8 pt-8 border-t">
                <button className="px-6 py-3 bg-[#008F70] text-white rounded-lg font-semibold hover:bg-[#007a5e] transition-colors">
                  Exportar PDF
                </button>
                {/* Header do Relatório */}
                <div className="flex items-center justify-between">
                  <button onClick={handleBackForm} className="px-4 py-2 bg-white text-[#008F70] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Nova Análise
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}