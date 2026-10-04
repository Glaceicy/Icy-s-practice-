import type { SchoolYearDef } from "./types";

// Year 9 (ages 13-14, KS3, pre-GCSE). Levels 1-2 are fully authored
// (lessons, practice, 40-question mastery banks); levels 3-10 are
// scaffolded (curriculum metadata only — see
// questionEngine/templates/all.ts COMPLETE_LEVEL_KEYS).
export const year9: SchoolYearDef = {
  yearNumber: 9,
  title: "Year 9",
  titleFr: "Année 9",
  keyStage: "KS3",
  summary: "Standard form, quadratic graphs and trigonometry as preparation for GCSE.",
  summaryFr: "La notation scientifique, les graphiques quadratiques et la trigonométrie en préparation du GCSE.",
  minAge: 13,
  maxAge: 14,
  themeStage: "mature",
  levels: [
    { levelNumber: 1, title: "Standard form, indices, roots and number accuracy", titleFr: "Notation scientifique, indices, racines et précision numérique", summary: "By the end of this level, you will use standard form and index laws with accuracy.", summaryFr: "À la fin de ce niveau, tu utiliseras la notation scientifique et les lois des indices avec précision.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L1-1", description: "Interpret and write numbers in standard form (A x 10^n).", descriptionFr: "Interpréter et écrire des nombres en notation scientifique (A x 10^n).", dfeReference: "KS3 Number: interpret/write standard form" },
      { code: "Y9-L1-2", description: "Use the laws of indices, including negative and fractional indices.", descriptionFr: "Utiliser les lois des indices, y compris les indices négatifs et fractionnaires.", dfeReference: "KS3 Number: laws of indices" },
      { code: "Y9-L1-3", description: "Round to a given number of significant figures and estimate answers.", descriptionFr: "Arrondir à un nombre donné de chiffres significatifs et estimer des résultats.", dfeReference: "KS3 Number: round to significant figures" }
    ]},
    { levelNumber: 2, title: "Proportion, rates and compound measures", titleFr: "Proportionnalité, taux et grandeurs composées", summary: "By the end of this level, you will solve problems involving direct and inverse proportion.", summaryFr: "À la fin de ce niveau, tu sauras résoudre des problèmes de proportionnalité directe et inverse.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L2-1", description: "Solve problems involving direct and inverse proportion, including graphical and algebraic representations.", descriptionFr: "Résoudre des problèmes de proportionnalité directe et inverse, y compris des représentations graphiques et algébriques.", dfeReference: "KS3 Ratio & proportion: direct and inverse proportion" },
      { code: "Y9-L2-2", description: "Interpret and use compound measures, including speed, density and pressure.", descriptionFr: "Interpréter et utiliser des grandeurs composées, comme la vitesse, la densité et la pression.", dfeReference: "KS3 Ratio & proportion: compound measures" },
      { code: "Y9-L2-3", description: "Set up, solve and interpret answers in growth and decay problems.", descriptionFr: "Poser, résoudre et interpréter des problèmes de croissance et de décroissance.", dfeReference: "KS3 Ratio & proportion: growth and decay" }
    ]},
    { levelNumber: 3, title: "Advanced algebraic manipulation", titleFr: "Manipulation algébrique avancée", summary: "By the end of this level, you will expand double brackets and factorise quadratics.", summaryFr: "À la fin de ce niveau, tu sauras développer des produits de deux parenthèses et factoriser des expressions quadratiques.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L3-1", description: "Simplify and manipulate expressions by expanding products of two binomials.", descriptionFr: "Simplifier et manipuler des expressions en développant des produits de deux binômes.", dfeReference: "KS3 Algebra: expand products of two binomials" },
      { code: "Y9-L3-2", description: "Factorise quadratic expressions of the form x^2 + bx + c.", descriptionFr: "Factoriser des expressions quadratiques de la forme x^2 + bx + c.", dfeReference: "KS3 Algebra: factorise quadratic expressions" },
      { code: "Y9-L3-3", description: "Rearrange formulae to change the subject.", descriptionFr: "Transformer des formules pour en changer le sujet.", dfeReference: "KS3 Algebra: rearrange formulae" }
    ]},
    { levelNumber: 4, title: "Linear and quadratic graphs", titleFr: "Graphiques linéaires et quadratiques", summary: "By the end of this level, you will plot and interpret linear and quadratic graphs.", summaryFr: "À la fin de ce niveau, tu sauras tracer et interpréter des graphiques linéaires et quadratiques.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L4-1", description: "Identify and interpret gradients and intercepts of linear functions graphically and algebraically.", descriptionFr: "Identifier et interpréter les coefficients directeurs et les ordonnées à l'origine de fonctions linéaires, graphiquement et algébriquement.", dfeReference: "KS3 Algebra: identify/interpret gradients and intercepts" },
      { code: "Y9-L4-2", description: "Recognise, sketch and interpret graphs of quadratic functions.", descriptionFr: "Reconnaître, esquisser et interpréter les graphiques de fonctions quadratiques.", dfeReference: "KS3 Algebra: recognise/sketch/interpret quadratic graphs" },
      { code: "Y9-L4-3", description: "Interpret the gradient of a straight line graph as a rate of change.", descriptionFr: "Interpréter le coefficient directeur d'une droite comme un taux de variation.", dfeReference: "KS3 Algebra: interpret gradient as rate of change" }
    ]},
    { levelNumber: 5, title: "Equations, inequalities and simultaneous equations", titleFr: "Équations, inéquations et systèmes d'équations", summary: "By the end of this level, you will solve simultaneous equations and quadratic equations.", summaryFr: "À la fin de ce niveau, tu sauras résoudre des systèmes d'équations et des équations quadratiques.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L5-1", description: "Solve two simultaneous equations in two variables algebraically and graphically.", descriptionFr: "Résoudre deux équations simultanées à deux variables, algébriquement et graphiquement.", dfeReference: "KS3 Algebra: solve simultaneous equations" },
      { code: "Y9-L5-2", description: "Solve quadratic equations by factorisation.", descriptionFr: "Résoudre des équations quadratiques par factorisation.", dfeReference: "KS3 Algebra: solve quadratic equations by factorisation" },
      { code: "Y9-L5-3", description: "Solve linear inequalities in two variables and represent the solution graphically.", descriptionFr: "Résoudre des inéquations linéaires à deux variables et représenter graphiquement la solution.", dfeReference: "KS3 Algebra: solve linear inequalities in two variables" }
    ]},
    { levelNumber: 6, title: "Transformations, constructions and vectors", titleFr: "Transformations, constructions et vecteurs", summary: "By the end of this level, you will apply transformations and describe vectors.", summaryFr: "À la fin de ce niveau, tu sauras appliquer des transformations et décrire des vecteurs.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L6-1", description: "Describe translations as 2D vectors.", descriptionFr: "Décrire des translations à l'aide de vecteurs à deux composantes.", dfeReference: "KS3 Geometry & measures: describe translations as 2D vectors" },
      { code: "Y9-L6-2", description: "Use standard geometric constructions, including perpendicular bisectors and angle bisectors.", descriptionFr: "Utiliser les constructions géométriques standard, y compris médiatrices et bissectrices.", dfeReference: "KS3 Geometry & measures: standard constructions" },
      { code: "Y9-L6-3", description: "Apply combinations of transformations to shapes on a coordinate grid.", descriptionFr: "Appliquer des combinaisons de transformations à des formes sur un repère.", dfeReference: "KS3 Geometry & measures: combinations of transformations" }
    ]},
    { levelNumber: 7, title: "Pythagoras and introductory trigonometry", titleFr: "Pythagore et introduction à la trigonométrie", summary: "By the end of this level, you will use Pythagoras' theorem and basic trigonometry.", summaryFr: "À la fin de ce niveau, tu sauras utiliser le théorème de Pythagore et la trigonométrie de base.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y9-L7-1", description: "Apply Pythagoras' theorem to find lengths in right-angled triangles in two dimensions.", descriptionFr: "Appliquer le théorème de Pythagore pour trouver des longueurs dans des triangles rectangles en deux dimensions.", dfeReference: "KS3 Geometry & measures: apply Pythagoras' theorem" },
      { code: "Y9-L7-2", description: "Know the trigonometric ratios (sine, cosine, tangent) and use them to find missing sides.", descriptionFr: "Connaître les rapports trigonométriques (sinus, cosinus, tangente) et les utiliser pour trouver des côtés manquants.", dfeReference: "KS3 Geometry & measures: know/use trigonometric ratios" },
      { code: "Y9-L7-3", description: "Use trigonometric ratios to find missing angles in right-angled triangles.", descriptionFr: "Utiliser les rapports trigonométriques pour trouver des angles manquants dans des triangles rectangles.", dfeReference: "KS3 Geometry & measures: use trigonometric ratios for angles" }
    ]},
    { levelNumber: 8, title: "Circles, surface area and volume", summary: "By the end of this level, you will calculate properties of circles and 3D shapes.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y9-L8-1", description: "Calculate arc lengths, angles and areas of sectors of circles.", dfeReference: "KS3 Geometry & measures: arc lengths/sectors" },
      { code: "Y9-L8-2", description: "Calculate surface area and volume of cylinders and other prisms.", dfeReference: "KS3 Geometry & measures: surface area/volume of prisms" },
      { code: "Y9-L8-3", description: "Identify and apply circle theorems related to properties of circles.", dfeReference: "KS3 Geometry & measures: circle properties" }
    ]},
    { levelNumber: 9, title: "Probability and statistics", summary: "By the end of this level, you will calculate combined probabilities and analyse real data.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y9-L9-1", description: "Generate theoretical sample spaces for single and combined events.", dfeReference: "KS3 Probability: generate sample spaces" },
      { code: "Y9-L9-2", description: "Use tree diagrams to calculate probabilities of combined independent and dependent events.", dfeReference: "KS3 Probability: tree diagrams" },
      { code: "Y9-L9-3", description: "Interpret, analyse and compare data sets using appropriate graphical representation and statistical measures.", dfeReference: "KS3 Statistics: interpret/analyse/compare data" }
    ]},
    { levelNumber: 10, title: "Year 9 pre-GCSE mixed mastery", summary: "By the end of this level, you will confidently use everything you have learned across Key Stage 3.", isMixedMastery: true, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y9-L10-1", description: "Use standard form, indices, proportion and rates fluently in calculations.", dfeReference: "KS3 Number / Ratio & proportion (mixed review)" },
      { code: "Y9-L10-2", description: "Apply advanced algebraic manipulation, graphs and equations to solve problems.", dfeReference: "KS3 Algebra (mixed review)" },
      { code: "Y9-L10-3", description: "Use transformations, Pythagoras, trigonometry, probability and statistics in reasoning problems.", dfeReference: "KS3 Geometry & measures / Probability / Statistics (mixed review)" }
    ]}
  ]
};
