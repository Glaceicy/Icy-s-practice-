"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdultAction, type FormState } from "@/lib/actions/auth";

const initialState: FormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAdultAction, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error && (
        <p role="alert" className="rounded-lg bg-berry-50 border border-berry-500 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3" />
      </div>
      <SubmitButton />
    </form>
  );
}
