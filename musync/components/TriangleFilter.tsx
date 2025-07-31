"use client";
import { useRef, useState, useEffect } from "react";

type Triple = { i: number; j: number; k: number }; // i+j+k = N
const N = 5;                                       // granularidade (mude p/ 3, 4…)

export default function TriangleFilter({
  onSelect,
}: {
  onSelect: (t: Triple) => void;
}) {
  /* -------------------- Geometria -------------------- */
  const width = 300;   // px (base do triângulo)
  const height = 260;  // px (alt. do triângulo)

    const A = { x: width / 2, y: 0 };       // topo — ciano
    const B = { x: 0,         y: height };  // base esquerda — rosa
    const C = { x: width,     y: height };  // base direita  — roxo

  // Converte baricêntricas → XY
  const baryToXY = ({ i, j, k }: Triple) => {
    const w1 = i / N,
      w2 = j / N,
      w3 = k / N;
    return {
      x: w1 * A.x + w2 * B.x + w3 * C.x,
      y: w1 * A.y + w2 * B.y + w3 * C.y,
    };
  };

  // Converte XY → baricêntricas (floats)
  const xyToBary = (x: number, y: number): { i: number; j: number; k: number } => {
    const detT = (B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y);
    const w1 = ((B.y - C.y) * (x - C.x) + (C.x - B.x) * (y - C.y)) / detT;
    const w2 = ((C.y - A.y) * (x - C.x) + (A.x - C.x) * (y - C.y)) / detT;
    const w3 = 1 - w1 - w2;
    return { i: w1 * N, j: w2 * N, k: w3 * N };
  };

  /* -------------------- Geração da grade -------------------- */
  const grid: Triple[] = [];
  for (let i = 0; i <= N; i++)
    for (let j = 0; j <= N - i; j++) grid.push({ i, j, k: N - i - j });

  /* -------------------- Estado do cursor -------------------- */
  const [cursor, setCursor] = useState(() => baryToXY({ i: N, j: 0, k: 0 })); // canto roxo
  const svgRef = useRef<SVGSVGElement>(null);

  // Quando usuário arrasta
  function handlePointerMove(e: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Limite: dentro do triângulo?
    if (y < 0 || y > height) return;
    // Equação de linha de cada aresta pode ser checada, mas simples:
    // bary vetores negativos = fora
    const { i, j, k } = xyToBary(x, y);
    if (i < -0.1 || j < -0.1 || k < -0.1) return;

    setCursor({ x, y });

    /* 3) Snap ao nó mais próximo e envie p/ pai */
    let best = grid[0];
    let bestDist = Infinity;
    grid.forEach((p) => {
      const { x: gx, y: gy } = baryToXY(p);
      const d2 = (gx - x) ** 2 + (gy - y) ** 2;
      if (d2 < bestDist) {
        bestDist = d2;
        best = p;
      }
    });
    onSelect(best);
  }

  /* -------------------- UI -------------------- */
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="cursor-crosshair select-none"
      onPointerMove={(e) => e.buttons === 1 && handlePointerMove(e)}
      onPointerDown={handlePointerMove}
    >
      {/* gradiente triangular */}
<defs>
  {/* máscara que limita as manchas ao interior do triângulo */}
  <mask id="triMask">
    <polygon
      points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
      fill="white"
    />
  </mask>

  {/* filtro de desfoque suave */}
  <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="50" />         {/* ajuste se quiser mais/menos suavidade */}
  </filter>
</defs>



      {/* triângulo cheio */}
<g mask="url(#triMask)" filter="url(#blur)">
  {/* 1) ciano — primeiro e um pouco menor  */}
  <circle
    cx={A.x}
    cy={A.y}
    r={height}    
    fill="#2cd4d9"
    fillOpacity="1"
  />

  {/* 2) rosa — pinta por cima do ciano em parte da base */}
  <circle
    cx={B.x}
    cy={B.y}
    r={height * 0.85}
    fill="#ff227b"
    fillOpacity="0.8"
  />

  {/* 3) roxo — último, cobre parte do ciano e do rosa      */}
  <circle
    cx={C.x}
    cy={C.y}
    r={height * 0.85}
    fill="#6c5dd9"
    fillOpacity="0.6"
  />
</g>


      {/* cursor */}
      <circle
        cx={cursor.x}
        cy={cursor.y}
        r="5"
        fill="#0a0f24"
        stroke="#F5F8FF"
        strokeWidth="2"
      />
    </svg>
  );
}
