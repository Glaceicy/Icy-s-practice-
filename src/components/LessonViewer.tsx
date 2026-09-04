"use client";

import { useState } from "react";
import Link from "next/link";
import ReadAloudButton from "./ReadAloudButton";
import VisualAidRenderer from "./VisualAidRenderer";

export interface LessonViewModel {
  order: number;
  title: string;
  explanationMd: string;
  visualAid: string;
  audioScript: string;
  workedExamples: Array<{ problem: string; steps: string[]; answer: string }>;
}

export default function LessonViewer({
  lesson,
  childId,
  levelId,
  lessonCount,
  reducedMotion
}: {
  lesson: LessonViewModel;
  childId: string;
  levelId: string;
  lessonCount: number;
  reducedMotion: boolean;
}) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [differentExplanation, setDifferentExplanation] = useState(false);
  const example = lesson.workedExamples[exampleIndex % lesson.workedExamples.length]!;

  const isLast = lesson.order >= lessonCount;
  const nextHref = isLast ? `/learn/${childId}/level/${levelId}/guided` : `/learn/${childId}/level/${levelId}/lesson/${lesson.order + 1}`;

  return (
    <article className={`rounded-xl2 border bg-white p-6 shadow-sm ${reducedMotion ? "" : "animate-pop-in"}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Lesson {lesson.order} of {lessonCount}
      </p>
      <h1 className="mt-1 text-2xl font-extrabold text-brand-800">{lesson.title}</h1>

      <div className="mt-4 flex justify-center">
        <VisualAidRenderer kind={lesson.visualAid} data={placeholderDataFor(lesson.visualAid)} />
      </div>

      <div className="prose prose-slate mt-4 max-w-none text-slate-700">
        {(differentExplanation ? simplify(lesson.explanationMd) : lesson.explanationMd).split("\n\n").map((para, i) => (
          <p key={i}>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ReadAloudButton text={`${lesson.title}. ${lesson.audioScript}`} />
        <button
          type="button"
          onClick={() => setDifferentExplanation((v) => !v)}
          className="touch-target rounded-lg border border-brand-300 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {differentExplanation ? "Show the original explanation" : "Explain this differently"}
        </button>
      </div>

      <div className="mt-6 rounded-lg bg-brand-50 p-4">
        <h2 className="font-bold text-brand-800">Worked example</h2>
        <p className="mt-1 font-medium">{example.problem}</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {example.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <p className="mt-2 font-semibold text-brand-700">Answer: {example.answer}</p>
        {lesson.workedExamples.length > 1 && (
          <button
            type="button"
            onClick={() => setExampleIndex((i) => i + 1)}
            className="touch-target mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Show me another example
          </button>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        {lesson.order > 1 ? (
          <Link href={`/learn/${childId}/level/${levelId}/lesson/${lesson.order - 1}`} className="touch-target rounded-lg border px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50">
            ← Replay previous
          </Link>
        ) : (
          <span />
        )}
        <Link href={nextHref} className="touch-target rounded-lg bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700">
          {isLast ? "Start guided practice →" : "Next lesson →"}
        </Link>
      </div>
    </article>
  );
}

function simplify(md: string): string {
  // A lighter-touch phrasing for "Explain this differently" — shorter
  // sentences, no markdown emphasis.
  return md
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0)
    .map((s) => `• ${s.trim()}`)
    .join("\n\n");
}

function placeholderDataFor(kind: string): Record<string, unknown> {
  switch (kind) {
    case "number-line":
      return { min: 0, max: 20, highlight: 12 };
    case "ten-frame":
      return { filled: 7 };
    case "counters":
      return { count: 6 };
    case "array":
      return { rows: 3, cols: 4 };
    case "clock":
      return { hour: 3, minute: 30 };
    case "coins":
      return { pence: [10, 10, 2, 1] };
    case "bar-model":
      return { parts: [8, 5], total: 13 };
    case "fraction-diagram":
      return { numerator: 1, denominator: 4, shape: "bar" };
    case "algebra-tile":
      return { xCount: 3, unitCount: 4 };
    default:
      return {};
  }
}
