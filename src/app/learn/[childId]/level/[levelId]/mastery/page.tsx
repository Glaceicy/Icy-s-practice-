import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { beginMasteryAction } from "@/lib/actions/learning";
import ChildTopBar from "@/components/ChildTopBar";
import MasterySession from "@/components/MasterySession";
import { getLocale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

export default async function MasteryChallengePage({ params }: { params: { childId: string; levelId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const level = await prisma.level.findUnique({ where: { id: params.levelId }, include: { schoolYear: true } });
  if (!level || level.status !== "COMPLETE") notFound();

  const unlock = await prisma.levelUnlock.findUnique({ where: { childId_levelId: { childId: child.id, levelId: level.id } } });
  if (!unlock) notFound();

  const initialState = await beginMasteryAction(level.id);
  const locale = await getLocale();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">{translate(locale, "masteryPage.heading", { level: level.title })}</h1>
      <p className="mt-1 text-sm text-slate-600">{translate(locale, "masteryPage.subtitle")}</p>
      <div className="mt-6">
        <MasterySession attemptId={initialState.attemptId} childId={child.id} levelId={level.id} />
      </div>
    </main>
  );
}
