"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import Header from '@/components/Header';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Ban } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content: `By accessing or using TEELI.NET's services, you agree to be bound by these Terms of Service. 
      If you do not agree to these terms, please do not use our services.`,
    },
    {
      icon: Scale,
      title: '2. Service Description',
      content: `TEELI.NET provides AI-powered 3D rendering, cloud GPU computing, and related services. 
      We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without prior notice.`,
    },
    {
      icon: CheckCircle,
      title: '3. User Accounts',
      content: `You are responsible for maintaining the confidentiality of your account credentials. 
      You must notify us immediately of any unauthorized use of your account. Users must be at least 18 years old to create an account.`,
    },
    {
      icon: Ban,
      title: '4. Prohibited Uses',
      content: `You agree not to: violate any laws, infringe on intellectual property rights, transmit harmful code, 
      attempt to gain unauthorized access, or use the service for illegal or fraudulent purposes.`,
    },
    {
      icon: Shield,
      title: '5. Intellectual Property',
      content: `TEELI.NET retains all rights to our platform, technology, and branding. You retain ownership of content you upload. 
      By using our service, you grant us a license to process and store your content for rendering purposes.`,
    },
    {
      icon: AlertTriangle,
      title: '6. Limitation of Liability',
      content: `To the maximum extent permitted by law, TEELI.NET shall not be liable for any indirect, incidental, 
      special, or consequential damages arising from use of our services.`,
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mb-6">
              <FileText className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-4">
              The legal terms governing your use of TEELI.NET's platform and services
            </p>
            <p className="text-sm text-zinc-400">
              Last updated: December 2024 | Effective as of January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-black/60 via-red-950/20 to-black/60 backdrop-blur-xl p-8"}
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex-shrink-0">
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div
            className="relative rounded-3xl border-2 border-orange-500/30 bg-gradient-to-br from-black/80 via-red-950/30 to-black/80 backdrop-blur-xl p-12"}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-500/10 to-transparent rounded-tr-full"></div>
            
            <div className="relative space-y-6">
              <h2 className="font-heading text-3xl font-bold text-white mb-6">
                Additional Terms
              </h2>
              
              <div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  7. Payment Terms
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  All fees are billed in advance. We offer various subscription tiers and pay-as-you-go options. 
                  Refunds are handled on a case-by-case basis within 30 days of purchase.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  8. Termination
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  We may terminate your account immediately for violations of these terms. You may cancel your 
                  account at any time through your dashboard. Outstanding balances remain due upon termination.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  9. Changes to Terms
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  We reserve the right to modify these terms at any time. Material changes will be communicated 
                  via email. Continued use of the service constitutes acceptance of modified terms.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  10. Governing Law
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  These terms are governed by the laws of California, United States. Any disputes shall be resolved 
                  through binding arbitration or in the state courts of San Francisco County.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full bg-black py-24 px-4 border-y border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Reach out to our legal team for clarification
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              Contact Legal Team
            </Link>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="relative w-full bg-black py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-zinc-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-orange-400 hover:text-orange-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-orange-400 hover:text-orange-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/docs" className="text-orange-400 hover:text-orange-300 transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

