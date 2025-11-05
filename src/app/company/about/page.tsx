"use client";

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Rocket, Users, Zap, Target, Award, Globe, TrendingUp, Code2, Linkedin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { AuthorSchema } from '@/components/schema/generateAuthorSchema';

export default function AboutPage() {
  const stats = [
    { value: '10K+', label: 'Projects Rendered', icon: Rocket },
    { value: '500+', label: 'Global Clients', icon: Users },
    { value: '99.9%', label: 'Uptime SLA', icon: Zap },
    { value: '15min', label: 'Avg Rendering Time', icon: Target },
  ];

  const values = [
    {
      icon: Globe,
      title: 'Innovation First',
      description: 'Pushing boundaries in AI rendering and quantum computing to deliver cutting-edge solutions.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Performance Excellence',
      description: 'Delivering real-time rendering at scale with 99.9% uptime across global infrastructure.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code2,
      title: 'Open Source Spirit',
      description: 'Contributing to research and sharing knowledge with the global developer community.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Quality Obsessed',
      description: 'Maintaining the highest standards in photorealistic rendering and client satisfaction.',
      color: 'from-orange-500 to-red-500'
    },
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Chief Technology Officer',
      bio: 'Ex-NVIDIA GPU architect. Led development of Instant-3D Neural Rendering pipeline.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      name: 'Sarah Morgan',
      role: 'Head of AI Research',
      bio: 'Neural radiance fields pioneer. PhD in Computer Vision from Stanford.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Marcus Rivera',
      role: 'Cloud Infrastructure Lead',
      bio: 'Built distributed GPU systems serving 100M+ requests across AWS, GCP, and Azure.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Priya Sharma',
      role: 'Sustainability Director',
      bio: 'Carbon-negative cloud strategies. Former Google Green Tech initiative lead.',
      gradient: 'from-orange-500 to-red-600'
    },
  ];

  return (
    <>
      {/* SEO: Author Schemas for E-E-A-T */}
      <AuthorSchema 
        name="Alex Chen"
        jobTitle="Chief Technology Officer"
        description="Ex-NVIDIA GPU architect specializing in neural rendering and distributed computing systems. Led development of Instant-3D Neural Rendering pipeline at TEELI.NET."
        url="https://teeli.net/team/alex-chen"
        sameAs={[
          'https://www.linkedin.com/in/alexchen-gpu',
          'https://github.com/alexchen-teeli'
        ]}
        worksFor={{
          name: 'TEELI.NET',
          url: 'https://teeli.net'
        }}
      />
      
      <AuthorSchema 
        name="Sarah Morgan"
        jobTitle="Head of AI Research"
        description="Neural radiance fields pioneer with PhD in Computer Vision from Stanford. Leading AI innovation in photorealistic 3D generation at TEELI.NET."
        url="https://teeli.net/team/sarah-morgan"
        sameAs={[
          'https://www.linkedin.com/in/sarahmorgan-ai',
          'https://scholar.google.com/citations?user=sarahmorgan'
        ]}
        worksFor={{
          name: 'TEELI.NET',
          url: 'https://teeli.net'
        }}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              About TEELI.NET
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing 3D visualization through the fusion of <span className="text-cyan-400">neural rendering</span>, 
              <span className="text-purple-400"> cloud computing</span>, and 
              <span className="text-pink-400"> quantum intelligence</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/20 to-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/80 via-cyan-950/20 to-black/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
              style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-6">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  To democratize photorealistic 3D creation by making neural rendering accessible to architects, game developers, 
                  and creators worldwide. We believe that transforming ideas into reality shouldn't require expensive hardware or 
                  weeks of processing time.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/20 to-black/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
              style={{ boxShadow: '0 20px 60px rgba(147, 51, 234, 0.1)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-6">
                  <Globe className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  A world where anyone can create photorealistic 3D content from a smartphone photo in under a minute. 
                  Where digital twins evolve in real-time, and AI understands context, materials, and physics at a 
                  fundamental level. We're building the future of spatial computing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-zinc-400">
              Trusted by creators and enterprises worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 backdrop-blur-xl p-6 text-center group hover:border-cyan-500/60 transition-all"
                style={{ boxShadow: '0 10px 30px rgba(0, 255, 255, 0.05)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all rounded-2xl"></div>
                <div className="relative">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-cyan-400" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-zinc-400">
              What drives us forward every day
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-zinc-900/40 backdrop-blur-sm p-6 md:p-8 group hover:border-white/30 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${value.color} mb-4`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-zinc-400">
              Pioneers in AI rendering and cloud infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border-2 border-cyan-500/20 bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 backdrop-blur-xl p-8 group hover:border-cyan-500/40 transition-all"
                style={{ boxShadow: '0 10px 30px rgba(0, 255, 255, 0.05)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all rounded-2xl"></div>
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${member.gradient} mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  {/* Social Proof Links */}
                  <div className="flex gap-3 mt-auto">
                    <a 
                      href="#" 
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href="#" 
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-all"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href="#" 
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/30 to-black py-32 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-black/80 backdrop-blur-xl p-12 md:p-16"
            style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
            <div className="relative">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your 3D Workflow?
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Join thousands of creators building the future of visualization
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-4 rounded-xl border-2 border-cyan-500/50 bg-black/50 text-white font-semibold text-lg hover:border-cyan-500 transition-all"
                >
                  Explore Our Blog
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

