"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../lib/products";
import { useLoading } from "../components/LoadingProvider";

type CartItem = { id: string; variantId: string; qty: number };

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("miraya_cart") || "[]");
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem("miraya_cart", JSON.stringify(items));
}

export default function CheckoutPage() {
const { start, stop } = useLoading();
const [placing, setPlacing] = useState(false);
    
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const c = readCart();
    setItems(c);
    setLoading(false);
  }, []);

  const enriched = useMemo(() => {
    return items
      .map((it) => {
        const product = PRODUCTS.find((p) => p.id === it.id);
        if (!product) return null;
        const variant = product.variants.find((v) => v.id === it.variantId);
        if (!variant) return null;
        return { ...it, product, variant };
      })
      .filter(Boolean) as Array<
      CartItem & {
        product: (typeof PRODUCTS)[number];
        variant: (typeof PRODUCTS)[number]["variants"][number];
      }
    >;
  }, [items]);

  const total = useMemo(
    () => enriched.reduce((sum, it) => sum + it.variant.price * it.qty, 0),
    [enriched]
  );

  const placeOrder = async () => {
  // validation
  if (!name.trim()) return alert("Please enter your name.");
  if (!phone.trim()) return alert("Please enter your phone number.");
  if (!email.trim()) return alert("Please enter your email.");
  if (!address.trim()) return alert("Please enter your address.");
  if (enriched.length === 0) return alert("Your bag is empty.");

  const url = process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL;
  if (!url) return alert("Missing Sheets URL in .env.local");

  setPlacing(true);
  start(); // ✅ show loader immediately

  const payload = {
    name,
    email,
    phone,
    address,
    payment: "COD",
    total,
    items: enriched.map((it) => ({
      id: it.id,
      variantId: it.variantId,
      qty: it.qty,
    })),
  };

  try {
    // IMPORTANT: Apps Script expects form-encoded payload
    const body = new URLSearchParams({ payload: JSON.stringify(payload) });

    const res = await fetch(url, {
      method: "POST",
      body,
    });

    const data = await res.json().catch(() => null);

    if (!data?.ok) {
      stop();
      setPlacing(false);
      return alert("Order failed. Try again.");
    }

    localStorage.setItem("miraya_cart", "[]");

    // let loader be visible for a tiny moment (feels premium)
    setTimeout(() => {
      window.location.href = "/success";
    }, 350);
  } catch (err) {
    stop();
    setPlacing(false);
    alert("Network error. Try again.");
  }
};

  if (loading) return null;

  return (
    <main className="min-h-screen bg-[#fbfbf4] text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbfbf4]/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.22em]">
            MIRAYA
          </Link>
          <Link
            href="/cart"
            className="rounded-xl border border-black/10 bg-white/55 px-4 py-2 text-sm text-black/80 backdrop-blur hover:bg-white/80"
          >
            Back to bag
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-black/50">CHECKOUT</p>
            <h1 className="mt-2 text-3xl font-semibold">Delivery details</h1>
            <p className="mt-2 text-black/60">
              Payment method:{" "}
              <span className="font-semibold">Cash on Delivery</span>
            </p>
          </div>
        </div>

        {enriched.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white/60 p-10 text-center">
            <p className="text-black/60">Your bag is empty.</p>
            <Link
              href="/#products"
              className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Shop products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* form */}
            <div className="rounded-3xl border border-black/10 bg-white/60 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm text-black/70">Full name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm text-black/70">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="text-sm text-black/70">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                    placeholder="Email"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-black/70">Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 min-h-[120px] w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                    placeholder="House no, street, city, state, pincode"
                  />
                </div>
              </div>

              <button
  onClick={placeOrder}
  disabled={placing}
  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
>
  {placing ? "Placing order..." : "Place order (COD)"}
</button>

              <p className="mt-3 text-xs text-black/50">
                Your order will be confirmed via phone/email. COD only.
              </p>
            </div>

            {/* summary */}
            <aside className="h-fit rounded-3xl border border-black/10 bg-white/70 p-6">
              <div className="text-lg font-semibold">Order summary</div>

              <div className="mt-4 space-y-3">
                {enriched.map((it) => (
                  <div
                    key={`${it.id}-${it.variantId}`}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div>
                      <div className="font-medium">{it.product.title}</div>
                      <div className="text-black/60">
                        {it.variant.name} × {it.qty}
                      </div>
                    </div>
                    <div className="font-medium">₹{it.variant.price * it.qty}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-black/10 pt-4 flex items-center justify-between">
                <span className="text-sm text-black/70">Total</span>
                <span className="text-xl font-semibold">₹{total}</span>
              </div>

              <div className="mt-3 text-xs text-black/50">
                Shipping: ₹0 • Payment: COD
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}