import { InfiniteMovingCards } from "../moving-cards";

export default function Certificacoes() {

    return (
        <section id="certificacoes">
            <div className=" bg-[#efefef] flex flex-col items-center py-30">
                <h1 className="text-center text-black text-5xl font-medium ">
                    Certificações
                </h1>
                <div className="flex justify-center mt-15">
                    <InfiniteMovingCards items={[
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                        {logo: "/imgs/Logo.png"},
                    ]} speed="slow" >
                    </InfiniteMovingCards>
                </div>
            </div>

        </section>
    );
}