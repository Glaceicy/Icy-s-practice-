import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { toggleTemplateActiveAction, markTemplateReviewedAction } from "@/lib/actions/admin";
import { misconceptionLabel } from "@/lib/types";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

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

  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 underline">
        {t("adminQuestions.backToOverview")}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">{t("adminQuestions.title")}</h1>

      {frequentlyMissed.length > 0 && (
        <section className="mt-6 rounded-xl2 border bg-amber-50 p-5">
          <h2 className="font-bold text-amber-800">{t("adminQuestions.frequentlyMissed")}</h2>
          <ul className="mt-2 space-y-1 text-sm text-amber-900">
            {frequentlyMissed.map((log) => (
              <li key={log.id} className="flex justify-between gap-2">
                <span>
                  {log.prompt} <span className="text-amber-600">({log.template.generatorKey})</span>
                </span>
                <span className="flex-none font-semibold">{t("adminQuestions.wrongCount", { count: log.timesIncorrectFirstTry })}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 overflow-x-auto rounded-xl2 border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">{t("adminQuestions.colLevel")}</th>
              <th className="p-3">{t("adminQuestions.colGeneratorKey")}</th>
              <th className="p-3">{t("adminQuestions.colObjective")}</th>
              <th className="p-3">{t("adminQuestions.colType")}</th>
              <th className="p-3">{t("adminQuestions.colDifficulty")}</th>
              <th className="p-3">{t("adminQuestions.colMisconceptions")}</th>
              <th className="p-3">{t("adminQuestions.colReviewed")}</th>
              <th className="p-3">{t("adminQuestions.colStatus")}</th>
              <th className="p-3">{t("adminQuestions.colActions")}</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.id} className="border-b last:border-0">
                <td className="p-3">
                  Y{tpl.level.schoolYear.yearNumber}L{tpl.level.levelNumber}
                </td>
                <td className="p-3 font-mono text-xs">{tpl.generatorKey}</td>
                <td className="p-3 text-xs">{tpl.objective.code}</td>
                <td className="p-3 text-xs">{tpl.questionType}</td>
                <td className="p-3 text-xs">{tpl.difficulty}</td>
                <td className="p-3 text-xs">{tpl.misconceptionTags.split(",").map(misconceptionLabel).join(", ")}</td>
                <td className="p-3 text-xs">{tpl.reviewedBy ? `${tpl.reviewedBy}` : "—"}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tpl.isActive ? "bg-leaf-100 text-leaf-700" : "bg-berry-100 text-berry-700"}`}>
                    {tpl.isActive ? t("adminQuestions.active") : t("adminQuestions.disabled")}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <form action={toggle}>
                      <input type="hidden" name="templateId" value={tpl.id} />
                      <button type="submit" className="rounded border px-2 py-1 text-xs font-semibold hover:bg-slate-50">
                        {tpl.isActive ? t("adminQuestions.disable") : t("adminQuestions.enable")}
                      </button>
                    </form>
                    <form action={review}>
                      <input type="hidden" name="templateId" value={tpl.id} />
                      <button type="submit" className="rounded border px-2 py-1 text-xs font-semibold hover:bg-slate-50">
                        {t("adminQuestions.markReviewed")}
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
