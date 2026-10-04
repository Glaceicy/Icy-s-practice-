import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 7 — "Measurement, conversion, perimeter and area"
const ROOMS = ["a classroom floor", "a garden bed", "a rug", "a poster", "a patio", "a sandpit", "a notice board", "a tiled wall"];
const ROOMS_FR = ["le sol d'une classe", "un massif de jardin", "un tapis", "une affiche", "une terrasse", "un bac à sable", "un panneau d'affichage", "un mur carrelé"];
const JOURNEYS = ["a walk to school", "a cycle ride", "a car journey", "a train trip", "a running route", "a bus route"];
const JOURNEYS_FR = ["un trajet à pied vers l'école", "une sortie à vélo", "un trajet en voiture", "un voyage en train", "un parcours de course", "une ligne de bus"];

export const level: QuestionTemplateDef[] = [
  // --- Y4-L7-1: converting between units of measure ---
  arithmeticTemplate({
    key: "y4l7.kilometresToMetres", levelKey: "Y4L7", objectiveCode: "Y4-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: JOURNEYS,
    ranges: [[1, 99]], compute: (v) => v[0]! * 1000,
    promptTemplates: [
      "How many metres are there in {a} kilometres?",
      "Convert {a} km into metres.",
      "{ctx} is {a} km long. How many metres is that?"
    ],
    explain: (v, r) => [`There are 1,000 metres in 1 kilometre.`, `${v[0]} x 1,000 = ${r}.`],
    hints: () => ["Kilo means a thousand, so multiply by 1,000."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: [
        "Combien y a-t-il de mètres dans {a} kilomètres ?",
        "Convertis {a} km en mètres.",
        "{ctx} fait {a} km. Combien cela fait-il de mètres ?"
      ],
      explain: (v, r) => [`Il y a 1 000 mètres dans 1 kilomètre.`, `${v[0]} x 1 000 = ${r}.`],
      hints: () => ["Kilo veut dire mille, donc multiplie par 1 000."]
    },
    declaredVariationSpace: 99 * (1 + 2 * JOURNEYS.length)
  }),
  arithmeticTemplate({
    key: "y4l7.metresToCentimetres", levelKey: "Y4L7", objectiveCode: "Y4-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]! * 100,
    promptTemplates: [
      "How many centimetres are there in {a} metres?",
      "Convert {a} m into centimetres.",
      "A rope is {a} m long. How many centimetres is that?"
    ],
    explain: (v, r) => [`There are 100 centimetres in 1 metre.`, `${v[0]} x 100 = ${r}.`],
    hints: () => ["Centi means a hundredth, so there are 100 centimetres in a metre."],
    fr: {
      promptTemplates: [
        "Combien y a-t-il de centimètres dans {a} mètres ?",
        "Convertis {a} m en centimètres.",
        "Une corde mesure {a} m. Combien cela fait-il de centimètres ?"
      ],
      explain: (v, r) => [`Il y a 100 centimètres dans 1 mètre.`, `${v[0]} x 100 = ${r}.`],
      hints: () => ["Centi veut dire centième : il y a 100 centimètres dans un mètre."]
    },
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y4l7.kilogramsToGrams", levelKey: "Y4L7", objectiveCode: "Y4-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99], [0, 1]], compute: (v) => (v[1]! === 0 ? v[0]! * 1000 : v[0]! * 1000),
    derive: (v) => ({ unit: v[1]! === 0 ? "kilograms" : "litres", small: v[1]! === 0 ? "grams" : "millilitres" }),
    promptTemplates: [
      "How many {small} are there in {a} {unit}?",
      "Convert {a} {unit} into {small}."
    ],
    explain: (v, r) => [`There are 1,000 ${v[1]! === 0 ? "grams in a kilogram" : "millilitres in a litre"}.`, `${v[0]} x 1,000 = ${r}.`],
    hints: () => ["Both of these conversions multiply by 1,000."],
    fr: {
      derive: (v) => ({ unit: v[1]! === 0 ? "kilogrammes" : "litres", small: v[1]! === 0 ? "grammes" : "millilitres" }),
      promptTemplates: [
        "Combien y a-t-il de {small} dans {a} {unit} ?",
        "Convertis {a} {unit} en {small}."
      ],
      explain: (v, r) => [`Il y a 1 000 ${v[1]! === 0 ? "grammes dans un kilogramme" : "millilitres dans un litre"}.`, `${v[0]} x 1 000 = ${r}.`],
      hints: () => ["Ces deux conversions multiplient par 1 000."]
    },
    declaredVariationSpace: 99 * 2 * 2
  }),
  arithmeticTemplate({
    key: "y4l7.hoursToMinutes", levelKey: "Y4L7", objectiveCode: "Y4-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 60], [0, 1]], compute: (v) => v[0]! * 60,
    derive: (v) => ({ big: v[1]! === 0 ? "hours" : "minutes", small: v[1]! === 0 ? "minutes" : "seconds" }),
    promptTemplates: [
      "How many {small} are there in {a} {big}?",
      "Convert {a} {big} into {small}.",
      "A activity lasts {a} {big}. How many {small} is that?"
    ],
    explain: (v, r) => [`There are 60 ${v[1]! === 0 ? "minutes in an hour" : "seconds in a minute"}.`, `${v[0]} x 60 = ${r}.`],
    hints: () => ["Time units of 60: 60 seconds in a minute and 60 minutes in an hour."],
    fr: {
      derive: (v) => ({ big: v[1]! === 0 ? "heures" : "minutes", small: v[1]! === 0 ? "minutes" : "secondes" }),
      promptTemplates: [
        "Combien y a-t-il de {small} dans {a} {big} ?",
        "Convertis {a} {big} en {small}.",
        "Une activité dure {a} {big}. Combien cela fait-il de {small} ?"
      ],
      explain: (v, r) => [`Il y a 60 ${v[1]! === 0 ? "minutes dans une heure" : "secondes dans une minute"}.`, `${v[0]} x 60 = ${r}.`],
      hints: () => ["Les unités de temps vont par 60 : 60 secondes dans une minute et 60 minutes dans une heure."]
    },
    declaredVariationSpace: 60 * 2 * 3
  }),
  arithmeticTemplate({
    key: "y4l7.mixedMetresAndCentimetres", levelKey: "Y4L7", objectiveCode: "Y4-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 20], [1, 99]], compute: (v) => v[0]! * 100 + v[1]!,
    promptTemplates: [
      "A length is {a} m and {b} cm. How many centimetres is that in total?",
      "Convert {a} m {b} cm into centimetres."
    ],
    explain: (v, r) => [`${v[0]} m = ${v[0]! * 100} cm.`, `${v[0]! * 100} + ${v[1]} = ${r} cm.`],
    hints: () => ["Change the metres into centimetres first, then add the extra centimetres."],
    fr: {
      promptTemplates: [
        "Une longueur vaut {a} m et {b} cm. Combien cela fait-il de centimètres en tout ?",
        "Convertis {a} m {b} cm en centimètres."
      ],
      explain: (v, r) => [`${v[0]} m = ${v[0]! * 100} cm.`, `${v[0]! * 100} + ${v[1]} = ${r} cm.`],
      hints: () => ["Convertis d'abord les mètres en centimètres, puis ajoute les centimètres restants."]
    },
    declaredVariationSpace: 20 * 99 * 2
  }),
  arithmeticTemplate({
    key: "y4l7.centimetresToMillimetres", levelKey: "Y4L7", objectiveCode: "Y4-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]! * 10,
    promptTemplates: [
      "How many millimetres are there in {a} centimetres?",
      "Convert {a} cm into millimetres.",
      "A pencil lead is {a} cm long. How many millimetres is that?"
    ],
    explain: (v, r) => [`There are 10 millimetres in 1 centimetre.`, `${v[0]} x 10 = ${r}.`],
    hints: () => ["Milli means a thousandth of a metre, and there are 10 in every centimetre."],
    fr: {
      promptTemplates: [
        "Combien y a-t-il de millimètres dans {a} centimètres ?",
        "Convertis {a} cm en millimètres.",
        "Une mine de crayon mesure {a} cm. Combien cela fait-il de millimètres ?"
      ],
      explain: (v, r) => [`Il y a 10 millimètres dans 1 centimètre.`, `${v[0]} x 10 = ${r}.`],
      hints: () => ["Milli veut dire millième de mètre, et il y en a 10 dans chaque centimètre."]
    },
    declaredVariationSpace: 999 * 3
  }),

  // --- Y4-L7-2: area by counting squares ---
  arithmeticTemplate({
    key: "y4l7.areaByCountingSquares", levelKey: "Y4L7", objectiveCode: "Y4-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP", contextPool: ROOMS,
    ranges: [[2, 15], [2, 15]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A rectangle is drawn on squared paper with {a} rows of {b} squares. What is its area, in squares?",
      "{ctx} is a rectangle {a} squares across and {b} squares down. How many squares does it cover?"
    ],
    explain: (v, r) => [`Counting all the squares means multiplying the rows by the columns.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Instead of counting one by one, multiply the number of rows by the number in each row."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un rectangle est tracé sur du papier quadrillé avec {a} rangées de {b} carreaux. Quelle est son aire, en carreaux ?",
        "{ctx} est un rectangle de {a} carreaux de large et {b} de haut. Combien de carreaux couvre-t-il ?"
      ],
      explain: (v, r) => [`Compter tous les carreaux revient à multiplier les rangées par les colonnes.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Plutôt que de compter un par un, multiplie le nombre de rangées par le nombre de carreaux par rangée."]
    },
    declaredVariationSpace: 14 * 14 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y4l7.areaOfLShape", levelKey: "Y4L7", objectiveCode: "Y4-L7-2", difficulty: "REASONING",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 12], [2, 12], [2, 12]],
    compute: (v) => v[0]! * v[1]! + v[2]! * v[3]!,
    promptTemplates: [
      "An L-shape splits into two rectangles: {a} by {b} squares and {c} by {d} squares. What is its total area, in squares?",
      "A rectilinear shape is made from a {a} x {b} rectangle and a {c} x {d} rectangle. What is its area, in squares?"
    ],
    explain: (v, r) => [
      `${v[0]} x ${v[1]} = ${v[0]! * v[1]!} squares.`,
      `${v[2]} x ${v[3]} = ${v[2]! * v[3]!} squares.`,
      `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r} squares.`
    ],
    hints: () => ["Split the shape into rectangles, find each area, then add them together."],
    fr: {
      promptTemplates: [
        "Une forme en L se découpe en deux rectangles : {a} sur {b} carreaux et {c} sur {d} carreaux. Quelle est son aire totale, en carreaux ?",
        "Une figure est composée d'un rectangle {a} x {b} et d'un rectangle {c} x {d}. Quelle est son aire, en carreaux ?"
      ],
      explain: (v, r) => [
        `${v[0]} x ${v[1]} = ${v[0]! * v[1]!} carreaux.`,
        `${v[2]} x ${v[3]} = ${v[2]! * v[3]!} carreaux.`,
        `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r} carreaux.`
      ],
      hints: () => ["Découpe la figure en rectangles, calcule chaque aire, puis additionne."]
    },
    declaredVariationSpace: 11 * 11 * 11 * 11
  }),
  arithmeticTemplate({
    key: "y4l7.missingSideFromArea", levelKey: "Y4L7", objectiveCode: "Y4-L7-2", difficulty: "REASONING",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 15], [2, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ area: v[0]! * v[1]! }),
    promptTemplates: [
      "A rectangle covers {area} squares and is {a} squares wide. How many squares tall is it?",
      "A rectangle has an area of {area} squares and one side of {a} squares. What is the other side?"
    ],
    explain: (v, r) => [`Area is one side times the other, so divide to go backwards.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the area by the side you know."],
    fr: {
      promptTemplates: [
        "Un rectangle couvre {area} carreaux et mesure {a} carreaux de large. Combien mesure-t-il de haut ?",
        "Un rectangle a une aire de {area} carreaux et un côté de {a} carreaux. Que mesure l'autre côté ?"
      ],
      explain: (v, r) => [`L'aire est un côté fois l'autre : divise pour revenir en arrière.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Divise l'aire par le côté que tu connais."]
    },
    declaredVariationSpace: 14 * 14 * 2
  }),
  categoricalPoolTemplate({
    key: "y4l7.mcCompareAreas", levelKey: "Y4L7", objectiveCode: "Y4-L7-2", difficulty: "REASONING",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const a1 = rng.int(2, 12);
      const b1 = rng.int(2, 12);
      let a2 = rng.int(2, 12);
      const b2 = rng.int(2, 12);
      if (a1 * b1 === a2 * b2) a2 = a2 === 12 ? a2 - 1 : a2 + 1;
      const first = `the ${a1} by ${b1} rectangle`;
      const second = `the ${a2} by ${b2} rectangle`;
      const bigger = a1 * b1 > a2 * b2 ? first : second;
      const smaller = a1 * b1 > a2 * b2 ? second : first;
      return {
        prompt: `Which covers more squares: ${first} or ${second}?`,
        correctLabel: bigger,
        distractorLabels: [smaller, "they cover the same number of squares"],
        explanationSteps: [`${a1} x ${b1} = ${a1 * b1} squares and ${a2} x ${b2} = ${a2 * b2} squares.`, `${bigger} covers more.`],
        hints: ["Work out both areas by multiplying, then compare the two numbers."]
      };
    },
    fr: {
      translate: (drawn) => {
        const toFr = (label: string) => label
          .replace(/^the (\d+) by (\d+) rectangle$/, "le rectangle $1 sur $2")
          .replace(/^they cover the same number of squares$/, "ils couvrent le même nombre de carreaux");
        const m = drawn.prompt.match(/^Which covers more squares: the (\d+) by (\d+) rectangle or the (\d+) by (\d+) rectangle\?$/);
        if (!m) return {};
        return {
          prompt: `Lequel couvre le plus de carreaux : le rectangle ${m[1]} sur ${m[2]} ou le rectangle ${m[3]} sur ${m[4]} ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          hints: ["Calcule les deux aires en multipliant, puis compare les deux nombres."]
        };
      }
    },
    declaredVariationSpace: 11 * 11 * 11 * 11
  }),

  // --- Y4-L7-3: perimeter of rectilinear figures ---
  arithmeticTemplate({
    key: "y4l7.perimeterOfRectangle", levelKey: "Y4L7", objectiveCode: "Y4-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP", contextPool: ROOMS,
    ranges: [[2, 40], [2, 40]], compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: [
      "A rectangle is {a} cm long and {b} cm wide. What is its perimeter, in cm?",
      "{ctx} is a rectangle {a} m by {b} m. How much fencing goes all the way round, in m?"
    ],
    explain: (v, r) => [`A rectangle has two long sides and two short sides.`, `2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Perimeter is the distance all the way around the edge — add all four sides."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un rectangle mesure {a} cm de long et {b} cm de large. Quel est son périmètre, en cm ?",
        "{ctx} est un rectangle de {a} m sur {b} m. Quelle longueur de clôture en fait le tour, en m ?"
      ],
      explain: (v, r) => [`Un rectangle a deux grands côtés et deux petits côtés.`, `2 x (${v[0]} + ${v[1]}) = ${r}.`],
      hints: () => ["Le périmètre est la distance tout autour du bord — additionne les quatre côtés."]
    },
    declaredVariationSpace: 39 * 39 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y4l7.perimeterOfSquare", levelKey: "Y4L7", objectiveCode: "Y4-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 60]], compute: (v) => 4 * v[0]!,
    promptTemplates: [
      "A square has sides of {a} cm. What is its perimeter, in cm?",
      "{ctx} is a square with sides of {a} m. What is the distance all the way around, in m?",
      "Each side of a square is {a} cm. How far is it around the outside, in cm?"
    ],
    explain: (v, r) => [`All four sides of a square are the same.`, `4 x ${v[0]} = ${r}.`],
    hints: () => ["A square has four equal sides, so multiply one side by 4."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un carré a des côtés de {a} cm. Quel est son périmètre, en cm ?",
        "{ctx} est un carré de {a} m de côté. Quelle est la distance tout autour, en m ?",
        "Chaque côté d'un carré mesure {a} cm. Quelle distance fait le tour, en cm ?"
      ],
      explain: (v, r) => [`Les quatre côtés d'un carré sont identiques.`, `4 x ${v[0]} = ${r}.`],
      hints: () => ["Un carré a quatre côtés égaux : multiplie un côté par 4."]
    },
    declaredVariationSpace: 59 * (1 + 2 * ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y4l7.missingSideFromPerimeter", levelKey: "Y4L7", objectiveCode: "Y4-L7-3", difficulty: "REASONING",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 40], [2, 40]], compute: (v) => v[1]!,
    derive: (v) => ({ perim: 2 * (v[0]! + v[1]!) }),
    promptTemplates: [
      "A rectangle has a perimeter of {perim} cm and is {a} cm long. How wide is it, in cm?",
      "The perimeter of a rectangle is {perim} cm. One side is {a} cm. What is the side next to it, in cm?"
    ],
    explain: (v, r) => [
      `Half the perimeter is one long side plus one short side: ${2 * (v[0]! + v[1]!)} ÷ 2 = ${v[0]! + v[1]!}.`,
      `${v[0]! + v[1]!} - ${v[0]} = ${r}.`
    ],
    hints: () => ["Halve the perimeter first — that gives one long side plus one short side."],
    fr: {
      promptTemplates: [
        "Un rectangle a un périmètre de {perim} cm et mesure {a} cm de long. Quelle est sa largeur, en cm ?",
        "Le périmètre d'un rectangle est {perim} cm. Un côté mesure {a} cm. Que mesure le côté voisin, en cm ?"
      ],
      explain: (v, r) => [
        `La moitié du périmètre est un grand côté plus un petit côté : ${2 * (v[0]! + v[1]!)} ÷ 2 = ${v[0]! + v[1]!}.`,
        `${v[0]! + v[1]!} - ${v[0]} = ${r}.`
      ],
      hints: () => ["Divise d'abord le périmètre par 2 — cela donne un grand côté plus un petit côté."]
    },
    declaredVariationSpace: 39 * 39 * 2
  }),
  arithmeticTemplate({
    key: "y4l7.perimeterOfRectilinearShape", levelKey: "Y4L7", objectiveCode: "Y4-L7-3", difficulty: "REASONING",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP",
    ranges: [[3, 25], [3, 25], [1, 12], [1, 12]],
    constraint: (v) => v[2]! < v[0]! && v[3]! < v[1]!,
    compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: [
      "An L-shaped room fits inside a rectangle {a} m by {b} m, with a {c} m by {d} m corner cut out. What is the perimeter of the L-shape, in m?",
      "A rectilinear shape is a {a} m by {b} m rectangle with a {c} m by {d} m notch removed from one corner. What is its perimeter, in m?"
    ],
    explain: (v, r) => [
      `Cutting a corner out of a rectangle does not change the perimeter: the two new sides replace exactly the pieces removed.`,
      `So the perimeter is still 2 x (${v[0]} + ${v[1]}) = ${r} m.`
    ],
    hints: () => ["Slide the cut-out edges back out to the corner — the total distance around does not change."],
    fr: {
      promptTemplates: [
        "Une pièce en L tient dans un rectangle de {a} m sur {b} m, avec un coin de {c} m sur {d} m découpé. Quel est le périmètre de la forme en L, en m ?",
        "Une figure est un rectangle de {a} m sur {b} m dont on a retiré une encoche de {c} m sur {d} m à un coin. Quel est son périmètre, en m ?"
      ],
      explain: (v, r) => [
        `Découper un coin d'un rectangle ne change pas le périmètre : les deux nouveaux côtés remplacent exactement les morceaux retirés.`,
        `Le périmètre vaut donc toujours 2 x (${v[0]} + ${v[1]}) = ${r} m.`
      ],
      hints: () => ["Fais glisser les bords de l'encoche vers le coin — la distance totale du tour ne change pas."]
    },
    declaredVariationSpace: 23 * 23 * 12 * 12
  }),
  categoricalPoolTemplate({
    key: "y4l7.tfAreaOrPerimeter", levelKey: "Y4L7", objectiveCode: "Y4-L7-3", difficulty: "REASONING",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 25);
      const b = rng.int(2, 25);
      const askArea = rng.chance(0.5);
      const isTrue = rng.chance(0.5);
      const right = askArea ? a * b : 2 * (a + b);
      const wrong = askArea ? 2 * (a + b) : a * b;
      const shown = isTrue ? right : wrong;
      return {
        prompt: `A rectangle is ${a} cm by ${b} cm, so its ${askArea ? "area" : "perimeter"} is ${shown} ${askArea ? "cm²" : "cm"}. True or false?`,
        correctLabel: isTrue && right !== wrong ? "True" : right === wrong ? "True" : "False",
        distractorLabels: [isTrue && right !== wrong ? "False" : right === wrong ? "False" : "True"],
        explanationSteps: [
          `Area means the space inside: ${a} x ${b} = ${a * b} cm².`,
          `Perimeter means the distance around: 2 x (${a} + ${b}) = ${2 * (a + b)} cm.`
        ],
        hints: ["Area multiplies the two sides; perimeter adds all four of them."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const m = drawn.prompt.match(/^A rectangle is (\d+) cm by (\d+) cm, so its (area|perimeter) is (\d+) (cm²|cm)\./);
        if (!m) return {};
        return {
          prompt: `Un rectangle mesure ${m[1]} cm sur ${m[2]} cm, donc ${m[3] === "area" ? "son aire" : "son périmètre"} vaut ${m[4]} ${m[5]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [
            `L'aire est l'espace intérieur : ${m[1]} x ${m[2]} = ${Number(m[1]) * Number(m[2])} cm².`,
            `Le périmètre est la distance du tour : 2 x (${m[1]} + ${m[2]}) = ${2 * (Number(m[1]) + Number(m[2]))} cm.`
          ],
          hints: ["L'aire multiplie les deux côtés ; le périmètre additionne les quatre."]
        };
      }
    },
    declaredVariationSpace: 24 * 24 * 2 * 2
  }),
  arithmeticTemplate({
    key: "y4l7.perimeterFromAllSides", levelKey: "Y4L7", objectiveCode: "Y4-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_PERIMETER_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 30], [2, 30], [2, 30], [2, 30]],
    compute: (v) => v[0]! + v[1]! + v[2]! + v[3]!,
    promptTemplates: [
      "A four-sided shape has sides of {a} cm, {b} cm, {c} cm and {d} cm. What is its perimeter, in cm?",
      "Add the sides {a} cm, {b} cm, {c} cm and {d} cm to find the perimeter, in cm."
    ],
    explain: (v, r) => [`Perimeter means adding every side.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
    hints: () => ["Go around the shape once, adding each side as you pass it."],
    fr: {
      promptTemplates: [
        "Une figure à quatre côtés a des côtés de {a} cm, {b} cm, {c} cm et {d} cm. Quel est son périmètre, en cm ?",
        "Additionne les côtés {a} cm, {b} cm, {c} cm et {d} cm pour trouver le périmètre, en cm."
      ],
      explain: (v, r) => [`Le périmètre, c'est additionner tous les côtés.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
      hints: () => ["Fais le tour de la figure une fois en additionnant chaque côté."]
    },
    declaredVariationSpace: 29 * 29 * 29 * 29
  })
];

export default level;
