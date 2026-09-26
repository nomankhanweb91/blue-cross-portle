import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { DisclaimerBanner } from '../components/layout/DisclaimerBanner';
import { Footer } from '../components/layout/Footer';
import { MobileNav } from '../components/layout/MobileNav';
import { OfflineIndicator } from '../components/common/OfflineIndicator';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      <ScrollToTop />
      <DisclaimerBanner />
      <GlobalHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <OfflineIndicator />
    </div>
  );
};
