import { describe, expect, it } from "vitest";
import { hashSeed, MAX_SEED, mulberry32 } from "@/lib/questionEngine/rng";

describe("hashSeed", () => {
  it("stays inside the range a seed column can hold", () => {
    // The redo round writes a hashed seed to GeneratedQuestionLog.seed, a
    // signed 32-bit column. An unsigned 32-bit hash overflows it about half
    // the time, and Postgres rejects the query rather than truncating — which
    // locked a child out of any Mastery Challenge they had failed.
    for (let i = 0; i < 20000; i++) {
      const seed = hashSeed(`attempt${i}:redo:y5l3.multiplyBy100:${i * 7}`);
      expect(Number.isInteger(seed)).toBe(true);
      expect(seed).toBeGreaterThanOrEqual(0);
      expect(seed).toBeLessThanOrEqual(MAX_SEED);
    }
  });

  it("is stable for the same input", () => {
    expect(hashSeed("y5l3:attempt1")).toBe(hashSeed("y5l3:attempt1"));
  });

  it("separates inputs that differ only slightly", () => {
    expect(hashSeed("y5l3:attempt1")).not.toBe(hashSeed("y5l3:attempt2"));
  });

  it("still spreads across the range after the mask", () => {
    // Losing the top bit must not collapse the hash into a corner of the
    // range, or seeds would collide and children would see repeat questions.
    const buckets = new Array(16).fill(0);
    const total = 20000;
    for (let i = 0; i < total; i++) {
      buckets[Math.floor((hashSeed(`question-${i}`) / (MAX_SEED + 1)) * 16)]!++;
    }
    const expected = total / 16;
    for (const count of buckets) {
      expect(count).toBeGreaterThan(expected * 0.8);
      expect(count).toBeLessThan(expected * 1.2);
    }
  });
});

describe("mulberry32", () => {
  it("replays the same sequence from the same seed", () => {
    const a = mulberry32(12345);
    const b = mulberry32(12345);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("accepts the largest seed hashSeed can produce", () => {
    const next = mulberry32(MAX_SEED);
    const value = next();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(1);
  });
});
