import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 3 — "Fractions and mixed numbers"
// Fraction answers are always asked for as a single numerator over a stated
// denominator (or as a whole number), never as a compound "n/d" string, so the
// typed answer always matches the stored answer key exactly.
const CTX = ["cakes", "pizzas", "ribbons", "jugs", "chocolate bars", "paper strips", "fields", "tanks"];
const CTX_FR = ["gâteaux", "pizzas", "rubans", "pichets", "tablettes de chocolat", "bandes de papier", "champs", "réservoirs"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L3-1: add and subtract fractions with different denominators ---
  arithmeticTemplate({
    key: "y6l3.addFractionsDifferentDenominators", levelKey: "Y6L3", objectiveCode: "Y6-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 9], [2, 10]],
    constraint: (v) => v[0]! < v[1]! && v[2]! < v[3]! && v[1]! !== v[3]!,
    compute: (v) => v[0]! * v[3]! + v[2]! * v[1]!,
    derive: (v) => ({ common: v[1]! * v[3]! }),
    promptTemplates: [
      "{a}/{b} + {c}/{d} is written over the common denominator {common}. What is the numerator?",
      "Sharing {ctx}: {a}/{b} + {c}/{d} over a common denominator of {common} gives what numerator?"
    ],
    explain: (v, r) => [`Use a common denominator of ${v[1]! * v[3]!}.`, `${v[0]} x ${v[3]} = ${v[0]! * v[3]!} and ${v[2]} x ${v[1]} = ${v[2]! * v[1]!}.`, `${v[0]! * v[3]!} + ${v[2]! * v[1]!} = ${r}.`],
    hints: () => ["Multiply the denominators to get a common denominator, scale each numerator to match, then add."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}/{b} + {c}/{d} est écrit sur le dénominateur commun {common}. Quel est le numérateur ?",
        "En partageant des {ctx} : {a}/{b} + {c}/{d} sur un dénominateur commun de {common} donne quel numérateur ?"
      ],
      explain: (v, r) => [`Utilise un dénominateur commun de ${v[1]! * v[3]!}.`, `${v[0]} x ${v[3]} = ${v[0]! * v[3]!} et ${v[2]} x ${v[1]} = ${v[2]! * v[1]!}.`, `${v[0]! * v[3]!} + ${v[2]! * v[1]!} = ${r}.`],
      hints: () => ["Multiplie les dénominateurs pour obtenir un dénominateur commun, adapte chaque numérateur, puis additionne."]
    },
    declaredVariationSpace: 3000
  }),
  arithmeticTemplate({
    key: "y6l3.subtractFractionsDifferentDenominators", levelKey: "Y6L3", objectiveCode: "Y6-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 9], [2, 10]],
    constraint: (v) => v[0]! < v[1]! && v[2]! < v[3]! && v[1]! !== v[3]! && v[0]! * v[3]! > v[2]! * v[1]!,
    compute: (v) => v[0]! * v[3]! - v[2]! * v[1]!,
    derive: (v) => ({ common: v[1]! * v[3]! }),
    promptTemplates: [
      "{a}/{b} - {c}/{d} is written over the common denominator {common}. What is the numerator?",
      "Measuring {ctx}: {a}/{b} - {c}/{d} over a common denominator of {common} gives what numerator?"
    ],
    explain: (v, r) => [`Common denominator ${v[1]! * v[3]!}.`, `${v[0]! * v[3]!} - ${v[2]! * v[1]!} = ${r}.`],
    hints: () => ["Rewrite both fractions over the same denominator, then subtract the numerators."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}/{b} - {c}/{d} est écrit sur le dénominateur commun {common}. Quel est le numérateur ?",
        "En mesurant des {ctx} : {a}/{b} - {c}/{d} sur un dénominateur commun de {common} donne quel numérateur ?"
      ],
      explain: (v, r) => [`Dénominateur commun ${v[1]! * v[3]!}.`, `${v[0]! * v[3]!} - ${v[2]! * v[1]!} = ${r}.`],
      hints: () => ["Réécris les deux fractions sur le même dénominateur, puis soustrais les numérateurs."]
    },
    declaredVariationSpace: 3000
  }),
  arithmeticTemplate({
    key: "y6l3.addMixedNumbersWhole", levelKey: "Y6L3", objectiveCode: "Y6-L3-1", difficulty: "REASONING",
    misconceptionTags: ["MIXED_NUMBER_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 12], [1, 12], [2, 12], [1, 11]], constraint: (v) => v[3]! < v[2]!,
    compute: (v) => v[0]! + v[1]! + 1,
    derive: (v) => ({ n1: v[3]!, n2: v[2]! - v[3]! }),
    promptTemplates: [
      "{a} {n1}/{c} + {b} {n2}/{c} = ? (give the answer as a whole number)",
      "Two {ctx} measure {a} {n1}/{c} and {b} {n2}/{c}. What is the total, as a whole number?"
    ],
    explain: (v, r) => [`The fraction parts make a whole: ${v[3]}/${v[2]} + ${v[2]! - v[3]!}/${v[2]} = 1.`, `${v[0]} + ${v[1]} + 1 = ${r}.`],
    hints: () => ["Add the whole numbers, then check whether the fraction parts combine into another whole."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a} {n1}/{c} + {b} {n2}/{c} = ? (donne la réponse sous forme de nombre entier)",
        "Deux {ctx} mesurent {a} {n1}/{c} et {b} {n2}/{c}. Quel est le total, en nombre entier ?"
      ],
      explain: (v, r) => [`Les parties fractionnaires font un entier : ${v[3]}/${v[2]} + ${v[2]! - v[3]!}/${v[2]} = 1.`, `${v[0]} + ${v[1]} + 1 = ${r}.`],
      hints: () => ["Additionne les nombres entiers, puis vérifie si les fractions forment un entier de plus."]
    },
    declaredVariationSpace: 2000
  }),
  arithmeticTemplate({
    key: "y6l3.mcAddFractions", levelKey: "Y6L3", objectiveCode: "Y6-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [2, 10], [1, 9], [2, 10]],
    constraint: (v) => v[0]! < v[1]! && v[2]! < v[3]! && v[1]! !== v[3]!,
    compute: (v) => v[0]! * v[3]! + v[2]! * v[1]!,
    derive: (v) => ({ common: v[1]! * v[3]! }),
    promptTemplates: ["Over a common denominator of {common}, what is the numerator of {a}/{b} + {c}/{d}?"],
    explain: (v, r) => [`${v[0]! * v[3]!} + ${v[2]! * v[1]!} = ${r}.`],
    hints: () => ["Scale each numerator to match the common denominator, then add."],
    distractorSpread: 6,
    fr: {
      promptTemplates: ["Sur un dénominateur commun de {common}, quel est le numérateur de {a}/{b} + {c}/{d} ?"],
      hints: () => ["Adapte chaque numérateur au dénominateur commun, puis additionne."]
    },
    declaredVariationSpace: 3000
  }),
  arithmeticTemplate({
    key: "y6l3.findCommonDenominator", levelKey: "Y6L3", objectiveCode: "Y6-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 12], [2, 12]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Multiplying the denominators of a fraction with denominator {a} and one with denominator {b} gives which common denominator?",
      "Working with {ctx}: multiplying denominators {a} and {b} gives which common denominator?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiplying the two denominators always gives a usable common denominator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "En multipliant les dénominateurs d'une fraction de dénominateur {a} et d'une autre de dénominateur {b}, quel dénominateur commun obtient-on ?",
        "En travaillant avec des {ctx} : multiplier les dénominateurs {a} et {b} donne quel dénominateur commun ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplier les deux dénominateurs donne toujours un dénominateur commun utilisable."]
    },
    declaredVariationSpace: 11 * 11 * (1 + CTX.length)
  }),

  // --- Y6-L3-2: multiply simple pairs of proper fractions ---
  arithmeticTemplate({
    key: "y6l3.multiplyFractionsNumerator", levelKey: "Y6L3", objectiveCode: "Y6-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 9], [2, 10]],
    constraint: (v) => v[0]! < v[1]! && v[2]! < v[3]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ bottom: v[1]! * v[3]! }),
    promptTemplates: [
      "{a}/{b} x {c}/{d} = ?/{bottom} (give the numerator)",
      "Working with {ctx}: {a}/{b} x {c}/{d} over {bottom} gives what numerator?"
    ],
    explain: (v, r) => [`Multiply the numerators: ${v[0]} x ${v[2]} = ${r}.`, `The denominators give ${v[1]} x ${v[3]} = ${v[1]! * v[3]!}.`],
    hints: () => ["To multiply fractions, multiply the numerators together and the denominators together."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}/{b} x {c}/{d} = ?/{bottom} (donne le numérateur)",
        "En travaillant avec des {ctx} : {a}/{b} x {c}/{d} sur {bottom} donne quel numérateur ?"
      ],
      explain: (v, r) => [`Multiplie les numérateurs : ${v[0]} x ${v[2]} = ${r}.`, `Les dénominateurs donnent ${v[1]} x ${v[3]} = ${v[1]! * v[3]!}.`],
      hints: () => ["Pour multiplier des fractions, multiplie les numérateurs entre eux et les dénominateurs entre eux."]
    },
    declaredVariationSpace: 3000
  }),
  arithmeticTemplate({
    key: "y6l3.multiplyFractionsDenominator", levelKey: "Y6L3", objectiveCode: "Y6-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 9], [2, 10]],
    constraint: (v) => v[0]! < v[1]! && v[2]! < v[3]!,
    compute: (v) => v[1]! * v[3]!,
    derive: (v) => ({ top: v[0]! * v[2]! }),
    promptTemplates: [
      "{a}/{b} x {c}/{d} = {top}/? (give the denominator)",
      "Working with {ctx}: {a}/{b} x {c}/{d} has numerator {top}. What is the denominator?"
    ],
    explain: (v, r) => [`Multiply the denominators: ${v[1]} x ${v[3]} = ${r}.`],
    hints: () => ["The denominator of the product is the two denominators multiplied together."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}/{b} x {c}/{d} = {top}/? (donne le dénominateur)",
        "En travaillant avec des {ctx} : {a}/{b} x {c}/{d} a pour numérateur {top}. Quel est le dénominateur ?"
      ],
      explain: (v, r) => [`Multiplie les dénominateurs : ${v[1]} x ${v[3]} = ${r}.`],
      hints: () => ["Le dénominateur du produit est le produit des deux dénominateurs."]
    },
    declaredVariationSpace: 3000
  }),
  arithmeticTemplate({
    key: "y6l3.fractionOfQuantity", levelKey: "Y6L3", objectiveCode: "Y6-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 12]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ amount: v[1]! * v[2]! }),
    promptTemplates: ["A tray holds {amount} {ctx}. {a}/{b} of them are used. How many are used?"],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
    hints: () => ["Divide by the denominator, then multiply by the numerator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un plateau contient {amount} {ctx}. {a}/{b} d'entre eux sont utilisés. Combien en utilise-t-on ?"],
      explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
      hints: () => ["Divise par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 9 * 9 * 12 * CTX.length
  }),
  arithmeticTemplate({
    key: "y6l3.mcMultiplyFractions", levelKey: "Y6L3", objectiveCode: "Y6-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [2, 10], [1, 9], [2, 10]],
    constraint: (v) => v[0]! < v[1]! && v[2]! < v[3]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ bottom: v[1]! * v[3]! }),
    promptTemplates: ["What is the numerator of {a}/{b} x {c}/{d}, written over {bottom}?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply the numerators."],
    distractorSpread: 5,
    fr: {
      promptTemplates: ["Quel est le numérateur de {a}/{b} x {c}/{d}, écrit sur {bottom} ?"],
      hints: () => ["Multiplie les numérateurs."]
    },
    declaredVariationSpace: 3000
  }),
  matchingTemplate({
    key: "y6l3.matchFractionProducts", levelKey: "Y6L3", objectiveCode: "Y6-L3-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const b = rng.int(2, 9);
        const a = rng.int(1, b - 1);
        const d = rng.int(2, 9);
        const c = rng.int(1, d - 1);
        const key = `${a}/${b}x${c}/${d}`;
        if (used.has(key)) continue;
        used.add(key);
        pairs.push({ left: `${a}/${b} x ${c}/${d}`, right: `${a * c}/${b * d}` });
      }
      return pairs;
    },
    promptTemplates: ["Match each fraction multiplication to its answer."],
    explain: () => ["Multiply the numerators together, and the denominators together."],
    hints: () => ["Top times top, bottom times bottom."],
    fr: {
      promptTemplates: ["Associe chaque multiplication de fractions à son résultat."],
      explain: () => ["Multiplie les numérateurs entre eux, et les dénominateurs entre eux."],
      hints: () => ["Haut fois haut, bas fois bas."]
    },
    declaredVariationSpace: 4000
  }),

  // --- Y6-L3-3: divide proper fractions by whole numbers ---
  arithmeticTemplate({
    key: "y6l3.divideFractionByWholeDenominator", levelKey: "Y6L3", objectiveCode: "Y6-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 12], [2, 8]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[1]! * v[2]!,
    promptTemplates: [
      "{a}/{b} ÷ {c} = {a}/? (give the denominator)",
      "Sharing {ctx}: {a}/{b} ÷ {c} keeps the numerator {a}. What is the new denominator?"
    ],
    explain: (v, r) => [`Dividing by ${v[2]} multiplies the denominator by ${v[2]}.`, `${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Dividing a fraction by a whole number makes the denominator that many times bigger."],
    visualAid: (v) => visuals.fractionDiagram(v[0]!, v[1]!),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}/{b} ÷ {c} = {a}/? (donne le dénominateur)",
        "En partageant des {ctx} : {a}/{b} ÷ {c} garde le numérateur {a}. Quel est le nouveau dénominateur ?"
      ],
      explain: (v, r) => [`Diviser par ${v[2]} multiplie le dénominateur par ${v[2]}.`, `${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Diviser une fraction par un nombre entier rend le dénominateur d'autant plus grand."]
    },
    declaredVariationSpace: 9 * 11 * 7 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l3.divideFractionExactNumerator", levelKey: "Y6L3", objectiveCode: "Y6-L3-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 12], [2, 6]], constraint: (v) => v[0]! * v[2]! < v[1]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ top: v[0]! * v[2]! }),
    promptTemplates: [
      "{top}/{b} ÷ {c} = ?/{b} (give the numerator)",
      "Sharing {ctx}: {top}/{b} ÷ {c} over {b} gives what numerator?"
    ],
    explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[2]} = ${r}, and the denominator stays ${v[1]}.`],
    hints: () => ["Here the numerator divides exactly, so divide it and keep the denominator the same."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{top}/{b} ÷ {c} = ?/{b} (donne le numérateur)",
        "En partageant des {ctx} : {top}/{b} ÷ {c} sur {b} donne quel numérateur ?"
      ],
      explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[2]} = ${r}, et le dénominateur reste ${v[1]}.`],
      hints: () => ["Ici le numérateur se divise exactement, donc divise-le et garde le même dénominateur."]
    },
    declaredVariationSpace: 2000
  }),
  arithmeticTemplate({
    key: "y6l3.mcDivideFractionByWhole", levelKey: "Y6L3", objectiveCode: "Y6-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [2, 12], [2, 8]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[1]! * v[2]!,
    promptTemplates: ["{a}/{b} ÷ {c} keeps numerator {a}. What is the new denominator?"],
    explain: (v, r) => [`${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply the denominator by the whole number."],
    distractorSpread: 8,
    fr: {
      promptTemplates: ["{a}/{b} ÷ {c} garde le numérateur {a}. Quel est le nouveau dénominateur ?"],
      hints: () => ["Multiplie le dénominateur par le nombre entier."]
    },
    declaredVariationSpace: 9 * 11 * 7
  }),
  arithmeticTemplate({
    key: "y6l3.wordProblemDivideFraction", levelKey: "Y6L3", objectiveCode: "Y6-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1, 9], [2, 12], [2, 8]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[1]! * v[2]!,
    promptTemplates: ["{a}/{b} of a batch of {ctx} is shared equally between {c} people. Each share is {a}/? of the batch. What is the denominator?"],
    explain: (v, r) => [`Dividing by ${v[2]} gives a denominator of ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Sharing a fraction between more people makes each piece smaller — the denominator grows."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a}/{b} d'un lot {de:ctx} est partagé également entre {c} personnes. Chaque part vaut {a}/? du lot. Quel est le dénominateur ?"],
      explain: (v, r) => [`Diviser par ${v[2]} donne un dénominateur de ${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Partager une fraction entre plus de personnes rend chaque part plus petite — le dénominateur grandit."]
    },
    declaredVariationSpace: 9 * 11 * 7 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y6l3.tfFractionOperations", levelKey: "Y6L3", objectiveCode: "Y6-L3-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const b = rng.int(2, 10);
      const a = rng.int(1, b - 1);
      const c = rng.int(2, 8);
      const correctDen = b * c;
      const showTrue = rng.chance(0.5);
      const shownDen = showTrue ? correctDen : correctDen + rng.int(1, 6);
      return {
        prompt: `${a}/${b} ÷ ${c} = ${a}/${shownDen}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`Dividing by ${c} multiplies the denominator: ${b} x ${c} = ${correctDen}.`],
        hints: ["Dividing a fraction by a whole number multiplies the denominator by it."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) ÷ (\d+) = (\d+)\/(\d+)\. True or false\?/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]}/${m[2]} ÷ ${m[3]} = ${m[4]}/${m[5]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`Diviser par ${m[3]} multiplie le dénominateur.`],
          hints: ["Diviser une fraction par un nombre entier multiplie son dénominateur par ce nombre."]
        };
      }
    },
    declaredVariationSpace: 2000
  })
];

export default level;
