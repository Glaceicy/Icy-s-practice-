import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 9 — "Statistics, line graphs and timetables"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L9-1 comparison/sum/difference from a
// line graph, Y5-L9-2 reading tables and timetables, Y5-L9-3 durations on a
// 24-hour clock).
//
// Times are represented internally as total minutes since midnight
// (0-1439, wrapping at 1440) and only converted to an "HH:MM" string at
// final display, avoiding any risk of a malformed time string.
function fmtTime(totalMinutes: number): string {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function distinctValues(rng: { int: (lo: number, hi: number) => number }, count: number, lo: number, hi: number): number[] {
  const set = new Set<number>();
  let guard = 0;
  while (set.size < count && guard < 500) {
    set.add(rng.int(lo, hi));
    guard++;
  }
  // Guaranteed-terminating fallback: if the range was too small to find
  // enough distinct values by chance, fill the rest deterministically.
  let extra = hi + 1;
  while (set.size < count) {
    set.add(extra);
    extra++;
  }
  return Array.from(set);
}

export const level: QuestionTemplateDef[] = [
  // --- Y5-L9-1: comparison, sum and difference problems from a line graph ---
  categoricalPoolTemplate({
    key: "y5l9.lineGraphReadValue", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      const idx = rng.int(0, 4);
      const correct = String(values[idx]);
      const distractors = values.filter((_, i) => i !== idx).map(String).slice(0, 3);
      return {
        prompt: `The graph shows the number of books borrowed each day. How many were borrowed on ${DAYS[idx]}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Reading the graph at ${DAYS[idx]} shows ${correct} books.`],
        hints: ["Find the day on the graph and read the value at that point."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  categoricalPoolTemplate({
    key: "y5l9.lineGraphDifference", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      let i1 = rng.int(0, 4);
      let i2 = rng.int(0, 4);
      while (i2 === i1) i2 = rng.int(0, 4);
      const diff = Math.abs(values[i1]! - values[i2]!);
      const correct = String(diff);
      const distractors = [String(values[i1]! + values[i2]!), String(diff + 1), String(Math.max(1, diff - 1))];
      return {
        prompt: `The graph shows the number of books borrowed each day. What is the difference between the number of books borrowed on ${DAYS[i1]} and on ${DAYS[i2]}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${DAYS[i1]}: ${values[i1]}. ${DAYS[i2]}: ${values[i2]}. Difference: ${diff}.`],
        hints: ["Subtract the smaller value from the larger value."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  categoricalPoolTemplate({
    key: "y5l9.lineGraphSum", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      let i1 = rng.int(0, 4);
      let i2 = rng.int(0, 4);
      while (i2 === i1) i2 = rng.int(0, 4);
      const sum = values[i1]! + values[i2]!;
      const correct = String(sum);
      const distractors = [String(Math.abs(values[i1]! - values[i2]!)), String(sum + 2), String(sum - 2)];
      return {
        prompt: `The graph shows the number of books borrowed each day. What is the total for ${DAYS[i1]} and ${DAYS[i2]} combined?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${DAYS[i1]}: ${values[i1]}. ${DAYS[i2]}: ${values[i2]}. ${values[i1]} + ${values[i2]} = ${sum}.`],
        hints: ["Add the two values together."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  categoricalPoolTemplate({
    key: "y5l9.lineGraphCompareHighest", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      const maxIdx = values.indexOf(Math.max(...values));
      const correct = DAYS[maxIdx]!;
      const distractors = DAYS.filter((_, i) => i !== maxIdx);
      return {
        prompt: "The graph shows the number of books borrowed each day. On which day were the most books borrowed?",
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${correct} had the highest value: ${values[maxIdx]}.`],
        hints: ["Find the highest point on the graph."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  categoricalPoolTemplate({
    key: "y5l9.lineGraphCompareLowest", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      const minIdx = values.indexOf(Math.min(...values));
      const correct = DAYS[minIdx]!;
      const distractors = DAYS.filter((_, i) => i !== minIdx);
      return {
        prompt: "The graph shows the number of books borrowed each day. On which day were the fewest books borrowed?",
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${correct} had the lowest value: ${values[minIdx]}.`],
        hints: ["Find the lowest point on the graph."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  categoricalPoolTemplate({
    key: "y5l9.lineGraphRange", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      const range = Math.max(...values) - Math.min(...values);
      const correct = String(range);
      const distractors = [String(range + 1), String(Math.max(1, range - 1)), String(Math.max(...values))];
      return {
        prompt: "The graph shows the number of books borrowed each day. What is the difference between the highest and lowest values shown?",
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`Highest: ${Math.max(...values)}. Lowest: ${Math.min(...values)}. Difference: ${range}.`],
        hints: ["Subtract the lowest value from the highest value."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),
  categoricalPoolTemplate({
    key: "y5l9.wordProblemLineGraphTotal", levelKey: "Y5L9", objectiveCode: "Y5-L9-1", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 5, 5, 50);
      const series = DAYS.map((d, i) => ({ label: d, value: values[i]! }));
      const total = values.reduce((s, v) => s + v, 0);
      const correct = String(total);
      const distractors = [String(total + 5), String(total - 5), String(Math.max(...values) * 5)];
      return {
        prompt: "The graph shows the number of books borrowed each day, Monday to Friday. How many books were borrowed in total across the week?",
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${values.join(" + ")} = ${total}.`],
        hints: ["Add up the values for all five days."],
        visualAid: visuals.graph("line", series)
      };
    },
    declaredVariationSpace: 5000
  }),

  // --- Y5-L9-2: complete, read and interpret tables and timetables ---
  categoricalPoolTemplate({
    key: "y5l9.tableReadValue", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 3, 5, 60);
      const idx = rng.int(0, 2);
      const correct = String(values[idx]);
      const distractors = values.filter((_, i) => i !== idx).map(String);
      return {
        prompt: `A café's sales table shows: Monday ${values[0]}, Tuesday ${values[1]}, Wednesday ${values[2]}. How many were sold on ${["Monday", "Tuesday", "Wednesday"][idx]}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The table shows ${correct} for ${["Monday", "Tuesday", "Wednesday"][idx]}.`],
        hints: ["Find the matching day in the table and read its value."]
      };
    },
    declaredVariationSpace: 5000
  }),
  arithmeticTemplate({
    key: "y5l9.tableSumTwoEntries", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[5, 60], [5, 60]], compute: (v) => v[0]! + v[1]!,
    derive: (v) => ({ mon: v[0]!, tue: v[1]! }),
    promptTemplates: ["A table shows items sold: Monday {mon}, Tuesday {tue}. What is the combined total for both days?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
    hints: () => ["Add the two table entries together."],
    declaredVariationSpace: 55 * 55
  }),
  categoricalPoolTemplate({
    key: "y5l9.tableDifference", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(5, 60);
      let b = rng.int(5, 60);
      while (b === a) b = rng.int(5, 60);
      const diff = Math.abs(a - b);
      const correct = String(diff);
      const distractors = [String(a + b), String(diff + 2), String(Math.max(1, diff - 2))];
      return {
        prompt: `A table shows items sold: Monday ${a}, Tuesday ${b}. How many more were sold on the busier day?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The difference between ${Math.max(a, b)} and ${Math.min(a, b)} is ${diff}.`],
        hints: ["Subtract the smaller value from the larger value."]
      };
    },
    declaredVariationSpace: 3025
  }),
  categoricalPoolTemplate({
    key: "y5l9.timetableReadDeparture", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const start = rng.int(6 * 60, 20 * 60);
      const gap = rng.int(15, 45);
      const times = [start, start + gap, start + gap * 2, start + gap * 3].map(fmtTime);
      const idx = rng.int(0, 3);
      const correct = times[idx]!;
      const distractors = times.filter((_, i) => i !== idx);
      return {
        prompt: `A bus timetable shows departures at ${times.join(", ")}. What time is the ${["1st", "2nd", "3rd", "4th"][idx]} departure?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The ${["1st", "2nd", "3rd", "4th"][idx]} departure listed is ${correct}.`],
        hints: ["Count along the list of departure times to find the one asked for."]
      };
    },
    declaredVariationSpace: 850 * 31
  }),
  categoricalPoolTemplate({
    key: "y5l9.timetableFindNextDeparture", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const start = rng.int(6 * 60, 18 * 60);
      const gap = rng.int(15, 45);
      const stops = [start, start + gap, start + gap * 2, start + gap * 3];
      const times = stops.map(fmtTime);
      const arriveIdx = rng.int(0, 2);
      const arrival = stops[arriveIdx]! + rng.int(1, gap - 1);
      const correct = times[arriveIdx + 1]!;
      const distractors = times.filter((t) => t !== correct).slice(0, 3);
      return {
        prompt: `A bus timetable shows departures at ${times.join(", ")}. You arrive at the stop at ${fmtTime(arrival)}. What time is the next bus?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The next departure after ${fmtTime(arrival)} is ${correct}.`],
        hints: ["Find the first departure time that is later than your arrival time."]
      };
    },
    declaredVariationSpace: 750 * 31 * 3
  }),
  arithmeticTemplate({
    key: "y5l9.tableMissingEntry", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MISSING_NUMBER",
    ranges: [[5, 40], [5, 40], [5, 40]], compute: (v) => v[2]!,
    derive: (v, r) => ({ glass: v[0]!, plastic: v[1]!, total: v[0]! + v[1]! + r }),
    promptTemplates: ["A recycling table shows: Glass {glass} kg, Plastic {plastic} kg, Paper ___ kg. The total for all three is {total} kg. What is the paper weight?"],
    explain: (v, r) => [`${v[0]! + v[1]! + r} - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the known entries from the total to find the missing one."],
    declaredVariationSpace: 36 * 36 * 36
  }),
  categoricalPoolTemplate({
    key: "y5l9.wordProblemTableComparison", levelKey: "Y5L9", objectiveCode: "Y5-L9-2", difficulty: "REASONING",
    misconceptionTags: ["MEASURE_COMPARISON_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const values = distinctValues(rng, 3, 5, 60);
      const maxIdx = values.indexOf(Math.max(...values));
      const days = ["Monday", "Tuesday", "Wednesday"];
      const correct = days[maxIdx]!;
      const distractors = days.filter((_, i) => i !== maxIdx);
      return {
        prompt: `A sales table shows: Monday ${values[0]}, Tuesday ${values[1]}, Wednesday ${values[2]}. Which day had the most sales?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${correct} had the highest value: ${values[maxIdx]}.`],
        hints: ["Compare all three values and find the biggest one."]
      };
    },
    declaredVariationSpace: 5000
  }),

  // --- Y5-L9-3: calculate durations using 24-hour clock timetables ---
  arithmeticTemplate({
    key: "y5l9.durationBetweenTimes", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[0, 1200], [10, 180]], compute: (v) => v[1]!,
    derive: (v, r) => ({ start: fmtTime(v[0]!), end: fmtTime(v[0]! + r) }),
    promptTemplates: ["A journey starts at {start} and ends at {end} (both 24-hour clock times, same day). How many minutes did the journey take?"],
    explain: (v, r) => [`From ${fmtTime(v[0]!)} to ${fmtTime(v[0]! + r)} is ${r} minutes.`],
    hints: () => ["Count the minutes from the start time to the end time."],
    declaredVariationSpace: 1200 * 170
  }),
  categoricalPoolTemplate({
    key: "y5l9.mcReadTimeFromTimetable", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const start = rng.int(5 * 60, 21 * 60);
      const gap = rng.int(20, 50);
      const stations = ["Ashville", "Bridgeton", "Carlisle Halt", "Denwick"];
      const times = [start, start + gap, start + gap * 2, start + gap * 3].map(fmtTime);
      const idx = rng.int(0, 3);
      const correct = times[idx]!;
      const distractors = times.filter((_, i) => i !== idx);
      return {
        prompt: `A train timetable shows arrival times: ${stations.map((s, i) => `${s} ${times[i]}`).join(", ")}. What time does the train reach ${stations[idx]}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`The timetable shows ${correct} for ${stations[idx]}.`],
        hints: ["Find the station name in the timetable and read its time."]
      };
    },
    declaredVariationSpace: 950 * 31
  }),
  arithmeticTemplate({
    key: "y5l9.addDurationToTime", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[0, 1439], [10, 180]], compute: (v) => (v[0]! + v[1]!) % 1440,
    derive: (v) => ({ dep: fmtTime(v[0]!), dur: v[1]! }), formatValue: (n) => fmtTime(n),
    promptTemplates: ["A train departs at {dep} (24-hour clock). The journey takes {dur} minutes. What time does it arrive?"],
    explain: (v, r) => [`${fmtTime(v[0]!)} + ${v[1]} minutes = ${fmtTime((v[0]! + v[1]!) % 1440)}.`],
    hints: () => ["Add the journey time (in minutes) to the departure time."],
    declaredVariationSpace: 1439 * 170
  }),
  arithmeticTemplate({
    key: "y5l9.subtractDurationFromTime", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[180, 1439], [10, 170]], compute: (v) => (v[0]! - v[1]! + 1440) % 1440,
    derive: (v) => ({ arr: fmtTime(v[0]!), dur: v[1]! }), formatValue: (n) => fmtTime(n),
    promptTemplates: ["A bus arrives at {arr} (24-hour clock). The journey took {dur} minutes. What time did it depart?"],
    explain: (v, r) => [`${fmtTime(v[0]!)} - ${v[1]} minutes = ${fmtTime((v[0]! - v[1]! + 1440) % 1440)}.`],
    hints: () => ["Subtract the journey time (in minutes) from the arrival time."],
    declaredVariationSpace: 1259 * 160
  }),
  categoricalPoolTemplate({
    key: "y5l9.durationHoursMinutes", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "REASONING",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const start = rng.int(0, 1200);
      const dur = rng.int(65, 240);
      const end = start + dur;
      const h = Math.floor(dur / 60);
      const m = dur % 60;
      const correct = `${h}h ${m}m`;
      const distractors = [`${m}h ${h}m`, `${h}h ${m + 1}m`, `${h - 1 >= 0 ? h - 1 : h + 1}h ${m}m`];
      return {
        prompt: `How long is the journey from ${fmtTime(start)} to ${fmtTime(end)}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${dur} minutes = ${h} hour(s) and ${m} minute(s).`],
        hints: ["Work out the total minutes first, then convert to hours and minutes."]
      };
    },
    declaredVariationSpace: 1200 * 175
  }),
  categoricalPoolTemplate({
    key: "y5l9.tfDurationCheck", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "REASONING",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const start = rng.int(0, 1300);
      const dur = rng.int(10, 130);
      const end = start + dur;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? dur : dur + rng.int(5, 20);
      return {
        prompt: `A journey from ${fmtTime(start)} to ${fmtTime(end)} takes ${shown} minutes.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`From ${fmtTime(start)} to ${fmtTime(end)} is actually ${dur} minutes.`],
        hints: ["Count the minutes between the two times to check."]
      };
    },
    declaredVariationSpace: 1300 * 120 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l9.wordProblemTimetableJourney", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "REASONING",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const dep = rng.int(6 * 60, 20 * 60);
      const dur = rng.int(30, 180);
      const arr = dep + dur;
      const h = Math.floor(dur / 60);
      const m = dur % 60;
      const correct = m === 0 ? `${h} hour(s)` : `${h} hour(s) ${m} minutes`;
      const distractors = [
        m === 0 ? `${h + 1} hour(s)` : `${h} hour(s) ${m + 5} minutes`,
        `${Math.floor(dur / 2)} minutes`,
        `${dur + 10} minutes`
      ];
      return {
        prompt: `A coach departs at ${fmtTime(dep)} and arrives at ${fmtTime(arr)} (both 24-hour clock times). How long is the journey?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`${fmtTime(dep)} to ${fmtTime(arr)} is ${dur} minutes, which is ${correct}.`],
        hints: ["Work out the total number of minutes, then convert to hours and minutes if needed."]
      };
    },
    declaredVariationSpace: 840 * 151
  })
];

export default level;
