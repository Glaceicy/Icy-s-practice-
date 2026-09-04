export interface WorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface LessonContent {
  order: number;
  title: string;
  concept: string;
  explanationMd: string;
  representation: "concrete" | "pictorial" | "abstract" | "cpa";
  visualAid: string;
  workedExamples: WorkedExample[];
  audioScript: string;
  ageBandStyle: "playful" | "adventure" | "gameinspired" | "mature";
  objectiveCodes: string[];
}
