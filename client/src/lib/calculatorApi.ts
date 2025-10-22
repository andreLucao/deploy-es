const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface EmissionInput {
  type: string;
  emissionProductId: string;
  quantity: number;
  emissionType: string;
  scope: number;
  formData: any;
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
  inventoryId: string;
  totalEmissions: number;
  emissionsCount: number;
  scopeBreakdown?: { scope: number; total: number; count: number }[];
}

export interface ScopeResult {
  scope: number;
  totalCo2e: number;
  emissionsCount: number;
  emissions: any[];
}

export interface EmissionsSummary {
  company: any;
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

  async getInventory(companyId: string, year?: number) {
    const yearParam = year ? `&year=${year}` : '';
    return this.fetchAPI(`/inventory?companyId=${companyId}${yearParam}`);
  }

  async calculateScopeTotal(companyId: string, year: number, scope: number): Promise<ScopeResult> {
    return this.fetchAPI(`/calculate-scope-total?companyId=${companyId}&year=${year}&scope=${scope}`);
  }

  async getEmissionsByType(companyId: string, emissionType: string, year?: number) {
    const yearParam = year ? `&year=${year}` : '';
    return this.fetchAPI(`/emissions-by-type?companyId=${companyId}&emissionType=${emissionType}${yearParam}`);
  }

  async getEmissionsSummary(companyId: string): Promise<EmissionsSummary> {
    return this.fetchAPI(`/emissions-summary?companyId=${companyId}`);
  }

  async deleteEmission(emissionId: string) {
    return this.fetchAPI(`/delete-emission/${emissionId}`, {
      method: 'DELETE',
    });
  }
}

export const calculatorAPI = new CalculatorAPI();