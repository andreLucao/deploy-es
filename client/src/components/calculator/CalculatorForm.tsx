"use client";

import { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { EmissionForm } from './FormComponents';
import { 
  scope1EmissionTypes, 
  scope2EmissionTypes, 
  scope3EmissionTypes 
} from '@/data/emissionData';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function CalculatorForm() {
  const { data, addEmission, removeEmission, updateEmission } = useCalculator();
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

  const handleUpdateEmission = (emissionId: string, emissionData: any) => {
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

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={`step-${step.id}-${index}`} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep === step.id 
                  ? 'bg-[#008F70] border-[#008F70] text-white' 
                  : currentStep > step.id
                  ? 'bg-green-100 border-[#008F70] text-[#008F70]'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <div className="ml-3">
                <div className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>
                <div className={`text-xs ${
                  currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-[#008F70]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Resumo dos Dados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#008F70]">{data.scope1.emissions.length}</div>
            <div className="text-sm text-gray-600">Escopo 1 - Emissões Diretas</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#008F70]">{data.scope2.emissions.length}</div>
            <div className="text-sm text-gray-600">Escopo 2 - Energia Indireta</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-[#008F70]">{data.scope3.emissions.length}</div>
            <div className="text-sm text-gray-600">Escopo 3 - Outras Emissões Indiretas</div>
          </div>
        </div>
      </div>

    </div>
  );
}
