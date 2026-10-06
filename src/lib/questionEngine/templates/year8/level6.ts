import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 6 — "Sequences and straight-line graphs"
const PATTERNS = ["a pattern of tiles", "a tower of cubes", "a row of matchsticks", "a chain of beads", "a border of bricks", "a line of counters"];
const PATTERNS_FR = ["un motif de carreaux", "une tour de cubes", "une rangée d'allumettes", "un collier de perles", "une bordure de briques", "une ligne de jetons"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L6-1: nth term of linear and quadratic sequences ---
  arithmeticTemplate({
    key: "y8l6.commonDifference", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["SEQUENCE_NTH_TERM_ERROR"], type: "NUMBER_ENTRY", contextPool: PATTERNS,
    ranges: [[1, 40], [2, 15]], compute: (v) => v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + 2 * v[1]!, t4: v[0]! + 3 * v[1]! }),
    promptTemplates: [
      "A sequence starts {t1}, {t2}, {t3}, {t4}, ... What is the common difference?",
      "{Ctx} grows as {t1}, {t2}, {t3}, {t4}, ... How much is added each time?"
    ],
    explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`, `The same amount is added every time, so the common difference is ${r}.`],
    hints: () => ["Subtract any term from the one after it."],
    fr: {
      contextPool: PATTERNS_FR,
      promptTemplates: [
        "Une suite commence par {t1}, {t2}, {t3}, {t4}, ... Quelle est la raison ?",
        "{Ctx} évolue en {t1}, {t2}, {t3}, {t4}, ... Combien ajoute-t-on à chaque fois ?"
      ],
      explain: (v, r) => [`${v[0]! + v[1]!} - ${v[0]} = ${r}.`, `On ajoute toujours la même quantité, donc la raison est ${r}.`],
      hints: () => ["Soustrais un terme de celui qui le suit."]
    },
    declaredVariationSpace: 40 * 14 * (1 + PATTERNS.length)
  }),
  arithmeticTemplate({
    key: "y8l6.nthTermCoefficient", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_NTH_TERM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 40], [2, 15]], compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + 2 * v[1]!, diff: v[1]! }),
    promptTemplates: [
      "A sequence starts {t1}, {t2}, {t3}, ... Its nth term is {diff}n + k. What is k?",
      "The nth term of {t1}, {t2}, {t3}, ... has the form {diff}n + k. Find k."
    ],
    explain: (v, r) => [
      `The common difference is ${v[1]}, so the rule starts ${v[1]}n.`,
      `${v[1]} x 1 = ${v[1]}, but the first term is ${v[0]}, so k = ${v[0]} - ${v[1]} = ${r}.`
    ],
    hints: () => ["Work out what the rule gives for n = 1, then adjust it to match the first term."],
    fr: {
      promptTemplates: [
        "Une suite commence par {t1}, {t2}, {t3}, ... Son terme de rang n est {diff}n + k. Que vaut k ?",
        "Le terme de rang n de {t1}, {t2}, {t3}, ... a la forme {diff}n + k. Trouve k."
      ],
      explain: (v, r) => [
        `La raison est ${v[1]}, donc la règle commence par ${v[1]}n.`,
        `${v[1]} x 1 = ${v[1]}, mais le premier terme est ${v[0]}, donc k = ${v[0]} - ${v[1]} = ${r}.`
      ],
      hints: () => ["Calcule ce que donne la règle pour n = 1, puis ajuste pour retrouver le premier terme."]
    },
    declaredVariationSpace: 40 * 14 * 2
  }),
  arithmeticTemplate({
    key: "y8l6.nthTermValue", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["SEQUENCE_NTH_TERM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 25], [2, 12], [10, 80]], compute: (v) => v[0]! + (v[2]! - 1) * v[1]!,
    derive: (v) => ({ t1: v[0]!, t2: v[0]! + v[1]!, t3: v[0]! + 2 * v[1]! }),
    promptTemplates: [
      "A sequence starts {t1}, {t2}, {t3}, ... What is the {c}th term?",
      "Find term number {c} of the linear sequence {t1}, {t2}, {t3}, ..."
    ],
    explain: (v, r) => [
      `The difference is ${v[1]}, so the nth term is ${v[1]}n + ${v[0]! - v[1]!}.`,
      `${v[1]} x ${v[2]} + ${v[0]! - v[1]!} = ${r}.`
    ],
    hints: () => ["Find the nth-term rule first, then substitute — much faster than listing every term."],
    fr: {
      promptTemplates: [
        "Une suite commence par {t1}, {t2}, {t3}, ... Quel est le terme de rang {c} ?",
        "Trouve le terme numéro {c} de la suite arithmétique {t1}, {t2}, {t3}, ..."
      ],
      explain: (v, r) => [
        `La raison est ${v[1]}, donc le terme de rang n est ${v[1]}n + ${v[0]! - v[1]!}.`,
        `${v[1]} x ${v[2]} + ${v[0]! - v[1]!} = ${r}.`
      ],
      hints: () => ["Trouve d'abord la formule du terme de rang n, puis remplace — bien plus rapide que de lister tous les termes."]
    },
    declaredVariationSpace: 25 * 11 * 71
  }),
  arithmeticTemplate({
    key: "y8l6.quadraticSecondDifference", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "REASONING",
    misconceptionTags: ["SEQUENCE_NTH_TERM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 12], [0, 20]], compute: (v) => v[0]!,
    derive: (v) => ({
      t1: v[0]! + v[1]!,
      t2: 4 * v[0]! + v[1]!,
      t3: 9 * v[0]! + v[1]!,
      t4: 16 * v[0]! + v[1]!,
      second: 2 * v[0]!
    }),
    promptTemplates: [
      "A quadratic sequence starts {t1}, {t2}, {t3}, {t4}, ... Its second difference is {second}. What is the coefficient of n² in the nth term?",
      "The second difference of {t1}, {t2}, {t3}, {t4}, ... is {second}. What number multiplies n² in the rule?"
    ],
    explain: (v, r) => [
      `The second difference is ${2 * v[0]!}.`,
      `Half of the second difference gives the n² coefficient: ${2 * v[0]!} ÷ 2 = ${r}.`
    ],
    hints: () => ["Halve the second difference to get the number in front of n²."],
    fr: {
      promptTemplates: [
        "Une suite quadratique commence par {t1}, {t2}, {t3}, {t4}, ... Sa différence seconde est {second}. Quel est le coefficient de n² dans le terme de rang n ?",
        "La différence seconde de {t1}, {t2}, {t3}, {t4}, ... est {second}. Quel nombre multiplie n² dans la règle ?"
      ],
      explain: (v, r) => [
        `La différence seconde est ${2 * v[0]!}.`,
        `La moitié de la différence seconde donne le coefficient de n² : ${2 * v[0]!} ÷ 2 = ${r}.`
      ],
      hints: () => ["Divise la différence seconde par 2 pour obtenir le nombre devant n²."]
    },
    declaredVariationSpace: 12 * 21 * 2
  }),
  arithmeticTemplate({
    key: "y8l6.termFromQuadraticRule", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [0, 25], [1, 20]], compute: (v) => v[0]! * v[2]! * v[2]! + v[1]!,
    promptTemplates: [
      "The nth term of a sequence is {a}n² + {b}. What is term number {c}?",
      "A sequence has nth term {a}n² + {b}. Find the {c}th term."
    ],
    explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Square the term number first, then multiply and add."],
    fr: {
      promptTemplates: [
        "Le terme de rang n d'une suite est {a}n² + {b}. Quel est le terme numéro {c} ?",
        "Une suite a pour terme de rang n {a}n² + {b}. Trouve le terme de rang {c}."
      ],
      explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord le rang au carré, puis multiplie et additionne."]
    },
    declaredVariationSpace: 12 * 26 * 20 * 2
  }),

  arithmeticTemplate({
    key: "y8l6.termFromLinearRule", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [-20, 30], [1, 40]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: [
      "The nth term of a sequence is {a}n + {b}. What is term number {c}?",
      "A sequence has nth term {a}n + {b}. Find the {c}th term.",
      "Use the rule {a}n + {b} to work out the term in position {c}."
    ],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Replace n with the term number, then multiply before adding."],
    fr: {
      promptTemplates: [
        "Le terme de rang n d'une suite est {a}n + {b}. Quel est le terme numéro {c} ?",
        "Une suite a pour terme de rang n {a}n + {b}. Trouve le terme de rang {c}.",
        "Utilise la règle {a}n + {b} pour calculer le terme en position {c}."
      ],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace n par le rang, puis multiplie avant d'additionner."]
    },
    declaredVariationSpace: 14 * 51 * 40
  }),
  arithmeticTemplate({
    key: "y8l6.termPositionFromValue", levelKey: "Y8L6", objectiveCode: "Y8-L6-1", difficulty: "REASONING",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [1, 25], [2, 40]], compute: (v) => v[2]!,
    derive: (v) => ({ value: v[0]! * v[2]! + v[1]! }),
    promptTemplates: [
      "A sequence has nth term {a}n + {b}. Which term is equal to {value}?",
      "In the sequence with rule {a}n + {b}, the value {value} appears. What is its position?"
    ],
    explain: (v, r) => [
      `Set up the equation ${v[0]}n + ${v[1]} = ${v[0]! * v[2]! + v[1]!}.`,
      `${v[0]}n = ${v[0]! * v[2]!}, so n = ${r}.`
    ],
    hints: () => ["Make the rule equal to the value and solve the equation for n."],
    fr: {
      promptTemplates: [
        "Une suite a pour terme de rang n {a}n + {b}. Quel terme vaut {value} ?",
        "Dans la suite de règle {a}n + {b}, la valeur {value} apparaît. Quelle est sa position ?"
      ],
      explain: (v, r) => [
        `Pose l'équation ${v[0]}n + ${v[1]} = ${v[0]! * v[2]! + v[1]!}.`,
        `${v[0]}n = ${v[0]! * v[2]!}, donc n = ${r}.`
      ],
      hints: () => ["Rends la règle égale à la valeur et résous l'équation pour n."]
    },
    declaredVariationSpace: 11 * 25 * 39
  }),
  // --- Y8-L6-2: coordinates in all four quadrants ---
  arithmeticTemplate({
    key: "y8l6.midpointXCoordinate", levelKey: "Y8L6", objectiveCode: "Y8-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP",
    ranges: [[-12, 12], [-12, 12], [-12, 12], [-12, 12]], constraint: (v) => (v[0]! + v[2]!) % 2 === 0,
    compute: (v) => (v[0]! + v[2]!) / 2,
    promptTemplates: [
      "What is the x-coordinate of the midpoint of ({a}, {b}) and ({c}, {d})?",
      "Find the x-coordinate halfway between ({a}, {b}) and ({c}, {d})."
    ],
    explain: (v, r) => [`The midpoint averages each coordinate.`, `(${v[0]} + ${v[2]}) ÷ 2 = ${r}.`],
    hints: () => ["Add the two x values and halve — the same works for y."],
    fr: {
      promptTemplates: [
        "Quelle est l'abscisse du milieu de ({a}, {b}) et ({c}, {d}) ?",
        "Trouve l'abscisse à mi-chemin entre ({a}, {b}) et ({c}, {d})."
      ],
      explain: (v, r) => [`Le milieu est la moyenne de chaque coordonnée.`, `(${v[0]} + ${v[2]}) ÷ 2 = ${r}.`],
      hints: () => ["Additionne les deux abscisses et divise par 2 — même méthode pour les ordonnées."]
    },
    declaredVariationSpace: 25 * 25 * 25 * 25
  }),
  categoricalPoolTemplate({
    key: "y8l6.mcQuadrant", levelKey: "Y8L6", objectiveCode: "Y8-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { quadrant: ["first", "second", "third", "fourth"] },
    build: (picked, rng) => {
      const a = rng.int(1, 15);
      const b = rng.int(1, 15);
      const points: Record<string, string> = {
        first: `(${a}, ${b})`,
        second: `(${-a}, ${b})`,
        third: `(${-a}, ${-b})`,
        fourth: `(${a}, ${-b})`
      };
      const labels: Record<string, string> = {
        first: "the first quadrant (x positive, y positive)",
        second: "the second quadrant (x negative, y positive)",
        third: "the third quadrant (x negative, y negative)",
        fourth: "the fourth quadrant (x positive, y negative)"
      };
      const q = picked.quadrant!;
      return {
        prompt: `In which quadrant does the point ${points[q]} lie?`,
        correctLabel: labels[q]!,
        distractorLabels: Object.values(labels).filter((l) => l !== labels[q]).slice(0, 3),
        explanationSteps: [`${points[q]} has those signs, which places it in ${labels[q]}.`],
        hints: ["Check the sign of each coordinate: x tells you left or right, y tells you up or down."]
      };
    },
    fr: {
      translate: (drawn) => {
        const labelsFr: Record<string, string> = {
          "the first quadrant (x positive, y positive)": "le premier quadrant (x positif, y positif)",
          "the second quadrant (x negative, y positive)": "le deuxième quadrant (x négatif, y positif)",
          "the third quadrant (x negative, y negative)": "le troisième quadrant (x négatif, y négatif)",
          "the fourth quadrant (x positive, y negative)": "le quatrième quadrant (x positif, y négatif)"
        };
        const m = drawn.prompt.match(/^In which quadrant does the point \((.+?)\) lie\?$/);
        if (!m) return {};
        return {
          prompt: `Dans quel quadrant se trouve le point (${m[1]}) ?`,
          correctLabel: labelsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => labelsFr[d] ?? d),
          hints: ["Regarde le signe de chaque coordonnée : x indique gauche ou droite, y indique haut ou bas."]
        };
      }
    },
    declaredVariationSpace: 4 * 15 * 15
  }),
  arithmeticTemplate({
    key: "y8l6.pointOnLineYValue", levelKey: "Y8L6", objectiveCode: "Y8-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [-20, 20], [-12, 12]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: [
      "A point on the line y = {a}x + {b} has x = {c}. What is its y-coordinate?",
      "Complete the table of values for y = {a}x + {b}: what is y when x = {c}?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the x value into the equation — watch the signs if x is negative."],
    fr: {
      promptTemplates: [
        "Un point de la droite y = {a}x + {b} a pour abscisse {c}. Quelle est son ordonnée ?",
        "Complète le tableau de valeurs de y = {a}x + {b} : que vaut y quand x = {c} ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace x par sa valeur dans l'équation — attention aux signes si x est négatif."]
    },
    declaredVariationSpace: 11 * 41 * 25
  }),
  orderingTemplate({
    key: "y8l6.orderPointsByXCoordinate", levelKey: "Y8L6", objectiveCode: "Y8-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["COORDINATE_ERROR"], type: "ORDERING", direction: "asc",
    generateItems: (rng) => {
      const used = new Set<number>();
      const items: Array<{ label: string; sortValue: number }> = [];
      while (items.length < 4) {
        const x = rng.int(-15, 15);
        if (used.has(x)) continue;
        used.add(x);
        items.push({ label: `(${x}, ${rng.int(-15, 15)})`, sortValue: x });
      }
      return items;
    },
    promptTemplates: ["Put these points in order from the furthest left to the furthest right.", "Order these coordinates by their x-coordinate, smallest first."],
    explain: (items) => [`In order of x-coordinate: ${items.map((i) => i.label).join(", ")}.`],
    hints: () => ["The x-coordinate is the first number, and more negative means further left."],
    fr: {
      promptTemplates: ["Classe ces points du plus à gauche au plus à droite.", "Classe ces coordonnées selon leur abscisse, de la plus petite à la plus grande."],
      explain: (items) => [`Dans l'ordre des abscisses : ${items.map((i) => i.label).join(", ")}.`],
      hints: () => ["L'abscisse est le premier nombre, et plus elle est négative, plus le point est à gauche."]
    },
    declaredVariationSpace: 20000
  }),

  // --- Y8-L6-3: plotting y = mx + c ---
  arithmeticTemplate({
    key: "y8l6.gradientFromEquation", levelKey: "Y8L6", objectiveCode: "Y8-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [-30, 30]], compute: (v) => v[0]!,
    promptTemplates: [
      "What is the gradient of the line y = {a}x + {b}?",
      "In y = {a}x + {b}, which number is the gradient?",
      "A line has equation y = {a}x + {b}. How many units does y rise for each 1 unit across?"
    ],
    explain: (v, r) => [`In y = mx + c, m is the gradient.`, `Here m = ${r}.`],
    hints: () => ["The gradient is the number attached to x, not the number on its own."],
    fr: {
      promptTemplates: [
        "Quel est le coefficient directeur de la droite y = {a}x + {b} ?",
        "Dans y = {a}x + {b}, quel nombre est le coefficient directeur ?",
        "Une droite a pour équation y = {a}x + {b}. De combien y monte-t-il pour 1 unité horizontale ?"
      ],
      explain: (v, r) => [`Dans y = mx + c, m est le coefficient directeur.`, `Ici m = ${r}.`],
      hints: () => ["Le coefficient directeur est le nombre accolé à x, pas le nombre seul."]
    },
    declaredVariationSpace: 19 * 61 * 3
  }),
  arithmeticTemplate({
    key: "y8l6.yInterceptFromEquation", levelKey: "Y8L6", objectiveCode: "Y8-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [-30, 30]], compute: (v) => v[1]!,
    promptTemplates: [
      "Where does the line y = {a}x + {b} cross the y-axis?",
      "In y = {a}x + {b}, what is the y-intercept?",
      "A line has equation y = {a}x + {b}. What is y when x = 0?"
    ],
    explain: (v, r) => [`In y = mx + c, c is the y-intercept.`, `Substituting x = 0 gives y = ${r}.`],
    hints: () => ["Set x to zero — only the constant term is left."],
    fr: {
      promptTemplates: [
        "Où la droite y = {a}x + {b} coupe-t-elle l'axe des ordonnées ?",
        "Dans y = {a}x + {b}, quelle est l'ordonnée à l'origine ?",
        "Une droite a pour équation y = {a}x + {b}. Que vaut y quand x = 0 ?"
      ],
      explain: (v, r) => [`Dans y = mx + c, c est l'ordonnée à l'origine.`, `En remplaçant x par 0, on obtient y = ${r}.`],
      hints: () => ["Remplace x par zéro — il ne reste que le terme constant."]
    },
    declaredVariationSpace: 19 * 61 * 3
  }),
  arithmeticTemplate({
    key: "y8l6.gradientFromTwoPoints", levelKey: "Y8L6", objectiveCode: "Y8-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "MULTI_STEP",
    ranges: [[1, 15], [1, 12], [1, 15], [-10, 10]], compute: (v) => v[2]!,
    derive: (v) => ({ x2: v[0]! + v[1]!, y1: v[3]!, y2: v[3]! + v[1]! * v[2]! }),
    promptTemplates: [
      "A line passes through ({a}, {y1}) and ({x2}, {y2}). What is its gradient?",
      "Find the gradient of the line joining ({a}, {y1}) to ({x2}, {y2})."
    ],
    explain: (v, r) => [`Change in y is ${v[1]! * v[2]!}; change in x is ${v[1]}.`, `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Gradient = rise ÷ run = change in y ÷ change in x."],
    fr: {
      promptTemplates: [
        "Une droite passe par ({a}, {y1}) et ({x2}, {y2}). Quel est son coefficient directeur ?",
        "Trouve le coefficient directeur de la droite reliant ({a}, {y1}) à ({x2}, {y2})."
      ],
      explain: (v, r) => [`La variation de y est ${v[1]! * v[2]!} ; celle de x est ${v[1]}.`, `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Coefficient directeur = montée ÷ déplacement = variation de y ÷ variation de x."]
    },
    declaredVariationSpace: 15 * 12 * 15 * 21
  }),
  arithmeticTemplate({
    key: "y8l6.xInterceptOfLine", levelKey: "Y8L6", objectiveCode: "Y8-L6-3", difficulty: "REASONING",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "MULTI_STEP",
    ranges: [[2, 15], [1, 25]], compute: (v) => -v[1]!,
    derive: (v) => ({ c: v[0]! * v[1]! }),
    promptTemplates: [
      "Where does the line y = {a}x + {c} cross the x-axis? Give the x-coordinate.",
      "Find the x-intercept of y = {a}x + {c}."
    ],
    explain: (v, r) => [
      `On the x-axis, y = 0, so ${v[0]}x + ${v[0]! * v[1]!} = 0.`,
      `${v[0]}x = -${v[0]! * v[1]!}, so x = ${r}.`
    ],
    hints: () => ["On the x-axis the y value is zero — set y to 0 and solve for x."],
    fr: {
      promptTemplates: [
        "Où la droite y = {a}x + {c} coupe-t-elle l'axe des abscisses ? Donne l'abscisse.",
        "Trouve l'abscisse à l'origine de y = {a}x + {c}."
      ],
      explain: (v, r) => [
        `Sur l'axe des abscisses, y = 0, donc ${v[0]}x + ${v[0]! * v[1]!} = 0.`,
        `${v[0]}x = -${v[0]! * v[1]!}, donc x = ${r}.`
      ],
      hints: () => ["Sur l'axe des abscisses, y vaut zéro — remplace y par 0 et résous pour x."]
    },
    declaredVariationSpace: 14 * 25 * 2
  }),
  categoricalPoolTemplate({
    key: "y8l6.mcParallelLines", levelKey: "Y8L6", objectiveCode: "Y8-L6-3", difficulty: "REASONING",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const m = rng.int(2, 15);
      const c1 = rng.int(1, 20);
      const c2 = rng.int(1, 20);
      const other = m + rng.int(1, 6);
      const correct = `y = ${m}x + ${c2 + 20}`;
      const wrong = [`y = ${other}x + ${c1}`, `y = ${m + 1}x + ${c2}`, `y = ${other + 2}x + ${c1 + 1}`];
      return {
        prompt: `Which line is parallel to y = ${m}x + ${c1}?`,
        correctLabel: correct,
        distractorLabels: wrong.filter((w) => w !== correct).slice(0, 3),
        explanationSteps: [`Parallel lines have the same gradient, which is ${m} here.`, `Only ${correct} has a gradient of ${m}.`],
        hints: ["Parallel means same gradient — the constant term can be anything."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which line is parallel to (.+)\?$/);
        if (!m) return {};
        return {
          prompt: `Quelle droite est parallèle à ${m[1]} ?`,
          explanationSteps: ["Les droites parallèles ont le même coefficient directeur.", `Seule ${drawn.correctLabel} a ce coefficient.`],
          hints: ["Parallèle signifie même coefficient directeur — le terme constant peut être quelconque."]
        };
      }
    },
    declaredVariationSpace: 14 * 20 * 20 * 6
  })
];

export default level;
