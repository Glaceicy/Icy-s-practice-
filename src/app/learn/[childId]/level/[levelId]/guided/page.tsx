import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { beginPracticeAction } from "@/lib/actions/learning";
import ChildTopBar from "@/components/ChildTopBar";
import PracticeSession from "@/components/PracticeSession";

export default async function GuidedPracticePage({ params }: { params: { childId: string; levelId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const level = await prisma.level.findUnique({ where: { id: params.levelId } });
  if (!level || level.status !== "COMPLETE") notFound();

  const { attemptId } = await beginPracticeAction(level.id, "GUIDED");

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">Guided practice: {level.title}</h1>
      <p className="mt-1 text-sm text-slate-600">Ask for a hint any time you need one. If an answer isn&rsquo;t quite right, we&rsquo;ll work through it together.</p>
      <div className="mt-6">
        <PracticeSession attemptId={attemptId} childId={child.id} levelId={level.id} mode="GUIDED" nextHref={`/learn/${child.id}/level/${level.id}/independent`} />
      </div>
    </main>
  );
}
