import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate, plural } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 5 — "Ratio and proportion"
const CTX = ["beads", "stickers", "marbles", "counters", "cards", "tiles", "sweets", "badges"];
const CTX_FR = ["perles", "autocollants", "billes", "jetons", "cartes", "carreaux", "bonbons", "badges"];
// Two pools, because the two contexts are not interchangeable: a ratio can
// mix paint or cement, but a recipe serving a number of people cannot.
const MIXTURES = ["flour and sugar", "red and blue paint", "juice and water", "sand and cement", "oats and raisins", "beans and rice", "seeds and soil", "milk and cocoa"];
const MIXTURES_FR = ["farine et sucre", "peinture rouge et bleue", "jus et eau", "sable et ciment", "avoine et raisins secs", "haricots et riz", "graines et terreau", "lait et cacao"];
const RECIPES = ["flour and sugar", "juice and water", "oats and raisins", "beans and rice", "milk and cocoa", "butter and sugar", "tomatoes and basil", "cheese and ham"];
const RECIPES_FR = ["farine et sucre", "jus et eau", "avoine et raisins secs", "haricots et riz", "lait et cacao", "beurre et sucre", "tomates et basilic", "fromage et jambon"];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y6-L5-1: relative sizes of two quantities using ratio language ---
  arithmeticTemplate({
    key: "y6l5.scaleUpRatio", levelKey: "Y6L5", objectiveCode: "Y6-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SCALING_ERROR"], type: "NUMBER_ENTRY", contextPool: MIXTURES,
    // 1:1 is excluded: "the ratio is 1:1, the first is 12, what is the second?"
    // is a real question with nothing in it to get wrong.
    ranges: [[1, 9], [1, 9], [2, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && !(v[0]! === 1 && v[1]! === 1),
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ scaled: v[0]! * v[2]! }),
    promptTemplates: [
      "A mixture uses {ctx} in the ratio {a}:{b}. If {scaled} units of the first are used, how much of the second is needed?",
      "Two quantities are in the ratio {a}:{b}. The first is {scaled}. What is the second?"
    ],
    explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}, the scale factor.`, `${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Work out what the first part was multiplied by, then apply the same multiplier to the second."],
    fr: {
      contextPool: MIXTURES_FR,
      promptTemplates: [
        "Un mélange utilise {ctx} dans le rapport {a}:{b}. Si on utilise {scaled} unités du premier, combien faut-il du second ?",
        "Deux quantités sont dans le rapport {a}:{b}. La première vaut {scaled}. Que vaut la seconde ?"
      ],
      explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}, le facteur d'échelle.`, `${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Détermine par combien la première part a été multipliée, puis applique le même facteur à la seconde."]
    },
    declaredVariationSpace: 9 * 9 * 11 * (1 + MIXTURES.length)
  }),
  arithmeticTemplate({
    key: "y6l5.simplifyRatioFirstTerm", levelKey: "Y6L5", objectiveCode: "Y6-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [1, 9], [2, 9]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && !(v[0]! === 1 && v[1]! === 1),
    compute: (v) => v[0]!,
    derive: (v) => ({ p: v[0]! * v[2]!, q: v[1]! * v[2]! }),
    promptTemplates: [
      "Simplify the ratio {p}:{q}. What is the first number in the simplest form?",
      "Counting {ctx} in the ratio {p}:{q}, what is the first number when simplified?"
    ],
    explain: (v, r) => [`Both divide by ${v[2]}.`, `${v[0]! * v[2]!} ÷ ${v[2]} = ${r}.`],
    hints: () => ["Divide both numbers by their highest common factor."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Simplifie le rapport {p}:{q}. Quel est le premier nombre sous sa forme la plus simple ?",
        "En comptant des {ctx} dans le rapport {p}:{q}, quel est le premier nombre une fois simplifié ?"
      ],
      explain: (v, r) => [`Les deux se divisent par ${v[2]}.`, `${v[0]! * v[2]!} ÷ ${v[2]} = ${r}.`],
      hints: () => ["Divise les deux nombres par leur plus grand facteur commun."]
    },
    declaredVariationSpace: 9 * 9 * 8 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.ratioTotalFromParts", levelKey: "Y6L5", objectiveCode: "Y6-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SCALING_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    // 1:1 is excluded: "the ratio is 1:1, the first is 12, what is the second?"
    // is a real question with nothing in it to get wrong.
    ranges: [[1, 9], [1, 9], [2, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && !(v[0]! === 1 && v[1]! === 1),
    compute: (v) => (v[0]! + v[1]!) * v[2]!,
    derive: (v) => ({ firstPart: v[0]! * v[2]! }),
    promptTemplates: [
      "Two groups of {ctx} are in the ratio {a}:{b}. The first group has {firstPart}. How many are there altogether?",
      "Two amounts are in the ratio {a}:{b}, and the first is {firstPart}. What is the total?"
    ],
    explain: (v, r) => [`One part is ${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}.`, `Total parts = ${v[0]! + v[1]!}, so the total is ${v[0]! + v[1]!} x ${v[2]} = ${r}.`],
    hints: () => ["Find the value of one part, then multiply by the total number of parts."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Deux groupes {de:ctx} sont dans le rapport {a}:{b}. Le premier groupe en a {firstPart}. Combien y en a-t-il en tout ?",
        "Deux quantités sont dans le rapport {a}:{b}, et la première vaut {firstPart}. Quel est le total ?"
      ],
      explain: (v, r) => [`Une part vaut ${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}.`, `Nombre total de parts = ${v[0]! + v[1]!}, donc le total est ${v[0]! + v[1]!} x ${v[2]} = ${r}.`],
      hints: () => ["Trouve la valeur d'une part, puis multiplie par le nombre total de parts."]
    },
    declaredVariationSpace: 9 * 9 * 11 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.mcRatioScaling", levelKey: "Y6L5", objectiveCode: "Y6-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SCALING_ERROR"], type: "MULTIPLE_CHOICE",
    // 1:1 is excluded: "the ratio is 1:1, the first is 12, what is the second?"
    // is a real question with nothing in it to get wrong.
    ranges: [[1, 9], [1, 9], [2, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && !(v[0]! === 1 && v[1]! === 1),
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ scaled: v[0]! * v[2]! }),
    promptTemplates: ["Two amounts are in the ratio {a}:{b}. If the first is {scaled}, what is the second?"],
    explain: (v, r) => [`The scale factor is ${v[2]}, so the second is ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Find the multiplier, then apply it to the other part."],
    distractorSpread: 8,
    fr: {
      promptTemplates: ["Deux quantités sont dans le rapport {a}:{b}. Si la première vaut {scaled}, que vaut la seconde ?"],
      hints: () => ["Trouve le multiplicateur, puis applique-le à l'autre part."]
    },
    declaredVariationSpace: 9 * 9 * 11
  }),
  matchingTemplate({
    key: "y6l5.matchRatiosToSimplest", levelKey: "Y6L5", objectiveCode: "Y6-L5-1", difficulty: "REASONING",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const p = rng.int(1, 8);
        const q = rng.int(1, 8);
        if (gcd(p, q) !== 1) continue;
        const key = `${p}:${q}`;
        if (used.has(key)) continue;
        used.add(key);
        const k = rng.int(2, 6);
        pairs.push({ left: `${p * k}:${q * k}`, right: key });
      }
      return pairs;
    },
    promptTemplates: ["Match each ratio to its simplest form."],
    explain: () => ["Divide both parts of the ratio by their highest common factor."],
    hints: () => ["Look for a number that divides both parts exactly."],
    fr: {
      promptTemplates: ["Associe chaque rapport à sa forme la plus simple."],
      explain: () => ["Divise les deux termes du rapport par leur plus grand facteur commun."],
      hints: () => ["Cherche un nombre qui divise exactement les deux termes."]
    },
    declaredVariationSpace: 3000
  }),

  // --- Y6-L5-2: unequal sharing and grouping ---
  arithmeticTemplate({
    key: "y6l5.unequalSharingLargerShare", levelKey: "Y6L5", objectiveCode: "Y6-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [1, 9], [2, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && v[0]! > v[1]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: [
      "{total} {ctx} are shared in the ratio {a}:{b}. How many are in the larger share?",
      "Share {total} in the ratio {a}:{b}. What is the larger share?"
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, each worth ${v[2]}.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the parts, divide the total by that, then multiply by the larger ratio number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{total} {ctx} sont partagés dans le rapport {a}:{b}. Combien y en a-t-il dans la plus grande part ?",
        "Partage {total} dans le rapport {a}:{b}. Quelle est la plus grande part ?"
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, chacune valant ${v[2]}.`, `${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Additionne les parts, divise le total par ce nombre, puis multiplie par le plus grand terme du rapport."]
    },
    declaredVariationSpace: 9 * 9 * 11 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.unequalSharingDifference", levelKey: "Y6L5", objectiveCode: "Y6-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [1, 9], [2, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && v[0]! > v[1]!,
    compute: (v) => (v[0]! - v[1]!) * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: [
      "{total} {ctx} are shared in the ratio {a}:{b}. How many more does the larger share have than the smaller?",
      "Sharing {total} in the ratio {a}:{b}, what is the difference between the two shares?"
    ],
    explain: (v, r) => [`One part is ${v[2]}.`, `The shares differ by ${v[0]} - ${v[1]} = ${v[0]! - v[1]!} ${plural(v[0]! - v[1]!, "parts", "part")}, so ${v[0]! - v[1]!} x ${v[2]} = ${r}.`],
    hints: () => ["Work out the value of one part, then multiply by the difference in the ratio numbers."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{total} {ctx} sont partagés dans le rapport {a}:{b}. Combien la plus grande part en a-t-elle de plus que la plus petite ?",
        "En partageant {total} dans le rapport {a}:{b}, quelle est la différence entre les deux parts ?"
      ],
      explain: (v, r) => [`Une part vaut ${v[2]}.`, `Les parts diffèrent de ${v[0]} - ${v[1]} = ${v[0]! - v[1]!} ${plural(v[0]! - v[1]!, "parts", "part")}, donc ${v[0]! - v[1]!} x ${v[2]} = ${r}.`],
      hints: () => ["Calcule la valeur d'une part, puis multiplie par la différence des termes du rapport."]
    },
    declaredVariationSpace: 9 * 9 * 11 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.fractionOfGroupFromRatio", levelKey: "Y6L5", objectiveCode: "Y6-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [1, 9]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "A group of {ctx} is split in the ratio {a}:{b}. The first share is {a} out of how many equal parts?",
      "In the ratio {a}:{b}, how many equal parts is the whole divided into?"
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r} parts altogether.`],
    hints: () => ["Add the two ratio numbers to find how many parts make the whole."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Un groupe {de:ctx} est partagé dans le rapport {a}:{b}. La première part vaut {a} sur combien de parts égales ?",
        "Dans le rapport {a}:{b}, en combien de parts égales le tout est-il divisé ?"
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r} parts en tout.`],
      hints: () => ["Additionne les deux termes du rapport pour trouver le nombre de parts du tout."]
    },
    declaredVariationSpace: 9 * 9 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.wordProblemUnequalSharing", levelKey: "Y6L5", objectiveCode: "Y6-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    // 1:1 is excluded: "the ratio is 1:1, the first is 12, what is the second?"
    // is a real question with nothing in it to get wrong.
    ranges: [[1, 9], [1, 9], [2, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1 && !(v[0]! === 1 && v[1]! === 1),
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: ["Two friends share {total} {ctx} in the ratio {a}:{b}. How many does the second friend get?"],
    explain: (v, r) => [`One part is ${v[2]}.`, `${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Find one part, then multiply by the second ratio number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Deux amis partagent {total} {ctx} dans le rapport {a}:{b}. Combien le second ami en reçoit-il ?"],
      explain: (v, r) => [`Une part vaut ${v[2]}.`, `${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Trouve une part, puis multiplie par le second terme du rapport."]
    },
    declaredVariationSpace: 9 * 9 * 11 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y6l5.tfRatioShare", levelKey: "Y6L5", objectiveCode: "Y6-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      let p = rng.int(1, 8);
      let q = rng.int(1, 8);
      while (gcd(p, q) !== 1) {
        p = rng.int(1, 8);
        q = rng.int(1, 8);
      }
      const unit = rng.int(2, 12);
      const total = (p + q) * unit;
      const correct = p * unit;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correct : correct + rng.int(1, 8);
      return {
        prompt: `Sharing ${total} in the ratio ${p}:${q} gives a first share of ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${total} ÷ ${p + q} = ${unit}, and ${p} x ${unit} = ${correct}.`],
        hints: ["Add the parts, divide the total, then multiply — and compare."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Sharing (\d+) in the ratio (\d+):(\d+) gives a first share of (\d+)\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Partager ${m[1]} dans le rapport ${m[2]}:${m[3]} donne une première part de ${m[4]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Additionne les parts, divise le total, puis multiplie — et compare."]
        };
      }
    },
    declaredVariationSpace: 3000
  }),

  // --- Y6-L5-3: scale factors ---
  arithmeticTemplate({
    key: "y6l5.scaleFactorNewLength", levelKey: "Y6L5", objectiveCode: "Y6-L5-3", difficulty: "FLUENCY",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 30], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A length of {a} cm is enlarged by scale factor {b}. What is the new length, in cm?",
      "A picture of {ctx} has a side of {a} cm, enlarged by scale factor {b}. What is the new side length, in cm?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the original length by the scale factor."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une longueur de {a} cm est agrandie avec un facteur d'échelle de {b}. Quelle est la nouvelle longueur, en cm ?",
        "Une image {de:ctx} a un côté de {a} cm, agrandi avec un facteur d'échelle de {b}. Quelle est la nouvelle longueur, en cm ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie la longueur d'origine par le facteur d'échelle."]
    },
    declaredVariationSpace: 30 * 8 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.findScaleFactor", levelKey: "Y6L5", objectiveCode: "Y6-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 25], [2, 9]], compute: (v) => v[1]!,
    derive: (v) => ({ newLength: v[0]! * v[1]! }),
    promptTemplates: [
      "A shape's side grows from {a} cm to {newLength} cm. What is the scale factor?",
      "A drawing of {ctx} grows from {a} cm to {newLength} cm. What is the scale factor?"
    ],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the new length by the original length."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Le côté d'une forme passe de {a} cm à {newLength} cm. Quel est le facteur d'échelle ?",
        "Un dessin {de:ctx} passe de {a} cm à {newLength} cm. Quel est le facteur d'échelle ?"
      ],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Divise la nouvelle longueur par la longueur d'origine."]
    },
    declaredVariationSpace: 25 * 8 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.scaleDownLength", levelKey: "Y6L5", objectiveCode: "Y6-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 30], [2, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ bigLength: v[0]! * v[1]! }),
    promptTemplates: [
      "A length of {bigLength} cm is reduced by scale factor {b} (divided by {b}). What is the new length, in cm?",
      "A model of {ctx} is {bigLength} cm long and is scaled down by a factor of {b}. How long is the model now, in cm?"
    ],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Scaling down divides the length by the scale factor."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une longueur de {bigLength} cm est réduite par un facteur d'échelle de {b} (divisée par {b}). Quelle est la nouvelle longueur, en cm ?",
        "Un modèle {de:ctx} mesure {bigLength} cm et est réduit d'un facteur {b}. Combien mesure-t-il maintenant, en cm ?"
      ],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Réduire divise la longueur par le facteur d'échelle."]
    },
    declaredVariationSpace: 30 * 8 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l5.mcScaleFactor", levelKey: "Y6L5", objectiveCode: "Y6-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 30], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A side of {a} cm is enlarged by scale factor {b}. What is the new length?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply by the scale factor."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Un côté de {a} cm est agrandi avec un facteur d'échelle de {b}. Quelle est la nouvelle longueur ?"],
      hints: () => ["Multiplie par le facteur d'échelle."]
    },
    declaredVariationSpace: 30 * 8
  }),
  arithmeticTemplate({
    key: "y6l5.wordProblemScaleRecipe", levelKey: "Y6L5", objectiveCode: "Y6-L5-3", difficulty: "REASONING",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "WORD_PROBLEM", contextPool: RECIPES,
    ranges: [[1, 20], [2, 8], [2, 10]], compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ servings: v[1]!, newServings: v[1]! * v[2]! }),
    promptTemplates: ["A recipe using {ctx} needs {a} grams to serve {servings} people. How many grams are needed to serve {newServings} people?"],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}, the scale factor.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Work out how many times bigger the new number of servings is, then scale the amount by the same factor."],
    fr: {
      contextPool: RECIPES_FR,
      promptTemplates: ["Une recette avec {ctx} nécessite {a} grammes pour {servings} personnes. Combien de grammes faut-il pour {newServings} personnes ?"],
      explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}, le facteur d'échelle.`, `${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Calcule combien de fois le nombre de personnes a augmenté, puis multiplie la quantité par ce facteur."]
    },
    declaredVariationSpace: 20 * 7 * 9 * RECIPES.length
  })
];

export default level;
