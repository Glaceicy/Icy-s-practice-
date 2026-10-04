import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 6 — "Introduction to algebra"
const CTX = ["tickets", "stickers", "books", "pencils", "badges", "cakes", "plants", "tiles"];
const CTX_FR = ["billets", "autocollants", "livres", "crayons", "badges", "gâteaux", "plantes", "carreaux"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L6-1: use simple formulae expressed in words and symbols ---
  arithmeticTemplate({
    key: "y6l6.useSimpleFormula", levelKey: "Y6L6", objectiveCode: "Y6-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 12], [1, 20], [1, 20]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: [
      "A formula says: cost = {a} x n + {c}. What is the cost when n = {b}?",
      "The cost of {ctx} is {a} x n + {c} pence, where n is how many are bought. What is the cost when n = {b}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Replace n with its value, then multiply before adding."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une formule dit : coût = {a} x n + {c}. Quel est le coût quand n = {b} ?",
        "Le coût de {ctx} est {a} x n + {c} pence, où n est le nombre acheté. Quel est le coût quand n = {b} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
      hints: () => ["Remplace n par sa valeur, puis multiplie avant d'additionner."]
    },
    declaredVariationSpace: 11 * 20 * 20 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.perimeterFormula", levelKey: "Y6L6", objectiveCode: "Y6-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 40], [1, 40]], compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: [
      "The formula for the perimeter of a rectangle is P = 2(l + w). Find P when l = {a} and w = {b}.",
      "A rectangular tray of {ctx} has l = {a} cm and w = {b} cm. Using P = 2(l + w), what is P?"
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `2 x ${v[0]! + v[1]!} = ${r}.`],
    hints: () => ["Work out the bracket first, then double it."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "La formule du périmètre d'un rectangle est P = 2(L + l). Trouve P quand L = {a} et l = {b}.",
        "Un plateau rectangulaire de {ctx} a L = {a} cm et l = {b} cm. Avec P = 2(L + l), que vaut P ?"
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `2 x ${v[0]! + v[1]!} = ${r}.`],
      hints: () => ["Calcule d'abord la parenthèse, puis double le résultat."]
    },
    declaredVariationSpace: 40 * 40 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.formulaInWords", levelKey: "Y6L6", objectiveCode: "Y6-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[2, 15], [1, 25]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["To find the total, multiply the number of {ctx} by {a}. How much is the total when there are {b}?"],
    explain: (v, r) => [`${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Turn the words into a calculation, then work it out."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Pour trouver le total, multiplie le nombre de {ctx} par {a}. Quel est le total quand il y en a {b} ?"],
      explain: (v, r) => [`${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Transforme les mots en calcul, puis effectue-le."]
    },
    declaredVariationSpace: 14 * 25 * CTX.length
  }),
  arithmeticTemplate({
    key: "y6l6.mcUseFormula", levelKey: "Y6L6", objectiveCode: "Y6-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 12], [1, 20], [1, 20]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: ["Using the formula y = {a}n + {c}, what is y when n = {b}?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Multiply first, then add."],
    distractorSpread: 8,
    fr: {
      promptTemplates: ["Avec la formule y = {a}n + {c}, que vaut y quand n = {b} ?"],
      hints: () => ["Multiplie d'abord, puis additionne."]
    },
    declaredVariationSpace: 11 * 20 * 20
  }),
  arithmeticTemplate({
    key: "y6l6.reverseFormula", levelKey: "Y6L6", objectiveCode: "Y6-L6-1", difficulty: "REASONING",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 10], [1, 20], [1, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! + v[2]! }),
    promptTemplates: [
      "Using y = {a}n + {c}, if y = {total}, what is n?",
      "The cost of {ctx} is {a}n + {c} pence. If the cost is {total} pence, what is n?"
    ],
    explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} - ${v[2]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Undo the addition first, then undo the multiplication."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Avec y = {a}n + {c}, si y = {total}, que vaut n ?",
        "Le coût de {ctx} est {a}n + {c} pence. Si le coût est de {total} pence, que vaut n ?"
      ],
      explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} - ${v[2]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Annule d'abord l'addition, puis la multiplication."]
    },
    declaredVariationSpace: 9 * 20 * 20 * (1 + CTX.length)
  }),

  // --- Y6-L6-2: generate and describe linear number sequences ---
  arithmeticTemplate({
    key: "y6l6.nextTermInSequence", levelKey: "Y6L6", objectiveCode: "Y6-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 60], [2, 15]], compute: (v) => v[0]! + v[1]! * 3,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2 }),
    promptTemplates: [
      "{a}, {t2}, {t3}, ___ . What is the next term?",
      "Counting {ctx}: {a}, {t2}, {t3}, ___ . What comes next?"
    ],
    explain: (v, r) => [`Each term goes up by ${v[1]}.`, `${v[0]! + v[1]! * 2} + ${v[1]} = ${r}.`],
    hints: () => ["Find the step between terms, then add it once more."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}, {t2}, {t3}, ___ . Quel est le terme suivant ?",
        "En comptant des {ctx} : {a}, {t2}, {t3}, ___ . Que vient-il ensuite ?"
      ],
      explain: (v, r) => [`Chaque terme augmente de ${v[1]}.`, `${v[0]! + v[1]! * 2} + ${v[1]} = ${r}.`],
      hints: () => ["Trouve le pas entre les termes, puis ajoute-le une fois de plus."]
    },
    declaredVariationSpace: 60 * 14 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.sequenceStep", levelKey: "Y6L6", objectiveCode: "Y6-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 60], [2, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2, t4: v[0]! + v[1]! * 3 }),
    promptTemplates: [
      "{a}, {t2}, {t3}, {t4}. What is the step between terms?",
      "Counting {ctx}: {a}, {t2}, {t3}, {t4}. By how much does the sequence go up each time?"
    ],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract one term from the next."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}, {t2}, {t3}, {t4}. Quel est le pas entre les termes ?",
        "En comptant des {ctx} : {a}, {t2}, {t3}, {t4}. De combien la suite augmente-t-elle à chaque fois ?"
      ],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Soustrais un terme du suivant."]
    },
    declaredVariationSpace: 60 * 14 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.nthTermOfSequence", levelKey: "Y6L6", objectiveCode: "Y6-L6-2", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 12], [0, 20], [1, 20]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: [
      "A sequence has the rule {a}n + {b}. What is the {c}th term?",
      "Rows of {ctx} follow the rule {a}n + {b}. How many are in row {c}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the term number in place of n."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une suite a pour règle {a}n + {b}. Quel est le {c}e terme ?",
        "Des rangées de {ctx} suivent la règle {a}n + {b}. Combien y en a-t-il dans la rangée {c} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace n par le numéro du terme."]
    },
    declaredVariationSpace: 11 * 21 * 20 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.descendingSequence", levelKey: "Y6L6", objectiveCode: "Y6-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[40, 150], [2, 12]], compute: (v) => v[0]! - v[1]! * 3,
    derive: (v) => ({ t2: v[0]! - v[1]!, t3: v[0]! - v[1]! * 2 }),
    promptTemplates: [
      "{a}, {t2}, {t3}, ___ . What is the next term in this decreasing sequence?",
      "Counting {ctx} down: {a}, {t2}, {t3}, ___ . What comes next?"
    ],
    explain: (v, r) => [`Each term goes down by ${v[1]}.`, `${v[0]! - v[1]! * 2} - ${v[1]} = ${r}.`],
    hints: () => ["The sequence is decreasing — subtract the step each time."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}, {t2}, {t3}, ___ . Quel est le terme suivant de cette suite décroissante ?",
        "En comptant des {ctx} à rebours : {a}, {t2}, {t3}, ___ . Que vient-il ensuite ?"
      ],
      explain: (v, r) => [`Chaque terme diminue de ${v[1]}.`, `${v[0]! - v[1]! * 2} - ${v[1]} = ${r}.`],
      hints: () => ["La suite est décroissante — soustrais le pas à chaque fois."]
    },
    declaredVariationSpace: 111 * 11 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.mcNextTerm", levelKey: "Y6L6", objectiveCode: "Y6-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 60], [2, 15]], compute: (v) => v[0]! + v[1]! * 3,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2 }),
    promptTemplates: ["{a}, {t2}, {t3}, ___ . What comes next?"],
    explain: (v, r) => [`The step is ${v[1]}, so the next term is ${r}.`],
    hints: () => ["Find the difference between consecutive terms."],
    distractorSpread: 6,
    fr: {
      promptTemplates: ["{a}, {t2}, {t3}, ___ . Que vient-il ensuite ?"],
      hints: () => ["Trouve la différence entre les termes consécutifs."]
    },
    declaredVariationSpace: 60 * 14
  }),

  // --- Y6-L6-3: find pairs of numbers that satisfy an equation with two unknowns ---
  arithmeticTemplate({
    key: "y6l6.findPairSecondValue", levelKey: "Y6L6", objectiveCode: "Y6-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["TWO_UNKNOWNS_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1, 30], [1, 30]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! + v[1]! }),
    promptTemplates: [
      "a + b = {total}. If a = {a}, what is b?",
      "Two kinds of {ctx} total {total}. If there are {a} of the first kind, how many of the second?"
    ],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract the known value from the total."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "a + b = {total}. Si a = {a}, que vaut b ?",
        "Deux sortes de {ctx} font {total} en tout. S'il y en a {a} de la première sorte, combien de la seconde ?"
      ],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Soustrais la valeur connue du total."]
    },
    declaredVariationSpace: 30 * 30 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.findPairWithCoefficient", levelKey: "Y6L6", objectiveCode: "Y6-L6-3", difficulty: "REASONING",
    misconceptionTags: ["TWO_UNKNOWNS_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 8], [1, 15], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[1]! + v[2]! }),
    promptTemplates: [
      "{a}x + y = {total}. If x = {b}, what is y?",
      "Each box of {ctx} holds {a}, plus some loose ones. With {b} boxes the total is {total}. How many are loose?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]! + v[2]!} - ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Work out the first part, then subtract it from the total."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a}x + y = {total}. Si x = {b}, que vaut y ?",
        "Chaque boîte de {ctx} en contient {a}, plus quelques-uns en vrac. Avec {b} boîtes, le total est {total}. Combien y en a-t-il en vrac ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]! + v[2]!} - ${v[0]! * v[1]!} = ${r}.`],
      hints: () => ["Calcule la première partie, puis soustrais-la du total."]
    },
    declaredVariationSpace: 7 * 15 * 15 * (1 + CTX.length)
  }),
  arithmeticTemplate({
    key: "y6l6.countSolutionPairs", levelKey: "Y6L6", objectiveCode: "Y6-L6-3", difficulty: "REASONING",
    misconceptionTags: ["TWO_UNKNOWNS_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2, 60]], compute: (v) => v[0]! - 1,
    promptTemplates: [
      "a + b = {a}, where a and b are both whole numbers of at least 1. How many different pairs are possible?",
      "Two kinds of {ctx} total {a}, with at least 1 of each. How many different pairs are possible?"
    ],
    explain: (v, r) => [`The first number can be anything from 1 to ${v[0]! - 1}, giving ${r} pairs.`],
    hints: () => ["List the possibilities in order and look for the pattern."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "a + b = {a}, où a et b sont des entiers d'au moins 1. Combien de paires différentes sont possibles ?",
        "Deux sortes de {ctx} font {a} en tout, avec au moins 1 de chaque. Combien de paires différentes sont possibles ?"
      ],
      explain: (v, r) => [`Le premier nombre peut aller de 1 à ${v[0]! - 1}, soit ${r} paires.`],
      hints: () => ["Liste les possibilités dans l'ordre et cherche la régularité."]
    },
    declaredVariationSpace: 59 * (1 + CTX.length)
  }),
  categoricalPoolTemplate({
    key: "y6l6.tfSatisfiesEquation", levelKey: "Y6L6", objectiveCode: "Y6-L6-3", difficulty: "REASONING",
    misconceptionTags: ["TWO_UNKNOWNS_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const coeff = rng.int(2, 8);
      const x = rng.int(1, 15);
      const y = rng.int(1, 25);
      const total = coeff * x + y;
      const showTrue = rng.chance(0.5);
      const testY = showTrue ? y : y + rng.int(1, 8);
      return {
        prompt: `In ${coeff}x + y = ${total}, the pair x = ${x}, y = ${testY} works. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${coeff} x ${x} + ${testY} = ${coeff * x + testY}, and the equation needs ${total}.`],
        hints: ["Substitute both values in and check whether the equation balances."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^In (\d+)x \+ y = (\d+), the pair x = (\d+), y = (\d+) works\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Dans ${m[1]}x + y = ${m[2]}, la paire x = ${m[3]}, y = ${m[4]} convient. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Remplace les deux valeurs et vérifie si l'équation est équilibrée."]
        };
      }
    },
    declaredVariationSpace: 4000
  }),
  matchingTemplate({
    key: "y6l6.matchPairsToEquations", levelKey: "Y6L6", objectiveCode: "Y6-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["TWO_UNKNOWNS_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<number>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const total = rng.int(10, 60);
        if (used.has(total)) continue;
        used.add(total);
        const a = rng.int(1, total - 1);
        pairs.push({ left: `a + b = ${total}, a = ${a}`, right: `b = ${total - a}` });
      }
      return pairs;
    },
    promptTemplates: ["Match each equation and known value to the missing value."],
    explain: () => ["Subtract the known value from the total each time."],
    hints: () => ["The two numbers must add up to the total."],
    fr: {
      promptTemplates: ["Associe chaque équation et valeur connue à la valeur manquante."],
      explain: () => ["Soustrais à chaque fois la valeur connue du total."],
      hints: () => ["Les deux nombres doivent faire le total."]
    },
    declaredVariationSpace: 4000
  })
];

export default level;
