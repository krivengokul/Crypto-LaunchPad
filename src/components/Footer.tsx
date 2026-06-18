export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-bold">Pivot Bull</div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Real-time Central Pivot Range levels for the top crypto markets. Built for intraday and swing traders.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Resources</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Strategy guide</li>
            <li>Pivot math</li>
            <li>API status</li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Disclaimer</div>
          <p className="text-muted-foreground">
            Not financial advice. Data via CoinGecko public API. Always do your own research.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pivot Bull — built for traders.
      </div>
    </footer>
  );
}
