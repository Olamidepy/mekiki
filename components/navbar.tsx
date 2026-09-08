"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Send, CheckCircle2, ShieldCheck } from "lucide-react"

interface NavbarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Navbar({ activeTab = "overview", onTabChange }: NavbarProps) {
  const [telegramConnected, setTelegramConnected] = React.useState(false)
  const [connectOpen, setConnectOpen] = React.useState(false)

  const navItems = [
    { id: "overview", label: "Overview", href: "#overview" },
    { id: "discover", label: "Discover", href: "#verdicts" },
    { id: "journal", label: "Journal", href: "#journal" },
    { id: "agents", label: "Agents", href: "#watchlist" },
  ]

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    onTabChange?.(id)
    const el = document.getElementById(id === "overview" ? "hero" : id === "discover" ? "verdicts" : id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2952FF] flex items-center justify-center text-white shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L2 20H22L12 3Z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-bold text-[18px] tracking-tightish text-slate-900">Mekiki</span>
            <span className="text-slate-400 text-sm font-normal ml-0.5 select-none">目利き</span>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`transition-colors font-medium ${
                  isActive
                    ? "text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
            <DialogTrigger asChild>
              <Button
                variant={telegramConnected ? "outline" : "default"}
                size="default"
                className={telegramConnected ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100" : "bg-[#2952FF] hover:bg-[#1f3fd6] text-white"}
              >
                {telegramConnected ? (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Connected @mekiki_agent_bot
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    Connect Telegram
                  </span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect Telegram Mini App</DialogTitle>
                <DialogDescription>
                  Pair your browser session with the Telegram intelligence bot to receive instant alerts and practice trade notifications.
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm space-y-3 mt-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2952FF] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Synchronized reasoning engine</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Both the Telegram bot and this web dashboard share the exact same RYO market research tool passes and LLM judge verdicts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 mt-4">
                <Button
                  className="w-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white"
                  onClick={() => {
                    setTelegramConnected(true)
                    setConnectOpen(false)
                  }}
                >
                  {telegramConnected ? "Re-sync session" : "Authorize session"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setConnectOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
