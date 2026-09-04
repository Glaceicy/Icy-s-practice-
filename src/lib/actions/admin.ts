"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdult } from "@/lib/auth";

async function requireAdminRole() {
  const adult = await requireAdult();
  if (adult.role !== "ADMIN") throw new Error("FORBIDDEN: admin role required");
  return adult;
}

export async function toggleTemplateActiveAction(templateId: string): Promise<void> {
  const admin = await requireAdminRole();
  const template = await prisma.questionTemplate.findUniqueOrThrow({ where: { id: templateId } });
  await prisma.questionTemplate.update({ where: { id: templateId }, data: { isActive: !template.isActive } });
  await prisma.adminAuditLog.create({
    data: {
      adminId: admin.id,
      action: template.isActive ? "disable_template" : "enable_template",
      entityType: "QuestionTemplate",
      entityId: templateId,
      detail: template.generatorKey
    }
  });
}

export async function markTemplateReviewedAction(templateId: string): Promise<void> {
  const admin = await requireAdminRole();
  await prisma.questionTemplate.update({
    where: { id: templateId },
    data: { reviewedBy: admin.fullName, reviewedAt: new Date() }
  });
  await prisma.adminAuditLog.create({
    data: { adminId: admin.id, action: "review_template", entityType: "QuestionTemplate", entityId: templateId }
  });
}

const importRowSchema = z.object({
  generatorKey: z.string().min(1),
  isActive: z.enum(["true", "false"]).optional(),
  reviewedBy: z.string().optional()
});

export interface ImportResult {
  updated: number;
  errors: string[];
}

/** Bulk content-governance import (spec §14): a CSV or JSON file of
 * {generatorKey, isActive, reviewedBy} rows updates the matching templates'
 * publish/review state. Templates themselves are authored in code (the
 * deterministic generator functions are the source of truth for questions —
 * see DOCUMENTATION.md) so import/export operates on this governance
 * metadata rather than fabricating new generator logic at runtime. */
export async function importTemplateGovernanceAction(fileContent: string, format: "json" | "csv"): Promise<ImportResult> {
  const admin = await requireAdminRole();
  const rows: unknown[] = format === "json" ? JSON.parse(fileContent) : parseCsv(fileContent);

  let updated = 0;
  const errors: string[] = [];

  for (const raw of rows) {
    const parsed = importRowSchema.safeParse(raw);
    if (!parsed.success) {
      errors.push(`Invalid row: ${JSON.stringify(raw)}`);
      continue;
    }
    const { generatorKey, isActive, reviewedBy } = parsed.data;
    const template = await prisma.questionTemplate.findFirst({ where: { generatorKey } });
    if (!template) {
      errors.push(`Unknown generatorKey: ${generatorKey}`);
      continue;
    }
    await prisma.questionTemplate.update({
      where: { id: template.id },
      data: {
        isActive: isActive !== undefined ? isActive === "true" : template.isActive,
        reviewedBy: reviewedBy ?? template.reviewedBy,
        reviewedAt: reviewedBy ? new Date() : template.reviewedAt
      }
    });
    updated++;
  }

  await prisma.adminAuditLog.create({
    data: { adminId: admin.id, action: "import_questions", entityType: "QuestionTemplate", entityId: "bulk", detail: `${updated} updated, ${errors.length} errors` }
  });

  return { updated, errors };
}

function parseCsv(content: string): Array<Record<string, string>> {
  const lines = content.trim().split(/\r?\n/);
  const header = lines[0]!.split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim());
    const row: Record<string, string> = {};
    header.forEach((h, i) => (row[h] = cells[i] ?? ""));
    return row;
  });
}
