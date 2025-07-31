"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type Triple = { i: number; j: number; k: number } | null;

interface FilterState {
  nameQuery: string;
  emotion: Triple;
  setNameQuery: (s: string) => void;
  setEmotion: (t: Triple) => void;
}

const FilterContext = createContext<FilterState | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [nameQuery, setNameQuery] = useState("");
  const [emotion, setEmotion]     = useState<Triple>(null);

const pathname = usePathname();
  useEffect(() => {
    if (!pathname.startsWith("/samples")) {
      setNameQuery("");
      setEmotion(null);
    }
  }, [pathname]);


  return (
    <FilterContext.Provider value={{ nameQuery, emotion, setNameQuery, setEmotion }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be inside <FilterProvider>");
  return ctx;
}
