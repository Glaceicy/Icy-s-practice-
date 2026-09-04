import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logoutAction } from "@/lib/actions/auth";
import ProfilePinCard from "@/components/ProfilePinCard";

export default async function ProfilesPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");

  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  const children = await prisma.childProfile.findMany({
    where: { ownerId: adult.id },
    include: { currentYear: true },
    orderBy: { createdAt: "asc" }
  });

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-800">Who&rsquo;s learning today?</h1>
          <p className="mt-1 text-sm text-slate-600">Signed in as {adult.fullName} ({adult.role.toLowerCase()})</p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href="/dashboard" className="rounded-lg border px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
            Dashboard
          </Link>
          {adult.role === "ADMIN" && (
            <Link href="/admin" className="rounded-lg border px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50">
              Admin
            </Link>
          )}
          <form action={logoutAction}>
            <button type="submit" className="rounded-lg border px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {children.map((child) => (
          <ProfilePinCard key={child.id} childId={child.id} displayName={child.displayName} avatarKey={child.avatarKey} yearTitle={child.currentYear.title} />
        ))}

        <Link
          href="/profiles/new"
          className="flex touch-target flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed border-brand-300 p-6 text-center text-brand-700 hover:bg-brand-50"
        >
          <span className="text-4xl" aria-hidden="true">
            ➕
          </span>
          <span className="font-semibold">Add a child profile</span>
        </Link>
      </div>
    </main>
  );
}
