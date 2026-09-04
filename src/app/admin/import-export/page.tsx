import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdultSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ImportForm from "@/components/ImportForm";

export default async function AdminImportExportPage() {
  const session = await getAdultSession();
  if (!session) redirect("/login");
  const adult = await prisma.adultUser.findUniqueOrThrow({ where: { id: session.adultId } });
  if (adult.role !== "ADMIN") redirect("/profiles");

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 underline">
        ← Admin overview
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-800">Import / export question governance</h1>
      <p className="mt-2 text-sm text-slate-600">
        Question templates are authored as deterministic generator code (see DOCUMENTATION.md) so answers always come from stored
        mathematical rules, never a live AI call. Export gives you the full catalogue of templates and their metadata; import lets
        you bulk-update publish/review state (enable, disable, sign off) from a spreadsheet.
      </p>

      <section className="mt-6 rounded-xl2 border bg-white p-6 shadow-sm">
        <h2 className="font-bold text-brand-800">Export</h2>
        <div className="mt-3 flex gap-3">
          <a href="/api/admin/export?format=json" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Download JSON
          </a>
          <a href="/api/admin/export?format=csv" className="rounded-lg border-2 border-brand-500 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Download CSV
          </a>
        </div>
      </section>

      <section className="mt-6 rounded-xl2 border bg-white p-6 shadow-sm">
        <h2 className="font-bold text-brand-800">Import</h2>
        <ImportForm />
      </section>
    </main>
  );
}
