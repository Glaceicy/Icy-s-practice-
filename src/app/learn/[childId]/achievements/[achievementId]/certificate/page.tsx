import { notFound } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";
import PrintButton from "@/components/PrintButton";

export default async function CertificatePage({ params }: { params: { childId: string; achievementId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const achievement = await prisma.achievement.findUnique({ where: { id: params.achievementId } });
  if (!achievement || achievement.childId !== child.id) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 print:min-h-0">
      <div className="w-full rounded-xl2 border-8 border-double border-sunny-500 bg-white p-12 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Maths Journey UK</p>
        <p className="mt-6 text-5xl" aria-hidden="true">
          🏆
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-brand-800">Certificate of Achievement</h1>
        <p className="mt-6 text-lg text-slate-700">This certifies that</p>
        <p className="mt-2 text-3xl font-bold text-brand-700">{child.displayName}</p>
        <p className="mt-4 text-lg text-slate-700">{achievement.title}</p>
        <p className="mt-2 text-slate-600">{achievement.description}</p>
        <p className="mt-8 text-sm text-slate-400">Awarded {new Date(achievement.earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
      <PrintButton label="Print or save as PDF" />
    </main>
  );
}
