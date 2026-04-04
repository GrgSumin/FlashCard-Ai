import Groq from "groq-sdk";
import { generatedCardsSchema } from "@/lib/validations";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function generateFlashcards(sourceText: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a flashcard generator. Create flashcards from study notes.

Each flashcard must have:
- "front": A clear question testing one concept
- "back": A concise, correct answer
- "explanation": A brief explanation that teaches WHY the answer is correct

Generate flashcards based on content length:
- Short text (under 1000 chars): 5-10 cards
- Medium text (1000-5000 chars): 10-20 cards
- Long text (5000+ chars): 20-40 cards

Return ONLY a valid JSON array. No markdown, no code fences, no extra text.
Example: [{"front":"What is X?","back":"X is Y","explanation":"Because..."}]`,
      },
      {
        role: "user",
        content: sourceText,
      },
    ],
    temperature: 0.3,
    max_tokens: 8000,
  });

  const text = completion.choices[0]?.message?.content?.trim() || "";

  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");

  const parsed = JSON.parse(cleaned);
  return generatedCardsSchema.parse(parsed);
}
