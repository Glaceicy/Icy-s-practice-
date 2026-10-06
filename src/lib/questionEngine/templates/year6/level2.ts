import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 6, Level 2 — "The four operations and multi-step problems"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y6-L2-1 formal written multiplication of
// up to 4-digit by 2-digit numbers, Y6-L2-2 division up to 4 digits by a
// 2-digit number with remainders, Y6-L2-3 multi-step problems using all
// four operations with estimation to check).
const CTX = ["boxes", "crates", "pallets", "components", "units", "parcels", "cartons", "batches"];
const CTX_FR = ["boîtes", "caisses", "palettes", "composants", "unités", "colis", "cartons", "lots"];

export const level: QuestionTemplateDef[] = [
  // --- Y6-L2-1: multiply up to a 4-digit number by a 2-digit number ---
  arithmeticTemplate({
    key: "y6l2.multiply4dBy2d", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1000, 9999], [10, 99]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["{a} x {b} = ?", "Use the formal written method: {a} x {b} = ?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply by the ones digit first, then the tens digit, then add the results."],
    declaredVariationSpace: 9000 * 90 * 2,
    fr: {
      promptTemplates: ["{a} x {b} = ?", "Utilise la méthode écrite formelle : {a} x {b} = ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie d'abord par le chiffre des unités, puis par le chiffre des dizaines, puis additionne les résultats."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.multiplyThreeDigitBy2d", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "FLUENCY",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[100, 999], [10, 99]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["{a} x {b} = ?", "Use the formal written method: {a} x {b} = ?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply by the ones digit first, then the tens digit, then add the results."],
    declaredVariationSpace: 900 * 90 * 2,
    fr: {
      promptTemplates: ["{a} x {b} = ?", "Utilise la méthode écrite formelle : {a} x {b} = ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie d'abord par le chiffre des unités, puis par le chiffre des dizaines, puis additionne les résultats."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.mcMultiply4dBy2d", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "MULTIPLE_CHOICE",
    ranges: [[1000, 9999], [10, 99]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["What is {a} x {b}?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Break the multiplication into tens and ones, then add the two parts."],
    distractorSpread: 1000,
    declaredVariationSpace: 9000 * 90,
    fr: {
      promptTemplates: ["Combien font {a} x {b} ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Décompose la multiplication en dizaines et unités, puis additionne les deux parties."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.missingFactorMultiply", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1000, 9999], [10, 99]], compute: (v) => v[1]!,
    derive: (v) => ({ product: v[0]! * v[1]! }),
    promptTemplates: ["{a} x ___ = {product}. What is the missing number?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, using the inverse operation (division).`],
    hints: () => ["Use division, the inverse of multiplication, to find the missing factor."],
    declaredVariationSpace: 9000 * 90,
    fr: {
      promptTemplates: ["{a} x ___ = {product}. Quel est le nombre manquant ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r}, en utilisant l'opération inverse (la division).`],
      hints: () => ["Utilise la division, l'inverse de la multiplication, pour trouver le facteur manquant."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.estimateProductBeforeMultiplying", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1000, 9999], [10, 99]], compute: (v) => Math.round(v[0]! / 1000) * 1000 * (Math.round(v[1]! / 10) * 10),
    promptTemplates: ["Estimate {a} x {b} by rounding {a} to the nearest 1,000 and {b} to the nearest 10 first."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 1000) * 1000}. ${v[1]} rounds to ${Math.round(v[1]! / 10) * 10}. ${Math.round(v[0]! / 1000) * 1000} x ${Math.round(v[1]! / 10) * 10} = ${r}.`],
    hints: () => ["Round each number before multiplying to get a sensible estimate."],
    declaredVariationSpace: 9000 * 90,
    fr: {
      promptTemplates: ["Estime {a} x {b} en arrondissant d'abord {a} au millier près et {b} à la dizaine près."],
      explain: (v, r) => [`${v[0]} s'arrondit à ${Math.round(v[0]! / 1000) * 1000}. ${v[1]} s'arrondit à ${Math.round(v[1]! / 10) * 10}. ${Math.round(v[0]! / 1000) * 1000} x ${Math.round(v[1]! / 10) * 10} = ${r}.`],
      hints: () => ["Arrondis chaque nombre avant de multiplier pour obtenir une estimation raisonnable."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.wordProblemMultiply4dBy2d", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "WORD_PROBLEM",
    ranges: [[1000, 9999], [10, 99]], compute: (v) => v[0]! * v[1]!, contextPool: CTX,
    promptTemplates: ["A factory produces {a} {ctx} each day. How many {ctx} does it produce in {b} days?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Use the formal written method to multiply the daily amount by the number of days."],
    declaredVariationSpace: 9000 * 90 * CTX.length,
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Une usine produit {a} {ctx} chaque jour. Combien {de:ctx} produit-elle en {b} jours ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Utilise la méthode écrite formelle pour multiplier la quantité journalière par le nombre de jours."]
    }
  }),
  categoricalPoolTemplate({
    key: "y6l2.tfMultiplyCheck", levelKey: "Y6L2", objectiveCode: "Y6-L2-1", difficulty: "REASONING",
    misconceptionTags: ["COLUMN_CARRY_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1000, 9999);
      const b = rng.int(10, 99);
      const product = a * b;
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? product : numericDistractors(rng, product, 1, 1000)[0] ?? product + 1000;
      return {
        prompt: `${a.toLocaleString("en-GB")} x ${b} = ${shown.toLocaleString("en-GB")}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${a.toLocaleString("en-GB")} x ${b} = ${product.toLocaleString("en-GB")}.`],
        hints: ["Work out the product and check it against the statement."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^([\d,]+) x (-?\d+) = ([\d,]+)\./);
        const [aStr, b, shownStr] = m ? m.slice(1) : ["", "", ""];
        const isTrueCase = drawn.correctLabel === "True";
        const product = Number((aStr ?? "").replace(/,/g, "")) * Number(b);
        return {
          prompt: `${aStr} x ${b} = ${shownStr}. Vrai ou faux ?`,
          correctLabel: isTrueCase ? "Vrai" : "Faux",
          distractorLabels: [isTrueCase ? "Faux" : "Vrai"],
          explanationSteps: [`${aStr} x ${b} = ${product.toLocaleString("en-GB")}.`],
          hints: ["Calcule le produit et vérifie-le par rapport à l'énoncé."]
        };
      }
    },
    declaredVariationSpace: 9000 * 90 * 2
  }),

  // --- Y6-L2-2: divide up to a 4-digit number by a 2-digit number, interpreting remainders ---
  arithmeticTemplate({
    key: "y6l2.divideExact", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [11, 99]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * v[1]! }),
    promptTemplates: ["{dividend} ÷ {b} = ?", "Use long division: {dividend} ÷ {b} = ?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
    hints: () => ["Use the formal division method, working from the largest place value."],
    declaredVariationSpace: 90 * 89 * 2,
    fr: {
      promptTemplates: ["{dividend} ÷ {b} = ?", "Utilise la division posée : {dividend} ÷ {b} = ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r}.`],
      hints: () => ["Utilise la méthode de division formelle, en partant de la plus grande valeur de position."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.divideFindQuotientWithRemainder", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [11, 99], [1, 10]], compute: (v) => v[0]!,
    derive: (v) => ({ dividend: v[0]! * v[1]! + v[2]! }),
    promptTemplates: ["What is {dividend} ÷ {b}, as a whole number (ignoring the remainder)?"],
    explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[1]} = ${r} remainder ${v[2]}.`],
    hints: () => ["Divide as normal; the whole number part is the answer, ignoring what's left over."],
    declaredVariationSpace: 90 * 89 * 10,
    fr: {
      promptTemplates: ["Combien font {dividend} ÷ {b}, comme nombre entier (sans tenir compte du reste) ?"],
      explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[1]} = ${r} reste ${v[2]}.`],
      hints: () => ["Divise normalement ; la partie entière est la réponse, sans tenir compte du reste."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.divideFindRemainder", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 99], [11, 99], [1, 10]], compute: (v) => v[2]!,
    derive: (v) => ({ dividend: v[0]! * v[1]! + v[2]! }),
    promptTemplates: ["What is the remainder when {dividend} is divided by {b}?"],
    explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[1]} = ${v[0]} remainder ${r}.`],
    hints: () => ["Divide as normal; the remainder is what's left over after the last whole group."],
    declaredVariationSpace: 90 * 89 * 10,
    fr: {
      promptTemplates: ["Quel est le reste quand {dividend} est divisé par {b} ?"],
      explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[1]} = ${v[0]} reste ${r}.`],
      hints: () => ["Divise normalement ; le reste est ce qu'il reste après le dernier groupe complet."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.wordProblemRemainderRoundUp", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "REASONING",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[11, 99], [10, 99], [1, 10]], compute: (v) => v[1]! + 1,
    derive: (v) => ({ total: v[0]! * v[1]! + v[2]! }),
    promptTemplates: ["{total} people need seats on coaches that each hold {a} people. How many coaches are needed so that everyone has a seat?"],
    explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[0]} = ${v[1]} remainder ${v[2]}. An extra coach is needed for the leftover people, so ${r} coaches are needed.`],
    hints: () => ["Divide the total by the capacity, then round up if there's a remainder."],
    declaredVariationSpace: 89 * 90 * 10,
    fr: {
      promptTemplates: ["{total} personnes ont besoin de places dans des autocars pouvant accueillir {a} personnes chacun. Combien d'autocars faut-il pour que tout le monde ait une place ?"],
      explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[0]} = ${v[1]} reste ${v[2]}. Un autocar supplémentaire est nécessaire pour les personnes restantes, donc il faut ${r} autocars.`],
      hints: () => ["Divise le total par la capacité, puis arrondis vers le haut s'il y a un reste."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.wordProblemRemainderRoundDown", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "REASONING",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "WORD_PROBLEM",
    ranges: [[11, 99], [10, 99], [1, 10]], compute: (v) => v[1]!,
    derive: (v) => ({ total: v[0]! * v[1]! + v[2]! }),
    promptTemplates: ["How many complete teams of {a} players can be made from {total} players?"],
    explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[0]} = ${v[1]} remainder ${v[2]}. Only the whole number of complete teams counts, so the answer is ${r}.`],
    hints: () => ["Divide the total by the team size, then ignore any remainder."],
    declaredVariationSpace: 89 * 90 * 10,
    fr: {
      promptTemplates: ["Combien d'équipes complètes de {a} joueurs peut-on former avec {total} joueurs ?"],
      explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} ÷ ${v[0]} = ${v[1]} reste ${v[2]}. Seul le nombre entier d'équipes complètes compte, donc la réponse est ${r}.`],
      hints: () => ["Divise le total par la taille de l'équipe, puis ignore le reste."]
    }
  }),
  categoricalPoolTemplate({
    key: "y6l2.mcDivideWithRemainder", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["DIVISION_SHARING_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const divisor = rng.int(11, 99);
      const quotient = rng.int(10, 99);
      const remainder = rng.int(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      const distractors = numericDistractors(rng, quotient, 3, 5).map(String);
      return {
        prompt: `What is ${dividend.toLocaleString("en-GB")} ÷ ${divisor}, giving the whole number part?`,
        correctLabel: String(quotient),
        distractorLabels: distractors,
        explanationSteps: [`${dividend.toLocaleString("en-GB")} ÷ ${divisor} = ${quotient} remainder ${remainder}.`],
        hints: ["Divide as normal; the whole number part comes before the remainder."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^What is ([\d,]+) ÷ (-?\d+), giving the whole number part\?/);
        const [dividendStr, divisor] = m ? m.slice(1) : ["", ""];
        const dividend = Number((dividendStr ?? "").replace(/,/g, ""));
        const divisorNum = Number(divisor);
        const quotient = Number(drawn.correctLabel);
        const remainder = dividend - quotient * divisorNum;
        return {
          prompt: `Combien font ${dividendStr} ÷ ${divisor}, en donnant la partie entière ?`,
          explanationSteps: [`${dividendStr} ÷ ${divisor} = ${quotient} reste ${remainder}.`],
          hints: ["Divise normalement ; la partie entière vient avant le reste."]
        };
      }
    },
    declaredVariationSpace: 89 * 90 * 89
  }),
  arithmeticTemplate({
    key: "y6l2.missingDividendFromDivision", levelKey: "Y6L2", objectiveCode: "Y6-L2-2", difficulty: "REASONING",
    misconceptionTags: ["INVERSE_OPERATION_ERROR"], type: "MISSING_NUMBER",
    ranges: [[10, 99], [11, 99]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["___ ÷ {b} = {a}. What is the missing number?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}, using the inverse operation (multiplication).`],
    hints: () => ["Use multiplication, the inverse of division, to find the missing dividend."],
    declaredVariationSpace: 90 * 89,
    fr: {
      promptTemplates: ["___ ÷ {b} = {a}. Quel est le nombre manquant ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r}, en utilisant l'opération inverse (la multiplication).`],
      hints: () => ["Utilise la multiplication, l'inverse de la division, pour trouver le dividende manquant."]
    }
  }),

  // --- Y6-L2-3: solve multi-step problems using all four operations, using estimation to check ---
  arithmeticTemplate({
    key: "y6l2.multiStepAddMultiply", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "WORD_PROBLEM",
    ranges: [[5, 50], [5, 50], [1, 99]], compute: (v) => v[0]! * v[1]! + v[2]!,
    promptTemplates: ["A cinema has {a} rows of {b} seats, plus {c} extra seats at the back. How many seats are there in total?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}. ${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
    hints: () => ["Multiply the rows and seats first, then add the extra seats."],
    declaredVariationSpace: 46 * 46 * 99,
    fr: {
      promptTemplates: ["Un cinéma a {a} rangées de {b} sièges, plus {c} sièges supplémentaires au fond. Combien y a-t-il de sièges au total ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!}. ${v[0]! * v[1]!} + ${v[2]} = ${r}.`],
      hints: () => ["Multiplie d'abord les rangées et les sièges, puis ajoute les sièges supplémentaires."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.multiStepSubtractDivide", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 99], [10, 99], [10, 199]], compute: (v) => v[1]!,
    derive: (v) => ({ boxSize: v[0]!, removed: v[2]!, total: v[0]! * v[1]! + v[2]! }),
    promptTemplates: ["A factory produced {total} items. {removed} were faulty and removed. The rest were packed into boxes of {boxSize}. How many boxes were needed?"],
    explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} - ${v[2]} = ${v[0]! * v[1]!}. ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Subtract the faulty items first, then divide the rest by the box size."],
    declaredVariationSpace: 90 * 90 * 190,
    fr: {
      promptTemplates: ["Une usine a produit {total} articles. {removed} étaient défectueux et ont été retirés. Le reste a été emballé dans des boîtes de {boxSize}. Combien de boîtes ont été nécessaires ?"],
      explain: (v, r) => [`${v[0]! * v[1]! + v[2]!} - ${v[2]} = ${v[0]! * v[1]!}. ${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Soustrais d'abord les articles défectueux, puis divise le reste par la taille des boîtes."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.wordProblemEstimateMultiStep", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 999], [100, 999], [10, 99]],
    constraint: (v) => Math.round(v[0]! / 10) * 10 + Math.round(v[1]! / 10) * 10 > Math.round(v[2]! / 10) * 10,
    compute: (v) => Math.round(v[0]! / 10) * 10 + Math.round(v[1]! / 10) * 10 - Math.round(v[2]! / 10) * 10,
    promptTemplates: ["Estimate {a} + {b} - {c} by rounding each number to the nearest 10 first."],
    explain: (v, r) => [`${v[0]} rounds to ${Math.round(v[0]! / 10) * 10}. ${v[1]} rounds to ${Math.round(v[1]! / 10) * 10}. ${v[2]} rounds to ${Math.round(v[2]! / 10) * 10}. ${Math.round(v[0]! / 10) * 10} + ${Math.round(v[1]! / 10) * 10} - ${Math.round(v[2]! / 10) * 10} = ${r}.`],
    hints: () => ["Round each number to the nearest 10 before working out the estimate."],
    declaredVariationSpace: 900 * 900 * 90,
    fr: {
      promptTemplates: ["Estime {a} + {b} - {c} en arrondissant d'abord chaque nombre à la dizaine près."],
      explain: (v, r) => [`${v[0]} s'arrondit à ${Math.round(v[0]! / 10) * 10}. ${v[1]} s'arrondit à ${Math.round(v[1]! / 10) * 10}. ${v[2]} s'arrondit à ${Math.round(v[2]! / 10) * 10}. ${Math.round(v[0]! / 10) * 10} + ${Math.round(v[1]! / 10) * 10} - ${Math.round(v[2]! / 10) * 10} = ${r}.`],
      hints: () => ["Arrondis chaque nombre à la dizaine près avant de calculer l'estimation."]
    }
  }),
  categoricalPoolTemplate({
    key: "y6l2.mcMultiStepReasoning", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(10, 99);
      const b = rng.int(2, 9);
      const c = rng.int(1, 50);
      const result = a * b + c;
      const distractors = numericDistractors(rng, result, 3, 10).map(String);
      return {
        prompt: `A baker makes ${a} trays of ${b} cakes each, then bakes ${c} more individually. How many cakes are there in total?`,
        correctLabel: String(result),
        distractorLabels: distractors,
        explanationSteps: [`${a} x ${b} = ${a * b}. ${a * b} + ${c} = ${result}.`],
        hints: ["Work out the trays first, then add the extra cakes."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A baker makes (-?\d+) trays of (-?\d+) cakes each, then bakes (-?\d+) more individually\./);
        const [a, b, c] = m ? m.slice(1) : ["", "", ""];
        const product = Number(a) * Number(b);
        return {
          prompt: `Un boulanger fait ${a} plateaux de ${b} gâteaux chacun, puis cuit ${c} gâteaux de plus individuellement. Combien de gâteaux y a-t-il au total ?`,
          explanationSteps: [`${a} x ${b} = ${product}. ${product} + ${c} = ${drawn.correctLabel}.`],
          hints: ["Calcule d'abord les plateaux, puis ajoute les gâteaux supplémentaires."]
        };
      }
    },
    declaredVariationSpace: 89 * 8 * 50
  }),
  categoricalPoolTemplate({
    key: "y6l2.tfEstimateCheck", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ROUNDING_DIRECTION_ERROR"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 999);
      const b = rng.int(10, 99);
      const estimate = Math.round(a / 100) * 100 * (Math.round(b / 10) * 10);
      const isTrueCase = rng.chance(0.5);
      const shown = isTrueCase ? estimate : numericDistractors(rng, estimate, 1, Math.max(100, Math.round(estimate * 0.1)))[0] ?? estimate + 100;
      return {
        prompt: `Rounding ${a} to the nearest 100 and ${b} to the nearest 10, a good estimate for ${a} x ${b} is ${shown.toLocaleString("en-GB")}. True or false?`,
        correctLabel: isTrueCase ? "True" : "False",
        distractorLabels: [isTrueCase ? "False" : "True"],
        explanationSteps: [`${a} rounds to ${Math.round(a / 100) * 100}. ${b} rounds to ${Math.round(b / 10) * 10}. Their product is ${estimate.toLocaleString("en-GB")}.`],
        hints: ["Round each number first, then multiply to find the estimate."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Rounding (-?\d+) to the nearest 100 and (-?\d+) to the nearest 10, a good estimate for \1 x \2 is ([\d,]+)\./);
        const [a, b, shownStr] = m ? m.slice(1) : ["", "", ""];
        const aNum = Number(a);
        const bNum = Number(b);
        const isTrueCase = drawn.correctLabel === "True";
        const estimate = Math.round(aNum / 100) * 100 * (Math.round(bNum / 10) * 10);
        return {
          prompt: `En arrondissant ${a} à la centaine près et ${b} à la dizaine près, une bonne estimation de ${a} x ${b} est ${shownStr}. Vrai ou faux ?`,
          correctLabel: isTrueCase ? "Vrai" : "Faux",
          distractorLabels: [isTrueCase ? "Faux" : "Vrai"],
          explanationSteps: [`${a} s'arrondit à ${Math.round(aNum / 100) * 100}. ${b} s'arrondit à ${Math.round(bNum / 10) * 10}. Leur produit est ${estimate.toLocaleString("en-GB")}.`],
          hints: ["Arrondis d'abord chaque nombre, puis multiplie pour trouver l'estimation."]
        };
      }
    },
    declaredVariationSpace: 900 * 90 * 2
  }),
  arithmeticTemplate({
    key: "y6l2.missingNumberMultiStep", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1000, 5000], [500, 3000], [3000, 9000]], constraint: (v) => v[2]! > v[0]! + v[1]!,
    compute: (v) => v[2]! - v[0]! - v[1]!,
    promptTemplates: ["{a} + {b} + ___ = {c}", "What number must be added to {a} and {b} to make a total of {c}?"],
    explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[2]} - ${v[0]! + v[1]!} = ${r}.`],
    hints: () => ["Add the two known numbers, then subtract that from the total."],
    declaredVariationSpace: 100000000,
    fr: {
      promptTemplates: ["{a} + {b} + ___ = {c}", "Quel nombre faut-il ajouter à {a} et {b} pour obtenir un total de {c} ?"],
      explain: (v, r) => [`${v[0]} + ${v[1]} = ${v[0]! + v[1]!}.`, `${v[2]} - ${v[0]! + v[1]!} = ${r}.`],
      hints: () => ["Additionne les deux nombres connus, puis soustrais cette somme du total."]
    }
  }),
  arithmeticTemplate({
    key: "y6l2.wordProblemFourOperations", levelKey: "Y6L2", objectiveCode: "Y6-L2-3", difficulty: "REASONING",
    misconceptionTags: ["ORDER_OF_OPERATIONS_ERROR"], type: "WORD_PROBLEM",
    ranges: [[100, 999], [2, 20], [10, 99], [10, 299]],
    constraint: (v) => v[0]! + v[1]! * v[2]! >= v[3]!,
    compute: (v) => v[0]! + v[1]! * v[2]! - v[3]!,
    promptTemplates: ["A shop had {a} bottles. They received a delivery of {b} boxes with {c} bottles in each box. They then sold {d} bottles. How many bottles are left?"],
    explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `${v[0]} + ${v[1]! * v[2]!} = ${v[0]! + v[1]! * v[2]!}.`, `${v[0]! + v[1]! * v[2]!} - ${v[3]} = ${r}.`],
    hints: () => ["Work out the delivery total first, add it to the starting amount, then subtract what was sold."],
    declaredVariationSpace: 900 * 19 * 90 * 290,
    fr: {
      promptTemplates: ["Un magasin avait {a} bouteilles. Il a reçu une livraison de {b} boîtes contenant {c} bouteilles chacune. Il a ensuite vendu {d} bouteilles. Combien de bouteilles reste-t-il ?"],
      explain: (v, r) => [`${v[1]} x ${v[2]} = ${v[1]! * v[2]!}.`, `${v[0]} + ${v[1]! * v[2]!} = ${v[0]! + v[1]! * v[2]!}.`, `${v[0]! + v[1]! * v[2]!} - ${v[3]} = ${r}.`],
      hints: () => ["Calcule d'abord le total de la livraison, ajoute-le à la quantité de départ, puis soustrais ce qui a été vendu."]
    }
  })
];

export default level;
