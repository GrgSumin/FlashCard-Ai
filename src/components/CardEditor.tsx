"use client";

import { useState, useTransition } from "react";
import { updateCard, deleteCard } from "@/lib/actions/card";

type CardEditorProps = {
  id: string;
  front: string;
  back: string;
  explanation: string;
};

export default function CardEditor({ id, front, back, explanation }: CardEditorProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ front, back, explanation });
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  const handleSave = () => {
    startTransition(async () => {
      await updateCard(id, form);
      setEditing(false);
    });
  };

  const handleDelete = () => {
    if (!confirm("Delete this card?")) return;
    startTransition(async () => {
      await deleteCard(id);
      setDeleted(true);
    });
  };

  if (editing) {
    return (
      <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-500">Front</label>
          <input
            value={form.front}
            onChange={(e) => setForm({ ...form, front: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-500">Back</label>
          <input
            value={form.back}
            onChange={(e) => setForm({ ...form, back: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-500">Explanation</label>
          <textarea
            value={form.explanation}
            onChange={(e) => setForm({ ...form, explanation: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black"
          >
            Save
          </button>
          <button
            onClick={() => {
              setForm({ front, back, explanation });
              setEditing(false);
            }}
            className="rounded-lg px-3 py-1.5 text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-black dark:text-white">{front}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{back}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">{explanation}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg px-2.5 py-1 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg px-2.5 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
