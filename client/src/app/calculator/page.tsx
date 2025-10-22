import Header from "@/components/calculator/Header";
import FormContainer from "@/components/calculator/FormContainer";

export default function Calculator() {

    return (
        <main className="bg-[#efefef] w-full min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex justify-center items-center container-responsive spacing-responsive-md">
                <div className="w-full max-w-4xl">
                    <FormContainer />
                </div>
            </div>
        </main>
    );
}