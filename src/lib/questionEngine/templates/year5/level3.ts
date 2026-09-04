import { arithmeticTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 3 — "Multiplication and division"
// 20 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L3-1 formal multiplication up to 4
// digits by a 1-2 digit number, Y5-L3-2 division with remainders, Y5-L3-3
// multiplying/dividing by 10, 100 and 1,000).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];

export const level: QuestionTemplateDef[] = [
  // --- Y5-L3-1: multiply up to 4-digit numbers by a 1- or 2-digit number ---
  arithmeticTemplate({
    key: "y5l3.multiply4dBy1d", levelKey: "Y5L3", objectiveCode: "Y5-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [2, 9]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["{a} x {b} = ?", "Multiply {a} by {b}.", "Counting {ctx}: what is {a} x {b}?"],
    explain: (v, r) => [`Multiply using the formal written method, one digit of ${v[1]} at a time.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the ones, then the tens, then the hundreds, then the thousands, adding as you go."],
    declaredVariationSpace: 9000 * 8 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.multiply4dBy2d", levelKey: "Y5L3", objectiveCode: "Y5-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [11, 99]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["{a} x {b} = ?", "Multiply {a} by {b}.", "Counting {ctx}: what is {a} x {b}?"],
    explain: (v, r) => [`Multiply by the ones digit of ${v[1]} first, then the tens digit, then add the two results.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Split the two-digit number into tens and ones, multiply by each part, then add."],
    declaredVariationSpace: 9000 * 89 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.mcMultiply4dBy1d", levelKey: "Y5L3", objectiveCode: "Y5-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[1000, 9999], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["What is {a} x {b}?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Use the formal written method, multiplying one place value column at a time."],
    distractorSpread: 400,
    declaredVariationSpace: 9000 * 8
  }),
  arithmeticTemplate({
    key: "y5l3.tfMultiply4d", levelKey: "Y5L3", objectiveCode: "Y5-L3-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[1000, 9999], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["{a} x {b} ="],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Work through the formal written method and check each column."],
    distractorSpread: 300,
    declaredVariationSpace: 9000 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y5l3.missingFactor", levelKey: "Y5L3", objectiveCode: "Y5-L3-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[100, 999], [2, 9]], compute: (v) => v[1]!,
    derive: (v, r) => ({ product: v[0]! * r }),
    promptTemplates: ["{a} x ___ = {product}", "What number was {a} multiplied by to reach {product}?"],
    explain: (v, r) => [`The product ${v[0]! * r} ÷ ${v[0]} gives the missing factor: ${r}.`],
    hints: (v) => [`Divide the product by ${v[0]} to find the missing factor.`],
    declaredVariationSpace: 900 * 8
  }),

  // --- Y5-L3-2: divide up to 4-digit numbers by a 1-digit number, with remainders ---
  arithmeticTemplate({
    key: "y5l3.divideExact4dBy1d", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[100, 999], [2, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["{dividend} ÷ {b} = ?", "Divide {dividend} by {b}.", "Counting {ctx}: share {dividend} equally into {b} groups. How many in each group?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}, with nothing left over.`],
    hints: () => ["Use the formal written (bus stop) method to divide."],
    declaredVariationSpace: 900 * 8 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.divisionQuotient", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [2, 9]], constraint: (v) => v[0]! % v[1]! !== 0, compute: (v) => Math.floor(v[0]! / v[1]!),
    promptTemplates: ["When {a} is divided by {b}, what is the whole number quotient (ignore the remainder)?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} = ${r} remainder ${v[0]! % v[1]!}.`, `The whole number quotient is ${r}.`],
    hints: () => ["Divide as normal, and give only the whole number part of the answer."],
    declaredVariationSpace: 9000 * 8
  }),
  arithmeticTemplate({
    key: "y5l3.divisionRemainder", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [2, 9]], constraint: (v) => v[0]! % v[1]! !== 0, compute: (v) => v[0]! % v[1]!,
    promptTemplates: ["When {a} is divided by {b}, what is the remainder?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} = ${Math.floor(v[0]! / v[1]!)} remainder ${r}.`],
    hints: () => ["Divide as normal, then work out how much is left over."],
    declaredVariationSpace: 9000 * 8
  }),
  arithmeticTemplate({
    key: "y5l3.mcDivideExact", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[100, 999], [2, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * v[1]! }),
    promptTemplates: ["What is {dividend} ÷ {b}?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Use the formal written method to divide."],
    distractorSpread: 15,
    declaredVariationSpace: 900 * 8
  }),
  arithmeticTemplate({
    key: "y5l3.tfDivisionExact", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "REASONING",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "TRUE_FALSE",
    ranges: [[100, 999], [2, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * v[1]! }),
    promptTemplates: ["{dividend} ÷ {b} ="],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide using the formal written method, then check the result."],
    distractorSpread: 12,
    declaredVariationSpace: 900 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y5l3.wordProblemRemainderRoundUp", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "REASONING",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[50, 400], [8, 45]], compute: (v) => Math.ceil(v[0]! / v[1]!),
    promptTemplates: ["{a} pupils are going on a school trip. Each minibus holds {b} pupils. How many minibuses are needed so that every pupil has a seat?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} = ${Math.floor(v[0]! / v[1]!)} remainder ${v[0]! % v[1]!}.`, v[0]! % v[1]! === 0 ? `That divides exactly, so ${r} minibuses are needed.` : `There's a remainder, so one more minibus is needed for the pupils left over: ${r} minibuses.`],
    hints: () => ["If there is a remainder, you need to round up — an extra vehicle is needed even for a partly-full one."],
    declaredVariationSpace: 350 * 37
  }),
  arithmeticTemplate({
    key: "y5l3.wordProblemRemainderRoundDown", levelKey: "Y5L3", objectiveCode: "Y5-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[50, 500], [4, 12]], compute: (v) => Math.floor(v[0]! / v[1]!),
    promptTemplates: ["A baker has {a} eggs and puts {b} eggs in each box. How many full boxes can be filled?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} = ${r} remainder ${v[0]! % v[1]!}.`, `Only full boxes count, so the leftover eggs don't make another box: ${r} full boxes.`],
    hints: () => ["Leftover eggs can't make a full box, so round the answer down."],
    declaredVariationSpace: 450 * 8
  }),

  // --- Y5-L3-3: multiply and divide whole numbers by 10, 100 and 1,000 ---
  arithmeticTemplate({
    key: "y5l3.multiplyBy10", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 99999]], compute: (v) => v[0]! * 10, contextPool: CTX,
    promptTemplates: ["{a} x 10 = ?", "Multiply {a} by 10.", "Counting {ctx}: what is {a} x 10?"],
    explain: (v, r) => [`Multiplying by 10 shifts every digit one place to the left.`, `${v[0]} x 10 = ${r}.`],
    hints: () => ["Each digit moves one column to the left; a zero fills the empty ones column."],
    declaredVariationSpace: 99999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.multiplyBy100", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999]], compute: (v) => v[0]! * 100, contextPool: CTX,
    promptTemplates: ["{a} x 100 = ?", "Multiply {a} by 100.", "Counting {ctx}: what is {a} x 100?"],
    explain: (v, r) => [`Multiplying by 100 shifts every digit two places to the left.`, `${v[0]} x 100 = ${r}.`],
    hints: () => ["Each digit moves two columns to the left; two zeros fill the empty columns."],
    declaredVariationSpace: 9999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.multiplyBy1000", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]! * 1000, contextPool: CTX,
    promptTemplates: ["{a} x 1,000 = ?", "Multiply {a} by 1,000.", "Counting {ctx}: what is {a} x 1,000?"],
    explain: (v, r) => [`Multiplying by 1,000 shifts every digit three places to the left.`, `${v[0]} x 1,000 = ${r}.`],
    hints: () => ["Each digit moves three columns to the left; three zeros fill the empty columns."],
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.divideBy10", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 99999]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 10 }), contextPool: CTX,
    promptTemplates: ["{dividend} ÷ 10 = ?", "Divide {dividend} by 10.", "Counting {ctx}: what is {dividend} ÷ 10?"],
    explain: (v, r) => [`Dividing by 10 shifts every digit one place to the right.`, `${v[0]! * 10} ÷ 10 = ${r}.`],
    hints: () => ["Each digit moves one column to the right."],
    declaredVariationSpace: 99999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.divideBy100", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 100 }), contextPool: CTX,
    promptTemplates: ["{dividend} ÷ 100 = ?", "Divide {dividend} by 100.", "Counting {ctx}: what is {dividend} ÷ 100?"],
    explain: (v, r) => [`Dividing by 100 shifts every digit two places to the right.`, `${v[0]! * 100} ÷ 100 = ${r}.`],
    hints: () => ["Each digit moves two columns to the right."],
    declaredVariationSpace: 9999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.divideBy1000", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 1000 }), contextPool: CTX,
    promptTemplates: ["{dividend} ÷ 1,000 = ?", "Divide {dividend} by 1,000.", "Counting {ctx}: what is {dividend} ÷ 1,000?"],
    explain: (v, r) => [`Dividing by 1,000 shifts every digit three places to the right.`, `${v[0]! * 1000} ÷ 1,000 = ${r}.`],
    hints: () => ["Each digit moves three columns to the right."],
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.mcMultiplyByPowerOf10", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 999], [0, 2]], compute: (v) => v[0]! * [10, 100, 1000][v[1]!]!,
    derive: (v) => ({ multiplier: [10, 100, 1000][v[1]!]! }),
    promptTemplates: ["{a} x {multiplier} = ?"],
    explain: (v, r) => [`${v[0]} x ${[10, 100, 1000][v[1]!]} = ${r}.`],
    hints: () => ["Multiplying by 10, 100 or 1,000 shifts every digit left by 1, 2 or 3 places."],
    distractorSpread: 500,
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l3.missingMultiplierPowerOf10", levelKey: "Y5L3", objectiveCode: "Y5-L3-3", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MISSING_NUMBER",
    ranges: [[10, 999], [0, 2]], compute: (v) => [10, 100, 1000][v[1]!]!,
    derive: (v, r) => ({ product: v[0]! * r }),
    promptTemplates: ["{a} x ___ = {product}", "What number was {a} multiplied by to reach {product}?"],
    explain: (v, r) => [`${v[0]} needs to be multiplied by ${r} to reach ${v[0]! * r}.`],
    hints: () => ["Compare how many places the digits have shifted to the left."],
    declaredVariationSpace: 989 * 3
  })
];

export default level;
