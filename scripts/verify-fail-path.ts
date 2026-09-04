/* eslint-disable no-console */
// Verifies the "score below 95%" path (spec §5) directly against the service
// layer: a failed Mastery Challenge must NOT unlock the next level, must
// surface targeted weak objectives, and a fresh follow-up attempt must be
// answerable (using a new, non-repeating set of questions where possible).
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getActiveOrNewMasteryAttempt, submitMasteryAnswer, finalizeMasteryAttempt } from "../src/lib/services/mastery";
import { getWeakObjectiveCodes } from "../src/lib/services/practice";

const prisma = new PrismaClient();

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`ASSERTION FAILED: ${msg}`);
}

async function main() {
  const year1 = await prisma.schoolYear.findUniqueOrThrow({ where: { yearNumber: 1 } });
  const level1 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year1.id, levelNumber: 1 } });
  const level2 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year1.id, levelNumber: 2 } });

  const adult = await prisma.adultUser.create({
    data: { email: `fail-path-${Date.now()}@example.test`, passwordHash: await bcrypt.hash("x", 4), fullName: "Fail Path Tester", role: "PARENT", consentGivenAt: new Date() }
  });
  const child = await prisma.childProfile.create({
    data: { ownerId: adult.id, displayName: "Fail Path Child", avatarKey: "owl", pinHash: await bcrypt.hash("1111", 4), currentYearId: year1.id, pathway: "CORE" }
  });
  await prisma.levelUnlock.create({ data: { childId: child.id, levelId: level1.id } });

  console.log("1. Attempt 1: deliberately fail with 20/40 correct (50%)...");
  const attempt1 = await getActiveOrNewMasteryAttempt(child.id, level1.id, "Y1L1", "CORE");
  const state1 = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt1.id }, include: { answers: true } });
  let i = 0;
  for (const slot of state1.answers.sort((a, b) => a.roundNumber - b.roundNumber || a.positionInRound - b.positionInRound)) {
    const log = await prisma.generatedQuestionLog.findUniqueOrThrow({ where: { id: slot.questionLogId } });
    const wantCorrect = i < 20;
    const given = wantCorrect ? log.correctAnswer : "___wrong___";
    await submitMasteryAnswer({ childId: child.id, attemptId: attempt1.id, roundNumber: slot.roundNumber, positionInRound: slot.positionInRound, givenAnswer: given });
    i++;
  }
  const result1 = await finalizeMasteryAttempt(child.id, attempt1.id);
  console.log(`   Score: ${result1.correctFirstAttempt}/40 = ${result1.scorePercentage}%, passed=${result1.passed}`);
  assert(result1.correctFirstAttempt === 20, "expected exactly 20 correct");
  assert(result1.scorePercentage === 50, "expected 50%");
  assert(result1.passed === false, "20/40 (50%) must NOT pass");
  assert(result1.unlockedNext === null, "a failed attempt must not report an unlocked next level");
  assert(result1.weakObjectives.length > 0, "failed attempt should identify weak objectives");
  console.log(`   OK - correctly failed. Weak objectives identified: ${result1.weakObjectives.map((o) => o.code).join(", ")}`);

  console.log("2. Confirming Level 2 was NOT unlocked in the database...");
  const unlock = await prisma.levelUnlock.findUnique({ where: { childId_levelId: { childId: child.id, levelId: level2.id } } });
  assert(!unlock, "Level 2 must remain locked after a failed Mastery Challenge");
  console.log("   OK - Level 2 remains locked");

  console.log("3. Personalised revision: targeted questions from the weak objectives...");
  const weakCodes = await getWeakObjectiveCodes(child.id, level1.id);
  assert(weakCodes.length > 0, "getWeakObjectiveCodes should return the same weak objectives");
  console.log(`   OK - revision would target: ${weakCodes.join(", ")}`);

  console.log("4. Attempt 2: a fresh 40-question set is available, and this time we pass with 38/40...");
  const attempt2 = await getActiveOrNewMasteryAttempt(child.id, level1.id, "Y1L1", "CORE");
  assert(attempt2.id !== attempt1.id, "a new attempt must be created, not the same submitted one");
  assert(attempt2.attemptNumber === 2, "this should be attempt number 2");
  const state2 = await prisma.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt2.id }, include: { answers: true } });
  let j = 0;
  for (const slot of state2.answers.sort((a, b) => a.roundNumber - b.roundNumber || a.positionInRound - b.positionInRound)) {
    const log = await prisma.generatedQuestionLog.findUniqueOrThrow({ where: { id: slot.questionLogId } });
    const wantCorrect = j < 38;
    const given = wantCorrect ? log.correctAnswer : "___wrong___";
    await submitMasteryAnswer({ childId: child.id, attemptId: attempt2.id, roundNumber: slot.roundNumber, positionInRound: slot.positionInRound, givenAnswer: given });
    j++;
  }
  const result2 = await finalizeMasteryAttempt(child.id, attempt2.id);
  console.log(`   Score: ${result2.correctFirstAttempt}/40 = ${result2.scorePercentage}%, passed=${result2.passed}`);
  assert(result2.correctFirstAttempt === 38, "expected exactly 38 correct");
  assert(result2.scorePercentage === 95, "expected exactly 95%");
  assert(result2.passed === true, "38/40 (95%) must pass");
  assert(result2.unlockedNext?.year === 1 && result2.unlockedNext?.level === 2, "should unlock Year 1 Level 2");
  console.log("   OK - 38/40 = 95% passes and unlocks Level 2");

  console.log("5. Both attempts remain in the child's permanent progress history...");
  const allAttempts = await prisma.assessmentAttempt.findMany({ where: { childId: child.id, levelId: level1.id }, orderBy: { attemptNumber: "asc" } });
  assert(allAttempts.length === 2, "both the failed and passed attempts must be kept in history");
  assert(allAttempts[0]!.passed === false && allAttempts[1]!.passed === true, "history should show fail then pass");
  console.log("   OK - full attempt history preserved (spec §5: 'Keep all previous attempts in the progress history')");

  console.log("\n✅ FAIL -> REVISION -> RETRY -> PASS PATH VERIFIED (spec §5, §16).");
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("\n❌ FAILED:", err);
  await prisma.$disconnect();
  process.exit(1);
});
