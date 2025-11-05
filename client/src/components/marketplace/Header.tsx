"use client";

import { ShoppingCart } from "lucide-react";
import { Menu } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";

import CartDrawer from "../common/CartDrawer";

export default function Header() {
   const router = useRouter();

   return (
      <>
         <div className="w-full h-20 flex items-center px-24 py-5 bg-[#002E34] bg-opacity-50 rounded-b-xl relative z-10 sticky top-0 z-100">
            <div>
               <img
                  src="/imgs/Logo.png"
                  alt="Logo"
                  className="h-15 cursor-pointer"
                  onClick={() => router.push("/")}
               />
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl flex space-x-8 gap-6">
               <a 
                  className="text-white hover:text-gray-300 cursor-pointer font-medium transition-colors"
                  onClick={() => router.push("/calculator")}
               >
                  Calculadora
               </a>
               <a className="text-white hover:text-gray-300 cursor-pointer transition-colors">
                  Marketplace
               </a>
               <a className="text-white hover:text-gray-300 cursor-pointer transition-colors">
                  Certificações
               </a>
               <a className="text-white hover:text-gray-300 cursor-pointer transition-colors">
                  Relatórios
               </a>
            </div>

            <div className="ml-auto flex items-center">
               <div className="flex items-center justify-center bg-gray-300 h-13 w-35 rounded-xl mr-4">
                  <p className="text-black">
                     {/* Valor de Créditos Carteira */}
                     CC : 1000
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <CartDrawer />
                  <Menu className="text-white ml-4" />
                  <div className="w-13 h-13 bg-gray-300 rounded-full ml-4">
                     <img
                        src="/imgs/avatar.png"
                        alt="User"
                        className="h-full rounded-full"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
