import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/strategy")({
  head: () => ({
    meta: [
      { title: "Pivot Bull Strategy — How to trade Central Pivot Range" },
      { name: "description", content: "A practical guide to trading the Central Pivot Range: narrow vs wide CPR, virgin CPR, breakout and rejection setups." },
      { property: "og:title", content: "Pivot Bull Strategy Guide" },
      { property: "og:description", content: "How to read and trade Central Pivot Range setups on crypto." },
    ],
  }),
  component: StrategyPage,
});

function StrategyPage() {
  const sections = [
    {
      title: "What is CPR?",
      body: "The Central Pivot Range is a three-line indicator derived from the previous session's High, Low and Close. It consists of the Pivot (P), Top Central (TC) and Bottom Central (BC). Price interacts with these zones as magnets, supports and resistances.",
    },
    {
      title: "Narrow CPR — breakout day",
      body: "When the CPR width is unusually small (< 0.3% of pivot), it signals coiled volatility. These days favor strong directional trends — trade breakouts of the prior day's high or low with momentum.",
    },
    {
      title: "Wide CPR — range day",
      body: "A wide CPR (> 1.0%) usually marks a sideways session. Fade extremes toward the pivot and avoid chasing breakouts that lack volume confirmation.",
    },
    {
      title: "Virgin CPR",
      body: "If price never touched the prior day's CPR, today's CPR is 'virgin'. Virgin CPRs act as strong magnets — expect reversion toward them with ~70% historical reliability.",
    },
    {
      title: "Trading the levels",
      body: "Use R1/S1 for first targets, R2/S2 for trend continuation, and R3/S3 as exhaustion zones. Combine with volume profile and the asset's 24h range for high-conviction entries.",
    },
  ];
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          The <span className="text-primary">Pivot Bull</span> Strategy Guide
        </h1>
        <p className="mt-3 text-muted-foreground">
          Everything you need to read pivot ranges on crypto charts — written for active traders.
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-14 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <div className="text-sm font-semibold text-primary">Formula</div>
          <pre className="mt-3 overflow-x-auto rounded-md bg-background/60 p-4 text-xs leading-relaxed">{`Pivot = (H + L + C) / 3
BC    = (H + L) / 2
TC    = (Pivot - BC) + Pivot

R1 = 2P - L      S1 = 2P - H
R2 = P + (H-L)   S2 = P - (H-L)
R3 = H + 2(P-L)  S3 = L - 2(H-P)`}</pre>
        </div>
      </main>
      <Footer />
    </div>
  );
}
