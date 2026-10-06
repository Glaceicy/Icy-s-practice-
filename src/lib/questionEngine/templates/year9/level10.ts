import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 10 — "Year 9 pre-GCSE mixed mastery"
// A mixed review across the whole of Key Stage 3: number and proportion,
// algebra and graphs, and geometry/probability/statistics.
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const BASES = [2, 3, 5, 7];
const JOURNEYS = ["a train journey", "a cycle ride", "a delivery run", "a coach trip", "a ferry crossing", "a running route"];
const JOURNEYS_FR = ["un trajet en train", "une sortie à vélo", "une tournée de livraison", "un voyage en car", "une traversée en ferry", "un parcours de course"];
const PLACES = ["a ladder", "a ramp", "a kite string", "a guy rope", "a zip wire", "a roof strut"];
const PLACES_FR = ["une échelle", "une rampe", "un fil de cerf-volant", "un hauban", "une tyrolienne", "une poutre de toit"];
const oneDp = (n: number) => n.toFixed(1);

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const level: QuestionTemplateDef[] = [
  // --- Y9-L10-1: standard form, indices, proportion and rates ---
  arithmeticTemplate({
    key: "y9l10.standardFormExponent", levelKey: "Y9L10", objectiveCode: "Y9-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [1, 8]], compute: (v) => v[1]! + 1,
    derive: (v) => ({ num: (v[0]! * Math.pow(10, v[1]!)).toLocaleString("en-GB") }),
    promptTemplates: [
      "Write {num} in standard form as a x 10^k. What is k?",
      "{num} is written in standard form. What power of 10 is used?",
      "In standard form, {num} = a x 10^k where 1 ≤ a < 10. Find k."
    ],
    explain: (v, r) => [
      `Move the decimal point until just one non-zero digit is in front of it.`,
      `${(v[0]! * Math.pow(10, v[1]!)).toLocaleString("en-GB")} becomes ${(v[0]! / 10).toFixed(1)} x 10^${r}.`
    ],
    hints: () => ["Count how many places the decimal point has to move to leave a single digit in front."],
    fr: {
      promptTemplates: [
        "Écris {num} en notation scientifique sous la forme a x 10^k. Que vaut k ?",
        "{num} est écrit en notation scientifique. Quelle puissance de 10 est utilisée ?",
        "En notation scientifique, {num} = a x 10^k avec 1 ≤ a < 10. Trouve k."
      ],
      explain: (v, r) => [
        `Déplace la virgule jusqu'à ne laisser qu'un seul chiffre non nul devant.`,
        `${(v[0]! * Math.pow(10, v[1]!)).toLocaleString("en-GB")} devient ${(v[0]! / 10).toFixed(1)} x 10^${r}.`
      ],
      hints: () => ["Compte de combien de rangs la virgule doit se déplacer pour ne laisser qu'un chiffre devant."]
    },
    declaredVariationSpace: 90 * 8 * 3
  }),
  arithmeticTemplate({
    key: "y9l10.indexLawMultiply", levelKey: "Y9L10", objectiveCode: "Y9-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15], [0, BASES.length - 1]], compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ base: BASES[v[2]!]! }),
    promptTemplates: [
      "{base}^{a} x {base}^{b} = {base}^k. What is k?",
      "Simplify {base}^{a} x {base}^{b} to a single power of {base}. What is the index?"
    ],
    explain: (v, r) => [`When multiplying powers of the same base, add the indices.`, `${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Same base, multiplying: add the powers."],
    fr: {
      promptTemplates: [
        "{base}^{a} x {base}^{b} = {base}^k. Que vaut k ?",
        "Simplifie {base}^{a} x {base}^{b} en une seule puissance de {base}. Quel est l'indice ?"
      ],
      explain: (v, r) => [`En multipliant des puissances de même base, on additionne les indices.`, `${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Même base, multiplication : additionne les puissances."]
    },
    declaredVariationSpace: 15 * 15 * BASES.length * 2
  }),
  arithmeticTemplate({
    key: "y9l10.indexLawDivide", levelKey: "Y9L10", objectiveCode: "Y9-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[6, 20], [1, 15], [0, BASES.length - 1]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    derive: (v) => ({ base: BASES[v[2]!]! }),
    promptTemplates: [
      "{base}^{a} ÷ {base}^{b} = {base}^k. What is k?",
      "Simplify {base}^{a} ÷ {base}^{b} to a single power of {base}. What is the index?"
    ],
    explain: (v, r) => [`When dividing powers of the same base, subtract the indices.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Same base, dividing: subtract the powers."],
    fr: {
      promptTemplates: [
        "{base}^{a} ÷ {base}^{b} = {base}^k. Que vaut k ?",
        "Simplifie {base}^{a} ÷ {base}^{b} en une seule puissance de {base}. Quel est l'indice ?"
      ],
      explain: (v, r) => [`En divisant des puissances de même base, on soustrait les indices.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Même base, division : soustrais les puissances."]
    },
    declaredVariationSpace: 15 * 15 * BASES.length * 2
  }),
  arithmeticTemplate({
    key: "y9l10.directProportionValue", levelKey: "Y9L10", objectiveCode: "Y9-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 15], [2, 20], [2, 20]], compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ y1: v[0]! * v[1]! }),
    promptTemplates: [
      "y is directly proportional to x. When x = {b}, y = {y1}. What is y when x = {c}?",
      "y varies directly with x, and y = {y1} when x = {b}. Find y when x = {c}."
    ],
    explain: (v, r) => [`k = ${v[0]! * v[1]!} ÷ ${v[1]} = ${v[0]}, so y = ${v[0]}x.`, `${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Find the constant of proportionality k first, then use y = kx."],
    fr: {
      promptTemplates: [
        "y est directement proportionnel à x. Quand x = {b}, y = {y1}. Que vaut y quand x = {c} ?",
        "y varie directement avec x, et y = {y1} quand x = {b}. Trouve y quand x = {c}."
      ],
      explain: (v, r) => [`k = ${v[0]! * v[1]!} ÷ ${v[1]} = ${v[0]}, donc y = ${v[0]}x.`, `${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Trouve d'abord la constante de proportionnalité k, puis utilise y = kx."]
    },
    declaredVariationSpace: 14 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y9l10.speedFromDistanceTime", levelKey: "Y9L10", objectiveCode: "Y9-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_ERROR"], type: "MULTI_STEP", contextPool: JOURNEYS,
    ranges: [[5, 90], [2, 12]], compute: (v) => v[0]!,
    derive: (v) => ({ dist: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: [
      "A journey of {dist} km takes {time} hours. What is the average speed, in km/h?",
      "{Ctx} covers {dist} km in {time} hours. Find the average speed, in km/h."
    ],
    explain: (v, r) => [`Speed = distance ÷ time.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r} km/h.`],
    hints: () => ["Speed is distance divided by time — check the units match before dividing."],
    fr: {
      contextPool: JOURNEYS_FR,
      promptTemplates: [
        "Un trajet de {dist} km dure {time} heures. Quelle est la vitesse moyenne, en km/h ?",
        "{Ctx} parcourt {dist} km en {time} heures. Trouve la vitesse moyenne, en km/h."
      ],
      explain: (v, r) => [`Vitesse = distance ÷ temps.`, `${v[0]! * v[1]!} ÷ ${v[1]} = ${r} km/h.`],
      hints: () => ["La vitesse est la distance divisée par le temps — vérifie les unités avant de diviser."]
    },
    declaredVariationSpace: 86 * 11 * (1 + JOURNEYS.length)
  }),

  // --- Y9-L10-2: algebraic manipulation, equations and graphs ---
  arithmeticTemplate({
    key: "y9l10.expandSingleBracket", levelKey: "Y9L10", objectiveCode: "Y9-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["EXPANSION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 15], [1, 20]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "Expand {a}(x + {b}). What is the constant term?",
      "{a}(x + {b}) = {a}x + k. What is k?",
      "Multiply out {a}(x + {b}) and state the number that is not attached to x."
    ],
    explain: (v, r) => [`Multiply everything inside the bracket by ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the outside number by each term inside, including the constant."],
    fr: {
      promptTemplates: [
        "Développe {a}(x + {b}). Quel est le terme constant ?",
        "{a}(x + {b}) = {a}x + k. Que vaut k ?",
        "Développe {a}(x + {b}) et donne le nombre qui n'est pas accompagné de x."
      ],
      explain: (v, r) => [`Multiplie tout ce qui est dans la parenthèse par ${v[0]}.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie le nombre extérieur par chaque terme intérieur, y compris la constante."]
    },
    declaredVariationSpace: 14 * 20 * 3
  }),
  arithmeticTemplate({
    key: "y9l10.factoriseCommonFactor", levelKey: "Y9L10", objectiveCode: "Y9-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FACTORISING_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 15], [2, 15]], constraint: (v) => gcd(v[1]!, v[2]!) === 1 && v[1]! !== v[2]!,
    compute: (v) => v[0]!,
    derive: (v) => ({ t1: v[0]! * v[1]!, t2: v[0]! * v[2]! }),
    promptTemplates: [
      "Factorise {t1}x + {t2}. What is the highest common factor you take outside the bracket?",
      "{t1}x + {t2} factorises as k(…). What is k?"
    ],
    explain: (v, r) => [`The highest common factor of ${v[0]! * v[1]!} and ${v[0]! * v[2]!} is ${r}.`, `So ${v[0]! * v[1]!}x + ${v[0]! * v[2]!} = ${r}(${v[1]}x + ${v[2]}).`],
    hints: () => ["Find the largest number that divides into both terms exactly."],
    fr: {
      promptTemplates: [
        "Factorise {t1}x + {t2}. Quel est le plus grand facteur commun que tu sors de la parenthèse ?",
        "{t1}x + {t2} se factorise en k(…). Que vaut k ?"
      ],
      explain: (v, r) => [`Le plus grand facteur commun de ${v[0]! * v[1]!} et ${v[0]! * v[2]!} est ${r}.`, `Donc ${v[0]! * v[1]!}x + ${v[0]! * v[2]!} = ${r}(${v[1]}x + ${v[2]}).`],
      hints: () => ["Trouve le plus grand nombre qui divise exactement les deux termes."]
    },
    declaredVariationSpace: 11 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y9l10.equationUnknownBothSides", levelKey: "Y9L10", objectiveCode: "Y9-L10-2", difficulty: "REASONING",
    misconceptionTags: ["EQUATION_BALANCE_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 12], [1, 11], [1, 20], [1, 30]], constraint: (v) => v[1]! < v[0]!,
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
    hints: () => ["Collect the x terms on the side where there are more of them, then undo the addition and the multiplication."],
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
      hints: () => ["Regroupe les termes en x du côté où il y en a le plus, puis annule l'addition et la multiplication."]
    },
    declaredVariationSpace: 10 * 10 * 20 * 30
  }),
  arithmeticTemplate({
    key: "y9l10.gradientFromTwoPoints", levelKey: "Y9L10", objectiveCode: "Y9-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["RATE_OF_CHANGE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 15], [1, 12], [1, 15], [0, 12]], compute: (v) => v[2]!,
    derive: (v) => ({ x2: v[0]! + v[1]!, y1: v[3]!, y2: v[3]! + v[1]! * v[2]! }),
    promptTemplates: [
      "A line passes through ({a}, {y1}) and ({x2}, {y2}). What is its gradient?",
      "Find the gradient of the straight line through ({a}, {y1}) and ({x2}, {y2})."
    ],
    explain: (v, r) => [
      `Change in y is ${v[1]! * v[2]!} and change in x is ${v[1]}.`,
      `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`
    ],
    hints: () => ["Gradient is the change in y divided by the change in x."],
    fr: {
      promptTemplates: [
        "Une droite passe par ({a}, {y1}) et ({x2}, {y2}). Quel est son coefficient directeur ?",
        "Trouve le coefficient directeur de la droite passant par ({a}, {y1}) et ({x2}, {y2})."
      ],
      explain: (v, r) => [
        `La variation de y est ${v[1]! * v[2]!} et celle de x est ${v[1]}.`,
        `${v[1]! * v[2]!} ÷ ${v[1]} = ${r}.`
      ],
      hints: () => ["Le coefficient directeur est la variation de y divisée par celle de x."]
    },
    declaredVariationSpace: 15 * 12 * 15 * 13
  }),
  arithmeticTemplate({
    key: "y9l10.substituteIntoFormula", levelKey: "Y9L10", objectiveCode: "Y9-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [1, 25], [1, 20]], compute: (v) => v[0]! * v[2]! * v[2]! + v[1]!,
    promptTemplates: [
      "If y = {a}x² + {b}, what is y when x = {c}?",
      "Substitute x = {c} into y = {a}x² + {b}. What is y?"
    ],
    explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
    hints: () => ["Square the x value first, then multiply, then add — follow the order of operations."],
    fr: {
      promptTemplates: [
        "Si y = {a}x² + {b}, que vaut y quand x = {c} ?",
        "Remplace x par {c} dans y = {a}x² + {b}. Que vaut y ?"
      ],
      explain: (v, r) => [`${v[2]}² = ${v[2]! * v[2]!}.`, `${v[0]} x ${v[2]! * v[2]!} + ${v[1]} = ${r}.`],
      hints: () => ["Élève d'abord x au carré, puis multiplie, puis additionne — respecte l'ordre des opérations."]
    },
    declaredVariationSpace: 11 * 25 * 20 * 2
  }),

  // --- Y9-L10-3: geometry, trigonometry, probability and statistics ---
  arithmeticTemplate({
    key: "y9l10.pythagorasHypotenuse", levelKey: "Y9L10", objectiveCode: "Y9-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, q: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has shorter sides of {p} cm and {q} cm. How long is the hypotenuse, in cm?",
      "{Ctx} reaches {p} m up a wall from a point {q} m out from its base. How long is it, in m?",
      "A rectangle measures {p} m by {q} m. How long is its diagonal, in m?"
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]!, q = t[1] * v[1]!;
      return [`${p}² + ${q}² = ${p * p + q * q}.`, `The square root of ${p * p + q * q} is ${r}.`];
    },
    hints: () => ["Square both shorter sides, add, then square root."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a des côtés courts de {p} cm et {q} cm. Quelle est la longueur de l'hypoténuse, en cm ?",
        "{Ctx} atteint {p} m sur un mur depuis un point situé à {q} m de son pied. Quelle est sa longueur, en m ?",
        "Un rectangle mesure {p} m sur {q} m. Quelle est la longueur de sa diagonale, en m ?"
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, q = t[1] * v[1]!;
        return [`${p}² + ${q}² = ${p * p + q * q}.`, `La racine carrée de ${p * p + q * q} est ${r}.`];
      },
      hints: () => ["Élève les deux côtés courts au carré, additionne, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 3 * (1 + PLACES.length)
  }),
  arithmeticTemplate({
    key: "y9l10.trigSideFromAngle", levelKey: "Y9L10", objectiveCode: "Y9-L10-3", difficulty: "REASONING",
    misconceptionTags: ["TRIG_RATIO_CHOICE_ERROR"], type: "MULTI_STEP", contextPool: PLACES,
    ranges: [[20, 70], [5, 40]], compute: (v) => v[1]! * Math.sin((v[0]! * Math.PI) / 180), formatValue: oneDp,
    derive: (v) => ({ ang: v[0]!, hyp: v[1]! }),
    promptTemplates: [
      "A right-angled triangle has a hypotenuse of {hyp} m and an angle of {ang}°. How long is the side opposite that angle, in m to 1 decimal place?",
      "{Ctx} is {hyp} m long and leans at {ang}° to the ground. How high does it reach, in m to 1 decimal place?"
    ],
    explain: (v, r) => [`Opposite = hypotenuse x sin(angle).`, `${v[1]} x sin ${v[0]}° = ${r} m.`],
    hints: () => ["SOH: sine links the opposite side with the hypotenuse."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a une hypoténuse de {hyp} m et un angle de {ang}°. Quelle est la longueur du côté opposé à cet angle, en m au dixième près ?",
        "{Ctx} mesure {hyp} m et s'incline à {ang}° par rapport au sol. À quelle hauteur arrive-t-elle, en m au dixième près ?"
      ],
      explain: (v, r) => [`Opposé = hypoténuse x sin(angle).`, `${v[1]} x sin ${v[0]}° = ${r} m.`],
      hints: () => ["SOH : le sinus relie le côté opposé à l'hypoténuse."]
    },
    declaredVariationSpace: 51 * 36
  }),
  arithmeticTemplate({
    key: "y9l10.translationImageX", levelKey: "Y9L10", objectiveCode: "Y9-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-9, 9], [-9, 9], [-8, 8], [-8, 8]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: [
      "The point ({a}, {b}) is translated by the vector ({c}, {d}). What is the x-coordinate of the image?",
      "Translate ({a}, {b}) by ({c}, {d}). Give the x-coordinate of the new point."
    ],
    explain: (v, r) => [`The top number of the vector moves the point across.`, `${v[0]} + ${v[2]} = ${r}.`],
    hints: () => ["Add the top number of the vector to the x-coordinate; the bottom number only affects y."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) subit la translation de vecteur ({c}, {d}). Quelle est l'abscisse de l'image ?",
        "Applique la translation ({c}, {d}) au point ({a}, {b}). Donne l'abscisse du nouveau point."
      ],
      explain: (v, r) => [`Le nombre du haut du vecteur déplace le point horizontalement.`, `${v[0]} + ${v[2]} = ${r}.`],
      hints: () => ["Ajoute le nombre du haut du vecteur à l'abscisse ; celui du bas n'agit que sur l'ordonnée."]
    },
    declaredVariationSpace: 19 * 19 * 17 * 17
  }),
  arithmeticTemplate({
    key: "y9l10.reflectionImageX", levelKey: "Y9L10", objectiveCode: "Y9-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-14, 14], [-14, 14]], constraint: (v) => v[0]! !== 0,
    compute: (v) => -v[0]!,
    promptTemplates: [
      "The point ({a}, {b}) is reflected in the y-axis. What is the x-coordinate of the image?",
      "Reflect ({a}, {b}) in the y-axis and give the new x-coordinate.",
      "A shape with a vertex at ({a}, {b}) is reflected in the y-axis. Where does that vertex's x-coordinate land?"
    ],
    explain: (v, r) => [`Reflecting in the y-axis keeps y the same and changes the sign of x.`, `${v[0]} becomes ${r}.`],
    hints: () => ["The y-axis is the mirror line, so left becomes right: the sign of x flips."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) est réfléchi par l'axe des ordonnées. Quelle est l'abscisse de l'image ?",
        "Réfléchis ({a}, {b}) par l'axe des ordonnées et donne la nouvelle abscisse.",
        "Une figure ayant un sommet en ({a}, {b}) est réfléchie par l'axe des ordonnées. Où arrive l'abscisse de ce sommet ?"
      ],
      explain: (v, r) => [`La réflexion par l'axe des ordonnées conserve y et change le signe de x.`, `${v[0]} devient ${r}.`],
      hints: () => ["L'axe des ordonnées est le miroir : la gauche devient la droite, donc le signe de x change."]
    },
    declaredVariationSpace: 28 * 29 * 3
  }),
  arithmeticTemplate({
    key: "y9l10.probabilityBothPercent", levelKey: "Y9L10", objectiveCode: "Y9-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 9], [1, 9]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that both happen, as a percentage?",
      "P(A) = {pa}% and P(B) = {pb}%, and A and B are independent. Find P(A and B) as a percentage."
    ],
    explain: (v, r) => [`Multiply along the branches: 0.${v[0]} x 0.${v[1]} = ${((v[0]! * v[1]!) / 100).toFixed(2)}.`, `That is ${r}%.`],
    hints: () => ["Independent events: multiply the two probabilities."],
    fr: {
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité que les deux se produisent, en pourcentage ?",
        "P(A) = {pa}% et P(B) = {pb}%, et A et B sont indépendants. Trouve P(A et B) en pourcentage."
      ],
      explain: (v, r) => [`Multiplie le long des branches : 0,${v[0]} x 0,${v[1]} = ${((v[0]! * v[1]!) / 100).toFixed(2)}.`, `Soit ${r} %.`],
      hints: () => ["Événements indépendants : multiplie les deux probabilités."]
    },
    declaredVariationSpace: 9 * 9 * 2
  }),
  categoricalPoolTemplate({
    key: "y9l10.tfKeyStage3Reasoning", levelKey: "Y9L10", objectiveCode: "Y9-L10-3", difficulty: "REASONING",
    misconceptionTags: ["MIXED_REASONING_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const valid = rng.chance(0.5);
      const a = rng.int(2, 12);
      const b = rng.int(2, 12);
      const validClaims = [
        `${a}^3 x ${a}^${b} is the same as ${a}^${b + 3}`,
        `reflecting a shape never changes the lengths of its sides`,
        `the mean of a data set can be larger than every value except one`,
        `a translation by (${a}, ${b}) followed by one by (${-a}, ${-b}) returns a shape to where it started`,
        `in a right-angled triangle the hypotenuse is always the longest side`
      ];
      const invalidClaims = [
        `${a}^3 x ${a}^${b} is the same as ${a}^${b * 3}`,
        `reflecting a shape makes all of its sides ${a} times longer`,
        `the mean of a data set must be one of the values in the set`,
        `a translation by (${a}, ${b}) followed by one by (${a}, ${b}) returns a shape to where it started`,
        `in a right-angled triangle the hypotenuse is always the shortest side`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Index laws add powers, reflections and translations preserve lengths, and a mean need not be one of the values."
          : "Multiplying powers adds the indices rather than multiplying them, transformations never resize a shape, and the hypotenuse is always the longest side."],
        hints: ["Check each claim against the rule it is testing: index laws, transformations, averages or Pythagoras."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^(\d+)\^3 x (\d+)\^(\d+) is the same as (\d+)\^(\d+)$/, "$1^3 x $2^$3 est la même chose que $4^$5")
          .replace(/^Reflecting a shape never changes the lengths of its sides$/, "Réfléchir une figure ne change jamais la longueur de ses côtés")
          .replace(/^Reflecting a shape makes all of its sides (\d+) times longer$/, "Réfléchir une figure rend tous ses côtés $1 fois plus longs")
          .replace(/^The mean of a data set can be larger than every value except one$/, "La moyenne d'une série peut être supérieure à toutes les valeurs sauf une")
          .replace(/^The mean of a data set must be one of the values in the set$/, "La moyenne d'une série doit être l'une des valeurs de la série")
          .replace(/^A translation by \((.+?)\) followed by one by \((.+?)\) returns a shape to where it started$/, "Une translation de vecteur ($1) suivie d'une translation de vecteur ($2) ramène la figure à sa position de départ")
          .replace(/^In a right-angled triangle the hypotenuse is always the longest side$/, "Dans un triangle rectangle, l'hypoténuse est toujours le plus long côté")
          .replace(/^In a right-angled triangle the hypotenuse is always the shortest side$/, "Dans un triangle rectangle, l'hypoténuse est toujours le plus court côté");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Les lois des indices additionnent les puissances, les réflexions et translations conservent les longueurs, et une moyenne n'est pas forcément une des valeurs."
            : "Multiplier des puissances additionne les indices au lieu de les multiplier, les transformations ne redimensionnent jamais une figure, et l'hypoténuse est toujours le plus long côté."],
          hints: ["Vérifie chaque affirmation avec la règle concernée : lois des indices, transformations, moyennes ou Pythagore."]
        };
      }
    },
    declaredVariationSpace: 2 * 5 * 11 * 11
  })
];

export default level;
