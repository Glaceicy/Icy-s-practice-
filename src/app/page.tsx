import Link from "next/link";
import { getAdultSession } from "@/lib/auth";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function LandingPage() {
  const session = await getAdultSession();
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 text-6xl" aria-hidden="true">
        🧮
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-brand-800 sm:text-5xl">{t("home.title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-700">{t("home.tagline")}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {session ? (
          <Link href="/profiles" className="touch-target rounded-xl2 bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-brand-700">
            {t("home.continueToProfiles")}
          </Link>
        ) : (
          <>
            <Link href="/register" className="touch-target rounded-xl2 bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-brand-700">
              {t("home.createAccount")}
            </Link>
            <Link href="/login" className="touch-target rounded-xl2 border-2 border-brand-600 px-8 py-4 text-lg font-semibold text-brand-700 hover:bg-brand-50">
              {t("home.signIn")}
            </Link>
          </>
        )}
      </div>

      {!session && (
        <p className="mt-4 text-sm text-slate-600">
          {t("home.studentPrompt")}{" "}
          <Link href="/child-login" className="font-semibold text-brand-700 underline">
            {t("home.studentLoginLink")}
          </Link>
        </p>
      )}

      <dl className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
        <div className="rounded-xl2 border bg-white p-6 shadow-sm">
          <dt className="font-semibold text-brand-700">{t("home.featureYearsTitle")}</dt>
          <dd className="mt-1 text-sm text-slate-600">{t("home.featureYearsBody")}</dd>
        </div>
        <div className="rounded-xl2 border bg-white p-6 shadow-sm">
          <dt className="font-semibold text-brand-700">{t("home.featureLearningTitle")}</dt>
          <dd className="mt-1 text-sm text-slate-600">{t("home.featureLearningBody")}</dd>
        </div>
        <div className="rounded-xl2 border bg-white p-6 shadow-sm">
          <dt className="font-semibold text-brand-700">{t("home.featureSafeTitle")}</dt>
          <dd className="mt-1 text-sm text-slate-600">{t("home.featureSafeBody")}</dd>
        </div>
      </dl>

      <p className="mt-12 text-xs text-slate-400">{t("home.contentCoverage")}</p>
    </main>
  );
}
