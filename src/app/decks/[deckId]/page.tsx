import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import CardEditor from "@/components/CardEditor";
import DeleteDeckButton from "@/components/DeleteDeckButton";

type Props = {
  params: Promise<{ deckId: string }>;
};

export default async function DeckDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { deckId } = await params;

  const deck = await prisma.deck.findFirst({
    where: { id: deckId, userId: session.user.id },
    include: {
      cards: { orderBy: { dueDate: "asc" } },
    },
  });

  if (!deck) redirect("/dashboard");

  const dueCount = deck.cards.filter((c) => c.dueDate <= new Date()).length;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-zinc-500 hover:text-black dark:hover:text-white"
          >
            &larr; Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-black dark:text-white">{deck.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {deck.cards.length} cards &middot; {dueCount} due for review
          </p>
        </div>

        <div className="flex items-center gap-3">
          {dueCount > 0 && (
            <Link
              href={`/decks/${deckId}/study`}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Study Now ({dueCount})
            </Link>
          )}
          <DeleteDeckButton deckId={deckId} />
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {deck.cards.length === 0 ? (
          <p className="py-10 text-center text-zinc-500">No cards in this deck.</p>
        ) : (
          deck.cards.map((card) => (
            <CardEditor
              key={card.id}
              id={card.id}
              front={card.front}
              back={card.back}
              explanation={card.explanation}
            />
          ))
        )}
      </div>
    </div>
  );
}
