import { MASTERY_QUESTIONS_PER_ROUND, MASTERY_ROUNDS, MASTERY_TOTAL_QUESTIONS, computeScorePercentage, isMasteryPass } from "./scoring";

export interface AssessmentSlot {
  roundNumber: number; // 1-4
  positionInRound: number; // 1-10
  templateKey: string;
  seed: number;
  givenAnswer: string | null;
  isCorrect: boolean | null;
  locked: boolean; // true once an answer has been submitted for this question — immutable thereafter
  answeredAt: string | null;
}

export type AssessmentStatus = "IN_PROGRESS" | "PAUSED" | "SUBMITTED";

export interface AssessmentState {
  totalQuestions: number;
  currentRound: number;
  status: AssessmentStatus;
  slots: AssessmentSlot[];
}

export function buildAssessment(picks: Array<{ templateKey: string; seed: number }>): AssessmentState {
  if (picks.length !== MASTERY_TOTAL_QUESTIONS) {
    throw new Error(`A Mastery Challenge must contain exactly ${MASTERY_TOTAL_QUESTIONS} questions, got ${picks.length}`);
  }
  const slots: AssessmentSlot[] = picks.map((p, i) => ({
    roundNumber: Math.floor(i / MASTERY_QUESTIONS_PER_ROUND) + 1,
    positionInRound: (i % MASTERY_QUESTIONS_PER_ROUND) + 1,
    templateKey: p.templateKey,
    seed: p.seed,
    givenAnswer: null,
    isCorrect: null,
    locked: false,
    answeredAt: null
  }));
  return { totalQuestions: MASTERY_TOTAL_QUESTIONS, currentRound: 1, status: "IN_PROGRESS", slots };
}

export class AssessmentImmutableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssessmentImmutableError";
  }
}

/** Submit an answer for one question. Only the FIRST submission for a given
 * question is ever recorded — the slot locks immediately afterwards, so a
 * re-submission attempt is rejected rather than silently overwriting the
 * score (spec §3E: "Only the child's first submitted answer counts"). */
export function submitAnswer(
  state: AssessmentState,
  roundNumber: number,
  positionInRound: number,
  givenAnswer: string,
  isCorrect: boolean,
  now: string = new Date().toISOString()
): AssessmentState {
  if (state.status === "SUBMITTED") {
    throw new AssessmentImmutableError("This Mastery Challenge has already been submitted and cannot be changed.");
  }
  const slots = state.slots.map((slot) => {
    if (slot.roundNumber !== roundNumber || slot.positionInRound !== positionInRound) return slot;
    if (slot.locked) {
      throw new AssessmentImmutableError(
        `Question round ${roundNumber} position ${positionInRound} was already answered — only the first answer counts.`
      );
    }
    return { ...slot, givenAnswer, isCorrect, locked: true, answeredAt: now };
  });
  return { ...state, slots };
}

export function pauseAssessment(state: AssessmentState): AssessmentState {
  if (state.status === "SUBMITTED") throw new AssessmentImmutableError("Cannot pause a submitted assessment.");
  return { ...state, status: "PAUSED" };
}

export function resumeAssessment(state: AssessmentState): AssessmentState {
  if (state.status === "SUBMITTED") throw new AssessmentImmutableError("Cannot resume a submitted assessment.");
  return { ...state, status: "IN_PROGRESS" };
}

export function remainingQuestionCount(state: AssessmentState): number {
  return state.slots.filter((s) => !s.locked).length;
}

export function roundComplete(state: AssessmentState, roundNumber: number): boolean {
  return state.slots.filter((s) => s.roundNumber === roundNumber).every((s) => s.locked);
}

export interface AssessmentResult {
  correctFirstAttempt: number;
  totalQuestions: number;
  scorePercentage: number;
  passed: boolean;
}

/** Final submission: every question must be answered, the assessment locks
 * permanently, and the score is computed purely from first-attempt
 * correctness recorded on each slot (never recomputed afterwards). */
export function finalizeAssessment(state: AssessmentState): { state: AssessmentState; result: AssessmentResult } {
  if (state.status === "SUBMITTED") {
    throw new AssessmentImmutableError("This Mastery Challenge has already been submitted.");
  }
  const unanswered = state.slots.filter((s) => !s.locked);
  if (unanswered.length > 0) {
    throw new Error(`Cannot submit: ${unanswered.length} question(s) still unanswered.`);
  }
  const correctFirstAttempt = state.slots.filter((s) => s.isCorrect === true).length;
  const scorePercentage = computeScorePercentage(correctFirstAttempt, state.totalQuestions);
  const passed = isMasteryPass(correctFirstAttempt, state.totalQuestions);
  return {
    state: { ...state, status: "SUBMITTED" },
    result: { correctFirstAttempt, totalQuestions: state.totalQuestions, scorePercentage, passed }
  };
}

export function roundsTotal(): number {
  return MASTERY_ROUNDS;
}
