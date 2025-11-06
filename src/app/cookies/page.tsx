"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import Header from '@/components/Header';
import { Cookie, Settings, Shield, BarChart3, Palette, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Cookie,
      type: 'Essential Cookies',
      color: 'from-cyan-500 to-blue-600',
      necessary: true,
      description: 'Required for basic platform functionality',
      examples: [
        'Authentication and session management',
        'Security and fraud prevention',
        'Load balancing and site performance',
        'Preventing duplicate form submissions'
      ]
    },
    {
      icon: BarChart3,
      type: 'Analytics Cookies',
      color: 'from-purple-500 to-pink-600',
      necessary: false,
      description: 'Help us understand how visitors interact with our site',
      examples: [
        'Page views and navigation patterns',
        'Time spent on platform',
        'User preferences and behavior',
        'Error tracking and debugging'
      ]
    },
    {
      icon: Palette,
      type: 'Preference Cookies',
      color: 'from-green-500 to-emerald-600',
      necessary: false,
      description: 'Remember your settings and preferences',
      examples: [
        'Theme preferences (dark/light mode)',
        'Language settings',
        'Regional settings',
        'Custom dashboard layouts'
      ]
    },
    {
      icon: Settings,
      type: 'Functional Cookies',
      color: 'from-orange-500 to-red-600',
      necessary: false,
      description: 'Enable enhanced features and personalization',
      examples: [
        'Chat widget preferences',
        'Video playback settings',
        'Saved rendering presets',
        'Notification preferences'
      ]
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 mb-6">
              <Cookie className="w-10 h-10 text-yellow-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Learn about how we use cookies to enhance your experience
            </p>
            <p className="text-sm text-zinc-400">
              Last updated: December 2024 | Effective as of January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative w-full bg-gradient-to-b from-black via-yellow-950/20 to-black py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div
            className="prose prose-invert max-w-none text-center"
          >
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience and allow us to analyze how our site is used.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-black/60 via-amber-950/20 to-black/60 backdrop-blur-xl p-8"}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${cookie.color} flex-shrink-0`}>
                    <cookie.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {cookie.type}
                      </h3>
                      {cookie.necessary && (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">
                      {cookie.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {cookie.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div
            className="relative rounded-3xl border-2 border-yellow-500/30 bg-gradient-to-br from-black/80 via-amber-950/30 to-black/80 backdrop-blur-xl p-12"}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-tr-full"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 mb-6">
                <Settings className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-white mb-6">
                Managing Your Cookies
              </h2>
              
              <div className="space-y-6 text-zinc-300">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Browser Settings
                  </h3>
                  <p className="leading-relaxed">
                    Most browsers allow you to manage cookie preferences through their settings menu. 
                    You can choose to block all cookies, accept only first-party cookies, or delete 
                    existing cookies. However, blocking essential cookies may impact platform functionality.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Our Cookie Settings
                  </h3>
                  <p className="leading-relaxed">
                    You can manage your cookie preferences directly in your account settings. 
                    Navigate to Settings → Privacy → Cookie Preferences to customize which 
                    non-essential cookies you'd like to accept.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Opt-Out Links
                  </h3>
                  <p className="leading-relaxed">
                    We respect your privacy choices. If you prefer not to accept certain types of 
                    cookies, you can disable them without affecting your ability to use core platform features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="relative w-full bg-black py-24 px-4 border-y border-white/10">
        <div className="mx-auto max-w-4xl">
          <div
            className="flex items-start gap-4 p-8 rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-black/60 via-amber-950/20 to-black/60"
          >
            <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Third-Party Cookies
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We do not use third-party advertising cookies or tracking cookies on our platform. 
                All cookies are first-party cookies served directly by TEELI.NET to enhance your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="relative w-full bg-black py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-zinc-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

