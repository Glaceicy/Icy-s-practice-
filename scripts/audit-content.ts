/**
 * Reads real output from every live template and flags sentences that are
 * valid maths but broken English or French.
 *
 * The unit tests check that a template generates enough distinct, individually
 * valid questions. They cannot see that "1 are given away" or "de étoiles" is
 * wrong, because both are perfectly valid questions — they just read badly.
 * This is the pass that catches those.
 *
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/audit-content.ts
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/audit-content.ts --seeds 400
 *
 * Every finding is a real defect or a gap in one of the patterns below; there
 * is no expected-failure list, so this should print nothing once the content is
 * clean. Fixes go in the templates, not here.
 */
import { loadAllTemplates, COMPLETE_LEVEL_KEYS } from "../src/lib/questionEngine/templates/all";
import { getTemplatesForLevel } from "../src/lib/questionEngine/registry";
import type { Locale } from "../src/lib/questionEngine/types";

interface Check {
  name: string;
  locale: Locale | "both";
  /** Returns the offending fragment, or undefined when the text is fine. */
  find: (text: string) => string | undefined;
}

const match = (re: RegExp) => (text: string) => text.match(re)?.[0];

const checks: Check[] = [
  {
    // A context pool landing at the start of a sentence. Prompts that open with
    // an algebraic variable or a function name ("x + 6 = 1", "sin 30° = 1/2")
    // are correct, so a single letter or a known function name is allowed.
    name: "sentence opens lowercase",
    locale: "both",
    find: (text) =>
      /^(?![a-z]\b|[a-z][²³]|[a-z] ?[+\-x×÷=<>,]|sin|cos|tan|mq\b|n,)[a-z]/.test(text)
        ? text.slice(0, 40)
        : undefined
  },
  {
    // A range that reaches 1 dropped a singular into a plural sentence.
    name: "singular in a plural sentence",
    locale: "en",
    find: match(/\b1 (are|were|of them are|of them were|have|do|parts|items|people|squares|hours|units|times|more were)\b/)
  },
  {
    name: "singular in a plural sentence",
    locale: "fr",
    find: match(/\b1 (sont|étaient|ont|parts|articles|personnes|cases|heures|fois|d'entre)\b/)
  },
  {
    // French elides de/que/le/la before a vowel sound. A single letter after
    // the word is a maths variable ("la valeur de a"), not a word, and a
    // hyphenated pronoun ("applique-le à") is not this pattern either.
    name: "missing elision",
    locale: "fr",
    find: match(/(?<!-)\b(de|du|que|le|la) (?![a-zA-Z][ ,.)=(])[aàâeéèêiîoôuû][a-zà-ÿ']/)
  },
  {
    // A hedge rather than a translation: the pool's genders differ, so the
    // sentence cannot name the article until the entry is known.
    name: "gender hedge left in",
    locale: "fr",
    find: match(/\b(le\/la|un\/une|du\/de la|il\/elle|é\(e\)|\(e\)s?)\b/)
  }
];

function main() {
  const seeds = Number(process.argv[process.argv.indexOf("--seeds") + 1]) || 1500;
  loadAllTemplates();

  // One example per (check, template, locale): the fix is per template, so a
  // second instance of the same fault adds nothing to act on.
  const findings = new Map<string, { key: string; locale: Locale; fragment: string; text: string }>();

  for (const level of COMPLETE_LEVEL_KEYS) {
    for (const template of getTemplatesForLevel(level)) {
      for (const locale of ["en", "fr"] as const) {
        for (let seed = 0; seed < seeds; seed++) {
          const q = template.generate(seed, locale);
          for (const text of [q.prompt, ...q.explanationSteps, ...q.hints]) {
            for (const check of checks) {
              if (check.locale !== "both" && check.locale !== locale) continue;
              const fragment = check.find(text);
              if (!fragment) continue;
              const id = `${check.name}\u0000${template.key}\u0000${locale}`;
              if (!findings.has(id)) findings.set(id, { key: template.key, locale, fragment, text });
            }
          }
        }
      }
    }
  }

  const names = [...new Set(checks.map((c) => c.name))];
  let total = 0;
  for (const name of names) {
    const rows = [...findings].filter(([id]) => id.startsWith(`${name}\u0000`)).map(([, v]) => v);
    rows.sort((a, b) => a.key.localeCompare(b.key) || a.locale.localeCompare(b.locale));
    console.log(`\n${name.toUpperCase()} — ${rows.length} template/locale pairs`);
    for (const r of rows) {
      console.log(`  ${r.key} [${r.locale}]  ${r.fragment.trim()}`);
      console.log(`      ${r.text.slice(0, 120)}`);
    }
    total += rows.length;
  }
  console.log(`\n${total} finding(s) across ${COMPLETE_LEVEL_KEYS.length} live levels, ${seeds} seeds each.`);
  process.exitCode = total === 0 ? 0 : 1;
}

main();
