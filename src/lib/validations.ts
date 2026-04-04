import { z } from "zod";

export const createDeckSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  sourceText: z.string().min(50, "Text must be at least 50 characters").max(50000, "Text too long (max 50,000 characters)"),
});

export const cardSchema = z.object({
  front: z.string(),
  back: z.string(),
  explanation: z.string(),
});

export const generatedCardsSchema = z.array(cardSchema);

export const reviewSchema = z.object({
  cardId: z.string(),
  rating: z.enum(["again", "hard", "good", "easy"]),
});

export const updateCardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  explanation: z.string().min(1),
});
