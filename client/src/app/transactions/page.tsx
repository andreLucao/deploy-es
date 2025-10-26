import Header from "@/components/transactions/Header";

const transactions = [
    { date: "25/10/2025", description: "Compra 1", type: "compra", value: 40 },
    { date: "25/10/2025", description: "Crédito 1", type: "venda", value: 50 },
    { date: "25/10/2025", description: "Crédito 2", type: "venda", value: 10.50 }
]

export default function Transactions() {

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
                        <th className="p-3 w-[15%]">Data</th>
                        <th className="p-3 w-[50%]">Descrição</th>
                        <th className="p-3 w-[17.5%] text-left">Débito</th>
                        <th className="p-3 w-[17.5%] text-left">Crédito</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((t, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-green-100" : "bg-gray-100"} border-b`}
                        >
                            <td className="p-3 text-center">{t.date}</td>
                            <td className="p-3 text-center">{t.description}</td>

                            {/* Se compra, mostra débito */}
                            <td className="p-3 text-red-500 text-left">
                                {t.type === "compra" ? `-R$${t.value.toFixed(2)}` : ""}
                            </td>

                            {/* Se venda, mostra crédito */}
                            <td className="p-3 text-green-500 text-left">
                                {t.type === "venda" ? `+R$${t.value.toFixed(2)}` : ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}