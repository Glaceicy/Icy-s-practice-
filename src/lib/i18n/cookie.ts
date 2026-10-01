/** The locale cookie name, factored out on its own with no other imports so
 * it can be safely used from both server components/actions (via
 * `./locale.ts`, which pulls in `next/headers`) and Edge Middleware (which
 * cannot use `next/headers`'s `cookies()` and instead reads/writes cookies
 * directly on the request/response). */
export const LOCALE_COOKIE = "mj_locale";
