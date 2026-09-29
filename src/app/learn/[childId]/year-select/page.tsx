import Link from "next/link";
import { assertChildAccess } from "@/lib/auth";
import { getJourneyForChild } from "@/lib/services/journey";
import ChildTopBar from "@/components/ChildTopBar";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function YearSelectPage({ params }: { params: { childId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const years = await getJourneyForChild(child.id);
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">{t("yearSelect.title")}</h1>
      <p className="mt-1 text-sm text-slate-600">
        {t("yearSelect.currentlyLearning", { name: child.displayName, year: years.find((y) => y.isCurrentYear)?.title ?? "" })}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {years.map((year) => {
          const accessible = year.levelsUnlockedCount > 0;
          return (
            <Link
              key={year.yearNumber}
              href={accessible ? `/learn/${child.id}/journey/${year.yearNumber}` : "#"}
              aria-disabled={!accessible}
              className={`rounded-xl2 border p-5 shadow-sm ${
                accessible ? "bg-white hover:border-brand-400" : "pointer-events-none bg-slate-100 text-slate-400"
              } ${year.isCurrentYear ? "ring-2 ring-brand-500" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{year.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{year.keyStage}</span>
              </div>
              <p className="mt-1 text-sm">{year.summary}</p>
              <p className="mt-3 text-xs font-semibold text-brand-700">
                {accessible ? t("yearSelect.levelsPassed", { count: year.levelsPassedCount }) : t("yearSelect.lockedHint")}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
