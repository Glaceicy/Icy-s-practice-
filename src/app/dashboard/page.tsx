import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getChildSummary } from "@/lib/services/dashboard";
import { logoutAction } from "@/lib/actions/auth";

export default async function DashboardPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  const children = await prisma.childProfile.findMany({ where: { ownerId: adult.id }, orderBy: { createdAt: "asc" } });
  const summaries = await Promise.all(children.map((c) => getChildSummary(c.id)));

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-800">{adult.role === "TEACHER" ? "Teacher dashboard" : "Parent dashboard"}</h1>
          <p className="text-sm text-slate-600">{adult.fullName}</p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link href="/profiles" className="rounded-lg border px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
            Learner profiles
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="rounded-lg border px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        {summaries.map((s) => (
          <div key={s.childId} className="rounded-xl2 border bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-brand-800">{s.displayName}</h2>
                <p className="text-sm text-slate-500">
                  {s.currentYearTitle} &middot; {s.pathway} pathway
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/child/${s.childId}`} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  View progress
                </Link>
                <Link href={`/dashboard/child/${s.childId}/report`} className="rounded-lg border px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                  Progress report
                </Link>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-slate-500">Levels unlocked</dt>
                <dd className="text-lg font-bold text-brand-700">{s.levelsUnlocked}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Levels passed</dt>
                <dd className="text-lg font-bold text-brand-700">{s.levelsPassed}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Average score</dt>
                <dd className="text-lg font-bold text-brand-700">{s.averageScorePercentage !== null ? `${Math.round(s.averageScorePercentage)}%` : "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Est. minutes learning</dt>
                <dd className="text-lg font-bold text-brand-700">{s.minutesSpent}</dd>
              </div>
            </dl>
          </div>
        ))}

        {summaries.length === 0 && (
          <p className="text-slate-500">
            No learner profiles yet.{" "}
            <Link href="/profiles/new" className="font-semibold text-brand-700 underline">
              Create one
            </Link>
            .
          </p>
        )}
      </div>
    </main>
  );
}
