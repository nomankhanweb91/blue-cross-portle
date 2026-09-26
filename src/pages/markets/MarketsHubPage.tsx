import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  TrendingDown,
  Search,
  DollarSign,
  Coins,
  RefreshCw,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  ArrowUpRight,
  BarChart3,
  SlidersHorizontal,
  Globe
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { MarketDisclaimer } from '../../components/markets/MarketDisclaimer';
import { FeaturedCryptoCard } from '../../components/markets/FeaturedCryptoCard';
import { CurrencyConverter } from '../../components/markets/CurrencyConverter';
import { CryptoConverter } from '../../components/markets/CryptoConverter';
import { MarketUnavailableState } from '../../components/markets/MarketUnavailableState';
import { fiatProvider, cryptoProvider } from '../../providers/MarketsProvider';
import { formatCurrencyINR } from '../../lib/utils';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const MarketsHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'currency' | 'crypto' | 'converter'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const isOnline = useOnlineStatus();

  // Queries for live fiat and crypto feeds
  const {
    data: fiatData,
    isLoading: isFiatLoading,
    isError: isFiatError,
    refetch: refetchFiat,
    isFetching: isFiatFetching,
  } = useQuery({
    queryKey: ['fiat-rates'],
    queryFn: () => fiatProvider.getRates(),
    retry: 1,
    staleTime: 60 * 1000,
  });

  const {
    data: cryptoData,
    isLoading: isCryptoLoading,
    isError: isCryptoError,
    refetch: refetchCrypto,
    isFetching: isCryptoFetching,
  } = useQuery({
    queryKey: ['crypto-market'],
    queryFn: () => cryptoProvider.getCoins(),
    retry: 1,
    staleTime: 60 * 1000,
  });

  const handleRefreshAll = () => {
    refetchFiat();
    refetchCrypto();
  };

  const isRefreshing = isFiatFetching || isCryptoFetching;
  const hasProviderError = (isFiatError && !fiatData) && (isCryptoError && !cryptoData);

  // Coins extraction
  const coins = cryptoData?.coins || [];
  const btc = coins.find((c) => c.symbol.toLowerCase() === 'btc' || c.id === 'bitcoin');
  const eth = coins.find((c) => c.symbol.toLowerCase() === 'eth' || c.id === 'ethereum');

  // Filtered lists
  const filteredCoins = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCurrencies = (fiatData?.currencies || []).filter(
    (curr) =>
      curr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Live Currency Rates & Crypto Market Hub — INR, USD, BTC, ETH"
        description="Real-time fiat currency exchange rates (INR, USD, EUR, GBP, AED, SAR) and live cryptocurrency prices for Bitcoin, Ethereum, and major assets with converters."
        canonicalPath="/markets"
        breadcrumbs={[
          { label: 'Markets', url: '/markets' },
          { label: 'Overview' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          'name': 'Blue Cross Live Currency & Crypto Market Hub',
          'description': 'Real-time market tracking for fiat exchange rates and top cryptocurrencies.',
          'provider': {
            '@type': 'Organization',
            'name': 'BLUE CROSS — INDIA SUPER PORTAL',
            'url': 'https://blue-cross.org',
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Markets', url: '/markets' }]} />

        {/* Hero Header */}
        <div className="my-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <BarChart3 className="w-4 h-4" />
                <span>Live Currency &amp; Crypto Market Hub</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Global Markets &amp; Live Rates
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Real-time foreign exchange conversions for the Indian Rupee and verified tracking for premier digital assets.
              </p>
            </div>

            {/* Quick Actions & Sync */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefreshAll}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Sync Market Feed'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Important Financial Disclaimer Notice */}
        <div className="mb-6">
          <MarketDisclaimer />
        </div>

        {/* Offline indicator if browser loses connectivity */}
        {!isOnline && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold flex items-center gap-2">
            <span>You are currently browsing offline. Real-time market streaming is paused until your connection restores.</span>
          </div>
        )}

        {/* When live data is unavailable / not configured */}
        {hasProviderError ? (
          <MarketUnavailableState
            onRetry={handleRefreshAll}
            isRetrying={isRefreshing}
          />
        ) : (
          <>
            {/* Prominent Bitcoin and Ethereum Featured Cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Featured Digital Assets
                </h2>
                <Link
                  to="/markets/crypto"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>All 8 Tracked Cryptos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {btc ? (
                  <FeaturedCryptoCard coin={btc} />
                ) : (
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-400">
                    {isCryptoLoading ? 'Loading Bitcoin live feed...' : 'Bitcoin feed synchronizing...'}
                  </div>
                )}

                {eth ? (
                  <FeaturedCryptoCard coin={eth} />
                ) : (
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-400">
                    {isCryptoLoading ? 'Loading Ethereum live feed...' : 'Ethereum feed synchronizing...'}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 mb-6">
              {/* Tab Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activeTab === 'overview'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Market Overview
                </button>
                <button
                  onClick={() => setActiveTab('currency')}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                    activeTab === 'currency'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Fiat Currencies (10)</span>
                </button>
                <button
                  onClick={() => setActiveTab('crypto')}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                    activeTab === 'crypto'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Cryptocurrency (8)</span>
                </button>
                <button
                  onClick={() => setActiveTab('converter')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activeTab === 'converter'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Converters &amp; Tools
                </button>
              </div>

              {/* Search Filter */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter coin or currency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* TAB CONTENT */}

            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Live Currency Grid Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                        Major Foreign Currencies vs Indian Rupee (INR)
                      </h2>
                    </div>
                    <Link
                      to="/markets/currency"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Full Rates Dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            <th className="py-3 px-4">Currency</th>
                            <th className="py-3 px-4">Symbol</th>
                            <th className="py-3 px-4">Rate in INR (₹)</th>
                            <th className="py-3 px-4">Rate in USD ($)</th>
                            <th className="py-3 px-4 text-right">Convert Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {filteredCurrencies.map((c) => (
                            <tr key={c.code} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition">
                              <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                                <div className="flex items-center gap-2.5">
                                  <span className="text-xl">{c.flag}</span>
                                  <div>
                                    <div className="font-extrabold">{c.code}</div>
                                    <div className="text-[11px] text-slate-400 font-normal">{c.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                                {c.symbol}
                              </td>
                              <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                                ₹ {c.rateToINR.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                                $ {c.rateToUSD.toFixed(4)}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <Link
                                  to={`/markets/currency?from=${c.code}&to=INR`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold"
                                >
                                  <span>Convert</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Cryptocurrency List Table */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                        Top Cryptocurrencies Market Feed
                      </h2>
                    </div>
                    <Link
                      to="/markets/crypto"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>View All Assets</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                          <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Asset</th>
                            <th className="py-3 px-4">Price (INR)</th>
                            <th className="py-3 px-4">Price (USD)</th>
                            <th className="py-3 px-4">24h Change</th>
                            <th className="py-3 px-4">24h High / Low</th>
                            <th className="py-3 px-4">Market Cap</th>
                            <th className="py-3 px-4 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {filteredCoins.map((coin, index) => {
                            const isPos = coin.price_change_percentage_24h >= 0;
                            return (
                              <tr key={coin.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition">
                                <td className="py-3.5 px-4 font-semibold text-slate-400">
                                  {index + 1}
                                </td>
                                <td className="py-3.5 px-4">
                                  <Link
                                    to={`/markets/crypto/${coin.id}`}
                                    className="flex items-center gap-2.5 group"
                                  >
                                    {coin.image && (
                                      <img
                                        src={coin.image}
                                        alt={coin.name}
                                        className="w-7 h-7 rounded-full flex-shrink-0"
                                      />
                                    )}
                                    <div>
                                      <div className="font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                                        {coin.name}
                                      </div>
                                      <div className="text-[10px] uppercase font-bold text-slate-400">
                                        {coin.symbol}
                                      </div>
                                    </div>
                                  </Link>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                                  {formatCurrencyINR(coin.current_price_inr)}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                  ${coin.current_price_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center gap-0.5 font-bold px-2 py-0.5 rounded-full text-xs ${
                                      isPos
                                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                                    }`}
                                  >
                                    {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    <span>{isPos ? `+${coin.price_change_percentage_24h}%` : `${coin.price_change_percentage_24h}%`}</span>
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                                  <div>H: {formatCurrencyINR(coin.high_24h_inr)}</div>
                                  <div>L: {formatCurrencyINR(coin.low_24h_inr)}</div>
                                </td>
                                <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                  {formatCurrencyINR(coin.market_cap_inr)}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <Link
                                    to={`/markets/crypto/${coin.id}`}
                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 transition inline-flex items-center"
                                    aria-label={`View ${coin.name} Details`}
                                  >
                                    <ArrowUpRight className="w-4 h-4" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Side by Side Quick Converters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CurrencyConverter fiatData={fiatData} isLoading={isFiatLoading} />
                  <CryptoConverter coins={coins} lastUpdated={cryptoData?.lastUpdated} />
                </div>
              </div>
            )}

            {/* 2. FIAT CURRENCY TAB */}
            {activeTab === 'currency' && (
              <div className="space-y-6">
                <CurrencyConverter fiatData={fiatData} isLoading={isFiatLoading} />

                {/* Comprehensive Fiat Rate Matrix */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
                    All 10 Supported Reserve Currencies
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Real-time interbank benchmarks compared against Indian Rupee (INR) and US Dollar (USD).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredCurrencies.map((c) => (
                      <div
                        key={c.code}
                        className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-400 transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{c.flag}</span>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">{c.code}</div>
                              <div className="text-[10px] text-slate-400">{c.name}</div>
                            </div>
                          </div>
                          <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                            {c.symbol}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                          <div className="flex justify-between">
                            <span className="text-slate-500">1 {c.code} =</span>
                            <span className="font-bold text-slate-900 dark:text-white">₹ {c.rateToINR.toFixed(2)} INR</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">1 {c.code} =</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">$ {c.rateToUSD.toFixed(4)} USD</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. CRYPTO CURRENCY TAB */}
            {activeTab === 'crypto' && (
              <div className="space-y-6">
                <CryptoConverter coins={coins} lastUpdated={cryptoData?.lastUpdated} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredCoins.map((coin) => (
                    <FeaturedCryptoCard key={coin.id} coin={coin} />
                  ))}
                </div>
              </div>
            )}

            {/* 4. CONVERTERS ONLY TAB */}
            {activeTab === 'converter' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CurrencyConverter fiatData={fiatData} isLoading={isFiatLoading} />
                <CryptoConverter coins={coins} lastUpdated={cryptoData?.lastUpdated} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
