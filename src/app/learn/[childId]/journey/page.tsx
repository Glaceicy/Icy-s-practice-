import { redirect } from "next/navigation";
import { assertChildAccess } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function JourneyRedirectPage({ params }: { params: { childId: string } }) {
  const { child } = await assertChildAccess(params.childId);
  const year = await prisma.schoolYear.findUniqueOrThrow({ where: { id: child.currentYearId } });
  redirect(`/learn/${child.id}/journey/${year.yearNumber}`);
}
