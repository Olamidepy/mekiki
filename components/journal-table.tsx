import * as React from "react"
import { JournalEntry } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface JournalTableProps {
  entries: JournalEntry[]
}

export function JournalTable({ entries }: JournalTableProps) {
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const getOutcomeColor = (entry: JournalEntry) => {
    if (entry.outcomeStatus === "positive") return "text-emerald-600"
    if (entry.outcomeStatus === "negative") return "text-red-500"
    return "text-slate-500"
  }

  const formatOutcome = (entry: JournalEntry) => {
    if (entry.outcomeStatus === "flat" || entry.outcomePercent === 0) return "Flat"
    const prefix = entry.outcomePercent > 0 ? "+" : ""
    return `${prefix}${entry.outcomePercent.toFixed(1)}%`
  }

  return (
    <Card id="journal">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Decision journal
        </CardTitle>
        <span className="text-xs text-primary font-medium">
          {entries.length} tracked calls
        </span>
      </CardHeader>
      <CardContent>

      <div className="overflow-x-auto">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="font-medium text-slate-400 text-xs pb-2.5 pl-0">Token</TableHead>
              <TableHead className="font-medium text-slate-400 text-xs pb-2.5">Call</TableHead>
              <TableHead className="font-medium text-slate-400 text-xs pb-2.5">Conviction</TableHead>
              <TableHead className="font-medium text-slate-400 text-xs pb-2.5 text-right pr-0">Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {entries.map((entry) => (
              <TableRow
                key={entry.id}
                onClick={() => {
                  setSelectedEntry(entry)
                  setModalOpen(true)
                }}
                className="cursor-pointer transition-colors hover:bg-slate-50/70 border-b border-slate-100"
              >
                <TableCell className="py-3 font-semibold text-slate-900 pl-0">
                  {entry.symbol}
                </TableCell>
                <TableCell className="py-3 text-slate-600 text-xs">
                  {entry.timeAgo}
                </TableCell>
                <TableCell className="py-3 text-slate-600 font-medium text-xs">
                  {entry.conviction}
                </TableCell>
                <TableCell className={`py-3 font-semibold text-xs text-right pr-0 ${getOutcomeColor(entry)}`}>
                  {formatOutcome(entry)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </CardContent>

      {/* Detail Dialog */}
      {selectedEntry && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">
                Journal entry · {selectedEntry.symbol}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {selectedEntry.name} — {selectedEntry.timeAgo}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-xs pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Conviction score</span>
                  <span className="text-base font-bold text-slate-900">{selectedEntry.conviction} / 100</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Performance</span>
                  <span className={`text-base font-bold ${getOutcomeColor(selectedEntry)}`}>
                    {formatOutcome(selectedEntry)}
                  </span>
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Reasoning log notes</span>
                <p className="text-slate-700 leading-relaxed">{selectedEntry.notes || "Thesis active according to judge conviction rules."}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
