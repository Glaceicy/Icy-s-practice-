import { selectChildAction } from "@/lib/actions/children";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/locale";

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

/** A parent-only view of one of their children, from the already-fully-
 * authenticated /profiles page — no PIN is asked here, since the viewer has
 * already proven who they are with their own email+password. PINs are the
 * child's own credential for logging in directly (see /child-login). */
export default async function ProfileCard({
  childId,
  displayName,
  avatarKey,
  yearTitle,
  locale
}: {
  childId: string;
  displayName: string;
  avatarKey: string;
  yearTitle: string;
  locale: Locale;
}) {
  const t = (key: string) => translate(locale, key);
  async function viewChild() {
    "use server";
    await selectChildAction(childId);
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border bg-white p-6 text-center shadow-sm">
      <span className="text-5xl" aria-hidden="true">
        {AVATAR_EMOJI[avatarKey] ?? "🙂"}
      </span>
      <p className="text-lg font-bold text-slate-800">{displayName}</p>
      <p className="text-sm text-slate-500">{yearTitle}</p>
      <form action={viewChild} className="w-full">
        <button type="submit" className="touch-target w-full rounded-lg border-2 border-brand-500 px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          {t("profilePinCard.go")}
        </button>
      </form>
    </div>
  );
}
