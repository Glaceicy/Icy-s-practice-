import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 2 — "Addition and subtraction"
const CTX = ["visitors", "books", "stickers", "marbles", "tickets", "stamps", "beads", "cards"];
const CTX_FR = ["visiteurs", "livres", "autocollants", "billes", "billets", "timbres", "perles", "cartes"];
const PLACES = ["a museum", "a library", "a football ground", "a theme park", "a school fair", "a cinema"];
const PLACES_FR = ["un musée", "une bibliothèque", "un stade de football", "un parc d'attractions", "une kermesse", "un cinéma"];

export const level: QuestionTemplateDef[] = [
  // --- Y4-L2-1: formal written column addition and subtraction ---
  arithmeticTemplate({
    key: "y4l2.columnAddition", levelKey: "Y4L2", objectiveCode: "Y4-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[1000, 8999], [100, 999]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "Work out {a} + {b}.",
      "Use column addition to find {a} + {b}.",
      "A shop counted {a} {ctx} and then {b} more. How many is that altogether?"
    ],
    explain: (v, r) => [`Line up the digits in their columns: ones, tens, hundreds, thousands.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Start from the ones column and carry anything over ten into the next column."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Calcule {a} + {b}.",
        "Utilise l'addition posée pour trouver {a} + {b}.",
        "Un magasin a compté {a} {ctx} puis {b} de plus. Combien cela fait-il en tout ?"
      ],
      explain: (v, r) => [`Aligne les chiffres dans leurs colonnes : unités, dizaines, centaines, milliers.`, `${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Commence par la colonne des unités et reporte ce qui dépasse dix dans la colonne suivante."]
    },
    declaredVariationSpace: 8000 * 900
  }),
  arithmeticTemplate({
    key: "y4l2.columnAdditionFourDigits", levelKey: "Y4L2", objectiveCode: "Y4-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 4999], [1000, 4999]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "Work out {a} + {b}.",
      "Add these two four-digit numbers: {a} + {b}.",
      "Use the column method for {a} + {b}."
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, `Remember to carry when a column adds to ten or more.`],
    hints: () => ["Write one number above the other with the ones digits lined up."],
    fr: {
      promptTemplates: [
        "Calcule {a} + {b}.",
        "Additionne ces deux nombres à quatre chiffres : {a} + {b}.",
        "Utilise la méthode posée pour {a} + {b}."
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, `N'oublie pas la retenue quand une colonne atteint dix ou plus.`],
      hints: () => ["Écris un nombre au-dessus de l'autre en alignant les unités."]
    },
    declaredVariationSpace: 4000 * 4000
  }),
  arithmeticTemplate({
    key: "y4l2.columnSubtraction", levelKey: "Y4L2", objectiveCode: "Y4-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_EXCHANGE_ERROR"], type: "NUMBER_ENTRY", contextPool: CTX,
    ranges: [[2000, 9999], [1000, 1999]], compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "Work out {a} - {b}.",
      "Use column subtraction to find {a} - {b}.",
      "There were {a} {ctx} and {b} were taken away. How many are left?"
    ],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, `Exchange from the next column whenever the top digit is too small.`],
    hints: () => ["If you cannot take the bottom digit from the top one, exchange a ten from the column to the left."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Calcule {a} - {b}.",
        "Utilise la soustraction posée pour trouver {a} - {b}.",
        "Il y avait {a} {ctx} et {b} ont été retirés. Combien en reste-t-il ?"
      ],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, `Emprunte à la colonne suivante dès que le chiffre du haut est trop petit.`],
      hints: () => ["Si tu ne peux pas retirer le chiffre du bas de celui du haut, emprunte une dizaine à gauche."]
    },
    declaredVariationSpace: 8000 * 1000
  }),
  arithmeticTemplate({
    key: "y4l2.subtractThreeFromFour", levelKey: "Y4L2", objectiveCode: "Y4-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_EXCHANGE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [100, 999]], compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "Work out {a} - {b}.",
      "Take {b} away from {a}.",
      "What is {b} less than {a}?"
    ],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Line up the ones under the ones, even though one number is shorter."],
    fr: {
      promptTemplates: [
        "Calcule {a} - {b}.",
        "Retire {b} de {a}.",
        "Quel nombre est {b} de moins que {a} ?"
      ],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Aligne les unités sous les unités, même si un nombre est plus court."]
    },
    declaredVariationSpace: 9000 * 900
  }),
  arithmeticTemplate({
    key: "y4l2.missingAddend", levelKey: "Y4L2", objectiveCode: "Y4-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1000, 5999], [100, 3999]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! + v[1]! }),
    promptTemplates: [
      "{a} + ___ = {total}. What number is missing?",
      "What must be added to {a} to make {total}?"
    ],
    explain: (v, r) => [`Use the inverse: ${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtracting undoes adding, so take the number you know away from the total."],
    fr: {
      promptTemplates: [
        "{a} + ___ = {total}. Quel nombre manque ?",
        "Que faut-il ajouter à {a} pour obtenir {total} ?"
      ],
      explain: (v, r) => [`Utilise l'opération inverse : ${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["La soustraction annule l'addition : retire le nombre connu du total."]
    },
    declaredVariationSpace: 5000 * 3900
  }),

  // --- Y4-L2-2: estimating and inverse operations ---
  arithmeticTemplate({
    key: "y4l2.estimateSumToNearest100", levelKey: "Y4L2", objectiveCode: "Y4-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTI_STEP",
    ranges: [[1000, 8999], [1000, 8999]],
    compute: (v) => Math.round(v[0]! / 100) * 100 + Math.round(v[1]! / 100) * 100,
    promptTemplates: [
      "Estimate {a} + {b} by rounding each number to the nearest 100.",
      "Round {a} and {b} to the nearest 100, then add them. What is your estimate?"
    ],
    explain: (v, r) => [
      `${v[0]} rounds to ${Math.round(v[0]! / 100) * 100} and ${v[1]} rounds to ${Math.round(v[1]! / 100) * 100}.`,
      `${Math.round(v[0]! / 100) * 100} + ${Math.round(v[1]! / 100) * 100} = ${r}.`
    ],
    hints: () => ["Look at the tens digit of each number to decide which hundred it is closest to."],
    fr: {
      promptTemplates: [
        "Estime {a} + {b} en arrondissant chaque nombre à la centaine la plus proche.",
        "Arrondis {a} et {b} à la centaine la plus proche, puis additionne. Quelle est ton estimation ?"
      ],
      explain: (v, r) => [
        `${v[0]} s'arrondit à ${Math.round(v[0]! / 100) * 100} et ${v[1]} à ${Math.round(v[1]! / 100) * 100}.`,
        `${Math.round(v[0]! / 100) * 100} + ${Math.round(v[1]! / 100) * 100} = ${r}.`
      ],
      hints: () => ["Regarde le chiffre des dizaines de chaque nombre pour savoir de quelle centaine il est le plus proche."]
    },
    declaredVariationSpace: 8000 * 8000
  }),
  arithmeticTemplate({
    key: "y4l2.estimateDifferenceToNearest1000", levelKey: "Y4L2", objectiveCode: "Y4-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTI_STEP",
    ranges: [[4000, 9999], [1000, 3999]],
    compute: (v) => Math.round(v[0]! / 1000) * 1000 - Math.round(v[1]! / 1000) * 1000,
    promptTemplates: [
      "Estimate {a} - {b} by rounding each number to the nearest 1,000.",
      "Round {a} and {b} to the nearest 1,000, then subtract. What is your estimate?"
    ],
    explain: (v, r) => [
      `${v[0]} rounds to ${Math.round(v[0]! / 1000) * 1000} and ${v[1]} rounds to ${Math.round(v[1]! / 1000) * 1000}.`,
      `${Math.round(v[0]! / 1000) * 1000} - ${Math.round(v[1]! / 1000) * 1000} = ${r}.`
    ],
    hints: () => ["Look at the hundreds digit to decide which thousand each number is closest to."],
    fr: {
      promptTemplates: [
        "Estime {a} - {b} en arrondissant chaque nombre au millier le plus proche.",
        "Arrondis {a} et {b} au millier le plus proche, puis soustrais. Quelle est ton estimation ?"
      ],
      explain: (v, r) => [
        `${v[0]} s'arrondit à ${Math.round(v[0]! / 1000) * 1000} et ${v[1]} à ${Math.round(v[1]! / 1000) * 1000}.`,
        `${Math.round(v[0]! / 1000) * 1000} - ${Math.round(v[1]! / 1000) * 1000} = ${r}.`
      ],
      hints: () => ["Regarde le chiffre des centaines pour savoir de quel millier chaque nombre est le plus proche."]
    },
    declaredVariationSpace: 6000 * 3000
  }),
  arithmeticTemplate({
    key: "y4l2.inverseCheckAddition", levelKey: "Y4L2", objectiveCode: "Y4-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MULTI_STEP",
    ranges: [[1000, 6999], [100, 2999]], compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! + v[1]! }),
    promptTemplates: [
      "A child works out {a} + {b} = {total}. Checking with the inverse, what is {total} - {b}?",
      "If {a} + {b} = {total}, what is {total} - {b}?"
    ],
    explain: (v, r) => [`Subtraction undoes addition.`, `${v[0]! + v[1]!} - ${v[1]} = ${r}, which matches the number we started with.`],
    hints: () => ["If the answer is right, taking one part away from the total gives back the other part."],
    fr: {
      promptTemplates: [
        "Un enfant calcule {a} + {b} = {total}. En vérifiant par l'opération inverse, que vaut {total} - {b} ?",
        "Si {a} + {b} = {total}, que vaut {total} - {b} ?"
      ],
      explain: (v, r) => [`La soustraction annule l'addition.`, `${v[0]! + v[1]!} - ${v[1]} = ${r}, ce qui redonne le nombre de départ.`],
      hints: () => ["Si la réponse est juste, retirer une partie du total redonne l'autre partie."]
    },
    declaredVariationSpace: 6000 * 2900
  }),
  categoricalPoolTemplate({
    key: "y4l2.mcReasonableEstimate", levelKey: "Y4L2", objectiveCode: "Y4-L2-2", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1000, 4999);
      const b = rng.int(1000, 4999);
      const exact = a + b;
      const good = Math.round(a / 100) * 100 + Math.round(b / 100) * 100;
      const labels = [`about ${good}`, `about ${good * 10}`, `about ${Math.round(good / 10)}`, `about ${good + 3000}`];
      return {
        prompt: `Which is the best estimate for ${a} + ${b}?`,
        correctLabel: labels[0]!,
        distractorLabels: labels.slice(1).filter((l) => l !== labels[0]).slice(0, 3),
        explanationSteps: [`Rounding each number to the nearest 100 gives about ${good}.`, `The exact answer is ${exact}, which is close to that estimate.`],
        hints: ["A good estimate should be close to the real answer, not ten times bigger or smaller."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which is the best estimate for (.+)\?$/);
        if (!m) return {};
        return {
          prompt: `Quelle est la meilleure estimation de ${m[1]} ?`,
          correctLabel: drawn.correctLabel.replace("about", "environ"),
          distractorLabels: drawn.distractorLabels.map((d) => d.replace("about", "environ")),
          hints: ["Une bonne estimation doit être proche de la vraie réponse, pas dix fois plus grande ou plus petite."]
        };
      }
    },
    declaredVariationSpace: 4000 * 4000
  }),
  categoricalPoolTemplate({
    key: "y4l2.tfInverseCheck", levelKey: "Y4L2", objectiveCode: "Y4-L2-2", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1000, 6999);
      const b = rng.int(100, 2999);
      const correctSum = a + b;
      const isTrue = rng.chance(0.5);
      const shown = isTrue ? correctSum : correctSum + rng.int(1, 9) * 10;
      return {
        prompt: `${a} + ${b} = ${shown}. True or false?`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`Check with the inverse: ${shown} - ${b} = ${shown - b}.`, isTrue
          ? `That gives back ${a}, so the sum is correct.`
          : `That does not give back ${a}, so the sum is wrong — it should be ${correctSum}.`],
        hints: ["Take one of the numbers away from the answer and see whether you get the other one back."]
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
          hints: ["Retire l'un des nombres du résultat et vois si tu retrouves l'autre."]
        };
      }
    },
    declaredVariationSpace: 6000 * 2900 * 2
  }),

  // --- Y4-L2-3: two-step problems ---
  arithmeticTemplate({
    key: "y4l2.twoStepAddThenSubtract", levelKey: "Y4L2", objectiveCode: "Y4-L2-3", difficulty: "REASONING",
    misconceptionTags: ["MULTI_STEP_ORDER_ERROR"], type: "MULTI_STEP", contextPool: PLACES,
    ranges: [[1000, 5999], [100, 2999], [100, 2999]],
    constraint: (v) => v[0]! + v[1]! > v[2]!,
    compute: (v) => v[0]! + v[1]! - v[2]!,
    promptTemplates: [
      "{ctx} had {a} visitors on Saturday and {b} more on Sunday, then {c} people left. How many remain?",
      "Start with {a}, add {b}, then subtract {c}. What is the answer?"
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Do one step at a time and write down the answer to the first step before starting the second."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "{ctx} a reçu {a} visiteurs samedi et {b} de plus dimanche, puis {c} personnes sont parties. Combien en reste-t-il ?",
        "Pars de {a}, ajoute {b}, puis retire {c}. Quel est le résultat ?"
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
      hints: () => ["Fais une étape à la fois et note le résultat de la première avant de commencer la seconde."]
    },
    declaredVariationSpace: 5000 * 2900 * 2900
  }),
  arithmeticTemplate({
    key: "y4l2.twoStepSubtractTwice", levelKey: "Y4L2", objectiveCode: "Y4-L2-3", difficulty: "REASONING",
    misconceptionTags: ["MULTI_STEP_ORDER_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[5000, 9999], [100, 2499], [100, 2499]],
    compute: (v) => v[0]! - v[1]! - v[2]!,
    promptTemplates: [
      "A collection of {a} {ctx} loses {b} and then another {c}. How many are left?",
      "Start with {a}, subtract {b}, then subtract {c}. What is the answer?"
    ],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${v[0]! - v[1]!}.`, `${v[0]! - v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Take away the first amount, then take the second amount from what is left."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une collection de {a} {ctx} en perd {b} puis encore {c}. Combien en reste-t-il ?",
        "Pars de {a}, retire {b}, puis retire {c}. Quel est le résultat ?"
      ],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${v[0]! - v[1]!}.`, `${v[0]! - v[1]!} - ${v[2]} = ${r}.`],
      hints: () => ["Retire la première quantité, puis retire la seconde de ce qui reste."]
    },
    declaredVariationSpace: 5000 * 2400 * 2400
  }),
  arithmeticTemplate({
    key: "y4l2.differenceWordProblem", levelKey: "Y4L2", objectiveCode: "Y4-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM", contextPool: PLACES,
    ranges: [[3000, 9999], [1000, 2999]], compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "{ctx} sold {a} tickets this year and {b} last year. How many more were sold this year?",
      "One total is {a} and another is {b}. What is the difference between them?"
    ],
    explain: (v, r) => [`"How many more" means find the difference.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["\"How many more\" and \"how many fewer\" both mean subtract."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "{ctx} a vendu {a} billets cette année et {b} l'an dernier. Combien en a-t-il vendu de plus cette année ?",
        "Un total vaut {a} et un autre {b}. Quelle est la différence entre eux ?"
      ],
      explain: (v, r) => [`« Combien de plus » signifie chercher la différence.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["« Combien de plus » et « combien de moins » veulent tous deux dire soustraire."]
    },
    declaredVariationSpace: 7000 * 2000
  }),
  arithmeticTemplate({
    key: "y4l2.totalOfThreeAmounts", levelKey: "Y4L2", objectiveCode: "Y4-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "MULTI_STEP", contextPool: CTX,
    ranges: [[500, 3999], [500, 3999], [500, 3999]],
    compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: [
      "Three boxes hold {a}, {b} and {c} {ctx}. How many is that in total?",
      "Add {a}, {b} and {c} together."
    ],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Add two numbers first, then add the third to that total."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Trois boîtes contiennent {a}, {b} et {c} {ctx}. Combien cela fait-il en tout ?",
        "Additionne {a}, {b} et {c}."
      ],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} + ${v[2]} = ${r}.`],
      hints: () => ["Additionne d'abord deux nombres, puis ajoute le troisième à ce total."]
    },
    declaredVariationSpace: 3500 * 3500 * 3500
  }),
  arithmeticTemplate({
    key: "y4l2.howManyMoreNeeded", levelKey: "Y4L2", objectiveCode: "Y4-L2-3", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1000, 8999], [100, 999]], compute: (v) => v[1]!,
    derive: (v) => ({ target: v[0]! + v[1]! }),
    promptTemplates: [
      "A school has collected {a} {ctx} and wants {target} in total. How many more are needed?",
      "You have {a} and need {target}. How many more do you need?"
    ],
    explain: (v, r) => [`Find the difference between what you have and what you want.`, `${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Take what you already have away from the target."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Une école a récolté {a} {ctx} et en veut {target} en tout. Combien lui en manque-t-il ?",
        "Tu en as {a} et il t'en faut {target}. Combien t'en manque-t-il ?"
      ],
      explain: (v, r) => [`Cherche la différence entre ce que tu as et ce que tu veux.`, `${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Retire ce que tu as déjà de l'objectif."]
    },
    declaredVariationSpace: 8000 * 900
  }),
  arithmeticTemplate({
    key: "y4l2.addNearMultipleOf1000", levelKey: "Y4L2", objectiveCode: "Y4-L2-3", difficulty: "REASONING",
    misconceptionTags: ["MENTAL_STRATEGY_ERROR"], type: "MULTI_STEP",
    ranges: [[1000, 7999], [1, 9], [1, 20]], compute: (v) => v[0]! + v[1]! * 1000 - v[2]!,
    derive: (v) => ({ near: v[1]! * 1000 - v[2]! }),
    promptTemplates: [
      "Work out {a} + {near} by adding {b} thousand and then subtracting {c}.",
      "Use a mental strategy: {a} + {near}."
    ],
    explain: (v, r) => [
      `${v[0]} + ${v[1]! * 1000} = ${v[0]! + v[1]! * 1000}.`,
      `${v[0]! + v[1]! * 1000} - ${v[2]} = ${r}.`
    ],
    hints: () => ["Adding a round number is easy — add too much, then take the extra back off."],
    fr: {
      promptTemplates: [
        "Calcule {a} + {near} en ajoutant {b} milliers puis en retirant {c}.",
        "Utilise une stratégie mentale : {a} + {near}."
      ],
      explain: (v, r) => [
        `${v[0]} + ${v[1]! * 1000} = ${v[0]! + v[1]! * 1000}.`,
        `${v[0]! + v[1]! * 1000} - ${v[2]} = ${r}.`
      ],
      hints: () => ["Ajouter un nombre rond est facile — ajoute un peu trop, puis retire le surplus."]
    },
    declaredVariationSpace: 7000 * 9 * 20
  })
];

export default level;
