import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 10 — "Year 4 mixed mastery"
// A mixed review across the whole of Year 4: place value and the four
// operations to 10,000; times tables, fractions and decimals; and
// measurement, geometry and statistics.
const CTX = ["visitors", "books", "stickers", "marbles", "tickets", "stamps", "beads", "cards"];
const CTX_FR = ["visiteurs", "livres", "autocollants", "billes", "billets", "timbres", "perles", "cartes"];
const ROOMS = ["a classroom floor", "a garden bed", "a rug", "a poster", "a patio", "a notice board"];
const ROOMS_FR = ["le sol d'une classe", "un massif de jardin", "un tapis", "une affiche", "une terrasse", "un panneau d'affichage"];
const oneDp = (n: number) => n.toFixed(1);

export const level: QuestionTemplateDef[] = [
  // --- Y4-L10-1: place value, rounding and the four operations ---
  arithmeticTemplate({
    key: "y4l10.roundToNearest100", levelKey: "Y4L10", objectiveCode: "Y4-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999]], compute: (v) => Math.round(v[0]! / 100) * 100,
    promptTemplates: [
      "Round {a} to the nearest 100.",
      "What is {a} rounded to the nearest hundred?",
      "To the nearest 100, what is {a}?"
    ],
    explain: (v, r) => [`Look at the tens digit of ${v[0]}: it is ${Math.floor((v[0]! % 100) / 10)}.`, `That rounds ${Math.floor((v[0]! % 100) / 10) >= 5 ? "up" : "down"} to ${r}.`],
    hints: () => ["Look at the digit one place to the right of the one you are rounding to."],
    fr: {
      promptTemplates: [
        "Arrondis {a} à la centaine la plus proche.",
        "Que vaut {a} arrondi à la centaine près ?",
        "À la centaine près, que vaut {a} ?"
      ],
      explain: (v, r) => [`Regarde le chiffre des dizaines de ${v[0]} : c'est ${Math.floor((v[0]! % 100) / 10)}.`, `Cela s'arrondit ${Math.floor((v[0]! % 100) / 10) >= 5 ? "au-dessus" : "en dessous"} à ${r}.`],
      hints: () => ["Regarde le chiffre juste à droite de celui auquel tu arrondis."]
    },
    declaredVariationSpace: 9000 * 3
  }),
  arithmeticTemplate({
    key: "y4l10.roundToNearest1000", levelKey: "Y4L10", objectiveCode: "Y4-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999]], compute: (v) => Math.round(v[0]! / 1000) * 1000,
    promptTemplates: [
      "Round {a} to the nearest 1,000.",
      "What is {a} rounded to the nearest thousand?",
      "To the nearest 1,000, what is {a}?"
    ],
    explain: (v, r) => [`Look at the hundreds digit of ${v[0]}: it is ${Math.floor((v[0]! % 1000) / 100)}.`, `That rounds ${Math.floor((v[0]! % 1000) / 100) >= 5 ? "up" : "down"} to ${r}.`],
    hints: () => ["For the nearest thousand, the hundreds digit decides."],
    fr: {
      promptTemplates: [
        "Arrondis {a} au millier le plus proche.",
        "Que vaut {a} arrondi au millier près ?",
        "Au millier près, que vaut {a} ?"
      ],
      explain: (v, r) => [`Regarde le chiffre des centaines de ${v[0]} : c'est ${Math.floor((v[0]! % 1000) / 100)}.`, `Cela s'arrondit ${Math.floor((v[0]! % 1000) / 100) >= 5 ? "au-dessus" : "en dessous"} à ${r}.`],
      hints: () => ["Pour le millier le plus proche, c'est le chiffre des centaines qui décide."]
    },
    declaredVariationSpace: 9000 * 3
  }),
  arithmeticTemplate({
    key: "y4l10.twoStepFourDigit", levelKey: "Y4L10", objectiveCode: "Y4-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["MULTI_STEP_ORDER_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[2000, 7999], [100, 1999], [100, 1999]],
    compute: (v) => v[0]! + v[1]! - v[2]!,
    promptTemplates: [
      "A total of {a} {ctx} grows by {b} and then falls by {c}. What is the new total?",
      "Work out {a} + {b} - {c}."
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["One step at a time, writing down the answer to the first before starting the second."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Un total de {a} {ctx} augmente de {b} puis baisse de {c}. Quel est le nouveau total ?",
        "Calcule {a} + {b} - {c}."
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
      hints: () => ["Une étape à la fois, en notant le résultat de la première avant de commencer la seconde."]
    },
    declaredVariationSpace: 6000 * 1900 * 1900
  }),
  arithmeticTemplate({
    key: "y4l10.digitValueInFourDigitNumber", levelKey: "Y4L10", objectiveCode: "Y4-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [0, 2]], compute: (v) => {
      const n = v[0]!;
      if (v[1]! === 0) return Math.floor(n / 1000) * 1000;
      if (v[1]! === 1) return Math.floor((n % 1000) / 100) * 100;
      return Math.floor((n % 100) / 10) * 10;
    },
    derive: (v) => ({ col: v[1]! === 0 ? "thousands" : v[1]! === 1 ? "hundreds" : "tens" }),
    promptTemplates: [
      "In the number {a}, what is the value of the {col} digit?",
      "What is the {col} digit of {a} worth?"
    ],
    explain: (v, r) => [`The ${v[1]! === 0 ? "thousands" : v[1]! === 1 ? "hundreds" : "tens"} column of ${v[0]} is worth ${r}.`],
    hints: () => ["A digit's value is the digit itself multiplied by its column."],
    fr: {
      derive: (v) => ({ col: v[1]! === 0 ? "des milliers" : v[1]! === 1 ? "des centaines" : "des dizaines" }),
      promptTemplates: [
        "Dans le nombre {a}, quelle est la valeur du chiffre {col} ?",
        "Combien vaut le chiffre {col} de {a} ?"
      ],
      explain: (v, r) => [`La colonne ${v[1]! === 0 ? "des milliers" : v[1]! === 1 ? "des centaines" : "des dizaines"} de ${v[0]} vaut ${r}.`],
      hints: () => ["La valeur d'un chiffre est le chiffre multiplié par sa colonne."]
    },
    declaredVariationSpace: 9000 * 3 * 2
  }),

  // --- Y4-L10-2: times tables, fractions and decimals ---
  arithmeticTemplate({
    key: "y4l10.timesTableRecall", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["TIMES_TABLE_RECALL_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "What is {a} x {b}?",
      "Work out {a} times {b}.",
      "{a} x {b} = ?",
      "How much is {a} groups of {b}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Use the times table you know best — the order does not matter."],
    fr: {
      promptTemplates: [
        "Que vaut {a} x {b} ?",
        "Calcule {a} fois {b}.",
        "{a} x {b} = ?",
        "Combien font {a} groupes de {b} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Utilise la table que tu connais le mieux — l'ordre n'a pas d'importance."]
    },
    declaredVariationSpace: 11 * 11 * 4
  }),
  arithmeticTemplate({
    key: "y4l10.shortMultiplicationMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "MULTI_STEP",
    ranges: [[13, 199], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Work out {a} x {b}.",
      "Use short multiplication for {a} x {b}."
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, `Multiply the ones first, then the tens, carrying as you go.`],
    hints: () => ["Set it out in columns with the single digit underneath the ones."],
    fr: {
      promptTemplates: [
        "Calcule {a} x {b}.",
        "Utilise la multiplication posée pour {a} x {b}."
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, `Multiplie d'abord les unités, puis les dizaines, avec les retenues.`],
      hints: () => ["Pose l'opération en colonnes avec le chiffre seul sous les unités."]
    },
    declaredVariationSpace: 187 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y4l10.divisionWithRemainderMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["REMAINDER_INTERPRETATION_ERROR"], type: "MULTI_STEP",
    ranges: [[14, 99], [3, 9]], constraint: (v) => v[0]! % v[1]! !== 0,
    compute: (v) => v[0]! % v[1]!,
    promptTemplates: [
      "Work out {a} ÷ {b}. What is the remainder?",
      "{a} counters are put into groups of {b}. How many are left over?"
    ],
    explain: (v, r) => [`${v[1]} x ${Math.floor(v[0]! / v[1]!)} = ${v[1]! * Math.floor(v[0]! / v[1]!)}.`, `${v[0]} - ${v[1]! * Math.floor(v[0]! / v[1]!)} = ${r}.`],
    hints: () => ["Find the biggest multiple of the divisor that fits, then see what is left."],
    fr: {
      promptTemplates: [
        "Calcule {a} ÷ {b}. Quel est le reste ?",
        "{a} jetons sont répartis en groupes de {b}. Combien en reste-t-il ?"
      ],
      explain: (v, r) => [`${v[1]} x ${Math.floor(v[0]! / v[1]!)} = ${v[1]! * Math.floor(v[0]! / v[1]!)}.`, `${v[0]} - ${v[1]! * Math.floor(v[0]! / v[1]!)} = ${r}.`],
      hints: () => ["Trouve le plus grand multiple du diviseur qui tient, puis regarde ce qui reste."]
    },
    declaredVariationSpace: 86 * 7 * 2
  }),
  arithmeticTemplate({
    key: "y4l10.fractionOfAmountMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[3, 12], [2, 25], [1, 11]], constraint: (v) => v[2]! < v[0]!,
    compute: (v) => v[2]! * v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "What is {c}/{a} of {total}?",
      "{c}/{a} of {total} {ctx} are blue. How many is that?"
    ],
    explain: (v, r) => [`1/${v[0]} of ${v[0]! * v[1]!} is ${v[1]}.`, `${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Divide by the bottom number, then multiply by the top number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Que vaut {c}/{a} de {total} ?",
        "{c}/{a} de {total} {ctx} sont bleus. Combien cela fait-il ?"
      ],
      explain: (v, r) => [`1/${v[0]} de ${v[0]! * v[1]!} vaut ${v[1]}.`, `${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Divise par le nombre du bas, puis multiplie par celui du haut."]
    },
    declaredVariationSpace: 10 * 24 * 10
  }),
  arithmeticTemplate({
    key: "y4l10.equivalentFractionMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUIVALENT_FRACTION_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 12], [1, 11], [2, 8]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ newDen: v[0]! * v[2]! }),
    promptTemplates: [
      "{b}/{a} = ___/{newDen}. What is the missing numerator?",
      "Complete the equivalent fraction {b}/{a} = ___/{newDen}."
    ],
    explain: (v, r) => [`The bottom was multiplied by ${v[2]}, so do the same to the top.`, `${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Whatever you do to the bottom, do to the top."],
    fr: {
      promptTemplates: [
        "{b}/{a} = ___/{newDen}. Quel numérateur manque ?",
        "Complète la fraction équivalente {b}/{a} = ___/{newDen}."
      ],
      explain: (v, r) => [`Le bas a été multiplié par ${v[2]}, fais pareil en haut.`, `${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Ce que tu fais en bas, fais-le en haut."]
    },
    declaredVariationSpace: 10 * 11 * 7
  }),
  arithmeticTemplate({
    key: "y4l10.decimalTenthsMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]! / 10, formatValue: oneDp,
    derive: (v) => ({ n: v[0]! }),
    promptTemplates: [
      "Write {n} tenths as a decimal.",
      "What is {n}/10 as a decimal?",
      "{n} tenths is which decimal number?"
    ],
    explain: (v, r) => [`${v[0]} ÷ 10 = ${r}.`],
    hints: () => ["The first digit after the decimal point counts the tenths."],
    fr: {
      promptTemplates: [
        "Écris {n} dixièmes sous forme décimale.",
        "Que vaut {n}/10 en écriture décimale ?",
        "{n} dixièmes, c'est quel nombre décimal ?"
      ],
      explain: (v, r) => [`${v[0]} ÷ 10 = ${r}.`],
      hints: () => ["Le premier chiffre après la virgule compte les dixièmes."]
    },
    declaredVariationSpace: 99 * 3
  }),
  arithmeticTemplate({
    key: "y4l10.roundDecimalMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 10),
    derive: (v) => ({ dec: (v[0]! / 10).toFixed(1) }),
    promptTemplates: [
      "Round {dec} to the nearest whole number.",
      "What is {dec} to the nearest whole number?"
    ],
    explain: (v, r) => [`The tenths digit is ${v[0]! % 10}, so round ${v[0]! % 10 >= 5 ? "up" : "down"} to ${r}.`],
    hints: () => ["Look only at the tenths digit: 5 or more rounds up."],
    fr: {
      promptTemplates: [
        "Arrondis {dec} à l'unité la plus proche.",
        "Que vaut {dec} à l'unité près ?"
      ],
      explain: (v, r) => [`Le chiffre des dixièmes est ${v[0]! % 10}, donc on arrondit ${v[0]! % 10 >= 5 ? "au-dessus" : "en dessous"} à ${r}.`],
      hints: () => ["Regarde seulement le chiffre des dixièmes : 5 ou plus, on arrondit au-dessus."]
    },
    declaredVariationSpace: 999 * 2
  }),

  // --- Y4-L10-3: measurement, geometry and statistics ---
  arithmeticTemplate({
    key: "y4l10.perimeterMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP", contextPool: ROOMS,
    ranges: [[2, 40], [2, 40]], compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: [
      "A rectangle is {a} cm by {b} cm. What is its perimeter, in cm?",
      "{Ctx} is a rectangle {a} m by {b} m. What is the distance all the way around, in m?"
    ],
    explain: (v, r) => [`2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Perimeter adds all four sides; area multiplies two of them."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un rectangle mesure {a} cm sur {b} cm. Quel est son périmètre, en cm ?",
        "{Ctx} est un rectangle de {a} m sur {b} m. Quelle est la distance tout autour, en m ?"
      ],
      explain: (v, r) => [`2 x (${v[0]} + ${v[1]}) = ${r}.`],
      hints: () => ["Le périmètre additionne les quatre côtés ; l'aire en multiplie deux."]
    },
    declaredVariationSpace: 39 * 39 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y4l10.areaMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP", contextPool: ROOMS,
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A rectangle on squared paper is {a} squares by {b} squares. What is its area, in squares?",
      "{Ctx} is {a} squares across and {b} squares down. How many squares does it cover?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r} squares.`],
    hints: () => ["Multiply the two sides to count every square at once."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un rectangle sur papier quadrillé mesure {a} carreaux sur {b} carreaux. Quelle est son aire, en carreaux ?",
        "{Ctx} fait {a} carreaux de large et {b} de haut. Combien de carreaux couvre-t-il ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r} carreaux.`],
      hints: () => ["Multiplie les deux côtés pour compter tous les carreaux d'un coup."]
    },
    declaredVariationSpace: 19 * 19 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y4l10.unitConversionMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99], [0, 2]],
    compute: (v) => (v[1]! === 0 ? v[0]! * 1000 : v[1]! === 1 ? v[0]! * 100 : v[0]! * 60),
    derive: (v) => ({
      big: v[1]! === 0 ? "kilometres" : v[1]! === 1 ? "metres" : "hours",
      small: v[1]! === 0 ? "metres" : v[1]! === 1 ? "centimetres" : "minutes"
    }),
    promptTemplates: [
      "How many {small} are there in {a} {big}?",
      "Convert {a} {big} into {small}."
    ],
    explain: (v, r) => [
      `There are ${v[1]! === 0 ? "1,000 metres in a kilometre" : v[1]! === 1 ? "100 centimetres in a metre" : "60 minutes in an hour"}.`,
      `${v[0]} x ${v[1]! === 0 ? "1,000" : v[1]! === 1 ? "100" : "60"} = ${r}.`
    ],
    hints: () => ["Remember the key facts: 1,000 m in a km, 100 cm in a m and 60 minutes in an hour."],
    fr: {
      derive: (v) => ({
        big: v[1]! === 0 ? "kilomètres" : v[1]! === 1 ? "mètres" : "heures",
        small: v[1]! === 0 ? "mètres" : v[1]! === 1 ? "centimètres" : "minutes"
      }),
      promptTemplates: [
        "Combien y a-t-il de {small} dans {a} {big} ?",
        "Convertis {a} {big} en {small}."
      ],
      explain: (v, r) => [
        `Il y a ${v[1]! === 0 ? "1 000 mètres dans un kilomètre" : v[1]! === 1 ? "100 centimètres dans un mètre" : "60 minutes dans une heure"}.`,
        `${v[0]} x ${v[1]! === 0 ? "1 000" : v[1]! === 1 ? "100" : "60"} = ${r}.`
      ],
      hints: () => ["Retiens les faits clés : 1 000 m dans un km, 100 cm dans un m et 60 minutes dans une heure."]
    },
    declaredVariationSpace: 99 * 3 * 2
  }),
  arithmeticTemplate({
    key: "y4l10.angleOnLineMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP",
    ranges: [[10, 170]], compute: (v) => 180 - v[0]!,
    promptTemplates: [
      "Two angles sit on a straight line. One is {a}°. What is the other, in degrees?",
      "Angles on a straight line add to 180°. One is {a}°. Find the other, in degrees.",
      "A straight line is split into two angles and one is {a}°. How big is the other, in degrees?"
    ],
    explain: (v, r) => [`180 - ${v[0]} = ${r}°.`],
    hints: () => ["A straight line is 180°, which is two right angles."],
    fr: {
      promptTemplates: [
        "Deux angles sont sur une droite. L'un vaut {a}°. Combien vaut l'autre, en degrés ?",
        "Les angles sur une droite ont pour somme 180°. L'un vaut {a}°. Trouve l'autre, en degrés.",
        "Une droite est partagée en deux angles dont l'un vaut {a}°. Combien mesure l'autre, en degrés ?"
      ],
      explain: (v, r) => [`180 - ${v[0]} = ${r}°.`],
      hints: () => ["Une droite vaut 180°, soit deux angles droits."]
    },
    declaredVariationSpace: 161 * 3
  }),
  arithmeticTemplate({
    key: "y4l10.barChartDifferenceMixed", levelKey: "Y4L10", objectiveCode: "Y4-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[10, 90], [1, 70]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "One bar of a chart shows {a} and another shows {b}. How many more does the taller show?",
      "A chart records {a} {ctx} on one day and {b} on another. What is the difference?"
    ],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["\"How many more\" and \"difference\" both mean subtract."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une barre d'un graphique montre {a} et une autre {b}. Combien de plus montre la plus haute ?",
        "Un graphique note {a} {ctx} un jour et {b} un autre. Quelle est la différence ?"
      ],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["« Combien de plus » et « différence » veulent dire soustraire."]
    },
    declaredVariationSpace: 81 * 70
  }),
  categoricalPoolTemplate({
    key: "y4l10.tfYear4Reasoning", levelKey: "Y4L10", objectiveCode: "Y4-L10-3", difficulty: "REASONING",
    misconceptionTags: ["MIXED_REASONING_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 12);
      const b = rng.int(2, 12);
      const n = rng.int(1000, 9999);
      const valid = rng.chance(0.5);
      const validClaims = [
        `${a} x ${b} gives the same answer as ${b} x ${a}`,
        `rounding ${n} to the nearest 1,000 looks at the hundreds digit`,
        `there are 1,000 metres in a kilometre`,
        `the perimeter of a rectangle is the distance all the way around it`,
        `1/4 written as a decimal is 0.25`
      ];
      const invalidClaims = [
        `${a} ÷ ${b} gives the same answer as ${b} ÷ ${a}`,
        `rounding ${n} to the nearest 1,000 looks at the ones digit`,
        `there are 100 metres in a kilometre`,
        `the perimeter of a rectangle is found by multiplying its two sides`,
        `1/4 written as a decimal is 0.14`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Multiplication can be done in any order, rounding looks at the next column right, a kilometre is 1,000 m, perimeter is the distance around, and 1/4 = 0.25."
          : "Division cannot be swapped round, rounding looks at the column just to the right, a kilometre is 1,000 m, perimeter adds the sides rather than multiplying them, and 1/4 = 0.25."],
        hints: ["Check each claim against the rule it is testing."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^(\d+) x (\d+) gives the same answer as (\d+) x (\d+)$/, "$1 x $2 donne le même résultat que $3 x $4")
          .replace(/^(\d+) ÷ (\d+) gives the same answer as (\d+) ÷ (\d+)$/, "$1 ÷ $2 donne le même résultat que $3 ÷ $4")
          .replace(/^Rounding (\d+) to the nearest 1,000 looks at the hundreds digit$/, "Arrondir $1 au millier près regarde le chiffre des centaines")
          .replace(/^Rounding (\d+) to the nearest 1,000 looks at the ones digit$/, "Arrondir $1 au millier près regarde le chiffre des unités")
          .replace(/^There are 1,000 metres in a kilometre$/, "Il y a 1 000 mètres dans un kilomètre")
          .replace(/^There are 100 metres in a kilometre$/, "Il y a 100 mètres dans un kilomètre")
          .replace(/^The perimeter of a rectangle is the distance all the way around it$/, "Le périmètre d'un rectangle est la distance tout autour")
          .replace(/^The perimeter of a rectangle is found by multiplying its two sides$/, "Le périmètre d'un rectangle s'obtient en multipliant ses deux côtés")
          .replace(/^1\/4 written as a decimal is 0\.25$/, "1/4 s'écrit 0,25 en décimal")
          .replace(/^1\/4 written as a decimal is 0\.14$/, "1/4 s'écrit 0,14 en décimal");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Vérifie chaque affirmation avec la règle concernée."]
        };
      }
    },
    declaredVariationSpace: 2 * 5 * 11 * 11
  })
];

export default level;
