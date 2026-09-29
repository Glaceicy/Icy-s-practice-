import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdult } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getChildSummary } from "@/lib/services/dashboard";
import PrintButton from "@/components/PrintButton";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function ProgressReportPage({ params }: { params: { childId: string } }) {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: params.childId, ownerId: adult.id }, include: { currentYear: true } });
  if (!child) notFound();

  const summary = await getChildSummary(child.id);
  const generatedAt = new Date();
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);
  const dateLocale = locale === "fr" ? "fr-FR" : "en-GB";
  const modeLabel = (mode: string) => translate(locale, `modeLabels.${mode}`);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10 print:py-0">
      <div className="flex items-center justify-between print:hidden">
        <Link href={`/dashboard/child/${child.id}`} className="text-sm font-semibold text-brand-700 underline">
          {t("progressReport.backToDashboard")}
        </Link>
        <PrintButton label={t("progressReport.printOrSave")} />
      </div>

      <article className="mt-6 rounded-xl2 border bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <header className="border-b pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{t("progressReport.reportTitle")}</p>
          <h1 className="mt-1 text-2xl font-bold text-brand-800">{summary.displayName}</h1>
          <p className="text-sm text-slate-500">
            {t("progressReport.generatedOn", { year: summary.currentYearTitle, date: generatedAt.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" }) })}
          </p>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ReportStat label={t("progressReport.levelsUnlocked")} value={summary.levelsUnlocked} />
          <ReportStat label={t("progressReport.levelsPassed")} value={summary.levelsPassed} />
          <ReportStat label={t("progressReport.averageScore")} value={summary.averageScorePercentage !== null ? `${Math.round(summary.averageScorePercentage)}%` : "—"} />
          <ReportStat label={t("progressReport.estMinutes")} value={summary.minutesSpent} />
        </section>

        <section className="mt-6">
          <h2 className="font-bold text-brand-800">{t("progressReport.strengths")}</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {summary.strengths.length === 0 ? <li>{t("progressReport.notEnoughData")}</li> : summary.strengths.map((s, i) => <li key={i}>{s.description}</li>)}
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">{t("progressReport.areasImprovement")}</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {summary.developing.length === 0 ? <li>{t("progressReport.notEnoughData")}</li> : summary.developing.map((s, i) => <li key={i}>{s.description}</li>)}
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">{t("progressReport.misconceptionsObserved")}</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {summary.topMisconceptions.length === 0 ? (
              <li>{t("progressReport.noneRecorded")}</li>
            ) : (
              summary.topMisconceptions.map((m, i) => (
                <li key={i}>
                  {m.label} ({t("progressReport.occurrences", { count: m.count })})
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">{t("progressReport.masteryHistory")}</h2>
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-1">{t("progressReport.colLevel")}</th>
                <th className="py-1">{t("progressReport.colScore")}</th>
                <th className="py-1">{t("progressReport.colResult")}</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentAttempts.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="py-1">{t("progressReport.yearLevelLine", { year: a.yearNumber, number: a.levelNumber, title: a.levelTitle })}</td>
                  <td className="py-1">{Math.round(a.scorePercentage ?? 0)}%</td>
                  <td className="py-1">{a.passed ? t("progressReport.passed") : t("progressReport.notYetPassed")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">{t("progressReport.recentActivity")}</h2>
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-1">{t("progressReport.colDate")}</th>
                <th className="py-1">{t("progressReport.colActivity")}</th>
                <th className="py-1">{t("progressReport.colLevel")}</th>
                <th className="py-1">{t("progressReport.colScore")}</th>
                <th className="py-1">{t("progressReport.colTime")}</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentActivity.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-1 text-slate-500">
                    {t("progressReport.noSessionsYet")}
                  </td>
                </tr>
              ) : (
                summary.recentActivity.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="py-1">{a.completedAt.toLocaleDateString(dateLocale, { day: "numeric", month: "short" })}</td>
                    <td className="py-1">{modeLabel(a.mode)}</td>
                    <td className="py-1">
                      Y{a.yearNumber} L{a.levelNumber}: {a.levelTitle}
                    </td>
                    <td className="py-1">
                      {a.correctCount}/{a.totalQuestions}
                    </td>
                    <td className="py-1">{a.minutes} min</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <p className="mt-8 text-xs text-slate-400">{t("progressReport.footerNote")}</p>
      </article>
    </main>
  );
}

function ReportStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border p-3 text-center">
      <p className="text-xl font-bold text-brand-700">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
