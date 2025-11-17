"use client";

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call (replace with actual newsletter service)
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing! Check your inbox to confirm.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm p-8 md:p-12">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl opacity-50" />
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Stay in the Loop
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Get the latest articles, tutorials, and insights delivered straight to your inbox. 
          No spam, unsubscribe anytime.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-6 py-4 rounded-xl bg-black/60 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: status === 'idle' || status === 'error' ? 1.05 : 1 }}
            whileTap={{ scale: status === 'idle' || status === 'error' ? 0.95 : 1 }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </motion.button>
        </form>

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 flex items-center justify-center gap-2 text-sm ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message}</span>
          </motion.div>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 mt-6">
          We respect your privacy. Your email will never be shared with third parties.
        </p>
      </div>
    </div>
  );
}
