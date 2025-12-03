import { useEffect, useState } from "react";

export function useTransactionHistory(companyId?: string) {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!companyId) {
                setError("Não foi informada a empresa.");
                setIsLoading(false);
                
                return;
            }

            try {
                const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/history/${companyId}`,
                { credentials: "include" }
                );

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Erro ao buscar histórico.");

                setOrders(data.data);
            }
            catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
                setError(errorMessage);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [companyId]);

    return {
        orders,
        error,
        isLoading,
    };
}