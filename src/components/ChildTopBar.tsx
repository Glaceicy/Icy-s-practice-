import Link from "next/link";
import { switchProfileAction } from "@/lib/actions/children";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

const AVATAR_EMOJI: Record<string, string> = {
  fox: "🦊",
  owl: "🦉",
  otter: "🦦",
  robot: "🤖",
  dragon: "🐉",
  panda: "🐼",
  astronaut: "🧑‍🚀",
  unicorn: "🦄"
};

export default async function ChildTopBar({ child }: { child: { id: string; displayName: string; avatarKey: string } }) {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <nav aria-label="Learner navigation" className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border bg-white px-4 py-3 shadow-sm">
      <Link href={`/learn/${child.id}/journey`} className="flex items-center gap-2 font-bold text-brand-800">
        <span className="text-2xl" aria-hidden="true">
          {AVATAR_EMOJI[child.avatarKey] ?? "🙂"}
        </span>
        {child.displayName}
      </Link>
      <div className="flex flex-wrap gap-2 text-sm">
        <Link href={`/learn/${child.id}/journey`} className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          {t("childTopBar.journeyMap")}
        </Link>
        <Link href={`/learn/${child.id}/year-select`} className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          {t("childTopBar.allYears")}
        </Link>
        <Link href={`/learn/${child.id}/achievements`} className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          {t("childTopBar.achievements")}
        </Link>
        <Link href="/settings/accessibility" className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          {t("childTopBar.settings")}
        </Link>
        <Link href="/dashboard" className="touch-target rounded-lg px-3 py-2 font-semibold text-slate-600 hover:bg-slate-50">
          {t("childTopBar.parentDashboard")}
        </Link>
        <form action={switchProfileAction}>
          <button type="submit" className="touch-target rounded-lg px-3 py-2 font-semibold text-slate-600 hover:bg-slate-50">
            {t("childTopBar.switchProfile")}
          </button>
        </form>
      </div>
    </nav>
  );
}
