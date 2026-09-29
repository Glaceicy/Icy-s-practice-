export interface WorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface LessonContent {
  order: number;
  title: string;
  titleFr?: string;
  concept: string;
  conceptFr?: string;
  explanationMd: string;
  explanationMdFr?: string;
  representation: "concrete" | "pictorial" | "abstract" | "cpa";
  visualAid: string;
  workedExamples: WorkedExample[];
  workedExamplesFr?: WorkedExample[];
  audioScript: string;
  audioScriptFr?: string;
  ageBandStyle: "playful" | "adventure" | "gameinspired" | "mature";
  objectiveCodes: string[];
}
