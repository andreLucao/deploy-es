'use client';

export default function KnowUs() {
    return (
        <section id="marketplace"
        className="h-[700px] flex items-center justify-center relative mb-0"
        style={{
          backgroundImage: "url('/imgs/MKTBG.png')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#efefef]/30 backdrop-blur-md"></div>
        
        {/* Gradiente do topo: #efefef para transparente */}
        <div className="absolute top-0 left-0 w-full h-32 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, #efefef, transparent)"
              }}></div>
        
        {/* Gradiente do fim: transparente para #efefef */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, #efefef)"
              }}></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h1 className="text-center text-black text-5xl font-medium mb-16">
            Conheça o Marketplace
          </h1>
          <p className="text-center text-black font-light text-xl max-w-5xl mx-auto">
          Bem-vindo ao nosso marketplace, seu ponto de encontro para um futuro mais verde. Conectamos de forma simples e transparente quem deseja compensar suas emissões de carbono com quem tem projetos sustentáveis. Em nossa plataforma, você pode comprar e vender créditos de carbono, que representam uma tonelada de CO2 que deixou de ser emitida, e assim financiar iniciativas de impacto positivo como a conservação de florestas e a produção de energia renovável. Ao participar, você não apenas adquire um crédito, mas se torna parte de um movimento global que impulsiona a sustentabilidade e faz a diferença na construção de um futuro mais limpo e justo para todos. Pronto para fazer parte da mudança? Clique no botão e acesse o marketplace.
          </p>

          <button className="bg-[#002e34] text-[25px] text-white font-medium px-6 py-3 rounded-[10px] mt-16 hover:bg-emerald-950 transition duration-200 hover:scale-105 cursor-pointer"
          onClick={() => window.location.href = '/marketplace'}>
            Acesse Agora
          </button>
        </div>
      </section>
    ); 
}