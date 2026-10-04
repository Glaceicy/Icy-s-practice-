import type { SchoolYearDef } from "./types";

// Year 4 (ages 8-9, KS2). All ten levels are fully authored (lessons, practice
// and mastery question banks — see questionEngine/templates/all.ts
// COMPLETE_LEVEL_KEYS). Grounded in the DfE National Curriculum Key Stage 2
// Year 4 programme of study.
export const year4: SchoolYearDef = {
  yearNumber: 4,
  title: "Year 4",
  titleFr: "Année 4",
  keyStage: "KS2",
  summary: "Times tables to 12x12, decimals and area for 8-9 year olds.",
  summaryFr: "Les tables de multiplication jusqu’à 12x12, les décimaux et l’aire pour les enfants de 8 à 9 ans.",
  minAge: 8,
  maxAge: 9,
  themeStage: "adventure",
  levels: [
    { levelNumber: 1, title: "Place value, rounding and numbers to 10,000", titleFr: "Valeur de position, arrondi et nombres jusqu’à 10 000", summary: "By the end of this level, you will read, write and round numbers to 10,000.", summaryFr: "À la fin de ce niveau, tu sauras lire, écrire et arrondir les nombres jusqu’à 10 000.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L1-1", description: "Recognise the place value of each digit in a four-digit number.", descriptionFr: "Reconnaître la valeur de position de chaque chiffre dans un nombre à quatre chiffres.", dfeReference: "Y4 Number & place value: recognise place value of each digit (Th,H,T,O)" },
      { code: "Y4-L1-2", description: "Round any number to the nearest 10, 100 or 1,000.", descriptionFr: "Arrondir n’importe quel nombre à la dizaine, la centaine ou au millier le plus proche.", dfeReference: "Y4 Number & place value: round any number to the nearest 10, 100 or 1000" },
      { code: "Y4-L1-3", description: "Count in multiples of 6, 7, 9, 25 and 1,000.", descriptionFr: "Compter de 6 en 6, de 7 en 7, de 9 en 9, de 25 en 25 et de 1 000 en 1 000.", dfeReference: "Y4 Number & place value: count in multiples of 6, 7, 9, 25 and 1000" }
    ]},
    { levelNumber: 2, title: "Addition and subtraction", titleFr: "Addition et soustraction", summary: "By the end of this level, you will add and subtract numbers with up to 4 digits.", summaryFr: "À la fin de ce niveau, tu sauras additionner et soustraire des nombres jusqu'à 4 chiffres.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L2-1", description: "Add and subtract numbers with up to 4 digits using the formal written column method.", descriptionFr: "Additionner et soustraire des nombres jusqu'à 4 chiffres avec la méthode posée en colonnes.", dfeReference: "Y4 Addition & subtraction: add/subtract using formal written methods" },
      { code: "Y4-L2-2", description: "Estimate and use inverse operations to check answers.", descriptionFr: "Estimer et utiliser les opérations inverses pour vérifier ses réponses.", dfeReference: "Y4 Addition & subtraction: estimate and use inverse operations" },
      { code: "Y4-L2-3", description: "Solve two-step addition and subtraction problems, deciding which operations to use.", descriptionFr: "Résoudre des problèmes d'addition et de soustraction à deux étapes en choisissant les opérations.", dfeReference: "Y4 Addition & subtraction: solve two-step problems" }
    ]},
    { levelNumber: 3, title: "Multiplication tables up to 12 x 12", titleFr: "Les tables de multiplication jusqu'à 12 x 12", summary: "By the end of this level, you will recall all multiplication and division facts up to 12x12.", summaryFr: "À la fin de ce niveau, tu connaîtras tous les faits de multiplication et de division jusqu'à 12 x 12.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L3-1", description: "Recall multiplication and division facts for all tables up to 12 x 12.", descriptionFr: "Connaître les faits de multiplication et de division de toutes les tables jusqu'à 12 x 12.", dfeReference: "Y4 Multiplication & division: recall facts up to 12x12" },
      { code: "Y4-L3-2", description: "Use place value and known facts to multiply and divide mentally.", descriptionFr: "Utiliser la valeur de position et les faits connus pour multiplier et diviser mentalement.", dfeReference: "Y4 Multiplication & division: use place value and known facts" },
      { code: "Y4-L3-3", description: "Recognise and use factor pairs and commutativity in mental calculations.", descriptionFr: "Reconnaître et utiliser les paires de facteurs et la commutativité dans les calculs mentaux.", dfeReference: "Y4 Multiplication & division: recognise/use factor pairs and commutativity" }
    ]},
    { levelNumber: 4, title: "Written multiplication and division", titleFr: "Multiplication et division posées", summary: "By the end of this level, you will multiply two- and three-digit numbers by a one-digit number.", summaryFr: "À la fin de ce niveau, tu multiplieras des nombres à deux et trois chiffres par un chiffre.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L4-1", description: "Multiply two-digit and three-digit numbers by a one-digit number using formal written layout.", descriptionFr: "Multiplier des nombres à deux et trois chiffres par un chiffre avec la disposition posée.", dfeReference: "Y4 Multiplication & division: formal written layout" },
      { code: "Y4-L4-2", description: "Divide two-digit numbers by a one-digit number, interpreting remainders.", descriptionFr: "Diviser des nombres à deux chiffres par un chiffre en interprétant les restes.", dfeReference: "Y4 Multiplication & division: division with remainders" },
      { code: "Y4-L4-3", description: "Solve problems involving multiplying and adding, including using the distributive law.", descriptionFr: "Résoudre des problèmes mêlant multiplication et addition, y compris avec la distributivité.", dfeReference: "Y4 Multiplication & division: distributive law" }
    ]},
    { levelNumber: 5, title: "Fractions and equivalent fractions", titleFr: "Fractions et fractions équivalentes", summary: "By the end of this level, you will recognise, compare and add fractions.", summaryFr: "À la fin de ce niveau, tu reconnaîtras, compareras et additionneras des fractions.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L5-1", description: "Recognise and show families of common equivalent fractions.", descriptionFr: "Reconnaître et représenter des familles de fractions équivalentes courantes.", dfeReference: "Y4 Fractions: recognise and show families of equivalent fractions" },
      { code: "Y4-L5-2", description: "Add and subtract fractions with the same denominator.", descriptionFr: "Additionner et soustraire des fractions de même dénominateur.", dfeReference: "Y4 Fractions: add and subtract fractions with the same denominator" },
      { code: "Y4-L5-3", description: "Recognise and write decimal equivalents of common fractions (1/4, 1/2, 3/4).", descriptionFr: "Reconnaître et écrire les équivalents décimaux des fractions courantes (1/4, 1/2, 3/4).", dfeReference: "Y4 Fractions: recognise/write decimal equivalents" }
    ]},
    { levelNumber: 6, title: "Decimals and decimal place value", titleFr: "Les décimaux et la valeur de position décimale", summary: "By the end of this level, you will read, write and compare decimals with up to two decimal places.", summaryFr: "À la fin de ce niveau, tu liras, écriras et compareras des décimaux jusqu'aux centièmes.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L6-1", description: "Recognise and write decimal equivalents of any number of tenths or hundredths.", descriptionFr: "Reconnaître et écrire les équivalents décimaux d'un nombre quelconque de dixièmes ou de centièmes.", dfeReference: "Y4 Decimals: recognise/write decimal equivalents" },
      { code: "Y4-L6-2", description: "Round decimals with one decimal place to the nearest whole number.", descriptionFr: "Arrondir à l'unité la plus proche des décimaux à un chiffre après la virgule.", dfeReference: "Y4 Decimals: round decimals with 1dp to nearest whole number" },
      { code: "Y4-L6-3", description: "Compare numbers with the same number of decimal places up to two decimal places.", descriptionFr: "Comparer des nombres ayant le même nombre de décimales, jusqu'aux centièmes.", dfeReference: "Y4 Decimals: compare numbers with up to two decimal places" }
    ]},
    { levelNumber: 7, title: "Measurement, conversion, perimeter and area", titleFr: "Mesures, conversion, périmètre et aire", summary: "By the end of this level, you will convert units and find the area and perimeter of rectangles.", summaryFr: "À la fin de ce niveau, tu convertiras des unités et tu trouveras l'aire et le périmètre de rectangles.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L7-1", description: "Convert between different units of measure (km/m, hour/minute, etc.).", descriptionFr: "Convertir entre différentes unités de mesure (km/m, heure/minute, etc.).", dfeReference: "Y4 Measurement: convert between different units of measure" },
      { code: "Y4-L7-2", description: "Find the area of rectilinear shapes by counting squares.", descriptionFr: "Trouver l'aire de figures rectilignes en comptant les carreaux.", dfeReference: "Y4 Measurement: find the area of rectilinear shapes by counting squares" },
      { code: "Y4-L7-3", description: "Measure and calculate the perimeter of a rectilinear figure.", descriptionFr: "Mesurer et calculer le périmètre d'une figure rectiligne.", dfeReference: "Y4 Measurement: measure and calculate the perimeter" }
    ]},
    { levelNumber: 8, title: "Angles, symmetry, shapes and coordinates", titleFr: "Angles, symétrie, figures et coordonnées", summary: "By the end of this level, you will classify angles and shapes and use coordinates.", summaryFr: "À la fin de ce niveau, tu classeras des angles et des figures et tu utiliseras des coordonnées.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L8-1", description: "Compare and classify geometric shapes, including quadrilaterals and triangles.", descriptionFr: "Comparer et classer des figures géométriques, y compris les quadrilatères et les triangles.", dfeReference: "Y4 Geometry: compare and classify geometric shapes" },
      { code: "Y4-L8-2", description: "Identify acute and obtuse angles and compare angle sizes.", descriptionFr: "Identifier les angles aigus et obtus et comparer la taille des angles.", dfeReference: "Y4 Geometry: identify acute and obtuse angles" },
      { code: "Y4-L8-3", description: "Describe positions on a 2D grid as coordinates in the first quadrant.", descriptionFr: "Décrire des positions sur un quadrillage à l'aide de coordonnées dans le premier quadrant.", dfeReference: "Y4 Geometry: describe positions using coordinates" }
    ]},
    { levelNumber: 9, title: "Statistics, tables and charts", titleFr: "Statistiques, tableaux et graphiques", summary: "By the end of this level, you will interpret and present data in charts and tables.", summaryFr: "À la fin de ce niveau, tu interpréteras et présenteras des données dans des graphiques et des tableaux.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L9-1", description: "Interpret and present discrete and continuous data using bar charts and time graphs.", descriptionFr: "Interpréter et présenter des données discrètes et continues à l'aide de diagrammes en barres et de graphiques.", dfeReference: "Y4 Statistics: interpret and present discrete/continuous data" },
      { code: "Y4-L9-2", description: "Solve comparison, sum and difference problems using information in bar charts.", descriptionFr: "Résoudre des problèmes de comparaison, de somme et de différence à partir de diagrammes en barres.", dfeReference: "Y4 Statistics: solve comparison, sum and difference problems" },
      { code: "Y4-L9-3", description: "Read and complete simple frequency tables.", descriptionFr: "Lire et compléter des tableaux d'effectifs simples.", dfeReference: "Y4 Statistics: complete tables" }
    ]},
    { levelNumber: 10, title: "Year 4 mixed mastery", titleFr: "Maîtrise mixte de l'Année 4", summary: "By the end of this level, you will confidently use everything you have learned in Year 4.", summaryFr: "À la fin de ce niveau, tu utiliseras avec assurance tout ce que tu as appris en Année 4.", isMixedMastery: true, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L10-1", description: "Use place value, rounding and the four operations with numbers to 10,000.", descriptionFr: "Utiliser la valeur de position, l'arrondi et les quatre opérations avec des nombres jusqu'à 10 000.", dfeReference: "Y4 Number & Addition/subtraction (mixed review)" },
      { code: "Y4-L10-2", description: "Apply times tables, fractions and decimals in problems.", descriptionFr: "Appliquer les tables de multiplication, les fractions et les décimaux à des problèmes.", dfeReference: "Y4 Multiplication/division, Fractions & Decimals (mixed review)" },
      { code: "Y4-L10-3", description: "Use measurement, area, perimeter, shape and statistics accurately.", descriptionFr: "Utiliser correctement les mesures, l'aire, le périmètre, les figures et les statistiques.", dfeReference: "Y4 Measurement, Geometry & Statistics (mixed review)" }
    ]}
  ]
};
