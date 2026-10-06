import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 3 — "Fractions and mixed numbers"
const CTX = ["sweets", "marbles", "pencils", "stickers", "counters", "cards", "badges", "tokens"];
const CTX_FR = ["bonbons", "billes", "crayons", "autocollants", "jetons", "cartes", "badges", "jetons de jeu"];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y7-L3-1: simplify fractions by identifying common factors ---
  categoricalPoolTemplate({
    key: "y7l3.mcSimplifyFraction", levelKey: "Y7L3", objectiveCode: "Y7-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_SIMPLIFY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const num = rng.int(1, 6);
      const den = rng.int(num + 1, 10);
      const g = gcd(num, den);
      const simpNum = num / g;
      const simpDen = den / g;
      const k = rng.int(2, 6);
      const shownNum = num * k;
      const shownDen = den * k;
      const correct = g > 1 ? `${simpNum}/${simpDen}` : `${num}/${den}`;
      return {
        prompt: `Simplify ${shownNum}/${shownDen} to its simplest form.`,
        correctLabel: correct,
        distractorLabels: [`${shownNum}/${shownDen}`, `${num}/${den === shownDen ? den + 1 : den}`],
        explanationSteps: [`${shownNum} and ${shownDen} share a common factor of ${g * (shownNum / num / k || 1)}.`, `Dividing both by that factor gives ${correct}.`],
        hints: ["Find the highest common factor of the numerator and denominator, then divide both by it."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Simplify (\d+)\/(\d+) to its simplest form\./);
        if (!m) return {};
        return {
          prompt: `Simplifie ${m[1]}/${m[2]} sous sa forme la plus simple.`,
          explanationSteps: [`Le numérateur et le dénominateur ont un facteur commun.`, `Diviser les deux par ce facteur donne ${drawn.correctLabel}.`],
          hints: ["Trouve le plus grand facteur commun du numérateur et du dénominateur, puis divise les deux par ce facteur."]
        };
      }
    },
    declaredVariationSpace: 6 * 9 * 5
  }),
  arithmeticTemplate({
    key: "y7l3.findHCFForSimplifying", levelKey: "Y7L3", objectiveCode: "Y7-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_SIMPLIFY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [2, 10], [2, 6]], constraint: (v) => v[0]! < v[1]! && gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[2]!,
    derive: (v) => ({ shownNum: v[0]! * v[2]!, shownDen: v[1]! * v[2]! }),
    promptTemplates: ["What is the highest common factor used to simplify {shownNum}/{shownDen} to {a}/{b}?"],
    explain: (v, r) => [`${v[0]! * v[2]!} and ${v[1]! * v[2]!} share a highest common factor of ${r}.`],
    hints: () => ["Divide both the numerator and denominator by the same number until they share no more common factors."],
    fr: {
      promptTemplates: ["Quel est le plus grand facteur commun utilisé pour simplifier {shownNum}/{shownDen} en {a}/{b} ?"],
      hints: () => ["Divise le numérateur et le dénominateur par le même nombre jusqu'à ce qu'ils n'aient plus de facteur commun."]
    },
    declaredVariationSpace: 9 * 10 * 5
  }),
  categoricalPoolTemplate({
    key: "y7l3.tfSimplestForm", levelKey: "Y7L3", objectiveCode: "Y7-L3-1", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_SIMPLIFY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const showSimplest = rng.chance(0.5);
      let num = rng.int(1, 9);
      let den = rng.int(num + 1, 12);
      while (gcd(num, den) !== 1) {
        num = rng.int(1, 9);
        den = rng.int(num + 1, 12);
      }
      if (!showSimplest) {
        const k = rng.int(2, 4);
        num *= k;
        den *= k;
      }
      return {
        prompt: `${num}/${den} is already in its simplest form. True or false?`,
        correctLabel: showSimplest ? "True" : "False",
        distractorLabels: [showSimplest ? "False" : "True"],
        explanationSteps: [showSimplest ? `${num} and ${den} share no common factor other than 1.` : `${num} and ${den} share a common factor greater than 1, so it can be simplified further.`],
        hints: ["Check whether the numerator and denominator share any common factor other than 1."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) is already/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]}/${m[2]} est déjà sous sa forme la plus simple. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: isTrue ? [`${m[1]} et ${m[2]} n'ont aucun facteur commun autre que 1.`] : [`${m[1]} et ${m[2]} ont un facteur commun supérieur à 1, donc la fraction peut être simplifiée davantage.`],
          hints: ["Vérifie si le numérateur et le dénominateur partagent un facteur commun autre que 1."]
        };
      }
    },
    declaredVariationSpace: 500
  }),
  matchingTemplate({
    key: "y7l3.matchFractionsToSimplestForm", levelKey: "Y7L3", objectiveCode: "Y7-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_SIMPLIFY_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      while (pairs.length < 3) {
        let num = rng.int(1, 8);
        let den = rng.int(num + 1, 12);
        if (gcd(num, den) !== 1) continue;
        const key = `${num}/${den}`;
        if (used.has(key)) continue;
        used.add(key);
        const k = rng.int(2, 5);
        pairs.push({ left: `${num * k}/${den * k}`, right: `${num}/${den}` });
      }
      return pairs;
    },
    promptTemplates: ["Match each fraction to its simplest form."],
    explain: () => ["Divide the numerator and denominator by their highest common factor."],
    hints: () => ["Look for a common factor shared by the numerator and denominator."],
    fr: {
      promptTemplates: ["Associe chaque fraction à sa forme la plus simple."],
      explain: () => ["Divise le numérateur et le dénominateur par leur plus grand facteur commun."],
      hints: () => ["Cherche un facteur commun partagé par le numérateur et le dénominateur."]
    },
    declaredVariationSpace: 2500
  }),
  categoricalPoolTemplate({
    key: "y7l3.mcIdentifyCommonFactor", levelKey: "Y7L3", objectiveCode: "Y7-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_SIMPLIFY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const factor = rng.int(2, 6);
      const num = factor * rng.int(1, 5);
      const den = factor * rng.int(num / factor + 1, num / factor + 5);
      const wrong1 = factor + rng.int(1, 3);
      const wrong2 = Math.max(2, factor - 1);
      return {
        prompt: `Which number is a common factor of ${num} and ${den}?`,
        correctLabel: String(factor),
        distractorLabels: [String(wrong1), String(wrong2)],
        explanationSteps: [`${num} ÷ ${factor} and ${den} ÷ ${factor} are both whole numbers, so ${factor} is a common factor.`],
        hints: ["A common factor divides both numbers exactly, with no remainder."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which number is a common factor of (\d+) and (\d+)\?/);
        if (!m) return {};
        return {
          prompt: `Quel nombre est un facteur commun de ${m[1]} et ${m[2]} ?`,
          explanationSteps: [`${m[1]} ÷ ${drawn.correctLabel} et ${m[2]} ÷ ${drawn.correctLabel} sont tous les deux des nombres entiers, donc ${drawn.correctLabel} est un facteur commun.`],
          hints: ["Un facteur commun divise exactement les deux nombres, sans reste."]
        };
      }
    },
    declaredVariationSpace: 400
  }),

  // --- Y7-L3-2: add, subtract, multiply and divide fractions, including mixed numbers ---
  arithmeticTemplate({
    key: "y7l3.addFractionsSameDenominator", levelKey: "Y7L3", objectiveCode: "Y7-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[3, 12], [1, 9], [1, 9]], constraint: (v) => v[1]! < v[0]! && v[2]! < v[0]! && v[1]! + v[2]! < v[0]!,
    compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["{b}/{a} + {c}/{a} = ?/{a} (give the numerator)", "Work out {b}/{a} + {c}/{a}, giving the numerator over {a}."],
    explain: (v, r) => [`With the same denominator, add the numerators: ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["When the denominators match, add the numerators and keep the denominator the same."],
    fr: {
      promptTemplates: ["{b}/{a} + {c}/{a} = ?/{a} (donne le numérateur)", "Calcule {b}/{a} + {c}/{a}, en donnant le numérateur sur {a}."],
      hints: () => ["Quand les dénominateurs sont identiques, additionne les numérateurs et garde le même dénominateur."]
    },
    declaredVariationSpace: 10 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y7l3.subtractFractionsSameDenominator", levelKey: "Y7L3", objectiveCode: "Y7-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[3, 12], [1, 9], [1, 9]], constraint: (v) => v[1]! < v[0]! && v[2]! < v[1]!,
    compute: (v) => v[1]! - v[2]!,
    promptTemplates: ["{b}/{a} - {c}/{a} = ?/{a} (give the numerator)", "Work out {b}/{a} - {c}/{a}, giving the numerator over {a}."],
    explain: (v, r) => [`With the same denominator, subtract the numerators: ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["When the denominators match, subtract the numerators and keep the denominator the same."],
    fr: {
      promptTemplates: ["{b}/{a} - {c}/{a} = ?/{a} (donne le numérateur)", "Calcule {b}/{a} - {c}/{a}, en donnant le numérateur sur {a}."],
      hints: () => ["Quand les dénominateurs sont identiques, soustrais les numérateurs et garde le même dénominateur."]
    },
    declaredVariationSpace: 10 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y7l3.multiplyFractionByWhole", levelKey: "Y7L3", objectiveCode: "Y7-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [2, 12], [2, 6]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[0]! * v[2]!,
    promptTemplates: ["{a}/{b} x {c} = ?/{b} (give the numerator)", "Work out {a}/{b} x {c}, giving the numerator over {b}."],
    explain: (v, r) => [`Multiply the numerator by ${v[2]}: ${v[0]} x ${v[2]} = ${r}. The denominator stays ${v[1]}.`],
    hints: () => ["Multiply the numerator by the whole number; the denominator does not change."],
    fr: {
      promptTemplates: ["{a}/{b} x {c} = ?/{b} (donne le numérateur)", "Calcule {a}/{b} x {c}, en donnant le numérateur sur {b}."],
      hints: () => ["Multiplie le numérateur par le nombre entier ; le dénominateur ne change pas."]
    },
    declaredVariationSpace: 9 * 11 * 5
  }),
  arithmeticTemplate({
    key: "y7l3.divideFractionByWhole", levelKey: "Y7L3", objectiveCode: "Y7-L3-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [2, 12], [2, 5]], constraint: (v) => v[0]! * v[2]! < v[1]! * 4,
    compute: (v) => v[0]!,
    derive: (v) => ({ shownNum: v[0]! * v[2]!, shownDen2: v[1]! }),
    promptTemplates: ["{shownNum}/{b} ÷ {c} = ?/{b} (give the numerator)", "Work out {shownNum}/{b} ÷ {c}, giving the numerator over {b}."],
    explain: (v, r) => [`Divide the numerator by ${v[2]}: ${v[0]! * v[2]!} ÷ ${v[2]} = ${r}. The denominator stays ${v[1]}.`],
    hints: () => ["Divide the numerator by the whole number; the denominator does not change."],
    fr: {
      promptTemplates: ["{shownNum}/{b} ÷ {c} = ?/{b} (donne le numérateur)", "Calcule {shownNum}/{b} ÷ {c}, en donnant le numérateur sur {b}."],
      hints: () => ["Divise le numérateur par le nombre entier ; le dénominateur ne change pas."]
    },
    declaredVariationSpace: 9 * 11 * 4
  }),
  arithmeticTemplate({
    key: "y7l3.mcAddFractionsSameDenominator", levelKey: "Y7L3", objectiveCode: "Y7-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[3, 12], [1, 9], [1, 9]], constraint: (v) => v[1]! < v[0]! && v[2]! < v[0]! && v[1]! + v[2]! < v[0]!,
    compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["What is the numerator of {b}/{a} + {c}/{a}?"],
    explain: (v, r) => [`${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add the numerators and keep the denominator the same."],
    distractorSpread: 3,
    fr: {
      promptTemplates: ["Quel est le numérateur de {b}/{a} + {c}/{a} ?"],
      hints: () => ["Additionne les numérateurs et garde le même dénominateur."]
    },
    declaredVariationSpace: 10 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y7l3.addMixedNumbersToWhole", levelKey: "Y7L3", objectiveCode: "Y7-L3-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OPERATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 8], [1, 8], [2, 9], [1, 8]], constraint: (v) => v[3]! < v[2]!,
    compute: (v) => v[0]! + v[1]! + 1,
    derive: (v) => ({ numer1: v[3]!, numer2: v[2]! - v[3]! }),
    promptTemplates: ["{a} {numer1}/{c} + {b} {numer2}/{c} = ?", "Work out {a} {numer1}/{c} + {b} {numer2}/{c} as a whole number."],
    explain: (v, r) => [`The fraction parts add to a whole: ${v[3]}/${v[2]} + ${v[2]! - v[3]!}/${v[2]} = 1.`, `${v[0]} + ${v[1]} + 1 = ${r}.`],
    hints: () => ["Add the whole numbers first, then check if the fraction parts make another whole."],
    fr: {
      promptTemplates: ["{a} {numer1}/{c} + {b} {numer2}/{c} = ?", "Calcule {a} {numer1}/{c} + {b} {numer2}/{c} sous forme de nombre entier."],
      hints: () => ["Additionne d'abord les nombres entiers, puis vérifie si les fractions forment un tout supplémentaire."]
    },
    declaredVariationSpace: 8 * 8 * 8 * 7
  }),

  // --- Y7-L3-3: interpret fractions as operators ---
  arithmeticTemplate({
    key: "y7l3.fractionOfAmount", levelKey: "Y7L3", objectiveCode: "Y7-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [2, 10], [1, 10]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ amount: v[1]! * v[2]! }),
    promptTemplates: ["What is {a}/{b} of {amount}?", "Work out {a}/{b} of {amount}."],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
    hints: () => ["Divide by the denominator first, then multiply by the numerator."],
    fr: {
      promptTemplates: ["Combien font {a}/{b} de {amount} ?", "Calcule {a}/{b} de {amount}."],
      hints: () => ["Divise d'abord par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 9 * 9 * 10
  }),
  arithmeticTemplate({
    key: "y7l3.mcFractionOfAmount", levelKey: "Y7L3", objectiveCode: "Y7-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [2, 10], [1, 10]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ amount: v[1]! * v[2]! }),
    promptTemplates: ["What is {a}/{b} of {amount}?"],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}, then x ${v[0]} = ${r}.`],
    hints: () => ["Divide by the denominator, then multiply by the numerator."],
    distractorSpread: 5,
    fr: {
      promptTemplates: ["Combien font {a}/{b} de {amount} ?"],
      hints: () => ["Divise par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 9 * 9 * 10
  }),
  arithmeticTemplate({
    key: "y7l3.wordProblemFractionOperator", levelKey: "Y7L3", objectiveCode: "Y7-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [2, 10], [1, 10]], constraint: (v) => v[0]! < v[1]!, contextPool: CTX,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ amount: v[1]! * v[2]! }),
    promptTemplates: ["A jar has {amount} {ctx}. {a}/{b} of them are given away. How many {ctx} are given away?"],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
    hints: () => ["Divide the total by the denominator, then multiply by the numerator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un pot contient {amount} {ctx}. {a}/{b} d'entre eux sont donnés. Combien {de:ctx} sont donnés ?"],
      hints: () => ["Divise le total par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 9 * 9 * 10 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y7l3.tfFractionOfAmount", levelKey: "Y7L3", objectiveCode: "Y7-L3-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const num = rng.int(1, 9);
      const den = rng.int(num + 1, 10);
      const k = rng.int(1, 10);
      const amount = den * k;
      const correctValue = num * k;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correctValue : correctValue + rng.int(1, 5);
      return {
        prompt: `${num}/${den} of ${amount} is ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${amount} ÷ ${den} = ${k}, then ${k} x ${num} = ${correctValue}.`],
        hints: ["Divide by the denominator, then multiply by the numerator, to check."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) of (\d+) is (\d+)\. True or false\?/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]}/${m[2]} de ${m[3]} égale ${m[4]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`${m[3]} ÷ ${m[2]} donne un nombre, qui multiplié par ${m[1]} vérifie le résultat.`],
          hints: ["Divise par le dénominateur, puis multiplie par le numérateur, pour vérifier."]
        };
      }
    },
    declaredVariationSpace: 900
  })
];

export default level;
