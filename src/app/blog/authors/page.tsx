import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Twitter, Linkedin, Globe, BookOpen, Award } from 'lucide-react';
import Breadcrumb from '@/components/blog/Breadcrumb';

export const metadata: Metadata = {
  title: "Authors - TEELI.NET Blog",
  description: "Meet the expert contributors behind TEELI.NET Blog - industry professionals sharing insights on 3D rendering, AI, and technology.",
  openGraph: {
    title: "Authors - TEELI.NET Blog",
    description: "Meet our expert contributors and authors",
  }
};

// Author profiles (in real app, this would come from database)
const authors = [
  {
    id: "abhijeet-singh",
    name: "Abhijeet Pratap Singh",
    role: "Founder & Lead Editor",
    avatar: "/authors/abhijeet.jpg",
    bio: "3D visualization expert and entrepreneur passionate about architectural rendering and AI-powered design workflows.",
    expertise: ["3D Rendering", "Architecture", "AI"],
    postCount: 45,
    social: {
      twitter: "https://twitter.com/abhijeet",
      linkedin: "https://linkedin.com/in/abhijeet",
      website: "https://teeli.net"
    }
  },
  {
    id: "priya-sharma",
    name: "Dr. Priya Sharma",
    role: "AI Research Lead",
    avatar: "/authors/priya.jpg",
    bio: "PhD in Machine Learning with focus on generative AI and neural rendering techniques.",
    expertise: ["AI & ML", "Neural Networks", "Generative Design"],
    postCount: 28,
    social: {
      twitter: "https://twitter.com/priya",
      linkedin: "https://linkedin.com/in/priya"
    }
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    role: "Cloud Architecture Expert",
    avatar: "/authors/rajesh.jpg",
    bio: "Cloud solutions architect specializing in rendering farms and distributed computing systems.",
    expertise: ["Cloud & DevOps", "Distributed Systems", "Infrastructure"],
    postCount: 18,
    social: {
      linkedin: "https://linkedin.com/in/rajesh"
    }
  },
  {
    id: "ananya-desai",
    name: "Ananya Desai",
    role: "Digital Twin Specialist",
    avatar: "/authors/ananya.jpg",
    bio: "IoT and digital twin expert working on smart city projects and BIM integration.",
    expertise: ["Digital Twins", "IoT", "BIM"],
    postCount: 15,
    social: {
      twitter: "https://twitter.com/ananya",
      linkedin: "https://linkedin.com/in/ananya"
    }
  },
  {
    id: "vikram-patel",
    name: "Vikram Patel",
    role: "Metaverse Developer",
    avatar: "/authors/vikram.jpg",
    bio: "Full-stack developer building immersive 3D web experiences and virtual worlds.",
    expertise: ["Metaverse", "Web3", "3D Web"],
    postCount: 14,
    social: {
      twitter: "https://twitter.com/vikram",
      website: "https://vikram.dev"
    }
  },
  {
    id: "neha-gupta",
    name: "Dr. Neha Gupta",
    role: "Quantum Computing Researcher",
    avatar: "/authors/neha.jpg",
    bio: "Quantum algorithm researcher exploring computational rendering applications.",
    expertise: ["Quantum Computing", "Algorithms", "Research"],
    postCount: 12,
    social: {
      linkedin: "https://linkedin.com/in/neha"
    }
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Sustainability Advocate",
    avatar: "/authors/arjun.jpg",
    bio: "Green tech consultant focusing on energy-efficient computing and sustainable practices.",
    expertise: ["Sustainability", "Green Tech", "Energy Efficiency"],
    postCount: 9,
    social: {
      twitter: "https://twitter.com/arjun",
      linkedin: "https://linkedin.com/in/arjun"
    }
  },
  {
    id: "kavya-reddy",
    name: "Kavya Reddy",
    role: "Blockchain Engineer",
    avatar: "/authors/kavya.jpg",
    bio: "Blockchain developer working on decentralized storage and smart contract solutions.",
    expertise: ["Blockchain", "Smart Contracts", "Web3"],
    postCount: 7,
    social: {
      twitter: "https://twitter.com/kavya",
      website: "https://kavya.tech"
    }
  },
];

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-12">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Authors', current: true }
            ]}
          />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Authors
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the expert contributors who bring you cutting-edge insights and practical knowledge.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{authors.length}</div>
            <div className="text-sm text-gray-400">Expert Authors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {authors.reduce((sum, author) => sum + author.postCount, 0)}+
            </div>
            <div className="text-sm text-gray-400">Articles Published</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">8</div>
            <div className="text-sm text-gray-400">Technical Domains</div>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/20 hover:bg-black/60 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>

                {/* Name & Role */}
                <h2 className="font-heading text-xl font-bold text-white mb-1">
                  {author.name}
                </h2>
                <p className="text-sm text-cyan-400 mb-3">{author.role}</p>

                {/* Bio */}
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  {author.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {author.expertise.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-xs text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                  {author.expertise.length > 2 && (
                    <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-xs text-white/80">
                      +{author.expertise.length - 2} more
                    </span>
                  )}
                </div>

                {/* Post Count */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span>{author.postCount} Articles</span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 border border-white/20 transition-all group/social"
                    >
                      <Twitter className="w-4 h-4 text-white/80 group-hover/social:text-cyan-400" />
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 hover:border-blue-400/50 border border-white/20 transition-all group/social"
                    >
                      <Linkedin className="w-4 h-4 text-white/80 group-hover/social:text-blue-400" />
                    </a>
                  )}
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-purple-500/20 hover:border-purple-400/50 border border-white/20 transition-all group/social"
                    >
                      <Globe className="w-4 h-4 text-white/80 group-hover/social:text-purple-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm">
          <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-white mb-3">
            Want to Contribute?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for expert voices to share knowledge with our community.
            If you have expertise in 3D, AI, or emerging tech, we&apos;d love to hear from you.
          </p>
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
            Become a Contributor
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/10">
          <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Blog
          </Link>
          <Link href="/blog/topics" className="text-gray-400 hover:text-white transition-colors">
            Browse Topics
          </Link>
          <Link href="/blog/about" className="text-gray-400 hover:text-white transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
