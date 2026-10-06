"use client";

import { useFormState, useFormStatus } from "react-dom";
import { resetPasswordAction, type FormState } from "@/lib/actions/auth";
import PasswordField from "./PasswordField";
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
      {pending ? t("resetPassword.submitting") : t("resetPassword.submit")}
    </button>
  );
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useFormState(resetPasswordAction, initialState);
  const t = useT();

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* The token travels with the submit rather than being re-read from the
          URL server-side, so the action has everything it needs in one place. */}
      <input type="hidden" name="token" value={token} />
      {state.error && (
        <p role="alert" className="rounded-lg border border-berry-500 bg-berry-50 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}
      <PasswordField
        name="password"
        label={t("resetPassword.passwordLabel")}
        autoComplete="new-password"
        minLength={10}
        error={state.fieldErrors?.password}
      />
      <PasswordField
        name="passwordConfirm"
        label={t("resetPassword.passwordConfirmLabel")}
        autoComplete="new-password"
        error={state.fieldErrors?.passwordConfirm}
      />
      <SubmitButton />
    </form>
  );
}
