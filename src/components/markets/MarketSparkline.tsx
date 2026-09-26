import React, { useState } from 'react';
import { CryptoHistoryPoint } from '../../types/markets';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { formatCurrencyINR } from '../../lib/utils';

interface MarketSparklineProps {
  points: CryptoHistoryPoint[];
  currentRange: '1D' | '7D' | '1M' | '3M' | '1Y';
  onRangeChange?: (range: '1D' | '7D' | '1M' | '3M' | '1Y') => void;
  isLoading?: boolean;
  source?: string;
  lastUpdated?: string;
}

export const MarketSparkline: React.FC<MarketSparklineProps> = ({
  points,
  currentRange,
  onRangeChange,
  isLoading = false,
  source = 'CoinGecko Time-Series API (Live)',
  lastUpdated,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const ranges: ('1D' | '7D' | '1M' | '3M' | '1Y')[] = ['1D', '7D', '1M', '3M', '1Y'];

  if (points.length < 2) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-500 text-xs">
        {isLoading ? 'Loading price history...' : 'Historical price data not available for this range.'}
      </div>
    );
  }

  const pricesINR = points.map((p) => p.priceINR);
  const minPrice = Math.min(...pricesINR);
  const maxPrice = Math.max(...pricesINR);
  const priceSpread = maxPrice - minPrice || 1;

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const activePoint = hoverIndex !== null ? points[hoverIndex] : lastPoint;

  const priceDiff = lastPoint.priceINR - firstPoint.priceINR;
  const percentageChange = Number(((priceDiff / (firstPoint.priceINR || 1)) * 100).toFixed(2));
  const isPositive = percentageChange >= 0;

  // Chart dimensions
  const width = 600;
  const height = 240;
  const paddingX = 15;
  const paddingY = 25;

  const getCoordinates = (index: number, price: number) => {
    const x = paddingX + (index / (points.length - 1)) * (width - 2 * paddingX);
    const normalizedPrice = (price - minPrice) / priceSpread;
    const y = height - paddingY - normalizedPrice * (height - 2 * paddingY);
    return { x, y };
  };

  const pathPoints = points.map((p, idx) => {
    const { x, y } = getCoordinates(idx, p.priceINR);
    return `${x},${y}`;
  });

  const pathD = `M ${pathPoints.join(' L ')}`;
  const areaD = `${pathD} L ${width - paddingX},${height} L ${paddingX},${height} Z`;

  const activeCoord = hoverIndex !== null ? getCoordinates(hoverIndex, activePoint.priceINR) : null;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
      {/* Header controls & stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {hoverIndex !== null ? `Price on ${activePoint.date}` : `Selected Range (${currentRange}) Change`}
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {formatCurrencyINR(activePoint.priceINR)}
            </span>
            <span className="text-sm font-medium text-slate-500">
              (${activePoint.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
            </span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isPositive ? `+${percentageChange}%` : `${percentageChange}%`}</span>
            </span>
          </div>
        </div>

        {/* Range Selector Buttons */}
        {onRangeChange && (
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-auto justify-between sm:justify-start">
            {ranges.map((r) => {
              const active = currentRange === r;
              return (
                <button
                  key={r}
                  onClick={() => onRangeChange(r)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    active
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-64 overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const ratio = mouseX / rect.width;
            const index = Math.round(ratio * (points.length - 1));
            if (index >= 0 && index < points.length) {
              setHoverIndex(index);
            }
          }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isPositive ? '#10b981' : '#f43f5e'}
                stopOpacity="0.25"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? '#10b981' : '#f43f5e'}
                stopOpacity="0.0"
              />
            </linearGradient>
          </defs>

          {/* Grid guidelines */}
          <line
            x1="0"
            y1={paddingY}
            x2={width}
            y2={paddingY}
            stroke="currentColor"
            strokeDasharray="4 4"
            className="text-slate-200 dark:text-slate-800"
          />
          <line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke="currentColor"
            strokeDasharray="4 4"
            className="text-slate-200 dark:text-slate-800"
          />
          <line
            x1="0"
            y1={height - paddingY}
            x2={width}
            y2={height - paddingY}
            stroke="currentColor"
            strokeDasharray="4 4"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Main Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke={isPositive ? '#10b981' : '#f43f5e'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Hover Crosshair & Dot */}
          {activeCoord && (
            <g>
              <line
                x1={activeCoord.x}
                y1="0"
                x2={activeCoord.x}
                y2={height}
                stroke="currentColor"
                strokeDasharray="3 3"
                className="text-slate-400 dark:text-slate-600"
                strokeWidth="1.5"
              />
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="5"
                fill={isPositive ? '#10b981' : '#f43f5e'}
                stroke="#ffffff"
                strokeWidth="2"
                className="shadow"
              />
            </g>
          )}
        </svg>

        {/* High & Low markers */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="font-semibold">Range Low: </span>
            {formatCurrencyINR(minPrice)}
          </div>
          <div>
            <span className="font-semibold">Range High: </span>
            {formatCurrencyINR(maxPrice)}
          </div>
        </div>
      </div>

      {/* Attribution footer */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Last Updated: {lastUpdated || 'Live feed synchronized'}</span>
        </div>
        <div>
          <span>Data Provider: </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{source}</span>
        </div>
      </div>
    </div>
  );
};
