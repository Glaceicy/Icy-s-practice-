"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { clearActiveChild, clearAdultSession, createAdultSession, hashPassword, verifyPassword } from "@/lib/auth";

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
  const adult = await prisma.adultUser.create({
    data: { fullName, email, passwordHash, role, consentGivenAt: new Date() }
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
  await createAdultSession(adult.id);
  redirect("/profiles");
}

export async function logoutAction(): Promise<void> {
  await clearAdultSession();
  await clearActiveChild();
  redirect("/");
}
