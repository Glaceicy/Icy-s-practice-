import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 3 — "Algebraic expressions, equations, inequalities and sequences"
// One template is tagged HIGHER (algebraic fractions), matching the Higher-tier
// extension in objective Y10-L3-1.
export const level: QuestionTemplateDef[] = [
  // --- Y10-L3-1: simplify and manipulate algebraic expressions ---
  arithmeticTemplate({
    key: "y10l3.expandSingleBracket", levelKey: "Y10L3", objectiveCode: "Y10-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [2, 15], [1, 20]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["Expand {a}({b}x + {c}). What is the coefficient of x?", "What is the x coefficient when {a}({b}x + {c}) is expanded?"],
    explain: (v, r) => [`${v[0]} x ${v[1]}x = ${r}x.`],
    hints: () => ["Multiply everything inside the bracket by the number outside."],
    fr: {
      promptTemplates: ["Développe {a}({b}x + {c}). Quel est le coefficient de x ?", "Quel est le coefficient de x quand {a}({b}x + {c}) est développé ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]}x = ${r}x.`],
      hints: () => ["Multiplie tout ce qui est dans la parenthèse par le nombre à l'extérieur."]
    },
    declaredVariationSpace: 14 * 14 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y10l3.expandDoubleBracketXTerm", levelKey: "Y10L3", objectiveCode: "Y10-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 16], [1, 16]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["Expand (x + {a})(x + {b}). What is the coefficient of x?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["The x coefficient is the sum of the two numbers."],
    fr: {
      promptTemplates: ["Développe (x + {a})(x + {b}). Quel est le coefficient de x ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Le coefficient de x est la somme des deux nombres."]
    },
    declaredVariationSpace: 256
  }),
  arithmeticTemplate({
    key: "y10l3.factoriseCommonFactor", levelKey: "Y10L3", objectiveCode: "Y10-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 15], [1, 15]], constraint: (v) => v[1]! !== v[2]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ term1: v[0]! * v[1]!, term2: v[0]! * v[2]! }),
    promptTemplates: ["Factorise {term1}x + {term2}. What number goes outside the bracket?"],
    explain: (v, r) => [`${v[0]! * v[1]!} and ${v[0]! * v[2]!} share a common factor of ${r}.`],
    hints: () => ["Find the highest common factor of both terms."],
    fr: {
      promptTemplates: ["Factorise {term1}x + {term2}. Quel nombre se place devant la parenthèse ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} et ${v[0]! * v[2]!} ont un facteur commun de ${r}.`],
      hints: () => ["Trouve le plus grand facteur commun des deux termes."]
    },
    declaredVariationSpace: 11 * 15 * 15
  }),
  arithmeticTemplate({
    key: "y10l3.collectLikeTerms", levelKey: "Y10L3", objectiveCode: "Y10-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [1, 20], [1, 20]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: ["Simplify {a}x + {b}y + {c}x. What is the coefficient of x?"],
    explain: (v, r) => [`${v[0]}x + ${v[2]}x = ${r}x; the y term stays separate.`],
    hints: () => ["Only terms with the same letter combine."],
    fr: {
      promptTemplates: ["Simplifie {a}x + {b}y + {c}x. Quel est le coefficient de x ?"],
      explain: (v, r) => [`${v[0]}x + ${v[2]}x = ${r}x ; le terme en y reste séparé.`],
      hints: () => ["Seuls les termes ayant la même lettre se combinent."]
    },
    declaredVariationSpace: 8000
  }),
  arithmeticTemplate({
    key: "y10l3.simplifyAlgebraicFraction", levelKey: "Y10L3", objectiveCode: "Y10-L3-1", difficulty: "REASONING",
    misconceptionTags: ["ALGEBRAIC_FRACTION_ERROR"], type: "NUMBER_ENTRY", pathway: "HIGHER",
    ranges: [[2, 12], [1, 15], [1, 15]], constraint: (v) => v[1]! !== v[2]!,
    compute: (v) => v[1]!,
    derive: (v) => ({ num: v[0]! * v[1]!, den: v[0]! }),
    promptTemplates: ["Simplify the algebraic fraction {num}x ÷ {den}. What is the coefficient of x in the simplified form?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, so the fraction simplifies to ${r}x.`],
    hints: () => ["Divide the numerator's coefficient by the denominator."],
    fr: {
      promptTemplates: ["Simplifie la fraction algébrique {num}x ÷ {den}. Quel est le coefficient de x sous forme simplifiée ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, donc la fraction se simplifie en ${r}x.`],
      hints: () => ["Divise le coefficient du numérateur par le dénominateur."]
    },
    declaredVariationSpace: 11 * 15 * 15
  }),

  // --- Y10-L3-2: solve linear and quadratic equations ---
  arithmeticTemplate({
    key: "y10l3.solveLinearTwoStep", levelKey: "Y10L3", objectiveCode: "Y10-L3-2", difficulty: "FLUENCY",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [0, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["Solve {a}x + {b} = {total}. What is x?"],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Undo the addition, then the multiplication."],
    fr: {
      promptTemplates: ["Résous {a}x + {b} = {total}. Que vaut x ?"],
      explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Annule l'addition, puis la multiplication."]
    },
    declaredVariationSpace: 11 * 31 * 20
  }),
  arithmeticTemplate({
    key: "y10l3.solveUnknownBothSides", levelKey: "Y10L3", objectiveCode: "Y10-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 18], [3, 12], [1, 9], [0, 20]], constraint: (v) => v[1]! > v[2]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ dRight: (v[1]! - v[2]!) * v[0]! + v[3]! }),
    promptTemplates: ["Solve {b}x + {d} = {c}x + {dRight}. What is x?"],
    explain: (v, r) => [`(${v[1]} - ${v[2]})x = ${(v[1]! - v[2]!) * v[0]!}.`, `x = ${r}.`],
    hints: () => ["Collect the x terms on one side and the numbers on the other."],
    fr: {
      promptTemplates: ["Résous {b}x + {d} = {c}x + {dRight}. Que vaut x ?"],
      explain: (v, r) => [`(${v[1]} - ${v[2]})x = ${(v[1]! - v[2]!) * v[0]!}.`, `x = ${r}.`],
      hints: () => ["Regroupe les termes en x d'un côté et les nombres de l'autre."]
    },
    declaredVariationSpace: 18 * 10 * 9 * 21
  }),
  arithmeticTemplate({
    key: "y10l3.quadraticLargerRoot", levelKey: "Y10L3", objectiveCode: "Y10-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.max(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Solve x² - {bCoef}x + {cCoef} = 0 by factorising. What is the larger root?"],
    explain: (v, r) => [`(x - ${v[0]})(x - ${v[1]}) = 0, so the roots are ${v[0]} and ${v[1]}.`, `The larger is ${r}.`],
    hints: () => ["Find two numbers that multiply to the constant and add to the x coefficient."],
    fr: {
      promptTemplates: ["Résous x² - {bCoef}x + {cCoef} = 0 par factorisation. Quelle est la plus grande racine ?"],
      explain: (v, r) => [`(x - ${v[0]})(x - ${v[1]}) = 0, donc les racines sont ${v[0]} et ${v[1]}.`, `La plus grande est ${r}.`],
      hints: () => ["Trouve deux nombres dont le produit est la constante et la somme le coefficient de x."]
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y10l3.quadraticDiscriminant", levelKey: "Y10L3", objectiveCode: "Y10-L3-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 6], [1, 20], [1, 20]], compute: (v) => v[1]! * v[1]! - 4 * v[0]! * v[2]!,
    promptTemplates: ["For the quadratic {a}x² + {b}x + {c} = 0, what is the value of the discriminant b² - 4ac?"],
    explain: (v, r) => [`${v[1]}² = ${v[1]! * v[1]!}.`, `4 x ${v[0]} x ${v[2]} = ${4 * v[0]! * v[2]!}.`, `${v[1]! * v[1]!} - ${4 * v[0]! * v[2]!} = ${r}.`],
    hints: () => ["The discriminant is b² - 4ac, read straight off the equation."],
    fr: {
      promptTemplates: ["Pour l'équation {a}x² + {b}x + {c} = 0, quelle est la valeur du discriminant b² - 4ac ?"],
      explain: (v, r) => [`${v[1]}² = ${v[1]! * v[1]!}.`, `4 x ${v[0]} x ${v[2]} = ${4 * v[0]! * v[2]!}.`, `${v[1]! * v[1]!} - ${4 * v[0]! * v[2]!} = ${r}.`],
      hints: () => ["Le discriminant est b² - 4ac, lu directement sur l'équation."]
    },
    declaredVariationSpace: 6 * 20 * 20
  }),
  arithmeticTemplate({
    key: "y10l3.mcSolveLinear", levelKey: "Y10L3", objectiveCode: "Y10-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_SOLVING_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 12], [0, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["What is x, if {a}x + {b} = {total}?"],
    explain: (v, r) => [`x = ${r}.`],
    hints: () => ["Subtract, then divide."],
    distractorSpread: 5,
    fr: {
      promptTemplates: ["Que vaut x, si {a}x + {b} = {total} ?"],
      hints: () => ["Soustrais, puis divise."]
    },
    declaredVariationSpace: 11 * 31 * 20
  }),
  arithmeticTemplate({
    key: "y10l3.solveInequalityBoundary", levelKey: "Y10L3", objectiveCode: "Y10-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [0, 25], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ bound: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["Solve {a}x + {b} < {bound}. What value must x stay below?"],
    explain: (v, r) => [`(${v[0]! * v[2]! + v[1]!} - ${v[1]}) ÷ ${v[0]} = ${r}, so x < ${r}.`],
    hints: () => ["Solve it like an equation — dividing by a positive number keeps the inequality the same way round."],
    fr: {
      promptTemplates: ["Résous {a}x + {b} < {bound}. Sous quelle valeur x doit-il rester ?"],
      explain: (v, r) => [`(${v[0]! * v[2]! + v[1]!} - ${v[1]}) ÷ ${v[0]} = ${r}, donc x < ${r}.`],
      hints: () => ["Résous comme une équation — diviser par un nombre positif ne change pas le sens."]
    },
    declaredVariationSpace: 11 * 26 * 20
  }),

  // --- Y10-L3-3: sequences, including nth term ---
  arithmeticTemplate({
    key: "y10l3.nthTermValue", levelKey: "Y10L3", objectiveCode: "Y10-L3-3", difficulty: "FLUENCY",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [0, 25], [1, 25]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: ["A sequence has nth term {a}n + {b}. What is the {c}th term?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the term number for n."],
    fr: {
      promptTemplates: ["Une suite a pour terme général {a}n + {b}. Quel est le {c}e terme ?"],
      explain: (v, r) => [`${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace n par le numéro du terme."]
    },
    declaredVariationSpace: 14 * 26 * 25
  }),
  arithmeticTemplate({
    key: "y10l3.findNthTermCoefficient", levelKey: "Y10L3", objectiveCode: "Y10-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 40], [2, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2, t4: v[0]! + v[1]! * 3 }),
    promptTemplates: ["For the sequence {t1}, {t2}, {t3}, {t4}, what is the coefficient of n in the nth-term rule?"],
    explain: (v, r) => [`The common difference is ${r}, which is the coefficient of n.`],
    hints: () => ["The common difference is always the coefficient of n."],
    fr: {
      promptTemplates: ["Pour la suite {t1}, {t2}, {t3}, {t4}, quel est le coefficient de n dans la formule du terme général ?"],
      explain: (v, r) => [`La raison est ${r}, qui est le coefficient de n.`],
      hints: () => ["La raison est toujours le coefficient de n."]
    },
    declaredVariationSpace: 40 * 14
  }),
  arithmeticTemplate({
    key: "y10l3.findNthTermConstant", levelKey: "Y10L3", objectiveCode: "Y10-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 40], [2, 15]], compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + v[1]! * 2 }),
    promptTemplates: ["For the sequence {t1}, {t2}, {t3}, ... the nth term is {b}n + c. What is c?"],
    explain: (v, r) => [`The first term is ${v[0]}, and ${v[1]} x 1 = ${v[1]}.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the common difference from the first term."],
    fr: {
      promptTemplates: ["Pour la suite {t1}, {t2}, {t3}, ... le terme général est {b}n + c. Que vaut c ?"],
      explain: (v, r) => [`Le premier terme est ${v[0]}, et ${v[1]} x 1 = ${v[1]}.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Soustrais la raison du premier terme."]
    },
    declaredVariationSpace: 40 * 14
  }),
  arithmeticTemplate({
    key: "y10l3.quadraticSequenceTerm", levelKey: "Y10L3", objectiveCode: "Y10-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 8], [0, 20], [1, 12]], compute: (v) => v[0]! * v[2]! * v[2]! + v[1]!,
    promptTemplates: ["A quadratic sequence has nth term {a}n² + {b}. What is the {c}th term?"],
    explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Square the term number first, then multiply and add."],
    fr: {
      promptTemplates: ["Une suite quadratique a pour terme général {a}n² + {b}. Quel est le {c}e terme ?"],
      explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord le rang au carré, puis multiplie et additionne."]
    },
    declaredVariationSpace: 8 * 21 * 12
  }),
  matchingTemplate({
    key: "y10l3.matchSequencesToRules", levelKey: "Y10L3", objectiveCode: "Y10-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const a = rng.int(2, 12);
        const b = rng.int(0, 15);
        const key = `${a}n+${b}`;
        if (used.has(key)) continue;
        used.add(key);
        pairs.push({ left: `${a + b}, ${2 * a + b}, ${3 * a + b}, ...`, right: `${a}n + ${b}` });
      }
      return pairs;
    },
    promptTemplates: ["Match each sequence to its nth-term rule."],
    explain: () => ["The common difference gives the coefficient of n; work back to find the constant."],
    hints: () => ["Find the step between terms first."],
    fr: {
      promptTemplates: ["Associe chaque suite à la formule de son terme général."],
      explain: () => ["La raison donne le coefficient de n ; remonte ensuite pour trouver la constante."],
      hints: () => ["Trouve d'abord le pas entre les termes."]
    },
    declaredVariationSpace: 4000
  }),
  categoricalPoolTemplate({
    key: "y10l3.tfSequenceMembership", levelKey: "Y10L3", objectiveCode: "Y10-L3-3", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_RULE_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 12);
      const b = rng.int(0, 20);
      const n = rng.int(2, 20);
      const inSequence = rng.chance(0.5);
      const value = inSequence ? a * n + b : a * n + b + 1;
      return {
        prompt: `Is ${value} a term in the sequence with nth term ${a}n + ${b}? Answer true if it is.`,
        correctLabel: inSequence ? "True" : "False",
        distractorLabels: [inSequence ? "False" : "True"],
        explanationSteps: [`(${value} - ${b}) ÷ ${a} = ${(value - b) / a}, which ${Number.isInteger((value - b) / a) ? "is" : "is not"} a whole number.`],
        hints: ["Subtract the constant and divide by the coefficient — a whole number means it is in the sequence."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Is (\d+) a term in the sequence with nth term (\d+)n \+ (\d+)\?/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]} est-il un terme de la suite de terme général ${m[2]}n + ${m[3]} ? Réponds vrai si oui.`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Soustrais la constante et divise par le coefficient — un entier signifie qu'il appartient à la suite."]
        };
      }
    },
    declaredVariationSpace: 4000
  })
];

export default level;
