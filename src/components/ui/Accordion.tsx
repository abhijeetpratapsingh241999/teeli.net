'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  title?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Accordion({ items, title, className = '', theme = 'dark' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="text-center md:text-left mb-8 sm:mb-10 md:mb-12">
          {/* H2 Style Gradient Divider - Centered */}
          <div className={`w-16 sm:w-20 h-0.5 sm:h-1 rounded-full mb-4 sm:mb-5 mt-10 sm:mt-12 md:mt-14 mx-auto md:mx-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`} />
          
          {/* H2 Style Heading - Centered on mobile, left on desktop */}
          <h2 className={`font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-blue-900'
          }`}>
            {title}
          </h2>
        </div>
      )}
      
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div
              key={index}
              className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 transition-colors hover:bg-white/5"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
              >
                <h3 className="font-bold text-base md:text-lg text-cyan-300 flex-1">
                  {item.question}
                </h3>
                
                <div className="shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 transition-transform duration-300" />
                  )}
                </div>
              </button>
              
              <div
                id={`accordion-content-${index}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-zinc-300 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
