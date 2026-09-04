import { arithmeticTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 1 — "Place value to 1,000,000, rounding and negative numbers"
// 25 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L1-1 place value/ordering, Y5-L1-2
// rounding, Y5-L1-3 negative numbers in context).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];
const EVENTS = [
  "a football match", "a music festival", "a charity fun run", "an air show",
  "a school fair", "a marathon", "a fireworks display", "a food festival"
];
const CITIES = ["London", "Edinburgh", "Manchester", "Cardiff", "Belfast", "Leeds", "Bristol", "York"];
const BUILDINGS = [
  "a shopping centre", "a car park", "an office block", "a hotel",
  "an apartment building", "a hospital", "a museum", "a train station"
];

export const level: QuestionTemplateDef[] = [
  // --- Y5-L1-1: read, write, order and compare numbers to 1,000,000 ---
  arithmeticTemplate({
    key: "y5l1.hundredThousandsDigit", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100000, 999999]], compute: (v) => Math.floor(v[0]! / 100000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many hundred thousands are there?",
      "What is the value of the hundred-thousands digit in {a}?",
      "Counting {ctx}: how many hundred thousands are in {a}?"
    ],
    explain: (v, r) => [`${v[0]} has ${r} hundred thousand(s), then the rest splits into ten thousands, thousands, hundreds, tens and ones.`],
    hints: () => ["The hundred-thousands digit is the very first digit of a six-digit number."],
    declaredVariationSpace: 900000 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.tenThousandsDigit", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100000, 999999]], compute: (v) => Math.floor((v[0]! % 100000) / 10000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, what is the value of the ten-thousands digit (how many ten thousands)?",
      "How many ten thousands are in {a}?",
      "Counting {ctx}: how many ten thousands are in {a}?"
    ],
    explain: (v, r) => [`The ten-thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The ten-thousands digit is the second digit of a six-digit number."],
    declaredVariationSpace: 900000 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.thousandsDigit6d", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100000, 999999]], compute: (v) => Math.floor((v[0]! % 10000) / 1000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many thousands are there (ignoring the hundred thousands and ten thousands)?",
      "What is the thousands digit's value in {a}?",
      "Counting {ctx}: how many thousands are in {a}?"
    ],
    explain: (v, r) => [`The thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The thousands digit is the third digit of a six-digit number."],
    declaredVariationSpace: 900000 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.compareBigger6d", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[100000, 999999], [100000, 999999]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare digit by digit from the left (hundred thousands first). ${r} is bigger.`],
    hints: () => ["Compare the hundred-thousands digit first, then work right one place at a time."],
    distractorSpread: 20000,
    declaredVariationSpace: 100000000
  }),
  arithmeticTemplate({
    key: "y5l1.compareSmaller6d", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[100000, 999999], [100000, 999999]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.min(v[0]!, v[1]!),
    promptTemplates: ["Which number is smaller, {a} or {b}?"],
    explain: (v, r) => [`Compare digit by digit from the left (hundred thousands first). ${r} is smaller.`],
    hints: () => ["Compare the hundred-thousands digit first, then work right one place at a time."],
    distractorSpread: 20000,
    declaredVariationSpace: 100000000
  }),
  orderingTemplate({
    key: "y5l1.orderAscending6d", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(100000, 999999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the hundred-thousands digit first, then work right one place at a time."],
    hints: () => ["Which number has the smallest hundred-thousands digit?"],
    declaredVariationSpace: 900000
  }),
  orderingTemplate({
    key: "y5l1.orderDescending6d", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1000, 999999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["A number with more digits is always bigger. If two numbers have the same number of digits, compare digit by digit from the left."],
    hints: () => ["Count the digits first — more digits means a bigger number."],
    declaredVariationSpace: 900000
  }),
  arithmeticTemplate({
    key: "y5l1.expandedToNumber6d", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9], [0, 9], [0, 999]], compute: (v) => v[0]! * 100000 + v[1]! * 10000 + v[2]! * 1000 + v[3]!,
    promptTemplates: ["{a} hundred thousands + {b} ten thousands + {c} thousands + {d} = ?"],
    explain: (v, r) => [`${v[0]}00000 + ${v[1]}0000 + ${v[2]}000 + ${v[3]} = ${r}.`],
    hints: () => ["Add each place value together, largest first."],
    declaredVariationSpace: 9 * 10 * 10 * 1000
  }),
  arithmeticTemplate({
    key: "y5l1.oneMoreToMillion", levelKey: "Y5L1", objectiveCode: "Y5-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 999999]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What is one more than {a}?", "{a} + 1 = ?", "Counting {ctx}: one more than {a} is?"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Add 1 — watch for digits that carry over (e.g. 999,999 + 1 = 1,000,000)."],
    declaredVariationSpace: 999999 * 3
  }),

  // --- Y5-L1-2: round any number up to 1,000,000 to a required accuracy ---
  arithmeticTemplate({
    key: "y5l1.roundNearest10", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999998]], compute: (v) => Math.round(v[0]! / 10) * 10, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 10.", "What is {a} rounded to the nearest 10?", "Counting {ctx}: round {a} to the nearest 10."],
    explain: (v, r) => [`Look at the ones digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 10.`],
    hints: () => ["If the ones digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 999998 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.roundNearest100", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999950]], compute: (v) => Math.round(v[0]! / 100) * 100, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 100.", "What is {a} rounded to the nearest 100?", "Counting {ctx}: round {a} to the nearest 100."],
    explain: (v, r) => [`Look at the tens digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["If the tens digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 999950 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.roundNearest1000", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999500]], compute: (v) => Math.round(v[0]! / 1000) * 1000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 1,000.", "What is {a} rounded to the nearest 1,000?", "Counting {ctx}: round {a} to the nearest 1,000."],
    explain: (v, r) => [`Look at the hundreds digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 1,000.`],
    hints: () => ["If the hundreds digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 999500 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.roundNearest10000", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 995000]], compute: (v) => Math.round(v[0]! / 10000) * 10000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 10,000.", "What is {a} rounded to the nearest 10,000?", "Counting {ctx}: round {a} to the nearest 10,000."],
    explain: (v, r) => [`Look at the thousands digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["If the thousands digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 995000 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.roundNearest100000", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 950000]], compute: (v) => Math.round(v[0]! / 100000) * 100000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 100,000.", "What is {a} rounded to the nearest 100,000?", "Counting {ctx}: round {a} to the nearest 100,000."],
    explain: (v, r) => [`Look at the ten-thousands digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 100,000.`],
    hints: () => ["If the ten-thousands digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 950000 * 3
  }),
  arithmeticTemplate({
    key: "y5l1.mcRoundNearest10000", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 995000]], compute: (v) => Math.round(v[0]! / 10000) * 10000,
    promptTemplates: ["What is {a} rounded to the nearest 10,000?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["Look at the thousands digit to decide whether to round up or down."],
    distractorSpread: 20000,
    declaredVariationSpace: 995000
  }),
  arithmeticTemplate({
    key: "y5l1.tfRounding", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE",
    ranges: [[1, 995000]], compute: (v) => Math.round(v[0]! / 10000) * 10000,
    promptTemplates: ["{a} rounded to the nearest 10,000 is"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["Check the thousands digit to decide the rounding direction."],
    distractorSpread: 20000,
    declaredVariationSpace: 995000 * 4
  }),
  arithmeticTemplate({
    key: "y5l1.wordProblemRounding", levelKey: "Y5L1", objectiveCode: "Y5-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10000, 995000]], compute: (v) => Math.round(v[0]! / 10000) * 10000, contextPool: EVENTS,
    promptTemplates: ["{a} people attended {ctx}. Rounded to the nearest 10,000, about how many people was that?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["Round to the nearest ten thousand using the thousands digit."],
    declaredVariationSpace: 985000 * EVENTS.length
  }),

  // --- Y5-L1-3: interpret negative numbers in context, counting through zero ---
  arithmeticTemplate({
    key: "y5l1.numberLineNegative", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "NUMBER_LINE",
    ranges: [[-20, 20]], compute: (v) => v[0]!,
    promptTemplates: [
      "What number is the arrow pointing to on the number line?",
      "Read the number line. What number does the arrow show?",
      "Which number does the pointer show on the number line?",
      "What number is marked by the arrow?",
      "Identify the number shown by the arrow on the number line."
    ],
    explain: (v) => [`Count from zero to reach ${v[0]}, moving left for negative or right for positive.`],
    hints: () => ["Count the marks from zero, noting whether you move left (negative) or right (positive)."],
    visualAid: (v) => visuals.numberLine(-20, 20, v[0]!),
    declaredVariationSpace: 41 * 5
  }),
  orderingTemplate({
    key: "y5l1.orderIntegersAsc", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "APPLICATION",
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
    key: "y5l1.compareIntegers", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[-20, 20], [-20, 20]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is greater, {a} or {b}?"],
    explain: (v, r) => [`${r} is further to the right on the number line, so it is greater.`],
    hints: () => ["A number further right on the number line is always greater."],
    distractorSpread: 6,
    declaredVariationSpace: 40 * 39
  }),
  arithmeticTemplate({
    key: "y5l1.tfNegativeComparison", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "TRUE_FALSE",
    ranges: [[-20, 20], [-20, 20]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Between {a} and {b}, the greater number is", "Comparing {a} and {b}, the larger value is"],
    explain: (v, r) => [`${r} is greater — it is further right on the number line.`],
    hints: () => ["The number further right on the number line is greater."],
    distractorSpread: 8,
    declaredVariationSpace: 40 * 39 * 2
  }),
  arithmeticTemplate({
    key: "y5l1.countOnThroughZero", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-20, -1]], compute: (v) => v[0]! + 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1, c: v[0]! + 2 }),
    promptTemplates: [
      "Counting {ctx}: {a}, {b}, {c}, ___. What comes next?",
      "Counting on: {a}, {b}, {c}, ___. What is the next number, counting {ctx}?",
      "Continue the pattern: {a}, {b}, {c}, ___"
    ],
    explain: (v, r) => [`This is a counting-on sequence starting at ${v[0]}.`, `Each number goes up by 1: ${v[0]}, ${v[0]! + 1}, ${v[0]! + 2}, ${r}.`, "Counting up through zero: after -1 comes 0, then 1 — there is no '-0'."],
    hints: (v) => [`Count on from ${v[0]! + 2}, remembering that after -1 comes 0.`],
    declaredVariationSpace: 20 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l1.countBackThroughZero", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-17, 4]], compute: (v) => v[0]! - 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! - 1, c: v[0]! - 2 }),
    promptTemplates: [
      "Counting back {ctx}: {a}, {b}, {c}, ___. What comes next?",
      "Counting backwards: {a}, {b}, {c}, ___. What is the next number, counting {ctx}?",
      "Continue counting backwards: {a}, {b}, {c}, ___"
    ],
    explain: (v, r) => [`This is a counting-backwards sequence starting at ${v[0]}.`, `Each number goes down by 1: ${v[0]}, ${v[0]! - 1}, ${v[0]! - 2}, ${r}.`, "Counting back through zero: after 0 comes -1, not 1."],
    hints: (v) => [`Count back from ${v[0]! - 2}, remembering that after 0 comes -1.`],
    declaredVariationSpace: 21 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l1.wordProblemTemperatureRise", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-15, 5], [1, 15]], compute: (v) => v[0]! + v[1]!, contextPool: CITIES,
    promptTemplates: ["The temperature in {ctx} was {a}°C overnight. By midday it had risen by {b}°C. What is the midday temperature?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, "A rise means you count up (right on the number line), through zero if needed."],
    hints: () => ["A rise in temperature means counting up. Watch for crossing through zero."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 21 * 15 * CITIES.length
  }),
  arithmeticTemplate({
    key: "y5l1.wordProblemTemperatureFall", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-5, 15], [1, 15]], compute: (v) => v[0]! - v[1]!, contextPool: CITIES,
    promptTemplates: ["The temperature in {ctx} was {a}°C. Overnight it fell by {b}°C. What is the new temperature?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "A fall means you count down (left on the number line), through zero if needed."],
    hints: () => ["A fall in temperature means counting down. Watch for crossing through zero."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 21 * 15 * CITIES.length
  }),
  arithmeticTemplate({
    key: "y5l1.wordProblemLiftFloors", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[0, 6], [1, 12]], compute: (v) => v[0]! - v[1]!, contextPool: BUILDINGS,
    promptTemplates: ["A lift in {ctx} is on floor {a}. It goes down {b} floors, into the levels below ground. What floor is it on now?"],
    explain: (v, r) => [
      `Floor ${v[0]} down ${v[1]} floors: ${v[0]} - ${v[1]} = ${r}.`,
      r < 0 ? `A negative floor number means it is ${Math.abs(r)} floor(s) below ground.` : "It stayed at or above ground level."
    ],
    hints: () => ["Count down from the starting floor. Floors below ground are negative."],
    declaredVariationSpace: 7 * 12 * BUILDINGS.length
  }),
  arithmeticTemplate({
    key: "y5l1.wordProblemLiftUp", levelKey: "Y5L1", objectiveCode: "Y5-L1-3", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-6, -1], [1, 12]], compute: (v) => v[0]! + v[1]!, contextPool: BUILDINGS,
    promptTemplates: ["A lift in {ctx} is on floor {a} (below ground). It goes up {b} floors. What floor is it on now?"],
    explain: (v, r) => [
      `Floor ${v[0]} up ${v[1]} floors: ${v[0]} + ${v[1]} = ${r}.`,
      r >= 0 ? "It reached ground level or above — floor 0 is ground level." : `It is still ${Math.abs(r)} floor(s) below ground.`
    ],
    hints: () => ["Count up from the starting floor, through zero (ground level) if needed."],
    declaredVariationSpace: 6 * 12 * BUILDINGS.length
  })
];

export default level;
