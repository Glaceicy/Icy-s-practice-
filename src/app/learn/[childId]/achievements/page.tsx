import Link from "next/link";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ChildTopBar from "@/components/ChildTopBar";

const ICONS: Record<string, string> = { star: "⭐", trophy: "🏆" };

export default async function AchievementsPage({ params }: { params: { childId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const achievements = await prisma.achievement.findMany({ where: { childId: child.id }, orderBy: { earnedAt: "desc" } });
  const passedAttempts = await prisma.assessmentAttempt.findMany({
    where: { childId: child.id, passed: true, status: "SUBMITTED" },
    include: { level: { include: { schoolYear: true } } },
    orderBy: { submittedAt: "asc" }
  });

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">🏆 Your trophy area</h1>
      <p className="mt-1 text-sm text-slate-600">Every star here celebrates learning, improvement and persistence &mdash; not how much time you&rsquo;ve spent.</p>

      {achievements.length === 0 ? (
        <p className="mt-8 text-slate-500">No achievements yet &mdash; pass your first Mastery Challenge to earn one!</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <div key={a.id} className="rounded-xl2 border bg-white p-5 text-center shadow-sm">
              <p className="text-4xl" aria-hidden="true">
                {ICONS[a.iconKey] ?? "⭐"}
              </p>
              <h2 className="mt-1 font-bold text-brand-800">{a.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{a.description}</p>
              <p className="mt-2 text-xs text-slate-400">{new Date(a.earnedAt).toLocaleDateString("en-GB")}</p>
              {a.certificateAvailable && (
                <Link href={`/learn/${child.id}/achievements/${a.id}/certificate`} className="mt-3 inline-block text-sm font-semibold text-brand-700 underline">
                  View / print certificate
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-brand-800">Completed levels</h2>
      {passedAttempts.length === 0 ? (
        <p className="mt-2 text-slate-500">No levels completed yet.</p>
      ) : (
        <ol className="mt-3 space-y-1 text-sm text-slate-700">
          {passedAttempts.map((a) => (
            <li key={a.id} className="flex justify-between rounded-lg bg-white px-4 py-2 shadow-sm">
              <span>
                {a.level.schoolYear.title}, Level {a.level.levelNumber}: {a.level.title}
              </span>
              <span className="text-slate-400">{new Date(a.submittedAt!).toLocaleDateString("en-GB")}</span>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
