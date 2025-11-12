import Header from "@/components/marketplace/Header";
import Destaque from "@/components/marketplace/Destaque";
import Footer from "@/components/Footer";
import MarketplaceClient from "@/components/marketplace/MarketplaceClient";

export default function Marketplace() {
  return (
    <div className="flex flex-col min-h-screen custom-gradient">
      <Header />
      <div className="flex-1 flex flex-col container-full">
        {/* Destaques - com espaço abaixo */}
        <div className="flex flex-col py-12 lg:flex-row mb-8 sm:mb-12">
          <div className="w-full">
            <Destaque />
          </div>
        </div>

        {/* Client-side content */}
        <MarketplaceClient />

      </div>
     <Footer />
    </div>
  );
}