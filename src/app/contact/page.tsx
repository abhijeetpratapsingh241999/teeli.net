"use client";

import { useState } from 'react';
// REMOVED: framer-motion import for performance (-50KB saved)
import Header from '@/components/Header';
import { Mail, MessageSquare, HeadphonesIcon, Send, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Contact form submitted:', formData);
      // TODO: Implement actual form submission
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'For general inquiries and support',
      contact: 'hello@teeli.net',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our team',
      contact: 'Available 24/7',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our technical team',
      contact: '+1 (555) 123-4567',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Visit us at our headquarters',
      contact: 'San Francisco, CA',
      color: 'from-orange-500 to-red-600'
    },
  ];

  const supportHours = {
    title: 'Support Hours',
    description: 'When we\'re available to help',
    times: [
      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM PST' },
      { day: 'Sunday', hours: 'Closed' },
    ]
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div}}}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 mb-6">
              <HeadphonesIcon className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Get in Touch
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              We're here to help. Reach out anytime for support, partnerships, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}}}}}
                className="relative rounded-2xl border-2 border-green-500/20 bg-gradient-to-br from-black/60 via-emerald-950/20 to-black/60 backdrop-blur-xl p-6 text-center"}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${method.color} mb-4`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-3">
                  {method.description}
                </p>
                <p className="text-green-400 font-semibold">
                  {method.contact}
                </p>
              </div>
            ))}
          </div>

          {/* Main Contact Form */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div}}}
                className="relative rounded-3xl border-2 border-green-500/30 bg-gradient-to-br from-black/80 via-emerald-950/30 to-black/80 backdrop-blur-xl p-8 md:p-12"}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-tr-full"></div>
                
                <div className="relative mb-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                    Send us a Message
                  </h2>
                  <p className="text-zinc-400">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-500/30 bg-black/50 backdrop-blur-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-500/30 bg-black/50 backdrop-blur-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-500/30 bg-black/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-green-500/30 bg-black/50 backdrop-blur-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-base shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div}}}
                className="relative rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-black/60 via-emerald-950/20 to-black/60 backdrop-blur-xl p-8 mb-6"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  {supportHours.title}
                </h3>
                <p className="text-zinc-400 mb-4">
                  {supportHours.description}
                </p>
                <ul className="space-y-3">
                  {supportHours.times.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">{item.day}</span>
                      <span className="text-green-400 font-medium">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

