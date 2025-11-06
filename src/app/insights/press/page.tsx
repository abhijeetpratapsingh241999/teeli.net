"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Newspaper,
  Megaphone,
  Award,
  Users,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  Download,
  Mail,
  Phone,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Globe,
  Link as LinkIcon,
  ChevronRight,
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Video,
  Quote,
  CheckCircle2,
  MapPin,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export default function PressNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickerPosition, setTickerPosition] = useState(0);

  const categories = [
    { id: 'all', label: 'All News', icon: Newspaper, count: 32 },
    { id: 'press-release', label: 'Press Releases', icon: Megaphone, count: 12 },
    { id: 'news', label: 'News Articles', icon: Newspaper, count: 10 },
    { id: 'media', label: 'Media Coverage', icon: Globe, count: 6 },
    { id: 'awards', label: 'Awards', icon: Award, count: 3 },
    { id: 'partnerships', label: 'Partnerships', icon: Building2, count: 1 }
  ];

  const newsItems = [
    {
      id: 1,
      type: 'press-release',
      date: '2024-04-15',
      time: '10:00 AM',
      title: "TEELI.NET Launches Next-Gen AI Rendering Platform",
      excerpt: "Revolutionary cloud-based rendering platform with real-time AI capabilities transforms 3D visualization industry.",
      content: "TEELI.NET today announced the launch of its next-generation AI rendering platform, featuring breakthrough real-time rendering technology that reduces production time by 85% while maintaining photorealistic quality.",
      category: 'press-release',
      tags: ['Product Launch', 'AI', 'Cloud Rendering'],
      featured: true,
      image: '/press/ai-platform.jpg',
      link: '#',
      source: 'Company Press Release',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      type: 'media',
      date: '2024-04-10',
      time: '2:30 PM',
      title: "TechCrunch: How AI is Revolutionizing 3D Rendering",
      excerpt: "TechCrunch features TEELI.NET in deep dive on AI-powered rendering technologies and their impact on creative industries.",
      content: "The feature highlights how TEELI.NET's innovative approach to cloud rendering is enabling studios to scale their production capabilities without massive infrastructure investments.",
      category: 'media',
      tags: ['Media Coverage', 'Technology', 'Industry'],
      featured: false,
      image: '/press/techcrunch.jpg',
      link: 'https://techcrunch.com',
      source: 'TechCrunch',
      location: 'San Francisco, CA',
      external: true
    },
    {
      id: 3,
      type: 'awards',
      date: '2024-04-05',
      time: '6:00 PM',
      title: "Best Cloud Rendering Solution - 2024 Industry Awards",
      excerpt: "TEELI.NET wins prestigious award for innovation in cloud-based rendering infrastructure.",
      content: "The award recognizes TEELI.NET's commitment to sustainability, performance, and innovation in the cloud rendering space.",
      category: 'awards',
      tags: ['Award', 'Recognition', 'Innovation'],
      featured: false,
      image: '/press/award.jpg',
      link: '#',
      source: 'Industry Awards Committee',
      location: 'Las Vegas, NV'
    },
    {
      id: 4,
      type: 'partnerships',
      date: '2024-03-28',
      time: '11:00 AM',
      title: "Strategic Partnership with Major Architecture Firm",
      excerpt: "TEELI.NET partners with leading architecture firm to integrate AI rendering into design workflows.",
      content: "The partnership will bring TEELI.NET's rendering technology directly into architectural design pipelines, enabling real-time visualization during the design process.",
      category: 'partnerships',
      tags: ['Partnership', 'Architecture', 'Integration'],
      featured: false,
      image: '/press/partnership.jpg',
      link: '#',
      source: 'Company Press Release',
      location: 'New York, NY'
    },
    {
      id: 5,
      type: 'news',
      date: '2024-03-20',
      time: '9:00 AM',
      title: "Company Expansion: New Data Centers in Europe and Asia",
      excerpt: "TEELI.NET announces expansion of its global cloud infrastructure with new data centers in key markets.",
      content: "The expansion brings TEELI.NET's rendering services closer to clients worldwide, reducing latency and improving performance for regional users.",
      category: 'news',
      tags: ['Expansion', 'Infrastructure', 'Global'],
      featured: false,
      image: '/press/expansion.jpg',
      link: '#',
      source: 'Company News',
      location: 'Global'
    },
    {
      id: 6,
      type: 'press-release',
      date: '2024-03-15',
      time: '3:00 PM',
      title: "Sustainable Rendering Initiative Reduces Carbon Footprint by 60%",
      excerpt: "TEELI.NET achieves major milestone in green computing with renewable energy-powered rendering farms.",
      content: "Through investments in renewable energy and optimization algorithms, TEELI.NET has reduced its carbon footprint by 60% while doubling rendering capacity.",
      category: 'press-release',
      tags: ['Sustainability', 'Green Tech', 'Environment'],
      featured: false,
      image: '/press/sustainability.jpg',
      link: '#',
      source: 'Company Press Release',
      location: 'Global'
    },
    {
      id: 7,
      type: 'media',
      date: '2024-03-10',
      time: '1:00 PM',
      title: "Forbes: The Future of Creative Workflows in the Cloud",
      excerpt: "Forbes explores how cloud rendering is transforming creative industries, featuring TEELI.NET's technology.",
      content: "The article highlights how TEELI.NET enables smaller studios to compete with larger production houses through accessible cloud rendering technology.",
      category: 'media',
      tags: ['Media Coverage', 'Industry Trends', 'Cloud'],
      featured: false,
      image: '/press/forbes.jpg',
      link: 'https://forbes.com',
      source: 'Forbes',
      location: 'New York, NY',
      external: true
    },
    {
      id: 8,
      type: 'news',
      date: '2024-03-05',
      time: '10:00 AM',
      title: "New Research Publication on Neural Rendering Techniques",
      excerpt: "TEELI.NET research team publishes groundbreaking paper on AI-powered neural rendering in top computer graphics journal.",
      content: "The paper introduces novel techniques for real-time neural rendering that maintain quality while dramatically reducing computational requirements.",
      category: 'news',
      tags: ['Research', 'Neural Rendering', 'AI'],
      featured: false,
      image: '/press/research.jpg',
      link: '#',
      source: 'Research Publication',
      location: 'Academic'
    }
  ];

  const featuredNews = newsItems.find(item => item.featured) || newsItems[0];
  const regularNews = newsItems.filter(item => !item.featured);

  const filteredNews = regularNews.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // News ticker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPosition(prev => (prev - 1) % -300);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const groupedByDate = filteredNews.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof filteredNews>);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-950 via-violet-950 to-slate-950 text-white overflow-hidden">
      <Header />

      {/* News Ticker */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-900/90 via-violet-900/90 to-purple-900/90 backdrop-blur-sm border-b border-purple-700/30">
        <div className="overflow-hidden h-10 flex items-center">
          <div}}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-purple-200 text-sm font-semibold">BREAKING:</span>
                <span className="text-white text-sm">TEELI.NET Launches Next-Gen AI Rendering Platform</span>
                <span className="text-purple-200 text-sm">•</span>
                <span className="text-white text-sm">Wins Best Cloud Rendering Solution Award</span>
                <span className="text-purple-200 text-sm">•</span>
                <span className="text-white text-sm">Partners with Major Architecture Firm</span>
                <span className="text-purple-200 text-sm">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero - Featured News */}
      <section className="relative pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto mb-12">
          <div}}}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <Newspaper className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Press & Media Center</span>
            </div>
          </div>

          <h1}}}
            className="text-center font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400">
              Press & News
            </span>
          </h1>
        </div>

        {/* Featured News Card */}
        <div className="max-w-7xl mx-auto mb-16">
          <div}}}
            className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-black/40 backdrop-blur-xl overflow-hidden group"
          >
            <div className="absolute top-6 left-6 z-10">
              <span className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-sm font-semibold uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Featured
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-64 md:h-auto min-h-[400px] bg-gradient-to-br from-purple-800/30 to-violet-800/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Newspaper className="w-32 h-32 text-purple-400/30" />
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <span className="text-purple-300/50">•</span>
                  <div className="flex items-center gap-2 text-purple-300/70 text-sm">
                    <Clock className="w-4 h-4" />
                    {featuredNews.time}
                  </div>
                  <span className="text-purple-300/50">•</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase">
                    {featuredNews.type.replace('-', ' ')}
                  </span>
                </div>

                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {featuredNews.title}
                </h2>

                <p className="text-purple-200/80 text-lg mb-6 line-clamp-3">
                  {featuredNews.excerpt}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-purple-300/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    {featuredNews.location}
                  </div>
                  <div className="flex items-center gap-2 text-purple-300/70 text-sm">
                    <Quote className="w-4 h-4" />
                    {featuredNews.source}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={featuredNews.link}>
                    <button}}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
                    >
                      Read More
                      {featuredNews.external && <ExternalLink className="w-4 h-4" />}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <button className="px-6 py-3 rounded-xl border-2 border-purple-500/30 bg-purple-500/10 text-purple-400 font-semibold hover:bg-purple-500/20 transition-all flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search news, articles, press releases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-purple-700/30 bg-slate-900/60 backdrop-blur-sm text-white placeholder-purple-200/50 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 transition-all font-semibold ${
                    selectedCategory === cat.id
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-purple-700/30 bg-slate-900/30 text-purple-200/70 hover:border-purple-600/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Feed */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          
            {Object.entries(groupedByDate).map(([date, items], dateIdx) => (
              <div
                key={date}}}}}
                className="mb-12"
              >
                {/* Date Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-purple-700/50" />
                  <h3 className="text-2xl font-bold text-purple-300 px-6 py-2 rounded-full border border-purple-700/30 bg-purple-500/10">
                    {date}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-700/50 to-purple-700/50" />
                </div>

                {/* News Items */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600/50 via-purple-500/30 to-transparent transform md:-translate-x-1/2" />

                  <div className="space-y-8">
                    {items.map((item, idx) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <div
                          key={item.id}}}}
                          className={`relative flex items-start gap-6 ${
                            isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                          }`}
                        >
                          {/* Timeline Dot */}
                          <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full border-4 border-purple-500 bg-purple-900/60 backdrop-blur-sm flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                            {item.type === 'press-release' && <Megaphone className="w-6 h-6 text-purple-400" />}
                            {item.type === 'news' && <Newspaper className="w-6 h-6 text-purple-400" />}
                            {item.type === 'media' && <Globe className="w-6 h-6 text-purple-400" />}
                            {item.type === 'awards' && <Award className="w-6 h-6 text-purple-400" />}
                            {item.type === 'partnerships' && <Building2 className="w-6 h-6 text-purple-400" />}
                          </div>

                          {/* News Card */}
                          <div className={`flex-1 md:w-[calc(50%-2rem)] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                            <div className="rounded-2xl border border-purple-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all group">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase">
                                  {item.type.replace('-', ' ')}
                                </span>
                                <div className="flex items-center gap-2 text-purple-300/60 text-xs">
                                  <Clock className="w-3 h-3" />
                                  {item.time}
                                </div>
                                <div className="flex items-center gap-2 text-purple-300/60 text-xs">
                                  <MapPin className="w-3 h-3" />
                                  {item.location}
                                </div>
                              </div>

                              <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                                {item.title}
                              </h3>

                              <p className="text-purple-200/70 text-sm mb-4 line-clamp-2">
                                {item.excerpt}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 rounded text-xs bg-purple-500/10 border border-purple-500/20 text-purple-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-purple-700/30">
                                <div className="text-purple-300/70 text-xs">
                                  <span className="font-semibold">{item.source}</span>
                                </div>
                                <Link href={item.link}>
                                  <button}}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-sm font-semibold transition-all"
                                  >
                                    {item.external ? 'Read Article' : 'Read More'}
                                    {item.external && <ExternalLink className="w-4 h-4" />}
                                    {!item.external && <ChevronRight className="w-4 h-4" />}
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          

          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
              <p className="text-xl text-purple-200/70">No news found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Press Kit & Media Contact */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Press Kit */}
            <div}}}}
              className="rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/40 via-purple-950/40 to-black/40 backdrop-blur-xl p-8 md:p-12"
            >
              <FileText className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="font-heading text-3xl font-bold mb-4 text-center text-white">Press Kit</h2>
              <p className="text-purple-200/80 mb-8 text-center">
                Download our press kit with logos, images, company information, and media resources.
              </p>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-purple-700/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Company Press Kit (PDF)</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-purple-700/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Brand Assets & Logos</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-purple-700/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Product Videos</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Media Contact */}
            <div}}}}
              className="rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-slate-900/40 via-pink-950/40 to-black/40 backdrop-blur-xl p-8 md:p-12"
            >
              <Mail className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h2 className="font-heading text-3xl font-bold mb-4 text-center text-white">Media Contact</h2>
              <p className="text-pink-200/80 mb-8 text-center">
                For media inquiries, interviews, or press-related questions, please contact our press team.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 px-6 py-4 rounded-xl border-2 border-pink-700/30 bg-pink-500/10">
                  <Mail className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <div>
                    <div className="text-pink-300/70 text-xs mb-1">Email</div>
                    <div className="text-white font-semibold">press@teeli.net</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 rounded-xl border-2 border-pink-700/30 bg-pink-500/10">
                  <Phone className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <div>
                    <div className="text-pink-300/70 text-xs mb-1">Phone</div>
                    <div className="text-white font-semibold">+1 (555) 123-4567</div>
                  </div>
                </div>
                <Link href="/contact">
                  <button}}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    Contact Press Team
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
