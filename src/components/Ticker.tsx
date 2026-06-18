import type { CoinMarket } from "@/lib/coingecko";
import { formatPrice } from "@/lib/cpr";

export function Ticker({ coins }: { coins: CoinMarket[] }) {
  if (!coins.length) return null;
  const items = [...coins, ...coins];
  return (
    <div className="overflow-hidden border-y border-border/60 bg-card/40 py-2">
      <div className="flex animate-[scroll_60s_linear_infinite] gap-8 whitespace-nowrap">
        {items.map((c, i) => {
          const up = c.price_change_percentage_24h >= 0;
          return (
            <div key={`${c.id}-${i}`} className="flex items-center gap-2 text-sm">
              <span className="font-mono text-xs uppercase text-muted-foreground">{c.symbol}</span>
              <span className="font-mono font-semibold">${formatPrice(c.current_price)}</span>
              <span className={`font-mono text-xs ${up ? "text-bull" : "text-bear"}`}>
                {up ? "▲" : "▼"} {Math.abs(c.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
