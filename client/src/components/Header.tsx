"use client";

import { useState } from "react";

type HeaderProps = {
   onScrollToKnowUs: () => void;
   onScrollToCertificacoes: () => void;
   onScrollToSolucoes: () => void;
   onScrollToFAQ: () => void;
};

export default function Header({
   onScrollToKnowUs,
   onScrollToCertificacoes,
   onScrollToSolucoes,
   onScrollToFAQ,
}: HeaderProps) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const handleNavClick = (scrollFunction: () => void) => {
      scrollFunction();
      setIsMenuOpen(false);
   };

   return (
      <>
         <div className="w-full h-16 sm:h-20 flex items-center px-4 sm:px-8 lg:px-24 py-3 sm:py-5 bg-[#efefef] bg-opacity-50 relative shadow-lg z-50 sticky top-0 rounded-b-3xl">
            {/* Logo */}
            <img
               src="/imgs/Logo.png"
               alt="Logo"
               className="h-10 sm:h-12 lg:h-15"
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg xl:text-xl space-x-6 xl:space-x-8">
               <a
                  className="text-black hover:text-zinc-800 cursor-pointer transition-colors"
                  onClick={onScrollToKnowUs}
               >
                  Marketplace
               </a>
               <a
                  className="text-black hover:text-zinc-800 cursor-pointer transition-colors"
                  onClick={onScrollToCertificacoes}
               >
                  Certificações
               </a>
               <a
                  className="text-black hover:text-zinc-800 cursor-pointer transition-colors"
                  onClick={onScrollToSolucoes}
               >
                  Soluções
               </a>
               <a
                  className="text-black hover:text-zinc-800 cursor-pointer transition-colors"
                  onClick={onScrollToFAQ}
               >
                  FAQ
               </a>
            </div>

            {/* Desktop Login Button */}
            <div className="ml-auto hidden sm:flex items-center">
               <button
                  className="bg-[#00e07f] font-medium text-black px-3 sm:px-4 py-2 rounded-[10px] hover:bg-green-500 transition cursor-pointer text-sm sm:text-base"
                  onClick={() => (window.location.href = "/login")}
               >
                  Entrar
               </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="ml-auto lg:hidden flex items-center space-x-3">
               <button
                  className="bg-[#00e07f] font-medium text-black px-3 py-2 rounded-[10px] hover:bg-green-500 transition cursor-pointer text-sm sm:hidden"
                  onClick={() => (window.location.href = "/login")}
               >
                  Entrar
               </button>
               <button
                  onClick={toggleMenu}
                  className="text-black focus:outline-none"
               >
                  <svg
                     className="w-6 h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     {isMenuOpen ? (
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M6 18L18 6M6 6l12 12"
                        />
                     ) : (
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     )}
                  </svg>
               </button>
            </div>
         </div>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && (
            <div
               className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
               onClick={() => setIsMenuOpen(false)}
            >
               <div className="bg-[#efefef] w-64 h-full shadow-lg p-6 space-y-6">
                  <div className="flex justify-between items-center mb-8">
                     <img src="/imgs/Logo.png" alt="Logo" className="h-10" />
                     <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-black"
                     >
                        <svg
                           className="w-6 h-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  <nav className="space-y-4">
                     <a
                        className="block text-black hover:text-zinc-800 cursor-pointer text-lg py-2"
                        onClick={() => handleNavClick(onScrollToKnowUs)}
                     >
                        Marketplace
                     </a>
                     <a
                        className="block text-black hover:text-zinc-800 cursor-pointer text-lg py-2"
                        onClick={() => handleNavClick(onScrollToCertificacoes)}
                     >
                        Certificações
                     </a>
                     <a
                        className="block text-black hover:text-zinc-800 cursor-pointer text-lg py-2"
                        onClick={() => handleNavClick(onScrollToSolucoes)}
                     >
                        Soluções
                     </a>
                     <a
                        className="block text-black hover:text-zinc-800 cursor-pointer text-lg py-2"
                        onClick={() => handleNavClick(onScrollToFAQ)}
                     >
                        FAQ
                     </a>
                  </nav>
                  <button
                     className="w-full bg-[#00e07f] font-medium text-black px-4 py-3 rounded-[10px] hover:bg-green-500 transition cursor-pointer mt-8 sm:hidden"
                     onClick={() => (window.location.href = "/login")}
                  >
                     Entrar
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
