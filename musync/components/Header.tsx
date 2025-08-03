// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="w-full bg-[#0a0f24]">
      <div className="relative mx-auto max-w-7xl flex h-20 items-center px-4">
        {/* ─── Navegação principal ─── */}
        <nav className="flex gap-5 text-lg text-[#f5f8ff]/80">
          <Link href="/samples" className="hover:text-[#f5f8ff]">
            Samples
          </Link>
          <Link href="/community" className="hover:text-[#f5f8ff]">
            Community
          </Link>
        </nav>

        {/* ─── Logo central ─── */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/Musync_Logo.png"
            alt="Musync logo"
            width={64}
            height={64}
            priority
          />
        </Link>

        {/* ─── Espaço e ações da direita ─── */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Botão de conectar carteira */}
          <ConnectButton
            accountStatus="avatar"
            chainStatus="none"
            showBalance={false}
          />

          {/* Log in / Sign up (opcional) */}
          <Link
            href="/login"
            className="px-5 py-2 rounded-md border border-white/30 text-[#f5f8ff]/80 hover:text-[#f5f8ff] hover:border-[#f5f8ff]"
          >
            Log in
          </Link>
          <Link
            href="/cadastro"
            className="px-5 py-2 rounded-md bg-[#f5f8ff] text-[#0a0f24] font-medium hover:opacity-90"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
