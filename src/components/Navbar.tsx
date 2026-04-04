"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-lg font-bold text-black dark:text-white">
          FlashCard AI
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="h-7 w-7 rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
