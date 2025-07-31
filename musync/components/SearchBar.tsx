"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import GradientFilter from "./GradientFilter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFilter } from "@/lib/filterContext";          // ← contexto global

export default function SearchBar() {
  const { nameQuery, setNameQuery } = useFilter();       // usa o contexto
  const [open, setOpen] = useState(false);

  const btnRef   = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* fecha o painel ao clicar fora */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        btnRef.current  && !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="w-full mt-4 border-b border-[#0a0f24]/10">
      <form
        onSubmit={(e) => e.preventDefault()}   /* enter não recarrega página */
        className="relative mx-auto flex w-[320px] items-center gap-3 px-3 py-2"
      >
        {/* campo de busca */}
        <div className="relative w-full">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0a0f24]/40" />

          <input
            type="text"
            placeholder="Buscar samples…"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className="w-full rounded-md border border-[#0a0f24]/20 bg-white
                       py-1.5 pl-8 pr-2 text-sm text-[#0a0f24]
                       placeholder:text-[#0a0f24]/40
                       focus:outline-none focus:ring-2 focus:ring-[#6c5dd9]"
          />
        </div>

        {/* botão do filtro (triângulo) */}
        <button
          type="button"
          ref={btnRef}
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-[#6c5dd9]/70
                     hover:opacity-95 transition"
        >
          <Image src="/Musync_play.png" alt="Filtro" width={32} height={32} />
        </button>

        {/* painel com triângulo */}
        {open && (
          <div
            ref={panelRef}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3
                       w-[320px] rounded-xl border border-black/10 bg-white
                       p-4 shadow-lg flex justify-center"
          >
            <GradientFilter onClose={() => setOpen(false)} />
          </div>
        )}
      </form>
    </div>
  );
}
