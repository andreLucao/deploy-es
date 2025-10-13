import request from "supertest";
import app from "../src/app";

// Mock do Supabase
jest.mock("../src/lib/supabaseClient", () => {
  const mockReturnThis = jest.fn().mockReturnThis();
  return {
    supabase: {
      from: jest.fn(() => ({
        select: mockReturnThis,
        in: mockReturnThis,
        gte: mockReturnThis,
        lte: mockReturnThis,
        order: mockReturnThis,
        range: mockReturnThis,
      })),
    },
  };
});

import { supabase } from "../src/lib/supabaseClient";


const mockSupabaseResponse = (data: any, error: any = null, count = 2) => {
  (supabase.from as jest.Mock).mockReturnValueOnce({
    select: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnValueOnce({
      data,
      error,
      count,
    }),
  });
};

describe("GET /api/products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve retornar lista de produtos com sucesso", async () => {
    const mockData = [
      {
        id: 1,
        title: "Crédito Verde",
        description: "Produto ambiental",
        price: 150,
        credit_type: "CBE",
        certification_type: "Verificado",
      },
      {
        id: 2,
        title: "Crédito Azul",
        description: "Produto oceânico",
        price: 300,
        credit_type: "CBE",
        certification_type: "Outro",
      },
    ];

    mockSupabaseResponse(mockData);

    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body.produtos).toHaveLength(2);
    expect(res.body.produtos[0]).toHaveProperty("titulo");
  });

  test("Deve retornar erro 500 se Supabase falhar", async () => {
    mockSupabaseResponse(null, { message: "Erro interno" });

    const res = await request(app).get("/api/products");

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Erro interno");
  });

  test("Deve aplicar filtros corretamente", async () => {
    const filtro = JSON.stringify({
      tipoMercado: ["CBE"],
      tipoCertificado: ["Verificado"],
      valorMin: 100,
      valorMax: 500,
    });

    mockSupabaseResponse([]);

    const res = await request(app).get(`/api/products?filtro=${encodeURIComponent(filtro)}`);

    expect(res.status).toBe(200);
    expect(supabase.from).toHaveBeenCalledWith("ad_product");
  });

  test("Deve ordenar por preço crescente quando ordenacao = precoAsc", async () => {
    mockSupabaseResponse([]);

    const res = await request(app).get("/api/products?ordenacao=precoAsc");

    expect(res.status).toBe(200);
    // Verifica se o mock chamou a função order() com ascending: true
    const mockFrom = (supabase.from as jest.Mock).mock.results[0].value;
    expect(mockFrom.order).toHaveBeenCalledWith("price", { ascending: true });
  });

  test("Deve ordenar por preço decrescente quando ordenacao = precoDesc", async () => {
    mockSupabaseResponse([]);

    const res = await request(app).get("/api/products?ordenacao=precoDesc");

    expect(res.status).toBe(200);
    const mockFrom = (supabase.from as jest.Mock).mock.results[0].value;
    expect(mockFrom.order).toHaveBeenCalledWith("price", { ascending: false });
  });

  test("Deve aplicar paginação corretamente", async () => {
    mockSupabaseResponse([]);

    const res = await request(app).get("/api/products?pagina=2&limite=8");

    expect(res.status).toBe(200);
    const mockFrom = (supabase.from as jest.Mock).mock.results[0].value;
    expect(mockFrom.range).toHaveBeenCalledWith(8, 15);
  });
});
