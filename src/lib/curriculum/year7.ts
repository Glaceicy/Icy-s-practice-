import type { SchoolYearDef } from "./types";

// Year 7 (ages 11-12, KS3) — FLAGSHIP YEAR: fully authored across all 10
// levels. KS3 mathematics is not broken into individual school years by the
// DfE programme of study; objectives here are drawn directly from the KS3
// Mathematics programme of study domains (number; algebra; ratio, proportion
// and rates of change; geometry and measures; probability; statistics) and
// sequenced progressively across Years 7-9 as the curriculum instructs.
export const year7: SchoolYearDef = {
  yearNumber: 7,
  title: "Year 7",
  keyStage: "KS3",
  summary: "The bridge from primary arithmetic to secondary algebra and geometry for 11-12 year olds.",
  minAge: 11,
  maxAge: 12,
  themeStage: "gameinspired",
  levels: [
    { levelNumber: 1, title: "Integers, place value, ordering and negative numbers", summary: "By the end of this level, you will order, compare and calculate with positive and negative integers.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L1-1", description: "Order positive and negative integers and use the symbols <, >, =.", dfeReference: "KS3 Number: order positive and negative integers" },
      { code: "Y7-L1-2", description: "Add, subtract, multiply and divide with negative numbers.", dfeReference: "KS3 Number: use the four operations with negative numbers" },
      { code: "Y7-L1-3", description: "Round numbers and measures to an appropriate degree of accuracy.", dfeReference: "KS3 Number: round numbers and measures" }
    ]},
    { levelNumber: 2, title: "The four operations and order of operations", summary: "By the end of this level, you will apply BIDMAS to calculate accurately.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L2-1", description: "Use the four operations applied to integers, fractions and decimals.", dfeReference: "KS3 Number: use the four operations applied to positive/negative integers, fractions, decimals" },
      { code: "Y7-L2-2", description: "Use conventional notation for the priority of operations (BIDMAS).", dfeReference: "KS3 Number: use conventional notation for priority of operations" },
      { code: "Y7-L2-3", description: "Use a calculator and other technologies to calculate results accurately and interpret them appropriately.", dfeReference: "KS3 Number: use a calculator and interpret the display" }
    ]},
    { levelNumber: 3, title: "Fractions and mixed numbers", summary: "By the end of this level, you will add, subtract, multiply and divide fractions and mixed numbers.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L3-1", description: "Simplify and manipulate fractions by identifying common denominators and factors, including simplifying to the simplest form.", dfeReference: "KS3 Number: simplify and manipulate fractions" },
      { code: "Y7-L3-2", description: "Add, subtract, multiply and divide fractions, including mixed numbers.", dfeReference: "KS3 Number: use the four operations with fractions" },
      { code: "Y7-L3-3", description: "Interpret fractions as operators.", dfeReference: "KS3 Number: interpret fractions as operators" }
    ]},
    { levelNumber: 4, title: "Decimals, percentages and conversions", summary: "By the end of this level, you will convert fluently between fractions, decimals and percentages.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L4-1", description: "Move fluently between representations of fractions, decimals and percentages.", dfeReference: "KS3 Number: move between fractions, decimals and percentages" },
      { code: "Y7-L4-2", description: "Interpret percentages as a fraction or decimal, and interpret percentage increase and decrease.", dfeReference: "KS3 Ratio & proportion: interpret percentages" },
      { code: "Y7-L4-3", description: "Define percentage as 'number of parts per hundred' and express one quantity as a percentage of another.", dfeReference: "KS3 Ratio & proportion: define percentage" }
    ]},
    { levelNumber: 5, title: "Ratio, proportion and scale", summary: "By the end of this level, you will solve problems involving ratio, proportion and scale diagrams.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L5-1", description: "Use ratio notation, including reduction to simplest form.", dfeReference: "KS3 Ratio & proportion: use ratio notation" },
      { code: "Y7-L5-2", description: "Divide a given quantity into two or more parts in a given ratio.", dfeReference: "KS3 Ratio & proportion: divide a quantity into a given ratio" },
      { code: "Y7-L5-3", description: "Use scale factors, scale diagrams and maps.", dfeReference: "KS3 Ratio & proportion: use scale factors, diagrams and maps" }
    ]},
    { levelNumber: 6, title: "Algebraic notation and simplifying expressions", summary: "By the end of this level, you will use algebraic notation and simplify expressions.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L6-1", description: "Use and interpret algebraic notation, including letters as variables and the convention of omitting the multiplication sign.", dfeReference: "KS3 Algebra: use/interpret algebraic notation" },
      { code: "Y7-L6-2", description: "Simplify and manipulate algebraic expressions by collecting like terms.", dfeReference: "KS3 Algebra: simplify/manipulate algebraic expressions by collecting like terms" },
      { code: "Y7-L6-3", description: "Substitute numerical values into formulae and expressions.", dfeReference: "KS3 Algebra: substitute numerical values" }
    ]},
    { levelNumber: 7, title: "Equations and number sequences", summary: "By the end of this level, you will solve linear equations and continue number sequences.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L7-1", description: "Understand and use the concepts and vocabulary of expressions, equations, inequalities, terms and factors.", dfeReference: "KS3 Algebra: understand concepts/vocabulary of expressions and equations" },
      { code: "Y7-L7-2", description: "Solve linear equations in one unknown, including those with the unknown on both sides.", dfeReference: "KS3 Algebra: solve linear equations in one unknown" },
      { code: "Y7-L7-3", description: "Generate terms of a sequence from a term-to-term or position-to-term rule.", dfeReference: "KS3 Algebra: generate terms of a sequence" }
    ]},
    { levelNumber: 8, title: "Angles, constructions and properties of shapes", summary: "By the end of this level, you will calculate angles and construct shapes accurately.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L8-1", description: "Derive and use the sum of angles in a triangle and use this to deduce properties of other shapes.", dfeReference: "KS3 Geometry & measures: derive/use sum of angles in a triangle" },
      { code: "Y7-L8-2", description: "Use the standard ruler and protractor conventions for constructing triangles and other 2D shapes.", dfeReference: "KS3 Geometry & measures: use conventions for constructions" },
      { code: "Y7-L8-3", description: "Identify properties of angles on a straight line, around a point and vertically opposite angles.", dfeReference: "KS3 Geometry & measures: angle facts" }
    ]},
    { levelNumber: 9, title: "Perimeter, area, volume, graphs and data", summary: "By the end of this level, you will calculate area/volume and interpret graphs and data.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L9-1", description: "Derive and apply formulae to calculate the area of triangles, parallelograms and trapezia.", dfeReference: "KS3 Geometry & measures: derive/apply formulae for area" },
      { code: "Y7-L9-2", description: "Calculate the surface area and volume of cuboids.", dfeReference: "KS3 Geometry & measures: surface area and volume of cuboids" },
      { code: "Y7-L9-3", description: "Interpret, analyse and compare data sets, including using pie charts and bar charts.", dfeReference: "KS3 Statistics: interpret/analyse/compare data sets" }
    ]},
    { levelNumber: 10, title: "Year 7 mixed mastery", summary: "By the end of this level, you will confidently use everything you have learned in Year 7.", isMixedMastery: true, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y7-L10-1", description: "Use integers, fractions, decimals and percentages fluently in calculations.", dfeReference: "KS3 Number (mixed review)" },
      { code: "Y7-L10-2", description: "Apply ratio, algebraic manipulation and equations to solve problems.", dfeReference: "KS3 Ratio & proportion / Algebra (mixed review)" },
      { code: "Y7-L10-3", description: "Use angle facts, area, volume and statistics in reasoning problems.", dfeReference: "KS3 Geometry & measures / Statistics (mixed review)" }
    ]}
  ]
};
