"use client";

import { useState } from "react";
import CalculatorForm from "./CalculatorForm";

export default function FormContainer() {
    const [showForm, setShowForm] = useState(false);

    if (!showForm) {
        return (
            <div className="w-full min-h-[500px] sm:min-h-[700px] flex flex-col items-center justify-center bg-[#d9d9d9] p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
                        Calculadora de Emissões de Gases de Efeito Estufa
                    </h2>
                    
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 w-full">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            Como funciona a calculadora?
                        </h3>
                        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                            <p>
                                Esta calculadora permite calcular as emissões de gases de efeito estufa (GEE) 
                                da sua organização seguindo o padrão internacional do GHG Protocol.
                            </p>
                            <p>
                                O processo é dividido em 3 escopos principais:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4">
                                <li><strong>Escopo 1:</strong> Emissões diretas de fontes próprias ou controladas</li>
                                <li><strong>Escopo 2:</strong> Emissões indiretas da energia comprada</li>
                                <li><strong>Escopo 3:</strong> Outras emissões indiretas na cadeia de valor</li>
                            </ul>
                            <p>
                                Para cada escopo, você poderá adicionar diferentes tipos de emissões e 
                                preencher as informações específicas de cada uma.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <button 
                            onClick={() => setShowForm(true)}
                            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#008F70] hover:bg-[#004443] text-white rounded-lg font-semibold transition-colors cursor-pointer text-sm sm:text-base w-full sm:w-auto"
                        >
                            Iniciar Cálculo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[700px] bg-[#d9d9d9] p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <CalculatorForm />
        </div>
    );
}