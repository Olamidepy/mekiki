"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavbarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Navbar({ activeTab = "overview", onTabChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 -mr-1">
              <Image
                src="/images/mekiki-icon.png"
                alt="Mekiki Logo"
                width={44}
                height={44}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none scale-125"
                priority
              />
            </div>
            <span className="font-bold text-lg sm:text-[19px] tracking-tight text-slate-900 inline-flex items-center">
              Mekiki
            </span>
          </Link>
        </div>

        {/* Desktop navigation links */}
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

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Action CTA: Direct link to Telegram Bot (hidden on tiny screens, or compact) */}
          <Button asChild variant="default" size="sm" className="h-9 px-3 sm:px-4 text-xs sm:text-sm font-medium">
            <a
              href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "mekiki_agent_bot"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hidden xs:inline sm:inline">Connect</span> Telegram
            </a>
          </Button>

          {/* Mobile hamburger drawer menu using standard shadcn Sheet */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-sm flex flex-col justify-between">
              <div>
                <SheetHeader className="text-left pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/mekiki-icon.png"
                      alt="Mekiki Logo"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                    <SheetTitle className="font-bold text-lg text-slate-900">
                      Mekiki
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col space-y-3 pt-6">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(item.id, e)}
                        className={`text-base font-medium px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-slate-100 text-slate-900 font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <Button asChild className="w-full bg-[#2952FF] hover:bg-[#1f3fd6] text-white">
                  <a
                    href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "mekiki_agent_bot"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Telegram Bot
                  </a>
                </Button>
                <p className="text-center text-xs text-slate-400">
                  Telegram-native intelligence agent
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
