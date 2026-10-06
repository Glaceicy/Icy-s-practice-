import { arithmeticTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 5 — "Number bonds, missing numbers and simple problems"
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y1-L5-1: recall number bonds to 10 and related subtraction facts ---
  arithmeticTemplate({
    key: "y1l5.bondsTo10FromAddition", levelKey: "Y1L5", objectiveCode: "Y1-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!, contextPool: CTX,
    promptTemplates: ["___ + {a} = 10", "What number bonds with {a} to make 10?", "Counting {ctx}: what number pairs with {a} to make 10?", "There are {ctx} to make 10 in total — {a} are counted. How many more {ctx} are needed?"],
    explain: (v, r) => [`10 - ${v[0]} = ${r}.`],
    hints: () => ["Think about what pairs with this number to make 10."],
    visualAid: (v) => visuals.tenFrame(v[0]!),
    declaredVariationSpace: 11 * 2 + 11 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["___ + {a} = 10", "Quel nombre s'associe avec {a} pour faire 10 ?", "En comptant les {ctx} : quel nombre se combine avec {a} pour faire 10 ?", "Il faut {ctx} pour faire 10 en tout — {a} sont déjà comptés. Combien {de:ctx} de plus faut-il ?"],
      hints: () => ["Réfléchis à ce qui s'associe avec ce nombre pour faire 10."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.bondsTo10FromSubtraction", levelKey: "Y1L5", objectiveCode: "Y1-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!, contextPool: CTX,
    promptTemplates: ["10 - {a} = ?", "What is 10 - {a}?", "Counting {ctx}: what is 10 - {a}?", "There are 10 {ctx}. {a} are taken away. How many {ctx} are left?"],
    explain: (v, r) => [`10 - ${v[0]} = ${r}.`],
    hints: () => ["Use the matching addition fact to help: what plus this number makes 10?"],
    visualAid: (v) => visuals.tenFrame(v[0]!),
    declaredVariationSpace: 11 * 2 + 11 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["10 - {a} = ?", "Combien fait 10 - {a} ?", "En comptant les {ctx} : combien fait 10 - {a} ?", "Il y a 10 {ctx}. {a} sont enlevés. Combien {de:ctx} reste-t-il ?"],
      hints: () => ["Utilise le fait d'addition correspondant pour t'aider : combien de plus fait 10 ?"]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.mcBondsTo10", levelKey: "Y1L5", objectiveCode: "Y1-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!,
    promptTemplates: ["Which number bonds with {a} to make 10?", "What number pairs with {a} to total 10?"],
    explain: (v, r) => [`${v[0]} + ${r} = 10.`],
    hints: () => ["Think of the number bond pair for 10."],
    distractorSpread: 3,
    declaredVariationSpace: 11 * 2,
    fr: {
      promptTemplates: ["Quel nombre s'associe avec {a} pour faire 10 ?", "Quel nombre se combine avec {a} pour faire 10 ?"],
      hints: () => ["Pense à la paire de compléments à 10."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.tfBondsTo10", levelKey: "Y1L5", objectiveCode: "Y1-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!, contextPool: CTX,
    promptTemplates: ["{a} and the missing bond add to make 10. The missing number is", "Counting {ctx}: {a} and the missing bond add to make 10. The missing number is"],
    explain: (v, r) => [`${v[0]} + ${r} = 10.`],
    hints: () => ["Check the pair adds to exactly 10."],
    distractorSpread: 3,
    declaredVariationSpace: 11 * 2 + 11 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} et le complément manquant font 10 ensemble. Le nombre manquant est", "En comptant les {ctx} : {a} et le complément manquant font 10 ensemble. Le nombre manquant est"],
      hints: () => ["Vérifie que la paire fait exactement 10."]
    }
  }),
  matchingTemplate({
    key: "y1l5.matchBondsTo10", levelKey: "Y1L5", objectiveCode: "Y1-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"],
    generatePairs: (rng) => {
      const used = new Set<number>();
      const pairs: Array<{ left: string; right: string }> = [];
      while (pairs.length < 4) {
        const n = rng.int(0, 10);
        if (used.has(n)) continue;
        used.add(n);
        pairs.push({ left: String(n), right: String(10 - n) });
      }
      return pairs;
    },
    promptTemplates: ["Match each number to its bond partner that makes 10."],
    explain: () => ["Each pair of numbers adds together to make 10."],
    hints: () => ["Think: what plus this number equals 10?"],
    fr: {
      promptTemplates: ["Associe chaque nombre à son complément qui fait 10."],
      explain: () => ["Chaque paire de nombres s'additionne pour faire 10."],
      hints: () => ["Pense : combien de plus fait 10 ?"]
    },
    declaredVariationSpace: 1800
  }),

  // --- Y1-L5-2: find a missing number in an addition or subtraction sentence ---
  arithmeticTemplate({
    key: "y1l5.missingFirstAddend", levelKey: "Y1L5", objectiveCode: "Y1-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "MISSING_NUMBER",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! >= v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["___ + {a} = {b}", "What number plus {a} makes {b}?", "Counting {ctx}: what number plus {a} makes {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 66 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["___ + {a} = {b}", "Quel nombre plus {a} fait {b} ?", "En comptant les {ctx} : quel nombre plus {a} fait {b} ?"],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.missingSecondAddend", levelKey: "Y1L5", objectiveCode: "Y1-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "MISSING_NUMBER",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! >= v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["{a} + ___ = {b}", "What must be added to {a} to make {b}?", "Counting {ctx}: what must be added to {a} to make {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 66 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + ___ = {b}", "Que faut-il ajouter à {a} pour faire {b} ?", "En comptant les {ctx} : que faut-il ajouter à {a} pour faire {b} ?"],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.missingMinuend", levelKey: "Y1L5", objectiveCode: "Y1-L5-2", difficulty: "REASONING",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "MISSING_NUMBER",
    ranges: [[0, 10], [0, 10]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["___ - {a} = {b}", "What number, minus {a}, leaves {b}?", "Counting {ctx}: what number, minus {a}, leaves {b}?"],
    explain: (v, r) => [`${v[1]} + ${v[0]} = ${r}.`],
    hints: () => ["Add the two numbers together to find the starting number."],
    declaredVariationSpace: 121 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["___ - {a} = {b}", "Quel nombre, moins {a}, laisse {b} ?", "En comptant les {ctx} : quel nombre, moins {a}, laisse {b} ?"],
      hints: () => ["Additionne les deux nombres pour trouver le nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.missingSubtrahendSentence", levelKey: "Y1L5", objectiveCode: "Y1-L5-2", difficulty: "REASONING",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "MISSING_NUMBER",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["{b} - ___ = {a}", "What must be taken from {b} to leave {a}?", "Counting {ctx}: what must be taken from {b} to leave {a}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 55 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{b} - ___ = {a}", "Que faut-il enlever à {b} pour qu'il reste {a} ?", "En comptant les {ctx} : que faut-il enlever à {b} pour qu'il reste {a} ?"],
      hints: () => ["Calcule la différence entre le nombre de départ et ce qu'il reste."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.mcMissingNumberSentence", levelKey: "Y1L5", objectiveCode: "Y1-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! >= v[0]!, compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["{a} + ___ = {b}. What is the missing number?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    distractorSpread: 3,
    declaredVariationSpace: 66,
    fr: {
      promptTemplates: ["{a} + ___ = {b}. Quel est le nombre manquant ?"],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),

  arithmeticTemplate({
    key: "y1l5.mcMissingMinuend", levelKey: "Y1L5", objectiveCode: "Y1-L5-2", difficulty: "REASONING",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 10], [0, 10]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["___ - {a} = {b}. What is the missing number?"],
    explain: (v, r) => [`${v[1]} + ${v[0]} = ${r}.`],
    hints: () => ["Add the two numbers together to find the starting number."],
    distractorSpread: 3,
    declaredVariationSpace: 121,
    fr: {
      promptTemplates: ["___ - {a} = {b}. Quel est le nombre manquant ?"],
      hints: () => ["Additionne les deux nombres pour trouver le nombre de départ."]
    }
  }),

  // --- Y1-L5-3: solve simple worded problems using number bonds ---
  arithmeticTemplate({
    key: "y1l5.wordProblemBondsTo10", levelKey: "Y1L5", objectiveCode: "Y1-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "WORD_PROBLEM",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!, contextPool: CTX,
    promptTemplates: ["A box holds 10 {ctx}. {a} are already inside. How many more are needed to fill the box?", "A tray has space for 10 {ctx}. {a} {ctx} are on it so far. How many more {ctx} will fill the tray?"],
    explain: (v, r) => [`10 - ${v[0]} = ${r}.`],
    hints: () => ["Think about what is needed to reach 10 altogether."],
    declaredVariationSpace: 11 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Une boîte contient 10 {ctx}. {a} sont déjà dedans. Combien de plus faut-il pour remplir la boîte ?", "Un plateau a de la place pour 10 {ctx}. {a} {ctx} y sont pour l'instant. Combien {de:ctx} de plus rempliront le plateau ?"],
      hints: () => ["Réfléchis à ce qu'il faut pour atteindre 10 en tout."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.wordProblemMissingAddend", levelKey: "Y1L5", objectiveCode: "Y1-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "WORD_PROBLEM",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! >= v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["Jo had {a} {ctx}. A friend gave Jo some more, and now Jo has {b} {ctx}. How many did the friend give?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting and ending amounts."],
    declaredVariationSpace: 66 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Jo avait {a} {ctx}. Un ami lui en a donné d'autres, et maintenant Jo a {b} {ctx}. Combien l'ami lui en a-t-il donné ?"],
      hints: () => ["Calcule la différence entre la quantité de départ et la quantité finale."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.wordProblemMissingSubtrahend", levelKey: "Y1L5", objectiveCode: "Y1-L5-3", difficulty: "REASONING",
    misconceptionTags: ["MISSING_NUMBER_SENTENCE"], type: "WORD_PROBLEM",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["Sam had {b} {ctx} and gave some away. Sam now has {a} {ctx} left. How many did Sam give away?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between what Sam started with and what is left."],
    declaredVariationSpace: 55 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Sam avait {b} {ctx} et en a donné quelques-uns. Il reste maintenant {a} {ctx} à Sam. Combien en a-t-il donné ?"],
      hints: () => ["Calcule la différence entre ce que Sam avait au départ et ce qu'il lui reste."]
    }
  }),
  arithmeticTemplate({
    key: "y1l5.wordProblemBondsVisual", levelKey: "Y1L5", objectiveCode: "Y1-L5-3", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "VISUAL_COUNT",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!, contextPool: CTX,
    promptTemplates: ["The ten frame shows {a} filled squares, each standing for one of {ctx}. How many empty squares are left?", "{a} {ctx} fill some squares of a ten frame. How many empty squares are left?"],
    explain: (v, r) => [`10 - ${v[0]} = ${r}.`],
    hints: () => ["Count the empty squares in the ten frame."],
    visualAid: (v) => visuals.tenFrame(v[0]!),
    declaredVariationSpace: 11 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Le cadre de dix montre {a} cases remplies, chacune représentant un(e) des {ctx}. Combien de cases vides reste-t-il ?", "{a} {ctx} remplissent certaines cases d'un cadre de dix. Combien de cases vides reste-t-il ?"],
      hints: () => ["Compte les cases vides dans le cadre de dix."]
    }
  })
];

export default level;
