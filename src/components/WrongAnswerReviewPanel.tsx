"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { getWrongAnswersForPracticeAttemptAction, getWrongAnswersForMasteryAttemptAction } from "@/lib/actions/learning";
import type { WrongAnswerReviewItem } from "@/lib/services/questionLog";
import { useT } from "./I18nProvider";

const VisualAidRenderer = dynamic(() => import("./VisualAidRenderer"), { ssr: false });

/** A "review my tricky questions" panel, openable at any point during a
 * Guided/Independent/Revision/Mastery session, and reused unchanged on the
 * end-of-session and Mastery results screens by passing `items` directly
 * instead of `attemptId`/`kind`. Only ever shows questions already graded,
 * so revealing the correct answer here is always safe. */
export default function WrongAnswerReviewPanel({
  attemptId,
  kind,
  hasWrongAnswers,
  items: providedItems,
  triggerLabel
}: {
  attemptId?: string;
  kind?: "practice" | "mastery";
  hasWrongAnswers?: boolean;
  items?: WrongAnswerReviewItem[];
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<WrongAnswerReviewItem[] | null>(providedItems ?? null);
  const [loading, setLoading] = useState(false);
  const t = useT();

  async function openPanel() {
    setOpen(true);
    if (providedItems) return; // already have the final list — no need to fetch
    setLoading(true);
    const data = attemptId && kind === "mastery" ? await getWrongAnswersForMasteryAttemptAction(attemptId) : await getWrongAnswersForPracticeAttemptAction(attemptId!);
    setItems(data);
    setLoading(false);
  }

  // Mid-session trigger: don't clutter the screen before there's anything to review.
  if (!providedItems && !hasWrongAnswers) return null;

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="touch-target rounded-xl2 border-2 border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        {triggerLabel ?? t("wrongAnswerReviewPanel.defaultTrigger")}
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={t("wrongAnswerReviewPanel.dialogLabel")} className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-6">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-xl2 bg-white p-6 shadow-lg sm:rounded-xl2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-800">
                {loading
                  ? t("wrongAnswerReviewPanel.loading")
                  : t(items?.length === 1 ? "wrongAnswerReviewPanel.questionsToReviewOne" : "wrongAnswerReviewPanel.questionsToReviewMany", { count: items?.length ?? 0 })}
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="touch-target rounded-lg border px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-50" aria-label={t("wrongAnswerReviewPanel.close")}>
                ✕
              </button>
            </div>

            {loading && <p className="mt-4 text-sm text-slate-500">{t("wrongAnswerReviewPanel.fetching")}</p>}

            {!loading && items && items.length === 0 && <p className="mt-4 text-sm text-slate-500">{t("wrongAnswerReviewPanel.nothingToReview")}</p>}

            {!loading && items && items.length > 0 && (
              <div className="mt-4 space-y-4">
                {items.map((item, i) => (
                  <div key={i} className="rounded-xl2 border p-4 text-sm">
                    <p className="font-semibold text-slate-800">{item.prompt}</p>
                    {item.visualAid && item.visualAid.kind !== "none" && (
                      <div className="mt-2 flex justify-center">
                        <VisualAidRenderer kind={item.visualAid.kind} data={item.visualAid.data} />
                      </div>
                    )}
                    <p className="mt-2 text-berry-600">
                      {t("wrongAnswerReviewPanel.youAnswered")} <span className="font-semibold">{item.givenAnswerDisplay}</span>
                    </p>
                    <p className="text-leaf-700">
                      {t("wrongAnswerReviewPanel.correctAnswer")} <span className="font-semibold">{item.correctAnswerDisplay}</span>
                    </p>
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-600">
                      {item.explanationSteps.map((step, j) => (
                        <li key={j}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
