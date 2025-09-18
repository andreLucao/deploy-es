import Header from "@/components/Header";
import LoginCard from "@/components/login/LoginCard";

export default function LoginPage() {

    return (
        <main className="bg-gradient-to-tr from-[#002e34] to-[#00e07f] w-full min-h-screen">
            <div className="flex p-10 min-h-screen items-center justify-center bg-gradient-to-tr from-[#002e34] to-[#00e07f]">
                <LoginCard/>
            </div>
        </main>
        
    );
}