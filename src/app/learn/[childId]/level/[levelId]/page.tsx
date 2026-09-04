import Link from "next/link";
import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ChildTopBar from "@/components/ChildTopBar";

export default async function LevelOverviewPage({ params }: { params: { childId: string; levelId: string } }) {
  const { child } = await assertChildAccess(params.childId);

  const level = await prisma.level.findUnique({
    where: { id: params.levelId },
    include: { schoolYear: true, objectives: true, lessons: { orderBy: { order: "asc" } } }
  });
  if (!level) notFound();

  const unlock = await prisma.levelUnlock.findUnique({ where: { childId_levelId: { childId: child.id, levelId: level.id } } });
  if (!unlock) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
        <ChildTopBar child={child} />
        <div className="mt-8 rounded-xl2 border bg-amber-50 p-6 text-amber-800">
          <h1 className="text-xl font-bold">This level is still locked</h1>
          <p className="mt-2">Score 95% or more in the previous level to unlock this level.</p>
          <Link href={`/learn/${child.id}/journey/${level.schoolYear.yearNumber}`} className="mt-4 inline-block font-semibold text-brand-700 underline">
            Back to the journey map
          </Link>
        </div>
      </main>
    );
  }

  if (level.status !== "COMPLETE") {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
        <ChildTopBar child={child} />
        <div className="mt-8 rounded-xl2 border bg-amber-50 p-6 text-amber-800">
          <h1 className="text-xl font-bold">Coming soon</h1>
          <p className="mt-2">
            {level.title} is unlocked, but its lessons and questions are still being written. Please check back soon &mdash; in the
            meantime, explore an available level from the journey map.
          </p>
          <Link href={`/learn/${child.id}/journey/${level.schoolYear.yearNumber}`} className="mt-4 inline-block font-semibold text-brand-700 underline">
            Back to the journey map
          </Link>
        </div>
      </main>
    );
  }

  const recentAttempts = await prisma.assessmentAttempt.findMany({
    where: { childId: child.id, levelId: level.id, status: "SUBMITTED" },
    orderBy: { submittedAt: "desc" },
    take: 3
  });

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <ChildTopBar child={child} />

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-600">
        {level.schoolYear.title} &middot; Level {level.levelNumber}
      </p>
      <h1 className="text-3xl font-extrabold text-brand-800">{level.title}</h1>
      <p className="mt-2 text-slate-700">{level.summary}</p>

      <section aria-labelledby="objectives-heading" className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <h2 id="objectives-heading" className="font-bold text-brand-800">
          What you will learn
        </h2>
        <ul className="mt-3 space-y-2">
          {level.objectives.map((o) => (
            <li key={o.id} className="flex gap-2 text-slate-700">
              <span aria-hidden="true">🎯</span>
              <span>By the end of this level, you will be able to {o.description.charAt(0).toLowerCase() + o.description.slice(1)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href={`/learn/${child.id}/level/${level.id}/lesson/1`} className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <p className="text-2xl">📖</p>
          <h3 className="mt-1 font-bold">Lessons</h3>
          <p className="text-sm text-slate-600">{level.lessons.length} short lessons explaining each idea, with worked examples.</p>
        </Link>
        <Link href={`/learn/${child.id}/level/${level.id}/guided`} className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <p className="text-2xl">🖐️</p>
          <h3 className="mt-1 font-bold">Guided practice</h3>
          <p className="text-sm text-slate-600">10 questions with hints available if you need them.</p>
        </Link>
        <Link href={`/learn/${child.id}/level/${level.id}/independent`} className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <p className="text-2xl">✏️</p>
          <h3 className="mt-1 font-bold">Independent practice</h3>
          <p className="text-sm text-slate-600">At least 20 questions that adapt to how you&rsquo;re doing.</p>
        </Link>
        <Link href={`/learn/${child.id}/level/${level.id}/mastery`} className="rounded-xl2 border-2 border-sunny-500 bg-sunny-50 p-5 shadow-sm hover:border-sunny-600">
          <p className="text-2xl">🏆</p>
          <h3 className="mt-1 font-bold">Mastery Challenge</h3>
          <p className="text-sm text-slate-600">40 questions in 4 rounds. Score 38/40 (95%) to unlock the next level.</p>
        </Link>
      </section>

      {recentAttempts.length > 0 && (
        <section className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
          <h2 className="font-bold text-brand-800">Your previous Mastery Challenge attempts</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            {recentAttempts.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>Attempt {a.attemptNumber}</span>
                <span className={a.passed ? "font-semibold text-leaf-600" : "text-slate-500"}>
                  {a.correctFirstAttempt}/{a.totalQuestions} ({Math.round(a.scorePercentage ?? 0)}%) {a.passed ? "— Passed" : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
