"use client"

import * as React from "react"
import { Search, BrainCircuit, Scale, Zap, ShieldAlert, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "RYO Multi-Venue Scanner",
      description:
        "Continuously monitors spot & perps orderbooks, liquidation cascades, funding rate extremes, and DEX liquidity surges across 20+ chains.",
      tag: "Real-time Data",
    },
    {
      step: "02",
      icon: BrainCircuit,
      title: "Structure & Orderflow Synthesis",
      description:
        "Identifies Fair Value Gaps (FVG), volume profile point of control, open interest divergences, and multi-timeframe break-of-structure.",
      tag: "Deep Technicals",
    },
    {
      step: "03",
      icon: Scale,
      title: "Adversarial Bull vs. Bear Debate",
      description:
        "Independent bull and bear LLM agent passes aggressively cross-examine the trade hypothesis, testing falsifiability and worst-case risks.",
      tag: "LLM Consensus",
    },
    {
      step: "04",
      icon: Zap,
      title: "Telegram Alert & Practice Journal",
      description:
        "Dispatches actionable verdicts to Telegram within milliseconds. Allows instant 1-tap paper execution logged into your personal decision journal.",
      tag: "Telegram Native",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 md:py-32 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with plenty of space */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2952FF] mb-4">
            <span>Dual-Agent Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Mekiki reasons before it speaks
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg font-normal leading-relaxed">
            Most crypto bots pump raw indicators into private chats. Mekiki runs a strict, adversarial intelligence pipeline where trade ideas must survive rigorous bull/bear scrutiny before reaching your screen.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-slate-200 p-7 bg-white hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-[#2952FF] transition-colors">
                      PHASE {item.step}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
                      {item.tag}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-5 group-hover:bg-[#2952FF] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-2.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-medium text-slate-400 group-hover:text-[#2952FF] transition-colors">
                  <span>Transparent reasoning</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
