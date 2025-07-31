import { NextRequest, NextResponse } from "next/server";
import { mockSamples } from "@/data/samples";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  /* ---------- texto livre ---------- */
  const q = url.searchParams.get("q")?.toLowerCase() ?? "";

  /* ---------- triplo --------- */
  // se o param não existe, guarde NaN → significa "não filtrar"
  const i = url.searchParams.has("i") ? Number(url.searchParams.get("i")) : NaN;
  const j = url.searchParams.has("j") ? Number(url.searchParams.get("j")) : NaN;
  const k = url.searchParams.has("k") ? Number(url.searchParams.get("k")) : NaN;

  const out = mockSamples.filter((s) => {
    const nameOk = s.name.toLowerCase().includes(q);

    /* aplica filtro emocional só se i, j, k forem números válidos */
    const emoOk = Number.isNaN(i)
      ? true
      : Math.abs(s.i - i) <= 1 &&
        Math.abs(s.j - j) <= 1 &&
        Math.abs(s.k - k) <= 1;

    return nameOk && emoOk;
  });

  return NextResponse.json(out);
}
