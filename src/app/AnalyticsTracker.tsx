"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// GTM DataLayer event type
interface GTMEvent {
  event: string;
  page_path?: string;
  [key: string]: string | number | boolean | undefined;
}

// Extend Window interface for GTM dataLayer
declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
