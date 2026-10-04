import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 7 — "Measurement, perimeter, area and volume"
const ROOMS = ["classroom", "garden", "kitchen", "playground", "hall", "shed", "patio", "allotment"];
const ROOMS_FR = ["salle de classe", "jardin", "cuisine", "cour de récréation", "salle", "cabane", "terrasse", "potager"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L7-1: area of parallelograms and triangles ---
  arithmeticTemplate({
    key: "y6l7.areaParallelogram", levelKey: "Y6L7", objectiveCode: "Y6-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 30], [2, 30]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A parallelogram has a base of {a} cm and a perpendicular height of {b} cm. What is its area, in cm²?",
      "A parallelogram-shaped patch in the {ctx} has base {a} m and height {b} m. What is its area, in m²?"
    ],
    explain: (v, r) => [`Area of a parallelogram = base x height.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the base by the perpendicular height — no halving."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un parallélogramme a une base de {a} cm et une hauteur perpendiculaire de {b} cm. Quelle est son aire, en cm² ?",
        "Une parcelle en forme de parallélogramme dans le/la {ctx} a une base de {a} m et une hauteur de {b} m. Quelle est son aire, en m² ?"
      ],
      explain: (v, r) => [`Aire d'un parallélogramme = base x hauteur.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie la base par la hauteur perpendiculaire — sans diviser par deux."]
    },
    declaredVariationSpace: 29 * 29 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.areaTriangle", levelKey: "Y6L7", objectiveCode: "Y6-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 30], [2, 30]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]!) / 2,
    promptTemplates: [
      "A triangle has a base of {a} cm and a height of {b} cm. What is its area, in cm²?",
      "A triangular flower bed in the {ctx} has base {a} m and height {b} m. What is its area, in m²?"
    ],
    explain: (v, r) => [`Area of a triangle = (base x height) ÷ 2.`, `(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
    hints: () => ["A triangle is half a parallelogram — multiply then halve."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un triangle a une base de {a} cm et une hauteur de {b} cm. Quelle est son aire, en cm² ?",
        "Un parterre triangulaire dans le/la {ctx} a une base de {a} m et une hauteur de {b} m. Quelle est son aire, en m² ?"
      ],
      explain: (v, r) => [`Aire d'un triangle = (base x hauteur) ÷ 2.`, `(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
      hints: () => ["Un triangle est la moitié d'un parallélogramme — multiplie puis divise par deux."]
    },
    declaredVariationSpace: 29 * 29 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.findTriangleBase", levelKey: "Y6L7", objectiveCode: "Y6-L7-1", difficulty: "REASONING",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 25], [2, 20]], compute: (v) => v[0]! * 2,
    derive: (v) => ({ area: v[0]! * v[1]!, height: v[1]! }),
    promptTemplates: [
      "A triangle has an area of {area} cm² and a height of {height} cm. What is its base, in cm?",
      "A triangular area in the {ctx} measures {area} m² with height {height} m. What is its base, in m?"
    ],
    explain: (v, r) => [`Area = (base x height) ÷ 2, so base = (2 x area) ÷ height.`, `(2 x ${v[0]! * v[1]!}) ÷ ${v[1]} = ${r}.`],
    hints: () => ["Double the area first, then divide by the height."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un triangle a une aire de {area} cm² et une hauteur de {height} cm. Quelle est sa base, en cm ?",
        "Une zone triangulaire dans le/la {ctx} mesure {area} m² avec une hauteur de {height} m. Quelle est sa base, en m ?"
      ],
      explain: (v, r) => [`Aire = (base x hauteur) ÷ 2, donc base = (2 x aire) ÷ hauteur.`, `(2 x ${v[0]! * v[1]!}) ÷ ${v[1]} = ${r}.`],
      hints: () => ["Double d'abord l'aire, puis divise par la hauteur."]
    },
    declaredVariationSpace: 24 * 19 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.compoundShapeArea", levelKey: "Y6L7", objectiveCode: "Y6-L7-1", difficulty: "REASONING",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 20], [2, 20], [2, 20], [2, 20]], compute: (v) => v[0]! * v[1]! + v[2]! * v[3]!,
    promptTemplates: ["A compound shape in the {ctx} is made of a {a} m by {b} m rectangle joined to a {c} m by {d} m rectangle. What is the total area, in m²?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[2]} x ${v[3]} = ${v[2]! * v[3]!}.`, `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`],
    hints: () => ["Split the shape into rectangles, find each area, then add."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: ["Une forme composée dans le/la {ctx} est faite d'un rectangle de {a} m sur {b} m rattaché à un rectangle de {c} m sur {d} m. Quelle est l'aire totale, en m² ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[2]} x ${v[3]} = ${v[2]! * v[3]!}.`, `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`],
      hints: () => ["Découpe la forme en rectangles, calcule chaque aire, puis additionne."]
    },
    declaredVariationSpace: 19 * 19 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y6l7.mcAreaTriangle", levelKey: "Y6L7", objectiveCode: "Y6-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 30], [2, 30]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]!) / 2,
    promptTemplates: ["What is the area, in cm², of a triangle with base {a} cm and height {b} cm?"],
    explain: (v, r) => [`(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
    hints: () => ["Multiply base by height, then halve."],
    distractorSpread: 14,
    fr: {
      promptTemplates: ["Quelle est l'aire, en cm², d'un triangle de base {a} cm et de hauteur {b} cm ?"],
      hints: () => ["Multiplie la base par la hauteur, puis divise par deux."]
    },
    declaredVariationSpace: 29 * 29
  }),

  // --- Y6-L7-2: volume of cubes and cuboids ---
  arithmeticTemplate({
    key: "y6l7.volumeCuboid", levelKey: "Y6L7", objectiveCode: "Y6-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 15], [2, 15], [2, 15]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: [
      "A cuboid measures {a} cm by {b} cm by {c} cm. What is its volume, in cm³?",
      "A storage box in the {ctx} measures {a} cm by {b} cm by {c} cm. What is its volume, in cm³?"
    ],
    explain: (v, r) => [`Volume = length x width x height.`, `${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions together."],
    visualAid: (v) => visuals.shape("cuboid", { l: v[0]!, w: v[1]!, h: v[2]! }),
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un pavé droit mesure {a} cm sur {b} cm sur {c} cm. Quel est son volume, en cm³ ?",
        "Une boîte de rangement dans le/la {ctx} mesure {a} cm sur {b} cm sur {c} cm. Quel est son volume, en cm³ ?"
      ],
      explain: (v, r) => [`Volume = longueur x largeur x hauteur.`, `${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Multiplie les trois dimensions ensemble."]
    },
    declaredVariationSpace: 14 * 14 * 14 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.volumeCube", levelKey: "Y6L7", objectiveCode: "Y6-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 25]], compute: (v) => v[0]! * v[0]! * v[0]!,
    promptTemplates: [
      "A cube has sides of {a} cm. What is its volume, in cm³?",
      "A cube-shaped box in the {ctx} has sides of {a} cm. What is its volume, in cm³?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["All a cube's sides are equal, so multiply the side by itself three times."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un cube a des côtés de {a} cm. Quel est son volume, en cm³ ?",
        "Une boîte cubique dans le/la {ctx} a des côtés de {a} cm. Quel est son volume, en cm³ ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[0]} x ${v[0]} = ${r}.`],
      hints: () => ["Tous les côtés d'un cube sont égaux, multiplie donc le côté par lui-même trois fois."]
    },
    declaredVariationSpace: 24 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.missingCuboidDimension", levelKey: "Y6L7", objectiveCode: "Y6-L7-2", difficulty: "REASONING",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 12], [2, 12], [2, 12]], compute: (v) => v[2]!,
    derive: (v) => ({ vol: v[0]! * v[1]! * v[2]! }),
    promptTemplates: [
      "A cuboid has a volume of {vol} cm³ and a base measuring {a} cm by {b} cm. What is its height, in cm?",
      "A tank in the {ctx} holds {vol} cm³ and has a base of {a} cm by {b} cm. How tall is it, in cm?"
    ],
    explain: (v, r) => [`Base area = ${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Divide the volume by the area of the base."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Un pavé droit a un volume de {vol} cm³ et une base de {a} cm sur {b} cm. Quelle est sa hauteur, en cm ?",
        "Un réservoir dans le/la {ctx} contient {vol} cm³ et a une base de {a} cm sur {b} cm. Quelle est sa hauteur, en cm ?"
      ],
      explain: (v, r) => [`Aire de la base = ${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[1]!} = ${r}.`],
      hints: () => ["Divise le volume par l'aire de la base."]
    },
    declaredVariationSpace: 11 * 11 * 11 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.mcVolumeCuboid", levelKey: "Y6L7", objectiveCode: "Y6-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 15], [2, 15], [2, 15]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: ["What is the volume, in cm³, of a cuboid measuring {a} cm by {b} cm by {c} cm?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions."],
    distractorSpread: 40,
    fr: {
      promptTemplates: ["Quel est le volume, en cm³, d'un pavé droit mesurant {a} cm sur {b} cm sur {c} cm ?"],
      hints: () => ["Multiplie les trois dimensions."]
    },
    declaredVariationSpace: 14 * 14 * 14
  }),
  categoricalPoolTemplate({
    key: "y6l7.tfVolume", levelKey: "Y6L7", objectiveCode: "Y6-L7-2", difficulty: "REASONING",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const l = rng.int(2, 15);
      const w = rng.int(2, 15);
      const h = rng.int(2, 15);
      const correct = l * w * h;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correct : correct + rng.int(1, 30);
      return {
        prompt: `A cuboid measuring ${l} cm by ${w} cm by ${h} cm has a volume of ${shown} cm³. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${l} x ${w} x ${h} = ${correct}.`],
        hints: ["Multiply the three dimensions and compare."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A cuboid measuring (\d+) cm by (\d+) cm by (\d+) cm has a volume of (\d+) cm³\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un pavé droit de ${m[1]} cm sur ${m[2]} cm sur ${m[3]} cm a un volume de ${m[4]} cm³. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Multiplie les trois dimensions et compare."]
        };
      }
    },
    declaredVariationSpace: 4000
  }),

  // --- Y6-L7-3: convert between miles/km and metric measures ---
  arithmeticTemplate({
    key: "y6l7.metresToCentimetres", levelKey: "Y6L7", objectiveCode: "Y6-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[1, 200]], compute: (v) => v[0]! * 100,
    promptTemplates: [
      "Convert {a} metres into centimetres.",
      "A length in the {ctx} is {a} metres. How many centimetres is that?"
    ],
    explain: (v, r) => [`1 m = 100 cm, so ${v[0]} x 100 = ${r}.`],
    hints: () => ["There are 100 centimetres in a metre."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Convertis {a} mètres en centimètres.",
        "Une longueur dans le/la {ctx} est de {a} mètres. Combien cela fait-il de centimètres ?"
      ],
      explain: (v, r) => [`1 m = 100 cm, donc ${v[0]} x 100 = ${r}.`],
      hints: () => ["Il y a 100 centimètres dans un mètre."]
    },
    declaredVariationSpace: 200 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.kilogramsToGrams", levelKey: "Y6L7", objectiveCode: "Y6-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[1, 200]], compute: (v) => v[0]! * 1000,
    promptTemplates: [
      "Convert {a} kilograms into grams.",
      "A sack in the {ctx} weighs {a} kilograms. How many grams is that?"
    ],
    explain: (v, r) => [`1 kg = 1000 g, so ${v[0]} x 1000 = ${r}.`],
    hints: () => ["There are 1000 grams in a kilogram."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: [
        "Convertis {a} kilogrammes en grammes.",
        "Un sac dans le/la {ctx} pèse {a} kilogrammes. Combien cela fait-il de grammes ?"
      ],
      explain: (v, r) => [`1 kg = 1000 g, donc ${v[0]} x 1000 = ${r}.`],
      hints: () => ["Il y a 1000 grammes dans un kilogramme."]
    },
    declaredVariationSpace: 200 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.milesToKilometres", levelKey: "Y6L7", objectiveCode: "Y6-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[1, 60]], compute: (v) => v[0]! * 8,
    derive: (v) => ({ miles: v[0]! * 5 }),
    promptTemplates: ["Using the approximation 5 miles = 8 kilometres, convert {miles} miles into kilometres.", "A journey starting at the {ctx} is {miles} miles. Using 5 miles = 8 kilometres, how many kilometres is that?"],
    explain: (v, r) => [`${v[0]! * 5} ÷ 5 = ${v[0]}, so there are ${v[0]} lots of 5 miles.`, `${v[0]} x 8 = ${r} km.`],
    hints: () => ["Divide by 5 to find how many 5-mile blocks there are, then multiply by 8."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: ["En utilisant l'approximation 5 miles = 8 kilomètres, convertis {miles} miles en kilomètres.", "Un trajet partant du/de la {ctx} fait {miles} miles. Avec 5 miles = 8 kilomètres, combien cela fait-il de kilomètres ?"],
      explain: (v, r) => [`${v[0]! * 5} ÷ 5 = ${v[0]}, donc il y a ${v[0]} blocs de 5 miles.`, `${v[0]} x 8 = ${r} km.`],
      hints: () => ["Divise par 5 pour trouver le nombre de blocs de 5 miles, puis multiplie par 8."]
    },
    declaredVariationSpace: 60 * (1 + ROOMS.length)
  }),
  arithmeticTemplate({
    key: "y6l7.kilometresToMiles", levelKey: "Y6L7", objectiveCode: "Y6-L7-3", difficulty: "REASONING",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[1, 60]], compute: (v) => v[0]! * 5,
    derive: (v) => ({ km: v[0]! * 8 }),
    promptTemplates: ["Using the approximation 8 kilometres = 5 miles, convert {km} kilometres into miles.", "A route from the {ctx} is {km} kilometres. Using 8 kilometres = 5 miles, how many miles is that?"],
    explain: (v, r) => [`${v[0]! * 8} ÷ 8 = ${v[0]}.`, `${v[0]} x 5 = ${r} miles.`],
    hints: () => ["Divide by 8, then multiply by 5."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: ["En utilisant l'approximation 8 kilomètres = 5 miles, convertis {km} kilomètres en miles.", "Un itinéraire depuis le/la {ctx} fait {km} kilomètres. Avec 8 kilomètres = 5 miles, combien cela fait-il de miles ?"],
      explain: (v, r) => [`${v[0]! * 8} ÷ 8 = ${v[0]}.`, `${v[0]} x 5 = ${r} miles.`],
      hints: () => ["Divise par 8, puis multiplie par 5."]
    },
    declaredVariationSpace: 60 * (1 + ROOMS.length)
  }),
  matchingTemplate({
    key: "y6l7.matchMetricConversions", levelKey: "Y6L7", objectiveCode: "Y6-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["UNIT_CONVERSION_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const n = rng.int(1, 99);
        const kind = rng.pick(["m-cm", "kg-g", "l-ml"]);
        const key = `${n}${kind}`;
        if (used.has(key)) continue;
        used.add(key);
        if (kind === "m-cm") pairs.push({ left: `${n} m`, right: `${n * 100} cm` });
        else if (kind === "kg-g") pairs.push({ left: `${n} kg`, right: `${n * 1000} g` });
        else pairs.push({ left: `${n} litres`, right: `${n * 1000} ml` });
      }
      return pairs;
    },
    promptTemplates: ["Match each measurement to its equivalent in smaller units."],
    explain: () => ["Metres to centimetres multiplies by 100; kilograms to grams and litres to millilitres multiply by 1000."],
    hints: () => ["Check which conversion factor each unit pair needs."],
    fr: {
      promptTemplates: ["Associe chaque mesure à son équivalent en unités plus petites."],
      explain: () => ["Des mètres aux centimètres, on multiplie par 100 ; des kilogrammes aux grammes et des litres aux millilitres, par 1000."],
      hints: () => ["Vérifie quel facteur de conversion correspond à chaque paire d'unités."],
      translatePairs: (pairs) => pairs.map((p) => ({
        left: p.left.replace(" litres", " litres"),
        right: p.right
      }))
    },
    declaredVariationSpace: 4000
  })
];

export default level;
