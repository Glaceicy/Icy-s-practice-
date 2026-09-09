import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 8 — "Angles, shapes, coordinates and transformations"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L8-1 angles in degrees and their types,
// Y5-L8-2 reflection/translation of a point's position, Y5-L8-3 using
// rectangle properties to deduce missing lengths/angles). Coordinates stay
// in the first quadrant (non-negative), matching the Y5 curriculum — all
// four quadrants are introduced in Year 6.
function classifyAngle(deg: number): string {
  if (deg === 90) return "Right angle";
  if (deg < 90) return "Acute";
  if (deg < 180) return "Obtuse";
  return "Reflex";
}
const ANGLE_CATEGORIES = ["Acute", "Right angle", "Obtuse", "Reflex"];

export const level: QuestionTemplateDef[] = [
  // --- Y5-L8-1: angles are measured in degrees; estimate/compare acute, obtuse, reflex ---
  categoricalPoolTemplate({
    key: "y5l8.classifyAngleFromDegree", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      let deg = rng.int(1, 359);
      if (deg === 180) deg = 179;
      const correct = classifyAngle(deg);
      const distractors = ANGLE_CATEGORIES.filter((c) => c !== correct);
      return {
        prompt: `An angle measures ${deg}°. What type of angle is it?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [
          deg === 90 ? `${deg}° is exactly a right angle.` : deg < 90 ? `${deg}° is less than 90°, so it is acute.` : deg < 180 ? `${deg}° is between 90° and 180°, so it is obtuse.` : `${deg}° is more than 180°, so it is reflex.`
        ],
        hints: ["Acute: less than 90°. Right: exactly 90°. Obtuse: between 90° and 180°. Reflex: more than 180°."]
      };
    },
    declaredVariationSpace: 358
  }),
  categoricalPoolTemplate({
    key: "y5l8.compareAngles", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 359);
      let b = rng.int(1, 359);
      while (b === a) b = rng.int(1, 359);
      const labelA = `${a}°`;
      const labelB = `${b}°`;
      const correct = a > b ? labelA : labelB;
      const other = correct === labelA ? labelB : labelA;
      return {
        prompt: `Which angle is bigger, ${labelA} or ${labelB}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${correct} is the larger angle.`],
        hints: ["Compare the two numbers directly — the bigger number of degrees is the bigger angle."]
      };
    },
    declaredVariationSpace: 359 * 358
  }),
  categoricalPoolTemplate({
    key: "y5l8.tfAngleClassification", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "FLUENCY",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      let deg = rng.int(1, 359);
      if (deg === 180) deg = 179;
      const correctCategory = classifyAngle(deg);
      const isTrueCase = rng.chance(0.5);
      const claimed = isTrueCase ? correctCategory : rng.pick(ANGLE_CATEGORIES.filter((c) => c !== correctCategory));
      return {
        prompt: `An angle of ${deg}° is ${claimed === "Right angle" ? "a right angle" : claimed.toLowerCase()}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${deg}° is actually ${correctCategory === "Right angle" ? "a right angle" : correctCategory.toLowerCase()}.`],
        hints: ["Acute: less than 90°. Right: exactly 90°. Obtuse: between 90° and 180°. Reflex: more than 180°."]
      };
    },
    declaredVariationSpace: 358 * 4 * 2
  }),
  orderingTemplate({
    key: "y5l8.orderAnglesAscending", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const degs = new Set<number>();
      while (degs.size < 4) degs.add(rng.int(1, 359));
      return Array.from(degs).map((d) => ({ label: `${d}°`, sortValue: d }));
    },
    promptTemplates: ["Drag these angles into order, smallest first."],
    explain: () => ["Compare the number of degrees directly."],
    hints: () => ["Which angle has the fewest degrees?"],
    declaredVariationSpace: 500000
  }),
  arithmeticTemplate({
    key: "y5l8.missingAngleOnLine", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "REASONING",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[10, 170]], compute: (v) => 180 - v[0]!,
    promptTemplates: ["Two angles on a straight line are {a}° and ___°. What is the missing angle, in degrees?"],
    explain: (v, r) => [`Angles on a straight line add up to 180°. 180 - ${v[0]} = ${r}.`],
    hints: () => ["Angles on a straight line always add up to 180°."],
    declaredVariationSpace: 161
  }),
  arithmeticTemplate({
    key: "y5l8.missingAngleAroundPoint", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "REASONING",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[10, 170], [10, 170]], constraint: (v) => v[0]! + v[1]! < 350,
    compute: (v) => 360 - v[0]! - v[1]!,
    promptTemplates: ["Three angles meet at a point: {a}°, {b}° and ___°. What is the missing angle, in degrees?"],
    explain: (v, r) => [`Angles around a point add up to 360°. 360 - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Angles around a point always add up to 360°."],
    declaredVariationSpace: 161 * 161
  }),
  arithmeticTemplate({
    key: "y5l8.mcAngleOnLine", levelKey: "Y5L8", objectiveCode: "Y5-L8-1", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[10, 170]], compute: (v) => 180 - v[0]!,
    promptTemplates: ["Two angles on a straight line are {a}° and ___°. What is the missing angle?"],
    explain: (v, r) => [`180 - ${v[0]} = ${r}.`],
    hints: () => ["Angles on a straight line add up to 180°."],
    distractorSpread: 15,
    declaredVariationSpace: 161
  }),

  // --- Y5-L8-2: reflection and translation of a shape's position ---
  categoricalPoolTemplate({
    key: "y5l8.mcTranslatePointRightUp", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "FLUENCY",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const x = rng.int(0, 8);
      const y = rng.int(0, 8);
      const dx = rng.int(1, 5);
      const dy = rng.int(1, 5);
      const correct = `(${x + dx}, ${y + dy})`;
      const distractors = [`(${x + dx}, ${y})`, `(${x}, ${y + dy})`, `(${x + dy}, ${y + dx})`];
      return {
        prompt: `Point (${x}, ${y}) is translated ${dx} right and ${dy} up. What are its new coordinates?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Moving right increases the x-coordinate; moving up increases the y-coordinate: (${x}+${dx}, ${y}+${dy}) = ${correct}.`],
        hints: ["Moving right adds to the x-coordinate; moving up adds to the y-coordinate."]
      };
    },
    declaredVariationSpace: 9 * 9 * 5 * 5
  }),
  categoricalPoolTemplate({
    key: "y5l8.mcTranslatePointLeftDown", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const dx = rng.int(1, 5);
      const dy = rng.int(1, 5);
      const x = rng.int(dx, dx + 8);
      const y = rng.int(dy, dy + 8);
      const correct = `(${x - dx}, ${y - dy})`;
      const distractors = [`(${x - dx}, ${y})`, `(${x}, ${y - dy})`, `(${x + dx}, ${y + dy})`];
      return {
        prompt: `Point (${x}, ${y}) is translated ${dx} left and ${dy} down. What are its new coordinates?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Moving left subtracts from the x-coordinate; moving down subtracts from the y-coordinate: (${x}-${dx}, ${y}-${dy}) = ${correct}.`],
        hints: ["Moving left subtracts from the x-coordinate; moving down subtracts from the y-coordinate."]
      };
    },
    declaredVariationSpace: 9 * 9 * 5 * 5
  }),
  categoricalPoolTemplate({
    key: "y5l8.mcReflectVerticalLine", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const x = rng.int(0, 10);
      const k = rng.int(x + 1, x + 6); // k > x always, so the reflection is never a no-op
      const y = rng.int(0, 10);
      const reflectedX = 2 * k - x;
      const correct = `(${reflectedX}, ${y})`;
      const distractors = [`(${x}, ${y})`, `(${x}, ${2 * k - y})`, `(${reflectedX}, ${reflectedX})`];
      return {
        prompt: `Point (${x}, ${y}) is reflected in the vertical line x = ${k}. What are the new coordinates?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The point is ${k - x} to the left of the mirror line, so its reflection is ${k - x} to the right: x = ${k} + ${k - x} = ${reflectedX}. The y-coordinate doesn't change.`],
        hints: ["Reflecting in a vertical line only changes the x-coordinate; the y-coordinate stays the same."]
      };
    },
    declaredVariationSpace: 11 * 6 * 11
  }),
  categoricalPoolTemplate({
    key: "y5l8.mcReflectHorizontalLine", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const y = rng.int(0, 10);
      const k = rng.int(y + 1, y + 6); // k > y always, so the reflection is never a no-op
      const x = rng.int(0, 10);
      const reflectedY = 2 * k - y;
      const correct = `(${x}, ${reflectedY})`;
      const distractors = [`(${x}, ${y})`, `(${2 * k - x}, ${y})`, `(${reflectedY}, ${reflectedY})`];
      return {
        prompt: `Point (${x}, ${y}) is reflected in the horizontal line y = ${k}. What are the new coordinates?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The point is ${k - y} below the mirror line, so its reflection is ${k - y} above: y = ${k} + ${k - y} = ${reflectedY}. The x-coordinate doesn't change.`],
        hints: ["Reflecting in a horizontal line only changes the y-coordinate; the x-coordinate stays the same."]
      };
    },
    declaredVariationSpace: 11 * 6 * 11
  }),
  categoricalPoolTemplate({
    key: "y5l8.tfTranslationCheck", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "REASONING",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const x = rng.int(0, 8);
      const y = rng.int(0, 8);
      const dx = rng.int(1, 5);
      const dy = rng.int(1, 5);
      const correctX = x + dx;
      const correctY = y + dy;
      const isTrueCase = rng.chance(0.5);
      const shownX = isTrueCase ? correctX : correctX + rng.int(1, 3);
      const shownY = isTrueCase ? correctY : correctY;
      return {
        prompt: `Point (${x}, ${y}) translated ${dx} right and ${dy} up becomes (${shownX}, ${shownY}).`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`(${x}, ${y}) translated ${dx} right and ${dy} up becomes (${correctX}, ${correctY}).`],
        hints: ["Moving right adds to the x-coordinate; moving up adds to the y-coordinate."]
      };
    },
    declaredVariationSpace: 9 * 9 * 5 * 5 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l8.identifyTranslationVector", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "REASONING",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const x = rng.int(0, 6);
      const y = rng.int(0, 6);
      const dx = rng.int(1, 5);
      const dy = rng.int(1, 5);
      const x2 = x + dx;
      const y2 = y + dy;
      const correct = `${dx} right and ${dy} up`;
      const distractors = [`${dy} right and ${dx} up`, `${dx} left and ${dy} down`, `${dx + 1} right and ${dy} up`];
      return {
        prompt: `A point moves from (${x}, ${y}) to (${x2}, ${y2}). How was it translated?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The x-coordinate increased by ${dx} (${x} to ${x2}) and the y-coordinate increased by ${dy} (${y} to ${y2}).`],
        hints: ["Compare the x-coordinates to find the sideways movement, and the y-coordinates to find the up/down movement."]
      };
    },
    declaredVariationSpace: 7 * 7 * 5 * 5
  }),
  categoricalPoolTemplate({
    key: "y5l8.wordProblemCoordinateMovement", levelKey: "Y5L8", objectiveCode: "Y5-L8-2", difficulty: "APPLICATION",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const x = rng.int(0, 8);
      const y = rng.int(0, 8);
      const dx = rng.int(1, 5);
      const dy = rng.int(1, 5);
      const correct = `(${x + dx}, ${y + dy})`;
      const distractors = [`(${x + dx}, ${y})`, `(${x}, ${y + dy})`, `(${x - dx}, ${y - dy})`];
      return {
        prompt: `A robot starts at (${x}, ${y}) on a grid. It moves ${dx} squares right and ${dy} squares up. What are its new coordinates?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`(${x}+${dx}, ${y}+${dy}) = ${correct}.`],
        hints: ["Add the rightward movement to the x-coordinate and the upward movement to the y-coordinate."]
      };
    },
    declaredVariationSpace: 9 * 9 * 5 * 5
  }),

  // --- Y5-L8-3: use rectangle properties to deduce missing lengths and angles ---
  arithmeticTemplate({
    key: "y5l8.rectangleOppositeSideEqual", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    promptTemplates: [
      "A rectangle has one side of {a} cm. Opposite sides of a rectangle are equal — what is the length of the opposite side?",
      "One side of a rectangle measures {a} cm. Using the fact that opposite sides are equal, what is the opposite side's length?"
    ],
    explain: (v, r) => [`In a rectangle, opposite sides are always equal, so the opposite side is also ${r} cm.`],
    hints: () => ["Opposite sides of a rectangle are always the same length."],
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y5l8.rectangleMissingSideFromPerimeterProperty", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[1]!,
    derive: (v, r) => ({ perimeter: 2 * (v[0]! + r), len: v[0]! }),
    promptTemplates: ["A rectangle has a perimeter of {perimeter} cm. Using the fact that opposite sides are equal, if one side is {len} cm, what is the length of an adjacent side?"],
    explain: (v, r) => [`Half the perimeter is ${v[0]! + r}. Subtract the known side: ${v[0]! + r} - ${v[0]} = ${r}.`],
    hints: () => ["Halve the perimeter to get the sum of one length and one width, then subtract the known side."],
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y5l8.quadrilateralMissingAngle", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[30, 150], [30, 150], [30, 150]], constraint: (v) => v[0]! + v[1]! + v[2]! < 330,
    compute: (v) => 360 - v[0]! - v[1]! - v[2]!,
    promptTemplates: ["A four-sided shape has angles of {a}°, {b}°, {c}° and ___°. What is the missing angle, in degrees?"],
    explain: (v, r) => [`Angles in a four-sided shape add up to 360°. 360 - ${v[0]} - ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["The angles in any four-sided shape add up to 360°."],
    declaredVariationSpace: 121 * 121
  }),
  arithmeticTemplate({
    key: "y5l8.rectangleMissingSideFromArea", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[2, 15], [2, 15]], compute: (v) => v[1]!,
    derive: (v, r) => ({ area: v[0]! * r, len: v[0]! }),
    promptTemplates: ["A rectangle has an area of {area} cm² and one side of {len} cm. What is the length of the other side?"],
    explain: (v, r) => [`${v[0]! * r} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the area by the known side to find the missing side."],
    declaredVariationSpace: 14 * 14
  }),
  arithmeticTemplate({
    key: "y5l8.mcRectanglePerimeterFromSides", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "APPLICATION",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 30], [2, 30]], compute: (v) => 2 * (v[0]! + v[1]!),
    promptTemplates: ["A rectangle has sides of {a} cm and {b} cm. Since opposite sides are equal, what is its perimeter?"],
    explain: (v, r) => [`Perimeter = 2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Add the two given side lengths, then double the total."],
    distractorSpread: 10,
    declaredVariationSpace: 29 * 29
  }),
  categoricalPoolTemplate({
    key: "y5l8.tfOppositeSidesRectangle", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "FLUENCY",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 50);
      const isTrueCase = rng.chance(0.5);
      const b = isTrueCase ? a : a + rng.int(1, 10);
      return {
        prompt: `A rectangle has one side of ${a} cm. The side directly opposite it is ${b} cm.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`Opposite sides of a rectangle are always equal, so the opposite side must be ${a} cm.`],
        hints: ["Opposite sides of a rectangle are always the same length."]
      };
    },
    declaredVariationSpace: 50 * 10 * 2
  }),
  arithmeticTemplate({
    key: "y5l8.wordProblemRectangleFrame", levelKey: "Y5L8", objectiveCode: "Y5-L8-3", difficulty: "REASONING",
    misconceptionTags: ["SHAPE_NAME_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 30], [2, 30]], compute: (v) => 2 * (v[0]! + v[1]!),
    derive: (v) => ({ len: v[0]!, wid: v[1]! }), formatValue: (n) => `${n} cm`,
    promptTemplates: ["A rectangular picture frame is {len} cm by {wid} cm. Because opposite sides of a rectangle are equal, how much wood in total is needed to make the frame?"],
    explain: (v, r) => [`Perimeter = 2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Add the length and width, then double the total to find the total distance around."],
    declaredVariationSpace: 29 * 29
  })
];

export default level;
