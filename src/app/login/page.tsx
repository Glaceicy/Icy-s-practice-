import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function LoginPage() {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold text-brand-800">{t("login.title")}</h1>
      <p className="mt-2 text-sm text-slate-600">{t("login.subtitle")}</p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
      <p className="mt-6 rounded-lg bg-brand-50 p-4 text-center text-sm text-slate-700">
        {t("login.demoAccountLabel")} <strong>parent.demo@mathsjourney.example</strong> / <strong>Demo!Password123</strong>
      </p>
      <p className="mt-4 text-center text-sm text-slate-600">
        <Link href="/forgot-password" className="font-semibold text-brand-700 underline">
          {t("login.forgotPasswordLink")}
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-slate-600">
        {t("login.newHere")}{" "}
        <Link href="/register" className="font-semibold text-brand-700 underline">
          {t("login.createAccountLink")}
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-slate-600">
        {t("home.studentPrompt")}{" "}
        <Link href="/child-login" className="font-semibold text-brand-700 underline">
          {t("home.studentLoginLink")}
        </Link>
      </p>
    </main>
  );
}
