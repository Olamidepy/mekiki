import { NextRequest, NextResponse } from "next/server"
import { generateVerdict } from "@/lib/agent/reasoning-engine"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const symbol = searchParams.get("symbol") || "SOL"

  try {
    const verdict = await generateVerdict(symbol)
    return NextResponse.json({ ok: true, verdict })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to generate verdict", details: String(err) },
      { status: 500 }
    )
  }
}
