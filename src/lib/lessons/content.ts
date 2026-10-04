import type { LessonContent } from "./types";

// Mini-lesson content for the flagship, fully-authored levels. Each level is
// broken into several short lessons (concrete-pictorial-abstract) rather
// than one long explanation, per spec §3B.
export const lessonsByLevelKey: Record<string, LessonContent[]> = {
  Y1L1: [
    {
      order: 1,
      title: "Counting forwards and backwards to 20",
      titleFr: "Compter en avant et en arrière jusqu'à 20",
      concept: "Counting a set of objects and saying the number sequence to 20",
      conceptFr: "Compter un ensemble d'objets et dire la suite des nombres jusqu'à 20",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L1-1"],
      explanationMd:
        "When we count, we say one number name for every object — touching each one as we go so we don't miss any or count one twice.\n\n" +
        "We can count forwards (1, 2, 3...) to find out **how many**, and count backwards (20, 19, 18...) to take away.",
      explanationMdFr:
        "Quand on compte, on dit un nom de nombre pour chaque objet — en touchant chacun d'eux pour ne pas en oublier ou en compter deux fois.\n\n" +
        "On peut compter en avant (1, 2, 3...) pour trouver **combien il y en a**, et compter en arrière (20, 19, 18...) pour enlever.",
      workedExamples: [
        { problem: "Count these 7 stars: ⭐⭐⭐⭐⭐⭐⭐", steps: ["Touch the first star and say 1.", "Touch each next star, saying the next number.", "The last number you say is the total."], answer: "7" },
        { problem: "Count backwards from 12 to 8.", steps: ["Start at 12.", "Say the number before each time: 11, 10, 9, 8.", "Stop at 8."], answer: "12, 11, 10, 9, 8" }
      ],
      workedExamplesFr: [
        { problem: "Compte ces 7 étoiles : ⭐⭐⭐⭐⭐⭐⭐", steps: ["Touche la première étoile et dis 1.", "Touche chaque étoile suivante en disant le nombre suivant.", "Le dernier nombre que tu dis est le total."], answer: "7" },
        { problem: "Compte à rebours de 12 à 8.", steps: ["Commence à 12.", "Dis le nombre précédent à chaque fois : 11, 10, 9, 8.", "Arrête-toi à 8."], answer: "12, 11, 10, 9, 8" }
      ],
      audioScript: "Let's count together! Touch each star as you say the number. Ready? One... two... three...",
      audioScriptFr: "Comptons ensemble ! Touche chaque étoile en disant le nombre. Prêt ? Un... deux... trois..."
    },
    {
      order: 2,
      title: "One more, one less",
      titleFr: "Un de plus, un de moins",
      concept: "Finding one more or one less than a given number using a number line",
      conceptFr: "Trouver un de plus ou un de moins qu'un nombre donné à l'aide d'une droite numérique",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L1-3"],
      explanationMd:
        "On a number line, **one more** means moving one step to the right. **One less** means moving one step to the left.\n\n" +
        "This works for any number up to 20 — try it with your finger on a number line!",
      explanationMdFr:
        "Sur une droite numérique, **un de plus** veut dire avancer d'un pas vers la droite. **Un de moins** veut dire avancer d'un pas vers la gauche.\n\n" +
        "Cela fonctionne pour n'importe quel nombre jusqu'à 20 — essaie avec ton doigt sur une droite numérique !",
      workedExamples: [
        { problem: "What is one more than 8?", steps: ["Find 8 on the number line.", "Move one step to the right.", "You land on 9."], answer: "9" },
        { problem: "What is one less than 15?", steps: ["Find 15 on the number line.", "Move one step to the left.", "You land on 14."], answer: "14" }
      ],
      workedExamplesFr: [
        { problem: "Quel est le nombre juste après 8 ?", steps: ["Trouve 8 sur la droite numérique.", "Avance d'un pas vers la droite.", "Tu arrives sur 9."], answer: "9" },
        { problem: "Quel est le nombre juste avant 15 ?", steps: ["Trouve 15 sur la droite numérique.", "Avance d'un pas vers la gauche.", "Tu arrives sur 14."], answer: "14" }
      ],
      audioScript: "One more means we move forwards one step. One less means we move backwards one step. Let's try it on our number line.",
      audioScriptFr: "Un de plus veut dire qu'on avance d'un pas. Un de moins veut dire qu'on recule d'un pas. Essayons sur notre droite numérique."
    },
    {
      order: 3,
      title: "Reading and writing numbers to 20",
      titleFr: "Lire et écrire les nombres jusqu'à 20",
      concept: "Matching numerals (like 14) to number words (like fourteen)",
      conceptFr: "Associer des chiffres (comme 14) aux mots-nombres (comme quatorze)",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L1-2"],
      explanationMd:
        "A **numeral** is a number written in digits, like 14. A **number word** is the same number written in letters, like *fourteen*.\n\n" +
        "The number words from eleven to nineteen don't follow quite the same pattern as the words after twenty — so these are extra important to practise!",
      explanationMdFr:
        "Un **chiffre** est un nombre écrit avec des chiffres, comme 14. Un **mot-nombre** est le même nombre écrit en lettres, comme *quatorze*.\n\n" +
        "Les mots-nombres de onze à seize ne suivent pas tout à fait le même schéma que les mots après vingt — c'est donc particulièrement important de les pratiquer !",
      workedExamples: [
        { problem: "Write the numeral for 'sixteen'.", steps: ["Say the word slowly: six-teen.", "This means the number after fifteen.", "Write the digits."], answer: "16" },
        { problem: "Write the word for 11.", steps: ["11 is a special one-off word.", "It is not 'oneteen'!"], answer: "eleven" }
      ],
      workedExamplesFr: [
        { problem: "Écris le chiffre pour « seize ».", steps: ["Dis le mot lentement : sei-ze.", "Cela veut dire le nombre après quinze.", "Écris les chiffres."], answer: "16" },
        { problem: "Écris le mot pour 11.", steps: ["11 est un mot particulier, à part.", "Ce n'est pas « un-ze » !"], answer: "onze" }
      ],
      audioScript: "Let's practise reading number words. Some of them, like eleven and twelve, have their own special names to learn.",
      audioScriptFr: "Entraînons-nous à lire les mots-nombres. Certains d'entre eux, comme onze et douze, ont un nom bien à eux à apprendre."
    }
  ],
  Y1L2: [
    {
      order: 1,
      title: "Tens and ones",
      titleFr: "Les dizaines et les unités",
      concept: "Understanding that a two-digit number is made of groups of ten and some extra ones",
      conceptFr: "Comprendre qu'un nombre à deux chiffres est composé de groupes de dix et de quelques unités en plus",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L2-1"],
      explanationMd:
        "We can bundle ten counters together to make **one ten**. Any counters left over are the **ones**.\n\n" +
        "For example, 34 is made of 3 tens and 4 ones — three full bundles of ten, and four more.",
      explanationMdFr:
        "On peut regrouper dix jetons ensemble pour faire **une dizaine**. Les jetons qui restent sont les **unités**.\n\n" +
        "Par exemple, 34 est composé de 3 dizaines et 4 unités — trois paquets complets de dix, et quatre de plus.",
      workedExamples: [
        { problem: "How many tens and ones make 27?", steps: ["Make bundles of ten: 2 bundles = 20.", "Count what's left over: 7.", "27 = 2 tens and 7 ones."], answer: "2 tens, 7 ones" }
      ],
      workedExamplesFr: [
        { problem: "Combien de dizaines et d'unités font 27 ?", steps: ["Fais des paquets de dix : 2 paquets = 20.", "Compte ce qui reste : 7.", "27 = 2 dizaines et 7 unités."], answer: "2 dizaines, 7 unités" }
      ],
      audioScript: "Every time we get ten ones, we bundle them into one ten. Let's build some two-digit numbers together.",
      audioScriptFr: "Chaque fois qu'on obtient dix unités, on les regroupe en une dizaine. Construisons ensemble des nombres à deux chiffres."
    },
    {
      order: 2,
      title: "Counting in 2s, 5s and 10s",
      titleFr: "Compter de 2 en 2, de 5 en 5 et de 10 en 10",
      concept: "Skip counting to count larger amounts quickly",
      conceptFr: "Compter par bonds pour compter rapidement de grandes quantités",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L2-2"],
      explanationMd:
        "Instead of counting one at a time, we can count in jumps! Counting in 10s (10, 20, 30...) is a fast way to count big groups.",
      explanationMdFr:
        "Au lieu de compter un par un, on peut compter par bonds ! Compter de 10 en 10 (10, 20, 30...) est une façon rapide de compter de grands groupes.",
      workedExamples: [
        { problem: "Count in 10s: 10, 20, 30, ___", steps: ["Each jump adds 10.", "30 + 10 = 40."], answer: "40" }
      ],
      workedExamplesFr: [
        { problem: "Compte de 10 en 10 : 10, 20, 30, ___", steps: ["Chaque bond ajoute 10.", "30 + 10 = 40."], answer: "40" }
      ],
      audioScript: "Let's skip count together — in tens this time. Ten, twenty, thirty...",
      audioScriptFr: "Comptons ensemble par bonds — de dix en dix cette fois. Dix, vingt, trente..."
    },
    {
      order: 3,
      title: "Comparing numbers to 100",
      titleFr: "Comparer des nombres jusqu'à 100",
      concept: "Using the tens digit (and then the ones digit) to decide which number is bigger",
      conceptFr: "Utiliser le chiffre des dizaines (puis celui des unités) pour décider quel nombre est le plus grand",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L2-3"],
      explanationMd:
        "To compare two numbers, look at the tens digit first. The number with more tens is bigger. If the tens digits match, compare the ones digit.",
      explanationMdFr:
        "Pour comparer deux nombres, regarde d'abord le chiffre des dizaines. Le nombre qui a le plus de dizaines est le plus grand. Si les chiffres des dizaines sont identiques, compare le chiffre des unités.",
      workedExamples: [
        { problem: "Which is bigger, 52 or 48?", steps: ["52 has 5 tens; 48 has 4 tens.", "5 tens is more than 4 tens."], answer: "52" }
      ],
      workedExamplesFr: [
        { problem: "Lequel est le plus grand, 52 ou 48 ?", steps: ["52 a 5 dizaines ; 48 a 4 dizaines.", "5 dizaines, c'est plus que 4 dizaines."], answer: "52" }
      ],
      audioScript: "When comparing numbers, always check the tens digit first.",
      audioScriptFr: "Pour comparer des nombres, vérifie toujours d'abord le chiffre des dizaines."
    }
  ],
  Y1L3: [
    {
      order: 1,
      title: "What do +, - and = mean?",
      titleFr: "Que signifient +, - et = ?",
      concept: "Reading and understanding the addition, subtraction and equals signs",
      conceptFr: "Lire et comprendre les signes d'addition, de soustraction et d'égalité",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L3-1"],
      explanationMd:
        "The **+** sign means we are putting groups together — add them up.\n\n" +
        "The **-** sign means we are taking some away.\n\n" +
        "The **=** sign means both sides have the same amount.",
      explanationMdFr:
        "Le signe **+** veut dire qu'on réunit des groupes — on les additionne.\n\n" +
        "Le signe **-** veut dire qu'on enlève une partie.\n\n" +
        "Le signe **=** veut dire que les deux côtés ont la même quantité.",
      workedExamples: [
        { problem: "What does the + mean in 3 + 2 = 5?", steps: ["+ means put together.", "3 and 2 are joined.", "Together they make 5."], answer: "add together" },
        { problem: "What does the - mean in 5 - 2 = 3?", steps: ["- means take away.", "2 is taken from 5.", "That leaves 3."], answer: "take away" }
      ],
      workedExamplesFr: [
        { problem: "Que signifie le + dans 3 + 2 = 5 ?", steps: ["+ veut dire réunir.", "3 et 2 sont assemblés.", "Ensemble ils font 5."], answer: "additionner" },
        { problem: "Que signifie le - dans 5 - 2 = 3 ?", steps: ["- veut dire enlever.", "2 est enlevé de 5.", "Il reste alors 3."], answer: "enlever" }
      ],
      audioScript: "Plus means put together. Minus means take away. Equals means both sides match.",
      audioScriptFr: "Plus veut dire réunir. Moins veut dire enlever. Égal veut dire que les deux côtés sont pareils."
    },
    {
      order: 2,
      title: "Adding within 10",
      titleFr: "Additionner jusqu'à 10",
      concept: "Adding two one-digit numbers that total no more than 10",
      conceptFr: "Additionner deux nombres à un chiffre dont le total ne dépasse pas 10",
      representation: "pictorial",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L3-2"],
      explanationMd:
        "To add, start with the bigger number and count on.\n\n" +
        "A **ten frame** helps: fill in squares for each number, then count all the filled squares.",
      explanationMdFr:
        "Pour additionner, pars du plus grand nombre et compte en avançant.\n\n" +
        "Un **cadre de dix** aide : remplis des cases pour chaque nombre, puis compte toutes les cases remplies.",
      workedExamples: [
        { problem: "4 + 3 = ?", steps: ["Start at 4.", "Count on 3 more: 5, 6, 7."], answer: "7" }
      ],
      workedExamplesFr: [
        { problem: "4 + 3 = ?", steps: ["Commence à 4.", "Compte 3 de plus : 5, 6, 7."], answer: "7" }
      ],
      audioScript: "Start with the bigger number, then count on the smaller one.",
      audioScriptFr: "Commence par le plus grand nombre, puis compte en ajoutant le plus petit."
    },
    {
      order: 3,
      title: "Subtracting within 10",
      titleFr: "Soustraire jusqu'à 10",
      concept: "Subtracting a one-digit number from a number up to 10",
      conceptFr: "Soustraire un nombre à un chiffre d'un nombre jusqu'à 10",
      representation: "pictorial",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L3-3"],
      explanationMd:
        "To subtract, start at the first number and count back.\n\n" +
        "You can also cross out squares on a ten frame and count what's left.",
      explanationMdFr:
        "Pour soustraire, pars du premier nombre et compte en reculant.\n\n" +
        "Tu peux aussi rayer des cases sur un cadre de dix et compter ce qu'il reste.",
      workedExamples: [
        { problem: "8 - 3 = ?", steps: ["Start at 8.", "Count back 3: 7, 6, 5."], answer: "5" }
      ],
      workedExamplesFr: [
        { problem: "8 - 3 = ?", steps: ["Commence à 8.", "Compte 3 en arrière : 7, 6, 5."], answer: "5" }
      ],
      audioScript: "Start at the first number and count backwards to take away.",
      audioScriptFr: "Pars du premier nombre et compte en arrière pour enlever."
    }
  ],
  Y1L4: [
    {
      order: 1,
      title: "Adding within 20, crossing 10",
      titleFr: "Additionner jusqu'à 20, en passant par 10",
      concept: "Adding two numbers within 20, bridging through the next ten",
      conceptFr: "Additionner deux nombres jusqu'à 20, en passant par la dizaine suivante",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L4-1"],
      explanationMd:
        "When a sum crosses 10, split the second number: jump to 10 first, then jump the rest of the way.\n\n" +
        "For example, 8 + 5: jump 2 to reach 10, then jump 3 more to reach 13.",
      explanationMdFr:
        "Quand une somme passe par 10, découpe le second nombre : saute d'abord jusqu'à 10, puis termine le trajet.\n\n" +
        "Par exemple, 8 + 5 : saute de 2 pour atteindre 10, puis saute de 3 de plus pour atteindre 13.",
      workedExamples: [
        { problem: "8 + 5 = ?", steps: ["8 + 2 = 10.", "10 + 3 = 13."], answer: "13" }
      ],
      workedExamplesFr: [
        { problem: "8 + 5 = ?", steps: ["8 + 2 = 10.", "10 + 3 = 13."], answer: "13" }
      ],
      audioScript: "Jump to the next ten first, then jump the rest of the way.",
      audioScriptFr: "Saute d'abord jusqu'à la dizaine suivante, puis termine le trajet."
    },
    {
      order: 2,
      title: "Subtracting within 20",
      titleFr: "Soustraire jusqu'à 20",
      concept: "Subtracting numbers within 20, bridging back through a ten",
      conceptFr: "Soustraire des nombres jusqu'à 20, en passant par une dizaine en arrière",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L4-2"],
      explanationMd:
        "When subtracting crosses a ten, jump back to the nearest ten first, then jump back the rest of the way.\n\n" +
        "For example, 13 - 5: jump back 3 to reach 10, then jump back 2 more to reach 8.",
      explanationMdFr:
        "Quand une soustraction passe par une dizaine, saute d'abord en arrière jusqu'à la dizaine la plus proche, puis termine le trajet.\n\n" +
        "Par exemple, 13 - 5 : saute de 3 en arrière pour atteindre 10, puis saute de 2 de plus pour atteindre 8.",
      workedExamples: [
        { problem: "13 - 5 = ?", steps: ["13 - 3 = 10.", "10 - 2 = 8."], answer: "8" }
      ],
      workedExamplesFr: [
        { problem: "13 - 5 = ?", steps: ["13 - 3 = 10.", "10 - 2 = 8."], answer: "8" }
      ],
      audioScript: "Jump back to the nearest ten first, then jump back the rest of the way.",
      audioScriptFr: "Saute d'abord en arrière jusqu'à la dizaine la plus proche, puis termine le trajet."
    },
    {
      order: 3,
      title: "Solving word problems within 20",
      titleFr: "Résoudre des problèmes jusqu'à 20",
      concept: "Choosing addition or subtraction to solve a one-step word problem",
      conceptFr: "Choisir l'addition ou la soustraction pour résoudre un problème en une étape",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L4-3"],
      explanationMd:
        "Read the problem carefully. If more is being added, add. If some is being taken away or given away, subtract.",
      explanationMdFr:
        "Lis le problème attentivement. Si on ajoute quelque chose, additionne. Si on enlève ou donne quelque chose, soustrais.",
      workedExamples: [
        { problem: "There are 9 apples. 6 more are picked. How many now?", steps: ["More are added, so add.", "9 + 6 = 15."], answer: "15" }
      ],
      workedExamplesFr: [
        { problem: "Il y a 9 pommes. 6 de plus sont cueillies. Combien y en a-t-il maintenant ?", steps: ["On ajoute, donc on additionne.", "9 + 6 = 15."], answer: "15" }
      ],
      audioScript: "Decide: are we putting more together, or taking some away?",
      audioScriptFr: "Décide : est-ce qu'on réunit davantage, ou est-ce qu'on enlève quelque chose ?"
    }
  ],
  Y1L5: [
    {
      order: 1,
      title: "Number bonds to 10",
      titleFr: "Compléments à 10",
      concept: "Recalling pairs of numbers that add together to make 10",
      conceptFr: "Se souvenir des paires de nombres qui s'additionnent pour faire 10",
      representation: "pictorial",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L5-1"],
      explanationMd:
        "Number bonds to 10 are pairs that add together to make 10, like 6 and 4, or 7 and 3.\n\n" +
        "Knowing these by heart makes adding and subtracting much faster!",
      explanationMdFr:
        "Les compléments à 10 sont des paires qui s'additionnent pour faire 10, comme 6 et 4, ou 7 et 3.\n\n" +
        "Les connaître par cœur rend l'addition et la soustraction beaucoup plus rapides !",
      workedExamples: [
        { problem: "What bonds with 6 to make 10?", steps: ["Think: 6 and what makes 10?", "6 + 4 = 10."], answer: "4" }
      ],
      workedExamplesFr: [
        { problem: "Qu'est-ce qui s'associe avec 6 pour faire 10 ?", steps: ["Réfléchis : 6 et quoi font 10 ?", "6 + 4 = 10."], answer: "4" }
      ],
      audioScript: "Learn your number bonds to 10 by heart — they help with everything else!",
      audioScriptFr: "Apprends tes compléments à 10 par cœur — ils aident pour tout le reste !"
    },
    {
      order: 2,
      title: "Finding a missing number",
      titleFr: "Trouver un nombre manquant",
      concept: "Finding the missing number in an addition or subtraction sentence",
      conceptFr: "Trouver le nombre manquant dans une phrase d'addition ou de soustraction",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L5-2"],
      explanationMd:
        "The missing number can be anywhere in the sentence. Work out what is known, then use addition or subtraction to find the gap.",
      explanationMdFr:
        "Le nombre manquant peut être n'importe où dans la phrase. Détermine ce que tu sais, puis utilise l'addition ou la soustraction pour trouver le nombre manquant.",
      workedExamples: [
        { problem: "4 + ___ = 9", steps: ["9 - 4 = 5.", "So the missing number is 5."], answer: "5" }
      ],
      workedExamplesFr: [
        { problem: "4 + ___ = 9", steps: ["9 - 4 = 5.", "Le nombre manquant est donc 5."], answer: "5" }
      ],
      audioScript: "Whatever is missing, use the numbers you know to work it out.",
      audioScriptFr: "Quel que soit le nombre manquant, utilise ceux que tu connais pour le trouver."
    },
    {
      order: 3,
      title: "Word problems using number bonds",
      titleFr: "Problèmes à l'aide des compléments",
      concept: "Using number bonds to solve simple worded problems",
      conceptFr: "Utiliser les compléments pour résoudre des problèmes énoncés simples",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L5-3"],
      explanationMd:
        "Read the problem and work out what you know and what you need to find. Number bonds can help you find it quickly.",
      explanationMdFr:
        "Lis le problème et détermine ce que tu sais et ce que tu dois trouver. Les compléments peuvent t'aider à le trouver rapidement.",
      workedExamples: [
        { problem: "A box holds 10 eggs. 7 are inside. How many more are needed to fill it?", steps: ["10 - 7 = 3.", "3 more are needed."], answer: "3" }
      ],
      workedExamplesFr: [
        { problem: "Une boîte contient 10 œufs. 7 sont dedans. Combien de plus faut-il pour la remplir ?", steps: ["10 - 7 = 3.", "Il en faut 3 de plus."], answer: "3" }
      ],
      audioScript: "Use what you know about number bonds to solve the problem.",
      audioScriptFr: "Utilise ce que tu sais sur les compléments pour résoudre le problème."
    }
  ],
  Y1L6: [
    {
      order: 1,
      title: "Grouping",
      titleFr: "Le groupement",
      concept: "Finding how many equal groups fit into a total",
      conceptFr: "Trouver combien de groupes égaux composent un total",
      representation: "concrete",
      visualAid: "array",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L6-1"],
      explanationMd:
        "Grouping means putting objects into equal-sized sets and counting how many sets there are.\n\n" +
        "For example, 10 counters in groups of 2 makes 5 groups.",
      explanationMdFr:
        "Grouper veut dire mettre des objets en ensembles de taille égale et compter combien d'ensembles il y a.\n\n" +
        "Par exemple, 10 jetons en groupes de 2 font 5 groupes.",
      workedExamples: [
        { problem: "8 counters in groups of 2. How many groups?", steps: ["Count out groups of 2: 2, 4, 6, 8.", "That took 4 groups."], answer: "4" }
      ],
      workedExamplesFr: [
        { problem: "8 jetons en groupes de 2. Combien de groupes ?", steps: ["Compte par groupes de 2 : 2, 4, 6, 8.", "Cela fait 4 groupes."], answer: "4" }
      ],
      audioScript: "Count out equal groups, then count how many groups you made.",
      audioScriptFr: "Compte des groupes égaux, puis compte combien de groupes tu as faits."
    },
    {
      order: 2,
      title: "Sharing equally",
      titleFr: "Le partage égal",
      concept: "Sharing a quantity equally between a number of people",
      conceptFr: "Partager une quantité équitablement entre plusieurs personnes",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L6-2"],
      explanationMd:
        "Sharing means giving out objects one at a time, equally, until none are left.\n\n" +
        "For example, 12 sweets shared between 3 friends gives each friend 4.",
      explanationMdFr:
        "Partager veut dire distribuer des objets un par un, équitablement, jusqu'à ce qu'il n'en reste plus.\n\n" +
        "Par exemple, 12 bonbons partagés entre 3 amis donnent 4 à chacun.",
      workedExamples: [
        { problem: "12 sweets shared between 3 friends. How many each?", steps: ["Deal them out one at a time: round 1 gives 3, round 2 gives 3 more...", "Each friend ends up with 4."], answer: "4" }
      ],
      workedExamplesFr: [
        { problem: "12 bonbons partagés entre 3 amis. Combien chacun ?", steps: ["Distribue-les un par un : tour 1 donne 3, tour 2 donne 3 de plus...", "Chaque ami se retrouve avec 4."], answer: "4" }
      ],
      audioScript: "Share one at a time, equally, until everything is given out.",
      audioScriptFr: "Partage un par un, équitablement, jusqu'à ce que tout soit distribué."
    },
    {
      order: 3,
      title: "Arrays of equal groups",
      titleFr: "Quadrillages de groupes égaux",
      concept: "Reading an array of rows and columns to find a total",
      conceptFr: "Lire un quadrillage de rangées et de colonnes pour trouver un total",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L6-3"],
      explanationMd:
        "An array arranges objects in neat rows and columns. Counting the rows and how many are in each row tells you the total.",
      explanationMdFr:
        "Un quadrillage range des objets en rangées et colonnes bien nettes. Compter les rangées et combien il y a dans chaque rangée donne le total.",
      workedExamples: [
        { problem: "An array has 3 rows of 4. How many altogether?", steps: ["3 rows, each with 4.", "4 + 4 + 4 = 12."], answer: "12" }
      ],
      workedExamplesFr: [
        { problem: "Un quadrillage a 3 rangées de 4. Combien en tout ?", steps: ["3 rangées, chacune avec 4.", "4 + 4 + 4 = 12."], answer: "12" }
      ],
      audioScript: "Count the rows, then count how many are in each row.",
      audioScriptFr: "Compte les rangées, puis compte combien il y a dans chaque rangée."
    }
  ],
  Y1L10: [
    {
      order: 1,
      title: "Putting it together: number and calculation",
      titleFr: "Faisons le point : nombres et calculs",
      concept: "Reviewing counting, number bonds and addition/subtraction within 20",
      conceptFr: "Réviser le comptage, les compléments à un nombre et l'addition/soustraction jusqu'à 20",
      representation: "cpa",
      visualAid: "bar-model",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L10-1"],
      explanationMd:
        "This year you have learned to count, compare and calculate with numbers to 20 (and beyond!). A bar model can help you see a whole being split into two parts, whichever operation you need.",
      explanationMdFr:
        "Cette année, tu as appris à compter, comparer et calculer avec des nombres jusqu'à 20 (et même au-delà !). Un modèle en barres peut t'aider à voir un tout séparé en deux parties, quelle que soit l'opération dont tu as besoin.",
      workedExamples: [
        { problem: "8 + 5 = ?", steps: ["Draw a bar for 8 and a bar for 5 next to it.", "Count on from 8: 9, 10, 11, 12, 13."], answer: "13" }
      ],
      workedExamplesFr: [
        { problem: "8 + 5 = ?", steps: ["Dessine une barre pour 8 et une barre pour 5 à côté.", "Compte à partir de 8 : 9, 10, 11, 12, 13."], answer: "13" }
      ],
      audioScript: "Let's remember everything we know about numbers this year.",
      audioScriptFr: "Rappelons-nous tout ce que nous savons sur les nombres cette année."
    },
    {
      order: 2,
      title: "Putting it together: grouping, sharing and fractions",
      titleFr: "Faisons le point : groupements, partages et fractions",
      concept: "Reviewing early multiplication/division and halves/quarters",
      conceptFr: "Réviser les débuts de la multiplication/division et les moitiés/quarts",
      representation: "cpa",
      visualAid: "array",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L10-2"],
      explanationMd:
        "Grouping and sharing help us understand multiplication and division. Halving and quartering split an amount into equal parts.",
      explanationMdFr:
        "Grouper et partager nous aident à comprendre la multiplication et la division. Couper en moitiés ou en quarts sépare une quantité en parts égales.",
      workedExamples: [
        { problem: "Share 8 apples equally between 2 friends.", steps: ["Give one apple at a time to each friend.", "Keep going until none are left."], answer: "4 each" }
      ],
      workedExamplesFr: [
        { problem: "Partage 8 pommes équitablement entre 2 amis.", steps: ["Donne une pomme à la fois à chaque ami.", "Continue jusqu'à ce qu'il n'en reste plus."], answer: "4 chacun" }
      ],
      audioScript: "Sharing equally is an important skill — let's practise it together.",
      audioScriptFr: "Partager équitablement est une compétence importante — entraînons-nous ensemble."
    },
    {
      order: 3,
      title: "Putting it together: measuring, money, time and shape",
      titleFr: "Faisons le point : mesures, argent, temps et formes",
      concept: "Reviewing measurement, money, time and shape knowledge from across the year",
      conceptFr: "Réviser les connaissances sur les mesures, l'argent, le temps et les formes vues durant l'année",
      representation: "cpa",
      visualAid: "clock",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L10-3"],
      explanationMd:
        "You have learned to compare lengths and weights, recognise coins, tell the time to the hour and half hour, and name 2D and 3D shapes.",
      explanationMdFr:
        "Tu as appris à comparer des longueurs et des poids, à reconnaître des pièces, à lire l'heure juste et demie, et à nommer des formes en 2D et en 3D.",
      workedExamples: [
        { problem: "What time does a clock show when both hands point straight up?", steps: ["The hour hand and minute hand both point to 12."], answer: "12 o'clock" }
      ],
      workedExamplesFr: [
        { problem: "Quelle heure montre une horloge quand les deux aiguilles pointent tout droit vers le haut ?", steps: ["La petite aiguille et la grande aiguille pointent toutes les deux vers 12."], answer: "12 heures" }
      ],
      audioScript: "Let's put together everything we know about measuring, money, time and shapes.",
      audioScriptFr: "Rassemblons tout ce que nous savons sur les mesures, l'argent, le temps et les formes."
    }
  ],
  Y4L1: [
    {
      order: 1,
      title: "Thousands, hundreds, tens and ones",
      titleFr: "Les milliers, les centaines, les dizaines et les unités",
      concept: "Understanding place value in four-digit numbers",
      conceptFr: "Comprendre la valeur de position dans les nombres à quatre chiffres",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L1-1"],
      explanationMd:
        "A four-digit number like 3,482 has a **thousands**, **hundreds**, **tens** and **ones** digit. Each place is worth ten times the place to its right.",
      explanationMdFr:
        "Un nombre à quatre chiffres comme 3 482 a un chiffre des **milliers**, des **centaines**, des **dizaines** et des **unités**. Chaque position vaut dix fois la position à sa droite.",
      workedExamples: [
        { problem: "What is the value of the 4 in 3,482?", steps: ["The 4 is in the hundreds column.", "So it is worth 4 hundreds."], answer: "400" }
      ],
      workedExamplesFr: [
        { problem: "Quelle est la valeur du 4 dans 3 482 ?", steps: ["Le 4 est dans la colonne des centaines.", "Il vaut donc 4 centaines."], answer: "400" }
      ],
      audioScript: "Each digit's position tells us its value. Let's break down some four-digit numbers together.",
      audioScriptFr: "La position de chaque chiffre nous indique sa valeur. Décomposons ensemble des nombres à quatre chiffres."
    },
    {
      order: 2,
      title: "Rounding to 10, 100 and 1,000",
      titleFr: "Arrondir à la dizaine, à la centaine et au millier",
      concept: "Rounding numbers to the nearest 10, 100 or 1,000",
      conceptFr: "Arrondir des nombres à la dizaine, à la centaine ou au millier le plus proche",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L1-2"],
      explanationMd:
        "To round, find the digit in the place you're rounding to, then look at the digit just after it. 5 or more rounds up; less than 5 rounds down.",
      explanationMdFr:
        "Pour arrondir, trouve le chiffre à la position à laquelle tu arrondis, puis regarde le chiffre juste après. 5 ou plus arrondit vers le haut ; moins de 5 arrondit vers le bas.",
      workedExamples: [
        { problem: "Round 2,847 to the nearest 100.", steps: ["Look at the tens digit: 4.", "4 is less than 5, so round down.", "The hundreds digit stays as 8."], answer: "2,800" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 2 847 à la centaine la plus proche.", steps: ["Regarde le chiffre des dizaines : 4.", "4 est inférieur à 5, donc on arrondit vers le bas.", "Le chiffre des centaines reste 8."], answer: "2 800" }
      ],
      audioScript: "Rounding helps us estimate. Let's practise rounding some big numbers.",
      audioScriptFr: "Arrondir nous aide à estimer. Entraînons-nous à arrondir de grands nombres."
    },
    {
      order: 3,
      title: "Counting in 6s, 7s, 9s, 25s and 1,000s",
      titleFr: "Compter de 6 en 6, de 7 en 7, de 9 en 9, de 25 en 25 et de 1 000 en 1 000",
      concept: "Extending skip counting to less familiar step sizes",
      conceptFr: "Étendre le comptage par bonds à des pas moins familiers",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L1-3"],
      explanationMd:
        "Just like counting in 2s, 5s and 10s, we can count in any step size — even 6s, 7s, 9s or 25s. Add the step size each time.",
      explanationMdFr:
        "Tout comme compter de 2 en 2, de 5 en 5 et de 10 en 10, on peut compter par n'importe quel pas — même de 6 en 6, de 7 en 7, de 9 en 9 ou de 25 en 25. Ajoute le pas à chaque fois.",
      workedExamples: [
        { problem: "Count in 25s: 0, 25, 50, ___", steps: ["Add 25 to 50."], answer: "75" }
      ],
      workedExamplesFr: [
        { problem: "Compte de 25 en 25 : 0, 25, 50, ___", steps: ["Ajoute 25 à 50."], answer: "75" }
      ],
      audioScript: "Let's try counting in some trickier step sizes.",
      audioScriptFr: "Essayons de compter avec des pas un peu plus difficiles."
    }
  ],
  Y7L1: [
    {
      order: 1,
      title: "Ordering positive and negative integers",
      titleFr: "Ordonner les nombres entiers positifs et négatifs",
      concept: "Placing positive and negative numbers on a number line and comparing them",
      conceptFr: "Placer des nombres positifs et négatifs sur une droite numérique et les comparer",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L1-1"],
      explanationMd:
        "On a number line, numbers increase from left to right. Negative numbers are less than zero — the further left, the smaller the number.\n\n" +
        "So -8 is smaller than -3, even though 8 is bigger than 3 as a positive number!",
      explanationMdFr:
        "Sur une droite numérique, les nombres augmentent de gauche à droite. Les nombres négatifs sont inférieurs à zéro — plus on va vers la gauche, plus le nombre est petit.\n\n" +
        "Ainsi, -8 est plus petit que -3, même si 8 est plus grand que 3 en tant que nombre positif !",
      workedExamples: [
        { problem: "Which is greater, -5 or -2?", steps: ["-2 is closer to zero (further right) than -5.", "Further right means greater."], answer: "-2" }
      ],
      workedExamplesFr: [
        { problem: "Lequel est le plus grand, -5 ou -2 ?", steps: ["-2 est plus proche de zéro (plus à droite) que -5.", "Plus à droite veut dire plus grand."], answer: "-2" }
      ],
      audioScript: "Remember: on a number line, further right always means greater — even for negative numbers.",
      audioScriptFr: "Souviens-toi : sur une droite numérique, plus à droite veut toujours dire plus grand — même pour les nombres négatifs."
    },
    {
      order: 2,
      title: "Adding and subtracting negative numbers",
      titleFr: "Additionner et soustraire des nombres négatifs",
      concept: "Using a number line to add and subtract with negative numbers",
      conceptFr: "Utiliser une droite numérique pour additionner et soustraire avec des nombres négatifs",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L1-2"],
      explanationMd:
        "Adding a positive number moves right on the number line. Adding a negative number (or subtracting a positive) moves left.\n\n" +
        "Subtracting a negative number is the same as adding — the two minus signs combine into a plus.",
      explanationMdFr:
        "Ajouter un nombre positif fait avancer vers la droite sur la droite numérique. Ajouter un nombre négatif (ou soustraire un nombre positif) fait avancer vers la gauche.\n\n" +
        "Soustraire un nombre négatif revient à additionner — les deux signes moins se combinent en un plus.",
      workedExamples: [
        { problem: "-3 + 5 = ?", steps: ["Start at -3.", "Move 5 steps right.", "Land on 2."], answer: "2" },
        { problem: "4 - (-6) = ?", steps: ["Subtracting a negative becomes adding.", "4 + 6 = 10."], answer: "10" }
      ],
      workedExamplesFr: [
        { problem: "-3 + 5 = ?", steps: ["Commence à -3.", "Avance de 5 pas vers la droite.", "Arrive sur 2."], answer: "2" },
        { problem: "4 - (-6) = ?", steps: ["Soustraire un nombre négatif devient une addition.", "4 + 6 = 10."], answer: "10" }
      ],
      audioScript: "Two minus signs next to each other always become a plus. Let's see why on the number line.",
      audioScriptFr: "Deux signes moins l'un à côté de l'autre deviennent toujours un plus. Voyons pourquoi sur la droite numérique."
    },
    {
      order: 3,
      title: "Multiplying and dividing negative numbers",
      titleFr: "Multiplier et diviser des nombres négatifs",
      concept: "Applying the same-sign/different-sign rule for multiplying and dividing",
      conceptFr: "Appliquer la règle des signes identiques/différents pour multiplier et diviser",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L1-2"],
      explanationMd:
        "When multiplying or dividing: if the two signs are the **same**, the answer is **positive**. If the signs are **different**, the answer is **negative**.",
      explanationMdFr:
        "Quand on multiplie ou on divise : si les deux signes sont **identiques**, le résultat est **positif**. Si les signes sont **différents**, le résultat est **négatif**.",
      workedExamples: [
        { problem: "-4 x -3 = ?", steps: ["Same signs (both negative).", "4 x 3 = 12.", "Answer is positive."], answer: "12" },
        { problem: "-4 x 3 = ?", steps: ["Different signs.", "4 x 3 = 12.", "Answer is negative."], answer: "-12" }
      ],
      workedExamplesFr: [
        { problem: "-4 x -3 = ?", steps: ["Signes identiques (tous deux négatifs).", "4 x 3 = 12.", "Le résultat est positif."], answer: "12" },
        { problem: "-4 x 3 = ?", steps: ["Signes différents.", "4 x 3 = 12.", "Le résultat est négatif."], answer: "-12" }
      ],
      audioScript: "Same signs give a positive answer. Different signs give a negative answer. Let's practise.",
      audioScriptFr: "Des signes identiques donnent un résultat positif. Des signes différents donnent un résultat négatif. Entraînons-nous."
    }
  ],
  Y5L1: [
    {
      order: 1,
      title: "Place value in six-digit numbers",
      titleFr: "La valeur de position dans les nombres à six chiffres",
      concept: "Understanding hundred thousands, ten thousands and thousands in numbers up to 1,000,000",
      conceptFr: "Comprendre les centaines de mille, les dizaines de mille et les milliers dans des nombres jusqu'à 1 000 000",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L1-1"],
      explanationMd:
        "A six-digit number like 342,856 has **hundred thousands**, **ten thousands**, **thousands**, **hundreds**, **tens** and **ones** columns. Each column is worth ten times the one to its right.\n\n" +
        "To compare two large numbers, always start from the left — the column with the biggest value — and work across until the digits differ.",
      explanationMdFr:
        "Un nombre à six chiffres comme 342 856 a des colonnes des **centaines de mille**, **dizaines de mille**, **milliers**, **centaines**, **dizaines** et **unités**. Chaque colonne vaut dix fois celle à sa droite.\n\n" +
        "Pour comparer deux grands nombres, commence toujours par la gauche — la colonne de plus grande valeur — et avance jusqu'à ce que les chiffres soient différents.",
      workedExamples: [
        { problem: "What is the value of the 4 in 342,856?", steps: ["The 4 is in the ten-thousands column.", "So it is worth 4 ten thousands, or 40,000."], answer: "40,000" },
        { problem: "Which is bigger, 458,120 or 458,999?", steps: ["Both start 458, so those columns match.", "Compare the next digit: 1 vs 9.", "9 is bigger."], answer: "458,999" }
      ],
      workedExamplesFr: [
        { problem: "Quelle est la valeur du 4 dans 342 856 ?", steps: ["Le 4 est dans la colonne des dizaines de mille.", "Il vaut donc 4 dizaines de mille, soit 40 000."], answer: "40 000" },
        { problem: "Lequel est le plus grand, 458 120 ou 458 999 ?", steps: ["Les deux commencent par 458, ces colonnes sont donc identiques.", "Compare le chiffre suivant : 1 contre 9.", "9 est plus grand."], answer: "458 999" }
      ],
      audioScript: "Big numbers are just more columns! Let's break a six-digit number down column by column.",
      audioScriptFr: "Les grands nombres, ce sont juste plus de colonnes ! Décomposons ensemble un nombre à six chiffres, colonne par colonne."
    },
    {
      order: 2,
      title: "Rounding large numbers",
      titleFr: "Arrondir de grands nombres",
      concept: "Rounding any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 or 100,000",
      conceptFr: "Arrondir n'importe quel nombre jusqu'à 1 000 000 à la dizaine, la centaine, le millier, la dizaine de mille ou la centaine de mille la plus proche",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L1-2"],
      explanationMd:
        "To round to a given accuracy, find the digit in the place just after the one you're rounding to. 5 or more rounds up; less than 5 rounds down — every digit after the rounding point becomes zero.\n\n" +
        "The bigger the number, the more it matters to round sensibly — rounding to the nearest 10,000 or 100,000 gives a quick, useful estimate.",
      explanationMdFr:
        "Pour arrondir à une précision donnée, trouve le chiffre juste après la position à laquelle tu arrondis. 5 ou plus arrondit vers le haut ; moins de 5 arrondit vers le bas — chaque chiffre après le point d'arrondi devient zéro.\n\n" +
        "Plus le nombre est grand, plus il est important d'arrondir judicieusement — arrondir à la dizaine de mille ou à la centaine de mille la plus proche donne une estimation rapide et utile.",
      workedExamples: [
        { problem: "Round 583,240 to the nearest 10,000.", steps: ["Look at the thousands digit: 3.", "3 is less than 5, so round down.", "The ten-thousands digit stays as 8."], answer: "580,000" },
        { problem: "Round 726,500 to the nearest 100,000.", steps: ["Look at the ten-thousands digit: 2.", "2 is less than 5, so round down."], answer: "700,000" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 583 240 à la dizaine de mille la plus proche.", steps: ["Regarde le chiffre des milliers : 3.", "3 est inférieur à 5, donc on arrondit vers le bas.", "Le chiffre des dizaines de mille reste 8."], answer: "580 000" },
        { problem: "Arrondis 726 500 à la centaine de mille la plus proche.", steps: ["Regarde le chiffre des dizaines de mille : 2.", "2 est inférieur à 5, donc on arrondit vers le bas."], answer: "700 000" }
      ],
      audioScript: "Rounding big numbers works exactly the same way as small ones — just find the right column to check.",
      audioScriptFr: "Arrondir de grands nombres fonctionne exactement de la même façon que pour les petits — il suffit de trouver la bonne colonne à vérifier."
    },
    {
      order: 3,
      title: "Negative numbers and counting through zero",
      titleFr: "Les nombres négatifs et compter en passant par zéro",
      concept: "Interpreting negative numbers in context and counting forwards and backwards across zero",
      conceptFr: "Interpréter des nombres négatifs en contexte et compter en avant et en arrière en passant par zéro",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L1-3"],
      explanationMd:
        "Negative numbers show up in real life — temperatures below freezing, or floors below ground in a car park. On a number line, they sit to the left of zero.\n\n" +
        "When counting forwards or backwards through zero, remember there is no '-0' — counting up from -1 goes straight to 0, then 1.",
      explanationMdFr:
        "Les nombres négatifs apparaissent dans la vie réelle — des températures en dessous de zéro, ou des étages sous le niveau du sol dans un parking. Sur une droite numérique, ils se situent à gauche de zéro.\n\n" +
        "Quand on compte en avant ou en arrière en passant par zéro, souviens-toi qu'il n'existe pas de « -0 » — compter à partir de -1 va directement à 0, puis à 1.",
      workedExamples: [
        { problem: "The temperature was -3°C and rose by 5°C. What is it now?", steps: ["Start at -3.", "Count up 5: -2, -1, 0, 1, 2.", "Land on 2."], answer: "2°C" },
        { problem: "A lift is on floor 2 and goes down 5 floors. What floor is it on?", steps: ["Start at floor 2.", "Count down 5: 1, 0, -1, -2, -3.", "Land on floor -3 (3 floors below ground)."], answer: "-3" }
      ],
      workedExamplesFr: [
        { problem: "La température était de -3°C et a augmenté de 5°C. Quelle est-elle maintenant ?", steps: ["Commence à -3.", "Compte 5 de plus : -2, -1, 0, 1, 2.", "Arrive sur 2."], answer: "2°C" },
        { problem: "Un ascenseur est à l'étage 2 et descend de 5 étages. À quel étage se trouve-t-il ?", steps: ["Commence à l'étage 2.", "Compte 5 en arrière : 1, 0, -1, -2, -3.", "Arrive à l'étage -3 (3 étages sous le sol)."], answer: "-3" }
      ],
      audioScript: "Negative numbers aren't scary — they're just numbers below zero. Let's count through zero together.",
      audioScriptFr: "Les nombres négatifs ne sont pas effrayants — ce sont juste des nombres en dessous de zéro. Comptons ensemble en passant par zéro."
    }
  ],
  Y5L2: [
    {
      order: 1,
      title: "Adding and subtracting large numbers",
      titleFr: "Additionner et soustraire de grands nombres",
      concept: "Using formal written (column) methods to add and subtract numbers with 5 or more digits",
      conceptFr: "Utiliser des méthodes écrites formelles (en colonnes) pour additionner et soustraire des nombres de 5 chiffres ou plus",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L2-1"],
      explanationMd:
        "For numbers this big, line the digits up by place value in columns, then add or subtract starting from the ones column.\n\n" +
        "When a column adds up to 10 or more, **carry** the extra ten into the next column. When a digit is too small to subtract from, **exchange** (borrow) one from the column to its left.",
      explanationMdFr:
        "Pour des nombres aussi grands, aligne les chiffres par valeur de position en colonnes, puis additionne ou soustrais en commençant par la colonne des unités.\n\n" +
        "Quand une colonne totalise 10 ou plus, **retiens** la dizaine en trop dans la colonne suivante. Quand un chiffre est trop petit pour qu'on puisse soustraire, **échange** (emprunte) une unité de la colonne à sa gauche.",
      workedExamples: [
        { problem: "34,782 + 18,946 = ?", steps: ["Add the ones: 2 + 6 = 8.", "Add the tens, hundreds, thousands and ten-thousands, carrying where needed."], answer: "53,728" },
        { problem: "62,150 - 27,483 = ?", steps: ["Subtract from the ones column, exchanging from the next column whenever a digit is too small."], answer: "34,667" }
      ],
      workedExamplesFr: [
        { problem: "34 782 + 18 946 = ?", steps: ["Additionne les unités : 2 + 6 = 8.", "Additionne les dizaines, les centaines, les milliers et les dizaines de mille, en retenant quand nécessaire."], answer: "53 728" },
        { problem: "62 150 - 27 483 = ?", steps: ["Soustrais à partir de la colonne des unités, en échangeant depuis la colonne suivante chaque fois qu'un chiffre est trop petit."], answer: "34 667" }
      ],
      audioScript: "Big numbers, same method — line up the columns and work through them one at a time.",
      audioScriptFr: "Grands nombres, même méthode — aligne les colonnes et traite-les une par une."
    },
    {
      order: 2,
      title: "Estimating with rounding",
      titleFr: "Estimer en arrondissant",
      concept: "Rounding numbers before adding or subtracting to check whether an answer is reasonable",
      conceptFr: "Arrondir des nombres avant d'additionner ou de soustraire pour vérifier qu'un résultat est raisonnable",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L2-2"],
      explanationMd:
        "Before doing a big calculation, it helps to **estimate** the answer first by rounding each number, often to the nearest 1,000. If your exact answer is nowhere near your estimate, you know to check your working.",
      explanationMdFr:
        "Avant de faire un grand calcul, il est utile d'**estimer** d'abord le résultat en arrondissant chaque nombre, souvent au millier le plus proche. Si ton résultat exact est très éloigné de ton estimation, tu sais qu'il faut vérifier ton travail.",
      workedExamples: [
        { problem: "Estimate 4,832 + 2,957 by rounding to the nearest 1,000.", steps: ["4,832 rounds to 5,000.", "2,957 rounds to 3,000.", "5,000 + 3,000 = 8,000."], answer: "about 8,000" }
      ],
      workedExamplesFr: [
        { problem: "Estime 4 832 + 2 957 en arrondissant au millier le plus proche.", steps: ["4 832 s'arrondit à 5 000.", "2 957 s'arrondit à 3 000.", "5 000 + 3 000 = 8 000."], answer: "environ 8 000" }
      ],
      audioScript: "Rounding first gives us a quick sense-check before working out the exact answer.",
      audioScriptFr: "Arrondir d'abord nous donne une vérification rapide avant de calculer le résultat exact."
    },
    {
      order: 3,
      title: "Multi-step problems",
      titleFr: "Les problèmes à plusieurs étapes",
      concept: "Deciding which operations to use, and in which order, to solve a problem with more than one step",
      conceptFr: "Décider quelles opérations utiliser, et dans quel ordre, pour résoudre un problème à plusieurs étapes",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L2-3"],
      explanationMd:
        "Some problems need more than one step — read carefully to work out what happens first, second, and so on. Working left to right through the problem usually keeps things clear.",
      explanationMdFr:
        "Certains problèmes nécessitent plus d'une étape — lis attentivement pour comprendre ce qui se passe d'abord, ensuite, et ainsi de suite. Traiter le problème de gauche à droite permet généralement d'y voir clair.",
      workedExamples: [
        { problem: "A shop had £3,200. It earned £1,450, then spent £900 on stock. How much does it have now?", steps: ["£3,200 + £1,450 = £4,650.", "£4,650 - £900 = £3,750."], answer: "£3,750" }
      ],
      workedExamplesFr: [
        { problem: "Un magasin avait 3 200 £. Il a gagné 1 450 £, puis dépensé 900 £ en stock. Combien lui reste-t-il maintenant ?", steps: ["3 200 £ + 1 450 £ = 4 650 £.", "4 650 £ - 900 £ = 3 750 £."], answer: "3 750 £" }
      ],
      audioScript: "Break multi-step problems into small pieces, and solve them one step at a time.",
      audioScriptFr: "Découpe les problèmes à plusieurs étapes en petits morceaux, et résous-les une étape à la fois."
    }
  ],
  Y5L3: [
    {
      order: 1,
      title: "Multiplying up to 4-digit numbers",
      titleFr: "Multiplier des nombres jusqu'à 4 chiffres",
      concept: "Using a formal written method to multiply a 4-digit number by a 1- or 2-digit number",
      conceptFr: "Utiliser une méthode écrite formelle pour multiplier un nombre à 4 chiffres par un nombre à 1 ou 2 chiffres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L3-1"],
      explanationMd:
        "To multiply a big number by a two-digit number, split the two-digit number into tens and ones, multiply by each part separately, then add the results together.",
      explanationMdFr:
        "Pour multiplier un grand nombre par un nombre à deux chiffres, sépare le nombre à deux chiffres en dizaines et unités, multiplie par chaque partie séparément, puis additionne les résultats.",
      workedExamples: [
        { problem: "2,345 x 23 = ?", steps: ["2,345 x 20 = 46,900.", "2,345 x 3 = 7,035.", "46,900 + 7,035 = 53,935."], answer: "53,935" }
      ],
      workedExamplesFr: [
        { problem: "2 345 x 23 = ?", steps: ["2 345 x 20 = 46 900.", "2 345 x 3 = 7 035.", "46 900 + 7 035 = 53 935."], answer: "53 935" }
      ],
      audioScript: "Splitting the multiplier into tens and ones turns one hard multiplication into two easier ones.",
      audioScriptFr: "Séparer le multiplicateur en dizaines et unités transforme une multiplication difficile en deux plus faciles."
    },
    {
      order: 2,
      title: "Dividing with remainders",
      titleFr: "Diviser avec des restes",
      concept: "Dividing up to 4-digit numbers by a 1-digit number, and deciding what to do with a remainder",
      conceptFr: "Diviser des nombres jusqu'à 4 chiffres par un nombre à 1 chiffre, et décider quoi faire d'un reste",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L3-2"],
      explanationMd:
        "Not every division comes out exactly — sometimes there's an amount left over, called the **remainder**. What you do with a remainder depends on the question: sometimes you round up (you need one more of something), sometimes you round down (a partly-full group doesn't count), and sometimes the remainder itself is the answer.",
      explanationMdFr:
        "Toutes les divisions ne tombent pas juste — il reste parfois une quantité, appelée le **reste**. Ce que tu fais du reste dépend de la question : parfois tu arrondis vers le haut (il te faut un de plus), parfois tu arrondis vers le bas (un groupe pas tout à fait complet ne compte pas), et parfois le reste lui-même est la réponse.",
      workedExamples: [
        { problem: "138 pupils are going on a trip. Each minibus holds 25 pupils. How many minibuses are needed?", steps: ["138 ÷ 25 = 5 remainder 13.", "13 pupils still need seats, so one more minibus is needed."], answer: "6 minibuses" },
        { problem: "A baker has 138 eggs and puts 25 in each box. How many full boxes can be made?", steps: ["138 ÷ 25 = 5 remainder 13.", "The 13 leftover eggs can't make another full box."], answer: "5 full boxes" }
      ],
      workedExamplesFr: [
        { problem: "138 élèves partent en sortie scolaire. Chaque minibus peut accueillir 25 élèves. Combien de minibus faut-il ?", steps: ["138 ÷ 25 = 5 reste 13.", "13 élèves ont encore besoin d'une place, donc il faut un minibus de plus."], answer: "6 minibus" },
        { problem: "Un boulanger a 138 œufs et en met 25 par boîte. Combien de boîtes complètes peut-il faire ?", steps: ["138 ÷ 25 = 5 reste 13.", "Les 13 œufs restants ne peuvent pas faire une boîte complète de plus."], answer: "5 boîtes complètes" }
      ],
      audioScript: "Always read the question carefully to decide whether to round the remainder up, round it down, or use it directly.",
      audioScriptFr: "Lis toujours la question attentivement pour décider s'il faut arrondir le reste vers le haut, vers le bas, ou l'utiliser directement."
    },
    {
      order: 3,
      title: "Multiplying and dividing by 10, 100 and 1,000",
      titleFr: "Multiplier et diviser par 10, 100 et 1 000",
      concept: "Understanding how digits shift place value columns when multiplying or dividing by powers of 10",
      conceptFr: "Comprendre comment les chiffres se décalent de colonne de valeur de position quand on multiplie ou divise par des puissances de 10",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L3-3"],
      explanationMd:
        "Multiplying by 10 shifts every digit one column to the left; by 100, two columns; by 1,000, three columns. Dividing does the reverse, shifting digits to the right.\n\n" +
        "The digits themselves don't change — only their place value does.",
      explanationMdFr:
        "Multiplier par 10 décale chaque chiffre d'une colonne vers la gauche ; par 100, de deux colonnes ; par 1 000, de trois colonnes. Diviser fait l'inverse, en décalant les chiffres vers la droite.\n\n" +
        "Les chiffres eux-mêmes ne changent pas — seule leur valeur de position change.",
      workedExamples: [
        { problem: "34 x 100 = ?", steps: ["Shift every digit two columns to the left.", "34 becomes 3,400."], answer: "3,400" },
        { problem: "5,600 ÷ 100 = ?", steps: ["Shift every digit two columns to the right.", "5,600 becomes 56."], answer: "56" }
      ],
      workedExamplesFr: [
        { problem: "34 x 100 = ?", steps: ["Décale chaque chiffre de deux colonnes vers la gauche.", "34 devient 3 400."], answer: "3 400" },
        { problem: "5 600 ÷ 100 = ?", steps: ["Décale chaque chiffre de deux colonnes vers la droite.", "5 600 devient 56."], answer: "56" }
      ],
      audioScript: "Watch how the digits slide across the columns when we multiply or divide by 10, 100 or 1,000.",
      audioScriptFr: "Observe comment les chiffres glissent d'une colonne à l'autre quand on multiplie ou divise par 10, 100 ou 1 000."
    }
  ],
  Y5L4: [
    {
      order: 1,
      title: "Factors and multiples",
      titleFr: "Les diviseurs et les multiples",
      concept: "Finding factor pairs of a number and identifying multiples",
      conceptFr: "Trouver les paires de diviseurs d'un nombre et identifier des multiples",
      representation: "abstract",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L4-1"],
      explanationMd:
        "A **factor** of a number divides into it exactly, with nothing left over. A **multiple** of a number is what you get when you count up in steps of that number — the results of its times table.\n\n" +
        "Numbers often have several factors, arranged in **factor pairs** that multiply together to make the original number.",
      explanationMdFr:
        "Un **diviseur** d'un nombre le divise exactement, sans rien laisser de reste. Un **multiple** d'un nombre est ce qu'on obtient en comptant par bonds de ce nombre — les résultats de sa table de multiplication.\n\n" +
        "Les nombres ont souvent plusieurs diviseurs, organisés en **paires de diviseurs** qui se multiplient pour donner le nombre de départ.",
      workedExamples: [
        { problem: "Find all the factor pairs of 24.", steps: ["1 x 24", "2 x 12", "3 x 8", "4 x 6"], answer: "1&24, 2&12, 3&8, 4&6" },
        { problem: "Is 45 a multiple of 9?", steps: ["45 ÷ 9 = 5, with no remainder."], answer: "Yes" }
      ],
      workedExamplesFr: [
        { problem: "Trouve toutes les paires de diviseurs de 24.", steps: ["1 x 24", "2 x 12", "3 x 8", "4 x 6"], answer: "1 et 24, 2 et 12, 3 et 8, 4 et 6" },
        { problem: "45 est-il un multiple de 9 ?", steps: ["45 ÷ 9 = 5, sans reste."], answer: "Oui" }
      ],
      audioScript: "Factors divide in exactly; multiples are what you land on when you count up in steps.",
      audioScriptFr: "Les diviseurs divisent exactement ; les multiples sont les nombres sur lesquels on arrive en comptant par bonds."
    },
    {
      order: 2,
      title: "Prime and composite numbers",
      titleFr: "Les nombres premiers et composés",
      concept: "Establishing whether a number up to 100 is prime",
      conceptFr: "Déterminer si un nombre jusqu'à 100 est premier",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L4-2"],
      explanationMd:
        "A **prime number** has exactly two factors: 1 and itself. A **composite number** has more than two factors. Remember — 1 itself is neither prime nor composite!\n\n" +
        "To check if a number is prime, try dividing it by every whole number from 2 up to its square root. If none divide in exactly, it's prime.",
      explanationMdFr:
        "Un **nombre premier** a exactement deux diviseurs : 1 et lui-même. Un **nombre composé** a plus de deux diviseurs. Attention — 1 lui-même n'est ni premier ni composé !\n\n" +
        "Pour vérifier si un nombre est premier, essaie de le diviser par chaque nombre entier de 2 jusqu'à sa racine carrée. Si aucun ne divise exactement, il est premier.",
      workedExamples: [
        { problem: "Is 29 prime?", steps: ["Try dividing by 2, 3, 5 (up to √29 ≈ 5.4).", "None divide in exactly."], answer: "Yes, 29 is prime" },
        { problem: "Is 51 prime?", steps: ["51 ÷ 3 = 17, exactly.", "51 has factors other than 1 and itself."], answer: "No, 51 is composite" }
      ],
      workedExamplesFr: [
        { problem: "29 est-il premier ?", steps: ["Essaie de diviser par 2, 3, 5 (jusqu'à √29 ≈ 5,4).", "Aucun ne divise exactement."], answer: "Oui, 29 est premier" },
        { problem: "51 est-il premier ?", steps: ["51 ÷ 3 = 17, exactement.", "51 a des diviseurs autres que 1 et lui-même."], answer: "Non, 51 est composé" }
      ],
      audioScript: "Every prime number has exactly two factors. Let's practise spotting them up to 100.",
      audioScriptFr: "Chaque nombre premier a exactement deux diviseurs. Entraînons-nous à les repérer jusqu'à 100."
    },
    {
      order: 3,
      title: "Square and cube numbers",
      titleFr: "Les nombres carrés et cubes",
      concept: "Recognising and calculating square numbers (n²) and cube numbers (n³)",
      conceptFr: "Reconnaître et calculer des nombres carrés (n²) et des nombres cubes (n³)",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L4-3"],
      explanationMd:
        "A **square number** comes from multiplying a whole number by itself, written with a small 2 (e.g. 5² = 5 x 5 = 25). A **cube number** comes from multiplying a whole number by itself twice more, written with a small 3 (e.g. 5³ = 5 x 5 x 5 = 125).\n\n" +
        "Square numbers can be arranged into a square array; cube numbers into a cube shape.",
      explanationMdFr:
        "Un **nombre carré** vient de la multiplication d'un nombre entier par lui-même, écrit avec un petit 2 (par ex. 5² = 5 x 5 = 25). Un **nombre cube** vient de la multiplication d'un nombre entier par lui-même deux fois de plus, écrit avec un petit 3 (par ex. 5³ = 5 x 5 x 5 = 125).\n\n" +
        "Les nombres carrés peuvent être disposés en un quadrillage carré ; les nombres cubes en forme de cube.",
      workedExamples: [
        { problem: "What is 6²?", steps: ["6 x 6 = 36."], answer: "36" },
        { problem: "What is 4³?", steps: ["4 x 4 = 16.", "16 x 4 = 64."], answer: "64" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 6² ?", steps: ["6 x 6 = 36."], answer: "36" },
        { problem: "Que vaut 4³ ?", steps: ["4 x 4 = 16.", "16 x 4 = 64."], answer: "64" }
      ],
      audioScript: "Squaring multiplies a number by itself once; cubing multiplies it by itself twice.",
      audioScriptFr: "Élever au carré multiplie un nombre par lui-même une fois ; élever au cube le multiplie par lui-même deux fois."
    }
  ],
  Y5L5: [
    {
      order: 1,
      title: "Comparing and ordering fractions",
      titleFr: "Comparer et ordonner des fractions",
      concept: "Comparing fractions with the same or related denominators",
      conceptFr: "Comparer des fractions ayant le même dénominateur ou des dénominateurs liés",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L5-1"],
      explanationMd:
        "When two fractions have the **same denominator**, just compare their numerators — the bigger numerator makes the bigger fraction.\n\n" +
        "When denominators are related (one is a multiple of the other), first convert them to the same denominator by multiplying the numerator and denominator by the same amount, then compare.",
      explanationMdFr:
        "Quand deux fractions ont le **même dénominateur**, il suffit de comparer leurs numérateurs — le plus grand numérateur donne la plus grande fraction.\n\n" +
        "Quand les dénominateurs sont liés (l'un est un multiple de l'autre), convertis-les d'abord au même dénominateur en multipliant le numérateur et le dénominateur par le même nombre, puis compare.",
      workedExamples: [
        { problem: "Which is bigger, 3/8 or 5/8?", steps: ["Same denominator, so compare numerators.", "5 > 3."], answer: "5/8" },
        { problem: "Which is bigger, 1/4 or 3/8?", steps: ["Convert 1/4 to eighths: 1/4 = 2/8.", "Compare 2/8 and 3/8.", "3 > 2."], answer: "3/8" }
      ],
      workedExamplesFr: [
        { problem: "Laquelle est la plus grande, 3/8 ou 5/8 ?", steps: ["Même dénominateur, donc compare les numérateurs.", "5 > 3."], answer: "5/8" },
        { problem: "Laquelle est la plus grande, 1/4 ou 3/8 ?", steps: ["Convertis 1/4 en huitièmes : 1/4 = 2/8.", "Compare 2/8 et 3/8.", "3 > 2."], answer: "3/8" }
      ],
      audioScript: "Same denominator? Just compare the numerators. Different denominator? Convert first, then compare.",
      audioScriptFr: "Même dénominateur ? Compare simplement les numérateurs. Dénominateur différent ? Convertis d'abord, puis compare."
    },
    {
      order: 2,
      title: "Adding and subtracting fractions",
      titleFr: "Additionner et soustraire des fractions",
      concept: "Adding and subtracting fractions with the same denominator, including mixed numbers",
      conceptFr: "Additionner et soustraire des fractions de même dénominateur, y compris des nombres mixtes",
      representation: "abstract",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L5-2"],
      explanationMd:
        "When fractions share a denominator, add or subtract just the numerators — the denominator stays the same.\n\n" +
        "For mixed numbers, convert each one to an **improper fraction** first (multiply the whole number by the denominator, then add the numerator), then add or subtract as normal.",
      explanationMdFr:
        "Quand des fractions ont le même dénominateur, additionne ou soustrais seulement les numérateurs — le dénominateur reste le même.\n\n" +
        "Pour les nombres mixtes, convertis chacun en **fraction impropre** d'abord (multiplie le nombre entier par le dénominateur, puis ajoute le numérateur), puis additionne ou soustrais normalement.",
      workedExamples: [
        { problem: "2/5 + 1/5 = ?", steps: ["Add the numerators: 2 + 1 = 3.", "Keep the denominator: 5."], answer: "3/5" },
        { problem: "1 1/4 + 2 2/4 = ?", steps: ["Convert: 1 1/4 = 5/4, 2 2/4 = 10/4.", "Add: 5 + 10 = 15."], answer: "15/4" }
      ],
      workedExamplesFr: [
        { problem: "2/5 + 1/5 = ?", steps: ["Additionne les numérateurs : 2 + 1 = 3.", "Garde le dénominateur : 5."], answer: "3/5" },
        { problem: "1 1/4 + 2 2/4 = ?", steps: ["Convertis : 1 1/4 = 5/4, 2 2/4 = 10/4.", "Additionne : 5 + 10 = 15."], answer: "15/4" }
      ],
      audioScript: "The denominator tells us the size of the pieces — it doesn't change when we add or subtract.",
      audioScriptFr: "Le dénominateur nous indique la taille des parts — il ne change pas quand on additionne ou soustrait."
    },
    {
      order: 3,
      title: "Multiplying fractions by whole numbers",
      titleFr: "Multiplier des fractions par des nombres entiers",
      concept: "Multiplying proper fractions and mixed numbers by a whole number",
      conceptFr: "Multiplier des fractions propres et des nombres mixtes par un nombre entier",
      representation: "abstract",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L5-3"],
      explanationMd:
        "To multiply a fraction by a whole number, multiply just the **numerator** by that whole number — the denominator stays the same.\n\n" +
        "For a mixed number, convert it to an improper fraction first, then multiply.",
      explanationMdFr:
        "Pour multiplier une fraction par un nombre entier, multiplie seulement le **numérateur** par ce nombre entier — le dénominateur reste le même.\n\n" +
        "Pour un nombre mixte, convertis-le d'abord en fraction impropre, puis multiplie.",
      workedExamples: [
        { problem: "2/5 x 3 = ?", steps: ["Multiply the numerator: 2 x 3 = 6.", "Keep the denominator: 5."], answer: "6/5" },
        { problem: "1 1/2 x 4 = ?", steps: ["Convert: 1 1/2 = 3/2.", "Multiply: 3 x 4 = 12."], answer: "12/2" }
      ],
      workedExamplesFr: [
        { problem: "2/5 x 3 = ?", steps: ["Multiplie le numérateur : 2 x 3 = 6.", "Garde le dénominateur : 5."], answer: "6/5" },
        { problem: "1 1/2 x 4 = ?", steps: ["Convertis : 1 1/2 = 3/2.", "Multiplie : 3 x 4 = 12."], answer: "12/2" }
      ],
      audioScript: "Multiplying a fraction by a whole number only changes the numerator.",
      audioScriptFr: "Multiplier une fraction par un nombre entier ne change que le numérateur."
    }
  ],
  Y5L6: [
    {
      order: 1,
      title: "Reading and comparing decimals",
      titleFr: "Lire et comparer des nombres décimaux",
      concept: "Reading, writing, ordering and comparing decimals with up to three decimal places",
      conceptFr: "Lire, écrire, ordonner et comparer des nombres décimaux avec jusqu'à trois décimales",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L6-1"],
      explanationMd:
        "A decimal like 3.482 has tenths, hundredths and thousandths columns after the decimal point — each one worth ten times less than the one before it.\n\n" +
        "**Watch out:** more decimal digits doesn't mean a bigger number! 0.4 is actually bigger than 0.25, even though 0.25 has more digits — write both with the same number of decimal places (0.40 vs 0.25) to compare fairly.",
      explanationMdFr:
        "Un nombre décimal comme 3,482 a des colonnes des dixièmes, centièmes et millièmes après la virgule — chacune valant dix fois moins que la précédente.\n\n" +
        "**Attention :** avoir plus de décimales ne veut pas dire un nombre plus grand ! 0,4 est en fait plus grand que 0,25, même si 0,25 a plus de chiffres — écris les deux avec le même nombre de décimales (0,40 contre 0,25) pour comparer équitablement.",
      workedExamples: [
        { problem: "Which is bigger, 0.4 or 0.25?", steps: ["Write 0.4 with two decimal places: 0.40.", "Compare 0.40 and 0.25.", "40 is bigger than 25."], answer: "0.4" },
        { problem: "What is the hundredths digit in 5.638?", steps: ["The digits after the point are tenths (6), hundredths (3), thousandths (8)."], answer: "3" }
      ],
      workedExamplesFr: [
        { problem: "Lequel est le plus grand, 0,4 ou 0,25 ?", steps: ["Écris 0,4 avec deux décimales : 0,40.", "Compare 0,40 et 0,25.", "40 est plus grand que 25."], answer: "0,4" },
        { problem: "Quel est le chiffre des centièmes dans 5,638 ?", steps: ["Les chiffres après la virgule sont les dixièmes (6), les centièmes (3), les millièmes (8)."], answer: "3" }
      ],
      audioScript: "More digits after the point doesn't mean a bigger number — always line up the decimal places before comparing.",
      audioScriptFr: "Avoir plus de chiffres après la virgule ne veut pas dire un nombre plus grand — aligne toujours les décimales avant de comparer."
    },
    {
      order: 2,
      title: "Percentages as parts per hundred",
      titleFr: "Les pourcentages comme parts sur cent",
      concept: "Understanding the % symbol as meaning 'out of 100'",
      conceptFr: "Comprendre que le symbole % signifie « sur 100 »",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L6-2"],
      explanationMd:
        "The **%** symbol always means **'out of 100'**. If a 100-square grid has 60 squares shaded, that's 60%, or 60/100.\n\n" +
        "Some percentages simplify to easy fractions: 50% = 1/2, 25% = 1/4, 10% = 1/10.",
      explanationMdFr:
        "Le symbole **%** veut toujours dire **« sur 100 »**. Si une grille de 100 carrés a 60 carrés coloriés, c'est 60 %, soit 60/100.\n\n" +
        "Certains pourcentages se simplifient en fractions simples : 50 % = 1/2, 25 % = 1/4, 10 % = 1/10.",
      workedExamples: [
        { problem: "A survey of 100 people found 35 like tea best. What percentage is that?", steps: ["35 out of 100 is 35%."], answer: "35%" },
        { problem: "Write 25% as a fraction in its simplest form.", steps: ["25% = 25/100.", "Divide top and bottom by 25.", "25/100 = 1/4."], answer: "1/4" }
      ],
      workedExamplesFr: [
        { problem: "Un sondage auprès de 100 personnes montre que 35 préfèrent le thé. Quel pourcentage cela représente-t-il ?", steps: ["35 sur 100, c'est 35 %."], answer: "35 %" },
        { problem: "Écris 25 % sous forme de fraction irréductible.", steps: ["25 % = 25/100.", "Divise le haut et le bas par 25.", "25/100 = 1/4."], answer: "1/4" }
      ],
      audioScript: "Per cent always means out of 100 — that's the easiest way to remember what the % symbol is telling you.",
      audioScriptFr: "Pour cent veut toujours dire sur 100 — c'est le moyen le plus simple de te souvenir de ce que signifie le symbole %."
    },
    {
      order: 3,
      title: "Rounding decimals",
      titleFr: "Arrondir des nombres décimaux",
      concept: "Rounding a decimal with two decimal places to the nearest whole number or one decimal place",
      conceptFr: "Arrondir un nombre décimal à deux décimales au nombre entier le plus proche ou à une décimale",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L6-3"],
      explanationMd:
        "To round a decimal, find the digit just after the place you're rounding to. 5 or more rounds up; less than 5 rounds down.\n\n" +
        "Rounding to the nearest whole number: check the tenths digit. Rounding to one decimal place: check the hundredths digit.",
      explanationMdFr:
        "Pour arrondir un nombre décimal, trouve le chiffre juste après la position à laquelle tu arrondis. 5 ou plus arrondit vers le haut ; moins de 5 arrondit vers le bas.\n\n" +
        "Arrondir au nombre entier le plus proche : vérifie le chiffre des dixièmes. Arrondir à une décimale : vérifie le chiffre des centièmes.",
      workedExamples: [
        { problem: "Round 4.67 to the nearest whole number.", steps: ["Look at the tenths digit: 6.", "6 is 5 or more, so round up."], answer: "5" },
        { problem: "Round 4.67 to one decimal place.", steps: ["Look at the hundredths digit: 7.", "7 is 5 or more, so round the tenths digit up."], answer: "4.7" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 4,67 au nombre entier le plus proche.", steps: ["Regarde le chiffre des dixièmes : 6.", "6 est 5 ou plus, donc on arrondit vers le haut."], answer: "5" },
        { problem: "Arrondis 4,67 à une décimale.", steps: ["Regarde le chiffre des centièmes : 7.", "7 est 5 ou plus, donc on arrondit le chiffre des dixièmes vers le haut."], answer: "4,7" }
      ],
      audioScript: "Rounding decimals works just like rounding whole numbers — just check the right digit.",
      audioScriptFr: "Arrondir des nombres décimaux fonctionne comme arrondir des nombres entiers — il suffit de vérifier le bon chiffre."
    }
  ],
  Y5L7: [
    {
      order: 1,
      title: "Area and perimeter of rectangles",
      titleFr: "L'aire et le périmètre des rectangles",
      concept: "Calculating the area and perimeter of rectangles, and estimating the area of irregular shapes",
      conceptFr: "Calculer l'aire et le périmètre de rectangles, et estimer l'aire de formes irrégulières",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L7-1"],
      explanationMd:
        "**Area** measures the amount of surface a shape covers, in square units (like m²). For a rectangle: area = length x width.\n\n" +
        "**Perimeter** measures the distance all the way around the outside, in units (like m). For a rectangle: perimeter = 2 x (length + width).\n\n" +
        "For an irregular (L-shaped) area, split it into rectangles, find each area, then add them together.",
      explanationMdFr:
        "L'**aire** mesure la quantité de surface qu'une forme couvre, en unités carrées (comme le m²). Pour un rectangle : aire = longueur x largeur.\n\n" +
        "Le **périmètre** mesure la distance tout autour de l'extérieur, en unités (comme le m). Pour un rectangle : périmètre = 2 x (longueur + largeur).\n\n" +
        "Pour une aire irrégulière (en forme de L), sépare-la en rectangles, trouve chaque aire, puis additionne-les.",
      workedExamples: [
        { problem: "A rectangle is 6 m by 4 m. Find its area and perimeter.", steps: ["Area = 6 x 4 = 24 m².", "Perimeter = 2 x (6 + 4) = 20 m."], answer: "Area 24 m², perimeter 20 m" }
      ],
      workedExamplesFr: [
        { problem: "Un rectangle mesure 6 m sur 4 m. Trouve son aire et son périmètre.", steps: ["Aire = 6 x 4 = 24 m².", "Périmètre = 2 x (6 + 4) = 20 m."], answer: "Aire 24 m², périmètre 20 m" }
      ],
      audioScript: "Area covers the inside of a shape; perimeter measures the distance around the outside.",
      audioScriptFr: "L'aire couvre l'intérieur d'une forme ; le périmètre mesure la distance autour de l'extérieur."
    },
    {
      order: 2,
      title: "Volume and capacity",
      titleFr: "Le volume et la contenance",
      concept: "Estimating volume using unit cubes and estimating everyday capacities",
      conceptFr: "Estimer un volume à l'aide de cubes unités et estimer des contenances du quotidien",
      representation: "concrete",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L7-2"],
      explanationMd:
        "**Volume** measures how much space a 3D shape takes up, in cubic units (like cm³). For a cuboid: volume = length x width x height.\n\n" +
        "**Capacity** measures how much a container can hold, usually in millilitres (ml) or litres (l). Knowing everyday capacities (a teaspoon holds about 5 ml, a kettle about 1.5 l) helps you estimate sensibly.",
      explanationMdFr:
        "Le **volume** mesure l'espace occupé par une forme en 3D, en unités cubiques (comme le cm³). Pour un pavé droit : volume = longueur x largeur x hauteur.\n\n" +
        "La **contenance** mesure ce qu'un récipient peut contenir, généralement en millilitres (ml) ou en litres (l). Connaître des contenances du quotidien (une cuillère à café contient environ 5 ml, une bouilloire environ 1,5 l) t'aide à estimer judicieusement.",
      workedExamples: [
        { problem: "A cuboid box is 5 cm by 3 cm by 2 cm. What is its volume?", steps: ["Volume = 5 x 3 x 2 = 30 cm³."], answer: "30 cm³" }
      ],
      workedExamplesFr: [
        { problem: "Une boîte en forme de pavé droit mesure 5 cm sur 3 cm sur 2 cm. Quel est son volume ?", steps: ["Volume = 5 x 3 x 2 = 30 cm³."], answer: "30 cm³" }
      ],
      audioScript: "Volume is like area but for 3D shapes — multiply all three dimensions together.",
      audioScriptFr: "Le volume, c'est comme l'aire mais pour des formes en 3D — multiplie les trois dimensions ensemble."
    },
    {
      order: 3,
      title: "Converting metric units",
      titleFr: "Convertir les unités métriques",
      concept: "Converting between millimetres, centimetres, metres and kilometres, and between grams/kilograms and litres/millilitres",
      conceptFr: "Convertir entre millimètres, centimètres, mètres et kilomètres, et entre grammes/kilogrammes et litres/millilitres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L7-3"],
      explanationMd:
        "Metric units are all connected by powers of 10: 10 mm = 1 cm, 100 cm = 1 m, 1,000 m = 1 km, 1,000 g = 1 kg, 1,000 ml = 1 l.\n\n" +
        "To convert to a smaller unit, multiply. To convert to a bigger unit, divide.",
      explanationMdFr:
        "Les unités métriques sont toutes liées par des puissances de 10 : 10 mm = 1 cm, 100 cm = 1 m, 1 000 m = 1 km, 1 000 g = 1 kg, 1 000 ml = 1 l.\n\n" +
        "Pour convertir vers une unité plus petite, multiplie. Pour convertir vers une unité plus grande, divise.",
      workedExamples: [
        { problem: "Convert 350 cm to m.", steps: ["100 cm = 1 m.", "350 ÷ 100 = 3.5."], answer: "3.5 m" },
        { problem: "Convert 2 kg to g.", steps: ["1 kg = 1,000 g.", "2 x 1,000 = 2,000."], answer: "2,000 g" }
      ],
      workedExamplesFr: [
        { problem: "Convertis 350 cm en m.", steps: ["100 cm = 1 m.", "350 ÷ 100 = 3,5."], answer: "3,5 m" },
        { problem: "Convertis 2 kg en g.", steps: ["1 kg = 1 000 g.", "2 x 1 000 = 2 000."], answer: "2 000 g" }
      ],
      audioScript: "Going to a smaller unit means multiplying; going to a bigger unit means dividing.",
      audioScriptFr: "Passer à une unité plus petite veut dire multiplier ; passer à une unité plus grande veut dire diviser."
    }
  ],
  Y5L8: [
    {
      order: 1,
      title: "Types of angle",
      titleFr: "Les types d'angles",
      concept: "Measuring angles in degrees and classifying them as acute, right, obtuse or reflex",
      conceptFr: "Mesurer des angles en degrés et les classer en aigus, droits, obtus ou rentrants",
      representation: "pictorial",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L8-1"],
      explanationMd:
        "Angles are measured in **degrees** (°). A full turn is 360°.\n\n" +
        "**Acute**: less than 90°. **Right angle**: exactly 90°. **Obtuse**: between 90° and 180°. **Reflex**: more than 180°.\n\n" +
        "Angles on a straight line always add up to 180°; angles around a point always add up to 360°.",
      explanationMdFr:
        "Les angles se mesurent en **degrés** (°). Un tour complet fait 360°.\n\n" +
        "**Aigu** : moins de 90°. **Angle droit** : exactement 90°. **Obtus** : entre 90° et 180°. **Rentrant** : plus de 180°.\n\n" +
        "Les angles sur une droite font toujours 180° en tout ; les angles autour d'un point font toujours 360° en tout.",
      workedExamples: [
        { problem: "What type of angle is 130°?", steps: ["130° is between 90° and 180°."], answer: "Obtuse" },
        { problem: "Two angles on a straight line are 65° and ___°.", steps: ["180 - 65 = 115."], answer: "115°" }
      ],
      workedExamplesFr: [
        { problem: "Quel type d'angle est 130° ?", steps: ["130° est compris entre 90° et 180°."], answer: "Obtus" },
        { problem: "Deux angles sur une droite mesurent 65° et ___°.", steps: ["180 - 65 = 115."], answer: "115°" }
      ],
      audioScript: "Acute is small and sharp, obtuse is wide, and reflex is more than a straight line.",
      audioScriptFr: "L'angle aigu est petit et pointu, l'angle obtus est large, et l'angle rentrant dépasse une ligne droite."
    },
    {
      order: 2,
      title: "Reflection and translation",
      titleFr: "La réflexion et la translation",
      concept: "Describing and finding the new position of a point after a translation or reflection",
      conceptFr: "Décrire et trouver la nouvelle position d'un point après une translation ou une réflexion",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L8-2"],
      explanationMd:
        "A **translation** slides a point without turning or flipping it — moving right/left changes the x-coordinate, moving up/down changes the y-coordinate.\n\n" +
        "A **reflection** flips a point across a mirror line. Reflecting in a vertical line only changes the x-coordinate; reflecting in a horizontal line only changes the y-coordinate. The mirror line is always the same distance from the point and its reflection.",
      explanationMdFr:
        "Une **translation** fait glisser un point sans le tourner ni le retourner — se déplacer à droite/gauche change la coordonnée x, se déplacer en haut/bas change la coordonnée y.\n\n" +
        "Une **réflexion** retourne un point de l'autre côté d'une ligne miroir. Une réflexion selon une ligne verticale ne change que la coordonnée x ; une réflexion selon une ligne horizontale ne change que la coordonnée y. La ligne miroir est toujours à la même distance du point et de son image.",
      workedExamples: [
        { problem: "Point (2, 3) is translated 4 right and 1 up.", steps: ["x: 2 + 4 = 6.", "y: 3 + 1 = 4."], answer: "(6, 4)" },
        { problem: "Point (1, 5) is reflected in the vertical line x = 4.", steps: ["The point is 3 to the left of the line.", "The reflection is 3 to the right of the line: 4 + 3 = 7.", "The y-coordinate stays the same."], answer: "(7, 5)" }
      ],
      workedExamplesFr: [
        { problem: "Le point (2, 3) est translaté de 4 vers la droite et 1 vers le haut.", steps: ["x : 2 + 4 = 6.", "y : 3 + 1 = 4."], answer: "(6, 4)" },
        { problem: "Le point (1, 5) est réfléchi selon la ligne verticale x = 4.", steps: ["Le point est à 3 à gauche de la ligne.", "L'image est à 3 à droite de la ligne : 4 + 3 = 7.", "La coordonnée y reste la même."], answer: "(7, 5)" }
      ],
      audioScript: "Translating slides a point; reflecting flips it across a mirror line, the same distance on the other side.",
      audioScriptFr: "Une translation fait glisser un point ; une réflexion le retourne de l'autre côté d'une ligne miroir, à la même distance."
    },
    {
      order: 3,
      title: "Properties of rectangles",
      titleFr: "Les propriétés des rectangles",
      concept: "Using the properties of a rectangle (opposite sides equal, all angles 90°) to find missing lengths and angles",
      conceptFr: "Utiliser les propriétés d'un rectangle (côtés opposés égaux, tous les angles à 90°) pour trouver des longueurs et des angles manquants",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L8-3"],
      explanationMd:
        "A rectangle always has **opposite sides equal in length** and **all four angles equal to 90°**. Knowing this lets you work out missing measurements without needing to see the whole shape.\n\n" +
        "The angles inside any four-sided shape always add up to 360°.",
      explanationMdFr:
        "Un rectangle a toujours des **côtés opposés de même longueur** et **quatre angles tous égaux à 90°**. Le savoir te permet de trouver des mesures manquantes sans avoir besoin de voir toute la forme.\n\n" +
        "Les angles à l'intérieur de n'importe quelle forme à quatre côtés font toujours 360° en tout.",
      workedExamples: [
        { problem: "A rectangle has a perimeter of 30 cm and one side of 8 cm. What is the adjacent side?", steps: ["Half the perimeter = 15 cm.", "15 - 8 = 7 cm."], answer: "7 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un rectangle a un périmètre de 30 cm et un côté de 8 cm. Quel est le côté adjacent ?", steps: ["La moitié du périmètre = 15 cm.", "15 - 8 = 7 cm."], answer: "7 cm" }
      ],
      audioScript: "Once you know one side and one angle of a rectangle, the properties tell you the rest.",
      audioScriptFr: "Une fois que tu connais un côté et un angle d'un rectangle, les propriétés te donnent le reste."
    }
  ],
  Y5L9: [
    {
      order: 1,
      title: "Reading line graphs",
      titleFr: "Lire des graphiques linéaires",
      concept: "Solving comparison, sum and difference problems using a line graph",
      conceptFr: "Résoudre des problèmes de comparaison, de somme et de différence à l'aide d'un graphique linéaire",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L9-1"],
      explanationMd:
        "A line graph shows how a value changes — read the point for each label to find its value, then compare, add or subtract as the question asks.\n\n" +
        "The **range** is the difference between the highest and lowest values on the graph.",
      explanationMdFr:
        "Un graphique linéaire montre comment une valeur change — lis le point pour chaque étiquette pour trouver sa valeur, puis compare, additionne ou soustrais selon ce que demande la question.\n\n" +
        "L'**étendue** est la différence entre la plus grande et la plus petite valeur du graphique.",
      workedExamples: [
        { problem: "A graph shows 12 books on Monday and 18 on Tuesday. How many more on Tuesday?", steps: ["18 - 12 = 6."], answer: "6 more" }
      ],
      workedExamplesFr: [
        { problem: "Un graphique montre 12 livres lundi et 18 mardi. Combien de plus mardi ?", steps: ["18 - 12 = 6."], answer: "6 de plus" }
      ],
      audioScript: "Find each point on the graph, read its value, then work out what the question is asking.",
      audioScriptFr: "Trouve chaque point sur le graphique, lis sa valeur, puis détermine ce que demande la question."
    },
    {
      order: 2,
      title: "Tables and timetables",
      titleFr: "Les tableaux et les horaires",
      concept: "Reading and interpreting information from tables, including bus and train timetables",
      conceptFr: "Lire et interpréter des informations dans des tableaux, y compris des horaires de bus et de train",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L9-2"],
      explanationMd:
        "A table organises information into rows and columns. A timetable is a special kind of table showing times — find the row or column that matches what you're looking for.\n\n" +
        "To find the next departure after a certain time, look for the first time in the list that is later than your arrival time.",
      explanationMdFr:
        "Un tableau organise l'information en lignes et en colonnes. Un horaire est un type particulier de tableau montrant des heures — trouve la ligne ou la colonne qui correspond à ce que tu cherches.\n\n" +
        "Pour trouver le prochain départ après une certaine heure, cherche la première heure de la liste qui est plus tardive que ton heure d'arrivée.",
      workedExamples: [
        { problem: "A bus timetable shows 09:15, 09:45, 10:15. You arrive at 09:20. What's the next bus?", steps: ["09:15 has already gone.", "The next one after 09:20 is 09:45."], answer: "09:45" }
      ],
      workedExamplesFr: [
        { problem: "Un horaire de bus indique 09:15, 09:45, 10:15. Tu arrives à 09:20. Quel est le prochain bus ?", steps: ["09:15 est déjà passé.", "Le prochain après 09:20 est 09:45."], answer: "09:45" }
      ],
      audioScript: "Scan along the table until you find the row or time that answers the question.",
      audioScriptFr: "Parcours le tableau jusqu'à trouver la ligne ou l'heure qui répond à la question."
    },
    {
      order: 3,
      title: "24-hour clock durations",
      titleFr: "Les durées sur l'horloge de 24 heures",
      concept: "Calculating how long a journey takes using 24-hour clock times",
      conceptFr: "Calculer la durée d'un trajet en utilisant des heures au format 24 heures",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L9-3"],
      explanationMd:
        "The 24-hour clock counts hours from 00:00 (midnight) to 23:59, avoiding the need for am/pm. To find a duration, count the minutes from the start time to the end time.\n\n" +
        "To add a duration to a time, add the minutes and carry over into hours once you reach 60.",
      explanationMdFr:
        "L'horloge de 24 heures compte les heures de 00:00 (minuit) à 23:59, sans avoir besoin du matin/après-midi. Pour trouver une durée, compte les minutes de l'heure de départ à l'heure de fin.\n\n" +
        "Pour ajouter une durée à une heure, additionne les minutes et reporte-les en heures une fois que tu atteins 60.",
      workedExamples: [
        { problem: "A train leaves at 14:35 and the journey takes 50 minutes. What time does it arrive?", steps: ["14:35 + 25 minutes = 15:00.", "15:00 + 25 more minutes = 15:25."], answer: "15:25" }
      ],
      workedExamplesFr: [
        { problem: "Un train part à 14:35 et le trajet dure 50 minutes. À quelle heure arrive-t-il ?", steps: ["14:35 + 25 minutes = 15:00.", "15:00 + 25 minutes de plus = 15:25."], answer: "15:25" }
      ],
      audioScript: "Break a duration into steps if it helps — get to the next whole hour first, then add what's left.",
      audioScriptFr: "Découpe une durée en étapes si ça aide — arrive d'abord à l'heure ronde suivante, puis ajoute ce qui reste."
    }
  ],
  Y5L10: [
    {
      order: 1,
      title: "Number review: place value, negatives and the four operations",
      titleFr: "Révision des nombres : valeur de position, négatifs et les quatre opérations",
      concept: "Bringing together place value, negative numbers, and formal addition/subtraction/multiplication/division with large numbers",
      conceptFr: "Rassembler la valeur de position, les nombres négatifs, et les méthodes formelles d'addition/soustraction/multiplication/division avec de grands nombres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L10-1"],
      explanationMd:
        "This level pulls together everything from Year 5's number work: reading and comparing numbers to 1,000,000, working with negative numbers, and using formal written methods for all four operations.\n\n" +
        "When in doubt, go back to the basics: compare digit by digit from the left, remember negative numbers count down through zero, and line up place value columns carefully for column methods.",
      explanationMdFr:
        "Ce niveau rassemble tout le travail sur les nombres de l'année 5 : lire et comparer des nombres jusqu'à 1 000 000, travailler avec des nombres négatifs, et utiliser des méthodes écrites formelles pour les quatre opérations.\n\n" +
        "En cas de doute, reviens aux bases : compare chiffre par chiffre à partir de la gauche, souviens-toi que les nombres négatifs descendent en passant par zéro, et aligne soigneusement les colonnes de valeur de position pour les méthodes en colonnes.",
      workedExamples: [
        { problem: "Round 583,240 to the nearest 10,000.", steps: ["Look at the thousands digit: 3.", "Round down."], answer: "580,000" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 583 240 à la dizaine de mille la plus proche.", steps: ["Regarde le chiffre des milliers : 3.", "Arrondis vers le bas."], answer: "580 000" }
      ],
      audioScript: "Everything from this term's number work comes together here — take your time and use the methods you've practised.",
      audioScriptFr: "Tout le travail sur les nombres de ce trimestre se rassemble ici — prends ton temps et utilise les méthodes que tu as pratiquées."
    },
    {
      order: 2,
      title: "Review: factors, fractions, decimals and percentages",
      titleFr: "Révision : diviseurs, fractions, décimaux et pourcentages",
      concept: "Applying factors, multiples, primes, fractions, decimals and percentages together",
      conceptFr: "Appliquer ensemble diviseurs, multiples, nombres premiers, fractions, décimaux et pourcentages",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L10-2"],
      explanationMd:
        "This level mixes questions on factors and multiples, prime numbers, square numbers, comparing and adding fractions, comparing and rounding decimals, and percentages as parts per hundred.\n\n" +
        "Remember the key links: a percentage is just a fraction out of 100, and decimals are fractions written using place value columns.",
      explanationMdFr:
        "Ce niveau mélange des questions sur les diviseurs et multiples, les nombres premiers, les nombres carrés, comparer et additionner des fractions, comparer et arrondir des décimaux, et les pourcentages en tant que parts sur cent.\n\n" +
        "Souviens-toi des liens essentiels : un pourcentage est juste une fraction sur 100, et les décimaux sont des fractions écrites à l'aide de colonnes de valeur de position.",
      workedExamples: [
        { problem: "Is 51 prime?", steps: ["51 ÷ 3 = 17, exactly.", "It has factors other than 1 and itself."], answer: "No, 51 is composite" }
      ],
      workedExamplesFr: [
        { problem: "51 est-il premier ?", steps: ["51 ÷ 3 = 17, exactement.", "Il a des diviseurs autres que 1 et lui-même."], answer: "Non, 51 est composé" }
      ],
      audioScript: "Fractions, decimals and percentages are all closely connected — use whichever way of thinking helps most.",
      audioScriptFr: "Fractions, décimaux et pourcentages sont tous étroitement liés — utilise la façon de penser qui t'aide le plus."
    },
    {
      order: 3,
      title: "Review: measurement, geometry and statistics",
      titleFr: "Révision : mesures, géométrie et statistiques",
      concept: "Applying area, volume, unit conversion, angles, coordinate transformations and graph/table reading",
      conceptFr: "Appliquer l'aire, le volume, la conversion d'unités, les angles, les transformations de coordonnées et la lecture de graphiques/tableaux",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L10-3"],
      explanationMd:
        "This level mixes questions on the area and volume of rectangles/cuboids, converting between metric units, classifying angles, translating points on a grid, and reading line graphs, tables and timetables.\n\n" +
        "For any measurement or geometry question, think about which formula or property applies before calculating.",
      explanationMdFr:
        "Ce niveau mélange des questions sur l'aire et le volume de rectangles/pavés droits, la conversion entre unités métriques, la classification d'angles, la translation de points sur un quadrillage, et la lecture de graphiques linéaires, tableaux et horaires.\n\n" +
        "Pour toute question de mesure ou de géométrie, réfléchis à quelle formule ou propriété s'applique avant de calculer.",
      workedExamples: [
        { problem: "A cuboid is 4 cm by 3 cm by 5 cm. What is its volume?", steps: ["4 x 3 x 5 = 60."], answer: "60 cm³" }
      ],
      workedExamplesFr: [
        { problem: "Un pavé droit mesure 4 cm sur 3 cm sur 5 cm. Quel est son volume ?", steps: ["4 x 3 x 5 = 60."], answer: "60 cm³" }
      ],
      audioScript: "This is your chance to show everything you've learned about shapes, measures and data this year.",
      audioScriptFr: "C'est ta chance de montrer tout ce que tu as appris sur les formes, les mesures et les données cette année."
    }
  ],
  Y2L1: [
    {
      order: 1,
      title: "Tens and ones",
      titleFr: "Les dizaines et les unités",
      concept: "Understanding that a two-digit number is made of tens and ones",
      conceptFr: "Comprendre qu'un nombre à deux chiffres est composé de dizaines et d'unités",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L1-1"],
      explanationMd:
        "Every two-digit number has a **tens digit** (the first digit) and a **ones digit** (the second digit). For example, 47 has 4 tens and 7 ones.\n\n" +
        "You can build any two-digit number by counting groups of ten, then adding the leftover ones.",
      explanationMdFr:
        "Chaque nombre à deux chiffres a un **chiffre des dizaines** (le premier chiffre) et un **chiffre des unités** (le second chiffre). Par exemple, 47 a 4 dizaines et 7 unités.\n\n" +
        "Tu peux construire n'importe quel nombre à deux chiffres en comptant des groupes de dix, puis en ajoutant les unités restantes.",
      workedExamples: [
        { problem: "How many tens and ones make 63?", steps: ["6 groups of ten = 60.", "3 left over."], answer: "6 tens, 3 ones" }
      ],
      workedExamplesFr: [
        { problem: "Combien de dizaines et d'unités font 63 ?", steps: ["6 groupes de dix = 60.", "3 de reste."], answer: "6 dizaines, 3 unités" }
      ],
      audioScript: "The first digit tells us the tens, the second digit tells us the ones.",
      audioScriptFr: "Le premier chiffre nous indique les dizaines, le second chiffre nous indique les unités."
    },
    {
      order: 2,
      title: "Comparing with <, > and =",
      titleFr: "Comparer avec <, > et =",
      concept: "Using the symbols < (less than), > (greater than) and = (equal to) to compare numbers",
      conceptFr: "Utiliser les symboles < (inférieur à), > (supérieur à) et = (égal à) pour comparer des nombres",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L1-2"],
      explanationMd:
        "The **<** symbol means 'is less than' and **>** means 'is greater than' — the symbol always points at the smaller number.\n\n" +
        "To compare two numbers, look at the tens digit first. If the tens match, compare the ones digit.",
      explanationMdFr:
        "Le symbole **<** veut dire « est inférieur à » et **>** veut dire « est supérieur à » — le symbole pointe toujours vers le nombre le plus petit.\n\n" +
        "Pour comparer deux nombres, regarde d'abord le chiffre des dizaines. Si les dizaines sont identiques, compare le chiffre des unités.",
      workedExamples: [
        { problem: "Which symbol goes here: 34 ___ 52?", steps: ["3 tens is less than 5 tens."], answer: "<" },
        { problem: "Which symbol goes here: 78 ___ 78?", steps: ["Both numbers are the same."], answer: "=" }
      ],
      workedExamplesFr: [
        { problem: "Quel symbole va ici : 34 ___ 52 ?", steps: ["3 dizaines, c'est moins que 5 dizaines."], answer: "<" },
        { problem: "Quel symbole va ici : 78 ___ 78 ?", steps: ["Les deux nombres sont identiques."], answer: "=" }
      ],
      audioScript: "The symbol always points towards the smaller number, like a hungry alligator eating the bigger one!",
      audioScriptFr: "Le symbole pointe toujours vers le plus petit nombre, comme un alligator affamé qui dévore le plus grand !"
    },
    {
      order: 3,
      title: "Counting in steps",
      titleFr: "Compter par bonds",
      concept: "Counting forwards in steps of 2, 3, 5 and 10 from any starting number",
      conceptFr: "Compter en avant par bonds de 2, 3, 5 et 10 à partir de n'importe quel nombre de départ",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L1-3"],
      explanationMd:
        "You don't have to start counting in steps from zero — you can count in 2s, 3s, 5s or 10s starting from **any** number.\n\n" +
        "When counting in 10s, only the tens digit changes each time; the ones digit stays the same.",
      explanationMdFr:
        "Tu n'es pas obligé de commencer à compter par bonds à partir de zéro — tu peux compter de 2 en 2, de 3 en 3, de 5 en 5 ou de 10 en 10 en partant de **n'importe quel** nombre.\n\n" +
        "Quand on compte de 10 en 10, seul le chiffre des dizaines change à chaque fois ; le chiffre des unités reste le même.",
      workedExamples: [
        { problem: "Count on in 3s from 8: 8, ___, ___, ___", steps: ["8 + 3 = 11.", "11 + 3 = 14.", "14 + 3 = 17."], answer: "11, 14, 17" },
        { problem: "What is 47 + 10?", steps: ["Only the tens digit changes: 4 becomes 5."], answer: "57" }
      ],
      workedExamplesFr: [
        { problem: "Compte de 3 en 3 à partir de 8 : 8, ___, ___, ___", steps: ["8 + 3 = 11.", "11 + 3 = 14.", "14 + 3 = 17."], answer: "11, 14, 17" },
        { problem: "Que vaut 47 + 10 ?", steps: ["Seul le chiffre des dizaines change : 4 devient 5."], answer: "57" }
      ],
      audioScript: "You can start a counting pattern from any number — just keep adding the same step size each time.",
      audioScriptFr: "Tu peux commencer un schéma de comptage à partir de n'importe quel nombre — continue simplement à ajouter le même pas à chaque fois."
    }
  ],
  Y2L2: [
    {
      order: 1,
      title: "Number facts to 20",
      titleFr: "Les faits numériques jusqu'à 20",
      concept: "Recalling addition and subtraction facts to 20 fluently",
      conceptFr: "Se rappeler avec aisance des faits d'addition et de soustraction jusqu'à 20",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L2-1"],
      explanationMd:
        "Knowing your number facts to 20 by heart — without having to count on your fingers — helps everything else in maths feel quicker and easier.\n\n" +
        "**Number bonds to 20** are pairs of numbers that add together to make 20, like 12 and 8, or 15 and 5.",
      explanationMdFr:
        "Connaître par cœur tes faits numériques jusqu'à 20 — sans avoir besoin de compter sur tes doigts — rend tout le reste des maths plus rapide et plus facile.\n\n" +
        "Les **compléments à 20** sont des paires de nombres qui s'additionnent pour faire 20, comme 12 et 8, ou 15 et 5.",
      workedExamples: [
        { problem: "What number bonds with 13 to make 20?", steps: ["20 - 13 = 7."], answer: "7" }
      ],
      workedExamplesFr: [
        { problem: "Quel nombre complète 13 pour faire 20 ?", steps: ["20 - 13 = 7."], answer: "7" }
      ],
      audioScript: "The more of these facts you know instantly, the faster and more confident you'll be with bigger numbers.",
      audioScriptFr: "Plus tu connais ces faits instantanément, plus tu seras rapide et confiant avec de plus grands nombres."
    },
    {
      order: 2,
      title: "Related facts",
      titleFr: "Les faits liés",
      concept: "Using a known fact (like 7+3=10) to work out a related fact (like 70+30=100)",
      conceptFr: "Utiliser un fait connu (comme 7+3=10) pour trouver un fait lié (comme 70+30=100)",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L2-2"],
      explanationMd:
        "If you know a small number fact, you can use it to work out a much bigger one instantly! If 7 + 3 = 10, then 70 + 30 = 100 — the digits are exactly the same, just ten times bigger.\n\n" +
        "This works for subtraction too: if 9 - 4 = 5, then 90 - 40 = 50.",
      explanationMdFr:
        "Si tu connais un petit fait numérique, tu peux l'utiliser pour trouver instantanément un fait bien plus grand ! Si 7 + 3 = 10, alors 70 + 30 = 100 — les chiffres sont exactement les mêmes, juste dix fois plus grands.\n\n" +
        "Cela fonctionne aussi pour la soustraction : si 9 - 4 = 5, alors 90 - 40 = 50.",
      workedExamples: [
        { problem: "If 6 + 4 = 10, what is 60 + 40?", steps: ["Same digits, ten times bigger."], answer: "100" }
      ],
      workedExamplesFr: [
        { problem: "Si 6 + 4 = 10, que vaut 60 + 40 ?", steps: ["Mêmes chiffres, dix fois plus grand."], answer: "100" }
      ],
      audioScript: "Spot the small fact hiding inside the big one, and the big calculation becomes easy.",
      audioScriptFr: "Repère le petit fait caché à l'intérieur du grand, et le grand calcul devient facile."
    },
    {
      order: 3,
      title: "Using a number line to add and subtract",
      titleFr: "Utiliser une droite numérique pour additionner et soustraire",
      concept: "Adding and subtracting mentally by picturing jumps on a number line",
      conceptFr: "Additionner et soustraire mentalement en imaginant des bonds sur une droite numérique",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L2-3"],
      explanationMd:
        "A number line helps you add or subtract in your head. To add, jump forwards. To subtract, jump backwards.\n\n" +
        "A useful trick is **bridging through 10**: split your jump into two parts — first jump to the next multiple of 10, then jump the rest of the way.",
      explanationMdFr:
        "Une droite numérique t'aide à additionner ou soustraire de tête. Pour additionner, saute en avant. Pour soustraire, saute en arrière.\n\n" +
        "Une astuce utile est de **passer par 10** : sépare ton saut en deux parties — saute d'abord jusqu'au prochain multiple de 10, puis termine le saut.",
      workedExamples: [
        { problem: "8 + 5 using bridging: 8 + 2 = 10, then 10 + 3 = ?", steps: ["8 + 2 = 10.", "10 + 3 = 13."], answer: "13" }
      ],
      workedExamplesFr: [
        { problem: "8 + 5 en passant par 10 : 8 + 2 = 10, puis 10 + 3 = ?", steps: ["8 + 2 = 10.", "10 + 3 = 13."], answer: "13" }
      ],
      audioScript: "Picture the number line in your head — jump to a friendly multiple of 10 first, then finish the jump.",
      audioScriptFr: "Imagine la droite numérique dans ta tête — saute d'abord jusqu'à un multiple de 10 facile, puis termine le saut."
    }
  ],
  Y2L3: [
    {
      order: 1,
      title: "Adding a two-digit number and ones",
      titleFr: "Additionner un nombre à deux chiffres et des unités",
      concept: "Adding a single-digit number of ones onto a two-digit number",
      conceptFr: "Ajouter un nombre d'unités à un chiffre à un nombre à deux chiffres",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L3-1"],
      explanationMd:
        "When you add ones onto a two-digit number, only the ones digit changes (unless it goes past a multiple of ten).\n\n" +
        "You can picture this as a small jump forwards on a number line, starting from the two-digit number.",
      explanationMdFr:
        "Quand tu ajoutes des unités à un nombre à deux chiffres, seul le chiffre des unités change (sauf s'il dépasse un multiple de dix).\n\n" +
        "Tu peux imaginer cela comme un petit saut en avant sur une droite numérique, en partant du nombre à deux chiffres.",
      workedExamples: [
        { problem: "What is 34 + 5?", steps: ["Keep the 3 tens.", "4 ones + 5 ones = 9 ones."], answer: "39" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 34 + 5 ?", steps: ["Garde les 3 dizaines.", "4 unités + 5 unités = 9 unités."], answer: "39" }
      ],
      audioScript: "Adding a few ones is just a small hop forward — the tens digit usually stays exactly the same.",
      audioScriptFr: "Ajouter quelques unités, c'est juste un petit saut en avant — le chiffre des dizaines reste généralement exactement le même."
    },
    {
      order: 2,
      title: "Adding and subtracting two two-digit numbers",
      titleFr: "Additionner et soustraire deux nombres à deux chiffres",
      concept: "Adding or subtracting two two-digit numbers by working with tens and ones separately",
      conceptFr: "Additionner ou soustraire deux nombres à deux chiffres en travaillant séparément les dizaines et les unités",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L3-2"],
      explanationMd:
        "To add two two-digit numbers, add the tens together, then add the ones together, then combine the two totals.\n\n" +
        "Subtracting works the same way — but always start with the bigger number.",
      explanationMdFr:
        "Pour additionner deux nombres à deux chiffres, additionne d'abord les dizaines ensemble, puis les unités ensemble, puis combine les deux totaux.\n\n" +
        "La soustraction fonctionne de la même façon — mais commence toujours par le plus grand nombre.",
      workedExamples: [
        { problem: "What is 34 + 25?", steps: ["30 + 20 = 50.", "4 + 5 = 9.", "50 + 9 = 59."], answer: "59" },
        { problem: "What is 68 - 23?", steps: ["60 - 20 = 40.", "8 - 3 = 5.", "40 + 5 = 45."], answer: "45" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 34 + 25 ?", steps: ["30 + 20 = 50.", "4 + 5 = 9.", "50 + 9 = 59."], answer: "59" },
        { problem: "Que vaut 68 - 23 ?", steps: ["60 - 20 = 40.", "8 - 3 = 5.", "40 + 5 = 45."], answer: "45" }
      ],
      audioScript: "Split each number into its tens and ones, work with each part separately, then put your answer back together.",
      audioScriptFr: "Sépare chaque nombre en dizaines et unités, travaille chaque partie séparément, puis rassemble ta réponse."
    },
    {
      order: 3,
      title: "Two-step word problems",
      titleFr: "Les problèmes en deux étapes",
      concept: "Solving word problems that need two additions/subtractions to reach the answer",
      conceptFr: "Résoudre des problèmes qui nécessitent deux additions/soustractions pour arriver à la réponse",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L3-3"],
      explanationMd:
        "Some word problems need **two steps** to solve. Read carefully to work out what happens first, and what happens second.\n\n" +
        "It often helps to work out the answer after the first step before moving on to the second step.",
      explanationMdFr:
        "Certains problèmes nécessitent **deux étapes** pour être résolus. Lis attentivement pour comprendre ce qui se passe d'abord, et ce qui se passe ensuite.\n\n" +
        "Il est souvent utile de calculer le résultat après la première étape avant de passer à la seconde étape.",
      workedExamples: [
        { problem: "Amy has 20 stickers. She gets 15 more, then gives away 8. How many does she have now?", steps: ["20 + 15 = 35.", "35 - 8 = 27."], answer: "27" }
      ],
      workedExamplesFr: [
        { problem: "Amy a 20 autocollants. Elle en reçoit 15 de plus, puis en donne 8. Combien en a-t-elle maintenant ?", steps: ["20 + 15 = 35.", "35 - 8 = 27."], answer: "27" }
      ],
      audioScript: "Break a two-step problem into two smaller, one-step problems, and solve them one at a time.",
      audioScriptFr: "Découpe un problème en deux étapes en deux petits problèmes à une étape, et résous-les un par un."
    }
  ],
  Y2L4: [
    {
      order: 1,
      title: "The 2, 5 and 10 times tables",
      titleFr: "Les tables de multiplication de 2, de 5 et de 10",
      concept: "Recalling multiplication facts for the 2, 5 and 10 times tables",
      conceptFr: "Se rappeler les faits de multiplication des tables de 2, de 5 et de 10",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L4-1"],
      explanationMd:
        "The **2 times table** is just doubling. The **10 times table** is the number with a zero on the end. The **5 times table** always ends in 0 or 5.\n\n" +
        "The more of these facts you know instantly, the quicker you'll be at multiplying and dividing.",
      explanationMdFr:
        "La **table de 2**, c'est juste doubler. La **table de 10**, c'est le nombre avec un zéro à la fin. La **table de 5** se termine toujours par 0 ou 5.\n\n" +
        "Plus tu connais ces faits instantanément, plus tu seras rapide pour multiplier et diviser.",
      workedExamples: [
        { problem: "What is 6 x 5?", steps: ["Half of 6 x 10 = 60.", "Half of 60 is 30."], answer: "30" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 6 x 5 ?", steps: ["La moitié de 6 x 10 = 60.", "La moitié de 60 est 30."], answer: "30" }
      ],
      audioScript: "Doubling, adding a zero, and counting in fives — three quick tricks for these three tables.",
      audioScriptFr: "Doubler, ajouter un zéro, et compter de cinq en cinq — trois astuces rapides pour ces trois tables."
    },
    {
      order: 2,
      title: "Multiplication as an array",
      titleFr: "La multiplication en tant que quadrillage",
      concept: "Representing a multiplication fact as rows and columns of objects",
      conceptFr: "Représenter un fait de multiplication sous forme de lignes et de colonnes d'objets",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L4-2"],
      explanationMd:
        "An **array** is objects arranged in equal rows and columns. Counting the rows and how many are in each row shows you the multiplication fact.\n\n" +
        "For example, 4 rows of 5 dots is the same as 4 x 5 = 20.",
      explanationMdFr:
        "Un **quadrillage** est un ensemble d'objets disposés en lignes et colonnes égales. Compter les lignes et le nombre d'objets dans chaque ligne te montre le fait de multiplication.\n\n" +
        "Par exemple, 4 lignes de 5 points, c'est la même chose que 4 x 5 = 20.",
      workedExamples: [
        { problem: "An array has 3 rows of 5. How many altogether?", steps: ["3 rows x 5 in each row."], answer: "15" }
      ],
      workedExamplesFr: [
        { problem: "Un quadrillage a 3 lignes de 5. Combien y en a-t-il en tout ?", steps: ["3 lignes x 5 dans chaque ligne."], answer: "15" }
      ],
      audioScript: "Rows go across, and each row has the same number in it — count the rows, then multiply.",
      audioScriptFr: "Les lignes vont d'un côté à l'autre, et chaque ligne contient le même nombre — compte les lignes, puis multiplie."
    },
    {
      order: 3,
      title: "Dividing by sharing and grouping",
      titleFr: "Diviser par partage et par groupement",
      concept: "Solving division problems by sharing into equal groups, or by making groups of a fixed size",
      conceptFr: "Résoudre des problèmes de division en partageant en groupes égaux, ou en formant des groupes de taille fixe",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L4-3"],
      explanationMd:
        "**Sharing** means splitting a total equally between a number of people, one at a time, to find how many each person gets.\n\n" +
        "**Grouping** means finding how many equal-sized groups fit into a total. Both are division, just thought about in two different ways.",
      explanationMdFr:
        "**Partager** veut dire séparer un total équitablement entre un certain nombre de personnes, un à la fois, pour trouver combien chaque personne reçoit.\n\n" +
        "**Grouper** veut dire trouver combien de groupes de taille égale tiennent dans un total. Les deux sont de la division, simplement pensée de deux façons différentes.",
      workedExamples: [
        { problem: "20 stickers are shared equally between 5 friends. How many does each friend get?", steps: ["20 ÷ 5 = 4."], answer: "4" },
        { problem: "20 stickers are put into groups of 5. How many groups are there?", steps: ["20 ÷ 5 = 4 groups."], answer: "4" }
      ],
      workedExamplesFr: [
        { problem: "20 autocollants sont partagés équitablement entre 5 amis. Combien chaque ami reçoit-il ?", steps: ["20 ÷ 5 = 4."], answer: "4" },
        { problem: "20 autocollants sont mis en groupes de 5. Combien y a-t-il de groupes ?", steps: ["20 ÷ 5 = 4 groupes."], answer: "4" }
      ],
      audioScript: "Sharing asks 'how many each?'. Grouping asks 'how many groups?'. Both use the same division fact.",
      audioScriptFr: "Partager demande « combien chacun ? ». Grouper demande « combien de groupes ? ». Les deux utilisent le même fait de division."
    }
  ],
  Y3L1: [
    {
      order: 1,
      title: "Hundreds, tens and ones",
      titleFr: "Les centaines, les dizaines et les unités",
      concept: "Understanding that a three-digit number is made of hundreds, tens and ones",
      conceptFr: "Comprendre qu'un nombre à trois chiffres est composé de centaines, de dizaines et d'unités",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y3-L1-1"],
      explanationMd:
        "Every three-digit number has a **hundreds digit** (the first digit), a **tens digit** (the middle digit) and a **ones digit** (the last digit). For example, 347 has 3 hundreds, 4 tens and 7 ones.\n\n" +
        "You can build any three-digit number by counting groups of a hundred, then groups of ten, then adding the leftover ones.",
      explanationMdFr:
        "Chaque nombre à trois chiffres a un **chiffre des centaines** (le premier chiffre), un **chiffre des dizaines** (le chiffre du milieu) et un **chiffre des unités** (le dernier chiffre). Par exemple, 347 a 3 centaines, 4 dizaines et 7 unités.\n\n" +
        "Tu peux construire n'importe quel nombre à trois chiffres en comptant des groupes de cent, puis des groupes de dix, puis en ajoutant les unités restantes.",
      workedExamples: [
        { problem: "How many hundreds, tens and ones make 528?", steps: ["5 groups of a hundred = 500.", "2 groups of ten = 20.", "8 left over."], answer: "5 hundreds, 2 tens, 8 ones" }
      ],
      workedExamplesFr: [
        { problem: "Combien de centaines, de dizaines et d'unités font 528 ?", steps: ["5 groupes de cent = 500.", "2 groupes de dix = 20.", "8 de reste."], answer: "5 centaines, 2 dizaines, 8 unités" }
      ],
      audioScript: "The first digit tells us the hundreds, the middle digit tells us the tens, and the last digit tells us the ones.",
      audioScriptFr: "Le premier chiffre nous indique les centaines, le chiffre du milieu nous indique les dizaines, et le dernier chiffre nous indique les unités."
    },
    {
      order: 2,
      title: "Comparing numbers to 1,000",
      titleFr: "Comparer des nombres jusqu'à 1 000",
      concept: "Using the symbols < (less than), > (greater than) and = (equal to) to compare numbers up to 1,000",
      conceptFr: "Utiliser les symboles < (inférieur à), > (supérieur à) et = (égal à) pour comparer des nombres jusqu'à 1 000",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y3-L1-2"],
      explanationMd:
        "To compare two three-digit numbers, look at the hundreds digit first. If the hundreds match, compare the tens digit. If those match too, compare the ones digit.\n\n" +
        "The **<** symbol means 'is less than' and **>** means 'is greater than' — the symbol always points at the smaller number.",
      explanationMdFr:
        "Pour comparer deux nombres à trois chiffres, regarde d'abord le chiffre des centaines. Si les centaines sont identiques, compare le chiffre des dizaines. Si celles-ci sont identiques aussi, compare le chiffre des unités.\n\n" +
        "Le symbole **<** veut dire « est inférieur à » et **>** veut dire « est supérieur à » — le symbole pointe toujours vers le nombre le plus petit.",
      workedExamples: [
        { problem: "Which symbol goes here: 342 ___ 521?", steps: ["3 hundreds is less than 5 hundreds."], answer: "<" },
        { problem: "Which symbol goes here: 618 ___ 615?", steps: ["Both have 6 hundreds and 1 ten.", "8 ones is more than 5 ones."], answer: ">" }
      ],
      workedExamplesFr: [
        { problem: "Quel symbole va ici : 342 ___ 521 ?", steps: ["3 centaines, c'est moins que 5 centaines."], answer: "<" },
        { problem: "Quel symbole va ici : 618 ___ 615 ?", steps: ["Les deux ont 6 centaines et 1 dizaine.", "8 unités, c'est plus que 5 unités."], answer: ">" }
      ],
      audioScript: "Compare column by column, starting with the biggest place value — hundreds first, then tens, then ones.",
      audioScriptFr: "Compare colonne par colonne, en commençant par la plus grande valeur de position — les centaines d'abord, puis les dizaines, puis les unités."
    },
    {
      order: 3,
      title: "Counting in multiples from 0",
      titleFr: "Compter en multiples à partir de 0",
      concept: "Counting forwards from 0 in multiples of 4, 8, 50 and 100",
      conceptFr: "Compter en avant à partir de 0 en multiples de 4, 8, 50 et 100",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y3-L1-3"],
      explanationMd:
        "A counting pattern that starts at 0 and always jumps by the same amount produces a list of **multiples**. Counting in 4s from 0 gives 0, 4, 8, 12, 16...\n\n" +
        "Counting in 50s or 100s from 0 is quick because only the first digit or two change each time.",
      explanationMdFr:
        "Un schéma de comptage qui commence à 0 et saute toujours de la même quantité produit une liste de **multiples**. Compter de 4 en 4 à partir de 0 donne 0, 4, 8, 12, 16...\n\n" +
        "Compter de 50 en 50 ou de 100 en 100 à partir de 0 est rapide car seuls le premier chiffre ou les deux premiers changent à chaque fois.",
      workedExamples: [
        { problem: "Count on in 8s from 0: 0, 8, ___, ___", steps: ["0 + 8 = 8.", "8 + 8 = 16.", "16 + 8 = 24."], answer: "16, 24" },
        { problem: "What comes after 350 when counting in 50s?", steps: ["350 + 50 = 400."], answer: "400" }
      ],
      workedExamplesFr: [
        { problem: "Compte de 8 en 8 à partir de 0 : 0, 8, ___, ___", steps: ["0 + 8 = 8.", "8 + 8 = 16.", "16 + 8 = 24."], answer: "16, 24" },
        { problem: "Que vient après 350 en comptant de 50 en 50 ?", steps: ["350 + 50 = 400."], answer: "400" }
      ],
      audioScript: "Keep adding the same step size from zero, and you'll build the whole multiples pattern.",
      audioScriptFr: "Continue à ajouter le même pas à partir de zéro, et tu construiras tout le schéma des multiples."
    }
  ],
  Y3L2: [
    {
      order: 1,
      title: "Adding and subtracting mentally",
      titleFr: "Additionner et soustraire mentalement",
      concept: "Adding and subtracting a three-digit number and ones, tens or hundreds in your head",
      conceptFr: "Additionner et soustraire de tête un nombre à trois chiffres et des unités, des dizaines ou des centaines",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y3-L2-1"],
      explanationMd:
        "When you add or subtract ones, tens or hundreds to a three-digit number, only one digit changes (unless it carries over).\n\n" +
        "Adding ones changes the ones digit; adding tens changes the tens digit; adding hundreds changes the hundreds digit.",
      explanationMdFr:
        "Quand tu additionnes ou soustrais des unités, des dizaines ou des centaines à un nombre à trois chiffres, un seul chiffre change (sauf s'il y a une retenue).\n\n" +
        "Ajouter des unités change le chiffre des unités ; ajouter des dizaines change le chiffre des dizaines ; ajouter des centaines change le chiffre des centaines.",
      workedExamples: [
        { problem: "What is 342 + 6?", steps: ["Only the ones digit changes: 2 + 6 = 8."], answer: "348" },
        { problem: "What is 342 + 50?", steps: ["Only the tens digit changes: 4 + 5 = 9."], answer: "392" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 342 + 6 ?", steps: ["Seul le chiffre des unités change : 2 + 6 = 8."], answer: "348" },
        { problem: "Que vaut 342 + 50 ?", steps: ["Seul le chiffre des dizaines change : 4 + 5 = 9."], answer: "392" }
      ],
      audioScript: "Spot which column is changing — ones, tens, or hundreds — and you can often do it in your head.",
      audioScriptFr: "Repère quelle colonne change — unités, dizaines ou centaines — et tu pourras souvent le faire de tête."
    },
    {
      order: 2,
      title: "Column addition and subtraction",
      titleFr: "L'addition et la soustraction en colonnes",
      concept: "Using the formal written column method to add and subtract larger numbers, carrying and borrowing where needed",
      conceptFr: "Utiliser la méthode écrite formelle en colonnes pour additionner et soustraire de plus grands nombres, avec retenues et emprunts si nécessaire",
      representation: "pictorial",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y3-L2-2"],
      explanationMd:
        "In column addition, line up the ones, tens and hundreds, then add each column from the right. If a column adds to 10 or more, **carry** 1 into the next column.\n\n" +
        "In column subtraction, if a digit is too small to subtract from, **borrow** 1 from the column to its left.",
      explanationMdFr:
        "Dans l'addition en colonnes, aligne les unités, les dizaines et les centaines, puis additionne chaque colonne en partant de la droite. Si une colonne totalise 10 ou plus, **retiens** 1 dans la colonne suivante.\n\n" +
        "Dans la soustraction en colonnes, si un chiffre est trop petit pour qu'on puisse soustraire, **emprunte** 1 à la colonne à sa gauche.",
      workedExamples: [
        { problem: "What is 358 + 276?", steps: ["8 + 6 = 14, write 4, carry 1.", "5 + 7 + 1 = 13, write 3, carry 1.", "3 + 2 + 1 = 6."], answer: "634" },
        { problem: "What is 542 - 168?", steps: ["2 - 8 needs borrowing: 12 - 8 = 4.", "3 - 6 needs borrowing: 13 - 6 = 7.", "4 - 1 = 3."], answer: "374" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 358 + 276 ?", steps: ["8 + 6 = 14, écris 4, retiens 1.", "5 + 7 + 1 = 13, écris 3, retiens 1.", "3 + 2 + 1 = 6."], answer: "634" },
        { problem: "Que vaut 542 - 168 ?", steps: ["2 - 8 nécessite un emprunt : 12 - 8 = 4.", "3 - 6 nécessite un emprunt : 13 - 6 = 7.", "4 - 1 = 3."], answer: "374" }
      ],
      audioScript: "Always start from the ones column on the right, and carry or borrow whenever a column doesn't fit.",
      audioScriptFr: "Commence toujours par la colonne des unités à droite, et retiens ou emprunte chaque fois qu'une colonne ne suffit pas."
    },
    {
      order: 3,
      title: "Estimating and checking with inverse operations",
      titleFr: "Estimer et vérifier avec les opérations inverses",
      concept: "Estimating an answer by rounding first, and checking a calculation using the inverse operation",
      conceptFr: "Estimer un résultat en arrondissant d'abord, et vérifier un calcul à l'aide de l'opération inverse",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y3-L2-3"],
      explanationMd:
        "Before doing a written calculation, it helps to **estimate** the answer by rounding each number to the nearest 100 first — this helps you spot a mistake later.\n\n" +
        "You can also **check** an answer using the inverse operation: if 250 + 180 = 430, then 430 - 180 should equal 250.",
      explanationMdFr:
        "Avant de faire un calcul écrit, il est utile d'**estimer** le résultat en arrondissant d'abord chaque nombre à la centaine la plus proche — cela t'aide à repérer une erreur plus tard.\n\n" +
        "Tu peux aussi **vérifier** un résultat à l'aide de l'opération inverse : si 250 + 180 = 430, alors 430 - 180 devrait égaler 250.",
      workedExamples: [
        { problem: "Estimate 387 + 512 by rounding to the nearest 100.", steps: ["387 rounds to 400.", "512 rounds to 500."], answer: "900" },
        { problem: "Check that 260 + 340 = 600 using the inverse.", steps: ["600 - 340 = 260, which matches the first number."], answer: "Correct" }
      ],
      workedExamplesFr: [
        { problem: "Estime 387 + 512 en arrondissant à la centaine la plus proche.", steps: ["387 s'arrondit à 400.", "512 s'arrondit à 500."], answer: "900" },
        { problem: "Vérifie que 260 + 340 = 600 à l'aide de l'inverse.", steps: ["600 - 340 = 260, ce qui correspond au premier nombre."], answer: "Correct" }
      ],
      audioScript: "Round first to get a sensible estimate, and use the opposite operation afterwards to check your work.",
      audioScriptFr: "Arrondis d'abord pour obtenir une estimation raisonnable, puis utilise l'opération opposée pour vérifier ton travail."
    }
  ],
  Y6L1: [
    {
      order: 1,
      title: "Numbers to 10,000,000",
      titleFr: "Les nombres jusqu'à 10 000 000",
      concept: "Reading, writing, ordering and comparing numbers up to ten million",
      conceptFr: "Lire, écrire, ordonner et comparer des nombres jusqu'à dix millions",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L1-1"],
      explanationMd:
        "A seven-digit number has a **millions digit** (the first digit), then hundred thousands, ten thousands, thousands, hundreds, tens and ones — the same place-value pattern just extended further left.\n\n" +
        "To compare two large numbers, compare digit by digit from the left: millions first, then hundred thousands, and so on.",
      explanationMdFr:
        "Un nombre à sept chiffres a un **chiffre des millions** (le premier chiffre), puis les centaines de mille, les dizaines de mille, les milliers, les centaines, les dizaines et les unités — le même schéma de valeur de position, juste étendu plus loin vers la gauche.\n\n" +
        "Pour comparer deux grands nombres, compare chiffre par chiffre à partir de la gauche : les millions d'abord, puis les centaines de mille, et ainsi de suite.",
      workedExamples: [
        { problem: "Which is bigger: 4,582,910 or 4,529,988?", steps: ["Both have 4 million.", "5 hundred thousand is the same.", "8 ten thousand is more than 2 ten thousand."], answer: "4,582,910" }
      ],
      workedExamplesFr: [
        { problem: "Lequel est le plus grand : 4 582 910 ou 4 529 988 ?", steps: ["Les deux ont 4 millions.", "5 centaines de mille sont identiques.", "8 dizaines de mille, c'est plus que 2 dizaines de mille."], answer: "4 582 910" }
      ],
      audioScript: "Compare column by column from the left, starting with the millions — the same trick you already use for smaller numbers.",
      audioScriptFr: "Compare colonne par colonne à partir de la gauche, en commençant par les millions — la même astuce que tu utilises déjà pour les plus petits nombres."
    },
    {
      order: 2,
      title: "Rounding to any degree of accuracy",
      titleFr: "Arrondir à n'importe quel degré de précision",
      concept: "Rounding a whole number to the nearest 10, 100, 1,000 or any other required place value",
      conceptFr: "Arrondir un nombre entier à la dizaine, la centaine, le millier ou toute autre valeur de position demandée",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L1-2"],
      explanationMd:
        "Rounding to 'a required degree of accuracy' means the question tells you which place value to round to. Look at the digit **one place smaller** than that — 5 or more rounds up, less than 5 rounds down.\n\n" +
        "The same rule works whether you're rounding to the nearest 10 or the nearest million.",
      explanationMdFr:
        "Arrondir à « un degré de précision demandé » veut dire que la question t'indique à quelle valeur de position arrondir. Regarde le chiffre **une position plus petite** que celle-ci — 5 ou plus arrondit vers le haut, moins de 5 arrondit vers le bas.\n\n" +
        "La même règle fonctionne que tu arrondisses à la dizaine la plus proche ou au million le plus proche.",
      workedExamples: [
        { problem: "Round 3,647,208 to the nearest 100,000.", steps: ["Look at the ten-thousands digit: 4.", "4 is less than 5, so round down."], answer: "3,600,000" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 3 647 208 à la centaine de mille la plus proche.", steps: ["Regarde le chiffre des dizaines de mille : 4.", "4 est inférieur à 5, donc on arrondit vers le bas."], answer: "3 600 000" }
      ],
      audioScript: "Find the place value you're rounding to, check the digit just after it, and round up or down from there.",
      audioScriptFr: "Trouve la valeur de position à laquelle tu arrondis, vérifie le chiffre juste après, et arrondis vers le haut ou vers le bas."
    },
    {
      order: 3,
      title: "Negative numbers and intervals across zero",
      titleFr: "Les nombres négatifs et les intervalles à travers zéro",
      concept: "Using negative numbers in context and calculating the interval between a negative and a positive value",
      conceptFr: "Utiliser des nombres négatifs en contexte et calculer l'intervalle entre une valeur négative et une valeur positive",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L1-3"],
      explanationMd:
        "An **interval across zero** is the total distance between a negative number and a positive number. Add how far below zero you started to how far above zero you ended.\n\n" +
        "For example, from -8°C to 15°C, the interval is 8 (up to zero) + 15 (up to 15) = 23 degrees.",
      explanationMdFr:
        "Un **intervalle à travers zéro** est la distance totale entre un nombre négatif et un nombre positif. Additionne la distance en dessous de zéro où tu as commencé à la distance au-dessus de zéro où tu as fini.\n\n" +
        "Par exemple, de -8°C à 15°C, l'intervalle est 8 (jusqu'à zéro) + 15 (jusqu'à 15) = 23 degrés.",
      workedExamples: [
        { problem: "The temperature rose from -6°C to 9°C. What was the interval?", steps: ["6 (up to zero) + 9 (up to 9)."], answer: "15°C" }
      ],
      workedExamplesFr: [
        { problem: "La température est passée de -6°C à 9°C. Quel était l'intervalle ?", steps: ["6 (jusqu'à zéro) + 9 (jusqu'à 9)."], answer: "15°C" }
      ],
      audioScript: "Crossing zero doesn't change the method — just add the distance below zero to the distance above it.",
      audioScriptFr: "Passer par zéro ne change pas la méthode — additionne simplement la distance en dessous de zéro à la distance au-dessus."
    }
  ],
  Y6L2: [
    {
      order: 1,
      title: "Multiplying by a two-digit number",
      titleFr: "Multiplier par un nombre à deux chiffres",
      concept: "Using the formal written method to multiply a large number by a two-digit number",
      conceptFr: "Utiliser la méthode écrite formelle pour multiplier un grand nombre par un nombre à deux chiffres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L2-1"],
      explanationMd:
        "To multiply by a two-digit number, split it into tens and ones. Multiply by the ones first, then by the tens, then add the two results together.\n\n" +
        "For example, to work out 234 x 26, work out 234 x 6 and 234 x 20 separately, then add them.",
      explanationMdFr:
        "Pour multiplier par un nombre à deux chiffres, sépare-le en dizaines et unités. Multiplie d'abord par les unités, puis par les dizaines, puis additionne les deux résultats.\n\n" +
        "Par exemple, pour calculer 234 x 26, calcule 234 x 6 et 234 x 20 séparément, puis additionne-les.",
      workedExamples: [
        { problem: "What is 234 x 26?", steps: ["234 x 6 = 1,404.", "234 x 20 = 4,680.", "1,404 + 4,680 = 6,084."], answer: "6,084" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 234 x 26 ?", steps: ["234 x 6 = 1 404.", "234 x 20 = 4 680.", "1 404 + 4 680 = 6 084."], answer: "6 084" }
      ],
      audioScript: "Split the two-digit number into tens and ones, multiply by each part separately, then add the results.",
      audioScriptFr: "Sépare le nombre à deux chiffres en dizaines et unités, multiplie par chaque partie séparément, puis additionne les résultats."
    },
    {
      order: 2,
      title: "Dividing by a two-digit number and remainders",
      titleFr: "Diviser par un nombre à deux chiffres et les restes",
      concept: "Using long division to divide by a two-digit number, and deciding how to interpret a remainder",
      conceptFr: "Utiliser la division posée pour diviser par un nombre à deux chiffres, et décider comment interpréter un reste",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L2-2"],
      explanationMd:
        "When a division doesn't divide exactly, there's a **remainder** left over. What you do with the remainder depends on the question: sometimes you round up (like needing an extra coach), sometimes you round down (like counting complete teams), and sometimes the remainder itself is the answer.\n\n" +
        "Always read the context carefully to decide which is sensible.",
      explanationMdFr:
        "Quand une division ne tombe pas juste, il reste un **reste**. Ce que tu en fais dépend de la question : parfois tu arrondis vers le haut (comme avoir besoin d'un car en plus), parfois tu arrondis vers le bas (comme compter des équipes complètes), et parfois le reste lui-même est la réponse.\n\n" +
        "Lis toujours le contexte attentivement pour décider ce qui est sensé.",
      workedExamples: [
        { problem: "163 people need seats on minibuses that hold 25 each. How many minibuses are needed?", steps: ["163 ÷ 25 = 6 remainder 13.", "An extra minibus is needed for the 13 left over."], answer: "7" },
        { problem: "How many complete teams of 12 can be made from 100 players?", steps: ["100 ÷ 12 = 8 remainder 4.", "Only complete teams count."], answer: "8" }
      ],
      workedExamplesFr: [
        { problem: "163 personnes ont besoin de places dans des minibus qui accueillent 25 personnes chacun. Combien de minibus faut-il ?", steps: ["163 ÷ 25 = 6 reste 13.", "Un minibus supplémentaire est nécessaire pour les 13 restants."], answer: "7" },
        { problem: "Combien d'équipes complètes de 12 peut-on former avec 100 joueurs ?", steps: ["100 ÷ 12 = 8 reste 4.", "Seules les équipes complètes comptent."], answer: "8" }
      ],
      audioScript: "The remainder isn't always ignored — think about what makes sense for the real situation in the question.",
      audioScriptFr: "Le reste n'est pas toujours ignoré — réfléchis à ce qui a du sens pour la situation réelle de la question."
    },
    {
      order: 3,
      title: "Multi-step problems and estimating to check",
      titleFr: "Les problèmes à plusieurs étapes et l'estimation pour vérifier",
      concept: "Solving problems that combine several operations, and using estimation to check the answer is sensible",
      conceptFr: "Résoudre des problèmes qui combinent plusieurs opérations, et utiliser l'estimation pour vérifier qu'un résultat est raisonnable",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L2-3"],
      explanationMd:
        "Some problems need **more than one operation** — read carefully to work out what happens first, second, and so on.\n\n" +
        "Before or after solving, it's good practice to **estimate** by rounding the numbers, so you can spot if your exact answer looks wrong.",
      explanationMdFr:
        "Certains problèmes nécessitent **plus d'une opération** — lis attentivement pour comprendre ce qui se passe d'abord, ensuite, et ainsi de suite.\n\n" +
        "Avant ou après avoir résolu, c'est une bonne pratique d'**estimer** en arrondissant les nombres, pour pouvoir repérer si ton résultat exact semble faux.",
      workedExamples: [
        { problem: "A shop had 340 bottles. They received 8 boxes of 24 bottles, then sold 95. How many bottles are left?", steps: ["8 x 24 = 192.", "340 + 192 = 532.", "532 - 95 = 437."], answer: "437" },
        { problem: "Estimate 812 x 48 by rounding first.", steps: ["812 rounds to 800.", "48 rounds to 50."], answer: "40,000" }
      ],
      workedExamplesFr: [
        { problem: "Un magasin avait 340 bouteilles. Il a reçu 8 boîtes de 24 bouteilles, puis en a vendu 95. Combien de bouteilles reste-t-il ?", steps: ["8 x 24 = 192.", "340 + 192 = 532.", "532 - 95 = 437."], answer: "437" },
        { problem: "Estime 812 x 48 en arrondissant d'abord.", steps: ["812 s'arrondit à 800.", "48 s'arrondit à 50."], answer: "40 000" }
      ],
      audioScript: "Break a multi-step problem down one operation at a time, and use a rounded estimate to sanity-check your final answer.",
      audioScriptFr: "Décompose un problème à plusieurs étapes une opération à la fois, et utilise une estimation arrondie pour vérifier ton résultat final."
    }
  ],
  Y7L2: [
    {
      order: 1,
      title: "The four operations with integers, fractions and decimals",
      titleFr: "Les quatre opérations avec entiers, fractions et décimaux",
      concept: "Applying addition, subtraction, multiplication and division across number types",
      conceptFr: "Appliquer l'addition, la soustraction, la multiplication et la division à tous les types de nombres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L2-1"],
      explanationMd:
        "The same four operations work on whole numbers, decimals and fractions — only the bookkeeping changes.\n\n" +
        "With decimals, multiply as if the numbers were whole, then count the decimal places to place the point. With fractions that share a denominator, work on the numerators.",
      explanationMdFr:
        "Les quatre mêmes opérations fonctionnent avec les entiers, les décimaux et les fractions — seule la mise en forme change.\n\n" +
        "Avec les décimaux, multiplie comme s'il s'agissait d'entiers, puis compte les décimales pour placer la virgule. Avec des fractions de même dénominateur, travaille sur les numérateurs.",
      workedExamples: [
        { problem: "Work out 3.4 x 6", steps: ["34 x 6 = 204.", "There is one decimal place, so 3.4 x 6 = 20.4."], answer: "20.4" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 3,4 x 6", steps: ["34 x 6 = 204.", "Il y a une décimale, donc 3,4 x 6 = 20,4."], answer: "20,4" }
      ],
      audioScript: "Multiply as whole numbers first, then put the decimal point back where it belongs.",
      audioScriptFr: "Multiplie d'abord comme des entiers, puis remets la virgule à sa place."
    },
    {
      order: 2,
      title: "Order of operations (BIDMAS)",
      titleFr: "Priorité des opérations",
      concept: "Using the conventional priority of operations to evaluate expressions",
      conceptFr: "Utiliser la priorité conventionnelle des opérations pour évaluer des expressions",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L2-2"],
      explanationMd:
        "Calculations follow a fixed order: **B**rackets, **I**ndices, **D**ivision and **M**ultiplication, then **A**ddition and **S**ubtraction.\n\n" +
        "Working left to right without this order gives the wrong answer — 3 + 4 x 5 is 23, not 35.",
      explanationMdFr:
        "Les calculs suivent un ordre fixe : **parenthèses**, **puissances**, **division** et **multiplication**, puis **addition** et **soustraction**.\n\n" +
        "Calculer de gauche à droite sans respecter cet ordre donne un résultat faux — 3 + 4 x 5 fait 23, pas 35.",
      workedExamples: [
        { problem: "Work out 3 + 4 x 5", steps: ["Multiplication first: 4 x 5 = 20.", "Then add: 3 + 20 = 23."], answer: "23" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 3 + 4 x 5", steps: ["La multiplication d'abord : 4 x 5 = 20.", "Puis additionne : 3 + 20 = 23."], answer: "23" }
      ],
      audioScript: "Brackets first, then indices, then divide and multiply, and finally add and subtract.",
      audioScriptFr: "Les parenthèses d'abord, puis les puissances, puis la division et la multiplication, et enfin l'addition et la soustraction."
    },
    {
      order: 3,
      title: "Using a calculator and interpreting the display",
      titleFr: "Utiliser une calculatrice et interpréter l'affichage",
      concept: "Entering calculations correctly and rounding the result sensibly",
      conceptFr: "Saisir les calculs correctement et arrondir le résultat de façon sensée",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L2-3"],
      explanationMd:
        "A calculator does exactly what you type — so the order you enter things matters just as much as BIDMAS on paper.\n\n" +
        "The display often shows more decimal places than the question needs. Round to a sensible degree of accuracy and state the units.",
      explanationMdFr:
        "Une calculatrice fait exactement ce que tu tapes — l'ordre de saisie compte donc autant que la priorité des opérations sur papier.\n\n" +
        "L'affichage montre souvent plus de décimales que nécessaire. Arrondis à une précision raisonnable et précise les unités.",
      workedExamples: [
        { problem: "A calculator shows 7.48. Round to 1 decimal place.", steps: ["Look at the second decimal place: 8.", "8 is 5 or more, so round up."], answer: "7.5" }
      ],
      workedExamplesFr: [
        { problem: "Une calculatrice affiche 7,48. Arrondis à 1 décimale.", steps: ["Regarde la deuxième décimale : 8.", "8 est supérieur ou égal à 5, donc on arrondit vers le haut."], answer: "7,5" }
      ],
      audioScript: "Check what you typed, then round the answer to a sensible accuracy.",
      audioScriptFr: "Vérifie ce que tu as tapé, puis arrondis le résultat à une précision raisonnable."
    }
  ],
  Y7L3: [
    {
      order: 1,
      title: "Simplifying fractions",
      titleFr: "Simplifier les fractions",
      concept: "Dividing numerator and denominator by their highest common factor",
      conceptFr: "Diviser le numérateur et le dénominateur par leur plus grand facteur commun",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L3-1"],
      explanationMd:
        "A fraction is in its simplest form when the numerator and denominator share no common factor except 1.\n\n" +
        "To simplify, divide both by their highest common factor. The value of the fraction never changes — only how it is written.",
      explanationMdFr:
        "Une fraction est sous sa forme la plus simple quand le numérateur et le dénominateur n'ont aucun facteur commun autre que 1.\n\n" +
        "Pour simplifier, divise les deux par leur plus grand facteur commun. La valeur de la fraction ne change jamais — seule son écriture change.",
      workedExamples: [
        { problem: "Simplify 12/18", steps: ["The highest common factor of 12 and 18 is 6.", "12 ÷ 6 = 2 and 18 ÷ 6 = 3."], answer: "2/3" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie 12/18", steps: ["Le plus grand facteur commun de 12 et 18 est 6.", "12 ÷ 6 = 2 et 18 ÷ 6 = 3."], answer: "2/3" }
      ],
      audioScript: "Find the highest common factor, then divide the top and the bottom by it.",
      audioScriptFr: "Trouve le plus grand facteur commun, puis divise le haut et le bas par ce nombre."
    },
    {
      order: 2,
      title: "Calculating with fractions and mixed numbers",
      titleFr: "Calculer avec des fractions et des nombres mixtes",
      concept: "Adding, subtracting, multiplying and dividing fractions",
      conceptFr: "Additionner, soustraire, multiplier et diviser des fractions",
      representation: "abstract",
      visualAid: "fraction-diagram",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L3-2"],
      explanationMd:
        "When denominators match, add or subtract the numerators and keep the denominator.\n\n" +
        "To multiply a fraction by a whole number, multiply the numerator only. To divide a fraction by a whole number, divide the numerator (or multiply the denominator).",
      explanationMdFr:
        "Quand les dénominateurs sont identiques, additionne ou soustrais les numérateurs et garde le dénominateur.\n\n" +
        "Pour multiplier une fraction par un entier, multiplie seulement le numérateur. Pour diviser une fraction par un entier, divise le numérateur (ou multiplie le dénominateur).",
      workedExamples: [
        { problem: "Work out 3/8 + 2/8", steps: ["The denominators match.", "3 + 2 = 5, so the answer is 5/8."], answer: "5/8" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 3/8 + 2/8", steps: ["Les dénominateurs sont identiques.", "3 + 2 = 5, donc le résultat est 5/8."], answer: "5/8" }
      ],
      audioScript: "Same denominators? Just work with the numerators.",
      audioScriptFr: "Mêmes dénominateurs ? Travaille simplement avec les numérateurs."
    },
    {
      order: 3,
      title: "Fractions as operators",
      titleFr: "Les fractions comme opérateurs",
      concept: "Finding a fraction of an amount",
      conceptFr: "Trouver une fraction d'une quantité",
      representation: "pictorial",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L3-3"],
      explanationMd:
        "A fraction can act on a quantity: 3/5 of 40 means split 40 into 5 equal parts, then take 3 of them.\n\n" +
        "Divide by the denominator first, then multiply by the numerator.",
      explanationMdFr:
        "Une fraction peut agir sur une quantité : 3/5 de 40 signifie partager 40 en 5 parts égales, puis en prendre 3.\n\n" +
        "Divise d'abord par le dénominateur, puis multiplie par le numérateur.",
      workedExamples: [
        { problem: "Find 3/5 of 40", steps: ["40 ÷ 5 = 8.", "8 x 3 = 24."], answer: "24" }
      ],
      workedExamplesFr: [
        { problem: "Trouve 3/5 de 40", steps: ["40 ÷ 5 = 8.", "8 x 3 = 24."], answer: "24" }
      ],
      audioScript: "Divide by the bottom number, then multiply by the top number.",
      audioScriptFr: "Divise par le nombre du bas, puis multiplie par celui du haut."
    }
  ],
  Y7L4: [
    {
      order: 1,
      title: "Fractions, decimals and percentages",
      titleFr: "Fractions, décimaux et pourcentages",
      concept: "Converting fluently between the three representations",
      conceptFr: "Convertir couramment entre les trois représentations",
      representation: "abstract",
      visualAid: "fraction-diagram",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L4-1"],
      explanationMd:
        "Fractions, decimals and percentages are three ways of writing the same value.\n\n" +
        "To get a percentage from a fraction, scale the fraction so the denominator is 100. To get a decimal from a percentage, divide by 100.",
      explanationMdFr:
        "Les fractions, les décimaux et les pourcentages sont trois façons d'écrire la même valeur.\n\n" +
        "Pour obtenir un pourcentage à partir d'une fraction, ramène le dénominateur à 100. Pour obtenir un décimal à partir d'un pourcentage, divise par 100.",
      workedExamples: [
        { problem: "Write 7/20 as a percentage", steps: ["20 x 5 = 100, so multiply top and bottom by 5.", "7 x 5 = 35, giving 35/100."], answer: "35%" }
      ],
      workedExamplesFr: [
        { problem: "Écris 7/20 en pourcentage", steps: ["20 x 5 = 100, donc multiplie le haut et le bas par 5.", "7 x 5 = 35, soit 35/100."], answer: "35 %" }
      ],
      audioScript: "Scale the fraction so the bottom is one hundred, and you can read the percentage straight off.",
      audioScriptFr: "Ramène le dénominateur à cent, et tu peux lire le pourcentage directement."
    },
    {
      order: 2,
      title: "Percentage increase and decrease",
      titleFr: "Augmentation et diminution en pourcentage",
      concept: "Changing an amount by a given percentage",
      conceptFr: "Modifier une quantité d'un pourcentage donné",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L4-2"],
      explanationMd:
        "To increase by a percentage, work out the percentage of the amount and add it on. To decrease, subtract it instead.\n\n" +
        "Finding 1% first (divide by 100) makes any percentage easy to build up.",
      explanationMdFr:
        "Pour augmenter d'un pourcentage, calcule ce pourcentage de la quantité et ajoute-le. Pour diminuer, soustrais-le.\n\n" +
        "Trouver d'abord 1 % (diviser par 100) permet de construire facilement n'importe quel pourcentage.",
      workedExamples: [
        { problem: "Increase 400 by 15%", steps: ["1% of 400 = 4.", "15% = 4 x 15 = 60.", "400 + 60 = 460."], answer: "460" }
      ],
      workedExamplesFr: [
        { problem: "Augmente 400 de 15 %", steps: ["1 % de 400 = 4.", "15 % = 4 x 15 = 60.", "400 + 60 = 460."], answer: "460" }
      ],
      audioScript: "Find one percent first, then build up to the percentage you need.",
      audioScriptFr: "Trouve d'abord un pour cent, puis construis le pourcentage dont tu as besoin."
    },
    {
      order: 3,
      title: "Percentage as parts per hundred",
      titleFr: "Le pourcentage comme parties par centaine",
      concept: "Expressing one quantity as a percentage of another",
      conceptFr: "Exprimer une quantité en pourcentage d'une autre",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L4-3"],
      explanationMd:
        "'Per cent' literally means 'per hundred', so 37% means 37 parts out of every 100.\n\n" +
        "To express one quantity as a percentage of another, divide the part by the whole, then multiply by 100.",
      explanationMdFr:
        "« Pour cent » signifie littéralement « pour cent », donc 37 % signifie 37 parties sur 100.\n\n" +
        "Pour exprimer une quantité en pourcentage d'une autre, divise la partie par le tout, puis multiplie par 100.",
      workedExamples: [
        { problem: "What percentage is 9 out of 20?", steps: ["9 ÷ 20 = 0.45.", "0.45 x 100 = 45."], answer: "45%" }
      ],
      workedExamplesFr: [
        { problem: "Quel pourcentage représente 9 sur 20 ?", steps: ["9 ÷ 20 = 0,45.", "0,45 x 100 = 45."], answer: "45 %" }
      ],
      audioScript: "Divide the part by the whole, then multiply by one hundred.",
      audioScriptFr: "Divise la partie par le tout, puis multiplie par cent."
    }
  ],
  Y7L5: [
    {
      order: 1,
      title: "Ratio notation and simplest form",
      titleFr: "Notation des rapports et forme la plus simple",
      concept: "Writing and simplifying ratios",
      conceptFr: "Écrire et simplifier des rapports",
      representation: "pictorial",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L5-1"],
      explanationMd:
        "A ratio compares quantities, written with a colon: 3:2 means 3 parts of one thing to 2 of another.\n\n" +
        "Just like fractions, ratios simplify by dividing every part by the same common factor.",
      explanationMdFr:
        "Un rapport compare des quantités, écrit avec deux points : 3:2 signifie 3 parts d'une chose pour 2 d'une autre.\n\n" +
        "Comme les fractions, les rapports se simplifient en divisant chaque terme par le même facteur commun.",
      workedExamples: [
        { problem: "Simplify 12:18", steps: ["Both divide by 6.", "12 ÷ 6 = 2 and 18 ÷ 6 = 3."], answer: "2:3" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie 12:18", steps: ["Les deux se divisent par 6.", "12 ÷ 6 = 2 et 18 ÷ 6 = 3."], answer: "2:3" }
      ],
      audioScript: "Divide both sides of the ratio by their highest common factor.",
      audioScriptFr: "Divise les deux termes du rapport par leur plus grand facteur commun."
    },
    {
      order: 2,
      title: "Dividing a quantity in a given ratio",
      titleFr: "Partager une quantité selon un rapport donné",
      concept: "Sharing a total into parts given by a ratio",
      conceptFr: "Partager un total en parts données par un rapport",
      representation: "pictorial",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L5-2"],
      explanationMd:
        "Add the ratio parts to find how many equal shares there are, divide the total by that, then multiply back up for each share.\n\n" +
        "Always check your shares add back up to the original total.",
      explanationMdFr:
        "Additionne les termes du rapport pour trouver le nombre de parts égales, divise le total par ce nombre, puis multiplie pour chaque part.\n\n" +
        "Vérifie toujours que la somme des parts redonne le total de départ.",
      workedExamples: [
        { problem: "Share 45 in the ratio 2:3", steps: ["2 + 3 = 5 parts.", "45 ÷ 5 = 9 per part.", "2 x 9 = 18 and 3 x 9 = 27."], answer: "18 and 27" }
      ],
      workedExamplesFr: [
        { problem: "Partage 45 dans le rapport 2:3", steps: ["2 + 3 = 5 parts.", "45 ÷ 5 = 9 par part.", "2 x 9 = 18 et 3 x 9 = 27."], answer: "18 et 27" }
      ],
      audioScript: "Add the parts, divide the total, then multiply for each share.",
      audioScriptFr: "Additionne les parts, divise le total, puis multiplie pour chaque part."
    },
    {
      order: 3,
      title: "Scale factors, diagrams and maps",
      titleFr: "Facteurs d'échelle, schémas et cartes",
      concept: "Using scale factors to enlarge lengths and read maps",
      conceptFr: "Utiliser les facteurs d'échelle pour agrandir des longueurs et lire des cartes",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L5-3"],
      explanationMd:
        "A scale factor multiplies every length in a shape. A scale factor of 3 makes each side three times longer.\n\n" +
        "Map scales work the same way: 1:25000 means 1 cm on the map is 25,000 cm in real life.",
      explanationMdFr:
        "Un facteur d'échelle multiplie chaque longueur d'une forme. Un facteur d'échelle de 3 rend chaque côté trois fois plus long.\n\n" +
        "Les échelles de cartes fonctionnent de la même façon : 1:25000 signifie que 1 cm sur la carte représente 25 000 cm en réalité.",
      workedExamples: [
        { problem: "A 7 cm side is enlarged by scale factor 4. How long is it now?", steps: ["7 x 4 = 28."], answer: "28 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un côté de 7 cm est agrandi avec un facteur d'échelle de 4. Combien mesure-t-il maintenant ?", steps: ["7 x 4 = 28."], answer: "28 cm" }
      ],
      audioScript: "Multiply every length by the scale factor.",
      audioScriptFr: "Multiplie chaque longueur par le facteur d'échelle."
    }
  ],
  Y7L6: [
    {
      order: 1,
      title: "Algebraic notation",
      titleFr: "La notation algébrique",
      concept: "Using letters for numbers and the convention of omitting multiplication signs",
      conceptFr: "Utiliser des lettres pour les nombres et la convention d'omettre le signe de multiplication",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L6-1"],
      explanationMd:
        "In algebra a letter stands for a number that can vary. We write 5n rather than 5 x n — the multiplication sign is left out.\n\n" +
        "The number in front of the letter is called the **coefficient**.",
      explanationMdFr:
        "En algèbre, une lettre représente un nombre qui peut varier. On écrit 5n plutôt que 5 x n — le signe de multiplication est omis.\n\n" +
        "Le nombre devant la lettre s'appelle le **coefficient**.",
      workedExamples: [
        { problem: "Write 'n multiplied by 7' in algebra", steps: ["Write the number first.", "Leave out the multiplication sign."], answer: "7n" }
      ],
      workedExamplesFr: [
        { problem: "Écris « n multiplié par 7 » en algèbre", steps: ["Écris d'abord le nombre.", "Omets le signe de multiplication."], answer: "7n" }
      ],
      audioScript: "Number first, letter second, and no multiplication sign between them.",
      audioScriptFr: "Le nombre d'abord, la lettre ensuite, et aucun signe de multiplication entre les deux."
    },
    {
      order: 2,
      title: "Collecting like terms",
      titleFr: "Regrouper les termes semblables",
      concept: "Simplifying expressions by combining terms with the same letter",
      conceptFr: "Simplifier des expressions en combinant les termes avec la même lettre",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L6-2"],
      explanationMd:
        "Only terms with exactly the same letter can be combined: 3x and 5x make 8x, but 3x and 5y stay separate.\n\n" +
        "Add or subtract the coefficients; the letter itself does not change.",
      explanationMdFr:
        "Seuls les termes ayant exactement la même lettre peuvent être combinés : 3x et 5x font 8x, mais 3x et 5y restent séparés.\n\n" +
        "Additionne ou soustrais les coefficients ; la lettre elle-même ne change pas.",
      workedExamples: [
        { problem: "Simplify 4x + 3y + 6x", steps: ["Combine the x terms: 4x + 6x = 10x.", "The 3y has no partner."], answer: "10x + 3y" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie 4x + 3y + 6x", steps: ["Combine les termes en x : 4x + 6x = 10x.", "Le 3y n'a pas de partenaire."], answer: "10x + 3y" }
      ],
      audioScript: "Same letter? Combine them. Different letters? Leave them apart.",
      audioScriptFr: "Même lettre ? Combine-les. Lettres différentes ? Laisse-les séparées."
    },
    {
      order: 3,
      title: "Substituting into formulae",
      titleFr: "Substituer dans des formules",
      concept: "Replacing letters with numbers and evaluating",
      conceptFr: "Remplacer les lettres par des nombres et calculer",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L6-3"],
      explanationMd:
        "To substitute, replace each letter with its given value, then calculate using the normal order of operations.\n\n" +
        "Watch out: 3x with x = 4 means 3 x 4 = 12, not 34.",
      explanationMdFr:
        "Pour substituer, remplace chaque lettre par sa valeur donnée, puis calcule en respectant la priorité des opérations.\n\n" +
        "Attention : 3x avec x = 4 signifie 3 x 4 = 12, et non 34.",
      workedExamples: [
        { problem: "Find 3x + 5 when x = 4", steps: ["3 x 4 = 12.", "12 + 5 = 17."], answer: "17" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 3x + 5 quand x = 4", steps: ["3 x 4 = 12.", "12 + 5 = 17."], answer: "17" }
      ],
      audioScript: "Swap the letter for its value, then follow the order of operations.",
      audioScriptFr: "Remplace la lettre par sa valeur, puis respecte la priorité des opérations."
    }
  ],
  Y7L7: [
    {
      order: 1,
      title: "Expressions, equations and vocabulary",
      titleFr: "Expressions, équations et vocabulaire",
      concept: "Distinguishing terms, expressions, equations and factors",
      conceptFr: "Distinguer termes, expressions, équations et facteurs",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L7-1"],
      explanationMd:
        "A **term** is a single number or letter (or letters and numbers multiplied). An **expression** is terms joined by + or -, with no equals sign. An **equation** says two expressions are equal.\n\n" +
        "Getting the vocabulary right makes instructions in questions much clearer.",
      explanationMdFr:
        "Un **terme** est un seul nombre ou une lettre (ou des lettres et nombres multipliés). Une **expression** est un ensemble de termes reliés par + ou -, sans signe égal. Une **équation** affirme que deux expressions sont égales.\n\n" +
        "Maîtriser le vocabulaire rend les consignes bien plus claires.",
      workedExamples: [
        { problem: "Is 4x + 7 an expression or an equation?", steps: ["Look for an equals sign.", "There isn't one."], answer: "An expression" }
      ],
      workedExamplesFr: [
        { problem: "4x + 7 est-il une expression ou une équation ?", steps: ["Cherche un signe égal.", "Il n'y en a pas."], answer: "Une expression" }
      ],
      audioScript: "No equals sign means it is an expression, not an equation.",
      audioScriptFr: "Pas de signe égal signifie que c'est une expression, pas une équation."
    },
    {
      order: 2,
      title: "Solving linear equations",
      titleFr: "Résoudre des équations linéaires",
      concept: "Using inverse operations to find an unknown",
      conceptFr: "Utiliser les opérations inverses pour trouver une inconnue",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L7-2"],
      explanationMd:
        "Keep an equation balanced: whatever you do to one side, do to the other.\n\n" +
        "Undo the addition or subtraction first, then undo the multiplication or division. If the unknown appears on both sides, collect the letter terms on one side first.",
      explanationMdFr:
        "Garde l'équation équilibrée : ce que tu fais d'un côté, fais-le de l'autre.\n\n" +
        "Annule d'abord l'addition ou la soustraction, puis la multiplication ou la division. Si l'inconnue apparaît des deux côtés, regroupe d'abord les termes en lettres d'un seul côté.",
      workedExamples: [
        { problem: "Solve 4x + 5 = 29", steps: ["29 - 5 = 24.", "24 ÷ 4 = 6."], answer: "x = 6" }
      ],
      workedExamplesFr: [
        { problem: "Résous 4x + 5 = 29", steps: ["29 - 5 = 24.", "24 ÷ 4 = 6."], answer: "x = 6" }
      ],
      audioScript: "Undo the plus first, then undo the times.",
      audioScriptFr: "Annule d'abord l'addition, puis la multiplication."
    },
    {
      order: 3,
      title: "Generating sequences",
      titleFr: "Générer des suites",
      concept: "Using term-to-term and position-to-term rules",
      conceptFr: "Utiliser les règles de terme en terme et de rang en terme",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L7-3"],
      explanationMd:
        "A **term-to-term** rule tells you how to get from one term to the next, such as 'add 4'.\n\n" +
        "A **position-to-term** rule (the nth term) gives any term directly: for 3n + 2, the 10th term is 3 x 10 + 2 = 32.",
      explanationMdFr:
        "Une règle **de terme en terme** indique comment passer d'un terme au suivant, par exemple « ajouter 4 ».\n\n" +
        "Une règle **de rang en terme** (le terme général) donne directement n'importe quel terme : pour 3n + 2, le 10e terme est 3 x 10 + 2 = 32.",
      workedExamples: [
        { problem: "The nth term is 5n - 1. Find the 6th term.", steps: ["5 x 6 = 30.", "30 - 1 = 29."], answer: "29" }
      ],
      workedExamplesFr: [
        { problem: "Le terme général est 5n - 1. Trouve le 6e terme.", steps: ["5 x 6 = 30.", "30 - 1 = 29."], answer: "29" }
      ],
      audioScript: "Substitute the position number into the rule to jump straight to any term.",
      audioScriptFr: "Remplace n par le rang dans la règle pour obtenir directement n'importe quel terme."
    }
  ],
  Y7L8: [
    {
      order: 1,
      title: "Angles in triangles and other shapes",
      titleFr: "Les angles dans les triangles et autres formes",
      concept: "Using the angle sum of a triangle to deduce missing angles",
      conceptFr: "Utiliser la somme des angles d'un triangle pour déduire des angles manquants",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L8-1"],
      explanationMd:
        "The angles inside any triangle always add to 180°. Quadrilaterals always add to 360°.\n\n" +
        "These facts let you find a missing angle by subtracting the ones you know.",
      explanationMdFr:
        "Les angles intérieurs de tout triangle font toujours 180°. Ceux des quadrilatères font toujours 360°.\n\n" +
        "Ces faits permettent de trouver un angle manquant en soustrayant ceux que tu connais.",
      workedExamples: [
        { problem: "A triangle has angles 50° and 70°. Find the third.", steps: ["50 + 70 = 120.", "180 - 120 = 60."], answer: "60°" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle a des angles de 50° et 70°. Trouve le troisième.", steps: ["50 + 70 = 120.", "180 - 120 = 60."], answer: "60°" }
      ],
      audioScript: "Triangles always total one hundred and eighty degrees.",
      audioScriptFr: "Les triangles font toujours cent quatre-vingts degrés au total."
    },
    {
      order: 2,
      title: "Constructions with ruler and protractor",
      titleFr: "Constructions à la règle et au rapporteur",
      concept: "Using standard conventions to construct and classify shapes",
      conceptFr: "Utiliser les conventions standard pour construire et classer des formes",
      representation: "concrete",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L8-2"],
      explanationMd:
        "Use a ruler for lengths, a protractor for angles and compasses for arcs of a fixed radius.\n\n" +
        "Classify triangles by their largest angle: exactly 90° is right-angled, more than 90° is obtuse, all less than 90° is acute.",
      explanationMdFr:
        "Utilise une règle pour les longueurs, un rapporteur pour les angles et un compas pour les arcs de rayon fixe.\n\n" +
        "Classe les triangles selon leur plus grand angle : exactement 90° = rectangle, plus de 90° = obtusangle, tous inférieurs à 90° = acutangle.",
      workedExamples: [
        { problem: "A triangle has angles 100°, 50° and 30°. What type is it?", steps: ["The largest angle is 100°.", "100° is more than 90°."], answer: "Obtuse" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle a des angles de 100°, 50° et 30°. De quel type est-il ?", steps: ["Le plus grand angle est 100°.", "100° est supérieur à 90°."], answer: "Obtusangle" }
      ],
      audioScript: "Check the largest angle to name the triangle.",
      audioScriptFr: "Regarde le plus grand angle pour nommer le triangle."
    },
    {
      order: 3,
      title: "Angle facts at lines and points",
      titleFr: "Faits sur les angles aux droites et aux points",
      concept: "Angles on a straight line, around a point and vertically opposite",
      conceptFr: "Angles sur une droite, autour d'un point et opposés par le sommet",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L8-3"],
      explanationMd:
        "Angles on a straight line add to 180°. Angles around a point add to 360°. When two straight lines cross, vertically opposite angles are equal.\n\n" +
        "These three facts solve a huge number of angle problems.",
      explanationMdFr:
        "Les angles sur une droite font 180°. Les angles autour d'un point font 360°. Quand deux droites se croisent, les angles opposés par le sommet sont égaux.\n\n" +
        "Ces trois faits résolvent un très grand nombre de problèmes d'angles.",
      workedExamples: [
        { problem: "An angle on a straight line is 115°. Find the other.", steps: ["180 - 115 = 65."], answer: "65°" }
      ],
      workedExamplesFr: [
        { problem: "Un angle sur une droite mesure 115°. Trouve l'autre.", steps: ["180 - 115 = 65."], answer: "65°" }
      ],
      audioScript: "Straight line, one hundred and eighty. Full point, three hundred and sixty.",
      audioScriptFr: "Ligne droite, cent quatre-vingts. Tour complet, trois cent soixante."
    }
  ],
  Y7L9: [
    {
      order: 1,
      title: "Area of triangles, parallelograms and trapezia",
      titleFr: "Aire des triangles, parallélogrammes et trapèzes",
      concept: "Deriving and applying area formulae",
      conceptFr: "Établir et appliquer les formules d'aire",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L9-1"],
      explanationMd:
        "A parallelogram has area base x height. A triangle is half of a parallelogram, so its area is (base x height) ÷ 2.\n\n" +
        "A trapezium uses the average of the two parallel sides: ((a + b) ÷ 2) x height.",
      explanationMdFr:
        "Un parallélogramme a pour aire base x hauteur. Un triangle est la moitié d'un parallélogramme, donc son aire est (base x hauteur) ÷ 2.\n\n" +
        "Un trapèze utilise la moyenne des deux côtés parallèles : ((a + b) ÷ 2) x hauteur.",
      workedExamples: [
        { problem: "Find the area of a triangle with base 12 cm and height 5 cm", steps: ["12 x 5 = 60.", "60 ÷ 2 = 30."], answer: "30 cm²" }
      ],
      workedExamplesFr: [
        { problem: "Trouve l'aire d'un triangle de base 12 cm et de hauteur 5 cm", steps: ["12 x 5 = 60.", "60 ÷ 2 = 30."], answer: "30 cm²" }
      ],
      audioScript: "Triangle area is base times height, divided by two.",
      audioScriptFr: "L'aire d'un triangle est base fois hauteur, divisée par deux."
    },
    {
      order: 2,
      title: "Surface area and volume of cuboids",
      titleFr: "Aire totale et volume des pavés droits",
      concept: "Calculating the space inside and the surface outside a cuboid",
      conceptFr: "Calculer l'espace intérieur et la surface extérieure d'un pavé droit",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L9-2"],
      explanationMd:
        "Volume of a cuboid is length x width x height, measured in cubic units.\n\n" +
        "Surface area adds up all six faces: 2(lw + lh + wh), measured in square units.",
      explanationMdFr:
        "Le volume d'un pavé droit est longueur x largeur x hauteur, mesuré en unités cubes.\n\n" +
        "L'aire totale additionne les six faces : 2(Ll + Lh + lh), mesurée en unités carrées.",
      workedExamples: [
        { problem: "Find the volume of a 4 cm by 3 cm by 5 cm cuboid", steps: ["4 x 3 = 12.", "12 x 5 = 60."], answer: "60 cm³" }
      ],
      workedExamplesFr: [
        { problem: "Trouve le volume d'un pavé droit de 4 cm sur 3 cm sur 5 cm", steps: ["4 x 3 = 12.", "12 x 5 = 60."], answer: "60 cm³" }
      ],
      audioScript: "Volume multiplies all three dimensions together.",
      audioScriptFr: "Le volume multiplie les trois dimensions ensemble."
    },
    {
      order: 3,
      title: "Interpreting and comparing data",
      titleFr: "Interpréter et comparer des données",
      concept: "Using mean, range and charts to compare data sets",
      conceptFr: "Utiliser la moyenne, l'étendue et les graphiques pour comparer des séries de données",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L9-3"],
      explanationMd:
        "The **mean** is the total divided by how many values there are. The **range** is the largest value minus the smallest.\n\n" +
        "On a pie chart, each category's angle is its share of the total multiplied by 360°.",
      explanationMdFr:
        "La **moyenne** est le total divisé par le nombre de valeurs. L'**étendue** est la plus grande valeur moins la plus petite.\n\n" +
        "Sur un diagramme circulaire, l'angle de chaque catégorie est sa part du total multipliée par 360°.",
      workedExamples: [
        { problem: "Find the mean of 4, 8, 10 and 6", steps: ["4 + 8 + 10 + 6 = 28.", "28 ÷ 4 = 7."], answer: "7" }
      ],
      workedExamplesFr: [
        { problem: "Trouve la moyenne de 4, 8, 10 et 6", steps: ["4 + 8 + 10 + 6 = 28.", "28 ÷ 4 = 7."], answer: "7" }
      ],
      audioScript: "Mean is the total shared equally. Range is biggest minus smallest.",
      audioScriptFr: "La moyenne est le total partagé également. L'étendue est la plus grande moins la plus petite."
    }
  ],
  Y7L10: [
    {
      order: 1,
      title: "Number fluency review",
      titleFr: "Révision de l'aisance numérique",
      concept: "Integers, fractions, decimals and percentages together",
      conceptFr: "Entiers, fractions, décimaux et pourcentages réunis",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L10-1"],
      explanationMd:
        "This level mixes everything from Year 7 number work: negative numbers, order of operations, fractions of amounts and percentages.\n\n" +
        "Read each question carefully to spot which technique it needs — the mix is the challenge.",
      explanationMdFr:
        "Ce niveau mélange tout le travail numérique de l'Année 7 : nombres négatifs, priorité des opérations, fractions de quantités et pourcentages.\n\n" +
        "Lis chaque question attentivement pour repérer la technique nécessaire — c'est le mélange qui fait le défi.",
      workedExamples: [
        { problem: "Work out 20% of 350", steps: ["1% of 350 = 3.5.", "3.5 x 20 = 70."], answer: "70" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 20 % de 350", steps: ["1 % de 350 = 3,5.", "3,5 x 20 = 70."], answer: "70" }
      ],
      audioScript: "Spot the technique each question needs, then apply it carefully.",
      audioScriptFr: "Repère la technique dont chaque question a besoin, puis applique-la avec soin."
    },
    {
      order: 2,
      title: "Ratio, algebra and equations review",
      titleFr: "Révision des rapports, de l'algèbre et des équations",
      concept: "Applying ratio, simplification, substitution and equation solving",
      conceptFr: "Appliquer les rapports, la simplification, la substitution et la résolution d'équations",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L10-2"],
      explanationMd:
        "Ratio problems, collecting like terms, substituting into formulae and solving equations all appear here.\n\n" +
        "The same balance principle runs through them: keep both sides of an equation equal, and keep ratio parts in proportion.",
      explanationMdFr:
        "Les problèmes de rapports, le regroupement des termes semblables, la substitution dans des formules et la résolution d'équations apparaissent tous ici.\n\n" +
        "Le même principe d'équilibre les relie : garde les deux côtés d'une équation égaux, et garde les parts d'un rapport proportionnelles.",
      workedExamples: [
        { problem: "Solve 6x + 4 = 34", steps: ["34 - 4 = 30.", "30 ÷ 6 = 5."], answer: "x = 5" }
      ],
      workedExamplesFr: [
        { problem: "Résous 6x + 4 = 34", steps: ["34 - 4 = 30.", "30 ÷ 6 = 5."], answer: "x = 5" }
      ],
      audioScript: "Balance both sides, and undo operations in reverse order.",
      audioScriptFr: "Équilibre les deux côtés, et annule les opérations dans l'ordre inverse."
    },
    {
      order: 3,
      title: "Geometry and statistics review",
      titleFr: "Révision de la géométrie et des statistiques",
      concept: "Angle facts, area, volume and averages together",
      conceptFr: "Faits sur les angles, aires, volumes et moyennes réunis",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L10-3"],
      explanationMd:
        "Angle facts, area and volume formulae and statistical measures all return here, mixed together.\n\n" +
        "Always check your units: lengths in cm, areas in cm², volumes in cm³.",
      explanationMdFr:
        "Les faits sur les angles, les formules d'aire et de volume, et les mesures statistiques reviennent tous ici, mélangés.\n\n" +
        "Vérifie toujours tes unités : longueurs en cm, aires en cm², volumes en cm³.",
      workedExamples: [
        { problem: "A cuboid is 3 cm by 4 cm by 10 cm. Find its volume.", steps: ["3 x 4 = 12.", "12 x 10 = 120."], answer: "120 cm³" }
      ],
      workedExamplesFr: [
        { problem: "Un pavé droit mesure 3 cm sur 4 cm sur 10 cm. Trouve son volume.", steps: ["3 x 4 = 12.", "12 x 10 = 120."], answer: "120 cm³" }
      ],
      audioScript: "Check the units match the kind of measurement you are finding.",
      audioScriptFr: "Vérifie que les unités correspondent au type de mesure que tu cherches."
    }
  ],
  Y8L1: [
    {
      order: 1,
      title: "Powers and roots",
      titleFr: "Les puissances et les racines",
      concept: "Using integer powers (squares, cubes and higher) and their inverse real roots",
      conceptFr: "Utiliser des puissances entières (carrés, cubes et plus) et leurs racines réelles inverses",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L1-1"],
      explanationMd:
        "A **power** tells you how many times to multiply a number by itself. 5^3 (5 cubed) means 5 x 5 x 5 = 125.\n\n" +
        "A **root** undoes a power. The square root of 49 is 7, because 7 x 7 = 49. The cube root of 125 is 5, because 5 x 5 x 5 = 125.",
      explanationMdFr:
        "Une **puissance** t'indique combien de fois multiplier un nombre par lui-même. 5^3 (5 au cube) veut dire 5 x 5 x 5 = 125.\n\n" +
        "Une **racine** annule une puissance. La racine carrée de 49 est 7, car 7 x 7 = 49. La racine cubique de 125 est 5, car 5 x 5 x 5 = 125.",
      workedExamples: [
        { problem: "What is 6^2?", steps: ["6 x 6 = 36."], answer: "36" },
        { problem: "What is the square root of 81?", steps: ["9 x 9 = 81."], answer: "9" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 6^2 ?", steps: ["6 x 6 = 36."], answer: "36" },
        { problem: "Quelle est la racine carrée de 81 ?", steps: ["9 x 9 = 81."], answer: "9" }
      ],
      audioScript: "Powers build a number up by repeated multiplication; roots work backwards to find what was multiplied.",
      audioScriptFr: "Les puissances construisent un nombre par multiplication répétée ; les racines fonctionnent à l'envers pour retrouver ce qui a été multiplié."
    },
    {
      order: 2,
      title: "Inverse operations",
      titleFr: "Les opérations inverses",
      concept: "Recognising how pairs of operations undo each other",
      conceptFr: "Reconnaître comment des paires d'opérations s'annulent mutuellement",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L1-2"],
      explanationMd:
        "Every operation has an **inverse** that undoes it: addition and subtraction undo each other, multiplication and division undo each other, and squaring and square rooting undo each other.\n\n" +
        "You can use an inverse operation to check an answer, or to find a missing number in a calculation.",
      explanationMdFr:
        "Chaque opération a une **inverse** qui l'annule : l'addition et la soustraction s'annulent mutuellement, la multiplication et la division s'annulent mutuellement, et élever au carré et prendre la racine carrée s'annulent mutuellement.\n\n" +
        "Tu peux utiliser une opération inverse pour vérifier un résultat, ou pour trouver un nombre manquant dans un calcul.",
      workedExamples: [
        { problem: "If 8 x 7 = 56, what does 56 ÷ 7 equal?", steps: ["Division undoes multiplication."], answer: "8" },
        { problem: "Solve 15 + ___ = 40.", steps: ["Use subtraction, the inverse of addition: 40 - 15."], answer: "25" }
      ],
      workedExamplesFr: [
        { problem: "Si 8 x 7 = 56, que vaut 56 ÷ 7 ?", steps: ["La division annule la multiplication."], answer: "8" },
        { problem: "Résous 15 + ___ = 40.", steps: ["Utilise la soustraction, l'inverse de l'addition : 40 - 15."], answer: "25" }
      ],
      audioScript: "Whenever you're stuck on a missing number, ask yourself: what's the inverse of this operation?",
      audioScriptFr: "Chaque fois que tu bloques sur un nombre manquant, demande-toi : quelle est l'inverse de cette opération ?"
    },
    {
      order: 3,
      title: "Index laws",
      titleFr: "Les lois des indices",
      concept: "Using the laws of indices to simplify expressions with the same base",
      conceptFr: "Utiliser les lois des indices pour simplifier des expressions ayant la même base",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L1-3"],
      explanationMd:
        "When the base is the same, there are shortcut rules: **multiplying** powers means you **add** the indices, **dividing** means you **subtract** them, and raising a power **to another power** means you **multiply** them.\n\n" +
        "Any non-zero number raised to the power of 0 always equals 1.",
      explanationMdFr:
        "Quand la base est la même, il existe des règles rapides : **multiplier** des puissances signifie **additionner** les indices, **diviser** signifie les **soustraire**, et élever une puissance **à une autre puissance** signifie les **multiplier**.\n\n" +
        "Tout nombre non nul élevé à la puissance 0 vaut toujours 1.",
      workedExamples: [
        { problem: "Simplify 3^4 x 3^2.", steps: ["Add the indices: 4 + 2 = 6."], answer: "3^6" },
        { problem: "Simplify 5^7 ÷ 5^3.", steps: ["Subtract the indices: 7 - 3 = 4."], answer: "5^4" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie 3^4 x 3^2.", steps: ["Additionne les indices : 4 + 2 = 6."], answer: "3^6" },
        { problem: "Simplifie 5^7 ÷ 5^3.", steps: ["Soustrais les indices : 7 - 3 = 4."], answer: "5^4" }
      ],
      audioScript: "Same base: multiplying adds the powers, dividing subtracts them, and a power of a power multiplies them.",
      audioScriptFr: "Même base : multiplier additionne les puissances, diviser les soustrait, et une puissance d'une puissance les multiplie."
    }
  ],
  Y8L2: [
    {
      order: 1,
      title: "Percentage increase and decrease",
      titleFr: "L'augmentation et la diminution en pourcentage",
      concept: "Finding a percentage increase or decrease, and finding what percentage change occurred",
      conceptFr: "Trouver une augmentation ou une diminution en pourcentage, et trouver quel changement en pourcentage a eu lieu",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L2-1"],
      explanationMd:
        "To increase or decrease by a percentage: work out that percentage of the original amount first, then add it on (increase) or take it away (decrease).\n\n" +
        "To find the percentage change itself, divide the change by the original amount, then multiply by 100.",
      explanationMdFr:
        "Pour augmenter ou diminuer d'un pourcentage : calcule d'abord ce pourcentage de la quantité de départ, puis ajoute-le (augmentation) ou retire-le (diminution).\n\n" +
        "Pour trouver le changement en pourcentage lui-même, divise le changement par la quantité de départ, puis multiplie par 100.",
      workedExamples: [
        { problem: "Increase £200 by 15%.", steps: ["15% of 200 = 30.", "200 + 30 = 230."], answer: "£230" },
        { problem: "A price rose from £80 to £100. What percentage increase is this?", steps: ["The increase is £20.", "20 ÷ 80 x 100 = 25."], answer: "25%" }
      ],
      workedExamplesFr: [
        { problem: "Augmente 200 £ de 15 %.", steps: ["15 % de 200 = 30.", "200 + 30 = 230."], answer: "230 £" },
        { problem: "Un prix est passé de 80 £ à 100 £. Quelle augmentation en pourcentage cela représente-t-il ?", steps: ["L'augmentation est de 20 £.", "20 ÷ 80 x 100 = 25."], answer: "25 %" }
      ],
      audioScript: "Always compare the change to the ORIGINAL amount, not the new amount, when finding a percentage change.",
      audioScriptFr: "Compare toujours le changement à la quantité DE DÉPART, pas à la nouvelle quantité, quand tu trouves un changement en pourcentage."
    },
    {
      order: 2,
      title: "Percentages over 100%",
      titleFr: "Les pourcentages supérieurs à 100 %",
      concept: "Understanding that a percentage greater than 100% represents more than the whole original amount",
      conceptFr: "Comprendre qu'un pourcentage supérieur à 100 % représente plus que la quantité de départ entière",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L2-2"],
      explanationMd:
        "A percentage over 100% means more than the whole amount — 150% of something is one and a half times as much.\n\n" +
        "You can convert between a percentage over 100% and a decimal the same way as any other percentage: divide by 100.",
      explanationMdFr:
        "Un pourcentage supérieur à 100 % signifie plus que la quantité entière — 150 % de quelque chose, c'est une fois et demie plus.\n\n" +
        "Tu peux convertir entre un pourcentage supérieur à 100 % et un décimal de la même façon que n'importe quel autre pourcentage : divise par 100.",
      workedExamples: [
        { problem: "Write 175% as a decimal.", steps: ["175 ÷ 100 = 1.75."], answer: "1.75" },
        { problem: "What is 120% of 50?", steps: ["120% = 1.2.", "1.2 x 50 = 60."], answer: "60" }
      ],
      workedExamplesFr: [
        { problem: "Écris 175 % sous forme de décimal.", steps: ["175 ÷ 100 = 1,75."], answer: "1,75" },
        { problem: "Que vaut 120 % de 50 ?", steps: ["120 % = 1,2.", "1,2 x 50 = 60."], answer: "60" }
      ],
      audioScript: "Don't be thrown by percentages bigger than 100% — the method for finding them is exactly the same, just with a bigger multiplier.",
      audioScriptFr: "Ne te laisse pas déstabiliser par des pourcentages supérieurs à 100 % — la méthode pour les trouver est exactement la même, juste avec un multiplicateur plus grand."
    },
    {
      order: 3,
      title: "Fractions and percentages of amounts",
      titleFr: "Les fractions et les pourcentages de quantités",
      concept: "Finding a fraction or a percentage of an amount, and working backwards to find the whole",
      conceptFr: "Trouver une fraction ou un pourcentage d'une quantité, et remonter pour trouver le tout",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L2-3"],
      explanationMd:
        "To find a fraction of an amount, divide by the denominator, then multiply by the numerator. To find a percentage of an amount, divide by 100, then multiply by the percentage.\n\n" +
        "You can also work backwards: if you know a part and the fraction or percentage it represents, you can find the whole amount.",
      explanationMdFr:
        "Pour trouver une fraction d'une quantité, divise par le dénominateur, puis multiplie par le numérateur. Pour trouver un pourcentage d'une quantité, divise par 100, puis multiplie par le pourcentage.\n\n" +
        "Tu peux aussi remonter : si tu connais une partie et la fraction ou le pourcentage qu'elle représente, tu peux trouver la quantité entière.",
      workedExamples: [
        { problem: "What is 3/5 of 40?", steps: ["40 ÷ 5 = 8.", "8 x 3 = 24."], answer: "24" },
        { problem: "20% of a number is 14. What is the number?", steps: ["14 ÷ 20 = 0.7.", "0.7 x 100 = 70."], answer: "70" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 3/5 de 40 ?", steps: ["40 ÷ 5 = 8.", "8 x 3 = 24."], answer: "24" },
        { problem: "20 % d'un nombre valent 14. Quel est ce nombre ?", steps: ["14 ÷ 20 = 0,7.", "0,7 x 100 = 70."], answer: "70" }
      ],
      audioScript: "Whichever direction you're working — finding the part, or finding the whole — divide first, then multiply.",
      audioScriptFr: "Quelle que soit la direction dans laquelle tu travailles — trouver la partie ou trouver le tout — divise d'abord, puis multiplie."
    }
  ],
  Y9L1: [
    {
      order: 1,
      title: "Standard form",
      titleFr: "La notation scientifique",
      concept: "Writing very large or very small numbers as A x 10^n",
      conceptFr: "Écrire des nombres très grands ou très petits sous la forme A x 10^n",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L1-1"],
      explanationMd:
        "**Standard form** writes a number as A x 10^n, where A is between 1 and 10 (but never 10 itself), and n tells you how many places to move the decimal point.\n\n" +
        "It's especially useful for very large numbers (like the distance to a star) or very small ones, without writing lots of zeros.",
      explanationMdFr:
        "La **notation scientifique** écrit un nombre sous la forme A x 10^n, où A est compris entre 1 et 10 (mais jamais 10 lui-même), et n indique de combien de positions déplacer la virgule.\n\n" +
        "Elle est particulièrement utile pour des nombres très grands (comme la distance jusqu'à une étoile) ou très petits, sans avoir à écrire beaucoup de zéros.",
      workedExamples: [
        { problem: "Write 4.5 x 10^6 as an ordinary number.", steps: ["Move the decimal point 6 places right."], answer: "4,500,000" },
        { problem: "Write 730,000 in standard form.", steps: ["The first non-zero digit is 7.", "Count how many places the point moves: 5."], answer: "7.3 x 10^5" }
      ],
      workedExamplesFr: [
        { problem: "Écris 4,5 x 10^6 sous forme de nombre ordinaire.", steps: ["Déplace la virgule de 6 positions vers la droite."], answer: "4 500 000" },
        { problem: "Écris 730 000 en notation scientifique.", steps: ["Le premier chiffre non nul est 7.", "Compte de combien de positions la virgule se déplace : 5."], answer: "7,3 x 10^5" }
      ],
      audioScript: "The mantissa is always a number from 1 up to (but not including) 10 — that's the rule that makes standard form work.",
      audioScriptFr: "La mantisse est toujours un nombre compris entre 1 et 10 (sans jamais atteindre 10) — c'est la règle qui fait fonctionner la notation scientifique."
    },
    {
      order: 2,
      title: "Index laws with negative and fractional indices",
      titleFr: "Les lois des indices avec des indices négatifs et fractionnaires",
      concept: "Extending the index laws to negative indices (reciprocals) and fractional indices (roots)",
      conceptFr: "Étendre les lois des indices aux indices négatifs (inverses) et aux indices fractionnaires (racines)",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L1-2"],
      explanationMd:
        "A **negative index** means 'one over': a^-n = 1/(a^n). A **fractional index** means 'take a root': a^(1/2) is the square root of a, and a^(1/3) is the cube root.\n\n" +
        "The same laws you know for whole-number powers (add when multiplying, subtract when dividing) still apply.",
      explanationMdFr:
        "Un **indice négatif** signifie « un sur » : a^-n = 1/(a^n). Un **indice fractionnaire** signifie « prendre une racine » : a^(1/2) est la racine carrée de a, et a^(1/3) est la racine cubique.\n\n" +
        "Les mêmes lois que tu connais pour les puissances entières (additionner en multipliant, soustraire en divisant) s'appliquent toujours.",
      workedExamples: [
        { problem: "Write 2^-3 as a fraction.", steps: ["2^-3 = 1/2^3 = 1/8."], answer: "1/8" },
        { problem: "What is 27^(1/3)?", steps: ["This means the cube root of 27.", "3 x 3 x 3 = 27."], answer: "3" }
      ],
      workedExamplesFr: [
        { problem: "Écris 2^-3 sous forme de fraction.", steps: ["2^-3 = 1/2^3 = 1/8."], answer: "1/8" },
        { problem: "Que vaut 27^(1/3) ?", steps: ["Cela signifie la racine cubique de 27.", "3 x 3 x 3 = 27."], answer: "3" }
      ],
      audioScript: "Negative means 'flip it into a fraction'; a fractional power means 'take that root' instead of multiplying.",
      audioScriptFr: "Négatif veut dire « transformer en fraction » ; une puissance fractionnaire veut dire « prendre cette racine » au lieu de multiplier."
    },
    {
      order: 3,
      title: "Significant figures and estimating",
      titleFr: "Les chiffres significatifs et l'estimation",
      concept: "Rounding numbers to a given number of significant figures and using rounding to estimate calculations",
      conceptFr: "Arrondir des nombres à un nombre donné de chiffres significatifs et utiliser l'arrondi pour estimer des calculs",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L1-3"],
      explanationMd:
        "A **significant figure** is a digit that contributes to a number's precision, starting from the first non-zero digit. Rounding to a given number of significant figures keeps that many digits and rounds the rest away.\n\n" +
        "You can estimate the answer to a calculation by rounding each number to 1 significant figure first, then working it out.",
      explanationMdFr:
        "Un **chiffre significatif** est un chiffre qui contribue à la précision d'un nombre, en commençant par le premier chiffre non nul. Arrondir à un nombre donné de chiffres significatifs garde ce nombre de chiffres et arrondit le reste.\n\n" +
        "Tu peux estimer le résultat d'un calcul en arrondissant d'abord chaque nombre à 1 chiffre significatif, puis en le calculant.",
      workedExamples: [
        { problem: "Round 4,872 to 2 significant figures.", steps: ["Keep the first two digits: 4 and 8.", "Look at the next digit (7) to round up."], answer: "4,900" },
        { problem: "Estimate 38 x 21 by rounding each number to 1 significant figure.", steps: ["38 rounds to 40.", "21 rounds to 20."], answer: "800" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 4 872 à 2 chiffres significatifs.", steps: ["Garde les deux premiers chiffres : 4 et 8.", "Regarde le chiffre suivant (7) pour arrondir vers le haut."], answer: "4 900" },
        { problem: "Estime 38 x 21 en arrondissant chaque nombre à 1 chiffre significatif.", steps: ["38 s'arrondit à 40.", "21 s'arrondit à 20."], answer: "800" }
      ],
      audioScript: "Count significant figures from the first non-zero digit, and use rounded numbers to get a quick, sensible estimate.",
      audioScriptFr: "Compte les chiffres significatifs à partir du premier chiffre non nul, et utilise des nombres arrondis pour obtenir une estimation rapide et raisonnable."
    }
  ],
  Y9L2: [
    {
      order: 1,
      title: "Direct and inverse proportion",
      titleFr: "La proportionnalité directe et inverse",
      concept: "Distinguishing between quantities that increase together (direct) and quantities where one increases as the other decreases (inverse)",
      conceptFr: "Distinguer les quantités qui augmentent ensemble (directe) des quantités où l'une augmente quand l'autre diminue (inverse)",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L2-1"],
      explanationMd:
        "In **direct proportion**, both quantities scale together — double one, and the other doubles too (like cost and quantity bought).\n\n" +
        "In **inverse proportion**, one quantity increases as the other decreases — double the workers, and the job takes half the time.",
      explanationMdFr:
        "En **proportionnalité directe**, les deux quantités varient ensemble — double l'une, et l'autre double aussi (comme le coût et la quantité achetée).\n\n" +
        "En **proportionnalité inverse**, une quantité augmente quand l'autre diminue — double le nombre d'ouvriers, et le travail prend deux fois moins de temps.",
      workedExamples: [
        { problem: "6 pens cost £3. How much do 10 pens cost?", steps: ["£3 ÷ 6 = £0.50 per pen.", "£0.50 x 10 = £5."], answer: "£5" },
        { problem: "4 painters take 12 days to paint a building. How long would 8 painters take?", steps: ["4 x 12 = 48 painter-days of work.", "48 ÷ 8 = 6 days."], answer: "6 days" }
      ],
      workedExamplesFr: [
        { problem: "6 stylos coûtent 3 £. Combien coûtent 10 stylos ?", steps: ["3 £ ÷ 6 = 0,50 £ par stylo.", "0,50 £ x 10 = 5 £."], answer: "5 £" },
        { problem: "4 peintres mettent 12 jours à peindre un bâtiment. Combien de temps mettraient 8 peintres ?", steps: ["4 x 12 = 48 jours-peintre de travail.", "48 ÷ 8 = 6 jours."], answer: "6 jours" }
      ],
      audioScript: "Ask yourself: if one quantity goes up, does the other go up too (direct), or does it go down (inverse)?",
      audioScriptFr: "Demande-toi : si une quantité augmente, l'autre augmente-t-elle aussi (directe), ou diminue-t-elle (inverse) ?"
    },
    {
      order: 2,
      title: "Compound measures",
      titleFr: "Les grandeurs composées",
      concept: "Using the formulae for speed, density and pressure, which combine two other measurements",
      conceptFr: "Utiliser les formules de la vitesse, de la masse volumique et de la pression, qui combinent deux autres mesures",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L2-2"],
      explanationMd:
        "A **compound measure** combines two quantities: speed = distance ÷ time, density = mass ÷ volume, and pressure = force ÷ area.\n\n" +
        "You can rearrange each formula to find any of the three quantities, as long as you know the other two.",
      explanationMdFr:
        "Une **grandeur composée** combine deux quantités : vitesse = distance ÷ temps, masse volumique = masse ÷ volume, et pression = force ÷ aire.\n\n" +
        "Tu peux réarranger chaque formule pour trouver n'importe laquelle des trois quantités, du moment que tu connais les deux autres.",
      workedExamples: [
        { problem: "A cyclist travels 45 miles in 3 hours. What is their average speed?", steps: ["45 ÷ 3 = 15."], answer: "15 mph" },
        { problem: "An object has a mass of 80g and a volume of 20cm³. What is its density?", steps: ["80 ÷ 20 = 4."], answer: "4 g/cm³" }
      ],
      workedExamplesFr: [
        { problem: "Un cycliste parcourt 45 miles en 3 heures. Quelle est sa vitesse moyenne ?", steps: ["45 ÷ 3 = 15."], answer: "15 mph" },
        { problem: "Un objet a une masse de 80 g et un volume de 20 cm³. Quelle est sa masse volumique ?", steps: ["80 ÷ 20 = 4."], answer: "4 g/cm³" }
      ],
      audioScript: "All three compound measures use the same shape of formula: one quantity divided by another.",
      audioScriptFr: "Les trois grandeurs composées utilisent la même forme de formule : une quantité divisée par une autre."
    },
    {
      order: 3,
      title: "Growth and decay",
      titleFr: "La croissance et la décroissance",
      concept: "Setting up and solving problems where a quantity grows or shrinks by a percentage, possibly over several steps",
      conceptFr: "Mettre en place et résoudre des problèmes où une quantité augmente ou diminue d'un pourcentage, éventuellement sur plusieurs étapes",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L2-3"],
      explanationMd:
        "**Growth** means a quantity increases by a percentage; **decay** means it decreases. Over several time periods, apply the percentage change again each time — this is called compound growth or decay.\n\n" +
        "Always apply the percentage to the most recent value, not the original starting value.",
      explanationMdFr:
        "La **croissance** signifie qu'une quantité augmente d'un pourcentage ; la **décroissance** signifie qu'elle diminue. Sur plusieurs périodes, applique le changement en pourcentage à nouveau à chaque fois — on appelle cela la croissance ou décroissance composée.\n\n" +
        "Applique toujours le pourcentage à la valeur la plus récente, pas à la valeur de départ d'origine.",
      workedExamples: [
        { problem: "A population of 200 grows by 10% each year. What is it after 2 years?", steps: ["Year 1: 200 + 10% = 220.", "Year 2: 220 + 10% = 242."], answer: "242" },
        { problem: "A car worth £8,000 loses 25% of its value in a year. What is it worth after one year?", steps: ["25% of 8,000 = 2,000.", "8,000 - 2,000 = 6,000."], answer: "£6,000" }
      ],
      workedExamplesFr: [
        { problem: "Une population de 200 augmente de 10 % chaque année. Que vaut-elle après 2 ans ?", steps: ["Année 1 : 200 + 10 % = 220.", "Année 2 : 220 + 10 % = 242."], answer: "242" },
        { problem: "Une voiture valant 8 000 £ perd 25 % de sa valeur en un an. Combien vaut-elle après un an ?", steps: ["25 % de 8 000 = 2 000.", "8 000 - 2 000 = 6 000."], answer: "6 000 £" }
      ],
      audioScript: "For growth or decay over several years, apply the percentage change to the newest value each time, not the original.",
      audioScriptFr: "Pour une croissance ou décroissance sur plusieurs années, applique le changement en pourcentage à la valeur la plus récente à chaque fois, pas à celle de départ."
    }
  ],
  Y9L3: [
    {
      order: 1,
      title: "Expanding double brackets",
      titleFr: "Développer un produit de deux parenthèses",
      concept: "Multiplying out products of two binomials",
      conceptFr: "Développer un produit de deux binômes",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L3-1"],
      explanationMd:
        "To expand (x + a)(x + b), multiply every term in the first bracket by every term in the second.\n\n" +
        "You get x² + ax + bx + ab, which collects to x² + (a + b)x + ab. The x coefficient is the **sum** of the two numbers; the constant is their **product**.",
      explanationMdFr:
        "Pour développer (x + a)(x + b), multiplie chaque terme de la première parenthèse par chaque terme de la seconde.\n\n" +
        "On obtient x² + ax + bx + ab, qui se regroupe en x² + (a + b)x + ab. Le coefficient de x est la **somme** des deux nombres ; la constante est leur **produit**.",
      workedExamples: [
        { problem: "Expand (x + 3)(x + 5)", steps: ["x x x = x².", "3 + 5 = 8, giving 8x.", "3 x 5 = 15."], answer: "x² + 8x + 15" }
      ],
      workedExamplesFr: [
        { problem: "Développe (x + 3)(x + 5)", steps: ["x x x = x².", "3 + 5 = 8, donc 8x.", "3 x 5 = 15."], answer: "x² + 8x + 15" }
      ],
      audioScript: "Every term in the first bracket multiplies every term in the second — nothing gets missed.",
      audioScriptFr: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde — rien n'est oublié."
    },
    {
      order: 2,
      title: "Factorising quadratics",
      titleFr: "Factoriser des expressions quadratiques",
      concept: "Writing x² + bx + c as a product of two brackets",
      conceptFr: "Écrire x² + bx + c comme un produit de deux parenthèses",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L3-2"],
      explanationMd:
        "Factorising reverses expanding. For x² + bx + c, find two numbers that **multiply to c** and **add to b**.\n\n" +
        "A difference of two squares, x² - n², is a special case that always factorises to (x + n)(x - n).",
      explanationMdFr:
        "Factoriser, c'est l'inverse de développer. Pour x² + bx + c, trouve deux nombres dont le **produit est c** et la **somme est b**.\n\n" +
        "Une différence de deux carrés, x² - n², est un cas particulier qui se factorise toujours en (x + n)(x - n).",
      workedExamples: [
        { problem: "Factorise x² + 7x + 12", steps: ["Which pair multiplies to 12 and adds to 7?", "3 and 4."], answer: "(x + 3)(x + 4)" }
      ],
      workedExamplesFr: [
        { problem: "Factorise x² + 7x + 12", steps: ["Quelle paire a pour produit 12 et pour somme 7 ?", "3 et 4."], answer: "(x + 3)(x + 4)" }
      ],
      audioScript: "Multiply to the constant, add to the x coefficient — that's the pair you need.",
      audioScriptFr: "Produit égal à la constante, somme égale au coefficient de x — voilà la paire qu'il te faut."
    },
    {
      order: 3,
      title: "Rearranging formulae",
      titleFr: "Transformer des formules",
      concept: "Changing the subject of a formula using inverse operations",
      conceptFr: "Changer le sujet d'une formule à l'aide des opérations inverses",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L3-3"],
      explanationMd:
        "Changing the subject uses the same balancing rules as solving an equation — you just finish with a letter instead of a number.\n\n" +
        "Undo operations in reverse order: deal with addition and subtraction first, then multiplication and division.",
      explanationMdFr:
        "Changer le sujet utilise les mêmes règles d'équilibre que la résolution d'une équation — on termine simplement par une lettre au lieu d'un nombre.\n\n" +
        "Annule les opérations dans l'ordre inverse : d'abord l'addition et la soustraction, puis la multiplication et la division.",
      workedExamples: [
        { problem: "Make x the subject of y = 4x + 7", steps: ["Subtract 7: y - 7 = 4x.", "Divide by 4."], answer: "x = (y - 7) ÷ 4" }
      ],
      workedExamplesFr: [
        { problem: "Isole x dans y = 4x + 7", steps: ["Soustrais 7 : y - 7 = 4x.", "Divise par 4."], answer: "x = (y - 7) ÷ 4" }
      ],
      audioScript: "Same balancing rules as an equation — just keep going until the letter you want stands alone.",
      audioScriptFr: "Les mêmes règles d'équilibre qu'une équation — continue jusqu'à ce que la lettre voulue soit seule."
    }
  ],
  Y9L4: [
    {
      order: 1,
      title: "Gradient and intercept",
      titleFr: "Coefficient directeur et ordonnée à l'origine",
      concept: "Reading gradient and y-intercept from y = mx + c",
      conceptFr: "Lire le coefficient directeur et l'ordonnée à l'origine dans y = mx + c",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L4-1"],
      explanationMd:
        "Every straight line can be written as **y = mx + c**, where m is the gradient (how steep it is) and c is where it crosses the y-axis.\n\n" +
        "Between two points, the gradient is the change in y divided by the change in x.",
      explanationMdFr:
        "Toute droite peut s'écrire **y = mx + c**, où m est le coefficient directeur (la pente) et c l'ordonnée à l'origine.\n\n" +
        "Entre deux points, le coefficient directeur est la variation de y divisée par la variation de x.",
      workedExamples: [
        { problem: "Find the gradient of the line through (2, 4) and (5, 13)", steps: ["Change in y = 13 - 4 = 9.", "Change in x = 5 - 2 = 3.", "9 ÷ 3 = 3."], answer: "3" }
      ],
      workedExamplesFr: [
        { problem: "Trouve le coefficient directeur de la droite passant par (2, 4) et (5, 13)", steps: ["Variation de y = 13 - 4 = 9.", "Variation de x = 5 - 2 = 3.", "9 ÷ 3 = 3."], answer: "3" }
      ],
      audioScript: "Gradient is rise over run: change in y divided by change in x.",
      audioScriptFr: "Le coefficient directeur, c'est la montée sur l'avancée : variation de y divisée par variation de x."
    },
    {
      order: 2,
      title: "Quadratic graphs",
      titleFr: "Les graphiques de fonctions quadratiques",
      concept: "Recognising and interpreting parabolas",
      conceptFr: "Reconnaître et interpréter des paraboles",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L4-2"],
      explanationMd:
        "A quadratic graph is a **parabola**. A positive x² coefficient gives a U shape; a negative one turns it upside down.\n\n" +
        "The curve crosses the y-axis at the constant term, and crosses the x-axis at the roots — the values that make y zero.",
      explanationMdFr:
        "Un graphique quadratique est une **parabole**. Un coefficient de x² positif donne une forme en U ; un coefficient négatif la retourne.\n\n" +
        "La courbe coupe l'axe des ordonnées au terme constant, et l'axe des abscisses aux racines — les valeurs qui annulent y.",
      workedExamples: [
        { problem: "For y = x² + 2x + 5, find y when x = 3", steps: ["3² = 9.", "2 x 3 = 6.", "9 + 6 + 5 = 20."], answer: "20" }
      ],
      workedExamplesFr: [
        { problem: "Pour y = x² + 2x + 5, trouve y quand x = 3", steps: ["3² = 9.", "2 x 3 = 6.", "9 + 6 + 5 = 20."], answer: "20" }
      ],
      audioScript: "Square the x value first, then add the rest of the terms.",
      audioScriptFr: "Élève d'abord x au carré, puis ajoute les autres termes."
    },
    {
      order: 3,
      title: "Gradient as a rate of change",
      titleFr: "Le coefficient directeur comme taux de variation",
      concept: "Interpreting gradient in real contexts such as speed and cost",
      conceptFr: "Interpréter le coefficient directeur dans des contextes réels comme la vitesse et le coût",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L4-3"],
      explanationMd:
        "On a real-world graph, the gradient has units and a meaning. On a distance-time graph it's speed; on a cost-quantity graph it's price per item.\n\n" +
        "A steeper line always means a faster rate of change.",
      explanationMdFr:
        "Sur un graphique concret, le coefficient directeur a des unités et un sens. Sur un graphique distance-temps, c'est la vitesse ; sur un graphique coût-quantité, c'est le prix par article.\n\n" +
        "Une droite plus raide signifie toujours un taux de variation plus élevé.",
      workedExamples: [
        { problem: "A train covers 240 km in 3 hours. What is the gradient of its distance-time graph?", steps: ["240 ÷ 3 = 80."], answer: "80 km/h" }
      ],
      workedExamplesFr: [
        { problem: "Un train parcourt 240 km en 3 heures. Quel est le coefficient directeur de son graphique distance-temps ?", steps: ["240 ÷ 3 = 80."], answer: "80 km/h" }
      ],
      audioScript: "Always state the units — the gradient means something real.",
      audioScriptFr: "Précise toujours les unités — le coefficient directeur a un sens concret."
    }
  ],
  Y9L5: [
    {
      order: 1,
      title: "Simultaneous equations",
      titleFr: "Systèmes d'équations",
      concept: "Solving two equations in two unknowns by elimination",
      conceptFr: "Résoudre deux équations à deux inconnues par élimination",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L5-1"],
      explanationMd:
        "Two equations with two unknowns can be solved together. **Elimination** adds or subtracts the equations so one letter disappears.\n\n" +
        "Once you have one value, substitute it back into either equation to find the other.",
      explanationMdFr:
        "Deux équations à deux inconnues se résolvent ensemble. L'**élimination** additionne ou soustrait les équations pour faire disparaître une lettre.\n\n" +
        "Une fois une valeur trouvée, remplace-la dans l'une des équations pour trouver l'autre.",
      workedExamples: [
        { problem: "Solve x + y = 10 and x - y = 4", steps: ["Add them: 2x = 14, so x = 7.", "Substitute: 7 + y = 10, so y = 3."], answer: "x = 7, y = 3" }
      ],
      workedExamplesFr: [
        { problem: "Résous x + y = 10 et x - y = 4", steps: ["Additionne : 2x = 14, donc x = 7.", "Remplace : 7 + y = 10, donc y = 3."], answer: "x = 7, y = 3" }
      ],
      audioScript: "Add or subtract the equations to make one letter vanish.",
      audioScriptFr: "Additionne ou soustrais les équations pour faire disparaître une lettre."
    },
    {
      order: 2,
      title: "Solving quadratics by factorising",
      titleFr: "Résoudre des équations quadratiques par factorisation",
      concept: "Using factorised form and the zero product rule",
      conceptFr: "Utiliser la forme factorisée et la règle du produit nul",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L5-2"],
      explanationMd:
        "If two things multiply to zero, at least one of them must be zero. So once a quadratic is factorised, set each bracket to zero in turn.\n\n" +
        "That gives the two solutions, which are also where the curve crosses the x-axis.",
      explanationMdFr:
        "Si un produit vaut zéro, au moins un des facteurs est nul. Une fois l'expression factorisée, annule donc chaque parenthèse tour à tour.\n\n" +
        "Cela donne les deux solutions, qui sont aussi les points où la courbe coupe l'axe des abscisses.",
      workedExamples: [
        { problem: "Solve x² - 7x + 12 = 0", steps: ["Factorise: (x - 3)(x - 4) = 0.", "x - 3 = 0 or x - 4 = 0."], answer: "x = 3 or x = 4" }
      ],
      workedExamplesFr: [
        { problem: "Résous x² - 7x + 12 = 0", steps: ["Factorise : (x - 3)(x - 4) = 0.", "x - 3 = 0 ou x - 4 = 0."], answer: "x = 3 ou x = 4" }
      ],
      audioScript: "Factorise first, then set each bracket equal to zero.",
      audioScriptFr: "Factorise d'abord, puis annule chaque parenthèse."
    },
    {
      order: 3,
      title: "Linear inequalities",
      titleFr: "Inéquations linéaires",
      concept: "Solving inequalities and interpreting the solution set",
      conceptFr: "Résoudre des inéquations et interpréter l'ensemble des solutions",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L5-3"],
      explanationMd:
        "Solve an inequality exactly like an equation — the sign stays the same as long as you only multiply or divide by positive numbers.\n\n" +
        "The answer is a **range** of values, not a single one. Check by substituting a value from your range back in.",
      explanationMdFr:
        "Résous une inéquation exactement comme une équation — le signe reste le même tant qu'on ne multiplie ou ne divise que par des nombres positifs.\n\n" +
        "La réponse est un **intervalle** de valeurs, pas une seule. Vérifie en remplaçant par une valeur de ton intervalle.",
      workedExamples: [
        { problem: "Solve 3x + 4 < 19", steps: ["19 - 4 = 15.", "15 ÷ 3 = 5."], answer: "x < 5" }
      ],
      workedExamplesFr: [
        { problem: "Résous 3x + 4 < 19", steps: ["19 - 4 = 15.", "15 ÷ 3 = 5."], answer: "x < 5" }
      ],
      audioScript: "The answer is a range — check it by testing a value inside it.",
      audioScriptFr: "La réponse est un intervalle — vérifie en testant une valeur à l'intérieur."
    }
  ],
  Y9L6: [
    {
      order: 1,
      title: "Translations as vectors",
      titleFr: "Les translations comme vecteurs",
      concept: "Describing translations with a 2D column vector",
      conceptFr: "Décrire des translations avec un vecteur à deux composantes",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L6-1"],
      explanationMd:
        "A translation slides a shape without turning or resizing it. The vector (a, b) means move a across and b up.\n\n" +
        "To find the vector between two points, subtract the start coordinates from the end coordinates — in that order.",
      explanationMdFr:
        "Une translation fait glisser une forme sans la tourner ni la redimensionner. Le vecteur (a, b) signifie se déplacer de a horizontalement et de b verticalement.\n\n" +
        "Pour trouver le vecteur entre deux points, soustrais les coordonnées de départ de celles d'arrivée — dans cet ordre.",
      workedExamples: [
        { problem: "What vector translates (2, 5) to (7, 3)?", steps: ["7 - 2 = 5.", "3 - 5 = -2."], answer: "(5, -2)" }
      ],
      workedExamplesFr: [
        { problem: "Quel vecteur translate (2, 5) en (7, 3) ?", steps: ["7 - 2 = 5.", "3 - 5 = -2."], answer: "(5, -2)" }
      ],
      audioScript: "End coordinates minus start coordinates, keeping the order.",
      audioScriptFr: "Coordonnées d'arrivée moins coordonnées de départ, en gardant l'ordre."
    },
    {
      order: 2,
      title: "Standard constructions",
      titleFr: "Les constructions standard",
      concept: "Using compasses to construct bisectors and perpendiculars",
      conceptFr: "Utiliser le compas pour construire des médiatrices et des perpendiculaires",
      representation: "concrete",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L6-2"],
      explanationMd:
        "Standard constructions use **compasses set to a fixed radius**, never a protractor. Arcs of equal radius guarantee equal distances.\n\n" +
        "A perpendicular bisector uses equal arcs from both endpoints; an angle bisector uses equal arcs from each arm. Always leave your construction arcs visible.",
      explanationMdFr:
        "Les constructions standard utilisent un **compas réglé sur un rayon fixe**, jamais un rapporteur. Des arcs de même rayon garantissent des distances égales.\n\n" +
        "Une médiatrice utilise des arcs égaux depuis les deux extrémités ; une bissectrice, des arcs égaux depuis chaque côté. Laisse toujours tes arcs de construction visibles.",
      workedExamples: [
        { problem: "An angle of 76° is bisected. How big is each half?", steps: ["76 ÷ 2 = 38."], answer: "38°" }
      ],
      workedExamplesFr: [
        { problem: "Un angle de 76° est coupé par sa bissectrice. Combien mesure chaque moitié ?", steps: ["76 ÷ 2 = 38."], answer: "38°" }
      ],
      audioScript: "Keep the compass radius fixed, and leave your arcs on the page.",
      audioScriptFr: "Garde le rayon du compas fixe, et laisse tes arcs sur la feuille."
    },
    {
      order: 3,
      title: "Combining transformations",
      titleFr: "Combiner des transformations",
      concept: "Applying reflections, translations and enlargements in sequence",
      conceptFr: "Appliquer des réflexions, translations et agrandissements à la suite",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L6-3"],
      explanationMd:
        "Reflecting in the y-axis flips the sign of x; reflecting in the x-axis flips the sign of y. A rotation of 180° about the origin flips both.\n\n" +
        "When transformations are combined, apply them **one at a time, in order** — the result of the first becomes the input to the second.",
      explanationMdFr:
        "Une réflexion par rapport à l'axe des ordonnées change le signe de x ; par rapport à l'axe des abscisses, celui de y. Une rotation de 180° autour de l'origine change les deux.\n\n" +
        "Quand des transformations sont combinées, applique-les **une à la fois, dans l'ordre** — le résultat de la première devient l'entrée de la seconde.",
      workedExamples: [
        { problem: "Reflect (3, 4) in the y-axis, then translate by (2, 0)", steps: ["Reflection gives (-3, 4).", "-3 + 2 = -1."], answer: "(-1, 4)" }
      ],
      workedExamplesFr: [
        { problem: "Réfléchis (3, 4) par rapport à l'axe des ordonnées, puis translate par (2, 0)", steps: ["La réflexion donne (-3, 4).", "-3 + 2 = -1."], answer: "(-1, 4)" }
      ],
      audioScript: "One transformation at a time, in the order given.",
      audioScriptFr: "Une transformation à la fois, dans l'ordre indiqué."
    }
  ],
  Y9L7: [
    {
      order: 1,
      title: "Pythagoras' theorem",
      titleFr: "Le théorème de Pythagore",
      concept: "Finding missing sides in right-angled triangles",
      conceptFr: "Trouver des côtés manquants dans des triangles rectangles",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L7-1"],
      explanationMd:
        "In any right-angled triangle, **a² + b² = c²**, where c is the hypotenuse — always the longest side, opposite the right angle.\n\n" +
        "To find the hypotenuse, square both short sides, add, then square root. To find a short side, subtract instead of adding.",
      explanationMdFr:
        "Dans tout triangle rectangle, **a² + b² = c²**, où c est l'hypoténuse — toujours le plus long côté, opposé à l'angle droit.\n\n" +
        "Pour trouver l'hypoténuse, élève les deux côtés courts au carré, additionne, puis prends la racine carrée. Pour un côté court, soustrais au lieu d'additionner.",
      workedExamples: [
        { problem: "Find the hypotenuse when the short sides are 6 cm and 8 cm", steps: ["6² + 8² = 36 + 64 = 100.", "The square root of 100 is 10."], answer: "10 cm" }
      ],
      workedExamplesFr: [
        { problem: "Trouve l'hypoténuse quand les côtés courts mesurent 6 cm et 8 cm", steps: ["6² + 8² = 36 + 64 = 100.", "La racine carrée de 100 est 10."], answer: "10 cm" }
      ],
      audioScript: "Square, add, square root — and the hypotenuse is always the longest side.",
      audioScriptFr: "Carré, addition, racine carrée — et l'hypoténuse est toujours le plus long côté."
    },
    {
      order: 2,
      title: "Trigonometric ratios",
      titleFr: "Les rapports trigonométriques",
      concept: "Using sine, cosine and tangent to find missing sides",
      conceptFr: "Utiliser sinus, cosinus et tangente pour trouver des côtés manquants",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L7-2"],
      explanationMd:
        "Label the sides relative to the angle you're working with: **opposite**, **adjacent** and **hypotenuse**.\n\n" +
        "**SOH CAH TOA**: sine = opposite ÷ hypotenuse, cosine = adjacent ÷ hypotenuse, tangent = opposite ÷ adjacent. Pick the ratio that uses the two sides you know about.",
      explanationMdFr:
        "Nomme les côtés par rapport à l'angle étudié : **opposé**, **adjacent** et **hypoténuse**.\n\n" +
        "sinus = opposé ÷ hypoténuse, cosinus = adjacent ÷ hypoténuse, tangente = opposé ÷ adjacent. Choisis le rapport qui utilise les deux côtés concernés.",
      workedExamples: [
        { problem: "The opposite side is 3 cm and the hypotenuse is 5 cm. Find sin A.", steps: ["sin A = opposite ÷ hypotenuse.", "3 ÷ 5 = 0.6."], answer: "0.6" }
      ],
      workedExamplesFr: [
        { problem: "Le côté opposé mesure 3 cm et l'hypoténuse 5 cm. Trouve sin A.", steps: ["sin A = opposé ÷ hypoténuse.", "3 ÷ 5 = 0,6."], answer: "0,6" }
      ],
      audioScript: "Label the sides first, then choose the ratio that matches what you know.",
      audioScriptFr: "Nomme d'abord les côtés, puis choisis le rapport correspondant à ce que tu connais."
    },
    {
      order: 3,
      title: "Finding angles with trigonometry",
      titleFr: "Trouver des angles avec la trigonométrie",
      concept: "Using inverse trigonometric functions to find missing angles",
      conceptFr: "Utiliser les fonctions trigonométriques inverses pour trouver des angles",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y9-L7-3"],
      explanationMd:
        "If you know two sides, you can find the angle. Work out the ratio, then use the **inverse** function on your calculator — written as sin⁻¹, cos⁻¹ or tan⁻¹.\n\n" +
        "Remember too that the two non-right angles in a right-angled triangle always add to 90°.",
      explanationMdFr:
        "Si tu connais deux côtés, tu peux trouver l'angle. Calcule le rapport, puis utilise la fonction **inverse** de ta calculatrice — notée sin⁻¹, cos⁻¹ ou tan⁻¹.\n\n" +
        "N'oublie pas non plus que les deux angles non droits d'un triangle rectangle font toujours 90° au total.",
      workedExamples: [
        { problem: "The opposite side is 3 cm and the hypotenuse is 5 cm. Find angle A.", steps: ["sin A = 3 ÷ 5 = 0.6.", "sin⁻¹(0.6) ≈ 37."], answer: "About 37°" }
      ],
      workedExamplesFr: [
        { problem: "Le côté opposé mesure 3 cm et l'hypoténuse 5 cm. Trouve l'angle A.", steps: ["sin A = 3 ÷ 5 = 0,6.", "sin⁻¹(0,6) ≈ 37."], answer: "Environ 37°" }
      ],
      audioScript: "Find the ratio first, then use the inverse function to get the angle.",
      audioScriptFr: "Calcule d'abord le rapport, puis utilise la fonction inverse pour obtenir l'angle."
    }
  ],
  Y10L1: [
    {
      order: 1,
      title: "Upper and lower bounds",
      titleFr: "Les bornes supérieures et inférieures",
      concept: "Finding the range of possible true values behind a rounded measurement",
      conceptFr: "Trouver l'étendue des valeurs réelles possibles derrière une mesure arrondie",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-1"],
      explanationMd:
        "When a measurement is rounded, the true value could be anywhere within half a unit either side. This gives an **upper bound** and a **lower bound**.",
      explanationMdFr:
        "Quand une mesure est arrondie, la valeur réelle pourrait se situer n'importe où dans une demi-unité de chaque côté. Cela donne une **borne supérieure** et une **borne inférieure**.",
      workedExamples: [
        { problem: "A length is 34 cm to the nearest cm. Find the bounds.", steps: ["Half a unit is 0.5 cm.", "Lower bound: 34 - 0.5 = 33.5 cm.", "Upper bound: 34 + 0.5 = 34.5 cm."], answer: "33.5 cm to 34.5 cm" }
      ],
      workedExamplesFr: [
        { problem: "Une longueur est de 34 cm au cm près. Trouve les bornes.", steps: ["Une demi-unité est 0,5 cm.", "Borne inférieure : 34 - 0,5 = 33,5 cm.", "Borne supérieure : 34 + 0,5 = 34,5 cm."], answer: "de 33,5 cm à 34,5 cm" }
      ],
      audioScript: "Rounded measurements hide a small range of possible true values — let's find the bounds.",
      audioScriptFr: "Les mesures arrondies cachent une petite étendue de valeurs réelles possibles — trouvons les bornes."
    },
    {
      order: 2,
      title: "Laws of indices",
      titleFr: "Les lois des indices",
      concept: "Using the multiplication, division and power laws of indices",
      conceptFr: "Utiliser les lois de multiplication, de division et de puissance des indices",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-2"],
      explanationMd:
        "When multiplying powers of the same base, **add** the indices. When dividing, **subtract** them. When raising a power to a power, **multiply** them.",
      explanationMdFr:
        "Quand on multiplie des puissances de même base, **additionne** les indices. Quand on divise, **soustrais**-les. Quand on élève une puissance à une puissance, **multiplie**-les.",
      workedExamples: [
        { problem: "3^4 x 3^2 = ?", steps: ["Same base, multiplying.", "Add the indices: 4 + 2 = 6."], answer: "3^6" },
        { problem: "(2^3)^2 = ?", steps: ["Power of a power.", "Multiply the indices: 3 x 2 = 6."], answer: "2^6" }
      ],
      workedExamplesFr: [
        { problem: "3^4 x 3^2 = ?", steps: ["Même base, on multiplie.", "Additionne les indices : 4 + 2 = 6."], answer: "3^6" },
        { problem: "(2^3)^2 = ?", steps: ["Puissance d'une puissance.", "Multiplie les indices : 3 x 2 = 6."], answer: "2^6" }
      ],
      audioScript: "Same base, multiplying: add the powers. Let's work through the index laws together.",
      audioScriptFr: "Même base, en multipliant : additionne les puissances. Travaillons ensemble les lois des indices."
    },
    {
      order: 3,
      title: "Standard form",
      titleFr: "La notation scientifique",
      concept: "Writing very large or very small numbers as A x 10^n",
      conceptFr: "Écrire des nombres très grands ou très petits sous la forme A x 10^n",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-3"],
      explanationMd:
        "Standard form writes a number as A x 10^n, where A is between 1 and 10. This is a compact way to write very large or very small numbers.",
      explanationMdFr:
        "La notation scientifique écrit un nombre sous la forme A x 10^n, où A est compris entre 1 et 10. C'est une façon compacte d'écrire des nombres très grands ou très petits.",
      workedExamples: [
        { problem: "Write 45,000 in standard form.", steps: ["Move the decimal point until one non-zero digit remains before it: 4.5.", "Count how many places it moved: 4.", "45,000 = 4.5 x 10^4."], answer: "4.5 x 10^4" }
      ],
      workedExamplesFr: [
        { problem: "Écris 45 000 en notation scientifique.", steps: ["Déplace la virgule jusqu'à ce qu'il reste un seul chiffre non nul avant elle : 4,5.", "Compte de combien de positions elle s'est déplacée : 4.", "45 000 = 4,5 x 10^4."], answer: "4,5 x 10^4" }
      ],
      audioScript: "Standard form is a tidy way to write very big or very small numbers.",
      audioScriptFr: "La notation scientifique est une façon soignée d'écrire des nombres très grands ou très petits."
    },
    {
      order: 4,
      title: "Simplifying surds (Higher)",
      titleFr: "Simplifier les racines (niveau avancé)",
      concept: "Simplifying square roots into the form a√b",
      conceptFr: "Simplifier des racines carrées sous la forme a√b",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-4"],
      explanationMd:
        "A surd is a root that doesn't simplify to a whole number, like √12. We simplify by finding the largest square number that divides in.",
      explanationMdFr:
        "Une racine irrationnelle est une racine qui ne se simplifie pas en un nombre entier, comme √12. On simplifie en trouvant le plus grand nombre carré qui divise l'intérieur.",
      workedExamples: [
        { problem: "Simplify √12.", steps: ["12 = 4 x 3, and 4 is a square number.", "√12 = √4 x √3 = 2√3."], answer: "2√3" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie √12.", steps: ["12 = 4 x 3, et 4 est un nombre carré.", "√12 = √4 x √3 = 2√3."], answer: "2√3" }
      ],
      audioScript: "Look for the largest square factor hiding inside the surd.",
      audioScriptFr: "Cherche le plus grand facteur carré caché à l'intérieur de la racine."
    }
  ],
  Y6L3: [
    {
      order: 1,
      title: "Adding and subtracting fractions with different denominators",
      titleFr: "Additionner et soustraire des fractions de dénominateurs différents",
      concept: "Finding a common denominator before adding or subtracting fractions and mixed numbers",
      conceptFr: "Trouver un dénominateur commun avant d'additionner ou de soustraire des fractions et des nombres mixtes",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L3-1"],
      explanationMd:
        "You can only add or subtract fractions when the pieces are the same size, so first change them to a **common denominator** — usually the lowest common multiple of the two denominators.\n\n" +
        "With mixed numbers, deal with the whole numbers and the fraction parts separately, and convert to improper fractions if the fraction part would go negative.",
      explanationMdFr:
        "On ne peut additionner ou soustraire des fractions que si les parts ont la même taille : il faut donc d'abord les mettre au même **dénominateur commun** — en général le plus petit multiple commun des deux dénominateurs.\n\n" +
        "Avec des nombres mixtes, traite les entiers et les parties fractionnaires séparément, et convertis en fractions impropres si la partie fractionnaire deviendrait négative.",
      workedExamples: [
        { problem: "2/3 + 1/4", steps: ["The lowest common multiple of 3 and 4 is 12.", "2/3 = 8/12 and 1/4 = 3/12.", "8/12 + 3/12 = 11/12."], answer: "11/12" },
        { problem: "3 1/2 - 1 3/4", steps: ["Write both with denominator 4: 3 2/4 - 1 3/4.", "2/4 is smaller than 3/4, so borrow: 2 6/4 - 1 3/4.", "2 - 1 = 1 and 6/4 - 3/4 = 3/4."], answer: "1 3/4" }
      ],
      workedExamplesFr: [
        { problem: "2/3 + 1/4", steps: ["Le plus petit multiple commun de 3 et 4 est 12.", "2/3 = 8/12 et 1/4 = 3/12.", "8/12 + 3/12 = 11/12."], answer: "11/12" },
        { problem: "3 1/2 - 1 3/4", steps: ["Écris les deux avec le dénominateur 4 : 3 2/4 - 1 3/4.", "2/4 est plus petit que 3/4, donc emprunte : 2 6/4 - 1 3/4.", "2 - 1 = 1 et 6/4 - 3/4 = 3/4."], answer: "1 3/4" }
      ],
      audioScript: "Same-sized pieces first! Find a common denominator, then add or subtract the numerators.",
      audioScriptFr: "D'abord des parts de même taille ! Trouve un dénominateur commun, puis additionne ou soustrais les numérateurs."
    },
    {
      order: 2,
      title: "Multiplying pairs of proper fractions",
      titleFr: "Multiplier des paires de fractions propres",
      concept: "Multiplying numerators and denominators, and simplifying the result",
      conceptFr: "Multiplier les numérateurs et les dénominateurs, puis simplifier le résultat",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L3-2"],
      explanationMd:
        "To multiply two fractions, multiply the numerators together and the denominators together. No common denominator is needed.\n\n" +
        "Think of 1/2 of 1/3: you are splitting a third into two, which gives a sixth — and 1 x 1 = 1 over 2 x 3 = 6.",
      explanationMdFr:
        "Pour multiplier deux fractions, multiplie les numérateurs entre eux et les dénominateurs entre eux. Aucun dénominateur commun n'est nécessaire.\n\n" +
        "Pense à 1/2 de 1/3 : tu coupes un tiers en deux, ce qui donne un sixième — et 1 x 1 = 1 sur 2 x 3 = 6.",
      workedExamples: [
        { problem: "2/3 x 3/5", steps: ["Multiply the numerators: 2 x 3 = 6.", "Multiply the denominators: 3 x 5 = 15.", "6/15 simplifies to 2/5."], answer: "2/5" }
      ],
      workedExamplesFr: [
        { problem: "2/3 x 3/5", steps: ["Multiplie les numérateurs : 2 x 3 = 6.", "Multiplie les dénominateurs : 3 x 5 = 15.", "6/15 se simplifie en 2/5."], answer: "2/5" }
      ],
      audioScript: "Multiplying fractions is the easy one — straight across the top, straight across the bottom.",
      audioScriptFr: "Multiplier des fractions, c'est le plus simple — tout droit en haut, tout droit en bas."
    },
    {
      order: 3,
      title: "Dividing a proper fraction by a whole number",
      titleFr: "Diviser une fraction propre par un nombre entier",
      concept: "Dividing a fraction by a whole number by multiplying the denominator",
      conceptFr: "Diviser une fraction par un entier en multipliant le dénominateur",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L3-3"],
      explanationMd:
        "Dividing a fraction by a whole number cuts each piece into more pieces, so the **denominator** gets bigger: 1/4 ÷ 3 = 1/12.\n\n" +
        "The rule is to multiply the denominator by the whole number and leave the numerator alone.",
      explanationMdFr:
        "Diviser une fraction par un entier découpe chaque part en plus de parts, donc le **dénominateur** augmente : 1/4 ÷ 3 = 1/12.\n\n" +
        "La règle : multiplie le dénominateur par l'entier et laisse le numérateur tel quel.",
      workedExamples: [
        { problem: "3/5 ÷ 4", steps: ["Keep the numerator 3.", "Multiply the denominator: 5 x 4 = 20.", "The answer is 3/20."], answer: "3/20" }
      ],
      workedExamplesFr: [
        { problem: "3/5 ÷ 4", steps: ["Garde le numérateur 3.", "Multiplie le dénominateur : 5 x 4 = 20.", "La réponse est 3/20."], answer: "3/20" }
      ],
      audioScript: "Dividing makes the pieces smaller, so the number on the bottom gets bigger.",
      audioScriptFr: "Diviser rend les parts plus petites, donc le nombre du bas augmente."
    }
  ],
  Y6L4: [
    {
      order: 1,
      title: "Decimal place value to three places",
      titleFr: "La valeur de position des décimales jusqu'aux millièmes",
      concept: "Identifying the value of each digit in a number with up to three decimal places",
      conceptFr: "Identifier la valeur de chaque chiffre d'un nombre jusqu'aux millièmes",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L4-1"],
      explanationMd:
        "After the decimal point the columns are **tenths**, **hundredths** and **thousandths**. Each column is worth ten times less than the one to its left.\n\n" +
        "So in 4.726 the 7 is worth 7 tenths, the 2 is worth 2 hundredths and the 6 is worth 6 thousandths.",
      explanationMdFr:
        "Après la virgule, les colonnes sont les **dixièmes**, les **centièmes** et les **millièmes**. Chaque colonne vaut dix fois moins que celle de gauche.\n\n" +
        "Donc dans 4,726 le 7 vaut 7 dixièmes, le 2 vaut 2 centièmes et le 6 vaut 6 millièmes.",
      workedExamples: [
        { problem: "What is the value of the 5 in 2.157?", steps: ["The digits after the point are tenths, hundredths, thousandths.", "5 is in the hundredths column."], answer: "5 hundredths (0.05)" }
      ],
      workedExamplesFr: [
        { problem: "Quelle est la valeur du 5 dans 2,157 ?", steps: ["Après la virgule : dixièmes, centièmes, millièmes.", "Le 5 est dans la colonne des centièmes."], answer: "5 centièmes (0,05)" }
      ],
      audioScript: "Tenths, hundredths, thousandths — each step right is ten times smaller.",
      audioScriptFr: "Dixièmes, centièmes, millièmes — chaque pas vers la droite est dix fois plus petit."
    },
    {
      order: 2,
      title: "A fraction is a division",
      titleFr: "Une fraction est une division",
      concept: "Converting a fraction to a decimal by dividing the numerator by the denominator",
      conceptFr: "Convertir une fraction en décimale en divisant le numérateur par le dénominateur",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L4-2"],
      explanationMd:
        "The fraction bar means divide: 3/8 means 3 ÷ 8. Doing that division gives the **decimal equivalent**.\n\n" +
        "Some divisions stop (3/8 = 0.375) and some repeat forever (1/3 = 0.333...).",
      explanationMdFr:
        "La barre de fraction signifie diviser : 3/8 veut dire 3 ÷ 8. Faire cette division donne l'**équivalent décimal**.\n\n" +
        "Certaines divisions s'arrêtent (3/8 = 0,375) et d'autres se répètent à l'infini (1/3 = 0,333...).",
      workedExamples: [
        { problem: "Write 3/8 as a decimal.", steps: ["3/8 means 3 ÷ 8.", "3 ÷ 8 = 0.375."], answer: "0.375" }
      ],
      workedExamplesFr: [
        { problem: "Écris 3/8 sous forme décimale.", steps: ["3/8 signifie 3 ÷ 8.", "3 ÷ 8 = 0,375."], answer: "0,375" }
      ],
      audioScript: "The fraction line is a divide sign in disguise.",
      audioScriptFr: "La barre de fraction est un signe de division déguisé."
    },
    {
      order: 3,
      title: "Fraction, decimal and percentage equivalents",
      titleFr: "Équivalences fractions, décimales et pourcentages",
      concept: "Recalling and using the common equivalences between fractions, decimals and percentages",
      conceptFr: "Mémoriser et utiliser les équivalences courantes entre fractions, décimales et pourcentages",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L4-3"],
      explanationMd:
        "Learning a handful of equivalents by heart makes percentage work much faster: 1/2 = 0.5 = 50%, 1/4 = 0.25 = 25%, 1/5 = 0.2 = 20%, 3/4 = 0.75 = 75%.\n\n" +
        "To turn a decimal into a percentage, multiply by 100. To go back, divide by 100.",
      explanationMdFr:
        "Apprendre quelques équivalences par cœur accélère beaucoup le travail sur les pourcentages : 1/2 = 0,5 = 50 %, 1/4 = 0,25 = 25 %, 1/5 = 0,2 = 20 %, 3/4 = 0,75 = 75 %.\n\n" +
        "Pour passer d'une décimale à un pourcentage, multiplie par 100. Pour revenir, divise par 100.",
      workedExamples: [
        { problem: "Write 0.6 as a fraction and a percentage.", steps: ["0.6 is 6 tenths, so 6/10 = 3/5.", "0.6 x 100 = 60%."], answer: "3/5 and 60%" }
      ],
      workedExamplesFr: [
        { problem: "Écris 0,6 sous forme de fraction et de pourcentage.", steps: ["0,6 vaut 6 dixièmes, donc 6/10 = 3/5.", "0,6 x 100 = 60 %."], answer: "3/5 et 60 %" }
      ],
      audioScript: "Learn the key equivalents by heart and percentage questions become quick.",
      audioScriptFr: "Apprends les équivalences clés par cœur et les questions de pourcentage deviennent rapides."
    }
  ],
  Y6L5: [
    {
      order: 1,
      title: "Comparing two quantities with ratio",
      titleFr: "Comparer deux quantités avec un rapport",
      concept: "Using ratio language to describe and compare the relative sizes of two quantities",
      conceptFr: "Utiliser le langage des rapports pour décrire et comparer deux quantités",
      representation: "pictorial",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L5-1"],
      explanationMd:
        "A **ratio** compares two amounts part-to-part, like 2 : 3. A **fraction** compares a part to the whole.\n\n" +
        "If red to blue is 2 : 3, there are 5 parts altogether, so 2/5 are red and 3/5 are blue.",
      explanationMdFr:
        "Un **rapport** compare deux quantités partie à partie, comme 2 : 3. Une **fraction** compare une partie au tout.\n\n" +
        "Si rouge pour bleu vaut 2 : 3, il y a 5 parts en tout, donc 2/5 sont rouges et 3/5 sont bleus.",
      workedExamples: [
        { problem: "Red to blue counters is 2 : 3. There are 12 red. How many blue?", steps: ["2 parts stand for 12, so 1 part is 6.", "Blue is 3 parts: 3 x 6 = 18."], answer: "18" }
      ],
      workedExamplesFr: [
        { problem: "Le rapport jetons rouges / bleus est 2 : 3. Il y a 12 rouges. Combien de bleus ?", steps: ["2 parts valent 12, donc 1 part vaut 6.", "Le bleu, c'est 3 parts : 3 x 6 = 18."], answer: "18" }
      ],
      audioScript: "Find the value of one part first — then everything else follows.",
      audioScriptFr: "Trouve d'abord la valeur d'une part — tout le reste en découle."
    },
    {
      order: 2,
      title: "Unequal sharing",
      titleFr: "Le partage inégal",
      concept: "Sharing an amount in a given ratio using the number of parts",
      conceptFr: "Partager une quantité selon un rapport donné à l'aide du nombre de parts",
      representation: "pictorial",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L5-2"],
      explanationMd:
        "To share in a ratio, add the ratio numbers to find how many parts there are, divide the total by that, then multiply up for each share.\n\n" +
        "Drawing a bar split into the right number of parts makes this much easier to see.",
      explanationMdFr:
        "Pour partager selon un rapport, additionne les nombres du rapport pour trouver le nombre de parts, divise le total par ce nombre, puis multiplie pour chaque part.\n\n" +
        "Dessiner une barre découpée au bon nombre de parts rend cela beaucoup plus clair.",
      workedExamples: [
        { problem: "Share £45 in the ratio 2 : 3.", steps: ["2 + 3 = 5 parts.", "£45 ÷ 5 = £9 per part.", "Shares are 2 x £9 = £18 and 3 x £9 = £27."], answer: "£18 and £27" }
      ],
      workedExamplesFr: [
        { problem: "Partage 45 £ dans le rapport 2 : 3.", steps: ["2 + 3 = 5 parts.", "45 £ ÷ 5 = 9 £ par part.", "Les parts sont 2 x 9 £ = 18 £ et 3 x 9 £ = 27 £."], answer: "18 £ et 27 £" }
      ],
      audioScript: "Add the parts, divide, then multiply back up for each share.",
      audioScriptFr: "Additionne les parts, divise, puis multiplie pour chaque part."
    },
    {
      order: 3,
      title: "Scale factors and similar shapes",
      titleFr: "Facteurs d'échelle et figures semblables",
      concept: "Using a scale factor to enlarge or reduce lengths",
      conceptFr: "Utiliser un facteur d'échelle pour agrandir ou réduire des longueurs",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L5-3"],
      explanationMd:
        "A **scale factor** tells you what to multiply every length by. A scale factor of 3 makes every side three times as long, and the shape keeps exactly the same angles.\n\n" +
        "To find a scale factor, divide a new length by the matching old length.",
      explanationMdFr:
        "Un **facteur d'échelle** indique par combien multiplier chaque longueur. Un facteur de 3 rend chaque côté trois fois plus long, et la figure garde exactement les mêmes angles.\n\n" +
        "Pour trouver un facteur d'échelle, divise une nouvelle longueur par l'ancienne correspondante.",
      workedExamples: [
        { problem: "A 4 cm side becomes 12 cm. What happens to a 7 cm side?", steps: ["Scale factor = 12 ÷ 4 = 3.", "7 x 3 = 21 cm."], answer: "21 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un côté de 4 cm devient 12 cm. Que devient un côté de 7 cm ?", steps: ["Facteur d'échelle = 12 ÷ 4 = 3.", "7 x 3 = 21 cm."], answer: "21 cm" }
      ],
      audioScript: "One scale factor multiplies every single length — angles never change.",
      audioScriptFr: "Un seul facteur d'échelle multiplie toutes les longueurs — les angles ne changent jamais."
    }
  ],
  Y6L6: [
    {
      order: 1,
      title: "Using formulae in words and symbols",
      titleFr: "Utiliser des formules en mots et en symboles",
      concept: "Substituting values into a simple formula written in words or algebra",
      conceptFr: "Remplacer des valeurs dans une formule simple écrite en mots ou en algèbre",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L6-1"],
      explanationMd:
        "A **formula** is a rule that works for any numbers you put in. Substituting means swapping each letter for its value and then calculating.\n\n" +
        "Remember that 3n means 3 x n, and work out multiplication before addition.",
      explanationMdFr:
        "Une **formule** est une règle qui fonctionne pour tous les nombres qu'on y met. Substituer veut dire remplacer chaque lettre par sa valeur, puis calculer.\n\n" +
        "Rappelle-toi que 3n signifie 3 x n, et fais la multiplication avant l'addition.",
      workedExamples: [
        { problem: "If C = 4n + 7, what is C when n = 6?", steps: ["4 x 6 = 24.", "24 + 7 = 31."], answer: "31" }
      ],
      workedExamplesFr: [
        { problem: "Si C = 4n + 7, que vaut C quand n = 6 ?", steps: ["4 x 6 = 24.", "24 + 7 = 31."], answer: "31" }
      ],
      audioScript: "Swap the letter for its number, then multiply before you add.",
      audioScriptFr: "Remplace la lettre par son nombre, puis multiplie avant d'additionner."
    },
    {
      order: 2,
      title: "Generating and describing linear sequences",
      titleFr: "Générer et décrire des suites arithmétiques",
      concept: "Finding the common difference and continuing or describing a linear sequence",
      conceptFr: "Trouver la raison et poursuivre ou décrire une suite arithmétique",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L6-2"],
      explanationMd:
        "In a **linear sequence** you add the same amount every time. That amount is the **common difference**.\n\n" +
        "Describing the sequence means saying the start and the step, for example \"start at 5 and add 4 each time\".",
      explanationMdFr:
        "Dans une **suite arithmétique**, on ajoute toujours la même quantité. Cette quantité est la **raison**.\n\n" +
        "Décrire la suite, c'est dire le départ et le pas, par exemple « commence à 5 et ajoute 4 chaque fois ».",
      workedExamples: [
        { problem: "Continue 5, 9, 13, 17, ...", steps: ["9 - 5 = 4, so the difference is 4.", "17 + 4 = 21, then 25."], answer: "21, 25" }
      ],
      workedExamplesFr: [
        { problem: "Poursuis 5, 9, 13, 17, ...", steps: ["9 - 5 = 4, donc la raison est 4.", "17 + 4 = 21, puis 25."], answer: "21, 25" }
      ],
      audioScript: "Look at the gaps between the terms — in a linear sequence they are all the same.",
      audioScriptFr: "Regarde les écarts entre les termes — dans une suite arithmétique ils sont tous égaux."
    },
    {
      order: 3,
      title: "Equations with two unknowns",
      titleFr: "Les équations à deux inconnues",
      concept: "Finding pairs of values that satisfy an equation with two unknowns",
      conceptFr: "Trouver des paires de valeurs qui vérifient une équation à deux inconnues",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L6-3"],
      explanationMd:
        "An equation like a + b = 10 has **many** solutions. Choosing a value for one letter fixes the other.\n\n" +
        "Working systematically — 0 and 10, 1 and 9, 2 and 8 — makes sure you find them all.",
      explanationMdFr:
        "Une équation comme a + b = 10 a **beaucoup** de solutions. Choisir une valeur pour une lettre fixe l'autre.\n\n" +
        "Travailler systématiquement — 0 et 10, 1 et 9, 2 et 8 — garantit de les trouver toutes.",
      workedExamples: [
        { problem: "Find three whole-number pairs with 2a + b = 12.", steps: ["If a = 1, b = 10.", "If a = 2, b = 8.", "If a = 3, b = 6."], answer: "(1, 10), (2, 8), (3, 6)" }
      ],
      workedExamplesFr: [
        { problem: "Trouve trois paires d'entiers avec 2a + b = 12.", steps: ["Si a = 1, b = 10.", "Si a = 2, b = 8.", "Si a = 3, b = 6."], answer: "(1, 10), (2, 8), (3, 6)" }
      ],
      audioScript: "Pick a value for one letter, work out the other, then move up one and repeat.",
      audioScriptFr: "Choisis une valeur pour une lettre, calcule l'autre, puis passe à la suivante et recommence."
    }
  ],
  Y6L7: [
    {
      order: 1,
      title: "Area of triangles and parallelograms",
      titleFr: "L'aire des triangles et des parallélogrammes",
      concept: "Using base and perpendicular height to find the area of triangles and parallelograms",
      conceptFr: "Utiliser la base et la hauteur perpendiculaire pour trouver l'aire des triangles et des parallélogrammes",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L7-1"],
      explanationMd:
        "A parallelogram has area **base x perpendicular height** — slide the slanted end across and it becomes a rectangle.\n\n" +
        "A triangle is exactly half of that parallelogram, so its area is **½ x base x perpendicular height**. The height must be at right angles to the base, not the slanted side.",
      explanationMdFr:
        "Un parallélogramme a pour aire **base x hauteur perpendiculaire** — glisse l'extrémité inclinée et il devient un rectangle.\n\n" +
        "Un triangle est exactement la moitié de ce parallélogramme, donc son aire est **½ x base x hauteur perpendiculaire**. La hauteur doit être perpendiculaire à la base, pas le côté incliné.",
      workedExamples: [
        { problem: "A triangle has base 12 cm and height 5 cm. Find its area.", steps: ["½ x 12 x 5.", "12 x 5 = 60, half of 60 is 30."], answer: "30 cm²" },
        { problem: "A parallelogram has base 9 cm and height 4 cm.", steps: ["Area = base x height.", "9 x 4 = 36."], answer: "36 cm²" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle a une base de 12 cm et une hauteur de 5 cm. Trouve son aire.", steps: ["½ x 12 x 5.", "12 x 5 = 60, la moitié de 60 est 30."], answer: "30 cm²" },
        { problem: "Un parallélogramme a une base de 9 cm et une hauteur de 4 cm.", steps: ["Aire = base x hauteur.", "9 x 4 = 36."], answer: "36 cm²" }
      ],
      audioScript: "Use the perpendicular height, not the slanted side — and halve it for a triangle.",
      audioScriptFr: "Utilise la hauteur perpendiculaire, pas le côté incliné — et divise par 2 pour un triangle."
    },
    {
      order: 2,
      title: "Volume of cubes and cuboids",
      titleFr: "Le volume des cubes et des pavés droits",
      concept: "Finding volume by multiplying length, width and height",
      conceptFr: "Trouver le volume en multipliant longueur, largeur et hauteur",
      representation: "concrete",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L7-2"],
      explanationMd:
        "**Volume** is the space inside a solid, measured in cubic units such as cm³. For a cuboid it is **length x width x height**.\n\n" +
        "Imagine filling the box with centimetre cubes: one layer is length x width, and you need height layers.",
      explanationMdFr:
        "Le **volume** est l'espace à l'intérieur d'un solide, mesuré en unités cubes comme le cm³. Pour un pavé droit, c'est **longueur x largeur x hauteur**.\n\n" +
        "Imagine remplir la boîte de cubes de 1 cm : une couche fait longueur x largeur, et il faut « hauteur » couches.",
      workedExamples: [
        { problem: "Find the volume of a 6 cm by 4 cm by 3 cm cuboid.", steps: ["One layer is 6 x 4 = 24 cubes.", "There are 3 layers: 24 x 3 = 72."], answer: "72 cm³" }
      ],
      workedExamplesFr: [
        { problem: "Trouve le volume d'un pavé de 6 cm sur 4 cm sur 3 cm.", steps: ["Une couche fait 6 x 4 = 24 cubes.", "Il y a 3 couches : 24 x 3 = 72."], answer: "72 cm³" }
      ],
      audioScript: "Count one layer of cubes, then multiply by the number of layers.",
      audioScriptFr: "Compte une couche de cubes, puis multiplie par le nombre de couches."
    },
    {
      order: 3,
      title: "Converting metric units, miles and kilometres",
      titleFr: "Convertir les unités métriques, les miles et les kilomètres",
      concept: "Converting between metric units and approximating between miles and kilometres",
      conceptFr: "Convertir entre unités métriques et approximer entre miles et kilomètres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L7-3"],
      explanationMd:
        "Metric conversions are all powers of ten: 10 mm = 1 cm, 100 cm = 1 m, 1,000 m = 1 km, 1,000 g = 1 kg, 1,000 ml = 1 litre.\n\n" +
        "Miles and kilometres are not metric partners, so we use the approximation **5 miles ≈ 8 km**.",
      explanationMdFr:
        "Les conversions métriques sont toutes des puissances de dix : 10 mm = 1 cm, 100 cm = 1 m, 1 000 m = 1 km, 1 000 g = 1 kg, 1 000 ml = 1 litre.\n\n" +
        "Les miles et les kilomètres ne sont pas des unités métriques apparentées : on utilise l'approximation **5 miles ≈ 8 km**.",
      workedExamples: [
        { problem: "Convert 40 miles to kilometres.", steps: ["40 ÷ 5 = 8 lots of 5 miles.", "8 x 8 km = 64 km."], answer: "about 64 km" }
      ],
      workedExamplesFr: [
        { problem: "Convertis 40 miles en kilomètres.", steps: ["40 ÷ 5 = 8 groupes de 5 miles.", "8 x 8 km = 64 km."], answer: "environ 64 km" }
      ],
      audioScript: "Five miles is about eight kilometres — divide by five, then multiply by eight.",
      audioScriptFr: "Cinq miles valent environ huit kilomètres — divise par cinq, puis multiplie par huit."
    }
  ],
  Y6L8: [
    {
      order: 1,
      title: "Missing angles in triangles, quadrilaterals and polygons",
      titleFr: "Les angles manquants dans les triangles, quadrilatères et polygones",
      concept: "Using angle sums to find unknown angles in polygons",
      conceptFr: "Utiliser les sommes d'angles pour trouver des angles inconnus dans les polygones",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L8-1"],
      explanationMd:
        "Angles in a triangle add to **180°** and angles in a quadrilateral add to **360°**. For a regular polygon with n sides, each exterior angle is 360° ÷ n.\n\n" +
        "Subtract the angles you know from the total to find the one you don't.",
      explanationMdFr:
        "Les angles d'un triangle ont pour somme **180°** et ceux d'un quadrilatère **360°**. Pour un polygone régulier à n côtés, chaque angle extérieur vaut 360° ÷ n.\n\n" +
        "Retire les angles connus du total pour trouver celui qui manque.",
      workedExamples: [
        { problem: "Two angles of a triangle are 47° and 68°. Find the third.", steps: ["47 + 68 = 115.", "180 - 115 = 65."], answer: "65°" }
      ],
      workedExamplesFr: [
        { problem: "Deux angles d'un triangle valent 47° et 68°. Trouve le troisième.", steps: ["47 + 68 = 115.", "180 - 115 = 65."], answer: "65°" }
      ],
      audioScript: "Know your angle sums: 180 for a triangle, 360 for a quadrilateral.",
      audioScriptFr: "Connais tes sommes d'angles : 180 pour un triangle, 360 pour un quadrilatère."
    },
    {
      order: 2,
      title: "Drawing shapes accurately",
      titleFr: "Dessiner des figures avec précision",
      concept: "Constructing 2D shapes from given lengths and angles",
      conceptFr: "Construire des figures planes à partir de longueurs et d'angles donnés",
      representation: "concrete",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L8-2"],
      explanationMd:
        "Accurate drawing needs a sharp pencil, a ruler and a protractor. Draw the given side first, measure the angle at one end, then draw the next side along that line.\n\n" +
        "Always check your lengths afterwards — a millimetre of drift at each step soon adds up.",
      explanationMdFr:
        "Un dessin précis demande un crayon bien taillé, une règle et un rapporteur. Trace d'abord le côté donné, mesure l'angle à une extrémité, puis trace le côté suivant le long de cette direction.\n\n" +
        "Vérifie toujours tes longueurs ensuite — un millimètre d'écart à chaque étape s'additionne vite.",
      workedExamples: [
        { problem: "Draw a triangle with a 6 cm base and angles of 50° and 60° at its ends.", steps: ["Draw the 6 cm base.", "Measure 50° at the left end and draw a line.", "Measure 60° at the right end; where the lines cross is the third vertex."], answer: "a correctly constructed triangle" }
      ],
      workedExamplesFr: [
        { problem: "Trace un triangle de base 6 cm avec des angles de 50° et 60° à ses extrémités.", steps: ["Trace la base de 6 cm.", "Mesure 50° à l'extrémité gauche et trace une ligne.", "Mesure 60° à l'extrémité droite ; l'intersection des lignes est le troisième sommet."], answer: "un triangle correctement construit" }
      ],
      audioScript: "Base first, then angles, then let the lines meet.",
      audioScriptFr: "D'abord la base, puis les angles, puis laisse les lignes se rencontrer."
    },
    {
      order: 3,
      title: "Coordinates in all four quadrants",
      titleFr: "Les coordonnées dans les quatre quadrants",
      concept: "Reading and plotting coordinates with negative values",
      conceptFr: "Lire et placer des coordonnées avec des valeurs négatives",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L8-3"],
      explanationMd:
        "Coordinates are always written (x, y) — **across first, then up or down**. Left of the y-axis x is negative; below the x-axis y is negative.\n\n" +
        "Reflecting in the y-axis changes the sign of x; reflecting in the x-axis changes the sign of y.",
      explanationMdFr:
        "Les coordonnées s'écrivent toujours (x, y) — **d'abord horizontalement, puis vers le haut ou le bas**. À gauche de l'axe des ordonnées, x est négatif ; sous l'axe des abscisses, y est négatif.\n\n" +
        "Une réflexion par l'axe des ordonnées change le signe de x ; par l'axe des abscisses, celui de y.",
      workedExamples: [
        { problem: "Reflect (3, -2) in the y-axis.", steps: ["Reflecting in the y-axis changes the sign of x.", "(3, -2) becomes (-3, -2)."], answer: "(-3, -2)" }
      ],
      workedExamplesFr: [
        { problem: "Réfléchis (3, -2) par l'axe des ordonnées.", steps: ["La réflexion par l'axe des ordonnées change le signe de x.", "(3, -2) devient (-3, -2)."], answer: "(-3, -2)" }
      ],
      audioScript: "Across then up — and watch for the minus signs in the other three quadrants.",
      audioScriptFr: "D'abord horizontalement, puis verticalement — et attention aux signes moins dans les trois autres quadrants."
    }
  ],
  Y6L9: [
    {
      order: 1,
      title: "Reading and constructing pie charts",
      titleFr: "Lire et construire des diagrammes circulaires",
      concept: "Using the 360° in a full circle to read and draw pie charts",
      conceptFr: "Utiliser les 360° du cercle complet pour lire et tracer des diagrammes circulaires",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L9-1"],
      explanationMd:
        "A pie chart shows how a whole is split up. The whole circle is **360°**, so each item's angle is its share of the total multiplied by 360.\n\n" +
        "Reading one works in reverse: an angle of 90° is a quarter of the circle, so it stands for a quarter of the total.",
      explanationMdFr:
        "Un diagramme circulaire montre comment un tout est partagé. Le cercle entier fait **360°**, donc l'angle de chaque élément est sa part du total multipliée par 360.\n\n" +
        "La lecture fonctionne à l'inverse : un angle de 90° est le quart du cercle, donc il représente le quart du total.",
      workedExamples: [
        { problem: "60 people are surveyed and 15 choose tea. What angle shows tea?", steps: ["15 out of 60 is a quarter.", "A quarter of 360° is 90°."], answer: "90°" }
      ],
      workedExamplesFr: [
        { problem: "60 personnes sont interrogées et 15 choisissent le thé. Quel angle représente le thé ?", steps: ["15 sur 60, c'est un quart.", "Un quart de 360° fait 90°."], answer: "90°" }
      ],
      audioScript: "The whole circle is 360 degrees — every slice is a share of that.",
      audioScriptFr: "Le cercle entier fait 360 degrés — chaque part en est une fraction."
    },
    {
      order: 2,
      title: "Line graphs",
      titleFr: "Les graphiques linéaires",
      concept: "Reading values and trends from a line graph",
      conceptFr: "Lire des valeurs et des tendances sur un graphique linéaire",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L9-1"],
      explanationMd:
        "A line graph shows how something changes over time. Check the scale on each axis before reading any value.\n\n" +
        "A steeper line means a faster change, a flat line means no change, and a downward line means a decrease.",
      explanationMdFr:
        "Un graphique linéaire montre comment une grandeur évolue dans le temps. Vérifie l'échelle de chaque axe avant de lire une valeur.\n\n" +
        "Une ligne plus raide signifie un changement plus rapide, une ligne plate aucun changement, et une ligne descendante une diminution.",
      workedExamples: [
        { problem: "A graph rises from 4°C at 6am to 16°C at noon. What is the increase?", steps: ["Read both values from the vertical axis.", "16 - 4 = 12."], answer: "12°C" }
      ],
      workedExamplesFr: [
        { problem: "Un graphique monte de 4 °C à 6 h à 16 °C à midi. Quelle est l'augmentation ?", steps: ["Lis les deux valeurs sur l'axe vertical.", "16 - 4 = 12."], answer: "12 °C" }
      ],
      audioScript: "Check the scale first, then read across and down carefully.",
      audioScriptFr: "Vérifie d'abord l'échelle, puis lis horizontalement et verticalement avec soin."
    },
    {
      order: 3,
      title: "The mean as an average",
      titleFr: "La moyenne",
      concept: "Calculating the mean by sharing the total equally between the values",
      conceptFr: "Calculer la moyenne en partageant le total équitablement entre les valeurs",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L9-2"],
      explanationMd:
        "The **mean** levels everything out: add all the values, then divide by how many there are.\n\n" +
        "You can also work backwards — if you know the mean and how many values there are, multiplying gives the total.",
      explanationMdFr:
        "La **moyenne** égalise tout : additionne toutes les valeurs, puis divise par leur nombre.\n\n" +
        "Tu peux aussi raisonner à l'envers — si tu connais la moyenne et le nombre de valeurs, la multiplication donne le total.",
      workedExamples: [
        { problem: "Find the mean of 4, 9, 11 and 8.", steps: ["4 + 9 + 11 + 8 = 32.", "32 ÷ 4 = 8."], answer: "8" },
        { problem: "Five scores have a mean of 12. What is their total?", steps: ["Total = mean x how many.", "12 x 5 = 60."], answer: "60" }
      ],
      workedExamplesFr: [
        { problem: "Trouve la moyenne de 4, 9, 11 et 8.", steps: ["4 + 9 + 11 + 8 = 32.", "32 ÷ 4 = 8."], answer: "8" },
        { problem: "Cinq notes ont une moyenne de 12. Quel est leur total ?", steps: ["Total = moyenne x nombre de valeurs.", "12 x 5 = 60."], answer: "60" }
      ],
      audioScript: "Add them all up, then share equally — that's the mean.",
      audioScriptFr: "Additionne tout, puis partage équitablement — c'est la moyenne."
    }
  ],
  Y6L10: [
    {
      order: 1,
      title: "Reasoning with place value and the four operations",
      titleFr: "Raisonner avec la valeur de position et les quatre opérations",
      concept: "Choosing an efficient method and checking it with estimation",
      conceptFr: "Choisir une méthode efficace et la vérifier par estimation",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L10-1"],
      explanationMd:
        "In a reasoning question, read it twice: decide what is being asked, then pick the operation and method that gets there with least work.\n\n" +
        "Estimate first by rounding — if your exact answer is nowhere near the estimate, something has gone wrong.",
      explanationMdFr:
        "Dans une question de raisonnement, lis-la deux fois : décide ce qui est demandé, puis choisis l'opération et la méthode les plus directes.\n\n" +
        "Estime d'abord en arrondissant — si ta réponse exacte est loin de l'estimation, il y a une erreur.",
      workedExamples: [
        { problem: "A shop sells 1,860 tickets at £12 each. Roughly, then exactly, how much is that?", steps: ["Estimate: 2,000 x £12 = £24,000.", "Exactly: 1,860 x 12 = £22,320.", "That is close to the estimate, so it is sensible."], answer: "£22,320" }
      ],
      workedExamplesFr: [
        { problem: "Un magasin vend 1 860 billets à 12 £ chacun. Approximativement, puis exactement, combien cela fait-il ?", steps: ["Estimation : 2 000 x 12 £ = 24 000 £.", "Exactement : 1 860 x 12 = 22 320 £.", "C'est proche de l'estimation, donc c'est cohérent."], answer: "22 320 £" }
      ],
      audioScript: "Estimate first, calculate second, then check the two agree.",
      audioScriptFr: "Estime d'abord, calcule ensuite, puis vérifie que les deux concordent."
    },
    {
      order: 2,
      title: "Multi-step fractions, percentages, ratio and algebra",
      titleFr: "Fractions, pourcentages, rapports et algèbre en plusieurs étapes",
      concept: "Breaking a multi-step problem into single steps and keeping track of each answer",
      conceptFr: "Découper un problème en plusieurs étapes et garder la trace de chaque résultat",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L10-2"],
      explanationMd:
        "Multi-step problems are easier if you write down what each step gives you before starting the next one.\n\n" +
        "A bar model is a quick way to see what fraction, percentage or ratio of the whole you are working with.",
      explanationMdFr:
        "Les problèmes à plusieurs étapes sont plus simples si tu notes le résultat de chaque étape avant de passer à la suivante.\n\n" +
        "Un schéma en barres est un moyen rapide de voir quelle fraction, quel pourcentage ou quel rapport du tout tu manipules.",
      workedExamples: [
        { problem: "A coat costs £80. The price rises by 25%, then 10% is taken off. What is the final price?", steps: ["25% of £80 = £20, so the price becomes £100.", "10% of £100 = £10.", "£100 - £10 = £90."], answer: "£90" }
      ],
      workedExamplesFr: [
        { problem: "Un manteau coûte 80 £. Le prix augmente de 25 %, puis on retire 10 %. Quel est le prix final ?", steps: ["25 % de 80 £ = 20 £, donc le prix devient 100 £.", "10 % de 100 £ = 10 £.", "100 £ - 10 £ = 90 £."], answer: "90 £" }
      ],
      audioScript: "One step at a time, writing each answer down before you move on.",
      audioScriptFr: "Une étape à la fois, en notant chaque résultat avant de continuer."
    },
    {
      order: 3,
      title: "SATs-style measurement, geometry and statistics",
      titleFr: "Mesures, géométrie et statistiques façon examen",
      concept: "Applying area, volume, angle and average facts to reasoning questions",
      conceptFr: "Appliquer les faits sur l'aire, le volume, les angles et les moyennes à des questions de raisonnement",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y6-L10-3"],
      explanationMd:
        "These questions usually need one fact plus one calculation: an angle sum, an area or volume formula, or the mean.\n\n" +
        "Check the units in the question and in your answer — cm and cm², or cm² and cm³, are easy to mix up under pressure.",
      explanationMdFr:
        "Ces questions demandent en général un fait plus un calcul : une somme d'angles, une formule d'aire ou de volume, ou la moyenne.\n\n" +
        "Vérifie les unités dans la question et dans ta réponse — cm et cm², ou cm² et cm³, se confondent facilement sous pression.",
      workedExamples: [
        { problem: "A cuboid is 5 cm by 4 cm by 2 cm. What is its volume, and what is the area of its largest face?", steps: ["Volume = 5 x 4 x 2 = 40 cm³.", "The largest face is 5 x 4 = 20 cm²."], answer: "40 cm³ and 20 cm²" }
      ],
      workedExamplesFr: [
        { problem: "Un pavé droit mesure 5 cm sur 4 cm sur 2 cm. Quel est son volume, et quelle est l'aire de sa plus grande face ?", steps: ["Volume = 5 x 4 x 2 = 40 cm³.", "La plus grande face fait 5 x 4 = 20 cm²."], answer: "40 cm³ et 20 cm²" }
      ],
      audioScript: "One fact, one calculation — and always check the units.",
      audioScriptFr: "Un fait, un calcul — et vérifie toujours les unités."
    }
  ],
  Y10L2: [
    {
      order: 1,
      title: "Direct and inverse proportion",
      titleFr: "Proportionnalité directe et inverse",
      concept: "Recognising direct and inverse proportion and writing them algebraically",
      conceptFr: "Reconnaître la proportionnalité directe et inverse et les écrire algébriquement",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L2-1"],
      explanationMd:
        "In **direct proportion**, y = kx: double x and y doubles, and the graph is a straight line through the origin.\n\n" +
        "In **inverse proportion**, y = k/x: double x and y halves, and the graph is a curve that never touches the axes. In both cases, find k from one given pair of values first.",
      explanationMdFr:
        "En **proportionnalité directe**, y = kx : si x double, y double, et le graphique est une droite passant par l'origine.\n\n" +
        "En **proportionnalité inverse**, y = k/x : si x double, y est divisé par deux, et le graphique est une courbe qui ne touche jamais les axes. Dans les deux cas, trouve d'abord k à partir d'un couple de valeurs donné.",
      workedExamples: [
        { problem: "y is directly proportional to x, and y = 21 when x = 3. Find y when x = 8.", steps: ["k = 21 ÷ 3 = 7, so y = 7x.", "y = 7 x 8 = 56."], answer: "56" },
        { problem: "y is inversely proportional to x, and y = 6 when x = 4. Find y when x = 12.", steps: ["k = 6 x 4 = 24, so y = 24/x.", "y = 24 ÷ 12 = 2."], answer: "2" }
      ],
      workedExamplesFr: [
        { problem: "y est directement proportionnel à x, et y = 21 quand x = 3. Trouve y quand x = 8.", steps: ["k = 21 ÷ 3 = 7, donc y = 7x.", "y = 7 x 8 = 56."], answer: "56" },
        { problem: "y est inversement proportionnel à x, et y = 6 quand x = 4. Trouve y quand x = 12.", steps: ["k = 6 x 4 = 24, donc y = 24/x.", "y = 24 ÷ 12 = 2."], answer: "2" }
      ],
      audioScript: "Find the constant k from the pair you are given, then use the rule for any other value.",
      audioScriptFr: "Trouve la constante k à partir du couple donné, puis utilise la règle pour toute autre valeur."
    },
    {
      order: 2,
      title: "Growth, decay and compound interest",
      titleFr: "Croissance, décroissance et intérêts composés",
      concept: "Using a repeated multiplier to model percentage growth and decay",
      conceptFr: "Utiliser un multiplicateur répété pour modéliser croissance et décroissance en pourcentage",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L2-2"],
      explanationMd:
        "Compound growth applies the same **multiplier** again and again. A 5% rise has multiplier 1.05; a 5% fall has multiplier 0.95.\n\n" +
        "After n years the amount is start x multiplier^n. This is not the same as adding 5% of the original each time — later years grow from a larger base.",
      explanationMdFr:
        "La croissance composée applique le même **multiplicateur** encore et encore. Une hausse de 5 % a pour multiplicateur 1,05 ; une baisse de 5 %, 0,95.\n\n" +
        "Après n années, le montant vaut départ x multiplicateur^n. Ce n'est pas la même chose qu'ajouter 5 % du montant initial chaque fois — les années suivantes partent d'une base plus grande.",
      workedExamples: [
        { problem: "£2,000 is invested at 3% compound interest for 2 years.", steps: ["Multiplier is 1.03.", "2000 x 1.03² = 2000 x 1.0609.", "That is £2,121.80."], answer: "£2,121.80" }
      ],
      workedExamplesFr: [
        { problem: "2 000 £ sont placés à 3 % d'intérêts composés pendant 2 ans.", steps: ["Le multiplicateur est 1,03.", "2000 x 1,03² = 2000 x 1,0609.", "Soit 2 121,80 £."], answer: "2 121,80 £" }
      ],
      audioScript: "One multiplier, raised to the power of the number of years — that is compound growth.",
      audioScriptFr: "Un multiplicateur, élevé à la puissance du nombre d'années — c'est la croissance composée."
    },
    {
      order: 3,
      title: "Compound measures: speed, density and pressure",
      titleFr: "Grandeurs composées : vitesse, masse volumique et pression",
      concept: "Rearranging and using the speed, density and pressure formulae with consistent units",
      conceptFr: "Réarranger et utiliser les formules de vitesse, de masse volumique et de pression avec des unités cohérentes",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L2-3"],
      explanationMd:
        "A **compound measure** combines two units: speed = distance ÷ time, density = mass ÷ volume, pressure = force ÷ area.\n\n" +
        "Each one rearranges the same way, and the units tell you which is which — kg/m³ is a mass over a volume, so it must be a density.",
      explanationMdFr:
        "Une **grandeur composée** combine deux unités : vitesse = distance ÷ temps, masse volumique = masse ÷ volume, pression = force ÷ aire.\n\n" +
        "Chacune se réarrange de la même façon, et les unités t'indiquent laquelle est laquelle — kg/m³ est une masse sur un volume, donc c'est une masse volumique.",
      workedExamples: [
        { problem: "A block of mass 240 g has volume 30 cm³. Find its density.", steps: ["Density = mass ÷ volume.", "240 ÷ 30 = 8."], answer: "8 g/cm³" },
        { problem: "Convert 72 km/h to m/s.", steps: ["72 km = 72,000 m and 1 hour = 3,600 s.", "72,000 ÷ 3,600 = 20."], answer: "20 m/s" }
      ],
      workedExamplesFr: [
        { problem: "Un bloc de masse 240 g a un volume de 30 cm³. Trouve sa masse volumique.", steps: ["Masse volumique = masse ÷ volume.", "240 ÷ 30 = 8."], answer: "8 g/cm³" },
        { problem: "Convertis 72 km/h en m/s.", steps: ["72 km = 72 000 m et 1 heure = 3 600 s.", "72 000 ÷ 3 600 = 20."], answer: "20 m/s" }
      ],
      audioScript: "Read the units out loud — they tell you exactly which formula you need.",
      audioScriptFr: "Lis les unités à voix haute — elles t'indiquent exactement quelle formule utiliser."
    }
  ],
  Y10L3: [
    {
      order: 1,
      title: "Manipulating algebraic expressions",
      titleFr: "Manipuler des expressions algébriques",
      concept: "Expanding, factorising and simplifying expressions, including algebraic fractions",
      conceptFr: "Développer, factoriser et simplifier des expressions, y compris des fractions algébriques",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L3-1"],
      explanationMd:
        "Expanding removes brackets, factorising puts them back. Simplifying an **algebraic fraction** means factorising top and bottom and cancelling any common factor.\n\n" +
        "You can only cancel whole factors, never single terms — (x + 3)/(x + 5) does not simplify.",
      explanationMdFr:
        "Développer supprime les parenthèses, factoriser les remet. Simplifier une **fraction algébrique** signifie factoriser le numérateur et le dénominateur, puis simplifier le facteur commun.\n\n" +
        "On ne peut simplifier que des facteurs entiers, jamais des termes isolés — (x + 3)/(x + 5) ne se simplifie pas.",
      workedExamples: [
        { problem: "Simplify (x² + 5x + 6)/(x + 2).", steps: ["Factorise the top: (x + 2)(x + 3).", "Cancel the common factor (x + 2)."], answer: "x + 3" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie (x² + 5x + 6)/(x + 2).", steps: ["Factorise le numérateur : (x + 2)(x + 3).", "Simplifie le facteur commun (x + 2)."], answer: "x + 3" }
      ],
      audioScript: "Factorise top and bottom first — only then can you cancel.",
      audioScriptFr: "Factorise d'abord le haut et le bas — ce n'est qu'ensuite qu'on peut simplifier."
    },
    {
      order: 2,
      title: "Solving linear and quadratic equations",
      titleFr: "Résoudre des équations linéaires et quadratiques",
      concept: "Balancing linear equations and solving quadratics by factorising",
      conceptFr: "Équilibrer des équations linéaires et résoudre des équations quadratiques par factorisation",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L3-2"],
      explanationMd:
        "Linear equations are solved by doing the same thing to both sides until x is alone.\n\n" +
        "A quadratic must be rearranged to **= 0** first. Then factorise: if two things multiply to zero, at least one of them is zero, which gives the two solutions.",
      explanationMdFr:
        "Les équations linéaires se résolvent en faisant la même chose des deux côtés jusqu'à isoler x.\n\n" +
        "Une équation quadratique doit d'abord être ramenée à **= 0**. Ensuite, factorise : si un produit vaut zéro, au moins un facteur est nul, ce qui donne les deux solutions.",
      workedExamples: [
        { problem: "Solve x² + 7x + 12 = 0.", steps: ["Factorise: (x + 3)(x + 4) = 0.", "x + 3 = 0 or x + 4 = 0."], answer: "x = -3 or x = -4" }
      ],
      workedExamplesFr: [
        { problem: "Résous x² + 7x + 12 = 0.", steps: ["Factorise : (x + 3)(x + 4) = 0.", "x + 3 = 0 ou x + 4 = 0."], answer: "x = -3 ou x = -4" }
      ],
      audioScript: "Get the quadratic equal to zero, factorise, then set each bracket to zero.",
      audioScriptFr: "Ramène l'équation quadratique à zéro, factorise, puis annule chaque parenthèse."
    },
    {
      order: 3,
      title: "The nth term of linear and quadratic sequences",
      titleFr: "Le terme de rang n des suites arithmétiques et quadratiques",
      concept: "Deducing nth-term rules from first and second differences",
      conceptFr: "Déduire la formule du terme de rang n à partir des différences premières et secondes",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L3-3"],
      explanationMd:
        "For a **linear** sequence the first differences are constant: that difference is the coefficient of n, and the constant is found by checking term 1.\n\n" +
        "For a **quadratic** sequence the second differences are constant. Half of the second difference gives the coefficient of n².",
      explanationMdFr:
        "Pour une suite **arithmétique**, les différences premières sont constantes : cette différence est le coefficient de n, et la constante se trouve en vérifiant le premier terme.\n\n" +
        "Pour une suite **quadratique**, les différences secondes sont constantes. La moitié de la différence seconde donne le coefficient de n².",
      workedExamples: [
        { problem: "Find the nth term of 7, 11, 15, 19, ...", steps: ["First difference is 4, so start with 4n.", "4 x 1 = 4, but term 1 is 7, so add 3."], answer: "4n + 3" },
        { problem: "What is the n² coefficient for 3, 9, 19, 33, ...?", steps: ["First differences: 6, 10, 14.", "Second difference: 4.", "Half of 4 is 2."], answer: "2n²" }
      ],
      workedExamplesFr: [
        { problem: "Trouve le terme de rang n de 7, 11, 15, 19, ...", steps: ["La différence première est 4, donc commence par 4n.", "4 x 1 = 4, mais le premier terme est 7, donc ajoute 3."], answer: "4n + 3" },
        { problem: "Quel est le coefficient de n² pour 3, 9, 19, 33, ... ?", steps: ["Différences premières : 6, 10, 14.", "Différence seconde : 4.", "La moitié de 4 est 2."], answer: "2n²" }
      ],
      audioScript: "Constant first differences mean linear; constant second differences mean quadratic.",
      audioScriptFr: "Différences premières constantes : suite arithmétique ; différences secondes constantes : suite quadratique."
    }
  ],
  Y10L4: [
    {
      order: 1,
      title: "Three ways to solve a quadratic",
      titleFr: "Trois façons de résoudre une équation quadratique",
      concept: "Choosing between factorising, completing the square and the quadratic formula",
      conceptFr: "Choisir entre la factorisation, la complétion du carré et la formule quadratique",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L4-1"],
      explanationMd:
        "Try **factorising** first — it is quickest when it works. **Completing the square** is best when you also want the turning point. The **quadratic formula** always works.\n\n" +
        "The formula is x = (-b ± √(b² - 4ac)) ÷ 2a, and b² - 4ac tells you how many real solutions there are.",
      explanationMdFr:
        "Essaie d'abord la **factorisation** — c'est le plus rapide quand ça marche. La **complétion du carré** est idéale si tu veux aussi le sommet. La **formule quadratique** fonctionne toujours.\n\n" +
        "La formule est x = (-b ± √(b² - 4ac)) ÷ 2a, et b² - 4ac indique le nombre de solutions réelles.",
      workedExamples: [
        { problem: "Write x² + 6x + 1 in completed-square form.", steps: ["Half of 6 is 3, so start with (x + 3)².", "(x + 3)² = x² + 6x + 9, which is 8 too much.", "So x² + 6x + 1 = (x + 3)² - 8."], answer: "(x + 3)² - 8" }
      ],
      workedExamplesFr: [
        { problem: "Écris x² + 6x + 1 sous forme canonique.", steps: ["La moitié de 6 est 3, donc commence par (x + 3)².", "(x + 3)² = x² + 6x + 9, soit 8 de trop.", "Donc x² + 6x + 1 = (x + 3)² - 8."], answer: "(x + 3)² - 8" }
      ],
      audioScript: "Factorise if you can, complete the square if you need the turning point, use the formula if all else fails.",
      audioScriptFr: "Factorise si possible, complète le carré si tu veux le sommet, utilise la formule en dernier recours."
    },
    {
      order: 2,
      title: "Simultaneous equations",
      titleFr: "Les systèmes d'équations",
      concept: "Solving linear/linear by elimination and linear/quadratic by substitution",
      conceptFr: "Résoudre linéaire/linéaire par élimination et linéaire/quadratique par substitution",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L4-2"],
      explanationMd:
        "Two linear equations are solved by **elimination**: scale one or both so that one variable cancels when you add or subtract.\n\n" +
        "A linear and a quadratic are solved by **substitution**: rearrange the linear one and put it into the quadratic, which gives a quadratic in one variable.",
      explanationMdFr:
        "Deux équations linéaires se résolvent par **élimination** : multiplie l'une ou les deux pour qu'une variable disparaisse lors de l'addition ou de la soustraction.\n\n" +
        "Une linéaire et une quadratique se résolvent par **substitution** : réarrange la linéaire et remplace dans la quadratique, ce qui donne une équation quadratique à une inconnue.",
      workedExamples: [
        { problem: "Solve 3x + y = 14 and x + y = 6.", steps: ["Subtract the second from the first: 2x = 8.", "x = 4, so y = 6 - 4 = 2."], answer: "x = 4, y = 2" }
      ],
      workedExamplesFr: [
        { problem: "Résous 3x + y = 14 et x + y = 6.", steps: ["Soustrais la seconde de la première : 2x = 8.", "x = 4, donc y = 6 - 4 = 2."], answer: "x = 4, y = 2" }
      ],
      audioScript: "Line them up so one variable disappears — then solve what is left.",
      audioScriptFr: "Aligne-les pour qu'une variable disparaisse — puis résous ce qui reste."
    },
    {
      order: 3,
      title: "Reading solutions from a graph",
      titleFr: "Lire des solutions sur un graphique",
      concept: "Finding approximate solutions to equations from the points where graphs cross",
      conceptFr: "Trouver des solutions approchées à partir des points d'intersection des graphiques",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L4-3"],
      explanationMd:
        "Where a curve crosses the x-axis, y = 0, so those x values solve the equation = 0.\n\n" +
        "To solve something else, such as x² - 3 = x, draw both graphs and read the x values where they intersect. Graphical answers are approximate, so give them to the accuracy the scale allows.",
      explanationMdFr:
        "Là où une courbe coupe l'axe des abscisses, y = 0 : ces valeurs de x résolvent l'équation = 0.\n\n" +
        "Pour résoudre autre chose, comme x² - 3 = x, trace les deux graphiques et lis les valeurs de x aux intersections. Les réponses graphiques sont approchées : donne-les à la précision que permet l'échelle.",
      workedExamples: [
        { problem: "A curve crosses the x-axis at -1 and 4. What does that tell you?", steps: ["At the x-axis, y = 0.", "So the equation is solved by x = -1 and x = 4."], answer: "x = -1 and x = 4" }
      ],
      workedExamplesFr: [
        { problem: "Une courbe coupe l'axe des abscisses en -1 et 4. Qu'est-ce que cela indique ?", steps: ["Sur l'axe des abscisses, y = 0.", "Donc l'équation a pour solutions x = -1 et x = 4."], answer: "x = -1 et x = 4" }
      ],
      audioScript: "Crossing points are solutions — read the x values carefully off the scale.",
      audioScriptFr: "Les points d'intersection sont des solutions — lis soigneusement les valeurs de x sur l'échelle."
    }
  ],
  Y10L5: [
    {
      order: 1,
      title: "Plotting and recognising graphs",
      titleFr: "Tracer et reconnaître des graphiques",
      concept: "Linking the equation of a function to the shape of its graph",
      conceptFr: "Relier l'équation d'une fonction à la forme de son graphique",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L5-1"],
      explanationMd:
        "The highest power of x tells you the shape: power 1 gives a **straight line**, power 2 a **parabola**, power 3 an **S-shaped cubic**.\n\n" +
        "To plot any of them, build a table of values by substituting each x, then join the points smoothly.",
      explanationMdFr:
        "La plus haute puissance de x donne la forme : puissance 1 une **droite**, puissance 2 une **parabole**, puissance 3 une **cubique en S**.\n\n" +
        "Pour les tracer, construis un tableau de valeurs en remplaçant chaque x, puis relie les points régulièrement.",
      workedExamples: [
        { problem: "Find y when x = 3 on y = 2x² + 1.", steps: ["3² = 9.", "2 x 9 = 18, plus 1 is 19."], answer: "19" }
      ],
      workedExamplesFr: [
        { problem: "Trouve y quand x = 3 sur y = 2x² + 1.", steps: ["3² = 9.", "2 x 9 = 18, plus 1 égale 19."], answer: "19" }
      ],
      audioScript: "Look at the highest power first — it tells you the shape before you plot anything.",
      audioScriptFr: "Regarde d'abord la plus haute puissance — elle donne la forme avant même de tracer."
    },
    {
      order: 2,
      title: "Gradient as a rate of change",
      titleFr: "Le coefficient directeur comme taux de variation",
      concept: "Interpreting the gradient of a line in a real context",
      conceptFr: "Interpréter le coefficient directeur d'une droite dans un contexte réel",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L5-2"],
      explanationMd:
        "Gradient = change in y ÷ change in x. In y = mx + c, m is the gradient and c is where the line crosses the y-axis.\n\n" +
        "In context the gradient has units and a meaning: pounds per hour, metres per second, litres per minute.",
      explanationMdFr:
        "Coefficient directeur = variation de y ÷ variation de x. Dans y = mx + c, m est le coefficient directeur et c l'ordonnée à l'origine.\n\n" +
        "En contexte, le coefficient directeur a des unités et un sens : livres par heure, mètres par seconde, litres par minute.",
      workedExamples: [
        { problem: "A line passes through (2, 5) and (6, 17). Find its gradient.", steps: ["Change in y = 17 - 5 = 12.", "Change in x = 6 - 2 = 4.", "12 ÷ 4 = 3."], answer: "3" }
      ],
      workedExamplesFr: [
        { problem: "Une droite passe par (2, 5) et (6, 17). Trouve son coefficient directeur.", steps: ["Variation de y = 17 - 5 = 12.", "Variation de x = 6 - 2 = 4.", "12 ÷ 4 = 3."], answer: "3" }
      ],
      audioScript: "Up divided by across — and in a real problem, say what the units mean.",
      audioScriptFr: "La montée divisée par le déplacement — et dans un problème réel, précise le sens des unités."
    },
    {
      order: 3,
      title: "Graphs of direct and inverse proportion",
      titleFr: "Graphiques de proportionnalité directe et inverse",
      concept: "Recognising proportion relationships from the shape of a graph",
      conceptFr: "Reconnaître des relations de proportionnalité d'après la forme d'un graphique",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L5-3"],
      explanationMd:
        "**Direct proportion** is the only straight line that passes through the origin — a constant term lifts the line off (0, 0) and breaks the proportion.\n\n" +
        "**Inverse proportion** gives a curve that falls steeply then flattens, approaching but never touching the axes.",
      explanationMdFr:
        "La **proportionnalité directe** est la seule droite qui passe par l'origine — un terme constant décale la droite de (0, 0) et brise la proportionnalité.\n\n" +
        "La **proportionnalité inverse** donne une courbe qui descend fortement puis s'aplatit, s'approchant des axes sans jamais les toucher.",
      workedExamples: [
        { problem: "Is y = 4x + 3 a direct proportion?", steps: ["Substitute x = 0: y = 3, not 0.", "The line misses the origin."], answer: "No" }
      ],
      workedExamplesFr: [
        { problem: "y = 4x + 3 est-elle une proportionnalité directe ?", steps: ["Remplace x par 0 : y = 3, pas 0.", "La droite ne passe pas par l'origine."], answer: "Non" }
      ],
      audioScript: "Substitute zero — if y is not zero too, it is not direct proportion.",
      audioScriptFr: "Remplace x par zéro — si y n'est pas nul aussi, ce n'est pas une proportionnalité directe."
    }
  ],
  Y10L6: [
    {
      order: 1,
      title: "The four congruence conditions",
      titleFr: "Les quatre conditions d'isométrie",
      concept: "Deciding whether two triangles must be congruent using SSS, SAS, ASA or RHS",
      conceptFr: "Décider si deux triangles sont forcément isométriques avec SSS, SAS, ASA ou RHS",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L6-1"],
      explanationMd:
        "Two triangles are **congruent** when they are identical in shape and size. Only four sets of facts guarantee it: **SSS**, **SAS** (the angle between the two sides), **ASA** (the side between the two angles) and **RHS**.\n\n" +
        "Equal angles alone are not enough — that only makes the triangles similar.",
      explanationMdFr:
        "Deux triangles sont **isométriques** quand ils sont identiques en forme et en taille. Seuls quatre ensembles de données le garantissent : **SSS**, **SAS** (l'angle entre les deux côtés), **ASA** (le côté entre les deux angles) et **RHS**.\n\n" +
        "Des angles égaux seuls ne suffisent pas — cela rend seulement les triangles semblables.",
      workedExamples: [
        { problem: "Two triangles share a right angle, a 13 cm hypotenuse and a 5 cm side. Are they congruent?", steps: ["Right angle, hypotenuse and another side is the RHS condition.", "RHS guarantees congruence."], answer: "Yes, by RHS" }
      ],
      workedExamplesFr: [
        { problem: "Deux triangles ont un angle droit, une hypoténuse de 13 cm et un côté de 5 cm. Sont-ils isométriques ?", steps: ["Angle droit, hypoténuse et un autre côté : c'est la condition RHS.", "RHS garantit l'isométrie."], answer: "Oui, par RHS" }
      ],
      audioScript: "Count the sides and angles, and check where the angle sits — that decides the condition.",
      audioScriptFr: "Compte les côtés et les angles, et regarde où se trouve l'angle — cela détermine la condition."
    },
    {
      order: 2,
      title: "Similar shapes: lengths, areas and volumes",
      titleFr: "Figures semblables : longueurs, aires et volumes",
      concept: "Scaling lengths by k, areas by k² and volumes by k³",
      conceptFr: "Multiplier les longueurs par k, les aires par k² et les volumes par k³",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L6-2"],
      explanationMd:
        "Similar shapes have equal angles and all lengths in the same ratio. If lengths scale by **k**, areas scale by **k²** and volumes by **k³**.\n\n" +
        "Working backwards, take the square root of an area ratio or the cube root of a volume ratio to get the length scale factor.",
      explanationMdFr:
        "Les figures semblables ont des angles égaux et toutes leurs longueurs dans le même rapport. Si les longueurs sont multipliées par **k**, les aires le sont par **k²** et les volumes par **k³**.\n\n" +
        "À l'inverse, prends la racine carrée d'un rapport d'aires ou la racine cubique d'un rapport de volumes pour obtenir le facteur d'échelle des longueurs.",
      workedExamples: [
        { problem: "Two similar solids have lengths in the ratio 1 : 3. The smaller has volume 20 cm³.", steps: ["Volume scale factor is 3³ = 27.", "20 x 27 = 540."], answer: "540 cm³" }
      ],
      workedExamplesFr: [
        { problem: "Deux solides semblables ont des longueurs dans le rapport 1 : 3. Le plus petit a un volume de 20 cm³.", steps: ["Le facteur d'échelle des volumes est 3³ = 27.", "20 x 27 = 540."], answer: "540 cm³" }
      ],
      audioScript: "Lengths k, areas k squared, volumes k cubed — never mix them up.",
      audioScriptFr: "Longueurs k, aires k au carré, volumes k au cube — ne les confonds jamais."
    },
    {
      order: 3,
      title: "Building a geometric argument",
      titleFr: "Construire un raisonnement géométrique",
      concept: "Chaining angle facts together and quoting a reason at every step",
      conceptFr: "Enchaîner des propriétés sur les angles en justifiant chaque étape",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L6-3"],
      explanationMd:
        "A geometric proof is a chain of statements where every step has a **reason**: alternate angles are equal, corresponding angles are equal, co-interior angles add to 180°, angles in a triangle add to 180°.\n\n" +
        "Marks are given for the reasons as much as the numbers, so write them down every time.",
      explanationMdFr:
        "Une démonstration géométrique est une chaîne d'affirmations où chaque étape a une **raison** : les angles alternes-internes sont égaux, les angles correspondants sont égaux, les angles co-intérieurs ont pour somme 180°, la somme des angles d'un triangle vaut 180°.\n\n" +
        "Les points vont autant aux justifications qu'aux nombres : écris-les à chaque fois.",
      workedExamples: [
        { problem: "In an isosceles triangle the apex angle is 40°. Find a base angle, giving reasons.", steps: ["The base angles are equal (isosceles triangle).", "180 - 40 = 140 (angles in a triangle add to 180°).", "140 ÷ 2 = 70."], answer: "70°" }
      ],
      workedExamplesFr: [
        { problem: "Dans un triangle isocèle, l'angle au sommet vaut 40°. Trouve un angle à la base en justifiant.", steps: ["Les angles à la base sont égaux (triangle isocèle).", "180 - 40 = 140 (la somme des angles d'un triangle vaut 180°).", "140 ÷ 2 = 70."], answer: "70°" }
      ],
      audioScript: "Every line needs a reason — write the fact you used next to each number.",
      audioScriptFr: "Chaque ligne a besoin d'une justification — écris la propriété utilisée à côté de chaque nombre."
    }
  ],
  Y10L7: [
    {
      order: 1,
      title: "Pythagoras in 2D and 3D",
      titleFr: "Pythagore en 2D et en 3D",
      concept: "Using a² + b² = c² in triangles and extending it to the diagonal of a cuboid",
      conceptFr: "Utiliser a² + b² = c² dans les triangles et l'étendre à la diagonale d'un pavé droit",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L7-1"],
      explanationMd:
        "In a right-angled triangle, a² + b² = c², where c is the hypotenuse. To find a shorter side, subtract instead of adding.\n\n" +
        "In 3D you simply use it twice — across the base, then up to the far corner — which gives the shortcut √(a² + b² + c²).",
      explanationMdFr:
        "Dans un triangle rectangle, a² + b² = c², où c est l'hypoténuse. Pour trouver un côté court, soustrais au lieu d'additionner.\n\n" +
        "En 3D, on l'applique simplement deux fois — sur la base, puis jusqu'au coin opposé — ce qui donne le raccourci √(a² + b² + c²).",
      workedExamples: [
        { problem: "A cuboid is 2 cm by 3 cm by 6 cm. Find its space diagonal.", steps: ["2² + 3² + 6² = 4 + 9 + 36 = 49.", "√49 = 7."], answer: "7 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un pavé droit mesure 2 cm sur 3 cm sur 6 cm. Trouve sa diagonale d'espace.", steps: ["2² + 3² + 6² = 4 + 9 + 36 = 49.", "√49 = 7."], answer: "7 cm" }
      ],
      audioScript: "Square, add, square root — and in three dimensions just add one more square.",
      audioScriptFr: "Élève au carré, additionne, prends la racine — et en trois dimensions, ajoute simplement un carré de plus."
    },
    {
      order: 2,
      title: "Trigonometry in right-angled triangles",
      titleFr: "La trigonométrie dans les triangles rectangles",
      concept: "Choosing and using sine, cosine or tangent to find a side or an angle",
      conceptFr: "Choisir et utiliser le sinus, le cosinus ou la tangente pour trouver un côté ou un angle",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L7-1"],
      explanationMd:
        "Label the sides relative to the angle you are using: **opposite**, **adjacent** and **hypotenuse**. Then SOH CAH TOA tells you which ratio links the two sides you care about.\n\n" +
        "To find a missing angle, use the inverse functions sin⁻¹, cos⁻¹ or tan⁻¹.",
      explanationMdFr:
        "Nomme les côtés par rapport à l'angle utilisé : **opposé**, **adjacent** et **hypoténuse**. Ensuite SOH CAH TOA indique quel rapport relie les deux côtés concernés.\n\n" +
        "Pour trouver un angle manquant, utilise les fonctions inverses sin⁻¹, cos⁻¹ ou tan⁻¹.",
      workedExamples: [
        { problem: "A hypotenuse is 20 cm and the angle is 30°. Find the opposite side.", steps: ["Opposite and hypotenuse means sine.", "20 x sin 30° = 20 x 0.5 = 10."], answer: "10 cm" }
      ],
      workedExamplesFr: [
        { problem: "Une hypoténuse mesure 20 cm et l'angle vaut 30°. Trouve le côté opposé.", steps: ["Opposé et hypoténuse : c'est le sinus.", "20 x sin 30° = 20 x 0,5 = 10."], answer: "10 cm" }
      ],
      audioScript: "Label the sides first, then let SOH CAH TOA pick the ratio for you.",
      audioScriptFr: "Nomme d'abord les côtés, puis laisse SOH CAH TOA choisir le rapport."
    },
    {
      order: 3,
      title: "The sine rule, cosine rule and exact values",
      titleFr: "Loi des sinus, loi des cosinus et valeurs exactes",
      concept: "Extending trigonometry to non-right-angled triangles and recalling exact values",
      conceptFr: "Étendre la trigonométrie aux triangles quelconques et mémoriser les valeurs exactes",
      representation: "abstract",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L7-2", "Y10-L7-3"],
      explanationMd:
        "When a triangle has no right angle, use the **sine rule** a/sin A = b/sin B when you have a side with its opposite angle, and the **cosine rule** a² = b² + c² - 2bc cos A when you have three sides, or two sides and the angle between them. Area is ½ab sin C.\n\n" +
        "Some values should be known exactly: sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1, sin 60° = √3/2 and cos 30° = √3/2.",
      explanationMdFr:
        "Quand un triangle n'a pas d'angle droit, utilise la **loi des sinus** a/sin A = b/sin B si tu as un côté et l'angle opposé, et la **loi des cosinus** a² = b² + c² - 2bc cos A si tu as trois côtés, ou deux côtés et l'angle entre eux. L'aire vaut ½ab sin C.\n\n" +
        "Certaines valeurs doivent être connues exactement : sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1, sin 60° = √3/2 et cos 30° = √3/2.",
      workedExamples: [
        { problem: "A triangle has sides 7 cm and 9 cm with a 60° angle between them. Find its area.", steps: ["Area = ½ab sin C.", "½ x 7 x 9 x sin 60° = 31.5 x 0.866.", "That is 27.3 cm² to 1 d.p."], answer: "27.3 cm²" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle a des côtés de 7 cm et 9 cm avec un angle de 60° entre eux. Trouve son aire.", steps: ["Aire = ½ab sin C.", "½ x 7 x 9 x sin 60° = 31,5 x 0,866.", "Soit 27,3 cm² au dixième près."], answer: "27,3 cm²" }
      ],
      audioScript: "No right angle? Pair sides with opposite angles for the sine rule, or use the cosine rule.",
      audioScriptFr: "Pas d'angle droit ? Associe côtés et angles opposés pour la loi des sinus, ou utilise la loi des cosinus."
    }
  ],
  Y10L8: [
    {
      order: 1,
      title: "Circles, spheres and curved solids",
      titleFr: "Cercles, sphères et solides courbes",
      concept: "Using the circle and sphere formulae, in terms of pi and as decimals",
      conceptFr: "Utiliser les formules du cercle et de la sphère, en fonction de pi et en décimales",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L8-1"],
      explanationMd:
        "Circumference is **2πr**, area is **πr²**. A sphere has surface area **4πr²** and volume **4/3 πr³**.\n\n" +
        "Leaving π in your answer keeps it exact; multiplying it out gives a decimal you must round sensibly.",
      explanationMdFr:
        "La circonférence vaut **2πr**, l'aire **πr²**. Une sphère a pour aire **4πr²** et pour volume **4/3 πr³**.\n\n" +
        "Garder π dans la réponse la rend exacte ; en le développant, on obtient une décimale à arrondir judicieusement.",
      workedExamples: [
        { problem: "Find the area of a circle of radius 6 cm, in terms of π.", steps: ["Area = πr².", "6² = 36."], answer: "36π cm²" }
      ],
      workedExamplesFr: [
        { problem: "Trouve l'aire d'un cercle de rayon 6 cm, en fonction de π.", steps: ["Aire = πr².", "6² = 36."], answer: "36π cm²" }
      ],
      audioScript: "Square the radius for area, double it for circumference — and keep pi if you want an exact answer.",
      audioScriptFr: "Élève le rayon au carré pour l'aire, double-le pour la circonférence — et garde pi pour une réponse exacte."
    },
    {
      order: 2,
      title: "Surface area and volume of solids",
      titleFr: "Aire et volume des solides",
      concept: "Finding surface area face by face and volume as cross-section times length",
      conceptFr: "Trouver l'aire face par face et le volume comme section multipliée par la longueur",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L8-1"],
      explanationMd:
        "**Surface area** is the total of every face, so sketching the net stops you missing one. A cuboid has three pairs of identical faces.\n\n" +
        "For any **prism**, volume = area of cross-section x length. A cylinder is just a prism with a circular cross-section, so its volume is πr²h.",
      explanationMdFr:
        "L'**aire totale** est la somme de toutes les faces : dessiner le patron évite d'en oublier une. Un pavé droit a trois paires de faces identiques.\n\n" +
        "Pour tout **prisme**, volume = aire de la section x longueur. Un cylindre est un prisme à section circulaire, donc son volume est πr²h.",
      workedExamples: [
        { problem: "A cuboid is 5 cm by 3 cm by 2 cm. Find its surface area.", steps: ["Faces are 15, 10 and 6 cm².", "2 x (15 + 10 + 6) = 62."], answer: "62 cm²" }
      ],
      workedExamplesFr: [
        { problem: "Un pavé droit mesure 5 cm sur 3 cm sur 2 cm. Trouve son aire totale.", steps: ["Les faces valent 15, 10 et 6 cm².", "2 x (15 + 10 + 6) = 62."], answer: "62 cm²" }
      ],
      audioScript: "Sketch the net for surface area; use cross-section times length for volume.",
      audioScriptFr: "Dessine le patron pour l'aire ; utilise section x longueur pour le volume."
    },
    {
      order: 3,
      title: "Vectors and vector proof",
      titleFr: "Vecteurs et démonstration vectorielle",
      concept: "Adding, subtracting and scaling vectors, and using them to prove results",
      conceptFr: "Additionner, soustraire et multiplier des vecteurs, et les utiliser pour démontrer",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L8-2", "Y10-L8-3"],
      explanationMd:
        "A **vector** has size and direction and is written as a column: across on top, up underneath. Add and subtract component by component, and multiplying by a number scales both components.\n\n" +
        "Reversing a vector reverses its sign, so BA = -AB. In a proof, showing one vector is a **scalar multiple** of another proves the two are parallel.",
      explanationMdFr:
        "Un **vecteur** a une norme et une direction, et s'écrit en colonne : déplacement horizontal en haut, vertical en bas. On additionne et soustrait composante par composante, et multiplier par un nombre multiplie les deux composantes.\n\n" +
        "Inverser un vecteur change son signe, donc BA = -AB. Dans une démonstration, montrer qu'un vecteur est un **multiple scalaire** d'un autre prouve qu'ils sont parallèles.",
      workedExamples: [
        { problem: "In triangle OAB, M and N are midpoints of OA and OB. Show MN is parallel to AB.", steps: ["MN = ON - OM = ½OB - ½OA.", "That factorises to ½(OB - OA) = ½AB.", "MN is a scalar multiple of AB, so they are parallel."], answer: "MN = ½AB, so MN is parallel to AB" }
      ],
      workedExamplesFr: [
        { problem: "Dans le triangle OAB, M et N sont les milieux de OA et OB. Montre que MN est parallèle à AB.", steps: ["MN = ON - OM = ½OB - ½OA.", "Cela se factorise en ½(OB - OA) = ½AB.", "MN est un multiple scalaire de AB, donc ils sont parallèles."], answer: "MN = ½AB, donc MN est parallèle à AB" }
      ],
      audioScript: "A scalar multiple always means parallel — that is the heart of every vector proof.",
      audioScriptFr: "Un multiple scalaire signifie toujours parallèle — c'est le cœur de toute démonstration vectorielle."
    }
  ],
  Y10L9: [
    {
      order: 1,
      title: "Tree diagrams, Venn diagrams and conditional probability",
      titleFr: "Arbres, diagrammes de Venn et probabilité conditionnelle",
      concept: "Representing combined events and working with 'given that' probabilities",
      conceptFr: "Représenter des événements combinés et travailler avec les probabilités « sachant que »",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L9-1"],
      explanationMd:
        "On a **tree diagram** you multiply along the branches and add between them. For 'at least one', it is usually quicker to find the probability of none and subtract from 1.\n\n" +
        "**Conditional** probability means you are told something has already happened, so you only count that part of the sample space — a Venn diagram or a two-way table shows exactly which part.",
      explanationMdFr:
        "Sur un **arbre de probabilité**, on multiplie le long des branches et on additionne entre elles. Pour « au moins un », il est souvent plus rapide de calculer la probabilité d'aucun et de la retirer de 1.\n\n" +
        "Une probabilité **conditionnelle** signifie qu'on sait déjà qu'un événement s'est produit : on ne compte donc que cette partie de l'univers — un diagramme de Venn ou un tableau à double entrée montre exactement laquelle.",
      workedExamples: [
        { problem: "A bag has 5 red and 3 blue counters. Two are drawn without replacement. Find P(both red).", steps: ["First draw: 5/8.", "Second draw: 4/7 because one red has gone.", "5/8 x 4/7 = 20/56 = 5/14."], answer: "5/14" }
      ],
      workedExamplesFr: [
        { problem: "Un sac contient 5 jetons rouges et 3 bleus. On en tire deux sans remise. Trouve P(les deux rouges).", steps: ["Premier tirage : 5/8.", "Second tirage : 4/7 car un rouge est parti.", "5/8 x 4/7 = 20/56 = 5/14."], answer: "5/14" }
      ],
      audioScript: "Without replacement, both numbers change on the second branch — that is conditional probability.",
      audioScriptFr: "Sans remise, les deux nombres changent sur la seconde branche — c'est la probabilité conditionnelle."
    },
    {
      order: 2,
      title: "Sampling and bias",
      titleFr: "Échantillonnage et biais",
      concept: "Comparing sampling methods and judging whether a sample is representative",
      conceptFr: "Comparer des méthodes d'échantillonnage et juger si un échantillon est représentatif",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L9-2"],
      explanationMd:
        "A good sample is **large enough** and **representative**. Random sampling gives everyone an equal chance; stratified sampling takes a share from each group in proportion to its size; systematic sampling takes every nth name from an ordered list.\n\n" +
        "A sample is **biased** if some people could never be chosen, or if people chose themselves.",
      explanationMdFr:
        "Un bon échantillon est **assez grand** et **représentatif**. L'échantillonnage aléatoire donne à chacun la même chance ; l'échantillonnage stratifié prélève une part de chaque groupe proportionnelle à sa taille ; l'échantillonnage systématique prend un nom sur n dans une liste ordonnée.\n\n" +
        "Un échantillon est **biaisé** si certaines personnes ne peuvent jamais être choisies, ou si les gens se sont désignés eux-mêmes.",
      workedExamples: [
        { problem: "A school of 900 has 300 in Year 11. A stratified sample of 60 is taken. How many from Year 11?", steps: ["Year 11 is 300/900 = one third.", "One third of 60 = 20."], answer: "20" }
      ],
      workedExamplesFr: [
        { problem: "Une école de 900 élèves en compte 300 en Year 11. Un échantillon stratifié de 60 est prélevé. Combien viennent de Year 11 ?", steps: ["Year 11 représente 300/900 = un tiers.", "Un tiers de 60 = 20."], answer: "20" }
      ],
      audioScript: "Ask who could never be picked — that question finds the bias every time.",
      audioScriptFr: "Demande-toi qui ne pourrait jamais être choisi — cette question révèle le biais à chaque fois."
    },
    {
      order: 3,
      title: "Cumulative frequency, box plots and the interquartile range",
      titleFr: "Fréquences cumulées, boîtes à moustaches et écart interquartile",
      concept: "Estimating the median and quartiles and comparing distributions",
      conceptFr: "Estimer la médiane et les quartiles et comparer des distributions",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L9-3"],
      explanationMd:
        "On a cumulative frequency curve, read across at **half** the total frequency for the median, a **quarter** for Q1 and **three quarters** for Q3.\n\n" +
        "The **interquartile range** is Q3 - Q1. It describes the middle half only, so unlike the range it is not thrown off by one extreme value. A smaller IQR means more consistent data.",
      explanationMdFr:
        "Sur une courbe des fréquences cumulées, lis à la **moitié** de l'effectif total pour la médiane, au **quart** pour Q1 et aux **trois quarts** pour Q3.\n\n" +
        "L'**écart interquartile** vaut Q3 - Q1. Il ne décrit que la moitié centrale : contrairement à l'étendue, une valeur extrême ne le fausse pas. Un écart plus petit signifie des données plus régulières.",
      workedExamples: [
        { problem: "A box plot has Q1 = 32 and Q3 = 55. Find the interquartile range.", steps: ["IQR = Q3 - Q1.", "55 - 32 = 23."], answer: "23" }
      ],
      workedExamplesFr: [
        { problem: "Une boîte à moustaches a Q1 = 32 et Q3 = 55. Trouve l'écart interquartile.", steps: ["EIQ = Q3 - Q1.", "55 - 32 = 23."], answer: "23" }
      ],
      audioScript: "Median compares typical values; interquartile range compares consistency.",
      audioScriptFr: "La médiane compare les valeurs typiques ; l'écart interquartile compare la régularité."
    }
  ],
  Y10L10: [
    {
      order: 1,
      title: "Mixed number, ratio and proportion",
      titleFr: "Nombres, rapports et proportionnalité mélangés",
      concept: "Choosing the right number technique in an unlabelled GCSE-style question",
      conceptFr: "Choisir la bonne technique numérique dans une question d'examen non étiquetée",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L10-1"],
      explanationMd:
        "Exam questions rarely tell you the topic. Look for the signal: \"to the nearest\" means bounds, a repeated percentage means a multiplier, \"in the ratio\" means counting parts, and √ with a non-square number means surds.\n\n" +
        "Reverse percentages are the classic trap — always divide by the multiplier rather than subtracting the same percentage.",
      explanationMdFr:
        "Les questions d'examen indiquent rarement le thème. Repère l'indice : « au ... près » signale les bornes, un pourcentage répété un multiplicateur, « dans le rapport » un comptage de parts, et √ d'un nombre non carré des radicaux.\n\n" +
        "Les pourcentages inverses sont le piège classique — divise toujours par le multiplicateur au lieu de retirer le même pourcentage.",
      workedExamples: [
        { problem: "After a 20% increase a price is £96. Find the original price.", steps: ["The multiplier is 1.2.", "96 ÷ 1.2 = 80."], answer: "£80" }
      ],
      workedExamplesFr: [
        { problem: "Après une augmentation de 20 %, un prix vaut 96 £. Trouve le prix initial.", steps: ["Le multiplicateur est 1,2.", "96 ÷ 1,2 = 80."], answer: "80 £" }
      ],
      audioScript: "Find the signal word first — it tells you which technique the question wants.",
      audioScriptFr: "Repère d'abord le mot indice — il révèle la technique attendue."
    },
    {
      order: 2,
      title: "Mixed algebra",
      titleFr: "Algèbre mélangée",
      concept: "Moving fluently between expanding, factorising, solving and sequences",
      conceptFr: "Passer avec aisance du développement à la factorisation, la résolution et les suites",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L10-2"],
      explanationMd:
        "Most algebra marks come from the same handful of moves: expand, factorise, balance both sides, substitute, and read a graph.\n\n" +
        "When a question looks unfamiliar, ask which of those five it is really asking for — and always check your answer by substituting it back in.",
      explanationMdFr:
        "La plupart des points en algèbre viennent des mêmes gestes : développer, factoriser, équilibrer les deux côtés, substituer et lire un graphique.\n\n" +
        "Quand une question semble inconnue, demande-toi lequel de ces cinq gestes elle demande vraiment — et vérifie toujours ta réponse en la remplaçant dans l'équation.",
      workedExamples: [
        { problem: "Solve 5x + 7 = 42 and check it.", steps: ["42 - 7 = 35.", "35 ÷ 5 = 7.", "Check: 5 x 7 + 7 = 42."], answer: "x = 7" }
      ],
      workedExamplesFr: [
        { problem: "Résous 5x + 7 = 42 et vérifie.", steps: ["42 - 7 = 35.", "35 ÷ 5 = 7.", "Vérification : 5 x 7 + 7 = 42."], answer: "x = 7" }
      ],
      audioScript: "Expand, factorise, balance, substitute, read a graph — nearly every algebra mark is one of those.",
      audioScriptFr: "Développer, factoriser, équilibrer, substituer, lire un graphique — presque tous les points d'algèbre viennent de là."
    },
    {
      order: 3,
      title: "Mixed geometry, probability and statistics",
      titleFr: "Géométrie, probabilités et statistiques mélangées",
      concept: "Selecting the right geometric, probability or statistical tool under exam conditions",
      conceptFr: "Choisir le bon outil géométrique, probabiliste ou statistique en conditions d'examen",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L10-3"],
      explanationMd:
        "A right angle and two sides means Pythagoras; a right angle and an angle means trigonometry; no right angle means the sine or cosine rule.\n\n" +
        "In statistics, use the median for typical values and the interquartile range for consistency, and always show the fraction or multiplication you used in a probability answer.",
      explanationMdFr:
        "Un angle droit et deux côtés : Pythagore ; un angle droit et un angle : la trigonométrie ; pas d'angle droit : la loi des sinus ou des cosinus.\n\n" +
        "En statistiques, utilise la médiane pour les valeurs typiques et l'écart interquartile pour la régularité, et montre toujours la fraction ou la multiplication utilisée dans une réponse de probabilité.",
      workedExamples: [
        { problem: "A rectangle is 9 m by 12 m. How far is it corner to corner?", steps: ["This is a right-angled triangle, so use Pythagoras.", "9² + 12² = 81 + 144 = 225.", "√225 = 15."], answer: "15 m" }
      ],
      workedExamplesFr: [
        { problem: "Un rectangle mesure 9 m sur 12 m. Quelle est la distance d'un coin au coin opposé ?", steps: ["C'est un triangle rectangle : utilise Pythagore.", "9² + 12² = 81 + 144 = 225.", "√225 = 15."], answer: "15 m" }
      ],
      audioScript: "Right angle or not? That single question picks your geometry tool.",
      audioScriptFr: "Angle droit ou pas ? Cette seule question détermine ton outil géométrique."
    }
  ],
  Y9L8: [
    {
      order: 1,
      title: "Arcs and sectors",
      titleFr: "Arcs et secteurs",
      concept: "Finding arc lengths and sector areas as a fraction of a full circle",
      conceptFr: "Trouver la longueur d'un arc et l'aire d'un secteur comme fraction du cercle entier",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L8-1"],
      explanationMd:
        "A sector is a slice of a circle. Its angle tells you what fraction of the whole circle you have: **angle ÷ 360**.\n\n" +
        "So arc length = 2πr x (angle ÷ 360) and sector area = πr² x (angle ÷ 360). Work out the whole circle first, then take that fraction.",
      explanationMdFr:
        "Un secteur est une part de cercle. Son angle indique quelle fraction du cercle entier tu as : **angle ÷ 360**.\n\n" +
        "Donc longueur d'arc = 2πr x (angle ÷ 360) et aire du secteur = πr² x (angle ÷ 360). Calcule d'abord le cercle entier, puis prends cette fraction.",
      workedExamples: [
        { problem: "A sector has radius 10 cm and angle 90°. Find its arc length.", steps: ["Whole circumference = 2 x π x 10 = 62.8 cm.", "90 ÷ 360 = a quarter.", "62.8 ÷ 4 = 15.7 cm."], answer: "15.7 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un secteur a un rayon de 10 cm et un angle de 90°. Trouve la longueur de son arc.", steps: ["Circonférence entière = 2 x π x 10 = 62,8 cm.", "90 ÷ 360 = un quart.", "62,8 ÷ 4 = 15,7 cm."], answer: "15,7 cm" }
      ],
      audioScript: "Whole circle first, then take the angle's fraction of it.",
      audioScriptFr: "D'abord le cercle entier, puis prends la fraction correspondant à l'angle."
    },
    {
      order: 2,
      title: "Surface area and volume of prisms and cylinders",
      titleFr: "Aire et volume des prismes et cylindres",
      concept: "Using cross-section times length for volume, and nets for surface area",
      conceptFr: "Utiliser section x longueur pour le volume, et le patron pour l'aire",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L8-2"],
      explanationMd:
        "Every prism has the same cross-section all the way through, so **volume = area of cross-section x length**. A cylinder is a prism with a circular cross-section, giving V = πr²h.\n\n" +
        "For surface area, picture the net: a cylinder opens out into two circles plus a rectangle whose width is the circumference, giving A = 2πr² + 2πrh.",
      explanationMdFr:
        "Tout prisme a la même section sur toute sa longueur, donc **volume = aire de la section x longueur**. Un cylindre est un prisme à section circulaire, d'où V = πr²h.\n\n" +
        "Pour l'aire totale, imagine le patron : un cylindre se déplie en deux disques plus un rectangle dont la largeur est la circonférence, d'où A = 2πr² + 2πrh.",
      workedExamples: [
        { problem: "A cylinder has radius 3 cm and height 10 cm. Give its volume in terms of π.", steps: ["V = πr²h.", "3² = 9, and 9 x 10 = 90."], answer: "90π cm³" }
      ],
      workedExamplesFr: [
        { problem: "Un cylindre a un rayon de 3 cm et une hauteur de 10 cm. Donne son volume en fonction de π.", steps: ["V = πr²h.", "3² = 9, et 9 x 10 = 90."], answer: "90π cm³" }
      ],
      audioScript: "Cross-section times length for volume; sketch the net for surface area.",
      audioScriptFr: "Section x longueur pour le volume ; dessine le patron pour l'aire."
    },
    {
      order: 3,
      title: "Circle theorems",
      titleFr: "Les théorèmes du cercle",
      concept: "Recognising and applying the standard circle theorems",
      conceptFr: "Reconnaître et appliquer les théorèmes du cercle classiques",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L8-3"],
      explanationMd:
        "Five results do most of the work: the **angle in a semicircle is 90°**; the **angle at the centre is twice the angle at the circumference** on the same arc; **angles in the same segment are equal**; **opposite angles of a cyclic quadrilateral add to 180°**; and a **tangent meets a radius at 90°**.\n\n" +
        "Always name the theorem you used — the reason earns as many marks as the number.",
      explanationMdFr:
        "Cinq résultats font l'essentiel du travail : l'**angle inscrit dans un demi-cercle vaut 90°** ; l'**angle au centre vaut le double de l'angle inscrit** sur le même arc ; les **angles inscrits dans le même segment sont égaux** ; les **angles opposés d'un quadrilatère inscriptible ont pour somme 180°** ; et une **tangente rencontre un rayon à 90°**.\n\n" +
        "Nomme toujours le théorème utilisé — la justification vaut autant de points que le nombre.",
      workedExamples: [
        { problem: "An inscribed angle is 40°. What is the angle at the centre on the same arc?", steps: ["The angle at the centre is twice the angle at the circumference.", "2 x 40 = 80."], answer: "80°" }
      ],
      workedExamplesFr: [
        { problem: "Un angle inscrit vaut 40°. Que vaut l'angle au centre sur le même arc ?", steps: ["L'angle au centre vaut le double de l'angle inscrit.", "2 x 40 = 80."], answer: "80°" }
      ],
      audioScript: "Spot which theorem the diagram is using, then write the reason next to your answer.",
      audioScriptFr: "Repère quel théorème le schéma utilise, puis écris la justification à côté de ta réponse."
    }
  ],
  Y9L9: [
    {
      order: 1,
      title: "Sample spaces for combined events",
      titleFr: "Univers des événements combinés",
      concept: "Listing and counting all the outcomes of two or more events",
      conceptFr: "Lister et compter toutes les issues de deux événements ou plus",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L9-1"],
      explanationMd:
        "A **sample space** is the complete list of possible outcomes. For two events you can draw a two-way table; the number of cells is the number of outcomes.\n\n" +
        "In general, multiply the number of outcomes at each stage: 6 faces x 4 sections = 24 combined outcomes.",
      explanationMdFr:
        "Un **univers** est la liste complète des issues possibles. Pour deux événements, tu peux dresser un tableau à double entrée ; le nombre de cases est le nombre d'issues.\n\n" +
        "En général, multiplie le nombre d'issues à chaque étape : 6 faces x 4 secteurs = 24 issues combinées.",
      workedExamples: [
        { problem: "A dice and a 4-section spinner are used together. How many outcomes are there?", steps: ["The dice has 6 outcomes and the spinner 4.", "6 x 4 = 24."], answer: "24" }
      ],
      workedExamplesFr: [
        { problem: "On utilise ensemble un dé et une roue à 4 secteurs. Combien y a-t-il d'issues ?", steps: ["Le dé a 6 issues et la roue 4.", "6 x 4 = 24."], answer: "24" }
      ],
      audioScript: "Multiply the choices at each stage to count every possible outcome.",
      audioScriptFr: "Multiplie les choix à chaque étape pour compter toutes les issues possibles."
    },
    {
      order: 2,
      title: "Tree diagrams",
      titleFr: "Les arbres de probabilité",
      concept: "Multiplying along branches and distinguishing independent from dependent events",
      conceptFr: "Multiplier le long des branches et distinguer événements indépendants et dépendants",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L9-2"],
      explanationMd:
        "On a tree diagram you **multiply along the branches** and **add between them**.\n\n" +
        "If something is replaced, the second set of branches is unchanged — the events are **independent**. If it is not replaced, the numbers on the second set change — the events are **dependent**.",
      explanationMdFr:
        "Sur un arbre de probabilité, on **multiplie le long des branches** et on **additionne entre elles**.\n\n" +
        "Si l'objet est remis, le second groupe de branches est inchangé — les événements sont **indépendants**. S'il n'est pas remis, les nombres du second groupe changent — les événements sont **dépendants**.",
      workedExamples: [
        { problem: "A bag has 5 red and 3 blue. Two are drawn without replacement. Find P(both red).", steps: ["First: 5/8.", "Second: 4/7, because one red has gone.", "5/8 x 4/7 = 5/14."], answer: "5/14" }
      ],
      workedExamplesFr: [
        { problem: "Un sac contient 5 rouges et 3 bleus. On en tire deux sans remise. Trouve P(les deux rouges).", steps: ["Premier : 5/8.", "Second : 4/7, car un rouge est parti.", "5/8 x 4/7 = 5/14."], answer: "5/14" }
      ],
      audioScript: "Ask first whether it goes back in — that decides what the second branches look like.",
      audioScriptFr: "Demande-toi d'abord si l'objet est remis — cela détermine le second groupe de branches."
    },
    {
      order: 3,
      title: "Comparing distributions",
      titleFr: "Comparer des distributions",
      concept: "Using an average and a measure of spread together to compare data sets",
      conceptFr: "Utiliser une moyenne et une mesure de dispersion ensemble pour comparer des séries",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L9-3"],
      explanationMd:
        "A good comparison always mentions **two** things: an average (mean or median) for typical values, and a measure of **spread** (the range) for consistency.\n\n" +
        "A higher average means better typical performance; a smaller range means more consistent performance. Saying only one of these loses marks.",
      explanationMdFr:
        "Une bonne comparaison mentionne toujours **deux** choses : une moyenne (arithmétique ou médiane) pour les valeurs typiques, et une mesure de **dispersion** (l'étendue) pour la régularité.\n\n" +
        "Une moyenne plus élevée signifie de meilleures performances typiques ; une étendue plus petite signifie plus de régularité. N'en dire qu'une seule fait perdre des points.",
      workedExamples: [
        { problem: "Group A: mean 30, range 8. Group B: mean 42, range 25. Compare them.", steps: ["B has the higher mean, so B scored better on average.", "A has the smaller range, so A was more consistent."], answer: "B scored higher on average; A was more consistent" }
      ],
      workedExamplesFr: [
        { problem: "Groupe A : moyenne 30, étendue 8. Groupe B : moyenne 42, étendue 25. Compare-les.", steps: ["B a la moyenne la plus élevée, donc B a mieux réussi en moyenne.", "A a l'étendue la plus petite, donc A a été plus régulier."], answer: "B a mieux réussi en moyenne ; A a été plus régulier" }
      ],
      audioScript: "Always say two things: one about the average, one about the spread.",
      audioScriptFr: "Dis toujours deux choses : une sur la moyenne, une sur la dispersion."
    }
  ],
  Y9L10: [
    {
      order: 1,
      title: "Number, indices and proportion under pressure",
      titleFr: "Nombres, indices et proportionnalité sous pression",
      concept: "Choosing the right number technique from the wording of a question",
      conceptFr: "Choisir la bonne technique numérique d'après l'énoncé",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L10-1"],
      explanationMd:
        "Mixed papers rarely tell you the topic. Learn the signals: a very large or very small number means **standard form**; powers of the same base mean the **index laws**; \"per\" means a **rate**; and \"directly proportional\" means y = kx.\n\n" +
        "Find k from the pair of values you are given before doing anything else.",
      explanationMdFr:
        "Les épreuves mélangées indiquent rarement le thème. Apprends les indices : un très grand ou très petit nombre signale la **notation scientifique** ; des puissances de même base, les **lois des indices** ; « par » signale un **taux** ; et « directement proportionnel » signifie y = kx.\n\n" +
        "Trouve k à partir du couple de valeurs donné avant toute autre chose.",
      workedExamples: [
        { problem: "y is directly proportional to x and y = 35 when x = 5. Find y when x = 9.", steps: ["k = 35 ÷ 5 = 7.", "y = 7 x 9 = 63."], answer: "63" }
      ],
      workedExamplesFr: [
        { problem: "y est directement proportionnel à x et y = 35 quand x = 5. Trouve y quand x = 9.", steps: ["k = 35 ÷ 5 = 7.", "y = 7 x 9 = 63."], answer: "63" }
      ],
      audioScript: "Spot the signal word — it tells you which technique the question wants.",
      audioScriptFr: "Repère le mot indice — il révèle la technique attendue."
    },
    {
      order: 2,
      title: "Algebra across the whole of Key Stage 3",
      titleFr: "L'algèbre de tout le Key Stage 3",
      concept: "Expanding, factorising, solving and reading graphs fluently",
      conceptFr: "Développer, factoriser, résoudre et lire des graphiques avec aisance",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L10-2"],
      explanationMd:
        "Almost every algebra mark at this level comes from one of five moves: **expand**, **factorise**, **balance both sides**, **substitute**, or **read a graph**.\n\n" +
        "With the unknown on both sides, collect the x terms on whichever side has more of them — that keeps the coefficient positive and avoids sign errors.",
      explanationMdFr:
        "Presque tous les points d'algèbre à ce niveau viennent de cinq gestes : **développer**, **factoriser**, **équilibrer les deux côtés**, **substituer** ou **lire un graphique**.\n\n" +
        "Avec l'inconnue des deux côtés, regroupe les termes en x du côté où il y en a le plus — cela garde le coefficient positif et évite les erreurs de signe.",
      workedExamples: [
        { problem: "Solve 7x + 4 = 3x + 20.", steps: ["Subtract 3x: 4x + 4 = 20.", "Subtract 4: 4x = 16.", "Divide by 4: x = 4."], answer: "x = 4" }
      ],
      workedExamplesFr: [
        { problem: "Résous 7x + 4 = 3x + 20.", steps: ["Retire 3x : 4x + 4 = 20.", "Retire 4 : 4x = 16.", "Divise par 4 : x = 4."], answer: "x = 4" }
      ],
      audioScript: "Collect the x terms where there are more of them — fewer minus signs, fewer mistakes.",
      audioScriptFr: "Regroupe les termes en x du côté où il y en a le plus — moins de signes moins, moins d'erreurs."
    },
    {
      order: 3,
      title: "Geometry, probability and statistics in one paper",
      titleFr: "Géométrie, probabilités et statistiques en une épreuve",
      concept: "Selecting between Pythagoras, trigonometry, transformations and data techniques",
      conceptFr: "Choisir entre Pythagore, trigonométrie, transformations et techniques de données",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y9-L10-3"],
      explanationMd:
        "In geometry, the question is always the same: do you have a right angle? A right angle and two sides means **Pythagoras**; a right angle and an angle means **trigonometry**.\n\n" +
        "In transformations, check which coordinates changed sign. In probability, independent events multiply. In statistics, an average and a spread measure answer different questions.",
      explanationMdFr:
        "En géométrie, la question est toujours la même : as-tu un angle droit ? Un angle droit et deux côtés : **Pythagore** ; un angle droit et un angle : la **trigonométrie**.\n\n" +
        "Pour les transformations, regarde quelles coordonnées ont changé de signe. En probabilités, les événements indépendants se multiplient. En statistiques, une moyenne et une dispersion répondent à des questions différentes.",
      workedExamples: [
        { problem: "A right-angled triangle has legs 9 cm and 12 cm. Find the hypotenuse.", steps: ["9² + 12² = 81 + 144 = 225.", "√225 = 15."], answer: "15 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle rectangle a des cathètes de 9 cm et 12 cm. Trouve l'hypoténuse.", steps: ["9² + 12² = 81 + 144 = 225.", "√225 = 15."], answer: "15 cm" }
      ],
      audioScript: "Right angle and two sides? Pythagoras. Right angle and an angle? Trigonometry.",
      audioScriptFr: "Angle droit et deux côtés ? Pythagore. Angle droit et un angle ? Trigonométrie."
    }
  ],
  Y8L3: [
    {
      order: 1,
      title: "Direct proportion and the unitary method",
      titleFr: "Proportionnalité directe et méthode de l'unité",
      concept: "Scaling down to one and back up to solve proportion problems",
      conceptFr: "Ramener à l'unité puis multiplier pour résoudre des problèmes de proportionnalité",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L3-1"],
      explanationMd:
        "In **direct proportion**, doubling one quantity doubles the other, and the graph is a straight line through the origin.\n\n" +
        "The **unitary method** is the reliable way through: divide to find the value of one, then multiply up to the number you actually want.",
      explanationMdFr:
        "En **proportionnalité directe**, doubler une quantité double l'autre, et le graphique est une droite passant par l'origine.\n\n" +
        "La **méthode de l'unité** est la plus sûre : divise pour trouver la valeur d'un seul, puis multiplie pour obtenir le nombre voulu.",
      workedExamples: [
        { problem: "6 pens cost 90p. How much do 10 cost?", steps: ["One pen: 90 ÷ 6 = 15p.", "Ten pens: 10 x 15 = 150p."], answer: "150p" }
      ],
      workedExamplesFr: [
        { problem: "6 stylos coûtent 90 p. Combien coûtent 10 stylos ?", steps: ["Un stylo : 90 ÷ 6 = 15 p.", "Dix stylos : 10 x 15 = 150 p."], answer: "150 p" }
      ],
      audioScript: "Divide to find one, then multiply up — that one move solves most proportion questions.",
      audioScriptFr: "Divise pour trouver l'unité, puis multiplie — ce seul geste résout la plupart des questions de proportionnalité."
    },
    {
      order: 2,
      title: "Compound units: speed, unit price and density",
      titleFr: "Grandeurs composées : vitesse, prix unitaire et masse volumique",
      concept: "Reading a compound unit as a division and rearranging it",
      conceptFr: "Lire une unité composée comme une division et la réarranger",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L3-2"],
      explanationMd:
        "A **compound unit** combines two measurements, and the unit itself tells you the calculation. Read the slash as \"per\" or \"divided by\": km/h is kilometres divided by hours, g/cm³ is grams divided by cubic centimetres.\n\n" +
        "All three rearrange the same way: speed = distance ÷ time, so distance = speed x time and time = distance ÷ speed.",
      explanationMdFr:
        "Une **grandeur composée** combine deux mesures, et l'unité indique le calcul. Lis la barre comme « par » ou « divisé par » : km/h, ce sont des kilomètres divisés par des heures ; g/cm³, des grammes divisés par des centimètres cubes.\n\n" +
        "Les trois se réarrangent de la même façon : vitesse = distance ÷ temps, donc distance = vitesse x temps et temps = distance ÷ vitesse.",
      workedExamples: [
        { problem: "A coach travels 210 km in 3 hours. Find its average speed.", steps: ["Speed = distance ÷ time.", "210 ÷ 3 = 70."], answer: "70 km/h" },
        { problem: "A block has mass 480 g and volume 60 cm³. Find its density.", steps: ["Density = mass ÷ volume.", "480 ÷ 60 = 8."], answer: "8 g/cm³" }
      ],
      workedExamplesFr: [
        { problem: "Un car parcourt 210 km en 3 heures. Trouve sa vitesse moyenne.", steps: ["Vitesse = distance ÷ temps.", "210 ÷ 3 = 70."], answer: "70 km/h" },
        { problem: "Un bloc a une masse de 480 g et un volume de 60 cm³. Trouve sa masse volumique.", steps: ["Masse volumique = masse ÷ volume.", "480 ÷ 60 = 8."], answer: "8 g/cm³" }
      ],
      audioScript: "Read the unit out loud — it tells you exactly what to divide by what.",
      audioScriptFr: "Lis l'unité à voix haute — elle dit exactement quoi diviser par quoi."
    },
    {
      order: 3,
      title: "Comparing lengths, areas and volumes with ratio",
      titleFr: "Comparer longueurs, aires et volumes avec les rapports",
      concept: "Understanding that areas scale by k squared and volumes by k cubed",
      conceptFr: "Comprendre que les aires sont multipliées par k² et les volumes par k³",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L3-3"],
      explanationMd:
        "If every length is multiplied by **k**, then every area is multiplied by **k²** and every volume by **k³**.\n\n" +
        "That is because area uses two dimensions and volume uses three. Doubling the side of a square gives four times the area, not twice.",
      explanationMdFr:
        "Si toutes les longueurs sont multipliées par **k**, alors toutes les aires le sont par **k²** et tous les volumes par **k³**.\n\n" +
        "C'est parce que l'aire utilise deux dimensions et le volume trois. Doubler le côté d'un carré quadruple son aire, il ne la double pas.",
      workedExamples: [
        { problem: "A shape is enlarged by scale factor 3. What happens to its area and its volume?", steps: ["Area scale factor = 3² = 9.", "Volume scale factor = 3³ = 27."], answer: "area x9, volume x27" }
      ],
      workedExamplesFr: [
        { problem: "Une figure est agrandie d'un facteur 3. Que deviennent son aire et son volume ?", steps: ["Facteur des aires = 3² = 9.", "Facteur des volumes = 3³ = 27."], answer: "aire x9, volume x27" }
      ],
      audioScript: "Lengths k, areas k squared, volumes k cubed.",
      audioScriptFr: "Longueurs k, aires k au carré, volumes k au cube."
    }
  ],
  Y8L4: [
    {
      order: 1,
      title: "Expanding a single bracket",
      titleFr: "Développer une parenthèse",
      concept: "Multiplying every term inside a bracket by the term outside",
      conceptFr: "Multiplier chaque terme de la parenthèse par le terme extérieur",
      representation: "pictorial",
      visualAid: "algebra-tile",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L4-1"],
      explanationMd:
        "To expand a bracket, multiply **everything** inside by the term outside — not just the first term.\n\n" +
        "Watch the signs: a positive outside a negative inside gives a negative, so 4(x - 3) = 4x - 12.",
      explanationMdFr:
        "Pour développer une parenthèse, multiplie **tout** ce qui est à l'intérieur par le terme extérieur — pas seulement le premier terme.\n\n" +
        "Attention aux signes : un positif devant un négatif donne un négatif, donc 4(x - 3) = 4x - 12.",
      workedExamples: [
        { problem: "Expand 5(2x + 7).", steps: ["5 x 2x = 10x.", "5 x 7 = 35."], answer: "10x + 35" }
      ],
      workedExamplesFr: [
        { problem: "Développe 5(2x + 7).", steps: ["5 x 2x = 10x.", "5 x 7 = 35."], answer: "10x + 35" }
      ],
      audioScript: "Everything inside gets multiplied — do not stop at the first term.",
      audioScriptFr: "Tout l'intérieur est multiplié — ne t'arrête pas au premier terme."
    },
    {
      order: 2,
      title: "Factorising by taking out a common factor",
      titleFr: "Factoriser en sortant un facteur commun",
      concept: "Reversing expansion by finding the highest common factor",
      conceptFr: "Inverser le développement en trouvant le plus grand facteur commun",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L4-2"],
      explanationMd:
        "Factorising is expanding in reverse. Find the **highest common factor** of all the terms, write it outside a bracket, and put what is left inside.\n\n" +
        "Look for common letters too: 6x² + 9x has a common factor of 3x, giving 3x(2x + 3). Always check by expanding again.",
      explanationMdFr:
        "Factoriser, c'est développer à l'envers. Trouve le **plus grand facteur commun** de tous les termes, écris-le devant une parenthèse, et mets le reste à l'intérieur.\n\n" +
        "Cherche aussi les lettres communes : 6x² + 9x a pour facteur commun 3x, ce qui donne 3x(2x + 3). Vérifie toujours en développant de nouveau.",
      workedExamples: [
        { problem: "Factorise 12x + 18.", steps: ["The highest common factor of 12 and 18 is 6.", "12 ÷ 6 = 2 and 18 ÷ 6 = 3."], answer: "6(2x + 3)" }
      ],
      workedExamplesFr: [
        { problem: "Factorise 12x + 18.", steps: ["Le plus grand facteur commun de 12 et 18 est 6.", "12 ÷ 6 = 2 et 18 ÷ 6 = 3."], answer: "6(2x + 3)" }
      ],
      audioScript: "Take out the biggest factor you can, then expand to check it.",
      audioScriptFr: "Sors le plus grand facteur possible, puis développe pour vérifier."
    },
    {
      order: 3,
      title: "The laws of indices",
      titleFr: "Les lois des indices",
      concept: "Adding, subtracting and multiplying indices in the right situations",
      conceptFr: "Additionner, soustraire et multiplier les indices au bon moment",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L4-3"],
      explanationMd:
        "With the **same base**: multiplying **adds** the indices, dividing **subtracts** them, and a power of a power **multiplies** them.\n\n" +
        "Remember that 3⁴ means 3 x 3 x 3 x 3, not 3 x 4 — that single mistake causes most index errors.",
      explanationMdFr:
        "Avec la **même base** : multiplier **additionne** les indices, diviser les **soustrait**, et une puissance de puissance les **multiplie**.\n\n" +
        "Rappelle-toi que 3⁴ signifie 3 x 3 x 3 x 3, pas 3 x 4 — cette seule erreur est à l'origine de la plupart des fautes sur les indices.",
      workedExamples: [
        { problem: "Simplify 2^5 x 2^3.", steps: ["Same base, multiplying.", "Add the indices: 5 + 3 = 8."], answer: "2^8" },
        { problem: "Simplify (5^2)^4.", steps: ["Power of a power.", "Multiply: 2 x 4 = 8."], answer: "5^8" }
      ],
      workedExamplesFr: [
        { problem: "Simplifie 2^5 x 2^3.", steps: ["Même base, multiplication.", "Additionne les indices : 5 + 3 = 8."], answer: "2^8" },
        { problem: "Simplifie (5^2)^4.", steps: ["Puissance d'une puissance.", "Multiplie : 2 x 4 = 8."], answer: "5^8" }
      ],
      audioScript: "Multiply: add. Divide: subtract. Power of a power: multiply.",
      audioScriptFr: "Multiplier : additionner. Diviser : soustraire. Puissance d'une puissance : multiplier."
    }
  ],
  Y8L5: [
    {
      order: 1,
      title: "Equations with the unknown on both sides",
      titleFr: "Les équations avec l'inconnue des deux côtés",
      concept: "Collecting x terms on one side while keeping the equation balanced",
      conceptFr: "Regrouper les termes en x d'un côté en gardant l'équation équilibrée",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L5-1"],
      explanationMd:
        "An equation is a balance: whatever you do to one side you must do to the other.\n\n" +
        "With x on both sides, subtract the **smaller** x term from both sides first. That keeps the coefficient positive and avoids sign slips. Then undo the addition, then the multiplication.",
      explanationMdFr:
        "Une équation est une balance : ce que tu fais d'un côté, tu dois le faire de l'autre.\n\n" +
        "Avec x des deux côtés, retire d'abord le **plus petit** terme en x des deux côtés. Cela garde le coefficient positif et évite les erreurs de signe. Puis annule l'addition, puis la multiplication.",
      workedExamples: [
        { problem: "Solve 8x + 5 = 3x + 30.", steps: ["Subtract 3x: 5x + 5 = 30.", "Subtract 5: 5x = 25.", "Divide by 5: x = 5."], answer: "x = 5" }
      ],
      workedExamplesFr: [
        { problem: "Résous 8x + 5 = 3x + 30.", steps: ["Retire 3x : 5x + 5 = 30.", "Retire 5 : 5x = 25.", "Divise par 5 : x = 5."], answer: "x = 5" }
      ],
      audioScript: "Take the smaller x term off both sides first — then it is an ordinary two-step equation.",
      audioScriptFr: "Retire d'abord le plus petit terme en x des deux côtés — ensuite c'est une équation à deux étapes ordinaire."
    },
    {
      order: 2,
      title: "Inequalities and the number line",
      titleFr: "Inéquations et droite graduée",
      concept: "Solving inequalities and showing the solution set on a number line",
      conceptFr: "Résoudre des inéquations et représenter l'ensemble solution sur une droite graduée",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L5-2"],
      explanationMd:
        "Solve an inequality exactly as you would an equation. The one difference: multiplying or dividing by a **negative** number reverses the sign.\n\n" +
        "On a number line, an **open circle** means the end value is not included (&lt; or &gt;) and a **filled circle** means it is (≤ or ≥). The arrow points towards the values that work.",
      explanationMdFr:
        "Résous une inéquation exactement comme une équation. Seule différence : multiplier ou diviser par un nombre **négatif** inverse le sens.\n\n" +
        "Sur une droite graduée, un **cercle vide** signifie que la valeur limite est exclue (&lt; ou &gt;) et un **cercle plein** qu'elle est incluse (≤ ou ≥). La flèche pointe vers les valeurs qui conviennent.",
      workedExamples: [
        { problem: "Solve 4x + 3 > 19 and give the smallest whole number solution.", steps: ["Subtract 3: 4x > 16.", "Divide by 4: x > 4.", "4 itself is excluded, so the smallest whole number is 5."], answer: "x > 4, smallest whole number 5" }
      ],
      workedExamplesFr: [
        { problem: "Résous 4x + 3 > 19 et donne le plus petit entier solution.", steps: ["Retire 3 : 4x > 16.", "Divise par 4 : x > 4.", "4 est exclu, donc le plus petit entier est 5."], answer: "x > 4, plus petit entier 5" }
      ],
      audioScript: "Solve it like an equation — then think carefully about whether the boundary itself counts.",
      audioScriptFr: "Résous comme une équation — puis réfléchis bien à savoir si la borne elle-même compte."
    },
    {
      order: 3,
      title: "Turning words into equations",
      titleFr: "Transformer des mots en équations",
      concept: "Translating a practical situation into algebra and solving it",
      conceptFr: "Traduire une situation concrète en algèbre et la résoudre",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L5-3"],
      explanationMd:
        "Start by naming the unknown: \"let x be the number of hours\". Then write each piece of information in terms of x.\n\n" +
        "A fixed charge is a number on its own; a charge per unit multiplies x. Once the equation is written, solving it is the easy part.",
      explanationMdFr:
        "Commence par nommer l'inconnue : « soit x le nombre d'heures ». Puis écris chaque information en fonction de x.\n\n" +
        "Un montant fixe est un nombre seul ; un tarif par unité multiplie x. Une fois l'équation écrite, la résoudre est la partie facile.",
      workedExamples: [
        { problem: "Hiring a bike costs £5 plus £3 per hour. The bill was £26. How many hours?", steps: ["Let x be the hours: 3x + 5 = 26.", "3x = 21.", "x = 7."], answer: "7 hours" }
      ],
      workedExamplesFr: [
        { problem: "Louer un vélo coûte 5 £ plus 3 £ par heure. La facture est de 26 £. Combien d'heures ?", steps: ["Soit x le nombre d'heures : 3x + 5 = 26.", "3x = 21.", "x = 7."], answer: "7 heures" }
      ],
      audioScript: "Name the unknown first — the equation almost writes itself after that.",
      audioScriptFr: "Nomme d'abord l'inconnue — l'équation s'écrit presque toute seule ensuite."
    }
  ],
  Y8L6: [
    {
      order: 1,
      title: "The nth term of a sequence",
      titleFr: "Le terme de rang n d'une suite",
      concept: "Using first and second differences to find a sequence rule",
      conceptFr: "Utiliser les différences premières et secondes pour trouver la règle d'une suite",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L6-1"],
      explanationMd:
        "In a **linear** sequence the first differences are constant. That difference is the number in front of n; then adjust with a constant so that n = 1 gives the first term.\n\n" +
        "In a **quadratic** sequence the second differences are constant, and half of the second difference is the coefficient of n².",
      explanationMdFr:
        "Dans une suite **arithmétique**, les différences premières sont constantes. Cette différence est le nombre devant n ; ajuste ensuite avec une constante pour que n = 1 donne le premier terme.\n\n" +
        "Dans une suite **quadratique**, les différences secondes sont constantes, et la moitié de la différence seconde est le coefficient de n².",
      workedExamples: [
        { problem: "Find the nth term of 5, 9, 13, 17, ...", steps: ["First difference is 4, so start with 4n.", "4 x 1 = 4 but term 1 is 5, so add 1."], answer: "4n + 1" }
      ],
      workedExamplesFr: [
        { problem: "Trouve le terme de rang n de 5, 9, 13, 17, ...", steps: ["La différence première est 4, donc commence par 4n.", "4 x 1 = 4 mais le premier terme est 5, donc ajoute 1."], answer: "4n + 1" }
      ],
      audioScript: "Constant first differences mean linear; constant second differences mean quadratic.",
      audioScriptFr: "Différences premières constantes : arithmétique ; différences secondes constantes : quadratique."
    },
    {
      order: 2,
      title: "Coordinates in all four quadrants",
      titleFr: "Les coordonnées dans les quatre quadrants",
      concept: "Plotting and reading coordinates with negative values, and finding midpoints",
      conceptFr: "Placer et lire des coordonnées négatives, et trouver des milieux",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L6-2"],
      explanationMd:
        "Coordinates are always (x, y) — **across first, then up**. The two axes divide the grid into four quadrants, and the signs of x and y tell you which one a point is in.\n\n" +
        "To find a midpoint, average each coordinate separately.",
      explanationMdFr:
        "Les coordonnées s'écrivent toujours (x, y) — **d'abord horizontalement, puis verticalement**. Les deux axes divisent le repère en quatre quadrants, et les signes de x et y indiquent lequel.\n\n" +
        "Pour trouver un milieu, fais la moyenne de chaque coordonnée séparément.",
      workedExamples: [
        { problem: "Find the midpoint of (-4, 2) and (6, 8).", steps: ["x: (-4 + 6) ÷ 2 = 1.", "y: (2 + 8) ÷ 2 = 5."], answer: "(1, 5)" }
      ],
      workedExamplesFr: [
        { problem: "Trouve le milieu de (-4, 2) et (6, 8).", steps: ["x : (-4 + 6) ÷ 2 = 1.", "y : (2 + 8) ÷ 2 = 5."], answer: "(1, 5)" }
      ],
      audioScript: "Across then up — and average both coordinates to find a midpoint.",
      audioScriptFr: "D'abord horizontalement, puis verticalement — et fais la moyenne des deux coordonnées pour le milieu."
    },
    {
      order: 3,
      title: "Plotting y = mx + c",
      titleFr: "Tracer y = mx + c",
      concept: "Reading gradient and intercept from an equation and plotting the line",
      conceptFr: "Lire le coefficient directeur et l'ordonnée à l'origine, puis tracer la droite",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L6-3"],
      explanationMd:
        "In **y = mx + c**, m is the **gradient** (how steep the line is) and c is the **y-intercept** (where it crosses the y-axis).\n\n" +
        "To plot the line, build a small table of values: choose three x values, work out y for each, plot the points and join them with a ruler. Parallel lines have the same m.",
      explanationMdFr:
        "Dans **y = mx + c**, m est le **coefficient directeur** (la pente) et c l'**ordonnée à l'origine** (où la droite coupe l'axe des ordonnées).\n\n" +
        "Pour tracer la droite, dresse un petit tableau de valeurs : choisis trois valeurs de x, calcule y pour chacune, place les points et relie-les à la règle. Des droites parallèles ont le même m.",
      workedExamples: [
        { problem: "For y = 3x - 2, find y when x = 4, and state the y-intercept.", steps: ["3 x 4 = 12, minus 2 is 10.", "The constant term is -2, so the line crosses the y-axis at -2."], answer: "y = 10; intercept -2" }
      ],
      workedExamplesFr: [
        { problem: "Pour y = 3x - 2, trouve y quand x = 4, et donne l'ordonnée à l'origine.", steps: ["3 x 4 = 12, moins 2 égale 10.", "Le terme constant est -2, donc la droite coupe l'axe des ordonnées en -2."], answer: "y = 10 ; ordonnée à l'origine -2" }
      ],
      audioScript: "m is the steepness, c is where it crosses — three points and a ruler does the rest.",
      audioScriptFr: "m est la pente, c le point de croisement — trois points et une règle font le reste."
    }
  ],
  Y8L7: [
    {
      order: 1,
      title: "Translations, rotations and reflections",
      titleFr: "Translations, rotations et réflexions",
      concept: "Describing and applying the three transformations that preserve size",
      conceptFr: "Décrire et appliquer les trois transformations qui conservent la taille",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L7-1"],
      explanationMd:
        "A **translation** slides a shape by a column vector: the top number moves it across, the bottom number up or down.\n\n" +
        "A **reflection** in the y-axis changes the sign of x; in the x-axis it changes the sign of y. A **rotation of 180° about the origin** changes the sign of both. None of these three changes the size or shape, so the image is always congruent.",
      explanationMdFr:
        "Une **translation** glisse une figure selon un vecteur colonne : le nombre du haut la déplace horizontalement, celui du bas verticalement.\n\n" +
        "Une **réflexion** par l'axe des ordonnées change le signe de x ; par l'axe des abscisses, celui de y. Une **rotation de 180° autour de l'origine** change les deux signes. Aucune de ces trois transformations ne change la taille ni la forme : l'image est toujours isométrique.",
      workedExamples: [
        { problem: "Translate (3, -5) by the vector (-7, 2).", steps: ["x: 3 + (-7) = -4.", "y: -5 + 2 = -3."], answer: "(-4, -3)" }
      ],
      workedExamplesFr: [
        { problem: "Applique la translation de vecteur (-7, 2) au point (3, -5).", steps: ["x : 3 + (-7) = -4.", "y : -5 + 2 = -3."], answer: "(-4, -3)" }
      ],
      audioScript: "Check which coordinates changed sign — that tells you which transformation happened.",
      audioScriptFr: "Regarde quelles coordonnées ont changé de signe — cela indique la transformation appliquée."
    },
    {
      order: 2,
      title: "Congruent triangles",
      titleFr: "Les triangles isométriques",
      concept: "Using SSS, SAS, ASA and RHS to prove two triangles are identical",
      conceptFr: "Utiliser SSS, SAS, ASA et RHS pour prouver que deux triangles sont identiques",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L7-2"],
      explanationMd:
        "Two shapes are **congruent** when they are identical in size and shape — one can be translated, rotated or reflected onto the other.\n\n" +
        "For triangles, only four sets of facts guarantee it: **SSS**, **SAS** (the angle sits between the two sides), **ASA** (the side sits between the two angles) and **RHS**. Equal angles alone are not enough.",
      explanationMdFr:
        "Deux figures sont **isométriques** quand elles sont identiques en taille et en forme — l'une peut être translatée, tournée ou réfléchie sur l'autre.\n\n" +
        "Pour les triangles, seuls quatre ensembles de données le garantissent : **SSS**, **SAS** (l'angle est entre les deux côtés), **ASA** (le côté est entre les deux angles) et **RHS**. Des angles égaux seuls ne suffisent pas.",
      workedExamples: [
        { problem: "Two triangles both have a right angle, a 13 cm hypotenuse and a 5 cm side. Are they congruent?", steps: ["Right angle, hypotenuse and a side is RHS.", "RHS guarantees congruence."], answer: "Yes, by RHS" }
      ],
      workedExamplesFr: [
        { problem: "Deux triangles ont tous deux un angle droit, une hypoténuse de 13 cm et un côté de 5 cm. Sont-ils isométriques ?", steps: ["Angle droit, hypoténuse et un côté : c'est RHS.", "RHS garantit l'isométrie."], answer: "Oui, par RHS" }
      ],
      audioScript: "Count the sides and angles, and note where the angle sits — that picks the condition.",
      audioScriptFr: "Compte les côtés et les angles, et repère où se trouve l'angle — cela détermine la condition."
    },
    {
      order: 3,
      title: "Similar shapes",
      titleFr: "Les figures semblables",
      concept: "Recognising similarity through equal angles and proportional sides",
      conceptFr: "Reconnaître la similitude par des angles égaux et des côtés proportionnels",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L7-3"],
      explanationMd:
        "**Similar** shapes have exactly the same angles and all their sides in the same ratio — same shape, different size.\n\n" +
        "Congruence is the special case where the scale factor is 1. To find a missing length, work out the scale factor from a pair you know, then multiply.",
      explanationMdFr:
        "Des figures **semblables** ont exactement les mêmes angles et tous leurs côtés dans le même rapport — même forme, taille différente.\n\n" +
        "L'isométrie est le cas particulier où le facteur d'échelle vaut 1. Pour trouver une longueur manquante, calcule le facteur d'échelle à partir d'une paire connue, puis multiplie.",
      workedExamples: [
        { problem: "In similar shapes, 4 cm corresponds to 12 cm. What corresponds to 7 cm?", steps: ["Scale factor = 12 ÷ 4 = 3.", "7 x 3 = 21."], answer: "21 cm" }
      ],
      workedExamplesFr: [
        { problem: "Dans des figures semblables, 4 cm correspond à 12 cm. À quoi correspond 7 cm ?", steps: ["Facteur d'échelle = 12 ÷ 4 = 3.", "7 x 3 = 21."], answer: "21 cm" }
      ],
      audioScript: "Same angles, sides in the same ratio — find the scale factor and use it everywhere.",
      audioScriptFr: "Mêmes angles, côtés dans le même rapport — trouve le facteur d'échelle et applique-le partout."
    }
  ],
  Y8L8: [
    {
      order: 1,
      title: "Pythagoras' theorem",
      titleFr: "Le théorème de Pythagore",
      concept: "Finding a missing side in a right-angled triangle",
      conceptFr: "Trouver un côté manquant dans un triangle rectangle",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L8-1"],
      explanationMd:
        "In any right-angled triangle, **a² + b² = c²**, where c is the hypotenuse — the side opposite the right angle, always the longest.\n\n" +
        "To find the hypotenuse, square both shorter sides, add, then square root. To find a shorter side, subtract instead of adding before square rooting.",
      explanationMdFr:
        "Dans tout triangle rectangle, **a² + b² = c²**, où c est l'hypoténuse — le côté opposé à l'angle droit, toujours le plus long.\n\n" +
        "Pour trouver l'hypoténuse, élève les deux côtés courts au carré, additionne, puis prends la racine carrée. Pour un côté court, soustrais au lieu d'additionner avant la racine.",
      workedExamples: [
        { problem: "A right-angled triangle has legs 9 cm and 12 cm. Find the hypotenuse.", steps: ["9² + 12² = 81 + 144 = 225.", "√225 = 15."], answer: "15 cm" },
        { problem: "A hypotenuse is 13 cm and one leg is 5 cm. Find the other leg.", steps: ["13² - 5² = 169 - 25 = 144.", "√144 = 12."], answer: "12 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle rectangle a des cathètes de 9 cm et 12 cm. Trouve l'hypoténuse.", steps: ["9² + 12² = 81 + 144 = 225.", "√225 = 15."], answer: "15 cm" },
        { problem: "Une hypoténuse mesure 13 cm et une cathète 5 cm. Trouve l'autre cathète.", steps: ["13² - 5² = 169 - 25 = 144.", "√144 = 12."], answer: "12 cm" }
      ],
      audioScript: "Looking for the longest side? Add. Looking for a shorter side? Subtract.",
      audioScriptFr: "Tu cherches le plus long côté ? Additionne. Un côté court ? Soustrais."
    },
    {
      order: 2,
      title: "Circumference and area of circles",
      titleFr: "Circonférence et aire des cercles",
      concept: "Using 2πr and πr² correctly, and halving a diameter first",
      conceptFr: "Utiliser correctement 2πr et πr², et diviser d'abord le diamètre par deux",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L8-2"],
      explanationMd:
        "**Circumference = 2πr** (the distance round the edge) and **area = πr²** (the space inside). The commonest mistake is mixing these up — area is the one that squares the radius.\n\n" +
        "Both formulas use the **radius**, so if you are given the diameter, halve it first.",
      explanationMdFr:
        "**Circonférence = 2πr** (le tour du cercle) et **aire = πr²** (l'espace intérieur). L'erreur la plus courante est de les confondre — c'est l'aire qui élève le rayon au carré.\n\n" +
        "Les deux formules utilisent le **rayon** : si on te donne le diamètre, divise-le d'abord par deux.",
      workedExamples: [
        { problem: "A circle has diameter 14 cm. Find its area in terms of π.", steps: ["Radius = 14 ÷ 2 = 7 cm.", "Area = π x 7² = 49π."], answer: "49π cm²" }
      ],
      workedExamplesFr: [
        { problem: "Un cercle a un diamètre de 14 cm. Trouve son aire en fonction de π.", steps: ["Rayon = 14 ÷ 2 = 7 cm.", "Aire = π x 7² = 49π."], answer: "49π cm²" }
      ],
      audioScript: "Halve the diameter first, then decide: squaring means area, doubling means circumference.",
      audioScriptFr: "Divise d'abord le diamètre par deux, puis décide : au carré c'est l'aire, doublé c'est la circonférence."
    },
    {
      order: 3,
      title: "Geometric reasoning with reasons",
      titleFr: "Raisonner en géométrie avec justifications",
      concept: "Chaining angle facts and quoting the reason at every step",
      conceptFr: "Enchaîner des propriétés sur les angles en justifiant chaque étape",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L8-3"],
      explanationMd:
        "A geometric argument is a chain of steps, each with a **reason**: angles in a triangle add to 180°, angles on a straight line add to 180°, alternate angles are equal, corresponding angles are equal, co-interior angles add to 180°.\n\n" +
        "Writing the reason next to each number is part of the answer, not an optional extra.",
      explanationMdFr:
        "Un raisonnement géométrique est une chaîne d'étapes, chacune avec une **justification** : la somme des angles d'un triangle vaut 180°, celle des angles sur une droite aussi, les angles alternes-internes sont égaux, les correspondants sont égaux, les co-intérieurs ont pour somme 180°.\n\n" +
        "Écrire la justification à côté de chaque nombre fait partie de la réponse, ce n'est pas un bonus.",
      workedExamples: [
        { problem: "An isosceles triangle has an apex angle of 50°. Find a base angle, with reasons.", steps: ["The base angles are equal (isosceles triangle).", "180 - 50 = 130 (angles in a triangle add to 180°).", "130 ÷ 2 = 65."], answer: "65°" }
      ],
      workedExamplesFr: [
        { problem: "Un triangle isocèle a un angle au sommet de 50°. Trouve un angle à la base, avec justifications.", steps: ["Les angles à la base sont égaux (triangle isocèle).", "180 - 50 = 130 (la somme des angles d'un triangle vaut 180°).", "130 ÷ 2 = 65."], answer: "65°" }
      ],
      audioScript: "Every line needs a reason — write the fact you used beside each number.",
      audioScriptFr: "Chaque ligne a besoin d'une justification — écris la propriété utilisée à côté de chaque nombre."
    }
  ],
  Y8L9: [
    {
      order: 1,
      title: "Recording and analysing frequencies",
      titleFr: "Relever et analyser des effectifs",
      concept: "Using a frequency table to record and interpret experimental results",
      conceptFr: "Utiliser un tableau d'effectifs pour relever et interpréter des résultats",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L9-1"],
      explanationMd:
        "A **frequency table** records how many times each outcome happened. The frequencies must add up to the total number of trials, which gives you a quick way to check your work — or to find a missing frequency.\n\n" +
        "Comparing frequencies tells you which outcomes came up most, and that is the first step towards judging whether something is fair.",
      explanationMdFr:
        "Un **tableau d'effectifs** indique combien de fois chaque issue s'est produite. Les effectifs doivent s'additionner pour donner le nombre total d'essais, ce qui permet de vérifier son travail — ou de retrouver un effectif manquant.\n\n" +
        "Comparer les effectifs montre quelles issues sont les plus fréquentes, première étape pour juger si quelque chose est équilibré.",
      workedExamples: [
        { problem: "In 60 trials, outcomes A and B occurred 22 and 17 times. How often did C occur?", steps: ["22 + 17 = 39.", "60 - 39 = 21."], answer: "21" }
      ],
      workedExamplesFr: [
        { problem: "Sur 60 essais, les issues A et B sont apparues 22 et 17 fois. Combien de fois C est-elle apparue ?", steps: ["22 + 17 = 39.", "60 - 39 = 21."], answer: "21" }
      ],
      audioScript: "The frequencies always add up to the number of trials — use that to check or to fill a gap.",
      audioScriptFr: "Les effectifs s'additionnent toujours pour donner le nombre d'essais — sers-t'en pour vérifier ou compléter."
    },
    {
      order: 2,
      title: "Relative and expected frequency",
      titleFr: "Fréquence relative et effectif attendu",
      concept: "Estimating probability from experiments and predicting future results",
      conceptFr: "Estimer une probabilité à partir d'expériences et prédire des résultats futurs",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L9-2"],
      explanationMd:
        "**Relative frequency** = successes ÷ trials. It is an experimental estimate of probability, and it gets more reliable the more trials you do.\n\n" +
        "**Expected frequency** works the other way: probability x number of trials tells you how many times you would expect an outcome. A result that is far from what you expect, over many trials, suggests bias.",
      explanationMdFr:
        "**Fréquence relative** = réussites ÷ essais. C'est une estimation expérimentale de la probabilité, d'autant plus fiable que les essais sont nombreux.\n\n" +
        "L'**effectif attendu** fonctionne dans l'autre sens : probabilité x nombre d'essais donne le nombre de fois attendu. Un résultat très éloigné de l'attendu, sur de nombreux essais, suggère un biais.",
      workedExamples: [
        { problem: "A spinner has 5 equal sections. In 200 spins, how many times would you expect one section?", steps: ["Probability = 1/5.", "200 ÷ 5 = 40."], answer: "40" }
      ],
      workedExamplesFr: [
        { problem: "Une roue a 5 secteurs égaux. Sur 200 tours, combien de fois t'attends-tu à un secteur donné ?", steps: ["Probabilité = 1/5.", "200 ÷ 5 = 40."], answer: "40" }
      ],
      audioScript: "Relative frequency looks backwards at results; expected frequency looks forwards.",
      audioScriptFr: "La fréquence relative regarde les résultats passés ; l'effectif attendu regarde vers l'avant."
    },
    {
      order: 3,
      title: "Central tendency and spread",
      titleFr: "Tendance centrale et dispersion",
      concept: "Choosing between mean, median, mode and range to describe data",
      conceptFr: "Choisir entre moyenne, médiane, mode et étendue pour décrire des données",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L9-3"],
      explanationMd:
        "The **mean** uses every value, so one extreme value pulls it. The **median** is the middle value once sorted and ignores extremes. The **mode** is the most common value.\n\n" +
        "An average on its own is only half the story — the **range** (largest minus smallest) says how spread out the data is, and a smaller range means more consistent.",
      explanationMdFr:
        "La **moyenne** utilise toutes les valeurs : une valeur extrême la tire. La **médiane** est la valeur centrale une fois triée et ignore les extrêmes. Le **mode** est la valeur la plus fréquente.\n\n" +
        "Une moyenne seule ne dit que la moitié de l'histoire — l'**étendue** (plus grande moins plus petite) indique la dispersion, et une étendue plus petite signifie plus de régularité.",
      workedExamples: [
        { problem: "Find the mean and range of 4, 9, 11, 8 and 13.", steps: ["4 + 9 + 11 + 8 + 13 = 45, so the mean is 45 ÷ 5 = 9.", "Range = 13 - 4 = 9."], answer: "mean 9, range 9" }
      ],
      workedExamplesFr: [
        { problem: "Trouve la moyenne et l'étendue de 4, 9, 11, 8 et 13.", steps: ["4 + 9 + 11 + 8 + 13 = 45, donc la moyenne est 45 ÷ 5 = 9.", "Étendue = 13 - 4 = 9."], answer: "moyenne 9, étendue 9" }
      ],
      audioScript: "Give an average and a spread — one on its own never tells the whole story.",
      audioScriptFr: "Donne une moyenne et une dispersion — l'une sans l'autre ne dit jamais tout."
    }
  ],
  Y8L10: [
    {
      order: 1,
      title: "Powers, roots, percentages and ratio together",
      titleFr: "Puissances, racines, pourcentages et rapports ensemble",
      concept: "Choosing the right number technique from the wording of a question",
      conceptFr: "Choisir la bonne technique numérique d'après l'énoncé",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L10-1"],
      explanationMd:
        "Mixed questions rarely name the topic. Learn the signals: \"to the power of\" means **indices**; \"square root\" asks which number times itself gives that; a percentage change means a **multiplier**; \"in the ratio\" means counting **parts**.\n\n" +
        "For percentages, one multiplier does the whole job: a 15% rise is x1.15, a 15% fall is x0.85.",
      explanationMdFr:
        "Les questions mélangées nomment rarement le thème. Apprends les indices : « à la puissance » signale les **indices** ; « racine carrée » demande quel nombre multiplié par lui-même donne ce résultat ; un changement en pourcentage signale un **multiplicateur** ; « dans le rapport » signale un comptage de **parts**.\n\n" +
        "Pour les pourcentages, un seul multiplicateur fait tout : une hausse de 15 % c'est x1,15, une baisse de 15 % c'est x0,85.",
      workedExamples: [
        { problem: "A £400 item is reduced by 25%. What is the new price?", steps: ["The multiplier is 0.75.", "400 x 0.75 = 300."], answer: "£300" }
      ],
      workedExamplesFr: [
        { problem: "Un article à 400 £ est réduit de 25 %. Quel est le nouveau prix ?", steps: ["Le multiplicateur est 0,75.", "400 x 0,75 = 300."], answer: "300 £" }
      ],
      audioScript: "Find the signal word first — it tells you which technique to reach for.",
      audioScriptFr: "Repère d'abord le mot indice — il indique la technique à utiliser."
    },
    {
      order: 2,
      title: "Algebra across the whole of Year 8",
      titleFr: "L'algèbre de toute l'Année 8",
      concept: "Moving between expanding, solving, sequences and graphs",
      conceptFr: "Passer du développement à la résolution, aux suites et aux graphiques",
      representation: "abstract",
      visualAid: "graph",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L10-2"],
      explanationMd:
        "Nearly every algebra question in Year 8 is one of four moves: **expand** a bracket, **solve** an equation by balancing, **substitute** into a rule, or **read** a gradient and intercept from y = mx + c.\n\n" +
        "Whenever you solve an equation, substitute your answer back in to check it — it takes seconds and catches most slips.",
      explanationMdFr:
        "Presque toutes les questions d'algèbre de l'Année 8 sont l'un de quatre gestes : **développer** une parenthèse, **résoudre** une équation en équilibrant, **substituer** dans une règle, ou **lire** un coefficient directeur et une ordonnée à l'origine dans y = mx + c.\n\n" +
        "Chaque fois que tu résous une équation, remplace ta réponse pour vérifier — cela prend quelques secondes et attrape la plupart des erreurs.",
      workedExamples: [
        { problem: "Solve 6x + 7 = 43, then check it.", steps: ["43 - 7 = 36.", "36 ÷ 6 = 6.", "Check: 6 x 6 + 7 = 43."], answer: "x = 6" }
      ],
      workedExamplesFr: [
        { problem: "Résous 6x + 7 = 43, puis vérifie.", steps: ["43 - 7 = 36.", "36 ÷ 6 = 6.", "Vérification : 6 x 6 + 7 = 43."], answer: "x = 6" }
      ],
      audioScript: "Expand, solve, substitute, read a graph — nearly every mark is one of those four.",
      audioScriptFr: "Développer, résoudre, substituer, lire un graphique — presque tous les points viennent de ces quatre gestes."
    },
    {
      order: 3,
      title: "Geometry, probability and statistics together",
      titleFr: "Géométrie, probabilités et statistiques ensemble",
      concept: "Selecting the right geometric or data technique in a mixed question",
      conceptFr: "Choisir la bonne technique géométrique ou statistique dans une question mélangée",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y8-L10-3"],
      explanationMd:
        "A right angle and two sides means **Pythagoras**. A transformation question is answered by checking which coordinates changed sign.\n\n" +
        "In probability, expected frequency is probability x trials. In statistics, remember to give both an average and a measure of spread when you are asked to compare.",
      explanationMdFr:
        "Un angle droit et deux côtés : **Pythagore**. Une question de transformation se résout en regardant quelles coordonnées ont changé de signe.\n\n" +
        "En probabilités, l'effectif attendu est probabilité x essais. En statistiques, pense à donner à la fois une moyenne et une mesure de dispersion quand on te demande de comparer.",
      workedExamples: [
        { problem: "A rectangle is 8 m by 15 m. How long is its diagonal?", steps: ["The diagonal makes a right-angled triangle.", "8² + 15² = 64 + 225 = 289.", "√289 = 17."], answer: "17 m" }
      ],
      workedExamplesFr: [
        { problem: "Un rectangle mesure 8 m sur 15 m. Quelle est la longueur de sa diagonale ?", steps: ["La diagonale forme un triangle rectangle.", "8² + 15² = 64 + 225 = 289.", "√289 = 17."], answer: "17 m" }
      ],
      audioScript: "Right angle? Pythagoras. Comparing data? Give an average and a spread.",
      audioScriptFr: "Un angle droit ? Pythagore. Comparer des données ? Donne une moyenne et une dispersion."
    }
  ],
  Y4L2: [
    {
      order: 1,
      title: "Column addition and subtraction with four digits",
      titleFr: "Addition et soustraction posées à quatre chiffres",
      concept: "Lining up place-value columns to add and subtract numbers up to 10,000",
      conceptFr: "Aligner les colonnes de valeur de position pour additionner et soustraire jusqu'à 10 000",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L2-1"],
      explanationMd:
        "Written addition and subtraction both depend on one thing: lining the digits up in their **place-value columns** — ones under ones, tens under tens, and so on.\n\n" +
        "When a column adds to ten or more, **carry** into the next column. When the top digit is too small to subtract from, **exchange** a ten from the column to the left.",
      explanationMdFr:
        "L'addition et la soustraction posées reposent toutes deux sur une chose : aligner les chiffres dans leurs **colonnes de valeur de position** — unités sous unités, dizaines sous dizaines, et ainsi de suite.\n\n" +
        "Quand une colonne atteint dix ou plus, **reporte** une retenue dans la colonne suivante. Quand le chiffre du haut est trop petit, **emprunte** une dizaine à la colonne de gauche.",
      workedExamples: [
        { problem: "Work out 3,486 + 2,175.", steps: ["6 + 5 = 11, write 1 and carry 1.", "8 + 7 + 1 = 16, write 6 and carry 1.", "4 + 1 + 1 = 6, then 3 + 2 = 5."], answer: "5,661" },
        { problem: "Work out 4,205 - 1,348.", steps: ["5 - 8 needs an exchange: 15 - 8 = 7.", "Continue column by column, exchanging where needed."], answer: "2,857" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 3 486 + 2 175.", steps: ["6 + 5 = 11, écris 1 et retiens 1.", "8 + 7 + 1 = 16, écris 6 et retiens 1.", "4 + 1 + 1 = 6, puis 3 + 2 = 5."], answer: "5 661" },
        { problem: "Calcule 4 205 - 1 348.", steps: ["5 - 8 demande un emprunt : 15 - 8 = 7.", "Continue colonne par colonne en empruntant si besoin."], answer: "2 857" }
      ],
      audioScript: "Line the columns up first — everything else follows from that.",
      audioScriptFr: "Aligne d'abord les colonnes — tout le reste en découle."
    },
    {
      order: 2,
      title: "Estimating and checking with the inverse",
      titleFr: "Estimer et vérifier par l'opération inverse",
      concept: "Rounding to estimate an answer and using the inverse operation to check it",
      conceptFr: "Arrondir pour estimer un résultat et utiliser l'opération inverse pour le vérifier",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L2-2"],
      explanationMd:
        "An **estimate** is a quick, rough answer found by rounding. It tells you roughly what to expect, so a wildly different exact answer is a warning sign.\n\n" +
        "The **inverse** checks it exactly: addition is undone by subtraction, and subtraction is undone by addition. If 1,250 + 460 = 1,710, then 1,710 - 460 should give 1,250 back.",
      explanationMdFr:
        "Une **estimation** est une réponse rapide et approximative obtenue en arrondissant. Elle indique à quoi s'attendre : un résultat exact très différent est un signal d'alerte.\n\n" +
        "L'**opération inverse** vérifie exactement : la soustraction annule l'addition, et l'addition annule la soustraction. Si 1 250 + 460 = 1 710, alors 1 710 - 460 doit redonner 1 250.",
      workedExamples: [
        { problem: "Estimate 3,812 + 2,190 by rounding to the nearest 100.", steps: ["3,812 rounds to 3,800.", "2,190 rounds to 2,200.", "3,800 + 2,200 = 6,000."], answer: "about 6,000" }
      ],
      workedExamplesFr: [
        { problem: "Estime 3 812 + 2 190 en arrondissant à la centaine près.", steps: ["3 812 s'arrondit à 3 800.", "2 190 s'arrondit à 2 200.", "3 800 + 2 200 = 6 000."], answer: "environ 6 000" }
      ],
      audioScript: "Estimate first, calculate second, then check with the inverse.",
      audioScriptFr: "Estime d'abord, calcule ensuite, puis vérifie par l'opération inverse."
    },
    {
      order: 3,
      title: "Two-step problems",
      titleFr: "Les problèmes à deux étapes",
      concept: "Deciding which operations to use and working through them one at a time",
      conceptFr: "Choisir les opérations à utiliser et les enchaîner une à la fois",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L2-3"],
      explanationMd:
        "A two-step problem needs two calculations. Read it twice: decide what the **first** step is, do it, write the answer down, then use that answer in the second step.\n\n" +
        "Watch the words: \"altogether\" and \"more\" usually mean add, while \"left\", \"fewer\" and \"how many more than\" usually mean subtract.",
      explanationMdFr:
        "Un problème à deux étapes demande deux calculs. Lis-le deux fois : décide quelle est la **première** étape, fais-la, note le résultat, puis utilise ce résultat dans la seconde.\n\n" +
        "Surveille les mots : « en tout » et « de plus » veulent souvent dire additionner, tandis que « reste », « de moins » et « combien de plus que » veulent dire soustraire.",
      workedExamples: [
        { problem: "A museum had 2,340 visitors on Saturday and 1,180 more on Sunday. Then 760 left. How many remain?", steps: ["2,340 + 1,180 = 3,520.", "3,520 - 760 = 2,760."], answer: "2,760" }
      ],
      workedExamplesFr: [
        { problem: "Un musée a reçu 2 340 visiteurs samedi et 1 180 de plus dimanche. Puis 760 sont partis. Combien en reste-t-il ?", steps: ["2 340 + 1 180 = 3 520.", "3 520 - 760 = 2 760."], answer: "2 760" }
      ],
      audioScript: "One step at a time — write the first answer down before you start the second.",
      audioScriptFr: "Une étape à la fois — note le premier résultat avant de commencer le second."
    }
  ],
  Y4L3: [
    {
      order: 1,
      title: "Knowing all the tables to 12 x 12",
      titleFr: "Connaître toutes les tables jusqu'à 12 x 12",
      concept: "Recalling multiplication facts and their matching division facts",
      conceptFr: "Mémoriser les faits de multiplication et les divisions correspondantes",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L3-1"],
      explanationMd:
        "Every multiplication fact comes with a matching **division fact**. If you know 7 x 8 = 56, you also know 56 ÷ 8 = 7 and 56 ÷ 7 = 8.\n\n" +
        "Multiplication is also **commutative**: 7 x 8 and 8 x 7 give the same answer. That means learning one fact really gives you four.",
      explanationMdFr:
        "Chaque fait de multiplication s'accompagne d'une **division correspondante**. Si tu sais que 7 x 8 = 56, tu sais aussi que 56 ÷ 8 = 7 et 56 ÷ 7 = 8.\n\n" +
        "La multiplication est aussi **commutative** : 7 x 8 et 8 x 7 donnent le même résultat. Apprendre un fait t'en donne donc quatre.",
      workedExamples: [
        { problem: "You know 6 x 9 = 54. Write three more facts.", steps: ["9 x 6 = 54 (swap the order).", "54 ÷ 9 = 6.", "54 ÷ 6 = 9."], answer: "9 x 6 = 54, 54 ÷ 9 = 6, 54 ÷ 6 = 9" }
      ],
      workedExamplesFr: [
        { problem: "Tu sais que 6 x 9 = 54. Écris trois autres faits.", steps: ["9 x 6 = 54 (échange l'ordre).", "54 ÷ 9 = 6.", "54 ÷ 6 = 9."], answer: "9 x 6 = 54, 54 ÷ 9 = 6, 54 ÷ 6 = 9" }
      ],
      audioScript: "Learn one fact and you really learn four — two multiplications and two divisions.",
      audioScriptFr: "Apprends un fait et tu en apprends quatre — deux multiplications et deux divisions."
    },
    {
      order: 2,
      title: "Using place value and known facts",
      titleFr: "Utiliser la valeur de position et les faits connus",
      concept: "Scaling a known times-table fact up by ten or a hundred",
      conceptFr: "Agrandir un fait connu d'une table par dix ou par cent",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L3-2"],
      explanationMd:
        "A fact you already know can solve much bigger calculations. If 4 x 6 = 24, then 4 x 60 = 240 and 40 x 60 = 2,400.\n\n" +
        "Multiplying by 10 moves every digit **one place to the left**, and by 100 it moves **two places**. The digits never change — only their columns do.",
      explanationMdFr:
        "Un fait que tu connais déjà permet de résoudre des calculs bien plus grands. Si 4 x 6 = 24, alors 4 x 60 = 240 et 40 x 60 = 2 400.\n\n" +
        "Multiplier par 10 déplace chaque chiffre **d'un rang vers la gauche**, et par 100 **de deux rangs**. Les chiffres ne changent jamais — seules leurs colonnes changent.",
      workedExamples: [
        { problem: "Work out 7 x 80.", steps: ["7 x 8 = 56.", "80 is ten times 8, so the answer is ten times bigger."], answer: "560" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 7 x 80.", steps: ["7 x 8 = 56.", "80 vaut dix fois 8, donc le résultat est dix fois plus grand."], answer: "560" }
      ],
      audioScript: "Use the fact you know, then make the answer ten or a hundred times bigger.",
      audioScriptFr: "Utilise le fait que tu connais, puis rends le résultat dix ou cent fois plus grand."
    },
    {
      order: 3,
      title: "Factor pairs and commutativity",
      titleFr: "Paires de facteurs et commutativité",
      concept: "Finding the pairs of numbers that multiply to make a given number",
      conceptFr: "Trouver les paires de nombres dont le produit donne un nombre donné",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L3-3"],
      explanationMd:
        "A **factor pair** is two numbers that multiply to make a given number: 3 and 8 are a factor pair of 24, and so are 4 and 6.\n\n" +
        "A **factor** divides exactly into a number. A **multiple** is in that number's times table. Because multiplication can be done in any order, every factor pair works both ways round.",
      explanationMdFr:
        "Une **paire de facteurs**, ce sont deux nombres dont le produit donne un nombre donné : 3 et 8 forment une paire de facteurs de 24, tout comme 4 et 6.\n\n" +
        "Un **diviseur** divise exactement un nombre. Un **multiple** se trouve dans sa table. Comme la multiplication se fait dans n'importe quel ordre, chaque paire fonctionne dans les deux sens.",
      workedExamples: [
        { problem: "36 is 4 times something. What is the factor pair partner?", steps: ["36 ÷ 4 = 9.", "So the pair is 4 and 9."], answer: "9" }
      ],
      workedExamplesFr: [
        { problem: "36 vaut 4 fois quelque chose. Quel est le partenaire de la paire de facteurs ?", steps: ["36 ÷ 4 = 9.", "La paire est donc 4 et 9."], answer: "9" }
      ],
      audioScript: "Divide by the factor you have to find the one that goes with it.",
      audioScriptFr: "Divise par le facteur que tu as pour trouver celui qui l'accompagne."
    }
  ],
  Y4L4: [
    {
      order: 1,
      title: "Short multiplication",
      titleFr: "La multiplication posée",
      concept: "Multiplying a two- or three-digit number by a one-digit number in columns",
      conceptFr: "Multiplier un nombre à deux ou trois chiffres par un chiffre, en colonnes",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L4-1"],
      explanationMd:
        "In short multiplication you work from **right to left**: multiply the ones, then the tens, then the hundreds, carrying anything over ten into the next column.\n\n" +
        "It helps to see what the method is really doing: 34 x 6 is 30 x 6 plus 4 x 6, which is 180 + 24 = 204.",
      explanationMdFr:
        "Dans la multiplication posée, tu travailles **de droite à gauche** : multiplie les unités, puis les dizaines, puis les centaines, en reportant les retenues.\n\n" +
        "Il est utile de voir ce que fait vraiment la méthode : 34 x 6, c'est 30 x 6 plus 4 x 6, soit 180 + 24 = 204.",
      workedExamples: [
        { problem: "Work out 47 x 6.", steps: ["7 x 6 = 42, write 2 and carry 4.", "4 x 6 = 24, plus the carried 4 is 28."], answer: "282" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 47 x 6.", steps: ["7 x 6 = 42, écris 2 et retiens 4.", "4 x 6 = 24, plus la retenue 4 donne 28."], answer: "282" }
      ],
      audioScript: "Ones first, then tens, carrying as you go.",
      audioScriptFr: "D'abord les unités, puis les dizaines, avec les retenues."
    },
    {
      order: 2,
      title: "Division and what to do with a remainder",
      titleFr: "La division et le traitement du reste",
      concept: "Dividing with remainders and interpreting them in context",
      conceptFr: "Diviser avec un reste et l'interpréter selon le contexte",
      representation: "pictorial",
      visualAid: "counters",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L4-2"],
      explanationMd:
        "When a division does not work out exactly, what is left over is the **remainder**. 47 ÷ 5 = 9 remainder 2.\n\n" +
        "What you do with the remainder depends on the question. Counting full boxes means **round down**. Making sure everyone fits means **round up**. Sometimes the remainder itself is the answer.",
      explanationMdFr:
        "Quand une division ne tombe pas juste, ce qui reste est le **reste**. 47 ÷ 5 = 9 reste 2.\n\n" +
        "Ce que tu fais du reste dépend de la question. Compter des boîtes pleines veut dire **arrondir vers le bas**. S'assurer que tout le monde tienne veut dire **arrondir vers le haut**. Parfois, le reste lui-même est la réponse.",
      workedExamples: [
        { problem: "53 children need minibuses holding 8 each. How many minibuses?", steps: ["53 ÷ 8 = 6 remainder 5.", "The 5 left over still need a seat, so round up."], answer: "7" }
      ],
      workedExamplesFr: [
        { problem: "53 enfants ont besoin de minibus de 8 places. Combien de minibus faut-il ?", steps: ["53 ÷ 8 = 6 reste 5.", "Les 5 restants ont aussi besoin d'une place, donc on arrondit au-dessus."], answer: "7" }
      ],
      audioScript: "Work out the remainder, then ask what the story needs you to do with it.",
      audioScriptFr: "Calcule le reste, puis demande-toi ce que l'énoncé veut que tu en fasses."
    },
    {
      order: 3,
      title: "The distributive law",
      titleFr: "La distributivité",
      concept: "Splitting a number into parts, multiplying each part and adding the results",
      conceptFr: "Séparer un nombre en parties, multiplier chaque partie et additionner",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L4-3"],
      explanationMd:
        "The **distributive law** says you can split one number up, multiply each part separately and then add. It is exactly what short multiplication does underneath.\n\n" +
        "For example, 38 x 4 = (30 x 4) + (8 x 4) = 120 + 32 = 152. Splitting into tens and ones turns one hard calculation into two easy ones.",
      explanationMdFr:
        "La **distributivité** permet de séparer un nombre, de multiplier chaque partie séparément, puis d'additionner. C'est exactement ce que fait la multiplication posée.\n\n" +
        "Par exemple, 38 x 4 = (30 x 4) + (8 x 4) = 120 + 32 = 152. Séparer en dizaines et unités transforme un calcul difficile en deux calculs faciles.",
      workedExamples: [
        { problem: "Use the distributive law for 56 x 3.", steps: ["50 x 3 = 150.", "6 x 3 = 18.", "150 + 18 = 168."], answer: "168" }
      ],
      workedExamplesFr: [
        { problem: "Utilise la distributivité pour 56 x 3.", steps: ["50 x 3 = 150.", "6 x 3 = 18.", "150 + 18 = 168."], answer: "168" }
      ],
      audioScript: "Split into tens and ones, multiply both, then add the two parts.",
      audioScriptFr: "Sépare en dizaines et unités, multiplie les deux, puis additionne les deux parties."
    }
  ],
  Y4L5: [
    {
      order: 1,
      title: "Families of equivalent fractions",
      titleFr: "Les familles de fractions équivalentes",
      concept: "Multiplying or dividing top and bottom by the same number",
      conceptFr: "Multiplier ou diviser le haut et le bas par le même nombre",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L5-1"],
      explanationMd:
        "Two fractions are **equivalent** when they show the same amount: 1/2, 2/4, 3/6 and 4/8 are all the same size.\n\n" +
        "To find an equivalent fraction, multiply **both** the top and the bottom by the same number — or divide both by the same number to simplify.",
      explanationMdFr:
        "Deux fractions sont **équivalentes** quand elles représentent la même quantité : 1/2, 2/4, 3/6 et 4/8 valent toutes la même chose.\n\n" +
        "Pour trouver une fraction équivalente, multiplie **à la fois** le haut et le bas par le même nombre — ou divise les deux par le même nombre pour simplifier.",
      workedExamples: [
        { problem: "Complete 3/5 = ?/20.", steps: ["5 x 4 = 20, so the bottom was multiplied by 4.", "Do the same on top: 3 x 4 = 12."], answer: "12/20" }
      ],
      workedExamplesFr: [
        { problem: "Complète 3/5 = ?/20.", steps: ["5 x 4 = 20, donc le bas a été multiplié par 4.", "Fais pareil en haut : 3 x 4 = 12."], answer: "12/20" }
      ],
      audioScript: "Whatever you do to the bottom, do exactly the same to the top.",
      audioScriptFr: "Ce que tu fais en bas, fais exactement la même chose en haut."
    },
    {
      order: 2,
      title: "Adding and subtracting fractions with the same denominator",
      titleFr: "Additionner et soustraire des fractions de même dénominateur",
      concept: "Adding and subtracting only the numerators when the denominators match",
      conceptFr: "N'additionner et ne soustraire que les numérateurs quand les dénominateurs sont identiques",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L5-2"],
      explanationMd:
        "When the denominators are the same, the pieces are the same size, so you simply **add or subtract the numerators**. The denominator does not change.\n\n" +
        "3/8 + 2/8 = 5/8, not 5/16. One whole is the denominator over itself, so 8/8 = 1.",
      explanationMdFr:
        "Quand les dénominateurs sont identiques, les parts ont la même taille : il suffit d'**additionner ou de soustraire les numérateurs**. Le dénominateur ne change pas.\n\n" +
        "3/8 + 2/8 = 5/8, et non 5/16. Un tout vaut le dénominateur sur lui-même, donc 8/8 = 1.",
      workedExamples: [
        { problem: "Work out 3/7 + 2/7.", steps: ["The denominators match, so add the numerators.", "3 + 2 = 5."], answer: "5/7" },
        { problem: "What must be added to 4/9 to make 1?", steps: ["1 whole is 9/9.", "9 - 4 = 5."], answer: "5/9" }
      ],
      workedExamplesFr: [
        { problem: "Calcule 3/7 + 2/7.", steps: ["Les dénominateurs sont identiques : additionne les numérateurs.", "3 + 2 = 5."], answer: "5/7" },
        { problem: "Que faut-il ajouter à 4/9 pour obtenir 1 ?", steps: ["Un tout vaut 9/9.", "9 - 4 = 5."], answer: "5/9" }
      ],
      audioScript: "Same bottoms? Then only the top numbers change.",
      audioScriptFr: "Mêmes dénominateurs ? Alors seuls les numérateurs changent."
    },
    {
      order: 3,
      title: "Quarters, halves and their decimals",
      titleFr: "Quarts, moitiés et leurs décimaux",
      concept: "Learning the decimal equivalents of 1/4, 1/2 and 3/4",
      conceptFr: "Apprendre les équivalents décimaux de 1/4, 1/2 et 3/4",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L5-3"],
      explanationMd:
        "Three decimal equivalents are worth learning by heart: **1/4 = 0.25**, **1/2 = 0.5** and **3/4 = 0.75**.\n\n" +
        "To find a fraction of an amount, divide by the bottom number and then multiply by the top one. A quarter of 20 is 20 ÷ 4 = 5, so three quarters of 20 is 5 x 3 = 15.",
      explanationMdFr:
        "Trois équivalents décimaux méritent d'être appris par cœur : **1/4 = 0,25**, **1/2 = 0,5** et **3/4 = 0,75**.\n\n" +
        "Pour trouver une fraction d'une quantité, divise par le nombre du bas puis multiplie par celui du haut. Un quart de 20 vaut 20 ÷ 4 = 5, donc trois quarts de 20 valent 5 x 3 = 15.",
      workedExamples: [
        { problem: "What is 3/4 of 28?", steps: ["28 ÷ 4 = 7.", "7 x 3 = 21."], answer: "21" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 3/4 de 28 ?", steps: ["28 ÷ 4 = 7.", "7 x 3 = 21."], answer: "21" }
      ],
      audioScript: "Divide by the bottom, multiply by the top — and learn 0.25, 0.5 and 0.75 by heart.",
      audioScriptFr: "Divise par le bas, multiplie par le haut — et apprends 0,25, 0,5 et 0,75 par cœur."
    }
  ],
  Y4L6: [
    {
      order: 1,
      title: "Tenths and hundredths",
      titleFr: "Dixièmes et centièmes",
      concept: "Writing tenths and hundredths as decimals and back again",
      conceptFr: "Écrire des dixièmes et des centièmes en décimal, et inversement",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L6-1"],
      explanationMd:
        "After the decimal point, the first column is **tenths** and the second is **hundredths**. So 0.7 is seven tenths and 0.43 is forty-three hundredths.\n\n" +
        "Dividing by 10 moves every digit one place right; dividing by 100 moves it two places. Money works the same way: 250p = £2.50.",
      explanationMdFr:
        "Après la virgule, la première colonne est celle des **dixièmes** et la seconde celle des **centièmes**. Ainsi 0,7 vaut sept dixièmes et 0,43 quarante-trois centièmes.\n\n" +
        "Diviser par 10 déplace chaque chiffre d'un rang vers la droite ; diviser par 100 le déplace de deux rangs. L'argent fonctionne pareil : 250 p = 2,50 £.",
      workedExamples: [
        { problem: "Write 37 hundredths as a decimal.", steps: ["37 ÷ 100 moves the digits two places right."], answer: "0.37" }
      ],
      workedExamplesFr: [
        { problem: "Écris 37 centièmes sous forme décimale.", steps: ["37 ÷ 100 déplace les chiffres de deux rangs vers la droite."], answer: "0,37" }
      ],
      audioScript: "Tenths first, hundredths second — each step right is ten times smaller.",
      audioScriptFr: "D'abord les dixièmes, puis les centièmes — chaque pas vers la droite est dix fois plus petit."
    },
    {
      order: 2,
      title: "Rounding decimals to the nearest whole number",
      titleFr: "Arrondir des décimaux à l'unité la plus proche",
      concept: "Using the tenths digit to decide whether to round up or down",
      conceptFr: "Utiliser le chiffre des dixièmes pour décider d'arrondir au-dessus ou en dessous",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L6-2"],
      explanationMd:
        "To round a decimal with one decimal place, look **only at the tenths digit**. If it is 5 or more, round up; if it is less than 5, round down.\n\n" +
        "A number line makes it obvious: 6.3 is closer to 6, while 6.8 is closer to 7. Exactly 6.5 is halfway, and the rule says round up.",
      explanationMdFr:
        "Pour arrondir un décimal à un chiffre après la virgule, regarde **seulement le chiffre des dixièmes**. S'il vaut 5 ou plus, arrondis au-dessus ; s'il vaut moins de 5, en dessous.\n\n" +
        "Une droite graduée le montre bien : 6,3 est plus proche de 6, tandis que 6,8 est plus proche de 7. Exactement 6,5 est au milieu, et la règle dit d'arrondir au-dessus.",
      workedExamples: [
        { problem: "Round 8.4 to the nearest whole number.", steps: ["The tenths digit is 4.", "4 is less than 5, so round down."], answer: "8" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 8,4 à l'unité la plus proche.", steps: ["Le chiffre des dixièmes est 4.", "4 est inférieur à 5, donc on arrondit en dessous."], answer: "8" }
      ],
      audioScript: "Look at the tenths digit and nothing else — 5 or more rounds up.",
      audioScriptFr: "Regarde le chiffre des dixièmes et rien d'autre — 5 ou plus, on arrondit au-dessus."
    },
    {
      order: 3,
      title: "Comparing decimals",
      titleFr: "Comparer des décimaux",
      concept: "Comparing decimals column by column from the left",
      conceptFr: "Comparer des décimaux colonne par colonne depuis la gauche",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L6-3"],
      explanationMd:
        "To compare decimals, start on the **left** and work right: compare the whole numbers first, then the tenths, then the hundredths.\n\n" +
        "A longer decimal is not automatically bigger: 0.6 is larger than 0.59, because six tenths beats five tenths no matter what follows.",
      explanationMdFr:
        "Pour comparer des décimaux, commence **à gauche** et avance vers la droite : compare d'abord les entiers, puis les dixièmes, puis les centièmes.\n\n" +
        "Un décimal plus long n'est pas forcément plus grand : 0,6 est plus grand que 0,59, car six dixièmes battent cinq dixièmes quoi qu'il suive.",
      workedExamples: [
        { problem: "Which is larger, 4.07 or 4.7?", steps: ["The whole numbers are both 4.", "The tenths are 0 and 7, so 4.7 is larger."], answer: "4.7" }
      ],
      workedExamplesFr: [
        { problem: "Lequel est le plus grand, 4,07 ou 4,7 ?", steps: ["Les entiers valent tous deux 4.", "Les dixièmes valent 0 et 7, donc 4,7 est plus grand."], answer: "4,7" }
      ],
      audioScript: "Start at the left and compare one column at a time.",
      audioScriptFr: "Commence à gauche et compare une colonne à la fois."
    }
  ],
  Y4L7: [
    {
      order: 1,
      title: "Converting units of measure",
      titleFr: "Convertir des unités de mesure",
      concept: "Multiplying or dividing by 10, 100, 1,000 or 60 to change units",
      conceptFr: "Multiplier ou diviser par 10, 100, 1 000 ou 60 pour changer d'unité",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L7-1"],
      explanationMd:
        "Metric units go up in powers of ten: **10 mm = 1 cm**, **100 cm = 1 m**, **1,000 m = 1 km**, **1,000 g = 1 kg** and **1,000 ml = 1 litre**.\n\n" +
        "Time is different: there are **60 seconds in a minute** and **60 minutes in an hour**. Going to a smaller unit always multiplies; going to a bigger unit always divides.",
      explanationMdFr:
        "Les unités métriques avancent par puissances de dix : **10 mm = 1 cm**, **100 cm = 1 m**, **1 000 m = 1 km**, **1 000 g = 1 kg** et **1 000 ml = 1 litre**.\n\n" +
        "Le temps est différent : il y a **60 secondes dans une minute** et **60 minutes dans une heure**. Passer à une unité plus petite multiplie toujours ; passer à une plus grande divise toujours.",
      workedExamples: [
        { problem: "How many metres are in 7 km?", steps: ["There are 1,000 m in 1 km.", "7 x 1,000 = 7,000."], answer: "7,000 m" },
        { problem: "Convert 3 m 45 cm into centimetres.", steps: ["3 m = 300 cm.", "300 + 45 = 345."], answer: "345 cm" }
      ],
      workedExamplesFr: [
        { problem: "Combien y a-t-il de mètres dans 7 km ?", steps: ["Il y a 1 000 m dans 1 km.", "7 x 1 000 = 7 000."], answer: "7 000 m" },
        { problem: "Convertis 3 m 45 cm en centimètres.", steps: ["3 m = 300 cm.", "300 + 45 = 345."], answer: "345 cm" }
      ],
      audioScript: "Smaller unit means multiply; bigger unit means divide.",
      audioScriptFr: "Unité plus petite : multiplie ; unité plus grande : divise."
    },
    {
      order: 2,
      title: "Area by counting squares",
      titleFr: "L'aire en comptant les carreaux",
      concept: "Finding area by counting or multiplying rows of squares",
      conceptFr: "Trouver l'aire en comptant ou en multipliant des rangées de carreaux",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L7-2"],
      explanationMd:
        "**Area** is how much space a shape covers. On squared paper you can count the squares — but for a rectangle it is much faster to multiply the rows by the number in each row.\n\n" +
        "For an L-shape, split it into two rectangles, find each area and add them together.",
      explanationMdFr:
        "L'**aire** est l'espace qu'occupe une figure. Sur du papier quadrillé, tu peux compter les carreaux — mais pour un rectangle il est bien plus rapide de multiplier les rangées par le nombre de carreaux par rangée.\n\n" +
        "Pour une forme en L, découpe-la en deux rectangles, calcule chaque aire et additionne.",
      workedExamples: [
        { problem: "A rectangle is 7 squares by 5 squares. What is its area?", steps: ["Counting every square would take ages.", "7 x 5 = 35."], answer: "35 squares" }
      ],
      workedExamplesFr: [
        { problem: "Un rectangle fait 7 carreaux sur 5 carreaux. Quelle est son aire ?", steps: ["Compter chaque carreau prendrait longtemps.", "7 x 5 = 35."], answer: "35 carreaux" }
      ],
      audioScript: "Count a row, then multiply by the number of rows.",
      audioScriptFr: "Compte une rangée, puis multiplie par le nombre de rangées."
    },
    {
      order: 3,
      title: "Perimeter of rectilinear figures",
      titleFr: "Le périmètre des figures rectilignes",
      concept: "Adding all the sides to find the distance around a shape",
      conceptFr: "Additionner tous les côtés pour trouver la distance autour d'une figure",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L7-3"],
      explanationMd:
        "**Perimeter** is the distance all the way around the outside of a shape. Add every side — do not multiply.\n\n" +
        "A rectangle has two long sides and two short ones, so its perimeter is 2 x (length + width). A square has four equal sides, so its perimeter is 4 x one side.",
      explanationMdFr:
        "Le **périmètre** est la distance tout autour d'une figure. Additionne chaque côté — ne multiplie pas.\n\n" +
        "Un rectangle a deux grands côtés et deux petits, donc son périmètre vaut 2 x (longueur + largeur). Un carré a quatre côtés égaux, donc son périmètre vaut 4 x un côté.",
      workedExamples: [
        { problem: "A rectangle is 9 cm by 4 cm. Find its perimeter.", steps: ["9 + 4 = 13.", "2 x 13 = 26."], answer: "26 cm" }
      ],
      workedExamplesFr: [
        { problem: "Un rectangle mesure 9 cm sur 4 cm. Trouve son périmètre.", steps: ["9 + 4 = 13.", "2 x 13 = 26."], answer: "26 cm" }
      ],
      audioScript: "Perimeter adds the sides; area multiplies them. Do not mix them up.",
      audioScriptFr: "Le périmètre additionne les côtés ; l'aire les multiplie. Ne les confonds pas."
    }
  ],
  Y4L8: [
    {
      order: 1,
      title: "Classifying shapes",
      titleFr: "Classer les figures",
      concept: "Sorting quadrilaterals and triangles by their sides and angles",
      conceptFr: "Trier les quadrilatères et les triangles selon leurs côtés et leurs angles",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L8-1"],
      explanationMd:
        "Quadrilaterals are sorted by their sides and angles: a **square** has four equal sides and four right angles, a **rectangle** has two pairs of equal sides and four right angles, a **parallelogram** has two pairs of parallel sides, and a **trapezium** has exactly one pair.\n\n" +
        "Triangles are sorted the same way: **equilateral** (three equal sides), **isosceles** (two equal), **scalene** (none equal) and **right-angled** (one 90° angle).",
      explanationMdFr:
        "Les quadrilatères se classent selon leurs côtés et leurs angles : un **carré** a quatre côtés égaux et quatre angles droits, un **rectangle** a deux paires de côtés égaux et quatre angles droits, un **parallélogramme** a deux paires de côtés parallèles, et un **trapèze** exactement une paire.\n\n" +
        "Les triangles se classent pareil : **équilatéral** (trois côtés égaux), **isocèle** (deux égaux), **scalène** (aucun égal) et **rectangle** (un angle de 90°).",
      workedExamples: [
        { problem: "A four-sided shape has two pairs of equal sides and four right angles. What is it?", steps: ["Four right angles rules out a parallelogram and a trapezium.", "The sides are equal in pairs, not all four."], answer: "a rectangle" }
      ],
      workedExamplesFr: [
        { problem: "Une figure à quatre côtés a deux paires de côtés égaux et quatre angles droits. Qu'est-ce que c'est ?", steps: ["Quatre angles droits excluent le parallélogramme et le trapèze.", "Les côtés sont égaux deux à deux, pas tous les quatre."], answer: "un rectangle" }
      ],
      audioScript: "Count the equal sides, then count the right angles.",
      audioScriptFr: "Compte les côtés égaux, puis les angles droits."
    },
    {
      order: 2,
      title: "Acute, right and obtuse angles",
      titleFr: "Angles aigus, droits et obtus",
      concept: "Classifying and calculating angles using 90° and 180°",
      conceptFr: "Classer et calculer des angles à l'aide de 90° et 180°",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L8-2"],
      explanationMd:
        "An **acute** angle is less than 90°, a **right** angle is exactly 90°, an **obtuse** angle is between 90° and 180°, and a **reflex** angle is more than 180°.\n\n" +
        "Two useful facts: angles on a straight line add to **180°**, and angles all the way around a point add to **360°**.",
      explanationMdFr:
        "Un angle **aigu** mesure moins de 90°, un angle **droit** exactement 90°, un angle **obtus** entre 90° et 180°, et un angle **rentrant** plus de 180°.\n\n" +
        "Deux faits utiles : les angles sur une droite ont pour somme **180°**, et les angles autour d'un point **360°**.",
      workedExamples: [
        { problem: "Two angles sit on a straight line. One is 115°. What is the other?", steps: ["Angles on a straight line add to 180°.", "180 - 115 = 65."], answer: "65°" }
      ],
      workedExamplesFr: [
        { problem: "Deux angles sont sur une droite. L'un vaut 115°. Combien vaut l'autre ?", steps: ["Les angles sur une droite ont pour somme 180°.", "180 - 115 = 65."], answer: "65°" }
      ],
      audioScript: "Compare each angle with 90 and 180 — that tells you what kind it is.",
      audioScriptFr: "Compare chaque angle à 90 et 180 — cela te dit de quel type il s'agit."
    },
    {
      order: 3,
      title: "Coordinates in the first quadrant",
      titleFr: "Les coordonnées dans le premier quadrant",
      concept: "Reading and plotting points written as (across, up)",
      conceptFr: "Lire et placer des points écrits (horizontal, vertical)",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L8-3"],
      explanationMd:
        "Coordinates are always written **(across, up)**. The first number says how far along the bottom axis to go, and the second says how far up.\n\n" +
        "A useful way to remember it: go along the corridor before you go up the stairs. Moving right changes only the first number; moving up changes only the second.",
      explanationMdFr:
        "Les coordonnées s'écrivent toujours **(horizontal, vertical)**. Le premier nombre indique de combien avancer sur l'axe du bas, le second de combien monter.\n\n" +
        "Un moyen de s'en souvenir : d'abord le couloir, ensuite l'escalier. Se déplacer vers la droite ne change que le premier nombre ; monter ne change que le second.",
      workedExamples: [
        { problem: "A counter at (3, 5) moves 4 squares right. Where is it now?", steps: ["Moving right changes the first number.", "3 + 4 = 7, and the 5 stays the same."], answer: "(7, 5)" }
      ],
      workedExamplesFr: [
        { problem: "Un jeton en (3, 5) se déplace de 4 carreaux vers la droite. Où est-il maintenant ?", steps: ["Se déplacer vers la droite change le premier nombre.", "3 + 4 = 7, et le 5 ne change pas."], answer: "(7, 5)" }
      ],
      audioScript: "Along the corridor, then up the stairs — across first, up second.",
      audioScriptFr: "D'abord le couloir, ensuite l'escalier — horizontalement puis verticalement."
    }
  ],
  Y4L9: [
    {
      order: 1,
      title: "Reading bar charts and time graphs",
      titleFr: "Lire des diagrammes en barres et des graphiques",
      concept: "Using the scale to read values from a chart accurately",
      conceptFr: "Utiliser l'échelle pour lire correctement les valeurs d'un graphique",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L9-1"],
      explanationMd:
        "Before reading any chart, check the **scale**. One square does not always mean one — it might mean 2, 5 or 10.\n\n" +
        "On a **bar chart** the height of each bar gives the value. On a **time graph** the line shows how something changes, so a rising line means an increase. A **pictogram** has a key telling you what one picture is worth.",
      explanationMdFr:
        "Avant de lire un graphique, vérifie l'**échelle**. Un carreau ne vaut pas toujours un — il peut valoir 2, 5 ou 10.\n\n" +
        "Sur un **diagramme en barres**, la hauteur de chaque barre donne la valeur. Sur un **graphique de temps**, la courbe montre une évolution : une ligne qui monte signale une augmentation. Un **pictogramme** a une légende indiquant ce que vaut une image.",
      workedExamples: [
        { problem: "Each square on a chart stands for 5. A bar is 7 squares tall. What value does it show?", steps: ["Each square is worth 5.", "7 x 5 = 35."], answer: "35" }
      ],
      workedExamplesFr: [
        { problem: "Chaque carreau d'un graphique vaut 5. Une barre fait 7 carreaux de haut. Quelle valeur montre-t-elle ?", steps: ["Chaque carreau vaut 5.", "7 x 5 = 35."], answer: "35" }
      ],
      audioScript: "Check the scale before you read a single bar.",
      audioScriptFr: "Vérifie l'échelle avant même de lire une barre."
    },
    {
      order: 2,
      title: "Comparison, sum and difference problems",
      titleFr: "Problèmes de comparaison, de somme et de différence",
      concept: "Choosing to add or subtract when answering questions about charts",
      conceptFr: "Choisir d'additionner ou de soustraire pour répondre à des questions sur un graphique",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L9-2"],
      explanationMd:
        "Chart questions nearly always come in three kinds. **Sum** questions use words like \"altogether\" and \"in total\" — add. **Difference** questions use \"how many more\" or \"how many fewer\" — subtract.\n\n" +
        "**Comparison** questions ask which is biggest or smallest — just read the bars and compare, no calculation needed.",
      explanationMdFr:
        "Les questions sur les graphiques sont presque toujours de trois sortes. Les questions de **somme** utilisent « en tout » ou « au total » — additionne. Les questions de **différence** utilisent « combien de plus » ou « combien de moins » — soustrais.\n\n" +
        "Les questions de **comparaison** demandent lequel est le plus grand ou le plus petit — il suffit de lire les barres et de comparer, sans calcul.",
      workedExamples: [
        { problem: "One bar shows 42 and another shows 27. How many more does the first show?", steps: ["\"How many more\" means subtract.", "42 - 27 = 15."], answer: "15" }
      ],
      workedExamplesFr: [
        { problem: "Une barre montre 42 et une autre 27. Combien de plus montre la première ?", steps: ["« Combien de plus » veut dire soustraire.", "42 - 27 = 15."], answer: "15" }
      ],
      audioScript: "Spot the question word — it tells you whether to add or subtract.",
      audioScriptFr: "Repère le mot de la question — il dit s'il faut additionner ou soustraire."
    },
    {
      order: 3,
      title: "Frequency tables and tally charts",
      titleFr: "Tableaux d'effectifs et tableaux de comptage",
      concept: "Completing tables and converting tally marks into frequencies",
      conceptFr: "Compléter des tableaux et convertir des barres de comptage en effectifs",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L9-3"],
      explanationMd:
        "A **frequency table** records how many times each result happened. All the frequencies must add up to the total — which lets you find a missing row by subtracting.\n\n" +
        "A **tally** groups marks in fives, with the fifth drawn across the other four. So three gates and two extra marks is 3 x 5 + 2 = 17.",
      explanationMdFr:
        "Un **tableau d'effectifs** indique combien de fois chaque résultat s'est produit. Tous les effectifs doivent s'additionner pour donner le total — ce qui permet de retrouver une ligne manquante par soustraction.\n\n" +
        "Un **comptage** groupe les barres par cinq, la cinquième barrant les quatre autres. Ainsi trois paquets et deux barres font 3 x 5 + 2 = 17.",
      workedExamples: [
        { problem: "A table of 60 results shows 22 and 17 in two rows. What is the third row?", steps: ["22 + 17 = 39.", "60 - 39 = 21."], answer: "21" }
      ],
      workedExamplesFr: [
        { problem: "Un tableau de 60 résultats indique 22 et 17 sur deux lignes. Que vaut la troisième ?", steps: ["22 + 17 = 39.", "60 - 39 = 21."], answer: "21" }
      ],
      audioScript: "The rows always add to the total — use that to fill a gap or to check your work.",
      audioScriptFr: "Les lignes s'additionnent toujours pour donner le total — sers-t'en pour compléter ou vérifier."
    }
  ],
  Y4L10: [
    {
      order: 1,
      title: "Place value, rounding and the four operations",
      titleFr: "Valeur de position, arrondi et quatre opérations",
      concept: "Choosing an efficient method and checking it makes sense",
      conceptFr: "Choisir une méthode efficace et vérifier qu'elle a du sens",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L10-1"],
      explanationMd:
        "When you round, always look at the digit **one place to the right** of the column you are rounding to: the tens digit for the nearest hundred, the hundreds digit for the nearest thousand.\n\n" +
        "In a multi-step question, estimate first by rounding. If your exact answer is nowhere near the estimate, go back and check.",
      explanationMdFr:
        "Quand tu arrondis, regarde toujours le chiffre **juste à droite** de la colonne visée : le chiffre des dizaines pour la centaine, celui des centaines pour le millier.\n\n" +
        "Dans une question à plusieurs étapes, estime d'abord en arrondissant. Si ta réponse exacte est loin de l'estimation, reviens vérifier.",
      workedExamples: [
        { problem: "Round 4,682 to the nearest 1,000.", steps: ["The hundreds digit is 6.", "6 is 5 or more, so round up."], answer: "5,000" }
      ],
      workedExamplesFr: [
        { problem: "Arrondis 4 682 au millier le plus proche.", steps: ["Le chiffre des centaines est 6.", "6 vaut 5 ou plus, donc on arrondit au-dessus."], answer: "5 000" }
      ],
      audioScript: "Look one place to the right of the column you are rounding to.",
      audioScriptFr: "Regarde une colonne à droite de celle à laquelle tu arrondis."
    },
    {
      order: 2,
      title: "Tables, fractions and decimals together",
      titleFr: "Tables, fractions et décimaux ensemble",
      concept: "Moving between times tables, fractions of amounts and decimal equivalents",
      conceptFr: "Passer des tables aux fractions d'une quantité et aux équivalents décimaux",
      representation: "abstract",
      visualAid: "bar-model",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L10-2"],
      explanationMd:
        "Times tables sit underneath almost everything else. Finding a fraction of an amount is division then multiplication, and both come straight from your tables.\n\n" +
        "Keep the decimal facts handy too: 1/10 = 0.1, 1/4 = 0.25, 1/2 = 0.5 and 3/4 = 0.75.",
      explanationMdFr:
        "Les tables de multiplication sont à la base de presque tout le reste. Trouver une fraction d'une quantité, c'est une division puis une multiplication, qui viennent directement des tables.\n\n" +
        "Garde aussi les équivalents décimaux en tête : 1/10 = 0,1, 1/4 = 0,25, 1/2 = 0,5 et 3/4 = 0,75.",
      workedExamples: [
        { problem: "What is 2/5 of 45?", steps: ["45 ÷ 5 = 9.", "9 x 2 = 18."], answer: "18" }
      ],
      workedExamplesFr: [
        { problem: "Que vaut 2/5 de 45 ?", steps: ["45 ÷ 5 = 9.", "9 x 2 = 18."], answer: "18" }
      ],
      audioScript: "Divide by the bottom, multiply by the top — your tables do the work.",
      audioScriptFr: "Divise par le bas, multiplie par le haut — ce sont tes tables qui font le travail."
    },
    {
      order: 3,
      title: "Measurement, shape and data together",
      titleFr: "Mesures, figures et données ensemble",
      concept: "Picking the right measurement, geometry or statistics idea for a question",
      conceptFr: "Choisir la bonne idée de mesure, de géométrie ou de statistiques pour une question",
      representation: "pictorial",
      visualAid: "shape",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L10-3"],
      explanationMd:
        "Three things catch people out most often. **Perimeter adds the sides; area multiplies two of them.** **Converting to a smaller unit multiplies; converting to a bigger unit divides.** **Angles on a straight line add to 180°.**\n\n" +
        "With charts, always check the scale before reading a value, and check the units in your answer before you write it down.",
      explanationMdFr:
        "Trois pièges reviennent souvent. **Le périmètre additionne les côtés ; l'aire en multiplie deux.** **Convertir vers une unité plus petite multiplie ; vers une plus grande divise.** **Les angles sur une droite ont pour somme 180°.**\n\n" +
        "Avec les graphiques, vérifie toujours l'échelle avant de lire une valeur, et vérifie les unités de ta réponse avant de l'écrire.",
      workedExamples: [
        { problem: "A rug is 6 m by 4 m. Give its perimeter and its area.", steps: ["Perimeter: 2 x (6 + 4) = 20 m.", "Area: 6 x 4 = 24 m²."], answer: "20 m and 24 m²" }
      ],
      workedExamplesFr: [
        { problem: "Un tapis mesure 6 m sur 4 m. Donne son périmètre et son aire.", steps: ["Périmètre : 2 x (6 + 4) = 20 m.", "Aire : 6 x 4 = 24 m²."], answer: "20 m et 24 m²" }
      ],
      audioScript: "Perimeter adds, area multiplies — and always check your units.",
      audioScriptFr: "Le périmètre additionne, l'aire multiplie — et vérifie toujours tes unités."
    }
  ]
};
