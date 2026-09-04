import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CreateChildForm from "@/components/CreateChildForm";

export default async function NewProfilePage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");

  const years = await prisma.schoolYear.findMany({ orderBy: { yearNumber: "asc" } });

  return (
    <main className="mx-auto min-h-screen max-w-lg px-6 py-12">
      <h1 className="text-2xl font-bold text-brand-800">Create a child profile</h1>
      <p className="mt-2 text-sm text-slate-600">You can select the school year to start in. Progress through the 10 levels within a year is always sequential.</p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <CreateChildForm years={years.map((y) => ({ yearNumber: y.yearNumber, title: y.title, summary: y.summary }))} />
      </div>
    </main>
  );
}
