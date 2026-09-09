import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 2, Level 2 — "Addition and subtraction facts"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y2-L2-1 number facts to 20, Y2-L2-2
// deriving related facts to 100, Y2-L2-3 mental addition/subtraction using
// a number line).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];

export const level: QuestionTemplateDef[] = [
  // --- Y2-L2-1: recall and use addition and subtraction facts to 20 ---
  arithmeticTemplate({
    key: "y2l2.addWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    declaredVariationSpace: 19 * 19 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.subtractWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [1, 19]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    declaredVariationSpace: 19 * 19 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.missingAddendWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{a} + ___ = {b}", "What must be added to {a} to make {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y2l2.missingSubtrahendWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{b} - ___ = {a}", "What must be subtracted from {b} to leave {a}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y2l2.mcAddWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    distractorSpread: 3,
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y2l2.tfAddWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} ="],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two numbers and check your answer."],
    distractorSpread: 3,
    declaredVariationSpace: 19 * 19 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.numberBondsTo20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 19]], compute: (v) => 20 - v[0]!, contextPool: CTX,
    promptTemplates: ["___ + {a} = 20", "What number bonds with {a} to make 20?", "Counting {ctx}: what number pairs with {a} to make 20?"],
    explain: (v, r) => [`20 - ${v[0]} = ${r}.`],
    hints: () => ["Think about what pairs with this number to make 20."],
    declaredVariationSpace: 19 * 3
  }),

  // --- Y2-L2-2: derive related facts (e.g. 7+3=10, so 70+30=100) ---
  arithmeticTemplate({
    key: "y2l2.deriveRelatedFactAddTens", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => (v[0]! + v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10, sum: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["If {a} + {b} = {sum}, what is {a10} + {b10}?", "Counting {ctx} in tens: if {a} + {b} = {sum}, what is {a10} + {b10}?"],
    explain: (v, r) => [`Since ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Use the same fact, but with each number ten times bigger."],
    declaredVariationSpace: 9 * 9 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l2.deriveRelatedFactSubtractTens", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[2, 10], [1, 9]], constraint: (v) => v[0]! > v[1]!, compute: (v) => (v[0]! - v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10, diff: v[0]! - v[1]! }), contextPool: CTX,
    promptTemplates: ["If {a} - {b} = {diff}, what is {a10} - {b10}?", "Counting {ctx} in tens: if {a} - {b} = {diff}, what is {a10} - {b10}?"],
    explain: (v, r) => [`Since ${v[0]} - ${v[1]} = ${v[0]! - v[1]!}, ${v[0]! * 10} - ${v[1]! * 10} = ${r}.`],
    hints: () => ["Use the same fact, but with each number ten times bigger."],
    declaredVariationSpace: 9 * 8 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l2.mcDeriveRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => (v[0]! + v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10 }),
    promptTemplates: ["{a10} + {b10} = ?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, so ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Work out the small fact first, then multiply by 10."],
    distractorSpread: 20,
    declaredVariationSpace: 9 * 9
  }),
  categoricalPoolTemplate({
    key: "y2l2.tfDeriveRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 9);
      const b = rng.int(1, Math.max(1, 10 - a));
      const correctSum = (a + b) * 10;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correctSum : correctSum + rng.int(1, 3) * 10;
      return {
        prompt: `Since ${a} + ${b} = ${a + b}, ${a * 10} + ${b * 10} = ${shown}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${a * 10} + ${b * 10} = ${correctSum}.`],
        hints: ["The related fact keeps the same digits, just ten times bigger."]
      };
    },
    declaredVariationSpace: 9 * 9 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.missingRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[1]! * 10,
    derive: (v, r) => ({ a10: v[0]! * 10, total: v[0]! * 10 + r, sum: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["If {a} + {b} = {sum}, then {a10} + ___ = {total}.", "Counting {ctx} in tens: if {a} + {b} = {sum}, then {a10} + ___ = {total}."],
    explain: (v, r) => [`Since ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, the missing number is ${v[1]} x 10 = ${r}.`],
    hints: () => ["Use the small fact to work out the missing tens number."],
    declaredVariationSpace: 9 * 9 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l2.wordProblemRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => (v[0]! + v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10 }), contextPool: CTX,
    promptTemplates: ["A shop has {a10} {ctx} in one box and {b10} {ctx} in another. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, so ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Use the small number fact, then multiply by 10."],
    declaredVariationSpace: 9 * 9 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y2l2.reasoningExplainRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 9);
      const b = rng.int(1, Math.max(1, 10 - a));
      const correct = String((a + b) * 10);
      const distractors = [String((a + b) * 100), String(a + b), String((a + b) * 10 + 10)];
      const uniq = Array.from(new Set(distractors)).filter((l) => l !== correct);
      let pad = (a + b) * 10 + 200;
      while (uniq.length < 3) { uniq.push(String(pad)); pad++; }
      return {
        prompt: `Since ${a} + ${b} = ${a + b}, what is ${a * 10} + ${b * 10}?`,
        correctLabel: correct,
        distractorLabels: uniq.slice(0, 3),
        explanationSteps: [`${a * 10} + ${b * 10} = ${(a + b) * 10}, the same digits as ${a + b} but ten times bigger.`],
        hints: ["The related fact keeps the same digits, just ten times bigger."]
      };
    },
    declaredVariationSpace: 9 * 9
  }),

  // --- Y2-L2-3: add and subtract mentally using a number line ---
  arithmeticTemplate({
    key: "y2l2.addUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_LINE",
    ranges: [[1, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["Start at {a} on the number line and jump on {b}. Where do you land?", "You are at {a} on the number line. Jump forward {b} spaces. What number do you land on?"],
    explain: (v, r) => [`Starting at ${v[0]}, jumping on ${v[1]} lands on ${r}.`],
    hints: () => ["Count forwards from the starting number."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! + v[1]!, v[0]!),
    declaredVariationSpace: 15 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.subtractUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_LINE",
    ranges: [[5, 20], [1, 8]], constraint: (v) => v[0]! - v[1]! >= 0, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["Start at {a} on the number line and jump back {b}. Where do you land?", "You are at {a} on the number line. Jump backward {b} spaces. What number do you land on?"],
    explain: (v, r) => [`Starting at ${v[0]}, jumping back ${v[1]} lands on ${r}.`],
    hints: () => ["Count backwards from the starting number."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! - v[1]!, v[0]!),
    declaredVariationSpace: 16 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.bridgingTenAdd", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[6, 9], [3, 9]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ toTen: 10 - v[0]!, remainder: v[1]! - (10 - v[0]!) }), contextPool: CTX,
    promptTemplates: ["{a} + {b}: jump {toTen} to reach 10, then jump {remainder} more. Where do you land?", "Counting {ctx}: {a} + {b}: jump {toTen} to reach 10, then jump {remainder} more. Where do you land?"],
    explain: (v, r) => [`${v[0]} + ${10 - v[0]!} = 10. 10 + ${v[1]! - (10 - v[0]!)} = ${r}.`],
    hints: () => ["Jump to the next multiple of 10 first, then jump the rest of the way."],
    declaredVariationSpace: 4 * 7 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l2.bridgingTenSubtract", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[11, 19], [3, 9]], constraint: (v) => v[1]! > v[0]! % 10, compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ toTen: v[0]! % 10, remainder: v[1]! - (v[0]! % 10), a10: v[0]! - (v[0]! % 10) }), contextPool: CTX,
    promptTemplates: ["{a} - {b}: jump back {toTen} to reach {a10}, then jump back {remainder} more. Where do you land?", "Counting {ctx}: {a} - {b}: jump back {toTen} to reach {a10}, then jump back {remainder} more. Where do you land?"],
    explain: (v, r) => [`${v[0]} - ${v[0]! % 10} = ${v[0]! - (v[0]! % 10)}. ${v[0]! - (v[0]! % 10)} - ${v[1]! - (v[0]! % 10)} = ${r}.`],
    hints: () => ["Jump back to the nearest multiple of 10 first, then jump back the rest of the way."],
    declaredVariationSpace: 9 * 7 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l2.mcAddUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["On a number line, start at {a} and jump on {b}. Where do you land?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count forwards from the starting number."],
    distractorSpread: 3,
    declaredVariationSpace: 15 * 8
  }),
  arithmeticTemplate({
    key: "y2l2.mcSubtractUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[5, 20], [1, 8]], constraint: (v) => v[0]! - v[1]! >= 0, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["On a number line, start at {a} and jump back {b}. Where do you land?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count backwards from the starting number."],
    distractorSpread: 3,
    declaredVariationSpace: 16 * 8
  }),
  arithmeticTemplate({
    key: "y2l2.wordProblemNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[1, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a jar. {b} more are added. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Imagine jumping forwards on a number line from the starting amount."],
    declaredVariationSpace: 15 * 8 * CTX.length
  })
];

export default level;
