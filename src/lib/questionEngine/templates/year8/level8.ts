import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 8 — "Pythagoras, measurement and geometric reasoning"
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const PLACES = ["a ladder", "a ramp", "a kite string", "a guy rope", "a zip wire", "a roof strut", "a scaffold brace", "a flagpole stay"];
const PLACES_FR = ["une échelle", "une rampe", "un fil de cerf-volant", "un hauban", "une tyrolienne", "une poutre de toit", "une entretoise d'échafaudage", "un câble de mât"];
const ROUND_THINGS = ["a pizza", "a clock face", "a pond", "a trampoline", "a dinner plate", "a roundabout", "a drum skin", "a bike wheel"];
const ROUND_THINGS_FR = ["une pizza", "un cadran d'horloge", "un bassin", "un trampoline", "une assiette", "un rond-point", "une peau de tambour", "une roue de vélo"];
const TRIANGLES = ["ABC", "PQR", "XYZ", "DEF", "KLM", "RST", "LMN", "GHJ"];
const oneDp = (n: number) => n.toFixed(1);

export const level: QuestionTemplateDef[] = [
  // --- Y8-L8-1: Pythagoras' theorem ---
  arithmeticTemplate({
    key: "y8l8.hypotenuseFromTriple", levelKey: "Y8L8", objectiveCode: "Y8-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, q: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has shorter sides of {p} cm and {q} cm. How long is the hypotenuse, in cm?",
      "{ctx} forms a right-angled triangle with shorter sides {p} m and {q} m. How long is the sloping side, in m?",
      "Use Pythagoras' theorem: the legs of a right-angled triangle are {p} mm and {q} mm. Find the hypotenuse, in mm."
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]!, q = t[1] * v[1]!;
      return [`${p}² + ${q}² = ${p * p} + ${q * q} = ${p * p + q * q}.`, `The square root of ${p * p + q * q} is ${r}.`];
    },
    hints: () => ["Square both shorter sides, add them, then take the square root."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a des côtés courts de {p} cm et {q} cm. Quelle est la longueur de l'hypoténuse, en cm ?",
        "{ctx} forme un triangle rectangle avec des côtés courts de {p} m et {q} m. Quelle est la longueur du côté oblique, en m ?",
        "Utilise le théorème de Pythagore : les cathètes d'un triangle rectangle mesurent {p} mm et {q} mm. Trouve l'hypoténuse, en mm."
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, q = t[1] * v[1]!;
        return [`${p}² + ${q}² = ${p * p} + ${q * q} = ${p * p + q * q}.`, `La racine carrée de ${p * p + q * q} est ${r}.`];
      },
      hints: () => ["Élève les deux côtés courts au carré, additionne, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 3 * (1 + PLACES.length)
  }),
  arithmeticTemplate({
    key: "y8l8.shorterSideFromTriple", levelKey: "Y8L8", objectiveCode: "Y8-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "MULTI_STEP", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![1] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, h: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has a hypotenuse of {h} cm and one shorter side of {p} cm. How long is the other shorter side, in cm?",
      "{ctx} is {h} m long and its foot is {p} m from a vertical wall. How high up the wall does it reach, in m?"
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]!, h = t[2] * v[1]!;
      return [`${h}² - ${p}² = ${h * h} - ${p * p} = ${h * h - p * p}.`, `The square root of ${h * h - p * p} is ${r}.`];
    },
    hints: () => ["When you are looking for a shorter side, subtract rather than add."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a une hypoténuse de {h} cm et un côté court de {p} cm. Quelle est la longueur de l'autre côté court, en cm ?",
        "{ctx} mesure {h} m et son pied est à {p} m d'un mur vertical. À quelle hauteur atteint-elle le mur, en m ?"
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, h = t[2] * v[1]!;
        return [`${h}² - ${p}² = ${h * h} - ${p * p} = ${h * h - p * p}.`, `La racine carrée de ${h * h - p * p} est ${r}.`];
      },
      hints: () => ["Quand tu cherches un côté court, soustrais au lieu d'additionner."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 2 * (1 + PLACES.length)
  }),
  arithmeticTemplate({
    key: "y8l8.squareOfHypotenuse", levelKey: "Y8L8", objectiveCode: "Y8-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 30], [2, 30]], compute: (v) => v[0]! * v[0]! + v[1]! * v[1]!,
    promptTemplates: [
      "In a right-angled triangle the shorter sides are {a} cm and {b} cm. What is the value of c² (the hypotenuse squared)?",
      "Using a² + b² = c², what is c² when a = {a} and b = {b}?"
    ],
    explain: (v, r) => [`${v[0]}² = ${v[0]! * v[0]!} and ${v[1]}² = ${v[1]! * v[1]!}.`, `${v[0]! * v[0]!} + ${v[1]! * v[1]!} = ${r}.`],
    hints: () => ["This question stops before the square root — just add the two squares."],
    fr: {
      promptTemplates: [
        "Dans un triangle rectangle, les côtés courts mesurent {a} cm et {b} cm. Que vaut c² (le carré de l'hypoténuse) ?",
        "En utilisant a² + b² = c², que vaut c² quand a = {a} et b = {b} ?"
      ],
      explain: (v, r) => [`${v[0]}² = ${v[0]! * v[0]!} et ${v[1]}² = ${v[1]! * v[1]!}.`, `${v[0]! * v[0]!} + ${v[1]! * v[1]!} = ${r}.`],
      hints: () => ["Cette question s'arrête avant la racine carrée — additionne simplement les deux carrés."]
    },
    declaredVariationSpace: 29 * 29 * 2
  }),
  arithmeticTemplate({
    key: "y8l8.diagonalOfRectangle", levelKey: "Y8L8", objectiveCode: "Y8-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "MULTI_STEP",
    ranges: [[0, TRIPLES.length - 1], [1, 9], [0, 12], [0, 12]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => {
      const t = TRIPLES[v[0]!]!;
      return { x2: v[2]! + t[0] * v[1]!, y2: v[3]! + t[1] * v[1]! };
    },
    promptTemplates: [
      "What is the distance between the points ({c}, {d}) and ({x2}, {y2})?",
      "Points A({c}, {d}) and B({x2}, {y2}) are plotted on a grid. How long is AB?"
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const dx = t[0] * v[1]!, dy = t[1] * v[1]!;
      return [`The horizontal step is ${dx} and the vertical step is ${dy}.`, `${dx}² + ${dy}² = ${dx * dx + dy * dy}, and its square root is ${r}.`];
    },
    hints: () => ["Draw a right-angled triangle: the across and up steps are the two shorter sides."],
    fr: {
      promptTemplates: [
        "Quelle est la distance entre les points ({c}, {d}) et ({x2}, {y2}) ?",
        "Les points A({c}, {d}) et B({x2}, {y2}) sont placés sur un repère. Quelle est la longueur de AB ?"
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const dx = t[0] * v[1]!, dy = t[1] * v[1]!;
        return [`Le déplacement horizontal est ${dx} et le vertical ${dy}.`, `${dx}² + ${dy}² = ${dx * dx + dy * dy}, et sa racine carrée vaut ${r}.`];
      },
      hints: () => ["Trace un triangle rectangle : les déplacements horizontal et vertical sont les deux côtés courts."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 13 * 13
  }),
  categoricalPoolTemplate({
    key: "y8l8.tfRightAngledTriangle", levelKey: "Y8L8", objectiveCode: "Y8-L8-1", difficulty: "REASONING",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const t = rng.pick(TRIPLES);
      const k = rng.int(1, 8);
      const isRight = rng.chance(0.5);
      const a = t[0] * k, b = t[1] * k;
      const c = isRight ? t[2] * k : t[2] * k + rng.int(1, 5);
      return {
        prompt: `A triangle has sides ${a} cm, ${b} cm and ${c} cm, so it is right-angled. True or false?`,
        correctLabel: isRight ? "True" : "False",
        distractorLabels: [isRight ? "False" : "True"],
        explanationSteps: [
          `${a}² + ${b}² = ${a * a + b * b}, and ${c}² = ${c * c}.`,
          isRight ? "The two match, so the triangle is right-angled." : "They do not match, so the triangle is not right-angled."
        ],
        hints: ["Square the two shorter sides, add them, and compare with the square of the longest side."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A triangle has sides (.+?), (.+?) and (.+?), so it is right-angled\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un triangle a des côtés de ${m[1]}, ${m[2]} et ${m[3]}, donc il est rectangle. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Élève les deux côtés courts au carré, additionne, et compare avec le carré du plus long côté."]
        };
      }
    },
    declaredVariationSpace: 2 * TRIPLES.length * 8 * 5
  }),

  // --- Y8-L8-2: circumference and area of circles ---
  arithmeticTemplate({
    key: "y8l8.circumferenceInTermsOfPi", levelKey: "Y8L8", objectiveCode: "Y8-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[1, 60]], compute: (v) => 2 * v[0]!,
    promptTemplates: [
      "A circle has radius {a} cm. Its circumference is ___π cm. What number is missing?",
      "{ctx} has a radius of {a} cm. Give its circumference as a multiple of π: ___π cm.",
      "Write the circumference of a circle of radius {a} cm in the form ___π cm."
    ],
    explain: (v, r) => [`Circumference = 2πr = 2 x π x ${v[0]} = ${r}π cm.`],
    hints: () => ["Circumference uses 2πr — double the radius and keep π."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un rayon de {a} cm. Sa circonférence est ___π cm. Quel nombre manque ?",
        "{ctx} a un rayon de {a} cm. Donne sa circonférence comme un multiple de π : ___π cm.",
        "Écris la circonférence d'un cercle de rayon {a} cm sous la forme ___π cm."
      ],
      explain: (v, r) => [`Circonférence = 2πr = 2 x π x ${v[0]} = ${r}π cm.`],
      hints: () => ["La circonférence utilise 2πr — double le rayon et garde π."]
    },
    declaredVariationSpace: 60 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y8l8.circleAreaInTermsOfPi", levelKey: "Y8L8", objectiveCode: "Y8-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[1, 40]], compute: (v) => v[0]! * v[0]!,
    promptTemplates: [
      "A circle has radius {a} cm. Its area is ___π cm². What number is missing?",
      "{ctx} is a circle of radius {a} cm. Give its area as a multiple of π: ___π cm².",
      "Write the area of a circle of radius {a} cm in the form ___π cm²."
    ],
    explain: (v, r) => [`Area = πr² = π x ${v[0]}² = ${r}π cm².`],
    hints: () => ["Area uses πr² — square the radius, do not double it."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un rayon de {a} cm. Son aire est ___π cm². Quel nombre manque ?",
        "{ctx} est un cercle de rayon {a} cm. Donne son aire comme un multiple de π : ___π cm².",
        "Écris l'aire d'un cercle de rayon {a} cm sous la forme ___π cm²."
      ],
      explain: (v, r) => [`Aire = πr² = π x ${v[0]}² = ${r}π cm².`],
      hints: () => ["L'aire utilise πr² — élève le rayon au carré, ne le double pas."]
    },
    declaredVariationSpace: 40 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y8l8.circleAreaRounded", levelKey: "Y8L8", objectiveCode: "Y8-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "MULTI_STEP", contextPool: ROUND_THINGS,
    ranges: [[1, 30]], compute: (v) => Math.PI * v[0]! * v[0]!, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]! }),
    promptTemplates: [
      "A circle has radius {rad} cm. What is its area in cm², to 1 decimal place?",
      "{ctx} is a circle of radius {rad} m. What is its area in m², to 1 decimal place?",
      "Work out the area of a circle of radius {rad} cm, in cm² to 1 decimal place."
    ],
    explain: (v, r) => [`Area = π x ${v[0]}² = π x ${v[0]! * v[0]!}.`, `That is ${r} cm² to 1 decimal place.`],
    hints: () => ["Square the radius first, then multiply by π — never the other way round."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un rayon de {rad} cm. Quelle est son aire en cm², au dixième près ?",
        "{ctx} est un cercle de rayon {rad} m. Quelle est son aire en m², au dixième près ?",
        "Calcule l'aire d'un cercle de rayon {rad} cm, en cm² au dixième près."
      ],
      explain: (v, r) => [`Aire = π x ${v[0]}² = π x ${v[0]! * v[0]!}.`, `Soit ${r} cm² au dixième près.`],
      hints: () => ["Élève d'abord le rayon au carré, puis multiplie par π — jamais l'inverse."]
    },
    declaredVariationSpace: 30 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y8l8.radiusFromDiameter", levelKey: "Y8L8", objectiveCode: "Y8-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["CIRCLE_FORMULA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: ROUND_THINGS,
    ranges: [[1, 100]], compute: (v) => v[0]!,
    derive: (v) => ({ dia: 2 * v[0]! }),
    promptTemplates: [
      "A circle has a diameter of {dia} cm. What is its radius, in cm?",
      "{ctx} measures {dia} cm right across through its centre. What is its radius, in cm?",
      "The distance across a circle through the centre is {dia} m. How long is the radius, in m?"
    ],
    explain: (v, r) => [`The radius is half the diameter.`, `${2 * v[0]!} ÷ 2 = ${r} cm.`],
    hints: () => ["Circle formulas use the radius, so halve the diameter before you start."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un cercle a un diamètre de {dia} cm. Quel est son rayon, en cm ?",
        "{ctx} mesure {dia} cm de part en part en passant par le centre. Quel est son rayon, en cm ?",
        "La distance à travers un cercle par le centre est {dia} m. Quelle est la longueur du rayon, en m ?"
      ],
      explain: (v, r) => [`Le rayon est la moitié du diamètre.`, `${2 * v[0]!} ÷ 2 = ${r} cm.`],
      hints: () => ["Les formules du cercle utilisent le rayon : divise d'abord le diamètre par 2."]
    },
    declaredVariationSpace: 100 * (1 + 2 * ROUND_THINGS.length)
  }),
  arithmeticTemplate({
    key: "y8l8.semicirclePerimeter", levelKey: "Y8L8", objectiveCode: "Y8-L8-2", difficulty: "REASONING",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "MULTI_STEP", contextPool: ROUND_THINGS,
    ranges: [[2, 40]], compute: (v) => Math.PI * v[0]! + 2 * v[0]!, formatValue: oneDp,
    derive: (v) => ({ rad: v[0]! }),
    promptTemplates: [
      "A semicircle has radius {rad} cm. What is its full perimeter, in cm to 1 decimal place?",
      "{ctx} is cut in half to make a semicircle of radius {rad} cm. What is the perimeter of that semicircle, in cm to 1 decimal place?",
      "A half-circle of radius {rad} cm is edged all the way round. How much edging is needed, in cm to 1 decimal place?"
    ],
    explain: (v, r) => [`The curved edge is half the circumference: π x ${v[0]}.`, `Add the straight diameter of ${2 * v[0]!} cm to get ${r} cm.`],
    hints: () => ["Do not forget the straight edge across the bottom of a semicircle."],
    fr: {
      contextPool: ROUND_THINGS_FR,
      promptTemplates: [
        "Un demi-cercle a un rayon de {rad} cm. Quel est son périmètre complet, en cm au dixième près ?",
        "{ctx} est coupé en deux pour faire un demi-cercle de rayon {rad} cm. Quel est le périmètre de ce demi-cercle, en cm au dixième près ?",
        "Un demi-cercle de rayon {rad} cm est bordé tout autour. Quelle longueur de bordure faut-il, en cm au dixième près ?"
      ],
      explain: (v, r) => [`Le bord courbe est la moitié de la circonférence : π x ${v[0]}.`, `Ajoute le diamètre droit de ${2 * v[0]!} cm pour obtenir ${r} cm.`],
      hints: () => ["N'oublie pas le bord droit en bas d'un demi-cercle."]
    },
    declaredVariationSpace: 39 * (1 + 2 * ROUND_THINGS.length)
  }),

  // --- Y8-L8-3: geometric reasoning with reasons ---
  arithmeticTemplate({
    key: "y8l8.isoscelesBaseAngle", levelKey: "Y8L8", objectiveCode: "Y8-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP", contextPool: TRIANGLES,
    ranges: [[20, 160]], constraint: (v) => v[0]! % 2 === 0,
    compute: (v) => (180 - v[0]!) / 2,
    promptTemplates: [
      "Triangle {ctx} is isosceles with an apex angle of {a}°. What is each base angle, in degrees?",
      "An isosceles triangle {ctx} has an apex angle of {a}°. Work out a base angle, giving your answer in degrees.",
      "In isosceles triangle {ctx} the two equal sides meet at {a}°. Find a base angle, in degrees."
    ],
    explain: (v, r) => [`The base angles are equal (isosceles triangle).`, `(180 - ${v[0]}) ÷ 2 = ${r}° (angles in a triangle add to 180°).`],
    hints: () => ["Take the apex angle from 180°, then halve what is left."],
    fr: {
      contextPool: TRIANGLES,
      promptTemplates: [
        "Le triangle {ctx} est isocèle avec un angle au sommet de {a}°. Combien mesure chaque angle à la base, en degrés ?",
        "Un triangle isocèle {ctx} a un angle au sommet de {a}°. Calcule un angle à la base, en degrés.",
        "Dans le triangle isocèle {ctx}, les deux côtés égaux se rejoignent à {a}°. Trouve un angle à la base, en degrés."
      ],
      explain: (v, r) => [`Les angles à la base sont égaux (triangle isocèle).`, `(180 - ${v[0]}) ÷ 2 = ${r}° (la somme des angles d'un triangle vaut 180°).`],
      hints: () => ["Retire l'angle au sommet de 180°, puis divise le reste par 2."]
    },
    declaredVariationSpace: 71 * 3 * TRIANGLES.length
  }),
  arithmeticTemplate({
    key: "y8l8.coInteriorAngle", levelKey: "Y8L8", objectiveCode: "Y8-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["PARALLEL_LINE_ANGLE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[20, 160]], compute: (v) => 180 - v[0]!,
    promptTemplates: [
      "Two parallel lines are crossed by a transversal. One co-interior angle is {a}°. What is the other, in degrees?",
      "An allied (co-interior) angle between two parallel lines measures {a}°. What is its partner, in degrees?",
      "Angle x and an angle of {a}° are co-interior between parallel lines. What is x, in degrees?"
    ],
    explain: (v, r) => [`Co-interior angles between parallel lines add to 180°.`, `180 - ${v[0]} = ${r}°.`],
    hints: () => ["Look for the C shape — co-interior angles sum to 180°."],
    fr: {
      promptTemplates: [
        "Deux droites parallèles sont coupées par une sécante. Un angle co-intérieur mesure {a}°. Quel est l'autre, en degrés ?",
        "Un angle allié (co-intérieur) entre deux droites parallèles mesure {a}°. Quel est son partenaire, en degrés ?",
        "L'angle x et un angle de {a}° sont co-intérieurs entre des parallèles. Que vaut x, en degrés ?"
      ],
      explain: (v, r) => [`Les angles co-intérieurs entre parallèles ont pour somme 180°.`, `180 - ${v[0]} = ${r}°.`],
      hints: () => ["Cherche la forme en C — les angles co-intérieurs ont pour somme 180°."]
    },
    declaredVariationSpace: 141 * 3
  }),
  arithmeticTemplate({
    key: "y8l8.polygonInteriorAngleSum", levelKey: "Y8L8", objectiveCode: "Y8-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 60]], compute: (v) => (v[0]! - 2) * 180,
    promptTemplates: [
      "What is the sum of the interior angles of a polygon with {a} sides, in degrees?",
      "A polygon has {a} sides. Work out the total of its interior angles, in degrees.",
      "Use (n - 2) x 180 to find the interior angle sum of a {a}-sided polygon, in degrees.",
      "A closed shape has {a} straight sides. What do its interior angles add up to, in degrees?"
    ],
    explain: (v, r) => [`(${v[0]} - 2) x 180 = ${v[0]! - 2} x 180 = ${r}°.`],
    hints: () => ["Split the polygon into triangles from one vertex: an n-sided polygon gives n - 2 triangles."],
    fr: {
      promptTemplates: [
        "Quelle est la somme des angles intérieurs d'un polygone à {a} côtés, en degrés ?",
        "Un polygone a {a} côtés. Calcule la somme de ses angles intérieurs, en degrés.",
        "Utilise (n - 2) x 180 pour trouver la somme des angles intérieurs d'un polygone à {a} côtés, en degrés.",
        "Une figure fermée a {a} côtés droits. Quelle est la somme de ses angles intérieurs, en degrés ?"
      ],
      explain: (v, r) => [`(${v[0]} - 2) x 180 = ${v[0]! - 2} x 180 = ${r}°.`],
      hints: () => ["Découpe le polygone en triangles depuis un sommet : un polygone à n côtés en donne n - 2."]
    },
    declaredVariationSpace: 58 * 4
  }),
  categoricalPoolTemplate({
    key: "y8l8.mcAngleReason", levelKey: "Y8L8", objectiveCode: "Y8-L8-3", difficulty: "REASONING",
    misconceptionTags: ["PARALLEL_LINE_ANGLE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { reason: ["alternate angles are equal", "corresponding angles are equal", "vertically opposite angles are equal", "co-interior angles add to 180°", "angles on a straight line add to 180°"] },
    build: (picked, rng) => {
      const ang = rng.int(25, 155);
      const reason = picked.reason!;
      const setups: Record<string, string> = {
        "alternate angles are equal": `x and an angle of ${ang}° sit on opposite sides of a transversal between two parallel lines, and x = ${ang}°`,
        "corresponding angles are equal": `x and an angle of ${ang}° sit in matching positions where a transversal crosses two parallel lines, and x = ${ang}°`,
        "vertically opposite angles are equal": `x and an angle of ${ang}° are opposite each other where two straight lines cross, and x = ${ang}°`,
        "co-interior angles add to 180°": `x and an angle of ${ang}° lie inside a C shape between two parallel lines, and x = ${180 - ang}°`,
        "angles on a straight line add to 180°": `x and an angle of ${ang}° together make a straight line, and x = ${180 - ang}°`
      };
      return {
        prompt: `In a diagram, ${setups[reason]}. Which reason justifies this?`,
        correctLabel: reason,
        distractorLabels: Object.keys(setups).filter((rr) => rr !== reason).slice(0, 3),
        explanationSteps: [`The positions of the angles make this exactly the case where ${reason}.`],
        hints: ["Look for the Z shape (alternate), the F shape (corresponding) or the C shape (co-interior)."]
      };
    },
    fr: {
      translate: (drawn) => {
        const reasonsFr: Record<string, string> = {
          "alternate angles are equal": "les angles alternes-internes sont égaux",
          "corresponding angles are equal": "les angles correspondants sont égaux",
          "vertically opposite angles are equal": "les angles opposés par le sommet sont égaux",
          "co-interior angles add to 180°": "les angles co-intérieurs ont pour somme 180°",
          "angles on a straight line add to 180°": "les angles sur une droite ont pour somme 180°"
        };
        const m = drawn.prompt.match(/^In a diagram, (.+)\. Which reason justifies this\?$/);
        const setupFr = (m ? m[1]! : "")
          .replace(/^x and an angle of (\d+)° sit on opposite sides of a transversal between two parallel lines/, "x et un angle de $1° sont de part et d'autre d'une sécante entre deux parallèles")
          .replace(/^x and an angle of (\d+)° sit in matching positions where a transversal crosses two parallel lines/, "x et un angle de $1° occupent des positions correspondantes là où une sécante coupe deux parallèles")
          .replace(/^x and an angle of (\d+)° are opposite each other where two straight lines cross/, "x et un angle de $1° sont opposés l'un à l'autre au croisement de deux droites")
          .replace(/^x and an angle of (\d+)° lie inside a C shape between two parallel lines/, "x et un angle de $1° sont à l'intérieur d'un C entre deux parallèles")
          .replace(/^x and an angle of (\d+)° together make a straight line/, "x et un angle de $1° forment ensemble une droite")
          .replace(/, and x = /, ", et x = ");
        return {
          prompt: `Sur un schéma, ${setupFr}. Quelle raison justifie cela ?`,
          correctLabel: reasonsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => reasonsFr[d] ?? d),
          hints: ["Cherche la forme en Z (alternes-internes), en F (correspondants) ou en C (co-intérieurs)."]
        };
      }
    },
    declaredVariationSpace: 5 * 131
  }),
  arithmeticTemplate({
    key: "y8l8.exteriorAngleOfTriangle", levelKey: "Y8L8", objectiveCode: "Y8-L8-3", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP", contextPool: TRIANGLES,
    ranges: [[20, 110], [20, 110]], constraint: (v) => v[0]! + v[1]! < 170,
    compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "In triangle {ctx}, two interior angles are {a}° and {b}°. What is the exterior angle at the third vertex, in degrees?",
      "Two angles of a triangle are {a}° and {b}°. The exterior angle at the remaining vertex equals their sum. What is it, in degrees?"
    ],
    explain: (v, r) => [
      `The third interior angle is 180 - ${v[0]} - ${v[1]} = ${180 - v[0]! - v[1]!}°.`,
      `The exterior angle is 180 - ${180 - v[0]! - v[1]!} = ${r}°, which is the sum of the two opposite interior angles.`
    ],
    hints: () => ["The exterior angle of a triangle equals the sum of the two interior angles it is not next to."],
    fr: {
      contextPool: TRIANGLES,
      promptTemplates: [
        "Dans le triangle {ctx}, deux angles intérieurs valent {a}° et {b}°. Quel est l'angle extérieur au troisième sommet, en degrés ?",
        "Deux angles d'un triangle valent {a}° et {b}°. L'angle extérieur au sommet restant est égal à leur somme. Combien vaut-il, en degrés ?"
      ],
      explain: (v, r) => [
        `Le troisième angle intérieur est 180 - ${v[0]} - ${v[1]} = ${180 - v[0]! - v[1]!}°.`,
        `L'angle extérieur vaut 180 - ${180 - v[0]! - v[1]!} = ${r}°, soit la somme des deux angles intérieurs opposés.`
      ],
      hints: () => ["L'angle extérieur d'un triangle est égal à la somme des deux angles intérieurs non adjacents."]
    },
    declaredVariationSpace: 91 * 91 * 2
  })
];

export default level;
