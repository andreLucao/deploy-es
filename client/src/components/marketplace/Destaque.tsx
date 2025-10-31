import React, { useEffect } from "react";

export default function Destaque() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-4 sm:gap-6">
                <div onClick={() => {}} className="flex bg-white h-48 sm:h-64 w-full rounded-xl hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-6 flex items-center justify-center text-lg font-semibold text-gray-700">
                        Card1
                    </div>
                </div>
                <div onClick={() => {}} className="flex bg-white h-48 sm:h-64 w-full rounded-xl hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-6 flex items-center justify-center text-lg font-semibold text-gray-700">
                        Card2
                    </div>
                </div>
                <div onClick={() => {}} className="flex bg-white h-48 sm:h-64 w-full rounded-xl hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-6 flex items-center justify-center text-lg font-semibold text-gray-700">
                        Card3
                    </div>
                </div>
                <div onClick={() => {}} className="flex bg-white h-48 sm:h-64 w-full rounded-xl hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl">
                    <div className="w-full p-6 flex items-center justify-center text-lg font-semibold text-gray-700">
                        Card4
                    </div>
                </div>
            </div>
        </div>
    );
}