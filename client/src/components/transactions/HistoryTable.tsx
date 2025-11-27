'use client';

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

export default function TransactionsTable({ orders }: { orders: Order[] }) {
    return (
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
                ) : (
                    orders.map((order, index) => {
                        const date = new Date(order.createdAt).toLocaleDateString("pt-BR");

                        return order.items.map((item, i) => (
                            <tr
                                key={`${order.id}-${i}`}
                                className={`${(index + i) % 2 === 0 ? "bg-green-100" : "bg-gray-100"} border-b`}
                            >
                                <td className="p-3 text-center">{date}</td>
                                <td className="p-3 text-center">{item.adProductId}</td>
                                <td className="p-3 text-center">{item.totalPrice.toFixed(2)}</td>
                                <td className="p-3 text-center">{item.quantity}</td>
                            </tr>
                        ));
                    })
                )}
            </tbody>
        </table>
    );
}