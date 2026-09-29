import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function AdminUsersPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");

  const adults = await prisma.adultUser.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      children: {
        orderBy: { createdAt: "asc" },
        include: { currentYear: true, _count: { select: { practiceAttempts: true, levelUnlocks: true } } }
      }
    }
  });

  const totalChildren = adults.reduce((sum, a) => sum + a.children.length, 0);
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);
  const dateLocale = locale === "fr" ? "fr-FR" : "en-GB";

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 underline">
        {t("adminUsers.backToOverview")}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">{t("adminUsers.title")}</h1>
      <p className="mt-1 text-sm text-slate-600">
        {t(adults.length === 1 ? "adminUsers.summaryOne" : "adminUsers.summaryMany", { count: adults.length, children: totalChildren })}
      </p>

      <section className="mt-6 overflow-x-auto rounded-xl2 border bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">{t("adminUsers.colName")}</th>
              <th className="p-3">{t("adminUsers.colEmail")}</th>
              <th className="p-3">{t("adminUsers.colRole")}</th>
              <th className="p-3">{t("adminUsers.colRegistered")}</th>
              <th className="p-3">{t("adminUsers.colConsent")}</th>
              <th className="p-3">{t("adminUsers.colChildren")}</th>
            </tr>
          </thead>
          <tbody>
            {adults.map((a) => (
              <tr key={a.id} className="border-b align-top last:border-0">
                <td className="p-3 font-semibold">{a.fullName}</td>
                <td className="p-3 text-slate-600">{a.email}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${a.role === "ADMIN" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                    {a.role}
                  </span>
                </td>
                <td className="p-3 text-slate-500">{a.createdAt.toLocaleDateString(dateLocale)}</td>
                <td className="p-3 text-slate-500">{a.consentGivenAt ? a.consentGivenAt.toLocaleDateString(dateLocale) : "—"}</td>
                <td className="p-3">
                  {a.children.length === 0 ? (
                    <span className="text-slate-400">{t("adminUsers.noChildren")}</span>
                  ) : (
                    <ul className="space-y-1">
                      {a.children.map((c) => (
                        <li key={c.id} className="text-xs">
                          <span className="font-semibold text-slate-700">{c.displayName}</span>{" "}
                          <span className="text-slate-500">
                            {t("adminUsers.childLine", { year: c.currentYear.title, sessions: c._count.practiceAttempts, unlocks: c._count.levelUnlocks })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
