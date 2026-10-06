"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  clearActiveChild,
  clearAdultSession,
  createAdultSession,
  generatePasswordResetToken,
  generateVerificationToken,
  hashPassword,
  hashVerificationToken,
  verifyPassword
} from "@/lib/auth";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name.").max(200),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
    password: z.string().min(10, "Password must be at least 10 characters long."),
    passwordConfirm: z.string().min(1, "Please confirm your password."),
    role: z.enum(["PARENT", "TEACHER"]),
    consent: z.literal("on", { errorMap: () => ({ message: "You must confirm you are an adult and consent to creating child profiles." }) })
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"]
  });

export interface FormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function registerAdultAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  const { fullName, email, password, role } = parsed.data;

  const existing = await prisma.adultUser.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account already exists with that email address.", fieldErrors: { email: "Email already registered." } };
  }

  const passwordHash = await hashPassword(password);
  const { token, tokenHash, expiresAt } = generateVerificationToken();
  const adult = await prisma.adultUser.create({
    data: {
      fullName,
      email,
      passwordHash,
      role,
      consentGivenAt: new Date(),
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpiresAt: expiresAt
    }
  });

  // No session is created yet — an account can't be used (and in
  // particular can't create child profiles) until the email is confirmed,
  // so a fake/mistyped address can never reach a real family's data.
  try {
    await sendVerificationEmail(adult.email, adult.fullName, token);
  } catch (e) {
    // The account exists but is now stuck unverified with no way to resend
    // from this request — surface it rather than pretending it worked.
    return { error: "Your account was created, but we couldn't send the verification email. Please try registering again in a moment, or contact support." };
  }

  redirect(`/register/check-email?email=${encodeURIComponent(email)}`);
}

export async function resendVerificationEmailAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) return { error: "Please enter your email address." };

  const adult = await prisma.adultUser.findUnique({ where: { email } });
  // Deliberately the same message whether or not the account exists, so
  // this can't be used to probe which email addresses are registered.
  const genericConfirmation: FormState = { error: undefined };
  if (!adult || adult.emailVerified) return genericConfirmation;

  const { token, tokenHash, expiresAt } = generateVerificationToken();
  await prisma.adultUser.update({
    where: { id: adult.id },
    data: { emailVerificationTokenHash: tokenHash, emailVerificationExpiresAt: expiresAt }
  });
  try {
    await sendVerificationEmail(adult.email, adult.fullName, token);
  } catch {
    return { error: "We couldn't send the email just now. Please try again in a moment." };
  }
  return genericConfirmation;
}

export async function verifyEmailAction(token: string): Promise<{ error?: string }> {
  if (!token) return { error: "Missing verification token." };
  const tokenHash = hashVerificationToken(token);
  const adult = await prisma.adultUser.findUnique({ where: { emailVerificationTokenHash: tokenHash } });
  if (!adult || !adult.emailVerificationExpiresAt || adult.emailVerificationExpiresAt < new Date()) {
    return { error: "This verification link is invalid or has expired. Please request a new one from the login page." };
  }

  await prisma.adultUser.update({
    where: { id: adult.id },
    data: { emailVerified: true, emailVerificationTokenHash: null, emailVerificationExpiresAt: null }
  });

  await createAdultSession(adult.id);
  redirect("/profiles");
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password.")
});

export async function loginAdultAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please enter a valid email and password." };
  }
  const { email, password } = parsed.data;
  const adult = await prisma.adultUser.findUnique({ where: { email } });
  if (!adult) {
    return { error: "No account found with that email and password." };
  }
  const valid = await verifyPassword(password, adult.passwordHash);
  if (!valid) {
    return { error: "No account found with that email and password." };
  }
  if (!adult.emailVerified) {
    return { error: "Please confirm your email address before logging in — check your inbox for the verification link, or request a new one.", fieldErrors: { email: "Email not yet verified." } };
  }
  await createAdultSession(adult.id);
  redirect("/profiles");
}

const requestPasswordResetSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.")
});

/**
 * Step 1 of a reset: email the account a one-time link.
 *
 * Succeeds identically whether or not the address has an account. "No account
 * found with that email" would turn this form into a way to test which
 * families use the app, and on a children's product that is a list worth not
 * handing out. The caller gets the same confirmation either way and the person
 * who really owns the address finds out from their inbox.
 *
 * The response body gives nothing away; the response *time* still does, since
 * only the registered path hashes a token, writes it and calls Resend. Closing
 * that means doing equivalent work on both paths, which is tracked with the
 * missing rate limit in DOCUMENTATION.md §14 rather than faked with a sleep.
 */
export async function requestPasswordResetAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = requestPasswordResetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Please enter a valid email address.", fieldErrors: { email: "Please enter a valid email address." } };
  }

  const adult = await prisma.adultUser.findUnique({ where: { email: parsed.data.email } });
  if (!adult) return {};

  const { token, tokenHash, expiresAt } = generatePasswordResetToken();
  // Issuing a new link invalidates any earlier one, since the column holds a
  // single hash — a second request while the first email is still in flight
  // leaves exactly one usable link, the newest.
  await prisma.adultUser.update({
    where: { id: adult.id },
    data: { passwordResetTokenHash: tokenHash, passwordResetExpiresAt: expiresAt }
  });

  try {
    await sendPasswordResetEmail(adult.email, adult.fullName, token);
  } catch {
    // Worth breaking the uniform response for: the address does have an
    // account, the person is sitting there waiting, and silence would send
    // them to check an inbox nothing was ever delivered to.
    return { error: "We couldn't send the email just now. Please try again in a moment." };
  }
  return {};
}

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "This reset link is missing its code."),
    password: z.string().min(10, "Password must be at least 10 characters long."),
    passwordConfirm: z.string().min(1, "Please confirm your new password.")
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"]
  });

/** Step 2: the link is proof of control of the inbox, so it is enough on its
 * own to set a new password — someone who has forgotten the old one cannot be
 * asked for it. */
export async function resetPasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = resetPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  const { token, password } = parsed.data;
  const adult = await prisma.adultUser.findUnique({ where: { passwordResetTokenHash: hashVerificationToken(token) } });
  if (!adult || !adult.passwordResetExpiresAt || adult.passwordResetExpiresAt < new Date()) {
    return { error: "This reset link is invalid, already used, or has expired. Please request a new one." };
  }

  await prisma.adultUser.update({
    where: { id: adult.id },
    data: {
      passwordHash: await hashPassword(password),
      // Clearing the hash is what makes the link single-use.
      passwordResetTokenHash: null,
      passwordResetExpiresAt: null,
      // Sessions older than this are refused from here on, so a reset also
      // signs out whoever the forgotten password had left signed in.
      passwordChangedAt: new Date(),
      // Following a link sent to the address proves the same thing the
      // verification email asks, so an account still waiting on that is now
      // confirmed rather than being locked out one step further on.
      emailVerified: true,
      emailVerificationTokenHash: null,
      emailVerificationExpiresAt: null
    }
  });

  await createAdultSession(adult.id);
  redirect("/profiles");
}

export async function logoutAction(): Promise<void> {
  await clearAdultSession();
  await clearActiveChild();
  redirect("/");
}
