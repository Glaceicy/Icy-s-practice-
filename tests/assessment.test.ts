import { describe, expect, it } from "vitest";
import {
  AssessmentImmutableError,
  buildAssessment,
  finalizeAssessment,
  pauseAssessment,
  remainingQuestionCount,
  resumeAssessment,
  roundComplete,
  submitAnswer
} from "@/lib/assessment";

function fortyPicks() {
  return Array.from({ length: 40 }, (_, i) => ({ templateKey: `tpl.${i % 5}`, seed: i }));
}

describe("Mastery Challenge assessment engine (spec §3E, §16)", () => {
  it("requires exactly 40 questions", () => {
    expect(() => buildAssessment(fortyPicks().slice(0, 39))).toThrow();
    expect(() => buildAssessment(fortyPicks())).not.toThrow();
  });

  it("splits 40 questions into 4 rounds of 10", () => {
    const state = buildAssessment(fortyPicks());
    for (let round = 1; round <= 4; round++) {
      const inRound = state.slots.filter((s) => s.roundNumber === round);
      expect(inRound).toHaveLength(10);
      expect(inRound.map((s) => s.positionInRound).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
  });

  it("shows how many questions remain as the child answers", () => {
    let state = buildAssessment(fortyPicks());
    expect(remainingQuestionCount(state)).toBe(40);
    state = submitAnswer(state, 1, 1, "5", true);
    expect(remainingQuestionCount(state)).toBe(39);
  });

  it("only the first submitted answer counts — a second submission is rejected, not silently overwritten", () => {
    let state = buildAssessment(fortyPicks());
    state = submitAnswer(state, 1, 1, "5", true); // correct first answer
    expect(() => submitAnswer(state, 1, 1, "5", true)).toThrow(AssessmentImmutableError);
    const slot = state.slots.find((s) => s.roundNumber === 1 && s.positionInRound === 1)!;
    expect(slot.isCorrect).toBe(true);
    expect(slot.locked).toBe(true);
  });

  it("supports pause and resume without losing recorded answers", () => {
    let state = buildAssessment(fortyPicks());
    state = submitAnswer(state, 1, 1, "5", true);
    state = pauseAssessment(state);
    expect(state.status).toBe("PAUSED");
    state = resumeAssessment(state);
    expect(state.status).toBe("IN_PROGRESS");
    expect(state.slots.find((s) => s.roundNumber === 1 && s.positionInRound === 1)!.locked).toBe(true);
  });

  it("reports when a round is complete", () => {
    let state = buildAssessment(fortyPicks());
    expect(roundComplete(state, 1)).toBe(false);
    for (let pos = 1; pos <= 10; pos++) {
      state = submitAnswer(state, 1, pos, "x", false);
    }
    expect(roundComplete(state, 1)).toBe(true);
    expect(roundComplete(state, 2)).toBe(false);
  });

  it("refuses to finalize an assessment with unanswered questions", () => {
    const state = buildAssessment(fortyPicks());
    expect(() => finalizeAssessment(state)).toThrow();
  });

  it("38/40 correct passes and unlocks; 37/40 does not (spec §16 exact boundary)", () => {
    function answerAllWith(correctCount: number) {
      let state = buildAssessment(fortyPicks());
      let answered = 0;
      for (let round = 1; round <= 4; round++) {
        for (let pos = 1; pos <= 10; pos++) {
          const isCorrect = answered < correctCount;
          state = submitAnswer(state, round, pos, isCorrect ? "correct" : "wrong", isCorrect);
          answered++;
        }
      }
      return finalizeAssessment(state);
    }

    const passResult = answerAllWith(38);
    expect(passResult.result.correctFirstAttempt).toBe(38);
    expect(passResult.result.scorePercentage).toBeCloseTo(95);
    expect(passResult.result.passed).toBe(true);

    const failResult = answerAllWith(37);
    expect(failResult.result.correctFirstAttempt).toBe(37);
    expect(failResult.result.scorePercentage).toBeCloseTo(92.5);
    expect(failResult.result.passed).toBe(false);
  });

  it("locks the whole assessment after submission — no further answers accepted", () => {
    let state = buildAssessment(fortyPicks());
    for (let round = 1; round <= 4; round++) {
      for (let pos = 1; pos <= 10; pos++) {
        state = submitAnswer(state, round, pos, "x", true);
      }
    }
    const { state: finalState } = finalizeAssessment(state);
    expect(finalState.status).toBe("SUBMITTED");
    expect(() => submitAnswer(finalState, 1, 1, "y", true)).toThrow(AssessmentImmutableError);
    expect(() => finalizeAssessment(finalState)).toThrow(AssessmentImmutableError);
  });
});
