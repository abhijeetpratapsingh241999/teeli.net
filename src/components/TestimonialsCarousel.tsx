"use client";

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Lead Architect",
    company: "Studio XYZ",
    content: "TEELI transformed our workflow completely. What used to take weeks now takes days. The AI-powered rendering is phenomenal and the cloud GPU infrastructure is incredibly reliable.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Creative Director",
    company: "Vision Labs",
    content: "The quality of renders from TEELI is outstanding. Our clients are amazed at how quickly we can iterate on designs. It's become an essential part of our pipeline.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Designer",
    company: "TechCorp",
    content: "Image-to-3D feature is a game changer. We can now create product visualizations in minutes instead of hours. The carbon tracking is also a great bonus for our sustainability goals.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "VFX Supervisor",
    company: "Digital Dreams",
    content: "Scalability is incredible. Whether we need one render or a thousand, TEELI handles it seamlessly. The multi-cloud approach means we never face bottlenecks.",
    rating: 5
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial Card */}
      <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 p-8 md:p-12 backdrop-blur-sm">
        {/* Quote Icon */}
        <div className="absolute top-6 left-6 opacity-20">
          <Quote className="w-16 h-16 text-cyan-400" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Stars Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-lg md:text-xl text-zinc-200 mb-8 leading-relaxed">
            "{currentTestimonial.content}"
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center gap-4">
            {/* Avatar Placeholder */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {currentTestimonial.name.charAt(0)}
            </div>

            {/* Name & Role */}
            <div>
              <div className="font-semibold text-white text-lg">
                {currentTestimonial.name}
              </div>
              <div className="text-zinc-400 text-sm">
                {currentTestimonial.role} at {currentTestimonial.company}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors group"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors group"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
      </button>

      {/* Dots Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-cyan-400 w-8'
                : 'bg-zinc-600 hover:bg-zinc-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
