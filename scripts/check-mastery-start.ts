/**
 * Starts a Mastery Challenge on every live level and reports the ones that
 * throw.
 *
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/check-mastery-start.ts
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/check-mastery-start.ts --pathway HIGHER
 *
 * Needs a seeded database (npm run db:seed) and writes to it, so point it at
 * a local one, never production.
 *
 * The Mastery Challenge is the only screen that builds its whole question set
 * before it renders — forty questions, each one persisted on first use. That
 * makes it the first place a level's content meets the database, and the only
 * place a per-level data fault shows up as a page that will not open at all.
 * The unit tests generate questions without ever writing one, so this is the
 * gap they cannot cover.
 */
import { PrismaClient } from "@prisma/client";
import { getActiveOrNewMasteryAttempt } from "../src/lib/services/mastery";
import { COMPLETE_LEVEL_KEYS, loadAllTemplates } from "../src/lib/questionEngine/templates/all";
import type { Pathway } from "../src/lib/types";

const prisma = new PrismaClient();

function parsePathway(argv: string[]): Pathway {
  const i = argv.indexOf("--pathway");
  const raw = (i === -1 ? "CORE" : argv[i + 1]) as Pathway;
  if (!["CORE", "FOUNDATION", "HIGHER"].includes(raw)) throw new Error(`--pathway must be CORE, FOUNDATION or HIGHER`);
  return raw;
}

async function main() {
  const pathway = parsePathway(process.argv.slice(2));
  loadAllTemplates();

  const child = await prisma.childProfile.findFirst({ orderBy: { createdAt: "asc" } });
  if (!child) throw new Error("No child profiles — run `npm run db:seed` first.");

  const failures: Array<{ levelKey: string; message: string }> = [];
  let checked = 0;

  for (const levelKey of COMPLETE_LEVEL_KEYS) {
    const m = levelKey.match(/^Y(\d+)L(\d+)$/);
    if (!m) continue;
    const level = await prisma.level.findFirst({
      where: { schoolYear: { yearNumber: Number(m[1]) }, levelNumber: Number(m[2]) }
    });
    if (!level) {
      failures.push({ levelKey, message: "level row missing from the database" });
      continue;
    }

    try {
      await getActiveOrNewMasteryAttempt(child.id, level.id, levelKey, pathway, "en");
      checked++;
    } catch (e) {
      failures.push({ levelKey, message: e instanceof Error ? e.message.split("\n")[0]! : String(e) });
    }
  }

  console.log(`\n${checked} level(s) opened cleanly, ${failures.length} failed (pathway ${pathway}).`);
  for (const f of failures) console.log(`  ${f.levelKey}: ${f.message}`);
  process.exitCode = failures.length ? 1 : 0;
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
