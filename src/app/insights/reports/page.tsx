"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  Search,
  ArrowRight,
  Clock,
  Users,
  Globe,
  DollarSign,
  Activity,
  ChevronRight,
  BookOpen,
  FileBarChart,
  Target,
  Zap,
  CheckCircle2,
  Info,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function IndustryReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredReport, setHoveredReport] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Reports', count: 24 },
    { id: 'rendering', label: 'Rendering', count: 8 },
    { id: 'ai', label: 'AI & ML', count: 6 },
    { id: 'cloud', label: 'Cloud Infrastructure', count: 5 },
    { id: 'sustainability', label: 'Sustainability', count: 5 }
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];

  const reports = [
    {
      id: 1,
      title: "Global 3D Rendering Market Analysis 2024",
      category: 'rendering',
      year: '2024',
      date: '2024-01-15',
      downloads: 12450,
      views: 45230,
      pages: 48,
      summary: "Comprehensive analysis of the global 3D rendering market, including trends, growth projections, and key market players.",
      keyFindings: [
        "Market expected to reach $8.2B by 2026",
        "Cloud rendering adoption up 340%",
        "AI-powered rendering sees 89% efficiency gain"
      ],
      tags: ['Market Analysis', 'Forecasting', 'Industry Trends']
    },
    {
      id: 2,
      title: "AI in Architectural Visualization: Impact Study",
      category: 'ai',
      year: '2024',
      date: '2024-02-10',
      downloads: 8920,
      views: 32100,
      pages: 32,
      summary: "Deep dive into how artificial intelligence is transforming architectural visualization workflows and reducing project timelines.",
      keyFindings: [
        "Time-to-render reduced by 65%",
        "Cost savings averaging 42%",
        "Client satisfaction improved by 38%"
      ],
      tags: ['AI', 'Architecture', 'Productivity']
    },
    {
      id: 3,
      title: "Cloud GPU Infrastructure Report 2024",
      category: 'cloud',
      year: '2024',
      date: '2024-03-05',
      downloads: 15680,
      views: 56780,
      pages: 56,
      summary: "Analysis of cloud GPU infrastructure trends, scalability challenges, and optimization strategies for rendering workloads.",
      keyFindings: [
        "GPU demand up 240% year-over-year",
        "Multi-cloud adoption at 67%",
        "Energy efficiency improved by 51%"
      ],
      tags: ['Cloud', 'Infrastructure', 'Performance']
    },
    {
      id: 4,
      title: "Sustainable Rendering Practices in 2024",
      category: 'sustainability',
      year: '2024',
      date: '2024-03-20',
      downloads: 11200,
      views: 38900,
      pages: 40,
      summary: "Examining sustainable practices in 3D rendering, carbon footprint reduction, and green computing initiatives.",
      keyFindings: [
        "Carbon emissions down 58%",
        "Renewable energy usage at 84%",
        "Cost-per-render reduced by 31%"
      ],
      tags: ['Sustainability', 'Green Tech', 'Carbon Footprint']
    },
    {
      id: 5,
      title: "Real-Time Rendering Technology Trends",
      category: 'rendering',
      year: '2023',
      date: '2023-11-15',
      downloads: 9870,
      views: 34200,
      pages: 44,
      summary: "Exploring the evolution of real-time rendering technologies and their applications across industries.",
      keyFindings: [
        "Real-time adoption up 180%",
        "Quality parity with offline rendering",
        "Interactive workflows preferred by 73%"
      ],
      tags: ['Real-Time', 'Technology', 'Innovation']
    },
    {
      id: 6,
      title: "Machine Learning in Visual Effects Industry",
      category: 'ai',
      year: '2023',
      date: '2023-09-22',
      downloads: 7430,
      views: 28900,
      pages: 36,
      summary: "How machine learning is revolutionizing VFX pipelines, from asset creation to final compositing.",
      keyFindings: [
        "Automation reduces manual work by 52%",
        "Quality consistency improved by 41%",
        "Training costs decreased by 28%"
      ],
      tags: ['ML', 'VFX', 'Automation']
    },
    {
      id: 7,
      title: "Edge Computing for Rendering Workloads",
      category: 'cloud',
      year: '2023',
      date: '2023-08-10',
      downloads: 6540,
      views: 22300,
      pages: 28,
      summary: "Analysis of edge computing solutions for distributed rendering and latency-sensitive applications.",
      keyFindings: [
        "Latency reduced by 67%",
        "Edge nodes increased 3x",
        "Regional coverage expanded to 45 countries"
      ],
      tags: ['Edge Computing', 'Latency', 'Distributed']
    },
    {
      id: 8,
      title: "Green Data Centers: Rendering Impact",
      category: 'sustainability',
      year: '2023',
      date: '2023-06-18',
      downloads: 5670,
      views: 19800,
      pages: 38,
      summary: "Examining the environmental impact of rendering data centers and strategies for carbon-neutral operations.",
      keyFindings: [
        "PUE improved to 1.12",
        "Water usage reduced by 45%",
        "Waste heat recovery at 62%"
      ],
      tags: ['Data Centers', 'Energy Efficiency', 'Environmental']
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || report.year === selectedYear;
    const matchesSearch = searchQuery === '' || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const stats = {
    totalReports: reports.length,
    totalDownloads: reports.reduce((sum, r) => sum + r.downloads, 0),
    totalViews: reports.reduce((sum, r) => sum + r.views, 0),
    avgPages: Math.round(reports.reduce((sum, r) => sum + r.pages, 0) / reports.length)
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Dashboard Header */}
      <section className="relative pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
              <FileBarChart className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Industry Intelligence</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Industry Reports
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-xl text-emerald-200/80 max-w-3xl mx-auto"
          >
            Data-driven insights and comprehensive analysis of the 3D rendering, AI, and cloud infrastructure industries.
          </motion.p>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Total Reports', value: stats.totalReports, icon: FileText, bgClass: 'bg-emerald-500/20', iconClass: 'text-emerald-400' },
              { label: 'Downloads', value: `${(stats.totalDownloads / 1000).toFixed(1)}K`, icon: Download, bgClass: 'bg-teal-500/20', iconClass: 'text-teal-400' },
              { label: 'Total Views', value: `${(stats.totalViews / 1000).toFixed(1)}K`, icon: Eye, bgClass: 'bg-cyan-500/20', iconClass: 'text-cyan-400' },
              { label: 'Avg Pages', value: stats.avgPages, icon: BookOpen, bgClass: 'bg-green-500/20', iconClass: 'text-green-400' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                  className="rounded-2xl border border-emerald-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgClass} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.iconClass}`} />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-emerald-200/70">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-emerald-700/30 bg-slate-900/60 backdrop-blur-sm text-white placeholder-emerald-200/50 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Category & Year Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-emerald-200/70">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg border-2 transition-all font-semibold ${
                  selectedCategory === cat.id
                    ? 'border-emerald-500 bg-emerald-500/20 text-white'
                    : 'border-emerald-700/30 bg-slate-900/30 text-emerald-200/70 hover:border-emerald-600/50'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-emerald-200/70">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">Year:</span>
            </div>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg border-2 transition-all font-semibold ${
                  selectedYear === year
                    ? 'border-teal-500 bg-teal-500/20 text-white'
                    : 'border-emerald-700/30 bg-slate-900/30 text-emerald-200/70 hover:border-emerald-600/50'
                }`}
              >
                {year === 'all' ? 'All Years' : year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedYear}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredReports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredReport(report.id)}
                  onMouseLeave={() => setHoveredReport(null)}
                  className="group relative rounded-2xl border border-emerald-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl overflow-hidden hover:border-emerald-500/50 transition-all"
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase">
                      {report.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Year & Date */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                        <Calendar className="w-4 h-4" />
                        {report.year}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-200/60 text-sm">
                        <Clock className="w-4 h-4" />
                        {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {report.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-emerald-200/70 text-sm mb-4 line-clamp-3">
                      {report.summary}
                    </p>

                    {/* Key Findings Preview */}
                    <div className="mb-4 space-y-2">
                      {report.keyFindings.slice(0, 2).map((finding, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-emerald-200/80 text-xs">{finding}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-emerald-700/30">
                      <div className="flex items-center gap-4 text-xs text-emerald-200/60">
                        <div className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" />
                          {(report.downloads / 1000).toFixed(1)}K
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {(report.views / 1000).toFixed(1)}K
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {report.pages} pages
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Action Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredReports.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-emerald-400/50 mx-auto mb-4" />
              <p className="text-xl text-emerald-200/70">No reports found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-emerald-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-slate-900/40 via-emerald-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <FileBarChart className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Get Custom Industry Reports
              </h2>
              <p className="text-xl text-emerald-200/80 mb-8 max-w-2xl mx-auto">
                Need insights specific to your industry or use case? Our team can create custom reports tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Request Custom Report
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-lg hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
