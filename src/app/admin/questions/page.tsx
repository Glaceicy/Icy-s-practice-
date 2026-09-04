import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { toggleTemplateActiveAction, markTemplateReviewedAction } from "@/lib/actions/admin";
import { misconceptionLabel } from "@/lib/types";

export default async function AdminQuestionsPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");

  const templates = await prisma.questionTemplate.findMany({
    include: { level: { include: { schoolYear: true } }, objective: true },
    orderBy: [{ level: { schoolYear: { yearNumber: "asc" } } }, { level: { levelNumber: "asc" } }]
  });

  const frequentlyMissed = await prisma.generatedQuestionLog.findMany({
    where: { timesIncorrectFirstTry: { gt: 0 } },
    orderBy: { timesIncorrectFirstTry: "desc" },
    take: 10,
    include: { template: true }
  });

  async function toggle(formData: FormData) {
    "use server";
    await toggleTemplateActiveAction(String(formData.get("templateId")));
  }
  async function review(formData: FormData) {
    "use server";
    await markTemplateReviewedAction(String(formData.get("templateId")));
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 underline">
        ← Admin overview
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">Question bank review</h1>

      {frequentlyMissed.length > 0 && (
        <section className="mt-6 rounded-xl2 border bg-amber-50 p-5">
          <h2 className="font-bold text-amber-800">Frequently answered incorrectly</h2>
          <ul className="mt-2 space-y-1 text-sm text-amber-900">
            {frequentlyMissed.map((log) => (
              <li key={log.id} className="flex justify-between gap-2">
                <span>
                  {log.prompt} <span className="text-amber-600">({log.template.generatorKey})</span>
                </span>
                <span className="flex-none font-semibold">{log.timesIncorrectFirstTry} wrong</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 overflow-x-auto rounded-xl2 border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">Level</th>
              <th className="p-3">Generator key</th>
              <th className="p-3">Objective</th>
              <th className="p-3">Type</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Misconceptions</th>
              <th className="p-3">Reviewed</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="p-3">
                  Y{t.level.schoolYear.yearNumber}L{t.level.levelNumber}
                </td>
                <td className="p-3 font-mono text-xs">{t.generatorKey}</td>
                <td className="p-3 text-xs">{t.objective.code}</td>
                <td className="p-3 text-xs">{t.questionType}</td>
                <td className="p-3 text-xs">{t.difficulty}</td>
                <td className="p-3 text-xs">{t.misconceptionTags.split(",").map(misconceptionLabel).join(", ")}</td>
                <td className="p-3 text-xs">{t.reviewedBy ? `${t.reviewedBy}` : "—"}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${t.isActive ? "bg-leaf-100 text-leaf-700" : "bg-berry-100 text-berry-700"}`}>
                    {t.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <form action={toggle}>
                      <input type="hidden" name="templateId" value={t.id} />
                      <button type="submit" className="rounded border px-2 py-1 text-xs font-semibold hover:bg-slate-50">
                        {t.isActive ? "Disable" : "Enable"}
                      </button>
                    </form>
                    <form action={review}>
                      <input type="hidden" name="templateId" value={t.id} />
                      <button type="submit" className="rounded border px-2 py-1 text-xs font-semibold hover:bg-slate-50">
                        Mark reviewed
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
