import Link from "next/link";
import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ChildTopBar from "@/components/ChildTopBar";
import Mascot from "@/components/illustrations/Mascot";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";
import { localize } from "@/lib/i18n/content";

export default async function LevelOverviewPage({ params }: { params: { childId: string; levelId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);

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
          <h1 className="text-xl font-bold">{t("levelOverview.lockedTitle")}</h1>
          <p className="mt-2">{t("levelOverview.lockedBody")}</p>
          <Link href={`/learn/${child.id}/journey/${level.schoolYear.yearNumber}`} className="mt-4 inline-block font-semibold text-brand-700 underline">
            {t("levelOverview.backToJourney")}
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
          <h1 className="text-xl font-bold">{t("levelOverview.comingSoonTitle")}</h1>
          <p className="mt-2">{t("levelOverview.comingSoonBody", { level: localize(locale, level.title, level.titleFr) })}</p>
          <Link href={`/learn/${child.id}/journey/${level.schoolYear.yearNumber}`} className="mt-4 inline-block font-semibold text-brand-700 underline">
            {t("levelOverview.backToJourney")}
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

      <div className="mt-6 flex items-center gap-4">
        <Mascot mood="wave" className="h-20 w-20 flex-none animate-pop-in" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t("levelOverview.yearLevelCaption", { year: localize(locale, level.schoolYear.title, level.schoolYear.titleFr), number: level.levelNumber })}
          </p>
          <h1 className="text-3xl font-extrabold text-brand-800">{localize(locale, level.title, level.titleFr)}</h1>
        </div>
      </div>
      <p className="mt-2 text-slate-700">{localize(locale, level.summary, level.summaryFr)}</p>

      <section aria-labelledby="objectives-heading" className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <h2 id="objectives-heading" className="font-bold text-brand-800">
          {t("levelOverview.whatYouWillLearn")}
        </h2>
        <ul className="mt-3 space-y-2">
          {level.objectives.map((o) => {
            const description = localize(locale, o.description, o.descriptionFr);
            return (
              <li key={o.id} className="flex gap-2 text-slate-700">
                <span aria-hidden="true">✅</span>
                <span>{t("levelOverview.objectivePrefix", { objective: description.charAt(0).toLowerCase() + description.slice(1) })}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href={`/learn/${child.id}/level/${level.id}/lesson/1`} className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <p className="text-2xl">📖</p>
          <h3 className="mt-1 font-bold">{t("levelOverview.lessonsTitle")}</h3>
          <p className="text-sm text-slate-600">{t("levelOverview.lessonsBody", { count: level.lessons.length })}</p>
        </Link>
        <Link href={`/learn/${child.id}/level/${level.id}/guided`} className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <p className="text-2xl">🖐️</p>
          <h3 className="mt-1 font-bold">{t("levelOverview.guidedTitle")}</h3>
          <p className="text-sm text-slate-600">{t("levelOverview.guidedBody")}</p>
        </Link>
        <Link href={`/learn/${child.id}/level/${level.id}/independent`} className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <p className="text-2xl">✏️</p>
          <h3 className="mt-1 font-bold">{t("levelOverview.independentTitle")}</h3>
          <p className="text-sm text-slate-600">{t("levelOverview.independentBody")}</p>
        </Link>
        <Link href={`/learn/${child.id}/level/${level.id}/mastery`} className="rounded-xl2 border-2 border-sunny-500 bg-sunny-50 p-5 shadow-sm hover:border-sunny-600">
          <p className="text-2xl">🏆</p>
          <h3 className="mt-1 font-bold">{t("levelOverview.masteryTitle")}</h3>
          <p className="text-sm text-slate-600">{t("levelOverview.masteryBody")}</p>
        </Link>
      </section>

      {recentAttempts.length > 0 && (
        <section className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
          <h2 className="font-bold text-brand-800">{t("levelOverview.previousAttemptsTitle")}</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            {recentAttempts.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>{t("levelOverview.attemptLabel", { number: a.attemptNumber })}</span>
                <span className={a.passed ? "font-semibold text-leaf-600" : "text-slate-500"}>
                  {a.correctFirstAttempt}/{a.totalQuestions} ({Math.round(a.scorePercentage ?? 0)}%) {a.passed ? t("levelOverview.passedSuffix") : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
