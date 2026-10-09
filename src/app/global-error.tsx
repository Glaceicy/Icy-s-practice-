"use client";

/**
 * The last resort: an error thrown by the root layout itself, which replaces
 * the whole document and so has to supply its own <html> and <body>.
 *
 * error.tsx cannot cover this, because it renders inside the layout that
 * failed. Styles are inline for the same reason — whatever went wrong may
 * have taken the stylesheet with it.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "24px",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          color: "#0f4676",
          background: "#eff9ff"
        }}
      >
        <div style={{ fontSize: "48px" }} aria-hidden="true">
          🦊
        </div>
        <h1 style={{ margin: 0, fontSize: "24px" }}>Maths Journey is having a problem</h1>
        <p style={{ margin: 0, fontSize: "15px", maxWidth: "28rem", lineHeight: 1.5 }}>
          Sorry — the page couldn&apos;t load at all. Nothing has been lost, and your progress is safe. Please try again
          in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "8px",
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            background: "#0a7de6",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer"
          }}
        >
          Try again
        </button>
        <a href="/" style={{ fontSize: "15px", fontWeight: 600, color: "#0863b8" }}>
          Go to the home page
        </a>
        {error.digest && <p style={{ marginTop: "16px", fontSize: "12px", color: "#7e93a8" }}>Reference: {error.digest}</p>}
      </body>
    </html>
  );
}
