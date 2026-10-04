import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 8 — "Angles, symmetry, shapes and coordinates"
const GRIDS = ["a treasure map", "a seating plan", "a garden plan", "a street map", "a game board", "a pixel picture"];
const GRIDS_FR = ["une carte au trésor", "un plan de classe", "un plan de jardin", "un plan de rue", "un plateau de jeu", "une image en pixels"];

export const level: QuestionTemplateDef[] = [
  // --- Y4-L8-1: comparing and classifying shapes ---
  categoricalPoolTemplate({
    key: "y4l8.mcClassifyQuadrilateral", levelKey: "Y4L8", objectiveCode: "Y4-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SHAPE_CLASSIFICATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { shape: ["square", "rectangle", "parallelogram", "trapezium"] },
    build: (picked, rng) => {
      const a = rng.int(2, 20);
      const b = a + rng.int(1, 15);
      const shape = picked.shape!;
      const descriptions: Record<string, string> = {
        square: `four sides all ${a} cm long and four right angles`,
        rectangle: `two sides of ${a} cm, two sides of ${b} cm and four right angles`,
        parallelogram: `two pairs of parallel sides of ${a} cm and ${b} cm, but no right angles`,
        trapezium: `exactly one pair of parallel sides, ${a} cm and ${b} cm long`
      };
      return {
        prompt: `A four-sided shape has ${descriptions[shape]}. What is it called?`,
        correctLabel: shape,
        distractorLabels: ["square", "rectangle", "parallelogram", "trapezium"].filter((s) => s !== shape).slice(0, 3),
        explanationSteps: [`Those properties describe a ${shape}.`],
        hints: ["Count the right angles, then check which sides are equal and which are parallel."]
      };
    },
    fr: {
      translate: (drawn) => {
        const shapesFr: Record<string, string> = { square: "carré", rectangle: "rectangle", parallelogram: "parallélogramme", trapezium: "trapèze" };
        const m = drawn.prompt.match(/^A four-sided shape has (.+)\. What is it called\?$/);
        const descFr = (m ? m[1]! : "")
          .replace(/^four sides all (\d+) cm long and four right angles$/, "quatre côtés de $1 cm et quatre angles droits")
          .replace(/^two sides of (\d+) cm, two sides of (\d+) cm and four right angles$/, "deux côtés de $1 cm, deux côtés de $2 cm et quatre angles droits")
          .replace(/^two pairs of parallel sides of (\d+) cm and (\d+) cm, but no right angles$/, "deux paires de côtés parallèles de $1 cm et $2 cm, mais aucun angle droit")
          .replace(/^exactly one pair of parallel sides, (\d+) cm and (\d+) cm long$/, "exactement une paire de côtés parallèles, de $1 cm et $2 cm");
        return {
          prompt: `Une figure à quatre côtés a ${descFr}. Comment s'appelle-t-elle ?`,
          correctLabel: shapesFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => shapesFr[d] ?? d),
          hints: ["Compte les angles droits, puis regarde quels côtés sont égaux et lesquels sont parallèles."]
        };
      }
    },
    declaredVariationSpace: 4 * 19 * 15
  }),
  categoricalPoolTemplate({
    key: "y4l8.mcClassifyTriangle", levelKey: "Y4L8", objectiveCode: "Y4-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["SHAPE_CLASSIFICATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["equilateral", "isosceles", "scalene", "right-angled"] },
    build: (picked, rng) => {
      const a = rng.int(3, 20);
      const b = a + rng.int(1, 10);
      const c = b + rng.int(1, 10);
      const kind = picked.kind!;
      const descriptions: Record<string, string> = {
        equilateral: `three sides all ${a} cm long`,
        isosceles: `two sides of ${b} cm and one of ${a} cm`,
        scalene: `sides of ${a} cm, ${b} cm and ${c} cm, all different`,
        "right-angled": `one angle of exactly 90° and sides of ${a} cm and ${b} cm around it`
      };
      return {
        prompt: `A triangle has ${descriptions[kind]}. What kind of triangle is it?`,
        correctLabel: kind,
        distractorLabels: ["equilateral", "isosceles", "scalene", "right-angled"].filter((k) => k !== kind).slice(0, 3),
        explanationSteps: [`Those properties describe a ${kind} triangle.`],
        hints: ["Count how many sides are equal, and look for a right angle."]
      };
    },
    fr: {
      translate: (drawn) => {
        const kindsFr: Record<string, string> = { equilateral: "équilatéral", isosceles: "isocèle", scalene: "scalène", "right-angled": "rectangle" };
        const m = drawn.prompt.match(/^A triangle has (.+)\. What kind of triangle is it\?$/);
        const descFr = (m ? m[1]! : "")
          .replace(/^three sides all (\d+) cm long$/, "trois côtés de $1 cm")
          .replace(/^two sides of (\d+) cm and one of (\d+) cm$/, "deux côtés de $1 cm et un de $2 cm")
          .replace(/^sides of (\d+) cm, (\d+) cm and (\d+) cm, all different$/, "des côtés de $1 cm, $2 cm et $3 cm, tous différents")
          .replace(/^one angle of exactly 90° and sides of (\d+) cm and (\d+) cm around it$/, "un angle d'exactement 90° et des côtés de $1 cm et $2 cm autour");
        return {
          prompt: `Un triangle a ${descFr}. De quel type de triangle s'agit-il ?`,
          correctLabel: kindsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => kindsFr[d] ?? d),
          hints: ["Compte les côtés égaux et cherche un angle droit."]
        };
      }
    },
    declaredVariationSpace: 4 * 18 * 10 * 10
  }),
  categoricalPoolTemplate({
    key: "y4l8.tfShapeProperty", levelKey: "Y4L8", objectiveCode: "Y4-L8-1", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_CLASSIFICATION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const n = rng.int(2, 25);
      const valid = rng.chance(0.5);
      const validClaims = [
        `a square with sides of ${n} cm has four right angles`,
        `every rectangle has two pairs of equal sides`,
        `an equilateral triangle with sides of ${n} cm has three equal angles`,
        `a rectangle with sides of ${n} cm and ${n} cm is also a square`,
        `a triangle always has three sides`
      ];
      const invalidClaims = [
        `a square with sides of ${n} cm has four different angles`,
        `every rectangle has four equal sides`,
        `an equilateral triangle with sides of ${n} cm has a right angle`,
        `a rectangle with sides of ${n} cm and ${n + 3} cm is a square`,
        `a triangle can have four sides`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Squares have four right angles and four equal sides, rectangles have two pairs of equal sides, and equilateral triangles have three equal angles."
          : "A square needs four equal sides and four right angles, a rectangle only needs two pairs of equal sides, and an equilateral triangle has three 60° angles."],
        hints: ["Think about what has to be true for every shape of that name, not just one example."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^A square with sides of (\d+) cm has four right angles$/, "Un carré de $1 cm de côté a quatre angles droits")
          .replace(/^A square with sides of (\d+) cm has four different angles$/, "Un carré de $1 cm de côté a quatre angles différents")
          .replace(/^Every rectangle has two pairs of equal sides$/, "Tout rectangle a deux paires de côtés égaux")
          .replace(/^Every rectangle has four equal sides$/, "Tout rectangle a quatre côtés égaux")
          .replace(/^An equilateral triangle with sides of (\d+) cm has three equal angles$/, "Un triangle équilatéral de $1 cm de côté a trois angles égaux")
          .replace(/^An equilateral triangle with sides of (\d+) cm has a right angle$/, "Un triangle équilatéral de $1 cm de côté a un angle droit")
          .replace(/^A rectangle with sides of (\d+) cm and (\d+) cm is also a square$/, "Un rectangle de côtés $1 cm et $2 cm est aussi un carré")
          .replace(/^A rectangle with sides of (\d+) cm and (\d+) cm is a square$/, "Un rectangle de côtés $1 cm et $2 cm est un carré")
          .replace(/^A triangle always has three sides$/, "Un triangle a toujours trois côtés")
          .replace(/^A triangle can have four sides$/, "Un triangle peut avoir quatre côtés");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Pense à ce qui doit être vrai pour toutes les figures de ce nom, pas seulement pour un exemple."]
        };
      }
    },
    declaredVariationSpace: 2 * 5 * 24
  }),

  // --- Y4-L8-2: acute and obtuse angles ---
  categoricalPoolTemplate({
    key: "y4l8.mcClassifyAngle", levelKey: "Y4L8", objectiveCode: "Y4-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_CLASSIFICATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["acute", "right", "obtuse", "reflex"] },
    build: (picked, rng) => {
      const kind = picked.kind!;
      const angle = kind === "acute" ? rng.int(1, 89)
        : kind === "right" ? 90
          : kind === "obtuse" ? rng.int(91, 179)
            : rng.int(181, 359);
      return {
        prompt: `An angle measures ${angle}°. What kind of angle is it?`,
        correctLabel: kind,
        distractorLabels: ["acute", "right", "obtuse", "reflex"].filter((k) => k !== kind).slice(0, 3),
        explanationSteps: [`Acute is less than 90°, right is exactly 90°, obtuse is between 90° and 180°, and reflex is more than 180°.`, `${angle}° is ${kind}.`],
        hints: ["Compare the angle with 90° and 180°."]
      };
    },
    fr: {
      translate: (drawn) => {
        const kindsFr: Record<string, string> = { acute: "aigu", right: "droit", obtuse: "obtus", reflex: "rentrant" };
        const m = drawn.prompt.match(/^An angle measures (\d+)°\./);
        if (!m) return {};
        return {
          prompt: `Un angle mesure ${m[1]}°. De quel type d'angle s'agit-il ?`,
          correctLabel: kindsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => kindsFr[d] ?? d),
          explanationSteps: ["Aigu : moins de 90° ; droit : exactement 90° ; obtus : entre 90° et 180° ; rentrant : plus de 180°."],
          hints: ["Compare l'angle à 90° et à 180°."]
        };
      }
    },
    declaredVariationSpace: 4 * 180
  }),
  arithmeticTemplate({
    key: "y4l8.angleOnStraightLine", levelKey: "Y4L8", objectiveCode: "Y4-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP",
    ranges: [[10, 170]], compute: (v) => 180 - v[0]!,
    promptTemplates: [
      "Two angles sit together on a straight line. One is {a}°. What is the other, in degrees?",
      "Angles on a straight line add to 180°. If one is {a}°, what is the other, in degrees?",
      "A straight line is split into two angles. One measures {a}°. How big is the other, in degrees?"
    ],
    explain: (v, r) => [`Angles on a straight line add up to 180°.`, `180 - ${v[0]} = ${r}°.`],
    hints: () => ["A straight line is two right angles, which is 180°."],
    fr: {
      promptTemplates: [
        "Deux angles sont côte à côte sur une droite. L'un mesure {a}°. Combien mesure l'autre, en degrés ?",
        "Les angles sur une droite ont pour somme 180°. Si l'un vaut {a}°, combien vaut l'autre, en degrés ?",
        "Une droite est partagée en deux angles. L'un mesure {a}°. Combien mesure l'autre, en degrés ?"
      ],
      explain: (v, r) => [`Les angles sur une droite ont pour somme 180°.`, `180 - ${v[0]} = ${r}°.`],
      hints: () => ["Une droite vaut deux angles droits, soit 180°."]
    },
    declaredVariationSpace: 161 * 3
  }),
  arithmeticTemplate({
    key: "y4l8.anglesAroundPoint", levelKey: "Y4L8", objectiveCode: "Y4-L8-2", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP",
    ranges: [[20, 170], [20, 170]], constraint: (v) => v[0]! + v[1]! < 340,
    compute: (v) => 360 - v[0]! - v[1]!,
    promptTemplates: [
      "Three angles meet at a point. Two of them are {a}° and {b}°. What is the third, in degrees?",
      "Angles around a point add to 360°. Two are {a}° and {b}°. Find the third, in degrees."
    ],
    explain: (v, r) => [`A full turn is 360°.`, `360 - ${v[0]} - ${v[1]} = ${r}°.`],
    hints: () => ["A full turn all the way round is 360°."],
    fr: {
      promptTemplates: [
        "Trois angles se rejoignent en un point. Deux d'entre eux mesurent {a}° et {b}°. Combien mesure le troisième, en degrés ?",
        "Les angles autour d'un point ont pour somme 360°. Deux valent {a}° et {b}°. Trouve le troisième, en degrés."
      ],
      explain: (v, r) => [`Un tour complet vaut 360°.`, `360 - ${v[0]} - ${v[1]} = ${r}°.`],
      hints: () => ["Un tour complet fait 360°."]
    },
    declaredVariationSpace: 151 * 151
  }),
  arithmeticTemplate({
    key: "y4l8.missingAngleInTriangle", levelKey: "Y4L8", objectiveCode: "Y4-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP",
    ranges: [[20, 110], [20, 110]], constraint: (v) => v[0]! + v[1]! < 170,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: [
      "Two angles of a triangle are {a}° and {b}°. What is the third, in degrees?",
      "A triangle has angles of {a}° and {b}°. Find the missing angle, in degrees."
    ],
    explain: (v, r) => [`The three angles of a triangle always add to 180°.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
    hints: () => ["Add the two angles you know, then take the total away from 180."],
    fr: {
      promptTemplates: [
        "Deux angles d'un triangle valent {a}° et {b}°. Combien mesure le troisième, en degrés ?",
        "Un triangle a des angles de {a}° et {b}°. Trouve l'angle manquant, en degrés."
      ],
      explain: (v, r) => [`Les trois angles d'un triangle ont toujours pour somme 180°.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
      hints: () => ["Additionne les deux angles connus, puis retire ce total de 180."]
    },
    declaredVariationSpace: 91 * 91
  }),
  orderingTemplate({
    key: "y4l8.orderAnglesBySize", levelKey: "Y4L8", objectiveCode: "Y4-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_CLASSIFICATION_ERROR"], type: "ORDERING", direction: "asc",
    generateItems: (rng) => {
      const used = new Set<number>();
      const items: Array<{ label: string; sortValue: number }> = [];
      while (items.length < 4) {
        const a = rng.int(5, 355);
        if (used.has(a)) continue;
        used.add(a);
        items.push({ label: `${a}°`, sortValue: a });
      }
      return items;
    },
    promptTemplates: [
      "Put these angles in order, smallest first.",
      "Order these angles from smallest to largest."
    ],
    explain: (items) => [`In order: ${items.map((i) => i.label).join(", ")}.`],
    hints: () => ["Compare each angle with 90° and 180° to help you sort them."],
    fr: {
      promptTemplates: [
        "Range ces angles dans l'ordre, du plus petit au plus grand.",
        "Classe ces angles du plus petit au plus grand."
      ],
      explain: (items) => [`Dans l'ordre : ${items.map((i) => i.label).join(" ; ")}.`],
      hints: () => ["Compare chaque angle à 90° et à 180° pour t'aider à les classer."]
    },
    declaredVariationSpace: 60000
  }),

  // --- Y4-L8-3: coordinates in the first quadrant ---
  arithmeticTemplate({
    key: "y4l8.coordinateAfterTranslationX", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP", contextPool: GRIDS,
    ranges: [[0, 20], [0, 20], [1, 12]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: [
      "A point at ({a}, {b}) moves {c} squares to the right. What is its new x-coordinate?",
      "On {ctx}, a counter at ({a}, {b}) slides {c} squares right. What is its new x-coordinate?"
    ],
    explain: (v, r) => [`Moving right increases the first coordinate.`, `${v[0]} + ${v[2]} = ${r}.`],
    hints: () => ["The first number is how far across, so only that one changes."],
    fr: {
      contextPool: GRIDS_FR,
      promptTemplates: [
        "Un point en ({a}, {b}) se déplace de {c} carreaux vers la droite. Quelle est sa nouvelle abscisse ?",
        "Sur {ctx}, un jeton en ({a}, {b}) glisse de {c} carreaux vers la droite. Quelle est sa nouvelle abscisse ?"
      ],
      explain: (v, r) => [`Se déplacer vers la droite augmente la première coordonnée.`, `${v[0]} + ${v[2]} = ${r}.`],
      hints: () => ["Le premier nombre indique le déplacement horizontal : seul celui-là change."]
    },
    declaredVariationSpace: 21 * 21 * 12
  }),
  arithmeticTemplate({
    key: "y4l8.coordinateAfterTranslationY", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP", contextPool: GRIDS,
    ranges: [[0, 20], [0, 20], [1, 12]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: [
      "A point at ({a}, {b}) moves {c} squares up. What is its new y-coordinate?",
      "On {ctx}, a marker at ({a}, {b}) moves {c} squares up. What is its new y-coordinate?"
    ],
    explain: (v, r) => [`Moving up increases the second coordinate.`, `${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["The second number is how far up, so only that one changes."],
    fr: {
      contextPool: GRIDS_FR,
      promptTemplates: [
        "Un point en ({a}, {b}) se déplace de {c} carreaux vers le haut. Quelle est sa nouvelle ordonnée ?",
        "Sur {ctx}, un repère en ({a}, {b}) monte de {c} carreaux. Quelle est sa nouvelle ordonnée ?"
      ],
      explain: (v, r) => [`Monter augmente la seconde coordonnée.`, `${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Le second nombre indique le déplacement vertical : seul celui-là change."]
    },
    declaredVariationSpace: 21 * 21 * 12
  }),
  arithmeticTemplate({
    key: "y4l8.fourthVertexOfRectangle", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "REASONING",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP",
    ranges: [[0, 15], [0, 15], [2, 14], [2, 14]], compute: (v) => v[0]! + v[2]!,
    derive: (v) => ({ x2: v[0]! + v[2]!, y2: v[1]! + v[3]! }),
    promptTemplates: [
      "A rectangle has corners at ({a}, {b}), ({x2}, {b}) and ({a}, {y2}). What is the x-coordinate of the fourth corner?",
      "Three corners of a rectangle are ({a}, {b}), ({x2}, {b}) and ({a}, {y2}). Find the x-coordinate of the missing corner."
    ],
    explain: (v, r) => [
      `The fourth corner lines up with (${v[0]! + v[2]!}, ${v[1]}) across and with (${v[0]}, ${v[1]! + v[3]!}) up.`,
      `So its x-coordinate is ${r}.`
    ],
    hints: () => ["Opposite corners of a rectangle share coordinates with their neighbours — sketch it on a grid."],
    fr: {
      promptTemplates: [
        "Un rectangle a des sommets en ({a}, {b}), ({x2}, {b}) et ({a}, {y2}). Quelle est l'abscisse du quatrième sommet ?",
        "Trois sommets d'un rectangle sont ({a}, {b}), ({x2}, {b}) et ({a}, {y2}). Trouve l'abscisse du sommet manquant."
      ],
      explain: (v, r) => [
        `Le quatrième sommet est aligné horizontalement avec (${v[0]! + v[2]!}, ${v[1]}) et verticalement avec (${v[0]}, ${v[1]! + v[3]!}).`,
        `Son abscisse est donc ${r}.`
      ],
      hints: () => ["Les sommets opposés d'un rectangle partagent des coordonnées avec leurs voisins — fais un croquis."]
    },
    declaredVariationSpace: 16 * 16 * 13 * 13
  }),
  arithmeticTemplate({
    key: "y4l8.horizontalDistanceBetweenPoints", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP",
    ranges: [[0, 20], [0, 20], [1, 18]], compute: (v) => v[2]!,
    derive: (v) => ({ x2: v[0]! + v[2]! }),
    promptTemplates: [
      "Two points are at ({a}, {b}) and ({x2}, {b}). How many squares apart are they?",
      "A line joins ({a}, {b}) to ({x2}, {b}). How long is it, in squares?"
    ],
    explain: (v, r) => [`Both points are at the same height, so count across.`, `${v[0]! + v[2]!} - ${v[0]} = ${r}.`],
    hints: () => ["When the y-coordinates match, the points are side by side — just subtract the x-coordinates."],
    fr: {
      promptTemplates: [
        "Deux points sont en ({a}, {b}) et ({x2}, {b}). De combien de carreaux sont-ils séparés ?",
        "Un segment relie ({a}, {b}) à ({x2}, {b}). Quelle est sa longueur, en carreaux ?"
      ],
      explain: (v, r) => [`Les deux points sont à la même hauteur : compte horizontalement.`, `${v[0]! + v[2]!} - ${v[0]} = ${r}.`],
      hints: () => ["Quand les ordonnées sont identiques, les points sont côte à côte — soustrais les abscisses."]
    },
    declaredVariationSpace: 21 * 21 * 18
  }),
  categoricalPoolTemplate({
    key: "y4l8.mcReadCoordinate", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const x = rng.int(1, 20);
      let y = rng.int(1, 20);
      if (y === x) y = y === 20 ? y - 1 : y + 1;
      const correct = `(${x}, ${y})`;
      const wrong = [`(${y}, ${x})`, `(${x}, ${y + 1})`, `(${x + 1}, ${y})`];
      return {
        prompt: `A point is ${x} squares across and ${y} squares up from the origin. What are its coordinates?`,
        correctLabel: correct,
        distractorLabels: wrong.filter((w) => w !== correct).slice(0, 3),
        explanationSteps: [`Coordinates are written (across, up).`, `${x} across and ${y} up gives ${correct}.`],
        hints: ["Go along the corridor before you go up the stairs: across first, then up."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A point is (\d+) squares across and (\d+) squares up from the origin\./);
        if (!m) return {};
        return {
          prompt: `Un point est à ${m[1]} carreaux vers la droite et ${m[2]} carreaux vers le haut depuis l'origine. Quelles sont ses coordonnées ?`,
          explanationSteps: ["Les coordonnées s'écrivent (horizontal, vertical).", `${m[1]} à droite et ${m[2]} en haut donne ${drawn.correctLabel}.`],
          hints: ["D'abord le couloir, ensuite l'escalier : horizontalement puis verticalement."]
        };
      }
    },
    declaredVariationSpace: 20 * 20
  }),
  arithmeticTemplate({
    key: "y4l8.rectanglePerimeterFromCoordinates", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "REASONING",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP",
    ranges: [[0, 12], [0, 12], [2, 15], [2, 15]], compute: (v) => 2 * (v[2]! + v[3]!),
    derive: (v) => ({ x2: v[0]! + v[2]!, y2: v[1]! + v[3]! }),
    promptTemplates: [
      "A rectangle has opposite corners at ({a}, {b}) and ({x2}, {y2}). What is its perimeter, in squares?",
      "A rectangle on a grid runs from ({a}, {b}) to ({x2}, {y2}). How far is it all the way round, in squares?"
    ],
    explain: (v, r) => [
      `The width is ${v[0]! + v[2]!} - ${v[0]} = ${v[2]} and the height is ${v[1]! + v[3]!} - ${v[1]} = ${v[3]}.`,
      `2 x (${v[2]} + ${v[3]}) = ${r}.`
    ],
    hints: () => ["Subtract the coordinates to find the width and height, then add up all four sides."],
    fr: {
      promptTemplates: [
        "Un rectangle a des sommets opposés en ({a}, {b}) et ({x2}, {y2}). Quel est son périmètre, en carreaux ?",
        "Un rectangle sur un quadrillage va de ({a}, {b}) à ({x2}, {y2}). Quelle distance fait le tour, en carreaux ?"
      ],
      explain: (v, r) => [
        `La largeur est ${v[0]! + v[2]!} - ${v[0]} = ${v[2]} et la hauteur ${v[1]! + v[3]!} - ${v[1]} = ${v[3]}.`,
        `2 x (${v[2]} + ${v[3]}) = ${r}.`
      ],
      hints: () => ["Soustrais les coordonnées pour trouver la largeur et la hauteur, puis additionne les quatre côtés."]
    },
    declaredVariationSpace: 13 * 13 * 14 * 14
  }),
  arithmeticTemplate({
    key: "y4l8.verticalDistanceBetweenPoints", levelKey: "Y4L8", objectiveCode: "Y4-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTI_STEP",
    ranges: [[0, 20], [0, 20], [1, 18]], compute: (v) => v[2]!,
    derive: (v) => ({ y2: v[1]! + v[2]! }),
    promptTemplates: [
      "Two points are at ({a}, {b}) and ({a}, {y2}). How many squares apart are they?",
      "A vertical line joins ({a}, {b}) to ({a}, {y2}). How long is it, in squares?"
    ],
    explain: (v, r) => [`Both points are the same distance across, so count up.`, `${v[1]! + v[2]!} - ${v[1]} = ${r}.`],
    hints: () => ["When the x-coordinates match, the points are directly above each other."],
    fr: {
      promptTemplates: [
        "Deux points sont en ({a}, {b}) et ({a}, {y2}). De combien de carreaux sont-ils séparés ?",
        "Un segment vertical relie ({a}, {b}) à ({a}, {y2}). Quelle est sa longueur, en carreaux ?"
      ],
      explain: (v, r) => [`Les deux points sont à la même position horizontale : compte verticalement.`, `${v[1]! + v[2]!} - ${v[1]} = ${r}.`],
      hints: () => ["Quand les abscisses sont identiques, les points sont l'un au-dessus de l'autre."]
    },
    declaredVariationSpace: 21 * 21 * 18
  })
];

export default level;
