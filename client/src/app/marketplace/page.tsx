'use client';

import { useRef } from "react";
import Header from "@/components/marketplace/Header";
import Destaque from "@/components/marketplace/Destaque";
import Footer from "@/components/Footer";
import Produtos from "@/components/marketplace/Produtos";

export default function Marketplace() {
  return (
    <div className="h-[950px] custom-gradient">
        <Header />
        <div className="flex p-50 h-170">
            <Destaque />
        </div>
        <div className="flex bg-white p-10">
            <Produtos />
        </div>
    </div>
  );
}