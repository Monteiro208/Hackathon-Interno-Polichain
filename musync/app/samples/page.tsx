import SearchBar from "@/components/SearchBar";
import { useSamples } from "@/hooks/useSamples";
import SamplesGrid from "@/components/SamplesGrid";

export const metadata = {
  title: "Samples | Musync",
};

export default function SamplesPage() {
  return (
    <>
      <SearchBar />

      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#f5f8ff]">
          Biblioteca de Samples
        </h1>

        <p className="mt-4 text-lg text-[#f5f8ff]/80">
          Navegue por samples classificados por emoção e instrumento.
        </p>

        {/* TODO: grade de samples */}
        <SamplesGrid />
      </section>
    </>
  );
}