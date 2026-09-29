import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 4 — "Factors, multiples, primes, squares and cubes"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L4-1 factors/multiples, Y5-L4-2 primes
// up to 100, Y5-L4-3 square and cube numbers).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];
const CTX_FR = ["personnes", "arbres", "livres", "billets", "briques", "graines", "pièces", "étoiles"];

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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^(\d+) is a multiple of (\d+)\./);
        const a = match ? match[1]! : "";
        const base = match ? match[2]! : "";
        const truth = drawn.correctLabel === "True";
        return {
          prompt: `${a} est un multiple de ${base}.`,
          correctLabel: truth ? "Vrai" : "Faux",
          distractorLabels: [truth ? "Faux" : "Vrai"],
          explanationSteps: [truth ? `${a} ÷ ${base} = ${Number(a) / Number(base)}, sans reste, donc ${a} est un multiple de ${base}.` : `${a} ÷ ${base} laisse un reste, donc ${a} n'est pas un multiple de ${base}.`],
          hints: ["Un multiple d'un nombre est ce que l'on obtient en comptant par pas de ce nombre."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^(\d+) is a factor of (\d+)\./);
        const testValue = match ? match[1]! : "";
        const product = match ? match[2]! : "";
        const truth = drawn.correctLabel === "True";
        return {
          prompt: `${testValue} est un facteur de ${product}.`,
          correctLabel: truth ? "Vrai" : "Faux",
          distractorLabels: [truth ? "Faux" : "Vrai"],
          explanationSteps: [truth ? `${product} ÷ ${testValue} = ${Number(product) / Number(testValue)}, sans reste, donc ${testValue} est un facteur de ${product}.` : `${product} ne se divise pas exactement par ${testValue}, donc ce n'est pas un facteur.`],
          hints: ["Un facteur divise exactement un nombre, sans laisser de reste."]
        };
      }
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
    fr: {
      promptTemplates: ["Combien de facteurs {a} a-t-il (y compris 1 et {a} lui-même) ?", "Compte les facteurs de {a}, y compris 1 et {a} lui-même."],
      explain: (v, r) => [`En listant tous les nombres de 1 à ${v[0]} qui divisent exactement ${v[0]}, on obtient ${r} facteurs.`],
      hints: () => ["Vérifie chaque nombre entier de 1 jusqu'au nombre lui-même pour voir s'il divise exactement."]
    },
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
    fr: {
      promptTemplates: ["{a} x ___ = {product}. Quel est le facteur manquant ?", "Une paire de facteurs de {product} est {a} et ___. Quel est le facteur manquant ?"],
      explain: (v, r) => [`${v[0]! * r} ÷ ${v[0]} = ${r}, donc le facteur manquant est ${r}.`],
      hints: (v) => [`Divise le produit par ${v[0]} pour trouver l'autre facteur.`]
    },
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/multiple of (\d+)\?$/);
        const base = match ? match[1]! : "";
        const correct = drawn.correctLabel;
        return {
          prompt: `Lequel de ces nombres est un multiple de ${base} ?`,
          explanationSteps: [`${correct} ÷ ${base} = ${Number(correct) / Number(base)}, sans reste.`],
          hints: [`Vérifie quel nombre se divise exactement par ${base}.`]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/factor of (\d+)\?$/);
        const product = match ? match[1]! : "";
        const factor = drawn.correctLabel;
        return {
          prompt: `Lequel de ces nombres est un facteur de ${product} ?`,
          explanationSteps: [`${product} ÷ ${factor} = ${Number(product) / Number(factor)}, sans reste.`],
          hints: [`Vérifie quel nombre divise exactement ${product}.`]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/\d+/);
        const n = match ? match[0] : "";
        const truth = drawn.correctLabel === "True";
        const prompt = drawn.prompt.startsWith("The number") ? `Le nombre ${n} est premier.` : `${n} est un nombre premier.`;
        return {
          prompt,
          explanationSteps: [truth ? `${n} a exactement deux facteurs, 1 et ${n}, donc il est premier.` : `${n} a des facteurs autres que 1 et lui-même, donc il n'est pas premier.`],
          hints: ["Un nombre premier a exactement deux facteurs : 1 et lui-même."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/\d+/);
        const n = match ? match[0] : "";
        const truth = drawn.correctLabel === "True";
        const prompt = drawn.prompt.startsWith("The number") ? `Le nombre ${n} est composé.` : `${n} est un nombre composé (il a plus de deux facteurs).`;
        return {
          prompt,
          explanationSteps: [truth ? `${n} a des facteurs autres que 1 et lui-même, donc il est composé.` : `${n} a exactement deux facteurs, 1 et lui-même, donc il est premier, pas composé.`],
          hints: ["Un nombre composé a plus de deux facteurs ; un nombre premier en a exactement deux."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const prime = drawn.correctLabel;
        return {
          prompt: "Lequel de ces nombres est premier ?",
          explanationSteps: [`${prime} a exactement deux facteurs, 1 et ${prime}, donc c'est le nombre premier.`],
          hints: ["Un nombre premier a exactement deux facteurs : 1 et lui-même."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const composite = drawn.correctLabel;
        return {
          prompt: "Lequel de ces nombres N'est PAS premier ?",
          explanationSteps: [`${composite} a des facteurs autres que 1 et lui-même, donc il n'est pas premier.`],
          hints: ["Chaque autre nombre de la liste a exactement deux facteurs — trouve celui qui en a plus."]
        };
      }
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
    fr: {
      promptTemplates: ["Combien de nombres premiers y a-t-il de 1 jusqu'à {a} ?", "En comptant de 1 à {a}, combien de ces nombres sont premiers ?"],
      explain: (v, r) => [`En vérifiant chaque nombre de 2 à ${v[0]} pour exactement deux facteurs, on obtient ${r} nombres premiers.`],
      hints: () => ["N'oublie pas que 1 n'est pas premier — commence à vérifier à partir de 2."]
    },
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
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Que vaut {a} au carré (noté {a}²) ?", "{a}² = ?", "En comptant les {ctx} : que vaut {a} au carré ?"],
      explain: (v, r) => [`${v[0]} au carré signifie ${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["Élever un nombre au carré signifie le multiplier par lui-même."]
    },
    declaredVariationSpace: 20 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l4.cubeNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 20]], compute: (v) => v[0]! * v[0]! * v[0]!, contextPool: CTX,
    promptTemplates: ["What is {a} cubed (written {a}³)?", "{a}³ = ?", "Counting {ctx}: what is {a} cubed?"],
    explain: (v, r) => [`${v[0]} cubed means ${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Cubing a number means multiplying it by itself, then by itself again."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Que vaut {a} au cube (noté {a}³) ?", "{a}³ = ?", "En comptant les {ctx} : que vaut {a} au cube ?"],
      explain: (v, r) => [`${v[0]} au cube signifie ${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["Élever un nombre au cube signifie le multiplier par lui-même, puis encore par lui-même."]
    },
    declaredVariationSpace: 20 * 3 * CTX.length
  }),
  arithmeticTemplate({
    key: "y5l4.mcSquareNumber", levelKey: "Y5L4", objectiveCode: "Y5-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 25]], compute: (v) => v[0]! * v[0]!,
    promptTemplates: ["What is {a} squared?", "What is {a}²?"],
    explain: (v, r) => [`${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Multiply the number by itself."],
    fr: {
      promptTemplates: ["Que vaut {a} au carré ?", "Que vaut {a}² ?"],
      explain: (v, r) => [`${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["Multiplie le nombre par lui-même."]
    },
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
    fr: {
      promptTemplates: ["Que vaut {a} au cube ?", "Que vaut {a}³ ?"],
      explain: (v, r) => [`${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["Multiplie le nombre par lui-même, puis encore par lui-même."]
    },
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^(\d+)/);
        const n = match ? Number(match[1]) : 0;
        const root = Math.round(Math.sqrt(n));
        const truth = drawn.correctLabel === "True";
        return {
          prompt: `${n} est un nombre carré.`,
          explanationSteps: [truth ? `${root} x ${root} = ${n}, donc ${n} est un nombre carré.` : `Aucun nombre entier multiplié par lui-même ne donne ${n}, donc ce n'est pas un nombre carré.`],
          hints: ["Un nombre carré est ce que l'on obtient en multipliant un nombre entier par lui-même."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^(\d+)/);
        const n = match ? Number(match[1]) : 0;
        const root = Math.round(Math.cbrt(n));
        const truth = drawn.correctLabel === "True";
        return {
          prompt: `${n} est un nombre cube.`,
          explanationSteps: [truth ? `${root} x ${root} x ${root} = ${n}, donc ${n} est un nombre cube.` : `Aucun nombre entier au cube ne donne ${n}, donc ce n'est pas un nombre cube.`],
          hints: ["Un nombre cube est ce que l'on obtient en multipliant un nombre entier par lui-même, puis encore par lui-même."]
        };
      }
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
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["___² = {square}. Quel nombre, au carré, donne {square} ?", "En comptant les {ctx} : quel nombre au carré donne {square} ?"],
      explain: (v, r) => [`${r} x ${r} = ${r * r}, donc le nombre manquant est ${r}.`],
      hints: () => ["Pense à un nombre qui, multiplié par lui-même, donne le nombre cible."]
    },
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
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["___³ = {cube}. Quel nombre, au cube, donne {cube} ?", "En comptant les {ctx} : quel nombre au cube donne {cube} ?"],
      explain: (v, r) => [`${r} x ${r} x ${r} = ${r * r * r}, donc le nombre manquant est ${r}.`],
      hints: () => ["Pense à un nombre qui, multiplié deux fois par lui-même, donne le nombre cible."]
    },
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
    fr: {
      contextPool: ["jardin", "tapis", "carreau", "champ", "aire de jeux", "affiche", "cadre photo", "patio"],
      promptTemplates: ["Une surface carrée (par exemple : {ctx}) a des côtés de {a} m. Quelle est son aire ?"],
      explain: (v, r) => [`Aire d'un carré = côté x côté = ${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["L'aire d'un carré est la longueur du côté multipliée par elle-même."]
    },
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
    fr: {
      contextPool: ["boîte de rangement", "boîte cadeau", "caisse en bois", "conteneur", "bloc d'emballage", "coffre à jouets", "boîte en fer", "carton"],
      promptTemplates: ["Un objet cubique (par exemple : {ctx}) a des côtés de {a} cm. Quel est son volume ?"],
      explain: (v, r) => [`Volume d'un cube = côté x côté x côté = ${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["Le volume d'un cube est la longueur du côté multipliée deux fois par elle-même."]
    },
    declaredVariationSpace: 24 * 8
  })
];

export default level;
