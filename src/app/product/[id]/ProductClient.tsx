"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "../../lib/products";

type CartItem = { id: string; variantId: string; qty: number };

export default function ProductClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState<string>(product.variants[0]?.id);

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId]
  );

  const addToBag = () => {
    const key = "miraya_cart";
    const existing: CartItem[] = JSON.parse(localStorage.getItem(key) || "[]");

    const next = [...existing];
    const idx = next.findIndex(
      (x) => x.id === product.id && x.variantId === selectedVariant.id
    );

    if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
    else next.push({ id: product.id, variantId: selectedVariant.id, qty: 1 });

    localStorage.setItem(key, JSON.stringify(next));
    alert("Added to bag 🛍️");
  };

  return (
    <main className="min-h-screen bg-[#fbfbf4] text-black">
      {/* Header */}
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
            href="/cart"
            className="rounded-xl border border-black/10 bg-white/55 px-4 py-2 text-sm text-black/80 backdrop-blur hover:bg-white/80"
          >
            Bag
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 bg-white">
            <Image
              src={product.images[activeImage]}
              alt={product.title}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="mt-4 grid grid-cols-5 gap-3">
            {product.images.slice(0, 5).map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-white ${
                  i === activeImage ? "border-black/40" : "border-black/10"
                }`}
                aria-label={`Image ${i + 1}`}
              >
                <Image src={src} alt="" fill className="object-contain p-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs tracking-[0.35em] text-black/50">MIRAYA</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {product.title}
          </h1>
          <p className="mt-2 text-black/60">{product.subtitle}</p>

          {/* Description */}
<p className="mt-5 text-[15px] leading-relaxed text-black/75 whitespace-pre-line">
  {product.description}
</p>

{/* Material */}
<div className="mt-6">
  <div className="text-sm font-semibold text-black/80">Material</div>
  <div className="mt-2 rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-black/70">
    {product.material}
  </div>
</div>

{/* Dimensions */}
<div className="mt-6">
  <div className="text-sm font-semibold text-black/80">Dimensions</div>
  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-black/70">
    {product.dimensions.map((d) => (
      <li key={d}>{d}</li>
    ))}
  </ul>
</div>

          {/* Variants */}
          <div className="mt-8">
            <div className="text-sm font-medium">Choose variant</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    v.id === selectedVariant.id
                      ? "border-black/40 bg-black text-white"
                      : "border-black/10 bg-white/70 text-black/70 hover:bg-white"
                  }`}
                >
                  {v.name} • ₹{v.price}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={addToBag}
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Add to bag • ₹{selectedVariant.price}
            </button>

            <Link
              href="/cart"
              className="rounded-xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black/80 hover:bg-white"
            >
              Go to bag →
            </Link>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}