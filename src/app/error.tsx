"use client";

import Link from "next/link";

/**
 * What a family sees when a page throws.
 *
 * Without this, Next renders its own bare "Application error: a server-side
 * exception has occurred" — grey text on white, no navigation, no way back.
 * A child who hits that is simply stuck, and a parent has nothing to report
 * beyond "it broke".
 *
 * Deliberately plain text rather than the dictionary: this renders when
 * something has already gone wrong, and a translation lookup is one more
 * thing that could fail inside an error boundary.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16 text-center">
      <p className="text-5xl" aria-hidden="true">
        🦊
      </p>
      <h1 className="mt-4 text-2xl font-bold text-brand-800">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-600">
        Sorry — this page didn&apos;t load. Nothing has been lost, and your progress is safe.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={reset}
          className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700"
        >
          Try again
        </button>
        <Link
          href="/profiles"
          className="touch-target w-full rounded-xl2 border-2 border-brand-500 px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
        >
          Back to profiles
        </Link>
      </div>

      {/* The digest is the only handle on what actually happened — it is what
          matches this render to a line in the server logs, so it is shown
          rather than hidden, for someone reporting the problem to quote. */}
      {error.digest && <p className="mt-8 text-xs text-slate-400">Reference: {error.digest}</p>}
    </main>
  );
}
