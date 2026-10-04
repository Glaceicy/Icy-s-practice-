import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 4 — "Quadratics and simultaneous equations"
// One template is tagged HIGHER (completing the square), matching the
// Higher-tier extension in objective Y10-L4-1.
export const level: QuestionTemplateDef[] = [
  // --- Y10-L4-1: solve quadratic equations ---
  arithmeticTemplate({
    key: "y10l4.quadraticLargerRoot", levelKey: "Y10L4", objectiveCode: "Y10-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.max(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Solve x² - {bCoef}x + {cCoef} = 0. What is the larger root?"],
    explain: (v, r) => [`(x - ${v[0]})(x - ${v[1]}) = 0 gives roots ${v[0]} and ${v[1]}.`, `The larger is ${r}.`],
    hints: () => ["Factorise, then set each bracket to zero."],
    fr: {
      promptTemplates: ["Résous x² - {bCoef}x + {cCoef} = 0. Quelle est la plus grande racine ?"],
      explain: (v, r) => [`(x - ${v[0]})(x - ${v[1]}) = 0 donne les racines ${v[0]} et ${v[1]}.`, `La plus grande est ${r}.`],
      hints: () => ["Factorise, puis annule chaque parenthèse."]
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y10l4.quadraticSmallerRoot", levelKey: "Y10L4", objectiveCode: "Y10-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], constraint: (v) => v[0]! !== v[1]!,
    compute: (v) => Math.min(v[0]!, v[1]!),
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["Solve x² - {bCoef}x + {cCoef} = 0. What is the smaller root?"],
    explain: (v, r) => [`The roots are ${v[0]} and ${v[1]}; the smaller is ${r}.`],
    hints: () => ["Factorise into two brackets, then solve each."],
    fr: {
      promptTemplates: ["Résous x² - {bCoef}x + {cCoef} = 0. Quelle est la plus petite racine ?"],
      explain: (v, r) => [`Les racines sont ${v[0]} et ${v[1]} ; la plus petite est ${r}.`],
      hints: () => ["Factorise en deux parenthèses, puis résous chacune."]
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y10l4.quadraticFormulaDiscriminant", levelKey: "Y10L4", objectiveCode: "Y10-L4-1", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 6], [1, 25], [1, 20]], compute: (v) => v[1]! * v[1]! - 4 * v[0]! * v[2]!,
    promptTemplates: ["To use the quadratic formula on {a}x² + {b}x + {c} = 0, first find b² - 4ac. What is its value?"],
    explain: (v, r) => [`${v[1]}² - 4 x ${v[0]} x ${v[2]} = ${v[1]! * v[1]!} - ${4 * v[0]! * v[2]!} = ${r}.`],
    hints: () => ["Square b, then subtract 4 times a times c."],
    fr: {
      promptTemplates: ["Pour utiliser la formule quadratique sur {a}x² + {b}x + {c} = 0, calcule d'abord b² - 4ac. Quelle est sa valeur ?"],
      explain: (v, r) => [`${v[1]}² - 4 x ${v[0]} x ${v[2]} = ${v[1]! * v[1]!} - ${4 * v[0]! * v[2]!} = ${r}.`],
      hints: () => ["Élève b au carré, puis soustrais 4 fois a fois c."]
    },
    declaredVariationSpace: 6 * 25 * 20
  }),
  arithmeticTemplate({
    key: "y10l4.completingTheSquare", levelKey: "Y10L4", objectiveCode: "Y10-L4-1", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY", pathway: "HIGHER",
    ranges: [[1, 25], [1, 40]], compute: (v) => v[0]!,
    derive: (v) => ({ bCoef: v[0]! * 2, cCoef: v[1]! }),
    promptTemplates: ["Write x² + {bCoef}x + {cCoef} in the form (x + p)² + q. What is p?"],
    explain: (v, r) => [`p is half the x coefficient: ${v[0]! * 2} ÷ 2 = ${r}.`],
    hints: () => ["p is always half the coefficient of x."],
    fr: {
      promptTemplates: ["Écris x² + {bCoef}x + {cCoef} sous la forme (x + p)² + q. Que vaut p ?"],
      explain: (v, r) => [`p est la moitié du coefficient de x : ${v[0]! * 2} ÷ 2 = ${r}.`],
      hints: () => ["p est toujours la moitié du coefficient de x."]
    },
    declaredVariationSpace: 25 * 40
  }),
  arithmeticTemplate({
    key: "y10l4.quadraticRootSum", levelKey: "Y10L4", objectiveCode: "Y10-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["x² - {bCoef}x + {cCoef} = 0 has two roots. What is their sum?"],
    explain: (v, r) => [`The roots are ${v[0]} and ${v[1]}, which sum to ${r} — the same as the x coefficient.`],
    hints: () => ["For x² - bx + c, the roots always add to b."],
    fr: {
      promptTemplates: ["x² - {bCoef}x + {cCoef} = 0 a deux racines. Quelle est leur somme ?"],
      explain: (v, r) => [`Les racines sont ${v[0]} et ${v[1]}, dont la somme est ${r} — soit le coefficient de x.`],
      hints: () => ["Pour x² - bx + c, la somme des racines vaut toujours b."]
    },
    declaredVariationSpace: 325
  }),
  categoricalPoolTemplate({
    key: "y10l4.mcQuadraticRoots", levelKey: "Y10L4", objectiveCode: "Y10-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_SOLVING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const p = rng.int(1, 15);
      const q = rng.int(1, 15);
      return {
        prompt: `What are the solutions of (x - ${p})(x - ${q}) = 0?`,
        correctLabel: `x = ${p} or x = ${q}`,
        distractorLabels: [`x = ${-p} or x = ${-q}`, `x = ${p + q}`],
        explanationSteps: [`Setting each bracket to zero gives x = ${p} and x = ${q}.`],
        hints: ["If a product is zero, one of the factors must be zero."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What are the solutions of (.+)\?$/);
        if (!m) return {};
        return { prompt: `Quelles sont les solutions de ${m[1]} ?`, hints: ["Si un produit vaut zéro, l'un des facteurs est nul."] };
      }
    },
    declaredVariationSpace: 225
  }),

  // --- Y10-L4-2: simultaneous equations ---
  arithmeticTemplate({
    key: "y10l4.simultaneousEliminationX", levelKey: "Y10L4", objectiveCode: "Y10-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]!,
    derive: (v) => ({ sum: v[0]! + v[1]!, diff: v[0]! - v[1]! }),
    promptTemplates: ["Solve x + y = {sum} and x - y = {diff}. What is x?"],
    explain: (v, r) => [`Adding the equations gives 2x = ${2 * v[0]!}, so x = ${r}.`],
    hints: () => ["Add the two equations to eliminate y."],
    fr: {
      promptTemplates: ["Résous x + y = {sum} et x - y = {diff}. Que vaut x ?"],
      explain: (v, r) => [`En additionnant les équations, 2x = ${2 * v[0]!}, donc x = ${r}.`],
      hints: () => ["Additionne les deux équations pour éliminer y."]
    },
    declaredVariationSpace: 225
  }),
  arithmeticTemplate({
    key: "y10l4.simultaneousEliminationY", levelKey: "Y10L4", objectiveCode: "Y10-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ sum: v[0]! + v[1]!, diff: v[0]! - v[1]! }),
    promptTemplates: ["Solve x + y = {sum} and x - y = {diff}. What is y?"],
    explain: (v, r) => [`Subtracting the equations gives 2y = ${2 * v[1]!}, so y = ${r}.`],
    hints: () => ["Subtract the second equation from the first to eliminate x."],
    fr: {
      promptTemplates: ["Résous x + y = {sum} et x - y = {diff}. Que vaut y ?"],
      explain: (v, r) => [`En soustrayant les équations, 2y = ${2 * v[1]!}, donc y = ${r}.`],
      hints: () => ["Soustrais la seconde équation de la première pour éliminer x."]
    },
    declaredVariationSpace: 225
  }),
  arithmeticTemplate({
    key: "y10l4.simultaneousWithCoefficients", levelKey: "Y10L4", objectiveCode: "Y10-L4-2", difficulty: "REASONING",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12], [2, 7]], compute: (v) => v[0]!,
    derive: (v) => ({ eq1: v[0]! * v[2]! + v[1]!, eq2: v[0]! + v[1]!, coef: v[2]! }),
    promptTemplates: ["Solve {coef}x + y = {eq1} and x + y = {eq2}. What is x?"],
    explain: (v, r) => [`Subtracting gives ${v[2]! - 1}x = ${(v[2]! - 1) * v[0]!}.`, `x = ${r}.`],
    hints: () => ["Subtract one equation from the other to remove y."],
    fr: {
      promptTemplates: ["Résous {coef}x + y = {eq1} et x + y = {eq2}. Que vaut x ?"],
      explain: (v, r) => [`La soustraction donne ${v[2]! - 1}x = ${(v[2]! - 1) * v[0]!}.`, `x = ${r}.`],
      hints: () => ["Soustrais une équation de l'autre pour éliminer y."]
    },
    declaredVariationSpace: 12 * 12 * 6
  }),
  arithmeticTemplate({
    key: "y10l4.wordProblemSimultaneous", levelKey: "Y10L4", objectiveCode: "Y10-L4-2", difficulty: "REASONING",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 20], [1, 20], [2, 9]], constraint: (v) => v[0]! > v[1]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ total: v[0]! + v[1]!, difference: v[0]! - v[1]!, price: v[2]! }),
    promptTemplates: ["Two types of ticket total {total} sales, and {difference} more of the first type were sold than the second. How many of the first type were sold?"],
    explain: (v, r) => [`x + y = ${v[0]! + v[1]!} and x - y = ${v[0]! - v[1]!}.`, `Adding gives 2x = ${2 * v[0]!}, so x = ${r}.`],
    hints: () => ["Write two equations from the total and the difference, then add them."],
    fr: {
      promptTemplates: ["Deux types de billets totalisent {total} ventes, et il s'est vendu {difference} de plus du premier type que du second. Combien du premier type ont été vendus ?"],
      explain: (v, r) => [`x + y = ${v[0]! + v[1]!} et x - y = ${v[0]! - v[1]!}.`, `L'addition donne 2x = ${2 * v[0]!}, donc x = ${r}.`],
      hints: () => ["Écris deux équations à partir du total et de la différence, puis additionne-les."]
    },
    declaredVariationSpace: 190 * 8
  }),
  arithmeticTemplate({
    key: "y10l4.mcSimultaneous", levelKey: "Y10L4", objectiveCode: "Y10-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["SIMULTANEOUS_EQUATION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]!,
    derive: (v) => ({ sum: v[0]! + v[1]!, diff: v[0]! - v[1]! }),
    promptTemplates: ["If x + y = {sum} and x - y = {diff}, what is x?"],
    explain: (v, r) => [`x = ${r}.`],
    hints: () => ["Add the equations together."],
    distractorSpread: 5,
    fr: {
      promptTemplates: ["Si x + y = {sum} et x - y = {diff}, que vaut x ?"],
      hints: () => ["Additionne les équations."]
    },
    declaredVariationSpace: 225
  }),

  // --- Y10-L4-3: approximate solutions from a graph ---
  arithmeticTemplate({
    key: "y10l4.graphSolutionLinear", levelKey: "Y10L4", objectiveCode: "Y10-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["GRAPH_SOLUTION_ERROR"], type: "GRAPH_INTERPRETATION",
    ranges: [[2, 12], [1, 25], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ yVal: v[0]! * v[2]! + v[1]! }),
    promptTemplates: ["The graph of y = {a}x + {b} is drawn. At what x value does the graph reach y = {yVal}?"],
    explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Read across from the y value to the line, then down to the x axis — or solve the equation."],
    visualAid: (v) => visuals.graph("line", [{ label: "0", value: v[1]! }, { label: String(v[2]!), value: v[0]! * v[2]! + v[1]! }]),
    fr: {
      promptTemplates: ["Le graphique de y = {a}x + {b} est tracé. Pour quelle valeur de x le graphique atteint-il y = {yVal} ?"],
      explain: (v, r) => [`${v[0]! * v[2]! + v[1]!} - ${v[1]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Lis horizontalement depuis y jusqu'à la droite, puis descends vers l'axe des x — ou résous l'équation."]
    },
    declaredVariationSpace: 11 * 25 * 20
  }),
  arithmeticTemplate({
    key: "y10l4.quadraticGraphValue", levelKey: "Y10L4", objectiveCode: "Y10-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["GRAPH_SOLUTION_ERROR"], type: "GRAPH_INTERPRETATION",
    ranges: [[1, 12], [0, 20], [1, 10]], compute: (v) => v[2]! * v[2]! + v[0]! * v[2]! + v[1]!,
    promptTemplates: ["From the graph of y = x² + {a}x + {b}, what is y when x = {c}?"],
    explain: (v, r) => [`${v[2]}² + ${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the x value into the equation to check the graph reading."],
    fr: {
      promptTemplates: ["D'après le graphique de y = x² + {a}x + {b}, que vaut y quand x = {c} ?"],
      explain: (v, r) => [`${v[2]}² + ${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace x dans l'équation pour vérifier la lecture du graphique."]
    },
    declaredVariationSpace: 12 * 21 * 10
  }),
  matchingTemplate({
    key: "y10l4.matchEquationsToRoots", levelKey: "Y10L4", objectiveCode: "Y10-L4-3", difficulty: "REASONING",
    misconceptionTags: ["GRAPH_SOLUTION_ERROR"],
    generatePairs: (rng) => {
      const used = new Set<string>();
      const pairs: Array<{ left: string; right: string }> = [];
      let guard = 0;
      while (pairs.length < 3 && guard < 60) {
        guard++;
        const p = rng.int(1, 12);
        const q = rng.int(1, 12);
        const key = `${p + q}:${p * q}`;
        if (used.has(key)) continue;
        used.add(key);
        pairs.push({ left: `y = x² - ${p + q}x + ${p * q}`, right: `crosses at x = ${Math.min(p, q)} and x = ${Math.max(p, q)}` });
      }
      return pairs;
    },
    promptTemplates: ["Match each quadratic graph to where it crosses the x-axis."],
    explain: () => ["The curve crosses the x-axis at the roots of the equation."],
    hints: () => ["Factorise each quadratic to find its roots."],
    fr: {
      promptTemplates: ["Associe chaque courbe quadratique aux points où elle coupe l'axe des abscisses."],
      explain: () => ["La courbe coupe l'axe des abscisses aux racines de l'équation."],
      hints: () => ["Factorise chaque expression pour trouver ses racines."],
      translatePairs: (pairs) => pairs.map((p) => ({
        left: p.left,
        right: p.right.replace(/^crosses at x = (\d+) and x = (\d+)$/, "coupe en x = $1 et x = $2")
      }))
    },
    declaredVariationSpace: 4000
  }),
  categoricalPoolTemplate({
    key: "y10l4.tfGraphSolution", levelKey: "Y10L4", objectiveCode: "Y10-L4-3", difficulty: "REASONING",
    misconceptionTags: ["GRAPH_SOLUTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(2, 12);
      const b = rng.int(0, 25);
      const x = rng.int(1, 20);
      const correctY = a * x + b;
      const showTrue = rng.chance(0.5);
      const shownY = showTrue ? correctY : correctY + rng.int(1, 10);
      return {
        prompt: `The graph of y = ${a}x + ${b} passes through the point (${x}, ${shownY}). True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${a} x ${x} + ${b} = ${correctY}.`],
        hints: ["Substitute the x value and see whether you get the y value shown."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^The graph of y = (\d+)x \+ (\d+) passes through the point \((\d+), (\d+)\)\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Le graphique de y = ${m[1]}x + ${m[2]} passe par le point (${m[3]}, ${m[4]}). Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Remplace x et vérifie si tu obtiens la valeur de y indiquée."]
        };
      }
    },
    declaredVariationSpace: 5000
  })
];

export default level;
