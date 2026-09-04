import { prisma } from "@/lib/db";
import { pickQuestions } from "@/lib/questionEngine/registry";
import { hashSeed } from "@/lib/questionEngine/rng";
import { ensureQuestionLog, gradeAnswer, logToView, getDisabledTemplateKeys, type StoredQuestionView } from "./questionLog";
import { recordObjectiveProgress, recordMisconception } from "./objectives";
import { buildWrongAnswerSupport, type WrongAnswerSupport } from "./misconception";
import { MASTERY_QUESTIONS_PER_ROUND, MASTERY_TOTAL_QUESTIONS, computeScorePercentage, isMasteryPass, roundNumberForQuestionIndex, positionInRoundForQuestionIndex } from "@/lib/scoring";
import { decideUnlock } from "@/lib/unlocking";
import { getExcludedKeysForChild } from "./practice";
import type { Pathway } from "@/lib/types";

export async function getActiveOrNewMasteryAttempt(childId: string, levelId: string, levelKey: string, pathway: Pathway) {
  const existing = await prisma.assessmentAttempt.findFirst({
    where: { childId, levelId, status: { in: ["IN_PROGRESS", "PAUSED"] } },
    orderBy: { startedAt: "desc" }
  });
  if (existing) return existing;

  const priorCount = await prisma.assessmentAttempt.count({ where: { childId, levelId } });
  const exclude = await getExcludedKeysForChild(childId, levelId);
  const disabledTemplateKeys = await getDisabledTemplateKeys(levelId);
  const picks = pickQuestions({
    levelKey,
    pathway,
    count: MASTERY_TOTAL_QUESTIONS,
    selectionSeed: hashSeed(`${childId}:${levelId}:attempt${priorCount + 1}`),
    exclude,
    disabledTemplateKeys
  });

  const attempt = await prisma.assessmentAttempt.create({
    data: {
      childId,
      levelId,
      pathway,
      status: "IN_PROGRESS",
      totalQuestions: MASTERY_TOTAL_QUESTIONS,
      currentRound: 1,
      attemptNumber: priorCount + 1
    }
  });

  for (let i = 0; i < picks.length; i++) {
    const pick = picks[i]!;
    const { logId } = await ensureQuestionLog(levelId, pick.templateKey, pick.seed);
    await prisma.assessmentAnswer.create({
      data: {
        attemptId: attempt.id,
        questionLogId: logId,
        roundNumber: roundNumberForQuestionIndex(i),
        positionInRound: positionInRoundForQuestionIndex(i)
      }
    });
  }

  return attempt;
}

export interface MasteryRoundSummary {
  attempt: NonNullable<Awaited<ReturnType<typeof prisma.assessmentAttempt.findUnique>>>;
  slots: Array<{
    roundNumber: number;
    positionInRound: number;
    logId: string;
    locked: boolean;
    isCorrect: boolean | null;
  }>;
}

export async function getMasteryState(attemptId: string) {
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: { answers: { orderBy: [{ roundNumber: "asc" }, { positionInRound: "asc" }] } }
  });
  return attempt;
}

export async function getMasteryQuestionView(logId: string): Promise<StoredQuestionView> {
  const log = await prisma.generatedQuestionLog.findUniqueOrThrow({ where: { id: logId } });
  return logToView(log);
}

export interface MasteryAnswerResult {
  isCorrect: boolean;
  support: WrongAnswerSupport | null;
  roundComplete: boolean;
}

export async function submitMasteryAnswer(params: {
  childId: string;
  attemptId: string;
  roundNumber: number;
  positionInRound: number;
  givenAnswer: string;
}): Promise<MasteryAnswerResult> {
  const { childId, attemptId, roundNumber, positionInRound, givenAnswer } = params;

  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.status === "SUBMITTED") throw new Error("This Mastery Challenge has already been submitted.");

  const slot = await prisma.assessmentAnswer.findUniqueOrThrow({
    where: { attemptId_roundNumber_positionInRound: { attemptId, roundNumber, positionInRound } },
    include: { questionLog: { include: { template: true } } }
  });
  if (slot.locked) {
    throw new Error("This question has already been answered — only the first submitted answer counts.");
  }

  const isCorrect = gradeAnswer(givenAnswer, slot.questionLog.correctAnswer, slot.questionLog.acceptableAnswers);

  await prisma.assessmentAnswer.update({
    where: { id: slot.id },
    data: { givenAnswer, isCorrect, locked: true, answeredAt: new Date() }
  });

  await prisma.generatedQuestionLog.update({
    where: { id: slot.questionLogId },
    data: {
      timesServed: { increment: 1 },
      timesCorrectFirstTry: { increment: isCorrect ? 1 : 0 },
      timesIncorrectFirstTry: { increment: isCorrect ? 0 : 1 }
    }
  });

  await recordObjectiveProgress({
    childId,
    objectiveId: slot.questionLog.template.objectiveId,
    isFirstAttempt: true,
    isCorrect,
    hintsUsed: 0
  });

  let support: WrongAnswerSupport | null = null;
  if (!isCorrect) {
    support = buildWrongAnswerSupport(
      {
        explanationSteps: JSON.parse(slot.questionLog.explanationSteps),
        hints: JSON.parse(slot.questionLog.hints),
        misconceptionTag: slot.questionLog.misconceptionTag
      },
      1
    );
    if (slot.questionLog.misconceptionTag) {
      await recordMisconception({
        childId,
        tag: slot.questionLog.misconceptionTag,
        objectiveId: slot.questionLog.template.objectiveId,
        levelId: slot.questionLog.template.levelId,
        context: `${slot.questionLog.template.generatorKey} (Mastery Challenge round ${roundNumber})`
      });
    }
  }

  const roundAnswers = await prisma.assessmentAnswer.findMany({ where: { attemptId, roundNumber } });
  const roundComplete = roundAnswers.every((a) => a.locked);
  if (roundComplete && attempt.currentRound === roundNumber && roundNumber < MASTERY_QUESTIONS_PER_ROUND) {
    await prisma.assessmentAttempt.update({ where: { id: attemptId }, data: { currentRound: roundNumber + 1 } });
  }

  return { isCorrect, support, roundComplete };
}

export async function pauseMasteryAttempt(attemptId: string) {
  await prisma.assessmentAttempt.update({ where: { id: attemptId }, data: { status: "PAUSED" } });
}

export async function resumeMasteryAttempt(attemptId: string) {
  await prisma.assessmentAttempt.update({ where: { id: attemptId }, data: { status: "IN_PROGRESS" } });
}

export interface FinalizeResult {
  correctFirstAttempt: number;
  scorePercentage: number;
  passed: boolean;
  unlockedNext: { year: number; level: number } | null;
  weakObjectives: Array<{ objectiveId: string; description: string; code: string }>;
}

export async function finalizeMasteryAttempt(childId: string, attemptId: string): Promise<FinalizeResult> {
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: {
      answers: { include: { questionLog: { include: { template: { include: { objective: true } } } } } },
      level: { include: { schoolYear: true } }
    }
  });
  if (attempt.status === "SUBMITTED") throw new Error("This Mastery Challenge has already been submitted.");

  const unanswered = attempt.answers.filter((a) => !a.locked);
  if (unanswered.length > 0) {
    throw new Error(`${unanswered.length} question(s) still need an answer before you can submit.`);
  }

  const correctFirstAttempt = attempt.answers.filter((a) => a.isCorrect === true).length;
  const scorePercentage = computeScorePercentage(correctFirstAttempt, attempt.totalQuestions);
  const passed = isMasteryPass(correctFirstAttempt, attempt.totalQuestions);

  await prisma.assessmentAttempt.update({
    where: { id: attemptId },
    data: { status: "SUBMITTED", submittedAt: new Date(), correctFirstAttempt, scorePercentage, passed }
  });

  const decision = decideUnlock(attempt.level.schoolYear.yearNumber, attempt.level.levelNumber, passed);
  let unlockedNext: { year: number; level: number } | null = null;

  if (decision.shouldUnlockNext && decision.nextLevel) {
    const nextLevelRow = await prisma.level.findFirst({
      where: { schoolYear: { yearNumber: decision.nextLevel.year }, levelNumber: decision.nextLevel.level }
    });
    if (nextLevelRow) {
      await prisma.levelUnlock.upsert({
        where: { childId_levelId: { childId, levelId: nextLevelRow.id } },
        create: { childId, levelId: nextLevelRow.id, unlockedByAssessmentId: attemptId },
        update: {}
      });
      unlockedNext = decision.nextLevel;
    }
  }

  if (passed) {
    await prisma.achievement.upsert({
      where: { childId_key: { childId, key: `level_passed_${attempt.levelId}` } },
      create: {
        childId,
        key: `level_passed_${attempt.levelId}`,
        title: `${attempt.level.title} mastered!`,
        description: `Passed the Year ${attempt.level.schoolYear.yearNumber} Level ${attempt.level.levelNumber} Mastery Challenge with ${Math.round(scorePercentage)}%.`,
        iconKey: "star",
        certificateAvailable: true
      },
      update: {}
    });
    if (attempt.level.isMixedMastery) {
      await prisma.achievement.upsert({
        where: { childId_key: { childId, key: `year_complete_${attempt.level.schoolYearId}` } },
        create: {
          childId,
          key: `year_complete_${attempt.level.schoolYearId}`,
          title: `Year ${attempt.level.schoolYear.yearNumber} complete!`,
          description: `Completed every level in Year ${attempt.level.schoolYear.yearNumber}.`,
          iconKey: "trophy",
          certificateAvailable: true
        },
        update: {}
      });
    }
  }

  const weakObjectiveMap = new Map<string, { objectiveId: string; description: string; code: string }>();
  for (const a of attempt.answers) {
    if (!a.isCorrect) {
      const obj = a.questionLog.template.objective;
      weakObjectiveMap.set(obj.id, { objectiveId: obj.id, description: obj.description, code: obj.code });
    }
  }

  return { correctFirstAttempt, scorePercentage, passed, unlockedNext, weakObjectives: Array.from(weakObjectiveMap.values()) };
}
