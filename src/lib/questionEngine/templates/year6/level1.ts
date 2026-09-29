import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 1 — "Place value, rounding and negative numbers"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y6-L1-1 place value/ordering to
// 10,000,000, Y6-L1-2 rounding to any degree of accuracy, Y6-L1-3
// negative numbers in context and intervals across zero).
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];
const CTX_FR = ["personnes", "arbres", "livres", "billets", "briques", "graines", "pièces", "étoiles"];
const EVENTS = [
  "a music festival", "a stadium concert", "a charity marathon", "an air show",
  "a national park", "a theme park", "a fireworks display", "a food festival"
];
const EVENTS_FR = [
  "un festival de musique", "un concert dans un stade", "un marathon caritatif", "un meeting aérien",
  "un parc national", "un parc d'attractions", "un feu d'artifice", "un festival gastronomique"
];
const CITIES = ["London", "Edinburgh", "Manchester", "Cardiff", "Belfast", "Leeds", "Bristol", "York"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L1-1: read, write, order and compare numbers up to 10,000,000 ---
  arithmeticTemplate({
    key: "y6l1.millionsDigit", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000000, 9999999]], compute: (v) => Math.floor(v[0]! / 1000000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many millions are there?",
      "What is the value of the millions digit in {a}?",
      "Counting {ctx}: how many millions are in {a}?"
    ],
    explain: (v, r) => [`${v[0]} has ${r} million(s), then the rest splits into hundred thousands, ten thousands, thousands, hundreds, tens and ones.`],
    hints: () => ["The millions digit is the very first digit of a seven-digit number."],
    declaredVariationSpace: 9000000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Dans le nombre {a}, combien y a-t-il de millions ?",
        "Quelle est la valeur du chiffre des millions dans {a} ?",
        "En comptant les {ctx} : combien de millions y a-t-il dans {a} ?"
      ],
      explain: (v, r) => [`${v[0]} a ${r} million(s), puis le reste se répartit en centaines de mille, dizaines de mille, milliers, centaines, dizaines et unités.`],
      hints: () => ["Le chiffre des millions est le tout premier chiffre d'un nombre à sept chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.hundredThousandsDigit7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000000, 9999999]], compute: (v) => Math.floor((v[0]! % 1000000) / 100000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many hundred thousands are there?",
      "What is the value of the hundred-thousands digit in {a}?",
      "Counting {ctx}: how many hundred thousands are in {a}?"
    ],
    explain: (v, r) => [`The hundred-thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The hundred-thousands digit is the second digit of a seven-digit number."],
    declaredVariationSpace: 9000000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Dans le nombre {a}, combien y a-t-il de centaines de mille ?",
        "Quelle est la valeur du chiffre des centaines de mille dans {a} ?",
        "En comptant les {ctx} : combien de centaines de mille y a-t-il dans {a} ?"
      ],
      explain: (v, r) => [`Le chiffre des centaines de mille de ${v[0]} est ${r}.`],
      hints: () => ["Le chiffre des centaines de mille est le deuxième chiffre d'un nombre à sept chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.tenThousandsDigit7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000000, 9999999]], compute: (v) => Math.floor((v[0]! % 100000) / 10000), contextPool: CTX,
    promptTemplates: [
      "In the number {a}, how many ten thousands are there?",
      "What is the value of the ten-thousands digit in {a}?",
      "Counting {ctx}: how many ten thousands are in {a}?"
    ],
    explain: (v, r) => [`The ten-thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The ten-thousands digit is the third digit of a seven-digit number."],
    declaredVariationSpace: 9000000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Dans le nombre {a}, combien y a-t-il de dizaines de mille ?",
        "Quelle est la valeur du chiffre des dizaines de mille dans {a} ?",
        "En comptant les {ctx} : combien de dizaines de mille y a-t-il dans {a} ?"
      ],
      explain: (v, r) => [`Le chiffre des dizaines de mille de ${v[0]} est ${r}.`],
      hints: () => ["Le chiffre des dizaines de mille est le troisième chiffre d'un nombre à sept chiffres."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.compareBigger7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1000000, 9999999], [1000000, 9999999]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare digit by digit from the left (millions first). ${r} is bigger.`],
    hints: () => ["Compare the millions digit first, then work right one place at a time."],
    distractorSpread: 200000,
    declaredVariationSpace: 500000000,
    fr: {
      promptTemplates: ["Quel nombre est le plus grand, {a} ou {b} ?"],
      explain: (v, r) => [`Compare chiffre par chiffre en partant de la gauche (millions d'abord). ${r} est le plus grand.`],
      hints: () => ["Compare d'abord le chiffre des millions, puis avance vers la droite, une position à la fois."]
    }
  }),
  orderingTemplate({
    key: "y6l1.orderAscending7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1000000, 9999999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the millions digit first, then work right one place at a time."],
    hints: () => ["Which number has the smallest millions digit?"],
    declaredVariationSpace: 9000000,
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Compare d'abord le chiffre des millions, puis avance vers la droite, une position à la fois."],
      hints: () => ["Quel nombre a le plus petit chiffre des millions ?"]
    }
  }),
  orderingTemplate({
    key: "y6l1.orderDescending7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(100000, 9999999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["A number with more digits is always bigger. If two numbers have the same number of digits, compare digit by digit from the left."],
    hints: () => ["Count the digits first — more digits means a bigger number."],
    declaredVariationSpace: 9900000,
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus grand au plus petit."],
      explain: () => ["Un nombre avec plus de chiffres est toujours plus grand. Si deux nombres ont le même nombre de chiffres, compare-les chiffre par chiffre en partant de la gauche."],
      hints: () => ["Compte d'abord les chiffres — plus il y en a, plus le nombre est grand."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.oneMoreToTenMillion", levelKey: "Y6L1", objectiveCode: "Y6-L1-1", difficulty: "REASONING",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999999]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What is one more than {a}?", "{a} + 1 = ?", "Counting {ctx}: one more than {a} is?"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Add 1 — watch for digits that carry over (e.g. 9,999,999 + 1 = 10,000,000)."],
    declaredVariationSpace: 9999999 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel est le nombre juste après {a} ?", "{a} + 1 = ?", "En comptant les {ctx} : quel est le nombre juste après {a} ?"],
      explain: (v, r) => [`Le nombre juste après ${v[0]} est ${r}.`],
      hints: () => ["Ajoute 1 — attention aux chiffres qui se propagent (par exemple 9 999 999 + 1 = 10 000 000)."]
    }
  }),

  // --- Y6-L1-2: round any whole number to a required degree of accuracy ---
  arithmeticTemplate({
    key: "y6l1.roundNearest1000_7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999500]], compute: (v) => Math.round(v[0]! / 1000) * 1000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 1,000.", "What is {a} rounded to the nearest 1,000?", "Counting {ctx}: round {a} to the nearest 1,000."],
    explain: (v, r) => [`Look at the hundreds digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 1,000.`],
    hints: () => ["If the hundreds digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9999500 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Arrondis {a} au millier près.", "Combien fait {a} arrondi au millier près ?", "En comptant les {ctx} : arrondis {a} au millier près."],
      explain: (v, r) => [`Regarde le chiffre des centaines de ${v[0]}.`, `${v[0]} arrondi au millier près donne ${r}.`],
      hints: () => ["Si le chiffre des centaines est 5 ou plus, arrondis vers le haut ; sinon vers le bas."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.roundNearest100000_7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9950000]], compute: (v) => Math.round(v[0]! / 100000) * 100000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 100,000.", "What is {a} rounded to the nearest 100,000?", "Counting {ctx}: round {a} to the nearest 100,000."],
    explain: (v, r) => [`Look at the ten-thousands digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 100,000.`],
    hints: () => ["If the ten-thousands digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9950000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Arrondis {a} à la centaine de mille près.", "Combien fait {a} arrondi à la centaine de mille près ?", "En comptant les {ctx} : arrondis {a} à la centaine de mille près."],
      explain: (v, r) => [`Regarde le chiffre des dizaines de mille de ${v[0]}.`, `${v[0]} arrondi à la centaine de mille près donne ${r}.`],
      hints: () => ["Si le chiffre des dizaines de mille est 5 ou plus, arrondis vers le haut ; sinon vers le bas."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.roundNearestMillion", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9500000]], compute: (v) => Math.round(v[0]! / 1000000) * 1000000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest million.", "What is {a} rounded to the nearest 1,000,000?", "Counting {ctx}: round {a} to the nearest million."],
    explain: (v, r) => [`Look at the hundred-thousands digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest million.`],
    hints: () => ["If the hundred-thousands digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9500000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Arrondis {a} au million près.", "Combien fait {a} arrondi au million près ?", "En comptant les {ctx} : arrondis {a} au million près."],
      explain: (v, r) => [`Regarde le chiffre des centaines de mille de ${v[0]}.`, `${v[0]} arrondi au million près donne ${r}.`],
      hints: () => ["Si le chiffre des centaines de mille est 5 ou plus, arrondis vers le haut ; sinon vers le bas."]
    }
  }),
  categoricalPoolTemplate({
    key: "y6l1.mcRoundAnyDegree", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const unit = rng.pick([10, 100, 1000, 10000, 100000, 1000000]);
      const n = rng.int(1, 9999999);
      const rounded = Math.round(n / unit) * unit;
      const unitLabel = unit === 1000000 ? "million" : unit.toLocaleString("en-GB");
      const distractors = numericDistractors(rng, rounded, 3, unit).map((d) => d.toLocaleString("en-GB"));
      return {
        prompt: `What is ${n.toLocaleString("en-GB")} rounded to the nearest ${unitLabel}?`,
        correctLabel: rounded.toLocaleString("en-GB"),
        distractorLabels: distractors,
        explanationSteps: [`${n.toLocaleString("en-GB")} rounds to ${rounded.toLocaleString("en-GB")} to the nearest ${unitLabel}.`],
        hints: ["Look at the digit one place smaller than the rounding unit to decide whether to round up or down."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What is ([\d,]+) rounded to the nearest (.+)\?$/);
        const n = m ? m[1] : "";
        const unitLabel = m ? m[2] : "";
        const phrase = unitLabel === "million" ? "au million près" : `à ${unitLabel} près`;
        return {
          prompt: `Combien fait ${n} arrondi ${phrase} ?`,
          explanationSteps: [`${n} arrondi ${phrase} donne ${drawn.correctLabel}.`],
          hints: ["Regarde le chiffre juste à droite de la position de l'arrondi pour décider s'il faut arrondir vers le haut ou vers le bas."]
        };
      }
    },
    declaredVariationSpace: 6 * 9999999
  }),
  categoricalPoolTemplate({
    key: "y6l1.tfRoundAnyDegree", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const unit = rng.pick([10, 100, 1000, 10000, 100000, 1000000]);
      const n = rng.int(1, 9999999);
      const rounded = Math.round(n / unit) * unit;
      const unitLabel = unit === 1000000 ? "million" : unit.toLocaleString("en-GB");
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? rounded : numericDistractors(rng, rounded, 1, unit)[0] ?? rounded + unit;
      return {
        prompt: `${n.toLocaleString("en-GB")} rounded to the nearest ${unitLabel} is ${shown.toLocaleString("en-GB")}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${n.toLocaleString("en-GB")} rounds to ${rounded.toLocaleString("en-GB")} to the nearest ${unitLabel}.`],
        hints: ["Work out the rounded value and check it against the statement."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^([\d,]+) rounded to the nearest (.+) is ([\d,]+)\. True or false\?$/);
        const n = m ? m[1] : "";
        const unitLabel = m ? m[2] : "";
        const shown = m ? m[3] : "";
        const phrase = unitLabel === "million" ? "au million près" : `à ${unitLabel} près`;
        const em = drawn.explanationSteps[0]?.match(/rounds to ([\d,]+)/);
        const rounded = em ? em[1] : "";
        return {
          prompt: `${n} arrondi ${phrase} donne ${shown}. Vrai ou faux ?`,
          correctLabel: drawn.correctLabel === "True" ? "Vrai" : "Faux",
          distractorLabels: drawn.distractorLabels.map((d) => (d === "True" ? "Vrai" : "Faux")),
          explanationSteps: [`${n} arrondi ${phrase} donne ${rounded}.`],
          hints: ["Calcule la valeur arrondie et compare-la à l'énoncé."]
        };
      }
    },
    declaredVariationSpace: 6 * 9999999 * 2
  }),
  arithmeticTemplate({
    key: "y6l1.wordProblemRounding7d", levelKey: "Y6L1", objectiveCode: "Y6-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10000, 9990000]], compute: (v) => Math.round(v[0]! / 10000) * 10000, contextPool: EVENTS,
    promptTemplates: ["{a} people attended {ctx} this year. Rounded to the nearest 10,000, about how many people was that?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["Round to the nearest ten thousand using the thousands digit."],
    declaredVariationSpace: 9980000 * EVENTS.length,
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: ["{a} personnes ont assisté à {ctx} cette année. Arrondi à la dizaine de mille près, combien de personnes environ cela représente-t-il ?"],
      explain: (v, r) => [`${v[0]} arrondi à la dizaine de mille près donne ${r}.`],
      hints: () => ["Arrondis à la dizaine de mille près en utilisant le chiffre des milliers."]
    }
  }),

  // --- Y6-L1-3: use negative numbers in context and calculate intervals across zero ---
  arithmeticTemplate({
    key: "y6l1.numberLineNegative30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "NUMBER_LINE",
    ranges: [[-30, 30]], compute: (v) => v[0]!,
    promptTemplates: [
      "What number is the arrow pointing to on the number line?",
      "Read the number line. What number does the arrow show?",
      "Which number does the pointer show on the number line?",
      "What number is marked by the arrow?",
      "Identify the number shown by the arrow on the number line."
    ],
    explain: (v) => [`Count from zero to reach ${v[0]}, moving left for negative or right for positive.`],
    hints: () => ["Count the marks from zero, noting whether you move left (negative) or right (positive)."],
    visualAid: (v) => visuals.numberLine(-30, 30, v[0]!),
    declaredVariationSpace: 61 * 5,
    fr: {
      promptTemplates: [
        "Quel nombre la flèche indique-t-elle sur la droite numérique ?",
        "Lis la droite numérique. Quel nombre la flèche montre-t-elle ?",
        "Quel nombre le pointeur indique-t-il sur la droite numérique ?",
        "Quel nombre est marqué par la flèche ?",
        "Identifie le nombre indiqué par la flèche sur la droite numérique."
      ],
      explain: (v) => [`Compte à partir de zéro pour atteindre ${v[0]}, en allant vers la gauche pour les négatifs ou vers la droite pour les positifs.`],
      hints: () => ["Compte les graduations à partir de zéro, en notant si tu vas vers la gauche (négatif) ou vers la droite (positif)."]
    }
  }),
  orderingTemplate({
    key: "y6l1.orderIntegersAsc30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 5) nums.add(rng.int(-30, 30));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag these numbers into order, smallest first."],
    explain: () => ["On a number line, numbers further left are smaller — negative numbers are smaller than positive numbers."],
    hints: () => ["Negative numbers are always smaller than positive numbers. Compare negatives by how far below zero they are."],
    declaredVariationSpace: 300000,
    fr: {
      promptTemplates: ["Fais glisser ces nombres dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Sur une droite numérique, les nombres les plus à gauche sont les plus petits — les nombres négatifs sont plus petits que les nombres positifs."],
      hints: () => ["Les nombres négatifs sont toujours plus petits que les nombres positifs. Compare les nombres négatifs selon leur distance en dessous de zéro."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.compareIntegers30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[-30, 30], [-30, 30]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is greater, {a} or {b}?"],
    explain: (v, r) => [`${r} is further to the right on the number line, so it is greater.`],
    hints: () => ["A number further right on the number line is always greater."],
    distractorSpread: 8,
    declaredVariationSpace: 60 * 59,
    fr: {
      promptTemplates: ["Quel nombre est le plus grand, {a} ou {b} ?"],
      explain: (v, r) => [`${r} est plus à droite sur la droite numérique, donc il est plus grand.`],
      hints: () => ["Un nombre plus à droite sur la droite numérique est toujours plus grand."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.tfNegativeComparison30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "TRUE_FALSE",
    ranges: [[-30, 30], [-30, 30]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Between {a} and {b}, the greater number is", "Comparing {a} and {b}, the larger value is"],
    explain: (v, r) => [`${r} is greater — it is further right on the number line.`],
    hints: () => ["The number further right on the number line is greater."],
    distractorSpread: 8,
    declaredVariationSpace: 60 * 59 * 2,
    fr: {
      promptTemplates: ["Entre {a} et {b}, le nombre le plus grand est", "En comparant {a} et {b}, la plus grande valeur est"],
      explain: (v, r) => [`${r} est plus grand — il est plus à droite sur la droite numérique.`],
      hints: () => ["Le nombre le plus à droite sur la droite numérique est le plus grand."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.countOnThroughZero30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-30, -1]], compute: (v) => v[0]! + 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1, c: v[0]! + 2 }),
    promptTemplates: [
      "Counting {ctx}: {a}, {b}, {c}, ___. What comes next?",
      "Counting on: {a}, {b}, {c}, ___. What is the next number, counting {ctx}?",
      "Continue the pattern: {a}, {b}, {c}, ___"
    ],
    explain: (v, r) => [`This is a counting-on sequence starting at ${v[0]}.`, `Each number goes up by 1: ${v[0]}, ${v[0]! + 1}, ${v[0]! + 2}, ${r}.`, "Counting up through zero: after -1 comes 0, then 1 — there is no '-0'."],
    hints: (v) => [`Count on from ${v[0]! + 2}, remembering that after -1 comes 0.`],
    declaredVariationSpace: 30 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "En comptant les {ctx} : {a}, {b}, {c}, ___. Que vient-il ensuite ?",
        "En comptant en avançant : {a}, {b}, {c}, ___. Quel est le nombre suivant, en comptant les {ctx} ?",
        "Continue le motif : {a}, {b}, {c}, ___"
      ],
      explain: (v, r) => [`Ceci est une suite qui compte en avançant à partir de ${v[0]}.`, `Chaque nombre augmente de 1 : ${v[0]}, ${v[0]! + 1}, ${v[0]! + 2}, ${r}.`, "En comptant en avançant à travers zéro : après -1 vient 0, puis 1 — il n'y a pas de « -0 »."],
      hints: (v) => [`Compte en avançant à partir de ${v[0]! + 2}, en te rappelant qu'après -1 vient 0.`]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.countBackThroughZero30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "MISSING_NUMBER",
    ranges: [[-27, 4]], compute: (v) => v[0]! - 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! - 1, c: v[0]! - 2 }),
    promptTemplates: [
      "Counting back {ctx}: {a}, {b}, {c}, ___. What comes next?",
      "Counting backwards: {a}, {b}, {c}, ___. What is the next number, counting {ctx}?",
      "Continue counting backwards: {a}, {b}, {c}, ___"
    ],
    explain: (v, r) => [`This is a counting-backwards sequence starting at ${v[0]}.`, `Each number goes down by 1: ${v[0]}, ${v[0]! - 1}, ${v[0]! - 2}, ${r}.`, "Counting back through zero: after 0 comes -1, not 1."],
    hints: (v) => [`Count back from ${v[0]! - 2}, remembering that after 0 comes -1.`],
    declaredVariationSpace: 31 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "En comptant à rebours les {ctx} : {a}, {b}, {c}, ___. Que vient-il ensuite ?",
        "En comptant à rebours : {a}, {b}, {c}, ___. Quel est le nombre suivant, en comptant les {ctx} ?",
        "Continue à compter à rebours : {a}, {b}, {c}, ___"
      ],
      explain: (v, r) => [`Ceci est une suite qui compte à rebours à partir de ${v[0]}.`, `Chaque nombre diminue de 1 : ${v[0]}, ${v[0]! - 1}, ${v[0]! - 2}, ${r}.`, "En comptant à rebours à travers zéro : après 0 vient -1, pas 1."],
      hints: (v) => [`Compte à rebours à partir de ${v[0]! - 2}, en te rappelant qu'après 0 vient -1.`]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.intervalAcrossZero", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-20, -1], [1, 20]], compute: (v) => v[1]! - v[0]!, contextPool: CITIES,
    promptTemplates: ["In {ctx}, the temperature was {a}°C at midnight and rose to {b}°C by midday. What was the size of the interval (the rise) between the two temperatures?"],
    explain: (v, r) => [`The interval from ${v[0]}°C to ${v[1]}°C crosses zero: ${v[1]} - (${v[0]}) = ${r}.`, "Add how far below zero it started to how far above zero it ended."],
    hints: () => ["Add the distance below zero to the distance above zero."],
    declaredVariationSpace: 20 * 20 * CITIES.length,
    fr: {
      promptTemplates: ["À {ctx}, la température était de {a}°C à minuit et est montée à {b}°C à midi. Quelle était la taille de l'intervalle (la hausse) entre les deux températures ?"],
      explain: (v, r) => [`L'intervalle de ${v[0]}°C à ${v[1]}°C traverse zéro : ${v[1]} - (${v[0]}) = ${r}.`, "Additionne la distance en dessous de zéro au départ à la distance au-dessus de zéro à l'arrivée."],
      hints: () => ["Additionne la distance en dessous de zéro à la distance au-dessus de zéro."]
    }
  }),
  arithmeticTemplate({
    key: "y6l1.wordProblemTemperatureFall30", levelKey: "Y6L1", objectiveCode: "Y6-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-5, 20], [1, 20]], compute: (v) => v[0]! - v[1]!, contextPool: CITIES,
    promptTemplates: ["The temperature in {ctx} was {a}. Overnight it fell by {b}. What is the new temperature?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "A fall means you count down (left on the number line), through zero if needed."],
    hints: () => ["A fall in temperature means counting down. Watch for crossing through zero."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 26 * 20 * CITIES.length,
    fr: {
      promptTemplates: ["La température à {ctx} était de {a}. Pendant la nuit, elle a baissé de {b}. Quelle est la nouvelle température ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "Une baisse signifie qu'il faut compter vers le bas (vers la gauche sur la droite numérique), en traversant zéro si besoin."],
      hints: () => ["Une baisse de température signifie compter vers le bas. Attention à la traversée de zéro."]
    }
  })
];

export default level;
