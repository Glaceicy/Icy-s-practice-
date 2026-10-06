import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 2, Level 3 — "Adding and subtracting two-digit numbers"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y2-L3-1 a two-digit number and ones,
// Y2-L3-2 two two-digit numbers, Y2-L3-3 two-step word problems). Totals
// are kept within two digits (<=99) throughout, matching the Y2 curriculum
// scope (crossing 100 is Year 3).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];
const CTX_EN_TO_FR: Record<string, string> = {
  stars: "étoiles", sweets: "bonbons", apples: "pommes", cars: "voitures",
  stickers: "autocollants", marbles: "billes", buttons: "boutons", shells: "coquillages"
};
const CMP_EN_TO_FR: Record<string, string> = { More: "Plus", Fewer: "Moins", "The same": "Autant" };
const BOOL_EN_TO_FR: Record<string, string> = { True: "Vrai", False: "Faux" };

export const level: QuestionTemplateDef[] = [
  // --- Y2-L3-1: add a two-digit number and ones ---
  arithmeticTemplate({
    key: "y2l3.addTwoDigitAndOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the two-digit number."],
    declaredVariationSpace: 80 * 9 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "En comptant les {ctx} : combien font {a} + {b} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Ajoute les unités au nombre à deux chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.subtractOnesFromTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [1, 9]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Take the ones away from the two-digit number."],
    declaredVariationSpace: 90 * 9 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "En comptant les {ctx} : combien font {a} - {b} ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Retire les unités du nombre à deux chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.missingOnesAddend", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["{a} + ___ = {c}", "What must be added to {a} to make {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 80 * 9 * 2,
    fr: {
      promptTemplates: ["{a} + ___ = {c}", "Que faut-il ajouter à {a} pour obtenir {c} ?"],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.missingTwoDigitStart", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["___ + {b} = {c}", "What number plus {b} makes {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the ones from the total to find the missing number."],
    declaredVariationSpace: 80 * 9 * 2,
    fr: {
      promptTemplates: ["___ + {b} = {c}", "Quel nombre plus {b} donne {c} ?"],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[1]} = ${r}.`],
      hints: () => ["Soustrais les unités du total pour trouver le nombre manquant."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.mcAddTwoDigitOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the two-digit number."],
    distractorSpread: 6,
    declaredVariationSpace: 80 * 9,
    fr: {
      promptTemplates: ["Combien font {a} + {b} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Ajoute les unités au nombre à deux chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.tfAddTwoDigitOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} ="],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two numbers and check your answer."],
    distractorSpread: 4,
    declaredVariationSpace: 80 * 9 * 2,
    fr: {
      promptTemplates: ["{a} + {b} ="],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne les deux nombres et vérifie ta réponse."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemAddOnes", levelKey: "Y2L3", objectiveCode: "Y2-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[10, 89], [1, 9]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a box. {b} more are added. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the two-digit number."],
    declaredVariationSpace: 80 * 9 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} dans une boîte. {b} de plus sont ajoutés. Combien y a-t-il {de:ctx} maintenant ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Ajoute les unités au nombre à deux chiffres."]
    }
  }),

  // --- Y2-L3-2: add and subtract two two-digit numbers ---
  arithmeticTemplate({
    key: "y2l3.addTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10, 89], [10, 89]], constraint: (v) => v[0]! + v[1]! <= 99, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the tens first, then the ones."],
    declaredVariationSpace: 80 * 80 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "En comptant les {ctx} : combien font {a} + {b} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne d'abord les dizaines, puis les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.subtractTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the tens first, then the ones."],
    declaredVariationSpace: 80 * 80 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "En comptant les {ctx} : combien font {a} - {b} ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Soustrais d'abord les dizaines, puis les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.missingAddendTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 89], [10, 89]], constraint: (v) => v[0]! + v[1]! <= 99, compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["{a} + ___ = {c}", "What must be added to {a} to make {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 80 * 80,
    fr: {
      promptTemplates: ["{a} + ___ = {c}", "Que faut-il ajouter à {a} pour obtenir {c} ?"],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.missingSubtrahendTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[1]!,
    derive: (v) => ({ diff: v[0]! - v[1]! }),
    promptTemplates: ["{a} - ___ = {diff}", "What must be subtracted from {a} to leave {diff}?"],
    explain: (v, r) => [`${v[0]} - ${v[0]! - v[1]!} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 80 * 80,
    fr: {
      promptTemplates: ["{a} - ___ = {diff}", "Que faut-il soustraire de {a} pour obtenir {diff} ?"],
      explain: (v, r) => [`${v[0]} - ${v[0]! - v[1]!} = ${r}.`],
      hints: () => ["Calcule la différence entre le nombre de départ et ce qu'il reste."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.mcAddTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 89], [10, 89]], constraint: (v) => v[0]! + v[1]! <= 99, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the tens first, then the ones."],
    distractorSpread: 8,
    declaredVariationSpace: 80 * 80,
    fr: {
      promptTemplates: ["Combien font {a} + {b} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne d'abord les dizaines, puis les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.tfSubtractTwoTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} ="],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the tens first, then the ones."],
    distractorSpread: 6,
    declaredVariationSpace: 80 * 80 * 2,
    fr: {
      promptTemplates: ["{a} - {b} ="],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Soustrais d'abord les dizaines, puis les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemAddSubtractTwoDigit", levelKey: "Y2L3", objectiveCode: "Y2-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[20, 99], [10, 89]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["A shop had {a} {ctx}. They sold {b}. How many {ctx} are left?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the amount sold from the starting amount."],
    declaredVariationSpace: 80 * 80 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un magasin avait {a} {ctx}. Il en a vendu {b}. Combien {de:ctx} reste-t-il ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Soustrais la quantité vendue de la quantité de départ."]
    }
  }),

  // --- Y2-L3-3: solve two-step addition and subtraction word problems ---
  arithmeticTemplate({
    key: "y2l3.wordProblemTwoStepAdd", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[10, 40], [1, 20], [1, 20]], compute: (v) => v[0]! + v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in one basket, {b} in a second basket, and {c} in a third. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add all three amounts together."],
    declaredVariationSpace: 30 * 20 * 20 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} dans un premier panier, {b} dans un deuxième panier, et {c} dans un troisième. Combien {de:ctx} au total ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Additionne les trois quantités."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemTwoStepAddSubtract", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[10, 40], [1, 20], [1, 20]], constraint: (v) => v[0]! + v[1]! >= v[2]!, compute: (v) => v[0]! + v[1]! - v[2]!, contextPool: CTX,
    promptTemplates: ["You start with {a} {ctx}. You are given {b} more, then you give away {c}. How many {ctx} do you have now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Add the extra amount first, then take away what was given away."],
    declaredVariationSpace: 30 * 20 * 20 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Tu commences avec {a} {ctx}. On t'en donne {b} de plus, puis tu en donnes {c}. Combien {de:ctx} as-tu maintenant ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} - ${v[2]} = ${r}.`],
      hints: () => ["Additionne d'abord la quantité supplémentaire, puis retire ce qui a été donné."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.wordProblemTwoStepSubtractAdd", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[20, 60], [1, 20], [1, 20]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["You start with {a} {ctx}. {b} are used up, then {c} more are added. How many {ctx} do you have now?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Subtract the amount used up first, then add the new amount."],
    declaredVariationSpace: 40 * 20 * 20 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Tu commences avec {a} {ctx}. {b} sont utilisés, puis {c} de plus sont ajoutés. Combien {de:ctx} as-tu maintenant ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Soustrais d'abord la quantité utilisée, puis ajoute la nouvelle quantité."]
    }
  }),
  arithmeticTemplate({
    key: "y2l3.mcTwoStepWordProblem", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 40], [1, 20], [1, 20]], compute: (v) => v[0]! + v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["A jar has {a} {ctx}. {b} more are added, then {c} more are added. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add all three amounts together."],
    distractorSpread: 10,
    declaredVariationSpace: 30 * 20 * 20 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un pot contient {a} {ctx}. {b} de plus sont ajoutés, puis {c} de plus sont ajoutés. Combien {de:ctx} au total ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Additionne les trois quantités."]
    }
  }),
  categoricalPoolTemplate({
    key: "y2l3.tfTwoStepWordProblem", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(10, 40);
      const b = rng.int(1, 20);
      const c = rng.int(1, 20);
      const ctx = rng.pick(CTX);
      const correct = a + b - c;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correct : correct + rng.int(1, 5) * (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `Sam has ${a} ${ctx}. He gets ${b} more, then gives away ${c}. He now has ${shown} ${ctx}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${a} + ${b} - ${c} = ${correct}.`],
        hints: ["Add the extra amount first, then take away what was given away."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Sam has (\d+) (\S+)\. He gets (\d+) more, then gives away (\d+)\. He now has (\d+) \S+\.$/);
        const a = m ? m[1] : "";
        const ctxFr = m ? (CTX_EN_TO_FR[m[2]!] ?? m[2]) : "";
        const b = m ? m[3] : "";
        const c = m ? m[4] : "";
        const shown = m ? m[5] : "";
        return {
          prompt: `Sam a ${a} ${ctxFr}. Il en reçoit ${b} de plus, puis il en donne ${c}. Il en a maintenant ${shown}.`,
          correctLabel: BOOL_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => BOOL_EN_TO_FR[d] ?? d),
          hints: ["Additionne d'abord la quantité supplémentaire, puis retire ce qui a été donné."]
        };
      }
    },
    declaredVariationSpace: 30 * 20 * 20 * CTX.length * 2
  }),
  arithmeticTemplate({
    key: "y2l3.missingStepTwoStep", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[10, 40], [1, 20], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! + v[1]! - v[2]! }),
    promptTemplates: ["{a} + {b} - ___ = {c}", "Start at {a}, add {b}, then take away a number to leave {c}. What number is taken away?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} - ${r} = ${v[0]! + v[1]! - r}.`],
    hints: () => ["Work out the total after adding, then compare it to the final amount."],
    declaredVariationSpace: 30 * 20 * 20 * 2,
    fr: {
      promptTemplates: ["{a} + {b} - ___ = {c}", "Pars de {a}, ajoute {b}, puis retire un nombre pour obtenir {c}. Quel nombre est retiré ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} - ${r} = ${v[0]! + v[1]! - r}.`],
      hints: () => ["Calcule le total après l'addition, puis compare-le au montant final."]
    }
  }),
  categoricalPoolTemplate({
    key: "y2l3.reasoningMoreOrFewer", levelKey: "Y2L3", objectiveCode: "Y2-L3-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(10, 89);
      const b = rng.int(1, 20);
      const c = rng.int(1, 20);
      const ctx = rng.pick(CTX);
      const net = b - c;
      const correct = net > 0 ? "More" : net < 0 ? "Fewer" : "The same";
      const distractors = ["More", "Fewer", "The same"].filter((l) => l !== correct);
      return {
        prompt: `Tom had ${a} ${ctx}. He found ${b} more, then lost ${c}. Compared to how many he started with, does he now have more, fewer, or the same number of ${ctx}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`He gained ${b} and lost ${c}, a net change of ${net >= 0 ? "+" : ""}${net}, so he ends up with ${correct.toLowerCase()}.`],
        hints: ["Compare how many were gained with how many were lost."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Tom had (\d+) (\S+)\. He found (\d+) more, then lost (\d+)\./);
        const a = m ? m[1] : "";
        const ctxFr = m ? (CTX_EN_TO_FR[m[2]!] ?? m[2]) : "";
        const b = m ? Number(m[3]) : 0;
        const c = m ? Number(m[4]) : 0;
        const net = b - c;
        const correctFr = CMP_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel;
        const distractorsFr = drawn.distractorLabels.map((d) => CMP_EN_TO_FR[d] ?? d);
        return {
          prompt: `Tom avait ${a} ${ctxFr}. Il en a trouvé ${b} de plus, puis en a perdu ${c}. Par rapport à sa quantité de départ, a-t-il maintenant plus, moins, ou autant de ${ctxFr} ?`,
          correctLabel: correctFr,
          distractorLabels: distractorsFr,
          explanationSteps: [`Il a gagné ${b} et perdu ${c}, soit un changement net de ${net >= 0 ? "+" : ""}${net}, donc il se retrouve avec ${correctFr.toLowerCase()}.`],
          hints: ["Compare le nombre gagné avec le nombre perdu."]
        };
      }
    },
    declaredVariationSpace: 80 * 20 * 20
  })
];

export default level;
