"use client";

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Shield, Eye, Lock, Database, FileText, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const privacySections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information: name, email address, and authentication credentials',
        'Usage data: rendering requests, API calls, and platform interactions',
        'Technical data: IP address, device information, and browser details',
        'Content: 3D models, images, and files you upload to our platform',
        'Communication records: support tickets, feedback, and correspondence'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Data',
      content: [
        'Provide and improve our AI rendering services',
        'Process rendering requests and deliver results',
        'Maintain platform security and prevent fraud',
        'Communicate about your account and service updates',
        'Comply with legal obligations and enforce our terms'
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'End-to-end encryption for all data in transit',
        'AES-256 encryption at rest for stored files',
        'Regular security audits and penetration testing',
        'Access controls and authentication protocols',
        'SOC 2 Type II certified infrastructure'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time',
        'Request deletion of your account and data',
        'Opt out of marketing communications',
        'Export your data in a portable format',
        'Lodge complaints with data protection authorities'
      ]
    },
    {
      icon: Eye,
      title: 'Third-Party Services',
      content: [
        'We use trusted cloud providers (AWS, GCP, Azure)',
        'Payment processing via Stripe (no card data stored)',
        'Analytics through privacy-respecting services',
        'Content delivery networks for fast global access',
        'All vendors comply with GDPR and data protection laws'
      ]
    },
    {
      icon: FileText,
      title: 'Cookie Policy',
      content: [
        'Essential cookies: required for platform functionality',
        'Analytics cookies: help us improve the service',
        'Preference cookies: remember your settings',
        'You can manage preferences in your account settings',
        'First-party cookies only; no ad tracking cookies'
      ]
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-6">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Your privacy is paramount. Here's how we protect and handle your data.
            </p>
            <p className="text-sm text-zinc-400">
              Last updated: December 2024 | Effective as of January 1, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/20 to-black py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none text-center"
          >
            <p className="text-lg text-zinc-300 leading-relaxed">
              At TEELI.NET, we're committed to protecting your privacy and ensuring the security of your data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              use our AI rendering platform and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-black/60 via-purple-950/20 to-black/60 backdrop-blur-xl p-8"
                style={{ boxShadow: '0 10px 30px rgba(147, 51, 234, 0.05)' }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-400">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-black/80 backdrop-blur-xl p-12"
            style={{ boxShadow: '0 20px 60px rgba(147, 51, 234, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full"></div>
            <div className="relative text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Contact our privacy team for any concerns or requests
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                Contact Privacy Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section className="relative w-full bg-black py-16 px-4 border-y border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-zinc-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-purple-400 hover:text-purple-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/docs" className="text-purple-400 hover:text-purple-300 transition-colors">
              Technical Documentation
            </Link>
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

