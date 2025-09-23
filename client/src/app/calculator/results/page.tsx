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
        const totalScope1 = data.scope1.emissions.length;
        const totalScope2 = data.scope2.emissions.length;
        const totalScope3 = data.scope3.emissions.length;
        return totalScope1 + totalScope2 + totalScope3;
    };

    const getDetailedResults = () => {
        const results = [];
        
        // Escopo 1
        data.scope1.emissions.forEach((emission, index) => {
            results.push({
                scope: 'Escopo 1 - Emissões Diretas',
                type: emission.type,
                description: emission.fields.description || 'Sem descrição',
                index: index + 1
            });
        });

        // Escopo 2
        data.scope2.emissions.forEach((emission, index) => {
            results.push({
                scope: 'Escopo 2 - Energia Indireta',
                type: emission.type,
                description: emission.fields.description || 'Sem descrição',
                index: index + 1
            });
        });

        // Escopo 3
        data.scope3.emissions.forEach((emission, index) => {
            results.push({
                scope: 'Escopo 3 - Outras Emissões Indiretas',
                type: emission.type,
                description: emission.fields.description || 'Sem descrição',
                index: index + 1
            });
        });

        return results;
    };

    return (
        <main className="bg-[#efefef] w-full min-h-screen flex flex-col">
            <Header />
            
            <div className="flex-1 flex justify-center items-center p-8">
                <div className="w-full max-w-6xl">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mb-4">
                                {showResults ? (
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="text-6xl mb-4 animate-spin">🧮</div>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {showResults ? 'Inventário Concluído!' : 'Processando Dados...'}
                            </h1>
                            <p className="text-gray-600">
                                {showResults 
                                    ? 'Seu inventário de emissões foi processado com sucesso. Agora você pode acessar o marketplace de créditos de carbono.'
                                    : 'Analisando as informações fornecidas...'
                                }
                            </p>
                        </div>

                        {showResults && (
                            <>
                                {/* Resumo do Inventário */}
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        Resumo do Seu Inventário de Emissões
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="bg-white p-4 rounded-lg text-center">
                                            <div className="text-3xl font-bold text-[#008F70]">{data.scope1.emissions.length}</div>
                                            <div className="text-sm text-gray-600">Escopo 1 - Emissões Diretas</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg text-center">
                                            <div className="text-3xl font-bold text-[#008F70]">{data.scope2.emissions.length}</div>
                                            <div className="text-sm text-gray-600">Escopo 2 - Energia Indireta</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg text-center">
                                            <div className="text-3xl font-bold text-[#008F70]">{data.scope3.emissions.length}</div>
                                            <div className="text-sm text-gray-600">Escopo 3 - Outras Emissões Indiretas</div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-semibold text-gray-800">
                                            Total de {getTotalEmissions()} fonte(s) de emissão identificada(s)
                                        </div>
                                    </div>
                                </div>

                                {/* Detalhes das Emissões */}
                                {getDetailedResults().length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Detalhes das Emissões Cadastradas
                                        </h2>
                                        <div className="space-y-3">
                                            {getDetailedResults().map((result, index) => (
                                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                    <div>
                                                        <div className="font-semibold text-gray-800">
                                                            {result.scope}
                                                        </div>
                                                        <div className="text-sm text-gray-600 capitalize">
                                                            {result.type.replace(/_/g, ' ')}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {result.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Próximos Passos */}
                                <div className="space-y-6 mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Próximos Passos
                                    </h2>
                                    
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-blue-800 mb-2">
                                            🧮 Cálculo das Emissões
                                        </h3>
                                        <p className="text-blue-700 text-sm">
                                            Em breve, implementaremos o cálculo automático das suas emissões de CO₂ equivalente 
                                            baseado nos dados fornecidos no inventário.
                                        </p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-green-800 mb-2">
                                            🌱 Marketplace de Créditos
                                        </h3>
                                        <p className="text-green-700 text-sm">
                                            Acesse nosso marketplace de créditos de carbono para encontrar projetos de compensação 
                                            adequados ao seu perfil e neutralizar suas emissões.
                                        </p>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-purple-800 mb-2">
                                            📊 Relatórios e Certificados
                                        </h3>
                                        <p className="text-purple-700 text-sm">
                                            Gere relatórios detalhados e obtenha certificados de neutralidade de carbono 
                                            para demonstrar seu compromisso com a sustentabilidade.
                                        </p>
                                    </div>
                                </div>

                                {/* Botões de Ação */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => router.push('/calculator')}
                                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        ← Voltar ao Inventário
                                    </button>
                                    <button
                                        onClick={() => router.push('/marketplace')}
                                        className="flex-1 px-6 py-3 bg-[#008F70] text-white rounded-lg font-semibold hover:bg-[#004443] transition-colors"
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
