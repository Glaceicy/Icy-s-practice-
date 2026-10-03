import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 8 — "Angles, constructions and properties of shapes"
const SHAPES = ["triangle", "square", "rectangle", "pentagon", "hexagon", "rhombus", "trapezium", "parallelogram"];
const SHAPES_FR = ["triangle", "carré", "rectangle", "pentagone", "hexagone", "losange", "trapèze", "parallélogramme"];

export const level: QuestionTemplateDef[] = [
  // --- Y7-L8-1: sum of angles in a triangle and properties of other shapes ---
  arithmeticTemplate({
    key: "y7l8.findThirdAngleTriangle", levelKey: "Y7L8", objectiveCode: "Y7-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 150], [10, 150]], constraint: (v) => v[0]! + v[1]! < 175,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: ["Two angles in a triangle are {a}° and {b}°. What is the third angle, in degrees?", "A triangle has angles of {a}° and {b}°. Find the missing angle in degrees."],
    explain: (v, r) => [`Angles in a triangle add to 180°.`, `180 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["The angles in any triangle always add up to 180°."],
    fr: {
      promptTemplates: ["Deux angles d'un triangle mesurent {a}° et {b}°. Quel est le troisième angle, en degrés ?", "Un triangle a des angles de {a}° et {b}°. Trouve l'angle manquant en degrés."],
      explain: (v, r) => [`Les angles d'un triangle font 180° au total.`, `180 - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les angles de tout triangle font toujours 180° au total."]
    },
    declaredVariationSpace: 141 * 141
  }),
  arithmeticTemplate({
    key: "y7l8.mcThirdAngleTriangle", levelKey: "Y7L8", objectiveCode: "Y7-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 150], [10, 150]], constraint: (v) => v[0]! + v[1]! < 175,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: ["A triangle has angles {a}° and {b}°. What is the third angle?"],
    explain: (v, r) => [`180 - ${v[0]} - ${v[1]} = ${r}°.`],
    hints: () => ["Angles in a triangle sum to 180°."],
    distractorSpread: 12,
    fr: {
      promptTemplates: ["Un triangle a des angles de {a}° et {b}°. Quel est le troisième angle ?"],
      hints: () => ["Les angles d'un triangle font 180° au total."]
    },
    declaredVariationSpace: 141 * 141
  }),
  arithmeticTemplate({
    key: "y7l8.isoscelesBaseAngle", levelKey: "Y7L8", objectiveCode: "Y7-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[1, 87]], compute: (v) => (180 - v[0]! * 2) / 2,
    derive: (v) => ({ apex: v[0]! * 2 }),
    promptTemplates: ["An isosceles triangle has an apex angle of {apex}°. What is each base angle, in degrees?", "A roof truss shaped like an isosceles triangle, drawn next to a {ctx}, has an apex angle of {apex}°. What is each base angle, in degrees?"],
    explain: (v, r) => [`180 - ${v[0]! * 2} = ${180 - v[0]! * 2}.`, `${180 - v[0]! * 2} ÷ 2 = ${r}.`],
    hints: () => ["Subtract the apex angle from 180°, then halve what is left — the two base angles are equal."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: ["Un triangle isocèle a un angle au sommet de {apex}°. Combien mesure chaque angle de base, en degrés ?", "Une ferme de toit en forme de triangle isocèle, dessinée à côté d'un {ctx}, a un angle au sommet de {apex}°. Combien mesure chaque angle de base, en degrés ?"],
      hints: () => ["Soustrais l'angle au sommet de 180°, puis divise le reste par deux — les deux angles de base sont égaux."]
    },
    declaredVariationSpace: 87 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y7l8.quadrilateralAngleSum", levelKey: "Y7L8", objectiveCode: "Y7-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[20, 140], [20, 140], [20, 140]], constraint: (v) => v[0]! + v[1]! + v[2]! < 350,
    compute: (v) => 360 - v[0]! - v[1]! - v[2]!,
    promptTemplates: ["Three angles in a quadrilateral are {a}°, {b}° and {c}°. What is the fourth angle, in degrees?"],
    explain: (v, r) => [`Angles in a quadrilateral add to 360°.`, `360 - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["The angles in any quadrilateral always add up to 360°."],
    fr: {
      promptTemplates: ["Trois angles d'un quadrilatère mesurent {a}°, {b}° et {c}°. Quel est le quatrième angle, en degrés ?"],
      explain: (v, r) => [`Les angles d'un quadrilatère font 360° au total.`, `360 - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
      hints: () => ["Les angles de tout quadrilatère font toujours 360° au total."]
    },
    declaredVariationSpace: 121 * 121 * 121
  }),
  categoricalPoolTemplate({
    key: "y7l8.tfTriangleAngleSum", levelKey: "Y7L8", objectiveCode: "Y7-L8-1", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(20, 120);
      const b = rng.int(20, Math.max(21, 155 - a));
      const c = 180 - a - b;
      const showValid = rng.chance(0.5);
      const shownC = showValid ? c : c + rng.int(1, 15);
      return {
        prompt: `A triangle can have angles of ${a}°, ${b}° and ${shownC}°. True or false?`,
        correctLabel: showValid ? "True" : "False",
        distractorLabels: [showValid ? "False" : "True"],
        explanationSteps: [`${a} + ${b} + ${shownC} = ${a + b + shownC}, and a triangle's angles must total exactly 180°.`],
        hints: ["Add all three angles — they must total exactly 180°."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A triangle can have angles of (\d+)°, (\d+)° and (\d+)°\. True or false\?/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un triangle peut avoir des angles de ${m[1]}°, ${m[2]}° et ${m[3]}°. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`${m[1]} + ${m[2]} + ${m[3]} = ${Number(m[1]) + Number(m[2]) + Number(m[3])}, or les angles d'un triangle doivent faire exactement 180°.`],
          hints: ["Additionne les trois angles — ils doivent faire exactement 180°."]
        };
      }
    },
    declaredVariationSpace: 2000
  }),

  // --- Y7-L8-2: ruler and protractor conventions for constructing shapes ---
  categoricalPoolTemplate({
    key: "y7l8.mcConstructionTool", levelKey: "Y7L8", objectiveCode: "Y7-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["CONSTRUCTION_CONVENTION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { task: ["measure an angle", "measure a length", "draw a circle of fixed radius", "draw a straight line"] },
    build: (picked, rng) => {
      const tools: Record<string, string> = {
        "measure an angle": "protractor",
        "measure a length": "ruler",
        "draw a circle of fixed radius": "pair of compasses",
        "draw a straight line": "ruler"
      };
      const all = ["protractor", "ruler", "pair of compasses", "set square"];
      const correct = tools[picked.task!]!;
      const distractors = rng.shuffle(all.filter((t) => t !== correct)).slice(0, 2);
      const size = rng.int(2, 30);
      const context = rng.pick(SHAPES);
      return {
        prompt: `You are constructing a ${context} with a side of ${size} cm. Which tool would you use to ${picked.task}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`To ${picked.task}, use a ${correct}.`],
        hints: ["Match the drawing or measuring job to the right instrument."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const taskFr: Record<string, string> = {
          "measure an angle": "mesurer un angle",
          "measure a length": "mesurer une longueur",
          "draw a circle of fixed radius": "tracer un cercle de rayon fixe",
          "draw a straight line": "tracer une ligne droite"
        };
        const toolFr: Record<string, string> = { protractor: "rapporteur", ruler: "règle", "pair of compasses": "compas", "set square": "équerre" };
        const m = drawn.prompt.match(/^You are constructing a (\S+) with a side of (\d+) cm\./);
        const shapeIndex = m ? SHAPES.indexOf(m[1]!) : -1;
        const shapeFr = shapeIndex >= 0 ? SHAPES_FR[shapeIndex]! : (m ? m[1]! : "");
        const intro = m ? `Tu construis un ${shapeFr} avec un côté de ${m[2]} cm. ` : "";
        return {
          prompt: `${intro}Quel instrument utiliserais-tu pour ${taskFr[picked.task!]} ?`,
          correctLabel: toolFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => toolFr[d] ?? d),
          explanationSteps: [`Pour ${taskFr[picked.task!]}, utilise un(e) ${toolFr[drawn.correctLabel] ?? drawn.correctLabel}.`],
          hints: ["Associe la tâche de tracé ou de mesure au bon instrument."]
        };
      }
    },
    declaredVariationSpace: 200
  }),
  arithmeticTemplate({
    key: "y7l8.reflexAngle", levelKey: "Y7L8", objectiveCode: "Y7-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["CONSTRUCTION_CONVENTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[5, 179]], compute: (v) => 360 - v[0]!,
    promptTemplates: ["An angle measured with a protractor is {a}°. What is the reflex angle on the other side, in degrees?", "A protractor reads {a}°. What is the reflex angle that completes the full turn?"],
    explain: (v, r) => [`A full turn is 360°.`, `360 - ${v[0]} = ${r}.`],
    hints: () => ["A full turn is 360°, so subtract the measured angle from 360."],
    fr: {
      promptTemplates: ["Un angle mesuré au rapporteur vaut {a}°. Quel est l'angle rentrant de l'autre côté, en degrés ?", "Un rapporteur indique {a}°. Quel est l'angle rentrant qui complète le tour complet ?"],
      explain: (v, r) => [`Un tour complet fait 360°.`, `360 - ${v[0]} = ${r}.`],
      hints: () => ["Un tour complet fait 360°, soustrais donc l'angle mesuré de 360."]
    },
    declaredVariationSpace: 175 * 2
  }),
  categoricalPoolTemplate({
    key: "y7l8.classifyTriangleByAngles", levelKey: "Y7L8", objectiveCode: "Y7-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["SHAPE_PROPERTY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const kind = rng.pick(["right-angled", "obtuse", "acute"]);
      let a: number, b: number, c: number;
      if (kind === "right-angled") {
        a = 90;
        b = rng.int(20, 69);
        c = 180 - a - b;
      } else if (kind === "obtuse") {
        a = rng.int(91, 150);
        b = rng.int(10, 180 - a - 10);
        c = 180 - a - b;
      } else {
        a = rng.int(50, 85);
        b = rng.int(50, 180 - a - 10 > 85 ? 85 : 180 - a - 10);
        c = 180 - a - b;
      }
      return {
        prompt: `A triangle has angles ${a}°, ${b}° and ${c}°. What type of triangle is it?`,
        correctLabel: kind,
        distractorLabels: ["right-angled", "obtuse", "acute"].filter((k) => k !== kind),
        explanationSteps: [`The largest angle is ${Math.max(a, b, c)}°, so the triangle is ${kind}.`],
        hints: ["Look at the largest angle: 90° exactly is right-angled, more than 90° is obtuse, all under 90° is acute."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A triangle has angles (\d+)°, (\d+)° and (\d+)°/);
        if (!m) return {};
        const kindFr: Record<string, string> = { "right-angled": "rectangle", obtuse: "obtusangle", acute: "acutangle" };
        return {
          prompt: `Un triangle a des angles de ${m[1]}°, ${m[2]}° et ${m[3]}°. Quel type de triangle est-ce ?`,
          correctLabel: kindFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => kindFr[d] ?? d),
          explanationSteps: [`Le plus grand angle détermine le type du triangle.`],
          hints: ["Regarde le plus grand angle : exactement 90° = rectangle, plus de 90° = obtusangle, tous inférieurs à 90° = acutangle."]
        };
      }
    },
    declaredVariationSpace: 1500
  }),
  categoricalPoolTemplate({
    key: "y7l8.mcShapeProperty", levelKey: "Y7L8", objectiveCode: "Y7-L8-2", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_PROPERTY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { shape: SHAPES },
    build: (picked, rng) => {
      const sides: Record<string, number> = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, rhombus: 4, trapezium: 4, parallelogram: 4 };
      const correct = sides[picked.shape!]!;
      const wrong1 = correct + rng.int(1, 3);
      const wrong2 = Math.max(3, correct - rng.int(1, 2));
      return {
        prompt: `How many sides does a ${picked.shape} have?`,
        correctLabel: String(correct),
        distractorLabels: [String(wrong1), String(wrong2 === correct ? correct + 4 : wrong2)],
        explanationSteps: [`A ${picked.shape} has ${correct} sides.`],
        hints: ["Count the straight edges of the shape."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const index = SHAPES.indexOf(picked.shape!);
        const shapeFr = index >= 0 ? SHAPES_FR[index]! : picked.shape!;
        return {
          prompt: `Combien de côtés a un ${shapeFr} ?`,
          explanationSteps: [`Un ${shapeFr} a ${drawn.correctLabel} côtés.`],
          hints: ["Compte les côtés droits de la forme."]
        };
      }
    },
    declaredVariationSpace: 200
  }),
  arithmeticTemplate({
    key: "y7l8.interiorAngleSumPolygon", levelKey: "Y7L8", objectiveCode: "Y7-L8-2", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[3, 30]], compute: (v) => (v[0]! - 2) * 180,
    promptTemplates: ["A polygon has {a} sides. What is the sum of its interior angles, in degrees?", "A tiling pattern uses a shape like a {ctx} but with {a} sides. What is the sum of its interior angles, in degrees?"],
    explain: (v, r) => [`A polygon with ${v[0]} sides splits into ${v[0]! - 2} triangles.`, `${v[0]! - 2} x 180 = ${r}.`],
    hints: () => ["Split the polygon into triangles: (number of sides - 2) x 180°."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: ["Un polygone a {a} côtés. Quelle est la somme de ses angles intérieurs, en degrés ?", "Un motif de pavage utilise une forme comme un {ctx} mais avec {a} côtés. Quelle est la somme de ses angles intérieurs, en degrés ?"],
      explain: (v, r) => [`Un polygone à ${v[0]} côtés se découpe en ${v[0]! - 2} triangles.`, `${v[0]! - 2} x 180 = ${r}.`],
      hints: () => ["Découpe le polygone en triangles : (nombre de côtés - 2) x 180°."]
    },
    declaredVariationSpace: 28 * (1 + SHAPES.length)
  }),

  // --- Y7-L8-3: angles on a straight line, around a point, vertically opposite ---
  arithmeticTemplate({
    key: "y7l8.anglesOnStraightLine", levelKey: "Y7L8", objectiveCode: "Y7-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_FACT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[5, 175]], compute: (v) => 180 - v[0]!,
    promptTemplates: ["Two angles sit on a straight line. One is {a}°. What is the other, in degrees?", "Angles on a straight line: one angle is {a}°. Find the other."],
    explain: (v, r) => [`Angles on a straight line add to 180°.`, `180 - ${v[0]} = ${r}.`],
    hints: () => ["Angles on a straight line always add up to 180°."],
    fr: {
      promptTemplates: ["Deux angles sont sur une ligne droite. L'un mesure {a}°. Combien mesure l'autre, en degrés ?", "Angles sur une ligne droite : un angle mesure {a}°. Trouve l'autre."],
      explain: (v, r) => [`Les angles sur une ligne droite font 180° au total.`, `180 - ${v[0]} = ${r}.`],
      hints: () => ["Les angles sur une ligne droite font toujours 180° au total."]
    },
    declaredVariationSpace: 171 * 2
  }),
  arithmeticTemplate({
    key: "y7l8.anglesAroundPoint", levelKey: "Y7L8", objectiveCode: "Y7-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_FACT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[20, 170], [20, 170]], constraint: (v) => v[0]! + v[1]! < 350,
    compute: (v) => 360 - v[0]! - v[1]!,
    promptTemplates: ["Three angles meet at a point. Two are {a}° and {b}°. What is the third, in degrees?"],
    explain: (v, r) => [`Angles around a point add to 360°.`, `360 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Angles around a point always add up to 360°."],
    fr: {
      promptTemplates: ["Trois angles se rejoignent en un point. Deux mesurent {a}° et {b}°. Combien mesure le troisième, en degrés ?"],
      explain: (v, r) => [`Les angles autour d'un point font 360° au total.`, `360 - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les angles autour d'un point font toujours 360° au total."]
    },
    declaredVariationSpace: 151 * 151
  }),
  arithmeticTemplate({
    key: "y7l8.verticallyOppositeAngle", levelKey: "Y7L8", objectiveCode: "Y7-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["ANGLE_FACT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[5, 175]], compute: (v) => 180 - v[0]!,
    promptTemplates: ["Two straight lines cross. One angle is {a}°. What is the angle next to it on the same straight line, in degrees?"],
    explain: (v, r) => [`The angle next to it on the straight line makes 180° with it.`, `180 - ${v[0]} = ${r}.`],
    hints: () => ["Vertically opposite angles are equal; angles on a straight line add to 180°."],
    fr: {
      promptTemplates: ["Deux lignes droites se croisent. Un angle mesure {a}°. Combien mesure l'angle voisin sur la même droite, en degrés ?"],
      explain: (v, r) => [`L'angle voisin sur la droite forme 180° avec lui.`, `180 - ${v[0]} = ${r}.`],
      hints: () => ["Les angles opposés par le sommet sont égaux ; les angles sur une droite font 180°."]
    },
    declaredVariationSpace: 171
  }),
  arithmeticTemplate({
    key: "y7l8.mcAnglesOnStraightLine", levelKey: "Y7L8", objectiveCode: "Y7-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_FACT_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[5, 175]], compute: (v) => 180 - v[0]!,
    promptTemplates: ["An angle of {a}° sits on a straight line. What is the other angle?"],
    explain: (v, r) => [`180 - ${v[0]} = ${r}°.`],
    hints: () => ["Angles on a straight line add to 180°."],
    distractorSpread: 12,
    fr: {
      promptTemplates: ["Un angle de {a}° est sur une ligne droite. Combien mesure l'autre angle ?"],
      hints: () => ["Les angles sur une ligne droite font 180° au total."]
    },
    declaredVariationSpace: 171
  }),
  arithmeticTemplate({
    key: "y7l8.wordProblemAngles", levelKey: "Y7L8", objectiveCode: "Y7-L8-3", difficulty: "REASONING",
    misconceptionTags: ["ANGLE_FACT_ERROR"], type: "WORD_PROBLEM",
    ranges: [[20, 170], [20, 170]], constraint: (v) => v[0]! + v[1]! < 350,
    compute: (v) => 360 - v[0]! - v[1]!,
    promptTemplates: ["A pizza is cut into three slices meeting at the centre. Two slices have angles of {a}° and {b}°. What is the angle of the third slice, in degrees?"],
    explain: (v, r) => [`Angles around a point add to 360°.`, `360 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["The slices meet at a point, so their angles total 360°."],
    visualAid: (v) => visuals.shape("circle", { slices: [v[0]!, v[1]!, 360 - v[0]! - v[1]!] }),
    fr: {
      promptTemplates: ["Une pizza est coupée en trois parts se rejoignant au centre. Deux parts ont des angles de {a}° et {b}°. Quel est l'angle de la troisième part, en degrés ?"],
      explain: (v, r) => [`Les angles autour d'un point font 360° au total.`, `360 - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les parts se rejoignent en un point, donc leurs angles font 360° au total."]
    },
    declaredVariationSpace: 151 * 151
  })
];

export default level;
