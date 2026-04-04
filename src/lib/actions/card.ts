"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sm2, type Rating } from "@/lib/sm2";
import { updateCardSchema } from "@/lib/validations";

async function verifyCardOwnership(cardId: string, userId: string) {
  const card = await prisma.card.findFirst({
    where: { id: cardId, deck: { userId } },
    include: { deck: true },
  });
  if (!card) throw new Error("Card not found");
  return card;
}

export async function reviewCard(cardId: string, rating: Rating) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const card = await verifyCardOwnership(cardId, session.user.id);

  const result = sm2(rating, card.interval, card.easeFactor, card.reviewCount);

  await prisma.card.update({
    where: { id: cardId },
    data: {
      interval: result.interval,
      easeFactor: result.easeFactor,
      dueDate: result.dueDate,
      reviewCount: card.reviewCount + 1,
    },
  });

  return result;
}

export async function updateCard(cardId: string, data: { front: string; back: string; explanation: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await verifyCardOwnership(cardId, session.user.id);
  const validated = updateCardSchema.parse(data);

  await prisma.card.update({
    where: { id: cardId },
    data: validated,
  });
}

export async function deleteCard(cardId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await verifyCardOwnership(cardId, session.user.id);
  await prisma.card.delete({ where: { id: cardId } });
}
