import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">Pivot Bull</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Pivot Trading Desk</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground sm:flex">
          <Link to="/" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }} className="hover:text-foreground transition">Dashboard</Link>
          <Link to="/strategy" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Strategy</Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">About</Link>
        </nav>
        <a
          href="#dashboard"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px_oklch(0.78_0.17_75/0.7)] transition hover:brightness-110"
        >
          Launch desk
        </a>
      </div>
    </header>
  );
}
