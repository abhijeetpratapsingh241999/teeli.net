import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import Script from "next/script";
import "./globals.css";

// NO GOOGLE FONTS - Use system fonts for MAXIMUM performance
const fontVariables = {
  spaceGrotesk: {
    variable: "--font-space-grotesk",
    style: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }
  },
  inter: {
    variable: "--font-inter",
    style: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }
  }
};

export const metadata: Metadata = {
  title: "TEELI.NET - Reality Rendered. Instantly.",
  description: "Futuristic rendering-focused AI & cloud studio.",
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance: DNS prefetch only - minimal external connections */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        
        {/* Google Analytics 4 */}
        {GA4_ID && (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA4_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/* Cloudflare Web Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "GENERATE_YOUR_TOKEN"}'
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Analytics Provider for automatic route tracking */}
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
        
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
