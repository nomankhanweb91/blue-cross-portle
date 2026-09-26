import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const MarketDisclaimer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 ${
      compact ? 'p-3 text-[11px]' : 'p-4 sm:p-5 text-xs'
    }`}>
      <div className="flex items-start gap-2.5">
        <AlertTriangle className={`text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <div className="space-y-1">
          <p className="font-bold">
            Important Financial &amp; Market Risk Notice:
          </p>
          <p className="leading-relaxed">
            Market prices and exchange rates are provided for general information and may be delayed or inaccurate. Cryptocurrency prices are volatile. This portal does not provide investment advice, execute trades, or guarantee conversion rates.
          </p>
          <p className="pt-0.5">
            <Link to="/disclaimer" className="text-amber-700 dark:text-amber-300 font-semibold underline hover:text-amber-900">
              Read Full Legal &amp; Financial Disclaimer &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
