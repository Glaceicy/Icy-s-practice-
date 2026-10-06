import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 7 — "Equations and number sequences"
const CTX = ["pencils", "stickers", "sweets", "marbles", "badges", "counters", "cards", "tokens"];
const CTX_FR = ["crayons", "autocollants", "bonbons", "billes", "badges", "jetons", "cartes", "jetons de jeu"];

export const level: QuestionTemplateDef[] = [
  // --- Y7-L7-1: concepts/vocabulary of expressions, equations, inequalities, terms, factors ---
  categoricalPoolTemplate({
    key: "y7l7.mcDefineVocabulary", levelKey: "Y7L7", objectiveCode: "Y7-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["ALGEBRA_VOCABULARY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { word: ["term", "expression", "equation", "factor", "coefficient", "variable", "constant", "inequality"] },
    build: (picked, rng) => {
      const defs: Record<string, string> = {
        term: "a single number, variable, or numbers and variables multiplied together",
        expression: "a collection of terms, with no equals sign",
        equation: "a statement that two expressions are equal, using an equals sign",
        factor: "a number or expression that divides another exactly",
        coefficient: "the number multiplying a variable in a term",
        variable: "a letter standing for a number that can change",
        constant: "a fixed number in an expression, with no letter attached",
        inequality: "a statement comparing two expressions using <, > or similar signs"
      };
      const others = Object.keys(defs).filter((w) => w !== picked.word);
      const distractors = rng.shuffle(others).slice(0, 2).map((w) => defs[w]!);
      return {
        prompt: `What does the word "${picked.word}" mean in algebra?`,
        correctLabel: defs[picked.word!]!,
        distractorLabels: distractors,
        explanationSteps: [`A "${picked.word}" is ${defs[picked.word!]}.`],
        hints: ["Think about how this word is used when describing algebraic statements."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const defsFr: Record<string, string> = {
          term: "un seul nombre, une variable, ou des nombres et variables multipliés ensemble",
          expression: "un ensemble de termes, sans signe égal",
          equation: "une affirmation que deux expressions sont égales, avec un signe égal",
          factor: "un nombre ou une expression qui divise exactement un autre",
          coefficient: "le nombre qui multiplie une variable dans un terme",
          variable: "une lettre représentant un nombre qui peut changer",
          constant: "un nombre fixe dans une expression, sans lettre attachée",
          inequality: "un énoncé comparant deux expressions à l'aide de <, > ou de signes similaires"
        };
        const wordFr: Record<string, string> = { term: "terme", expression: "expression", equation: "équation", factor: "facteur", coefficient: "coefficient", variable: "variable", constant: "constante", inequality: "inégalité" };
        const others = Object.keys(defsFr).filter((w) => w !== picked.word);
        return {
          prompt: `Que signifie le mot « ${wordFr[picked.word!]} » en algèbre ?`,
          correctLabel: defsFr[picked.word!]!,
          distractorLabels: others.slice(0, 2).map((w) => defsFr[w]!),
          explanationSteps: [`Un « ${wordFr[picked.word!]} » est ${defsFr[picked.word!]}.`],
          hints: ["Réfléchis à la façon dont ce mot est utilisé pour décrire des énoncés algébriques."]
        };
      }
    },
    declaredVariationSpace: 200
  }),
  arithmeticTemplate({
    key: "y7l7.findFactorOfExpression", levelKey: "Y7L7", objectiveCode: "Y7-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["ALGEBRA_VOCABULARY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 12], [1, 6]], compute: (v) => v[0]!,
    derive: (v) => ({ coeff: v[0]! * v[1]!, con: v[0]! * (v[1]! + v[2]!) }),
    promptTemplates: ["{coeff}x and {con} share a common factor greater than 1. What is it?", "What is the common factor shared by {coeff}x and {con}?"],
    explain: (v, r) => [`Both ${v[0]! * v[1]!} and ${v[0]! * (v[1]! + v[2]!)} divide exactly by ${r}.`],
    hints: () => ["Find a number that divides both the coefficient and the constant exactly."],
    fr: {
      promptTemplates: ["{coeff}x et {con} partagent un facteur commun supérieur à 1. Quel est-il ?", "Quel est le facteur commun partagé par {coeff}x et {con} ?"],
      hints: () => ["Trouve un nombre qui divise exactement le coefficient et la constante."]
    },
    declaredVariationSpace: 8 * 12 * 6 * 2
  }),
  categoricalPoolTemplate({
    key: "y7l7.tfVocabulary", levelKey: "Y7L7", objectiveCode: "Y7-L7-1", difficulty: "REASONING",
    misconceptionTags: ["ALGEBRA_VOCABULARY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const coeff = rng.int(2, 12);
      const con = rng.int(1, 20);
      const letter = rng.pick(["x", "y", "n", "a"]);
      const isEquation = rng.chance(0.5);
      const statement = isEquation ? `${coeff}${letter} + ${con} = ${coeff * 2 + con}` : `${coeff}${letter} + ${con}`;
      const claimEquation = rng.chance(0.5);
      const claimWord = claimEquation ? "an equation" : "an expression";
      const claimIsCorrect = claimEquation === isEquation;
      return {
        prompt: `${statement} is ${claimWord}. True or false?`,
        correctLabel: claimIsCorrect ? "True" : "False",
        distractorLabels: [claimIsCorrect ? "False" : "True"],
        explanationSteps: [
          isEquation
            ? `${statement} contains an equals sign, so it is an equation.`
            : `${statement} has no equals sign, so it is an expression, not an equation.`
        ],
        hints: ["An equation has an equals sign; an expression does not."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(.*) is an (equation|expression)\. True or false\?$/);
        if (!m) return {};
        const statement = m[1]!;
        const claimFr = m[2] === "equation" ? "une équation" : "une expression";
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${statement} est ${claimFr}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [statement.includes("=") ? `${statement} contient un signe égal, c'est donc une équation.` : `${statement} n'a pas de signe égal, c'est donc une expression, pas une équation.`],
          hints: ["Une équation a un signe égal ; une expression n'en a pas."]
        };
      }
    },
    declaredVariationSpace: 11 * 20 * 4 * 4
  }),
  matchingTemplate({
    key: "y7l7.matchVocabularyTerms", levelKey: "Y7L7", objectiveCode: "Y7-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["ALGEBRA_VOCABULARY_ERROR"],
    generatePairs: (rng) => {
      const all = [
        { left: "Term", right: "A single number or variable, or numbers/variables multiplied together" },
        { left: "Expression", right: "A collection of terms with no equals sign" },
        { left: "Equation", right: "A statement that two expressions are equal" },
        { left: "Factor", right: "A number that divides another exactly" }
      ];
      return rng.shuffle(all).slice(0, 4);
    },
    promptTemplates: ["Match each word to its meaning."],
    explain: () => ["Each algebra word has a precise, specific meaning."],
    hints: () => ["Think about how each word is used in an algebraic statement."],
    fr: {
      promptTemplates: ["Associe chaque mot à sa signification."],
      explain: () => ["Chaque mot d'algèbre a une signification précise et spécifique."],
      hints: () => ["Réfléchis à la façon dont chaque mot est utilisé dans un énoncé algébrique."],
      translatePairs: (pairs) => pairs.map((p) => {
        const leftMap: Record<string, string> = { Term: "Terme", Expression: "Expression", Equation: "Équation", Factor: "Facteur" };
        const rightMap: Record<string, string> = {
          "A single number or variable, or numbers/variables multiplied together": "Un simple nombre ou une variable, ou des nombres/variables multipliés ensemble",
          "A collection of terms with no equals sign": "Un ensemble de termes sans signe égal",
          "A statement that two expressions are equal": "Un énoncé affirmant que deux expressions sont égales",
          "A number that divides another exactly": "Un nombre qui en divise un autre exactement"
        };
        return { left: leftMap[p.left] ?? p.left, right: rightMap[p.right] ?? p.right };
      })
    },
    declaredVariationSpace: 24
  }),
  categoricalPoolTemplate({
    key: "y7l7.mcTermVsExpression", levelKey: "Y7L7", objectiveCode: "Y7-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["ALGEBRA_VOCABULARY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const coeff = rng.int(2, 9);
      const letter = rng.pick(["x", "y", "n", "a"]);
      const con = rng.int(1, 15);
      return {
        prompt: `In the expression ${coeff}${letter} + ${con}, how many terms are there?`,
        correctLabel: "2",
        distractorLabels: ["1", "3"],
        explanationSteps: [`${coeff}${letter} is one term and ${con} is another term, separated by a +.`],
        hints: ["Terms are separated by + or - signs."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^In the expression (\S+) \+ (\d+), how many terms are there\?/);
        if (!m) return {};
        return { prompt: `Dans l'expression ${m[1]} + ${m[2]}, combien y a-t-il de termes ?`, hints: ["Les termes sont séparés par des signes + ou -."] };
      }
    },
    declaredVariationSpace: 400
  }),

  // --- Y7-L7-2: solve linear equations in one unknown ---
  arithmeticTemplate({
    key: "y7l7.solveOneStepAdd", levelKey: "Y7L7", objectiveCode: "Y7-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [1, 30]], compute: (v) => v[1]! - v[0]!,
    promptTemplates: ["x + {a} = {b}. What is x?", "Solve x + {a} = {b}."],
    explain: (v, r) => [`${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract the number from both sides to find x."],
    fr: {
      promptTemplates: ["x + {a} = {b}. Que vaut x ?", "Résous x + {a} = {b}."],
      hints: () => ["Soustrais le nombre des deux côtés pour trouver x."]
    },
    declaredVariationSpace: 600
  }),
  arithmeticTemplate({
    key: "y7l7.solveOneStepMultiply", levelKey: "Y7L7", objectiveCode: "Y7-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ product: v[0]! * v[1]! }),
    promptTemplates: ["{a}x = {product}. What is x?", "Solve {a}x = {product}."],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide both sides by the coefficient of x."],
    fr: {
      promptTemplates: ["{a}x = {product}. Que vaut x ?", "Résous {a}x = {product}."],
      hints: () => ["Divise les deux côtés par le coefficient de x."]
    },
    declaredVariationSpace: 11 * 15
  }),
  arithmeticTemplate({
    key: "y7l7.solveTwoStep", levelKey: "Y7L7", objectiveCode: "Y7-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [0, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["{a}x + {b} = {total}. What is x?", "Solve {a}x + {b} = {total}."],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the constant from both sides first, then divide by the coefficient of x."],
    fr: {
      promptTemplates: ["{a}x + {b} = {total}. Que vaut x ?", "Résous {a}x + {b} = {total}."],
      hints: () => ["Soustrais d'abord la constante des deux côtés, puis divise par le coefficient de x."]
    },
    declaredVariationSpace: 8 * 21 * 15
  }),
  arithmeticTemplate({
    key: "y7l7.solveUnknownBothSides", levelKey: "Y7L7", objectiveCode: "Y7-L7-2", difficulty: "REASONING",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [2, 9], [1, 8], [0, 10]], constraint: (v) => v[1]! > v[2]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ dRight: (v[1]! - v[2]!) * v[0]! + v[3]! }),
    promptTemplates: ["{b}x + {d} = {c}x + {dRight}. What is x?", "Solve {b}x + {d} = {c}x + {dRight}."],
    explain: (v, r) => [`Move the x terms together: (${v[1]} - ${v[2]})x = ${v[3]! + (v[1]! - v[2]!) * v[0]!} - ${v[3]}.`, `${v[1]! - v[2]!}x = ${(v[1]! - v[2]!) * v[0]!}, so x = ${r}.`],
    hints: () => ["Move the unknown terms to one side and the numbers to the other, then solve."],
    fr: {
      promptTemplates: ["{b}x + {d} = {c}x + {dRight}. Que vaut x ?", "Résous {b}x + {d} = {c}x + {dRight}."],
      hints: () => ["Déplace les termes en x d'un côté et les nombres de l'autre, puis résous."]
    },
    declaredVariationSpace: 15 * 8 * 7 * 11
  }),
  arithmeticTemplate({
    key: "y7l7.mcSolveTwoStep", levelKey: "Y7L7", objectiveCode: "Y7-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 9], [0, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["What is x, if {a}x + {b} = {total}?"],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}, then ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the constant, then divide by the coefficient of x."],
    distractorSpread: 4,
    fr: {
      promptTemplates: ["Que vaut x, si {a}x + {b} = {total} ?"],
      hints: () => ["Soustrais la constante, puis divise par le coefficient de x."]
    },
    declaredVariationSpace: 8 * 21 * 15
  }),
  arithmeticTemplate({
    key: "y7l7.wordProblemSolveEquation", levelKey: "Y7L7", objectiveCode: "Y7-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 9], [0, 20], [1, 15]], compute: (v) => v[2]!, contextPool: CTX,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["Jo buys some {ctx} costing {a} pence each, plus a {b} pence bag. The total cost is {total} pence. How many {ctx} did Jo buy?"],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the fixed cost first, then divide by the price per item."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Jo achète des {ctx} à {a} pence chacun, plus un sac à {b} pence. Le coût total est de {total} pence. Combien {de:ctx} Jo a-t-il achetés ?"],
      hints: () => ["Soustrais d'abord le coût fixe, puis divise par le prix de chaque article."]
    },
    declaredVariationSpace: 8 * 21 * 15 * CTX.length
  }),

  // --- Y7-L7-3: generate terms of a sequence from a rule ---
  arithmeticTemplate({
    key: "y7l7.nextTermArithmeticSequence", levelKey: "Y7L7", objectiveCode: "Y7-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 15]], compute: (v) => v[0]! + v[1]! * 3,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2 }),
    promptTemplates: ["{a}, {t2}, {t3}, ___. What is the next term?"],
    explain: (v, r) => [`Each term increases by ${v[1]}.`, `${v[0]! + v[1]! * 2} + ${v[1]} = ${r}.`],
    hints: () => ["Work out the term-to-term rule, then apply it to the last term."],
    fr: {
      promptTemplates: ["{a}, {t2}, {t3}, ___. Quel est le terme suivant ?"],
      hints: () => ["Détermine la règle de terme en terme, puis applique-la au dernier terme."]
    },
    declaredVariationSpace: 750
  }),
  arithmeticTemplate({
    key: "y7l7.nthTermFormulaValue", levelKey: "Y7L7", objectiveCode: "Y7-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [0, 20], [1, 15]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: ["The nth term of a sequence is {a}n + {b}. What is the {c}th term?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the term number into the formula in place of n."],
    fr: {
      promptTemplates: ["Le terme général d'une suite est {a}n + {b}. Quel est le {c}e terme ?"],
      hints: () => ["Remplace n par le numéro du terme dans la formule."]
    },
    declaredVariationSpace: 10 * 21 * 15
  }),
  arithmeticTemplate({
    key: "y7l7.mcNextTerm", levelKey: "Y7L7", objectiveCode: "Y7-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 50], [1, 15]], compute: (v) => v[0]! + v[1]! * 3,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2 }),
    promptTemplates: ["{a}, {t2}, {t3}, ___. What comes next?"],
    explain: (v, r) => [`The sequence increases by ${v[1]} each time, so the next term is ${r}.`],
    hints: () => ["Find the difference between consecutive terms, then apply it once more."],
    distractorSpread: 5,
    fr: {
      promptTemplates: ["{a}, {t2}, {t3}, ___. Que vient-il ensuite ?"],
      hints: () => ["Trouve la différence entre les termes consécutifs, puis applique-la une fois de plus."]
    },
    declaredVariationSpace: 750
  }),
  arithmeticTemplate({
    key: "y7l7.findCommonDifference", levelKey: "Y7L7", objectiveCode: "Y7-L7-3", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 50], [1, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2, t4: v[0]! + v[1]! * 3 }),
    promptTemplates: ["{a}, {t2}, {t3}, {t4}. What is the term-to-term difference?"],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract one term from the next to find the difference."],
    fr: {
      promptTemplates: ["{a}, {t2}, {t3}, {t4}. Quelle est la différence de terme en terme ?"],
      hints: () => ["Soustrais un terme du suivant pour trouver la différence."]
    },
    declaredVariationSpace: 750
  })
];

export default level;
