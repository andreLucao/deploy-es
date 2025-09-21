"use client";

import { useState } from "react";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";

export default function FormContainer() {
    const [ativo, setAtivo] = useState<{ [key: string]: boolean }>({});

    const toggleConteudo = (id: string) => {
        setAtivo((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const EscopoDropdown = ({
        id,
        titulo,
        children,
    }: {
        id: string;
        titulo: string;
        children: React.ReactNode;
    }) => (
        <div className="w-full mb-4">
            <div
                className="w-full p-5 bg-white cursor-pointer font-bold select-none hover:bg-gray-50 transition-colors flex items-center justify-between"
                onClick={() => toggleConteudo(id)}
            >
                <span className="flex-1 text-center">{titulo}</span>
                <span className="text-[#002E34]">
                    {ativo[id] ? <CircleChevronUp /> : <CircleChevronDown />}
                </span>
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    ativo[id] ? "max-h-[2000px]" : "max-h-0"
                }`}
            >
                <div className="p-4 bg-white">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-[1640px] min-h-[700px] flex flex-col items-center justify-center bg-[#d9d9d9] p-8">
            <div className="w-[1270px] flex flex-col items-center">
                {/* <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Calculadora de Emissões de Gases de Efeito Estufa
                </h2> */}
                
                <EscopoDropdown id="escopo1" titulo="Escopo 1 - Emissões Diretas">
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4">
                            Emissões diretas de fontes que são de propriedade ou controladas pela organização.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Combustão Estacionária</h4>
                                <p className="text-xs text-gray-500">Emissões de combustíveis em equipamentos fixos</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Combustão Móvel</h4>
                                <p className="text-xs text-gray-500">Emissões de veículos da empresa</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Emissões Fugitivas</h4>
                                <p className="text-xs text-gray-500">Vazamentos e liberações não intencionais</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Processos Industriais</h4>
                                <p className="text-xs text-gray-500">Emissões de processos de produção</p>
                            </div>
                        </div>
                    </div>
                </EscopoDropdown>

                <EscopoDropdown id="escopo2" titulo="Escopo 2 - Emissões Indiretas de Energia">
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4">
                            Emissões indiretas da geração de energia elétrica, vapor, aquecimento e refrigeração comprados.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Energia Elétrica</h4>
                                <p className="text-xs text-gray-500">Consumo de eletricidade</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Perdas de Energia</h4>
                                <p className="text-xs text-gray-500">Perdas na transmissão e distribuição</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Energia Térmica</h4>
                                <p className="text-xs text-gray-500">Vapor, aquecimento e refrigeração</p>
                            </div>
                        </div>
                    </div>
                </EscopoDropdown>

                <EscopoDropdown id="escopo3" titulo="Escopo 3 - Outras Emissões Indiretas">
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4">
                            Todas as outras emissões indiretas que ocorrem na cadeia de valor da organização.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Transporte e Distribuição</h4>
                                <p className="text-xs text-gray-500">Logística e distribuição de produtos</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Resíduos Sólidos</h4>
                                <p className="text-xs text-gray-500">Tratamento e disposição de resíduos</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Efluentes</h4>
                                <p className="text-xs text-gray-500">Tratamento de águas residuais</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">Viagens de Negócios</h4>
                                <p className="text-xs text-gray-500">Deslocamentos corporativos</p>
                            </div>
                        </div>
                    </div>
                </EscopoDropdown>

                <div className="mt-8 flex justify-center">
                    <button className="px-8 py-3 bg-[#008F70] hover:bg-[#004443] text-white rounded-lg font-semibold transition-colors cursor-pointer">
                        Iniciar Cálculo
                    </button>
                </div>
            </div>
        </div>
    );
}