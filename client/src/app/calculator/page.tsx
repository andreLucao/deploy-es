import Header from "@/components/calculator/Header";
import FormContainer from "@/components/calculator/FormContainer";

export default function Calculator() {

    return (
        <main className="bg-[#efefef] w-full min-h-screen flex flex-col overflow-x-hidden">
            <Header />

            <div className="flex-1 flex justify-center items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="w-full max-w-7xl">
                    <FormContainer />
                </div>
            </div>
        </main>
    );
}