"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { calculatorAPI, InventoryInput, InventoryResult, EmissionsSummary, InventoryResponse } from '@/lib/calculatorApi';
import { useEmissionProducts } from '@/hooks/useEmissionProducts';

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
  // Hook para buscar fatores de emissão do banco
  const { getFactorValue, isLoading: isLoadingFactors } = useEmissionProducts();
  
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

  // Função para mapear tipo de emissão do frontend para nome do produto no banco
  const getProductNameForEmissionType = (emissionType: string, formData: Record<string, any>): string => {
    // Mapeamento de combustíveis para nomes de produtos
    const fuelMapping: Record<string, string> = {
      'gasolina_automotiva': 'Gasolina',
      'gasolina': 'Gasolina',
      'oleo_diesel': 'Diesel',
      'diesel': 'Diesel',
      'etanol_hidratado': 'Etanol',
      'etanol_anidro': 'Etanol',
      'etanol': 'Etanol',
      'glp': 'GLP',
      'gas_natural_seco': 'Gás Natural',
      'gas_natural': 'Gás Natural',
      'biodiesel': 'Biodiesel',
      'oleo_combustivel': 'Óleo Combustível',
      'carvao_mineral': 'Carvão Mineral',
      'carvao_metalurgico_nacional': 'Carvão Mineral',
      'carvao_vapor_6000': 'Carvão Mineral',
      'lenha_comercial': 'Lenha',
      'lenha': 'Lenha',
      'alcatrao': 'Gasolina', // Usar Gasolina como padrão para alcatrão
      // Adicionar mais mapeamentos conforme necessário
    };

    // Para combustão (estacionária ou móvel), buscar o combustível específico
    if (emissionType === 'combustao_estacionaria' || emissionType === 'combustao_movel') {
      const fuelKey = formData.fuel || formData.vehicle || '';
      const mappedFuel = fuelMapping[fuelKey];
      if (mappedFuel) {
        return mappedFuel;
      }
      // Se não encontrou no mapeamento, retornar o valor direto (pode ser o nome já correto)
      return fuelKey || 'Gasolina'; // Fallback para Gasolina
    }

    // Mapeamento direto para outros tipos
    const directMapping: Record<string, string> = {
      // Escopo 1
      'emissoes_fugitivas': formData.gas === 'ch4' ? 'CH4 Fugitivo' : 
                           formData.gas === 'n2o' ? 'N2O Fugitivo' :
                           formData.gas === 'hfc134a' ? 'HFC-134a' :
                           formData.gas === 'sf6' ? 'SF6' : 'CH4 Fugitivo',
      'processos_industriais': formData.gas === 'ch4' ? 'CH4 Industrial' :
                              formData.gas === 'n2o' ? 'N2O Industrial' :
                              'CO2 Industrial',
      'atividades_agricultura': formData.gas === 'ch4' ? 'CH4 Agricultura' :
                               formData.gas === 'n2o' ? 'N2O Agricultura' :
                               'CO2 Agricultura',
      'mudancas_uso_solo': 'Mudança Uso Solo',
      'residuos_solidos': formData.treatment === 'aterro' ? 'Resíduos Aterro' :
                         formData.treatment === 'compostagem' ? 'Resíduos Compostagem' :
                         'Resíduos Incineração',
      'efluentes': 'Efluentes',
      
      // Escopo 2
      'compra_energia_eletrica': 'Energia Elétrica Brasil',
      'perdas_energia': 'Perdas Energia',
      'compra_energia_termica': 'Energia Térmica Vapor',
      
      // Escopo 3
      'transporte_distribuicao': formData.transportType === 'aereo' ? 'Viagens Aéreo' :
                                formData.transportType === 'ferroviario' ? 'Viagens Ferroviário' :
                                'Transporte Distribuição',
      'residuos_solidos_gerados': formData.treatment === 'aterro' ? 'Resíduos Gerados Aterro' :
                                 formData.treatment === 'reciclagem' ? 'Resíduos Gerados Reciclagem' :
                                 'Resíduos Gerados Compostagem',
      'efluentes_gerados': 'Efluentes Gerados',
      'viagens_negocios': formData.transportType === 'aereo' ? 'Viagens Aéreo' :
                         formData.transportType === 'ferroviario' ? 'Viagens Ferroviário' :
                         'Viagens Rodoviário',
    };

    return directMapping[emissionType] || emissionType;
  };

  // Função para extrair a quantidade correta baseada no tipo de emissão e seus campos
  const extractQuantity = (emissionType: string, formData: Record<string, string | number | boolean>): number => {
    // Mapeamento de tipos de emissão para seus campos de quantidade
    const quantityFieldMap: Record<string, string[]> = {
      // Escopo 1
      'combustao_movel': ['quantity', 'annualConsumption'],
      'combustao_estacionaria': ['quantity', 'annualConsumption'],
      'emissoes_fugitivas': ['newUnitsLoad', 'newUnitsCapacity', 'existingUnitsRecharge', 'discardedUnitsCapacity', 'discardedUnitsRecovered'],
      'processos_industriais': ['quantity', 'annualProduction'],
      'atividades_agricultura': ['quantity', 'annualProduction'],
      'mudancas_uso_solo': ['area', 'quantity'],
      'residuos_solidos': ['mass', 'quantity', 'annualWaste'],
      'efluentes': ['quantity', 'annualVolume'],
      
      // Escopo 2
      'compra_energia_eletrica': ['annualPurchase'],
      'perdas_energia': ['annualLoss'],
      'compra_energia_termica': ['valuePurchased', 'annualConsumption'],
      
      // Escopo 3
      'transporte_distribuicao': ['annualConsumption', 'annualDistance', 'annualWeight'],
      'residuos_solidos_gerados': ['mass', 'annualWaste'],
      'efluentes_gerados': ['quantity', 'annualVolume'],
      'viagens_negocios': ['annualConsumption', 'annualDistance'],
    };

    const possibleFields = quantityFieldMap[emissionType] || ['quantity'];
    
    // Caso especial: emissões fugitivas precisam somar todos os campos
    if (emissionType === 'emissoes_fugitivas') {
      const fields = ['newUnitsLoad', 'newUnitsCapacity', 'existingUnitsRecharge', 'discardedUnitsCapacity', 'discardedUnitsRecovered'];
      let total = 0;
      
      for (const field of fields) {
        if (formData[field] !== undefined && formData[field] !== null && formData[field] !== '') {
          const value = typeof formData[field] === 'number' 
            ? formData[field] 
            : parseFloat(String(formData[field]));
          
          if (!isNaN(value) && value > 0) {
            total += value;
          }
        }
      }
      
      return total;
    }
    
    // Para outros tipos, tentar extrair quantidade de qualquer um dos campos possíveis
    for (const field of possibleFields) {
      if (formData[field] !== undefined && formData[field] !== null && formData[field] !== '') {
        const value = typeof formData[field] === 'number' 
          ? formData[field] 
          : parseFloat(String(formData[field]));
        
        if (!isNaN(value) && value > 0) {
          return value;
        }
      }
    }
    
    return 0;
  };

  const updateEmission = (scope: keyof CalculatorData, emissionId: string, emissionData: Record<string, string | number | boolean>) => {
    setData(prev => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        emissions: prev[scope].emissions.map(emission => {
          if (emission.id === emissionId) {
            // Extrair quantidade baseada no tipo de emissão
            const quantity = extractQuantity(emission.type, emissionData);
            
            // Buscar fator de emissão real do banco
            const productName = getProductNameForEmissionType(emission.type, emissionData);
            const emissionFactor = getFactorValue(productName) || 2.5;
            
            const calculatedCo2e = quantity > 0 ? quantity * emissionFactor : 0;

            console.log(`🔢 Calculando: ${productName} | Quantidade: ${quantity} | Fator: ${emissionFactor} | CO2e: ${calculatedCo2e}`);

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
              quantity: extractQuantity(emission.type, emission.fields || {}),
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
              quantity: extractQuantity(emission.type, emission.fields || {}),
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
              quantity: extractQuantity(emission.type, emission.fields || {}),
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
      
      // Atualizar os valores calculados no contexto com os resultados do backend
      if (result?.scopeBreakdown) {
        const breakdown = result.scopeBreakdown as Record<string, any>;
        
        setData(prev => {
          const updatedData = { ...prev };
          
          // O scopeBreakdown agora é um objeto: { scope1: {...}, scope2: {...}, scope3: {...} }
          Object.entries(breakdown).forEach(([scopeKey, scopeData]) => {
            const dataKey = scopeKey as keyof CalculatorData;
            
            if (scopeData?.emissions && Array.isArray(scopeData.emissions) && updatedData[dataKey]) {
              updatedData[dataKey] = {
                ...updatedData[dataKey],
                emissions: updatedData[dataKey].emissions.map((emission, index) => {
                  const backendEmission = scopeData.emissions[index];
                  if (backendEmission?.calculatedCo2e !== undefined) {
                    return {
                      ...emission,
                      calculatedCo2e: backendEmission.calculatedCo2e
                    };
                  }
                  return emission;
                })
              };
            }
          });
          
          return updatedData;
        });
      }
      
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
