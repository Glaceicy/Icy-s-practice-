import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 4 — "Written multiplication and division"
const THINGS = ["apples", "pencils", "stickers", "marbles", "cakes", "books", "beads", "cards"];
const THINGS_FR = ["pommes", "crayons", "autocollants", "billes", "gâteaux", "livres", "perles", "cartes"];
const HOLDERS = ["boxes", "bags", "trays", "crates", "packets", "baskets"];
const HOLDERS_FR = ["boîtes", "sacs", "plateaux", "caisses", "paquets", "paniers"];

export const level: QuestionTemplateDef[] = [
  // --- Y4-L4-1: formal written multiplication ---
  arithmeticTemplate({
    key: "y4l4.shortMultiplicationTwoDigit", levelKey: "Y4L4", objectiveCode: "Y4-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[12, 99], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Work out {a} x {b}.",
      "Use short multiplication for {a} x {b}.",
      "Multiply {a} by {b}."
    ],
    explain: (v, r) => [
      `${Math.floor(v[0]! / 10) * 10} x ${v[1]} = ${Math.floor(v[0]! / 10) * 10 * v[1]!} and ${v[0]! % 10} x ${v[1]} = ${(v[0]! % 10) * v[1]!}.`,
      `${Math.floor(v[0]! / 10) * 10 * v[1]!} + ${(v[0]! % 10) * v[1]!} = ${r}.`
    ],
    hints: () => ["Multiply the ones first, carry anything over ten, then multiply the tens."],
    fr: {
      promptTemplates: [
        "Calcule {a} x {b}.",
        "Utilise la multiplication posée pour {a} x {b}.",
        "Multiplie {a} par {b}."
      ],
      explain: (v, r) => [
        `${Math.floor(v[0]! / 10) * 10} x ${v[1]} = ${Math.floor(v[0]! / 10) * 10 * v[1]!} et ${v[0]! % 10} x ${v[1]} = ${(v[0]! % 10) * v[1]!}.`,
        `${Math.floor(v[0]! / 10) * 10 * v[1]!} + ${(v[0]! % 10) * v[1]!} = ${r}.`
      ],
      hints: () => ["Multiplie d'abord les unités, reporte la retenue, puis multiplie les dizaines."]
    },
    declaredVariationSpace: 88 * 8 * 3
  }),
  arithmeticTemplate({
    key: "y4l4.shortMultiplicationThreeDigit", levelKey: "Y4L4", objectiveCode: "Y4-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[102, 999], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Work out {a} x {b}.",
      "Use short multiplication for {a} x {b}.",
      "Multiply the three-digit number {a} by {b}."
    ],
    explain: (v, r) => [
      `${Math.floor(v[0]! / 100) * 100} x ${v[1]} = ${Math.floor(v[0]! / 100) * 100 * v[1]!}, ${Math.floor((v[0]! % 100) / 10) * 10} x ${v[1]} = ${Math.floor((v[0]! % 100) / 10) * 10 * v[1]!}, ${v[0]! % 10} x ${v[1]} = ${(v[0]! % 10) * v[1]!}.`,
      `Adding those partial products gives ${r}.`
    ],
    hints: () => ["Work right to left: ones, then tens, then hundreds, carrying as you go."],
    fr: {
      promptTemplates: [
        "Calcule {a} x {b}.",
        "Utilise la multiplication posée pour {a} x {b}.",
        "Multiplie le nombre à trois chiffres {a} par {b}."
      ],
      explain: (v, r) => [
        `${Math.floor(v[0]! / 100) * 100} x ${v[1]} = ${Math.floor(v[0]! / 100) * 100 * v[1]!}, ${Math.floor((v[0]! % 100) / 10) * 10} x ${v[1]} = ${Math.floor((v[0]! % 100) / 10) * 10 * v[1]!}, ${v[0]! % 10} x ${v[1]} = ${(v[0]! % 10) * v[1]!}.`,
        `En additionnant ces produits partiels, on obtient ${r}.`
      ],
      hints: () => ["Travaille de droite à gauche : unités, puis dizaines, puis centaines, avec les retenues."]
    },
    declaredVariationSpace: 898 * 8 * 3
  }),
  arithmeticTemplate({
    key: "y4l4.partialProductTens", levelKey: "Y4L4", objectiveCode: "Y4-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_SCALING_ERROR"], type: "MULTI_STEP",
    ranges: [[12, 99], [2, 9]], compute: (v) => Math.floor(v[0]! / 10) * 10 * v[1]!,
    derive: (v) => ({ tens: Math.floor(v[0]! / 10) * 10 }),
    promptTemplates: [
      "You are working out {a} x {b}. What is {tens} x {b}?",
      "In the calculation {a} x {b}, find the partial product for the tens: {tens} x {b}."
    ],
    explain: (v, r) => [`${Math.floor(v[0]! / 10)} x ${v[1]} = ${Math.floor(v[0]! / 10) * v[1]!}, so ${Math.floor(v[0]! / 10) * 10} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the tens digit, then make the answer ten times bigger."],
    fr: {
      promptTemplates: [
        "Tu calcules {a} x {b}. Que vaut {tens} x {b} ?",
        "Dans le calcul {a} x {b}, trouve le produit partiel des dizaines : {tens} x {b}."
      ],
      explain: (v, r) => [`${Math.floor(v[0]! / 10)} x ${v[1]} = ${Math.floor(v[0]! / 10) * v[1]!}, donc ${Math.floor(v[0]! / 10) * 10} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie le chiffre des dizaines, puis rends le résultat dix fois plus grand."]
    },
    declaredVariationSpace: 88 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y4l4.multiplyWordProblem", levelKey: "Y4L4", objectiveCode: "Y4-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM", contextPool: THINGS,
    ranges: [[13, 99], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "There are {b} boxes with {a} {ctx} in each. How many {ctx} is that altogether?",
      "A shop orders {b} crates, each holding {a} {ctx}. How many does it receive?"
    ],
    explain: (v, r) => [`Equal groups mean multiply.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the number in one group by the number of groups."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Il y a {b} boîtes contenant chacune {a} {ctx}. Combien de {ctx} cela fait-il en tout ?",
        "Un magasin commande {b} caisses contenant chacune {a} {ctx}. Combien en reçoit-il ?"
      ],
      explain: (v, r) => [`Des groupes égaux veulent dire multiplier.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie le nombre d'un groupe par le nombre de groupes."]
    },
    declaredVariationSpace: 87 * 8 * (1 + THINGS.length)
  }),
  categoricalPoolTemplate({
    key: "y4l4.tfMultiplicationCheck", levelKey: "Y4L4", objectiveCode: "Y4-L4-1", difficulty: "REASONING",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(12, 99);
      const b = rng.int(2, 9);
      const isTrue = rng.chance(0.5);
      const shown = isTrue ? a * b : a * b + rng.pick([-10, 10, -b, b]);
      return {
        prompt: `${a} x ${b} = ${shown}. True or false?`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`${a} x ${b} = ${a * b}.`, isTrue ? "So the calculation is right." : "So the calculation is wrong — a carry has probably been missed."],
        hints: ["Estimate first: round the two-digit number to the nearest ten and multiply."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${drawn.prompt.replace(/\. True or false\?$/, "")}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Estime d'abord : arrondis le nombre à deux chiffres à la dizaine et multiplie."]
        };
      }
    },
    declaredVariationSpace: 88 * 8 * 2 * 4
  }),

  // --- Y4-L4-2: division with remainders ---
  arithmeticTemplate({
    key: "y4l4.divisionExact", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["DIVISION_METHOD_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [11, 99]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "Work out {total} ÷ {a}.",
      "Divide {total} by {a}.",
      "How many {a}s are there in {total}?"
    ],
    explain: (v, r) => [`${v[0]} x ${r} = ${v[0]! * v[1]!}, so ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Work through the number from the left, asking how many times the divisor fits into each part."],
    fr: {
      promptTemplates: [
        "Calcule {total} ÷ {a}.",
        "Divise {total} par {a}.",
        "Combien y a-t-il de {a} dans {total} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${r} = ${v[0]! * v[1]!}, donc ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Parcours le nombre depuis la gauche en te demandant combien de fois le diviseur tient dans chaque partie."]
    },
    declaredVariationSpace: 8 * 89 * 3
  }),
  arithmeticTemplate({
    key: "y4l4.divisionQuotientWithRemainder", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["REMAINDER_INTERPRETATION_ERROR"], type: "MULTI_STEP",
    ranges: [[13, 99], [3, 9]], constraint: (v) => v[0]! % v[1]! !== 0,
    compute: (v) => Math.floor(v[0]! / v[1]!),
    promptTemplates: [
      "Work out {a} ÷ {b}. What is the whole-number part of the answer?",
      "{a} ÷ {b} leaves a remainder. How many whole {b}s fit into {a}?"
    ],
    explain: (v, r) => [
      `${v[1]} x ${r} = ${v[1]! * r}, which is as close to ${v[0]} as we can get without going over.`,
      `So the answer is ${r} remainder ${v[0]! - v[1]! * r}.`
    ],
    hints: () => ["Find the largest multiple of the divisor that is not bigger than the number."],
    fr: {
      promptTemplates: [
        "Calcule {a} ÷ {b}. Quelle est la partie entière du résultat ?",
        "{a} ÷ {b} laisse un reste. Combien de {b} entiers tiennent dans {a} ?"
      ],
      explain: (v, r) => [
        `${v[1]} x ${r} = ${v[1]! * r}, c'est le plus proche de ${v[0]} sans le dépasser.`,
        `Le résultat est donc ${r} reste ${v[0]! - v[1]! * r}.`
      ],
      hints: () => ["Cherche le plus grand multiple du diviseur qui ne dépasse pas le nombre."]
    },
    declaredVariationSpace: 87 * 7 * 2
  }),
  arithmeticTemplate({
    key: "y4l4.divisionRemainderValue", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["REMAINDER_INTERPRETATION_ERROR"], type: "MULTI_STEP",
    ranges: [[13, 99], [3, 9]], constraint: (v) => v[0]! % v[1]! !== 0,
    compute: (v) => v[0]! % v[1]!,
    promptTemplates: [
      "Work out {a} ÷ {b}. What is the remainder?",
      "{a} counters are put into groups of {b}. How many are left over?"
    ],
    explain: (v, r) => [
      `${v[1]} x ${Math.floor(v[0]! / v[1]!)} = ${v[1]! * Math.floor(v[0]! / v[1]!)}.`,
      `${v[0]} - ${v[1]! * Math.floor(v[0]! / v[1]!)} = ${r} left over.`
    ],
    hints: () => ["Subtract the largest multiple of the divisor from the number — what is left is the remainder."],
    fr: {
      promptTemplates: [
        "Calcule {a} ÷ {b}. Quel est le reste ?",
        "{a} jetons sont répartis en groupes de {b}. Combien en reste-t-il ?"
      ],
      explain: (v, r) => [
        `${v[1]} x ${Math.floor(v[0]! / v[1]!)} = ${v[1]! * Math.floor(v[0]! / v[1]!)}.`,
        `${v[0]} - ${v[1]! * Math.floor(v[0]! / v[1]!)} = ${r} qui restent.`
      ],
      hints: () => ["Retire du nombre le plus grand multiple du diviseur — ce qui reste est le reste."]
    },
    declaredVariationSpace: 87 * 7 * 2
  }),
  arithmeticTemplate({
    key: "y4l4.fullContainersFromTotal", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "REASONING",
    misconceptionTags: ["REMAINDER_INTERPRETATION_ERROR"], type: "WORD_PROBLEM", contextPool: HOLDERS,
    ranges: [[20, 99], [3, 9]], constraint: (v) => v[0]! % v[1]! !== 0,
    compute: (v) => Math.floor(v[0]! / v[1]!),
    promptTemplates: [
      "{a} eggs are packed into {ctx} of {b}. How many {ctx} can be filled completely?",
      "{a} items are put into {ctx} holding {b} each. How many {ctx} are full?"
    ],
    explain: (v, r) => [
      `${v[0]} ÷ ${v[1]} = ${r} remainder ${v[0]! % v[1]!}.`,
      `Only complete ${v[1]}s count here, so the answer is ${r} and ${v[0]! % v[1]!} are left over.`
    ],
    hints: () => ["\"Completely filled\" means you ignore the remainder and round down."],
    fr: {
      contextPool: HOLDERS_FR,
      promptTemplates: [
        "{a} œufs sont rangés dans des {ctx} de {b}. Combien de {ctx} peut-on remplir complètement ?",
        "{a} objets sont rangés dans des {ctx} contenant {b} chacune. Combien de {ctx} sont pleines ?"
      ],
      explain: (v, r) => [
        `${v[0]} ÷ ${v[1]} = ${r} reste ${v[0]! % v[1]!}.`,
        `Seuls les groupes complets comptent ici, donc la réponse est ${r} et il en reste ${v[0]! % v[1]!}.`
      ],
      hints: () => ["« Complètement remplies » signifie qu'on ignore le reste et qu'on arrondit vers le bas."]
    },
    declaredVariationSpace: 80 * 7 * (1 + HOLDERS.length)
  }),
  arithmeticTemplate({
    key: "y4l4.containersNeeded", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "REASONING",
    misconceptionTags: ["REMAINDER_INTERPRETATION_ERROR"], type: "WORD_PROBLEM", contextPool: HOLDERS,
    ranges: [[20, 99], [3, 9]], constraint: (v) => v[0]! % v[1]! !== 0,
    compute: (v) => Math.floor(v[0]! / v[1]!) + 1,
    promptTemplates: [
      "{a} children need minibuses holding {b} each. How many minibuses are needed?",
      "{a} items must all be packed into {ctx} of {b}. How many {ctx} are needed?"
    ],
    explain: (v, r) => [
      `${v[0]} ÷ ${v[1]} = ${Math.floor(v[0]! / v[1]!)} remainder ${v[0]! % v[1]!}.`,
      `The ${v[0]! % v[1]!} left over still need space, so round up to ${r}.`
    ],
    hints: () => ["If everything must fit, the leftovers still need one more, so round up."],
    fr: {
      contextPool: HOLDERS_FR,
      promptTemplates: [
        "{a} enfants ont besoin de minibus de {b} places chacun. Combien de minibus faut-il ?",
        "{a} objets doivent tous être rangés dans des {ctx} de {b}. Combien de {ctx} faut-il ?"
      ],
      explain: (v, r) => [
        `${v[0]} ÷ ${v[1]} = ${Math.floor(v[0]! / v[1]!)} reste ${v[0]! % v[1]!}.`,
        `Les ${v[0]! % v[1]!} restants ont aussi besoin de place, donc on arrondit à ${r}.`
      ],
      hints: () => ["Si tout doit tenir, les restants demandent un de plus : arrondis vers le haut."]
    },
    declaredVariationSpace: 80 * 7 * (1 + HOLDERS.length)
  }),
  categoricalPoolTemplate({
    key: "y4l4.mcInterpretRemainder", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "REASONING",
    misconceptionTags: ["REMAINDER_INTERPRETATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { situation: ["round down", "round up", "the remainder itself"] },
    build: (picked, rng) => {
      const total = rng.int(23, 99);
      const size = rng.int(3, 9);
      const q = Math.floor(total / size);
      const rem = total % size || 1;
      const situation = picked.situation!;
      const questions: Record<string, string> = {
        "round down": `${total} flowers are made into complete bunches of ${size}. How many complete bunches are there?`,
        "round up": `${total} children need tables seating ${size}. How many tables are needed?`,
        "the remainder itself": `${total} cakes are shared into boxes of ${size}. How many cakes are left over?`
      };
      const answers: Record<string, string> = {
        "round down": `${q}`,
        "round up": `${q + 1}`,
        "the remainder itself": `${rem}`
      };
      const correct = answers[situation]!;
      const distractors: string[] = [];
      const candidates = [...Object.values(answers), `${q + 2}`, `${q + 3}`, `${total}`];
      for (const a of candidates) {
        if (a === correct || distractors.includes(a)) continue;
        distractors.push(a);
        if (distractors.length === 3) break;
      }
      return {
        prompt: questions[situation]!,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${total} ÷ ${size} = ${q} remainder ${total % size}.`, `This question needs you to ${situation}.`],
        hints: ["Read the context: sometimes you round down, sometimes up, and sometimes the remainder is the answer."]
      };
    },
    fr: {
      translate: (drawn) => {
        const prompt = drawn.prompt
          .replace(/^(\d+) flowers are made into complete bunches of (\d+)\. How many complete bunches are there\?$/, "$1 fleurs sont assemblées en bouquets complets de $2. Combien y a-t-il de bouquets complets ?")
          .replace(/^(\d+) children need tables seating (\d+)\. How many tables are needed\?$/, "$1 enfants ont besoin de tables de $2 places. Combien de tables faut-il ?")
          .replace(/^(\d+) cakes are shared into boxes of (\d+)\. How many cakes are left over\?$/, "$1 gâteaux sont répartis dans des boîtes de $2. Combien de gâteaux restent-ils ?");
        return {
          prompt,
          hints: ["Lis le contexte : parfois on arrondit vers le bas, parfois vers le haut, et parfois le reste est la réponse."]
        };
      }
    },
    declaredVariationSpace: 3 * 77 * 7
  }),
  arithmeticTemplate({
    key: "y4l4.missingDivisor", levelKey: "Y4L4", objectiveCode: "Y4-L4-2", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[2, 9], [11, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "{total} ÷ ___ = {b}. What number is missing?",
      "A number was divided by something to give {b}. The number was {total}. What was it divided by?"
    ],
    explain: (v, r) => [`Use the inverse: ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide the starting number by the answer to find the divisor."],
    fr: {
      promptTemplates: [
        "{total} ÷ ___ = {b}. Quel nombre manque ?",
        "Un nombre a été divisé par quelque chose pour donner {b}. Ce nombre était {total}. Par combien a-t-il été divisé ?"
      ],
      explain: (v, r) => [`Utilise l'opération inverse : ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Divise le nombre de départ par le résultat pour trouver le diviseur."]
    },
    declaredVariationSpace: 8 * 89 * 2
  }),

  // --- Y4-L4-3: multiplying and adding, and the distributive law ---
  arithmeticTemplate({
    key: "y4l4.multiplyThenAdd", levelKey: "Y4L4", objectiveCode: "Y4-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["MULTI_STEP_ORDER_ERROR"], type: "MULTI_STEP", contextPool: THINGS,
    ranges: [[2, 12], [2, 12], [1, 60]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: [
      "There are {a} bags with {b} {ctx} in each, and {c} more loose. How many altogether?",
      "Work out {a} x {b} + {c}."
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Do the multiplication before the addition."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Il y a {a} sacs contenant chacun {b} {ctx}, et {c} de plus en vrac. Combien cela fait-il en tout ?",
        "Calcule {a} x {b} + {c}."
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
      hints: () => ["Fais la multiplication avant l'addition."]
    },
    declaredVariationSpace: 11 * 11 * 60
  }),
  arithmeticTemplate({
    key: "y4l4.multiplyThenSubtract", levelKey: "Y4L4", objectiveCode: "Y4-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["MULTI_STEP_ORDER_ERROR"], type: "MULTI_STEP", contextPool: THINGS,
    ranges: [[3, 12], [3, 12], [1, 20]], constraint: (v) => v[0]! * v[1]! > v[2]!,
    compute: (v) => v[0]! * v[1]! - v[2]!,
    promptTemplates: [
      "{a} boxes each hold {b} {ctx}, but {c} are broken. How many good ones are there?",
      "Work out {a} x {b} - {c}."
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Multiply first, then take away."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "{a} boîtes contiennent chacune {b} {ctx}, mais {c} sont cassés. Combien y en a-t-il de bons ?",
        "Calcule {a} x {b} - {c}."
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} - ${v[2]} = ${r}.`],
      hints: () => ["Multiplie d'abord, puis retire."]
    },
    declaredVariationSpace: 10 * 10 * 20
  }),
  arithmeticTemplate({
    key: "y4l4.distributiveSplit", levelKey: "Y4L4", objectiveCode: "Y4-L4-3", difficulty: "REASONING",
    misconceptionTags: ["DISTRIBUTIVE_LAW_ERROR"], type: "MULTI_STEP",
    ranges: [[13, 99], [3, 9]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ tens: Math.floor(v[0]! / 10) * 10, ones: v[0]! % 10 }),
    promptTemplates: [
      "Work out {a} x {b} by splitting {a} into {tens} and {ones}, multiplying each part and adding.",
      "Use the distributive law: ({tens} x {b}) + ({ones} x {b}) = ?"
    ],
    explain: (v, r) => [
      `${Math.floor(v[0]! / 10) * 10} x ${v[1]} = ${Math.floor(v[0]! / 10) * 10 * v[1]!}.`,
      `${v[0]! % 10} x ${v[1]} = ${(v[0]! % 10) * v[1]!}.`,
      `${Math.floor(v[0]! / 10) * 10 * v[1]!} + ${(v[0]! % 10) * v[1]!} = ${r}.`
    ],
    hints: () => ["Splitting a number into tens and ones lets you use easy facts, then add the two parts."],
    fr: {
      promptTemplates: [
        "Calcule {a} x {b} en séparant {a} en {tens} et {ones}, en multipliant chaque partie puis en additionnant.",
        "Utilise la distributivité : ({tens} x {b}) + ({ones} x {b}) = ?"
      ],
      explain: (v, r) => [
        `${Math.floor(v[0]! / 10) * 10} x ${v[1]} = ${Math.floor(v[0]! / 10) * 10 * v[1]!}.`,
        `${v[0]! % 10} x ${v[1]} = ${(v[0]! % 10) * v[1]!}.`,
        `${Math.floor(v[0]! / 10) * 10 * v[1]!} + ${(v[0]! % 10) * v[1]!} = ${r}.`
      ],
      hints: () => ["Séparer un nombre en dizaines et unités permet d'utiliser des faits faciles, puis d'additionner les deux parties."]
    },
    declaredVariationSpace: 87 * 7 * 2
  }),
  arithmeticTemplate({
    key: "y4l4.costOfSeveralItems", levelKey: "Y4L4", objectiveCode: "Y4-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["MULTI_STEP_ORDER_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [10, 99], [2, 12], [5, 60]],
    compute: (v) => v[0]! * v[1]! + v[2]! * v[3]!,
    promptTemplates: [
      "{a} pens cost {b} pence each and {c} rubbers cost {d} pence each. What is the total cost, in pence?",
      "Work out ({a} x {b}) + ({c} x {d})."
    ],
    explain: (v, r) => [
      `${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`,
      `${v[2]} x ${v[3]} = ${v[2]! * v[3]!}.`,
      `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`
    ],
    hints: () => ["Work out the cost of each kind of item separately, then add the two totals."],
    fr: {
      promptTemplates: [
        "{a} stylos coûtent {b} pence chacun et {c} gommes coûtent {d} pence chacune. Quel est le coût total, en pence ?",
        "Calcule ({a} x {b}) + ({c} x {d})."
      ],
      explain: (v, r) => [
        `${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`,
        `${v[2]} x ${v[3]} = ${v[2]! * v[3]!}.`,
        `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`
      ],
      hints: () => ["Calcule séparément le coût de chaque type d'article, puis additionne les deux totaux."]
    },
    declaredVariationSpace: 11 * 90 * 11 * 56
  }),
  arithmeticTemplate({
    key: "y4l4.scalingThreeDigit", levelKey: "Y4L4", objectiveCode: "Y4-L4-3", difficulty: "REASONING",
    misconceptionTags: ["OPERATION_CHOICE_ERROR"], type: "WORD_PROBLEM", contextPool: THINGS,
    ranges: [[101, 499], [2, 9]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A school has {a} {ctx}. Another school has {b} times as many. How many does the second school have?",
      "A library has {a} books. A bigger one has {b} times as many. How many books is that?"
    ],
    explain: (v, r) => [`"{b} times as many" means multiply.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Use short multiplication: three digits multiplied by one digit."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Une école a {a} {ctx}. Une autre en a {b} fois plus. Combien la seconde école en a-t-elle ?",
        "Une bibliothèque a {a} livres. Une plus grande en a {b} fois plus. Combien de livres cela fait-il ?"
      ],
      explain: (v, r) => [`« {b} fois plus » veut dire multiplier.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Utilise la multiplication posée : trois chiffres par un chiffre."]
    },
    declaredVariationSpace: 399 * 8 * (1 + THINGS.length)
  })
];

export default level;
