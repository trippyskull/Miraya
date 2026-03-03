"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function Bag1() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <path
        d="M18 24c0-8 6-14 14-14s14 6 14 14"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 24h32c3 0 6 3 6 6l-3 22c-.3 2.7-2.6 5-5.4 5H18.4c-2.8 0-5.1-2.3-5.4-5L10 30c0-3 3-6 6-6Z"
        fill="rgba(255,255,255,0.16)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
    </svg>
  );
}
function Bag2() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <path
        d="M22 24c0-6 4-11 10-11s10 5 10 11"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 26h36l-3 26c-.3 2.9-2.7 5-5.6 5H22.6c-2.9 0-5.3-2.1-5.6-5L14 26Z"
        fill="rgba(255,255,255,0.16)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
      <path
        d="M20 34h24"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Bag3() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <path
        d="M20 23c1-7 6-12 12-12s11 5 12 12"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 26c6-4 16-6 20-6s14 2 20 6l-3 25c-.3 3-2.8 6-6 6H21c-3.2 0-5.7-3-6-6l-3-25Z"
        fill="rgba(255,255,255,0.16)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
    </svg>
  );
}
function Bag4() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <path
        d="M24 23c0-5 3-9 8-9s8 4 8 9"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 26h32c2.5 0 4.7 1.8 5 4.3l2 18.4c.4 3.6-2.4 6.8-6 6.8H15c-3.6 0-6.4-3.2-6-6.8l2-18.4c.3-2.5 2.5-4.3 5-4.3Z"
        fill="rgba(255,255,255,0.16)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
      <path
        d="M22 40c3 2 6 3 10 3s7-1 10-3"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BAGS = [Bag1, Bag2, Bag3, Bag4];

export default function GlobalLoader({ open }: { open: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!open) return;
    setI(0);
    const t = setInterval(() => setI((x) => (x + 1) % BAGS.length), 550);
    return () => clearInterval(t);
  }, [open]);

  const Icon = BAGS[i];

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[9999] grid place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* dim */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />

            {/* glass card */}
            <m.div
              className="relative w-[240px] rounded-[28px] border border-white/20 bg-white/10 px-8 py-7 shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
              initial={{ y: 10, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* soft glow */}
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-white/10 blur-3xl" />

              <div className="flex flex-col items-center gap-3">
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon />
                </m.div>

                <div className="text-center">
                  <div className="text-sm font-medium text-white/90">
                    Processing…
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Please don’t refresh
                  </div>
                </div>

                {/* tiny dots */}
                <div className="mt-1 flex gap-1.5">
                  {BAGS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full border border-white/30 ${
                        idx === i ? "bg-white/80" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}