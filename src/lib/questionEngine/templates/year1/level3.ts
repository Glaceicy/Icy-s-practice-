import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 1, Level 3 — "Addition and subtraction within 10"
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y1-L3-1: read, write and understand +, - and = ---
  categoricalPoolTemplate({
    key: "y1l3.meaningOfSign", levelKey: "Y1L3", objectiveCode: "Y1-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["SYMBOL_MEANING_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { sign: ["+", "-", "="] },
    build: (picked, rng) => {
      const sign = picked.sign!;
      let a: number, b: number, c: number;
      if (sign === "-") {
        a = rng.int(0, 10);
        b = rng.int(0, a);
        c = a - b;
      } else {
        a = rng.int(0, 10);
        b = rng.int(0, 10 - a);
        c = a + b;
      }
      const prompt = `In ${a} ${sign} ${b} = ${c}, what does the ${sign} sign mean?`;
      const meanings: Record<string, string> = { "+": "Add together", "-": "Take away", "=": "Is the same amount as" };
      const correctLabel = meanings[sign]!;
      const distractorLabels = Object.entries(meanings).filter(([s]) => s !== sign).map(([, m]) => m);
      return {
        prompt,
        correctLabel,
        distractorLabels,
        explanationSteps: [`The ${sign} sign means "${correctLabel.toLowerCase()}".`],
        hints: ["Think about what each symbol tells you to do: + joins, - takes away, = balances both sides."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^In (\d+) (.) (\d+) = (\d+), what does the/);
        if (!m) return {};
        const a = m[1]!, sign = m[2]!, b = m[3]!, c = m[4]!;
        const meaningsFr: Record<string, string> = { "+": "Additionner", "-": "Enlever", "=": "Est égal à" };
        const correctLabel = meaningsFr[sign]!;
        const distractorLabels = Object.entries(meaningsFr).filter(([s]) => s !== sign).map(([, mm]) => mm);
        void picked;
        return {
          prompt: `Dans ${a} ${sign} ${b} = ${c}, que signifie le signe ${sign} ?`,
          correctLabel,
          distractorLabels,
          explanationSteps: [`Le signe ${sign} signifie « ${correctLabel.toLowerCase()} ».`],
          hints: ["Réfléchis à ce que fait chaque symbole : + réunit, - enlève, = équilibre les deux côtés."]
        };
      }
    },
    declaredVariationSpace: 400
  }),
  categoricalPoolTemplate({
    key: "y1l3.readWordFormEquation", levelKey: "Y1L3", objectiveCode: "Y1-L3-1", difficulty: "REASONING",
    misconceptionTags: ["SYMBOL_MEANING_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { op: ["add", "take away"] },
    build: (picked, rng) => {
      const isAdd = picked.op === "add";
      let a: number, b: number, c: number;
      if (isAdd) {
        a = rng.int(0, 10);
        b = rng.int(0, 10 - a);
        c = a + b;
      } else {
        a = rng.int(0, 10);
        b = rng.int(0, a);
        c = a - b;
      }
      const correct = isAdd ? `${a} + ${b} = ${c}` : `${a} - ${b} = ${c}`;
      const wrong = isAdd ? `${a} - ${b} = ${a - b}` : `${a} + ${b} = ${a + b}`;
      const prompt = `Which number sentence matches: '${a} ${picked.op} ${b} equals ${c}'?`;
      return {
        prompt,
        correctLabel: correct,
        distractorLabels: [wrong],
        explanationSteps: [`"${picked.op}" means ${isAdd ? "+" : "-"}, so the sentence is ${correct}.`],
        hints: ["'Add' means +. 'Take away' means -."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/'(\d+) [a-z ]+ (\d+) equals (\d+)'/);
        if (!m) return {};
        const a = m[1]!, b = m[2]!, c = m[3]!;
        const isAdd = picked.op === "add";
        const opFr = isAdd ? "plus" : "moins";
        const correct = isAdd ? `${a} + ${b} = ${c}` : `${a} - ${b} = ${c}`;
        const wrong = isAdd ? `${a} - ${b} = ${Number(a) - Number(b)}` : `${a} + ${b} = ${Number(a) + Number(b)}`;
        return {
          prompt: `Quelle phrase numérique correspond à : « ${a} ${opFr} ${b} égale ${c} » ?`,
          correctLabel: correct,
          distractorLabels: [wrong],
          explanationSteps: [`« ${opFr} » signifie ${isAdd ? "+" : "-"}, donc la phrase est ${correct}.`],
          hints: ["« Plus » veut dire +. « Moins » veut dire -."]
        };
      }
    },
    declaredVariationSpace: 200
  }),
  matchingTemplate({
    key: "y1l3.matchEquationsToAnswers", levelKey: "Y1L3", objectiveCode: "Y1-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["SYMBOL_MEANING_CONFUSION"],
    generatePairs: (rng) => {
      const pairs: Array<{ left: string; right: string }> = [];
      const seen = new Set<string>();
      let guard = 0;
      while (pairs.length < 3 && guard < 50) {
        guard++;
        const isAdd = rng.chance(0.5);
        let a: number, b: number, c: number, left: string;
        if (isAdd) {
          a = rng.int(0, 10);
          b = rng.int(0, 10 - a);
          c = a + b;
          left = `${a} + ${b}`;
        } else {
          a = rng.int(0, 10);
          b = rng.int(0, a);
          c = a - b;
          left = `${a} - ${b}`;
        }
        if (seen.has(left)) continue;
        seen.add(left);
        pairs.push({ left, right: String(c) });
      }
      return pairs;
    },
    promptTemplates: ["Match each number sentence to its answer."],
    explain: () => ["Work out each calculation, then find its answer."],
    hints: () => ["Read the sign carefully — + means add, - means take away."],
    fr: {
      promptTemplates: ["Associe chaque phrase numérique à sa réponse."],
      explain: () => ["Calcule chaque opération, puis trouve sa réponse."],
      hints: () => ["Lis bien le signe — + veut dire additionner, - veut dire enlever."]
    },
    declaredVariationSpace: 3000
  }),
  categoricalPoolTemplate({
    key: "y1l3.tfEquationCorrect", levelKey: "Y1L3", objectiveCode: "Y1-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["SYMBOL_MEANING_CONFUSION"], type: "TRUE_FALSE",
    pools: { op: ["+", "-"] },
    build: (picked, rng) => {
      const isAdd = picked.op === "+";
      let a: number, b: number, correctAnswer: number;
      if (isAdd) {
        a = rng.int(0, 10);
        b = rng.int(0, 10 - a);
        correctAnswer = a + b;
      } else {
        a = rng.int(0, 10);
        b = rng.int(0, a);
        correctAnswer = a - b;
      }
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correctAnswer : correctAnswer + (rng.chance(0.5) ? 1 : -1) * rng.int(1, 3);
      return {
        prompt: `${a} ${picked.op} ${b} = ${shown}. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${a} ${picked.op} ${b} = ${correctAnswer}.`],
        hints: ["Work out the calculation yourself, then compare it to what is shown."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^(\d+) (.) (\d+) = (-?\d+)\. True or false\?/);
        if (!m) return {};
        const a = m[1]!, sign = m[2]!, b = m[3]!, shown = m[4]!;
        const correctAnswer = sign === "+" ? Number(a) + Number(b) : Number(a) - Number(b);
        const isTrue = drawn.correctLabel === "True";
        void picked;
        return {
          prompt: `${a} ${sign} ${b} = ${shown}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`${a} ${sign} ${b} = ${correctAnswer}.`],
          hints: ["Calcule toi-même l'opération, puis compare avec ce qui est montré."]
        };
      }
    },
    declaredVariationSpace: 400
  }),

  // --- Y1-L3-2: add two one-digit numbers within 10 ---
  arithmeticTemplate({
    key: "y1l3.addWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "What is {a} + {b}?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    visualAid: (v, r) => visuals.tenFrame(r),
    declaredVariationSpace: 66 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + {b} = ?", "Combien font {a} + {b} ?", "En comptant les {ctx} : combien font {a} + {b} ?"],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.mcAddWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count on from the bigger number."],
    distractorSpread: 3,
    declaredVariationSpace: 66,
    fr: {
      promptTemplates: ["Combien font {a} + {b} ?"],
      hints: () => ["Compte à partir du plus grand nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.tfAddWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["{a} + {b} ="],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two numbers and check your answer."],
    distractorSpread: 3,
    declaredVariationSpace: 66 * 2,
    fr: {
      promptTemplates: ["{a} + {b} ="],
      hints: () => ["Additionne les deux nombres et vérifie ta réponse."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.addWithin10VisualCount", levelKey: "Y1L3", objectiveCode: "Y1-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "VISUAL_COUNT",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["Count the full ten frame squares shown. {a} and {b} more makes how many {ctx} altogether?", "How many {ctx} are shown altogether: {a} and {b} more?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Count every filled square in the ten frame."],
    visualAid: (v, r) => visuals.tenFrame(r),
    declaredVariationSpace: 66 * 2 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Compte les cases remplies du cadre de dix. {a} et {b} de plus font combien {de:ctx} en tout ?", "Combien {de:ctx} sont montrés en tout : {a} et {b} de plus ?"],
      hints: () => ["Compte chaque case remplie dans le cadre de dix."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.addWithin10WordProblem", levelKey: "Y1L3", objectiveCode: "Y1-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! + v[1]! <= 10, compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} in a basket. {b} more are put in. How many {ctx} are there now?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Picture the objects together, then count them all."],
    visualAid: (v, r) => visuals.counters(r),
    declaredVariationSpace: 66 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} dans un panier. On en ajoute {b} de plus. Combien {de:ctx} y a-t-il maintenant ?"],
      hints: () => ["Imagine les objets tous ensemble, puis compte-les."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.missingAddendWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-2", difficulty: "REASONING",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! >= v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["{a} + ___ = {b}", "What must be added to {a} to make {b}?", "Counting {ctx}: what must be added to {a} to make {b}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the two numbers."],
    declaredVariationSpace: 66 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} + ___ = {b}", "Que faut-il ajouter à {a} pour faire {b} ?", "En comptant les {ctx} : que faut-il ajouter à {a} pour faire {b} ?"],
      hints: () => ["Calcule la différence entre les deux nombres."]
    }
  }),

  // --- Y1-L3-3: subtract one-digit numbers within 10 ---
  arithmeticTemplate({
    key: "y1l3.subtractWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "What is {a} - {b}?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    visualAid: (v, r) => visuals.tenFrame(r),
    declaredVariationSpace: 66 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{a} - {b} = ?", "Combien font {a} - {b} ?", "En comptant les {ctx} : combien font {a} - {b} ?"],
      hints: () => ["Compte à rebours à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.mcSubtractWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["What is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count back from the first number."],
    distractorSpread: 3,
    declaredVariationSpace: 66,
    fr: {
      promptTemplates: ["Combien font {a} - {b} ?"],
      hints: () => ["Compte à rebours à partir du premier nombre."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.tfSubtractWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "TRUE_FALSE",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["{a} - {b} ="],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the numbers and check your answer."],
    distractorSpread: 3,
    declaredVariationSpace: 66 * 2,
    fr: {
      promptTemplates: ["{a} - {b} ="],
      hints: () => ["Soustrais les nombres et vérifie ta réponse."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.subtractWithin10VisualCount", levelKey: "Y1L3", objectiveCode: "Y1-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "VISUAL_COUNT",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["There were {a} {ctx} shown in the ten frame. {b} {b#are|is} crossed out. How many {ctx} are left?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Count what is left after crossing some out."],
    visualAid: (v, r) => visuals.tenFrame(r),
    declaredVariationSpace: 66 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y avait {a} {ctx} montrés dans le cadre de dix. On en raye {b}. Combien {de:ctx} reste-t-il ?"],
      hints: () => ["Compte ce qu'il reste après en avoir rayé quelques-uns."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.subtractWithin10WordProblem", levelKey: "Y1L3", objectiveCode: "Y1-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "WORD_PROBLEM",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[0]! >= v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["There are {a} {ctx} on the table. {b} {b#are|is} given away. How many {ctx} are left?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Picture taking some away, then count what is left."],
    visualAid: (v, r) => visuals.counters(r),
    declaredVariationSpace: 66 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Il y a {a} {ctx} sur la table. On en donne {b}. Combien {de:ctx} reste-t-il ?"],
      hints: () => ["Imagine qu'on en enlève quelques-uns, puis compte ce qu'il reste."]
    }
  }),
  arithmeticTemplate({
    key: "y1l3.missingSubtrahendWithin10", levelKey: "Y1L3", objectiveCode: "Y1-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "MISSING_NUMBER",
    ranges: [[0, 10], [0, 10]], constraint: (v) => v[1]! > v[0]!, compute: (v) => v[1]! - v[0]!, contextPool: CTX,
    promptTemplates: ["{b} - ___ = {a}", "What must be taken away from {b} to leave {a}?", "Counting {ctx}: what must be taken away from {b} to leave {a}?"],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Work out the difference between the starting number and what is left."],
    declaredVariationSpace: 55 * 3,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["{b} - ___ = {a}", "Que faut-il enlever à {b} pour qu'il reste {a} ?", "En comptant les {ctx} : que faut-il enlever à {b} pour qu'il reste {a} ?"],
      hints: () => ["Calcule la différence entre le nombre de départ et ce qu'il reste."]
    }
  })
];

export default level;
