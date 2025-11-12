"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

async function getFeaturedAds() {
  try {
    const res = await fetch('http://localhost:3001/api/adProducts/featured?limit=4', {
      cache: 'no-store'
    });
    if (!res.ok) {
      console.error("Erro ao buscar destaques:", res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Fetch dos destaques falhou:", error);
    return [];
  }
}
export default function Destaque() {
    const router = useRouter();

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div onClick={() => router.push('/marketplace/1')} className="flex bg-white h-48 sm:h-56 lg:h-100 w-full rounded-lg hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-4 lg:p-6 flex items-center justify-center text-base lg:text-lg font-semibold text-gray-700">
                        Card1
                    </div>
                </div>
                <div onClick={() => router.push('/marketplace/2')} className="flex bg-white h-48 sm:h-56 lg:h-100 w-full rounded-lg hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-4 lg:p-6 flex items-center justify-center text-base lg:text-lg font-semibold text-gray-700">
                        Card2
                    </div>
                </div>
                <div onClick={() => router.push('/marketplace/3')} className="flex bg-white h-48 sm:h-56 lg:h-100 w-full rounded-lg hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-4 lg:p-6 flex items-center justify-center text-base lg:text-lg font-semibold text-gray-700">
                        Card3
                    </div>
                </div>
                <div onClick={() => router.push('/marketplace/4')} className="flex bg-white h-48 sm:h-56 lg:h-100 w-full rounded-lg hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-4 lg:p-6 flex items-center justify-center text-base lg:text-lg font-semibold text-gray-700">
                        Card4
                    </div>
                </div>
            </div>
        </div>
    )
}