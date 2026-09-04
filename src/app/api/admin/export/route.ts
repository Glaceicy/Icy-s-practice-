import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdult } from "@/lib/auth";

export async function GET(req: NextRequest) {
  let adult;
  try {
    adult = await requireAdult();
  } catch {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  if (adult.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin role required." }, { status: 403 });
  }

  const format = req.nextUrl.searchParams.get("format") === "csv" ? "csv" : "json";

  const templates = await prisma.questionTemplate.findMany({
    include: { level: { include: { schoolYear: true } }, objective: true, generatedLog: { take: 5 } }
  });

  const rows = templates.map((t) => ({
    generatorKey: t.generatorKey,
    yearNumber: t.level.schoolYear.yearNumber,
    levelNumber: t.level.levelNumber,
    levelTitle: t.level.title,
    objectiveCode: t.objective.code,
    questionType: t.questionType,
    difficulty: t.difficulty,
    misconceptionTags: t.misconceptionTags,
    minVariations: t.minVariations,
    isActive: t.isActive,
    reviewedBy: t.reviewedBy ?? "",
    reviewedAt: t.reviewedAt?.toISOString() ?? "",
    sampleQuestionCount: t.generatedLog.length
  }));

  if (format === "csv") {
    const header = Object.keys(rows[0] ?? { generatorKey: "" }).join(",");
    const body = rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    return new NextResponse([header, body].join("\n"), {
      headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=question-templates.csv" }
    });
  }

  return new NextResponse(JSON.stringify(rows, null, 2), {
    headers: { "Content-Type": "application/json", "Content-Disposition": "attachment; filename=question-templates.json" }
  });
}
