"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement actual authentication
      console.log('Login attempt:', { email, password });
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-12 md:py-16 lg:py-8 xl:py-12 pt-24 md:pt-28 lg:pt-28 xl:pt-32">
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md md:max-w-xl lg:max-w-2xl"
        >
          {/* Login Card */}
          <div className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/80 via-cyan-950/20 to-black/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 shadow-2xl"
            style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1), inset 0 0 30px rgba(0, 255, 255, 0.05)' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative mb-6 md:mb-8 lg:mb-6 text-center lg:text-left"
            >
              <div className="inline-flex lg:flex items-center justify-center w-14 h-14 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-3 lg:mb-0 lg:mr-4 lg:inline-flex">
                <Sparkles className="w-7 h-7 lg:w-6 lg:h-6 text-cyan-400" />
              </div>
              <div className="lg:inline-block">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 lg:mb-2">
                  Welcome Back
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm lg:text-sm xl:text-base">
                  Sign in to continue to TEELI.NET
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-4">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full pl-12 pr-4 py-2.5 md:py-3 lg:py-2.5 rounded-xl border-2 bg-black/50 backdrop-blur-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all text-sm md:text-base lg:text-sm ${
                      errors.email
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-cyan-500/30 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full pl-12 pr-12 py-2.5 md:py-3 lg:py-2.5 rounded-xl border-2 bg-black/50 backdrop-blur-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all text-sm md:text-base lg:text-sm ${
                      errors.password
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-cyan-500/30 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 text-zinc-400 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-cyan-500/30 bg-black/50 text-cyan-500 focus:ring-cyan-500/20" />
                  <span className="group-hover:text-zinc-300 transition-colors">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 md:py-4 lg:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-sm md:text-base lg:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative my-6 md:my-8 lg:my-6 flex items-center"
            >
              <div className="flex-1 border-t border-cyan-500/20"></div>
              <span className="px-3 md:px-4 text-xs md:text-sm text-zinc-500">or continue with</span>
              <div className="flex-1 border-t border-cyan-500/20"></div>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              <button className="py-2.5 md:py-3 px-3 md:px-4 rounded-xl border-2 border-cyan-500/30 bg-black/50 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs md:text-sm">Google</span>
              </button>
              <button className="py-2.5 md:py-3 px-3 md:px-4 rounded-xl border-2 border-cyan-500/30 bg-black/50 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-xs md:text-sm">GitHub</span>
              </button>
              <button className="py-2.5 md:py-3 px-3 md:px-4 rounded-xl border-2 border-cyan-500/30 bg-black/50 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-1.56-.62-2.94-1.16-4.23-2.33C5.24 15.36 4 13.27 4 10.9c0-2.65 1.49-4.82 4.06-6.11.83-.75 2.2-1.06 3.58-.73.98.23 1.88.68 2.73 1.1-.32.9-.48 1.85-.48 2.83 0 .88.16 1.73.46 2.52.23-.33.5-.65.8-.94.98-.94 2.05-.88 3.08-.4 1.09.5 2.08.96 3.24 1.44 1.56.62 2.94 1.16 4.23 2.33 1.84 1.54 3.06 3.53 3.06 5.9 0 2.65-1.49 4.82-4.06 6.11-.83.75-2.2 1.06-3.58.73-.98-.23-1.88-.68-2.73-1.1.32-.9.48-1.85.48-2.83 0-.88-.16-1.73-.46-2.52-.23.33-.5.65-.8.94z"/>
                </svg>
                <span className="text-xs md:text-sm">Apple</span>
              </button>
              <button className="py-2.5 md:py-3 px-3 md:px-4 rounded-xl border-2 border-cyan-500/30 bg-black/50 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                </svg>
                <span className="text-xs md:text-sm">Microsoft</span>
              </button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 md:mt-8 lg:mt-6 text-center text-xs md:text-sm text-zinc-400"
            >
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign up for free
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
}

