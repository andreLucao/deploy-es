import React, { useEffect } from "react";

export default function Destaque() {
    return (
        <div className="w-full h-96 flex items-center justify-center gap-[20px]">
            <div className="flex bg-white h-full w-[324px] rounded-xl">
                Card1
            </div>
            <div className="flex bg-white h-full w-[324px] rounded-xl">
                Card2
            </div>
            <div className="flex bg-white h-full w-[324px] rounded-xl">
                Card3
            </div>
            <div className="flex bg-white h-full w-[324px] rounded-xl">
                Card4
            </div>
        </div>
    );
}