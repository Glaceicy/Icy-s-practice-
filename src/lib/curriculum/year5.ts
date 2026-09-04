import type { SchoolYearDef } from "./types";

// Year 5 (ages 9-10, KS2). Curriculum metadata/objectives defined; full lesson
// and question content scaffolded for future authoring (see DOCUMENTATION.md).
export const year5: SchoolYearDef = {
  yearNumber: 5,
  title: "Year 5",
  keyStage: "KS2",
  summary: "Large numbers, percentages and volume for 9-10 year olds.",
  minAge: 9,
  maxAge: 10,
  themeStage: "adventure",
  levels: [
    { levelNumber: 1, title: "Place value to 1,000,000, rounding and negative numbers", summary: "By the end of this level, you will read, write and round numbers to 1,000,000, including negative numbers.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L1-1", description: "Read, write, order and compare numbers to at least 1,000,000.", dfeReference: "Y5 Number & place value: read/write/order/compare numbers to 1,000,000" },
      { code: "Y5-L1-2", description: "Round any number up to 1,000,000 to a required degree of accuracy.", dfeReference: "Y5 Number & place value: round any number up to 1,000,000" },
      { code: "Y5-L1-3", description: "Interpret negative numbers in context, counting forwards and backwards through zero.", dfeReference: "Y5 Number & place value: interpret negative numbers in context" }
    ]},
    { levelNumber: 2, title: "Addition, subtraction and multi-step problems", summary: "By the end of this level, you will add and subtract large numbers and solve multi-step problems.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L2-1", description: "Add and subtract whole numbers with more than 4 digits using formal written methods.", dfeReference: "Y5 Addition & subtraction: formal written methods" },
      { code: "Y5-L2-2", description: "Use rounding to check answers and determine levels of accuracy.", dfeReference: "Y5 Addition & subtraction: use rounding to check answers" },
      { code: "Y5-L2-3", description: "Solve multi-step addition and subtraction problems, deciding which operations and methods to use.", dfeReference: "Y5 Addition & subtraction: solve multi-step problems" }
    ]},
    { levelNumber: 3, title: "Multiplication and division", summary: "By the end of this level, you will multiply and divide numbers using formal written methods.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L3-1", description: "Multiply numbers up to 4 digits by a one- or two-digit number using a formal written method.", dfeReference: "Y5 Multiplication & division: formal written method" },
      { code: "Y5-L3-2", description: "Divide numbers up to 4 digits by a one-digit number, interpreting remainders appropriately.", dfeReference: "Y5 Multiplication & division: divide, interpreting remainders" },
      { code: "Y5-L3-3", description: "Multiply and divide whole numbers by 10, 100 and 1,000.", dfeReference: "Y5 Multiplication & division: multiply/divide by 10, 100, 1000" }
    ]},
    { levelNumber: 4, title: "Factors, multiples, primes, squares and cubes", summary: "By the end of this level, you will identify factors, multiples, prime, square and cube numbers.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L4-1", description: "Identify multiples and factors, including finding all factor pairs of a number.", dfeReference: "Y5 Multiplication & division: identify multiples and factors" },
      { code: "Y5-L4-2", description: "Know and use the vocabulary of prime numbers and establish whether a number up to 100 is prime.", dfeReference: "Y5 Multiplication & division: prime numbers" },
      { code: "Y5-L4-3", description: "Recognise and use square numbers and cube numbers and their notation.", dfeReference: "Y5 Multiplication & division: square and cube numbers" }
    ]},
    { levelNumber: 5, title: "Fractions and mixed numbers", summary: "By the end of this level, you will compare, add and subtract fractions, including mixed numbers.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L5-1", description: "Compare and order fractions whose denominators are multiples of the same number.", dfeReference: "Y5 Fractions: compare/order fractions" },
      { code: "Y5-L5-2", description: "Add and subtract fractions with the same denominator, including mixed numbers.", dfeReference: "Y5 Fractions: add/subtract fractions and mixed numbers" },
      { code: "Y5-L5-3", description: "Multiply proper fractions and mixed numbers by whole numbers.", dfeReference: "Y5 Fractions: multiply proper fractions/mixed numbers by whole numbers" }
    ]},
    { levelNumber: 6, title: "Decimals and percentages", summary: "By the end of this level, you will convert between fractions, decimals and percentages.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L6-1", description: "Read, write, order and compare numbers with up to three decimal places.", dfeReference: "Y5 Decimals: read/write/order/compare with up to 3dp" },
      { code: "Y5-L6-2", description: "Recognise the per cent symbol and understand percentage as parts per hundred.", dfeReference: "Y5 Percentages: recognise % and parts per hundred" },
      { code: "Y5-L6-3", description: "Round decimals with two decimal places to the nearest whole number and one decimal place.", dfeReference: "Y5 Decimals: round decimals with 2dp" }
    ]},
    { levelNumber: 7, title: "Measurement, perimeter, area and volume", summary: "By the end of this level, you will calculate area, perimeter and volume using formulae.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L7-1", description: "Calculate the area of rectangles and estimate area of irregular shapes.", dfeReference: "Y5 Measurement: calculate area of rectangles" },
      { code: "Y5-L7-2", description: "Estimate volume and capacity using cubes and standard units.", dfeReference: "Y5 Measurement: estimate volume and capacity" },
      { code: "Y5-L7-3", description: "Convert between different units of metric measure.", dfeReference: "Y5 Measurement: convert between units of metric measure" }
    ]},
    { levelNumber: 8, title: "Angles, shapes, coordinates and transformations", summary: "By the end of this level, you will measure angles and reflect/translate shapes.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L8-1", description: "Know angles are measured in degrees; estimate and compare acute, obtuse and reflex angles.", dfeReference: "Y5 Geometry: know angles are measured in degrees" },
      { code: "Y5-L8-2", description: "Identify, describe and represent the position of a shape following reflection or translation.", dfeReference: "Y5 Geometry: reflection and translation" },
      { code: "Y5-L8-3", description: "Use the properties of rectangles to deduce related facts and find missing lengths and angles.", dfeReference: "Y5 Geometry: use properties of rectangles" }
    ]},
    { levelNumber: 9, title: "Statistics, line graphs and timetables", summary: "By the end of this level, you will read line graphs, tables and timetables.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L9-1", description: "Solve comparison, sum and difference problems using information presented in a line graph.", dfeReference: "Y5 Statistics: solve problems using line graphs" },
      { code: "Y5-L9-2", description: "Complete, read and interpret information in tables, including timetables.", dfeReference: "Y5 Statistics: complete/read/interpret tables including timetables" },
      { code: "Y5-L9-3", description: "Calculate durations using 24-hour clock timetables.", dfeReference: "Y5 Measurement/Statistics: 24-hour clock and timetables" }
    ]},
    { levelNumber: 10, title: "Year 5 mixed mastery", summary: "By the end of this level, you will confidently use everything you have learned in Year 5.", isMixedMastery: true, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y5-L10-1", description: "Use place value, negative numbers and the four operations with large numbers.", dfeReference: "Y5 Number & Addition/subtraction (mixed review)" },
      { code: "Y5-L10-2", description: "Apply factors, multiples, fractions, decimals and percentages in problems.", dfeReference: "Y5 Multiplication/division, Fractions, Decimals & Percentages (mixed review)" },
      { code: "Y5-L10-3", description: "Use area, volume, angles, transformations and statistics accurately.", dfeReference: "Y5 Measurement, Geometry & Statistics (mixed review)" }
    ]}
  ]
};
