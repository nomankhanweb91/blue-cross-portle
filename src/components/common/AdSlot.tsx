import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: 'top' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = '1234567890',
  format = 'auto',
  layout = 'in-content',
  className = '',
}) => {
  const isEnabled = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
  const client = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-8528510551006901';
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense push skipped:', e);
    }
  }, [isEnabled]);

  // When disabled in environment, render completely empty without taking space or obstructing UI
  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className={`my-6 mx-auto w-full max-w-4xl p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-center ${className}`}
      data-ad-layout={layout}
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-1">
        Advertisement
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
