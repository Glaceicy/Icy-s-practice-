"use client";

import { useFormState, useFormStatus } from "react-dom";
import { childLoginAction } from "@/lib/actions/children";
import type { FormState } from "@/lib/actions/auth";
import { useT } from "./I18nProvider";

const initialState: FormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useT();
  return (
    <button
      type="submit"
      disabled={pending}
      className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? t("childLogin.submitting") : t("childLogin.submit")}
    </button>
  );
}

export default function ChildLoginForm() {
  const [state, formAction] = useFormState(childLoginAction, initialState);
  const t = useT();

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error && (
        <p role="alert" className="rounded-lg border border-berry-500 bg-berry-50 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="parentEmail" className="block text-sm font-medium text-slate-700">
          {t("childLogin.parentEmailLabel")}
        </label>
        <input
          id="parentEmail"
          name="parentEmail"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3"
        />
        {state.fieldErrors?.parentEmail && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.parentEmail}</p>}
      </div>
      <div>
        <label htmlFor="pin" className="block text-sm font-medium text-slate-700">
          {t("childLogin.pinLabel")}
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          required
          className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3 text-center text-xl tracking-[0.5em]"
        />
        {state.fieldErrors?.pin && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.pin}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
