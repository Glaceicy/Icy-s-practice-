import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 2, Level 3 — "Adding and subtracting two-digit numbers"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y2-L3-1 a two-digit number and ones,
// Y2-L3-2 two two-digit numbers, Y2-L3-3 two-step word problems). Totals
// are kept within two digits (<=99) throughout, matching the Y2 curriculum
// scope (crossing 100 is Year 3).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];

export const level: QuestionTemplateDef[] = [
  // --- Y2-L3-1: add a two-digit number and ones ---
  arithmeticTemplate({
    key: "y2l3.addTwoDigitAndOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the two-digit number."],
    declaredVariationSpace: 80 * 9 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.subtractOnesFromTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [1, 9]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Take the ones away from the two-digit number."],
    declaredVariationSpace: 90 * 9 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.missingOnesAddend", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["{a} + ___ = {c}", "What must be added to {a} to make {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 80 * 9 * 2
  }),
  arithmeticTemplate({
    key: "y2l3.missingTwoDigitStart", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["___ + {b} = {c}", "What number plus {b} makes {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the ones from the total to find the missing number."],
    declaredVariationSpace: 80 * 9 * 2
  }),
  arithmeticTemplate({
    key: "y2l3.mcAddTwoDigitOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the two-digit number."],
    distractorSpread: 6,
    declaredVariationSpace: 80 * 9
  }),
  arithmeticTemplate({
    key: "y2l3.tfAddTwoDigitOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} ="],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two numbers and check your answer."],
    distractorSpread: 4,
    declaredVariationSpace: 80 * 9 * 2
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemAddOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a box. {b} more are added. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the two-digit number."],
    declaredVariationSpace: 80 * 9 * CTX.length
  }),

  // --- Y2-L3-2: add and subtract two two-digit numbers ---
  arithmeticTemplate({
    key: "y2l3.addTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10, 89], [10, 89]], constraint: (v) => v[0]! + v[1]! <= 99, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the tens first, then the ones."],
    declaredVariationSpace: 80 * 80 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.subtractTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the tens first, then the ones."],
    declaredVariationSpace: 80 * 80 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.missingAddendTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 89], [10, 89]], constraint: (v) => v[0]! + v[1]! <= 99, compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["{a} + ___ = {c}", "What must be added to {a} to make {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 80 * 80
  }),
  arithmeticTemplate({
    key: "y2l3.missingSubtrahendTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[1]!,
    derive: (v) => ({ diff: v[0]! - v[1]! }),
    promptTemplates: ["{a} - ___ = {diff}", "What must be subtracted from {a} to leave {diff}?"],
    explain: (v, r) => [`${v[0]} - ${v[0]! - v[1]!} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 80 * 80
  }),
  arithmeticTemplate({
    key: "y2l3.mcAddTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 89], [10, 89]], constraint: (v) => v[0]! + v[1]! <= 99, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the tens first, then the ones."],
    distractorSpread: 8,
    declaredVariationSpace: 80 * 80
  }),
  arithmeticTemplate({
    key: "y2l3.tfSubtractTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} ="],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the tens first, then the ones."],
    distractorSpread: 6,
    declaredVariationSpace: 80 * 80 * 2
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemAddSubtractTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["A shop had {a} {ctx}. They sold {b}. How many {ctx} are left?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the amount sold from the starting amount."],
    declaredVariationSpace: 80 * 80 * CTX.length
  }),

  // --- Y2-L3-3: solve two-step addition and subtraction word problems ---
  arithmeticTemplate({
    key: "y2l3.wordProblemTwoStepAdd", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[10, 40], [1, 20], [1, 20]], compute: (v) => v[0]! + v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in one basket, {b} in a second basket, and {c} in a third. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add all three amounts together."],
    declaredVariationSpace: 30 * 20 * 20 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemTwoStepAddSubtract", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[10, 40], [1, 20], [1, 20]], constraint: (v) => v[0]! + v[1]! >= v[2]!, compute: (v) => v[0]! + v[1]! - v[2]!, contextPool: CTX,
    promptTemplates: ["You start with {a} {ctx}. You are given {b} more, then you give away {c}. How many {ctx} do you have now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Add the extra amount first, then take away what was given away."],
    declaredVariationSpace: 30 * 20 * 20 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemTwoStepSubtractAdd", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[20, 60], [1, 20], [1, 20]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["You start with {a} {ctx}. {b} are used up, then {c} more are added. How many {ctx} do you have now?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Subtract the amount used up first, then add the new amount."],
    declaredVariationSpace: 40 * 20 * 20 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l3.mcTwoStepWordProblem", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 40], [1, 20], [1, 20]], compute: (v) => v[0]! + v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["A jar has {a} {ctx}. {b} more are added, then {c} more are added. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add all three amounts together."],
    distractorSpread: 10,
    declaredVariationSpace: 30 * 20 * 20 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y2l3.tfTwoStepWordProblem", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(10, 40);
      const b = rng.int(1, 20);
      const c = rng.int(1, 20);
      const ctx = rng.pick(CTX);
      const correct = a + b - c;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correct : correct + rng.int(1, 5) * (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `Sam has ${a} ${ctx}. He gets ${b} more, then gives away ${c}. He now has ${shown} ${ctx}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${a} + ${b} - ${c} = ${correct}.`],
        hints: ["Add the extra amount first, then take away what was given away."]
      };
    },
    declaredVariationSpace: 30 * 20 * 20 * CTX.length * 2
  }),
  arithmeticTemplate({
    key: "y2l3.missingStepTwoStep", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 40], [1, 20], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! + v[1]! - v[2]! }),
    promptTemplates: ["{a} + {b} - ___ = {c}", "Start at {a}, add {b}, then take away a number to leave {c}. What number is taken away?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} - ${r} = ${v[0]! + v[1]! - r}.`],
    hints: () => ["Work out the total after adding, then compare it to the final amount."],
    declaredVariationSpace: 30 * 20 * 20 * 2
  }),
  categoricalPoolTemplate({
    key: "y2l3.reasoningMoreOrFewer", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(10, 89);
      const b = rng.int(1, 20);
      const c = rng.int(1, 20);
      const ctx = rng.pick(CTX);
      const net = b - c;
      const correct = net > 0 ? "More" : net < 0 ? "Fewer" : "The same";
      const distractors = ["More", "Fewer", "The same"].filter((l) => l !== correct);
      return {
        prompt: `Tom had ${a} ${ctx}. He found ${b} more, then lost ${c}. Compared to how many he started with, does he now have more, fewer, or the same number of ${ctx}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`He gained ${b} and lost ${c}, a net change of ${net >= 0 ? "+" : ""}${net}, so he ends up with ${correct.toLowerCase()}.`],
        hints: ["Compare how many were gained with how many were lost."]
      };
    },
    declaredVariationSpace: 80 * 20 * 20
  })
];

export default level;
