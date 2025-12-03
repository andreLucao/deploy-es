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
                    Informações sobre o Programa Brasileiro GHG Protocol
                </h1>

                {/* SEÇÃO 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">1. O que é o PBGHG?</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        O Programa Brasileiro GHG Protocol é uma adaptação do método internacional GHG Protocol para o contexto nacional. Seu foco é a contabilização, quantificação e publicação de inventários corporativos de emissões de gases de efeito estufa (GEE).
                    </p>
                </section>

                <hr className="my-8 border-zinc-300" />

                {/* SEÇÃO 2 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">2. Objetivos Principais:</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        O programa visa estimular a cultura de elaboração e publicação de inventários de emissões nas empresas brasileiras e oferecer instrumentos de qualidade e reconhecimento internacional para o gerenciamento dessas emissões.
                    </p>
                </section>

                <hr className="my-8 border-zinc-300" />

                {/* SEÇÃO 3 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">3. Princípios de Contabilização:</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        Para garantir a qualidade dos inventários, o programa segue cinco princípios fundamentais:<br />
                        Relevância: O inventário deve refletir adequadamente as emissões da empresa para auxiliar na tomada de decisão.<br />
                        Integralidade: Deve contabilizar todas as fontes e emissões dentro dos limites definidos.<br />
                        Consistência: O uso de metodologias consistentes permite a comparação das emissões ao longo do tempo.<br />
                        Transparência: Todas as questões relevantes devem ser tratadas de forma factual e coerente, baseadas em auditoria clara.<br />
                        Exatidão: A quantificação deve ser precisa o suficiente para garantir que os números sejam verdadeiros e minimizem incertezas.
                    </p>
                </section>

                <hr className="my-8 border-zinc-300" />

                {/* SEÇÃO 4 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">4. Gases Contemplados:</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        Os inventários devem incluir, no mínimo, os seis gases definidos pelo Protocolo de Quioto: Dióxido de Carbono (CO2), Metano (CH4), Óxido Nitroso (N2O), Hidrofluorcarbonos (HFCs), Perfluorcarbonos (PFCs) e Hexafluoreto de Enxofre (SF6).
                    </p>
                </section>

                <hr className="my-8 border-zinc-300" />

                {/* SEÇÃO 5 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#002e34] mb-3">Documento base:</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed">
                        Para mais informações, o documento Especificações do Programa Brasileiro GHG Protocol está disponível na íntegra em: https://repositorio.fgv.br/items/f6ce0440-782f-4cb0-9055-4fd963e7d9ad
                    </p>
                </section>
                
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
