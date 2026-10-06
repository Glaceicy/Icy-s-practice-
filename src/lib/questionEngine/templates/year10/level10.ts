import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 10 — "Year 10 GCSE-style mixed mastery"
// A mixed review drawing on the whole Year 10 sequence: number/ratio/proportion,
// algebra (expressions, equations, sequences, graphs) and
// geometry/trigonometry/probability/statistics.
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const BASES = [2, 3, 5];
const CTX = ["a sports field", "a car park", "a garden plot", "a tennis court", "a playground", "a paddock", "a skate park", "an allotment"];
const CTX_FR = ["un terrain de sport", "un parking", "un carré de jardin", "un court de tennis", "une cour de récréation", "un enclos", "un skatepark", "un jardin ouvrier"];
const EVENTS = ["a bus being late", "rain falling", "a penalty being scored", "a seed germinating", "a lift being busy", "a parcel arriving on time"];
const EVENTS_FR = ["un bus en retard", "la pluie qui tombe", "un penalty réussi", "une graine qui germe", "un ascenseur occupé", "un colis livré à l'heure"];
const oneDp = (n: number) => n.toFixed(1);

export const level: QuestionTemplateDef[] = [
  // --- Y10-L10-1: number, ratio and proportion ---
  arithmeticTemplate({
    key: "y10l10.upperBound", levelKey: "Y10L10", objectiveCode: "Y10-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 200]], compute: (v) => v[0]! + 0.5, formatValue: oneDp,
    derive: (v) => ({ len: v[0]! }),
    promptTemplates: [
      "A length is measured as {len} cm to the nearest centimetre. What is its upper bound, in cm?",
      "A mass of {len} kg is given to the nearest kilogram. State the upper bound, in kg.",
      "A time of {len} seconds is recorded to the nearest second. What is the largest value it could really be, in seconds?"
    ],
    explain: (v, r) => [`To the nearest whole unit, anything from ${v[0]! - 0.5} up to ${r} rounds to ${v[0]}.`, `The upper bound is ${r}.`],
    hints: () => ["Add half of the rounding unit to get the upper bound."],
    fr: {
      promptTemplates: [
        "Une longueur est mesurée à {len} cm au centimètre près. Quelle est sa borne supérieure, en cm ?",
        "Une masse de {len} kg est donnée au kilogramme près. Donne la borne supérieure, en kg.",
        "Un temps de {len} secondes est relevé à la seconde près. Quelle est la plus grande valeur réelle possible, en secondes ?"
      ],
      explain: (v, r) => [`À l'unité près, tout ce qui va de ${v[0]! - 0.5} à ${r} s'arrondit à ${v[0]}.`, `La borne supérieure est ${r}.`],
      hints: () => ["Ajoute la moitié de l'unité d'arrondi pour obtenir la borne supérieure."]
    },
    declaredVariationSpace: 200 * 3
  }),
  arithmeticTemplate({
    key: "y10l10.standardFormExponent", levelKey: "Y10L10", objectiveCode: "Y10-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 3], [1, 3], [1, 9], [1, 9]], compute: (v) => v[2]! + v[3]!,
    promptTemplates: [
      "Work out ({a} x 10^{c}) x ({b} x 10^{d}) and write it in standard form as k x 10^n. What is n?",
      "({a} x 10^{c}) multiplied by ({b} x 10^{d}) gives an answer in standard form. What is the power of 10?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}, which is already between 1 and 10.`, `Add the powers: ${v[2]} + ${v[3]} = ${r}.`],
    hints: () => ["Multiply the front numbers and add the powers of 10. Check the front number stays between 1 and 10."],
    fr: {
      promptTemplates: [
        "Calcule ({a} x 10^{c}) x ({b} x 10^{d}) et écris le résultat en notation scientifique sous la forme k x 10^n. Que vaut n ?",
        "({a} x 10^{c}) multiplié par ({b} x 10^{d}) donne un résultat en notation scientifique. Quelle est la puissance de 10 ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}, qui est déjà entre 1 et 10.`, `Additionne les puissances : ${v[2]} + ${v[3]} = ${r}.`],
      hints: () => ["Multiplie les nombres de devant et additionne les puissances de 10. Vérifie que le nombre de devant reste entre 1 et 10."]
    },
    declaredVariationSpace: 3 * 3 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y10l10.percentageIncrease", levelKey: "Y10L10", objectiveCode: "Y10-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_MULTIPLIER_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 50]], compute: (v) => v[0]! * (100 + v[1]!),
    derive: (v) => ({ amount: 100 * v[0]! }),
    promptTemplates: [
      "A price of £{amount} rises by {b}%. What is the new price, in pounds?",
      "A population of {amount} grows by {b}%. What is the new population?",
      "Increase {amount} by {b}%."
    ],
    explain: (v, r) => [`The multiplier is 1.${v[1]! < 10 ? "0" : ""}${v[1]}.`, `${100 * v[0]!} x 1.${v[1]! < 10 ? "0" : ""}${v[1]} = ${r}.`],
    hints: () => ["A rise of p% means multiplying by (100 + p) ÷ 100."],
    fr: {
      promptTemplates: [
        "Un prix de {amount} £ augmente de {b} %. Quel est le nouveau prix, en livres ?",
        "Une population de {amount} augmente de {b} %. Quelle est la nouvelle population ?",
        "Augmente {amount} de {b} %."
      ],
      explain: (v, r) => [`Le multiplicateur est 1,${v[1]! < 10 ? "0" : ""}${v[1]}.`, `${100 * v[0]!} x 1,${v[1]! < 10 ? "0" : ""}${v[1]} = ${r}.`],
      hints: () => ["Une hausse de p % revient à multiplier par (100 + p) ÷ 100."]
    },
    declaredVariationSpace: 50 * 50 * 3
  }),
  arithmeticTemplate({
    key: "y10l10.reversePercentage", levelKey: "Y10L10", objectiveCode: "Y10-L10-1", difficulty: "REASONING",
    misconceptionTags: ["REVERSE_PERCENTAGE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 50], [1, 50]], compute: (v) => 100 * v[0]!,
    derive: (v) => ({ total: v[0]! * (100 + v[1]!) }),
    promptTemplates: [
      "After a {b}% increase, a price is £{total}. What was the original price, in pounds?",
      "A quantity grew by {b}% to reach {total}. What was it before the increase?"
    ],
    explain: (v, r) => [
      `The multiplier was (100 + ${v[1]}) ÷ 100 = 1.${v[1]! < 10 ? "0" : ""}${v[1]}.`,
      `Divide to reverse it: ${v[0]! * (100 + v[1]!)} ÷ 1.${v[1]! < 10 ? "0" : ""}${v[1]} = ${r}.`
    ],
    hints: () => ["Reverse an increase by dividing by the multiplier, never by subtracting the same percentage."],
    fr: {
      promptTemplates: [
        "Après une augmentation de {b} %, un prix vaut {total} £. Quel était le prix initial, en livres ?",
        "Une quantité a augmenté de {b} % pour atteindre {total}. Que valait-elle avant l'augmentation ?"
      ],
      explain: (v, r) => [
        `Le multiplicateur était (100 + ${v[1]}) ÷ 100 = 1,${v[1]! < 10 ? "0" : ""}${v[1]}.`,
        `Divise pour l'inverser : ${v[0]! * (100 + v[1]!)} ÷ 1,${v[1]! < 10 ? "0" : ""}${v[1]} = ${r}.`
      ],
      hints: () => ["Pour annuler une augmentation, divise par le multiplicateur, jamais en retirant le même pourcentage."]
    },
    declaredVariationSpace: 50 * 50 * 2
  }),
  arithmeticTemplate({
    key: "y10l10.shareInThreePartRatio", levelKey: "Y10L10", objectiveCode: "Y10-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SHARE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 9], [1, 9], [1, 9], [2, 40]], compute: (v) => v[3]! * v[0]!,
    derive: (v) => ({ total: v[3]! * (v[0]! + v[1]! + v[2]!) }),
    promptTemplates: [
      "{total} is shared in the ratio {a} : {b} : {c}. How much is the first share?",
      "Three people share {total} counters in the ratio {a} : {b} : {c}. How many does the first person get?"
    ],
    explain: (v, r) => [
      `There are ${v[0]! + v[1]! + v[2]!} parts altogether, so one part is ${v[3]! * (v[0]! + v[1]! + v[2]!)} ÷ ${v[0]! + v[1]! + v[2]!} = ${v[3]}.`,
      `The first share is ${v[0]} x ${v[3]} = ${r}.`
    ],
    hints: () => ["Add the ratio numbers to find the number of parts, divide to find one part, then multiply."],
    fr: {
      promptTemplates: [
        "{total} est partagé dans le rapport {a} : {b} : {c}. Combien vaut la première part ?",
        "Trois personnes partagent {total} jetons dans le rapport {a} : {b} : {c}. Combien en reçoit la première ?"
      ],
      explain: (v, r) => [
        `Il y a ${v[0]! + v[1]! + v[2]!} parts en tout, donc une part vaut ${v[3]! * (v[0]! + v[1]! + v[2]!)} ÷ ${v[0]! + v[1]! + v[2]!} = ${v[3]}.`,
        `La première part est ${v[0]} x ${v[3]} = ${r}.`
      ],
      hints: () => ["Additionne les nombres du rapport pour trouver le nombre de parts, divise pour trouver une part, puis multiplie."]
    },
    declaredVariationSpace: 9 * 9 * 9 * 39
  }),
  arithmeticTemplate({
    key: "y10l10.simplifySurd", levelKey: "Y10L10", objectiveCode: "Y10-L10-1", difficulty: "REASONING",
    misconceptionTags: ["SURD_SIMPLIFY_ERROR"], type: "NUMBER_ENTRY", pathway: "HIGHER",
    ranges: [[2, 30], [0, BASES.length - 1]], compute: (v) => v[0]!,
    derive: (v) => ({ n: BASES[v[1]!]! * v[0]! * v[0]!, base: BASES[v[1]!]! }),
    promptTemplates: [
      "Simplify √{n} into the form k√{base}. What is k?",
      "√{n} can be written as k√{base}. Find k.",
      "Write √{n} in its simplest surd form k√{base} and state k."
    ],
    explain: (v, r) => [
      `${BASES[v[1]!]! * v[0]! * v[0]!} = ${v[0]! * v[0]!} x ${BASES[v[1]!]!}, and ${v[0]! * v[0]!} is a perfect square.`,
      `So √${BASES[v[1]!]! * v[0]! * v[0]!} = ${r}√${BASES[v[1]!]!}.`
    ],
    hints: () => ["Look for the largest square factor, take its square root outside the sign and leave the rest inside."],
    fr: {
      promptTemplates: [
        "Simplifie √{n} sous la forme k√{base}. Que vaut k ?",
        "√{n} peut s'écrire k√{base}. Trouve k.",
        "Écris √{n} sous sa forme radicale la plus simple k√{base} et donne k."
      ],
      explain: (v, r) => [
        `${BASES[v[1]!]! * v[0]! * v[0]!} = ${v[0]! * v[0]!} x ${BASES[v[1]!]!}, et ${v[0]! * v[0]!} est un carré parfait.`,
        `Donc √${BASES[v[1]!]! * v[0]! * v[0]!} = ${r}√${BASES[v[1]!]!}.`
      ],
      hints: () => ["Cherche le plus grand facteur carré, sors sa racine du radical et laisse le reste à l'intérieur."]
    },
    declaredVariationSpace: 29 * BASES.length * 3
  }),

  // --- Y10-L10-2: algebra, equations, sequences and graphs ---
  arithmeticTemplate({
    key: "y10l10.expandDoubleBrackets", levelKey: "Y10L10", objectiveCode: "Y10-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "Expand (x + {a})(x + {b}). The answer is x² + px + q. What is p?",
      "(x + {a})(x + {b}) = x² + px + q. Find the value of p."
    ],
    explain: (v, r) => [`The x terms are ${v[1]}x and ${v[0]}x.`, `${v[0]} + ${v[1]} = ${r}, so p = ${r}.`],
    hints: () => ["Multiply every term in the first bracket by every term in the second, then collect the x terms."],
    fr: {
      promptTemplates: [
        "Développe (x + {a})(x + {b}). Le résultat est x² + px + q. Que vaut p ?",
        "(x + {a})(x + {b}) = x² + px + q. Trouve la valeur de p."
      ],
      explain: (v, r) => [`Les termes en x sont ${v[1]}x et ${v[0]}x.`, `${v[0]} + ${v[1]} = ${r}, donc p = ${r}.`],
      hints: () => ["Multiplie chaque terme de la première parenthèse par chaque terme de la seconde, puis regroupe les termes en x."]
    },
    declaredVariationSpace: 15 * 15 * 2
  }),
  arithmeticTemplate({
    key: "y10l10.factoriseQuadratic", levelKey: "Y10L10", objectiveCode: "Y10-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 15], [1, 15]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.max(v[0]!, v[1]!),
    derive: (v) => ({ sum: v[0]! + v[1]!, prod: v[0]! * v[1]! }),
    promptTemplates: [
      "x² + {sum}x + {prod} factorises as (x + m)(x + n). What is the larger of m and n?",
      "Factorise x² + {sum}x + {prod} into two brackets. What is the bigger number inside them?",
      "Two numbers multiply to {prod} and add to {sum}. What is the larger number?"
    ],
    explain: (v, r) => [
      `You need two numbers that multiply to ${v[0]! * v[1]!} and add to ${v[0]! + v[1]!}.`,
      `Those numbers are ${Math.min(v[0]!, v[1]!)} and ${Math.max(v[0]!, v[1]!)}, so the larger is ${r}.`
    ],
    hints: () => ["List factor pairs of the constant term and look for the pair that adds to the x coefficient."],
    fr: {
      promptTemplates: [
        "x² + {sum}x + {prod} se factorise en (x + m)(x + n). Quel est le plus grand de m et n ?",
        "Factorise x² + {sum}x + {prod} en deux parenthèses. Quel est le plus grand nombre à l'intérieur ?",
        "Deux nombres ont pour produit {prod} et pour somme {sum}. Quel est le plus grand ?"
      ],
      explain: (v, r) => [
        `Il faut deux nombres de produit ${v[0]! * v[1]!} et de somme ${v[0]! + v[1]!}.`,
        `Ce sont ${Math.min(v[0]!, v[1]!)} et ${Math.max(v[0]!, v[1]!)}, donc le plus grand est ${r}.`
      ],
      hints: () => ["Liste les paires de facteurs du terme constant et cherche celle dont la somme donne le coefficient de x."]
    },
    declaredVariationSpace: 15 * 15 * 3
  }),
  arithmeticTemplate({
    key: "y10l10.solveLinearEquation", levelKey: "Y10L10", objectiveCode: "Y10-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "Solve {a}x + {b} = {c}.",
      "Find x when {a}x + {b} = {c}.",
      "What value of x satisfies {a}x + {b} = {c}?"
    ],
    explain: (v, r) => [`Subtract ${v[1]} from both sides: ${v[0]}x = ${v[0]! * v[2]!}.`, `Divide by ${v[0]}: x = ${r}.`],
    hints: () => ["Undo the addition first, then undo the multiplication."],
    fr: {
      promptTemplates: [
        "Résous {a}x + {b} = {c}.",
        "Trouve x quand {a}x + {b} = {c}.",
        "Quelle valeur de x vérifie {a}x + {b} = {c} ?"
      ],
      explain: (v, r) => [`Retire ${v[1]} des deux côtés : ${v[0]}x = ${v[0]! * v[2]!}.`, `Divise par ${v[0]} : x = ${r}.`],
      hints: () => ["Annule d'abord l'addition, puis la multiplication."]
    },
    declaredVariationSpace: 11 * 30 * 20 * 3
  }),
  arithmeticTemplate({
    key: "y10l10.nthTermOfLinearSequence", levelKey: "Y10L10", objectiveCode: "Y10-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_NTH_TERM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 20], [2, 12], [10, 60]], compute: (v) => v[0]! + (v[2]! - 1) * v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + 2 * v[1]! }),
    promptTemplates: [
      "A sequence starts {t1}, {t2}, {t3}, ... What is the {c}th term?",
      "The first three terms of a linear sequence are {t1}, {t2} and {t3}. Find term number {c}."
    ],
    explain: (v, r) => [
      `The common difference is ${v[1]}, so the nth term is ${v[1]}n + ${v[0]! - v[1]!}.`,
      `For n = ${v[2]}: ${v[1]} x ${v[2]} + ${v[0]! - v[1]!} = ${r}.`
    ],
    hints: () => ["Find the common difference, write the nth-term rule, then substitute."],
    fr: {
      promptTemplates: [
        "Une suite commence par {t1}, {t2}, {t3}, ... Quel est le terme de rang {c} ?",
        "Les trois premiers termes d'une suite arithmétique sont {t1}, {t2} et {t3}. Trouve le terme numéro {c}."
      ],
      explain: (v, r) => [
        `La raison est ${v[1]}, donc le terme de rang n est ${v[1]}n + ${v[0]! - v[1]!}.`,
        `Pour n = ${v[2]} : ${v[1]} x ${v[2]} + ${v[0]! - v[1]!} = ${r}.`
      ],
      hints: () => ["Trouve la raison, écris la formule du terme de rang n, puis remplace."]
    },
    declaredVariationSpace: 20 * 11 * 51 * 2
  }),
  arithmeticTemplate({
    key: "y10l10.simultaneousEquations", levelKey: "Y10L10", objectiveCode: "Y10-L10-2", difficulty: "REASONING",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 30], [1, 30]], constraint: (v) => v[0]! > v[1]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ s: v[0]! + v[1]!, d: v[0]! - v[1]! }),
    promptTemplates: [
      "Solve the simultaneous equations x + y = {s} and x - y = {d}. What is x?",
      "Two numbers add to {s} and differ by {d}. What is the larger number?"
    ],
    explain: (v, r) => [
      `Adding the two equations eliminates y: 2x = ${v[0]! + v[1]!} + ${v[0]! - v[1]!} = ${2 * v[0]!}.`,
      `So x = ${r}.`
    ],
    hints: () => ["Add the equations so the y terms cancel, then halve."],
    fr: {
      promptTemplates: [
        "Résous le système x + y = {s} et x - y = {d}. Que vaut x ?",
        "Deux nombres ont pour somme {s} et pour différence {d}. Quel est le plus grand ?"
      ],
      explain: (v, r) => [
        `En additionnant les deux équations, y disparaît : 2x = ${v[0]! + v[1]!} + ${v[0]! - v[1]!} = ${2 * v[0]!}.`,
        `Donc x = ${r}.`
      ],
      hints: () => ["Additionne les équations pour éliminer y, puis divise par 2."]
    },
    declaredVariationSpace: 30 * 30 * 2
  }),
  arithmeticTemplate({
    key: "y10l10.turningPointOfQuadratic", levelKey: "Y10L10", objectiveCode: "Y10-L10-2", difficulty: "REASONING",
    misconceptionTags: ["COMPLETING_SQUARE_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[1, 40], [0, 30]], compute: (v) => v[0]!,
    derive: (v) => ({ coef: 2 * v[0]! }),
    promptTemplates: [
      "By completing the square, the graph of y = x² + {coef}x + {b} has its turning point at x = -p. What is p?",
      "y = x² + {coef}x + {b} is written as (x + p)² + q. What is p?"
    ],
    explain: (v, r) => [`Halve the x coefficient: ${2 * v[0]!} ÷ 2 = ${r}.`, `So y = (x + ${r})² + ${v[1]! - v[0]! * v[0]!}, with the turning point at x = -${r}.`],
    hints: () => ["Completing the square puts half the x coefficient inside the bracket."],
    fr: {
      promptTemplates: [
        "En complétant le carré, le graphique de y = x² + {coef}x + {b} a son sommet en x = -p. Que vaut p ?",
        "y = x² + {coef}x + {b} s'écrit (x + p)² + q. Que vaut p ?"
      ],
      explain: (v, r) => [`Divise le coefficient de x par 2 : ${2 * v[0]!} ÷ 2 = ${r}.`, `Donc y = (x + ${r})² + ${v[1]! - v[0]! * v[0]!}, avec le sommet en x = -${r}.`],
      hints: () => ["Compléter le carré place la moitié du coefficient de x dans la parenthèse."]
    },
    declaredVariationSpace: 40 * 31 * 2
  }),

  // --- Y10-L10-3: geometry, trigonometry, probability and statistics ---
  arithmeticTemplate({
    key: "y10l10.pythagorasMixed", levelKey: "Y10L10", objectiveCode: "Y10-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, q: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: [
      "{Ctx} is a rectangle {p} m by {q} m. How far is it diagonally from one corner to the opposite corner, in m?",
      "A rectangle measures {p} cm by {q} cm. How long is its diagonal, in cm?",
      "Walking {p} m east then {q} m north, how far are you in a straight line from where you started, in m?"
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]!, q = t[1] * v[1]!;
      return [`${p}² + ${q}² = ${p * p + q * q}.`, `The square root of ${p * p + q * q} is ${r}.`];
    },
    hints: () => ["The diagonal is the hypotenuse of a right-angled triangle made by two sides."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{Ctx} est un rectangle de {p} m sur {q} m. Quelle est la distance en diagonale d'un coin au coin opposé, en m ?",
        "Un rectangle mesure {p} cm sur {q} cm. Quelle est la longueur de sa diagonale, en cm ?",
        "En marchant {p} m vers l'est puis {q} m vers le nord, à quelle distance en ligne droite es-tu du départ, en m ?"
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, q = t[1] * v[1]!;
        return [`${p}² + ${q}² = ${p * p + q * q}.`, `La racine carrée de ${p * p + q * q} est ${r}.`];
      },
      hints: () => ["La diagonale est l'hypoténuse du triangle rectangle formé par deux côtés."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 3 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y10l10.trigAngleMixed", levelKey: "Y10L10", objectiveCode: "Y10-L10-3", difficulty: "REASONING",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[0, TRIPLES.length - 1], [1, 12]],
    compute: (v) => Math.round((Math.atan(TRIPLES[v[0]!]![0] / TRIPLES[v[0]!]![1]) * 180) / Math.PI),
    derive: (v) => ({ opp: TRIPLES[v[0]!]![0] * v[1]!, adj: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has an opposite side of {opp} cm and an adjacent side of {adj} cm. What is the angle, to the nearest degree?",
      "A ramp beside {ctx} rises {opp} cm over a horizontal run of {adj} cm. What angle does it make with the ground, to the nearest degree?",
      "In a right-angled triangle the two shorter sides are {opp} m (opposite) and {adj} m (adjacent). Find the angle, to the nearest degree."
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`tan(angle) = ${t[0] * v[1]!} ÷ ${t[1] * v[1]!} = ${(t[0] / t[1]).toFixed(4)}.`, `Inverse tangent gives ${r}°.`];
    },
    hints: () => ["Opposite and adjacent together mean tan — then use inverse tan."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Un triangle rectangle a un côté opposé de {opp} cm et un côté adjacent de {adj} cm. Quel est l'angle, au degré près ?",
        "Une rampe à côté {de:ctx} monte de {opp} cm sur une longueur horizontale de {adj} cm. Quel angle forme-t-elle avec le sol, au degré près ?",
        "Dans un triangle rectangle, les deux côtés courts mesurent {opp} m (opposé) et {adj} m (adjacent). Trouve l'angle, au degré près."
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        return [`tan(angle) = ${t[0] * v[1]!} ÷ ${t[1] * v[1]!} = ${(t[0] / t[1]).toFixed(4)}.`, `La tangente inverse donne ${r}°.`];
      },
      hints: () => ["Opposé et adjacent ensemble veulent dire tan — puis utilise la tangente inverse."]
    },
    declaredVariationSpace: TRIPLES.length * 12 * 3 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y10l10.probabilityNeitherPercent", levelKey: "Y10L10", objectiveCode: "Y10-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "MULTI_STEP", contextPool: EVENTS,
    ranges: [[1, 9], [1, 9]], compute: (v) => (10 - v[0]!) * (10 - v[1]!),
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that neither happens, as a percentage?",
      "The chance of {ctx} is {pa}% today and {pb}% tomorrow, independently. What is the percentage chance it happens on neither day?",
      "P(A) = {pa}% and P(B) = {pb}%, and A and B are independent. Find P(neither A nor B) as a percentage."
    ],
    explain: (v, r) => [
      `P(not A) = ${100 - 10 * v[0]!}% and P(not B) = ${100 - 10 * v[1]!}%.`,
      `Multiply along the branches: ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${r}%.`
    ],
    hints: () => ["Find the probability of each event NOT happening, then multiply."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité qu'aucun ne se produise, en pourcentage ?",
        "La probabilité {de:ctx} est de {pa}% aujourd'hui et de {pb}% demain, indépendamment. Quelle est la probabilité en pourcentage que cela n'arrive ni l'un ni l'autre jour ?",
        "P(A) = {pa}% et P(B) = {pb}%, et A et B sont indépendants. Trouve P(ni A ni B) en pourcentage."
      ],
      explain: (v, r) => [
        `P(non A) = ${100 - 10 * v[0]!}% et P(non B) = ${100 - 10 * v[1]!}%.`,
        `Multiplie le long des branches : ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${r}%.`
      ],
      hints: () => ["Trouve la probabilité que chaque événement ne se produise pas, puis multiplie."]
    },
    declaredVariationSpace: 9 * 9 * 3 * (1 + EVENTS.length)
  }),
  arithmeticTemplate({
    key: "y10l10.totalFromFrequencyTable", levelKey: "Y10L10", objectiveCode: "Y10-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 30], [1, 30], [1, 30]], compute: (v) => v[0]! + 2 * v[1]! + 3 * v[2]!,
    promptTemplates: [
      "A frequency table shows {a} players scored 1 goal, {b} scored 2 goals and {c} scored 3 goals. How many goals were scored altogether?",
      "In a survey {a} households own 1 bike, {b} own 2 and {c} own 3. How many bikes are there in total?"
    ],
    explain: (v, r) => [
      `Multiply each value by its frequency: 1 x ${v[0]} + 2 x ${v[1]} + 3 x ${v[2]}.`,
      `${v[0]} + ${2 * v[1]!} + ${3 * v[2]!} = ${r}.`
    ],
    hints: () => ["This is the Σfx column of a frequency table: multiply value by frequency, then add."],
    fr: {
      promptTemplates: [
        "Un tableau d'effectifs indique que {a} joueurs ont marqué 1 but, {b} en ont marqué 2 et {c} en ont marqué 3. Combien de buts ont été marqués en tout ?",
        "Dans une enquête, {a} foyers possèdent 1 vélo, {b} en possèdent 2 et {c} en possèdent 3. Combien y a-t-il de vélos en tout ?"
      ],
      explain: (v, r) => [
        `Multiplie chaque valeur par son effectif : 1 x ${v[0]} + 2 x ${v[1]} + 3 x ${v[2]}.`,
        `${v[0]} + ${2 * v[1]!} + ${3 * v[2]!} = ${r}.`
      ],
      hints: () => ["C'est la colonne Σfx d'un tableau d'effectifs : multiplie la valeur par l'effectif, puis additionne."]
    },
    declaredVariationSpace: 30 * 30 * 30
  }),
  categoricalPoolTemplate({
    key: "y10l10.mcGcseMixedReasoning", levelKey: "Y10L10", objectiveCode: "Y10-L10-3", difficulty: "REASONING",
    misconceptionTags: ["MIXED_REASONING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { topic: ["bounds", "proportion", "similarity", "probability", "statistics"] },
    build: (picked, rng) => {
      const n = rng.int(3, 40);
      const k = rng.int(2, 9);
      const topic = picked.topic!;
      const setups: Record<string, string> = {
        bounds: `a length recorded as ${n} m to the nearest metre`,
        proportion: `y being directly proportional to x, with y = ${n * k} when x = ${k}`,
        similarity: `two similar solids whose lengths are in the ratio 1 : ${k}`,
        probability: `${n} counters in a bag, ${k} of them red, with one counter drawn and not replaced`,
        statistics: `a box plot with an interquartile range of ${n} and a range of ${n * k}`
      };
      const answers: Record<string, string> = {
        bounds: `the true length is at least ${n - 0.5} m and less than ${n + 0.5} m`,
        proportion: `y = ${n}x for every pair of values`,
        similarity: `their volumes are in the ratio 1 : ${k * k * k}`,
        probability: `the second draw has only ${n - 1} counters to choose from`,
        statistics: `the middle half of the data is much less spread out than the whole data set`
      };
      const correct = answers[topic]!;
      const distractors = Object.entries(answers).filter(([t]) => t !== topic).map(([, a]) => a).slice(0, 3);
      return {
        prompt: `Consider ${setups[topic]}. Which statement must be true?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`This is a ${topic} question, and only one of the statements matches that situation.`],
        hints: ["Identify the topic first, then recall the single fact that always holds for it."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const topicFr: Record<string, string> = {
          bounds: "bornes", proportion: "proportionnalité", similarity: "similitude", probability: "probabilité", statistics: "statistiques"
        };
        const toFr = (text: string) => text
          .replace(/^a length recorded as (\S+) m to the nearest metre$/, "une longueur relevée à $1 m au mètre près")
          .replace(/^y being directly proportional to x, with y = (\d+) when x = (\d+)$/, "y directement proportionnel à x, avec y = $1 quand x = $2")
          .replace(/^two similar solids whose lengths are in the ratio 1 : (\d+)$/, "deux solides semblables dont les longueurs sont dans le rapport 1 : $1")
          .replace(/^(\d+) counters in a bag, (\d+) of them red, with one counter drawn and not replaced$/, "$1 jetons dans un sac, dont $2 rouges, avec un jeton tiré et non remis")
          .replace(/^a box plot with an interquartile range of (\d+) and a range of (\d+)$/, "une boîte à moustaches d'écart interquartile $1 et d'étendue $2")
          .replace(/^the true length is at least (\S+) m and less than (\S+) m$/, "la longueur réelle est au moins $1 m et strictement inférieure à $2 m")
          .replace(/^y = (\d+)x for every pair of values$/, "y = $1x pour chaque paire de valeurs")
          .replace(/^their volumes are in the ratio 1 : (\d+)$/, "leurs volumes sont dans le rapport 1 : $1")
          .replace(/^the second draw has only (\d+) counters to choose from$/, "le second tirage ne compte plus que $1 jetons possibles")
          .replace(/^the middle half of the data is much less spread out than the whole data set$/, "la moitié centrale des données est bien moins dispersée que l'ensemble des données");
        const m = drawn.prompt.match(/^Consider (.+)\. Which statement must be true\?$/);
        return {
          prompt: `Considère ${toFr(m ? m[1]! : "")}. Quelle affirmation est forcément vraie ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          explanationSteps: [`C'est une question de ${topicFr[picked.topic!]}, et une seule affirmation correspond à cette situation.`],
          hints: ["Identifie d'abord le thème, puis rappelle-toi le fait qui est toujours vrai dans ce cas."]
        };
      }
    },
    declaredVariationSpace: 5 * 38 * 8
  })
];

export default level;
