import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pivot Bull — Central Pivot Range trading desk for crypto" },
      { name: "description", content: "Live Central Pivot Range (CPR) levels for Bitcoin, Ethereum and the top crypto markets. Daily pivot, TC/BC, R1–R3, S1–S3 — auto-refreshed." },
      { property: "og:title", content: "Pivot Bull — Pivot trading desk" },
      { property: "og:description", content: "Real-time CPR levels for the top crypto pairs. Built for intraday traders." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
