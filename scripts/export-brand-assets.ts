/**
 * Renders the Mascot illustration to PNG files for use outside the app —
 * social profile pictures, press kits, app-store listings.
 *
 * The mascot lives as a React component (src/components/illustrations/Mascot.tsx)
 * so the app and these exports can never drift apart: this script renders that
 * exact component to static SVG, then rasterises it with the Chromium that
 * Playwright already provides.
 *
 *   npx tsx scripts/export-brand-assets.ts
 *
 * Output lands in public/brand/. Two shapes are produced for each mood:
 *   avatar-<mood>-400.png   400x400, mascot centred on a solid brand circle,
 *                           sized for a social profile picture
 *   mascot-<mood>-1080.png  1080x1080, transparent background, for overlaying
 *                           on video or slides
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "playwright";
import Mascot, { type MascotMood } from "../src/components/illustrations/Mascot";

const MOODS: MascotMood[] = ["wave", "cheer", "trophy", "think"];
/** Brand navy, matching LINE in Mascot.tsx and the app's brand palette. */
const AVATAR_BACKGROUND = "#0c5391";
const OUT_DIR = path.join(process.cwd(), "public", "brand");

/** Render the component to SVG markup, dropping the Tailwind sizing class and
 * the aria-hidden that only makes sense inside the app's own markup. */
function mascotSvg(mood: MascotMood, size: number): string {
  const markup = renderToStaticMarkup(React.createElement(Mascot, { mood }));
  return markup
    .replace(/\sclass="[^"]*"/, "")
    .replace(/\saria-hidden="[^"]*"/, "")
    .replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" `);
}

function page(svg: string, size: number, background: string | null): string {
  // The mascot art sits in the lower two-thirds of its 120x120 viewBox (the
  // ears reach the top edge), so it is nudged up slightly to look centred
  // inside a circular crop.
  const inner = background
    ? `<div class="circle">${svg}</div>`
    : svg;
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; }
  html, body { width: ${size}px; height: ${size}px; background: transparent; }
  body { display: grid; place-items: center; }
  .circle {
    width: ${size}px; height: ${size}px; border-radius: 50%;
    background: ${background}; display: grid; place-items: center;
  }
  .circle svg { width: ${Math.round(size * 0.78)}px; height: ${Math.round(size * 0.78)}px; margin-top: ${Math.round(size * 0.03)}px; }
</style></head><body>${inner}</body></html>`;
}

/** Launch Chromium, falling back to a pre-installed binary when the one
 * Playwright expects for its own version has not been downloaded (the case in
 * CI images that ship a single shared Chromium). Set CHROMIUM_EXECUTABLE_PATH
 * to point at a specific binary. */
async function launchChromium() {
  const override = process.env.CHROMIUM_EXECUTABLE_PATH;
  if (override) return chromium.launch({ executablePath: override });
  try {
    return await chromium.launch();
  } catch (err) {
    const fallback = "/opt/pw-browsers/chromium";
    if (!existsSync(fallback)) throw err;
    console.warn(`Playwright's own Chromium is missing; using ${fallback} instead.`);
    return chromium.launch({ executablePath: fallback });
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await launchChromium();
  const written: string[] = [];

  try {
    for (const mood of MOODS) {
      for (const [suffix, size, background] of [
        ["avatar", 400, AVATAR_BACKGROUND],
        ["mascot", 1080, null]
      ] as Array<[string, number, string | null]>) {
        const context = await browser.newContext({
          viewport: { width: size, height: size },
          deviceScaleFactor: 1
        });
        const tab = await context.newPage();
        await tab.setContent(page(mascotSvg(mood, size), size, background), { waitUntil: "load" });
        const file = path.join(OUT_DIR, `${suffix}-${mood}-${size}.png`);
        await tab.screenshot({ path: file, omitBackground: background === null });
        await context.close();
        written.push(path.relative(process.cwd(), file));
      }
    }
  } finally {
    await browser.close();
  }

  // Also keep a plain SVG of each mood — vector is what a printer or a
  // designer will ask for, and it costs nothing to emit alongside.
  for (const mood of MOODS) {
    const file = path.join(OUT_DIR, `mascot-${mood}.svg`);
    await writeFile(file, mascotSvg(mood, 512), "utf8");
    written.push(path.relative(process.cwd(), file));
  }

  console.log(`Wrote ${written.length} files:`);
  for (const f of written) console.log(`  ${f}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
