import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function AdminOverviewPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");

  const [years, levels, completeLevels, templates, activeTemplates, logs, misconceptions, adultUsers, childProfiles] = await Promise.all([
    prisma.schoolYear.count(),
    prisma.level.count(),
    prisma.level.count({ where: { status: "COMPLETE" } }),
    prisma.questionTemplate.count(),
    prisma.questionTemplate.count({ where: { isActive: true } }),
    prisma.generatedQuestionLog.count(),
    prisma.misconceptionLog.count(),
    prisma.adultUser.count(),
    prisma.childProfile.count()
  ]);
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-800">{t("adminOverview.title")}</h1>
        <Link href="/profiles" className="text-sm font-semibold text-brand-700 underline">
          {t("adminOverview.backToProfiles")}
        </Link>
      </div>
      <p className="mt-1 text-sm text-slate-600">{t("adminOverview.signedInAs", { name: adult.fullName })}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label={t("adminOverview.schoolYears")} value={years} />
        <Stat label={t("adminOverview.levelsOf100")} value={levels} />
        <Stat label={t("adminOverview.contentCompleteLevels")} value={completeLevels} />
        <Stat label={t("adminOverview.questionTemplates")} value={templates} />
        <Stat label={t("adminOverview.activeTemplates")} value={activeTemplates} />
        <Stat label={t("adminOverview.loggedVariations")} value={logs} />
        <Stat label={t("adminOverview.misconceptionsLogged")} value={misconceptions} />
        <Stat label={t("adminOverview.adultAccounts")} value={adultUsers} />
        <Stat label={t("adminOverview.childProfiles")} value={childProfiles} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/admin/users" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">{t("adminOverview.allUsersTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("adminOverview.allUsersBody")}</p>
        </Link>
        <Link href="/admin/questions" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">{t("adminOverview.questionReviewTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("adminOverview.questionReviewBody")}</p>
        </Link>
        <Link href="/admin/import-export" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">{t("adminOverview.importExportTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("adminOverview.importExportBody")}</p>
        </Link>
        <Link href="/admin/curriculum" className="rounded-xl2 border bg-white p-5 shadow-sm hover:border-brand-400">
          <h2 className="font-bold text-brand-800">{t("adminOverview.curriculumTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("adminOverview.curriculumBody")}</p>
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
