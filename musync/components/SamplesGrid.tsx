"use client";

import { useState } from "react";
import { useSamples } from "@/hooks/useSamples";
import {
  ShoppingCartIcon,
  ArrowDownTrayIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function SamplesGrid() {
  const { samples, isLoading } = useSamples();

  if (isLoading) return <p className="mt-8 text-center">Carregando…</p>;
  if (!samples?.length) return <p className="mt-8 text-center">Nenhum sample encontrado.</p>;

  return (
    <ul className="mt-8 grid grid-cols-2 gap-4">
      {samples.map((s) => (
        <SampleCard key={s.id} sample={s} />
      ))}
    </ul>
  );
}

/* ---------- card com 3 botões ---------- */
function SampleCard({ sample }: { sample: { id: string; name: string; i: number; j: number; k: number } }) {
  const [purchased, setPurchased] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <li className="rounded-md bg-white p-4 shadow flex flex-col justify-between">
      {/* título + tags */}
      <div>
        <h4 className="font-semibold text-[#0a0f24]">{sample.name}</h4>
        <p className="text-xs text-[#0a0f24]/60">
          Emoção: {sample.i}-{sample.j}-{sample.k}
        </p>
      </div>

      {/* botões */}
      <div className="mt-4 flex items-center gap-2">
        {/* 1) micro-transação */}
        <button
          onClick={() => {
            /* TODO: chamar contrato inteligente */
            setPurchased(true); // simula confirmação
          }}
          className="flex h-8 w-8 items-center justify-center rounded bg-[#6c5dd9]
                     hover:opacity-90"
        >
          <ShoppingCartIcon className="h-4 w-4 text-white" />
        </button>

        {/* 2) download – habilita quando purchased === true */}
        <button
          disabled={!purchased}
          onClick={() => {
            /* TODO: iniciar download */
          }}
          className={`flex h-8 w-8 items-center justify-center rounded ${
            purchased
              ? "bg-[#2cd4d9] hover:opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <ArrowDownTrayIcon className="h-4 w-4 text-white" />
        </button>

        {/* 3) like */}
        <button
          onClick={() => setLiked(!liked)}
          className="flex h-8 w-8 items-center justify-center rounded bg-[#ff227b]/90
                     hover:opacity-90"
        >
          <HeartIcon
            className={`h-4 w-4 ${liked ? "text-white" : "text-white/60"}`}
          />
        </button>
      </div>
    </li>
  );
}
