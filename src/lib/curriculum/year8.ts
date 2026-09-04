import type { SchoolYearDef } from "./types";

// Year 8 (ages 12-13, KS3). Curriculum metadata/objectives defined; full
// lesson/question content scaffolded for future authoring pass.
export const year8: SchoolYearDef = {
  yearNumber: 8,
  title: "Year 8",
  keyStage: "KS3",
  summary: "Powers, algebraic manipulation and Pythagoras for 12-13 year olds.",
  minAge: 12,
  maxAge: 13,
  themeStage: "gameinspired",
  levels: [
    { levelNumber: 1, title: "Number skills, powers, roots and index notation", summary: "By the end of this level, you will use powers, roots and index laws confidently.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L1-1", description: "Use integer powers and associated real roots (square, cube and higher).", dfeReference: "KS3 Number: use integer powers and associated real roots" },
      { code: "Y8-L1-2", description: "Recognise and use relationships between operations, including inverse operations.", dfeReference: "KS3 Number: recognise/use relationships between operations" },
      { code: "Y8-L1-3", description: "Use index laws to simplify numerical expressions.", dfeReference: "KS3 Number: use standard units of measure and related concepts" }
    ]},
    { levelNumber: 2, title: "Fractions, percentages and percentage change", summary: "By the end of this level, you will calculate percentage increase, decrease and change.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L2-1", description: "Interpret percentage increase and decrease, and percentage change.", dfeReference: "KS3 Ratio & proportion: percentage increase/decrease/change" },
      { code: "Y8-L2-2", description: "Work with percentages greater than 100%.", dfeReference: "KS3 Ratio & proportion: percentages greater than 100%" },
      { code: "Y8-L2-3", description: "Solve problems involving fractions and percentages of amounts.", dfeReference: "KS3 Number/Ratio & proportion: solve problems" }
    ]},
    { levelNumber: 3, title: "Ratio, rates and direct proportion", summary: "By the end of this level, you will solve problems involving ratio, rates and direct proportion.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L3-1", description: "Solve problems involving direct proportion, including graphical representations.", dfeReference: "KS3 Ratio & proportion: direct proportion" },
      { code: "Y8-L3-2", description: "Use compound units such as speed, unit pricing and density.", dfeReference: "KS3 Ratio & proportion: compound units" },
      { code: "Y8-L3-3", description: "Compare lengths, areas and volumes using ratio notation.", dfeReference: "KS3 Ratio & proportion: compare lengths/areas/volumes" }
    ]},
    { levelNumber: 4, title: "Expanding and factorising algebraic expressions", summary: "By the end of this level, you will expand brackets and factorise expressions.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L4-1", description: "Simplify and manipulate algebraic expressions by multiplying a single term over a bracket.", dfeReference: "KS3 Algebra: expand single brackets" },
      { code: "Y8-L4-2", description: "Simplify and manipulate expressions by taking out common factors (factorising).", dfeReference: "KS3 Algebra: factorise expressions" },
      { code: "Y8-L4-3", description: "Simplify expressions involving sums, products and powers, including the laws of indices.", dfeReference: "KS3 Algebra: laws of indices" }
    ]},
    { levelNumber: 5, title: "Equations and inequalities", summary: "By the end of this level, you will solve equations and inequalities and represent solutions.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L5-1", description: "Solve linear equations with the unknown on both sides, including with brackets.", dfeReference: "KS3 Algebra: solve linear equations" },
      { code: "Y8-L5-2", description: "Solve linear inequalities in one variable and represent the solution on a number line.", dfeReference: "KS3 Algebra: solve linear inequalities" },
      { code: "Y8-L5-3", description: "Translate simple practical situations into algebraic expressions and equations.", dfeReference: "KS3 Algebra: translate situations into algebraic expressions" }
    ]},
    { levelNumber: 6, title: "Sequences and straight-line graphs", summary: "By the end of this level, you will find nth terms and plot straight-line graphs.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L6-1", description: "Deduce the nth term of linear and quadratic sequences.", dfeReference: "KS3 Algebra: deduce nth term of sequences" },
      { code: "Y8-L6-2", description: "Work with coordinates in all four quadrants.", dfeReference: "KS3 Algebra: work with coordinates in all four quadrants" },
      { code: "Y8-L6-3", description: "Plot graphs of equations of the form y = mx + c using tables of values.", dfeReference: "KS3 Algebra: plot graphs of y = mx + c" }
    ]},
    { levelNumber: 7, title: "Transformations, congruence and similarity", summary: "By the end of this level, you will identify congruent and similar shapes and apply transformations.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L7-1", description: "Identify properties of, and describe the results of, translations, rotations and reflections applied to shapes.", dfeReference: "KS3 Geometry & measures: translations, rotations, reflections" },
      { code: "Y8-L7-2", description: "Identify and construct congruent triangles.", dfeReference: "KS3 Geometry & measures: congruent triangles" },
      { code: "Y8-L7-3", description: "Describe similar shapes in terms of equal angles and proportional sides.", dfeReference: "KS3 Geometry & measures: similar shapes" }
    ]},
    { levelNumber: 8, title: "Pythagoras, measurement and geometric reasoning", summary: "By the end of this level, you will use Pythagoras' theorem to find missing lengths.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L8-1", description: "Know and apply Pythagoras' theorem to find missing lengths in right-angled triangles.", dfeReference: "KS3 Geometry & measures: know/apply Pythagoras' theorem" },
      { code: "Y8-L8-2", description: "Calculate the area and circumference of circles.", dfeReference: "KS3 Geometry & measures: circumference and area of circles" },
      { code: "Y8-L8-3", description: "Use geometric reasoning to construct simple proofs, providing reasons.", dfeReference: "KS3 Geometry & measures: use geometric reasoning" }
    ]},
    { levelNumber: 9, title: "Probability and statistical analysis", summary: "By the end of this level, you will calculate probabilities and analyse data sets.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L9-1", description: "Record, describe and analyse the frequency of outcomes of probability experiments.", dfeReference: "KS3 Probability: record/describe/analyse frequency of outcomes" },
      { code: "Y8-L9-2", description: "Relative and expected frequencies as approximations to probability.", dfeReference: "KS3 Probability: relative/expected frequencies" },
      { code: "Y8-L9-3", description: "Interpret, analyse and compare distributions using measures of central tendency and spread.", dfeReference: "KS3 Statistics: measures of central tendency and spread" }
    ]},
    { levelNumber: 10, title: "Year 8 mixed mastery", summary: "By the end of this level, you will confidently use everything you have learned in Year 8.", isMixedMastery: true, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y8-L10-1", description: "Use powers, roots, percentages and ratio fluently in calculations.", dfeReference: "KS3 Number / Ratio & proportion (mixed review)" },
      { code: "Y8-L10-2", description: "Apply algebraic manipulation, equations, sequences and graphs to solve problems.", dfeReference: "KS3 Algebra (mixed review)" },
      { code: "Y8-L10-3", description: "Use transformations, Pythagoras, probability and statistics in reasoning problems.", dfeReference: "KS3 Geometry & measures / Probability / Statistics (mixed review)" }
    ]}
  ]
};
