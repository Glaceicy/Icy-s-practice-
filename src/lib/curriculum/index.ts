import type { SchoolYearDef } from "./types";
import { year1 } from "./year1";
import { year2 } from "./year2";
import { year3 } from "./year3";
import { year4 } from "./year4";
import { year5 } from "./year5";
import { year6 } from "./year6";
import { year7 } from "./year7";
import { year8 } from "./year8";
import { year9 } from "./year9";
import { year10 } from "./year10";

export const curriculum: SchoolYearDef[] = [
  year1, year2, year3, year4, year5, year6, year7, year8, year9, year10
];

export function getYear(yearNumber: number): SchoolYearDef | undefined {
  return curriculum.find((y) => y.yearNumber === yearNumber);
}

export function getLevel(yearNumber: number, levelNumber: number) {
  const year = getYear(yearNumber);
  return year?.levels.find((l) => l.levelNumber === levelNumber);
}

export function totalLevels(): number {
  return curriculum.reduce((sum, y) => sum + y.levels.length, 0);
}

export function nextLevelRef(yearNumber: number, levelNumber: number): { year: number; level: number } | null {
  if (levelNumber < 10) return { year: yearNumber, level: levelNumber + 1 };
  if (yearNumber < 10) return { year: yearNumber + 1, level: 1 };
  return null; // Year 10 Level 10 passed = programme complete
}

export * from "./types";
