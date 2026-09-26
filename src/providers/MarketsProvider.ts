import { FiatMarketData, CryptoCoin, CryptoHistoryData } from '../types/markets';

export interface FiatExchangeRateProvider {
  getRates(): Promise<FiatMarketData>;
  convert(amount: number, from: string, to: string): Promise<{
    amount: number;
    from: string;
    to: string;
    result: number;
    rate: number;
    timestamp: string;
    source: string;
  }>;
}

export interface CryptoMarketDataProvider {
  getCoins(): Promise<{ coins: CryptoCoin[]; lastUpdated: string; source: string }>;
  getCoinById(id: string): Promise<CryptoCoin | null>;
  getHistory(coinId: string, range: '1D' | '7D' | '1M' | '3M' | '1Y'): Promise<CryptoHistoryData>;
  convert(amount: number, fromSymbol: string, toSymbol: string): Promise<{
    amount: number;
    from: string;
    to: string;
    result: number;
    rate: number;
    timestamp: string;
    source: string;
  }>;
}

// Client-side implementation proxying through secure server routes
export class LiveFiatExchangeRateProvider implements FiatExchangeRateProvider {
  async getRates(): Promise<FiatMarketData> {
    const res = await fetch('/api/markets/fiat');
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Live fiat currency rates feed unreachable.');
    }
    return res.json();
  }

  async convert(amount: number, from: string, to: string) {
    const data = await this.getRates();
    const rates = data.rates;

    // Both rates relative to USD base
    const fromRate = from === 'USD' ? 1 : rates[from];
    const toRate = to === 'USD' ? 1 : rates[to];

    if (!fromRate || !toRate) {
      throw new Error(`Unsupported currency pair: ${from}/${to}`);
    }

    // Rate = toRate / fromRate
    const exchangeRate = toRate / fromRate;
    const result = amount * exchangeRate;

    return {
      amount,
      from,
      to,
      result: Number(result.toFixed(2)),
      rate: Number(exchangeRate.toFixed(4)),
      timestamp: data.lastUpdated,
      source: data.source,
    };
  }
}

export class LiveCryptoMarketDataProvider implements CryptoMarketDataProvider {
  async getCoins(): Promise<{ coins: CryptoCoin[]; lastUpdated: string; source: string }> {
    const res = await fetch('/api/markets/crypto');
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Live crypto market feed unreachable.');
    }
    return res.json();
  }

  async getCoinById(id: string): Promise<CryptoCoin | null> {
    const { coins } = await this.getCoins();
    return coins.find((c) => c.id.toLowerCase() === id.toLowerCase() || c.symbol.toLowerCase() === id.toLowerCase()) || null;
  }

  async getHistory(coinId: string, range: '1D' | '7D' | '1M' | '3M' | '1Y'): Promise<CryptoHistoryData> {
    const rangeToDays: Record<string, string> = {
      '1D': '1',
      '7D': '7',
      '1M': '30',
      '3M': '90',
      '1Y': '365',
    };
    const days = rangeToDays[range] || '7';

    const res = await fetch(`/api/markets/crypto/${encodeURIComponent(coinId)}/history?days=${days}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Historical price series unreachable for ${coinId}`);
    }
    const data = await res.json();
    return {
      coinId,
      range,
      prices: data.prices || [],
      source: data.source,
      lastUpdated: data.lastUpdated,
    };
  }

  async convert(amount: number, fromSymbol: string, toSymbol: string) {
    const { coins, lastUpdated, source } = await this.getCoins();

    const getPriceInINR = (sym: string): number => {
      const s = sym.toUpperCase();
      if (s === 'INR') return 1;
      if (s === 'USD') return 86.5; // Benchmark USD to INR
      const found = coins.find((c) => c.symbol === s || c.id.toUpperCase() === s);
      return found ? found.current_price_inr : 0;
    };

    const fromPriceINR = getPriceInINR(fromSymbol);
    const toPriceINR = getPriceInINR(toSymbol);

    if (!fromPriceINR || !toPriceINR) {
      throw new Error(`Unsupported conversion pair: ${fromSymbol} / ${toSymbol}`);
    }

    const rate = fromPriceINR / toPriceINR;
    const result = amount * rate;

    return {
      amount,
      from: fromSymbol.toUpperCase(),
      to: toSymbol.toUpperCase(),
      result: Number(result.toFixed(6)),
      rate: Number(rate.toFixed(6)),
      timestamp: lastUpdated,
      source,
    };
  }
}

export const fiatProvider = new LiveFiatExchangeRateProvider();
export const cryptoProvider = new LiveCryptoMarketDataProvider();
