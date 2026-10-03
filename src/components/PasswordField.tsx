"use client";

import { useId, useState } from "react";
import { useT } from "./I18nProvider";

/** A password input with a show/hide toggle. Visibility state is local and
 * per-field, so a "Confirm password" field can be revealed independently of
 * the "Password" field above it. */
export default function PasswordField({
  name,
  label,
  autoComplete,
  minLength,
  error
}: {
  name: string;
  label: string;
  autoComplete: "new-password" | "current-password";
  minLength?: number;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const t = useT();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          minLength={minLength}
          className="w-full touch-target rounded-lg border border-slate-300 px-4 py-3 pr-20"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t("register.hidePassword") : t("register.showPassword")}
          className="absolute inset-y-0 right-0 touch-target px-4 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {visible ? t("register.hide") : t("register.show")}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-berry-600">{error}</p>}
    </div>
  );
}
