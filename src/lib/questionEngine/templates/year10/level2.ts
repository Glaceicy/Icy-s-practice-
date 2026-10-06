import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 2 — "Ratio, proportion, growth and compound measures"
// One template is tagged HIGHER (further compound measures), matching the
// Higher-tier extension in objective Y10-L2-3; the other 15 are untagged so
// Core and Foundation learners still get a full bank.
const JOURNEYS = ["a train", "a cyclist", "a lorry", "a ferry", "a courier van", "a runner", "a tram", "a coach"];
const JOURNEYS_FR = ["un train", "un cycliste", "un camion", "un ferry", "une camionnette de livraison", "un coureur", "un tramway", "un autocar"];
const MATERIALS = ["aluminium", "oak", "concrete", "copper", "granite", "pine", "steel", "glass"];
const MATERIALS_FR = ["aluminium", "chêne", "béton", "cuivre", "granit", "pin", "acier", "verre"];

export const level: QuestionTemplateDef[] = [
  // --- Y10-L2-1: direct and inverse proportion ---
  arithmeticTemplate({
    key: "y10l2.directProportionScale", levelKey: "Y10L2", objectiveCode: "Y10-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY", contextPool: MATERIALS,
    ranges: [[2, 30], [2, 12], [2, 12]], compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ baseCost: v[0]! * v[1]!, baseQty: v[1]!, newQty: v[2]! }),
    promptTemplates: [
      "{baseQty} kg of {ctx} costs £{baseCost}. At the same rate, what does {newQty} kg cost, in pounds?",
      "If {baseQty} units cost £{baseCost}, what do {newQty} units cost, in pounds?"
    ],
    explain: (v, r) => [`One unit costs ${v[0]! * v[1]!} ÷ ${v[1]} = ${v[0]}.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Find the cost of one unit first, then scale up."],
    fr: {
      contextPool: MATERIALS_FR,
      promptTemplates: [
        "{baseQty} kg {de:ctx} coûtent £{baseCost}. Au même tarif, combien coûtent {newQty} kg, en livres ?",
        "Si {baseQty} unités coûtent £{baseCost}, combien coûtent {newQty} unités, en livres ?"
      ],
      explain: (v, r) => [`Une unité coûte ${v[0]! * v[1]!} ÷ ${v[1]} = ${v[0]}.`, `${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Trouve d'abord le prix d'une unité, puis multiplie."]
    },
    declaredVariationSpace: 29 * 11 * 11 * (1 + MATERIALS.length)
  }),
  arithmeticTemplate({
    key: "y10l2.inverseProportion", levelKey: "Y10L2", objectiveCode: "Y10-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 12], [2, 12]], constraint: (v) => (v[0]! * v[1]!) % v[2]! === 0,
    compute: (v) => (v[0]! * v[1]!) / v[2]!,
    derive: (v) => ({ workers: v[1]!, days: v[0]!, newWorkers: v[2]! }),
    promptTemplates: ["{workers} workers take {days} days to finish a job. At the same rate, how many days would {newWorkers} workers take?"],
    explain: (v, r) => [`Total work = ${v[1]} x ${v[0]} = ${v[0]! * v[1]!} worker-days.`, `${v[0]! * v[1]!} ÷ ${v[2]} = ${r}.`],
    hints: () => ["More workers means fewer days — multiply to find the total work, then divide."],
    fr: {
      promptTemplates: ["{workers} ouvriers mettent {days} jours à finir un travail. Au même rythme, combien de jours mettraient {newWorkers} ouvriers ?"],
      explain: (v, r) => [`Travail total = ${v[1]} x ${v[0]} = ${v[0]! * v[1]!} jours-ouvrier.`, `${v[0]! * v[1]!} ÷ ${v[2]} = ${r}.`],
      hints: () => ["Plus d'ouvriers signifie moins de jours — multiplie pour le travail total, puis divise."]
    },
    declaredVariationSpace: 19 * 11 * 11
  }),
  arithmeticTemplate({
    key: "y10l2.proportionConstant", levelKey: "Y10L2", objectiveCode: "Y10-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY", contextPool: MATERIALS,
    ranges: [[2, 25], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ yVal: v[0]! * v[1]!, xVal: v[1]! }),
    promptTemplates: [
      "y is directly proportional to x, so y = kx. When x = {xVal}, y = {yVal}. What is k?",
      "For {ctx}, y is directly proportional to x. When x = {xVal}, y = {yVal}. What is the constant of proportionality?"
    ],
    explain: (v, r) => [`k = y ÷ x = ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide y by x to find the constant of proportionality."],
    fr: {
      contextPool: MATERIALS_FR,
      promptTemplates: [
        "y est directement proportionnel à x, donc y = kx. Quand x = {xVal}, y = {yVal}. Que vaut k ?",
        "Pour {ctx}, y est directement proportionnel à x. Quand x = {xVal}, y = {yVal}. Quelle est la constante de proportionnalité ?"
      ],
      explain: (v, r) => [`k = y ÷ x = ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Divise y par x pour trouver la constante de proportionnalité."]
    },
    declaredVariationSpace: 24 * 19 * (1 + MATERIALS.length)
  }),
  arithmeticTemplate({
    key: "y10l2.mcDirectProportion", levelKey: "Y10L2", objectiveCode: "Y10-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 30], [2, 12], [2, 12]], compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ baseCost: v[0]! * v[1]!, baseQty: v[1]!, newQty: v[2]! }),
    promptTemplates: ["{baseQty} items cost £{baseCost}. What do {newQty} items cost?"],
    explain: (v, r) => [`One item costs ${v[0]}, so ${v[2]} cost ${r}.`],
    hints: () => ["Find the unit rate, then multiply."],
    distractorSpread: 12,
    fr: {
      promptTemplates: ["{baseQty} articles coûtent £{baseCost}. Combien coûtent {newQty} articles ?"],
      hints: () => ["Trouve le prix unitaire, puis multiplie."]
    },
    declaredVariationSpace: 29 * 11 * 11
  }),
  categoricalPoolTemplate({
    key: "y10l2.tfProportionType", levelKey: "Y10L2", objectiveCode: "Y10-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const k = rng.int(2, 15);
      const x = rng.int(2, 20);
      const isDirect = rng.chance(0.5);
      const y = isDirect ? k * x : k;
      const claimDirect = rng.chance(0.5);
      const claimIsCorrect = claimDirect === isDirect;
      return {
        prompt: `When x = ${x}, y = ${y}, and when x = ${x * 2}, y = ${isDirect ? y * 2 : y / 2}. This shows ${claimDirect ? "direct" : "inverse"} proportion. True or false?`,
        correctLabel: claimIsCorrect ? "True" : "False",
        distractorLabels: [claimIsCorrect ? "False" : "True"],
        explanationSteps: [isDirect ? "Doubling x doubles y, which is direct proportion." : "Doubling x halves y, which is inverse proportion."],
        hints: ["In direct proportion both grow together; in inverse proportion one grows as the other shrinks."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^When x = (\d+), y = ([\d.]+), and when x = (\d+), y = ([\d.]+)\. This shows (direct|inverse) proportion\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        const kindFr = m[5] === "direct" ? "directe" : "inverse";
        return {
          prompt: `Quand x = ${m[1]}, y = ${m[2]}, et quand x = ${m[3]}, y = ${m[4]}. Cela montre une proportionnalité ${kindFr}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["En proportionnalité directe, les deux augmentent ensemble ; en inverse, l'un augmente quand l'autre diminue."]
        };
      }
    },
    declaredVariationSpace: 2000
  }),

  // --- Y10-L2-2: growth and decay, including compound interest ---
  arithmeticTemplate({
    key: "y10l2.simplePercentageIncrease", levelKey: "Y10L2", objectiveCode: "Y10-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["GROWTH_DECAY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 40]], compute: (v) => v[1]! * (100 + v[0]!),
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["An amount of £{base} increases by {a}%. What is the new amount, in pounds?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]! * 100} = ${v[0]! * v[1]!}.`, `${v[1]! * 100} + ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Find the percentage, then add it on — or multiply by the decimal multiplier."],
    fr: {
      promptTemplates: ["Un montant de £{base} augmente de {a} %. Quel est le nouveau montant, en livres ?"],
      explain: (v, r) => [`${v[0]} % de ${v[1]! * 100} = ${v[0]! * v[1]!}.`, `${v[1]! * 100} + ${v[0]! * v[1]!} = ${r}.`],
      hints: () => ["Calcule le pourcentage puis ajoute-le — ou multiplie par le coefficient multiplicateur."]
    },
    declaredVariationSpace: 50 * 40
  }),
  arithmeticTemplate({
    key: "y10l2.compoundInterestTwoYears", levelKey: "Y10L2", objectiveCode: "Y10-L2-2", difficulty: "REASONING",
    misconceptionTags: ["GROWTH_DECAY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [1, 40]], compute: (v) => (v[1]! * (100 + v[0]!) * (100 + v[0]!)) / 100,
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["£{base} is invested at {a}% compound interest per year. What is it worth after 2 years, in pounds?"],
    explain: (v, r) => [`Multiplier = 1.${String(v[0]).padStart(2, "0")}.`, `${v[1]! * 100} x (1 + ${v[0]}/100)² = ${r}.`],
    hints: () => ["Compound interest applies the multiplier once per year — so square it for two years."],
    fr: {
      promptTemplates: ["£{base} sont placés à {a} % d'intérêts composés par an. Quelle est la valeur après 2 ans, en livres ?"],
      explain: (v, r) => [`Coefficient = 1,${String(v[0]).padStart(2, "0")}.`, `${v[1]! * 100} x (1 + ${v[0]}/100)² = ${r}.`],
      hints: () => ["Les intérêts composés appliquent le coefficient une fois par an — élève-le donc au carré pour deux ans."]
    },
    declaredVariationSpace: 20 * 40
  }),
  arithmeticTemplate({
    key: "y10l2.decayOneYear", levelKey: "Y10L2", objectiveCode: "Y10-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 40]], compute: (v) => v[1]! * (100 - v[0]!),
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["A car worth £{base} loses {a}% of its value in a year. What is it worth after one year, in pounds?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]! * 100} = ${v[0]! * v[1]!}.`, `${v[1]! * 100} - ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Depreciation subtracts the percentage — or multiply by (100 - rate)%."],
    fr: {
      promptTemplates: ["Une voiture valant £{base} perd {a} % de sa valeur en un an. Que vaut-elle après un an, en livres ?"],
      explain: (v, r) => [`${v[0]} % de ${v[1]! * 100} = ${v[0]! * v[1]!}.`, `${v[1]! * 100} - ${v[0]! * v[1]!} = ${r}.`],
      hints: () => ["La dépréciation soustrait le pourcentage — ou multiplie par (100 - taux) %."]
    },
    declaredVariationSpace: 50 * 40
  }),
  arithmeticTemplate({
    key: "y10l2.percentageChangeFromValues", levelKey: "Y10L2", objectiveCode: "Y10-L2-2", difficulty: "REASONING",
    misconceptionTags: ["GROWTH_DECAY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 60], [1, 40]], compute: (v) => v[0]!,
    derive: (v) => ({ base: v[1]! * 100, newVal: v[1]! * (100 + v[0]!) }),
    promptTemplates: ["A value rises from {base} to {newVal}. What is the percentage increase?"],
    explain: (v, r) => [`Increase = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} ÷ ${v[1]! * 100} x 100 = ${r}%.`],
    hints: () => ["Percentage change = (change ÷ original) x 100."],
    fr: {
      promptTemplates: ["Une valeur passe de {base} à {newVal}. Quelle est l'augmentation en pourcentage ?"],
      explain: (v, r) => [`Augmentation = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} ÷ ${v[1]! * 100} x 100 = ${r} %.`],
      hints: () => ["Variation en pourcentage = (variation ÷ valeur initiale) x 100."]
    },
    declaredVariationSpace: 60 * 40
  }),
  arithmeticTemplate({
    key: "y10l2.mcCompoundInterest", levelKey: "Y10L2", objectiveCode: "Y10-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20], [1, 30]], compute: (v) => (v[1]! * (100 + v[0]!) * (100 + v[0]!)) / 100,
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["£{base} grows at {a}% compound interest per year. What is it worth after 2 years?"],
    explain: (v, r) => [`After two years the value is ${r}.`],
    hints: () => ["Apply the multiplier twice, not the simple interest twice."],
    distractorSpread: 60,
    fr: {
      promptTemplates: ["£{base} augmentent de {a} % d'intérêts composés par an. Quelle est la valeur après 2 ans ?"],
      hints: () => ["Applique le coefficient deux fois, pas les intérêts simples deux fois."]
    },
    declaredVariationSpace: 20 * 30
  }),

  // --- Y10-L2-3: compound units (speed, density, pressure) ---
  arithmeticTemplate({
    key: "y10l2.speedFromDistanceTime", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "NUMBER_ENTRY", contextPool: JOURNEYS,
    ranges: [[2, 40], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ distance: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: [
      "{Ctx} travels {distance} km in {time} hours. What is the average speed, in km/h?",
      "A journey of {distance} km takes {time} hours. What is the average speed, in km/h?"
    ],
    explain: (v, r) => [`Speed = distance ÷ time.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Speed = distance ÷ time."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: [
        "{Ctx} parcourt {distance} km en {time} heures. Quelle est la vitesse moyenne, en km/h ?",
        "Un trajet de {distance} km prend {time} heures. Quelle est la vitesse moyenne, en km/h ?"
      ],
      explain: (v, r) => [`Vitesse = distance ÷ temps.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Vitesse = distance ÷ temps."]
    },
    declaredVariationSpace: 39 * 11 * (1 + JOURNEYS.length)
  }),
  arithmeticTemplate({
    key: "y10l2.distanceFromSpeedTime", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "NUMBER_ENTRY", contextPool: JOURNEYS,
    ranges: [[5, 90], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "{Ctx} travels at {a} km/h for {b} hours. How far does it go, in km?",
      "Travelling at {a} km/h for {b} hours covers how many km?"
    ],
    explain: (v, r) => [`Distance = speed x time.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Distance = speed x time."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: [
        "{Ctx} roule à {a} km/h pendant {b} heures. Quelle distance parcourt-il, en km ?",
        "Rouler à {a} km/h pendant {b} heures couvre combien de km ?"
      ],
      explain: (v, r) => [`Distance = vitesse x temps.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Distance = vitesse x temps."]
    },
    declaredVariationSpace: 86 * 11 * (1 + JOURNEYS.length)
  }),
  arithmeticTemplate({
    key: "y10l2.densityFromMassVolume", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "NUMBER_ENTRY", contextPool: MATERIALS,
    ranges: [[2, 30], [2, 15]], compute: (v) => v[0]!,
    derive: (v) => ({ mass: v[0]! * v[1]!, volume: v[1]! }),
    promptTemplates: ["A block of {ctx} has a mass of {mass} g and a volume of {volume} cm³. What is its density, in g/cm³?"],
    explain: (v, r) => [`Density = mass ÷ volume.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Density = mass ÷ volume."],
    fr: {
      contextPool: MATERIALS_FR,
      promptTemplates: ["Un bloc {de:ctx} a une masse de {mass} g et un volume de {volume} cm³. Quelle est sa masse volumique, en g/cm³ ?"],
      explain: (v, r) => [`Masse volumique = masse ÷ volume.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Masse volumique = masse ÷ volume."]
    },
    declaredVariationSpace: 29 * 14 * MATERIALS.length
  }),
  arithmeticTemplate({
    key: "y10l2.massFromDensityVolume", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "NUMBER_ENTRY", contextPool: MATERIALS,
    ranges: [[2, 20], [2, 25]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A piece of {ctx} has a density of {a} g/cm³ and a volume of {b} cm³. What is its mass, in grams?"],
    explain: (v, r) => [`Mass = density x volume.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Rearrange density = mass ÷ volume to get mass = density x volume."],
    fr: {
      contextPool: MATERIALS_FR,
      promptTemplates: ["Un morceau {de:ctx} a une masse volumique de {a} g/cm³ et un volume de {b} cm³. Quelle est sa masse, en grammes ?"],
      explain: (v, r) => [`Masse = masse volumique x volume.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Transforme masse volumique = masse ÷ volume en masse = masse volumique x volume."]
    },
    declaredVariationSpace: 19 * 24 * MATERIALS.length
  }),
  arithmeticTemplate({
    key: "y10l2.convertKmhToMs", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "REASONING",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "NUMBER_ENTRY", contextPool: JOURNEYS,
    ranges: [[1, 250]], compute: (v) => v[0]!,
    derive: (v) => ({ kmh: v[0]! * 36 / 10 }),
    constraint: (v) => (v[0]! * 36) % 10 === 0,
    promptTemplates: ["{Ctx} travels at {kmh} km/h. What is that speed in metres per second?"],
    explain: (v, r) => [`Divide by 3.6 to convert km/h to m/s.`, `${(v[0]! * 36) / 10} ÷ 3.6 = ${r}.`],
    hints: () => ["1 m/s is 3.6 km/h, so divide by 3.6."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: ["{Ctx} roule à {kmh} km/h. Quelle est cette vitesse en mètres par seconde ?"],
      explain: (v, r) => [`Divise par 3,6 pour convertir des km/h en m/s.`, `${(v[0]! * 36) / 10} ÷ 3,6 = ${r}.`],
      hints: () => ["1 m/s vaut 3,6 km/h, divise donc par 3,6."]
    },
    declaredVariationSpace: 50 * JOURNEYS.length
  }),
  arithmeticTemplate({
    key: "y10l2.mcSpeed", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 40], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ distance: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: ["A journey of {distance} km takes {time} hours. What is the average speed, in km/h?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide distance by time."],
    distractorSpread: 8,
    fr: {
      promptTemplates: ["Un trajet de {distance} km prend {time} heures. Quelle est la vitesse moyenne, en km/h ?"],
      hints: () => ["Divise la distance par le temps."]
    },
    declaredVariationSpace: 39 * 11
  }),
  arithmeticTemplate({
    key: "y10l2.pressureFromForceArea", levelKey: "Y10L2", objectiveCode: "Y10-L2-3", difficulty: "REASONING",
    misconceptionTags: ["COMPOUND_UNIT_ERROR"], type: "NUMBER_ENTRY", pathway: "HIGHER",
    ranges: [[2, 40], [2, 15]], compute: (v) => v[0]!,
    derive: (v) => ({ force: v[0]! * v[1]!, area: v[1]! }),
    promptTemplates: ["A force of {force} N acts on an area of {area} m². What is the pressure, in N/m²?"],
    explain: (v, r) => [`Pressure = force ÷ area.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Pressure = force ÷ area."],
    fr: {
      promptTemplates: ["Une force de {force} N s'exerce sur une aire de {area} m². Quelle est la pression, en N/m² ?"],
      explain: (v, r) => [`Pression = force ÷ aire.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Pression = force ÷ aire."]
    },
    declaredVariationSpace: 39 * 14
  })
];

export default level;
