"use client";

import { useState } from "react";

/** Optional read-aloud support using the browser's built-in speech synthesis
 * (spec §11). Purely additive — the same text is always shown visually, so
 * this is a genuine accessibility aid rather than the only way to access
 * content, and it degrades gracefully in browsers without speech support. */
export default function ReadAloudButton({ text, volume = 0.8 }: { text: string; volume?: number }) {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  function speak() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.95;
    utterance.volume = Math.min(1, Math.max(0, volume));
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={speaking ? stop : speak}
      aria-pressed={speaking}
      className="touch-target inline-flex items-center gap-2 rounded-lg border border-brand-300 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
    >
      <span aria-hidden="true">{speaking ? "⏸️" : "🔊"}</span>
      {speaking ? "Stop reading" : "Read aloud"}
    </button>
  );
}
