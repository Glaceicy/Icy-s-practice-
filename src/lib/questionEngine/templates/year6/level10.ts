import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 10 — "Year 6 mixed reasoning and SATs-style mastery"
// A mixed review drawing on every Year 6 topic: place value and the four
// operations, fractions/decimals/percentages/ratio/algebra, and
// measurement/geometry/statistics.
const CTX = ["tickets", "stickers", "books", "cakes", "plants", "tiles", "badges", "bottles"];
const CTX_FR = ["billets", "autocollants", "livres", "gâteaux", "plantes", "carreaux", "badges", "bouteilles"];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y6-L10-1: place value, four operations and negative numbers ---
  arithmeticTemplate({
    key: "y6l10.roundLargeNumber", levelKey: "Y6L10", objectiveCode: "Y6-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1000, 999999]], compute: (v) => Math.round(v[0]! / 1000) * 1000,
    promptTemplates: [
      "Round {a} to the nearest thousand.",
      "A stock count of {ctx} is {a}. Round it to the nearest thousand."
    ],
    explain: (v, r) => [`Look at the hundreds digit to decide.`, `${v[0]} rounds to ${r}.`],
    hints: () => ["Check the hundreds digit: 5 or more rounds up."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Arrondis {a} au millier le plus proche.",
        "Un inventaire {de:ctx} indique {a}. Arrondis-le au millier le plus proche."
      ],
      explain: (v, r) => [`Regarde le chiffre des centaines pour décider.`, `${v[0]} s'arrondit à ${r}.`],
      hints: () => ["Vérifie le chiffre des centaines : 5 ou plus, on arrondit vers le haut."]
    },
    declaredVariationSpace: 100000
  }),
  arithmeticTemplate({
    key: "y6l10.longMultiplication", levelKey: "Y6L10", objectiveCode: "Y6-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["MULTIPLICATION_METHOD_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[100, 9999], [11, 99]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "{a} x {b} = ?",
      "{b} boxes each hold {a} {ctx}. How many is that in total?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Use a formal written method, multiplying by the ones then the tens."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a} x {b} = ?",
        "{b} boîtes contiennent chacune {a} {ctx}. Combien cela fait-il en tout ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Utilise la multiplication posée : d'abord les unités, puis les dizaines."]
    },
    declaredVariationSpace: 9900 * 89
  }),
  arithmeticTemplate({
    key: "y6l10.longDivisionExact", levelKey: "Y6L10", objectiveCode: "Y6-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["DIVISION_METHOD_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[10, 400], [11, 40]], compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! * v[1]!, divisor: v[1]! }),
    promptTemplates: [
      "{total} ÷ {divisor} = ?",
      "{total} {ctx} are packed equally into boxes of {divisor}. How many boxes are needed?"
    ],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Use long division, or think of it as how many groups fit into the total."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{total} ÷ {divisor} = ?",
        "{total} {ctx} sont rangés également dans des boîtes de {divisor}. Combien de boîtes faut-il ?"
      ],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Utilise la division posée, ou compte combien de groupes entrent dans le total."]
    },
    declaredVariationSpace: 391 * 30
  }),
  arithmeticTemplate({
    key: "y6l10.negativeIntervalAcrossZero", levelKey: "Y6L10", objectiveCode: "Y6-L10-1", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-30, -1], [1, 30]], compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["The temperature rises from {a}°C to {b}°C. By how many degrees does it rise?"],
    explain: (v, r) => [`${v[1]} - (${v[0]}) = ${r}.`, "Count up to zero first, then onwards."],
    hints: () => ["Count from the negative number up to zero, then on to the positive number."],
    visualAid: (v) => visuals.numberLine(-35, 35, v[1]!, v[0]!),
    fr: {
      promptTemplates: ["La température passe de {a} °C à {b} °C. De combien de degrés monte-t-elle ?"],
      explain: (v, r) => [`${v[1]} - (${v[0]}) = ${r}.`, "Compte d'abord jusqu'à zéro, puis continue."],
      hints: () => ["Compte du nombre négatif jusqu'à zéro, puis jusqu'au nombre positif."]
    },
    declaredVariationSpace: 900
  }),
  arithmeticTemplate({
    key: "y6l10.multiStepFourOperations", levelKey: "Y6L10", objectiveCode: "Y6-L10-1", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[2, 40], [2, 20], [1, 100]], compute: (v) => v[0]! * v[1]! - v[2]!,
    constraint: (v) => v[0]! * v[1]! > v[2]!,
    promptTemplates: [
      "Work out {a} x {b} - {c}.",
      "A shop has {a} crates of {b} {ctx} and sells {c} of them. How many are left?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Multiply before subtracting."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Calcule {a} x {b} - {c}.",
        "Un magasin a {a} caisses de {b} {ctx} et en vend {c}. Combien en reste-t-il ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} - ${v[2]} = ${r}.`],
      hints: () => ["Multiplie avant de soustraire."]
    },
    declaredVariationSpace: 39 * 19 * 100
  }),

  // --- Y6-L10-2: fractions, decimals, percentages, ratio and algebra ---
  arithmeticTemplate({
    key: "y6l10.percentageOfAmount", levelKey: "Y6L10", objectiveCode: "Y6-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 99], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: [
      "What is {a}% of {base}?",
      "Out of {base} {ctx}, what is {a}% of them?"
    ],
    explain: (v, r) => [`1% of ${v[1]! * 100} = ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Find 1% first, then multiply."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Combien font {a} % de {base} ?",
        "Sur {base} {ctx}, combien cela fait-il pour {a} % d'entre eux ?"
      ],
      explain: (v, r) => [`1 % de ${v[1]! * 100} = ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Trouve d'abord 1 %, puis multiplie."]
    },
    declaredVariationSpace: 99 * 25 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l10.fractionOfAmount", levelKey: "Y6L10", objectiveCode: "Y6-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OPERATOR_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [2, 10], [1, 15]], constraint: (v) => v[0]! < v[1]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ amount: v[1]! * v[2]! }),
    promptTemplates: [
      "What is {a}/{b} of {amount}?",
      "A box of {amount} {ctx} has {a}/{b} of them removed. How many are removed?"
    ],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
    hints: () => ["Divide by the denominator, then multiply by the numerator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Combien font {a}/{b} de {amount} ?",
        "Une boîte de {amount} {ctx} voit {a}/{b} d'entre eux retirés. Combien en retire-t-on ?"
      ],
      explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}.`, `${v[2]} x ${v[0]} = ${r}.`],
      hints: () => ["Divise par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 9 * 9 * 15 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l10.shareInRatio", levelKey: "Y6L10", objectiveCode: "Y6-L10-2", difficulty: "REASONING",
    misconceptionTags: ["RATIO_DIVISION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9], [1, 9], [2, 15]], constraint: (v) => gcd(v[0]!, v[1]!) === 1,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ total: (v[0]! + v[1]!) * v[2]! }),
    promptTemplates: [
      "{total} is shared in the ratio {a}:{b}. What is the first share?",
      "{total} {ctx} are shared in the ratio {a}:{b}. How many are in the first share?"
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, each worth ${v[2]}.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Add the parts, divide the total, then multiply by the first number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{total} est partagé dans le rapport {a}:{b}. Quelle est la première part ?",
        "{total} {ctx} sont partagés dans le rapport {a}:{b}. Combien y en a-t-il dans la première part ?"
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!} parts, chacune valant ${v[2]}.`, `${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Additionne les parts, divise le total, puis multiplie par le premier nombre."]
    },
    declaredVariationSpace: 9 * 9 * 14 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l10.useFormula", levelKey: "Y6L10", objectiveCode: "Y6-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 12], [1, 25], [1, 25]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: [
      "Using y = {a}n + {c}, what is y when n = {b}?",
      "The cost of {ctx} is {a}n + {c} pence for n items. What is the cost of {b} {b#items|item}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Substitute, then multiply before adding."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Avec y = {a}n + {c}, que vaut y quand n = {b} ?",
        "Le coût {de:ctx} est {a}n + {c} pence pour n articles. Quel est le coût de {b} {b#articles|article} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
      hints: () => ["Remplace, puis multiplie avant d'additionner."]
    },
    declaredVariationSpace: 11 * 25 * 25 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l10.nextTermSequence", levelKey: "Y6L10", objectiveCode: "Y6-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 80], [2, 15]], compute: (v) => v[0]! + v[1]! * 3,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2 }),
    promptTemplates: [
      "{a}, {t2}, {t3}, ___ . What is the next term?",
      "Rows of {ctx} go {a}, {t2}, {t3}, ___ . How many are in the next row?"
    ],
    explain: (v, r) => [`The step is ${v[1]}.`, `${v[0]! + v[1]! * 2} + ${v[1]} = ${r}.`],
    hints: () => ["Find the step, then add it once more."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}, {t2}, {t3}, ___ . Quel est le terme suivant ?",
        "Des rangées {de:ctx} font {a}, {t2}, {t3}, ___ . Combien y en a-t-il dans la rangée suivante ?"
      ],
      explain: (v, r) => [`Le pas est de ${v[1]}.`, `${v[0]! + v[1]! * 2} + ${v[1]} = ${r}.`],
      hints: () => ["Trouve le pas, puis ajoute-le une fois de plus."]
    },
    declaredVariationSpace: 80 * 14 * (1 + CTX.length)
  }),

  // --- Y6-L10-3: measurement, geometry and statistics ---
  arithmeticTemplate({
    key: "y6l10.missingAngleTriangle", levelKey: "Y6L10", objectiveCode: "Y6-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 150], [10, 150]], constraint: (v) => v[0]! + v[1]! < 175,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: ["A triangle has angles of {a}° and {b}°. What is the third angle, in degrees?"],
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
    key: "y6l10.areaTriangle", levelKey: "Y6L10", objectiveCode: "Y6-L10-3", difficulty: "APPLICATION",
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
    key: "y6l10.volumeCuboid", levelKey: "Y6L10", objectiveCode: "Y6-L10-3", difficulty: "APPLICATION",
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
    key: "y6l10.meanOfFour", levelKey: "Y6L10", objectiveCode: "Y6-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]], constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) % 4 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) / 4,
    promptTemplates: ["Find the mean of {a}, {b}, {c} and {d}."],
    explain: (v, r) => [`${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
    hints: () => ["Add the values, then divide by how many there are."],
    fr: {
      promptTemplates: ["Trouve la moyenne de {a}, {b}, {c} et {d}."],
      explain: (v, r) => [`${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
      hints: () => ["Additionne les valeurs, puis divise par leur nombre."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  categoricalPoolTemplate({
    key: "y6l10.tfMixedReasoning", levelKey: "Y6L10", objectiveCode: "Y6-L10-3", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR", "AREA_FORMULA_ERROR"], type: "TRUE_FALSE",
    pools: { topic: ["angles", "area", "volume", "mean"] },
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
          hints: ["Area of a triangle is (base x height) ÷ 2."]
        };
      }
      if (picked.topic === "volume") {
        const l = rng.int(2, 12);
        const w = rng.int(2, 12);
        const h = rng.int(2, 12);
        const vol = l * w * h;
        const showTrue = rng.chance(0.5);
        const shown = showTrue ? vol : vol + rng.int(1, 20);
        return {
          prompt: `A cuboid ${l} cm by ${w} cm by ${h} cm has a volume of ${shown} cm³. True or false?`,
          correctLabel: showTrue ? "True" : "False",
          distractorLabels: [showTrue ? "False" : "True"],
          explanationSteps: [`${l} x ${w} x ${h} = ${vol}.`],
          hints: ["Volume multiplies all three dimensions."]
        };
      }
      const mean = rng.int(2, 30);
      const values = [mean - 2, mean, mean + 2, mean];
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? mean : mean + rng.int(1, 5);
      return {
        prompt: `The mean of ${values.join(", ")} is ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`The four values total ${values.reduce((a, b) => a + b, 0)}, and dividing by 4 gives ${mean}.`],
        hints: ["Add the values and divide by how many there are."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        let prompt = drawn.prompt;
        const angle = prompt.match(/^A triangle with angles (\d+)° and (\d+)° has a third angle of (\d+)°\./);
        const area = prompt.match(/^A triangle with base (\d+) cm and height (\d+) cm has an area of (\d+) cm²\./);
        const vol = prompt.match(/^A cuboid (\d+) cm by (\d+) cm by (\d+) cm has a volume of (\d+) cm³\./);
        const mean = prompt.match(/^The mean of (.+) is (\d+)\./);
        if (angle) prompt = `Un triangle avec des angles de ${angle[1]}° et ${angle[2]}° a un troisième angle de ${angle[3]}°. Vrai ou faux ?`;
        else if (area) prompt = `Un triangle de base ${area[1]} cm et de hauteur ${area[2]} cm a une aire de ${area[3]} cm². Vrai ou faux ?`;
        else if (vol) prompt = `Un pavé droit de ${vol[1]} cm sur ${vol[2]} cm sur ${vol[3]} cm a un volume de ${vol[4]} cm³. Vrai ou faux ?`;
        else if (mean) prompt = `La moyenne de ${mean[1]} est ${mean[2]}. Vrai ou faux ?`;
        return {
          prompt,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Vérifie le calcul toi-même avant de répondre."]
        };
      }
    },
    declaredVariationSpace: 5000
  }),
  arithmeticTemplate({
    key: "y6l10.unitConversionReasoning", levelKey: "Y6L10", objectiveCode: "Y6-L10-3", difficulty: "REASONING",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1, 200], [2, 9]], compute: (v) => v[0]! * 1000 - v[1]! * 100,
    constraint: (v) => v[0]! * 1000 > v[1]! * 100,
    promptTemplates: ["A crate of {ctx} weighs {a} kilograms. {b} hundred-gram packets are removed. What is the remaining weight, in grams?"],
    explain: (v, r) => [`${v[0]} kg = ${v[0]! * 1000} g.`, `${v[0]! * 1000} - ${v[1]! * 100} = ${r}.`],
    hints: () => ["Convert kilograms to grams first, then subtract."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Une caisse {de:ctx} pèse {a} kilogrammes. On retire {b} paquets de cent grammes. Quel est le poids restant, en grammes ?"],
      explain: (v, r) => [`${v[0]} kg = ${v[0]! * 1000} g.`, `${v[0]! * 1000} - ${v[1]! * 100} = ${r}.`],
      hints: () => ["Convertis d'abord les kilogrammes en grammes, puis soustrais."]
    },
    declaredVariationSpace: 200 * 8 * CTX.length
  })
];

export default level;
