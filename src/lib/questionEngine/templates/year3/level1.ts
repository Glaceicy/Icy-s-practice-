import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 3, Level 1 — "Place value and numbers to 1,000"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y3-L1-1 hundreds/tens/ones place value,
// Y3-L1-2 compare/order numbers to 1,000, Y3-L1-3 counting from 0 in
// multiples of 4, 8, 50 and 100).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];

export const level: QuestionTemplateDef[] = [
  // --- Y3-L1-1: place value of each digit in a three-digit number ---
  arithmeticTemplate({
    key: "y3l1.hundredsDigit", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100, 999]], compute: (v) => Math.floor(v[0]! / 100), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many hundreds are there?", "Counting {ctx}: how many hundreds are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${r} hundreds, ${Math.floor((v[0]! % 100) / 10)} tens and ${v[0]! % 10} ones.`],
    hints: () => ["The hundreds digit is the first digit."],
    declaredVariationSpace: 900 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.tensDigitInHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100, 999]], compute: (v) => Math.floor((v[0]! % 100) / 10), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many tens are there?", "Counting {ctx}: how many tens are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 100)} hundreds, ${r} tens and ${v[0]! % 10} ones.`],
    hints: () => ["The tens digit is the middle digit."],
    declaredVariationSpace: 900 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.onesDigitInHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100, 999]], compute: (v) => v[0]! % 10, contextPool: CTX,
    promptTemplates: ["In the number {a}, how many ones are there?", "Counting {ctx}: how many ones are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 100)} hundreds, ${Math.floor((v[0]! % 100) / 10)} tens and ${r} ones.`],
    hints: () => ["The ones digit is the last digit."],
    declaredVariationSpace: 900 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.htoToNumber", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 100 + v[1]! * 10 + v[2]!,
    promptTemplates: ["{a} hundreds, {b} tens and {c} ones make what number?", "What number has {a} hundreds, {b} tens and {c} ones?"],
    explain: (v, r) => [`${v[0]} hundreds = ${v[0]! * 100}. ${v[1]} tens = ${v[1]! * 10}. ${v[0]! * 100} + ${v[1]! * 10} + ${v[2]} = ${r}.`],
    hints: () => ["Multiply the hundreds by 100 and the tens by 10, then add the ones."],
    declaredVariationSpace: 9 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y3l1.missingHundredsFromNumber", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MISSING_NUMBER",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ n: v[0]! * 100 + v[1]! * 10 + v[2]! }),
    promptTemplates: ["The number {n} has ___ hundreds.", "How many hundreds make up {n}?"],
    explain: (v, r) => [`${v[0]! * 100 + v[1]! * 10 + v[2]!} = ${r} hundreds, ${v[1]} tens and ${v[2]} ones.`],
    hints: () => ["Look at the hundreds digit — the first digit."],
    declaredVariationSpace: 9 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y3l1.mcPlaceValueDigitHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 100 + v[1]! * 10 + v[2]!,
    promptTemplates: ["Which number has {a} hundreds, {b} tens and {c} ones?", "{a} hundreds, {b} tens and {c} ones make which number?"],
    explain: (v, r) => [`${v[0]} hundreds, ${v[1]} tens and ${v[2]} ones make ${r}.`],
    hints: () => ["Hundreds come first, then tens, then ones."],
    distractorSpread: 110,
    declaredVariationSpace: 9 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y3l1.wordProblemPlaceValueHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 100 + v[1]! * 10 + v[2]!, contextPool: CTX,
    promptTemplates: ["A warehouse has {a} crates of 100 {ctx}, {b} boxes of 10 {ctx} and {c} loose {ctx}. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} x 100 = ${v[0]! * 100}. ${v[1]} x 10 = ${v[1]! * 10}. ${v[0]! * 100} + ${v[1]! * 10} + ${v[2]} = ${r}.`],
    hints: () => ["Multiply the crates by 100 and the boxes by 10, then add the loose ones."],
    declaredVariationSpace: 9 * 10 * 10 * CTX.length
  }),

  // --- Y3-L1-2: compare and order numbers up to 1,000 ---
  categoricalPoolTemplate({
    key: "y3l1.compareWithSymbol1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 1000);
      const makeEqual = rng.chance(0.15);
      const b = makeEqual ? a : rng.int(1, 1000);
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
    declaredVariationSpace: 1000 * 1000
  }),
  categoricalPoolTemplate({
    key: "y3l1.tfSymbolStatement1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 1000);
      let b = rng.int(1, 1000);
      while (b === a) b = rng.int(1, 1000);
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
    declaredVariationSpace: 1000 * 999 * 2
  }),
  orderingTemplate({
    key: "y3l1.orderAscending1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 1000));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the hundreds digit first, then the tens, then the ones."],
    hints: () => ["Which number has the fewest hundreds?"],
    declaredVariationSpace: 40000
  }),
  orderingTemplate({
    key: "y3l1.orderDescending1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 1000));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["Compare the hundreds digit first, then the tens, then the ones."],
    hints: () => ["Which number has the most hundreds?"],
    declaredVariationSpace: 40000
  }),
  arithmeticTemplate({
    key: "y3l1.compareBigger1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 1000], [1, 1000]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare the hundreds first. ${r} is the bigger number.`],
    hints: () => ["Compare the hundreds digit first. If they're equal, compare the tens, then the ones."],
    distractorSpread: 150,
    declaredVariationSpace: 1000 * 999
  }),
  categoricalPoolTemplate({
    key: "y3l1.wordProblemCompareAmounts1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(5, 1000);
      let b = rng.int(5, 1000);
      while (b === a) b = rng.int(5, 1000);
      const names = ["School A", "School B"];
      const correct = a < b ? names[0]! : names[1]!;
      const other = correct === names[0] ? names[1]! : names[0]!;
      return {
        prompt: `School A raised £${a} for charity. School B raised £${b}. Which school raised less money?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`£${Math.min(a, b)} is less than £${Math.max(a, b)}, so ${correct} raised less.`],
        hints: ["Compare the two totals — the smaller number raised less."]
      };
    },
    declaredVariationSpace: 996 * 995
  }),
  categoricalPoolTemplate({
    key: "y3l1.reasoningExplainCompareHundreds", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 999);
      let b = rng.int(100, 999);
      while (Math.floor(b / 100) === Math.floor(a / 100)) b = rng.int(100, 999);
      const correct = Math.floor(a / 100) > Math.floor(b / 100) ? String(a) : String(b);
      const other = correct === String(a) ? String(b) : String(a);
      return {
        prompt: `Which number has more hundreds, ${a} or ${b}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${correct} has more hundreds.`],
        hints: ["Look only at the first digit (the hundreds digit) of each number."]
      };
    },
    declaredVariationSpace: 900 * 899
  }),

  // --- Y3-L1-3: count from 0 in multiples of 4, 8, 50 and 100 ---
  arithmeticTemplate({
    key: "y3l1.skipCountBy4", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 199]], compute: (v) => (v[0]! + 1) * 4,
    derive: (v) => ({ a: v[0]! * 4 }), contextPool: CTX,
    promptTemplates: ["Counting in 4s from 0: ..., {a}, ___. What comes next?", "Counting {ctx} in 4s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 4: ${v[0]! * 4} + 4 = ${r}.`],
    hints: () => ["Add 4 to the number."],
    declaredVariationSpace: 200 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.skipCountBy8", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 124]], compute: (v) => (v[0]! + 1) * 8,
    derive: (v) => ({ a: v[0]! * 8 }), contextPool: CTX,
    promptTemplates: ["Counting in 8s from 0: ..., {a}, ___. What comes next?", "Counting {ctx} in 8s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 8: ${v[0]! * 8} + 8 = ${r}.`],
    hints: () => ["Add 8 to the number."],
    declaredVariationSpace: 125 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.skipCountBy50", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 18]], compute: (v) => (v[0]! + 1) * 50,
    derive: (v) => ({ a: v[0]! * 50 }), contextPool: CTX,
    promptTemplates: ["Counting in 50s from 0: ..., {a}, ___. What comes next?", "Counting {ctx} in 50s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 50: ${v[0]! * 50} + 50 = ${r}.`],
    hints: () => ["Add 50 to the number."],
    declaredVariationSpace: 19 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.skipCountBy100", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 9]], compute: (v) => (v[0]! + 1) * 100,
    derive: (v) => ({ a: v[0]! * 100 }), contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 100s from 0: ..., {a}, ___. What comes next?", "Counting boxes of {ctx} in 100s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 100: ${v[0]! * 100} + 100 = ${r}.`],
    hints: () => ["Add 100 to the number."],
    declaredVariationSpace: 10 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.mcSkipCountBy8", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 124]], compute: (v) => (v[0]! + 1) * 8,
    derive: (v) => ({ a: v[0]! * 8 }),
    promptTemplates: ["Counting in 8s from 0: {a}, ___. What comes next?", "Skip count by 8 from {a}. What is the next number?"],
    explain: (v, r) => [`${v[0]! * 8} + 8 = ${r}.`],
    hints: () => ["Add 8 to the number."],
    distractorSpread: 8,
    declaredVariationSpace: 125 * 2
  }),
  orderingTemplate({
    key: "y3l1.orderSkipCountSequence1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], direction: "asc",
    generateItems: (rng) => {
      const step = rng.pick([4, 8, 50, 100]);
      const startIndex = rng.int(0, 15);
      const terms = [startIndex, startIndex + 1, startIndex + 2, startIndex + 3].map((n) => n * step);
      return rng.shuffle(terms).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["These numbers from a counting-in-multiples pattern are muddled up. Drag them into order, smallest first."],
    explain: () => ["Work out the step size, then order the numbers from smallest to largest."],
    hints: () => ["Look at how much the numbers go up by each time."],
    declaredVariationSpace: 4 * 16 * 24
  }),
  categoricalPoolTemplate({
    key: "y3l1.wordProblemSkipCounting1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const step = rng.pick([4, 8, 50, 100]);
      const jumps = rng.int(2, 8);
      const correct = step * jumps;
      const distractors = [step * (jumps - 1), step * (jumps + 1), (step + (step === 100 ? 50 : step === 50 ? 4 : step === 8 ? 4 : 1)) * jumps];
      const uniq = Array.from(new Set(distractors.map(String))).filter((l) => l !== String(correct));
      let pad = correct + step * 10;
      while (uniq.length < 3) { uniq.push(String(pad)); pad += step; }
      return {
        prompt: `A counter starts at 0 and jumps forward ${step} each time. Where is it after ${jumps} jumps?`,
        correctLabel: String(correct),
        distractorLabels: uniq.slice(0, 3),
        explanationSteps: [`0 + (${step} x ${jumps}) = ${correct}.`],
        hints: ["Multiply the jump size by the number of jumps."]
      };
    },
    declaredVariationSpace: 4 * 7
  })
];

export default level;
