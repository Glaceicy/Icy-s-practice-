import { arithmeticTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 4 — "Addition and subtraction within 20"
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y1-L4-1: add two numbers within 20, including crossing 10 ---
  arithmeticTemplate({
    key: "y1l4.addWithin20", levelKey: "Y1L4", objectiveCode: "Y1-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[0, 19], [0, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "What is {a} + {b}?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    declaredVariationSpace: 210 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "Combien font {a} + {b} ?", "En comptant les {ctx} : combien font {a} + {b} ?"],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.mcAddWithin20", levelKey: "Y1L4", objectiveCode: "Y1-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 19], [0, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?", "Work out {a} + {b}."],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    distractorSpread: 3,
    declaredVariationSpace: 210 * 2,
    fr: {
      promptTemplates: ["Combien font {a} + {b} ?", "Calcule {a} + {b}."],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.tfAddWithin20", levelKey: "Y1L4", objectiveCode: "Y1-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[0, 19], [0, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} ="],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two numbers and check your answer."],
    distractorSpread: 3,
    declaredVariationSpace: 210 * 2,
    fr: {
      promptTemplates: ["{a} + {b} ="],
      hints: () => ["Additionne les deux nombres et vérifie ta réponse."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.bridgingTenAdd", levelKey: "Y1L4", objectiveCode: "Y1-L4-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9]], constraint: (v) => v[0]! + v[1]! >= 10 && v[0]! + v[1]! <= 19, compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ toTen: 10 - v[0]!, remainder: v[0]! + v[1]! - 10 }), contextPool: CTX,
    promptTemplates: ["{a} + {b}: jump {toTen} to reach 10, then jump {remainder} more. Where do you land?", "Counting {ctx}: {a} + {b}: jump {toTen} to reach 10, then jump {remainder} more. Where do you land?"],
    explain: (v, r) => [`${v[0]} + ${10 - v[0]!} = 10.`, `10 + ${v[0]! + v[1]! - 10} = ${r}.`],
    hints: () => ["Jump to 10 first, then jump the rest of the way."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! + v[1]!, v[0]!),
    declaredVariationSpace: 60 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} : saute de {toTen} pour atteindre 10, puis saute de {remainder} de plus. Où atterris-tu ?", "En comptant les {ctx} : {a} + {b} : saute de {toTen} pour atteindre 10, puis saute de {remainder} de plus. Où atterris-tu ?"],
      hints: () => ["Saute d'abord jusqu'à 10, puis termine le trajet."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.addUsingNumberLine", levelKey: "Y1L4", objectiveCode: "Y1-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_LINE",
    ranges: [[0, 15], [1, 8]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["Start at {a} on the number line and jump on {b}. Where do you land?", "You are at {a} on the number line. Jump forward {b} spaces. What number do you land on?"],
    explain: (v, r) => [`Starting at ${v[0]}, jumping on ${v[1]} lands on ${r}.`],
    hints: () => ["Count forwards from the starting number."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! + v[1]!, v[0]!),
    declaredVariationSpace: 16 * 8 * 2,
    fr: {
      promptTemplates: ["Pars de {a} sur la droite numérique et saute de {b}. Où atterris-tu ?", "Tu es à {a} sur la droite numérique. Saute en avant de {b} cases. Sur quel nombre atterris-tu ?"],
      hints: () => ["Compte vers l'avant à partir du nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.addWithin20VisualCount", levelKey: "Y1L4", objectiveCode: "Y1-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "VISUAL_COUNT",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} {ctx} and {b} more {ctx}. How many altogether?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger group."],
    visualAid: (v, r) => visuals.tenFrame(r > 10 ? r - 10 : r),
    declaredVariationSpace: 121 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} {ctx} et {b} {ctx} de plus. Combien en tout ?"],
      hints: () => ["Compte à partir du plus grand groupe."]
    }
  }),

  // --- Y1-L4-2: subtract numbers within 20 ---
  arithmeticTemplate({
    key: "y1l4.subtractWithin20", levelKey: "Y1L4", objectiveCode: "Y1-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[0, 20], [0, 20]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "What is {a} - {b}?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    declaredVariationSpace: 231 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "Combien font {a} - {b} ?", "En comptant les {ctx} : combien font {a} - {b} ?"],
      hints: () => ["Compte à rebours à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.mcSubtractWithin20", levelKey: "Y1L4", objectiveCode: "Y1-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 20], [0, 20]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["What is {a} - {b}?", "Work out {a} - {b}."],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    distractorSpread: 3,
    declaredVariationSpace: 231 * 2,
    fr: {
      promptTemplates: ["Combien font {a} - {b} ?", "Calcule {a} - {b}."],
      hints: () => ["Compte à rebours à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.tfSubtractWithin20", levelKey: "Y1L4", objectiveCode: "Y1-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[0, 20], [0, 20]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} ="],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the numbers and check your answer."],
    distractorSpread: 3,
    declaredVariationSpace: 231 * 2,
    fr: {
      promptTemplates: ["{a} - {b} ="],
      hints: () => ["Soustrais les nombres et vérifie ta réponse."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.bridgingTenSubtract", levelKey: "Y1L4", objectiveCode: "Y1-L4-2", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[11, 19], [2, 9]], constraint: (v) => v[1]! > v[0]! % 10, compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ toTen: v[0]! % 10, remainder: v[1]! - (v[0]! % 10), a10: v[0]! - (v[0]! % 10) }), contextPool: CTX,
    promptTemplates: ["{a} - {b}: jump back {toTen} to reach {a10}, then jump back {remainder} more. Where do you land?", "Counting {ctx}: {a} - {b}: jump back {toTen} to reach {a10}, then jump back {remainder} more. Where do you land?"],
    explain: (v, r) => [`${v[0]} - ${v[0]! % 10} = ${v[0]! - (v[0]! % 10)}.`, `${v[0]! - (v[0]! % 10)} - ${v[1]! - (v[0]! % 10)} = ${r}.`],
    hints: () => ["Jump back to the nearest ten first, then jump back the rest of the way."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! - v[1]!, v[0]!),
    declaredVariationSpace: 63 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} : saute en arrière de {toTen} pour atteindre {a10}, puis saute en arrière de {remainder} de plus. Où atterris-tu ?", "En comptant les {ctx} : {a} - {b} : saute en arrière de {toTen} pour atteindre {a10}, puis saute en arrière de {remainder} de plus. Où atterris-tu ?"],
      hints: () => ["Saute d'abord en arrière jusqu'au dizaine la plus proche, puis termine le trajet."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.subtractUsingNumberLine", levelKey: "Y1L4", objectiveCode: "Y1-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_LINE",
    ranges: [[5, 20], [1, 8]], constraint: (v) => v[0]! - v[1]! >= 0, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["Start at {a} on the number line and jump back {b}. Where do you land?", "You are at {a} on the number line. Jump backward {b} spaces. What number do you land on?"],
    explain: (v, r) => [`Starting at ${v[0]}, jumping back ${v[1]} lands on ${r}.`],
    hints: () => ["Count backwards from the starting number."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! - v[1]!, v[0]!),
    declaredVariationSpace: 16 * 8 * 2,
    fr: {
      promptTemplates: ["Pars de {a} sur la droite numérique et saute en arrière de {b}. Où atterris-tu ?", "Tu es à {a} sur la droite numérique. Saute en arrière de {b} cases. Sur quel nombre atterris-tu ?"],
      hints: () => ["Compte à rebours à partir du nombre de départ."]
    }
  }),

  // --- Y1-L4-3: solve simple one-step addition and subtraction word problems ---
  arithmeticTemplate({
    key: "y1l4.addWordProblem20", levelKey: "Y1L4", objectiveCode: "Y1-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[0, 19], [0, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a box. {b} more are put in. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Imagine the groups joined together, then count them all."],
    declaredVariationSpace: 210 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} dans une boîte. {b} de plus sont ajoutés. Combien de {ctx} y a-t-il maintenant ?"],
      hints: () => ["Imagine les groupes réunis, puis compte-les tous."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.subtractWordProblem20", levelKey: "Y1L4", objectiveCode: "Y1-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[0, 20], [0, 20]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} on a shelf. {b} are taken away. How many {ctx} are left?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Imagine taking some away, then count what is left."],
    declaredVariationSpace: 231 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} sur une étagère. {b} sont enlevés. Combien de {ctx} reste-t-il ?"],
      hints: () => ["Imagine qu'on en enlève quelques-uns, puis compte ce qu'il reste."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.mcWordProblem20", levelKey: "Y1L4", objectiveCode: "Y1-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 19], [0, 19]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["A jar had {a} {ctx}. {b} more were added. How many {ctx} are in the jar now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two amounts together."],
    distractorSpread: 3,
    declaredVariationSpace: 210 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un pot contenait {a} {ctx}. {b} de plus ont été ajoutés. Combien de {ctx} y a-t-il dans le pot maintenant ?"],
      hints: () => ["Additionne les deux quantités."]
    }
  }),
  arithmeticTemplate({
    key: "y1l4.missingNumberWordProblem20", levelKey: "Y1L4", objectiveCode: "Y1-L4-3", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[0, 20], [0, 20]], constraint: (v) => v[1]! >= v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["There were {a} {ctx} in a box. More were added, making {b} {ctx} altogether. How many {ctx} were added?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting and ending amounts."],
    declaredVariationSpace: 210 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y avait {a} {ctx} dans une boîte. D'autres ont été ajoutés, pour faire {b} {ctx} en tout. Combien de {ctx} ont été ajoutés ?"],
      hints: () => ["Calcule la différence entre la quantité de départ et la quantité finale."]
    }
  })
];

export default level;
