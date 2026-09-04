import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 1 — "Number accuracy, bounds, indices, standard form and surds"
// A smaller but fully valid, deterministic bank (15 templates) demonstrating
// the engine at KS4/GCSE depth, including Foundation/Higher pathway tagging.
// See DOCUMENTATION.md "Content coverage status".

function simplifySurd(n: number): { coeff: number; radicand: number } {
  let coeff = 1;
  let radicand = n;
  for (let f = 2; f * f <= radicand; f++) {
    while (radicand % (f * f) === 0) {
      radicand /= f * f;
      coeff *= f;
    }
  }
  return { coeff, radicand };
}

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y10l1.upperBound", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 500], [0, 1]], compute: (v) => v[0]! + [0.5, 5][v[1]!]!,
    derive: (v) => ({ accuracy: [1, 10][v[1]!]! }),
    promptTemplates: ["A length of {a} cm is measured to the nearest {accuracy} cm. What is the upper bound?"],
    explain: (v, r) => [`Half of ${[1, 10][v[1]!]} is added to find the upper bound: ${v[0]} + ${[0.5, 5][v[1]!]} = ${r}.`],
    hints: () => ["The upper bound is half a unit above the rounded value."],
    formatValue: (n) => String(n),
    declaredVariationSpace: 491 * 2
  }),
  arithmeticTemplate({
    key: "y10l1.lowerBound", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 500], [0, 1]], compute: (v) => v[0]! - [0.5, 5][v[1]!]!,
    derive: (v) => ({ accuracy: [1, 10][v[1]!]! }),
    promptTemplates: ["A mass of {a} kg is measured to the nearest {accuracy} kg. What is the lower bound?"],
    explain: (v, r) => [`Half of ${[1, 10][v[1]!]} is subtracted to find the lower bound: ${v[0]} - ${[0.5, 5][v[1]!]} = ${r}.`],
    hints: () => ["The lower bound is half a unit below the rounded value."],
    formatValue: (n) => String(n),
    declaredVariationSpace: 491 * 2
  }),
  arithmeticTemplate({
    key: "y10l1.indexLawMultiply", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 6], [1, 6]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["Simplify {a}^{b} x {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When multiplying powers of the same base, add the indices: ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Same base, multiplying: add the powers."],
    declaredVariationSpace: 8 * 6 * 6
  }),
  arithmeticTemplate({
    key: "y10l1.indexLawDivide", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [3, 10], [1, 5]], constraint: (v) => v[1]! > v[2]!, compute: (v) => v[1]! - v[2]!,
    promptTemplates: ["Simplify {a}^{b} ÷ {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When dividing powers of the same base, subtract the indices: ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Same base, dividing: subtract the powers."],
    declaredVariationSpace: 8 * 8 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.negativeIndex", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [1, 4]], compute: (v) => Math.pow(v[0]!, v[1]!),
    promptTemplates: ["Write {a}^-{b} as a fraction: 1/n. What is n?", "{a}^-{b} equals 1/n. Find n."],
    explain: (v, r) => [`A negative index means "one over": ${v[0]}^-${v[1]} = 1/${v[0]}^${v[1]} = 1/${r}.`],
    hints: () => ["A negative power means 1 divided by the positive power."],
    declaredVariationSpace: 19 * 4 * 2
  }),
  categoricalPoolTemplate({
    key: "y10l1.fractionalIndex", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { base: ["4", "9", "16", "25", "36", "49", "64", "81", "100"] },
    build: (picked) => {
      const n = Number(picked.base);
      const root = Math.sqrt(n);
      return {
        prompt: `What is ${picked.base}^(1/2)?`,
        correctLabel: String(root),
        distractorLabels: [String(root + 1), String(root - 1), String(n / 2)],
        explanationSteps: [`A power of 1/2 means the square root: √${picked.base} = ${root}.`],
        hints: ["A power of one-half means 'take the square root'."]
      };
    },
    declaredVariationSpace: 9 * 4 * 5
  }),
  arithmeticTemplate({
    key: "y10l1.standardFormToNumber", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [1, 6]], compute: (v) => v[0]! * Math.pow(10, v[1]! - 1),
    derive: (v) => ({ mantissa: (v[0]! / 10).toFixed(1), exponent: v[1]! }),
    promptTemplates: ["Write {mantissa} x 10^{exponent} as an ordinary number."],
    explain: (v, r) => [`Multiply ${(v[0]! / 10).toFixed(1)} by 10^${v[1]} by moving the decimal point ${v[1]} places right: ${r}.`],
    hints: () => ["Moving the decimal point right multiplies by 10 each time."],
    declaredVariationSpace: 90 * 6
  }),
  arithmeticTemplate({
    key: "y10l1.numberToStandardFormExponent", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9]], compute: (v) => v[1]!,
    derive: (v) => ({ n: v[0]! * Math.pow(10, v[1]!) }),
    promptTemplates: [
      "Written in standard form, {n} = {a} x 10^n, where {a} is a single non-zero digit. What is n?",
      "{n} is written as {a} x 10^n in standard form. What is n?"
    ],
    explain: (v, r) => [`Counting the places the decimal point moves gives the exponent: n = ${r}.`],
    hints: () => ["Count how many places the decimal point moves to get one non-zero digit before it."],
    declaredVariationSpace: 9 * 9 * 2
  }),
  categoricalPoolTemplate({
    key: "y10l1.mcCompareStandardForm", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "REASONING",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { m1: ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"], e1: ["3", "4", "5", "6"], m2: ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"], e2: ["3", "4", "5", "6"] },
    build: (picked) => {
      let m2 = picked.m2!;
      let e2 = picked.e2!;
      // Guard against drawing the identical tuple for both sides, which would
      // leave only one distinct choice label (invalid multiple-choice question).
      if (m2 === picked.m1 && e2 === picked.e1) {
        const alt = ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"].find((m) => m !== m2)!;
        m2 = alt;
      }
      const v1 = Number(picked.m1) * Math.pow(10, Number(picked.e1));
      const v2 = Number(m2) * Math.pow(10, Number(e2));
      const bigger = v1 >= v2 ? `${picked.m1} x 10^${picked.e1}` : `${m2} x 10^${e2}`;
      const smaller = v1 >= v2 ? `${m2} x 10^${e2}` : `${picked.m1} x 10^${picked.e1}`;
      return {
        prompt: `Which is bigger: ${picked.m1} x 10^${picked.e1} or ${m2} x 10^${e2}?`,
        correctLabel: bigger,
        distractorLabels: [smaller],
        explanationSteps: ["Compare the exponents first; if equal, compare the mantissas."],
        hints: ["A bigger exponent (power of 10) usually means a bigger number."]
      };
    },
    declaredVariationSpace: 6 * 4 * 6 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.simplifySurd", levelKey: "Y10L1", objectiveCode: "Y10-L1-4", difficulty: "REASONING",
    misconceptionTags: ["SURD_SIMPLIFICATION_ERROR"], type: "NUMBER_ENTRY", pathway: "HIGHER",
    ranges: [[2, 30], [2, 9]], compute: (v) => v[0]! * v[0]! * v[1]!,
    derive: (v, r) => {
      const { coeff, radicand } = simplifySurd(r);
      return { n: r, coefficient: coeff, radicand };
    },
    promptTemplates: ["Simplify √{n} to the form a√b. What is the value of a (the coefficient)?", "√{n} simplifies to a√b. Find a."],
    explain: (v, r) => {
      const { coeff, radicand } = simplifySurd(r);
      return [`√${r} = ${coeff}√${radicand}.`];
    },
    hints: () => ["Find the largest square number that divides into the number under the root."],
    formatValue: (n) => {
      const { coeff } = simplifySurd(n);
      return String(coeff);
    },
    declaredVariationSpace: 29 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y10l1.tfBounds", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "TRUE_FALSE",
    ranges: [[10, 200]], compute: (v) => v[0]! + 0.5,
    promptTemplates: ["A length of {a} cm is measured to the nearest cm. Its upper bound is"],
    explain: (v, r) => [`Upper bound = ${v[0]} + 0.5 = ${r}.`],
    hints: () => ["The upper bound is half a unit above the rounded value."],
    declaredVariationSpace: 191 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.wordProblemBounds", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "REASONING",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "WORD_PROBLEM",
    ranges: [[50, 300]], compute: (v) => v[0]! + 0.5,
    promptTemplates: ["A plank of wood measures {a} cm to the nearest centimetre. What is the maximum possible length it could actually be?"],
    explain: (v, r) => [`The true length could be up to half a centimetre more: ${v[0]} + 0.5 = ${r} cm.`],
    hints: () => ["The maximum possible value is half a unit above the rounded measurement."],
    formatValue: (n) => `${n} cm`,
    declaredVariationSpace: 251
  }),
  arithmeticTemplate({
    key: "y10l1.standardFormMultiplyMantissa", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "REASONING",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [2, 9], [1, 6], [1, 6]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["(A x 10^{c}) x (B x 10^{d}) has mantissa A x B, where A = {a} and B = {b}. What is A x B?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, "Multiply the mantissas and add the exponents separately."],
    hints: () => ["Multiply the two mantissas together first."],
    declaredVariationSpace: 8 * 8 * 6 * 6
  }),
  categoricalPoolTemplate({
    key: "y10l1.reasoningExplainBounds", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "REASONING",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "REASONING_EXPLAIN",
    pools: { unit: ["cm", "kg", "litres", "metres", "seconds"], value: ["12", "45", "78", "120", "200", "36"] },
    build: (picked) => ({
      prompt: `A measurement of ${picked.value} ${picked.unit} is given to the nearest whole ${picked.unit}. Why is the true value between ${Number(picked.value) - 0.5} and ${Number(picked.value) + 0.5} ${picked.unit}?`,
      correctLabel: "Because rounding to the nearest whole unit means the true value is within half a unit either side",
      distractorLabels: [
        "Because all measurements are always exact",
        "Because the true value must be a whole number too",
        "Because rounding always rounds down"
      ],
      explanationSteps: ["Rounding to the nearest unit means any true value within half a unit rounds to the same figure."],
      hints: ["Think about which values would round to this same measurement."]
    }),
    declaredVariationSpace: 5 * 6 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.indexLawPower", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 6], [1, 4]], compute: (v) => v[1]! * v[2]!,
    promptTemplates: ["Simplify ({a}^{b})^{c}, giving your answer as {a}^n. What is n?", "({a}^{b})^{c} = {a}^n. What is n?"],
    explain: (v, r) => [`When raising a power to a power, multiply the indices: ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Power of a power: multiply the indices together."],
    declaredVariationSpace: 8 * 6 * 4 * 2
  })
];

export default level;
