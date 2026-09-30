import type { Locale } from "./locale";

/** Picks the French variant of a piece of curriculum/lesson/achievement
 * content when the locale is "fr" and a translation exists, falling back to
 * the English value otherwise. Every `*Fr` database column is nullable, so
 * content that hasn't been translated yet (or a locale change on an old row)
 * degrades gracefully to English instead of showing blank text. */
export function localize(locale: Locale, en: string, fr: string | null | undefined): string {
  return locale === "fr" && fr ? fr : en;
}

/** Same as `localize`, but for a JSON-serialised value (e.g. a lesson's
 * `workedExamples`/`workedExamplesFr` columns) — picks the right JSON string
 * before parsing it. */
export function localizeJson<T>(locale: Locale, en: string, fr: string | null | undefined): T {
  return JSON.parse(localize(locale, en, fr)) as T;
}
