"use client";

import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function IndustryUseCasesIllustration() {
  const { theme } = useBlogTheme();

  return (
    <div className="my-8 sm:my-12 flex justify-center">
      <div className={`w-full max-w-4xl rounded-xl border-2 shadow-2xl overflow-hidden ${
        theme === 'dark' ? 'border-cyan-500/30 bg-gray-950/50' : 'border-cyan-200 bg-white'
      }`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/illustrations/rendering-tools-overview.svg"
          alt="Comparison of popular 3D rendering tools including KeyShot, Blender Cycles, Adobe Substance 3D, NVIDIA Omniverse, and V-Ray Corona"
          className="w-full max-w-[750px] aspect-4/3 mx-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
