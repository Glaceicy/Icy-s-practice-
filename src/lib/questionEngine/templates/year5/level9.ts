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
const DAY_EN_TO_FR: Record<string, string> = {
  Monday: "lundi", Tuesday: "mardi", Wednesday: "mercredi", Thursday: "jeudi", Friday: "vendredi"
};
const ORDINAL_EN_TO_FR: Record<string, string> = { "1st": "1er", "2nd": "2e", "3rd": "3e", "4th": "4e" };
const BOOL_EN_TO_FR: Record<string, string> = { True: "Vrai", False: "Faux" };
function translateGraphSeries(visualAid: { kind: string; data: Record<string, unknown> } | undefined) {
  const series = (visualAid?.data as { series?: Array<{ label: string; value: number }> } | undefined)?.series ?? [];
  return series.map((s) => ({ ...s, label: DAY_EN_TO_FR[s.label] ?? s.label }));
}
function translateDurationLabel(label: string): string {
  return label.replace(/hour\(s\)/g, "heure(s)");
}

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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/on (\w+)\?$/);
        const dayFr = m ? (DAY_EN_TO_FR[m[1]!] ?? m[1]) : "";
        return {
          prompt: `Le graphique montre le nombre de livres empruntés chaque jour. Combien de livres ont été empruntés le ${dayFr} ?`,
          explanationSteps: [`En lisant le graphique au ${dayFr}, on voit ${drawn.correctLabel} livres.`],
          hints: ["Trouve le jour sur le graphique et lis la valeur à ce point."],
          visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
        };
      }
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
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/on (\w+) and on (\w+)\?$/);
        const day1Fr = pm ? (DAY_EN_TO_FR[pm[1]!] ?? pm[1]) : "";
        const day2Fr = pm ? (DAY_EN_TO_FR[pm[2]!] ?? pm[2]) : "";
        const em = drawn.explanationSteps[0]?.match(/^\w+: (\d+)\. \w+: (\d+)\. Difference: (\d+)\.$/);
        const v1 = em ? em[1] : "";
        const v2 = em ? em[2] : "";
        const diff = em ? em[3] : "";
        return {
          prompt: `Le graphique montre le nombre de livres empruntés chaque jour. Quelle est la différence entre le nombre de livres empruntés le ${day1Fr} et le ${day2Fr} ?`,
          explanationSteps: [`${day1Fr} : ${v1}. ${day2Fr} : ${v2}. Différence : ${diff}.`],
          hints: ["Soustrais la plus petite valeur de la plus grande."],
          visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
        };
      }
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
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/for (\w+) and (\w+) combined\?$/);
        const day1Fr = pm ? (DAY_EN_TO_FR[pm[1]!] ?? pm[1]) : "";
        const day2Fr = pm ? (DAY_EN_TO_FR[pm[2]!] ?? pm[2]) : "";
        const em = drawn.explanationSteps[0]?.match(/^\w+: (\d+)\. \w+: (\d+)\. \d+ \+ \d+ = (\d+)\.$/);
        const v1 = em ? em[1] : "";
        const v2 = em ? em[2] : "";
        const sum = em ? em[3] : "";
        return {
          prompt: `Le graphique montre le nombre de livres empruntés chaque jour. Quel est le total pour ${day1Fr} et ${day2Fr} combinés ?`,
          explanationSteps: [`${day1Fr} : ${v1}. ${day2Fr} : ${v2}. ${v1} + ${v2} = ${sum}.`],
          hints: ["Additionne les deux valeurs."],
          visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
        };
      }
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
    fr: {
      translate: (drawn) => {
        const correctFr = DAY_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel;
        const distractorsFr = drawn.distractorLabels.map((d) => DAY_EN_TO_FR[d] ?? d);
        const em = drawn.explanationSteps[0]?.match(/had the highest value: (\d+)\.$/);
        const value = em ? em[1] : "";
        return {
          prompt: "Le graphique montre le nombre de livres empruntés chaque jour. Quel jour a-t-on emprunté le plus de livres ?",
          correctLabel: correctFr,
          distractorLabels: distractorsFr,
          explanationSteps: [`${correctFr} a eu la valeur la plus élevée : ${value}.`],
          hints: ["Trouve le point le plus haut sur le graphique."],
          visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
        };
      }
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
    fr: {
      translate: (drawn) => {
        const correctFr = DAY_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel;
        const distractorsFr = drawn.distractorLabels.map((d) => DAY_EN_TO_FR[d] ?? d);
        const em = drawn.explanationSteps[0]?.match(/had the lowest value: (\d+)\.$/);
        const value = em ? em[1] : "";
        return {
          prompt: "Le graphique montre le nombre de livres empruntés chaque jour. Quel jour a-t-on emprunté le moins de livres ?",
          correctLabel: correctFr,
          distractorLabels: distractorsFr,
          explanationSteps: [`${correctFr} a eu la valeur la plus basse : ${value}.`],
          hints: ["Trouve le point le plus bas sur le graphique."],
          visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
        };
      }
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
    fr: {
      translate: (drawn) => {
        const em = drawn.explanationSteps[0]?.match(/^Highest: (\d+)\. Lowest: (\d+)\. Difference: (\d+)\.$/);
        const hi = em ? em[1] : "";
        const lo = em ? em[2] : "";
        const diff = em ? em[3] : "";
        return {
          prompt: "Le graphique montre le nombre de livres empruntés chaque jour. Quelle est la différence entre la valeur la plus élevée et la plus basse ?",
          explanationSteps: [`Le plus élevé : ${hi}. Le plus bas : ${lo}. Différence : ${diff}.`],
          hints: ["Soustrais la valeur la plus basse de la valeur la plus élevée."],
          visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
        };
      }
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
    fr: {
      translate: (drawn) => ({
        prompt: "Le graphique montre le nombre de livres empruntés chaque jour, du lundi au vendredi. Combien de livres ont été empruntés au total sur la semaine ?",
        hints: ["Additionne les valeurs des cinq jours."],
        visualAid: visuals.graph("line", translateGraphSeries(drawn.visualAid))
      })
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A café's sales table shows: Monday (\d+), Tuesday (\d+), Wednesday (\d+)\. How many were sold on (\w+)\?$/);
        const v0 = m ? m[1] : "";
        const v1 = m ? m[2] : "";
        const v2 = m ? m[3] : "";
        const dayFr = m ? (DAY_EN_TO_FR[m[4]!] ?? m[4]) : "";
        return {
          prompt: `Le tableau des ventes d'un café indique : lundi ${v0}, mardi ${v1}, mercredi ${v2}. Combien ont été vendus le ${dayFr} ?`,
          explanationSteps: [`Le tableau indique ${drawn.correctLabel} pour le ${dayFr}.`],
          hints: ["Trouve le jour correspondant dans le tableau et lis sa valeur."]
        };
      }
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
    declaredVariationSpace: 55 * 55,
    fr: {
      promptTemplates: ["Un tableau indique les articles vendus : lundi {mon}, mardi {tue}. Quel est le total combiné pour les deux jours ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${r}.`],
      hints: () => ["Additionne les deux valeurs du tableau."]
    }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A table shows items sold: Monday (\d+), Tuesday (\d+)\./);
        const a = m ? Number(m[1]) : 0;
        const b = m ? Number(m[2]) : 0;
        return {
          prompt: `Un tableau indique les articles vendus : lundi ${a}, mardi ${b}. Combien de plus ont été vendus le jour le plus chargé ?`,
          explanationSteps: [`La différence entre ${Math.max(a, b)} et ${Math.min(a, b)} est ${drawn.correctLabel}.`],
          hints: ["Soustrais la plus petite valeur de la plus grande."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A bus timetable shows departures at (.+)\. What time is the (\w+) departure\?$/);
        const times = m ? m[1] : "";
        const ordinalFr = m ? (ORDINAL_EN_TO_FR[m[2]!] ?? m[2]) : "";
        return {
          prompt: `Un horaire de bus indique des départs à ${times}. À quelle heure est le ${ordinalFr} départ ?`,
          explanationSteps: [`Le ${ordinalFr} départ indiqué est ${drawn.correctLabel}.`],
          hints: ["Compte dans la liste des horaires de départ pour trouver celui demandé."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A bus timetable shows departures at (.+)\. You arrive at the stop at (\d{2}:\d{2})\. What time is the next bus\?$/);
        const times = m ? m[1] : "";
        const arrival = m ? m[2] : "";
        return {
          prompt: `Un horaire de bus indique des départs à ${times}. Tu arrives à l'arrêt à ${arrival}. À quelle heure est le prochain bus ?`,
          explanationSteps: [`Le prochain départ après ${arrival} est ${drawn.correctLabel}.`],
          hints: ["Trouve le premier horaire de départ qui est après ton heure d'arrivée."]
        };
      }
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
    declaredVariationSpace: 36 * 36 * 36,
    fr: {
      promptTemplates: ["Un tableau de recyclage indique : Verre {glass} kg, Plastique {plastic} kg, Papier ___ kg. Le total des trois est {total} kg. Quel est le poids du papier ?"],
      explain: (v, r) => [`${v[0]! + v[1]! + r} - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Soustrais les valeurs connues du total pour trouver celle qui manque."]
    }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A sales table shows: Monday (\d+), Tuesday (\d+), Wednesday (\d+)\./);
        const v0 = m ? m[1] : "";
        const v1 = m ? m[2] : "";
        const v2 = m ? m[3] : "";
        const correctFr = DAY_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel;
        const distractorsFr = drawn.distractorLabels.map((d) => DAY_EN_TO_FR[d] ?? d);
        const em = drawn.explanationSteps[0]?.match(/had the highest value: (\d+)\.$/);
        const value = em ? em[1] : "";
        return {
          prompt: `Un tableau des ventes indique : lundi ${v0}, mardi ${v1}, mercredi ${v2}. Quel jour a eu le plus de ventes ?`,
          correctLabel: correctFr,
          distractorLabels: distractorsFr,
          explanationSteps: [`${correctFr} a eu la valeur la plus élevée : ${value}.`],
          hints: ["Compare les trois valeurs et trouve la plus grande."]
        };
      }
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
    declaredVariationSpace: 1200 * 170,
    fr: {
      promptTemplates: ["Un trajet commence à {start} et se termine à {end} (les deux en horloge 24 heures, le même jour). Combien de minutes a duré le trajet ?"],
      explain: (v, r) => [`De ${fmtTime(v[0]!)} à ${fmtTime(v[0]! + r)}, cela fait ${r} minutes.`],
      hints: () => ["Compte les minutes entre l'heure de départ et l'heure d'arrivée."]
    }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A train timetable shows arrival times: (.+)\. What time does the train reach (.+)\?$/);
        const times = m ? m[1] : "";
        const station = m ? m[2] : "";
        return {
          prompt: `Un horaire de train indique les heures d'arrivée : ${times}. À quelle heure le train arrive-t-il à ${station} ?`,
          explanationSteps: [`L'horaire indique ${drawn.correctLabel} pour ${station}.`],
          hints: ["Trouve le nom de la gare dans l'horaire et lis son heure."]
        };
      }
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
    declaredVariationSpace: 1439 * 170,
    fr: {
      promptTemplates: ["Un train part à {dep} (horloge 24 heures). Le trajet dure {dur} minutes. À quelle heure arrive-t-il ?"],
      explain: (v, r) => [`${fmtTime(v[0]!)} + ${v[1]} minutes = ${fmtTime((v[0]! + v[1]!) % 1440)}.`],
      hints: () => ["Ajoute la durée du trajet (en minutes) à l'heure de départ."]
    }
  }),
  arithmeticTemplate({
    key: "y5l9.subtractDurationFromTime", levelKey: "Y5L9", objectiveCode: "Y5-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["CLOCK_HOUR_MINUTE_HAND_CONFUSION"], type: "WORD_PROBLEM",
    ranges: [[180, 1439], [10, 170]], compute: (v) => (v[0]! - v[1]! + 1440) % 1440,
    derive: (v) => ({ arr: fmtTime(v[0]!), dur: v[1]! }), formatValue: (n) => fmtTime(n),
    promptTemplates: ["A bus arrives at {arr} (24-hour clock). The journey took {dur} minutes. What time did it depart?"],
    explain: (v, r) => [`${fmtTime(v[0]!)} - ${v[1]} minutes = ${fmtTime((v[0]! - v[1]! + 1440) % 1440)}.`],
    hints: () => ["Subtract the journey time (in minutes) from the arrival time."],
    declaredVariationSpace: 1259 * 160,
    fr: {
      promptTemplates: ["Un bus arrive à {arr} (horloge 24 heures). Le trajet a duré {dur} minutes. À quelle heure est-il parti ?"],
      explain: (v, r) => [`${fmtTime(v[0]!)} - ${v[1]} minutes = ${fmtTime((v[0]! - v[1]! + 1440) % 1440)}.`],
      hints: () => ["Soustrais la durée du trajet (en minutes) de l'heure d'arrivée."]
    }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^How long is the journey from (\d{2}:\d{2}) to (\d{2}:\d{2})\?$/);
        const start = m ? m[1] : "";
        const end = m ? m[2] : "";
        const em = drawn.explanationSteps[0]?.match(/^(\d+) minutes = (\d+) hour\(s\) and (\d+) minute\(s\)\.$/);
        const dur = em ? em[1] : "";
        const h = em ? em[2] : "";
        const min = em ? em[3] : "";
        return {
          prompt: `Combien de temps dure le trajet de ${start} à ${end} ?`,
          explanationSteps: [`${dur} minutes = ${h} heure(s) et ${min} minute(s).`],
          hints: ["Calcule d'abord le total en minutes, puis convertis en heures et minutes."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A journey from (\d{2}:\d{2}) to (\d{2}:\d{2}) takes (\d+) minutes\.$/);
        const start = m ? m[1] : "";
        const end = m ? m[2] : "";
        const shown = m ? m[3] : "";
        const em = drawn.explanationSteps[0]?.match(/is actually (\d+) minutes\.$/);
        const dur = em ? em[1] : "";
        return {
          prompt: `Un trajet de ${start} à ${end} dure ${shown} minutes.`,
          correctLabel: BOOL_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => BOOL_EN_TO_FR[d] ?? d),
          explanationSteps: [`De ${start} à ${end}, cela fait en réalité ${dur} minutes.`],
          hints: ["Compte les minutes entre les deux heures pour vérifier."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A coach departs at (\d{2}:\d{2}) and arrives at (\d{2}:\d{2}) \(both 24-hour clock times\)\. How long is the journey\?$/);
        const dep = m ? m[1] : "";
        const arr = m ? m[2] : "";
        const em = drawn.explanationSteps[0]?.match(/is (\d+) minutes, which is/);
        const dur = em ? em[1] : "";
        const correctFr = translateDurationLabel(drawn.correctLabel);
        const distractorsFr = drawn.distractorLabels.map(translateDurationLabel);
        return {
          prompt: `Un car part à ${dep} et arrive à ${arr} (les deux en horloge 24 heures). Combien de temps dure le trajet ?`,
          correctLabel: correctFr,
          distractorLabels: distractorsFr,
          explanationSteps: [`${dep} à ${arr} fait ${dur} minutes, soit ${correctFr}.`],
          hints: ["Calcule d'abord le nombre total de minutes, puis convertis en heures et minutes si besoin."]
        };
      }
    },
    declaredVariationSpace: 840 * 151
  })
];

export default level;
