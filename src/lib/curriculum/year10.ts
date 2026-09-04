import type { SchoolYearDef } from "./types";

// Year 10 (ages 14-15, KS4, GCSE preparation). Topics are organised into a
// logical progressive sequence covering the GCSE Mathematics subject content
// common to Foundation and Higher tiers, as KS4 content is not prescribed by
// individual school year in the National Curriculum. A qualified mathematics
// teacher should review this sequence and pathway differentiation before
// publication (see DOCUMENTATION.md "Curriculum review"). Level 1 is fully
// authored as the flagship KS4 level, including Foundation and Higher
// question variants; Levels 2-10 are scaffolded (objectives defined, full
// content pending). Every level's Mastery Challenge is generated for whichever
// pathway (Core / Foundation / Higher) the learner's profile has selected.
export const year10: SchoolYearDef = {
  yearNumber: 10,
  title: "Year 10",
  keyStage: "KS4",
  summary: "GCSE Mathematics preparation for 14-15 year olds, with Foundation and Higher pathways.",
  minAge: 14,
  maxAge: 15,
  themeStage: "mature",
  levels: [
    { levelNumber: 1, title: "Number accuracy, bounds, indices, standard form and surds", summary: "By the end of this level, you will work accurately with bounds, indices, standard form and surds.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y10-L1-1", description: "Calculate upper and lower bounds of numbers given to a degree of accuracy.", dfeReference: "GCSE Number: bounds (Foundation & Higher)" },
      { code: "Y10-L1-2", description: "Calculate with roots and integer, fractional and negative indices.", dfeReference: "GCSE Number: indices (Foundation & Higher)" },
      { code: "Y10-L1-3", description: "Calculate with numbers in standard form, including on a calculator.", dfeReference: "GCSE Number: standard form (Foundation & Higher)" },
      { code: "Y10-L1-4", description: "Simplify surd expressions and rationalise a denominator (Higher extension).", dfeReference: "GCSE Number: surds (Higher tier extension)" }
    ]},
    { levelNumber: 2, title: "Ratio, proportion, growth and compound measures", summary: "By the end of this level, you will solve GCSE-level problems involving ratio, proportion and growth.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L2-1", description: "Solve problems involving direct and inverse proportion, including algebraic representations.", dfeReference: "GCSE Ratio & proportion: direct/inverse proportion" },
      { code: "Y10-L2-2", description: "Set up, solve and interpret the answers in growth and decay problems, including compound interest.", dfeReference: "GCSE Ratio & proportion: growth and decay" },
      { code: "Y10-L2-3", description: "Convert between compound units, including speed, density and pressure (Higher extension: further compound measures).", dfeReference: "GCSE Ratio & proportion: compound units" }
    ]},
    { levelNumber: 3, title: "Algebraic expressions, equations, inequalities and sequences", summary: "By the end of this level, you will manipulate expressions and solve equations and inequalities at GCSE level.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L3-1", description: "Simplify and manipulate algebraic expressions, including algebraic fractions (Higher extension).", dfeReference: "GCSE Algebra: manipulate expressions, algebraic fractions" },
      { code: "Y10-L3-2", description: "Solve linear and quadratic equations, including by factorising and using the quadratic formula.", dfeReference: "GCSE Algebra: solve linear/quadratic equations" },
      { code: "Y10-L3-3", description: "Generate terms of a sequence and deduce expressions for the nth term of linear and quadratic sequences.", dfeReference: "GCSE Algebra: nth term of sequences" }
    ]},
    { levelNumber: 4, title: "Quadratics and simultaneous equations", summary: "By the end of this level, you will solve quadratic and simultaneous equations.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L4-1", description: "Solve quadratic equations algebraically by factorising, completing the square (Higher) and using the formula.", dfeReference: "GCSE Algebra: solve quadratic equations" },
      { code: "Y10-L4-2", description: "Solve two simultaneous equations in two variables, linear/linear and linear/quadratic (Higher).", dfeReference: "GCSE Algebra: solve simultaneous equations" },
      { code: "Y10-L4-3", description: "Find approximate solutions to equations using a graph.", dfeReference: "GCSE Algebra: approximate solutions using a graph" }
    ]},
    { levelNumber: 5, title: "Graphs, functions and graphical interpretation", summary: "By the end of this level, you will plot, sketch and interpret a range of graphs and functions.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L5-1", description: "Plot and interpret graphs of linear, quadratic and simple cubic functions.", dfeReference: "GCSE Algebra: plot/interpret graphs" },
      { code: "Y10-L5-2", description: "Interpret the gradient of a straight line as a rate of change and calculate rates of change from graphs.", dfeReference: "GCSE Algebra: gradient as rate of change" },
      { code: "Y10-L5-3", description: "Recognise and interpret graphs that illustrate direct and inverse proportion.", dfeReference: "GCSE Ratio & proportion: proportion graphs" }
    ]},
    { levelNumber: 6, title: "Geometry, constructions, congruence and similarity", summary: "By the end of this level, you will apply geometric reasoning, constructions, congruence and similarity.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L6-1", description: "Apply the conditions for congruent triangles (SSS, SAS, ASA, RHS).", dfeReference: "GCSE Geometry & measures: congruence conditions" },
      { code: "Y10-L6-2", description: "Use similarity to find missing lengths, areas and volumes of similar shapes.", dfeReference: "GCSE Geometry & measures: similarity" },
      { code: "Y10-L6-3", description: "Use geometric reasoning to construct mathematical arguments and proofs.", dfeReference: "GCSE Geometry & measures: reasoning and proof" }
    ]},
    { levelNumber: 7, title: "Pythagoras and trigonometry", summary: "By the end of this level, you will apply Pythagoras' theorem and trigonometry, including the sine and cosine rules (Higher).", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L7-1", description: "Apply Pythagoras' theorem and trigonometric ratios in right-angled triangles in 2D and simple 3D contexts.", dfeReference: "GCSE Geometry & measures: Pythagoras and trigonometry" },
      { code: "Y10-L7-2", description: "Know and apply the sine rule, cosine rule and area of a triangle formula in non-right-angled triangles (Higher extension).", dfeReference: "GCSE Geometry & measures: sine/cosine rule (Higher tier)" },
      { code: "Y10-L7-3", description: "Know exact trigonometric values for key angles (0, 30, 45, 60, 90 degrees).", dfeReference: "GCSE Geometry & measures: exact trigonometric values" }
    ]},
    { levelNumber: 8, title: "Circles, vectors, area, surface area and volume", summary: "By the end of this level, you will calculate area, surface area and volume, and use vectors.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L8-1", description: "Calculate perimeter, area, surface area and volume of a range of 2D and 3D shapes, including circles and spheres.", dfeReference: "GCSE Geometry & measures: perimeter/area/surface area/volume" },
      { code: "Y10-L8-2", description: "Describe translations using vectors, and add/subtract vectors and multiply a vector by a scalar.", dfeReference: "GCSE Geometry & measures: vectors" },
      { code: "Y10-L8-3", description: "Use vector methods to construct geometric arguments and proofs (Higher extension).", dfeReference: "GCSE Geometry & measures: vector proofs (Higher tier)" }
    ]},
    { levelNumber: 9, title: "Probability, sampling and statistics", summary: "By the end of this level, you will calculate probabilities, evaluate sampling methods and interpret statistics.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L9-1", description: "Calculate and interpret conditional probability through representation using tree diagrams and Venn diagrams.", dfeReference: "GCSE Probability: conditional probability" },
      { code: "Y10-L9-2", description: "Evaluate methods of sampling in the context of a statistical investigation.", dfeReference: "GCSE Statistics: sampling methods" },
      { code: "Y10-L9-3", description: "Interpret and construct cumulative frequency diagrams and box plots, and calculate/interpret the interquartile range (Higher extension).", dfeReference: "GCSE Statistics: cumulative frequency/box plots (Higher tier)" }
    ]},
    { levelNumber: 10, title: "Year 10 GCSE-style mixed mastery", summary: "By the end of this level, you will confidently apply GCSE-style reasoning across number, algebra, geometry, probability and statistics.", isMixedMastery: true, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y10-L10-1", description: "Use number, ratio and proportion fluently in GCSE-style calculations.", dfeReference: "GCSE Number / Ratio & proportion (mixed review)" },
      { code: "Y10-L10-2", description: "Apply algebraic manipulation, equations, sequences and graphs to solve multi-step GCSE-style problems.", dfeReference: "GCSE Algebra (mixed review)" },
      { code: "Y10-L10-3", description: "Use geometry, trigonometry, probability and statistics in GCSE-style reasoning questions.", dfeReference: "GCSE Geometry & measures / Probability / Statistics (mixed review)" }
    ]}
  ]
};
