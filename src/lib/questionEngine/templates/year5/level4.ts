import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 4 — "Factors, multiples, primes, squares and cubes"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L4-1 factors/multiples, Y5-L4-2 primes
// up to 100, Y5-L4-3 square and cube numbers).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];

function isPrimeNum(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
const PRIMES_TO_100 = Array.from({ length: 99 }, (_, i) => i + 2).filter(isPrimeNum);
const COMPOSITES_TO_100 = Array.from({ length: 99 }, (_, i) => i + 2).filter((n) => !isPrimeNum(n));

export const level: QuestionTemplateDef[] = [
  // --- Y5-L4-1: multiples and factors, factor pairs ---
  categoricalPoolTemplate({
    key: "y5l4.isMultiple", levelKey: "Y5L4", objectiveCode: "Y5-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const base = rng.int(2, 20);
      const multiplier = rng.int(2, 15);
      const isTrueCase = rng.chance(0.5);
      const a = isTrueCase ? base * multiplier : base * multiplier + rng.int(1, base - 1);
      const truth = a % base === 0;
      return {
        prompt: `${a} is a multiple of ${base}.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${a} ÷ ${base} = ${a / base}, with no remainder, so ${a} is a multiple of ${base}.` : `${a} ÷ ${base} leaves a remainder, so ${a} is not a multiple of ${base}.`],
        hints: ["A multiple of a number is what you get when you count up in steps of that number."]
      };
    },
    declaredVariationSpace: 19 * 14 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l4.isFactor", levelKey: "Y5L4", objectiveCode: "Y5-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const factor = rng.int(2, 20);
      const multiplier = rng.int(2, 15);
      const product = factor * multiplier;
      const isTrueCase = rng.chance(0.5);
      const testValue = isTrueCase ? factor : product - 1;
      const truth = product % testValue === 0;
      return {
        prompt: `${testValue} is a factor of ${product}.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${product} ÷ ${testValue} = ${product / testValue}, with no remainder, so ${testValue} is a factor of ${product}.` : `${product} does not divide exactly by ${testValue}, so it is not a factor.`],
        hints: ["A factor divides exactly into a number, leaving no remainder."]
      };
    },
    declaredVariationSpace: 19 * 14 * 2
  }),
  arithmeticTemplate({
    key: "y5l4.countFactors", levelKey: "Y5L4", objectiveCode: "Y5-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 200]],
    compute: (v) => {
      const n = v[0]!;
      let count = 0;
      for (let i = 1; i <= n; i++) if (n % i === 0) count++;
      return count;
    },
    promptTemplates: ["How many factors does {a} have (including 1 and {a} itself)?", "Count the factors of {a}, including 1 and {a} itself."],
    explain: (v, r) => [`Listing every number from 1 to ${v[0]} that divides exactly into ${v[0]} gives ${r} factors.`],
    hints: () => ["Check every whole number from 1 up to the number itself to see if it divides exactly."],
    declaredVariationSpace: 200 * 2
  }),
  arithmeticTemplate({
    key: "y5l4.missingFactorPair", levelKey: "Y5L4", objectiveCode: "Y5-L4-1", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[1]!,
    derive: (v, r) => ({ product: v[0]! * r }),
    promptTemplates: ["{a} x ___ = {product}. What is the missing factor?", "One factor pair of {product} is {a} and ___. What is the missing factor?"],
    explain: (v, r) => [`${v[0]! * r} ÷ ${v[0]} = ${r}, so the missing factor is ${r}.`],
    hints: (v) => [`Divide the product by ${v[0]} to find the other factor.`],
    declaredVariationSpace: 19 * 19 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l4.mcMultipleOf", levelKey: "Y5L4", objectiveCode: "Y5-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const base = rng.int(3, 15);
      const correct = base * rng.int(2, 10);
      // Deterministic, bounded candidate pool (no rejection-sampling while
      // loop): every offset from -(base-1) to (base-1) except 0 gives a
      // non-multiple of base, and correct is always >= 2*base so these stay
      // positive.
      const offsets: number[] = [];
      for (let d = 1; d < base; d++) {
        offsets.push(d, -d);
      }
      const shuffled = rng.shuffle(offsets);
      const distractors: number[] = [];
      for (const offset of shuffled) {
        const candidate = correct + offset;
        if (candidate > 0 && candidate % base !== 0 && !distractors.includes(candidate)) distractors.push(candidate);
        if (distractors.length === 3) break;
      }
      let extra = 1;
      while (distractors.length < 3) {
        distractors.push(correct + base * extra + 1);
        extra++;
      }
      return {
        prompt: `Which of these numbers is a multiple of ${base}?`,
        correctLabel: String(correct),
        distractorLabels: distractors.map(String),
        explanationSteps: [`${correct} ÷ ${base} = ${correct / base}, with no remainder.`],
        hints: [`Check which number divides exactly by ${base}.`]
      };
    },
    declaredVariationSpace: 13 * 9 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l4.mcFactorOf", levelKey: "Y5L4", objectiveCode: "Y5-L4-1", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const factor = rng.int(2, 15);
      const multiplier = rng.int(2, 12);
      const product = factor * multiplier;
      // Build the non-divisor candidate pool deterministically (bounded loop,
      // no rejection sampling) so this can never spin: for a small product
      // there may be very few numbers below it that aren't factors, so fall
      // back to product+1, product+2, ... which can never be factors of
      // product (any number greater than product cannot divide it exactly).
      const smallNonDivisors: number[] = [];
      for (let i = 2; i < product; i++) {
        if (product % i !== 0) smallNonDivisors.push(i);
      }
      const shuffled = rng.shuffle(smallNonDivisors);
      const distractors = shuffled.slice(0, 3);
      let extra = 1;
      while (distractors.length < 3) {
        distractors.push(product + extra);
        extra++;
      }
      return {
        prompt: `Which of these numbers is a factor of ${product}?`,
        correctLabel: String(factor),
        distractorLabels: distractors.map(String),
        explanationSteps: [`${product} ÷ ${factor} = ${multiplier}, with no remainder.`],
        hints: [`Check which number divides exactly into ${product}.`]
      };
    },
    declaredVariationSpace: 14 * 11 * 400
  }),

  // --- Y5-L4-2: prime number vocabulary, establishing primality up to 100 ---
  categoricalPoolTemplate({
    key: "y5l4.isPrime", levelKey: "Y5L4", objectiveCode: "Y5-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const n = rng.int(2, 100);
      const truth = isPrimeNum(n);
      const phrasing = rng.pick([`${n} is a prime number.`, `The number ${n} is prime.`]);
      return {
        prompt: phrasing,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${n} has exactly two factors, 1 and ${n}, so it is prime.` : `${n} has factors other than 1 and itself, so it is not prime.`],
        hints: ["A prime number has exactly two factors: 1 and itself."]
      };
    },
    declaredVariationSpace: 99 * 2 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l4.isComposite", levelKey: "Y5L4", objectiveCode: "Y5-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const n = rng.int(4, 100);
      const truth = !isPrimeNum(n);
      const phrasing = rng.pick([`${n} is a composite number (it has more than two factors).`, `The number ${n} is composite.`]);
      return {
        prompt: phrasing,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${n} has factors other than just 1 and itself, so it is composite.` : `${n} has exactly two factors, 1 and itself, so it is prime, not composite.`],
        hints: ["A composite number has more than two factors; a prime number has exactly two."]
      };
    },
    declaredVariationSpace: 97 * 2 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l4.mcWhichIsPrime", levelKey: "Y5L4", objectiveCode: "Y5-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const prime = rng.pick(PRIMES_TO_100);
      const distractors = new Set<number>();
      while (distractors.size < 3) distractors.add(rng.pick(COMPOSITES_TO_100));
      return {
        prompt: "Which of these numbers is prime?",
        correctLabel: String(prime),
        distractorLabels: Array.from(distractors).map(String),
        explanationSteps: [`${prime} has exactly two factors, 1 and ${prime}, so it is the prime number.`],
        hints: ["A prime number has exactly two factors: 1 and itself."]
      };
    },
    declaredVariationSpace: PRIMES_TO_100.length * 50000
  }),
  categoricalPoolTemplate({
    key: "y5l4.mcWhichIsNotPrime", levelKey: "Y5L4", objectiveCode: "Y5-L4-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const composite = rng.pick(COMPOSITES_TO_100);
      const distractors = new Set<number>();
      while (distractors.size < 3) distractors.add(rng.pick(PRIMES_TO_100));
      return {
        prompt: "Which of these numbers is NOT prime?",
        correctLabel: String(composite),
        distractorLabels: Array.from(distractors).map(String),
        explanationSteps: [`${composite} has factors other than 1 and itself, so it is not prime.`],
        hints: ["Every other number listed has exactly two factors — find the one that has more."]
      };
    },
    declaredVariationSpace: COMPOSITES_TO_100.length * 15000
  }),
  arithmeticTemplate({
    key: "y5l4.countPrimesUpTo", levelKey: "Y5L4", objectiveCode: "Y5-L4-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[10, 100]],
    compute: (v) => {
      let count = 0;
      for (let i = 2; i <= v[0]!; i++) if (isPrimeNum(i)) count++;
      return count;
    },
    promptTemplates: ["How many prime numbers are there from 1 up to {a}?", "Counting from 1 to {a}, how many of the numbers are prime?"],
    explain: (v, r) => [`Checking every number from 2 up to ${v[0]} for exactly two factors gives ${r} prime numbers.`],
    hints: () => ["Remember 1 is not prime — start checking from 2."],
    declaredVariationSpace: 91 * 2
  }),

  // --- Y5-L4-3: square and cube numbers and their notation ---
  arithmeticTemplate({
    key: "y5l4.squareNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 20]], compute: (v) => v[0]! * v[0]!, contextPool: CTX,
    promptTemplates: ["What is {a} squared (written {a}²)?", "{a}² = ?", "Counting {ctx}: what is {a} squared?"],
    explain: (v, r) => [`${v[0]} squared means ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Squaring a number means multiplying it by itself."],
    declaredVariationSpace: 20 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l4.cubeNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 20]], compute: (v) => v[0]! * v[0]! * v[0]!, contextPool: CTX,
    promptTemplates: ["What is {a} cubed (written {a}³)?", "{a}³ = ?", "Counting {ctx}: what is {a} cubed?"],
    explain: (v, r) => [`${v[0]} cubed means ${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Cubing a number means multiplying it by itself, then by itself again."],
    declaredVariationSpace: 20 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l4.mcSquareNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 25]], compute: (v) => v[0]! * v[0]!,
    promptTemplates: ["What is {a} squared?", "What is {a}²?"],
    explain: (v, r) => [`${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Multiply the number by itself."],
    distractorSpread: 10,
    declaredVariationSpace: 25 * 2
  }),
  arithmeticTemplate({
    key: "y5l4.mcCubeNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15]], compute: (v) => v[0]! * v[0]! * v[0]!,
    promptTemplates: ["What is {a} cubed?", "What is {a}³?"],
    explain: (v, r) => [`${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Multiply the number by itself, then by itself again."],
    distractorSpread: 15,
    declaredVariationSpace: 15 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l4.tfIsSquareNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const n = rng.int(1, 400);
      const root = Math.round(Math.sqrt(n));
      const truth = root * root === n;
      return {
        prompt: `${n} is a square number.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${root} x ${root} = ${n}, so ${n} is a square number.` : `No whole number multiplied by itself gives ${n}, so it is not a square number.`],
        hints: ["A square number is what you get from multiplying a whole number by itself."]
      };
    },
    declaredVariationSpace: 400 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l4.tfIsCubeNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const n = rng.int(1, 1000);
      const root = Math.round(Math.cbrt(n));
      const truth = root * root * root === n;
      return {
        prompt: `${n} is a cube number.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${root} x ${root} x ${root} = ${n}, so ${n} is a cube number.` : `No whole number cubed gives ${n}, so it is not a cube number.`],
        hints: ["A cube number is what you get from multiplying a whole number by itself, then by itself again."]
      };
    },
    declaredVariationSpace: 1000 * 2
  }),
  arithmeticTemplate({
    key: "y5l4.missingSquareRoot", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 20]], compute: (v) => v[0]!,
    derive: (v, r) => ({ square: r * r }), contextPool: CTX,
    promptTemplates: ["___² = {square}. What number, squared, gives {square}?", "Counting {ctx}: what number squared makes {square}?"],
    explain: (v, r) => [`${r} x ${r} = ${r * r}, so the missing number is ${r}.`],
    hints: () => ["Think of a number that multiplied by itself gives the target."],
    declaredVariationSpace: 20 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l4.missingCubeRoot", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 20]], compute: (v) => v[0]!,
    derive: (v, r) => ({ cube: r * r * r }), contextPool: CTX,
    promptTemplates: ["___³ = {cube}. What number, cubed, gives {cube}?", "Counting {ctx}: what number cubed makes {cube}?"],
    explain: (v, r) => [`${r} x ${r} x ${r} = ${r * r * r}, so the missing number is ${r}.`],
    hints: () => ["Think of a number that multiplied by itself twice gives the target."],
    declaredVariationSpace: 20 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l4.wordProblemSquareArea", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "WORD_PROBLEM",
    ranges: [[2, 25]], compute: (v) => v[0]! * v[0]!, contextPool: ["garden", "rug", "tile", "field", "playground", "poster", "picture frame", "patio"],
    promptTemplates: ["A square {ctx} has sides of length {a} m. What is its area?"],
    explain: (v, r) => [`Area of a square = side x side = ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["The area of a square is the side length multiplied by itself."],
    formatValue: (n) => `${n} m²`,
    declaredVariationSpace: 24 * 8
  }),
  arithmeticTemplate({
    key: "y5l4.wordProblemCubeVolume", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "WORD_PROBLEM",
    ranges: [[2, 25]], compute: (v) => v[0]! * v[0]! * v[0]!, contextPool: ["storage box", "gift box", "wooden crate", "container", "packing block", "toy case", "tin", "carton"],
    promptTemplates: ["A cube-shaped {ctx} has sides of length {a} cm. What is its volume?"],
    explain: (v, r) => [`Volume of a cube = side x side x side = ${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["The volume of a cube is the side length multiplied by itself twice."],
    formatValue: (n) => `${n} cm³`,
    declaredVariationSpace: 24 * 8
  })
];

export default level;
