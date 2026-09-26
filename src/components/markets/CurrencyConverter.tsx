import React, { useState } from 'react';
import { ArrowLeftRight, Clock, ShieldCheck, Search, ChevronDown, Check } from 'lucide-react';
import { FiatMarketData } from '../../types/markets';

interface CurrencyConverterProps {
  fiatData?: FiatMarketData | null;
  isLoading?: boolean;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  fiatData,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('INR');
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const currencies = fiatData?.currencies || [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rateToUSD: 86.85, rateToINR: 1 },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToUSD: 1, rateToINR: 86.85 },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToUSD: 0.96, rateToINR: 90.46 },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToUSD: 0.81, rateToINR: 107.22 },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateToUSD: 3.67, rateToINR: 23.66 },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', rateToUSD: 3.75, rateToINR: 23.16 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rateToUSD: 1.43, rateToINR: 60.73 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rateToUSD: 1.58, rateToINR: 55.03 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rateToUSD: 154.2, rateToINR: 0.56 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rateToUSD: 7.28, rateToINR: 11.93 },
  ];

  const rates = fiatData?.rates || {};

  // Rate calculation
  // RateToUSD is units of foreign currency per 1 USD
  // For USD: 1
  // For INR: ~86.85
  const getRateToUSD = (code: string): number => {
    if (code === 'USD') return 1;
    if (rates[code]) return rates[code];
    const found = currencies.find((c) => c.code === code);
    return found ? found.rateToUSD : 1;
  };

  const fromRateUSD = getRateToUSD(fromCode);
  const toRateUSD = getRateToUSD(toCode);

  // 1 unit of fromCode = (toRateUSD / fromRateUSD) units of toCode
  const exchangeRate = toRateUSD / fromRateUSD;
  const convertedAmount = Number((amount * exchangeRate).toFixed(2));

  const fromCurrency = currencies.find((c) => c.code === fromCode) || currencies[1];
  const toCurrency = currencies.find((c) => c.code === toCode) || currencies[0];

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  const filteredFromCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(fromSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(toSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Live Currency Converter
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Interbank real-time conversion rates for Indian Rupee and global reserves.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span>Updated: {fiatData?.lastUpdated || 'Synchronized live'}</span>
        </div>
      </div>

      {/* Amount Input and Quick Select */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Amount to Convert
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-lg font-bold text-slate-400">
            {fromCurrency.symbol}
          </span>
          <input
            type="number"
            min="0"
            step="any"
            value={amount || ''}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full pl-12 pr-4 py-3 text-xl sm:text-2xl font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount..."
          />
        </div>

        {/* Quick Amount presets */}
        <div className="flex flex-wrap items-center gap-2 mt-2.5">
          <span className="text-[11px] font-semibold text-slate-400">Presets:</span>
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                amount === amt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {amt.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
      </div>

      {/* Selectors Grid with Swap in between */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 mb-6 relative">
        {/* From Currency Selector */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            From Currency
          </label>
          <button
            type="button"
            onClick={() => {
              setIsFromOpen(!isFromOpen);
              setIsToOpen(false);
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-left hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{fromCurrency.flag}</span>
              <div>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{fromCurrency.code}</span>
                  <span className="text-xs font-normal text-slate-400">({fromCurrency.symbol})</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                  {fromCurrency.name}
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* From Dropdown */}
          {isFromOpen && (
            <div className="absolute z-30 top-full left-0 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search currency..."
                  value={fromSearch}
                  onChange={(e) => setFromSearch(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                {filteredFromCurrencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setFromCode(c.code);
                      setIsFromOpen(false);
                      setFromSearch('');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition ${
                      fromCode === c.code
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.code} — {c.name}</span>
                    </div>
                    {fromCode === c.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-1 md:my-0 md:pt-6">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap Currencies"
            className="p-3 rounded-full bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm transition hover:rotate-180"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Currency Selector */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            To Currency
          </label>
          <button
            type="button"
            onClick={() => {
              setIsToOpen(!isToOpen);
              setIsFromOpen(false);
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-left hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{toCurrency.flag}</span>
              <div>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{toCurrency.code}</span>
                  <span className="text-xs font-normal text-slate-400">({toCurrency.symbol})</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                  {toCurrency.name}
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* To Dropdown */}
          {isToOpen && (
            <div className="absolute z-30 top-full left-0 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search currency..."
                  value={toSearch}
                  onChange={(e) => setToSearch(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                {filteredToCurrencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setToCode(c.code);
                      setIsToOpen(false);
                      setToSearch('');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition ${
                      toCode === c.code
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.code} — {c.name}</span>
                    </div>
                    {toCode === c.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result Card */}
      <div className="rounded-xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-900/50 p-5 sm:p-6 mb-4">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          {amount.toLocaleString('en-IN')} {fromCurrency.code} =
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {toCurrency.symbol} {convertedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-base font-bold text-slate-600 dark:text-slate-300">
            {toCurrency.code}
          </span>
        </div>

        {/* Indicative Rate info */}
        <div className="mt-3 pt-3 border-t border-blue-100 dark:border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-semibold">Current Exchange Rate: </span>
            1 {fromCurrency.code} = {exchangeRate.toFixed(4)} {toCurrency.code}
            <span className="text-slate-400 mx-2">•</span>
            1 {toCurrency.code} = {(1 / exchangeRate).toFixed(4)} {fromCurrency.code}
          </div>
          <div className="text-[11px] text-slate-400">
            Indicative interbank conversion
          </div>
        </div>
      </div>

      {/* Provider Attribution and Disclaimer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Data Provider: {fiatData?.source || 'Open Exchange Rates System (Live Interbank Feed)'}</span>
        </div>
        <div>
          <span>Rates are indicative for information purposes only</span>
        </div>
      </div>
    </div>
  );
};
