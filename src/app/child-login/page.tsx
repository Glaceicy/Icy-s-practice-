import Link from "next/link";
import ChildLoginForm from "@/components/ChildLoginForm";
import Mascot from "@/components/illustrations/Mascot";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function ChildLoginPage() {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="flex justify-center">
        <Mascot mood="wave" className="h-20 w-20 animate-pop-in" />
      </div>
      <h1 className="mt-4 text-center text-2xl font-bold text-brand-800">{t("childLogin.title")}</h1>
      <p className="mt-2 text-center text-sm text-slate-600">{t("childLogin.subtitle")}</p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <ChildLoginForm />
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        {t("childLogin.grownUpPrompt")}{" "}
        <Link href="/login" className="font-semibold text-brand-700 underline">
          {t("childLogin.grownUpLink")}
        </Link>
      </p>
    </main>
  );
}
