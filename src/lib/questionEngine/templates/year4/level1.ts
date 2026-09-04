import { arithmeticTemplate, matchingTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 1 — "Place value, rounding and numbers to 10,000"
// A smaller but fully valid, deterministic bank (15 templates, each verified
// to reach >=150 variations) demonstrating the engine at KS2 upper-level
// depth. See DOCUMENTATION.md "Content coverage status".
const CTX = ["people", "books", "pencils", "tickets", "trees", "houses", "cars", "stamps"];

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y4l1.thousandsDigit", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999]], compute: (v) => Math.floor(v[0]! / 1000), contextPool: CTX,
    promptTemplates: ["In the number {a}, what is the value of the thousands digit (how many thousands)?", "How many thousands are in {a}?", "Counting {ctx}: how many thousands are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${r} thousands, ${Math.floor((v[0]! % 1000) / 100)} hundreds, ${Math.floor((v[0]! % 100) / 10)} tens, ${v[0]! % 10} ones.`],
    hints: () => ["The thousands digit is the first digit."],
    declaredVariationSpace: 9000 * 3
  }),
  arithmeticTemplate({
    key: "y4l1.hundredsDigit", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999]], compute: (v) => Math.floor((v[0]! % 1000) / 100), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many hundreds are there?", "What is the hundreds digit's value in {a}?", "Counting {ctx}: how many hundreds are in {a}?"],
    explain: (v, r) => [`The hundreds digit of ${v[0]} is ${r}.`],
    hints: () => ["The hundreds digit is the second digit."],
    declaredVariationSpace: 9000 * 3
  }),
  arithmeticTemplate({
    key: "y4l1.compareBigger4d", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1000, 9999], [1000, 9999]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare digit by digit from the left (thousands first). ${r} is bigger.`],
    hints: () => ["Compare the thousands digit first, then hundreds, then tens, then ones."],
    distractorSpread: 500,
    declaredVariationSpace: 9000 * 8999
  }),
  arithmeticTemplate({
    key: "y4l1.roundNearest10", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9998]], compute: (v) => Math.round(v[0]! / 10) * 10, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 10.", "What is {a} rounded to the nearest 10?", "Counting {ctx}: round {a} to the nearest 10."],
    explain: (v, r) => [`Look at the ones digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 10.`],
    hints: () => ["If the ones digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9998 * 3
  }),
  arithmeticTemplate({
    key: "y4l1.roundNearest100", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 100.", "What is {a} rounded to the nearest 100?", "Counting {ctx}: round {a} to the nearest 100."],
    explain: (v, r) => [`Look at the tens digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["If the tens digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9950 * 3
  }),
  arithmeticTemplate({
    key: "y4l1.roundNearest1000", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9500]], compute: (v) => Math.round(v[0]! / 1000) * 1000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 1,000.", "What is {a} rounded to the nearest 1,000?", "Counting {ctx}: round {a} to the nearest 1,000."],
    explain: (v, r) => [`Look at the hundreds digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 1,000.`],
    hints: () => ["If the hundreds digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9500 * 3
  }),
  arithmeticTemplate({
    key: "y4l1.mcRoundNearest100", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100,
    promptTemplates: ["What is {a} rounded to the nearest 100?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["Look at the tens digit to decide whether to round up or down."],
    distractorSpread: 200,
    declaredVariationSpace: 9950
  }),
  arithmeticTemplate({
    key: "y4l1.tfRounding", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE",
    ranges: [[1, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100,
    promptTemplates: ["{a} rounded to the nearest 100 is"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["Check the tens digit to decide the rounding direction."],
    distractorSpread: 200,
    declaredVariationSpace: 9950 * 4
  }),
  arithmeticTemplate({
    key: "y4l1.skipCount6789", levelKey: "Y4L1", objectiveCode: "Y4-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 12], [0, 3]],
    compute: (v) => {
      const step = [6, 7, 9, 25][v[1]!]!;
      return v[0]! * step + step;
    },
    contextPool: CTX,
    derive: (v) => {
      const step = [6, 7, 9, 25][v[1]!]!;
      return { a: v[0]! * step, step };
    },
    promptTemplates: ["Counting in {step}s: {a}, ___. What comes next?", "Skip count by {step} from {a}. What is the next number?", "Counting {ctx} in {step}s from {a}: {a}, ___"],
    explain: (v, r) => [`Add the step size to the given number: ${r}.`],
    hints: () => ["Add the step size to the given number."],
    declaredVariationSpace: 13 * 4 * CTX.length
  }),
  arithmeticTemplate({
    key: "y4l1.skipCount1000", levelKey: "Y4L1", objectiveCode: "Y4-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 8]], compute: (v) => v[0]! * 1000 + 1000, contextPool: CTX,
    derive: (v) => ({ a: v[0]! * 1000 }),
    promptTemplates: [
      "Counting in 1,000s: {a}, ___. What comes next?",
      "Skip count by 1,000 from {a}, while counting {ctx}.",
      "Counting {ctx} in 1,000s from {a}: {a}, ___"
    ],
    explain: (v, r) => [`${v[0]! * 1000} + 1,000 = ${r}.`],
    hints: () => ["Add 1,000 — only the thousands digit changes."],
    declaredVariationSpace: 9 * (1 + 2 * CTX.length)
  }),
  arithmeticTemplate({
    key: "y4l1.expandedToNumber", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 1000 + v[1]! * 100 + v[2]! * 10 + v[3]!,
    promptTemplates: ["{a} thousands + {b} hundreds + {c} tens + {d} ones = ?"],
    explain: (v, r) => [`${v[0]}000 + ${v[1]!}00 + ${v[2]}0 + ${v[3]} = ${r}.`],
    hints: () => ["Add each place value together."],
    declaredVariationSpace: 9 * 10 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y4l1.oneMoreTo10000", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 9998]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What is one more than {a}?", "{a} + 1 = ?", "Counting {ctx}: one more than {a} is?"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Add 1 — watch for digits that carry over (e.g. 999 + 1 = 1000)."],
    declaredVariationSpace: 9998 * 3
  }),
  orderingTemplate({
    key: "y4l1.orderAscending4d", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1000, 9999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the thousands digit first, then hundreds, tens and ones."],
    hints: () => ["Which number has the smallest thousands digit?"],
    declaredVariationSpace: 500000
  }),
  matchingTemplate({
    key: "y4l1.matchRoundedValues", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"],
    generatePairs: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(100, 9899));
      return Array.from(nums).map((n) => ({ left: String(n), right: String(Math.round(n / 100) * 100) }));
    },
    promptTemplates: ["Match each number to its value rounded to the nearest 100."],
    explain: () => ["Look at the tens digit of each number to decide the rounding direction."],
    hints: () => ["Round each number to the nearest hundred, one at a time."],
    declaredVariationSpace: 200000
  }),
  arithmeticTemplate({
    key: "y4l1.wordProblemRounding", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1000, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100, contextPool: CTX,
    promptTemplates: ["A stadium had {a} {ctx} attend a match. Rounded to the nearest 100, about how many {ctx} attended?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["Round to the nearest hundred using the tens digit."],
    declaredVariationSpace: 8950 * CTX.length
  })
];

export default level;
