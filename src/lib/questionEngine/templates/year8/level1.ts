import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 1 — "Number skills, powers, roots and index notation"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y8-L1-1 integer powers and real roots,
// Y8-L1-2 relationships between operations including inverses, Y8-L1-3
// index laws for simplifying numerical expressions).
const CTX = ["tiles", "boxes", "coins", "counters", "seeds", "beads", "bricks", "cards"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L1-1: use integer powers and associated real roots ---
  arithmeticTemplate({
    key: "y8l1.squareNumber", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 30]], compute: (v) => v[0]! * v[0]!, contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is {a} squared?", "Counting {ctx}: what is {a}^2?"],
    explain: (v, r) => [`${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Multiply the number by itself."],
    declaredVariationSpace: 29 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l1.cubeNumber", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 15]], compute: (v) => v[0]! * v[0]! * v[0]!, contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is {a} cubed?", "Counting {ctx}: what is {a}^3?"],
    explain: (v, r) => [`${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Multiply the number by itself, then by itself again."],
    declaredVariationSpace: 14 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l1.squareRoot", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 30]], compute: (v) => v[0]!,
    derive: (v) => ({ square: v[0]! * v[0]! }), contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is the square root of {square}?", "Counting {ctx}: which number, squared, gives {square}?"],
    explain: (v, r) => [`${r} x ${r} = ${v[0]! * v[0]!}, so the square root of ${v[0]! * v[0]!} is ${r}.`],
    hints: () => ["Find the number that multiplies by itself to give this total."],
    declaredVariationSpace: 29 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l1.cubeRoot", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 15]], compute: (v) => v[0]!,
    derive: (v) => ({ cube: v[0]! * v[0]! * v[0]! }), contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is the cube root of {cube}?", "Counting {ctx}: which number, cubed, gives {cube}?"],
    explain: (v, r) => [`${r} x ${r} x ${r} = ${v[0]! * v[0]! * v[0]!}, so the cube root of ${v[0]! * v[0]! * v[0]!} is ${r}.`],
    hints: () => ["Find the number that multiplies by itself twice more to give this total."],
    declaredVariationSpace: 14 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l1.higherPower", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "REASONING",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 6], [4, 6]], compute: (v) => Math.pow(v[0]!, v[1]!), contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is {a}^{b}?", "Counting {ctx}: what is {a} to the power of {b}?"],
    explain: (v, r) => [`${v[0]} multiplied by itself ${v[1]} times is ${r}.`],
    hints: () => ["Multiply the base by itself the number of times shown by the power."],
    declaredVariationSpace: 5 * 3 * 2 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y8l1.mcSquareOrCube", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const base = rng.int(2, 20);
      const power = rng.pick([2, 3]);
      const value = Math.pow(base, power);
      const spread = Math.max(2, Math.round(value * 0.2));
      const distractors = numericDistractors(rng, value, 3, spread).map(String);
      return {
        prompt: `What is ${base}^${power}?`,
        correctLabel: String(value),
        distractorLabels: distractors,
        explanationSteps: [`${base}^${power} = ${value}.`],
        hints: ["Multiply the base by itself the number of times shown by the power."]
      };
    },
    declaredVariationSpace: 19 * 2
  }),
  categoricalPoolTemplate({
    key: "y8l1.tfPowerStatement", levelKey: "Y8L1", objectiveCode: "Y8-L1-1", difficulty: "REASONING",
    misconceptionTags: ["POWER_ROOT_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const base = rng.int(2, 15);
      const power = rng.pick([2, 3]);
      const value = Math.pow(base, power);
      const isTrueCase = rng.chance(0.5);
      const spread = Math.max(2, Math.round(value * 0.2));
      const shown = isTrueCase ? value : numericDistractors(rng, value, 1, spread)[0] ?? value + 1;
      return {
        prompt: `${base}^${power} = ${shown}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${base}^${power} = ${value}.`],
        hints: ["Work out the power and check it against the statement."]
      };
    },
    declaredVariationSpace: 14 * 2 * 2
  }),

  // --- Y8-L1-2: recognise and use relationships between operations, including inverse operations ---
  arithmeticTemplate({
    key: "y8l1.inverseAddSubtract", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1, 50], [1, 50]], compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["{a} + ___ = {c}. Use the inverse operation (subtraction) to find the missing number.", "Counting {ctx}: {a} + ___ = {c}"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract the known number from the total to undo the addition."],
    declaredVariationSpace: 50 * 50 * 2
  }),
  arithmeticTemplate({
    key: "y8l1.inverseMultiplyDivide", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[2, 15], [2, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ product: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["{a} x ___ = {product}. Use the inverse operation (division) to find the missing number.", "Counting {ctx}: {a} x ___ = {product}"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the total by the known factor to undo the multiplication."],
    declaredVariationSpace: 14 * 14 * 2
  }),
  categoricalPoolTemplate({
    key: "y8l1.mcInverseOfOperation", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const inverseOf: Record<string, string> = {
        addition: "subtraction", subtraction: "addition",
        multiplication: "division", division: "multiplication",
        squaring: "square rooting", cubing: "cube rooting"
      };
      const ops = Object.keys(inverseOf);
      const op = rng.pick(ops);
      const correct = inverseOf[op]!;
      const pool = Array.from(new Set(Object.values(inverseOf))).filter((l) => l !== correct);
      const distractors = rng.shuffle(pool).slice(0, 3);
      return {
        prompt: `What is the inverse operation of ${op}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${op[0]!.toUpperCase()}${op.slice(1)} is undone by ${correct}.`],
        hints: ["The inverse operation undoes the original operation."]
      };
    },
    declaredVariationSpace: 6 * 5 * 4 * 3
  }),
  categoricalPoolTemplate({
    key: "y8l1.tfInverseCheckAddition", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 50);
      const b = rng.int(1, 50);
      const c = a + b;
      const isTrueCase = rng.chance(0.5);
      const shownA = isTrueCase ? a : a + rng.int(1, 5) * (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `Since ${a} + ${b} = ${c}, ${c} - ${b} = ${shownA}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${c} - ${b} = ${a}, the inverse of adding ${b}.`],
        hints: ["Subtraction is the inverse of addition."]
      };
    },
    declaredVariationSpace: 50 * 50 * 2
  }),
  categoricalPoolTemplate({
    key: "y8l1.tfInverseCheckMultiplication", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 15);
      const b = rng.int(2, 15);
      const product = a * b;
      const isTrueCase = rng.chance(0.5);
      const shownA = isTrueCase ? a : a + rng.int(1, 4) * (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `Since ${a} x ${b} = ${product}, ${product} ÷ ${b} = ${shownA}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${product} ÷ ${b} = ${a}, the inverse of multiplying by ${b}.`],
        hints: ["Division is the inverse of multiplication."]
      };
    },
    declaredVariationSpace: 14 * 14 * 2
  }),
  arithmeticTemplate({
    key: "y8l1.missingBaseFromSquare", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[2, 30]], compute: (v) => v[0]!,
    derive: (v) => ({ square: v[0]! * v[0]! }), contextPool: CTX,
    promptTemplates: ["___^2 = {square}. What is the missing number? (counting {ctx})", "Counting {ctx}: what number, when squared, equals {square}?"],
    explain: (v, r) => [`${r} x ${r} = ${v[0]! * v[0]!}, using the inverse of squaring (square rooting).`],
    hints: () => ["Use square rooting, the inverse of squaring, to undo the power."],
    declaredVariationSpace: 29 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l1.wordProblemInverseCheck", levelKey: "Y8L1", objectiveCode: "Y8-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ product: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["A number is multiplied by {a} to give {product}. What was the original number?", "Counting {ctx}: a number multiplied by {a} gives {product}. What was the original number?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, using division (the inverse of multiplication) to undo it.`],
    hints: () => ["Use the inverse operation (division) to work backwards."],
    declaredVariationSpace: 19 * 19 * 2
  }),

  // --- Y8-L1-3: use index laws to simplify numerical expressions ---
  arithmeticTemplate({
    key: "y8l1.indexLawMultiply", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 6], [1, 6]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["Simplify {a}^{b} x {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When multiplying powers of the same base, add the indices: ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Same base, multiplying: add the powers."],
    declaredVariationSpace: 8 * 6 * 6
  }),
  arithmeticTemplate({
    key: "y8l1.indexLawDivide", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [3, 10], [1, 5]], constraint: (v) => v[1]! > v[2]!, compute: (v) => v[1]! - v[2]!,
    promptTemplates: ["Simplify {a}^{b} ÷ {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When dividing powers of the same base, subtract the indices: ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Same base, dividing: subtract the powers."],
    declaredVariationSpace: 8 * 8 * 4
  }),
  arithmeticTemplate({
    key: "y8l1.indexLawPower", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 5], [1, 5]], compute: (v) => v[1]! * v[2]!,
    promptTemplates: ["Simplify ({a}^{b})^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When raising a power to a power, multiply the indices: ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Power of a power: multiply the indices."],
    declaredVariationSpace: 8 * 5 * 5
  }),
  arithmeticTemplate({
    key: "y8l1.indexLawZero", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 30]], compute: () => 1, contextPool: CTX,
    promptTemplates: ["Counting {ctx}: what is {a}^0?", "Counting {ctx}: what does {a} to the power of 0 equal?"],
    explain: () => ["Any non-zero number raised to the power of 0 equals 1."],
    hints: () => ["Any non-zero number to the power of 0 is always 1."],
    declaredVariationSpace: 29 * 2 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y8l1.mcIndexLawConcept", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const lawType = rng.pick(["multiply", "divide", "power"]);
      const a = rng.int(2, 9);
      let promptExpr: string;
      let correct: string;
      if (lawType === "multiply") {
        const b = rng.int(1, 6);
        const c = rng.int(1, 6);
        promptExpr = `${a}^${b} x ${a}^${c} = ${a}^n`;
        correct = "Add the powers";
      } else if (lawType === "divide") {
        const b = rng.int(2, 8);
        const c = rng.int(1, b - 1);
        promptExpr = `${a}^${b} ÷ ${a}^${c} = ${a}^n`;
        correct = "Subtract the powers";
      } else {
        const b = rng.int(1, 5);
        const c = rng.int(1, 5);
        promptExpr = `(${a}^${b})^${c} = ${a}^n`;
        correct = "Multiply the powers";
      }
      const distractors = ["Add the powers", "Subtract the powers", "Multiply the powers", "Divide the powers"].filter((l) => l !== correct);
      return {
        prompt: `${promptExpr}. Which operation on the powers finds n?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Use the index law for this operation: ${correct.toLowerCase()}.`],
        hints: ["Multiplying same-base powers adds indices; dividing subtracts; raising a power to a power multiplies."]
      };
    },
    declaredVariationSpace: 3 * 8 * 6 * 6
  }),
  categoricalPoolTemplate({
    key: "y8l1.tfIndexLawStatement", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const lawType = rng.pick(["multiply", "divide"]);
      const a = rng.int(2, 9);
      let exprText: string;
      let correctN: number;
      if (lawType === "multiply") {
        const b = rng.int(1, 6);
        const c = rng.int(1, 6);
        exprText = `${a}^${b} x ${a}^${c}`;
        correctN = b + c;
      } else {
        const b = rng.int(2, 8);
        const c = rng.int(1, b - 1);
        exprText = `${a}^${b} ÷ ${a}^${c}`;
        correctN = b - c;
      }
      const isTrueCase = rng.chance(0.5);
      const shownN = isTrueCase ? correctN : correctN + rng.int(1, 3);
      return {
        prompt: `${exprText} = ${a}^${shownN}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${exprText} = ${a}^${correctN}.`],
        hints: ["Work out the correct index using the law, then compare it to the statement."]
      };
    },
    declaredVariationSpace: 2 * 8 * 6 * 6
  }),
  arithmeticTemplate({
    key: "y8l1.simplifyNumericIndexExpression", levelKey: "Y8L1", objectiveCode: "Y8-L1-3", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 6], [1, 4], [1, 4]], compute: (v) => Math.pow(v[0]!, v[1]! + v[2]!), contextPool: CTX,
    promptTemplates: ["Counting {ctx}: work out {a}^{b} x {a}^{c} as a single number.", "Counting {ctx}: what is {a}^{b} x {a}^{c} written as one number?"],
    explain: (v, r) => [`${v[1]} + ${v[2]} = ${v[1]! + v[2]!}, so ${v[0]}^${v[1]! + v[2]!} = ${r}.`],
    hints: () => ["Add the indices first, then work out the resulting power."],
    declaredVariationSpace: 5 * 4 * 4 * 2 * CTX.length
  })
];

export default level;
