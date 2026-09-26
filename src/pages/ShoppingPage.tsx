import React, { useState } from 'react';
import {
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Tag,
  Search,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { shoppingProvider } from '../providers/ShoppingProvider';

export const ShoppingPage: React.FC = () => {
  const stores = shoppingProvider.getStores();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.popularCategories.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <SEOHead
        title="Indian Shopping Hub — Official Stores &amp; Marketplace Directory"
        description="Direct verified access to India's top shopping portals: Amazon India, Flipkart, Myntra, Meesho, Croma, Reliance Digital, Ajio, and Tata CLiQ with authentic store links."
        canonicalPath="/shopping"
        breadcrumbs={[
          { label: 'Shopping', url: '/shopping' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Shopping Hub', url: '/shopping' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Authorized E-Commerce Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Indian Shopping &amp; Store Directory
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Verified direct links to India's premier online merchants, electronic stores, fashion retail, and direct-from-manufacturer hubs.
          </p>
        </div>

        {/* Price Transparency Policy */}
        <div className="p-4 mb-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">Price Accuracy &amp; Anti-Scraping Policy:</p>
            <p className="mt-0.5">
              Live product pricing and discount vouchers are dynamically synchronized only via certified affiliate product feeds and authorized APIs. Blue Cross never fabricates prices.
            </p>
          </div>
        </div>

        {/* Filter Input */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search store name or category (e.g., Laptops, Sarees)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`rounded-3xl border ${store.color} bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:shadow-md transition shadow-sm`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-black text-lg text-slate-900 dark:text-white">
                    {store.name}
                  </h2>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    Official
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {store.tagline}
                </p>

                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Popular Categories:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {store.popularCategories.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={store.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Visit {store.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
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
