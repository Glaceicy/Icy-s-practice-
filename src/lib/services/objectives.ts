import { prisma } from "@/lib/db";
import type { MasteryStatus } from "@/lib/types";

function statusFor(accuracy: number, totalAttempts: number): MasteryStatus {
  if (totalAttempts === 0) return "NOT_STARTED";
  if (totalAttempts < 3) return "DEVELOPING";
  if (accuracy >= 0.9) return "MASTERED";
  if (accuracy >= 0.7) return "SECURE";
  return "DEVELOPING";
}

/** Updates the per-objective mastery record used for personalisation: skills
 * mastered/developing, first-attempt accuracy, hints used, spaced-review
 * scheduling (spec §8). Called after every scored practice/assessment
 * answer. */
export async function recordObjectiveProgress(params: {
  childId: string;
  objectiveId: string;
  isFirstAttempt: boolean;
  isCorrect: boolean;
  hintsUsed: number;
}): Promise<void> {
  const { childId, objectiveId, isFirstAttempt, isCorrect, hintsUsed } = params;

  const existing = await prisma.objectiveMastery.findUnique({
    where: { childId_objectiveId: { childId, objectiveId } }
  });

  const totalAttempts = (existing?.totalAttempts ?? 0) + 1;
  const totalCorrect = (existing?.totalCorrect ?? 0) + (isCorrect ? 1 : 0);
  const priorFirstAttempts = existing ? Math.round((existing.firstAttemptAccuracy || 0) * (existing.totalAttempts || 0)) : 0;
  const firstAttemptNumerator = priorFirstAttempts + (isFirstAttempt && isCorrect ? 1 : 0);
  const firstAttemptAccuracy = totalAttempts > 0 ? firstAttemptNumerator / totalAttempts : 0;
  const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;
  const status = statusFor(accuracy, totalAttempts);

  const nextSpacedReviewAt =
    status === "MASTERED"
      ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      : status === "SECURE"
        ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        : null;

  await prisma.objectiveMastery.upsert({
    where: { childId_objectiveId: { childId, objectiveId } },
    create: {
      childId,
      objectiveId,
      status,
      firstAttemptAccuracy,
      totalAttempts,
      totalCorrect,
      hintsUsed: hintsUsed,
      lastPracticedAt: new Date(),
      nextSpacedReviewAt
    },
    update: {
      status,
      firstAttemptAccuracy,
      totalAttempts,
      totalCorrect,
      hintsUsed: { increment: hintsUsed },
      lastPracticedAt: new Date(),
      nextSpacedReviewAt
    }
  });
}

export async function recordMisconception(params: {
  childId: string;
  tag: string;
  objectiveId?: string;
  levelId?: string;
  context: string;
}): Promise<void> {
  await prisma.misconceptionLog.create({ data: params });
}
