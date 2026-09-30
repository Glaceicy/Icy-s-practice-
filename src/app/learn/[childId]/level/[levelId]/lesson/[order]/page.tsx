import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ChildTopBar from "@/components/ChildTopBar";
import LessonViewer from "@/components/LessonViewer";
import { getLocale } from "@/lib/i18n/locale";
import { localize, localizeJson } from "@/lib/i18n/content";
import type { WorkedExample } from "@/lib/lessons/types";

export default async function LessonPage({ params }: { params: { childId: string; levelId: string; order: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const order = Number(params.order);
  const locale = await getLocale();

  const level = await prisma.level.findUnique({ where: { id: params.levelId }, include: { lessons: true } });
  if (!level) notFound();

  const unlock = await prisma.levelUnlock.findUnique({ where: { childId_levelId: { childId: child.id, levelId: level.id } } });
  if (!unlock || level.status !== "COMPLETE") notFound();

  const lesson = level.lessons.find((l) => l.order === order);
  if (!lesson) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />
      <div className="mt-6">
        <LessonViewer
          lesson={{
            order: lesson.order,
            title: localize(locale, lesson.title, lesson.titleFr),
            explanationMd: localize(locale, lesson.explanationMd, lesson.explanationMdFr),
            visualAid: lesson.visualAid,
            audioScript: localize(locale, lesson.audioScript ?? "", lesson.audioScriptFr),
            workedExamples: localizeJson<WorkedExample[]>(locale, lesson.workedExamples, lesson.workedExamplesFr)
          }}
          childId={child.id}
          levelId={level.id}
          lessonCount={level.lessons.length}
          reducedMotion={child.reducedMotion}
        />
      </div>
    </main>
  );
}
