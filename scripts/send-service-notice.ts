/**
 * Sends a one-off service notice to every adult account — an outage message,
 * a security notice, a change people have to know about.
 *
 *   # see who it would go to, send nothing (this is the default)
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/send-service-notice.ts \
 *     --subject "Maths Journey is back" --body notice.md
 *
 *   # actually send
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/send-service-notice.ts \
 *     --subject "Maths Journey is back" --body notice.md --send
 *
 * Needs DATABASE_URL and RESEND_API_KEY in the environment, the same two the
 * app itself uses.
 *
 * It sends each person their own email rather than one message with everybody
 * in BCC. One bad paste into "To" instead of "BCC" exposes every parent's
 * address to every other parent, which on a children's product is a personal
 * data breach — this way that mistake is not available to make.
 *
 * SERVICE MESSAGES ONLY. A notice about the service working or not working can
 * go to everyone, because people need it to use the thing they signed up for.
 * Anything promotional — a new feature, an offer, a nudge to come back — goes
 * only to accounts with marketingOptIn, and this script deliberately does not
 * filter on it, so it is the wrong tool for that job.
 */
import { readFile } from "node:fs/promises";
import { Resend } from "resend";
import { prisma } from "../src/lib/db";

interface Options {
  subject: string;
  bodyFile: string;
  send: boolean;
  limit?: number;
  includeUnverified: boolean;
}

function parseArgs(argv: string[]): Options {
  const get = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };
  const subject = get("--subject");
  const bodyFile = get("--body");
  if (!subject || !bodyFile) {
    throw new Error(
      'Usage: send-service-notice.ts --subject "..." --body notice.md [--send] [--limit N] [--include-unverified]'
    );
  }
  const limitRaw = get("--limit");
  return {
    subject,
    bodyFile,
    send: argv.includes("--send"),
    limit: limitRaw ? Number(limitRaw) : undefined,
    includeUnverified: argv.includes("--include-unverified")
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

/** The notice file is plain text with blank lines between paragraphs. Keeping
 * it to that rather than full markdown means what you read in the file is what
 * lands in the inbox, which matters when the thing being sent is an apology. */
function toHtml(body: string, name: string): string {
  const paragraphs = body
    .trim()
    .split(/\n\s*\n/)
    .map((p) => `<p style="margin:0 0 16px">${escapeHtml(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:1.5;color:#0f4676;max-width:560px">
<p style="margin:0 0 16px">Hi ${escapeHtml(name.split(" ")[0] ?? "there")},</p>
${paragraphs}
</div>`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const body = await readFile(opts.bodyFile, "utf8");
  if (!body.trim()) throw new Error(`${opts.bodyFile} is empty — nothing to send.`);

  const recipients = await prisma.adultUser.findMany({
    where: opts.includeUnverified ? {} : { emailVerified: true },
    select: { email: true, fullName: true },
    orderBy: { createdAt: "asc" },
    ...(opts.limit ? { take: opts.limit } : {})
  });

  console.log(`\nSubject: ${opts.subject}`);
  console.log(`Body:    ${opts.bodyFile} (${body.trim().split(/\n\s*\n/).length} paragraphs)`);
  console.log(`To:      ${recipients.length} account(s)${opts.includeUnverified ? "" : ", verified only"}`);
  console.log(`\nFirst few:`);
  for (const r of recipients.slice(0, 5)) console.log(`  ${r.email}`);
  if (recipients.length > 5) console.log(`  ...and ${recipients.length - 5} more`);

  if (!opts.send) {
    console.log(`\nDRY RUN — nothing sent. Re-run with --send to send it for real.`);
    console.log(`Preview of the first email:\n`);
    if (recipients[0]) console.log(toHtml(body, recipients[0].fullName).replace(/<[^>]+>/g, "").replace(/\n{2,}/g, "\n"));
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set — the same key the app sends verification emails with.");
  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM ?? "Maths Journey UK <onboarding@resend.dev>";

  let sent = 0;
  const failed: Array<{ email: string; reason: string }> = [];
  for (const r of recipients) {
    try {
      const { error } = await resend.emails.send({
        from,
        to: r.email,
        subject: opts.subject,
        html: toHtml(body, r.fullName),
        text: `Hi ${r.fullName.split(" ")[0] ?? "there"},\n\n${body.trim()}`
      });
      if (error) throw new Error(error.message);
      sent++;
      process.stdout.write(`\r  sent ${sent}/${recipients.length}`);
    } catch (e) {
      failed.push({ email: r.email, reason: e instanceof Error ? e.message : String(e) });
    }
    // Resend's default rate limit is a couple of requests a second, and being
    // throttled mid-run would leave half the list emailed and half not.
    await sleep(600);
  }

  console.log(`\n\n${sent} sent, ${failed.length} failed.`);
  for (const f of failed) console.log(`  FAILED ${f.email}: ${f.reason}`);
  if (failed.length) {
    console.log(`\nRe-running would email everyone again, including those already sent.`);
    console.log(`For a short list, send the failures by hand instead.`);
  }
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
