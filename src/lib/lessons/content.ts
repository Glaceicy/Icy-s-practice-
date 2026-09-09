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
  Y5L1: [
    {
      order: 1,
      title: "Place value in six-digit numbers",
      concept: "Understanding hundred thousands, ten thousands and thousands in numbers up to 1,000,000",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L1-1"],
      explanationMd:
        "A six-digit number like 342,856 has **hundred thousands**, **ten thousands**, **thousands**, **hundreds**, **tens** and **ones** columns. Each column is worth ten times the one to its right.\n\n" +
        "To compare two large numbers, always start from the left — the column with the biggest value — and work across until the digits differ.",
      workedExamples: [
        { problem: "What is the value of the 4 in 342,856?", steps: ["The 4 is in the ten-thousands column.", "So it is worth 4 ten thousands, or 40,000."], answer: "40,000" },
        { problem: "Which is bigger, 458,120 or 458,999?", steps: ["Both start 458, so those columns match.", "Compare the next digit: 1 vs 9.", "9 is bigger."], answer: "458,999" }
      ],
      audioScript: "Big numbers are just more columns! Let's break a six-digit number down column by column."
    },
    {
      order: 2,
      title: "Rounding large numbers",
      concept: "Rounding any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 or 100,000",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L1-2"],
      explanationMd:
        "To round to a given accuracy, find the digit in the place just after the one you're rounding to. 5 or more rounds up; less than 5 rounds down — every digit after the rounding point becomes zero.\n\n" +
        "The bigger the number, the more it matters to round sensibly — rounding to the nearest 10,000 or 100,000 gives a quick, useful estimate.",
      workedExamples: [
        { problem: "Round 583,240 to the nearest 10,000.", steps: ["Look at the thousands digit: 3.", "3 is less than 5, so round down.", "The ten-thousands digit stays as 8."], answer: "580,000" },
        { problem: "Round 726,500 to the nearest 100,000.", steps: ["Look at the ten-thousands digit: 2.", "2 is less than 5, so round down."], answer: "700,000" }
      ],
      audioScript: "Rounding big numbers works exactly the same way as small ones — just find the right column to check."
    },
    {
      order: 3,
      title: "Negative numbers and counting through zero",
      concept: "Interpreting negative numbers in context and counting forwards and backwards across zero",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L1-3"],
      explanationMd:
        "Negative numbers show up in real life — temperatures below freezing, or floors below ground in a car park. On a number line, they sit to the left of zero.\n\n" +
        "When counting forwards or backwards through zero, remember there is no '-0' — counting up from -1 goes straight to 0, then 1.",
      workedExamples: [
        { problem: "The temperature was -3°C and rose by 5°C. What is it now?", steps: ["Start at -3.", "Count up 5: -2, -1, 0, 1, 2.", "Land on 2."], answer: "2°C" },
        { problem: "A lift is on floor 2 and goes down 5 floors. What floor is it on?", steps: ["Start at floor 2.", "Count down 5: 1, 0, -1, -2, -3.", "Land on floor -3 (3 floors below ground)."], answer: "-3" }
      ],
      audioScript: "Negative numbers aren't scary — they're just numbers below zero. Let's count through zero together."
    }
  ],
  Y5L2: [
    {
      order: 1,
      title: "Adding and subtracting large numbers",
      concept: "Using formal written (column) methods to add and subtract numbers with 5 or more digits",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L2-1"],
      explanationMd:
        "For numbers this big, line the digits up by place value in columns, then add or subtract starting from the ones column.\n\n" +
        "When a column adds up to 10 or more, **carry** the extra ten into the next column. When a digit is too small to subtract from, **exchange** (borrow) one from the column to its left.",
      workedExamples: [
        { problem: "34,782 + 18,946 = ?", steps: ["Add the ones: 2 + 6 = 8.", "Add the tens, hundreds, thousands and ten-thousands, carrying where needed."], answer: "53,728" },
        { problem: "62,150 - 27,483 = ?", steps: ["Subtract from the ones column, exchanging from the next column whenever a digit is too small."], answer: "34,667" }
      ],
      audioScript: "Big numbers, same method — line up the columns and work through them one at a time."
    },
    {
      order: 2,
      title: "Estimating with rounding",
      concept: "Rounding numbers before adding or subtracting to check whether an answer is reasonable",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L2-2"],
      explanationMd:
        "Before doing a big calculation, it helps to **estimate** the answer first by rounding each number, often to the nearest 1,000. If your exact answer is nowhere near your estimate, you know to check your working.",
      workedExamples: [
        { problem: "Estimate 4,832 + 2,957 by rounding to the nearest 1,000.", steps: ["4,832 rounds to 5,000.", "2,957 rounds to 3,000.", "5,000 + 3,000 = 8,000."], answer: "about 8,000" }
      ],
      audioScript: "Rounding first gives us a quick sense-check before working out the exact answer."
    },
    {
      order: 3,
      title: "Multi-step problems",
      concept: "Deciding which operations to use, and in which order, to solve a problem with more than one step",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L2-3"],
      explanationMd:
        "Some problems need more than one step — read carefully to work out what happens first, second, and so on. Working left to right through the problem usually keeps things clear.",
      workedExamples: [
        { problem: "A shop had £3,200. It earned £1,450, then spent £900 on stock. How much does it have now?", steps: ["£3,200 + £1,450 = £4,650.", "£4,650 - £900 = £3,750."], answer: "£3,750" }
      ],
      audioScript: "Break multi-step problems into small pieces, and solve them one step at a time."
    }
  ],
  Y5L3: [
    {
      order: 1,
      title: "Multiplying up to 4-digit numbers",
      concept: "Using a formal written method to multiply a 4-digit number by a 1- or 2-digit number",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L3-1"],
      explanationMd:
        "To multiply a big number by a two-digit number, split the two-digit number into tens and ones, multiply by each part separately, then add the results together.",
      workedExamples: [
        { problem: "2,345 x 23 = ?", steps: ["2,345 x 20 = 46,900.", "2,345 x 3 = 7,035.", "46,900 + 7,035 = 53,935."], answer: "53,935" }
      ],
      audioScript: "Splitting the multiplier into tens and ones turns one hard multiplication into two easier ones."
    },
    {
      order: 2,
      title: "Dividing with remainders",
      concept: "Dividing up to 4-digit numbers by a 1-digit number, and deciding what to do with a remainder",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L3-2"],
      explanationMd:
        "Not every division comes out exactly — sometimes there's an amount left over, called the **remainder**. What you do with a remainder depends on the question: sometimes you round up (you need one more of something), sometimes you round down (a partly-full group doesn't count), and sometimes the remainder itself is the answer.",
      workedExamples: [
        { problem: "138 pupils are going on a trip. Each minibus holds 25 pupils. How many minibuses are needed?", steps: ["138 ÷ 25 = 5 remainder 13.", "13 pupils still need seats, so one more minibus is needed."], answer: "6 minibuses" },
        { problem: "A baker has 138 eggs and puts 25 in each box. How many full boxes can be made?", steps: ["138 ÷ 25 = 5 remainder 13.", "The 13 leftover eggs can't make another full box."], answer: "5 full boxes" }
      ],
      audioScript: "Always read the question carefully to decide whether to round the remainder up, round it down, or use it directly."
    },
    {
      order: 3,
      title: "Multiplying and dividing by 10, 100 and 1,000",
      concept: "Understanding how digits shift place value columns when multiplying or dividing by powers of 10",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L3-3"],
      explanationMd:
        "Multiplying by 10 shifts every digit one column to the left; by 100, two columns; by 1,000, three columns. Dividing does the reverse, shifting digits to the right.\n\n" +
        "The digits themselves don't change — only their place value does.",
      workedExamples: [
        { problem: "34 x 100 = ?", steps: ["Shift every digit two columns to the left.", "34 becomes 3,400."], answer: "3,400" },
        { problem: "5,600 ÷ 100 = ?", steps: ["Shift every digit two columns to the right.", "5,600 becomes 56."], answer: "56" }
      ],
      audioScript: "Watch how the digits slide across the columns when we multiply or divide by 10, 100 or 1,000."
    }
  ],
  Y5L4: [
    {
      order: 1,
      title: "Factors and multiples",
      concept: "Finding factor pairs of a number and identifying multiples",
      representation: "abstract",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L4-1"],
      explanationMd:
        "A **factor** of a number divides into it exactly, with nothing left over. A **multiple** of a number is what you get when you count up in steps of that number — the results of its times table.\n\n" +
        "Numbers often have several factors, arranged in **factor pairs** that multiply together to make the original number.",
      workedExamples: [
        { problem: "Find all the factor pairs of 24.", steps: ["1 x 24", "2 x 12", "3 x 8", "4 x 6"], answer: "1&24, 2&12, 3&8, 4&6" },
        { problem: "Is 45 a multiple of 9?", steps: ["45 ÷ 9 = 5, with no remainder."], answer: "Yes" }
      ],
      audioScript: "Factors divide in exactly; multiples are what you land on when you count up in steps."
    },
    {
      order: 2,
      title: "Prime and composite numbers",
      concept: "Establishing whether a number up to 100 is prime",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L4-2"],
      explanationMd:
        "A **prime number** has exactly two factors: 1 and itself. A **composite number** has more than two factors. Remember — 1 itself is neither prime nor composite!\n\n" +
        "To check if a number is prime, try dividing it by every whole number from 2 up to its square root. If none divide in exactly, it's prime.",
      workedExamples: [
        { problem: "Is 29 prime?", steps: ["Try dividing by 2, 3, 5 (up to √29 ≈ 5.4).", "None divide in exactly."], answer: "Yes, 29 is prime" },
        { problem: "Is 51 prime?", steps: ["51 ÷ 3 = 17, exactly.", "51 has factors other than 1 and itself."], answer: "No, 51 is composite" }
      ],
      audioScript: "Every prime number has exactly two factors. Let's practise spotting them up to 100."
    },
    {
      order: 3,
      title: "Square and cube numbers",
      concept: "Recognising and calculating square numbers (n²) and cube numbers (n³)",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L4-3"],
      explanationMd:
        "A **square number** comes from multiplying a whole number by itself, written with a small 2 (e.g. 5² = 5 x 5 = 25). A **cube number** comes from multiplying a whole number by itself twice more, written with a small 3 (e.g. 5³ = 5 x 5 x 5 = 125).\n\n" +
        "Square numbers can be arranged into a square array; cube numbers into a cube shape.",
      workedExamples: [
        { problem: "What is 6²?", steps: ["6 x 6 = 36."], answer: "36" },
        { problem: "What is 4³?", steps: ["4 x 4 = 16.", "16 x 4 = 64."], answer: "64" }
      ],
      audioScript: "Squaring multiplies a number by itself once; cubing multiplies it by itself twice."
    }
  ],
  Y5L5: [
    {
      order: 1,
      title: "Comparing and ordering fractions",
      concept: "Comparing fractions with the same or related denominators",
      representation: "pictorial",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L5-1"],
      explanationMd:
        "When two fractions have the **same denominator**, just compare their numerators — the bigger numerator makes the bigger fraction.\n\n" +
        "When denominators are related (one is a multiple of the other), first convert them to the same denominator by multiplying the numerator and denominator by the same amount, then compare.",
      workedExamples: [
        { problem: "Which is bigger, 3/8 or 5/8?", steps: ["Same denominator, so compare numerators.", "5 > 3."], answer: "5/8" },
        { problem: "Which is bigger, 1/4 or 3/8?", steps: ["Convert 1/4 to eighths: 1/4 = 2/8.", "Compare 2/8 and 3/8.", "3 > 2."], answer: "3/8" }
      ],
      audioScript: "Same denominator? Just compare the numerators. Different denominator? Convert first, then compare."
    },
    {
      order: 2,
      title: "Adding and subtracting fractions",
      concept: "Adding and subtracting fractions with the same denominator, including mixed numbers",
      representation: "abstract",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L5-2"],
      explanationMd:
        "When fractions share a denominator, add or subtract just the numerators — the denominator stays the same.\n\n" +
        "For mixed numbers, convert each one to an **improper fraction** first (multiply the whole number by the denominator, then add the numerator), then add or subtract as normal.",
      workedExamples: [
        { problem: "2/5 + 1/5 = ?", steps: ["Add the numerators: 2 + 1 = 3.", "Keep the denominator: 5."], answer: "3/5" },
        { problem: "1 1/4 + 2 2/4 = ?", steps: ["Convert: 1 1/4 = 5/4, 2 2/4 = 10/4.", "Add: 5 + 10 = 15."], answer: "15/4" }
      ],
      audioScript: "The denominator tells us the size of the pieces — it doesn't change when we add or subtract."
    },
    {
      order: 3,
      title: "Multiplying fractions by whole numbers",
      concept: "Multiplying proper fractions and mixed numbers by a whole number",
      representation: "abstract",
      visualAid: "fraction-diagram",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L5-3"],
      explanationMd:
        "To multiply a fraction by a whole number, multiply just the **numerator** by that whole number — the denominator stays the same.\n\n" +
        "For a mixed number, convert it to an improper fraction first, then multiply.",
      workedExamples: [
        { problem: "2/5 x 3 = ?", steps: ["Multiply the numerator: 2 x 3 = 6.", "Keep the denominator: 5."], answer: "6/5" },
        { problem: "1 1/2 x 4 = ?", steps: ["Convert: 1 1/2 = 3/2.", "Multiply: 3 x 4 = 12."], answer: "12/2" }
      ],
      audioScript: "Multiplying a fraction by a whole number only changes the numerator."
    }
  ],
  Y5L6: [
    {
      order: 1,
      title: "Reading and comparing decimals",
      concept: "Reading, writing, ordering and comparing decimals with up to three decimal places",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L6-1"],
      explanationMd:
        "A decimal like 3.482 has tenths, hundredths and thousandths columns after the decimal point — each one worth ten times less than the one before it.\n\n" +
        "**Watch out:** more decimal digits doesn't mean a bigger number! 0.4 is actually bigger than 0.25, even though 0.25 has more digits — write both with the same number of decimal places (0.40 vs 0.25) to compare fairly.",
      workedExamples: [
        { problem: "Which is bigger, 0.4 or 0.25?", steps: ["Write 0.4 with two decimal places: 0.40.", "Compare 0.40 and 0.25.", "40 is bigger than 25."], answer: "0.4" },
        { problem: "What is the hundredths digit in 5.638?", steps: ["The digits after the point are tenths (6), hundredths (3), thousandths (8)."], answer: "3" }
      ],
      audioScript: "More digits after the point doesn't mean a bigger number — always line up the decimal places before comparing."
    },
    {
      order: 2,
      title: "Percentages as parts per hundred",
      concept: "Understanding the % symbol as meaning 'out of 100'",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L6-2"],
      explanationMd:
        "The **%** symbol always means **'out of 100'**. If a 100-square grid has 60 squares shaded, that's 60%, or 60/100.\n\n" +
        "Some percentages simplify to easy fractions: 50% = 1/2, 25% = 1/4, 10% = 1/10.",
      workedExamples: [
        { problem: "A survey of 100 people found 35 like tea best. What percentage is that?", steps: ["35 out of 100 is 35%."], answer: "35%" },
        { problem: "Write 25% as a fraction in its simplest form.", steps: ["25% = 25/100.", "Divide top and bottom by 25.", "25/100 = 1/4."], answer: "1/4" }
      ],
      audioScript: "Per cent always means out of 100 — that's the easiest way to remember what the % symbol is telling you."
    },
    {
      order: 3,
      title: "Rounding decimals",
      concept: "Rounding a decimal with two decimal places to the nearest whole number or one decimal place",
      representation: "abstract",
      visualAid: "number-line",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L6-3"],
      explanationMd:
        "To round a decimal, find the digit just after the place you're rounding to. 5 or more rounds up; less than 5 rounds down.\n\n" +
        "Rounding to the nearest whole number: check the tenths digit. Rounding to one decimal place: check the hundredths digit.",
      workedExamples: [
        { problem: "Round 4.67 to the nearest whole number.", steps: ["Look at the tenths digit: 6.", "6 is 5 or more, so round up."], answer: "5" },
        { problem: "Round 4.67 to one decimal place.", steps: ["Look at the hundredths digit: 7.", "7 is 5 or more, so round the tenths digit up."], answer: "4.7" }
      ],
      audioScript: "Rounding decimals works just like rounding whole numbers — just check the right digit."
    }
  ],
  Y5L7: [
    {
      order: 1,
      title: "Area and perimeter of rectangles",
      concept: "Calculating the area and perimeter of rectangles, and estimating the area of irregular shapes",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L7-1"],
      explanationMd:
        "**Area** measures the amount of surface a shape covers, in square units (like m²). For a rectangle: area = length x width.\n\n" +
        "**Perimeter** measures the distance all the way around the outside, in units (like m). For a rectangle: perimeter = 2 x (length + width).\n\n" +
        "For an irregular (L-shaped) area, split it into rectangles, find each area, then add them together.",
      workedExamples: [
        { problem: "A rectangle is 6 m by 4 m. Find its area and perimeter.", steps: ["Area = 6 x 4 = 24 m².", "Perimeter = 2 x (6 + 4) = 20 m."], answer: "Area 24 m², perimeter 20 m" }
      ],
      audioScript: "Area covers the inside of a shape; perimeter measures the distance around the outside."
    },
    {
      order: 2,
      title: "Volume and capacity",
      concept: "Estimating volume using unit cubes and estimating everyday capacities",
      representation: "concrete",
      visualAid: "array",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L7-2"],
      explanationMd:
        "**Volume** measures how much space a 3D shape takes up, in cubic units (like cm³). For a cuboid: volume = length x width x height.\n\n" +
        "**Capacity** measures how much a container can hold, usually in millilitres (ml) or litres (l). Knowing everyday capacities (a teaspoon holds about 5 ml, a kettle about 1.5 l) helps you estimate sensibly.",
      workedExamples: [
        { problem: "A cuboid box is 5 cm by 3 cm by 2 cm. What is its volume?", steps: ["Volume = 5 x 3 x 2 = 30 cm³."], answer: "30 cm³" }
      ],
      audioScript: "Volume is like area but for 3D shapes — multiply all three dimensions together."
    },
    {
      order: 3,
      title: "Converting metric units",
      concept: "Converting between millimetres, centimetres, metres and kilometres, and between grams/kilograms and litres/millilitres",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L7-3"],
      explanationMd:
        "Metric units are all connected by powers of 10: 10 mm = 1 cm, 100 cm = 1 m, 1,000 m = 1 km, 1,000 g = 1 kg, 1,000 ml = 1 l.\n\n" +
        "To convert to a smaller unit, multiply. To convert to a bigger unit, divide.",
      workedExamples: [
        { problem: "Convert 350 cm to m.", steps: ["100 cm = 1 m.", "350 ÷ 100 = 3.5."], answer: "3.5 m" },
        { problem: "Convert 2 kg to g.", steps: ["1 kg = 1,000 g.", "2 x 1,000 = 2,000."], answer: "2,000 g" }
      ],
      audioScript: "Going to a smaller unit means multiplying; going to a bigger unit means dividing."
    }
  ],
  Y5L8: [
    {
      order: 1,
      title: "Types of angle",
      concept: "Measuring angles in degrees and classifying them as acute, right, obtuse or reflex",
      representation: "pictorial",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L8-1"],
      explanationMd:
        "Angles are measured in **degrees** (°). A full turn is 360°.\n\n" +
        "**Acute**: less than 90°. **Right angle**: exactly 90°. **Obtuse**: between 90° and 180°. **Reflex**: more than 180°.\n\n" +
        "Angles on a straight line always add up to 180°; angles around a point always add up to 360°.",
      workedExamples: [
        { problem: "What type of angle is 130°?", steps: ["130° is between 90° and 180°."], answer: "Obtuse" },
        { problem: "Two angles on a straight line are 65° and ___°.", steps: ["180 - 65 = 115."], answer: "115°" }
      ],
      audioScript: "Acute is small and sharp, obtuse is wide, and reflex is more than a straight line."
    },
    {
      order: 2,
      title: "Reflection and translation",
      concept: "Describing and finding the new position of a point after a translation or reflection",
      representation: "pictorial",
      visualAid: "coordinate-grid",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L8-2"],
      explanationMd:
        "A **translation** slides a point without turning or flipping it — moving right/left changes the x-coordinate, moving up/down changes the y-coordinate.\n\n" +
        "A **reflection** flips a point across a mirror line. Reflecting in a vertical line only changes the x-coordinate; reflecting in a horizontal line only changes the y-coordinate. The mirror line is always the same distance from the point and its reflection.",
      workedExamples: [
        { problem: "Point (2, 3) is translated 4 right and 1 up.", steps: ["x: 2 + 4 = 6.", "y: 3 + 1 = 4."], answer: "(6, 4)" },
        { problem: "Point (1, 5) is reflected in the vertical line x = 4.", steps: ["The point is 3 to the left of the line.", "The reflection is 3 to the right of the line: 4 + 3 = 7.", "The y-coordinate stays the same."], answer: "(7, 5)" }
      ],
      audioScript: "Translating slides a point; reflecting flips it across a mirror line, the same distance on the other side."
    },
    {
      order: 3,
      title: "Properties of rectangles",
      concept: "Using the properties of a rectangle (opposite sides equal, all angles 90°) to find missing lengths and angles",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L8-3"],
      explanationMd:
        "A rectangle always has **opposite sides equal in length** and **all four angles equal to 90°**. Knowing this lets you work out missing measurements without needing to see the whole shape.\n\n" +
        "The angles inside any four-sided shape always add up to 360°.",
      workedExamples: [
        { problem: "A rectangle has a perimeter of 30 cm and one side of 8 cm. What is the adjacent side?", steps: ["Half the perimeter = 15 cm.", "15 - 8 = 7 cm."], answer: "7 cm" }
      ],
      audioScript: "Once you know one side and one angle of a rectangle, the properties tell you the rest."
    }
  ],
  Y5L9: [
    {
      order: 1,
      title: "Reading line graphs",
      concept: "Solving comparison, sum and difference problems using a line graph",
      representation: "pictorial",
      visualAid: "graph",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L9-1"],
      explanationMd:
        "A line graph shows how a value changes — read the point for each label to find its value, then compare, add or subtract as the question asks.\n\n" +
        "The **range** is the difference between the highest and lowest values on the graph.",
      workedExamples: [
        { problem: "A graph shows 12 books on Monday and 18 on Tuesday. How many more on Tuesday?", steps: ["18 - 12 = 6."], answer: "6 more" }
      ],
      audioScript: "Find each point on the graph, read its value, then work out what the question is asking."
    },
    {
      order: 2,
      title: "Tables and timetables",
      concept: "Reading and interpreting information from tables, including bus and train timetables",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L9-2"],
      explanationMd:
        "A table organises information into rows and columns. A timetable is a special kind of table showing times — find the row or column that matches what you're looking for.\n\n" +
        "To find the next departure after a certain time, look for the first time in the list that is later than your arrival time.",
      workedExamples: [
        { problem: "A bus timetable shows 09:15, 09:45, 10:15. You arrive at 09:20. What's the next bus?", steps: ["09:15 has already gone.", "The next one after 09:20 is 09:45."], answer: "09:45" }
      ],
      audioScript: "Scan along the table until you find the row or time that answers the question."
    },
    {
      order: 3,
      title: "24-hour clock durations",
      concept: "Calculating how long a journey takes using 24-hour clock times",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L9-3"],
      explanationMd:
        "The 24-hour clock counts hours from 00:00 (midnight) to 23:59, avoiding the need for am/pm. To find a duration, count the minutes from the start time to the end time.\n\n" +
        "To add a duration to a time, add the minutes and carry over into hours once you reach 60.",
      workedExamples: [
        { problem: "A train leaves at 14:35 and the journey takes 50 minutes. What time does it arrive?", steps: ["14:35 + 25 minutes = 15:00.", "15:00 + 25 more minutes = 15:25."], answer: "15:25" }
      ],
      audioScript: "Break a duration into steps if it helps — get to the next whole hour first, then add what's left."
    }
  ],
  Y5L10: [
    {
      order: 1,
      title: "Number review: place value, negatives and the four operations",
      concept: "Bringing together place value, negative numbers, and formal addition/subtraction/multiplication/division with large numbers",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L10-1"],
      explanationMd:
        "This level pulls together everything from Year 5's number work: reading and comparing numbers to 1,000,000, working with negative numbers, and using formal written methods for all four operations.\n\n" +
        "When in doubt, go back to the basics: compare digit by digit from the left, remember negative numbers count down through zero, and line up place value columns carefully for column methods.",
      workedExamples: [
        { problem: "Round 583,240 to the nearest 10,000.", steps: ["Look at the thousands digit: 3.", "Round down."], answer: "580,000" }
      ],
      audioScript: "Everything from this term's number work comes together here — take your time and use the methods you've practised."
    },
    {
      order: 2,
      title: "Review: factors, fractions, decimals and percentages",
      concept: "Applying factors, multiples, primes, fractions, decimals and percentages together",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L10-2"],
      explanationMd:
        "This level mixes questions on factors and multiples, prime numbers, square numbers, comparing and adding fractions, comparing and rounding decimals, and percentages as parts per hundred.\n\n" +
        "Remember the key links: a percentage is just a fraction out of 100, and decimals are fractions written using place value columns.",
      workedExamples: [
        { problem: "Is 51 prime?", steps: ["51 ÷ 3 = 17, exactly.", "It has factors other than 1 and itself."], answer: "No, 51 is composite" }
      ],
      audioScript: "Fractions, decimals and percentages are all closely connected — use whichever way of thinking helps most."
    },
    {
      order: 3,
      title: "Review: measurement, geometry and statistics",
      concept: "Applying area, volume, unit conversion, angles, coordinate transformations and graph/table reading",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "adventure",
      objectiveCodes: ["Y5-L10-3"],
      explanationMd:
        "This level mixes questions on the area and volume of rectangles/cuboids, converting between metric units, classifying angles, translating points on a grid, and reading line graphs, tables and timetables.\n\n" +
        "For any measurement or geometry question, think about which formula or property applies before calculating.",
      workedExamples: [
        { problem: "A cuboid is 4 cm by 3 cm by 5 cm. What is its volume?", steps: ["4 x 3 x 5 = 60."], answer: "60 cm³" }
      ],
      audioScript: "This is your chance to show everything you've learned about shapes, measures and data this year."
    }
  ],
  Y2L1: [
    {
      order: 1,
      title: "Tens and ones",
      concept: "Understanding that a two-digit number is made of tens and ones",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L1-1"],
      explanationMd:
        "Every two-digit number has a **tens digit** (the first digit) and a **ones digit** (the second digit). For example, 47 has 4 tens and 7 ones.\n\n" +
        "You can build any two-digit number by counting groups of ten, then adding the leftover ones.",
      workedExamples: [
        { problem: "How many tens and ones make 63?", steps: ["6 groups of ten = 60.", "3 left over."], answer: "6 tens, 3 ones" }
      ],
      audioScript: "The first digit tells us the tens, the second digit tells us the ones."
    },
    {
      order: 2,
      title: "Comparing with <, > and =",
      concept: "Using the symbols < (less than), > (greater than) and = (equal to) to compare numbers",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L1-2"],
      explanationMd:
        "The **<** symbol means 'is less than' and **>** means 'is greater than' — the symbol always points at the smaller number.\n\n" +
        "To compare two numbers, look at the tens digit first. If the tens match, compare the ones digit.",
      workedExamples: [
        { problem: "Which symbol goes here: 34 ___ 52?", steps: ["3 tens is less than 5 tens."], answer: "<" },
        { problem: "Which symbol goes here: 78 ___ 78?", steps: ["Both numbers are the same."], answer: "=" }
      ],
      audioScript: "The symbol always points towards the smaller number, like a hungry alligator eating the bigger one!"
    },
    {
      order: 3,
      title: "Counting in steps",
      concept: "Counting forwards in steps of 2, 3, 5 and 10 from any starting number",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L1-3"],
      explanationMd:
        "You don't have to start counting in steps from zero — you can count in 2s, 3s, 5s or 10s starting from **any** number.\n\n" +
        "When counting in 10s, only the tens digit changes each time; the ones digit stays the same.",
      workedExamples: [
        { problem: "Count on in 3s from 8: 8, ___, ___, ___", steps: ["8 + 3 = 11.", "11 + 3 = 14.", "14 + 3 = 17."], answer: "11, 14, 17" },
        { problem: "What is 47 + 10?", steps: ["Only the tens digit changes: 4 becomes 5."], answer: "57" }
      ],
      audioScript: "You can start a counting pattern from any number — just keep adding the same step size each time."
    }
  ],
  Y2L2: [
    {
      order: 1,
      title: "Number facts to 20",
      concept: "Recalling addition and subtraction facts to 20 fluently",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L2-1"],
      explanationMd:
        "Knowing your number facts to 20 by heart — without having to count on your fingers — helps everything else in maths feel quicker and easier.\n\n" +
        "**Number bonds to 20** are pairs of numbers that add together to make 20, like 12 and 8, or 15 and 5.",
      workedExamples: [
        { problem: "What number bonds with 13 to make 20?", steps: ["20 - 13 = 7."], answer: "7" }
      ],
      audioScript: "The more of these facts you know instantly, the faster and more confident you'll be with bigger numbers."
    },
    {
      order: 2,
      title: "Related facts",
      concept: "Using a known fact (like 7+3=10) to work out a related fact (like 70+30=100)",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L2-2"],
      explanationMd:
        "If you know a small number fact, you can use it to work out a much bigger one instantly! If 7 + 3 = 10, then 70 + 30 = 100 — the digits are exactly the same, just ten times bigger.\n\n" +
        "This works for subtraction too: if 9 - 4 = 5, then 90 - 40 = 50.",
      workedExamples: [
        { problem: "If 6 + 4 = 10, what is 60 + 40?", steps: ["Same digits, ten times bigger."], answer: "100" }
      ],
      audioScript: "Spot the small fact hiding inside the big one, and the big calculation becomes easy."
    },
    {
      order: 3,
      title: "Using a number line to add and subtract",
      concept: "Adding and subtracting mentally by picturing jumps on a number line",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L2-3"],
      explanationMd:
        "A number line helps you add or subtract in your head. To add, jump forwards. To subtract, jump backwards.\n\n" +
        "A useful trick is **bridging through 10**: split your jump into two parts — first jump to the next multiple of 10, then jump the rest of the way.",
      workedExamples: [
        { problem: "8 + 5 using bridging: 8 + 2 = 10, then 10 + 3 = ?", steps: ["8 + 2 = 10.", "10 + 3 = 13."], answer: "13" }
      ],
      audioScript: "Picture the number line in your head — jump to a friendly multiple of 10 first, then finish the jump."
    }
  ],
  Y2L3: [
    {
      order: 1,
      title: "Adding a two-digit number and ones",
      concept: "Adding a single-digit number of ones onto a two-digit number",
      representation: "pictorial",
      visualAid: "number-line",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L3-1"],
      explanationMd:
        "When you add ones onto a two-digit number, only the ones digit changes (unless it goes past a multiple of ten).\n\n" +
        "You can picture this as a small jump forwards on a number line, starting from the two-digit number.",
      workedExamples: [
        { problem: "What is 34 + 5?", steps: ["Keep the 3 tens.", "4 ones + 5 ones = 9 ones."], answer: "39" }
      ],
      audioScript: "Adding a few ones is just a small hop forward — the tens digit usually stays exactly the same."
    },
    {
      order: 2,
      title: "Adding and subtracting two two-digit numbers",
      concept: "Adding or subtracting two two-digit numbers by working with tens and ones separately",
      representation: "concrete",
      visualAid: "ten-frame",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L3-2"],
      explanationMd:
        "To add two two-digit numbers, add the tens together, then add the ones together, then combine the two totals.\n\n" +
        "Subtracting works the same way — but always start with the bigger number.",
      workedExamples: [
        { problem: "What is 34 + 25?", steps: ["30 + 20 = 50.", "4 + 5 = 9.", "50 + 9 = 59."], answer: "59" },
        { problem: "What is 68 - 23?", steps: ["60 - 20 = 40.", "8 - 3 = 5.", "40 + 5 = 45."], answer: "45" }
      ],
      audioScript: "Split each number into its tens and ones, work with each part separately, then put your answer back together."
    },
    {
      order: 3,
      title: "Two-step word problems",
      concept: "Solving word problems that need two additions/subtractions to reach the answer",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L3-3"],
      explanationMd:
        "Some word problems need **two steps** to solve. Read carefully to work out what happens first, and what happens second.\n\n" +
        "It often helps to work out the answer after the first step before moving on to the second step.",
      workedExamples: [
        { problem: "Amy has 20 stickers. She gets 15 more, then gives away 8. How many does she have now?", steps: ["20 + 15 = 35.", "35 - 8 = 27."], answer: "27" }
      ],
      audioScript: "Break a two-step problem into two smaller, one-step problems, and solve them one at a time."
    }
  ],
  Y2L4: [
    {
      order: 1,
      title: "The 2, 5 and 10 times tables",
      concept: "Recalling multiplication facts for the 2, 5 and 10 times tables",
      representation: "abstract",
      visualAid: "none",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L4-1"],
      explanationMd:
        "The **2 times table** is just doubling. The **10 times table** is the number with a zero on the end. The **5 times table** always ends in 0 or 5.\n\n" +
        "The more of these facts you know instantly, the quicker you'll be at multiplying and dividing.",
      workedExamples: [
        { problem: "What is 6 x 5?", steps: ["Half of 6 x 10 = 60.", "Half of 60 is 30."], answer: "30" }
      ],
      audioScript: "Doubling, adding a zero, and counting in fives — three quick tricks for these three tables."
    },
    {
      order: 2,
      title: "Multiplication as an array",
      concept: "Representing a multiplication fact as rows and columns of objects",
      representation: "pictorial",
      visualAid: "array",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L4-2"],
      explanationMd:
        "An **array** is objects arranged in equal rows and columns. Counting the rows and how many are in each row shows you the multiplication fact.\n\n" +
        "For example, 4 rows of 5 dots is the same as 4 x 5 = 20.",
      workedExamples: [
        { problem: "An array has 3 rows of 5. How many altogether?", steps: ["3 rows x 5 in each row."], answer: "15" }
      ],
      audioScript: "Rows go across, and each row has the same number in it — count the rows, then multiply."
    },
    {
      order: 3,
      title: "Dividing by sharing and grouping",
      concept: "Solving division problems by sharing into equal groups, or by making groups of a fixed size",
      representation: "concrete",
      visualAid: "counters",
      ageBandStyle: "playful",
      objectiveCodes: ["Y2-L4-3"],
      explanationMd:
        "**Sharing** means splitting a total equally between a number of people, one at a time, to find how many each person gets.\n\n" +
        "**Grouping** means finding how many equal-sized groups fit into a total. Both are division, just thought about in two different ways.",
      workedExamples: [
        { problem: "20 stickers are shared equally between 5 friends. How many does each friend get?", steps: ["20 ÷ 5 = 4."], answer: "4" },
        { problem: "20 stickers are put into groups of 5. How many groups are there?", steps: ["20 ÷ 5 = 4 groups."], answer: "4" }
      ],
      audioScript: "Sharing asks 'how many each?'. Grouping asks 'how many groups?'. Both use the same division fact."
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
