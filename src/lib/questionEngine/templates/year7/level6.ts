import { arithmeticTemplate, categoricalPoolTemplate, matchingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 7, Level 6 — "Algebraic notation and simplifying expressions"
const CTX = ["pencils", "stickers", "sweets", "marbles", "badges", "counters", "cards", "tokens"];
const CTX_FR = ["crayons", "autocollants", "bonbons", "billes", "badges", "jetons", "cartes", "jetons de jeu"];

export const level: QuestionTemplateDef[] = [
  // --- Y7-L6-1: use and interpret algebraic notation ---
  categoricalPoolTemplate({
    key: "y7l6.mcWriteAlgebraic", levelKey: "Y7L6", objectiveCode: "Y7-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["ALGEBRAIC_NOTATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { letter: ["n", "x", "y", "a", "b", "p"] },
    build: (picked, rng) => {
      const coeff = rng.int(2, 9);
      const letter = picked.letter!;
      return {
        prompt: `Write '${letter} multiplied by ${coeff}' using algebraic notation.`,
        correctLabel: `${coeff}${letter}`,
        distractorLabels: [`${letter}${coeff}`, `${letter}+${coeff}`],
        explanationSteps: [`In algebra, the number is written first and the multiplication sign is left out: ${coeff}${letter}.`],
        hints: ["Write the number before the letter, with no multiplication sign."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^Write '(\w) multiplied by (\d+)'/);
        if (!m) return {};
        void picked;
        return { prompt: `Écris « ${m[1]} multiplié par ${m[2]} » en notation algébrique.`, hints: ["Écris le nombre avant la lettre, sans signe de multiplication."] };
      }
    },
    declaredVariationSpace: 48
  }),
  categoricalPoolTemplate({
    key: "y7l6.mcInterpretExpression", levelKey: "Y7L6", objectiveCode: "Y7-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["ALGEBRAIC_NOTATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { letter: ["n", "x", "y", "a", "b", "p"] },
    build: (picked, rng) => {
      const coeff = rng.int(2, 9);
      const letter = picked.letter!;
      return {
        prompt: `What does ${coeff}${letter} mean?`,
        correctLabel: `${letter} multiplied by ${coeff}`,
        distractorLabels: [`${letter} plus ${coeff}`, `${letter} to the power of ${coeff}`],
        explanationSteps: [`${coeff}${letter} means ${letter} multiplied by ${coeff}.`],
        hints: ["A number written directly next to a letter means multiplication."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^What does (\d+)(\w) mean\?/);
        if (!m) return {};
        void picked;
        return { prompt: `Que signifie ${m[1]}${m[2]} ?`, hints: ["Un nombre écrit juste à côté d'une lettre signifie une multiplication."] };
      }
    },
    declaredVariationSpace: 48
  }),
  categoricalPoolTemplate({
    key: "y7l6.tfAlgebraicNotation", levelKey: "Y7L6", objectiveCode: "Y7-L6-1", difficulty: "REASONING",
    misconceptionTags: ["ALGEBRAIC_NOTATION_ERROR"], type: "TRUE_FALSE",
    pools: { letter1: ["x", "a", "p", "m", "r", "k"], letter2: ["y", "b", "q", "n", "s", "t"] },
    build: (picked, rng) => {
      const coeff = rng.int(1, 9);
      const showMultiply = rng.chance(0.5);
      const claim = showMultiply ? "multiplied together" : "added together";
      const shown = coeff === 1 ? `${picked.letter1}${picked.letter2}` : `${coeff}${picked.letter1}${picked.letter2}`;
      return {
        prompt: `${shown} means ${coeff === 1 ? "" : `${coeff}, `}${picked.letter1} and ${picked.letter2} ${claim}. True or false?`,
        correctLabel: showMultiply ? "True" : "False",
        distractorLabels: [showMultiply ? "False" : "True"],
        explanationSteps: [`Two letters (and any number) written next to each other, like ${shown}, always means multiplication.`],
        hints: ["Letters written side by side with no sign between them always means multiplication."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const isMultiply = drawn.correctLabel === "True";
        const claimFr = isMultiply ? "multipliés ensemble" : "additionnés ensemble";
        const m = drawn.prompt.match(/^(\S+) means/);
        const shown = m ? m[1]! : "";
        return {
          prompt: `${shown} signifie ${picked.letter1} et ${picked.letter2} ${claimFr}. Vrai ou faux ?`,
          correctLabel: isMultiply ? "Vrai" : "Faux",
          distractorLabels: [isMultiply ? "Faux" : "Vrai"],
          explanationSteps: [`Deux lettres (et tout nombre) écrites l'une à côté de l'autre, comme ${shown}, signifient toujours une multiplication.`],
          hints: ["Des lettres écrites côte à côte sans signe entre elles signifient toujours une multiplication."]
        };
      }
    },
    declaredVariationSpace: 648
  }),
  matchingTemplate({
    key: "y7l6.matchExpressionToDescription", levelKey: "Y7L6", objectiveCode: "Y7-L6-1", difficulty: "APPLICATION",
    misconceptionTags: ["ALGEBRAIC_NOTATION_ERROR"],
    generatePairs: (rng) => {
      const letters = rng.shuffle(["x", "y", "n", "a", "b", "p"]).slice(0, 3);
      return letters.map((letter) => {
        const coeff = rng.int(2, 9);
        return { left: `${coeff}${letter}`, right: `${letter} multiplied by ${coeff}` };
      });
    },
    promptTemplates: ["Match each expression to its meaning."],
    explain: () => ["A number next to a letter means the letter is multiplied by that number."],
    hints: () => ["Read the number as multiplying the letter."],
    fr: {
      promptTemplates: ["Associe chaque expression à sa signification."],
      explain: () => ["Un nombre à côté d'une lettre signifie que la lettre est multipliée par ce nombre."],
      hints: () => ["Lis le nombre comme multipliant la lettre."],
      translatePairs: (pairs) => pairs.map((p) => {
        const m = p.right.match(/^(\w) multiplied by (\d+)$/);
        if (!m) return p;
        return { left: p.left, right: `${m[1]} multiplié par ${m[2]}` };
      })
    },
    declaredVariationSpace: 2000
  }),
  categoricalPoolTemplate({
    key: "y7l6.mcIdentifyCoefficient", levelKey: "Y7L6", objectiveCode: "Y7-L6-1", difficulty: "FLUENCY",
    misconceptionTags: ["ALGEBRAIC_NOTATION_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { letter: ["x", "y", "n", "a", "b", "p"] },
    build: (picked, rng) => {
      const coeff = rng.int(2, 12);
      return {
        prompt: `What is the coefficient of ${picked.letter} in ${coeff}${picked.letter}?`,
        correctLabel: String(coeff),
        distractorLabels: [String(coeff + 1), String(Math.max(1, coeff - 1))],
        explanationSteps: [`The coefficient is the number in front of the letter: ${coeff}.`],
        hints: ["The coefficient is the number multiplying the letter."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^What is the coefficient of \w in (\d+)\w\?/);
        if (!m) return {};
        return { prompt: `Quel est le coefficient de ${picked.letter} dans ${m[1]}${picked.letter} ?`, hints: ["Le coefficient est le nombre devant la lettre."] };
      }
    },
    declaredVariationSpace: 66
  }),

  // --- Y7-L6-2: simplify and manipulate expressions by collecting like terms ---
  arithmeticTemplate({
    key: "y7l6.collectLikeTermsAdd", levelKey: "Y7L6", objectiveCode: "Y7-L6-2", difficulty: "FLUENCY",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["Simplify {a}x + {b}x. What is the coefficient of x?", "Collect like terms: {a}x + {b}x. Give the coefficient of x."],
    explain: (v, r) => [`${v[0]}x + ${v[1]}x = ${r}x.`],
    hints: () => ["Add the coefficients of the matching terms together."],
    fr: {
      promptTemplates: ["Simplifie {a}x + {b}x. Quel est le coefficient de x ?", "Regroupe les termes semblables : {a}x + {b}x. Donne le coefficient de x."],
      hints: () => ["Additionne les coefficients des termes semblables."]
    },
    declaredVariationSpace: 225
  }),
  arithmeticTemplate({
    key: "y7l6.collectLikeTermsSubtract", levelKey: "Y7L6", objectiveCode: "Y7-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]! - v[1]!,
    promptTemplates: ["Simplify {a}x - {b}x. What is the coefficient of x?", "Collect like terms: {a}x - {b}x. Give the coefficient of x."],
    explain: (v, r) => [`${v[0]}x - ${v[1]}x = ${r}x.`],
    hints: () => ["Subtract the coefficients of the matching terms."],
    fr: {
      promptTemplates: ["Simplifie {a}x - {b}x. Quel est le coefficient de x ?", "Regroupe les termes semblables : {a}x - {b}x. Donne le coefficient de x."],
      hints: () => ["Soustrais les coefficients des termes semblables."]
    },
    declaredVariationSpace: 225
  }),
  arithmeticTemplate({
    key: "y7l6.collectLikeTermsTwoVariables", levelKey: "Y7L6", objectiveCode: "Y7-L6-2", difficulty: "REASONING",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 12], [1, 12]], compute: (v) => v[0]! + v[2]!,
    promptTemplates: ["Simplify {a}x + {b}y + {c}x. What is the coefficient of x?"],
    explain: (v, r) => [`Only the x terms combine: ${v[0]}x + ${v[2]}x = ${r}x.`, `${v[1]}y stays separate.`],
    hints: () => ["Only combine terms with exactly the same letter."],
    fr: {
      promptTemplates: ["Simplifie {a}x + {b}y + {c}x. Quel est le coefficient de x ?"],
      hints: () => ["Ne combine que les termes qui ont exactement la même lettre."]
    },
    declaredVariationSpace: 12 * 12 * 12
  }),
  arithmeticTemplate({
    key: "y7l6.mcCollectLikeTerms", levelKey: "Y7L6", objectiveCode: "Y7-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: ["What does {a}x + {b}x simplify to?"],
    explain: (v, r) => [`${v[0]}x + ${v[1]}x = ${r}x.`],
    hints: () => ["Add the coefficients together."],
    distractorSpread: 4,
    formatValue: (n) => `${n}x`,
    fr: {
      promptTemplates: ["{a}x + {b}x se simplifie en quoi ?"],
      hints: () => ["Additionne les coefficients."]
    },
    declaredVariationSpace: 225
  }),
  categoricalPoolTemplate({
    key: "y7l6.tfCollectLikeTerms", levelKey: "Y7L6", objectiveCode: "Y7-L6-2", difficulty: "REASONING",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 15);
      const b = rng.int(1, 15);
      const correct = a + b;
      const showTrue = rng.chance(0.5);
      const shown = showTrue ? correct : correct + rng.int(1, 4);
      return {
        prompt: `${a}x + ${b}x simplifies to ${shown}x. True or false?`,
        correctLabel: showTrue ? "True" : "False",
        distractorLabels: [showTrue ? "False" : "True"],
        explanationSteps: [`${a}x + ${b}x = ${correct}x.`],
        hints: ["Add the coefficients of the like terms to check."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+)x \+ (\d+)x simplifies to (\d+)x\. True or false\?/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        return {
          prompt: `${m[1]}x + ${m[2]}x se simplifie en ${m[3]}x. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          hints: ["Additionne les coefficients des termes semblables pour vérifier."]
        };
      }
    },
    declaredVariationSpace: 225 * 2
  }),
  arithmeticTemplate({
    key: "y7l6.wordProblemLikeTerms", levelKey: "Y7L6", objectiveCode: "Y7-L6-2", difficulty: "APPLICATION",
    misconceptionTags: ["LIKE_TERMS_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 15], [1, 15]], compute: (v) => v[0]! + v[1]!, contextPool: CTX,
    promptTemplates: ["A rectangle has a width of {a}x and another width of {b}x added to it. What is the combined coefficient of x?"],
    explain: (v, r) => [`${v[0]}x + ${v[1]}x = ${r}x.`],
    hints: () => ["Add the coefficients of the matching terms together."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un rectangle a une largeur de {a}x et une autre largeur de {b}x lui est ajoutée. Quel est le coefficient combiné de x ?"],
      hints: () => ["Additionne les coefficients des termes semblables."]
    },
    declaredVariationSpace: 225 * CTX.length
  }),

  // --- Y7-L6-3: substitute numerical values into formulae and expressions ---
  arithmeticTemplate({
    key: "y7l6.substituteSingleVariable", levelKey: "Y7L6", objectiveCode: "Y7-L6-3", difficulty: "FLUENCY",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 12], [1, 20], [0, 15]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: ["If x = {b}, what is {a}x + {c}?", "Work out {a}x + {c} when x = {b}."],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Replace x with its value, then calculate."],
    fr: {
      promptTemplates: ["Si x = {b}, combien fait {a}x + {c} ?", "Calcule {a}x + {c} quand x = {b}."],
      hints: () => ["Remplace x par sa valeur, puis calcule."]
    },
    declaredVariationSpace: 12 * 20 * 16
  }),
  arithmeticTemplate({
    key: "y7l6.substituteTwoVariables", levelKey: "Y7L6", objectiveCode: "Y7-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 10], [1, 10], [1, 10], [1, 10]], compute: (v) => v[0]! * v[2]! + v[1]! * v[3]!,
    promptTemplates: ["If x = {c} and y = {d}, what is {a}x + {b}y?"],
    explain: (v, r) => [`${v[0]} x ${v[2]} = ${v[0]! * v[2]!}.`, `${v[1]} x ${v[3]} = ${v[1]! * v[3]!}.`, `${v[0]! * v[2]!} + ${v[1]! * v[3]!} = ${r}.`],
    hints: () => ["Substitute both values in, then calculate each term before adding."],
    fr: {
      promptTemplates: ["Si x = {c} et y = {d}, combien fait {a}x + {b}y ?"],
      hints: () => ["Remplace les deux valeurs, puis calcule chaque terme avant d'additionner."]
    },
    declaredVariationSpace: 10 * 10 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y7l6.mcSubstitute", levelKey: "Y7L6", objectiveCode: "Y7-L6-3", difficulty: "APPLICATION",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 12], [1, 20], [0, 15]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: ["If x = {b}, what is the value of {a}x + {c}?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} + ${v[2]} = ${r}.`],
    hints: () => ["Replace x with its value, then calculate."],
    distractorSpread: 10,
    fr: {
      promptTemplates: ["Si x = {b}, quelle est la valeur de {a}x + {c} ?"],
      hints: () => ["Remplace x par sa valeur, puis calcule."]
    },
    declaredVariationSpace: 12 * 20 * 16
  }),
  arithmeticTemplate({
    key: "y7l6.wordProblemSubstituteFormula", levelKey: "Y7L6", objectiveCode: "Y7-L6-3", difficulty: "REASONING",
    misconceptionTags: ["SUBSTITUTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1, 10], [1, 20], [0, 10]], compute: (v) => v[0]! * v[1]! + v[2]!, contextPool: CTX,
    promptTemplates: ["The cost in pence of buying {ctx} is given by the formula {a}n + {c}, where n is the number bought. If n = {b}, what is the cost?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}.`, `${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Substitute the number bought into the formula, then calculate."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Le coût en pence pour acheter des {ctx} est donné par la formule {a}n + {c}, où n est le nombre acheté. Si n = {b}, quel est le coût ?"],
      hints: () => ["Remplace le nombre acheté dans la formule, puis calcule."]
    },
    declaredVariationSpace: 10 * 20 * 11 * CTX.length
  })
];

export default level;
