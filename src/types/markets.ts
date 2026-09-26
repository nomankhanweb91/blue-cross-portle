export interface FiatRate {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number;
  rateToINR: number;
}

export interface FiatMarketData {
  base: string;
  timestamp: number;
  lastUpdated: string;
  source: string;
  rates: Record<string, number>; // code -> rate relative to base USD
  currencies: FiatRate[];
}

export interface CryptoCoin {
  id: string; // 'bitcoin', 'ethereum', etc.
  symbol: string; // 'btc', 'eth'
  name: string;
  image: string;
  current_price_inr: number;
  current_price_usd: number;
  price_change_percentage_24h: number;
  price_change_24h_inr?: number;
  high_24h_inr: number;
  low_24h_inr: number;
  market_cap_inr: number;
  market_cap_usd: number;
  total_volume_inr: number;
  total_volume_usd: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  sparkline_in_7d?: { price: number[] };
  last_updated: string;
  source: string;
}

export interface CryptoHistoryPoint {
  timestamp: number;
  date: string;
  priceINR: number;
  priceUSD: number;
}

export interface CryptoHistoryData {
  coinId: string;
  range: '1D' | '7D' | '1M' | '3M' | '1Y';
  prices: CryptoHistoryPoint[];
  source: string;
  lastUpdated: string;
}
