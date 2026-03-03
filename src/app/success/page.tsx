"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("miraya_last_order");
      if (!raw) return;
      const o = JSON.parse(raw);
      setOrderId(o?.id || "");
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfbf4] text-black">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
        <p className="text-xs tracking-[0.35em] text-black/50">ORDER PLACED</p>
        <h1 className="mt-4 text-4xl font-semibold">Thank you!</h1>
        <p className="mt-3 text-black/60">
          Your order has been placed successfully.
          <br />
          Payment method: <span className="font-semibold">Cash on Delivery</span>
        </p>

        {orderId && (
          <div className="mt-6 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm text-black/70">
            Order ID: <span className="font-semibold text-black">{orderId}</span>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Back to home
          </Link>
          <Link
            href="/#products"
            className="rounded-xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black/80 hover:bg-white"
          >
            Shop more
          </Link>
        </div>
      </div>
    </main>
  );
}