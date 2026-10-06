import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 3 — "Multiplication tables up to 12 x 12"
const GROUPS = ["boxes", "bags", "trays", "crates", "packets", "baskets", "shelves", "tables"];
const GROUPS_FR = ["boîtes", "sacs", "plateaux", "caisses", "paquets", "paniers", "étagères", "tables"];
const THINGS = ["apples", "pencils", "stickers", "marbles", "cakes", "books", "beads", "cards"];
const THINGS_FR = ["pommes", "crayons", "autocollants", "billes", "gâteaux", "livres", "perles", "cartes"];

export const level: QuestionTemplateDef[] = [
  // --- Y4-L3-1: recall of multiplication and division facts to 12 x 12 ---
  arithmeticTemplate({
    key: "y4l3.timesTableFact", levelKey: "Y4L3", objectiveCode: "Y4-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["TIMES_TABLE_RECALL_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "What is {a} x {b}?",
      "Work out {a} times {b}.",
      "{a} x {b} = ?",
      "How much is {a} lots of {b}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, `That is ${v[0]} groups of ${v[1]}.`],
    hints: () => ["If you cannot remember it, count up in steps of the smaller number."],
    fr: {
      promptTemplates: [
        "Que vaut {a} x {b} ?",
        "Calcule {a} fois {b}.",
        "{a} x {b} = ?",
        "Combien font {a} groupes de {b} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, `Cela fait ${v[0]} groupes de ${v[1]}.`],
      hints: () => ["Si tu ne t'en souviens pas, compte de proche en proche avec le plus petit nombre."]
    },
    declaredVariationSpace: 11 * 11 * 4
  }),
  arithmeticTemplate({
    key: "y4l3.divisionFact", levelKey: "Y4L3", objectiveCode: "Y4-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["TIMES_TABLE_RECALL_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ prod: v[0]! * v[1]! }),
    promptTemplates: [
      "What is {prod} ÷ {b}?",
      "Work out {prod} divided by {b}.",
      "{prod} ÷ {b} = ?",
      "How many {b}s are there in {prod}?"
    ],
    explain: (v, r) => [`${v[1]} x ${r} = ${v[0]! * v[1]!}, so ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Division is the opposite of multiplication — ask what times the divisor gives this number."],
    fr: {
      promptTemplates: [
        "Que vaut {prod} ÷ {b} ?",
        "Calcule {prod} divisé par {b}.",
        "{prod} ÷ {b} = ?",
        "Combien y a-t-il de {b} dans {prod} ?"
      ],
      explain: (v, r) => [`${v[1]} x ${r} = ${v[0]! * v[1]!}, donc ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["La division est l'inverse de la multiplication — demande-toi quel nombre fois le diviseur donne ce total."]
    },
    declaredVariationSpace: 11 * 11 * 4
  }),
  arithmeticTemplate({
    key: "y4l3.missingFactor", levelKey: "Y4L3", objectiveCode: "Y4-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ prod: v[0]! * v[1]! }),
    promptTemplates: [
      "{a} x ___ = {prod}. What number is missing?",
      "___ x {a} = {prod}. What number is missing?",
      "What do you multiply {a} by to get {prod}?"
    ],
    explain: (v, r) => [`Divide to find the missing factor: ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Use the matching division fact from the same times table."],
    fr: {
      promptTemplates: [
        "{a} x ___ = {prod}. Quel nombre manque ?",
        "___ x {a} = {prod}. Quel nombre manque ?",
        "Par combien faut-il multiplier {a} pour obtenir {prod} ?"
      ],
      explain: (v, r) => [`Divise pour trouver le facteur manquant : ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Utilise la division correspondante de la même table."]
    },
    declaredVariationSpace: 11 * 11 * 3
  }),
  arithmeticTemplate({
    key: "y4l3.commutativityFact", levelKey: "Y4L3", objectiveCode: "Y4-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["COMMUTATIVITY_MISUNDERSTANDING"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ prod: v[0]! * v[1]! }),
    promptTemplates: [
      "You know that {a} x {b} = {prod}. What is {b} x {a}?",
      "If {a} x {b} = {prod}, what is {b} x {a}?",
      "Multiplication can be done in any order. What is {b} x {a}?"
    ],
    explain: (v, r) => [`Multiplication is commutative, so the order does not change the answer.`, `${v[1]} x ${v[0]} = ${r}.`],
    hints: () => ["Swapping the two numbers in a multiplication never changes the answer."],
    fr: {
      promptTemplates: [
        "Tu sais que {a} x {b} = {prod}. Que vaut {b} x {a} ?",
        "Si {a} x {b} = {prod}, que vaut {b} x {a} ?",
        "La multiplication peut se faire dans n'importe quel ordre. Que vaut {b} x {a} ?"
      ],
      explain: (v, r) => [`La multiplication est commutative : l'ordre ne change pas le résultat.`, `${v[1]} x ${v[0]} = ${r}.`],
      hints: () => ["Échanger les deux nombres d'une multiplication ne change jamais le résultat."]
    },
    declaredVariationSpace: 11 * 11 * 3
  }),
  categoricalPoolTemplate({
    key: "y4l3.tfTimesTableFact", levelKey: "Y4L3", objectiveCode: "Y4-L3-1", difficulty: "REASONING",
    misconceptionTags: ["TIMES_TABLE_RECALL_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 12);
      const b = rng.int(2, 12);
      const isTrue = rng.chance(0.5);
      const shown = isTrue ? a * b : a * b + rng.pick([-a, a, -b, b]);
      return {
        prompt: `${a} x ${b} = ${shown}. True or false?`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`${a} x ${b} = ${a * b}.`, isTrue ? "So the statement is correct." : `${shown} is one group out, so the statement is wrong.`],
        hints: ["Count up in steps of one of the numbers to check."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Compte de proche en proche avec l'un des nombres pour vérifier."]
        };
      }
    },
    declaredVariationSpace: 11 * 11 * 2 * 4
  }),

  // --- Y4-L3-2: place value and known facts for mental calculation ---
  arithmeticTemplate({
    key: "y4l3.multiplyByMultipleOfTen", levelKey: "Y4L3", objectiveCode: "Y4-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_SCALING_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]! * v[1]! * 10,
    derive: (v) => ({ ten: v[1]! * 10 }),
    promptTemplates: [
      "What is {a} x {ten}?",
      "Use a known fact: {a} x {ten} = ?",
      "Work out {a} multiplied by {ten}."
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[1]! * 10} is ten times ${v[1]}, so the answer is ten times bigger: ${r}.`],
    hints: () => ["Use the times-table fact first, then make the answer ten times bigger."],
    fr: {
      promptTemplates: [
        "Que vaut {a} x {ten} ?",
        "Utilise un fait connu : {a} x {ten} = ?",
        "Calcule {a} multiplié par {ten}."
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[1]! * 10} vaut dix fois ${v[1]}, donc le résultat est dix fois plus grand : ${r}.`],
      hints: () => ["Utilise d'abord le fait de la table, puis rends le résultat dix fois plus grand."]
    },
    declaredVariationSpace: 11 * 11 * 3
  }),
  arithmeticTemplate({
    key: "y4l3.divideByMultipleOfTen", levelKey: "Y4L3", objectiveCode: "Y4-L3-2", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_SCALING_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ prod: v[0]! * v[1]! * 10, ten: v[1]! * 10 }),
    promptTemplates: [
      "What is {prod} ÷ {ten}?",
      "Use a known fact to work out {prod} ÷ {ten}."
    ],
    explain: (v, r) => [
      `${v[0]! * v[1]! * 10} ÷ 10 = ${v[0]! * v[1]!}.`,
      `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`
    ],
    hints: () => ["Divide by 10 first, then use the times-table fact."],
    fr: {
      promptTemplates: [
        "Que vaut {prod} ÷ {ten} ?",
        "Utilise un fait connu pour calculer {prod} ÷ {ten}."
      ],
      explain: (v, r) => [
        `${v[0]! * v[1]! * 10} ÷ 10 = ${v[0]! * v[1]!}.`,
        `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`
      ],
      hints: () => ["Divise d'abord par 10, puis utilise le fait de la table."]
    },
    declaredVariationSpace: 11 * 11 * 2
  }),
  arithmeticTemplate({
    key: "y4l3.multiplyBy100", levelKey: "Y4L3", objectiveCode: "Y4-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_SCALING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 99], [0, 1]], compute: (v) => (v[1]! === 0 ? v[0]! * 10 : v[0]! * 100),
    derive: (v) => ({ by: v[1]! === 0 ? 10 : 100 }),
    promptTemplates: [
      "What is {a} x {by}?",
      "Multiply {a} by {by}.",
      "Work out {a} x {by} by thinking about place value."
    ],
    explain: (v, r) => [
      `Multiplying by ${v[1]! === 0 ? 10 : 100} moves every digit ${v[1]! === 0 ? "one place" : "two places"} to the left.`,
      `${v[0]} becomes ${r}.`
    ],
    hints: () => ["The digits move left and zeros fill the empty columns — the digits themselves never change."],
    fr: {
      promptTemplates: [
        "Que vaut {a} x {by} ?",
        "Multiplie {a} par {by}.",
        "Calcule {a} x {by} en pensant à la valeur de position."
      ],
      explain: (v, r) => [
        `Multiplier par ${v[1]! === 0 ? 10 : 100} déplace chaque chiffre ${v[1]! === 0 ? "d'un rang" : "de deux rangs"} vers la gauche.`,
        `${v[0]} devient ${r}.`
      ],
      hints: () => ["Les chiffres se déplacent vers la gauche et des zéros remplissent les colonnes vides — les chiffres eux-mêmes ne changent jamais."]
    },
    declaredVariationSpace: 98 * 2 * 3
  }),
  arithmeticTemplate({
    key: "y4l3.doubleAndHalve", levelKey: "Y4L3", objectiveCode: "Y4-L3-2", difficulty: "REASONING",
    misconceptionTags: ["MENTAL_STRATEGY_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 12]], compute: (v) => v[0]! * v[1]! * 2,
    derive: (v) => ({ even: v[1]! * 2 }),
    promptTemplates: [
      "Work out {a} x {even} by doubling {a} x {b}.",
      "{a} x {b} is easy. Use it to find {a} x {even}."
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[1]! * 2} is double ${v[1]}, so double the answer: ${r}.`],
    hints: () => ["If one number doubles, the answer doubles too."],
    fr: {
      promptTemplates: [
        "Calcule {a} x {even} en doublant {a} x {b}.",
        "{a} x {b} est facile. Utilise-le pour trouver {a} x {even}."
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[1]! * 2} est le double de ${v[1]}, donc double le résultat : ${r}.`],
      hints: () => ["Si un nombre double, le résultat double aussi."]
    },
    declaredVariationSpace: 11 * 12 * 2
  }),
  arithmeticTemplate({
    key: "y4l3.nthMultiple", levelKey: "Y4L3", objectiveCode: "Y4-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["TIMES_TABLE_RECALL_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 15]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Counting in steps of {a}, what is the {b}th number you say?",
      "What is the {b}th multiple of {a}?",
      "Start at 0 and count up in {a}s. What is the {b}th number?"
    ],
    explain: (v, r) => [`The ${v[1]}th multiple of ${v[0]} is ${v[0]} x ${v[1]}.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["The nth multiple of a number is just that number times n."],
    fr: {
      promptTemplates: [
        "En comptant de {a} en {a}, quel est le {b}e nombre que tu dis ?",
        "Quel est le {b}e multiple de {a} ?",
        "Pars de 0 et compte de {a} en {a}. Quel est le {b}e nombre ?"
      ],
      explain: (v, r) => [`Le ${v[1]}e multiple de ${v[0]} est ${v[0]} x ${v[1]}.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Le ne multiple d'un nombre est simplement ce nombre fois n."]
    },
    declaredVariationSpace: 11 * 14 * 3
  }),

  // --- Y4-L3-3: factor pairs and commutativity ---
  arithmeticTemplate({
    key: "y4l3.factorPairPartner", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["FACTOR_MULTIPLE_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ prod: v[0]! * v[1]! }),
    promptTemplates: [
      "{a} is one factor of {prod}. What is its factor pair partner?",
      "{prod} = {a} x ___. Complete the factor pair.",
      "Find the number that goes with {a} to make a factor pair of {prod}."
    ],
    explain: (v, r) => [`A factor pair multiplies to give the number.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, so the pair is ${v[0]} and ${r}.`],
    hints: () => ["Divide the number by the factor you already have."],
    fr: {
      promptTemplates: [
        "{a} est un diviseur de {prod}. Quel est son partenaire dans la paire de facteurs ?",
        "{prod} = {a} x ___. Complète la paire de facteurs.",
        "Trouve le nombre qui va avec {a} pour former une paire de facteurs de {prod}."
      ],
      explain: (v, r) => [`Une paire de facteurs se multiplie pour donner le nombre.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, donc la paire est ${v[0]} et ${r}.`],
      hints: () => ["Divise le nombre par le facteur que tu as déjà."]
    },
    declaredVariationSpace: 11 * 11 * 3
  }),
  categoricalPoolTemplate({
    key: "y4l3.mcFactorOrMultiple", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "REASONING",
    misconceptionTags: ["FACTOR_MULTIPLE_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { relation: ["factor", "multiple", "neither"] },
    build: (picked, rng) => {
      const base = rng.int(3, 12);
      const k = rng.int(2, 9);
      const relation = picked.relation!;
      const other = relation === "factor" ? base : relation === "multiple" ? base * k : base * k + 1;
      const target = relation === "factor" ? base * k : base;
      const labels: Record<string, string> = {
        factor: `${other} is a factor of ${target}`,
        multiple: `${other} is a multiple of ${target}`,
        neither: `${other} is neither a factor nor a multiple of ${target}`
      };
      return {
        prompt: `How are ${other} and ${target} related?`,
        correctLabel: labels[relation]!,
        distractorLabels: Object.values(labels).filter((l) => l !== labels[relation]),
        explanationSteps: [relation === "factor"
          ? `${other} divides exactly into ${target}, so it is a factor.`
          : relation === "multiple"
            ? `${other} is in the ${target} times table, so it is a multiple.`
            : `${other} does not divide into ${target} and is not in its times table.`],
        hints: ["A factor divides exactly into a number; a multiple is in that number's times table."]
      };
    },
    fr: {
      translate: (drawn) => {
        const toFr = (label: string) => label
          .replace(/^(\d+) is a factor of (\d+)$/, "$1 est un diviseur de $2")
          .replace(/^(\d+) is a multiple of (\d+)$/, "$1 est un multiple de $2")
          .replace(/^(\d+) is neither a factor nor a multiple of (\d+)$/, "$1 n'est ni un diviseur ni un multiple de $2");
        const m = drawn.prompt.match(/^How are (\d+) and (\d+) related\?$/);
        if (!m) return {};
        return {
          prompt: `Quelle est la relation entre ${m[1]} et ${m[2]} ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          hints: ["Un diviseur divise exactement le nombre ; un multiple se trouve dans sa table de multiplication."]
        };
      }
    },
    declaredVariationSpace: 3 * 10 * 8
  }),
  arithmeticTemplate({
    key: "y4l3.multiplyThreeNumbers", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "REASONING",
    misconceptionTags: ["COMMUTATIVITY_MISUNDERSTANDING"], type: "MULTI_STEP",
    ranges: [[2, 6], [2, 6], [2, 12]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: [
      "Work out {a} x {b} x {c}.",
      "Multiply {a}, {b} and {c} together. You can choose the order.",
      "What is {a} x {b} x {c}? Pick the easiest pair to multiply first."
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} x ${v[2]} = ${r}.`],
    hints: () => ["You can multiply in any order — start with the pair that gives an easy number."],
    fr: {
      promptTemplates: [
        "Calcule {a} x {b} x {c}.",
        "Multiplie {a}, {b} et {c} ensemble. Tu peux choisir l'ordre.",
        "Que vaut {a} x {b} x {c} ? Choisis d'abord la paire la plus facile."
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} x ${v[2]} = ${r}.`],
      hints: () => ["Tu peux multiplier dans n'importe quel ordre — commence par la paire qui donne un nombre facile."]
    },
    declaredVariationSpace: 5 * 5 * 11 * 3
  }),
  arithmeticTemplate({
    key: "y4l3.wordProblemEqualGroups", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM", contextPool: GROUPS,
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "There are {a} {ctx} with {b} items in each. How many items are there altogether?",
      "{a} {ctx} each hold {b} things. How many things in total?"
    ],
    explain: (v, r) => [`Equal groups mean multiply.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["When every group has the same number, multiply the number of groups by the group size."],
    fr: {
      contextPool: GROUPS_FR,
      promptTemplates: [
        "Il y a {a} {ctx}, avec {b} objets dans chaque. Combien d'objets y a-t-il en tout ?",
        "On a {a} {ctx} et {b} choses dans chaque. Combien de choses au total ?"
      ],
      explain: (v, r) => [`Des groupes égaux veulent dire multiplier.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Quand chaque groupe a le même nombre, multiplie le nombre de groupes par la taille du groupe."]
    },
    declaredVariationSpace: 11 * 11 * (1 + GROUPS.length)
  }),
  arithmeticTemplate({
    key: "y4l3.wordProblemSharing", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM", contextPool: THINGS,
    ranges: [[2, 12], [2, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "{total} {ctx} are shared equally between {a} children. How many does each child get?",
      "{total} {ctx} are put into {a} equal piles. How many are in each pile?"
    ],
    explain: (v, r) => [`Sharing equally means divide.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["\"Shared equally between\" tells you to divide."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "{total} {ctx} sont partagés également entre {a} enfants. Combien chacun en reçoit-il ?",
        "{total} {ctx} sont répartis en {a} tas égaux. Combien y en a-t-il dans chaque tas ?"
      ],
      explain: (v, r) => [`Partager également veut dire diviser.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["« Partagé également entre » indique qu'il faut diviser."]
    },
    declaredVariationSpace: 11 * 11 * (1 + THINGS.length)
  }),
  arithmeticTemplate({
    key: "y4l3.missingDividend", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[2, 12], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "___ ÷ {a} = {b}. What number is missing?",
      "A number divided by {a} gives {b}. What is the number?",
      "{b} groups of {a} were made. How many were there to start with?"
    ],
    explain: (v, r) => [`Multiplication undoes division.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["To find the number you started with, multiply the answer by the divisor."],
    fr: {
      promptTemplates: [
        "___ ÷ {a} = {b}. Quel nombre manque ?",
        "Un nombre divisé par {a} donne {b}. Quel est ce nombre ?",
        "{b} groupes de {a} ont été formés. Combien y en avait-il au départ ?"
      ],
      explain: (v, r) => [`La multiplication annule la division.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Pour retrouver le nombre de départ, multiplie le résultat par le diviseur."]
    },
    declaredVariationSpace: 11 * 11 * 3
  }),
  arithmeticTemplate({
    key: "y4l3.scalingBySmallFactor", levelKey: "Y4L3", objectiveCode: "Y4-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM", contextPool: THINGS,
    ranges: [[3, 60], [2, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Sam has {a} {ctx}. Ali has {b} times as many. How many does Ali have?",
      "A bag holds {a} items. A crate holds {b} times as many. How many is that?"
    ],
    explain: (v, r) => [`"{b} times as many" means multiply.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["\"Times as many\" is a multiplying phrase."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Sam a {a} {ctx}. Ali en a {b} fois plus. Combien Ali en a-t-il ?",
        "Un sac contient {a} objets. Une caisse en contient {b} fois plus. Combien cela fait-il ?"
      ],
      explain: (v, r) => [`« {b} fois plus » veut dire multiplier.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["« Fois plus » est une expression de multiplication."]
    },
    declaredVariationSpace: 58 * 11 * (1 + THINGS.length)
  })
];

export default level;
