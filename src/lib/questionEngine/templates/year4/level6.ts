import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 6 — "Decimals and decimal place value"
const MEASURES = ["a plank of wood", "a ribbon", "a running track lap", "a piece of string", "a garden path", "a shelf"];
const MEASURES_FR = ["une planche de bois", "un ruban", "un tour de piste", "un bout de ficelle", "une allée de jardin", "une étagère"];
const oneDp = (n: number) => n.toFixed(1);
const twoDp = (n: number) => n.toFixed(2);

export const level: QuestionTemplateDef[] = [
  // --- Y4-L6-1: decimal equivalents of tenths and hundredths ---
  arithmeticTemplate({
    key: "y4l6.tenthsAsDecimal", levelKey: "Y4L6", objectiveCode: "Y4-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]! / 10, formatValue: oneDp,
    derive: (v) => ({ n: v[0]! }),
    promptTemplates: [
      "Write {n} tenths as a decimal.",
      "What is {n}/10 as a decimal?",
      "{n} tenths is the same as which decimal number?"
    ],
    explain: (v, r) => [`Dividing by 10 moves every digit one place to the right.`, `${v[0]} ÷ 10 = ${r}.`],
    hints: () => ["The first digit after the decimal point counts the tenths."],
    fr: {
      promptTemplates: [
        "Écris {n} dixièmes sous forme décimale.",
        "Que vaut {n}/10 en écriture décimale ?",
        "{n} dixièmes, c'est quel nombre décimal ?"
      ],
      explain: (v, r) => [`Diviser par 10 déplace chaque chiffre d'un rang vers la droite.`, `${v[0]} ÷ 10 = ${r}.`],
      hints: () => ["Le premier chiffre après la virgule compte les dixièmes."]
    },
    declaredVariationSpace: 99 * 3
  }),
  arithmeticTemplate({
    key: "y4l6.hundredthsAsDecimal", levelKey: "Y4L6", objectiveCode: "Y4-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]! / 100, formatValue: twoDp,
    derive: (v) => ({ n: v[0]! }),
    promptTemplates: [
      "Write {n} hundredths as a decimal.",
      "What is {n}/100 as a decimal?",
      "{n} hundredths is the same as which decimal number?"
    ],
    explain: (v, r) => [`Dividing by 100 moves every digit two places to the right.`, `${v[0]} ÷ 100 = ${r}.`],
    hints: () => ["The second digit after the decimal point counts the hundredths."],
    fr: {
      promptTemplates: [
        "Écris {n} centièmes sous forme décimale.",
        "Que vaut {n}/100 en écriture décimale ?",
        "{n} centièmes, c'est quel nombre décimal ?"
      ],
      explain: (v, r) => [`Diviser par 100 déplace chaque chiffre de deux rangs vers la droite.`, `${v[0]} ÷ 100 = ${r}.`],
      hints: () => ["Le deuxième chiffre après la virgule compte les centièmes."]
    },
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y4l6.countTenthsInDecimal", levelKey: "Y4L6", objectiveCode: "Y4-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ dec: (v[0]! / 10).toFixed(1) }),
    promptTemplates: [
      "How many tenths are there in {dec}?",
      "{dec} is the same as how many tenths?",
      "Write {dec} as a number of tenths."
    ],
    explain: (v, r) => [`Multiplying by 10 undoes the division.`, `${(v[0]! / 10).toFixed(1)} x 10 = ${r}, so there are ${r} tenths.`],
    hints: () => ["Multiply the decimal by 10 to count the tenths."],
    fr: {
      promptTemplates: [
        "Combien y a-t-il de dixièmes dans {dec} ?",
        "{dec} correspond à combien de dixièmes ?",
        "Écris {dec} en nombre de dixièmes."
      ],
      explain: (v, r) => [`Multiplier par 10 annule la division.`, `${(v[0]! / 10).toFixed(1)} x 10 = ${r}, il y a donc ${r} dixièmes.`],
      hints: () => ["Multiplie le décimal par 10 pour compter les dixièmes."]
    },
    declaredVariationSpace: 99 * 3
  }),
  arithmeticTemplate({
    key: "y4l6.countHundredthsInDecimal", levelKey: "Y4L6", objectiveCode: "Y4-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]!,
    derive: (v) => ({ dec: (v[0]! / 100).toFixed(2) }),
    promptTemplates: [
      "How many hundredths are there in {dec}?",
      "{dec} is the same as how many hundredths?",
      "Write {dec} as a number of hundredths."
    ],
    explain: (v, r) => [`${(v[0]! / 100).toFixed(2)} x 100 = ${r}, so there are ${r} hundredths.`],
    hints: () => ["Multiply the decimal by 100 to count the hundredths."],
    fr: {
      promptTemplates: [
        "Combien y a-t-il de centièmes dans {dec} ?",
        "{dec} correspond à combien de centièmes ?",
        "Écris {dec} en nombre de centièmes."
      ],
      explain: (v, r) => [`${(v[0]! / 100).toFixed(2)} x 100 = ${r}, il y a donc ${r} centièmes.`],
      hints: () => ["Multiplie le décimal par 100 pour compter les centièmes."]
    },
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y4l6.penceAsPounds", levelKey: "Y4L6", objectiveCode: "Y4-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]! / 100, formatValue: twoDp,
    derive: (v) => ({ p: v[0]! }),
    promptTemplates: [
      "Write {p} pence as a number of pounds.",
      "{p}p is how many pounds? Give your answer as a decimal.",
      "There are 100 pence in a pound. Convert {p}p into pounds."
    ],
    explain: (v, r) => [`There are 100 pence in a pound, so divide by 100.`, `${v[0]} ÷ 100 = ${r}.`],
    hints: () => ["Money in pounds always shows two digits after the point: the tenths and the hundredths."],
    fr: {
      promptTemplates: [
        "Écris {p} pence en livres.",
        "{p} p font combien de livres ? Donne ta réponse en décimal.",
        "Il y a 100 pence dans une livre. Convertis {p} p en livres."
      ],
      explain: (v, r) => [`Il y a 100 pence dans une livre, donc divise par 100.`, `${v[0]} ÷ 100 = ${r}.`],
      hints: () => ["L'argent en livres s'écrit toujours avec deux chiffres après la virgule : les dixièmes et les centièmes."]
    },
    declaredVariationSpace: 999 * 3
  }),
  categoricalPoolTemplate({
    key: "y4l6.mcDigitValue", levelKey: "Y4L6", objectiveCode: "Y4-L6-1", difficulty: "REASONING",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { column: ["ones", "tenths", "hundredths"] },
    build: (picked, rng) => {
      const ones = rng.int(1, 9);
      const tenths = rng.int(1, 9);
      const hundredths = rng.int(1, 9);
      const number = `${ones}.${tenths}${hundredths}`;
      const column = picked.column!;
      const digits: Record<string, number> = { ones, tenths, hundredths };
      const labels: Record<string, string> = {
        ones: `${digits.ones} ones`,
        tenths: `${digits.tenths} tenths`,
        hundredths: `${digits.hundredths} hundredths`
      };
      return {
        prompt: `In the number ${number}, what is the value of the ${column} digit?`,
        correctLabel: labels[column]!,
        distractorLabels: Object.entries(labels).filter(([c]) => c !== column).map(([, l]) => l),
        explanationSteps: [`After the decimal point the columns are tenths then hundredths.`, `So the ${column} digit is worth ${labels[column]}.`],
        hints: ["Ones come before the point; tenths then hundredths come after it."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const colFr: Record<string, string> = { ones: "des unités", tenths: "des dixièmes", hundredths: "des centièmes" };
        const toFr = (label: string) => label
          .replace(/^(\d+) ones$/, "$1 unités")
          .replace(/^(\d+) tenths$/, "$1 dixièmes")
          .replace(/^(\d+) hundredths$/, "$1 centièmes");
        const m = drawn.prompt.match(/^In the number (\S+), what is the value of the/);
        if (!m) return {};
        return {
          prompt: `Dans le nombre ${m[1]!.replace(".", ",")}, quelle est la valeur du chiffre ${colFr[picked.column!]} ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          explanationSteps: ["Après la virgule, les colonnes sont les dixièmes puis les centièmes."],
          hints: ["Les unités sont avant la virgule ; les dixièmes puis les centièmes sont après."]
        };
      }
    },
    declaredVariationSpace: 3 * 9 * 9 * 9
  }),

  // --- Y4-L6-2: rounding decimals with one decimal place ---
  arithmeticTemplate({
    key: "y4l6.roundOneDpToWhole", levelKey: "Y4L6", objectiveCode: "Y4-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 10),
    derive: (v) => ({ dec: (v[0]! / 10).toFixed(1) }),
    promptTemplates: [
      "Round {dec} to the nearest whole number.",
      "What is {dec} rounded to the nearest whole number?"
    ],
    explain: (v, r) => [
      `Look at the tenths digit of ${(v[0]! / 10).toFixed(1)}: it is ${v[0]! % 10}.`,
      v[0]! % 10 >= 5 ? `5 or more means round up, giving ${r}.` : `Less than 5 means round down, giving ${r}.`
    ],
    hints: () => ["Look only at the tenths digit: 5 or more rounds up, less than 5 rounds down."],
    fr: {
      promptTemplates: [
        "Arrondis {dec} à l'unité la plus proche.",
        "Que vaut {dec} arrondi à l'unité la plus proche ?"
      ],
      explain: (v, r) => [
        `Regarde le chiffre des dixièmes de ${(v[0]! / 10).toFixed(1)} : c'est ${v[0]! % 10}.`,
        v[0]! % 10 >= 5 ? `5 ou plus : on arrondit au-dessus, ce qui donne ${r}.` : `Moins de 5 : on arrondit en dessous, ce qui donne ${r}.`
      ],
      hints: () => ["Regarde seulement le chiffre des dixièmes : 5 ou plus on arrondit au-dessus, moins de 5 en dessous."]
    },
    declaredVariationSpace: 999 * 2
  }),
  arithmeticTemplate({
    key: "y4l6.roundMeasurementToWhole", levelKey: "Y4L6", objectiveCode: "Y4-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM", contextPool: MEASURES,
    ranges: [[11, 599]], compute: (v) => Math.round(v[0]! / 10),
    derive: (v) => ({ dec: (v[0]! / 10).toFixed(1) }),
    promptTemplates: [
      "{ctx} is {dec} metres long. How long is it to the nearest metre?",
      "A jug holds {dec} litres. Round that to the nearest litre."
    ],
    explain: (v, r) => [`The tenths digit is ${v[0]! % 10}.`, `That rounds ${v[0]! % 10 >= 5 ? "up" : "down"} to ${r}.`],
    hints: () => ["Decide which whole number the measurement is closest to."],
    fr: {
      contextPool: MEASURES_FR,
      promptTemplates: [
        "{ctx} mesure {dec} mètres de long. Quelle est sa longueur au mètre près ?",
        "Un pichet contient {dec} litres. Arrondis au litre près."
      ],
      explain: (v, r) => [`Le chiffre des dixièmes est ${v[0]! % 10}.`, `Cela s'arrondit ${v[0]! % 10 >= 5 ? "au-dessus" : "en dessous"} à ${r}.`],
      hints: () => ["Détermine de quel nombre entier la mesure est la plus proche."]
    },
    declaredVariationSpace: 589 * (1 + MEASURES.length)
  }),
  arithmeticTemplate({
    key: "y4l6.halfwayBetweenWholes", levelKey: "Y4L6", objectiveCode: "Y4-L6-2", difficulty: "REASONING",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "MULTI_STEP",
    ranges: [[0, 99]], compute: (v) => v[0]! + 0.5, formatValue: oneDp,
    derive: (v) => ({ lo: v[0]!, hi: v[0]! + 1 }),
    promptTemplates: [
      "Which decimal is exactly halfway between {lo} and {hi}?",
      "On a number line, what number sits midway between {lo} and {hi}?"
    ],
    explain: (v, r) => [`Halfway between two whole numbers is five tenths past the lower one.`, `${v[0]} + 0.5 = ${r}.`],
    hints: () => ["Halfway always ends in .5."],
    fr: {
      promptTemplates: [
        "Quel décimal est exactement à mi-chemin entre {lo} et {hi} ?",
        "Sur une droite graduée, quel nombre se trouve au milieu entre {lo} et {hi} ?"
      ],
      explain: (v, r) => [`Le milieu entre deux entiers est cinq dixièmes après le plus petit.`, `${v[0]} + 0,5 = ${r}.`],
      hints: () => ["Le milieu se termine toujours par ,5."]
    },
    declaredVariationSpace: 100 * 2
  }),
  arithmeticTemplate({
    key: "y4l6.addTenths", levelKey: "Y4L6", objectiveCode: "Y4-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_ALIGNMENT_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 90], [1, 90]], compute: (v) => (v[0]! + v[1]!) / 10, formatValue: oneDp,
    derive: (v) => ({ da: (v[0]! / 10).toFixed(1), db: (v[1]! / 10).toFixed(1) }),
    promptTemplates: [
      "Work out {da} + {db}.",
      "Add the decimals {da} and {db}."
    ],
    explain: (v, r) => [
      `${v[0]} tenths + ${v[1]} tenths = ${v[0]! + v[1]!} tenths.`,
      `${v[0]! + v[1]!} tenths = ${r}.`
    ],
    hints: () => ["Line up the decimal points, or count in tenths and convert back at the end."],
    fr: {
      promptTemplates: [
        "Calcule {da} + {db}.",
        "Additionne les décimaux {da} et {db}."
      ],
      explain: (v, r) => [
        `${v[0]} dixièmes + ${v[1]} dixièmes = ${v[0]! + v[1]!} dixièmes.`,
        `${v[0]! + v[1]!} dixièmes = ${r}.`
      ],
      hints: () => ["Aligne les virgules, ou compte en dixièmes et reconvertis à la fin."]
    },
    declaredVariationSpace: 90 * 90
  }),
  arithmeticTemplate({
    key: "y4l6.subtractTenths", levelKey: "Y4L6", objectiveCode: "Y4-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_ALIGNMENT_ERROR"], type: "MULTI_STEP",
    ranges: [[11, 99], [1, 90]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => (v[0]! - v[1]!) / 10, formatValue: oneDp,
    derive: (v) => ({ da: (v[0]! / 10).toFixed(1), db: (v[1]! / 10).toFixed(1) }),
    promptTemplates: [
      "Work out {da} - {db}.",
      "Subtract {db} from {da}."
    ],
    explain: (v, r) => [
      `${v[0]} tenths - ${v[1]} tenths = ${v[0]! - v[1]!} tenths.`,
      `${v[0]! - v[1]!} tenths = ${r}.`
    ],
    hints: () => ["Count in tenths and the subtraction becomes a whole-number one."],
    fr: {
      promptTemplates: [
        "Calcule {da} - {db}.",
        "Retire {db} de {da}."
      ],
      explain: (v, r) => [
        `${v[0]} dixièmes - ${v[1]} dixièmes = ${v[0]! - v[1]!} dixièmes.`,
        `${v[0]! - v[1]!} dixièmes = ${r}.`
      ],
      hints: () => ["Compte en dixièmes et la soustraction devient une soustraction d'entiers."]
    },
    declaredVariationSpace: 89 * 90
  }),

  // --- Y4-L6-3: comparing decimals up to two decimal places ---
  categoricalPoolTemplate({
    key: "y4l6.mcCompareDecimals", levelKey: "Y4L6", objectiveCode: "Y4-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_COMPARISON_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 999);
      let b = rng.int(100, 999);
      if (b === a) b = a === 999 ? a - 1 : a + 1;
      const da = (a / 100).toFixed(2);
      const db = (b / 100).toFixed(2);
      const bigger = a > b ? da : db;
      const smaller = a > b ? db : da;
      return {
        prompt: `Which decimal is larger: ${da} or ${db}?`,
        correctLabel: bigger,
        distractorLabels: [smaller, "they are equal"],
        explanationSteps: [
          `Compare the whole numbers first, then the tenths, then the hundredths.`,
          `${bigger} is larger than ${smaller}.`
        ],
        hints: ["Compare column by column from the left — a longer decimal is not automatically bigger."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which decimal is larger: (\S+) or (\S+)\?$/);
        if (!m) return {};
        return {
          prompt: `Quel décimal est le plus grand : ${m[1]!.replace(".", ",")} ou ${m[2]!.replace(".", ",")} ?`,
          correctLabel: drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => (d === "they are equal" ? "ils sont égaux" : d)),
          explanationSteps: ["Compare d'abord les entiers, puis les dixièmes, puis les centièmes."],
          hints: ["Compare colonne par colonne depuis la gauche — un décimal plus long n'est pas forcément plus grand."]
        };
      }
    },
    declaredVariationSpace: 900 * 900
  }),
  categoricalPoolTemplate({
    key: "y4l6.tfDecimalComparison", levelKey: "Y4L6", objectiveCode: "Y4-L6-3", difficulty: "REASONING",
    misconceptionTags: ["DECIMAL_COMPARISON_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 999);
      let b = rng.int(100, 999);
      if (b === a) b = a === 999 ? a - 1 : a + 1;
      const da = (a / 100).toFixed(2);
      const db = (b / 100).toFixed(2);
      const claimGreater = rng.chance(0.5);
      const isTrue = claimGreater ? a > b : a < b;
      return {
        prompt: `${da} is ${claimGreater ? "greater" : "less"} than ${db}. True or false?`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`Compare the columns from the left: ${a > b ? `${da} is larger` : `${db} is larger`}.`],
        hints: ["Line the two numbers up under each other and compare one column at a time."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\S+) is (greater|less) than (\S+)\. True or false\?$/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]!.replace(".", ",")} est ${m[2] === "greater" ? "plus grand" : "plus petit"} que ${m[3]!.replace(".", ",")}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Aligne les deux nombres l'un sous l'autre et compare une colonne à la fois."]
        };
      }
    },
    declaredVariationSpace: 900 * 900 * 2
  }),
  orderingTemplate({
    key: "y4l6.orderDecimals", levelKey: "Y4L6", objectiveCode: "Y4-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_COMPARISON_ERROR"], type: "ORDERING", direction: "asc",
    generateItems: (rng) => {
      const used = new Set<number>();
      const items: Array<{ label: string; sortValue: number }> = [];
      while (items.length < 4) {
        const n = rng.int(100, 999);
        if (used.has(n)) continue;
        used.add(n);
        items.push({ label: (n / 100).toFixed(2), sortValue: n });
      }
      return items;
    },
    promptTemplates: [
      "Put these decimals in order, smallest first.",
      "Order these numbers from smallest to largest."
    ],
    explain: (items) => [`In order: ${items.map((i) => i.label).join(", ")}.`],
    hints: () => ["Compare the whole numbers first, then the tenths, then the hundredths."],
    fr: {
      promptTemplates: [
        "Range ces décimaux dans l'ordre, du plus petit au plus grand.",
        "Classe ces nombres du plus petit au plus grand."
      ],
      explain: (items) => [`Dans l'ordre : ${items.map((i) => i.label.replace(".", ",")).join(" ; ")}.`],
      hints: () => ["Compare d'abord les entiers, puis les dixièmes, puis les centièmes."],
      translateLabels: (items) => items.map((i) => ({ ...i, label: i.label.replace(".", ",") }))
    },
    declaredVariationSpace: 50000
  }),
  arithmeticTemplate({
    key: "y4l6.decimalDifferenceInContext", levelKey: "Y4L6", objectiveCode: "Y4-L6-3", difficulty: "REASONING",
    misconceptionTags: ["DECIMAL_ALIGNMENT_ERROR"], type: "WORD_PROBLEM", contextPool: MEASURES,
    ranges: [[21, 99], [1, 20]], compute: (v) => (v[0]! - v[1]!) / 10, formatValue: oneDp,
    derive: (v) => ({ da: (v[0]! / 10).toFixed(1), db: (v[1]! / 10).toFixed(1) }),
    promptTemplates: [
      "{ctx} is {da} metres long. Another is {db} metres long. How much longer is the first, in metres?",
      "Two lengths are {da} m and {db} m. What is the difference, in metres?"
    ],
    explain: (v, r) => [`Work in tenths: ${v[0]} - ${v[1]} = ${v[0]! - v[1]!} tenths.`, `That is ${r} metres.`],
    hints: () => ["\"How much longer\" means find the difference — line up the decimal points."],
    fr: {
      contextPool: MEASURES_FR,
      promptTemplates: [
        "{ctx} mesure {da} mètres de long. Une autre mesure {db} mètres. De combien la première est-elle plus longue, en mètres ?",
        "Deux longueurs valent {da} m et {db} m. Quelle est la différence, en mètres ?"
      ],
      explain: (v, r) => [`Travaille en dixièmes : ${v[0]} - ${v[1]} = ${v[0]! - v[1]!} dixièmes.`, `Cela fait ${r} mètres.`],
      hints: () => ["« De combien plus long » veut dire chercher la différence — aligne les virgules."]
    },
    declaredVariationSpace: 79 * 20 * (1 + MEASURES.length)
  }),
  arithmeticTemplate({
    key: "y4l6.tenthsBetweenWholes", levelKey: "Y4L6", objectiveCode: "Y4-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["DECIMAL_PLACE_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99], [1, 9]], compute: (v) => v[0]! + v[1]! / 10, formatValue: oneDp,
    derive: (v) => ({ whole: v[0]!, t: v[1]! }),
    promptTemplates: [
      "A number line goes up in tenths. What number is {t} steps after {whole}?",
      "Start at {whole} and count on {t} tenths. Where do you land?"
    ],
    explain: (v, r) => [`${v[1]} tenths is ${(v[1]! / 10).toFixed(1)}.`, `${v[0]} + ${(v[1]! / 10).toFixed(1)} = ${r}.`],
    hints: () => ["Each step on the number line adds one tenth, which is 0.1."],
    fr: {
      promptTemplates: [
        "Une droite graduée avance de dixième en dixième. Quel nombre se trouve {t} pas après {whole} ?",
        "Pars de {whole} et avance de {t} dixièmes. Où arrives-tu ?"
      ],
      explain: (v, r) => [`${v[1]} dixièmes valent ${(v[1]! / 10).toFixed(1)}.`, `${v[0]} + ${(v[1]! / 10).toFixed(1)} = ${r}.`],
      hints: () => ["Chaque pas sur la droite graduée ajoute un dixième, c'est-à-dire 0,1."]
    },
    declaredVariationSpace: 99 * 9 * 2
  })
];

export default level;
