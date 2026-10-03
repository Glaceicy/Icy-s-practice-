import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyEmailAction } from "@/lib/actions/auth";
import Mascot from "@/components/illustrations/Mascot";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token?: string; error?: string } }) {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);
  const token = searchParams.token ?? "";

  // Confirming requires an explicit click rather than running on page load —
  // some corporate/email-client link scanners pre-fetch URLs in an inbox,
  // which would otherwise silently burn a one-time token before the person
  // ever sees this page.
  async function confirm() {
    "use server";
    const result = await verifyEmailAction(token);
    if (result.error) {
      redirect(`/verify-email?token=${encodeURIComponent(token)}&error=${encodeURIComponent(result.error)}`);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16 text-center">
      <div className="flex justify-center">
        <Mascot mood="wave" className="h-20 w-20 animate-pop-in" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-brand-800">{t("verifyEmail.title")}</h1>

      {!token && <p className="mt-2 text-sm text-slate-600">{t("verifyEmail.missingToken")}</p>}

      {token && (
        <>
          <p className="mt-2 text-sm text-slate-600">{t("verifyEmail.subtitle")}</p>
          {searchParams.error && (
            <p role="alert" className="mt-4 rounded-lg border border-berry-500 bg-berry-50 px-4 py-3 text-sm text-berry-600">
              {searchParams.error}
            </p>
          )}
          <form action={confirm} className="mt-6">
            <button type="submit" className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700">
              {t("verifyEmail.confirmButton")}
            </button>
          </form>
        </>
      )}

      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/login" className="font-semibold text-brand-700 underline">
          {t("childLogin.grownUpLink")}
        </Link>
      </p>
    </main>
  );
}
