import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import { visuals } from "../../visuals";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 7 — "Pythagoras and introductory trigonometry"
// Pythagorean triples keep every length an exact whole number, and the
// trigonometry templates use those same triples so each ratio is an exact
// terminating decimal — no rounding ambiguity in the stored answer key.
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20],
  [7, 24, 25], [20, 21, 29], [10, 24, 26], [15, 20, 25], [18, 24, 30], [16, 30, 34]
];
const PLACES = ["a ladder against a wall", "a ramp", "a tent guy rope", "a kite string", "a slide", "a flagpole wire", "a roof strut", "a zip wire"];
const PLACES_FR = ["une échelle contre un mur", "une rampe", "un hauban de tente", "une corde de cerf-volant", "un toboggan", "un câble de mât", "une entretoise de toit", "une tyrolienne"];

export const level: QuestionTemplateDef[] = [
  // --- Y9-L7-1: Pythagoras' theorem ---
  arithmeticTemplate({
    key: "y9l7.pythagorasHypotenuse", levelKey: "Y9L7", objectiveCode: "Y9-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 4]], compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ sideA: TRIPLES[v[0]!]![0] * v[1]!, sideB: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: ["A right-angled triangle has shorter sides of {sideA} cm and {sideB} cm. What is the hypotenuse, in cm?", "Planning {ctx}: a right-angled triangle has shorter sides of {sideA} m and {sideB} m. What is the hypotenuse, in m?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const a = t[0] * v[1]!, b = t[1] * v[1]!;
      return [`${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}.`, `The square root of ${a * a + b * b} is ${r}.`];
    },
    hints: () => ["Square both shorter sides, add them, then take the square root."],
    visualAid: (v) => visuals.shape("right-triangle", { a: TRIPLES[v[0]!]![0] * v[1]!, b: TRIPLES[v[0]!]![1] * v[1]! }),
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Un triangle rectangle a des côtés courts de {sideA} cm et {sideB} cm. Quelle est l'hypoténuse, en cm ?", "Pour {ctx} : un triangle rectangle a des côtés courts de {sideA} m et {sideB} m. Quelle est l'hypoténuse, en m ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const a = t[0] * v[1]!, b = t[1] * v[1]!;
        return [`${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}.`, `La racine carrée de ${a * a + b * b} est ${r}.`];
      },
      hints: () => ["Élève les deux côtés courts au carré, additionne, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 4
  }),
  arithmeticTemplate({
    key: "y9l7.pythagorasShorterSide", levelKey: "Y9L7", objectiveCode: "Y9-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 4]], compute: (v) => TRIPLES[v[0]!]![0] * v[1]!,
    derive: (v) => ({ sideB: TRIPLES[v[0]!]![1] * v[1]!, hyp: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: ["A right-angled triangle has a hypotenuse of {hyp} cm and one shorter side of {sideB} cm. What is the other shorter side, in cm?", "Planning {ctx}: a right-angled triangle has a hypotenuse of {hyp} m and one shorter side of {sideB} m. What is the other shorter side, in m?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const b = t[1] * v[1]!, c = t[2] * v[1]!;
      return [`${c}² - ${b}² = ${c * c} - ${b * b} = ${c * c - b * b}.`, `The square root of ${c * c - b * b} is ${r}.`];
    },
    hints: () => ["Subtract the square of the known short side from the square of the hypotenuse, then take the square root."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Un triangle rectangle a une hypoténuse de {hyp} cm et un côté court de {sideB} cm. Quel est l'autre côté court, en cm ?", "Pour {ctx} : un triangle rectangle a une hypoténuse de {hyp} m et un côté court de {sideB} m. Quel est l'autre côté court, en m ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        const b = t[1] * v[1]!, c = t[2] * v[1]!;
        return [`${c}² - ${b}² = ${c * c} - ${b * b} = ${c * c - b * b}.`, `La racine carrée de ${c * c - b * b} est ${r}.`];
      },
      hints: () => ["Soustrais le carré du côté court connu du carré de l'hypoténuse, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 4
  }),
  arithmeticTemplate({
    key: "y9l7.pythagorasWordProblem", levelKey: "Y9L7", objectiveCode: "Y9-L7-1", difficulty: "APPLICATION",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "WORD_PROBLEM", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 3]], compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ sideA: TRIPLES[v[0]!]![0] * v[1]!, sideB: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: ["{Ctx} reaches {sideB} m up and stands {sideA} m out from the base. How long is it, in metres?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      const a = t[0] * v[1]!, b = t[1] * v[1]!;
      return [`${a}² + ${b}² = ${a * a + b * b}.`, `The square root is ${r}.`];
    },
    hints: () => ["The height and the distance out are the two short sides; the length is the hypotenuse."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["{Ctx} atteint {sideB} m de haut et se trouve à {sideA} m de la base. Quelle est sa longueur, en mètres ?"],
      hints: () => ["La hauteur et la distance au sol sont les deux côtés courts ; la longueur est l'hypoténuse."]
    },
    declaredVariationSpace: TRIPLES.length * 3 * PLACES.length
  }),
  categoricalPoolTemplate({
    key: "y9l7.tfRightAngledTriangle", levelKey: "Y9L7", objectiveCode: "Y9-L7-1", difficulty: "REASONING",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const t = TRIPLES[rng.int(0, TRIPLES.length - 1)]!;
      const k = rng.int(1, 4);
      const isRight = rng.chance(0.5);
      const a = t[0] * k, b = t[1] * k;
      const c = isRight ? t[2] * k : t[2] * k + rng.int(1, 3);
      return {
        prompt: `A triangle has sides ${a} cm, ${b} cm and ${c} cm. It is right-angled. True or false?`,
        correctLabel: isRight ? "True" : "False",
        distractorLabels: [isRight ? "False" : "True"],
        explanationSteps: [`${a}² + ${b}² = ${a * a + b * b}, and ${c}² = ${c * c}.`, isRight ? "These match, so the triangle is right-angled." : "These do not match, so it is not right-angled."],
        hints: ["Check whether the two shorter sides squared add up to the longest side squared."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A triangle has sides (\d+) cm, (\d+) cm and (\d+) cm\./);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un triangle a des côtés de ${m[1]} cm, ${m[2]} cm et ${m[3]} cm. Il est rectangle. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Vérifie si la somme des carrés des deux côtés courts égale le carré du plus long côté."]
        };
      }
    },
    declaredVariationSpace: TRIPLES.length * 4 * 2
  }),
  arithmeticTemplate({
    key: "y9l7.mcPythagorasHypotenuse", levelKey: "Y9L7", objectiveCode: "Y9-L7-1", difficulty: "FLUENCY",
    misconceptionTags: ["PYTHAGORAS_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[0, TRIPLES.length - 1], [1, 5]], compute: (v) => TRIPLES[v[0]!]![2] * v[1]!,
    derive: (v) => ({ sideA: TRIPLES[v[0]!]![0] * v[1]!, sideB: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: ["What is the hypotenuse of a right-angled triangle with short sides {sideA} cm and {sideB} cm?"],
    explain: (v, r) => [`The hypotenuse is ${r} cm.`],
    hints: () => ["Square, add, then square root."],
    distractorSpread: 6,
    fr: {
      promptTemplates: ["Quelle est l'hypoténuse d'un triangle rectangle avec des côtés courts de {sideA} cm et {sideB} cm ?"],
      hints: () => ["Élève au carré, additionne, puis prends la racine carrée."]
    },
    declaredVariationSpace: TRIPLES.length * 5
  }),

  // --- Y9-L7-2: trigonometric ratios to find sides ---
  arithmeticTemplate({
    key: "y9l7.sineRatioAsDecimal", levelKey: "Y9L7", objectiveCode: "Y9-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 5]], compute: (v) => TRIPLES[v[0]!]![0] / TRIPLES[v[0]!]![2],
    derive: (v) => ({ opp: TRIPLES[v[0]!]![0] * v[1]!, hyp: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: ["In a right-angled triangle the side opposite angle A is {opp} cm and the hypotenuse is {hyp} cm. What is sin A, as a decimal?", "Measuring {ctx}, the side opposite angle A is {opp} m and the hypotenuse is {hyp} m. What is sin A, as a decimal?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`sin A = opposite ÷ hypotenuse.`, `${t[0] * v[1]!} ÷ ${t[2] * v[1]!} = ${r}.`];
    },
    hints: () => ["SOH: sine = opposite ÷ hypotenuse."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Dans un triangle rectangle, le côté opposé à l'angle A mesure {opp} cm et l'hypoténuse {hyp} cm. Que vaut sin A, en décimal ?", "En mesurant {ctx}, le côté opposé à l'angle A est {opp} m et l'hypoténuse {hyp} m. Que vaut sin A, en décimal ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        return [`sin A = opposé ÷ hypoténuse.`, `${t[0] * v[1]!} ÷ ${t[2] * v[1]!} = ${r}.`];
      },
      hints: () => ["sinus = opposé ÷ hypoténuse."]
    },
    declaredVariationSpace: TRIPLES.length * 5
  }),
  arithmeticTemplate({
    key: "y9l7.cosineRatioAsDecimal", levelKey: "Y9L7", objectiveCode: "Y9-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 5]], compute: (v) => TRIPLES[v[0]!]![1] / TRIPLES[v[0]!]![2],
    derive: (v) => ({ adj: TRIPLES[v[0]!]![1] * v[1]!, hyp: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: ["In a right-angled triangle the side adjacent to angle A is {adj} cm and the hypotenuse is {hyp} cm. What is cos A, as a decimal?", "Measuring {ctx}, the side adjacent to angle A is {adj} m and the hypotenuse is {hyp} m. What is cos A, as a decimal?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`cos A = adjacent ÷ hypotenuse.`, `${t[1] * v[1]!} ÷ ${t[2] * v[1]!} = ${r}.`];
    },
    hints: () => ["CAH: cosine = adjacent ÷ hypotenuse."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Dans un triangle rectangle, le côté adjacent à l'angle A mesure {adj} cm et l'hypoténuse {hyp} cm. Que vaut cos A, en décimal ?", "En mesurant {ctx}, le côté adjacent à l'angle A est {adj} m et l'hypoténuse {hyp} m. Que vaut cos A, en décimal ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        return [`cos A = adjacent ÷ hypoténuse.`, `${t[1] * v[1]!} ÷ ${t[2] * v[1]!} = ${r}.`];
      },
      hints: () => ["cosinus = adjacent ÷ hypoténuse."]
    },
    declaredVariationSpace: TRIPLES.length * 5
  }),
  arithmeticTemplate({
    key: "y9l7.findOppositeFromSine", levelKey: "Y9L7", objectiveCode: "Y9-L7-2", difficulty: "REASONING",
    misconceptionTags: ["TRIG_RATIO_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 6]], compute: (v) => TRIPLES[v[0]!]![0] * v[1]!,
    derive: (v) => ({ hyp: TRIPLES[v[0]!]![2] * v[1]!, ratio: (TRIPLES[v[0]!]![0] / TRIPLES[v[0]!]![2]).toString() }),
    promptTemplates: ["In a right-angled triangle, sin A = {ratio} and the hypotenuse is {hyp} cm. How long is the side opposite angle A, in cm?", "For {ctx}, sin A = {ratio} and the hypotenuse is {hyp} m. How long is the side opposite angle A, in m?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`opposite = sin A x hypotenuse.`, `${t[0] / t[2]} x ${t[2] * v[1]!} = ${r}.`];
    },
    hints: () => ["Rearrange SOH: opposite = sine x hypotenuse."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Dans un triangle rectangle, sin A = {ratio} et l'hypoténuse mesure {hyp} cm. Quelle est la longueur du côté opposé à l'angle A, en cm ?", "Pour {ctx}, sin A = {ratio} et l'hypoténuse mesure {hyp} m. Quelle est la longueur du côté opposé à l'angle A, en m ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        return [`opposé = sin A x hypoténuse.`, `${t[0] / t[2]} x ${t[2] * v[1]!} = ${r}.`];
      },
      hints: () => ["Réarrange : opposé = sinus x hypoténuse."]
    },
    declaredVariationSpace: TRIPLES.length * 6
  }),
  arithmeticTemplate({
    key: "y9l7.tangentRatioAsDecimal", levelKey: "Y9L7", objectiveCode: "Y9-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, 2], [1, 14]], compute: (v) => [0.75, 0.75, 2.4][v[0]!]!,
    derive: (v) => {
      const pairs: Array<[number, number]> = [[3, 4], [6, 8], [24, 10]];
      const pair = pairs[v[0]!]!;
      return { opp: pair[0] * v[1]!, adj: pair[1] * v[1]! };
    },
    promptTemplates: ["In a right-angled triangle the side opposite angle A is {opp} cm and the adjacent side is {adj} cm. What is tan A, as a decimal?", "Measuring {ctx}, the side opposite angle A is {opp} m and the adjacent side is {adj} m. What is tan A, as a decimal?"],
    explain: (v, r) => [`tan A = opposite ÷ adjacent, which simplifies to ${r}.`],
    hints: () => ["TOA: tangent = opposite ÷ adjacent."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Dans un triangle rectangle, le côté opposé à l'angle A mesure {opp} cm et le côté adjacent {adj} cm. Que vaut tan A, en décimal ?", "En mesurant {ctx}, le côté opposé à l'angle A est {opp} m et le côté adjacent {adj} m. Que vaut tan A, en décimal ?"],
      explain: (v, r) => [`tan A = opposé ÷ adjacent, ce qui se simplifie en ${r}.`],
      hints: () => ["tangente = opposé ÷ adjacent."]
    },
    declaredVariationSpace: 3 * 8
  }),
  categoricalPoolTemplate({
    key: "y9l7.mcChooseTrigRatio", levelKey: "Y9L7", objectiveCode: "Y9-L7-2", difficulty: "APPLICATION",
    misconceptionTags: ["TRIG_RATIO_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { given: ["the opposite side and the hypotenuse", "the adjacent side and the hypotenuse", "the opposite side and the adjacent side"] },
    build: (picked, rng) => {
      const ratios: Record<string, string> = {
        "the opposite side and the hypotenuse": "sine",
        "the adjacent side and the hypotenuse": "cosine",
        "the opposite side and the adjacent side": "tangent"
      };
      const correct = ratios[picked.given!]!;
      const distractors = ["sine", "cosine", "tangent"].filter((r) => r !== correct);
      const size = rng.int(3, 40);
      return {
        prompt: `A right-angled triangle has a side of ${size} cm. You know ${picked.given}. Which trigonometric ratio should you use?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [`With ${picked.given}, use ${correct}.`],
        hints: ["SOH CAH TOA tells you which ratio links which pair of sides."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const givenFr: Record<string, string> = {
          "the opposite side and the hypotenuse": "le côté opposé et l'hypoténuse",
          "the adjacent side and the hypotenuse": "le côté adjacent et l'hypoténuse",
          "the opposite side and the adjacent side": "le côté opposé et le côté adjacent"
        };
        const ratioFr: Record<string, string> = { sine: "sinus", cosine: "cosinus", tangent: "tangente" };
        const m = drawn.prompt.match(/a side of (\d+) cm/);
        return {
          prompt: `Un triangle rectangle a un côté de ${m ? m[1] : ""} cm. Tu connais ${givenFr[picked.given!]}. Quel rapport trigonométrique faut-il utiliser ?`,
          correctLabel: ratioFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => ratioFr[d] ?? d),
          hints: ["SOH CAH TOA indique quel rapport relie quelle paire de côtés."]
        };
      }
    },
    declaredVariationSpace: 500
  }),

  // --- Y9-L7-3: trigonometric ratios to find angles ---
  arithmeticTemplate({
    key: "y9l7.angleFromTriple", levelKey: "Y9L7", objectiveCode: "Y9-L7-3", difficulty: "REASONING",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 6]],
    compute: (v) => Math.round((Math.asin(TRIPLES[v[0]!]![0] / TRIPLES[v[0]!]![2]) * 180) / Math.PI),
    derive: (v) => ({ opp: TRIPLES[v[0]!]![0] * v[1]!, hyp: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: ["In a right-angled triangle, the side opposite angle A is {opp} cm and the hypotenuse is {hyp} cm. What is angle A, to the nearest degree?", "For {ctx}, the side opposite angle A is {opp} m and the hypotenuse is {hyp} m. What is angle A, to the nearest degree?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`sin A = ${t[0] * v[1]!} ÷ ${t[2] * v[1]!} = ${(t[0] / t[2]).toFixed(4)}.`, `Using inverse sine gives ${r}°.`];
    },
    hints: () => ["Work out the sine ratio, then use inverse sine on your calculator."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Dans un triangle rectangle, le côté opposé à l'angle A mesure {opp} cm et l'hypoténuse {hyp} cm. Que vaut l'angle A, au degré près ?", "Pour {ctx}, le côté opposé à l'angle A mesure {opp} m et l'hypoténuse {hyp} m. Que vaut l'angle A, au degré près ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        return [`sin A = ${t[0] * v[1]!} ÷ ${t[2] * v[1]!} = ${(t[0] / t[2]).toFixed(4)}.`, `Le sinus inverse donne ${r}°.`];
      },
      hints: () => ["Calcule le rapport sinus, puis utilise le sinus inverse sur ta calculatrice."]
    },
    declaredVariationSpace: TRIPLES.length * 6
  }),
  arithmeticTemplate({
    key: "y9l7.angleFromCosine", levelKey: "Y9L7", objectiveCode: "Y9-L7-3", difficulty: "REASONING",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 6]],
    compute: (v) => Math.round((Math.acos(TRIPLES[v[0]!]![1] / TRIPLES[v[0]!]![2]) * 180) / Math.PI),
    derive: (v) => ({ adj: TRIPLES[v[0]!]![1] * v[1]!, hyp: TRIPLES[v[0]!]![2] * v[1]! }),
    promptTemplates: ["In a right-angled triangle, the side adjacent to angle A is {adj} cm and the hypotenuse is {hyp} cm. What is angle A, to the nearest degree?", "For {ctx}, the side adjacent to angle A is {adj} m and the hypotenuse is {hyp} m. What is angle A, to the nearest degree?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`cos A = ${t[1] * v[1]!} ÷ ${t[2] * v[1]!} = ${(t[1] / t[2]).toFixed(4)}.`, `Using inverse cosine gives ${r}°.`];
    },
    hints: () => ["Work out the cosine ratio, then use inverse cosine."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Dans un triangle rectangle, le côté adjacent à l'angle A mesure {adj} cm et l'hypoténuse {hyp} cm. Que vaut l'angle A, au degré près ?", "Pour {ctx}, le côté adjacent à l'angle A mesure {adj} m et l'hypoténuse {hyp} m. Que vaut l'angle A, au degré près ?"],
      explain: (v, r) => {
        const t = TRIPLES[v[0]!]!;
        return [`cos A = ${t[1] * v[1]!} ÷ ${t[2] * v[1]!} = ${(t[1] / t[2]).toFixed(4)}.`, `Le cosinus inverse donne ${r}°.`];
      },
      hints: () => ["Calcule le rapport cosinus, puis utilise le cosinus inverse."]
    },
    declaredVariationSpace: TRIPLES.length * 6
  }),
  arithmeticTemplate({
    key: "y9l7.thirdAngleInRightTriangle", levelKey: "Y9L7", objectiveCode: "Y9-L7-3", difficulty: "FLUENCY",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[1, 89]], compute: (v) => 90 - v[0]!,
    promptTemplates: ["A right-angled triangle has one other angle of {a}°. What is the remaining angle, in degrees?", "Measuring {ctx}, a right-angled triangle has one other angle of {a}°. What is the remaining angle, in degrees?"],
    explain: (v, r) => [`The angles total 180°, and one is 90°.`, `180 - 90 - ${v[0]} = ${r}.`],
    hints: () => ["In a right-angled triangle, the two non-right angles add to 90°."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Un triangle rectangle a un autre angle de {a}°. Quel est l'angle restant, en degrés ?", "En mesurant {ctx}, un triangle rectangle a un autre angle de {a}°. Quel est l'angle restant, en degrés ?"],
      explain: (v, r) => [`Les angles font 180° au total, et l'un vaut 90°.`, `180 - 90 - ${v[0]} = ${r}.`],
      hints: () => ["Dans un triangle rectangle, les deux angles non droits font 90° au total."]
    },
    declaredVariationSpace: 89
  }),
  arithmeticTemplate({
    key: "y9l7.angleFromTangent", levelKey: "Y9L7", objectiveCode: "Y9-L7-3", difficulty: "REASONING",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "NUMBER_ENTRY", contextPool: PLACES,
    ranges: [[0, TRIPLES.length - 1], [1, 6]],
    compute: (v) => Math.round((Math.atan(TRIPLES[v[0]!]![0] / TRIPLES[v[0]!]![1]) * 180) / Math.PI),
    derive: (v) => ({ opp: TRIPLES[v[0]!]![0] * v[1]!, adj: TRIPLES[v[0]!]![1] * v[1]! }),
    promptTemplates: ["For {ctx}, the vertical rise is {opp} m and the horizontal distance is {adj} m. What is the angle to the ground, to the nearest degree?"],
    explain: (v, r) => {
      const t = TRIPLES[v[0]!]!;
      return [`tan A = ${t[0] * v[1]!} ÷ ${t[1] * v[1]!} = ${(t[0] / t[1]).toFixed(4)}.`, `Inverse tangent gives ${r}°.`];
    },
    hints: () => ["Use tangent: rise ÷ horizontal distance, then inverse tangent."],
    fr: {
      contextPool: PLACES_FR,
      promptTemplates: ["Pour {ctx}, la montée verticale est de {opp} m et la distance horizontale de {adj} m. Quel est l'angle avec le sol, au degré près ?"],
      hints: () => ["Utilise la tangente : montée ÷ distance horizontale, puis la tangente inverse."]
    },
    declaredVariationSpace: TRIPLES.length * 6 * PLACES.length
  }),
  categoricalPoolTemplate({
    key: "y9l7.tfTrigAngle", levelKey: "Y9L7", objectiveCode: "Y9-L7-3", difficulty: "REASONING",
    misconceptionTags: ["TRIG_ANGLE_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const t = TRIPLES[rng.int(0, TRIPLES.length - 1)]!;
      const k = rng.int(1, 5);
      const trueAngle = Math.round((Math.asin(t[0] / t[2]) * 180) / Math.PI);
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? trueAngle : trueAngle + rng.int(2, 10);
      return {
        prompt: `A right-angled triangle has an opposite side of ${t[0] * k} cm and hypotenuse of ${t[2] * k} cm, so the angle is about ${shown}°. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`sin A = ${(t[0] / t[2]).toFixed(4)}, giving an angle of about ${trueAngle}°.`],
        hints: ["Work out the sine ratio and use inverse sine to check."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/opposite side of (\d+) cm and hypotenuse of (\d+) cm, so the angle is about (\d+)°/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `Un triangle rectangle a un côté opposé de ${m[1]} cm et une hypoténuse de ${m[2]} cm, donc l'angle vaut environ ${m[3]}°. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Calcule le rapport sinus et utilise le sinus inverse pour vérifier."]
        };
      }
    },
    declaredVariationSpace: TRIPLES.length * 5 * 2
  })
];

export default level;
