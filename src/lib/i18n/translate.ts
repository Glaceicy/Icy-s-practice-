import { dictionary } from "./dictionary";
import type { Locale } from "@/lib/questionEngine/types";

function lookup(locale: Locale, key: string): string | undefined {
  let node: unknown = dictionary[locale];
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

/** Looks up `key` (dot-path into dictionary.ts, e.g. "login.title") in the
 * given locale, falling back to English, then to the raw key itself if even
 * English is missing it — this can never throw or render blank, so a typo'd
 * or not-yet-added key just shows up as an obviously-wrong string instead of
 * crashing the page. `{var}` placeholders are replaced from `vars`. */
export function translate(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const text = lookup(locale, key) ?? lookup("en", key) ?? key;
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}
