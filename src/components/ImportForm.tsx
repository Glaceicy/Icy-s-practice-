"use client";

import { useState } from "react";
import { importTemplateGovernanceAction, type ImportResult } from "@/lib/actions/admin";

export default function ImportForm() {
  const [result, setResult] = useState<ImportResult | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const content = await file.text();
    const format = file.name.endsWith(".csv") ? "csv" : "json";
    const res = await importTemplateGovernanceAction(content, format);
    setResult(res);
    setBusy(false);
    e.target.value = "";
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700" htmlFor="import-file">
        Upload a CSV or JSON file of rows: <code>generatorKey, isActive, reviewedBy</code>
      </label>
      <input id="import-file" type="file" accept=".csv,.json" onChange={handleFile} disabled={busy} className="mt-2 text-sm" />
      {busy && <p className="mt-2 text-sm text-slate-500">Importing&hellip;</p>}
      {result && (
        <p className="mt-2 text-sm">
          <span className="font-semibold text-leaf-700">{result.updated} template(s) updated.</span>{" "}
          {result.errors.length > 0 && <span className="text-berry-600">{result.errors.length} row(s) had errors.</span>}
        </p>
      )}
    </div>
  );
}
