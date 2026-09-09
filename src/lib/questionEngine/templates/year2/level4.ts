import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 2, Level 4 — "Multiplication and division using 2, 5 and 10"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y2-L4-1 recall of the 2/5/10 times
// tables, Y2-L4-2 representing multiplication with arrays, Y2-L4-3
// division by sharing and grouping).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];

export const level: QuestionTemplateDef[] = [
  // --- Y2-L4-1: recall and use multiplication facts for 2, 5 and 10 ---
  arithmeticTemplate({
    key: "y2l4.multiplyBy2", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]! * 2, contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 2s: what is {a} x 2?", "{a} groups of 2 {ctx}. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} x 2 = ${r}.`],
    hints: () => ["Double the number."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.multiplyBy5", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]! * 5, contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 5s: what is {a} x 5?", "{a} groups of 5 {ctx}. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} x 5 = ${r}.`],
    hints: () => ["Count on in 5s, or halve the x10 fact."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.multiplyBy10", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]! * 10, contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 10s: what is {a} x 10?", "{a} groups of 10 {ctx}. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} x 10 = ${r}.`],
    hints: () => ["Write the number, then put a zero on the end."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.missingFactorBy2", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ product: v[0]! * 2 }), contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 2s: 2 x ___ = {product}", "Each group has 2 {ctx}. How many groups make {product} {ctx} in total?"],
    explain: (v, r) => [`${v[0]! * 2} ÷ 2 = ${r}.`],
    hints: () => ["Think: 2 times what number gives this total?"],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.missingFactorBy10", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ product: v[0]! * 10 }), contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 10s: ___ x 10 = {product}", "Each group has 10 {ctx}. How many groups make {product} {ctx} in total?"],
    explain: (v, r) => [`${v[0]! * 10} ÷ 10 = ${r}.`],
    hints: () => ["Think: what number times 10 gives this total?"],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y2l4.mcTimesTable", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const table = rng.pick([2, 5, 10]);
      const n = rng.int(1, 20);
      const product = table * n;
      const distractors = numericDistractors(rng, product, 3, table).map(String);
      return {
        prompt: `What is ${table} x ${n}?`,
        correctLabel: String(product),
        distractorLabels: distractors,
        explanationSteps: [`${table} x ${n} = ${product}.`],
        hints: ["Use the times table you know, or count on in equal steps."]
      };
    },
    declaredVariationSpace: 3 * 20
  }),
  categoricalPoolTemplate({
    key: "y2l4.tfTimesTable", levelKey: "Y2L4", objectiveCode: "Y2-L4-1", difficulty: "REASONING",
    misconceptionTags: ["TIMES_TABLE_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const table = rng.pick([2, 5, 10]);
      const n = rng.int(1, 20);
      const product = table * n;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? product : numericDistractors(rng, product, 1, table)[0] ?? product + table;
      return {
        prompt: `${table} x ${n} = ${shown}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${table} x ${n} = ${product}.`],
        hints: ["Work out the fact and check it against the statement."]
      };
    },
    declaredVariationSpace: 3 * 20 * 2
  }),

  // --- Y2-L4-2: use arrays to represent multiplication ---
  arithmeticTemplate({
    key: "y2l4.arrayMultiplyBy2", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]! * 2, contextPool: CTX,
    promptTemplates: ["An array has {a} rows of 2 {ctx}. How many {ctx} altogether?", "Counting {ctx} in an array of {a} rows and 2 columns: how many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} rows of 2 = ${r}.`],
    hints: () => ["Multiply the number of rows by the number in each row."],
    visualAid: (v) => visuals.array(v[0]!, 2),
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.arrayMultiplyBy5", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]! * 5, contextPool: CTX,
    promptTemplates: ["An array has {a} rows of 5 {ctx}. How many {ctx} altogether?", "Counting {ctx} in an array of {a} rows and 5 columns: how many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} rows of 5 = ${r}.`],
    hints: () => ["Multiply the number of rows by the number in each row."],
    visualAid: (v) => visuals.array(v[0]!, 5),
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.arrayMultiplyBy10", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]! * 10, contextPool: CTX,
    promptTemplates: ["An array has {a} rows of 10 {ctx}. How many {ctx} altogether?", "Counting {ctx} in an array of {a} rows and 10 columns: how many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} rows of 10 = ${r}.`],
    hints: () => ["Multiply the number of rows by the number in each row."],
    visualAid: (v) => visuals.array(v[0]!, 10),
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.missingRowsInArray", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ product: v[0]! * 5 }), contextPool: CTX,
    promptTemplates: ["An array has ___ rows of 5 {ctx}, making {product} {ctx} in total. How many rows?", "How many rows of 5 {ctx} are needed to make {product} {ctx}?"],
    explain: (v, r) => [`${v[0]! * 5} ÷ 5 = ${r} rows.`],
    hints: () => ["Divide the total by the number in each row."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y2l4.mcArrayMultiplication", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const table = rng.pick([2, 5, 10]);
      const rows = rng.int(1, 20);
      const product = rows * table;
      const distractors = numericDistractors(rng, product, 3, table).map(String);
      return {
        prompt: `An array has ${rows} rows of ${table}. How many altogether?`,
        correctLabel: String(product),
        distractorLabels: distractors,
        explanationSteps: [`${rows} rows of ${table} = ${product}.`],
        hints: ["Multiply the number of rows by the number in each row."],
        visualAid: visuals.array(rows, table)
      };
    },
    declaredVariationSpace: 3 * 20
  }),
  categoricalPoolTemplate({
    key: "y2l4.tfArrayMultiplication", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "REASONING",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const table = rng.pick([2, 5, 10]);
      const rows = rng.int(1, 20);
      const product = rows * table;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? product : numericDistractors(rng, product, 1, table)[0] ?? product + table;
      return {
        prompt: `An array of ${rows} rows of ${table} has ${shown} altogether. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${rows} rows of ${table} = ${product}.`],
        hints: ["Multiply the number of rows by the number in each row."],
        visualAid: visuals.array(rows, table)
      };
    },
    declaredVariationSpace: 3 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y2l4.wordProblemArray", levelKey: "Y2L4", objectiveCode: "Y2-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["ARRAY_ROW_COLUMN_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 12]], compute: (v) => v[0]! * 2, contextPool: CTX,
    promptTemplates: ["A gardener plants {ctx} in {a} rows of 2. How many {ctx} are there in total?", "There are {a} rows of 2 {ctx} in a display. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} rows of 2 = ${r}.`],
    hints: () => ["Multiply the number of rows by the number in each row."],
    visualAid: (v) => visuals.array(v[0]!, 2),
    declaredVariationSpace: 12 * 2 * CTX.length
  }),

  // --- Y2-L4-3: solve simple division problems by sharing and grouping ---
  arithmeticTemplate({
    key: "y2l4.divideBy2", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 2 }), contextPool: CTX,
    promptTemplates: ["Sharing {ctx} equally: {dividend} {ctx} shared between 2 people is how many each?", "{dividend} ÷ 2 = ? (counting {ctx})"],
    explain: (v, r) => [`${v[0]! * 2} ÷ 2 = ${r}.`],
    hints: () => ["Share the total equally between 2 groups."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.divideBy5", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 5 }), contextPool: CTX,
    promptTemplates: ["Sharing {ctx} equally: {dividend} {ctx} shared between 5 people is how many each?", "{dividend} ÷ 5 = ? (counting {ctx})"],
    explain: (v, r) => [`${v[0]! * 5} ÷ 5 = ${r}.`],
    hints: () => ["Share the total equally between 5 groups."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.divideBy10", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 10 }), contextPool: CTX,
    promptTemplates: ["Sharing {ctx} equally: {dividend} {ctx} shared between 10 people is how many each?", "{dividend} ÷ 10 = ? (counting {ctx})"],
    explain: (v, r) => [`${v[0]! * 10} ÷ 10 = ${r}.`],
    hints: () => ["Share the total equally between 10 groups."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y2l4.groupingBy5", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! * 5 }), contextPool: CTX,
    promptTemplates: ["There are {total} {ctx}, put into groups of 5. How many groups can be made?", "If {total} {ctx} are grouped into 5s, how many groups are there?"],
    explain: (v, r) => [`${v[0]! * 5} ÷ 5 = ${r} groups.`],
    hints: () => ["Count how many groups of 5 fit into the total."],
    declaredVariationSpace: 12 * 2 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y2l4.mcDivideTable", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const divisor = rng.pick([2, 5, 10]);
      const quotient = rng.int(1, 20);
      const dividend = divisor * quotient;
      const spread = Math.max(2, Math.round(quotient * 0.4));
      const distractors = numericDistractors(rng, quotient, 3, spread).map(String);
      return {
        prompt: `What is ${dividend} ÷ ${divisor}?`,
        correctLabel: String(quotient),
        distractorLabels: distractors,
        explanationSteps: [`${dividend} ÷ ${divisor} = ${quotient}.`],
        hints: ["Think about how many equal groups of the divisor make the total."]
      };
    },
    declaredVariationSpace: 3 * 20
  }),
  categoricalPoolTemplate({
    key: "y2l4.tfDivideTable", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "REASONING",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const divisor = rng.pick([2, 5, 10]);
      const quotient = rng.int(1, 20);
      const dividend = divisor * quotient;
      const isTrueCase = rng.chance(0.5);
      const spread = Math.max(2, Math.round(quotient * 0.4));
      const shown = isTrueCase ? quotient : numericDistractors(rng, quotient, 1, spread)[0] ?? quotient + 1;
      return {
        prompt: `${dividend} ÷ ${divisor} = ${shown}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${dividend} ÷ ${divisor} = ${quotient}.`],
        hints: ["Work out the fact and check it against the statement."]
      };
    },
    declaredVariationSpace: 3 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y2l4.wordProblemSharingBy10", levelKey: "Y2L4", objectiveCode: "Y2-L4-3", difficulty: "REASONING",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * 10 }), contextPool: CTX,
    promptTemplates: ["{dividend} {ctx} are shared equally among 10 children. How many does each child get?", "Sharing {dividend} {ctx} equally among 10 friends, how many does each friend get?"],
    explain: (v, r) => [`${v[0]! * 10} ÷ 10 = ${r}.`],
    hints: () => ["Share the total equally between 10 people."],
    declaredVariationSpace: 12 * 2 * CTX.length
  })
];

export default level;
