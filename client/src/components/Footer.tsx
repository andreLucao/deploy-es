export default function Footer() {

    return (
        <footer className="bg-[#002e34] text-white py-5 mt-40">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} NomeEmpresa. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}