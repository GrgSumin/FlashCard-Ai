import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeckCard from "@/components/DeckCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const decks = await prisma.deck.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { cards: true } },
      cards: {
        where: { dueDate: { lte: new Date() } },
        select: { id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">Your Decks</h1>
        <Link
          href="/decks/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          + New Deck
        </Link>
      </div>

      {decks.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">No decks yet.</p>
          <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
            Create your first deck by pasting your notes.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              id={deck.id}
              title={deck.title}
              cardCount={deck._count.cards}
              dueCount={deck.cards.length}
              createdAt={deck.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
