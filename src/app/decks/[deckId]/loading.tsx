export default function DeckLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="h-6 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-8 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-8 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}
