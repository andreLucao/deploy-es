import Header from "@/components/calculator/Header";
import FormContainer from "@/components/calculator/FormContainer";

export default function Calculator() {

    return (
        <main className="bg-[#efefef] w-full min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex justify-center items-center">
                <FormContainer />
            </div>
        </main>
    );
}