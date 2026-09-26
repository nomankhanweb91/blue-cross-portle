import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Wrench, Landmark, Menu as MenuIcon, X, Sparkles, Trophy, CloudSun, Shield } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'India', path: '/india', icon: Landmark },
    { label: 'Tools', path: '/calculators', icon: Wrench },
  ];

  return (
    <>
      {/* Fixed bottom mobile navigation bar */}
      <nav aria-label="Mobile Navigation" className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="grid grid-cols-5 h-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.path === '/' ? location.pathname === '/' : location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.label}
                to={tab.path}
                className={`flex flex-col items-center justify-center text-[10px] font-medium transition ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span>{tab.label}</span>
              </Link>
            );
          })}

          {/* Quick Menu Sheet trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <MenuIcon className="w-5 h-5 mb-0.5" />
            <span>Hub</span>
          </button>
        </div>
      </nav>

      {/* Drawer */}
      {drawerOpen && (
        <div className="xl:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-3xl p-6 border-t border-slate-200 dark:border-slate-800 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <span className="font-bold text-slate-900 dark:text-white text-base">Blue Cross Navigation Hub</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <Link to="/ai" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span>AI Directory</span>
              </Link>
              <Link to="/ai-tools" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>AI Tools Suite</span>
              </Link>
              <Link to="/developer-tools" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Wrench className="w-4 h-4 text-blue-500" />
                <span>Developer Tools</span>
              </Link>
              <Link to="/pdf-tools" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Wrench className="w-4 h-4 text-emerald-500" />
                <span>PDF Tools (Local)</span>
              </Link>
              <Link to="/image-tools" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Wrench className="w-4 h-4 text-rose-500" />
                <span>Image Tools & QR</span>
              </Link>
              <Link to="/weather" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <CloudSun className="w-4 h-4 text-amber-500" />
                <span>Live Weather & AQI</span>
              </Link>
              <Link to="/cricket" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Cricket Portal</span>
              </Link>
              <Link to="/india/states" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                <Landmark className="w-4 h-4 text-blue-600" />
                <span>28 States & 8 UTs</span>
              </Link>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link to="/privacy" onClick={() => setDrawerOpen(false)} className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" onClick={() => setDrawerOpen(false)} className="hover:underline">Terms of Service</Link>
              <Link to="/disclaimer" onClick={() => setDrawerOpen(false)} className="hover:underline">Disclaimer</Link>
              <Link to="/contact" onClick={() => setDrawerOpen(false)} className="hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
