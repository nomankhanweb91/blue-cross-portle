import React, { useState } from 'react';
import { Sparkles, ExternalLink, Filter, Search, Check, Shield } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { AI_DIRECTORY_ITEMS } from '../data/aiDirectoryData';

export const AIDirectoryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'LLM', 'Search', 'Coding', 'Image', 'Video', 'Audio', 'Productivity'];

  const filteredItems = AI_DIRECTORY_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Top AI Directory 2026 — Verified AI Platforms & Models"
        description="Comprehensive curated directory of leading AI platforms: ChatGPT, Gemini, Claude, Perplexity, DeepSeek, Copilot, Midjourney, Runway and ElevenLabs. Verified capabilities & official links."
        canonicalPath="/ai"
        breadcrumbs={[
          { label: 'AI Hub', url: '/ai' },
          { label: 'Directory' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'AI Directory', url: '/ai' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Models &amp; Platforms Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Top Artificial Intelligence Directory
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Curated and audited directory of leading generative models, multimodal reasoning engines, coding assistants, and creative media platforms. All links direct to official sources.
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="p-3.5 mb-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Independence Disclaimer:</strong> Blue Cross is an independent portal. Mention of third-party platforms does not imply official endorsement, sponsorship, or affiliation.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or capability..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:shadow-md hover:border-violet-500 transition group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
                      {item.name}
                    </h2>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Key Capabilities:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {item.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 mb-3">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Pricing:</span> {item.pricing}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">
                    Verified: {item.lastVerified}
                  </span>
                  <a
                    href={item.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
                  >
                    <span>Visit Official</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
