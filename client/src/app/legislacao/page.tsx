"use client";

import Header from "@/components/legislacao/Header";
import Footer from "@/components/Footer";

export default function InformacoesPage() {
    return (
        <main className="bg-gradient-to-b from-[#e7f7f4] to-[#ffffff] min-h-screen flex flex-col">
            
            {/* Header */}
            <Header
                
            />

            {/* Conteúdo */}
            <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-16">

                <h1 className="text-4xl font-bold text-[#002e34] mb-12 text-center">
                    Informações sobre o programa
                </h1>

                {/* SEÇÃO 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">1. O que é o Programa de Descarbonização?</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        iNSIRA O TEXTO 
                    </p>
                </section>

                <hr className="my-8 border-zinc-300" />

                {/* SEÇÃO 2 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">2. Como funciona?</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        joga o texto aq patrão
                    </p>
                </section>

                {/*se quiser fazar mais uma seção só copiar o section e o marcador entre as seções */}

                
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
