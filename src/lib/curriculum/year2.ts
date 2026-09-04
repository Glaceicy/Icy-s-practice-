import type { SchoolYearDef } from "./types";

// Year 2 (ages 6-7, KS1). Curriculum metadata and objectives are fully defined;
// full lesson/question content is scheduled for a future authoring pass (see
// DOCUMENTATION.md "Content coverage status") — levels are shown to learners
// as "Coming soon" rather than presented as playable with placeholder content.
export const year2: SchoolYearDef = {
  yearNumber: 2,
  title: "Year 2",
  keyStage: "KS1",
  summary: "Building fluency with numbers to 100, times tables and measuring for 6-7 year olds.",
  minAge: 6,
  maxAge: 7,
  themeStage: "playful",
  levels: [
    {
      levelNumber: 1,
      title: "Place value and numbers to 100",
      summary: "By the end of this level, you will understand tens and ones in numbers up to 100.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L1-1", description: "Recognise the place value of each digit in a two-digit number (tens, ones).", dfeReference: "Y2 Number & place value: recognise place value of each digit" },
        { code: "Y2-L1-2", description: "Compare and order numbers to 100 using <, > and =.", dfeReference: "Y2 Number & place value: compare and order numbers using symbols" },
        { code: "Y2-L1-3", description: "Count in steps of 2, 3 and 5, and in tens from any number.", dfeReference: "Y2 Number & place value: count in steps of 2, 3 and 5" }
      ]
    },
    {
      levelNumber: 2,
      title: "Addition and subtraction facts",
      summary: "By the end of this level, you will recall addition and subtraction facts to 20.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L2-1", description: "Recall and use addition and subtraction facts to 20 fluently.", dfeReference: "Y2 Addition & subtraction: recall and use number bonds to 20" },
        { code: "Y2-L2-2", description: "Derive related facts (e.g. 7+3=10, so 70+30=100).", dfeReference: "Y2 Addition & subtraction: derive and use related facts to 100" },
        { code: "Y2-L2-3", description: "Add and subtract mentally using a number line.", dfeReference: "Y2 Addition & subtraction: add/subtract using concrete objects and mental methods" }
      ]
    },
    {
      levelNumber: 3,
      title: "Adding and subtracting two-digit numbers",
      summary: "By the end of this level, you will add and subtract two-digit numbers.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L3-1", description: "Add a two-digit number and ones.", dfeReference: "Y2 Addition & subtraction: a two-digit number and ones" },
        { code: "Y2-L3-2", description: "Add and subtract two two-digit numbers.", dfeReference: "Y2 Addition & subtraction: two two-digit numbers" },
        { code: "Y2-L3-3", description: "Solve two-step addition and subtraction word problems.", dfeReference: "Y2 Addition & subtraction: solve problems, including missing number problems" }
      ]
    },
    {
      levelNumber: 4,
      title: "Multiplication and division using 2, 5 and 10",
      summary: "By the end of this level, you will know the 2, 5 and 10 times tables.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L4-1", description: "Recall and use multiplication facts for the 2, 5 and 10 times tables.", dfeReference: "Y2 Multiplication & division: recall 2, 5 and 10 times tables" },
        { code: "Y2-L4-2", description: "Use arrays to represent multiplication.", dfeReference: "Y2 Multiplication & division: show using arrays" },
        { code: "Y2-L4-3", description: "Solve simple division problems by sharing and grouping.", dfeReference: "Y2 Multiplication & division: calculate using multiplication and division" }
      ]
    },
    {
      levelNumber: 5,
      title: "Fractions, including thirds and quarters",
      summary: "By the end of this level, you will find halves, thirds and quarters of shapes and amounts.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L5-1", description: "Recognise, find, name and write 1/3, 1/4, 2/4 and 3/4 of a length, shape or set.", dfeReference: "Y2 Fractions: recognise, find, name and write fractions" },
        { code: "Y2-L5-2", description: "Recognise that 2/4 and 1/2 are equivalent.", dfeReference: "Y2 Fractions: write simple fractions and recognise equivalence" },
        { code: "Y2-L5-3", description: "Find fractions of a set of objects.", dfeReference: "Y2 Fractions: find fractions of a set of objects" }
      ]
    },
    {
      levelNumber: 6,
      title: "Length, mass, temperature and capacity",
      summary: "By the end of this level, you will measure and compare length, mass and capacity.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L6-1", description: "Choose and use standard units to measure length, mass and capacity.", dfeReference: "Y2 Measurement: choose and use appropriate standard units" },
        { code: "Y2-L6-2", description: "Compare and order lengths, masses and capacities using <, > and =.", dfeReference: "Y2 Measurement: compare and order using symbols" },
        { code: "Y2-L6-3", description: "Read simple scales to the nearest labelled division.", dfeReference: "Y2 Measurement: read scales" }
      ]
    },
    {
      levelNumber: 7,
      title: "Money and money problems",
      summary: "By the end of this level, you will add and subtract amounts of money in pounds and pence.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L7-1", description: "Recognise and combine coins and notes to make a given amount.", dfeReference: "Y2 Measurement: recognise and use symbols £ and p" },
        { code: "Y2-L7-2", description: "Find different combinations of coins that equal the same amount.", dfeReference: "Y2 Measurement: find different combinations of coins" },
        { code: "Y2-L7-3", description: "Solve simple money word problems, including giving change.", dfeReference: "Y2 Measurement: solve simple problems in a practical context" }
      ]
    },
    {
      levelNumber: 8,
      title: "Time and duration",
      summary: "By the end of this level, you will tell the time to five minutes and compare durations.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L8-1", description: "Tell and write the time to five minutes, including quarter past/to.", dfeReference: "Y2 Measurement: tell and write the time to five minutes" },
        { code: "Y2-L8-2", description: "Compare and sequence intervals of time.", dfeReference: "Y2 Measurement: compare and sequence intervals of time" },
        { code: "Y2-L8-3", description: "Know the number of minutes in an hour and hours in a day.", dfeReference: "Y2 Measurement: know number of minutes in an hour and hours in a day" }
      ]
    },
    {
      levelNumber: 9,
      title: "Shapes, position, direction and simple statistics",
      summary: "By the end of this level, you will describe shapes, movement and simple charts.",
      isMixedMastery: false, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L9-1", description: "Identify and describe properties of 2D and 3D shapes.", dfeReference: "Y2 Geometry: identify and describe properties of shapes" },
        { code: "Y2-L9-2", description: "Use mathematical vocabulary to describe position, direction and movement.", dfeReference: "Y2 Geometry: order and arrange combinations; use mathematical vocabulary" },
        { code: "Y2-L9-3", description: "Interpret and construct simple pictograms, tally charts and block diagrams.", dfeReference: "Y2 Statistics: interpret and construct simple pictograms, tally charts, block diagrams" }
      ]
    },
    {
      levelNumber: 10,
      title: "Year 2 mixed mastery",
      summary: "By the end of this level, you will confidently use everything you have learned in Year 2.",
      isMixedMastery: true, status: "SCAFFOLDED", pathway: null,
      objectives: [
        { code: "Y2-L10-1", description: "Use place value and mental methods to add and subtract to 100.", dfeReference: "Y2 Number & Addition/subtraction (mixed review)" },
        { code: "Y2-L10-2", description: "Apply times tables, fractions and measurement in problems.", dfeReference: "Y2 Multiplication/division, Fractions & Measurement (mixed review)" },
        { code: "Y2-L10-3", description: "Use money, time, shape and simple statistics accurately.", dfeReference: "Y2 Measurement, Geometry & Statistics (mixed review)" }
      ]
    }
  ]
};
