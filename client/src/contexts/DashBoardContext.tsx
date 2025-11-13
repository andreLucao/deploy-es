"use client";

import React, { createContext, useContext, useState } from "react";

interface EmissionRecord {
  totalCo2e: number;
  scope1_total: number;
  scope2_total: number;
  scope3_total: number;
  description: string;
  year: number;
}

interface OrderItem {
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

interface DashboardSummary {
  companyId: string;
  emissionsData: {
    totalEmittedCo2e: number;
    breakdownByScope: {
      scope1: number;
      scope2: number;
      scope3: number;
    };
    emissionRecords: EmissionRecord[];
  };
  transactionData: {
    totalCreditsPurchased: number;
    totalSpentBrutto: number;
    lastOrders: Order[];
  };
}


// Contexto

interface DashboardContextType {
  data: DashboardSummary | null;
  loading: boolean;
  error: string | null;
  refreshData: (companyId: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);


// Provider


export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async (companyId: string) => {
    try {
      setLoading(true);
      setError(null);

      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports/dashboard-summary?companyId=${companyId}`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result: DashboardSummary = await response.json();
      setData(result);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
      setError("Erro ao carregar dados do dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider value={{ data, loading, error, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Hook personalizado 

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard deve ser usado dentro de DashboardProvider");
  }
  return context;
};
