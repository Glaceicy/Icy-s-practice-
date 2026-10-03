import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 2 — "The four operations and order of operations"
const CITIES = ["London", "Edinburgh", "Manchester", "Cardiff", "Belfast", "Leeds", "Bristol", "York"];

export const level: QuestionTemplateDef[] = [
  // --- Y7-L2-1: use the four operations with integers, fractions and decimals ---
  arithmeticTemplate({
    key: "y7l2.multiplyDecimals", levelKey: "Y7L2", objectiveCode: "Y7-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99], [1, 9]], compute: (v) => Math.round(v[0]! * v[1]!) / 10,
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    promptTemplates: ["{decimal} x {b} = ?", "Work out {decimal} x {b}."],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `Divide by 10 for one decimal place: ${r}.`],
    hints: () => ["Multiply as whole numbers first, then place the decimal point."],
    fr: {
      promptTemplates: ["{decimal} x {b} = ?", "Calcule {decimal} x {b}."],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `Divise par 10 pour une décimale : ${r}.`],
      hints: () => ["Multiplie d'abord comme des nombres entiers, puis place la virgule."]
    },
    declaredVariationSpace: 99 * 9 * 2
  }),
  arithmeticTemplate({
    key: "y7l2.divideDecimals", levelKey: "Y7L2", objectiveCode: "Y7-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [2, 9]], compute: (v) => v[0]! / 10,
    derive: (v) => ({ decimal: ((v[0]! * v[1]!) / 10).toFixed(1), b: v[1]! }),
    promptTemplates: ["{decimal} ÷ {b} = ?", "Work out {decimal} ÷ {b}."],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${v[0]}, as whole numbers.`, `So ${((v[0]! * v[1]!) / 10).toFixed(1)} ÷ ${v[1]} = ${r.toFixed(1)}.`],
    hints: () => ["Divide as whole numbers first, then place the decimal point back."],
    fr: {
      promptTemplates: ["{decimal} ÷ {b} = ?", "Calcule {decimal} ÷ {b}."],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${v[0]}, comme des nombres entiers.`, `Donc ${((v[0]! * v[1]!) / 10).toFixed(1)} ÷ ${v[1]} = ${r.toFixed(1)}.`],
      hints: () => ["Divise d'abord comme des nombres entiers, puis replace la virgule."]
    },
    declaredVariationSpace: 20 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y7l2.addFractionsSameDenominator", levelKey: "Y7L2", objectiveCode: "Y7-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_DENOMINATOR_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 10], [1, 7], [1, 7]], constraint: (v) => v[1]! < v[0]! && v[2]! < v[0]! && v[1]! + v[2]! < v[0]!,
    compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["{b}/{a} + {c}/{a} = ?/{a}", "Work out {b}/{a} + {c}/{a} (give the numerator)."],
    explain: (v, r) => [`With the same denominator, add the numerators: ${v[1]} + ${v[2]} = ${r}.`, `The answer is ${r}/${v[0]}.`],
    hints: () => ["When denominators match, just add the numerators."],
    fr: {
      promptTemplates: ["{b}/{a} + {c}/{a} = ?/{a}", "Calcule {b}/{a} + {c}/{a} (donne le numérateur)."],
      explain: (v, r) => [`Avec le même dénominateur, additionne les numérateurs : ${v[1]} + ${v[2]} = ${r}.`, `Le résultat est ${r}/${v[0]}.`],
      hints: () => ["Quand les dénominateurs sont identiques, additionne juste les numérateurs."]
    },
    declaredVariationSpace: 9 * 7 * 7 * 2
  }),
  arithmeticTemplate({
    key: "y7l2.mcMultiplyIntegerDecimal", levelKey: "Y7L2", objectiveCode: "Y7-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 50], [2, 9]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    promptTemplates: ["What is {decimal} x {b}?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}, so ${(v[0]! / 10).toFixed(1)} x ${v[1]} = ${(r / 10).toFixed(1)}.`],
    hints: () => ["Multiply as whole numbers, then place the decimal point."],
    formatValue: (n) => (n / 10).toFixed(1),
    distractorSpread: 15,
    fr: {
      promptTemplates: ["Combien font {decimal} x {b} ?"],
      hints: () => ["Multiplie comme des nombres entiers, puis place la virgule."]
    },
    declaredVariationSpace: 50 * 8
  }),
  arithmeticTemplate({
    key: "y7l2.wordProblemFourOperations", levelKey: "Y7L2", objectiveCode: "Y7-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 20], [2, 12]], compute: (v) => v[0]! * v[1]!, contextPool: CITIES,
    promptTemplates: ["A shop in {ctx} sells pens for £{a} each. How much do {b} pens cost in total, in pounds?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the price per pen by how many pens are bought."],
    fr: {
      promptTemplates: ["Un magasin à {ctx} vend des stylos à £{a} chacun. Combien coûtent {b} stylos au total, en livres ?"],
      hints: () => ["Multiplie le prix d'un stylo par le nombre de stylos achetés."]
    },
    declaredVariationSpace: 19 * 11 * CITIES.length
  }),

  // --- Y7-L2-2: use conventional notation for priority of operations (BIDMAS) ---
  arithmeticTemplate({
    key: "y7l2.bidmasAddMultiply", levelKey: "Y7L2", objectiveCode: "Y7-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 10], [1, 10]], compute: (v) => v[0]! + v[1]! * v[2]!,
    promptTemplates: ["{a} + {b} x {c} = ?", "Work out {a} + {b} x {c}."],
    explain: (v, r) => [`Multiply first: ${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `Then add: ${v[0]} + ${v[1]! * v[2]!} = ${r}.`],
    hints: () => ["Multiplication happens before addition (BIDMAS)."],
    fr: {
      promptTemplates: ["{a} + {b} x {c} = ?", "Calcule {a} + {b} x {c}."],
      explain: (v, r) => [`Multiplie d'abord : ${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `Puis additionne : ${v[0]} + ${v[1]! * v[2]!} = ${r}.`],
      hints: () => ["La multiplication se fait avant l'addition (priorités des opérations)."]
    },
    declaredVariationSpace: 15 * 10 * 10 * 2
  }),
  arithmeticTemplate({
    key: "y7l2.bidmasBracketsFirst", levelKey: "Y7L2", objectiveCode: "Y7-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [1, 10], [1, 10]], compute: (v) => (v[0]! + v[1]!) * v[2]!,
    promptTemplates: ["({a} + {b}) x {c} = ?", "Work out ({a} + {b}) x {c}."],
    explain: (v, r) => [`Brackets first: ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `Then multiply: ${v[0]! + v[1]!} x ${v[2]} = ${r}.`],
    hints: () => ["Always work out brackets first."],
    fr: {
      promptTemplates: ["({a} + {b}) x {c} = ?", "Calcule ({a} + {b}) x {c}."],
      explain: (v, r) => [`Les parenthèses d'abord : ${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `Puis multiplie : ${v[0]! + v[1]!} x ${v[2]} = ${r}.`],
      hints: () => ["Calcule toujours les parenthèses en premier."]
    },
    declaredVariationSpace: 10 * 10 * 10 * 2
  }),
  arithmeticTemplate({
    key: "y7l2.bidmasDivideSubtract", levelKey: "Y7L2", objectiveCode: "Y7-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 30], [1, 8], [2, 9]], constraint: (v) => v[0]! >= Math.floor(v[1]! * v[2]!),
    compute: (v) => v[0]! - v[1]! * v[2]!,
    promptTemplates: ["{a} - {b} x {c} = ?", "Work out {a} - {b} x {c}."],
    explain: (v, r) => [`Multiply first: ${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `Then subtract: ${v[0]} - ${v[1]! * v[2]!} = ${r}.`],
    hints: () => ["Multiplication happens before subtraction (BIDMAS)."],
    fr: {
      promptTemplates: ["{a} - {b} x {c} = ?", "Calcule {a} - {b} x {c}."],
      explain: (v, r) => [`Multiplie d'abord : ${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `Puis soustrais : ${v[0]} - ${v[1]! * v[2]!} = ${r}.`],
      hints: () => ["La multiplication se fait avant la soustraction (priorités des opérations)."]
    },
    declaredVariationSpace: 21 * 8 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y7l2.mcBidmas", levelKey: "Y7L2", objectiveCode: "Y7-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [1, 10], [1, 10]], compute: (v) => v[0]! + v[1]! * v[2]!,
    promptTemplates: ["What is {a} + {b} x {c}?"],
    explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}, then ${v[0]} + ${v[1]! * v[2]!} = ${r}.`],
    hints: () => ["Multiply before you add."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Combien font {a} + {b} x {c} ?"],
      hints: () => ["Multiplie avant d'additionner."]
    },
    declaredVariationSpace: 15 * 10 * 10
  }),
  categoricalPoolTemplate({
    key: "y7l2.tfBidmas", levelKey: "Y7L2", objectiveCode: "Y7-L2-2", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 15);
      const b = rng.int(1, 10);
      const c = rng.int(1, 10);
      const correct = a + b * c;
      const wrong = (a + b) * c;
      const showCorrect = rng.chance(0.5);
      const shown = showCorrect ? correct : wrong;
      return {
        prompt: `${a} + ${b} x ${c} = ${shown}. True or false?`,
        correctLabel: showCorrect ? "True" : "False",
        distractorLabels: [showCorrect ? "False" : "True"],
        explanationSteps: [`${b} x ${c} = ${b * c}, then ${a} + ${b * c} = ${correct}.`],
        hints: ["Multiply before you add — do not just work left to right."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+) \+ (\d+) x (\d+) = (\d+)\. True or false\?/);
        if (!m) return {};
        const a = m[1]!, b = m[2]!, c = m[3]!, shown = m[4]!;
        const correct = Number(a) + Number(b) * Number(c);
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${a} + ${b} x ${c} = ${shown}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`${b} x ${c} = ${Number(b) * Number(c)}, puis ${a} + ${Number(b) * Number(c)} = ${correct}.`],
          hints: ["Multiplie avant d'additionner — ne calcule pas simplement de gauche à droite."]
        };
      }
    },
    declaredVariationSpace: 15 * 10 * 10 * 2
  }),

  // --- Y7-L2-3: use a calculator and interpret results accurately ---
  arithmeticTemplate({
    key: "y7l2.roundToOneDp", levelKey: "Y7L2", objectiveCode: "Y7-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-9999, 9999]], compute: (v) => Math.round(v[0]! / 10) / 10,
    derive: (v) => ({ decimal: (v[0]! / 100).toFixed(2) }),
    promptTemplates: ["A calculator shows {decimal}. Round this to 1 decimal place."],
    explain: (v, r) => [`${(v[0]! / 100).toFixed(2)} rounds to ${r.toFixed(1)}.`],
    hints: () => ["Look at the second decimal place to decide whether to round up or down."],
    fr: {
      promptTemplates: ["Une calculatrice affiche {decimal}. Arrondis à 1 décimale."],
      hints: () => ["Regarde la deuxième décimale pour décider d'arrondir vers le haut ou le bas."]
    },
    declaredVariationSpace: 19998
  }),
  arithmeticTemplate({
    key: "y7l2.roundToWholeNumber", levelKey: "Y7L2", objectiveCode: "Y7-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-999, 999]], compute: (v) => Math.round(v[0]! / 10),
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    promptTemplates: ["A calculator shows {decimal}. Round this to the nearest whole number."],
    explain: (v, r) => [`${(v[0]! / 10).toFixed(1)} rounds to ${r}.`],
    hints: () => ["Look at the decimal part to decide whether to round up or down."],
    fr: {
      promptTemplates: ["Une calculatrice affiche {decimal}. Arrondis au nombre entier le plus proche."],
      hints: () => ["Regarde la partie décimale pour décider d'arrondir vers le haut ou le bas."]
    },
    declaredVariationSpace: 1998
  }),
  arithmeticTemplate({
    key: "y7l2.mcRounding", levelKey: "Y7L2", objectiveCode: "Y7-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[-999, 999]], compute: (v) => Math.round(v[0]! / 10),
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    promptTemplates: ["Round {decimal} to the nearest whole number."],
    explain: (v, r) => [`${(v[0]! / 10).toFixed(1)} rounds to ${r}.`],
    hints: () => ["Check the decimal part to round up or down."],
    distractorSpread: 2,
    fr: {
      promptTemplates: ["Arrondis {decimal} au nombre entier le plus proche."],
      hints: () => ["Vérifie la partie décimale pour arrondir vers le haut ou le bas."]
    },
    declaredVariationSpace: 1998
  }),
  arithmeticTemplate({
    key: "y7l2.multiStepCalculatorProblem", levelKey: "Y7L2", objectiveCode: "Y7-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 20], [2, 12], [1, 50]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: ["A calculator is used to work out {a} x {b} + {c}. What is the result?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Enter the multiplication first, then add the last number."],
    fr: {
      promptTemplates: ["Une calculatrice est utilisée pour calculer {a} x {b} + {c}. Quel est le résultat ?"],
      hints: () => ["Entre d'abord la multiplication, puis ajoute le dernier nombre."]
    },
    declaredVariationSpace: 19 * 11 * 50
  }),
  arithmeticTemplate({
    key: "y7l2.wordProblemCalculatorAccuracy", levelKey: "Y7L2", objectiveCode: "Y7-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 10), contextPool: CITIES,
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    promptTemplates: ["A shop in {ctx} uses a calculator and gets a total of £{decimal}. Rounded to the nearest pound, how much is that?"],
    explain: (v, r) => [`£${(v[0]! / 10).toFixed(1)} rounds to £${r}.`],
    hints: () => ["Round the decimal amount to the nearest whole pound."],
    formatValue: (n) => `${n}`,
    fr: {
      contextPool: CITIES,
      promptTemplates: ["Un magasin à {ctx} utilise une calculatrice et obtient un total de £{decimal}. Arrondi à la livre la plus proche, combien cela fait-il ?"],
      hints: () => ["Arrondis le montant décimal à la livre entière la plus proche."]
    },
    declaredVariationSpace: 998 * CITIES.length
  })
];

export default level;
