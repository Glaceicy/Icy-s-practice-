import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 10 — "Year 7 mixed mastery" — a mixed review drawing on every
// Year 7 topic (number, fractions/decimals/percentages, ratio, algebra,
// equations, angles, area/volume and statistics).
const CTX = ["pencils", "stickers", "sweets", "marbles", "badges", "counters", "cards", "tokens"];
const CTX_FR = ["crayons", "autocollants", "bonbons", "billes", "badges", "jetons", "cartes", "jetons de jeu"];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y7-L10-1: integers, fractions, decimals and percentages ---
  arithmeticTemplate({
    key: "y7l10.bidmasMixed", levelKey: "Y7L10", objectiveCode: "Y7-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [2, 10], [1, 10]], compute: (v) => v[0]! + v[1]! * v[2]!,
    promptTemplates: ["{a} + {b} x {c} = ?", "Work out {a} + {b} x {c}."],
    explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `${v[0]} + ${v[1]! * v[2]!} = ${r}.`],
    hints: () => ["Multiplication comes before addition."],
    fr: {
      promptTemplates: ["{a} + {b} x {c} = ?", "Calcule {a} + {b} x {c}."],
      explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `${v[0]} + ${v[1]! * v[2]!} = ${r}.`],
      hints: () => ["La multiplication se fait avant l'addition."]
    },
    declaredVariationSpace: 20 * 9 * 10 * 2
  }),
  arithmeticTemplate({
    key: "y7l10.negativeArithmetic", levelKey: "Y7L10", objectiveCode: "Y7-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-25, 25], [-25, 25]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} = ?", "Work out {a} + ({b})."],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Picture a number line: adding a negative moves left."],
    visualAid: (v) => visuals.numberLine(-50, 50, v[0]! + v[1]!, v[0]!),
    fr: {
      promptTemplates: ["{a} + {b} = ?", "Calcule {a} + ({b})."],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Imagine une droite numérique : ajouter un négatif déplace vers la gauche."]
    },
    declaredVariationSpace: 51 * 51 * 2
  }),
  arithmeticTemplate({
    key: "y7l10.percentageOfAmount", levelKey: "Y7L10", objectiveCode: "Y7-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 20]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["What is {a}% of {base}?", "Work out {a}% of {base}."],
    explain: (v, r) => [`${v[1]! * 100} ÷ 100 = ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Find 1% first by dividing by 100, then multiply."],
    fr: {
      promptTemplates: ["Combien font {a} % de {base} ?", "Calcule {a} % de {base}."],
      explain: (v, r) => [`${v[1]! * 100} ÷ 100 = ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Trouve d'abord 1 % en divisant par 100, puis multiplie."]
    },
    declaredVariationSpace: 50 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y7l10.fractionOfAmount", levelKey: "Y7L10", objectiveCode: "Y7-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 12]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ amount: v[1]! * v[2]! }),
    promptTemplates: ["What is {a}/{b} of {amount}?", "A box holds {amount} {ctx}. How many is {a}/{b} of them?"],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
    hints: () => ["Divide by the denominator, then multiply by the numerator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Combien font {a}/{b} de {amount} ?", "Une boîte contient {amount} {ctx}. Combien cela fait-il pour {a}/{b} d'entre eux ?"],
      explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
      hints: () => ["Divise par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 9 * 9 * 12 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y7l10.mcRounding", levelKey: "Y7L10", objectiveCode: "Y7-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[-999, 999]], compute: (v) => Math.round(v[0]! / 10),
    derive: (v) => ({ decimal: (v[0]! / 10).toFixed(1) }),
    promptTemplates: ["Round {decimal} to the nearest whole number."],
    explain: (v, r) => [`${(v[0]! / 10).toFixed(1)} rounds to ${r}.`],
    hints: () => ["Look at the decimal part to decide which way to round."],
    distractorSpread: 2,
    fr: {
      promptTemplates: ["Arrondis {decimal} au nombre entier le plus proche."],
      hints: () => ["Regarde la partie décimale pour décider du sens de l'arrondi."]
    },
    declaredVariationSpace: 1998
  }),

  // --- Y7-L10-2: ratio, algebraic manipulation and equations ---
  arithmeticTemplate({
    key: "y7l10.divideInRatio", levelKey: "Y7L10", objectiveCode: "Y7-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [1, 9], [1, 12]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: ["{total} is shared in the ratio {a}:{b}. What is the first share?", "{total} {ctx} are shared in the ratio {a}:{b}. How many does the first person get?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, each worth ${v[2]}.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the parts, divide the total, then multiply by the first number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{total} est partagé dans le rapport {a}:{b}. Quelle est la première part ?", "{total} {ctx} sont partagés dans le rapport {a}:{b}. Combien la première personne en reçoit-elle ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, chacune valant ${v[2]}.`, `${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Additionne les parts, divise le total, puis multiplie par le premier nombre."]
    },
    declaredVariationSpace: 9 * 9 * 12 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y7l10.collectLikeTerms", levelKey: "Y7L10", objectiveCode: "Y7-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15], [1, 15]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: ["Simplify {a}x + {b}y + {c}x. What is the coefficient of x?"],
    explain: (v, r) => [`${v[0]}x + ${v[2]}x = ${r}x; the y term stays separate.`],
    hints: () => ["Only combine terms with the same letter."],
    fr: {
      promptTemplates: ["Simplifie {a}x + {b}y + {c}x. Quel est le coefficient de x ?"],
      explain: (v, r) => [`${v[0]}x + ${v[2]}x = ${r}x ; le terme en y reste séparé.`],
      hints: () => ["Ne combine que les termes qui ont la même lettre."]
    },
    declaredVariationSpace: 15 * 15 * 15
  }),
  arithmeticTemplate({
    key: "y7l10.solveTwoStepEquation", levelKey: "Y7L10", objectiveCode: "Y7-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [0, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["{a}x + {b} = {total}. What is x?", "Solve {a}x + {b} = {total}."],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Undo the addition first, then the multiplication."],
    fr: {
      promptTemplates: ["{a}x + {b} = {total}. Que vaut x ?", "Résous {a}x + {b} = {total}."],
      explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Annule d'abord l'addition, puis la multiplication."]
    },
    declaredVariationSpace: 8 * 21 * 15 * 2
  }),
  arithmeticTemplate({
    key: "y7l10.substituteFormula", levelKey: "Y7L10", objectiveCode: "Y7-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 20], [0, 15]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: ["If x = {b}, what is {a}x + {c}?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Replace x with its value, then calculate."],
    fr: {
      promptTemplates: ["Si x = {b}, combien fait {a}x + {c} ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Remplace x par sa valeur, puis calcule."]
    },
    declaredVariationSpace: 12 * 20 * 16
  }),
  arithmeticTemplate({
    key: "y7l10.sequenceNthTerm", levelKey: "Y7L10", objectiveCode: "Y7-L10-2", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [0, 20], [1, 15]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: ["A sequence has nth term {a}n + {b}. What is the {c}th term?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the term number for n."],
    fr: {
      promptTemplates: ["Une suite a pour terme général {a}n + {b}. Quel est le {c}e terme ?"],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace n par le numéro du terme."]
    },
    declaredVariationSpace: 10 * 21 * 15
  }),

  // --- Y7-L10-3: angle facts, area, volume and statistics ---
  arithmeticTemplate({
    key: "y7l10.triangleMissingAngle", levelKey: "Y7L10", objectiveCode: "Y7-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 150], [10, 150]], constraint: (v) => v[0]! + v[1]! < 175,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: ["A triangle has angles {a}° and {b}°. What is the third angle, in degrees?"],
    explain: (v, r) => [`180 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Angles in a triangle total 180°."],
    fr: {
      promptTemplates: ["Un triangle a des angles de {a}° et {b}°. Quel est le troisième angle, en degrés ?"],
      explain: (v, r) => [`180 - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les angles d'un triangle font 180° au total."]
    },
    declaredVariationSpace: 141 * 141
  }),
  arithmeticTemplate({
    key: "y7l10.areaTriangle", levelKey: "Y7L10", objectiveCode: "Y7-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 30], [2, 30]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]!) / 2,
    promptTemplates: ["A triangle has base {a} cm and height {b} cm. What is its area, in cm²?"],
    explain: (v, r) => [`(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
    hints: () => ["Multiply base by height, then halve."],
    fr: {
      promptTemplates: ["Un triangle a une base de {a} cm et une hauteur de {b} cm. Quelle est son aire, en cm² ?"],
      explain: (v, r) => [`(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
      hints: () => ["Multiplie la base par la hauteur, puis divise par deux."]
    },
    declaredVariationSpace: 29 * 29
  }),
  arithmeticTemplate({
    key: "y7l10.volumeCuboid", levelKey: "Y7L10", objectiveCode: "Y7-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [2, 15], [2, 15]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: ["A cuboid measures {a} cm by {b} cm by {c} cm. What is its volume, in cm³?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions."],
    fr: {
      promptTemplates: ["Un pavé droit mesure {a} cm sur {b} cm sur {c} cm. Quel est son volume, en cm³ ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Multiplie les trois dimensions."]
    },
    declaredVariationSpace: 14 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y7l10.meanOfDataSet", levelKey: "Y7L10", objectiveCode: "Y7-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 30], [1, 30], [1, 30], [1, 30]], constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) % 4 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) / 4,
    promptTemplates: ["Find the mean of {a}, {b}, {c} and {d}."],
    explain: (v, r) => [`Total = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
    hints: () => ["Add the values, then divide by how many there are."],
    fr: {
      promptTemplates: ["Trouve la moyenne de {a}, {b}, {c} et {d}."],
      explain: (v, r) => [`Total = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
      hints: () => ["Additionne les valeurs, puis divise par leur nombre."]
    },
    declaredVariationSpace: 29 * 29 * 29 * 29
  }),
  categoricalPoolTemplate({
    key: "y7l10.tfMixedReasoning", levelKey: "Y7L10", objectiveCode: "Y7-L10-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR", "ANGLE_SUM_ERROR"], type: "TRUE_FALSE",
    pools: { topic: ["angles", "area", "bidmas"] },
    build: (picked, rng) => {
      if (picked.topic === "angles") {
        const a = rng.int(20, 120);
        const b = rng.int(20, Math.max(21, 155 - a));
        const c = 180 - a - b;
        const showTrue = rng.chance(0.5);
        const shown = showTrue ? c : c + rng.int(1, 12);
        return {
          prompt: `A triangle with angles ${a}° and ${b}° has a third angle of ${shown}°. True or false?`,
          correctLabel: showTrue ? "True" : "False",
          distractorLabels: [showTrue ? "False" : "True"],
          explanationSteps: [`180 - ${a} - ${b} = ${c}.`],
          hints: ["Angles in a triangle total 180°."]
        };
      }
      if (picked.topic === "area") {
        const base = rng.int(2, 20) * 2;
        const height = rng.int(2, 20);
        const area = (base * height) / 2;
        const showTrue = rng.chance(0.5);
        const shown = showTrue ? area : area + rng.int(1, 10);
        return {
          prompt: `A triangle with base ${base} cm and height ${height} cm has an area of ${shown} cm². True or false?`,
          correctLabel: showTrue ? "True" : "False",
          distractorLabels: [showTrue ? "False" : "True"],
          explanationSteps: [`(${base} x ${height}) ÷ 2 = ${area}.`],
          hints: ["Area of a triangle = (base x height) ÷ 2."]
        };
      }
      const a = rng.int(1, 20);
      const b = rng.int(2, 10);
      const c = rng.int(1, 10);
      const correct = a + b * c;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correct : (a + b) * c;
      return {
        prompt: `${a} + ${b} x ${c} = ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${b} x ${c} = ${b * c}, then ${a} + ${b * c} = ${correct}.`],
        hints: ["Multiplication comes before addition."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        let prompt = drawn.prompt;
        const angleMatch = prompt.match(/^A triangle with angles (\d+)° and (\d+)° has a third angle of (\d+)°\./);
        const areaMatch = prompt.match(/^A triangle with base (\d+) cm and height (\d+) cm has an area of (\d+) cm²\./);
        const bidmasMatch = prompt.match(/^(\d+) \+ (\d+) x (\d+) = (\d+)\./);
        if (angleMatch) prompt = `Un triangle avec des angles de ${angleMatch[1]}° et ${angleMatch[2]}° a un troisième angle de ${angleMatch[3]}°. Vrai ou faux ?`;
        else if (areaMatch) prompt = `Un triangle de base ${areaMatch[1]} cm et de hauteur ${areaMatch[2]} cm a une aire de ${areaMatch[3]} cm². Vrai ou faux ?`;
        else if (bidmasMatch) prompt = `${bidmasMatch[1]} + ${bidmasMatch[2]} x ${bidmasMatch[3]} = ${bidmasMatch[4]}. Vrai ou faux ?`;
        return {
          prompt,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Vérifie le calcul toi-même avant de répondre."]
        };
      }
    },
    declaredVariationSpace: 5000
  })
];

export default level;
