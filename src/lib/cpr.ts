export interface OHLC {
  high: number;
  low: number;
  close: number;
}

export interface CPRLevels {
  pivot: number;
  bc: number; // bottom central
  tc: number; // top central
  r1: number; r2: number; r3: number;
  s1: number; s2: number; s3: number;
  width: number; // |tc - bc|
  widthPct: number; // width / pivot * 100
  type: "narrow" | "normal" | "wide";
  bias: "bullish" | "bearish" | "neutral";
}

export function calculateCPR({ high, low, close }: OHLC, currentPrice?: number): CPRLevels {
  const pivot = (high + low + close) / 3;
  const bc = (high + low) / 2;
  const tc = pivot + (pivot - bc);

  const r1 = 2 * pivot - low;
  const s1 = 2 * pivot - high;
  const r2 = pivot + (high - low);
  const s2 = pivot - (high - low);
  const r3 = high + 2 * (pivot - low);
  const s3 = low - 2 * (high - pivot);

  const top = Math.max(tc, bc);
  const bot = Math.min(tc, bc);
  const width = top - bot;
  const widthPct = (width / pivot) * 100;

  let type: CPRLevels["type"] = "normal";
  if (widthPct < 0.3) type = "narrow";
  else if (widthPct > 1.0) type = "wide";

  let bias: CPRLevels["bias"] = "neutral";
  if (currentPrice !== undefined) {
    if (currentPrice > top) bias = "bullish";
    else if (currentPrice < bot) bias = "bearish";
  }

  return { pivot, bc: bot, tc: top, r1, r2, r3, s1, s2, s3, width, widthPct, type, bias };
}

export function formatPrice(n: number): string {
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  return n.toFixed(6);
}
