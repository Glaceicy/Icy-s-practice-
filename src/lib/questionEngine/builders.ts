import { Rng, seedFor } from "./rng";
import type {
  ChoiceOption,
  DifficultyBand,
  GeneratedQuestionInstance,
  Locale,
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

/**
 * Substitute `{name}` placeholders. Three spellings do extra work:
 *
 *   `{Ctx}`            the value of `ctx` with its first letter raised. Context
 *                      pools are stored lowercase because most uses sit
 *                      mid-sentence ("the area of {ctx}"), so a pool landing at
 *                      the start of a sentence asks for the capital here.
 *   `{b#are|is}`       the first word unless the value of `b` is exactly one, in
 *                      which case the second. A range that reaches 1 would
 *                      otherwise produce "1 are given away" or "in 1 hours",
 *                      and in French both the verb and the participle inflect,
 *                      so each agreeing word gets its own placeholder:
 *                      "{b} {b#sont|est} {b#donnés|donné}".
 *   `{de:ctx}`         the French word before `ctx`, elided when the value
 *                      begins with a vowel sound: "de billes" but "d'étoiles".
 *                      `de`, `du`, `le`, `la`, `ne`, `que` and `si` all take
 *                      this form, and a capitalised word ("De:") keeps its
 *                      capital. Context pools hold whichever article fits each
 *                      entry, so the preceding word cannot be written into the
 *                      sentence by hand. Words starting with h or y are left
 *                      alone: "d'heure" elides but "de haricots" does not, and
 *                      nothing in the spelling says which.
 */
const ELIDE_PLACEHOLDER = /\{([Dd]e|[Dd]u|[Ll]e|[Ll]a|[Nn]e|[Qq]ue|[Ss]i):(\w+)\}/g;
const ELIDES_BEFORE = /^[aàâäeéèêëiîïoôöuùû]/i;

/** French elision, for sentences assembled in code rather than from a template
 * string: elide("de", "un rectangle") gives "d'un rectangle". Same rule as the
 * `{de:ctx}` placeholder below, including leaving h and y alone. */
export function elide(word: string, value: string): string {
  if (!ELIDES_BEFORE.test(value)) return `${word} ${value}`;
  const stem = word.toLowerCase() === "du" ? "de l" : word.slice(0, -1);
  return `${stem}'${value}`;
}

export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(ELIDE_PLACEHOLDER, (whole, word: string, key: string) => {
    const v = values[key];
    if (v === undefined) return whole;
    return elide(word, String(v));
  }).replace(/\{(\w+)(?:#([^|{}]*)\|([^{}]*))?\}/g, (whole, key: string, plural?: string, singular?: string) => {
    const raise = /^[A-Z]/.test(key) && values[key] === undefined;
    const v = values[raise ? key[0]!.toLowerCase() + key.slice(1) : key];
    if (v === undefined) return whole;
    if (plural !== undefined && singular !== undefined) {
      // Values arrive formatted, so "£1" and "1.0" both have to read as one.
      return Number.parseFloat(String(v).replace(/[^0-9.-]/g, "")) === 1 ? singular : plural;
    }
    const filled = String(v);
    return raise ? filled.charAt(0).toUpperCase() + filled.slice(1) : filled;
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
  /** French text for the same underlying question. Every field here is
   * optional and falls back to its English counterpart above when absent —
   * a template can be partially translated (e.g. prompt done, explain not
   * yet) without ever breaking. Safe to author independently of the English
   * fields: none of `promptTemplates`/`contextPool` (picked via `rng.pick`,
   * which consumes exactly one draw regardless of array length/contents) or
   * `derive`/`explain`/`hints`/`visualAid` (pure functions of `values`/
   * `result`, no `rng` access) can change the underlying maths — the same
   * seed always produces the same numbers and the same `correctAnswer` in
   * both languages. */
  fr?: Partial<
    Pick<ArithmeticTemplateOptions, "promptTemplates" | "contextPool" | "derive" | "explain" | "hints" | "visualAid">
  >;
}

const letters = ["a", "b", "c", "d", "e"];

/** A generic, DRY generator for fluency/application arithmetic-style questions
 * (addition, subtraction, multiplication, division, comparisons, conversions,
 * money, measurement, etc). Encapsulates seeding, value sampling, phrasing
 * variety, distractor generation and answer formatting so individual question
 * templates stay a short declarative config rather than bespoke code. */
export function arithmeticTemplate(opts: ArithmeticTemplateOptions): QuestionTemplateDef {
  const fmt = opts.formatValue ?? ((n: number) => String(n));

  function build(seed: number, locale: Locale = "en"): GeneratedQuestionInstance {
    const fr = locale === "fr" ? opts.fr : undefined;
    const promptTemplates = fr?.promptTemplates ?? opts.promptTemplates;
    const contextPool = fr?.contextPool ?? opts.contextPool;
    const derive = fr?.derive ?? opts.derive;
    const explainFn = fr?.explain ?? opts.explain;
    const hintsFn = fr?.hints ?? opts.hints;
    const visualAidFn = fr?.visualAid ?? opts.visualAid;

    const rng = new Rng(seed);
    const values = pickValues(rng, opts.ranges, opts.constraint);
    const result = opts.compute(values);
    const varMap: Record<string, string | number> = { result: fmt(result) };
    values.forEach((v, i) => {
      const letter = letters[i] ?? `v${i}`;
      varMap[letter] = fmt(v);
    });
    if (contextPool && contextPool.length > 0) {
      varMap.ctx = rng.pick(contextPool);
    }
    if (derive) {
      Object.assign(varMap, derive(values, result));
    }
    const promptTemplate = rng.pick(promptTemplates);
    const prompt = fillTemplate(promptTemplate, varMap);
    const explanationSteps = explainFn(values, result);
    const hints = hintsFn(values, result);
    const visualAid = visualAidFn?.(values, result);
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
      const trueLabel = locale === "fr" ? "Vrai" : "True";
      const falseLabel = locale === "fr" ? "Faux" : "False";
      const trueOrFalse = locale === "fr" ? "Vrai ou faux ?" : "True or false?";
      const showFalse = rng.chance(opts.falseStatementRate ?? 0.5);
      const shownValue = showFalse
        ? fmt(numericDistractors(rng, result, 1, opts.distractorSpread ?? 3)[0] ?? result + 1)
        : fmt(result);
      const statementPrompt = `${prompt.replace(/\?\s*$/, "")} ${shownValue}. ${trueOrFalse}`;
      const { choices, correctId } = buildChoices(rng, showFalse ? falseLabel : trueLabel, [showFalse ? trueLabel : falseLabel]);
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
  /** French text. The underlying items are ALWAYS generated once via the
   * English `generateItems` regardless of locale — `translateLabels` then
   * runs as a pure, RNG-free post-processing pass over those exact items
   * (same length, same order, same `sortValue`s) to swap in French `label`
   * text. This guarantees `correctAnswer`/choice ids can never drift between
   * locales, since French never re-derives structure, only relabels it.
   * `explain`/`hints`/`visualAid`/`promptTemplates` are separately safe to
   * override freely (pure functions of the already-generated items, or a
   * single `rng.pick` whose draw count doesn't depend on array content). */
  fr?: Partial<Pick<OrderingTemplateOptions, "promptTemplates" | "explain" | "hints" | "visualAid">> & {
    translateLabels?: (items: Array<{ label: string; sortValue: number }>) => Array<{ label: string; sortValue: number }>;
  };
}

/** Ordering / drag-and-drop style templates: the learner arranges a set of
 * items into ascending or descending order. `choices` carries the display
 * items (in shuffled, non-answer order); `correctAnswer` is the comma-joined
 * list of choice ids in the correct sequence. The accessible alternative to
 * dragging is a numbered "tap in order" / select-position control driven by
 * the same `choices`/`correctAnswer` data (implemented in the UI layer). */
export function orderingTemplate(opts: OrderingTemplateOptions): QuestionTemplateDef {
  function build(seed: number, locale: Locale = "en"): GeneratedQuestionInstance {
    const fr = locale === "fr" ? opts.fr : undefined;
    const promptTemplates = fr?.promptTemplates ?? opts.promptTemplates;
    const explainFn = fr?.explain ?? opts.explain;
    const hintsFn = fr?.hints ?? opts.hints;
    const visualAidFn = fr?.visualAid ?? opts.visualAid;

    const rng = new Rng(seed);
    const rawItems = fr?.translateLabels ? fr.translateLabels(opts.generateItems(rng)) : opts.generateItems(rng);
    const withIds = rawItems.map((it, i) => ({ ...it, id: `opt${i}` }));
    const direction = opts.direction ?? "asc";
    const correctOrder = [...withIds].sort((a, b) => (direction === "asc" ? a.sortValue - b.sortValue : b.sortValue - a.sortValue));
    const displayOrder = rng.shuffle(withIds);
    const prompt = fillTemplate(rng.pick(promptTemplates), {});
    const misconceptionTag = rng.pick(opts.misconceptionTags);
    return {
      templateKey: opts.key,
      seed,
      type: opts.type ?? "ORDERING",
      difficulty: opts.difficulty,
      prompt,
      visualAid: visualAidFn?.(rawItems),
      choices: displayOrder.map((it) => ({ id: it.id, label: it.label })),
      correctAnswer: correctOrder.map((it) => it.id).join(","),
      explanationSteps: explainFn(rawItems),
      hints: hintsFn(rawItems),
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
  /** French text. As with `orderingTemplate`, pairs are ALWAYS generated once
   * via the English `generatePairs`; `translatePairs` is a pure, RNG-free
   * post-processing pass over those exact pairs (same length/order) so the
   * L/R id-to-pair mapping — and therefore `correctAnswer` — can never drift
   * between locales. */
  fr?: Partial<Pick<MatchingTemplateOptions, "promptTemplates" | "explain" | "hints">> & {
    translatePairs?: (pairs: Array<{ left: string; right: string }>) => Array<{ left: string; right: string }>;
  };
}

/** Matching-activity templates (e.g. match a clock face to its written time,
 * or a calculation to its answer). Left/right items are exposed via
 * `visualAid.data.left` / `.right` (right-hand items pre-shuffled for
 * display); `correctAnswer` is the canonical "L0=R0;L1=R1;..." mapping. The
 * accessible alternative is a per-row dropdown driven by the same data. */
export function matchingTemplate(opts: MatchingTemplateOptions): QuestionTemplateDef {
  function build(seed: number, locale: Locale = "en"): GeneratedQuestionInstance {
    const fr = locale === "fr" ? opts.fr : undefined;
    const promptTemplates = fr?.promptTemplates ?? opts.promptTemplates;
    const explainFn = fr?.explain ?? opts.explain;
    const hintsFn = fr?.hints ?? opts.hints;

    const rng = new Rng(seed);
    const pairs = fr?.translatePairs ? fr.translatePairs(opts.generatePairs(rng)) : opts.generatePairs(rng);
    const left = pairs.map((p, i) => ({ id: `L${i}`, label: p.left }));
    const right = rng.shuffle(pairs.map((p, i) => ({ id: `R${i}`, label: p.right })));
    const prompt = fillTemplate(rng.pick(promptTemplates), {});
    const misconceptionTag = rng.pick(opts.misconceptionTags);
    return {
      templateKey: opts.key,
      seed,
      type: "MATCHING",
      difficulty: opts.difficulty,
      prompt,
      visualAid: { kind: "none", data: { left, right } },
      correctAnswer: pairs.map((_, i) => `L${i}=R${i}`).join(";"),
      explanationSteps: explainFn(pairs),
      hints: hintsFn(pairs),
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
  /** French text. `picked` is ALWAYS drawn from the English `pools`, and
   * `build` always runs identically, regardless of locale — `translate` then
   * runs as a pure post-processing pass over the resulting `drawn` object
   * (same array lengths for `distractorLabels`) so the subsequent choice
   * shuffle/id assignment, and therefore `correctAnswer`, can never drift
   * between locales. */
  fr?: {
    translate?: (
      drawn: { prompt: string; correctLabel: string; distractorLabels: string[]; explanationSteps: string[]; hints: string[]; visualAid?: VisualAid },
      picked: Record<string, string>
    ) => Partial<{ prompt: string; correctLabel: string; distractorLabels: string[]; explanationSteps: string[]; hints: string[]; visualAid?: VisualAid }>;
  };
}

/** Generic multiple-choice-from-text-labels templates for content where the
 * "answer" is categorical rather than numeric (shape names, chart readings,
 * geometric/algebraic reasoning statements). Combines random draws from named
 * pools to give combinatorial variety while keeping every combination
 * mathematically valid (the pools only vary surface presentation, never the
 * underlying maths). */
export function categoricalPoolTemplate(opts: CategoricalTemplateOptions): QuestionTemplateDef {
  function build(seed: number, locale: Locale = "en"): GeneratedQuestionInstance {
    const fr = locale === "fr" ? opts.fr : undefined;
    const rng = new Rng(seed);
    const picked: Record<string, string> = {};
    for (const [name, values] of Object.entries(opts.pools)) {
      picked[name] = rng.pick(values);
    }
    let drawn = opts.build(picked, rng);
    if (fr?.translate) {
      drawn = { ...drawn, ...fr.translate(drawn, picked) };
    }
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
