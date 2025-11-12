"use client";

import { useState, useEffect } from 'react';
import { calculatorAPI } from '@/lib/calculatorApi';

export interface EmissionProduct {
  id: string;
  name: string;
  unit: string;
  scope: string;
  emissionFactors: Array<{
    id: string;
    factorValue: number;
    region: string;
    year: number;
  }>;
}

export interface EmissionProductsByScope {
  scope1: EmissionProduct[];
  scope2: EmissionProduct[];
  scope3: EmissionProduct[];
}

/**
 * Hook para buscar produtos de emissão do banco de dados
 * Substitui a lista hardcoded de emissionData.ts
 */
export function useEmissionProducts() {
  const [products, setProducts] = useState<EmissionProduct[]>([]);
  const [productsByScope, setProductsByScope] = useState<EmissionProductsByScope>({
    scope1: [],
    scope2: [],
    scope3: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await calculatorAPI.getEmissionFactors() as EmissionProduct[];
        
        // Organizar produtos por escopo
        const byScope: EmissionProductsByScope = {
          scope1: [],
          scope2: [],
          scope3: []
        };

        data.forEach((product: EmissionProduct) => {
          if (product.scope === '1') {
            byScope.scope1.push(product);
          } else if (product.scope === '2') {
            byScope.scope2.push(product);
          } else if (product.scope === '3') {
            byScope.scope3.push(product);
          }
        });

        setProducts(data);
        setProductsByScope(byScope);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos de emissão';
        setError(errorMessage);
        console.error('❌ Erro ao buscar produtos:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  /**
   * Retorna produtos de um escopo específico
   */
  const getProductsByScope = (scope: 1 | 2 | 3): EmissionProduct[] => {
    return productsByScope[`scope${scope}` as keyof EmissionProductsByScope] || [];
  };

  /**
   * Busca um produto pelo nome
   */
  const getProductByName = (name: string): EmissionProduct | undefined => {
    return products.find(p => p.name === name || p.name.toLowerCase() === name.toLowerCase());
  };

  /**
   * Retorna o fator de emissão mais recente para um produto
   */
  const getFactorValue = (productName: string, region?: string): number => {
    const product = getProductByName(productName);
    if (!product || !product.emissionFactors || product.emissionFactors.length === 0) {
      console.warn(`⚠️ Fator não encontrado para "${productName}", usando padrão 2.5`);
      return 2.5;
    }

    // Filtrar por região se especificado
    let factors = product.emissionFactors;
    if (region) {
      const regionalFactors = factors.filter(f => f.region === region);
      if (regionalFactors.length > 0) {
        factors = regionalFactors;
      }
    }

    // Retornar fator mais recente
    const sortedFactors = [...factors].sort((a, b) => (b.year || 0) - (a.year || 0));
    return sortedFactors[0].factorValue;
  };

  /**
   * Formata produtos para uso em select/dropdown
   */
  const formatProductsForSelect = (scope: 1 | 2 | 3) => {
    return getProductsByScope(scope).map(product => ({
      value: product.name,
      label: `${product.name} (${product.unit})`,
      unit: product.unit,
      factor: product.emissionFactors[0]?.factorValue || 2.5
    }));
  };

  return {
    products,
    productsByScope,
    isLoading,
    error,
    getProductsByScope,
    getProductByName,
    getFactorValue,
    formatProductsForSelect
  };
}
