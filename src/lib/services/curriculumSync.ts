import type { PrismaClient } from "@prisma/client";
import { curriculum } from "@/lib/curriculum";
import { lessonsByLevelKey } from "@/lib/lessons/content";

/** Upserts every school year / level / objective from the code-authored
 * curriculum (src/lib/curriculum) into the database, keyed by natural keys
 * (yearNumber, levelNumber, objective code) — safe to re-run any time the
 * source content changes, including just adding French translations, since
 * it never creates duplicates. Shared by prisma/seed.ts (fresh installs) and
 * the admin "sync content" action (updating an already-seeded production
 * database after a content-only code change, with no schema migration or
 * direct DB access required). */
export async function syncCurriculumFromCode(prisma: PrismaClient): Promise<{ years: number; levels: number; objectives: number }> {
  let years = 0;
  let levels = 0;
  let objectives = 0;

  for (const yearDef of curriculum) {
    const schoolYear = await prisma.schoolYear.upsert({
      where: { yearNumber: yearDef.yearNumber },
      create: {
        yearNumber: yearDef.yearNumber,
        title: yearDef.title,
        titleFr: yearDef.titleFr,
        keyStage: yearDef.keyStage,
        summary: yearDef.summary,
        summaryFr: yearDef.summaryFr,
        minAge: yearDef.minAge,
        maxAge: yearDef.maxAge,
        themeStage: yearDef.themeStage
      },
      update: {
        title: yearDef.title,
        titleFr: yearDef.titleFr,
        keyStage: yearDef.keyStage,
        summary: yearDef.summary,
        summaryFr: yearDef.summaryFr,
        minAge: yearDef.minAge,
        maxAge: yearDef.maxAge,
        themeStage: yearDef.themeStage
      }
    });
    years++;

    for (const levelDef of yearDef.levels) {
      const level = await prisma.level.upsert({
        where: { schoolYearId_levelNumber: { schoolYearId: schoolYear.id, levelNumber: levelDef.levelNumber } },
        create: {
          schoolYearId: schoolYear.id,
          levelNumber: levelDef.levelNumber,
          title: levelDef.title,
          titleFr: levelDef.titleFr,
          summary: levelDef.summary,
          summaryFr: levelDef.summaryFr,
          isMixedMastery: levelDef.isMixedMastery,
          status: levelDef.status,
          pathway: levelDef.pathway
        },
        update: {
          title: levelDef.title,
          titleFr: levelDef.titleFr,
          summary: levelDef.summary,
          summaryFr: levelDef.summaryFr,
          isMixedMastery: levelDef.isMixedMastery,
          status: levelDef.status,
          pathway: levelDef.pathway
        }
      });
      levels++;

      for (const objectiveDef of levelDef.objectives) {
        await prisma.learningObjective.upsert({
          where: { levelId_code: { levelId: level.id, code: objectiveDef.code } },
          create: {
            levelId: level.id,
            code: objectiveDef.code,
            description: objectiveDef.description,
            descriptionFr: objectiveDef.descriptionFr,
            dfeReference: objectiveDef.dfeReference
          },
          update: {
            description: objectiveDef.description,
            descriptionFr: objectiveDef.descriptionFr,
            dfeReference: objectiveDef.dfeReference
          }
        });
        objectives++;
      }
    }
  }

  return { years, levels, objectives };
}

/** Upserts every mini-lesson from the code-authored lesson bank
 * (src/lib/lessons/content) into the database, keyed by (levelId, order) —
 * same re-run-safe pattern as syncCurriculumFromCode. */
export async function syncLessonsFromCode(prisma: PrismaClient): Promise<{ lessons: number }> {
  let lessons = 0;

  for (const [levelKey, levelLessons] of Object.entries(lessonsByLevelKey)) {
    const [yearStr, levelStr] = levelKey.replace("Y", "").split("L");
    const yearNumber = Number(yearStr);
    const levelNumber = Number(levelStr);
    const level = await prisma.level.findFirst({ where: { schoolYear: { yearNumber }, levelNumber } });
    if (!level) continue;

    for (const lesson of levelLessons) {
      const created = await prisma.lesson.upsert({
        where: { levelId_order: { levelId: level.id, order: lesson.order } },
        create: {
          levelId: level.id,
          order: lesson.order,
          title: lesson.title,
          titleFr: lesson.titleFr,
          concept: lesson.concept,
          conceptFr: lesson.conceptFr,
          explanationMd: lesson.explanationMd,
          explanationMdFr: lesson.explanationMdFr,
          representation: lesson.representation,
          visualAid: lesson.visualAid,
          workedExamples: JSON.stringify(lesson.workedExamples),
          workedExamplesFr: lesson.workedExamplesFr ? JSON.stringify(lesson.workedExamplesFr) : null,
          audioScript: lesson.audioScript,
          audioScriptFr: lesson.audioScriptFr,
          ageBandStyle: lesson.ageBandStyle
        },
        update: {
          title: lesson.title,
          titleFr: lesson.titleFr,
          concept: lesson.concept,
          conceptFr: lesson.conceptFr,
          explanationMd: lesson.explanationMd,
          explanationMdFr: lesson.explanationMdFr,
          representation: lesson.representation,
          visualAid: lesson.visualAid,
          workedExamples: JSON.stringify(lesson.workedExamples),
          workedExamplesFr: lesson.workedExamplesFr ? JSON.stringify(lesson.workedExamplesFr) : null,
          audioScript: lesson.audioScript,
          audioScriptFr: lesson.audioScriptFr,
          ageBandStyle: lesson.ageBandStyle
        }
      });
      lessons++;

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

  return { lessons };
}
