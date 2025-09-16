'use client';

import { useRef } from "react";
import Header from "@/components/Header";
import Certificacoes from "@/components/landingpage/Certificacoes";
import Hero from "@/components/landingpage/Hero";
import KnowUs from "@/components/landingpage/KnowUs";
import Solucoes from "@/components/landingpage/Solucoes";

export default function LandingPage() {
  const knowUsRef = useRef<HTMLElement>(null);
  const certificacoesRef = useRef<HTMLElement>(null);
  const solucoesRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>, offset = 0) => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <main>
      <Header
        onScrollToKnowUs={() => scrollToSection(knowUsRef, 80)}
        onScrollToCertificacoes={() => scrollToSection(certificacoesRef, 60)}
        onScrollToSolucoes={() => scrollToSection(solucoesRef, 80)}
      />

      <section><Hero /></section>
      <section ref={knowUsRef}><KnowUs /></section>
      <section ref={certificacoesRef}><Certificacoes /></section>
      {/* <section ref={solucoesRef}><Solucoes /></section> */}
    </main>
  );
}