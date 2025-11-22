"use client"

import Header from "@/components/transactions/Header";
import HistoryTable from "@/components/transactions/HistoryTable";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Transactions() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            setTimeout(() => {
                router.push("/login");
            }, 5000);
            return;
        }

        const companyId = user?.id;

        if (!companyId) {
            setError("É necessário estar logado para acessar esta página.");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/history/${companyId}`,
                { credentials: "include" }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao buscar histórico.");

            setOrders(data.data);
            }
            catch (err: any) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, [isLoading, isAuthenticated, user]);

    if (!isLoading && !isAuthenticated) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-red-500">
                    É necessário realizar login para acessar esta página.
                </p>

                <p>
                    Você será redirecionado para a página de login.
                </p>
            </main>
        );
    }

    if (isLoading) {
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

            <HistoryTable orders={orders}/>
        </main>
    );
}