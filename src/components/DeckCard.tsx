import Link from "next/link";

type DeckCardProps = {
  id: string;
  title: string;
  cardCount: number;
  dueCount: number;
  createdAt: Date;
};

export default function DeckCard({ id, title, cardCount, dueCount, createdAt }: DeckCardProps) {
  return (
    <Link
      href={`/decks/${id}`}
      className="block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
    >
      <h3 className="font-semibold text-black dark:text-white">{title}</h3>
      <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span>{cardCount} cards</span>
        {dueCount > 0 && (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {dueCount} due
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
        Created {createdAt.toLocaleDateString()}
      </p>
    </Link>
  );
}
