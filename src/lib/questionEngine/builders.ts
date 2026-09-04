import { Rng, seedFor } from "./rng";
import type {
  ChoiceOption,
  DifficultyBand,
  GeneratedQuestionInstance,
  PathwayTag,
  QuestionTemplateDef,
  QuestionType,
  VisualAid
} from "./types";

/** Format an amount of pence as UK currency text, e.g. 5 -> "5p", 250 -> "£2.50". */
export function formatMoney(pence: number): string {
  if (pence < 100) return `${pence}p`;
  const pounds = Math.floor(pence / 100);
  const rem = pence % 100;
  return `£${pounds}.${rem.toString().padStart(2, "0")}`;
}

export function formatClock(hour24: number, minute: number): string {
  const h = ((hour24 + 11) % 12) + 1;
  return `${h}:${minute.toString().padStart(2, "0")}`;
}

/** Repeatedly sample operand values until `constraint` is satisfied (or give up). */
export function pickValues(rng: Rng, ranges: Array<[number, number]>, constraint?: (values: number[]) => boolean): number[] {
  for (let attempt = 0; attempt < 200; attempt++) {
    const values = ranges.map(([lo, hi]) => rng.int(lo, hi));
    if (!constraint || constraint(values)) return values;
  }
  // Fall back to the unconstrained draw so generation never hangs; templates
  // should design ranges/constraints that succeed well within 200 tries.
  return ranges.map(([lo, hi]) => rng.int(lo, hi));
}

export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = values[key];
    return v === undefined ? `{${key}}` : String(v);
  });
}

/** Build shuffled multiple-choice options from a correct value and distractors.
 * Returns the choices plus the id of the correct option (position is randomised
 * per-seed so the correct answer is never in a fixed slot). */
export function buildChoices(
  rng: Rng,
  correctLabel: string,
  distractorLabels: string[]
): { choices: ChoiceOption[]; correctId: string } {
  const uniqueDistractors = Array.from(new Set(distractorLabels.filter((d) => d !== correctLabel)));
  const pool = [correctLabel, ...uniqueDistractors].slice(0, 4);
  while (pool.length < 4 && uniqueDistractors.length === 0) break; // guard, callers should supply enough distractors
  const shuffled = rng.shuffle(pool);
  const choices = shuffled.map((label, i) => ({ id: `opt${i}`, label }));
  const correctChoice = choices.find((c) => c.label === correctLabel);
  if (!correctChoice) throw new Error("buildChoices: correct label lost during shuffle");
  return { choices, correctId: correctChoice.id };
}

/** Generate a numeric distractor set spread around the correct answer, avoiding
 * duplicates and negative values unless explicitly allowed. */
export function numericDistractors(
  rng: Rng,
  correct: number,
  count: number,
  spread: number,
  opts: { allowNegative?: boolean; minValue?: number } = {}
): number[] {
  const out = new Set<number>();
  let guard = 0;
  while (out.size < count && guard < 200) {
    guard++;
    const delta = rng.int(-spread, spread) || (rng.chance(0.5) ? 1 : -1);
    let candidate = correct + delta;
    if (!opts.allowNegative && candidate < (opts.minValue ?? 0)) candidate = correct + Math.abs(delta);
    if (candidate !== correct) out.add(candidate);
  }
  return Array.from(out).slice(0, count);
}

export interface ArithmeticTemplateOptions {
  key: string;
  levelKey: string;
  objectiveCode: string;
  difficulty: DifficultyBand;
  misconceptionTags: string[];
  pathway?: PathwayTag;
  // The grading behaviour has three shapes: MULTIPLE_CHOICE and TRUE_FALSE
  // grade against a chosen choice id; MISSING_NUMBER/NUMBER_ENTRY and every
  // other listed type grade a computed numeric/text result. Types such as
  // WORD_PROBLEM, MULTI_STEP, MONEY, CLOCK_READ, NUMBER_LINE and VISUAL_COUNT
  // differ from NUMBER_ENTRY only in presentation (which visual aid wraps the
  // prompt) and are tagged here purely so the UI renders the right component.
  type: QuestionType;
  ranges: Array<[number, number]>;
  constraint?: (values: number[]) => boolean;
  compute: (values: number[]) => number;
  promptTemplates: string[]; // use {a} {b} {c}... {ctx} and {result}; multiple entries add phrasing variety
  /** Optional pool of interchangeable nouns/contexts (e.g. "stars", "sweets")
   * substituted into {ctx} — multiplies the variation space without changing
   * the underlying maths. */
  contextPool?: string[];
  /** Extra prompt variables computed deterministically from `values`/`result`
   * (e.g. a sequence's second and third displayed terms). Runs after the
   * automatic a/b/c.../ctx assignment, so keys here can override them. */
  derive?: (values: number[], result: number) => Record<string, string | number>;
  explain: (values: number[], result: number) => string[];
  hints: (values: number[], result: number) => string[];
  visualAid?: (values: number[], result: number) => VisualAid | undefined;
  formatValue?: (n: number) => string;
  distractorSpread?: number; // for MULTIPLE_CHOICE
  falseStatementRate?: number; // for TRUE_FALSE: probability the shown statement is false
  declaredVariationSpace: number;
}

const letters = ["a", "b", "c", "d", "e"];

/** A generic, DRY generator for fluency/application arithmetic-style questions
 * (addition, subtraction, multiplication, division, comparisons, conversions,
 * money, measurement, etc). Encapsulates seeding, value sampling, phrasing
 * variety, distractor generation and answer formatting so individual question
 * templates stay a short declarative config rather than bespoke code. */
export function arithmeticTemplate(opts: ArithmeticTemplateOptions): QuestionTemplateDef {
  const fmt = opts.formatValue ?? ((n: number) => String(n));

  function build(seed: number): GeneratedQuestionInstance {
    const rng = new Rng(seed);
    const values = pickValues(rng, opts.ranges, opts.constraint);
    const result = opts.compute(values);
    const varMap: Record<string, string | number> = { result: fmt(result) };
    values.forEach((v, i) => {
      const letter = letters[i] ?? `v${i}`;
      varMap[letter] = fmt(v);
    });
    if (opts.contextPool && opts.contextPool.length > 0) {
      varMap.ctx = rng.pick(opts.contextPool);
    }
    if (opts.derive) {
      Object.assign(varMap, opts.derive(values, result));
    }
    const promptTemplate = rng.pick(opts.promptTemplates);
    const prompt = fillTemplate(promptTemplate, varMap);
    const explanationSteps = opts.explain(values, result);
    const hints = opts.hints(values, result);
    const visualAid = opts.visualAid?.(values, result);
    const misconceptionTag = rng.pick(opts.misconceptionTags);

    if (opts.type === "MULTIPLE_CHOICE") {
      const distractors = numericDistractors(rng, result, 3, opts.distractorSpread ?? Math.max(2, Math.round(result * 0.3) || 2)).map(fmt);
      const { choices, correctId } = buildChoices(rng, fmt(result), distractors);
      return {
        templateKey: opts.key, seed, type: opts.type, difficulty: opts.difficulty,
        prompt, visualAid, choices, correctAnswer: correctId,
        explanationSteps, hints, misconceptionTag
      };
    }

    if (opts.type === "TRUE_FALSE") {
      const showFalse = rng.chance(opts.falseStatementRate ?? 0.5);
      const shownValue = showFalse
        ? fmt(numericDistractors(rng, result, 1, opts.distractorSpread ?? 3)[0] ?? result + 1)
        : fmt(result);
      const statementPrompt = `${prompt.replace(/\?\s*$/, "")} ${shownValue}. True or false?`;
      const { choices, correctId } = buildChoices(rng, showFalse ? "False" : "True", [showFalse ? "True" : "False"]);
      return {
        templateKey: opts.key, seed, type: opts.type, difficulty: opts.difficulty,
        prompt: statementPrompt, visualAid, choices, correctAnswer: correctId,
        explanationSteps, hints, misconceptionTag
      };
    }

    if (opts.type === "MISSING_NUMBER") {
      return {
        templateKey: opts.key, seed, type: opts.type, difficulty: opts.difficulty,
        prompt, visualAid, correctAnswer: fmt(result), acceptableAnswers: [String(result)],
        explanationSteps, hints, misconceptionTag
      };
    }

    // NUMBER_ENTRY
    return {
      templateKey: opts.key, seed, type: opts.type, difficulty: opts.difficulty,
      prompt, visualAid, correctAnswer: fmt(result), acceptableAnswers: [String(result), fmt(result)],
      explanationSteps, hints, misconceptionTag
    };
  }

  return {
    key: opts.key,
    levelKey: opts.levelKey,
    objectiveCode: opts.objectiveCode,
    type: opts.type,
    difficulty: opts.difficulty,
    misconceptionTags: opts.misconceptionTags,
    pathway: opts.pathway,
    variationSpace: opts.declaredVariationSpace,
    generate: build
  };
}

export interface OrderingTemplateOptions {
  key: string;
  levelKey: string;
  objectiveCode: string;
  difficulty: DifficultyBand;
  misconceptionTags: string[];
  pathway?: PathwayTag;
  type?: Extract<QuestionType, "ORDERING" | "DRAG_DROP">;
  direction?: "asc" | "desc";
  generateItems: (rng: Rng) => Array<{ label: string; sortValue: number }>;
  promptTemplates: string[];
  explain: (items: Array<{ label: string; sortValue: number }>) => string[];
  hints: (items: Array<{ label: string; sortValue: number }>) => string[];
  visualAid?: (items: Array<{ label: string; sortValue: number }>) => VisualAid | undefined;
  declaredVariationSpace: number;
}

/** Ordering / drag-and-drop style templates: the learner arranges a set of
 * items into ascending or descending order. `choices` carries the display
 * items (in shuffled, non-answer order); `correctAnswer` is the comma-joined
 * list of choice ids in the correct sequence. The accessible alternative to
 * dragging is a numbered "tap in order" / select-position control driven by
 * the same `choices`/`correctAnswer` data (implemented in the UI layer). */
export function orderingTemplate(opts: OrderingTemplateOptions): QuestionTemplateDef {
  function build(seed: number): GeneratedQuestionInstance {
    const rng = new Rng(seed);
    const rawItems = opts.generateItems(rng);
    const withIds = rawItems.map((it, i) => ({ ...it, id: `opt${i}` }));
    const direction = opts.direction ?? "asc";
    const correctOrder = [...withIds].sort((a, b) => (direction === "asc" ? a.sortValue - b.sortValue : b.sortValue - a.sortValue));
    const displayOrder = rng.shuffle(withIds);
    const prompt = fillTemplate(rng.pick(opts.promptTemplates), {});
    const misconceptionTag = rng.pick(opts.misconceptionTags);
    return {
      templateKey: opts.key,
      seed,
      type: opts.type ?? "ORDERING",
      difficulty: opts.difficulty,
      prompt,
      visualAid: opts.visualAid?.(rawItems),
      choices: displayOrder.map((it) => ({ id: it.id, label: it.label })),
      correctAnswer: correctOrder.map((it) => it.id).join(","),
      explanationSteps: opts.explain(rawItems),
      hints: opts.hints(rawItems),
      misconceptionTag
    };
  }

  return {
    key: opts.key,
    levelKey: opts.levelKey,
    objectiveCode: opts.objectiveCode,
    type: opts.type ?? "ORDERING",
    difficulty: opts.difficulty,
    misconceptionTags: opts.misconceptionTags,
    pathway: opts.pathway,
    variationSpace: opts.declaredVariationSpace,
    generate: build
  };
}

export interface MatchingTemplateOptions {
  key: string;
  levelKey: string;
  objectiveCode: string;
  difficulty: DifficultyBand;
  misconceptionTags: string[];
  pathway?: PathwayTag;
  generatePairs: (rng: Rng) => Array<{ left: string; right: string }>;
  promptTemplates: string[];
  explain: (pairs: Array<{ left: string; right: string }>) => string[];
  hints: (pairs: Array<{ left: string; right: string }>) => string[];
  declaredVariationSpace: number;
}

/** Matching-activity templates (e.g. match a clock face to its written time,
 * or a calculation to its answer). Left/right items are exposed via
 * `visualAid.data.left` / `.right` (right-hand items pre-shuffled for
 * display); `correctAnswer` is the canonical "L0=R0;L1=R1;..." mapping. The
 * accessible alternative is a per-row dropdown driven by the same data. */
export function matchingTemplate(opts: MatchingTemplateOptions): QuestionTemplateDef {
  function build(seed: number): GeneratedQuestionInstance {
    const rng = new Rng(seed);
    const pairs = opts.generatePairs(rng);
    const left = pairs.map((p, i) => ({ id: `L${i}`, label: p.left }));
    const right = rng.shuffle(pairs.map((p, i) => ({ id: `R${i}`, label: p.right })));
    const prompt = fillTemplate(rng.pick(opts.promptTemplates), {});
    const misconceptionTag = rng.pick(opts.misconceptionTags);
    return {
      templateKey: opts.key,
      seed,
      type: "MATCHING",
      difficulty: opts.difficulty,
      prompt,
      visualAid: { kind: "none", data: { left, right } },
      correctAnswer: pairs.map((_, i) => `L${i}=R${i}`).join(";"),
      explanationSteps: opts.explain(pairs),
      hints: opts.hints(pairs),
      misconceptionTag
    };
  }

  return {
    key: opts.key,
    levelKey: opts.levelKey,
    objectiveCode: opts.objectiveCode,
    type: "MATCHING",
    difficulty: opts.difficulty,
    misconceptionTags: opts.misconceptionTags,
    pathway: opts.pathway,
    variationSpace: opts.declaredVariationSpace,
    generate: build
  };
}

export interface CategoricalTemplateOptions {
  key: string;
  levelKey: string;
  objectiveCode: string;
  difficulty: DifficultyBand;
  misconceptionTags: string[];
  pathway?: PathwayTag;
  type: QuestionType;
  /** Named pools of interchangeable values (e.g. shape names, contexts, colours). */
  pools: Record<string, string[]>;
  /** Build the prompt/answer/distractors from one random draw of the pools. */
  build: (
    picked: Record<string, string>,
    rng: Rng
  ) => {
    prompt: string;
    correctLabel: string;
    distractorLabels: string[];
    explanationSteps: string[];
    hints: string[];
    visualAid?: VisualAid;
  };
  declaredVariationSpace: number;
}

/** Generic multiple-choice-from-text-labels templates for content where the
 * "answer" is categorical rather than numeric (shape names, chart readings,
 * geometric/algebraic reasoning statements). Combines random draws from named
 * pools to give combinatorial variety while keeping every combination
 * mathematically valid (the pools only vary surface presentation, never the
 * underlying maths). */
export function categoricalPoolTemplate(opts: CategoricalTemplateOptions): QuestionTemplateDef {
  function build(seed: number): GeneratedQuestionInstance {
    const rng = new Rng(seed);
    const picked: Record<string, string> = {};
    for (const [name, values] of Object.entries(opts.pools)) {
      picked[name] = rng.pick(values);
    }
    const drawn = opts.build(picked, rng);
    const { choices, correctId } = buildChoices(rng, drawn.correctLabel, drawn.distractorLabels);
    const misconceptionTag = rng.pick(opts.misconceptionTags);
    return {
      templateKey: opts.key,
      seed,
      type: opts.type,
      difficulty: opts.difficulty,
      prompt: drawn.prompt,
      visualAid: drawn.visualAid,
      choices,
      correctAnswer: correctId,
      explanationSteps: drawn.explanationSteps,
      hints: drawn.hints,
      misconceptionTag
    };
  }

  return {
    key: opts.key,
    levelKey: opts.levelKey,
    objectiveCode: opts.objectiveCode,
    type: opts.type,
    difficulty: opts.difficulty,
    misconceptionTags: opts.misconceptionTags,
    pathway: opts.pathway,
    variationSpace: opts.declaredVariationSpace,
    generate: build
  };
}

export { seedFor };
