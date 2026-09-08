import * as React from "react"
import { Verdict } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

interface VerdictCardProps {
  verdict: Verdict
  onViewReasoning: (verdict: Verdict) => void
  onPracticeTrade: (verdict: Verdict) => void
}

export function VerdictCard({
  verdict,
  onViewReasoning,
  onPracticeTrade,
}: VerdictCardProps) {
  const getBadgeVariant = () => {
    switch (verdict.stance) {
      case "Long":
        return "default"
      case "Short":
        return "destructive"
      case "Neutral":
      default:
        return "secondary"
    }
  }

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base font-semibold">{verdict.pair}</CardTitle>
          <CardDescription className="text-xs">{verdict.name}</CardDescription>
        </div>
        <Badge variant={getBadgeVariant()}>
          {verdict.stance}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">
            {verdict.conviction}
          </span>
          <span className="text-xs text-muted-foreground">
            / 100 conviction
          </span>
        </div>

        {/* Bull / Bear Split Bar */}
        <div className="space-y-1.5">
          <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-secondary">
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{ width: `${verdict.bullPercent}%` }}
            />
            <div
              className="bg-rose-500 transition-all duration-500"
              style={{ width: `${verdict.bearPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-emerald-600">Bull {verdict.bullPercent}%</span>
            <span className="text-rose-600">Bear {verdict.bearPercent}%</span>
          </div>
        </div>

        {/* Evidence Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {verdict.evidence.map((chip) => (
            <Badge key={chip.id} variant="outline" className="text-[11px] font-normal">
              {chip.label}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewReasoning(verdict)}
        >
          View reasoning
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onPracticeTrade(verdict)}
        >
          Practice trade
        </Button>
      </CardFooter>
    </Card>
  )
}
