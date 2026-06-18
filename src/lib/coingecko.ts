export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  total_volume: number;
}

const BASE = "https://api.coingecko.com/api/v3";

export async function fetchMarkets(ids?: string[]): Promise<CoinMarket[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "20",
    page: "1",
    sparkline: "false",
    price_change_percentage: "24h",
  });
  if (ids?.length) params.set("ids", ids.join(","));
  const res = await fetch(`${BASE}/coins/markets?${params}`);
  if (!res.ok) throw new Error("Failed to fetch markets");
  return res.json();
}

export interface DailyCandle {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

// CoinGecko OHLC: [timestamp, open, high, low, close]
export async function fetchOHLC(id: string, days = 7): Promise<DailyCandle[]> {
  const res = await fetch(`${BASE}/coins/${id}/ohlc?vs_currency=usd&days=${days}`);
  if (!res.ok) throw new Error("Failed to fetch OHLC");
  const raw: number[][] = await res.json();
  // Aggregate the 4h candles CoinGecko returns into daily UTC buckets
  const byDay = new Map<string, DailyCandle>();
  for (const [ts, o, h, l, c] of raw) {
    const d = new Date(ts);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
    const ex = byDay.get(key);
    if (!ex) byDay.set(key, { date: ts, open: o, high: h, low: l, close: c });
    else {
      ex.high = Math.max(ex.high, h);
      ex.low = Math.min(ex.low, l);
      ex.close = c;
    }
  }
  return [...byDay.values()].sort((a, b) => a.date - b.date);
}
