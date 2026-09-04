import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdult } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getChildSummary } from "@/lib/services/dashboard";
import PrintButton from "@/components/PrintButton";

export default async function ProgressReportPage({ params }: { params: { childId: string } }) {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: params.childId, ownerId: adult.id }, include: { currentYear: true } });
  if (!child) notFound();

  const summary = await getChildSummary(child.id);
  const generatedAt = new Date();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10 print:py-0">
      <div className="flex items-center justify-between print:hidden">
        <Link href={`/dashboard/child/${child.id}`} className="text-sm font-semibold text-brand-700 underline">
          ← Back to dashboard
        </Link>
        <PrintButton label="Print / save as PDF" />
      </div>

      <article className="mt-6 rounded-xl2 border bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <header className="border-b pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Maths Journey UK — Progress Report</p>
          <h1 className="mt-1 text-2xl font-bold text-brand-800">{summary.displayName}</h1>
          <p className="text-sm text-slate-500">
            {summary.currentYearTitle} &middot; Generated {generatedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ReportStat label="Levels unlocked" value={summary.levelsUnlocked} />
          <ReportStat label="Levels passed" value={summary.levelsPassed} />
          <ReportStat label="Average score" value={summary.averageScorePercentage !== null ? `${Math.round(summary.averageScorePercentage)}%` : "—"} />
          <ReportStat label="Est. minutes learning" value={summary.minutesSpent} />
        </section>

        <section className="mt-6">
          <h2 className="font-bold text-brand-800">Strengths</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {summary.strengths.length === 0 ? <li>Not enough data yet.</li> : summary.strengths.map((s, i) => <li key={i}>{s.description}</li>)}
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">Areas needing improvement</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {summary.developing.length === 0 ? <li>Not enough data yet.</li> : summary.developing.map((s, i) => <li key={i}>{s.description}</li>)}
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">Common misconceptions observed</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {summary.topMisconceptions.length === 0 ? <li>None recorded yet.</li> : summary.topMisconceptions.map((m, i) => <li key={i}>{m.label} ({m.count} occurrences)</li>)}
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="font-bold text-brand-800">Mastery Challenge history</h2>
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-1">Level</th>
                <th className="py-1">Score</th>
                <th className="py-1">Result</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentAttempts.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="py-1">
                    Year {a.yearNumber}, Level {a.levelNumber}: {a.levelTitle}
                  </td>
                  <td className="py-1">{Math.round(a.scorePercentage ?? 0)}%</td>
                  <td className="py-1">{a.passed ? "Passed" : "Not yet passed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="mt-8 text-xs text-slate-400">
          This report summarises learning activity recorded within Maths Journey UK. Time-spent figures are estimated from session
          start/end timestamps.
        </p>
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
