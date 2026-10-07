import { arithmeticTemplate, categoricalPoolTemplate, plural } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 4 — "Linear and quadratic graphs"
const JOURNEYS = ["a cyclist", "a train", "a delivery van", "a runner", "a ferry", "a bus", "a drone", "a hiker"];
const JOURNEYS_FR = ["un cycliste", "un train", "une camionnette de livraison", "un coureur", "un ferry", "un bus", "un drone", "un randonneur"];

export const level: QuestionTemplateDef[] = [
  // --- Y9-L4-1: gradients and intercepts of linear functions ---
  arithmeticTemplate({
    key: "y9l4.gradientFromEquation", levelKey: "Y9L4", objectiveCode: "Y9-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [0, 20]], compute: (v) => v[0]!,
    promptTemplates: ["The line y = {a}x + {b} is drawn. What is its gradient?", "What is the gradient of y = {a}x + {b}?"],
    explain: (v, r) => [`In y = mx + c, the gradient is m, which is ${r}.`],
    hints: () => ["In y = mx + c, the gradient is the number multiplying x."],
    fr: {
      promptTemplates: ["La droite y = {a}x + {b} est tracée. Quel est son coefficient directeur ?", "Quel est le coefficient directeur de y = {a}x + {b} ?"],
      explain: (v, r) => [`Dans y = mx + c, le coefficient directeur est m, soit ${r}.`],
      hints: () => ["Dans y = mx + c, le coefficient directeur est le nombre qui multiplie x."]
    },
    declaredVariationSpace: 15 * 21 * 2
  }),
  arithmeticTemplate({
    key: "y9l4.interceptFromEquation", levelKey: "Y9L4", objectiveCode: "Y9-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [0, 20]], compute: (v) => v[1]!,
    promptTemplates: ["The line y = {a}x + {b} is drawn. What is its y-intercept?", "Where does y = {a}x + {b} cross the y-axis?"],
    explain: (v, r) => [`In y = mx + c, the y-intercept is c, which is ${r}.`],
    hints: () => ["In y = mx + c, the y-intercept is the constant term."],
    fr: {
      promptTemplates: ["La droite y = {a}x + {b} est tracée. Quelle est son ordonnée à l'origine ?", "Où la droite y = {a}x + {b} coupe-t-elle l'axe des ordonnées ?"],
      explain: (v, r) => [`Dans y = mx + c, l'ordonnée à l'origine est c, soit ${r}.`],
      hints: () => ["Dans y = mx + c, l'ordonnée à l'origine est le terme constant."]
    },
    declaredVariationSpace: 15 * 21 * 2
  }),
  arithmeticTemplate({
    key: "y9l4.gradientBetweenPoints", levelKey: "Y9L4", objectiveCode: "Y9-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [1, 10], [1, 12]], compute: (v) => v[2]!,
    derive: (v) => ({ x2: v[0]! + v[1]!, y1: v[0]! * 2, y2: v[0]! * 2 + v[1]! * v[2]! }),
    promptTemplates: ["A line passes through ({a}, {y1}) and ({x2}, {y2}). What is its gradient?"],
    explain: (v, r) => [`Change in y = ${v[1]! * v[2]!}, change in x = ${v[1]}.`, `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Gradient = change in y ÷ change in x."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[0]! * 2], [v[0]! + v[1]!, v[0]! * 2 + v[1]! * v[2]!]]),
    fr: {
      promptTemplates: ["Une droite passe par ({a}, {y1}) et ({x2}, {y2}). Quel est son coefficient directeur ?"],
      explain: (v, r) => [`Variation de y = ${v[1]! * v[2]!}, variation de x = ${v[1]}.`, `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Coefficient directeur = variation de y ÷ variation de x."]
    },
    declaredVariationSpace: 10 * 10 * 12
  }),
  arithmeticTemplate({
    key: "y9l4.valueOnLinearGraph", levelKey: "Y9L4", objectiveCode: "Y9-L4-1", difficulty: "APPLICATION",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [0, 20], [1, 15]], compute: (v) => v[0]! * v[2]! + v[1]!,
    promptTemplates: ["On the line y = {a}x + {b}, what is y when x = {c}?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Substitute the x value into the equation."],
    fr: {
      promptTemplates: ["Sur la droite y = {a}x + {b}, que vaut y quand x = {c} ?"],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Remplace x par sa valeur dans l'équation."]
    },
    declaredVariationSpace: 12 * 21 * 15
  }),
  arithmeticTemplate({
    key: "y9l4.mcGradient", levelKey: "Y9L4", objectiveCode: "Y9-L4-1", difficulty: "FLUENCY",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [0, 20]], compute: (v) => v[0]!,
    promptTemplates: ["What is the gradient of the line y = {a}x + {b}?"],
    explain: (v, r) => [`The gradient is the coefficient of x: ${r}.`],
    hints: () => ["The gradient is the number in front of x."],
    distractorSpread: 4,
    fr: {
      promptTemplates: ["Quel est le coefficient directeur de la droite y = {a}x + {b} ?"],
      hints: () => ["Le coefficient directeur est le nombre devant x."]
    },
    declaredVariationSpace: 15 * 21
  }),

  arithmeticTemplate({
    key: "y9l4.xInterceptOfLine", levelKey: "Y9L4", objectiveCode: "Y9-L4-1", difficulty: "REASONING",
    misconceptionTags: ["GRADIENT_INTERCEPT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ intercept: v[0]! * v[1]! }),
    promptTemplates: ["The line y = {a}x - {intercept} crosses the x-axis. At what x value does it cross?"],
    explain: (v, r) => [`Set y = 0: ${v[0]}x = ${v[0]! * v[1]!}.`, `x = ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["The line crosses the x-axis where y = 0 — set y to zero and solve."],
    fr: {
      promptTemplates: ["La droite y = {a}x - {intercept} coupe l'axe des abscisses. En quelle valeur de x le fait-elle ?"],
      explain: (v, r) => [`Pose y = 0 : ${v[0]}x = ${v[0]! * v[1]!}.`, `x = ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["La droite coupe l'axe des abscisses là où y = 0 — pose y à zéro et résous."]
    },
    declaredVariationSpace: 11 * 20
  }),

  // --- Y9-L4-2: quadratic graphs ---
  arithmeticTemplate({
    key: "y9l4.quadraticValue", levelKey: "Y9L4", objectiveCode: "Y9-L4-2", difficulty: "APPLICATION",
    misconceptionTags: ["QUADRATIC_GRAPH_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [0, 15], [1, 8]], compute: (v) => v[2]! * v[2]! + v[0]! * v[2]! + v[1]!,
    promptTemplates: ["For the curve y = x² + {a}x + {b}, what is y when x = {c}?"],
    explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[2]! * v[2]!} + ${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Square the x value first, then add the other terms."],
    fr: {
      promptTemplates: ["Pour la courbe y = x² + {a}x + {b}, que vaut y quand x = {c} ?"],
      explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[2]! * v[2]!} + ${v[0]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord x au carré, puis ajoute les autres termes."]
    },
    declaredVariationSpace: 10 * 16 * 8
  }),
  arithmeticTemplate({
    key: "y9l4.quadraticYIntercept", levelKey: "Y9L4", objectiveCode: "Y9-L4-2", difficulty: "FLUENCY",
    misconceptionTags: ["QUADRATIC_GRAPH_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 25]], compute: (v) => v[1]!,
    promptTemplates: ["Where does the curve y = x² + {a}x + {b} cross the y-axis?", "What is the y-intercept of y = x² + {a}x + {b}?"],
    explain: (v, r) => [`Set x = 0: y = 0 + 0 + ${v[1]} = ${r}.`],
    hints: () => ["Substitute x = 0 — only the constant term survives."],
    fr: {
      promptTemplates: ["Où la courbe y = x² + {a}x + {b} coupe-t-elle l'axe des ordonnées ?", "Quelle est l'ordonnée à l'origine de y = x² + {a}x + {b} ?"],
      explain: (v, r) => [`Pose x = 0 : y = 0 + 0 + ${v[1]} = ${r}.`],
      hints: () => ["Remplace x par 0 — seul le terme constant subsiste."]
    },
    declaredVariationSpace: 12 * 25 * 2
  }),
  arithmeticTemplate({
    key: "y9l4.quadraticRootSum", levelKey: "Y9L4", objectiveCode: "Y9-L4-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_GRAPH_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 25], [1, 25]], compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ bCoef: v[0]! + v[1]!, cCoef: v[0]! * v[1]! }),
    promptTemplates: ["The curve y = x² - {bCoef}x + {cCoef} crosses the x-axis at two points. What is the sum of those two x values?"],
    explain: (v, r) => [`It factorises as (x - ${v[0]})(x - ${v[1]}), so the roots are ${v[0]} and ${v[1]}.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Factorise to find the roots, then add them."],
    fr: {
      promptTemplates: ["La courbe y = x² - {bCoef}x + {cCoef} coupe l'axe des abscisses en deux points. Quelle est la somme de ces deux valeurs de x ?"],
      explain: (v, r) => [`Elle se factorise en (x - ${v[0]})(x - ${v[1]}), donc les racines sont ${v[0]} et ${v[1]}.`, `${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Factorise pour trouver les racines, puis additionne-les."]
    },
    declaredVariationSpace: 325
  }),
  categoricalPoolTemplate({
    key: "y9l4.mcQuadraticShape", levelKey: "Y9L4", objectiveCode: "Y9-L4-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_GRAPH_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const positive = rng.chance(0.5);
      const coeff = rng.int(1, 9);
      const con = rng.int(1, 20);
      const equation = positive ? `y = ${coeff === 1 ? "" : coeff}x² + ${con}` : `y = -${coeff === 1 ? "" : coeff}x² + ${con}`;
      return {
        prompt: `What shape is the graph of ${equation}?`,
        correctLabel: positive ? "A U-shaped parabola" : "An n-shaped (upside-down) parabola",
        distractorLabels: [positive ? "An n-shaped (upside-down) parabola" : "A U-shaped parabola", "A straight line"],
        explanationSteps: [positive ? "A positive x² coefficient gives a U-shaped curve." : "A negative x² coefficient flips the curve upside down."],
        hints: ["Look at the sign of the x² term."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What shape is the graph of (.+)\?$/);
        if (!m) return {};
        const isU = drawn.correctLabel.startsWith("A U-shaped");
        return {
          prompt: `Quelle est la forme du graphique de ${m[1]} ?`,
          correctLabel: isU ? "Une parabole en forme de U" : "Une parabole renversée (en forme de n)",
          distractorLabels: [isU ? "Une parabole renversée (en forme de n)" : "Une parabole en forme de U", "Une droite"],
          explanationSteps: [isU ? "Un coefficient de x² positif donne une courbe en U." : "Un coefficient de x² négatif retourne la courbe."],
          hints: ["Regarde le signe du terme en x²."]
        };
      }
    },
    declaredVariationSpace: 400
  }),
  arithmeticTemplate({
    key: "y9l4.quadraticTurningPoint", levelKey: "Y9L4", objectiveCode: "Y9-L4-2", difficulty: "REASONING",
    misconceptionTags: ["QUADRATIC_GRAPH_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 25]], compute: (v) => v[1]!,
    promptTemplates: ["The curve y = (x - {a})² + {b} has its lowest point at (x, y). What is the y value of that lowest point?"],
    explain: (v, r) => [`The squared bracket is smallest (zero) when x = ${v[0]}.`, `Then y = 0 + ${v[1]} = ${r}.`],
    hints: () => ["A squared bracket is smallest when it equals zero."],
    fr: {
      promptTemplates: ["La courbe y = (x - {a})² + {b} a son point le plus bas en (x, y). Quelle est la valeur de y en ce point ?"],
      explain: (v, r) => [`La parenthèse au carré est minimale (zéro) quand x = ${v[0]}.`, `Alors y = 0 + ${v[1]} = ${r}.`],
      hints: () => ["Une parenthèse au carré est minimale quand elle vaut zéro."]
    },
    declaredVariationSpace: 15 * 25
  }),

  // --- Y9-L4-3: gradient as a rate of change ---
  arithmeticTemplate({
    key: "y9l4.gradientAsRate", levelKey: "Y9L4", objectiveCode: "Y9-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "WORD_PROBLEM", contextPool: JOURNEYS,
    ranges: [[2, 20], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ distance: v[0]! * v[1]! }),
    promptTemplates: ["On a distance-time graph, {ctx} travels {distance} km in {b} hours. What is the gradient, in km per hour?"],
    explain: (v, r) => [`Gradient = distance ÷ time.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["The gradient of a distance-time graph is the speed."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: ["Sur un graphique distance-temps, {ctx} parcourt {distance} km en {b} heures. Quel est le coefficient directeur, en km par heure ?"],
      explain: (v, r) => [`Coefficient directeur = distance ÷ temps.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Le coefficient directeur d'un graphique distance-temps est la vitesse."]
    },
    declaredVariationSpace: 19 * 11 * JOURNEYS.length
  }),
  arithmeticTemplate({
    key: "y9l4.rateOfChangeCost", levelKey: "Y9L4", objectiveCode: "Y9-L4-3", difficulty: "APPLICATION",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "GRAPH_INTERPRETATION",
    ranges: [[2, 15], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ totalCost: v[0]! * v[1]! }),
    promptTemplates: ["A graph of cost against quantity is a straight line through the origin. {b} items cost £{totalCost}. What is the gradient, in £ per item?"],
    explain: (v, r) => [`Gradient = cost ÷ quantity.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["The gradient here is the cost of one item."],
    visualAid: (v) => visuals.graph("line", [{ label: "0", value: 0 }, { label: String(v[1]!), value: v[0]! * v[1]! }]),
    fr: {
      promptTemplates: ["Un graphique du coût en fonction de la quantité est une droite passant par l'origine. {b} articles coûtent £{totalCost}. Quel est le coefficient directeur, en £ par article ?"],
      explain: (v, r) => [`Coefficient directeur = coût ÷ quantité.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Le coefficient directeur ici est le coût d'un article."]
    },
    declaredVariationSpace: 14 * 19
  }),
  arithmeticTemplate({
    key: "y9l4.rateFromTwoReadings", levelKey: "Y9L4", objectiveCode: "Y9-L4-3", difficulty: "REASONING",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "WORD_PROBLEM", contextPool: JOURNEYS,
    ranges: [[1, 12], [2, 10], [1, 20]], compute: (v) => v[1]!,
    derive: (v) => ({ start: v[2]!, end: v[2]! + v[0]! * v[1]!, hours: v[0]! }),
    promptTemplates: ["A graph shows {ctx} at {start} km after the first reading and {end} km after {hours} more {hours#hours|hour}. What is the rate of change, in km per hour?"],
    explain: (v, r) => [`Change in distance = ${v[0]! * v[1]!} km over ${v[0]} ${plural(v[0]!, "hours", "hour")}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the change in distance by the change in time."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: ["Un graphique montre {ctx} à {start} km après la première lecture et à {end} km après {hours} {hours#heures|heure} de plus. Quel est le taux de variation, en km par heure ?"],
      explain: (v, r) => [`Variation de distance = ${v[0]! * v[1]!} km en ${v[0]} ${plural(v[0]!, "heures", "heure")}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Divise la variation de distance par la variation de temps."]
    },
    declaredVariationSpace: 12 * 9 * 20 * JOURNEYS.length
  }),
  categoricalPoolTemplate({
    key: "y9l4.tfRateOfChange", levelKey: "Y9L4", objectiveCode: "Y9-L4-3", difficulty: "REASONING",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const speed = rng.int(2, 25);
      const hours = rng.int(2, 10);
      const distance = speed * hours;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? speed : speed + rng.int(1, 6);
      return {
        prompt: `A distance-time graph rises ${distance} km over ${hours} hours, so its gradient is ${shown} km/h. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${distance} ÷ ${hours} = ${speed} km/h.`],
        hints: ["Gradient of a distance-time graph = distance ÷ time."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A distance-time graph rises (\d+) km over (\d+) hours, so its gradient is (\d+) km\/h\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un graphique distance-temps monte de ${m[1]} km en ${m[2]} heures, donc son coefficient directeur est ${m[3]} km/h. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Coefficient directeur d'un graphique distance-temps = distance ÷ temps."]
        };
      }
    },
    declaredVariationSpace: 1000
  })
];

export default level;
