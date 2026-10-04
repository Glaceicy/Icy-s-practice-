import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 5 — "Equations, inequalities and simultaneous equations"
const CTX = ["pens", "notebooks", "tickets", "apples", "badges", "cards", "bottles", "boxes"];
const CTX_FR = ["stylos", "cahiers", "billets", "pommes", "badges", "cartes", "bouteilles", "boîtes"];

export const level: QuestionTemplateDef[] = [
  // --- Y9-L5-1: solve simultaneous equations ---
  arithmeticTemplate({
    key: "y9l5.simultaneousFindX", levelKey: "Y9L5", objectiveCode: "Y9-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ sum: v[0]! + v[1]!, diff: v[0]! - v[1]! }),
    promptTemplates: ["x + y = {sum} and x - y = {diff}. What is x?", "Solve simultaneously: x + y = {sum}, x - y = {diff}. Give x."],
    explain: (v, r) => [`Adding the two equations: 2x = ${v[0]! + v[1]! + v[0]! - v[1]!}.`, `x = ${r}.`],
    hints: () => ["Add the two equations together to eliminate y."],
    fr: {
      promptTemplates: ["x + y = {sum} et x - y = {diff}. Que vaut x ?", "Résous le système : x + y = {sum}, x - y = {diff}. Donne x."],
      explain: (v, r) => [`En additionnant les deux équations : 2x = ${v[0]! + v[1]! + v[0]! - v[1]!}.`, `x = ${r}.`],
      hints: () => ["Additionne les deux équations pour éliminer y."]
    },
    declaredVariationSpace: 144 * 2
  }),
  arithmeticTemplate({
    key: "y9l5.simultaneousFindY", levelKey: "Y9L5", objectiveCode: "Y9-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ sum: v[0]! + v[1]!, diff: v[0]! - v[1]! }),
    promptTemplates: ["x + y = {sum} and x - y = {diff}. What is y?", "Solve simultaneously: x + y = {sum}, x - y = {diff}. Give y."],
    explain: (v, r) => [`Subtracting the second equation from the first: 2y = ${2 * v[1]!}.`, `y = ${r}.`],
    hints: () => ["Subtract the second equation from the first to eliminate x."],
    fr: {
      promptTemplates: ["x + y = {sum} et x - y = {diff}. Que vaut y ?", "Résous le système : x + y = {sum}, x - y = {diff}. Donne y."],
      explain: (v, r) => [`En soustrayant la seconde équation de la première : 2y = ${2 * v[1]!}.`, `y = ${r}.`],
      hints: () => ["Soustrais la seconde équation de la première pour éliminer x."]
    },
    declaredVariationSpace: 144 * 2
  }),
  arithmeticTemplate({
    key: "y9l5.simultaneousWithCoefficient", levelKey: "Y9L5", objectiveCode: "Y9-L5-1", difficulty: "REASONING",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [1, 10], [2, 6]], compute: (v) => v[0]!,
    derive: (v) => ({ eq1: v[0]! * v[2]! + v[1]!, eq2: v[0]! + v[1]!, coef: v[2]! }),
    promptTemplates: ["{coef}x + y = {eq1} and x + y = {eq2}. What is x?"],
    explain: (v, r) => [`Subtracting the second from the first: ${v[2]! - 1}x = ${(v[2]! - 1) * v[0]!}.`, `x = ${r}.`],
    hints: () => ["Subtract one equation from the other to eliminate y, then solve for x."],
    fr: {
      promptTemplates: ["{coef}x + y = {eq1} et x + y = {eq2}. Que vaut x ?"],
      explain: (v, r) => [`En soustrayant la seconde de la première : ${v[2]! - 1}x = ${(v[2]! - 1) * v[0]!}.`, `x = ${r}.`],
      hints: () => ["Soustrais une équation de l'autre pour éliminer y, puis résous pour x."]
    },
    declaredVariationSpace: 10 * 10 * 5
  }),
  arithmeticTemplate({
    key: "y9l5.wordProblemSimultaneous", levelKey: "Y9L5", objectiveCode: "Y9-L5-1", difficulty: "REASONING",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[1, 15], [1, 15]], constraint: (v) => v[0]! > v[1]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! + v[1]!, difference: v[0]! - v[1]! }),
    promptTemplates: ["Two boxes of {ctx} hold {total} items in total. One box holds {difference} more than the other. How many are in the larger box?"],
    explain: (v, r) => [`If x + y = ${v[0]! + v[1]!} and x - y = ${v[0]! - v[1]!}, adding gives 2x = ${2 * v[0]!}.`, `x = ${r}.`],
    hints: () => ["Write two equations, then add them to eliminate the smaller amount."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Deux boîtes de {ctx} contiennent {total} articles au total. Une boîte en contient {difference} de plus que l'autre. Combien y en a-t-il dans la plus grande boîte ?"],
      explain: (v, r) => [`Si x + y = ${v[0]! + v[1]!} et x - y = ${v[0]! - v[1]!}, l'addition donne 2x = ${2 * v[0]!}.`, `x = ${r}.`],
      hints: () => ["Écris deux équations, puis additionne-les pour éliminer la plus petite quantité."]
    },
    declaredVariationSpace: 105 * CTX.length
  }),
  arithmeticTemplate({
    key: "y9l5.mcSimultaneous", levelKey: "Y9L5", objectiveCode: "Y9-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 12], [1, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ sum: v[0]! + v[1]!, diff: v[0]! - v[1]! }),
    promptTemplates: ["If x + y = {sum} and x - y = {diff}, what is x?"],
    explain: (v, r) => [`Adding the equations gives 2x = ${2 * v[0]!}, so x = ${r}.`],
    hints: () => ["Add the equations to eliminate y."],
    distractorSpread: 4,
    fr: {
      promptTemplates: ["Si x + y = {sum} et x - y = {diff}, que vaut x ?"],
      hints: () => ["Additionne les équations pour éliminer y."]
    },
    declaredVariationSpace: 144
  }),

  // --- Y9-L5-2: solve quadratic equations by factorisation ---
  arithmeticTemplate({
    key: "y9l5.quadraticLargerRoot", levelKey: "Y9L5", objectiveCode: "Y9-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.max(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Solve x² - {bCoef}x + {cCoef} = 0. What is the larger root?"],
    explain: (v, r) => [`It factorises as (x - ${v[0]})(x - ${v[1]}) = 0.`, `The roots are ${v[0]} and ${v[1]}; the larger is ${r}.`],
    hints: () => ["Factorise, then set each bracket equal to zero."],
    fr: {
      promptTemplates: ["Résous x² - {bCoef}x + {cCoef} = 0. Quelle est la plus grande racine ?"],
      explain: (v, r) => [`Cela se factorise en (x - ${v[0]})(x - ${v[1]}) = 0.`, `Les racines sont ${v[0]} et ${v[1]} ; la plus grande est ${r}.`],
      hints: () => ["Factorise, puis annule chaque parenthèse."]
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y9l5.quadraticSmallerRoot", levelKey: "Y9L5", objectiveCode: "Y9-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.min(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Solve x² - {bCoef}x + {cCoef} = 0. What is the smaller root?"],
    explain: (v, r) => [`(x - ${v[0]})(x - ${v[1]}) = 0 gives roots ${v[0]} and ${v[1]}.`, `The smaller is ${r}.`],
    hints: () => ["Factorise, then solve each bracket."],
    fr: {
      promptTemplates: ["Résous x² - {bCoef}x + {cCoef} = 0. Quelle est la plus petite racine ?"],
      explain: (v, r) => [`(x - ${v[0]})(x - ${v[1]}) = 0 donne les racines ${v[0]} et ${v[1]}.`, `La plus petite est ${r}.`],
      hints: () => ["Factorise, puis résous chaque parenthèse."]
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y9l5.quadraticDifferenceOfSquaresRoot", levelKey: "Y9L5", objectiveCode: "Y9-L5-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ square: v[0]! * v[0]! }),
    promptTemplates: ["Solve x² = {square}. What is the positive root?", "Solve x² - {square} = 0. Give the positive solution."],
    explain: (v, r) => [`${r} x ${r} = ${v[0]! * v[0]!}, so x = ${r} (or -${r}).`],
    hints: () => ["Take the square root of both sides — remember there are two solutions."],
    fr: {
      promptTemplates: ["Résous x² = {square}. Quelle est la racine positive ?", "Résous x² - {square} = 0. Donne la solution positive."],
      explain: (v, r) => [`${r} x ${r} = ${v[0]! * v[0]!}, donc x = ${r} (ou -${r}).`],
      hints: () => ["Prends la racine carrée des deux côtés — n'oublie pas qu'il y a deux solutions."]
    },
    declaredVariationSpace: 98 * 2
  }),
  categoricalPoolTemplate({
    key: "y9l5.mcQuadraticRoots", levelKey: "Y9L5", objectiveCode: "Y9-L5-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const p = rng.int(1, 10);
      const q = rng.int(1, 10);
      return {
        prompt: `What are the solutions of (x - ${p})(x - ${q}) = 0?`,
        correctLabel: `x = ${p} or x = ${q}`,
        distractorLabels: [`x = ${-p} or x = ${-q}`, `x = ${p + q}`],
        explanationSteps: [`Each bracket can be zero: x - ${p} = 0 gives x = ${p}; x - ${q} = 0 gives x = ${q}.`],
        hints: ["Set each bracket equal to zero in turn."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What are the solutions of (.+)\?$/);
        if (!m) return {};
        return { prompt: `Quelles sont les solutions de ${m[1]} ?`, hints: ["Annule chaque parenthèse tour à tour."] };
      }
    },
    declaredVariationSpace: 100
  }),
  arithmeticTemplate({
    key: "y9l5.quadraticRootProduct", levelKey: "Y9L5", objectiveCode: "Y9-L5-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["x² - {bCoef}x + {cCoef} = 0 has two roots. What is the product of those roots?"],
    explain: (v, r) => [`The roots are ${v[0]} and ${v[1]}.`, `${v[0]} x ${v[1]} = ${r}, which is the constant term.`],
    hints: () => ["For x² + bx + c, the product of the roots is the constant term c."],
    fr: {
      promptTemplates: ["x² - {bCoef}x + {cCoef} = 0 a deux racines. Quel est le produit de ces racines ?"],
      explain: (v, r) => [`Les racines sont ${v[0]} et ${v[1]}.`, `${v[0]} x ${v[1]} = ${r}, c'est le terme constant.`],
      hints: () => ["Pour x² + bx + c, le produit des racines est le terme constant c."]
    },
    declaredVariationSpace: 325
  }),

  // --- Y9-L5-3: solve linear inequalities ---
  arithmeticTemplate({
    key: "y9l5.solveInequalityBoundary", levelKey: "Y9L5", objectiveCode: "Y9-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 10], [0, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ bound: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["Solve {a}x + {b} < {bound}. What is the boundary value of x (the number x must stay below)?"],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}, so x < ${r}.`],
    hints: () => ["Solve it exactly like an equation — the inequality sign stays the same when dividing by a positive number."],
    fr: {
      promptTemplates: ["Résous {a}x + {b} < {bound}. Quelle est la valeur limite de x (le nombre sous lequel x doit rester) ?"],
      explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}, donc x < ${r}.`],
      hints: () => ["Résous comme une équation — le sens de l'inégalité ne change pas si on divise par un nombre positif."]
    },
    declaredVariationSpace: 9 * 21 * 15
  }),
  arithmeticTemplate({
    key: "y9l5.largestIntegerSatisfyingInequality", levelKey: "Y9L5", objectiveCode: "Y9-L5-3", difficulty: "REASONING",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 10], [0, 20], [2, 15]], compute: (v) => v[2]! - 1,
    derive: (v) => ({ bound: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["Solve {a}x + {b} < {bound}. What is the largest integer value x can take?"],
    explain: (v, r) => [`Solving gives x < ${v[2]}.`, `The largest integer below ${v[2]} is ${r}.`],
    hints: () => ["Solve the inequality first, then pick the largest whole number strictly below the boundary."],
    fr: {
      promptTemplates: ["Résous {a}x + {b} < {bound}. Quelle est la plus grande valeur entière que x peut prendre ?"],
      explain: (v, r) => [`La résolution donne x < ${v[2]}.`, `Le plus grand entier strictement inférieur à ${v[2]} est ${r}.`],
      hints: () => ["Résous d'abord l'inégalité, puis choisis le plus grand entier strictement inférieur à la limite."]
    },
    declaredVariationSpace: 9 * 21 * 14
  }),
  categoricalPoolTemplate({
    key: "y9l5.tfInequalityDirection", levelKey: "Y9L5", objectiveCode: "Y9-L5-3", difficulty: "REASONING",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 10);
      const x = rng.int(1, 15);
      const b = rng.int(0, 20);
      const bound = a * x + b;
      const testValue = rng.int(1, 25);
      const claimTrue = a * testValue + b < bound;
      return {
        prompt: `x = ${testValue} is a solution of ${a}x + ${b} < ${bound}. True or false?`,
        correctLabel: claimTrue ? "True" : "False",
        distractorLabels: [claimTrue ? "False" : "True"],
        explanationSteps: [`${a} x ${testValue} + ${b} = ${a * testValue + b}, and the inequality needs a value below ${bound}.`],
        hints: ["Substitute the value in and check whether the inequality holds."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^x = (\d+) is a solution of (\d+)x \+ (\d+) < (\d+)\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `x = ${m[1]} est une solution de ${m[2]}x + ${m[3]} < ${m[4]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Remplace la valeur et vérifie si l'inégalité est vraie."]
        };
      }
    },
    declaredVariationSpace: 5000
  }),
  arithmeticTemplate({
    key: "y9l5.mcInequalityBoundary", levelKey: "Y9L5", objectiveCode: "Y9-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 10], [0, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ bound: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["Solving {a}x + {b} < {bound} gives x < ?"],
    explain: (v, r) => [`(${v[0]! * v[2]! + v[1]!} - ${v[1]}) ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the constant, then divide by the coefficient of x."],
    distractorSpread: 4,
    fr: {
      promptTemplates: ["Résoudre {a}x + {b} < {bound} donne x < ?"],
      hints: () => ["Soustrais la constante, puis divise par le coefficient de x."]
    },
    declaredVariationSpace: 9 * 21 * 15
  }),
  arithmeticTemplate({
    key: "y9l5.wordProblemInequality", levelKey: "Y9L5", objectiveCode: "Y9-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "WORD_PROBLEM", contextPool: CTX,
    ranges: [[2, 12], [1, 20], [2, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ budget: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["{ctx} cost £{a} each, plus a £{b} delivery fee. With a budget of £{budget}, what is the greatest number that can be bought?"],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!} for the items.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the fixed fee, then divide by the price of one item."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Des {ctx} coûtent £{a} chacun, plus £{b} de frais de livraison. Avec un budget de £{budget}, quel est le nombre maximal qu'on peut acheter ?"],
      explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!} pour les articles.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Soustrais les frais fixes, puis divise par le prix d'un article."]
    },
    declaredVariationSpace: 11 * 20 * 14 * CTX.length
  })
];

export default level;
