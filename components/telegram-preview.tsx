"use client"

import * as React from "react"
import { Send, CheckCheck, Bot, Sparkles, ArrowUpRight, ShieldCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TelegramPreview() {
  const [activeCommand, setActiveCommand] = React.useState<"scan" | "verdict" | "paper">("verdict")

  const commandScenarios = {
    verdict: {
      userPrompt: "/verdict SOL",
      time: "10:42 AM",
      botResponse: {
        title: "⚡ Mekiki Verdict: SOL / USDT",
        badge: "LONG (Conviction 88/100)",
        thesis: "Bull pass confirmed 4H market structure break with +$24M CVD divergence on Hyperliquid. Liquidation cascade cleared at $182.40.",
        entry: "$188.50 - $189.20",
        target: "$204.00 (R:R 2.8x)",
        invalidation: "$183.10 (Strict 4H close below)",
        evidence: ["CVD Divergence", "4H FVG Retest", "Negative Funding (-0.012%)"],
      },
    },
    scan: {
      userPrompt: "/scan momentum",
      time: "10:45 AM",
      botResponse: {
        title: "🔍 Market Momentum Scan",
        badge: "3 Setups Qualified",
        thesis: "Scanned 84 perps pairs. BTC dominance expanding to 52.1%. Highest relative strength observed in SOL, SUI, and INJ.",
        entry: "SOL (+6.4%), SUI (+9.8%), INJ (+4.2%)",
        target: "Focusing on SOL retest zone",
        invalidation: "BTC losing $62,800 invalidates",
        evidence: ["Volume Surge 2.4x", "Whale Delta Inflow", "Funding Neutral"],
      },
    },
    paper: {
      userPrompt: "/paper buy SOL 5000",
      time: "10:48 AM",
      botResponse: {
        title: "📝 Paper Trade Executed & Logged",
        badge: "Journal Entry #1042",
        thesis: "Simulated position opened: 26.52 SOL @ $188.50 ($5,000 notional). Auto-tracking PnL and alert triggers.",
        entry: "Entry: $188.50 · Size: $5,000",
        target: "Take Profit: $204.00",
        invalidation: "Stop Loss: $183.10",
        evidence: ["Logged to Dashboard", "Web Session Synced", "SL Alert Active"],
      },
    },
  }

  const current = commandScenarios[activeCommand]

  return (
    <section id="telegram-preview" className="py-24 md:py-32 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2952FF]">
              <Bot className="w-3.5 h-3.5" />
              <span>Telegram-Native Terminal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Trade intelligence where your attention already lives
            </h2>

            <p className="text-slate-500 text-base sm:text-lg font-normal leading-relaxed">
              No need to keep 20 browser tabs open. Mekiki pushes high-conviction verdicts directly to your Telegram chat or group, complete with bull/bear reasoning and one-tap paper trade logging.
            </p>

            {/* Interactive command pills to test */}
            <div className="space-y-3 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Try simulated commands:
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setActiveCommand("verdict")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCommand === "verdict"
                      ? "bg-[#2952FF] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  /verdict SOL
                </button>
                <button
                  onClick={() => setActiveCommand("scan")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCommand === "scan"
                      ? "bg-[#2952FF] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  /scan momentum
                </button>
                <button
                  onClick={() => setActiveCommand("paper")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCommand === "paper"
                      ? "bg-[#2952FF] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  /paper trade
                </button>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://t.me/mekiki_agent_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white text-sm font-medium px-6 py-3.5 shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
                Launch @mekiki_agent_bot
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400">
                Free during hackathon demo
              </span>
            </div>
          </div>

          {/* Right Column: Telegram Chat Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6 shadow-sm max-w-lg mx-auto">
              {/* Telegram Top bar */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex items-center justify-between mb-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2952FF] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    目
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">Mekiki Agent</h4>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[11px] text-slate-400">bot · RYO Intelligence v2</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
                  Telegram Mini App
                </span>
              </div>

              {/* Chat Body */}
              <div className="space-y-4 py-2">
                {/* User Message Bubble */}
                <div className="flex justify-end">
                  <div className="bg-[#2952FF] text-white text-sm rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[80%] shadow-sm">
                    <p className="font-medium">{current.userPrompt}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-blue-100 mt-1">
                      <span>{current.time}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                    </div>
                  </div>
                </div>

                {/* Bot Response Bubble */}
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-800 text-sm rounded-2xl rounded-tl-none p-4 max-w-[95%] shadow-sm space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {current.botResponse.title}
                      </span>
                      <span className="rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5">
                        {current.botResponse.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {current.botResponse.thesis}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Setup:</span>
                        <span className="font-medium text-slate-900">{current.botResponse.entry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target:</span>
                        <span className="font-medium text-emerald-600">{current.botResponse.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Invalidation:</span>
                        <span className="font-medium text-rose-600">{current.botResponse.invalidation}</span>
                      </div>
                    </div>

                    {/* Evidence Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {current.botResponse.evidence.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Reasoning Hash: #89e2-mk</span>
                      <span>10:42 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
