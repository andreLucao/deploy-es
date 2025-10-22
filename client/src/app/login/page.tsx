import Header from "@/components/Header";
import LoginCard from "@/components/login/LoginCard";

export default function LoginPage() {
    return (
        <main className="bg-gradient-to-tr from-[#002e34] to-[#00e07f] w-full min-h-screen">
            <div className="flex spacing-responsive-md min-h-screen items-center justify-center bg-gradient-to-tr from-[#002e34] to-[#00e07f]">
                <div className="w-full max-w-md mx-auto">
                    <LoginCard/>
                </div>
            </div>
        </main>
    );
}