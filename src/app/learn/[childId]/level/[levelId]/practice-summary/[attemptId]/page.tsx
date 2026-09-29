import Link from "next/link";
import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getWrongAnswersForPracticeAttempt } from "@/lib/services/practice";
import ChildTopBar from "@/components/ChildTopBar";
import WrongAnswerReviewPanel from "@/components/WrongAnswerReviewPanel";
import Mascot from "@/components/illustrations/Mascot";

const NEXT_STEP: Record<string, { href: (childId: string, levelId: string) => string; label: string }> = {
  GUIDED: { href: (childId, levelId) => `/learn/${childId}/level/${levelId}/independent`, label: "Start independent practice" },
  INDEPENDENT: { href: (childId, levelId) => `/learn/${childId}/level/${levelId}/mastery`, label: "Take the Mastery Challenge" },
  REVISION: { href: (childId, levelId) => `/learn/${childId}/level/${levelId}/mastery`, label: "Try the Mastery Challenge again" }
};

export default async function PracticeSummaryPage({ params }: { params: { childId: string; levelId: string; attemptId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const attempt = await prisma.practiceAttempt.findUnique({ where: { id: params.attemptId } });
  if (!attempt || attempt.childId !== child.id || !attempt.completedAt) notFound();

  const wrongAnswers = await getWrongAnswersForPracticeAttempt(attempt.id, child.locale === "fr" ? "fr" : "en");
  const nextStep = NEXT_STEP[attempt.mode] ?? NEXT_STEP.INDEPENDENT!;
  const modeLabel = attempt.mode === "GUIDED" ? "Guided practice" : attempt.mode === "REVISION" ? "Personalised revision" : "Independent practice";

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />

      <div className="mt-6 rounded-xl2 border-2 border-leaf-500 bg-leaf-50 p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <Mascot mood="cheer" className="h-24 w-24 animate-pop-in" />
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-brand-800">{modeLabel} complete!</h1>
        <p className="mt-3 text-4xl font-bold text-brand-700">
          {attempt.correctCount} / {attempt.totalQuestions}
        </p>
        <p className="text-lg text-slate-600">questions answered correctly</p>
      </div>

      {wrongAnswers.length > 0 && (
        <section className="mt-6 rounded-xl2 border bg-white p-6 text-center shadow-sm">
          <h2 className="font-bold text-brand-800">Want to look back at the tricky ones?</h2>
          <p className="mt-1 text-sm text-slate-600">See every question you found tricky, with the correct answer and explanation.</p>
          <div className="mt-3 flex justify-center">
            <WrongAnswerReviewPanel items={wrongAnswers} triggerLabel={`📋 Review ${wrongAnswers.length} tricky question${wrongAnswers.length === 1 ? "" : "s"}`} />
          </div>
        </section>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={nextStep.href(child.id, attempt.levelId)}
          className="touch-target flex-1 rounded-xl2 bg-brand-600 px-6 py-3 text-center font-semibold text-white hover:bg-brand-700"
        >
          {nextStep.label}
        </Link>
        <Link
          href={`/learn/${child.id}/level/${attempt.levelId}`}
          className="touch-target flex-1 rounded-xl2 border-2 border-brand-500 px-6 py-3 text-center font-semibold text-brand-700 hover:bg-brand-50"
        >
          Back to level overview
        </Link>
      </div>
    </main>
  );
}
