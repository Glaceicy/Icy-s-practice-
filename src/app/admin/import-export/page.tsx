import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ImportForm from "@/components/ImportForm";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function AdminImportExportPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 underline">
        {t("adminImportExport.backToOverview")}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">{t("adminImportExport.title")}</h1>
      <p className="mt-2 text-sm text-slate-600">{t("adminImportExport.subtitle")}</p>

      <section className="mt-6 rounded-xl2 border bg-white p-6 shadow-sm">
        <h2 className="font-bold text-brand-800">{t("adminImportExport.exportTitle")}</h2>
        <div className="mt-3 flex gap-3">
          <a href="/api/admin/export?format=json" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            {t("adminImportExport.downloadJson")}
          </a>
          <a href="/api/admin/export?format=csv" className="rounded-lg border-2 border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            {t("adminImportExport.downloadCsv")}
          </a>
        </div>
      </section>

      <section className="mt-6 rounded-xl2 border bg-white p-6 shadow-sm">
        <h2 className="font-bold text-brand-800">{t("adminImportExport.importTitle")}</h2>
        <ImportForm />
      </section>
    </main>
  );
}
