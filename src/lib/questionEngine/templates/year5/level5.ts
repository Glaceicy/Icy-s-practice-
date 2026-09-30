import { categoricalPoolTemplate, arithmeticTemplate, orderingTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 5, Level 5 — "Fractions and mixed numbers"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y5-L5-1 compare/order fractions with
// related denominators, Y5-L5-2 add/subtract same-denominator fractions
// including mixed numbers, Y5-L5-3 multiply fractions/mixed numbers by a
// whole number).
//
// Fraction ANSWERS are always offered as multiple-choice (never typed
// free-text), so the grader never needs fraction-equivalence logic — a
// child just taps the matching label. Distractors are built from specific,
// named misconceptions via direct formulas (never rejection-sampling a
// possibly-too-small candidate pool), so generation can never spin: see
// Y5L4's mcFactorOf/mcMultipleOf fix for why that matters.
function frac(n: number, d: number): string {
  return `${n}/${d}`;
}

/** Pads a candidate list to exactly 3 distinct labels (excluding `correct`),
 * guaranteed to terminate: each padding step appends a strictly-growing
 * numerator, so it can never repeat and never loops indefinitely. */
function padDistractors(candidates: string[], correct: string, denom: number): string[] {
  const uniq = Array.from(new Set(candidates)).filter((c) => c !== correct);
  let pad = denom * 3 + 1;
  while (uniq.length < 3) {
    const label = frac(pad, denom);
    if (label !== correct && !uniq.includes(label)) uniq.push(label);
    pad++;
  }
  return uniq.slice(0, 3);
}

export const level: QuestionTemplateDef[] = [
  // --- Y5-L5-1: compare and order fractions with related denominators ---
  categoricalPoolTemplate({
    key: "y5l5.mcCompareSameDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(4, 12);
      const n1 = rng.int(1, d - 1);
      let n2 = rng.int(1, d - 1);
      while (n2 === n1) n2 = rng.int(1, d - 1);
      const bigger = Math.max(n1, n2);
      const smaller = Math.min(n1, n2);
      return {
        prompt: `Which is bigger, ${frac(n1, d)} or ${frac(n2, d)}?`,
        correctLabel: frac(bigger, d),
        distractorLabels: [frac(smaller, d)],
        explanationSteps: [`With the same denominator, the fraction with the bigger numerator is bigger: ${frac(bigger, d)} > ${frac(smaller, d)}.`],
        hints: ["When the denominators match, just compare the numerators."],
        visualAid: visuals.fractionDiagram(bigger, d)
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which is bigger, (\d+\/\d+) or (\d+\/\d+)\?/);
        const [label1, label2] = m ? m.slice(1) : ["", ""];
        return {
          prompt: `Lequel est le plus grand, ${label1} ou ${label2} ?`,
          explanationSteps: [`Avec le même dénominateur, la fraction avec le plus grand numérateur est la plus grande : ${drawn.correctLabel} > ${drawn.distractorLabels[0]}.`],
          hints: ["Quand les dénominateurs sont identiques, compare simplement les numérateurs."]
        };
      }
    },
    declaredVariationSpace: 9 * 11 * 10
  }),
  categoricalPoolTemplate({
    key: "y5l5.mcCompareRelatedDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d1 = rng.int(2, 6);
      const k = rng.int(2, 4);
      const d2 = d1 * k;
      const n1 = rng.int(1, d1 - 1);
      const converted1 = n1 * k;
      let n2 = rng.int(1, d2 - 1);
      if (n2 === converted1) n2 = n2 === d2 - 1 ? n2 - 1 : n2 + 1;
      const label1 = frac(n1, d1);
      const label2 = frac(n2, d2);
      const correct = converted1 > n2 ? label1 : label2;
      const other = correct === label1 ? label2 : label1;
      return {
        prompt: `Which is bigger, ${label1} or ${label2}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`Convert to the same denominator: ${label1} = ${frac(converted1, d2)}. Comparing ${frac(converted1, d2)} and ${label2} shows ${correct} is bigger.`],
        hints: [`Rewrite both fractions with denominator ${d2} before comparing.`],
      };
    },
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/^Which is bigger, (\d+\/\d+) or (\d+\/\d+)\?/);
        const [pLabel1, pLabel2] = pm ? pm.slice(1) : ["", ""];
        const em = drawn.explanationSteps[0]!.match(/^Convert to the same denominator: (\d+\/\d+) = (\d+\/\d+)\. Comparing \2 and (\d+\/\d+) shows (\d+\/\d+) is bigger\./);
        const [eLabel1, convertedLabel, eLabel2, correct] = em ? em.slice(1) : ["", "", "", ""];
        const d2 = (convertedLabel ?? "").split("/")[1];
        return {
          prompt: `Lequel est le plus grand, ${pLabel1} ou ${pLabel2} ?`,
          explanationSteps: [`Convertis au même dénominateur : ${eLabel1} = ${convertedLabel}. En comparant ${convertedLabel} et ${eLabel2}, on voit que ${correct} est plus grand.`],
          hints: [`Réécris les deux fractions avec un dénominateur de ${d2} avant de comparer.`]
        };
      }
    },
    declaredVariationSpace: 5 * 3 * 5 * 20
  }),
  categoricalPoolTemplate({
    key: "y5l5.tfCompareFractions", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(4, 12);
      const n1 = rng.int(1, d - 1);
      let n2 = rng.int(1, d - 1);
      while (n2 === n1) n2 = rng.int(1, d - 1);
      const truth = n1 > n2;
      return {
        prompt: `${frac(n1, d)} is greater than ${frac(n2, d)}.`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [truth ? `${n1} > ${n2}, so ${frac(n1, d)} is greater.` : `${n1} is not greater than ${n2}, so ${frac(n1, d)} is not greater.`],
        hints: ["When the denominators match, compare the numerators."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) is greater than (\d+)\/\2\./);
        const [n1, d, n2] = m ? m.slice(1) : ["", "", ""];
        const truth = drawn.correctLabel === "True";
        return {
          prompt: `${n1}/${d} est plus grand que ${n2}/${d}.`,
          correctLabel: truth ? "Vrai" : "Faux",
          distractorLabels: [truth ? "Faux" : "Vrai"],
          explanationSteps: [truth ? `${n1} > ${n2}, donc ${n1}/${d} est plus grand.` : `${n1} n'est pas plus grand que ${n2}, donc ${n1}/${d} n'est pas plus grand.`],
          hints: ["Quand les dénominateurs sont identiques, compare les numérateurs."]
        };
      }
    },
    declaredVariationSpace: 9 * 11 * 10
  }),
  orderingTemplate({
    key: "y5l5.orderFractionsSameDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], direction: "asc",
    generateItems: (rng) => {
      const d = rng.int(6, 12);
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, d - 1));
      return Array.from(nums).map((n) => ({ label: frac(n, d), sortValue: n }));
    },
    promptTemplates: ["Drag these fractions into order, smallest first."],
    explain: () => ["When the denominators match, order the fractions by their numerators."],
    hints: () => ["Which fraction has the smallest numerator?"],
    declaredVariationSpace: 7 * 400,
    fr: {
      promptTemplates: ["Fais glisser ces fractions dans l'ordre, de la plus petite à la plus grande."],
      explain: () => ["Quand les dénominateurs sont identiques, classe les fractions selon leurs numérateurs."],
      hints: () => ["Quelle fraction a le plus petit numérateur ?"]
    }
  }),
  categoricalPoolTemplate({
    key: "y5l5.mcEquivalentFraction", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(2, 8);
      const n = rng.int(1, d - 1);
      const k = rng.int(2, 6);
      const correct = frac(n * k, d * k);
      const distractors = [
        frac(n + k, d * k),
        frac(n * k, d + k),
        frac(n * (k + 1), d * k)
      ];
      return {
        prompt: `Which fraction is equivalent to ${frac(n, d)}, with a denominator of ${d * k}?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d * k),
        explanationSteps: [`Multiply the numerator and denominator by the same amount: ${n} x ${k} = ${n * k}, ${d} x ${k} = ${d * k}, giving ${correct}.`],
        hints: ["Multiply the numerator and denominator by the same number."],
        visualAid: visuals.fractionDiagram(n, d)
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which fraction is equivalent to (\d+)\/(\d+), with a denominator of (\d+)\?/);
        const [n, d, targetDenom] = m ? m.slice(1) : ["", "", ""];
        const k = Number(targetDenom) / Number(d);
        const nk = Number(n) * k;
        return {
          prompt: `Quelle fraction est équivalente à ${n}/${d}, avec un dénominateur de ${targetDenom} ?`,
          explanationSteps: [`Multiplie le numérateur et le dénominateur par le même nombre : ${n} x ${k} = ${nk}, ${d} x ${k} = ${targetDenom}, ce qui donne ${drawn.correctLabel}.`],
          hints: ["Multiplie le numérateur et le dénominateur par le même nombre."]
        };
      }
    },
    declaredVariationSpace: 7 * 7 * 5 * 300
  }),
  categoricalPoolTemplate({
    key: "y5l5.mcSimplifyFraction", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(2, 6);
      const n = rng.int(1, d - 1);
      const k = rng.int(2, 6);
      const correct = frac(n, d);
      const unsimplified = frac(n * k, d * k);
      const distractors = [
        frac(n, d * k),
        frac(n * k, d),
        frac(n + 1, d)
      ];
      return {
        prompt: `Simplify ${unsimplified} to its simplest form.`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Divide both the numerator and denominator by ${k}: ${n * k} ÷ ${k} = ${n}, ${d * k} ÷ ${k} = ${d}, giving ${correct}.`],
        hints: ["Divide the numerator and denominator by the same number until you can't any further."]
      };
    },
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/^Simplify (\d+\/\d+) to its simplest form\./);
        const unsimplifiedLabel = pm ? pm[1] : "";
        const em = drawn.explanationSteps[0]!.match(/^Divide both the numerator and denominator by (\d+): (\d+) ÷ \1 = (\d+), (\d+) ÷ \1 = (\d+), giving (\d+\/\d+)\./);
        const [k, nk, n, dk, d, correct] = em ? em.slice(1) : ["", "", "", "", "", ""];
        return {
          prompt: `Simplifie ${unsimplifiedLabel} sous sa forme la plus simple.`,
          explanationSteps: [`Divise le numérateur et le dénominateur par ${k} : ${nk} ÷ ${k} = ${n}, ${dk} ÷ ${k} = ${d}, ce qui donne ${correct}.`],
          hints: ["Divise le numérateur et le dénominateur par le même nombre jusqu'à ce que ce ne soit plus possible."]
        };
      }
    },
    declaredVariationSpace: 5 * 4 * 5 * 300
  }),
  arithmeticTemplate({
    key: "y5l5.missingDenominatorEquivalence", levelKey: "Y5L5", objectiveCode: "Y5-L5-1", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MISSING_NUMBER",
    ranges: [[2, 8], [1, 7], [2, 8]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ n2: v[1]! * v[2]! }),
    promptTemplates: ["{b}/{a} = {n2}/___. What is the missing denominator?"],
    explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}, and ${v[0]} x ${v[2]} = ${r}, so the missing denominator is ${r}.`],
    hints: () => ["Work out what the numerator was multiplied by, then multiply the denominator by the same amount."],
    declaredVariationSpace: 6 * 6 * 6,
    fr: {
      promptTemplates: ["{b}/{a} = {n2}/___. Quel est le dénominateur manquant ?"],
      explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}, et ${v[0]} x ${v[2]} = ${r}, donc le dénominateur manquant est ${r}.`],
      hints: () => ["Calcule par quoi le numérateur a été multiplié, puis multiplie le dénominateur par le même nombre."]
    }
  }),

  // --- Y5-L5-2: add and subtract fractions with the same denominator, including mixed numbers ---
  categoricalPoolTemplate({
    key: "y5l5.addFractionsSameDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(5, 12);
      const n1 = rng.int(1, d - 2);
      const n2 = rng.int(1, d - n1 - 1 > 0 ? d - n1 - 1 : 1);
      const correct = frac(n1 + n2, d);
      const distractors = [frac(n1 + n2, d * 2), frac(n1 * n2, d), frac(n1 + n2 + 1, d)];
      return {
        prompt: `${frac(n1, d)} + ${frac(n2, d)} = ?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Add the numerators and keep the denominator the same: ${n1} + ${n2} = ${n1 + n2}, giving ${correct}.`],
        hints: ["When the denominators match, just add the numerators."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) \+ (\d+)\/\2 = \?/);
        const [n1, d, n2] = m ? m.slice(1) : ["", "", ""];
        return {
          prompt: `${n1}/${d} + ${n2}/${d} = ?`,
          explanationSteps: [`Additionne les numérateurs et garde le même dénominateur : ${n1} + ${n2} = ${Number(n1) + Number(n2)}, ce qui donne ${drawn.correctLabel}.`],
          hints: ["Quand les dénominateurs sont identiques, additionne simplement les numérateurs."]
        };
      }
    },
    declaredVariationSpace: 8 * 10 * 10 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.addFractionsImproperResult", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(4, 10);
      const n1 = rng.int(2, d - 1);
      const n2 = rng.int(d - n1 + 1, d - 1);
      const correct = frac(n1 + n2, d);
      const distractors = [frac(n1 + n2, d * 2), frac(n1 * n2, d), frac(n1 + n2 - 1, d)];
      return {
        prompt: `${frac(n1, d)} + ${frac(n2, d)} = ? Give your answer as an improper fraction.`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Add the numerators: ${n1} + ${n2} = ${n1 + n2}. This is more than the denominator, so the answer is an improper fraction: ${correct}.`],
        hints: ["The numerator can be bigger than the denominator — that's fine, it's called an improper fraction."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) \+ (\d+)\/\2 = \? Give your answer as an improper fraction\./);
        const [n1, d, n2] = m ? m.slice(1) : ["", "", ""];
        return {
          prompt: `${n1}/${d} + ${n2}/${d} = ? Donne ta réponse sous forme de fraction impropre.`,
          explanationSteps: [`Additionne les numérateurs : ${n1} + ${n2} = ${Number(n1) + Number(n2)}. C'est plus que le dénominateur, donc la réponse est une fraction impropre : ${drawn.correctLabel}.`],
          hints: ["Le numérateur peut être plus grand que le dénominateur — c'est normal, cela s'appelle une fraction impropre."]
        };
      }
    },
    declaredVariationSpace: 6 * 9 * 9 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.subtractFractionsSameDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(5, 12);
      const n1 = rng.int(2, d - 1);
      const n2 = rng.int(1, n1 - 1);
      const correct = frac(n1 - n2, d);
      const distractors = [frac(n1 - n2, d * 2), frac(n2 - n1, d), frac(n1 - n2 + 1, d)];
      return {
        prompt: `${frac(n1, d)} - ${frac(n2, d)} = ?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Subtract the numerators and keep the denominator the same: ${n1} - ${n2} = ${n1 - n2}, giving ${correct}.`],
        hints: ["When the denominators match, just subtract the numerators."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) - (\d+)\/\2 = \?/);
        const [n1, d, n2] = m ? m.slice(1) : ["", "", ""];
        return {
          prompt: `${n1}/${d} - ${n2}/${d} = ?`,
          explanationSteps: [`Soustrais les numérateurs et garde le même dénominateur : ${n1} - ${n2} = ${Number(n1) - Number(n2)}, ce qui donne ${drawn.correctLabel}.`],
          hints: ["Quand les dénominateurs sont identiques, soustrais simplement les numérateurs."]
        };
      }
    },
    declaredVariationSpace: 8 * 10 * 10 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.addMixedNumbersSameDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(4, 10);
      const w1 = rng.int(1, 5);
      const w2 = rng.int(1, 5);
      const n1 = rng.int(1, d - 1);
      const n2 = rng.int(1, d - 1);
      const total = (w1 * d + n1) + (w2 * d + n2);
      const correct = frac(total, d);
      const distractors = [frac((w1 + w2) * d + n1 + n2 - d, d), frac(w1 * d + n1 + w2 * d + n2 + 1, d), frac(total, d * 2)];
      return {
        prompt: `${w1} ${frac(n1, d)} + ${w2} ${frac(n2, d)} = ? Give your answer as an improper fraction.`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Convert each mixed number to an improper fraction first: ${w1} ${frac(n1, d)} = ${frac(w1 * d + n1, d)}, ${w2} ${frac(n2, d)} = ${frac(w2 * d + n2, d)}.`, `Add them: ${w1 * d + n1} + ${w2 * d + n2} = ${total}, giving ${correct}.`],
        hints: ["Turn each mixed number into an improper fraction before adding."]
      };
    },
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/^(\d+) (\d+\/\d+) \+ (\d+) (\d+\/\d+) = \? Give your answer as an improper fraction\./);
        const [w1, mixed1, w2, mixed2] = pm ? pm.slice(1) : ["", "", "", ""];
        const em0 = drawn.explanationSteps[0]!.match(/^Convert each mixed number to an improper fraction first: .* = (\d+\/\d+), .* = (\d+\/\d+)\./);
        const [improperLabel1, improperLabel2] = em0 ? em0.slice(1) : ["", ""];
        const em1 = drawn.explanationSteps[1]!.match(/^Add them: (\d+) \+ (\d+) = (\d+), giving (\d+\/\d+)\./);
        const [imp1, imp2, total, correct] = em1 ? em1.slice(1) : ["", "", "", ""];
        return {
          prompt: `${w1} ${mixed1} + ${w2} ${mixed2} = ? Donne ta réponse sous forme de fraction impropre.`,
          explanationSteps: [
            `Convertis d'abord chaque nombre mixte en fraction impropre : ${w1} ${mixed1} = ${improperLabel1}, ${w2} ${mixed2} = ${improperLabel2}.`,
            `Additionne-les : ${imp1} + ${imp2} = ${total}, ce qui donne ${correct}.`
          ],
          hints: ["Transforme chaque nombre mixte en fraction impropre avant d'additionner."]
        };
      }
    },
    declaredVariationSpace: 6 * 5 * 5 * 9 * 9 * 5
  }),
  categoricalPoolTemplate({
    key: "y5l5.subtractMixedNumbersSameDenom", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(4, 10);
      const w1 = rng.int(3, 8);
      const w2 = rng.int(1, w1 - 1);
      const n1 = rng.int(1, d - 1);
      const n2 = rng.int(1, d - 1);
      const improper1 = w1 * d + n1;
      const improper2 = w2 * d + n2;
      const larger = Math.max(improper1, improper2);
      const smaller = Math.min(improper1, improper2);
      const diff = larger - smaller;
      const correct = frac(diff, d);
      const distractors = [frac(diff + d, d), frac(Math.abs(n1 - n2), d), frac(diff, d * 2)];
      return {
        prompt: `${w1} ${frac(n1, d)} - ${w2} ${frac(n2, d)} = ? Give your answer as an improper fraction.`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Convert to improper fractions: ${w1} ${frac(n1, d)} = ${frac(improper1, d)}, ${w2} ${frac(n2, d)} = ${frac(improper2, d)}.`, `Subtract: ${larger} - ${smaller} = ${diff}, giving ${correct}.`],
        hints: ["Turn each mixed number into an improper fraction before subtracting."]
      };
    },
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/^(\d+) (\d+\/\d+) - (\d+) (\d+\/\d+) = \? Give your answer as an improper fraction\./);
        const [w1, mixed1, w2, mixed2] = pm ? pm.slice(1) : ["", "", "", ""];
        const em0 = drawn.explanationSteps[0]!.match(/^Convert to improper fractions: .* = (\d+\/\d+), .* = (\d+\/\d+)\./);
        const [improperLabel1, improperLabel2] = em0 ? em0.slice(1) : ["", ""];
        const em1 = drawn.explanationSteps[1]!.match(/^Subtract: (\d+) - (\d+) = (\d+), giving (\d+\/\d+)\./);
        const [larger, smaller, diff, correct] = em1 ? em1.slice(1) : ["", "", "", ""];
        return {
          prompt: `${w1} ${mixed1} - ${w2} ${mixed2} = ? Donne ta réponse sous forme de fraction impropre.`,
          explanationSteps: [
            `Convertis en fractions impropres : ${w1} ${mixed1} = ${improperLabel1}, ${w2} ${mixed2} = ${improperLabel2}.`,
            `Soustrais : ${larger} - ${smaller} = ${diff}, ce qui donne ${correct}.`
          ],
          hints: ["Transforme chaque nombre mixte en fraction impropre avant de soustraire."]
        };
      }
    },
    declaredVariationSpace: 6 * 6 * 6 * 9 * 9 * 6
  }),
  categoricalPoolTemplate({
    key: "y5l5.tfAddFractionsCheck", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(5, 12);
      const n1 = rng.int(1, d - 1);
      const n2 = rng.int(1, d - 1);
      const correctSum = n1 + n2;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? correctSum : correctSum + rng.int(1, 3);
      return {
        prompt: `${frac(n1, d)} + ${frac(n2, d)} = ${frac(shown, d)}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${n1} + ${n2} = ${correctSum}, so the sum is ${frac(correctSum, d)}.`],
        hints: ["Add the numerators only — the denominator doesn't change."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) \+ (\d+)\/\2 = (\d+)\/\2\./);
        const [n1, d, n2, shown] = m ? m.slice(1) : ["", "", "", ""];
        const isTrueCase = drawn.correctLabel === "True";
        const correctSum = Number(n1) + Number(n2);
        return {
          prompt: `${n1}/${d} + ${n2}/${d} = ${shown}/${d}.`,
          correctLabel: isTrueCase ? "Vrai" : "Faux",
          distractorLabels: [isTrueCase ? "Faux" : "Vrai"],
          explanationSteps: [`${n1} + ${n2} = ${correctSum}, donc la somme est ${correctSum}/${d}.`],
          hints: ["Additionne seulement les numérateurs — le dénominateur ne change pas."]
        };
      }
    },
    declaredVariationSpace: 8 * 11 * 11 * 2
  }),
  categoricalPoolTemplate({
    key: "y5l5.wordProblemAddFractions", levelKey: "Y5L5", objectiveCode: "Y5-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(5, 12);
      const n1 = rng.int(1, d - 2);
      const n2 = rng.int(1, d - n1 - 1 > 0 ? d - n1 - 1 : 1);
      const names = ["Sam", "Priya", "Leo", "Amara", "Tom", "Zara", "Noah", "Freya"];
      const name1 = rng.pick(names);
      let name2 = rng.pick(names);
      while (name2 === name1) name2 = rng.pick(names);
      const correct = frac(n1 + n2, d);
      const distractors = [frac(n1 + n2, d * 2), frac(n1 * n2, d), frac(n1 + n2 + 1, d)];
      return {
        prompt: `${name1} ate ${frac(n1, d)} of a pizza and ${name2} ate ${frac(n2, d)} of the same pizza. What fraction did they eat together?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Add the numerators: ${n1} + ${n2} = ${n1 + n2}, giving ${correct} of the pizza.`],
        hints: ["Add the two fractions — the denominator stays the same."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\w+) ate (\d+\/\d+) of a pizza and (\w+) ate (\d+\/\d+) of the same pizza\./);
        const [name1, label1, name2, label2] = m ? m.slice(1) : ["", "", "", ""];
        const [n1] = (label1 ?? "").split("/");
        const [n2] = (label2 ?? "").split("/");
        return {
          prompt: `${name1} a mangé ${label1} d'une pizza et ${name2} a mangé ${label2} de la même pizza. Quelle fraction ont-ils mangée ensemble ?`,
          explanationSteps: [`Additionne les numérateurs : ${n1} + ${n2} = ${Number(n1) + Number(n2)}, ce qui donne ${drawn.correctLabel} de la pizza.`],
          hints: ["Additionne les deux fractions — le dénominateur reste le même."]
        };
      }
    },
    declaredVariationSpace: 8 * 10 * 10 * 56
  }),

  // --- Y5-L5-3: multiply proper fractions and mixed numbers by a whole number ---
  categoricalPoolTemplate({
    key: "y5l5.multiplyUnitFractionByWhole", levelKey: "Y5L5", objectiveCode: "Y5-L5-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(3, 12);
      const w = rng.int(2, 9);
      const correct = frac(w, d);
      const distractors = [frac(w, d * w), frac(1, d * w), frac(w + 1, d)];
      return {
        prompt: `1/${d} x ${w} = ?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Multiplying a unit fraction by a whole number multiplies the numerator: 1 x ${w} = ${w}, giving ${correct}.`],
        hints: ["Multiply the numerator by the whole number; the denominator stays the same."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^1\/(\d+) x (\d+) = \?/);
        const [d, w] = m ? m.slice(1) : ["", ""];
        return {
          prompt: `1/${d} x ${w} = ?`,
          explanationSteps: [`Multiplier une fraction unitaire par un nombre entier multiplie le numérateur : 1 x ${w} = ${w}, ce qui donne ${drawn.correctLabel}.`],
          hints: ["Multiplie le numérateur par le nombre entier ; le dénominateur reste le même."]
        };
      }
    },
    declaredVariationSpace: 10 * 8 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.multiplyFractionByWhole", levelKey: "Y5L5", objectiveCode: "Y5-L5-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(3, 12);
      const n = rng.int(2, d - 1);
      const w = rng.int(2, 9);
      const correct = frac(n * w, d);
      const distractors = [frac(n * w, d * w), frac(n + w, d), frac(n * w, d + w)];
      return {
        prompt: `${frac(n, d)} x ${w} = ?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Multiply the numerator by the whole number, keep the denominator the same: ${n} x ${w} = ${n * w}, giving ${correct}.`],
        hints: ["Multiply only the numerator by the whole number."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) x (\d+) = \?/);
        const [n, d, w] = m ? m.slice(1) : ["", "", ""];
        return {
          prompt: `${n}/${d} x ${w} = ?`,
          explanationSteps: [`Multiplie le numérateur par le nombre entier, garde le même dénominateur : ${n} x ${w} = ${Number(n) * Number(w)}, ce qui donne ${drawn.correctLabel}.`],
          hints: ["Multiplie seulement le numérateur par le nombre entier."]
        };
      }
    },
    declaredVariationSpace: 10 * 10 * 8 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.multiplyFractionByWholeToWhole", levelKey: "Y5L5", objectiveCode: "Y5-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(2, 8);
      const n = rng.int(1, d - 1);
      const w = d * rng.int(1, 4);
      const wholeResult = (n * w) / d;
      const correct = String(wholeResult);
      const distractors = [frac(n * w, d), String(wholeResult + 1), String(n * w)];
      const uniq = Array.from(new Set(distractors)).filter((c) => c !== correct).slice(0, 3);
      while (uniq.length < 3) uniq.push(String(wholeResult + uniq.length + 2));
      return {
        prompt: `${frac(n, d)} x ${w} = ?`,
        correctLabel: correct,
        distractorLabels: uniq,
        explanationSteps: [`${n} x ${w} = ${n * w}. ${n * w} ÷ ${d} = ${wholeResult}, a whole number.`],
        hints: ["Multiply the numerator by the whole number, then divide by the denominator."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) x (\d+) = \?/);
        const [n, d, w] = m ? m.slice(1) : ["", "", ""];
        const product = Number(n) * Number(w);
        return {
          prompt: `${n}/${d} x ${w} = ?`,
          explanationSteps: [`${n} x ${w} = ${product}. ${product} ÷ ${d} = ${drawn.correctLabel}, un nombre entier.`],
          hints: ["Multiplie le numérateur par le nombre entier, puis divise par le dénominateur."]
        };
      }
    },
    declaredVariationSpace: 7 * 6 * 4 * 300
  }),
  categoricalPoolTemplate({
    key: "y5l5.multiplyMixedByWhole", levelKey: "Y5L5", objectiveCode: "Y5-L5-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(3, 8);
      const w0 = rng.int(1, 4);
      const n = rng.int(1, d - 1);
      const w1 = rng.int(2, 6);
      const improper = w0 * d + n;
      const correct = frac(improper * w1, d);
      const distractors = [frac(improper * w1, d * w1), frac(w0 * w1 * d + n, d), frac((improper + 1) * w1, d)];
      return {
        prompt: `${w0} ${frac(n, d)} x ${w1} = ? Give your answer as an improper fraction.`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Convert to an improper fraction first: ${w0} ${frac(n, d)} = ${frac(improper, d)}.`, `Multiply: ${improper} x ${w1} = ${improper * w1}, giving ${correct}.`],
        hints: ["Turn the mixed number into an improper fraction before multiplying."]
      };
    },
    fr: {
      translate: (drawn) => {
        const pm = drawn.prompt.match(/^(\d+) (\d+\/\d+) x (\d+) = \? Give your answer as an improper fraction\./);
        const [w0, mixed, w1] = pm ? pm.slice(1) : ["", "", ""];
        const em0 = drawn.explanationSteps[0]!.match(/^Convert to an improper fraction first: .* = (\d+\/\d+)\./);
        const improperLabel = em0 ? em0[1] : "";
        const em1 = drawn.explanationSteps[1]!.match(/^Multiply: (\d+) x (\d+) = (\d+), giving (\d+\/\d+)\./);
        const [improper, w1again, product, correct] = em1 ? em1.slice(1) : ["", "", "", ""];
        return {
          prompt: `${w0} ${mixed} x ${w1} = ? Donne ta réponse sous forme de fraction impropre.`,
          explanationSteps: [
            `Convertis d'abord en fraction impropre : ${w0} ${mixed} = ${improperLabel}.`,
            `Multiplie : ${improper} x ${w1again} = ${product}, ce qui donne ${correct}.`
          ],
          hints: ["Transforme le nombre mixte en fraction impropre avant de multiplier."]
        };
      }
    },
    declaredVariationSpace: 5 * 4 * 6 * 6 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.wordProblemMultiplyFraction", levelKey: "Y5L5", objectiveCode: "Y5-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(2, 8);
      const n = rng.int(1, d - 1);
      const w = rng.int(2, 8);
      const correct = frac(n * w, d);
      const distractors = [frac(n * w, d * w), frac(n + w, d), frac(n * w, d + w)];
      const items = ["cup of flour", "litre of juice", "metre of ribbon", "bag of sugar", "kilogram of rice", "tin of paint"];
      const item = rng.pick(items);
      return {
        prompt: `One recipe needs ${frac(n, d)} of a ${item}. How much is needed for ${w} batches of the recipe?`,
        correctLabel: correct,
        distractorLabels: padDistractors(distractors, correct, d),
        explanationSteps: [`Multiply the fraction by the number of batches: ${n} x ${w} = ${n * w}, giving ${correct}.`],
        hints: ["Multiply the numerator by the number of batches."]
      };
    },
    fr: {
      translate: (drawn) => {
        const itemsFr: Record<string, string> = {
          "cup of flour": "tasse de farine",
          "litre of juice": "litre de jus de fruit",
          "metre of ribbon": "mètre de ruban",
          "bag of sugar": "sachet de sucre",
          "kilogram of rice": "kilogramme de riz",
          "tin of paint": "pot de peinture"
        };
        const m = drawn.prompt.match(/^One recipe needs (\d+\/\d+) of a (.+)\. How much is needed for (\d+) batches of the recipe\?/);
        const [label, item, w] = m ? m.slice(1) : ["", "", ""];
        const [n] = (label ?? "").split("/");
        const itemFr = itemsFr[item ?? ""] ?? item;
        return {
          prompt: `Une recette nécessite ${label} de ${itemFr}. Combien faut-il pour ${w} fournées de la recette ?`,
          explanationSteps: [`Multiplie la fraction par le nombre de fournées : ${n} x ${w} = ${Number(n) * Number(w)}, ce qui donne ${drawn.correctLabel}.`],
          hints: ["Multiplie le numérateur par le nombre de fournées."]
        };
      }
    },
    declaredVariationSpace: 7 * 7 * 7 * 6 * 200
  }),
  categoricalPoolTemplate({
    key: "y5l5.tfMultiplyFraction", levelKey: "Y5L5", objectiveCode: "Y5-L5-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_UNEQUAL_PARTS"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const d = rng.int(3, 12);
      const n = rng.int(1, d - 1);
      const w = rng.int(2, 9);
      const correctProduct = n * w;
      const isTrueCase = rng.chance(0.5);
      // n + w happens to equal n x w only at n=w=2 — guard so the "false"
      // case is never accidentally a true statement.
      const wrongSum = n + w === correctProduct ? n + w + 1 : n + w;
      const shown = isTrueCase ? correctProduct : wrongSum;
      return {
        prompt: `${frac(n, d)} x ${w} = ${frac(shown, d)}.`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${n} x ${w} = ${correctProduct}, so the product is ${frac(correctProduct, d)}.`],
        hints: ["Multiply the numerator by the whole number — don't add them."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)\/(\d+) x (\d+) = (\d+)\/\2\./);
        const [n, d, w, shown] = m ? m.slice(1) : ["", "", "", ""];
        const isTrueCase = drawn.correctLabel === "True";
        const correctProduct = Number(n) * Number(w);
        return {
          prompt: `${n}/${d} x ${w} = ${shown}/${d}.`,
          correctLabel: isTrueCase ? "Vrai" : "Faux",
          distractorLabels: [isTrueCase ? "Faux" : "Vrai"],
          explanationSteps: [`${n} x ${w} = ${correctProduct}, donc le produit est ${correctProduct}/${d}.`],
          hints: ["Multiplie le numérateur par le nombre entier — ne les additionne pas."]
        };
      }
    },
    declaredVariationSpace: 10 * 10 * 8 * 2
  })
];

export default level;
