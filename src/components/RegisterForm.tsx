"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerAdultAction, type FormState } from "@/lib/actions/auth";
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
      {pending ? t("register.submitting") : t("register.submit")}
    </button>
  );
}

export default function RegisterForm() {
  const [state, formAction] = useFormState(registerAdultAction, initialState);
  const t = useT();

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error && (
        <p role="alert" className="rounded-lg bg-berry-50 border border-berry-500 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
          {t("register.fullNameLabel")}
        </label>
        <input id="fullName" name="fullName" required autoComplete="name" className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3" />
        {state.fieldErrors?.fullName && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          {t("register.emailLabel")}
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3" />
        {state.fieldErrors?.email && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.email}</p>}
      </div>

      <PasswordField name="password" label={t("register.passwordLabel")} autoComplete="new-password" minLength={10} error={state.fieldErrors?.password} />

      <PasswordField name="passwordConfirm" label={t("register.passwordConfirmLabel")} autoComplete="new-password" error={state.fieldErrors?.passwordConfirm} />

      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">{t("register.roleLegend")}</legend>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="PARENT" defaultChecked /> {t("register.roleParent")}
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="TEACHER" /> {t("register.roleTeacher")}
          </label>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" name="consent" required className="mt-1 h-5 w-5" />
        <span>{t("register.consentText")}</span>
      </label>
      {state.fieldErrors?.consent && <p className="text-sm text-berry-600">{state.fieldErrors.consent}</p>}

      <SubmitButton />
    </form>
  );
}
