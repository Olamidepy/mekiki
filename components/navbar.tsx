import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Navbar({ activeTab = "overview", onTabChange }: NavbarProps) {

  const navItems = [
    { id: "hero", label: "Overview", href: "#hero" },
    { id: "verdicts", label: "Verdicts", href: "#verdicts" },
    { id: "journal", label: "Journal", href: "#journal" },
    { id: "methodology", label: "Methodology", href: "#methodology" },
    { id: "performance", label: "Performance", href: "#performance" },
    { id: "protocol", label: "Protocol", href: "#protocol" },
  ]

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    onTabChange?.(id)
    const el = document.getElementById(id)
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
            <div className="w-8 h-8 rounded-full bg-[#2952FF] flex items-center justify-center text-white shadow-sm font-semibold text-xs">
              目
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

        {/* Action CTA: Direct link to Telegram Bot */}
        <div className="flex items-center gap-3">
          <Button asChild variant="default" size="default">
            <a
              href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "mekiki_agent_bot"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect Telegram
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
