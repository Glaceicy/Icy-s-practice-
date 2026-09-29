import "server-only";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/questionEngine/types";

export type { Locale };

export const LOCALE_COOKIE = "mj_locale";
export const SUPPORTED_LOCALES: Locale[] = ["en", "fr"];

function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fr";
}

/** Reads the site-wide language preference from its cookie. Every page and
 * server action reads this fresh per request — same pattern as session/auth
 * cookies elsewhere in this app — so there is nothing to keep in sync. */
export async function getLocale(): Promise<Locale> {
  const raw = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(raw) ? raw : "en";
}

const LOCALE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year — a plain preference, not a session

export function setLocale(locale: Locale): void {
  cookies().set(LOCALE_COOKIE, locale, {
    httpOnly: false, // read client-side too, e.g. to set <html lang> without a round trip
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: LOCALE_MAX_AGE_SECONDS
  });
}
