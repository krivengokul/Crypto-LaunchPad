import { TrendingUp, Zap, Target } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bull" />
            Live market signals · updated every 30s
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Trade crypto with{" "}
            <span className="ticker-glow text-primary">Central Pivot</span>{" "}
            precision.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            CPR.crypto turns yesterday's price action into actionable pivot zones —
            so you know exactly where to enter, where to exit, and where the market is
            most likely to react.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#dashboard"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-10px_oklch(0.78_0.17_75/0.8)] transition hover:brightness-110"
            >
              Open the CPR desk →
            </a>
            <a
              href="/strategy"
              className="rounded-md border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary/40"
            >
              Learn the strategy
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { icon: Target, title: "Narrow CPR alerts", desc: "Spot days primed for trending breakouts before the move." },
            { icon: TrendingUp, title: "Multi-timeframe levels", desc: "Daily, weekly &amp; monthly pivots stacked on every chart." },
            { icon: Zap, title: "Real-time refresh", desc: "Pulls 24h OHLC across the top crypto markets — automatically." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: f.desc }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
