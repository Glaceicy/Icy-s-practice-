import "server-only";
import { Resend } from "resend";

/** The site's own base URL, used to build absolute links in emails (a
 * server action has no request origin to read). Set SITE_URL explicitly in
 * production (e.g. https://www.mathsjourney.co.uk) — Vercel's own
 * VERCEL_URL always points at the *.vercel.app deployment URL, not a custom
 * domain, so it's only a sensible fallback, not a final answer. */
function getSiteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

let resendClient: Resend | null = null;
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable must be set to send email. See the Resend setup notes in the project README.");
  }
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "Maths Journey UK <onboarding@resend.dev>";

export function verificationUrl(token: string): string {
  return `${getSiteUrl()}/verify-email?token=${encodeURIComponent(token)}`;
}

/** Sends the "confirm your email" link a new parent/teacher account must
 * click before they can log in. Errors propagate to the caller — a failed
 * send should surface to the admin/user rather than silently leaving an
 * account unverifiable, since there is no other way to get the link. */
export async function sendVerificationEmail(to: string, fullName: string, token: string): Promise<void> {
  const url = verificationUrl(token);
  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Confirm your email for Maths Journey UK",
    html: `
      <p>Hi ${escapeHtml(fullName)},</p>
      <p>Thanks for creating a Maths Journey UK account. Please confirm this is your email address to finish setting up your account and start adding child profiles:</p>
      <p><a href="${url}">Confirm my email address</a></p>
      <p>This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.</p>
    `,
    text: `Hi ${fullName},\n\nThanks for creating a Maths Journey UK account. Please confirm this is your email address by visiting:\n${url}\n\nThis link expires in 24 hours. If you didn't create this account, you can safely ignore this email.`
  });
}

export function passwordResetUrl(token: string): string {
  return `${getSiteUrl()}/reset-password?token=${encodeURIComponent(token)}`;
}

/** Sends the "choose a new password" link. Deliberately says nothing about the
 * account beyond the name already on it: the request form answers the same way
 * whether or not an address is registered, and an email that confirmed "yes,
 * this address has an account" would give that away to anyone who could see
 * it. The closing line is the one safeguard that matters — somebody who did
 * not ask for this needs to know the link exists and that ignoring it leaves
 * their password untouched. */
export async function sendPasswordResetEmail(to: string, fullName: string, token: string): Promise<void> {
  const url = passwordResetUrl(token);
  await getResendClient().emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Reset your Maths Journey UK password",
    html: `
      <p>Hi ${escapeHtml(fullName)},</p>
      <p>Someone asked to reset the password for your Maths Journey UK account. Choose a new one here:</p>
      <p><a href="${url}">Set a new password</a></p>
      <p>This link expires in one hour and can only be used once. Setting a new password will sign you out everywhere else.</p>
      <p>If you didn't ask for this, you can ignore this email — your password will not change, and nobody can use this link without your inbox.</p>
    `,
    text: `Hi ${fullName},\n\nSomeone asked to reset the password for your Maths Journey UK account. Choose a new one by visiting:\n${url}\n\nThis link expires in one hour and can only be used once. Setting a new password will sign you out everywhere else.\n\nIf you didn't ask for this, you can ignore this email — your password will not change, and nobody can use this link without your inbox.`
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
