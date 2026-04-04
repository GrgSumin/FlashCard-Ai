import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import StudySession from "@/components/StudySession";

type Props = {
  params: Promise<{ deckId: string }>;
};

export default async function StudyPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { deckId } = await params;

  const deck = await prisma.deck.findFirst({
    where: { id: deckId, userId: session.user.id },
  });
  if (!deck) redirect("/dashboard");

  const dueCards = await prisma.card.findMany({
    where: {
      deckId,
      dueDate: { lte: new Date() },
    },
    select: { id: true, front: true, back: true, explanation: true },
    orderBy: { dueDate: "asc" },
  });

  if (dueCards.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-10">
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="text-4xl">&#9989;</div>
          <h2 className="text-xl font-bold text-black dark:text-white">All caught up!</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            No cards due for review in this deck.
          </p>
          <Link
            href={`/decks/${deckId}`}
            className="mt-2 rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Back to Deck
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-xl font-bold text-black dark:text-white">{deck.title}</h1>
      <StudySession cards={dueCards} deckId={deckId} />
    </div>
  );
}
