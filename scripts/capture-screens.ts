/**
 * Drives the running app as a real user and photographs what they see.
 *
 *   npx next build && npx next start -p 3000      # in one shell
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/capture-screens.ts
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/capture-screens.ts --locale fr --mobile
 *
 * It signs in with the seeded demo parent, picks a child and walks the journey
 * the same way a family would, rather than hitting URLs directly — a screen
 * reached that way has real data behind it, and a screen that only renders
 * because it was loaded cold is exactly the kind that looks fine in a
 * marketing shot and is broken in use.
 *
 * Needs the seeded demo data (npm run db:seed). Output lands in
 * out/screens/<locale>-<device>/, which is gitignored.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";

const BASE = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";
const DEMO = { email: "parent.demo@mathsjourney.example", password: "Demo!Password123" };

interface Options {
  locale: "en" | "fr";
  mobile: boolean;
  full: boolean;
}

function parseArgs(argv: string[]): Options {
  const get = (f: string) => {
    const i = argv.indexOf(f);
    return i === -1 ? undefined : argv[i + 1];
  };
  const locale = (get("--locale") ?? "en") as "en" | "fr";
  if (locale !== "en" && locale !== "fr") throw new Error('--locale must be "en" or "fr"');
  return { locale, mobile: argv.includes("--mobile"), full: argv.includes("--full-page") };
}

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

export async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const outDir = path.join(process.cwd(), "out", "screens", `${opts.locale}-${opts.mobile ? "mobile" : "desktop"}`);
  await mkdir(outDir, { recursive: true });

  const viewport = opts.mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const browser = await launchChromium();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2, // retina, so the shots stand up when scaled in a listing
    isMobile: opts.mobile,
    hasTouch: opts.mobile
  });
  // The app reads its language from a cookie, so set it before the first paint
  // rather than clicking the switcher on every page.
  await context.addCookies([{ name: "mj_locale", value: opts.locale, url: BASE }]);
  const page = await context.newPage();

  const shots: string[] = [];
  let n = 0;
  async function shot(name: string) {
    n++;
    const file = path.join(outDir, `${String(n).padStart(2, "0")}-${name}.png`);
    // Let fonts and any entry animation settle; the app animates the mascot in.
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: file, fullPage: opts.full });
    shots.push(path.relative(process.cwd(), file));
    console.log(`  ${path.basename(file)}`);
  }

  async function go(pathname: string) {
    await page.goto(`${BASE}${pathname}`, { waitUntil: "domcontentloaded" });
  }

  try {
    await go("/");
    await shot("landing");

    await go("/login");
    await shot("login");

    // Sign in as a real user would, so every later screen has real data.
    await page.fill('input[name="email"]', DEMO.email);
    await page.fill('input[name="password"]', DEMO.password);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/profiles", { timeout: 20000 });
    await shot("profiles");

    // Pick the first child by the button a parent would actually press.
    const viewProfile = page
      .getByRole("button", { name: opts.locale === "fr" ? "Voir ce profil" : "View this profile" })
      .first();
    await viewProfile.waitFor({ timeout: 15000 });
    await viewProfile.click();
    await page.waitForURL("**/learn/**", { timeout: 20000 });

    const childId = await page.evaluate(() => {
      const m = window.location.pathname.match(/\/learn\/([^/]+)/);
      return m ? m[1] : null;
    });

    // selectChildAction re-sets the locale cookie to the child's own
    // preference, which would quietly undo the --locale this run asked for.
    await context.addCookies([{ name: "mj_locale", value: opts.locale, url: BASE }]);

    if (!childId) {
      console.log("  (could not resolve a child id from the URL — stopping after /profiles)");
    } else {
      await go(`/learn/${childId}/journey/4`);
      await shot("journey-map");

      // The first complete level in Year 4, read off the page rather than guessed.
      const levelHref = await page.locator('a[href*="/level/"]').first().getAttribute("href");
      if (levelHref) {
        await page.goto(`${BASE}${levelHref}`, { waitUntil: "domcontentloaded" });
        await shot("level-overview");

        await page.goto(`${BASE}${levelHref}/lesson/1`, { waitUntil: "domcontentloaded" });
        await shot("lesson");

        await page.goto(`${BASE}${levelHref}/guided`, { waitUntil: "domcontentloaded" });
        await shot("guided-practice");

        // The hint is the fix from earlier today — show it open.
        const hintButton = page.locator("button").filter({ hasText: /hint|indice/i }).first();
        if (await hintButton.count()) {
          await hintButton.click();
          await shot("guided-practice-hint");
        }

        await page.goto(`${BASE}${levelHref}/mastery`, { waitUntil: "domcontentloaded" });
        await shot("mastery-challenge");
      }

      await go(`/learn/${childId}/journey`);
      await shot("journey-current-year");

      await go(`/learn/${childId}/achievements`);
      await shot("achievements");
    }

    await go("/dashboard");
    await shot("parent-dashboard");

    await go("/settings/accessibility");
    await shot("accessibility-settings");

    await go("/child-login");
    await shot("child-login");

    await go("/forgot-password");
    await shot("forgot-password");
  } finally {
    await writeFile(path.join(outDir, "index.md"), [`# Screens — ${opts.locale}, ${opts.mobile ? "mobile" : "desktop"}`, "", ...shots.map((s) => `- \`${s}\``), ""].join("\n"), "utf8");
    await context.close();
    await browser.close();
  }

  console.log(`\n${shots.length} screen(s) in ${path.relative(process.cwd(), outDir)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
