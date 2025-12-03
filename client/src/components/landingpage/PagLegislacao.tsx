export default function Legislacao() {
    return (
        <section id="legislacao">
            <div className="flex justify-center flex-col items-center bg-gradient-to-b from-[#efefef] to-emerald-50 px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
                <h1 className="text-center text-black text-3xl sm:text-4xl lg:text-5xl font-medium mb-8 sm:mb-12 lg:mb-16">
                    Fique por dentro da legislação!
                </h1>
                
                <p className="text-center text-black font-light text-sm sm:text-lg lg:text-xl max-w-sm sm:max-w-3xl lg:max-w-5xl mx-auto leading-relaxed mb-8 sm:mb-12 lg:mb-16">
                    Confira todas as informações sobre o Programa de Descarbonização e seu funcionamento.
                </p>

                <button className="bg-[#002e34] text-lg sm:text-xl lg:text-[25px] text-white font-medium px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-[10px] hover:bg-emerald-950 transition duration-200 hover:scale-105 cursor-pointer"
                onClick={() => window.location.href = '/legislacao'}>
                    Acessar a Página
                </button>
            </div>
        </section>
    );
}