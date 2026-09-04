"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { selectChildAction } from "@/lib/actions/children";
import type { FormState } from "@/lib/actions/auth";

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

function UnlockButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="touch-target w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Checking..." : "Go!"}
    </button>
  );
}

export default function ProfilePinCard({
  childId,
  displayName,
  avatarKey,
  yearTitle
}: {
  childId: string;
  displayName: string;
  avatarKey: string;
  yearTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(selectChildAction, initialState);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border bg-white p-6 text-center shadow-sm">
      <span className="text-5xl" aria-hidden="true">
        {AVATAR_EMOJI[avatarKey] ?? "🙂"}
      </span>
      <p className="text-lg font-bold text-slate-800">{displayName}</p>
      <p className="text-sm text-slate-500">{yearTitle}</p>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="touch-target w-full rounded-lg border-2 border-brand-500 px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50"
        >
          Enter PIN
        </button>
      ) : (
        <form action={formAction} className="w-full space-y-2">
          <input type="hidden" name="childId" value={childId} />
          <label htmlFor={`pin-${childId}`} className="sr-only">
            4-digit PIN for {displayName}
          </label>
          <input
            id={`pin-${childId}`}
            name="pin"
            type="password"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            required
            autoFocus
            className="touch-target w-full rounded-lg border border-slate-300 px-4 py-2 text-center text-xl tracking-[0.5em]"
            aria-describedby={state.error ? `pin-error-${childId}` : undefined}
          />
          {state.error && (
            <p id={`pin-error-${childId}`} role="alert" className="text-sm text-berry-600">
              {state.error}
            </p>
          )}
          <UnlockButton />
        </form>
      )}
    </div>
  );
}
