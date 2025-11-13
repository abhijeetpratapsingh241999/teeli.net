"use client";
import { useState } from "react";
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function FAQAccordion({ faq }: { faq: { question: string; answer: string }[] }) {
  const { theme } = useBlogTheme();
  
  if (!faq || faq.length === 0) return null;

  return (
    <div className="mt-6 sm:mt-8">
      <div className="space-y-4">
        {faq.map((item, index) => (
          <FAQItem key={index} q={item.question} a={item.answer} theme={theme} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ q, a, theme }: { q: string; a: string; theme: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7
        border transition-all cursor-pointer
        ${theme === 'dark'
          ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20'
          : 'bg-white border-gray-300 hover:border-gray-400 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20'
        }
      `}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4">
        <p className={`text-base sm:text-lg font-semibold ${
          theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
        }`}>{q}</p>
        <svg
          className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
            open ? "rotate-180" : ""
          } ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        <p className={`text-sm sm:text-base leading-relaxed ${
          theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
        }`}>{a}</p>
      </div>
    </div>
  );
}
