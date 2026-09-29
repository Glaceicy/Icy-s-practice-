"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateAccessibilitySettingsAction } from "@/lib/actions/children";
import type { FormState } from "@/lib/actions/auth";
import { useT } from "./I18nProvider";

const initialState: FormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useT();
  return (
    <button type="submit" disabled={pending} className="touch-target rounded-xl2 bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
      {pending ? t("accessibilitySettings.saving") : t("accessibilitySettings.save")}
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
  const t = useT();

  return (
    <form action={formAction} className="space-y-6">
      {state.error && <p className="rounded-lg bg-berry-50 p-3 text-sm text-berry-600">{state.error}</p>}

      <fieldset>
        <legend className="font-semibold text-slate-800">{t("accessibilitySettings.fontLegend")}</legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="fontMode" value="STANDARD" defaultChecked={child.fontMode === "STANDARD"} /> {t("accessibilitySettings.fontStandard")}
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="fontMode" value="DYSLEXIC" defaultChecked={child.fontMode === "DYSLEXIC"} /> {t("accessibilitySettings.fontDyslexic")}
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-semibold text-slate-800">{t("accessibilitySettings.displayLegend")}</legend>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="highContrast" value="on" defaultChecked={child.highContrast} className="h-5 w-5" />
          {t("accessibilitySettings.highContrast")}
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="reducedMotion" value="on" defaultChecked={child.reducedMotion} className="h-5 w-5" />
          {t("accessibilitySettings.reducedMotion")}
        </label>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-semibold text-slate-800">{t("accessibilitySettings.soundLegend")}</legend>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="soundMuted" value="on" defaultChecked={child.soundMuted} className="h-5 w-5" />
          {t("accessibilitySettings.muteSound")}
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="readAloud" value="on" defaultChecked={child.readAloud} className="h-5 w-5" />
          {t("accessibilitySettings.readAloudDefault")}
        </label>
        <div>
          <label htmlFor="audioVolume" className="block text-sm">
            {t("accessibilitySettings.audioVolume")}
          </label>
          <input id="audioVolume" name="audioVolume" type="range" min={0} max={100} defaultValue={child.audioVolume} className="w-full" />
        </div>
      </fieldset>

      <p className="text-xs text-slate-500">{t("accessibilitySettings.accessibilityNote")}</p>

      <SubmitButton />
    </form>
  );
}
