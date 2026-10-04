import { arithmeticTemplate, categoricalPoolTemplate } from "../../builders";
import type { QuestionTemplateDef } from "../../types";

// Year 9, Level 9 — "Probability and statistics"
const SPINNERS = ["a spinner", "a dice", "a set of cards", "a bag of counters", "a raffle drum", "a number wheel"];
const SPINNERS_FR = ["une roue", "un dé", "un jeu de cartes", "un sac de jetons", "une urne de tombola", "une roue numérotée"];
const EVENTS = ["a bus being late", "a free throw being scored", "a seed germinating", "rain falling", "a train being on time", "a light turning green"];
const EVENTS_FR = ["un bus en retard", "un lancer franc réussi", "une graine qui germe", "la pluie qui tombe", "un train à l'heure", "un feu qui passe au vert"];
const DATASETS = ["test scores", "reaction times", "daily temperatures", "plant heights", "race times", "goals scored"];
const DATASETS_FR = ["des notes de contrôle", "des temps de réaction", "des températures quotidiennes", "des hauteurs de plantes", "des temps de course", "des buts marqués"];

export const level: QuestionTemplateDef[] = [
  // --- Y9-L9-1: sample spaces for single and combined events ---
  arithmeticTemplate({
    key: "y9l9.combinedSampleSpaceSize", levelKey: "Y9L9", objectiveCode: "Y9-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["SAMPLE_SPACE_ERROR"], type: "NUMBER_ENTRY", contextPool: SPINNERS,
    ranges: [[2, 20], [2, 20]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "A spinner has {a} equal sections and a dice has {b} faces. How many outcomes are in the sample space when both are used?",
      "{ctx} with {a} equally likely results is used together with a second one with {b} results. How many combined outcomes are there?"
    ],
    explain: (v, r) => [`Each of the ${v[0]} first results can pair with each of the ${v[1]} second results.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Multiply the number of outcomes of each event — a two-way table would have that many cells."],
    fr: {
      contextPool: SPINNERS_FR,
      promptTemplates: [
        "Une roue a {a} secteurs égaux et un dé a {b} faces. Combien d'issues compte l'univers quand on utilise les deux ?",
        "{ctx} avec {a} résultats équiprobables est utilisé avec un second qui en a {b}. Combien d'issues combinées y a-t-il ?"
      ],
      explain: (v, r) => [`Chacun des ${v[0]} premiers résultats peut se combiner à chacun des ${v[1]} seconds.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Multiplie le nombre d'issues de chaque événement — un tableau à double entrée aurait autant de cases."]
    },
    declaredVariationSpace: 19 * 19 * (1 + SPINNERS.length)
  }),
  arithmeticTemplate({
    key: "y9l9.threeEventSampleSpace", levelKey: "Y9L9", objectiveCode: "Y9-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["SAMPLE_SPACE_ERROR"], type: "MULTI_STEP",
    ranges: [[2, 9], [2, 9], [2, 9]], compute: (v) => v[0]! * v[1]! * v[2]!,
    promptTemplates: [
      "A meal deal offers {a} sandwiches, {b} drinks and {c} snacks. How many different meals are possible?",
      "Three spinners have {a}, {b} and {c} equal sections. How many outcomes are in the combined sample space?",
      "An outfit is made from {a} tops, {b} trousers and {c} pairs of shoes. How many different outfits are there?"
    ],
    explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!} ways for the first two choices.`, `${v[0]! * v[1]!} x ${v[2]} = ${r} altogether.`],
    hints: () => ["Multiply the number of choices at each stage."],
    fr: {
      promptTemplates: [
        "Un menu propose {a} sandwichs, {b} boissons et {c} en-cas. Combien de repas différents sont possibles ?",
        "Trois roues ont {a}, {b} et {c} secteurs égaux. Combien d'issues compte l'univers combiné ?",
        "Une tenue se compose de {a} hauts, {b} pantalons et {c} paires de chaussures. Combien de tenues différentes y a-t-il ?"
      ],
      explain: (v, r) => [`${v[0]} x ${v[1]} = ${v[0]! * v[1]!} façons pour les deux premiers choix.`, `${v[0]! * v[1]!} x ${v[2]} = ${r} en tout.`],
      hints: () => ["Multiplie le nombre de choix à chaque étape."]
    },
    declaredVariationSpace: 8 * 8 * 8 * 3
  }),
  arithmeticTemplate({
    key: "y9l9.complementOutcomes", levelKey: "Y9L9", objectiveCode: "Y9-L9-1", difficulty: "FLUENCY",
    misconceptionTags: ["SAMPLE_SPACE_ERROR"], type: "NUMBER_ENTRY",
    ranges: [[10, 120], [1, 110]], constraint: (v) => v[1]! < v[0]!,
    compute: (v) => v[0]! - v[1]!,
    promptTemplates: [
      "A sample space has {a} equally likely outcomes, of which {b} are favourable. How many outcomes are not favourable?",
      "Out of {a} possible results, {b} count as a win. How many do not count as a win?",
      "{a} tickets are in a draw and {b} of them win a prize. How many tickets do not win?"
    ],
    explain: (v, r) => [`Everything that is not favourable is the rest of the sample space.`, `${v[0]} - ${v[1]} = ${r}.`],
    hints: () => ["The favourable and unfavourable outcomes together make the whole sample space."],
    fr: {
      promptTemplates: [
        "Un univers compte {a} issues équiprobables, dont {b} sont favorables. Combien d'issues ne sont pas favorables ?",
        "Sur {a} résultats possibles, {b} comptent comme une victoire. Combien n'en sont pas une ?",
        "{a} billets sont dans un tirage et {b} d'entre eux gagnent un lot. Combien de billets ne gagnent pas ?"
      ],
      explain: (v, r) => [`Tout ce qui n'est pas favorable constitue le reste de l'univers.`, `${v[0]} - ${v[1]} = ${r}.`],
      hints: () => ["Les issues favorables et défavorables forment ensemble tout l'univers."]
    },
    declaredVariationSpace: 111 * 110
  }),
  arithmeticTemplate({
    key: "y9l9.expectedFrequencyFromSpinner", levelKey: "Y9L9", objectiveCode: "Y9-L9-1", difficulty: "APPLICATION",
    misconceptionTags: ["EXPECTED_FREQUENCY_ERROR"], type: "MULTI_STEP", contextPool: SPINNERS,
    ranges: [[2, 12], [2, 50]], compute: (v) => v[1]!,
    derive: (v) => ({ sections: v[0]!, trials: v[0]! * v[1]! }),
    promptTemplates: [
      "A fair spinner has {sections} equal sections. In {trials} spins, how many times would you expect to land on one chosen section?",
      "{ctx} has {sections} equally likely results. Over {trials} trials, what is the expected number of times one particular result occurs?"
    ],
    explain: (v, r) => [`Each section has probability 1/${v[0]}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
    hints: () => ["Expected frequency = probability x number of trials."],
    fr: {
      contextPool: SPINNERS_FR,
      promptTemplates: [
        "Une roue équilibrée a {sections} secteurs égaux. Sur {trials} tours, combien de fois t'attends-tu à tomber sur un secteur choisi ?",
        "{ctx} a {sections} résultats équiprobables. Sur {trials} essais, quel est le nombre attendu de fois où un résultat particulier se produit ?"
      ],
      explain: (v, r) => [`Chaque secteur a une probabilité de 1/${v[0]}.`, `${v[0]! * v[1]!} ÷ ${v[0]} = ${r}.`],
      hints: () => ["Effectif attendu = probabilité x nombre d'essais."]
    },
    declaredVariationSpace: 11 * 49 * (1 + SPINNERS.length)
  }),
  categoricalPoolTemplate({
    key: "y9l9.mcSampleSpaceReasoning", levelKey: "Y9L9", objectiveCode: "Y9-L9-1", difficulty: "REASONING",
    misconceptionTags: ["SAMPLE_SPACE_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { feature: ["the total number of outcomes", "the number of ways to get a particular total", "the most likely total", "the least likely total"] },
    build: (picked, rng) => {
      const faces = rng.int(4, 12);
      const answers: Record<string, string> = {
        "the total number of outcomes": `${faces * faces}`,
        "the number of ways to get a particular total": `at most ${faces}`,
        "the most likely total": `${faces + 1}`,
        "the least likely total": `2 or ${2 * faces}`
      };
      const feature = picked.feature!;
      return {
        prompt: `Two fair ${faces}-sided dice are rolled and the scores are added. What is ${feature}?`,
        correctLabel: answers[feature]!,
        distractorLabels: Object.values(answers).filter((a) => a !== answers[feature]).slice(0, 3),
        explanationSteps: [`A two-way table of the sample space has ${faces} x ${faces} = ${faces * faces} cells, and the totals along its longest diagonal are the most common.`],
        hints: ["Draw or imagine the two-way table of totals — the middle total appears in the most cells."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const featureFr: Record<string, string> = {
          "the total number of outcomes": "le nombre total d'issues",
          "the number of ways to get a particular total": "le nombre de façons d'obtenir une somme donnée",
          "the most likely total": "la somme la plus probable",
          "the least likely total": "la somme la moins probable"
        };
        const m = drawn.prompt.match(/^Two fair (\d+)-sided dice are rolled/);
        if (!m) return {};
        return {
          prompt: `On lance deux dés équilibrés à ${m[1]} faces et on additionne les scores. Quel est ${featureFr[picked.feature!]} ?`,
          correctLabel: drawn.correctLabel.replace("at most", "au plus").replace(" or ", " ou "),
          distractorLabels: drawn.distractorLabels.map((d) => d.replace("at most", "au plus").replace(" or ", " ou ")),
          hints: ["Dessine ou imagine le tableau à double entrée des sommes — la somme centrale apparaît dans le plus de cases."]
        };
      }
    },
    declaredVariationSpace: 4 * 9 * 20
  }),

  // --- Y9-L9-2: tree diagrams for combined events ---
  arithmeticTemplate({
    key: "y9l9.treeBothPercent", levelKey: "Y9L9", objectiveCode: "Y9-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "NUMBER_ENTRY", contextPool: EVENTS,
    ranges: [[1, 9], [1, 9]], compute: (v) => v[0]! * v[1]!,
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that both happen, as a percentage?",
      "On a tree diagram the first branch is {pa}% and the second is {pb}%, and the events are independent. What percentage of the time do both happen?",
      "The chance of {ctx} is {pa}% on Monday and {pb}% on Tuesday, independently. What is the percentage chance of both?"
    ],
    explain: (v, r) => [`Multiply along the branches: 0.${v[0]} x 0.${v[1]} = ${((v[0]! * v[1]!) / 100).toFixed(2)}.`, `As a percentage that is ${r}%.`],
    hints: () => ["Along the branches you multiply; between the branches you add."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité que les deux se produisent, en pourcentage ?",
        "Sur un arbre de probabilité, la première branche vaut {pa}% et la seconde {pb}%, et les événements sont indépendants. Dans quel pourcentage des cas les deux se produisent-ils ?",
        "La probabilité de {ctx} est de {pa}% lundi et de {pb}% mardi, indépendamment. Quelle est la probabilité en pourcentage des deux ?"
      ],
      explain: (v, r) => [`Multiplie le long des branches : 0,${v[0]} x 0,${v[1]} = ${((v[0]! * v[1]!) / 100).toFixed(2)}.`, `En pourcentage, cela fait ${r} %.`],
      hints: () => ["Le long des branches on multiplie ; entre les branches on additionne."]
    },
    declaredVariationSpace: 9 * 9 * (2 + EVENTS.length)
  }),
  arithmeticTemplate({
    key: "y9l9.treeNeitherPercent", levelKey: "Y9L9", objectiveCode: "Y9-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "MULTI_STEP", contextPool: EVENTS,
    ranges: [[1, 9], [1, 9]], compute: (v) => (10 - v[0]!) * (10 - v[1]!),
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that neither happens, as a percentage?",
      "The chance of {ctx} is {pa}% today and {pb}% tomorrow, independently. What is the percentage chance it happens on neither day?"
    ],
    explain: (v, r) => [
      `P(not the first) = ${100 - 10 * v[0]!}% and P(not the second) = ${100 - 10 * v[1]!}%.`,
      `Multiply along the bottom pair of branches: ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${r}%.`
    ],
    hints: () => ["Work out each 'does not happen' probability first, then multiply along those branches."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité qu'aucun ne se produise, en pourcentage ?",
        "La probabilité de {ctx} est de {pa}% aujourd'hui et de {pb}% demain, indépendamment. Quelle est la probabilité en pourcentage que cela n'arrive ni l'un ni l'autre jour ?"
      ],
      explain: (v, r) => [
        `P(pas le premier) = ${100 - 10 * v[0]!}% et P(pas le second) = ${100 - 10 * v[1]!}%.`,
        `Multiplie le long de la paire de branches du bas : ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${r}%.`
      ],
      hints: () => ["Calcule d'abord chaque probabilité de « ne se produit pas », puis multiplie le long de ces branches."]
    },
    declaredVariationSpace: 9 * 9 * (1 + EVENTS.length)
  }),
  arithmeticTemplate({
    key: "y9l9.treeAtLeastOnePercent", levelKey: "Y9L9", objectiveCode: "Y9-L9-2", difficulty: "REASONING",
    misconceptionTags: ["TREE_DIAGRAM_ERROR"], type: "MULTI_STEP", contextPool: EVENTS,
    ranges: [[1, 9], [1, 9]], compute: (v) => 100 - (10 - v[0]!) * (10 - v[1]!),
    derive: (v) => ({ pa: 10 * v[0]!, pb: 10 * v[1]! }),
    promptTemplates: [
      "Two independent events have probabilities of {pa}% and {pb}%. What is the probability that at least one happens, as a percentage?",
      "The chance of {ctx} is {pa}% on the first day and {pb}% on the second, independently. What is the percentage chance of it happening at least once?"
    ],
    explain: (v, r) => [
      `Neither happens with probability ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${(10 - v[0]!) * (10 - v[1]!)}%.`,
      `At least one is everything else: 100 - ${(10 - v[0]!) * (10 - v[1]!)} = ${r}%.`
    ],
    hints: () => ["'At least one' is the opposite of 'none', so find 'none' and subtract from 100%."],
    fr: {
      contextPool: EVENTS_FR,
      promptTemplates: [
        "Deux événements indépendants ont des probabilités de {pa}% et {pb}%. Quelle est la probabilité qu'au moins l'un se produise, en pourcentage ?",
        "La probabilité de {ctx} est de {pa}% le premier jour et de {pb}% le second, indépendamment. Quelle est la probabilité en pourcentage que cela arrive au moins une fois ?"
      ],
      explain: (v, r) => [
        `Aucun ne se produit avec une probabilité de ${100 - 10 * v[0]!}% x ${100 - 10 * v[1]!}% = ${(10 - v[0]!) * (10 - v[1]!)}%.`,
        `Au moins un, c'est tout le reste : 100 - ${(10 - v[0]!) * (10 - v[1]!)} = ${r}%.`
      ],
      hints: () => ["« Au moins un » est le contraire de « aucun » : calcule « aucun » et retire-le de 100 %."]
    },
    declaredVariationSpace: 9 * 9 * (1 + EVENTS.length)
  }),
  arithmeticTemplate({
    key: "y9l9.dependentSecondDraw", levelKey: "Y9L9", objectiveCode: "Y9-L9-2", difficulty: "APPLICATION",
    misconceptionTags: ["DEPENDENT_EVENT_ERROR"], type: "MULTI_STEP",
    ranges: [[3, 30], [3, 30]], compute: (v) => v[0]! + v[1]! - 1,
    derive: (v) => ({ total: v[0]! + v[1]! }),
    promptTemplates: [
      "A bag holds {a} red and {b} blue counters. One counter is taken out and not replaced. How many counters are left for the second draw?",
      "There are {a} red and {b} blue beads in a jar, {total} in total. After one bead is removed and kept out, how many remain?"
    ],
    explain: (v, r) => [`There were ${v[0]! + v[1]!} counters to start with.`, `Without replacement one has gone: ${v[0]! + v[1]!} - 1 = ${r}.`],
    hints: () => ["Without replacement, the denominator of the second probability is one smaller."],
    fr: {
      promptTemplates: [
        "Un sac contient {a} jetons rouges et {b} bleus. On en retire un sans le remettre. Combien de jetons reste-t-il pour le second tirage ?",
        "Il y a {a} perles rouges et {b} bleues dans un bocal, soit {total} au total. Après en avoir retiré une sans la remettre, combien en reste-t-il ?"
      ],
      explain: (v, r) => [`Il y avait ${v[0]! + v[1]!} jetons au départ.`, `Sans remise, il en manque un : ${v[0]! + v[1]!} - 1 = ${r}.`],
      hints: () => ["Sans remise, le dénominateur de la seconde probabilité diminue de un."]
    },
    declaredVariationSpace: 28 * 28 * 2
  }),
  categoricalPoolTemplate({
    key: "y9l9.mcIndependentOrDependent", levelKey: "Y9L9", objectiveCode: "Y9-L9-2", difficulty: "REASONING",
    misconceptionTags: ["DEPENDENT_EVENT_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { kind: ["independent", "dependent"] },
    build: (picked, rng) => {
      const a = rng.int(3, 20);
      const b = rng.int(3, 20);
      const independent = picked.kind === "independent";
      const setups = independent
        ? [`a counter is taken from a bag of ${a} red and ${b} blue counters, then put back before the next draw`,
           `a fair dice is rolled twice`,
           `a coin is flipped and then a spinner with ${a} sections is spun`]
        : [`two counters are taken from a bag of ${a} red and ${b} blue counters without replacement`,
           `two cards are dealt from the same pack and not returned`,
           `two of the ${a + b} raffle tickets are drawn and kept out of the drum`];
      const setup = rng.pick(setups);
      const correct = independent
        ? "independent — the second probability is unchanged"
        : "dependent — the second probability changes";
      const wrong = independent
        ? ["dependent — the second probability changes", "impossible to say without more information", "mutually exclusive — they cannot both happen"]
        : ["independent — the second probability is unchanged", "impossible to say without more information", "mutually exclusive — they cannot both happen"];
      return {
        prompt: `In this experiment, ${setup}. Are the two events independent or dependent?`,
        correctLabel: correct,
        distractorLabels: wrong,
        explanationSteps: [independent
          ? "Nothing is removed, so the second event starts from exactly the same situation as the first."
          : "Something is removed and not replaced, so the numbers for the second event are different."],
        hints: ["Ask whether anything is taken away and kept — if so, the second probability must change."]
      };
    },
    fr: {
      translate: (drawn) => {
        const labelsFr: Record<string, string> = {
          "independent — the second probability is unchanged": "indépendants — la seconde probabilité est inchangée",
          "dependent — the second probability changes": "dépendants — la seconde probabilité change",
          "impossible to say without more information": "impossible à dire sans plus d'informations",
          "mutually exclusive — they cannot both happen": "incompatibles — ils ne peuvent pas se produire ensemble"
        };
        const m = drawn.prompt.match(/^In this experiment, (.+)\. Are the two events independent or dependent\?$/);
        const setupFr = (m ? m[1]! : "")
          .replace(/^a counter is taken from a bag of (\d+) red and (\d+) blue counters, then put back before the next draw$/, "on tire un jeton d'un sac de $1 rouges et $2 bleus, puis on le remet avant le tirage suivant")
          .replace(/^a fair dice is rolled twice$/, "on lance deux fois un dé équilibré")
          .replace(/^a coin is flipped and then a spinner with (\d+) sections is spun$/, "on lance une pièce puis on fait tourner une roue à $1 secteurs")
          .replace(/^two counters are taken from a bag of (\d+) red and (\d+) blue counters without replacement$/, "on tire deux jetons d'un sac de $1 rouges et $2 bleus sans remise")
          .replace(/^two cards are dealt from the same pack and not returned$/, "on distribue deux cartes du même paquet sans les remettre")
          .replace(/^two of the (\d+) raffle tickets are drawn and kept out of the drum$/, "on tire deux des $1 billets de tombola et on les garde hors de l'urne");
        return {
          prompt: `Dans cette expérience, ${setupFr}. Les deux événements sont-ils indépendants ou dépendants ?`,
          correctLabel: labelsFr[drawn.correctLabel] ?? drawn.correctLabel,
          distractorLabels: drawn.distractorLabels.map((d) => labelsFr[d] ?? d),
          hints: ["Demande-toi si quelque chose est retiré et conservé — si oui, la seconde probabilité change forcément."]
        };
      }
    },
    declaredVariationSpace: 2 * 3 * 18 * 18
  }),

  // --- Y9-L9-3: interpreting, analysing and comparing data ---
  arithmeticTemplate({
    key: "y9l9.meanOfFive", levelKey: "Y9L9", objectiveCode: "Y9-L9-3", difficulty: "FLUENCY",
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
    key: "y9l9.medianOfFive", levelKey: "Y9L9", objectiveCode: "Y9-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "NUMBER_ENTRY", contextPool: DATASETS,
    ranges: [[1, 60], [1, 60], [1, 60], [1, 60], [1, 60]],
    compute: (v) => [...v].sort((p, q) => p - q)[2]!,
    promptTemplates: [
      "Find the median of {a}, {b}, {c}, {d} and {e}.",
      "Five values of {ctx} are {a}, {b}, {c}, {d} and {e}. What is the median?"
    ],
    explain: (v, r) => [`In order: ${[...v].sort((p, q) => p - q).join(", ")}.`, `The middle value is ${r}.`],
    hints: () => ["Order the values first — the median is the one in the middle, not the first one written down."],
    fr: {
      contextPool: DATASETS_FR,
      promptTemplates: [
        "Trouve la médiane de {a}, {b}, {c}, {d} et {e}.",
        "Cinq valeurs de {ctx} sont {a}, {b}, {c}, {d} et {e}. Quelle est la médiane ?"
      ],
      explain: (v, r) => [`Dans l'ordre : ${[...v].sort((p, q) => p - q).join(", ")}.`, `La valeur centrale est ${r}.`],
      hints: () => ["Ordonne d'abord les valeurs — la médiane est celle du milieu, pas la première écrite."]
    },
    declaredVariationSpace: 60 * 60 * 60
  }),
  arithmeticTemplate({
    key: "y9l9.rangeOfData", levelKey: "Y9L9", objectiveCode: "Y9-L9-3", difficulty: "FLUENCY",
    misconceptionTags: ["SPREAD_ERROR"], type: "NUMBER_ENTRY", contextPool: DATASETS,
    ranges: [[1, 40], [1, 40], [41, 120], [1, 40]],
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
    declaredVariationSpace: 40 * 40 * 80
  }),
  arithmeticTemplate({
    key: "y9l9.totalFromMean", levelKey: "Y9L9", objectiveCode: "Y9-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["AVERAGE_CONFUSION"], type: "MULTI_STEP", contextPool: DATASETS,
    ranges: [[2, 60], [2, 40]], compute: (v) => v[0]! * v[1]!,
    promptTemplates: [
      "The mean of {b} values is {a}. What do they add up to?",
      "{b} measurements of {ctx} have a mean of {a}. What is their total?",
      "A set of {b} numbers has a mean of {a}. Find the sum of the set."
    ],
    explain: (v, r) => [`Mean = total ÷ how many, so total = mean x how many.`, `${v[0]} x ${v[1]} = ${r}.`],
    hints: () => ["Rearrange the mean formula: total = mean x number of values."],
    fr: {
      contextPool: DATASETS_FR,
      promptTemplates: [
        "La moyenne de {b} valeurs est {a}. Quelle est leur somme ?",
        "{b} mesures de {ctx} ont une moyenne de {a}. Quel est leur total ?",
        "Un ensemble de {b} nombres a une moyenne de {a}. Trouve la somme de cet ensemble."
      ],
      explain: (v, r) => [`Moyenne = total ÷ effectif, donc total = moyenne x effectif.`, `${v[0]} x ${v[1]} = ${r}.`],
      hints: () => ["Réarrange la formule de la moyenne : total = moyenne x nombre de valeurs."]
    },
    declaredVariationSpace: 59 * 39 * 3
  }),
  arithmeticTemplate({
    key: "y9l9.totalFromFrequencyTable", levelKey: "Y9L9", objectiveCode: "Y9-L9-3", difficulty: "APPLICATION",
    misconceptionTags: ["FREQUENCY_TABLE_ERROR"], type: "MULTI_STEP",
    ranges: [[1, 30], [1, 30], [1, 30]], compute: (v) => v[0]! + 2 * v[1]! + 3 * v[2]!,
    promptTemplates: [
      "A frequency table shows {a} players scored 1 goal, {b} scored 2 and {c} scored 3. How many goals were scored in total?",
      "In a survey {a} households own 1 pet, {b} own 2 and {c} own 3. How many pets are there altogether?"
    ],
    explain: (v, r) => [`Multiply each value by its frequency: 1 x ${v[0]} + 2 x ${v[1]} + 3 x ${v[2]}.`, `${v[0]} + ${2 * v[1]!} + ${3 * v[2]!} = ${r}.`],
    hints: () => ["This is the Σfx column: value times frequency, then add the column up."],
    fr: {
      promptTemplates: [
        "Un tableau d'effectifs indique que {a} joueurs ont marqué 1 but, {b} en ont marqué 2 et {c} en ont marqué 3. Combien de buts au total ?",
        "Dans une enquête, {a} foyers ont 1 animal, {b} en ont 2 et {c} en ont 3. Combien d'animaux en tout ?"
      ],
      explain: (v, r) => [`Multiplie chaque valeur par son effectif : 1 x ${v[0]} + 2 x ${v[1]} + 3 x ${v[2]}.`, `${v[0]} + ${2 * v[1]!} + ${3 * v[2]!} = ${r}.`],
      hints: () => ["C'est la colonne Σfx : valeur fois effectif, puis on additionne la colonne."]
    },
    declaredVariationSpace: 30 * 30 * 30
  }),
  categoricalPoolTemplate({
    key: "y9l9.mcCompareDistributions", levelKey: "Y9L9", objectiveCode: "Y9-L9-3", difficulty: "REASONING",
    misconceptionTags: ["SPREAD_ERROR"], type: "MULTIPLE_CHOICE",
    pools: { focus: ["average", "spread"] },
    build: (picked, rng) => {
      const meanA = rng.int(10, 50);
      const meanB = meanA + rng.int(2, 25);
      const rangeA = rng.int(4, 20);
      const rangeB = rangeA + rng.int(2, 20);
      const focus = picked.focus!;
      const correct = focus === "average"
        ? `group B did better on average, because its mean of ${meanB} is higher than group A's ${meanA}`
        : `group A was more consistent, because its range of ${rangeA} is smaller than group B's ${rangeB}`;
      const wrong = focus === "average"
        ? [`group A did better on average, because ${meanA} is higher than ${meanB}`,
           `the two groups performed identically on average`,
           `means cannot be compared between two groups`]
        : [`group B was more consistent, because ${rangeB} is smaller than ${rangeA}`,
           `the two groups were equally consistent`,
           `the range tells you nothing about consistency`];
      return {
        prompt: `Group A has a mean of ${meanA} and a range of ${rangeA}; group B has a mean of ${meanB} and a range of ${rangeB}. Which comparison about ${focus} is correct?`,
        correctLabel: correct,
        distractorLabels: wrong,
        explanationSteps: [focus === "average"
          ? `A higher mean means higher typical values, and ${meanB} > ${meanA}.`
          : `A smaller range means the values are bunched closer together, and ${rangeA} < ${rangeB}.`],
        hints: ["Use an average to compare typical values and a measure of spread to compare consistency."]
      };
    },
    fr: {
      translate: (drawn, picked) => {
        const focusFr = picked.focus === "average" ? "la moyenne" : "la dispersion";
        const m = drawn.prompt.match(/^Group A has a mean of (\d+) and a range of (\d+); group B has a mean of (\d+) and a range of (\d+)\./);
        if (!m) return {};
        const toFr = (label: string) => label
          .replace(/^group B did better on average, because its mean of (\d+) is higher than group A's (\d+)$/, "le groupe B a mieux réussi en moyenne, car sa moyenne de $1 dépasse celle de $2 du groupe A")
          .replace(/^group A was more consistent, because its range of (\d+) is smaller than group B's (\d+)$/, "le groupe A a été plus régulier, car son étendue de $1 est plus petite que celle de $2 du groupe B")
          .replace(/^group A did better on average, because (\d+) is higher than (\d+)$/, "le groupe A a mieux réussi en moyenne, car $1 dépasse $2")
          .replace(/^the two groups performed identically on average$/, "les deux groupes ont obtenu la même moyenne")
          .replace(/^means cannot be compared between two groups$/, "on ne peut pas comparer les moyennes de deux groupes")
          .replace(/^group B was more consistent, because (\d+) is smaller than (\d+)$/, "le groupe B a été plus régulier, car $1 est plus petit que $2")
          .replace(/^the two groups were equally consistent$/, "les deux groupes ont été également réguliers")
          .replace(/^the range tells you nothing about consistency$/, "l'étendue ne dit rien de la régularité");
        return {
          prompt: `Le groupe A a une moyenne de ${m[1]} et une étendue de ${m[2]} ; le groupe B a une moyenne de ${m[3]} et une étendue de ${m[4]}. Quelle comparaison sur ${focusFr} est correcte ?`,
          correctLabel: toFr(drawn.correctLabel),
          distractorLabels: drawn.distractorLabels.map(toFr),
          hints: ["Utilise une moyenne pour comparer les valeurs typiques et une mesure de dispersion pour comparer la régularité."]
        };
      }
    },
    declaredVariationSpace: 2 * 41 * 24 * 17 * 19
  })
];

export default level;
