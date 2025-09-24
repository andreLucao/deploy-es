import { InfiniteMovingCards } from "../moving-cards";

export default function Certificacoes() {
    return (
        <section id="certificacoes">
            <div className="bg-[#efefef] flex flex-col items-center py-16 sm:py-20 lg:py-30 px-4 sm:px-8">
                <h1 className="text-center text-black text-3xl sm:text-4xl lg:text-5xl font-medium mb-8 sm:mb-12 lg:mb-0">
                    Certificações
                </h1>
                <div className="flex justify-center mt-8 sm:mt-12 lg:mt-15 w-full">
                    <InfiniteMovingCards items={[
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                    ]} speed="slow" />
                </div>
            </div>
        </section>
    );
}