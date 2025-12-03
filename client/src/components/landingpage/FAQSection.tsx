"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqData } from "@/data/faqData";

export default function FAQSection() {
   const [openId, setOpenId] = useState<number | null>(null);

   const toggleFAQ = (id: number) => {
      setOpenId(openId === id ? null : id);
   };

   return (
      <section className="py-16 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
               Perguntas Frequentes (FAQ)
            </h2>

            <div className="space-y-6">
               {faqData.map((item) => (
                  <div
                     key={item.id}
                     className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md"
                  >
                     {/*Pergunta*/}
                     <button
                        className="flex justify-between items-center w-full p-5 text-lg font-medium text-left text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => toggleFAQ(item.id)}
                     >
                        <span>{item.question}</span>
                        {openId === item.id ? (
                           <Minus size={20} className="text-green-600" />
                        ) : (
                           <Plus size={20} className="text-gray-500" />
                        )}
                     </button>

                     {/*Resposta*/}
                     {openId === item.id && (
                        <div className="p-5 text-base text-gray-600 bg-white border-t border-gray-200 animate-in fade-in slide-in-from-top-1">
                           {item.answer}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
