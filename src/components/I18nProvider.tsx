"use client";

import { createContext, useContext, useMemo } from "react";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/questionEngine/types";

const LocaleContext = createContext<Locale>("en");

/** Makes the resolved server-side locale available to every Client Component
 * without prop-threading it through the whole tree. Mounted once in the root
 * layout. Server Components don't need this — they can call `getLocale()` +
 * `translate()` directly per request. */
export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

/** `const t = useT(); t("login.title")` — a stable per-locale translate
 * function for Client Components. */
export function useT(): TranslateFn {
  const locale = useLocale();
  return useMemo(() => (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars), [locale]);
}
