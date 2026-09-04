import { prisma } from "@/lib/db";
import { loadAllTemplates } from "@/lib/questionEngine/templates/all";
import { getAllTemplates } from "@/lib/questionEngine/registry";
import type { GeneratedQuestionInstance, QuestionTemplateDef } from "@/lib/questionEngine/types";

loadAllTemplates();

let templateIndex: Map<string, QuestionTemplateDef> | null = null;
function getTemplateIndex(): Map<string, QuestionTemplateDef> {
  if (!templateIndex) {
    templateIndex = new Map(getAllTemplates().map((t) => [t.key, t]));
  }
  return templateIndex;
}

export async function getDisabledTemplateKeys(levelId: string): Promise<Set<string>> {
  const disabled = await prisma.questionTemplate.findMany({ where: { levelId, isActive: false }, select: { generatorKey: true } });
  return new Set(disabled.map((d) => d.generatorKey));
}

export function getTemplateDef(generatorKey: string): QuestionTemplateDef {
  const def = getTemplateIndex().get(generatorKey);
  if (!def) throw new Error(`Unknown question template: ${generatorKey}`);
  return def;
}

/** Ensures a DB QuestionTemplate row exists for a code-registered template
 * (creating it — and its parent Level/LearningObjective if this is the very
 * first time this level has been served — on first use), then ensures a
 * GeneratedQuestionLog row exists for the given seed, returning both the row
 * id and the freshly (re)computed instance for rendering. The stored
 * `correctAnswer` on that row — never a client-supplied value — is always
 * what grades the learner (see submitAnswer in services/attempts.ts). */
export async function ensureQuestionLog(
  levelDbId: string,
  generatorKey: string,
  seed: number
): Promise<{ logId: string; instance: GeneratedQuestionInstance }> {
  const def = getTemplateDef(generatorKey);
  const instance = def.generate(seed);

  let template = await prisma.questionTemplate.findUnique({
    where: { levelId_generatorKey: { levelId: levelDbId, generatorKey } }
  });

  if (!template) {
    const objective = await prisma.learningObjective.findFirst({
      where: { levelId: levelDbId, code: def.objectiveCode }
    });
    if (!objective) {
      throw new Error(`Learning objective ${def.objectiveCode} not found for level ${levelDbId}`);
    }
    template = await prisma.questionTemplate.create({
      data: {
        levelId: levelDbId,
        objectiveId: objective.id,
        generatorKey,
        questionType: def.type,
        difficulty: def.difficulty,
        misconceptionTags: def.misconceptionTags.join(","),
        minVariations: def.variationSpace
      }
    });
  }

  let log = await prisma.generatedQuestionLog.findUnique({
    where: { templateId_seed: { templateId: template.id, seed } }
  });

  if (!log) {
    log = await prisma.generatedQuestionLog.create({
      data: {
        templateId: template.id,
        seed,
        prompt: instance.prompt,
        questionType: instance.type,
        difficulty: instance.difficulty,
        choicesJson: instance.choices ? JSON.stringify(instance.choices) : null,
        visualAidJson: instance.visualAid ? JSON.stringify(instance.visualAid) : null,
        correctAnswer: instance.correctAnswer,
        acceptableAnswers: instance.acceptableAnswers?.join("|||") ?? null,
        explanationSteps: JSON.stringify(instance.explanationSteps),
        hints: JSON.stringify(instance.hints),
        misconceptionTag: instance.misconceptionTag ?? null
      }
    });
  }

  return { logId: log.id, instance };
}

export interface StoredQuestionView {
  logId: string;
  prompt: string;
  type: string;
  difficulty: string;
  choices?: Array<{ id: string; label: string }>;
  visualAid?: { kind: string; data: Record<string, unknown> };
}

/** Converts a persisted GeneratedQuestionLog row into the shape sent to the
 * client — deliberately excludes correctAnswer/acceptableAnswers so the
 * answer key never reaches the browser before grading. */
export function logToView(log: {
  id: string;
  prompt: string;
  questionType: string;
  difficulty: string;
  choicesJson: string | null;
  visualAidJson: string | null;
}): StoredQuestionView {
  return {
    logId: log.id,
    prompt: log.prompt,
    type: log.questionType,
    difficulty: log.difficulty,
    choices: log.choicesJson ? JSON.parse(log.choicesJson) : undefined,
    visualAid: log.visualAidJson ? JSON.parse(log.visualAidJson) : undefined
  };
}

function normaliseAnswer(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

/** The single source of truth for grading: compares a learner's submitted
 * answer against the stored (never client-supplied) correct answer key. */
export function gradeAnswer(givenAnswer: string, correctAnswer: string, acceptableAnswers: string | null): boolean {
  const given = normaliseAnswer(givenAnswer);
  const accepted = [correctAnswer, ...(acceptableAnswers ? acceptableAnswers.split("|||") : [])];
  return accepted.some((a) => normaliseAnswer(a) === given);
}
