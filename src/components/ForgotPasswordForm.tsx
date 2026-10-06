"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordResetAction, type FormState } from "@/lib/actions/auth";
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
      {pending ? t("forgotPassword.submitting") : t("forgotPassword.submit")}
    </button>
  );
}

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(requestPasswordResetAction, initialState);
  const [submitted, setSubmitted] = useState(false);
  const t = useT();

  // The action cannot say whether the address had an account, so the
  // confirmation has to come from the submit itself — same wording either way.
  // Mirrors ResendVerificationForm.
  return (
    <form
      action={(formData: FormData) => {
        setSubmitted(true);
        return formAction(formData);
      }}
      className="space-y-5"
      noValidate
    >
      {state.error && (
        <p role="alert" className="rounded-lg border border-berry-500 bg-berry-50 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}
      {!state.error && submitted && (
        <p role="status" className="rounded-lg border border-leaf-500 bg-leaf-50 px-4 py-3 text-sm text-leaf-700">
          {t("forgotPassword.confirmation")}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          {t("forgotPassword.emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3"
        />
        {state.fieldErrors?.email && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.email}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
