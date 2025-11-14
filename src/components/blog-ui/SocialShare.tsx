"use client";

/**
 * ============================================
 * SocialShare - Expert-Level Reusable Component
 * ============================================
 * 
 * 📋 PURPOSE:
 * Professional social sharing buttons with UTM tracking,
 * native share API support, and analytics integration.
 * 
 * 🎯 FEATURES:
 * - Native Web Share API (mobile-first)
 * - Platform-specific share URLs with optimal parameters
 * - UTM campaign tracking for analytics
 * - Copy-to-clipboard with visual feedback
 * - Accessible keyboard navigation
 * - SEO-optimized share metadata
 * - Analytics event tracking (GA4/GTM)
 * 
 * 🚀 PLATFORMS SUPPORTED:
 * - Twitter/X (optimized for engagement)
 * - LinkedIn (professional context)
 * - WhatsApp (Indian audience priority)
 * - Copy Link (universal fallback)
 * - Native Share (mobile devices)
 * 
 * 💡 USAGE:
 * ```tsx
 * <SocialShare
 *   url="https://teeli.net/blog/slug"
 *   title="Blog Post Title"
 *   description="Excerpt text..."
 * />
 * ```
 * 
 * 🔧 ANALYTICS:
 * Tracks events: share_twitter, share_linkedin, share_whatsapp, copy_link, native_share
 * 
 * ============================================
 */

import { useState, useSyncExternalStore } from 'react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  via?: string; // Twitter handle (without @)
  hashtags?: string[]; // Twitter hashtags
  className?: string;
}

export default function SocialShare({
  url,
  title,
  description = '',
  via = 'teeli_net',
  hashtags = ['3DRendering', 'AIVisualization', 'CloudRendering'],
  className = '',
}: SocialShareProps) {
  const { theme } = useBlogTheme();
  const [copied, setCopied] = useState(false);
  
  // Check if Web Share API is available (hydration-safe)
  const showNativeShare = useSyncExternalStore(
    () => () => {}, // subscribe (no-op since this never changes)
    () => typeof navigator !== 'undefined' && 'share' in navigator, // client snapshot
    () => false // server snapshot
  );

  // Build UTM parameters for tracking
  const buildUtmUrl = (platform: string) => {
    const utmParams = new URLSearchParams({
      utm_source: platform,
      utm_medium: 'social',
      utm_campaign: 'blog_share',
    });
    return `${url}?${utmParams.toString()}`;
  };

  // Track share events (GA4/GTM)
  const trackShare = (platform: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as typeof window & { gtag: (command: string, action: string, params: Record<string, unknown>) => void }).gtag;
      gtag('event', `share_${platform}`, {
        event_category: 'Social Share',
        event_label: title,
        value: url,
      });
    }
  };

  // Twitter/X Share
  const shareTwitter = () => {
    trackShare('twitter');
    const twitterUrl = new URL('https://twitter.com/intent/tweet');
    twitterUrl.searchParams.set('text', title);
    twitterUrl.searchParams.set('url', buildUtmUrl('twitter'));
    if (via) twitterUrl.searchParams.set('via', via);
    if (hashtags.length > 0) twitterUrl.searchParams.set('hashtags', hashtags.join(','));
    
    window.open(twitterUrl.toString(), '_blank', 'width=550,height=420');
  };

  // LinkedIn Share
  const shareLinkedIn = () => {
    trackShare('linkedin');
    const linkedInUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
    linkedInUrl.searchParams.set('url', buildUtmUrl('linkedin'));
    
    window.open(linkedInUrl.toString(), '_blank', 'width=550,height=550');
  };

  // WhatsApp Share
  const shareWhatsApp = () => {
    trackShare('whatsapp');
    const whatsappText = `${title}\n\n${description ? description + '\n\n' : ''}${buildUtmUrl('whatsapp')}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Facebook Share
  const shareFacebook = () => {
    trackShare('facebook');
    const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php');
    facebookUrl.searchParams.set('u', buildUtmUrl('facebook'));
    
    window.open(facebookUrl.toString(), '_blank', 'width=550,height=450');
  };

  // Telegram Share
  const shareTelegram = () => {
    trackShare('telegram');
    const telegramUrl = new URL('https://t.me/share/url');
    telegramUrl.searchParams.set('url', buildUtmUrl('telegram'));
    telegramUrl.searchParams.set('text', title);
    
    window.open(telegramUrl.toString(), '_blank');
  };

  // Reddit Share
  const shareReddit = () => {
    trackShare('reddit');
    const redditUrl = new URL('https://reddit.com/submit');
    redditUrl.searchParams.set('url', buildUtmUrl('reddit'));
    redditUrl.searchParams.set('title', title);
    
    window.open(redditUrl.toString(), '_blank', 'width=850,height=600');
  };

  // Email Share
  const shareEmail = () => {
    trackShare('email');
    const emailSubject = encodeURIComponent(title);
    const emailBody = encodeURIComponent(`${description ? description + '\n\n' : ''}${buildUtmUrl('email')}`);
    const mailtoUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    
    window.location.href = mailtoUrl;
  };

  // Copy Link to Clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildUtmUrl('copy'));
      setCopied(true);
      trackShare('copy');
      
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy link to clipboard');
    }
  };

  // Native Share API (mobile)
  const nativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: description,
        url: buildUtmUrl('native'),
      });
      trackShare('native');
    } catch {
      // User cancelled or share failed
      console.log('Share cancelled');
    }
  };

  // Modern icon-only button style with tooltip - Mobile optimized
  const buttonBaseClass = `
    group relative rounded-full p-2.5
    transition-all duration-200 hover:scale-110 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
    w-11 h-11 flex items-center justify-center
  `;

  const iconClass = "w-5 h-5";

  // Tooltip styling
  const tooltipClass = (darkMode: boolean) => `
    absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap
    opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10
    ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-900 text-white'}
  `;

  const tooltipArrowClass = (darkMode: boolean) => `
    absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent
    ${darkMode ? 'border-t-gray-800' : 'border-t-gray-900'}
  `;

  return (
    <div className={className} role="group" aria-label="Share this article on social media">
      {/* Mobile: 2 rows (4 icons + 5 icons) | Desktop: Flexible wrap */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-2">
        {/* Row 1: First 4 icons on mobile */}
        <div className="flex justify-center gap-2.5 sm:contents">
          {/* Twitter */}
      <button
        onClick={shareTwitter}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 focus:ring-[#1DA1F2]'
            : 'bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 focus:ring-[#1DA1F2]'
          }
        `}
        aria-label="Share on Twitter"
      >
        <span className={tooltipClass(theme === 'dark')}>
          Twitter
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareLinkedIn}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 focus:ring-[#0A66C2]'
            : 'bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 focus:ring-[#0A66C2]'
          }
        `}
        aria-label="Share on LinkedIn"
      >
        <span className={tooltipClass(theme === 'dark')}>
          LinkedIn
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={shareWhatsApp}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 focus:ring-[#25D366]'
            : 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 focus:ring-[#25D366]'
          }
        `}
        aria-label="Share on WhatsApp"
      >
        <span className={tooltipClass(theme === 'dark')}>
          WhatsApp
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={shareFacebook}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 focus:ring-[#1877F2]'
            : 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 focus:ring-[#1877F2]'
          }
        `}
        aria-label="Share on Facebook"
      >
        <span className={tooltipClass(theme === 'dark')}>
          Facebook
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
        </div>

        {/* Row 2: Last 5 icons on mobile */}
        <div className="flex justify-center gap-2.5 sm:contents">
      {/* Telegram */}
      <button
        onClick={shareTelegram}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-[#26A5E4]/10 text-[#26A5E4] hover:bg-[#26A5E4]/20 focus:ring-[#26A5E4]'
            : 'bg-[#26A5E4]/10 text-[#26A5E4] hover:bg-[#26A5E4]/20 focus:ring-[#26A5E4]'
          }
        `}
        aria-label="Share on Telegram"
      >
        <span className={tooltipClass(theme === 'dark')}>
          Telegram
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </button>

      {/* Reddit */}
      <button
        onClick={shareReddit}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500]/20 focus:ring-[#FF4500]'
            : 'bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500]/20 focus:ring-[#FF4500]'
          }
        `}
        aria-label="Share on Reddit"
      >
        <span className={tooltipClass(theme === 'dark')}>
          Reddit
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      </button>

      {/* Email */}
      <button
        onClick={shareEmail}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 focus:ring-purple-500'
            : 'bg-purple-50 text-purple-600 hover:bg-purple-100 focus:ring-purple-500'
          }
        `}
        aria-label="Share via Email"
      >
        <span className={tooltipClass(theme === 'dark')}>
          Email
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className={`
          ${buttonBaseClass}
          ${theme === 'dark'
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
          }
        `}
        aria-label="Copy link to clipboard"
      >
        <span className={tooltipClass(theme === 'dark')}>
          {copied ? "Copied!" : "Copy Link"}
          <span className={tooltipArrowClass(theme === 'dark')} />
        </span>
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          )}
        </svg>
      </button>

      {/* Native Share Button (Mobile Only) */}
      {showNativeShare && (
        <button
          onClick={nativeShare}
          className={`
            ${buttonBaseClass}
            ${theme === 'dark'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 focus:ring-cyan-500'
              : 'bg-cyan-50 text-cyan-600 border border-cyan-200 hover:bg-cyan-100 focus:ring-cyan-500'
            }
          `}
          aria-label="Share via device"
        >
          <span className={tooltipClass(theme === 'dark')}>
            Share
            <span className={tooltipArrowClass(theme === 'dark')} />
          </span>
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      )}
        </div>
      </div>
    </div>
  );
}
