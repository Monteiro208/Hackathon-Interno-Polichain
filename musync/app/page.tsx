import Image from "next/image";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 text-center">
      {/* título */}
      <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-[#f5f8ff]">
        Para&nbsp;Cada&nbsp;Emoção,&nbsp;Um&nbsp;Som.
      </h1>

      {/* subtítulo */}
      <p className="mt-6 text-xl md:text-2xl text-[#f5f8ff]/80">
        Encontre o som que traduz sua emoção em segundos.<br />
        Baixe samples pagando só pelo que usar.<br />
        Sinta a liberdade criativa de uma biblioteca que respira seus
        sentimentos.
      </p>

      {/* letreiro Musync */}
      <div className="mt-10 flex justify-center">
        <Image
          src="/MUSYNC GRANDE.png"
          alt="Letreiro Musync"
          width={440}
          height={120}
          priority
        />
      </div>

      {/* ─── quadro branco da marca ─── */}
      <div className="mt-12 flex justify-center">
        <div className="w-[calc(100%+4rem)] max-w-none -mx-8 rounded-lg bg-[#f5f8ff] p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-[#0a0f24]">
            Explore samples ilimitados
          </h3>
          <p className="mt-2 text-[#0a0f24]/80">
            Descubra sons únicos classificados por emoção e estilo.
            Filtre, faça download e leve sua criação para outro nível.
          </p>
        </div>
      </div>
    </section>
  );
}
