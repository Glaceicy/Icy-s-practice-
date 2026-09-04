"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="touch-target mt-6 rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 print:hidden"
    >
      {label}
    </button>
  );
}
