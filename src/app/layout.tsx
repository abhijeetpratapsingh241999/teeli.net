import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";

// Lexend for body text - excellent readability, variable font
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

// Inter for headings - clean, professional, variable font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TEELI.NET - Reality Rendered. Instantly.",
  description: "Futuristic rendering-focused AI & cloud studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-black">
      <body className={`${lexend.variable} ${inter.variable} font-body antialiased bg-black`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
