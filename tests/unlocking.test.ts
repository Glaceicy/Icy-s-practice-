import { describe, expect, it } from "vitest";
import { applyUnlock, decideUnlock } from "@/lib/unlocking";

describe("level unlocking rules (spec §2, §16)", () => {
  it("does not unlock the next level on a failed attempt", () => {
    const decision = decideUnlock(1, 3, false);
    expect(decision.shouldUnlockNext).toBe(false);
    expect(decision.nextLevel).toBeNull();
  });

  it("unlocks the next level within the same year on a pass", () => {
    const decision = decideUnlock(3, 4, true);
    expect(decision.shouldUnlockNext).toBe(true);
    expect(decision.nextLevel).toEqual({ year: 3, level: 5 });
  });

  it("passing level 10 unlocks level 1 of the next school year", () => {
    const decision = decideUnlock(4, 10, true);
    expect(decision.shouldUnlockNext).toBe(true);
    expect(decision.nextLevel).toEqual({ year: 5, level: 1 });
  });

  it("passing Year 10 Level 10 completes the programme (nothing further to unlock)", () => {
    const decision = decideUnlock(10, 10, true);
    expect(decision.shouldUnlockNext).toBe(false);
    expect(decision.nextLevel).toBeNull();
  });

  it("a level can never be unlocked twice — the idempotent unlock helper is a no-op on repeat", () => {
    const first = applyUnlock(new Set(), "Y1L2");
    expect(first.created).toBe(true);
    expect(first.unlockedLevelIds.has("Y1L2")).toBe(true);

    const second = applyUnlock(first.unlockedLevelIds, "Y1L2");
    expect(second.created).toBe(false);
    expect(second.unlockedLevelIds.size).toBe(1);
  });

  it("unlocking two different levels both persist independently", () => {
    let unlocked = new Set<string>();
    unlocked = applyUnlock(unlocked, "Y1L1").unlockedLevelIds;
    unlocked = applyUnlock(unlocked, "Y1L2").unlockedLevelIds;
    expect(unlocked.size).toBe(2);
  });
});
