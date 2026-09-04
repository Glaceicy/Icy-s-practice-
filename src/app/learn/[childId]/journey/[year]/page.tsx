import Link from "next/link";
import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { getJourneyForChild } from "@/lib/services/journey";
import ChildTopBar from "@/components/ChildTopBar";

const THEME_BG: Record<string, string> = {
  playful: "from-sunny-400 to-berry-400",
  adventure: "from-leaf-500 to-brand-500",
  gameinspired: "from-brand-600 to-berry-500",
  mature: "from-slate-700 to-brand-800"
};

export default async function YearJourneyPage({ params }: { params: { childId: string; year: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const yearNumber = Number(params.year);
  const years = await getJourneyForChild(child.id);
  const year = years.find((y) => y.yearNumber === yearNumber);
  if (!year) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <ChildTopBar child={child} />

      <div className={`mt-6 rounded-xl2 bg-gradient-to-r ${THEME_BG[year.themeStage] ?? THEME_BG.playful} p-6 text-white shadow`}>
        <h1 className="text-2xl font-extrabold">{year.title} learning journey</h1>
        <p className="mt-1 text-white/90">{year.summary}</p>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {year.levels.map((level) => {
          const contentReady = level.contentStatus === "COMPLETE";
          const clickable = level.unlocked && contentReady;
          const cardBase = "rounded-xl2 border p-5 shadow-sm";
          const cardState = !level.unlocked
            ? "bg-slate-100 text-slate-400"
            : !contentReady
              ? "bg-amber-50 text-amber-800 border-amber-300"
              : level.passed
                ? "bg-leaf-50 border-leaf-500"
                : "bg-white hover:border-brand-400";

          const content = (
            <>
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/70 text-lg font-bold text-brand-800">
                  {level.unlocked ? level.levelNumber : "🔒"}
                </span>
                {level.passed && <span aria-label="Passed">✅</span>}
                {level.isMixedMastery && <span className="text-xs font-semibold uppercase tracking-wide">Mixed mastery</span>}
              </div>
              <h2 className="mt-2 font-bold">{level.title}</h2>
              <p className="mt-1 text-sm">{level.summary}</p>
              {!level.unlocked && <p className="mt-3 text-xs font-semibold">Score 95% or more in the previous level to unlock this level.</p>}
              {level.unlocked && !contentReady && <p className="mt-3 text-xs font-semibold">Content coming soon &mdash; this level&rsquo;s lessons and questions are still being written.</p>}
              {level.unlocked && contentReady && level.bestScorePercentage !== null && (
                <p className="mt-3 text-xs font-semibold text-brand-700">Best score: {Math.round(level.bestScorePercentage)}%</p>
              )}
            </>
          );

          return (
            <li key={level.levelId}>
              {clickable ? (
                <Link href={`/learn/${child.id}/level/${level.levelId}`} className={`block ${cardBase} ${cardState}`}>
                  {content}
                </Link>
              ) : (
                <div className={`${cardBase} ${cardState}`} aria-disabled="true">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
