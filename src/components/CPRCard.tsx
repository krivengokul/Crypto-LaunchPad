import { calculateCPR, formatPrice, type OHLC } from "@/lib/cpr";
import type { CoinMarket } from "@/lib/coingecko";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface Props {
  coin: CoinMarket;
  prevDay?: OHLC;
}

export function CPRCard({ coin, prevDay }: Props) {
  if (!prevDay) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/60 p-5 animate-pulse h-[380px]" />
    );
  }
  const cpr = calculateCPR(prevDay, coin.current_price);
  const up = coin.price_change_percentage_24h >= 0;

  const levels = [
    { label: "R3", value: cpr.r3, kind: "r" },
    { label: "R2", value: cpr.r2, kind: "r" },
    { label: "R1", value: cpr.r1, kind: "r" },
    { label: "TC", value: cpr.tc, kind: "cpr" },
    { label: "Pivot", value: cpr.pivot, kind: "cpr" },
    { label: "BC", value: cpr.bc, kind: "cpr" },
    { label: "S1", value: cpr.s1, kind: "s" },
    { label: "S2", value: cpr.s2, kind: "s" },
    { label: "S3", value: cpr.s3, kind: "s" },
  ];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/70 p-5 backdrop-blur transition hover:border-primary/40">
      <div className="absolute inset-0 -z-10 opacity-40 grid-bg" />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full ring-1 ring-border" />
          <div>
            <div className="text-base font-semibold">{coin.name}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{coin.symbol}/USD</div>
          </div>
        </div>
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
            cpr.type === "narrow"
              ? "bg-bull/10 text-bull"
              : cpr.type === "wide"
              ? "bg-bear/10 text-bear"
              : "bg-pivot/10 text-pivot"
          }`}
        >
          {cpr.type} CPR
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="font-mono text-2xl font-bold">${formatPrice(coin.current_price)}</div>
          <div className={`flex items-center gap-1 text-sm font-medium ${up ? "text-bull" : "text-bear"}`}>
            {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bias</div>
          <div
            className={`flex items-center gap-1 font-semibold ${
              cpr.bias === "bullish" ? "text-bull" : cpr.bias === "bearish" ? "text-bear" : "text-muted-foreground"
            }`}
          >
            {cpr.bias === "bullish" ? <ArrowUpRight className="h-4 w-4" /> : cpr.bias === "bearish" ? <ArrowDownRight className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
            {cpr.bias}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-1">
        {levels.map((l) => {
          const isCurrent =
            coin.current_price <= l.value &&
            (levels[levels.indexOf(l) + 1]?.value ?? -Infinity) < coin.current_price;
          return (
            <div
              key={l.label}
              className={`flex items-center justify-between rounded px-2 py-1 font-mono text-xs ${
                l.kind === "cpr"
                  ? "bg-pivot/10 text-pivot"
                  : l.kind === "r"
                  ? "text-bear"
                  : "text-bull"
              } ${isCurrent ? "ring-1 ring-primary/60" : ""}`}
            >
              <span className="font-display text-[11px] font-bold tracking-wider">{l.label}</span>
              <span>${formatPrice(l.value)}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
        <span>Width <span className="font-mono text-foreground">{cpr.widthPct.toFixed(3)}%</span></span>
        <span>Vol <span className="font-mono text-foreground">${(coin.total_volume / 1e9).toFixed(2)}B</span></span>
      </div>
    </div>
  );
}
