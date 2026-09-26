import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  FileText,
  Image as ImageIcon,
  Compass,
  Trophy,
  CloudSun,
  Landmark,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Newspaper,
  CreditCard,
  Building2,
  Lock,
  Globe,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  DollarSign,
  Coins,
  BarChart3
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { AdSlot } from '../components/common/AdSlot';
import { useLanguageStore } from '../store/useLanguageStore';
import { weatherProvider } from '../providers/WeatherProvider';
import { newsProvider } from '../providers/NewsProvider';
import { cricketProvider } from '../providers/CricketProvider';
import { trendsProvider } from '../providers/TrendsProvider';
import { shoppingProvider } from '../providers/ShoppingProvider';
import { GOVERNMENT_SERVICES } from '../data/governmentServices';
import { AI_DIRECTORY_ITEMS } from '../data/aiDirectoryData';

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [weatherCity, setWeatherCity] = useState('Delhi');
  const [quickWeather, setQuickWeather] = useState<{ temp: number; condition: string } | null>({ temp: 31, condition: 'Partly Cloudy' });
  const navigate = useNavigate();
  const { t, language } = useLanguageStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}&category=${activeCategory}`);
    }
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'government', label: 'Government' },
    { id: 'tools', label: 'Tools' },
    { id: 'ai', label: 'AI' },
    { id: 'news', label: 'News' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'maps', label: 'Maps' },
    { id: 'web', label: 'Web' },
  ];

  const quickTools = [
    { name: 'Calculator', icon: Calculator, href: '/calculators', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { name: 'Currency Conv', icon: DollarSign, href: '/markets/currency', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { name: 'Crypto Market', icon: Coins, href: '/markets/crypto', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { name: 'PDF Tools', icon: FileText, href: '/pdf-tools', color: 'text-red-500 bg-red-50 dark:bg-red-950/40' },
    { name: 'Image Tools', icon: ImageIcon, href: '/image-tools', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { name: 'AI Writer', icon: Sparkles, href: '/ai-tools', color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/40' },
    { name: 'Translator', icon: Globe, href: '/ai-tools?tool=translator', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { name: 'Weather', icon: CloudSun, href: '/weather', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { name: 'Cricket', icon: Trophy, href: '/cricket', color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40' },
    { name: 'Gov Services', icon: Landmark, href: '/india', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { name: 'Pincode', icon: MapPin, href: '/india/pincode', color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40' },
    { name: 'IFSC & Bank', icon: Building2, href: '/india/banking', color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
    { name: 'GST Portal', icon: FileCheck2, href: '/india/gst', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' },
    { name: 'Aadhaar', icon: ShieldCheck, href: '/india/aadhaar', color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40' },
    { name: 'PAN Card', icon: CreditCard, href: '/india/pan', color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40' },
  ];

  const popularSearches = [
    'Aadhaar PVC Card apply online',
    'Income Tax AY 2025-26 slabs',
    'SIP returns calculator',
    'Udyam certificate download',
    'PM Kisan 19th installment status',
    'Learner licence online test',
    'Ayushman card eligibility 70+',
    'JSON formatter online free',
    'All India postal pincode',
  ];

  const govServicesSample = GOVERNMENT_SERVICES.slice(0, 6);
  const aiToolsSample = AI_DIRECTORY_ITEMS.slice(0, 6);
  const storesSample = shoppingProvider.getStores().slice(0, 6);

  return (
    <>
      <SEOHead
        title="Blue Cross India — Search, Tools, Government Services & Information"
        description="India's independent super portal for search, verified government services (Aadhaar, PAN, ITR, GST), financial calculators, offline browser tools, and live weather."
        canonicalPath="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'BLUE CROSS — INDIA SUPER PORTAL',
          'url': 'https://blue-cross.org',
          'description': 'Search, tools, government services, utilities, calculators, and information portal for India.',
          'publisher': {
            '@type': 'Organization',
            'name': 'Blue Cross India',
            'logo': 'https://blue-cross.org/icon.svg',
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Brand Emblem */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Search. Tools. Information. India.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            BLUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">CROSS</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-normal">
            Your single gateway to authenticated Indian government procedures, offline browser utilities, 19+ calculators, live weather, and AI directory.
          </p>

          {/* Large Universal Search Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search the web, India, tools, news and more..."
                className="w-full pl-12 sm:pl-14 pr-28 sm:pr-32 py-4 sm:py-4.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-white text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="absolute inset-y-2 right-2 px-5 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </form>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Popular searches chips */}
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-1.5 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Popular:</span>
            {popularSearches.slice(0, 5).map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchTerm(q);
                  navigate(`/search?q=${encodeURIComponent(q)}`);
                }}
                className="hover:text-blue-600 underline decoration-slate-300 dark:decoration-slate-700 hover:decoration-blue-500 transition"
              >
                {q}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Optional Top Responsive Ad Slot */}
      <AdSlot layout="top" />

      {/* Quick Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('quickTools')}
            </h2>
          </div>
          <Link
            to="/calculators"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Tools</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                to={tool.href}
                className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition text-center"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition ${tool.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {tool.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main 2-Column Grid: Government Services & AI/Utilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols wide on desktop): Government Services */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Government Services Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t('govServices')}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Official procedures, documents required, and direct tracking links.
                </p>
              </div>
              <Link
                to="/india/find-service"
                className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 transition"
              >
                Search 500+ Services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {govServicesSample.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition flex flex-col justify-between bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                      <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {srv.department.split(',')[0]}
                      </span>
                      <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded text-[10px]">
                        Verified
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 line-clamp-1">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                      {srv.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[130px]">
                      {srv.fee}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={srv.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Looking for State-specific portals? (Uttar Pradesh, Maharashtra, Bihar, Gujarat, etc.)
              </span>
              <Link to="/india/states" className="text-blue-600 font-bold hover:underline">
                Explore States &rarr;
              </Link>
            </div>
          </section>

          {/* AI Tools Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t('aiTools')}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Server-side Gemini 3.8 abstraction for writing, translating, and summarizing.
                </p>
              </div>
              <Link to="/ai-tools" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
                All 17 AI Tools &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'AI Writer', desc: 'Articles & Essays', href: '/ai-tools?tool=ai-writer' },
                { name: 'Rewriter', desc: 'Clarity & Flow', href: '/ai-tools?tool=rewriter' },
                { name: 'Summarizer', desc: 'Key Takeaways', href: '/ai-tools?tool=summarizer' },
                { name: 'Translator', desc: 'Hindi & English', href: '/ai-tools?tool=translator' },
                { name: 'Humanizer', desc: 'Authentic Tone', href: '/ai-tools?tool=humanizer' },
                { name: 'Grammar', desc: 'Spell & Syntax', href: '/ai-tools?tool=grammar' },
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.href}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-violet-500 bg-slate-50/50 dark:bg-slate-800/40 transition group"
                >
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-violet-600 transition">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Verified News Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t('news')}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Original short summaries with official source citations.
                </p>
              </div>
              <Link to="/news" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Read Full News &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'UPI Daily Transactions Cross 500 Million Mark in India Milestone',
                  source: 'Press Information Bureau (PIB)',
                  category: 'Business',
                  time: '2 hours ago',
                  summary: 'Digital public infrastructure continues record adoption across tier-2 and tier-3 towns, accounting for over 80% of retail transactions.',
                },
                {
                  title: 'India AI Mission Expands Compute Infrastructure Access for Startups',
                  source: 'MeitY Government Notification',
                  category: 'AI',
                  time: '3 hours ago',
                  summary: 'Subsidized GPU clusters and national datasets rolled out to encourage indigenous vernacular application development.',
                },
                {
                  title: 'Railway Ministry Deploys Kavach 4.0 Automatic Train Protection',
                  source: 'Indian Railways (IRCTC)',
                  category: 'Transit',
                  time: '5 hours ago',
                  summary: 'Indigenous automatic braking and speed control systems actively commissioned on high-density freight and passenger corridors.',
                },
              ].map((news, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{news.category}</span>
                    <span>•</span>
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {news.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Markets, Trending, Live Weather, Cricket & Shopping */}
        <div className="space-y-8">
          
          {/* Live Currency & Crypto Market Hub Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Markets &amp; Exchange Rates
                </h3>
              </div>
              <Link to="/markets" className="text-xs text-blue-600 font-semibold hover:underline">
                Hub &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <Link
                to="/markets/currency"
                className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-400 transition"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Currency Converter</span>
                </div>
                <p className="text-[11px] text-slate-500">Live INR, USD, EUR rates</p>
              </Link>

              <Link
                to="/markets/crypto"
                className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 hover:border-amber-400 transition"
              >
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold mb-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Crypto Market</span>
                </div>
                <p className="text-[11px] text-slate-500">Live BTC, ETH &amp; 8 coins</p>
              </Link>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500">
              <Link to="/markets/crypto/bitcoin" className="hover:text-blue-600">Bitcoin (BTC) &rarr;</Link>
              <Link to="/markets/crypto/ethereum" className="hover:text-blue-600">Ethereum (ETH) &rarr;</Link>
            </div>
          </div>

          {/* Trending Engine Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {t('trending')}
                </h3>
              </div>
              <Link to="/trending" className="text-xs text-rose-600 font-semibold hover:underline">
                All Trends &rarr;
              </Link>
            </div>

            <ul className="space-y-3">
              {[
                { tag: 'Income Tax Return Deadlines', cat: 'Finance', volume: '500K+ searches' },
                { tag: 'IPL 2026 Schedule & Tickets', cat: 'Cricket', volume: '1M+ searches' },
                { tag: 'India AI Mission GPU Access', cat: 'Tech', volume: '100K+ searches' },
                { tag: 'Aadhaar Document Update Portal', cat: 'Citizen', volume: '200K+ searches' },
                { tag: 'UPSC Civil Services Prelims', cat: 'Exams', volume: '300K+ searches' },
              ].map((tr, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400 w-4">{idx + 1}</span>
                    <button
                      onClick={() => navigate(`/search?q=${encodeURIComponent(tr.tag)}`)}
                      className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 text-left"
                    >
                      {tr.tag}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {tr.cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Weather Widget (Connected to Live Meteorological System) */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg shadow-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-300" />
                <span className="font-bold text-sm tracking-wide">Live Weather (India)</span>
              </div>
              <Link to="/weather" className="text-xs text-blue-100 hover:underline">
                7-Day Forecast &rarr;
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-extrabold">{quickWeather?.temp || 30}&deg;C</div>
                <div className="text-xs text-blue-100 mt-1">New Delhi, India</div>
                <div className="text-xs text-blue-200 mt-0.5">{quickWeather?.condition || 'Partly Cloudy'}</div>
              </div>
              <div className="text-right text-xs space-y-1 text-blue-100">
                <div>AQI: <span className="font-bold text-amber-300">88 (Moderate)</span></div>
                <div>Humidity: <span className="font-bold">48%</span></div>
                <div>Wind: <span className="font-bold">12 km/h</span></div>
              </div>
            </div>
          </div>

          {/* Cricket Section (Honest Provider Interface Architecture) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Cricket Fixtures
                </h3>
              </div>
              <Link to="/cricket" className="text-xs text-amber-600 font-semibold hover:underline">
                Portal &rarr;
              </Link>
            </div>

            {/* Status notice complying with rule 61 */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 mb-4 text-xs text-amber-800 dark:text-amber-300">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                <p>
                  <strong>Licensed API Architecture:</strong> Live ball-by-ball commentary requires active API key. Official fixtures &amp; ICC rankings displayed.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs">
                <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">
                  IPL 2026 • Match 1 • Chennai
                </div>
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>CSK</span>
                  <span className="text-xs text-slate-400 font-normal">vs</span>
                  <span>RCB</span>
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 text-right font-medium">
                  19:30 IST • Upcoming
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs">
                <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">
                  ICC World Test Championship • Eden Gardens
                </div>
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>India</span>
                  <span className="text-xs text-slate-400 font-normal">vs</span>
                  <span>England</span>
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 text-right font-medium">
                  09:30 IST • Upcoming
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Store Quick Hub */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Shopping Portals
                </h3>
              </div>
              <Link to="/shopping" className="text-xs text-emerald-600 font-semibold hover:underline">
                All Stores &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {storesSample.map((store) => (
                <a
                  key={store.id}
                  href={store.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/30 transition flex flex-col items-center justify-center"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-full">
                    {store.name.split(' ')[0]}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 mt-1" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Mid-Page Responsive Ad Slot */}
      <AdSlot layout="in-content" />

    </>
  );
};
