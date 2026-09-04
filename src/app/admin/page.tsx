import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminOverviewPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");

  const [years, levels, completeLevels, templates, activeTemplates, logs, misconceptions] = await Promise.all([
    prisma.schoolYear.count(),
    prisma.level.count(),
    prisma.level.count({ where: { status: "COMPLETE" } }),
    prisma.questionTemplate.count(),
    prisma.questionTemplate.count({ where: { isActive: true } }),
    prisma.generatedQuestionLog.count(),
    prisma.misconceptionLog.count()
  ]);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-800">Curriculum &amp; question administration</h1>
        <Link href="/profiles" className="text-sm font-semibold text-brand-700 underline">
          Back to profiles
        </Link>
      </div>
      <p className="mt-1 text-sm text-slate-600">Signed in as {adult.fullName} (Administrator)</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="School years" value={years} />
        <Stat label="Levels (of 100)" value={levels} />
        <Stat label="Content-complete levels" value={completeLevels} />
        <Stat label="Question templates" value={templates} />
        <Stat label="Active templates" value={activeTemplates} />
        <Stat label="Generated question variations logged" value={logs} />
        <Stat label="Misconceptions logged" value={misconceptions} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/admin/questions" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">Question bank review</h2>
          <p className="mt-1 text-sm text-slate-600">Review templates, disable inaccurate questions, see frequently-missed questions.</p>
        </Link>
        <Link href="/admin/import-export" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">Import / export</h2>
          <p className="mt-1 text-sm text-slate-600">Export the question bank as CSV/JSON, or bulk-import review/publish decisions.</p>
        </Link>
        <Link href="/admin/curriculum" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">Curriculum structure</h2>
          <p className="mt-1 text-sm text-slate-600">Every school year and level, with content status and learning objectives.</p>
        </Link>
      </div>
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
