import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Coins,
  DollarSign,
  Activity,
  Layers,
  BarChart2,
  Info
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { MarketDisclaimer } from '../../components/markets/MarketDisclaimer';
import { MarketSparkline } from '../../components/markets/MarketSparkline';
import { CryptoConverter } from '../../components/markets/CryptoConverter';
import { MarketUnavailableState } from '../../components/markets/MarketUnavailableState';
import { cryptoProvider } from '../../providers/MarketsProvider';
import { formatCurrencyINR } from '../../lib/utils';

interface CoinDetailPageProps {
  fixedCoinId?: string;
}

export const CoinDetailPage: React.FC<CoinDetailPageProps> = ({ fixedCoinId }) => {
  const { coinId: paramCoinId } = useParams<{ coinId: string }>();
  const coinId = (fixedCoinId || paramCoinId || 'bitcoin').toLowerCase();

  const [timeRange, setTimeRange] = useState<'1D' | '7D' | '1M' | '3M' | '1Y'>('7D');

  // Query 1: Coin list / current live stats
  const {
    data: marketData,
    isLoading: isCoinLoading,
    isError: isCoinError,
    refetch: refetchCoin,
    isFetching: isCoinFetching,
  } = useQuery({
    queryKey: ['crypto-market'],
    queryFn: () => cryptoProvider.getCoins(),
    retry: 1,
    staleTime: 60 * 1000,
  });

  // Query 2: Historical time series chart
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    refetch: refetchHistory,
    isFetching: isHistoryFetching,
  } = useQuery({
    queryKey: ['crypto-history', coinId, timeRange],
    queryFn: () => cryptoProvider.getHistory(coinId, timeRange),
    retry: 1,
    staleTime: 3 * 60 * 1000,
  });

  const coins = marketData?.coins || [];
  const coin = coins.find((c) => c.id.toLowerCase() === coinId || c.symbol.toLowerCase() === coinId);

  const isRefreshing = isCoinFetching || isHistoryFetching;
  const isPos = (coin?.price_change_percentage_24h || 0) >= 0;

  const handleRefresh = () => {
    refetchCoin();
    refetchHistory();
  };

  if (isCoinError && !coin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'Markets', url: '/markets' },
            { label: 'Cryptocurrency', url: '/markets/crypto' },
            { label: coinId.toUpperCase() },
          ]}
        />
        <div className="my-6">
          <MarketUnavailableState
            message="Live cryptocurrency price and history data is currently unreachable. Connect API to enable live data."
            onRetry={handleRefresh}
            isRetrying={isRefreshing}
          />
        </div>
      </div>
    );
  }

  const coinName = coin?.name || (coinId === 'bitcoin' ? 'Bitcoin' : coinId === 'ethereum' ? 'Ethereum' : coinId.toUpperCase());
  const coinSymbol = coin?.symbol || (coinId === 'bitcoin' ? 'BTC' : coinId === 'ethereum' ? 'ETH' : coinId.toUpperCase());

  return (
    <>
      <SEOHead
        title={`${coinName} (${coinSymbol}) Live Price, Chart & Market Analysis in INR/USD`}
        description={`Real-time ${coinName} (${coinSymbol}) price in INR and USD, 24h high/low, trading volume, market capitalization, circulating supply, and interactive price history chart.`}
        canonicalPath={`/markets/crypto/${coinId}`}
        breadcrumbs={[
          { label: 'Markets', url: '/markets' },
          { label: 'Cryptocurrency', url: '/markets/crypto' },
          { label: coinName },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          'name': `${coinName} (${coinSymbol}) Market Price`,
          'description': `Live market tracking and historical price series for ${coinName} in Indian Rupee and US Dollar.`,
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
            { label: 'Cryptocurrency', url: '/markets/crypto' },
            { label: coinName },
          ]}
        />

        {/* Back Link */}
        <div className="my-3">
          <Link
            to="/markets/crypto"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Cryptocurrencies</span>
          </Link>
        </div>

        {/* Coin Title & Live Price Header */}
        <div className="my-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {coin?.image ? (
                <img
                  src={coin.image}
                  alt={coinName}
                  className="w-14 h-14 rounded-full shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xl">
                  {coinSymbol.slice(0, 2)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {coinName}
                  </h1>
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {coinSymbol}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Rank #{coinSymbol === 'BTC' ? '1' : coinSymbol === 'ETH' ? '2' : 'Top 10'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Direct aggregator pricing for India (INR) &amp; Global (USD)
                </div>
              </div>
            </div>

            {/* Price display and Refresh button */}
            <div className="flex items-center justify-between md:justify-end gap-6">
              <div>
                <div className="text-xs font-semibold text-slate-400">Current Market Price</div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {coin ? formatCurrencyINR(coin.current_price_inr) : 'Loading...'}
                  </span>
                  {coin && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                        isPos
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isPos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>{isPos ? `+${coin.price_change_percentage_24h}%` : `${coin.price_change_percentage_24h}%`}</span>
                    </span>
                  )}
                </div>
                {coin && (
                  <div className="text-xs font-semibold text-slate-500">
                    ${coin.current_price_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </div>
                )}
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Sync Price & Chart"
              >
                <RefreshCw className={`w-4 h-4 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mb-6">
          <MarketDisclaimer />
        </div>

        {/* Main Content Grid: Chart + Converter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Section (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Interactive Historical Price Series
                </h2>
                <span className="text-xs text-slate-400">
                  Range: 1D, 7D, 1M, 3M, 1Y
                </span>
              </div>

              {historyData && historyData.prices.length > 0 ? (
                <MarketSparkline
                  points={historyData.prices}
                  currentRange={timeRange}
                  onRangeChange={(r) => setTimeRange(r)}
                  isLoading={isHistoryLoading || isHistoryFetching}
                  source={historyData.source}
                  lastUpdated={historyData.lastUpdated}
                />
              ) : isHistoryLoading ? (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-xs text-slate-400">
                  Loading time-series data for {coinName}...
                </div>
              ) : (
                <MarketUnavailableState
                  message={`Historical price chart is currently unreachable for ${coinName}.`}
                  onRetry={handleRefresh}
                  isRetrying={isRefreshing}
                />
              )}
            </div>

            {/* Comprehensive Market Metrics Grid */}
            {coin && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">
                  {coinName} Key Market Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      24h Low
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {formatCurrencyINR(coin.low_24h_inr)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      24h High
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {formatCurrencyINR(coin.high_24h_inr)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Market Capitalization
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {formatCurrencyINR(coin.market_cap_inr)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      24h Trading Volume
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {formatCurrencyINR(coin.total_volume_inr)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Circulating Supply
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {coin.circulating_supply.toLocaleString('en-IN', { maximumFractionDigits: 0 })} {coin.symbol}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Total Supply
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {coin.total_supply
                        ? `${coin.total_supply.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ${coin.symbol}`
                        : 'Unlimited'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Max Supply
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {coin.max_supply
                        ? `${coin.max_supply.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ${coin.symbol}`
                        : 'No Hard Cap'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Last Updated
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                      {coin.last_updated}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Source: {coin.source}</span>
                  <span>Data is refreshed every 60 seconds</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pre-configured Crypto Converter */}
          <div className="space-y-6">
            <CryptoConverter
              coins={coins}
              defaultFrom={coinSymbol}
              defaultTo="INR"
              lastUpdated={coin?.last_updated}
              source={coin?.source}
            />

            {/* Quick links to alternative coins */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                Other Monitored Assets
              </h4>
              <div className="space-y-2">
                {coins
                  .filter((c) => c.id !== coinId && c.symbol.toLowerCase() !== coinSymbol.toLowerCase())
                  .slice(0, 5)
                  .map((otherCoin) => (
                    <Link
                      key={otherCoin.id}
                      to={`/markets/crypto/${otherCoin.id}`}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition text-xs"
                    >
                      <div className="flex items-center gap-2">
                        {otherCoin.image && (
                          <img src={otherCoin.image} alt={otherCoin.name} className="w-5 h-5 rounded-full" />
                        )}
                        <span className="font-bold text-slate-800 dark:text-slate-200">{otherCoin.name}</span>
                        <span className="text-[10px] uppercase text-slate-400">({otherCoin.symbol})</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formatCurrencyINR(otherCoin.current_price_inr)}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
