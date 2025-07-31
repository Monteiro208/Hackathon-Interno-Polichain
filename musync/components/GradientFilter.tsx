"use client";
import { useState } from "react";
import TriangleFilter from "./TriangleFilter";
import { useFilter, Triple } from "@/lib/filterContext";

export default function GradientFilter({ onClose }: { onClose: () => void }) {
  const { setEmotion } = useFilter();           // setter global
  const [draft, setDraft] = useState<Triple>(null); // triplo selecionado no triângulo

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#0a0f24] text-center">Buscar por Emoção</h3>

      {/* Triângulo: devolve um triplo e armazena em 'draft' */}
      <TriangleFilter onSelect={(t) => setDraft(t)} />

      {/* 🔹 Botão que aplica o filtro e fecha a aba */}
      <button
        onClick={() => {
          if (draft) setEmotion(draft); // <-- grava no contexto
          onClose();                    // <-- fecha o painel
        }}
        className="block w-full rounded-md bg-[#0a0f24] py-2 text-white hover:opacity-90"
      >
        Aplicar
      </button>
    </div>
  );
}
