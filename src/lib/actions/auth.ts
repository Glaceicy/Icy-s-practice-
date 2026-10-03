"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  clearActiveChild,
  clearAdultSession,
  createAdultSession,
  generateVerificationToken,
  hashPassword,
  hashVerificationToken,
  verifyPassword
} from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/email";

const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(200),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  password: z.string().min(10, "Password must be at least 10 characters long."),
  role: z.enum(["PARENT", "TEACHER"]),
  consent: z.literal("on", { errorMap: () => ({ message: "You must confirm you are an adult and consent to creating child profiles." }) })
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

export async function logoutAction(): Promise<void> {
  await clearAdultSession();
  await clearActiveChild();
  redirect("/");
}
