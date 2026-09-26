import React from 'react';
import { AlertCircle, RefreshCw, ServerOff } from 'lucide-react';

interface MarketUnavailableStateProps {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const MarketUnavailableState: React.FC<MarketUnavailableStateProps> = ({
  message = 'Live data is not configured. A data provider must be connected to stream real-time financial market and exchange rates.',
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-8 sm:p-12 text-center max-w-xl mx-auto my-6">
      <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4 shadow-sm">
        <ServerOff className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        Live data is not configured
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
        {message}
      </p>

      <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Checking Provider...' : 'Retry Live Feed'}</span>
          </button>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
        <span>Blue Cross does not fabricate or simulate market numbers in production.</span>
      </div>
    </div>
  );
};
