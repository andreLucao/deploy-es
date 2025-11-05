import { FocusCards } from "../ui/focus-cards";

export default function Solucoes() {
    const cards = [
        {
            title: "Criação de Relatórios Automatizados",
            src: '/imgs/card1.png',
            description: 'Calcule com precisão as emissões da sua empresa, identificando exatamente o quanto precisa compensar. É o primeiro passo para uma estratégia de sustentabilidade eficaz.'
        },
        {
            title: "Dashboard de Inventário de Emissões",
            src: '/imgs/card5.png',
            description: 'Simplificamos a geração de relatórios de emissões. Nossa ferramenta com inteligência artificial transforma seus dados em relatórios claros e acionáveis, com insights profundos sobre sua pegada de carbono.',
        },
        {
            title:"Marketplace de Créditos de Carbono",
            src: "/imgs/card4.png",
            description: 'Visualize seu progresso em tempo real. Monitore seu desempenho e acompanhe o impacto de suas ações através de um dashboard interativo e intuitivo.'
        },
    ];

    return (
        <section id="solucoes">
            <div className="flex justify-center flex-col items-center bg-[#efefef] px-4 sm:px-8 py-16 sm:py-20 lg:py-0">
                <h1 className="mb-8 sm:mb-12 lg:mb-15 text-center text-black text-3xl sm:text-4xl lg:text-5xl font-medium">
                    Soluções
                </h1>

                <div className="w-full max-w-7xl">
                    <FocusCards cards={cards} />
                </div>
            </div>
        </section>
    );
}
