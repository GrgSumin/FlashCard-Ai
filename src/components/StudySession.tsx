"use client";

import { useState, useTransition } from "react";
import FlashCard from "@/components/FlashCard";
import { reviewCard } from "@/lib/actions/card";
import type { Rating } from "@/lib/sm2";
import Link from "next/link";

type Card = {
  id: string;
  front: string;
  back: string;
  explanation: string;
};

type StudySessionProps = {
  cards: Card[];
  deckId: string;
};

const RATING_BUTTONS: { rating: Rating; label: string; color: string }[] = [
  { rating: "again", label: "Again", color: "bg-red-500 hover:bg-red-600 text-white" },
  { rating: "hard", label: "Hard", color: "bg-orange-500 hover:bg-orange-600 text-white" },
  { rating: "good", label: "Good", color: "bg-blue-500 hover:bg-blue-600 text-white" },
  { rating: "easy", label: "Easy", color: "bg-emerald-500 hover:bg-emerald-600 text-white" },
];

export default function StudySession({ cards, deckId }: StudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentCard = cards[currentIndex];
  const isComplete = currentIndex >= cards.length;

  const handleRate = (rating: Rating) => {
    startTransition(async () => {
      await reviewCard(currentCard.id, rating);
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
    });
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <div className="text-4xl">&#127881;</div>
        <h2 className="text-xl font-bold text-black dark:text-white">Session complete!</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          You reviewed {cards.length} card{cards.length !== 1 ? "s" : ""}.
        </p>
        <Link
          href={`/decks/${deckId}`}
          className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Back to Deck
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-2 rounded-full bg-black transition-all dark:bg-white"
            style={{ width: `${(currentIndex / cards.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-zinc-500">
          {currentIndex + 1}/{cards.length}
        </span>
      </div>

      {/* Card */}
      <FlashCard
        key={currentCard.id}
        front={currentCard.front}
        back={currentCard.back}
        explanation={currentCard.explanation}
        onFlip={setIsFlipped}
      />

      {/* Rating buttons — show after flip */}
      {isFlipped && (
        <div className="flex justify-center gap-3">
          {RATING_BUTTONS.map(({ rating, label, color }) => (
            <button
              key={rating}
              onClick={() => handleRate(rating)}
              disabled={isPending}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${color}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {!isFlipped && (
        <p className="text-center text-sm text-zinc-400">
          Tap the card to reveal the answer
        </p>
      )}
    </div>
  );
}
