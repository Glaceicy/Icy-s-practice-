import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 1 — "Place value, rounding and negative numbers"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y6-L1-1 place value/ordering to
// 10,000,000, Y6-L1-2 rounding to any degree of accuracy, Y6-L1-3
// negative numbers in context and intervals across zero).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];
const EVENTS = [
  "a music festival", "a stadium concert", "a charity marathon", "an air show",
  "a national park", "a theme park", "a fireworks display", "a food festival"
];
const CITIES = ["London", "Edinburgh", "Manchester", "Cardiff", "Belfast", "Leeds", "Bristol", "York"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L1-1: read, write, order and compare numbers up to 10,000,000 ---
  arithmeticTemplate({
    key: "y6l1.millionsDigit", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000000, 9999999]], compute: (v) => Math.floor(v[0]! / 1000000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many millions are there?",
      "What is the value of the millions digit in {a}?",
      "Counting {ctx}: how many millions are in {a}?"
    ],
    explain: (v, r) => [`${v[0]} has ${r} million(s), then the rest splits into hundred thousands, ten thousands, thousands, hundreds, tens and ones.`],
    hints: () => ["The millions digit is the very first digit of a seven-digit number."],
    declaredVariationSpace: 9000000 * 3
  }),
  arithmeticTemplate({
    key: "y6l1.hundredThousandsDigit7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000000, 9999999]], compute: (v) => Math.floor((v[0]! % 1000000) / 100000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many hundred thousands are there?",
      "What is the value of the hundred-thousands digit in {a}?",
      "Counting {ctx}: how many hundred thousands are in {a}?"
    ],
    explain: (v, r) => [`The hundred-thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The hundred-thousands digit is the second digit of a seven-digit number."],
    declaredVariationSpace: 9000000 * 3
  }),
  arithmeticTemplate({
    key: "y6l1.tenThousandsDigit7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000000, 9999999]], compute: (v) => Math.floor((v[0]! % 100000) / 10000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many ten thousands are there?",
      "What is the value of the ten-thousands digit in {a}?",
      "Counting {ctx}: how many ten thousands are in {a}?"
    ],
    explain: (v, r) => [`The ten-thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The ten-thousands digit is the third digit of a seven-digit number."],
    declaredVariationSpace: 9000000 * 3
  }),
  arithmeticTemplate({
    key: "y6l1.compareBigger7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1000000, 9999999], [1000000, 9999999]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare digit by digit from the left (millions first). ${r} is bigger.`],
    hints: () => ["Compare the millions digit first, then work right one place at a time."],
    distractorSpread: 200000,
    declaredVariationSpace: 500000000
  }),
  orderingTemplate({
    key: "y6l1.orderAscending7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1000000, 9999999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the millions digit first, then work right one place at a time."],
    hints: () => ["Which number has the smallest millions digit?"],
    declaredVariationSpace: 9000000
  }),
  orderingTemplate({
    key: "y6l1.orderDescending7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(100000, 9999999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["A number with more digits is always bigger. If two numbers have the same number of digits, compare digit by digit from the left."],
    hints: () => ["Count the digits first — more digits means a bigger number."],
    declaredVariationSpace: 9900000
  }),
  arithmeticTemplate({
    key: "y6l1.oneMoreToTenMillion", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "REASONING",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999999]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What is one more than {a}?", "{a} + 1 = ?", "Counting {ctx}: one more than {a} is?"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Add 1 — watch for digits that carry over (e.g. 9,999,999 + 1 = 10,000,000)."],
    declaredVariationSpace: 9999999 * 3
  }),

  // --- Y6-L1-2: round any whole number to a required degree of accuracy ---
  arithmeticTemplate({
    key: "y6l1.roundNearest1000_7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999500]], compute: (v) => Math.round(v[0]! / 1000) * 1000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 1,000.", "What is {a} rounded to the nearest 1,000?", "Counting {ctx}: round {a} to the nearest 1,000."],
    explain: (v, r) => [`Look at the hundreds digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 1,000.`],
    hints: () => ["If the hundreds digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9999500 * 3
  }),
  arithmeticTemplate({
    key: "y6l1.roundNearest100000_7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9950000]], compute: (v) => Math.round(v[0]! / 100000) * 100000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 100,000.", "What is {a} rounded to the nearest 100,000?", "Counting {ctx}: round {a} to the nearest 100,000."],
    explain: (v, r) => [`Look at the ten-thousands digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 100,000.`],
    hints: () => ["If the ten-thousands digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9950000 * 3
  }),
  arithmeticTemplate({
    key: "y6l1.roundNearestMillion", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9500000]], compute: (v) => Math.round(v[0]! / 1000000) * 1000000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest million.", "What is {a} rounded to the nearest 1,000,000?", "Counting {ctx}: round {a} to the nearest million."],
    explain: (v, r) => [`Look at the hundred-thousands digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest million.`],
    hints: () => ["If the hundred-thousands digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9500000 * 3
  }),
  categoricalPoolTemplate({
    key: "y6l1.mcRoundAnyDegree", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const unit = rng.pick([10, 100, 1000, 10000, 100000, 1000000]);
      const n = rng.int(1, 9999999);
      const rounded = Math.round(n / unit) * unit;
      const unitLabel = unit === 1000000 ? "million" : unit.toLocaleString("en-GB");
      const distractors = numericDistractors(rng, rounded, 3, unit).map((d) => d.toLocaleString("en-GB"));
      return {
        prompt: `What is ${n.toLocaleString("en-GB")} rounded to the nearest ${unitLabel}?`,
        correctLabel: rounded.toLocaleString("en-GB"),
        distractorLabels: distractors,
        explanationSteps: [`${n.toLocaleString("en-GB")} rounds to ${rounded.toLocaleString("en-GB")} to the nearest ${unitLabel}.`],
        hints: ["Look at the digit one place smaller than the rounding unit to decide whether to round up or down."]
      };
    },
    declaredVariationSpace: 6 * 9999999
  }),
  categoricalPoolTemplate({
    key: "y6l1.tfRoundAnyDegree", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const unit = rng.pick([10, 100, 1000, 10000, 100000, 1000000]);
      const n = rng.int(1, 9999999);
      const rounded = Math.round(n / unit) * unit;
      const unitLabel = unit === 1000000 ? "million" : unit.toLocaleString("en-GB");
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? rounded : numericDistractors(rng, rounded, 1, unit)[0] ?? rounded + unit;
      return {
        prompt: `${n.toLocaleString("en-GB")} rounded to the nearest ${unitLabel} is ${shown.toLocaleString("en-GB")}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${n.toLocaleString("en-GB")} rounds to ${rounded.toLocaleString("en-GB")} to the nearest ${unitLabel}.`],
        hints: ["Work out the rounded value and check it against the statement."]
      };
    },
    declaredVariationSpace: 6 * 9999999 * 2
  }),
  arithmeticTemplate({
    key: "y6l1.wordProblemRounding7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10000, 9990000]], compute: (v) => Math.round(v[0]! / 10000) * 10000, contextPool: EVENTS,
    promptTemplates: ["{a} people attended {ctx} this year. Rounded to the nearest 10,000, about how many people was that?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["Round to the nearest ten thousand using the thousands digit."],
    declaredVariationSpace: 9980000 * EVENTS.length
  }),

  // --- Y6-L1-3: use negative numbers in context and calculate intervals across zero ---
  arithmeticTemplate({
    key: "y6l1.numberLineNegative30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "NUMBER_LINE",
    ranges: [[-30, 30]], compute: (v) => v[0]!,
    promptTemplates: [
      "What number is the arrow pointing to on the number line?",
      "Read the number line. What number does the arrow show?",
      "Which number does the pointer show on the number line?",
      "What number is marked by the arrow?",
      "Identify the number shown by the arrow on the number line."
    ],
    explain: (v) => [`Count from zero to reach ${v[0]}, moving left for negative or right for positive.`],
    hints: () => ["Count the marks from zero, noting whether you move left (negative) or right (positive)."],
    visualAid: (v) => visuals.numberLine(-30, 30, v[0]!),
    declaredVariationSpace: 61 * 5
  }),
  orderingTemplate({
    key: "y6l1.orderIntegersAsc30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 5) nums.add(rng.int(-30, 30));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag these numbers into order, smallest first."],
    explain: () => ["On a number line, numbers further left are smaller — negative numbers are smaller than positive numbers."],
    hints: () => ["Negative numbers are always smaller than positive numbers. Compare negatives by how far below zero they are."],
    declaredVariationSpace: 300000
  }),
  arithmeticTemplate({
    key: "y6l1.compareIntegers30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[-30, 30], [-30, 30]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is greater, {a} or {b}?"],
    explain: (v, r) => [`${r} is further to the right on the number line, so it is greater.`],
    hints: () => ["A number further right on the number line is always greater."],
    distractorSpread: 8,
    declaredVariationSpace: 60 * 59
  }),
  arithmeticTemplate({
    key: "y6l1.tfNegativeComparison30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "TRUE_FALSE",
    ranges: [[-30, 30], [-30, 30]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Between {a} and {b}, the greater number is", "Comparing {a} and {b}, the larger value is"],
    explain: (v, r) => [`${r} is greater — it is further right on the number line.`],
    hints: () => ["The number further right on the number line is greater."],
    distractorSpread: 8,
    declaredVariationSpace: 60 * 59 * 2
  }),
  arithmeticTemplate({
    key: "y6l1.countOnThroughZero30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-30, -1]], compute: (v) => v[0]! + 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1, c: v[0]! + 2 }),
    promptTemplates: [
      "Counting {ctx}: {a}, {b}, {c}, ___. What comes next?",
      "Counting on: {a}, {b}, {c}, ___. What is the next number, counting {ctx}?",
      "Continue the pattern: {a}, {b}, {c}, ___"
    ],
    explain: (v, r) => [`This is a counting-on sequence starting at ${v[0]}.`, `Each number goes up by 1: ${v[0]}, ${v[0]! + 1}, ${v[0]! + 2}, ${r}.`, "Counting up through zero: after -1 comes 0, then 1 — there is no '-0'."],
    hints: (v) => [`Count on from ${v[0]! + 2}, remembering that after -1 comes 0.`],
    declaredVariationSpace: 30 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y6l1.countBackThroughZero30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-27, 4]], compute: (v) => v[0]! - 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! - 1, c: v[0]! - 2 }),
    promptTemplates: [
      "Counting back {ctx}: {a}, {b}, {c}, ___. What comes next?",
      "Counting backwards: {a}, {b}, {c}, ___. What is the next number, counting {ctx}?",
      "Continue counting backwards: {a}, {b}, {c}, ___"
    ],
    explain: (v, r) => [`This is a counting-backwards sequence starting at ${v[0]}.`, `Each number goes down by 1: ${v[0]}, ${v[0]! - 1}, ${v[0]! - 2}, ${r}.`, "Counting back through zero: after 0 comes -1, not 1."],
    hints: (v) => [`Count back from ${v[0]! - 2}, remembering that after 0 comes -1.`],
    declaredVariationSpace: 31 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y6l1.intervalAcrossZero", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-20, -1], [1, 20]], compute: (v) => v[1]! - v[0]!, contextPool: CITIES,
    promptTemplates: ["In {ctx}, the temperature was {a}°C at midnight and rose to {b}°C by midday. What was the size of the interval (the rise) between the two temperatures?"],
    explain: (v, r) => [`The interval from ${v[0]}°C to ${v[1]}°C crosses zero: ${v[1]} - (${v[0]}) = ${r}.`, "Add how far below zero it started to how far above zero it ended."],
    hints: () => ["Add the distance below zero to the distance above zero."],
    declaredVariationSpace: 20 * 20 * CITIES.length
  }),
  arithmeticTemplate({
    key: "y6l1.wordProblemTemperatureFall30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-5, 20], [1, 20]], compute: (v) => v[0]! - v[1]!, contextPool: CITIES,
    promptTemplates: ["The temperature in {ctx} was {a}. Overnight it fell by {b}. What is the new temperature?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "A fall means you count down (left on the number line), through zero if needed."],
    hints: () => ["A fall in temperature means counting down. Watch for crossing through zero."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 26 * 20 * CITIES.length
  })
];

export default level;
