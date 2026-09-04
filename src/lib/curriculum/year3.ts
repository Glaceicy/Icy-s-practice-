import type { SchoolYearDef } from "./types";

// Year 3 (ages 7-8, KS2). Curriculum metadata/objectives defined; full lesson
// and question content scaffolded for future authoring (see DOCUMENTATION.md).
export const year3: SchoolYearDef = {
  yearNumber: 3,
  title: "Year 3",
  keyStage: "KS2",
  summary: "Numbers to 1,000, the 3/4/8 times tables and perimeter for 7-8 year olds.",
  minAge: 7,
  maxAge: 8,
  themeStage: "playful",
  levels: [
    { levelNumber: 1, title: "Place value and numbers to 1,000", summary: "By the end of this level, you will understand hundreds, tens and ones to 1,000.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L1-1", description: "Recognise the place value of each digit in a three-digit number.", dfeReference: "Y3 Number & place value: recognise place value of each digit (H,T,O)" },
      { code: "Y3-L1-2", description: "Compare and order numbers up to 1,000.", dfeReference: "Y3 Number & place value: compare and order numbers up to 1000" },
      { code: "Y3-L1-3", description: "Count from 0 in multiples of 4, 8, 50 and 100.", dfeReference: "Y3 Number & place value: count from 0 in multiples of 4, 8, 50, 100" }
    ]},
    { levelNumber: 2, title: "Written addition and subtraction", summary: "By the end of this level, you will add and subtract numbers using columns.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L2-1", description: "Add and subtract numbers mentally, including a three-digit number and ones/tens/hundreds.", dfeReference: "Y3 Addition & subtraction: add/subtract mentally" },
      { code: "Y3-L2-2", description: "Use formal written column methods for addition and subtraction.", dfeReference: "Y3 Addition & subtraction: written methods, columnar addition and subtraction" },
      { code: "Y3-L2-3", description: "Estimate and check answers using inverse operations.", dfeReference: "Y3 Addition & subtraction: estimate and use inverse operations to check" }
    ]},
    { levelNumber: 3, title: "The 3, 4 and 8 multiplication tables", summary: "By the end of this level, you will know the 3, 4 and 8 times tables.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L3-1", description: "Recall and use multiplication facts for the 3, 4 and 8 times tables.", dfeReference: "Y3 Multiplication & division: recall 3, 4, 8 times tables" },
      { code: "Y3-L3-2", description: "Write and calculate mathematical statements for multiplication using known facts.", dfeReference: "Y3 Multiplication & division: write/calculate statements using tables" },
      { code: "Y3-L3-3", description: "Solve problems involving multiplying two-digit numbers by one-digit numbers.", dfeReference: "Y3 Multiplication & division: two-digit by one-digit" }
    ]},
    { levelNumber: 4, title: "Division, grouping, sharing and remainders", summary: "By the end of this level, you will divide numbers and interpret remainders.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L4-1", description: "Divide two-digit numbers by a one-digit number using known tables facts.", dfeReference: "Y3 Multiplication & division: division facts" },
      { code: "Y3-L4-2", description: "Interpret remainders appropriately for the context of a problem.", dfeReference: "Y3 Multiplication & division: solve problems involving remainders" },
      { code: "Y3-L4-3", description: "Solve simple word problems involving grouping and sharing.", dfeReference: "Y3 Multiplication & division: correspondence problems" }
    ]},
    { levelNumber: 5, title: "Fractions and equivalent fractions", summary: "By the end of this level, you will find and compare fractions of amounts.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L5-1", description: "Count up and down in tenths and recognise tenths.", dfeReference: "Y3 Fractions: count up/down in tenths" },
      { code: "Y3-L5-2", description: "Recognise and show, using diagrams, equivalent fractions with small denominators.", dfeReference: "Y3 Fractions: recognise/show equivalent fractions" },
      { code: "Y3-L5-3", description: "Add and subtract fractions with the same denominator within one whole.", dfeReference: "Y3 Fractions: add and subtract fractions with the same denominator" }
    ]},
    { levelNumber: 6, title: "Measurement and perimeter", summary: "By the end of this level, you will measure length and calculate the perimeter of shapes.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L6-1", description: "Measure, compare, add and subtract lengths (m/cm/mm), mass (kg/g) and volume/capacity (l/ml).", dfeReference: "Y3 Measurement: measure, compare, add/subtract" },
      { code: "Y3-L6-2", description: "Measure the perimeter of simple 2D shapes.", dfeReference: "Y3 Measurement: measure the perimeter of simple 2D shapes" },
      { code: "Y3-L6-3", description: "Add and subtract amounts of money to give change.", dfeReference: "Y3 Measurement: add and subtract amounts of money" }
    ]},
    { levelNumber: 7, title: "Money calculations and word problems", summary: "By the end of this level, you will solve money problems using pounds and pence.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L7-1", description: "Add and subtract amounts of money to give change, using both £ and p in practical contexts.", dfeReference: "Y3 Measurement: money" },
      { code: "Y3-L7-2", description: "Solve two-step money word problems.", dfeReference: "Y3 Measurement: solve simple problems in a practical context" },
      { code: "Y3-L7-3", description: "Round amounts of money to the nearest £1 or 10p.", dfeReference: "Y3 Number: rounding applied to money" }
    ]},
    { levelNumber: 8, title: "Time, duration and calendars", summary: "By the end of this level, you will tell the time on analogue and digital clocks and calculate durations.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L8-1", description: "Tell and write the time from an analogue clock, including using Roman numerals.", dfeReference: "Y3 Measurement: tell and write the time from an analogue clock" },
      { code: "Y3-L8-2", description: "Know the number of seconds in a minute, days in each month and year.", dfeReference: "Y3 Measurement: know number of seconds in a minute etc." },
      { code: "Y3-L8-3", description: "Compare durations of events and calculate simple time intervals.", dfeReference: "Y3 Measurement: compare durations of events" }
    ]},
    { levelNumber: 9, title: "Angles, shapes and statistics", summary: "By the end of this level, you will identify angles, shapes and read bar charts.", isMixedMastery: false, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L9-1", description: "Recognise angles as a property of shape and identify right angles.", dfeReference: "Y3 Geometry: recognise angles, identify right angles" },
      { code: "Y3-L9-2", description: "Identify horizontal, vertical, perpendicular and parallel lines.", dfeReference: "Y3 Geometry: identify lines and angles" },
      { code: "Y3-L9-3", description: "Interpret and present data using bar charts, pictograms and tables.", dfeReference: "Y3 Statistics: interpret and present data" }
    ]},
    { levelNumber: 10, title: "Year 3 mixed mastery", summary: "By the end of this level, you will confidently use everything you have learned in Year 3.", isMixedMastery: true, status: "SCAFFOLDED", pathway: null, objectives: [
      { code: "Y3-L10-1", description: "Use place value and written methods to add/subtract numbers to 1,000.", dfeReference: "Y3 Number & Addition/subtraction (mixed review)" },
      { code: "Y3-L10-2", description: "Apply the 3, 4 and 8 times tables and fractions in problems.", dfeReference: "Y3 Multiplication/division & Fractions (mixed review)" },
      { code: "Y3-L10-3", description: "Use measurement, money, time, shape and statistics accurately.", dfeReference: "Y3 Measurement, Geometry & Statistics (mixed review)" }
    ]}
  ]
};
