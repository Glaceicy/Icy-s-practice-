import { Rng } from "./rng";
import type { DifficultyBand, GeneratedQuestionInstance, PathwayTag, QuestionTemplateDef } from "./types";

const registry = new Map<string, QuestionTemplateDef[]>();

export function registerTemplates(levelKey: string, templates: QuestionTemplateDef[]): void {
  const existing = registry.get(levelKey) ?? [];
  const seenKeys = new Set(existing.map((t) => t.key));
  for (const t of templates) {
    if (seenKeys.has(t.key)) throw new Error(`Duplicate template key registered: ${t.key}`);
    seenKeys.add(t.key);
  }
  registry.set(levelKey, [...existing, ...templates]);
}

export function getTemplatesForLevel(levelKey: string): QuestionTemplateDef[] {
  return registry.get(levelKey) ?? [];
}

export function getAllTemplates(): QuestionTemplateDef[] {
  return Array.from(registry.values()).flat();
}

export function getAllLevelKeys(): string[] {
  return Array.from(registry.keys());
}

export function levelHasQuestionBank(levelKey: string): boolean {
  return (registry.get(levelKey)?.length ?? 0) >= 30;
}

function templatesForPathway(levelKey: string, pathway: PathwayTag): QuestionTemplateDef[] {
  return getTemplatesForLevel(levelKey).filter((t) => !t.pathway || t.pathway === pathway);
}

export interface QuestionPick {
  templateKey: string;
  seed: number;
  instance: GeneratedQuestionInstance;
}

const DEFAULT_DISTRIBUTION: Record<DifficultyBand, number> = {
  FLUENCY: 0.3,
  APPLICATION: 0.4,
  REASONING: 0.3
};

export interface PickQuestionsParams {
  levelKey: string;
  pathway: PathwayTag;
  count: number;
  selectionSeed: number;
  difficultyDistribution?: Partial<Record<DifficultyBand, number>>;
  /** Set of "templateKey:seed" combinations to avoid re-serving (already answered by this child). */
  exclude?: Set<string>;
  variationsPerTemplate?: number;
  /** Restrict selection to templates targeting these objective codes (used
   * for personalised revision after a failed Mastery Challenge, spec §5).
   * Falls back to the full level pool if the filtered set is empty. */
  objectiveCodes?: string[];
  /** Generator keys an administrator has disabled (spec §14 "disable an
   * inaccurate question") — excluded from selection entirely. */
  disabledTemplateKeys?: Set<string>;
}

/** Selects `count` questions for a child, respecting the fluency/application/
 * reasoning balance and avoiding repeats already served, drawing from the
 * level's registered template pool. Pure/deterministic given `selectionSeed`. */
export function pickQuestions(params: PickQuestionsParams): QuestionPick[] {
  const {
    levelKey,
    pathway,
    count,
    selectionSeed,
    difficultyDistribution,
    exclude = new Set<string>(),
    variationsPerTemplate = 150
  } = params;

  let templates = templatesForPathway(levelKey, pathway);
  if (params.disabledTemplateKeys && params.disabledTemplateKeys.size > 0) {
    templates = templates.filter((t) => !params.disabledTemplateKeys!.has(t.key));
  }
  if (templates.length === 0) {
    throw new Error(`No question templates registered for level ${levelKey}. This level's content is not yet published.`);
  }
  if (params.objectiveCodes && params.objectiveCodes.length > 0) {
    const filtered = templates.filter((t) => params.objectiveCodes!.includes(t.objectiveCode));
    if (filtered.length > 0) templates = filtered;
  }

  const distribution = { ...DEFAULT_DISTRIBUTION, ...difficultyDistribution };
  const bands: DifficultyBand[] = ["FLUENCY", "APPLICATION", "REASONING"];
  const targetCounts: Record<DifficultyBand, number> = { FLUENCY: 0, APPLICATION: 0, REASONING: 0 };
  let allocated = 0;
  bands.forEach((band, i) => {
    const n = i === bands.length - 1 ? count - allocated : Math.round(count * (distribution[band] ?? 0));
    targetCounts[band] = Math.max(0, n);
    allocated += targetCounts[band];
  });

  const rng = new Rng(selectionSeed);
  const usedThisSelection = new Set<string>(exclude);
  const picks: QuestionPick[] = [];

  for (const band of bands) {
    let pool = templates.filter((t) => t.difficulty === band);
    if (pool.length === 0) pool = templates; // graceful fallback if a level has no templates in that band
    let needed = targetCounts[band];
    let guard = 0;
    while (needed > 0 && guard < needed * 200 + 500) {
      guard++;
      const template = rng.pick(pool);
      const seed = rng.int(0, Math.max(0, variationsPerTemplate - 1));
      const key = `${template.key}:${seed}`;
      if (usedThisSelection.has(key)) continue;
      usedThisSelection.add(key);
      picks.push({ templateKey: template.key, seed, instance: template.generate(seed) });
      needed--;
    }
    if (needed > 0) {
      // Pool exhausted (shouldn't happen at declared scale) — allow repeats as last resort
      // rather than fail the learner's session.
      for (let i = 0; i < needed; i++) {
        const template = rng.pick(pool);
        const seed = rng.int(0, Math.max(0, variationsPerTemplate - 1));
        picks.push({ templateKey: template.key, seed, instance: template.generate(seed) });
      }
    }
  }

  return rng.shuffle(picks);
}
