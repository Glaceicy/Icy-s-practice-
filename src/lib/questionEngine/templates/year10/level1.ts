import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 1 — "Number accuracy, bounds, indices, standard form and surds"
// A smaller but fully valid, deterministic bank (15 templates) demonstrating
// the engine at KS4/GCSE depth, including Foundation/Higher pathway tagging.
// See DOCUMENTATION.md "Content coverage status".

function simplifySurd(n: number): { coeff: number; radicand: number } {
  let coeff = 1;
  let radicand = n;
  for (let f = 2; f * f <= radicand; f++) {
    while (radicand % (f * f) === 0) {
      radicand /= f * f;
      coeff *= f;
    }
  }
  return { coeff, radicand };
}

/** French names for the spelled-out units used in reasoningExplainBounds'
 * pool — display-only, the pool itself stays English (rule: never modify
 * `pools`). Symbols like cm/kg/litres are identical in French. */
const UNIT_FR: Record<string, string> = { cm: "cm", kg: "kg", litres: "litres", metres: "mètres", seconds: "secondes" };

export const level: QuestionTemplateDef[] = [
  arithmeticTemplate({
    key: "y10l1.upperBound", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 500], [0, 1]], compute: (v) => v[0]! + [0.5, 5][v[1]!]!,
    derive: (v) => ({ accuracy: [1, 10][v[1]!]! }),
    promptTemplates: ["A length of {a} cm is measured to the nearest {accuracy} cm. What is the upper bound?"],
    explain: (v, r) => [`Half of ${[1, 10][v[1]!]} is added to find the upper bound: ${v[0]} + ${[0.5, 5][v[1]!]} = ${r}.`],
    hints: () => ["The upper bound is half a unit above the rounded value."],
    formatValue: (n) => String(n),
    fr: {
      promptTemplates: ["Une longueur de {a} cm est mesurée au {accuracy} cm près. Quelle est la borne supérieure ?"],
      explain: (v, r) => [`La moitié de ${[1, 10][v[1]!]} est ajoutée pour trouver la borne supérieure : ${v[0]} + ${[0.5, 5][v[1]!]} = ${r}.`],
      hints: () => ["La borne supérieure est une demi-unité au-dessus de la valeur arrondie."]
    },
    declaredVariationSpace: 491 * 2
  }),
  arithmeticTemplate({
    key: "y10l1.lowerBound", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 500], [0, 1]], compute: (v) => v[0]! - [0.5, 5][v[1]!]!,
    derive: (v) => ({ accuracy: [1, 10][v[1]!]! }),
    promptTemplates: ["A mass of {a} kg is measured to the nearest {accuracy} kg. What is the lower bound?"],
    explain: (v, r) => [`Half of ${[1, 10][v[1]!]} is subtracted to find the lower bound: ${v[0]} - ${[0.5, 5][v[1]!]} = ${r}.`],
    hints: () => ["The lower bound is half a unit below the rounded value."],
    formatValue: (n) => String(n),
    fr: {
      promptTemplates: ["Une masse de {a} kg est mesurée au {accuracy} kg près. Quelle est la borne inférieure ?"],
      explain: (v, r) => [`La moitié de ${[1, 10][v[1]!]} est soustraite pour trouver la borne inférieure : ${v[0]} - ${[0.5, 5][v[1]!]} = ${r}.`],
      hints: () => ["La borne inférieure est une demi-unité en dessous de la valeur arrondie."]
    },
    declaredVariationSpace: 491 * 2
  }),
  arithmeticTemplate({
    key: "y10l1.indexLawMultiply", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 6], [1, 6]], compute: (v) => v[1]! + v[2]!,
    promptTemplates: ["Simplify {a}^{b} x {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When multiplying powers of the same base, add the indices: ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Same base, multiplying: add the powers."],
    fr: {
      promptTemplates: ["Simplifie {a}^{b} x {a}^{c}, en donnant ta réponse sous la forme {a}^n. Quelle est la valeur de n ?"],
      explain: (v, r) => [`Quand on multiplie des puissances de même base, on additionne les exposants : ${v[1]} + ${v[2]} = ${r}.`],
      hints: () => ["Même base, multiplication : additionne les puissances."]
    },
    declaredVariationSpace: 8 * 6 * 6
  }),
  arithmeticTemplate({
    key: "y10l1.indexLawDivide", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [3, 10], [1, 5]], constraint: (v) => v[1]! > v[2]!, compute: (v) => v[1]! - v[2]!,
    promptTemplates: ["Simplify {a}^{b} ÷ {a}^{c}, giving your answer as {a}^n. What is n?"],
    explain: (v, r) => [`When dividing powers of the same base, subtract the indices: ${v[1]} - ${v[2]} = ${r}.`],
    hints: () => ["Same base, dividing: subtract the powers."],
    fr: {
      promptTemplates: ["Simplifie {a}^{b} ÷ {a}^{c}, en donnant ta réponse sous la forme {a}^n. Quelle est la valeur de n ?"],
      explain: (v, r) => [`Quand on divise des puissances de même base, on soustrait les exposants : ${v[1]} - ${v[2]} = ${r}.`],
      hints: () => ["Même base, division : soustrais les puissances."]
    },
    declaredVariationSpace: 8 * 8 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.negativeIndex", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [1, 4]], compute: (v) => Math.pow(v[0]!, v[1]!),
    promptTemplates: ["Write {a}^-{b} as a fraction: 1/n. What is n?", "{a}^-{b} equals 1/n. Find n."],
    explain: (v, r) => [`A negative index means "one over": ${v[0]}^-${v[1]} = 1/${v[0]}^${v[1]} = 1/${r}.`],
    hints: () => ["A negative power means 1 divided by the positive power."],
    fr: {
      promptTemplates: ["Écris {a}^-{b} sous forme de fraction : 1/n. Quelle est la valeur de n ?", "{a}^-{b} est égal à 1/n. Trouve n."],
      explain: (v, r) => [`Un exposant négatif signifie « un sur » : ${v[0]}^-${v[1]} = 1/${v[0]}^${v[1]} = 1/${r}.`],
      hints: () => ["Une puissance négative signifie 1 divisé par la puissance positive."]
    },
    declaredVariationSpace: 19 * 4 * 2
  }),
  categoricalPoolTemplate({
    key: "y10l1.fractionalIndex", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "REASONING",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { base: ["4", "9", "16", "25", "36", "49", "64", "81", "100"] },
    build: (picked) => {
      const n = Number(picked.base);
      const root = Math.sqrt(n);
      return {
        prompt: `What is ${picked.base}^(1/2)?`,
        correctLabel: String(root),
        distractorLabels: [String(root + 1), String(root - 1), String(n / 2)],
        explanationSteps: [`A power of 1/2 means the square root: √${picked.base} = ${root}.`],
        hints: ["A power of one-half means 'take the square root'."]
      };
    },
    fr: {
      translate: (drawn, picked) => ({
        prompt: `Que vaut ${picked.base}^(1/2) ?`,
        explanationSteps: [`Un exposant de 1/2 signifie la racine carrée : √${picked.base} = ${drawn.correctLabel}.`],
        hints: ["Un exposant d'un demi signifie « prends la racine carrée »."]
      })
    },
    declaredVariationSpace: 9 * 4 * 5
  }),
  arithmeticTemplate({
    key: "y10l1.standardFormToNumber", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [1, 6]], compute: (v) => v[0]! * Math.pow(10, v[1]! - 1),
    derive: (v) => ({ mantissa: (v[0]! / 10).toFixed(1), exponent: v[1]! }),
    promptTemplates: ["Write {mantissa} x 10^{exponent} as an ordinary number."],
    explain: (v, r) => [`Multiply ${(v[0]! / 10).toFixed(1)} by 10^${v[1]} by moving the decimal point ${v[1]} places right: ${r}.`],
    hints: () => ["Moving the decimal point right multiplies by 10 each time."],
    fr: {
      promptTemplates: ["Écris {mantissa} x 10^{exponent} sous forme de nombre ordinaire."],
      explain: (v, r) => [`Multiplie ${(v[0]! / 10).toFixed(1)} par 10^${v[1]} en déplaçant la virgule de ${v[1]} positions vers la droite : ${r}.`],
      hints: () => ["Déplacer la virgule vers la droite multiplie par 10 à chaque fois."]
    },
    declaredVariationSpace: 90 * 6
  }),
  arithmeticTemplate({
    key: "y10l1.numberToStandardFormExponent", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [1, 9]], compute: (v) => v[1]!,
    derive: (v) => ({ n: v[0]! * Math.pow(10, v[1]!) }),
    promptTemplates: [
      "Written in standard form, {n} = {a} x 10^n, where {a} is a single non-zero digit. What is n?",
      "{n} is written as {a} x 10^n in standard form. What is n?"
    ],
    explain: (v, r) => [`Counting the places the decimal point moves gives the exponent: n = ${r}.`],
    hints: () => ["Count how many places the decimal point moves to get one non-zero digit before it."],
    fr: {
      promptTemplates: [
        "Écrit en notation scientifique, {n} = {a} x 10^n, où {a} est un chiffre non nul unique. Quelle est la valeur de n ?",
        "{n} s'écrit {a} x 10^n en notation scientifique. Quelle est la valeur de n ?"
      ],
      explain: (v, r) => [`En comptant le nombre de positions dont la virgule se déplace, on obtient l'exposant : n = ${r}.`],
      hints: () => ["Compte le nombre de positions dont la virgule se déplace pour obtenir un seul chiffre non nul avant elle."]
    },
    declaredVariationSpace: 9 * 9 * 2
  }),
  categoricalPoolTemplate({
    key: "y10l1.mcCompareStandardForm", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "REASONING",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { m1: ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"], e1: ["3", "4", "5", "6"], m2: ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"], e2: ["3", "4", "5", "6"] },
    build: (picked) => {
      let m2 = picked.m2!;
      let e2 = picked.e2!;
      // Guard against drawing the identical tuple for both sides, which would
      // leave only one distinct choice label (invalid multiple-choice question).
      if (m2 === picked.m1 && e2 === picked.e1) {
        const alt = ["1.2", "2.5", "3.8", "5.1", "7.4", "9.9"].find((m) => m !== m2)!;
        m2 = alt;
      }
      const v1 = Number(picked.m1) * Math.pow(10, Number(picked.e1));
      const v2 = Number(m2) * Math.pow(10, Number(e2));
      const bigger = v1 >= v2 ? `${picked.m1} x 10^${picked.e1}` : `${m2} x 10^${e2}`;
      const smaller = v1 >= v2 ? `${m2} x 10^${e2}` : `${picked.m1} x 10^${picked.e1}`;
      return {
        prompt: `Which is bigger: ${picked.m1} x 10^${picked.e1} or ${m2} x 10^${e2}?`,
        correctLabel: bigger,
        distractorLabels: [smaller],
        explanationSteps: ["Compare the exponents first; if equal, compare the mantissas."],
        hints: ["A bigger exponent (power of 10) usually means a bigger number."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which is bigger: (.+) or (.+)\?$/);
        const left = m ? m[1] : "";
        const right = m ? m[2] : "";
        return {
          prompt: `Lequel est le plus grand : ${left} ou ${right} ?`,
          explanationSteps: ["Compare d'abord les exposants ; s'ils sont égaux, compare les mantisses."],
          hints: ["Un exposant plus grand (puissance de 10) signifie généralement un nombre plus grand."]
        };
      }
    },
    declaredVariationSpace: 6 * 4 * 6 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.simplifySurd", levelKey: "Y10L1", objectiveCode: "Y10-L1-4", difficulty: "REASONING",
    misconceptionTags: ["SURD_SIMPLIFICATION_ERROR"], type: "NUMBER_ENTRY", pathway: "HIGHER",
    ranges: [[2, 30], [2, 9]], compute: (v) => v[0]! * v[0]! * v[1]!,
    derive: (v, r) => {
      const { coeff, radicand } = simplifySurd(r);
      return { n: r, coefficient: coeff, radicand };
    },
    promptTemplates: ["Simplify √{n} to the form a√b. What is the value of a (the coefficient)?", "√{n} simplifies to a√b. Find a."],
    explain: (v, r) => {
      const { coeff, radicand } = simplifySurd(r);
      return [`√${r} = ${coeff}√${radicand}.`];
    },
    hints: () => ["Find the largest square number that divides into the number under the root."],
    formatValue: (n) => {
      const { coeff } = simplifySurd(n);
      return String(coeff);
    },
    fr: {
      promptTemplates: ["Simplifie √{n} sous la forme a√b. Quelle est la valeur de a (le coefficient) ?", "√{n} se simplifie en a√b. Trouve a."],
      hints: () => ["Trouve le plus grand nombre carré qui divise le nombre sous la racine."]
    },
    declaredVariationSpace: 29 * 8 * 2
  }),
  arithmeticTemplate({
    key: "y10l1.tfBounds", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "TRUE_FALSE",
    ranges: [[10, 200]], compute: (v) => v[0]! + 0.5,
    promptTemplates: ["A length of {a} cm is measured to the nearest cm. Its upper bound is"],
    explain: (v, r) => [`Upper bound = ${v[0]} + 0.5 = ${r}.`],
    hints: () => ["The upper bound is half a unit above the rounded value."],
    fr: {
      promptTemplates: ["Une longueur de {a} cm est mesurée au cm près. Sa borne supérieure est"],
      explain: (v, r) => [`Borne supérieure = ${v[0]} + 0.5 = ${r}.`],
      hints: () => ["La borne supérieure est une demi-unité au-dessus de la valeur arrondie."]
    },
    declaredVariationSpace: 191 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.wordProblemBounds", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "REASONING",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "WORD_PROBLEM",
    ranges: [[50, 300]], compute: (v) => v[0]! + 0.5,
    promptTemplates: ["A plank of wood measures {a} to the nearest centimetre. What is the maximum possible length it could actually be?"],
    explain: (v, r) => [`The true length could be up to half a centimetre more: ${v[0]} + 0.5 = ${r} cm.`],
    hints: () => ["The maximum possible value is half a unit above the rounded measurement."],
    formatValue: (n) => `${n} cm`,
    fr: {
      promptTemplates: ["Une planche de bois mesure {a} au centimètre près. Quelle est la longueur maximale possible qu'elle pourrait réellement avoir ?"],
      explain: (v, r) => [`La longueur réelle pourrait être jusqu'à un demi-centimètre de plus : ${v[0]} + 0.5 = ${r} cm.`],
      hints: () => ["La valeur maximale possible est une demi-unité au-dessus de la mesure arrondie."]
    },
    declaredVariationSpace: 251
  }),
  arithmeticTemplate({
    key: "y10l1.standardFormMultiplyMantissa", levelKey: "Y10L1", objectiveCode: "Y10-L1-3", difficulty: "REASONING",
    misconceptionTags: ["STANDARD_FORM_PLACEMENT_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [2, 9], [1, 6], [1, 6]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["(A x 10^{c}) x (B x 10^{d}) has mantissa A x B, where A = {a} and B = {b}. What is A x B?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, "Multiply the mantissas and add the exponents separately."],
    hints: () => ["Multiply the two mantissas together first."],
    fr: {
      promptTemplates: ["(A x 10^{c}) x (B x 10^{d}) a pour mantisse A x B, où A = {a} et B = {b}. Que vaut A x B ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`, "Multiplie les mantisses et additionne les exposants séparément."],
      hints: () => ["Multiplie d'abord les deux mantisses ensemble."]
    },
    declaredVariationSpace: 8 * 8 * 6 * 6
  }),
  categoricalPoolTemplate({
    key: "y10l1.reasoningExplainBounds", levelKey: "Y10L1", objectiveCode: "Y10-L1-1", difficulty: "REASONING",
    misconceptionTags: ["BOUNDS_HALF_UNIT_ERROR"], type: "REASONING_EXPLAIN",
    pools: { unit: ["cm", "kg", "litres", "metres", "seconds"], value: ["12", "45", "78", "120", "200", "36"] },
    build: (picked) => ({
      prompt: `A measurement of ${picked.value} ${picked.unit} is given to the nearest whole ${picked.unit}. Why is the true value between ${Number(picked.value) - 0.5} and ${Number(picked.value) + 0.5} ${picked.unit}?`,
      correctLabel: "Because rounding to the nearest whole unit means the true value is within half a unit either side",
      distractorLabels: [
        "Because all measurements are always exact",
        "Because the true value must be a whole number too",
        "Because rounding always rounds down"
      ],
      explanationSteps: ["Rounding to the nearest unit means any true value within half a unit rounds to the same figure."],
      hints: ["Think about which values would round to this same measurement."]
    }),
    fr: {
      translate: (_drawn, picked) => {
        const unitFr = UNIT_FR[picked.unit!] ?? picked.unit;
        const value = picked.value!;
        const lower = Number(value) - 0.5;
        const upper = Number(value) + 0.5;
        return {
          prompt: `Une mesure de ${value} ${unitFr} est donnée à l'unité entière de ${unitFr} la plus proche. Pourquoi la valeur réelle se situe-t-elle entre ${lower} et ${upper} ${unitFr} ?`,
          correctLabel: "Parce qu'arrondir à l'unité entière la plus proche signifie que la valeur réelle se situe à moins d'une demi-unité de part et d'autre",
          distractorLabels: [
            "Parce que toutes les mesures sont toujours exactes",
            "Parce que la valeur réelle doit aussi être un nombre entier",
            "Parce qu'arrondir se fait toujours vers le bas"
          ],
          explanationSteps: ["Arrondir à l'unité la plus proche signifie que toute valeur réelle à moins d'une demi-unité s'arrondit à ce même chiffre."],
          hints: ["Réfléchis à quelles valeurs s'arrondiraient à cette même mesure."]
        };
      }
    },
    declaredVariationSpace: 5 * 6 * 4
  }),
  arithmeticTemplate({
    key: "y10l1.indexLawPower", levelKey: "Y10L1", objectiveCode: "Y10-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["INDEX_LAW_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 9], [1, 6], [1, 4]], compute: (v) => v[1]! * v[2]!,
    promptTemplates: ["Simplify ({a}^{b})^{c}, giving your answer as {a}^n. What is n?", "({a}^{b})^{c} = {a}^n. What is n?"],
    explain: (v, r) => [`When raising a power to a power, multiply the indices: ${v[1]} x ${v[2]} = ${r}.`],
    hints: () => ["Power of a power: multiply the indices together."],
    fr: {
      promptTemplates: ["Simplifie ({a}^{b})^{c}, en donnant ta réponse sous la forme {a}^n. Quelle est la valeur de n ?", "({a}^{b})^{c} = {a}^n. Quelle est la valeur de n ?"],
      explain: (v, r) => [`Quand on élève une puissance à une puissance, on multiplie les exposants : ${v[1]} x ${v[2]} = ${r}.`],
      hints: () => ["Puissance d'une puissance : multiplie les exposants ensemble."]
    },
    declaredVariationSpace: 8 * 6 * 4 * 2
  })
];

export default level;
