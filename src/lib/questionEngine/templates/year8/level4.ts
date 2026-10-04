import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 4 — "Expanding and factorising algebraic expressions"
const BASES = [2, 3, 5, 7, 10];
const LETTERS = ["x", "y", "a", "n", "p", "t"];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y8-L4-1: expanding single brackets ---
  arithmeticTemplate({
    key: "y8l4.expandConstantTerm", levelKey: "Y8L4", objectiveCode: "Y8-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [1, 25], [0, LETTERS.length - 1]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ ltr: LETTERS[v[2]!]! }),
    promptTemplates: [
      "Expand {a}({ltr} + {b}). What is the constant term?",
      "{a}({ltr} + {b}) = {a}{ltr} + k. What is k?"
    ],
    explain: (v, r) => [`Multiply both terms inside by ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["The number outside multiplies everything inside, not just the first term."],
    fr: {
      promptTemplates: [
        "Développe {a}({ltr} + {b}). Quel est le terme constant ?",
        "{a}({ltr} + {b}) = {a}{ltr} + k. Que vaut k ?"
      ],
      explain: (v, r) => [`Multiplie les deux termes intérieurs par ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Le nombre extérieur multiplie tout ce qui est à l'intérieur, pas seulement le premier terme."]
    },
    declaredVariationSpace: 14 * 25 * LETTERS.length * 2
  }),
  arithmeticTemplate({
    key: "y8l4.expandCoefficient", levelKey: "Y8L4", objectiveCode: "Y8-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [2, 15], [1, 25]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Expand {a}({b}x + {c}). What is the coefficient of x?",
      "{a}({b}x + {c}) = kx + {d}. What is k?",
      "Multiply out {a}({b}x + {c}) and state the number in front of x."
    ],
    derive: (v) => ({ d: v[0]! * v[2]! }),
    explain: (v, r) => [`The x term is ${v[0]} x ${v[1]}x.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the number outside by the number in front of x."],
    fr: {
      promptTemplates: [
        "Développe {a}({b}x + {c}). Quel est le coefficient de x ?",
        "{a}({b}x + {c}) = kx + {d}. Que vaut k ?",
        "Développe {a}({b}x + {c}) et donne le nombre devant x."
      ],
      explain: (v, r) => [`Le terme en x est ${v[0]} x ${v[1]}x.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie le nombre extérieur par le nombre devant x."]
    },
    declaredVariationSpace: 14 * 14 * 25
  }),
  arithmeticTemplate({
    key: "y8l4.expandAndSimplify", levelKey: "Y8L4", objectiveCode: "Y8-L4-1", difficulty: "REASONING",
    misconceptionTags: ["EXPANSION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 15], [2, 12], [1, 15]], compute: (v) => v[0]! * v[1]! + v[2]! * v[3]!,
    promptTemplates: [
      "Expand and simplify {a}(x + {b}) + {c}(x + {d}). What is the constant term?",
      "{a}(x + {b}) + {c}(x + {d}) simplifies to kx + m. What is m?"
    ],
    explain: (v, r) => [
      `The first bracket gives ${v[0]! * v[1]!} and the second gives ${v[2]! * v[3]!}.`,
      `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`
    ],
    hints: () => ["Expand each bracket separately, then collect the numbers that have no x."],
    fr: {
      promptTemplates: [
        "Développe et réduis {a}(x + {b}) + {c}(x + {d}). Quel est le terme constant ?",
        "{a}(x + {b}) + {c}(x + {d}) se réduit à kx + m. Que vaut m ?"
      ],
      explain: (v, r) => [
        `La première parenthèse donne ${v[0]! * v[1]!} et la seconde ${v[2]! * v[3]!}.`,
        `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`
      ],
      hints: () => ["Développe chaque parenthèse séparément, puis regroupe les nombres sans x."]
    },
    declaredVariationSpace: 11 * 15 * 11 * 15
  }),
  arithmeticTemplate({
    key: "y8l4.expandNegativeBracket", levelKey: "Y8L4", objectiveCode: "Y8-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 15], [1, 25]], compute: (v) => -(v[0]! * v[1]!),
    promptTemplates: [
      "Expand {a}(x - {b}). What is the constant term, including its sign?",
      "{a}(x - {b}) = {a}x + k. What is k, including its sign?"
    ],
    explain: (v, r) => [`${v[0]} multiplied by -${v[1]} gives ${r}.`, `A positive times a negative is negative.`],
    hints: () => ["Keep the minus sign attached to the second term when you multiply."],
    fr: {
      promptTemplates: [
        "Développe {a}(x - {b}). Quel est le terme constant, signe compris ?",
        "{a}(x - {b}) = {a}x + k. Que vaut k, signe compris ?"
      ],
      explain: (v, r) => [`${v[0]} multiplié par -${v[1]} donne ${r}.`, `Un positif fois un négatif donne un négatif.`],
      hints: () => ["Garde le signe moins attaché au second terme quand tu multiplies."]
    },
    declaredVariationSpace: 14 * 25 * 2
  }),
  arithmeticTemplate({
    key: "y8l4.areaAsExpandedExpression", levelKey: "Y8L4", objectiveCode: "Y8-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPANSION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 15], [1, 20], [1, 15]], compute: (v) => v[0]! * v[2]! + v[0]! * v[1]!,
    promptTemplates: [
      "A rectangle has width {a} cm and length (x + {b}) cm. When x = {c}, what is its area, in cm²?",
      "The area of a rectangle is {a}(x + {b}) cm². Find the area when x = {c}, in cm²."
    ],
    explain: (v, r) => [
      `Expanding gives ${v[0]}x + ${v[0]! * v[1]!}.`,
      `With x = ${v[2]}: ${v[0]! * v[2]!} + ${v[0]! * v[1]!} = ${r} cm².`
    ],
    hints: () => ["Expand the bracket first, then substitute — or substitute first and work inside the bracket. Both give the same answer."],
    fr: {
      promptTemplates: [
        "Un rectangle a une largeur de {a} cm et une longueur de (x + {b}) cm. Quand x = {c}, quelle est son aire, en cm² ?",
        "L'aire d'un rectangle est {a}(x + {b}) cm². Trouve l'aire quand x = {c}, en cm²."
      ],
      explain: (v, r) => [
        `Le développement donne ${v[0]}x + ${v[0]! * v[1]!}.`,
        `Avec x = ${v[2]} : ${v[0]! * v[2]!} + ${v[0]! * v[1]!} = ${r} cm².`
      ],
      hints: () => ["Développe d'abord la parenthèse puis remplace — ou remplace d'abord et calcule dans la parenthèse. Les deux donnent le même résultat."]
    },
    declaredVariationSpace: 14 * 20 * 15
  }),

  // --- Y8-L4-2: factorising by taking out common factors ---
  arithmeticTemplate({
    key: "y8l4.highestCommonFactor", levelKey: "Y8L4", objectiveCode: "Y8-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 15], [2, 15]], constraint: (v) => gcd(v[1]!, v[2]!) === 1 && v[1]! !== v[2]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ t1: v[0]! * v[1]!, t2: v[0]! * v[2]! }),
    promptTemplates: [
      "Factorise {t1}x + {t2}. What is the highest common factor taken outside the bracket?",
      "{t1}x + {t2} = k(...). What is k?"
    ],
    explain: (v, r) => [`The highest common factor of ${v[0]! * v[1]!} and ${v[0]! * v[2]!} is ${r}.`, `${v[0]! * v[1]!}x + ${v[0]! * v[2]!} = ${r}(${v[1]}x + ${v[2]}).`],
    hints: () => ["Find the biggest number that divides exactly into both terms."],
    fr: {
      promptTemplates: [
        "Factorise {t1}x + {t2}. Quel est le plus grand facteur commun sorti de la parenthèse ?",
        "{t1}x + {t2} = k(...). Que vaut k ?"
      ],
      explain: (v, r) => [`Le plus grand facteur commun de ${v[0]! * v[1]!} et ${v[0]! * v[2]!} est ${r}.`, `${v[0]! * v[1]!}x + ${v[0]! * v[2]!} = ${r}(${v[1]}x + ${v[2]}).`],
      hints: () => ["Trouve le plus grand nombre qui divise exactement les deux termes."]
    },
    declaredVariationSpace: 11 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y8l4.factoriseInsideBracket", levelKey: "Y8L4", objectiveCode: "Y8-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 18], [2, 18]], constraint: (v) => gcd(v[1]!, v[2]!) === 1 && v[1]! !== v[2]!,
    compute: (v) => v[2]!,
    derive: (v) => ({ t1: v[0]! * v[1]!, t2: v[0]! * v[2]!, hcf: v[0]! }),
    promptTemplates: [
      "{t1}x + {t2} factorises as {hcf}({b}x + k). What is k?",
      "Factorise {t1}x + {t2} fully. What is the constant left inside the bracket?"
    ],
    explain: (v, r) => [`Divide both terms by ${v[0]}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["After taking the common factor out, divide each original term by it to see what stays inside."],
    fr: {
      promptTemplates: [
        "{t1}x + {t2} se factorise en {hcf}({b}x + k). Que vaut k ?",
        "Factorise complètement {t1}x + {t2}. Quelle constante reste dans la parenthèse ?"
      ],
      explain: (v, r) => [`Divise les deux termes par ${v[0]}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Après avoir sorti le facteur commun, divise chaque terme d'origine par lui pour voir ce qui reste à l'intérieur."]
    },
    declaredVariationSpace: 11 * 17 * 17
  }),
  arithmeticTemplate({
    key: "y8l4.factoriseWithLetterFactor", levelKey: "Y8L4", objectiveCode: "Y8-L4-2", difficulty: "REASONING",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 18], [2, 18]], constraint: (v) => gcd(v[1]!, v[2]!) === 1 && v[1]! !== v[2]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ t1: v[0]! * v[1]!, t2: v[0]! * v[2]! }),
    promptTemplates: [
      "{t1}x² + {t2}x factorises as kx(...). What is the number k?",
      "Take out the common factor of {t1}x² and {t2}x. What is the number in front of the x outside the bracket?"
    ],
    explain: (v, r) => [
      `Both terms share a factor of ${v[0]} and a factor of x.`,
      `${v[0]! * v[1]!}x² + ${v[0]! * v[2]!}x = ${r}x(${v[1]}x + ${v[2]}).`
    ],
    hints: () => ["Look for a common letter as well as a common number — every term here has at least one x."],
    fr: {
      promptTemplates: [
        "{t1}x² + {t2}x se factorise en kx(...). Quel est le nombre k ?",
        "Sors le facteur commun de {t1}x² et {t2}x. Quel est le nombre devant le x à l'extérieur de la parenthèse ?"
      ],
      explain: (v, r) => [
        `Les deux termes ont en commun un facteur ${v[0]} et un facteur x.`,
        `${v[0]! * v[1]!}x² + ${v[0]! * v[2]!}x = ${r}x(${v[1]}x + ${v[2]}).`
      ],
      hints: () => ["Cherche une lettre commune en plus d'un nombre commun — ici chaque terme contient au moins un x."]
    },
    declaredVariationSpace: 11 * 17 * 17
  }),
  categoricalPoolTemplate({
    key: "y8l4.mcFullyFactorised", levelKey: "Y8L4", objectiveCode: "Y8-L4-2", difficulty: "REASONING",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const hcf = rng.int(2, 9);
      const p = rng.int(2, 15);
      const q = rng.int(2, 15);
      const t1 = hcf * p;
      const t2 = hcf * q;
      const correct = `${hcf}(${p}x + ${q})`;
      const wrong = [`${hcf}(${t1}x + ${t2})`, `${t1}(x + ${q})`, `x(${t1} + ${t2})`];
      return {
        prompt: `Which of these is ${t1}x + ${t2} factorised with the highest common factor outside?`,
        correctLabel: correct,
        distractorLabels: wrong.filter((w) => w !== correct).slice(0, 3),
        explanationSteps: [`${hcf} divides both ${t1} and ${t2}, leaving ${p}x and ${q} inside.`, `Check by expanding: ${hcf} x ${p} = ${t1} and ${hcf} x ${q} = ${t2}.`],
        hints: ["Expand each option — only the correct one multiplies back to the original expression."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which of these is (.+) factorised with the highest common factor outside\?$/);
        if (!m) return {};
        return {
          prompt: `Laquelle de ces expressions est ${m[1]} factorisée avec le plus grand facteur commun à l'extérieur ?`,
          hints: ["Développe chaque option — seule la bonne redonne l'expression d'origine."]
        };
      }
    },
    declaredVariationSpace: 8 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y8l4.checkFactorisationByExpanding", levelKey: "Y8L4", objectiveCode: "Y8-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 18], [2, 18]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Check a factorisation by expanding: what is the x coefficient of {a}({b}x + {c})?",
      "Expand {a}({b}x + {c}) to check a factorisation. What number multiplies x?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]}x = ${r}x.`, `If that matches the original expression, the factorisation is right.`],
    hints: () => ["Expanding is always the quickest way to check a factorisation."],
    fr: {
      promptTemplates: [
        "Vérifie une factorisation en développant : quel est le coefficient de x dans {a}({b}x + {c}) ?",
        "Développe {a}({b}x + {c}) pour vérifier une factorisation. Quel nombre multiplie x ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]}x = ${r}x.`, `Si cela correspond à l'expression d'origine, la factorisation est correcte.`],
      hints: () => ["Développer est toujours le moyen le plus rapide de vérifier une factorisation."]
    },
    declaredVariationSpace: 11 * 17 * 17
  }),

  // --- Y8-L4-3: laws of indices ---
  arithmeticTemplate({
    key: "y8l4.indexLawMultiply", levelKey: "Y8L4", objectiveCode: "Y8-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15], [0, BASES.length - 1]], compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ base: BASES[v[2]!]! }),
    promptTemplates: [
      "{base}^{a} x {base}^{b} = {base}^k. What is k?",
      "Simplify {base}^{a} x {base}^{b} to one power of {base}. What is the index?"
    ],
    explain: (v, r) => [`Multiplying powers of the same base adds the indices.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Write it out if you are unsure: the powers simply join together."],
    fr: {
      promptTemplates: [
        "{base}^{a} x {base}^{b} = {base}^k. Que vaut k ?",
        "Simplifie {base}^{a} x {base}^{b} en une seule puissance de {base}. Quel est l'indice ?"
      ],
      explain: (v, r) => [`Multiplier des puissances de même base additionne les indices.`, `${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Écris-le en entier si tu hésites : les puissances se rejoignent simplement."]
    },
    declaredVariationSpace: 15 * 15 * BASES.length * 2
  }),
  arithmeticTemplate({
    key: "y8l4.indexLawDivide", levelKey: "Y8L4", objectiveCode: "Y8-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[6, 20], [1, 15], [0, BASES.length - 1]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ base: BASES[v[2]!]! }),
    promptTemplates: [
      "{base}^{a} ÷ {base}^{b} = {base}^k. What is k?",
      "Simplify {base}^{a} ÷ {base}^{b} to one power of {base}. What is the index?"
    ],
    explain: (v, r) => [`Dividing powers of the same base subtracts the indices.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Dividing cancels matching factors from top and bottom, which takes the powers away."],
    fr: {
      promptTemplates: [
        "{base}^{a} ÷ {base}^{b} = {base}^k. Que vaut k ?",
        "Simplifie {base}^{a} ÷ {base}^{b} en une seule puissance de {base}. Quel est l'indice ?"
      ],
      explain: (v, r) => [`Diviser des puissances de même base soustrait les indices.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["La division simplifie les facteurs identiques en haut et en bas, ce qui retire des puissances."]
    },
    declaredVariationSpace: 15 * 15 * BASES.length * 2
  }),
  arithmeticTemplate({
    key: "y8l4.indexLawPowerOfPower", levelKey: "Y8L4", objectiveCode: "Y8-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [2, 12], [0, BASES.length - 1]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ base: BASES[v[2]!]! }),
    promptTemplates: [
      "({base}^{a})^{b} = {base}^k. What is k?",
      "Simplify ({base}^{a})^{b} to one power of {base}. What is the index?"
    ],
    explain: (v, r) => [`Raising a power to a power multiplies the indices.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: (v) => [`You are using the base ${v[0]} times, ${v[1]} times over — so multiply the indices.`],
    fr: {
      promptTemplates: [
        "({base}^{a})^{b} = {base}^k. Que vaut k ?",
        "Simplifie ({base}^{a})^{b} en une seule puissance de {base}. Quel est l'indice ?"
      ],
      explain: (v, r) => [`Élever une puissance à une puissance multiplie les indices.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Tu utilises la base plusieurs fois, plusieurs fois de suite — donc multiplie les indices."]
    },
    declaredVariationSpace: 14 * 11 * BASES.length * 2
  }),
  arithmeticTemplate({
    key: "y8l4.evaluateSmallPower", levelKey: "Y8L4", objectiveCode: "Y8-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 4]], compute: (v) => Math.pow(v[0]!, v[1]!),
    promptTemplates: [
      "Work out {a}^{b}.",
      "What is {a} to the power of {b}?",
      "Evaluate {a}^{b} without a calculator."
    ],
    explain: (v, r) => [`${v[0]}^${v[1]} means ${Array(v[1]!).fill(v[0]).join(" x ")}.`, `That equals ${r}.`],
    hints: () => ["A power tells you how many times to use the base as a factor — it is not multiplication by the index."],
    fr: {
      promptTemplates: [
        "Calcule {a}^{b}.",
        "Que vaut {a} à la puissance {b} ?",
        "Évalue {a}^{b} sans calculatrice."
      ],
      explain: (v, r) => [`${v[0]}^${v[1]} signifie ${Array(v[1]!).fill(v[0]).join(" x ")}.`, `Cela vaut ${r}.`],
      hints: () => ["Une puissance indique combien de fois utiliser la base comme facteur — ce n'est pas une multiplication par l'indice."]
    },
    declaredVariationSpace: 19 * 3 * 3
  }),
  arithmeticTemplate({
    key: "y8l4.simplifyProductOfTerms", levelKey: "Y8L4", objectiveCode: "Y8-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 12], [1, 8], [1, 8]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Simplify {a}x^{c} x {b}x^{d}. What is the number in front of the x?",
      "{a}x^{c} multiplied by {b}x^{d} gives kx^m. What is k?"
    ],
    explain: (v, r) => [`Multiply the numbers: ${v[0]} x ${v[1]} = ${r}.`, `The indices are added separately: ${v[2]} + ${v[3]} = ${v[2]! + v[3]!}.`],
    hints: () => ["Deal with the numbers and the powers separately: multiply the numbers, add the indices."],
    fr: {
      promptTemplates: [
        "Simplifie {a}x^{c} x {b}x^{d}. Quel est le nombre devant le x ?",
        "{a}x^{c} multiplié par {b}x^{d} donne kx^m. Que vaut k ?"
      ],
      explain: (v, r) => [`Multiplie les nombres : ${v[0]} x ${v[1]} = ${r}.`, `Les indices s'additionnent séparément : ${v[2]} + ${v[3]} = ${v[2]! + v[3]!}.`],
      hints: () => ["Traite les nombres et les puissances séparément : multiplie les nombres, additionne les indices."]
    },
    declaredVariationSpace: 11 * 11 * 8 * 8
  }),
  categoricalPoolTemplate({
    key: "y8l4.tfIndexLaw", levelKey: "Y8L4", objectiveCode: "Y8-L4-3", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const base = rng.pick(BASES);
      const a = rng.int(2, 12);
      const b = rng.int(2, 12);
      const valid = rng.chance(0.5);
      const validClaims = [
        `${base}^${a} x ${base}^${b} = ${base}^${a + b}`,
        `(${base}^${a})^${b} = ${base}^${a * b}`,
        `${base}^${a + b} ÷ ${base}^${b} = ${base}^${a}`,
        `${base}^${a} means ${base} used as a factor ${a} times`
      ];
      const invalidClaims = [
        `${base}^${a} x ${base}^${b} = ${base}^${a * b}`,
        `(${base}^${a})^${b} = ${base}^${a + b}`,
        `${base}^${a + b} ÷ ${base}^${b} = ${base}^${a + b}`,
        `${base}^${a} means ${base} multiplied by ${a}`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Multiplying adds the indices, a power of a power multiplies them, and dividing subtracts them."
          : "Multiplying adds the indices (it does not multiply them), a power of a power multiplies them, and a power is repeated multiplication, not multiplication by the index."],
        hints: ["Multiply: add. Divide: subtract. Power of a power: multiply."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^(\d+)\^(\d+) means (\d+) used as a factor (\d+) times$/, "$1^$2 signifie $3 utilisé $4 fois comme facteur")
          .replace(/^(\d+)\^(\d+) means (\d+) multiplied by (\d+)$/, "$1^$2 signifie $3 multiplié par $4");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "La multiplication additionne les indices, une puissance de puissance les multiplie, et la division les soustrait."
            : "La multiplication additionne les indices (elle ne les multiplie pas), une puissance de puissance les multiplie, et une puissance est une multiplication répétée, pas une multiplication par l'indice."],
          hints: ["Multiplier : additionner. Diviser : soustraire. Puissance d'une puissance : multiplier."]
        };
      }
    },
    declaredVariationSpace: 2 * 4 * BASES.length * 11 * 11
  })
];

export default level;
