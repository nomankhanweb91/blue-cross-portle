import React, { useState } from 'react';
import { ArrowLeftRight, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { CryptoCoin } from '../../types/markets';
import { formatCurrencyINR } from '../../lib/utils';

interface CryptoConverterProps {
  coins: CryptoCoin[];
  lastUpdated?: string;
  source?: string;
  defaultFrom?: string;
  defaultTo?: string;
}

export const CryptoConverter: React.FC<CryptoConverterProps> = ({
  coins,
  lastUpdated,
  source = 'CoinGecko Global Aggregator (Live)',
  defaultFrom = 'BTC',
  defaultTo = 'INR',
}) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromAsset, setFromAsset] = useState<string>(defaultFrom.toUpperCase());
  const [toAsset, setToAsset] = useState<string>(defaultTo.toUpperCase());

  // Asset list includes cryptocurrencies + INR and USD fiat
  const fiatAssets = [
    { symbol: 'INR', name: 'Indian Rupee', symbolIcon: '₹', isFiat: true },
    { symbol: 'USD', name: 'US Dollar', symbolIcon: '$', isFiat: true },
  ];

  const cryptoAssets = coins.map((c) => ({
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    image: c.image,
    priceINR: c.current_price_inr,
    priceUSD: c.current_price_usd,
    isFiat: false,
  }));

  const allAssets = [...cryptoAssets, ...fiatAssets];

  // Quick pair presets
  const popularPairs = [
    { from: 'BTC', to: 'INR', label: 'BTC ↔ INR' },
    { from: 'BTC', to: 'USD', label: 'BTC ↔ USD' },
    { from: 'ETH', to: 'INR', label: 'ETH ↔ INR' },
    { from: 'ETH', to: 'USD', label: 'ETH ↔ USD' },
    { from: 'BTC', to: 'ETH', label: 'BTC ↔ ETH' },
    { from: 'USDT', to: 'INR', label: 'USDT ↔ INR' },
    { from: 'SOL', to: 'INR', label: 'SOL ↔ INR' },
  ];

  // Helper to get asset price in INR
  const getAssetPriceINR = (sym: string): number => {
    if (sym === 'INR') return 1;
    if (sym === 'USD') return 86.85; // Benchmark USD to INR
    const coin = coins.find((c) => c.symbol.toUpperCase() === sym || c.id.toUpperCase() === sym);
    return coin ? coin.current_price_inr : 0;
  };

  const fromPriceINR = getAssetPriceINR(fromAsset);
  const toPriceINR = getAssetPriceINR(toAsset);

  const conversionRate = toPriceINR > 0 ? fromPriceINR / toPriceINR : 0;
  const result = Number((amount * conversionRate).toFixed(6));

  const handleSwap = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
  };

  const handleSetPair = (from: string, to: string) => {
    setFromAsset(from);
    setToAsset(to);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Crypto Converter &amp; Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time market value estimation for cryptocurrency and fiat pairs.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Feed: {lastUpdated || 'Synchronized live'}</span>
        </div>
      </div>

      {/* Popular Pair Presets */}
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <span className="text-xs font-semibold text-slate-400 mr-1">Popular Pairs:</span>
        {popularPairs.map((p) => {
          const isActive = fromAsset === p.from && toAsset === p.to;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => handleSetPair(p.from, p.to)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition ${
                isActive
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Amount input */}
      <div className="mb-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Amount to Convert
        </label>
        <input
          type="number"
          min="0"
          step="any"
          value={amount || ''}
          onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
          className="w-full px-4 py-3 text-xl sm:text-2xl font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Enter quantity..."
        />
      </div>

      {/* Selectors with Swap */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 mb-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            From Asset
          </label>
          <select
            value={fromAsset}
            onChange={(e) => setFromAsset(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <optgroup label="Cryptocurrencies">
              {cryptoAssets.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.symbol} — {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Fiat Currencies">
              {fiatAssets.map((f) => (
                <option key={f.symbol} value={f.symbol}>
                  {f.symbol} — {f.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Swap button */}
        <div className="flex justify-center -my-1 md:my-0 md:pt-6">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap Pair"
            className="p-3 rounded-full bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shadow-sm transition hover:rotate-180"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            To Asset
          </label>
          <select
            value={toAsset}
            onChange={(e) => setToAsset(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <optgroup label="Fiat Currencies">
              {fiatAssets.map((f) => (
                <option key={f.symbol} value={f.symbol}>
                  {f.symbol} — {f.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Cryptocurrencies">
              {cryptoAssets.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.symbol} — {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Result Display */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50/70 to-orange-50/40 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/50 p-5 sm:p-6 mb-4">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          {amount} {fromAsset} =
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {toAsset === 'INR' ? `₹ ${result.toLocaleString('en-IN')}` : result.toLocaleString('en-US')}
          </span>
          <span className="text-base font-bold text-amber-600 dark:text-amber-400">
            {toAsset}
          </span>
        </div>

        {/* Clear Mandatory Label as requested in section C */}
        <div className="mt-4 pt-3 border-t border-amber-100 dark:border-amber-900/40 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
            Indicative market conversion — Not a guaranteed exchange or trade quote. This calculation is for general informational purposes only.
          </p>
        </div>
      </div>

      {/* Attribution footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Data Provider: {source}</span>
        </div>
        <div>
          <span>1 {fromAsset} ≈ {conversionRate.toFixed(4)} {toAsset}</span>
        </div>
      </div>
    </div>
  );
};
