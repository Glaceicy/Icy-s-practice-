import { arithmeticTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 6 — "Early multiplication and division through grouping and sharing"
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y1-L6-1: solve grouping problems (how many groups of N) ---
  arithmeticTemplate({
    key: "y1l6.countGroups", levelKey: "Y1L6", objectiveCode: "Y1-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 5], [2, 5]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["There are {total} {ctx}. They are put into groups of {a}. How many groups are there?", "{total} {ctx} are arranged into groups of {a} each. How many groups is that?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Count how many groups of that size make the total."],
    visualAid: (v) => visuals.array(v[1]!, v[0]!),
    declaredVariationSpace: 16 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {total} {ctx}. Ils sont mis en groupes de {a}. Combien de groupes y a-t-il ?", "{total} {ctx} sont rangés en groupes de {a} chacun. Combien de groupes cela fait-il ?"],
      hints: () => ["Compte combien de groupes de cette taille font le total."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.mcCountGroups", levelKey: "Y1L6", objectiveCode: "Y1-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 5], [2, 5]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: ["{total} items are put into groups of {a}. How many groups is that?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Count how many groups of that size make the total."],
    distractorSpread: 2,
    declaredVariationSpace: 16,
    fr: {
      promptTemplates: ["{total} objets sont mis en groupes de {a}. Combien de groupes cela fait-il ?"],
      hints: () => ["Compte combien de groupes de cette taille font le total."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.tfCountGroups", levelKey: "Y1L6", objectiveCode: "Y1-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "TRUE_FALSE",
    ranges: [[2, 5], [2, 5]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: ["{total} items in groups of {a} makes this many groups:"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Count how many groups of that size make the total."],
    distractorSpread: 2,
    declaredVariationSpace: 16 * 2,
    fr: {
      promptTemplates: ["{total} objets en groupes de {a} font ce nombre de groupes :"],
      hints: () => ["Compte combien de groupes de cette taille font le total."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.wordProblemGrouping", levelKey: "Y1L6", objectiveCode: "Y1-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 5], [2, 5]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["A teacher has {total} {ctx} and puts {a} in each pot. How many pots does the teacher need?", "A teacher shares out {total} {ctx} into pots of {a}. How many pots are filled?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Count how many groups of that size make the total."],
    visualAid: (v) => visuals.array(v[1]!, v[0]!),
    declaredVariationSpace: 16 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un enseignant a {total} {ctx} et en met {a} dans chaque pot. Combien de pots sont nécessaires ?", "Un enseignant répartit {total} {ctx} dans des pots de {a}. Combien de pots sont remplis ?"],
      hints: () => ["Compte combien de groupes de cette taille font le total."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.visualCountGroups", levelKey: "Y1L6", objectiveCode: "Y1-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "VISUAL_COUNT",
    ranges: [[2, 5], [2, 5]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["The picture shows {a} groups of {b} {ctx}. How many altogether?", "There are {a} equal groups of {ctx}, {b} in each group. How many {ctx} altogether?"],
    explain: (v, r) => [`${v[0]} groups of ${v[1]} = ${r}.`],
    hints: () => ["Count every group, then count all the items."],
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 16 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["L'image montre {a} groupes de {b} {ctx}. Combien y en a-t-il en tout ?", "Il y a {a} groupes égaux de {ctx}, {b} dans chaque groupe. Combien de {ctx} en tout ?"],
      hints: () => ["Compte chaque groupe, puis compte tous les objets."]
    }
  }),

  // --- Y1-L6-2: solve sharing problems (sharing equally between people) ---
  arithmeticTemplate({
    key: "y1l6.shareEqually", levelKey: "Y1L6", objectiveCode: "Y1-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["{total} {ctx} are shared equally between {a} friends. How many does each friend get?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Share the total out one at a time between the friends."],
    declaredVariationSpace: 25 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{total} {ctx} sont partagés également entre {a} amis. Combien chaque ami en reçoit-il ?"],
      hints: () => ["Partage le total un par un entre les amis."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.mcShareEqually", levelKey: "Y1L6", objectiveCode: "Y1-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: ["{total} items are shared equally between {a} people. How many does each person get?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Share the total out one at a time."],
    distractorSpread: 2,
    declaredVariationSpace: 25,
    fr: {
      promptTemplates: ["{total} objets sont partagés également entre {a} personnes. Combien chaque personne en reçoit-elle ?"],
      hints: () => ["Partage le total un par un."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.tfShareEqually", levelKey: "Y1L6", objectiveCode: "Y1-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "TRUE_FALSE",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: ["Sharing {total} items equally between {a} people gives each person this many:"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Share the total out one at a time."],
    distractorSpread: 2,
    declaredVariationSpace: 25 * 2,
    fr: {
      promptTemplates: ["Partager {total} objets également entre {a} personnes donne ce nombre à chacune :"],
      hints: () => ["Partage le total un par un."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.wordProblemSharing", levelKey: "Y1L6", objectiveCode: "Y1-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["{total} {ctx} are shared equally between {a} children. How many {ctx} does each child get?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Share the total out one at a time between the children."],
    declaredVariationSpace: 25 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{total} {ctx} sont partagés également entre {a} enfants. Combien de {ctx} chaque enfant reçoit-il ?"],
      hints: () => ["Partage le total un par un entre les enfants."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.visualSharing", levelKey: "Y1L6", objectiveCode: "Y1-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "VISUAL_COUNT",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[1]!, derive: (v) => ({ total: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["{total} {ctx} are shared equally into {a} equal groups shown below. How many in each group?", "{total} {ctx} are split evenly into {a} groups in the picture. How many {ctx} are in each group?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Count the counters in just one of the equal groups."],
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 25 * CTX.length * 2,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{total} {ctx} sont partagés également en {a} groupes égaux montrés ci-dessous. Combien y en a-t-il dans chaque groupe ?", "{total} {ctx} sont répartis également en {a} groupes sur l'image. Combien de {ctx} y a-t-il dans chaque groupe ?"],
      hints: () => ["Compte les jetons dans un seul des groupes égaux."]
    }
  }),

  // --- Y1-L6-3: use arrays to show equal groups ---
  arithmeticTemplate({
    key: "y1l6.arrayTotal", levelKey: "Y1L6", objectiveCode: "Y1-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["ARRAY_ROW_COL_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [2, 9]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["An array has {a} rows of {b}. How many altogether?", "There are {a} rows with {b} in each row. How many in total?", "Counting {ctx}: an array has {a} rows of {b}. How many altogether?"],
    explain: (v, r) => [`${v[0]} rows of ${v[1]} = ${r}.`],
    hints: () => ["Count the rows, then count how many are in each row, then multiply."],
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 64 * 2 + 64 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un quadrillage a {a} rangées de {b}. Combien y en a-t-il en tout ?", "Il y a {a} rangées avec {b} dans chaque rangée. Combien y en a-t-il en tout ?", "En comptant les {ctx} : un quadrillage a {a} rangées de {b}. Combien y en a-t-il en tout ?"],
      hints: () => ["Compte les rangées, puis compte combien il y a dans chaque rangée, puis multiplie."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.mcArrayTotal", levelKey: "Y1L6", objectiveCode: "Y1-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ARRAY_ROW_COL_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["How many dots are in an array with {a} rows of {b}?"],
    explain: (v, r) => [`${v[0]} rows of ${v[1]} = ${r}.`],
    hints: () => ["Multiply the number of rows by the number in each row."],
    distractorSpread: 4,
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 25,
    fr: {
      promptTemplates: ["Combien de points y a-t-il dans un quadrillage de {a} rangées de {b} ?"],
      hints: () => ["Multiplie le nombre de rangées par le nombre dans chaque rangée."]
    }
  }),
  arithmeticTemplate({
    key: "y1l6.arrayFindRows", levelKey: "Y1L6", objectiveCode: "Y1-L6-3", difficulty: "REASONING",
    misconceptionTags: ["ARRAY_ROW_COL_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [2, 9]], compute: (v) => v[0]!, derive: (v) => ({ total: v[0]! * v[1]! }), contextPool: CTX,
    promptTemplates: ["An array of {total} dots has {b} in each row. How many rows are there?", "Counting {ctx}: an array of {total} dots has {b} in each row. How many rows are there?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide the total by how many are in each row."],
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 64 + 64 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un quadrillage de {total} points a {b} dans chaque rangée. Combien de rangées y a-t-il ?", "En comptant les {ctx} : un quadrillage de {total} points a {b} dans chaque rangée. Combien de rangées y a-t-il ?"],
      hints: () => ["Divise le total par le nombre dans chaque rangée."]
    }
  }),
  matchingTemplate({
    key: "y1l6.matchArraysToTotals", levelKey: "Y1L6", objectiveCode: "Y1-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ARRAY_ROW_COL_CONFUSION"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      while (pairs.length < 3) {
        const rows = rng.int(2, 6);
        const cols = rng.int(2, 6);
        const key = `${rows}x${cols}`;
        if (used.has(key)) continue;
        used.add(key);
        pairs.push({ left: `${rows} rows of ${cols}`, right: String(rows * cols) });
      }
      return pairs;
    },
    promptTemplates: ["Match each array description to its total."],
    explain: () => ["Multiply the rows by the number in each row to find the total."],
    hints: () => ["Rows x number in each row = total."],
    fr: {
      promptTemplates: ["Associe chaque description de quadrillage à son total."],
      explain: () => ["Multiplie les rangées par le nombre dans chaque rangée pour trouver le total."],
      hints: () => ["Rangées x nombre dans chaque rangée = total."],
      translatePairs: (pairs) => pairs.map((p) => {
        const m = p.left.match(/^(\d+) rows of (\d+)$/);
        if (!m) return p;
        return { left: `${m[1]} rangées de ${m[2]}`, right: p.right };
      })
    },
    declaredVariationSpace: 2000
  }),
  arithmeticTemplate({
    key: "y1l6.wordProblemArray", levelKey: "Y1L6", objectiveCode: "Y1-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ARRAY_ROW_COL_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 6], [2, 6]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["{ctx} are arranged in {a} equal rows with {b} in each row. How many {ctx} are there altogether?"],
    explain: (v, r) => [`${v[0]} rows of ${v[1]} = ${r}.`],
    hints: () => ["Multiply the number of rows by the number in each row."],
    visualAid: (v) => visuals.array(v[0]!, v[1]!),
    declaredVariationSpace: 25 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Des {ctx} sont rangés en {a} rangées égales avec {b} dans chaque rangée. Combien de {ctx} y a-t-il en tout ?"],
      hints: () => ["Multiplie le nombre de rangées par le nombre dans chaque rangée."]
    }
  })
];

export default level;
