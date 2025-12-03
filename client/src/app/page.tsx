"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import Certificacoes from "@/components/landingpage/Certificacoes";
import Hero from "@/components/landingpage/Hero";
import KnowUs from "@/components/landingpage/KnowUs";
import Solucoes from "@/components/landingpage/Solucoes";
import Footer from "@/components/Footer";
import Legislacao from "@/components/landingpage/PagLegislacao";
import FAQSection from "@/components/landingpage/FAQSection";

export default function LandingPage() {
   const knowUsRef = useRef<HTMLElement>(null);
   const certificacoesRef = useRef<HTMLElement>(null);
   const solucoesRef = useRef<HTMLElement>(null);
   const legislacaoRef = useRef<HTMLElement>(null);
   const faqRef = useRef<HTMLElement>(null);

   const scrollToSection = (
      ref: React.RefObject<HTMLElement | null>,
      offset = 0
   ) => {
      if (ref.current) {
         const top =
            ref.current.getBoundingClientRect().top + window.scrollY - offset;
         window.scrollTo({ top, behavior: "smooth" });
      }
   };

   return (
      <main className="bg-[#efefef] min-h-screen flex flex-col">
         <Header
            onScrollToKnowUs={() => scrollToSection(knowUsRef, 60)}
            onScrollToCertificacoes={() =>
               scrollToSection(certificacoesRef, 60)
            }
            onScrollToSolucoes={() => scrollToSection(solucoesRef, 60)}
            onScrollToLegislacao={() => scrollToSection(legislacaoRef, 60)}
            onScrollToFAQ={() => scrollToSection(faqRef, 60)}
         />

         <div className="flex-1 w-full">
            <section className="w-full">
               <Hero />
            </section>
            <section ref={knowUsRef} className="w-full">
               <KnowUs />
            </section>
            <section ref={certificacoesRef} className="w-full">
               <Certificacoes />
            </section>
            <section ref={solucoesRef} className="w-full">
               <Solucoes />
               <section ref={legislacaoRef} className="w-full"> 
                <Legislacao />
            </section>
            </section>
            <section ref={faqRef} className="w-full">
               <FAQSection />
            </section>
         </div>

         <Footer />
      </main>
   );
}
