import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// In-memory cache for market endpoints
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
let fiatCache: CacheEntry<any> | null = null;
let cryptoCache: CacheEntry<any> | null = null;
const cryptoHistoryCache = new Map<string, CacheEntry<any>>();

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'BLUE CROSS — INDIA SUPER PORTAL',
    timestamp: new Date().toISOString(),
    aiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Server-side AI Provider API Endpoint (Gemini 3.8 Flash)
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction, toolType } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in the environment secrets.',
        isConfigured: false,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are the official AI writing and productivity assistant built for BLUE CROSS — INDIA SUPER PORTAL (https://blue-cross.org). Tagline: Search. Tools. Information. India. Blue Cross is an independent information and utility platform for India offering search, verified government service guides, calculators, and media utilities. Provide accurate, clear, helpful responses.',
      },
    });

    const outputText = response.text || '';
    return res.json({
      success: true,
      text: outputText,
      toolType: toolType || 'general',
    });
  } catch (error: any) {
    console.error('Server Gemini AI Error:', error);
    return res.status(500).json({
      error: error?.message || 'An error occurred while generating content with Gemini AI.',
    });
  }
});

// ----------------------------------------------------
// 65. LIVE CURRENCY & CRYPTO MARKET HUB BACKEND ROUTES
// ----------------------------------------------------

const SUPPORTED_CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
];

// A. Live Fiat Currency Rates Endpoint
app.get('/api/markets/fiat', async (_req, res) => {
  const now = Date.now();
  if (fiatCache && now - fiatCache.timestamp < CACHE_TTL_MS) {
    return res.json(fiatCache.data);
  }

  try {
    // Primary: Open Exchange Rates API (open.er-api.com)
    const apiRes = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!apiRes.ok) {
      throw new Error(`Forex API returned status ${apiRes.status}`);
    }
    const data = await apiRes.json();
    const rawRates = data.rates || {};

    const inrPerUsd = rawRates['INR'] || 86.5;

    const currencies = SUPPORTED_CURRENCIES.map((curr) => {
      const rateToUSD = rawRates[curr.code] || 1;
      // Convert to INR: (amount in curr / rateToUSD) * inrPerUsd
      const rateToINR = (1 / rateToUSD) * inrPerUsd;
      return {
        ...curr,
        rateToUSD: Number(rateToUSD.toFixed(4)),
        rateToINR: Number(rateToINR.toFixed(4)),
      };
    });

    const responsePayload = {
      base: 'USD',
      timestamp: now,
      lastUpdated: new Date(now).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      source: 'Open Exchange Rates System (Live Interbank Feed)',
      rates: rawRates,
      currencies,
    };

    fiatCache = { data: responsePayload, timestamp: now };
    return res.json(responsePayload);
  } catch (err: any) {
    console.warn('Live fiat API fetch failed:', err?.message);
    if (fiatCache) {
      return res.json(fiatCache.data);
    }
    return res.status(503).json({
      error: 'Live fiat exchange data feed is currently unreachable. Connect API to enable live data.',
      isConfigured: false,
    });
  }
});

// B. Live Cryptocurrency Market Endpoint
const SUPPORTED_COIN_IDS = [
  'bitcoin',
  'ethereum',
  'tether',
  'binancecoin',
  'solana',
  'ripple',
  'usd-coin',
  'dogecoin',
];

app.get('/api/markets/crypto', async (_req, res) => {
  const now = Date.now();
  if (cryptoCache && now - cryptoCache.timestamp < CACHE_TTL_MS) {
    return res.json(cryptoCache.data);
  }

  try {
    const ids = SUPPORTED_COIN_IDS.join(',');
    // CoinGecko public market query for INR
    const inrUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`;
    const usdUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

    const [inrRes, usdRes] = await Promise.all([
      fetch(inrUrl, { headers: { 'Accept': 'application/json' } }),
      fetch(usdUrl, { headers: { 'Accept': 'application/json' } }),
    ]);

    if (!inrRes.ok) {
      throw new Error(`CoinGecko API returned status ${inrRes.status}`);
    }

    const inrData = await inrRes.json();
    const usdData = usdRes.ok ? await usdRes.json() : [];

    const usdMap = new Map<string, any>();
    if (Array.isArray(usdData)) {
      usdData.forEach((coin: any) => usdMap.set(coin.id, coin));
    }

    const coins = inrData.map((coin: any) => {
      const usdCoin = usdMap.get(coin.id) || {};
      return {
        id: coin.id,
        symbol: (coin.symbol || '').toUpperCase(),
        name: coin.name,
        image: coin.image,
        current_price_inr: coin.current_price,
        current_price_usd: usdCoin.current_price || (coin.current_price / 86.5),
        price_change_percentage_24h: Number((coin.price_change_percentage_24h || 0).toFixed(2)),
        price_change_24h_inr: coin.price_change_24h || 0,
        high_24h_inr: coin.high_24h || coin.current_price,
        low_24h_inr: coin.low_24h || coin.current_price,
        market_cap_inr: coin.market_cap || 0,
        market_cap_usd: usdCoin.market_cap || 0,
        total_volume_inr: coin.total_volume || 0,
        total_volume_usd: usdCoin.total_volume || 0,
        circulating_supply: coin.circulating_supply || 0,
        total_supply: coin.total_supply,
        max_supply: coin.max_supply,
        sparkline_in_7d: coin.sparkline_in_7d,
        last_updated: new Date(coin.last_updated || now).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        source: 'CoinGecko Global Market API (Live)',
      };
    });

    const payload = {
      coins,
      timestamp: now,
      lastUpdated: new Date(now).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      source: 'CoinGecko Global Aggregator (Live)',
    };

    cryptoCache = { data: payload, timestamp: now };
    return res.json(payload);
  } catch (err: any) {
    console.warn('Live crypto API fetch failed:', err?.message);
    if (cryptoCache) {
      return res.json(cryptoCache.data);
    }
    return res.status(503).json({
      error: 'Live cryptocurrency market data feed is currently unreachable. Connect API to enable live data.',
      isConfigured: false,
    });
  }
});

// C. Cryptocurrency Detail & History Endpoint (1D, 7D, 1M, 3M, 1Y)
app.get('/api/markets/crypto/:coinId/history', async (req, res) => {
  const { coinId } = req.params;
  const days = req.query.days ? String(req.query.days) : '7';
  const cacheKey = `${coinId}_${days}`;
  const now = Date.now();

  const cached = cryptoHistoryCache.get(cacheKey);
  if (cached && now - cached.timestamp < 3 * 60 * 1000) {
    return res.json(cached.data);
  }

  // 1. Try Primary: CoinGecko Market Chart
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=inr&days=${days}`;
    const apiRes = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!apiRes.ok) {
      throw new Error(`CoinGecko history API returned status ${apiRes.status}`);
    }
    const data = await apiRes.json();
    const rawPrices = data.prices || [];

    const prices = rawPrices.map(([ts, val]: [number, number]) => {
      const date = new Date(ts);
      return {
        timestamp: ts,
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit' }),
        priceINR: Math.round(val),
        priceUSD: Number((val / 86.85).toFixed(2)),
      };
    });

    const payload = {
      coinId,
      days,
      prices,
      source: 'CoinGecko Time-Series API (Live)',
      lastUpdated: new Date(now).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    cryptoHistoryCache.set(cacheKey, { data: payload, timestamp: now });
    return res.json(payload);
  } catch (err: any) {
    // 2. Secondary Provider: Binance Public Market Klines
    const binanceSymbolMap: Record<string, string> = {
      bitcoin: 'BTCUSDT',
      btc: 'BTCUSDT',
      ethereum: 'ETHUSDT',
      eth: 'ETHUSDT',
      solana: 'SOLUSDT',
      sol: 'SOLUSDT',
      binancecoin: 'BNBUSDT',
      bnb: 'BNBUSDT',
      ripple: 'XRPUSDT',
      xrp: 'XRPUSDT',
      dogecoin: 'DOGEUSDT',
      doge: 'DOGEUSDT',
      tether: 'USDCUSDT',
      usdt: 'USDCUSDT',
      'usd-coin': 'USDCUSDT',
      usdc: 'USDCUSDT',
    };

    const binanceSymbol = binanceSymbolMap[coinId.toLowerCase()];
    if (binanceSymbol) {
      try {
        let interval = '1d';
        let limit = '30';

        if (days === '1') {
          interval = '15m';
          limit = '96';
        } else if (days === '7') {
          interval = '1h';
          limit = '168';
        } else if (days === '30') {
          interval = '1d';
          limit = '30';
        } else if (days === '90') {
          interval = '1d';
          limit = '90';
        } else if (days === '365') {
          interval = '1w';
          limit = '52';
        }

        const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${interval}&limit=${limit}`;
        const bRes = await fetch(binanceUrl);
        if (bRes.ok) {
          const klines = await bRes.json();
          const inrRate = 86.85;

          const prices = klines.map((k: any) => {
            const ts = Number(k[0]);
            const closeUSD = parseFloat(k[4]) || 0;
            const date = new Date(ts);
            return {
              timestamp: ts,
              date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: days === '1' || days === '7' ? '2-digit' : undefined }),
              priceINR: Math.round(closeUSD * inrRate),
              priceUSD: Number(closeUSD.toFixed(2)),
            };
          });

          const payload = {
            coinId,
            days,
            prices,
            source: 'Binance Public Market Data API (Live Interbank)',
            lastUpdated: new Date(now).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          };

          cryptoHistoryCache.set(cacheKey, { data: payload, timestamp: now });
          return res.json(payload);
        }
      } catch (bErr: any) {
        console.warn('Binance fallback failed:', bErr?.message);
      }
    }

    console.warn(`Crypto history fetch failed for ${coinId}:`, err?.message);
    if (cached) {
      return res.json(cached.data);
    }
    return res.status(503).json({
      error: 'Live historical crypto price series is currently unreachable. Connect API to enable live data.',
      isConfigured: false,
    });
  }
});

// In Development, mount Vite middlewares; in Production, serve static build
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Blue Cross India Super Portal running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
