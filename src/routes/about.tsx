import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CPR.crypto" },
      { name: "description", content: "CPR.crypto is a pivot-based trading desk for crypto markets, built for traders who want clarity over noise." },
      { property: "og:title", content: "About CPR.crypto" },
      { property: "og:description", content: "A pivot-based crypto trading desk." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          CPR.crypto is a focused trading dashboard. No noise, no influencers — just the
          numbers professional pivot traders have used for decades, ported to the 24/7
          crypto market.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We compute the Central Pivot Range, R1–R3 and S1–S3 from the previous UTC day's
          OHLC using free CoinGecko data. No accounts, no tracking, no premium tier — just
          a clean desk to start your trading session.
        </p>
        <div className="mt-12 rounded-xl border border-border/60 bg-card/60 p-6">
          <div className="font-semibold">Disclaimer</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Information here is for educational purposes only and does not constitute
            financial advice. Crypto trading carries significant risk.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
