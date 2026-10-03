import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { prisma } from "./db";

const SESSION_COOKIE = "mj_session";
const CHILD_COOKIE = "mj_child";
const CHILD_SESSION_COOKIE = "mj_child_session";
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

/** A one-time, time-limited link token (e.g. for email verification). The
 * raw token goes in the emailed link and is never stored; only its SHA-256
 * hash is kept, so a database leak alone can't be used to "verify" an
 * account — unlike a password/PIN this doesn't need slow bcrypt hashing,
 * since the token already has 256 bits of its own entropy. */
export function generateVerificationToken(): { token: string; tokenHash: string; expiresAt: Date } {
  const token = randomBytes(32).toString("hex");
  return { token, tokenHash: hashVerificationToken(token), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) };
}

export function hashVerificationToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
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

/** Path 1 (parent-driven): the parent is fully logged in and has picked a
 * child from /profiles to view/monitor. Layered on top of the adult
 * session, so it only ever works for an already-authenticated parent. */
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

/** Path 2 (child-driven): a self-contained session for a child who logged
 * in directly with their parent's email + their own PIN (see
 * childLoginAction). Deliberately carries no adult/parent privileges at
 * all — it is a completely separate credential from the adult session
 * above, not layered on it, so a child using this never has a route into
 * /dashboard, /profiles or /admin (those all require `requireAdult()`,
 * which only ever looks at the adult session cookie). */
export async function createChildSession(childId: string): Promise<void> {
  const token = await new SignJWT({ childId, kind: "child" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());

  cookies().set(CHILD_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

async function getChildSessionToken(): Promise<{ childId: string } | null> {
  const token = cookies().get(CHILD_SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.childId !== "string" || payload.kind !== "child") return null;
    return { childId: payload.childId };
  } catch {
    return null;
  }
}

export async function clearChildSession(): Promise<void> {
  cookies().delete(CHILD_SESSION_COOKIE);
}

/** True while a child-only session (Path 2) is active — used purely to
 * adapt the UI (e.g. ChildTopBar hides "switch profile"/"parent dashboard"
 * links a child-only session could never use anyway, since requireAdult()
 * would just refuse them). Never used as the actual access-control check —
 * requireActiveChild()/assertChildAccess() below are. */
export async function isChildOnlySession(): Promise<boolean> {
  const adult = await getAdultSession();
  if (adult) return false;
  return (await getChildSessionToken()) !== null;
}

/** Returns the active child profile for either session type:
 * - Path 1: a logged-in parent who has selected a child from /profiles.
 * - Path 2: a child who logged in directly (parent email + their own PIN).
 * Both paths re-verify against the database on every call — a tampered or
 * stale cookie can never grant access to another family's child, and a
 * parent session always takes priority if (improbably) both cookies are
 * somehow present. */
export async function requireActiveChild() {
  const adultSession = await getAdultSession();
  if (adultSession) {
    const childId = cookies().get(CHILD_COOKIE)?.value;
    if (!childId) throw new Error("NO_ACTIVE_CHILD");
    const child = await prisma.childProfile.findFirst({ where: { id: childId, ownerId: adultSession.adultId }, include: { owner: true } });
    if (!child) throw new Error("NO_ACTIVE_CHILD");
    const { owner, ...rest } = child;
    return { adult: owner, child: rest };
  }

  const childSession = await getChildSessionToken();
  if (childSession) {
    const child = await prisma.childProfile.findUnique({ where: { id: childSession.childId }, include: { owner: true } });
    if (!child) throw new Error("NO_ACTIVE_CHILD");
    const { owner, ...rest } = child;
    return { adult: owner, child: rest };
  }

  throw new Error("NO_ACTIVE_CHILD");
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
