"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateAccessibilitySettingsAction } from "@/lib/actions/children";
import type { FormState } from "@/lib/actions/auth";

const initialState: FormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="touch-target rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
      {pending ? "Saving..." : "Save settings"}
    </button>
  );
}

export default function AccessibilitySettingsForm({
  child
}: {
  child: {
    fontMode: string;
    highContrast: boolean;
    reducedMotion: boolean;
    soundMuted: boolean;
    readAloud: boolean;
    audioVolume: number;
  };
}) {
  const [state, formAction] = useFormState(updateAccessibilitySettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && <p className="rounded-lg bg-berry-50 p-3 text-sm text-berry-600">{state.error}</p>}

      <fieldset>
        <legend className="font-semibold text-slate-800">Font</legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="fontMode" value="STANDARD" defaultChecked={child.fontMode === "STANDARD"} /> Standard (Atkinson Hyperlegible)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="fontMode" value="DYSLEXIC" defaultChecked={child.fontMode === "DYSLEXIC"} /> Dyslexia-friendly font
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-semibold text-slate-800">Display</legend>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="highContrast" value="on" defaultChecked={child.highContrast} className="h-5 w-5" />
          High-contrast mode
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="reducedMotion" value="on" defaultChecked={child.reducedMotion} className="h-5 w-5" />
          Reduce animations and motion
        </label>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-semibold text-slate-800">Sound</legend>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="soundMuted" value="on" defaultChecked={child.soundMuted} className="h-5 w-5" />
          Mute sound effects
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="readAloud" value="on" defaultChecked={child.readAloud} className="h-5 w-5" />
          Turn on read-aloud by default
        </label>
        <div>
          <label htmlFor="audioVolume" className="block text-sm">
            Audio volume
          </label>
          <input id="audioVolume" name="audioVolume" type="range" min={0} max={100} defaultValue={child.audioVolume} className="w-full" />
        </div>
      </fieldset>

      <p className="text-xs text-slate-500">
        Learning in Maths Journey UK is untimed by default, uses keyboard-navigable controls, screen-reader labels, and never relies
        on colour alone to show right or wrong answers.
      </p>

      <SubmitButton />
    </form>
  );
}
