"use client";

import { ShoppingCart } from "lucide-react";
import { Menu } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

import CartDrawer from "../common/CartDrawer";

export default function Header() {
   const router = useRouter();
   const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/credits`, {
          credentials: "include", // envia cookie JWT automaticamente
        });

        if (!res.ok) {
          setLoading(false);
          return; // não logado
        }

        const data = await res.json();
        setCredits(data.credits);
      } catch (err) {
        console.error("Erro ao carregar créditos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCredits();
  }, []);

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

               {/* Só mostrar créditos se logado */}
              {!loading && credits !== null && (
                <div className="flex items-center gap-2 bg-white border border-[#1AAE9F] px-6 py-2.5 rounded-full mr-4 shadow-sm">
                 <span className="text-black font-semibold text-base">{credits}</span>
                <span className="text-[#0E8F85] font-semibold text-sm tracking-wider">CC</span>
              </div>
               )}

              
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
