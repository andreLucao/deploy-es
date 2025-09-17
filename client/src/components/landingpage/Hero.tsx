export default function Hero() {

    return (
        <section className="relative h-[950px] bg-[#efefef] flex flex-col items-center justify-center px-24 py-23 gap-0">
            <div className="flex flex-col items-center justify-center mb-25 gap-3">
                <img src='/imgs/Logo.png' className="h-40 mb-8"></img>
                <h1 className="text-[#002E34] text-[85px] font-bold z-10 text-center leading-tight">
                    TRANSICIONE  <br />
                    PARA UM <br />
                    FUTURO <span className="text-[#56FF5F] text-glow font-bold">VERDE</span>
                </h1>
                <p className="text-black text-[20px] font-light mt-8 z-10 max-w-3xl text-center ">
                    Somos o/a NomeNosso, a plataforma global que conecta desenvolvedores <br />
                    de projetos ambientais a empresas e indivíduos. Nossa missão é facilitar a <br />negociação de créditos de carbono, impulsionando a descarbonização e <br />
                    gerando um impacto positivo duradouro em escala global.
                </p>
            </div>
        </section>
    );
}