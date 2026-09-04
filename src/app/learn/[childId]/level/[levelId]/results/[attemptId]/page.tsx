import Link from "next/link";
import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MASTERY_PASS_CORRECT, MASTERY_TOTAL_QUESTIONS } from "@/lib/scoring";
import { nextLevelRef } from "@/lib/curriculum";
import ChildTopBar from "@/components/ChildTopBar";

export default async function ResultsPage({ params }: { params: { childId: string; levelId: string; attemptId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const attempt = await prisma.assessmentAttempt.findUnique({
    where: { id: params.attemptId },
    include: {
      level: { include: { schoolYear: true, objectives: true } },
      answers: { include: { questionLog: { include: { template: { include: { objective: true } } } } } }
    }
  });
  if (!attempt || attempt.childId !== child.id || attempt.status !== "SUBMITTED") notFound();

  const weakObjectives = new Map<string, { code: string; description: string; count: number }>();
  for (const a of attempt.answers) {
    if (!a.isCorrect) {
      const obj = a.questionLog.template.objective;
      const existing = weakObjectives.get(obj.id);
      weakObjectives.set(obj.id, { code: obj.code, description: obj.description, count: (existing?.count ?? 0) + 1 });
    }
  }

  const next = nextLevelRef(attempt.level.schoolYear.yearNumber, attempt.level.levelNumber);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />

      <div className={`mt-6 rounded-xl2 p-8 text-center shadow-sm ${attempt.passed ? "bg-leaf-50 border-2 border-leaf-500" : "bg-brand-50 border-2 border-brand-300"}`}>
        <p className="text-5xl" aria-hidden="true">
          {attempt.passed ? "🏆" : "🌟"}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-brand-800">{attempt.passed ? "Fantastic! You passed!" : "You're nearly there!"}</h1>
        <p className="mt-3 text-4xl font-bold text-brand-700">
          {attempt.correctFirstAttempt} / {attempt.totalQuestions}
        </p>
        <p className="text-lg text-slate-600">{Math.round(attempt.scorePercentage ?? 0)}%</p>
        <p className="mt-2 text-sm text-slate-500">
          You need {MASTERY_PASS_CORRECT} out of {MASTERY_TOTAL_QUESTIONS} (95%) to pass and unlock the next level.
        </p>

        {attempt.passed && next && (
          <p className="mt-4 rounded-lg bg-white p-3 font-semibold text-leaf-700">
            🔓 Year {next.year} Level {next.level} is now unlocked!
          </p>
        )}
        {attempt.passed && !next && (
          <p className="mt-4 rounded-lg bg-white p-3 font-semibold text-leaf-700">🎉 You&rsquo;ve completed the whole Maths Journey programme!</p>
        )}
        {!attempt.passed && (
          <p className="mt-4 rounded-lg bg-white p-3 text-brand-800">
            You&rsquo;re nearly there! Let&rsquo;s practise these skills before trying the challenge again.
          </p>
        )}
      </div>

      {weakObjectives.size > 0 && (
        <section className="mt-6 rounded-xl2 border bg-white p-6 shadow-sm">
          <h2 className="font-bold text-brand-800">Skills to keep practising</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {Array.from(weakObjectives.values()).map((o) => (
              <li key={o.code} className="flex justify-between gap-2">
                <span>{o.description}</span>
                <span className="flex-none text-slate-400">{o.count} missed</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {!attempt.passed && (
          <Link
            href={`/learn/${child.id}/level/${attempt.levelId}/revision`}
            className="touch-target flex-1 rounded-xl2 bg-brand-600 px-6 py-3 text-center font-semibold text-white hover:bg-brand-700"
          >
            Start personalised revision
          </Link>
        )}
        <Link
          href={`/learn/${child.id}/level/${attempt.levelId}`}
          className="touch-target flex-1 rounded-xl2 border-2 border-brand-500 px-6 py-3 text-center font-semibold text-brand-700 hover:bg-brand-50"
        >
          Back to level overview
        </Link>
        {attempt.passed && next && (
          <Link
            href={`/learn/${child.id}/journey/${next.year}`}
            className="touch-target flex-1 rounded-xl2 bg-leaf-600 px-6 py-3 text-center font-semibold text-white hover:bg-leaf-700"
          >
            Continue your journey
          </Link>
        )}
      </div>
    </main>
  );
}
