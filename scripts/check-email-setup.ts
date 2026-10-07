/**
 * Checks that outgoing email is actually configured, before a real person is
 * waiting on a link that never arrives.
 *
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/check-email-setup.ts
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/check-email-setup.ts --send-test you@example.com
 *
 * Run it with the same environment the app runs with. On Vercel:
 *   vercel env pull .env.production.local
 *   npx dotenv -e .env.production.local -- npx tsx --tsconfig scripts/tsconfig.json scripts/check-email-setup.ts
 *
 * Every failure here is invisible in production. A wrong EMAIL_FROM is
 * accepted by Resend and simply never delivered; a wrong SITE_URL produces a
 * link that looks fine in the email and 404s when clicked. Neither shows up in
 * logs as an error, and both look from the outside like nobody signing up.
 *
 * Nothing is written and no key is printed.
 */
import { Resend } from "resend";

const RESET = "\u001b[0m";
const RED = "\u001b[31m";
const GREEN = "\u001b[32m";
const YELLOW = "\u001b[33m";
const DIM = "\u001b[2m";

let problems = 0;
let warnings = 0;

function ok(label: string, detail = "") {
  console.log(`  ${GREEN}PASS${RESET}  ${label}${detail ? `  ${DIM}${detail}${RESET}` : ""}`);
}
function warn(label: string, fix: string) {
  warnings++;
  console.log(`  ${YELLOW}WARN${RESET}  ${label}\n        ${DIM}${fix}${RESET}`);
}
function fail(label: string, fix: string) {
  problems++;
  console.log(`  ${RED}FAIL${RESET}  ${label}\n        ${DIM}${fix}${RESET}`);
}

/** The app's own rule, repeated rather than imported: lib/email.ts is
 * server-only and will not load outside a request. If that rule changes there,
 * it has to change here — which is the point of printing the result. */
function resolveSiteUrl(): { url: string; source: string } {
  if (process.env.SITE_URL) return { url: process.env.SITE_URL.replace(/\/$/, ""), source: "SITE_URL" };
  if (process.env.VERCEL_URL) return { url: `https://${process.env.VERCEL_URL}`, source: "VERCEL_URL fallback" };
  return { url: "http://localhost:3000", source: "localhost fallback" };
}

function emailDomain(from: string): string | null {
  const m = from.match(/<([^>]+)>/) ?? from.match(/(\S+@\S+)/);
  return m?.[1]?.split("@")[1]?.toLowerCase() ?? null;
}

async function main() {
  const sendTest = (() => {
    const i = process.argv.indexOf("--send-test");
    return i === -1 ? undefined : process.argv[i + 1];
  })();

  console.log("\nEmail configuration\n");

  // ---- the API key --------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    fail("RESEND_API_KEY is not set", "No email can be sent at all. Add it in Vercel → Settings → Environment Variables.");
  } else {
    ok("RESEND_API_KEY is set", `${apiKey.slice(0, 3)}…${apiKey.length} chars`);
  }

  // ---- the sender ---------------------------------------------------------
  const from = process.env.EMAIL_FROM;
  if (!from) {
    fail(
      "EMAIL_FROM is not set, so the app falls back to onboarding@resend.dev",
      "That sandbox sender only delivers to your own Resend account address. Every verification and reset email to a real user is silently dropped. Set EMAIL_FROM to an address on a domain you have verified in Resend."
    );
  } else {
    ok("EMAIL_FROM is set", from);
    if (/resend\.dev/i.test(from)) {
      fail("EMAIL_FROM still uses resend.dev", "Sandbox senders only deliver to your own account address. Use your own verified domain.");
    }
    if (!/@/.test(from)) {
      fail("EMAIL_FROM has no address in it", 'Use the form: Maths Journey UK <hello@mathsjourney.co.uk>');
    }
  }

  // ---- the links inside the email ----------------------------------------
  const { url, source } = resolveSiteUrl();
  console.log();
  if (source !== "SITE_URL") {
    fail(
      `SITE_URL is not set — links are being built from the ${source}`,
      "VERCEL_URL always points at the *.vercel.app deployment, never your custom domain, so every link in every email points somewhere your users do not recognise. Set SITE_URL to https://www.mathsjourney.co.uk."
    );
  } else {
    ok("SITE_URL is set", url);
    if (!url.startsWith("https://")) {
      fail("SITE_URL is not https", "Links in email must be https or mail clients and browsers will warn on them.");
    }
    if (/vercel\.app/i.test(url)) {
      warn("SITE_URL points at a vercel.app deployment", "Fine for a preview environment; in production it should be your own domain.");
    }
  }

  console.log(`\n  ${DIM}A user clicking through would be sent to:${RESET}`);
  console.log(`    ${url}/verify-email?token=…`);
  console.log(`    ${url}/reset-password?token=…`);
  console.log(`  ${DIM}If those are not addresses your site answers on, the links are dead.${RESET}`);

  // ---- does Resend agree the domain is usable? ---------------------------
  if (apiKey) {
    console.log("\nResend account\n");
    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.domains.list();
      if (error) {
        fail(`Resend rejected the API key: ${error.message}`, "Check the key is live (not a deleted one) and belongs to the right account.");
      } else {
        // The SDK has returned both a bare array and a { data: [...] } wrapper
        // across versions, so accept either rather than guessing.
        const raw = data as unknown;
        const domains = (Array.isArray(raw) ? raw : ((raw as { data?: unknown[] })?.data ?? [])) as Array<{
          name?: string;
          status?: string;
        }>;
        if (!domains.length) {
          fail("No domains are set up in Resend", "Resend → Domains → Add domain, then add the DNS records it gives you. Until a domain is verified you can only email your own account address.");
        }
        for (const d of domains) {
          const verified = String(d.status).toLowerCase() === "verified";
          const label = `${d.name} (${d.status})`;
          if (verified) ok("Domain verified", label);
          else warn(`Domain not verified: ${label}`, "Email from this domain will not be delivered until its DNS records are in place.");
        }
        const fromDomain = from ? emailDomain(from) : null;
        if (fromDomain) {
          const match = domains.find((d) => d.name?.toLowerCase() === fromDomain);
          if (!match) {
            fail(
              `EMAIL_FROM sends from @${fromDomain}, which is not in this Resend account`,
              "Resend will accept the call and the mail will not arrive. Add and verify that domain, or change EMAIL_FROM to one that is."
            );
          } else if (String(match.status).toLowerCase() !== "verified") {
            fail(`EMAIL_FROM sends from @${fromDomain}, which is not verified yet`, "Finish the DNS setup in Resend first.");
          } else {
            ok("EMAIL_FROM matches a verified domain", `@${fromDomain}`);
          }
        }
      }
    } catch (e) {
      fail(`Could not reach Resend: ${e instanceof Error ? e.message : String(e)}`, "Network or key problem — nothing was sent.");
    }
  }

  // ---- the only check that proves it ---------------------------------------
  if (sendTest && apiKey) {
    console.log(`\nSending a test email to ${sendTest}\n`);
    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: from ?? "Maths Journey UK <onboarding@resend.dev>",
        to: sendTest,
        subject: "Maths Journey UK — email configuration test",
        html: `<p>If you are reading this, sending works.</p><p>Links in real emails will point at <a href="${url}">${url}</a>.</p>`,
        text: `If you are reading this, sending works.\n\nLinks in real emails will point at ${url}.`
      });
      if (error) fail(`Resend refused the send: ${error.message}`, "The reason above is from Resend and usually names the problem exactly.");
      else ok("Test email accepted by Resend", `id ${(data as { id?: string } | null)?.id ?? "?"}`);
      console.log(`  ${DIM}Accepted is not the same as delivered — go and check the inbox, and the spam folder.${RESET}`);
    } catch (e) {
      fail(`Send failed: ${e instanceof Error ? e.message : String(e)}`, "");
    }
  } else if (!sendTest) {
    console.log(`\n${DIM}Add --send-test you@example.com to prove delivery end to end.${RESET}`);
  }

  console.log(
    `\n${problems ? RED : warnings ? YELLOW : GREEN}${problems} problem(s), ${warnings} warning(s)${RESET}\n`
  );
  process.exitCode = problems ? 1 : 0;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
