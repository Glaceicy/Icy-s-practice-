"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/lib/actions/locale";
import type { Locale } from "@/lib/questionEngine/types";

/** A small site-wide EN/FR toggle. Mounted once in the root layout as a fixed
 * corner widget so every page (signed out, adult, or child) gets it without
 * needing its own layout changes. Persists the choice to a cookie read by
 * every server component/action via `getLocale()`, and — when there is an
 * active child in session — to that child's own saved `locale` too. */
export default function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(locale: Locale) {
    if (locale === current || pending) return;
    startTransition(async () => {
      await setLocaleAction(locale);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label="Language / Langue"
      className="fixed right-3 top-3 z-40 inline-flex overflow-hidden rounded-lg border border-slate-300 bg-white text-xs font-bold shadow-sm"
    >
      <button
        type="button"
        onClick={() => choose("en")}
        disabled={pending}
        aria-pressed={current === "en"}
        className={`touch-target px-3 py-2 ${current === "en" ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => choose("fr")}
        disabled={pending}
        aria-pressed={current === "fr"}
        className={`touch-target border-l border-slate-300 px-3 py-2 ${current === "fr" ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
      >
        FR
      </button>
    </div>
  );
}
