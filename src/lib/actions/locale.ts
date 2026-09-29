"use server";

import { prisma } from "@/lib/db";
import { getActiveChildSoft } from "@/lib/auth";
import { setLocale } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/questionEngine/types";

/** Sets the site-wide language cookie, and — when a child is the active
 * profile — remembers this as that child's own preference too, so it's
 * restored automatically next time they're selected (see `selectChildAction`
 * in actions/children.ts). The DB write is best-effort: it must never stop
 * the cookie change (the part that actually changes what the user sees) from
 * taking effect. */
export async function setLocaleAction(locale: Locale): Promise<void> {
  setLocale(locale);
  try {
    const child = await getActiveChildSoft();
    if (child && child.locale !== locale) {
      await prisma.childProfile.update({ where: { id: child.id }, data: { locale } });
    }
  } catch {
    // No active child (pre-login, or an adult-only page) — cookie alone is enough.
  }
}
