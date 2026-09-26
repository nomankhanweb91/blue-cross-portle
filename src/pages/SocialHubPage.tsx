import React from 'react';
import {
  Share2,
  ExternalLink,
  ShieldCheck,
  Lock,
  MessageCircle,
  Video,
  Send,
  Camera,
  AtSign
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';

export const SocialHubPage: React.FC = () => {
  const platforms = [
    {
      name: 'X (Twitter)',
      desc: 'Real-time breaking news, public announcements, and official government updates.',
      url: 'https://twitter.com',
      tagline: 'Micro-blogging and live civic discourse',
      badge: 'News & Trends',
    },
    {
      name: 'WhatsApp',
      desc: 'Official citizen helpline channels, state service bots, and peer-to-peer messaging.',
      url: 'https://web.whatsapp.com',
      tagline: 'Private encrypted messaging',
      badge: 'Direct Services',
    },
    {
      name: 'LinkedIn',
      desc: 'Professional career development, government hiring alerts, and business networks.',
      url: 'https://www.linkedin.com',
      tagline: 'Professional and employment network',
      badge: 'Jobs & Careers',
    },
    {
      name: 'YouTube',
      desc: 'Official video tutorials for Aadhaar, ITR filing, and government scheme enrollment.',
      url: 'https://www.youtube.com',
      tagline: 'Informational and educational video hub',
      badge: 'Tutorials',
    },
    {
      name: 'Telegram',
      desc: 'Verified public notification channels for Sarkari exams, admit cards, and job alerts.',
      url: 'https://web.telegram.org',
      tagline: 'Broadcast channels and communities',
      badge: 'Alerts',
    },
    {
      name: 'Instagram',
      desc: 'Visual infographics, official ministry notices, and public awareness campaigns.',
      url: 'https://www.instagram.com',
      tagline: 'Photo and short-form video community',
      badge: 'Media',
    },
    {
      name: 'Reddit',
      desc: 'Community forums, technical support discussions, and citizen experience discussions.',
      url: 'https://www.reddit.com',
      tagline: 'Topic-based community forums (r/india, etc.)',
      badge: 'Community',
    },
    {
      name: 'Facebook',
      desc: 'Community initiatives, verified public department pages, and regional groups.',
      url: 'https://www.facebook.com',
      tagline: 'Social connectivity and public pages',
      badge: 'Connect',
    },
  ];

  return (
    <>
      <SEOHead
        title="Social Hub — Official Platforms &amp; Verified Channels"
        description="Directory of verified social media platforms and public information channels. Direct links with zero password harvesting and maximum privacy."
        canonicalPath="/social"
        breadcrumbs={[
          { label: 'Community', url: '/social' },
          { label: 'Social Hub' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Social Hub', url: '/social' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Share2 className="w-4 h-4" />
            <span>Verified Public Channels</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Social Media &amp; Community Directory
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Quick directory to leading digital communication networks and authorized government outreach channels.
          </p>
        </div>

        {/* Strict Security Policy Notice */}
        <div className="p-4 mb-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
          <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Zero Credential Policy:</p>
            <p className="mt-0.5">
              Blue Cross never requests, intercepts, or stores your social media passwords, tokens, or personal sessions. All links navigate directly to official platforms.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-500 transition shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {p.name}
                  </h3>
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                  {p.tagline}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Open Official {p.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
