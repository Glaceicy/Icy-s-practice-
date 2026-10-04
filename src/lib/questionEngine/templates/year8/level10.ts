import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 10 — "Year 8 mixed mastery"
// A mixed review across the whole of Year 8: number (powers, roots,
// percentages, ratio), algebra (expanding, equations, sequences, graphs) and
// geometry/probability/statistics.
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const SQUARES = Array.from({ length: 48 }, (_, i) => (i + 1) * (i + 1));
const GOODS = ["a jacket", "a bike", "a games console", "a phone", "a guitar", "a pair of trainers", "a tablet", "a camera"];
const GOODS_FR = ["une veste", "un vélo", "une console de jeux", "un téléphone", "une guitare", "une paire de baskets", "une tablette", "un appareil photo"];
const SHAPES = ["a triangle", "a rectangle", "a kite", "an arrow", "a trapezium", "an L-shape"];
const SHAPES_FR = ["un triangle", "un rectangle", "un cerf-volant", "une flèche", "un trapèze", "une forme en L"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L10-1: powers, roots, percentages and ratio ---
  arithmeticTemplate({
    key: "y8l10.evaluatePower", levelKey: "Y8L10", objectiveCode: "Y8-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 4]], compute: (v) => Math.pow(v[0]!, v[1]!),
    promptTemplates: [
      "Work out {a}^{b}.",
      "What is {a} to the power of {b}?",
      "Evaluate {a}^{b} without a calculator."
    ],
    explain: (v, r) => [`${v[0]}^${v[1]} means ${Array(v[1]!).fill(v[0]).join(" x ")}.`, `That equals ${r}.`],
    hints: () => ["A power says how many times to use the base as a factor."],
    fr: {
      promptTemplates: [
        "Calcule {a}^{b}.",
        "Que vaut {a} à la puissance {b} ?",
        "Évalue {a}^{b} sans calculatrice."
      ],
      explain: (v, r) => [`${v[0]}^${v[1]} signifie ${Array(v[1]!).fill(v[0]).join(" x ")}.`, `Cela vaut ${r}.`],
      hints: () => ["Une puissance indique combien de fois utiliser la base comme facteur."]
    },
    declaredVariationSpace: 19 * 3 * 3
  }),
  arithmeticTemplate({
    key: "y8l10.squareRoot", levelKey: "Y8L10", objectiveCode: "Y8-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ROOT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[0, SQUARES.length - 1]], compute: (v) => Math.round(Math.sqrt(SQUARES[v[0]!]!)),
    derive: (v) => ({ sq: SQUARES[v[0]!]! }),
    promptTemplates: [
      "What is the square root of {sq}?",
      "Find √{sq}.",
      "A square has area {sq} cm². How long is each side, in cm?",
      "Which number multiplied by itself gives {sq}?"
    ],
    explain: (v, r) => [`${r} x ${r} = ${SQUARES[v[0]!]!}.`, `So the square root of ${SQUARES[v[0]!]!} is ${r}.`],
    hints: () => ["Look for the number that, multiplied by itself, gives the number under the root sign."],
    fr: {
      promptTemplates: [
        "Quelle est la racine carrée de {sq} ?",
        "Trouve √{sq}.",
        "Un carré a une aire de {sq} cm². Quelle est la longueur de chaque côté, en cm ?",
        "Quel nombre multiplié par lui-même donne {sq} ?"
      ],
      explain: (v, r) => [`${r} x ${r} = ${SQUARES[v[0]!]!}.`, `Donc la racine carrée de ${SQUARES[v[0]!]!} est ${r}.`],
      hints: () => ["Cherche le nombre qui, multiplié par lui-même, donne le nombre sous la racine."]
    },
    declaredVariationSpace: SQUARES.length * 4 * 3
  }),
  arithmeticTemplate({
    key: "y8l10.percentageIncrease", levelKey: "Y8L10", objectiveCode: "Y8-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_MULTIPLIER_ERROR"], type: "MULTI_STEP", contextPool: GOODS,
    ranges: [[1, 50], [1, 50]], compute: (v) => v[0]! * (100 + v[1]!),
    derive: (v) => ({ amount: 100 * v[0]! }),
    promptTemplates: [
      "A price of {amount} pence rises by {b}%. What is the new price, in pence?",
      "{ctx} costs {amount} pence and the price goes up by {b}%. What is the new price, in pence?"
    ],
    explain: (v, r) => [`The multiplier is (100 + ${v[1]}) ÷ 100.`, `${100 * v[0]!} x that multiplier = ${r}.`],
    hints: () => ["A rise of p% means multiplying by (100 + p) ÷ 100."],
    fr: {
      contextPool: GOODS_FR,
      promptTemplates: [
        "Un prix de {amount} pence augmente de {b} %. Quel est le nouveau prix, en pence ?",
        "{ctx} coûte {amount} pence et le prix augmente de {b} %. Quel est le nouveau prix, en pence ?"
      ],
      explain: (v, r) => [`Le multiplicateur est (100 + ${v[1]}) ÷ 100.`, `${100 * v[0]!} x ce multiplicateur = ${r}.`],
      hints: () => ["Une hausse de p % revient à multiplier par (100 + p) ÷ 100."]
    },
    declaredVariationSpace: 50 * 50 * (1 + GOODS.length)
  }),
  arithmeticTemplate({
    key: "y8l10.percentageDecrease", levelKey: "Y8L10", objectiveCode: "Y8-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_MULTIPLIER_ERROR"], type: "MULTI_STEP", contextPool: GOODS,
    ranges: [[1, 50], [1, 60]], compute: (v) => v[0]! * (100 - v[1]!),
    derive: (v) => ({ amount: 100 * v[0]! }),
    promptTemplates: [
      "A price of {amount} pence falls by {b}%. What is the new price, in pence?",
      "{ctx} costs {amount} pence and is reduced by {b}% in a sale. What is the sale price, in pence?"
    ],
    explain: (v, r) => [`The multiplier is (100 - ${v[1]}) ÷ 100.`, `${100 * v[0]!} x that multiplier = ${r}.`],
    hints: () => ["A fall of p% means multiplying by (100 - p) ÷ 100 — one step, not two."],
    fr: {
      contextPool: GOODS_FR,
      promptTemplates: [
        "Un prix de {amount} pence baisse de {b} %. Quel est le nouveau prix, en pence ?",
        "{ctx} coûte {amount} pence et est réduit de {b} % en soldes. Quel est le prix soldé, en pence ?"
      ],
      explain: (v, r) => [`Le multiplicateur est (100 - ${v[1]}) ÷ 100.`, `${100 * v[0]!} x ce multiplicateur = ${r}.`],
      hints: () => ["Une baisse de p % revient à multiplier par (100 - p) ÷ 100 — une seule étape, pas deux."]
    },
    declaredVariationSpace: 50 * 60 * (1 + GOODS.length)
  }),
  arithmeticTemplate({
    key: "y8l10.shareInRatio", levelKey: "Y8L10", objectiveCode: "Y8-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SHARE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 9], [1, 9], [2, 40]], compute: (v) => v[2]! * v[1]!,
    derive: (v) => ({ total: v[2]! * (v[0]! + v[1]!) }),
    promptTemplates: [
      "{total} is shared in the ratio {a} : {b}. What is the second share?",
      "A {total} cm ribbon is cut in the ratio {a} : {b}. How long is the second piece, in cm?"
    ],
    explain: (v, r) => [
      `There are ${v[0]! + v[1]!} parts, so one part is ${v[2]! * (v[0]! + v[1]!)} ÷ ${v[0]! + v[1]!} = ${v[2]}.`,
      `The second share is ${v[1]} x ${v[2]} = ${r}.`
    ],
    hints: () => ["Add the ratio numbers, divide to find one part, then multiply by the part you want."],
    fr: {
      promptTemplates: [
        "{total} est partagé dans le rapport {a} : {b}. Quelle est la deuxième part ?",
        "Un ruban de {total} cm est coupé dans le rapport {a} : {b}. Quelle est la longueur du second morceau, en cm ?"
      ],
      explain: (v, r) => [
        `Il y a ${v[0]! + v[1]!} parts, donc une part vaut ${v[2]! * (v[0]! + v[1]!)} ÷ ${v[0]! + v[1]!} = ${v[2]}.`,
        `La deuxième part est ${v[1]} x ${v[2]} = ${r}.`
      ],
      hints: () => ["Additionne les nombres du rapport, divise pour trouver une part, puis multiplie par la part voulue."]
    },
    declaredVariationSpace: 9 * 9 * 39 * 2
  }),

  // --- Y8-L10-2: algebra, equations, sequences and graphs ---
  arithmeticTemplate({
    key: "y8l10.expandBracketConstant", levelKey: "Y8L10", objectiveCode: "Y8-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [1, 25]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Expand {a}(x + {b}). What is the constant term?",
      "{a}(x + {b}) = {a}x + k. What is k?",
      "Multiply out {a}(x + {b}) and give the number with no x attached."
    ],
    explain: (v, r) => [`Multiply both terms inside the bracket by ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["The outside number multiplies everything inside."],
    fr: {
      promptTemplates: [
        "Développe {a}(x + {b}). Quel est le terme constant ?",
        "{a}(x + {b}) = {a}x + k. Que vaut k ?",
        "Développe {a}(x + {b}) et donne le nombre sans x."
      ],
      explain: (v, r) => [`Multiplie les deux termes de la parenthèse par ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Le nombre extérieur multiplie tout ce qui est à l'intérieur."]
    },
    declaredVariationSpace: 14 * 25 * 3
  }),
  arithmeticTemplate({
    key: "y8l10.solveTwoStepEquation", levelKey: "Y8L10", objectiveCode: "Y8-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "Solve {a}x + {b} = {c}.",
      "Find x when {a}x + {b} = {c}.",
      "What value of x makes {a}x + {b} = {c} true?"
    ],
    explain: (v, r) => [`Subtract ${v[1]}: ${v[0]}x = ${v[0]! * v[2]!}.`, `Divide by ${v[0]}: x = ${r}.`],
    hints: () => ["Undo the addition first, then the multiplication."],
    fr: {
      promptTemplates: [
        "Résous {a}x + {b} = {c}.",
        "Trouve x quand {a}x + {b} = {c}.",
        "Quelle valeur de x rend {a}x + {b} = {c} vraie ?"
      ],
      explain: (v, r) => [`Retire ${v[1]} : ${v[0]}x = ${v[0]! * v[2]!}.`, `Divise par ${v[0]} : x = ${r}.`],
      hints: () => ["Annule d'abord l'addition, puis la multiplication."]
    },
    declaredVariationSpace: 11 * 30 * 20 * 3
  }),
  arithmeticTemplate({
    key: "y8l10.nthTermValue", levelKey: "Y8L10", objectiveCode: "Y8-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_NTH_TERM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 25], [2, 12], [10, 70]], compute: (v) => v[0]! + (v[2]! - 1) * v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + 2 * v[1]! }),
    promptTemplates: [
      "A sequence starts {t1}, {t2}, {t3}, ... What is the {c}th term?",
      "Find term number {c} of the sequence {t1}, {t2}, {t3}, ..."
    ],
    explain: (v, r) => [
      `The common difference is ${v[1]}, so the nth term is ${v[1]}n + ${v[0]! - v[1]!}.`,
      `${v[1]} x ${v[2]} + ${v[0]! - v[1]!} = ${r}.`
    ],
    hints: () => ["Find the nth-term rule first, then substitute."],
    fr: {
      promptTemplates: [
        "Une suite commence par {t1}, {t2}, {t3}, ... Quel est le terme de rang {c} ?",
        "Trouve le terme numéro {c} de la suite {t1}, {t2}, {t3}, ..."
      ],
      explain: (v, r) => [
        `La raison est ${v[1]}, donc le terme de rang n est ${v[1]}n + ${v[0]! - v[1]!}.`,
        `${v[1]} x ${v[2]} + ${v[0]! - v[1]!} = ${r}.`
      ],
      hints: () => ["Trouve d'abord la formule du terme de rang n, puis remplace."]
    },
    declaredVariationSpace: 25 * 11 * 61
  }),
  arithmeticTemplate({
    key: "y8l10.gradientFromEquation", levelKey: "Y8L10", objectiveCode: "Y8-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [-30, 30]], compute: (v) => v[0]!,
    promptTemplates: [
      "What is the gradient of the line y = {a}x + {b}?",
      "In y = {a}x + {b}, which number is the gradient?",
      "A line has equation y = {a}x + {b}. How steep is it?"
    ],
    explain: (v, r) => [`In y = mx + c, m is the gradient.`, `Here m = ${r}.`],
    hints: () => ["The gradient is attached to x; the constant is the y-intercept."],
    fr: {
      promptTemplates: [
        "Quel est le coefficient directeur de la droite y = {a}x + {b} ?",
        "Dans y = {a}x + {b}, quel nombre est le coefficient directeur ?",
        "Une droite a pour équation y = {a}x + {b}. Quelle est sa pente ?"
      ],
      explain: (v, r) => [`Dans y = mx + c, m est le coefficient directeur.`, `Ici m = ${r}.`],
      hints: () => ["Le coefficient directeur est accolé à x ; la constante est l'ordonnée à l'origine."]
    },
    declaredVariationSpace: 19 * 61 * 3
  }),
  arithmeticTemplate({
    key: "y8l10.substituteIntoFormula", levelKey: "Y8L10", objectiveCode: "Y8-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 25], [1, 20]], compute: (v) => v[0]! * v[2]! * v[2]! + v[1]!,
    promptTemplates: [
      "If y = {a}x² + {b}, what is y when x = {c}?",
      "Substitute x = {c} into y = {a}x² + {b}. What is y?"
    ],
    explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Square first, then multiply, then add — follow the order of operations."],
    fr: {
      promptTemplates: [
        "Si y = {a}x² + {b}, que vaut y quand x = {c} ?",
        "Remplace x par {c} dans y = {a}x² + {b}. Que vaut y ?"
      ],
      explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord au carré, puis multiplie, puis additionne — respecte l'ordre des opérations."]
    },
    declaredVariationSpace: 11 * 25 * 20 * 2
  }),

  // --- Y8-L10-3: transformations, Pythagoras, probability and statistics ---
  arithmeticTemplate({
    key: "y8l10.pythagorasHypotenuse", levelKey: "Y8L10", objectiveCode: "Y8-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "MULTI_STEP", contextPool: SHAPES,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, q: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has shorter sides of {p} cm and {q} cm. How long is the hypotenuse, in cm?",
      "A rectangle measures {p} m by {q} m. How long is its diagonal, in m?",
      "Walking {p} m east then {q} m north, how far are you in a straight line from the start, in m?"
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]!, q = t[1] * v[1]!;
      return [`${p}² + ${q}² = ${p * p + q * q}.`, `The square root of ${p * p + q * q} is ${r}.`];
    },
    hints: () => ["Square, add, then square root."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Un triangle rectangle a des côtés courts de {p} cm et {q} cm. Quelle est la longueur de l'hypoténuse, en cm ?",
        "Un rectangle mesure {p} m sur {q} m. Quelle est la longueur de sa diagonale, en m ?",
        "En marchant {p} m vers l'est puis {q} m vers le nord, à quelle distance en ligne droite es-tu du départ, en m ?"
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, q = t[1] * v[1]!;
        return [`${p}² + ${q}² = ${p * p + q * q}.`, `La racine carrée de ${p * p + q * q} est ${r}.`];
      },
      hints: () => ["Élève au carré, additionne, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 3 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y8l10.translationImageY", levelKey: "Y8L10", objectiveCode: "Y8-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-12, 12], [-12, 12], [-9, 9], [-9, 9]], compute: (v) => v[1]! + v[3]!,
    promptTemplates: [
      "The point ({a}, {b}) is translated by the vector ({c}, {d}). What is the y-coordinate of the image?",
      "Translate ({a}, {b}) by ({c}, {d}) and give the new y-coordinate."
    ],
    explain: (v, r) => [`The bottom number of the vector moves the point vertically.`, `${v[1]} + ${v[3]} = ${r}.`],
    hints: () => ["The bottom number of a column vector changes y only."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) subit la translation de vecteur ({c}, {d}). Quelle est l'ordonnée de l'image ?",
        "Applique la translation ({c}, {d}) au point ({a}, {b}) et donne la nouvelle ordonnée."
      ],
      explain: (v, r) => [`Le nombre du bas du vecteur déplace le point verticalement.`, `${v[1]} + ${v[3]} = ${r}.`],
      hints: () => ["Le nombre du bas d'un vecteur colonne ne change que y."]
    },
    declaredVariationSpace: 25 * 25 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y8l10.expectedFrequency", levelKey: "Y8L10", objectiveCode: "Y8-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["EXPECTED_FREQUENCY_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 99], [1, 30]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ pct: v[0]!, trials: 100 * v[1]! }),
    promptTemplates: [
      "An outcome has probability {pct}%. In {trials} trials, how many times would you expect it?",
      "{pct}% of attempts succeed. Out of {trials} attempts, how many successes would you expect?"
    ],
    explain: (v, r) => [`Expected frequency = probability x number of trials.`, `${v[0]}% of ${100 * v[1]!} = ${r}.`],
    hints: () => ["Multiply the probability by the number of trials."],
    fr: {
      promptTemplates: [
        "Une issue a une probabilité de {pct} %. Sur {trials} essais, combien de fois t'attends-tu à l'observer ?",
        "{pct} % des tentatives réussissent. Sur {trials} tentatives, combien de réussites attends-tu ?"
      ],
      explain: (v, r) => [`Effectif attendu = probabilité x nombre d'essais.`, `${v[0]} % de ${100 * v[1]!} = ${r}.`],
      hints: () => ["Multiplie la probabilité par le nombre d'essais."]
    },
    declaredVariationSpace: 99 * 30 * 2
  }),
  arithmeticTemplate({
    key: "y8l10.meanOfFive", levelKey: "Y8L10", objectiveCode: "Y8-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40], [1, 40]],
    constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]! + v[4]!) % 5 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]! + v[4]!) / 5,
    promptTemplates: [
      "Find the mean of {a}, {b}, {c}, {d} and {e}.",
      "Five scores are {a}, {b}, {c}, {d} and {e}. What is the mean?"
    ],
    explain: (v, r) => [`${v.join(" + ")} = ${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!} ÷ 5 = ${r}.`],
    hints: () => ["Add them all, then divide by how many there are."],
    fr: {
      promptTemplates: [
        "Trouve la moyenne de {a}, {b}, {c}, {d} et {e}.",
        "Cinq notes valent {a}, {b}, {c}, {d} et {e}. Quelle est la moyenne ?"
      ],
      explain: (v, r) => [`${v.join(" + ")} = ${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!} ÷ 5 = ${r}.`],
      hints: () => ["Additionne tout, puis divise par le nombre de valeurs."]
    },
    declaredVariationSpace: 40 * 40 * 40
  }),
  categoricalPoolTemplate({
    key: "y8l10.tfYear8Reasoning", levelKey: "Y8L10", objectiveCode: "Y8-L10-3", difficulty: "REASONING",
    misconceptionTags: ["MIXED_REASONING_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const valid = rng.chance(0.5);
      const a = rng.int(2, 12);
      const b = rng.int(2, 12);
      const validClaims = [
        `${a}^2 x ${a}^${b} is the same as ${a}^${b + 2}`,
        `a translation never changes the size of a shape`,
        `in a right-angled triangle the hypotenuse is the longest side`,
        `increasing an amount by ${a}% means multiplying by 1.${a < 10 ? "0" : ""}${a}`,
        `the range of a data set measures how spread out it is`
      ];
      const invalidClaims = [
        `${a}^2 x ${a}^${b} is the same as ${a}^${b * 2}`,
        `a translation makes a shape ${a} times bigger`,
        `in a right-angled triangle the hypotenuse is the shortest side`,
        `increasing an amount by ${a}% means multiplying by ${a}`,
        `the range of a data set is a kind of average`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Index laws add powers when multiplying, transformations preserve size, the hypotenuse is always longest, and the range measures spread."
          : "Multiplying powers adds the indices, a translation never resizes a shape, the hypotenuse is always the longest side, and the range is a measure of spread, not an average."],
        hints: ["Check each claim against the rule it is testing: index laws, transformations, Pythagoras, percentages or averages."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^(\d+)\^2 x (\d+)\^(\d+) is the same as (\d+)\^(\d+)$/, "$1^2 x $2^$3 est la même chose que $4^$5")
          .replace(/^A translation never changes the size of a shape$/, "Une translation ne change jamais la taille d'une figure")
          .replace(/^A translation makes a shape (\d+) times bigger$/, "Une translation rend une figure $1 fois plus grande")
          .replace(/^In a right-angled triangle the hypotenuse is the longest side$/, "Dans un triangle rectangle, l'hypoténuse est le plus long côté")
          .replace(/^In a right-angled triangle the hypotenuse is the shortest side$/, "Dans un triangle rectangle, l'hypoténuse est le plus court côté")
          .replace(/^Increasing an amount by (\d+)% means multiplying by (\S+)$/, "Augmenter une quantité de $1 % revient à multiplier par $2")
          .replace(/^The range of a data set measures how spread out it is$/, "L'étendue d'une série mesure sa dispersion")
          .replace(/^The range of a data set is a kind of average$/, "L'étendue d'une série est une sorte de moyenne");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Les lois des indices additionnent les puissances lors d'une multiplication, les transformations conservent la taille, l'hypoténuse est toujours le plus long côté, et l'étendue mesure la dispersion."
            : "Multiplier des puissances additionne les indices, une translation ne redimensionne jamais une figure, l'hypoténuse est toujours le plus long côté, et l'étendue mesure la dispersion, pas une moyenne."],
          hints: ["Vérifie chaque affirmation avec la règle concernée : lois des indices, transformations, Pythagore, pourcentages ou moyennes."]
        };
      }
    },
    declaredVariationSpace: 2 * 5 * 11 * 11
  })
];

export default level;
