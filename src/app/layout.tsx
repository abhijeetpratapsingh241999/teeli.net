import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Lexend for clean readable body text - CRITICAL PERFORMANCE FIX
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap", // Prevent invisible text
  weight: ['400'], // Only ONE weight
  preload: true, // CRITICAL: Preload prevents FOUT (Flash of Unstyled Text)
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true, // CRITICAL: Reduce layout shift
});

// Inter for headings - CRITICAL PERFORMANCE FIX
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevent invisible text
  weight: ['600'], // Only ONE weight
  preload: true, // CRITICAL: Preload prevents FOUT
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true, // CRITICAL: Reduce layout shift
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
  return (
    <html lang="en" suppressHydrationWarning className="bg-black">
      <head>
        {/* Reduce mobile network requests */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>

      <body className={`${lexend.variable} ${inter.variable} font-body antialiased bg-black`} suppressHydrationWarning>
        {/* ✅ Vercel Analytics - Minimal overhead */}
        <Analytics />

        {children}
      </body>
    </html>
  );
}