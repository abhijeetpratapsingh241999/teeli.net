"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const { theme } = useBlogTheme();
  if (posts.length === 0) return null;

  return (
    <div className={`mt-20 pt-12 border-t ${
      theme === 'dark' ? 'border-white/20' : 'border-gray-300'
    }`}>
      <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-8 text-center ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Continue Reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className={`relative rounded-3xl border-2 p-6 md:p-8 backdrop-blur-xl transition-all md:hover:scale-105 overflow-hidden h-full ${
                theme === 'dark'
                  ? 'border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 hover:border-cyan-500/70 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]'
                  : 'border-cyan-500/50 bg-white shadow-lg hover:border-cyan-600 hover:shadow-xl'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="text-cyan-400 text-xs font-semibold mb-3">{post.category}</div>
                  <h3 className={`font-heading text-xl md:text-2xl font-bold mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-6 leading-relaxed line-clamp-3 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  <div className={`flex items-center justify-between text-sm mb-4 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                  }`}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:text-cyan-600 transition-colors">
                    Read more <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


