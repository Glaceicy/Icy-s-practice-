import Link from "next/link";
import { assertChildAccess } from "@/lib/auth";
import { getJourneyForChild } from "@/lib/services/journey";
import ChildTopBar from "@/components/ChildTopBar";

export default async function YearSelectPage({ params }: { params: { childId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const years = await getJourneyForChild(child.id);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">School years</h1>
      <p className="mt-1 text-sm text-slate-600">
        {child.displayName} is currently learning in <strong>{years.find((y) => y.isCurrentYear)?.title}</strong>. Progress through
        each year&rsquo;s 10 levels is always in order &mdash; a year only shows levels once at least one has been unlocked.
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
                {accessible ? `${year.levelsPassedCount} / 10 levels passed` : "Locked — complete the previous year first"}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
