import type { SchoolYearDef } from "./types";

// Year 1 (ages 5-6, KS1) — FLAGSHIP YEAR: fully authored (lessons, practice,
// 40-question mastery banks) across all 10 levels. Objectives are grounded in
// the DfE National Curriculum in England: Mathematics programmes of study,
// Key Stage 1, Year 1 (number & place value; addition & subtraction;
// multiplication & division; fractions; measurement; geometry).
export const year1: SchoolYearDef = {
  yearNumber: 1,
  title: "Year 1",
  keyStage: "KS1",
  summary: "First steps in number, shape and measuring for 5-6 year olds.",
  minAge: 5,
  maxAge: 6,
  themeStage: "playful",
  levels: [
    {
      levelNumber: 1,
      title: "Counting, reading and writing numbers to 20",
      summary: "By the end of this level, you will be able to count, read and write numbers to 20.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L1-1", description: "Count to 20 forwards and backwards, starting from any number.", dfeReference: "Y1 Number & place value: count to and across 100" },
        { code: "Y1-L1-2", description: "Read and write numbers to 20 in numerals and words.", dfeReference: "Y1 Number & place value: read and write numbers from 1 to 20" },
        { code: "Y1-L1-3", description: "Say one more or one less than a given number to 20.", dfeReference: "Y1 Number & place value: given a number, identify one more and one less" }
      ]
    },
    {
      levelNumber: 2,
      title: "Counting and place value to 100",
      summary: "By the end of this level, you will be able to count in 2s, 5s and 10s and understand numbers to 100.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L2-1", description: "Count to and across 100, forwards and backwards.", dfeReference: "Y1 Number & place value: count to and across 100" },
        { code: "Y1-L2-2", description: "Count in multiples of 2, 5 and 10.", dfeReference: "Y1 Number & place value: count in multiples of twos, fives and tens" },
        { code: "Y1-L2-3", description: "Compare numbers using more than, less than and equal to.", dfeReference: "Y1 Number & place value: use language of equal to, more than, less than" }
      ]
    },
    {
      levelNumber: 3,
      title: "Addition and subtraction within 10",
      summary: "By the end of this level, you will be able to add and subtract numbers within 10.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L3-1", description: "Read, write and understand addition (+) and subtraction (-) and equals (=) signs.", dfeReference: "Y1 Addition & subtraction: read/write/interpret statements using +, - and =" },
        { code: "Y1-L3-2", description: "Add two one-digit numbers within 10 using objects and pictures.", dfeReference: "Y1 Addition & subtraction: represent and use number bonds within 20" },
        { code: "Y1-L3-3", description: "Subtract one-digit numbers within 10.", dfeReference: "Y1 Addition & subtraction: add and subtract one-digit numbers to 20" }
      ]
    },
    {
      levelNumber: 4,
      title: "Addition and subtraction within 20",
      summary: "By the end of this level, you will be able to add and subtract two numbers within 20.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L4-1", description: "Add two numbers within 20, including crossing 10.", dfeReference: "Y1 Addition & subtraction: add one-digit and two-digit numbers to 20" },
        { code: "Y1-L4-2", description: "Subtract numbers within 20.", dfeReference: "Y1 Addition & subtraction: subtract one-digit and two-digit numbers to 20" },
        { code: "Y1-L4-3", description: "Solve simple one-step addition and subtraction word problems.", dfeReference: "Y1 Addition & subtraction: solve one-step problems involving addition and subtraction" }
      ]
    },
    {
      levelNumber: 5,
      title: "Number bonds, missing numbers and simple problems",
      summary: "By the end of this level, you will know your number bonds to 10 and 20 and be able to find missing numbers.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L5-1", description: "Recall number bonds to 10 and related subtraction facts.", dfeReference: "Y1 Addition & subtraction: represent and use number bonds within 20" },
        { code: "Y1-L5-2", description: "Find a missing number in an addition or subtraction sentence.", dfeReference: "Y1 Addition & subtraction: missing number problems" },
        { code: "Y1-L5-3", description: "Solve simple worded problems using number bonds.", dfeReference: "Y1 Addition & subtraction: solve one-step problems" }
      ]
    },
    {
      levelNumber: 6,
      title: "Early multiplication and division through grouping and sharing",
      summary: "By the end of this level, you will be able to group and share small amounts of objects equally.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L6-1", description: "Solve grouping problems using pictures and objects (e.g. how many groups of 2).", dfeReference: "Y1 Multiplication & division: solve one-step problems using concrete objects and arrays" },
        { code: "Y1-L6-2", description: "Solve sharing problems, sharing a quantity equally between a number of people.", dfeReference: "Y1 Multiplication & division: solve one-step problems using concrete objects and arrays" },
        { code: "Y1-L6-3", description: "Use arrays to show equal groups.", dfeReference: "Y1 Multiplication & division: arrays with support" }
      ]
    },
    {
      levelNumber: 7,
      title: "Finding halves and quarters",
      summary: "By the end of this level, you will be able to find a half and a quarter of shapes and amounts.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L7-1", description: "Recognise and find a half of an object, shape or quantity.", dfeReference: "Y1 Fractions: recognise, find and name a half" },
        { code: "Y1-L7-2", description: "Recognise and find a quarter of an object, shape or quantity.", dfeReference: "Y1 Fractions: recognise, find and name a quarter" },
        { code: "Y1-L7-3", description: "Decide whether a shape has been split into equal or unequal parts.", dfeReference: "Y1 Fractions: recognise equal parts" }
      ]
    },
    {
      levelNumber: 8,
      title: "Length, height, mass, capacity, time and money",
      summary: "By the end of this level, you will be able to compare and measure using everyday units and tell the time to the hour and half hour.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L8-1", description: "Compare and describe length, height, weight and capacity using everyday language.", dfeReference: "Y1 Measurement: compare, describe and solve practical problems for lengths, mass and capacity" },
        { code: "Y1-L8-2", description: "Recognise and know the value of UK coins and notes.", dfeReference: "Y1 Measurement: recognise and know the value of different denominations of coins and notes" },
        { code: "Y1-L8-3", description: "Tell the time to the hour and half hour and sequence daily events.", dfeReference: "Y1 Measurement: tell the time to the hour and half past the hour" }
      ]
    },
    {
      levelNumber: 9,
      title: "2D shapes, 3D shapes, position and direction",
      summary: "By the end of this level, you will be able to name common shapes and describe position and direction.",
      isMixedMastery: false,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L9-1", description: "Recognise and name common 2D shapes, including circles, triangles, squares and rectangles.", dfeReference: "Y1 Geometry: recognise and name common 2D shapes" },
        { code: "Y1-L9-2", description: "Recognise and name common 3D shapes, including cubes, spheres, cones and cylinders.", dfeReference: "Y1 Geometry: recognise and name common 3D shapes" },
        { code: "Y1-L9-3", description: "Describe position, direction and movement, including half and quarter turns.", dfeReference: "Y1 Geometry: describe position, direction and movement" }
      ]
    },
    {
      levelNumber: 10,
      title: "Year 1 mixed mastery",
      summary: "By the end of this level, you will confidently use everything you have learned in Year 1.",
      isMixedMastery: true,
      status: "COMPLETE",
      pathway: null,
      objectives: [
        { code: "Y1-L10-1", description: "Use counting, number bonds and addition/subtraction to 20 accurately.", dfeReference: "Y1 Number & Addition/subtraction (mixed review)" },
        { code: "Y1-L10-2", description: "Apply grouping, sharing, halves and quarters to solve problems.", dfeReference: "Y1 Multiplication/division & Fractions (mixed review)" },
        { code: "Y1-L10-3", description: "Use measuring, money, time, shape and position knowledge in varied problems.", dfeReference: "Y1 Measurement & Geometry (mixed review)" }
      ]
    }
  ]
};
