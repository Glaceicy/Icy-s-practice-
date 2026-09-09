import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 10 — "Year 5 mixed mastery" — a mixed review sampling across
// every Year 5 topic (place value/negatives, factors/fractions/decimals/
// percentages, measurement/geometry/statistics), mirroring how Y1L10 closes
// out Year 1. 23 templates, each verified to reach >=150 distinct valid
// variations.
function fmt2dp(hundredths: number): string {
  const whole = Math.floor(hundredths / 100);
  const frac = String(hundredths % 100).padStart(2, "0");
  return `${whole}.${frac}`;
}
function isPrimeNum(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
const PRIMES_TO_100 = Array.from({ length: 99 }, (_, i) => i + 2).filter(isPrimeNum);
const COMPOSITES_TO_100 = Array.from({ length: 99 }, (_, i) => i + 2).filter((n) => !isPrimeNum(n));
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];

export const level: QuestionTemplateDef[] = [
  // --- Y5-L10-1: place value, negative numbers and the four operations with large numbers ---
  arithmeticTemplate({
    key: "y5l10.placeValueDigit", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100000, 999999]], compute: (v) => Math.floor(v[0]! / 100000), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many hundred thousands are there?", "Counting {ctx}: how many hundred thousands are in {a}?"],
    explain: (v, r) => [`The hundred-thousands digit of ${v[0]} is ${r}.`],
    hints: () => ["The hundred-thousands digit is the first digit of a six-digit number."],
    declaredVariationSpace: 900000 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l10.compareLargeNumbers", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100000, 999999);
      let b = rng.int(100000, 999999);
      while (b === a) b = rng.int(100000, 999999);
      const correct = a > b ? String(a) : String(b);
      const other = correct === String(a) ? String(b) : String(a);
      return {
        prompt: `Which number is bigger, ${a} or ${b}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`Compare digit by digit from the left. ${correct} is bigger.`],
        hints: ["Compare the hundred-thousands digit first, then work right."]
      };
    },
    declaredVariationSpace: 100000000
  }),
  arithmeticTemplate({
    key: "y5l10.roundLargeNumber", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 995000]], compute: (v) => Math.round(v[0]! / 10000) * 10000, contextPool: CTX,
    promptTemplates: ["Round {a} to the nearest 10,000.", "Counting {ctx}: round {a} to the nearest 10,000."],
    explain: (v, r) => [`${v[0]} rounds to ${r} to the nearest 10,000.`],
    hints: () => ["Look at the thousands digit to decide the rounding direction."],
    declaredVariationSpace: 995000 * 2
  }),
  orderingTemplate({
    key: "y5l10.orderNegativeNumbers", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 5) nums.add(rng.int(-20, 20));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag these numbers into order, smallest first."],
    explain: () => ["Negative numbers are smaller than positive numbers; the further below zero, the smaller."],
    hints: () => ["Negative numbers are always smaller than positive numbers."],
    declaredVariationSpace: 200000
  }),
  arithmeticTemplate({
    key: "y5l10.wordProblemTemperatureChange", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "REASONING",
    misconceptionTags: ["NEGATIVE_ORDERING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[-10, 10], [1, 15]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["The temperature was {a} and rose by {b}. What is the new temperature?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["A rise means counting up, through zero if needed."],
    formatValue: (n) => `${n}°C`,
    declaredVariationSpace: 21 * 15
  }),
  arithmeticTemplate({
    key: "y5l10.addLargeNumbers", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "FLUENCY",
    misconceptionTags: ["ADDITION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[10000, 89999], [10000, 89999]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["{a} + {b} = ?", "Counting {ctx}: what is {a} + {b}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add column by column from the ones, carrying where needed."],
    declaredVariationSpace: 100000000
  }),
  arithmeticTemplate({
    key: "y5l10.subtractLargeNumbers", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "APPLICATION",
    misconceptionTags: ["SUBTRACTION_MISCOUNT"], type: "NUMBER_ENTRY",
    ranges: [[50000, 99999], [10000, 49999]], constraint: (v) => v[0]! > v[1]!, compute: (v) => v[0]! - v[1]!, contextPool: CTX,
    promptTemplates: ["{a} - {b} = ?", "Counting {ctx}: what is {a} - {b}?"],
    explain: (v, r) => [`${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract column by column, exchanging where needed."],
    declaredVariationSpace: 50000 * 40000
  }),
  arithmeticTemplate({
    key: "y5l10.divideWithRemainder", levelKey: "Y5L10", objectiveCode: "Y5-L10-1", difficulty: "REASONING",
    misconceptionTags: ["GROUPING_SHARING_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[50, 400], [8, 40]], compute: (v) => Math.ceil(v[0]! / v[1]!),
    promptTemplates: ["{a} pupils are going on a trip. Each minibus holds {b} pupils. How many minibuses are needed so everyone has a seat?"],
    explain: (v, r) => [`${v[0]} ÷ ${v[1]} = ${Math.floor(v[0]! / v[1]!)} remainder ${v[0]! % v[1]!}, so ${r} minibuses are needed.`],
    hints: () => ["If there's a remainder, round up — an extra vehicle is needed."],
    declaredVariationSpace: 350 * 32
  }),

  // --- Y5-L10-2: factors, multiples, fractions, decimals and percentages ---
  categoricalPoolTemplate({
    key: "y5l10.isMultipleCheck", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const base = rng.int(2, 20);
      const multiplier = rng.int(2, 15);
      const isTrueCase = rng.chance(0.5);
      const a = isTrueCase ? base * multiplier : base * multiplier + rng.int(1, base - 1);
      const truth = a % base === 0;
      return {
        prompt: `${a} is a multiple of ${base}.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${a} ÷ ${base} = ${a / base}, no remainder.` : `${a} ÷ ${base} leaves a remainder.`],
        hints: ["A multiple of a number is what you get counting up in steps of that number."]
      };
    },
    declaredVariationSpace: 19 * 14 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l10.mcWhichIsPrime", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const prime = rng.pick(PRIMES_TO_100);
      const distractors = new Set<number>();
      while (distractors.size < 3) distractors.add(rng.pick(COMPOSITES_TO_100));
      return {
        prompt: "Which of these numbers is prime?",
        correctLabel: String(prime),
        distractorLabels: Array.from(distractors).map(String),
        explanationSteps: [`${prime} has exactly two factors, 1 and ${prime}.`],
        hints: ["A prime number has exactly two factors: 1 and itself."]
      };
    },
    declaredVariationSpace: PRIMES_TO_100.length * 5000
  }),
  arithmeticTemplate({
    key: "y5l10.squareNumber", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["NUMBER_BOND_RECALL"], type: "NUMBER_ENTRY",
    ranges: [[1, 25]], compute: (v) => v[0]! * v[0]!, contextPool: CTX,
    promptTemplates: ["What is {a} squared?", "Counting {ctx}: what is {a} squared?"],
    explain: (v, r) => [`${v[0]} x ${v[0]} = ${r}.`],
    hints: () => ["Squaring a number means multiplying it by itself."],
    declaredVariationSpace: 25 * (1 + CTX.length)
  }),
  categoricalPoolTemplate({
    key: "y5l10.compareFractions", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(4, 12);
      const n1 = rng.int(1, d - 1);
      let n2 = rng.int(1, d - 1);
      while (n2 === n1) n2 = rng.int(1, d - 1);
      const bigger = Math.max(n1, n2);
      const smaller = Math.min(n1, n2);
      return {
        prompt: `Which is bigger, ${n1}/${d} or ${n2}/${d}?`,
        correctLabel: `${bigger}/${d}`,
        distractorLabels: [`${smaller}/${d}`],
        explanationSteps: [`With the same denominator, the bigger numerator gives the bigger fraction.`],
        hints: ["When the denominators match, compare the numerators."]
      };
    },
    declaredVariationSpace: 9 * 11 * 10
  }),
  categoricalPoolTemplate({
    key: "y5l10.addFractionsSameDenom", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(5, 12);
      const n1 = rng.int(1, d - 2);
      const n2 = rng.int(1, d - n1 - 1);
      const correct = `${n1 + n2}/${d}`;
      const distractors = [`${n1 + n2}/${d * 2}`, `${n1 * n2}/${d}`, `${n1 + n2 + 1}/${d}`];
      const uniq = Array.from(new Set(distractors)).filter((c) => c !== correct);
      let pad = d * 3;
      while (uniq.length < 3) { const l = `${pad}/${d}`; if (l !== correct) uniq.push(l); pad++; }
      return {
        prompt: `${n1}/${d} + ${n2}/${d} = ?`,
        correctLabel: correct,
        distractorLabels: uniq.slice(0, 3),
        explanationSteps: [`Add the numerators: ${n1} + ${n2} = ${n1 + n2}, giving ${correct}.`],
        hints: ["When the denominators match, just add the numerators."]
      };
    },
    declaredVariationSpace: 8 * 10 * 10
  }),
  categoricalPoolTemplate({
    key: "y5l10.compareDecimals", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 999);
      let b = rng.int(1, 999);
      while (b === a) b = rng.int(1, 999);
      const labelA = fmt2dp(a);
      const labelB = fmt2dp(b);
      const correct = a > b ? labelA : labelB;
      const other = correct === labelA ? labelB : labelA;
      return {
        prompt: `Which is bigger, ${labelA} or ${labelB}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`Compare digit by digit after the decimal point. ${correct} is bigger.`],
        hints: ["Compare the whole number part first, then the decimal digits from left to right."]
      };
    },
    declaredVariationSpace: 999 * 998
  }),
  arithmeticTemplate({
    key: "y5l10.roundDecimal", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 100),
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }), contextPool: CTX,
    promptTemplates: ["Round {decimal} to the nearest whole number.", "Counting {ctx}: round {decimal} to the nearest whole number."],
    explain: (v, r) => [`${fmt2dp(v[0]!)} rounds to ${r}.`],
    hints: () => ["Look at the tenths digit to decide the rounding direction."],
    declaredVariationSpace: 999 * 2
  }),
  arithmeticTemplate({
    key: "y5l10.percentAsFraction", levelKey: "Y5L10", objectiveCode: "Y5-L10-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ pct: v[0]! }), formatValue: (n) => `${n}/100`,
    promptTemplates: ["{pct}% = ?/100", "Write {pct}% as a fraction out of 100."],
    explain: (v, r) => [`${v[0]}% means ${v[0]} out of 100, written as ${r}.`],
    hints: () => ["Per cent means 'out of 100'."],
    declaredVariationSpace: 99 * 2
  }),

  // --- Y5-L10-3: area, volume, angles, transformations and statistics ---
  arithmeticTemplate({
    key: "y5l10.areaRectangle", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ len: v[0]!, wid: v[1]! }), formatValue: (n) => `${n} m²`,
    promptTemplates: ["A rectangle is {len} m by {wid} m. What is its area?"],
    explain: (v, r) => [`Area = ${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the length by the width."],
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y5l10.volumeCuboid", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[2, 10], [2, 10], [2, 10]], compute: (v) => v[0]! * v[1]! * v[2]!,
    derive: (v) => ({ L: v[0]!, W: v[1]!, H: v[2]! }), formatValue: (n) => `${n} cm³`,
    promptTemplates: ["A cuboid is {L} cm by {W} cm by {H} cm. What is its volume?"],
    explain: (v, r) => [`Volume = ${v[0]} x ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Multiply all three dimensions together."],
    declaredVariationSpace: 9 * 9 * 9
  }),
  arithmeticTemplate({
    key: "y5l10.convertUnits", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]! * 100,
    derive: (v) => ({ m: v[0]! }), formatValue: (n) => `${n} cm`,
    promptTemplates: ["Convert {m} m to cm.", "How many cm is {m} m?"],
    explain: (v, r) => [`1 m = 100 cm, so ${v[0]} m = ${r}.`],
    hints: () => ["Multiply by 100 to convert m to cm."],
    declaredVariationSpace: 99 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l10.classifyAngle", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "FLUENCY",
    misconceptionTags: ["POSITION_LR_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      let deg = rng.int(1, 359);
      if (deg === 180) deg = 179;
      const correct = deg === 90 ? "Right angle" : deg < 90 ? "Acute" : deg < 180 ? "Obtuse" : "Reflex";
      const distractors = ["Acute", "Right angle", "Obtuse", "Reflex"].filter((c) => c !== correct);
      return {
        prompt: `An angle measures ${deg}°. What type of angle is it?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${deg}° is classified as ${correct.toLowerCase()}.`],
        hints: ["Acute: less than 90°. Right: exactly 90°. Obtuse: 90-180°. Reflex: more than 180°."]
      };
    },
    declaredVariationSpace: 358
  }),
  categoricalPoolTemplate({
    key: "y5l10.translatePoint", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "APPLICATION",
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
        explanationSteps: [`(${x}+${dx}, ${y}+${dy}) = ${correct}.`],
        hints: ["Moving right adds to the x-coordinate; moving up adds to the y-coordinate."]
      };
    },
    declaredVariationSpace: 9 * 9 * 5 * 5
  }),
  categoricalPoolTemplate({
    key: "y5l10.lineGraphRead", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const values = new Set<number>();
      while (values.size < 5) values.add(rng.int(5, 50));
      const vals = Array.from(values);
      const series = days.map((d, i) => ({ label: d, value: vals[i]! }));
      const idx = rng.int(0, 4);
      const correct = String(vals[idx]);
      const distractors = vals.filter((_, i) => i !== idx).map(String).slice(0, 3);
      return {
        prompt: `The graph shows the number of books borrowed each day. How many were borrowed on ${days[idx]}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Reading the graph at ${days[idx]} shows ${correct}.`],
        hints: ["Find the day on the graph and read the value at that point."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  arithmeticTemplate({
    key: "y5l10.durationBetweenTimes", levelKey: "Y5L10", objectiveCode: "Y5-L10-3", difficulty: "REASONING",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[0, 1200], [10, 180]], compute: (v) => v[1]!,
    derive: (v, r) => {
      const fmtTime = (n: number) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
      return { start: fmtTime(v[0]!), end: fmtTime(v[0]! + r) };
    },
    promptTemplates: ["A journey starts at {start} and ends at {end} (24-hour clock). How many minutes did it take?"],
    explain: (v, r) => [`The journey took ${r} minutes.`],
    hints: () => ["Count the minutes from the start time to the end time."],
    declaredVariationSpace: 1200 * 170
  })
];

export default level;
