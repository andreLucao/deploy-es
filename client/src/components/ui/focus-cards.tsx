"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={handleClick}
        className={cn(
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Frente do card */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <img
              src={card.src}
              alt={card.title}
              className="object-cover absolute inset-0"
            />
            <div
              className={cn(
                "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
                hovered === index ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                {card.title}
              </div>
            </div>
          </div>

          {/* Verso do card */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center p-6 bg-gradient-to-tr from-[#002e34] to-[#00e07f] text-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-4">
                {card.title}
              </div>
              <div className="text-sm md:text-base opacity-90">
                {card.description || "Clique novamente para voltar"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-7xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
