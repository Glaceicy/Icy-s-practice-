import Link from "next/link";
import { switchProfileAction } from "@/lib/actions/children";

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

export default function ChildTopBar({ child }: { child: { id: string; displayName: string; avatarKey: string } }) {
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
          Journey map
        </Link>
        <Link href={`/learn/${child.id}/year-select`} className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          All years
        </Link>
        <Link href={`/learn/${child.id}/achievements`} className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          🏆 Achievements
        </Link>
        <Link href="/settings/accessibility" className="touch-target rounded-lg px-3 py-2 font-semibold text-brand-700 hover:bg-brand-50">
          ⚙️ Settings
        </Link>
        <Link href="/dashboard" className="touch-target rounded-lg px-3 py-2 font-semibold text-slate-600 hover:bg-slate-50">
          Parent dashboard
        </Link>
        <form action={switchProfileAction}>
          <button type="submit" className="touch-target rounded-lg px-3 py-2 font-semibold text-slate-600 hover:bg-slate-50">
            Switch profile
          </button>
        </form>
      </div>
    </nav>
  );
}
