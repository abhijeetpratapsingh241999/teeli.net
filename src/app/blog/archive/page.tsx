import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ChevronRight, FileText } from 'lucide-react';
import Breadcrumb from '@/components/blog/Breadcrumb';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: "Archive - TEELI.NET Blog",
  description: "Browse all TEELI.NET Blog articles organized by date - complete archive of 3D rendering, AI, and technology content.",
  openGraph: {
    title: "Archive - TEELI.NET Blog",
    description: "Browse articles by date",
  }
};

interface BlogPost {
  slug: string;
  title: string;
  publishDate: string;
  category?: string;
}

async function getAllPosts(): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  
  try {
    const files = fs.readdirSync(contentDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const posts: BlogPost[] = [];
    
    for (const file of jsonFiles) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const post = JSON.parse(content);
      
      posts.push({
        slug: file.replace('.json', ''),
        title: post.title || '',
        publishDate: post.publishDate || '',
        category: post.category,
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

function groupPostsByYear(posts: BlogPost[]) {
  const grouped: Record<string, Record<string, BlogPost[]>> = {};
  
  posts.forEach(post => {
    const date = new Date(post.publishDate);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(post);
  });
  
  return grouped;
}

export default async function ArchivePage() {
  const posts = await getAllPosts();
  const groupedPosts = groupPostsByYear(posts);
  const years = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-12">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Archive', current: true }
            ]}
          />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-6">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-semibold">Blog Archive</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Article Archive
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Browse all {posts.length} articles organized by publication date.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">{posts.length}</div>
            <div className="text-sm text-gray-400">Total Articles</div>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">{years.length}</div>
            <div className="text-sm text-gray-400">Years</div>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">
              {Object.values(groupedPosts).reduce((sum, year) => sum + Object.keys(year).length, 0)}
            </div>
            <div className="text-sm text-gray-400">Months</div>
          </div>
          <div className="text-center p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white mb-1">8</div>
            <div className="text-sm text-gray-400">Topics</div>
          </div>
        </div>

        {/* Archive Timeline */}
        <div className="space-y-8">
          {years.map(year => {
            const months = Object.keys(groupedPosts[year]);
            const yearPostCount = Object.values(groupedPosts[year]).reduce((sum, posts) => sum + posts.length, 0);
            
            return (
              <div key={year} className="relative">
                {/* Year Header */}
                <div className="sticky top-24 z-10 mb-6 p-4 rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading text-3xl font-bold text-white">
                      {year}
                    </h2>
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-semibold">
                      {yearPostCount} {yearPostCount === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>
                </div>

                {/* Months */}
                <div className="space-y-6 pl-8 border-l-2 border-white/10">
                  {months.map(month => {
                    const monthPosts = groupedPosts[year][month];
                    
                    return (
                      <div key={`${year}-${month}`} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 border-4 border-black" />
                        
                        {/* Month Header */}
                        <div className="mb-4">
                          <h3 className="font-heading text-xl font-bold text-white mb-1">
                            {month}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {monthPosts.length} {monthPosts.length === 1 ? 'post' : 'posts'}
                          </p>
                        </div>

                        {/* Posts List */}
                        <div className="space-y-3">
                          {monthPosts.map(post => (
                            <Link
                              key={post.slug}
                              href={`/blog/${post.slug}`}
                              className="group flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-black/60 transition-all duration-300"
                            >
                              <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium group-hover:text-cyan-300 transition-colors line-clamp-2">
                                  {post.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                  <span>
                                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </span>
                                  {post.category && (
                                    <>
                                      <span>•</span>
                                      <span className="text-cyan-400/60">{post.category}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-white/10">
          <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Blog
          </Link>
          <Link href="/blog/topics" className="text-gray-400 hover:text-white transition-colors">
            Browse by Topic
          </Link>
          <Link href="/blog/authors" className="text-gray-400 hover:text-white transition-colors">
            Browse by Author
          </Link>
        </div>
      </div>
    </div>
  );
}
