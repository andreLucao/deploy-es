"use client";

import { User, LogOut, Settings, ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { useState, useRef, useEffect } from "react";

import CartDrawer from "../common/CartDrawer";

export default function Header() {
   const router = useRouter();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const profileRef = useRef<HTMLDivElement>(null);

   // Fechar dropdown ao clicar fora
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
         }
      }

      if (isProfileOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isProfileOpen]);

   return (
      <>
         <div className="w-full h-20 flex items-center px-4 sm:px-8 lg:px-24 py-3 bg-gradient-to-r from-[#002E34] to-[#004443] shadow-lg backdrop-blur-sm relative z-50 sticky top-0">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => router.push("/")}>
               <img
                  src="/imgs/Logo.png"
                  alt="Logo"
                  className="h-12 lg:h-16 transition-transform duration-300 group-hover:scale-105"
               />
            </div>

            {/* Desktop Navigation - Centralizado e Moderno */}
            <nav className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8">
               <a 
                  className="text-white/90 hover:text-white cursor-pointer font-medium transition-all duration-300 relative group px-3 py-2"
                  onClick={() => router.push("/calculator")}
               >
                  Calculadora
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00e07f] transition-all duration-300 group-hover:w-full"></span>
               </a>
               <a className="text-white hover:text-white cursor-pointer font-semibold transition-all duration-300 relative px-3 py-2 border-b-2 border-[#00e07f]">
                  Marketplace
               </a>
               <a className="text-white/90 hover:text-white cursor-pointer font-medium transition-all duration-300 relative group px-3 py-2">
                  Certificações
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00e07f] transition-all duration-300 group-hover:w-full"></span>
               </a>
               <a className="text-white/90 hover:text-white cursor-pointer font-medium transition-all duration-300 relative group px-3 py-2">
                  Relatórios
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00e07f] transition-all duration-300 group-hover:w-full"></span>
               </a>
            </nav>

            {/* Desktop Right Section - Modernizado */}
            <div className="ml-auto hidden lg:flex items-center gap-4">
               {/* Créditos */}
               <div className="flex items-center justify-center bg-gradient-to-r from-[#00e07f] to-[#00b865] h-11 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <span className="text-[#002E34] font-bold text-sm">💎</span>
                  <span className="text-[#002E34] font-bold ml-2">1,000 CC</span>
               </div>

               {/* Carrinho */}
               <CartDrawer />

               {/* Perfil com Dropdown */}
               <div className="relative" ref={profileRef}>
                  <button
                     onClick={() => setIsProfileOpen(!isProfileOpen)}
                     className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-1.5 pr-3 transition-all duration-300 group"
                  >
                     <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#00e07f]/50 group-hover:ring-[#00e07f] transition-all duration-300">
                        <img
                           src="/imgs/avatar.png"
                           alt="User"
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <span className="text-white font-medium text-sm hidden xl:block">Usuário</span>
                     <ChevronDown 
                        size={16} 
                        className={`text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                     />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                     <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-down border border-gray-100">
                        <div className="bg-gradient-to-r from-[#002E34] to-[#004443] p-4">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                                 <img
                                    src="/imgs/avatar.png"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                              <div>
                                 <p className="text-white font-semibold">Usuário</p>
                                 <p className="text-white/70 text-xs">usuario@example.com</p>
                              </div>
                           </div>
                        </div>

                        <div className="py-2">
                           <button
                              onClick={() => {
                                 setIsProfileOpen(false);
                                 // Adicionar navegação para perfil
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-left"
                           >
                              <User size={18} className="text-gray-600" />
                              <span className="text-gray-700 font-medium">Meu Perfil</span>
                           </button>

                           <button
                              onClick={() => {
                                 setIsProfileOpen(false);
                                 // Adicionar navegação para configurações
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-left"
                           >
                              <Settings size={18} className="text-gray-600" />
                              <span className="text-gray-700 font-medium">Configurações</span>
                           </button>

                           <div className="border-t border-gray-100 my-1"></div>

                           <button
                              onClick={() => {
                                 setIsProfileOpen(false);
                                 router.push("/login");
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors duration-200 text-left group"
                           >
                              <LogOut size={18} className="text-red-500" />
                              <span className="text-red-500 font-medium">Sair</span>
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Mobile Right Section */}
            <div className="ml-auto flex lg:hidden items-center gap-2 sm:gap-3">
               <CartDrawer />
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

                  {/* Mobile Credits */}
                  <div className="flex items-center justify-center bg-gray-300 h-12 rounded-xl mb-6">
                     <p className="text-black font-medium">CC : 1000</p>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-4">
                     <a 
                        className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => {
                           router.push("/calculator");
                           setIsMenuOpen(false);
                        }}
                     >
                        Calculadora
                     </a>
                     <a 
                        className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                     >
                        Marketplace
                     </a>
                     <a 
                        className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                     >
                        Certificações
                     </a>
                     <a 
                        className="block text-white hover:text-gray-300 cursor-pointer text-lg py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                     >
                        Relatórios
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
   );
}
