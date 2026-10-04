import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 8, Level 9 — "Probability and statistical analysis"
const EXPERIMENTS = ["a spinner", "a dice", "a drawing pin drop", "a coin", "a bag of counters", "a card draw"];
const EXPERIMENTS_FR = ["une roue", "un dé", "une chute de punaise", "une pièce", "un sac de jetons", "un tirage de carte"];
const DATASETS = ["test scores", "reaction times", "daily temperatures", "plant heights", "race times", "goals scored"];
const DATASETS_FR = ["des notes de contrôle", "des temps de réaction", "des températures quotidiennes", "des hauteurs de plantes", "des temps de course", "des buts marqués"];

export const level: QuestionTemplateDef[] = [
  // --- Y8-L9-1: recording and analysing frequencies ---
  arithmeticTemplate({
    key: "y8l9.totalTrialsFromFrequencies", levelKey: "Y8L9", objectiveCode: "Y8-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "NUMBER_ENTRY", contextPool: EXPERIMENTS,
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40]], compute: (v) => v[0]! + v[1]! + v[2]! + v[3]!,
    promptTemplates: [
      "A frequency table records {a}, {b}, {c} and {d} for the four outcomes. How many trials were there in total?",
      "{ctx} is tested and the four outcomes occur {a}, {b}, {c} and {d} times. How many trials were carried out?"
    ],
    explain: (v, r) => [`Add every frequency.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
    hints: () => ["The frequencies must add up to the number of trials."],
    fr: {
      contextPool: EXPERIMENTS_FR,
      promptTemplates: [
        "Un tableau d'effectifs relève {a}, {b}, {c} et {d} pour les quatre issues. Combien d'essais y a-t-il eu en tout ?",
        "{ctx} est testé et les quatre issues apparaissent {a}, {b}, {c} et {d} fois. Combien d'essais ont été réalisés ?"
      ],
      explain: (v, r) => [`Additionne tous les effectifs.`, `${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${r}.`],
      hints: () => ["Les effectifs doivent s'additionner pour donner le nombre d'essais."]
    },
    declaredVariationSpace: 40 * 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y8l9.missingFrequency", levelKey: "Y8L9", objectiveCode: "Y8-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 40], [1, 40], [1, 40]], compute: (v) => v[2]!,
    derive: (v) => ({ total: v[0]! + v[1]! + v[2]! }),
    promptTemplates: [
      "A frequency table of {total} trials shows {a} and {b} for two outcomes. What is the frequency of the third outcome?",
      "Out of {total} results, {a} were red and {b} were blue. How many were a third colour?"
    ],
    explain: (v, r) => [`All the frequencies add to the number of trials.`, `${v[0]! + v[1]! + v[2]!} - ${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["Subtract the known frequencies from the total."],
    fr: {
      promptTemplates: [
        "Un tableau d'effectifs de {total} essais indique {a} et {b} pour deux issues. Quel est l'effectif de la troisième ?",
        "Sur {total} résultats, {a} étaient rouges et {b} bleus. Combien étaient d'une troisième couleur ?"
      ],
      explain: (v, r) => [`Tous les effectifs s'additionnent pour donner le nombre d'essais.`, `${v[0]! + v[1]! + v[2]!} - ${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Retire les effectifs connus du total."]
    },
    declaredVariationSpace: 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y8l9.percentageOfOutcomes", levelKey: "Y8L9", objectiveCode: "Y8-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["RELATIVE_FREQUENCY_ERROR"], type: "MULTI_STEP", contextPool: EXPERIMENTS,
    ranges: [[1, 99], [1, 20]], constraint: (v) => v[0]! <= 100,
    compute: (v) => v[0]!,
    derive: (v) => ({ hits: v[0]! * v[1]!, trials: 100 * v[1]! }),
    promptTemplates: [
      "An outcome happened {hits} times in {trials} trials. What percentage of trials was that?",
      "{ctx} gave a particular result {hits} times out of {trials}. What percentage is that?"
    ],
    explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${100 * v[1]!} = 0.${v[0]! < 10 ? "0" : ""}${v[0]}.`, `As a percentage that is ${r}%.`],
    hints: () => ["Divide the frequency by the number of trials, then multiply by 100."],
    fr: {
      contextPool: EXPERIMENTS_FR,
      promptTemplates: [
        "Une issue s'est produite {hits} fois sur {trials} essais. Quel pourcentage des essais cela représente-t-il ?",
        "{ctx} a donné un résultat particulier {hits} fois sur {trials}. Quel pourcentage cela fait-il ?"
      ],
      explain: (v, r) => [`${v[0]! * v[1]!} ÷ ${100 * v[1]!} = 0,${v[0]! < 10 ? "0" : ""}${v[0]}.`, `En pourcentage, cela fait ${r} %.`],
      hints: () => ["Divise l'effectif par le nombre d'essais, puis multiplie par 100."]
    },
    declaredVariationSpace: 99 * 20 * (1 + EXPERIMENTS.length)
  }),
  arithmeticTemplate({
    key: "y8l9.complementFrequency", levelKey: "Y8L9", objectiveCode: "Y8-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 200], [1, 190]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "In {a} trials an outcome happened {b} times. How many times did it not happen?",
      "Out of {a} spins, {b} landed on red. How many did not land on red?",
      "{a} results were recorded and {b} were successes. How many were not successes?"
    ],
    explain: (v, r) => [`Everything that is not that outcome is the rest of the trials.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["The outcome and its opposite together account for every trial."],
    fr: {
      promptTemplates: [
        "Sur {a} essais, une issue s'est produite {b} fois. Combien de fois ne s'est-elle pas produite ?",
        "Sur {a} tours, {b} sont tombés sur le rouge. Combien ne sont pas tombés sur le rouge ?",
        "{a} résultats ont été relevés et {b} étaient des réussites. Combien n'en étaient pas ?"
      ],
      explain: (v, r) => [`Tout ce qui n'est pas cette issue constitue le reste des essais.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["L'issue et son contraire couvrent ensemble tous les essais."]
    },
    declaredVariationSpace: 191 * 190
  }),
  categoricalPoolTemplate({
    key: "y8l9.mcFairOrBiased", levelKey: "Y8L9", objectiveCode: "Y8-L9-1", difficulty: "REASONING",
    misconceptionTags: ["RELATIVE_FREQUENCY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { verdict: ["probably fair", "probably biased", "too few trials to say"] },
    build: (picked, rng) => {
      const verdict = picked.verdict!;
      const k = rng.int(2, 20);
      const setups: Record<string, string> = {
        "probably fair": `a coin is flipped ${100 * k} times and lands heads ${50 * k} times`,
        "probably biased": `a coin is flipped ${100 * k} times and lands heads ${85 * k} times`,
        "too few trials to say": `a coin is flipped 4 times and lands heads 3 times`
      };
      const labels: Record<string, string> = {
        "probably fair": "probably fair — the relative frequency is close to 0.5",
        "probably biased": "probably biased — the relative frequency is far from 0.5",
        "too few trials to say": "impossible to judge — there are far too few trials"
      };
      return {
        prompt: `In an experiment, ${setups[verdict]}. What can you conclude?`,
        correctLabel: labels[verdict]!,
        distractorLabels: Object.values(labels).filter((l) => l !== labels[verdict]),
        explanationSteps: [`Compare the relative frequency with the theoretical probability of 0.5, and check there are enough trials to trust it.`],
        hints: ["Relative frequency only becomes a reliable estimate of probability after many trials."]
      };
    },
    fr: {
      translate: (drawn) => {
        const labelsFr: Record<string, string> = {
          "probably fair — the relative frequency is close to 0.5": "probablement équilibrée — la fréquence relative est proche de 0,5",
          "probably biased — the relative frequency is far from 0.5": "probablement truquée — la fréquence relative est loin de 0,5",
          "impossible to judge — there are far too few trials": "impossible à juger — il y a beaucoup trop peu d'essais"
        };
        const m = drawn.prompt.match(/^In an experiment, a coin is flipped (\d+) times and lands heads (\d+) times\./);
        if (!m) return {};
        return {
          prompt: `Dans une expérience, on lance une pièce ${m[1]} fois et elle tombe sur face ${m[2]} fois. Que peut-on conclure ?`,
          correctLabel: labelsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => labelsFr[d] ?? d),
          explanationSteps: ["Compare la fréquence relative à la probabilité théorique de 0,5, et vérifie qu'il y a assez d'essais pour s'y fier."],
          hints: ["La fréquence relative ne devient une estimation fiable de la probabilité qu'après de nombreux essais."]
        };
      }
    },
    declaredVariationSpace: 3 * 19 * 10
  }),

  // --- Y8-L9-2: relative and expected frequency ---
  arithmeticTemplate({
    key: "y8l9.expectedFrequencyFromPercent", levelKey: "Y8L9", objectiveCode: "Y8-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["EXPECTED_FREQUENCY_ERROR"], type: "MULTI_STEP", contextPool: EXPERIMENTS,
    ranges: [[1, 99], [1, 30]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ pct: v[0]!, trials: 100 * v[1]! }),
    promptTemplates: [
      "An outcome has probability {pct}%. In {trials} trials, how many times would you expect it?",
      "{ctx} gives a result {pct}% of the time. Over {trials} trials, what is the expected frequency?"
    ],
    explain: (v, r) => [`Expected frequency = probability x number of trials.`, `${v[0]}% of ${100 * v[1]!} = ${r}.`],
    hints: () => ["Multiply the probability by the number of trials — the answer need not be a whole number in general."],
    fr: {
      contextPool: EXPERIMENTS_FR,
      promptTemplates: [
        "Une issue a une probabilité de {pct} %. Sur {trials} essais, combien de fois t'attends-tu à l'observer ?",
        "{ctx} donne un résultat {pct} % du temps. Sur {trials} essais, quel est l'effectif attendu ?"
      ],
      explain: (v, r) => [`Effectif attendu = probabilité x nombre d'essais.`, `${v[0]} % de ${100 * v[1]!} = ${r}.`],
      hints: () => ["Multiplie la probabilité par le nombre d'essais — en général le résultat n'est pas forcément entier."]
    },
    declaredVariationSpace: 99 * 30 * (1 + EXPERIMENTS.length)
  }),
  arithmeticTemplate({
    key: "y8l9.expectedFrequencyFromFraction", levelKey: "Y8L9", objectiveCode: "Y8-L9-2", difficulty: "FLUENCY",
    misconceptionTags: ["EXPECTED_FREQUENCY_ERROR"], type: "NUMBER_ENTRY", contextPool: EXPERIMENTS,
    ranges: [[2, 12], [2, 50]], compute: (v) => v[1]!,
    derive: (v) => ({ sections: v[0]!, trials: v[0]! * v[1]! }),
    promptTemplates: [
      "A fair spinner has {sections} equal sections. In {trials} spins, how many times would you expect one chosen section?",
      "{ctx} has {sections} equally likely outcomes. Over {trials} trials, what is the expected frequency of one of them?"
    ],
    explain: (v, r) => [`Each outcome has probability 1/${v[0]}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["With equally likely outcomes, share the trials equally between them."],
    fr: {
      contextPool: EXPERIMENTS_FR,
      promptTemplates: [
        "Une roue équilibrée a {sections} secteurs égaux. Sur {trials} tours, combien de fois t'attends-tu à un secteur choisi ?",
        "{ctx} a {sections} issues équiprobables. Sur {trials} essais, quel est l'effectif attendu de l'une d'elles ?"
      ],
      explain: (v, r) => [`Chaque issue a une probabilité de 1/${v[0]}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Avec des issues équiprobables, répartis les essais également entre elles."]
    },
    declaredVariationSpace: 11 * 49 * (1 + EXPERIMENTS.length)
  }),
  arithmeticTemplate({
    key: "y8l9.relativeFrequencyPercent", levelKey: "Y8L9", objectiveCode: "Y8-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["RELATIVE_FREQUENCY_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 99], [1, 25]], compute: (v) => v[0]!,
    derive: (v) => ({ hits: v[0]! * v[1]!, trials: 100 * v[1]! }),
    promptTemplates: [
      "An experiment of {trials} trials gave {hits} successes. What is the relative frequency, as a percentage?",
      "Out of {trials} attempts, {hits} worked. Express the relative frequency as a percentage."
    ],
    explain: (v, r) => [`Relative frequency = successes ÷ trials.`, `${v[0]! * v[1]!} ÷ ${100 * v[1]!} x 100 = ${r}%.`],
    hints: () => ["Relative frequency is an experimental estimate of probability — divide, then convert to a percentage."],
    fr: {
      promptTemplates: [
        "Une expérience de {trials} essais a donné {hits} réussites. Quelle est la fréquence relative, en pourcentage ?",
        "Sur {trials} tentatives, {hits} ont fonctionné. Exprime la fréquence relative en pourcentage."
      ],
      explain: (v, r) => [`Fréquence relative = réussites ÷ essais.`, `${v[0]! * v[1]!} ÷ ${100 * v[1]!} x 100 = ${r} %.`],
      hints: () => ["La fréquence relative est une estimation expérimentale de la probabilité — divise, puis convertis en pourcentage."]
    },
    declaredVariationSpace: 99 * 25 * 2
  }),
  arithmeticTemplate({
    key: "y8l9.estimateFromRelativeFrequency", levelKey: "Y8L9", objectiveCode: "Y8-L9-2", difficulty: "REASONING",
    misconceptionTags: ["EXPECTED_FREQUENCY_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 49], [1, 20], [2, 30]], compute: (v) => v[0]! * v[2]!,
    derive: (v) => ({ hits: v[0]! * v[1]!, trials: 100 * v[1]!, future: 100 * v[2]! }),
    promptTemplates: [
      "A trial of {trials} attempts gave {hits} successes. Based on that, how many successes would you expect in {future} attempts?",
      "{hits} out of {trials} seeds germinated. Estimate how many of {future} seeds will germinate."
    ],
    explain: (v, r) => [
      `The relative frequency is ${v[0]! * v[1]!} ÷ ${100 * v[1]!} = ${v[0]}%.`,
      `${v[0]}% of ${100 * v[2]!} = ${r}.`
    ],
    hints: () => ["Use the relative frequency from the experiment as your estimate of the probability, then scale up."],
    fr: {
      promptTemplates: [
        "Un essai de {trials} tentatives a donné {hits} réussites. Sur cette base, combien de réussites attends-tu sur {future} tentatives ?",
        "{hits} graines sur {trials} ont germé. Estime combien de graines germeront sur {future}."
      ],
      explain: (v, r) => [
        `La fréquence relative est ${v[0]! * v[1]!} ÷ ${100 * v[1]!} = ${v[0]} %.`,
        `${v[0]} % de ${100 * v[2]!} = ${r}.`
      ],
      hints: () => ["Utilise la fréquence relative de l'expérience comme estimation de la probabilité, puis applique-la au nouveau total."]
    },
    declaredVariationSpace: 49 * 20 * 29
  }),
  categoricalPoolTemplate({
    key: "y8l9.tfRelativeFrequencyClaim", levelKey: "Y8L9", objectiveCode: "Y8-L9-2", difficulty: "REASONING",
    misconceptionTags: ["RELATIVE_FREQUENCY_ERROR"], type: "TRUE_FALSE",
    pools: {},
    build: (_picked, rng) => {
      const n = rng.int(10, 500);
      const k = rng.int(2, 12);
      const valid = rng.chance(0.5);
      const validClaims = [
        `relative frequency becomes a better estimate of probability as the number of trials grows beyond ${n}`,
        `expected frequency is the probability multiplied by the ${n} trials`,
        `a fair ${k}-sided spinner gives each section a probability of 1 out of ${k}`,
        `an experiment of ${n} trials can give a relative frequency slightly different from the theoretical probability`
      ];
      const invalidClaims = [
        `relative frequency becomes a worse estimate of probability as the number of trials grows beyond ${n}`,
        `expected frequency is the probability divided by the ${n} trials`,
        `a fair ${k}-sided spinner gives each section a probability of ${k}`,
        `an experiment of ${n} trials must give a relative frequency exactly equal to the theoretical probability`
      ];
      const claim = rng.pick(valid ? validClaims : invalidClaims);
      return {
        prompt: `${claim.charAt(0).toUpperCase()}${claim.slice(1)}. True or false?`,
        correctLabel: valid ? "True" : "False",
        distractorLabels: [valid ? "False" : "True"],
        explanationSteps: [valid
          ? "More trials make relative frequency a better estimate, and expected frequency is probability multiplied by the number of trials."
          : "More trials improve the estimate rather than worsening it, expected frequency multiplies rather than divides, and experimental results rarely match theory exactly."],
        hints: ["Probability is never greater than 1, and more trials always help."]
      };
    },
    fr: {
      translate: (drawn) => {
        const isTrue = drawn.correctLabel === "True";
        const body = drawn.prompt.replace(/\. True or false\?$/, "")
          .replace(/^Relative frequency becomes a better estimate of probability as the number of trials grows beyond (\d+)$/, "La fréquence relative devient une meilleure estimation de la probabilité quand le nombre d'essais dépasse $1")
          .replace(/^Relative frequency becomes a worse estimate of probability as the number of trials grows beyond (\d+)$/, "La fréquence relative devient une moins bonne estimation de la probabilité quand le nombre d'essais dépasse $1")
          .replace(/^Expected frequency is the probability multiplied by the (\d+) trials$/, "L'effectif attendu est la probabilité multipliée par les $1 essais")
          .replace(/^Expected frequency is the probability divided by the (\d+) trials$/, "L'effectif attendu est la probabilité divisée par les $1 essais")
          .replace(/^A fair (\d+)-sided spinner gives each section a probability of 1 out of (\d+)$/, "Une roue équilibrée à $1 secteurs donne à chacun une probabilité de 1 sur $2")
          .replace(/^A fair (\d+)-sided spinner gives each section a probability of (\d+)$/, "Une roue équilibrée à $1 secteurs donne à chacun une probabilité de $2")
          .replace(/^An experiment of (\d+) trials can give a relative frequency slightly different from the theoretical probability$/, "Une expérience de $1 essais peut donner une fréquence relative légèrement différente de la probabilité théorique")
          .replace(/^An experiment of (\d+) trials must give a relative frequency exactly equal to the theoretical probability$/, "Une expérience de $1 essais doit donner une fréquence relative exactement égale à la probabilité théorique");
        return {
          prompt: `${body}. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Plus il y a d'essais, meilleure est l'estimation, et l'effectif attendu est la probabilité multipliée par le nombre d'essais."
            : "Plus d'essais améliorent l'estimation au lieu de la dégrader, l'effectif attendu se multiplie et ne se divise pas, et les résultats expérimentaux correspondent rarement exactement à la théorie."],
          hints: ["Une probabilité ne dépasse jamais 1, et plus d'essais aident toujours."]
        };
      }
    },
    declaredVariationSpace: 2 * 4 * 491 * 11
  }),

  // --- Y8-L9-3: central tendency and spread ---
  arithmeticTemplate({
    key: "y8l9.meanOfFive", levelKey: "Y8L9", objectiveCode: "Y8-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "NUMBER_ENTRY", contextPool: DATASETS,
    ranges: [[1, 40], [1, 40], [1, 40], [1, 40], [1, 40]],
    constraint: (v) => (v[0]! + v[1]! + v[2]! + v[3]! + v[4]!) % 5 === 0,
    compute: (v) => (v[0]! + v[1]! + v[2]! + v[3]! + v[4]!) / 5,
    promptTemplates: [
      "Find the mean of {a}, {b}, {c}, {d} and {e}.",
      "Five readings of {ctx} are {a}, {b}, {c}, {d} and {e}. What is the mean?"
    ],
    explain: (v, r) => [`${v.join(" + ")} = ${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!} ÷ 5 = ${r}.`],
    hints: () => ["Add every value, then divide by how many values there are."],
    fr: {
      contextPool: DATASETS_FR,
      promptTemplates: [
        "Trouve la moyenne de {a}, {b}, {c}, {d} et {e}.",
        "Cinq relevés de {ctx} valent {a}, {b}, {c}, {d} et {e}. Quelle est la moyenne ?"
      ],
      explain: (v, r) => [`${v.join(" + ")} = ${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!}.`, `${v[0]! + v[1]! + v[2]! + v[3]! + v[4]!} ÷ 5 = ${r}.`],
      hints: () => ["Additionne toutes les valeurs, puis divise par leur nombre."]
    },
    declaredVariationSpace: 40 * 40 * 40
  }),
  arithmeticTemplate({
    key: "y8l9.medianOfFive", levelKey: "Y8L9", objectiveCode: "Y8-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "NUMBER_ENTRY", contextPool: DATASETS,
    ranges: [[1, 60], [1, 60], [1, 60], [1, 60], [1, 60]],
    compute: (v) => [...v].sort((p, q) => p - q)[2]!,
    promptTemplates: [
      "Find the median of {a}, {b}, {c}, {d} and {e}.",
      "Five values of {ctx} are {a}, {b}, {c}, {d} and {e}. What is the median?"
    ],
    explain: (v, r) => [`In order: ${[...v].sort((p, q) => p - q).join(", ")}.`, `The middle value is ${r}.`],
    hints: () => ["Order the values first — the median is the middle one once sorted."],
    fr: {
      contextPool: DATASETS_FR,
      promptTemplates: [
        "Trouve la médiane de {a}, {b}, {c}, {d} et {e}.",
        "Cinq valeurs de {ctx} sont {a}, {b}, {c}, {d} et {e}. Quelle est la médiane ?"
      ],
      explain: (v, r) => [`Dans l'ordre : ${[...v].sort((p, q) => p - q).join(", ")}.`, `La valeur centrale est ${r}.`],
      hints: () => ["Ordonne d'abord les valeurs — la médiane est celle du milieu une fois triées."]
    },
    declaredVariationSpace: 60 * 60 * 60
  }),
  arithmeticTemplate({
    key: "y8l9.rangeOfData", levelKey: "Y8L9", objectiveCode: "Y8-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["SPREAD_ERROR"], type: "NUMBER_ENTRY", contextPool: DATASETS,
    ranges: [[1, 40], [1, 40], [41, 130], [1, 40]],
    compute: (v) => Math.max(...v) - Math.min(...v),
    promptTemplates: [
      "Find the range of {a}, {b}, {c} and {d}.",
      "Four measurements of {ctx} are {a}, {b}, {c} and {d}. What is the range?"
    ],
    explain: (v, r) => [`The largest is ${Math.max(...v)} and the smallest is ${Math.min(...v)}.`, `${Math.max(...v)} - ${Math.min(...v)} = ${r}.`],
    hints: () => ["The range measures spread: largest minus smallest."],
    fr: {
      contextPool: DATASETS_FR,
      promptTemplates: [
        "Trouve l'étendue de {a}, {b}, {c} et {d}.",
        "Quatre mesures de {ctx} valent {a}, {b}, {c} et {d}. Quelle est l'étendue ?"
      ],
      explain: (v, r) => [`La plus grande est ${Math.max(...v)} et la plus petite ${Math.min(...v)}.`, `${Math.max(...v)} - ${Math.min(...v)} = ${r}.`],
      hints: () => ["L'étendue mesure la dispersion : la plus grande moins la plus petite."]
    },
    declaredVariationSpace: 40 * 40 * 90
  }),
  arithmeticTemplate({
    key: "y8l9.totalFromMean", levelKey: "Y8L9", objectiveCode: "Y8-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "MULTI_STEP", contextPool: DATASETS,
    ranges: [[2, 60], [2, 40]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "The mean of {b} values is {a}. What do they add up to?",
      "{b} measurements of {ctx} have a mean of {a}. What is their total?",
      "A set of {b} numbers has a mean of {a}. Find their sum."
    ],
    explain: (v, r) => [`Total = mean x how many values.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Rearrange mean = total ÷ count to get total = mean x count."],
    fr: {
      contextPool: DATASETS_FR,
      promptTemplates: [
        "La moyenne de {b} valeurs est {a}. Quelle est leur somme ?",
        "{b} mesures de {ctx} ont une moyenne de {a}. Quel est leur total ?",
        "Un ensemble de {b} nombres a une moyenne de {a}. Trouve leur somme."
      ],
      explain: (v, r) => [`Total = moyenne x nombre de valeurs.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Réarrange moyenne = total ÷ effectif pour obtenir total = moyenne x effectif."]
    },
    declaredVariationSpace: 59 * 39 * 3
  }),
  categoricalPoolTemplate({
    key: "y8l9.mcCompareDistributions", levelKey: "Y8L9", objectiveCode: "Y8-L9-3", difficulty: "REASONING",
    misconceptionTags: ["SPREAD_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { focus: ["average", "spread"] },
    build: (picked, rng) => {
      const meanA = rng.int(10, 50);
      const meanB = meanA + rng.int(2, 25);
      const rangeA = rng.int(4, 20);
      const rangeB = rangeA + rng.int(2, 20);
      const focus = picked.focus!;
      const correct = focus === "average"
        ? `class B scored higher on average, because its mean of ${meanB} beats class A's ${meanA}`
        : `class A was more consistent, because its range of ${rangeA} is smaller than class B's ${rangeB}`;
      const wrong = focus === "average"
        ? [`class A scored higher on average, because ${meanA} beats ${meanB}`,
           `the two classes had identical averages`,
           `averages cannot be compared between classes`]
        : [`class B was more consistent, because ${rangeB} is smaller than ${rangeA}`,
           `the two classes were equally consistent`,
           `the range says nothing about consistency`];
      return {
        prompt: `Class A has a mean of ${meanA} and a range of ${rangeA}; class B has a mean of ${meanB} and a range of ${rangeB}. Which comparison about ${focus} is correct?`,
        correctLabel: correct,
        distractorLabels: wrong,
        explanationSteps: [focus === "average"
          ? `A higher mean means higher typical scores, and ${meanB} > ${meanA}.`
          : `A smaller range means the values are closer together, and ${rangeA} < ${rangeB}.`],
        hints: ["Use an average to compare typical values and the range to compare consistency."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const focusFr = picked.focus === "average" ? "la moyenne" : "la dispersion";
        const m = drawn.prompt.match(/^Class A has a mean of (\d+) and a range of (\d+); class B has a mean of (\d+) and a range of (\d+)\./);
        if (!m) return {};
        const toFr = (label: string) => label
          .replace(/^class B scored higher on average, because its mean of (\d+) beats class A's (\d+)$/, "la classe B a mieux réussi en moyenne, car sa moyenne de $1 dépasse celle de $2 de la classe A")
          .replace(/^class A was more consistent, because its range of (\d+) is smaller than class B's (\d+)$/, "la classe A a été plus régulière, car son étendue de $1 est plus petite que celle de $2 de la classe B")
          .replace(/^class A scored higher on average, because (\d+) beats (\d+)$/, "la classe A a mieux réussi en moyenne, car $1 dépasse $2")
          .replace(/^the two classes had identical averages$/, "les deux classes ont eu des moyennes identiques")
          .replace(/^averages cannot be compared between classes$/, "on ne peut pas comparer les moyennes entre classes")
          .replace(/^class B was more consistent, because (\d+) is smaller than (\d+)$/, "la classe B a été plus régulière, car $1 est plus petit que $2")
          .replace(/^the two classes were equally consistent$/, "les deux classes ont été également régulières")
          .replace(/^the range says nothing about consistency$/, "l'étendue ne dit rien de la régularité");
        return {
          prompt: `La classe A a une moyenne de ${m[1]} et une étendue de ${m[2]} ; la classe B a une moyenne de ${m[3]} et une étendue de ${m[4]}. Quelle comparaison sur ${focusFr} est correcte ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          hints: ["Utilise une moyenne pour comparer les valeurs typiques et l'étendue pour comparer la régularité."]
        };
      }
    },
    declaredVariationSpace: 2 * 41 * 24 * 17 * 19
  })
];

export default level;
