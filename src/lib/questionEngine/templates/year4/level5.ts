import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 4, Level 5 — "Fractions and equivalent fractions"
const THINGS = ["sweets", "marbles", "stickers", "cubes", "beads", "counters", "cards", "pencils"];
const THINGS_FR = ["bonbons", "billes", "autocollants", "cubes", "perles", "jetons", "cartes", "crayons"];
const SHAPES = ["a rectangle", "a circle", "a strip of paper", "a chocolate bar", "a pizza", "a flag"];
const SHAPES_FR = ["un rectangle", "un cercle", "une bande de papier", "une tablette de chocolat", "une pizza", "un drapeau"];
const oneDp = (n: number) => n.toFixed(1);
const twoDp = (n: number) => n.toFixed(2);

export const level: QuestionTemplateDef[] = [
  // --- Y4-L5-1: families of equivalent fractions ---
  arithmeticTemplate({
    key: "y4l5.equivalentFractionNumerator", levelKey: "Y4L5", objectiveCode: "Y4-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["EQUIVALENT_FRACTION_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 12], [1, 11], [2, 8]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[1]! * v[2]!,
    derive: (v) => ({ newDen: v[0]! * v[2]! }),
    promptTemplates: [
      "{b}/{a} = ___/{newDen}. What is the missing numerator?",
      "Complete the equivalent fraction: {b}/{a} = ___/{newDen}."
    ],
    explain: (v, r) => [
      `The denominator was multiplied by ${v[2]} (${v[0]} x ${v[2]} = ${v[0]! * v[2]!}).`,
      `Do the same to the numerator: ${v[1]} x ${v[2]} = ${r}.`
    ],
    hints: () => ["Whatever you do to the bottom, do exactly the same to the top."],
    fr: {
      promptTemplates: [
        "{b}/{a} = ___/{newDen}. Quel numérateur manque ?",
        "Complète la fraction équivalente : {b}/{a} = ___/{newDen}."
      ],
      explain: (v, r) => [
        `Le dénominateur a été multiplié par ${v[2]} (${v[0]} x ${v[2]} = ${v[0]! * v[2]!}).`,
        `Fais pareil au numérateur : ${v[1]} x ${v[2]} = ${r}.`
      ],
      hints: () => ["Ce que tu fais en bas, fais exactement la même chose en haut."]
    },
    declaredVariationSpace: 10 * 11 * 7
  }),
  arithmeticTemplate({
    key: "y4l5.equivalentFractionDenominator", levelKey: "Y4L5", objectiveCode: "Y4-L5-1", difficulty: "APPLICATION",
    misconceptionTags: ["EQUIVALENT_FRACTION_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 12], [1, 11], [2, 8]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ newNum: v[1]! * v[2]! }),
    promptTemplates: [
      "{b}/{a} = {newNum}/___. What is the missing denominator?",
      "Complete the equivalent fraction: {b}/{a} = {newNum}/___."
    ],
    explain: (v, r) => [
      `The numerator was multiplied by ${v[2]} (${v[1]} x ${v[2]} = ${v[1]! * v[2]!}).`,
      `Do the same to the denominator: ${v[0]} x ${v[2]} = ${r}.`
    ],
    hints: () => ["Find what the top was multiplied by, then multiply the bottom by the same number."],
    fr: {
      promptTemplates: [
        "{b}/{a} = {newNum}/___. Quel dénominateur manque ?",
        "Complète la fraction équivalente : {b}/{a} = {newNum}/___."
      ],
      explain: (v, r) => [
        `Le numérateur a été multiplié par ${v[2]} (${v[1]} x ${v[2]} = ${v[1]! * v[2]!}).`,
        `Fais pareil au dénominateur : ${v[0]} x ${v[2]} = ${r}.`
      ],
      hints: () => ["Trouve par combien le haut a été multiplié, puis multiplie le bas par le même nombre."]
    },
    declaredVariationSpace: 10 * 11 * 7
  }),
  arithmeticTemplate({
    key: "y4l5.simplifyToUnitFraction", levelKey: "Y4L5", objectiveCode: "Y4-L5-1", difficulty: "REASONING",
    misconceptionTags: ["EQUIVALENT_FRACTION_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ num: v[1]!, den: v[0]! * v[1]! }),
    promptTemplates: [
      "{num}/{den} is the same as 1/___. What is the missing denominator?",
      "Simplify {num}/{den} to a unit fraction. What is the denominator?"
    ],
    explain: (v, r) => [
      `Divide both parts by ${v[1]}: ${v[1]} ÷ ${v[1]} = 1 and ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`,
      `So ${v[1]}/${v[0]! * v[1]!} = 1/${r}.`
    ],
    hints: () => ["Divide the top and the bottom by the same number until the top is 1."],
    fr: {
      promptTemplates: [
        "{num}/{den} est la même chose que 1/___. Quel dénominateur manque ?",
        "Simplifie {num}/{den} en une fraction unitaire. Quel est le dénominateur ?"
      ],
      explain: (v, r) => [
        `Divise les deux parties par ${v[1]} : ${v[1]} ÷ ${v[1]} = 1 et ${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`,
        `Donc ${v[1]}/${v[0]! * v[1]!} = 1/${r}.`
      ],
      hints: () => ["Divise le haut et le bas par le même nombre jusqu'à ce que le haut vaille 1."]
    },
    declaredVariationSpace: 11 * 8 * 2
  }),
  categoricalPoolTemplate({
    key: "y4l5.tfEquivalentFraction", levelKey: "Y4L5", objectiveCode: "Y4-L5-1", difficulty: "REASONING",
    misconceptionTags: ["EQUIVALENT_FRACTION_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const den = rng.int(3, 12);
      const num = rng.int(1, den - 1);
      const k = rng.int(2, 6);
      const isTrue = rng.chance(0.5);
      const shownNum = isTrue ? num * k : num * k + 1;
      return {
        prompt: `${num}/${den} is the same as ${shownNum}/${den * k}. True or false?`,
        correctLabel: isTrue ? "True" : "False",
        distractorLabels: [isTrue ? "False" : "True"],
        explanationSteps: [
          `${den} x ${k} = ${den * k}, so the numerator must also be multiplied by ${k}.`,
          `${num} x ${k} = ${num * k}.`,
          isTrue ? "That matches, so the fractions are equivalent." : `That does not match ${shownNum}, so they are not equivalent.`
        ],
        hints: ["Check whether the top and bottom were multiplied by the same number."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const m = drawn.prompt.match(/^(\S+) is the same as (\S+)\. True or false\?$/);
        if (!m) return {};
        return {
          prompt: `${m[1]} est la même chose que ${m[2]}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Vérifie si le haut et le bas ont été multipliés par le même nombre."]
        };
      }
    },
    declaredVariationSpace: 10 * 11 * 5 * 2
  }),
  arithmeticTemplate({
    key: "y4l5.unshadedParts", levelKey: "Y4L5", objectiveCode: "Y4-L5-1", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_PART_WHOLE_ERROR"], type: "WORD_PROBLEM", contextPool: SHAPES,
    ranges: [[3, 12], [1, 11]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "{ctx} is split into {a} equal parts and {b} are shaded. How many parts are not shaded?",
      "A shape has {a} equal parts. {b} of them are coloured. How many are left plain?"
    ],
    explain: (v, r) => [`The shaded and unshaded parts make the whole.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["All the parts together make the whole, so subtract the shaded ones."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "{ctx} est partagé en {a} parts égales et {b} sont coloriées. Combien de parts ne sont pas coloriées ?",
        "Une figure a {a} parts égales. {b} d'entre elles sont coloriées. Combien restent blanches ?"
      ],
      explain: (v, r) => [`Les parts coloriées et non coloriées forment le tout.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Toutes les parts forment le tout : retire celles qui sont coloriées."]
    },
    declaredVariationSpace: 10 * 11 * (1 + SHAPES.length)
  }),

  // --- Y4-L5-2: adding and subtracting fractions with the same denominator ---
  arithmeticTemplate({
    key: "y4l5.addFractionsSameDenom", levelKey: "Y4L5", objectiveCode: "Y4-L5-2", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_ADD_DENOMINATOR_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 12], [1, 11], [1, 11]],
    constraint: (v) => v[1]! < v[0]! && v[2]! < v[0]! && v[1]! + v[2]! <= v[0]!,
    compute: (v) => v[1]! + v[2]!,
    promptTemplates: [
      "{b}/{a} + {c}/{a} = ___/{a}. What is the missing numerator?",
      "Add {b}/{a} and {c}/{a}. What is the numerator of the answer?"
    ],
    explain: (v, r) => [`The denominators are the same, so just add the numerators.`, `${v[1]} + ${v[2]} = ${r}, giving ${r}/${v[0]}.`],
    hints: () => ["When the bottoms match, add only the top numbers — the bottom stays the same."],
    fr: {
      promptTemplates: [
        "{b}/{a} + {c}/{a} = ___/{a}. Quel numérateur manque ?",
        "Additionne {b}/{a} et {c}/{a}. Quel est le numérateur du résultat ?"
      ],
      explain: (v, r) => [`Les dénominateurs sont identiques : il suffit d'additionner les numérateurs.`, `${v[1]} + ${v[2]} = ${r}, soit ${r}/${v[0]}.`],
      hints: () => ["Quand les dénominateurs sont identiques, additionne seulement les numérateurs — le bas ne change pas."]
    },
    declaredVariationSpace: 10 * 11 * 11
  }),
  arithmeticTemplate({
    key: "y4l5.subtractFractionsSameDenom", levelKey: "Y4L5", objectiveCode: "Y4-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_ADD_DENOMINATOR_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 12], [2, 11], [1, 10]],
    constraint: (v) => v[1]! < v[0]! && v[2]! < v[1]!,
    compute: (v) => v[1]! - v[2]!,
    promptTemplates: [
      "{b}/{a} - {c}/{a} = ___/{a}. What is the missing numerator?",
      "Subtract {c}/{a} from {b}/{a}. What is the numerator of the answer?"
    ],
    explain: (v, r) => [`The denominators match, so subtract the numerators.`, `${v[1]} - ${v[2]} = ${r}, giving ${r}/${v[0]}.`],
    hints: () => ["Only the top numbers change when the bottoms are the same."],
    fr: {
      promptTemplates: [
        "{b}/{a} - {c}/{a} = ___/{a}. Quel numérateur manque ?",
        "Retire {c}/{a} de {b}/{a}. Quel est le numérateur du résultat ?"
      ],
      explain: (v, r) => [`Les dénominateurs sont identiques : soustrais les numérateurs.`, `${v[1]} - ${v[2]} = ${r}, soit ${r}/${v[0]}.`],
      hints: () => ["Seuls les numérateurs changent quand les dénominateurs sont identiques."]
    },
    declaredVariationSpace: 10 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y4l5.completeToWhole", levelKey: "Y4L5", objectiveCode: "Y4-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_PART_WHOLE_ERROR"], type: "MULTI_STEP", contextPool: SHAPES,
    ranges: [[3, 12], [1, 11]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "{b}/{a} + ___/{a} = 1. What is the missing numerator?",
      "{ctx} is cut into {a} equal parts and {b} are eaten. What fraction is left? Give the numerator."
    ],
    explain: (v, r) => [`A whole is ${v[0]}/${v[0]}.`, `${v[0]} - ${v[1]} = ${r}, so the missing fraction is ${r}/${v[0]}.`],
    hints: () => ["One whole is the denominator over itself — so make the numerators add up to the denominator."],
    fr: {
      contextPool: SHAPES_FR,
      promptTemplates: [
        "{b}/{a} + ___/{a} = 1. Quel numérateur manque ?",
        "{ctx} est coupé en {a} parts égales et {b} sont mangées. Quelle fraction reste-t-il ? Donne le numérateur."
      ],
      explain: (v, r) => [`Un tout vaut ${v[0]}/${v[0]}.`, `${v[0]} - ${v[1]} = ${r}, donc la fraction manquante est ${r}/${v[0]}.`],
      hints: () => ["Un tout, c'est le dénominateur sur lui-même — fais en sorte que les numérateurs s'additionnent au dénominateur."]
    },
    declaredVariationSpace: 10 * 11 * (1 + SHAPES.length)
  }),
  arithmeticTemplate({
    key: "y4l5.unitFractionOfAmount", levelKey: "Y4L5", objectiveCode: "Y4-L5-2", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MULTI_STEP", contextPool: THINGS,
    ranges: [[2, 12], [2, 30]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "What is 1/{a} of {total}?",
      "{total} {ctx} are shared equally between {a} children. How many does each get?"
    ],
    explain: (v, r) => [`Finding 1/${v[0]} means dividing by ${v[0]}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["A unit fraction of an amount means divide by the denominator."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Que vaut 1/{a} de {total} ?",
        "{total} {ctx} sont partagés également entre {a} enfants. Combien chacun en reçoit-il ?"
      ],
      explain: (v, r) => [`Trouver 1/${v[0]} revient à diviser par ${v[0]}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Une fraction unitaire d'une quantité signifie diviser par le dénominateur."]
    },
    declaredVariationSpace: 11 * 29 * (1 + THINGS.length)
  }),
  arithmeticTemplate({
    key: "y4l5.nonUnitFractionOfAmount", levelKey: "Y4L5", objectiveCode: "Y4-L5-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MULTI_STEP", contextPool: THINGS,
    ranges: [[3, 12], [2, 20], [2, 11]], constraint: (v) => v[2]! < v[0]!,
    compute: (v) => v[2]! * v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! }),
    promptTemplates: [
      "What is {c}/{a} of {total}?",
      "{c}/{a} of {total} {ctx} are red. How many is that?"
    ],
    explain: (v, r) => [
      `First find 1/${v[0]}: ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`,
      `Then multiply by ${v[2]}: ${v[1]} x ${v[2]} = ${r}.`
    ],
    hints: () => ["Divide by the bottom number, then multiply by the top number."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Que vaut {c}/{a} de {total} ?",
        "{c}/{a} de {total} {ctx} sont rouges. Combien cela fait-il ?"
      ],
      explain: (v, r) => [
        `Trouve d'abord 1/${v[0]} : ${v[0]! * v[1]!} ÷ ${v[0]} = ${v[1]}.`,
        `Puis multiplie par ${v[2]} : ${v[1]} x ${v[2]} = ${r}.`
      ],
      hints: () => ["Divise par le nombre du bas, puis multiplie par celui du haut."]
    },
    declaredVariationSpace: 10 * 19 * 10
  }),
  arithmeticTemplate({
    key: "y4l5.wholeFromUnitFraction", levelKey: "Y4L5", objectiveCode: "Y4-L5-2", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 12], [2, 40]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "1/{a} of a number is {b}. What is the number?",
      "A number is shared into {a} equal parts and each part is {b}. What was the number?"
    ],
    explain: (v, r) => [`If one part is ${v[1]} and there are ${v[0]} parts, multiply.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Going backwards from a unit fraction means multiplying by the denominator."],
    fr: {
      promptTemplates: [
        "1/{a} d'un nombre vaut {b}. Quel est ce nombre ?",
        "Un nombre est partagé en {a} parts égales et chaque part vaut {b}. Quel était ce nombre ?"
      ],
      explain: (v, r) => [`Si une part vaut ${v[1]} et qu'il y a ${v[0]} parts, multiplie.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Revenir en arrière depuis une fraction unitaire revient à multiplier par le dénominateur."]
    },
    declaredVariationSpace: 11 * 39 * 2
  }),

  // --- Y4-L5-3: decimal equivalents of common fractions ---
  arithmeticTemplate({
    key: "y4l5.halvesAsDecimal", levelKey: "Y4L5", objectiveCode: "Y4-L5-3", difficulty: "FLUENCY",
    misconceptionTags: ["FRACTION_DECIMAL_LINK_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 99]], compute: (v) => v[0]! / 2, formatValue: oneDp,
    derive: (v) => ({ num: v[0]! }),
    promptTemplates: [
      "Write {num}/2 as a decimal.",
      "What is {num} divided by 2, written as a decimal?",
      "Half of {num} is what, as a decimal?"
    ],
    explain: (v, r) => [`${v[0]} ÷ 2 = ${r}.`, `Half of an odd number always ends in .5.`],
    hints: () => ["Halving an even number gives a whole; halving an odd number gives a half."],
    fr: {
      promptTemplates: [
        "Écris {num}/2 sous forme décimale.",
        "Que vaut {num} divisé par 2, en écriture décimale ?",
        "La moitié de {num} vaut combien, en décimal ?"
      ],
      explain: (v, r) => [`${v[0]} ÷ 2 = ${r}.`, `La moitié d'un nombre impair se termine toujours par ,5.`],
      hints: () => ["La moitié d'un nombre pair donne un entier ; celle d'un nombre impair donne un demi."]
    },
    declaredVariationSpace: 99 * 3
  }),
  arithmeticTemplate({
    key: "y4l5.quartersAsDecimal", levelKey: "Y4L5", objectiveCode: "Y4-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DECIMAL_LINK_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 3], [0, 40]], compute: (v) => v[1]! + v[0]! / 4, formatValue: twoDp,
    derive: (v) => ({ q: v[0]!, whole: v[1]! }),
    promptTemplates: [
      "Write {whole} and {q}/4 as a decimal.",
      "A jug holds {whole} and {q}/4 litres. Write that as a decimal number of litres.",
      "What is {whole} + {q}/4 as a decimal?"
    ],
    explain: (v, r) => [
      `1/4 = 0.25, so ${v[0]}/4 = ${(v[0]! / 4).toFixed(2)}.`,
      `${v[1]} + ${(v[0]! / 4).toFixed(2)} = ${r}.`
    ],
    hints: () => ["Learn these by heart: 1/4 = 0.25, 1/2 = 0.5 and 3/4 = 0.75."],
    fr: {
      promptTemplates: [
        "Écris {whole} et {q}/4 sous forme décimale.",
        "Un pichet contient {whole} et {q}/4 litres. Écris cela en nombre décimal de litres.",
        "Que vaut {whole} + {q}/4 en écriture décimale ?"
      ],
      explain: (v, r) => [
        `1/4 = 0,25, donc ${v[0]}/4 = ${(v[0]! / 4).toFixed(2)}.`,
        `${v[1]} + ${(v[0]! / 4).toFixed(2)} = ${r}.`
      ],
      hints: () => ["Apprends-les par cœur : 1/4 = 0,25, 1/2 = 0,5 et 3/4 = 0,75."]
    },
    declaredVariationSpace: 3 * 41 * 3
  }),
  categoricalPoolTemplate({
    key: "y4l5.mcDecimalEquivalent", levelKey: "Y4L5", objectiveCode: "Y4-L5-3", difficulty: "APPLICATION",
    misconceptionTags: ["FRACTION_DECIMAL_LINK_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { fraction: ["1/4", "1/2", "3/4"] },
    build: (picked, rng) => {
      const whole = rng.int(0, 60);
      const values: Record<string, number> = { "1/4": 0.25, "1/2": 0.5, "3/4": 0.75 };
      const fraction = picked.fraction!;
      const correct = (whole + values[fraction]!).toFixed(2);
      const wrong = Object.entries(values)
        .filter(([f]) => f !== fraction)
        .map(([, val]) => (whole + val).toFixed(2));
      wrong.push((whole + 1).toFixed(2));
      return {
        prompt: `Write ${whole} and ${fraction} as a decimal.`,
        correctLabel: correct,
        distractorLabels: wrong.filter((w) => w !== correct).slice(0, 3),
        explanationSteps: [`${fraction} = ${values[fraction]!.toFixed(2)}.`, `${whole} + ${values[fraction]!.toFixed(2)} = ${correct}.`],
        hints: ["Quarters are 0.25, 0.5 and 0.75 — learn the three by heart."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Write (\d+) and (\S+) as a decimal\.$/);
        if (!m) return {};
        return {
          prompt: `Écris ${m[1]} et ${m[2]} sous forme décimale.`,
          explanationSteps: drawn.explanationSteps.map((e) => e.replace(/\./g, ",").replace(/,$/, ".")),
          hints: ["Les quarts valent 0,25, 0,5 et 0,75 — apprends ces trois par cœur."]
        };
      }
    },
    declaredVariationSpace: 3 * 61
  }),
  arithmeticTemplate({
    key: "y4l5.quarterOfAmountDecimalLink", levelKey: "Y4L5", objectiveCode: "Y4-L5-3", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_OF_AMOUNT_ERROR"], type: "MULTI_STEP", contextPool: THINGS,
    ranges: [[1, 3], [2, 40]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ q: v[0]!, total: 4 * v[1]! }),
    promptTemplates: [
      "What is {q}/4 of {total}?",
      "{q}/4 of {total} {ctx} are blue. How many is that?"
    ],
    explain: (v, r) => [
      `1/4 of ${4 * v[1]!} is ${4 * v[1]!} ÷ 4 = ${v[1]}.`,
      `${v[0]} x ${v[1]} = ${r}.`
    ],
    hints: () => ["Divide by 4 to find a quarter, then multiply by how many quarters you need."],
    fr: {
      contextPool: THINGS_FR,
      promptTemplates: [
        "Que vaut {q}/4 de {total} ?",
        "{q}/4 de {total} {ctx} sont bleus. Combien cela fait-il ?"
      ],
      explain: (v, r) => [
        `1/4 de ${4 * v[1]!} vaut ${4 * v[1]!} ÷ 4 = ${v[1]}.`,
        `${v[0]} x ${v[1]} = ${r}.`
      ],
      hints: () => ["Divise par 4 pour trouver un quart, puis multiplie par le nombre de quarts voulus."]
    },
    declaredVariationSpace: 3 * 39 * (1 + THINGS.length)
  }),
  categoricalPoolTemplate({
    key: "y4l5.mcCompareFractions", levelKey: "Y4L5", objectiveCode: "Y4-L5-1", difficulty: "REASONING",
    misconceptionTags: ["FRACTION_COMPARISON_ERROR"], type: "MULTIPLE_CHOICE",
    pools: {},
    build: (_picked, rng) => {
      const den = rng.int(3, 12);
      const a = rng.int(1, den - 1);
      let b = rng.int(1, den - 1);
      if (b === a) b = a === 1 ? a + 1 : a - 1;
      const bigger = a > b ? `${a}/${den}` : `${b}/${den}`;
      const smaller = a > b ? `${b}/${den}` : `${a}/${den}`;
      return {
        prompt: `Which fraction is larger: ${a}/${den} or ${b}/${den}?`,
        correctLabel: bigger,
        distractorLabels: [smaller, "they are equal"],
        explanationSteps: [`The denominators are the same, so the fraction with the bigger numerator is larger.`, `${bigger} is larger.`],
        hints: ["When the bottoms match, just compare the top numbers."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which fraction is larger: (\S+) or (\S+)\?$/);
        if (!m) return {};
        return {
          prompt: `Quelle fraction est la plus grande : ${m[1]} ou ${m[2]} ?`,
          correctLabel: drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => (d === "they are equal" ? "elles sont égales" : d)),
          explanationSteps: ["Les dénominateurs sont identiques : la fraction avec le plus grand numérateur est la plus grande."],
          hints: ["Quand les dénominateurs sont identiques, compare simplement les numérateurs."]
        };
      }
    },
    declaredVariationSpace: 10 * 11 * 11
  })
];

export default level;
