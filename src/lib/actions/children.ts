"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPin, requireAdult, requireActiveChild, setActiveChild, verifyPin, clearActiveChild, createChildSession, clearChildSession } from "@/lib/auth";
import { setLocale } from "@/lib/i18n/locale";
import type { FormState } from "./auth";
import { AVATAR_KEYS } from "@/lib/types";

const createChildSchema = z.object({
  displayName: z.string().trim().min(1, "Please enter a name.").max(60),
  avatarKey: z.enum(AVATAR_KEYS),
  yearNumber: z.coerce.number().int().min(1).max(10),
  pathway: z.enum(["CORE", "FOUNDATION", "HIGHER"]).default("CORE"),
  pin: z.string().regex(/^\d{4}$/, "PIN must be exactly 4 digits."),
  pinConfirm: z.string().regex(/^\d{4}$/, "Please confirm the 4-digit PIN.")
});

export async function createChildAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const adult = await requireAdult();
  const parsed = createChildSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }
  const { displayName, avatarKey, yearNumber, pathway, pin, pinConfirm } = parsed.data;
  if (pin !== pinConfirm) {
    return { error: "The PINs do not match.", fieldErrors: { pinConfirm: "PINs do not match." } };
  }

  const schoolYear = await prisma.schoolYear.findUnique({ where: { yearNumber } });
  if (!schoolYear) return { error: "That school year could not be found." };

  // PINs must be unique across one parent's own children — a child logs in
  // with [parent email + PIN] alone (see childLoginAction), so two siblings
  // sharing a PIN would make that lookup ambiguous.
  const siblings = await prisma.childProfile.findMany({ where: { ownerId: adult.id }, select: { pinHash: true } });
  for (const sibling of siblings) {
    if (await verifyPin(pin, sibling.pinHash)) {
      return { error: "Another child already uses this PIN. Please choose a different 4-digit PIN.", fieldErrors: { pin: "PIN already in use by a sibling profile." } };
    }
  }

  const pinHash = await hashPin(pin);
  const child = await prisma.childProfile.create({
    data: {
      ownerId: adult.id,
      displayName,
      avatarKey,
      pinHash,
      currentYearId: schoolYear.id,
      pathway
    }
  });

  // Level 1 of the starting year is unlocked automatically (spec §2).
  const level1 = await prisma.level.findFirst({ where: { schoolYearId: schoolYear.id, levelNumber: 1 } });
  if (level1) {
    await prisma.levelUnlock.create({ data: { childId: child.id, levelId: level1.id } });
  }

  redirect("/profiles");
}

/** Parent-driven only (Path 1 in auth.ts) — the parent is already fully
 * authenticated via their own email+password, so no PIN is asked here. PINs
 * are now solely the child's own credential for childLoginAction below. */
export async function selectChildAction(childId: string): Promise<void> {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: childId, ownerId: adult.id } });
  if (!child) throw new Error("NOT_FOUND");

  await setActiveChild(child.id);
  setLocale(child.locale === "fr" ? "fr" : "en");
  redirect(`/learn/${child.id}/journey`);
}

const childLoginSchema = z.object({
  parentEmail: z.string().trim().toLowerCase().email("Please enter your parent's email address."),
  pin: z.string().regex(/^\d{4}$/, "Please enter your 4-digit PIN.")
});

/** Path 2 in auth.ts — a child logging in directly with their parent's
 * email and their own PIN, independent of any parent session. PINs aren't
 * directly queryable (they're bcrypt hashes), so every child under that
 * parent is checked in turn; PIN uniqueness per parent (enforced in
 * createChildAction above) guarantees at most one of them can ever match. */
export async function childLoginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = childLoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }
  const { parentEmail, pin } = parsed.data;

  const adult = await prisma.adultUser.findUnique({ where: { email: parentEmail } });
  const genericError: FormState = { error: "We couldn't find a profile with that email and PIN. Please check them and try again." };
  if (!adult) return genericError;

  const children = await prisma.childProfile.findMany({ where: { ownerId: adult.id } });
  for (const child of children) {
    if (await verifyPin(pin, child.pinHash)) {
      await createChildSession(child.id);
      setLocale(child.locale === "fr" ? "fr" : "en");
      redirect(`/learn/${child.id}/journey`);
    }
  }
  return genericError;
}

export async function childLogoutAction(): Promise<void> {
  await clearChildSession();
  redirect("/child-login");
}

export async function switchProfileAction(): Promise<void> {
  await clearActiveChild();
  redirect("/profiles");
}

const goalPathwaySchema = z.object({
  pathway: z.enum(["CORE", "FOUNDATION", "HIGHER"])
});

export async function setPathwayAction(formData: FormData): Promise<void> {
  const { adult, child } = await requireActiveChild();
  const parsed = goalPathwaySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.childProfile.update({ where: { id: child.id, ownerId: adult.id }, data: { pathway: parsed.data.pathway } });
}

const accessibilitySchema = z.object({
  fontMode: z.enum(["STANDARD", "DYSLEXIC"]),
  highContrast: z.enum(["on", "off"]).default("off"),
  reducedMotion: z.enum(["on", "off"]).default("off"),
  soundMuted: z.enum(["on", "off"]).default("off"),
  readAloud: z.enum(["on", "off"]).default("off"),
  audioVolume: z.coerce.number().int().min(0).max(100)
});

export async function updateAccessibilitySettingsAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const { adult, child } = await requireActiveChild();
  const parsed = accessibilitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Please check your settings and try again." };
  const d = parsed.data;
  await prisma.childProfile.update({
    where: { id: child.id, ownerId: adult.id },
    data: {
      fontMode: d.fontMode,
      highContrast: d.highContrast === "on",
      reducedMotion: d.reducedMotion === "on",
      soundMuted: d.soundMuted === "on",
      readAloud: d.readAloud === "on",
      audioVolume: d.audioVolume
    }
  });
  return { error: undefined };
}

/** Same settings update, but reachable from the parent/teacher dashboard
 * (ownership verified directly) rather than requiring the child's PIN. */
export async function updateAccessibilitySettingsAsAdultAction(childId: string, formData: FormData): Promise<void> {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: childId, ownerId: adult.id } });
  if (!child) throw new Error("FORBIDDEN");
  const parsed = accessibilitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const d = parsed.data;
  await prisma.childProfile.update({
    where: { id: child.id },
    data: {
      fontMode: d.fontMode,
      highContrast: d.highContrast === "on",
      reducedMotion: d.reducedMotion === "on",
      soundMuted: d.soundMuted === "on",
      readAloud: d.readAloud === "on",
      audioVolume: d.audioVolume
    }
  });
}

export async function resetPracticeActivityAction(childId: string, levelId: string, mode: "GUIDED" | "INDEPENDENT" | "REVISION"): Promise<void> {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: childId, ownerId: adult.id } });
  if (!child) throw new Error("FORBIDDEN");
  await prisma.practiceAttempt.deleteMany({ where: { childId, levelId, mode } });
}

const learningGoalSchema = z.object({
  description: z.string().trim().min(3).max(200),
  targetType: z.enum(["levels_per_week", "minutes_per_week", "objective_focus"]),
  targetValue: z.coerce.number().int().min(1).max(1000)
});

export async function setLearningGoalAction(childId: string, formData: FormData): Promise<void> {
  const adult = await requireAdult();
  const child = await prisma.childProfile.findFirst({ where: { id: childId, ownerId: adult.id } });
  if (!child) throw new Error("FORBIDDEN");
  const parsed = learningGoalSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const periodStart = new Date();
  const periodEnd = new Date(periodStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  await prisma.learningGoal.create({
    data: {
      childId,
      setByAdultId: adult.id,
      description: parsed.data.description,
      targetType: parsed.data.targetType,
      targetValue: parsed.data.targetValue,
      periodStart,
      periodEnd
    }
  });
}
