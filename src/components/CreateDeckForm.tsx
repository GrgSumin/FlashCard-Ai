"use client";

import { useState, useRef, useActionState } from "react";
import { createDeck } from "@/lib/actions/deck";

export default function CreateDeckForm() {
  const [sourceText, setSourceText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [error, action, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        await createDeck(formData);
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : "Something went wrong. Try again.";
      }
    },
    null
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to parse PDF");
      }

      const { text } = await res.json();
      setSourceText(text);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to parse PDF");
      setFileName(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={action} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-black dark:text-white">
          Deck Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="e.g. Biology Chapter 5"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-white"
        />
      </div>

      {/* PDF Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black dark:text-white">
          Upload PDF or paste text
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          {uploading ? (
            <p className="text-sm text-zinc-500">Parsing PDF...</p>
          ) : fileName ? (
            <div className="text-center">
              <p className="text-sm font-medium text-black dark:text-white">{fileName}</p>
              <p className="mt-1 text-xs text-emerald-600">PDF loaded — text extracted below</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Click to upload a PDF (up to 50 pages)
              </p>
              <p className="mt-1 text-xs text-zinc-400">or paste your text below</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="sourceText" className="block text-sm font-medium text-black dark:text-white">
          Your Notes
        </label>
        <textarea
          id="sourceText"
          name="sourceText"
          required
          rows={10}
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Paste your lecture notes, article, or any text here (min 50 characters)..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-white"
        />
        {sourceText.length > 0 && (
          <p className="text-xs text-zinc-400">
            {sourceText.length.toLocaleString()} characters
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || uploading}
        className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {isPending ? "Generating flashcards..." : "Generate Flashcards"}
      </button>
    </form>
  );
}
