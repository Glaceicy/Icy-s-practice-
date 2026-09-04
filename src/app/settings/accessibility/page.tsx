import { redirect } from "next/navigation";
import { requireActiveChild } from "@/lib/auth";
import ChildTopBar from "@/components/ChildTopBar";
import AccessibilitySettingsForm from "@/components/AccessibilitySettingsForm";

export default async function AccessibilitySettingsPage() {
  let child;
  try {
    ({ child } = await requireActiveChild());
  } catch {
    redirect("/profiles");
  }

  return (
    <main className="mx-auto min-h-screen max-w-lg px-6 py-10">
      <ChildTopBar child={child} />
      <h1 className="mt-6 text-2xl font-bold text-brand-800">Accessibility settings</h1>
      <p className="mt-1 text-sm text-slate-600">These settings apply to {child.displayName}&rsquo;s profile.</p>
      <div className="mt-6 rounded-xl2 border bg-white p-6 shadow-sm">
        <AccessibilitySettingsForm child={child} />
      </div>
    </main>
  );
}
