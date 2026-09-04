"use server";

import { prisma } from "@/lib/db";
import { requireActiveChild } from "@/lib/auth";
import {
  getExcludedKeysForChild,
  getNextPracticeQuestion,
  getWeakObjectiveCodes,
  startPracticeAttempt,
  submitPracticeAnswer,
  type NextPracticeQuestion,
  type PracticeAnswerResult
} from "@/lib/services/practice";
import {
  getActiveOrNewMasteryAttempt,
  getMasteryQuestionView,
  getMasteryState,
  finalizeMasteryAttempt,
  pauseMasteryAttempt,
  resumeMasteryAttempt,
  submitMasteryAnswer,
  type FinalizeResult,
  type MasteryAnswerResult
} from "@/lib/services/mastery";
import { logToView, type StoredQuestionView } from "@/lib/services/questionLog";
import type { Pathway, PracticeMode } from "@/lib/types";

async function levelContext(levelId: string) {
  const level = await prisma.level.findUniqueOrThrow({ where: { id: levelId }, include: { schoolYear: true } });
  const levelKey = `Y${level.schoolYear.yearNumber}L${level.levelNumber}`;
  return { level, levelKey };
}

async function verifyUnlocked(childId: string, levelId: string) {
  const unlock = await prisma.levelUnlock.findUnique({ where: { childId_levelId: { childId, levelId } } });
  if (!unlock) throw new Error("This level is locked.");
}

export async function beginPracticeAction(levelId: string, mode: PracticeMode): Promise<{ attemptId: string }> {
  const { child } = await requireActiveChild();
  await verifyUnlocked(child.id, levelId);

  const existing = await prisma.practiceAttempt.findFirst({
    where: { childId: child.id, levelId, mode, completedAt: null },
    orderBy: { startedAt: "desc" }
  });
  if (existing) return { attemptId: existing.id };

  const { levelKey } = await levelContext(levelId);
  const attempt = await startPracticeAttempt(child.id, levelId, levelKey, child.pathway as Pathway, mode);
  return { attemptId: attempt.id };
}

export interface PracticeQuestionPayload {
  done: boolean;
  position: number;
  totalQuestions: number;
  question?: StoredQuestionView;
  triesSoFar?: number;
  remaining?: number;
}

export async function fetchNextPracticeQuestionAction(attemptId: string): Promise<PracticeQuestionPayload> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.practiceAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");

  const { levelKey } = await levelContext(attempt.levelId);
  const exclude = await getExcludedKeysForChild(child.id, attempt.levelId);
  const objectiveCodes = attempt.mode === "REVISION" ? await getWeakObjectiveCodes(child.id, attempt.levelId) : undefined;
  const next: NextPracticeQuestion = await getNextPracticeQuestion(attemptId, attempt.levelId, levelKey, child.pathway as Pathway, exclude, objectiveCodes);

  if (next.done || !next.logId || !next.instance) {
    return { done: true, position: next.position, totalQuestions: next.totalQuestions };
  }

  const log = await prisma.generatedQuestionLog.findUniqueOrThrow({ where: { id: next.logId } });
  return {
    done: false,
    position: next.position,
    totalQuestions: next.totalQuestions,
    question: logToView(log),
    triesSoFar: next.triesSoFar,
    remaining: next.remaining
  };
}

export async function submitPracticeAnswerAction(
  attemptId: string,
  position: number,
  logId: string,
  givenAnswer: string,
  hintsUsed: number
): Promise<PracticeAnswerResult> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.practiceAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  return submitPracticeAnswer({ childId: child.id, attemptId, position, logId, givenAnswer, hintsUsed });
}

// ---------------------------------------------------------------------------
// Mastery Challenge
// ---------------------------------------------------------------------------

export interface MasterySlotPayload {
  roundNumber: number;
  positionInRound: number;
  locked: boolean;
  isCorrect: boolean | null;
}

export interface MasteryStatePayload {
  attemptId: string;
  status: string;
  currentRound: number;
  totalQuestions: number;
  slots: MasterySlotPayload[];
  pathway: string;
}

export async function beginMasteryAction(levelId: string): Promise<MasteryStatePayload> {
  const { child } = await requireActiveChild();
  await verifyUnlocked(child.id, levelId);
  const { levelKey } = await levelContext(levelId);
  const attempt = await getActiveOrNewMasteryAttempt(child.id, levelId, levelKey, child.pathway as Pathway);
  return loadMasteryState(attempt.id);
}

async function loadMasteryState(attemptId: string): Promise<MasteryStatePayload> {
  const attempt = await getMasteryState(attemptId);
  return {
    attemptId: attempt.id,
    status: attempt.status,
    currentRound: attempt.currentRound,
    totalQuestions: attempt.totalQuestions,
    pathway: attempt.pathway,
    slots: attempt.answers.map((a) => ({
      roundNumber: a.roundNumber,
      positionInRound: a.positionInRound,
      locked: a.locked,
      isCorrect: a.isCorrect
    }))
  };
}

export async function getMasteryStateAction(attemptId: string): Promise<MasteryStatePayload> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  return loadMasteryState(attemptId);
}

export async function getMasteryQuestionAction(attemptId: string, roundNumber: number, positionInRound: number) {
  const { child } = await requireActiveChild();
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  const slot = await prisma.assessmentAnswer.findUniqueOrThrow({
    where: { attemptId_roundNumber_positionInRound: { attemptId, roundNumber, positionInRound } }
  });
  const view = await getMasteryQuestionView(slot.questionLogId);
  return { question: view, locked: slot.locked, isCorrect: slot.isCorrect };
}

export async function submitMasteryAnswerAction(
  attemptId: string,
  roundNumber: number,
  positionInRound: number,
  givenAnswer: string
): Promise<MasteryAnswerResult> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  return submitMasteryAnswer({ childId: child.id, attemptId, roundNumber, positionInRound, givenAnswer });
}

export async function pauseMasteryAction(attemptId: string): Promise<void> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  await pauseMasteryAttempt(attemptId);
}

export async function resumeMasteryAction(attemptId: string): Promise<void> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  await resumeMasteryAttempt(attemptId);
}

export async function finalizeMasteryAction(attemptId: string): Promise<FinalizeResult> {
  const { child } = await requireActiveChild();
  const attempt = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
  if (attempt.childId !== child.id) throw new Error("FORBIDDEN");
  return finalizeMasteryAttempt(child.id, attemptId);
}
