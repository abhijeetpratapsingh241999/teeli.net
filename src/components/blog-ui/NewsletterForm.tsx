"use client";

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface NewsletterFormProps {
  title?: string;
  description?: string;
  compact?: boolean;
}

/**
 * NewsletterForm Component
 * 
 * Subscription form for blog newsletter.
 * Uses localStorage to track subscription status.
 */
export default function NewsletterForm({
  title = "Subscribe to our newsletter",
  description = "Get the latest posts delivered right to your inbox.",
  compact = false
}: NewsletterFormProps) {
  const { theme } = useBlogTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Store email in localStorage for demo
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage('You are already subscribed!');
        return;
      }

      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (compact) {
    return (
      <div className={`rounded-lg p-4 ${
        theme === 'dark'
          ? 'bg-gray-800/50 border border-gray-700'
          : 'bg-gray-50 border border-gray-200'
      }`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            disabled={status === 'loading' || status === 'success'}
            className={`flex-1 px-3 py-2 rounded-md text-sm ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              status === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        {message && (
          <p className={`text-xs mt-2 ${
            status === 'error' ? 'text-red-500' : 'text-green-500'
          }`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-8 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30'
        : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          theme === 'dark'
            ? 'bg-blue-500/20'
            : 'bg-blue-100'
        }`}>
          <Mail className={`w-6 h-6 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading' || status === 'success'}
                className={`flex-1 px-4 py-3 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  status === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Subscribed!
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                status === 'error'
                  ? theme === 'dark'
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                    : 'bg-red-50 border border-red-200 text-red-600'
                  : theme === 'dark'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-green-50 border border-green-200 text-green-600'
              }`}>
                {status === 'error' ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Check className="w-4 h-4 flex-shrink-0" />
                )}
                <p className="text-sm">{message}</p>
              </div>
            )}
          </form>

          <p className={`text-xs mt-3 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
