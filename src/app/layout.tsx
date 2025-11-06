import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ✅ यह import add किया गया है
import AnalyticsTracker from "./AnalyticsTracker";

// Lexend for clean readable body text - Optimized for mobile
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

// Inter for headings - Optimized for mobile
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "TEELI.NET - Reality Rendered. Instantly.",
  description: "Futuristic rendering-focused AI & cloud studio.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning className="bg-black">
      <head>
        {/* Critical DNS prefetch for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* ✅ Google Tag Manager Script - Deferred loading */}
        {GTM_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                `,
              }}
            />
            <Script
              id="gtm-script"
              src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
              strategy="afterInteractive"
              defer
            />
          </>
        )}
      </head>

      <body className={`${lexend.variable} ${inter.variable} font-body antialiased bg-black`} suppressHydrationWarning>
        {/* ✅ Google Tag Manager Fallback (Noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* ✅ Page View Tracking Enabled */}
        <AnalyticsTracker />

        {children}
      </body>
    </html>
  );
}
