import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 6 — "Decimals and percentages"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L6-1 read/write/order/compare decimals
// to 3dp, Y5-L6-2 percent as parts-per-hundred, Y5-L6-3 rounding 2dp
// decimals to a whole number or 1dp).
//
// Decimals are represented internally as plain integers (hundredths or
// thousandths) and converted to a decimal string only at the point of
// display, via the fmt*dp helpers below — this avoids floating-point
// arithmetic entirely, so there is never a ".300000004"-style artifact.
const CTX = ["people", "trees", "books", "tickets", "bricks", "seeds", "coins", "stars"];

function fmt1dp(tenths: number): string {
  const whole = Math.floor(tenths / 10);
  const frac = tenths % 10;
  return `${whole}.${frac}`;
}
function fmt2dp(hundredths: number): string {
  const whole = Math.floor(hundredths / 100);
  const frac = String(hundredths % 100).padStart(2, "0");
  return `${whole}.${frac}`;
}
function fmt3dp(thousandths: number): string {
  const whole = Math.floor(thousandths / 1000);
  const frac = String(thousandths % 1000).padStart(3, "0");
  return `${whole}.${frac}`;
}
/** Converts a hundredths value to a 1dp string, rounding first — used for
 * MULTIPLE_CHOICE/TRUE_FALSE distractors, which are arbitrary nearby
 * integers and so aren't guaranteed to already be an exact multiple of 10. */
function fmtTenthsFromHundredths(hundredths: number): string {
  return fmt1dp(Math.round(hundredths / 10));
}

export const level: QuestionTemplateDef[] = [
  // --- Y5-L6-1: read, write, order and compare decimals to 3 decimal places ---
  categoricalPoolTemplate({
    key: "y5l6.compareDecimalsBigger", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 9999);
      let b = rng.int(1, 9999);
      while (b === a) b = rng.int(1, 9999);
      const labelA = fmt3dp(a);
      const labelB = fmt3dp(b);
      const correct = a > b ? labelA : labelB;
      const other = correct === labelA ? labelB : labelA;
      return {
        prompt: `Which is bigger, ${labelA} or ${labelB}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`Compare digit by digit after the decimal point, starting with the tenths. ${correct} is bigger.`],
        hints: ["Compare the whole number part first, then the tenths, then the hundredths, then the thousandths."]
      };
    },
    declaredVariationSpace: 9999 * 9998
  }),
  categoricalPoolTemplate({
    key: "y5l6.compareDecimalsSameWhole", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      // Deliberately targets the classic misconception: 0.4 has "fewer
      // digits" than 0.25 but is actually bigger.
      const tenths = rng.int(1, 9);
      const hundredths = rng.int(10, 99);
      const shortLabel = `0.${tenths}`;
      const longLabel = `0.${hundredths}`;
      const shortValue = tenths * 10;
      const truthShortBigger = shortValue > hundredths;
      const correct = truthShortBigger ? shortLabel : longLabel;
      const other = correct === shortLabel ? longLabel : shortLabel;
      return {
        prompt: `Which is bigger, ${shortLabel} or ${longLabel}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${shortLabel} = 0.${tenths}0 when written with two decimal places. Comparing 0.${tenths}0 and ${longLabel} shows ${correct} is bigger — more decimal digits doesn't mean a bigger number.`],
        hints: ["Write both decimals with the same number of decimal places before comparing (add a zero if needed)."]
      };
    },
    declaredVariationSpace: 9 * 90 * 20
  }),
  orderingTemplate({
    key: "y5l6.orderDecimalsAscending", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 999));
      return Array.from(nums).map((n) => ({ label: fmt2dp(n), sortValue: n }));
    },
    promptTemplates: ["Drag these decimals into order, smallest first."],
    explain: () => ["Compare the whole number part first, then the tenths digit, then the hundredths digit."],
    hints: () => ["Which decimal has the smallest whole number part? If they're the same, compare the tenths digit."],
    declaredVariationSpace: 500000
  }),
  categoricalPoolTemplate({
    key: "y5l6.tfCompareDecimals", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 999);
      let b = rng.int(1, 999);
      while (b === a) b = rng.int(1, 999);
      const truth = a > b;
      return {
        prompt: `${fmt2dp(a)} is greater than ${fmt2dp(b)}.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${fmt2dp(a)} is bigger, so the statement is true.` : `${fmt2dp(a)} is not bigger than ${fmt2dp(b)}, so the statement is false.`],
        hints: ["Compare the whole number part first, then the decimal digits from left to right."]
      };
    },
    declaredVariationSpace: 999 * 998 * 2
  }),
  arithmeticTemplate({
    key: "y5l6.tenthsDigit", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => Math.floor(v[0]! / 10) % 10,
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }), contextPool: CTX,
    promptTemplates: [
      "In the decimal {decimal}, what is the value of the tenths digit (the first digit after the decimal point)?",
      "What digit is in the tenths place of {decimal}?",
      "Counting {ctx}: what is the tenths digit of {decimal}?"
    ],
    explain: (v, r) => [`The first digit after the decimal point in ${fmt2dp(v[0]!)} is the tenths digit: ${r}.`],
    hints: () => ["The tenths digit is the first digit right after the decimal point."],
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l6.hundredthsDigit", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => v[0]! % 10,
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }), contextPool: CTX,
    promptTemplates: [
      "In the decimal {decimal}, what is the value of the hundredths digit (the second digit after the decimal point)?",
      "What digit is in the hundredths place of {decimal}?",
      "Counting {ctx}: what is the hundredths digit of {decimal}?"
    ],
    explain: (v, r) => [`The second digit after the decimal point in ${fmt2dp(v[0]!)} is the hundredths digit: ${r}.`],
    hints: () => ["The hundredths digit is the second digit after the decimal point."],
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l6.thousandthsDigit", levelKey: "Y5L6", objectiveCode: "Y5-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9999]], compute: (v) => v[0]! % 10,
    derive: (v) => ({ decimal: fmt3dp(v[0]!) }), contextPool: CTX,
    promptTemplates: [
      "In the decimal {decimal}, what is the value of the thousandths digit (the third digit after the decimal point)?",
      "What digit is in the thousandths place of {decimal}?",
      "Counting {ctx}: what is the thousandths digit of {decimal}?"
    ],
    explain: (v, r) => [`The third digit after the decimal point in ${fmt3dp(v[0]!)} is the thousandths digit: ${r}.`],
    hints: () => ["The thousandths digit is the third digit after the decimal point."],
    declaredVariationSpace: 9999 * 3
  }),

  // --- Y5-L6-2: recognise the per cent symbol, percentage as parts per hundred ---
  arithmeticTemplate({
    key: "y5l6.percentAsFraction100", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ pct: v[0]! }), formatValue: (n) => `${n}/100`,
    promptTemplates: ["{pct}% = ?/100", "Write {pct}% as a fraction out of 100."],
    explain: (v, r) => [`${v[0]}% means ${v[0]} out of 100, written as the fraction ${r}.`],
    hints: () => ["Per cent means 'out of 100' — the percentage is always the numerator over 100."],
    declaredVariationSpace: 99 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l6.tfPercentMeaning", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 99);
      const isTrueCase = rng.chance(0.5);
      const wrongDenoms = [10, 1000];
      const shownDenom = isTrueCase ? 100 : rng.pick(wrongDenoms);
      return {
        prompt: `${a}% means ${a} parts out of ${shownDenom}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`The % symbol always means "out of 100", so ${a}% is ${a} parts out of 100.`],
        hints: ["Per cent always means 'out of 100', whatever number comes before the % sign."]
      };
    },
    declaredVariationSpace: 99 * 2 * 2
  }),
  arithmeticTemplate({
    key: "y5l6.mcShadedGridPercent", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ count: v[0]! }), formatValue: (n) => `${n}%`,
    promptTemplates: [
      "A 10x10 grid has {count} out of 100 squares shaded. What percentage is shaded?",
      "Out of a 10x10 grid of 100 squares, {count} are shaded. What percentage does that represent?",
      "{count} squares out of a 100-square grid are coloured in. What percentage is coloured?"
    ],
    explain: (v, r) => [`${v[0]} shaded out of 100 total squares is ${r}.`],
    hints: () => ["The percentage shaded is just the number of shaded squares, since there are 100 squares in total."],
    distractorSpread: 10,
    declaredVariationSpace: 99 * 3
  }),
  categoricalPoolTemplate({
    key: "y5l6.mcSimplifyCommonPercent", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const options: Array<[number, string]> = [
        [10, "1/10"], [20, "1/5"], [25, "1/4"], [40, "2/5"],
        [50, "1/2"], [60, "3/5"], [75, "3/4"], [80, "4/5"]
      ];
      const idx = rng.int(0, options.length - 1);
      const [pct, correct] = options[idx]!;
      const others = options.filter((_, i) => i !== idx).map(([, f]) => f);
      const distractors = rng.shuffle(others).slice(0, 3);
      return {
        prompt: `Write ${pct}% as a fraction in its simplest form.`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${pct}% = ${pct}/100, which simplifies to ${correct}.`],
        hints: ["Write the percentage as a fraction over 100, then simplify by dividing top and bottom by the same number."]
      };
    },
    declaredVariationSpace: 8 * 500
  }),
  categoricalPoolTemplate({
    key: "y5l6.comparePercentToHundredthsFraction", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 99);
      let b = rng.int(1, 99);
      while (b === a) b = rng.int(1, 99);
      const labelA = `${a}%`;
      const labelB = `${b}/100`;
      const correct = a > b ? labelA : labelB;
      const other = correct === labelA ? labelB : labelA;
      return {
        prompt: `Which is bigger, ${labelA} or ${labelB}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${labelA} means ${a} out of 100. Comparing ${a} out of 100 and ${b} out of 100 shows ${correct} is bigger.`],
        hints: ["A percentage is just another way of writing a fraction out of 100."]
      };
    },
    declaredVariationSpace: 99 * 98
  }),
  arithmeticTemplate({
    key: "y5l6.mcPercentNotShaded", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 99]], compute: (v) => 100 - v[0]!,
    derive: (v) => ({ count: v[0]! }), formatValue: (n) => `${n}%`,
    promptTemplates: [
      "{count} out of 100 squares in a grid are shaded. What percentage is NOT shaded?",
      "In a grid of 100 squares, {count} are shaded. What percentage of the grid is left unshaded?",
      "A 100-square grid has {count} squares coloured in. What percentage stays blank?"
    ],
    explain: (v, r) => [`100 - ${v[0]} = ${100 - v[0]!}, so ${r} of the grid is not shaded.`],
    hints: () => ["Subtract the shaded percentage from 100%."],
    distractorSpread: 10,
    declaredVariationSpace: 99 * 3
  }),
  arithmeticTemplate({
    key: "y5l6.wordProblemPercentSurvey", levelKey: "Y5L6", objectiveCode: "Y5-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "WORD_PROBLEM",
    ranges: [[1, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ count: v[0]! }), formatValue: (n) => `${n}%`,
    contextPool: ["like chocolate ice cream best", "prefer football to other sports", "walk to school", "have a pet at home", "read every day", "play a musical instrument"],
    promptTemplates: ["In a survey of 100 people, {count} said they {ctx}. What percentage is that?"],
    explain: (v, r) => [`${v[0]} out of 100 people is ${r}.`],
    hints: () => ["A number out of 100 converts directly to a percentage."],
    declaredVariationSpace: 99 * 6
  }),

  // --- Y5-L6-3: round decimals with 2 decimal places to a whole number or 1dp ---
  arithmeticTemplate({
    key: "y5l6.roundDecimalToWhole", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 100),
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }), contextPool: CTX,
    promptTemplates: ["Round {decimal} to the nearest whole number.", "What is {decimal} rounded to the nearest whole number?", "Counting {ctx}: round {decimal} to the nearest whole number."],
    explain: (v, r) => [`Look at the tenths digit of ${fmt2dp(v[0]!)}.`, `${fmt2dp(v[0]!)} rounds to ${r}.`],
    hints: () => ["If the tenths digit is 5 or more, round up; otherwise round down."],
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l6.roundDecimalToTenth", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 10) * 10,
    formatValue: (n) => fmtTenthsFromHundredths(n),
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }), contextPool: CTX,
    promptTemplates: ["Round {decimal} to the nearest tenth (one decimal place).", "What is {decimal} rounded to one decimal place?", "Counting {ctx}: round {decimal} to the nearest tenth."],
    explain: (v, r) => [`Look at the hundredths digit of ${fmt2dp(v[0]!)}.`, `${fmt2dp(v[0]!)} rounds to ${r}.`],
    hints: () => ["If the hundredths digit is 5 or more, round the tenths digit up; otherwise leave it."],
    declaredVariationSpace: 999 * 3
  }),
  arithmeticTemplate({
    key: "y5l6.mcRoundDecimalToWhole", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 999]], compute: (v) => Math.round(v[0]! / 100),
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }),
    promptTemplates: ["What is {decimal} rounded to the nearest whole number?"],
    explain: (v, r) => [`${fmt2dp(v[0]!)} rounds to ${r}.`],
    hints: () => ["Look at the tenths digit to decide whether to round up or down."],
    distractorSpread: 2,
    declaredVariationSpace: 999
  }),
  categoricalPoolTemplate({
    key: "y5l6.tfRoundDecimalToWhole", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const n = rng.int(1, 999);
      const correctRounded = Math.round(n / 100);
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correctRounded : correctRounded + (rng.chance(0.5) ? 1 : -1);
      return {
        prompt: `${fmt2dp(n)} rounded to the nearest whole number is ${shown}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${fmt2dp(n)} rounds to ${correctRounded}.`],
        hints: ["Look at the tenths digit to decide whether to round up or down."]
      };
    },
    declaredVariationSpace: 999 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l6.mcRoundDecimalToTenth", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const n = rng.int(1, 999);
      const decimal = fmt2dp(n);
      const correctTenths = Math.round(n / 10);
      const correct = fmt1dp(correctTenths);
      // Build distractors directly as distinct tenths-unit integers (never
      // by rounding an arbitrary nearby hundredths value, which can collapse
      // onto the same displayed tenth as the correct answer).
      const candidateOffsets = [-2, -1, 1, 2];
      const uniqueDistractors = Array.from(
        new Set(candidateOffsets.map((o) => correctTenths + o).filter((t) => t >= 0).map(fmt1dp))
      ).filter((label) => label !== correct);
      let extra = 3;
      while (uniqueDistractors.length < 3) {
        uniqueDistractors.push(fmt1dp(correctTenths + extra));
        extra++;
      }
      return {
        prompt: `What is ${decimal} rounded to one decimal place?`,
        correctLabel: correct,
        distractorLabels: uniqueDistractors.slice(0, 3),
        explanationSteps: [`${decimal} rounds to ${correct}.`],
        hints: ["Look at the hundredths digit to decide whether to round the tenths digit up or down."]
      };
    },
    declaredVariationSpace: 999
  }),
  arithmeticTemplate({
    key: "y5l6.wordProblemRoundDecimalLength", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 999]], compute: (v) => Math.round(v[0]! / 100),
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }),
    contextPool: ["A ribbon", "A garden path", "A piece of rope", "A curtain", "A plank of wood", "A scarf"],
    promptTemplates: ["{ctx} measures {decimal} m. Rounded to the nearest whole metre, how long is it?"],
    explain: (v, r) => [`${fmt2dp(v[0]!)} rounds to ${r} m.`],
    hints: () => ["Look at the tenths digit to decide the rounding direction."],
    declaredVariationSpace: 900 * 6
  }),
  arithmeticTemplate({
    key: "y5l6.wordProblemRoundDecimalWeight", levelKey: "Y5L6", objectiveCode: "Y5-L6-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 999]], compute: (v) => Math.round(v[0]! / 10) * 10,
    formatValue: (n) => fmtTenthsFromHundredths(n),
    derive: (v) => ({ decimal: fmt2dp(v[0]!) }),
    contextPool: ["A bag of flour", "A parcel", "A bag of apples", "A puppy", "A box of cereal", "A bag of rice"],
    promptTemplates: ["{ctx} weighs {decimal} kg. Rounded to the nearest tenth of a kilogram, what is its weight?"],
    explain: (v, r) => [`${fmt2dp(v[0]!)} rounds to ${r} kg.`],
    hints: () => ["Look at the hundredths digit to decide whether to round the tenths digit up or down."],
    declaredVariationSpace: 900 * 6
  })
];

export default level;
