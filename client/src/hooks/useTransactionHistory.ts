import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function useTransactionHistory(companyId?: string) {
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

    return {
        orders,
        error,
        isLoading,
        isAuthenticated
    };
}