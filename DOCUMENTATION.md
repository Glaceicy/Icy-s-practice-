# Maths Journey UK — Documentation

## 1. Purpose

Maths Journey UK teaches mathematics progressively to children and young
people in Years 1–10 in England (ages 5–15), aligned to the National
Curriculum for England mathematics programmes of study for Key Stages 1–4
(https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study).
It uses UK English, pounds and pence, and metric measurements throughout.

The curriculum data model (`SchoolYear` → `Level` → `LearningObjective`) is
deliberately generic rather than England-specific in its shape, so Welsh,
Scottish or Northern Irish curriculum variants could be added later as
additional `SchoolYear` sets without a schema change.

## 2. Architecture

- **Framework**: Next.js 14 (App Router), React 18, TypeScript (strict mode).
- **Styling**: Tailwind CSS.
- **Database**: Prisma ORM targeting PostgreSQL (e.g. Supabase) so the same
  database backs both local development and a real hosted deployment — see
  README "Deploying so it's reachable from any device". SQLite also works
  for isolated local-only work (switch `provider` back to `"sqlite"`).
- **Auth**: Adults authenticate with email/password (bcrypt-hashed,
  12 rounds) and a signed, httpOnly JWT session cookie (`jose`). Children
  never have their own credentials or email address — they select an avatar
  and enter a 4-digit PIN (bcrypt-hashed) scoped to their owning adult
  account. Every server action that touches a child's data re-verifies, on
  the server, that the active child belongs to the authenticated adult
  (`requireActiveChild` / `assertChildAccess` in `src/lib/auth.ts`) — a
  tampered cookie cannot grant access to another family's data.
- **API surface**: Next.js Server Actions (`src/lib/actions/*`), not a
  separate REST/GraphQL layer. Business logic lives in `src/lib/services/*`,
  independent of the web framework, so it is directly unit-testable (see
  §7) and directly reusable from the seed script and verification scripts.
- **PWA**: installable manifest + a minimal service worker that caches only
  the static shell, never API/data routes, so offline visits never show
  stale progress or scores.

## 3. Data model

Full schema: `prisma/schema.prisma`. Entities, matching spec §15:

`AdultUser`, `ChildProfile`, `SchoolYear`, `Level`, `LearningObjective`,
`Lesson` (+ `LessonObjective`), `QuestionTemplate`, `GeneratedQuestionLog`
(a generated question instance), `PracticeAttempt` / `PracticeAnswer`,
`AssessmentAttempt` / `AssessmentAnswer` (the Mastery Challenge),
`LevelUnlock`, `ObjectiveMastery`, `MisconceptionLog`, `Achievement`,
`LearningGoal`, `LearningSessionLog`, `ProgressReport`, `AdminAuditLog`.

SQLite has no native enum type, so fields that would otherwise be Prisma
enums (`AdultRole`, `Pathway`, `QuestionType`, `DifficultyBand`,
`AssessmentStatus`, `MasteryStatus`, `ContentStatus`, `PracticeMode`,
`FontMode`) are `String` columns, with the allowed values documented as
Prisma `///` doc comments directly above each model and mirrored as
TypeScript union types in `src/lib/types.ts` and the question engine's own
`src/lib/questionEngine/types.ts`. Every API boundary validates these with
`zod`. Switching the datasource to `postgresql` lets these be promoted to
native enums without changing application code.

## 4. Question generation engine (spec §7)

`src/lib/questionEngine/` is a self-contained, framework-agnostic module:

- **Templates are code, not data.** Each `QuestionTemplateDef` is a pure
  function `generate(seed) => GeneratedQuestionInstance`, registered under a
  level key (e.g. `Y1L1`) in `src/lib/questionEngine/templates/year1/level1.ts`.
  Given the same `(templateKey, seed)`, `generate` always returns an
  identical question (proven by `tests/questionEngine.test.ts`'s
  determinism test) — this is what makes replay, admin review, and
  "frequently answered incorrectly" analytics meaningful.
- **Deterministic grading only.** `correctAnswer` is always computed by pure
  arithmetic/logic inside `generate()`, stored on the `GeneratedQuestionLog`
  row the first time a given `(template, seed)` pair is served, and that
  stored value — never a live recomputation, and never an AI call — is what
  `gradeAnswer()` (`src/lib/services/questionLog.ts`) checks a learner's
  submission against. AI is not used anywhere in the grading path.
- **Validated automatically.** `src/lib/questionEngine/validators.ts`
  checks every generated instance is well-formed (non-empty prompt, no
  unfilled placeholders, choice-based questions have the correct answer
  among their offered choices with no duplicates, ordering/matching answers
  are valid permutations/mappings, etc.), and empirically verifies each
  template reaches at least 150 distinct, valid variations by sampling 1,500
  seeds. Every registered template is covered by this check in
  `tests/questionEngine.test.ts` — **171 tests, all passing.**
- **Balanced difficulty.** `pickQuestions()` in `registry.ts` selects
  questions in roughly a 30% fluency / 40% application / 30% reasoning split
  by default (configurable), matching spec §7.
- **17 question types** are modelled (`QuestionType` in
  `questionEngine/types.ts`): multiple choice, number entry, missing
  number, ordering, matching, drag-and-drop, number line, visual count,
  shape ID, clock reading, money, word problem, multi-step, true/false,
  graph interpretation, algebra, geometry, and reasoning/explain. Ordering
  and drag-and-drop share one interaction model — tap items into place, with
  numbered position labels — which is simultaneously the primary
  interaction *and* the accessible alternative to literal HTML5 drag-and-drop
  (which is often unusable with a keyboard or screen reader), rather than
  offering two separate, divergent implementations.
- **Content governance.** An admin can disable an inaccurate template
  (`isActive` on `QuestionTemplate`); disabled templates are excluded from
  selection immediately (`disabledTemplateKeys` threaded through
  `pickQuestions`), for both practice and the Mastery Challenge.

## 5. Scoring and unlocking (spec §16)

Implemented as pure, dependency-free functions so the exact rules are
directly unit-tested without touching a database:

- `src/lib/scoring.ts`: `computeScorePercentage`, `isMasteryPass` (38, 39 or
  40 out of 40 passes; 37 or fewer does not — this exact boundary is
  asserted in `tests/scoring.test.ts`).
- `src/lib/assessment.ts`: the 40-question, 4-round Mastery Challenge state
  machine — only the first submission for a question is ever recorded (the
  slot locks immediately), pause/resume, and a hard refusal to finalize
  until all 40 are answered. `tests/assessment.test.ts` exercises the full
  38-vs-37 boundary through this engine, plus pause/resume and immutability
  after submission.
- `src/lib/unlocking.ts`: `decideUnlock` (pure decision) plus the
  `LevelUnlock` row's `@@unique([childId, levelId])` database constraint,
  which is the second, authoritative guarantee that a level is never
  unlocked twice even under concurrent requests.
- `src/lib/services/mastery.ts` wires these to Prisma: on submission it
  computes the score from the stored per-question results (never
  re-deriving from anything the client sent), persists it, and — only on a
  pass — idempotently creates the `LevelUnlock` row for the next level
  (`prisma.levelUnlock.upsert`).

**End-to-end verification**, beyond the unit tests: `scripts/e2e-journey.ts`
drives the complete required journey (registration → child creation → year
selection → lesson → guided practice, including a deliberate wrong answer →
independent practice → 40-question Mastery Challenge → wrong-answer support
→ pass calculation → next-level unlock → parent progress report) through a
real headless browser against the real running app, then cross-checks the
results screen against the database. `scripts/verify-fail-path.ts` runs a
second scenario — fail with 20/40, confirm the next level is *not* unlocked,
confirm weak objectives are identified, retry and pass with exactly 38/40,
and confirm both attempts remain in permanent history. Both scripts pass.

## 6. Content coverage status — read this before assuming a level is playable

The full curriculum **structure** — all 10 school years, all 100 levels,
their titles, summaries and ~300 learning objectives cited against the DfE
programmes of study — is seeded and browsable today (`/admin/curriculum`,
and every year's journey map). This satisfies "the complete curriculum-
objective structure" from the final delivery requirements.

**Fully authored** (lessons + a validated, ≥150-variation-per-template
question bank, playable end to end) — **8 of the 100 levels**:

| Level | Templates | Why this one |
| --- | --- | --- |
| Year 1, Level 1 | 30 | Flagship KS1 level — proves the full mechanic |
| Year 1, Level 2 | 30 | Proves within-year progression (Level 1 → 2) |
| Year 1, Level 10 | 30 | Mixed-mastery review — proves year-end unlock into Year 2 |
| Year 4, Level 1 | 15 | Proves the engine at upper-KS2 depth |
| Year 5, Level 1 | 27 | Place value to 1,000,000, rounding and negative numbers in context |
| Year 5, Level 2 | 21 | Formal addition/subtraction, estimating with rounding, multi-step problems |
| Year 7, Level 1 | 15 | Proves the engine at KS3 depth (negative numbers) |
| Year 10, Level 1 | 15 | Proves the engine at KS4/GCSE depth, including Foundation/Higher pathway-tagged templates |

Every one of these 8 levels' templates is individually verified (by
`tests/questionEngine.test.ts`) to generate at least 150 distinct, valid
variations, exactly as spec §7 requires per level; the first three meet the
full ≥30-template bar from spec §7, the rest ship at 15-27 templates each
(still ≥150 variations apiece) as a deliberately smaller but equally real
and validated proof of the engine at that age range, rather than a diluted
attempt at 30 across all of them.

Years 5 and 7 are being filled in level-by-level, in the order children are
actually reaching them — see the commit history for progress; the table
above and `COMPLETE_LEVEL_KEYS` in `src/lib/questionEngine/templates/all.ts`
are always the source of truth for exactly which levels are live.

**The other 92 levels** have their objectives fully defined but no lessons
or question templates yet (`Level.status = "SCAFFOLDED"` in the database).
The app **never presents a scaffolded level as playable**: the journey map
shows it as unlocked-but-"Coming soon" once a child reaches it, and the
level-overview/lesson/practice/mastery routes all check `status ===
"COMPLETE"` server-side and refuse to serve a scaffolded level (rather than
rendering a placeholder lesson or fake questions). Extending coverage to
further levels means adding more files under
`src/lib/questionEngine/templates/<yearN>/level<N>.ts` (following the
existing pattern) and an entry in `src/lib/lessons/content.ts`, then
flipping that level's `status` to `"COMPLETE"` in
`src/lib/curriculum/year<N>.ts` — the engine, scoring, unlocking, dashboards
and every screen already work against any level that has content, with no
further code changes required.

**Do not read "60,000+ combined question variations already exist" from
this number of templates alone** — that combinatorial count is real (proven
per-template by the tests) but only for these 8 levels; it is not a claim
that all 100 levels are populated.

## 7. Curriculum sequence and DfE alignment

Every objective in `src/lib/curriculum/year1.ts` … `year10.ts` carries a
`dfeReference` citing the relevant National Curriculum programme-of-study
strand. Years 1–6 objectives are drawn directly from the KS1/KS2 programmes
of study; Years 7–9 from the KS3 programme of study (which is not broken
down by individual school year in the DfE document, so the sequencing
across Y7–Y9 here is a reasonable, standard progression, not a DfE-mandated
split); Year 10 covers GCSE Mathematics subject content common to
Foundation and Higher tiers, again organised into a logical sequence since
KS4 content is not prescribed by year. **As the spec itself requires:** this
sequencing should be reviewed by a qualified mathematics teacher before
being treated as a finished curriculum, particularly the KS3/KS4
progression and the Foundation/Higher differentiation.

## 8. Personalisation (spec §8)

`ObjectiveMastery` tracks, per child per objective: status
(not-started/developing/secure/mastered, derived from accuracy and attempt
count), first-attempt accuracy, total attempts/correct, hints used, and a
computed next spaced-review date. `MisconceptionLog` records every wrong
answer's misconception tag with context. The parent/teacher dashboard
(`/dashboard/child/[childId]`) surfaces strengths, developing areas and the
most common misconceptions from this data. Personalised revision
(`getWeakObjectiveCodes` in `src/lib/services/practice.ts`) targets the
objective codes a child got wrong on their most recent failed Mastery
Challenge attempt for that level.

## 9. Accessibility (spec §11)

Per-child settings (`ChildProfile.fontMode/highContrast/reducedMotion/
soundMuted/readAloud/audioVolume`), editable both by the child (PIN-gated,
`/settings/accessibility`) and by the parent/teacher from the dashboard
without needing the PIN. Applied via body classes set server-side in the
root layout to avoid a flash of the wrong theme. Also implemented: large
touch targets (44px minimum) throughout, semantic HTML with ARIA labels,
full keyboard navigation (no drag-and-drop-only interactions — see §4), a
skip-to-content link, visible focus rings (high-contrast-aware), optional
read-aloud via the browser's speech synthesis API (never the only way to
access content), colour-blind-safe feedback (icons/text alongside colour,
never colour alone), and untimed learning by default (no timers anywhere in
the practice or Mastery Challenge flows).

## 10. Child safety and privacy (spec §12)

No adverts, no public child profiles, no child-to-child messaging or
external links anywhere in the learner area, adult-controlled accounts with
an explicit consent checkbox at registration, bcrypt-hashed credentials and
PINs, httpOnly signed session cookies, and every child-data access
re-verified server-side against the authenticated adult's ownership (§2).
**This is a good-faith implementation of privacy-by-design principles, not
a legal compliance certification** — the spec itself requires specialist
legal review before making a formal ICO Children's Code / UK GDPR
compliance claim, and none is made here.

## 11. Administration (spec §14)

`/admin` (role = `ADMIN`): curriculum structure browser, question-template
review (enable/disable, mark reviewed, see which questions are most
frequently answered incorrectly across all children), and CSV/JSON
export/import. Because questions are generated from code (§4), import/export
operates on template **governance metadata** (generator key, active state,
reviewer, tags) rather than fabricating new generator logic from a
spreadsheet at runtime — exporting gives the full template catalogue;
importing bulk-updates publish/review decisions from a file.

## 12. Testing

```
npm test          # 171 Vitest tests: scoring, unlocking, assessment engine, full question-bank validation
npm run typecheck # strict TypeScript, zero errors
npm run build     # production Next.js build
```

Plus the two scripted end-to-end journeys described in §5 and the README.

## 13. Required screens

All 20 screens from spec §13 are implemented and linked:

1. Landing — `/`
2. Adult registration — `/register`
3. Adult login — `/login`
4. Child-profile creation — `/profiles/new`
5. Child-profile selection — `/profiles`
6. School-year selection — `/learn/[childId]/year-select`
7. Learning-journey map — `/learn/[childId]/journey/[year]`
8. Level overview — `/learn/[childId]/level/[levelId]`
9. Interactive lesson — `/learn/[childId]/level/[levelId]/lesson/[order]`
10. Guided practice — `/learn/[childId]/level/[levelId]/guided`
11. Independent practice — `/learn/[childId]/level/[levelId]/independent`
12. Mastery Challenge — `/learn/[childId]/level/[levelId]/mastery`
13. Wrong-answer explanation — the `WrongAnswerCard` view shown inline within
    guided/independent/Mastery Challenge on an incorrect answer (a distinct
    screen state within the flow, not a separate URL — reviewing an
    explanation mid-assessment shouldn't require losing your place)
14. Assessment results — `/learn/[childId]/level/[levelId]/results/[attemptId]`
15. Personalised revision — `/learn/[childId]/level/[levelId]/revision`
16. Child achievements — `/learn/[childId]/achievements`
17. Parent/teacher dashboard — `/dashboard`
18. Progress report (printable) — `/dashboard/child/[childId]/report`
19. Accessibility settings — `/settings/accessibility`
20. Admin curriculum/question area — `/admin`, `/admin/questions`,
    `/admin/curriculum`, `/admin/import-export`

Every button and form on every screen is wired to real server logic — there
are no placeholder controls.

## 14. Known limitations

- Only 6 of 100 levels have full lesson/question content (§6) — this is the
  single biggest gap versus the full spec and is the natural next phase of
  work, using the exact same engine.
- "Time spent learning" on the dashboard/report is estimated from
  attempt start/submit timestamps, not a dedicated session-tracking
  pipeline (`LearningSessionLog` exists in the schema for this but isn't
  populated yet).
- Read-aloud uses the browser's built-in speech synthesis (voice quality
  varies by device/browser) rather than pre-recorded narration audio.
- No specialist legal review of data-protection compliance has been
  performed (§10).
