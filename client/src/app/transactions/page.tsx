'use client';

import Header from "@/components/transactions/Header";
import HistoryTable from "@/components/transactions/HistoryTable";
import { useTransactionHistory } from "@/hooks/useTransactionHistory"

export default function Transactions() {
    const { orders, error, isLoading, isAuthenticated } = useTransactionHistory();

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