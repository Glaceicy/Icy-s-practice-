/**
 * Gives the seeded demo child a believable history, so a demo or a screenshot
 * shows the app being used rather than a wall of padlocks.
 *
 *   npm run db:seed    # first — this builds on the demo accounts it creates
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/seed-demo-progress.ts
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/seed-demo-progress.ts --year 7
 *
 * Writes progress rows for the first demo child only. Never run it against a
 * database with real families in it: it fabricates assessment attempts, which
 * is exactly the data a parent is being asked to trust.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Finished levels and the score each was passed with, then one more unlocked
 * and waiting — the shape a real child's journey has partway through a year. */
const PASSED_SCORES = [100, 97.5, 95];

function parseYear(argv: string[]): number {
  const i = argv.indexOf("--year");
  const raw = i === -1 ? "4" : argv[i + 1];
  const year = Number(raw);
  if (!Number.isInteger(year) || year < 1 || year > 10) throw new Error(`--year must be 1-10, got "${raw}"`);
  return year;
}

async function main() {
  const year = parseYear(process.argv.slice(2));

  const child = await prisma.childProfile.findFirst({ orderBy: { createdAt: "asc" } });
  if (!child) throw new Error("No child profiles found — run `npm run db:seed` first.");

  const schoolYear = await prisma.schoolYear.findFirst({ where: { yearNumber: year } });
  if (!schoolYear) throw new Error(`Year ${year} is not in the database — run \`npm run db:seed\` first.`);

  await prisma.childProfile.update({ where: { id: child.id }, data: { currentYearId: schoolYear.id } });

  const levels = await prisma.level.findMany({
    where: { schoolYearId: schoolYear.id },
    orderBy: { levelNumber: "asc" },
    take: PASSED_SCORES.length + 1
  });

  for (const [i, level] of levels.entries()) {
    await prisma.levelUnlock.upsert({
      where: { childId_levelId: { childId: child.id, levelId: level.id } },
      create: { childId: child.id, levelId: level.id },
      update: {}
    });

    const score = PASSED_SCORES[i];
    if (score === undefined) continue; // the last one is unlocked but not yet attempted

    const already = await prisma.assessmentAttempt.findFirst({ where: { childId: child.id, levelId: level.id } });
    if (already) continue; // re-running should not pile up duplicate attempts

    await prisma.assessmentAttempt.create({
      data: {
        childId: child.id,
        levelId: level.id,
        attemptNumber: 1,
        status: "SUBMITTED",
        submittedAt: new Date(),
        currentRound: 4,
        correctFirstAttempt: Math.round((score / 100) * 40),
        scorePercentage: score,
        passed: true
      }
    });
  }

  console.log(
    `${child.displayName}: now in Year ${year}, levels 1-${PASSED_SCORES.length} passed, level ${PASSED_SCORES.length + 1} unlocked.`
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
