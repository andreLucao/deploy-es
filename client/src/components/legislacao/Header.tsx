"use client";

export default function Header() {
    return (
        <header className="w-full h-16 sm:h-20 flex items-center px-4 sm:px-8 lg:px-24 bg-[#002E34] shadow-lg z-50 sticky top-0">
            
            {/* Logo (clicável → home) */}
            <img
                src="/imgs/Logo.png"
                alt="Logo"
                className="h-10 sm:h-12 cursor-pointer"
                onClick={() => (window.location.href = "/")}
            />
            
            <nav className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">


   {/* INÍCIO */}
   <a 
      className="text-white/90 hover:text-white cursor-pointer font-medium text-lg transition-all duration-300 relative group px-3 py-2"
      onClick={() => (window.location.href = "/")}
   >
      Início
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00e07f] transition-all duration-300 group-hover:w-full"></span>
   </a>

   {/* LEGISLAÇÃO */}
   <a 
      className="text-white/90 hover:text-white cursor-pointer font-medium text-lg transition-all duration-300 relative group px-3 py-2"
      onClick={() => {}}
   >
      Legislação
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00e07f] transition-all duration-300 group-hover:w-full"></span>
   </a>

   

</nav>


            {/* Botão Entrar */}
            <button
                className="ml-auto bg-[#00e07f] font-medium text-black px-4 py-2 rounded-[10px] 
                hover:bg-green-500 transition cursor-pointer text-sm sm:text-base"
                onClick={() => (window.location.href = "/login")}
            >
                Entrar
            </button>
        </header>
    );
}
