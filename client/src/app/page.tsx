import Header from "@/components/Header";
import { Baloo_Bhai_2 } from "next/font/google";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="relative h-[780px] flex-justify px-24 py-23 justify-center"
            style={{
                backgroundImage: "url('/imgs/heroBG.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <h1 className="text-white text-[90px] font-medium z-10">
                    TRANSICIONE  <br />
                    PARA UM <br />
                    FUTURO <span className="text-[#89ff0a] text-glow font-bold">VERDE</span>
                </h1>

                {/* Melhora aqui para deixar o parágrafo com o limite dele sendo o VERDE escrito no título */}
                <p className="text-white text-[20px] font-light mt-8 z-10 max-w-3xl text-justify">
                    Somos o/a NomeNosso, a plataforma global que conecta desenvolvedores <br />
                    de projetos ambientais a empresas e indivíduos. Nossa missão é facilitar a <br />negociação de créditos de carbono, impulsionando a descarbonização e <br />
                    gerando um impacto positivo duradouro em escala global.
                </p>
      </section>

      <section
        className="h-[700px] flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/imgs/MKTBG.png')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h1 className="text-center text-black text-5xl font-medium mb-16">
            Conheça o Marketplace
          </h1>
          <p className="text-center text-black font-light text-xl max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <button className="bg-[#002e34] text-[25px] text-white font-medium px-6 py-3 rounded-[10px] mt-16 hover:bg-emerald-950 transition duration-200 hover:scale-105 cursor-pointer">
            Acesse Agora
          </button>
        </div>
      </section>

      

    </main>
  );
}