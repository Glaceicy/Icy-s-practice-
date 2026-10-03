"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { resendVerificationEmailAction } from "@/lib/actions/auth";
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
      className="touch-target mt-3 w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? t("checkEmail.resending") : t("checkEmail.resendButton")}
    </button>
  );
}

export default function ResendVerificationForm({ defaultEmail }: { defaultEmail: string }) {
  const [state, formAction] = useFormState(resendVerificationEmailAction, initialState);
  const [sent, setSent] = useState(false);
  const t = useT();

  return (
    <form
      action={(formData: FormData) => {
        setSent(true);
        return formAction(formData);
      }}
      className="mt-2"
    >
      <label htmlFor="resend-email" className="sr-only">
        {t("childLogin.parentEmailLabel")}
      </label>
      <input
        id="resend-email"
        name="email"
        type="email"
        required
        defaultValue={defaultEmail}
        autoComplete="email"
        className="w-full touch-target rounded-lg border border-slate-300 px-4 py-2"
      />
      {state.error && (
        <p role="alert" className="mt-2 text-sm text-berry-600">
          {state.error}
        </p>
      )}
      {!state.error && sent && <p className="mt-2 text-sm text-leaf-700">{t("checkEmail.resendConfirmation")}</p>}
      <SubmitButton />
    </form>
  );
}
