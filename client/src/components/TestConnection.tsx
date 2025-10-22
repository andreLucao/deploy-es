'use client';

import { useState } from 'react';
import { calculatorAPI } from '@/lib/calculatorApi';

export default function TestConnection() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setResult('');
    
    try {
      // Teste simples: calcular total para uma empresa inexistente
      const total = await calculatorAPI.calculateTotal('test-company', 2024);
      setResult(`✅ Conexão OK! Total: ${total} tCO2e`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setResult(`❌ Erro na conexão: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testInventory = async () => {
    setIsLoading(true);
    setResult('');
    
    try {
      const testData = {
        companyId: 'test-company-' + Date.now(),
        year: 2024,
        scopes: {
          '1': {
            emissions: [{
              type: 'combustivel',
              emissionProductId: 'test-product',
              quantity: 100,
              emissionType: 'gasolina',
              scope: 1,
              formData: { test: true },
              description: 'Teste de conexão'
            }]
          }
        }
      };
      
      const result = await calculatorAPI.calculateInventory(testData);
      setResult(`✅ Inventário salvo! Total: ${result.totalEmissions} tCO2e, Emissões: ${result.emissionsCount}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setResult(`❌ Erro ao salvar inventário: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🧪 Teste de Conexão Backend ↔ Frontend
      </h3>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Testando...' : 'Testar Conexão'}
        </button>
        
        <button
          onClick={testInventory}
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Testando...' : 'Testar Inventário'}
        </button>
      </div>
      
      {result && (
        <div className={`p-3 rounded ${result.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <pre className="text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
}