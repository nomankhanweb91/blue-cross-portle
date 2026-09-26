import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import { RootLayout } from './layouts/RootLayout';

// Core Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { AIDirectoryPage } from './pages/AIDirectoryPage';
import { AIToolsPage } from './pages/AIToolsPage';
import { ImageToolsPage } from './pages/ImageToolsPage';
import { PDFToolsPage } from './pages/PDFToolsPage';
import { DeveloperToolsPage } from './pages/DeveloperToolsPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { WeatherPage } from './pages/WeatherPage';
import { CricketPage } from './pages/CricketPage';
import { NewsPage } from './pages/NewsPage';
import { ShoppingPage } from './pages/ShoppingPage';
import { MapsPage } from './pages/MapsPage';
import { SocialHubPage } from './pages/SocialHubPage';
import { TrendingPage } from './pages/TrendingPage';

// 65. Live Currency & Crypto Market Hub Pages
import { MarketsHubPage } from './pages/markets/MarketsHubPage';
import { CurrencyMarketPage } from './pages/markets/CurrencyMarketPage';
import { CryptoMarketPage } from './pages/markets/CryptoMarketPage';
import { CoinDetailPage } from './pages/markets/CoinDetailPage';

// India Hub Pages
import { IndiaHubPage } from './pages/IndiaHubPage';
import { FindServicePage } from './pages/FindServicePage';
import { AadhaarPage } from './pages/gov/AadhaarPage';
import { PanPage } from './pages/gov/PanPage';
import { StatesPage } from './pages/gov/StatesPage';
import { PincodePage } from './pages/gov/PincodePage';
import { GovUniversalGuidePage } from './pages/gov/GovUniversalGuidePage';

// Legal & Trust Pages
import {
  PrivacyPage,
  TermsPage,
  DisclaimerPage,
  CookiesPage,
  ContactPage,
} from './pages/LegalPages';

// Government Service Configs
import {
  incomeTaxConfig,
  gstConfig,
  udyamConfig,
  schemesConfig,
  passportConfig,
  rtoConfig,
  epfoConfig,
  bankingConfig,
  railwaysConfig,
  flightsConfig,
  documentsConfig,
  businessConfig,
  voterConfig,
  eshramConfig,
  ayushmanConfig,
  scholarshipsConfig,
  jobsConfig,
  examsConfig,
} from './data/govGuideConfigs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },

      { path: 'ai', element: <AIDirectoryPage /> },
      { path: 'ai-tools', element: <AIToolsPage /> },

      { path: 'image-tools', element: <ImageToolsPage /> },
      { path: 'pdf-tools', element: <PDFToolsPage /> },

      { path: 'developer-tools', element: <DeveloperToolsPage /> },
      { path: 'calculators', element: <CalculatorsPage /> },

      { path: 'weather', element: <WeatherPage /> },
      { path: 'cricket', element: <CricketPage /> },
      { path: 'cricket/*', element: <CricketPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'shopping', element: <ShoppingPage /> },
      { path: 'maps', element: <MapsPage /> },
      { path: 'social', element: <SocialHubPage /> },
      { path: 'trending', element: <TrendingPage /> },

      // 65. Live Currency & Crypto Market Hub Routes
      { path: 'markets', element: <MarketsHubPage /> },
      { path: 'markets/currency', element: <CurrencyMarketPage /> },
      { path: 'markets/crypto', element: <CryptoMarketPage /> },
      { path: 'markets/crypto/bitcoin', element: <CoinDetailPage fixedCoinId="bitcoin" /> },
      { path: 'markets/crypto/ethereum', element: <CoinDetailPage fixedCoinId="ethereum" /> },
      { path: 'markets/crypto/:coinId', element: <CoinDetailPage /> },

      // India Hub & Sarkari Services
      { path: 'india', element: <IndiaHubPage /> },
      { path: 'india/find-service', element: <FindServicePage /> },
      { path: 'india/aadhaar', element: <AadhaarPage /> },
      { path: 'india/pan', element: <PanPage /> },
      { path: 'india/income-tax', element: <GovUniversalGuidePage config={incomeTaxConfig} /> },
      { path: 'india/gst', element: <GovUniversalGuidePage config={gstConfig} /> },
      { path: 'india/udyam', element: <GovUniversalGuidePage config={udyamConfig} /> },
      { path: 'india/schemes', element: <GovUniversalGuidePage config={schemesConfig} /> },
      { path: 'india/scholarships', element: <GovUniversalGuidePage config={scholarshipsConfig} /> },
      { path: 'india/jobs', element: <GovUniversalGuidePage config={jobsConfig} /> },
      { path: 'india/exams', element: <GovUniversalGuidePage config={examsConfig} /> },
      { path: 'india/passport', element: <GovUniversalGuidePage config={passportConfig} /> },
      { path: 'india/rto', element: <GovUniversalGuidePage config={rtoConfig} /> },
      { path: 'india/epfo', element: <GovUniversalGuidePage config={epfoConfig} /> },
      { path: 'india/banking', element: <GovUniversalGuidePage config={bankingConfig} /> },
      { path: 'india/railways', element: <GovUniversalGuidePage config={railwaysConfig} /> },
      { path: 'india/flights', element: <GovUniversalGuidePage config={flightsConfig} /> },
      { path: 'india/pincode', element: <PincodePage /> },
      { path: 'india/documents', element: <GovUniversalGuidePage config={documentsConfig} /> },
      { path: 'india/business', element: <GovUniversalGuidePage config={businessConfig} /> },
      { path: 'india/voter', element: <GovUniversalGuidePage config={voterConfig} /> },
      { path: 'india/e-shram', element: <GovUniversalGuidePage config={eshramConfig} /> },
      { path: 'india/ayushman', element: <GovUniversalGuidePage config={ayushmanConfig} /> },
      { path: 'india/states', element: <StatesPage /> },

      // Trust, Legal & Disclaimers
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
      { path: 'cookies', element: <CookiesPage /> },
      { path: 'contact', element: <ContactPage /> },

      // Catch-all
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
