"use client"

import Header from "@/components/transactions/Header";
import { useEffect, useState } from "react";

//Teste com lista
const transactions = [
    { date: "25/10/2025", description: "Compra 1", type: "compra", value: 40 },
    { date: "25/10/2025", description: "Crédito 1", type: "venda", value: 50 },
    { date: "25/10/2025", description: "Crédito 2", type: "venda", value: 10.50 }
]

type Order = {
    id: string;
    createdAt: string;
    status: string;
    items: {
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        adProductId: string;
    }[];
};

export default function Transactions() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const companyId = "9c8b0215-b296-4b24-a84e-bcb2548d6ab5"; //Placeholder temporário
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/history/${companyId}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Erro ao buscar histórico.");

                setOrders(data.data);
            }
            catch (err: any) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <p>Carregando histórico...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-red-500">Erro: {error}</p>
            </main>
        );
    }

    return (
        <main 
            className="bg-[#efefef] w-full min-h-screen flex flex-col"
            style={{
                background: `linear-gradient(
                    180deg,
                    rgba(0, 46, 52, 100%) 100px,
                    rgb(0, 143, 112) 250px,
                    rgba(0, 224, 127, 100%) 350px,
                    rgba(0, 224, 127, 100%) 450px,
                    rgb(239, 239, 239, 100%) 770px
                )`
            }}
        >
            <Header />

            <h1 className="text-white text-3xl font-semibold text-center mt-10 tracking-wide drop-shadow-md">
                Histórico de transações
            </h1>            

            <table className="mx-auto w-[97%] border-collapse shadow-md rounded-lg overflow-hidden mt-8">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                    <tr>
                        <th className="p-3">Data</th>
                        <th className="p-3">Nome do produto</th>
                        <th className="p-3">Valor</th>
                        <th className="p-3">Tipo</th>
                        <th className="p-3">Quantidade</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center text-gray-500 p-6 bg-gray-50"
                            >
                                Nenhuma transação encontrada para esta empresa.
                            </td>
                        </tr>
                    
                    ) :  (
                        orders.map((order, index) => {
                            const date = new Date(order.createdAt).toLocaleDateString("pt-BR");

                            return order.items.map((item, i) => (
                                <tr
                                    key={`${order.id}-${i}`}
                                    className={`${(index + i) % 2 === 0 ? "bg-green-100" : "bg-gray-100"} border-b`}
                                >
                                    <td className="p-3 text-center">{date}</td>
                                    <td className="p-3 text-center">Produto {item.adProductId}</td>

                                    <td className="p-3 text-red-500 text-right">-40,00</td>
                                    <td className="p-3 text-green-500 text-right">+R${item.totalPrice.toFixed(2)}</td>
                                </tr>
                            ));
                        })
                    )}
                </tbody>
            </table>
        </main>
    );
}