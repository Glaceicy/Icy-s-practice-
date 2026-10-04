import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 6 — "Geometry, constructions, congruence and similarity"
const TRIANGLES = ["ABC", "PQR", "XYZ", "DEF", "KLM", "RST", "LMN", "GHJ"];
const SHAPES = ["two triangles", "two rectangles", "two trapeziums", "two pentagons", "two kites", "two parallelograms"];
const SHAPES_FR = ["deux triangles", "deux rectangles", "deux trapèzes", "deux pentagones", "deux cerfs-volants", "deux parallélogrammes"];
const SOLIDS = ["two cylinders", "two cones", "two square-based pyramids", "two prisms", "two spheres", "two cuboids"];
const SOLIDS_FR = ["deux cylindres", "deux cônes", "deux pyramides à base carrée", "deux prismes", "deux sphères", "deux pavés droits"];

export const level: QuestionTemplateDef[] = [
  // --- Y10-L6-1: conditions for congruent triangles (SSS, SAS, ASA, RHS) ---
  categoricalPoolTemplate({
    key: "y10l6.mcCongruenceCondition", levelKey: "Y10L6", objectiveCode: "Y10-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["CONGRUENCE_CONDITION_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { condition: ["SSS", "SAS", "ASA", "RHS"] },
    build: (picked, rng) => {
      const p = rng.int(4, 18);
      const q = rng.int(5, 19);
      const r = rng.int(6, 20);
      const ang = rng.int(25, 110);
      const ang2 = rng.int(25, 110);
      const facts: Record<string, string> = {
        SSS: `all three pairs of sides measure ${p} cm, ${q} cm and ${r} cm`,
        SAS: `two pairs of sides measure ${p} cm and ${q} cm, with the ${ang}° angle between them equal in both`,
        ASA: `two pairs of angles measure ${ang}° and ${ang2}°, with the ${p} cm side between them equal in both`,
        RHS: `both have a right angle, a hypotenuse of ${r} cm and another side of ${p} cm`
      };
      const condition = picked.condition!;
      return {
        prompt: `In two triangles, ${facts[condition]}. Which condition proves the triangles are congruent?`,
        correctLabel: condition,
        distractorLabels: ["SSS", "SAS", "ASA", "RHS"].filter((c) => c !== condition).slice(0, 3),
        explanationSteps: [`The information given matches the ${condition} condition exactly.`],
        hints: ["Count how many sides (S) and how many angles (A) are given, and note where the angle sits."]
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
          prompt: `Dans deux triangles, ${factFr}. Quelle condition prouve que les triangles sont isométriques ?`,
          explanationSteps: [`Les informations données correspondent exactement à la condition ${drawn.correctLabel}.`],
          hints: ["Compte les côtés (S) et les angles (A) donnés, et regarde où se trouve l'angle."]
        };
      }
    },
    declaredVariationSpace: 4 * 15 * 15 * 15
  }),
  arithmeticTemplate({
    key: "y10l6.congruentTrianglePerimeter", levelKey: "Y10L6", objectiveCode: "Y10-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["CONGRUENCE_CONDITION_CONFUSION"], type: "NUMBER_ENTRY", contextPool: TRIANGLES,
    ranges: [[5, 40], [5, 40], [5, 40]],
    constraint: (v) => v[0]! + v[1]! > v[2]! && v[0]! + v[2]! > v[1]! && v[1]! + v[2]! > v[0]!,
    compute: (v) => v[0]! + v[1]! + v[2]!,
    promptTemplates: [
      "Triangle ABC is congruent to triangle PQR. AB = {a} cm, BC = {b} cm and CA = {c} cm. What is the perimeter of triangle PQR, in cm?",
      "Triangle {ctx} is congruent to a triangle with sides {a} cm, {b} cm and {c} cm. What is the perimeter of triangle {ctx}, in cm?"
    ],
    explain: (v, r) => [`Congruent triangles have identical sides, so the perimeter is ${v[0]} + ${v[1]} + ${v[2]} = ${r} cm.`],
    hints: () => ["Congruent means identical in shape and size, so the sides are the same."],
    fr: {
      contextPool: TRIANGLES,
      promptTemplates: [
        "Le triangle ABC est isométrique au triangle PQR. AB = {a} cm, BC = {b} cm et CA = {c} cm. Quel est le périmètre du triangle PQR, en cm ?",
        "Le triangle {ctx} est isométrique à un triangle de côtés {a} cm, {b} cm et {c} cm. Quel est le périmètre du triangle {ctx}, en cm ?"
      ],
      explain: (v, r) => [`Les triangles isométriques ont les mêmes côtés, donc le périmètre est ${v[0]} + ${v[1]} + ${v[2]} = ${r} cm.`],
      hints: () => ["Isométrique signifie identique en forme et en taille, donc les côtés sont les mêmes."]
    },
    declaredVariationSpace: 36 * 36 * 36
  }),
  arithmeticTemplate({
    key: "y10l6.congruentTriangleMissingAngle", levelKey: "Y10L6", objectiveCode: "Y10-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY", contextPool: TRIANGLES,
    ranges: [[20, 110], [20, 110]], constraint: (v) => v[0]! + v[1]! < 160,
    compute: (v) => 180 - v[0]! - v[1]!,
    promptTemplates: [
      "Triangle ABC is congruent to triangle {ctx}. In triangle ABC two angles are {a}° and {b}°. What is the third angle of triangle {ctx}, in degrees?",
      "Two congruent triangles each have angles of {a}° and {b}°. What is the size of the remaining angle, in degrees?"
    ],
    explain: (v, r) => [`Angles in a triangle add to 180°.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
    hints: () => ["Congruent triangles have equal angles, and the angles of any triangle add to 180°."],
    fr: {
      contextPool: TRIANGLES,
      promptTemplates: [
        "Le triangle ABC est isométrique au triangle {ctx}. Dans le triangle ABC, deux angles mesurent {a}° et {b}°. Quel est le troisième angle du triangle {ctx}, en degrés ?",
        "Deux triangles isométriques ont chacun des angles de {a}° et {b}°. Quelle est la mesure de l'angle restant, en degrés ?"
      ],
      explain: (v, r) => [`La somme des angles d'un triangle est 180°.`, `180 - ${v[0]} - ${v[1]} = ${r}°.`],
      hints: () => ["Les triangles isométriques ont des angles égaux, et la somme des angles d'un triangle vaut 180°."]
    },
    declaredVariationSpace: 91 * 91
  }),
  categoricalPoolTemplate({
    key: "y10l6.tfCongruenceClaim", levelKey: "Y10L6", objectiveCode: "Y10-L6-1", difficulty: "REASONING",
    misconceptionTags: ["CONGRUENCE_CONDITION_CONFUSION"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const valid = rng.chance(0.5);
      const a = rng.int(4, 20);
      const b = rng.int(5, 21);
      const ang = rng.int(25, 115);
      const validClaims = [
        `two triangles with sides of ${a} cm, ${b} cm and ${a + b - 2} cm each`,
        `two right-angled triangles with a hypotenuse of ${b + 6} cm and a shorter side of ${a} cm each`,
        `two triangles with angles of ${ang}° and ${ang + 10}° and the ${a} cm side between them`
      ];
      const invalidClaims = [
        `two triangles with all three angles equal to ${ang}°, ${ang + 10}° and ${170 - ang}°`,
        `two triangles with sides of ${a} cm and ${b} cm and an angle of ${ang}° that is not between those sides`,
        `two triangles that both have an area of ${a * b} cm²`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `These must be congruent: ${claim}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "This matches one of the four congruence conditions (SSS, SAS, ASA or RHS)."
          : "This fixes the shape but not the size, or leaves the angle in the wrong position, so the triangles need not be congruent."],
        hints: ["Only SSS, SAS, ASA and RHS guarantee congruence — equal angles alone give similarity."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^These must be congruent: (.+)\. True or false\?$/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        const claimFr = m[1]!
          .replace(/^two triangles with sides of/, "deux triangles de côtés")
          .replace(/^two right-angled triangles with a hypotenuse of/, "deux triangles rectangles avec une hypoténuse de")
          .replace(/^two triangles with angles of/, "deux triangles avec des angles de")
          .replace(/^two triangles with all three angles equal to/, "deux triangles dont les trois angles valent")
          .replace(/^two triangles that both have an area of/, "deux triangles qui ont tous les deux une aire de")
          .replace(/ and a shorter side of /, " et un côté plus court de ")
          .replace(/ and the (.+?) side between them/, " et le côté de $1 entre eux")
          .replace(/ that is not between those sides/, " qui n'est pas entre ces côtés")
          .replace(/ each$/, " chacun")
          .replace(/ and /g, " et ");
        return {
          prompt: `Ils sont forcément isométriques : ${claimFr}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Cela correspond à l'une des quatre conditions d'isométrie (SSS, SAS, ASA ou RHS)."
            : "Cela fixe la forme mais pas la taille, ou place l'angle au mauvais endroit : les triangles ne sont pas forcément isométriques."],
          hints: ["Seules SSS, SAS, ASA et RHS garantissent l'isométrie — des angles égaux ne donnent que la similitude."]
        };
      }
    },
    declaredVariationSpace: 2 * 3 * 17 * 17 * 91
  }),
  matchingTemplate({
    key: "y10l6.matchCongruenceConditions", levelKey: "Y10L6", objectiveCode: "Y10-L6-1", difficulty: "APPLICATION",
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
    promptTemplates: ["Match each set of given facts to the congruence condition it satisfies."],
    explain: () => ["S stands for a side and A for an angle; the order tells you where the angle sits, and RHS needs a right angle and a hypotenuse."],
    hints: () => ["Write out the facts as a string of S and A letters in order around the triangle."],
    fr: {
      promptTemplates: ["Associe chaque ensemble de données à la condition d'isométrie qu'il vérifie."],
      explain: () => ["S désigne un côté et A un angle ; l'ordre indique où se trouve l'angle, et RHS exige un angle droit et une hypoténuse."],
      hints: () => ["Écris les données sous forme de lettres S et A dans l'ordre autour du triangle."],
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

  // --- Y10-L6-2: similarity — lengths, areas and volumes ---
  arithmeticTemplate({
    key: "y10l6.scaleFactorFromLengths", levelKey: "Y10L6", objectiveCode: "Y10-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[2, 30], [2, 12]], compute: (v) => v[1]!,
    derive: (v) => ({ big: v[0]! * v[1]! }),
    promptTemplates: [
      "Two similar shapes have corresponding sides of {a} cm and {big} cm. What is the scale factor from the smaller to the larger?",
      "{ctx} are similar. A side of {a} cm corresponds to a side of {big} cm. What is the scale factor?"
    ],
    explain: (v, r) => [`${v[0]!} x ${r} = ${v[0]! * v[1]!}, so the scale factor is ${r}.`],
    hints: () => ["Divide the larger length by the corresponding smaller length."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Deux figures semblables ont des côtés correspondants de {a} cm et {big} cm. Quel est le facteur d'échelle du plus petit vers le plus grand ?",
        "{ctx} sont semblables. Un côté de {a} cm correspond à un côté de {big} cm. Quel est le facteur d'échelle ?"
      ],
      explain: (v, r) => [`${v[0]!} x ${r} = ${v[0]! * v[1]!}, donc le facteur d'échelle est ${r}.`],
      hints: () => ["Divise la plus grande longueur par la plus petite longueur correspondante."]
    },
    declaredVariationSpace: 29 * 11 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y10l6.similarMissingLength", levelKey: "Y10L6", objectiveCode: "Y10-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[2, 20], [2, 9], [3, 30]], compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ big: v[0]! * v[1]! }),
    promptTemplates: [
      "Two similar shapes: a side of {a} cm corresponds to a side of {big} cm. What length corresponds to {c} cm, in cm?",
      "{ctx} are similar. {a} cm maps to {big} cm. What does a side of {c} cm map to, in cm?"
    ],
    explain: (v, r) => [`The scale factor is ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`, `${v[2]} x ${v[1]} = ${r} cm.`],
    hints: () => ["Find the scale factor first, then multiply the length you are given by it."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Deux figures semblables : un côté de {a} cm correspond à un côté de {big} cm. Quelle longueur correspond à {c} cm, en cm ?",
        "{ctx} sont semblables. {a} cm devient {big} cm. Que devient un côté de {c} cm, en cm ?"
      ],
      explain: (v, r) => [`Le facteur d'échelle est ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`, `${v[2]} x ${v[1]} = ${r} cm.`],
      hints: () => ["Trouve d'abord le facteur d'échelle, puis multiplie la longueur donnée par celui-ci."]
    },
    declaredVariationSpace: 19 * 8 * 28 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y10l6.similarAreaFromScaleFactor", levelKey: "Y10L6", objectiveCode: "Y10-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["AREA_SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: SHAPES,
    ranges: [[2, 7], [5, 60]], compute: (v) => v[1]! * v[0]! * v[0]!,
    promptTemplates: [
      "Two similar shapes have a length scale factor of {a}. The smaller has an area of {b} cm². What is the area of the larger, in cm²?",
      "{ctx} are similar with scale factor {a}. The smaller has area {b} cm². Find the larger area, in cm²."
    ],
    explain: (v, r) => [`The area scale factor is ${v[0]}² = ${v[0]! * v[0]!}.`, `${v[1]} x ${v[0]! * v[0]!} = ${r} cm².`],
    hints: () => ["Areas scale by the square of the length scale factor."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "Deux figures semblables ont un facteur d'échelle de longueur de {a}. La plus petite a une aire de {b} cm². Quelle est l'aire de la plus grande, en cm² ?",
        "{ctx} sont semblables avec un facteur d'échelle de {a}. La plus petite a une aire de {b} cm². Trouve l'aire de la plus grande, en cm²."
      ],
      explain: (v, r) => [`Le facteur d'échelle des aires est ${v[0]}² = ${v[0]! * v[0]!}.`, `${v[1]} x ${v[0]! * v[0]!} = ${r} cm².`],
      hints: () => ["Les aires sont multipliées par le carré du facteur d'échelle des longueurs."]
    },
    declaredVariationSpace: 6 * 56 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y10l6.similarVolumeFromScaleFactor", levelKey: "Y10L6", objectiveCode: "Y10-L6-2", difficulty: "REASONING",
    misconceptionTags: ["VOLUME_SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: SOLIDS,
    ranges: [[2, 5], [4, 60]], compute: (v) => v[1]! * v[0]! * v[0]! * v[0]!,
    promptTemplates: [
      "Two similar solids have a length scale factor of {a}. The smaller has a volume of {b} cm³. What is the volume of the larger, in cm³?",
      "{ctx} are similar with scale factor {a}. The smaller has volume {b} cm³. Find the larger volume, in cm³."
    ],
    explain: (v, r) => [`The volume scale factor is ${v[0]}³ = ${v[0]! ** 3}.`, `${v[1]} x ${v[0]! ** 3} = ${r} cm³.`],
    hints: () => ["Volumes scale by the cube of the length scale factor."],
    fr: {
      contextPool: SOLIDS_FR,
      promptTemplates: [
        "Deux solides semblables ont un facteur d'échelle de longueur de {a}. Le plus petit a un volume de {b} cm³. Quel est le volume du plus grand, en cm³ ?",
        "{ctx} sont semblables avec un facteur d'échelle de {a}. Le plus petit a un volume de {b} cm³. Trouve le volume du plus grand, en cm³."
      ],
      explain: (v, r) => [`Le facteur d'échelle des volumes est ${v[0]}³ = ${v[0]! ** 3}.`, `${v[1]} x ${v[0]! ** 3} = ${r} cm³.`],
      hints: () => ["Les volumes sont multipliés par le cube du facteur d'échelle des longueurs."]
    },
    declaredVariationSpace: 4 * 57 * (1 + SOLIDS.length)
  }),
  arithmeticTemplate({
    key: "y10l6.lengthFromVolumeRatio", levelKey: "Y10L6", objectiveCode: "Y10-L6-2", difficulty: "REASONING",
    misconceptionTags: ["VOLUME_SCALE_FACTOR_ERROR"], type: "NUMBER_ENTRY", contextPool: SOLIDS,
    ranges: [[2, 8], [3, 40]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ cube: v[0]! ** 3 }),
    promptTemplates: [
      "Two similar solids have volumes in the ratio 1 : {cube}. The smaller has a height of {b} cm. What is the height of the larger, in cm?",
      "{ctx} are similar and their volumes are in the ratio 1 : {cube}. The smaller is {b} cm tall. How tall is the larger, in cm?"
    ],
    explain: (v, r) => [`The cube root of ${v[0]! ** 3} is ${v[0]}, so the length scale factor is ${v[0]}.`, `${v[1]} x ${v[0]} = ${r} cm.`],
    hints: () => ["Take the cube root of the volume ratio to get the length scale factor."],
    fr: {
      contextPool: SOLIDS_FR,
      promptTemplates: [
        "Deux solides semblables ont des volumes dans le rapport 1 : {cube}. Le plus petit a une hauteur de {b} cm. Quelle est la hauteur du plus grand, en cm ?",
        "{ctx} sont semblables et leurs volumes sont dans le rapport 1 : {cube}. Le plus petit mesure {b} cm de haut. Quelle est la hauteur du plus grand, en cm ?"
      ],
      explain: (v, r) => [`La racine cubique de ${v[0]! ** 3} est ${v[0]}, donc le facteur d'échelle des longueurs est ${v[0]}.`, `${v[1]} x ${v[0]} = ${r} cm.`],
      hints: () => ["Prends la racine cubique du rapport des volumes pour obtenir le facteur d'échelle des longueurs."]
    },
    declaredVariationSpace: 7 * 38 * (1 + SOLIDS.length)
  }),
  categoricalPoolTemplate({
    key: "y10l6.mcSimilarOrCongruent", levelKey: "Y10L6", objectiveCode: "Y10-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["SIMILAR_CONGRUENT_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["congruent", "similar", "neither"] },
    build: (picked, rng) => {
      const a = rng.int(3, 20);
      const k = rng.int(2, 9);
      const b = rng.int(4, 21);
      const descriptions: Record<string, string> = {
        congruent: `two triangles both with sides ${a} cm, ${b} cm and ${a + b - 1} cm`,
        similar: `a triangle with sides ${a} cm, ${b} cm and ${a + b - 1} cm and a triangle with sides ${a * k} cm, ${b * k} cm and ${(a + b - 1) * k} cm`,
        neither: `a triangle with sides ${a} cm, ${b} cm and ${a + b - 1} cm and a triangle with sides ${a + 1} cm, ${b * k} cm and ${a + b + 2} cm`
      };
      const labels: Record<string, string> = { congruent: "congruent", similar: "similar but not congruent", neither: "neither similar nor congruent" };
      const kind = picked.kind!;
      return {
        prompt: `Describe the relationship between ${descriptions[kind]}.`,
        correctLabel: labels[kind]!,
        distractorLabels: Object.values(labels).filter((l) => l !== labels[kind]),
        explanationSteps: [kind === "congruent"
          ? "All three pairs of sides are equal, so the triangles are congruent (SSS)."
          : kind === "similar"
            ? `Every side has been multiplied by ${k}, so the triangles are similar but different sizes.`
            : "The sides are not all in the same ratio, so the triangles are not similar."],
        hints: ["Check whether every pair of corresponding sides has the same ratio — a ratio of 1 means congruent."]
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
          .replace(/ and /g, " et ");
        return {
          prompt: `Décris la relation entre ${descFr}.`,
          correctLabel: labelsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => labelsFr[d] ?? d),
          hints: ["Vérifie si toutes les paires de côtés correspondants ont le même rapport — un rapport de 1 signifie isométriques."]
        };
      }
    },
    declaredVariationSpace: 3 * 18 * 8 * 18
  }),

  // --- Y10-L6-3: geometric reasoning, construction and proof ---
  arithmeticTemplate({
    key: "y10l6.coInteriorAngle", levelKey: "Y10L6", objectiveCode: "Y10-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["PARALLEL_LINE_ANGLE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[20, 160]], compute: (v) => 180 - v[0]!,
    promptTemplates: [
      "Two parallel lines are crossed by a straight line. One co-interior angle is {a}°. What is the other co-interior angle, in degrees?",
      "A transversal crosses two parallel lines. An allied (co-interior) angle measures {a}°. Work out its partner, in degrees.",
      "In a diagram of two parallel lines, angle x and an angle of {a}° are co-interior. What is x, in degrees?"
    ],
    explain: (v, r) => [`Co-interior angles between parallel lines add to 180°.`, `180 - ${v[0]} = ${r}°.`],
    hints: () => ["Co-interior (allied) angles form a C shape and sum to 180°."],
    fr: {
      promptTemplates: [
        "Deux droites parallèles sont coupées par une sécante. Un angle co-intérieur mesure {a}°. Quel est l'autre angle co-intérieur, en degrés ?",
        "Une sécante coupe deux droites parallèles. Un angle allié (co-intérieur) mesure {a}°. Calcule son partenaire, en degrés.",
        "Sur un schéma de deux droites parallèles, l'angle x et un angle de {a}° sont co-intérieurs. Que vaut x, en degrés ?"
      ],
      explain: (v, r) => [`Les angles co-intérieurs entre droites parallèles ont pour somme 180°.`, `180 - ${v[0]} = ${r}°.`],
      hints: () => ["Les angles co-intérieurs (alliés) forment un C et leur somme vaut 180°."]
    },
    declaredVariationSpace: 141 * 3
  }),
  arithmeticTemplate({
    key: "y10l6.isoscelesBaseAngle", levelKey: "Y10L6", objectiveCode: "Y10-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY", contextPool: TRIANGLES,
    ranges: [[20, 160]], constraint: (v) => v[0]! % 2 === 0,
    compute: (v) => (180 - v[0]!) / 2,
    promptTemplates: [
      "In triangle {ctx} the two sloping sides are equal and the apex angle is {a}°. What is each base angle, in degrees?",
      "An isosceles triangle {ctx} has an apex angle of {a}°. Work out one of its base angles, in degrees.",
      "Triangle {ctx} is isosceles with an apex angle of {a}°. Give the size of a base angle, in degrees."
    ],
    explain: (v, r) => [`The two base angles are equal and the three angles add to 180°.`, `(180 - ${v[0]}) ÷ 2 = ${r}°.`],
    hints: () => ["Subtract the apex angle from 180°, then halve what is left because the base angles are equal."],
    fr: {
      contextPool: TRIANGLES,
      promptTemplates: [
        "Dans le triangle {ctx}, les deux côtés obliques sont égaux et l'angle au sommet mesure {a}°. Combien mesure chaque angle à la base, en degrés ?",
        "Un triangle isocèle {ctx} a un angle au sommet de {a}°. Calcule l'un de ses angles à la base, en degrés.",
        "Le triangle {ctx} est isocèle avec un angle au sommet de {a}°. Donne la mesure d'un angle à la base, en degrés."
      ],
      explain: (v, r) => [`Les deux angles à la base sont égaux et la somme des trois angles vaut 180°.`, `(180 - ${v[0]}) ÷ 2 = ${r}°.`],
      hints: () => ["Retire l'angle au sommet de 180°, puis divise le reste par 2 car les angles à la base sont égaux."]
    },
    declaredVariationSpace: 71 * 3 * TRIANGLES.length
  }),
  categoricalPoolTemplate({
    key: "y10l6.mcAngleReason", levelKey: "Y10L6", objectiveCode: "Y10-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["PARALLEL_LINE_ANGLE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { reason: ["alternate angles are equal", "corresponding angles are equal", "vertically opposite angles are equal", "co-interior angles add to 180°", "angles on a straight line add to 180°"] },
    build: (picked, rng) => {
      const ang = rng.int(25, 155);
      const reason = picked.reason!;
      const setups: Record<string, string> = {
        "alternate angles are equal": `x and an angle of ${ang}° sit on opposite sides of a transversal between two parallel lines, and x = ${ang}°`,
        "corresponding angles are equal": `x and an angle of ${ang}° sit in matching positions where a transversal crosses two parallel lines, and x = ${ang}°`,
        "vertically opposite angles are equal": `x and an angle of ${ang}° are formed opposite each other where two straight lines cross, and x = ${ang}°`,
        "co-interior angles add to 180°": `x and an angle of ${ang}° lie inside a C shape between two parallel lines, and x = ${180 - ang}°`,
        "angles on a straight line add to 180°": `x and an angle of ${ang}° together make a straight line, and x = ${180 - ang}°`
      };
      return {
        prompt: `In a diagram, ${setups[reason]}. Which reason justifies this?`,
        correctLabel: reason,
        distractorLabels: Object.keys({
          "alternate angles are equal": 1, "corresponding angles are equal": 1, "vertically opposite angles are equal": 1,
          "co-interior angles add to 180°": 1, "angles on a straight line add to 180°": 1
        }).filter((rr) => rr !== reason).slice(0, 3),
        explanationSteps: [`The position of the angles in the diagram is exactly the case where ${reason}.`],
        hints: ["Look for the Z shape (alternate), F shape (corresponding) or C shape (co-interior)."]
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
          .replace(/^x and an angle of (\d+)° sit on opposite sides of a transversal between two parallel lines/, "x et un angle de $1° sont de part et d'autre d'une sécante entre deux droites parallèles")
          .replace(/^x and an angle of (\d+)° sit in matching positions where a transversal crosses two parallel lines/, "x et un angle de $1° occupent des positions correspondantes là où une sécante coupe deux droites parallèles")
          .replace(/^x and an angle of (\d+)° are formed opposite each other where two straight lines cross/, "x et un angle de $1° sont opposés l'un à l'autre au croisement de deux droites")
          .replace(/^x and an angle of (\d+)° lie inside a C shape between two parallel lines/, "x et un angle de $1° sont à l'intérieur d'un C entre deux droites parallèles")
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
  categoricalPoolTemplate({
    key: "y10l6.tfGeometricProofClaim", levelKey: "Y10L6", objectiveCode: "Y10-L6-3", difficulty: "REASONING",
    misconceptionTags: ["SIMILAR_CONGRUENT_CONFUSION"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const valid = rng.chance(0.5);
      const k = rng.int(2, 9);
      const ang = rng.int(25, 110);
      const validClaims = [
        `all triangles with angles of ${ang}°, ${ang + 10}° and ${170 - ang}° are similar to each other`,
        `enlarging a shape by scale factor ${k} leaves every angle unchanged`,
        `congruent shapes are always similar with a scale factor of 1`,
        `an enlargement of scale factor ${k} multiplies every area by ${k * k}`
      ];
      const invalidClaims = [
        `all triangles with angles of ${ang}°, ${ang + 10}° and ${170 - ang}° are congruent to each other`,
        `enlarging a shape by scale factor ${k} multiplies every angle by ${k}`,
        `similar shapes are always congruent`,
        `an enlargement of scale factor ${k} multiplies every volume by ${k * k}`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "Equal angles give similarity; enlargement keeps angles, squares areas and cubes volumes."
          : "Equal angles alone do not fix size, enlargement never changes an angle, and volumes scale by the cube, not the square."],
        hints: ["Angles stay the same under enlargement; lengths scale by k, areas by k² and volumes by k³."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "");
        const bodyFr = body
          .replace(/^All triangles with angles of (\d+)°, (\d+)° and (\d+)° are similar to each other/, "Tous les triangles ayant des angles de $1°, $2° et $3° sont semblables entre eux")
          .replace(/^All triangles with angles of (\d+)°, (\d+)° and (\d+)° are congruent to each other/, "Tous les triangles ayant des angles de $1°, $2° et $3° sont isométriques entre eux")
          .replace(/^Enlarging a shape by scale factor (\d+) leaves every angle unchanged/, "Agrandir une figure d'un facteur $1 laisse tous les angles inchangés")
          .replace(/^Enlarging a shape by scale factor (\d+) multiplies every angle by (\d+)/, "Agrandir une figure d'un facteur $1 multiplie chaque angle par $2")
          .replace(/^Congruent shapes are always similar with a scale factor of 1/, "Les figures isométriques sont toujours semblables avec un facteur d'échelle de 1")
          .replace(/^Similar shapes are always congruent/, "Les figures semblables sont toujours isométriques")
          .replace(/^An enlargement of scale factor (\d+) multiplies every area by (\d+)/, "Un agrandissement de facteur $1 multiplie chaque aire par $2")
          .replace(/^An enlargement of scale factor (\d+) multiplies every volume by (\d+)/, "Un agrandissement de facteur $1 multiplie chaque volume par $2");
        return {
          prompt: `${bodyFr}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Des angles égaux donnent la similitude ; un agrandissement conserve les angles, met les aires au carré et les volumes au cube."
            : "Des angles égaux seuls ne fixent pas la taille, un agrandissement ne change jamais un angle, et les volumes sont multipliés par le cube, pas le carré."],
          hints: ["Les angles ne changent pas lors d'un agrandissement ; les longueurs sont multipliées par k, les aires par k² et les volumes par k³."]
        };
      }
    },
    declaredVariationSpace: 2 * 4 * 8 * 86
  }),
  arithmeticTemplate({
    key: "y10l6.polygonInteriorAngleSum", levelKey: "Y10L6", objectiveCode: "Y10-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ANGLE_SUM_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[3, 60]], compute: (v) => (v[0]! - 2) * 180,
    promptTemplates: [
      "What is the sum of the interior angles of a polygon with {a} sides, in degrees?",
      "A polygon has {a} sides. Work out the total of its interior angles, in degrees.",
      "Use the formula (n - 2) x 180 to find the interior angle sum of a {a}-sided polygon, in degrees.",
      "A closed shape is made from {a} straight sides. What do its interior angles add up to, in degrees?"
    ],
    explain: (v, r) => [`(${v[0]} - 2) x 180 = ${v[0]! - 2} x 180 = ${r}°.`],
    hints: () => ["Split the polygon into triangles: an n-sided polygon gives n - 2 of them."],
    fr: {
      promptTemplates: [
        "Quelle est la somme des angles intérieurs d'un polygone à {a} côtés, en degrés ?",
        "Un polygone a {a} côtés. Calcule la somme de ses angles intérieurs, en degrés.",
        "Utilise la formule (n - 2) x 180 pour trouver la somme des angles intérieurs d'un polygone à {a} côtés, en degrés.",
        "Une figure fermée est formée de {a} côtés droits. Quelle est la somme de ses angles intérieurs, en degrés ?"
      ],
      explain: (v, r) => [`(${v[0]} - 2) x 180 = ${v[0]! - 2} x 180 = ${r}°.`],
      hints: () => ["Découpe le polygone en triangles : un polygone à n côtés en donne n - 2."]
    },
    declaredVariationSpace: 58 * 4
  }),
  arithmeticTemplate({
    key: "y10l6.similarTriangleProofLength", levelKey: "Y10L6", objectiveCode: "Y10-L6-3", difficulty: "REASONING",
    misconceptionTags: ["SCALE_FACTOR_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[2, 15], [2, 6], [2, 15]], compute: (v) => v[2]! * (v[1]! - 1),
    derive: (v) => ({ ab: v[0]! * v[1]!, ac: v[2]! * v[1]! }),
    promptTemplates: [
      "In triangle ABC, D lies on AB and E lies on AC with DE parallel to BC. AD = {a} cm, AB = {ab} cm and AE = {c} cm. Prove triangles ADE and ABC are similar, then find EC in cm.",
      "DE is parallel to BC in triangle ABC. AD = {a} cm, AB = {ab} cm, AE = {c} cm. Using similar triangles, work out EC in cm."
    ],
    explain: (v, r) => [
      `Angle A is shared and DE ∥ BC gives equal corresponding angles, so triangles ADE and ABC are similar.`,
      `The scale factor is ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`,
      `AC = ${v[2]} x ${v[1]} = ${v[2]! * v[1]!} cm, so EC = ${v[2]! * v[1]!} - ${v[2]} = ${r} cm.`
    ],
    hints: () => ["Equal corresponding angles prove similarity; find the scale factor from AD and AB, scale AE up to AC, then subtract AE."],
    fr: {
      promptTemplates: [
        "Dans le triangle ABC, D est sur AB et E sur AC avec DE parallèle à BC. AD = {a} cm, AB = {ab} cm et AE = {c} cm. Prouve que les triangles ADE et ABC sont semblables, puis trouve EC en cm.",
        "DE est parallèle à BC dans le triangle ABC. AD = {a} cm, AB = {ab} cm, AE = {c} cm. En utilisant les triangles semblables, calcule EC en cm."
      ],
      explain: (v, r) => [
        `L'angle A est commun et DE ∥ BC donne des angles correspondants égaux, donc les triangles ADE et ABC sont semblables.`,
        `Le facteur d'échelle est ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`,
        `AC = ${v[2]} x ${v[1]} = ${v[2]! * v[1]!} cm, donc EC = ${v[2]! * v[1]!} - ${v[2]} = ${r} cm.`
      ],
      hints: () => ["Des angles correspondants égaux prouvent la similitude ; trouve le facteur d'échelle avec AD et AB, agrandis AE en AC, puis retire AE."]
    },
    declaredVariationSpace: 14 * 5 * 14
  })
];

export default level;
