import { Mail, CheckCircle, Sparkles, TrendingUp, Bell } from 'lucide-react';
import NewsletterSignup from '@/components/blog/NewsletterSignup';

export const metadata = {
  title: 'Newsletter - TEELI Blog',
  description: 'Subscribe to TEELI newsletter for weekly insights on 3D rendering, AI, cloud computing, and emerging technologies.',
};

export default function NewsletterPage() {
  const benefits = [
    {
      icon: Sparkles,
      title: "Weekly Insights",
      description: "Get curated articles, tutorials, and industry news every week"
    },
    {
      icon: TrendingUp,
      title: "Expert Analysis",
      description: "Deep dives into emerging technologies and best practices"
    },
    {
      icon: Bell,
      title: "Early Access",
      description: "Be the first to know about new content, tools, and resources"
    },
    {
      icon: CheckCircle,
      title: "No Spam Ever",
      description: "Quality over quantity. Unsubscribe anytime with one click"
    }
  ];

  const topics = [
    "3D Rendering & Visualization",
    "AI & Machine Learning",
    "Cloud Computing & DevOps",
    "Digital Twins & IoT",
    "Metaverse & Web3",
    "Quantum Computing",
    "Sustainability Tech",
    "Blockchain & DLT"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-6">
            <Mail className="w-4 h-4 text-cyan-300" />
            <span className="text-sm font-medium text-white">TEELI Newsletter</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stay Ahead of the Curve
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join 10,000+ tech professionals receiving weekly insights on 3D rendering, AI, cloud computing, and cutting-edge technologies.
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-16">
          <NewsletterSignup />
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Topics Covered */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Topics We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topics.map((topic) => (
              <div
                key={topic}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 text-center"
              >
                <span className="text-sm text-white/80">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text mb-2">
              10,000+
            </div>
            <div className="text-sm text-gray-400">Subscribers</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text mb-2">
              Weekly
            </div>
            <div className="text-sm text-gray-400">Fresh Content</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text mb-2">
              98%
            </div>
            <div className="text-sm text-gray-400">Open Rate</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Your privacy matters. We never share your email. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
