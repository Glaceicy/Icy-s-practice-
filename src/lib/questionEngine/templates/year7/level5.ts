import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 5 — "Ratio, proportion and scale"
const CTX = ["sweets", "marbles", "pencils", "stickers", "counters", "cards", "badges", "tokens"];
const CTX_FR = ["bonbons", "billes", "crayons", "autocollants", "jetons", "cartes", "badges", "jetons de jeu"];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y7-L5-1: use ratio notation, including reduction to simplest form ---
  categoricalPoolTemplate({
    key: "y7l5.simplifyRatio", levelKey: "Y7L5", objectiveCode: "Y7-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      let p = rng.int(1, 8);
      let q = rng.int(1, 8);
      while (gcd(p, q) !== 1) {
        p = rng.int(1, 8);
        q = rng.int(1, 8);
      }
      const k = rng.int(2, 6);
      const correct = `${p}:${q}`;
      return {
        prompt: `Simplify the ratio ${p * k}:${q * k} to its simplest form.`,
        correctLabel: correct,
        distractorLabels: [`${p * k}:${q * k}`, `${q}:${p}`],
        explanationSteps: [`${p * k} and ${q * k} share a common factor of ${k}.`, `Dividing both by ${k} gives ${correct}.`],
        hints: ["Divide both sides of the ratio by their highest common factor."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Simplify the ratio (\d+):(\d+)/);
        if (!m) return {};
        return {
          prompt: `Simplifie le rapport ${m[1]}:${m[2]} sous sa forme la plus simple.`,
          hints: ["Divise les deux termes du rapport par leur plus grand facteur commun."]
        };
      }
    },
    declaredVariationSpace: 400
  }),
  categoricalPoolTemplate({
    key: "y7l5.identifyEquivalentRatio", levelKey: "Y7L5", objectiveCode: "Y7-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const p = rng.int(1, 6);
      const q = rng.int(1, 6);
      const k = rng.int(2, 5);
      const wrongK = rng.int(2, 5);
      return {
        prompt: `Which ratio is equivalent to ${p}:${q}?`,
        correctLabel: `${p * k}:${q * k}`,
        distractorLabels: [`${p * k}:${q * wrongK === q * k ? q * (wrongK + 1) : q * wrongK}`, `${p + 1}:${q}`],
        explanationSteps: [`Multiplying both sides of ${p}:${q} by ${k} gives ${p * k}:${q * k}.`],
        hints: ["An equivalent ratio multiplies (or divides) both sides by the same number."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which ratio is equivalent to (\d+):(\d+)\?/);
        if (!m) return {};
        return { prompt: `Quel rapport est équivalent à ${m[1]}:${m[2]} ?`, hints: ["Un rapport équivalent multiplie (ou divise) les deux termes par le même nombre."] };
      }
    },
    declaredVariationSpace: 500
  }),
  categoricalPoolTemplate({
    key: "y7l5.tfRatioSimplestForm", levelKey: "Y7L5", objectiveCode: "Y7-L5-1", difficulty: "REASONING",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      let p = rng.int(1, 9);
      let q = rng.int(1, 9);
      while (gcd(p, q) !== 1) {
        p = rng.int(1, 9);
        q = rng.int(1, 9);
      }
      const showSimplest = rng.chance(0.5);
      if (!showSimplest) {
        const k = rng.int(2, 4);
        p *= k;
        q *= k;
      }
      return {
        prompt: `${p}:${q} is already in its simplest form. True or false?`,
        correctLabel: showSimplest ? "True" : "False",
        distractorLabels: [showSimplest ? "False" : "True"],
        explanationSteps: [showSimplest ? `${p} and ${q} share no common factor other than 1.` : `${p} and ${q} share a common factor greater than 1.`],
        hints: ["Check whether both sides of the ratio share a common factor other than 1."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+):(\d+) is already/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]}:${m[2]} est déjà sous sa forme la plus simple. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Vérifie si les deux termes du rapport partagent un facteur commun autre que 1."]
        };
      }
    },
    declaredVariationSpace: 500
  }),
  matchingTemplate({
    key: "y7l5.matchRatiosToSimplest", levelKey: "Y7L5", objectiveCode: "Y7-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      while (pairs.length < 3) {
        let p = rng.int(1, 7);
        let q = rng.int(1, 7);
        if (gcd(p, q) !== 1) continue;
        const key = `${p}:${q}`;
        if (used.has(key)) continue;
        used.add(key);
        const k = rng.int(2, 5);
        pairs.push({ left: `${p * k}:${q * k}`, right: key });
      }
      return pairs;
    },
    promptTemplates: ["Match each ratio to its simplest form."],
    explain: () => ["Divide both sides of the ratio by their highest common factor."],
    hints: () => ["Look for a common factor shared by both terms of the ratio."],
    fr: {
      promptTemplates: ["Associe chaque rapport à sa forme la plus simple."],
      explain: () => ["Divise les deux termes du rapport par leur plus grand facteur commun."],
      hints: () => ["Cherche un facteur commun partagé par les deux termes du rapport."]
    },
    declaredVariationSpace: 2000
  }),
  arithmeticTemplate({
    key: "y7l5.findCommonFactorForRatio", levelKey: "Y7L5", objectiveCode: "Y7-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 8], [1, 8], [2, 6]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[2]!,
    derive: (v) => ({ shownP: v[0]! * v[2]!, shownQ: v[1]! * v[2]! }),
    promptTemplates: ["What number simplifies {shownP}:{shownQ} to {a}:{b}?"],
    explain: (v, r) => [`${v[0]! * v[2]!} and ${v[1]! * v[2]!} share a highest common factor of ${r}.`],
    hints: () => ["Find the largest number that divides both terms of the ratio exactly."],
    fr: {
      promptTemplates: ["Quel nombre simplifie {shownP}:{shownQ} en {a}:{b} ?"],
      hints: () => ["Trouve le plus grand nombre qui divise exactement les deux termes du rapport."]
    },
    declaredVariationSpace: 8 * 8 * 5
  }),

  // --- Y7-L5-2: divide a given quantity into two or more parts in a given ratio ---
  arithmeticTemplate({
    key: "y7l5.divideInRatioFirstPart", levelKey: "Y7L5", objectiveCode: "Y7-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9], [1, 10]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: ["{total} is divided in the ratio {a}:{b}. What is the larger-numbered share (the part corresponding to {a})?", "Share {total} in the ratio {a}:{b}. What is the first part?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts.`, `${(v[0]! + v[1]!) * v[2]!} ÷ ${v[0]! + v[1]!} = ${v[2]} per part.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the ratio parts together, divide the total by that, then multiply by the first number."],
    fr: {
      promptTemplates: ["{total} est partagé dans le rapport {a}:{b}. Quelle est la part correspondant à {a} ?", "Partage {total} dans le rapport {a}:{b}. Quelle est la première part ?"],
      hints: () => ["Additionne les parts du rapport, divise le total par ce nombre, puis multiplie par le premier nombre."]
    },
    declaredVariationSpace: 9 * 9 * 10
  }),
  arithmeticTemplate({
    key: "y7l5.divideInRatioSecondPart", levelKey: "Y7L5", objectiveCode: "Y7-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9], [1, 10]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: ["{total} is divided in the ratio {a}:{b}. What is the part corresponding to {b}?", "Share {total} in the ratio {a}:{b}. What is the second part?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts.`, `${(v[0]! + v[1]!) * v[2]!} ÷ ${v[0]! + v[1]!} = ${v[2]} per part.`, `${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the ratio parts together, divide the total by that, then multiply by the second number."],
    fr: {
      promptTemplates: ["{total} est partagé dans le rapport {a}:{b}. Quelle est la part correspondant à {b} ?", "Partage {total} dans le rapport {a}:{b}. Quelle est la deuxième part ?"],
      hints: () => ["Additionne les parts du rapport, divise le total par ce nombre, puis multiplie par le second nombre."]
    },
    declaredVariationSpace: 9 * 9 * 10
  }),
  arithmeticTemplate({
    key: "y7l5.mcDivideInRatio", levelKey: "Y7L5", objectiveCode: "Y7-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [1, 9], [1, 10]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: ["{total} shared in the ratio {a}:{b} gives the first person how much?"],
    explain: (v, r) => [`Total parts = ${v[0]! + v[1]!}. Each part = ${v[2]}. First share = ${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the parts, divide the total by that, then multiply by the first ratio number."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["{total} partagé dans le rapport {a}:{b} donne combien à la première personne ?"],
      hints: () => ["Additionne les parts, divise le total par ce nombre, puis multiplie par le premier nombre du rapport."]
    },
    declaredVariationSpace: 9 * 9 * 10
  }),
  arithmeticTemplate({
    key: "y7l5.wordProblemDivideInRatio", levelKey: "Y7L5", objectiveCode: "Y7-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [1, 9], [1, 10]], constraint: (v) => gcd(v[0]!, v[1]!) === 1, contextPool: CTX,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: ["Two friends share {total} {ctx} in the ratio {a}:{b}. How many {ctx} does the first friend get?"],
    explain: (v, r) => [`Total parts = ${v[0]! + v[1]!}. Each part = ${v[2]}. First share = ${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the parts, divide the total by that, then multiply by the first ratio number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Deux amis partagent {total} {ctx} dans le rapport {a}:{b}. Combien de {ctx} le premier ami reçoit-il ?"],
      hints: () => ["Additionne les parts, divise le total par ce nombre, puis multiplie par le premier nombre du rapport."]
    },
    declaredVariationSpace: 9 * 9 * 10 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y7l5.tfDivideInRatio", levelKey: "Y7L5", objectiveCode: "Y7-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      let p = rng.int(1, 8);
      let q = rng.int(1, 8);
      while (gcd(p, q) !== 1) {
        p = rng.int(1, 8);
        q = rng.int(1, 8);
      }
      const unit = rng.int(1, 10);
      const total = (p + q) * unit;
      const correctFirst = p * unit;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correctFirst : correctFirst + rng.int(1, 5);
      return {
        prompt: `Sharing ${total} in the ratio ${p}:${q} gives the first share as ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${total} ÷ ${p + q} = ${unit} per part. ${p} x ${unit} = ${correctFirst}.`],
        hints: ["Add the parts, divide the total by that, then multiply by the first ratio number, to check."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Sharing (\d+) in the ratio (\d+):(\d+) gives the first share as (\d+)\. True or false\?/);
        if (!m) return {};
        const total = m[1]!, p = m[2]!, q = m[3]!, shown = m[4]!;
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Partager ${total} dans le rapport ${p}:${q} donne ${shown} pour la première part. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Additionne les parts, divise le total par ce nombre, puis multiplie par le premier nombre du rapport, pour vérifier."]
        };
      }
    },
    declaredVariationSpace: 500
  }),
  arithmeticTemplate({
    key: "y7l5.totalFromRatioPart", levelKey: "Y7L5", objectiveCode: "Y7-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9], [1, 10]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => (v[0]! + v[1]!) * v[2]!,
    derive: (v) => ({ firstShare: v[0]! * v[2]! }),
    promptTemplates: ["Two amounts are in the ratio {a}:{b}. The first amount is {firstShare}. What is the total of both amounts?"],
    explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]} per part.`, `${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, so the total is ${v[0]! + v[1]!} x ${v[2]} = ${r}.`],
    hints: () => ["Work out the value of one part, then multiply by the total number of parts."],
    fr: {
      promptTemplates: ["Deux montants sont dans le rapport {a}:{b}. Le premier montant est {firstShare}. Quel est le total des deux montants ?"],
      hints: () => ["Calcule la valeur d'une part, puis multiplie par le nombre total de parts."]
    },
    declaredVariationSpace: 9 * 9 * 10
  }),

  // --- Y7-L5-3: use scale factors, scale diagrams and maps ---
  arithmeticTemplate({
    key: "y7l5.scaleFactorEnlarge", levelKey: "Y7L5", objectiveCode: "Y7-L5-3", difficulty: "FLUENCY",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 25], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A shape with a side of {a} cm is enlarged by a scale factor of {b}. What is the new side length, in cm?", "A photo of {ctx} with a side of {a} cm is enlarged by a scale factor of {b}. What is the new side length, in cm?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the original length by the scale factor."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Une forme avec un côté de {a} cm est agrandie avec un facteur d'échelle de {b}. Quelle est la nouvelle longueur du côté, en cm ?", "Une photo de {ctx} avec un côté de {a} cm est agrandie avec un facteur d'échelle de {b}. Quelle est la nouvelle longueur du côté, en cm ?"],
      hints: () => ["Multiplie la longueur d'origine par le facteur d'échelle."]
    },
    declaredVariationSpace: 25 * 8 * (2 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y7l5.mapScaleDistance", levelKey: "Y7L5", objectiveCode: "Y7-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 20], [1000, 100000]], constraint: (v) => v[1]! % 1000 === 0,
    compute: (v) => (v[0]! * v[1]!) / 100000,
    derive: (v) => ({ scaleK: v[1]! / 1000 }),
    promptTemplates: ["A map has a scale of 1:{scaleK}000. A distance on the map measures {a} cm. How many km is this in real life?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!} cm.`, `${v[0]! * v[1]!} cm = ${r} km (divide by 100,000).`],
    hints: () => ["Multiply the map distance by the scale, then convert centimetres to kilometres."],
    fr: {
      promptTemplates: ["Une carte a une échelle de 1:{scaleK}000. Une distance sur la carte mesure {a} cm. Combien de km cela fait-il en réalité ?"],
      hints: () => ["Multiplie la distance sur la carte par l'échelle, puis convertis les centimètres en kilomètres."]
    },
    declaredVariationSpace: 2000
  }),
  arithmeticTemplate({
    key: "y7l5.mcScaleFactor", levelKey: "Y7L5", objectiveCode: "Y7-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20], [2, 6]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A length of {a} cm is enlarged by a scale factor of {b}. What is the new length?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the original length by the scale factor."],
    distractorSpread: 8,
    fr: {
      promptTemplates: ["Une longueur de {a} cm est agrandie avec un facteur d'échelle de {b}. Quelle est la nouvelle longueur ?"],
      hints: () => ["Multiplie la longueur d'origine par le facteur d'échelle."]
    },
    declaredVariationSpace: 100
  }),
  arithmeticTemplate({
    key: "y7l5.findScaleFactor", levelKey: "Y7L5", objectiveCode: "Y7-L5-3", difficulty: "REASONING",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 20], [2, 9]], compute: (v) => v[1]!,
    derive: (v) => ({ newLength: v[0]! * v[1]! }),
    promptTemplates: ["A shape's side grows from {a} cm to {newLength} cm after an enlargement. What is the scale factor?", "A diagram of {ctx} grows from {a} cm to {newLength} cm after an enlargement. What is the scale factor?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the new length by the original length."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Le côté d'une forme passe de {a} cm à {newLength} cm après un agrandissement. Quel est le facteur d'échelle ?", "Un schéma de {ctx} passe de {a} cm à {newLength} cm après un agrandissement. Quel est le facteur d'échelle ?"],
      hints: () => ["Divise la nouvelle longueur par la longueur d'origine."]
    },
    declaredVariationSpace: 20 * 8 * (2 + CTX.length)
  })
];

export default level;
