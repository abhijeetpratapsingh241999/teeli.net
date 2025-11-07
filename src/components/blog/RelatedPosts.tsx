'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/blog/blog';
import ImageOptimized from '@/components/ui/ImageOptimized';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface RelatedPostsProps {
  posts: BlogPost[];
  title?: string;
  className?: string;
}

export default function RelatedPosts({ 
  posts, 
  title = 'Related Articles',
  className = '' 
}: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={`mt-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-300">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group glass-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1"
          >
            {/* Image */}
            {post.image && (
              <div className="relative h-48 overflow-hidden">
                <ImageOptimized
                  src={post.image}
                  alt={post.title}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge */}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass-card-light text-cyan-300 border border-cyan-500/30">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
                {post.excerpt}
              </p>

              {/* Read More Link */}
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
