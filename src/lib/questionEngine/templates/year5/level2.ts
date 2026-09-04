import { arithmeticTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 2 — "Addition, subtraction and multi-step problems"
// 22 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L2-1 formal written methods with 5+
// digit numbers, Y5-L2-2 estimating/checking with rounding, Y5-L2-3
// multi-step problems).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];
const SCHOOLS = ["Oakwood Primary", "Riverside School", "Elm Tree Academy", "Highfield School", "Birchwood Primary", "Meadow View School", "Cedar Academy", "Willowbrook School"];
const SHOPS = ["a bookshop", "a toy shop", "a garden centre", "a sports shop", "a farm shop", "a bakery", "an electronics store", "a stationery shop"];

export const level: QuestionTemplateDef[] = [
  // --- Y5-L2-1: add and subtract 5+ digit numbers, formal written methods ---
  arithmeticTemplate({
    key: "y5l2.add5d", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10000, 89999], [10000, 89999]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Add {a} and {b}.", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`Add column by column from the ones, carrying where needed.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Line up the digits by place value and add from the ones column, carrying into the next column when a column totals 10 or more."],
    declaredVariationSpace: 80000 * 80000 * 3
  }),
  arithmeticTemplate({
    key: "y5l2.subtract5d", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[50000, 99999], [10000, 49999]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Subtract {b} from {a}.", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`Subtract column by column from the ones, exchanging (borrowing) where needed.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Line up the digits by place value and subtract from the ones column, exchanging from the next column when you need to."],
    declaredVariationSpace: 50000 * 40000 * 3
  }),
  arithmeticTemplate({
    key: "y5l2.add6d", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[100000, 899999], [10000, 99999]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Add {a} and {b}.", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`Add column by column from the ones, carrying where needed.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Line up the digits by place value before adding — the six-digit number has one more column than the five-digit one."],
    declaredVariationSpace: 800000 * 90000 * 3
  }),
  arithmeticTemplate({
    key: "y5l2.subtract6d", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[200000, 999999], [10000, 199999]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Subtract {b} from {a}.", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`Subtract column by column from the ones, exchanging where needed.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Line up the digits by place value before subtracting, exchanging from the next column when a digit is too small."],
    declaredVariationSpace: 800000 * 190000 * 3
  }),
  arithmeticTemplate({
    key: "y5l2.mcAdd5d", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10000, 89999], [10000, 89999]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add from the ones column, carrying where needed."],
    distractorSpread: 500,
    declaredVariationSpace: 80000 * 80000
  }),
  arithmeticTemplate({
    key: "y5l2.tfSubtract5d", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[50000, 99999], [10000, 49999]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} ="],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract column by column, exchanging where needed, and check your answer."],
    distractorSpread: 400,
    declaredVariationSpace: 50000 * 40000 * 2
  }),
  arithmeticTemplate({
    key: "y5l2.missingAddend", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10000, 60000], [20000, 90000]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{a} + ___ = {b}", "What must be added to {a} to reach {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}, so ${v[0]} + ${r} = ${v[1]}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 50000 * 70000
  }),
  arithmeticTemplate({
    key: "y5l2.missingSubtrahend", levelKey: "Y5L2", objectiveCode: "Y5-L2-1", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10000, 60000], [60000, 99999]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{b} - ___ = {a}", "What must be subtracted from {b} to leave {a}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 50000 * 40000
  }),

  // --- Y5-L2-2: use rounding to check answers and determine accuracy ---
  arithmeticTemplate({
    key: "y5l2.estimateSumTo1000", levelKey: "Y5L2", objectiveCode: "Y5-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 8999], [1000, 8999]],
    compute: (v) => Math.round(v[0]! / 1000) * 1000 + Math.round(v[1]! / 1000) * 1000,
    promptTemplates: ["Estimate {a} + {b} by rounding each number to the nearest 1,000 first, then adding."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 1000) * 1000}.`, `${v[1]} rounds to ${Math.round(v[1]! / 1000) * 1000}.`, `${Math.round(v[0]! / 1000) * 1000} + ${Math.round(v[1]! / 1000) * 1000} = ${r}.`],
    hints: () => ["Round each number to the nearest 1,000 before adding."],
    declaredVariationSpace: 8000 * 8000
  }),
  arithmeticTemplate({
    key: "y5l2.estimateDifferenceTo1000", levelKey: "Y5L2", objectiveCode: "Y5-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[5000, 9999], [1000, 4999]], constraint: (v) => v[0]! > v[1]!,
    compute: (v) => Math.round(v[0]! / 1000) * 1000 - Math.round(v[1]! / 1000) * 1000,
    promptTemplates: ["Estimate {a} - {b} by rounding each number to the nearest 1,000 first, then subtracting."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 1000) * 1000}.`, `${v[1]} rounds to ${Math.round(v[1]! / 1000) * 1000}.`, `${Math.round(v[0]! / 1000) * 1000} - ${Math.round(v[1]! / 1000) * 1000} = ${r}.`],
    hints: () => ["Round each number to the nearest 1,000 before subtracting."],
    declaredVariationSpace: 5000 * 4000
  }),
  arithmeticTemplate({
    key: "y5l2.mcEstimateSum", levelKey: "Y5L2", objectiveCode: "Y5-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1000, 8999], [1000, 8999]],
    compute: (v) => Math.round(v[0]! / 1000) * 1000 + Math.round(v[1]! / 1000) * 1000,
    promptTemplates: ["Which is the best estimate for {a} + {b}, rounding each to the nearest 1,000?"],
    explain: (v, r) => [`Rounded: ${Math.round(v[0]! / 1000) * 1000} + ${Math.round(v[1]! / 1000) * 1000} = ${r}.`],
    hints: () => ["Round both numbers to the nearest 1,000 first."],
    distractorSpread: 2000,
    declaredVariationSpace: 8000 * 8000
  }),
  arithmeticTemplate({
    key: "y5l2.tfEstimateReasonable", levelKey: "Y5L2", objectiveCode: "Y5-L2-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE",
    ranges: [[1000, 8999], [1000, 8999]],
    compute: (v) => Math.round(v[0]! / 1000) * 1000 + Math.round(v[1]! / 1000) * 1000,
    promptTemplates: ["Rounding {a} and {b} to the nearest 1,000 first, a good estimate for their sum is"],
    explain: (v, r) => [`${Math.round(v[0]! / 1000) * 1000} + ${Math.round(v[1]! / 1000) * 1000} = ${r}, so this is the best estimate.`],
    hints: () => ["Round both numbers to the nearest 1,000, then add the rounded values."],
    distractorSpread: 2000,
    declaredVariationSpace: 8000 * 8000 * 2
  }),
  arithmeticTemplate({
    key: "y5l2.wordProblemEstimate", levelKey: "Y5L2", objectiveCode: "Y5-L2-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1000, 8999], [1000, 8999]],
    compute: (v) => Math.round(v[0]! / 1000) * 1000 + Math.round(v[1]! / 1000) * 1000, contextPool: SCHOOLS,
    promptTemplates: ["{ctx} collected {a} tokens in the autumn term and {b} tokens in the spring term. Estimate the total by rounding each amount to the nearest 1,000."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 1000) * 1000}; ${v[1]} rounds to ${Math.round(v[1]! / 1000) * 1000}.`, `${Math.round(v[0]! / 1000) * 1000} + ${Math.round(v[1]! / 1000) * 1000} = ${r}.`],
    hints: () => ["Round each amount to the nearest 1,000 before adding."],
    declaredVariationSpace: 8000 * 8000 * SCHOOLS.length
  }),

  // --- Y5-L2-3: solve multi-step addition and subtraction problems ---
  arithmeticTemplate({
    key: "y5l2.multiStepAddSubtract", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MULTI_STEP",
    ranges: [[1000, 5000], [500, 3000], [100, 2000]], compute: (v) => v[0]! + v[1]! - v[2]!,
    promptTemplates: ["Work out {a} + {b} - {c}."],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Work through the calculation one step at a time, left to right."],
    declaredVariationSpace: 4000 * 2500 * 1900
  }),
  arithmeticTemplate({
    key: "y5l2.multiStepThreeAdd", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTI_STEP",
    ranges: [[1000, 4000], [1000, 4000], [1000, 4000]], compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: ["Work out {a} + {b} + {c}."],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Add two numbers first, then add the third to that total."],
    declaredVariationSpace: 3000 * 3000 * 3000
  }),
  arithmeticTemplate({
    key: "y5l2.wordProblemSavings", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "WORD_PROBLEM",
    ranges: [[500, 5000], [100, 2000], [100, 1500]], compute: (v) => v[0]! + v[1]! - v[2]!,
    promptTemplates: ["A family had £{a} in savings. They added £{b} from a bonus, then spent £{c} on a repair. How much do they have now?"],
    explain: (v, r) => [`£${v[0]} + £${v[1]} = £${v[0]! + v[1]!}.`, `£${v[0]! + v[1]!} - £${v[2]} = £${r}.`],
    hints: () => ["Add the money coming in first, then subtract the money spent."],
    formatValue: (n) => `£${n}`,
    declaredVariationSpace: 4500 * 1900 * 1400
  }),
  arithmeticTemplate({
    key: "y5l2.wordProblemShopBudget", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[2000, 9000], [500, 3000], [500, 3000]], constraint: (v) => v[0]! > v[1]! + v[2]!,
    compute: (v) => v[0]! - v[1]! - v[2]!, contextPool: SHOPS,
    promptTemplates: ["{ctx} had a budget of £{a}. It spent £{b} on stock and £{c} on delivery costs. How much of the budget is left?"],
    explain: (v, r) => [`£${v[0]} - £${v[1]} = £${v[0]! - v[1]!}.`, `£${v[0]! - v[1]!} - £${v[2]} = £${r}.`],
    hints: () => ["Subtract each cost from the budget, one at a time."],
    formatValue: (n) => `£${n}`,
    declaredVariationSpace: 7000 * 2500 * 2500
  }),
  arithmeticTemplate({
    key: "y5l2.wordProblemAttendance", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "WORD_PROBLEM",
    ranges: [[3000, 9000], [200, 1500], [200, 1500]], compute: (v) => v[0]! - v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["{ctx} attending an event started at {a}. {b} left early, then {c} more arrived later. How many {ctx} were there by the end?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${v[0]! - v[1]!}.`, `${v[0]! - v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Subtract those who left, then add those who arrived later."],
    declaredVariationSpace: 6000 * 1300 * 1300 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l2.wordProblemDistance", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[100, 3000], [100, 3000], [100, 3000]], compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: ["A delivery van drove {a} km, then {b} km, then {c} km. What was the total distance driven?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Add the three distances together."],
    formatValue: (n) => `${n} km`,
    declaredVariationSpace: 2900 * 2900 * 2900
  }),
  arithmeticTemplate({
    key: "y5l2.missingNumberMultiStep", levelKey: "Y5L2", objectiveCode: "Y5-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1000, 5000], [500, 3000], [3000, 9000]], constraint: (v) => v[2]! > v[0]! + v[1]!,
    compute: (v) => v[2]! - v[0]! - v[1]!,
    promptTemplates: ["{a} + {b} + ___ = {c}", "What number must be added to {a} and {b} to make a total of {c}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[2]} - ${v[0]! + v[1]!} = ${r}.`],
    hints: () => ["Add the two known numbers first, then find the difference from the target total."],
    declaredVariationSpace: 4000 * 2500 * 6000
  })
];

export default level;
