import Link from "next/link";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import Mascot from "@/components/illustrations/Mascot";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);
  const token = searchParams.token ?? "";

  // Unlike /verify-email this page is safe for a link scanner to pre-fetch:
  // rendering it does nothing, and the token is only spent by submitting the
  // new password. So the form shows immediately rather than behind a confirm.
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="flex justify-center">
        <Mascot mood="wave" className="h-20 w-20 animate-pop-in" />
      </div>
      <h1 className="mt-4 text-center text-2xl font-bold text-brand-800">{t("resetPassword.title")}</h1>

      {!token ? (
        <>
          <p className="mt-2 text-center text-sm text-slate-600">{t("resetPassword.missingToken")}</p>
          <p className="mt-6 text-center text-sm text-slate-600">
            <Link href="/forgot-password" className="font-semibold text-brand-700 underline">
              {t("resetPassword.requestNewLink")}
            </Link>
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 text-center text-sm text-slate-600">{t("resetPassword.subtitle")}</p>
          <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
            <ResetPasswordForm token={token} />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            <Link href="/forgot-password" className="font-semibold text-brand-700 underline">
              {t("resetPassword.requestNewLink")}
            </Link>
          </p>
        </>
      )}
    </main>
  );
}
