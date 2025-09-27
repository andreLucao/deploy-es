"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface EmissionData {
  id: string;
  description: string;
  type: string;
  fields: Record<string, any>;
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
  data: CalculatorData;
  updateEmission: (scope: keyof CalculatorData, emissionId: string, emissionData: EmissionData) => void;
  addEmission: (scope: keyof CalculatorData, emissionType: string) => void;
  removeEmission: (scope: keyof CalculatorData, emissionId: string) => void;
  clearScope: (scope: keyof CalculatorData) => void;
  clearAllData: () => void;
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
  const [data, setData] = useState<CalculatorData>({
    scope1: { emissions: [] },
    scope2: { emissions: [] },
    scope3: { emissions: [] }
  });


  const updateEmission = (scope: keyof CalculatorData, emissionId: string, emissionData: any) => {
    setData(prev => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        emissions: prev[scope].emissions.map(emission =>
          emission.id === emissionId ? { ...emission, fields: emissionData } : emission
        )
      }
    }));
  };

  const addEmission = (scope: keyof CalculatorData, emissionType: string) => {
    const newEmission: EmissionData = {
      id: `${Date.now()}-${Math.random()}`,
      description: '',
      type: emissionType,
      fields: {}
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

  return (
    <CalculatorContext.Provider value={{
      data,
      updateEmission,
      addEmission,
      removeEmission,
      clearScope,
      clearAllData
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};
