import { FocusCards } from "../ui/focus-cards";

export default function Solucoes() {
    const cards = [
        {
            title: "Criação de Relatórios Automatizados",
            src: 'imgs/card1.png',
        },
        {
            title: "Dashboard de Inventário de Emissões",
            src: 'imgs/card5.png'
        },
        {
            title:"Marketplace de Créditos de Carbono",
            src: "imgs/card4.png"
        },
    ]


    return (
        <section id="solucoes">
            <div className="flex justify-center flex-col items-center bg-[#efefef] ">
                <h1 className="mb-15 text-center text-black text-5xl font-medium ">
                    Soluções
                </h1>

                <FocusCards cards={cards} />
            </div>
        </section>

    );
}