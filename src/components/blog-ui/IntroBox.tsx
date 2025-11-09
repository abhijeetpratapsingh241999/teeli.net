import { ReactNode } from "react";

export default function IntroBox({ children }: { children: ReactNode }) {
  return (
    <div
      className={`
        intro-box
        rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7
        border transition-all
        bg-white text-neutral-800 border-gray-300 shadow-lg shadow-blue-500/10
        dark:bg-gray-900/60 dark:text-neutral-200 dark:border-cyan-500/30 dark:shadow-cyan-500/10
      `}
    >
      {children}
    </div>
  );
}
