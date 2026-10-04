import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 3 — "Advanced algebraic manipulation"
export const level: QuestionTemplateDef[] = [
  // --- Y9-L3-1: expand products of two binomials ---
  arithmeticTemplate({
    key: "y9l3.expandBinomialsXCoefficient", levelKey: "Y9L3", objectiveCode: "Y9-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["Expand (x + {a})(x + {b}). What is the coefficient of x?", "In the expansion of (x + {a})(x + {b}), what is the coefficient of x?"],
    explain: (v, r) => [`(x + ${v[0]})(x + ${v[1]}) = x² + ${v[0]}x + ${v[1]}x + ${v[0]! * v[1]!}.`, `${v[0]} + ${v[1]} = ${r}, so the x coefficient is ${r}.`],
    hints: () => ["Multiply every term in the first bracket by every term in the second, then collect the x terms."],
    fr: {
      promptTemplates: ["Développe (x + {a})(x + {b}). Quel est le coefficient de x ?", "Dans le développement de (x + {a})(x + {b}), quel est le coefficient de x ?"],
      explain: (v, r) => [`(x + ${v[0]})(x + ${v[1]}) = x² + ${v[0]}x + ${v[1]}x + ${v[0]! * v[1]!}.`, `${v[0]} + ${v[1]} = ${r}, donc le coefficient de x est ${r}.`],
      hints: () => ["Multiplie chaque terme de la première parenthèse par chaque terme de la seconde, puis regroupe les termes en x."]
    },
    declaredVariationSpace: 12 * 12 * 2
  }),
  arithmeticTemplate({
    key: "y9l3.expandBinomialsConstant", levelKey: "Y9L3", objectiveCode: "Y9-L3-1", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["Expand (x + {a})(x + {b}). What is the constant term?", "In the expansion of (x + {a})(x + {b}), what is the number term?"],
    explain: (v, r) => [`The constant comes from ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["The constant term is the product of the two numbers in the brackets."],
    fr: {
      promptTemplates: ["Développe (x + {a})(x + {b}). Quel est le terme constant ?", "Dans le développement de (x + {a})(x + {b}), quel est le terme numérique ?"],
      explain: (v, r) => [`La constante vient de ${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Le terme constant est le produit des deux nombres dans les parenthèses."]
    },
    declaredVariationSpace: 12 * 12 * 2
  }),
  arithmeticTemplate({
    key: "y9l3.expandWithNegative", levelKey: "Y9L3", objectiveCode: "Y9-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPANSION_ERROR", "NEGATIVE_SIGN_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 16], [1, 16]], compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["Expand (x + {a})(x - {b}). What is the coefficient of x?"],
    explain: (v, r) => [`(x + ${v[0]})(x - ${v[1]}) gives ${v[0]}x - ${v[1]}x = ${r}x.`],
    hints: () => ["Watch the sign: subtracting the second number from the first gives the x coefficient."],
    fr: {
      promptTemplates: ["Développe (x + {a})(x - {b}). Quel est le coefficient de x ?"],
      explain: (v, r) => [`(x + ${v[0]})(x - ${v[1]}) donne ${v[0]}x - ${v[1]}x = ${r}x.`],
      hints: () => ["Attention au signe : soustrais le second nombre du premier pour obtenir le coefficient de x."]
    },
    declaredVariationSpace: 16 * 16
  }),
  arithmeticTemplate({
    key: "y9l3.expandSquaredBinomial", levelKey: "Y9L3", objectiveCode: "Y9-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]! * 2,
    promptTemplates: ["Expand (x + {a})². What is the coefficient of x?", "What is the coefficient of x when (x + {a})² is expanded?"],
    explain: (v, r) => [`(x + ${v[0]})² = x² + ${v[0]}x + ${v[0]}x + ${v[0]! * v[0]!}.`, `${v[0]} + ${v[0]} = ${r}.`],
    hints: () => ["Squaring a bracket means multiplying it by itself — the x term appears twice."],
    fr: {
      promptTemplates: ["Développe (x + {a})². Quel est le coefficient de x ?", "Quel est le coefficient de x quand (x + {a})² est développé ?"],
      explain: (v, r) => [`(x + ${v[0]})² = x² + ${v[0]}x + ${v[0]}x + ${v[0]! * v[0]!}.`, `${v[0]} + ${v[0]} = ${r}.`],
      hints: () => ["Élever une parenthèse au carré signifie la multiplier par elle-même — le terme en x apparaît deux fois."]
    },
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y9l3.mcExpandBinomials", levelKey: "Y9L3", objectiveCode: "Y9-L3-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPANSION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 12], [1, 12]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["When (x + {a})(x + {b}) is expanded, what is the constant term?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the two numbers in the brackets."],
    distractorSpread: 8,
    fr: {
      promptTemplates: ["Quand (x + {a})(x + {b}) est développé, quel est le terme constant ?"],
      hints: () => ["Multiplie les deux nombres dans les parenthèses."]
    },
    declaredVariationSpace: 144
  }),

  // --- Y9-L3-2: factorise quadratic expressions ---
  arithmeticTemplate({
    key: "y9l3.factoriseQuadraticLarger", levelKey: "Y9L3", objectiveCode: "Y9-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.max(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Factorise x² + {bCoef}x + {cCoef} into (x + p)(x + q). What is the larger of p and q?"],
    explain: (v, r) => [`Find two numbers that multiply to ${v[0]! * v[1]!} and add to ${v[0]! + v[1]!}: ${v[0]} and ${v[1]}.`, `The larger is ${r}.`],
    hints: () => ["Look for two numbers that multiply to the constant term and add to the x coefficient."],
    fr: {
      promptTemplates: ["Factorise x² + {bCoef}x + {cCoef} sous la forme (x + p)(x + q). Quel est le plus grand de p et q ?"],
      explain: (v, r) => [`Trouve deux nombres dont le produit est ${v[0]! * v[1]!} et la somme ${v[0]! + v[1]!} : ${v[0]} et ${v[1]}.`, `Le plus grand est ${r}.`],
      hints: () => ["Cherche deux nombres dont le produit est le terme constant et la somme le coefficient de x."]
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y9l3.factoriseQuadraticSmaller", levelKey: "Y9L3", objectiveCode: "Y9-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.min(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Factorise x² + {bCoef}x + {cCoef} into (x + p)(x + q). What is the smaller of p and q?"],
    explain: (v, r) => [`Two numbers multiply to ${v[0]! * v[1]!} and add to ${v[0]! + v[1]!}: ${v[0]} and ${v[1]}.`, `The smaller is ${r}.`],
    hints: () => ["Find the factor pair of the constant whose sum is the x coefficient."],
    fr: {
      promptTemplates: ["Factorise x² + {bCoef}x + {cCoef} sous la forme (x + p)(x + q). Quel est le plus petit de p et q ?"],
      explain: (v, r) => [`Deux nombres ont pour produit ${v[0]! * v[1]!} et pour somme ${v[0]! + v[1]!} : ${v[0]} et ${v[1]}.`, `Le plus petit est ${r}.`],
      hints: () => ["Trouve la paire de facteurs de la constante dont la somme est le coefficient de x."]
    },
    declaredVariationSpace: 300
  }),
  categoricalPoolTemplate({
    key: "y9l3.mcFactoriseQuadratic", levelKey: "Y9L3", objectiveCode: "Y9-L3-2", difficulty: "REASONING",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const p = rng.int(1, 10);
      const q = rng.int(1, 10);
      const b = p + q;
      const c = p * q;
      return {
        prompt: `Factorise x² + ${b}x + ${c}.`,
        correctLabel: `(x + ${p})(x + ${q})`,
        distractorLabels: [`(x + ${p + 1})(x + ${q})`, `(x + ${b})(x + ${c})`],
        explanationSteps: [`${p} x ${q} = ${c} and ${p} + ${q} = ${b}.`],
        hints: ["Find two numbers that multiply to the constant and add to the x coefficient."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Factorise (.+)\.$/);
        if (!m) return {};
        return { prompt: `Factorise ${m[1]}.`, hints: ["Trouve deux nombres dont le produit est la constante et la somme le coefficient de x."] };
      }
    },
    declaredVariationSpace: 100
  }),
  arithmeticTemplate({
    key: "y9l3.factoriseDifferenceOfSquares", levelKey: "Y9L3", objectiveCode: "Y9-L3-2", difficulty: "REASONING",
    misconceptionTags: ["FACTORISING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ square: v[0]! * v[0]! }),
    promptTemplates: ["Factorise x² - {square} into (x + n)(x - n). What is n?", "x² - {square} is a difference of two squares. What is n in (x + n)(x - n)?"],
    explain: (v, r) => [`${r} x ${r} = ${v[0]! * v[0]!}, so x² - ${v[0]! * v[0]!} = (x + ${r})(x - ${r}).`],
    hints: () => ["This is a difference of two squares — take the square root of the number."],
    fr: {
      promptTemplates: ["Factorise x² - {square} sous la forme (x + n)(x - n). Que vaut n ?", "x² - {square} est une différence de deux carrés. Que vaut n dans (x + n)(x - n) ?"],
      explain: (v, r) => [`${r} x ${r} = ${v[0]! * v[0]!}, donc x² - ${v[0]! * v[0]!} = (x + ${r})(x - ${r}).`],
      hints: () => ["C'est une différence de deux carrés — prends la racine carrée du nombre."]
    },
    declaredVariationSpace: 98 * 2
  }),
  matchingTemplate({
    key: "y9l3.matchQuadraticToFactors", levelKey: "Y9L3", objectiveCode: "Y9-L3-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      while (pairs.length < 3) {
        const p = rng.int(1, 9);
        const q = rng.int(1, 9);
        const key = `${p * q}:${p + q}`;
        if (used.has(key)) continue;
        used.add(key);
        pairs.push({ left: `x² + ${p + q}x + ${p * q}`, right: `(x + ${p})(x + ${q})` });
      }
      return pairs;
    },
    promptTemplates: ["Match each quadratic to its factorised form."],
    explain: () => ["Find the factor pair of the constant that adds to the x coefficient."],
    hints: () => ["Check by expanding each pair of brackets."],
    fr: {
      promptTemplates: ["Associe chaque expression quadratique à sa forme factorisée."],
      explain: () => ["Trouve la paire de facteurs de la constante dont la somme est le coefficient de x."],
      hints: () => ["Vérifie en développant chaque paire de parenthèses."]
    },
    declaredVariationSpace: 2000
  }),

  // --- Y9-L3-3: rearrange formulae to change the subject ---
  arithmeticTemplate({
    key: "y9l3.rearrangeLinearFormula", levelKey: "Y9L3", objectiveCode: "Y9-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["REARRANGEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ yVal: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["The formula y = {a}x + {b} is rearranged to make x the subject. If y = {yVal}, what is x?"],
    explain: (v, r) => [`x = (y - ${v[1]}) ÷ ${v[0]}.`, `(${v[0]! * v[2]! + v[1]!} - ${v[1]}) ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the constant, then divide by the coefficient."],
    fr: {
      promptTemplates: ["La formule y = {a}x + {b} est transformée pour isoler x. Si y = {yVal}, que vaut x ?"],
      explain: (v, r) => [`x = (y - ${v[1]}) ÷ ${v[0]}.`, `(${v[0]! * v[2]! + v[1]!} - ${v[1]}) ÷ ${v[0]} = ${r}.`],
      hints: () => ["Soustrais la constante, puis divise par le coefficient."]
    },
    declaredVariationSpace: 11 * 20 * 15
  }),
  arithmeticTemplate({
    key: "y9l3.rearrangeAreaFormula", levelKey: "Y9L3", objectiveCode: "Y9-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["REARRANGEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ area: v[0]! * v[1]! }),
    promptTemplates: ["The formula A = bh is rearranged to make h the subject. If A = {area} and b = {a}, what is h?"],
    explain: (v, r) => [`h = A ÷ b.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide both sides by the base to isolate the height."],
    fr: {
      promptTemplates: ["La formule A = bh est transformée pour isoler h. Si A = {area} et b = {a}, que vaut h ?"],
      explain: (v, r) => [`h = A ÷ b.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Divise les deux côtés par la base pour isoler la hauteur."]
    },
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y9l3.rearrangeTwoStepFormula", levelKey: "Y9L3", objectiveCode: "Y9-L3-3", difficulty: "REASONING",
    misconceptionTags: ["REARRANGEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 10], [1, 15], [1, 12]], compute: (v) => v[2]!,
    derive: (v) => ({ pVal: (v[2]! + v[1]!) * v[0]! }),
    promptTemplates: ["P = {a}(q + {b}). If P = {pVal}, what is q?"],
    explain: (v, r) => [`${(v[2]! + v[1]!) * v[0]!} ÷ ${v[0]} = ${v[2]! + v[1]!}.`, `${v[2]! + v[1]!} - ${v[1]} = ${r}.`],
    hints: () => ["Divide by the number outside the bracket first, then subtract."],
    fr: {
      promptTemplates: ["P = {a}(q + {b}). Si P = {pVal}, que vaut q ?"],
      explain: (v, r) => [`${(v[2]! + v[1]!) * v[0]!} ÷ ${v[0]} = ${v[2]! + v[1]!}.`, `${v[2]! + v[1]!} - ${v[1]} = ${r}.`],
      hints: () => ["Divise d'abord par le nombre devant la parenthèse, puis soustrais."]
    },
    declaredVariationSpace: 9 * 15 * 12
  }),
  arithmeticTemplate({
    key: "y9l3.mcRearrangeFormula", levelKey: "Y9L3", objectiveCode: "Y9-L3-3", difficulty: "APPLICATION",
    misconceptionTags: ["REARRANGEMENT_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 12], [1, 20], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ yVal: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["If y = {a}x + {b} and y = {yVal}, what is x?"],
    explain: (v, r) => [`(${v[0]! * v[2]! + v[1]!} - ${v[1]}) ÷ ${v[0]} = ${r}.`],
    hints: () => ["Rearrange to x = (y - b) ÷ a."],
    distractorSpread: 4,
    fr: {
      promptTemplates: ["Si y = {a}x + {b} et y = {yVal}, que vaut x ?"],
      hints: () => ["Transforme en x = (y - b) ÷ a."]
    },
    declaredVariationSpace: 11 * 20 * 15
  }),
  arithmeticTemplate({
    key: "y9l3.rearrangeSpeedFormula", levelKey: "Y9L3", objectiveCode: "Y9-L3-3", difficulty: "REASONING",
    misconceptionTags: ["REARRANGEMENT_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 30], [2, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ distance: v[0]! * v[1]! }),
    promptTemplates: ["The formula distance = speed x time is rearranged to find time. A journey covers {distance} km at {a} km/h. How many hours does it take?"],
    explain: (v, r) => [`time = distance ÷ speed.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the distance by the speed to find the time."],
    fr: {
      promptTemplates: ["La formule distance = vitesse x temps est transformée pour trouver le temps. Un trajet couvre {distance} km à {a} km/h. Combien d'heures prend-il ?"],
      explain: (v, r) => [`temps = distance ÷ vitesse.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Divise la distance par la vitesse pour trouver le temps."]
    },
    declaredVariationSpace: 29 * 19
  })
];

export default level;
