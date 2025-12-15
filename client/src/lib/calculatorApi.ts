const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ScopeEmission {
  calculatedCo2e?: number;
  [key: string]: unknown;
}

export interface ScopeBreakdownItem {
  emissions: ScopeEmission[];
  totalCo2e: number;
  emissionsCount: number;
}

export interface EmissionInput {
  type: string;
  emissionProductId: string;
  quantity: number;
  emissionType: string;
  scope: number;
  formData: Record<string, unknown>;
  description?: string;
}

export interface InventoryInput {
  companyId: string;
  year: number;
  month?: number;
  scopes: {
    [key: string]: { emissions: EmissionInput[] };
  };
}

export interface InventoryResult {
  emissionId?: string;
  inventoryId?: string; // Mantido para compatibilidade
  companyId?: string;
  year?: number;
  description?: string;
  totalEmissions: number;
  totalEmissionsCount?: number;
  emissionsCount?: number; // Mantido para compatibilidade
  scope1Total?: number;
  scope2Total?: number;
  scope3Total?: number;
  scopeBreakdown?: {
    scope1?: ScopeBreakdownItem;
    scope2?: ScopeBreakdownItem;
    scope3?: ScopeBreakdownItem;
  };
}

export interface InventoryEmission {
  id: string;
  year: number;
  description: string;
  totalCo2e: number;
  scope1_total: number;
  scope2_total: number;
  scope3_total: number;
  calculator_data: Record<string, unknown>;
  createdAt: string;
}

export interface InventoryByYear {
  year: number;
  totalCo2e: number;
  emissions: InventoryEmission[];
}

export interface InventoryResponse {
  company: Company;
  inventories: InventoryByYear[];
}

export interface EmissionData {
  id: string;
  co2e: number;
  type: string;
  description?: string;
}

export interface ScopeResult {
  scope: number;
  totalCo2e: number;
  emissionsCount: number;
  emissions: EmissionData[];
}

export interface Company {
  id: string;
  email: string;
}

export interface EmissionsSummary {
  company: Company;
  summaryByYear: {
    year: number;
    inventoryId: string;
    total: number;
    scope1: number;
    scope2: number;
    scope3: number;
    count: number;
  }[];
}

class CalculatorAPI {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/api/calculator${endpoint}`;
    console.log('Fazendo requisição para:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.error || error.message || errorMessage;
      } catch {
        errorMessage = `${errorMessage}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async calculateInventory(data: InventoryInput): Promise<InventoryResult> {
    const result = await this.fetchAPI('/calculate-inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return result.data;
  }

  async calculateTotal(companyId: string, year: number): Promise<number> {
    const result = await this.fetchAPI(`/calculate-total?companyId=${companyId}&year=${year}`);
    return result.totalCo2e;
  }

  async getInventory(companyId: string, year?: number): Promise<InventoryResponse> {
    const yearParam = year ? `&year=${year}` : '';
    return this.fetchAPI(`/inventory?companyId=${companyId}${yearParam}`);
  }

  async getInventoryData(inventoryId: string) : Promise<EmissionData> {
    return this.fetchAPI(`/inventory-by-uuid?uuid=${inventoryId}`);
  }

  async calculateScopeTotal(companyId: string, year: number, scope: number): Promise<ScopeResult> {
    return this.fetchAPI(`/calculate-scope-total?companyId=${companyId}&year=${year}&scope=${scope}`);
  }

  async getEmissionsByType(companyId: string, emissionType: string, year?: number): Promise<unknown> {
    const yearParam = year ? `&year=${year}` : '';
    return this.fetchAPI(`/emissions-by-type?companyId=${companyId}&emissionType=${emissionType}${yearParam}`);
  }

  async getEmissionsSummary(companyId: string): Promise<EmissionsSummary> {
    return this.fetchAPI(`/emissions-summary?companyId=${companyId}`);
  }

  async getEmissionFactors(): Promise<unknown> {
    const url = `${API_BASE_URL}/api/emission-products`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar fatores de emissão');
    }
    return response.json();
  }

  async deleteEmission(emissionId: string) {
    return this.fetchAPI(`/delete-emission/${emissionId}`, {
      method: 'DELETE',
    });
  }
}

export const calculatorAPI = new CalculatorAPI();