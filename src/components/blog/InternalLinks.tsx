/**
 * Internal Linking Helper for Blog Posts
 * Implements systematic pillar ↔ cluster ↔ pillar linking strategy
 */

import Link from 'next/link';

export interface RelatedPost {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  isPillar?: boolean;
}

interface InternalLinksProps {
  relatedPosts: RelatedPost[];
  currentSlug: string;
  title?: string;
}

export function InternalLinks({ relatedPosts, currentSlug, title = "Related Articles" }: InternalLinksProps) {
  // Filter out current post
  const filteredPosts = relatedPosts.filter(post => post.slug !== currentSlug).slice(0, 3);

  if (filteredPosts.length === 0) return null;

  return (
    <div className="my-12 md:my-16">
      <div className="relative rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/30 to-black/60 backdrop-blur-xl p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-purple-400">🔗</span>
          {title}
        </h3>

        <div className="grid gap-4">
          {filteredPosts.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="group relative rounded-xl border border-cyan-500/20 bg-gradient-to-r from-black/40 to-purple-950/20 p-5 transition-all hover:border-cyan-500/50 hover:shadow-[0_10px_40px_rgba(0,255,255,0.15)]"
            >
              <div className="flex items-start gap-4">
                {/* Pillar/Cluster Indicator */}
                {post.isPillar && (
                  <div className="flex-shrink-0">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                      <span className="text-xs font-semibold text-cyan-300">PILLAR</span>
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  {post.category && (
                    <div className="inline-flex items-center gap-2 text-xs text-purple-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      {post.category}
                    </div>
                  )}
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO-friendly text links */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-zinc-500">
            Continue reading: {filteredPosts.map((post, i) => (
              <span key={i}>
                <Link href={`/blog/${post.slug}`} className="text-cyan-400 hover:underline">
                  {post.title}
                </Link>
                {i < filteredPosts.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to identify pillar posts
export function getPillarPosts(allPosts: RelatedPost[]): RelatedPost[] {
  return allPosts.filter(post => post.isPillar);
}

// Helper function to get related cluster posts for a pillar
export function getClusterPosts(pillarSlug: string, allPosts: RelatedPost[]): RelatedPost[] {
  // Logic: Find posts in same category or with related keywords
  const pillarPost = allPosts.find(p => p.slug === pillarSlug);
  if (!pillarPost) return [];
  
  return allPosts.filter(post => 
    post.slug !== pillarSlug && 
    !post.isPillar && 
    post.category === pillarPost.category
  ).slice(0, 5);
}
