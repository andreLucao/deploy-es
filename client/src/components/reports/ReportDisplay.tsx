import { Loader2, Download } from "lucide-react";
import Markdown from 'react-markdown';
import { useState } from 'react';
import jsPDF from 'jspdf';
// @ts-ignore - jspdf-autotable doesn't have types
import autoTable from 'jspdf-autotable';

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
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!generatedReport) {
      console.error('❌ [ReportDisplay] Nenhum relatório para exportar');
      return;
    }

    setIsExporting(true);
    console.log('📄 [ReportDisplay] Iniciando exportação para PDF...');

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Helper function to add new page if needed
      const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(generatedReport.title, contentWidth);
      checkPageBreak(titleLines.length * 10);
      pdf.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 10 + 10;

      // Content
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      // Split content into paragraphs and sections
      const contentLines = generatedReport.content.split('\n');
      
      for (const line of contentLines) {
        if (!line.trim()) {
          yPosition += 5;
          continue;
        }

        // Check if it's a header (starts with ##)
        if (line.startsWith('## ')) {
          checkPageBreak(15);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          const headerText = line.replace(/^##\s*/, '');
          const headerLines = pdf.splitTextToSize(headerText, contentWidth);
          pdf.text(headerLines, margin, yPosition);
          yPosition += headerLines.length * 7 + 8;
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
        } 
        // Check if it's a subheader (starts with ###)
        else if (line.startsWith('### ')) {
          checkPageBreak(12);
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          const subHeaderText = line.replace(/^###\s*/, '');
          const subHeaderLines = pdf.splitTextToSize(subHeaderText, contentWidth);
          pdf.text(subHeaderLines, margin, yPosition);
          yPosition += subHeaderLines.length * 6 + 6;
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
        }
        // Check if it's a bullet point
        else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          checkPageBreak(10);
          const bulletText = line.replace(/^[\s-*]+/, '');
          const wrappedLines = pdf.splitTextToSize(bulletText, contentWidth - 10);
          pdf.text('•', margin + 2, yPosition);
          pdf.text(wrappedLines, margin + 7, yPosition);
          yPosition += wrappedLines.length * 6 + 3;
        }
        // Check for bold text (**text**)
        else if (line.includes('**')) {
          checkPageBreak(10);
          // Simple handling - just make the whole line bold if it contains **
          pdf.setFont('helvetica', 'bold');
          const cleanText = line.replace(/\*\*/g, '');
          const wrappedLines = pdf.splitTextToSize(cleanText, contentWidth);
          pdf.text(wrappedLines, margin, yPosition);
          yPosition += wrappedLines.length * 6 + 3;
          pdf.setFont('helvetica', 'normal');
        }
        // Regular paragraph
        else {
          checkPageBreak(10);
          const wrappedLines = pdf.splitTextToSize(line, contentWidth);
          pdf.text(wrappedLines, margin, yPosition);
          yPosition += wrappedLines.length * 6 + 4;
        }
      }

      // Action Items Table
      if (generatedReport.action_items && generatedReport.action_items.length > 0) {
        checkPageBreak(20);
        yPosition += 10;
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Plano de Ação', margin, yPosition);
        yPosition += 10;

        const tableData = generatedReport.action_items.map((item) => [
          item.action,
          item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa',
          item.timeline,
          item.responsible,
          item.estimated_impact,
        ]);

        autoTable(pdf, {
          startY: yPosition,
          head: [['Ação', 'Prioridade', 'Prazo', 'Responsável', 'Impacto']],
          body: tableData,
          margin: { left: margin, right: margin },
          headStyles: { fillColor: [0, 143, 112], textColor: 255, fontSize: 10 },
          bodyStyles: { fontSize: 9 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 25 },
            2: { cellWidth: 30 },
            3: { cellWidth: 35 },
            4: { cellWidth: 40 },
          },
          didParseCell: function (data) {
            if (data.row.section === 'body' && data.column.index === 1) {
              const priority = generatedReport.action_items[data.row.index].priority;
              if (priority === 'high') {
                data.cell.styles.fillColor = [254, 226, 226]; // red-100
                data.cell.styles.textColor = [153, 27, 27]; // red-800
              } else if (priority === 'medium') {
                data.cell.styles.fillColor = [254, 249, 195]; // yellow-100
                data.cell.styles.textColor = [133, 77, 14]; // yellow-800
              } else {
                data.cell.styles.fillColor = [220, 252, 231]; // green-100
                data.cell.styles.textColor = [22, 101, 52]; // green-800
              }
            }
          },
        });
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `relatorio-emissoes-${timestamp}.pdf`;

      // Save the PDF
      pdf.save(filename);
      
      console.log('✅ [ReportDisplay] PDF exportado com sucesso:', filename);
    } catch (error) {
      console.error('❌ [ReportDisplay] Erro ao exportar PDF:', error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      alert(`Erro ao exportar PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Verifique o console para mais detalhes.`);
    } finally {
      setIsExporting(false);
    }
  };

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
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className={`px-6 py-3 bg-[#008F70] text-white rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#007a5e]'
              }`}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Exportar PDF
                </>
              )}
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
