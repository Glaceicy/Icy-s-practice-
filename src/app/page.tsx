import Link from "next/link";
import { getAdultSession } from "@/lib/auth";

export default async function LandingPage() {
  const session = await getAdultSession();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 text-6xl" aria-hidden="true">
        🧮
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-brand-800 sm:text-5xl">Maths Journey UK</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-700">
        A progressive mathematics learning journey for Years 1&ndash;10, aligned to the National Curriculum for England.
        Short lessons, guided practice and a 95% Mastery Challenge unlock every new level &mdash; built for children,
        loved by parents and teachers.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {session ? (
          <Link href="/profiles" className="touch-target rounded-xl2 bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-brand-700">
            Continue to profiles
          </Link>
        ) : (
          <>
            <Link href="/register" className="touch-target rounded-xl2 bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-brand-700">
              Create a free adult account
            </Link>
            <Link href="/login" className="touch-target rounded-xl2 border-2 border-brand-600 px-8 py-4 text-lg font-semibold text-brand-700 hover:bg-brand-50">
              Sign in
            </Link>
          </>
        )}
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
        <div className="rounded-xl2 border bg-white p-6 shadow-sm">
          <dt className="font-semibold text-brand-700">Years 1&ndash;10</dt>
          <dd className="mt-1 text-sm text-slate-600">100 progressive levels across Key Stages 1&ndash;4, including GCSE-style Foundation and Higher pathways in Year 10.</dd>
        </div>
        <div className="rounded-xl2 border bg-white p-6 shadow-sm">
          <dt className="font-semibold text-brand-700">Built for real learning</dt>
          <dd className="mt-1 text-sm text-slate-600">Short concrete-pictorial-abstract lessons, guided and independent practice, and a 40-question Mastery Challenge to unlock every level.</dd>
        </div>
        <div className="rounded-xl2 border bg-white p-6 shadow-sm">
          <dt className="font-semibold text-brand-700">Safe by design</dt>
          <dd className="mt-1 text-sm text-slate-600">No adverts, no public profiles, no child-to-child messaging. Children use an avatar and a 4-digit PIN &mdash; never an email address.</dd>
        </div>
      </dl>

      <p className="mt-12 text-xs text-slate-400">
        Content coverage: Year 1 Levels 1, 2 and 10, plus Year 4 Level 1, Year 7 Level 1 and Year 10 Level 1 are fully built with
        validated lessons and question banks today. Every other level has its full curriculum structure in place and is clearly
        marked &ldquo;Coming soon&rdquo; while its content is authored using the same engine.
      </p>
    </main>
  );
}
