import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate, orderingTemplate, plural } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 2 — "Counting and place value to 100"
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y1l2.skipCountBy2", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 48]], constraint: (v) => v[0]! % 2 === 0, compute: (v) => v[0]! + 2, contextPool: CTX,
    promptTemplates: ["Counting in 2s: {a}, ___. What comes next?", "Skip count by 2 from {a}. What is the next number?", "Counting {ctx} in 2s from {a}: {a}, ___"],
    explain: (v, r) => [`Counting in 2s, add 2 each time.`, `${v[0]} + 2 = ${r}.`],
    hints: () => ["Add 2 to the number."],
    declaredVariationSpace: 25 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de 2 en 2 : {a}, ___. Que vient-il ensuite ?", "Compte de 2 en 2 à partir de {a}. Quel est le nombre suivant ?", "En comptant les {ctx} de 2 en 2 à partir de {a} : {a}, ___"],
      explain: (v, r) => [`En comptant de 2 en 2, ajoute 2 à chaque fois.`, `${v[0]} + 2 = ${r}.`],
      hints: () => ["Ajoute 2 au nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.skipCountBy5", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 45]], constraint: (v) => v[0]! % 5 === 0, compute: (v) => v[0]! + 5, contextPool: CTX,
    promptTemplates: ["Counting in 5s: {a}, ___. What comes next?", "Counting {ctx} in 5s from {a}: {a}, ___", "Skip count by 5 from {a} while counting {ctx}. What is the next number?"],
    explain: (v, r) => [`Counting in 5s, add 5 each time.`, `${v[0]} + 5 = ${r}.`],
    hints: () => ["Add 5 to the number."],
    declaredVariationSpace: 10 * (1 + 2 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de 5 en 5 : {a}, ___. Que vient-il ensuite ?", "En comptant les {ctx} de 5 en 5 à partir de {a} : {a}, ___", "Compte de 5 en 5 à partir de {a} en comptant les {ctx}. Quel est le nombre suivant ?"],
      explain: (v, r) => [`En comptant de 5 en 5, ajoute 5 à chaque fois.`, `${v[0]} + 5 = ${r}.`],
      hints: () => ["Ajoute 5 au nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.skipCountBy10", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 90]], constraint: (v) => v[0]! % 10 === 0, compute: (v) => v[0]! + 10, contextPool: CTX,
    promptTemplates: ["Counting in 10s: {a}, ___. What comes next?", "Counting {ctx} in 10s from {a}: {a}, ___", "Skip count by 10 from {a} while counting {ctx}. What is the next number?"],
    explain: (v, r) => [`Counting in 10s, add 10 each time.`, `${v[0]} + 10 = ${r}.`],
    hints: () => ["Add 10 to the number."],
    declaredVariationSpace: 10 * (1 + 2 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de 10 en 10 : {a}, ___. Que vient-il ensuite ?", "En comptant les {ctx} de 10 en 10 à partir de {a} : {a}, ___", "Compte de 10 en 10 à partir de {a} en comptant les {ctx}. Quel est le nombre suivant ?"],
      explain: (v, r) => [`En comptant de 10 en 10, ajoute 10 à chaque fois.`, `${v[0]} + 10 = ${r}.`],
      hints: () => ["Ajoute 10 au nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.skipCountBackBy10", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[10, 100]], constraint: (v) => v[0]! % 10 === 0, compute: (v) => v[0]! - 10, contextPool: CTX,
    promptTemplates: ["Counting back in 10s: {a}, ___. What comes next?", "Counting {ctx} back in 10s from {a}: {a}, ___", "Skip count back by 10 from {a} while counting {ctx}."],
    explain: (v, r) => [`Counting back in 10s, subtract 10 each time.`, `${v[0]} - 10 = ${r}.`],
    hints: () => ["Take 10 away from the number."],
    declaredVariationSpace: 10 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant à rebours de 10 en 10 : {a}, ___. Que vient-il ensuite ?", "En comptant les {ctx} à rebours de 10 en 10 à partir de {a} : {a}, ___", "Compte à rebours de 10 en 10 à partir de {a} en comptant les {ctx}."],
      explain: (v, r) => [`En comptant à rebours de 10 en 10, soustrais 10 à chaque fois.`, `${v[0]} - 10 = ${r}.`],
      hints: () => ["Enlève 10 au nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.oneMoreTo100", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What number is one more than {a}?", "One more than {a} is...?", "There are {a} {ctx}. One more arrives. How many now?"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Count on one."],
    declaredVariationSpace: 99 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre est juste après {a} ?", "Un de plus que {a} est... ?", "Il y a {a} {ctx}. Un de plus arrive. Combien y en a-t-il maintenant ?"],
      explain: (v, r) => [`Un de plus que ${v[0]} est ${r}.`],
      hints: () => ["Compte un de plus."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.oneLessTo100", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 100]], compute: (v) => v[0]! - 1, contextPool: CTX,
    promptTemplates: ["What number is one less than {a}?", "One less than {a} is...?", "There are {a} {ctx}. One is given away. How many are left?"],
    explain: (v, r) => [`One less than ${v[0]} is ${r}.`],
    hints: () => ["Count back one."],
    declaredVariationSpace: 100 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre est juste avant {a} ?", "Un de moins que {a} est... ?", "Il y a {a} {ctx}. Un est donné. Combien en reste-t-il ?"],
      explain: (v, r) => [`Un de moins que ${v[0]} est ${r}.`],
      hints: () => ["Compte un de moins."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.tensDigit", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[10, 99]], compute: (v) => Math.floor(v[0]! / 10),
    promptTemplates: ["In the number {a}, how many tens are there?", "How many tens are in {a}?", "What is the value of the tens digit's count in {a}?"],
    explain: (v, r) => [`${v[0]} = ${r} tens and ${v[0]! % 10} ones.`],
    hints: () => ["The tens digit is the first digit."],
    visualAid: (v) => visuals.tenFrame(v[0]! % 10),
    declaredVariationSpace: 90 * 3,
    fr: {
      promptTemplates: ["Dans le nombre {a}, combien y a-t-il de dizaines ?", "Combien de dizaines y a-t-il dans {a} ?", "Quelle est la valeur du chiffre des dizaines dans {a} ?"],
      explain: (v, r) => [`${v[0]} = ${r} dizaines et ${v[0]! % 10} unités.`],
      hints: () => ["Le chiffre des dizaines est le premier chiffre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.onesDigit", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[10, 99]], compute: (v) => v[0]! % 10,
    promptTemplates: ["In the number {a}, how many ones are there?", "How many ones are in {a}?", "What is the ones digit in {a}?"],
    explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 10)} tens and ${r} ones.`],
    hints: () => ["The ones digit is the last digit."],
    declaredVariationSpace: 90 * 3,
    fr: {
      promptTemplates: ["Dans le nombre {a}, combien y a-t-il d'unités ?", "Combien d'unités y a-t-il dans {a} ?", "Quel est le chiffre des unités dans {a} ?"],
      explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 10)} dizaines et ${r} unités.`],
      hints: () => ["Le chiffre des unités est le dernier chiffre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.tensOnesToNumber", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!,
    promptTemplates: ["{a} tens and {b} ones make what number?", "What number has {a} tens and {b} ones?"],
    explain: (v, r) => [`${v[0]} tens = ${v[0]! * 10}.`, `${v[0]! * 10} + ${v[1]} = ${r}.`],
    hints: () => ["Multiply the tens by 10, then add the ones."],
    visualAid: (v) => visuals.array(v[0]!, 10),
    declaredVariationSpace: 9 * 10 * 2,
    fr: {
      promptTemplates: ["{a} dizaines et {b} unités font quel nombre ?", "Quel nombre a {a} dizaines et {b} unités ?"],
      explain: (v, r) => [`${v[0]} dizaines = ${v[0]! * 10}.`, `${v[0]! * 10} + ${v[1]} = ${r}.`],
      hints: () => ["Multiplie les dizaines par 10, puis ajoute les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.mcWriteFromTensOnes", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!,
    promptTemplates: ["Which number has {a} tens and {b} ones?"],
    explain: (v, r) => [`${v[0]} tens and ${v[1]} ones make ${r}.`],
    hints: () => ["Tens come first, then ones."],
    distractorSpread: 12,
    declaredVariationSpace: 9 * 10,
    fr: {
      promptTemplates: ["Quel nombre a {a} dizaines et {b} unités ?"],
      explain: (v, r) => [`${v[0]} dizaines et ${v[1]} unités font ${r}.`],
      hints: () => ["Les dizaines viennent en premier, puis les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.compareBigger100", levelKey: "Y1L2", objectiveCode: "Y1-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 100], [1, 100]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare the tens first. ${r} is the bigger number.`],
    hints: () => ["Compare the tens digit first. If they're equal, compare the ones."],
    distractorSpread: 15,
    declaredVariationSpace: 100 * 99,
    fr: {
      promptTemplates: ["Quel nombre est le plus grand, {a} ou {b} ?"],
      explain: (v, r) => [`Compare d'abord les dizaines. ${r} est le plus grand nombre.`],
      hints: () => ["Compare d'abord le chiffre des dizaines. S'ils sont égaux, compare les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.compareSmaller100", levelKey: "Y1L2", objectiveCode: "Y1-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 100], [1, 100]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.min(v[0]!, v[1]!),
    promptTemplates: ["Which number is smaller, {a} or {b}?"],
    explain: (v, r) => [`Compare the tens first. ${r} is the smaller number.`],
    hints: () => ["Compare the tens digit first. If they're equal, compare the ones."],
    distractorSpread: 15,
    declaredVariationSpace: 100 * 99,
    fr: {
      promptTemplates: ["Quel nombre est le plus petit, {a} ou {b} ?"],
      explain: (v, r) => [`Compare d'abord les dizaines. ${r} est le plus petit nombre.`],
      hints: () => ["Compare d'abord le chiffre des dizaines. S'ils sont égaux, compare les unités."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.trueFalseGreater", levelKey: "Y1L2", objectiveCode: "Y1-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "TRUE_FALSE",
    ranges: [[1, 100], [1, 100]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Between {a} and {b}, the greater number is", "Comparing {a} and {b}, the larger number is"],
    explain: (v, r) => [`The greater number is ${r}.`],
    hints: () => ["Compare the tens digits first."],
    distractorSpread: 20,
    declaredVariationSpace: 100 * 99 * 2,
    fr: {
      promptTemplates: ["Entre {a} et {b}, le plus grand nombre est", "En comparant {a} et {b}, le plus grand nombre est"],
      explain: (v, r) => [`Le plus grand nombre est ${r}.`],
      hints: () => ["Compare d'abord les chiffres des dizaines."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.numberLine100", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "NUMBER_LINE",
    ranges: [[0, 100]], compute: (v) => v[0]!,
    promptTemplates: [
      "What number is the arrow pointing to on the number line to 100?",
      "Read the number line (0 to 100). What number does the arrow show?",
      "Which number does the pointer show on this 0-100 number line?",
      "Use the marked multiples of 10 to help you find what number the arrow shows."
    ],
    explain: (v) => [`Count in 5s or 10s along the line to reach ${v[0]}.`],
    hints: () => ["Use the labelled multiples of 10 to help you count on."],
    visualAid: (v) => visuals.numberLine(0, 100, v[0]!),
    declaredVariationSpace: 21 * 3,
    fr: {
      promptTemplates: [
        "Quel nombre la flèche indique-t-elle sur la droite numérique jusqu'à 100 ?",
        "Lis la droite numérique (de 0 à 100). Quel nombre la flèche montre-t-elle ?",
        "Quel nombre le pointeur indique-t-il sur cette droite numérique de 0 à 100 ?",
        "Utilise les multiples de 10 indiqués pour trouver le nombre que montre la flèche."
      ],
      explain: (v) => [`Compte de 5 en 5 ou de 10 en 10 le long de la droite pour atteindre ${v[0]}.`],
      hints: () => ["Utilise les multiples de 10 indiqués pour t'aider à compter."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.wordProblemPlaceValue", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!, contextPool: CTX,
    promptTemplates: ["A shop has {a} boxes of 10 {ctx} and {b} loose {ctx}. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} boxes of 10 = ${v[0]! * 10}.`, `${v[0]! * 10} + ${v[1]} loose ones = ${r}.`],
    hints: () => ["Multiply the boxes by 10 first, then add the loose ones."],
    visualAid: (v) => visuals.array(v[0]!, 10),
    declaredVariationSpace: 9 * 10 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un magasin a {a} boîtes de 10 {ctx} et {b} {ctx} en plus. Combien {de:ctx} en tout ?"],
      explain: (v, r) => [`${v[0]} boîtes de 10 = ${v[0]! * 10}.`, `${v[0]! * 10} + ${v[1]} en plus = ${r}.`],
      hints: () => ["Multiplie d'abord les boîtes par 10, puis ajoute ceux qui restent."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.missingTensOnes", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MISSING_NUMBER",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]!, contextPool: CTX,
    derive: (v) => ({ n: v[0]! * 10 + v[1]! }),
    promptTemplates: ["The number {n} has ___ tens.", "How many tens make up {n}?", "Counting {ctx} in groups of 10: {n} is made of ___ full tens."],
    explain: (v, r) => [`${v[0]! * 10 + v[1]!} = ${r} tens and ${v[1]} ones.`],
    hints: () => ["Look at the tens digit — the first digit."],
    declaredVariationSpace: 9 * 10 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Le nombre {n} a ___ dizaines.", "Combien de dizaines composent {n} ?", "En comptant les {ctx} par groupes de 10 : {n} est composé de ___ dizaines complètes."],
      explain: (v, r) => [`${v[0]! * 10 + v[1]!} = ${r} dizaines et ${v[1]} unités.`],
      hints: () => ["Regarde le chiffre des dizaines — le premier chiffre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.reasoningBetween100", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "NUMBER_ENTRY",
    ranges: [[1, 97]], compute: (v) => v[0]! + 1, contextPool: CTX,
    derive: (v) => ({ c: v[0]! + 2 }),
    promptTemplates: ["What number is exactly between {a} and {c}?", "Find the number exactly between {a} and {c}.", "There are {ctx} numbered {a} to {c}. Which number is in the middle?"],
    explain: (v, r) => [`The number between ${v[0]} and ${v[0]! + 2} is ${r}.`],
    hints: () => ["Count on one from the smaller number."],
    declaredVariationSpace: 97 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre se trouve exactement entre {a} et {c} ?", "Trouve le nombre exactement entre {a} et {c}.", "Il y a des {ctx} numérotés de {a} à {c}. Quel nombre est au milieu ?"],
      explain: (v, r) => [`Le nombre entre ${v[0]} et ${v[0]! + 2} est ${r}.`],
      hints: () => ["Compte un de plus à partir du plus petit nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.reasoningWhichHasMoreTens", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 99], [10, 99]], constraint: (v) => Math.floor(v[0]! / 10) !== Math.floor(v[1]! / 10),
    compute: (v) => (Math.floor(v[0]! / 10) > Math.floor(v[1]! / 10) ? v[0]! : v[1]!),
    promptTemplates: ["Which number has more tens, {a} or {b}?"],
    explain: (v, r) => [`Compare the tens digits: the number with more tens is ${r}.`],
    hints: () => ["Look only at the first digit of each number."],
    distractorSpread: 20,
    declaredVariationSpace: 90 * 89,
    fr: {
      promptTemplates: ["Quel nombre a le plus de dizaines, {a} ou {b} ?"],
      explain: (v, r) => [`Compare les chiffres des dizaines : le nombre avec le plus de dizaines est ${r}.`],
      hints: () => ["Regarde uniquement le premier chiffre de chaque nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.reasoningExplainCompare", levelKey: "Y1L2", objectiveCode: "Y1-L2-3", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "REASONING_EXPLAIN",
    ranges: [[10, 99], [10, 99]], constraint: (v) => v[0] !== v[1] && Math.floor(v[0]! / 10) !== Math.floor(v[1]! / 10),
    compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["{a} and {b}: which is bigger, and why?"],
    explain: (v, r) => [`${r} is bigger because it has more tens.`],
    hints: () => ["Compare the tens digit — more tens means a bigger number."],
    distractorSpread: 20,
    declaredVariationSpace: 90 * 89,
    fr: {
      promptTemplates: ["{a} et {b} : lequel est le plus grand, et pourquoi ?"],
      explain: (v, r) => [`${r} est plus grand car il a plus de dizaines.`],
      hints: () => ["Compare le chiffre des dizaines — plus de dizaines signifie un plus grand nombre."]
    }
  }),
  orderingTemplate({
    key: "y1l2.orderAscending100", levelKey: "Y1L2", objectiveCode: "Y1-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = rng.shuffle([...Array(91).keys()].map((n) => n + 10)).slice(0, 4);
      return nums.map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the tens digit first, then the ones."],
    hints: () => ["Which number has the fewest tens?"],
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Compare d'abord le chiffre des dizaines, puis celui des unités."],
      hints: () => ["Quel nombre a le moins de dizaines ?"]
    },
    declaredVariationSpace: 4000
  }),
  orderingTemplate({
    key: "y1l2.orderDescending100", levelKey: "Y1L2", objectiveCode: "Y1-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = rng.shuffle([...Array(91).keys()].map((n) => n + 10)).slice(0, 4);
      return nums.map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["Compare the tens digit first, then the ones."],
    hints: () => ["Which number has the most tens?"],
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus grand au plus petit."],
      explain: () => ["Compare d'abord le chiffre des dizaines, puis celui des unités."],
      hints: () => ["Quel nombre a le plus de dizaines ?"]
    },
    declaredVariationSpace: 4000
  }),
  orderingTemplate({
    key: "y1l2.orderMultiplesOf10", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], direction: "asc",
    generateItems: (rng) => {
      const nums = rng.shuffle([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]).slice(0, 4);
      return nums.map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["These multiples of 10 are muddled up. Drag them into order, smallest first."],
    explain: () => ["Multiples of 10 go up in tens: 10, 20, 30..."],
    hints: () => ["Count in tens to check the order."],
    fr: {
      promptTemplates: ["Ces multiples de 10 sont mélangés. Fais-les glisser dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Les multiples de 10 augmentent de dix en dix : 10, 20, 30…"],
      hints: () => ["Compte de dix en dix pour vérifier l'ordre."]
    },
    declaredVariationSpace: 5040
  }),
  matchingTemplate({
    key: "y1l2.matchNumberTensOnes", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"],
    generatePairs: (rng) => {
      const tens = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      return tens.map((t) => {
        const ones = rng.int(0, 9);
        const n = t * 10 + ones;
        return { left: String(n), right: `${t} tens and ${ones} ones` };
      });
    },
    promptTemplates: ["Match each number to its tens and ones."],
    explain: () => ["Split each number into its tens digit and ones digit."],
    hints: () => ["The first digit is the tens; the second digit is the ones."],
    fr: {
      promptTemplates: ["Associe chaque nombre à ses dizaines et unités."],
      explain: () => ["Décompose chaque nombre en son chiffre des dizaines et son chiffre des unités."],
      hints: () => ["Le premier chiffre est celui des dizaines ; le second est celui des unités."],
      translatePairs: (pairs) => pairs.map((p) => {
        const m = p.right.match(/^(\d+) tens and (\d+) ones$/);
        if (!m) return p;
        return { left: p.left, right: `${m[1]} dizaines et ${m[2]} unités` };
      })
    },
    declaredVariationSpace: 3000
  }),
  matchingTemplate({
    key: "y1l2.matchSkipCountSequences", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"],
    generatePairs: (rng) => {
      const starts = rng.shuffle([0, 10, 20, 30, 40]).slice(0, 3);
      const steps = [2, 5, 10];
      return starts.map((s, i) => {
        const step = steps[i % steps.length]!;
        return { left: `${s}, ${s + step}, ${s + step * 2}, ___`, right: String(s + step * 3) };
      });
    },
    promptTemplates: ["Match each counting sequence to its next number."],
    explain: () => ["Work out the step size, then continue the pattern."],
    hints: () => ["Look at how much the numbers go up by each time."],
    fr: {
      promptTemplates: ["Associe chaque suite de comptage à son nombre suivant."],
      explain: () => ["Détermine le pas, puis continue la suite."],
      hints: () => ["Regarde de combien les nombres augmentent à chaque fois."]
    },
    declaredVariationSpace: 1200
  }),
  arithmeticTemplate({
    key: "y1l2.visualCountTensFrames", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "VISUAL_COUNT",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!, contextPool: CTX,
    promptTemplates: ["Count the full tens frames and the extra {ctx}. How many altogether?", "How many {ctx} are shown in the full ten frames and the extra ones?"],
    explain: (v, r) => [`${v[0]} full ten frames = ${v[0]! * 10}.`, `${v[0]! * 10} + ${v[1]} = ${r}.`],
    hints: () => ["Count the full frames in tens, then add the extra ones."],
    visualAid: (v) => visuals.tenFrame(v[0]! * 10 + v[1]!),
    declaredVariationSpace: 9 * 10 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Compte les cadres de dix complets et les {ctx} en plus. Combien y en a-t-il en tout ?", "Combien {de:ctx} sont montrés dans les cadres de dix complets et les unités en plus ?"],
      explain: (v, r) => [`${v[0]} cadres de dix complets = ${v[0]! * 10}.`, `${v[0]! * 10} + ${v[1]} = ${r}.`],
      hints: () => ["Compte les cadres complets de dix en dix, puis ajoute les unités en plus."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.moneyTensOnesContext", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MONEY",
    ranges: [[1, 9], [0, 9]], compute: (v) => v[0]! * 10 + v[1]!,
    promptTemplates: [
      "A jar has {a} bags of 10p and {b} loose 1p coins. How many pence in total?",
      "There are {a} ten-pence bags and {b} one-penny coins. What is the total in pence?"
    ],
    explain: (v, r) => [`${v[0]} bags of 10p = ${v[0]! * 10}p.`, `${v[0]! * 10}p + ${v[1]}p = ${r}p.`],
    hints: () => ["Multiply the bags by 10 pence, then add the loose pennies."],
    formatValue: (n) => `${n}p`,
    visualAid: (v) => visuals.coins(Array(v[0]!).fill(10).concat(Array(v[1]!).fill(1))),
    declaredVariationSpace: 9 * 10 * 2,
    fr: {
      promptTemplates: [
        "Un pot contient {a} sachets de 10p et {b} pièces de 1p en plus. Combien de pence en tout ?",
        "Il y a {a} sachets de dix pence et {b} pièces d'un penny. Quel est le total en pence ?"
      ],
      explain: (v, r) => [`${v[0]} sachets de 10p = ${v[0]! * 10}p.`, `${v[0]! * 10}p + ${v[1]}p = ${r}p.`],
      hints: () => ["Multiplie les sachets par 10 pence, puis ajoute les pennies restants."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.roundishNearestTen", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9]], compute: (v) => v[0]! * 10, contextPool: CTX,
    promptTemplates: [
      "What number is {a} tens?", "{a} tens is what number?",
      "Counting {ctx} in groups of 10: {a} full groups makes what number?",
      "If you have {a} groups of 10 {ctx}, how many {ctx} is that altogether?"
    ],
    explain: (v, r) => [`${v[0]} tens is ${r}.`],
    hints: () => ["Multiply the tens digit by 10."],
    declaredVariationSpace: 9 * (2 + 2 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Quel nombre font {a} dizaines ?", "{a} dizaines, c'est quel nombre ?",
        "En comptant les {ctx} par groupes de 10 : {a} groupes complets font quel nombre ?",
        "Si tu as {a} groupes de 10 {ctx}, combien {de:ctx} cela fait-il en tout ?"
      ],
      explain: (v, r) => [`${v[0]} dizaines font ${r}.`],
      hints: () => ["Multiplie le chiffre des dizaines par 10."]
    }
  }),
  categoricalPoolTemplate({
    key: "y1l2.tfIsMultipleOf10", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "TRUE_FALSE",
    pools: { place: ["classroom", "playground", "shop", "kitchen", "garden", "park", "library", "office"] },
    build: (picked, rng) => {
      const n = rng.int(1, 100);
      const isMultiple = n % 10 === 0;
      return {
        prompt: `In the ${picked.place}, there are ${n} ${plural(n, "items", "item")}. ${n} is a multiple of 10.`,
        correctLabel: isMultiple ? "True" : "False",
        distractorLabels: [isMultiple ? "False" : "True"],
        explanationSteps: [isMultiple ? `${n} ends in 0, so it is a multiple of 10.` : `${n} does not end in 0, so it is not a multiple of 10.`],
        hints: ["Multiples of 10 always end in a zero."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/there are (\d+) items/);
        const n = m ? m[1]! : "";
        const placeMap: Record<string, string> = { classroom: "la salle de classe", playground: "la cour de récréation", shop: "le magasin", kitchen: "la cuisine", garden: "le jardin", park: "le parc", library: "la bibliothèque", office: "le bureau" };
        const placeFr = placeMap[picked.place!] ?? picked.place!;
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Dans ${placeFr}, il y a ${n} ${plural(Number(n), "objets", "objet")}. ${n} est un multiple de 10.`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue ? `${n} se termine par 0, donc c'est un multiple de 10.` : `${n} ne se termine pas par 0, donc ce n'est pas un multiple de 10.`],
          hints: ["Les multiples de 10 se terminent toujours par un zéro."]
        };
      }
    },
    declaredVariationSpace: 8 * 100 * 2
  }),
  arithmeticTemplate({
    key: "y1l2.countOnFromNon10", levelKey: "Y1L2", objectiveCode: "Y1-L2-2", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[1, 90]], compute: (v) => v[0]! + 10, contextPool: CTX,
    promptTemplates: ["{a} + 10 = ___", "What is 10 more than {a}?", "Counting {ctx}: {a} plus 10 more is ___"],
    explain: (v, r) => [`Add 10 to ${v[0]}: the tens digit goes up by 1.`, `${v[0]} + 10 = ${r}.`],
    hints: () => ["Adding 10 only changes the tens digit."],
    declaredVariationSpace: 90 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + 10 = ___", "Combien font 10 de plus que {a} ?", "En comptant les {ctx} : {a} plus 10 de plus font ___"],
      explain: (v, r) => [`Ajoute 10 à ${v[0]} : le chiffre des dizaines augmente de 1.`, `${v[0]} + 10 = ${r}.`],
      hints: () => ["Ajouter 10 ne change que le chiffre des dizaines."]
    }
  }),
  arithmeticTemplate({
    key: "y1l2.mcNumberAfter100", levelKey: "Y1L2", objectiveCode: "Y1-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 99]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["Which number comes straight after {a}?", "What number is next after {a}?", "Counting {ctx}: which number comes straight after {a}?"],
    explain: (v, r) => [`Straight after ${v[0]} comes ${r}.`],
    hints: () => ["Count on one from the number."],
    distractorSpread: 3,
    declaredVariationSpace: 100 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre vient juste après {a} ?", "Quel est le nombre suivant après {a} ?", "En comptant les {ctx} : quel nombre vient juste après {a} ?"],
      explain: (v, r) => [`Juste après ${v[0]} vient ${r}.`],
      hints: () => ["Compte un de plus à partir du nombre."]
    }
  })
];

export default level;
