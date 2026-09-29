import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function RegisterPage() {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold text-brand-800">{t("register.title")}</h1>
      <p className="mt-2 text-sm text-slate-600">{t("register.subtitle")}</p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <RegisterForm />
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        {t("register.alreadyHaveAccount")}{" "}
        <Link href="/login" className="font-semibold text-brand-700 underline">
          {t("register.signInLink")}
        </Link>
      </p>
    </main>
  );
}
