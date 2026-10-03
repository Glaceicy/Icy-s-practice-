/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { COMPLETE_LEVEL_KEYS, loadAllTemplates } from "../src/lib/questionEngine/templates/all";
import { getTemplatesForLevel } from "../src/lib/questionEngine/registry";
import { syncCurriculumFromCode, syncLessonsFromCode } from "../src/lib/services/curriculumSync";

const prisma = new PrismaClient();

async function seedCurriculum() {
  console.log("Seeding curriculum: 10 school years, 100 levels, learning objectives...");
  const { years, levels, objectives } = await syncCurriculumFromCode(prisma);
  console.log(`Curriculum seeded: ${years} years, ${levels} levels, ${objectives} objectives.`);
}

async function seedLessons() {
  console.log("Seeding mini-lessons for flagship complete levels...");
  const { lessons } = await syncLessonsFromCode(prisma);
  console.log(`Lessons seeded: ${lessons}.`);
}

async function warmQuestionBank() {
  console.log("Warming the question bank for admin review (first 5 variations per template)...");
  loadAllTemplates();
  for (const levelKey of COMPLETE_LEVEL_KEYS) {
    const [yearStr, levelStr] = levelKey.replace("Y", "").split("L");
    const yearNumber = Number(yearStr);
    const levelNumber = Number(levelStr);
    const level = await prisma.level.findFirst({ where: { schoolYear: { yearNumber }, levelNumber } });
    if (!level) continue;
    const templates = getTemplatesForLevel(levelKey);
    for (const template of templates) {
      const objective = await prisma.learningObjective.findFirst({ where: { levelId: level.id, code: template.objectiveCode } });
      if (!objective) continue;
      const dbTemplate = await prisma.questionTemplate.upsert({
        where: { levelId_generatorKey: { levelId: level.id, generatorKey: template.key } },
        create: {
          levelId: level.id,
          objectiveId: objective.id,
          generatorKey: template.key,
          questionType: template.type,
          difficulty: template.difficulty,
          misconceptionTags: template.misconceptionTags.join(","),
          minVariations: template.variationSpace
        },
        update: {}
      });
      for (let seed = 0; seed < 5; seed++) {
        const instance = template.generate(seed);
        await prisma.generatedQuestionLog.upsert({
          where: { templateId_seed: { templateId: dbTemplate.id, seed } },
          create: {
            templateId: dbTemplate.id,
            seed,
            prompt: instance.prompt,
            questionType: instance.type,
            difficulty: instance.difficulty,
            choicesJson: instance.choices ? JSON.stringify(instance.choices) : null,
            visualAidJson: instance.visualAid ? JSON.stringify(instance.visualAid) : null,
            correctAnswer: instance.correctAnswer,
            acceptableAnswers: instance.acceptableAnswers?.join("|||") ?? null,
            explanationSteps: JSON.stringify(instance.explanationSteps),
            hints: JSON.stringify(instance.hints),
            misconceptionTag: instance.misconceptionTag ?? null
          },
          update: {}
        });
      }
    }
  }
  console.log("Question bank warmed.");
}

async function seedDemoAccounts() {
  console.log("Seeding demo adult accounts and child profiles...");
  const passwordHash = await bcrypt.hash("Demo!Password123", 12);

  const parent = await prisma.adultUser.upsert({
    where: { email: "parent.demo@mathsjourney.example" },
    create: {
      email: "parent.demo@mathsjourney.example",
      passwordHash,
      fullName: "Demo Parent",
      role: "PARENT",
      consentGivenAt: new Date(),
      emailVerified: true
    },
    update: {}
  });

  await prisma.adultUser.upsert({
    where: { email: "teacher.demo@mathsjourney.example" },
    create: {
      email: "teacher.demo@mathsjourney.example",
      passwordHash,
      fullName: "Demo Teacher",
      role: "TEACHER",
      consentGivenAt: new Date(),
      emailVerified: true
    },
    update: {}
  });

  await prisma.adultUser.upsert({
    where: { email: "admin.demo@mathsjourney.example" },
    create: {
      email: "admin.demo@mathsjourney.example",
      passwordHash,
      fullName: "Demo Administrator",
      role: "ADMIN",
      consentGivenAt: new Date(),
      emailVerified: true
    },
    update: {}
  });

  const year1 = await prisma.schoolYear.findUniqueOrThrow({ where: { yearNumber: 1 } });
  const year4 = await prisma.schoolYear.findUniqueOrThrow({ where: { yearNumber: 4 } });
  const year10 = await prisma.schoolYear.findUniqueOrThrow({ where: { yearNumber: 10 } });

  const pinHash = await bcrypt.hash("1234", 10);

  const freshChild = await prisma.childProfile.upsert({
    where: { id: "demo-child-fresh" },
    create: {
      id: "demo-child-fresh",
      ownerId: parent.id,
      displayName: "Amelia",
      avatarKey: "fox",
      pinHash,
      currentYearId: year1.id,
      pathway: "CORE"
    },
    update: {}
  });
  const level1Y1 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year1.id, levelNumber: 1 } });
  await prisma.levelUnlock.upsert({
    where: { childId_levelId: { childId: freshChild.id, levelId: level1Y1.id } },
    create: { childId: freshChild.id, levelId: level1Y1.id },
    update: {}
  });

  const progressedChild = await prisma.childProfile.upsert({
    where: { id: "demo-child-progressed" },
    create: {
      id: "demo-child-progressed",
      ownerId: parent.id,
      displayName: "Oscar",
      avatarKey: "robot",
      pinHash,
      currentYearId: year1.id,
      pathway: "CORE"
    },
    update: {}
  });
  const level1 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year1.id, levelNumber: 1 } });
  const level2 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year1.id, levelNumber: 2 } });
  for (const level of [level1, level2]) {
    await prisma.levelUnlock.upsert({
      where: { childId_levelId: { childId: progressedChild.id, levelId: level.id } },
      create: { childId: progressedChild.id, levelId: level.id },
      update: {}
    });
  }

  const ks3Child = await prisma.childProfile.upsert({
    where: { id: "demo-child-ks3" },
    create: {
      id: "demo-child-ks3",
      ownerId: parent.id,
      displayName: "Zara",
      avatarKey: "dragon",
      pinHash,
      currentYearId: year4.id,
      pathway: "CORE"
    },
    update: {}
  });
  const level1Y4 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year4.id, levelNumber: 1 } });
  await prisma.levelUnlock.upsert({
    where: { childId_levelId: { childId: ks3Child.id, levelId: level1Y4.id } },
    create: { childId: ks3Child.id, levelId: level1Y4.id },
    update: {}
  });

  const gcseChild = await prisma.childProfile.upsert({
    where: { id: "demo-child-gcse" },
    create: {
      id: "demo-child-gcse",
      ownerId: parent.id,
      displayName: "Leo",
      avatarKey: "astronaut",
      pinHash,
      currentYearId: year10.id,
      pathway: "HIGHER"
    },
    update: {}
  });
  const level1Y10 = await prisma.level.findFirstOrThrow({ where: { schoolYearId: year10.id, levelNumber: 1 } });
  await prisma.levelUnlock.upsert({
    where: { childId_levelId: { childId: gcseChild.id, levelId: level1Y10.id } },
    create: { childId: gcseChild.id, levelId: level1Y10.id },
    update: {}
  });

  console.log("Demo accounts seeded:");
  console.log("  Parent login: parent.demo@mathsjourney.example / Demo!Password123");
  console.log("  Teacher login: teacher.demo@mathsjourney.example / Demo!Password123");
  console.log("  Admin login: admin.demo@mathsjourney.example / Demo!Password123");
  console.log("  Child PIN (all demo children): 1234");
}

async function main() {
  await seedCurriculum();
  await seedLessons();
  await warmQuestionBank();
  await seedDemoAccounts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
