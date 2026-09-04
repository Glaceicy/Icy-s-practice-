import type { LessonContent } from "./types";

// Mini-lesson content for the flagship, fully-authored levels. Each level is
// broken into several short lessons (concrete-pictorial-abstract) rather
// than one long explanation, per spec §3B.
export const lessonsByLevelKey: Record<string, LessonContent[]> = {
  Y1L1: [
    {
      order: 1,
      title: "Counting forwards and backwards to 20",
      concept: "Counting a set of objects and saying the number sequence to 20",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L1-1"],
      explanationMd:
        "When we count, we say one number name for every object — touching each one as we go so we don't miss any or count one twice.\n\n" +
        "We can count forwards (1, 2, 3...) to find out **how many**, and count backwards (20, 19, 18...) to take away.",
      workedExamples: [
        { problem: "Count these 7 stars: ⭐⭐⭐⭐⭐⭐⭐", steps: ["Touch the first star and say 1.", "Touch each next star, saying the next number.", "The last number you say is the total."], answer: "7" },
        { problem: "Count backwards from 12 to 8.", steps: ["Start at 12.", "Say the number before each time: 11, 10, 9, 8.", "Stop at 8."], answer: "12, 11, 10, 9, 8" }
      ],
      audioScript: "Let's count together! Touch each star as you say the number. Ready? One... two... three..."
    },
    {
      order: 2,
      title: "One more, one less",
      concept: "Finding one more or one less than a given number using a number line",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L1-3"],
      explanationMd:
        "On a number line, **one more** means moving one step to the right. **One less** means moving one step to the left.\n\n" +
        "This works for any number up to 20 — try it with your finger on a number line!",
      workedExamples: [
        { problem: "What is one more than 8?", steps: ["Find 8 on the number line.", "Move one step to the right.", "You land on 9."], answer: "9" },
        { problem: "What is one less than 15?", steps: ["Find 15 on the number line.", "Move one step to the left.", "You land on 14."], answer: "14" }
      ],
      audioScript: "One more means we move forwards one step. One less means we move backwards one step. Let's try it on our number line."
    },
    {
      order: 3,
      title: "Reading and writing numbers to 20",
      concept: "Matching numerals (like 14) to number words (like fourteen)",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L1-2"],
      explanationMd:
        "A **numeral** is a number written in digits, like 14. A **number word** is the same number written in letters, like *fourteen*.\n\n" +
        "The number words from eleven to nineteen don't follow quite the same pattern as the words after twenty — so these are extra important to practise!",
      workedExamples: [
        { problem: "Write the numeral for 'sixteen'.", steps: ["Say the word slowly: six-teen.", "This means the number after fifteen.", "Write the digits."], answer: "16" },
        { problem: "Write the word for 11.", steps: ["11 is a special one-off word.", "It is not 'oneteen'!"], answer: "eleven" }
      ],
      audioScript: "Let's practise reading number words. Some of them, like eleven and twelve, have their own special names to learn."
    }
  ],
  Y1L2: [
    {
      order: 1,
      title: "Tens and ones",
      concept: "Understanding that a two-digit number is made of groups of ten and some extra ones",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L2-1"],
      explanationMd:
        "We can bundle ten counters together to make **one ten**. Any counters left over are the **ones**.\n\n" +
        "For example, 34 is made of 3 tens and 4 ones — three full bundles of ten, and four more.",
      workedExamples: [
        { problem: "How many tens and ones make 27?", steps: ["Make bundles of ten: 2 bundles = 20.", "Count what's left over: 7.", "27 = 2 tens and 7 ones."], answer: "2 tens, 7 ones" }
      ],
      audioScript: "Every time we get ten ones, we bundle them into one ten. Let's build some two-digit numbers together."
    },
    {
      order: 2,
      title: "Counting in 2s, 5s and 10s",
      concept: "Skip counting to count larger amounts quickly",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L2-2"],
      explanationMd:
        "Instead of counting one at a time, we can count in jumps! Counting in 10s (10, 20, 30...) is a fast way to count big groups.",
      workedExamples: [
        { problem: "Count in 10s: 10, 20, 30, ___", steps: ["Each jump adds 10.", "30 + 10 = 40."], answer: "40" }
      ],
      audioScript: "Let's skip count together — in tens this time. Ten, twenty, thirty..."
    },
    {
      order: 3,
      title: "Comparing numbers to 100",
      concept: "Using the tens digit (and then the ones digit) to decide which number is bigger",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L2-3"],
      explanationMd:
        "To compare two numbers, look at the tens digit first. The number with more tens is bigger. If the tens digits match, compare the ones digit.",
      workedExamples: [
        { problem: "Which is bigger, 52 or 48?", steps: ["52 has 5 tens; 48 has 4 tens.", "5 tens is more than 4 tens."], answer: "52" }
      ],
      audioScript: "When comparing numbers, always check the tens digit first."
    }
  ],
  Y1L10: [
    {
      order: 1,
      title: "Putting it together: number and calculation",
      concept: "Reviewing counting, number bonds and addition/subtraction within 20",
      representation: "cpa",
      visualAid: "bar-model",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L10-1"],
      explanationMd:
        "This year you have learned to count, compare and calculate with numbers to 20 (and beyond!). A bar model can help you see a whole being split into two parts, whichever operation you need.",
      workedExamples: [
        { problem: "8 + 5 = ?", steps: ["Draw a bar for 8 and a bar for 5 next to it.", "Count on from 8: 9, 10, 11, 12, 13."], answer: "13" }
      ],
      audioScript: "Let's remember everything we know about numbers this year."
    },
    {
      order: 2,
      title: "Putting it together: grouping, sharing and fractions",
      concept: "Reviewing early multiplication/division and halves/quarters",
      representation: "cpa",
      visualAid: "array",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L10-2"],
      explanationMd:
        "Grouping and sharing help us understand multiplication and division. Halving and quartering split an amount into equal parts.",
      workedExamples: [
        { problem: "Share 8 apples equally between 2 friends.", steps: ["Give one apple at a time to each friend.", "Keep going until none are left."], answer: "4 each" }
      ],
      audioScript: "Sharing equally is an important skill — let's practise it together."
    },
    {
      order: 3,
      title: "Putting it together: measuring, money, time and shape",
      concept: "Reviewing measurement, money, time and shape knowledge from across the year",
      representation: "cpa",
      visualAid: "clock",
      ageBandStyle: "playful",
      objectiveCodes: ["Y1-L10-3"],
      explanationMd:
        "You have learned to compare lengths and weights, recognise coins, tell the time to the hour and half hour, and name 2D and 3D shapes.",
      workedExamples: [
        { problem: "What time does a clock show when both hands point straight up?", steps: ["The hour hand and minute hand both point to 12."], answer: "12 o'clock" }
      ],
      audioScript: "Let's put together everything we know about measuring, money, time and shapes."
    }
  ],
  Y4L1: [
    {
      order: 1,
      title: "Thousands, hundreds, tens and ones",
      concept: "Understanding place value in four-digit numbers",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L1-1"],
      explanationMd:
        "A four-digit number like 3,482 has a **thousands**, **hundreds**, **tens** and **ones** digit. Each place is worth ten times the place to its right.",
      workedExamples: [
        { problem: "What is the value of the 4 in 3,482?", steps: ["The 4 is in the hundreds column.", "So it is worth 4 hundreds."], answer: "400" }
      ],
      audioScript: "Each digit's position tells us its value. Let's break down some four-digit numbers together."
    },
    {
      order: 2,
      title: "Rounding to 10, 100 and 1,000",
      concept: "Rounding numbers to the nearest 10, 100 or 1,000",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L1-2"],
      explanationMd:
        "To round, find the digit in the place you're rounding to, then look at the digit just after it. 5 or more rounds up; less than 5 rounds down.",
      workedExamples: [
        { problem: "Round 2,847 to the nearest 100.", steps: ["Look at the tens digit: 4.", "4 is less than 5, so round down.", "The hundreds digit stays as 8."], answer: "2,800" }
      ],
      audioScript: "Rounding helps us estimate. Let's practise rounding some big numbers."
    },
    {
      order: 3,
      title: "Counting in 6s, 7s, 9s, 25s and 1,000s",
      concept: "Extending skip counting to less familiar step sizes",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y4-L1-3"],
      explanationMd:
        "Just like counting in 2s, 5s and 10s, we can count in any step size — even 6s, 7s, 9s or 25s. Add the step size each time.",
      workedExamples: [
        { problem: "Count in 25s: 0, 25, 50, ___", steps: ["Add 25 to 50."], answer: "75" }
      ],
      audioScript: "Let's try counting in some trickier step sizes."
    }
  ],
  Y7L1: [
    {
      order: 1,
      title: "Ordering positive and negative integers",
      concept: "Placing positive and negative numbers on a number line and comparing them",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L1-1"],
      explanationMd:
        "On a number line, numbers increase from left to right. Negative numbers are less than zero — the further left, the smaller the number.\n\n" +
        "So -8 is smaller than -3, even though 8 is bigger than 3 as a positive number!",
      workedExamples: [
        { problem: "Which is greater, -5 or -2?", steps: ["-2 is closer to zero (further right) than -5.", "Further right means greater."], answer: "-2" }
      ],
      audioScript: "Remember: on a number line, further right always means greater — even for negative numbers."
    },
    {
      order: 2,
      title: "Adding and subtracting negative numbers",
      concept: "Using a number line to add and subtract with negative numbers",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L1-2"],
      explanationMd:
        "Adding a positive number moves right on the number line. Adding a negative number (or subtracting a positive) moves left.\n\n" +
        "Subtracting a negative number is the same as adding — the two minus signs combine into a plus.",
      workedExamples: [
        { problem: "-3 + 5 = ?", steps: ["Start at -3.", "Move 5 steps right.", "Land on 2."], answer: "2" },
        { problem: "4 - (-6) = ?", steps: ["Subtracting a negative becomes adding.", "4 + 6 = 10."], answer: "10" }
      ],
      audioScript: "Two minus signs next to each other always become a plus. Let's see why on the number line."
    },
    {
      order: 3,
      title: "Multiplying and dividing negative numbers",
      concept: "Applying the same-sign/different-sign rule for multiplying and dividing",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "gameinspired",
      objectiveCodes: ["Y7-L1-2"],
      explanationMd:
        "When multiplying or dividing: if the two signs are the **same**, the answer is **positive**. If the signs are **different**, the answer is **negative**.",
      workedExamples: [
        { problem: "-4 x -3 = ?", steps: ["Same signs (both negative).", "4 x 3 = 12.", "Answer is positive."], answer: "12" },
        { problem: "-4 x 3 = ?", steps: ["Different signs.", "4 x 3 = 12.", "Answer is negative."], answer: "-12" }
      ],
      audioScript: "Same signs give a positive answer. Different signs give a negative answer. Let's practise."
    }
  ],
  Y10L1: [
    {
      order: 1,
      title: "Upper and lower bounds",
      concept: "Finding the range of possible true values behind a rounded measurement",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-1"],
      explanationMd:
        "When a measurement is rounded, the true value could be anywhere within half a unit either side. This gives an **upper bound** and a **lower bound**.",
      workedExamples: [
        { problem: "A length is 34 cm to the nearest cm. Find the bounds.", steps: ["Half a unit is 0.5 cm.", "Lower bound: 34 - 0.5 = 33.5 cm.", "Upper bound: 34 + 0.5 = 34.5 cm."], answer: "33.5 cm to 34.5 cm" }
      ],
      audioScript: "Rounded measurements hide a small range of possible true values — let's find the bounds."
    },
    {
      order: 2,
      title: "Laws of indices",
      concept: "Using the multiplication, division and power laws of indices",
      representation: "abstract",
      visualAid: "algebra-tile",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-2"],
      explanationMd:
        "When multiplying powers of the same base, **add** the indices. When dividing, **subtract** them. When raising a power to a power, **multiply** them.",
      workedExamples: [
        { problem: "3^4 x 3^2 = ?", steps: ["Same base, multiplying.", "Add the indices: 4 + 2 = 6."], answer: "3^6" },
        { problem: "(2^3)^2 = ?", steps: ["Power of a power.", "Multiply the indices: 3 x 2 = 6."], answer: "2^6" }
      ],
      audioScript: "Same base, multiplying: add the powers. Let's work through the index laws together."
    },
    {
      order: 3,
      title: "Standard form",
      concept: "Writing very large or very small numbers as A x 10^n",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-3"],
      explanationMd:
        "Standard form writes a number as A x 10^n, where A is between 1 and 10. This is a compact way to write very large or very small numbers.",
      workedExamples: [
        { problem: "Write 45,000 in standard form.", steps: ["Move the decimal point until one non-zero digit remains before it: 4.5.", "Count how many places it moved: 4.", "45,000 = 4.5 x 10^4."], answer: "4.5 x 10^4" }
      ],
      audioScript: "Standard form is a tidy way to write very big or very small numbers."
    },
    {
      order: 4,
      title: "Simplifying surds (Higher)",
      concept: "Simplifying square roots into the form a√b",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "mature",
      objectiveCodes: ["Y10-L1-4"],
      explanationMd:
        "A surd is a root that doesn't simplify to a whole number, like √12. We simplify by finding the largest square number that divides in.",
      workedExamples: [
        { problem: "Simplify √12.", steps: ["12 = 4 x 3, and 4 is a square number.", "√12 = √4 x √3 = 2√3."], answer: "2√3" }
      ],
      audioScript: "Look for the largest square factor hiding inside the surd."
    }
  ]
};
