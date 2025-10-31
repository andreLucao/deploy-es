'use client';

import { ShoppingCart, Menu, X } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";


export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="w-full h-16 sm:h-20 shadow-lg flex items-center px-4 sm:px-8 lg:px-24 py-3 sm:py-5 bg-[#002E34] bg-opacity-50 rounded-b-xl relative z-50 sticky top-0">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img 
                        src="/imgs/Logo.png" 
                        alt="Logo" 
                        className="h-10 sm:h-12 lg:h-15 cursor-pointer" 
                        onClick={() => router.push("/")}
                    />
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base xl:text-xl space-x-4 xl:space-x-8">
                    <a className="text-white hover:text-gray-300 cursor-pointer font-bold border-b-2 border-white">
                        Calculadora
                    </a>
                    <a 
                        className="text-white hover:text-gray-300 cursor-pointer" 
                        onClick={() => router.push("/marketplace")}
                    >
                        Marketplace
                    </a>
                    <a className="text-white hover:text-gray-300 cursor-pointer">
                        Relatórios
                    </a>
                    <a className="text-white hover:text-gray-300 cursor-pointer">
                        Compensação
                    </a>
                </div>

                {/* Desktop Right Section */}
                <div className="ml-auto hidden lg:flex items-center gap-2 xl:gap-4">
                    <div className="flex items-center justify-center bg-gray-300 h-10 xl:h-13 px-3 xl:px-4 rounded-xl">
                        <p className="text-black text-sm xl:text-base">Balance</p>
                    </div>
                    <ShoppingCart className="text-white w-5 h-5 xl:w-6 xl:h-6 cursor-pointer" />
                    <div className="w-10 h-10 xl:w-13 xl:h-13 bg-gray-300 rounded-full overflow-hidden">
                        <img src="/imgs/avatar.png" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Mobile Right Section */}
                <div className="ml-auto flex lg:hidden items-center gap-2 sm:gap-3">
                    <ShoppingCart className="text-white w-5 h-5 cursor-pointer" />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                    <div 
                        className="bg-[#002E34] w-64 sm:w-80 h-full shadow-lg p-6 space-y-6 ml-auto animate-slide-in-right"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <img src="/imgs/Logo.png" alt="Logo" className="h-10" />
                            <button onClick={() => setIsMenuOpen(false)} className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Mobile Balance */}
                        <div className="flex items-center justify-center bg-gray-300 h-12 rounded-xl mb-6">
                            <p className="text-black font-medium">Balance</p>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="space-y-4">
                            <a 
                                className="block text-white font-bold cursor-pointer text-lg py-2 px-4 bg-white/10 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Calculadora
                            </a>
                            <a 
                                className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => {
                                    router.push("/marketplace");
                                    setIsMenuOpen(false);
                                }}
                            >
                                Marketplace
                            </a>
                            <a 
                                className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Relatórios
                            </a>
                            <a 
                                className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Compensação
                            </a>
                        </nav>

                        {/* Mobile User Avatar */}
                        <div className="flex items-center gap-3 mt-8 pt-8 border-t border-white/20">
                            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                                <img
                                    src="/imgs/avatar.png"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-white">
                                <p className="font-medium">Usuário</p>
                                <p className="text-sm text-gray-300">Ver perfil</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}