"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { Activity, Layers, Scale, ShieldCheck } from "lucide-react"

export function IntelDocumentation() {
  const performanceData = [
    {
      regime: "Risk-On Expansion",
      signals: 142,
      winRate: "81.6%",
      avgRr: "3.24 : 1",
      profitFactor: "2.88",
      avgHold: "18h 40m",
      maxDd: "-4.2%",
    },
    {
      regime: "Selective Range",
      signals: 98,
      winRate: "73.5%",
      avgRr: "2.65 : 1",
      profitFactor: "2.12",
      avgHold: "11h 15m",
      maxDd: "-5.8%",
    },
    {
      regime: "High-Volatility Choppy",
      signals: 64,
      winRate: "68.8%",
      avgRr: "2.40 : 1",
      profitFactor: "1.79",
      avgHold: "6h 50m",
      maxDd: "-7.1%",
    },
    {
      regime: "Capitulation / Flush",
      signals: 38,
      winRate: "76.3%",
      avgRr: "3.80 : 1",
      profitFactor: "3.10",
      avgHold: "24h 10m",
      maxDd: "-3.5%",
    },
  ]

  return (
    <div className="space-y-24 mt-28 md:mt-36">
      {/* Section 1: Deep Architectural Long-Read */}
      <section id="methodology" className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline">Architecture &amp; Methodology</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How the intelligence engine evaluates market conviction
          </h2>
          <div className="w-14 h-1 bg-[#2952FF] rounded-full mt-1.5" />
          <p className="text-base text-muted-foreground leading-relaxed pt-1">
            Conventional crypto bots propagate raw technical indicators with zero context. Mekiki was built as an adversarial reasoning pipeline where potential setups are subjected to exhaustive counter-arguments, orderflow verification, and strict invalidation criteria before a final conviction score is computed.
          </p>
        </div>

        <BentoGrid className="grid-cols-1 md:grid-cols-2 auto-rows-auto md:auto-rows-[19rem] gap-4 sm:gap-6">
          <BentoCard
            name="Phase 01: Multi-Venue Microstructure & CVD"
            className="col-span-1"
            Icon={Activity}
            description="Aggregates spot and perpetual orderbooks across liquid venues. Evaluates Cumulative Volume Delta (CVD) to identify aggressive market participants versus passive limit absorption."
            href="#methodology"
            cta="Ingestion Pipeline"
            background={
              <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-to-br from-[#2952FF]/15 via-transparent to-transparent blur-2xl transform-gpu group-hover:scale-150 transition-all duration-500" />
            }
          />

          <BentoCard
            name="Phase 02: Multi-Timeframe Structure & FVG"
            className="col-span-1"
            Icon={Layers}
            description="Aligns 15m, 1h, and 4h price action to algorithmically detect Fair Value Gaps, Point of Control (PoC), and liquidity sweeps above prior session highs and lows."
            href="#methodology"
            cta="Structural Mapping"
            background={
              <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500/15 via-transparent to-transparent blur-2xl transform-gpu group-hover:scale-150 transition-all duration-500" />
            }
          />

          <BentoCard
            name="Phase 03: Adversarial Dual-Agent Debate"
            className="col-span-1"
            Icon={Scale}
            description="Autonomous Bull and Bear agents stress-test hypotheses simultaneously. The Bull builds continuation arguments while the Bear hunts for falsification traps and liquidity overhangs."
            href="#methodology"
            cta="Debate Protocol"
            background={
              <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-to-br from-purple-500/15 via-transparent to-transparent blur-2xl transform-gpu group-hover:scale-150 transition-all duration-500" />
            }
          />

          <BentoCard
            name="Phase 04: Judge Scoring & Invalidation Gating"
            className="col-span-1"
            Icon={ShieldCheck}
            description="Arbitrates opposing arguments to compute a 0–100 integer conviction score. Enforces a non-negotiable structural invalidation stop and a mandatory minimum 2.0x Risk-to-Reward ratio."
            href="#methodology"
            cta="Risk Invalidation"
            background={
              <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-to-br from-emerald-500/15 via-transparent to-transparent blur-2xl transform-gpu group-hover:scale-150 transition-all duration-500" />
            }
          />
        </BentoGrid>
      </section>

      <Separator />

      {/* Section 2: Performance Attribution & Validation Table */}
      <section id="performance" className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline">Empirical Verification</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Performance attribution across historical market regimes
          </h2>
          <div className="w-14 h-1 bg-[#2952FF] rounded-full mt-1.5" />
          <p className="text-base text-muted-foreground leading-relaxed pt-1">
            Market regimes dictate strategy efficacy. Mekiki adapts its conviction thresholds based on macro regime tracking, ensuring high activity during verified trend expansions and capital preservation during choppy consolidations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Regime-segmented signal tracking (Last 30 Days)</CardTitle>
            <CardDescription>
              Aggregated across all tracked perpetual contracts with minimum 2.0x R:R gating
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market Regime</TableHead>
                    <TableHead className="text-right">Tracked Signals</TableHead>
                    <TableHead className="text-right">Win Rate</TableHead>
                    <TableHead className="text-right">Avg Realized R:R</TableHead>
                    <TableHead className="text-right">Profit Factor</TableHead>
                    <TableHead className="text-right">Avg Duration</TableHead>
                    <TableHead className="text-right">Max Drawdown</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((row) => (
                    <TableRow key={row.regime}>
                      <TableCell className="font-medium text-slate-900">
                        {row.regime}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {row.signals}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600">
                        {row.winRate}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {row.avgRr}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {row.profitFactor}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs">
                        {row.avgHold}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-rose-500">
                        {row.maxDd}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 border-t pt-4 text-xs text-muted-foreground leading-relaxed space-y-1">
              <p>
                <strong>Methodology Note:</strong> Signals are marked as winning when Take Profit target 1 is attained prior to the invalidation stop being triggered. Trades that breach the invalidation price are immediately closed with full loss realization.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Section 3: Telegram Mini App & API Command Reference */}
      <section id="protocol" className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline">Telegram Native Protocol</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Command specifications &amp; terminal protocol
          </h2>
          <div className="w-14 h-1 bg-[#2952FF] rounded-full mt-1.5" />
          <p className="text-base text-muted-foreground leading-relaxed pt-1">
            The Mekiki web application and Telegram Mini App (@mekiki_agent_bot) operate on a single synchronized state engine. Commands executed in Telegram reflect instantaneously in the web decision journal.
          </p>
        </div>

        <Tabs defaultValue="commands" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="commands">Commands</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="commands" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Core Interactive Commands</CardTitle>
                <CardDescription>
                  Syntax recognized by the Telegram bot for ad-hoc market interrogation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md divide-y text-sm">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <code className="font-semibold text-primary">/verdict [symbol]</code>
                      <p className="text-muted-foreground text-xs mt-1">
                        Requests immediate multi-pass consensus for a specific token (e.g. /verdict SOL).
                      </p>
                    </div>
                    <Badge variant="secondary">Output: Full Bull/Bear Card</Badge>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <code className="font-semibold text-primary">/scan [category]</code>
                      <p className="text-muted-foreground text-xs mt-1">
                        Scans 80+ pairs for volume surges, funding anomalies, and momentum divergence.
                      </p>
                    </div>
                    <Badge variant="secondary">Output: Top 3 Candidates</Badge>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <code className="font-semibold text-primary">/regime</code>
                      <p className="text-muted-foreground text-xs mt-1">
                        Returns current macro state: Fear &amp; Greed, BTC Dominance, and aggregate market breadth.
                      </p>
                    </div>
                    <Badge variant="secondary">Output: Regime Summary</Badge>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <code className="font-semibold text-primary">/journal</code>
                      <p className="text-muted-foreground text-xs mt-1">
                        Retrieves your last 10 simulated paper trades and calculates rolling net PnL and hit rate.
                      </p>
                    </div>
                    <Badge variant="secondary">Output: Journal Ledger</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Paper Trading Execution Protocol</CardTitle>
                <CardDescription>
                  1-tap simulated trade allocation and automatic invalidation tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Users can practice execution without risking capital. Executing a simulated order registers the entry price against real-time exchange orderbook depth:
                </p>
                <div className="p-4 bg-muted rounded-md font-mono text-xs text-foreground space-y-1">
                  <p>// Command syntax</p>
                  <p>/paper [action] [symbol] [notional_size]</p>
                  <p>// Example: Long $2,500 of SOL at market price</p>
                  <p>/paper buy SOL 2500</p>
                </div>
                <p>
                  The system automatically calculates recommended position sizing based on account balance and stop loss distance, adhering to a strict maximum 2% portfolio risk guideline.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-Time Alert Dispatch Architecture</CardTitle>
                <CardDescription>
                  Sub-500ms push notification delivery to private users and group channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  When the LLM judge engine produces a verdict with conviction exceeding 80/100, a high-priority dispatch event is triggered. Notifications are formatted as rich Telegram inline cards containing:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>Direct entry price range and target multiples (TP1, TP2)</li>
                  <li>Structural invalidation price with time-based cancellation rules</li>
                  <li>Key evidence chips synthesized from orderflow and technical passes</li>
                  <li>Inline buttons for 1-tap paper execution directly inside Telegram</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 bg-slate-50 border rounded-xl">
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Connect directly on Telegram</h4>
            <p className="text-xs text-muted-foreground">
              Interrogate tokens, receive conviction alerts, and execute paper trades in Telegram.
            </p>
          </div>
          <Button asChild className="rounded-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white w-full sm:w-auto text-xs sm:text-sm">
            <a
              href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "mekiki_agent_bot"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect Telegram Bot
            </a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Section 4: Comprehensive FAQ Long-Read */}
      <section id="faq" className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline">Knowledge Base</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions &amp; operational parameters
          </h2>
          <div className="w-14 h-1 bg-[#2952FF] rounded-full mt-1.5" />
          <p className="text-base text-muted-foreground leading-relaxed pt-1">
            Technical answers to common operational questions regarding agent autonomy, data source latency, and risk mitigation models.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Why does Mekiki output "Neutral" or "Avoid" so frequently?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              High-frequency trading produces negative expected value for retail participants due to exchange fees and chop. Mekiki filters out over 85% of market noise, publishing active trade stances only when asymmetrical upside with high conviction is verified. Capital preservation during choppy regimes is the primary alpha source.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">How are token invalidation stops determined?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Invalidation levels are never based on arbitrary percentage stops (e.g. static -2%). Instead, they are pegged to market structural failure points: Fair Value Gap invalidation, swing low breaks on the 4H chart, or unexpected reversals in Cumulative Volume Delta that prove the original thesis incorrect.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can Mekiki connect directly to my live exchange account?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Mekiki operates in safe-by-design advisory and simulated paper-trading mode. This ensures complete capital security with zero private key custody, API secret hazards, or unauthorized asset movements. Live non-custodial execution modules can be plugged in optionally via dedicated smart account vaults.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">What latency guarantees does the Telegram alert bot maintain?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              From the moment an exchange orderbook anomaly is detected to the final conclusion of the LLM judge consensus pass, the end-to-end pipeline executes in under 420 milliseconds. Telegram delivery typically arrives within 1 to 2 seconds of threshold confirmation.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
