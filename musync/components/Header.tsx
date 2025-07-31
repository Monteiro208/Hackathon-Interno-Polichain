// components/Header.tsx
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#0a0f24]">
      <div className="relative mx-auto max-w-7xl flex items-center
                   h-20 px-4">
        {/* Logo / nome */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Image src="/Musync_Logo.png" alt="Musync logo" width={64} height={64} priority />
        </Link>

        {/* Navegação principal */}
        <nav className="flex gap-5 text-lg text-[#f5f8ff]/80">
            <Link href="/samples" className="hover:text-[#f5f8ff]">Samples</Link>
            <Link href="/community" className="hover:text-[#f5f8ff]">Community</Link>
        </nav>

        {/* Grow para empurrar o resto pra direita */}
        <div className="flex-1" />

        {/* Ações à direita */}
        <div className="ml-auto flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-md border border-white/30 text-[#f5f8ff]/80 hover:text-[#f5f8ff] hover:border-[#f5f8ff]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 rounded-md bg-[#f5f8ff] text-[#0a0f24] font-medium hover:opacity-90"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
