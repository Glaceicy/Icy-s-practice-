import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const SESSION_COOKIE = "mj_session";
const CHILD_COOKIE = "mj_child";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    // A missing AUTH_SECRET in production is a deployment misconfiguration,
    // not something to silently paper over — fail loudly instead of signing
    // sessions with a predictable key.
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET environment variable must be set in production.");
    }
    return new TextEncoder().encode("dev-only-insecure-secret-do-not-use-in-production");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

export async function createAdultSession(adultId: string): Promise<void> {
  const token = await new SignJWT({ adultId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export async function getAdultSession(): Promise<{ adultId: string } | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.adultId !== "string") return null;
    return { adultId: payload.adultId };
  } catch {
    return null;
  }
}

export async function requireAdult() {
  const session = await getAdultSession();
  if (!session) throw new Error("UNAUTHENTICATED");
  const adult = await prisma.adultUser.findUnique({ where: { id: session.adultId } });
  if (!adult) throw new Error("UNAUTHENTICATED");
  return adult;
}

export async function clearAdultSession(): Promise<void> {
  cookies().delete(SESSION_COOKIE);
  cookies().delete(CHILD_COOKIE);
}

export async function setActiveChild(childId: string): Promise<void> {
  cookies().set(CHILD_COOKIE, childId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export async function clearActiveChild(): Promise<void> {
  cookies().delete(CHILD_COOKIE);
}

/** Returns the active child profile, but only if it belongs to the currently
 * authenticated adult — re-verified against the database on every call so a
 * tampered cookie can never grant access to another family's child. */
export async function requireActiveChild() {
  const adult = await requireAdult();
  const childId = cookies().get(CHILD_COOKIE)?.value;
  if (!childId) throw new Error("NO_ACTIVE_CHILD");
  const child = await prisma.childProfile.findFirst({ where: { id: childId, ownerId: adult.id } });
  if (!child) throw new Error("NO_ACTIVE_CHILD");
  return { adult, child };
}

/** Guards a /learn/[childId]/* route: the active child (verified above) must
 * match the childId in the URL, so one child's session can never render or
 * act on another child's data even within the same family. */
export async function assertChildAccess(childId: string) {
  const { adult, child } = await requireActiveChild();
  if (child.id !== childId) throw new Error("FORBIDDEN");
  return { adult, child };
}

/** Non-throwing variant used by the root layout to theme the page (font,
 * contrast, motion) for the active child without failing the whole render
 * when nobody is signed in yet. */
export async function getActiveChildSoft() {
  try {
    const { child } = await requireActiveChild();
    return child;
  } catch {
    return null;
  }
}
