'use client';

export default function KnowUs() {
    return (
        <section id="marketplace"
        className="h-[700px] flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/imgs/MKTBG.png')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, white)"
              }}></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h1 className="text-center text-black text-5xl font-medium mb-16">
            Conheça o Marketplace
          </h1>
          <p className="text-center text-black font-light text-xl max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <button className="bg-[#002e34] text-[25px] text-white font-medium px-6 py-3 rounded-[10px] mt-16 hover:bg-emerald-950 transition duration-200 hover:scale-105 cursor-pointer"
          onClick={() => window.location.href = '/marketplace'}>
            Acesse Agora
          </button>
        </div>
      </section>
    ); 
}