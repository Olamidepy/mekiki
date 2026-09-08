"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MarketRegimeStats } from "@/types"
import { Sparkles, ArrowRight, BookOpen } from "lucide-react"

interface MarketHeroProps {
  stats: MarketRegimeStats
  onRunScan: () => void
  onOpenJournal: () => void
}

export function MarketHero({ stats, onRunScan, onOpenJournal }: MarketHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-200 bg-white pt-16 md:pt-20">
      {/* Decorative soft blue blur glows */}
      <div className="blob-glow w-[550px] h-[550px] -top-44 left-1/2 -translate-x-1/2 opacity-30" />
      <div className="blob-glow w-[380px] h-[380px] top-20 right-[-100px] opacity-25" />
      <div className="blob-glow w-[380px] h-[380px] top-20 left-[-100px] opacity-25" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Market regime pill tag */}
          <div className="inline-flex items-center rounded-full bg-slate-100 p-1 mb-7 border border-slate-200/80 shadow-none">
            <span className="rounded-full bg-[#2952FF] text-white text-xs font-semibold px-3.5 py-1.5 shadow-sm">
              {stats.regime}
            </span>
            <span className="text-xs font-medium text-slate-700 px-4 py-1.5">
              {stats.sentimentTag}
            </span>
          </div>

          {/* Main bold headline */}
          <h1 className="text-4xl sm:text-5xl md:text-[54px] font-extrabold tracking-tightish leading-[1.06] text-slate-900 max-w-2xl">
            What deserves your attention right now
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Mekiki scans the market, weighs the evidence, and shows its reasoning before it shows a verdict.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Button
              size="lg"
              onClick={onRunScan}
              className="rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white font-medium px-8 py-3.5 text-sm transition-all active:scale-[0.98] shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Run a scan
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenJournal}
              className="rounded-full border-slate-300 text-slate-900 hover:bg-slate-50 font-medium px-8 py-3.5 text-sm transition-all"
            >
              Open journal
            </Button>
          </div>

          {/* Stat metrics row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 text-sm text-slate-500">
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

        {/* Large, Centralized 3D Coils Visual matching Figma layout */}
        <div className="relative mt-12 md:mt-16 w-full max-w-5xl mx-auto flex justify-center pointer-events-none select-none overflow-hidden">
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
            <Image
              src="/images/spiral-3d.png"
              alt="Mekiki 3D visual"
              fill
              className="object-contain object-bottom scale-105 sm:scale-100 transition-transform"
              priority
            />
          </div>
          {/* Subtle bottom gradient mask fade to blend smoothly into verdict section */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}

