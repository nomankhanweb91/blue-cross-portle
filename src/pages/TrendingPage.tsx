import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Flame,
  Search,
  ExternalLink,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { trendsProvider, TrendItem } from '../providers/TrendsProvider';

export const TrendingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = trendsProvider.getCategories();

  useEffect(() => {
    setLoading(true);
    trendsProvider.getTrends(selectedCategory).then((data) => {
      setTrends(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <>
      <SEOHead
        title="Trending Now in India — Search Trends &amp; Public Topics"
        description="Explore verified trending topics in India across Google Trends, national news, cricket, technology, and government deadlines. Clean provider architecture without low-value pages."
        canonicalPath="/trending"
        breadcrumbs={[
          { label: 'Trends', url: '/trending' },
          { label: selectedCategory },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Trending Engine', url: '/trending' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4" />
            <span>Search &amp; Social Pulse</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Trending Now in India
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Real-time search volume and public discourse trends audited against official releases. We do not mass-generate thin or low-value pages.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 mb-8 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trends List */}
        <div className="space-y-4">
          {trends.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-rose-400 transition shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-slate-300 dark:text-slate-700 w-8">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-bold text-rose-500 uppercase tracking-wider text-[10px]">
                      {item.category}
                    </span>
                    {item.searchVolumeHint && (
                      <>
                        <span>•</span>
                        <span className="text-slate-400">{item.searchVolumeHint}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {item.topic}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                <button
                  onClick={() => navigate(`/search?q=${encodeURIComponent(item.topic)}`)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Blue Cross</span>
                </button>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                  title="Source Portal"
                >
                  <ExternalLink className="w-4 h-4" />
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
