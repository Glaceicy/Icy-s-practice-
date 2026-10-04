import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 7 — "Transformations, congruence and similarity"
const SHAPES = ["a triangle", "a rectangle", "a kite", "an arrow", "a trapezium", "an L-shape"];
const SHAPES_FR = ["un triangle", "un rectangle", "un cerf-volant", "une flèche", "un trapèze", "une forme en L"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L7-1: translations, rotations and reflections ---
  arithmeticTemplate({
    key: "y8l7.translationImageX", levelKey: "Y8L7", objectiveCode: "Y8-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-12, 12], [-12, 12], [-9, 9], [-9, 9]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: [
      "The point ({a}, {b}) is translated by the vector ({c}, {d}). What is the x-coordinate of the image?",
      "Translate ({a}, {b}) by ({c}, {d}) and give the new x-coordinate."
    ],
    explain: (v, r) => [`The top number of the vector moves the point horizontally.`, `${v[0]} + ${v[2]} = ${r}.`],
    hints: () => ["Add the top number of the vector to x; the bottom number changes y only."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) subit la translation de vecteur ({c}, {d}). Quelle est l'abscisse de l'image ?",
        "Applique la translation ({c}, {d}) au point ({a}, {b}) et donne la nouvelle abscisse."
      ],
      explain: (v, r) => [`Le nombre du haut du vecteur déplace le point horizontalement.`, `${v[0]} + ${v[2]} = ${r}.`],
      hints: () => ["Ajoute le nombre du haut du vecteur à x ; celui du bas ne change que y."]
    },
    declaredVariationSpace: 25 * 25 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y8l7.translationImageY", levelKey: "Y8L7", objectiveCode: "Y8-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-12, 12], [-12, 12], [-9, 9], [-9, 9]], compute: (v) => v[1]! + v[3]!,
    promptTemplates: [
      "The point ({a}, {b}) is translated by the vector ({c}, {d}). What is the y-coordinate of the image?",
      "Translate ({a}, {b}) by ({c}, {d}) and give the new y-coordinate."
    ],
    explain: (v, r) => [`The bottom number of the vector moves the point vertically.`, `${v[1]} + ${v[3]} = ${r}.`],
    hints: () => ["A negative bottom number moves the shape down."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) subit la translation de vecteur ({c}, {d}). Quelle est l'ordonnée de l'image ?",
        "Applique la translation ({c}, {d}) au point ({a}, {b}) et donne la nouvelle ordonnée."
      ],
      explain: (v, r) => [`Le nombre du bas du vecteur déplace le point verticalement.`, `${v[1]} + ${v[3]} = ${r}.`],
      hints: () => ["Un nombre du bas négatif déplace la figure vers le bas."]
    },
    declaredVariationSpace: 25 * 25 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y8l7.reflectionInYAxis", levelKey: "Y8L7", objectiveCode: "Y8-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[-15, 15], [-15, 15]], constraint: (v) => v[0]! !== 0,
    compute: (v) => -v[0]!,
    promptTemplates: [
      "The point ({a}, {b}) is reflected in the y-axis. What is the x-coordinate of the image?",
      "Reflect ({a}, {b}) in the y-axis. Give the new x-coordinate.",
      "A vertex at ({a}, {b}) is mirrored in the y-axis. Where does its x-coordinate land?"
    ],
    explain: (v, r) => [`A reflection in the y-axis keeps y and changes the sign of x.`, `${v[0]} becomes ${r}.`],
    hints: () => ["The y-axis is a vertical mirror, so left and right swap over."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) est réfléchi par l'axe des ordonnées. Quelle est l'abscisse de l'image ?",
        "Réfléchis ({a}, {b}) par l'axe des ordonnées. Donne la nouvelle abscisse.",
        "Un sommet en ({a}, {b}) est reflété par l'axe des ordonnées. Où arrive son abscisse ?"
      ],
      explain: (v, r) => [`Une réflexion par l'axe des ordonnées conserve y et change le signe de x.`, `${v[0]} devient ${r}.`],
      hints: () => ["L'axe des ordonnées est un miroir vertical : la gauche et la droite s'échangent."]
    },
    declaredVariationSpace: 30 * 31 * 3
  }),
  arithmeticTemplate({
    key: "y8l7.rotation180AboutOrigin", levelKey: "Y8L7", objectiveCode: "Y8-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "MULTI_STEP",
    ranges: [[-15, 15], [-15, 15]], constraint: (v) => v[1]! !== 0,
    compute: (v) => -v[1]!,
    promptTemplates: [
      "The point ({a}, {b}) is rotated 180° about the origin. What is the y-coordinate of the image?",
      "Rotate ({a}, {b}) by 180° about (0, 0) and give the new y-coordinate.",
      "A half turn about the origin maps ({a}, {b}) somewhere new. What is the image's y-coordinate?"
    ],
    explain: (v, r) => [`A 180° rotation about the origin changes the sign of both coordinates.`, `${v[1]} becomes ${r}.`],
    hints: () => ["A half turn about the origin sends (x, y) to (-x, -y)."],
    fr: {
      promptTemplates: [
        "Le point ({a}, {b}) subit une rotation de 180° autour de l'origine. Quelle est l'ordonnée de l'image ?",
        "Fais tourner ({a}, {b}) de 180° autour de (0, 0) et donne la nouvelle ordonnée.",
        "Un demi-tour autour de l'origine envoie ({a}, {b}) ailleurs. Quelle est l'ordonnée de l'image ?"
      ],
      explain: (v, r) => [`Une rotation de 180° autour de l'origine change le signe des deux coordonnées.`, `${v[1]} devient ${r}.`],
      hints: () => ["Un demi-tour autour de l'origine envoie (x, y) sur (-x, -y)."]
    },
    declaredVariationSpace: 31 * 30 * 3
  }),
  categoricalPoolTemplate({
    key: "y8l7.mcDescribeTransformation", levelKey: "Y8L7", objectiveCode: "Y8-L7-1", difficulty: "REASONING",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["translation", "reflection in the y-axis", "reflection in the x-axis", "rotation of 180° about the origin"] },
    build: (picked, rng) => {
      const x = rng.int(1, 12);
      const y = rng.int(1, 12);
      const dx = rng.int(1, 9);
      const dy = rng.int(1, 9);
      const images: Record<string, string> = {
        "translation": `(${x + dx}, ${y + dy})`,
        "reflection in the y-axis": `(${-x}, ${y})`,
        "reflection in the x-axis": `(${x}, ${-y})`,
        "rotation of 180° about the origin": `(${-x}, ${-y})`
      };
      const kind = picked.kind!;
      return {
        prompt: `The point (${x}, ${y}) maps to ${images[kind]}. Which single transformation does this?`,
        correctLabel: kind,
        distractorLabels: Object.keys(images).filter((k) => k !== kind).slice(0, 3),
        explanationSteps: [`Compare the coordinates: ${images[kind]} is what a ${kind} produces.`],
        hints: ["Check which coordinates changed sign and which simply moved."]
      };
    },
    fr: {
      translate: (drawn) => {
        const kindsFr: Record<string, string> = {
          "translation": "une translation",
          "reflection in the y-axis": "une réflexion par l'axe des ordonnées",
          "reflection in the x-axis": "une réflexion par l'axe des abscisses",
          "rotation of 180° about the origin": "une rotation de 180° autour de l'origine"
        };
        const m = drawn.prompt.match(/^The point \((.+?)\) maps to \((.+?)\)\./);
        if (!m) return {};
        return {
          prompt: `Le point (${m[1]}) est envoyé sur (${m[2]}). Quelle transformation unique fait cela ?`,
          correctLabel: kindsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => kindsFr[d] ?? d),
          hints: ["Regarde quelles coordonnées ont changé de signe et lesquelles se sont simplement déplacées."]
        };
      }
    },
    declaredVariationSpace: 4 * 12 * 12 * 9
  }),
  categoricalPoolTemplate({
    key: "y8l7.tfTransformationProperty", levelKey: "Y8L7", objectiveCode: "Y8-L7-1", difficulty: "REASONING",
    misconceptionTags: ["TRANSFORMATION_ERROR"], type: "TRUE_FALSE",
    pools: { shape: SHAPES },
    build: (picked, rng) => {
      const k = rng.int(2, 9);
      const valid = rng.chance(0.5);
      const validClaims = [
        `a translation of ${picked.shape} leaves every side length unchanged`,
        `a reflection of ${picked.shape} leaves every angle unchanged`,
        `a rotation of ${picked.shape} produces a congruent image`,
        `an enlargement of ${picked.shape} by scale factor ${k} leaves every angle unchanged`
      ];
      const invalidClaims = [
        `a translation of ${picked.shape} makes every side ${k} times longer`,
        `a reflection of ${picked.shape} doubles every angle`,
        `a rotation of ${picked.shape} produces a larger image`,
        `an enlargement of ${picked.shape} by scale factor ${k} multiplies every angle by ${k}`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Translations, reflections and rotations never change size or shape, and an enlargement changes lengths but never angles."
          : "Translations, reflections and rotations never resize a shape, and no transformation ever changes an angle."],
        hints: ["Only an enlargement changes size, and nothing ever changes an angle."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const shapesFr: Record<string, string> = Object.fromEntries(SHAPES.map((s, i) => [s, SHAPES_FR[i]!]));
        const isTrue = drawn.correctLabel === "True";
        const shapeFr = shapesFr[picked.shape!] ?? picked.shape!;
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^A translation of .+ leaves every side length unchanged$/, `Une translation de ${shapeFr} laisse toutes les longueurs inchangées`)
          .replace(/^A reflection of .+ leaves every angle unchanged$/, `Une réflexion de ${shapeFr} laisse tous les angles inchangés`)
          .replace(/^A rotation of .+ produces a congruent image$/, `Une rotation de ${shapeFr} produit une image isométrique`)
          .replace(/^An enlargement of .+ by scale factor (\d+) leaves every angle unchanged$/, `Un agrandissement de ${shapeFr} d'un facteur $1 laisse tous les angles inchangés`)
          .replace(/^A translation of .+ makes every side (\d+) times longer$/, `Une translation de ${shapeFr} rend chaque côté $1 fois plus long`)
          .replace(/^A reflection of .+ doubles every angle$/, `Une réflexion de ${shapeFr} double tous les angles`)
          .replace(/^A rotation of .+ produces a larger image$/, `Une rotation de ${shapeFr} produit une image plus grande`)
          .replace(/^An enlargement of .+ by scale factor (\d+) multiplies every angle by (\d+)$/, `Un agrandissement de ${shapeFr} d'un facteur $1 multiplie chaque angle par $2`);
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Les translations, réflexions et rotations ne changent ni la taille ni la forme, et un agrandissement change les longueurs mais jamais les angles."
            : "Les translations, réflexions et rotations ne redimensionnent jamais une figure, et aucune transformation ne change un angle."],
          hints: ["Seul un agrandissement change la taille, et rien ne change jamais un angle."]
        };
      }
    },
    declaredVariationSpace: 2 * 4 * SHAPES.length * 8
  }),

  // --- Y8-L7-2: congruent triangles ---
  categoricalPoolTemplate({
    key: "y8l7.mcCongruenceCondition", levelKey: "Y8L7", objectiveCode: "Y8-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["CONGRUENCE_CONDITION_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { condition: ["SSS", "SAS", "ASA", "RHS"] },
    build: (picked, rng) => {
      const p = rng.int(4, 18);
      const q = rng.int(5, 19);
      const r2 = rng.int(6, 20);
      const ang = rng.int(25, 110);
      const ang2 = rng.int(25, 110);
      const facts: Record<string, string> = {
        SSS: `all three pairs of sides measure ${p} cm, ${q} cm and ${r2} cm`,
        SAS: `two pairs of sides measure ${p} cm and ${q} cm, with the ${ang}° angle between them equal in both`,
        ASA: `two pairs of angles measure ${ang}° and ${ang2}°, with the ${p} cm side between them equal in both`,
        RHS: `both have a right angle, a hypotenuse of ${r2} cm and another side of ${p} cm`
      };
      const condition = picked.condition!;
      return {
        prompt: `In two triangles, ${facts[condition]}. Which condition proves they are congruent?`,
        correctLabel: condition,
        distractorLabels: ["SSS", "SAS", "ASA", "RHS"].filter((c) => c !== condition).slice(0, 3),
        explanationSteps: [`The facts given match the ${condition} condition exactly.`],
        hints: ["Count the sides (S) and angles (A) you are given, and notice where the angle sits."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^In two triangles, (.+)\. Which condition/);
        if (!m) return {};
        const factFr = m[1]!
          .replace(/^all three pairs of sides measure/, "les trois paires de côtés mesurent")
          .replace(/^two pairs of sides measure/, "deux paires de côtés mesurent")
          .replace(/^two pairs of angles measure/, "deux paires d'angles mesurent")
          .replace(/^both have a right angle, a hypotenuse of/, "les deux ont un angle droit, une hypoténuse de")
          .replace(/ and another side of /, " et un autre côté de ")
          .replace(/, with the (.+?) angle between them equal in both/, ", et l'angle de $1 entre eux est le même")
          .replace(/, with the (.+?) side between them equal in both/, ", et le côté de $1 entre eux est le même")
          .replace(/ and /g, " et ");
        return {
          prompt: `Dans deux triangles, ${factFr}. Quelle condition prouve qu'ils sont isométriques ?`,
          explanationSteps: [`Les données correspondent exactement à la condition ${drawn.correctLabel}.`],
          hints: ["Compte les côtés (S) et les angles (A) donnés, et repère où se trouve l'angle."]
        };
      }
    },
    declaredVariationSpace: 4 * 15 * 15 * 15
  }),
  arithmeticTemplate({
    key: "y8l7.congruentMissingAngle", levelKey: "Y8L7", objectiveCode: "Y8-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTI_STEP",
    ranges: [[20, 110], [20, 110]], constraint: (v) => v[0]! + v[1]! < 160,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: [
      "Two congruent triangles each have angles of {a}° and {b}°. What is the remaining angle, in degrees?",
      "Triangle ABC is congruent to triangle PQR. Two angles of ABC are {a}° and {b}°. Find the third angle of PQR, in degrees."
    ],
    explain: (v, r) => [`Congruent triangles have identical angles.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
    hints: () => ["Congruent means identical, and angles in any triangle add to 180°."],
    fr: {
      promptTemplates: [
        "Deux triangles isométriques ont chacun des angles de {a}° et {b}°. Quelle est la mesure de l'angle restant, en degrés ?",
        "Le triangle ABC est isométrique au triangle PQR. Deux angles de ABC valent {a}° et {b}°. Trouve le troisième angle de PQR, en degrés."
      ],
      explain: (v, r) => [`Les triangles isométriques ont les mêmes angles.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
      hints: () => ["Isométrique signifie identique, et la somme des angles d'un triangle vaut 180°."]
    },
    declaredVariationSpace: 91 * 91
  }),
  arithmeticTemplate({
    key: "y8l7.congruentPerimeter", levelKey: "Y8L7", objectiveCode: "Y8-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["CONGRUENCE_CONDITION_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[5, 40], [5, 40], [5, 40]],
    constraint: (v) => v[0]! + v[1]! > v[2]! && v[0]! + v[2]! > v[1]! && v[1]! + v[2]! > v[0]!,
    compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: [
      "Triangle ABC is congruent to triangle PQR. AB = {a} cm, BC = {b} cm and CA = {c} cm. What is the perimeter of PQR, in cm?",
      "A triangle congruent to one with sides {a} cm, {b} cm and {c} cm is drawn. What is its perimeter, in cm?"
    ],
    explain: (v, r) => [`Congruent triangles have identical sides.`, `${v[0]} + ${v[1]} + ${v[2]} = ${r} cm.`],
    hints: () => ["Congruent shapes are exactly the same size, so the perimeters match."],
    fr: {
      promptTemplates: [
        "Le triangle ABC est isométrique au triangle PQR. AB = {a} cm, BC = {b} cm et CA = {c} cm. Quel est le périmètre de PQR, en cm ?",
        "On trace un triangle isométrique à un triangle de côtés {a} cm, {b} cm et {c} cm. Quel est son périmètre, en cm ?"
      ],
      explain: (v, r) => [`Les triangles isométriques ont les mêmes côtés.`, `${v[0]} + ${v[1]} + ${v[2]} = ${r} cm.`],
      hints: () => ["Les figures isométriques ont exactement la même taille, donc les périmètres sont égaux."]
    },
    declaredVariationSpace: 36 * 36 * 36
  }),
  matchingTemplate({
    key: "y8l7.matchCongruenceConditions", levelKey: "Y8L7", objectiveCode: "Y8-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["CONGRUENCE_CONDITION_CONFUSION"],
    generatePairs: (rng) => {
      const a = rng.int(4, 18);
      const b = rng.int(5, 19);
      const c = rng.int(6, 20);
      const ang = rng.int(25, 110);
      const all = [
        { left: `sides ${a} cm, ${b} cm and ${c} cm`, right: "SSS" },
        { left: `sides ${a} cm and ${b} cm with the ${ang}° angle between them`, right: "SAS" },
        { left: `angles ${ang}° and ${ang + 15}° with the ${a} cm side between them`, right: "ASA" },
        { left: `a right angle, hypotenuse ${c} cm and side ${a} cm`, right: "RHS" }
      ];
      return rng.shuffle(all).slice(0, 3);
    },
    promptTemplates: ["Match each set of facts to the congruence condition it satisfies."],
    explain: () => ["S stands for a side and A for an angle; the order shows where the angle sits, and RHS needs a right angle and a hypotenuse."],
    hints: () => ["Write the facts out as a string of S and A letters, going round the triangle."],
    fr: {
      promptTemplates: ["Associe chaque ensemble de données à la condition d'isométrie qu'il vérifie."],
      explain: () => ["S désigne un côté et A un angle ; l'ordre montre où se trouve l'angle, et RHS exige un angle droit et une hypoténuse."],
      hints: () => ["Écris les données sous forme de lettres S et A en faisant le tour du triangle."],
      translatePairs: (pairs) => pairs.map((p) => ({
        left: p.left
          .replace(/^sides /, "côtés ")
          .replace(/^angles /, "angles ")
          .replace(/^a right angle, hypotenuse /, "un angle droit, hypoténuse ")
          .replace(/ with the (.+?) angle between them/, " avec l'angle de $1 entre eux")
          .replace(/ with the (.+?) side between them/, " avec le côté de $1 entre eux")
          .replace(/ and side /, " et côté ")
          .replace(/ and /g, " et "),
        right: p.right
      }))
    },
    declaredVariationSpace: 6000
  }),

  // --- Y8-L7-3: similar shapes ---
  arithmeticTemplate({
    key: "y8l7.scaleFactorFromLengths", levelKey: "Y8L7", objectiveCode: "Y8-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[2, 30], [2, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ big: v[0]! * v[1]! }),
    promptTemplates: [
      "Two similar shapes have corresponding sides of {a} cm and {big} cm. What is the scale factor from small to large?",
      "{ctx} is enlarged so that a {a} cm side becomes {big} cm. What is the scale factor?"
    ],
    explain: (v, r) => [`${v[0]} x ${r} = ${v[0]! * v[1]!}, so the scale factor is ${r}.`],
    hints: () => ["Divide the new length by the matching old length."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Deux figures semblables ont des côtés correspondants de {a} cm et {big} cm. Quel est le facteur d'échelle du petit vers le grand ?",
        "{ctx} est agrandi de sorte qu'un côté de {a} cm devienne {big} cm. Quel est le facteur d'échelle ?"
      ],
      explain: (v, r) => [`${v[0]} x ${r} = ${v[0]! * v[1]!}, donc le facteur d'échelle est ${r}.`],
      hints: () => ["Divise la nouvelle longueur par l'ancienne correspondante."]
    },
    declaredVariationSpace: 29 * 11 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y8l7.similarMissingLength", levelKey: "Y8L7", objectiveCode: "Y8-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "MULTI_STEP", contextPool: SHAPES,
    ranges: [[2, 20], [2, 9], [3, 30]], compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ big: v[0]! * v[1]! }),
    promptTemplates: [
      "In two similar shapes, {a} cm corresponds to {big} cm. What corresponds to {c} cm, in cm?",
      "{ctx} is enlarged: {a} cm becomes {big} cm. What does a {c} cm side become, in cm?"
    ],
    explain: (v, r) => [`The scale factor is ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`, `${v[2]} x ${v[1]} = ${r} cm.`],
    hints: () => ["Find the scale factor from the pair you know, then apply it to the length you want."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Dans deux figures semblables, {a} cm correspond à {big} cm. À quoi correspond {c} cm, en cm ?",
        "{ctx} est agrandi : {a} cm devient {big} cm. Que devient un côté de {c} cm, en cm ?"
      ],
      explain: (v, r) => [`Le facteur d'échelle est ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`, `${v[2]} x ${v[1]} = ${r} cm.`],
      hints: () => ["Trouve le facteur d'échelle avec la paire connue, puis applique-le à la longueur voulue."]
    },
    declaredVariationSpace: 19 * 8 * 28 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y8l7.similarTriangleAngle", levelKey: "Y8L7", objectiveCode: "Y8-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["SIMILAR_CONGRUENT_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[20, 110], [20, 110]], constraint: (v) => v[0]! + v[1]! < 160,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: [
      "Two similar triangles have angles of {a}° and {b}°. What is the third angle of either triangle, in degrees?",
      "A triangle with angles {a}° and {b}° is enlarged. What is the third angle of the enlarged triangle, in degrees?"
    ],
    explain: (v, r) => [`Similar shapes have equal angles, whatever their size.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
    hints: () => ["Enlargement never changes an angle, so the angles of similar triangles match exactly."],
    fr: {
      promptTemplates: [
        "Deux triangles semblables ont des angles de {a}° et {b}°. Quel est le troisième angle de l'un ou l'autre, en degrés ?",
        "Un triangle d'angles {a}° et {b}° est agrandi. Quel est le troisième angle du triangle agrandi, en degrés ?"
      ],
      explain: (v, r) => [`Les figures semblables ont des angles égaux, quelle que soit leur taille.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
      hints: () => ["Un agrandissement ne change jamais un angle : les angles de triangles semblables sont identiques."]
    },
    declaredVariationSpace: 91 * 91
  }),
  categoricalPoolTemplate({
    key: "y8l7.mcSimilarOrCongruent", levelKey: "Y8L7", objectiveCode: "Y8-L7-3", difficulty: "REASONING",
    misconceptionTags: ["SIMILAR_CONGRUENT_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["congruent", "similar", "neither"] },
    build: (picked, rng) => {
      const a = rng.int(3, 20);
      const k = rng.int(2, 9);
      const b = rng.int(4, 21);
      const descriptions: Record<string, string> = {
        congruent: `two triangles both with sides ${a} cm, ${b} cm and ${a + b - 1} cm`,
        similar: `a triangle with sides ${a} cm, ${b} cm and ${a + b - 1} cm and one with sides ${a * k} cm, ${b * k} cm and ${(a + b - 1) * k} cm`,
        neither: `a triangle with sides ${a} cm, ${b} cm and ${a + b - 1} cm and one with sides ${a + 1} cm, ${b * k} cm and ${a + b + 2} cm`
      };
      const labels: Record<string, string> = {
        congruent: "congruent",
        similar: "similar but not congruent",
        neither: "neither similar nor congruent"
      };
      const kind = picked.kind!;
      return {
        prompt: `Describe the relationship between ${descriptions[kind]}.`,
        correctLabel: labels[kind]!,
        distractorLabels: Object.values(labels).filter((l) => l !== labels[kind]),
        explanationSteps: [kind === "congruent"
          ? "All three pairs of sides are equal, so the triangles are congruent."
          : kind === "similar"
            ? `Every side has been multiplied by ${k}, so the triangles are similar but different sizes.`
            : "The sides are not all in the same ratio, so the triangles are not similar."],
        hints: ["Check whether every pair of sides has the same ratio — a ratio of 1 means congruent."]
      };
    },
    fr: {
      translate: (drawn) => {
        const labelsFr: Record<string, string> = {
          congruent: "isométriques",
          "similar but not congruent": "semblables mais non isométriques",
          "neither similar nor congruent": "ni semblables ni isométriques"
        };
        const m = drawn.prompt.match(/^Describe the relationship between (.+)\.$/);
        const descFr = (m ? m[1]! : "")
          .replace(/^two triangles both with sides /, "deux triangles ayant tous les deux des côtés de ")
          .replace(/a triangle with sides /g, "un triangle de côtés ")
          .replace(/ and one with sides /, " et un autre de côtés ")
          .replace(/ and /g, " et ");
        return {
          prompt: `Décris la relation entre ${descFr}.`,
          correctLabel: labelsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => labelsFr[d] ?? d),
          hints: ["Vérifie si toutes les paires de côtés ont le même rapport — un rapport de 1 signifie isométriques."]
        };
      }
    },
    declaredVariationSpace: 3 * 18 * 8 * 18
  }),
  arithmeticTemplate({
    key: "y8l7.similarAreaFromScaleFactor", levelKey: "Y8L7", objectiveCode: "Y8-L7-3", difficulty: "REASONING",
    misconceptionTags: ["AREA_SCALE_FACTOR_ERROR"], type: "MULTI_STEP", contextPool: SHAPES,
    ranges: [[2, 7], [5, 60]], compute: (v) => v[1]! * v[0]! * v[0]!,
    promptTemplates: [
      "Two similar shapes have a length scale factor of {a}. The smaller has area {b} cm². What is the larger area, in cm²?",
      "{ctx} with area {b} cm² is enlarged by scale factor {a}. What is the new area, in cm²?"
    ],
    explain: (v, r) => [`The area scale factor is ${v[0]}² = ${v[0]! * v[0]!}.`, `${v[1]} x ${v[0]! * v[0]!} = ${r} cm².`],
    hints: () => ["Areas grow by the square of the length scale factor."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Deux figures semblables ont un facteur d'échelle de longueur de {a}. La plus petite a une aire de {b} cm². Quelle est l'aire de la plus grande, en cm² ?",
        "{ctx} d'aire {b} cm² est agrandi d'un facteur {a}. Quelle est la nouvelle aire, en cm² ?"
      ],
      explain: (v, r) => [`Le facteur d'échelle des aires est ${v[0]}² = ${v[0]! * v[0]!}.`, `${v[1]} x ${v[0]! * v[0]!} = ${r} cm².`],
      hints: () => ["Les aires grandissent selon le carré du facteur d'échelle des longueurs."]
    },
    declaredVariationSpace: 6 * 56 * (1 + SHAPES.length)
  })
];

export default level;
