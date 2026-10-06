/**
 * Turns the validated question banks into ready-to-film TikTok material.
 *
 * For each question picked it emits:
 *   - a 1080x1920 question card (hold this on screen while the viewer thinks)
 *   - a 1080x1920 answer card with the worked explanation already written
 *   - a markdown script with hook, body, payoff and caption
 *
 * Nothing here touches TikTok. It produces files you upload by hand, which
 * means it needs no API keys, no app review, and no network access.
 *
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/tiktok-content.ts --level Y4L4
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/tiktok-content.ts --level Y6L10 --count 3 --seed 99
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/tiktok-content.ts --level Y4L4 --key y4l4.containersNeeded --locale fr
 *
 * Output lands in out/tiktok/<level>/. That directory is gitignored — these are
 * build products, regenerable from the template key and seed recorded in the
 * script file.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser } from "playwright";
import { loadAllTemplates } from "../src/lib/questionEngine/templates/all";
import { getTemplatesForLevel } from "../src/lib/questionEngine/registry";
import { curriculum } from "../src/lib/curriculum";
import type { GeneratedQuestionInstance, Locale, QuestionTemplateDef } from "../src/lib/questionEngine/types";

// Brand palette, lifted from tailwind.config.ts so the cards match the app.
const BRAND = {
  navy: "#0c5391",
  blue: "#1a9bff",
  paleBlue: "#eff9ff",
  sunny: "#ffcb47",
  leaf: "#3fbf68",
  ink: "#0f4676"
};
const CARD = { width: 1080, height: 1920 };

interface Options {
  level: string;
  count: number;
  seed: number;
  locale: Locale;
  key?: string;
}

function parseArgs(argv: string[]): Options {
  const get = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };
  const level = get("--level");
  if (!level) {
    throw new Error(
      "Usage: tiktok-content.ts --level <LEVELKEY> [--count N] [--seed N] [--locale en|fr] [--key <templateKey>]"
    );
  }
  const locale = (get("--locale") ?? "en") as Locale;
  if (locale !== "en" && locale !== "fr") throw new Error(`--locale must be "en" or "fr", got "${locale}"`);
  return {
    level: level.toUpperCase(),
    count: Number(get("--count") ?? 3),
    seed: Number(get("--seed") ?? 42),
    locale,
    key: get("--key")
  };
}

/** Where a level sits in the curriculum, for the on-card label. */
function describeLevel(levelKey: string): { year: number; level: number; title: string } {
  const m = levelKey.match(/^Y(\d+)L(\d+)$/);
  if (!m) throw new Error(`Level key should look like Y4L4, got "${levelKey}"`);
  const year = Number(m[1]);
  const level = Number(m[2]);
  const def = curriculum.find((y) => y.yearNumber === year)?.levels.find((l) => l.levelNumber === level);
  if (!def) throw new Error(`No such level in the curriculum: ${levelKey}`);
  return { year, level, title: def.title };
}

/**
 * Rank templates by how well they carry a short video. REASONING questions
 * beat drill: they have a decision in them, which is what makes a viewer stop
 * and argue in the comments. Word problems beat bare calculation for the same
 * reason. Multi-step explanations give the answer card something to show.
 */
function hookScore(t: QuestionTemplateDef, q: GeneratedQuestionInstance): number {
  let score = 0;
  if (t.difficulty === "REASONING") score += 3;
  else if (t.difficulty === "APPLICATION") score += 1;
  if (q.type === "WORD_PROBLEM" || q.type === "MULTI_STEP") score += 2;
  if (q.explanationSteps.length >= 2) score += 1;
  // A prompt that runs long stops being readable held on screen for 3 seconds.
  if (q.prompt.length > 190) score -= 3;
  else if (q.prompt.length < 110) score += 1;
  return score;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

function cardHtml(opts: {
  label: string;
  body: string;
  footnote?: string;
  accent: string;
  background: string;
  textColour: string;
  bodySize: number;
}): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${CARD.width}px; height: ${CARD.height}px; background: ${opts.background};
    font-family: Nunito, system-ui, sans-serif; color: ${opts.textColour};
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 90px; position: relative;
  }
  .label {
    font-size: 40px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
    color: ${opts.accent}; margin-bottom: 48px;
  }
  .body { font-size: ${opts.bodySize}px; font-weight: 800; line-height: 1.25; }
  .footnote { margin-top: 56px; font-size: 44px; font-weight: 700; line-height: 1.45; opacity: 0.92; }
  .rule { width: 160px; height: 12px; border-radius: 6px; background: ${opts.accent}; margin-bottom: 48px; }
  .brand {
    position: absolute; bottom: 80px; left: 90px;
    font-size: 34px; font-weight: 700; opacity: 0.75;
  }
</style></head>
<body>
  <div class="rule"></div>
  <div class="label">${escapeHtml(opts.label)}</div>
  <div class="body">${escapeHtml(opts.body)}</div>
  ${opts.footnote ? `<div class="footnote">${escapeHtml(opts.footnote)}</div>` : ""}
  <div class="brand">mathsjourney.co.uk</div>
</body></html>`;
}

async function renderCard(browser: Browser, html: string, file: string): Promise<void> {
  const context = await browser.newContext({ viewport: CARD, deviceScaleFactor: 1 });
  const tab = await context.newPage();
  await tab.setContent(html, { waitUntil: "load" });
  // Give the webfont a moment; fall back silently to system-ui if it never lands.
  await tab.waitForTimeout(600);
  await tab.screenshot({ path: file });
  await context.close();
}

/** Same fallback as export-brand-assets.ts: use a pre-installed Chromium when
 * Playwright's own download for this version is absent. */
async function launchChromium(): Promise<Browser> {
  const override = process.env.CHROMIUM_EXECUTABLE_PATH;
  if (override) return chromium.launch({ executablePath: override });
  try {
    return await chromium.launch();
  } catch (err) {
    const fallback = "/opt/pw-browsers/chromium";
    if (!existsSync(fallback)) throw err;
    return chromium.launch({ executablePath: fallback });
  }
}

/** The answer, written the way it should appear on screen rather than as the
 * grader's canonical string. */
function displayAnswer(q: GeneratedQuestionInstance): string {
  if (q.choices) {
    const correct = q.choices.find((c) => c.id === q.correctAnswer);
    return correct ? correct.label : q.correctAnswer;
  }
  return q.correctAnswer;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  loadAllTemplates();

  const meta = describeLevel(opts.level);
  const all = getTemplatesForLevel(opts.level);
  if (all.length === 0) throw new Error(`No templates registered for ${opts.level}. Is the level live?`);

  // Hoisted so it narrows to string inside the closure.
  const keyFilter = opts.key;
  const pool = keyFilter ? all.filter((t) => t.key === keyFilter || t.key.startsWith(keyFilter)) : all;
  if (pool.length === 0) throw new Error(`No template in ${opts.level} matching "${opts.key}"`);

  // Score every template on this seed, then take the best handful.
  const scored = pool
    .map((t) => {
      const q = t.generate(opts.seed, opts.locale);
      return { template: t, question: q, score: hookScore(t, q) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, opts.count));

  const outDir = path.join(process.cwd(), "out", "tiktok", opts.level.toLowerCase());
  await mkdir(outDir, { recursive: true });

  const browser = await launchChromium();
  const lines: string[] = [
    `# TikTok cards — ${opts.level}: ${meta.title}`,
    "",
    `Year ${meta.year}, Level ${meta.level} · locale \`${opts.locale}\` · seed \`${opts.seed}\``,
    "",
    "Regenerate any of these exactly with the template key and seed recorded below.",
    "Cards are 1080×1920, ready to drop straight into a video editor.",
    "",
    "**Safe zone.** TikTok overlays its own UI on roughly the top 10% and bottom 25%",
    "of the frame (caption, handle, action buttons down the right). The text on these",
    "cards sits in the middle band to clear it, but the `mathsjourney.co.uk` footer will",
    "be partly covered in-app — treat it as a watermark for reposts elsewhere, not as",
    "something a TikTok viewer reads.",
    ""
  ];

  try {
    for (const [i, { template, question, score }] of scored.entries()) {
      const n = String(i + 1).padStart(2, "0");
      const answer = displayAnswer(question);
      const label = opts.locale === "fr" ? `Année ${meta.year}` : `Year ${meta.year}`;

      const qFile = path.join(outDir, `${n}-${template.key}-question.png`);
      const aFile = path.join(outDir, `${n}-${template.key}-answer.png`);

      await renderCard(browser, cardHtml({
        label,
        body: question.prompt,
        footnote: question.choices ? question.choices.map((c) => c.label).join("   ·   ") : undefined,
        accent: BRAND.sunny,
        background: BRAND.navy,
        textColour: "#ffffff",
        bodySize: question.prompt.length > 140 ? 64 : 78
      }), qFile);

      await renderCard(browser, cardHtml({
        label: opts.locale === "fr" ? "Réponse" : "Answer",
        body: answer,
        footnote: question.explanationSteps.join(" "),
        accent: BRAND.leaf,
        background: BRAND.paleBlue,
        textColour: BRAND.ink,
        bodySize: answer.length > 24 ? 90 : 170
      }), aFile);

      lines.push(
        `## ${i + 1}. \`${template.key}\``,
        "",
        `- **Template:** \`${template.key}\` · seed \`${opts.seed}\` · ${template.difficulty} · ${question.type}`,
        `- **Hook score:** ${score}`,
        `- **Question card:** \`${path.relative(process.cwd(), qFile)}\``,
        `- **Answer card:** \`${path.relative(process.cwd(), aFile)}\``,
        "",
        `**On screen (hold 3s):** ${question.prompt}`,
        "",
        `**Reveal:** ${answer}`,
        "",
        `**Voiceover / working:** ${question.explanationSteps.join(" ")}`,
        "",
        `**Hint, if you need a second beat:** ${question.hints.join(" ")}`,
        "",
        // Several level titles already begin "Year N ...", so only prepend the
        // year when the title does not say it already.
        `**Caption:** ${/^year\s*\d/i.test(meta.title) ? meta.title : `Year ${meta.year} — ${meta.title}`}. #maths #year${meta.year} ${meta.year >= 7 ? "#gcse" : "#primarymaths"} #homeschool`,
        ""
      );
    }
  } finally {
    await browser.close();
  }

  const scriptFile = path.join(outDir, "scripts.md");
  await writeFile(scriptFile, lines.join("\n"), "utf8");

  console.log(`${scored.length} video(s) for ${opts.level} — ${meta.title}`);
  console.log(`  ${path.relative(process.cwd(), scriptFile)}`);
  for (const { template } of scored) console.log(`  ${template.key}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
