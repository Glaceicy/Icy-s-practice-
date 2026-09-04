import type { SchoolYearDef } from "./types";

// Year 4 (ages 8-9, KS2) — FLAGSHIP YEAR: fully authored across all 10 levels,
// grounded in the DfE National Curriculum Key Stage 2 Year 4 programme of study.
export const year4: SchoolYearDef = {
  yearNumber: 4,
  title: "Year 4",
  keyStage: "KS2",
  summary: "Times tables to 12x12, decimals and area for 8-9 year olds.",
  minAge: 8,
  maxAge: 9,
  themeStage: "adventure",
  levels: [
    { levelNumber: 1, title: "Place value, rounding and numbers to 10,000", summary: "By the end of this level, you will read, write and round numbers to 10,000.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L1-1", description: "Recognise the place value of each digit in a four-digit number.", dfeReference: "Y4 Number & place value: recognise place value of each digit (Th,H,T,O)" },
      { code: "Y4-L1-2", description: "Round any number to the nearest 10, 100 or 1,000.", dfeReference: "Y4 Number & place value: round any number to the nearest 10, 100 or 1000" },
      { code: "Y4-L1-3", description: "Count in multiples of 6, 7, 9, 25 and 1,000.", dfeReference: "Y4 Number & place value: count in multiples of 6, 7, 9, 25 and 1000" }
    ]},
    { levelNumber: 2, title: "Addition and subtraction", summary: "By the end of this level, you will add and subtract numbers with up to 4 digits.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L2-1", description: "Add and subtract numbers with up to 4 digits using the formal written column method.", dfeReference: "Y4 Addition & subtraction: add/subtract using formal written methods" },
      { code: "Y4-L2-2", description: "Estimate and use inverse operations to check answers.", dfeReference: "Y4 Addition & subtraction: estimate and use inverse operations" },
      { code: "Y4-L2-3", description: "Solve two-step addition and subtraction problems, deciding which operations to use.", dfeReference: "Y4 Addition & subtraction: solve two-step problems" }
    ]},
    { levelNumber: 3, title: "Multiplication tables up to 12 x 12", summary: "By the end of this level, you will recall all multiplication and division facts up to 12x12.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L3-1", description: "Recall multiplication and division facts for all tables up to 12 x 12.", dfeReference: "Y4 Multiplication & division: recall facts up to 12x12" },
      { code: "Y4-L3-2", description: "Use place value and known facts to multiply and divide mentally.", dfeReference: "Y4 Multiplication & division: use place value and known facts" },
      { code: "Y4-L3-3", description: "Recognise and use factor pairs and commutativity in mental calculations.", dfeReference: "Y4 Multiplication & division: recognise/use factor pairs and commutativity" }
    ]},
    { levelNumber: 4, title: "Written multiplication and division", summary: "By the end of this level, you will multiply two- and three-digit numbers by a one-digit number.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L4-1", description: "Multiply two-digit and three-digit numbers by a one-digit number using formal written layout.", dfeReference: "Y4 Multiplication & division: formal written layout" },
      { code: "Y4-L4-2", description: "Divide two-digit numbers by a one-digit number, interpreting remainders.", dfeReference: "Y4 Multiplication & division: division with remainders" },
      { code: "Y4-L4-3", description: "Solve problems involving multiplying and adding, including using the distributive law.", dfeReference: "Y4 Multiplication & division: distributive law" }
    ]},
    { levelNumber: 5, title: "Fractions and equivalent fractions", summary: "By the end of this level, you will recognise, compare and add fractions.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L5-1", description: "Recognise and show families of common equivalent fractions.", dfeReference: "Y4 Fractions: recognise and show families of equivalent fractions" },
      { code: "Y4-L5-2", description: "Add and subtract fractions with the same denominator.", dfeReference: "Y4 Fractions: add and subtract fractions with the same denominator" },
      { code: "Y4-L5-3", description: "Recognise and write decimal equivalents of common fractions (1/4, 1/2, 3/4).", dfeReference: "Y4 Fractions: recognise/write decimal equivalents" }
    ]},
    { levelNumber: 6, title: "Decimals and decimal place value", summary: "By the end of this level, you will read, write and compare decimals with up to two decimal places.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L6-1", description: "Recognise and write decimal equivalents of any number of tenths or hundredths.", dfeReference: "Y4 Decimals: recognise/write decimal equivalents" },
      { code: "Y4-L6-2", description: "Round decimals with one decimal place to the nearest whole number.", dfeReference: "Y4 Decimals: round decimals with 1dp to nearest whole number" },
      { code: "Y4-L6-3", description: "Compare numbers with the same number of decimal places up to two decimal places.", dfeReference: "Y4 Decimals: compare numbers with up to two decimal places" }
    ]},
    { levelNumber: 7, title: "Measurement, conversion, perimeter and area", summary: "By the end of this level, you will convert units and find the area and perimeter of rectangles.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L7-1", description: "Convert between different units of measure (km/m, hour/minute, etc.).", dfeReference: "Y4 Measurement: convert between different units of measure" },
      { code: "Y4-L7-2", description: "Find the area of rectilinear shapes by counting squares.", dfeReference: "Y4 Measurement: find the area of rectilinear shapes by counting squares" },
      { code: "Y4-L7-3", description: "Measure and calculate the perimeter of a rectilinear figure.", dfeReference: "Y4 Measurement: measure and calculate the perimeter" }
    ]},
    { levelNumber: 8, title: "Angles, symmetry, shapes and coordinates", summary: "By the end of this level, you will classify angles and shapes and use coordinates.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L8-1", description: "Compare and classify geometric shapes, including quadrilaterals and triangles.", dfeReference: "Y4 Geometry: compare and classify geometric shapes" },
      { code: "Y4-L8-2", description: "Identify acute and obtuse angles and compare angle sizes.", dfeReference: "Y4 Geometry: identify acute and obtuse angles" },
      { code: "Y4-L8-3", description: "Describe positions on a 2D grid as coordinates in the first quadrant.", dfeReference: "Y4 Geometry: describe positions using coordinates" }
    ]},
    { levelNumber: 9, title: "Statistics, tables and charts", summary: "By the end of this level, you will interpret and present data in charts and tables.", isMixedMastery: false, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L9-1", description: "Interpret and present discrete and continuous data using bar charts and time graphs.", dfeReference: "Y4 Statistics: interpret and present discrete/continuous data" },
      { code: "Y4-L9-2", description: "Solve comparison, sum and difference problems using information in bar charts.", dfeReference: "Y4 Statistics: solve comparison, sum and difference problems" },
      { code: "Y4-L9-3", description: "Read and complete simple frequency tables.", dfeReference: "Y4 Statistics: complete tables" }
    ]},
    { levelNumber: 10, title: "Year 4 mixed mastery", summary: "By the end of this level, you will confidently use everything you have learned in Year 4.", isMixedMastery: true, status: "COMPLETE", pathway: null, objectives: [
      { code: "Y4-L10-1", description: "Use place value, rounding and the four operations with numbers to 10,000.", dfeReference: "Y4 Number & Addition/subtraction (mixed review)" },
      { code: "Y4-L10-2", description: "Apply times tables, fractions and decimals in problems.", dfeReference: "Y4 Multiplication/division, Fractions & Decimals (mixed review)" },
      { code: "Y4-L10-3", description: "Use measurement, area, perimeter, shape and statistics accurately.", dfeReference: "Y4 Measurement, Geometry & Statistics (mixed review)" }
    ]}
  ]
};
