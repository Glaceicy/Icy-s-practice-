import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 2 — "Proportion, rates and compound measures"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y9-L2-1 direct and inverse proportion,
// Y9-L2-2 compound measures — speed, density, pressure, Y9-L2-3 growth
// and decay problems). Every scenario is constructed from small integer
// factors so the answer always lands on a whole number.
const CTX_ITEMS = ["pencils", "notebooks", "tickets", "apples", "balloons", "stickers", "chairs", "plants"];
const SCENARIOS = ["paint a fence", "fill a water tank", "pack a delivery van", "build a wall", "harvest a field", "clean an office block", "sort a warehouse", "plant a field"];
const GROWTH_CTX = ["A town's population", "A savings account balance", "A bacteria colony", "A company's profits", "A forest's tree count", "A school's enrolment", "A website's users", "A city's recycling rate"];
const PERCENT_OPTIONS = [
  { percent: 10, requiredMultiple: 10 },
  { percent: 20, requiredMultiple: 5 },
  { percent: 25, requiredMultiple: 4 },
  { percent: 50, requiredMultiple: 2 }
];

export const level: QuestionTemplateDef[] = [
  // --- Y9-L2-1: direct and inverse proportion ---
  arithmeticTemplate({
    key: "y9l2.directProportionUnitary", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["PROPORTION_ADDITIVE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 20], [2, 20], [2, 20]], constraint: (v) => v[2]! !== v[1]!, compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ qty1: v[1]!, cost1: v[0]! * v[1]!, qty2: v[2]! }),
    promptTemplates: ["{qty1} items cost £{cost1} in total. At the same rate, how much would {qty2} items cost?"],
    explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} per item. £${v[0]} x ${v[2]} = £${r}.`],
    hints: () => ["Find the cost of one item first, then multiply by the new quantity."],
    declaredVariationSpace: 20 * 19 * 19
  }),
  arithmeticTemplate({
    key: "y9l2.inverseProportionWorkers", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12], [2, 6]], compute: (v) => v[1]!,
    derive: (v) => ({ workers1: v[0]!, days1: v[1]! * v[2]!, workers2: v[0]! * v[2]! }),
    promptTemplates: ["{workers1} workers take {days1} days to complete a job. How many days would {workers2} workers take, working at the same rate?"],
    explain: (v, r) => [`${v[0]} x ${v[1]! * v[2]!} = ${v[0]! * v[1]! * v[2]!} worker-days of work in total. ${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[2]!} = ${r} days.`],
    hints: () => ["More workers means the job takes fewer days — the total amount of work stays the same."],
    declaredVariationSpace: 11 * 11 * 5
  }),
  arithmeticTemplate({
    key: "y9l2.directProportionMissingQuantity", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ADDITIVE_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1, 20], [2, 20], [2, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ qty1: v[1]!, cost1: v[0]! * v[1]!, targetCost: v[0]! * v[2]! }),
    promptTemplates: ["{qty1} items cost £{cost1}. How many items can you buy for £{targetCost} at the same rate?"],
    explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} per item. £${v[0]! * v[2]!} ÷ £${v[0]} = ${r} items.`],
    hints: () => ["Find the price of one item first, then divide the target amount by that price."],
    declaredVariationSpace: 20 * 19 * 19
  }),
  categoricalPoolTemplate({
    key: "y9l2.mcDirectProportion", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ADDITIVE_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const unitPrice = rng.int(1, 20);
      const qty1 = rng.int(2, 20);
      let qty2 = rng.int(2, 20);
      while (qty2 === qty1) qty2 = rng.int(2, 20);
      const cost1 = unitPrice * qty1;
      const cost2 = unitPrice * qty2;
      const distractors = numericDistractors(rng, cost2, 3, Math.max(2, Math.round(cost2 * 0.2))).map(String);
      return {
        prompt: `${qty1} items cost £${cost1} in total. At the same rate, how much would ${qty2} items cost?`,
        correctLabel: String(cost2),
        distractorLabels: distractors,
        explanationSteps: [`£${cost1} ÷ ${qty1} = £${unitPrice} per item. £${unitPrice} x ${qty2} = £${cost2}.`],
        hints: ["Find the cost of one item first, then multiply by the new quantity."]
      };
    },
    declaredVariationSpace: 20 * 19 * 19
  }),
  categoricalPoolTemplate({
    key: "y9l2.tfInverseProportionCheck", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_DIRECTION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const workers1 = rng.int(2, 12);
      const days2 = rng.int(2, 12);
      const m = rng.int(2, 6);
      const days1 = days2 * m;
      const workers2 = workers1 * m;
      const isTrueCase = rng.chance(0.5);
      const shownDays2 = isTrueCase ? days2 : days2 + rng.int(1, 3);
      return {
        prompt: `${workers1} workers take ${days1} days to finish a job. If ${workers2} workers do the same job at the same rate, it would take ${shownDays2} days. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`With ${m} times as many workers, the job takes ${m} times fewer days: ${days1} ÷ ${m} = ${days2} days.`],
        hints: ["More workers means the job takes fewer days, in inverse proportion."]
      };
    },
    declaredVariationSpace: 11 * 11 * 5 * 2
  }),
  arithmeticTemplate({
    key: "y9l2.wordProblemDirectProportion", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_ADDITIVE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 20], [2, 20], [2, 20]], constraint: (v) => v[2]! !== v[1]!, compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ qty1: v[1]!, cost1: v[0]! * v[1]!, qty2: v[2]! }), contextPool: CTX_ITEMS,
    promptTemplates: ["A shop sells {qty1} {ctx} for £{cost1}. At the same rate, how much would {qty2} {ctx} cost?"],
    explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} per item. £${v[0]} x ${v[2]} = £${r}.`],
    hints: () => ["Find the cost of one item first, then multiply by the new quantity."],
    declaredVariationSpace: 20 * 19 * 19 * CTX_ITEMS.length
  }),
  arithmeticTemplate({
    key: "y9l2.wordProblemInverseProportion", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 12], [2, 12], [2, 6]], compute: (v) => v[1]!,
    derive: (v) => ({ workers1: v[0]!, days1: v[1]! * v[2]!, workers2: v[0]! * v[2]! }), contextPool: SCENARIOS,
    promptTemplates: ["It takes {workers1} people {days1} days to {ctx}. How many days would it take {workers2} people, working at the same rate?"],
    explain: (v, r) => [`${v[0]} x ${v[1]! * v[2]!} = ${v[0]! * v[1]! * v[2]!} worker-days of work in total. ${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[2]!} = ${r} days.`],
    hints: () => ["More people means the task takes fewer days — the total amount of work stays the same."],
    declaredVariationSpace: 11 * 11 * 5 * SCENARIOS.length
  }),

  // --- Y9-L2-2: interpret and use compound measures — speed, density and pressure ---
  arithmeticTemplate({
    key: "y9l2.calculateSpeed", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 100], [1, 10]], compute: (v) => v[0]!,
    derive: (v) => ({ distance: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: ["A car travels {distance} miles in {time} hours. What is its average speed, in mph?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} mph.`],
    hints: () => ["Speed = distance ÷ time."],
    declaredVariationSpace: 91 * 10
  }),
  arithmeticTemplate({
    key: "y9l2.calculateDistance", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 100], [1, 10]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A car travels at {a} mph for {b} hours. How far does it travel, in miles?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r} miles.`],
    hints: () => ["Distance = speed x time."],
    declaredVariationSpace: 91 * 10
  }),
  arithmeticTemplate({
    key: "y9l2.calculateTime", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 100], [1, 10]], compute: (v) => v[1]!,
    derive: (v) => ({ distance: v[0]! * v[1]!, speed: v[0]! }),
    promptTemplates: ["A car travels {distance} miles at an average speed of {speed} mph. How long does the journey take, in hours?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r} hours.`],
    hints: () => ["Time = distance ÷ speed."],
    declaredVariationSpace: 91 * 10
  }),
  arithmeticTemplate({
    key: "y9l2.calculateDensity", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ mass: v[0]! * v[1]!, volume: v[1]! }),
    promptTemplates: ["An object has a mass of {mass} g and a volume of {volume} cm³. What is its density, in g/cm³?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} g/cm³.`],
    hints: () => ["Density = mass ÷ volume."],
    declaredVariationSpace: 19 * 19
  }),
  arithmeticTemplate({
    key: "y9l2.calculatePressure", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ force: v[0]! * v[1]!, area: v[1]! }),
    promptTemplates: ["A force of {force} N acts on an area of {area} cm². What is the pressure, in N/cm²?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} N/cm².`],
    hints: () => ["Pressure = force ÷ area."],
    declaredVariationSpace: 19 * 19
  }),
  categoricalPoolTemplate({
    key: "y9l2.mcCompoundMeasure", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const measureType = rng.pick(["speed", "density", "pressure"]);
      const rate = rng.int(2, 50);
      const other = rng.int(2, 20);
      const total = rate * other;
      const distractors = numericDistractors(rng, rate, 3, Math.max(2, Math.round(rate * 0.2))).map(String);
      let prompt: string;
      if (measureType === "speed") prompt = `A car travels ${total} miles in ${other} hours. What is its average speed, in mph?`;
      else if (measureType === "density") prompt = `An object has a mass of ${total} g and a volume of ${other} cm³. What is its density, in g/cm³?`;
      else prompt = `A force of ${total} N acts on an area of ${other} cm². What is the pressure, in N/cm²?`;
      return {
        prompt,
        correctLabel: String(rate),
        distractorLabels: distractors,
        explanationSteps: [`${total} ÷ ${other} = ${rate}.`],
        hints: ["Divide the total quantity by the other measurement to find the rate."]
      };
    },
    declaredVariationSpace: 3 * 48 * 18
  }),
  categoricalPoolTemplate({
    key: "y9l2.wordProblemCompareSpeed", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "REASONING",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const speed1 = rng.int(10, 90);
      const time1 = rng.int(1, 10);
      let speed2 = rng.int(10, 90);
      let time2 = rng.int(1, 10);
      const d1 = speed1 * time1;
      let d2 = speed2 * time2;
      if (d1 === d2) { speed2 = speed2 + 5; d2 = speed2 * time2; }
      const optionA = `${d1} miles in ${time1} hours`;
      const optionB = `${d2} miles in ${time2} hours`;
      return {
        prompt: `Which journey has the faster average speed: ${optionA}, or ${optionB}?`,
        correctLabel: d1 / time1 > d2 / time2 ? optionA : optionB,
        distractorLabels: [d1 / time1 > d2 / time2 ? optionB : optionA],
        explanationSteps: [`${optionA}: ${d1} ÷ ${time1} = ${d1 / time1} mph. ${optionB}: ${d2} ÷ ${time2} = ${d2 / time2} mph.`],
        hints: ["Work out the average speed (distance ÷ time) for each journey, then compare."]
      };
    },
    declaredVariationSpace: 80 * 10 * 80 * 10
  }),

  // --- Y9-L2-3: set up, solve and interpret answers in growth and decay problems ---
  arithmeticTemplate({
    key: "y9l2.simpleGrowthOneStep", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 110,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{ctx} of {base} grows by 10% in one year. What is the new value after one year?"],
    explain: (v, r) => [`10% of ${v[0]! * 100} is ${v[0]! * 10}. ${v[0]! * 100} + ${v[0]! * 10} = ${r}.`],
    hints: () => ["Work out 10% of the starting value, then add it on."],
    declaredVariationSpace: 491 * GROWTH_CTX.length
  }),
  arithmeticTemplate({
    key: "y9l2.simpleDecayOneStep", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 90,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{ctx} of {base} decreases by 10% in one year. What is the new value after one year?"],
    explain: (v, r) => [`10% of ${v[0]! * 100} is ${v[0]! * 10}. ${v[0]! * 100} - ${v[0]! * 10} = ${r}.`],
    hints: () => ["Work out 10% of the starting value, then subtract it."],
    declaredVariationSpace: 491 * GROWTH_CTX.length
  }),
  arithmeticTemplate({
    key: "y9l2.compoundGrowthTwoYears", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 121,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{ctx} of {base} grows by 10% each year for 2 years. What is the value after 2 years?"],
    explain: (v, r) => [`After year 1: ${v[0]! * 100} + 10% = ${v[0]! * 110}. After year 2: ${v[0]! * 110} + 10% = ${r}.`],
    hints: () => ["Grow the value by 10% for the first year, then grow that new value by 10% again."],
    declaredVariationSpace: 491 * GROWTH_CTX.length
  }),
  arithmeticTemplate({
    key: "y9l2.compoundDecayTwoYears", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 81,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{ctx} of {base} decreases by 10% each year for 2 years. What is the value after 2 years?"],
    explain: (v, r) => [`After year 1: ${v[0]! * 100} - 10% = ${v[0]! * 90}. After year 2: ${v[0]! * 90} - 10% = ${r}.`],
    hints: () => ["Decrease the value by 10% for the first year, then decrease that new value by 10% again."],
    declaredVariationSpace: 491 * GROWTH_CTX.length
  }),
  categoricalPoolTemplate({
    key: "y9l2.mcGrowthDecay", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const option = rng.pick(PERCENT_OPTIONS);
      const k = rng.int(2, 100);
      const base = option.requiredMultiple * k;
      const isGrowth = rng.chance(0.5);
      const change = (base * option.percent) / 100;
      const result = isGrowth ? base + change : base - change;
      const distractors = numericDistractors(rng, result, 3, Math.max(2, Math.round(result * 0.1))).map(String);
      return {
        prompt: `A value of ${base} ${isGrowth ? "grows" : "decreases"} by ${option.percent}%. What is the new value?`,
        correctLabel: String(result),
        distractorLabels: distractors,
        explanationSteps: [`${option.percent}% of ${base} is ${change}. ${base} ${isGrowth ? "+" : "-"} ${change} = ${result}.`],
        hints: ["Work out the percentage change first, then add it on (growth) or take it away (decay)."]
      };
    },
    declaredVariationSpace: 4 * 99 * 2
  }),
  categoricalPoolTemplate({
    key: "y9l2.tfGrowthDecayCheck", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "REASONING",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const option = rng.pick(PERCENT_OPTIONS);
      const k = rng.int(2, 100);
      const base = option.requiredMultiple * k;
      const isGrowth = rng.chance(0.5);
      const change = (base * option.percent) / 100;
      const result = isGrowth ? base + change : base - change;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? result : numericDistractors(rng, result, 1, Math.max(2, Math.round(result * 0.1)))[0] ?? result + 1;
      return {
        prompt: `A value of ${base} ${isGrowth ? "grows" : "decreases"} by ${option.percent}%, giving a new value of ${shown}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${option.percent}% of ${base} is ${change}, so the new value is ${result}.`],
        hints: ["Work out the percentage change and check it against the statement."]
      };
    },
    declaredVariationSpace: 4 * 99 * 2 * 2
  }),
  arithmeticTemplate({
    key: "y9l2.wordProblemGrowthDecay", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "REASONING",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 75,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{ctx} of {base} falls by 25% in one year due to a downturn. What is the new value?"],
    explain: (v, r) => [`25% of ${v[0]! * 100} is ${v[0]! * 25}. ${v[0]! * 100} - ${v[0]! * 25} = ${r}.`],
    hints: () => ["Work out 25% of the starting value, then subtract it."],
    declaredVariationSpace: 491 * GROWTH_CTX.length
  })
];

export default level;
