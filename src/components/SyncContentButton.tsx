"use client";

import { useState, useTransition } from "react";
import { syncContentFromCodeAction, type ContentSyncResult } from "@/lib/actions/admin";
import { useT } from "./I18nProvider";

/** Re-applies curriculum/lesson content from the codebase onto the database
 * — the self-service way to push a content-only update (e.g. a new French
 * translation) after a deploy, with one click, no direct database access. */
export default function SyncContentButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ContentSyncResult | null>(null);
  const t = useT();

  function run() {
    startTransition(async () => {
      const res = await syncContentFromCodeAction();
      setResult(res);
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={run}
        disabled={pending}
        className="touch-target rounded-lg border-2 border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-60"
      >
        {pending ? t("syncContent.syncing") : t("syncContent.button")}
      </button>
      {result && (
        <p className="mt-2 text-xs text-slate-500">
          {t("syncContent.result", { years: result.years, levels: result.levels, objectives: result.objectives, lessons: result.lessons })}
        </p>
      )}
    </div>
  );
}
