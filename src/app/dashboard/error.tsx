"use client";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-lg font-bold text-black dark:text-white">Something went wrong</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Failed to load your decks.</p>
      <button
        onClick={reset}
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Try again
      </button>
    </div>
  );
}
