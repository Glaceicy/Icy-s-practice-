import Link from "next/link";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ChildTopBar from "@/components/ChildTopBar";
import { translate } from "@/lib/i18n/translate";
import { localize } from "@/lib/i18n/content";

const ICONS: Record<string, string> = { star: "⭐", trophy: "🏆" };

export default async function AchievementsPage({ params }: { params: { childId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const achievements = await prisma.achievement.findMany({ where: { childId: child.id }, orderBy: { earnedAt: "desc" } });
  const passedAttempts = await prisma.assessmentAttempt.findMany({
    where: { childId: child.id, passed: true, status: "SUBMITTED" },
    include: { level: { include: { schoolYear: true } } },
    orderBy: { submittedAt: "asc" }
  });
  const locale = child.locale === "fr" ? "fr" : "en";
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);
  const dateLocale = locale === "fr" ? "fr-FR" : "en-GB";

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">{t("achievements.heading")}</h1>
      <p className="mt-1 text-sm text-slate-600">{t("achievements.subtitle")}</p>

      {achievements.length === 0 ? (
        <p className="mt-8 text-slate-500">{t("achievements.noneYet")}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <div key={a.id} className="rounded-xl2 border bg-white p-5 text-center shadow-sm">
              <p className="text-4xl" aria-hidden="true">
                {ICONS[a.iconKey] ?? "⭐"}
              </p>
              <h2 className="mt-1 font-bold text-brand-800">{localize(locale, a.title, a.titleFr)}</h2>
              <p className="mt-1 text-sm text-slate-600">{localize(locale, a.description, a.descriptionFr)}</p>
              <p className="mt-2 text-xs text-slate-400">{new Date(a.earnedAt).toLocaleDateString(dateLocale)}</p>
              {a.certificateAvailable && (
                <Link href={`/learn/${child.id}/achievements/${a.id}/certificate`} className="mt-3 inline-block text-sm font-semibold text-brand-700 underline">
                  {t("achievements.viewCertificate")}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-brand-800">{t("achievements.completedLevels")}</h2>
      {passedAttempts.length === 0 ? (
        <p className="mt-2 text-slate-500">{t("achievements.noLevelsYet")}</p>
      ) : (
        <ol className="mt-3 space-y-1 text-sm text-slate-700">
          {passedAttempts.map((a) => (
            <li key={a.id} className="flex justify-between rounded-lg bg-white px-4 py-2 shadow-sm">
              <span>
                {t("achievements.levelLine", {
                  year: localize(locale, a.level.schoolYear.title, a.level.schoolYear.titleFr),
                  number: a.level.levelNumber,
                  title: localize(locale, a.level.title, a.level.titleFr)
                })}
              </span>
              <span className="text-slate-400">{new Date(a.submittedAt!).toLocaleDateString(dateLocale)}</span>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
