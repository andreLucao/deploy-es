"use client";

import { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { EmissionForm } from './FormComponents';
import { 
  scope1EmissionTypes, 
  scope2EmissionTypes, 
  scope3EmissionTypes 
} from '@/data/emissionData';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CalculatorForm() {
  const { 
    data, 
    addEmission, 
    removeEmission, 
    updateEmission,
    calculateTotalEmissions,
    saveInventory,
    isLoading
  } = useCalculator();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Escopo 1', description: 'Emissões Diretas' },
    { id: 2, title: 'Escopo 2', description: 'Energia Indireta' },
    { id: 3, title: 'Escopo 3', description: 'Outras Emissões Indiretas' }
  ];

  const getCurrentScope = () => {
    switch (currentStep) {
      case 1: return 'scope1';
      case 2: return 'scope2';
      case 3: return 'scope3';
      default: return 'scope1';
    }
  };

  const getCurrentScopeData = () => {
    const scope = getCurrentScope();
    return data[scope as keyof typeof data];
  };

  const getCurrentEmissionTypes = () => {
    switch (currentStep) {
      case 1: return scope1EmissionTypes;
      case 2: return scope2EmissionTypes;
      case 3: return scope3EmissionTypes;
      default: return scope1EmissionTypes;
    }
  };

  const handleAddEmission = (emissionType: string) => {
    addEmission(getCurrentScope() as keyof typeof data, emissionType);
  };

  const handleRemoveEmission = (emissionId: string) => {
    removeEmission(getCurrentScope() as keyof typeof data, emissionId);
  };

  const handleUpdateEmission = (emissionId: string, emissionData: Record<string, string | number | boolean>) => {
    updateEmission(getCurrentScope() as keyof typeof data, emissionId, emissionData);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepProgress = () => {
    const scope = getCurrentScope();
    const emissions = data[scope as keyof typeof data].emissions;
    return emissions.length;
  };

  const handleFinishCalculation = async () => {
    try {
      // Salvar inventário no banco de dados
      const companyId = 'comp' + Math.floor(Math.random() * 1000); // ID simples para teste
      const year = new Date().getFullYear();
      
      const result = await saveInventory(companyId, year);
      
      if (result) {
        // Navegar para página de resultados
        router.push('/calculator/results');
      } else {
        alert('Erro ao salvar o inventário. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao finalizar cálculo:', error);
      alert('Erro ao processar os dados. Tente novamente.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-4 min-w-min">
          {steps.map((step, index) => (
            <div key={`step-${step.id}-${index}`} className="flex items-center flex-shrink-0">
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 text-xs sm:text-base ${
                currentStep === step.id 
                  ? 'bg-[#008F70] border-[#008F70] text-white' 
                  : currentStep > step.id
                  ? 'bg-green-100 border-[#008F70] text-[#008F70]'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <div className="ml-2 sm:ml-3">
                <div className={`text-xs sm:text-sm font-medium ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>
                <div className={`text-xs hidden sm:block ${
                  currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 sm:mx-4 min-w-[20px] ${
                  currentStep > step.id ? 'bg-[#008F70]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 mt-1">
              {steps[currentStep - 1].description}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {getStepProgress()} emissão(ões) adicionada(s)
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Anterior</span>
            </button>
            {currentStep === 3 ? (
              <button
                onClick={() => window.location.href = '/calculator/results'}
                className="px-6 py-2 rounded-lg flex items-center space-x-2 bg-[#008F70] text-white hover:bg-[#004443] font-semibold"
              >
                <span>🧮 Calcular</span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-[#008F70] text-white hover:bg-[#004443]"
              >
                <span>Próximo</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Add Emission Type */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Adicionar Tipo de Emissão
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {getCurrentEmissionTypes().map((emissionType, index) => (
              <button
                key={`${getCurrentScope()}-emission-type-${emissionType.value}-${index}`}
                onClick={() => handleAddEmission(emissionType.value)}
                className="p-3 bg-gray-50 hover:bg-[#008F70] hover:text-white rounded-lg border border-gray-200 hover:border-[#008F70] transition-all duration-200 text-left"
              >
                <div className="flex items-center space-x-2">
                  <Plus size={16} />
                  <span className="text-sm font-medium">{emissionType.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Existing Emissions */}
        {getCurrentScopeData().emissions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Emissões Adicionadas
            </h3>
            <div className="space-y-4">
              {getCurrentScopeData().emissions.map((emission, index) => (
                <EmissionForm
                  key={`${getCurrentScope()}-${emission.id}-${index}`}
                  emissionId={emission.id}
                  emissionType={emission.type}
                  initialData={emission.fields}
                  onUpdate={(emissionData) => handleUpdateEmission(emission.id, emissionData)}
                  onRemove={() => handleRemoveEmission(emission.id)}
                />
              ))}
            </div>
          </div>
        )}

        {getCurrentScopeData().emissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhuma emissão adicionada
            </h3>
            <p className="text-gray-500">
              Selecione um tipo de emissão acima para começar
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 overflow-hidden">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Resumo dos Dados
        </h3>
        
        {/* Total Geral */}
        <div className="bg-[#008F70] text-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">{calculateTotalEmissions().toFixed(2)} tCO2e</div>
            <div className="text-sm sm:text-lg">Total de Emissões Calculadas</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg border-l-4 border-red-500">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">
              {data.scope1.emissions.reduce((total, emission) => total + (emission.calculatedCo2e || 0), 0).toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Escopo 1 - Emissões Diretas (tCO2e)</div>
            <div className="text-xs text-gray-500 mt-1">{data.scope1.emissions.length} emissões</div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">
              {data.scope2.emissions.reduce((total, emission) => total + (emission.calculatedCo2e || 0), 0).toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Escopo 2 - Energia Indireta (tCO2e)</div>
            <div className="text-xs text-gray-500 mt-1">{data.scope2.emissions.length} emissões</div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">
              {data.scope3.emissions.reduce((total, emission) => total + (emission.calculatedCo2e || 0), 0).toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Escopo 3 - Outras Emissões Indiretas (tCO2e)</div>
            <div className="text-xs text-gray-500 mt-1">{data.scope3.emissions.length} emissões</div>
          </div>
        </div>
      </div>

      {/* Botão Finalizar Cálculo */}
      {calculateTotalEmissions() > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Pronto para Finalizar seu Inventário?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Você calculou um total de <strong>{calculateTotalEmissions().toFixed(2)} tCO2e</strong> em emissões. 
              Clique no botão abaixo para salvar seu inventário e ver os resultados completos.
            </p>
            <button
              onClick={handleFinishCalculation}
              disabled={isLoading}
              className="bg-[#008F70] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#007563] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto transition-colors w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Salvando Inventário...
                </>
              ) : (
                <>
                  <Check className="mr-2" size={20} />
                  Finalizar e Ver Resultados
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
