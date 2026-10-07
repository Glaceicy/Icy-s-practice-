import { arithmeticTemplate, categoricalPoolTemplate, numericDistractors, plural } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 2 — "Proportion, rates and compound measures"
// 21 templates, each verified to reach >=150 distinct valid variations,
// covering all three objectives (Y9-L2-1 direct and inverse proportion,
// Y9-L2-2 compound measures — speed, density, pressure, Y9-L2-3 growth
// and decay problems). Every scenario is constructed from small integer
// factors so the answer always lands on a whole number.
const CTX_ITEMS = ["pencils", "notebooks", "tickets", "apples", "balloons", "stickers", "chairs", "plants"];
const CTX_ITEMS_FR = ["crayons", "cahiers", "billets", "pommes", "ballons", "autocollants", "chaises", "plantes"];
const SCENARIOS = ["paint a fence", "fill a water tank", "pack a delivery van", "build a wall", "harvest a field", "clean an office block", "sort a warehouse", "plant a field"];
const SCENARIOS_FR = [
  "peindre une clôture", "remplir un réservoir d'eau", "emballer une camionnette de livraison", "construire un mur",
  "récolter un champ", "nettoyer un immeuble de bureaux", "trier un entrepôt", "planter un champ"
];
const GROWTH_CTX = ["A town's population", "A savings account balance", "A bacteria colony", "A company's profits", "A forest's tree count", "A school's enrolment", "A website's users", "A city's recycling rate"];
const GROWTH_CTX_FR = [
  "La population d'une ville", "Le solde d'un compte d'épargne", "Une colonie de bactéries", "Les bénéfices d'une entreprise",
  "Le nombre d'arbres d'une forêt", "Les effectifs d'une école", "Les utilisateurs d'un site web", "Le taux de recyclage d'une ville"
];
const PERCENT_OPTIONS = [
  { percent: 10, requiredMultiple: 10 },
  { percent: 20, requiredMultiple: 5 },
  { percent: 25, requiredMultiple: 4 },
  { percent: 50, requiredMultiple: 2 }
];
const BOOL_EN_TO_FR: Record<string, string> = { True: "Vrai", False: "Faux" };

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
    declaredVariationSpace: 20 * 19 * 19,
    fr: {
      promptTemplates: ["{qty1} articles coûtent £{cost1} au total. Au même tarif, combien coûteraient {qty2} articles ?"],
      explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} par article. £${v[0]} x ${v[2]} = £${r}.`],
      hints: () => ["Trouve d'abord le prix d'un article, puis multiplie par la nouvelle quantité."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.inverseProportionWorkers", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_DIRECTION_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 12], [2, 12], [2, 6]], compute: (v) => v[1]!,
    derive: (v) => ({ workers1: v[0]!, days1: v[1]! * v[2]!, workers2: v[0]! * v[2]! }),
    promptTemplates: ["{workers1} workers take {days1} days to complete a job. How many days would {workers2} workers take, working at the same rate?"],
    explain: (v, r) => [`${v[0]} x ${v[1]! * v[2]!} = ${v[0]! * v[1]! * v[2]!} worker-days of work in total. ${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[2]!} = ${r} days.`],
    hints: () => ["More workers means the job takes fewer days — the total amount of work stays the same."],
    declaredVariationSpace: 11 * 11 * 5,
    fr: {
      promptTemplates: ["{workers1} ouvriers mettent {days1} jours pour terminer un travail. Combien de jours mettraient {workers2} ouvriers, en travaillant au même rythme ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]! * v[2]!} = ${v[0]! * v[1]! * v[2]!} ouvriers-jours de travail au total. ${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[2]!} = ${r} jours.`],
      hints: () => ["Plus d'ouvriers signifie que le travail prend moins de jours — la quantité totale de travail reste la même."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.directProportionMissingQuantity", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "REASONING",
    misconceptionTags: ["PROPORTION_ADDITIVE_ERROR"], type: "MISSING_NUMBER",
    ranges: [[1, 20], [2, 20], [2, 20]], compute: (v) => v[2]!,
    derive: (v) => ({ qty1: v[1]!, cost1: v[0]! * v[1]!, targetCost: v[0]! * v[2]! }),
    promptTemplates: ["{qty1} items cost £{cost1}. How many items can you buy for £{targetCost} at the same rate?"],
    explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} per item. £${v[0]! * v[2]!} ÷ £${v[0]} = ${r} items.`],
    hints: () => ["Find the price of one item first, then divide the target amount by that price."],
    declaredVariationSpace: 20 * 19 * 19,
    fr: {
      promptTemplates: ["{qty1} articles coûtent £{cost1}. Combien d'articles peux-tu acheter pour £{targetCost} au même tarif ?"],
      explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} par article. £${v[0]! * v[2]!} ÷ £${v[0]} = ${r} articles.`],
      hints: () => ["Trouve d'abord le prix d'un article, puis divise le montant cible par ce prix."]
    }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+) items cost £(\d+) in total\. At the same rate, how much would (\d+) items cost\?$/);
        const qty1 = m ? m[1] : "";
        const cost1 = m ? Number(m[2]) : 0;
        const qty2 = m ? m[3] : "";
        const unitPrice = qty1 ? cost1 / Number(qty1) : 0;
        return {
          prompt: `${qty1} articles coûtent £${cost1} au total. Au même tarif, combien coûteraient ${qty2} articles ?`,
          explanationSteps: [`£${cost1} ÷ ${qty1} = £${unitPrice} par article. £${unitPrice} x ${qty2} = £${drawn.correctLabel}.`],
          hints: ["Trouve d'abord le prix d'un article, puis multiplie par la nouvelle quantité."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^(\d+) workers take (\d+) days to finish a job\. If (\d+) workers do the same job at the same rate, it would take (\d+) days\. True or false\?$/);
        const workers1 = m ? m[1] : "";
        const days1 = m ? m[2] : "";
        const workers2 = m ? m[3] : "";
        const shownDays2 = m ? m[4] : "";
        const em = drawn.explanationSteps[0]?.match(/With (\d+) times as many workers.*÷ \d+ = (\d+) days/);
        const mult = em ? em[1] : "";
        const days2 = em ? em[2] : "";
        return {
          prompt: `${workers1} ouvriers mettent ${days1} jours pour terminer un travail. Si ${workers2} ouvriers font le même travail au même rythme, cela prendrait ${shownDays2} jours. Vrai ou faux ?`,
          correctLabel: BOOL_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => BOOL_EN_TO_FR[d] ?? d),
          explanationSteps: [`Avec ${mult} fois plus d'ouvriers, le travail prend ${mult} fois moins de jours : ${days1} ÷ ${mult} = ${days2} jours.`],
          hints: ["Plus d'ouvriers signifie que le travail prend moins de jours, en proportion inverse."]
        };
      }
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
    declaredVariationSpace: 20 * 19 * 19 * CTX_ITEMS.length,
    fr: {
      contextPool: CTX_ITEMS_FR,
      promptTemplates: ["Un magasin vend {qty1} {ctx} pour £{cost1}. Au même tarif, combien coûteraient {qty2} {ctx} ?"],
      explain: (v, r) => [`£${v[0]! * v[1]!} ÷ ${v[1]} = £${v[0]} par article. £${v[0]} x ${v[2]} = £${r}.`],
      hints: () => ["Trouve d'abord le prix d'un article, puis multiplie par la nouvelle quantité."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.wordProblemInverseProportion", levelKey: "Y9L2", objectiveCode: "Y9-L2-1", difficulty: "APPLICATION",
    misconceptionTags: ["PROPORTION_DIRECTION_ERROR"], type: "WORD_PROBLEM",
    ranges: [[2, 12], [2, 12], [2, 6]], compute: (v) => v[1]!,
    derive: (v) => ({ workers1: v[0]!, days1: v[1]! * v[2]!, workers2: v[0]! * v[2]! }), contextPool: SCENARIOS,
    promptTemplates: ["It takes {workers1} people {days1} days to {ctx}. How many days would it take {workers2} people, working at the same rate?"],
    explain: (v, r) => [`${v[0]} x ${v[1]! * v[2]!} = ${v[0]! * v[1]! * v[2]!} worker-days of work in total. ${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[2]!} = ${r} days.`],
    hints: () => ["More people means the task takes fewer days — the total amount of work stays the same."],
    declaredVariationSpace: 11 * 11 * 5 * SCENARIOS.length,
    fr: {
      contextPool: SCENARIOS_FR,
      promptTemplates: ["Il faut {workers1} personnes {days1} jours pour {ctx}. Combien de jours faudrait-il à {workers2} personnes, travaillant au même rythme ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]! * v[2]!} = ${v[0]! * v[1]! * v[2]!} personnes-jours de travail au total. ${v[0]! * v[1]! * v[2]!} ÷ ${v[0]! * v[2]!} = ${r} jours.`],
      hints: () => ["Plus de personnes signifie que la tâche prend moins de jours — la quantité totale de travail reste la même."]
    }
  }),

  // --- Y9-L2-2: interpret and use compound measures — speed, density and pressure ---
  arithmeticTemplate({
    key: "y9l2.calculateSpeed", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 100], [1, 10]], compute: (v) => v[0]!,
    derive: (v) => ({ distance: v[0]! * v[1]!, time: v[1]! }),
    promptTemplates: ["A car travels {distance} miles in {time} {time#hours|hour}. What is its average speed, in mph?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} mph.`],
    hints: () => ["Speed = distance ÷ time."],
    declaredVariationSpace: 91 * 10,
    fr: {
      promptTemplates: ["Une voiture parcourt {distance} miles en {time} {time#heures|heure}. Quelle est sa vitesse moyenne, en mph ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} mph.`],
      hints: () => ["Vitesse = distance ÷ temps."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.calculateDistance", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "FLUENCY",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 100], [1, 10]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: ["A car travels at {a} mph for {b} {b#hours|hour}. How far does it travel, in miles?"],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${r} miles.`],
    hints: () => ["Distance = speed x time."],
    declaredVariationSpace: 91 * 10,
    fr: {
      promptTemplates: ["Une voiture roule à {a} mph pendant {b} {b#heures|heure}. Quelle distance parcourt-elle, en miles ?"],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${r} miles.`],
      hints: () => ["Distance = vitesse x temps."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.calculateTime", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 100], [1, 10]], compute: (v) => v[1]!,
    derive: (v) => ({ distance: v[0]! * v[1]!, speed: v[0]! }),
    promptTemplates: ["A car travels {distance} miles at an average speed of {speed} mph. How long does the journey take, in hours?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r} ${plural(r, "hours", "hour")}.`],
    hints: () => ["Time = distance ÷ speed."],
    declaredVariationSpace: 91 * 10,
    fr: {
      promptTemplates: ["Une voiture parcourt {distance} miles à une vitesse moyenne de {speed} mph. Combien de temps dure le trajet, en heures ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[0]} = ${r} ${plural(r, "heures", "heure")}.`],
      hints: () => ["Temps = distance ÷ vitesse."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.calculateDensity", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ mass: v[0]! * v[1]!, volume: v[1]! }),
    promptTemplates: ["An object has a mass of {mass} g and a volume of {volume} cm³. What is its density, in g/cm³?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} g/cm³.`],
    hints: () => ["Density = mass ÷ volume."],
    declaredVariationSpace: 19 * 19,
    fr: {
      promptTemplates: ["Un objet a une masse de {mass} g et un volume de {volume} cm³. Quelle est sa densité, en g/cm³ ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} g/cm³.`],
      hints: () => ["Densité = masse ÷ volume."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.calculatePressure", levelKey: "Y9L2", objectiveCode: "Y9-L2-2", difficulty: "APPLICATION",
    misconceptionTags: ["COMPOUND_MEASURE_FORMULA_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]!,
    derive: (v) => ({ force: v[0]! * v[1]!, area: v[1]! }),
    promptTemplates: ["A force of {force} N acts on an area of {area} cm². What is the pressure, in N/cm²?"],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} N/cm².`],
    hints: () => ["Pressure = force ÷ area."],
    declaredVariationSpace: 19 * 19,
    fr: {
      promptTemplates: ["Une force de {force} N s'exerce sur une surface de {area} cm². Quelle est la pression, en N/cm² ?"],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${v[1]} = ${r} N/cm².`],
      hints: () => ["Pression = force ÷ surface."]
    }
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
    fr: {
      translate: (drawn) => {
        let m: RegExpMatchArray | null;
        let prompt = drawn.prompt;
        let total = "";
        let other = "";
        if ((m = drawn.prompt.match(/^A car travels (\d+) miles in (\d+) hours\. What is its average speed, in mph\?$/))) {
          total = m[1]!; other = m[2]!;
          prompt = `Une voiture parcourt ${total} miles en ${other} heures. Quelle est sa vitesse moyenne, en mph ?`;
        } else if ((m = drawn.prompt.match(/^An object has a mass of (\d+) g and a volume of (\d+) cm³\. What is its density, in g\/cm³\?$/))) {
          total = m[1]!; other = m[2]!;
          prompt = `Un objet a une masse de ${total} g et un volume de ${other} cm³. Quelle est sa densité, en g/cm³ ?`;
        } else if ((m = drawn.prompt.match(/^A force of (\d+) N acts on an area of (\d+) cm²\. What is the pressure, in N\/cm²\?$/))) {
          total = m[1]!; other = m[2]!;
          prompt = `Une force de ${total} N s'exerce sur une surface de ${other} cm². Quelle est la pression, en N/cm² ?`;
        }
        return {
          prompt,
          explanationSteps: [`${total} ÷ ${other} = ${drawn.correctLabel}.`],
          hints: ["Divise la quantité totale par l'autre mesure pour trouver le taux."]
        };
      }
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
      const optionA = `${d1} miles in ${time1} ${plural(time1, "hours", "hour")}`;
      const optionB = `${d2} miles in ${time2} ${plural(time2, "hours", "hour")}`;
      return {
        prompt: `Which journey has the faster average speed: ${optionA}, or ${optionB}?`,
        correctLabel: d1 / time1 > d2 / time2 ? optionA : optionB,
        distractorLabels: [d1 / time1 > d2 / time2 ? optionB : optionA],
        explanationSteps: [`${optionA}: ${d1} ÷ ${time1} = ${d1 / time1} mph. ${optionB}: ${d2} ÷ ${time2} = ${d2 / time2} mph.`],
        hints: ["Work out the average speed (distance ÷ time) for each journey, then compare."]
      };
    },
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^Which journey has the faster average speed: (\d+) miles in (\d+) hours?, or (\d+) miles in (\d+) hours?\?$/);
        const d1 = m ? m[1]! : "";
        const time1 = m ? m[2]! : "";
        const d2 = m ? m[3]! : "";
        const time2 = m ? m[4]! : "";
        const optionAEn = m ? `${d1} miles in ${time1} ${plural(Number(time1), "hours", "hour")}` : "";
        const optionAFr = `${d1} miles en ${time1} ${plural(Number(time1), "heures", "heure")}`;
        const optionBFr = `${d2} miles en ${time2} ${plural(Number(time2), "heures", "heure")}`;
        const correctLabel = drawn.correctLabel === optionAEn ? optionAFr : optionBFr;
        const distractorLabels = drawn.distractorLabels.map((d) => (d === optionAEn ? optionAFr : optionBFr));
        const speed1 = time1 ? Number(d1) / Number(time1) : 0;
        const speed2 = time2 ? Number(d2) / Number(time2) : 0;
        return {
          prompt: `Quel trajet a la vitesse moyenne la plus rapide : ${optionAFr}, ou ${optionBFr} ?`,
          correctLabel,
          distractorLabels,
          explanationSteps: [`${optionAFr} : ${d1} ÷ ${time1} = ${speed1} mph. ${optionBFr} : ${d2} ÷ ${time2} = ${speed2} mph.`],
          hints: ["Calcule la vitesse moyenne (distance ÷ temps) pour chaque trajet, puis compare."]
        };
      }
    },
    declaredVariationSpace: 80 * 10 * 80 * 10
  }),

  // --- Y9-L2-3: set up, solve and interpret answers in growth and decay problems ---
  arithmeticTemplate({
    key: "y9l2.simpleGrowthOneStep", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 110,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{Ctx} of {base} grows by 10% in one year. What is the new value after one year?"],
    explain: (v, r) => [`10% of ${v[0]! * 100} is ${v[0]! * 10}. ${v[0]! * 100} + ${v[0]! * 10} = ${r}.`],
    hints: () => ["Work out 10% of the starting value, then add it on."],
    declaredVariationSpace: 491 * GROWTH_CTX.length,
    fr: {
      contextPool: GROWTH_CTX_FR,
      promptTemplates: ["{Ctx} de {base} augmente de 10 % en un an. Quelle est la nouvelle valeur après un an ?"],
      explain: (v, r) => [`10 % de ${v[0]! * 100} est ${v[0]! * 10}. ${v[0]! * 100} + ${v[0]! * 10} = ${r}.`],
      hints: () => ["Calcule 10 % de la valeur de départ, puis ajoute-le."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.simpleDecayOneStep", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "FLUENCY",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 90,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{Ctx} of {base} decreases by 10% in one year. What is the new value after one year?"],
    explain: (v, r) => [`10% of ${v[0]! * 100} is ${v[0]! * 10}. ${v[0]! * 100} - ${v[0]! * 10} = ${r}.`],
    hints: () => ["Work out 10% of the starting value, then subtract it."],
    declaredVariationSpace: 491 * GROWTH_CTX.length,
    fr: {
      contextPool: GROWTH_CTX_FR,
      promptTemplates: ["{Ctx} de {base} diminue de 10 % en un an. Quelle est la nouvelle valeur après un an ?"],
      explain: (v, r) => [`10 % de ${v[0]! * 100} est ${v[0]! * 10}. ${v[0]! * 100} - ${v[0]! * 10} = ${r}.`],
      hints: () => ["Calcule 10 % de la valeur de départ, puis soustrais-le."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.compoundGrowthTwoYears", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 121,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{Ctx} of {base} grows by 10% each year for 2 years. What is the value after 2 years?"],
    explain: (v, r) => [`After year 1: ${v[0]! * 100} + 10% = ${v[0]! * 110}. After year 2: ${v[0]! * 110} + 10% = ${r}.`],
    hints: () => ["Grow the value by 10% for the first year, then grow that new value by 10% again."],
    declaredVariationSpace: 491 * GROWTH_CTX.length,
    fr: {
      contextPool: GROWTH_CTX_FR,
      promptTemplates: ["{Ctx} de {base} augmente de 10 % chaque année pendant 2 ans. Quelle est la valeur après 2 ans ?"],
      explain: (v, r) => [`Après l'année 1 : ${v[0]! * 100} + 10 % = ${v[0]! * 110}. Après l'année 2 : ${v[0]! * 110} + 10 % = ${r}.`],
      hints: () => ["Augmente la valeur de 10 % la première année, puis augmente cette nouvelle valeur de 10 % à nouveau."]
    }
  }),
  arithmeticTemplate({
    key: "y9l2.compoundDecayTwoYears", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "APPLICATION",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 81,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{Ctx} of {base} decreases by 10% each year for 2 years. What is the value after 2 years?"],
    explain: (v, r) => [`After year 1: ${v[0]! * 100} - 10% = ${v[0]! * 90}. After year 2: ${v[0]! * 90} - 10% = ${r}.`],
    hints: () => ["Decrease the value by 10% for the first year, then decrease that new value by 10% again."],
    declaredVariationSpace: 491 * GROWTH_CTX.length,
    fr: {
      contextPool: GROWTH_CTX_FR,
      promptTemplates: ["{Ctx} de {base} diminue de 10 % chaque année pendant 2 ans. Quelle est la valeur après 2 ans ?"],
      explain: (v, r) => [`Après l'année 1 : ${v[0]! * 100} - 10 % = ${v[0]! * 90}. Après l'année 2 : ${v[0]! * 90} - 10 % = ${r}.`],
      hints: () => ["Diminue la valeur de 10 % la première année, puis diminue cette nouvelle valeur de 10 % à nouveau."]
    }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A value of (\d+) (grows|decreases) by (\d+)%\. What is the new value\?$/);
        const base = m ? m[1]! : "";
        const growthWord = m ? m[2]! : "";
        const percent = m ? m[3]! : "";
        const growthFr = growthWord === "grows" ? "augmente" : "diminue";
        const sign = growthWord === "grows" ? "+" : "-";
        const change = base && percent ? (Number(base) * Number(percent)) / 100 : 0;
        return {
          prompt: `Une valeur de ${base} ${growthFr} de ${percent} %. Quelle est la nouvelle valeur ?`,
          explanationSteps: [`${percent} % de ${base} est ${change}. ${base} ${sign} ${change} = ${drawn.correctLabel}.`],
          hints: ["Calcule d'abord la variation en pourcentage, puis ajoute-la (croissance) ou retire-la (décroissance)."]
        };
      }
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
    fr: {
      translate: (drawn) => {
        const m = drawn.prompt.match(/^A value of (\d+) (grows|decreases) by (\d+)%, giving a new value of ([\d.]+)\. True or false\?$/);
        const base = m ? m[1]! : "";
        const growthWord = m ? m[2]! : "";
        const percent = m ? m[3]! : "";
        const shown = m ? m[4]! : "";
        const growthFr = growthWord === "grows" ? "augmente" : "diminue";
        const change = base && percent ? (Number(base) * Number(percent)) / 100 : 0;
        const em = drawn.explanationSteps[0]?.match(/so the new value is ([\d.]+)/);
        const result = em ? em[1] : "";
        return {
          prompt: `Une valeur de ${base} ${growthFr} de ${percent} %, donnant une nouvelle valeur de ${shown}. Vrai ou faux ?`,
          correctLabel: BOOL_EN_TO_FR[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => BOOL_EN_TO_FR[d] ?? d),
          explanationSteps: [`${percent} % de ${base} est ${change}, donc la nouvelle valeur est ${result}.`],
          hints: ["Calcule la variation en pourcentage et vérifie-la par rapport à l'énoncé."]
        };
      }
    },
    declaredVariationSpace: 4 * 99 * 2 * 2
  }),
  arithmeticTemplate({
    key: "y9l2.wordProblemGrowthDecay", levelKey: "Y9L2", objectiveCode: "Y9-L2-3", difficulty: "REASONING",
    misconceptionTags: ["GROWTH_DECAY_RATE_ERROR"], type: "WORD_PROBLEM",
    ranges: [[10, 500]], compute: (v) => v[0]! * 75,
    derive: (v) => ({ base: v[0]! * 100 }), contextPool: GROWTH_CTX,
    promptTemplates: ["{Ctx} of {base} falls by 25% in one year due to a downturn. What is the new value?"],
    explain: (v, r) => [`25% of ${v[0]! * 100} is ${v[0]! * 25}. ${v[0]! * 100} - ${v[0]! * 25} = ${r}.`],
    hints: () => ["Work out 25% of the starting value, then subtract it."],
    declaredVariationSpace: 491 * GROWTH_CTX.length,
    fr: {
      contextPool: GROWTH_CTX_FR,
      promptTemplates: ["{Ctx} de {base} chute de 25 % en un an en raison d'un ralentissement économique. Quelle est la nouvelle valeur ?"],
      explain: (v, r) => [`25 % de ${v[0]! * 100} est ${v[0]! * 25}. ${v[0]! * 100} - ${v[0]! * 25} = ${r}.`],
      hints: () => ["Calcule 25 % de la valeur de départ, puis soustrais-le."]
    }
  })
];

export default level;
