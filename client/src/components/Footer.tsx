export default function Footer() {
    return (
        <footer className="bg-[#002e34] text-white py-4 sm:py-5 mt-12 sm:mt-16 lg:mt-20">
            <div className="container mx-auto text-center px-4">
                <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} EcoChange. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}