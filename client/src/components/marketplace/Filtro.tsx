import { Funnel } from 'lucide-react'
import { ChevronDownIcon } from 'lucide-react';
import { Grid } from 'lucide-react';
import { List } from 'lucide-react';

export default function Filtro() {
    return (
        <div className="flex h-15 justify-center items-center gap-216">
            <div className="flex items-center bg-gray-300 h-full gap-3 p-4">
                <p>Ordenar por:</p>
                <button className="flex bg-white p-2 cursor-pointer">
                    <p>Relevância</p>
                    <ChevronDownIcon />
                </button>
                <button className="cursor-pointer"><Funnel /></button>
            </div>
            <div className="flex items-center gap-3 h-full p-4">
                <p>Nº Produtos</p>
                <button className="cursor-pointer"><List /></button>
                <button className="cursor-pointer"><Grid /></button>
            </div>
        </div>
    );
}