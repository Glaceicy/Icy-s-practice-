import { describe, expect, it } from "vitest";
import { loadAllTemplates, COMPLETE_LEVEL_KEYS } from "@/lib/questionEngine/templates/all";
import { getTemplatesForLevel, levelHasQuestionBank, pickQuestions } from "@/lib/questionEngine/registry";
import { validateQuestion, verifyTemplateVariations } from "@/lib/questionEngine/validators";

loadAllTemplates();

describe("question bank coverage (spec §7)", () => {
  for (const levelKey of COMPLETE_LEVEL_KEYS) {
    it(`${levelKey} has a registered question bank`, () => {
      expect(levelHasQuestionBank(levelKey) || getTemplatesForLevel(levelKey).length >= 15).toBe(true);
      expect(getTemplatesForLevel(levelKey).length).toBeGreaterThanOrEqual(15);
    });
  }
});

describe("every registered template generates >=150 valid, non-duplicate variations", () => {
  for (const levelKey of COMPLETE_LEVEL_KEYS) {
    const templates = getTemplatesForLevel(levelKey);
    for (const template of templates) {
      it(`${template.key} (${levelKey}, ${template.type}/${template.difficulty})`, () => {
        const { distinctCount, invalidSeeds } = verifyTemplateVariations(template);
        if (invalidSeeds.length > 0) {
          const sample = invalidSeeds.slice(0, 3).map((s) => `seed ${s.seed}: ${s.errors.join("; ")}`).join(" | ");
          throw new Error(`${invalidSeeds.length} invalid generated question(s). Examples: ${sample}`);
        }
        expect(distinctCount).toBeGreaterThanOrEqual(150);
      });
    }
  }
});

describe("deterministic replay", () => {
  it("the same template + seed always generates an identical question", () => {
    const templates = getTemplatesForLevel("Y1L1");
    const template = templates[0]!;
    const a = template.generate(42);
    const b = template.generate(42);
    expect(a).toEqual(b);
  });
});

describe("question selection (guided / independent / mastery)", () => {
  it("picks exactly the requested number of questions, all individually valid", () => {
    const picks = pickQuestions({ levelKey: "Y1L1", pathway: "CORE", count: 40, selectionSeed: 1 });
    expect(picks).toHaveLength(40);
    for (const p of picks) {
      const result = validateQuestion(p.instance);
      expect(result.errors).toEqual([]);
      expect(result.valid).toBe(true);
    }
  });

  it("does not repeat a question already excluded (already served to this child)", () => {
    const first = pickQuestions({ levelKey: "Y1L1", pathway: "CORE", count: 40, selectionSeed: 2 });
    const exclude = new Set(first.map((p) => `${p.templateKey}:${p.seed}`));
    const second = pickQuestions({ levelKey: "Y1L1", pathway: "CORE", count: 40, selectionSeed: 3, exclude });
    const overlap = second.filter((p) => exclude.has(`${p.templateKey}:${p.seed}`));
    expect(overlap).toHaveLength(0);
  });

  it("roughly follows the 30/40/30 fluency/application/reasoning split for a 40-question pick", () => {
    const picks = pickQuestions({ levelKey: "Y1L1", pathway: "CORE", count: 40, selectionSeed: 4 });
    const counts = { FLUENCY: 0, APPLICATION: 0, REASONING: 0 };
    for (const p of picks) counts[p.instance.difficulty]++;
    expect(counts.FLUENCY).toBeGreaterThanOrEqual(9);
    expect(counts.APPLICATION).toBeGreaterThanOrEqual(13);
    expect(counts.REASONING).toBeGreaterThanOrEqual(9);
  });

  it("Year 10 pathway filtering: a HIGHER-tagged template only appears for HIGHER pathway learners", () => {
    const higherPicks = pickQuestions({ levelKey: "Y10L1", pathway: "HIGHER", count: 40, selectionSeed: 5 });
    const corePicks = pickQuestions({ levelKey: "Y10L1", pathway: "CORE", count: 40, selectionSeed: 6 });
    const higherOnlyKeys = getTemplatesForLevel("Y10L1").filter((t) => t.pathway === "HIGHER").map((t) => t.key);
    expect(higherOnlyKeys.length).toBeGreaterThan(0);
    const coreUsedHigherOnly = corePicks.some((p) => higherOnlyKeys.includes(p.templateKey));
    expect(coreUsedHigherOnly).toBe(false);
    void higherPicks;
  });

  it("throws a clear error for a level with no published question bank", () => {
    expect(() => pickQuestions({ levelKey: "Y2L1", pathway: "CORE", count: 10, selectionSeed: 1 })).toThrow(/not yet published/);
  });
});
