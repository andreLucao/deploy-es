'use client';

import { DashboardProvider, DashboardContext } from "@/contexts/DashBoardContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import Header from "@/components/marketplace/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend,ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


function DashboardContent() {
  const dashboardCtx = useContext(DashboardContext);

  const authCtx = useAuth();

  useEffect(() => {
    if (!dashboardCtx || !authCtx?.user?.id) {
      return;
    }

    const companyId = authCtx.user.id;
    dashboardCtx.refreshData(companyId);

  }, [dashboardCtx, authCtx]);

  if (!dashboardCtx || !authCtx) {
    return <div>Erro: Contextos não carregados.</div>;
  }

  const { data, loading, error } = dashboardCtx;
  const { user } = authCtx;

  // Lida com carregamento
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg">Carregando dados do dashboard...</p>
      </div>
    );
  }

  // Lida com o erro
  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg text-red-500">Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  // Lida com dados vazios
  if (!data) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg">Nenhum dado para exibir.</p>
      </div>
    );
  }

  // Preparação/formatação dos dados
  const totalGasto = (data.transactionData.totalSpentBrutto / 100).toLocaleString('pt-BR', { //
    style: 'currency',
    currency: 'BRL',
  });
  // A API envia em kg, convertemos pra toneladas
  const totalEmissoes = (data.emissionsData.totalEmittedCo2e / 1000).toFixed(2); //
  const totalCreditos = data.transactionData.totalCreditsPurchased; //

  // Dados para o donut chart
  // Convertendo kg para toneladas
  const breakdownData = [
    {
      name: "Escopo 1",
      value: parseFloat((data.emissionsData.breakdownByScope.scope1 / 1000).toFixed(2)),
    },
    {
      name: "Escopo 2",
      value: parseFloat((data.emissionsData.breakdownByScope.scope2 / 1000).toFixed(2)),
    },
    {
      name: "Escopo 3",
      value: parseFloat((data.emissionsData.breakdownByScope.scope3 / 1000).toFixed(2)),
    },
  ];

  const COLORS = ["#FF6384", "#ffc83cff", "#36A2EB"];

  // Dados para o gráfico de barras (Histórico)
  // Agrupa e soma os valores por ano (ex: { '2024': 150.5, '2025': 340.2 })
  const emissionsByYear = data.emissionsData.emissionRecords.reduce((acc, record) => { //
    const year = record.year;
    const emissionsInTonnes = record.totalCo2e / 1000; // Converte kg para toneladas
    
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year] += emissionsInTonnes;
    
    return acc;
  }, {} as Record<string, number>);

  // Converte o objeto para o formato do Recharts e ordena por ano
  const historyData = Object.keys(emissionsByYear)
    .map(year => ({
      Ano: year, // Eixo X
      'Emissão (tCO₂e)': parseFloat(emissionsByYear[year].toFixed(2)) // Eixo Y
    }))
    .sort((a, b) => parseInt(a.Ano) - parseInt(b.Ano)); // Ordena do mais antigo pro mais novo

  // Dados para a tabela (Últimos Pedidos)
  const orderData = data.transactionData.lastOrders.map((order) => ({ //
    // Pega só os 8 primeiros caracteres do ID para a tabela
    id: order.id.substring(0, 8),
    // Formata a data para o padrão BR
    data: new Date(order.createdAt).toLocaleDateString("pt-BR"),
    status: order.status,
    // Converte centavos para Reais (BRL)
    total: (order.totalAmount / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
  }));


  // Renderiza os KPIs
  return (
    <main className="flex-1 p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Meu Painel</h1>

      {/* Grid dos KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Total de Emissões */}
        <Card> {/* */}
          <CardHeader>
            <CardTitle>Total de Emissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {totalEmissoes} tCO₂e
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Créditos Comprados */}
        <Card>
          <CardHeader>
            <CardTitle>Créditos Comprados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {totalCreditos} tCO₂e
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Gasto Total */}
        <Card>
          <CardHeader>
            <CardTitle>Total Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalGasto}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Grid dos gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Card do donut chart */}
        <Card>
          <CardHeader>
            <CardTitle>Emissões por Escopo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdownData}
                    cx="50%" // Posição X (centro)
                    cy="50%" // Posição Y (centro)
                    labelLine={false}
                    outerRadius={100} // Tamanho do gráfico
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => `${entry.value} tCO₂e`}
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} tCO₂e`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Emissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Ano" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} tCO₂e`} />
                  <Legend />
                  <Bar dataKey="Emissão (tCO₂e)" fill="#FF6384" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      
      </div>

      {/* Card da tabela de pedidos recentes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Últimos Pedidos de Créditos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID do Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loop nos dados formatados */}
              {orderData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.data}</TableCell>
                  <TableCell>
                    {/* Badge simples para o status */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </main>
  );
}


export default function DashboardPage() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen custom-gradient">
        <Header />
        <div className="flex-1 flex flex-col container-full">
          <DashboardProvider>
            <DashboardContent />
          </DashboardProvider>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
