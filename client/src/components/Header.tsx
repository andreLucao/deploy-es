type HeaderProps = {
    onScrollToKnowUs: () => void;
    onScrollToCertificacoes: () => void;
    onScrollToSolucoes: () => void;
};

export default function Header({ onScrollToKnowUs, onScrollToCertificacoes, onScrollToSolucoes }: HeaderProps) {

    return (
        <>
            <div className="w-full h-20 flex items-center px-24 py-5 bg-[#efefef] bg-opacity-50 relative shadow-lg z-10 sticky top-0 z-100 rounded-b-3xl">
                <div>
                    <img src="/imgs/Logo.png" alt="Logo" className="h-15" />
                </div>
                
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl flex space-x-8">
                    <a className="text-black hover:text-zinc-800 cursor-pointer" onClick={onScrollToKnowUs}>Marketplace</a>
                    <a className="text-black hover:text-zinc-800 cursor-pointer" onClick={onScrollToCertificacoes}>Certificações</a>
                    <a className="text-black hover:text-zinc-800 cursor-pointer" onClick={onScrollToSolucoes}>Soluções</a>
                </div>

                <div className="ml-auto flex items-center">
                    <button className="bg-transparent font-medium text-black px-4 py-2 rounded-[10px] mr-4 hover:text-zinc-800 transition cursor-pointer"
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