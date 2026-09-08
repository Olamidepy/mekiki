import type { Metadata } from "next"
import "./globals.css"

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased font-sans selection:bg-[#2952FF] selection:text-white">
        {children}
      </body>
    </html>
  )
}
