import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 5 — "Equations and inequalities"
const SITUATIONS = ["hiring a bike", "a taxi fare", "a phone tariff", "a gym membership", "a stall at a fair", "a school trip"];
const SITUATIONS_FR = ["la location d'un vélo", "une course en taxi", "un forfait téléphonique", "un abonnement de gym", "un stand à une fête", "une sortie scolaire"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L5-1: linear equations, including unknown on both sides ---
  arithmeticTemplate({
    key: "y8l5.solveTwoStepEquation", levelKey: "Y8L5", objectiveCode: "Y8-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "Solve {a}x + {b} = {c}.",
      "Find x when {a}x + {b} = {c}.",
      "What value of x makes {a}x + {b} = {c} true?"
    ],
    explain: (v, r) => [`Subtract ${v[1]} from both sides: ${v[0]}x = ${v[0]! * v[2]!}.`, `Divide by ${v[0]}: x = ${r}.`],
    hints: () => ["Undo the addition first, then undo the multiplication."],
    fr: {
      promptTemplates: [
        "Résous {a}x + {b} = {c}.",
        "Trouve x quand {a}x + {b} = {c}.",
        "Quelle valeur de x rend {a}x + {b} = {c} vraie ?"
      ],
      explain: (v, r) => [`Retire ${v[1]} des deux côtés : ${v[0]}x = ${v[0]! * v[2]!}.`, `Divise par ${v[0]} : x = ${r}.`],
      hints: () => ["Annule d'abord l'addition, puis la multiplication."]
    },
    declaredVariationSpace: 11 * 30 * 20 * 3
  }),
  arithmeticTemplate({
    key: "y8l5.solveUnknownBothSides", levelKey: "Y8L5", objectiveCode: "Y8-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 14], [1, 12], [1, 20], [1, 30]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[2]!,
    derive: (v) => ({ rhs: (v[0]! - v[1]!) * v[2]! + v[3]! }),
    promptTemplates: [
      "Solve {a}x + {d} = {b}x + {rhs}.",
      "Find x when {a}x + {d} = {b}x + {rhs}."
    ],
    explain: (v, r) => [
      `Subtract ${v[1]}x from both sides: ${v[0]! - v[1]!}x + ${v[3]} = ${(v[0]! - v[1]!) * v[2]! + v[3]!}.`,
      `Subtract ${v[3]}: ${v[0]! - v[1]!}x = ${(v[0]! - v[1]!) * v[2]!}.`,
      `Divide by ${v[0]! - v[1]!}: x = ${r}.`
    ],
    hints: () => ["Move all the x terms to one side first, keeping the equation balanced at every step."],
    fr: {
      promptTemplates: [
        "Résous {a}x + {d} = {b}x + {rhs}.",
        "Trouve x quand {a}x + {d} = {b}x + {rhs}."
      ],
      explain: (v, r) => [
        `Retire ${v[1]}x des deux côtés : ${v[0]! - v[1]!}x + ${v[3]} = ${(v[0]! - v[1]!) * v[2]! + v[3]!}.`,
        `Retire ${v[3]} : ${v[0]! - v[1]!}x = ${(v[0]! - v[1]!) * v[2]!}.`,
        `Divise par ${v[0]! - v[1]!} : x = ${r}.`
      ],
      hints: () => ["Regroupe d'abord tous les termes en x d'un même côté, en gardant l'équation équilibrée à chaque étape."]
    },
    declaredVariationSpace: 12 * 12 * 20 * 30
  }),
  arithmeticTemplate({
    key: "y8l5.solveEquationWithBracket", levelKey: "Y8L5", objectiveCode: "Y8-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPANSION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 20], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ rhs: v[0]! * (v[2]! + v[1]!) }),
    promptTemplates: [
      "Solve {a}(x + {b}) = {rhs}.",
      "Find x when {a}(x + {b}) = {rhs}."
    ],
    explain: (v, r) => [
      `Divide both sides by ${v[0]}: x + ${v[1]} = ${v[2]! + v[1]!}.`,
      `Subtract ${v[1]}: x = ${r}.`
    ],
    hints: () => ["You can either expand the bracket first or divide both sides by the number outside — dividing is usually quicker."],
    fr: {
      promptTemplates: [
        "Résous {a}(x + {b}) = {rhs}.",
        "Trouve x quand {a}(x + {b}) = {rhs}."
      ],
      explain: (v, r) => [
        `Divise les deux côtés par ${v[0]} : x + ${v[1]} = ${v[2]! + v[1]!}.`,
        `Retire ${v[1]} : x = ${r}.`
      ],
      hints: () => ["Tu peux développer la parenthèse ou diviser les deux côtés par le nombre extérieur — diviser est souvent plus rapide."]
    },
    declaredVariationSpace: 11 * 20 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y8l5.solveEquationWithSubtraction", levelKey: "Y8L5", objectiveCode: "Y8-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_SIGN_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! * v[2]! - v[1]! }),
    promptTemplates: [
      "Solve {a}x - {b} = {c}.",
      "Find x when {a}x - {b} = {c}."
    ],
    explain: (v, r) => [`Add ${v[1]} to both sides: ${v[0]}x = ${v[0]! * v[2]!}.`, `Divide by ${v[0]}: x = ${r}.`],
    hints: () => ["The opposite of subtracting is adding — do it to both sides."],
    fr: {
      promptTemplates: [
        "Résous {a}x - {b} = {c}.",
        "Trouve x quand {a}x - {b} = {c}."
      ],
      explain: (v, r) => [`Ajoute ${v[1]} des deux côtés : ${v[0]}x = ${v[0]! * v[2]!}.`, `Divise par ${v[0]} : x = ${r}.`],
      hints: () => ["Le contraire d'une soustraction est une addition — fais-la des deux côtés."]
    },
    declaredVariationSpace: 11 * 30 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y8l5.checkSolutionBySubstituting", levelKey: "Y8L5", objectiveCode: "Y8-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 14], [1, 30], [1, 20]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: [
      "Check a solution: if x = {c}, what does {a}x + {b} equal?",
      "Substitute x = {c} into {a}x + {b}. What is the result?",
      "A student says x = {c} solves an equation. What does {a}x + {b} come to with that value?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Substituting back in is the quickest way to check an answer to an equation."],
    fr: {
      promptTemplates: [
        "Vérifie une solution : si x = {c}, que vaut {a}x + {b} ?",
        "Remplace x par {c} dans {a}x + {b}. Quel est le résultat ?",
        "Un élève dit que x = {c} résout une équation. Que vaut {a}x + {b} avec cette valeur ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Remplacer dans l'équation est le moyen le plus rapide de vérifier une réponse."]
    },
    declaredVariationSpace: 13 * 30 * 20 * 3
  }),

  // --- Y8-L5-2: inequalities and the number line ---
  arithmeticTemplate({
    key: "y8l5.solveInequalityBoundary", levelKey: "Y8L5", objectiveCode: "Y8-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 30], [1, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ c: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "Solve {a}x + {b} > {c}. The answer is x > k. What is k?",
      "Solve the inequality {a}x + {b} < {c}. What is the boundary value of x?",
      "{a}x + {b} ≥ {c} gives x ≥ k. What is k?"
    ],
    explain: (v, r) => [`Treat it like an equation: subtract ${v[1]}, then divide by ${v[0]}.`, `The boundary is x = ${r}.`],
    hints: () => ["Solve it exactly like an equation — the inequality sign only matters if you multiply or divide by a negative."],
    fr: {
      promptTemplates: [
        "Résous {a}x + {b} > {c}. La réponse est x > k. Que vaut k ?",
        "Résous l'inéquation {a}x + {b} < {c}. Quelle est la valeur limite de x ?",
        "{a}x + {b} ≥ {c} donne x ≥ k. Que vaut k ?"
      ],
      explain: (v, r) => [`Traite-la comme une équation : retire ${v[1]}, puis divise par ${v[0]}.`, `La limite est x = ${r}.`],
      hints: () => ["Résous exactement comme une équation — le sens de l'inégalité ne change que si tu multiplies ou divises par un négatif."]
    },
    declaredVariationSpace: 11 * 30 * 20 * 3
  }),
  arithmeticTemplate({
    key: "y8l5.smallestIntegerSolution", levelKey: "Y8L5", objectiveCode: "Y8-L5-2", difficulty: "REASONING",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 30], [1, 20]], compute: (v) => v[2]! + 1,
    derive: (v) => ({ c: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "Solve {a}x + {b} > {c}. What is the smallest whole number value of x that works?",
      "{a}x + {b} > {c}. Give the smallest integer x that satisfies it."
    ],
    explain: (v, r) => [
      `Solving gives x > ${v[2]}.`,
      `${v[2]} itself does not work because the sign is strictly greater than, so the smallest whole number is ${r}.`
    ],
    hints: () => ["Find the boundary first, then ask whether the boundary value itself is allowed."],
    fr: {
      promptTemplates: [
        "Résous {a}x + {b} > {c}. Quel est le plus petit entier x qui convient ?",
        "{a}x + {b} > {c}. Donne le plus petit entier x qui vérifie l'inéquation."
      ],
      explain: (v, r) => [
        `La résolution donne x > ${v[2]}.`,
        `${v[2]} ne convient pas car l'inégalité est stricte, donc le plus petit entier est ${r}.`
      ],
      hints: () => ["Trouve d'abord la limite, puis demande-toi si la valeur limite elle-même est permise."]
    },
    declaredVariationSpace: 11 * 30 * 20 * 2
  }),
  arithmeticTemplate({
    key: "y8l5.countIntegerSolutions", levelKey: "Y8L5", objectiveCode: "Y8-L5-2", difficulty: "REASONING",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "MULTI_STEP",
    ranges: [[-12, 12], [1, 25]], compute: (v) => v[1]!,
    derive: (v) => ({ hi: v[0]! + v[1]! + 1 }),
    promptTemplates: [
      "How many whole numbers x satisfy {a} ≤ x < {hi}?",
      "Count the integers in the solution set {a} ≤ x < {hi}."
    ],
    explain: (v, r) => [
      `The values run from ${v[0]} up to ${v[0]! + v[1]!} inclusive, because ${v[0]! + v[1]! + 1} itself is excluded.`,
      `${v[0]! + v[1]!} - ${v[0]} + 1 = ${r}.`
    ],
    hints: () => ["Watch the signs: ≤ includes the end value and < excludes it. Then count inclusively."],
    fr: {
      promptTemplates: [
        "Combien d'entiers x vérifient {a} ≤ x < {hi} ?",
        "Compte les entiers de l'ensemble solution {a} ≤ x < {hi}."
      ],
      explain: (v, r) => [
        `Les valeurs vont de ${v[0]} à ${v[0]! + v[1]!} inclus, car ${v[0]! + v[1]! + 1} est exclu.`,
        `${v[0]! + v[1]!} - ${v[0]} + 1 = ${r}.`
      ],
      hints: () => ["Attention aux signes : ≤ inclut la valeur limite et < l'exclut. Puis compte en incluant les bornes."]
    },
    declaredVariationSpace: 25 * 25 * 2
  }),
  categoricalPoolTemplate({
    key: "y8l5.mcNumberLineNotation", levelKey: "Y8L5", objectiveCode: "Y8-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { sign: ["x > k", "x ≥ k", "x < k", "x ≤ k"] },
    build: (picked, rng) => {
      const k = rng.int(-15, 20);
      const descriptions: Record<string, string> = {
        "x > k": `an open circle at ${k} with an arrow to the right`,
        "x ≥ k": `a filled circle at ${k} with an arrow to the right`,
        "x < k": `an open circle at ${k} with an arrow to the left`,
        "x ≤ k": `a filled circle at ${k} with an arrow to the left`
      };
      const sign = picked.sign!;
      const labels: Record<string, string> = {
        "x > k": `x > ${k}`, "x ≥ k": `x ≥ ${k}`, "x < k": `x < ${k}`, "x ≤ k": `x ≤ ${k}`
      };
      return {
        prompt: `A number line shows ${descriptions[sign]}. Which inequality does it represent?`,
        correctLabel: labels[sign]!,
        distractorLabels: Object.values(labels).filter((l) => l !== labels[sign]).slice(0, 3),
        explanationSteps: [`A filled circle means the end value is included (≥ or ≤); an open circle means it is not (> or <). The arrow direction gives greater or less than.`],
        hints: ["Filled circle means 'or equal to'; the arrow points towards the values that work."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A number line shows (.+)\. Which inequality does it represent\?$/);
        const descFr = (m ? m[1]! : "")
          .replace(/^an open circle at (-?\d+) with an arrow to the right$/, "un cercle vide en $1 avec une flèche vers la droite")
          .replace(/^a filled circle at (-?\d+) with an arrow to the right$/, "un cercle plein en $1 avec une flèche vers la droite")
          .replace(/^an open circle at (-?\d+) with an arrow to the left$/, "un cercle vide en $1 avec une flèche vers la gauche")
          .replace(/^a filled circle at (-?\d+) with an arrow to the left$/, "un cercle plein en $1 avec une flèche vers la gauche");
        return {
          prompt: `Une droite graduée montre ${descFr}. Quelle inéquation représente-t-elle ?`,
          explanationSteps: ["Un cercle plein signifie que la valeur limite est incluse (≥ ou ≤) ; un cercle vide qu'elle ne l'est pas (> ou <). Le sens de la flèche donne « plus grand » ou « plus petit »."],
          hints: ["Cercle plein veut dire « ou égal à » ; la flèche pointe vers les valeurs qui conviennent."]
        };
      }
    },
    declaredVariationSpace: 4 * 36
  }),
  categoricalPoolTemplate({
    key: "y8l5.tfInequalityClaim", levelKey: "Y8L5", objectiveCode: "Y8-L5-2", difficulty: "REASONING",
    misconceptionTags: ["INEQUALITY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const k = rng.int(2, 25);
      const n = rng.int(2, 25);
      const valid = rng.chance(0.5);
      const validClaims = [
        `x > ${k} has infinitely many whole number solutions`,
        `x ≥ ${k} includes ${k} itself`,
        `${k} < x < ${k + n + 1} has exactly ${n} whole number solutions`,
        `adding ${n} to both sides of an inequality keeps it true`
      ];
      const invalidClaims = [
        `x > ${k} has exactly ${k} whole number solutions`,
        `x > ${k} includes ${k} itself`,
        `${k} < x < ${k + n + 1} has exactly ${n + 2} whole number solutions`,
        `adding ${n} to both sides of an inequality reverses it`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "A strict inequality excludes its boundary but still allows infinitely many values above it, and adding to both sides never changes the direction."
          : "A strict inequality excludes its boundary, counting between two strict bounds leaves out both ends, and adding to both sides never reverses an inequality."],
        hints: ["Only multiplying or dividing by a negative number reverses an inequality sign."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^X > (\d+) has infinitely many whole number solutions$/, "x > $1 a une infinité de solutions entières")
          .replace(/^X > (\d+) has exactly (\d+) whole number solutions$/, "x > $1 a exactement $2 solutions entières")
          .replace(/^X ≥ (\d+) includes (\d+) itself$/, "x ≥ $1 inclut $2 lui-même")
          .replace(/^X > (\d+) includes (\d+) itself$/, "x > $1 inclut $2 lui-même")
          .replace(/^(\d+) < x < (\d+) has exactly (\d+) whole number solutions$/, "$1 < x < $2 a exactement $3 solutions entières")
          .replace(/^Adding (\d+) to both sides of an inequality keeps it true$/, "Ajouter $1 des deux côtés d'une inéquation la laisse vraie")
          .replace(/^Adding (\d+) to both sides of an inequality reverses it$/, "Ajouter $1 des deux côtés d'une inéquation en inverse le sens");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Une inégalité stricte exclut sa borne mais autorise une infinité de valeurs au-delà, et additionner des deux côtés ne change jamais le sens."
            : "Une inégalité stricte exclut sa borne, compter entre deux bornes strictes exclut les deux extrémités, et additionner des deux côtés n'inverse jamais une inégalité."],
          hints: ["Seule la multiplication ou la division par un nombre négatif inverse le sens d'une inégalité."]
        };
      }
    },
    declaredVariationSpace: 2 * 4 * 24 * 24
  }),

  // --- Y8-L5-3: translating situations into algebra ---
  arithmeticTemplate({
    key: "y8l5.formulaFromSituation", levelKey: "Y8L5", objectiveCode: "Y8-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "MULTI_STEP", contextPool: SITUATIONS,
    ranges: [[2, 15], [1, 40], [1, 25]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: [
      "{Ctx} costs a fixed £{b} plus £{a} per hour. What is the total cost for {c} hours, in pounds?",
      "A charge is £{b} to start plus £{a} for each extra unit. What is the charge for {c} units, in pounds?"
    ],
    explain: (v, r) => [`The rule is C = ${v[0]}n + ${v[1]}.`, `${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
    hints: () => ["The fixed charge is the number on its own; the per-unit charge multiplies the number of units."],
    fr: {
      contextPool: SITUATIONS_FR,
      promptTemplates: [
        "{Ctx} coûte un fixe de {b} £ plus {a} £ par heure. Quel est le coût total pour {c} heures, en livres ?",
        "Un tarif est de {b} £ au départ plus {a} £ par unité supplémentaire. Quel est le tarif pour {c} unités, en livres ?"
      ],
      explain: (v, r) => [`La règle est C = ${v[0]}n + ${v[1]}.`, `${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
      hints: () => ["Le montant fixe est le nombre seul ; le tarif par unité multiplie le nombre d'unités."]
    },
    declaredVariationSpace: 14 * 40 * 25
  }),
  arithmeticTemplate({
    key: "y8l5.solveSituationForUnits", levelKey: "Y8L5", objectiveCode: "Y8-L5-3", difficulty: "REASONING",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP", contextPool: SITUATIONS,
    ranges: [[2, 15], [1, 40], [1, 25]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "{Ctx} costs a fixed £{b} plus £{a} per hour. The bill came to £{total}. How many hours was it?",
      "A charge is £{b} plus £{a} per unit, and the total is £{total}. How many units were used?"
    ],
    explain: (v, r) => [
      `Write the equation ${v[0]}n + ${v[1]} = ${v[0]! * v[2]! + v[1]!}.`,
      `Subtract ${v[1]}: ${v[0]}n = ${v[0]! * v[2]!}.`,
      `Divide by ${v[0]}: n = ${r}.`
    ],
    hints: () => ["Turn the words into an equation first, then solve it in the usual way."],
    fr: {
      contextPool: SITUATIONS_FR,
      promptTemplates: [
        "{Ctx} coûte un fixe de {b} £ plus {a} £ par heure. La facture s'élève à {total} £. Combien d'heures cela représente-t-il ?",
        "Un tarif est de {b} £ plus {a} £ par unité, et le total est de {total} £. Combien d'unités ont été utilisées ?"
      ],
      explain: (v, r) => [
        `Écris l'équation ${v[0]}n + ${v[1]} = ${v[0]! * v[2]! + v[1]!}.`,
        `Retire ${v[1]} : ${v[0]}n = ${v[0]! * v[2]!}.`,
        `Divise par ${v[0]} : n = ${r}.`
      ],
      hints: () => ["Transforme d'abord les mots en équation, puis résous-la normalement."]
    },
    declaredVariationSpace: 14 * 40 * 25
  }),
  arithmeticTemplate({
    key: "y8l5.consecutiveNumbersFromSum", levelKey: "Y8L5", objectiveCode: "Y8-L5-3", difficulty: "REASONING",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 200]], compute: (v) => v[0]!,
    derive: (v) => ({ total: 3 * v[0]! + 3 }),
    promptTemplates: [
      "Three consecutive whole numbers add to {total}. What is the smallest of them?",
      "The sum of three consecutive integers is {total}. Find the smallest one.",
      "n, n + 1 and n + 2 add to {total}. What is n?"
    ],
    explain: (v, r) => [
      `Let the smallest be n: n + (n + 1) + (n + 2) = 3n + 3.`,
      `3n + 3 = ${3 * v[0]! + 3}, so 3n = ${3 * v[0]!} and n = ${r}.`
    ],
    hints: () => ["Call the smallest number n and write the other two in terms of it."],
    fr: {
      promptTemplates: [
        "Trois entiers consécutifs ont pour somme {total}. Quel est le plus petit ?",
        "La somme de trois entiers consécutifs est {total}. Trouve le plus petit.",
        "n, n + 1 et n + 2 ont pour somme {total}. Que vaut n ?"
      ],
      explain: (v, r) => [
        `Appelle le plus petit n : n + (n + 1) + (n + 2) = 3n + 3.`,
        `3n + 3 = ${3 * v[0]! + 3}, donc 3n = ${3 * v[0]!} et n = ${r}.`
      ],
      hints: () => ["Appelle le plus petit nombre n et exprime les deux autres en fonction de n."]
    },
    declaredVariationSpace: 200 * 3
  }),
  arithmeticTemplate({
    key: "y8l5.perimeterEquation", levelKey: "Y8L5", objectiveCode: "Y8-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 40], [1, 30]], compute: (v) => v[0]!,
    derive: (v) => ({ perim: 4 * v[0]! + 2 * v[1]!, extra: v[1]! }),
    promptTemplates: [
      "A rectangle is x cm wide and (x + {extra}) cm long. Its perimeter is {perim} cm. What is x?",
      "The perimeter of a rectangle with width x and length x + {extra} is {perim} cm. Find x."
    ],
    explain: (v, r) => [
      `Perimeter = 2(x + x + ${v[1]}) = 4x + ${2 * v[1]!}.`,
      `4x + ${2 * v[1]!} = ${4 * v[0]! + 2 * v[1]!}, so 4x = ${4 * v[0]!} and x = ${r}.`
    ],
    hints: () => ["Write an expression for the perimeter in terms of x, set it equal to the given value and solve."],
    fr: {
      promptTemplates: [
        "Un rectangle a une largeur de x cm et une longueur de (x + {extra}) cm. Son périmètre est de {perim} cm. Que vaut x ?",
        "Le périmètre d'un rectangle de largeur x et de longueur x + {extra} est {perim} cm. Trouve x."
      ],
      explain: (v, r) => [
        `Périmètre = 2(x + x + ${v[1]}) = 4x + ${2 * v[1]!}.`,
        `4x + ${2 * v[1]!} = ${4 * v[0]! + 2 * v[1]!}, donc 4x = ${4 * v[0]!} et x = ${r}.`
      ],
      hints: () => ["Écris une expression du périmètre en fonction de x, rends-la égale à la valeur donnée et résous."]
    },
    declaredVariationSpace: 40 * 30 * 2
  }),
  arithmeticTemplate({
    key: "y8l5.ageProblem", levelKey: "Y8L5", objectiveCode: "Y8-L5-3", difficulty: "REASONING",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP",
    ranges: [[5, 60], [2, 30], [2, 6]], compute: (v) => v[0]!,
    derive: (v) => ({ older: v[1]!, mult: v[2]!, total: v[0]! * (1 + v[2]!) + v[1]! }),
    promptTemplates: [
      "A parent is {mult} times as old as their child plus {older} years. Together their ages total {total}. How old is the child?",
      "One person's age is x; another's is {mult}x + {older}. Their ages add to {total}. What is x?"
    ],
    explain: (v, r) => [
      `x + (${v[2]}x + ${v[1]}) = ${v[2]! + 1}x + ${v[1]}.`,
      `${v[2]! + 1}x + ${v[1]} = ${v[0]! * (1 + v[2]!) + v[1]!}, so ${v[2]! + 1}x = ${v[0]! * (1 + v[2]!)} and x = ${r}.`
    ],
    hints: () => ["Give the unknown age the letter x, write the other age in terms of x, then add them."],
    fr: {
      promptTemplates: [
        "Un parent a {mult} fois l'âge de son enfant plus {older} ans. Ensemble, leurs âges font {total}. Quel âge a l'enfant ?",
        "L'âge d'une personne est x ; celui d'une autre est {mult}x + {older}. Leurs âges totalisent {total}. Que vaut x ?"
      ],
      explain: (v, r) => [
        `x + (${v[2]}x + ${v[1]}) = ${v[2]! + 1}x + ${v[1]}.`,
        `${v[2]! + 1}x + ${v[1]} = ${v[0]! * (1 + v[2]!) + v[1]!}, donc ${v[2]! + 1}x = ${v[0]! * (1 + v[2]!)} et x = ${r}.`
      ],
      hints: () => ["Donne la lettre x à l'âge inconnu, exprime l'autre âge en fonction de x, puis additionne."]
    },
    declaredVariationSpace: 56 * 29 * 5
  })
];

export default level;
