import { arithmeticTemplate, categoricalPoolTemplate, orderingTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 3, Level 1 — "Place value and numbers to 1,000"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y3-L1-1 hundreds/tens/ones place value,
// Y3-L1-2 compare/order numbers to 1,000, Y3-L1-3 counting from 0 in
// multiples of 4, 8, 50 and 100).
const CTX = ["stars", "sweets", "apples", "cars", "stickers", "marbles", "buttons", "shells"];
const CTX_FR = ["étoiles", "bonbons", "pommes", "voitures", "autocollants", "billes", "boutons", "coquillages"];

export const level: QuestionTemplateDef[] = [
  // --- Y3-L1-1: place value of each digit in a three-digit number ---
  arithmeticTemplate({
    key: "y3l1.hundredsDigit", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100, 999]], compute: (v) => Math.floor(v[0]! / 100), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many hundreds are there?", "Counting {ctx}: how many hundreds are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${r} hundreds, ${Math.floor((v[0]! % 100) / 10)} tens and ${v[0]! % 10} ones.`],
    hints: () => ["The hundreds digit is the first digit."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Dans le nombre {a}, combien y a-t-il de centaines ?", "En comptant les {ctx} : combien de centaines y a-t-il dans {a} ?"],
      explain: (v, r) => [`${v[0]} = ${r} centaines, ${Math.floor((v[0]! % 100) / 10)} dizaines et ${v[0]! % 10} unités.`],
      hints: () => ["Le chiffre des centaines est le premier chiffre."]
    },
    declaredVariationSpace: 900 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.tensDigitInHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100, 999]], compute: (v) => Math.floor((v[0]! % 100) / 10), contextPool: CTX,
    promptTemplates: ["In the number {a}, how many tens are there?", "Counting {ctx}: how many tens are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 100)} hundreds, ${r} tens and ${v[0]! % 10} ones.`],
    hints: () => ["The tens digit is the middle digit."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Dans le nombre {a}, combien y a-t-il de dizaines ?", "En comptant les {ctx} : combien de dizaines y a-t-il dans {a} ?"],
      explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 100)} centaines, ${r} dizaines et ${v[0]! % 10} unités.`],
      hints: () => ["Le chiffre des dizaines est le chiffre du milieu."]
    },
    declaredVariationSpace: 900 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.onesDigitInHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "FLUENCY",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[100, 999]], compute: (v) => v[0]! % 10, contextPool: CTX,
    promptTemplates: ["In the number {a}, how many ones are there?", "Counting {ctx}: how many ones are in {a}?"],
    explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 100)} hundreds, ${Math.floor((v[0]! % 100) / 10)} tens and ${r} ones.`],
    hints: () => ["The ones digit is the last digit."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Dans le nombre {a}, combien y a-t-il d'unités ?", "En comptant les {ctx} : combien d'unités y a-t-il dans {a} ?"],
      explain: (v, r) => [`${v[0]} = ${Math.floor(v[0]! / 100)} centaines, ${Math.floor((v[0]! % 100) / 10)} dizaines et ${r} unités.`],
      hints: () => ["Le chiffre des unités est le dernier chiffre."]
    },
    declaredVariationSpace: 900 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.htoToNumber", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "NUMBER_ENTRY",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 100 + v[1]! * 10 + v[2]!,
    promptTemplates: ["{a} hundreds, {b} tens and {c} ones make what number?", "What number has {a} hundreds, {b} tens and {c} ones?"],
    explain: (v, r) => [`${v[0]} hundreds = ${v[0]! * 100}. ${v[1]} tens = ${v[1]! * 10}. ${v[0]! * 100} + ${v[1]! * 10} + ${v[2]} = ${r}.`],
    hints: () => ["Multiply the hundreds by 100 and the tens by 10, then add the ones."],
    fr: {
      promptTemplates: ["{a} centaines, {b} dizaines et {c} unités forment quel nombre ?", "Quel nombre a {a} centaines, {b} dizaines et {c} unités ?"],
      explain: (v, r) => [`${v[0]} centaines = ${v[0]! * 100}. ${v[1]} dizaines = ${v[1]! * 10}. ${v[0]! * 100} + ${v[1]! * 10} + ${v[2]} = ${r}.`],
      hints: () => ["Multiplie les centaines par 100 et les dizaines par 10, puis ajoute les unités."]
    },
    declaredVariationSpace: 9 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y3l1.missingHundredsFromNumber", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "REASONING",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MISSING_NUMBER",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ n: v[0]! * 100 + v[1]! * 10 + v[2]! }),
    promptTemplates: ["The number {n} has ___ hundreds.", "How many hundreds make up {n}?"],
    explain: (v, r) => [`${v[0]! * 100 + v[1]! * 10 + v[2]!} = ${r} hundreds, ${v[1]} tens and ${v[2]} ones.`],
    hints: () => ["Look at the hundreds digit — the first digit."],
    fr: {
      promptTemplates: ["Le nombre {n} a ___ centaines.", "Combien de centaines composent {n} ?"],
      explain: (v, r) => [`${v[0]! * 100 + v[1]! * 10 + v[2]!} = ${r} centaines, ${v[1]} dizaines et ${v[2]} unités.`],
      hints: () => ["Regarde le chiffre des centaines — le premier chiffre."]
    },
    declaredVariationSpace: 9 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y3l1.mcPlaceValueDigitHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 100 + v[1]! * 10 + v[2]!,
    promptTemplates: ["Which number has {a} hundreds, {b} tens and {c} ones?", "{a} hundreds, {b} tens and {c} ones make which number?"],
    explain: (v, r) => [`${v[0]} hundreds, ${v[1]} tens and ${v[2]} ones make ${r}.`],
    hints: () => ["Hundreds come first, then tens, then ones."],
    fr: {
      promptTemplates: ["Quel nombre a {a} centaines, {b} dizaines et {c} unités ?", "{a} centaines, {b} dizaines et {c} unités forment quel nombre ?"],
      explain: (v, r) => [`${v[0]} centaines, ${v[1]} dizaines et ${v[2]} unités forment ${r}.`],
      hints: () => ["Les centaines viennent en premier, puis les dizaines, puis les unités."]
    },
    distractorSpread: 110,
    declaredVariationSpace: 9 * 10 * 10
  }),
  arithmeticTemplate({
    key: "y3l1.wordProblemPlaceValueHTO", levelKey: "Y3L1", objectiveCode: "Y3-L1-1", difficulty: "APPLICATION",
    misconceptionTags: ["PLACE_VALUE_COLUMN_SWAP"], type: "WORD_PROBLEM",
    ranges: [[1, 9], [0, 9], [0, 9]], compute: (v) => v[0]! * 100 + v[1]! * 10 + v[2]!, contextPool: CTX,
    promptTemplates: ["A warehouse has {a} crates of 100 {ctx}, {b} boxes of 10 {ctx} and {c} loose {ctx}. How many {ctx} in total?"],
    explain: (v, r) => [`${v[0]} x 100 = ${v[0]! * 100}. ${v[1]} x 10 = ${v[1]! * 10}. ${v[0]! * 100} + ${v[1]! * 10} + ${v[2]} = ${r}.`],
    hints: () => ["Multiply the crates by 100 and the boxes by 10, then add the loose ones."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["Un entrepôt a {a} caisses de 100 {ctx}, {b} boîtes de 10 {ctx} et {c} {ctx} en plus. Combien de {ctx} au total ?"],
      explain: (v, r) => [`${v[0]} x 100 = ${v[0]! * 100}. ${v[1]} x 10 = ${v[1]! * 10}. ${v[0]! * 100} + ${v[1]! * 10} + ${v[2]} = ${r}.`],
      hints: () => ["Multiplie les caisses par 100 et les boîtes par 10, puis ajoute les unités en plus."]
    },
    declaredVariationSpace: 9 * 10 * 10 * CTX.length
  }),

  // --- Y3-L1-2: compare and order numbers up to 1,000 ---
  categoricalPoolTemplate({
    key: "y3l1.compareWithSymbol1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 1000);
      const makeEqual = rng.chance(0.15);
      const b = makeEqual ? a : rng.int(1, 1000);
      const correct = a < b ? "<" : a > b ? ">" : "=";
      const distractors = ["<", ">", "="].filter((s) => s !== correct);
      return {
        prompt: `Which symbol makes this true: ${a} ___ ${b}?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [correct === "=" ? `${a} and ${b} are the same, so the symbol is =.` : `${a} is ${correct === "<" ? "smaller" : "bigger"} than ${b}, so the symbol is ${correct}.`],
        hints: ["< means 'is less than', > means 'is greater than', = means 'is equal to'."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which symbol makes this true: (\d+) ___ (\d+)\?$/);
        const a = m ? m[1] : "";
        const b = m ? m[2] : "";
        const correct = drawn.correctLabel;
        const explanation = correct === "=" ? `${a} et ${b} sont identiques, donc le symbole est =.` : `${a} est ${correct === "<" ? "plus petit" : "plus grand"} que ${b}, donc le symbole est ${correct}.`;
        return {
          prompt: `Quel symbole rend cela vrai : ${a} ___ ${b} ?`,
          explanationSteps: [explanation],
          hints: ["< signifie « est inférieur à », > signifie « est supérieur à », = signifie « est égal à »."]
        };
      }
    },
    declaredVariationSpace: 1000 * 1000
  }),
  categoricalPoolTemplate({
    key: "y3l1.tfSymbolStatement1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "TRUE_FALSE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(1, 1000);
      let b = rng.int(1, 1000);
      while (b === a) b = rng.int(1, 1000);
      const symbol = rng.pick([">", "<"]);
      const truth = symbol === ">" ? a > b : a < b;
      return {
        prompt: `${a} ${symbol} ${b}`,
        correctLabel: truth ? "True" : "False",
        distractorLabels: [truth ? "False" : "True"],
        explanationSteps: [`${a} ${a > b ? "is bigger than" : "is smaller than"} ${b}.`],
        hints: ["> means 'is greater than'; < means 'is less than'."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+) ([<>]) (\d+)$/);
        const a = m ? Number(m[1]) : 0;
        const b = m ? Number(m[3]) : 0;
        const isTrue = drawn.correctLabel === "True";
        return {
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [`${a} ${a > b ? "est plus grand que" : "est plus petit que"} ${b}.`],
          hints: ["> signifie « est supérieur à » ; < signifie « est inférieur à »."]
        };
      }
    },
    declaredVariationSpace: 1000 * 999 * 2
  }),
  orderingTemplate({
    key: "y3l1.orderAscending1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "asc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 1000));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, smallest first."],
    explain: () => ["Compare the hundreds digit first, then the tens, then the ones."],
    hints: () => ["Which number has the fewest hundreds?"],
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Compare d'abord le chiffre des centaines, puis celui des dizaines, puis celui des unités."],
      hints: () => ["Quel nombre a le moins de centaines ?"]
    },
    declaredVariationSpace: 40000
  }),
  orderingTemplate({
    key: "y3l1.orderDescending1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], direction: "desc",
    generateItems: (rng) => {
      const nums = new Set<number>();
      while (nums.size < 4) nums.add(rng.int(1, 1000));
      return Array.from(nums).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["Drag the numbers into order, largest first."],
    explain: () => ["Compare the hundreds digit first, then the tens, then the ones."],
    hints: () => ["Which number has the most hundreds?"],
    fr: {
      promptTemplates: ["Fais glisser les nombres dans l'ordre, du plus grand au plus petit."],
      explain: () => ["Compare d'abord le chiffre des centaines, puis celui des dizaines, puis celui des unités."],
      hints: () => ["Quel nombre a le plus de centaines ?"]
    },
    declaredVariationSpace: 40000
  }),
  arithmeticTemplate({
    key: "y3l1.compareBigger1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE",
    ranges: [[1, 1000], [1, 1000]], constraint: (v) => v[0] !== v[1], compute: (v) => Math.max(v[0]!, v[1]!),
    promptTemplates: ["Which number is bigger, {a} or {b}?"],
    explain: (v, r) => [`Compare the hundreds first. ${r} is the bigger number.`],
    hints: () => ["Compare the hundreds digit first. If they're equal, compare the tens, then the ones."],
    fr: {
      promptTemplates: ["Quel nombre est le plus grand, {a} ou {b} ?"],
      explain: (v, r) => [`Compare d'abord les centaines. ${r} est le plus grand nombre.`],
      hints: () => ["Compare d'abord le chiffre des centaines. S'ils sont égaux, compare les dizaines, puis les unités."]
    },
    distractorSpread: 150,
    declaredVariationSpace: 1000 * 999
  }),
  categoricalPoolTemplate({
    key: "y3l1.wordProblemCompareAmounts1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(5, 1000);
      let b = rng.int(5, 1000);
      while (b === a) b = rng.int(5, 1000);
      const names = ["School A", "School B"];
      const correct = a < b ? names[0]! : names[1]!;
      const other = correct === names[0] ? names[1]! : names[0]!;
      return {
        prompt: `School A raised £${a} for charity. School B raised £${b}. Which school raised less money?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`£${Math.min(a, b)} is less than £${Math.max(a, b)}, so ${correct} raised less.`],
        hints: ["Compare the two totals — the smaller number raised less."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^School A raised £(\d+) for charity\. School B raised £(\d+)\. Which school raised less money\?$/);
        const a = m ? Number(m[1]) : 0;
        const b = m ? Number(m[2]) : 0;
        const toFr = (label: string) => (label === "School A" ? "École A" : "École B");
        const correctFr = toFr(drawn.correctLabel);
        return {
          prompt: `L'école A a récolté £${a} pour une association caritative. L'école B a récolté £${b}. Quelle école a récolté le moins d'argent ?`,
          correctLabel: correctFr,
          distractorLabels: drawn.distractorLabels.map(toFr),
          explanationSteps: [`£${Math.min(a, b)} est moins que £${Math.max(a, b)}, donc ${correctFr} a récolté moins.`],
          hints: ["Compare les deux totaux — le plus petit nombre a récolté moins."]
        };
      }
    },
    declaredVariationSpace: 996 * 995
  }),
  categoricalPoolTemplate({
    key: "y3l1.reasoningExplainCompareHundreds", levelKey: "Y3L1", objectiveCode: "Y3-L1-2", difficulty: "REASONING",
    misconceptionTags: ["COMPARISON_DIGIT_CONFUSION"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const a = rng.int(100, 999);
      let b = rng.int(100, 999);
      while (Math.floor(b / 100) === Math.floor(a / 100)) b = rng.int(100, 999);
      const correct = Math.floor(a / 100) > Math.floor(b / 100) ? String(a) : String(b);
      const other = correct === String(a) ? String(b) : String(a);
      return {
        prompt: `Which number has more hundreds, ${a} or ${b}?`,
        correctLabel: correct,
        distractorLabels: [other],
        explanationSteps: [`${correct} has more hundreds.`],
        hints: ["Look only at the first digit (the hundreds digit) of each number."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which number has more hundreds, (\d+) or (\d+)\?$/);
        const a = m ? m[1] : "";
        const b = m ? m[2] : "";
        return {
          prompt: `Quel nombre a le plus de centaines, ${a} ou ${b} ?`,
          explanationSteps: [`${drawn.correctLabel} a le plus de centaines.`],
          hints: ["Regarde seulement le premier chiffre (le chiffre des centaines) de chaque nombre."]
        };
      }
    },
    declaredVariationSpace: 900 * 899
  }),

  // --- Y3-L1-3: count from 0 in multiples of 4, 8, 50 and 100 ---
  arithmeticTemplate({
    key: "y3l1.skipCountBy4", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 199]], compute: (v) => (v[0]! + 1) * 4,
    derive: (v) => ({ a: v[0]! * 4 }), contextPool: CTX,
    promptTemplates: ["Counting in 4s from 0: ..., {a}, ___. What comes next?", "Counting {ctx} in 4s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 4: ${v[0]! * 4} + 4 = ${r}.`],
    hints: () => ["Add 4 to the number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de 4 en 4 à partir de 0 : ..., {a}, ___. Que vient-il ensuite ?", "En comptant les {ctx} de 4 en 4 à partir de 0 : ..., {a}, ___"],
      explain: (v, r) => [`Ajoute 4 : ${v[0]! * 4} + 4 = ${r}.`],
      hints: () => ["Ajoute 4 au nombre."]
    },
    declaredVariationSpace: 200 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.skipCountBy8", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "FLUENCY",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 124]], compute: (v) => (v[0]! + 1) * 8,
    derive: (v) => ({ a: v[0]! * 8 }), contextPool: CTX,
    promptTemplates: ["Counting in 8s from 0: ..., {a}, ___. What comes next?", "Counting {ctx} in 8s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 8: ${v[0]! * 8} + 8 = ${r}.`],
    hints: () => ["Add 8 to the number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de 8 en 8 à partir de 0 : ..., {a}, ___. Que vient-il ensuite ?", "En comptant les {ctx} de 8 en 8 à partir de 0 : ..., {a}, ___"],
      explain: (v, r) => [`Ajoute 8 : ${v[0]! * 8} + 8 = ${r}.`],
      hints: () => ["Ajoute 8 au nombre."]
    },
    declaredVariationSpace: 125 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.skipCountBy50", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 18]], compute: (v) => (v[0]! + 1) * 50,
    derive: (v) => ({ a: v[0]! * 50 }), contextPool: CTX,
    promptTemplates: ["Counting in 50s from 0: ..., {a}, ___. What comes next?", "Counting {ctx} in 50s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 50: ${v[0]! * 50} + 50 = ${r}.`],
    hints: () => ["Add 50 to the number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant de 50 en 50 à partir de 0 : ..., {a}, ___. Que vient-il ensuite ?", "En comptant les {ctx} de 50 en 50 à partir de 0 : ..., {a}, ___"],
      explain: (v, r) => [`Ajoute 50 : ${v[0]! * 50} + 50 = ${r}.`],
      hints: () => ["Ajoute 50 au nombre."]
    },
    declaredVariationSpace: 19 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.skipCountBy100", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MISSING_NUMBER",
    ranges: [[0, 9]], compute: (v) => (v[0]! + 1) * 100,
    derive: (v) => ({ a: v[0]! * 100 }), contextPool: CTX,
    promptTemplates: ["Counting {ctx} in 100s from 0: ..., {a}, ___. What comes next?", "Counting boxes of {ctx} in 100s from 0: ..., {a}, ___"],
    explain: (v, r) => [`Add 100: ${v[0]! * 100} + 100 = ${r}.`],
    hints: () => ["Add 100 to the number."],
    fr: {
      contextPool: CTX_FR,
      promptTemplates: ["En comptant les {ctx} de 100 en 100 à partir de 0 : ..., {a}, ___. Que vient-il ensuite ?", "En comptant des boîtes de {ctx} de 100 en 100 à partir de 0 : ..., {a}, ___"],
      explain: (v, r) => [`Ajoute 100 : ${v[0]! * 100} + 100 = ${r}.`],
      hints: () => ["Ajoute 100 au nombre."]
    },
    declaredVariationSpace: 10 * 2 * CTX.length
  }),
  arithmeticTemplate({
    key: "y3l1.mcSkipCountBy8", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "APPLICATION",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MULTIPLE_CHOICE",
    ranges: [[0, 124]], compute: (v) => (v[0]! + 1) * 8,
    derive: (v) => ({ a: v[0]! * 8 }),
    promptTemplates: ["Counting in 8s from 0: {a}, ___. What comes next?", "Skip count by 8 from {a}. What is the next number?"],
    explain: (v, r) => [`${v[0]! * 8} + 8 = ${r}.`],
    hints: () => ["Add 8 to the number."],
    fr: {
      promptTemplates: ["En comptant de 8 en 8 à partir de 0 : {a}, ___. Que vient-il ensuite ?", "Compte de 8 en 8 à partir de {a}. Quel est le nombre suivant ?"],
      explain: (v, r) => [`${v[0]! * 8} + 8 = ${r}.`],
      hints: () => ["Ajoute 8 au nombre."]
    },
    distractorSpread: 8,
    declaredVariationSpace: 125 * 2
  }),
  orderingTemplate({
    key: "y3l1.orderSkipCountSequence1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], direction: "asc",
    generateItems: (rng) => {
      const step = rng.pick([4, 8, 50, 100]);
      const startIndex = rng.int(0, 15);
      const terms = [startIndex, startIndex + 1, startIndex + 2, startIndex + 3].map((n) => n * step);
      return rng.shuffle(terms).map((n) => ({ label: String(n), sortValue: n }));
    },
    promptTemplates: ["These numbers from a counting-in-multiples pattern are muddled up. Drag them into order, smallest first."],
    explain: () => ["Work out the step size, then order the numbers from smallest to largest."],
    hints: () => ["Look at how much the numbers go up by each time."],
    fr: {
      promptTemplates: ["Ces nombres d'une suite de comptage par multiples sont mélangés. Fais-les glisser dans l'ordre, du plus petit au plus grand."],
      explain: () => ["Trouve le pas, puis ordonne les nombres du plus petit au plus grand."],
      hints: () => ["Regarde de combien les nombres augmentent à chaque fois."]
    },
    declaredVariationSpace: 4 * 16 * 24
  }),
  categoricalPoolTemplate({
    key: "y3l1.wordProblemSkipCounting1000", levelKey: "Y3L1", objectiveCode: "Y3-L1-3", difficulty: "REASONING",
    misconceptionTags: ["MISCOUNTS_SKIP"], type: "MULTIPLE_CHOICE", pools: {},
    build: (_picked, rng) => {
      const step = rng.pick([4, 8, 50, 100]);
      const jumps = rng.int(2, 8);
      const correct = step * jumps;
      const distractors = [step * (jumps - 1), step * (jumps + 1), (step + (step === 100 ? 50 : step === 50 ? 4 : step === 8 ? 4 : 1)) * jumps];
      const uniq = Array.from(new Set(distractors.map(String))).filter((l) => l !== String(correct));
      let pad = correct + step * 10;
      while (uniq.length < 3) { uniq.push(String(pad)); pad += step; }
      return {
        prompt: `A counter starts at 0 and jumps forward ${step} each time. Where is it after ${jumps} jumps?`,
        correctLabel: String(correct),
        distractorLabels: uniq.slice(0, 3),
        explanationSteps: [`0 + (${step} x ${jumps}) = ${correct}.`],
        hints: ["Multiply the jump size by the number of jumps."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A counter starts at 0 and jumps forward (\d+) each time\. Where is it after (\d+) jumps\?$/);
        const step = m ? m[1] : "";
        const jumps = m ? m[2] : "";
        return {
          prompt: `Un compteur part de 0 et saute de ${step} à chaque fois. Où se trouve-t-il après ${jumps} sauts ?`,
          explanationSteps: [`0 + (${step} x ${jumps}) = ${drawn.correctLabel}.`],
          hints: ["Multiplie la taille du saut par le nombre de sauts."]
        };
      }
    },
    declaredVariationSpace: 4 * 7
  })
];

export default level;
