/**
 * Renders the "Maths Journey" ad as a finished video file.
 *
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/build-ad-video.ts
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/build-ad-video.ts --cut 15 --landscape
 *
 * This is the motion-graphics version of the script: the app's own UI, brand
 * and mascot, animated. It is not the live-action film — there are no child
 * actors in it — so it serves two purposes: a social cut that can go out as
 * it is, and an animatic that fixes the timing before anyone books a shoot.
 *
 * Every question on screen is generated from the real question banks at a
 * recorded template key and seed (see SCENES), never written for the ad. The
 * claim the product makes is that its questions are validated; an advert that
 * used invented ones would be the one place that claim is untrue.
 *
 * How it renders: the page exposes window.setT(seconds) and every element's
 * position, opacity and text is a pure function of that number — no CSS
 * transitions or animations anywhere. The renderer then walks the timeline one
 * frame at a time, so output is deterministic and reproducible rather than
 * dependent on how fast the machine happened to be.
 *
 * Output lands in out/ad/ (gitignored): the frames, the mp4, and a timing
 * sheet listing every beat for whoever adds the voiceover and music.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { chromium, type Browser } from "playwright";
import { loadAllTemplates } from "../src/lib/questionEngine/templates/all";
import { getTemplatesForLevel } from "../src/lib/questionEngine/registry";

const run = promisify(execFile);

const BRAND = {
  navy: "#0c5391",
  ink: "#0f4676",
  blue: "#1a9bff",
  blueDeep: "#0863b8",
  paleBlue: "#eff9ff",
  sunny: "#ffcb47",
  sunnyDeep: "#ffb800",
  leaf: "#3fbf68",
  leafDeep: "#2ea656",
  berry: "#ff6b85"
};

const FPS = 30;

/** The four questions, each pinned to a template key and seed so the exact
 * frame on screen can be regenerated and checked. Ages map to school years the
 * way the curriculum does: Year 1 is 5–6, Year 4 is 8–9, Year 6 is 10–11,
 * Year 10 is 14–15. */
const SCENES = [
  { age: 5, level: "Y1L1", key: "y1l1.oneMoreThan", seed: 77, year: 1, levelNo: 1 },
  { age: 8, level: "Y4L3", key: "y4l3.timesTableFact", seed: 61, year: 4, levelNo: 3 },
  { age: 11, level: "Y6L3", key: "y6l3.fractionOfQuantity", seed: 0, year: 6, levelNo: 3 },
  { age: 15, level: "Y10L10", key: "y10l10.pythagorasMixed", seed: 0, year: 10, levelNo: 10 }
] as const;

interface Beat {
  from: number;
  to: number;
  shot: string;
  vo: string;
  text: string;
}

/** The 45-second timeline, kept here rather than in the page so the same
 * numbers drive the animation and the timing sheet. */
const BEATS: Beat[] = [
  { from: 0, to: 8, shot: "Age 5 — counting on a number line", vo: "Every maths journey starts with a single step.", text: "Step 1" },
  { from: 8, to: 18, shot: "Age 8 — times tables, a win, the path appears", vo: "Every win builds confidence…", text: "Milestone unlocked" },
  { from: 18, to: 28, shot: "Age 11 — fractions, a hint, the penny drops", vo: "…every challenge becomes a skill…", text: "Hint used. Problem solved." },
  { from: 28, to: 38, shot: "Age 15 — GCSE-style Pythagoras", vo: "…all the way to GCSE.", text: "GCSE ready" },
  { from: 38, to: 45, shot: "The whole climb, then the end card", vo: "The app that guides your child's maths journey, from first steps to GCSE.", text: "Maths Journey UK. Maths at the core." }
];

interface Options {
  cut: 45 | 15;
  landscape: boolean;
  fps: number;
  /** Render only the app screen, on transparent, one clip per scene. These
   * are the overlays an editor corner-pins onto the tablet in live-action
   * footage, so the device in shot shows the real app rather than a mock-up. */
  screens: boolean;
}

function parseArgs(argv: string[]): Options {
  const get = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };
  const cut = Number(get("--cut") ?? 45);
  if (cut !== 45 && cut !== 15) throw new Error("--cut must be 45 or 15");
  return {
    cut,
    landscape: argv.includes("--landscape"),
    fps: Number(get("--fps") ?? FPS),
    screens: argv.includes("--screens")
  };
}

function questionFor(scene: (typeof SCENES)[number]) {
  const template = getTemplatesForLevel(scene.level).find((t) => t.key === scene.key);
  if (!template) throw new Error(`Template ${scene.key} is not registered — is ${scene.level} live?`);
  const q = template.generate(scene.seed, "en");
  const answer = q.choices ? (q.choices.find((c) => c.id === q.correctAnswer)?.label ?? q.correctAnswer) : q.correctAnswer;
  return { prompt: q.prompt, answer, hint: q.hints[0] ?? "", working: q.explanationSteps.join(" ") };
}

async function mascot(mood: "wave" | "cheer" | "think" | "trophy"): Promise<string> {
  const file = path.join(process.cwd(), "public", "brand", `mascot-${mood}.svg`);
  if (!existsSync(file)) {
    throw new Error(`Missing ${file}. Run scripts/export-brand-assets.ts first — the ad uses the real mascot, not a copy.`);
  }
  // Strip the XML prolog so the markup can be inlined into the page, and drop
  // any fixed size so CSS controls it.
  return (await readFile(file, "utf8"))
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/\s(width|height)="[^"]*"/g, "");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

function buildHtml(opts: {
  width: number;
  height: number;
  questions: ReturnType<typeof questionFor>[];
  mascots: Record<string, string>;
  screensOnly?: boolean;
}): string {
  const [q5, q8, q11, q15] = opts.questions;
  const landscape = opts.width > opts.height;

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${opts.width}px; height: ${opts.height}px; overflow: hidden; }
  ${opts.screensOnly ? `
  /* Overlay mode: the app screen alone on transparent, filling the frame.
     setT() still drives the content, so the timing matches the cut exactly;
     !important is what stops it also re-applying the device's own framing. */
  html, body { background: transparent !important; }
  .bg, .path-layer, .chip, .caption, .age-badge, #endCard, #confettiLayer { display: none !important; }
  .device {
    left: 0 !important; top: 0 !important; width: 100% !important; height: 100% !important;
    padding: 0 !important; border-radius: 0 !important; background: transparent !important;
    box-shadow: none !important; opacity: 1 !important; transform: none !important;
  }
  .screen { border-radius: 0 !important; }
  ` : ""}
  body {
    font-family: Nunito, system-ui, sans-serif;
    background: ${BRAND.navy};
    color: #fff;
    position: relative;
  }
  /* No transitions or animations: every value is set from setT(). */
  .layer { position: absolute; inset: 0; }
  .center { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }

  .bg { background: radial-gradient(120% 80% at 50% 0%, #10679f 0%, ${BRAND.navy} 55%, #09406f 100%); }

  /* Device */
  .device {
    position: absolute; left: 50%; top: 50%;
    width: ${landscape ? 1000 : 780}px; height: ${landscape ? 720 : 1000}px;
    border-radius: 54px; background: #0a2f4f;
    box-shadow: 0 60px 120px rgba(0,0,0,0.45), inset 0 0 0 10px #123e63;
    padding: 26px;
  }
  .screen {
    width: 100%; height: 100%; border-radius: 34px; overflow: hidden;
    background: #fff; color: ${BRAND.ink};
    display: flex; flex-direction: column;
  }
  .screen-header {
    padding: 26px 32px; color: #fff;
    background: linear-gradient(100deg, ${BRAND.blue}, ${BRAND.blueDeep});
    display: flex; align-items: baseline; justify-content: space-between;
  }
  .screen-header .yr { font-size: 34px; font-weight: 900; }
  .screen-header .lvl { font-size: 24px; font-weight: 700; opacity: 0.9; }
  .screen-body { flex: 1; padding: ${landscape ? 24 : 36}px 34px; display: flex; flex-direction: column; gap: ${landscape ? 14 : 26}px; min-height: 0; }
  .prompt { font-size: ${landscape ? 34 : 40}px; font-weight: 800; line-height: 1.22; }
  .visual { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
  .visual svg { max-height: 100%; }
  .answer-row { display: flex; align-items: center; gap: 22px; }
  .answer {
    font-size: ${landscape ? 64 : 86}px; font-weight: 900; color: ${BRAND.leafDeep};
    font-variant-numeric: tabular-nums;
  }
  .tick { font-size: ${landscape ? 50 : 68}px; }
  .hint {
    background: ${BRAND.sunny}; color: ${BRAND.ink};
    border-radius: 20px; padding: ${landscape ? 14 : 20}px 24px; font-size: ${landscape ? 22 : 26}px; font-weight: 700; line-height: 1.35;
  }
  .hint-btn {
    align-self: flex-start; border: 4px solid ${BRAND.sunnyDeep}; color: ${BRAND.ink};
    border-radius: 999px; padding: ${landscape ? 8 : 12}px 30px; font-size: ${landscape ? 22 : 26}px; font-weight: 800;
  }

  /* Chips and captions */
  .chip {
    position: absolute; left: 50%; top: ${landscape ? 56 : 210}px;
    padding: 16px 38px; border-radius: 999px;
    background: ${BRAND.sunny}; color: ${BRAND.ink};
    font-size: 34px; font-weight: 900; letter-spacing: 0.02em; white-space: nowrap;
  }
  .caption {
    position: absolute; left: 90px; right: 90px; bottom: ${landscape ? 70 : 320}px;
    text-align: center; font-size: ${landscape ? 46 : 56}px; font-weight: 800; line-height: 1.25;
    text-shadow: 0 6px 30px rgba(0,0,0,0.45);
  }
  .age-badge {
    position: absolute; left: 50%; top: ${landscape ? 120 : 330}px;
    font-size: 26px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase;
    color: ${BRAND.sunny}; white-space: nowrap;
  }

  /* Confetti */
  .confetti { position: absolute; width: 22px; height: 30px; border-radius: 5px; }

  /* The progress path */
  .path-layer { display: flex; align-items: center; justify-content: center; }
  .path-caption {
    position: absolute; left: 0; right: 0; bottom: ${landscape ? 40 : 150}px; text-align: center;
    font-size: 40px; font-weight: 800;
  }

  /* End card */
  .wordmark {
    font-size: ${landscape ? 92 : 86}px; font-weight: 900; letter-spacing: -0.02em;
    text-align: center; line-height: 1.04; padding: 0 60px; white-space: nowrap;
  }
  .wordmark .uk { color: ${BRAND.sunny}; }
  .strap { margin-top: 18px; font-size: ${landscape ? 46 : 54}px; font-weight: 800; color: ${BRAND.sunny}; }
  .domain { margin-top: 40px; font-size: 36px; font-weight: 700; opacity: 0.85; }
  .mascot { width: ${landscape ? 200 : 260}px; height: ${landscape ? 200 : 260}px; }
</style></head>
<body>
  <div class="layer bg"></div>

  <!-- progress path sits behind the device and comes forward at the end -->
  <div class="layer path-layer" id="pathLayer">
    <svg id="pathSvg" viewBox="0 0 400 1400" width="${landscape ? 420 : 600}" height="${landscape ? 740 : 1450}" style="margin-bottom:${landscape ? 40 : 120}px"></svg>
    <div class="path-caption" id="pathCaption"></div>
  </div>

  <div class="device" id="device">
    <div class="screen">
      <div class="screen-header">
        <span class="yr" id="scrYear">Year 1</span>
        <span class="lvl" id="scrLevel">Level 1</span>
      </div>
      <div class="screen-body">
        <div class="prompt" id="scrPrompt"></div>
        <div class="visual"><svg id="scrVisual" viewBox="0 0 640 320" width="640" height="320"></svg></div>
        <div class="hint-btn" id="scrHintBtn">Need a hint?</div>
        <div class="hint" id="scrHint"></div>
        <div class="answer-row" id="scrAnswerRow">
          <span class="answer" id="scrAnswer"></span><span class="tick" id="scrTick">✅</span>
        </div>
      </div>
    </div>
  </div>

  <div class="age-badge" id="ageBadge"></div>
  <div class="chip" id="chip"></div>
  <div class="caption" id="caption"></div>
  <div class="layer" id="confettiLayer"></div>

  <div class="layer center" id="endCard">
    <div class="mascot" id="endMascot">${opts.mascots.cheer}</div>
    <div class="wordmark">Maths Journey<span class="uk"> UK</span></div>
    <div class="strap">Maths at the core.</div>
    <div class="domain">mathsjourney.co.uk</div>
  </div>

<script>
const Q = ${JSON.stringify({ q5, q8, q11, q15 })};
const C = ${JSON.stringify(BRAND)};
const LANDSCAPE = ${landscape};

const el = (id) => document.getElementById(id);
const clamp01 = (x) => x < 0 ? 0 : x > 1 ? 1 : x;
/** Progress through a window, 0 before it and 1 after. */
const ramp = (t, a, b) => clamp01((t - a) / (b - a));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
/** Fades in over \`inDur\`, holds, fades out over \`outDur\`. */
function band(t, a, b, inDur, outDur) {
  if (t < a || t > b) return 0;
  return Math.min(ramp(t, a, a + inDur), 1 - ramp(t, b - outDur, b));
}
const lerp = (a, b, x) => a + (b - a) * x;

// ---------------------------------------------------------------- the path
// 100 nodes, ten per year, winding up the frame: Year 1 at the bottom,
// Year 10 at the top. This is the climb the ad is about.
const NODES = [];
for (let i = 0; i < 100; i++) {
  // A slow serpentine over the full height: two and a half waves across 100
  // levels, so the line reads as a winding climb rather than a coiled spring.
  const y = 1330 - i * 12.6;
  const x = 200 + Math.sin((i / 99) * Math.PI * 5) * 128;
  NODES.push({ x, y, year: Math.floor(i / 10) + 1 });
}
const svgNs = "http://www.w3.org/2000/svg";
const pathSvg = el("pathSvg");
const trail = document.createElementNS(svgNs, "path");
trail.setAttribute("d", "M " + NODES.map((n) => n.x.toFixed(1) + " " + n.y.toFixed(1)).join(" L "));
trail.setAttribute("fill", "none");
trail.setAttribute("stroke", "rgba(255,255,255,0.18)");
trail.setAttribute("stroke-width", "10");
trail.setAttribute("stroke-linecap", "round");
pathSvg.appendChild(trail);
const trailLit = trail.cloneNode();
trailLit.setAttribute("stroke", C.sunny);
trailLit.setAttribute("stroke-width", "12");
pathSvg.appendChild(trailLit);
const TRAIL_LEN = trailLit.getTotalLength();
trailLit.setAttribute("stroke-dasharray", TRAIL_LEN + " " + TRAIL_LEN);

const dots = NODES.map((n) => {
  const c = document.createElementNS(svgNs, "circle");
  c.setAttribute("cx", n.x); c.setAttribute("cy", n.y); c.setAttribute("r", "9");
  c.setAttribute("fill", "rgba(255,255,255,0.22)");
  pathSvg.appendChild(c);
  return c;
});
const yearLabels = [];
for (let y = 1; y <= 10; y++) {
  const n = NODES[(y - 1) * 10];
  const lab = document.createElementNS(svgNs, "text");
  lab.setAttribute("x", "20");
  lab.setAttribute("y", String(n.y + 8));
  lab.setAttribute("font-size", "26");
  lab.setAttribute("font-weight", "800");
  lab.setAttribute("font-family", "Nunito, sans-serif");
  lab.setAttribute("fill", "rgba(255,255,255,0.5)");
  lab.textContent = "Y" + y;
  pathSvg.appendChild(lab);
  yearLabels.push(lab);
}

const marker = document.createElementNS(svgNs, "circle");
marker.setAttribute("r", "20"); marker.setAttribute("fill", C.sunny);
marker.setAttribute("stroke", "#fff"); marker.setAttribute("stroke-width", "6");
pathSvg.appendChild(marker);

/** Lights the path up to \`levels\` of 100 and parks the marker there. */
function setPath(levels) {
  const n = clamp01(levels / 100);
  trailLit.setAttribute("stroke-dashoffset", String(TRAIL_LEN * (1 - n)));
  for (let i = 0; i < dots.length; i++) {
    const lit = i < levels;
    dots[i].setAttribute("fill", lit ? C.sunny : "rgba(255,255,255,0.22)");
    dots[i].setAttribute("r", lit ? "11" : "9");
  }
  for (let y = 0; y < yearLabels.length; y++) {
    yearLabels[y].setAttribute("fill", levels >= (y + 1) * 10 ? C.sunny : "rgba(255,255,255,0.45)");
  }
  const at = NODES[Math.max(0, Math.min(NODES.length - 1, Math.round(levels) - 1))];
  marker.setAttribute("cx", at.x); marker.setAttribute("cy", at.y);
  marker.setAttribute("opacity", levels > 0 ? "1" : "0");
}

// ------------------------------------------------------- in-screen visuals
const visual = el("scrVisual");
function clearVisual() { while (visual.firstChild) visual.removeChild(visual.firstChild); }
function svg(tag, attrs) {
  const n = document.createElementNS(svgNs, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}
function text(x, y, s, size, fill, weight) {
  const n = svg("text", { x, y, "font-size": size, fill, "font-weight": weight || 800, "text-anchor": "middle", "font-family": "Nunito, sans-serif" });
  n.textContent = s;
  return n;
}

/** Age 5: a 0–20 number line with a counter walking up it. */
function drawNumberLine(upTo) {
  clearVisual();
  visual.appendChild(svg("line", { x1: 40, y1: 200, x2: 600, y2: 200, stroke: C.ink, "stroke-width": 6, "stroke-linecap": "round" }));
  for (let i = 0; i <= 20; i += 1) {
    const x = 40 + (560 * i) / 20;
    const major = i % 5 === 0;
    visual.appendChild(svg("line", { x1: x, y1: 200, x2: x, y2: major ? 228 : 216, stroke: C.ink, "stroke-width": major ? 5 : 3 }));
    if (major) visual.appendChild(text(x, 266, String(i), 30, C.ink));
  }
  const n = Math.max(0, Math.min(20, upTo));
  const x = 40 + (560 * n) / 20;
  visual.appendChild(svg("circle", { cx: x, cy: 200, r: 24, fill: C.sunny, stroke: C.ink, "stroke-width": 5 }));
  visual.appendChild(text(x, 150, String(Math.round(n)), 46, C.ink, 900));
  // Stars counted so far, the context the question actually uses.
  for (let i = 0; i < Math.round(n) && i < 10; i++) {
    visual.appendChild(text(70 + i * 56, 70, "⭐", 40, C.sunny));
  }
}

/** Age 8: an 8 x 9 array filling in, which is what "lots of" means. */
function drawArray(rows, cols, filled) {
  clearVisual();
  const w = 46, h = 26;
  const x0 = 320 - (cols * w) / 2, y0 = 160 - (rows * h) / 2;
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = k < filled;
      visual.appendChild(svg("circle", {
        cx: x0 + c * w + w / 2, cy: y0 + r * h + h / 2, r: 10,
        fill: on ? C.blue : "#dbeefb"
      }));
      k++;
    }
  }
  visual.appendChild(text(320, 300, rows + " rows of " + cols, 28, C.ink, 700));
}

/** Age 11: a bar of 42 split into sixths, two of them shaded. */
function drawFractionBar(parts, shadedParts, total, reveal) {
  clearVisual();
  const x0 = 50, y0 = 120, w = 540, h = 96;
  for (let i = 0; i < parts; i++) {
    const on = i < shadedParts * reveal;
    visual.appendChild(svg("rect", {
      x: x0 + (w / parts) * i, y: y0, width: w / parts - 6, height: h, rx: 10,
      fill: on ? C.sunny : "#e8f4fd", stroke: C.ink, "stroke-width": 3
    }));
    visual.appendChild(text(x0 + (w / parts) * i + (w / parts - 6) / 2, y0 + h / 2 + 12, String(total / parts), 30, C.ink, 700));
  }
  visual.appendChild(text(320, 272, total + " in total, shared into " + parts + " equal parts", 26, C.ink, 700));
}

/** Age 15: the car park, with the diagonal drawn on. */
function drawRectDiagonal(a, b, diagonalProgress, showQuery) {
  clearVisual();
  const x0 = 120, y0 = 60, w = 400, h = 170;
  visual.appendChild(svg("rect", { x: x0, y: y0, width: w, height: h, rx: 8, fill: "#e8f4fd", stroke: C.ink, "stroke-width": 5 }));
  visual.appendChild(text(x0 + w / 2, y0 - 16, b + " m", 30, C.ink));
  const left = svg("text", { x: x0 - 20, y: y0 + h / 2, "font-size": 30, fill: C.ink, "font-weight": 800, "text-anchor": "end", "font-family": "Nunito, sans-serif" });
  left.textContent = a + " m";
  visual.appendChild(left);
  const d = svg("line", {
    x1: x0, y1: y0 + h,
    x2: x0 + w * diagonalProgress, y2: y0 + h - h * diagonalProgress,
    stroke: C.leafDeep, "stroke-width": 7, "stroke-linecap": "round"
  });
  visual.appendChild(d);
  // The "?" hands over to the answer rather than sitting beside it.
  if (diagonalProgress > 0.98 && showQuery > 0.02) {
    const q = text(x0 + w / 2 + 40, y0 + h / 2 + 46, "?", 44, C.leafDeep, 900);
    q.setAttribute("opacity", String(showQuery));
    visual.appendChild(q);
  }
  visual.appendChild(text(320, 296, a + "² + " + b + "² = " + (a * a + b * b), 30, C.ink, 700));
}

// ------------------------------------------------------------- confetti
const confettiLayer = el("confettiLayer");
const CONFETTI = [];
for (let i = 0; i < 46; i++) {
  const d = document.createElement("div");
  d.className = "confetti";
  d.style.background = [C.sunny, C.leaf, C.berry, C.blue, "#fff"][i % 5];
  confettiLayer.appendChild(d);
  // Fixed per-piece randomness, chosen once so frames stay deterministic.
  CONFETTI.push({ node: d, x: 8 + (i * 37) % 84, spin: (i % 7) * 60, drift: ((i % 5) - 2) * 40, delay: (i % 11) * 0.035 });
}
function setConfetti(p) {
  for (const c of CONFETTI) {
    const local = clamp01((p - c.delay) / (1 - c.delay || 1));
    c.node.style.opacity = String(p <= 0 || p >= 1 ? 0 : 1 - local * local);
    c.node.style.left = c.x + "%";
    c.node.style.top = lerp(28, 86, easeOut(local)) + "%";
    c.node.style.transform = "translate(" + c.drift * local + "px,0) rotate(" + (c.spin + local * 420) + "deg)";
  }
}

// ------------------------------------------------------------- the timeline
const SCENE_IN = 0.55;
function show(node, opacity, scale, dy) {
  node.style.opacity = String(opacity);
  const parts = [];
  if (dy !== undefined) parts.push("translateY(" + dy + "px)");
  if (scale !== undefined) parts.push("scale(" + scale + ")");
  node.style.transform = parts.join(" ") || "none";
}

window.setT = function (t) {
  const device = el("device");
  const chip = el("chip");
  const caption = el("caption");
  const ageBadge = el("ageBadge");
  const endCard = el("endCard");
  const pathLayer = el("pathLayer");
  const hintBtn = el("scrHintBtn");
  const hint = el("scrHint");
  const answerRow = el("scrAnswerRow");
  const tick = el("scrTick");

  // ---- which scene
  const s1 = t < 8, s2 = t >= 8 && t < 18, s3 = t >= 18 && t < 28, s4 = t >= 28 && t < 38, s5 = t >= 38;

  // ---- device: visible for the four question scenes, pulls back for the end
  const devVis = band(t, 0, 38.6, SCENE_IN, 0.9);
  const devScale = s5 ? lerp(1, 0.72, easeInOut(ramp(t, 37.8, 39.4))) : lerp(0.94, 1, easeOut(ramp(t, 0, 1.2)));
  device.style.opacity = String(devVis);
  device.style.transform = "translate(-50%,-50%) scale(" + devScale + ")";

  // ---- per-scene screen content
  let localStart = 0, q = Q.q5, year = 1, levelNo = 1, age = 5;
  if (s2) { localStart = 8; q = Q.q8; year = 4; levelNo = 3; age = 8; }
  else if (s3) { localStart = 18; q = Q.q11; year = 6; levelNo = 3; age = 11; }
  else if (s4 || s5) { localStart = 28; q = Q.q15; year = 10; levelNo = 10; age = 15; }
  const lt = t - localStart; // seconds into the current scene

  el("scrYear").textContent = "Year " + year;
  el("scrLevel").textContent = "Level " + levelNo;
  el("scrPrompt").textContent = q.prompt;
  el("scrPrompt").style.opacity = String(band(t, localStart + 0.5, localStart + 10, 0.6, 0.01));

  ageBadge.textContent = "Age " + age;
  ageBadge.style.opacity = String(s5 ? 0 : band(t, localStart + 0.3, localStart + 4.2, 0.5, 0.6));
  ageBadge.style.transform = "translateX(-50%)";

  // Scene-specific visual, hint and answer beats.
  let answerAt = 0, confettiAt = -1;
  if (s1) {
    // counts 0 -> 9, pauses, then the "one more" step to 10
    const walk = easeInOut(ramp(lt, 1.6, 4.2)) * 9;
    const plusOne = ramp(lt, 5.0, 5.6);
    drawNumberLine(walk + plusOne);
    answerAt = 5.4;
  } else if (s2) {
    const filled = Math.round(easeOut(ramp(lt, 1.8, 5.0)) * 72);
    drawArray(8, 9, filled);
    answerAt = 5.2;
    confettiAt = 5.4;
  } else if (s3) {
    drawFractionBar(6, 2, 42, easeOut(ramp(lt, 4.6, 6.2)));
    answerAt = 6.6;
  } else {
    drawRectDiagonal(5, 12, easeOut(ramp(lt, 2.2, 4.6)), 1 - ramp(lt, 5.2, 5.8));
    answerAt = 5.4;
  }

  // The hint beat belongs to the age-11 scene: the button pulses, the child
  // taps it, the hint lands, and then the answer follows.
  const hintPulse = s3 ? band(t, 20.4, 22.6, 0.4, 0.3) : 0;
  hintBtn.style.opacity = String(hintPulse * (0.65 + 0.35 * Math.sin(lt * 7)));
  hintBtn.style.transform = "scale(" + lerp(1, 1.06, (Math.sin(lt * 7) + 1) / 2) + ")";
  const hintVis = s3 ? band(t, 22.6, 27.9, 0.45, 0.4) : 0;
  hint.textContent = q.hint;
  hint.style.opacity = String(hintVis);
  hint.style.display = hintVis > 0.01 ? "block" : "none";
  hintBtn.style.display = hintPulse > 0.01 ? "block" : "none";

  const ansVis = band(t, localStart + answerAt, localStart + 9.9, 0.4, 0.01);
  el("scrAnswer").textContent = q.answer;
  answerRow.style.opacity = String(ansVis);
  answerRow.style.transform = "scale(" + lerp(0.8, 1, easeOut(ramp(t, localStart + answerAt, localStart + answerAt + 0.5))) + ")";
  tick.style.opacity = String(band(t, localStart + answerAt + 0.35, localStart + 9.9, 0.3, 0.01));

  setConfetti(confettiAt < 0 ? 0 : ramp(t, localStart + confettiAt, localStart + confettiAt + 1.9));

  // ---- the path: appears from the age-8 win, grows each scene, takes over
  // the frame at the end. Levels lit track where that age actually is.
  let levels = 0;
  if (t >= 13.8) levels = lerp(0, 33, easeOut(ramp(t, 13.8, 16.4)));      // through Year 4
  if (t >= 18) levels = lerp(33, 56, easeOut(ramp(t, 24.5, 27.2)));       // through Year 6
  if (t >= 28) levels = lerp(56, 92, easeOut(ramp(t, 34.6, 37.4)));       // into Year 10
  if (t >= 38) levels = lerp(92, 100, easeOut(ramp(t, 38.2, 40.6)));      // the whole climb
  setPath(levels);

  const pathBg = band(t, 13.8, 38.2, 1.2, 0.01) * 0.85;  // behind the device
  const pathFg = band(t, 38.2, 43.2, 0.9, 0.9);          // its own shot
  pathLayer.style.opacity = String(Math.max(pathBg, pathFg));
  pathLayer.style.transform = "scale(" + lerp(0.86, 1, easeOut(ramp(t, 38.0, 41.0))) + ")";
  el("pathCaption").textContent = pathFg > 0.2 ? "100 levels. Years 1 to 10." : "";
  el("pathCaption").style.opacity = String(band(t, 39.4, 43.0, 0.6, 0.6));

  // ---- chips
  const chipBeats = [
    { from: 1.2, to: 7.4, label: "Step 1" },
    { from: 14.2, to: 17.6, label: "Milestone unlocked" },
    { from: 35.2, to: 37.8, label: "GCSE ready" }
  ];
  let chipOp = 0, chipLabel = "";
  for (const b of chipBeats) {
    const o = band(t, b.from, b.to, 0.45, 0.5);
    if (o > chipOp) { chipOp = o; chipLabel = b.label; }
  }
  chip.textContent = chipLabel;
  chip.style.opacity = String(chipOp);
  chip.style.transform = "translateX(-50%) scale(" + lerp(0.9, 1, easeOut(chipOp)) + ")";

  // ---- captions. These have to carry the whole message with the sound off,
  // which is the production note the voiceover cannot satisfy on its own.
  const capBeats = [
    { from: 5.9, to: 7.9, label: "Every maths journey starts with a single step." },
    { from: 15.8, to: 17.9, label: "Every win builds confidence\\u2026" },
    { from: 25.6, to: 27.9, label: "\\u2026every challenge becomes a skill\\u2026" },
    { from: 35.6, to: 37.9, label: "\\u2026all the way to GCSE." }
  ];
  let capOp = 0, capLabel = "";
  for (const b of capBeats) {
    const o = band(t, b.from, b.to, 0.45, 0.35);
    if (o > capOp) { capOp = o; capLabel = b.label; }
  }
  caption.textContent = capLabel;
  caption.style.opacity = String(capOp);
  caption.style.transform = "translateY(" + lerp(26, 0, easeOut(capOp)) + "px)";

  // ---- end card
  const endOp = band(t, 42.6, 45.1, 0.8, 0.01);
  endCard.style.opacity = String(endOp);
  endCard.style.transform = "scale(" + lerp(0.94, 1, easeOut(ramp(t, 42.6, 44.0))) + ")";
  el("endMascot").style.transform = "translateY(" + lerp(30, 0, easeOut(ramp(t, 42.8, 43.8))) + "px)";
};

window.setT(0);
window.__ready = true;
</script>
</body></html>`;
}

/** The 15-second cut is the same timeline, sampled at the three moments that
 * carry it: the first step, the climb, the end card. */
const CUT_15: Array<{ from: number; to: number }> = [
  { from: 3.4, to: 7.9 },   // age 5, the grin
  { from: 13.6, to: 18.0 }, // the win and the path appearing
  { from: 38.4, to: 45.0 }  // the whole climb into the logo
];

function frameTimes(opts: Options): number[] {
  const step = 1 / opts.fps;
  const times: number[] = [];
  if (opts.cut === 45) {
    for (let f = 0; f < Math.round(45 * opts.fps); f++) times.push(f * step);
    return times;
  }
  for (const seg of CUT_15) {
    for (let t = seg.from; t < seg.to - 1e-9; t += step) times.push(t);
  }
  return times;
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

function timingSheet(opts: Options): string {
  const lines = [
    `# Maths Journey UK — ${opts.cut}s ad, timing sheet`,
    "",
    "Hand this to whoever adds the voiceover and music. The video renders silent:",
    "the on-screen captions carry the message on their own, because most of this",
    "will be watched with the sound off.",
    "",
    "| Time | Shot | Voiceover | On screen |",
    "|---|---|---|---|"
  ];
  for (const b of BEATS) {
    lines.push(`| ${b.from}:${String(0).padStart(2, "0")}–${b.to}s | ${b.shot} | "${b.vo}" | *${b.text}* |`);
  }
  lines.push(
    "",
    "## Questions on screen",
    "",
    "Each is generated from the live question bank at the key and seed below, so",
    "any frame can be regenerated and checked against the app.",
    "",
    "| Age | Level | Template | Seed |",
    "|---|---|---|---|"
  );
  for (const s of SCENES) lines.push(`| ${s.age} | Year ${s.year}, Level ${s.levelNo} | \`${s.key}\` | ${s.seed} |`);
  lines.push(
    "",
    "## Music",
    "",
    "The script calls for gentle piano building to strings by the GCSE scene.",
    "Nothing is attached: library music needs a licence that covers paid social,",
    "and that is a purchase, not a render. Cue points, if useful:",
    "",
    "- 0:00 piano alone",
    "- 0:08 add a pulse on the first win",
    "- 0:18 hold back under the hint beat",
    "- 0:28 strings enter",
    "- 0:38 full, then resolve on the end card",
    ""
  );
  return lines.join("\n");
}

/** The window of the timeline each scene occupies, for the per-scene overlay
 * clips. These match the beats in BEATS, minus the hand-over frames at each
 * end where the next scene is already fading in. */
const SCENE_WINDOWS = [
  { from: 0.6, to: 7.9 },
  { from: 8.6, to: 17.9 },
  { from: 18.6, to: 27.9 },
  { from: 28.6, to: 37.9 }
];

/** Renders each scene's app screen on transparent, as a PNG sequence and a
 * WebM with an alpha channel. WebM/VP9 rather than mp4 because h.264 has no
 * alpha, and an overlay without transparency is just a rectangle stuck over
 * the footage. The PNG sequence is there for editors whose tool would rather
 * import frames (and for a still of each scene's final state). */
async function renderScreens(opts: Options, questions: ReturnType<typeof questionFor>[], mascots: Record<string, string>) {
  // 3:4, the proportion of a tablet screen held in portrait — the shape the
  // live-action shots have it in.
  const width = 1200;
  const height = 1600;
  const outDir = path.join(process.cwd(), "out", "ad", "screens");
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const html = buildHtml({ width, height, questions, mascots, screensOnly: true });
  await writeFile(path.join(outDir, "screens.html"), html, "utf8");

  const browser = await launchChromium();
  const made: string[] = [];
  try {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.waitForFunction("window.__ready === true");
    await page.evaluate("document.fonts.ready");
    await page.waitForTimeout(900);

    for (let i = 0; i < SCENES.length; i++) {
      const scene = SCENES[i]!;
      const win = SCENE_WINDOWS[i]!;
      const name = `age${scene.age}-y${scene.year}l${scene.levelNo}`;
      const dir = path.join(outDir, name);
      await mkdir(dir, { recursive: true });

      const step = 1 / opts.fps;
      let f = 0;
      for (let t = win.from; t < win.to - 1e-9; t += step, f++) {
        await page.evaluate((x) => (window as unknown as { setT: (n: number) => void }).setT(x), t);
        await page.screenshot({ path: path.join(dir, `f${String(f).padStart(5, "0")}.png`), omitBackground: true });
      }

      const webm = path.join(outDir, `${name}.webm`);
      await run("ffmpeg", [
        "-y",
        "-framerate", String(opts.fps),
        "-i", path.join(dir, "f%05d.png"),
        "-c:v", "libvpx-vp9",
        "-pix_fmt", "yuva420p",   // the "a" is the whole point: alpha survives
        "-b:v", "0", "-crf", "28",
        webm
      ]);
      made.push(webm);
      console.log(`  ${name}: ${f} frames -> ${path.relative(process.cwd(), webm)}`);
    }
    await context.close();
  } finally {
    await browser.close();
  }
  return made;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  loadAllTemplates();

  if (opts.screens) {
    const questions = SCENES.map(questionFor);
    const mascots = { cheer: await mascot("cheer"), think: await mascot("think") };
    const made = await renderScreens(opts, questions, mascots);
    console.log(`\n${made.length} transparent overlay clips in out/ad/screens/`);
    console.log("Corner-pin each onto the tablet in the matching live-action shot.");
    return;
  }

  const width = opts.landscape ? 1920 : 1080;
  const height = opts.landscape ? 1080 : 1920;
  const questions = SCENES.map(questionFor);
  const mascots = { cheer: await mascot("cheer"), think: await mascot("think") };

  const outDir = path.join(process.cwd(), "out", "ad");
  const framesDir = path.join(outDir, `frames-${opts.cut}-${opts.landscape ? "ls" : "pt"}`);
  await rm(framesDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });

  const html = buildHtml({ width, height, questions, mascots });
  const htmlFile = path.join(outDir, `ad-${opts.cut}-${opts.landscape ? "ls" : "pt"}.html`);
  await writeFile(htmlFile, html, "utf8");

  const browser = await launchChromium();
  const times = frameTimes(opts);
  try {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: "load" });
    // Fonts are loaded once, before the frame loop — waiting per frame would
    // make a 1350-frame render take minutes longer for no benefit.
    await page.waitForFunction("window.__ready === true");
    await page.evaluate("document.fonts.ready");
    await page.waitForTimeout(900);

    for (let i = 0; i < times.length; i++) {
      await page.evaluate((t) => (window as unknown as { setT: (n: number) => void }).setT(t), times[i]!);
      await page.screenshot({ path: path.join(framesDir, `f${String(i).padStart(5, "0")}.png`) });
      if (i % 150 === 0) console.log(`  frame ${i}/${times.length}`);
    }
    await context.close();
  } finally {
    await browser.close();
  }

  const mp4 = path.join(outDir, `maths-journey-${opts.cut}s-${opts.landscape ? "16x9" : "9x16"}.mp4`);
  await run("ffmpeg", [
    "-y",
    "-framerate", String(opts.fps),
    "-i", path.join(framesDir, "f%05d.png"),
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "18",
    // yuv420p so it plays everywhere, including the social apps that reject
    // the 4:4:4 chroma ffmpeg would otherwise pick from PNG input.
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    mp4
  ]);

  const sheet = path.join(outDir, `timing-sheet-${opts.cut}s.md`);
  await writeFile(sheet, timingSheet(opts), "utf8");

  console.log(`\n${times.length} frames at ${opts.fps}fps -> ${(times.length / opts.fps).toFixed(1)}s`);
  console.log(`  ${path.relative(process.cwd(), mp4)}`);
  console.log(`  ${path.relative(process.cwd(), sheet)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
