export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "NUMBER_ENTRY"
  | "MISSING_NUMBER"
  | "ORDERING"
  | "MATCHING"
  | "DRAG_DROP"
  | "NUMBER_LINE"
  | "VISUAL_COUNT"
  | "SHAPE_ID"
  | "CLOCK_READ"
  | "MONEY"
  | "WORD_PROBLEM"
  | "MULTI_STEP"
  | "TRUE_FALSE"
  | "GRAPH_INTERPRETATION"
  | "ALGEBRA"
  | "GEOMETRY"
  | "REASONING_EXPLAIN";

export type DifficultyBand = "FLUENCY" | "APPLICATION" | "REASONING";

export type PathwayTag = "CORE" | "FOUNDATION" | "HIGHER";

export interface VisualAid {
  kind:
    | "none"
    | "ten-frame"
    | "number-line"
    | "bar-model"
    | "array"
    | "counters"
    | "clock"
    | "coins"
    | "shape"
    | "fraction-diagram"
    | "coordinate-grid"
    | "graph"
    | "algebra-tile"
    | "probability-diagram";
  data: Record<string, unknown>;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

/** A fully-resolved, ready-to-render question instance. Every field here is
 * derived by deterministic arithmetic in code — never by an AI call — so the
 * `correctAnswer` is always the authoritative grading source of truth. */
export interface GeneratedQuestionInstance {
  templateKey: string;
  seed: number;
  type: QuestionType;
  difficulty: DifficultyBand;
  prompt: string;
  visualAid?: VisualAid;
  choices?: ChoiceOption[]; // for MULTIPLE_CHOICE / TRUE_FALSE / ORDERING / MATCHING
  correctAnswer: string; // canonical serialised answer (see questionEngine/answers.ts for format per type)
  acceptableAnswers?: string[]; // alternative accepted representations for NUMBER_ENTRY etc.
  explanationSteps: string[];
  hints: string[];
  misconceptionTag?: string;
}

export interface QuestionTemplateDef {
  key: string; // unique generator key, e.g. "y1l3.addWithin10.basic"
  levelKey: string; // "Y{year}L{level}", e.g. "Y1L3"
  objectiveCode: string;
  type: QuestionType;
  difficulty: DifficultyBand;
  misconceptionTags: string[];
  pathway?: PathwayTag; // undefined = applies to all pathways (CORE default level content)
  /** Declared size of the distinct-parameter variation space. Must be >= 150
   * per the question bank requirement; enforced by a unit test. */
  variationSpace: number;
  generate(seed: number): GeneratedQuestionInstance;
}
