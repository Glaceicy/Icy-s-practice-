import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdult } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getChildSummary } from "@/lib/services/dashboard";
import { setLearningGoalAction, resetPracticeActivityAction, updateAccessibilitySettingsAsAdultAction } from "@/lib/actions/children";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function ChildDashboardPage({ params }: { params: { childId: string } }) {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: params.childId, ownerId: adult.id } });
  if (!child) notFound();

  const summary = await getChildSummary(child.id);
  const goals = await prisma.learningGoal.findMany({ where: { childId: child.id }, orderBy: { createdAt: "desc" }, take: 5 });
  const unlockedLevels = await prisma.levelUnlock.findMany({
    where: { childId: child.id },
    include: { level: { include: { schoolYear: true } } },
    orderBy: { unlockedAt: "desc" },
    take: 6
  });
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);
  const dateLocale = locale === "fr" ? "fr-FR" : "en-GB";
  const modeLabel = (mode: string) => translate(locale, `modeLabels.${mode}`);

  async function saveGoal(formData: FormData) {
    "use server";
    await setLearningGoalAction(child!.id, formData);
  }

  async function saveAccessibility(formData: FormData) {
    "use server";
    await updateAccessibilitySettingsAsAdultAction(child!.id, formData);
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <Link href="/dashboard" className="text-sm font-semibold text-brand-700 underline">
        {t("childDashboard.allLearners")}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">{t("childDashboard.progressHeading", { name: summary.displayName })}</h1>

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label={t("dashboard.levelsUnlocked")} value={summary.levelsUnlocked} />
        <Stat label={t("dashboard.levelsPassed")} value={summary.levelsPassed} />
        <Stat label={t("childDashboard.masteryAttempts")} value={summary.totalAssessmentAttempts} />
        <Stat label={t("childDashboard.estMinutes")} value={summary.minutesSpent} />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-leaf-700">{t("childDashboard.strengths")}</h2>
          {summary.strengths.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">{t("childDashboard.notEnoughData")}</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {summary.strengths.map((s, i) => (
                <li key={i}>✅ {s.description}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-amber-700">{t("childDashboard.areasImprovement")}</h2>
          {summary.developing.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">{t("childDashboard.notEnoughData")}</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {summary.developing.map((s, i) => (
                <li key={i}>📈 {s.description}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {summary.topMisconceptions.length > 0 && (
        <section className="mt-6 rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-brand-800">{t("childDashboard.commonMisconceptions")}</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {summary.topMisconceptions.map((m, i) => (
              <li key={i} className="flex justify-between">
                <span>{m.label}</span>
                <span className="text-slate-400">{m.count}×</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 rounded-xl2 border bg-white p-5 shadow-sm">
        <h2 className="font-bold text-brand-800">{t("childDashboard.recentMasteryAttempts")}</h2>
        {summary.recentAttempts.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">{t("childDashboard.noAttemptsYet")}</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {summary.recentAttempts.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>{t("childDashboard.yearLevelLine", { year: a.yearNumber, number: a.levelNumber, title: a.levelTitle })}</span>
                <span className={a.passed ? "font-semibold text-leaf-600" : "text-slate-500"}>{Math.round(a.scorePercentage ?? 0)}%</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-xl2 border bg-white p-5 shadow-sm">
        <h2 className="font-bold text-brand-800">{t("childDashboard.recentActivity")}</h2>
        <p className="mt-1 text-xs text-slate-500">{t("childDashboard.recentActivitySubtitle")}</p>
        {summary.recentActivity.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">{t("childDashboard.noSessionsYet")}</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {summary.recentActivity.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b pb-2 last:border-0 last:pb-0">
                <span>
                  <span className="font-semibold">{modeLabel(a.mode)}</span> &middot; {t("childDashboard.yearLevelLine", { year: a.yearNumber, number: a.levelNumber, title: a.levelTitle })}
                </span>
                <span className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{t("childDashboard.correctOf", { correct: a.correctCount, total: a.totalQuestions })}</span>
                  {a.hintsUsed > 0 && <span>{t(a.hintsUsed === 1 ? "childDashboard.hintOne" : "childDashboard.hintMany", { count: a.hintsUsed })}</span>}
                  <span>{t("childDashboard.aboutMinutes", { minutes: a.minutes })}</span>
                  <span>{a.completedAt.toLocaleDateString(dateLocale, { day: "numeric", month: "short" })}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-xl2 border bg-white p-5 shadow-sm">
        <h2 className="font-bold text-brand-800">{t("childDashboard.resetActivity")}</h2>
        <p className="mt-1 text-xs text-slate-500">{t("childDashboard.resetActivitySubtitle")}</p>
        <ul className="mt-3 space-y-2">
          {unlockedLevels.map((u) => (
            <li key={u.levelId} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>
                {u.level.schoolYear.title}, Level {u.level.levelNumber}: {u.level.title}
              </span>
              <span className="flex gap-2">
                {(["GUIDED", "INDEPENDENT"] as const).map((mode) => {
                  async function reset() {
                    "use server";
                    await resetPracticeActivityAction(child!.id, u.levelId, mode);
                  }
                  return (
                    <form action={reset} key={mode}>
                      <button type="submit" className="rounded border px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                        {t("childDashboard.resetButton", { mode: mode.toLowerCase() })}
                      </button>
                    </form>
                  );
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-brand-800">{t("childDashboard.setGoal")}</h2>
          <form action={saveGoal} className="mt-3 space-y-3 text-sm">
            <input name="description" placeholder={t("childDashboard.goalPlaceholder")} required className="w-full rounded-lg border px-3 py-2" />
            <select name="targetType" className="w-full rounded-lg border px-3 py-2">
              <option value="levels_per_week">{t("childDashboard.targetLevelsPerWeek")}</option>
              <option value="minutes_per_week">{t("childDashboard.targetMinutesPerWeek")}</option>
              <option value="objective_focus">{t("childDashboard.targetObjectiveFocus")}</option>
            </select>
            <input name="targetValue" type="number" min={1} defaultValue={1} required className="w-full rounded-lg border px-3 py-2" />
            <button type="submit" className="touch-target rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
              {t("childDashboard.saveGoal")}
            </button>
          </form>
          {goals.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-slate-500">
              {goals.map((g) => (
                <li key={g.id}>{t("childDashboard.goalLine", { description: g.description, value: g.targetValue, type: g.targetType.replace(/_/g, " ") })}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-brand-800">{t("childDashboard.accessibilityAudioSettings")}</h2>
          <form action={saveAccessibility} className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="fontMode" value="STANDARD" defaultChecked={child.fontMode === "STANDARD"} /> {t("childDashboard.standardFont")}
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="fontMode" value="DYSLEXIC" defaultChecked={child.fontMode === "DYSLEXIC"} /> {t("childDashboard.dyslexicFont")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="highContrast" value="on" defaultChecked={child.highContrast} /> {t("childDashboard.highContrast")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="reducedMotion" value="on" defaultChecked={child.reducedMotion} /> {t("childDashboard.reduceMotion")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="soundMuted" value="on" defaultChecked={child.soundMuted} /> {t("childDashboard.muteSound")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="readAloud" value="on" defaultChecked={child.readAloud} /> {t("childDashboard.readAloudDefault")}
            </label>
            <input type="range" name="audioVolume" min={0} max={100} defaultValue={child.audioVolume} className="w-full" />
            <button type="submit" className="touch-target rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
              {t("childDashboard.save")}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl2 border bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-brand-700">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
