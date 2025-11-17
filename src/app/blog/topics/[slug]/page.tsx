import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Box, Brain, Cloud, Atom, Building2, Leaf, Globe, Lock } from 'lucide-react';
import fs from 'fs';
import path from 'path';

// Import theme-aware client component
import TopicPageClient from './TopicPageClient';

const topicConfig: Record<string, {
  title: string;
  description: string;
  icon: any;
  gradient: string;
  keywords: string[];
}> = {
  "3d-rendering": {
    title: "3D Rendering & Visualization",
    description: "Master photorealistic rendering, architectural visualization, and advanced 3D techniques",
    icon: Box,
    gradient: "from-cyan-500 to-blue-600",
    keywords: ["3d rendering", "visualization", "photorealistic", "architectural", "product rendering"],
  },
  "ai-ml": {
    title: "AI & Machine Learning",
    description: "Explore agentic AI, generative design, neural networks, and intelligent automation",
    icon: Brain,
    gradient: "from-purple-500 to-pink-600",
    keywords: ["artificial intelligence", "machine learning", "neural networks", "generative ai"],
  },
  "cloud-devops": {
    title: "Cloud & DevOps",
    description: "Cloud rendering farms, distributed computing, and modern infrastructure automation",
    icon: Cloud,
    gradient: "from-blue-500 to-indigo-600",
    keywords: ["cloud computing", "devops", "distributed systems", "infrastructure"],
  },
  "digital-twins": {
    title: "Digital Twins",
    description: "Real-time simulation, IoT integration, and virtual replicas of physical assets",
    icon: Building2,
    gradient: "from-emerald-500 to-teal-600",
    keywords: ["digital twins", "iot", "simulation", "bim"],
  },
  "metaverse": {
    title: "Metaverse & Web3",
    description: "Virtual worlds, immersive experiences, and the future of 3D web",
    icon: Globe,
    gradient: "from-orange-500 to-red-600",
    keywords: ["metaverse", "web3", "virtual reality", "nft"],
  },
  "quantum": {
    title: "Quantum Computing",
    description: "Quantum algorithms, simulation, and the next frontier of computational power",
    icon: Atom,
    gradient: "from-violet-500 to-purple-600",
    keywords: ["quantum computing", "quantum algorithms", "quantum simulation"],
  },
  "sustainability": {
    title: "Sustainability Tech",
    description: "Green computing, energy-efficient workflows, and sustainable technology practices",
    icon: Leaf,
    gradient: "from-green-500 to-emerald-600",
    keywords: ["sustainability", "green tech", "energy efficiency", "carbon neutral"],
  },
  "blockchain": {
    title: "Blockchain & Smart Contracts",
    description: "Decentralized systems, smart contracts, and distributed ledger technology",
    icon: Lock,
    gradient: "from-yellow-500 to-orange-600",
    keywords: ["blockchain", "smart contracts", "cryptocurrency", "decentralized"],
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  category?: string;
  tags?: string[];
  heroImage?: string;
}

// Recursive function to read all JSON files from topic folder
function readTopicPostsRecursive(dir: string, topicSlug: string): BlogPost[] {
  const posts: BlogPost[] = [];
  
  // For 3d-rendering topic, read from 3d-rendering folder
  // For other topics, use keyword-based filtering
  const targetFolder = path.join(dir, topicSlug);
  const shouldReadFromFolder = fs.existsSync(targetFolder);
  
  if (shouldReadFromFolder) {
    // Direct folder reading (e.g., content/blog/3d-rendering/)
    try {
      const items = fs.readdirSync(targetFolder, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isFile() && item.name.endsWith('.json')) {
          try {
            const fullPath = path.join(targetFolder, item.name);
            const content = fs.readFileSync(fullPath, 'utf8');
            const post = JSON.parse(content);
            
            posts.push({
              slug: item.name.replace('.json', ''),
              title: post.title || '',
              description: post.excerpt || post.metaDescription || '',
              publishDate: post.date || '',
              readTime: post.readTime || '5 min read',
              category: post.category,
              tags: post.tags || [],
              heroImage: post.image || post.thumbnail,
            });
          } catch (error) {
            console.error(`Error parsing ${item.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading folder ${targetFolder}:`, error);
    }
  }
  
  return posts;
}

async function getTopicPosts(topicSlug: string): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  
  try {
    const posts = readTopicPostsRecursive(contentDir, topicSlug);
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = topicConfig[slug];
  
  if (!config) {
    return {
      title: "Topic Not Found",
    };
  }
  
  return {
    title: `${config.title} - TEELI.NET Blog`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: `${config.title} - TEELI.NET Blog`,
      description: config.description,
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(topicConfig).map((slug) => ({
    slug,
  }));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = topicConfig[slug];
  
  if (!config) {
    notFound();
  }
  
  const posts = await getTopicPosts(slug);
  
  // Pass only serializable data to client component
  const clientConfig = {
    title: config.title,
    description: config.description,
    gradient: config.gradient,
    iconName: slug, // Pass slug to identify which icon to use
  };
  
  return <TopicPageClient posts={posts} config={clientConfig} />;
}
