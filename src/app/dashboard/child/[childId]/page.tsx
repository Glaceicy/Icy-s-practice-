import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdult } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getChildSummary } from "@/lib/services/dashboard";
import { setLearningGoalAction, resetPracticeActivityAction, updateAccessibilitySettingsAsAdultAction } from "@/lib/actions/children";

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
        ← All learners
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">{summary.displayName}&rsquo;s progress</h1>

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Levels unlocked" value={summary.levelsUnlocked} />
        <Stat label="Levels passed" value={summary.levelsPassed} />
        <Stat label="Mastery attempts" value={summary.totalAssessmentAttempts} />
        <Stat label="Est. minutes" value={summary.minutesSpent} />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-leaf-700">Strengths</h2>
          {summary.strengths.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Not enough data yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {summary.strengths.map((s, i) => (
                <li key={i}>✅ {s.description}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-amber-700">Areas needing improvement</h2>
          {summary.developing.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Not enough data yet.</p>
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
          <h2 className="font-bold text-brand-800">Common misconceptions</h2>
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
        <h2 className="font-bold text-brand-800">Recent Mastery Challenge attempts</h2>
        {summary.recentAttempts.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No attempts yet.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {summary.recentAttempts.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>
                  Year {a.yearNumber}, Level {a.levelNumber}: {a.levelTitle}
                </span>
                <span className={a.passed ? "font-semibold text-leaf-600" : "text-slate-500"}>{Math.round(a.scorePercentage ?? 0)}%</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-xl2 border bg-white p-5 shadow-sm">
        <h2 className="font-bold text-brand-800">Reset a practice activity</h2>
        <p className="mt-1 text-xs text-slate-500">Clears in-progress guided/independent practice for an unlocked level so your child can start fresh.</p>
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
                        Reset {mode.toLowerCase()}
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
          <h2 className="font-bold text-brand-800">Set a learning goal</h2>
          <form action={saveGoal} className="mt-3 space-y-3 text-sm">
            <input name="description" placeholder="e.g. Practise times tables" required className="w-full rounded-lg border px-3 py-2" />
            <select name="targetType" className="w-full rounded-lg border px-3 py-2">
              <option value="levels_per_week">Levels per week</option>
              <option value="minutes_per_week">Minutes per week</option>
              <option value="objective_focus">Focus objective (sessions)</option>
            </select>
            <input name="targetValue" type="number" min={1} defaultValue={1} required className="w-full rounded-lg border px-3 py-2" />
            <button type="submit" className="touch-target rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
              Save goal
            </button>
          </form>
          {goals.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-slate-500">
              {goals.map((g) => (
                <li key={g.id}>
                  {g.description} — target {g.targetValue} ({g.targetType.replace(/_/g, " ")})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl2 border bg-white p-5 shadow-sm">
          <h2 className="font-bold text-brand-800">Accessibility &amp; audio settings</h2>
          <form action={saveAccessibility} className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="fontMode" value="STANDARD" defaultChecked={child.fontMode === "STANDARD"} /> Standard font
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="fontMode" value="DYSLEXIC" defaultChecked={child.fontMode === "DYSLEXIC"} /> Dyslexia-friendly font
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="highContrast" value="on" defaultChecked={child.highContrast} /> High contrast
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="reducedMotion" value="on" defaultChecked={child.reducedMotion} /> Reduce motion
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="soundMuted" value="on" defaultChecked={child.soundMuted} /> Mute sound
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="readAloud" value="on" defaultChecked={child.readAloud} /> Read aloud by default
            </label>
            <input type="range" name="audioVolume" min={0} max={100} defaultValue={child.audioVolume} className="w-full" />
            <button type="submit" className="touch-target rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
              Save
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
