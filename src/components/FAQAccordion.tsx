"use client";

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  theme?: 'light' | 'dark';
}

export default function FAQAccordion({ 
  items, 
  title = "FAQ (Frequently Asked Questions)",
  theme = 'light' 
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="my-12 sm:my-16 md:my-20">
      {/* H2 Style Section with Gradient Divider */}
      <div className="text-center md:text-left mb-10 sm:mb-12 md:mb-14">
        <div className={`w-20 sm:w-24 h-1 sm:h-1.5 rounded-full mb-5 sm:mb-6 mx-auto md:mx-0 ${
          theme === 'dark' 
            ? 'bg-linear-to-r from-cyan-500 to-purple-500' 
            : 'bg-linear-to-r from-blue-600 to-indigo-600'
        }`} />
        
        <h2 className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-blue-900'
        }`}>
          {title}
        </h2>
      </div>
      
      {/* FAQ Container with Card Design */}
      <div className="space-y-4 sm:space-y-5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-linear-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/20'
                  : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
              } ${isOpen ? (theme === 'dark' ? 'shadow-xl shadow-cyan-500/30' : 'shadow-xl') : ''}`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 sm:p-6 md:p-7 flex items-start justify-between gap-4 transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-cyan-900/20' 
                    : 'hover:bg-blue-50/60'
                }`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className={`font-semibold text-base sm:text-lg md:text-xl flex-1 tracking-tight leading-snug ${
                  theme === 'dark' ? 'text-cyan-300' : 'text-blue-900'
                }`}>
                  {item.question}
                </h3>
                
                {/* Custom SVG Icon - Plus/Minus */}
                <span className={`shrink-0 transition-all duration-300 ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
                } ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              {/* Answer with smooth animation */}
              <div
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`px-5 sm:px-6 md:px-7 pb-5 sm:pb-6 md:pb-7 pt-0 ${
                  theme === 'dark'
                    ? 'bg-linear-to-b from-cyan-900/10 to-transparent'
                    : 'bg-linear-to-b from-blue-50/40 to-transparent'
                }`}>
                  <div className={`text-sm sm:text-base md:text-lg leading-relaxed font-medium tracking-tight ${
                    theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
