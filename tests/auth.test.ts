import { describe, expect, it } from "vitest";
import { isSessionStale } from "@/lib/sessionFreshness";

/** The rule a password reset relies on to end sessions the old password left
 * signed in. Tested directly because the interesting part is the rounding
 * between a JWT's whole-second `iat` and a millisecond timestamp — get it
 * wrong in either direction and either the reset does nothing or it logs the
 * user out of the session it has just created. */
describe("isSessionStale", () => {
  const at = (iso: string) => new Date(iso);
  const seconds = (iso: string) => Math.floor(new Date(iso).getTime() / 1000);

  it("accepts every session on an account whose password has never changed", () => {
    expect(isSessionStale(seconds("2026-01-01T00:00:00Z"), null)).toBe(false);
    expect(isSessionStale(undefined, null)).toBe(false);
    expect(isSessionStale(0, undefined)).toBe(false);
  });

  it("refuses a session issued before the password changed", () => {
    expect(isSessionStale(seconds("2026-01-01T09:00:00Z"), at("2026-01-01T10:00:00Z"))).toBe(true);
  });

  it("accepts a session issued after the password changed", () => {
    expect(isSessionStale(seconds("2026-01-01T11:00:00Z"), at("2026-01-01T10:00:00Z"))).toBe(false);
  });

  it("accepts the session the reset itself creates, despite the lost milliseconds", () => {
    // resetPasswordAction stamps passwordChangedAt and then signs a token, so
    // the token's floored `iat` lands just before it within the same second.
    const changedAt = at("2026-01-01T10:00:00.900Z");
    const issuedAt = seconds("2026-01-01T10:00:00.900Z"); // floor -> 10:00:00
    expect(issuedAt * 1000).toBeLessThan(changedAt.getTime());
    expect(isSessionStale(issuedAt, changedAt)).toBe(false);
  });

  it("still refuses a session from the second before the change", () => {
    expect(isSessionStale(seconds("2026-01-01T09:59:59Z"), at("2026-01-01T10:00:00.900Z"))).toBe(true);
  });

  it("refuses a token with no issue time once a password has changed", () => {
    expect(isSessionStale(undefined, at("2026-01-01T10:00:00Z"))).toBe(true);
  });
});
