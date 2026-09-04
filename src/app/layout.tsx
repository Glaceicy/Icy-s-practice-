import type { Metadata, Viewport } from "next";
import { getActiveChildSoft } from "@/lib/auth";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maths Journey UK",
  description: "A progressive Years 1-10 mathematics learning journey aligned to the National Curriculum for England.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a7de6"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const child = await getActiveChildSoft();
  const bodyClasses = [
    "min-h-screen bg-brand-50 text-slate-900 antialiased",
    child?.fontMode === "DYSLEXIC" ? "font-dyslexic" : "",
    child?.highContrast ? "high-contrast" : "",
    child?.reducedMotion ? "reduced-motion" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang="en-GB">
      <body className={bodyClasses}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
