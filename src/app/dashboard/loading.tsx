export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}
