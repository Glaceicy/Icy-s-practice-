"use client";

import { useEffect, useState } from "react";
import type { StoredQuestionView } from "@/lib/services/questionLog";

interface MatchItem {
  id: string;
  label: string;
}

export default function QuestionInput({
  question,
  disabled,
  onSubmit
}: {
  question: StoredQuestionView;
  disabled: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [text, setText] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});

  useEffect(() => {
    setText("");
    setSelectedChoice(null);
    setOrderedIds([]);
    setMatches({});
  }, [question.logId]);

  const isMatching = question.type === "MATCHING";
  const isOrdering = question.type === "ORDERING" || question.type === "DRAG_DROP";
  const isChoiceBased = !isMatching && !isOrdering && !!question.choices && question.choices.length > 0;
  const isFreeText = !isMatching && !isOrdering && !isChoiceBased;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;
    if (isChoiceBased && selectedChoice) onSubmit(selectedChoice);
    else if (isOrdering) onSubmit(orderedIds.join(","));
    else if (isMatching) {
      const left = ((question.visualAid?.data.left as MatchItem[]) ?? []).map((l) => l.id);
      onSubmit(left.map((id) => `${id}=${matches[id] ?? ""}`).join(";"));
    } else if (isFreeText) onSubmit(text);
  }

  const canSubmit =
    (isChoiceBased && !!selectedChoice) ||
    (isOrdering && orderedIds.length === (question.choices?.length ?? 0) && orderedIds.length > 0) ||
    (isMatching && Object.keys(matches).length === ((question.visualAid?.data.left as MatchItem[]) ?? []).length) ||
    (isFreeText && text.trim().length > 0);

  return (
    <form onSubmit={submit} className="space-y-4">
      {question.visualAid && question.visualAid.kind !== "none" && (
        <div className="flex justify-center py-2">
          <VisualAidLazy kind={question.visualAid.kind} data={question.visualAid.data} />
        </div>
      )}

      {isChoiceBased && (
        <fieldset className="space-y-2">
          <legend className="sr-only">Choose an answer</legend>
          {question.choices!.map((choice) => (
            <label
              key={choice.id}
              className={`touch-target flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 ${
                selectedChoice === choice.id ? "border-brand-600 bg-brand-50" : "border-slate-200"
              }`}
            >
              <input
                type="radio"
                name="choice"
                value={choice.id}
                checked={selectedChoice === choice.id}
                onChange={() => setSelectedChoice(choice.id)}
                disabled={disabled}
                className="h-5 w-5"
              />
              <span className="text-lg">{choice.label}</span>
            </label>
          ))}
        </fieldset>
      )}

      {isOrdering && (
        <div>
          <p className="text-sm text-slate-600">Tap the items in order (or use the number buttons for a keyboard/accessible alternative to dragging).</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {question.choices!.map((choice) => {
              const chosenIndex = orderedIds.indexOf(choice.id);
              return (
                <button
                  type="button"
                  key={choice.id}
                  disabled={disabled || chosenIndex !== -1}
                  onClick={() => setOrderedIds((prev) => [...prev, choice.id])}
                  className={`touch-target rounded-lg border-2 px-4 py-2 font-semibold ${chosenIndex !== -1 ? "border-leaf-500 bg-leaf-50 text-leaf-700" : "border-slate-300 hover:border-brand-400"}`}
                >
                  {chosenIndex !== -1 ? `${chosenIndex + 1}. ` : ""}
                  {choice.label}
                </button>
              );
            })}
          </div>
          {orderedIds.length > 0 && (
            <button type="button" onClick={() => setOrderedIds([])} className="mt-2 text-sm font-semibold text-slate-500 underline">
              Reset order
            </button>
          )}
        </div>
      )}

      {isMatching && (
        <div className="space-y-2">
          {((question.visualAid?.data.left as MatchItem[]) ?? []).map((left) => (
            <div key={left.id} className="flex items-center gap-3">
              <span className="w-32 font-semibold">{left.label}</span>
              <select
                value={matches[left.id] ?? ""}
                onChange={(e) => setMatches((prev) => ({ ...prev, [left.id]: e.target.value }))}
                disabled={disabled}
                className="touch-target flex-1 rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="">Choose a match&hellip;</option>
                {((question.visualAid?.data.right as MatchItem[]) ?? []).map((right) => (
                  <option key={right.id} value={right.id}>
                    {right.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {isFreeText && (
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-slate-700">
            Your answer
          </label>
          <input
            id="answer"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={disabled}
            autoFocus
            autoComplete="off"
            className="mt-1 touch-target w-full rounded-lg border-2 border-slate-300 px-4 py-3 text-xl"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={disabled || !canSubmit}
        className="touch-target w-full rounded-xl2 bg-brand-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-50"
      >
        Submit answer
      </button>
    </form>
  );
}

// Loaded dynamically-in-place (kept simple: same bundle, just a thin wrapper)
// so this file stays framework-agnostic about the visual renderer's exact prop shape.
import VisualAidRenderer from "./VisualAidRenderer";
function VisualAidLazy({ kind, data }: { kind: string; data: Record<string, unknown> }) {
  return <VisualAidRenderer kind={kind} data={data} />;
}
