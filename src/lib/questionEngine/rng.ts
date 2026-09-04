// Deterministic seeded pseudo-random number generator (mulberry32).
// Every generated question is produced from a pure function of (templateKey, seed),
// so the same seed always reproduces an identical, replayable question — required
// so stored answer keys and admin "frequently missed question" analytics stay valid.

export function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Rng {
  private next: () => number;

  constructor(seed: number) {
    this.next = mulberry32(seed);
  }

  /** Random float in [0, 1). */
  float(): number {
    return this.next();
  }

  /** Random integer in [min, max] inclusive. */
  int(min: number, max: number): number {
    if (max < min) throw new Error("Rng.int: max < min");
    return Math.floor(this.float() * (max - min + 1)) + min;
  }

  /** Pick a random element from a non-empty array. */
  pick<T>(items: readonly T[]): T {
    if (items.length === 0) throw new Error("Rng.pick: empty array");
    const item = items[this.int(0, items.length - 1)];
    if (item === undefined) throw new Error("Rng.pick: undefined item");
    return item;
  }

  /** Fisher-Yates shuffle, returns a new array (deterministic given seed state). */
  shuffle<T>(items: readonly T[]): T[] {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      const tmp = arr[i]!;
      arr[i] = arr[j]!;
      arr[j] = tmp;
    }
    return arr;
  }

  /** True with the given probability (0-1). */
  chance(p: number): boolean {
    return this.float() < p;
  }
}

export function seedFor(generatorKey: string, variationIndex: number): number {
  return (hashSeed(generatorKey) ^ hashSeed(`v${variationIndex}`)) >>> 0;
}
