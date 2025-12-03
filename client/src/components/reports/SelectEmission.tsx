"use client"

import { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { calculatorAPI } from '@/lib/calculatorApi';
import ReportHeader from './ReportHeader';
import ReportPromptPanel from './ReportPromptPanel';
import EmissionSelector from './EmissionSelector';
import ReportDisplay from './ReportDisplay';

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

export default function SelectEmission() {
  const [prompt, setPrompt] = useState("");
  const { user } = useAuth();
  const [emissions, setEmissions] = useState<Emission[]>([]);
  const [selectedEmissions, setSelectedEmissions] = useState<string[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [reportError, setReportError] = useState("");

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
    setGeneratedReport(null);
    setReportError("");

    try {
      // Get selected emissions data
      const selectedEmissionData = emissions.filter(e => selectedEmissions.includes(e.id));

      if (selectedEmissionData.length === 0) {
        setReportError("Erro: Nenhuma emissão selecionada");
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

      // Handle streaming
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Resposta do servidor não suporta streaming");
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let reportContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        // Keep the last incomplete line in the buffer
        buffer = lines[lines.length - 1];

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();

          // Skip empty lines
          if (!line) continue;

          // Parse NDJSON format
          try {
            const event = JSON.parse(line);

            if (event.type === "report_chunk") {
              reportContent += event.chunk;
            } else if (event.type === "error") {
              setReportError(`Erro ao gerar relatório: ${event.error}`);
            }
          } catch (e) {
            console.error("Erro ao parsear NDJSON:", e, "Linha:", line);
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        try {
          const event = JSON.parse(buffer);
          if (event.type === "report_chunk") {
            reportContent += event.chunk;
          }
        } catch (e) {
          console.error("Erro ao parsear último evento NDJSON:", e);
        }
      }

      // Parse the accumulated report content as JSON
      try {
        const parsedReport = JSON.parse(reportContent) as GeneratedReport;
        setGeneratedReport(parsedReport);
      } catch (parseError) {
        console.error("Erro ao parsear relatório como JSON:", parseError);
        setReportError("Erro ao processar relatório gerado");
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      setReportError(
        `Erro ao gerar relatório: ${error instanceof Error ? error.message : "Erro desconhecido"}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackForm = () => {
    setShowReport(false);
    setGeneratedReport(null);
    setReportError("");
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-20 py-7 space-y-6 relative overflow-hidden">
      {/* FORMULÁRIO COM TRANSIÇÃO */}
      <div className={`transition-all duration-700 ease-in-out ${
        showReport
          ? 'opacity-0 -translate-x-full absolute pointer-events-none'
          : 'opacity-100 translate-x-0'
      }`}>
        <ReportHeader />

        <div className="grid lg:grid-cols-2 gap-6">
          <ReportPromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            selectedCount={selectedEmissions.length}
            selectedTotals={selectedTotals}
            onGenerateReport={handleGenerateReport}
            isDisabled={selectedEmissions.length === 0 || !prompt.trim()}
          />

          <EmissionSelector
            emissions={emissions}
            selectedEmissions={selectedEmissions}
            onToggleEmission={toggleEmission}
            onSelectAll={selectAll}
            onClearSelection={clearSelection}
          />
        </div>
      </div>

      {/* RELATÓRIO COM TRANSIÇÃO */}
      <div className={`transition-all duration-700 ease-in-out ${
        showReport
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-full absolute pointer-events-none'
      }`}>
        <ReportDisplay
          isGenerating={isGenerating}
          reportError={reportError}
          generatedReport={generatedReport}
          selectedCount={selectedEmissions.length}
          onBackForm={handleBackForm}
        />
      </div>
    </div>
  );
}