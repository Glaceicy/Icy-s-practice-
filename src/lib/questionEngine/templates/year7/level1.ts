import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 1 — "Integers, place value, ordering and negative numbers"
// A smaller but fully valid, deterministic bank (15 templates) demonstrating
// the engine at KS3 depth. See DOCUMENTATION.md "Content coverage status".
const CITIES = ["London", "Edinburgh", "Manchester", "Cardiff", "Belfast", "Leeds", "Bristol", "York"];

export const level: QuestionTemplateDef[] = [
  orderingTemplate({
    key: "y7l1.orderIntegersAsc", levelKey: "Y7L1", objectiveCode: "Y7-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 5) nums.add(rng.int(-20, 20));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag these numbers into order, smallest first."],
    explain: () => ["On a number line, numbers further left are smaller — negative numbers are smaller than positive numbers."],
    hints: () => ["Negative numbers are always smaller than positive numbers. Compare negatives by how far below zero they are."],
    declaredVariationSpace: 200000
  }),
  arithmeticTemplate({
    key: "y7l1.compareIntegers", levelKey: "Y7L1", objectiveCode: "Y7-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[-20, 20], [-20, 20]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is greater, {a} or {b}?"],
    explain: (v, r) => [`${r} is further to the right on the number line, so it is greater.`],
    hints: () => ["A number further right on the number line is always greater."],
    distractorSpread: 6,
    declaredVariationSpace: 40 * 39
  }),
  arithmeticTemplate({
    key: "y7l1.addNegative", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-20, 20], [-20, 20]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} = ?", "Work out {a} + ({b})."],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, "Adding a negative number moves left on the number line; adding a positive moves right."],
    hints: () => ["Picture a number line. Start at the first number and move according to the sign of the second."],
    visualAid: (v) => visuals.numberLine(-25, 25, v[0]! + v[1]!, v[0]!),
    declaredVariationSpace: 41 * 41 * 2
  }),
  arithmeticTemplate({
    key: "y7l1.subtractNegative", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-15, 15], [1, 20]], compute: (v) => v[0]! - -v[1]!,
    promptTemplates: ["{a} - (-{b}) = ?", "Work out {a} minus negative {b}."],
    explain: (v, r) => [`Subtracting a negative is the same as adding: ${v[0]} - (-${v[1]}) = ${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Two minus signs together become a plus sign."],
    declaredVariationSpace: 31 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y7l1.addTwoNegatives", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], compute: (v) => -v[0]! - v[1]!,
    promptTemplates: ["(-{a}) + (-{b}) = ?", "Work out -{a} + -{b}."],
    explain: (v, r) => [`Adding two negative numbers: -${v[0]} + -${v[1]} = ${r}.`],
    hints: () => ["Adding two negative numbers makes the answer more negative."],
    declaredVariationSpace: 25 * 25 * 2
  }),
  arithmeticTemplate({
    key: "y7l1.multiplyNegatives", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 12], [1, 12], [0, 1], [0, 1]],
    compute: (v) => (v[2] === 1 ? -v[0]! : v[0]!) * (v[3] === 1 ? -v[1]! : v[1]!),
    derive: (v) => ({ a: v[2] === 1 ? -v[0]! : v[0]!, b: v[3] === 1 ? -v[1]! : v[1]! }),
    promptTemplates: ["{a} x {b} = ?"],
    explain: (v, r) => [`Same signs multiply to a positive answer; different signs multiply to a negative answer.`, `The answer is ${r}.`],
    hints: () => ["Same signs give a positive answer; different signs give a negative answer."],
    distractorSpread: 10,
    declaredVariationSpace: 12 * 12 * 4
  }),
  arithmeticTemplate({
    key: "y7l1.divideNegatives", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12], [0, 1], [0, 1]],
    compute: (v) => ((v[2] === 1 ? -1 : 1) * v[0]! * v[1]!) / ((v[3] === 1 ? -1 : 1) * v[1]!),
    derive: (v) => ({ a: (v[2] === 1 ? -1 : 1) * v[0]! * v[1]!, b: (v[3] === 1 ? -1 : 1) * v[1]! }),
    promptTemplates: ["{a} ÷ {b} = ?"],
    explain: (v, r) => [`Same signs divide to a positive answer; different signs divide to a negative answer.`, `The answer is ${r}.`],
    hints: () => ["Same signs give a positive answer; different signs give a negative answer."],
    declaredVariationSpace: 12 * 12 * 4
  }),
  arithmeticTemplate({
    key: "y7l1.numberLineNegative", levelKey: "Y7L1", objectiveCode: "Y7-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "NUMBER_LINE",
    ranges: [[-20, 20]], compute: (v) => v[0]!,
    promptTemplates: [
      "What number is the arrow pointing to on the number line?",
      "Read the number line. What number does the arrow show?",
      "Which integer does the pointer show on this number line?",
      "What integer is marked by the arrow on this number line?",
      "Identify the number the arrow indicates on the number line."
    ],
    explain: (v) => [`Count from zero to reach ${v[0]}, moving left for negative or right for positive.`],
    hints: () => ["Count the marks from zero, noting whether you move left (negative) or right (positive)."],
    visualAid: (v) => visuals.numberLine(-20, 20, v[0]!),
    declaredVariationSpace: 41 * 5
  }),
  arithmeticTemplate({
    key: "y7l1.tfNegativeComparison", levelKey: "Y7L1", objectiveCode: "Y7-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "TRUE_FALSE",
    ranges: [[-20, 20], [-20, 20]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Between {a} and {b}, the greater number is", "Comparing {a} and {b}, the larger value is"],
    explain: (v, r) => [`${r} is greater — it is further right on the number line.`],
    hints: () => ["The number further right on the number line is greater."],
    distractorSpread: 8,
    declaredVariationSpace: 40 * 39 * 2
  }),
  arithmeticTemplate({
    key: "y7l1.wordProblemTemperature", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-10, 10], [1, 15]], compute: (v) => v[0]! - v[1]!, contextPool: CITIES,
    promptTemplates: ["The temperature in {ctx} was {a}°C. It then fell by {b}°C. What is the new temperature?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "Falling means subtracting."],
    hints: () => ["A fall in temperature means you subtract."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 21 * 15 * CITIES.length
  }),
  arithmeticTemplate({
    key: "y7l1.wordProblemTemperatureRise", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-15, 5], [1, 15]], compute: (v) => v[0]! + v[1]!, contextPool: CITIES,
    promptTemplates: ["The temperature in {ctx} was {a}°C overnight. By midday it had risen by {b}°C. What is the midday temperature?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, "A rise means you add."],
    hints: () => ["A rise in temperature means you add."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 21 * 15 * CITIES.length
  }),
  arithmeticTemplate({
    key: "y7l1.missingNumberNegative", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-20, 20], [-20, 20]], compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{a} + ___ = {b}", "What must be added to {a} to reach {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}, so ${v[0]} + ${r} = ${v[1]}.`],
    hints: () => ["Find the difference between the two numbers, keeping track of direction."],
    declaredVariationSpace: 41 * 41 * 2
  }),
  categoricalPoolTemplate({
    key: "y7l1.reasoningSignRules", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "REASONING_EXPLAIN",
    pools: { op: ["multiplying", "dividing"], signs: ["same", "different"] },
    build: (picked, rng) => {
      const x = rng.int(2, 12);
      const y = rng.int(2, 12);
      const bothPositive = rng.chance(0.5);
      const a = picked.signs === "same" ? (bothPositive ? x : -x) : (bothPositive ? x : -x);
      const b = picked.signs === "same" ? (bothPositive ? y : -y) : (bothPositive ? -y : y);
      return {
        prompt: `${a} is being ${picked.op === "multiplying" ? "multiplied" : "divided"} by ${b}. These two numbers have ${picked.signs} signs. What is the sign of the answer?`,
        correctLabel: picked.signs === "same" ? "Positive" : "Negative",
        distractorLabels: [picked.signs === "same" ? "Negative" : "Positive", "Always zero"],
        explanationSteps: [
          picked.signs === "same"
            ? `Two numbers with the same sign, ${picked.op}, give a positive answer.`
            : `Two numbers with different signs, ${picked.op}, give a negative answer.`
        ],
        hints: ["Same signs give positive; different signs give negative."]
      };
    },
    declaredVariationSpace: 2 * 2 * 11 * 11 * 2
  }),
  arithmeticTemplate({
    key: "y7l1.roundDecimalWhole", levelKey: "Y7L1", objectiveCode: "Y7-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-500, 500]], compute: (v) => Math.round(v[0]! / 10),
    promptTemplates: ["Round {decimal} to the nearest whole number."],
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    explain: (v, r) => [`${(v[0]! / 10).toFixed(1)} rounds to ${r}.`],
    hints: () => ["Look at the first decimal place to decide whether to round up or down."],
    declaredVariationSpace: 1000
  }),
  arithmeticTemplate({
    key: "y7l1.multiStepNegative", levelKey: "Y7L1", objectiveCode: "Y7-L1-2", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR", "ORDER_OF_OPERATIONS_ERROR"], type: "MULTI_STEP",
    ranges: [[-10, 10], [1, 10], [1, 10]], compute: (v) => v[0]! + v[1]! - v[2]!,
    promptTemplates: ["Work out {a} + {b} - {c}."],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Work through the calculation from left to right."],
    declaredVariationSpace: 21 * 10 * 10
  })
];

export default level;
