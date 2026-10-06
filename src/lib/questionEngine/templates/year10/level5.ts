import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 5 — "Graphs, functions and graphical interpretation"
const CONTEXTS = ["a delivery van", "a water tank", "a phone tariff", "a gym membership", "a taxi fare", "a savings plan", "a hire charge", "a power meter"];
const CONTEXTS_FR = ["une camionnette de livraison", "un réservoir d'eau", "un forfait téléphonique", "un abonnement de gym", "une course en taxi", "un plan d'épargne", "un tarif de location", "un compteur électrique"];

export const level: QuestionTemplateDef[] = [
  // --- Y10-L5-1: plot and interpret linear, quadratic and cubic graphs ---
  arithmeticTemplate({
    key: "y10l5.linearGraphValue", levelKey: "Y10L5", objectiveCode: "Y10-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["GRAPH_PLOTTING_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: CONTEXTS,
    ranges: [[2, 15], [0, 30], [1, 20]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: [
      "On the graph of y = {a}x + {b}, what is y when x = {c}?",
      "For {ctx}, cost follows y = {a}x + {b}. What is y when x = {c}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the x value into the equation."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: [
        "Sur le graphique de y = {a}x + {b}, que vaut y quand x = {c} ?",
        "Pour {ctx}, le coût suit y = {a}x + {b}. Que vaut y quand x = {c} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[2]} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace x par sa valeur dans l'équation."]
    },
    declaredVariationSpace: 14 * 31 * 20 * (1 + CONTEXTS.length)
  }),
  arithmeticTemplate({
    key: "y10l5.quadraticGraphValue", levelKey: "Y10L5", objectiveCode: "Y10-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["GRAPH_PLOTTING_ERROR"], type: "GRAPH_INTERPRETATION",
    ranges: [[1, 12], [0, 25], [1, 12]], compute: (v) => v[2]! * v[2]! + v[0]! * v[2]! + v[1]!,
    promptTemplates: ["On the curve y = x² + {a}x + {b}, what is y when x = {c}?"],
    explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}, plus ${v[0]! * v[2]!}, plus ${v[1]} = ${r}.`],
    hints: () => ["Square the x value first, then add the remaining terms."],
    fr: {
      promptTemplates: ["Sur la courbe y = x² + {a}x + {b}, que vaut y quand x = {c} ?"],
      explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}, plus ${v[0]! * v[2]!}, plus ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord x au carré, puis ajoute les autres termes."]
    },
    declaredVariationSpace: 12 * 26 * 12
  }),
  arithmeticTemplate({
    key: "y10l5.cubicGraphValue", levelKey: "Y10L5", objectiveCode: "Y10-L5-1", difficulty: "REASONING",
    misconceptionTags: ["GRAPH_PLOTTING_ERROR"], type: "GRAPH_INTERPRETATION",
    ranges: [[1, 8], [0, 25], [1, 8]], compute: (v) => v[2]! * v[2]! * v[2]! + v[0]! * v[2]! + v[1]!,
    promptTemplates: ["On the curve y = x³ + {a}x + {b}, what is y when x = {c}?"],
    explain: (v, r) => [`${v[2]}³ = ${v[2]! * v[2]! * v[2]!}.`, `${v[2]! * v[2]! * v[2]!} + ${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Cube the x value first — that means multiplying it by itself three times."],
    fr: {
      promptTemplates: ["Sur la courbe y = x³ + {a}x + {b}, que vaut y quand x = {c} ?"],
      explain: (v, r) => [`${v[2]}³ = ${v[2]! * v[2]! * v[2]!}.`, `${v[2]! * v[2]! * v[2]!} + ${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord x au cube — multiplie-le trois fois par lui-même."]
    },
    declaredVariationSpace: 8 * 26 * 8
  }),
  arithmeticTemplate({
    key: "y10l5.yInterceptOfLine", levelKey: "Y10L5", objectiveCode: "Y10-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY", contextPool: CONTEXTS,
    ranges: [[2, 15], [0, 40]], compute: (v) => v[1]!,
    promptTemplates: [
      "Where does the line y = {a}x + {b} cross the y-axis?",
      "For {ctx}, the rule is y = {a}x + {b}. What is the fixed starting charge (the y-intercept)?"
    ],
    explain: (v, r) => [`In y = mx + c, the intercept is c = ${r}.`],
    hints: () => ["The y-intercept is the constant term."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: [
        "Où la droite y = {a}x + {b} coupe-t-elle l'axe des ordonnées ?",
        "Pour {ctx}, la règle est y = {a}x + {b}. Quel est le montant fixe de départ (l'ordonnée à l'origine) ?"
      ],
      explain: (v, r) => [`Dans y = mx + c, l'ordonnée à l'origine est c = ${r}.`],
      hints: () => ["L'ordonnée à l'origine est le terme constant."]
    },
    declaredVariationSpace: 14 * 41 * (1 + CONTEXTS.length)
  }),
  categoricalPoolTemplate({
    key: "y10l5.mcGraphShape", levelKey: "Y10L5", objectiveCode: "Y10-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["GRAPH_PLOTTING_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["linear", "quadratic", "cubic"] },
    build: (picked, rng) => {
      const a = rng.int(1, 12);
      const b = rng.int(0, 25);
      const shapes: Record<string, string> = { linear: "a straight line", quadratic: "a parabola", cubic: "an S-shaped curve" };
      const equations: Record<string, string> = { linear: `y = ${a}x + ${b}`, quadratic: `y = ${a}x² + ${b}`, cubic: `y = ${a}x³ + ${b}` };
      const correct = shapes[picked.kind!]!;
      return {
        prompt: `What shape is the graph of ${equations[picked.kind!]}?`,
        correctLabel: correct,
        distractorLabels: Object.values(shapes).filter((s) => s !== correct),
        explanationSteps: [`${equations[picked.kind!]} is a ${picked.kind} function, which gives ${correct}.`],
        hints: ["Look at the highest power of x: 1 gives a line, 2 a parabola, 3 an S-shaped curve."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const shapesFr: Record<string, string> = { "a straight line": "une droite", "a parabola": "une parabole", "an S-shaped curve": "une courbe en S" };
        const m = drawn.prompt.match(/^What shape is the graph of (.+)\?$/);
        void picked;
        return {
          prompt: `Quelle est la forme du graphique de ${m ? m[1] : ""} ?`,
          correctLabel: shapesFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => shapesFr[d] ?? d),
          hints: ["Regarde la plus haute puissance de x : 1 donne une droite, 2 une parabole, 3 une courbe en S."]
        };
      }
    },
    declaredVariationSpace: 900
  }),

  // --- Y10-L5-2: gradient as a rate of change ---
  arithmeticTemplate({
    key: "y10l5.gradientFromTwoPoints", levelKey: "Y10L5", objectiveCode: "Y10-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 12], [1, 15]], compute: (v) => v[2]!,
    derive: (v) => ({ x2: v[0]! + v[1]!, y1: v[0]! * 2, y2: v[0]! * 2 + v[1]! * v[2]! }),
    promptTemplates: ["A straight line passes through ({a}, {y1}) and ({x2}, {y2}). What is its gradient?"],
    explain: (v, r) => [`Change in y = ${v[1]! * v[2]!}, change in x = ${v[1]}.`, `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Gradient = change in y ÷ change in x."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[0]! * 2], [v[0]! + v[1]!, v[0]! * 2 + v[1]! * v[2]!]]),
    fr: {
      promptTemplates: ["Une droite passe par ({a}, {y1}) et ({x2}, {y2}). Quel est son coefficient directeur ?"],
      explain: (v, r) => [`Variation de y = ${v[1]! * v[2]!}, variation de x = ${v[1]}.`, `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Coefficient directeur = variation de y ÷ variation de x."]
    },
    declaredVariationSpace: 15 * 12 * 15
  }),
  arithmeticTemplate({
    key: "y10l5.rateOfChangeContext", levelKey: "Y10L5", objectiveCode: "Y10-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "WORD_PROBLEM", contextPool: CONTEXTS,
    ranges: [[2, 40], [2, 15]], compute: (v) => v[0]!,
    derive: (v) => ({ change: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: ["On a graph for {ctx}, the value rises by {change} units over {time} hours. What is the rate of change, in units per hour?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide the change in value by the change in time."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: ["Sur un graphique pour {ctx}, la valeur augmente de {change} unités en {time} heures. Quel est le taux de variation, en unités par heure ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Divise la variation de valeur par la variation de temps."]
    },
    declaredVariationSpace: 39 * 14 * CONTEXTS.length
  }),
  arithmeticTemplate({
    key: "y10l5.gradientFromEquation", levelKey: "Y10L5", objectiveCode: "Y10-L5-2", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY", contextPool: CONTEXTS,
    ranges: [[2, 25], [0, 40]], compute: (v) => v[0]!,
    promptTemplates: [
      "What is the gradient of the line y = {a}x + {b}?",
      "For {ctx}, the cost rule is y = {a}x + {b}. What is the rate per unit (the gradient)?"
    ],
    explain: (v, r) => [`The gradient is the coefficient of x: ${r}.`],
    hints: () => ["In y = mx + c, m is the gradient."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: [
        "Quel est le coefficient directeur de la droite y = {a}x + {b} ?",
        "Pour {ctx}, la règle de coût est y = {a}x + {b}. Quel est le tarif par unité (le coefficient directeur) ?"
      ],
      explain: (v, r) => [`Le coefficient directeur est le coefficient de x : ${r}.`],
      hints: () => ["Dans y = mx + c, m est le coefficient directeur."]
    },
    declaredVariationSpace: 24 * 41 * (1 + CONTEXTS.length)
  }),
  arithmeticTemplate({
    key: "y10l5.totalCostFromGraphRule", levelKey: "Y10L5", objectiveCode: "Y10-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "WORD_PROBLEM", contextPool: CONTEXTS,
    ranges: [[2, 20], [5, 50], [1, 25]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: ["{Ctx} charges a fixed fee of £{b} plus £{a} per unit. What is the total cost for {c} units, in pounds?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["The fixed fee is the intercept; the rate per unit is the gradient."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: ["{Ctx} facture des frais fixes de £{b} plus £{a} par unité. Quel est le coût total pour {c} unités, en livres ?"],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Les frais fixes sont l'ordonnée à l'origine ; le tarif par unité est le coefficient directeur."]
    },
    declaredVariationSpace: 19 * 46 * 25 * CONTEXTS.length
  }),
  categoricalPoolTemplate({
    key: "y10l5.tfGradientMeaning", levelKey: "Y10L5", objectiveCode: "Y10-L5-2", difficulty: "REASONING",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const rate = rng.int(2, 30);
      const hours = rng.int(2, 12);
      const change = rate * hours;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? rate : rate + rng.int(1, 8);
      return {
        prompt: `A graph rises by ${change} units over ${hours} hours, so its gradient is ${shown} units per hour. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${change} ÷ ${hours} = ${rate}.`],
        hints: ["Gradient = change in value ÷ change in time."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A graph rises by (\d+) units over (\d+) hours, so its gradient is (\d+) units per hour\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un graphique monte de ${m[1]} unités en ${m[2]} heures, donc son coefficient directeur est de ${m[3]} unités par heure. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Coefficient directeur = variation de valeur ÷ variation de temps."]
        };
      }
    },
    declaredVariationSpace: 2000
  }),

  // --- Y10-L5-3: graphs of direct and inverse proportion ---
  arithmeticTemplate({
    key: "y10l5.directProportionGraphValue", levelKey: "Y10L5", objectiveCode: "Y10-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: CONTEXTS,
    ranges: [[2, 20], [1, 25]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A direct proportion graph through the origin has gradient {a}. What is y when x = {b}?",
      "For {ctx}, y is directly proportional to x with constant {a}. What is y when x = {b}?"
    ],
    explain: (v, r) => [`y = kx = ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Direct proportion graphs pass through the origin, so y = kx."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: [
        "Un graphique de proportionnalité directe passant par l'origine a un coefficient directeur de {a}. Que vaut y quand x = {b} ?",
        "Pour {ctx}, y est directement proportionnel à x avec une constante de {a}. Que vaut y quand x = {b} ?"
      ],
      explain: (v, r) => [`y = kx = ${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Les graphiques de proportionnalité directe passent par l'origine, donc y = kx."]
    },
    declaredVariationSpace: 19 * 25 * (1 + CONTEXTS.length)
  }),
  arithmeticTemplate({
    key: "y10l5.inverseProportionGraphValue", levelKey: "Y10L5", objectiveCode: "Y10-L5-3", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ERROR"], type: "GRAPH_INTERPRETATION", contextPool: CONTEXTS,
    ranges: [[2, 20], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ k: v[0]! * v[1]!, xVal: v[1]! }),
    promptTemplates: [
      "For an inverse proportion graph with y = k/x where k = {k}, what is y when x = {xVal}?",
      "For {ctx}, y = k/x with k = {k}. What is y when x = {xVal}?"
    ],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["In inverse proportion, multiply x and y to get the constant — so y = k ÷ x."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: [
        "Pour un graphique de proportionnalité inverse y = k/x avec k = {k}, que vaut y quand x = {xVal} ?",
        "Pour {ctx}, y = k/x avec k = {k}. Que vaut y quand x = {xVal} ?"
      ],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["En proportionnalité inverse, le produit de x et y donne la constante — donc y = k ÷ x."]
    },
    declaredVariationSpace: 19 * 11 * (1 + CONTEXTS.length)
  }),
  arithmeticTemplate({
    key: "y10l5.proportionConstantFromGraph", levelKey: "Y10L5", objectiveCode: "Y10-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "NUMBER_ENTRY", contextPool: CONTEXTS,
    ranges: [[2, 25], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ yVal: v[0]! * v[1]!, xVal: v[1]! }),
    promptTemplates: [
      "A direct proportion graph passes through ({xVal}, {yVal}). What is the constant of proportionality?",
      "For {ctx}, a proportion graph passes through ({xVal}, {yVal}). What is the constant?"
    ],
    explain: (v, r) => [`k = y ÷ x = ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Divide the y value by the x value."],
    fr: {
      contextPool: CONTEXTS_FR,
      promptTemplates: [
        "Un graphique de proportionnalité directe passe par ({xVal}, {yVal}). Quelle est la constante de proportionnalité ?",
        "Pour {ctx}, un graphique de proportionnalité passe par ({xVal}, {yVal}). Quelle est la constante ?"
      ],
      explain: (v, r) => [`k = y ÷ x = ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Divise la valeur de y par celle de x."]
    },
    declaredVariationSpace: 24 * 19 * (1 + CONTEXTS.length)
  }),
  matchingTemplate({
    key: "y10l5.matchGraphsToTypes", levelKey: "Y10L5", objectiveCode: "Y10-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"],
    generatePairs: (rng) => {
      const k = rng.int(2, 30);
      const m = rng.int(2, 20);
      const c = rng.int(1, 25);
      const all = [
        { left: `y = ${k}x`, right: "direct proportion through the origin" },
        { left: `y = ${k}/x`, right: "inverse proportion, a curve" },
        { left: `y = ${m}x + ${c}`, right: "a straight line not through the origin" },
        { left: `y = ${m}x² + ${c}`, right: "a parabola" }
      ];
      return rng.shuffle(all).slice(0, 3);
    },
    promptTemplates: ["Match each equation to the kind of graph it produces."],
    explain: () => ["Direct proportion passes through the origin; inverse proportion is a curve; a constant term lifts a line off the origin."],
    hints: () => ["Check whether the graph passes through (0, 0)."],
    fr: {
      promptTemplates: ["Associe chaque équation au type de graphique qu'elle produit."],
      explain: () => ["La proportionnalité directe passe par l'origine ; l'inverse donne une courbe ; un terme constant décale la droite."],
      hints: () => ["Vérifie si le graphique passe par (0, 0)."],
      translatePairs: (pairs) => pairs.map((p) => {
        const map: Record<string, string> = {
          "direct proportion through the origin": "proportionnalité directe passant par l'origine",
          "inverse proportion, a curve": "proportionnalité inverse, une courbe",
          "a straight line not through the origin": "une droite ne passant pas par l'origine",
          "a parabola": "une parabole"
        };
        return { left: p.left, right: map[p.right] ?? p.right };
      })
    },
    declaredVariationSpace: 4000
  }),
  categoricalPoolTemplate({
    key: "y10l5.tfProportionGraph", levelKey: "Y10L5", objectiveCode: "Y10-L5-3", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const k = rng.int(2, 30);
      const x = rng.int(2, 20);
      const isDirect = rng.chance(0.5);
      const claimOrigin = rng.chance(0.5);
      const equation = isDirect ? `y = ${k}x` : `y = ${k}x + ${rng.int(1, 20)}`;
      const claimIsCorrect = claimOrigin === isDirect;
      void x;
      return {
        prompt: `The graph of ${equation} ${claimOrigin ? "passes" : "does not pass"} through the origin. True or false?`,
        correctLabel: claimIsCorrect ? "True" : "False",
        distractorLabels: [claimIsCorrect ? "False" : "True"],
        explanationSteps: [isDirect ? "With no constant term, the graph passes through (0, 0)." : "The constant term lifts the graph away from the origin."],
        hints: ["Substitute x = 0 and see whether y comes out as 0."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^The graph of (.+?) (passes|does not pass) through the origin\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        const claimFr = m[2] === "passes" ? "passe" : "ne passe pas";
        return {
          prompt: `Le graphique de ${m[1]} ${claimFr} par l'origine. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Remplace x par 0 et vois si y vaut 0."]
        };
      }
    },
    declaredVariationSpace: 2000
  })
];

export default level;
