import type { SchoolYearDef } from "./types";

// Year 6 (ages 10-11, KS2). All ten levels are fully authored (lessons,
// practice and mastery question banks — see questionEngine/templates/all.ts
// COMPLETE_LEVEL_KEYS).
export const year6: SchoolYearDef = {
  yearNumber: 6,
  title: "Year 6",
  titleFr: "Année 6",
  keyStage: "KS2",
  summary: "Ratio, algebra basics and SATs-style reasoning for 10-11 year olds.",
  summaryFr: "Les ratios, les bases de l’algèbre et le raisonnement de type SATs pour les enfants de 10 à 11 ans.",
  minAge: 10,
  maxAge: 11,
  themeStage: "adventure",
  levels: [
    { levelNumber: 1, title: "Place value, rounding and negative numbers", titleFr: "Valeur de position, arrondi et nombres négatifs", summary: "By the end of this level, you will use place value confidently with very large and negative numbers.", summaryFr: "À la fin de ce niveau, tu utiliseras la valeur de position avec assurance pour les très grands nombres et les nombres négatifs.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L1-1", description: "Read, write, order and compare numbers up to 10,000,000.", descriptionFr: "Lire, écrire, ranger et comparer les nombres jusqu’à 10 000 000.", dfeReference: "Y6 Number & place value: numbers up to 10,000,000" },
      { code: "Y6-L1-2", description: "Round any whole number to a required degree of accuracy.", descriptionFr: "Arrondir n’importe quel nombre entier au degré de précision demandé.", dfeReference: "Y6 Number & place value: round any whole number" },
      { code: "Y6-L1-3", description: "Use negative numbers in context, and calculate intervals across zero.", descriptionFr: "Utiliser les nombres négatifs en contexte et calculer des intervalles à travers zéro.", dfeReference: "Y6 Number & place value: use negative numbers in context" }
    ]},
    { levelNumber: 2, title: "The four operations and multi-step problems", titleFr: "Les quatre opérations et les problèmes à étapes multiples", summary: "By the end of this level, you will use all four operations to solve multi-step problems.", summaryFr: "À la fin de ce niveau, tu sauras utiliser les quatre opérations pour résoudre des problèmes à étapes multiples.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L2-1", description: "Multiply multi-digit numbers up to 4 digits by a two-digit number using a formal written method.", descriptionFr: "Multiplier des nombres à plusieurs chiffres jusqu’à 4 chiffres par un nombre à deux chiffres avec une méthode posée.", dfeReference: "Y6 Multiplication & division: formal written method" },
      { code: "Y6-L2-2", description: "Divide numbers up to 4 digits by a two-digit number, interpreting remainders.", descriptionFr: "Diviser des nombres jusqu’à 4 chiffres par un nombre à deux chiffres, en interprétant les restes.", dfeReference: "Y6 Multiplication & division: long division" },
      { code: "Y6-L2-3", description: "Solve problems involving all four operations, using estimation to check answers.", descriptionFr: "Résoudre des problèmes impliquant les quatre opérations, en utilisant l’estimation pour vérifier les réponses.", dfeReference: "Y6 Addition, subtraction, multiplication & division: solve problems" }
    ]},
    { levelNumber: 3, title: "Fractions and mixed numbers", titleFr: "Les fractions et les nombres mixtes", summary: "By the end of this level, you will add, subtract, multiply and divide fractions.", summaryFr: "À la fin de ce niveau, tu sauras additionner, soustraire, multiplier et diviser des fractions.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L3-1", description: "Add and subtract fractions with different denominators and mixed numbers.", descriptionFr: "Additionner et soustraire des fractions de dénominateurs différents et des nombres mixtes.", dfeReference: "Y6 Fractions: add/subtract fractions with different denominators" },
      { code: "Y6-L3-2", description: "Multiply simple pairs of proper fractions.", descriptionFr: "Multiplier des paires simples de fractions propres.", dfeReference: "Y6 Fractions: multiply simple pairs of proper fractions" },
      { code: "Y6-L3-3", description: "Divide proper fractions by whole numbers.", descriptionFr: "Diviser des fractions propres par des nombres entiers.", dfeReference: "Y6 Fractions: divide proper fractions by whole numbers" }
    ]},
    { levelNumber: 4, title: "Decimals, fractions and percentages", titleFr: "Décimales, fractions et pourcentages", summary: "By the end of this level, you will convert fluently between fractions, decimals and percentages.", summaryFr: "À la fin de ce niveau, tu convertiras avec aisance entre fractions, décimales et pourcentages.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L4-1", description: "Identify the value of each digit in numbers with up to three decimal places.", descriptionFr: "Identifier la valeur de chaque chiffre dans des nombres comportant jusqu'à trois décimales.", dfeReference: "Y6 Decimals: identify value of digits to 3dp" },
      { code: "Y6-L4-2", description: "Associate a fraction with division and calculate decimal fraction equivalents.", descriptionFr: "Associer une fraction à une division et calculer les équivalents décimaux.", dfeReference: "Y6 Fractions/Decimals: associate fraction with division" },
      { code: "Y6-L4-3", description: "Recall and use equivalences between simple fractions, decimals and percentages.", descriptionFr: "Mémoriser et utiliser les équivalences entre fractions, décimales et pourcentages simples.", dfeReference: "Y6 Fractions/Decimals/Percentages: recall equivalences" }
    ]},
    { levelNumber: 5, title: "Ratio and proportion", titleFr: "Rapports et proportionnalité", summary: "By the end of this level, you will solve problems involving ratio and proportion.", summaryFr: "À la fin de ce niveau, tu résoudras des problèmes de rapports et de proportionnalité.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L5-1", description: "Solve problems involving the relative sizes of two quantities using ratio language.", descriptionFr: "Résoudre des problèmes portant sur les tailles relatives de deux quantités en utilisant le langage des rapports.", dfeReference: "Y6 Ratio & proportion: relative sizes of quantities" },
      { code: "Y6-L5-2", description: "Solve problems involving unequal sharing and grouping using knowledge of fractions and multiples.", descriptionFr: "Résoudre des problèmes de partage et de groupement inégaux à l'aide des fractions et des multiples.", dfeReference: "Y6 Ratio & proportion: unequal sharing and grouping" },
      { code: "Y6-L5-3", description: "Solve problems involving scale factors.", descriptionFr: "Résoudre des problèmes faisant intervenir des facteurs d'échelle.", dfeReference: "Y6 Ratio & proportion: scale factors" }
    ]},
    { levelNumber: 6, title: "Introduction to algebra", titleFr: "Introduction à l'algèbre", summary: "By the end of this level, you will use simple formulae and find unknowns.", summaryFr: "À la fin de ce niveau, tu utiliseras des formules simples et tu trouveras des inconnues.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L6-1", description: "Use simple formulae expressed in words and symbols.", descriptionFr: "Utiliser des formules simples exprimées en mots et en symboles.", dfeReference: "Y6 Algebra: use simple formulae" },
      { code: "Y6-L6-2", description: "Generate and describe linear number sequences.", descriptionFr: "Générer et décrire des suites numériques arithmétiques.", dfeReference: "Y6 Algebra: generate/describe linear number sequences" },
      { code: "Y6-L6-3", description: "Find pairs of numbers that satisfy an equation with two unknowns.", descriptionFr: "Trouver des paires de nombres qui vérifient une équation à deux inconnues.", dfeReference: "Y6 Algebra: find pairs of numbers satisfying an equation" }
    ]},
    { levelNumber: 7, title: "Measurement, perimeter, area and volume", titleFr: "Mesures, périmètre, aire et volume", summary: "By the end of this level, you will calculate area, perimeter and volume of compound shapes.", summaryFr: "À la fin de ce niveau, tu calculeras l'aire, le périmètre et le volume de figures composées.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L7-1", description: "Calculate the area of parallelograms and triangles.", descriptionFr: "Calculer l'aire des parallélogrammes et des triangles.", dfeReference: "Y6 Measurement: area of parallelograms and triangles" },
      { code: "Y6-L7-2", description: "Calculate, estimate and compare volume of cubes and cuboids using standard units.", descriptionFr: "Calculer, estimer et comparer le volume de cubes et de pavés droits en unités standard.", dfeReference: "Y6 Measurement: volume of cubes and cuboids" },
      { code: "Y6-L7-3", description: "Convert between miles and kilometres, and between metric measures.", descriptionFr: "Convertir entre miles et kilomètres, et entre unités métriques.", dfeReference: "Y6 Measurement: convert between miles/km and metric units" }
    ]},
    { levelNumber: 8, title: "Geometry, angles, shapes and coordinates", titleFr: "Géométrie, angles, figures et coordonnées", summary: "By the end of this level, you will calculate angles and plot shapes on a coordinate grid.", summaryFr: "À la fin de ce niveau, tu calculeras des angles et tu placeras des figures sur un repère.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L8-1", description: "Find unknown angles in triangles, quadrilaterals and regular polygons.", descriptionFr: "Trouver des angles inconnus dans les triangles, les quadrilatères et les polygones réguliers.", dfeReference: "Y6 Geometry: find unknown angles" },
      { code: "Y6-L8-2", description: "Draw 2D shapes using given dimensions and angles.", descriptionFr: "Tracer des figures planes à partir de dimensions et d'angles donnés.", dfeReference: "Y6 Geometry: draw 2D shapes using given dimensions" },
      { code: "Y6-L8-3", description: "Describe positions on the full coordinate grid (all four quadrants).", descriptionFr: "Décrire des positions sur un repère complet (les quatre quadrants).", dfeReference: "Y6 Geometry: describe positions on the full coordinate grid" }
    ]},
    { levelNumber: 9, title: "Statistics, averages and data interpretation", titleFr: "Statistiques, moyennes et interprétation de données", summary: "By the end of this level, you will interpret pie charts and calculate the mean.", summaryFr: "À la fin de ce niveau, tu interpréteras des diagrammes circulaires et tu calculeras la moyenne.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L9-1", description: "Interpret and construct pie charts and line graphs and use these to solve problems.", descriptionFr: "Interpréter et construire des diagrammes circulaires et des graphiques linéaires, et les utiliser pour résoudre des problèmes.", dfeReference: "Y6 Statistics: interpret and construct pie charts and line graphs" },
      { code: "Y6-L9-2", description: "Calculate and interpret the mean as an average.", descriptionFr: "Calculer et interpréter la moyenne.", dfeReference: "Y6 Statistics: calculate and interpret the mean" }
    ]},
    { levelNumber: 10, title: "Year 6 mixed reasoning and SATs-style mastery", titleFr: "Maîtrise mixte de l'Année 6, façon examen", summary: "By the end of this level, you will apply everything you have learned in Year 6 to reasoning and SATs-style questions.", summaryFr: "À la fin de ce niveau, tu appliqueras tout ce que tu as appris en Année 6 à des questions de raisonnement de type examen.", isMixedMastery: true, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y6-L10-1", description: "Use place value, the four operations and negative numbers fluently in reasoning problems.", descriptionFr: "Utiliser avec aisance la valeur de position, les quatre opérations et les nombres négatifs dans des problèmes de raisonnement.", dfeReference: "Y6 Number & Addition/subtraction/multiplication/division (mixed review)" },
      { code: "Y6-L10-2", description: "Apply fractions, decimals, percentages, ratio and algebra to multi-step problems.", descriptionFr: "Appliquer les fractions, les décimales, les pourcentages, les rapports et l'algèbre à des problèmes à étapes multiples.", dfeReference: "Y6 Fractions, Decimals, Percentages, Ratio & Algebra (mixed review)" },
      { code: "Y6-L10-3", description: "Use measurement, geometry and statistics in SATs-style reasoning questions.", descriptionFr: "Utiliser les mesures, la géométrie et les statistiques dans des questions de raisonnement de type examen.", dfeReference: "Y6 Measurement, Geometry & Statistics (mixed review)" }
    ]}
  ]
};
