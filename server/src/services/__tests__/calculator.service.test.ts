const mockPrisma: any = {
   // Mock para a transação (tx)
   $transaction: jest.fn((callback) => callback(mockPrisma)),

   // Mocks de modelos que serão usados no Service
   emissionInventory: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
   },
   emissionFactor: {
      findFirst: jest.fn(),
   },
   emission: {
      upsert: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
   },
   company: {
      findUnique: jest.fn(),
   },
};

jest.mock("../../config/database", () => ({
   __esModule: true,
   default: mockPrisma,
}));

import { CalculatorService } from "../calculator.service";

const calculatorService = new CalculatorService();

// Dados de entrada mockados, simulando o formulário
const MOCK_COMPANY_ID = "comp-123";
const MOCK_PRODUCT_ID = "prod-A";
const MOCK_FACTOR = 0.5;
const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;

const MOCK_INPUT_DATA = {
   companyId: MOCK_COMPANY_ID,
   year: CURRENT_YEAR,
   scopes: {
      "1": {
         emissions: [
            {
               emissionProductId: MOCK_PRODUCT_ID,
               quantity: 100, // 100 * 0.5 = 50 CO2e
               scope: 1,
               emissionType: "Eletricidade",
               description: "Luz",
               formData: { consumo: 100 } as any,
            },
         ],
      },
   },
};

describe("CalculatorService (Inventory Logic)", () => {
   beforeEach(() => {
      // Limpar todos os mocks antes de cada teste
      jest.clearAllMocks();

      // Mocks de entidades obrigatórias (Company e Fator de Emissão)
      mockPrisma.company.findUnique.mockResolvedValue({ id: MOCK_COMPANY_ID });
      mockPrisma.emissionFactor.findFirst.mockResolvedValue({
         factorValue: MOCK_FACTOR,
      });

      // Mock do upsert de Inventário para retornar um ID (Container)
      mockPrisma.emissionInventory.upsert.mockResolvedValue({ id: "inv-456" });

      // Mock do upsert de Emissão para retornar o item salvo
      mockPrisma.emission.upsert.mockResolvedValue({
         id: "em-789",
         calculatedCo2e: 50,
      });
   });

   // TESTE Criação de Inventário e Cálculos
   it("should create an Inventory and calculate CO2e for all emissions within a transaction", async () => {
      const result = await calculatorService.calculateAndSaveInventory(
         MOCK_INPUT_DATA
      );

      // Verificação da Transação
      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);

      // Verificação da Criação do Inventário (upsert)
      expect(mockPrisma.emissionInventory.upsert).toHaveBeenCalledTimes(1);
      expect(mockPrisma.emissionInventory.upsert).toHaveBeenCalledWith(
         expect.objectContaining({
            where: {
               companyId_year: {
                  companyId: MOCK_COMPANY_ID,
                  year: CURRENT_YEAR,
               },
            },
            create: expect.objectContaining({
               name: expect.stringContaining(`${CURRENT_YEAR}`),
            }),
         })
      );

      // Verificação da Criação da Emissão (upsert)
      expect(mockPrisma.emission.upsert).toHaveBeenCalledTimes(1);
      const emissionCall = mockPrisma.emission.upsert.mock.calls[0][0];

      // Verifica se a chave única correta foi usada
      expect(emissionCall.where.inventoryId_emissionProductId).toBeDefined();

      // Verifica se o cálculo está correto
      expect(emissionCall.update.calculatedCo2e).toBe(50);

      // Verificação do Retorno
      expect(result.inventoryId).toBe("inv-456");
      expect(result.totalEmissions).toBe(50); // 50 CO2e
      expect(result.emissionsCount).toBe(1);
   });

   // TESTE de tratamento de erro (Fator de Emissão Ausente)
   it("should skip emission if factor is not found and proceed with transaction", async () => {
      // Simula o fator não sendo encontrado para o produto
      mockPrisma.emissionFactor.findFirst.mockResolvedValue(null);

      const result = await calculatorService.calculateAndSaveInventory(
         MOCK_INPUT_DATA
      );

      // Nenhuma emissão deve ter sido salva
      expect(mockPrisma.emission.upsert).not.toHaveBeenCalled();

      // O inventário ainda deve ser criado, e o total deve ser 0
      expect(mockPrisma.emissionInventory.upsert).toHaveBeenCalledTimes(1);
      expect(result.totalEmissions).toBe(0);
      expect(result.emissionsCount).toBe(0);
   });

   // TESTE de tratamento de erro (Empresa Ausente)
   it("should throw an error if Company ID is not found and prevent transaction", async () => {
      // Simula a empresa não sendo encontrada
      mockPrisma.company.findUnique.mockResolvedValue(null);

      // A transação inteira deve ser rejeitada
      await expect(
         calculatorService.calculateAndSaveInventory(MOCK_INPUT_DATA)
      ).rejects.toThrow("Empresa não encontrada");

      // O upsert de Inventário não deve ter sido chamado
      expect(mockPrisma.emissionInventory.upsert).not.toHaveBeenCalled();
   });
});
