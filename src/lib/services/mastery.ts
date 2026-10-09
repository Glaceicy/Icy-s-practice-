import { prisma } from "@/lib/db";
import { pickQuestions } from "@/lib/questionEngine/registry";
import { hashSeed } from "@/lib/questionEngine/rng";
import { ensureQuestionLog, gradeAnswer, logToView, getDisabledTemplateKeys, toWrongAnswerReviewItem, type StoredQuestionView, type WrongAnswerReviewItem } from "./questionLog";
import { recordObjectiveProgress, recordMisconception } from "./objectives";
import {
  MASTERY_QUESTIONS_PER_ROUND,
  MASTERY_ROUNDS,
  MASTERY_TOTAL_QUESTIONS,
  MASTERY_REDO_ROUND_NUMBER,
  MASTERY_REDO_FAIL_THRESHOLD,
  computeScorePercentage,
  isMasteryPass,
  roundNumberForQuestionIndex,
  positionInRoundForQuestionIndex
} from "@/lib/scoring";
import { decideUnlock } from "@/lib/unlocking";
import { getExcludedKeysForChild } from "./practice";
import type { Pathway } from "@/lib/types";
import type { Locale } from "@/lib/questionEngine/types";

export async function getActiveOrNewMasteryAttempt(childId: string, levelId: string, levelKey: string, pathway: Pathway, locale: Locale = "en") {
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
    const { logId } = await ensureQuestionLog(levelId, pick.templateKey, pick.seed, locale);
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

/** Once every main-round (1-4) question is locked, checks whether the child
 * is on track to fail (fewer than MASTERY_PASS_CORRECT right first-time) and,
 * if so, generates one freshly-seeded instance of each missed question as a
 * new "round 5" — the one redo chance — appending them to this same attempt
 * and growing `totalQuestions` to match. Idempotent: a second call on an
 * attempt that already has a redo round (or that passed outright) is a
 * no-op, so it's safe to call from every state read. Returns whether this
 * call is the one that just created the redo round, so the UI can show a
 * one-time "let's try those again" interstitial. */
async function injectRedoRoundIfNeeded(attemptId: string): Promise<boolean> {
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: { answers: { include: { questionLog: { include: { template: true } } } } }
  });
  if (attempt.status === "SUBMITTED") return false;

  const mainAnswers = attempt.answers.filter((a) => a.roundNumber <= MASTERY_ROUNDS);
  const allMainLocked = mainAnswers.length === MASTERY_TOTAL_QUESTIONS && mainAnswers.every((a) => a.locked);
  const redoAlreadyExists = attempt.answers.some((a) => a.roundNumber === MASTERY_REDO_ROUND_NUMBER);
  if (!allMainLocked || redoAlreadyExists) return false;

  const correctCount = mainAnswers.filter((a) => a.isCorrect === true).length;
  if (isMasteryPass(correctCount, mainAnswers.length)) return false; // passed outright — no redo needed

  const wrongAnswers = mainAnswers.filter((a) => a.isCorrect === false);

  // Every question is prepared before any of it is recorded. The guard above
  // treats "a redo question exists" as "the redo round is done", so a failure
  // part-way through would leave a short round that is never completed and a
  // totalQuestions that never matches the slots — permanently, since the next
  // load skips the injection entirely.
  const logIds: string[] = [];
  for (const wrong of wrongAnswers) {
    const generatorKey = wrong.questionLog.template.generatorKey;
    // A fresh seed for the same template/objective — tests the same skill
    // without the child simply having memorised the original question.
    const redoSeed = hashSeed(`${attemptId}:redo:${generatorKey}:${wrong.questionLog.seed}`);
    const { logId } = await ensureQuestionLog(attempt.levelId, generatorKey, redoSeed);
    logIds.push(logId);
  }

  await prisma.$transaction([
    ...logIds.map((questionLogId, i) =>
      prisma.assessmentAnswer.create({
        data: { attemptId, questionLogId, roundNumber: MASTERY_REDO_ROUND_NUMBER, positionInRound: i + 1 }
      })
    ),
    prisma.assessmentAttempt.update({
      where: { id: attemptId },
      data: { totalQuestions: { increment: wrongAnswers.length } }
    })
  ]);
  return true;
}

export async function getMasteryState(attemptId: string): Promise<{ attempt: NonNullable<Awaited<ReturnType<typeof prisma.assessmentAttempt.findUnique>>> & { answers: Awaited<ReturnType<typeof prisma.assessmentAnswer.findMany>> }; redoJustStarted: boolean }> {
  const redoJustStarted = await injectRedoRoundIfNeeded(attemptId);
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: { answers: { orderBy: [{ roundNumber: "asc" }, { positionInRound: "asc" }] } }
  });
  return { attempt, redoJustStarted };
}

export async function getMasteryQuestionView(logId: string, locale: Locale = "en"): Promise<StoredQuestionView> {
  const log = await prisma.generatedQuestionLog.findUniqueOrThrow({ where: { id: logId } });
  return logToView(log, locale);
}

export interface MasteryAnswerResult {
  isCorrect: boolean;
  roundComplete: boolean;
}

export async function submitMasteryAnswer(params: {
  childId: string;
  attemptId: string;
  roundNumber: number;
  positionInRound: number;
  givenAnswer: string;
  locale?: Locale;
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

  // Unlike practice modes, the Mastery Challenge never reveals the correct
  // answer or walks through an explanation when the child gets a question
  // wrong — it just records the miss (misconceptions are still logged here,
  // silently, for the parent's progress report) and moves on. The child
  // finds out which ones were wrong only via the review panel after
  // submitting, and gets one chance to redo exactly those questions before
  // the level counts as failed (see injectRedoRoundIfNeeded below).
  if (!isCorrect && slot.questionLog.misconceptionTag) {
    await recordMisconception({
      childId,
      tag: slot.questionLog.misconceptionTag,
      objectiveId: slot.questionLog.template.objectiveId,
      levelId: slot.questionLog.template.levelId,
      context: `${slot.questionLog.template.generatorKey} (Mastery Challenge round ${roundNumber})`
    });
  }

  const roundAnswers = await prisma.assessmentAnswer.findMany({ where: { attemptId, roundNumber } });
  const roundComplete = roundAnswers.every((a) => a.locked);
  if (roundComplete && attempt.currentRound === roundNumber && roundNumber < MASTERY_QUESTIONS_PER_ROUND) {
    await prisma.assessmentAttempt.update({ where: { id: attemptId }, data: { currentRound: roundNumber + 1 } });
  }

  return { isCorrect, roundComplete };
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
  redoApplied: boolean;
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

  // Score and pass/fail are always judged on the original 40 — the redo
  // round (if any) never counts toward "first attempt" scoring, only toward
  // whether the level as a whole is treated as passed.
  const mainAnswers = attempt.answers.filter((a) => a.roundNumber <= MASTERY_ROUNDS);
  const redoAnswers = attempt.answers.filter((a) => a.roundNumber === MASTERY_REDO_ROUND_NUMBER);
  const correctFirstAttempt = mainAnswers.filter((a) => a.isCorrect === true).length;
  const scorePercentage = computeScorePercentage(correctFirstAttempt, mainAnswers.length);
  const passedOutright = isMasteryPass(correctFirstAttempt, mainAnswers.length);
  const redoApplied = !passedOutright && redoAnswers.length > 0;
  const stillWrongAfterRedo = redoAnswers.filter((a) => a.isCorrect === false).length;
  const passed = passedOutright || (redoApplied && stillWrongAfterRedo < MASTERY_REDO_FAIL_THRESHOLD);

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
    const levelTitleFr = attempt.level.titleFr ?? attempt.level.title;
    await prisma.achievement.upsert({
      where: { childId_key: { childId, key: `level_passed_${attempt.levelId}` } },
      create: {
        childId,
        key: `level_passed_${attempt.levelId}`,
        title: `${attempt.level.title} mastered!`,
        titleFr: `${levelTitleFr} maîtrisé !`,
        description: `Passed the Year ${attempt.level.schoolYear.yearNumber} Level ${attempt.level.levelNumber} Mastery Challenge with ${Math.round(scorePercentage)}%.`,
        descriptionFr: `Défi de maîtrise réussi pour l'Année ${attempt.level.schoolYear.yearNumber}, Niveau ${attempt.level.levelNumber}, avec ${Math.round(scorePercentage)} %.`,
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
          titleFr: `Année ${attempt.level.schoolYear.yearNumber} terminée !`,
          description: `Completed every level in Year ${attempt.level.schoolYear.yearNumber}.`,
          descriptionFr: `Tous les niveaux de l'Année ${attempt.level.schoolYear.yearNumber} ont été complétés.`,
          iconKey: "trophy",
          certificateAvailable: true
        },
        update: {}
      });
    }
  }

  const weakObjectiveMap = new Map<string, { objectiveId: string; description: string; code: string }>();
  for (const a of mainAnswers) {
    if (a.isCorrect === false) {
      const obj = a.questionLog.template.objective;
      weakObjectiveMap.set(obj.id, { objectiveId: obj.id, description: obj.description, code: obj.code });
    }
  }
  if (redoApplied) {
    // An objective only comes off the weak list once every redo question for
    // it was answered correctly — one fixed instance doesn't clear an
    // objective that still tripped them up elsewhere.
    const redoCorrectByObjective = new Map<string, boolean>();
    for (const a of redoAnswers) {
      const objId = a.questionLog.template.objectiveId;
      redoCorrectByObjective.set(objId, (redoCorrectByObjective.get(objId) ?? true) && a.isCorrect === true);
    }
    for (const [objId, allCorrect] of redoCorrectByObjective) {
      if (allCorrect) weakObjectiveMap.delete(objId);
    }
  }

  return { correctFirstAttempt, scorePercentage, passed, redoApplied, unlockedNext, weakObjectives: Array.from(weakObjectiveMap.values()) };
}

/** Every question the child has answered wrong so far in this Mastery
 * Challenge attempt — usable both mid-challenge (spec: "review wrong
 * answers at any time") and on the results screen once submitted. Each
 * slot is answered at most once (locked immediately, no retries), so there
 * is no deduplication to do here, unlike practice attempts.
 *
 * Once a redo round (round 5) exists, it supersedes the original misses it
 * covers — a question fixed on the redo was, in the end, answered
 * correctly, so only the redo round's own still-wrong questions are shown
 * rather than the now-stale originals. */
export async function getWrongAnswersForMasteryAttempt(attemptId: string, locale: Locale = "en"): Promise<WrongAnswerReviewItem[]> {
  const hasRedoRound = (await prisma.assessmentAnswer.count({ where: { attemptId, roundNumber: MASTERY_REDO_ROUND_NUMBER } })) > 0;
  const rows = await prisma.assessmentAnswer.findMany({
    where: hasRedoRound ? { attemptId, roundNumber: MASTERY_REDO_ROUND_NUMBER, isCorrect: false } : { attemptId, isCorrect: false },
    include: { questionLog: true },
    orderBy: [{ roundNumber: "asc" }, { positionInRound: "asc" }]
  });
  return rows.map((row) => toWrongAnswerReviewItem(row.questionLog, row.givenAnswer ?? "", row.answeredAt, locale));
}
