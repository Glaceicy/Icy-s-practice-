import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { beginMasteryAction } from "@/lib/actions/learning";
import ChildTopBar from "@/components/ChildTopBar";
import MasterySession from "@/components/MasterySession";

export default async function MasteryChallengePage({ params }: { params: { childId: string; levelId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const level = await prisma.level.findUnique({ where: { id: params.levelId }, include: { schoolYear: true } });
  if (!level || level.status !== "COMPLETE") notFound();

  const unlock = await prisma.levelUnlock.findUnique({ where: { childId_levelId: { childId: child.id, levelId: level.id } } });
  if (!unlock) notFound();

  const initialState = await beginMasteryAction(level.id);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">Mastery Challenge: {level.title}</h1>
      <p className="mt-1 text-sm text-slate-600">
        40 questions in 4 rounds of 10. Score 38 or more (95%) to unlock the next level. You can pause after any round and continue
        later.
      </p>
      <div className="mt-6">
        <MasterySession attemptId={initialState.attemptId} childId={child.id} levelId={level.id} />
      </div>
    </main>
  );
}
