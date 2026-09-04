"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createChildAction } from "@/lib/actions/children";
import type { FormState } from "@/lib/actions/auth";
import { AVATAR_KEYS } from "@/lib/types";

const AVATAR_EMOJI: Record<string, string> = {
  fox: "🦊",
  owl: "🦉",
  otter: "🦦",
  robot: "🤖",
  dragon: "🐉",
  panda: "🐼",
  astronaut: "🧑‍🚀",
  unicorn: "🦄"
};

const initialState: FormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Creating profile..." : "Create profile"}
    </button>
  );
}

export default function CreateChildForm({ years }: { years: Array<{ yearNumber: number; title: string; summary: string }> }) {
  const [state, formAction] = useFormState(createChildAction, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.error && (
        <p role="alert" className="rounded-lg bg-berry-50 border border-berry-500 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-slate-700">
          Child&rsquo;s first name (or nickname)
        </label>
        <input id="displayName" name="displayName" required maxLength={60} className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3" />
        {state.fieldErrors?.displayName && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.displayName}</p>}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">Choose an avatar</legend>
        <div className="mt-2 grid grid-cols-4 gap-3">
          {AVATAR_KEYS.map((key, i) => (
            <label key={key} className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-3 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50">
              <input type="radio" name="avatarKey" value={key} defaultChecked={i === 0} className="sr-only" />
              <span className="text-3xl" aria-hidden="true">
                {AVATAR_EMOJI[key]}
              </span>
              <span className="text-xs capitalize">{key}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="yearNumber" className="block text-sm font-medium text-slate-700">
          Starting school year
        </label>
        <select id="yearNumber" name="yearNumber" defaultValue={1} className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3">
          {years.map((y) => (
            <option key={y.yearNumber} value={y.yearNumber}>
              {y.title} &mdash; {y.summary}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          Your child will start at Level 1 of this year and progress sequentially &mdash; they cannot skip ahead of a locked level.
        </p>
      </div>

      <div>
        <label htmlFor="pathway" className="block text-sm font-medium text-slate-700">
          Year 10 pathway (only applies once your child reaches Year 10)
        </label>
        <select id="pathway" name="pathway" defaultValue="CORE" className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3">
          <option value="CORE">Core</option>
          <option value="FOUNDATION">Foundation (GCSE)</option>
          <option value="HIGHER">Higher (GCSE)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-slate-700">
            4-digit PIN
          </label>
          <input
            id="pin"
            name="pin"
            type="password"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            required
            className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3 text-center tracking-[0.5em]"
          />
          {state.fieldErrors?.pin && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.pin}</p>}
        </div>
        <div>
          <label htmlFor="pinConfirm" className="block text-sm font-medium text-slate-700">
            Confirm PIN
          </label>
          <input
            id="pinConfirm"
            name="pinConfirm"
            type="password"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            required
            className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3 text-center tracking-[0.5em]"
          />
          {state.fieldErrors?.pinConfirm && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.pinConfirm}</p>}
        </div>
      </div>
      <p className="text-xs text-slate-500">Your child will use their avatar and this PIN to sign in &mdash; no email address needed.</p>

      <SubmitButton />
    </form>
  );
}
