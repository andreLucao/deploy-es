"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { calculatorAPI, InventoryInput, InventoryResult, EmissionsSummary, InventoryResponse } from '@/lib/calculatorApi';

export interface EmissionData {
  id: string;
  description: string;
  type: string;
  fields: Record<string, string | number | boolean>;
  quantity?: number;
  emissionProductId?: string;
  emissionType?: string;
  calculatedCo2e?: number;
}

export interface ScopeData {
  emissions: EmissionData[];
}

export interface CalculatorData {
  scope1: ScopeData;
  scope2: ScopeData;
  scope3: ScopeData;
}

interface CalculatorContextType {
  // Estado local
  data: CalculatorData;
  updateEmission: (scope: keyof CalculatorData, emissionId: string, emissionData: Record<string, string | number | boolean>) => void;
  addEmission: (scope: keyof CalculatorData, emissionType: string) => void;
  removeEmission: (scope: keyof CalculatorData, emissionId: string) => void;
  clearScope: (scope: keyof CalculatorData) => void;
  clearAllData: () => void;
  calculateTotalEmissions: () => number;
  
  // Estado da API
  isLoading: boolean;
  error: string | null;
  lastResult: InventoryResult | null;
  
  // Ações da API
  saveInventory: (companyId: string, year: number) => Promise<InventoryResult | null>;
  loadInventory: (companyId: string, year?: number) => Promise<InventoryResponse | null>;
  calculateTotal: (companyId: string, year: number) => Promise<number>;
  getEmissionsSummary: (companyId: string) => Promise<EmissionsSummary | null>;
  clearError: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider = ({ children }: CalculatorProviderProps) => {
  // Estado local
  const [data, setData] = useState<CalculatorData>({
    scope1: { emissions: [] },
    scope2: { emissions: [] },
    scope3: { emissions: [] }
  });

  // Estado da API
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<InventoryResult | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateEmission = (scope: keyof CalculatorData, emissionId: string, emissionData: Record<string, string | number | boolean>) => {
    setData(prev => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        emissions: prev[scope].emissions.map(emission => {
          if (emission.id === emissionId) {
            const quantity = typeof emissionData.quantity === 'number'
              ? emissionData.quantity
              : parseFloat(String(emissionData.quantity || 0)) || 0;
            const emissionFactor = 2.5; // Fator padrão (pode ser melhorado com dados reais)
            const calculatedCo2e = quantity > 0 ? quantity * emissionFactor : 0;

            return {
              ...emission,
              fields: emissionData,
              quantity: quantity,
              description: String(emissionData.description || ''),
              calculatedCo2e: calculatedCo2e
            };
          }
          return emission;
        })
      }
    }));
  };

  const addEmission = (scope: keyof CalculatorData, emissionType: string) => {
    const newEmission: EmissionData = {
      id: `${Date.now()}-${Math.random()}`,
      description: '',
      type: emissionType,
      fields: {},
      emissionType
    };

    setData(prev => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        emissions: [...prev[scope].emissions, newEmission]
      }
    }));
  };

  const removeEmission = (scope: keyof CalculatorData, emissionId: string) => {
    setData(prev => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        emissions: prev[scope].emissions.filter(emission => emission.id !== emissionId)
      }
    }));
  };

  const clearScope = (scope: keyof CalculatorData) => {
    setData(prev => ({
      ...prev,
      [scope]: { emissions: [] }
    }));
  };

  const clearAllData = () => {
    setData({
      scope1: { emissions: [] },
      scope2: { emissions: [] },
      scope3: { emissions: [] }
    });
  };

  const calculateTotalEmissions = () => {
    let total = 0;
    
    // Somar todas as emissões de todos os escopos
    ['scope1', 'scope2', 'scope3'].forEach(scope => {
      const scopeData = data[scope as keyof CalculatorData];
      scopeData.emissions.forEach(emission => {
        if (emission.calculatedCo2e && emission.calculatedCo2e > 0) {
          total += emission.calculatedCo2e;
        }
      });
    });
    
    return total;
  };

  // Funções da API
  const saveInventory = useCallback(async (companyId: string, year: number): Promise<InventoryResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Converter dados locais para formato da API
      const inventoryData: InventoryInput = {
        companyId,
        year,
        scopes: {
          '1': {
            emissions: data.scope1.emissions.map(emission => ({
              type: emission.type,
              emissionProductId: emission.emissionProductId || 'default-product',
              quantity: emission.quantity || 0,
              emissionType: emission.emissionType || emission.type,
              scope: 1,
              formData: emission.fields,
              description: emission.description
            }))
          },
          '2': {
            emissions: data.scope2.emissions.map(emission => ({
              type: emission.type,
              emissionProductId: emission.emissionProductId || 'default-product',
              quantity: emission.quantity || 0,
              emissionType: emission.emissionType || emission.type,
              scope: 2,
              formData: emission.fields,
              description: emission.description
            }))
          },
          '3': {
            emissions: data.scope3.emissions.map(emission => ({
              type: emission.type,
              emissionProductId: emission.emissionProductId || 'default-product',
              quantity: emission.quantity || 0,
              emissionType: emission.emissionType || emission.type,
              scope: 3,
              formData: emission.fields,
              description: emission.description
            }))
          }
        }
      };

      const result = await calculatorAPI.calculateInventory(inventoryData);
      setLastResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const loadInventory = useCallback(async (companyId: string, year?: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await calculatorAPI.getInventory(companyId, year);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar inventário';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const calculateTotal = useCallback(async (companyId: string, year: number): Promise<number> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const total = await calculatorAPI.calculateTotal(companyId, year);
      return total;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao calcular total';
      setError(errorMessage);
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEmissionsSummary = useCallback(async (companyId: string): Promise<EmissionsSummary | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const summary = await calculatorAPI.getEmissionsSummary(companyId);
      return summary;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar resumo';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CalculatorContext.Provider value={{
      // Estado local
      data,
      updateEmission,
      addEmission,
      removeEmission,
      clearScope,
      clearAllData,
      calculateTotalEmissions,
      
      // Estado da API
      isLoading,
      error,
      lastResult,
      
      // Ações da API
      saveInventory,
      loadInventory,
      calculateTotal,
      getEmissionsSummary,
      clearError
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};
