import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 4 — "Decimals, fractions and percentages"
const CTX = ["water bottles", "running times", "parcel weights", "race distances", "rainfall readings", "fuel amounts", "rope lengths", "paint tins"];
const CTX_FR = ["bouteilles d'eau", "temps de course", "poids de colis", "distances de course", "relevés de pluie", "quantités de carburant", "longueurs de corde", "pots de peinture"];
const FRIENDLY_DENOMS = [4, 5, 8, 10, 20, 25, 50];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L4-1: value of each digit to three decimal places ---
  arithmeticTemplate({
    key: "y6l4.tenthsDigitValue", levelKey: "Y6L4", objectiveCode: "Y6-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1000, 9999]], compute: (v) => Math.floor(v[0]! / 100) % 10,
    derive: (v) => ({ decimal: (v[0]! / 1000).toFixed(3) }),
    promptTemplates: [
      "In the number {decimal}, which digit is in the tenths place?",
      "Reading {ctx}: in {decimal}, which digit is in the tenths place?"
    ],
    explain: (v, r) => [`The first digit after the decimal point is the tenths digit: ${r}.`],
    hints: () => ["The tenths place is the first digit after the decimal point."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Dans le nombre {decimal}, quel chiffre occupe la position des dixièmes ?",
        "En lisant des {ctx} : dans {decimal}, quel chiffre occupe la position des dixièmes ?"
      ],
      explain: (v, r) => [`Le premier chiffre après la virgule est celui des dixièmes : ${r}.`],
      hints: () => ["La position des dixièmes est le premier chiffre après la virgule."]
    },
    declaredVariationSpace: 9000
  }),
  arithmeticTemplate({
    key: "y6l4.thousandthsDigitValue", levelKey: "Y6L4", objectiveCode: "Y6-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1000, 9999]], compute: (v) => v[0]! % 10,
    derive: (v) => ({ decimal: (v[0]! / 1000).toFixed(3) }),
    promptTemplates: [
      "In the number {decimal}, which digit is in the thousandths place?",
      "Reading {ctx}: in {decimal}, which digit is in the thousandths place?"
    ],
    explain: (v, r) => [`The third digit after the decimal point is the thousandths digit: ${r}.`],
    hints: () => ["Count three places after the decimal point: tenths, hundredths, thousandths."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Dans le nombre {decimal}, quel chiffre occupe la position des millièmes ?",
        "En lisant des {ctx} : dans {decimal}, quel chiffre occupe la position des millièmes ?"
      ],
      explain: (v, r) => [`Le troisième chiffre après la virgule est celui des millièmes : ${r}.`],
      hints: () => ["Compte trois positions après la virgule : dixièmes, centièmes, millièmes."]
    },
    declaredVariationSpace: 9000
  }),
  arithmeticTemplate({
    key: "y6l4.multiplyDecimalByTen", levelKey: "Y6L4", objectiveCode: "Y6-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 999]], compute: (v) => v[0]! / 10,
    derive: (v) => ({ decimal: (v[0]! / 100).toFixed(2) }),
    promptTemplates: [
      "{decimal} x 10 = ?",
      "Scaling up {ctx}: what is {decimal} x 10?"
    ],
    explain: (v, r) => [`Multiplying by 10 moves every digit one place to the left: ${r}.`],
    hints: () => ["Multiplying by 10 shifts the digits one place left — the decimal point appears to move right."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{decimal} x 10 = ?",
        "En agrandissant des {ctx} : combien fait {decimal} x 10 ?"
      ],
      explain: (v, r) => [`Multiplier par 10 décale chaque chiffre d'un rang vers la gauche : ${r}.`],
      hints: () => ["Multiplier par 10 décale les chiffres d'un rang vers la gauche."]
    },
    declaredVariationSpace: 999 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l4.roundDecimalToTwoPlaces", levelKey: "Y6L4", objectiveCode: "Y6-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 9999]], compute: (v) => Math.round(v[0]! / 10) / 100,
    derive: (v) => ({ decimal: (v[0]! / 1000).toFixed(3) }),
    promptTemplates: [
      "Round {decimal} to 2 decimal places.",
      "A reading of {ctx} shows {decimal}. Round it to 2 decimal places."
    ],
    explain: (v, r) => [`Look at the thousandths digit to decide.`, `${(v[0]! / 1000).toFixed(3)} rounds to ${r}.`],
    hints: () => ["Look at the third decimal place: 5 or more rounds up."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Arrondis {decimal} à 2 décimales.",
        "Un relevé {de:ctx} indique {decimal}. Arrondis-le à 2 décimales."
      ],
      explain: (v, r) => [`Regarde le chiffre des millièmes pour décider.`, `${(v[0]! / 1000).toFixed(3)} s'arrondit à ${r}.`],
      hints: () => ["Regarde la troisième décimale : 5 ou plus, on arrondit vers le haut."]
    },
    declaredVariationSpace: 9999
  }),
  arithmeticTemplate({
    key: "y6l4.mcDecimalPlaceValue", levelKey: "Y6L4", objectiveCode: "Y6-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["DECIMAL_PLACE_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1000, 9999]], compute: (v) => Math.floor(v[0]! / 10) % 10,
    derive: (v) => ({ decimal: (v[0]! / 1000).toFixed(3) }),
    promptTemplates: ["In {decimal}, which digit is in the hundredths place?"],
    explain: (v, r) => [`The second digit after the decimal point is ${r}.`],
    hints: () => ["Hundredths is the second place after the decimal point."],
    distractorSpread: 4,
    fr: {
      promptTemplates: ["Dans {decimal}, quel chiffre occupe la position des centièmes ?"],
      hints: () => ["Les centièmes, c'est la deuxième position après la virgule."]
    },
    declaredVariationSpace: 9000
  }),

  // --- Y6-L4-2: associate a fraction with division ---
  arithmeticTemplate({
    key: "y6l4.fractionAsDivisionDecimal", levelKey: "Y6L4", objectiveCode: "Y6-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DECIMAL_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[0, FRIENDLY_DENOMS.length - 1], [1, 49]],
    constraint: (v) => v[1]! < FRIENDLY_DENOMS[v[0]!]!,
    compute: (v) => v[1]! / FRIENDLY_DENOMS[v[0]!]!,
    derive: (v) => ({ den: FRIENDLY_DENOMS[v[0]!]! }),
    promptTemplates: [
      "Write {b}/{den} as a decimal.",
      "Measuring {ctx}: write {b}/{den} as a decimal."
    ],
    explain: (v, r) => [`A fraction means division: ${v[1]} ÷ ${FRIENDLY_DENOMS[v[0]!]} = ${r}.`],
    hints: () => ["A fraction bar means divide: numerator divided by denominator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Écris {b}/{den} sous forme décimale.",
        "En mesurant des {ctx} : écris {b}/{den} sous forme décimale."
      ],
      explain: (v, r) => [`Une fraction signifie une division : ${v[1]} ÷ ${FRIENDLY_DENOMS[v[0]!]} = ${r}.`],
      hints: () => ["La barre de fraction signifie diviser : numérateur divisé par dénominateur."]
    },
    declaredVariationSpace: 7 * 49 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l4.divisionAsDecimal", levelKey: "Y6L4", objectiveCode: "Y6-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DECIMAL_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 199], [2, 5]], compute: (v) => v[0]! / (v[1]! * 2),
    derive: (v) => ({ divisor: v[1]! * 2 }),
    promptTemplates: [
      "{a} ÷ {divisor} = ? (give your answer as a decimal)",
      "Splitting {ctx}: {a} ÷ {divisor} = ? (as a decimal)"
    ],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 2} = ${r}.`],
    hints: () => ["Divide, and write any remainder as a decimal part."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a} ÷ {divisor} = ? (donne ta réponse en décimal)",
        "En partageant des {ctx} : {a} ÷ {divisor} = ? (en décimal)"
      ],
      explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 2} = ${r}.`],
      hints: () => ["Divise, et écris le reste sous forme décimale."]
    },
    declaredVariationSpace: 199 * 4 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l4.mcFractionToDecimal", levelKey: "Y6L4", objectiveCode: "Y6-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_DECIMAL_CONVERSION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 24]], compute: (v) => v[0]! * 4,
    promptTemplates: ["What is {a}/25 as a decimal, written in hundredths (e.g. 0.36 entered as 36)?"],
    explain: (v, r) => [`${v[0]}/25 = ${r}/100.`],
    hints: () => ["Scale the fraction so the denominator is 100."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Combien fait {a}/25 en décimal, écrit en centièmes (ex. 0,36 entré comme 36) ?"],
      hints: () => ["Multiplie la fraction pour que le dénominateur devienne 100."]
    },
    declaredVariationSpace: 24
  }),
  arithmeticTemplate({
    key: "y6l4.wordProblemFractionDivision", levelKey: "Y6L4", objectiveCode: "Y6-L4-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_DECIMAL_CONVERSION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1, 99], [2, 8]], compute: (v) => v[0]! / (v[1]! * 2),
    derive: (v) => ({ people: v[1]! * 2 }),
    promptTemplates: ["{a} litres of liquid from the {ctx} is shared equally between {people} containers. How many litres does each hold, as a decimal?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 2} = ${r}.`],
    hints: () => ["Divide the total by the number of containers."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} litres provenant des {ctx} sont partagés également entre {people} récipients. Combien de litres chacun contient-il, en décimal ?"],
      explain: (v, r) => [`${v[0]} ÷ ${v[1]! * 2} = ${r}.`],
      hints: () => ["Divise le total par le nombre de récipients."]
    },
    declaredVariationSpace: 99 * 7 * CTX.length
  }),
  matchingTemplate({
    key: "y6l4.matchFractionsToDecimals", levelKey: "Y6L4", objectiveCode: "Y6-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DECIMAL_CONVERSION_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const den = rng.pick(FRIENDLY_DENOMS);
        const num = rng.int(1, den - 1);
        const key = `${num}/${den}`;
        const value = String(num / den);
        if (used.has(key) || pairs.some((p) => p.right === value)) continue;
        used.add(key);
        pairs.push({ left: key, right: value });
      }
      return pairs;
    },
    promptTemplates: ["Match each fraction to its decimal equivalent."],
    explain: () => ["Divide the numerator by the denominator to get the decimal."],
    hints: () => ["A fraction bar means divide."],
    fr: {
      promptTemplates: ["Associe chaque fraction à son équivalent décimal."],
      explain: () => ["Divise le numérateur par le dénominateur pour obtenir le décimal."],
      hints: () => ["La barre de fraction signifie diviser."]
    },
    declaredVariationSpace: 4000
  }),

  // --- Y6-L4-3: equivalences between fractions, decimals and percentages ---
  arithmeticTemplate({
    key: "y6l4.fractionToPercentage", levelKey: "Y6L4", objectiveCode: "Y6-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[0, FRIENDLY_DENOMS.length - 1], [1, 49]],
    constraint: (v) => v[1]! < FRIENDLY_DENOMS[v[0]!]! && ((v[1]! * 100) % FRIENDLY_DENOMS[v[0]!]!) === 0,
    compute: (v) => (v[1]! * 100) / FRIENDLY_DENOMS[v[0]!]!,
    derive: (v) => ({ den: FRIENDLY_DENOMS[v[0]!]! }),
    promptTemplates: [
      "Write {b}/{den} as a percentage. Give just the number.",
      "Recording {ctx}: write {b}/{den} as a percentage. Give just the number."
    ],
    explain: (v, r) => [`${v[1]}/${FRIENDLY_DENOMS[v[0]!]} = ${r}/100 = ${r}%.`],
    hints: () => ["Scale the fraction so the denominator becomes 100."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Écris {b}/{den} en pourcentage. Donne juste le nombre.",
        "En notant des {ctx} : écris {b}/{den} en pourcentage. Donne juste le nombre."
      ],
      explain: (v, r) => [`${v[1]}/${FRIENDLY_DENOMS[v[0]!]} = ${r}/100 = ${r} %.`],
      hints: () => ["Multiplie la fraction pour que le dénominateur devienne 100."]
    },
    declaredVariationSpace: 7 * 49 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l4.percentageOfAmount", levelKey: "Y6L4", objectiveCode: "Y6-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 99], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: [
      "What is {a}% of {base}?",
      "Of {base} {ctx}, what is {a}% of them?"
    ],
    explain: (v, r) => [`1% of ${v[1]! * 100} is ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Find 1% by dividing by 100, then multiply by the percentage."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Combien font {a} % de {base} ?",
        "Sur {base} {ctx}, combien cela fait-il pour {a} % d'entre eux ?"
      ],
      explain: (v, r) => [`1 % de ${v[1]! * 100} vaut ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Trouve 1 % en divisant par 100, puis multiplie par le pourcentage."]
    },
    declaredVariationSpace: 99 * 25 * (1 + CTX.length)
  }),
  categoricalPoolTemplate({
    key: "y6l4.mcEquivalences", levelKey: "Y6L4", objectiveCode: "Y6-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const table = [
        { f: "1/2", d: "0.5", p: "50%" }, { f: "1/4", d: "0.25", p: "25%" }, { f: "3/4", d: "0.75", p: "75%" },
        { f: "1/5", d: "0.2", p: "20%" }, { f: "2/5", d: "0.4", p: "40%" }, { f: "1/10", d: "0.1", p: "10%" },
        { f: "3/10", d: "0.3", p: "30%" }, { f: "1/20", d: "0.05", p: "5%" }, { f: "1/8", d: "0.125", p: "12.5%" }
      ];
      const chosen = table[rng.int(0, table.length - 1)]!;
      const askFor = rng.pick(["decimal", "percentage"]);
      const correct = askFor === "decimal" ? chosen.d : chosen.p;
      const others = table.filter((t) => t !== chosen).map((t) => (askFor === "decimal" ? t.d : t.p));
      return {
        prompt: `What is ${chosen.f} as a ${askFor}?`,
        correctLabel: correct,
        distractorLabels: rng.shuffle(others).slice(0, 2),
        explanationSteps: [`${chosen.f} = ${chosen.d} = ${chosen.p}.`],
        hints: ["Learn the common fraction, decimal and percentage equivalents by heart."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What is (\S+) as a (decimal|percentage)\?$/);
        if (!m) return {};
        const askFr = m[2] === "decimal" ? "nombre décimal" : "pourcentage";
        return { prompt: `Combien fait ${m[1]} en ${askFr} ?`, hints: ["Apprends par cœur les équivalences courantes entre fractions, décimaux et pourcentages."] };
      }
    },
    declaredVariationSpace: 400
  }),
  categoricalPoolTemplate({
    key: "y6l4.tfEquivalence", levelKey: "Y6L4", objectiveCode: "Y6-L4-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const den = rng.pick([4, 5, 10, 20, 25, 50]);
      const num = rng.int(1, den - 1);
      const correctPct = (num * 100) / den;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correctPct : correctPct + rng.int(1, 9);
      return {
        prompt: `${num}/${den} is equal to ${shown}%. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${num} ÷ ${den} x 100 = ${correctPct}%.`],
        hints: ["Convert the fraction to a percentage and compare."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) is equal to ([\d.]+)%\. True or false\?/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]}/${m[2]} est égal à ${m[3]} %. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Convertis la fraction en pourcentage et compare."]
        };
      }
    },
    declaredVariationSpace: 2000
  }),
  arithmeticTemplate({
    key: "y6l4.percentageWordProblem", levelKey: "Y6L4", objectiveCode: "Y6-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1, 95], [1, 20]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ total: v[1]! * 100 }),
    promptTemplates: ["A shop counts {total} {ctx}. {a}% of them are checked. How many are checked?"],
    explain: (v, r) => [`1% of ${v[1]! * 100} = ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Find one percent first, then scale up."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un magasin compte {total} {ctx}. {a} % d'entre eux sont vérifiés. Combien en vérifie-t-on ?"],
      explain: (v, r) => [`1 % de ${v[1]! * 100} = ${v[1]}.`, `${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Trouve d'abord un pour cent, puis multiplie."]
    },
    declaredVariationSpace: 95 * 20 * CTX.length
  })
];

export default level;
