import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 9 — "Statistics, tables and charts"
const SURVEYS = ["favourite fruits", "ways of travelling to school", "favourite sports", "pets at home", "book genres", "lunch choices"];
const SURVEYS_FR = ["les fruits préférés", "les moyens de venir à l'école", "les sports préférés", "les animaux à la maison", "les genres de livres", "les choix de déjeuner"];
const CATEGORIES = ["apples", "bananas", "grapes", "oranges", "pears", "plums"];
const CATEGORIES_FR = ["pommes", "bananes", "raisins", "oranges", "poires", "prunes"];

export const level: QuestionTemplateDef[] = [
  // --- Y4-L9-1: interpreting bar charts and time graphs ---
  arithmeticTemplate({
    key: "y4l9.barChartTotal", levelKey: "Y4L9", objectiveCode: "Y4-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP", contextPool: SURVEYS,
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]],
    compute: (v) => v[0]! + v[1]! + v[2]! + v[3]!,
    promptTemplates: [
      "A bar chart has four bars of height {a}, {b}, {c} and {d}. How many were counted in total?",
      "A survey of {ctx} gave results of {a}, {b}, {c} and {d}. How many children answered altogether?"
    ],
    explain: (v, r) => [`Add the height of every bar.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
    hints: () => ["Read each bar against the scale, then add them all together."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "Un diagramme en barres a quatre barres de hauteurs {a}, {b}, {c} et {d}. Combien en a-t-on compté en tout ?",
        "Une enquête sur {ctx} a donné {a}, {b}, {c} et {d}. Combien d'enfants ont répondu en tout ?"
      ],
      explain: (v, r) => [`Additionne la hauteur de chaque barre.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
      hints: () => ["Lis chaque barre sur l'échelle, puis additionne-les toutes."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y4l9.scaledBarValue", levelKey: "Y4L9", objectiveCode: "Y4-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["CHART_SCALE_ERROR"], type: "MULTI_STEP", contextPool: CATEGORIES,
    ranges: [[2, 10], [1, 20]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "On a bar chart each square stands for {a}. A bar is {b} {b#squares|square} tall. What value does it show?",
      "The scale of a chart goes up in {a}s. The bar for {ctx} reaches {b} {b#squares|square}. How many is that?"
    ],
    explain: (v, r) => [`Each square is worth ${v[0]}, and there are ${v[1]} of them.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Always check the scale before reading a bar — one square is not always one."],
    fr: {
      contextPool: CATEGORIES_FR,
      promptTemplates: [
        "Sur un diagramme en barres, chaque carreau représente {a}. Une barre fait {b} carreaux de haut. Quelle valeur montre-t-elle ?",
        "L'échelle d'un graphique va de {a} en {a}. La barre des {ctx} atteint {b} carreaux. Combien cela fait-il ?"
      ],
      explain: (v, r) => [`Chaque carreau vaut ${v[0]}, et il y en a ${v[1]}.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Vérifie toujours l'échelle avant de lire une barre — un carreau ne vaut pas toujours un."]
    },
    declaredVariationSpace: 9 * 20 * (1 + CATEGORIES.length)
  }),
  arithmeticTemplate({
    key: "y4l9.scaledBarSquares", levelKey: "Y4L9", objectiveCode: "Y4-L9-1", difficulty: "REASONING",
    misconceptionTags: ["CHART_SCALE_ERROR"], type: "MULTI_STEP", contextPool: CATEGORIES,
    ranges: [[2, 10], [1, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "On a chart each square stands for {a}. How many squares tall should a bar showing {total} be?",
      "A bar must show {total} and each square is worth {a}. How many squares tall is it?"
    ],
    explain: (v, r) => [`Divide the value by what one square is worth.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Going from a value to squares means dividing by the scale."],
    fr: {
      contextPool: CATEGORIES_FR,
      promptTemplates: [
        "Sur un graphique, chaque carreau représente {a}. Combien de carreaux de haut doit faire une barre montrant {total} ?",
        "Une barre doit montrer {total} et chaque carreau vaut {a}. Combien fait-elle de carreaux de haut ?"
      ],
      explain: (v, r) => [`Divise la valeur par ce que vaut un carreau.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Passer d'une valeur à des carreaux revient à diviser par l'échelle."]
    },
    declaredVariationSpace: 9 * 20 * (1 + CATEGORIES.length)
  }),
  arithmeticTemplate({
    key: "y4l9.timeGraphRise", levelKey: "Y4L9", objectiveCode: "Y4-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 25], [1, 30]], compute: (v) => v[1]!,
    derive: (v) => ({ later: v[0]! + v[1]! }),
    promptTemplates: [
      "A time graph shows a temperature of {a}°C at 7am and {later}°C at noon. By how many degrees did it rise?",
      "A line graph goes from {a} at the start to {later} at the end. How much did it increase by?"
    ],
    explain: (v, r) => [`Find the difference between the two readings.`, `${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Read both values off the vertical axis, then subtract."],
    fr: {
      promptTemplates: [
        "Un graphique montre une température de {a} °C à 7 h et {later} °C à midi. De combien de degrés a-t-elle augmenté ?",
        "Une courbe passe de {a} au départ à {later} à la fin. De combien a-t-elle augmenté ?"
      ],
      explain: (v, r) => [`Cherche la différence entre les deux relevés.`, `${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Lis les deux valeurs sur l'axe vertical, puis soustrais."]
    },
    declaredVariationSpace: 25 * 30 * 2
  }),
  arithmeticTemplate({
    key: "y4l9.pictogramValue", levelKey: "Y4L9", objectiveCode: "Y4-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["CHART_SCALE_ERROR"], type: "MULTI_STEP", contextPool: CATEGORIES,
    ranges: [[2, 12], [1, 15]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "On a pictogram each picture stands for {a} children. There are {b} pictures in a row. How many children is that?",
      "Each symbol represents {a} {ctx}. A row has {b} symbols. How many is that?"
    ],
    explain: (v, r) => [`Each symbol is worth ${v[0]}, and there are ${v[1]} symbols.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Check the key first — it tells you what one picture is worth."],
    fr: {
      contextPool: CATEGORIES_FR,
      promptTemplates: [
        "Sur un pictogramme, chaque image représente {a} enfants. Il y a {b} images sur une ligne. Combien d'enfants cela fait-il ?",
        "Chaque symbole représente {a} {ctx}. Une ligne compte {b} symboles. Combien cela fait-il ?"
      ],
      explain: (v, r) => [`Chaque symbole vaut ${v[0]}, et il y a ${v[1]} symboles.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Regarde d'abord la légende — elle dit ce que vaut une image."]
    },
    declaredVariationSpace: 11 * 15 * (1 + CATEGORIES.length)
  }),

  // --- Y4-L9-2: comparison, sum and difference problems ---
  arithmeticTemplate({
    key: "y4l9.barChartDifference", levelKey: "Y4L9", objectiveCode: "Y4-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP", contextPool: CATEGORIES,
    ranges: [[10, 80], [1, 60]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "One bar shows {a} and another shows {b}. How many more does the taller bar show?",
      "{a} children chose {ctx} and {b} chose something else. How many more chose the first?"
    ],
    explain: (v, r) => [`"How many more" means find the difference.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the shorter bar from the taller one."],
    fr: {
      contextPool: CATEGORIES_FR,
      promptTemplates: [
        "Une barre montre {a} et une autre {b}. Combien de plus la plus haute montre-t-elle ?",
        "{a} enfants ont choisi les {ctx} et {b} autre chose. Combien de plus ont choisi le premier ?"
      ],
      explain: (v, r) => [`« Combien de plus » signifie chercher la différence.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Retire la barre la plus courte de la plus haute."]
    },
    declaredVariationSpace: 71 * 60
  }),
  arithmeticTemplate({
    key: "y4l9.twoCategoriesSum", levelKey: "Y4L9", objectiveCode: "Y4-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP", contextPool: CATEGORIES,
    ranges: [[1, 80], [1, 80]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "Two bars show {a} and {b}. How many is that altogether?",
      "{a} children chose {ctx} and {b} chose another option. How many children is that in total?"
    ],
    explain: (v, r) => [`Add the two bars together.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["\"Altogether\" and \"in total\" both mean add."],
    fr: {
      contextPool: CATEGORIES_FR,
      promptTemplates: [
        "Deux barres montrent {a} et {b}. Combien cela fait-il en tout ?",
        "{a} enfants ont choisi les {ctx} et {b} une autre option. Combien d'enfants cela fait-il au total ?"
      ],
      explain: (v, r) => [`Additionne les deux barres.`, `${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["« En tout » et « au total » veulent dire additionner."]
    },
    declaredVariationSpace: 80 * 80
  }),
  arithmeticTemplate({
    key: "y4l9.rangeOfBarHeights", levelKey: "Y4L9", objectiveCode: "Y4-L9-2", difficulty: "REASONING",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 30], [1, 30], [31, 90], [1, 30]],
    compute: (v) => Math.max(...v) - Math.min(...v),
    promptTemplates: [
      "A bar chart has bars of {a}, {b}, {c} and {d}. What is the difference between the tallest and the shortest?",
      "Four bars show {a}, {b}, {c} and {d}. How much taller is the biggest than the smallest?"
    ],
    explain: (v, r) => [`The tallest is ${Math.max(...v)} and the shortest is ${Math.min(...v)}.`, `${Math.max(...v)} - ${Math.min(...v)} = ${r}.`],
    hints: () => ["Find the biggest and smallest values first, then subtract."],
    fr: {
      promptTemplates: [
        "Un diagramme a des barres de {a}, {b}, {c} et {d}. Quelle est la différence entre la plus haute et la plus basse ?",
        "Quatre barres montrent {a}, {b}, {c} et {d}. De combien la plus grande dépasse-t-elle la plus petite ?"
      ],
      explain: (v, r) => [`La plus haute est ${Math.max(...v)} et la plus basse ${Math.min(...v)}.`, `${Math.max(...v)} - ${Math.min(...v)} = ${r}.`],
      hints: () => ["Trouve d'abord la plus grande et la plus petite valeur, puis soustrais."]
    },
    declaredVariationSpace: 30 * 30 * 60
  }),
  categoricalPoolTemplate({
    key: "y4l9.mcMostPopular", levelKey: "Y4L9", objectiveCode: "Y4-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { winner: ["apples", "bananas", "grapes", "oranges"] },
    build: (picked, rng) => {
      const base = rng.int(5, 70);
      const winner = picked.winner!;
      const options = ["apples", "bananas", "grapes", "oranges"];
      const counts: Record<string, number> = {};
      options.forEach((o, i) => { counts[o] = base + i; });
      counts[winner] = base + 12;
      const listed = options.map((o) => `${o}: ${counts[o]}`).join(", ");
      return {
        prompt: `A bar chart shows ${listed}. Which was chosen most often?`,
        correctLabel: winner,
        distractorLabels: options.filter((o) => o !== winner).slice(0, 3),
        explanationSteps: [`The tallest bar is ${winner} with ${counts[winner]}.`],
        hints: ["Look for the tallest bar — that is the most popular choice."]
      };
    },
    fr: {
      translate: (drawn) => {
        const fruitsFr: Record<string, string> = { apples: "pommes", bananas: "bananes", grapes: "raisins", oranges: "oranges" };
        const m = drawn.prompt.match(/^A bar chart shows (.+)\. Which was chosen most often\?$/);
        const listedFr = (m ? m[1]! : "").replace(/(apples|bananas|grapes|oranges)/g, (x) => fruitsFr[x] ?? x);
        return {
          prompt: `Un diagramme en barres montre ${listedFr}. Lequel a été choisi le plus souvent ?`,
          correctLabel: fruitsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => fruitsFr[d] ?? d),
          hints: ["Cherche la barre la plus haute — c'est le choix le plus populaire."]
        };
      }
    },
    declaredVariationSpace: 4 * 66
  }),
  categoricalPoolTemplate({
    key: "y4l9.tfChartClaim", levelKey: "Y4L9", objectiveCode: "Y4-L9-2", difficulty: "REASONING",
    misconceptionTags: ["CHART_READING_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(5, 60);
      const b = rng.int(5, 60);
      const claimMore = rng.chance(0.5);
      const isTrue = claimMore ? a > b : a < b;
      return {
        prompt: `One bar shows ${a} and another shows ${b}, so the first shows ${claimMore ? "more" : "fewer"}. True or false?`,
        correctLabel: a === b ? "False" : isTrue ? "True" : "False",
        distractorLabels: [a === b ? "True" : isTrue ? "False" : "True"],
        explanationSteps: [a === b ? `Both bars show ${a}, so neither shows more.` : `${Math.max(a, b)} is bigger than ${Math.min(a, b)}.`],
        hints: ["Compare the two numbers carefully before deciding."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const m = drawn.prompt.match(/^One bar shows (\d+) and another shows (\d+), so the first shows (more|fewer)\./);
        if (!m) return {};
        return {
          prompt: `Une barre montre ${m[1]} et une autre ${m[2]}, donc la première en montre ${m[3] === "more" ? "plus" : "moins"}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Compare soigneusement les deux nombres avant de décider."]
        };
      }
    },
    declaredVariationSpace: 56 * 56 * 2
  }),

  // --- Y4-L9-3: frequency tables ---
  arithmeticTemplate({
    key: "y4l9.frequencyTableTotal", levelKey: "Y4L9", objectiveCode: "Y4-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP", contextPool: SURVEYS,
    ranges: [[1, 35], [1, 35], [1, 35], [1, 35]],
    compute: (v) => v[0]! + v[1]! + v[2]! + v[3]!,
    promptTemplates: [
      "A frequency table lists {a}, {b}, {c} and {d}. What is the total frequency?",
      "A table recording {ctx} shows {a}, {b}, {c} and {d}. How many were recorded altogether?"
    ],
    explain: (v, r) => [`Add every frequency in the table.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
    hints: () => ["The total row is the sum of all the frequencies."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "Un tableau d'effectifs liste {a}, {b}, {c} et {d}. Quel est l'effectif total ?",
        "Un tableau sur {ctx} indique {a}, {b}, {c} et {d}. Combien en a-t-on relevé en tout ?"
      ],
      explain: (v, r) => [`Additionne tous les effectifs du tableau.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
      hints: () => ["La ligne du total est la somme de tous les effectifs."]
    },
    declaredVariationSpace: 35 * 35 * 35 * 35
  }),
  arithmeticTemplate({
    key: "y4l9.frequencyTableMissing", levelKey: "Y4L9", objectiveCode: "Y4-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP", contextPool: SURVEYS,
    ranges: [[1, 35], [1, 35], [1, 35]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! + v[1]! + v[2]! }),
    promptTemplates: [
      "A frequency table of {total} results shows {a} and {b} for two rows. What is the missing frequency?",
      "A survey of {ctx} had {total} answers in total, with {a} and {b} in the first two rows. What is the third?"
    ],
    explain: (v, r) => [`The rows must add up to the total.`, `${v[0]! + v[1]! + v[2]!} - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Take the frequencies you know away from the total."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "Un tableau d'effectifs de {total} résultats indique {a} et {b} pour deux lignes. Quel est l'effectif manquant ?",
        "Une enquête sur {ctx} a eu {total} réponses au total, avec {a} et {b} pour les deux premières lignes. Quelle est la troisième ?"
      ],
      explain: (v, r) => [`Les lignes doivent s'additionner pour donner le total.`, `${v[0]! + v[1]! + v[2]!} - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Retire du total les effectifs que tu connais."]
    },
    declaredVariationSpace: 35 * 35 * 35
  }),
  arithmeticTemplate({
    key: "y4l9.tallyToFrequency", levelKey: "Y4L9", objectiveCode: "Y4-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 20], [0, 4]], compute: (v) => v[0]! * 5 + v[1]!,
    promptTemplates: [
      "A tally has {a} complete gates of five plus {b} extra marks. What is the frequency?",
      "A tally chart shows {a} groups of five and {b} single marks. How many is that?"
    ],
    explain: (v, r) => [`${v[0]} x 5 = ${v[0]! * 5}.`, `${v[0]! * 5} + ${v[1]} = ${r}.`],
    hints: () => ["Each gate of tally marks stands for five — count those first, then the leftovers."],
    fr: {
      promptTemplates: [
        "Un comptage a {a} paquets complets de cinq plus {b} barres en plus. Quel est l'effectif ?",
        "Un tableau de comptage montre {a} groupes de cinq et {b} barres isolées. Combien cela fait-il ?"
      ],
      explain: (v, r) => [`${v[0]} x 5 = ${v[0]! * 5}.`, `${v[0]! * 5} + ${v[1]} = ${r}.`],
      hints: () => ["Chaque paquet de barres vaut cinq — compte-les d'abord, puis les barres restantes."]
    },
    declaredVariationSpace: 20 * 5 * 2
  }),
  arithmeticTemplate({
    key: "y4l9.frequencyOfTwoRowsCombined", levelKey: "Y4L9", objectiveCode: "Y4-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP", contextPool: CATEGORIES,
    ranges: [[1, 50], [1, 50], [1, 50]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "A table shows {a} for {ctx}, {b} for the next row and {c} for the last. How many are in the first two rows combined?",
      "Three rows of a table show {a}, {b} and {c}. What is the total of the first two?"
    ],
    explain: (v, r) => [`Add only the two rows the question asks about.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Read the question carefully — not every row is needed every time."],
    fr: {
      contextPool: CATEGORIES_FR,
      promptTemplates: [
        "Un tableau indique {a} pour les {ctx}, {b} pour la ligne suivante et {c} pour la dernière. Combien y en a-t-il dans les deux premières lignes réunies ?",
        "Trois lignes d'un tableau montrent {a}, {b} et {c}. Quel est le total des deux premières ?"
      ],
      explain: (v, r) => [`Additionne seulement les deux lignes demandées.`, `${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Lis bien la question — toutes les lignes ne servent pas à chaque fois."]
    },
    declaredVariationSpace: 50 * 50 * 50
  }),
  arithmeticTemplate({
    key: "y4l9.timeGraphThreeReadings", levelKey: "Y4L9", objectiveCode: "Y4-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["CHART_READING_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 40], [1, 40], [1, 40]], compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: [
      "A time graph shows {a} mm of rain on Monday, {b} mm on Tuesday and {c} mm on Wednesday. How much fell in total?",
      "Readings of {a}, {b} and {c} are taken at three times. What is their total?"
    ],
    explain: (v, r) => [`Add the three readings.`, `${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Read each point off the graph, then add them up."],
    fr: {
      promptTemplates: [
        "Un graphique montre {a} mm de pluie lundi, {b} mm mardi et {c} mm mercredi. Combien est-il tombé en tout ?",
        "Des relevés de {a}, {b} et {c} sont faits à trois moments. Quel est leur total ?"
      ],
      explain: (v, r) => [`Additionne les trois relevés.`, `${v[0]} + ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Lis chaque point sur le graphique, puis additionne."]
    },
    declaredVariationSpace: 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y4l9.remainingAfterTwoCategories", levelKey: "Y4L9", objectiveCode: "Y4-L9-3", difficulty: "REASONING",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP", contextPool: SURVEYS,
    ranges: [[20, 60], [1, 40], [1, 40]], compute: (v) => v[1]! + v[2]!,
    derive: (v) => ({ total: v[0]! + v[1]! + v[2]! }),
    promptTemplates: [
      "{total} children were asked about {ctx}. {a} chose the first option. How many chose something else?",
      "A table has a total of {total} and the first row is {a}. What do the other rows add up to?"
    ],
    explain: (v, r) => [`Everything that is not the first row is the rest of the table.`, `${v[0]! + v[1]! + v[2]!} - ${v[0]} = ${r}.`],
    hints: () => ["Take the row you know away from the total."],
    fr: {
      contextPool: SURVEYS_FR,
      promptTemplates: [
        "{total} enfants ont été interrogés sur {ctx}. {a} ont choisi la première option. Combien en ont choisi une autre ?",
        "Un tableau a un total de {total} et sa première ligne vaut {a}. Quelle est la somme des autres lignes ?"
      ],
      explain: (v, r) => [`Tout ce qui n'est pas la première ligne constitue le reste du tableau.`, `${v[0]! + v[1]! + v[2]!} - ${v[0]} = ${r}.`],
      hints: () => ["Retire du total la ligne que tu connais."]
    },
    declaredVariationSpace: 41 * 40 * 40
  })
];

export default level;
