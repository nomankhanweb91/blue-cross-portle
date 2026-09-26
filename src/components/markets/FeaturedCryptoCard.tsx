import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowUpRight, BarChart2 } from 'lucide-react';
import { CryptoCoin } from '../../types/markets';
import { formatCurrencyINR } from '../../lib/utils';

interface FeaturedCryptoCardProps {
  coin: CryptoCoin;
}

export const FeaturedCryptoCard: React.FC<FeaturedCryptoCardProps> = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const sparklinePrices = coin.sparkline_in_7d?.price?.slice(-20) || [];

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition group flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {coin.image ? (
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full shadow-xs flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                {coin.symbol.slice(0, 2)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {coin.name}
                </h3>
                <span className="text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {coin.symbol}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Rank #{coin.symbol === 'BTC' ? '1' : coin.symbol === 'ETH' ? '2' : 'Top'} Asset
              </div>
            </div>
          </div>

          <Link
            to={`/markets/crypto/${coin.id}`}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-500 hover:text-blue-600 transition"
            aria-label={`View ${coin.name} Detailed Market Chart`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pricing Info */}
        <div className="mt-2 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatCurrencyINR(coin.current_price_inr)}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isPositive ? `+${coin.price_change_percentage_24h}%` : `${coin.price_change_percentage_24h}%`}</span>
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
            ${coin.current_price_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
          </div>
        </div>

        {/* Mini 7D Trend SVG */}
        {sparklinePrices.length > 5 && (
          <div className="h-10 w-full my-3">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path
                d={(() => {
                  const min = Math.min(...sparklinePrices);
                  const max = Math.max(...sparklinePrices);
                  const range = max - min || 1;
                  return sparklinePrices
                    .map((val, idx) => {
                      const x = (idx / (sparklinePrices.length - 1)) * 100;
                      const y = 30 - ((val - min) / range) * 26 - 2;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                })()}
                fill="none"
                stroke={isPositive ? '#10b981' : '#f43f5e'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* 24h High / Low Bar */}
        <div className="space-y-1 my-3 text-[11px] text-slate-500">
          <div className="flex justify-between font-semibold">
            <span>24h Low: {formatCurrencyINR(coin.low_24h_inr)}</span>
            <span>24h High: {formatCurrencyINR(coin.high_24h_inr)}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    10,
                    ((coin.current_price_inr - coin.low_24h_inr) /
                      (coin.high_24h_inr - coin.low_24h_inr || 1)) *
                      100
                  )
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Key Stats */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Market Cap</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {formatCurrencyINR(coin.market_cap_inr)}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">24h Volume</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {formatCurrencyINR(coin.total_volume_inr)}
          </span>
        </div>
      </div>

      {/* Action link */}
      <Link
        to={`/markets/crypto/${coin.id}`}
        className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-center text-xs font-bold text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-1.5"
      >
        <BarChart2 className="w-3.5 h-3.5" />
        <span>View Full Analysis &amp; History &rarr;</span>
      </Link>
    </div>
  );
};
