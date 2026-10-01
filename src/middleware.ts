import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/cookie";

// Countries whose majority/official language is French — visitors from here
// get French by default. Country-level only; genuinely mixed-language
// countries (Canada, Switzerland) are handled separately below by region,
// since defaulting their whole population to French would be wrong far more
// often than right.
const FRENCH_SPEAKING_COUNTRIES = new Set([
  "FR", "BE", "LU", "MC", // Western Europe
  "GP", "MQ", "GF", "RE", "YT", "PM", "BL", "MF", "WF", "PF", "NC", // French overseas territories
  "SN", "CI", "ML", "BF", "NE", "TG", "BJ", "GN", "CD", "CG", "CM", "GA", "TD", "CF", "MG", "BI", "RW", "DJ", "KM", // Francophone Africa
  "HT", "VU" // Other francophone
]);

// ISO 3166-2 region codes, within an otherwise-mixed country, whose
// population is majority French-speaking.
const FRENCH_SPEAKING_REGIONS: Record<string, Set<string>> = {
  CA: new Set(["QC"]), // Quebec
  CH: new Set(["GE", "VD", "NE", "JU", "FR", "VS"]) // Geneva, Vaud, Neuchâtel, Jura, Fribourg, Valais
};

const LOCALE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year — matches setLocale() in lib/i18n/locale.ts

/** Picks a default language for first-time visitors based on where the
 * request is coming from, so a family browsing from France lands on a
 * French site without having to find the EN/FR toggle first. Only ever
 * runs when no locale cookie exists yet — any explicit choice (the
 * toggle, or a child's own saved preference) always wins from then on,
 * this never overrides it. Geolocation comes from Vercel's edge network
 * (`x-vercel-ip-country`/`-region` headers); locally, or off Vercel,
 * these headers are absent and the app falls back to its existing
 * English default, unchanged. */
export function middleware(request: NextRequest): NextResponse {
  if (request.cookies.has(LOCALE_COOKIE)) return NextResponse.next();

  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const region = request.headers.get("x-vercel-ip-country-region") ?? "";
  const isFrenchSpeaking = FRENCH_SPEAKING_COUNTRIES.has(country) || (FRENCH_SPEAKING_REGIONS[country]?.has(region) ?? false);
  if (!isFrenchSpeaking) return NextResponse.next();

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, "fr", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: LOCALE_MAX_AGE_SECONDS
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js).*)"]
};
