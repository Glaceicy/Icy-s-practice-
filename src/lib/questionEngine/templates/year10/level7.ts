import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 7 — "Pythagoras and trigonometry"
// Pythagorean triples keep 2D answers exact; the cuboid table keeps 3D space
// diagonals exact (a² + b² + c² is a perfect square in every row).
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37], [28, 45, 53]];
const CUBOIDS: Array<[number, number, number, number]> = [
  [1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13],
  [2, 5, 14, 15], [2, 10, 11, 15], [1, 12, 12, 17], [8, 9, 12, 17], [6, 10, 15, 19], [4, 13, 16, 21]
];
const PLACES = ["a ramp", "a roof truss", "a ladder", "a guy rope", "a zip wire", "a flagpole stay", "a scaffold brace", "a kite string"];
const PLACES_FR = ["une rampe", "une ferme de toit", "une échelle", "un hauban", "une tyrolienne", "un câble de mât", "une entretoise d'échafaudage", "un fil de cerf-volant"];
const BOXES = ["a packing crate", "a fish tank", "a lift shaft", "a storage box", "a wardrobe", "a shipping container"];
const BOXES_FR = ["une caisse d'emballage", "un aquarium", "une cage d'ascenseur", "un coffre de rangement", "une armoire", "un conteneur maritime"];
const EXACT_VALUES: Record<string, string> = {
  "sin 0°": "0", "cos 0°": "1", "tan 0°": "0",
  "sin 30°": "1/2", "cos 30°": "√3/2", "tan 30°": "1/√3",
  "sin 45°": "√2/2", "cos 45°": "√2/2", "tan 45°": "1",
  "sin 60°": "√3/2", "cos 60°": "1/2", "tan 60°": "√3",
  "sin 90°": "1", "cos 90°": "0"
};
const ALL_VALUES = ["0", "1", "1/2", "√3/2", "1/√3", "√2/2", "√3"];
const oneDp = (n: number) => n.toFixed(1);
const rad = (deg: number) => (deg * Math.PI) / 180;

export const level: QuestionTemplateDef[] = [
  // --- Y10-L7-1: Pythagoras and trigonometric ratios in 2D and 3D ---
  arithmeticTemplate({
    key: "y10l7.hypotenuseFromTriple", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, q: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has shorter sides of {p} cm and {q} cm. How long is the hypotenuse, in cm?",
      "{Ctx} forms a right-angled triangle with shorter sides {p} m and {q} m. How long is the sloping side, in m?",
      "The two legs of a right-angled triangle are {p} mm and {q} mm. Use Pythagoras' theorem to find the hypotenuse, in mm."
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
        "{Ctx} forme un triangle rectangle avec des côtés courts de {p} m et {q} m. Quelle est la longueur du côté oblique, en m ?",
        "Les deux cathètes d'un triangle rectangle mesurent {p} mm et {q} mm. Utilise le théorème de Pythagore pour trouver l'hypoténuse, en mm."
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, q = t[1] * v[1]!;
        return [`${p}² + ${q}² = ${p * p} + ${q * q} = ${p * p + q * q}.`, `La racine carrée de ${p * p + q * q} est ${r}.`];
      },
      hints: () => ["Élève les deux côtés courts au carré, additionne, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 3
  }),
  arithmeticTemplate({
    key: "y10l7.shorterSideFromTriple", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 9]],
    compute: (v) => TRIPLES[v[0]!]![1] * v[1]!,
    derive: (v) => ({ p: TRIPLES[v[0]!]![0] * v[1]!, h: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: [
      "A right-angled triangle has a hypotenuse of {h} cm and one shorter side of {p} cm. How long is the other shorter side, in cm?",
      "{Ctx} is {h} m long and reaches a point {p} m from the base of a vertical wall. How high up the wall does it reach, in m?",
      "In a right-angled triangle the hypotenuse is {h} mm and a leg is {p} mm. Find the remaining leg, in mm."
    ],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const p = t[0] * v[1]!, h = t[2] * v[1]!;
      return [`${h}² - ${p}² = ${h * h} - ${p * p} = ${h * h - p * p}.`, `The square root of ${h * h - p * p} is ${r}.`];
    },
    hints: () => ["This time subtract: square the hypotenuse, take away the square of the known leg, then square root."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a une hypoténuse de {h} cm et un côté court de {p} cm. Quelle est la longueur de l'autre côté court, en cm ?",
        "{Ctx} mesure {h} m et atteint un point situé à {p} m du pied d'un mur vertical. À quelle hauteur sur le mur arrive-t-elle, en m ?",
        "Dans un triangle rectangle, l'hypoténuse mesure {h} mm et une cathète {p} mm. Trouve la cathète restante, en mm."
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const p = t[0] * v[1]!, h = t[2] * v[1]!;
        return [`${h}² - ${p}² = ${h * h} - ${p * p} = ${h * h - p * p}.`, `La racine carrée de ${h * h - p * p} est ${r}.`];
      },
      hints: () => ["Cette fois, soustrais : élève l'hypoténuse au carré, retire le carré de la cathète connue, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 9 * 3
  }),
  arithmeticTemplate({
    key: "y10l7.spaceDiagonalOfCuboid", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "REASONING",
    misconceptionTags: ["PYTHAGORAS_3D_ERROR"], type: "MULTI_STEP", contextPool: BOXES,
    ranges: [[0, CUBOIDS.length - 1], [1, 8]],
    compute: (v) => CUBOIDS[v[0]!]![3] * v[1]!,
    derive: (v) => {
      const c = CUBOIDS[v[0]!]!;
      return { p: c[0] * v[1]!, q: c[1] * v[1]!, s: c[2] * v[1]! };
    },
    promptTemplates: [
      "A cuboid measures {p} cm by {q} cm by {s} cm. How long is the longest straight rod that fits inside it, in cm?",
      "{Ctx} is a cuboid {p} cm by {q} cm by {s} cm. Find the length of its space diagonal, in cm."
    ],
    explain: (v, r) => {
      const c = CUBOIDS[v[0]!]!;
      const p = c[0] * v[1]!, q = c[1] * v[1]!, s = c[2] * v[1]!;
      return [
        `First the base diagonal: ${p}² + ${q}² = ${p * p + q * q}.`,
        `Then the space diagonal: ${p * p + q * q} + ${s}² = ${p * p + q * q + s * s}.`,
        `The square root of ${p * p + q * q + s * s} is ${r} cm.`
      ];
    },
    hints: () => ["Use Pythagoras twice: first across the base, then up to the opposite corner. In 3D the shortcut is √(a² + b² + c²)."],
    fr: {
      contextPool: BOXES_FR,
      promptTemplates: [
        "Un pavé droit mesure {p} cm sur {q} cm sur {s} cm. Quelle est la longueur de la plus longue tige droite qui tient à l'intérieur, en cm ?",
        "{Ctx} est un pavé droit de {p} cm sur {q} cm sur {s} cm. Trouve la longueur de sa diagonale d'espace, en cm."
      ],
      explain: (v, r) => {
        const c = CUBOIDS[v[0]!]!;
        const p = c[0] * v[1]!, q = c[1] * v[1]!, s = c[2] * v[1]!;
        return [
          `D'abord la diagonale de la base : ${p}² + ${q}² = ${p * p + q * q}.`,
          `Puis la diagonale d'espace : ${p * p + q * q} + ${s}² = ${p * p + q * q + s * s}.`,
          `La racine carrée de ${p * p + q * q + s * s} est ${r} cm.`
        ];
      },
      hints: () => ["Applique Pythagore deux fois : d'abord sur la base, puis jusqu'au sommet opposé. En 3D, le raccourci est √(a² + b² + c²)."]
    },
    declaredVariationSpace: CUBOIDS.length * 8 * 2
  }),
  arithmeticTemplate({
    key: "y10l7.distanceBetweenCoordinates", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[0, TRIPLES.length - 1], [1, 5], [0, 12], [0, 12]],
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
      return [`The horizontal step is ${dx} and the vertical step is ${dy}.`, `${dx}² + ${dy}² = ${dx * dx + dy * dy}, and the square root of that is ${r}.`];
    },
    hints: () => ["Draw a right-angled triangle: the horizontal and vertical steps are the two shorter sides."],
    fr: {
      promptTemplates: [
        "Quelle est la distance entre les points ({c}, {d}) et ({x2}, {y2}) ?",
        "Les points A({c}, {d}) et B({x2}, {y2}) sont placés sur un repère. Quelle est la longueur de AB ?"
      ],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const dx = t[0] * v[1]!, dy = t[1] * v[1]!;
        return [`Le déplacement horizontal est ${dx} et le déplacement vertical ${dy}.`, `${dx}² + ${dy}² = ${dx * dx + dy * dy}, et sa racine carrée vaut ${r}.`];
      },
      hints: () => ["Trace un triangle rectangle : les déplacements horizontal et vertical sont les deux côtés courts."]
    },
    declaredVariationSpace: TRIPLES.length * 5 * 13 * 13
  }),
  arithmeticTemplate({
    key: "y10l7.oppositeSideFromAngle", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_CHOICE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[20, 70], [5, 40]], compute: (v) => v[1]! * Math.sin(rad(v[0]!)), formatValue: oneDp,
    derive: (v) => ({ ang: v[0]!, hyp: v[1]! }),
    promptTemplates: [
      "A right-angled triangle has a hypotenuse of {hyp} cm and an angle of {ang}°. How long is the side opposite that angle, in cm to 1 decimal place?",
      "{Ctx} is {hyp} m long and makes an angle of {ang}° with the ground. How high is its top above the ground, in m to 1 decimal place?"
    ],
    explain: (v, r) => [`Opposite = hypotenuse x sin(angle).`, `${v[1]} x sin ${v[0]}° = ${r} cm.`],
    hints: () => ["SOH: sin = opposite ÷ hypotenuse, so opposite = hypotenuse x sin(angle)."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a une hypoténuse de {hyp} cm et un angle de {ang}°. Quelle est la longueur du côté opposé à cet angle, en cm au dixième près ?",
        "{Ctx} mesure {hyp} m et forme un angle de {ang}° avec le sol. À quelle hauteur se trouve son sommet, en m au dixième près ?"
      ],
      explain: (v, r) => [`Opposé = hypoténuse x sin(angle).`, `${v[1]} x sin ${v[0]}° = ${r} cm.`],
      hints: () => ["SOH : sin = opposé ÷ hypoténuse, donc opposé = hypoténuse x sin(angle)."]
    },
    declaredVariationSpace: 51 * 36
  }),
  arithmeticTemplate({
    key: "y10l7.adjacentSideFromAngle", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_CHOICE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[20, 70], [5, 40]], compute: (v) => v[1]! * Math.cos(rad(v[0]!)), formatValue: oneDp,
    derive: (v) => ({ ang: v[0]!, hyp: v[1]! }),
    promptTemplates: [
      "A right-angled triangle has a hypotenuse of {hyp} cm and an angle of {ang}°. How long is the side adjacent to that angle, in cm to 1 decimal place?",
      "{Ctx} is {hyp} m long and leans at {ang}° to the ground. How far is its foot from the wall, in m to 1 decimal place?"
    ],
    explain: (v, r) => [`Adjacent = hypotenuse x cos(angle).`, `${v[1]} x cos ${v[0]}° = ${r} cm.`],
    hints: () => ["CAH: cos = adjacent ÷ hypotenuse, so adjacent = hypotenuse x cos(angle)."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Un triangle rectangle a une hypoténuse de {hyp} cm et un angle de {ang}°. Quelle est la longueur du côté adjacent à cet angle, en cm au dixième près ?",
        "{Ctx} mesure {hyp} m et s'incline à {ang}° par rapport au sol. À quelle distance du mur se trouve son pied, en m au dixième près ?"
      ],
      explain: (v, r) => [`Adjacent = hypoténuse x cos(angle).`, `${v[1]} x cos ${v[0]}° = ${r} cm.`],
      hints: () => ["CAH : cos = adjacent ÷ hypoténuse, donc adjacent = hypoténuse x cos(angle)."]
    },
    declaredVariationSpace: 51 * 36
  }),
  arithmeticTemplate({
    key: "y10l7.oppositeSideFromTangent", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_CHOICE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[20, 70], [3, 40]], compute: (v) => v[1]! * Math.tan(rad(v[0]!)), formatValue: oneDp,
    derive: (v) => ({ ang: v[0]!, adj: v[1]! }),
    promptTemplates: [
      "In a right-angled triangle the side adjacent to a {ang}° angle is {adj} cm. How long is the opposite side, in cm to 1 decimal place?",
      "You stand {adj} m from the base of {ctx} and look up at {ang}° to its top. How tall is it, in m to 1 decimal place?"
    ],
    explain: (v, r) => [`Opposite = adjacent x tan(angle).`, `${v[1]} x tan ${v[0]}° = ${r} cm.`],
    hints: () => ["TOA: tan = opposite ÷ adjacent, so opposite = adjacent x tan(angle)."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Dans un triangle rectangle, le côté adjacent à un angle de {ang}° mesure {adj} cm. Quelle est la longueur du côté opposé, en cm au dixième près ?",
        "Tu te tiens à {adj} m du pied {de:ctx} et tu regardes son sommet à {ang}°. Quelle est sa hauteur, en m au dixième près ?"
      ],
      explain: (v, r) => [`Opposé = adjacent x tan(angle).`, `${v[1]} x tan ${v[0]}° = ${r} cm.`],
      hints: () => ["TOA : tan = opposé ÷ adjacent, donc opposé = adjacent x tan(angle)."]
    },
    declaredVariationSpace: 51 * 38
  }),
  arithmeticTemplate({
    key: "y10l7.angleOfElevation", levelKey: "Y10L7", objectiveCode: "Y10-L7-1", difficulty: "REASONING",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[2, 30], [2, 30]],
    compute: (v) => Math.round((Math.atan(v[0]! / v[1]!) * 180) / Math.PI),
    promptTemplates: [
      "{Ctx} rises {a} m vertically over a horizontal distance of {b} m. What is its angle of elevation, to the nearest degree?",
      "A slope climbs {a} m for every {b} m travelled horizontally. What angle does it make with the horizontal, to the nearest degree?"
    ],
    explain: (v, r) => [`tan(angle) = ${v[0]} ÷ ${v[1]} = ${(v[0]! / v[1]!).toFixed(4)}.`, `Inverse tangent gives ${r}°.`],
    hints: () => ["You know the opposite and the adjacent, so use tan — then inverse tan to get the angle."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "{Ctx} monte de {a} m à la verticale sur une distance horizontale de {b} m. Quel est son angle d'élévation, au degré près ?",
        "Une pente monte de {a} m pour {b} m parcourus horizontalement. Quel angle forme-t-elle avec l'horizontale, au degré près ?"
      ],
      explain: (v, r) => [`tan(angle) = ${v[0]} ÷ ${v[1]} = ${(v[0]! / v[1]!).toFixed(4)}.`, `La tangente inverse donne ${r}°.`],
      hints: () => ["Tu connais l'opposé et l'adjacent : utilise tan, puis la tangente inverse pour trouver l'angle."]
    },
    declaredVariationSpace: 29 * 29
  }),

  // --- Y10-L7-2: non-right-angled triangles (sine rule, cosine rule, area) ---
  arithmeticTemplate({
    key: "y10l7.areaFromBaseHeight", levelKey: "Y10L7", objectiveCode: "Y10-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["TRIANGLE_AREA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 40], [2, 40]], constraint: (v) => (v[0]! * v[1]!) % 2 === 0,
    compute: (v) => (v[0]! * v[1]!) / 2,
    promptTemplates: [
      "A triangle has a base of {a} cm and a perpendicular height of {b} cm. What is its area, in cm²?",
      "Use area = ½ x base x height to find the area of a triangle with base {a} cm and height {b} cm, in cm².",
      "A triangular flag is {a} cm along the bottom and {b} cm tall. What area of fabric does it use, in cm²?"
    ],
    explain: (v, r) => [`½ x ${v[0]} x ${v[1]} = ${r} cm².`],
    hints: () => ["Multiply base by perpendicular height, then halve. When you only know two sides and the angle between them, use ½ab sin C instead."],
    fr: {
      promptTemplates: [
        "Un triangle a une base de {a} cm et une hauteur perpendiculaire de {b} cm. Quelle est son aire, en cm² ?",
        "Utilise aire = ½ x base x hauteur pour trouver l'aire d'un triangle de base {a} cm et de hauteur {b} cm, en cm².",
        "Un drapeau triangulaire mesure {a} cm en bas et {b} cm de haut. Quelle aire de tissu utilise-t-il, en cm² ?"
      ],
      explain: (v, r) => [`½ x ${v[0]} x ${v[1]} = ${r} cm².`],
      hints: () => ["Multiplie la base par la hauteur perpendiculaire, puis divise par 2. Si tu ne connais que deux côtés et l'angle entre eux, utilise ½ab sin C."]
    },
    declaredVariationSpace: 39 * 39
  }),
  categoricalPoolTemplate({
    key: "y10l7.mcChooseTriangleRule", levelKey: "Y10L7", objectiveCode: "Y10-L7-2", difficulty: "REASONING",
    misconceptionTags: ["TRIG_RULE_CHOICE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { given: ["two angles and a side", "two sides and the angle between them", "three sides", "a right angle and two sides"] },
    build: (picked, rng) => {
      const a = rng.int(4, 25);
      const b = rng.int(5, 26);
      const ang = rng.int(25, 140);
      const rules: Record<string, string> = {
        "two angles and a side": "the sine rule",
        "two sides and the angle between them": "the cosine rule",
        "three sides": "the cosine rule",
        "a right angle and two sides": "Pythagoras' theorem"
      };
      const setups: Record<string, string> = {
        "two angles and a side": `angles of ${ang}° and ${Math.min(170 - ang, 60)}° and a side of ${a} cm`,
        "two sides and the angle between them": `sides of ${a} cm and ${b} cm with an angle of ${ang}° between them`,
        "three sides": `sides of ${a} cm, ${b} cm and ${a + b - 2} cm`,
        "a right angle and two sides": `a right angle with sides of ${a} cm and ${b} cm`
      };
      const given = picked.given!;
      const correct = rules[given]!;
      const allRules = ["the sine rule", "the cosine rule", "Pythagoras' theorem", "the area formula ½ab sin C"];
      return {
        prompt: `A triangle is described by ${setups[given]}. Which rule finds the remaining side or angle most directly?`,
        correctLabel: correct,
        distractorLabels: allRules.filter((r) => r !== correct).slice(0, 3),
        explanationSteps: [`With ${given}, ${correct} is the one that links exactly those pieces of information.`],
        hints: ["The sine rule pairs each side with its opposite angle; the cosine rule handles three sides, or two sides and the angle between them."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const rulesFr: Record<string, string> = {
          "the sine rule": "la loi des sinus",
          "the cosine rule": "la loi des cosinus",
          "Pythagoras' theorem": "le théorème de Pythagore",
          "the area formula ½ab sin C": "la formule d'aire ½ab sin C"
        };
        const givenFr: Record<string, string> = {
          "two angles and a side": "deux angles et un côté",
          "two sides and the angle between them": "deux côtés et l'angle entre eux",
          "three sides": "trois côtés",
          "a right angle and two sides": "un angle droit et deux côtés"
        };
        const m = drawn.prompt.match(/^A triangle is described by (.+)\. Which rule/);
        const setupFr = (m ? m[1]! : "")
          .replace(/^angles of /, "des angles de ")
          .replace(/^sides of /, "des côtés de ")
          .replace(/^a right angle with sides of /, "un angle droit avec des côtés de ")
          .replace(/ with an angle of (.+?) between them/, " avec un angle de $1 entre eux")
          .replace(/ and a side of /, " et un côté de ")
          .replace(/ and /g, " et ");
        return {
          prompt: `Un triangle est décrit par ${setupFr}. Quelle règle permet de trouver le côté ou l'angle manquant le plus directement ?`,
          correctLabel: rulesFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => rulesFr[d] ?? d),
          explanationSteps: [`Avec ${givenFr[picked.given!]}, ${rulesFr[drawn.correctLabel]} relie exactement ces informations.`],
          hints: ["La loi des sinus associe chaque côté à l'angle opposé ; la loi des cosinus traite trois côtés, ou deux côtés et l'angle entre eux."]
        };
      }
    },
    declaredVariationSpace: 4 * 22 * 22 * 116
  }),
  arithmeticTemplate({
    key: "y10l7.sineRuleMissingSide", levelKey: "Y10L7", objectiveCode: "Y10-L7-2", difficulty: "REASONING",
    misconceptionTags: ["SINE_RULE_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[25, 80], [25, 80], [5, 40]], constraint: (v) => v[0]! + v[1]! < 165,
    compute: (v) => (v[2]! * Math.sin(rad(v[1]!))) / Math.sin(rad(v[0]!)), formatValue: oneDp,
    derive: (v) => ({ angA: v[0]!, angB: v[1]!, sideA: v[2]! }),
    promptTemplates: [
      "In triangle ABC, angle A = {angA}°, angle B = {angB}° and side a (opposite A) = {sideA} cm. Use the sine rule to find side b, in cm to 1 decimal place.",
      "A triangle has angles {angA}° and {angB}°. The side opposite the {angA}° angle is {sideA} cm. How long is the side opposite the {angB}° angle, in cm to 1 decimal place?"
    ],
    explain: (v, r) => [
      `The sine rule gives a ÷ sin A = b ÷ sin B.`,
      `b = ${v[2]} x sin ${v[1]}° ÷ sin ${v[0]}° = ${r} cm.`
    ],
    hints: () => ["Pair each side with the angle opposite it, then cross-multiply."],
    fr: {
      promptTemplates: [
        "Dans le triangle ABC, l'angle A = {angA}°, l'angle B = {angB}° et le côté a (opposé à A) = {sideA} cm. Utilise la loi des sinus pour trouver le côté b, en cm au dixième près.",
        "Un triangle a des angles de {angA}° et {angB}°. Le côté opposé à l'angle de {angA}° mesure {sideA} cm. Quelle est la longueur du côté opposé à l'angle de {angB}°, en cm au dixième près ?"
      ],
      explain: (v, r) => [
        `La loi des sinus donne a ÷ sin A = b ÷ sin B.`,
        `b = ${v[2]} x sin ${v[1]}° ÷ sin ${v[0]}° = ${r} cm.`
      ],
      hints: () => ["Associe chaque côté à l'angle qui lui est opposé, puis fais un produit en croix."]
    },
    declaredVariationSpace: 56 * 56 * 36
  }),
  arithmeticTemplate({
    key: "y10l7.cosineRuleMissingSide", levelKey: "Y10L7", objectiveCode: "Y10-L7-2", difficulty: "REASONING",
    misconceptionTags: ["COSINE_RULE_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[4, 25], [4, 25], [25, 140]],
    compute: (v) => Math.sqrt(v[0]! * v[0]! + v[1]! * v[1]! - 2 * v[0]! * v[1]! * Math.cos(rad(v[2]!))), formatValue: oneDp,
    derive: (v) => ({ p: v[0]!, q: v[1]!, ang: v[2]! }),
    promptTemplates: [
      "A triangle has sides of {p} cm and {q} cm with an angle of {ang}° between them. Use the cosine rule to find the third side, in cm to 1 decimal place.",
      "In triangle ABC, b = {p} cm, c = {q} cm and angle A = {ang}°. Find side a, in cm to 1 decimal place."
    ],
    explain: (v, r) => [
      `The cosine rule gives a² = b² + c² - 2bc cos A.`,
      `a² = ${v[0]}² + ${v[1]}² - 2 x ${v[0]} x ${v[1]} x cos ${v[2]}°.`,
      `Taking the square root gives ${r} cm.`
    ],
    hints: () => ["Square both known sides, add them, then subtract 2 x side x side x cos(angle) — and remember the final square root."],
    fr: {
      promptTemplates: [
        "Un triangle a des côtés de {p} cm et {q} cm avec un angle de {ang}° entre eux. Utilise la loi des cosinus pour trouver le troisième côté, en cm au dixième près.",
        "Dans le triangle ABC, b = {p} cm, c = {q} cm et l'angle A = {ang}°. Trouve le côté a, en cm au dixième près."
      ],
      explain: (v, r) => [
        `La loi des cosinus donne a² = b² + c² - 2bc cos A.`,
        `a² = ${v[0]}² + ${v[1]}² - 2 x ${v[0]} x ${v[1]} x cos ${v[2]}°.`,
        `La racine carrée donne ${r} cm.`
      ],
      hints: () => ["Élève les deux côtés connus au carré, additionne, puis retire 2 x côté x côté x cos(angle) — et n'oublie pas la racine carrée finale."]
    },
    declaredVariationSpace: 22 * 22 * 116
  }),
  arithmeticTemplate({
    key: "y10l7.areaWithSineRule", levelKey: "Y10L7", objectiveCode: "Y10-L7-2", difficulty: "REASONING",
    misconceptionTags: ["TRIANGLE_AREA_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[4, 30], [4, 30], [20, 150]],
    compute: (v) => 0.5 * v[0]! * v[1]! * Math.sin(rad(v[2]!)), formatValue: oneDp,
    derive: (v) => ({ p: v[0]!, q: v[1]!, ang: v[2]! }),
    promptTemplates: [
      "A triangle has sides of {p} cm and {q} cm with an included angle of {ang}°. What is its area, in cm² to 1 decimal place?",
      "Use area = ½ab sin C to find the area of a triangle with a = {p} cm, b = {q} cm and C = {ang}°, in cm² to 1 decimal place."
    ],
    explain: (v, r) => [`Area = ½ x ${v[0]} x ${v[1]} x sin ${v[2]}°.`, `That gives ${r} cm².`],
    hints: () => ["The angle must be the one between the two sides you use."],
    fr: {
      promptTemplates: [
        "Un triangle a des côtés de {p} cm et {q} cm avec un angle compris de {ang}°. Quelle est son aire, en cm² au dixième près ?",
        "Utilise aire = ½ab sin C pour trouver l'aire d'un triangle avec a = {p} cm, b = {q} cm et C = {ang}°, en cm² au dixième près."
      ],
      explain: (v, r) => [`Aire = ½ x ${v[0]} x ${v[1]} x sin ${v[2]}°.`, `Cela donne ${r} cm².`],
      hints: () => ["L'angle doit être celui situé entre les deux côtés utilisés."]
    },
    declaredVariationSpace: 27 * 27 * 131
  }),

  // --- Y10-L7-3: exact trigonometric values ---
  categoricalPoolTemplate({
    key: "y10l7.mcExactTrigValue", levelKey: "Y10L7", objectiveCode: "Y10-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["EXACT_TRIG_VALUE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {
      expr: Object.keys(EXACT_VALUES),
      phrase: ["Without a calculator, what is", "What is the exact value of", "Which of these is the exact value of"]
    },
    build: (picked, rng) => {
      const expr = picked.expr!;
      const correct = EXACT_VALUES[expr]!;
      const others = rng.shuffle(ALL_VALUES.filter((v) => v !== correct)).slice(0, 3);
      return {
        prompt: `${picked.phrase} ${expr}?`,
        correctLabel: correct,
        distractorLabels: others,
        explanationSteps: [`${expr} = ${correct}. This is one of the exact values worth memorising.`],
        hints: ["Use the 30-60-90 triangle (1, 2, √3) and the 45-45-90 triangle (1, 1, √2) to read the exact values off."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/(sin|cos|tan) (\d+)°/);
        const expr = m ? `${m[1]} ${m[2]}°` : "";
        return {
          prompt: `Sans calculatrice, quelle est la valeur exacte de ${expr} ?`,
          explanationSteps: [`${expr} = ${drawn.correctLabel}. C'est l'une des valeurs exactes à mémoriser.`],
          hints: ["Utilise le triangle 30-60-90 (1, 2, √3) et le triangle 45-45-90 (1, 1, √2) pour lire les valeurs exactes."]
        };
      }
    },
    declaredVariationSpace: 14 * 3 * 20
  }),
  arithmeticTemplate({
    key: "y10l7.exactValueCalculation", levelKey: "Y10L7", objectiveCode: "Y10-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["EXACT_TRIG_VALUE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 80], [0, 2]], compute: (v) => v[0]!,
    derive: (v) => {
      const expr = v[1]! === 0 ? `${2 * v[0]!} x sin 30°` : v[1]! === 1 ? `${2 * v[0]!} x cos 60°` : `${v[0]!} x tan 45°`;
      return { expr };
    },
    promptTemplates: [
      "Without a calculator, work out {expr}.",
      "Use exact trigonometric values to evaluate {expr}."
    ],
    explain: (v, r) => {
      const value = v[1]! === 2 ? "tan 45° = 1" : v[1]! === 0 ? "sin 30° = 1/2" : "cos 60° = 1/2";
      return [`${value}.`, `So the calculation gives ${r}.`];
    },
    hints: () => ["Replace the trigonometric value with its exact value first, then multiply."],
    fr: {
      promptTemplates: [
        "Sans calculatrice, calcule {expr}.",
        "Utilise les valeurs trigonométriques exactes pour évaluer {expr}."
      ],
      explain: (v, r) => {
        const value = v[1]! === 2 ? "tan 45° = 1" : v[1]! === 0 ? "sin 30° = 1/2" : "cos 60° = 1/2";
        return [`${value}.`, `Le calcul donne donc ${r}.`];
      },
      hints: () => ["Remplace d'abord la valeur trigonométrique par sa valeur exacte, puis multiplie."]
    },
    declaredVariationSpace: 80 * 3 * 2
  }),
  arithmeticTemplate({
    key: "y10l7.exact45TriangleSide", levelKey: "Y10L7", objectiveCode: "Y10-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["EXACT_TRIG_VALUE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[2, 90]], compute: (v) => v[0]!,
    promptTemplates: [
      "In a right-angled triangle one of the other angles is 45° and the side adjacent to it is {a} cm. How long is the opposite side, in cm?",
      "A right-angled triangle has a 45° angle. The adjacent side is {a} cm. Using tan 45° = 1, find the opposite side, in cm.",
      "{Ctx} meets the ground at exactly 45°, {a} m from the base of a vertical post. How tall is the post, in m?"
    ],
    explain: (v, r) => [`tan 45° = 1, so opposite = adjacent x 1.`, `The opposite side is ${r} cm — a 45° right-angled triangle is isosceles.`],
    hints: () => ["tan 45° = 1 exactly, so the two shorter sides are equal."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: [
        "Dans un triangle rectangle, l'un des autres angles mesure 45° et le côté adjacent mesure {a} cm. Quelle est la longueur du côté opposé, en cm ?",
        "Un triangle rectangle a un angle de 45°. Le côté adjacent mesure {a} cm. En utilisant tan 45° = 1, trouve le côté opposé, en cm.",
        "{Ctx} rencontre le sol à exactement 45°, à {a} m du pied d'un poteau vertical. Quelle est la hauteur du poteau, en m ?"
      ],
      explain: (v, r) => [`tan 45° = 1, donc opposé = adjacent x 1.`, `Le côté opposé mesure ${r} cm — un triangle rectangle à 45° est isocèle.`],
      hints: () => ["tan 45° = 1 exactement, donc les deux côtés courts sont égaux."]
    },
    declaredVariationSpace: 89 * 3 * (1 + PLACES.length)
  }),
  categoricalPoolTemplate({
    key: "y10l7.tfExactTrigValue", levelKey: "Y10L7", objectiveCode: "Y10-L7-3", difficulty: "REASONING",
    misconceptionTags: ["EXACT_TRIG_VALUE_ERROR"], type: "TRUE_FALSE",
    pools: { expr: Object.keys(EXACT_VALUES) },
    build: (picked, rng) => {
      const expr = picked.expr!;
      const correct = EXACT_VALUES[expr]!;
      const isTrue = rng.chance(0.5);
      const shown = isTrue ? correct : rng.pick(ALL_VALUES.filter((v) => v !== correct));
      return {
        prompt: `${expr} = ${shown}. True or false?`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [`${expr} = ${correct}.`],
        hints: ["Sketch the 30-60-90 and 45-45-90 triangles and read the ratio off the sides."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Dessine les triangles 30-60-90 et 45-45-90 et lis le rapport sur les côtés."]
        };
      }
    },
    declaredVariationSpace: 14 * 2 * 6
  }),
  matchingTemplate({
    key: "y10l7.matchExactTrigValues", levelKey: "Y10L7", objectiveCode: "Y10-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["EXACT_TRIG_VALUE_ERROR"],
    generatePairs: (rng) => {
      const entries = Object.keys(EXACT_VALUES).map((expr) => ({ left: expr, right: EXACT_VALUES[expr]! }));
      const chosen: Array<{ left: string; right: string }> = [];
      for (const candidate of rng.shuffle(entries)) {
        if (chosen.some((c) => c.right === candidate.right)) continue;
        chosen.push(candidate);
        if (chosen.length === 3) break;
      }
      return chosen;
    },
    promptTemplates: ["Match each trigonometric expression to its exact value.", "Without a calculator, match each ratio to its exact value."],
    explain: (pairs) => [pairs.map((p) => `${p.left} = ${p.right}`).join("; ") + "."],
    hints: () => ["The 30-60-90 triangle has sides 1, √3, 2 and the 45-45-90 triangle has sides 1, 1, √2."],
    fr: {
      promptTemplates: ["Associe chaque expression trigonométrique à sa valeur exacte.", "Sans calculatrice, associe chaque rapport à sa valeur exacte."],
      explain: (pairs) => [pairs.map((p) => `${p.left} = ${p.right}`).join(" ; ") + "."],
      hints: () => ["Le triangle 30-60-90 a des côtés 1, √3, 2 et le triangle 45-45-90 des côtés 1, 1, √2."]
    },
    declaredVariationSpace: 2000
  })
];

export default level;
