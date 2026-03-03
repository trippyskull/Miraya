"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalLoader from "./GlobalLoader";

type LoadingCtx = {
  start: () => void;
  stop: () => void;
  isLoading: boolean;
};

const Ctx = createContext<LoadingCtx | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // ✅ Auto-stop loader after navigation completes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const value = useMemo(
    () => ({
      isLoading,
      start: () => setIsLoading(true),
      stop: () => setIsLoading(false),
    }),
    [isLoading]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <GlobalLoader open={isLoading} />
    </Ctx.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLoading must be used inside <LoadingProvider />");
  return ctx;
}