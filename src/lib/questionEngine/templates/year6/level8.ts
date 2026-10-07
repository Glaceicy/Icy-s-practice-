import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 8 — "Geometry, angles, shapes and coordinates"
const SHAPES = ["triangle", "square", "rectangle", "pentagon", "hexagon", "octagon", "rhombus", "trapezium"];
const SHAPES_FR = ["triangle", "carré", "rectangle", "pentagone", "hexagone", "octogone", "losange", "trapèze"];
const REGULAR_POLYGONS: Array<[string, number]> = [["triangle", 3], ["square", 4], ["pentagon", 5], ["hexagon", 6], ["octagon", 8], ["decagon", 10], ["dodecagon", 12]];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L8-1: find unknown angles in triangles, quadrilaterals and polygons ---
  arithmeticTemplate({
    key: "y6l8.missingAngleTriangle", levelKey: "Y6L8", objectiveCode: "Y6-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[10, 150], [10, 150]], constraint: (v) => v[0]! + v[1]! < 175,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: [
      "A triangle has angles of {a}° and {b}°. What is the third angle, in degrees?",
      "In a diagram next to a {ctx}, a triangle has angles {a}° and {b}°. Find the missing angle, in degrees."
    ],
    explain: (v, r) => [`Angles in a triangle add to 180°.`, `180 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["The angles of any triangle total 180°."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Un triangle a des angles de {a}° et {b}°. Quel est le troisième angle, en degrés ?",
        "Sur un schéma à côté d'un {ctx}, un triangle a des angles de {a}° et {b}°. Trouve l'angle manquant, en degrés."
      ],
      explain: (v, r) => [`Les angles d'un triangle font 180° au total.`, `180 - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les angles de tout triangle font 180° au total."]
    },
    declaredVariationSpace: 141 * 141
  }),
  arithmeticTemplate({
    key: "y6l8.missingAngleQuadrilateral", levelKey: "Y6L8", objectiveCode: "Y6-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[20, 140], [20, 140], [20, 140]], constraint: (v) => v[0]! + v[1]! + v[2]! < 350,
    compute: (v) => 360 - v[0]! - v[1]! - v[2]!,
    promptTemplates: ["A quadrilateral has angles of {a}°, {b}° and {c}°. What is the fourth angle, in degrees?"],
    explain: (v, r) => [`Angles in a quadrilateral add to 360°.`, `360 - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["The angles of any quadrilateral total 360°."],
    fr: {
      promptTemplates: ["Un quadrilatère a des angles de {a}°, {b}° et {c}°. Quel est le quatrième angle, en degrés ?"],
      explain: (v, r) => [`Les angles d'un quadrilatère font 360° au total.`, `360 - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
      hints: () => ["Les angles de tout quadrilatère font 360° au total."]
    },
    declaredVariationSpace: 121 * 121 * 121
  }),
  arithmeticTemplate({
    key: "y6l8.interiorAngleRegularPolygon", levelKey: "Y6L8", objectiveCode: "Y6-L8-1", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[3, 30]], compute: (v) => (v[0]! - 2) * 180,
    promptTemplates: [
      "A polygon has {a} sides. What is the sum of its interior angles, in degrees?",
      "A tiling pattern near a {ctx} uses a polygon with {a} sides. What is the sum of its interior angles, in degrees?"
    ],
    explain: (v, r) => [`A polygon with ${v[0]} sides splits into ${v[0]! - 2} triangles.`, `${v[0]! - 2} x 180 = ${r}.`],
    hints: () => ["(number of sides - 2) x 180° gives the interior angle sum."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Un polygone a {a} côtés. Quelle est la somme de ses angles intérieurs, en degrés ?",
        "Un pavage près d'un {ctx} utilise un polygone à {a} côtés. Quelle est la somme de ses angles intérieurs, en degrés ?"
      ],
      explain: (v, r) => [`Un polygone à ${v[0]} côtés se découpe en ${v[0]! - 2} triangles.`, `${v[0]! - 2} x 180 = ${r}.`],
      hints: () => ["(nombre de côtés - 2) x 180° donne la somme des angles intérieurs."]
    },
    declaredVariationSpace: 28 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y6l8.anglesOnStraightLine", levelKey: "Y6L8", objectiveCode: "Y6-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_FACT_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[5, 175]], compute: (v) => 180 - v[0]!,
    promptTemplates: [
      "Two angles sit on a straight line. One is {a}°. What is the other, in degrees?",
      "Beside a {ctx}, two angles on a straight line include one of {a}°. What is the other, in degrees?"
    ],
    explain: (v, r) => [`Angles on a straight line add to 180°.`, `180 - ${v[0]} = ${r}.`],
    hints: () => ["Angles on a straight line total 180°."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Deux angles sont sur une ligne droite. L'un mesure {a}°. Combien mesure l'autre, en degrés ?",
        "À côté d'un {ctx}, deux angles sur une droite comprennent un angle de {a}°. Combien mesure l'autre, en degrés ?"
      ],
      explain: (v, r) => [`Les angles sur une droite font 180° au total.`, `180 - ${v[0]} = ${r}.`],
      hints: () => ["Les angles sur une ligne droite font 180° au total."]
    },
    declaredVariationSpace: 171 * (1 + SHAPES.length)
  }),
  categoricalPoolTemplate({
    key: "y6l8.mcEachAngleRegularPolygon", levelKey: "Y6L8", objectiveCode: "Y6-L8-1", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const [name, sides] = REGULAR_POLYGONS[rng.int(0, REGULAR_POLYGONS.length - 1)]!;
      const each = ((sides - 2) * 180) / sides;
      const size = rng.int(2, 30);
      return {
        prompt: `A regular ${name} is drawn with sides of ${size} cm. What is each interior angle, in degrees?`,
        correctLabel: String(each),
        distractorLabels: [String(each + rng.int(5, 20)), String(360 / sides)],
        explanationSteps: [`Interior angle sum = (${sides} - 2) x 180 = ${(sides - 2) * 180}.`, `${(sides - 2) * 180} ÷ ${sides} = ${each}.`],
        hints: ["Find the interior angle sum, then divide by the number of sides."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A regular (\w+) is drawn with sides of (\d+) cm\./);
        if (!m) return {};
        const nameFr: Record<string, string> = { triangle: "triangle", square: "carré", pentagon: "pentagone", hexagon: "hexagone", octagon: "octogone", decagon: "décagone", dodecagon: "dodécagone" };
        return {
          prompt: `Un ${nameFr[m[1]!] ?? m[1]} régulier est tracé avec des côtés de ${m[2]} cm. Combien mesure chaque angle intérieur, en degrés ?`,
          hints: ["Trouve la somme des angles intérieurs, puis divise par le nombre de côtés."]
        };
      }
    },
    declaredVariationSpace: 500
  }),

  // --- Y6-L8-2: draw 2D shapes using given dimensions and angles ---
  arithmeticTemplate({
    key: "y6l8.perimeterFromDimensions", levelKey: "Y6L8", objectiveCode: "Y6-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[1, 40], [1, 40]], compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: [
      "You draw a rectangle {a} cm by {b} cm. What is its perimeter, in cm?",
      "A {ctx} diagram includes a rectangle {a} cm by {b} cm. What is that rectangle's perimeter, in cm?"
    ],
    explain: (v, r) => [`Perimeter = 2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Add the length and width, then double."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Tu traces un rectangle de {a} cm sur {b} cm. Quel est son périmètre, en cm ?",
        "Un schéma {de:ctx} contient un rectangle de {a} cm sur {b} cm. Quel est le périmètre de ce rectangle, en cm ?"
      ],
      explain: (v, r) => [`Périmètre = 2 x (${v[0]} + ${v[1]}) = ${r}.`],
      hints: () => ["Additionne la longueur et la largeur, puis double."]
    },
    declaredVariationSpace: 40 * 40 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y6l8.perimeterRegularPolygon", levelKey: "Y6L8", objectiveCode: "Y6-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[3, 12], [1, 40]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "You draw a regular polygon with {a} sides, each {b} cm long. What is its perimeter, in cm?",
      "Next to a {ctx}, a regular polygon with {a} sides of {b} cm is drawn. What is its perimeter, in cm?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["All sides of a regular polygon are equal — multiply the side length by the number of sides."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Tu traces un polygone régulier à {a} côtés, chacun de {b} cm. Quel est son périmètre, en cm ?",
        "À côté d'un {ctx}, on trace un polygone régulier à {a} côtés de {b} cm. Quel est son périmètre, en cm ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Tous les côtés d'un polygone régulier sont égaux — multiplie la longueur d'un côté par le nombre de côtés."]
    },
    declaredVariationSpace: 10 * 40 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y6l8.missingSideFromPerimeter", levelKey: "Y6L8", objectiveCode: "Y6-L8-2", difficulty: "REASONING",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[1, 40], [1, 40]], compute: (v) => v[1]!,
    derive: (v) => ({ perim: 2 * (v[0]! + v[1]!) }),
    promptTemplates: [
      "A rectangle has a perimeter of {perim} cm and a length of {a} cm. What is its width, in cm?",
      "A {ctx} diagram shows a rectangle of perimeter {perim} cm and length {a} cm. What is its width, in cm?"
    ],
    explain: (v, r) => [`${2 * (v[0]! + v[1]!)} ÷ 2 = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
    hints: () => ["Halve the perimeter to get length + width, then subtract the length."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Un rectangle a un périmètre de {perim} cm et une longueur de {a} cm. Quelle est sa largeur, en cm ?",
        "Un schéma {de:ctx} montre un rectangle de périmètre {perim} cm et de longueur {a} cm. Quelle est sa largeur, en cm ?"
      ],
      explain: (v, r) => [`${2 * (v[0]! + v[1]!)} ÷ 2 = ${v[0]! + v[1]!}.`, `${v[0]! + v[1]!} - ${v[0]} = ${r}.`],
      hints: () => ["Divise le périmètre par deux pour obtenir longueur + largeur, puis soustrais la longueur."]
    },
    declaredVariationSpace: 40 * 40 * (1 + SHAPES.length)
  }),
  categoricalPoolTemplate({
    key: "y6l8.mcShapeSides", levelKey: "Y6L8", objectiveCode: "Y6-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["SHAPE_PROPERTY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { shape: SHAPES },
    build: (picked, rng) => {
      const sides: Record<string, number> = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, octagon: 8, rhombus: 4, trapezium: 4 };
      const correct = sides[picked.shape!]!;
      const size = rng.int(2, 30);
      return {
        prompt: `You are drawing a ${picked.shape} with sides of about ${size} cm. How many sides does it have?`,
        correctLabel: String(correct),
        distractorLabels: [String(correct + rng.int(1, 3)), String(correct + 4)],
        explanationSteps: [`A ${picked.shape} has ${correct} sides.`],
        hints: ["Count the straight edges the shape needs."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const i = SHAPES.indexOf(picked.shape!);
        const shapeFr = i >= 0 ? SHAPES_FR[i]! : picked.shape!;
        const m = drawn.prompt.match(/sides of about (\d+) cm/);
        return {
          prompt: `Tu traces un ${shapeFr} avec des côtés d'environ ${m ? m[1] : ""} cm. Combien de côtés a-t-il ?`,
          explanationSteps: [`Un ${shapeFr} a ${drawn.correctLabel} côtés.`],
          hints: ["Compte les côtés droits nécessaires à la forme."]
        };
      }
    },
    declaredVariationSpace: 300
  }),
  arithmeticTemplate({
    key: "y6l8.areaFromDrawnRectangle", levelKey: "Y6L8", objectiveCode: "Y6-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["PERIMETER_AREA_CONFUSION"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[1, 30], [1, 30]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "You draw a rectangle {a} cm by {b} cm. What is its area, in cm²?",
      "A {ctx} diagram includes a rectangle {a} cm by {b} cm. What is that rectangle's area, in cm²?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Area multiplies the two side lengths; perimeter adds them."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Tu traces un rectangle de {a} cm sur {b} cm. Quelle est son aire, en cm² ?",
        "Un schéma {de:ctx} contient un rectangle de {a} cm sur {b} cm. Quelle est l'aire de ce rectangle, en cm² ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["L'aire multiplie les deux longueurs ; le périmètre les additionne."]
    },
    declaredVariationSpace: 30 * 30 * (1 + SHAPES.length)
  }),

  // --- Y6-L8-3: describe positions on the full coordinate grid ---
  arithmeticTemplate({
    key: "y6l8.translateCoordinateX", levelKey: "Y6L8", objectiveCode: "Y6-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["COORDINATE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-15, 15], [-15, 15], [-10, 10]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: ["The point ({a}, {b}) moves {c} {c#units|unit} right (a negative number means left). What is the new x coordinate?"],
    explain: (v, r) => [`${v[0]} + ${v[2]} = ${r}.`],
    hints: () => ["Moving right increases x; moving left decreases it."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[1]!], [v[0]! + v[2]!, v[1]!]], 4),
    fr: {
      promptTemplates: ["Le point ({a}, {b}) se déplace de {c} unités vers la droite (un nombre négatif signifie vers la gauche). Quelle est la nouvelle abscisse ?"],
      explain: (v, r) => [`${v[0]} + ${v[2]} = ${r}.`],
      hints: () => ["Aller à droite augmente x ; aller à gauche le diminue."]
    },
    declaredVariationSpace: 31 * 31 * 21
  }),
  arithmeticTemplate({
    key: "y6l8.translateCoordinateY", levelKey: "Y6L8", objectiveCode: "Y6-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["COORDINATE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-15, 15], [-15, 15], [-10, 10]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["The point ({a}, {b}) moves {c} {c#units|unit} up (a negative number means down). What is the new y coordinate?"],
    explain: (v, r) => [`${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Moving up increases y; moving down decreases it."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[1]!], [v[0]!, v[1]! + v[2]!]], 4),
    fr: {
      promptTemplates: ["Le point ({a}, {b}) se déplace de {c} unités vers le haut (un nombre négatif signifie vers le bas). Quelle est la nouvelle ordonnée ?"],
      explain: (v, r) => [`${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Monter augmente y ; descendre le diminue."]
    },
    declaredVariationSpace: 31 * 31 * 21
  }),
  arithmeticTemplate({
    key: "y6l8.midpointXCoordinate", levelKey: "Y6L8", objectiveCode: "Y6-L8-3", difficulty: "REASONING",
    misconceptionTags: ["COORDINATE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-15, 15], [-15, 15], [1, 12]], compute: (v) => v[0]! + v[2]!,
    derive: (v) => ({ x2: v[0]! + v[2]! * 2 }),
    promptTemplates: ["A line joins ({a}, {b}) and ({x2}, {b}). What is the x coordinate of its midpoint?"],
    explain: (v, r) => [`(${v[0]} + ${v[0]! + v[2]! * 2}) ÷ 2 = ${r}.`],
    hints: () => ["The midpoint's x coordinate is the average of the two x values."],
    fr: {
      promptTemplates: ["Un segment joint ({a}, {b}) et ({x2}, {b}). Quelle est l'abscisse de son milieu ?"],
      explain: (v, r) => [`(${v[0]} + ${v[0]! + v[2]! * 2}) ÷ 2 = ${r}.`],
      hints: () => ["L'abscisse du milieu est la moyenne des deux abscisses."]
    },
    declaredVariationSpace: 31 * 31 * 12
  }),
  categoricalPoolTemplate({
    key: "y6l8.mcQuadrant", levelKey: "Y6L8", objectiveCode: "Y6-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["COORDINATE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const x = rng.int(1, 20) * (rng.chance(0.5) ? 1 : -1);
      const y = rng.int(1, 20) * (rng.chance(0.5) ? 1 : -1);
      const quad = x > 0 && y > 0 ? "first" : x < 0 && y > 0 ? "second" : x < 0 && y < 0 ? "third" : "fourth";
      const others = ["first", "second", "third", "fourth"].filter((q) => q !== quad);
      return {
        prompt: `In which quadrant does the point (${x}, ${y}) lie?`,
        correctLabel: quad,
        distractorLabels: rng.shuffle(others).slice(0, 2),
        explanationSteps: [`x is ${x > 0 ? "positive" : "negative"} and y is ${y > 0 ? "positive" : "negative"}, so it is in the ${quad} quadrant.`],
        hints: ["The first quadrant has both positive; they then go anticlockwise."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^In which quadrant does the point (\(-?\d+, -?\d+\)) lie\?$/);
        if (!m) return {};
        const quadFr: Record<string, string> = { first: "premier", second: "deuxième", third: "troisième", fourth: "quatrième" };
        return {
          prompt: `Dans quel quadrant se trouve le point ${m[1]} ?`,
          correctLabel: quadFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => quadFr[d] ?? d),
          hints: ["Le premier quadrant a les deux coordonnées positives ; on tourne ensuite dans le sens antihoraire."]
        };
      }
    },
    declaredVariationSpace: 1600
  }),
  matchingTemplate({
    key: "y6l8.matchPointsToQuadrants", levelKey: "Y6L8", objectiveCode: "Y6-L8-3", difficulty: "REASONING",
    misconceptionTags: ["COORDINATE_ERROR"],
    generatePairs: (rng) => {
      const quadrants = rng.shuffle(["first", "second", "third", "fourth"]).slice(0, 3);
      return quadrants.map((q) => {
        const mag1 = rng.int(1, 20);
        const mag2 = rng.int(1, 20);
        const x = q === "first" || q === "fourth" ? mag1 : -mag1;
        const y = q === "first" || q === "second" ? mag2 : -mag2;
        return { left: `(${x}, ${y})`, right: `${q} quadrant` };
      });
    },
    promptTemplates: ["Match each point to the quadrant it lies in."],
    explain: () => ["Check the sign of each coordinate to identify the quadrant."],
    hints: () => ["Both positive is the first quadrant; both negative is the third."],
    fr: {
      promptTemplates: ["Associe chaque point au quadrant dans lequel il se trouve."],
      explain: () => ["Vérifie le signe de chaque coordonnée pour identifier le quadrant."],
      hints: () => ["Les deux positives : premier quadrant ; les deux négatives : troisième."],
      translatePairs: (pairs) => pairs.map((p) => {
        const quadFr: Record<string, string> = { first: "premier", second: "deuxième", third: "troisième", fourth: "quatrième" };
        const m = p.right.match(/^(\w+) quadrant$/);
        return { left: p.left, right: m ? `${quadFr[m[1]!] ?? m[1]} quadrant` : p.right };
      })
    },
    declaredVariationSpace: 4000
  })
];

export default level;
