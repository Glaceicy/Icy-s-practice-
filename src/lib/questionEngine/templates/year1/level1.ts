import { arithmeticTemplate, matchingTemplate, orderingTemplate, plural } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 1 — "Counting, reading and writing numbers to 20"
// 30 base templates. Each template's declared variation space is verified
// empirically by tests/questionEngine.test.ts (>=150 distinct, valid variations).

const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];
const WORDS20 = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
];
const WORDS20_FR = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
  "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"
];

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y1l1.oneMoreThan", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 19]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["What number is one more than {a}?", "One more than {a} is...?", "There are {a} {ctx}. One more arrives. How many {ctx} now?"],
    explain: (v, r) => [`Start at ${v[0]}.`, `Count on 1 more: ${v[0]}, then ${r}.`, `One more than ${v[0]} is ${r}.`],
    hints: (v) => [`Say the number after ${v[0]} when counting up.`, "Use your fingers or a number line to count on 1."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! + 1, v[0]),
    declaredVariationSpace: 19 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre est un de plus que {a} ?", "Un de plus que {a}, c'est... ?", "Il y a {a} {ctx}. Un de plus arrive. Combien {de:ctx} y a-t-il maintenant ?"],
      explain: (v, r) => [`Commence à ${v[0]}.`, `Compte 1 de plus : ${v[0]}, puis ${r}.`, `Un de plus que ${v[0]} est ${r}.`],
      hints: (v) => [`Dis le nombre qui vient après ${v[0]} en comptant.`, "Utilise tes doigts ou une droite numérique pour compter 1 de plus."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.oneLessThan", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "NUMBER_ENTRY",
    ranges: [[2, 20]], compute: (v) => v[0]! - 1, contextPool: CTX,
    promptTemplates: ["What number is one less than {a}?", "One less than {a} is...?", "There are {a} {ctx}. One is given away. How many {ctx} are left?"],
    explain: (v, r) => [`Start at ${v[0]}.`, `Count back 1: ${v[0]}, then ${r}.`, `One less than ${v[0]} is ${r}.`],
    hints: (v) => [`Say the number before ${v[0]} when counting.`, "Use a number line and move back 1 step."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! - 1, v[0]),
    declaredVariationSpace: 19 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre est un de moins que {a} ?", "Un de moins que {a}, c'est... ?", "Il y a {a} {ctx}. On en donne un. Combien {de:ctx} reste-t-il ?"],
      explain: (v, r) => [`Commence à ${v[0]}.`, `Compte 1 de moins : ${v[0]}, puis ${r}.`, `Un de moins que ${v[0]} est ${r}.`],
      hints: (v) => [`Dis le nombre qui vient avant ${v[0]} en comptant.`, "Utilise une droite numérique et recule d'un pas."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.twoMoreThan", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["OFF_BY_ONE_COUNT", "MISCOUNTS_SKIP"], type: "NUMBER_ENTRY",
    ranges: [[1, 18]], compute: (v) => v[0]! + 2, contextPool: CTX,
    promptTemplates: ["What number is two more than {a}?", "Count on 2 from {a}. What do you land on?", "There are {a} {ctx}. Two more join them. How many now?"],
    explain: (v, r) => [`Start at ${v[0]}.`, `Count on 2: ${v[0]! + 1}, ${r}.`, `Two more than ${v[0]} is ${r}.`],
    hints: (v) => ["Count on two steps, one at a time.", `${v[0]}, ${v[0]! + 1}, ...?`],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! + 2, v[0]),
    declaredVariationSpace: 18 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre est deux de plus que {a} ?", "Compte 2 de plus à partir de {a}. Sur quel nombre tombes-tu ?", "Il y a {a} {ctx}. Deux de plus les rejoignent. Combien y en a-t-il maintenant ?"],
      explain: (v, r) => [`Commence à ${v[0]}.`, `Compte 2 de plus : ${v[0]! + 1}, ${r}.`, `Deux de plus que ${v[0]} est ${r}.`],
      hints: (v) => ["Compte deux pas, un à la fois.", `${v[0]}, ${v[0]! + 1}, ... ?`]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.twoLessThan", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["OFF_BY_ONE_COUNT", "MISCOUNTS_SKIP"], type: "NUMBER_ENTRY",
    ranges: [[3, 20]], compute: (v) => v[0]! - 2, contextPool: CTX,
    promptTemplates: ["What number is two less than {a}?", "Count back 2 from {a}. What do you land on?", "There are {a} {ctx}. Two are eaten. How many are left?"],
    explain: (v, r) => [`Start at ${v[0]}.`, `Count back 2: ${v[0]! - 1}, ${r}.`, `Two less than ${v[0]} is ${r}.`],
    hints: (v) => ["Count back two steps, one at a time.", `${v[0]}, ${v[0]! - 1}, ...?`],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]! - 2, v[0]),
    declaredVariationSpace: 18 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre est deux de moins que {a} ?", "Compte 2 de moins à partir de {a}. Sur quel nombre tombes-tu ?", "Il y a {a} {ctx}. On en mange deux. Combien en reste-t-il ?"],
      explain: (v, r) => [`Commence à ${v[0]}.`, `Compte 2 de moins : ${v[0]! - 1}, ${r}.`, `Deux de moins que ${v[0]} est ${r}.`],
      hints: (v) => ["Compte deux pas en arrière, un à la fois.", `${v[0]}, ${v[0]! - 1}, ... ?`]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.nextInSequence", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MISSING_NUMBER",
    ranges: [[1, 17]], compute: (v) => v[0]! + 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1, c: v[0]! + 2 }),
    promptTemplates: [
      "{a}, {b}, {c}, ___ . What comes next?",
      "Counting {ctx}: {a}, {b}, {c}, ___. What is the next number?",
      "Continue the pattern: {a}, {b}, {c}, ___"
    ],
    explain: (v) => [`This is a counting sequence starting at ${v[0]}.`, `Each number goes up by 1: ${v[0]}, ${v[0]! + 1}, ${v[0]! + 2}, ${v[0]! + 3}.`],
    hints: (v) => [`Count on from ${v[0]! + 2}.`],
    declaredVariationSpace: 17 * 17,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}, {b}, {c}, ___ . Que vient-il ensuite ?",
        "En comptant les {ctx} : {a}, {b}, {c}, ___. Quel est le nombre suivant ?",
        "Continue le motif : {a}, {b}, {c}, ___"
      ],
      explain: (v) => [`C'est une suite qui commence à ${v[0]}.`, `Chaque nombre augmente de 1 : ${v[0]}, ${v[0]! + 1}, ${v[0]! + 2}, ${v[0]! + 3}.`],
      hints: (v) => [`Compte à partir de ${v[0]! + 2}.`]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.prevInSequence", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MISSING_NUMBER",
    ranges: [[4, 20]], compute: (v) => v[0]! - 3, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1, c: v[0]! + 2 }),
    promptTemplates: [
      "___, {a}, {b}, {c} — the numbers count up. What is the missing first number?",
      "Counting {ctx}: ___, {a}, {b}, {c}. What is the missing first number?",
      "What number belongs before {a} in this pattern: ___, {a}, {b}, {c}?"
    ],
    explain: (v, r) => [`The sequence counts up by 1 each time.`, `Before ${v[0]} comes ${r}.`],
    hints: () => ["Count backwards one step at a time from the first number shown."],
    declaredVariationSpace: 17 * 17,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "___, {a}, {b}, {c} — les nombres augmentent. Quel est le premier nombre manquant ?",
        "En comptant les {ctx} : ___, {a}, {b}, {c}. Quel est le premier nombre manquant ?",
        "Quel nombre se trouve avant {a} dans ce motif : ___, {a}, {b}, {c} ?"
      ],
      explain: (v, r) => [`La suite augmente de 1 à chaque fois.`, `Avant ${v[0]} vient ${r}.`],
      hints: () => ["Compte à rebours, un pas à la fois, à partir du premier nombre indiqué."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.countObjects", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE", "SKIPS_OR_REPEATS_OBJECTS"], type: "VISUAL_COUNT",
    ranges: [[1, 20]], compute: (v) => v[0]!, contextPool: CTX,
    promptTemplates: ["Count the {ctx}. How many are there?", "How many {ctx} can you count?", "Look carefully and count the {ctx}. What is the total?"],
    explain: (v) => [`Count each one, touching it as you say the number.`, `There are ${v[0]} altogether.`],
    hints: () => ["Point to each object once as you count.", "Count carefully — don't skip any or count one twice."],
    visualAid: (v) => visuals.counters(v[0]!),
    declaredVariationSpace: 20 * 3 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Compte les {ctx}. Combien y en a-t-il ?", "Combien {de:ctx} peux-tu compter ?", "Regarde bien et compte les {ctx}. Quel est le total ?"],
      explain: (v) => [`Compte chacun d'eux, en le touchant en disant le nombre.`, `Il y en a ${v[0]} au total.`],
      hints: () => ["Pointe chaque objet une seule fois en comptant.", "Compte soigneusement — n'en saute aucun et n'en compte pas deux fois."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.countOn10Frame", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "VISUAL_COUNT",
    ranges: [[1, 20]], compute: (v) => v[0]!, contextPool: CTX,
    promptTemplates: ["How many {ctx} are shown in the ten frames?", "Count the {ctx} in the ten frames. How many are there?"],
    explain: (v) => [`Each square in a ten frame holds one counter.`, `${v[0]} ${plural(v[0]!, "squares are", "square is")} filled, so there are ${v[0]}.`],
    hints: () => ["Count the filled squares one at a time, ten frame by ten frame."],
    visualAid: (v) => visuals.tenFrame(v[0]!),
    declaredVariationSpace: 20 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Combien {de:ctx} sont montrés dans les cadres de dix ?", "Compte les {ctx} dans les cadres de dix. Combien y en a-t-il ?"],
      explain: (v) => [`Chaque case d'un cadre de dix contient un jeton.`, `${v[0]} ${plural(v[0]!, "cases sont remplies", "case est remplie")}, donc il y en a ${v[0]}.`],
      hints: () => ["Compte les cases remplies une par une, cadre de dix par cadre de dix."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.numberLinePosition", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "NUMBER_LINE",
    ranges: [[0, 20]], compute: (v) => v[0]!,
    promptTemplates: [
      "What number is the arrow pointing to on the number line?",
      "Read the number line. What number does the arrow show?",
      "Look at the number line — what number is marked?",
      "The arrow marks a number on the line. What is it?",
      "Which number does the pointer show on the number line?",
      "What value is the arrow indicating?",
      "Identify the number shown by the arrow on the number line.",
      "What number sits at the arrow's position?"
    ],
    explain: (v) => [`Count from 0 up to the marked position.`, `The arrow points to ${v[0]}.`],
    hints: () => ["Count the marks from 0 up to the arrow."],
    visualAid: (v) => visuals.numberLine(0, 20, v[0]!),
    declaredVariationSpace: 21 * 8,
    fr: {
      promptTemplates: [
        "Quel nombre la flèche indique-t-elle sur la droite numérique ?",
        "Lis la droite numérique. Quel nombre la flèche montre-t-elle ?",
        "Regarde la droite numérique — quel nombre est marqué ?",
        "La flèche marque un nombre sur la droite. Lequel est-ce ?",
        "Quel nombre le pointeur montre-t-il sur la droite numérique ?",
        "Quelle valeur la flèche indique-t-elle ?",
        "Identifie le nombre indiqué par la flèche sur la droite numérique.",
        "Quel nombre se trouve à la position de la flèche ?"
      ],
      explain: (v) => [`Compte à partir de 0 jusqu'à la position marquée.`, `La flèche indique ${v[0]}.`],
      hints: () => ["Compte les graduations de 0 jusqu'à la flèche."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.compareBigger", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20], [1, 20]], constraint: (v) => v[0] !== v[1],
    compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare ${v[0]} and ${v[1]}.`, `${r} is the bigger number.`],
    hints: () => ["The bigger number is further along the counting sequence."],
    distractorSpread: 4,
    declaredVariationSpace: 20 * 19,
    fr: {
      promptTemplates: ["Quel nombre est le plus grand, {a} ou {b} ?"],
      explain: (v, r) => [`Compare ${v[0]} et ${v[1]}.`, `${r} est le plus grand nombre.`],
      hints: () => ["Le plus grand nombre est plus loin dans la suite des nombres."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.compareSmaller", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20], [1, 20]], constraint: (v) => v[0] !== v[1],
    compute: (v) => Math.min(v[0]!, v[1]!),
    promptTemplates: ["Which number is smaller, {a} or {b}?"],
    explain: (v, r) => [`Compare ${v[0]} and ${v[1]}.`, `${r} is the smaller number.`],
    hints: () => ["The smaller number comes first when counting up."],
    distractorSpread: 4,
    declaredVariationSpace: 20 * 19,
    fr: {
      promptTemplates: ["Quel nombre est le plus petit, {a} ou {b} ?"],
      explain: (v, r) => [`Compare ${v[0]} et ${v[1]}.`, `${r} est le plus petit nombre.`],
      hints: () => ["Le plus petit nombre vient en premier quand on compte en montant."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.trueFalseOneMore", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "TRUE_FALSE",
    ranges: [[1, 19]], compute: (v) => v[0]! + 1,
    promptTemplates: ["One more than {a} is", "{a} plus 1 equals", "Add 1 to {a} and you get"],
    explain: (v, r) => [`One more than ${v[0]} is ${r}.`],
    hints: () => ["Count on one from the first number."],
    declaredVariationSpace: 19 * 3 * 7,
    fr: {
      promptTemplates: ["Un de plus que {a}, c'est", "{a} plus 1 égale", "Ajoute 1 à {a} et tu obtiens"],
      explain: (v, r) => [`Un de plus que ${v[0]} est ${r}.`],
      hints: () => ["Compte un de plus à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.trueFalseOneLess", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "TRUE_FALSE",
    ranges: [[2, 20]], compute: (v) => v[0]! - 1,
    promptTemplates: ["One less than {a} is", "{a} minus 1 equals", "Take 1 away from {a} and you get"],
    explain: (v, r) => [`One less than ${v[0]} is ${r}.`],
    hints: () => ["Count back one from the first number."],
    declaredVariationSpace: 19 * 3 * 7,
    fr: {
      promptTemplates: ["Un de moins que {a}, c'est", "{a} moins 1 égale", "Enlève 1 à {a} et tu obtiens"],
      explain: (v, r) => [`Un de moins que ${v[0]} est ${r}.`],
      hints: () => ["Compte un de moins à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.wordProblemCounting", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "WORD_PROBLEM",
    ranges: [[1, 20]], compute: (v) => v[0]!, contextPool: CTX,
    promptTemplates: [
      "Amrita has {a} {ctx} in a jar. Write the number of {ctx} she has as a numeral.",
      "There are {a} {ctx} on the table. Write this amount as a numeral."
    ],
    explain: (v) => [`Count to check: there are ${v[0]}.`, `Written as a numeral this is ${v[0]}.`],
    hints: () => ["A numeral is written using digits, like 7 or 14."],
    declaredVariationSpace: 20 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Amrita a {a} {ctx} dans un bocal. Écris en chiffres le nombre {de:ctx} qu'elle a.",
        "Il y a {a} {ctx} sur la table. Écris cette quantité en chiffres."
      ],
      explain: (v) => [`Compte pour vérifier : il y en a ${v[0]}.`, `Écrit en chiffres, cela donne ${v[0]}.`],
      hints: () => ["On écrit un nombre avec des chiffres, comme 7 ou 14."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.reasoningBetween", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "NUMBER_ENTRY",
    ranges: [[1, 18]], constraint: (v) => v[0]! + 2 <= 20,
    compute: (v) => v[0]! + 1, contextPool: CTX,
    derive: (v) => ({ c: v[0]! + 2 }),
    promptTemplates: [
      "What number is exactly between {a} and {c}?",
      "Find the number that comes exactly between {a} and {c}.",
      "There are {ctx} numbered {a} to {c}. Which number is in the middle?"
    ],
    explain: (v, r) => [`The number between ${v[0]} and ${v[0]! + 2} is ${r}.`],
    hints: (v) => [`Count on one from ${v[0]}.`],
    declaredVariationSpace: 18 * 10,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Quel nombre se trouve exactement entre {a} et {c} ?",
        "Trouve le nombre qui se trouve exactement entre {a} et {c}.",
        "Il y a des {ctx} numérotés de {a} à {c}. Quel nombre est au milieu ?"
      ],
      explain: (v, r) => [`Le nombre entre ${v[0]} et ${v[0]! + 2} est ${r}.`],
      hints: (v) => [`Compte un de plus à partir de ${v[0]}.`]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.reasoningWhichIsWrong", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 16]], compute: (v) => v[0]! + 1, contextPool: CTX,
    derive: (v) => ({ jump: v[0]! + 4 }),
    promptTemplates: [
      "Zac counted: {a}, {jump}. He missed some numbers. What is the number right after {a}?",
      "Mia jumped from {a} straight to {jump}. What number should come right after {a}?",
      "Counting {ctx}: {a}, {jump} ... What number comes straight after {a}?"
    ],
    explain: (v) => [`Right after ${v[0]} comes ${v[0]! + 1}.`],
    hints: (v) => [`Count on just one from ${v[0]}.`],
    distractorSpread: 3,
    declaredVariationSpace: 16 * 10,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Zac a compté : {a}, {jump}. Il a sauté des nombres. Quel est le nombre juste après {a} ?",
        "Mia est passée de {a} directement à {jump}. Quel nombre devrait venir juste après {a} ?",
        "En comptant les {ctx} : {a}, {jump} ... Quel nombre vient juste après {a} ?"
      ],
      explain: (v) => [`Juste après ${v[0]} vient ${v[0]! + 1}.`],
      hints: (v) => [`Compte juste un de plus à partir de ${v[0]}.`]
    }
  })
];

// Reading & writing numerals <-> words (Y1-L1-2), matching & ordering activities.
level.push(
  matchingTemplate({
    key: "y1l1.matchNumeralWord", levelKey: "Y1L1", objectiveCode: "Y1-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["NUMERAL_WORD_CONFUSION"],
    generatePairs: (rng) => {
      const nums = rng.shuffle([...Array(21).keys()]).slice(0, 4);
      return nums.map((n) => ({ left: String(n), right: WORDS20[n]! }));
    },
    promptTemplates: ["Match each numeral to its number word."],
    explain: () => ["Read each numeral aloud and find its matching word."],
    hints: () => ["Say the numeral out loud — that's the word you need to find."],
    declaredVariationSpace: 5985, // C(21,4) x 4! orderings, far exceeding 150
    fr: {
      promptTemplates: ["Associe chaque chiffre à son mot-nombre."],
      explain: () => ["Lis chaque chiffre à voix haute et trouve le mot qui correspond."],
      hints: () => ["Dis le chiffre à voix haute — c'est le mot que tu dois trouver."],
      translatePairs: (pairs) => pairs.map((p) => ({ left: p.left, right: WORDS20_FR[Number(p.left)] ?? p.right }))
    }
  }),
  orderingTemplate({
    key: "y1l1.orderAscending", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], direction: "asc",
    generateItems: (rng) => {
      const nums = rng.shuffle([...Array(21).keys()]).slice(0, 4);
      return nums.map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Find the smallest number first, then keep choosing the next smallest."],
    hints: () => ["Which number would you say first if you were counting?"],
    declaredVariationSpace: 5985,
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Trouve d'abord le plus petit nombre, puis choisis à chaque fois le suivant le plus petit."],
      hints: () => ["Quel nombre dirais-tu en premier si tu comptais ?"]
    }
  }),
  orderingTemplate({
    key: "y1l1.orderDescending", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], direction: "desc",
    generateItems: (rng) => {
      const nums = rng.shuffle([...Array(21).keys()]).slice(0, 4);
      return nums.map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["Find the largest number first, then keep choosing the next largest."],
    hints: () => ["Which number would you say last if you were counting up to it?"],
    declaredVariationSpace: 5985,
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus grand au plus petit."],
      explain: () => ["Trouve d'abord le plus grand nombre, puis choisis à chaque fois le suivant le plus grand."],
      hints: () => ["Quel nombre dirais-tu en dernier si tu comptais jusqu'à lui ?"]
    }
  }),
  orderingTemplate({
    key: "y1l1.orderWords", levelKey: "Y1L1", objectiveCode: "Y1-L1-2", difficulty: "REASONING",
    misconceptionTags: ["NUMERAL_WORD_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = rng.shuffle([...Array(11).keys()]).slice(0, 4);
      return nums.map((n) => ({ label: WORDS20[n]!, sortValue: n }));
    },
    promptTemplates: ["These number words are muddled up. Drag them into order, smallest first."],
    explain: () => ["Turn each word into its numeral in your head, then order the numerals."],
    hints: () => ["Say each word and think what numeral it means."],
    declaredVariationSpace: 330,
    fr: {
      promptTemplates: ["Ces mots-nombres sont mélangés. Fais-les glisser dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Transforme chaque mot en chiffre dans ta tête, puis mets les chiffres dans l'ordre."],
      hints: () => ["Dis chaque mot et réfléchis au chiffre qu'il représente."],
      translateLabels: (items) => items.map((it) => ({ ...it, label: WORDS20_FR[it.sortValue] ?? it.label }))
    }
  })
);

// A further set of 12 templates to reach 30 total, extending fluency,
// application and reasoning coverage for one-more/one-less, counting and comparison.
level.push(
  arithmeticTemplate({
    key: "y1l1.missingOneMore", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "MISSING_NUMBER",
    ranges: [[1, 19]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: [
      "{a} + 1 = ___", "___  is one more than {a}", "{a} plus 1 is ___",
      "Fill in the missing number: {a} + 1 = ___", "What is {a} + 1?",
      "___ comes right after {a}.", "There are {a} {ctx}. One more joins them: {a} + 1 = ___"
    ],
    explain: (v, r) => [`${v[0]} + 1 = ${r}`],
    hints: () => ["Count on one."],
    declaredVariationSpace: 19 * (6 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a} + 1 = ___", "___ est un de plus que {a}", "{a} plus 1 est ___",
        "Complète le nombre manquant : {a} + 1 = ___", "Combien font {a} + 1 ?",
        "___ vient juste après {a}.", "Il y a {a} {ctx}. Un de plus les rejoint : {a} + 1 = ___"
      ],
      explain: (v, r) => [`${v[0]} + 1 = ${r}`],
      hints: () => ["Compte un de plus."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.missingOneLess", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "MISSING_NUMBER",
    ranges: [[2, 20]], compute: (v) => v[0]! - 1, contextPool: CTX,
    promptTemplates: [
      "{a} - 1 = ___", "___  is one less than {a}", "{a} minus 1 is ___",
      "Fill in the missing number: {a} - 1 = ___", "What is {a} - 1?",
      "___ comes right before {a}.", "There are {a} {ctx}. One is taken away: {a} - 1 = ___"
    ],
    explain: (v, r) => [`${v[0]} - 1 = ${r}`],
    hints: () => ["Count back one."],
    declaredVariationSpace: 19 * (6 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a} - 1 = ___", "___ est un de moins que {a}", "{a} moins 1 est ___",
        "Complète le nombre manquant : {a} - 1 = ___", "Combien font {a} - 1 ?",
        "___ vient juste avant {a}.", "Il y a {a} {ctx}. On en enlève un : {a} - 1 = ___"
      ],
      explain: (v, r) => [`${v[0]} - 1 = ${r}`],
      hints: () => ["Compte un de moins."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.writeNumeralFromWord", levelKey: "Y1L1", objectiveCode: "Y1-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMERAL_WORD_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[0, 20]], compute: (v) => v[0]!, contextPool: CTX,
    derive: (v) => ({ word: WORDS20[v[0]!] ?? String(v[0]) }),
    promptTemplates: [
      "Write the numeral for the word '{word}'.", "What numeral means '{word}'?", "Turn the word '{word}' into a numeral.",
      "A label says there are '{word}' {ctx}. Write that as a numeral."
    ],
    explain: (v, r) => [`The word for ${r} is '${WORDS20[r]}'.`],
    hints: () => ["Think about how many ones this word means."],
    declaredVariationSpace: 21 * (3 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      derive: (v) => ({ word: WORDS20_FR[v[0]!] ?? String(v[0]) }),
      promptTemplates: [
        "Écris en chiffres le mot « {word} ».", "Quel chiffre correspond au mot « {word} » ?", "Transforme le mot « {word} » en chiffre.",
        "Une étiquette indique « {word} » {ctx}. Écris cela en chiffres."
      ],
      explain: (v, r) => [`Le mot pour ${r} est « ${WORDS20_FR[r]} ».`],
      hints: () => ["Réfléchis au nombre d'unités que représente ce mot."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.countBackFrom20", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MISSING_NUMBER",
    ranges: [[5, 20]], compute: (v) => v[0]! - 4, contextPool: CTX,
    derive: (v) => ({ b: v[0]! - 1 }),
    promptTemplates: [
      "Count back from {a}: {a}, {b}, ... what number is 4 less than {a}?",
      "Counting {ctx} backwards from {a}, {b}, ... what number is 4 less than {a}?",
      "Start at {a} and count back 4. What number do you reach?"
    ],
    explain: (v, r) => [`Counting back 4 from ${v[0]}: ${v[0]! - 1}, ${v[0]! - 2}, ${v[0]! - 3}, ${r}.`],
    hints: () => ["Count back one number at a time, four times."],
    declaredVariationSpace: 16 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Compte à rebours à partir de {a} : {a}, {b}, ... quel nombre est 4 de moins que {a} ?",
        "En comptant les {ctx} à rebours à partir de {a}, {b}, ... quel nombre est 4 de moins que {a} ?",
        "Commence à {a} et compte 4 en arrière. Quel nombre atteins-tu ?"
      ],
      explain: (v, r) => [`En comptant 4 en arrière à partir de ${v[0]} : ${v[0]! - 1}, ${v[0]! - 2}, ${v[0]! - 3}, ${r}.`],
      hints: () => ["Compte en arrière un nombre à la fois, quatre fois."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.countOnFrom", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MISSING_NUMBER",
    ranges: [[1, 16]], compute: (v) => v[0]! + 4, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1 }),
    promptTemplates: [
      "Count on from {a}: {a}, {b}, ... what number is 4 more than {a}?",
      "Counting {ctx} onwards from {a}, {b}, ... what number is 4 more than {a}?",
      "Start at {a} and count on 4. What number do you reach?"
    ],
    explain: (v, r) => [`Counting on 4 from ${v[0]}: ${v[0]! + 1}, ${v[0]! + 2}, ${v[0]! + 3}, ${r}.`],
    hints: () => ["Count on one number at a time, four times."],
    declaredVariationSpace: 16 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Compte à partir de {a} : {a}, {b}, ... quel nombre est 4 de plus que {a} ?",
        "En comptant les {ctx} à partir de {a}, {b}, ... quel nombre est 4 de plus que {a} ?",
        "Commence à {a} et compte 4 de plus. Quel nombre atteins-tu ?"
      ],
      explain: (v, r) => [`En comptant 4 de plus à partir de ${v[0]} : ${v[0]! + 1}, ${v[0]! + 2}, ${v[0]! + 3}, ${r}.`],
      hints: () => ["Compte un nombre à la fois, quatre fois."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.mcNumberAfter", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 19]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: ["Which number comes straight after {a}?", "What number is next after {a}?", "Counting {ctx}: which number comes straight after {a}?"],
    explain: (v, r) => [`Straight after ${v[0]} comes ${r}.`],
    hints: () => ["This is the next number when counting up."],
    distractorSpread: 2,
    declaredVariationSpace: 20 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre vient juste après {a} ?", "Quel est le nombre suivant après {a} ?", "En comptant les {ctx} : quel nombre vient juste après {a} ?"],
      explain: (v, r) => [`Juste après ${v[0]} vient ${r}.`],
      hints: () => ["C'est le nombre suivant quand on compte en montant."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.mcNumberBefore", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 20]], compute: (v) => v[0]! - 1, contextPool: CTX,
    promptTemplates: ["Which number comes straight before {a}?", "What number is just before {a}?", "Counting {ctx}: which number comes straight before {a}?"],
    explain: (v, r) => [`Straight before ${v[0]} comes ${r}.`],
    hints: () => ["This is the number just before when counting up."],
    distractorSpread: 2,
    declaredVariationSpace: 20 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Quel nombre vient juste avant {a} ?", "Quel est le nombre juste avant {a} ?", "En comptant les {ctx} : quel nombre vient juste avant {a} ?"],
      explain: (v, r) => [`Juste avant ${v[0]} vient ${r}.`],
      hints: () => ["C'est le nombre juste avant quand on compte en montant."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.countInTwos", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 8]], compute: (v) => v[0]! * 2 + 2, contextPool: CTX,
    derive: (v) => ({ shown: v[0]! * 2 }),
    promptTemplates: [
      "Counting in twos from 0: 0, 2, 4, ..., {shown}, ___. What comes next?",
      "Counting {ctx} in twos: 0, 2, 4, ..., {shown}, ___. What comes next?",
      "Skip counting {ctx} by 2s from 0, the sequence reaches {shown}. What is the next number?",
      "0, 2, 4, ..., {shown}, ___ — continue the {ctx} counting pattern."
    ],
    explain: (v, r) => [`Counting in 2s from 0: 0, 2, 4, ... The number after ${r - 2} is ${r}.`],
    hints: () => ["Add 2 each time."],
    declaredVariationSpace: 9 * (1 + 3 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "En comptant de deux en deux à partir de 0 : 0, 2, 4, ..., {shown}, ___. Que vient-il ensuite ?",
        "En comptant les {ctx} de deux en deux : 0, 2, 4, ..., {shown}, ___. Que vient-il ensuite ?",
        "En comptant les {ctx} de 2 en 2 à partir de 0, la suite atteint {shown}. Quel est le nombre suivant ?",
        "0, 2, 4, ..., {shown}, ___ — continue le motif de comptage des {ctx}."
      ],
      explain: (v, r) => [`En comptant de 2 en 2 à partir de 0 : 0, 2, 4, ... Le nombre après ${r - 2} est ${r}.`],
      hints: () => ["Ajoute 2 à chaque fois."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.reasoningOddOneOut", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SEQUENCE"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 18]], compute: (v) => v[0]! + 2, contextPool: CTX,
    derive: (v) => ({ b: v[0]! + 1 }),
    promptTemplates: [
      "In the sequence {a}, {b}, ___, which number is two more than {a}?",
      "Counting {ctx}: {a}, {b}, ___. Which number comes two after {a}?"
    ],
    explain: (v, r) => [`${v[0]} + 2 = ${r}.`],
    hints: () => ["Count on two from the first number."],
    distractorSpread: 3,
    declaredVariationSpace: 18 * (1 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Dans la suite {a}, {b}, ___, quel nombre est deux de plus que {a} ?",
        "En comptant les {ctx} : {a}, {b}, ___. Quel nombre vient deux après {a} ?"
      ],
      explain: (v, r) => [`${v[0]} + 2 = ${r}.`],
      hints: () => ["Compte deux de plus à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.tfNumberIsBigger", levelKey: "Y1L1", objectiveCode: "Y1-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "TRUE_FALSE",
    ranges: [[1, 20], [1, 20]], constraint: (v) => v[0] !== v[1],
    compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Between {a} and {b}, the bigger number is", "Comparing {a} and {b}, the larger number is"],
    explain: (v, r) => [`Comparing ${v[0]} and ${v[1]}: the bigger number is ${r}.`],
    hints: () => ["Compare the two numbers — which comes later when counting?"],
    distractorSpread: 4,
    declaredVariationSpace: 20 * 19 * 2,
    fr: {
      promptTemplates: ["Entre {a} et {b}, le plus grand nombre est", "En comparant {a} et {b}, le plus grand nombre est"],
      explain: (v, r) => [`En comparant ${v[0]} et ${v[1]} : le plus grand nombre est ${r}.`],
      hints: () => ["Compare les deux nombres — lequel vient plus tard en comptant ?"]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.wordProblemOneMoreItems", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "WORD_PROBLEM",
    ranges: [[1, 19]], compute: (v) => v[0]! + 1, contextPool: CTX,
    promptTemplates: [
      "Ben has {a} {ctx}. His friend gives him one more. How many {ctx} does Ben have now?",
      "Ben starts with {a} {ctx} and is given one more. How many {ctx} in total?"
    ],
    explain: (v, r) => [`Ben starts with ${v[0]}.`, `One more makes ${r}.`],
    hints: () => ["Count on one from the starting amount."],
    visualAid: (v) => visuals.counters(v[0]! + 1),
    declaredVariationSpace: 19 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Ben a {a} {ctx}. Son ami lui en donne un de plus. Combien {de:ctx} Ben a-t-il maintenant ?",
        "Ben commence avec {a} {ctx} et on lui en donne un de plus. Combien {de:ctx} a-t-il en tout ?"
      ],
      explain: (v, r) => [`Ben commence avec ${v[0]}.`, `Un de plus fait ${r}.`],
      hints: () => ["Compte un de plus à partir du nombre de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y1l1.wordProblemOneLessItems", levelKey: "Y1L1", objectiveCode: "Y1-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["OFF_BY_ONE_COUNT"], type: "WORD_PROBLEM",
    ranges: [[2, 20]], compute: (v) => v[0]! - 1, contextPool: CTX,
    promptTemplates: [
      "Priya has {a} {ctx}. She gives one away. How many {ctx} does Priya have left?",
      "Priya starts with {a} {ctx} and gives one to a friend. How many {ctx} does she have left?"
    ],
    explain: (v, r) => [`Priya starts with ${v[0]}.`, `One less makes ${r}.`],
    hints: () => ["Count back one from the starting amount."],
    visualAid: (v) => visuals.counters(v[0]! - 1),
    declaredVariationSpace: 19 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Priya a {a} {ctx}. Elle en donne un. Combien {de:ctx} reste-t-il à Priya ?",
        "Priya commence avec {a} {ctx} et en donne un à une amie. Combien {de:ctx} lui reste-t-il ?"
      ],
      explain: (v, r) => [`Priya commence avec ${v[0]}.`, `Un de moins fait ${r}.`],
      hints: () => ["Compte un de moins à partir du nombre de départ."]
    }
  })
);

export default level;
