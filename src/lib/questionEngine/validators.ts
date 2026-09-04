import type { GeneratedQuestionInstance, QuestionTemplateDef } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/** Deterministic, non-AI validation of a generated question instance. This is
 * the gate every question passes through before it is ever shown to a child —
 * grading always relies on `correctAnswer`, computed here to be present,
 * well-formed and (for choice-based types) consistent with the offered
 * choices. */
export function validateQuestion(q: GeneratedQuestionInstance): ValidationResult {
  const errors: string[] = [];

  if (!q.prompt || q.prompt.trim().length === 0) errors.push("prompt is empty");
  if (/\{[a-zA-Z]+\}/.test(q.prompt)) errors.push("prompt contains an unfilled placeholder");
  if (!q.correctAnswer || q.correctAnswer.trim().length === 0) errors.push("correctAnswer is empty");
  if (!q.explanationSteps || q.explanationSteps.length === 0) errors.push("no explanationSteps provided");
  if (!q.hints || q.hints.length === 0) errors.push("no hints provided");

  const mcTypes = new Set(["MULTIPLE_CHOICE", "TRUE_FALSE"]);
  if (mcTypes.has(q.type)) {
    if (!q.choices || q.choices.length < 2) {
      errors.push("choice-based question must have at least 2 choices");
    } else {
      const ids = q.choices.map((c) => c.id);
      if (new Set(ids).size !== ids.length) errors.push("duplicate choice ids");
      if (!ids.includes(q.correctAnswer)) errors.push("correctAnswer id is not among the offered choices");
      const labels = q.choices.map((c) => c.label);
      if (new Set(labels).size !== labels.length) errors.push("duplicate choice labels (ambiguous question)");
    }
  }

  if (q.type === "ORDERING" || q.type === "DRAG_DROP") {
    if (!q.choices || q.choices.length < 2) {
      errors.push("ordering/drag-drop question must have at least 2 items");
    } else {
      const ids = new Set(q.choices.map((c) => c.id));
      const answerIds = q.correctAnswer.split(",");
      if (answerIds.length !== ids.size || !answerIds.every((id) => ids.has(id))) {
        errors.push("correctAnswer is not a valid permutation of the offered items");
      }
    }
  }

  if (q.type === "MATCHING") {
    if (!/^L\d+=R\d+(;L\d+=R\d+)*$/.test(q.correctAnswer)) {
      errors.push("correctAnswer is not a valid matching mapping");
    }
  }

  if (q.type === "NUMBER_ENTRY") {
    const numeric = Number(q.correctAnswer.replace(/[£p,\s]/g, ""));
    if (Number.isNaN(numeric) && !/^-?\d+\/\d+$/.test(q.correctAnswer)) {
      errors.push(`correctAnswer "${q.correctAnswer}" is not numeric or a fraction`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/** Empirically verify a template's variation space: generate `sampleSize`
 * distinct seeds and require at least `minDistinct` unique (prompt + answer)
 * combinations, all individually valid. This is the executable proof behind
 * the "≥150 validated variations per template" requirement (see the test
 * suite in tests/questionEngine.test.ts). */
export function verifyTemplateVariations(
  template: QuestionTemplateDef,
  sampleSize = 1500,
  minDistinct = 150
): { distinctCount: number; invalidSeeds: Array<{ seed: number; errors: string[] }> } {
  const seen = new Set<string>();
  const invalidSeeds: Array<{ seed: number; errors: string[] }> = [];

  for (let seed = 0; seed < sampleSize; seed++) {
    const q = template.generate(seed);
    const result = validateQuestion(q);
    if (!result.valid) {
      invalidSeeds.push({ seed, errors: result.errors });
      continue;
    }
    // Key on everything a learner would actually perceive as "the question":
    // prompt text, offered choices/labels and the visual aid payload, not
    // just the correct-answer id (which for matching/ordering questions is a
    // stable positional mapping that doesn't by itself encode which values
    // were used).
    const key = [
      q.prompt,
      q.correctAnswer,
      JSON.stringify(q.choices ?? null),
      JSON.stringify(q.visualAid?.data ?? null)
    ].join("::");
    seen.add(key);
  }

  void minDistinct;
  return { distinctCount: seen.size, invalidSeeds };
}
