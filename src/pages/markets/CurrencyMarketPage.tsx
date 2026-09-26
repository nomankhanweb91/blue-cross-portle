import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  DollarSign,
  TrendingUp,
  RefreshCw,
  Clock,
  ShieldCheck,
  Search,
  ArrowRight,
  Globe,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { MarketDisclaimer } from '../../components/markets/MarketDisclaimer';
import { CurrencyConverter } from '../../components/markets/CurrencyConverter';
import { MarketUnavailableState } from '../../components/markets/MarketUnavailableState';
import { fiatProvider } from '../../providers/MarketsProvider';
import { formatCurrencyINR } from '../../lib/utils';

export const CurrencyMarketPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBase, setSelectedBase] = useState<'INR' | 'USD'>('INR');

  const {
    data: fiatData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['fiat-rates'],
    queryFn: () => fiatProvider.getRates(),
    retry: 1,
    staleTime: 60 * 1000,
  });

  const currencies = fiatData?.currencies || [];
  const rates = fiatData?.rates || {};

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Live Forex Rates & Currency Converter — INR, USD, EUR, GBP, AED & SAR"
        description="Check live interbank foreign exchange rates and calculate currency conversions for Indian Rupee (INR) against USD, EUR, GBP, AED, SAR, CAD, AUD, JPY, and CNY."
        canonicalPath="/markets/currency"
        breadcrumbs={[
          { label: 'Markets', url: '/markets' },
          { label: 'Currency & Forex' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          'name': 'Blue Cross Live Currency Converter & Forex Rates',
          'description': 'Real-time currency exchange rates and calculator for Indian Rupee and world currencies.',
          'provider': {
            '@type': 'Organization',
            'name': 'BLUE CROSS — INDIA SUPER PORTAL',
            'url': 'https://blue-cross.org',
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'Markets', url: '/markets' },
            { label: 'Currency Converter & Live Rates' },
          ]}
        />

        {/* Page Header */}
        <div className="my-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <DollarSign className="w-4 h-4" />
                <span>Foreign Exchange (Forex) Matrix</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Live Currency Rates &amp; Converter
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Direct interbank benchmark feeds for the 10 most exchanged currencies in India, South Asia and global commerce.
              </p>
            </div>

            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition shadow-xs disabled:opacity-50 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Refreshing...' : 'Refresh Rates'}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mb-6">
          <MarketDisclaimer />
        </div>

        {isError && !fiatData ? (
          <MarketUnavailableState
            message="Live forex exchange data feed is currently unreachable. Connect a valid API key or verify server network connectivity."
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : (
          <div className="space-y-8">
            {/* Live Interactive Currency Converter */}
            <CurrencyConverter fiatData={fiatData} isLoading={isLoading} />

            {/* Live Exchange Rate Matrix & Directory */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Live Interbank Rates Dashboard
                  </h2>
                  <p className="text-xs text-slate-500">
                    Comparing real-time purchasing power against {selectedBase === 'INR' ? 'Indian Rupee (INR)' : 'US Dollar (USD)'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Base Switcher */}
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                    <button
                      onClick={() => setSelectedBase('INR')}
                      className={`px-3 py-1 rounded-lg transition ${
                        selectedBase === 'INR'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Base: INR (₹)
                    </button>
                    <button
                      onClick={() => setSelectedBase('USD')}
                      className={`px-3 py-1 rounded-lg transition ${
                        selectedBase === 'USD'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Base: USD ($)
                    </button>
                  </div>

                  {/* Search Filter */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search currency..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Responsive Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredCurrencies.map((c) => {
                  const rateToDisplay = selectedBase === 'INR' ? c.rateToINR : c.rateToUSD;
                  const inverseRate = rateToDisplay > 0 ? 1 / rateToDisplay : 0;

                  return (
                    <div
                      key={c.code}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-400 dark:hover:border-blue-500 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{c.flag}</span>
                            <div>
                              <div className="font-extrabold text-slate-900 dark:text-white leading-tight">
                                {c.code}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[100px]">
                                {c.name}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                            {c.symbol}
                          </span>
                        </div>

                        <div className="my-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            1 {c.code} Equals:
                          </span>
                          <div className="text-xl font-black text-slate-900 dark:text-white">
                            {selectedBase === 'INR' ? `₹ ${rateToDisplay.toFixed(2)}` : `$ ${rateToDisplay.toFixed(4)}`}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Inverse:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            1 {selectedBase} = {inverseRate.toFixed(4)} {c.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Data Provider Attribution */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    Source Attribution: {fiatData?.source || 'Open Exchange Rates System (Live Interbank Feed)'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last Sync: {fiatData?.lastUpdated || 'Current'}</span>
                </div>
              </div>
            </div>

            {/* Information Card on Exchange Regimes */}
            <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-6 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-blue-900 dark:text-blue-200">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Forex Information for Indian Residents &amp; NRIs</span>
              </div>
              <p className="leading-relaxed">
                Exchange rates provided above represent mid-market interbank benchmark quotes. Bank transactions, credit card international settlements, wire transfers, and travel cards may include foreign currency conversion markups, GST on forex service charges, and Authorized Dealer margins as regulated by the Reserve Bank of India (RBI) under the Liberalised Remittance Scheme (LRS).
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
