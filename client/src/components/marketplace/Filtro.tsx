import { Funnel } from 'lucide-react'
import { ChevronDownIcon } from 'lucide-react';
import { Grid } from 'lucide-react';
import { List } from 'lucide-react';

export default function Filtro() {
    return (
        <div className="flex h-full justify-center items-center gap-216">
            <div className="flex items-center h-full gap-3 p-4">
                <p className='text-sm'>Ordenar por:</p>
                <button className="flex items-center cursor-pointer">
                    <p className='text-sm'>Relevância</p>
                    <ChevronDownIcon size={25}/>
                </button>
                <button className="cursor-pointer"><Funnel size={22}/></button>
            </div>
            <div className="flex items-center gap-3 h-full p-4">
                <p>Nº Produtos</p>
                <button className="cursor-pointer"><List /></button>
                <button className="cursor-pointer"><Grid /></button>
            </div>
        </div>
    );
}