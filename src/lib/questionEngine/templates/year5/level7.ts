import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 7 — "Measurement, perimeter, area and volume"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L7-1 area/perimeter of rectangles and
// irregular shapes, Y5-L7-2 volume/capacity, Y5-L7-3 converting metric units).
const ROOMS = ["A bedroom", "A living room", "A classroom", "A hallway", "An office", "A kitchen"];
const BOXES = ["A storage box", "A fish tank", "A shipping crate", "A toy chest", "A fridge", "A suitcase"];

interface CapacityItem { item: string; correct: string; wrongPool: string[]; }
const CAPACITY_ITEMS: CapacityItem[] = [
  { item: "a teaspoon", correct: "5 ml", wrongPool: ["50 ml", "500 ml", "5 l", "50 l", "1 l", "250 ml", "20 ml", "100 ml"] },
  { item: "a mug of tea", correct: "250 ml", wrongPool: ["25 ml", "2.5 l", "25 l", "5 ml", "1 l", "500 l", "50 ml", "10 l"] },
  { item: "a kettle", correct: "1.5 l", wrongPool: ["15 ml", "150 ml", "15 l", "150 l", "5 ml", "250 ml", "500 l", "50 ml"] },
  { item: "a bathtub", correct: "150 l", wrongPool: ["15 l", "1,500 l", "15 ml", "1.5 l", "250 ml", "5 l", "500 ml", "50 ml"] },
  { item: "a large water bottle", correct: "1 l", wrongPool: ["100 ml", "10 l", "10 ml", "500 l", "5 ml", "150 l", "50 ml", "1,500 l"] },
  { item: "a bucket", correct: "10 l", wrongPool: ["1 l", "100 l", "100 ml", "1.5 l", "5 ml", "250 ml", "500 l", "50 ml"] },
  { item: "a fish tank", correct: "50 l", wrongPool: ["5 l", "500 l", "500 ml", "1 l", "150 l", "5 ml", "250 ml", "10 ml"] },
  { item: "a small swimming pool", correct: "50,000 l", wrongPool: ["500 l", "5,000 l", "500,000 l", "50 l", "5 l", "150 l", "1 l", "10 l"] }
];

export const level: QuestionTemplateDef[] = [
  // --- Y5-L7-1: area of rectangles, estimating area of irregular shapes ---
  arithmeticTemplate({
    key: "y5l7.areaRectangle", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ len: v[0]!, wid: v[1]! }), formatValue: (n) => `${n} m²`,
    promptTemplates: ["A rectangle is {len} m by {wid} m. What is its area?", "Find the area of a rectangle {len} m long and {wid} m wide."],
    explain: (v, r) => [`Area = length x width = ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the length by the width."],
    declaredVariationSpace: 19 * 19 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.missingSideFromArea", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[2, 15], [2, 15]], compute: (v) => v[1]!,
    derive: (v, r) => ({ area: v[0]! * r, len: v[0]! }),
    promptTemplates: ["A rectangle has an area of {area} m² and one side of {len} m. What is the length of the other side?"],
    explain: (v, r) => [`${v[0]! * r} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Divide the area by the known side to find the missing side."],
    declaredVariationSpace: 14 * 14
  }),
  arithmeticTemplate({
    key: "y5l7.perimeterRectangle", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 30], [2, 30]], compute: (v) => 2 * (v[0]! + v[1]!),
    derive: (v) => ({ len: v[0]!, wid: v[1]! }), formatValue: (n) => `${n} m`,
    promptTemplates: ["A rectangle is {len} m by {wid} m. What is its perimeter?", "Find the perimeter of a rectangle {len} m long and {wid} m wide."],
    explain: (v, r) => [`Perimeter = 2 x (length + width) = 2 x (${v[0]} + ${v[1]}) = ${r}.`],
    hints: () => ["Add the length and width, then double the total."],
    declaredVariationSpace: 29 * 29 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.missingSideFromPerimeter", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[1]!,
    derive: (v, r) => ({ perimeter: 2 * (v[0]! + r), len: v[0]! }),
    promptTemplates: ["A rectangle has a perimeter of {perimeter} m. One side is {len} m. What is the length of an adjacent side?"],
    explain: (v, r) => [`Half the perimeter is ${v[0]! + r}. Subtract the known side: ${v[0]! + r} - ${v[0]} = ${r}.`],
    hints: () => ["Halve the perimeter to get the sum of one length and one width, then subtract the known side."],
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y5l7.mcAreaRectangle", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ len: v[0]!, wid: v[1]! }), formatValue: (n) => `${n} m²`,
    promptTemplates: ["What is the area of a rectangle {len} m by {wid} m?"],
    explain: (v, r) => [`Area = ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the length by the width."],
    distractorSpread: 15,
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y5l7.estimateIrregularArea", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 10], [2, 10], [2, 10], [2, 10]], compute: (v) => v[0]! * v[1]! + v[2]! * v[3]!,
    derive: (v) => ({ p: v[0]!, q: v[1]!, r2: v[2]!, s: v[3]! }), formatValue: (n) => `${n} m²`,
    promptTemplates: ["An L-shaped garden is made of two rectangles: one {p} m by {q} m, and another {r2} m by {s} m. What is the total area?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[2]} x ${v[3]} = ${v[2]! * v[3]!}.`, `${v[0]! * v[1]!} + ${v[2]! * v[3]!} = ${r}.`],
    hints: () => ["Split the shape into two rectangles, find each area, then add them together."],
    declaredVariationSpace: 9 * 9 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y5l7.wordProblemAreaCarpet", levelKey: "Y5L7", objectiveCode: "Y5-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 10], [2, 10]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ len: v[0]!, wid: v[1]! }), formatValue: (n) => `${n} m²`, contextPool: ROOMS,
    promptTemplates: ["{ctx} measures {len} m by {wid} m. What area of carpet is needed to cover the floor?"],
    explain: (v, r) => [`Area = ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the length by the width to find the floor area."],
    declaredVariationSpace: 9 * 9 * ROOMS.length
  }),

  // --- Y5-L7-2: estimate volume and capacity using cubes and standard units ---
  arithmeticTemplate({
    key: "y5l7.volumeCuboid", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 10], [2, 10], [2, 10]], compute: (v) => v[0]! * v[1]! * v[2]!,
    derive: (v) => ({ L: v[0]!, W: v[1]!, H: v[2]! }), formatValue: (n) => `${n} cm³`,
    promptTemplates: ["A cuboid is {L} cm by {W} cm by {H} cm. What is its volume?"],
    explain: (v, r) => [`Volume = length x width x height = ${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions together."],
    declaredVariationSpace: 9 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y5l7.mcVolumeCuboid", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[2, 10], [2, 10], [2, 10]], compute: (v) => v[0]! * v[1]! * v[2]!,
    derive: (v) => ({ L: v[0]!, W: v[1]!, H: v[2]! }), formatValue: (n) => `${n} cm³`,
    promptTemplates: ["What is the volume of a cuboid {L} cm by {W} cm by {H} cm?"],
    explain: (v, r) => [`Volume = ${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions together."],
    distractorSpread: 20,
    declaredVariationSpace: 9 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y5l7.countCubesVolume", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[2, 8], [2, 8], [2, 8]], compute: (v) => v[0]! * v[1]! * v[2]!,
    derive: (v) => ({ rows: v[0]!, cols: v[1]!, layers: v[2]! }),
    promptTemplates: ["A box is built from unit cubes arranged in {rows} rows, {cols} columns and {layers} layers. How many cubes make up the box?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} x ${v[2]} = ${r} cubes.`],
    hints: () => ["Multiply the number of rows, columns and layers together."],
    declaredVariationSpace: 7 * 7 * 7
  }),
  arithmeticTemplate({
    key: "y5l7.missingDimensionFromVolume", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[2, 8], [2, 8], [2, 8]], compute: (v) => v[2]!,
    derive: (v, r) => ({ volume: v[0]! * v[1]! * r, L: v[0]!, W: v[1]! }),
    promptTemplates: ["A cuboid has a volume of {volume} cm³. Its base is {L} cm by {W} cm. What is its height?"],
    explain: (v, r) => [`${v[0]! * v[1]!} x height = ${v[0]! * v[1]! * r}, so height = ${v[0]! * v[1]! * r} ÷ ${v[0]! * v[1]!} = ${r}.`],
    hints: () => ["Divide the volume by the base area (length x width) to find the height."],
    declaredVariationSpace: 7 * 7 * 7
  }),
  categoricalPoolTemplate({
    key: "y5l7.tfVolumeCuboid", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const l = rng.int(2, 10);
      const w = rng.int(2, 10);
      const h = rng.int(2, 10);
      const correctVol = l * w * h;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correctVol : correctVol + rng.int(1, 20);
      return {
        prompt: `A cuboid is ${l} cm by ${w} cm by ${h} cm. Its volume is ${shown} cm³.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${l} x ${w} x ${h} = ${correctVol} cm³.`],
        hints: ["Multiply all three dimensions together to find the volume."]
      };
    },
    declaredVariationSpace: 9 * 9 * 9 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l7.mcEstimateCapacity", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const it = rng.pick(CAPACITY_ITEMS);
      const distractors = rng.shuffle(it.wrongPool).slice(0, 3);
      return {
        prompt: `Which is the best estimate for the capacity of ${it.item}?`,
        correctLabel: it.correct,
        distractorLabels: distractors,
        explanationSteps: [`${it.item} typically holds about ${it.correct}.`],
        hints: ["Think about everyday objects you know the size of to help you estimate."]
      };
    },
    declaredVariationSpace: CAPACITY_ITEMS.length * 56
  }),
  arithmeticTemplate({
    key: "y5l7.wordProblemVolumeBox", levelKey: "Y5L7", objectiveCode: "Y5-L7-2", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 10], [2, 10], [2, 10]], compute: (v) => v[0]! * v[1]! * v[2]!,
    derive: (v) => ({ L: v[0]!, W: v[1]!, H: v[2]! }), formatValue: (n) => `${n} cm³`, contextPool: BOXES,
    promptTemplates: ["{ctx} is {L} cm by {W} cm by {H} cm. What is its volume?"],
    explain: (v, r) => [`Volume = ${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions together."],
    declaredVariationSpace: 9 * 9 * 9 * BOXES.length
  }),

  // --- Y5-L7-3: convert between different units of metric measure ---
  arithmeticTemplate({
    key: "y5l7.convertCmToMm", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 999]], compute: (v) => v[0]! * 10,
    derive: (v) => ({ cm: v[0]! }), formatValue: (n) => `${n} mm`,
    promptTemplates: ["Convert {cm} cm to mm.", "How many mm is {cm} cm?"],
    explain: (v, r) => [`1 cm = 10 mm, so ${v[0]} cm = ${r}.`],
    hints: () => ["Multiply by 10 to convert cm to mm."],
    declaredVariationSpace: 999 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.convertMmToCm", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 999]], compute: (v) => v[0]!,
    derive: (v) => ({ mm: v[0]! * 10 }), formatValue: (n) => `${n} cm`,
    promptTemplates: ["Convert {mm} mm to cm.", "How many cm is {mm} mm?"],
    explain: (v, r) => [`1 cm = 10 mm, so ${v[0]! * 10} mm = ${r}.`],
    hints: () => ["Divide by 10 to convert mm to cm."],
    declaredVariationSpace: 999 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.convertMToCm", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]! * 100,
    derive: (v) => ({ m: v[0]! }), formatValue: (n) => `${n} cm`,
    promptTemplates: ["Convert {m} m to cm.", "How many cm is {m} m?"],
    explain: (v, r) => [`1 m = 100 cm, so ${v[0]} m = ${r}.`],
    hints: () => ["Multiply by 100 to convert m to cm."],
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.convertCmToM", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ cm: v[0]! * 100 }), formatValue: (n) => `${n} m`,
    promptTemplates: ["Convert {cm} cm to m.", "How many m is {cm} cm?"],
    explain: (v, r) => [`1 m = 100 cm, so ${v[0]! * 100} cm = ${r}.`],
    hints: () => ["Divide by 100 to convert cm to m."],
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.convertKgToG", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]! * 1000,
    derive: (v) => ({ kg: v[0]! }), formatValue: (n) => `${n} g`,
    promptTemplates: ["Convert {kg} kg to g.", "How many g is {kg} kg?"],
    explain: (v, r) => [`1 kg = 1,000 g, so ${v[0]} kg = ${r}.`],
    hints: () => ["Multiply by 1,000 to convert kg to g."],
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.convertLToMl", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]! * 1000,
    derive: (v) => ({ l: v[0]! }), formatValue: (n) => `${n} ml`,
    promptTemplates: ["Convert {l} l to ml.", "How many ml is {l} l?"],
    explain: (v, r) => [`1 l = 1,000 ml, so ${v[0]} l = ${r}.`],
    hints: () => ["Multiply by 1,000 to convert l to ml."],
    declaredVariationSpace: 99 * 2
  }),
  arithmeticTemplate({
    key: "y5l7.convertMToKmDecimal", levelKey: "Y5L7", objectiveCode: "Y5-L7-3", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ metres: v[0]! * 100 }),
    formatValue: (n) => {
      const whole = Math.floor(n / 10);
      const frac = n % 10;
      return `${whole}.${frac} km`;
    },
    promptTemplates: ["Convert {metres} m to km.", "How many km is {metres} m?"],
    explain: (v, r) => [`1,000 m = 1 km, so ${v[0]! * 100} m = ${r}.`],
    hints: () => ["Divide the number of metres by 1,000 to convert to km."],
    declaredVariationSpace: 99 * 2
  })
];

export default level;
