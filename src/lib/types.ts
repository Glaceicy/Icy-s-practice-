export type AdultRole = "PARENT" | "TEACHER" | "ADMIN";
export type FontMode = "STANDARD" | "DYSLEXIC";
export type Pathway = "CORE" | "FOUNDATION" | "HIGHER";
export type ContentStatus = "SCAFFOLDED" | "COMPLETE";
export type PracticeMode = "GUIDED" | "INDEPENDENT" | "REVISION";
export type AssessmentStatusDb = "IN_PROGRESS" | "PAUSED" | "SUBMITTED";
export type MasteryStatus = "NOT_STARTED" | "DEVELOPING" | "SECURE" | "MASTERED";

export const AVATAR_KEYS = ["fox", "owl", "otter", "robot", "dragon", "panda", "astronaut", "unicorn"] as const;
export type AvatarKey = (typeof AVATAR_KEYS)[number];

export const MISCONCEPTION_LABELS: Record<string, string> = {
  OFF_BY_ONE_COUNT: "Counts one too many or too few",
  MISCOUNTS_SEQUENCE: "Loses track when counting in a sequence",
  MISCOUNTS_SKIP: "Miscounts when skip counting",
  SKIPS_OR_REPEATS_OBJECTS: "Skips or double-counts objects",
  NUMERAL_WORD_CONFUSION: "Confuses number words and numerals",
  COMPARISON_DIGIT_CONFUSION: "Compares digits in the wrong place-value column",
  PLACE_VALUE_COLUMN_SWAP: "Swaps tens and ones (or other place-value columns)",
  ADDITION_MISCOUNT: "Miscounts when adding",
  SUBTRACTION_MISCOUNT: "Miscounts when subtracting",
  NUMBER_BOND_RECALL: "Struggles to recall number bonds",
  GROUPING_SHARING_CONFUSION: "Confuses grouping and sharing division",
  FRACTION_UNEQUAL_PARTS: "Splits shapes/amounts into unequal parts",
  MONEY_COIN_VALUE_CONFUSION: "Confuses the value of different coins",
  CLOCK_HOUR_MINUTE_HAND_CONFUSION: "Confuses the hour and minute hands",
  MEASURE_COMPARISON_CONFUSION: "Struggles to compare measurements",
  SHAPE_NAME_CONFUSION: "Confuses the names of shapes",
  POSITION_LR_CONFUSION: "Confuses left/right or turn direction",
  ROUNDING_DIRECTION_ERROR: "Rounds in the wrong direction",
  NEGATIVE_ORDERING_ERROR: "Orders negative numbers incorrectly",
  NEGATIVE_SIGN_ERROR: "Makes sign errors with negative numbers",
  ORDER_OF_OPERATIONS_ERROR: "Applies operations in the wrong order",
  INDEX_LAW_ERROR: "Misapplies a law of indices",
  STANDARD_FORM_PLACEMENT_ERROR: "Misplaces the decimal point in standard form",
  SURD_SIMPLIFICATION_ERROR: "Simplifies surds incorrectly",
  BOUNDS_HALF_UNIT_ERROR: "Miscalculates upper/lower bounds"
};

export function misconceptionLabel(tag: string): string {
  return MISCONCEPTION_LABELS[tag] ?? tag.replace(/_/g, " ").toLowerCase();
}
