import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Poppins } from "next/font/google";
import { FilterProvider } from "@/lib/filterContext";


const poppins = Poppins({
  weight: ["400", "600"],   // pesos que pretende usar
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Musync Site",
  description: "Melhor dupla da PoliChain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <FilterProvider>
        <Header />
        {children}
        </FilterProvider>
      </body>
    </html>
  );
}
