"use client";

import { useTransition } from "react";
import { deleteDeck } from "@/lib/actions/deck";

export default function DeleteDeckButton({ deckId }: { deckId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this deck and all its cards?")) return;
    startTransition(() => deleteDeck(deckId));
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
    >
      {isPending ? "Deleting..." : "Delete Deck"}
    </button>
  );
}
