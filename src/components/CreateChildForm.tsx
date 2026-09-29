"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createChildAction } from "@/lib/actions/children";
import type { FormState } from "@/lib/actions/auth";
import { AVATAR_KEYS } from "@/lib/types";
import { useT } from "./I18nProvider";

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
  const t = useT();
  return (
    <button
      type="submit"
      disabled={pending}
      className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? t("newProfile.submitting") : t("newProfile.submit")}
    </button>
  );
}

export default function CreateChildForm({ years }: { years: Array<{ yearNumber: number; title: string; summary: string }> }) {
  const [state, formAction] = useFormState(createChildAction, initialState);
  const t = useT();

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.error && (
        <p role="alert" className="rounded-lg bg-berry-50 border border-berry-500 px-4 py-3 text-sm text-berry-600">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-slate-700">
          {t("newProfile.nameLabel")}
        </label>
        <input id="displayName" name="displayName" required maxLength={60} className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3" />
        {state.fieldErrors?.displayName && <p className="mt-1 text-sm text-berry-600">{state.fieldErrors.displayName}</p>}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">{t("newProfile.chooseAvatar")}</legend>
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
          {t("newProfile.startingYearLabel")}
        </label>
        <select id="yearNumber" name="yearNumber" defaultValue={1} className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3">
          {years.map((y) => (
            <option key={y.yearNumber} value={y.yearNumber}>
              {y.title} &mdash; {y.summary}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">{t("newProfile.startingYearHelp")}</p>
      </div>

      <div>
        <label htmlFor="pathway" className="block text-sm font-medium text-slate-700">
          {t("newProfile.pathwayLabel")}
        </label>
        <select id="pathway" name="pathway" defaultValue="CORE" className="mt-1 w-full touch-target rounded-lg border border-slate-300 px-4 py-3">
          <option value="CORE">{t("newProfile.pathwayCore")}</option>
          <option value="FOUNDATION">{t("newProfile.pathwayFoundation")}</option>
          <option value="HIGHER">{t("newProfile.pathwayHigher")}</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-slate-700">
            {t("newProfile.pinLabel")}
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
            {t("newProfile.pinConfirmLabel")}
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
      <p className="text-xs text-slate-500">{t("newProfile.pinHelp")}</p>

      <SubmitButton />
    </form>
  );
}
