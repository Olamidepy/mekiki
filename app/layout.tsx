import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mekiki (目利き) — Trading Intelligence Agent",
  description: "Telegram-native trading intelligence agent built on RYO market research tools with transparent bull/bear/judge reasoning passes.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 antialiased font-sans selection:bg-[#2952FF] selection:text-white">
        {children}
      </body>
    </html>
  )
}
