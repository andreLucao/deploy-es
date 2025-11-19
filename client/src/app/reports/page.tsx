"use client"

import Footer from "@/components/Footer";
import Header from "@/components/reports/Header";
import SelectEmission from "@/components/reports/SelectEmission";

export default function Report(){

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            
              <div className="flex flex-col">
                <SelectEmission />
              </div>
            
            <Footer />
        </div>
    );
}