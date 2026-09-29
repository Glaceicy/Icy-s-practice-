import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 10 — "Year 1 mixed mastery" — a mixed review sampling across
// every Year 1 topic (number, calculation, fractions, measurement, shape).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];
const SHAPES2D = ["circle", "triangle", "square", "rectangle", "pentagon", "hexagon"];
const SHAPES3D = ["cube", "sphere", "cone", "cylinder", "pyramid"];
const COLOURS = ["red", "blue", "green", "yellow", "purple", "orange"];
const PLACES = ["playground", "classroom", "kitchen", "garden", "park"];

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y1l10.addWithin20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "What is {a} add {b}?", "There are {a} {ctx} and {b} more {ctx}. How many altogether?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, "Count on from the bigger number."],
    hints: () => ["Start with the bigger number and count on."],
    visualAid: (v, r) => visuals.barModel([v[0]!, v[1]!], r),
    declaredVariationSpace: 105 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "Combien font {a} plus {b} ?", "Il y a {a} {ctx} et {b} {ctx} de plus. Combien y en a-t-il en tout ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`, "Compte à partir du plus grand nombre."],
      hints: () => ["Commence par le plus grand nombre et continue à compter."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.mcAddWithin20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [1, 15]], constraint: (v) => v[0]! + v[1]! <= 20, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} = ?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    distractorSpread: 3,
    declaredVariationSpace: 105,
    fr: {
      promptTemplates: ["{a} + {b} = ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.missingAddend20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[1, 19]], constraint: () => true, compute: (v) => 20 - v[0]!, contextPool: CTX,
    promptTemplates: ["{a} + ___ = 20", "What must be added to {a} to make 20?", "There are {a} {ctx}. How many more {ctx} are needed to make 20?"],
    explain: (v, r) => [`${v[0]} + ${r} = 20.`],
    hints: () => ["Count on from the given number up to 20."],
    declaredVariationSpace: 19 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + ___ = 20", "Que faut-il ajouter à {a} pour faire 20 ?", "Il y a {a} {ctx}. Combien de {ctx} de plus faut-il pour faire 20 ?"],
      explain: (v, r) => [`${v[0]} + ${r} = 20.`],
      hints: () => ["Compte à partir du nombre donné jusqu'à 20."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.subWithin20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[5, 20], [1, 15]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "What is {a} take away {b}?", "There are {a} {ctx}. {b} are given away. How many are left?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "Count back from the first number."],
    hints: () => ["Count back from the bigger number."],
    visualAid: (v, r) => visuals.barModel([r, v[1]!], v[0]!),
    declaredVariationSpace: 200 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "Combien font {a} moins {b} ?", "Il y a {a} {ctx}. {b} sont donnés. Combien en reste-t-il ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`, "Compte à rebours à partir du premier nombre."],
      hints: () => ["Compte à rebours à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.mcSubWithin20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[5, 20], [1, 15]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} = ?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the bigger number."],
    distractorSpread: 3,
    declaredVariationSpace: 200,
    fr: {
      promptTemplates: ["{a} - {b} = ?"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Compte à rebours à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.missingSubtrahend20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[5, 20], [1, 19]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} = ___"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    declaredVariationSpace: 190,
    fr: {
      promptTemplates: ["{a} - {b} = ___"],
      explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Compte à rebours à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.numberBondsTo10", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!, contextPool: CTX,
    promptTemplates: [
      "{a} + ___ = 10", "What pairs with {a} to make 10?",
      "There are {a} {ctx} in a ten frame. How many more {ctx} fill it to 10?",
      "How many more do you need to add to {a} to reach 10?",
      "{a} and what number make a total of 10?",
      "Counting {ctx}: {a} plus how many more equals 10?"
    ],
    explain: (v, r) => [`${v[0]} + ${r} = 10.`],
    hints: () => ["Think of your number bonds to 10."],
    visualAid: (v) => visuals.tenFrame(v[0]!),
    declaredVariationSpace: 11 * (3 + 3 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{a} + ___ = 10", "Quel nombre s'associe avec {a} pour faire 10 ?",
        "Il y a {a} {ctx} dans un cadre de dix. Combien de {ctx} de plus faut-il pour le remplir jusqu'à 10 ?",
        "Combien faut-il ajouter à {a} pour atteindre 10 ?",
        "{a} et quel nombre font un total de 10 ?",
        "En comptant les {ctx} : {a} plus combien de plus égale 10 ?"
      ],
      explain: (v, r) => [`${v[0]} + ${r} = 10.`],
      hints: () => ["Pense à tes compléments à 10."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.numberBondsTo20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MISSING_NUMBER",
    ranges: [[0, 20]], compute: (v) => 20 - v[0]!, contextPool: CTX,
    promptTemplates: ["{a} + ___ = 20", "What pairs with {a} to make 20?", "There are {a} {ctx}. How many more make 20 {ctx}?"],
    explain: (v, r) => [`${v[0]} + ${r} = 20.`],
    hints: () => ["Use your number bonds to 10 to help, then adjust for 20."],
    declaredVariationSpace: 21 * (2 + CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + ___ = 20", "Quel nombre s'associe avec {a} pour faire 20 ?", "Il y a {a} {ctx}. Combien de plus pour faire 20 {ctx} ?"],
      explain: (v, r) => [`${v[0]} + ${r} = 20.`],
      hints: () => ["Utilise tes compléments à 10 pour t'aider, puis ajuste pour 20."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.tfNumberBond10", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE",
    ranges: [[0, 10]], compute: (v) => 10 - v[0]!,
    promptTemplates: ["{a} plus this number makes 10:", "This number added to {a} equals 10:", "{a} needs this many more to reach 10:"],
    explain: (v, r) => [`${v[0]} + ${r} = 10.`],
    hints: () => ["Recall your bonds to 10."],
    declaredVariationSpace: 11 * 18,
    fr: {
      promptTemplates: ["{a} plus ce nombre fait 10 :", "Ce nombre ajouté à {a} donne 10 :", "{a} a besoin d'autant de plus pour atteindre 10 :"],
      explain: (v, r) => [`${v[0]} + ${r} = 10.`],
      hints: () => ["Rappelle-toi tes compléments à 10."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.groupingWordProblem", levelKey: "Y1L10", objectiveCode: "Y1-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 6], [2, 5]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} groups of {b} {ctx}. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} groups of ${v[1]} = ${r}.`],
    hints: () => ["Count in equal groups, or count on repeatedly."],
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 20 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} groupes de {b} {ctx}. Combien de {ctx} en tout ?"],
      explain: (v, r) => [`${v[0]} groupes de ${v[1]} = ${r}.`],
      hints: () => ["Compte en groupes égaux, ou continue à compter plusieurs fois."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.sharingWordProblem", levelKey: "Y1L10", objectiveCode: "Y1-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 5], [2, 6]], compute: (v) => v[1]!, contextPool: CTX,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "{total} {ctx} are shared equally between {a} children. How many does each child get?",
      "Share {total} {ctx} equally among {a} friends. How many {ctx} does each friend receive?"
    ],
    explain: (v, r) => [`Sharing ${v[0]! * v[1]!} equally between ${v[0]} groups gives ${r} each.`],
    hints: () => ["Share one at a time into each group until none are left."],
    declaredVariationSpace: 20 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "{total} {ctx} sont partagés équitablement entre {a} enfants. Combien chaque enfant en reçoit-il ?",
        "Partage {total} {ctx} équitablement entre {a} amis. Combien de {ctx} chaque ami reçoit-il ?"
      ],
      explain: (v, r) => [`En partageant ${v[0]! * v[1]!} équitablement entre ${v[0]} groupes, cela donne ${r} chacun.`],
      hints: () => ["Distribue un à la fois dans chaque groupe jusqu'à ce qu'il n'en reste plus."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.mcGrouping", levelKey: "Y1L10", objectiveCode: "Y1-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 6], [2, 5]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["{a} groups of {b}. How many altogether?"],
    explain: (v, r) => [`${v[0]} groups of ${v[1]} = ${r}.`],
    hints: () => ["Add the group size that many times, or count the array."],
    distractorSpread: 4,
    declaredVariationSpace: 20,
    fr: {
      promptTemplates: ["{a} groupes de {b}. Combien en tout ?"],
      explain: (v, r) => [`${v[0]} groupes de ${v[1]} = ${r}.`],
      hints: () => ["Additionne la taille du groupe ce nombre de fois, ou compte le tableau."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.findHalf", levelKey: "Y1L10", objectiveCode: "Y1-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "NUMBER_ENTRY",
    ranges: [[1, 15]], compute: (v) => v[0]!, contextPool: CTX,
    derive: (v) => ({ whole: v[0]! * 2 }),
    promptTemplates: [
      "What is half of {whole}?", "Find half of {whole}.",
      "Share {whole} {ctx} into two equal groups. How many in each group?",
      "Split {whole} {ctx} equally between two friends. How many does each friend get?"
    ],
    explain: (v) => [`Half of ${v[0]! * 2} is ${v[0]}.`],
    hints: () => ["Halving means splitting into two equal groups."],
    visualAid: () => visuals.fractionDiagram(1, 2),
    declaredVariationSpace: 15 * (2 + 2 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Quelle est la moitié de {whole} ?", "Trouve la moitié de {whole}.",
        "Partage {whole} {ctx} en deux groupes égaux. Combien y en a-t-il dans chaque groupe ?",
        "Répartis {whole} {ctx} équitablement entre deux amis. Combien chaque ami en reçoit-il ?"
      ],
      explain: (v) => [`La moitié de ${v[0]! * 2} est ${v[0]}.`],
      hints: () => ["Partager en deux signifie diviser en deux groupes égaux."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.findQuarter", levelKey: "Y1L10", objectiveCode: "Y1-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "NUMBER_ENTRY",
    ranges: [[1, 10]], compute: (v) => v[0]!, contextPool: CTX,
    derive: (v) => ({ whole: v[0]! * 4 }),
    promptTemplates: [
      "What is a quarter of {whole}?", "Find a quarter of {whole}.",
      "Share {whole} {ctx} equally between 4 friends. How many does each get?",
      "Split {whole} {ctx} into four equal groups. How many in each group?"
    ],
    explain: (v) => [`A quarter of ${v[0]! * 4} is ${v[0]}.`],
    hints: () => ["A quarter means splitting into four equal groups."],
    visualAid: () => visuals.fractionDiagram(1, 4),
    declaredVariationSpace: 10 * (2 + 2 * CTX.length),
    fr: {
      contextPool: CTX_FR,
      promptTemplates: [
        "Qu'est-ce qu'un quart de {whole} ?", "Trouve un quart de {whole}.",
        "Partage {whole} {ctx} équitablement entre 4 amis. Combien chacun en reçoit-il ?",
        "Divise {whole} {ctx} en quatre groupes égaux. Combien y en a-t-il dans chaque groupe ?"
      ],
      explain: (v) => [`Un quart de ${v[0]! * 4} est ${v[0]}.`],
      hints: () => ["Un quart signifie diviser en quatre groupes égaux."]
    }
  }),
  categoricalPoolTemplate({
    key: "y1l10.mcHalfOrQuarterShaded", levelKey: "Y1L10", objectiveCode: "Y1-L10-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE",
    pools: { fraction: ["1/2", "1/4", "3/4"], shape: ["circle", "square", "bar"] },
    build: (picked) => ({
      prompt: `A ${picked.shape} is split into equal parts and ${picked.fraction} is shaded. What fraction is shaded?`,
      correctLabel: picked.fraction!,
      distractorLabels: ["1/2", "1/4", "3/4", "2/4"].filter((f) => f !== picked.fraction),
      explanationSteps: [`${picked.fraction} of the ${picked.shape} is shaded.`],
      hints: ["Count the shaded parts out of the total equal parts."],
      visualAid: visuals.fractionDiagram(
        picked.fraction === "1/2" ? 1 : picked.fraction === "1/4" ? 1 : 3,
        picked.fraction === "1/2" ? 2 : 4,
        picked.shape === "bar" ? "bar" : "circle"
      )
    }),
    fr: {
      translate: (_drawn, picked) => {
        const shapeInfo: Record<string, { name: string; fem: boolean }> = {
          circle: { name: "cercle", fem: false },
          square: { name: "carré", fem: false },
          bar: { name: "barre", fem: true }
        };
        const info = shapeInfo[picked.shape!]!;
        const art = info.fem ? "Une" : "Un";
        const ending = info.fem ? "e" : "";
        const prep = info.fem ? "de la" : "du";
        return {
          prompt: `${art} ${info.name} est divisé${ending} en parts égales et ${picked.fraction} est colorié${ending}. Quelle fraction est coloriée ?`,
          explanationSteps: [`${picked.fraction} ${prep} ${info.name} est colorié${ending}.`],
          hints: ["Compte les parts coloriées sur le nombre total de parts égales."]
        };
      }
    },
    declaredVariationSpace: 3 * 3 * 4
  }),
  arithmeticTemplate({
    key: "y1l10.coinTotal", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["MONEY_COIN_VALUE_CONFUSION"], type: "MONEY",
    ranges: [[1, 10], [1, 10]], compute: (v) => v[0]! * 2 + v[1]! * 5,
    derive: (v) => ({ count2p: v[0]!, count5p: v[1]! }),
    promptTemplates: ["You have {count2p} 2p coins and {count5p} 5p coins. How much money is that?", "A purse has {count2p} 2p coins and {count5p} 5p coins inside. What is the total value?"],
    explain: (v, r) => [`${v[0]} x 2p = ${v[0]! * 2}p.`, `${v[1]} x 5p = ${v[1]! * 5}p.`, `${v[0]! * 2}p + ${v[1]! * 5}p = ${r}p.`],
    hints: () => ["Add up the coins group by group."],
    formatValue: (n) => `${n}p`,
    visualAid: (v) => visuals.coins(Array(v[0]!).fill(2).concat(Array(v[1]!).fill(5))),
    declaredVariationSpace: 200,
    fr: {
      promptTemplates: ["Tu as {count2p} pièces de 2p et {count5p} pièces de 5p. Combien d'argent cela fait-il ?", "Un porte-monnaie contient {count2p} pièces de 2p et {count5p} pièces de 5p. Quelle est la valeur totale ?"],
      hints: () => ["Additionne les pièces groupe par groupe."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.mcCoinTotal", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["MONEY_COIN_VALUE_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 6], [1, 6]], compute: (v) => v[0]! * 1 + v[1]! * 10,
    derive: (v) => ({ count1p: v[0]!, count10p: v[1]! }),
    promptTemplates: ["You have {count1p} 1p coins and {count10p} 10p coins. How much altogether?"],
    explain: (v, r) => [`${v[0]}p + ${v[1]! * 10}p = ${r}p.`],
    hints: () => ["Count the 10p coins first, then add the 1p coins."],
    formatValue: (n) => `${n}p`,
    distractorSpread: 8,
    declaredVariationSpace: 36,
    fr: {
      promptTemplates: ["Tu as {count1p} pièces de 1p et {count10p} pièces de 10p. Combien cela fait-il en tout ?"],
      hints: () => ["Compte d'abord les pièces de 10p, puis ajoute les pièces de 1p."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.moneyWordProblem", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "REASONING",
    misconceptionTags: ["MONEY_COIN_VALUE_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 30], [1, 25]], constraint: (v) => v[1]! < v[0]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "Priya has {a} and spends {b} on sweets. How many pence does she have left?",
      "Ben starts with {a} in his money box and spends {b} on a toy. How much does he have left?"
    ],
    explain: (v, r) => [`${v[0]}p - ${v[1]}p = ${r}p.`],
    hints: () => ["Subtract what was spent from the starting amount."],
    formatValue: (n) => `${n}p`,
    declaredVariationSpace: 400,
    fr: {
      promptTemplates: [
        "Priya a {a} et dépense {b} en bonbons. Combien de pence lui reste-t-il ?",
        "Ben commence avec {a} dans sa tirelire et dépense {b} pour un jouet. Combien lui reste-t-il ?"
      ],
      hints: () => ["Soustrais ce qui a été dépensé du montant de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y1l10.clockReadHour", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "CLOCK_READ",
    ranges: [[0, 11], [0, 1]], compute: (v) => v[0]! * 60 + v[1]! * 30, contextPool: ["classroom", "kitchen", "hallway", "bedroom", "school hall", "living room", "library", "playground"],
    promptTemplates: [
      "What time does the clock show?",
      "Look at the {ctx} clock. What time does it show?",
      "The clock on the wall of the {ctx} shows this time. What is it?",
      "Read the {ctx} clock and write the time it shows."
    ],
    explain: (v) => [v[1] === 0 ? `The hour hand is on ${v[0] === 0 ? 12 : v[0]} and the minute hand is on 12, so it is o'clock.` : `The hour hand is halfway between hours and the minute hand is on 6, so it is half past.`],
    hints: () => ["The short hand shows the hour; the long hand shows the minutes."],
    formatValue: (n) => {
      const h = Math.floor(n / 60);
      const m = n % 60;
      return m === 0 ? `${h === 0 ? 12 : h}:00` : `${h === 0 ? 12 : h}:30`;
    },
    visualAid: (v) => visuals.clock(v[0]!, v[1]! * 30),
    declaredVariationSpace: 24,
    fr: {
      contextPool: ["salle de classe", "cuisine", "couloir", "chambre", "salle polyvalente", "salon", "bibliothèque", "cour de récréation"],
      promptTemplates: [
        "Quelle heure montre l'horloge ?",
        "Regarde l'horloge : {ctx}. Quelle heure montre-t-elle ?",
        "L'horloge affiche cette heure dans : {ctx}. Quelle heure est-il ?",
        "Lis l'horloge ({ctx}) et écris l'heure qu'elle indique."
      ],
      explain: (v) => [v[1] === 0 ? `La petite aiguille (des heures) est sur ${v[0] === 0 ? 12 : v[0]} et la grande aiguille (des minutes) est sur 12, donc c'est une heure pile.` : `La petite aiguille est à mi-chemin entre deux heures et la grande aiguille est sur 6, donc c'est une heure et demie.`],
      hints: () => ["La petite aiguille indique l'heure ; la grande aiguille indique les minutes."]
    }
  }),
  categoricalPoolTemplate({
    key: "y1l10.mcClockMatch", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { hour: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], half: ["o'clock", "half past"] },
    build: (picked) => {
      const label = `${picked.half === "o'clock" ? picked.hour : picked.hour} ${picked.half}`;
      const distractors = ["1 o'clock", "6 o'clock", "half past 3", "half past 9", "12 o'clock"].filter((d) => d !== label);
      return {
        prompt: `The clock shows ${picked.hour} ${picked.half === "o'clock" ? "with both hands together at the top" : "with the minute hand at the bottom"}. What time is shown?`,
        correctLabel: label,
        distractorLabels: distractors,
        explanationSteps: [`This clock reads ${label}.`],
        hints: ["Check the hour hand's position first, then the minute hand."],
        visualAid: visuals.clock(Number(picked.hour) % 12, picked.half === "o'clock" ? 0 : 30)
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const toFr = (label: string): string => {
          let m = label.match(/^(\d+)\s*o'clock$/);
          if (m) return `${m[1]} heures`;
          m = label.match(/^half past (\d+)$/);
          if (m) return `${m[1]} heures et demie`;
          m = label.match(/^(\d+)\s*half past$/);
          if (m) return `${m[1]} heures et demie`;
          return label;
        };
        return {
          prompt: `L'horloge montre ${picked.hour} heures ${picked.half === "o'clock" ? "avec les deux aiguilles réunies en haut" : "avec la grande aiguille en bas"}. Quelle heure est indiquée ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          explanationSteps: [`Cette horloge indique ${toFr(drawn.correctLabel)}.`],
          hints: ["Vérifie d'abord la position de la petite aiguille, puis de la grande aiguille."]
        };
      }
    },
    declaredVariationSpace: 12 * 2 * 4
  }),
  arithmeticTemplate({
    key: "y1l10.durationSimple", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "REASONING",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [1, 2]], constraint: (v) => v[0]! + v[1]! <= 12, compute: (v) => v[0]! + v[1]!,
    contextPool: ["film", "lesson", "football match", "art class", "walk", "swimming lesson", "story time", "bus journey"],
    derive: (v) => ({ start: v[0]!, duration: v[1]! }),
    promptTemplates: [
      "A {ctx} starts at {start} o'clock and lasts {duration} hour(s). What time does it finish?",
      "A {ctx} begins at {start} o'clock. It lasts {duration} hour(s). What time does it end?"
    ],
    explain: (v, r) => [`${v[0]} o'clock plus ${v[1]} hour(s) is ${r} o'clock.`],
    hints: () => ["Add the number of hours to the start time."],
    formatValue: (n) => `${n} o'clock`,
    declaredVariationSpace: 18 * 2 * 8,
    fr: {
      contextPool: ["film", "leçon", "match de football", "cours de dessin", "promenade", "cours de natation", "heure du conte", "trajet en bus"],
      promptTemplates: [
        "Activité : {ctx}. Elle commence à {start} heures et dure {duration} heure(s). À quelle heure se termine-t-elle ?",
        "Activité : {ctx}. Elle débute à {start} heures et dure {duration} heure(s). À quelle heure finit-elle ?"
      ],
      explain: (v, r) => [`${v[0]} heures plus ${v[1]} heure(s) donne ${r} heures.`],
      hints: () => ["Ajoute le nombre d'heures à l'heure de début."]
    }
  }),
  categoricalPoolTemplate({
    key: "y1l10.tfLengthCompare", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "TRUE_FALSE",
    // Items are listed in a clear, unambiguous increasing size order so truth
    // can be computed exactly rather than guessed — avoiding near-tie
    // comparisons (e.g. "book" vs "ruler") that would make the correct
    // answer debatable.
    pools: {
      pairIndex: Array.from({ length: 15 }, (_, i) => String(i)),
      direction: ["shorter", "longer"],
      name: ["Ali", "Ben", "Chloe", "Priya", "Sam", "Zara", "Tom", "Mia"]
    },
    build: (picked) => {
      const RANK = ["ant", "pencil", "shoe", "table", "car", "bus"];
      const pairs: Array<[number, number]> = [];
      for (let i = 0; i < RANK.length; i++) {
        for (let j = i + 1; j < RANK.length; j++) pairs.push([i, j]);
      }
      const [i, j] = pairs[Number(picked.pairIndex) % pairs.length]!;
      const itemA = RANK[i]!;
      const itemB = RANK[j]!;
      const actuallyShorter = itemA; // i < j means itemA ranks smaller (shorter)
      const claim = picked.direction === "shorter" ? `${itemA} is shorter than a ${itemB}` : `${itemA} is longer than a ${itemB}`;
      const isTrue = picked.direction === "shorter" ? true : false;
      void actuallyShorter;
      return {
        prompt: `${picked.name} says: "A ${claim}."`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`A ${itemA} is smaller than a ${itemB} in everyday life, so a ${itemA} is shorter, not longer.`],
        hints: ["Picture each object in real life and compare their length."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const RANK_FR: Array<{ name: string; fem: boolean }> = [
          { name: "fourmi", fem: true },
          { name: "crayon", fem: false },
          { name: "chaussure", fem: true },
          { name: "table", fem: true },
          { name: "voiture", fem: true },
          { name: "bus", fem: false }
        ];
        const pairs: Array<[number, number]> = [];
        for (let i = 0; i < RANK_FR.length; i++) {
          for (let j = i + 1; j < RANK_FR.length; j++) pairs.push([i, j]);
        }
        const [i, j] = pairs[Number(picked.pairIndex) % pairs.length]!;
        const a = RANK_FR[i]!;
        const b = RANK_FR[j]!;
        const article = (fem: boolean) => (fem ? "une" : "un");
        const phrase = (item: { name: string; fem: boolean }) => `${article(item.fem)} ${item.name}`;
        const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
        const isTrue = drawn.correctLabel === "True";
        const claim = picked.direction === "shorter"
          ? `${cap(phrase(a))} est plus ${a.fem ? "courte" : "court"} qu'${phrase(b)}`
          : `${cap(phrase(a))} est plus ${a.fem ? "longue" : "long"} qu'${phrase(b)}`;
        return {
          prompt: `${picked.name} dit : "${claim}."`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`Dans la vie réelle, ${phrase(a)} est plus petit${a.fem ? "e" : ""} qu'${phrase(b)}, donc ${phrase(a)} est plus ${a.fem ? "courte" : "court"}, pas plus ${a.fem ? "longue" : "long"}.`],
          hints: ["Imagine chaque objet dans la vie réelle et compare leur longueur."]
        };
      }
    },
    declaredVariationSpace: 15 * 2 * 8
  }),
  categoricalPoolTemplate({
    key: "y1l10.shapeId2D", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "SHAPE_ID",
    pools: { shape: SHAPES2D, colour: COLOURS, place: PLACES },
    build: (picked) => ({
      prompt: `Look at the ${picked.colour} shape drawn on the wall of the ${picked.place}. What shape is it?`,
      correctLabel: picked.shape!,
      distractorLabels: SHAPES2D.filter((s) => s !== picked.shape).slice(0, 3),
      explanationSteps: [`This shape is a ${picked.shape}.`],
      hints: ["Count the sides and corners to help identify the shape."],
      visualAid: visuals.shape(picked.shape!, { colour: picked.colour })
    }),
    fr: {
      translate: (drawn, picked) => {
        const shapeMap: Record<string, string> = { circle: "cercle", triangle: "triangle", square: "carré", rectangle: "rectangle", pentagon: "pentagone", hexagon: "hexagone" };
        const colourMap: Record<string, string> = { red: "rouge", blue: "bleu", green: "vert", yellow: "jaune", purple: "violet", orange: "orange" };
        const placeMap: Record<string, string> = { playground: "de la cour de récréation", classroom: "de la salle de classe", kitchen: "de la cuisine", garden: "du jardin", park: "du parc" };
        const shapeFr = shapeMap[picked.shape!] ?? picked.shape!;
        const colourFr = colourMap[picked.colour!] ?? picked.colour!;
        const placeFr = placeMap[picked.place!] ?? picked.place!;
        return {
          prompt: `Regarde la forme ${colourFr} dessinée sur le mur ${placeFr}. Quelle forme est-ce ?`,
          correctLabel: shapeFr,
          distractorLabels: drawn.distractorLabels.map((s) => shapeMap[s] ?? s),
          explanationSteps: [`Cette forme est un ${shapeFr}.`],
          hints: ["Compte les côtés et les sommets pour t'aider à identifier la forme."]
        };
      }
    },
    declaredVariationSpace: SHAPES2D.length * COLOURS.length * PLACES.length
  }),
  categoricalPoolTemplate({
    key: "y1l10.shapeId3D", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "SHAPE_ID",
    pools: { shape: SHAPES3D, colour: COLOURS, place: PLACES },
    build: (picked) => ({
      prompt: `There is a ${picked.colour} 3D object on the shelf in the ${picked.place}. What 3D shape is it?`,
      correctLabel: picked.shape!,
      distractorLabels: SHAPES3D.filter((s) => s !== picked.shape).slice(0, 3),
      explanationSteps: [`This 3D shape is a ${picked.shape}.`],
      hints: ["Think about the number of flat faces and curved surfaces."],
      visualAid: visuals.shape(picked.shape!, { colour: picked.colour, is3D: true })
    }),
    fr: {
      translate: (drawn, picked) => {
        const shapeMap: Record<string, { name: string; fem: boolean }> = {
          cube: { name: "cube", fem: false },
          sphere: { name: "sphère", fem: true },
          cone: { name: "cône", fem: false },
          cylinder: { name: "cylindre", fem: false },
          pyramid: { name: "pyramide", fem: true }
        };
        const colourMap: Record<string, string> = { red: "rouge", blue: "bleu", green: "vert", yellow: "jaune", purple: "violet", orange: "orange" };
        const placeMap: Record<string, string> = { playground: "dans la cour de récréation", classroom: "dans la salle de classe", kitchen: "dans la cuisine", garden: "dans le jardin", park: "dans le parc" };
        const info = shapeMap[picked.shape!]!;
        const colourFr = colourMap[picked.colour!] ?? picked.colour!;
        const placeFr = placeMap[picked.place!] ?? picked.place!;
        return {
          prompt: `Il y a un objet 3D ${colourFr} sur l'étagère ${placeFr}. Quelle forme 3D est-ce ?`,
          correctLabel: info.name,
          distractorLabels: drawn.distractorLabels.map((s) => shapeMap[s]?.name ?? s),
          explanationSteps: [`Cette forme 3D est ${info.fem ? "une" : "un"} ${info.name}.`],
          hints: ["Pense au nombre de faces planes et de surfaces courbes."]
        };
      }
    },
    declaredVariationSpace: SHAPES3D.length * COLOURS.length * PLACES.length
  }),
  orderingTemplate({
    key: "y1l10.orderShapesBySides", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const withSides = [
        { label: "triangle", sortValue: 3 },
        { label: "square", sortValue: 4 },
        { label: "rectangle", sortValue: 4 },
        { label: "pentagon", sortValue: 5 },
        { label: "hexagon", sortValue: 6 }
      ];
      return rng.shuffle(withSides).slice(0, 4);
    },
    promptTemplates: ["Drag these shapes into order, fewest sides first."],
    explain: () => ["Count the sides of each shape to compare."],
    hints: () => ["A triangle has the fewest sides of these shapes."],
    fr: {
      promptTemplates: ["Fais glisser ces formes dans l'ordre, du moins de côtés au plus de côtés."],
      explain: () => ["Compte les côtés de chaque forme pour comparer."],
      hints: () => ["Un triangle a le moins de côtés parmi ces formes."],
      translateLabels: (items) => {
        const shapeMap: Record<string, string> = { triangle: "triangle", square: "carré", rectangle: "rectangle", pentagon: "pentagone", hexagon: "hexagone" };
        return items.map((it) => ({ ...it, label: shapeMap[it.label] ?? it.label }));
      }
    },
    declaredVariationSpace: 200
  }),
  categoricalPoolTemplate({
    key: "y1l10.positionDirection", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { direction: ["left", "right", "above", "below"], object: ["cat", "ball", "box", "book", "cup"], place: PLACES },
    build: (picked) => ({
      prompt: `The ${picked.object} in the ${picked.place} moves one quarter turn clockwise. If it started facing up, which way does it now face?`,
      correctLabel: "right",
      distractorLabels: ["left", "above", "below"],
      explanationSteps: ["A quarter turn clockwise from facing up means facing right."],
      hints: ["Picture a clock — clockwise is the direction the hands move."]
    }),
    fr: {
      translate: (drawn, picked) => {
        const objMap: Record<string, { name: string; fem: boolean }> = {
          cat: { name: "chat", fem: false },
          ball: { name: "balle", fem: true },
          box: { name: "boîte", fem: true },
          book: { name: "livre", fem: false },
          cup: { name: "tasse", fem: true }
        };
        const placeMap: Record<string, string> = { playground: "dans la cour de récréation", classroom: "dans la salle de classe", kitchen: "dans la cuisine", garden: "dans le jardin", park: "dans le parc" };
        const dirMap: Record<string, string> = { left: "gauche", right: "droite", above: "en haut", below: "en bas" };
        const obj = objMap[picked.object!]!;
        const placeFr = placeMap[picked.place!] ?? picked.place!;
        const pronoun = obj.fem ? "elle" : "il";
        const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
        return {
          prompt: `${cap(obj.name)}, ${placeFr}, fait un quart de tour dans le sens des aiguilles d'une montre. ${cap(pronoun)} commence orienté${obj.fem ? "e" : ""} vers le haut. Vers où est-${pronoun} orienté${obj.fem ? "e" : ""} maintenant ?`,
          correctLabel: dirMap["right"]!,
          distractorLabels: drawn.distractorLabels.map((d) => dirMap[d] ?? d),
          explanationSteps: ["Un quart de tour dans le sens des aiguilles d'une montre à partir du haut donne la droite."],
          hints: ["Imagine une horloge — le sens des aiguilles d'une montre est la direction dans laquelle tournent les aiguilles."]
        };
      }
    },
    declaredVariationSpace: 5 * PLACES.length * 4
  }),
  matchingTemplate({
    key: "y1l10.matchShapeToSides", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"],
    generatePairs: (rng) => {
      const all = [
        { left: "triangle", right: "3 sides" },
        { left: "square", right: "4 equal sides" },
        { left: "pentagon", right: "5 sides" },
        { left: "hexagon", right: "6 sides" },
        { left: "rectangle", right: "4 sides, 2 pairs equal" }
      ];
      return rng.shuffle(all).slice(0, 4);
    },
    promptTemplates: ["Match each shape to the correct description."],
    explain: () => ["Count the sides described and compare to each shape."],
    hints: () => ["Think about how many sides each shape has."],
    fr: {
      promptTemplates: ["Associe chaque forme à la description correcte."],
      explain: () => ["Compte les côtés décrits et compare-les à chaque forme."],
      hints: () => ["Réfléchis au nombre de côtés de chaque forme."],
      translatePairs: (pairs) => {
        const shapeMap: Record<string, string> = { triangle: "triangle", square: "carré", pentagon: "pentagone", hexagon: "hexagone", rectangle: "rectangle" };
        const descMap: Record<string, string> = {
          "3 sides": "3 côtés",
          "4 equal sides": "4 côtés égaux",
          "5 sides": "5 côtés",
          "6 sides": "6 côtés",
          "4 sides, 2 pairs equal": "4 côtés, 2 paires égales"
        };
        return pairs.map((p) => ({ left: shapeMap[p.left] ?? p.left, right: descMap[p.right] ?? p.right }));
      }
    },
    declaredVariationSpace: 120
  }),
  orderingTemplate({
    key: "y1l10.orderMixedNumbers20", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = rng.shuffle([...Array(20).keys()].map((n) => n + 1)).slice(0, 4);
      return nums.map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare each number to find the correct order."],
    hints: () => ["Which number would you say first when counting?"],
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Compare chaque nombre pour trouver le bon ordre."],
      hints: () => ["Quel nombre dirais-tu en premier en comptant ?"]
    },
    declaredVariationSpace: 4845
  }),
  arithmeticTemplate({
    key: "y1l10.mixedWordProblemTwoStep", levelKey: "Y1L10", objectiveCode: "Y1-L10-1", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT", "SUBTRACTION_MISCOUNT"], type: "MULTI_STEP",
    ranges: [[3, 10], [1, 5], [1, 5]], constraint: (v) => v[0]! + v[1]! - v[2]! >= 0 && v[0]! + v[1]! <= 20,
    compute: (v) => v[0]! + v[1]! - v[2]!, contextPool: CTX,
    promptTemplates: ["Sam has {a} {ctx}. He is given {b} more, then gives {c} away. How many {ctx} does he have now?"],
    explain: (v, r) => [`Start: ${v[0]}.`, `${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
    hints: () => ["Work out each step in order: add first, then subtract."],
    declaredVariationSpace: 250 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Sam a {a} {ctx}. On lui en donne {b} de plus, puis il en donne {c}. Combien de {ctx} a-t-il maintenant ?"],
      explain: (v, r) => [`Départ : ${v[0]}.`, `${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[2]} = ${r}.`],
      hints: () => ["Effectue chaque étape dans l'ordre : additionne d'abord, puis soustrais."]
    }
  }),
  categoricalPoolTemplate({
    key: "y1l10.tfShapeSides", levelKey: "Y1L10", objectiveCode: "Y1-L10-3", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "TRUE_FALSE",
    pools: { place: PLACES, offset: ["0", "1", "-1", "2"] },
    build: (picked, rng) => {
      const shapes = [
        { shape: "triangle", sides: 3 }, { shape: "square", sides: 4 },
        { shape: "pentagon", sides: 5 }, { shape: "hexagon", sides: 6 }, { shape: "rectangle", sides: 4 }
      ];
      const chosen = rng.pick(shapes);
      const claimedSides = chosen.sides + Number(picked.offset);
      const isTrue = claimedSides === chosen.sides;
      return {
        prompt: `A ${chosen.shape} in the ${picked.place} has ${claimedSides} sides.`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`A ${chosen.shape} has ${chosen.sides} sides.`],
        hints: ["Picture the shape and count its sides one at a time."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^A (\w+) in the .+ has (\d+) sides\.$/);
        const shapeEn = m ? m[1]! : "";
        const claimedSides = m ? m[2]! : "";
        const shapeMap: Record<string, string> = { triangle: "triangle", square: "carré", pentagon: "pentagone", hexagon: "hexagone", rectangle: "rectangle" };
        const sidesMap: Record<string, number> = { triangle: 3, square: 4, pentagon: 5, hexagon: 6, rectangle: 4 };
        const placeMap: Record<string, string> = { playground: "dans la cour de récréation", classroom: "dans la salle de classe", kitchen: "dans la cuisine", garden: "dans le jardin", park: "dans le parc" };
        const shapeFr = shapeMap[shapeEn] ?? shapeEn;
        const placeFr = placeMap[picked.place!] ?? picked.place!;
        const trueSides = sidesMap[shapeEn];
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un ${shapeFr} ${placeFr} a ${claimedSides} côtés.`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`Un ${shapeFr} a ${trueSides} côtés.`],
          hints: ["Imagine la forme et compte ses côtés un par un."]
        };
      }
    },
    declaredVariationSpace: 5 * PLACES.length * 4
  })
];

export default level;
