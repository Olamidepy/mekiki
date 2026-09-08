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
    <section id="hero" className="relative overflow-hidden bg-white pt-20 sm:pt-28 md:pt-36 lg:pt-40">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Market regime pill tag */}
          <div className="inline-flex items-center rounded-full bg-slate-100/90 p-1 mb-8 sm:mb-10 border border-slate-200/80 shadow-none">
            <span className="rounded-full bg-[#2952FF] text-white text-xs sm:text-sm font-semibold px-4 py-1.5 shadow-sm">
              {stats.regime}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-700 px-4 py-1.5">
              {stats.sentimentTag}
            </span>
          </div>

          {/* Main bold headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-extrabold tracking-tight leading-[1.05] text-slate-900 max-w-4xl">
            What deserves your attention right now
          </h1>

          {/* Subtitle with generous breathing room */}
          <p className="mt-8 sm:mt-10 text-slate-500 text-lg sm:text-xl md:text-2xl max-w-2xl font-normal leading-relaxed">
            Mekiki scans the market, weighs the evidence, and shows its reasoning before it shows a verdict.
          </p>

          {/* Action buttons without flashy icons */}
          <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Button
              size="lg"
              onClick={onRunScan}
              className="rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white font-medium px-8 py-3.5 text-base transition-all active:scale-[0.98] shadow-sm h-auto"
            >
              Run a scan
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenJournal}
              className="rounded-full border-slate-300 text-slate-900 hover:bg-slate-50 font-medium px-8 py-3.5 text-base transition-all h-auto"
            >
              Open journal
            </Button>
          </div>

          {/* Stat metrics row with ample spacing */}
          <div className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-4 text-sm sm:text-base text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Fear &amp; Greed</span>
              <span className="text-slate-900 font-semibold">{stats.fearAndGreed}</span>
              <span className="text-xs text-slate-400 font-normal">({stats.fearAndGreedLabel})</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">BTC dominance</span>
              <span className="text-slate-900 font-semibold">{stats.btcDominance}%</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Breadth</span>
              <span className="text-emerald-600 font-semibold capitalize">{stats.breadth}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Volatility</span>
              <span className="text-amber-600 font-semibold capitalize">{stats.volatility}</span>
            </div>
          </div>
        </div>
      </div>

      {/* End-to-end 3D Coils Visual shifted left with slow-motion wave animation */}
      <div className="relative w-full overflow-hidden mt-16 sm:mt-24 md:mt-32 pointer-events-none select-none flex justify-center">
        <img
          src="/images/spiral-3d.png"
          alt="Mekiki 3D visual"
          className="w-full h-auto min-w-[1050px] md:min-w-full object-cover object-top block select-none animate-wave-slow"
          draggable={false}
        />

        {/* Soft bottom blur and gradient blend seamlessly into background */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 md:h-52 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-[4px] pointer-events-none" />
      </div>
    </section>
  )
}

