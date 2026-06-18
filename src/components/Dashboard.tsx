import { useQuery } from "@tanstack/react-query";
import { fetchMarkets, fetchOHLC, type CoinMarket } from "@/lib/coingecko";
import { CPRCard } from "./CPRCard";
import { Ticker } from "./Ticker";
import { useState } from "react";

const DEFAULT_IDS = [
  "bitcoin", "ethereum", "solana", "binancecoin",
  "ripple", "cardano", "dogecoin", "avalanche-2", "chainlink",
];

export function Dashboard() {
  const [ids] = useState(DEFAULT_IDS);

  const markets = useQuery({
    queryKey: ["markets", ids],
    queryFn: () => fetchMarkets(ids),
    refetchInterval: 30_000,
  });

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Live Pivot Bull Desk</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Daily pivot, top &amp; bottom central, plus R1–R3 / S1–S3 — recalculated from yesterday's UTC OHLC.
          </p>
        </div>
        <div className="hidden text-right text-xs text-muted-foreground sm:block">
          <div>Auto-refresh: 30s</div>
          <div>Data: CoinGecko</div>
        </div>
      </div>

      {markets.isError && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive-foreground">
          Couldn't load markets. CoinGecko may be rate-limiting — try again in a minute.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(markets.data ?? Array.from({ length: 9 })).map((c, i) => (
          <CardWithOHLC key={(c as CoinMarket)?.id ?? i} coin={c as CoinMarket | undefined} />
        ))}
      </div>

      <div className="mt-12">
        {markets.data && <Ticker coins={markets.data} />}
      </div>
    </section>
  );
}

function CardWithOHLC({ coin }: { coin?: CoinMarket }) {
  const ohlc = useQuery({
    queryKey: ["ohlc", coin?.id],
    queryFn: () => fetchOHLC(coin!.id, 7),
    enabled: !!coin,
    staleTime: 5 * 60_000,
  });
  if (!coin) return <div className="h-[380px] rounded-xl border border-border/60 bg-card/40 animate-pulse" />;

  const candles = ohlc.data ?? [];
  // previous full UTC day (second to last)
  const prev = candles.length >= 2 ? candles[candles.length - 2] : undefined;

  return <CPRCard coin={coin} prevDay={prev} />;
}
