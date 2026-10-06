/** Whether an adult session predates the account's last password change.
 *
 * Changing a password has to end the sessions the old password left behind —
 * otherwise a reset does nothing about the case it exists for, which is
 * somebody else already being signed in. Sessions are stateless JWTs with no
 * server-side record to delete, so instead each one is checked against the
 * account: a token issued before the password changed is refused.
 *
 * Kept here, free of any server-only import, so the comparison itself can be
 * tested directly. `requireAdult()` in auth.ts applies it.
 *
 * The rounding matters. A JWT's `iat` is whole seconds (floored), while
 * `passwordChangedAt` carries milliseconds, so the session created moments
 * after a reset can carry an `iat` that sits a fraction of a second *before*
 * it — comparing the raw values would log the user straight back out. Both
 * sides are therefore truncated to the second, which costs nothing: a session
 * issued in the same second as the change is the one the reset just created.
 */
export function isSessionStale(issuedAtSeconds: number | undefined, passwordChangedAt: Date | null | undefined): boolean {
  if (!passwordChangedAt) return false;
  // A token with no `iat` cannot be placed relative to the change, and an
  // account that has had a password change is exactly where the benefit of
  // the doubt does not belong.
  if (issuedAtSeconds === undefined) return true;
  return issuedAtSeconds < Math.floor(passwordChangedAt.getTime() / 1000);
}
