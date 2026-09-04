import { describe, expect, it } from "vitest";
import {
  MASTERY_PASS_CORRECT,
  MASTERY_TOTAL_QUESTIONS,
  computeScorePercentage,
  isMasteryPass,
  positionInRoundForQuestionIndex,
  roundNumberForQuestionIndex
} from "@/lib/scoring";

describe("scoring rules (spec §16)", () => {
  it("computes score_percentage = correct / total * 100", () => {
    expect(computeScorePercentage(38, 40)).toBeCloseTo(95);
    expect(computeScorePercentage(37, 40)).toBeCloseTo(92.5);
    expect(computeScorePercentage(40, 40)).toBe(100);
    expect(computeScorePercentage(0, 40)).toBe(0);
  });

  it("rejects out-of-range inputs", () => {
    expect(() => computeScorePercentage(-1, 40)).toThrow();
    expect(() => computeScorePercentage(41, 40)).toThrow();
    expect(() => computeScorePercentage(5, 0)).toThrow();
  });

  it("38/40 (95%) passes", () => {
    expect(isMasteryPass(38)).toBe(true);
  });

  it("39/40 and 40/40 pass", () => {
    expect(isMasteryPass(39)).toBe(true);
    expect(isMasteryPass(40)).toBe(true);
  });

  it("37/40 (92.5%) does NOT pass — this is the exact boundary the spec requires", () => {
    expect(isMasteryPass(37)).toBe(false);
    expect(computeScorePercentage(37, 40)).toBeLessThan(95);
  });

  it("MASTERY_PASS_CORRECT is exactly 38 out of 40", () => {
    expect(MASTERY_PASS_CORRECT).toBe(38);
    expect(MASTERY_TOTAL_QUESTIONS).toBe(40);
  });

  it("maps a zero-based question index to its round (1-4) and position-in-round (1-10)", () => {
    expect(roundNumberForQuestionIndex(0)).toBe(1);
    expect(positionInRoundForQuestionIndex(0)).toBe(1);
    expect(roundNumberForQuestionIndex(9)).toBe(1);
    expect(positionInRoundForQuestionIndex(9)).toBe(10);
    expect(roundNumberForQuestionIndex(10)).toBe(2);
    expect(positionInRoundForQuestionIndex(10)).toBe(1);
    expect(roundNumberForQuestionIndex(39)).toBe(4);
    expect(positionInRoundForQuestionIndex(39)).toBe(10);
  });
});
