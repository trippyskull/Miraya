"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../lib/products";

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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
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

  const subtotal = useMemo(() => {
    return enriched.reduce((sum, it) => sum + it.variant.price * it.qty, 0);
  }, [enriched]);

  const updateQty = (id: string, variantId: string, delta: number) => {
    const next = items
      .map((x) => {
        if (x.id !== id || x.variantId !== variantId) return x;
        return { ...x, qty: x.qty + delta };
      })
      .filter((x) => x.qty > 0);

    setItems(next);
    writeCart(next);
  };

  const removeItem = (id: string, variantId: string) => {
    const next = items.filter((x) => !(x.id === id && x.variantId === variantId));
    setItems(next);
    writeCart(next);
  };

  const clearBag = () => {
    setItems([]);
    writeCart([]);
  };

  return (
    <main className="min-h-screen bg-[#fbfbf4] text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbfbf4]/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/hero/logo.png"
              alt="Miraya"
              width={160}
              height={60}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-black/10 bg-white/55 px-4 py-2 text-sm text-black/80 backdrop-blur hover:bg-white/80"
          >
            Continue shopping
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-black/50">BAG</p>
            <h1 className="mt-2 text-3xl font-semibold">Your bag</h1>
            <p className="mt-2 text-black/60">
              Cash on Delivery only at checkout.
            </p>
          </div>

          {enriched.length > 0 && (
            <button
              onClick={clearBag}
              className="text-sm text-black/60 hover:text-black"
            >
              Clear bag
            </button>
          )}
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
            {/* Items */}
            <div className="space-y-4">
              {enriched.map((it) => (
                <div
                  key={`${it.id}-${it.variantId}`}
                  className="rounded-3xl border border-black/10 bg-white/60 p-5"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-black/10 bg-white">
                      <Image
                        src={it.product.images[0]}
                        alt={it.product.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold">
                            {it.product.title}
                          </div>
                          <div className="mt-1 text-sm text-black/60">
                            {it.variant.name}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(it.id, it.variantId)}
                          className="text-sm text-black/50 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* qty */}
                        <div className="inline-flex items-center overflow-hidden rounded-full border border-black/10 bg-white">
                          <button
                            onClick={() => updateQty(it.id, it.variantId, -1)}
                            className="px-3 py-2 text-sm hover:bg-black/5"
                          >
                            −
                          </button>
                          <div className="px-4 py-2 text-sm">{it.qty}</div>
                          <button
                            onClick={() => updateQty(it.id, it.variantId, +1)}
                            className="px-3 py-2 text-sm hover:bg-black/5"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm text-black/70">
                          ₹{it.variant.price} × {it.qty}{" "}
                          <span className="font-semibold text-black">
                            = ₹{it.variant.price * it.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-black/10 bg-white/70 p-6">
              <div className="text-lg font-semibold">Order summary</div>
              <div className="mt-4 flex items-center justify-between text-sm text-black/70">
                <span>Subtotal</span>
                <span className="font-medium text-black">₹{subtotal}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-black/70">
                <span>Shipping</span>
                <span className="font-medium text-black">₹0</span>
              </div>

              <div className="mt-4 border-t border-black/10 pt-4 flex items-center justify-between">
                <span className="text-sm text-black/70">Total</span>
                <span className="text-xl font-semibold">₹{subtotal}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Buy now (COD)
              </Link>

              <p className="mt-3 text-xs text-black/50">
                Payment method: Cash on Delivery only.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}