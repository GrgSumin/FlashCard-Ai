import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="max-w-2xl space-y-8 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          FlashCard AI
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Paste your notes, let AI generate flashcards with questions, answers,
          and explanations. Study smarter with spaced repetition that adapts to
          your performance.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
        </div>

        <div className="grid gap-6 pt-8 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="text-2xl">1.</div>
            <h3 className="font-semibold text-black dark:text-white">
              Paste your notes
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Drop in any text — lecture notes, articles, textbook passages.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">2.</div>
            <h3 className="font-semibold text-black dark:text-white">
              AI generates cards
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Gemini creates flashcards with clear questions, answers, and
              explanations.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">3.</div>
            <h3 className="font-semibold text-black dark:text-white">
              Study & remember
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Review with spaced repetition — cards appear when you need them
              most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
