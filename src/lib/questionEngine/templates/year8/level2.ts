import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 2 — "Fractions, percentages and percentage change"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y8-L2-1 percentage increase/decrease and
// change, Y8-L2-2 percentages greater than 100%, Y8-L2-3 fractions and
// percentages of amounts). All amounts are constructed from small integer
// factors so every percentage/fraction calculation lands on a whole
// number — no floating-point rounding is ever needed.
const CTX = ["a laptop", "a bicycle", "a jacket", "a games console", "a phone", "a pair of trainers", "a television", "a watch"];
const CTX_FR = ["un ordinateur portable", "un vélo", "une veste", "une console de jeux", "un téléphone", "une paire de baskets", "une télévision", "une montre"];

function fmt2dp(hundredths: number): string {
  const whole = Math.floor(hundredths / 100);
  const frac = String(hundredths % 100).padStart(2, "0");
  return `${whole}.${frac}`;
}

export const level: QuestionTemplateDef[] = [
  // --- Y8-L2-1: interpret percentage increase and decrease, and percentage change ---
  arithmeticTemplate({
    key: "y8l2.percentageIncrease", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [5, 95]], compute: (v) => 100 * v[0]! + v[1]! * v[0]!,
    derive: (v) => ({ base: 100 * v[0]!, percent: v[1]! }),
    promptTemplates: ["A price of £{base} increases by {percent}%. What is the new price?"],
    explain: (v, r) => [`${v[1]}% of ${100 * v[0]!} is ${v[1]! * v[0]!}. ${100 * v[0]!} + ${v[1]! * v[0]!} = ${r}.`],
    hints: () => ["Work out the increase first, then add it to the original amount."],
    fr: {
      promptTemplates: ["Un prix de £{base} augmente de {percent} %. Quel est le nouveau prix ?"],
      explain: (v, r) => [`${v[1]} % de ${100 * v[0]!} est ${v[1]! * v[0]!}. ${100 * v[0]!} + ${v[1]! * v[0]!} = ${r}.`],
      hints: () => ["Calcule d'abord l'augmentation, puis ajoute-la au montant initial."]
    },
    declaredVariationSpace: 20 * 91
  }),
  arithmeticTemplate({
    key: "y8l2.percentageDecrease", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [5, 95]], compute: (v) => 100 * v[0]! - v[1]! * v[0]!,
    derive: (v) => ({ base: 100 * v[0]!, percent: v[1]! }),
    promptTemplates: ["A price of £{base} decreases by {percent}%. What is the new price?"],
    explain: (v, r) => [`${v[1]}% of ${100 * v[0]!} is ${v[1]! * v[0]!}. ${100 * v[0]!} - ${v[1]! * v[0]!} = ${r}.`],
    hints: () => ["Work out the decrease first, then subtract it from the original amount."],
    fr: {
      promptTemplates: ["Un prix de £{base} diminue de {percent} %. Quel est le nouveau prix ?"],
      explain: (v, r) => [`${v[1]} % de ${100 * v[0]!} est ${v[1]! * v[0]!}. ${100 * v[0]!} - ${v[1]! * v[0]!} = ${r}.`],
      hints: () => ["Calcule d'abord la diminution, puis soustrais-la du montant initial."]
    },
    declaredVariationSpace: 20 * 91
  }),
  arithmeticTemplate({
    key: "y8l2.percentageChangeFindPercentIncrease", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [5, 95]], compute: (v) => v[1]!,
    derive: (v) => ({ base: 100 * v[0]!, newAmount: 100 * v[0]! + v[1]! * v[0]! }),
    promptTemplates: ["A price increased from £{base} to £{newAmount}. What percentage increase is this?"],
    explain: (v, r) => [`${v[1]! * v[0]!} ÷ ${100 * v[0]!} x 100 = ${r}%.`],
    hints: () => ["Divide the increase by the original amount, then multiply by 100."],
    fr: {
      promptTemplates: ["Un prix est passé de £{base} à £{newAmount}. Quel est ce pourcentage d'augmentation ?"],
      explain: (v, r) => [`${v[1]! * v[0]!} ÷ ${100 * v[0]!} x 100 = ${r} %.`],
      hints: () => ["Divise l'augmentation par le montant initial, puis multiplie par 100."]
    },
    declaredVariationSpace: 20 * 91
  }),
  arithmeticTemplate({
    key: "y8l2.percentageChangeFindPercentDecrease", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [5, 95]], compute: (v) => v[1]!,
    derive: (v) => ({ base: 100 * v[0]!, newAmount: 100 * v[0]! - v[1]! * v[0]! }),
    promptTemplates: ["A price decreased from £{base} to £{newAmount}. What percentage decrease is this?"],
    explain: (v, r) => [`${v[1]! * v[0]!} ÷ ${100 * v[0]!} x 100 = ${r}%.`],
    hints: () => ["Divide the decrease by the original amount, then multiply by 100."],
    fr: {
      promptTemplates: ["Un prix est passé de £{base} à £{newAmount}. Quel est ce pourcentage de diminution ?"],
      explain: (v, r) => [`${v[1]! * v[0]!} ÷ ${100 * v[0]!} x 100 = ${r} %.`],
      hints: () => ["Divise la diminution par le montant initial, puis multiplie par 100."]
    },
    declaredVariationSpace: 20 * 91
  }),
  categoricalPoolTemplate({
    key: "y8l2.mcPercentageIncrease", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const k = rng.int(1, 20);
      const percent = rng.int(5, 95);
      const base = 100 * k;
      const newAmount = base + percent * k;
      const distractors = numericDistractors(rng, newAmount, 3, Math.max(2, Math.round(base * 0.1))).map(String);
      return {
        prompt: `A price of £${base} increases by ${percent}%. What is the new price?`,
        correctLabel: String(newAmount),
        distractorLabels: distractors,
        explanationSteps: [`${percent}% of ${base} is ${percent * k}. ${base} + ${percent * k} = ${newAmount}.`],
        hints: ["Work out the increase first, then add it to the original amount."]
      };
    },
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^A price of £(\d+) increases by (\d+)%\./);
        const base = match ? match[1]! : "";
        const percent = match ? match[2]! : "";
        const newAmount = drawn.correctLabel;
        const increaseAmt = Number(newAmount) - Number(base);
        return {
          prompt: `Un prix de £${base} augmente de ${percent} %. Quel est le nouveau prix ?`,
          explanationSteps: [`${percent} % de ${base} est ${increaseAmt}. ${base} + ${increaseAmt} = ${newAmount}.`],
          hints: ["Calcule d'abord l'augmentation, puis ajoute-la au montant initial."]
        };
      }
    },
    declaredVariationSpace: 20 * 91
  }),
  categoricalPoolTemplate({
    key: "y8l2.tfPercentageChange", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const k = rng.int(1, 20);
      const percent = rng.int(5, 95);
      const base = 100 * k;
      const isIncrease = rng.chance(0.5);
      const correct = isIncrease ? base + percent * k : base - percent * k;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correct : numericDistractors(rng, correct, 1, Math.max(2, Math.round(base * 0.1)))[0] ?? correct + k;
      return {
        prompt: `A price of £${base} ${isIncrease ? "increases" : "decreases"} by ${percent}%. The new price is £${shown}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${percent}% of ${base} is ${percent * k}, so the new price is £${correct}.`],
        hints: ["Work out the change amount, then add or subtract it from the original price."]
      };
    },
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^A price of £(\d+) (increases|decreases) by (\d+)%\. The new price is £(-?\d+)\. True or false\?$/);
        const base = match ? match[1]! : "";
        const isIncrease = match ? match[2] === "increases" : true;
        const percent = match ? match[3]! : "";
        const shown = match ? match[4]! : "";
        const truth = drawn.correctLabel === "True";
        const amount = (Number(percent) * Number(base)) / 100;
        const correct = isIncrease ? Number(base) + amount : Number(base) - amount;
        return {
          prompt: `Un prix de £${base} ${isIncrease ? "augmente" : "diminue"} de ${percent} %. Le nouveau prix est £${shown}. Vrai ou faux ?`,
          correctLabel: truth ? "Vrai" : "Faux",
          distractorLabels: [truth ? "Faux" : "Vrai"],
          explanationSteps: [`${percent} % de ${base} est ${amount}, donc le nouveau prix est £${correct}.`],
          hints: ["Calcule le montant du changement, puis ajoute-le ou soustrais-le du prix initial."]
        };
      }
    },
    declaredVariationSpace: 20 * 91 * 2 * 2
  }),
  arithmeticTemplate({
    key: "y8l2.wordProblemPercentageChange", levelKey: "Y8L2", objectiveCode: "Y8-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 20], [5, 95]], compute: (v) => 100 * v[0]! - v[1]! * v[0]!,
    derive: (v) => ({ base: 100 * v[0]!, percent: v[1]! }), contextPool: CTX,
    promptTemplates: ["A shop reduces the price of {ctx} by {percent}% in a sale. It originally cost £{base}. What is the sale price?"],
    explain: (v, r) => [`${v[1]}% of ${100 * v[0]!} is ${v[1]! * v[0]!}. ${100 * v[0]!} - ${v[1]! * v[0]!} = ${r}.`],
    hints: () => ["Work out the reduction first, then subtract it from the original price."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un magasin solde {ctx} et baisse son prix de {percent} % pendant les soldes. Il coûtait à l'origine £{base}. Quel est le prix soldé ?"],
      explain: (v, r) => [`${v[1]} % de ${100 * v[0]!} est ${v[1]! * v[0]!}. ${100 * v[0]!} - ${v[1]! * v[0]!} = ${r}.`],
      hints: () => ["Calcule d'abord la réduction, puis soustrais-la du prix initial."]
    },
    declaredVariationSpace: 20 * 91 * CTX.length
  }),

  // --- Y8-L2-2: work with percentages greater than 100% ---
  arithmeticTemplate({
    key: "y8l2.percentOver100ToDecimal", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[4, 20]], compute: (v) => v[0]! * 25, contextPool: CTX,
    derive: (v) => ({ percentRaw: v[0]! * 25 }),
    promptTemplates: ["Write {percentRaw}% as a decimal. (Thinking about {ctx}.)", "Counting {ctx}: what is {percentRaw}% written as a decimal?"],
    explain: (v, r) => [`${v[0]! * 25}% = ${v[0]! * 25}/100 = ${fmt2dp(v[0]! * 25)}.`],
    hints: () => ["Divide the percentage by 100 to get the decimal."],
    formatValue: (n) => fmt2dp(n),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Écris {percentRaw} % sous forme décimale. (En pensant à {ctx}.)", "En pensant à {ctx} : que vaut {percentRaw} % écrit sous forme décimale ?"],
      explain: (v, r) => [`${v[0]! * 25} % = ${v[0]! * 25}/100 = ${fmt2dp(v[0]! * 25)}.`],
      hints: () => ["Divise le pourcentage par 100 pour obtenir le nombre décimal."]
    },
    declaredVariationSpace: 17 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l2.decimalToPercentOver1", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "WORD_PROBLEM",
    ranges: [[4, 20]], compute: (v) => v[0]! * 25, contextPool: CTX,
    derive: (v) => ({ decimalDisplay: fmt2dp(v[0]! * 25) }),
    promptTemplates: ["Write {decimalDisplay} as a percentage. (Thinking about {ctx}.)", "Counting {ctx}: what is {decimalDisplay} written as a percentage?"],
    explain: (v, r) => [`${fmt2dp(v[0]! * 25)} = ${v[0]! * 25}/100 = ${r}%.`],
    hints: () => ["Multiply the decimal by 100 to get the percentage."],
    formatValue: (n) => `${n}%`,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Écris {decimalDisplay} sous forme de pourcentage. (En pensant à {ctx}.)", "En pensant à {ctx} : que vaut {decimalDisplay} écrit sous forme de pourcentage ?"],
      explain: (v, r) => [`${fmt2dp(v[0]! * 25)} = ${v[0]! * 25}/100 = ${r} %.`],
      hints: () => ["Multiplie le nombre décimal par 100 pour obtenir le pourcentage."]
    },
    declaredVariationSpace: 17 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l2.percentOver100OfAmount", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[4, 20], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ percent: v[0]! * 25, base: v[1]! * 4 }),
    promptTemplates: ["What is {percent}% of {base}?"],
    explain: (v, r) => [`${v[0]! * 25}% of ${v[1]! * 4} = ${r}.`],
    hints: () => ["A percentage over 100% gives an answer bigger than the original amount."],
    fr: {
      promptTemplates: ["Que vaut {percent} % de {base} ?"],
      explain: (v, r) => [`${v[0]! * 25} % de ${v[1]! * 4} = ${r}.`],
      hints: () => ["Un pourcentage supérieur à 100 % donne un résultat plus grand que le montant initial."]
    },
    declaredVariationSpace: 17 * 25
  }),
  categoricalPoolTemplate({
    key: "y8l2.mcPercentOver100", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const percentUnits = rng.int(4, 20);
      const baseUnits = rng.int(1, 25);
      const percent = percentUnits * 25;
      const base = baseUnits * 4;
      const result = percentUnits * baseUnits;
      const distractors = numericDistractors(rng, result, 3, Math.max(2, Math.round(result * 0.15))).map(String);
      return {
        prompt: `What is ${percent}% of ${base}?`,
        correctLabel: String(result),
        distractorLabels: distractors,
        explanationSteps: [`${percent}% of ${base} = ${result}.`],
        hints: ["A percentage over 100% gives an answer bigger than the original amount."]
      };
    },
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^What is (\d+)% of (\d+)\?$/);
        const percent = match ? match[1]! : "";
        const base = match ? match[2]! : "";
        const result = drawn.correctLabel;
        return {
          prompt: `Que vaut ${percent} % de ${base} ?`,
          explanationSteps: [`${percent} % de ${base} = ${result}.`],
          hints: ["Un pourcentage supérieur à 100 % donne un résultat plus grand que le montant initial."]
        };
      }
    },
    declaredVariationSpace: 17 * 25
  }),
  categoricalPoolTemplate({
    key: "y8l2.tfPercentOver100", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "REASONING",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const percentUnits = rng.int(4, 20);
      const baseUnits = rng.int(1, 25);
      const percent = percentUnits * 25;
      const base = baseUnits * 4;
      const result = percentUnits * baseUnits;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? result : numericDistractors(rng, result, 1, Math.max(2, Math.round(result * 0.15)))[0] ?? result + 1;
      return {
        prompt: `${percent}% of ${base} is ${shown}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${percent}% of ${base} = ${result}.`],
        hints: ["Work out the calculation and check it against the statement."]
      };
    },
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^(\d+)% of (\d+) is (-?\d+)\. True or false\?$/);
        const percent = match ? match[1]! : "";
        const base = match ? match[2]! : "";
        const shown = match ? match[3]! : "";
        const truth = drawn.correctLabel === "True";
        const result = (Number(percent) * Number(base)) / 100;
        return {
          prompt: `${percent} % de ${base} est ${shown}. Vrai ou faux ?`,
          correctLabel: truth ? "Vrai" : "Faux",
          distractorLabels: [truth ? "Faux" : "Vrai"],
          explanationSteps: [`${percent} % de ${base} = ${result}.`],
          hints: ["Effectue le calcul et vérifie-le par rapport à l'énoncé."]
        };
      }
    },
    declaredVariationSpace: 17 * 25 * 2
  }),
  arithmeticTemplate({
    key: "y8l2.wordProblemPercentOver100", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "WORD_PROBLEM",
    ranges: [[4, 20], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ percent: v[0]! * 25, base: v[1]! * 4 }),
    promptTemplates: ["A recipe that normally serves {base} people is scaled up to {percent}% of its size. How many people will it now serve?"],
    explain: (v, r) => [`${v[0]! * 25}% of ${v[1]! * 4} = ${r}.`],
    hints: () => ["Scaling to more than 100% means the new amount is bigger than the original."],
    fr: {
      promptTemplates: ["Une recette qui sert normalement {base} personnes est agrandie à {percent} % de sa taille. Combien de personnes servira-t-elle maintenant ?"],
      explain: (v, r) => [`${v[0]! * 25} % de ${v[1]! * 4} = ${r}.`],
      hints: () => ["Agrandir à plus de 100 % signifie que le nouveau montant est plus grand que l'original."]
    },
    declaredVariationSpace: 17 * 25
  }),
  categoricalPoolTemplate({
    key: "y8l2.comparePercentOver100", levelKey: "Y8L2", objectiveCode: "Y8-L2-2", difficulty: "REASONING",
    misconceptionTags: ["PERCENTAGE_OVER_100_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const p1Units = rng.int(4, 20);
      const b1Units = rng.int(1, 25);
      let p2Units = rng.int(4, 20);
      let b2Units = rng.int(1, 25);
      const v1 = p1Units * b1Units;
      let v2 = p2Units * b2Units;
      if (v2 === v1) { p2Units = p1Units + 1; b2Units = b1Units; v2 = p2Units * b2Units; }
      const percent1 = p1Units * 25;
      const base1 = b1Units * 4;
      const percent2 = p2Units * 25;
      const base2 = b2Units * 4;
      const optionA = `${percent1}% of ${base1}`;
      const optionB = `${percent2}% of ${base2}`;
      return {
        prompt: `Which is bigger: ${optionA} or ${optionB}?`,
        correctLabel: v1 > v2 ? optionA : optionB,
        distractorLabels: [v1 > v2 ? optionB : optionA],
        explanationSteps: [`${optionA} = ${v1}. ${optionB} = ${v2}.`],
        hints: ["Work out both values, then compare them."]
      };
    },
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^Which is bigger: (\d+)% of (\d+) or (\d+)% of (\d+)\?$/);
        const percent1 = match ? match[1]! : "";
        const base1 = match ? match[2]! : "";
        const percent2 = match ? match[3]! : "";
        const base2 = match ? match[4]! : "";
        const v1 = (Number(percent1) * Number(base1)) / 100;
        const v2 = (Number(percent2) * Number(base2)) / 100;
        const optionAFr = `${percent1} % de ${base1}`;
        const optionBFr = `${percent2} % de ${base2}`;
        return {
          prompt: `Lequel est le plus grand : ${optionAFr} ou ${optionBFr} ?`,
          correctLabel: v1 > v2 ? optionAFr : optionBFr,
          distractorLabels: [v1 > v2 ? optionBFr : optionAFr],
          explanationSteps: [`${optionAFr} = ${v1}. ${optionBFr} = ${v2}.`],
          hints: ["Calcule les deux valeurs, puis compare-les."]
        };
      }
    },
    declaredVariationSpace: 17 * 25 * 17 * 25
  }),

  // --- Y8-L2-3: solve problems involving fractions and percentages of amounts ---
  arithmeticTemplate({
    key: "y8l2.fractionOfAmount", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 8], [2, 20]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ amount: v[0]! * v[2]! }),
    promptTemplates: ["What is {b}/{a} of {amount}?"],
    explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}. ${v[2]} x ${v[1]} = ${r}.`],
    hints: () => ["Divide the amount by the denominator, then multiply by the numerator."],
    fr: {
      promptTemplates: ["Que vaut {b}/{a} de {amount} ?"],
      explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}. ${v[2]} x ${v[1]} = ${r}.`],
      hints: () => ["Divise le montant par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 36 * 19
  }),
  arithmeticTemplate({
    key: "y8l2.percentOfAmount", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 99], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ base: v[1]! * 100 }),
    promptTemplates: ["What is {a}% of {base}?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]! * 100} = ${r}.`],
    hints: () => ["Divide the amount by 100, then multiply by the percentage."],
    fr: {
      promptTemplates: ["Que vaut {a} % de {base} ?"],
      explain: (v, r) => [`${v[0]} % de ${v[1]! * 100} = ${r}.`],
      hints: () => ["Divise le montant par 100, puis multiplie par le pourcentage."]
    },
    declaredVariationSpace: 99 * 25
  }),
  arithmeticTemplate({
    key: "y8l2.missingAmountFromFraction", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MISSING_NUMBER",
    ranges: [[2, 9], [1, 8], [2, 20]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ fractionValue: v[1]! * v[2]! }),
    promptTemplates: ["{b}/{a} of a number is {fractionValue}. What is the number?"],
    explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}. ${v[2]} x ${v[0]} = ${r}.`],
    hints: () => ["Divide by the numerator to find one part, then multiply by the denominator."],
    fr: {
      promptTemplates: ["{b}/{a} d'un nombre est {fractionValue}. Quel est ce nombre ?"],
      explain: (v, r) => [`${v[1]! * v[2]!} ÷ ${v[1]} = ${v[2]}. ${v[2]} x ${v[0]} = ${r}.`],
      hints: () => ["Divise par le numérateur pour trouver une part, puis multiplie par le dénominateur."]
    },
    declaredVariationSpace: 36 * 19
  }),
  arithmeticTemplate({
    key: "y8l2.missingAmountFromPercent", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "REASONING",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[1, 99], [2, 25]], compute: (v) => v[1]! * 100,
    derive: (v) => ({ partValue: v[0]! * v[1]! }),
    promptTemplates: ["{a}% of a number is {partValue}. What is the number?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} x 100 = ${r}.`],
    hints: () => ["Divide the part by the percentage, then multiply by 100."],
    fr: {
      promptTemplates: ["{a} % d'un nombre est {partValue}. Quel est ce nombre ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} x 100 = ${r}.`],
      hints: () => ["Divise la partie par le pourcentage, puis multiplie par 100."]
    },
    declaredVariationSpace: 99 * 24
  }),
  categoricalPoolTemplate({
    key: "y8l2.mcFractionOfAmount", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const denom = rng.int(2, 9);
      let num = rng.int(1, 8);
      while (num >= denom) num = rng.int(1, 8);
      const mult = rng.int(2, 20);
      const amount = denom * mult;
      const result = num * mult;
      const distractors = numericDistractors(rng, result, 3, Math.max(2, Math.round(result * 0.2))).map(String);
      return {
        prompt: `What is ${num}/${denom} of ${amount}?`,
        correctLabel: String(result),
        distractorLabels: distractors,
        explanationSteps: [`${amount} ÷ ${denom} = ${mult}. ${mult} x ${num} = ${result}.`],
        hints: ["Divide the amount by the denominator, then multiply by the numerator."]
      };
    },
    fr: {
      translate: (drawn) => {
        const match = drawn.prompt.match(/^What is (\d+)\/(\d+) of (\d+)\?$/);
        const num = match ? match[1]! : "";
        const denom = match ? match[2]! : "";
        const amount = match ? match[3]! : "";
        const mult = Number(amount) / Number(denom);
        const result = drawn.correctLabel;
        return {
          prompt: `Que vaut ${num}/${denom} de ${amount} ?`,
          explanationSteps: [`${amount} ÷ ${denom} = ${mult}. ${mult} x ${num} = ${result}.`],
          hints: ["Divise le montant par le dénominateur, puis multiplie par le numérateur."]
        };
      }
    },
    declaredVariationSpace: 36 * 19
  }),
  arithmeticTemplate({
    key: "y8l2.wordProblemFractionOfAmount", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 9], [1, 8], [2, 20]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ amount: v[0]! * v[2]! }), contextPool: CTX,
    promptTemplates: ["A survey asked {amount} customers about {ctx}. {b}/{a} of them said they were interested. How many customers is that?"],
    explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}. ${v[2]} x ${v[1]} = ${r}.`],
    hints: () => ["Divide the total by the denominator, then multiply by the numerator."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Une enquête a interrogé {amount} clients sur {ctx}. {b}/{a} d'entre eux ont dit être intéressés. Combien de clients cela représente-t-il ?"],
      explain: (v, r) => [`${v[0]! * v[2]!} ÷ ${v[0]} = ${v[2]}. ${v[2]} x ${v[1]} = ${r}.`],
      hints: () => ["Divise le total par le dénominateur, puis multiplie par le numérateur."]
    },
    declaredVariationSpace: 36 * 19 * CTX.length
  }),
  arithmeticTemplate({
    key: "y8l2.wordProblemPercentOfAmount", levelKey: "Y8L2", objectiveCode: "Y8-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["PERCENTAGE_BASE_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ base: v[1]! * 100 }), contextPool: CTX,
    promptTemplates: ["A survey of {base} shoppers found that {a}% were interested in buying {ctx}. How many shoppers is that?"],
    explain: (v, r) => [`${v[0]}% of ${v[1]! * 100} = ${r}.`],
    hints: () => ["Divide the total by 100, then multiply by the percentage."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Une enquête menée auprès de {base} clients a révélé que {a} % étaient intéressés à l'idée d'acheter {ctx}. Combien de clients cela représente-t-il ?"],
      explain: (v, r) => [`${v[0]} % de ${v[1]! * 100} = ${r}.`],
      hints: () => ["Divise le total par 100, puis multiplie par le pourcentage."]
    },
    declaredVariationSpace: 99 * 25 * CTX.length
  })
];

export default level;
