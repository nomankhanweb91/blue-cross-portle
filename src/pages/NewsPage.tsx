import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  ExternalLink,
  Globe,
  Filter,
  CheckCircle2,
  Clock,
  Shield,
  Building
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { newsProvider, NewsUpdateEngine } from '../providers/NewsProvider';
import { NewsArticle } from '../types';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = newsProvider.getCategories();

  useEffect(() => {
    setLoading(true);
    newsProvider.getArticles(selectedCategory, language).then((data) => {
      const deduplicated = NewsUpdateEngine.deduplicate(data);
      setArticles(deduplicated);
      setLoading(false);
    });
  }, [selectedCategory, language]);

  return (
    <>
      <SEOHead
        title="Verified News Hub — India, Business, Tech, AI & Jobs"
        description="Authentic short news briefs with verified official source attribution. Independent reporting summaries across India, Economy, Technology, Sarkari Jobs, and Education."
        canonicalPath="/news"
        breadcrumbs={[
          { label: 'News', url: '/news' },
          { label: selectedCategory },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'News Feed', url: '/news' }]} />

        {/* Header */}
        <div className="my-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4" />
              <span>Verified Source News Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              India &amp; Global News Summaries
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Concise summaries strictly attributed to authorized news releases and ministerial communiqués. Never copied in full.
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start md:self-auto text-xs font-semibold">
            <button
              onClick={() => setLanguage('English')}
              className={`px-3 py-1.5 rounded-xl transition ${
                language === 'English'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('Hindi')}
              className={`px-3 py-1.5 rounded-xl transition ${
                language === 'Hindi'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 mb-8 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-indigo-500 transition shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{item.publishedAt}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium truncate max-w-[220px]">
                  Source: <strong className="text-slate-700 dark:text-slate-300">{item.source}</strong>
                </span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  <span>Original Source</span>
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
