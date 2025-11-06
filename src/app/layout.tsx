import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ✅ यह import add किया गया है
import AnalyticsTracker from "./AnalyticsTracker";

// Lexend for clean readable body text - Ultra optimized
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap", // Immediate render with fallback
  weight: ['400'], // Only ONE weight - minimum possible
  preload: false, // Don't preload - let browser decide
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: false, // Disable for faster load
});

// Inter for headings - Ultra optimized
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Immediate render with fallback
  weight: ['600'], // Only ONE weight
  preload: false, // Don't preload
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: false, // Disable for faster load
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
      </head>

      <body className={`${lexend.variable} ${inter.variable} font-body antialiased bg-black`} suppressHydrationWarning>
        {/* ✅ Google Tag Manager - Ultra Delayed for Mobile Performance */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `
                setTimeout(function(){
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                }, 10000);
              `,
            }}
          />
        )}
        
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

        {/* ✅ Page View Tracking - Delayed */}
        <AnalyticsTracker />

        {children}
      </body>
    </html>
  );
}
