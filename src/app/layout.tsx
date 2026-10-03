import type { Metadata, Viewport } from "next";
import { getActiveChildSoft } from "@/lib/auth";
import { getLocale } from "@/lib/i18n/locale";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { I18nProvider } from "@/components/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maths Journey UK",
  description: "A progressive Years 1-10 mathematics learning journey aligned to the National Curriculum for England.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a7de6",
  colorScheme: "light"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const child = await getActiveChildSoft();
  const locale = await getLocale();
  const bodyClasses = [
    "min-h-screen bg-brand-50 text-slate-900 antialiased",
    child?.fontMode === "DYSLEXIC" ? "font-dyslexic" : "",
    child?.highContrast ? "high-contrast" : "",
    child?.reducedMotion ? "reduced-motion" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang={locale === "fr" ? "fr" : "en-GB"}>
      <body className={bodyClasses}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LanguageSwitcher current={locale} />
        <I18nProvider locale={locale}>
          <div id="main-content">{children}</div>
        </I18nProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
