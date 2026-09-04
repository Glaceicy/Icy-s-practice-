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

Requirements: Node.js 20+, and a Postgres database (a free [Supabase](https://supabase.com)
project is the easiest option — see "Deploying so it's reachable from any
device" below for exact steps). Create a `.env` file in the project root:

```
DATABASE_URL="<your Postgres pooled connection string>"
DIRECT_URL="<your Postgres direct (unpooled) connection string>"
AUTH_SECRET="<any long random string>"
```

(Supabase's "Connect" panel gives you both `DATABASE_URL` and `DIRECT_URL`
directly — `DATABASE_URL` is used by the running app, `DIRECT_URL` is used
only for `prisma db push`/`migrate`, since schema changes don't work
reliably through a connection pooler.)

Then:

```bash
npm install
npm run db:push       # creates the database tables from the schema
npm run db:seed        # seeds the curriculum, lessons, question bank and demo accounts
npm run dev             # http://localhost:3000
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

## Deploying so it's reachable from any device

Running `npm run dev` on your own computer only serves the app on that one
machine (`localhost`) — fine for building/testing, but a child on another
device (tablet, another PC, a phone) can't reach it unless it's actually
hosted. This sets up a real, always-on deployment using two free services:
**Supabase** (the database) and **Vercel** (runs the app, built by the same
team as Next.js).

### 1. Create the database (Supabase)

1. Go to https://supabase.com, sign up (free), and create a new project.
2. Once it's ready, click **Connect** (top of the project dashboard), choose
   **ORM → Prisma**, and scroll to the step showing your `.env` values. Copy
   both:
   - `DATABASE_URL` (pooled, port 6543, `?pgbouncer=true`)
   - `DIRECT_URL` (direct, port 5432)

   Replace `[YOUR-PASSWORD]` in both with the database password you set when
   creating the project.

### 2. Point the app at it and load the starter data

On your own computer, in the project folder, update your `.env` file with
both of those values, then run:

```bash
npm run db:push
npm run db:seed
```

This creates all the tables and loads the curriculum/demo accounts straight
into your new cloud database — the same database the deployed app will use.

### 3. Deploy the app (Vercel)

1. Go to https://vercel.com, sign up (free), and choose **"Import Project"**
   from your GitHub account, selecting this repository and branch.
2. Under **Environment Variables**, add:
   - `DATABASE_URL` — the same pooled connection string from step 1
   - `DIRECT_URL` — the same direct connection string from step 1
   - `AUTH_SECRET` — any long random string (e.g. generate one at
     https://generate-secret.vercel.app/32)
3. Click **Deploy**. After a couple of minutes you'll get a public URL like
   `https://your-project.vercel.app`.

That URL works from any device, anywhere — no need for your own computer to
stay on. Sign in there the same way as locally (demo accounts in the table
above, or create a fresh adult account and child profiles).

**Note on demo accounts in production:** the seeded demo accounts (§"Demo
accounts") use a publicly-known password. Fine for trying things out, but
before sharing the real URL with your family, either change that password or
just register a fresh adult account of your own and use that instead.

### Other production notes

- **Secrets**: the app refuses to start signing sessions with the
  development fallback `AUTH_SECRET` when `NODE_ENV=production` — Vercel
  sets `NODE_ENV=production` automatically, so step 3's `AUTH_SECRET`
  environment variable is required, not optional.
- **PWA**: `public/manifest.json` and `public/sw.js` provide an installable
  shell with an offline-resilient static cache; API/data routes are
  deliberately excluded from the cache so learning progress is never served
  stale.
