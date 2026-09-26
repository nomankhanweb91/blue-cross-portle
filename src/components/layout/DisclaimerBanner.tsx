import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useLanguageStore();

  if (dismissed) return null;

  return (
    <div className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/20 px-3 py-1.5 text-xs text-amber-900 dark:text-amber-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="line-clamp-1 sm:line-clamp-none font-medium">
            {t('officialDisclaimer')}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 dark:text-amber-300 hover:opacity-80 p-0.5 rounded transition flex-shrink-0"
          aria-label="Dismiss disclaimer banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
