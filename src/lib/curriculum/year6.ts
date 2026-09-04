import type { SchoolYearDef } from "./types";

// Year 6 (ages 10-11, KS2). Curriculum metadata/objectives defined; full lesson
// and question content scaffolded for future authoring (see DOCUMENTATION.md).
export const year6: SchoolYearDef = {
  yearNumber: 6,
  title: "Year 6",
  keyStage: "KS2",
  summary: "Ratio, algebra basics and SATs-style reasoning for 10-11 year olds.",
  minAge: 10,
  maxAge: 11,
  themeStage: "adventure",
  levels: [
    { levelNumber: 1, title: "Place value, rounding and negative numbers", summary: "By the end of this level, you will use place value confidently with very large and negative numbers.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L1-1", description: "Read, write, order and compare numbers up to 10,000,000.", dfeReference: "Y6 Number & place value: numbers up to 10,000,000" },
      { code: "Y6-L1-2", description: "Round any whole number to a required degree of accuracy.", dfeReference: "Y6 Number & place value: round any whole number" },
      { code: "Y6-L1-3", description: "Use negative numbers in context, and calculate intervals across zero.", dfeReference: "Y6 Number & place value: use negative numbers in context" }
    ]},
    { levelNumber: 2, title: "The four operations and multi-step problems", summary: "By the end of this level, you will use all four operations to solve multi-step problems.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L2-1", description: "Multiply multi-digit numbers up to 4 digits by a two-digit number using a formal written method.", dfeReference: "Y6 Multiplication & division: formal written method" },
      { code: "Y6-L2-2", description: "Divide numbers up to 4 digits by a two-digit number, interpreting remainders.", dfeReference: "Y6 Multiplication & division: long division" },
      { code: "Y6-L2-3", description: "Solve problems involving all four operations, using estimation to check answers.", dfeReference: "Y6 Addition, subtraction, multiplication & division: solve problems" }
    ]},
    { levelNumber: 3, title: "Fractions and mixed numbers", summary: "By the end of this level, you will add, subtract, multiply and divide fractions.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L3-1", description: "Add and subtract fractions with different denominators and mixed numbers.", dfeReference: "Y6 Fractions: add/subtract fractions with different denominators" },
      { code: "Y6-L3-2", description: "Multiply simple pairs of proper fractions.", dfeReference: "Y6 Fractions: multiply simple pairs of proper fractions" },
      { code: "Y6-L3-3", description: "Divide proper fractions by whole numbers.", dfeReference: "Y6 Fractions: divide proper fractions by whole numbers" }
    ]},
    { levelNumber: 4, title: "Decimals, fractions and percentages", summary: "By the end of this level, you will convert fluently between fractions, decimals and percentages.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L4-1", description: "Identify the value of each digit in numbers with up to three decimal places.", dfeReference: "Y6 Decimals: identify value of digits to 3dp" },
      { code: "Y6-L4-2", description: "Associate a fraction with division and calculate decimal fraction equivalents.", dfeReference: "Y6 Fractions/Decimals: associate fraction with division" },
      { code: "Y6-L4-3", description: "Recall and use equivalences between simple fractions, decimals and percentages.", dfeReference: "Y6 Fractions/Decimals/Percentages: recall equivalences" }
    ]},
    { levelNumber: 5, title: "Ratio and proportion", summary: "By the end of this level, you will solve problems involving ratio and proportion.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L5-1", description: "Solve problems involving the relative sizes of two quantities using ratio language.", dfeReference: "Y6 Ratio & proportion: relative sizes of quantities" },
      { code: "Y6-L5-2", description: "Solve problems involving unequal sharing and grouping using knowledge of fractions and multiples.", dfeReference: "Y6 Ratio & proportion: unequal sharing and grouping" },
      { code: "Y6-L5-3", description: "Solve problems involving scale factors.", dfeReference: "Y6 Ratio & proportion: scale factors" }
    ]},
    { levelNumber: 6, title: "Introduction to algebra", summary: "By the end of this level, you will use simple formulae and find unknowns.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L6-1", description: "Use simple formulae expressed in words and symbols.", dfeReference: "Y6 Algebra: use simple formulae" },
      { code: "Y6-L6-2", description: "Generate and describe linear number sequences.", dfeReference: "Y6 Algebra: generate/describe linear number sequences" },
      { code: "Y6-L6-3", description: "Find pairs of numbers that satisfy an equation with two unknowns.", dfeReference: "Y6 Algebra: find pairs of numbers satisfying an equation" }
    ]},
    { levelNumber: 7, title: "Measurement, perimeter, area and volume", summary: "By the end of this level, you will calculate area, perimeter and volume of compound shapes.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L7-1", description: "Calculate the area of parallelograms and triangles.", dfeReference: "Y6 Measurement: area of parallelograms and triangles" },
      { code: "Y6-L7-2", description: "Calculate, estimate and compare volume of cubes and cuboids using standard units.", dfeReference: "Y6 Measurement: volume of cubes and cuboids" },
      { code: "Y6-L7-3", description: "Convert between miles and kilometres, and between metric measures.", dfeReference: "Y6 Measurement: convert between miles/km and metric units" }
    ]},
    { levelNumber: 8, title: "Geometry, angles, shapes and coordinates", summary: "By the end of this level, you will calculate angles and plot shapes on a coordinate grid.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L8-1", description: "Find unknown angles in triangles, quadrilaterals and regular polygons.", dfeReference: "Y6 Geometry: find unknown angles" },
      { code: "Y6-L8-2", description: "Draw 2D shapes using given dimensions and angles.", dfeReference: "Y6 Geometry: draw 2D shapes using given dimensions" },
      { code: "Y6-L8-3", description: "Describe positions on the full coordinate grid (all four quadrants).", dfeReference: "Y6 Geometry: describe positions on the full coordinate grid" }
    ]},
    { levelNumber: 9, title: "Statistics, averages and data interpretation", summary: "By the end of this level, you will interpret pie charts and calculate the mean.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L9-1", description: "Interpret and construct pie charts and line graphs and use these to solve problems.", dfeReference: "Y6 Statistics: interpret and construct pie charts and line graphs" },
      { code: "Y6-L9-2", description: "Calculate and interpret the mean as an average.", dfeReference: "Y6 Statistics: calculate and interpret the mean" }
    ]},
    { levelNumber: 10, title: "Year 6 mixed reasoning and SATs-style mastery", summary: "By the end of this level, you will apply everything you have learned in Year 6 to reasoning and SATs-style questions.", isMixedMastery: true, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y6-L10-1", description: "Use place value, the four operations and negative numbers fluently in reasoning problems.", dfeReference: "Y6 Number & Addition/subtraction/multiplication/division (mixed review)" },
      { code: "Y6-L10-2", description: "Apply fractions, decimals, percentages, ratio and algebra to multi-step problems.", dfeReference: "Y6 Fractions, Decimals, Percentages, Ratio & Algebra (mixed review)" },
      { code: "Y6-L10-3", description: "Use measurement, geometry and statistics in SATs-style reasoning questions.", dfeReference: "Y6 Measurement, Geometry & Statistics (mixed review)" }
    ]}
  ]
};
