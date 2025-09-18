export default function Hero() {

    return (
        <section className="relative min-h-[950px] w-full bg-[url('/imgs/heroBG.png')] bg-cover bg-top bg-no-repeat flex flex-col items-center justify-center px-24 py-23 gap-0 mt-[-20]">
            <div className="flex flex-col items-center justify-center mb-25 gap-3 pt-5">
                <img src='/imgs/Logo.png' className="h-40 mb-8"></img>
                <h1 className="text-white text-[85px] font-bold z-10 text-center leading-tight">
                    TRANSICIONE  <br />
                    PARA UM <br />
                    FUTURO <span className="text-[#56FF5F] text-glow font-bold">VERDE</span>
                </h1>
                <p className="text-white text-[20px] font-light mt-8 z-10 max-w-3xl text-center ">
                    Somos a EcoChange, a plataforma global que conecta desenvolvedores <br />
                    de projetos ambientais a empresas e indivíduos. Nossa missão é facilitar a <br />negociação de créditos de carbono, impulsionando a descarbonização e <br />
                    gerando um impacto positivo duradouro em escala global.
                </p>
            </div>
        </section>
    );
}