'use client';

import { Plus } from "lucide-react";
import { useState } from "react";
import AdFormModal from "./AdFormModal";

interface CreateAdButtonProps {
    onAdCreated?: () => void;
}

export default function CreateAdButton({ onAdCreated }: CreateAdButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSuccess = () => {
        onAdCreated?.();
        console.log('Anúncio criado com sucesso!');
    };

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 w-15 h-15 bg-[#002E34] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#004443] transition-colors z-50 cursor-pointer"
            >
                <Plus />
            </button>
            
            <AdFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
}