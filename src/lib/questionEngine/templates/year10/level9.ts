import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 10, Level 9 — "Probability, sampling and statistics"
const PAIRS = ["tea", "coffee", "football", "netball", "French", "German", "guitar", "piano", "swimming", "cycling"];
const PAIRS_FR = ["le thé", "le café", "le football", "le netball", "le français", "l'allemand", "la guitare", "le piano", "la natation", "le vélo"];
const EVENTS = ["a bus being late", "rain falling", "a free throw being scored", "a seed germinating", "a train being delayed", "a text arriving"];
const EVENTS_FR = ["un bus en retard", "la pluie qui tombe", "un lancer franc réussi", "une graine qui germe", "un train retardé", "un message qui arrive"];
const SURVEYS = ["a school council survey", "a town travel survey", "a canteen menu survey", "a sports club survey", "a library reading survey"];
const SURVEYS_FR = ["une enquête du conseil d'école", "une enquête sur les transports de la ville", "une enquête sur le menu de la cantine", "une enquête d'un club de sport", "une enquête de lecture de la bibliothèque"];

export const level: QuestionTemplateDef[] = [
  // --- Y10-L9-1: probability, including conditional probability, tree and Venn diagrams ---
  arithmeticTemplate({
    key: "y10l9.vennBothRegion", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["VENN_REGION_ERROR"], type: "NUMBER_ENTRY", contextPool: PAIRS,
    ranges: [[20, 120], [10, 110], [10, 110]],
    constraint: (v) => v[1]! < v[0]! && v[2]! < v[0]! && v[1]! + v[2]! > v[0]!,
    compute: (v) => v[1]! + v[2]! - v[0]!,
    promptTemplates: [
      "In a group of {a} people, {b} like tea and {c} like coffee. Everyone likes at least one. How many like both?",
      "{a} students were asked about {ctx} and one other activity: {b} chose the first, {c} chose the second, and everybody chose at least one. How many chose both?"
    ],
    explain: (v, r) => [`${v[1]} + ${v[2]} = ${v[1]! + v[2]!}, which is ${r} more than the ${v[0]} people in the group.`, `That overlap of ${r} is the "both" region of the Venn diagram.`],
    hints: () => ["Add the two totals: anything over the group size has been counted twice, and that is the overlap."],
    fr: {
      contextPool: PAIRS_FR,
      promptTemplates: [
        "Dans un groupe de {a} personnes, {b} aiment le thé et {c} aiment le café. Chacune aime au moins l'un des deux. Combien aiment les deux ?",
        "{a} élèves ont été interrogés sur {ctx} et une autre activité : {b} ont choisi la première, {c} la seconde, et chacun en a choisi au moins une. Combien ont choisi les deux ?"
      ],
      explain: (v, r) => [`${v[1]} + ${v[2]} = ${v[1]! + v[2]!}, soit ${r} de plus que les ${v[0]} personnes du groupe.`, `Ce recouvrement de ${r} est la région « les deux » du diagramme de Venn.`],
      hints: () => ["Additionne les deux totaux : tout ce qui dépasse l'effectif du groupe a été compté deux fois, et c'est le recouvrement."]
    },
    declaredVariationSpace: 101 * 101 * 101
  }),
  arithmeticTemplate({
    key: "y10l9.vennNeitherRegion", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["VENN_REGION_ERROR"], type: "MULTI_STEP", contextPool: PAIRS,
    ranges: [[60, 200], [10, 50], [10, 50], [1, 9]],
    constraint: (v) => v[3]! < v[1]! && v[3]! < v[2]! && v[1]! + v[2]! - v[3]! < v[0]!,
    compute: (v) => v[0]! - (v[1]! + v[2]! - v[3]!),
    promptTemplates: [
      "Of {a} people, {b} play football, {c} play netball and {d} play both. How many play neither?",
      "{a} students were surveyed: {b} study French, {c} study German and {d} study both. How many study neither?"
    ],
    explain: (v, r) => [
      `The number playing at least one is ${v[1]} + ${v[2]} - ${v[3]} = ${v[1]! + v[2]! - v[3]!}.`,
      `${v[0]} - ${v[1]! + v[2]! - v[3]!} = ${r} play neither.`
    ],
    hints: () => ["Fill the Venn diagram from the middle outwards, then subtract the total inside the circles from the whole group."],
    fr: {
      contextPool: PAIRS_FR,
      promptTemplates: [
        "Sur {a} personnes, {b} jouent au football, {c} au netball et {d} aux deux. Combien n'en pratiquent aucun ?",
        "{a} élèves ont été interrogés : {b} étudient le français, {c} l'allemand et {d} les deux. Combien n'étudient ni l'un ni l'autre ?"
      ],
      explain: (v, r) => [
        `Le nombre pratiquant au moins l'un des deux est ${v[1]} + ${v[2]} - ${v[3]} = ${v[1]! + v[2]! - v[3]!}.`,
        `${v[0]} - ${v[1]! + v[2]! - v[3]!} = ${r} n'en pratiquent aucun.`
      ],
      hints: () => ["Remplis le diagramme de Venn du centre vers l'extérieur, puis retire le total des cercles de l'effectif global."]
    },
    declaredVariationSpace: 141 * 41 * 41 * 9
  }),
  arithmeticTemplate({
    key: "y10l9.treeDiagramBothPercent", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "NUMBER_ENTRY", contextPool: EVENTS,
    ranges: [[1, 9], [1, 9]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that both happen, as a percentage?",
      "On a tree diagram the first branch has probability {pa}% and the second {pb}%, and the events are independent. What percentage of the time do both happen?",
      "The chance of {ctx} on Monday is {pa}% and on Tuesday is {pb}%, independently. What is the percentage chance of both?"
    ],
    explain: (v, r) => [`Multiply along the branches: 0.${v[0]!} x 0.${v[1]!} = ${((v[0]! * v[1]!) / 100).toFixed(2)}.`, `As a percentage that is ${r}%.`],
    hints: () => ["On a tree diagram you multiply along the branches to find the probability of both."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité que les deux se produisent, en pourcentage ?",
        "Sur un arbre de probabilité, la première branche a une probabilité de {pa}% et la seconde de {pb}%, et les événements sont indépendants. Dans quel pourcentage des cas les deux se produisent-ils ?",
        "La probabilité {de:ctx} lundi est de {pa}% et mardi de {pb}%, indépendamment. Quelle est la probabilité en pourcentage des deux ?"
      ],
      explain: (v, r) => [`Multiplie le long des branches : ${10 * v[0]!}% x ${10 * v[1]!}%.`, `En pourcentage, cela donne ${r}%.`],
      hints: () => ["Sur un arbre de probabilité, on multiplie le long des branches pour obtenir la probabilité des deux."]
    },
    declaredVariationSpace: 9 * 9 * (2 + EVENTS.length)
  }),
  arithmeticTemplate({
    key: "y10l9.treeDiagramAtLeastOnePercent", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "REASONING",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "MULTI_STEP", contextPool: EVENTS,
    ranges: [[1, 9], [1, 9]], compute: (v) => 100 - (10 - v[0]!) * (10 - v[1]!),
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that at least one happens, as a percentage?",
      "The chance of {ctx} is {pa}% on the first day and {pb}% on the second, independently. What is the percentage chance of it happening at least once?"
    ],
    explain: (v, r) => [
      `Neither happens with probability ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${(10 - v[0]!) * (10 - v[1]!)}%.`,
      `At least one is the rest: 100 - ${(10 - v[0]!) * (10 - v[1]!)} = ${r}%.`
    ],
    hints: () => ["It is quicker to find the probability that neither happens and subtract from 100%."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité qu'au moins l'un se produise, en pourcentage ?",
        "La probabilité {de:ctx} est de {pa}% le premier jour et de {pb}% le second, indépendamment. Quelle est la probabilité en pourcentage que cela arrive au moins une fois ?"
      ],
      explain: (v, r) => [
        `Aucun des deux ne se produit avec une probabilité de ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${(10 - v[0]!) * (10 - v[1]!)}%.`,
        `Au moins un, c'est le reste : 100 - ${(10 - v[0]!) * (10 - v[1]!)} = ${r}%.`
      ],
      hints: () => ["Il est plus rapide de calculer la probabilité qu'aucun ne se produise, puis de la retirer de 100 %."]
    },
    declaredVariationSpace: 9 * 9 * (1 + EVENTS.length)
  }),
  arithmeticTemplate({
    key: "y10l9.conditionalDenominatorFromTable", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "REASONING",
    misconceptionTags: ["CONDITIONAL_PROBABILITY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[5, 60], [5, 60], [5, 60], [5, 60]], compute: (v) => v[0]! + v[1]!,
    promptTemplates: [
      "A two-way table shows {a} students who walk and have a packed lunch, {b} who walk and buy lunch, {c} who travel by bus and have a packed lunch, and {d} who travel by bus and buy lunch. A student who walks is chosen at random. How many students does the probability compare against (the denominator)?",
      "In a two-way table the walkers are split {a} with a packed lunch and {b} buying lunch, while the bus users are {c} and {d}. Given that a student walks, what is the denominator of that conditional probability?"
    ],
    explain: (v, r) => [`Conditional probability restricts you to the walkers only: ${v[0]} + ${v[1]} = ${r}.`, `The denominator is the total of that row, not the whole table.`],
    hints: () => ["\"Given that\" means you only look at that row or column of the table."],
    fr: {
      promptTemplates: [
        "Un tableau à double entrée indique {a} élèves qui marchent et apportent leur repas, {b} qui marchent et achètent leur repas, {c} qui prennent le bus et apportent leur repas, et {d} qui prennent le bus et achètent leur repas. On choisit au hasard un élève qui marche. Sur combien d'élèves la probabilité porte-t-elle (le dénominateur) ?",
        "Dans un tableau à double entrée, les marcheurs se répartissent en {a} avec repas apporté et {b} qui achètent, tandis que les usagers du bus sont {c} et {d}. Sachant qu'un élève marche, quel est le dénominateur de cette probabilité conditionnelle ?"
      ],
      explain: (v, r) => [`La probabilité conditionnelle se limite aux marcheurs : ${v[0]} + ${v[1]} = ${r}.`, `Le dénominateur est le total de cette ligne, pas celui du tableau entier.`],
      hints: () => ["« Sachant que » signifie qu'on ne regarde que cette ligne ou cette colonne du tableau."]
    },
    declaredVariationSpace: 56 * 56 * 56 * 56
  }),
  arithmeticTemplate({
    key: "y10l9.expectedFrequency", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["EXPECTED_FREQUENCY_ERROR"], type: "NUMBER_ENTRY", contextPool: EVENTS,
    ranges: [[1, 9], [2, 60]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ trials: 10 * v[1]! }),
    promptTemplates: [
      "The probability of an event is {a}/10. In {trials} trials, how many times would you expect it to happen?",
      "{Ctx} has a probability of {a}/10. Over {trials} attempts, what is the expected number of times it happens?"
    ],
    explain: (v, r) => [`Expected frequency = probability x number of trials.`, `${v[0]}/10 x ${10 * v[1]!} = ${r}.`],
    hints: () => ["Multiply the probability by the number of trials."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "La probabilité d'un événement est {a}/10. Sur {trials} essais, combien de fois t'attends-tu à ce qu'il se produise ?",
        "{Ctx} a une probabilité de {a}/10. Sur {trials} tentatives, quel est le nombre attendu de réalisations ?"
      ],
      explain: (v, r) => [`Effectif attendu = probabilité x nombre d'essais.`, `${v[0]}/10 x ${10 * v[1]!} = ${r}.`],
      hints: () => ["Multiplie la probabilité par le nombre d'essais."]
    },
    declaredVariationSpace: 9 * 59 * (1 + EVENTS.length)
  }),
  categoricalPoolTemplate({
    key: "y10l9.mcConditionalProbabilityReasoning", levelKey: "Y10L9", objectiveCode: "Y10-L9-1", difficulty: "REASONING",
    misconceptionTags: ["CONDITIONAL_PROBABILITY_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { scenario: ["without replacement", "with replacement"] },
    build: (picked, rng) => {
      const red = rng.int(3, 15);
      const blue = rng.int(3, 15);
      const total = red + blue;
      const withReplacement = picked.scenario === "with replacement";
      const correct = withReplacement
        ? `${red} out of ${total}`
        : `${red - 1} out of ${total - 1}`;
      const wrong = [
        withReplacement ? `${red - 1} out of ${total - 1}` : `${red} out of ${total}`,
        `${red} out of ${total - 1}`,
        `${red - 1} out of ${total}`
      ];
      const distractors: string[] = [];
      for (const w of wrong) {
        if (w === correct || distractors.includes(w)) continue;
        distractors.push(w);
      }
      return {
        prompt: `A bag holds ${red} red and ${blue} blue counters. One red counter is drawn ${picked.scenario}. What is the probability that the next counter is red?`,
        correctLabel: correct,
        distractorLabels: distractors,
        explanationSteps: [withReplacement
          ? `The counter goes back, so the bag is unchanged: ${red} red out of ${total}.`
          : `One red has gone, so there are ${red - 1} red left out of ${total - 1} counters.`],
        hints: ["Ask yourself whether the first counter went back in — that decides whether both numbers drop by one."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const m = drawn.prompt.match(/^A bag holds (\d+) red and (\d+) blue counters\./);
        if (!m) return {};
        const scenarioFr = picked.scenario === "with replacement" ? "avec remise" : "sans remise";
        return {
          prompt: `Un sac contient ${m[1]} jetons rouges et ${m[2]} jetons bleus. On tire un jeton rouge ${scenarioFr}. Quelle est la probabilité que le jeton suivant soit rouge ?`,
          correctLabel: drawn.correctLabel.replace(" out of ", " sur "),
          distractorLabels: drawn.distractorLabels.map((d) => d.replace(" out of ", " sur ")),
          explanationSteps: [picked.scenario === "with replacement"
            ? "Le jeton est remis, donc le sac est inchangé."
            : "Un rouge est parti, donc il reste un rouge en moins sur un total diminué d'un."],
          hints: ["Demande-toi si le premier jeton a été remis — cela décide si les deux nombres baissent de un."]
        };
      }
    },
    declaredVariationSpace: 2 * 13 * 13
  }),

  // --- Y10-L9-2: sampling methods ---
  categoricalPoolTemplate({
    key: "y10l9.mcSamplingMethod", levelKey: "Y10L9", objectiveCode: "Y10-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["SAMPLING_METHOD_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { method: ["random sampling", "stratified sampling", "systematic sampling", "convenience sampling"] },
    build: (picked, rng) => {
      const n = rng.int(20, 120);
      const k = rng.int(3, 20);
      const descriptions: Record<string, string> = {
        "random sampling": `every one of the ${n * 10} names is given a number and ${n} numbers are generated at random`,
        "stratified sampling": `each year group contributes a share of the ${n} people chosen, in proportion to its size`,
        "systematic sampling": `the list is put in order and every ${k}th person is chosen until ${n} are picked`,
        "convenience sampling": `the first ${n} people who happen to walk past the school gate are asked`
      };
      const method = picked.method!;
      return {
        prompt: `For a survey, ${descriptions[method]}. Which sampling method is this?`,
        correctLabel: method,
        distractorLabels: ["random sampling", "stratified sampling", "systematic sampling", "convenience sampling"].filter((m) => m !== method).slice(0, 3),
        explanationSteps: [`Choosing people that way is the definition of ${method}.`],
        hints: ["Look for the key idea: equal chance for all (random), shares by group size (stratified), a fixed interval (systematic), or whoever is easiest to reach (convenience)."]
      };
    },
    fr: {
      translate: (drawn) => {
        const methodsFr: Record<string, string> = {
          "random sampling": "échantillonnage aléatoire",
          "stratified sampling": "échantillonnage stratifié",
          "systematic sampling": "échantillonnage systématique",
          "convenience sampling": "échantillonnage de commodité"
        };
        const m = drawn.prompt.match(/^For a survey, (.+)\. Which sampling method is this\?$/);
        const descFr = (m ? m[1]! : "")
          .replace(/^every one of the (\d+) names is given a number and (\d+) numbers are generated at random$/, "chacun des $1 noms reçoit un numéro et $2 numéros sont tirés au hasard")
          .replace(/^each year group contributes a share of the (\d+) people chosen, in proportion to its size$/, "chaque niveau fournit une part des $1 personnes choisies, proportionnellement à sa taille")
          .replace(/^the list is put in order and every (\d+)th person is chosen until (\d+) are picked$/, "la liste est ordonnée et une personne sur $1 est choisie jusqu'à en avoir $2")
          .replace(/^the first (\d+) people who happen to walk past the school gate are asked$/, "on interroge les $1 premières personnes qui passent devant le portail de l'école");
        return {
          prompt: `Pour une enquête, ${descFr}. De quelle méthode d'échantillonnage s'agit-il ?`,
          correctLabel: methodsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => methodsFr[d] ?? d),
          hints: ["Repère l'idée clé : même chance pour tous (aléatoire), parts selon la taille des groupes (stratifié), un intervalle fixe (systématique) ou les plus faciles à atteindre (commodité)."]
        };
      }
    },
    declaredVariationSpace: 4 * 101 * 18
  }),
  arithmeticTemplate({
    key: "y10l9.stratifiedSampleSize", levelKey: "Y10L9", objectiveCode: "Y10-L9-2", difficulty: "REASONING",
    misconceptionTags: ["STRATIFIED_SAMPLE_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 30], [2, 30], [2, 9]], compute: (v) => v[0]!,
    derive: (v) => ({ g1: v[2]! * v[0]!, g2: v[2]! * v[1]!, total: v[2]! * (v[0]! + v[1]!), sample: v[0]! + v[1]! }),
    promptTemplates: [
      "A school has {g1} boys and {g2} girls, {total} students in total. A stratified sample of {sample} students is taken. How many boys should be in the sample?",
      "In a population of {total} people there are {g1} members of group A and {g2} of group B. A stratified sample of {sample} is required. How many should come from group A?"
    ],
    explain: (v, r) => [
      `The sample is ${v[0]! + v[1]!} out of ${v[2]! * (v[0]! + v[1]!)}, which is 1 in ${v[2]}.`,
      `So take ${v[2]! * v[0]!} ÷ ${v[2]} = ${r} from that group.`
    ],
    hints: () => ["Work out what fraction of the whole population the sample is, then take that same fraction of each group."],
    fr: {
      promptTemplates: [
        "Une école compte {g1} garçons et {g2} filles, soit {total} élèves. On prélève un échantillon stratifié de {sample} élèves. Combien de garçons doit-il contenir ?",
        "Dans une population de {total} personnes, il y a {g1} membres du groupe A et {g2} du groupe B. Un échantillon stratifié de {sample} est demandé. Combien doivent venir du groupe A ?"
      ],
      explain: (v, r) => [
        `L'échantillon est de ${v[0]! + v[1]!} sur ${v[2]! * (v[0]! + v[1]!)}, soit 1 sur ${v[2]}.`,
        `Il faut donc prendre ${v[2]! * v[0]!} ÷ ${v[2]} = ${r} dans ce groupe.`
      ],
      hints: () => ["Calcule quelle fraction de la population entière représente l'échantillon, puis prends cette même fraction de chaque groupe."]
    },
    declaredVariationSpace: 29 * 29 * 8
  }),
  arithmeticTemplate({
    key: "y10l9.captureRecaptureEstimate", levelKey: "Y10L9", objectiveCode: "Y10-L9-2", difficulty: "REASONING",
    misconceptionTags: ["SAMPLING_ESTIMATE_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 20], [2, 25], [10, 90]], compute: (v) => v[2]! * v[0]!,
    derive: (v) => ({ sample: v[0]! * v[1]!, tagged: v[1]!, totalTagged: v[2]! }),
    promptTemplates: [
      "{totalTagged} fish in a lake are tagged and released. Later a sample of {sample} fish is caught and {tagged} of them are tagged. Estimate the number of fish in the lake.",
      "A researcher tags {totalTagged} birds. In a later sample of {sample} birds, {tagged} are tagged. Estimate the size of the whole population."
    ],
    explain: (v, r) => [
      `In the sample, ${v[1]} out of ${v[0]! * v[1]!} are tagged — that is 1 in ${v[0]}.`,
      `If the ${v[2]} tagged animals are also 1 in ${v[0]} of the population, the population is ${v[2]} x ${v[0]} = ${r}.`
    ],
    hints: () => ["Assume the fraction tagged in the sample matches the fraction tagged in the whole population."],
    fr: {
      promptTemplates: [
        "{totalTagged} poissons d'un lac sont marqués et relâchés. Plus tard, un échantillon de {sample} poissons est pêché et {tagged} d'entre eux sont marqués. Estime le nombre de poissons du lac.",
        "Un chercheur marque {totalTagged} oiseaux. Dans un échantillon ultérieur de {sample} oiseaux, {tagged} sont marqués. Estime la taille de la population totale."
      ],
      explain: (v, r) => [
        `Dans l'échantillon, ${v[1]} sur ${v[0]! * v[1]!} sont marqués — soit 1 sur ${v[0]}.`,
        `Si les ${v[2]} animaux marqués représentent aussi 1 sur ${v[0]} de la population, celle-ci compte ${v[2]} x ${v[0]} = ${r}.`
      ],
      hints: () => ["Suppose que la proportion de marqués dans l'échantillon est la même que dans toute la population."]
    },
    declaredVariationSpace: 19 * 24 * 81
  }),
  categoricalPoolTemplate({
    key: "y10l9.tfSamplingBias", levelKey: "Y10L9", objectiveCode: "Y10-L9-2", difficulty: "REASONING",
    misconceptionTags: ["SAMPLING_METHOD_CONFUSION"], type: "TRUE_FALSE",
    pools: { survey: SURVEYS },
    build: (picked, rng) => {
      const n = rng.int(10, 200);
      const biased = rng.chance(0.5);
      const biasedMethods = [
        `asking only the ${n} members of the football team`,
        `asking the first ${n} people to arrive at breakfast club`,
        `asking ${n} friends of the organiser`
      ];
      const fairMethods = [
        `numbering the whole population and choosing ${n} at random`,
        `taking a stratified sample of ${n} in proportion to each year group`,
        `ordering the full register and taking every 5th name until ${n} are chosen`
      ];
      const method = rng.pick(biased ? biasedMethods : fairMethods);
      return {
        prompt: `For ${picked.survey}, ${method} gives a biased sample. True or false?`,
        correctLabel: biased ? "True" : "False",
        distractorLabels: [biased ? "False" : "True"],
        explanationSteps: [biased
          ? "Some parts of the population cannot be chosen, or are far more likely to be chosen, so the sample is biased."
          : "Every member of the population has a fair chance of selection, so the sample is not biased."],
        hints: ["Ask whether every member of the population could end up in the sample with a fair chance."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const surveysFr: Record<string, string> = Object.fromEntries(SURVEYS.map((s, i) => [s, SURVEYS_FR[i]!]));
        const m = drawn.prompt.match(/^For (.+?), (.+) gives a biased sample\. True or false\?$/);
        if (!m) return {};
        const isTrue = drawn.correctLabel === "True";
        const methodFr = m[2]!
          .replace(/^asking only the (\d+) members of the football team$/, "n'interroger que les $1 membres de l'équipe de football")
          .replace(/^asking the first (\d+) people to arrive at breakfast club$/, "interroger les $1 premières personnes arrivées au petit-déjeuner")
          .replace(/^asking (\d+) friends of the organiser$/, "interroger $1 amis de l'organisateur")
          .replace(/^numbering the whole population and choosing (\d+) at random$/, "numéroter toute la population et en choisir $1 au hasard")
          .replace(/^taking a stratified sample of (\d+) in proportion to each year group$/, "prélever un échantillon stratifié de $1 proportionnellement à chaque niveau")
          .replace(/^ordering the full register and taking every 5th name until (\d+) are chosen$/, "ordonner la liste complète et prendre un nom sur 5 jusqu'à en avoir $1");
        return {
          prompt: `Pour ${surveysFr[picked.survey!] ?? picked.survey}, ${methodFr} donne un échantillon biaisé. Vrai ou faux ?`,
          correctLabel: isTrue ? "Vrai" : "Faux",
          distractorLabels: [isTrue ? "Faux" : "Vrai"],
          explanationSteps: [isTrue
            ? "Certaines parties de la population ne peuvent pas être choisies, ou le sont bien plus souvent : l'échantillon est biaisé."
            : "Chaque membre de la population a une chance équitable d'être choisi, donc l'échantillon n'est pas biaisé."],
          hints: ["Demande-toi si chaque membre de la population pourrait se retrouver dans l'échantillon avec une chance équitable."]
        };
      }
    },
    declaredVariationSpace: SURVEYS.length * 191 * 2 * 3
  }),
  categoricalPoolTemplate({
    key: "y10l9.mcImproveSample", levelKey: "Y10L9", objectiveCode: "Y10-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["SAMPLING_METHOD_CONFUSION"], type: "MULTIPLE_CHOICE",
    pools: { problem: ["too small", "not representative", "self-selecting"] },
    build: (picked, rng) => {
      const n = rng.int(5, 40);
      const pop = rng.int(400, 2000);
      const setups: Record<string, string> = {
        "too small": `only ${n} of the ${pop} people in the population were asked`,
        "not representative": `all ${n} people asked came from the same year group out of a population of ${pop}`,
        "self-selecting": `a form was left out and the ${n} people who chose to fill it in out of ${pop} were counted`
      };
      const fixes: Record<string, string> = {
        "too small": "survey many more people",
        "not representative": "take a stratified sample across all the groups",
        "self-selecting": "choose who to ask at random instead of letting people volunteer"
      };
      const problem = picked.problem!;
      return {
        prompt: `In a survey, ${setups[problem]}. What is the best way to improve the sample?`,
        correctLabel: fixes[problem]!,
        distractorLabels: Object.values(fixes).filter((f) => f !== fixes[problem]).concat("round the results to the nearest ten").slice(0, 3),
        explanationSteps: [`The weakness here is that the sample is ${problem}, and that is exactly what this fix addresses.`],
        hints: ["Match the fix to the weakness: size, coverage of every group, or who decided to take part."]
      };
    },
    fr: {
      translate: (drawn) => {
        const fixesFr: Record<string, string> = {
          "survey many more people": "interroger beaucoup plus de personnes",
          "take a stratified sample across all the groups": "prélever un échantillon stratifié sur tous les groupes",
          "choose who to ask at random instead of letting people volunteer": "choisir au hasard qui interroger au lieu de laisser les gens se proposer",
          "round the results to the nearest ten": "arrondir les résultats à la dizaine près"
        };
        const m = drawn.prompt.match(/^In a survey, (.+)\. What is the best way to improve the sample\?$/);
        const setupFr = (m ? m[1]! : "")
          .replace(/^only (\d+) of the (\d+) people in the population were asked$/, "seules $1 des $2 personnes de la population ont été interrogées")
          .replace(/^all (\d+) people asked came from the same year group out of a population of (\d+)$/, "les $1 personnes interrogées venaient toutes du même niveau, sur une population de $2")
          .replace(/^a form was left out and the (\d+) people who chose to fill it in out of (\d+) were counted$/, "un formulaire a été laissé à disposition et les $1 personnes qui ont choisi de le remplir, sur $2, ont été comptées");
        return {
          prompt: `Dans une enquête, ${setupFr}. Quelle est la meilleure façon d'améliorer l'échantillon ?`,
          correctLabel: fixesFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => fixesFr[d] ?? d),
          hints: ["Fais correspondre la solution au défaut : la taille, la couverture de tous les groupes, ou qui a décidé de participer."]
        };
      }
    },
    declaredVariationSpace: 3 * 36 * 1601
  }),

  // --- Y10-L9-3: cumulative frequency, box plots and spread ---
  arithmeticTemplate({
    key: "y10l9.medianPositionFromCumulativeFrequency", levelKey: "Y10L9", objectiveCode: "Y10-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["CUMULATIVE_FREQUENCY_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[20, 400]], constraint: (v) => v[0]! % 2 === 0, compute: (v) => v[0]! / 2,
    promptTemplates: [
      "A cumulative frequency diagram has a total frequency of {a}. At what cumulative frequency do you read across to estimate the median?",
      "{a} values are shown on a cumulative frequency curve. Which cumulative frequency gives the median?",
      "To estimate the median from a cumulative frequency graph of {a} values, which value on the vertical axis do you use?"
    ],
    explain: (v, r) => [`The median is halfway through the data: ${v[0]} ÷ 2 = ${r}.`],
    hints: () => ["Halve the total frequency and read across from there."],
    fr: {
      promptTemplates: [
        "Un diagramme des fréquences cumulées a un effectif total de {a}. À quelle fréquence cumulée lit-on pour estimer la médiane ?",
        "{a} valeurs sont représentées sur une courbe des fréquences cumulées. Quelle fréquence cumulée donne la médiane ?",
        "Pour estimer la médiane sur un graphique des fréquences cumulées de {a} valeurs, quelle valeur de l'axe vertical utilises-tu ?"
      ],
      explain: (v, r) => [`La médiane se trouve à la moitié des données : ${v[0]} ÷ 2 = ${r}.`],
      hints: () => ["Divise l'effectif total par 2 et lis horizontalement à partir de là."]
    },
    declaredVariationSpace: 191 * 3
  }),
  arithmeticTemplate({
    key: "y10l9.interquartileRange", levelKey: "Y10L9", objectiveCode: "Y10-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["IQR_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 60], [61, 120]], compute: (v) => v[1]! - v[0]!,
    promptTemplates: [
      "A box plot has a lower quartile of {a} and an upper quartile of {b}. What is the interquartile range?",
      "From a cumulative frequency curve, Q1 = {a} and Q3 = {b}. Calculate the interquartile range.",
      "The quartiles of a data set are {a} and {b}. What is the IQR?"
    ],
    explain: (v, r) => [`IQR = upper quartile - lower quartile = ${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["The interquartile range is Q3 - Q1 — it measures the spread of the middle half of the data."],
    fr: {
      promptTemplates: [
        "Une boîte à moustaches a un premier quartile de {a} et un troisième quartile de {b}. Quel est l'écart interquartile ?",
        "Sur une courbe des fréquences cumulées, Q1 = {a} et Q3 = {b}. Calcule l'écart interquartile.",
        "Les quartiles d'une série sont {a} et {b}. Quel est l'écart interquartile ?"
      ],
      explain: (v, r) => [`EIQ = troisième quartile - premier quartile = ${v[1]} - ${v[0]} = ${r}.`],
      hints: () => ["L'écart interquartile est Q3 - Q1 — il mesure la dispersion de la moitié centrale des données."]
    },
    declaredVariationSpace: 51 * 60
  }),
  arithmeticTemplate({
    key: "y10l9.rangeFromBoxPlot", levelKey: "Y10L9", objectiveCode: "Y10-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["IQR_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[1, 40], [41, 140]], compute: (v) => v[1]! - v[0]!,
    promptTemplates: [
      "A box plot shows a minimum of {a} and a maximum of {b}. What is the range?",
      "The smallest value on a box plot is {a} and the largest is {b}. Work out the range.",
      "A data set has least value {a} and greatest value {b}. What is its range?"
    ],
    explain: (v, r) => [`Range = largest - smallest = ${v[1]} - ${v[0]} = ${r}.`],
    hints: () => ["The range uses the two whisker ends; the IQR uses the edges of the box."],
    fr: {
      promptTemplates: [
        "Une boîte à moustaches montre un minimum de {a} et un maximum de {b}. Quelle est l'étendue ?",
        "La plus petite valeur d'une boîte à moustaches est {a} et la plus grande {b}. Calcule l'étendue.",
        "Une série a pour valeur minimale {a} et maximale {b}. Quelle est son étendue ?"
      ],
      explain: (v, r) => [`Étendue = plus grande - plus petite = ${v[1]} - ${v[0]} = ${r}.`],
      hints: () => ["L'étendue utilise les extrémités des moustaches ; l'écart interquartile utilise les bords de la boîte."]
    },
    declaredVariationSpace: 40 * 100
  }),
  arithmeticTemplate({
    key: "y10l9.medianOfFiveValues", levelKey: "Y10L9", objectiveCode: "Y10-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "NUMBER_ENTRY",
    ranges: [[1, 60], [1, 60], [1, 60], [1, 60], [1, 60]],
    compute: (v) => [...v].sort((p, q) => p - q)[2]!,
    promptTemplates: [
      "Find the median of {a}, {b}, {c}, {d} and {e}.",
      "Five readings are {a}, {b}, {c}, {d} and {e}. What is the median?"
    ],
    explain: (v, r) => [`In order: ${[...v].sort((p, q) => p - q).join(", ")}.`, `The middle value is ${r}.`],
    hints: () => ["Put the values in order first, then take the middle one."],
    fr: {
      promptTemplates: [
        "Trouve la médiane de {a}, {b}, {c}, {d} et {e}.",
        "Cinq relevés valent {a}, {b}, {c}, {d} et {e}. Quelle est la médiane ?"
      ],
      explain: (v, r) => [`Dans l'ordre : ${[...v].sort((p, q) => p - q).join(", ")}.`, `La valeur centrale est ${r}.`],
      hints: () => ["Mets d'abord les valeurs dans l'ordre, puis prends celle du milieu."]
    },
    declaredVariationSpace: 60 * 60 * 60
  }),
  arithmeticTemplate({
    key: "y10l9.cumulativeFrequencyAbove", levelKey: "Y10L9", objectiveCode: "Y10-L9-3", difficulty: "REASONING",
    misconceptionTags: ["CUMULATIVE_FREQUENCY_ERROR"], type: "MULTI_STEP", pathway: "HIGHER",
    ranges: [[60, 400], [10, 350], [20, 90]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "A cumulative frequency curve covers {a} values. Reading up from {c} marks gives a cumulative frequency of {b}. Estimate how many values are above {c} marks.",
      "{a} times were recorded. The cumulative frequency at {c} seconds is {b}. How many times were longer than {c} seconds?"
    ],
    explain: (v, r) => [
      `The cumulative frequency of ${v[1]} counts everything at or below that point.`,
      `${v[0]} - ${v[1]} = ${r} values are above it.`
    ],
    hints: () => ["Cumulative frequency counts upwards from the bottom, so subtract it from the total to get what is above."],
    fr: {
      promptTemplates: [
        "Une courbe des fréquences cumulées porte sur {a} valeurs. En remontant depuis {c} points, on lit une fréquence cumulée de {b}. Estime combien de valeurs dépassent {c} points.",
        "{a} temps ont été relevés. La fréquence cumulée à {c} secondes est {b}. Combien de temps dépassaient {c} secondes ?"
      ],
      explain: (v, r) => [
        `La fréquence cumulée de ${v[1]} compte tout ce qui est inférieur ou égal à ce point.`,
        `${v[0]} - ${v[1]} = ${r} valeurs sont au-dessus.`
      ],
      hints: () => ["La fréquence cumulée compte depuis le bas : soustrais-la du total pour obtenir ce qui est au-dessus."]
    },
    declaredVariationSpace: 341 * 341 * 71
  }),
  categoricalPoolTemplate({
    key: "y10l9.mcCompareBoxPlots", levelKey: "Y10L9", objectiveCode: "Y10-L9-3", difficulty: "REASONING",
    misconceptionTags: ["IQR_ERROR"], type: "MULTIPLE_CHOICE", pathway: "HIGHER",
    pools: { focus: ["median", "spread"] },
    build: (picked, rng) => {
      const medA = rng.int(20, 60);
      const medB = medA + rng.int(2, 25);
      const iqrA = rng.int(5, 20);
      const iqrB = iqrA + rng.int(2, 20);
      const focus = picked.focus!;
      const correct = focus === "median"
        ? `class B scored higher on average, because its median of ${medB} is above class A's ${medA}`
        : `class A was more consistent, because its interquartile range of ${iqrA} is smaller than class B's ${iqrB}`;
      const wrong = focus === "median"
        ? [
          `class A scored higher on average, because ${medA} is above ${medB}`,
          `the two classes had identical averages`,
          `nothing can be said about the averages from box plots`
        ]
        : [
          `class B was more consistent, because ${iqrB} is smaller than ${iqrA}`,
          `the two classes had identical spreads`,
          `consistency cannot be judged from a box plot`
        ];
      return {
        prompt: `Two box plots are compared. Class A has a median of ${medA} and an interquartile range of ${iqrA}; class B has a median of ${medB} and an interquartile range of ${iqrB}. Which comparison about ${focus} is correct?`,
        correctLabel: correct,
        distractorLabels: wrong,
        explanationSteps: [focus === "median"
          ? `A higher median means higher typical scores, and ${medB} > ${medA}.`
          : `A smaller interquartile range means the middle half of the data is more tightly packed, and ${iqrA} < ${iqrB}.`],
        hints: ["Use the median to compare typical values and the interquartile range to compare consistency."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const focusFr = picked.focus === "median" ? "la médiane" : "la dispersion";
        const m = drawn.prompt.match(/Class A has a median of (\d+) and an interquartile range of (\d+); class B has a median of (\d+) and an interquartile range of (\d+)\./);
        if (!m) return {};
        const toFr = (label: string) => label
          .replace(/^class B scored higher on average, because its median of (\d+) is above class A's (\d+)$/, "la classe B a mieux réussi en moyenne, car sa médiane de $1 dépasse celle de $2 de la classe A")
          .replace(/^class A was more consistent, because its interquartile range of (\d+) is smaller than class B's (\d+)$/, "la classe A a été plus régulière, car son écart interquartile de $1 est plus petit que celui de $2 de la classe B")
          .replace(/^class A scored higher on average, because (\d+) is above (\d+)$/, "la classe A a mieux réussi en moyenne, car $1 dépasse $2")
          .replace(/^the two classes had identical averages$/, "les deux classes ont eu des moyennes identiques")
          .replace(/^nothing can be said about the averages from box plots$/, "on ne peut rien dire des moyennes à partir de boîtes à moustaches")
          .replace(/^class B was more consistent, because (\d+) is smaller than (\d+)$/, "la classe B a été plus régulière, car $1 est plus petit que $2")
          .replace(/^the two classes had identical spreads$/, "les deux classes ont eu des dispersions identiques")
          .replace(/^consistency cannot be judged from a box plot$/, "la régularité ne peut pas être jugée sur une boîte à moustaches");
        return {
          prompt: `Deux boîtes à moustaches sont comparées. La classe A a une médiane de ${m[1]} et un écart interquartile de ${m[2]} ; la classe B a une médiane de ${m[3]} et un écart interquartile de ${m[4]}. Quelle comparaison sur ${focusFr} est correcte ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          hints: ["Utilise la médiane pour comparer les valeurs typiques et l'écart interquartile pour comparer la régularité."]
        };
      }
    },
    declaredVariationSpace: 2 * 41 * 24 * 16 * 19
  })
];

export default level;
