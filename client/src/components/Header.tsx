'use client';

export default function Header() {

    return (
        <>
            <div className="w-full h-20 flex items-center px-24 py-5 bg-[#002e34] bg-opacity-50 relative">
                <div>
                    <img src="/imgs/Logo.png" alt="Logo" className="h-15" />
                </div>
                
                {/* navbar centralizada com absolute */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl flex space-x-8">
                    <a href="/marketplace" className="text-white hover:text-gray-300">Marketplace</a>
                    <a href="#" className="text-white hover:text-gray-300">Certificações</a>
                    <a href="#" className="text-white hover:text-gray-300">Soluções</a>
                </div>

                <div className="ml-auto flex items-center">
                    <button className="bg-transparent font-medium text-white px-4 py-2 rounded-[10px] mr-4 hover:text-gray-300 transition cursor-pointer"
                            onClick={() => window.location.href = '/login'}>
                        Entrar
                    </button>
                    <button className="bg-[#00e07f] font-medium text-black px-4 py-2 rounded-[10px] hover:bg-green-500 transition cursor-pointer" 
                            onClick={() => window.location.href = '/register'}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </>
    )
}