"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMasteryStateAction,
  getMasteryQuestionAction,
  submitMasteryAnswerAction,
  pauseMasteryAction,
  resumeMasteryAction,
  finalizeMasteryAction,
  type MasteryStatePayload
} from "@/lib/actions/learning";
import { MASTERY_REDO_ROUND_NUMBER } from "@/lib/scoring";
import type { StoredQuestionView } from "@/lib/services/questionLog";
import QuestionInput from "./QuestionInput";
import Scratchpad from "./Scratchpad";
import Mascot from "./illustrations/Mascot";
import { useT } from "./I18nProvider";

type ViewMode = "loading" | "paused" | "question" | "round-complete" | "redo-intro" | "ready-to-submit" | "submitting";

export default function MasterySession({ attemptId, childId, levelId }: { attemptId: string; childId: string; levelId: string }) {
  const router = useRouter();
  const [state, setState] = useState<MasteryStatePayload | null>(null);
  const [question, setQuestion] = useState<StoredQuestionView | null>(null);
  const [wasWrong, setWasWrong] = useState(false);
  const [mode, setMode] = useState<ViewMode>("loading");
  const [justFinishedRound, setJustFinishedRound] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const t = useT();

  const showQuestionFor = useCallback(
    async (roundNumber: number, positionInRound: number) => {
      const q = await getMasteryQuestionAction(attemptId, roundNumber, positionInRound);
      setQuestion(q.question);
      setWasWrong(false);
      setMode("question");
    },
    [attemptId]
  );

  const refresh = useCallback(async () => {
    const s = await getMasteryStateAction(attemptId);
    setState(s);
    if (s.status === "SUBMITTED") {
      router.push(`/learn/${childId}/level/${levelId}/results/${attemptId}`);
      return;
    }
    if (s.status === "PAUSED") {
      setMode("paused");
      return;
    }
    const nextSlot = s.slots.find((sl) => !sl.locked);
    if (!nextSlot) {
      setMode("ready-to-submit");
      return;
    }
    if (s.redoJustStarted) {
      // One-time interstitial: the main 40 just finished short of passing,
      // and the server has generated fresh redo questions for exactly the
      // ones the child got wrong — explain that before diving back in.
      setMode("redo-intro");
      return;
    }
    await showQuestionFor(nextSlot.roundNumber, nextSlot.positionInRound);
  }, [attemptId, childId, levelId, router, showQuestionFor]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleAnswer(answer: string) {
    if (!state || !question || submitting) return;
    const nextSlot = state.slots.find((sl) => !sl.locked);
    if (!nextSlot) return;
    setError(null);
    setSubmitting(true);
    try {
      const result = await submitMasteryAnswerAction(attemptId, nextSlot.roundNumber, nextSlot.positionInRound, answer);
      if (!result.isCorrect) {
        // The Mastery Challenge never reveals the correct answer or an
        // explanation in the moment — just a plain "not quite", then on to
        // the next question. Full explanations are only ever shown on the
        // results screen once the whole challenge (including any redo
        // round) is submitted.
        setWasWrong(true);
        return;
      }
      if (result.roundComplete && nextSlot.roundNumber !== MASTERY_REDO_ROUND_NUMBER && nextSlot.positionInRound === 10) {
        setJustFinishedRound(nextSlot.roundNumber);
        setMode("round-complete");
        return;
      }
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("masterySession.genericError"));
    } finally {
      setSubmitting(false);
    }
  }

  async function continueAfterWrong() {
    setWasWrong(false);
    await refresh();
  }

  async function handlePause() {
    await pauseMasteryAction(attemptId);
    setMode("paused");
  }

  async function handleResume() {
    await resumeMasteryAction(attemptId);
    await refresh();
  }

  async function handleContinueRound() {
    await refresh();
  }

  async function handleStartRedoRound() {
    const nextSlot = state?.slots.find((sl) => !sl.locked);
    if (!nextSlot) {
      await refresh();
      return;
    }
    await showQuestionFor(nextSlot.roundNumber, nextSlot.positionInRound);
  }

  async function handleFinalize() {
    setMode("submitting");
    await finalizeMasteryAction(attemptId);
    router.push(`/learn/${childId}/level/${levelId}/results/${attemptId}`);
  }

  if (mode === "loading" || !state) {
    return <p className="text-center text-slate-500">{t("masterySession.loading")}</p>;
  }

  if (mode === "paused") {
    const answered = state.slots.filter((s) => s.locked).length;
    return (
      <div className="rounded-xl2 border bg-white p-8 text-center shadow-sm">
        <p className="text-4xl" aria-hidden="true">
          ⏸️
        </p>
        <h2 className="mt-2 text-xl font-bold text-brand-800">{t("masterySession.progressSavedTitle")}</h2>
        <p className="mt-2 text-slate-600">{t("masterySession.progressSavedBody", { answered, total: state.totalQuestions })}</p>
        <button type="button" onClick={handleResume} className="touch-target mt-6 rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
          {t("masterySession.continueChallenge")}
        </button>
      </div>
    );
  }

  if (mode === "round-complete" && justFinishedRound) {
    // `state.slots` reflects the fetch from before this round's last answer
    // (we don't refresh before showing this screen), so derive the count
    // from the round number itself rather than the stale lock count.
    const remaining = state.totalQuestions - justFinishedRound * 10;
    return (
      <div className="rounded-xl2 border bg-white p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <Mascot mood="cheer" className="h-20 w-20 animate-pop-in" />
        </div>
        <h2 className="mt-2 text-xl font-bold text-brand-800">{t("masterySession.roundComplete", { round: justFinishedRound })}</h2>
        <p className="mt-2 text-slate-600">{t("masterySession.questionsRemaining", { count: remaining })}</p>
        <p className="mt-1 text-sm text-slate-500">{t("masterySession.takeABreak")}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={handleContinueRound} className="touch-target rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
            {remaining > 0 ? t("masterySession.startRound", { round: justFinishedRound + 1 }) : t("masterySession.continueLabel")}
          </button>
          {remaining > 0 && (
            <button type="button" onClick={handlePause} className="touch-target rounded-xl2 border-2 border-brand-500 px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50">
              {t("masterySession.saveAndBreak")}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (mode === "redo-intro") {
    const redoCount = state.slots.filter((s) => s.roundNumber === MASTERY_REDO_ROUND_NUMBER).length;
    return (
      <div className="rounded-xl2 border bg-white p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <Mascot mood="think" className="h-20 w-20 animate-pop-in" />
        </div>
        <h2 className="mt-2 text-xl font-bold text-brand-800">{t("masterySession.redoIntroTitle")}</h2>
        <p className="mt-2 text-slate-600">{t("masterySession.redoIntroBody", { count: redoCount })}</p>
        <button type="button" onClick={handleStartRedoRound} className="touch-target mt-6 rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
          {t("masterySession.redoIntroButton")}
        </button>
      </div>
    );
  }

  if (mode === "ready-to-submit" || mode === "submitting") {
    return (
      <div className="rounded-xl2 border bg-white p-8 text-center shadow-sm">
        <p className="text-4xl" aria-hidden="true">
          ✅
        </p>
        <h2 className="mt-2 text-xl font-bold text-brand-800">{t("masterySession.allAnsweredTitle", { total: state.totalQuestions })}</h2>
        <p className="mt-2 text-slate-600">{t("masterySession.allAnsweredBody")}</p>
        <button
          type="button"
          onClick={handleFinalize}
          disabled={mode === "submitting"}
          className="touch-target mt-6 rounded-xl2 bg-leaf-600 px-8 py-3 text-lg font-semibold text-white hover:bg-leaf-700 disabled:opacity-60"
        >
          {mode === "submitting" ? t("masterySession.submitting") : t("masterySession.submitChallenge")}
        </button>
      </div>
    );
  }

  if (!question) return null;

  const answeredCount = state.slots.filter((s) => s.locked).length;
  const nextSlot = state.slots.find((sl) => !sl.locked)!;
  const progress = Math.round((answeredCount / state.totalQuestions) * 100);
  const isRedoQuestion = nextSlot.roundNumber === MASTERY_REDO_ROUND_NUMBER;
  const redoTotal = state.slots.filter((s) => s.roundNumber === MASTERY_REDO_ROUND_NUMBER).length;

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>
            {isRedoQuestion
              ? t("masterySession.redoQuestionOf", { position: nextSlot.positionInRound, total: redoTotal })
              : t("masterySession.roundOf", { round: nextSlot.roundNumber, position: nextSlot.positionInRound })}
          </span>
          <span>{t("masterySession.remainingOverall", { count: state.totalQuestions - answeredCount })}</span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-slate-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 rounded-full bg-brand-500 transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <Scratchpad />
      </div>

      {error && <p className="mb-3 rounded-lg bg-berry-50 p-3 text-sm text-berry-600">{error}</p>}

      <div className="rounded-xl2 border bg-white p-6 shadow-sm" data-testid="question-card" data-log-id={question.logId}>
        <p className="text-xl font-semibold text-slate-800">{question.prompt}</p>
        <div className="mt-4">
          <QuestionInput question={question} disabled={wasWrong || submitting} onSubmit={handleAnswer} />
        </div>
      </div>

      {wasWrong && (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl2 border-2 border-slate-300 bg-slate-50 p-5 text-center" role="status" data-testid="mastery-wrong-notice">
            <p className="text-lg font-bold text-slate-700">{t("masterySession.wrongNoticeTitle")}</p>
            <p className="mt-1 text-sm text-slate-600">{t("masterySession.wrongNoticeBody")}</p>
          </div>
          <button type="button" onClick={continueAfterWrong} className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
            {t("masterySession.continueNext")}
          </button>
        </div>
      )}

      {!wasWrong && (
        <button type="button" onClick={handlePause} className="mt-4 text-sm font-semibold text-slate-500 underline">
          {t("masterySession.pauseAndSave")}
        </button>
      )}
    </div>
  );
}
