/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { curriculum } from "../src/lib/curriculum";
import { COMPLETE_LEVEL_KEYS, loadAllTemplates } from "../src/lib/questionEngine/templates/all";
import { getTemplatesForLevel } from "../src/lib/questionEngine/registry";

const prisma = new PrismaClient();

async function seedCurriculum() {
  console.log("Seeding curriculum: 10 school years, 100 levels, learning objectives...");
  for (const yearDef of curriculum) {
    const schoolYear = await prisma.schoolYear.upsert({
      where: { yearNumber: yearDef.yearNumber },
      create: {
        yearNumber: yearDef.yearNumber,
        title: yearDef.title,
        keyStage: yearDef.keyStage,
        summary: yearDef.summary,
        minAge: yearDef.minAge,
        maxAge: yearDef.maxAge,
        themeStage: yearDef.themeStage
      },
      update: {
        title: yearDef.title,
        keyStage: yearDef.keyStage,
        summary: yearDef.summary,
        minAge: yearDef.minAge,
        maxAge: yearDef.maxAge,
        themeStage: yearDef.themeStage
      }
    });

    for (const levelDef of yearDef.levels) {
      const level = await prisma.level.upsert({
        where: { schoolYearId_levelNumber: { schoolYearId: schoolYear.id, levelNumber: levelDef.levelNumber } },
        create: {
          schoolYearId: schoolYear.id,
          levelNumber: levelDef.levelNumber,
          title: levelDef.title,
          summary: levelDef.summary,
          isMixedMastery: levelDef.isMixedMastery,
          status: levelDef.status,
          pathway: levelDef.pathway
        },
        update: {
          title: levelDef.title,
          summary: levelDef.summary,
          isMixedMastery: levelDef.isMixedMastery,
          status: levelDef.status,
          pathway: levelDef.pathway
        }
      });

      for (const objectiveDef of levelDef.objectives) {
        await prisma.learningObjective.upsert({
          where: { levelId_code: { levelId: level.id, code: objectiveDef.code } },
          create: {
            levelId: level.id,
            code: objectiveDef.code,
            description: objectiveDef.description,
            dfeReference: objectiveDef.dfeReference
          },
          update: {
            description: objectiveDef.description,
            dfeReference: objectiveDef.dfeReference
          }
        });
      }
    }
  }
  console.log("Curriculum seeded.");
}

async function seedLessons() {
  console.log("Seeding mini-lessons for flagship complete levels...");
  const { lessonsByLevelKey } = await import("../src/lib/lessons/content");
  for (const [levelKey, lessons] of Object.entries(lessonsByLevelKey)) {
    const [yearStr, levelStr] = levelKey.replace("Y", "").split("L");
    const yearNumber = Number(yearStr);
    const levelNumber = Number(levelStr);
    const level = await prisma.level.findFirst({ where: { schoolYear: { yearNumber }, levelNumber } });
    if (!level) continue;
    for (const lesson of lessons) {
      const created = await prisma.lesson.upsert({
        where: { levelId_order: { levelId: level.id, order: lesson.order } },
        create: {
          levelId: level.id,
          order: lesson.order,
          title: lesson.title,
          concept: lesson.concept,
          explanationMd: lesson.explanationMd,
          representation: lesson.representation,
          visualAid: lesson.visualAid,
          workedExamples: JSON.stringify(lesson.workedExamples),
          audioScript: lesson.audioScript,
          ageBandStyle: lesson.ageBandStyle
        },
        update: {
          title: lesson.title,
          concept: lesson.concept,
          explanationMd: lesson.explanationMd,
          representation: lesson.representation,
          visualAid: lesson.visualAid,
          workedExamples: JSON.stringify(lesson.workedExamples),
          audioScript: lesson.audioScript,
          ageBandStyle: lesson.ageBandStyle
        }
      });
      for (const objectiveCode of lesson.objectiveCodes) {
        const objective = await prisma.learningObjective.findFirst({ where: { levelId: level.id, code: objectiveCode } });
        if (!objective) continue;
        await prisma.lessonObjective.upsert({
          where: { lessonId_objectiveId: { lessonId: created.id, objectiveId: objective.id } },
          create: { lessonId: created.id, objectiveId: objective.id },
          update: {}
        });
      }
    }
  }
  console.log("Lessons seeded.");
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
      consentGivenAt: new Date()
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
      consentGivenAt: new Date()
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
      consentGivenAt: new Date()
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
