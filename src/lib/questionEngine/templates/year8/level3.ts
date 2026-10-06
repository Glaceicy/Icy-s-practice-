import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 3 — "Ratio, rates and direct proportion"
const GOODS = ["pens", "apples", "tiles", "batteries", "notebooks", "bulbs", "stickers", "bricks"];
const GOODS_FR = ["stylos", "pommes", "carreaux", "piles", "cahiers", "ampoules", "autocollants", "briques"];
const JOURNEYS = ["a train", "a cyclist", "a delivery van", "a coach", "a ferry", "a runner"];
const JOURNEYS_FR = ["un train", "un cycliste", "une camionnette de livraison", "un car", "un ferry", "un coureur"];
const MATERIALS = ["an iron bar", "an oak block", "a lead weight", "a copper pipe", "a concrete slab", "an aluminium sheet"];
const MATERIALS_FR = ["une barre de fer", "un bloc de chêne", "un poids en plomb", "un tuyau de cuivre", "une dalle de béton", "une plaque d'aluminium"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L3-1: direct proportion ---
  arithmeticTemplate({
    key: "y8l3.unitPrice", levelKey: "Y8L3", objectiveCode: "Y8-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY", contextPool: GOODS,
    ranges: [[2, 20], [2, 60]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "{a} identical items cost {total} pence in total. How much does one cost, in pence?",
      "A pack of {a} {ctx} costs {total} pence. What is the cost of a single one, in pence?"
    ],
    explain: (v, r) => [`Divide the total by how many there are.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r} pence.`],
    hints: () => ["Finding the cost of one is the key step in nearly every proportion question."],
    fr: {
      contextPool: GOODS_FR,
      promptTemplates: [
        "{a} articles identiques coûtent {total} pence au total. Combien coûte l'un d'eux, en pence ?",
        "Un lot de {a} {ctx} coûte {total} pence. Quel est le prix d'un seul, en pence ?"
      ],
      explain: (v, r) => [`Divise le total par le nombre d'articles.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r} pence.`],
      hints: () => ["Trouver le prix d'un seul est l'étape clé de presque toute question de proportionnalité."]
    },
    declaredVariationSpace: 19 * 59 * (1 + GOODS.length)
  }),
  arithmeticTemplate({
    key: "y8l3.scaleUpFromUnit", levelKey: "Y8L3", objectiveCode: "Y8-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "MULTI_STEP", contextPool: GOODS,
    ranges: [[2, 15], [2, 40], [2, 25]],
    // Asking for the cost of the same quantity you were just given is not a
    // question, so keep the two quantities apart.
    constraint: (v) => v[0]! !== v[2]!,
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "{a} items cost {total} pence. How much do {c} items cost, in pence?",
      "If {a} {ctx} cost {total} pence, what is the cost of {c} of them, in pence?"
    ],
    explain: (v, r) => [`One item costs ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]} pence.`, `${v[2]} x ${v[1]} = ${r} pence.`],
    hints: () => ["Find the cost of one first, then multiply up to the number you need."],
    fr: {
      contextPool: GOODS_FR,
      promptTemplates: [
        "{a} articles coûtent {total} pence. Combien coûtent {c} articles, en pence ?",
        "Si {a} {ctx} coûtent {total} pence, quel est le prix de {c} d'entre eux, en pence ?"
      ],
      explain: (v, r) => [`Un article coûte ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]} pence.`, `${v[2]} x ${v[1]} = ${r} pence.`],
      hints: () => ["Trouve d'abord le prix d'un seul, puis multiplie par le nombre voulu."]
    },
    declaredVariationSpace: 14 * 39 * 24 - 14 * 39
  }),
  arithmeticTemplate({
    key: "y8l3.proportionGraphValue", levelKey: "Y8L3", objectiveCode: "Y8-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 30]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A direct proportion graph passes through the origin and has the rule y = {a}x. What is y when x = {b}?",
      "On a graph of direct proportion, y = {a}x. Read off y when x = {b}.",
      "A straight line through (0, 0) rises {a} units for every 1 unit across. What is y when x = {b}?"
    ],
    explain: (v, r) => [`Direct proportion means y = kx with k = ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["A direct proportion graph is a straight line through the origin, so just multiply by the gradient."],
    fr: {
      promptTemplates: [
        "Un graphique de proportionnalité directe passe par l'origine et a pour règle y = {a}x. Que vaut y quand x = {b} ?",
        "Sur un graphique de proportionnalité directe, y = {a}x. Lis y quand x = {b}.",
        "Une droite passant par (0, 0) monte de {a} unités pour 1 unité horizontale. Que vaut y quand x = {b} ?"
      ],
      explain: (v, r) => [`La proportionnalité directe signifie y = kx avec k = ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Un graphique de proportionnalité directe est une droite passant par l'origine : il suffit de multiplier par le coefficient."]
    },
    declaredVariationSpace: 19 * 29 * 3
  }),
  arithmeticTemplate({
    key: "y8l3.recipeScaling", levelKey: "Y8L3", objectiveCode: "Y8-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [5, 60], [2, 15]], compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ amount: v[0]! * v[1]!, people: v[0]!, newPeople: v[0]! * v[2]! }),
    promptTemplates: [
      "A recipe for {people} people uses {amount} g of flour. How much flour is needed for {newPeople} people, in grams?",
      "{amount} ml of paint covers {people} tiles. How much paint covers {newPeople} tiles, in ml?"
    ],
    explain: (v, r) => [
      `One portion needs ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`,
      `${v[0]! * v[2]!} portions need ${v[0]! * v[2]!} x ${v[1]} = ${r}.`
    ],
    hints: () => ["Scale down to one first, then scale up to the number you want."],
    fr: {
      promptTemplates: [
        "Une recette pour {people} personnes utilise {amount} g de farine. Combien faut-il de farine pour {newPeople} personnes, en grammes ?",
        "{amount} ml de peinture couvrent {people} carreaux. Combien de peinture faut-il pour {newPeople} carreaux, en ml ?"
      ],
      explain: (v, r) => [
        `Une portion demande ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`,
        `${v[0]! * v[2]!} portions demandent ${v[0]! * v[2]!} x ${v[1]} = ${r}.`
      ],
      hints: () => ["Ramène d'abord à une seule portion, puis multiplie par le nombre voulu."]
    },
    declaredVariationSpace: 11 * 56 * 14
  }),
  arithmeticTemplate({
    key: "y8l3.exchangeRate", levelKey: "Y8L3", objectiveCode: "Y8-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [5, 90]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "£1 is worth {a} units of another currency. How many units do you get for £{b}?",
      "An exchange rate gives {a} units per pound. How many units does £{b} buy?",
      "A conversion rate is 1 pound to {a} units. Convert £{b} into those units."
    ],
    explain: (v, r) => [`Multiply the number of pounds by the rate.`, `${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Multiplying converts from pounds; dividing converts back."],
    fr: {
      promptTemplates: [
        "1 £ vaut {a} unités d'une autre monnaie. Combien d'unités obtiens-tu pour {b} £ ?",
        "Un taux de change donne {a} unités par livre. Combien d'unités achète-t-on avec {b} £ ?",
        "Un taux de conversion est de 1 livre pour {a} unités. Convertis {b} £ dans cette monnaie."
      ],
      explain: (v, r) => [`Multiplie le nombre de livres par le taux.`, `${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Multiplier convertit depuis les livres ; diviser convertit en sens inverse."]
    },
    declaredVariationSpace: 8 * 86 * 3
  }),

  // --- Y8-L3-2: compound units (speed, unit pricing, density) ---
  arithmeticTemplate({
    key: "y8l3.speedFromDistanceTime", levelKey: "Y8L3", objectiveCode: "Y8-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "MULTI_STEP", contextPool: JOURNEYS,
    ranges: [[5, 90], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ dist: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: [
      "A journey of {dist} km takes {time} hours. What is the average speed, in km/h?",
      "{Ctx} travels {dist} km in {time} hours. Find the average speed, in km/h."
    ],
    explain: (v, r) => [`Speed = distance ÷ time.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r} km/h.`],
    hints: () => ["The unit km/h tells you the calculation: kilometres divided by hours."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: [
        "Un trajet de {dist} km dure {time} heures. Quelle est la vitesse moyenne, en km/h ?",
        "{Ctx} parcourt {dist} km en {time} heures. Trouve la vitesse moyenne, en km/h."
      ],
      explain: (v, r) => [`Vitesse = distance ÷ temps.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r} km/h.`],
      hints: () => ["L'unité km/h indique le calcul : des kilomètres divisés par des heures."]
    },
    declaredVariationSpace: 86 * 11 * (1 + JOURNEYS.length)
  }),
  arithmeticTemplate({
    key: "y8l3.distanceFromSpeedTime", levelKey: "Y8L3", objectiveCode: "Y8-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "NUMBER_ENTRY", contextPool: JOURNEYS,
    ranges: [[5, 90], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A vehicle travels at {a} km/h for {b} hours. How far does it go, in km?",
      "{Ctx} keeps a steady {a} km/h for {b} hours. What distance is covered, in km?"
    ],
    explain: (v, r) => [`Distance = speed x time.`, `${v[0]} x ${v[1]} = ${r} km.`],
    hints: () => ["Rearranging speed = distance ÷ time gives distance = speed x time."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: [
        "Un véhicule roule à {a} km/h pendant {b} heures. Quelle distance parcourt-il, en km ?",
        "{Ctx} maintient {a} km/h pendant {b} heures. Quelle distance est parcourue, en km ?"
      ],
      explain: (v, r) => [`Distance = vitesse x temps.`, `${v[0]} x ${v[1]} = ${r} km.`],
      hints: () => ["En réarrangeant vitesse = distance ÷ temps, on obtient distance = vitesse x temps."]
    },
    declaredVariationSpace: 86 * 11 * (1 + JOURNEYS.length)
  }),
  arithmeticTemplate({
    key: "y8l3.timeFromDistanceSpeed", levelKey: "Y8L3", objectiveCode: "Y8-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "MULTI_STEP",
    ranges: [[5, 90], [2, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ dist: v[0]! * v[1]!, speed: v[0]! }),
    promptTemplates: [
      "A journey of {dist} km is made at {speed} km/h. How many hours does it take?",
      "Travelling {dist} miles at {speed} miles per hour, how long does the trip take, in hours?",
      "How many hours does it take to cover {dist} km at a steady {speed} km/h?"
    ],
    explain: (v, r) => [`Time = distance ÷ speed.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r} hours.`],
    hints: () => ["Time = distance ÷ speed — divide by the speed, not the other way round."],
    fr: {
      promptTemplates: [
        "Un trajet de {dist} km se fait à {speed} km/h. Combien d'heures dure-t-il ?",
        "En parcourant {dist} miles à {speed} miles par heure, combien de temps dure le trajet, en heures ?",
        "Combien d'heures faut-il pour parcourir {dist} km à {speed} km/h constants ?"
      ],
      explain: (v, r) => [`Temps = distance ÷ vitesse.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r} heures.`],
      hints: () => ["Temps = distance ÷ vitesse — divise par la vitesse, pas l'inverse."]
    },
    declaredVariationSpace: 86 * 11 * 3
  }),
  arithmeticTemplate({
    key: "y8l3.densityFromMassVolume", levelKey: "Y8L3", objectiveCode: "Y8-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "MULTI_STEP", contextPool: MATERIALS,
    ranges: [[2, 25], [2, 40]], compute: (v) => v[0]!,
    derive: (v) => ({ mass: v[0]! * v[1]!, vol: v[1]! }),
    promptTemplates: [
      "An object of mass {mass} g has a volume of {vol} cm³. What is its density, in g/cm³?",
      "{Ctx} has a mass of {mass} g and a volume of {vol} cm³. Find its density, in g/cm³."
    ],
    explain: (v, r) => [`Density = mass ÷ volume.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r} g/cm³.`],
    hints: () => ["The unit g/cm³ is grams per cubic centimetre, so divide mass by volume."],
    fr: {
      contextPool: MATERIALS_FR,
      promptTemplates: [
        "Un objet de masse {mass} g a un volume de {vol} cm³. Quelle est sa masse volumique, en g/cm³ ?",
        "{Ctx} a une masse de {mass} g et un volume de {vol} cm³. Trouve sa masse volumique, en g/cm³."
      ],
      explain: (v, r) => [`Masse volumique = masse ÷ volume.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r} g/cm³.`],
      hints: () => ["L'unité g/cm³ signifie grammes par centimètre cube : divise la masse par le volume."]
    },
    declaredVariationSpace: 24 * 39 * (1 + MATERIALS.length)
  }),
  arithmeticTemplate({
    key: "y8l3.massFromDensityVolume", levelKey: "Y8L3", objectiveCode: "Y8-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "NUMBER_ENTRY", contextPool: MATERIALS,
    ranges: [[2, 25], [2, 40]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A material has density {a} g/cm³. What is the mass of {b} cm³ of it, in grams?",
      "{Ctx} has a density of {a} g/cm³ and a volume of {b} cm³. What is its mass, in grams?"
    ],
    explain: (v, r) => [`Mass = density x volume.`, `${v[0]} x ${v[1]} = ${r} g.`],
    hints: () => ["Rearranging density = mass ÷ volume gives mass = density x volume."],
    fr: {
      contextPool: MATERIALS_FR,
      promptTemplates: [
        "Un matériau a une masse volumique de {a} g/cm³. Quelle est la masse de {b} cm³ de ce matériau, en grammes ?",
        "{Ctx} a une masse volumique de {a} g/cm³ et un volume de {b} cm³. Quelle est sa masse, en grammes ?"
      ],
      explain: (v, r) => [`Masse = masse volumique x volume.`, `${v[0]} x ${v[1]} = ${r} g.`],
      hints: () => ["En réarrangeant masse volumique = masse ÷ volume, on obtient masse = masse volumique x volume."]
    },
    declaredVariationSpace: 24 * 39 * (1 + MATERIALS.length)
  }),
  categoricalPoolTemplate({
    key: "y8l3.mcCompoundUnit", levelKey: "Y8L3", objectiveCode: "Y8-L3-2", difficulty: "REASONING",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { unit: ["km/h", "g/cm³", "pence per item", "litres per 100 km"] },
    build: (picked, rng) => {
      const a = rng.int(2, 60);
      const b = rng.int(2, 40);
      const meanings: Record<string, string> = {
        "km/h": "distance divided by time",
        "g/cm³": "mass divided by volume",
        "pence per item": "total cost divided by the number of items",
        "litres per 100 km": "fuel used divided by distance travelled"
      };
      const unit = picked.unit!;
      return {
        prompt: `A measurement of ${a} ${unit} was worked out from two quantities, one of which was ${b}. What calculation does ${unit} represent?`,
        correctLabel: meanings[unit]!,
        distractorLabels: Object.values(meanings).filter((m) => m !== meanings[unit]).slice(0, 3),
        explanationSteps: [`Read the unit as "per": ${unit} means ${meanings[unit]}.`],
        hints: ["Read the slash or the word 'per' as 'divided by' and the unit tells you the calculation."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const meaningsFr: Record<string, string> = {
          "distance divided by time": "la distance divisée par le temps",
          "mass divided by volume": "la masse divisée par le volume",
          "total cost divided by the number of items": "le coût total divisé par le nombre d'articles",
          "fuel used divided by distance travelled": "le carburant consommé divisé par la distance parcourue"
        };
        const m = drawn.prompt.match(/^A measurement of (\d+) .+ was worked out from two quantities, one of which was (\d+)\./);
        if (!m) return {};
        return {
          prompt: `Une mesure de ${m[1]} ${picked.unit} a été calculée à partir de deux grandeurs, dont l'une valait ${m[2]}. Quel calcul représente ${picked.unit} ?`,
          correctLabel: meaningsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => meaningsFr[d] ?? d),
          hints: ["Lis la barre oblique ou le mot « par » comme « divisé par » : l'unité indique le calcul."]
        };
      }
    },
    declaredVariationSpace: 4 * 59 * 39
  }),

  // --- Y8-L3-3: comparing lengths, areas and volumes with ratio ---
  arithmeticTemplate({
    key: "y8l3.areaRatioFromLengthRatio", levelKey: "Y8L3", objectiveCode: "Y8-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_SCALE_FACTOR_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 20], [2, 30]], compute: (v) => v[0]! * v[0]!,
    promptTemplates: [
      "Two similar shapes have lengths in the ratio 1 : {a}. Their areas are in the ratio 1 : k. What is k?",
      "A shape is enlarged by scale factor {a}. How many times bigger is its area?",
      "A square of side {b} cm is enlarged by scale factor {a}. By what factor does its area grow?"
    ],
    explain: (v, r) => [`Areas scale by the square of the length scale factor.`, `${v[0]}² = ${r}.`],
    hints: () => ["Area is two-dimensional, so the scale factor is used twice."],
    fr: {
      promptTemplates: [
        "Deux figures semblables ont des longueurs dans le rapport 1 : {a}. Leurs aires sont dans le rapport 1 : k. Que vaut k ?",
        "Une figure est agrandie d'un facteur {a}. Combien de fois son aire devient-elle plus grande ?",
        "Un carré de côté {b} cm est agrandi d'un facteur {a}. Par quel facteur son aire augmente-t-elle ?"
      ],
      explain: (v, r) => [`Les aires sont multipliées par le carré du facteur d'échelle des longueurs.`, `${v[0]}² = ${r}.`],
      hints: () => ["L'aire est en deux dimensions, donc le facteur d'échelle s'applique deux fois."]
    },
    declaredVariationSpace: 19 * 29 * 3
  }),
  arithmeticTemplate({
    key: "y8l3.volumeRatioFromLengthRatio", levelKey: "Y8L3", objectiveCode: "Y8-L3-3", difficulty: "REASONING",
    misconceptionTags: ["VOLUME_SCALE_FACTOR_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 30]], compute: (v) => v[0]! * v[0]! * v[0]!,
    promptTemplates: [
      "Two similar solids have lengths in the ratio 1 : {a}. Their volumes are in the ratio 1 : k. What is k?",
      "A cube of side {b} cm is enlarged by scale factor {a}. By what factor does its volume grow?",
      "A solid is scaled up by a factor of {a}. How many times bigger is its volume?"
    ],
    explain: (v, r) => [`Volumes scale by the cube of the length scale factor.`, `${v[0]}³ = ${r}.`],
    hints: () => ["Volume is three-dimensional, so the scale factor is used three times."],
    fr: {
      promptTemplates: [
        "Deux solides semblables ont des longueurs dans le rapport 1 : {a}. Leurs volumes sont dans le rapport 1 : k. Que vaut k ?",
        "Un cube de côté {b} cm est agrandi d'un facteur {a}. Par quel facteur son volume augmente-t-il ?",
        "Un solide est agrandi d'un facteur {a}. Combien de fois son volume devient-il plus grand ?"
      ],
      explain: (v, r) => [`Les volumes sont multipliés par le cube du facteur d'échelle des longueurs.`, `${v[0]}³ = ${r}.`],
      hints: () => ["Le volume est en trois dimensions, donc le facteur d'échelle s'applique trois fois."]
    },
    declaredVariationSpace: 11 * 29 * 3
  }),
  arithmeticTemplate({
    key: "y8l3.simplifyRatioFirstPart", levelKey: "Y8L3", objectiveCode: "Y8-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SIMPLIFY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [2, 15], [2, 20]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ p: v[0]! * v[2]!, q: v[1]! * v[2]! }),
    promptTemplates: [
      "Write the ratio {p} : {q} in its simplest form. What is the first number?",
      "Simplify the ratio of a {p} cm length to a {q} cm length. Give the first number of the simplified ratio."
    ],
    explain: (v, r) => [`Both parts divide by ${v[2]}.`, `${v[0]! * v[2]!} ÷ ${v[2]} = ${r}, so the ratio is ${v[0]} : ${v[1]}.`],
    hints: () => ["Divide both parts of the ratio by their highest common factor."],
    fr: {
      promptTemplates: [
        "Écris le rapport {p} : {q} sous sa forme la plus simple. Quel est le premier nombre ?",
        "Simplifie le rapport d'une longueur de {p} cm à une longueur de {q} cm. Donne le premier nombre du rapport simplifié."
      ],
      explain: (v, r) => [`Les deux parts se divisent par ${v[2]}.`, `${v[0]! * v[2]!} ÷ ${v[2]} = ${r}, donc le rapport est ${v[0]} : ${v[1]}.`],
      hints: () => ["Divise les deux parts du rapport par leur plus grand facteur commun."]
    },
    declaredVariationSpace: 14 * 14 * 19
  }),
  arithmeticTemplate({
    key: "y8l3.shareInRatio", levelKey: "Y8L3", objectiveCode: "Y8-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["RATIO_SHARE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 9], [1, 9], [2, 40]], compute: (v) => v[2]! * v[0]!,
    derive: (v) => ({ total: v[2]! * (v[0]! + v[1]!) }),
    promptTemplates: [
      "{total} is shared in the ratio {a} : {b}. What is the first share?",
      "A {total} cm length is cut in the ratio {a} : {b}. How long is the first piece, in cm?"
    ],
    explain: (v, r) => [
      `There are ${v[0]! + v[1]!} parts, so one part is ${v[2]! * (v[0]! + v[1]!)} ÷ ${v[0]! + v[1]!} = ${v[2]}.`,
      `The first share is ${v[0]} x ${v[2]} = ${r}.`
    ],
    hints: () => ["Add the ratio numbers, divide to find one part, then multiply."],
    fr: {
      promptTemplates: [
        "{total} est partagé dans le rapport {a} : {b}. Quelle est la première part ?",
        "Une longueur de {total} cm est coupée dans le rapport {a} : {b}. Quelle est la longueur du premier morceau, en cm ?"
      ],
      explain: (v, r) => [
        `Il y a ${v[0]! + v[1]!} parts, donc une part vaut ${v[2]! * (v[0]! + v[1]!)} ÷ ${v[0]! + v[1]!} = ${v[2]}.`,
        `La première part est ${v[0]} x ${v[2]} = ${r}.`
      ],
      hints: () => ["Additionne les nombres du rapport, divise pour trouver une part, puis multiplie."]
    },
    declaredVariationSpace: 9 * 9 * 39 * 2
  }),
  categoricalPoolTemplate({
    key: "y8l3.tfProportionStatement", levelKey: "Y8L3", objectiveCode: "Y8-L3-3", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const valid = rng.chance(0.5);
      const k = rng.int(2, 9);
      const n = rng.int(2, 30);
      const validClaims = [
        `doubling the side of a square multiplies its area by 4`,
        `a scale factor of ${k} multiplies every area by ${k * k}`,
        `a scale factor of ${k} multiplies every volume by ${k * k * k}`,
        `if ${n} items cost a certain amount, ${2 * n} identical items cost twice as much`,
        `a direct proportion graph always passes through the origin`
      ];
      const invalidClaims = [
        `doubling the side of a square doubles its area`,
        `a scale factor of ${k} multiplies every area by ${k}`,
        `a scale factor of ${k} multiplies every volume by ${k * k}`,
        `if ${n} items cost a certain amount, ${2 * n} identical items cost the same`,
        `a direct proportion graph can cross the y-axis above the origin`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Lengths scale by k, areas by k² and volumes by k³, and direct proportion always starts at (0, 0)."
          : "Areas scale by the square and volumes by the cube of the scale factor, and direct proportion must pass through the origin."],
        hints: ["Lengths k, areas k², volumes k³ — and direct proportion always starts at zero."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^Doubling the side of a square multiplies its area by 4$/, "Doubler le côté d'un carré multiplie son aire par 4")
          .replace(/^Doubling the side of a square doubles its area$/, "Doubler le côté d'un carré double son aire")
          .replace(/^A scale factor of (\d+) multiplies every area by (\d+)$/, "Un facteur d'échelle de $1 multiplie chaque aire par $2")
          .replace(/^A scale factor of (\d+) multiplies every volume by (\d+)$/, "Un facteur d'échelle de $1 multiplie chaque volume par $2")
          .replace(/^If (\d+) items cost a certain amount, (\d+) identical items cost twice as much$/, "Si $1 articles coûtent un certain montant, $2 articles identiques coûtent le double")
          .replace(/^If (\d+) items cost a certain amount, (\d+) identical items cost the same$/, "Si $1 articles coûtent un certain montant, $2 articles identiques coûtent la même chose")
          .replace(/^A direct proportion graph always passes through the origin$/, "Un graphique de proportionnalité directe passe toujours par l'origine")
          .replace(/^A direct proportion graph can cross the y-axis above the origin$/, "Un graphique de proportionnalité directe peut couper l'axe des ordonnées au-dessus de l'origine");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Les longueurs sont multipliées par k, les aires par k² et les volumes par k³, et la proportionnalité directe part toujours de (0, 0)."
            : "Les aires sont multipliées par le carré et les volumes par le cube du facteur d'échelle, et la proportionnalité directe doit passer par l'origine."],
          hints: ["Longueurs k, aires k², volumes k³ — et la proportionnalité directe part toujours de zéro."]
        };
      }
    },
    declaredVariationSpace: 2 * 5 * 8 * 29
  })
];

export default level;
