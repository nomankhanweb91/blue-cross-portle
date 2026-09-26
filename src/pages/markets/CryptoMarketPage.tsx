import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  ShieldCheck,
  Search,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  Flame,
  Info
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { MarketDisclaimer } from '../../components/markets/MarketDisclaimer';
import { FeaturedCryptoCard } from '../../components/markets/FeaturedCryptoCard';
import { CryptoConverter } from '../../components/markets/CryptoConverter';
import { MarketUnavailableState } from '../../components/markets/MarketUnavailableState';
import { cryptoProvider } from '../../providers/MarketsProvider';
import { formatCurrencyINR } from '../../lib/utils';

export const CryptoMarketPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change_24h' | 'volume'>('market_cap');

  const {
    data: cryptoData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['crypto-market'],
    queryFn: () => cryptoProvider.getCoins(),
    retry: 1,
    staleTime: 60 * 1000,
  });

  const coins = cryptoData?.coins || [];

  const btc = coins.find((c) => c.symbol.toLowerCase() === 'btc' || c.id === 'bitcoin');
  const eth = coins.find((c) => c.symbol.toLowerCase() === 'eth' || c.id === 'ethereum');

  // Filtering
  const filteredCoins = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (sortBy === 'price') return b.current_price_inr - a.current_price_inr;
    if (sortBy === 'change_24h') return b.price_change_percentage_24h - a.price_change_percentage_24h;
    if (sortBy === 'volume') return b.total_volume_inr - a.total_volume_inr;
    return b.market_cap_inr - a.market_cap_inr;
  });

  return (
    <>
      <SEOHead
        title="Live Cryptocurrency Prices — Bitcoin, Ethereum, Solana & Altcoins in INR/USD"
        description="Track live cryptocurrency prices in Indian Rupee (INR) and US Dollar (USD), 24h change, market capitalization, 24h volume, circulating supply, and historical charts."
        canonicalPath="/markets/crypto"
        breadcrumbs={[
          { label: 'Markets', url: '/markets' },
          { label: 'Cryptocurrency' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          'name': 'Blue Cross Live Crypto Market Tracker',
          'description': 'Real-time cryptocurrency market prices and converter for Bitcoin, Ethereum, and major assets.',
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
            { label: 'Cryptocurrency Market Prices' },
          ]}
        />

        {/* Page Header */}
        <div className="my-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Coins className="w-4 h-4" />
                <span>Live Digital Asset Market</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Cryptocurrency Market Tracking
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Direct aggregated price feeds for Bitcoin, Ethereum, Solana, and major liquid blockchain tokens in INR and USD.
              </p>
            </div>

            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition shadow-xs disabled:opacity-50 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Syncing...' : 'Sync Market Prices'}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mb-6">
          <MarketDisclaimer />
        </div>

        {isError && !cryptoData ? (
          <MarketUnavailableState
            message="Live cryptocurrency market data feed is currently unreachable. Connect API to enable live data."
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : (
          <div className="space-y-8">
            {/* Prominent Bitcoin and Ethereum Cards */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Spotlight Assets (BTC &amp; ETH)
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {btc && <FeaturedCryptoCard coin={btc} />}
                {eth && <FeaturedCryptoCard coin={eth} />}
              </div>
            </div>

            {/* Interactive Crypto Converter */}
            <div>
              <CryptoConverter coins={coins} lastUpdated={cryptoData?.lastUpdated} />
            </div>

            {/* Full Coins Table with Sorting and Search */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Live Crypto Assets Feed
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing top 8 liquid cryptocurrencies with 24-hour range, volume, and circulating supply.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Sort selector */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-400">Sort By:</span>
                    <select
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-xs focus:outline-none"
                    >
                      <option value="market_cap">Market Cap (High to Low)</option>
                      <option value="price">Price (High to Low)</option>
                      <option value="change_24h">24h Gainers/Losers</option>
                      <option value="volume">24h Volume</option>
                    </select>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter coin or symbol..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto -mx-6 px-6">
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
                      <th className="py-3 px-4">24h Volume</th>
                      <th className="py-3 px-4">Circulating Supply</th>
                      <th className="py-3 px-4 text-right">Interactive Chart</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sortedCoins.map((coin, index) => {
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
                          <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white whitespace-nowrap">
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
                          <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {formatCurrencyINR(coin.market_cap_inr)}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            {formatCurrencyINR(coin.total_volume_inr)}
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                            {coin.circulating_supply.toLocaleString('en-IN', { maximumFractionDigits: 0 })} {coin.symbol}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              to={`/markets/crypto/${coin.id}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold"
                            >
                              <span>Chart</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Attribution */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    Provider Attribution: {cryptoData?.source || 'CoinGecko Global Aggregator (Live)'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last Sync: {cryptoData?.lastUpdated || 'Current'}</span>
                </div>
              </div>
            </div>

            {/* Regulatory and Tax Information for Indian Users */}
            <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 p-6 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900 dark:text-amber-200">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Virtual Digital Assets (VDA) Tax Information for India</span>
              </div>
              <p className="leading-relaxed">
                In India, Virtual Digital Assets (including cryptocurrencies) are subject to Section 115BBH of the Income Tax Act: a flat 30% tax (plus applicable surcharge &amp; cess) on gains from the transfer of VDAs, without deduction for any expenditure other than cost of acquisition. Additionally, a 1% Tax Deducted at Source (TDS) under Section 194S applies to transactions exceeding prescribed thresholds. No loss from VDA transfer can be set off against any other income.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
