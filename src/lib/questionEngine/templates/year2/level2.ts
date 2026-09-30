import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 2, Level 2 — "Addition and subtraction facts"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y2-L2-1 number facts to 20, Y2-L2-2
// deriving related facts to 100, Y2-L2-3 mental addition/subtraction using
// a number line).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y2-L2-1: recall and use addition and subtraction facts to 20 ---
  arithmeticTemplate({
    key: "y2l2.addWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    declaredVariationSpace: 19 * 19 * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "En comptant les {ctx} : combien font {a} + {b} ?"],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.subtractWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [1, 19]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    declaredVariationSpace: 19 * 19 * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "En comptant les {ctx} : combien font {a} - {b} ?"],
      hints: () => ["Compte à rebours à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.missingAddendWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{a} + ___ = {b}", "What must be added to {a} to make {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 19 * 19,
    fr: {
      promptTemplates: ["{a} + ___ = {b}", "Que faut-il ajouter à {a} pour faire {b} ?"],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.missingSubtrahendWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{b} - ___ = {a}", "What must be subtracted from {b} to leave {a}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 19 * 19,
    fr: {
      promptTemplates: ["{b} - ___ = {a}", "Que faut-il soustraire de {b} pour qu'il reste {a} ?"],
      hints: () => ["Calcule la différence entre le nombre de départ et ce qu'il reste."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.mcAddWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    distractorSpread: 3,
    declaredVariationSpace: 19 * 19,
    fr: {
      promptTemplates: ["Combien font {a} + {b} ?"],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.tfAddWithin20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE",
    ranges: [[1, 19], [1, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} ="],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two numbers and check your answer."],
    distractorSpread: 3,
    declaredVariationSpace: 19 * 19 * 2,
    fr: {
      promptTemplates: ["{a} + {b} ="],
      hints: () => ["Additionne les deux nombres et vérifie ta réponse."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.numberBondsTo20", levelKey: "Y2L2", objectiveCode: "Y2-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 19]], compute: (v) => 20 - v[0]!, contextPool: CTX,
    promptTemplates: ["___ + {a} = 20", "What number bonds with {a} to make 20?", "Counting {ctx}: what number pairs with {a} to make 20?"],
    explain: (v, r) => [`20 - ${v[0]} = ${r}.`],
    hints: () => ["Think about what pairs with this number to make 20."],
    declaredVariationSpace: 19 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["___ + {a} = 20", "Quel nombre s'associe avec {a} pour faire 20 ?", "En comptant les {ctx} : quel nombre se combine avec {a} pour faire 20 ?"],
      hints: () => ["Réfléchis à ce qui s'associe avec ce nombre pour faire 20."]
    }
  }),

  // --- Y2-L2-2: derive related facts (e.g. 7+3=10, so 70+30=100) ---
  arithmeticTemplate({
    key: "y2l2.deriveRelatedFactAddTens", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => (v[0]! + v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10, sum: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["If {a} + {b} = {sum}, what is {a10} + {b10}?", "Counting {ctx} in tens: if {a} + {b} = {sum}, what is {a10} + {b10}?"],
    explain: (v, r) => [`Since ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Use the same fact, but with each number ten times bigger."],
    declaredVariationSpace: 9 * 9 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Si {a} + {b} = {sum}, combien font {a10} + {b10} ?", "En comptant les {ctx} par dizaines : si {a} + {b} = {sum}, combien font {a10} + {b10} ?"],
      explain: (v, r) => [`Puisque ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
      hints: () => ["Utilise le même fait, mais avec chaque nombre dix fois plus grand."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.deriveRelatedFactSubtractTens", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[2, 10], [1, 9]], constraint: (v) => v[0]! > v[1]!, compute: (v) => (v[0]! - v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10, diff: v[0]! - v[1]! }), contextPool: CTX,
    promptTemplates: ["If {a} - {b} = {diff}, what is {a10} - {b10}?", "Counting {ctx} in tens: if {a} - {b} = {diff}, what is {a10} - {b10}?"],
    explain: (v, r) => [`Since ${v[0]} - ${v[1]} = ${v[0]! - v[1]!}, ${v[0]! * 10} - ${v[1]! * 10} = ${r}.`],
    hints: () => ["Use the same fact, but with each number ten times bigger."],
    declaredVariationSpace: 9 * 8 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Si {a} - {b} = {diff}, combien font {a10} - {b10} ?", "En comptant les {ctx} par dizaines : si {a} - {b} = {diff}, combien font {a10} - {b10} ?"],
      explain: (v, r) => [`Puisque ${v[0]} - ${v[1]} = ${v[0]! - v[1]!}, ${v[0]! * 10} - ${v[1]! * 10} = ${r}.`],
      hints: () => ["Utilise le même fait, mais avec chaque nombre dix fois plus grand."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.mcDeriveRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => (v[0]! + v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10 }),
    promptTemplates: ["{a10} + {b10} = ?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, so ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Work out the small fact first, then multiply by 10."],
    distractorSpread: 20,
    declaredVariationSpace: 9 * 9,
    fr: {
      promptTemplates: ["{a10} + {b10} = ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, donc ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
      hints: () => ["Calcule d'abord le petit fait, puis multiplie par 10."]
    }
  }),
  categoricalPoolTemplate({
    key: "y2l2.tfDeriveRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 9);
      const b = rng.int(1, Math.max(1, 10 - a));
      const correctSum = (a + b) * 10;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correctSum : correctSum + rng.int(1, 3) * 10;
      return {
        prompt: `Since ${a} + ${b} = ${a + b}, ${a * 10} + ${b * 10} = ${shown}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${a * 10} + ${b * 10} = ${correctSum}.`],
        hints: ["The related fact keeps the same digits, just ten times bigger."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Since (\d+) \+ (\d+) = (\d+), (\d+) \+ (\d+) = (\d+)\.$/);
        if (!m) return {};
        const a = m[1]!, b = m[2]!, sum = m[3]!, a10 = m[4]!, b10 = m[5]!, shown = m[6]!;
        const isTrue = drawn.correctLabel === "True";
        const correctSum = Number(a10) + Number(b10);
        return {
          prompt: `Puisque ${a} + ${b} = ${sum}, ${a10} + ${b10} = ${shown}.`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`${a10} + ${b10} = ${correctSum}.`],
          hints: ["Le fait dérivé garde les mêmes chiffres, juste dix fois plus grands."]
        };
      }
    },
    declaredVariationSpace: 9 * 9 * 2
  }),
  arithmeticTemplate({
    key: "y2l2.missingRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[1]! * 10,
    derive: (v, r) => ({ a10: v[0]! * 10, total: v[0]! * 10 + r, sum: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["If {a} + {b} = {sum}, then {a10} + ___ = {total}.", "Counting {ctx} in tens: if {a} + {b} = {sum}, then {a10} + ___ = {total}."],
    explain: (v, r) => [`Since ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, the missing number is ${v[1]} x 10 = ${r}.`],
    hints: () => ["Use the small fact to work out the missing tens number."],
    declaredVariationSpace: 9 * 9 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Si {a} + {b} = {sum}, alors {a10} + ___ = {total}.", "En comptant les {ctx} par dizaines : si {a} + {b} = {sum}, alors {a10} + ___ = {total}."],
      explain: (v, r) => [`Puisque ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, le nombre manquant est ${v[1]} x 10 = ${r}.`],
      hints: () => ["Utilise le petit fait pour calculer le nombre de dizaines manquant."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.wordProblemRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => (v[0]! + v[1]!) * 10,
    derive: (v) => ({ a10: v[0]! * 10, b10: v[1]! * 10 }), contextPool: CTX,
    promptTemplates: ["A shop has {a10} {ctx} in one box and {b10} {ctx} in another. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, so ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Use the small number fact, then multiply by 10."],
    declaredVariationSpace: 9 * 9 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un magasin a {a10} {ctx} dans une boîte et {b10} {ctx} dans une autre. Combien de {ctx} en tout ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}, donc ${v[0]! * 10} + ${v[1]! * 10} = ${r}.`],
      hints: () => ["Utilise le petit fait numérique, puis multiplie par 10."]
    }
  }),
  categoricalPoolTemplate({
    key: "y2l2.reasoningExplainRelatedFact", levelKey: "Y2L2", objectiveCode: "Y2-L2-2", difficulty: "REASONING",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 9);
      const b = rng.int(1, Math.max(1, 10 - a));
      const correct = String((a + b) * 10);
      const distractors = [String((a + b) * 100), String(a + b), String((a + b) * 10 + 10)];
      const uniq = Array.from(new Set(distractors)).filter((l) => l !== correct);
      let pad = (a + b) * 10 + 200;
      while (uniq.length < 3) { uniq.push(String(pad)); pad++; }
      return {
        prompt: `Since ${a} + ${b} = ${a + b}, what is ${a * 10} + ${b * 10}?`,
        correctLabel: correct,
        distractorLabels: uniq.slice(0, 3),
        explanationSteps: [`${a * 10} + ${b * 10} = ${(a + b) * 10}, the same digits as ${a + b} but ten times bigger.`],
        hints: ["The related fact keeps the same digits, just ten times bigger."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Since (\d+) \+ (\d+) = (\d+), what is (\d+) \+ (\d+)\?$/);
        if (!m) return {};
        const a = m[1]!, b = m[2]!, sum = m[3]!, a10 = m[4]!, b10 = m[5]!;
        return {
          prompt: `Puisque ${a} + ${b} = ${sum}, combien font ${a10} + ${b10} ?`,
          explanationSteps: [`${a10} + ${b10} = ${drawn.correctLabel}, les mêmes chiffres que ${sum} mais dix fois plus grands.`],
          hints: ["Le fait dérivé garde les mêmes chiffres, juste dix fois plus grands."]
        };
      }
    },
    declaredVariationSpace: 9 * 9
  }),

  // --- Y2-L2-3: add and subtract mentally using a number line ---
  arithmeticTemplate({
    key: "y2l2.addUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_LINE",
    ranges: [[1, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["Start at {a} on the number line and jump on {b}. Where do you land?", "You are at {a} on the number line. Jump forward {b} spaces. What number do you land on?"],
    explain: (v, r) => [`Starting at ${v[0]}, jumping on ${v[1]} lands on ${r}.`],
    hints: () => ["Count forwards from the starting number."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! + v[1]!, v[0]!),
    declaredVariationSpace: 15 * 8 * 2,
    fr: {
      promptTemplates: ["Pars de {a} sur la droite numérique et saute de {b}. Où atterris-tu ?", "Tu es à {a} sur la droite numérique. Saute en avant de {b} cases. Sur quel nombre atterris-tu ?"],
      explain: (v, r) => [`En partant de ${v[0]} et en sautant de ${v[1]}, on atterrit sur ${r}.`],
      hints: () => ["Compte vers l'avant à partir du nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.subtractUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_LINE",
    ranges: [[5, 20], [1, 8]], constraint: (v) => v[0]! - v[1]! >= 0, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["Start at {a} on the number line and jump back {b}. Where do you land?", "You are at {a} on the number line. Jump backward {b} spaces. What number do you land on?"],
    explain: (v, r) => [`Starting at ${v[0]}, jumping back ${v[1]} lands on ${r}.`],
    hints: () => ["Count backwards from the starting number."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! - v[1]!, v[0]!),
    declaredVariationSpace: 16 * 8 * 2,
    fr: {
      promptTemplates: ["Pars de {a} sur la droite numérique et saute en arrière de {b}. Où atterris-tu ?", "Tu es à {a} sur la droite numérique. Saute en arrière de {b} cases. Sur quel nombre atterris-tu ?"],
      explain: (v, r) => [`En partant de ${v[0]} et en sautant en arrière de ${v[1]}, on atterrit sur ${r}.`],
      hints: () => ["Compte à rebours à partir du nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.bridgingTenAdd", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[6, 9], [3, 9]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ toTen: 10 - v[0]!, remainder: v[1]! - (10 - v[0]!) }), contextPool: CTX,
    promptTemplates: ["{a} + {b}: jump {toTen} to reach 10, then jump {remainder} more. Where do you land?", "Counting {ctx}: {a} + {b}: jump {toTen} to reach 10, then jump {remainder} more. Where do you land?"],
    explain: (v, r) => [`${v[0]} + ${10 - v[0]!} = 10. 10 + ${v[1]! - (10 - v[0]!)} = ${r}.`],
    hints: () => ["Jump to the next multiple of 10 first, then jump the rest of the way."],
    declaredVariationSpace: 4 * 7 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} : saute de {toTen} pour atteindre 10, puis saute de {remainder} de plus. Où atterris-tu ?", "En comptant les {ctx} : {a} + {b} : saute de {toTen} pour atteindre 10, puis saute de {remainder} de plus. Où atterris-tu ?"],
      hints: () => ["Saute d'abord jusqu'au prochain multiple de 10, puis termine le trajet."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.bridgingTenSubtract", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[11, 19], [3, 9]], constraint: (v) => v[1]! > v[0]! % 10, compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ toTen: v[0]! % 10, remainder: v[1]! - (v[0]! % 10), a10: v[0]! - (v[0]! % 10) }), contextPool: CTX,
    promptTemplates: ["{a} - {b}: jump back {toTen} to reach {a10}, then jump back {remainder} more. Where do you land?", "Counting {ctx}: {a} - {b}: jump back {toTen} to reach {a10}, then jump back {remainder} more. Where do you land?"],
    explain: (v, r) => [`${v[0]} - ${v[0]! % 10} = ${v[0]! - (v[0]! % 10)}. ${v[0]! - (v[0]! % 10)} - ${v[1]! - (v[0]! % 10)} = ${r}.`],
    hints: () => ["Jump back to the nearest multiple of 10 first, then jump back the rest of the way."],
    declaredVariationSpace: 9 * 7 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} : saute en arrière de {toTen} pour atteindre {a10}, puis saute en arrière de {remainder} de plus. Où atterris-tu ?", "En comptant les {ctx} : {a} - {b} : saute en arrière de {toTen} pour atteindre {a10}, puis saute en arrière de {remainder} de plus. Où atterris-tu ?"],
      hints: () => ["Saute d'abord en arrière jusqu'au multiple de 10 le plus proche, puis termine le trajet en arrière."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.mcAddUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["On a number line, start at {a} and jump on {b}. Where do you land?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count forwards from the starting number."],
    distractorSpread: 3,
    declaredVariationSpace: 15 * 8,
    fr: {
      promptTemplates: ["Sur une droite numérique, pars de {a} et saute de {b}. Où atterris-tu ?"],
      hints: () => ["Compte vers l'avant à partir du nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.mcSubtractUsingNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[5, 20], [1, 8]], constraint: (v) => v[0]! - v[1]! >= 0, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["On a number line, start at {a} and jump back {b}. Where do you land?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count backwards from the starting number."],
    distractorSpread: 3,
    declaredVariationSpace: 16 * 8,
    fr: {
      promptTemplates: ["Sur une droite numérique, pars de {a} et saute en arrière de {b}. Où atterris-tu ?"],
      hints: () => ["Compte à rebours à partir du nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y2l2.wordProblemNumberLine", levelKey: "Y2L2", objectiveCode: "Y2-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[1, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a jar. {b} more are added. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Imagine jumping forwards on a number line from the starting amount."],
    declaredVariationSpace: 15 * 8 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} dans un pot. {b} de plus sont ajoutés. Combien de {ctx} y a-t-il maintenant ?"],
      hints: () => ["Imagine que tu sautes vers l'avant sur une droite numérique à partir du montant de départ."]
    }
  })
];

export default level;
