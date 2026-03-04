"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "./lib/products";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// ✅ your hero images (.png)
const HERO_SLIDES = [
  { src: "/hero/homepageimg1.png", alt: "Miraya hero painting 1" },
  { src: "/hero/homepageimg2.png", alt: "Miraya hero painting 2" },
  { src: "/hero/homepageimg3.png", alt: "Miraya hero painting 3" },
];

// ✅ bottom strip images (.png)
const BOTTOM_SLIDES = [
  { src: "/hero/homebottom1.png", alt: "Bottom strip 1" },
  { src: "/hero/homebottom2.png", alt: "Bottom strip 2" },
  { src: "/hero/homebottom3.png", alt: "Bottom strip 3" },
  { src: "/hero/homebottom4.png", alt: "Bottom strip 4" },
  { src: "/hero/homebottom5.png", alt: "Bottom strip 5" },
];

function useAutoSlider(count: number, ms: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearInterval(t);
  }, [count, ms]);
  return [index, setIndex] as const;
}

function PaperTexture() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* paper base */}
      <div className="absolute inset-0 bg-[#fbfbf4]" />

      {/* watercolor washes (light red, blue, yellow, green) */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-rose-300/25 blur-3xl" />
      <div className="absolute top-10 -right-44 h-[620px] w-[620px] rounded-full bg-sky-300/22 blur-3xl" />
      <div className="absolute bottom-[-140px] left-1/4 h-[560px] w-[560px] rounded-full bg-amber-200/28 blur-3xl" />
      <div className="absolute bottom-[-180px] right-1/4 h-[520px] w-[520px] rounded-full bg-emerald-200/18 blur-3xl" />

      {/* soft edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_40%,transparent_55%,rgba(0,0,0,0.05)_100%)]" />

      {/* paper grain */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

function BottomStripSlider() {
  // ✅ auto-only, 3 seconds
  const [active] = useAutoSlider(BOTTOM_SLIDES.length, 3000);
  const current = useMemo(() => BOTTOM_SLIDES[active], [active]);

  return (
    <div className="relative w-full">
      <div className="relative h-[160px] sm:h-[190px] md:h-[220px] w-full overflow-hidden">
        <AnimatePresence mode="popLayout">
          <m.div
            key={current.src}
            initial={{ x: "-10%", opacity: 0.98, scale: 1.01 }}
            animate={{ x: "0%", opacity: 1, scale: 1 }}
            exit={{ x: "10%", opacity: 0.98, scale: 1.01 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </m.div>
        </AnimatePresence>
      </div>

      {/* small dots on bottom strip (display only; not clickable) */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {BOTTOM_SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full border border-black/20 transition ${
              i === active ? "bg-black/70" : "bg-white/70"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  // ✅ auto-only, 3 seconds
  const [active] = useAutoSlider(HERO_SLIDES.length, 3000);
  const current = useMemo(() => HERO_SLIDES[active], [active]);

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#fbfbf4] text-black pt-[72px]">
        {/* Sticky header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-[#fbfbf4]/75 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/hero/logof.png"
                alt="Miraya"
                width={2000}
                height={400}
                priority
                className="h-13 w-auto"
                style={{ imageRendering: "auto" }}
              />
            </Link>

            <nav className="hidden gap-7 text-sm text-black/60 sm:flex">
              <a className="hover:text-black" href="#products">
                Shop
              </a>
              <a className="hover:text-black" href="#about">
                About
              </a>
              <a className="hover:text-black" href="#about-contact">
                Contact Us
              </a>
            </nav>

            <Link
              href="/cart"
              className="rounded-xl border border-black/10 bg-white/55 px-4 py-2 text-sm text-black/80 backdrop-blur hover:bg-white/80"
            >
              Bag
            </Link>
          </div>
        </header>

        {/* HERO: sticky slideshow */}
        <section className="relative">
          <div className="sticky top-[72px] z-10 h-[72vh] overflow-hidden border-b border-black/10">
            <PaperTexture />

            <div className="relative mx-auto h-full max-w-7xl px-6 py-8">
              <div className="relative h-full overflow-hidden rounded-[32px] border border-black/10 bg-white/30 shadow-[0_30px_120px_rgba(0,0,0,0.10)]">
                <AnimatePresence mode="popLayout">
                  <m.div
                    key={current.src}
                    initial={{ x: "-12%", opacity: 0.9, scale: 1.01 }}
                    animate={{ x: "0%", opacity: 1, scale: 1 }}
                    exit={{ x: "12%", opacity: 0.9, scale: 1.01 }}
                    transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1100px"
                    />

                    {/* paint-like overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(255,255,255,0.45),transparent_60%),radial-gradient(900px_circle_at_80%_70%,rgba(255,255,255,0.25),transparent_60%)]" />
                    <div className="absolute inset-0 opacity-[0.10] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />
                  </m.div>
                </AnimatePresence>

                {/* Hero text overlay */}
                <div className="absolute left-6 top-6 z-20 sm:left-10 sm:top-10">
                  <div className="max-w-md rounded-[26px] border border-black/10 bg-white/40 p-5 backdrop-blur-md shadow-[0_18px_70px_rgba(0,0,0,0.10)]">
                    

                    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                      Miraya
                    </h1>

                    <p className="mt-2 text-base sm:text-lg font-semibold text-black/80">
                      The bag they’ll ask about before they say hello.
                    </p>
                  </div>
                </div>

                {/* dots (display only; not clickable) */}
                <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
                  {HERO_SLIDES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full border border-black/20 transition ${
                        i === active ? "bg-black/70" : "bg-white/70"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#fbfbf4]" />
          </div>
        </section>

        {/* OVERLAP SECTION */}
        <section id="products" className="relative z-20 -mt-28">
          <div className="mx-auto max-w-7xl px-6 pb-24">
            <div className="rounded-[32px] border border-black/10 bg-white/60 p-6 backdrop-blur shadow-[0_40px_140px_rgba(0,0,0,0.12)]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs tracking-[0.35em] text-black/50">
                    COLLECTION
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Shop products</h2>
                  <p className="mt-1 text-sm text-black/60">
                    Open any product to see 5 images + variants.
                  </p>
                </div>

                <div className="mt-4 flex gap-2 sm:mt-0">
                  <a
                    href="#about"
                    className="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/70 hover:bg-white"
                  >
                    About
                  </a>
                  <Link
                    href="/cart"
                    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    View bag
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="group overflow-hidden rounded-3xl border border-black/10 bg-white/70 transition hover:bg-white hover:shadow-[0_30px_120px_rgba(0,0,0,0.10)]"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-white">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-contain p-6 transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold">{p.title}</div>
                          <div className="mt-1 text-sm text-black/60">
                            {p.subtitle}
                          </div>
                        </div>
                        <div className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/70">
                          ₹{p.variants[0].price}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 text-sm text-black/50">
                        View details →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ✅ BOTTOM STRIP SLIDER */}
        <section id="about" className="relative border-t border-black/10">
          <PaperTexture />
          <div className="relative w-full">
            <BottomStripSlider />
          </div>
        </section>

        {/* ABOUT + CONTACT */}
        <section id="about-contact" className="relative border-t border-black/10">
          <PaperTexture />

          <div className="relative mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* About Us */}
              <div className="relative rounded-[32px] border border-black/10 bg-white/65 p-8 backdrop-blur shadow-[0_35px_120px_rgba(0,0,0,0.10)]">
                <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] tracking-[0.35em] text-black/60">
                  ABOUT US
                </div>

                <h3 className="mt-5 text-2xl font-semibold">Miraya</h3>

                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-black/75">
                  Let’s be honest: nobody actually wants to discuss the weather or
                  "how the commute was" at a party. At Miraya, we’re a proudly Indian brand on a mission to save you from boring social interactions by creating bags that look like anything except a bag.

                  Whether you're carrying a whimsical teapot or a blooming flower bouquet, our designs are crafted to be your ultimate social wing-woman. We believe your accessories should be as bold and "out there" as your personality. Why blend in when you can walk into a room and immediately become a person of mystery? Are you a tea enthusiast? A floral mastermind? No, you’re just someone with impeccable (and slightly eccentric) taste.

                  As our tagline goes, we create "The bag they’ll ask about before they say hello". Because let’s face it: this bag is your conversation starter, so you don't have to be.
                </p>

                <div className="pointer-events-none mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-rose-200/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-10 h-56 w-56 rounded-full bg-sky-200/20 blur-3xl" />
              </div>

              {/* Contact */}
              <div className="relative rounded-[32px] border border-black/10 bg-white/65 p-8 backdrop-blur shadow-[0_35px_120px_rgba(0,0,0,0.10)]">
                <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] tracking-[0.35em] text-black/60">
                  CONTACT
                </div>

                <h3 className="mt-5 text-2xl font-semibold">Let’s talk</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/70">
                  Want to collaborate, gift someone something wild, or just say hi?
                  Reach out — we reply fast.
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
                    <div className="text-xs tracking-[0.25em] text-black/50">
                      EMAIL
                    </div>
                    <a
                      href="mailto:airbnb.yash@gmail.com"
                      className="mt-1 block text-[15px] font-medium text-black/80 hover:text-black"
                    >
                      airbnb.yash@gmail.com
                    </a>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
                    <div className="text-xs tracking-[0.25em] text-black/50">
                      INSTAGRAM
                    </div>
                    <a
                      href="https://instagram.com/mirayaabags"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-[15px] font-medium text-black/80 hover:text-black"
                    >
                      @mirayaabags
                    </a>
                  </div>
                </div>

                <p className="mt-6 text-xs text-black/50">
                  Tip: The best messages start with a weird compliment.
                </p>

                <div className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-emerald-200/18 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-black/10 py-10 text-center text-sm text-black/50">
          © {new Date().getFullYear()} Miraya. All rights reserved.
        </footer>
      </main>
    </LazyMotion>
  );
}