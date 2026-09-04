export type KeyStage = "KS1" | "KS2" | "KS3" | "KS4";
export type ThemeStage = "playful" | "adventure" | "gameinspired" | "mature";
export type ContentStatus = "SCAFFOLDED" | "COMPLETE";
export type PathwayTag = "CORE" | "FOUNDATION" | "HIGHER" | null;

export interface ObjectiveDef {
  code: string; // e.g. "Y1-L3-1"
  description: string; // child-facing plain language
  dfeReference: string; // short citation into the KS1-4 programme of study
}

export interface LevelDef {
  levelNumber: number; // 1-10
  title: string;
  summary: string;
  isMixedMastery: boolean;
  status: ContentStatus;
  pathway: PathwayTag;
  objectives: ObjectiveDef[];
}

export interface SchoolYearDef {
  yearNumber: number; // 1-10
  title: string;
  keyStage: KeyStage;
  summary: string;
  minAge: number;
  maxAge: number;
  themeStage: ThemeStage;
  levels: LevelDef[];
}
