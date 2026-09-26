import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  ExternalLink,
  History,
  X,
  Sparkles,
  Landmark,
  FileText,
  AlertCircle,
  WifiOff,
  Filter,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { AdSlot } from '../components/common/AdSlot';
import { searchProvider } from '../providers/SearchProvider';
import { SearchResultItem } from '../types';
import { useSearchStore } from '../store/useSearchStore';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as SearchResultItem['category']) || 'web';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  
  const { recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  const categories = [
    { id: 'web', label: 'All Results' },
    { id: 'government', label: 'Government & Sarkari' },
    { id: 'tools', label: 'Calculators & Tools' },
    { id: 'ai', label: 'AI Models & Directory' },
    { id: 'news', label: 'News & Updates' },
    { id: 'shopping', label: 'Shopping Portals' },
    { id: 'maps', label: 'Maps & Centers' },
  ];

  const executeSearch = async (searchTerm: string, category: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    addRecentSearch(searchTerm.trim());

    try {
      let data: SearchResultItem[] = [];
      if (category === 'government') {
        data = await searchProvider.searchGovernment(searchTerm);
      } else if (category === 'news') {
        data = await searchProvider.searchNews(searchTerm);
      } else if (category === 'tools') {
        data = await searchProvider.searchWeb(searchTerm);
        data = data.filter((d) => d.category === 'tools');
      } else if (category === 'ai') {
        data = await searchProvider.searchWeb(searchTerm);
        data = data.filter((d) => d.category === 'ai');
      } else {
        data = await searchProvider.searchWeb(searchTerm);
      }

      setResults(data);
    } catch (e) {
      console.error('Search error:', e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      executeSearch(initialQuery, activeCategory);
    }
  }, [initialQuery, activeCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim(), category: activeCategory });
      executeSearch(query.trim(), activeCategory);
    }
  };

  return (
    <>
      <SEOHead
        title={query ? `Search: ${query}` : 'Universal Search'}
        description="Search India government services, Aadhaar, PAN, ITR, citizen utilities, calculators, and verified information on Blue Cross."
        canonicalPath="/search"
      />

      {/* Search Header Banner */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <form onSubmit={handleSubmit} className="relative mb-4">
            <Search className="w-5 h-5 absolute left-4 top-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search government services, tools, PIN codes, calculators..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-24 top-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchParams({ q: query, category: cat.id });
                }}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Offline State Banner if disconnected */}
        {!isOnline && (
          <div className="p-4 mb-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center gap-3 text-amber-900 dark:text-amber-200 text-xs">
            <WifiOff className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-bold">Offline Search Active</p>
              <p>Searching verified offline portal database and locally installed guides.</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-slate-500">Searching Blue Cross index and verified portals...</p>
          </div>
        )}

        {/* Results List */}
        {!loading && hasSearched && results.length > 0 && (
          <div className="space-y-6">
            <div className="text-xs text-slate-500 font-medium">
              Found {results.length} verified results for "{query}"
            </div>

            {results.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
                    {res.category}
                  </span>
                  {res.isOfficial && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.2 rounded-full text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Official Source
                    </span>
                  )}
                  {res.displayUrl && (
                    <span className="text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
                      {res.displayUrl}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  <a
                    href={res.url}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center justify-between group"
                  >
                    <span>{res.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </a>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {res.snippet}
                </p>

                {res.date && (
                  <div className="mt-3 text-[11px] text-slate-400 font-medium">
                    Verified: {res.date}
                  </div>
                )}
              </div>
            ))}

            <AdSlot layout="in-content" />
          </div>
        )}

        {/* Empty State */}
        {!loading && hasSearched && results.length === 0 && (
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No matching records found for "{query}"
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
              We never invent fake results. Try searching for "Aadhaar", "PAN", "Income Tax", "SIP", "GST", "Udyam", or "Pincode".
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {['Aadhaar', 'PAN', 'Income Tax', 'GST', 'SIP Calculator'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    setSearchParams({ q: s, category: activeCategory });
                    executeSearch(s, activeCategory);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Search "{s}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pre-search view: Recent Searches & Shortcuts */}
        {!hasSearched && (
          <div className="space-y-8">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <History className="w-3.5 h-3.5" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
                  >
                    Clear History
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(term);
                        setSearchParams({ q: term, category: activeCategory });
                        executeSearch(term, activeCategory);
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-blue-500 transition flex items-center justify-between"
                    >
                      <span className="truncate">{term}</span>
                      <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Frequent Government Lookups
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setQuery('Aadhaar PVC Card');
                    executeSearch('Aadhaar PVC Card', 'government');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:border-blue-500 transition"
                >
                  <p className="font-bold text-xs text-slate-900 dark:text-white">Aadhaar PVC Card</p>
                  <p className="text-[11px] text-slate-500">₹50 online order</p>
                </button>
                <button
                  onClick={() => {
                    setQuery('Instant e-PAN');
                    executeSearch('Instant e-PAN', 'government');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:border-blue-500 transition"
                >
                  <p className="font-bold text-xs text-slate-900 dark:text-white">Instant e-PAN</p>
                  <p className="text-[11px] text-slate-500">Zero fee paperless</p>
                </button>
                <button
                  onClick={() => {
                    setQuery('ITR filing slabs');
                    executeSearch('ITR filing slabs', 'government');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:border-blue-500 transition"
                >
                  <p className="font-bold text-xs text-slate-900 dark:text-white">ITR Tax Slabs</p>
                  <p className="text-[11px] text-slate-500">New vs Old regime</p>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );
};
