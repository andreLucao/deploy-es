"use client";

import { useCalculator } from "@/contexts/CalculatorContext";
import Header from "@/components/calculator/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CalculatorResults() {
    const { data } = useCalculator();
    const router = useRouter();
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        // Simular um pequeno delay para mostrar a animação
        const timer = setTimeout(() => setShowResults(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const getTotalEmissions = () => {
        let total = 0;
        
        // Somar CO2e de todos os escopos
        ['scope1', 'scope2', 'scope3'].forEach(scope => {
            const scopeData = data[scope as keyof typeof data];
            scopeData.emissions.forEach(emission => {
                if (emission.calculatedCo2e && emission.calculatedCo2e > 0) {
                    total += emission.calculatedCo2e;
                }
            });
        });
        
        return total;
    };

    const getDetailedResults = () => {
        const results: Array<{
            scope: string;
            type: string;
            description: string;
            quantity: number;
            co2e: number;
            index: number;
        }> = [];
        
        // Escopo 1
        data.scope1.emissions.forEach((emission, index) => {
            if (emission.calculatedCo2e && emission.calculatedCo2e > 0) {
                results.push({
                    scope: 'Escopo 1 - Emissões Diretas',
                    type: emission.type,
                    description: emission.description || String(emission.fields?.description || 'Sem descrição'),
                    quantity: emission.quantity || 0,
                    co2e: emission.calculatedCo2e,
                    index: index + 1
                });
            }
        });

        // Escopo 2
        data.scope2.emissions.forEach((emission, index) => {
            if (emission.calculatedCo2e && emission.calculatedCo2e > 0) {
                results.push({
                    scope: 'Escopo 2 - Energia Indireta',
                    type: emission.type,
                    description: emission.description || (emission.fields?.description ? String(emission.fields.description) : 'Sem descrição'),
                    quantity: emission.quantity || 0,
                    co2e: emission.calculatedCo2e,
                    index: index + 1
                });
            }
        });

        // Escopo 3
        data.scope3.emissions.forEach((emission, index) => {
            if (emission.calculatedCo2e && emission.calculatedCo2e > 0) {
                results.push({
                    scope: 'Escopo 3 - Outras Emissões Indiretas',
                    type: emission.type,
                    description: emission.description || (emission.fields?.description ? String(emission.fields.description) : 'Sem descrição'),
                    quantity: emission.quantity || 0,
                    co2e: emission.calculatedCo2e,
                    index: index + 1
                });
            }
        });

        return results;
    };

    return (
        <main className="bg-[#efefef] w-full min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex justify-center items-center container-responsive spacing-responsive-md">
                <div className="max-w-4xl w-full">
                    <div className="bg-white rounded-2xl shadow-lg spacing-responsive-lg">
                        {/* Cabeçalho com Status */}
                        <div className="text-center mb-8">
                            <div className="mb-6">
                                {showResults ? (
                                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full">
                                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="text-4xl sm:text-6xl mb-4 animate-spin">🧮</div>
                                )}
                            </div>
                            <h1 className="text-responsive-xl font-bold text-gray-800 mb-4">
                                {showResults ? 'Inventário Concluído!' : 'Processando Dados...'}
                            </h1>
                            <p className="text-responsive-sm text-gray-600 max-w-2xl mx-auto">
                                {showResults 
                                    ? 'Seu inventário de emissões foi processado com sucesso. Agora você pode acessar o marketplace de créditos de carbono.'
                                    : 'Analisando as informações fornecidas...'
                                }
                            </p>
                        </div>                        {showResults && (
                            <>
                                {/* Resumo do Inventário */}
                                <div className="bg-gray-50 rounded-lg spacing-responsive-md mb-8">
                                    <h2 className="text-responsive-lg font-semibold text-gray-800 mb-4">
                                        Resumo do Seu Inventário de Emissões
                                    </h2>
                                    {/* Total Geral em Destaque */}
                                    <div className="bg-[#008F70] text-white spacing-responsive-md rounded-lg mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-4xl font-bold">{getTotalEmissions().toFixed(2)} tCO2e</div>
                                            <div className="text-sm sm:text-lg mt-2">Total de Emissões do Inventário</div>
                                        </div>
                                    </div>

                                    <div className="grid-responsive-3 gap-4 mb-4">
                                        <div className="bg-white spacing-responsive-sm rounded-lg text-center border-l-4 border-red-500">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-800">
                                                {data.scope1.emissions.reduce((total, emission) => total + (emission.calculatedCo2e || 0), 0).toFixed(2)}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Escopo 1 - Emissões Diretas (tCO2e)</div>
                                            <div className="text-xs text-gray-500 mt-1">{data.scope1.emissions.length} emissões</div>
                                        </div>
                                        <div className="bg-white spacing-responsive-sm rounded-lg text-center border-l-4 border-yellow-500">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-800">
                                                {data.scope2.emissions.reduce((total, emission) => total + (emission.calculatedCo2e || 0), 0).toFixed(2)}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Escopo 2 - Energia Indireta (tCO2e)</div>
                                            <div className="text-xs text-gray-500 mt-1">{data.scope2.emissions.length} emissões</div>
                                        </div>
                                        <div className="bg-white spacing-responsive-sm rounded-lg text-center border-l-4 border-blue-500">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-800">
                                                {data.scope3.emissions.reduce((total, emission) => total + (emission.calculatedCo2e || 0), 0).toFixed(2)}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Escopo 3 - Outras Emissões Indiretas (tCO2e)</div>
                                            <div className="text-xs text-gray-500 mt-1">{data.scope3.emissions.length} emissões</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detalhes das Emissões */}
                                {getDetailedResults().length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-responsive-lg font-semibold text-gray-800 mb-4">
                                            Detalhes das Emissões Cadastradas
                                        </h2>
                                        <div className="space-y-3">
                                            {getDetailedResults().map((result, index) => (
                                                <div key={index} className="bg-white spacing-responsive-sm rounded-lg border border-gray-200">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-800 text-responsive-sm">
                                                                {result.scope}
                                                            </div>
                                                            <div className="text-xs sm:text-sm text-gray-600 capitalize">
                                                                {result.type.replace(/_/g, ' ')}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {result.description}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                Quantidade: {result.quantity}
                                                            </div>
                                                        </div>
                                                        <div className="text-left sm:text-right">
                                                            <div className="text-base sm:text-lg font-bold text-[#008F70]">
                                                                {result.co2e.toFixed(2)} tCO2e
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                Emissão calculada
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Próximos Passos */}
                                <div className="space-y-4 sm:space-y-6 mb-8">
                                    <h2 className="text-responsive-lg font-semibold text-gray-800">
                                        Próximos Passos
                                    </h2>
                                    
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg spacing-responsive-sm">
                                        <h3 className="font-semibold text-blue-800 mb-2 text-responsive-sm">
                                            🧮 Cálculo das Emissões
                                        </h3>
                                        <p className="text-blue-700 text-xs sm:text-sm">
                                            Em breve, implementaremos o cálculo automático das suas emissões de CO₂ equivalente 
                                            baseado nos dados fornecidos no inventário.
                                        </p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg spacing-responsive-sm">
                                        <h3 className="font-semibold text-green-800 mb-2 text-responsive-sm">
                                            🌱 Marketplace de Créditos
                                        </h3>
                                        <p className="text-green-700 text-xs sm:text-sm">
                                            Acesse nosso marketplace de créditos de carbono para encontrar projetos de compensação 
                                            adequados ao seu perfil e neutralizar suas emissões.
                                        </p>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-lg spacing-responsive-sm">
                                        <h3 className="font-semibold text-purple-800 mb-2 text-responsive-sm">
                                            📊 Relatórios e Certificados
                                        </h3>
                                        <p className="text-purple-700 text-xs sm:text-sm">
                                            Gere relatórios detalhados e obtenha certificados de neutralidade de carbono 
                                            para demonstrar seu compromisso com a sustentabilidade.
                                        </p>
                                    </div>
                                </div>

                                {/* Botões de Ação */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                        onClick={() => router.push('/calculator')}
                                        className="flex-1 spacing-responsive-sm bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-responsive-sm"
                                    >
                                        ← Voltar ao Inventário
                                    </button>
                                    <button
                                        onClick={() => router.push('/marketplace')}
                                        className="flex-1 spacing-responsive-sm bg-[#008F70] text-white rounded-lg font-semibold hover:bg-[#004443] transition-colors text-responsive-sm"
                                    >
                                        🌱 Ir para Marketplace →
                                    </button>
                                </div>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
