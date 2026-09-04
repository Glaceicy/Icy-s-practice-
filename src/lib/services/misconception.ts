import { misconceptionLabel } from "@/lib/types";

export interface WrongAnswerSourceFields {
  explanationSteps: string[];
  hints: string[];
  misconceptionTag?: string | null;
}

const ENCOURAGEMENTS_FIRST = [
  "Good try. Let's look at this together.",
  "Nice attempt! Let's work through it step by step.",
  "You're thinking hard about this — let's take another look together."
];

const ENCOURAGEMENTS_SECOND = [
  "You're nearly there! Let's break this down into smaller steps.",
  "Great effort — let's slow down and do this one step at a time.",
  "That's okay, this one is tricky. Let's work through it together, step by step."
];

/** Structured, positive response to a wrong answer (spec §4). Never says
 * "wrong" or "incorrect" — identifies the likely misconception, re-explains
 * using the question's own step-by-step explanation, offers a hint, and
 * (via the caller) leads into a similar follow-up question so the child
 * tries again with a fresh but related problem. */
export interface WrongAnswerSupport {
  encouragement: string;
  misconceptionTag: string | null;
  misconceptionLabel: string | null;
  stepExplanation: string[];
  hint: string;
  isSecondWrongAttempt: boolean;
  scaffoldToEasier: boolean; // true from the 2nd wrong attempt on the same question — spec §4 step-by-step scaffold
}

export function buildWrongAnswerSupport(
  instance: WrongAnswerSourceFields,
  attemptNumberForThisQuestion: number,
  hintIndex = 0
): WrongAnswerSupport {
  const isSecond = attemptNumberForThisQuestion >= 2;
  const pool = isSecond ? ENCOURAGEMENTS_SECOND : ENCOURAGEMENTS_FIRST;
  const encouragement = pool[attemptNumberForThisQuestion % pool.length] ?? pool[0]!;
  const hint = instance.hints[Math.min(hintIndex, instance.hints.length - 1)] ?? instance.hints[0] ?? "Take it one step at a time.";

  return {
    encouragement,
    misconceptionTag: instance.misconceptionTag ?? null,
    misconceptionLabel: instance.misconceptionTag ? misconceptionLabel(instance.misconceptionTag) : null,
    stepExplanation: instance.explanationSteps,
    hint,
    isSecondWrongAttempt: isSecond,
    scaffoldToEasier: isSecond
  };
}
