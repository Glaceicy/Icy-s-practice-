import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { beginPracticeAction } from "@/lib/actions/learning";
import { getWeakObjectiveCodes } from "@/lib/services/practice";
import ChildTopBar from "@/components/ChildTopBar";
import PracticeSession from "@/components/PracticeSession";

export default async function RevisionPage({ params }: { params: { childId: string; levelId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const level = await prisma.level.findUnique({ where: { id: params.levelId }, include: { objectives: true } });
  if (!level || level.status !== "COMPLETE") notFound();

  const weakCodes = await getWeakObjectiveCodes(child.id, level.id);
  const weakObjectives = level.objectives.filter((o) => weakCodes.includes(o.code));

  const { attemptId } = await beginPracticeAction(level.id, "REVISION");

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">Personalised revision: {level.title}</h1>
      <p className="mt-1 text-sm text-slate-600">You&rsquo;re nearly there! Let&rsquo;s practise these skills before trying the challenge again.</p>

      {weakObjectives.length > 0 && (
        <ul className="mt-4 space-y-1 rounded-xl2 border bg-brand-50 p-4 text-sm text-brand-800">
          {weakObjectives.map((o) => (
            <li key={o.id}>🎯 {o.description}</li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <PracticeSession attemptId={attemptId} childId={child.id} levelId={level.id} mode="REVISION" nextHref={`/learn/${child.id}/level/${level.id}/mastery`} />
      </div>
    </main>
  );
}
