import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 9 — "Statistics, averages and data interpretation"
// This level has two objectives rather than three, so the bank is split
// roughly evenly between chart interpretation and averages.
const SURVEYS = ["favourite sports", "lunch choices", "bus journeys", "book genres", "pets owned", "club memberships", "after-school clubs", "holiday destinations"];
const SURVEYS_FR = ["sports préférés", "choix de déjeuner", "trajets en bus", "genres de livres", "animaux de compagnie", "adhésions aux clubs", "clubs du soir", "destinations de vacances"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L9-1: interpret and construct pie charts and line graphs ---
  arithmeticTemplate({
    key: "y6l9.pieChartAngleFromFraction", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SURVEYS,
    ranges: [[1, 29], [1, 12]], constraint: (v) => v[0]! < v[1]! * 30,
    compute: (v) => Math.round((v[0]! / (v[1]! * 30)) * 360),
    derive: (v) => ({ total: v[1]! * 30 }),
    promptTemplates: ["In a survey of {total} people about {ctx}, {a} chose one option. What angle, in degrees, represents that option on a pie chart?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 30} x 360 = ${r}°.`],
    hints: () => ["Divide the category count by the total, then multiply by 360."],
    visualAid: (v) => visuals.graph("pie", [{ label: "chosen", value: v[0]! }, { label: "other", value: v[1]! * 30 - v[0]! }]),
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Dans un sondage auprès de {total} personnes sur les {ctx}, {a} {a#ont|a} choisi une option. Quel angle, en degrés, représente cette option sur un diagramme circulaire ?"],
      explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 30} x 360 = ${r}°.`],
      hints: () => ["Divise l'effectif de la catégorie par le total, puis multiplie par 360."]
    },
    declaredVariationSpace: 29 * 12 * SURVEYS.length
  }),
  arithmeticTemplate({
    key: "y6l9.pieChartCountFromAngle", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "REASONING",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SURVEYS,
    ranges: [[1, 11], [1, 20]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ angle: v[0]! * 30, total: v[1]! * 12 }),
    promptTemplates: ["A pie chart of {ctx} shows {total} people in total. One sector has an angle of {angle}°. How many people does it represent?"],
    explain: (v, r) => [`${v[0]! * 30} ÷ 360 = ${v[0]}/12 of the chart.`, `${v[1]! * 12} x ${v[0]} ÷ 12 = ${r}.`],
    hints: () => ["Work out what fraction of 360° the sector is, then take that fraction of the total."],
    visualAid: (v) => visuals.graph("pie", [{ label: "sector", value: v[0]! * 30 }, { label: "rest", value: 360 - v[0]! * 30 }]),
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Un diagramme circulaire sur les {ctx} montre {total} personnes au total. Un secteur a un angle de {angle}°. Combien de personnes représente-t-il ?"],
      explain: (v, r) => [`${v[0]! * 30} ÷ 360 = ${v[0]}/12 du diagramme.`, `${v[1]! * 12} x ${v[0]} ÷ 12 = ${r}.`],
      hints: () => ["Détermine quelle fraction de 360° représente le secteur, puis applique-la au total."]
    },
    declaredVariationSpace: 11 * 20 * SURVEYS.length
  }),
  arithmeticTemplate({
    key: "y6l9.lineGraphDifference", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SURVEYS,
    ranges: [[1, 60], [1, 60]], constraint: (v) => v[1]! > v[0]!,
    compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["A line graph of {ctx} shows {a} in January and {b} in June. By how much did it increase?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Read both values off the graph, then subtract."],
    visualAid: (v) => visuals.graph("line", [{ label: "Jan", value: v[0]! }, { label: "Jun", value: v[1]! }]),
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Un graphique linéaire sur les {ctx} indique {a} en janvier et {b} en juin. De combien cela a-t-il augmenté ?"],
      explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
      hints: () => ["Relève les deux valeurs sur le graphique, puis soustrais."]
    },
    declaredVariationSpace: 60 * 60 * SURVEYS.length
  }),
  arithmeticTemplate({
    key: "y6l9.totalFromChart", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SURVEYS,
    ranges: [[1, 40], [1, 40], [1, 40]], compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: ["A chart of {ctx} shows three categories with {a}, {b} and {c} people. How many were surveyed in total?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Add all the category values together."],
    visualAid: (v) => visuals.graph("bar", [{ label: "A", value: v[0]! }, { label: "B", value: v[1]! }, { label: "C", value: v[2]! }]),
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Un graphique sur les {ctx} montre trois catégories avec {a}, {b} et {c} personnes. Combien de personnes ont été interrogées en tout ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Additionne toutes les valeurs des catégories."]
    },
    declaredVariationSpace: 40 * 40 * 40 * SURVEYS.length
  }),
  arithmeticTemplate({
    key: "y6l9.percentageOfChartTotal", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "REASONING",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: SURVEYS,
    ranges: [[1, 99], [1, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ count: v[0]! * v[1]!, total: v[1]! * 100 }),
    promptTemplates: ["In a chart of {ctx}, {count} out of {total} people chose one option. What percentage is that?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]! * 100} x 100 = ${r}%.`],
    hints: () => ["Divide the part by the whole, then multiply by 100."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Dans un graphique sur les {ctx}, {count} personnes sur {total} ont choisi une option. Quel pourcentage cela représente-t-il ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]! * 100} x 100 = ${r} %.`],
      hints: () => ["Divise la partie par le tout, puis multiplie par 100."]
    },
    declaredVariationSpace: 99 * 20 * SURVEYS.length
  }),
  categoricalPoolTemplate({
    key: "y6l9.mcChartType", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { purpose: ["show how a total is split into parts", "show how something changes over time", "compare separate categories side by side"] },
    build: (picked, rng) => {
      const charts: Record<string, string> = {
        "show how a total is split into parts": "pie chart",
        "show how something changes over time": "line graph",
        "compare separate categories side by side": "bar chart"
      };
      const correct = charts[picked.purpose!]!;
      const distractors = Object.values(charts).filter((c) => c !== correct);
      const size = rng.int(20, 300);
      return {
        prompt: `A survey of ${size} people needs a chart to ${picked.purpose}. Which chart is most suitable?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`To ${picked.purpose}, a ${correct} is the clearest choice.`],
        hints: ["Pie charts show parts of a whole; line graphs show change over time; bar charts compare categories."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const purposeFr: Record<string, string> = {
          "show how a total is split into parts": "montrer comment un total se répartit en parts",
          "show how something changes over time": "montrer une évolution dans le temps",
          "compare separate categories side by side": "comparer des catégories distinctes côte à côte"
        };
        const chartFr: Record<string, string> = { "pie chart": "diagramme circulaire", "line graph": "graphique linéaire", "bar chart": "diagramme en barres" };
        const m = drawn.prompt.match(/A survey of (\d+) people/);
        return {
          prompt: `Un sondage auprès de ${m ? m[1] : ""} personnes a besoin d'un graphique pour ${purposeFr[picked.purpose!]}. Quel graphique convient le mieux ?`,
          correctLabel: chartFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => chartFr[d] ?? d),
          hints: ["Le diagramme circulaire montre des parts d'un tout ; le graphique linéaire, une évolution ; le diagramme en barres compare des catégories."]
        };
      }
    },
    declaredVariationSpace: 900
  }),
  matchingTemplate({
    key: "y6l9.matchAnglesToFractions", levelKey: "Y6L9", objectiveCode: "Y6-L9-1", difficulty: "REASONING",
    misconceptionTags: ["DATA_INTERPRETATION_ERROR"],
    generatePairs: (rng) => {
      const options: Array<[number, string]> = [[90, "1/4"], [180, "1/2"], [120, "1/3"], [60, "1/6"], [45, "1/8"], [36, "1/10"], [72, "1/5"]];
      return rng.shuffle(options).slice(0, 3).map(([angle, frac]) => ({ left: `${angle}° sector`, right: `${frac} of the chart` }));
    },
    promptTemplates: ["Match each pie chart sector angle to the fraction of the whole it represents."],
    explain: () => ["Divide the sector angle by 360° to get the fraction."],
    hints: () => ["A full circle is 360°."],
    fr: {
      promptTemplates: ["Associe chaque angle de secteur à la fraction du tout qu'il représente."],
      explain: () => ["Divise l'angle du secteur par 360° pour obtenir la fraction."],
      hints: () => ["Un cercle complet fait 360°."],
      translatePairs: (pairs) => pairs.map((p) => ({
        left: p.left.replace(/^(\d+)° sector$/, "secteur de $1°"),
        right: p.right.replace(/^(\S+) of the chart$/, "$1 du diagramme")
      }))
    },
    declaredVariationSpace: 210
  }),

  // --- Y6-L9-2: calculate and interpret the mean ---
  arithmeticTemplate({
    key: "y6l9.meanOfFourValues", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "NUMBER_ENTRY", contextPool: SURVEYS,
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]], constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) % 4 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) / 4,
    promptTemplates: [
      "Find the mean of {a}, {b}, {c} and {d}.",
      "A survey of {ctx} records {a}, {b}, {c} and {d}. What is the mean?"
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
    hints: () => ["Add all the values, then divide by how many there are."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "Trouve la moyenne de {a}, {b}, {c} et {d}.",
        "Un sondage sur les {ctx} relève {a}, {b}, {c} et {d}. Quelle est la moyenne ?"
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
      hints: () => ["Additionne toutes les valeurs, puis divise par leur nombre."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y6l9.meanOfThreeValues", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "NUMBER_ENTRY", contextPool: SURVEYS,
    ranges: [[1, 50], [1, 50], [1, 50]], constraint: (v) => (v[0]! + v[1]! + v[2]!) % 3 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]!) / 3,
    promptTemplates: [
      "Find the mean of {a}, {b} and {c}.",
      "Three readings about {ctx} are {a}, {b} and {c}. What is the mean?"
    ],
    explain: (v, r) => [`${v[0]! + v[1]! + v[2]!} ÷ 3 = ${r}.`],
    hints: () => ["Add the three values, then divide by 3."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "Trouve la moyenne de {a}, {b} et {c}.",
        "Trois relevés sur les {ctx} valent {a}, {b} et {c}. Quelle est la moyenne ?"
      ],
      explain: (v, r) => [`${v[0]! + v[1]! + v[2]!} ÷ 3 = ${r}.`],
      hints: () => ["Additionne les trois valeurs, puis divise par 3."]
    },
    declaredVariationSpace: 50 * 50 * 50
  }),
  arithmeticTemplate({
    key: "y6l9.totalFromMean", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "REASONING",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "NUMBER_ENTRY", contextPool: SURVEYS,
    ranges: [[1, 50], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "The mean of {b} values is {a}. What is their total?",
      "A set of {b} readings about {ctx} has a mean of {a}. What is the total?"
    ],
    explain: (v, r) => [`Total = mean x number of values.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the mean by how many values there are."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "La moyenne de {b} valeurs est {a}. Quel est leur total ?",
        "Un ensemble de {b} relevés sur les {ctx} a une moyenne de {a}. Quel est le total ?"
      ],
      explain: (v, r) => [`Total = moyenne x nombre de valeurs.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie la moyenne par le nombre de valeurs."]
    },
    declaredVariationSpace: 50 * 11 * (1 + SURVEYS.length)
  }),
  arithmeticTemplate({
    key: "y6l9.missingValueFromMean", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "REASONING",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "NUMBER_ENTRY", contextPool: SURVEYS,
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]], constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) % 4 === 0,
    compute: (v) => v[3]!,
    derive: (v) => ({ mean: (v[0]! + v[1]! + v[2]! + v[3]!) / 4 }),
    promptTemplates: ["Four readings about {ctx} have a mean of {mean}. Three of them are {a}, {b} and {c}. What is the fourth?"],
    explain: (v, r) => [`Total = ${(v[0]! + v[1]! + v[2]! + v[3]!) / 4} x 4 = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Find the total from the mean, then subtract the values you know."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Quatre relevés sur les {ctx} ont une moyenne de {mean}. Trois d'entre eux valent {a}, {b} et {c}. Quel est le quatrième ?"],
      explain: (v, r) => [`Total = ${(v[0]! + v[1]! + v[2]! + v[3]!) / 4} x 4 = ${v[0]! + v[1]! + v[2]! + v[3]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]!} - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
      hints: () => ["Trouve le total à partir de la moyenne, puis soustrais les valeurs connues."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y6l9.mcMean", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]], constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) % 4 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]!) / 4,
    promptTemplates: ["What is the mean of {a}, {b}, {c} and {d}?"],
    explain: (v, r) => [`${v[0]! + v[1]! + v[2]! + v[3]!} ÷ 4 = ${r}.`],
    hints: () => ["Add them up, then divide by 4."],
    distractorSpread: 6,
    fr: {
      promptTemplates: ["Quelle est la moyenne de {a}, {b}, {c} et {d} ?"],
      hints: () => ["Additionne-les, puis divise par 4."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y6l9.rangeOfData", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "NUMBER_ENTRY", contextPool: SURVEYS,
    ranges: [[1, 50], [1, 50], [1, 50], [1, 50]],
    compute: (v) => Math.max(v[0]!, v[1]!, v[2]!, v[3]!) - Math.min(v[0]!, v[1]!, v[2]!, v[3]!),
    promptTemplates: [
      "Find the range of {a}, {b}, {c} and {d}.",
      "Readings about {ctx} are {a}, {b}, {c} and {d}. What is the range?"
    ],
    explain: (v, r) => [`Largest = ${Math.max(v[0]!, v[1]!, v[2]!, v[3]!)}, smallest = ${Math.min(v[0]!, v[1]!, v[2]!, v[3]!)}.`, `Range = ${r}.`],
    hints: () => ["Subtract the smallest value from the largest."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "Trouve l'étendue de {a}, {b}, {c} et {d}.",
        "Des relevés sur les {ctx} valent {a}, {b}, {c} et {d}. Quelle est l'étendue ?"
      ],
      explain: (v, r) => [`Plus grande = ${Math.max(v[0]!, v[1]!, v[2]!, v[3]!)}, plus petite = ${Math.min(v[0]!, v[1]!, v[2]!, v[3]!)}.`, `Étendue = ${r}.`],
      hints: () => ["Soustrais la plus petite valeur de la plus grande."]
    },
    declaredVariationSpace: 50 * 50 * 50 * 50
  }),
  categoricalPoolTemplate({
    key: "y6l9.tfMean", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "REASONING",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const mean = rng.int(2, 40);
      const count = rng.int(3, 8);
      const values: number[] = [];
      let remaining = mean * count;
      for (let i = 0; i < count - 1; i++) {
        const v = rng.int(1, Math.max(1, Math.min(2 * mean, remaining - (count - 1 - i))));
        values.push(v);
        remaining -= v;
      }
      values.push(remaining);
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? mean : mean + rng.int(1, 5);
      return {
        prompt: `The mean of ${values.join(", ")} is ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`The values total ${mean * count}, and ${mean * count} ÷ ${count} = ${mean}.`],
        hints: ["Add the values and divide by how many there are, then compare."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^The mean of (.+) is (\d+)\. True or false\?$/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `La moyenne de ${m[1]} est ${m[2]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Additionne les valeurs et divise par leur nombre, puis compare."]
        };
      }
    },
    declaredVariationSpace: 5000
  }),
  arithmeticTemplate({
    key: "y6l9.wordProblemMean", levelKey: "Y6L9", objectiveCode: "Y6-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["AVERAGE_CALCULATION_ERROR"], type: "WORD_PROBLEM", contextPool: SURVEYS,
    ranges: [[1, 30], [2, 10]], compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! * v[1]!, count: v[1]! }),
    promptTemplates: ["Across {count} classes surveyed about {ctx}, {total} responses were collected in total. What is the mean number per class?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide the total by the number of groups."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: ["Dans {count} classes interrogées sur les {ctx}, {total} réponses ont été recueillies au total. Quelle est la moyenne par classe ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Divise le total par le nombre de groupes."]
    },
    declaredVariationSpace: 30 * 9 * SURVEYS.length
  })
];

export default level;
