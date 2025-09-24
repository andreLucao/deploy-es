export default function Hero() {
    return (
        <section className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[950px] w-full bg-[url('/imgs/heroBG.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 sm:px-8 lg:px-24 py-12 sm:py-16 lg:py-23 gap-0 mt-[-16px] sm:mt-[-20px]">
            <div className="flex flex-col items-center justify-center mb-8 sm:mb-16 lg:mb-25 gap-2 sm:gap-3 pt-5">
                <img src='/imgs/Logo.png' className="h-20 sm:h-28 lg:h-40 mb-4 sm:mb-6 lg:mb-8" alt="Logo" />
                <h1 className="text-white text-3xl sm:text-5xl lg:text-[85px] font-bold z-10 text-center leading-tight">
                    TRANSICIONE<br className="sm:hidden" /> <span className="sm:hidden"><br /></span>
                    PARA UM<br className="sm:hidden" /> <span className="sm:hidden"><br /></span>
                    FUTURO <span className="text-[#56FF5F] text-glow font-bold">VERDE</span>
                </h1>
                <p className="text-white text-sm sm:text-lg lg:text-[20px] font-light mt-4 sm:mt-6 lg:mt-8 z-10 max-w-sm sm:max-w-2xl lg:max-w-3xl text-center leading-relaxed">
                    Somos a EcoChange, a plataforma global que conecta desenvolvedores 
                    de projetos ambientais a empresas e indivíduos. Nossa missão é facilitar a 
                    negociação de créditos de carbono, impulsionando a descarbonização e 
                    gerando um impacto positivo duradouro em escala global.
                </p>
            </div>
        </section>
    );
}
