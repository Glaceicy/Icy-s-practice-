import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 4 — "Decimals, percentages and conversions"
const CITIES = ["London", "Edinburgh", "Manchester", "Cardiff", "Belfast", "Leeds", "Bristol", "York"];
const FRIENDLY_DENOMS = [4, 5, 10, 20, 25, 50];

export const level: QuestionTemplateDef[] = [
  // --- Y7-L4-1: move fluently between fractions, decimals and percentages ---
  arithmeticTemplate({
    key: "y7l4.fractionToPercentage", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[0, 5], [1, 49]], constraint: (v) => v[1]! < FRIENDLY_DENOMS[v[0]!]!,
    compute: (v) => (v[1]! * 100) / FRIENDLY_DENOMS[v[0]!]!,
    derive: (v) => ({ den: FRIENDLY_DENOMS[v[0]!]! }),
    promptTemplates: ["{b}/{den} as a percentage is ?%", "Convert {b}/{den} to a percentage."],
    explain: (v, r) => [`${v[1]}/${FRIENDLY_DENOMS[v[0]!]} = ${r}/100 = ${r}%.`],
    hints: () => ["Scale the fraction up so the denominator is 100."],
    fr: {
      promptTemplates: ["{b}/{den} en pourcentage est ?%", "Convertis {b}/{den} en pourcentage."],
      hints: () => ["Multiplie la fraction pour que le dénominateur devienne 100."]
    },
    declaredVariationSpace: 6 * 49 * 2
  }),
  arithmeticTemplate({
    key: "y7l4.percentageToDecimal", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]! / 100,
    promptTemplates: ["{a}% as a decimal is ?", "Convert {a}% to a decimal."],
    explain: (v, r) => [`${v[0]}% = ${v[0]} ÷ 100 = ${r}.`],
    hints: () => ["Divide the percentage by 100."],
    fr: {
      promptTemplates: ["{a} % en décimal est ?", "Convertis {a} % en décimal."],
      hints: () => ["Divise le pourcentage par 100."]
    },
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y7l4.decimalToPercentage", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ decimal: (v[0]! / 100).toFixed(2) }),
    promptTemplates: ["{decimal} as a percentage is ?%", "Convert {decimal} to a percentage."],
    explain: (v, r) => [`${(v[0]! / 100).toFixed(2)} x 100 = ${r}%.`],
    hints: () => ["Multiply the decimal by 100."],
    fr: {
      promptTemplates: ["{decimal} en pourcentage est ?%", "Convertis {decimal} en pourcentage."],
      hints: () => ["Multiplie le nombre décimal par 100."]
    },
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y7l4.mcFractionToDecimal", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 24]], compute: (v) => v[0]! * 4,
    promptTemplates: ["What is {a}/25 as a decimal, written as hundredths (e.g. 0.37 entered as 37)?"],
    explain: (v, r) => [`${v[0]}/25 = ${v[0]! * 4}/100.`],
    hints: () => ["Scale the fraction so the denominator is 100, then read off the hundredths."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Combien fait {a}/25 en décimal, écrit en centièmes (ex. 0,37 entré comme 37) ?"],
      hints: () => ["Multiplie la fraction pour que le dénominateur devienne 100, puis lis les centièmes."]
    },
    declaredVariationSpace: 24
  }),
  arithmeticTemplate({
    key: "y7l4.mcPercentageToDecimal", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ pctDecimal: (v[0]! / 100).toFixed(2) }),
    promptTemplates: ["{a}% as a decimal, written as hundredths (e.g. 0.37 entered as 37), is?"],
    explain: (v, r) => [`${v[0]}% = ${(v[0]! / 100).toFixed(2)}.`],
    hints: () => ["Divide the percentage by 100."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["{a} % en décimal, écrit en centièmes (ex. 0,37 entré comme 37), est ?"],
      hints: () => ["Divise le pourcentage par 100."]
    },
    declaredVariationSpace: 198
  }),
  arithmeticTemplate({
    key: "y7l4.wordProblemDecimalToPercentage", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]!, contextPool: CITIES,
    derive: (v) => ({ decimal: (v[0]! / 100).toFixed(2) }),
    promptTemplates: ["In {ctx}, a survey shows a decimal score of {decimal}. What percentage is that?"],
    explain: (v, r) => [`${(v[0]! / 100).toFixed(2)} x 100 = ${r}%.`],
    hints: () => ["Multiply the decimal by 100 to get a percentage."],
    fr: {
      contextPool: CITIES,
      promptTemplates: ["À {ctx}, un sondage montre un score décimal de {decimal}. Quel pourcentage cela représente-t-il ?"],
      hints: () => ["Multiplie le nombre décimal par 100 pour obtenir un pourcentage."]
    },
    declaredVariationSpace: 99 * CITIES.length
  }),
  categoricalPoolTemplate({
    key: "y7l4.matchEquivalentForms", levelKey: "Y7L4", objectiveCode: "Y7-L4-1", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_PERCENT_CONVERSION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const quarters = [{ f: "1/4", d: "0.25", p: "25%" }, { f: "1/2", d: "0.5", p: "50%" }, { f: "3/4", d: "0.75", p: "75%" }, { f: "1/5", d: "0.2", p: "20%" }, { f: "1/10", d: "0.1", p: "10%" }, { f: "1/20", d: "0.05", p: "5%" }];
      const chosen = quarters[rng.int(0, quarters.length - 1)]!;
      const askFor = rng.pick(["decimal", "percentage"]);
      const correct = askFor === "decimal" ? chosen.d : chosen.p;
      const others = quarters.filter((q) => q !== chosen).map((q) => (askFor === "decimal" ? q.d : q.p));
      const distractors = rng.shuffle(others).slice(0, 2);
      return {
        prompt: `What is ${chosen.f} as a ${askFor}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${chosen.f} is equivalent to ${chosen.d} and ${chosen.p}.`],
        hints: ["Learn the common fraction/decimal/percentage equivalents by heart."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What is (\S+) as a (decimal|percentage)\?/);
        if (!m) return {};
        const askFr = m[2] === "decimal" ? "nombre décimal" : "pourcentage";
        return { prompt: `Combien fait ${m[1]} en ${askFr} ?`, hints: ["Apprends par cœur les équivalences courantes entre fractions, décimaux et pourcentages."] };
      }
    },
    declaredVariationSpace: 300
  }),

  // --- Y7-L4-2: interpret percentages, percentage increase and decrease ---
  arithmeticTemplate({
    key: "y7l4.percentageIncrease", levelKey: "Y7L4", objectiveCode: "Y7-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 20]], compute: (v) => v[1]! * (100 + v[0]!),
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["Increase {base} by {a}%. What is the new value?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]! * 100} = ${v[0]! * v[1]!}.`, `${v[1]! * 100} + ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Find the percentage of the amount first, then add it on."],
    fr: {
      promptTemplates: ["Augmente {base} de {a} %. Quelle est la nouvelle valeur ?"],
      hints: () => ["Calcule d'abord le pourcentage du montant, puis ajoute-le."]
    },
    declaredVariationSpace: 50 * 20
  }),
  arithmeticTemplate({
    key: "y7l4.percentageDecrease", levelKey: "Y7L4", objectiveCode: "Y7-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 20]], compute: (v) => v[1]! * (100 - v[0]!),
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["Decrease {base} by {a}%. What is the new value?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]! * 100} = ${v[0]! * v[1]!}.`, `${v[1]! * 100} - ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Find the percentage of the amount first, then subtract it."],
    fr: {
      promptTemplates: ["Diminue {base} de {a} %. Quelle est la nouvelle valeur ?"],
      hints: () => ["Calcule d'abord le pourcentage du montant, puis soustrais-le."]
    },
    declaredVariationSpace: 50 * 20
  }),
  arithmeticTemplate({
    key: "y7l4.mcPercentageIncrease", levelKey: "Y7L4", objectiveCode: "Y7-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20], [10, 100]], constraint: (v) => (v[0]! * v[1]!) % 100 === 0,
    compute: (v) => v[1]! + (v[0]! * v[1]!) / 100,
    promptTemplates: ["What is {b} increased by {a}%?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]} = ${(v[0]! * v[1]!) / 100}, so the new value is ${r}.`],
    hints: () => ["Add the percentage amount onto the original value."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Combien vaut {b} augmenté de {a} % ?"],
      hints: () => ["Ajoute le montant du pourcentage à la valeur initiale."]
    },
    declaredVariationSpace: 400
  }),
  categoricalPoolTemplate({
    key: "y7l4.tfPercentageChange", levelKey: "Y7L4", objectiveCode: "Y7-L4-2", difficulty: "REASONING",
    misconceptionTags: ["PERCENTAGE_CHANGE_ERROR"], type: "TRUE_FALSE",
    pools: { direction: ["increased", "decreased"] },
    build: (picked, rng) => {
      const pct = rng.int(1, 20) * 5;
      const base = rng.int(2, 20) * 20;
      const change = (pct * base) / 100;
      const correct = picked.direction === "increased" ? base + change : base - change;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correct : correct + rng.int(1, 10);
      return {
        prompt: `${base} ${picked.direction} by ${pct}% is ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${pct}% of ${base} = ${change}.`, `${base} ${picked.direction === "increased" ? "+" : "-"} ${change} = ${correct}.`],
        hints: ["Work out the percentage amount, then add or subtract it as the question says."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^(\d+) \S+ by (\d+)% is (\d+)\. True or false\?/);
        if (!m) return {};
        const base = m[1]!, pct = m[2]!, shown = m[3]!;
        const dirFr = picked.direction === "increased" ? "augmenté" : "diminué";
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${base} ${dirFr} de ${pct} % égale ${shown}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Calcule le montant du pourcentage, puis ajoute-le ou soustrais-le selon la question."]
        };
      }
    },
    declaredVariationSpace: 800
  }),

  // --- Y7-L4-3: define percentage as parts per hundred; express one quantity as % of another ---
  arithmeticTemplate({
    key: "y7l4.expressAsPercentageOf", levelKey: "Y7L4", objectiveCode: "Y7-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_DEFINITION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [1, 20]], constraint: (v) => v[0]! <= v[1]!,
    compute: (v) => Math.round((v[0]! / v[1]!) * 100),
    derive: (v) => ({ total: v[1]! * 5 }),
    promptTemplates: ["{a} out of {b} as a percentage is ?%", "Express {a} out of {b} as a percentage."],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} x 100 = ${r}%.`],
    hints: () => ["Divide the part by the whole, then multiply by 100."],
    fr: {
      promptTemplates: ["{a} sur {b} en pourcentage est ?%", "Exprime {a} sur {b} en pourcentage."],
      hints: () => ["Divise la partie par le tout, puis multiplie par 100."]
    },
    declaredVariationSpace: 400
  }),
  arithmeticTemplate({
    key: "y7l4.partsPerHundredDefinition", levelKey: "Y7L4", objectiveCode: "Y7-L4-3", difficulty: "FLUENCY",
    misconceptionTags: ["PERCENTAGE_DEFINITION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    promptTemplates: ["{a}% means how many parts out of 100?", "In {a}%, how many parts per hundred are there?"],
    explain: (v, r) => [`Percent means "per hundred", so ${v[0]}% is ${r} parts out of 100.`],
    hints: () => ["'Per cent' literally means 'per hundred'."],
    fr: {
      promptTemplates: ["{a} % signifie combien de parties sur 100 ?", "Dans {a} %, combien y a-t-il de parties par centaine ?"],
      hints: () => ["« Pour cent » signifie littéralement « pour cent »."]
    },
    declaredVariationSpace: 198
  }),
  arithmeticTemplate({
    key: "y7l4.wordProblemPercentageOf", levelKey: "Y7L4", objectiveCode: "Y7-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_DEFINITION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 20], [1, 20]], constraint: (v) => v[0]! <= v[1]!, contextPool: CITIES,
    compute: (v) => Math.round((v[0]! / v[1]!) * 100),
    derive: (v) => ({ total: v[1]! * 5 }),
    promptTemplates: ["In {ctx}, {a} out of every {b} students walk to school. What percentage is that?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} x 100 = ${r}%.`],
    hints: () => ["Divide the part by the whole, then multiply by 100."],
    fr: {
      promptTemplates: ["À {ctx}, {a} élèves sur {b} vont à l'école à pied. Quel pourcentage cela représente-t-il ?"],
      hints: () => ["Divise la partie par le tout, puis multiplie par 100."]
    },
    declaredVariationSpace: 400 * CITIES.length
  }),
  arithmeticTemplate({
    key: "y7l4.mcExpressAsPercentageOf", levelKey: "Y7L4", objectiveCode: "Y7-L4-3", difficulty: "REASONING",
    misconceptionTags: ["PERCENTAGE_DEFINITION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20], [1, 20]], constraint: (v) => v[0]! <= v[1]!,
    compute: (v) => Math.round((v[0]! / v[1]!) * 100),
    promptTemplates: ["What percentage is {a} out of {b}?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} x 100 = ${r}%.`],
    hints: () => ["Divide the part by the whole, then multiply by 100."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Quel pourcentage représente {a} sur {b} ?"],
      hints: () => ["Divise la partie par le tout, puis multiplie par 100."]
    },
    declaredVariationSpace: 400
  })
];

export default level;
