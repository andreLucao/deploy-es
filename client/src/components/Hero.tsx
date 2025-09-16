export default function Hero() {

    return (
        <>
            <div className="relative h-[780px] flex-justify px-24 py-23 justify-center"
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
            </div>
        </>
    )
}