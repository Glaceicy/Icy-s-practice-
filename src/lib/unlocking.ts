import { nextLevelRef } from "./curriculum";

export interface LevelRef {
  year: number;
  level: number;
}

export interface UnlockDecision {
  shouldUnlockNext: boolean;
  nextLevel: LevelRef | null;
  reason: string;
}

/** Pure decision: given a pass/fail outcome for (year, level), decide whether
 * — and which — next level should be unlocked. Does not touch storage; the
 * caller is responsible for actually persisting the unlock exactly once
 * (enforced additionally at the schema level by LevelUnlock's
 * @@unique([childId, levelId]) constraint, so a level can never be unlocked
 * twice even under concurrent requests). */
export function decideUnlock(yearNumber: number, levelNumber: number, passed: boolean): UnlockDecision {
  if (!passed) {
    return { shouldUnlockNext: false, nextLevel: null, reason: "Mastery Challenge was not passed (score below 95%)." };
  }
  const next = nextLevelRef(yearNumber, levelNumber);
  if (!next) {
    return { shouldUnlockNext: false, nextLevel: null, reason: "Year 10 Level 10 passed — the full Maths Journey programme is complete." };
  }
  return { shouldUnlockNext: true, nextLevel: next, reason: `Passed with >=95% — Year ${next.year} Level ${next.level} unlocked.` };
}

/** Idempotent unlock-set helper used by both the in-memory tests and the
 * Prisma-backed service (which additionally relies on the DB unique
 * constraint as a second, authoritative line of defence against duplicates
 * under concurrent requests). */
export function applyUnlock(existingUnlockedLevelIds: ReadonlySet<string>, targetLevelId: string): { unlockedLevelIds: Set<string>; created: boolean } {
  if (existingUnlockedLevelIds.has(targetLevelId)) {
    return { unlockedLevelIds: new Set(existingUnlockedLevelIds), created: false };
  }
  const next = new Set(existingUnlockedLevelIds);
  next.add(targetLevelId);
  return { unlockedLevelIds: next, created: true };
}
