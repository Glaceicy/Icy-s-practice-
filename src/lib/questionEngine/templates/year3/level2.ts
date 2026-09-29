import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 3, Level 2 — "Written addition and subtraction"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y3-L2-1 mental addition/subtraction with a
// three-digit number and ones/tens/hundreds, Y3-L2-2 formal written column
// methods, Y3-L2-3 estimating and checking using inverse operations).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y3-L2-1: add/subtract mentally, a three-digit number and ones/tens/hundreds ---
  arithmeticTemplate({
    key: "y3l2.addThreeDigitAndOnes", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[100, 899], [1, 9]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the ones on to the three-digit number."],
    declaredVariationSpace: 800 * 9 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "En comptant les {ctx} : combien font {a} + {b} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Ajoute les unités au nombre à trois chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.subtractOnesFromThreeDigit", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[100, 999], [1, 9]], compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Take the ones away from the three-digit number."],
    declaredVariationSpace: 900 * 9 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "En comptant les {ctx} : combien font {a} - {b} ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Retire les unités du nombre à trois chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.addThreeDigitAndTens", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[100, 890], [1, 9]], compute: (v) => v[0]! + v[1]! * 10,
    derive: (v) => ({ bTens: v[1]! * 10 }), contextPool: CTX,
    promptTemplates: ["{a} + {bTens} = ?", "Counting {ctx}: what is {a} + {bTens}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]! * 10} = ${r}.`],
    hints: () => ["Add the tens on to the three-digit number — the ones digit stays the same."],
    declaredVariationSpace: 791 * 9 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {bTens} = ?", "En comptant les {ctx} : combien font {a} + {bTens} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]! * 10} = ${r}.`],
      hints: () => ["Ajoute les dizaines au nombre à trois chiffres — le chiffre des unités ne change pas."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.subtractTensFromThreeDigit", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[190, 999], [1, 9]], compute: (v) => v[0]! - v[1]! * 10,
    derive: (v) => ({ bTens: v[1]! * 10 }), contextPool: CTX,
    promptTemplates: ["{a} - {bTens} = ?", "Counting {ctx}: what is {a} - {bTens}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]! * 10} = ${r}.`],
    hints: () => ["Take the tens away from the three-digit number — the ones digit stays the same."],
    declaredVariationSpace: 810 * 9 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {bTens} = ?", "En comptant les {ctx} : combien font {a} - {bTens} ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]! * 10} = ${r}.`],
      hints: () => ["Retire les dizaines du nombre à trois chiffres — le chiffre des unités ne change pas."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.addThreeDigitAndHundreds", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[100, 199], [1, 8]], compute: (v) => v[0]! + v[1]! * 100,
    derive: (v) => ({ bHundreds: v[1]! * 100 }), contextPool: CTX,
    promptTemplates: ["{a} + {bHundreds} = ?", "Counting {ctx}: what is {a} + {bHundreds}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]! * 100} = ${r}.`],
    hints: () => ["Add the hundreds on — the tens and ones digits stay the same."],
    declaredVariationSpace: 100 * 8 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {bHundreds} = ?", "En comptant les {ctx} : combien font {a} + {bHundreds} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]! * 100} = ${r}.`],
      hints: () => ["Ajoute les centaines — les chiffres des dizaines et des unités ne changent pas."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.missingAddendMental", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[100, 899], [1, 99]], constraint: (v) => v[0]! + v[1]! <= 999, compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["{a} + ___ = {c}", "Counting {ctx}: {a} + ___ = {c}"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 800 * 99 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + ___ = {c}", "En comptant les {ctx} : {a} + ___ = {c}"],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.wordProblemMentalAddSubtract", levelKey: "Y3L2", objectiveCode: "Y3-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[100, 899], [1, 99]], constraint: (v) => v[0]! + v[1]! <= 999, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a warehouse. {b} more are delivered. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two amounts together mentally."],
    declaredVariationSpace: 800 * 99 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} dans un entrepôt. {b} de plus sont livrés. Combien y a-t-il de {ctx} maintenant ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne mentalement les deux quantités."]
    }
  }),

  // --- Y3-L2-2: use formal written column methods for addition and subtraction ---
  arithmeticTemplate({
    key: "y3l2.addTwoThreeDigit", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[100, 899], [100, 899]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Use the column method: {a} + {b} = ?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}. Add ones, then tens, then hundreds, carrying where needed.`],
    hints: () => ["Line up the ones, tens and hundreds columns, then add from the right."],
    declaredVariationSpace: 800 * 800 * 2,
    fr: {
      promptTemplates: ["{a} + {b} = ?", "Utilise la méthode en colonnes : {a} + {b} = ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}. Additionne les unités, puis les dizaines, puis les centaines, en retenant si besoin.`],
      hints: () => ["Aligne les colonnes des unités, des dizaines et des centaines, puis additionne en partant de la droite."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.subtractTwoThreeDigit", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_BORROW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[200, 999], [100, 899]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} = ?", "Use the column method: {a} - {b} = ?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}. Subtract ones, then tens, then hundreds, borrowing where needed.`],
    hints: () => ["Line up the ones, tens and hundreds columns, then subtract from the right."],
    declaredVariationSpace: 800 * 800 * 2,
    fr: {
      promptTemplates: ["{a} - {b} = ?", "Utilise la méthode en colonnes : {a} - {b} = ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}. Soustrais les unités, puis les dizaines, puis les centaines, en empruntant si besoin.`],
      hints: () => ["Aligne les colonnes des unités, des dizaines et des centaines, puis soustrais en partant de la droite."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.addTwoThreeDigitWithCarry", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[100, 899], [100, 899]], constraint: (v) => (v[0]! % 10) + (v[1]! % 10) >= 10, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} = ? (You will need to carry.)"],
    explain: (v, r) => [`${v[0]! % 10} + ${v[1]! % 10} = ${(v[0]! % 10) + (v[1]! % 10)}, so carry 1 into the tens column. ${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["When the ones add up to 10 or more, carry 1 into the tens column."],
    declaredVariationSpace: 800 * 800,
    fr: {
      promptTemplates: ["{a} + {b} = ? (Tu devras retenir.)"],
      explain: (v, r) => [`${v[0]! % 10} + ${v[1]! % 10} = ${(v[0]! % 10) + (v[1]! % 10)}, donc retiens 1 dans la colonne des dizaines. ${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Quand les unités totalisent 10 ou plus, retiens 1 dans la colonne des dizaines."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.subtractTwoThreeDigitWithBorrow", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_BORROW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[200, 999], [100, 899]], constraint: (v) => v[0]! > v[1]! && (v[0]! % 10) < (v[1]! % 10), compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} = ? (You will need to borrow.)"],
    explain: (v, r) => [`${v[0]! % 10} is smaller than ${v[1]! % 10}, so borrow 1 ten to subtract the ones. ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["When the ones digit is too small to subtract from, borrow 1 from the tens column."],
    declaredVariationSpace: 800 * 800,
    fr: {
      promptTemplates: ["{a} - {b} = ? (Tu devras emprunter.)"],
      explain: (v, r) => [`${v[0]! % 10} est plus petit que ${v[1]! % 10}, donc emprunte 1 dizaine pour soustraire les unités. ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Quand le chiffre des unités est trop petit pour soustraire, emprunte 1 à la colonne des dizaines."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.missingDigitColumnAdd", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "REASONING",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "MISSING_NUMBER",
    ranges: [[100, 899], [100, 899]], compute: (v) => v[0]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["___ + {b} = {c}. Use the column method to find the missing number.", "What number, added to {b}, makes {c}?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[1]} = ${r}.`],
    hints: () => ["Use the inverse (subtraction) to find the missing addend."],
    declaredVariationSpace: 800 * 800 * 2,
    fr: {
      promptTemplates: ["___ + {b} = {c}. Utilise la méthode en colonnes pour trouver le nombre manquant.", "Quel nombre, ajouté à {b}, donne {c} ?"],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[1]} = ${r}.`],
      hints: () => ["Utilise l'opération inverse (la soustraction) pour trouver le terme manquant."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.mcAddTwoThreeDigit", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[100, 899], [100, 899]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the columns from the right, carrying where needed."],
    distractorSpread: 50,
    declaredVariationSpace: 800 * 800,
    fr: {
      promptTemplates: ["Combien font {a} + {b} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne les colonnes en partant de la droite, en retenant si besoin."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.wordProblemColumnAddition", levelKey: "Y3L2", objectiveCode: "Y3-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 899], [100, 899]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["A shop sold {a} {ctx} in one week and {b} {ctx} the next week. How many {ctx} were sold in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Use the column method to add the two totals."],
    declaredVariationSpace: 800 * 800 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un magasin a vendu {a} {ctx} une semaine et {b} {ctx} la semaine suivante. Combien de {ctx} ont été vendus au total ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Utilise la méthode en colonnes pour additionner les deux totaux."]
    }
  }),

  // --- Y3-L2-3: estimate and check answers using inverse operations ---
  arithmeticTemplate({
    key: "y3l2.estimateSumRoundHundred", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 899], [100, 899]], compute: (v) => Math.round(v[0]! / 100) * 100 + Math.round(v[1]! / 100) * 100,
    promptTemplates: ["Estimate {a} + {b} by rounding each number to the nearest 100 first."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 100) * 100}. ${v[1]} rounds to ${Math.round(v[1]! / 100) * 100}. ${Math.round(v[0]! / 100) * 100} + ${Math.round(v[1]! / 100) * 100} = ${r}.`],
    hints: () => ["Round each number to the nearest 100 before adding."],
    declaredVariationSpace: 800 * 800,
    fr: {
      promptTemplates: ["Estime {a} + {b} en arrondissant d'abord chaque nombre à la centaine près."],
      explain: (v, r) => [`${v[0]} s'arrondit à ${Math.round(v[0]! / 100) * 100}. ${v[1]} s'arrondit à ${Math.round(v[1]! / 100) * 100}. ${Math.round(v[0]! / 100) * 100} + ${Math.round(v[1]! / 100) * 100} = ${r}.`],
      hints: () => ["Arrondis chaque nombre à la centaine près avant d'additionner."]
    }
  }),
  arithmeticTemplate({
    key: "y3l2.estimateDifferenceRoundHundred", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[200, 899], [100, 799]],
    constraint: (v) => v[0]! > v[1]! && Math.round(v[0]! / 100) * 100 >= Math.round(v[1]! / 100) * 100,
    compute: (v) => Math.round(v[0]! / 100) * 100 - Math.round(v[1]! / 100) * 100,
    promptTemplates: ["Estimate {a} - {b} by rounding each number to the nearest 100 first."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 100) * 100}. ${v[1]} rounds to ${Math.round(v[1]! / 100) * 100}. ${Math.round(v[0]! / 100) * 100} - ${Math.round(v[1]! / 100) * 100} = ${r}.`],
    hints: () => ["Round each number to the nearest 100 before subtracting."],
    declaredVariationSpace: 700 * 700
  }),
  categoricalPoolTemplate({
    key: "y3l2.inverseCheckAddition", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 899);
      const b = rng.int(100, 899);
      const c = a + b;
      const isTrueCase = rng.chance(0.5);
      const shownA = isTrueCase ? a : a + rng.int(1, 20) * (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `Since ${a} + ${b} = ${c}, ${c} - ${b} = ${shownA}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${c} - ${b} = ${a}, the inverse of adding ${b}.`],
        hints: ["Subtraction is the inverse of addition."]
      };
    },
    declaredVariationSpace: 800 * 800 * 2
  }),
  categoricalPoolTemplate({
    key: "y3l2.inverseCheckSubtraction", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(200, 999);
      let b = rng.int(100, 899);
      while (b >= a) b = rng.int(100, 899);
      const c = a - b;
      const isTrueCase = rng.chance(0.5);
      const shownA = isTrueCase ? a : a + rng.int(1, 20) * (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `Since ${a} - ${b} = ${c}, ${c} + ${b} = ${shownA}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${c} + ${b} = ${a}, the inverse of subtracting ${b}.`],
        hints: ["Addition is the inverse of subtraction."]
      };
    },
    declaredVariationSpace: 800 * 800 * 2
  }),
  arithmeticTemplate({
    key: "y3l2.missingNumberUsingInverse", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[100, 899], [1, 899]], compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }), contextPool: CTX,
    promptTemplates: ["{a} + ___ = {c}. Use the inverse operation (subtraction) to find the missing number.", "Counting {ctx}: {a} + ___ = {c}"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract the known number from the total to undo the addition."],
    declaredVariationSpace: 800 * 899 * 2 * CTX.length
  }),
  categoricalPoolTemplate({
    key: "y3l2.mcEstimateSum", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 899);
      const b = rng.int(100, 899);
      const roundedSum = Math.round(a / 100) * 100 + Math.round(b / 100) * 100;
      const distractors = numericDistractors(rng, roundedSum, 3, 100).map(String);
      return {
        prompt: `Which is the best estimate for ${a} + ${b}, rounding each to the nearest 100?`,
        correctLabel: String(roundedSum),
        distractorLabels: distractors,
        explanationSteps: [`${a} rounds to ${Math.round(a / 100) * 100}. ${b} rounds to ${Math.round(b / 100) * 100}. Their sum is ${roundedSum}.`],
        hints: ["Round each number to the nearest 100 before adding."]
      };
    },
    declaredVariationSpace: 800 * 800
  }),
  arithmeticTemplate({
    key: "y3l2.wordProblemCheckWithInverse", levelKey: "Y3L2", objectiveCode: "Y3-L2-3", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 499], [100, 499]], compute: (v) => v[1]!,
    derive: (v) => ({ c: v[0]! + v[1]! }),
    promptTemplates: ["A bricklayer used {a} bricks to build one wall, then some more to build a second wall, using {c} bricks in total. To check this, work out {c} - {a}. How many bricks were used for the second wall?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}, using the inverse operation (subtraction) to check the total.`],
    hints: () => ["Subtract the known amount from the total to find the missing amount."],
    declaredVariationSpace: 400 * 400
  })
];

export default level;
