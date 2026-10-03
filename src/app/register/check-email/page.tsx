import Mascot from "@/components/illustrations/Mascot";
import ResendVerificationForm from "@/components/ResendVerificationForm";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function CheckEmailPage({ searchParams }: { searchParams: { email?: string } }) {
  const locale = await getLocale();
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);
  const email = searchParams.email ?? "";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16 text-center">
      <div className="flex justify-center">
        <Mascot mood="cheer" className="h-20 w-20 animate-pop-in" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-brand-800">{t("checkEmail.title")}</h1>
      <p className="mt-2 text-sm text-slate-600">{email ? t("checkEmail.bodyWithEmail", { email }) : t("checkEmail.bodyGeneric")}</p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 text-left shadow-sm">
        <p className="text-sm font-semibold text-slate-700">{t("checkEmail.resendPrompt")}</p>
        <ResendVerificationForm defaultEmail={email} />
      </div>
    </main>
  );
}
