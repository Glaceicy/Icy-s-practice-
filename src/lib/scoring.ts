// Core scoring rules for the Mastery Challenge (spec §16). Pure and
// framework-agnostic so it can be unit tested in isolation from the database.

export const MASTERY_TOTAL_QUESTIONS = 40;
export const MASTERY_ROUNDS = 4;
export const MASTERY_QUESTIONS_PER_ROUND = MASTERY_TOTAL_QUESTIONS / MASTERY_ROUNDS;
export const MASTERY_PASS_CORRECT = 38; // 38/40 = 95%
export const MASTERY_PASS_PERCENTAGE = 95;
export const GUIDED_PRACTICE_QUESTIONS = 10;
export const INDEPENDENT_PRACTICE_MIN_QUESTIONS = 20;
export const REVISION_MIN_QUESTIONS = 10;

/** score_percentage = correct_first_attempt_answers / total_assessment_questions x 100 */
export function computeScorePercentage(correctFirstAttempt: number, totalQuestions: number = MASTERY_TOTAL_QUESTIONS): number {
  if (totalQuestions <= 0) throw new Error("totalQuestions must be positive");
  if (correctFirstAttempt < 0 || correctFirstAttempt > totalQuestions) {
    throw new Error(`correctFirstAttempt (${correctFirstAttempt}) out of range for totalQuestions (${totalQuestions})`);
  }
  return (correctFirstAttempt / totalQuestions) * 100;
}

/** Pass rule: for a standard 40-question Mastery Challenge, 38, 39 or 40
 * correct answers pass (>=95%); 37 or fewer do not. Generalised to any total
 * via the 95% threshold for non-standard totals (used only in tests). */
export function isMasteryPass(correctFirstAttempt: number, totalQuestions: number = MASTERY_TOTAL_QUESTIONS): boolean {
  if (totalQuestions === MASTERY_TOTAL_QUESTIONS) {
    return correctFirstAttempt >= MASTERY_PASS_CORRECT;
  }
  return computeScorePercentage(correctFirstAttempt, totalQuestions) >= MASTERY_PASS_PERCENTAGE;
}

export function roundNumberForQuestionIndex(positionZeroBased: number): number {
  return Math.floor(positionZeroBased / MASTERY_QUESTIONS_PER_ROUND) + 1; // 1-4
}

export function positionInRoundForQuestionIndex(positionZeroBased: number): number {
  return (positionZeroBased % MASTERY_QUESTIONS_PER_ROUND) + 1; // 1-10
}
