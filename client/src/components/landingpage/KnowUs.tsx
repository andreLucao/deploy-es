'use client';

export default function KnowUs() {
    return (
        <section id="marketplace"
            className="min-h-[500px] sm:min-h-[600px] lg:h-[700px] flex items-center justify-center relative mb-0 px-4 sm:px-8 lg:px-0 py-12 sm:py-16 lg:py-0"
            style={{
                backgroundImage: "url('/imgs/MKTBG.png')",
                backgroundSize: "cover", 
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-[#efefef]/30 backdrop-blur-md"></div>
            
            {/* Gradiente do topo: #efefef para transparente */}
            <div className="absolute top-0 left-0 w-full h-16 sm:h-24 lg:h-32 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, #efefef, transparent)"
                  }}></div>
            
            {/* Gradiente do fim: transparente para #efefef */}
            <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 lg:h-32 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #efefef)"
                  }}></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
                <h1 className="text-center text-black text-3xl sm:text-4xl lg:text-5xl font-medium mb-8 sm:mb-12 lg:mb-16">
                    Conheça o Marketplace
                </h1>
                <p className="text-center text-black font-light text-sm sm:text-lg lg:text-xl max-w-sm sm:max-w-3xl lg:max-w-5xl mx-auto leading-relaxed">
                    Bem-vindo ao nosso marketplace, seu ponto de encontro para um futuro mais verde. Conectamos de forma simples e transparente quem deseja compensar suas emissões de carbono com quem tem projetos sustentáveis. Em nossa plataforma, você pode comprar e vender créditos de carbono, que representam uma tonelada de CO2 que deixou de ser emitida, e assim financiar iniciativas de impacto positivo como a conservação de florestas e a produção de energia renovável. Ao participar, você não apenas adquire um crédito, mas se torna parte de um movimento global que impulsiona a sustentabilidade e faz a diferença na construção de um futuro mais limpo e justo para todos. Pronto para fazer parte da mudança? Clique no botão e acesse o marketplace.
                </p>

                <button className="bg-[#002e34] text-lg sm:text-xl lg:text-[25px] text-white font-medium px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-[10px] mt-8 sm:mt-12 lg:mt-16 hover:bg-emerald-950 transition duration-200 hover:scale-105 cursor-pointer"
                onClick={() => window.location.href = '/marketplace'}>
                    Acesse Agora
                </button>
            </div>
        </section>
    ); 
}
