"use client";

import { useState } from "react";

type FlashCardProps = {
  front: string;
  back: string;
  explanation: string;
  onFlip?: (flipped: boolean) => void;
};

export default function FlashCard({ front, back, explanation, onFlip }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    onFlip?.(next);
  };

  return (
    <div
      className="relative h-72 w-full cursor-pointer sm:h-80"
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
    >
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Question</p>
          <p className="mt-4 text-center text-lg font-medium text-black dark:text-white">
            {front}
          </p>
          <p className="mt-6 text-xs text-zinc-400">Tap to flip</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-500">Answer</p>
          <p className="mt-4 text-center text-lg font-medium text-black dark:text-white">
            {back}
          </p>
          <div className="mt-4 w-full border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Explanation</p>
            <p className="mt-1 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
