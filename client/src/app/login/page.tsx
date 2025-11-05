import Header from "@/components/Header";
import LoginCard from "@/components/login/LoginCard";

export default function LoginPage() {
    return (
        <main className="bg-gradient-to-tr from-[#002e34] to-[#00e07f] w-full min-h-screen overflow-x-hidden">
            <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-7xl">
                    <LoginCard/>
                </div>
            </div>
        </main>
    );
}