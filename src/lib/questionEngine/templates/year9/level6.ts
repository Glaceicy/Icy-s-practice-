import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 6 — "Transformations, constructions and vectors"
export const level: QuestionTemplateDef[] = [
  // --- Y9-L6-1: describe translations as 2D vectors ---
  arithmeticTemplate({
    key: "y9l6.translateXCoordinate", levelKey: "Y9L6", objectiveCode: "Y9-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-10, 10], [-10, 10], [-8, 8]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: ["The point ({a}, {b}) is translated by the vector ({c}, 0). What is the new x coordinate?"],
    explain: (v, r) => [`${v[0]} + ${v[2]} = ${r}.`],
    hints: () => ["The top number of a vector moves the point horizontally."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[1]!], [v[0]! + v[2]!, v[1]!]], 4),
    fr: {
      promptTemplates: ["Le point ({a}, {b}) est translaté par le vecteur ({c}, 0). Quelle est la nouvelle abscisse ?"],
      explain: (v, r) => [`${v[0]} + ${v[2]} = ${r}.`],
      hints: () => ["Le nombre du haut d'un vecteur déplace le point horizontalement."]
    },
    declaredVariationSpace: 21 * 21 * 17
  }),
  arithmeticTemplate({
    key: "y9l6.translateYCoordinate", levelKey: "Y9L6", objectiveCode: "Y9-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-10, 10], [-10, 10], [-8, 8]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["The point ({a}, {b}) is translated by the vector (0, {c}). What is the new y coordinate?"],
    explain: (v, r) => [`${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["The bottom number of a vector moves the point vertically."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[1]!], [v[0]!, v[1]! + v[2]!]], 4),
    fr: {
      promptTemplates: ["Le point ({a}, {b}) est translaté par le vecteur (0, {c}). Quelle est la nouvelle ordonnée ?"],
      explain: (v, r) => [`${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Le nombre du bas d'un vecteur déplace le point verticalement."]
    },
    declaredVariationSpace: 21 * 21 * 17
  }),
  arithmeticTemplate({
    key: "y9l6.vectorComponentFromPoints", levelKey: "Y9L6", objectiveCode: "Y9-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-10, 10], [-10, 10], [-9, 9]], compute: (v) => v[2]!,
    derive: (v) => ({ x2: v[0]! + v[2]! }),
    promptTemplates: ["A translation maps ({a}, {b}) to ({x2}, {b}). What is the horizontal component of the vector?"],
    explain: (v, r) => [`${v[0]! + v[2]!} - ${v[0]} = ${r}.`],
    hints: () => ["Subtract the starting coordinate from the finishing coordinate."],
    fr: {
      promptTemplates: ["Une translation envoie ({a}, {b}) sur ({x2}, {b}). Quelle est la composante horizontale du vecteur ?"],
      explain: (v, r) => [`${v[0]! + v[2]!} - ${v[0]} = ${r}.`],
      hints: () => ["Soustrais la coordonnée de départ de la coordonnée d'arrivée."]
    },
    declaredVariationSpace: 21 * 21 * 19
  }),
  arithmeticTemplate({
    key: "y9l6.combineVectors", levelKey: "Y9L6", objectiveCode: "Y9-L6-1", difficulty: "REASONING",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-9, 9], [-9, 9], [-9, 9]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["A shape is translated by ({a}, {c}) and then by ({b}, 0). What is the total horizontal movement?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the horizontal components of both vectors."],
    fr: {
      promptTemplates: ["Une forme est translatée par ({a}, {c}) puis par ({b}, 0). Quel est le déplacement horizontal total ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne les composantes horizontales des deux vecteurs."]
    },
    declaredVariationSpace: 19 * 19 * 19
  }),
  categoricalPoolTemplate({
    key: "y9l6.mcDescribeTranslation", levelKey: "Y9L6", objectiveCode: "Y9-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["VECTOR_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const x1 = rng.int(-20, 20);
      const y1 = rng.int(-20, 20);
      const dx = rng.int(-15, 15);
      const dy = rng.int(-15, 15);
      // The classic misconceptions are swapping the components and reversing
      // the direction — but each collapses onto the correct answer for some
      // draws (dx === dy, or both zero), which would leave a one-option
      // question, so fall back to a plainly-wrong offset in those cases.
      const swapped = dx === dy ? `(${dx + 1}, ${dy})` : `(${dy}, ${dx})`;
      const reversed = dx === 0 && dy === 0 ? `(${dx}, ${dy + 1})` : `(${-dx}, ${-dy})`;
      const distractors = swapped === reversed ? [swapped, `(${dx}, ${dy + 2})`] : [swapped, reversed];
      return {
        prompt: `Which vector translates (${x1}, ${y1}) to (${x1 + dx}, ${y1 + dy})?`,
        correctLabel: `(${dx}, ${dy})`,
        distractorLabels: distractors,
        explanationSteps: [`Horizontal change = ${dx}, vertical change = ${dy}.`],
        hints: ["Subtract the start coordinates from the end coordinates, in order."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which vector translates (.+) to (.+)\?$/);
        if (!m) return {};
        return { prompt: `Quel vecteur translate ${m[1]} en ${m[2]} ?`, hints: ["Soustrais les coordonnées de départ de celles d'arrivée, dans l'ordre."] };
      }
    },
    declaredVariationSpace: 5000
  }),

  // --- Y9-L6-2: standard geometric constructions ---
  categoricalPoolTemplate({
    key: "y9l6.mcConstructionMethod", levelKey: "Y9L6", objectiveCode: "Y9-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["CONSTRUCTION_METHOD_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { task: ["a perpendicular bisector of a line", "an angle bisector", "a 60° angle", "a perpendicular from a point to a line"] },
    build: (picked, rng) => {
      const methods: Record<string, string> = {
        "a perpendicular bisector of a line": "Draw arcs of equal radius from both endpoints and join where they cross",
        "an angle bisector": "Draw an arc from the vertex, then equal arcs from where it meets each arm",
        "a 60° angle": "Draw an arc from the endpoint, then an equal arc from where it meets the line",
        "a perpendicular from a point to a line": "Draw an arc from the point cutting the line twice, then bisect that segment"
      };
      const all = Object.values(methods);
      const correct = methods[picked.task!]!;
      const distractors = rng.shuffle(all.filter((m) => m !== correct)).slice(0, 2);
      const length = rng.int(4, 15);
      return {
        prompt: `You are constructing ${picked.task} on a ${length} cm drawing. Which method is correct?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`To construct ${picked.task}: ${correct.toLowerCase()}.`],
        hints: ["Constructions use compasses set to a fixed radius — never a protractor."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const taskFr: Record<string, string> = {
          "a perpendicular bisector of a line": "la médiatrice d'un segment",
          "an angle bisector": "la bissectrice d'un angle",
          "a 60° angle": "un angle de 60°",
          "a perpendicular from a point to a line": "la perpendiculaire d'un point à une droite"
        };
        const m = drawn.prompt.match(/on a (\d+) cm drawing/);
        return {
          prompt: `Tu construis ${taskFr[picked.task!]} sur un dessin de ${m ? m[1] : ""} cm. Quelle méthode est correcte ?`,
          hints: ["Les constructions utilisent un compas réglé sur un rayon fixe — jamais un rapporteur."]
        };
      }
    },
    declaredVariationSpace: 500
  }),
  arithmeticTemplate({
    key: "y9l6.perpendicularBisectorMidpoint", levelKey: "Y9L6", objectiveCode: "Y9-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["CONSTRUCTION_METHOD_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-10, 10], [1, 12]], compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ x2: v[0]! + v[1]! * 2 }),
    promptTemplates: ["A perpendicular bisector is constructed on the line from ({a}, 0) to ({x2}, 0). What is the x coordinate of the midpoint it passes through?"],
    explain: (v, r) => [`Midpoint x = (${v[0]} + ${v[0]! + v[1]! * 2}) ÷ 2 = ${r}.`],
    hints: () => ["The perpendicular bisector passes through the midpoint — average the two x coordinates."],
    fr: {
      promptTemplates: ["Une médiatrice est construite sur le segment de ({a}, 0) à ({x2}, 0). Quelle est l'abscisse du milieu par lequel elle passe ?"],
      explain: (v, r) => [`Abscisse du milieu = (${v[0]} + ${v[0]! + v[1]! * 2}) ÷ 2 = ${r}.`],
      hints: () => ["La médiatrice passe par le milieu — fais la moyenne des deux abscisses."]
    },
    declaredVariationSpace: 21 * 12
  }),
  arithmeticTemplate({
    key: "y9l6.angleBisectorHalf", levelKey: "Y9L6", objectiveCode: "Y9-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["CONSTRUCTION_METHOD_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 89], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ angle: v[0]! * 2 }),
    promptTemplates: ["An angle of {angle}° is bisected. What is the size of each half, in degrees?", "On a {b} cm construction, an angle of {angle}° is bisected. What is the size of each half, in degrees?"],
    explain: (v, r) => [`${v[0]! * 2} ÷ 2 = ${r}.`],
    hints: () => ["Bisecting means cutting exactly in half."],
    fr: {
      promptTemplates: ["Un angle de {angle}° est coupé par sa bissectrice. Quelle est la mesure de chaque moitié, en degrés ?", "Sur une construction de {b} cm, un angle de {angle}° est coupé par sa bissectrice. Quelle est la mesure de chaque moitié, en degrés ?"],
      explain: (v, r) => [`${v[0]! * 2} ÷ 2 = ${r}.`],
      hints: () => ["Tracer la bissectrice signifie couper exactement en deux."]
    },
    declaredVariationSpace: 89 * 19 * 2
  }),
  matchingTemplate({
    key: "y9l6.matchConstructionToTool", levelKey: "Y9L6", objectiveCode: "Y9-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["CONSTRUCTION_METHOD_ERROR"],
    generatePairs: (rng) => {
      const radius = rng.int(2, 25);
      const items = [
        { left: `Perpendicular bisector of a ${radius} cm line`, right: `Equal arcs of more than ${Math.ceil(radius / 2)} cm from both endpoints` },
        { left: `Angle bisector drawn with a ${radius} cm arc`, right: "Equal arcs from each arm of the angle" },
        { left: `60° angle on a ${radius} cm base`, right: `Arc of radius ${radius} cm from two points on the line` },
        { left: `Circle of radius ${radius} cm`, right: `Compasses set to ${radius} cm` }
      ];
      return rng.shuffle(items).slice(0, 3);
    },
    promptTemplates: ["Match each construction to the method that produces it."],
    explain: () => ["Each standard construction has its own arc pattern."],
    hints: () => ["Think about where the compass point goes and what radius stays fixed."],
    fr: {
      promptTemplates: ["Associe chaque construction à la méthode qui la produit."],
      explain: () => ["Chaque construction standard a son propre tracé d'arcs."],
      hints: () => ["Pense à l'endroit où va la pointe du compas et au rayon qui reste fixe."],
      translatePairs: (pairs) => pairs.map((p) => {
        const left = p.left
          .replace(/^Perpendicular bisector of a (\d+) cm line$/, "Médiatrice d'un segment de $1 cm")
          .replace(/^Angle bisector drawn with a (\d+) cm arc$/, "Bissectrice tracée avec un arc de $1 cm")
          .replace(/^60° angle on a (\d+) cm base$/, "Angle de 60° sur une base de $1 cm")
          .replace(/^Circle of radius (\d+) cm$/, "Cercle de rayon $1 cm");
        const right = p.right
          .replace(/^Equal arcs of more than (\d+) cm from both endpoints$/, "Arcs égaux de plus de $1 cm depuis les deux extrémités")
          .replace(/^Equal arcs from each arm of the angle$/, "Arcs égaux depuis chaque côté de l'angle")
          .replace(/^Arc of radius (\d+) cm from two points on the line$/, "Arc de rayon $1 cm depuis deux points de la droite")
          .replace(/^Compasses set to (\d+) cm$/, "Compas réglé sur $1 cm");
        return { left, right };
      })
    },
    declaredVariationSpace: 24 * 24
  }),
  arithmeticTemplate({
    key: "y9l6.constructTriangleThirdAngle", levelKey: "Y9L6", objectiveCode: "Y9-L6-2", difficulty: "REASONING",
    misconceptionTags: ["CONSTRUCTION_METHOD_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[15, 140], [15, 140]], constraint: (v) => v[0]! + v[1]! < 170,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: ["To construct a triangle you are given angles of {a}° and {b}°. What is the third angle you must draw, in degrees?"],
    explain: (v, r) => [`180 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["The three angles of the triangle must total 180°."],
    fr: {
      promptTemplates: ["Pour construire un triangle, on te donne des angles de {a}° et {b}°. Quel est le troisième angle à tracer, en degrés ?"],
      explain: (v, r) => [`180 - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les trois angles du triangle doivent faire 180° au total."]
    },
    declaredVariationSpace: 126 * 126
  }),

  // --- Y9-L6-3: combinations of transformations ---
  arithmeticTemplate({
    key: "y9l6.reflectInYAxis", levelKey: "Y9L6", objectiveCode: "Y9-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-12, 12], [-12, 12]], constraint: (v) => v[0]! !== 0,
    compute: (v) => -v[0]!,
    promptTemplates: ["The point ({a}, {b}) is reflected in the y-axis. What is the new x coordinate?"],
    explain: (v, r) => [`Reflecting in the y-axis changes the sign of x: ${v[0]} becomes ${r}.`],
    hints: () => ["Reflecting in the y-axis flips the sign of the x coordinate."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[1]!], [-v[0]!, v[1]!]], 4),
    fr: {
      promptTemplates: ["Le point ({a}, {b}) est réfléchi par rapport à l'axe des ordonnées. Quelle est la nouvelle abscisse ?"],
      explain: (v, r) => [`Une réflexion par rapport à l'axe des ordonnées change le signe de x : ${v[0]} devient ${r}.`],
      hints: () => ["Une réflexion par rapport à l'axe des ordonnées inverse le signe de l'abscisse."]
    },
    declaredVariationSpace: 24 * 25
  }),
  arithmeticTemplate({
    key: "y9l6.reflectInXAxis", levelKey: "Y9L6", objectiveCode: "Y9-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-12, 12], [-12, 12]], constraint: (v) => v[1]! !== 0,
    compute: (v) => -v[1]!,
    promptTemplates: ["The point ({a}, {b}) is reflected in the x-axis. What is the new y coordinate?"],
    explain: (v, r) => [`Reflecting in the x-axis changes the sign of y: ${v[1]} becomes ${r}.`],
    hints: () => ["Reflecting in the x-axis flips the sign of the y coordinate."],
    visualAid: (v) => visuals.coordinateGrid([[v[0]!, v[1]!], [v[0]!, -v[1]!]], 4),
    fr: {
      promptTemplates: ["Le point ({a}, {b}) est réfléchi par rapport à l'axe des abscisses. Quelle est la nouvelle ordonnée ?"],
      explain: (v, r) => [`Une réflexion par rapport à l'axe des abscisses change le signe de y : ${v[1]} devient ${r}.`],
      hints: () => ["Une réflexion par rapport à l'axe des abscisses inverse le signe de l'ordonnée."]
    },
    declaredVariationSpace: 25 * 24
  }),
  arithmeticTemplate({
    key: "y9l6.enlargeFromOrigin", levelKey: "Y9L6", objectiveCode: "Y9-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15], [2, 6]], compute: (v) => v[0]! * v[2]!,
    promptTemplates: ["The point ({a}, {b}) is enlarged from the origin by scale factor {c}. What is the new x coordinate?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${r}.`],
    hints: () => ["Enlarging from the origin multiplies both coordinates by the scale factor."],
    fr: {
      promptTemplates: ["Le point ({a}, {b}) est agrandi depuis l'origine avec un facteur d'échelle de {c}. Quelle est la nouvelle abscisse ?"],
      explain: (v, r) => [`${v[0]} x ${v[2]} = ${r}.`],
      hints: () => ["Un agrandissement depuis l'origine multiplie les deux coordonnées par le facteur d'échelle."]
    },
    declaredVariationSpace: 15 * 15 * 5
  }),
  arithmeticTemplate({
    key: "y9l6.combinedTransformation", levelKey: "Y9L6", objectiveCode: "Y9-L6-3", difficulty: "REASONING",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-10, 10], [-10, 10], [-8, 8]], constraint: (v) => v[0]! !== 0,
    compute: (v) => -v[0]! + v[2]!,
    promptTemplates: ["The point ({a}, {b}) is reflected in the y-axis, then translated by ({c}, 0). What is the final x coordinate?"],
    explain: (v, r) => [`Reflection gives x = ${-v[0]!}.`, `${-v[0]!} + ${v[2]} = ${r}.`],
    hints: () => ["Do the reflection first, then apply the translation to the result."],
    fr: {
      promptTemplates: ["Le point ({a}, {b}) est réfléchi par rapport à l'axe des ordonnées, puis translaté par ({c}, 0). Quelle est l'abscisse finale ?"],
      explain: (v, r) => [`La réflexion donne x = ${-v[0]!}.`, `${-v[0]!} + ${v[2]} = ${r}.`],
      hints: () => ["Effectue d'abord la réflexion, puis applique la translation au résultat."]
    },
    declaredVariationSpace: 20 * 21 * 17
  }),
  categoricalPoolTemplate({
    key: "y9l6.tfTransformationEffect", levelKey: "Y9L6", objectiveCode: "Y9-L6-3", difficulty: "REASONING",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "TRUE_FALSE",
    pools: { transform: ["a reflection in the x-axis", "a reflection in the y-axis", "a translation", "a rotation of 180° about the origin"] },
    build: (picked, rng) => {
      const x = rng.int(-9, 9);
      const y = rng.int(-9, 9);
      let image: [number, number];
      if (picked.transform === "a reflection in the x-axis") image = [x, -y];
      else if (picked.transform === "a reflection in the y-axis") image = [-x, y];
      else if (picked.transform === "a rotation of 180° about the origin") image = [-x, -y];
      else image = [x + 3, y + 3];
      const showTrue = rng.chance(0.5);
      const shown: [number, number] = showTrue ? image : [image[0] + rng.int(1, 4), image[1]];
      return {
        prompt: `Under ${picked.transform}, (${x}, ${y}) maps to (${shown[0]}, ${shown[1]}). True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${picked.transform} maps (${x}, ${y}) to (${image[0]}, ${image[1]}).`],
        hints: ["Work out the image yourself, then compare it with the one shown."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const transformFr: Record<string, string> = {
          "a reflection in the x-axis": "une réflexion par rapport à l'axe des abscisses",
          "a reflection in the y-axis": "une réflexion par rapport à l'axe des ordonnées",
          "a translation": "une translation",
          "a rotation of 180° about the origin": "une rotation de 180° autour de l'origine"
        };
        const m = drawn.prompt.match(/, (\(-?\d+, -?\d+\)) maps to (\(-?\d+, -?\d+\))\./);
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Avec ${transformFr[picked.transform!]}, ${m ? m[1] : ""} devient ${m ? m[2] : ""}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Calcule l'image toi-même, puis compare-la à celle qui est montrée."]
        };
      }
    },
    declaredVariationSpace: 2000
  })
];

export default level;
