import CreateDeckForm from "@/components/CreateDeckForm";

export default function NewDeckPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold text-black dark:text-white">Create New Deck</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Paste your notes below and AI will generate flashcards for you.
      </p>
      <div className="mt-8">
        <CreateDeckForm />
      </div>
    </div>
  );
}
