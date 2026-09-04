import { prisma } from "@/lib/db";
import { pickQuestions } from "@/lib/questionEngine/registry";
import { seedFor } from "@/lib/questionEngine/rng";
import { hashSeed } from "@/lib/questionEngine/rng";
import { ensureQuestionLog, gradeAnswer, getTemplateDef, getDisabledTemplateKeys } from "./questionLog";
import { recordObjectiveProgress, recordMisconception } from "./objectives";
import { buildWrongAnswerSupport, type WrongAnswerSupport } from "./misconception";
import { GUIDED_PRACTICE_QUESTIONS, INDEPENDENT_PRACTICE_MIN_QUESTIONS, REVISION_MIN_QUESTIONS } from "@/lib/scoring";
import type { PracticeMode } from "@/lib/types";
import type { GeneratedQuestionInstance } from "@/lib/questionEngine/types";

export async function getExcludedKeysForChild(childId: string, levelId: string): Promise<Set<string>> {
  const [practiceAnswers, assessmentAnswers] = await Promise.all([
    prisma.practiceAnswer.findMany({
      where: { attempt: { childId, levelId } },
      include: { questionLog: { include: { template: true } } }
    }),
    prisma.assessmentAnswer.findMany({
      where: { attempt: { childId, levelId }, locked: true },
      include: { questionLog: { include: { template: true } } }
    })
  ]);
  const set = new Set<string>();
  for (const a of [...practiceAnswers, ...assessmentAnswers]) {
    set.add(`${a.questionLog.template.generatorKey}:${a.questionLog.seed}`);
  }
  return set;
}

export async function startPracticeAttempt(childId: string, levelId: string, levelKey: string, pathway: "CORE" | "FOUNDATION" | "HIGHER", mode: PracticeMode) {
  const totalQuestions =
    mode === "GUIDED" ? GUIDED_PRACTICE_QUESTIONS : mode === "REVISION" ? REVISION_MIN_QUESTIONS : INDEPENDENT_PRACTICE_MIN_QUESTIONS;
  const attempt = await prisma.practiceAttempt.create({
    data: { childId, levelId, mode, totalQuestions }
  });
  return attempt;
}

async function batchFor(
  attemptId: string,
  levelId: string,
  levelKey: string,
  pathway: "CORE" | "FOUNDATION" | "HIGHER",
  total: number,
  exclude: Set<string>,
  objectiveCodes?: string[]
) {
  // Guided practice skews easier (more fluency); independent practice follows
  // the standard balanced spec §7 split and adapts as the child answers.
  const distribution = total === GUIDED_PRACTICE_QUESTIONS ? { FLUENCY: 0.6, APPLICATION: 0.3, REASONING: 0.1 } : undefined;
  const disabledTemplateKeys = await getDisabledTemplateKeys(levelId);
  return pickQuestions({
    levelKey,
    pathway,
    count: total,
    selectionSeed: hashSeed(attemptId),
    exclude,
    difficultyDistribution: distribution,
    objectiveCodes,
    disabledTemplateKeys
  });
}

export interface NextPracticeQuestion {
  done: boolean;
  position: number;
  totalQuestions: number;
  logId?: string;
  instance?: GeneratedQuestionInstance;
  triesSoFar?: number;
  remaining?: number;
}

export async function getNextPracticeQuestion(
  attemptId: string,
  levelDbId: string,
  levelKey: string,
  pathway: "CORE" | "FOUNDATION" | "HIGHER",
  excludeAcrossChild: Set<string>,
  objectiveCodes?: string[]
): Promise<NextPracticeQuestion> {
  const attempt = await prisma.practiceAttempt.findUniqueOrThrow({ where: { id: attemptId }, include: { answers: true } });
  const batch = await batchFor(attemptId, levelDbId, levelKey, pathway, attempt.totalQuestions, excludeAcrossChild, objectiveCodes);

  const completedPositions = new Set(attempt.answers.filter((a) => a.isCorrect).map((a) => a.position));
  let position = -1;
  for (let i = 0; i < attempt.totalQuestions; i++) {
    if (!completedPositions.has(i)) {
      position = i;
      break;
    }
  }
  if (position === -1) {
    if (!attempt.completedAt) {
      await prisma.practiceAttempt.update({ where: { id: attemptId }, data: { completedAt: new Date() } });
    }
    return { done: true, position: attempt.totalQuestions, totalQuestions: attempt.totalQuestions };
  }

  const triesSoFar = attempt.answers.filter((a) => a.position === position).length;
  const base = batch[position]!;
  const def = getTemplateDef(base.templateKey);
  const seed = triesSoFar === 0 ? base.seed : seedFor(base.templateKey, base.seed + triesSoFar * 37) % 150;
  const { logId, instance } = await ensureQuestionLog(levelDbId, base.templateKey, seed);
  void def;

  return {
    done: false,
    position,
    totalQuestions: attempt.totalQuestions,
    logId,
    instance,
    triesSoFar,
    remaining: attempt.totalQuestions - completedPositions.size
  };
}

/** Objective codes the child got wrong on their most recent failed Mastery
 * Challenge attempt for this level — used to target personalised revision
 * (spec §5: "Identify the exact skills that need more practice"). */
export async function getWeakObjectiveCodes(childId: string, levelId: string): Promise<string[]> {
  const lastFailed = await prisma.assessmentAttempt.findFirst({
    where: { childId, levelId, status: "SUBMITTED", passed: false },
    orderBy: { submittedAt: "desc" },
    include: { answers: { where: { isCorrect: false }, include: { questionLog: { include: { template: { include: { objective: true } } } } } } }
  });
  if (!lastFailed) return [];
  return Array.from(new Set(lastFailed.answers.map((a) => a.questionLog.template.objective.code)));
}

export interface PracticeAnswerResult {
  isCorrect: boolean;
  support: WrongAnswerSupport | null;
  attemptComplete: boolean;
}

export async function submitPracticeAnswer(params: {
  childId: string;
  attemptId: string;
  position: number;
  logId: string;
  givenAnswer: string;
  hintsUsed: number;
}): Promise<PracticeAnswerResult> {
  const { childId, attemptId, position, logId, givenAnswer, hintsUsed } = params;
  const log = await prisma.generatedQuestionLog.findUniqueOrThrow({ where: { id: logId }, include: { template: true } });
  const isCorrect = gradeAnswer(givenAnswer, log.correctAnswer, log.acceptableAnswers);
  const attemptNumber = (await prisma.practiceAnswer.count({ where: { attemptId, position } })) + 1;

  await prisma.practiceAnswer.create({
    data: {
      attemptId,
      position,
      questionLogId: logId,
      givenAnswer,
      isCorrect,
      hintsUsed,
      attemptNumber,
      misconceptionTag: isCorrect ? null : log.misconceptionTag
    }
  });

  await prisma.generatedQuestionLog.update({
    where: { id: logId },
    data: {
      timesServed: { increment: 1 },
      timesCorrectFirstTry: { increment: isCorrect && attemptNumber === 1 ? 1 : 0 },
      timesIncorrectFirstTry: { increment: !isCorrect && attemptNumber === 1 ? 1 : 0 }
    }
  });

  await prisma.practiceAttempt.update({
    where: { id: attemptId },
    data: { correctCount: { increment: isCorrect ? 1 : 0 }, hintsUsed: { increment: hintsUsed } }
  });

  await recordObjectiveProgress({
    childId,
    objectiveId: log.template.objectiveId,
    isFirstAttempt: attemptNumber === 1,
    isCorrect,
    hintsUsed
  });

  let support: WrongAnswerSupport | null = null;
  if (!isCorrect) {
    const def = getTemplateDef(log.template.generatorKey);
    const instance = def.generate(log.seed);
    support = buildWrongAnswerSupport(instance, attemptNumber, hintsUsed);
    if (log.misconceptionTag) {
      await recordMisconception({
        childId,
        tag: log.misconceptionTag,
        objectiveId: log.template.objectiveId,
        levelId: log.template.levelId,
        context: `${log.template.generatorKey} (practice, attempt ${attemptNumber})`
      });
    }
  }

  const attempt = await prisma.practiceAttempt.findUniqueOrThrow({ where: { id: attemptId }, include: { answers: true } });
  const completed = new Set(attempt.answers.filter((a) => a.isCorrect).map((a) => a.position));
  const attemptComplete = completed.size >= attempt.totalQuestions;
  if (attemptComplete && !attempt.completedAt) {
    await prisma.practiceAttempt.update({ where: { id: attemptId }, data: { completedAt: new Date() } });
  }

  return { isCorrect, support, attemptComplete };
}
