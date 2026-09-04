"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchNextPracticeQuestionAction, submitPracticeAnswerAction, type PracticeQuestionPayload } from "@/lib/actions/learning";
import QuestionInput from "./QuestionInput";
import WrongAnswerCard, { type WrongAnswerSupportView } from "./WrongAnswerCard";

export default function PracticeSession({
  attemptId,
  childId,
  levelId,
  mode,
  nextHref
}: {
  attemptId: string;
  childId: string;
  levelId: string;
  mode: "GUIDED" | "INDEPENDENT" | "REVISION";
  nextHref: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<PracticeQuestionPayload | null>(null);
  const [support, setSupport] = useState<WrongAnswerSupportView | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintShown, setHintShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [celebrating, setCelebrating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setSupport(null);
    setHintShown(false);
    setHintsUsed(0);
    const next = await fetchNextPracticeQuestionAction(attemptId);
    setState(next);
    setLoading(false);
  }, [attemptId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAnswer(answer: string) {
    if (!state?.question) return;
    const result = await submitPracticeAnswerAction(attemptId, state.position, state.question.logId, answer, hintsUsed);
    if (result.isCorrect) {
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 900);
      if (result.attemptComplete) {
        router.push(nextHref);
        return;
      }
      await load();
    } else {
      setSupport(result.support);
    }
  }

  async function tryAgain() {
    setSupport(null);
    setHintShown(false);
    await load();
  }

  if (loading) {
    return <p className="text-center text-slate-500">Loading your next question&hellip;</p>;
  }

  if (!state || state.done || !state.question) {
    return <p className="text-center text-slate-500">All done! Taking you to the next step&hellip;</p>;
  }

  const progress = Math.round((state.position / state.totalQuestions) * 100);

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>
            Question {state.position + 1} of {state.totalQuestions}
          </span>
          <span>{state.totalQuestions - state.position} remaining</span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-slate-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 rounded-full bg-brand-500 transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {celebrating && (
        <p className="mb-3 text-center text-lg font-bold text-leaf-600" aria-live="polite">
          🎉 Well done!
        </p>
      )}

      <div className="rounded-xl2 border bg-white p-6 shadow-sm" data-testid="question-card" data-log-id={state.question.logId}>
        <p className="text-xl font-semibold text-slate-800">{state.question.prompt}</p>

        {mode === "GUIDED" && !support && (
          <div className="mt-3">
            {!hintShown ? (
              <button
                type="button"
                onClick={() => {
                  setHintShown(true);
                  setHintsUsed((h) => h + 1);
                }}
                className="touch-target rounded-lg border border-brand-300 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                💡 Get a hint
              </button>
            ) : (
              <p className="rounded-lg bg-brand-50 p-3 text-sm text-brand-800">Take it one step at a time — think about what the question is really asking.</p>
            )}
          </div>
        )}

        <div className="mt-4">
          <QuestionInput question={state.question} disabled={false} onSubmit={handleAnswer} />
        </div>
      </div>

      {support && (
        <div className="mt-4 space-y-3">
          <WrongAnswerCard support={support} />
          <button
            type="button"
            onClick={tryAgain}
            className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Try a similar question
          </button>
        </div>
      )}
    </div>
  );
}
