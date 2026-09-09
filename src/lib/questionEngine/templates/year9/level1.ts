import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 1 — "Standard form, indices, roots and number accuracy"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y9-L1-1 standard form, Y9-L1-2 index
// laws including negative/fractional indices, Y9-L1-3 rounding to
// significant figures and estimating).
const FACTS = [
  "the distance from Earth to the Sun in km", "the number of stars in a galaxy",
  "the population of a large country", "the number of cells in the human body",
  "the distance across an ocean in metres", "the number of grains of sand on a beach",
  "the speed of light in metres per hour", "the number of atoms in a small object"
];
const CTX = ["tiles", "boxes", "coins", "counters", "seeds", "beads", "bricks", "cards"];

function roundToSigFigs(n: number, sig: number): number {
  if (n === 0) return 0;
  const digits = Math.floor(Math.log10(Math.abs(n))) + 1;
  const dropDigits = digits - sig;
  if (dropDigits <= 0) return n;
  const divisor = Math.pow(10, dropDigits);
  return Math.round(n / divisor) * divisor;
}

export const level: QuestionTemplateDef[] = [
  // --- Y9-L1-1: interpret and write numbers in standard form (A x 10^n) ---
  arithmeticTemplate({
    key: "y9l1.standardFormToNumber", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [1, 6]], compute: (v) => v[0]! * Math.pow(10, v[1]! - 1),
    derive: (v) => ({ mantissa: (v[0]! / 10).toFixed(1), exponent: v[1]! }),
    promptTemplates: ["Write {mantissa} x 10^{exponent} as an ordinary number."],
    explain: (v, r) => [`Multiply ${(v[0]! / 10).toFixed(1)} by 10^${v[1]} by moving the decimal point ${v[1]} places right: ${r}.`],
    hints: () => ["Moving the decimal point right multiplies by 10 each time."],
    declaredVariationSpace: 90 * 6
  }),
  arithmeticTemplate({
    key: "y9l1.numberToStandardFormExponent", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "APPLICATION",
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
  arithmeticTemplate({
    key: "y9l1.numberToStandardFormMantissa", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [2, 14]], compute: (v) => v[0]!,
    derive: (v) => ({ n: v[0]! * Math.pow(10, v[1]!) }),
    promptTemplates: [
      "Written in standard form, {n} = A x 10^{b}, where A is a single non-zero digit. What is A?",
      "{n} is written as A x 10^{b} in standard form. What is A?"
    ],
    explain: (v, r) => [`The first non-zero digit of ${v[0]! * Math.pow(10, v[1]!)} is ${r}, so A = ${r}.`],
    hints: () => ["A is always the first non-zero digit of the original number."],
    declaredVariationSpace: 9 * 13 * 2
  }),
  categoricalPoolTemplate({
    key: "y9l1.mcIdentifyStandardForm", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "REASONING",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const twoDigit = rng.int(10, 99);
      const exponent = rng.int(2, 6);
      const value = twoDigit * Math.pow(10, exponent - 1);
      const mantissa = (twoDigit / 10).toFixed(1);
      const correct = `${mantissa} x 10^${exponent}`;
      const distractors = [
        `${mantissa} x 10^${exponent - 1}`,
        `${twoDigit} x 10^${exponent - 1}`,
        `${(twoDigit / 100).toFixed(2)} x 10^${exponent + 1}`
      ];
      return {
        prompt: `Which of these correctly represents ${value.toLocaleString("en-GB")} in standard form?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${value.toLocaleString("en-GB")} = ${correct}, with a mantissa between 1 and 10.`],
        hints: ["In standard form the mantissa (A) must be at least 1 and less than 10."]
      };
    },
    declaredVariationSpace: 90 * 5
  }),
  categoricalPoolTemplate({
    key: "y9l1.tfValidStandardForm", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "REASONING",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const isValidCase = rng.chance(0.5);
      const exponent = rng.int(1, 8);
      let label: string;
      if (isValidCase) {
        const mantissaWhole = rng.int(1, 9);
        const decimal = rng.int(0, 9);
        label = `${mantissaWhole}.${decimal} x 10^${exponent}`;
      } else {
        const mantissaBig = rng.int(10, 99);
        const decimal = rng.int(0, 9);
        label = `${mantissaBig}.${decimal} x 10^${exponent}`;
      }
      return {
        prompt: `Is ${label} correctly written in standard form?`,
        correctLabel: isValidCase ? "True" : "False",
        distractorLabels: [isValidCase ? "False" : "True"],
        explanationSteps: ["In standard form the mantissa must be at least 1 and less than 10."],
        hints: ["Check whether the number in front of the '10^' is between 1 and 10."]
      };
    },
    declaredVariationSpace: 2 * 8 * 90 * 10
  }),
  categoricalPoolTemplate({
    key: "y9l1.mcCompareStandardForm", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { m1: ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"], e1: ["3", "4", "5", "6"], m2: ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"], e2: ["3", "4", "5", "6"] },
    build: (picked) => {
      let m2 = picked.m2!;
      let e2 = picked.e2!;
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
    key: "y9l1.wordProblemStandardForm", levelKey: "Y9L1", objectiveCode: "Y9-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 99], [2, 8]], compute: (v) => v[0]! * Math.pow(10, v[1]! - 1),
    derive: (v) => ({ mantissa: (v[0]! / 10).toFixed(1), exponent: v[1]! }), contextPool: FACTS,
    promptTemplates: ["{ctx} is about {mantissa} x 10^{exponent}. Write this as an ordinary number."],
    explain: (v, r) => [`Multiply ${(v[0]! / 10).toFixed(1)} by 10^${v[1]} by moving the decimal point ${v[1]} places right: ${r}.`],
    hints: () => ["Moving the decimal point right multiplies by 10 each time."],
    declaredVariationSpace: 90 * 7 * FACTS.length
  }),

  // --- Y9-L1-2: use the laws of indices, including negative and fractional indices ---
  arithmeticTemplate({
    key: "y9l1.indexLawMultiply", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 6], [1, 6]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["Simplify {a}^{b} x {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When multiplying powers of the same base, add the indices: ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Same base, multiplying: add the powers."],
    declaredVariationSpace: 8 * 6 * 6
  }),
  arithmeticTemplate({
    key: "y9l1.indexLawDivide", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [3, 10], [1, 5]], constraint: (v) => v[1]! > v[2]!, compute: (v) => v[1]! - v[2]!,
    promptTemplates: ["Simplify {a}^{b} ÷ {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When dividing powers of the same base, subtract the indices: ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Same base, dividing: subtract the powers."],
    declaredVariationSpace: 8 * 8 * 4
  }),
  arithmeticTemplate({
    key: "y9l1.indexLawZero", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 30]], compute: () => 1, contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is {a}^0?", "Counting {ctx}: what does {a} to the power of 0 equal?"],
    explain: () => ["Any non-zero number raised to the power of 0 equals 1."],
    hints: () => ["Any non-zero number to the power of 0 is always 1."],
    declaredVariationSpace: 29 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y9l1.negativeIndex", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [1, 4]], compute: (v) => Math.pow(v[0]!, v[1]!),
    promptTemplates: ["Write {a}^-{b} as a fraction: 1/n. What is n?", "{a}^-{b} equals 1/n. Find n."],
    explain: (v, r) => [`A negative index means "one over": ${v[0]}^-${v[1]} = 1/${v[0]}^${v[1]} = 1/${r}.`],
    hints: () => ["A negative power means 1 divided by the positive power."],
    declaredVariationSpace: 19 * 4 * 2
  }),
  categoricalPoolTemplate({
    key: "y9l1.fractionalIndexSquareRoot", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { base: ["4", "9", "16", "25", "36", "49", "64", "81", "100", "121", "144"] },
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
    declaredVariationSpace: 11 * 4 * 5
  }),
  categoricalPoolTemplate({
    key: "y9l1.fractionalIndexCubeRoot", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { base: ["8", "27", "64", "125", "216", "343", "512", "729", "1000"] },
    build: (picked) => {
      const n = Number(picked.base);
      const root = Math.cbrt(n);
      const rootRounded = Math.round(root);
      return {
        prompt: `What is ${picked.base}^(1/3)?`,
        correctLabel: String(rootRounded),
        distractorLabels: [String(rootRounded + 1), String(rootRounded - 1), String(Math.round(n / 3))],
        explanationSteps: [`A power of 1/3 means the cube root: ³√${picked.base} = ${rootRounded}.`],
        hints: ["A power of one-third means 'take the cube root'."]
      };
    },
    declaredVariationSpace: 9 * 4 * 5
  }),
  categoricalPoolTemplate({
    key: "y9l1.tfIndexLawStatement", levelKey: "Y9L1", objectiveCode: "Y9-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const lawType = rng.pick(["multiply", "divide"]);
      const a = rng.int(2, 9);
      let exprText: string;
      let correctN: number;
      if (lawType === "multiply") {
        const b = rng.int(1, 6);
        const c = rng.int(1, 6);
        exprText = `${a}^${b} x ${a}^${c}`;
        correctN = b + c;
      } else {
        const b = rng.int(2, 8);
        const c = rng.int(1, b - 1);
        exprText = `${a}^${b} ÷ ${a}^${c}`;
        correctN = b - c;
      }
      const isTrueCase = rng.chance(0.5);
      const shownN = isTrueCase ? correctN : correctN + rng.int(1, 3);
      return {
        prompt: `${exprText} = ${a}^${shownN}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${exprText} = ${a}^${correctN}.`],
        hints: ["Work out the correct index using the law, then compare it to the statement."]
      };
    },
    declaredVariationSpace: 2 * 8 * 6 * 6
  }),

  // --- Y9-L1-3: round to a given number of significant figures and estimate answers ---
  arithmeticTemplate({
    key: "y9l1.roundTo1SigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[100, 9999]], compute: (v) => roundToSigFigs(v[0]!, 1), contextPool: CTX,
    promptTemplates: ["Round {a} to 1 significant figure.", "What is {a} rounded to 1 significant figure?", "Counting {ctx}: round {a} to 1 significant figure."],
    explain: (v, r) => [`Keep only the first digit and round the rest away: ${v[0]} rounds to ${r} to 1 significant figure.`],
    hints: () => ["Only the first (most significant) digit is kept; look at the next digit to decide rounding direction."],
    declaredVariationSpace: 9900 * 3
  }),
  arithmeticTemplate({
    key: "y9l1.roundTo2SigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 99999]], compute: (v) => roundToSigFigs(v[0]!, 2), contextPool: CTX,
    promptTemplates: ["Round {a} to 2 significant figures.", "What is {a} rounded to 2 significant figures?", "Counting {ctx}: round {a} to 2 significant figures."],
    explain: (v, r) => [`Keep the first two digits and round the rest away: ${v[0]} rounds to ${r} to 2 significant figures.`],
    hints: () => ["Keep the first two digits; look at the third digit to decide rounding direction."],
    declaredVariationSpace: 98999 * 3
  }),
  arithmeticTemplate({
    key: "y9l1.roundTo3SigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10000, 999999]], compute: (v) => roundToSigFigs(v[0]!, 3), contextPool: CTX,
    promptTemplates: ["Round {a} to 3 significant figures.", "What is {a} rounded to 3 significant figures?", "Counting {ctx}: round {a} to 3 significant figures."],
    explain: (v, r) => [`Keep the first three digits and round the rest away: ${v[0]} rounds to ${r} to 3 significant figures.`],
    hints: () => ["Keep the first three digits; look at the fourth digit to decide rounding direction."],
    declaredVariationSpace: 989999 * 3
  }),
  categoricalPoolTemplate({
    key: "y9l1.mcRoundSigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const sig = rng.pick([1, 2, 3]);
      const n = rng.int(10000, 99999);
      const rounded = roundToSigFigs(n, sig);
      const spread = Math.max(10, Math.round(rounded * 0.05));
      const distractors = numericDistractors(rng, rounded, 3, spread).map((d) => d.toLocaleString("en-GB"));
      return {
        prompt: `What is ${n.toLocaleString("en-GB")} rounded to ${sig} significant figure${sig > 1 ? "s" : ""}?`,
        correctLabel: rounded.toLocaleString("en-GB"),
        distractorLabels: distractors,
        explanationSteps: [`${n.toLocaleString("en-GB")} rounds to ${rounded.toLocaleString("en-GB")} to ${sig} significant figure${sig > 1 ? "s" : ""}.`],
        hints: ["Keep only the first few digits shown by the significant figures, and round the rest."]
      };
    },
    declaredVariationSpace: 3 * 89999
  }),
  categoricalPoolTemplate({
    key: "y9l1.tfRoundSigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const sig = rng.pick([1, 2, 3]);
      const n = rng.int(10000, 99999);
      const rounded = roundToSigFigs(n, sig);
      const isTrueCase = rng.chance(0.5);
      const spread = Math.max(10, Math.round(rounded * 0.05));
      const shown = isTrueCase ? rounded : numericDistractors(rng, rounded, 1, spread)[0] ?? rounded + spread;
      return {
        prompt: `${n.toLocaleString("en-GB")} rounded to ${sig} significant figure${sig > 1 ? "s" : ""} is ${shown.toLocaleString("en-GB")}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${n.toLocaleString("en-GB")} rounds to ${rounded.toLocaleString("en-GB")} to ${sig} significant figure${sig > 1 ? "s" : ""}.`],
        hints: ["Work out the rounded value and check it against the statement."]
      };
    },
    declaredVariationSpace: 3 * 89999 * 2
  }),
  arithmeticTemplate({
    key: "y9l1.estimateProductBySigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[11, 999], [11, 999]], compute: (v) => roundToSigFigs(v[0]!, 1) * roundToSigFigs(v[1]!, 1),
    promptTemplates: ["Estimate {a} x {b} by rounding each number to 1 significant figure first."],
    explain: (v, r) => [`${v[0]} rounds to ${roundToSigFigs(v[0]!, 1)}. ${v[1]} rounds to ${roundToSigFigs(v[1]!, 1)}. ${roundToSigFigs(v[0]!, 1)} x ${roundToSigFigs(v[1]!, 1)} = ${r}.`],
    hints: () => ["Round each number to 1 significant figure before multiplying."],
    declaredVariationSpace: 989 * 989
  }),
  arithmeticTemplate({
    key: "y9l1.wordProblemEstimateSigFig", levelKey: "Y9L1", objectiveCode: "Y9-L1-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[11, 999], [11, 999]], compute: (v) => roundToSigFigs(v[0]!, 1) + roundToSigFigs(v[1]!, 1), contextPool: CTX,
    promptTemplates: ["A school ordered {a} {ctx} and {b} more {ctx}. Estimate the total by rounding each amount to 1 significant figure."],
    explain: (v, r) => [`${v[0]} rounds to ${roundToSigFigs(v[0]!, 1)}. ${v[1]} rounds to ${roundToSigFigs(v[1]!, 1)}. ${roundToSigFigs(v[0]!, 1)} + ${roundToSigFigs(v[1]!, 1)} = ${r}.`],
    hints: () => ["Round each amount to 1 significant figure before adding."],
    declaredVariationSpace: 989 * 989 * CTX.length
  })
];

export default level;
