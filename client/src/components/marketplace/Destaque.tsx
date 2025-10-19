import React, { useEffect } from "react";

export default function Destaque() {
    return (
        <div className="w-full h-96 flex items-center justify-center gap-[20px]">
            <div onClick={() => {}} className="flex bg-white h-full w-[324px] rounded-xl hover:scale-102 transition-all cursor-pointer">
                Card1
            </div>
            <div onClick={() => {}} className="flex bg-white h-full w-[324px] rounded-xl hover:scale-102 transition-all cursor-pointer">
                Card2
            </div>
            <div onClick={() => {}} className="flex bg-white h-full w-[324px] rounded-xl hover:scale-102 transition-all cursor-pointer">
                Card3
            </div>
            <div onClick={() => {}} className="flex bg-white h-full w-[324px] rounded-xl hover:scale-102 transition-all cursor-pointer">
                Card4
            </div>
        </div>
    );
}