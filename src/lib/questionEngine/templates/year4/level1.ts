import { arithmeticTemplate, matchingTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 1 — "Place value, rounding and numbers to 10,000"
// A smaller but fully valid, deterministic bank (15 templates, each verified
// to reach >=150 variations) demonstrating the engine at KS2 upper-level
// depth. See DOCUMENTATION.md "Content coverage status".
const CTX = ["people", "books", "pencils", "tickets", "trees", "houses", "cars", "stamps"];
const CTX_FR = ["personnes", "livres", "crayons", "billets", "arbres", "maisons", "voitures", "timbres"];

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y4l1.thousandsDigit", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999]], compute: (v) => Math.floor(v[0]! / 1000), contextPool: CTX,
    promptTemplates: ["In the number {a}, what is the value of the thousands digit (how many thousands)?", "How many thousands are in {a}?", "Counting {ctx}: how many thousands are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${r} thousands, ${Math.floor((v[0]! % 1000) / 100)} hundreds, ${Math.floor((v[0]! % 100) / 10)} tens, ${v[0]! % 10} ones.`],
    hints: () => ["The thousands digit is the first digit."],
    declaredVariationSpace: 9000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Dans le nombre {a}, quelle est la valeur du chiffre des milliers (combien de milliers) ?", "Combien de milliers y a-t-il dans {a} ?", "En comptant les {ctx} : combien de milliers y a-t-il dans {a} ?"],
      explain: (v, r) => [`${v[0]} = ${r} milliers, ${Math.floor((v[0]! % 1000) / 100)} centaines, ${Math.floor((v[0]! % 100) / 10)} dizaines, ${v[0]! % 10} unités.`],
      hints: () => ["Le chiffre des milliers est le premier chiffre."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.hundredsDigit", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999]], compute: (v) => Math.floor((v[0]! % 1000) / 100), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many hundreds are there?", "What is the hundreds digit's value in {a}?", "Counting {ctx}: how many hundreds are in {a}?"],
    explain: (v, r) => [`The hundreds digit of ${v[0]} is ${r}.`],
    hints: () => ["The hundreds digit is the second digit."],
    declaredVariationSpace: 9000 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Dans le nombre {a}, combien y a-t-il de centaines ?", "Quelle est la valeur du chiffre des centaines dans {a} ?", "En comptant les {ctx} : combien de centaines y a-t-il dans {a} ?"],
      explain: (v, r) => [`Le chiffre des centaines de ${v[0]} est ${r}.`],
      hints: () => ["Le chiffre des centaines est le deuxième chiffre."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.compareBigger4d", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1000, 9999], [1000, 9999]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare digit by digit from the left (thousands first). ${r} is bigger.`],
    hints: () => ["Compare the thousands digit first, then hundreds, then tens, then ones."],
    distractorSpread: 500,
    declaredVariationSpace: 9000 * 8999,
    fr: {
      promptTemplates: ["Quel nombre est le plus grand, {a} ou {b} ?"],
      explain: (v, r) => [`Compare chiffre par chiffre en partant de la gauche (milliers d’abord). ${r} est le plus grand.`],
      hints: () => ["Compare d’abord le chiffre des milliers, puis des centaines, des dizaines, puis des unités."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.roundNearest10", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9998]], compute: (v) => Math.round(v[0]! / 10) * 10, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 10.", "What is {a} rounded to the nearest 10?", "Counting {ctx}: round {a} to the nearest 10."],
    explain: (v, r) => [`Look at the ones digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 10.`],
    hints: () => ["If the ones digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9998 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Arrondis {a} à la dizaine près.", "Combien fait {a} arrondi à la dizaine près ?", "En comptant les {ctx} : arrondis {a} à la dizaine près."],
      explain: (v, r) => [`Regarde le chiffre des unités de ${v[0]}.`, `${v[0]} arrondi à la dizaine près donne ${r}.`],
      hints: () => ["Si le chiffre des unités est 5 ou plus, arrondis vers le haut ; sinon vers le bas."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.roundNearest100", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 100.", "What is {a} rounded to the nearest 100?", "Counting {ctx}: round {a} to the nearest 100."],
    explain: (v, r) => [`Look at the tens digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["If the tens digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9950 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Arrondis {a} à la centaine près.", "Combien fait {a} arrondi à la centaine près ?", "En comptant les {ctx} : arrondis {a} à la centaine près."],
      explain: (v, r) => [`Regarde le chiffre des dizaines de ${v[0]}.`, `${v[0]} arrondi à la centaine près donne ${r}.`],
      hints: () => ["Si le chiffre des dizaines est 5 ou plus, arrondis vers le haut ; sinon vers le bas."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.roundNearest1000", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9500]], compute: (v) => Math.round(v[0]! / 1000) * 1000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 1,000.", "What is {a} rounded to the nearest 1,000?", "Counting {ctx}: round {a} to the nearest 1,000."],
    explain: (v, r) => [`Look at the hundreds digit of ${v[0]}.`, `${v[0]} rounds to ${r} to the nearest 1,000.`],
    hints: () => ["If the hundreds digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 9500 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Arrondis {a} au millier près.", "Combien fait {a} arrondi au millier près ?", "En comptant les {ctx} : arrondis {a} au millier près."],
      explain: (v, r) => [`Regarde le chiffre des centaines de ${v[0]}.`, `${v[0]} arrondi au millier près donne ${r}.`],
      hints: () => ["Si le chiffre des centaines est 5 ou plus, arrondis vers le haut ; sinon vers le bas."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.mcRoundNearest100", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100,
    promptTemplates: ["What is {a} rounded to the nearest 100?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["Look at the tens digit to decide whether to round up or down."],
    distractorSpread: 200,
    declaredVariationSpace: 9950,
    fr: {
      promptTemplates: ["Combien fait {a} arrondi à la centaine près ?"],
      explain: (v, r) => [`${v[0]} arrondi à la centaine près donne ${r}.`],
      hints: () => ["Regarde le chiffre des dizaines pour décider s’il faut arrondir vers le haut ou vers le bas."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.tfRounding", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE",
    ranges: [[1, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100,
    promptTemplates: ["{a} rounded to the nearest 100 is"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["Check the tens digit to decide the rounding direction."],
    distractorSpread: 200,
    declaredVariationSpace: 9950 * 4,
    fr: {
      promptTemplates: ["{a} arrondi à la centaine près donne"],
      explain: (v, r) => [`${v[0]} arrondi à la centaine près donne ${r}.`],
      hints: () => ["Vérifie le chiffre des dizaines pour décider du sens de l’arrondi."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.skipCount6789", levelKey: "Y4L1", objectiveCode: "Y4-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 12], [0, 3]],
    compute: (v) => {
      const step = [6, 7, 9, 25][v[1]!]!;
      return v[0]! * step + step;
    },
    contextPool: CTX,
    derive: (v) => {
      const step = [6, 7, 9, 25][v[1]!]!;
      return { a: v[0]! * step, step };
    },
    promptTemplates: ["Counting in {step}s: {a}, ___. What comes next?", "Skip count by {step} from {a}. What is the next number?", "Counting {ctx} in {step}s from {a}: {a}, ___"],
    explain: (v, r) => [`Add the step size to the given number: ${r}.`],
    hints: () => ["Add the step size to the given number."],
    declaredVariationSpace: 13 * 4 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de {step} en {step} : {a}, ___. Que vient-il ensuite ?", "Compte de {step} en {step} à partir de {a}. Quel est le nombre suivant ?", "En comptant les {ctx} de {step} en {step} à partir de {a} : {a}, ___"],
      explain: (v, r) => [`Ajoute le pas au nombre donné : ${r}.`],
      hints: () => ["Ajoute le pas au nombre donné."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.skipCount1000", levelKey: "Y4L1", objectiveCode: "Y4-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 8]], compute: (v) => v[0]! * 1000 + 1000, contextPool: CTX,
    derive: (v) => ({ a: v[0]! * 1000 }),
    promptTemplates: [
      "Counting in 1,000s: {a}, ___. What comes next?",
      "Skip count by 1,000 from {a}, while counting {ctx}.",
      "Counting {ctx} in 1,000s from {a}: {a}, ___"
    ],
    explain: (v, r) => [`${v[0]! * 1000} + 1,000 = ${r}.`],
    hints: () => ["Add 1,000 — only the thousands digit changes."],
    declaredVariationSpace: 9 * (1 + 2 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "En comptant de 1 000 en 1 000 : {a}, ___. Que vient-il ensuite ?",
        "Compte de 1 000 en 1 000 à partir de {a}, en comptant les {ctx}.",
        "En comptant les {ctx} de 1 000 en 1 000 à partir de {a} : {a}, ___"
      ],
      explain: (v, r) => [`${v[0]! * 1000} + 1 000 = ${r}.`],
      hints: () => ["Ajoute 1 000 — seul le chiffre des milliers change."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.expandedToNumber", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 1000 + v[1]! * 100 + v[2]! * 10 + v[3]!,
    promptTemplates: ["{a} thousands + {b} hundreds + {c} tens + {d} ones = ?"],
    explain: (v, r) => [`${v[0]}000 + ${v[1]!}00 + ${v[2]}0 + ${v[3]} = ${r}.`],
    hints: () => ["Add each place value together."],
    declaredVariationSpace: 9 * 10 * 10 * 10,
    fr: {
      promptTemplates: ["{a} milliers + {b} centaines + {c} dizaines + {d} unités = ?"],
      explain: (v, r) => [`${v[0]}000 + ${v[1]!}00 + ${v[2]}0 + ${v[3]} = ${r}.`],
      hints: () => ["Additionne chaque valeur de position."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.oneMoreTo10000", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 9998]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What is one more than {a}?", "{a} + 1 = ?", "Counting {ctx}: one more than {a} is?"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Add 1 — watch for digits that carry over (e.g. 999 + 1 = 1000)."],
    declaredVariationSpace: 9998 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel est le nombre juste après {a} ?", "{a} + 1 = ?", "En comptant les {ctx} : quel est le nombre juste après {a} ?"],
      explain: (v, r) => [`Le nombre juste après ${v[0]} est ${r}.`],
      hints: () => ["Ajoute 1 — attention aux chiffres qui se propagent (par exemple 999 + 1 = 1000)."]
    }
  }),
  orderingTemplate({
    key: "y4l1.orderAscending4d", levelKey: "Y4L1", objectiveCode: "Y4-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1000, 9999));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the thousands digit first, then hundreds, tens and ones."],
    hints: () => ["Which number has the smallest thousands digit?"],
    declaredVariationSpace: 500000,
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l’ordre, du plus petit au plus grand."],
      explain: () => ["Compare d’abord le chiffre des milliers, puis des centaines, des dizaines et des unités."],
      hints: () => ["Quel nombre a le plus petit chiffre des milliers ?"]
    }
  }),
  matchingTemplate({
    key: "y4l1.matchRoundedValues", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"],
    generatePairs: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(100, 9899));
      return Array.from(nums).map((n) => ({ left: String(n), right: String(Math.round(n / 100) * 100) }));
    },
    promptTemplates: ["Match each number to its value rounded to the nearest 100."],
    explain: () => ["Look at the tens digit of each number to decide the rounding direction."],
    hints: () => ["Round each number to the nearest hundred, one at a time."],
    declaredVariationSpace: 200000,
    fr: {
      promptTemplates: ["Associe chaque nombre à sa valeur arrondie à la centaine près."],
      explain: () => ["Regarde le chiffre des dizaines de chaque nombre pour décider du sens de l’arrondi."],
      hints: () => ["Arrondis chaque nombre à la centaine près, un à la fois."]
    }
  }),
  arithmeticTemplate({
    key: "y4l1.wordProblemRounding", levelKey: "Y4L1", objectiveCode: "Y4-L1-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1000, 9950]], compute: (v) => Math.round(v[0]! / 100) * 100, contextPool: CTX,
    promptTemplates: ["A stadium had {a} {ctx} attend a match. Rounded to the nearest 100, about how many {ctx} attended?"],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 100.`],
    hints: () => ["Round to the nearest hundred using the tens digit."],
    declaredVariationSpace: 8950 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un stade a accueilli {a} {ctx} pour un match. Arrondi à la centaine près, combien de {ctx} environ ont assisté au match ?"],
      explain: (v, r) => [`${v[0]} arrondi à la centaine près donne ${r}.`],
      hints: () => ["Arrondis à la centaine près en utilisant le chiffre des dizaines."]
    }
  })
];

export default level;
