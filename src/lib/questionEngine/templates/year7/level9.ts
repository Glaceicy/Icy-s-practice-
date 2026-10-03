import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 9 — "Perimeter, area, volume, graphs and data"
const ROOMS = ["classroom", "kitchen", "garden", "hallway", "office", "library", "workshop", "studio"];
const ROOMS_FR = ["salle de classe", "cuisine", "jardin", "couloir", "bureau", "bibliothèque", "atelier", "studio"];
const SUBJECTS = ["football", "swimming", "cycling", "reading", "chess", "art", "music", "drama"];
const SUBJECTS_FR = ["football", "natation", "cyclisme", "lecture", "échecs", "art", "musique", "théâtre"];

export const level: QuestionTemplateDef[] = [
  // --- Y7-L9-1: area of triangles, parallelograms and trapezia ---
  arithmeticTemplate({
    key: "y7l9.areaTriangle", levelKey: "Y7L9", objectiveCode: "Y7-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 30], [2, 30]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]!) / 2,
    promptTemplates: ["A triangle has a base of {a} cm and a height of {b} cm. What is its area, in cm²?", "Work out the area of a triangle with base {a} cm and height {b} cm, in cm²."],
    explain: (v, r) => [`Area of a triangle = (base x height) ÷ 2.`, `(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
    hints: () => ["Multiply base by height, then halve it."],
    fr: {
      promptTemplates: ["Un triangle a une base de {a} cm et une hauteur de {b} cm. Quelle est son aire, en cm² ?", "Calcule l'aire d'un triangle de base {a} cm et de hauteur {b} cm, en cm²."],
      explain: (v, r) => [`Aire d'un triangle = (base x hauteur) ÷ 2.`, `(${v[0]} x ${v[1]}) ÷ 2 = ${r}.`],
      hints: () => ["Multiplie la base par la hauteur, puis divise par deux."]
    },
    declaredVariationSpace: 29 * 29
  }),
  arithmeticTemplate({
    key: "y7l9.areaParallelogram", levelKey: "Y7L9", objectiveCode: "Y7-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 30], [2, 30]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A parallelogram has a base of {a} cm and a perpendicular height of {b} cm. What is its area, in cm²?"],
    explain: (v, r) => [`Area of a parallelogram = base x height.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the base by the perpendicular height — no halving needed."],
    fr: {
      promptTemplates: ["Un parallélogramme a une base de {a} cm et une hauteur perpendiculaire de {b} cm. Quelle est son aire, en cm² ?"],
      explain: (v, r) => [`Aire d'un parallélogramme = base x hauteur.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie la base par la hauteur perpendiculaire — pas besoin de diviser par deux."]
    },
    declaredVariationSpace: 29 * 29
  }),
  arithmeticTemplate({
    key: "y7l9.areaTrapezium", levelKey: "Y7L9", objectiveCode: "Y7-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 20], [2, 20]], constraint: (v) => ((v[0]! + v[1]!) * v[2]!) % 2 === 0,
    compute: (v) => ((v[0]! + v[1]!) * v[2]!) / 2,
    promptTemplates: ["A trapezium has parallel sides of {a} cm and {b} cm, and a height of {c} cm. What is its area, in cm²?"],
    explain: (v, r) => [`Area of a trapezium = ((a + b) ÷ 2) x height.`, `((${v[0]} + ${v[1]}) x ${v[2]}) ÷ 2 = ${r}.`],
    hints: () => ["Add the two parallel sides, multiply by the height, then halve."],
    fr: {
      promptTemplates: ["Un trapèze a des côtés parallèles de {a} cm et {b} cm, et une hauteur de {c} cm. Quelle est son aire, en cm² ?"],
      explain: (v, r) => [`Aire d'un trapèze = ((a + b) ÷ 2) x hauteur.`, `((${v[0]} + ${v[1]}) x ${v[2]}) ÷ 2 = ${r}.`],
      hints: () => ["Additionne les deux côtés parallèles, multiplie par la hauteur, puis divise par deux."]
    },
    declaredVariationSpace: 19 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y7l9.mcAreaTriangle", levelKey: "Y7L9", objectiveCode: "Y7-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_FORMULA_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 30], [2, 30]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]!) / 2,
    promptTemplates: ["What is the area, in cm², of a triangle with base {a} cm and height {b} cm?"],
    explain: (v, r) => [`(${v[0]} x ${v[1]}) ÷ 2 = ${r} cm².`],
    hints: () => ["Multiply base by height, then halve."],
    distractorSpread: 15,
    fr: {
      promptTemplates: ["Quelle est l'aire, en cm², d'un triangle de base {a} cm et de hauteur {b} cm ?"],
      hints: () => ["Multiplie la base par la hauteur, puis divise par deux."]
    },
    declaredVariationSpace: 29 * 29
  }),
  arithmeticTemplate({
    key: "y7l9.perimeterRectangle", levelKey: "Y7L9", objectiveCode: "Y7-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROOMS,
    ranges: [[2, 40], [2, 40]], compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: ["A rectangular {ctx} measures {a} m by {b} m. What is its perimeter, in metres?", "What is the perimeter of a rectangle measuring {a} m by {b} m?"],
    explain: (v, r) => [`Perimeter = 2 x (length + width).`, `2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Add the length and width, then double it."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: ["Un(e) {ctx} rectangulaire mesure {a} m sur {b} m. Quel est son périmètre, en mètres ?", "Quel est le périmètre d'un rectangle mesurant {a} m sur {b} m ?"],
      explain: (v, r) => [`Périmètre = 2 x (longueur + largeur).`, `2 x (${v[0]} + ${v[1]}) = ${r}.`],
      hints: () => ["Additionne la longueur et la largeur, puis double le résultat."]
    },
    declaredVariationSpace: 39 * 39 * 2
  }),

  // --- Y7-L9-2: surface area and volume of cuboids ---
  arithmeticTemplate({
    key: "y7l9.volumeCuboid", levelKey: "Y7L9", objectiveCode: "Y7-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [2, 15], [2, 15]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: ["A cuboid measures {a} cm by {b} cm by {c} cm. What is its volume, in cm³?"],
    explain: (v, r) => [`Volume = length x width x height.`, `${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions together."],
    fr: {
      promptTemplates: ["Un pavé droit mesure {a} cm sur {b} cm sur {c} cm. Quel est son volume, en cm³ ?"],
      explain: (v, r) => [`Volume = longueur x largeur x hauteur.`, `${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Multiplie les trois dimensions ensemble."]
    },
    declaredVariationSpace: 14 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y7l9.surfaceAreaCuboid", levelKey: "Y7L9", objectiveCode: "Y7-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12], [2, 12]], compute: (v) => 2 * (v[0]! * v[1]! + v[0]! * v[2]! + v[1]! * v[2]!),
    promptTemplates: ["A cuboid measures {a} cm by {b} cm by {c} cm. What is its surface area, in cm²?"],
    explain: (v, r) => [`Surface area = 2(lw + lh + wh).`, `2 x (${v[0]! * v[1]!} + ${v[0]! * v[2]!} + ${v[1]! * v[2]!}) = ${r}.`],
    hints: () => ["Work out the area of each of the three different faces, add them, then double."],
    fr: {
      promptTemplates: ["Un pavé droit mesure {a} cm sur {b} cm sur {c} cm. Quelle est son aire totale, en cm² ?"],
      explain: (v, r) => [`Aire totale = 2(Ll + Lh + lh).`, `2 x (${v[0]! * v[1]!} + ${v[0]! * v[2]!} + ${v[1]! * v[2]!}) = ${r}.`],
      hints: () => ["Calcule l'aire de chacune des trois faces différentes, additionne-les, puis double."]
    },
    declaredVariationSpace: 11 * 11 * 11
  }),
  arithmeticTemplate({
    key: "y7l9.mcVolumeCuboid", levelKey: "Y7L9", objectiveCode: "Y7-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 15], [2, 15], [2, 15]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: ["What is the volume, in cm³, of a cuboid measuring {a} cm by {b} cm by {c} cm?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r} cm³.`],
    hints: () => ["Multiply all three dimensions."],
    distractorSpread: 40,
    fr: {
      promptTemplates: ["Quel est le volume, en cm³, d'un pavé droit mesurant {a} cm sur {b} cm sur {c} cm ?"],
      hints: () => ["Multiplie les trois dimensions."]
    },
    declaredVariationSpace: 14 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y7l9.missingCuboidDimension", levelKey: "Y7L9", objectiveCode: "Y7-L9-2", difficulty: "REASONING",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12], [2, 12]], compute: (v) => v[2]!,
    derive: (v) => ({ vol: v[0]! * v[1]! * v[2]! }),
    promptTemplates: ["A cuboid has a volume of {vol} cm³. Its base measures {a} cm by {b} cm. What is its height, in cm?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!} cm² base area.`, `${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Divide the volume by the area of the base."],
    fr: {
      promptTemplates: ["Un pavé droit a un volume de {vol} cm³. Sa base mesure {a} cm sur {b} cm. Quelle est sa hauteur, en cm ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!} cm² d'aire de base.`, `${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[1]!} = ${r}.`],
      hints: () => ["Divise le volume par l'aire de la base."]
    },
    declaredVariationSpace: 11 * 11 * 11
  }),
  arithmeticTemplate({
    key: "y7l9.wordProblemVolume", levelKey: "Y7L9", objectiveCode: "Y7-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["VOLUME_FORMULA_ERROR"], type: "WORD_PROBLEM", contextPool: ROOMS,
    ranges: [[2, 12], [2, 12], [2, 12]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: ["A storage box in the {ctx} measures {a} cm by {b} cm by {c} cm. What volume of space does it hold, in cm³?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply the three dimensions together."],
    fr: {
      contextPool: ROOMS_FR,
      promptTemplates: ["Une boîte de rangement dans le/la {ctx} mesure {a} cm sur {b} cm sur {c} cm. Quel volume peut-elle contenir, en cm³ ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Multiplie les trois dimensions ensemble."]
    },
    declaredVariationSpace: 11 * 11 * 11 * ROOMS.length
  }),

  // --- Y7-L9-3: interpret, analyse and compare data sets ---
  arithmeticTemplate({
    key: "y7l9.meanOfDataSet", levelKey: "Y7L9", objectiveCode: "Y7-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 30], [1, 30], [1, 30], [1, 30]], constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) % 4 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) / 4,
    promptTemplates: ["Find the mean of this data set: {a}, {b}, {c}, {d}."],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
    hints: () => ["Add all the values, then divide by how many values there are."],
    fr: {
      promptTemplates: ["Trouve la moyenne de cette série de données : {a}, {b}, {c}, {d}."],
      explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
      hints: () => ["Additionne toutes les valeurs, puis divise par le nombre de valeurs."]
    },
    declaredVariationSpace: 29 * 29 * 29 * 29
  }),
  arithmeticTemplate({
    key: "y7l9.rangeOfDataSet", levelKey: "Y7L9", objectiveCode: "Y7-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]],
    compute: (v) => Math.max(v[0]!, v[1]!, v[2]!, v[3]!) - Math.min(v[0]!, v[1]!, v[2]!, v[3]!),
    promptTemplates: ["Find the range of this data set: {a}, {b}, {c}, {d}."],
    explain: (v, r) => [`Largest = ${Math.max(v[0]!, v[1]!, v[2]!, v[3]!)}, smallest = ${Math.min(v[0]!, v[1]!, v[2]!, v[3]!)}.`, `Range = ${r}.`],
    hints: () => ["Subtract the smallest value from the largest."],
    fr: {
      promptTemplates: ["Trouve l'étendue de cette série de données : {a}, {b}, {c}, {d}."],
      explain: (v, r) => [`Plus grande = ${Math.max(v[0]!, v[1]!, v[2]!, v[3]!)}, plus petite = ${Math.min(v[0]!, v[1]!, v[2]!, v[3]!)}.`, `Étendue = ${r}.`],
      hints: () => ["Soustrais la plus petite valeur de la plus grande."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y7l9.pieChartAngle", levelKey: "Y7L9", objectiveCode: "Y7-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SUBJECTS,
    ranges: [[1, 30], [1, 12]], constraint: (v) => (360 % (v[1]! * 1)) === 0 && v[0]! <= v[1]! * 30,
    compute: (v) => Math.round((v[0]! / (v[1]! * 30)) * 360),
    derive: (v) => ({ total: v[1]! * 30 }),
    promptTemplates: ["In a survey of {total} people, {a} chose {ctx}. What angle, in degrees, represents {ctx} on a pie chart?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 30} x 360 = ${r}°.`],
    hints: () => ["Divide the category count by the total, then multiply by 360°."],
    visualAid: (v) => visuals.graph("pie", [{ label: "chosen", value: v[0]! }, { label: "other", value: v[1]! * 30 - v[0]! }]),
    fr: {
      contextPool: SUBJECTS_FR,
      promptTemplates: ["Dans un sondage auprès de {total} personnes, {a} ont choisi {ctx}. Quel angle, en degrés, représente {ctx} sur un diagramme circulaire ?"],
      explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 30} x 360 = ${r}°.`],
      hints: () => ["Divise l'effectif de la catégorie par le total, puis multiplie par 360°."]
    },
    declaredVariationSpace: 30 * 12 * SUBJECTS.length
  }),
  arithmeticTemplate({
    key: "y7l9.barChartTotal", levelKey: "Y7L9", objectiveCode: "Y7-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SUBJECTS,
    ranges: [[1, 40], [1, 40], [1, 40]], compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: ["A bar chart shows {a}, {b} and {c} people choosing three activities including {ctx}. How many people were surveyed in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add the heights of all the bars."],
    visualAid: (v) => visuals.graph("bar", [{ label: "A", value: v[0]! }, { label: "B", value: v[1]! }, { label: "C", value: v[2]! }]),
    fr: {
      contextPool: SUBJECTS_FR,
      promptTemplates: ["Un diagramme en barres montre {a}, {b} et {c} personnes choisissant trois activités dont {ctx}. Combien de personnes ont été interrogées en tout ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Additionne les hauteurs de toutes les barres."]
    },
    declaredVariationSpace: 40 * 40 * 40 * SUBJECTS.length
  }),
  categoricalPoolTemplate({
    key: "y7l9.tfCompareDataSets", levelKey: "Y7L9", objectiveCode: "Y7-L9-3", difficulty: "REASONING",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const setA = [rng.int(1, 30), rng.int(1, 30), rng.int(1, 30)];
      const setB = [rng.int(1, 30), rng.int(1, 30), rng.int(1, 30)];
      const rangeA = Math.max(...setA) - Math.min(...setA);
      const rangeB = Math.max(...setB) - Math.min(...setB);
      const claimAGreater = rng.chance(0.5);
      const claimIsCorrect = claimAGreater ? rangeA > rangeB : rangeB >= rangeA;
      return {
        prompt: `Set A is ${setA.join(", ")} and Set B is ${setB.join(", ")}. ${claimAGreater ? "Set A" : "Set B"} has the larger range. True or false?`,
        correctLabel: claimIsCorrect ? "True" : "False",
        distractorLabels: [claimIsCorrect ? "False" : "True"],
        explanationSteps: [`Range of Set A = ${rangeA}, range of Set B = ${rangeB}.`],
        hints: ["Work out each set's range (largest minus smallest), then compare."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Set A is (.*) and Set B is (.*)\. (Set A|Set B) has the larger range\. True or false\?$/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        const whichFr = m[3] === "Set A" ? "La série A" : "La série B";
        return {
          prompt: `La série A est ${m[1]} et la série B est ${m[2]}. ${whichFr} a la plus grande étendue. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Calcule l'étendue de chaque série (plus grande moins plus petite), puis compare."]
        };
      }
    },
    declaredVariationSpace: 5000
  })
];

export default level;
