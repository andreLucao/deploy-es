"use client";

import { useEmissionProducts } from '@/hooks/useEmissionProducts';
import { Loader2 } from 'lucide-react';

interface DynamicEmissionSelectorProps {
  scope: 1 | 2 | 3;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Componente que busca produtos de emissão do banco de dados
 * e os exibe em um select dinâmico
 */
export function DynamicEmissionSelector({ 
  scope, 
  value, 
  onChange,
  disabled = false 
}: DynamicEmissionSelectorProps) {
  const { 
    productsByScope, 
    isLoading, 
    error,
    formatProductsForSelect 
  } = useEmissionProducts();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        <span className="text-sm text-gray-600">Carregando tipos de emissão...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 border border-red-200 rounded-lg bg-red-50">
        <p className="text-sm text-red-600">
          ⚠️ Erro ao carregar tipos de emissão. Usando lista padrão.
        </p>
      </div>
    );
  }

  const options = formatProductsForSelect(scope);

  if (options.length === 0) {
    return (
      <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
        <p className="text-sm text-yellow-700">
          ⚠️ Nenhum produto encontrado para este escopo.
        </p>
      </div>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F70] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      <option value="">Selecione o tipo de emissão</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label} - {option.factor} kg CO₂e/{option.unit}
        </option>
      ))}
    </select>
  );
}

/**
 * Informação sobre fatores de emissão
 */
interface EmissionFactorInfoProps {
  productName: string;
}

export function EmissionFactorInfo({ productName }: EmissionFactorInfoProps) {
  const { getProductByName, isLoading } = useEmissionProducts();

  if (isLoading || !productName) return null;

  const product = getProductByName(productName);
  
  if (!product || !product.emissionFactors || product.emissionFactors.length === 0) {
    return (
      <div className="text-xs text-gray-500 mt-1">
        ⚠️ Fator de emissão não encontrado (usando padrão)
      </div>
    );
  }

  const factor = product.emissionFactors[0];

  return (
    <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
      <span className="inline-flex items-center gap-1">
        <span className="font-semibold text-[#008F70]">{factor.factorValue}</span>
        <span>kg CO₂e/{product.unit}</span>
      </span>
      {factor.region && (
        <span className="text-gray-400">
          • {factor.region}
        </span>
      )}
      {factor.year && (
        <span className="text-gray-400">
          • {factor.year}
        </span>
      )}
    </div>
  );
}
