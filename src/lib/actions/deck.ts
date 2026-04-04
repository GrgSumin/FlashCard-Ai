"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createDeckSchema } from "@/lib/validations";
import { generateFlashcards } from "@/lib/gemini";
import { redirect } from "next/navigation";

export async function createDeck(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const input = createDeckSchema.parse({
    title: formData.get("title"),
    sourceText: formData.get("sourceText"),
  });

  const cards = await generateFlashcards(input.sourceText);

  const deck = await prisma.deck.create({
    data: {
      title: input.title,
      sourceText: input.sourceText,
      userId: session.user.id,
      cards: {
        create: cards.map((card) => ({
          front: card.front,
          back: card.back,
          explanation: card.explanation,
        })),
      },
    },
  });

  redirect(`/decks/${deck.id}`);
}

export async function deleteDeck(deckId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const deck = await prisma.deck.findFirst({
    where: { id: deckId, userId: session.user.id },
  });
  if (!deck) throw new Error("Deck not found");

  await prisma.deck.delete({ where: { id: deckId } });
  redirect("/dashboard");
}
