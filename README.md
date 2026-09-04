# Maths Journey UK

A progressive mathematics learning application for Years 1–10 in England (ages
5–15), aligned to the National Curriculum for England mathematics programmes
of study (Key Stages 1–4). Built with Next.js 14 (App Router), TypeScript,
Tailwind CSS and Prisma.

This is a working, functional application — not a mockup. See
[`DOCUMENTATION.md`](./DOCUMENTATION.md) for architecture, the data model,
and an honest breakdown of exactly which content is fully authored today
versus scaffolded for a future authoring pass.

## Quick start

Requirements: Node.js 20+.

```bash
npm install
npm run db:push     # creates the local SQLite database from the schema
npm run db:seed      # seeds the curriculum, lessons, question bank and demo accounts
npm run dev           # http://localhost:3000
```

Run the automated tests:

```bash
npm test              # scoring, unlocking, assessment engine, question bank validation (171 tests)
npm run typecheck
npm run build
```

There are also two scripted end-to-end journeys (not part of `npm test`,
since they need a running dev server and a real browser):

```bash
npm run dev &                              # in one terminal
npx tsx scripts/e2e-journey.ts             # drives the full required journey through the real UI with Playwright
npx tsx scripts/verify-fail-path.ts        # verifies the fail -> revision -> retry -> pass path against the DB
```

## Demo accounts

Seeded by `npm run db:seed`:

| Role    | Email                                | Password           |
| ------- | ------------------------------------- | ------------------- |
| Parent  | `parent.demo@mathsjourney.example`   | `Demo!Password123`  |
| Teacher | `teacher.demo@mathsjourney.example`  | `Demo!Password123`  |
| Admin   | `admin.demo@mathsjourney.example`    | `Demo!Password123`  |

Four demo child profiles are created under the parent account (PIN `1234`
for all of them): a fresh Year 1 starter, a Year 1 child partway through,
a Year 4 child, and a Year 10 (Higher pathway) child.

## Project layout

```
prisma/schema.prisma        Data model (see DOCUMENTATION.md)
prisma/seed.ts               Curriculum + lessons + demo data seeding
src/lib/curriculum/          All 10 school years / 100 levels / objectives (metadata)
src/lib/lessons/content.ts   Authored mini-lesson content for the flagship levels
src/lib/questionEngine/      Deterministic question-template generation engine
src/lib/services/            Server-side business logic (practice, mastery, dashboard...)
src/lib/actions/             Next.js Server Actions (the app's API surface)
src/app/                     Pages (the 20 required screens)
src/components/              UI components
tests/                       Vitest unit/integration tests
scripts/                     End-to-end verification scripts
```

## Production deployment notes

- **Database**: dev uses SQLite for a zero-config `npm install && npm run dev`.
  The schema is Postgres-compatible — switch `provider = "sqlite"` to
  `"postgresql"` in `prisma/schema.prisma`, set `DATABASE_URL` to your
  Postgres/Supabase connection string, and re-run `prisma db push` (or set up
  `prisma migrate` for versioned migrations). SQLite has no native enum type,
  so enum-shaped fields are typed `String` with the allowed values documented
  in comments — switching to Postgres lets you promote these to native enums
  if desired.
- **Secrets**: set `AUTH_SECRET` to a long random string in production
  (session JWTs are signed with it). The app refuses to start signing
  sessions with the development fallback secret when `NODE_ENV=production`.
- **PWA**: `public/manifest.json` and `public/sw.js` provide an installable
  shell with an offline-resilient static cache; API/data routes are
  deliberately excluded from the cache so learning progress is never served
  stale.
