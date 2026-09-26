import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Globe,
  Shield,
  Layers,
  Sparkles,
  Newspaper,
  Trophy,
  ShoppingBag,
  MapPin,
  Wrench,
  Code,
  Landmark,
  Home,
  BarChart3,
  DollarSign,
  Coins
} from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { MegaMenu } from './MegaMenu';

export const GlobalHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [marketsMenuOpen, setMarketsMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  
  const { theme, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();
  const navigate = useNavigate();
  const location = useLocation();
  const marketsDropdownRef = useRef<HTMLDivElement>(null);

  // Close markets dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (marketsDropdownRef.current && !marketsDropdownRef.current.contains(event.target as Node)) {
        setMarketsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'India', href: '/india', icon: Landmark },
    { name: 'AI', href: '/ai', icon: Sparkles },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Cricket', href: '/cricket', icon: Trophy },
    { name: 'Shopping', href: '/shopping', icon: ShoppingBag },
    { name: 'Maps', href: '/maps', icon: MapPin },
    { name: 'Tools', href: '/calculators', icon: Wrench },
    { name: 'Developers', href: '/developer-tools', icon: Code },
  ];

  const marketSubmenu = [
    { name: 'Currency Converter', href: '/markets/currency', description: 'Convert INR, USD, EUR, GBP & more' },
    { name: 'Live Exchange Rates', href: '/markets/currency', description: 'Real-time interbank forex matrix' },
    { name: 'Crypto Market', href: '/markets/crypto', description: 'Bitcoin, Ethereum & top 8 coins' },
    { name: 'Bitcoin (BTC)', href: '/markets/crypto/bitcoin', description: 'BTC live chart, metrics & converter' },
    { name: 'Ethereum (ETH)', href: '/markets/crypto/ethereum', description: 'ETH live chart, metrics & converter' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                {/* Clean geometric blue cross vector */}
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 2h4v7h7v4h-7v7h-4v-7H3V9h7V2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-lg text-slate-900 dark:text-white leading-none">
                  BLUE<span className="text-blue-600 dark:text-blue-400">CROSS</span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  India Super Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar (Google-like simplicity) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative items-center"
          >
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Search web, India, tools..."
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition shadow-inner"
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {/* Markets Main Navigation Item with Dropdown Submenu */}
            <div className="relative" ref={marketsDropdownRef}>
              <div className="flex items-center">
                <Link
                  to="/markets"
                  className={`px-2.5 py-1.5 rounded-l-lg transition flex items-center gap-1 ${
                    location.pathname.startsWith('/markets')
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Markets</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMarketsMenuOpen(!marketsMenuOpen)}
                  aria-expanded={marketsMenuOpen}
                  aria-label="Markets submenu"
                  className={`px-1.5 py-1.5 rounded-r-lg transition border-l border-slate-200/50 dark:border-slate-700/50 ${
                    location.pathname.startsWith('/markets')
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${marketsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Markets Dropdown Submenu */}
              {marketsMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Markets Submenu
                  </div>
                  {marketSubmenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      onClick={() => setMarketsMenuOpen(false)}
                      className="block p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                        {sub.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {sub.description}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 px-2">
                    <Link
                      to="/markets"
                      onClick={() => setMarketsMenuOpen(false)}
                      className="text-center block text-xs font-bold text-blue-600 dark:text-blue-400 py-1 hover:underline"
                    >
                      Go to Market Hub Overview &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mega Menu Toggle */}
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Mega Menu"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          {/* Right Action Icons (Language, Theme, PWA) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Toggle English / हिन्दी"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Light and Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* PWA Install Button */}
            <div className="hidden sm:block">
              <PWAInstallButton compact />
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Open Mobile Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      {/* Mobile Drawer / Sheet */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Search web, India, tools..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </form>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-4">
            {/* Markets Main Link */}
            <Link
              to="/markets"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 hover:border-blue-500 font-bold"
            >
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <span>Markets Hub</span>
            </Link>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-blue-500"
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Markets Quick Links Section for Mobile */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Currency &amp; Crypto Markets
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <Link to="/markets/currency" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Currency Converter</Link>
              <Link to="/markets/currency" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Live Exchange Rates</Link>
              <Link to="/markets/crypto" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Crypto Market</Link>
              <Link to="/markets/crypto/bitcoin" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Bitcoin (BTC)</Link>
              <Link to="/markets/crypto/ethereum" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Ethereum (ETH)</Link>
              <Link to="/markets" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold">All Markets &rarr;</Link>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Citizen Essentials
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <Link to="/india/find-service" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Find Gov Service</Link>
              <Link to="/india/aadhaar" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Aadhaar Services</Link>
              <Link to="/india/pan" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">PAN & e-PAN</Link>
              <Link to="/india/income-tax" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Income Tax (ITR)</Link>
              <Link to="/india/gst" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">GST Registration</Link>
              <Link to="/india/udyam" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Udyam MSME</Link>
              <Link to="/india/schemes" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Gov Schemes</Link>
              <Link to="/india/pincode" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">All India Pincode</Link>
              <Link to="/pdf-tools" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Browser PDF Tools</Link>
              <Link to="/image-tools" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">Image Tools & QR</Link>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <PWAInstallButton />
            <Link
              to="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Privacy & Legal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
