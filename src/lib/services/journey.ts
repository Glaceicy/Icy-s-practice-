import { prisma } from "@/lib/db";

export interface LevelStatusView {
  levelId: string;
  levelNumber: number;
  title: string;
  summary: string;
  isMixedMastery: boolean;
  contentStatus: string;
  unlocked: boolean;
  passed: boolean;
  bestScorePercentage: number | null;
  attemptCount: number;
}

export interface YearProgressView {
  yearNumber: number;
  yearId: string;
  title: string;
  summary: string;
  keyStage: string;
  themeStage: string;
  levels: LevelStatusView[];
  levelsUnlockedCount: number;
  levelsPassedCount: number;
  isCurrentYear: boolean;
}

export async function getJourneyForChild(childId: string): Promise<YearProgressView[]> {
  const [years, child, unlocks, submittedAttempts] = await Promise.all([
    prisma.schoolYear.findMany({ orderBy: { yearNumber: "asc" }, include: { levels: { orderBy: { levelNumber: "asc" } } } }),
    prisma.childProfile.findUniqueOrThrow({ where: { id: childId } }),
    prisma.levelUnlock.findMany({ where: { childId } }),
    prisma.assessmentAttempt.findMany({ where: { childId, status: "SUBMITTED" } })
  ]);

  const unlockedIds = new Set(unlocks.map((u) => u.levelId));
  const bestScoreByLevel = new Map<string, number>();
  const passedByLevel = new Set<string>();
  const attemptCountByLevel = new Map<string, number>();

  for (const a of submittedAttempts) {
    attemptCountByLevel.set(a.levelId, (attemptCountByLevel.get(a.levelId) ?? 0) + 1);
    if (a.scorePercentage !== null) {
      bestScoreByLevel.set(a.levelId, Math.max(bestScoreByLevel.get(a.levelId) ?? 0, a.scorePercentage));
    }
    if (a.passed) passedByLevel.add(a.levelId);
  }

  return years.map((year) => {
    const levels: LevelStatusView[] = year.levels.map((level) => ({
      levelId: level.id,
      levelNumber: level.levelNumber,
      title: level.title,
      summary: level.summary,
      isMixedMastery: level.isMixedMastery,
      contentStatus: level.status,
      unlocked: unlockedIds.has(level.id),
      passed: passedByLevel.has(level.id),
      bestScorePercentage: bestScoreByLevel.get(level.id) ?? null,
      attemptCount: attemptCountByLevel.get(level.id) ?? 0
    }));

    return {
      yearNumber: year.yearNumber,
      yearId: year.id,
      title: year.title,
      summary: year.summary,
      keyStage: year.keyStage,
      themeStage: year.themeStage,
      levels,
      levelsUnlockedCount: levels.filter((l) => l.unlocked).length,
      levelsPassedCount: levels.filter((l) => l.passed).length,
      isCurrentYear: year.id === child.currentYearId
    };
  });
}
