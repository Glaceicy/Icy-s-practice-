import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 2, Level 1 — "Place value and numbers to 100"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y2-L1-1 tens/ones place value, Y2-L1-2
// compare/order using <, > and =, Y2-L1-3 skip counting in 2s/3s/5s/10s
// from any starting number).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];

export const level: QuestionTemplateDef[] = [
  // --- Y2-L1-1: place value of each digit in a two-digit number ---
  arithmeticTemplate({
    key: "y2l1.tensDigit", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[10, 99]], compute: (v) => Math.floor(v[0]! / 10), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many tens are there?", "Counting {ctx}: how many tens are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${r} tens and ${v[0]! % 10} ones.`],
    hints: () => ["The tens digit is the first digit."],
    visualAid: (v) => visuals.tenFrame(v[0]! % 10),
    declaredVariationSpace: 90 * 2
  }),
  arithmeticTemplate({
    key: "y2l1.onesDigit", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[10, 99]], compute: (v) => v[0]! % 10, contextPool: CTX,
    promptTemplates: ["In the number {a}, how many ones are there?", "Counting {ctx}: how many ones are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 10)} tens and ${r} ones.`],
    hints: () => ["The ones digit is the last digit."],
    declaredVariationSpace: 90 * 2
  }),
  arithmeticTemplate({
    key: "y2l1.tensOnesToNumber", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!,
    promptTemplates: ["{a} tens and {b} ones make what number?", "What number has {a} tens and {b} ones?"],
    explain: (v, r) => [`${v[0]} tens = ${v[0]! * 10}. ${v[0]! * 10} + ${v[1]} = ${r}.`],
    hints: () => ["Multiply the tens by 10, then add the ones."],
    visualAid: (v) => visuals.array(v[0]!, 10),
    declaredVariationSpace: 180
  }),
  arithmeticTemplate({
    key: "y2l1.missingTensFromNumber", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MISSING_NUMBER",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ n: v[0]! * 10 + v[1]! }),
    promptTemplates: ["The number {n} has ___ tens.", "How many tens make up {n}?"],
    explain: (v, r) => [`${v[0]! * 10 + v[1]!} = ${r} tens and ${v[1]} ones.`],
    hints: () => ["Look at the tens digit — the first digit."],
    declaredVariationSpace: 180
  }),
  matchingTemplate({
    key: "y2l1.matchNumberTensOnes", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"],
    generatePairs: (rng) => {
      const tens = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      return tens.map((t) => {
        const ones = rng.int(0, 9);
        return { left: String(t * 10 + ones), right: `${t} tens and ${ones} ones` };
      });
    },
    promptTemplates: ["Match each number to its tens and ones."],
    explain: () => ["Split each number into its tens digit and ones digit."],
    hints: () => ["The first digit is the tens; the second digit is the ones."],
    declaredVariationSpace: 3000
  }),
  arithmeticTemplate({
    key: "y2l1.wordProblemPlaceValue", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!, contextPool: CTX,
    promptTemplates: ["A shop has {a} boxes of 10 {ctx} and {b} loose {ctx}. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} boxes of 10 = ${v[0]! * 10}. ${v[0]! * 10} + ${v[1]} loose = ${r}.`],
    hints: () => ["Multiply the boxes by 10 first, then add the loose ones."],
    visualAid: (v) => visuals.array(v[0]!, 10),
    declaredVariationSpace: 90 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l1.mcPlaceValueDigit", levelKey: "Y2L1", objectiveCode: "Y2-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!,
    promptTemplates: ["Which number has {a} tens and {b} ones?", "{a} tens and {b} ones make which number?"],
    explain: (v, r) => [`${v[0]} tens and ${v[1]} ones make ${r}.`],
    hints: () => ["Tens come first, then ones."],
    distractorSpread: 12,
    declaredVariationSpace: 180
  }),

  // --- Y2-L1-2: compare and order numbers to 100 using <, > and = ---
  categoricalPoolTemplate({
    key: "y2l1.compareWithSymbol", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 100);
      const makeEqual = rng.chance(0.15);
      const b = makeEqual ? a : rng.int(1, 100);
      const correct = a < b ? "<" : a > b ? ">" : "=";
      const distractors = ["<", ">", "="].filter((s) => s !== correct);
      return {
        prompt: `Which symbol makes this true: ${a} ___ ${b}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [correct === "=" ? `${a} and ${b} are the same, so the symbol is =.` : `${a} is ${correct === "<" ? "smaller" : "bigger"} than ${b}, so the symbol is ${correct}.`],
        hints: ["< means 'is less than', > means 'is greater than', = means 'is equal to'."]
      };
    },
    declaredVariationSpace: 100 * 100
  }),
  categoricalPoolTemplate({
    key: "y2l1.tfSymbolStatement", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 100);
      let b = rng.int(1, 100);
      while (b === a) b = rng.int(1, 100);
      const symbol = rng.pick([">", "<"]);
      const truth = symbol === ">" ? a > b : a < b;
      return {
        prompt: `${a} ${symbol} ${b}`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [`${a} ${a > b ? "is bigger than" : "is smaller than"} ${b}.`],
        hints: ["> means 'is greater than'; < means 'is less than'."]
      };
    },
    declaredVariationSpace: 100 * 99 * 2
  }),
  orderingTemplate({
    key: "y2l1.orderAscending100", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 100));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the tens digit first, then the ones."],
    hints: () => ["Which number has the fewest tens?"],
    declaredVariationSpace: 4000
  }),
  orderingTemplate({
    key: "y2l1.orderDescending100", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 100));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["Compare the tens digit first, then the ones."],
    hints: () => ["Which number has the most tens?"],
    declaredVariationSpace: 4000
  }),
  arithmeticTemplate({
    key: "y2l1.compareBigger", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 100], [1, 100]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare the tens first. ${r} is the bigger number.`],
    hints: () => ["Compare the tens digit first. If they're equal, compare the ones."],
    distractorSpread: 15,
    declaredVariationSpace: 100 * 99
  }),
  categoricalPoolTemplate({
    key: "y2l1.wordProblemCompareAmounts", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(5, 100);
      let b = rng.int(5, 100);
      while (b === a) b = rng.int(5, 100);
      const names = ["Class A", "Class B"];
      const correct = a < b ? names[0]! : names[1]!;
      const other = correct === names[0] ? names[1]! : names[0]!;
      return {
        prompt: `Class A collected ${a} stickers. Class B collected ${b} stickers. Which class collected fewer stickers?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${Math.min(a, b)} is smaller than ${Math.max(a, b)}, so ${correct} collected fewer.`],
        hints: ["Compare the two totals — the smaller number collected fewer."]
      };
    },
    declaredVariationSpace: 96 * 95
  }),
  categoricalPoolTemplate({
    key: "y2l1.reasoningExplainCompare", levelKey: "Y2L1", objectiveCode: "Y2-L1-2", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(10, 99);
      let b = rng.int(10, 99);
      while (Math.floor(b / 10) === Math.floor(a / 10)) b = rng.int(10, 99);
      const correct = Math.floor(a / 10) > Math.floor(b / 10) ? String(a) : String(b);
      const other = correct === String(a) ? String(b) : String(a);
      return {
        prompt: `Which number has more tens, ${a} or ${b}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${correct} has more tens.`],
        hints: ["Look only at the first digit (the tens digit) of each number."]
      };
    },
    declaredVariationSpace: 90 * 89
  }),

  // --- Y2-L1-3: count in steps of 2, 3 and 5, and in tens from any number ---
  arithmeticTemplate({
    key: "y2l1.skipCountBy2FromAny", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[1, 96]], compute: (v) => v[0]! + 2, contextPool: CTX,
    promptTemplates: ["Counting in 2s: {a}, ___. What comes next?", "Counting {ctx} in 2s from {a}: {a}, ___"],
    explain: (v, r) => [`Add 2: ${v[0]} + 2 = ${r}.`],
    hints: () => ["Add 2 to the number."],
    declaredVariationSpace: 96 * 2
  }),
  arithmeticTemplate({
    key: "y2l1.skipCountBy3FromAny", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[1, 95]], compute: (v) => v[0]! + 3, contextPool: CTX,
    promptTemplates: ["Counting in 3s: {a}, ___. What comes next?", "Counting {ctx} in 3s from {a}: {a}, ___"],
    explain: (v, r) => [`Add 3: ${v[0]} + 3 = ${r}.`],
    hints: () => ["Add 3 to the number."],
    declaredVariationSpace: 95 * 2
  }),
  arithmeticTemplate({
    key: "y2l1.skipCountBy5FromAny", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[1, 93]], compute: (v) => v[0]! + 5, contextPool: CTX,
    promptTemplates: ["Counting in 5s: {a}, ___. What comes next?", "Counting {ctx} in 5s from {a}: {a}, ___"],
    explain: (v, r) => [`Add 5: ${v[0]} + 5 = ${r}.`],
    hints: () => ["Add 5 to the number."],
    declaredVariationSpace: 93 * 2
  }),
  arithmeticTemplate({
    key: "y2l1.skipCountByTenFromAny", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[1, 89]], compute: (v) => v[0]! + 10, contextPool: CTX,
    promptTemplates: ["{a} + 10 = ___", "What is 10 more than {a}?", "Counting {ctx}: {a} plus 10 more is ___"],
    explain: (v, r) => [`Add 10 to ${v[0]}: the tens digit goes up by 1. ${v[0]} + 10 = ${r}.`],
    hints: () => ["Adding 10 only changes the tens digit."],
    declaredVariationSpace: 89 * 3
  }),
  arithmeticTemplate({
    key: "y2l1.mcSkipCountBy3", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 95]], compute: (v) => v[0]! + 3,
    promptTemplates: ["Counting in 3s: {a}, ___. What comes next?", "Skip count by 3 from {a}. What is the next number?"],
    explain: (v, r) => [`${v[0]} + 3 = ${r}.`],
    hints: () => ["Add 3 to the number."],
    distractorSpread: 3,
    declaredVariationSpace: 190
  }),
  orderingTemplate({
    key: "y2l1.orderSkipCountSequence", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], direction: "asc",
    generateItems: (rng) => {
      const start = rng.int(1, 20);
      const step = rng.pick([2, 3, 5]);
      const terms = [start, start + step, start + step * 2, start + step * 3];
      return rng.shuffle(terms).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["These numbers from a counting pattern are muddled up. Drag them into order, smallest first."],
    explain: () => ["Work out the step size, then order the numbers from smallest to largest."],
    hints: () => ["Look at how much the numbers go up by each time."],
    declaredVariationSpace: 20 * 3 * 24
  }),
  categoricalPoolTemplate({
    key: "y2l1.wordProblemSkipCounting", levelKey: "Y2L1", objectiveCode: "Y2-L1-3", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const start = rng.int(1, 20);
      const step = rng.pick([2, 3, 5]);
      const jumps = rng.int(2, 5);
      const correct = start + step * jumps;
      const distractors = [start + step * (jumps - 1), start + step * (jumps + 1), start + (step + 1) * jumps];
      const uniq = Array.from(new Set(distractors.map(String))).filter((l) => l !== String(correct));
      let pad = correct + 100;
      while (uniq.length < 3) { uniq.push(String(pad)); pad++; }
      return {
        prompt: `A frog starts at ${start} and jumps forward ${step} each time. Where is it after ${jumps} jumps?`,
        correctLabel: String(correct),
        distractorLabels: uniq.slice(0, 3),
        explanationSteps: [`${start} + (${step} x ${jumps}) = ${correct}.`],
        hints: ["Multiply the jump size by the number of jumps, then add that to the start."]
      };
    },
    declaredVariationSpace: 20 * 3 * 4
  })
];

export default level;
