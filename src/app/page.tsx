export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-5xl text-center">
          FlashCard AI
        </h1>
        <p className="max-w-md text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Paste your notes, let AI generate flashcards, and study smarter with spaced repetition.
        </p>
      </main>
    </div>
  );
}
