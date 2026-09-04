import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminCurriculumPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");

  const years = await prisma.schoolYear.findMany({
    orderBy: { yearNumber: "asc" },
    include: { levels: { orderBy: { levelNumber: "asc" }, include: { objectives: true } } }
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 underline">
        ← Admin overview
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">Curriculum structure</h1>
      <p className="mt-1 text-sm text-slate-600">All 10 school years and 100 levels, versioned via the codebase (src/lib/curriculum) and reviewed here.</p>

      <div className="mt-6 space-y-6">
        {years.map((year) => (
          <details key={year.id} className="rounded-xl2 border bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-bold text-brand-800">
              {year.title} ({year.keyStage}) — {year.levels.filter((l) => l.status === "COMPLETE").length}/10 content-complete
            </summary>
            <ul className="mt-3 space-y-2">
              {year.levels.map((level) => (
                <li key={level.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Level {level.levelNumber}: {level.title}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${level.status === "COMPLETE" ? "bg-leaf-100 text-leaf-700" : "bg-slate-100 text-slate-500"}`}>
                      {level.status}
                    </span>
                  </div>
                  <ul className="mt-1 list-disc pl-5 text-xs text-slate-600">
                    {level.objectives.map((o) => (
                      <li key={o.id}>
                        <span className="font-mono">{o.code}</span>: {o.description}
                        {o.dfeReference && <span className="text-slate-400"> — {o.dfeReference}</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </main>
  );
}
