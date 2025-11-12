export default function Footer() {
    return (
        <footer className="w-full bg-[#002e34] text-white py-4 sm:py-5 mt-auto">
            <div className="container mx-auto text-center px-4">
                <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} EcoChange. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}