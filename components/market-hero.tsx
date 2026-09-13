"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MarketRegimeStats } from "@/types"

interface MarketHeroProps {
  stats: MarketRegimeStats
  onRunScan: () => void
  onOpenJournal: () => void
}

export function MarketHero({ stats, onRunScan, onOpenJournal }: MarketHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-transparent pt-16 sm:pt-28 md:pt-36 lg:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Market regime pill tag */}
          <div className="inline-flex items-center rounded-full bg-slate-100/90 dark:bg-slate-800/90 p-1 mb-6 sm:mb-10 border border-slate-200/80 dark:border-slate-700/80 shadow-none">
            <span className="rounded-full bg-[#2952FF] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 shadow-sm">
              {stats.regime}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 px-3 sm:px-4 py-1 sm:py-1.5">
              {stats.sentimentTag}
            </span>
          </div>

          {/* Main bold headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.1] sm:leading-[1.05] text-slate-900 dark:text-white max-w-4xl">
            What deserves your attention right now
          </h1>

          {/* Subtitle with generous breathing room */}
          <p className="mt-6 sm:mt-10 text-slate-500 dark:text-slate-400 text-base sm:text-xl md:text-2xl max-w-2xl font-normal leading-relaxed px-2">
            Mekiki scans the market, weighs the evidence, and shows its reasoning before it shows a verdict.
          </p>

          {/* Action buttons with full-width on mobile */}
          <div className="mt-8 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto px-4 sm:px-0">
            <Button
              size="lg"
              onClick={onRunScan}
              className="w-full sm:w-auto rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white font-medium px-8 py-3.5 text-base transition-all active:scale-[0.98] shadow-sm h-auto"
            >
              Run a scan
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenJournal}
              className="w-full sm:w-auto rounded-full border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-medium px-8 py-3.5 text-base transition-all h-auto"
            >
              Open journal
            </Button>
          </div>

          {/* Stat metrics row: 2x2 grid on mobile, inline flex on sm+ */}
          <div className="mt-12 sm:mt-20 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-x-14 sm:gap-y-4 text-xs sm:text-base text-slate-500 dark:text-slate-400 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 p-2 sm:p-0 rounded-xl bg-slate-50 dark:bg-slate-900/60 sm:bg-transparent dark:sm:bg-transparent border border-slate-100 dark:border-slate-800 sm:border-0">
              <span className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">Fear &amp; Greed</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-900 dark:text-white font-semibold">{stats.fearAndGreed}</span>
                <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-normal">({stats.fearAndGreedLabel})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 p-2 sm:p-0 rounded-xl bg-slate-50 dark:bg-slate-900/60 sm:bg-transparent dark:sm:bg-transparent border border-slate-100 dark:border-slate-800 sm:border-0">
              <span className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">BTC dominance</span>
              <span className="text-slate-900 dark:text-white font-semibold">{stats.btcDominance}%</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 p-2 sm:p-0 rounded-xl bg-slate-50 dark:bg-slate-900/60 sm:bg-transparent dark:sm:bg-transparent border border-slate-100 dark:border-slate-800 sm:border-0">
              <span className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">Breadth</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold capitalize">{stats.breadth}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-2 p-2 sm:p-0 rounded-xl bg-slate-50 dark:bg-slate-900/60 sm:bg-transparent dark:sm:bg-transparent border border-slate-100 dark:border-slate-800 sm:border-0">
              <span className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">Volatility</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold capitalize">{stats.volatility}</span>
            </div>
          </div>
        </div>
      </div>

      {/* End-to-end 3D Coils Visual shifted left with slow-motion wave animation */}
      <div className="relative w-full overflow-hidden mt-16 sm:mt-24 md:mt-32 pointer-events-none select-none flex justify-center">
        <img
          src="/images/spiral-3d.png"
          alt="Mekiki 3D visual"
          className="w-full h-auto min-w-[1050px] md:min-w-full object-cover object-top block select-none animate-wave-slow opacity-95 dark:opacity-85"
          draggable={false}
        />

        {/* Soft bottom blur and gradient blend seamlessly into background */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 md:h-52 bg-gradient-to-t from-background via-background/80 to-transparent dark:from-[#07080c] dark:via-[#07080c]/80 backdrop-blur-[4px] pointer-events-none" />
      </div>
    </section>
  )
}

