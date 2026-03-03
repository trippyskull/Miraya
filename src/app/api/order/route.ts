import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const url = process.env.SHEETS_WEBAPP_URL;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Missing SHEETS_WEBAPP_URL in .env.local" },
        { status: 500 }
      );
    }

    const payload = await req.json();

    // Send as form-encoded payload=... (Apps Script supports this reliably)
    const body = new URLSearchParams({
      payload: JSON.stringify(payload),
    });

    const res = await fetch(url, {
      method: "POST",
      body,
      // NOTE: do NOT set Content-Type manually for URLSearchParams
    });

    const text = await res.text();

    // Try JSON parse, but don't crash if Google returns something odd
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: "Apps Script did not return JSON",
          raw: text.slice(0, 200),
        },
        { status: 500 }
      );
    }

    if (!data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Order failed in Apps Script" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}