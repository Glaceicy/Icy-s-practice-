import { prisma } from "@/lib/db";
import { misconceptionLabel } from "@/lib/types";

export interface ChildSummary {
  childId: string;
  displayName: string;
  avatarKey: string;
  currentYearTitle: string;
  pathway: string;
  levelsUnlocked: number;
  levelsPassed: number;
  totalAssessmentAttempts: number;
  averageScorePercentage: number | null;
  minutesSpent: number;
  strengths: Array<{ description: string; status: string }>;
  developing: Array<{ description: string; status: string }>;
  topMisconceptions: Array<{ label: string; count: number }>;
  recentAttempts: Array<{ id: string; levelTitle: string; yearNumber: number; levelNumber: number; scorePercentage: number | null; passed: boolean | null; submittedAt: Date | null }>;
}

export async function getChildSummary(childId: string): Promise<ChildSummary> {
  const child = await prisma.childProfile.findUniqueOrThrow({ where: { id: childId }, include: { currentYear: true } });

  const [unlocks, submittedAttempts, practiceAttempts, masteryRecords, misconceptions] = await Promise.all([
    prisma.levelUnlock.count({ where: { childId } }),
    prisma.assessmentAttempt.findMany({
      where: { childId, status: "SUBMITTED" },
      include: { level: { include: { schoolYear: true } } },
      orderBy: { submittedAt: "desc" }
    }),
    prisma.practiceAttempt.findMany({ where: { childId, completedAt: { not: null } } }),
    prisma.objectiveMastery.findMany({ where: { childId }, include: { objective: true } }),
    prisma.misconceptionLog.groupBy({ by: ["tag"], where: { childId }, _count: { tag: true }, orderBy: { _count: { tag: "desc" } }, take: 5 })
  ]);

  const passed = submittedAttempts.filter((a) => a.passed);
  const scores = submittedAttempts.filter((a) => a.scorePercentage !== null).map((a) => a.scorePercentage!);
  const averageScorePercentage = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

  let minutesSpent = 0;
  for (const a of submittedAttempts) {
    if (a.submittedAt) minutesSpent += (a.submittedAt.getTime() - a.startedAt.getTime()) / 60000;
  }
  for (const p of practiceAttempts) {
    if (p.completedAt) minutesSpent += (p.completedAt.getTime() - p.startedAt.getTime()) / 60000;
  }

  const strengths = masteryRecords
    .filter((m) => m.status === "MASTERED" || m.status === "SECURE")
    .map((m) => ({ description: m.objective.description, status: m.status }))
    .slice(0, 8);
  const developing = masteryRecords
    .filter((m) => m.status === "DEVELOPING")
    .map((m) => ({ description: m.objective.description, status: m.status }))
    .slice(0, 8);

  return {
    childId,
    displayName: child.displayName,
    avatarKey: child.avatarKey,
    currentYearTitle: child.currentYear.title,
    pathway: child.pathway,
    levelsUnlocked: unlocks,
    levelsPassed: passed.length,
    totalAssessmentAttempts: submittedAttempts.length,
    averageScorePercentage,
    minutesSpent: Math.round(minutesSpent),
    strengths,
    developing,
    topMisconceptions: misconceptions.map((m) => ({ label: misconceptionLabel(m.tag), count: m._count.tag })),
    recentAttempts: submittedAttempts.slice(0, 10).map((a) => ({
      id: a.id,
      levelTitle: a.level.title,
      yearNumber: a.level.schoolYear.yearNumber,
      levelNumber: a.level.levelNumber,
      scorePercentage: a.scorePercentage,
      passed: a.passed,
      submittedAt: a.submittedAt
    }))
  };
}
